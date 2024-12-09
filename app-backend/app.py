from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_cors import CORS
from sqlalchemy import select, delete
import google.generativeai as genai
import os
from dotenv import load_dotenv
from datetime import datetime
import traceback
import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///eunoia.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key ="zzboss1234"

EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
logging.basicConfig(level=logging.INFO)

CC_EMAIL = "zainxaidi2003@gmail.com"

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def load_text(txt_path):
    with open(txt_path, 'r', encoding='utf-8') as file:
        return file.read().strip().splitlines()

quran_path = "C:/Users/IT USER/Desktop/Eunoia_FYP/quran.txt"  
bible_path = "C:/Users/IT USER/Desktop/Eunoia_FYP/bible.txt"  
quran_ayat = load_text(quran_path)
bible_verses = load_text(bible_path)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Chat(db.Model):
    __tablename__ = 'chats'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship('User', backref='chats')

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    client_msg = db.Column(db.Text, nullable=True)
    bot_msg = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    chat = db.relationship("Chat", backref="messages")
    user = db.relationship("User", backref="messages")

class ContactUs(db.Model):
    __tablename__ = 'contact_us'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, nullable=False)
    query = db.Column(db.Text)
    contacted_on = db.Column(db.DateTime, default=datetime.utcnow)

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    fname = data.get('firstname')
    lname = data.get('lastname')
    email = data.get('email')
    password = data.get('password')

    if not fname or not lname or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400
    
    try:
        fname = fname.upper()[0] + fname[1:].lower()
    except IndexError:
        fname = fname

    try:
        lname = lname.upper()[0] + lname[1:].lower()
    except IndexError:
        lname = lname

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    created_at = datetime.now()
    new_user = User(first_name=fname,last_name=lname, email=email, password=hashed_password, created_at=created_at)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully", "user": user_schema.dump(new_user)}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({"message": "Login successful", "user": user_schema.dump(user)}), 200

@app.route('/create_chat', methods=['POST'])
def create_chat():
    try:
        data = request.get_json()
        user_id = data.get('user_id') 
        user = db.session.get(User, user_id)  
        if not user:
            return jsonify({"error": "User not found"}), 404

        new_chat = Chat(user_id=user_id)  
        db.session.add(new_chat)
        db.session.commit()

        return jsonify({"chat_id": new_chat.id, "timestamp": new_chat.timestamp})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/generate_response', methods=['POST'])
def generate_response():
    try:
        data = request.get_json()
        user_input = data.get('user_input')
        user_id = data.get('user_id')  
        chat_id = data.get('chat_id')

        messages = Message.query.filter_by(user_id=user_id, chat_id=chat_id).all()
        conversation_history = "\n".join(f"{msg.client_msg or ''} {msg.bot_msg or ''}".strip() for msg in messages)

        prompt = (
            f"{conversation_history}\n"
            f"User question: {user_input}\n\n"
            "You are a friendly and helpful chatbot. Provide clear answers and support based on the user’s question. "
            "If the user asks for an ayat from the Quran or a Bible verse, randomly choose one to share from the list below. "
            "Otherwise, give a direct answer to their question.\n\n"
            f"Quran Ayats:\n{quran_ayat}\n\n"
            f"Bible Verses:\n{bible_verses}\n"
        )

        response = model.generate_content(prompt)
        bot_response = response.candidates[0].content.parts[0].text.strip() if response.candidates else "Sorry, I couldn't generate a response."

        user_message = Message(user_id=user_id, chat_id=chat_id, client_msg=user_input)
        bot_message = Message(user_id=user_id, chat_id=chat_id, bot_msg=bot_response)
        db.session.add_all([user_message, bot_message])
        db.session.commit()

        return jsonify({"response": bot_response})

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/get_chat', methods=['POST'])
def get_chat():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        chat_id = data.get('chat_id')

        messages = Message.query.filter_by(user_id=user_id, chat_id=chat_id).all()

        if not messages:
            return jsonify({"error": "No messages found for this chat"}), 404

        return jsonify({
            "messages": [
                {"role": "user" if msg.client_msg else "bot", 
                 "content": msg.client_msg or msg.bot_msg, 
                 "timestamp": msg.timestamp.isoformat()} for msg in messages
            ]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_all_chats', methods=['POST'])
def get_all_chats():
    try:
        data = request.get_json()
        user_id = data.get('user_id')

        chats = Chat.query.filter_by(user_id=user_id).all()

        if not chats:
            return jsonify({"error": "No chats found for this user"}), 404

        return jsonify({
            "chats": [{"chat_id": chat.id, "timestamp": chat.timestamp.isoformat()} for chat in chats]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete_chat', methods=['DELETE'])
def delete_chat():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        chat_id = data.get('chat_id')

        chat = Chat.query.filter_by(id=chat_id, user_id=user_id).first()

        if not chat:
            return jsonify({"error": "Chat not found for this user"}), 404

        Message.query.filter_by(chat_id=chat_id, user_id=user_id).delete()

        db.session.delete(chat)
        db.session.commit()

        return jsonify({"message": f"Chat {chat_id} deleted successfully."})

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route("/contact_us", methods=["POST", "GET"])
def contact_us():
    print(f"Form Data: {request.form}")
    if request.method == "POST":
        try:
            name = request.form['name']
            email = request.form['email']
            query = request.form['query']
            contacted_on = datetime.now()
            # data = request.get_json().get("data", {})
            # name = data.get("name")
            # email = data.get("email")
            # query = data.get("query")
            # contacted_on = datetime.datetime.now()

            # if request.is_json:
            #     data = request.get_json().get("data", {})
            #     name = data.get("name")
            #     email = data.get("email")
            #     query = data.get("query")
            #     contacted_on = datetime.datetime.now()
            # else:
            #     return jsonify({"status": "error", "error": "Invalid content type"}), 400

            try:
                name = name.upper()[0] + name[1:].lower()
            except IndexError:
                name = name

            new_query = ContactUs(
                name = name,
                email = email,
                query = query,
                contacted_on = contacted_on
            )
            db.session.add(new_query)
            db.session.commit()

            # print(new_query)
            print(name)
            return jsonify({"status": "success"}), 200
        except Exception as e:
            print(f'Error: {e}, Trace: {traceback.format_exc()}')
            return jsonify({"status": "error", "error": str(e)}), 400
        

@app.route("/forgot_password", methods=["POST"])
def send_email():
    try:
        logging.info("Request received to send email")
        data = request.get_json()
        email = data.get('email')

        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = email
        msg['Cc'] = CC_EMAIL
        msg['Subject'] = f"Reset Your Password – Follow the Link Below"

        body = f"""
        <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="utf-8">
            <style>
                body, table, td {{ font-family: 'Arial', sans-serif; }}
                .container {{ padding: 20px; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 100%; }}
                p {{ font-size: 14px; margin-bottom: 10px; }}
                .footer {{ text-align: center; margin-top: 20px; }}
                .footer img {{ width: 100px; height: auto; }}
                .button {{ display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; }}
                .button:hover {{ background-color: #0056b3; }}
            </style>
            </head>
            <body>
            <table class="container">
                <tr>
                <td>
                    <h1>Hello,</h1>
                    <p>We received a request to reset your password. If you made this request, please click the link below to reset your password:</p>
                    
                    <p><a href="https://www.google.com/" class="button">Reset Your Password</a></p>
                    
                    <p>If you did not request a password reset, please ignore this email, and your account will remain secure.</p>
                    
                    <p>Best regards,<br>The Eunoia Team</p>
                </td>
                </tr>
            </table>
            
            <div class="footer">
                <img src="https://imgur.com/a/fKTzQqv" alt="Eunoia Logo">
            </div>
            </body>
            </html>

        """

        msg.attach(MIMEText(body, 'html'))

        logging.info(f"Email content created for {email}")

        try:
            server = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=30)
            logging.info("Starting TLS")
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            logging.info("Logged in to email server")
            text = msg.as_string()
            recipients = [email, CC_EMAIL]
            server.sendmail(EMAIL_ADDRESS, recipients, text)
            logging.info(f"Email sent to {email} successfully")
            server.quit()
        except smtplib.SMTPException as smtp_err:
            logging.error(f"SMTP error occurred: {smtp_err}")
            return jsonify({"status": "error", "error": "Failed to send email"}), 500

        return jsonify({"status": "success"}), 200

    except Exception as e:
        logging.error(f"An error occurred: {e}, Trace: {traceback.format_exc()}")
        return jsonify({"status": "error", "error": str(e)}), 500
    
@app.route('/reset_password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('new_password')

    if not email or not new_password:
        return jsonify({"error": "Email and new password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Email not found"}), 404
    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    user.password = hashed_password
    db.session.commit()

    return jsonify({"message": "Password reset successful"}), 200

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
