from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_cors import CORS
from sqlalchemy import select, delete
import google.generativeai as genai
import os
from dotenv import load_dotenv
from datetime import datetime, timezone
import traceback
import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask_migrate import Migrate

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
migrate = Migrate(app, db)

genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def load_text(txt_path):
    with open(txt_path, 'r', encoding='utf-8') as file:
        return file.read().strip().splitlines()

quran_path = "/home/ammar/AmmarNadeem/University/FYP/Eunoia_Clone/eunoia-app/app-backend/quran.txt"  
bible_path = "/home/ammar/AmmarNadeem/University/FYP/Eunoia_Clone/eunoia-app/app-backend/bible.txt"  
quran_ayat = load_text(quran_path)
bible_verses = load_text(bible_path)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, nullable=True)
    coupons = db.Column(db.Integer, default=0,nullable=True)
    badges = db.Column(db.Text, nullable=True)
    admin = db.Column(db.Boolean, default=False)
    treated = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)

    chats = db.relationship('Chat', backref='user', lazy=True)
    messages = db.relationship('Message', backref='user', lazy=True)
    user_activities = db.relationship('UserActivity', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)
    journals = db.relationship('Journal', backref='user', lazy=True)
    forum_messages = db.relationship('ForumMessage', backref='user', lazy=True)
    moods = db.relationship('Mood', backref='user', lazy=True)



class Chat(db.Model):
    __tablename__ = 'chats'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    title = db.Column(db.Text, nullable=True)
    messages = db.relationship('Message', backref='chats', lazy=True)

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    client_msg = db.Column(db.Text, nullable=True)
    bot_msg = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class ContactUs(db.Model):
    __tablename__ = 'contact_us'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, nullable=False)
    query = db.Column(db.Text)
    contacted_on = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class Article(db.Model):
    __tablename__ = 'articles'
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.Text, nullable=False)
    category = db.Column(db.Text, nullable=False)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class UserActivity(db.Model):
    __tablename__ = 'user_activities'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'), nullable=False)
    deadline = db.Column(db.DateTime, nullable=True)
    recommended_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class Activity(db.Model):
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True)
    mood = db.Column(db.Text, nullable=False)
    activity_path = db.Column(db.Text, nullable=True)
    recommended_activity = db.Column(db.Text,db.ForeignKey('subactivities.name'), nullable=True)

   
    user_activities = db.relationship('UserActivity', backref='activities', lazy=True)

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reviewing_msg = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, onupdate=datetime.now(timezone.utc))


class Journal(db.Model):
    __tablename__ = 'journals'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    response = db.Column(db.Text, nullable=True)
    journal = db.Column(db.Boolean, nullable=True)
    questionaire = db.Column(db.Boolean, nullable=True)


class SubActivity(db.Model):
    __tablename__ = 'subactivities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)
    reps = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)

    activities = db.relationship('Activity', backref='subactivities', lazy=True)


class Therapist(db.Model):
    __tablename__ = 'therapists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    designation = db.Column(db.Text, nullable=False)
    qualification = db.Column(db.Text, nullable=True)
    location = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    is_available = db.Column(db.Boolean, default=True)
    patients_treated = db.Column(db.Integer, default=0)
    patients_queue = db.Column(db.Integer, default=0)

    feedbacks = db.relationship('Feedback', backref='therapists', lazy=True)


class Feedback(db.Model):
    __tablename__ = 'feedback'
    id = db.Column(db.Integer, primary_key=True)
    therapist_id = db.Column(db.Integer, db.ForeignKey('therapists.id'), nullable=False)
    feedback = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class Badge(db.Model):
    __tablename__ = 'badges'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    picture = db.Column(db.Text, nullable=True)

def get_current_day():
    return datetime.now(timezone.utc).strftime("%A")


class Mood(db.Model):
    __tablename__ = 'moods'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mood_category = db.Column(db.Text, nullable=False)
    day = db.Column(db.Text, default=get_current_day,nullable=False)
    date = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class Forum(db.Model):
    __tablename__ = 'forums'
    id = db.Column(db.Integer, primary_key=True)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    category = db.Column(db.Text, nullable=False)
    title = db.Column(db.Text, nullable=False)
    members = db.Column(db.Integer, default=0)


    forum_messages = db.relationship('ForumMessage', backref='forums', lazy=True)


class ForumMessage(db.Model):
    __tablename__ = 'forum_messages'
    id = db.Column(db.Integer, primary_key=True)
    forum_id = db.Column(db.Integer, db.ForeignKey('forums.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

class ForumMembership(db.Model):
    __tablename__ = 'forum_memberships'
    id = db.Column(db.Integer, primary_key=True)
    forum_id = db.Column(db.Integer, db.ForeignKey('forums.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    forum = db.relationship('Forum', backref='memberships')
    user = db.relationship('User', backref='forum_memberships')



class Coupon(db.Model):
    __tablename__ = 'coupons'
    id = db.Column(db.Integer, primary_key=True)
    partner_name = db.Column(db.Text, nullable=False)
    total_coupons = db.Column(db.Integer, default=0)
    coupons_allotted = db.Column(db.Integer, default=0)
    valid_until = db.Column(db.DateTime, nullable=False)

class Finances(db.Model):
    __tablename__ = 'finances'
    id = db.Column(db.Integer, primary_key=True)
    finances_available = db.Column(db.Integer)


class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    therapist_id = db.Column(db.Integer, db.ForeignKey('therapists.id'), nullable=False)
    booked_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    user = db.relationship('User', backref='appointments')
    therapist = db.relationship('Therapist', backref='appointments')


class UserBadge(db.Model):
    __tablename__ = 'user_badges'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    badge_id = db.Column(db.Integer, db.ForeignKey('badges.id'), nullable=False)
    assigned_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    user = db.relationship('User', backref='user_badges')
    badge = db.relationship('Badge', backref='user_badges')

class UserCoupon(db.Model):
    __tablename__ = 'user_coupons'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    coupon_id = db.Column(db.Integer, db.ForeignKey('coupons.id'), nullable=False)
    assigned_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    user = db.relationship('User', backref='user_coupons')
    coupon = db.relationship('Coupon', backref='user_coupons')


class ModuleVisit(db.Model):
    __tablename__ = 'module_visits'
    id = db.Column(db.Integer, primary_key=True)
    module_name = db.Column(db.String(50), nullable=False)
    visit_count = db.Column(db.Integer, default=0)
    last_visited_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))



class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    fname = data.get('firstName')
    lname = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    if not fname or not lname or not email or not password or not confirm_password:
        return jsonify({"error": "All fields are required"}), 400
    
    if password != confirm_password:
        return jsonify({"error": "Password and Confirm Password doesnt match"}), 401
    
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
        return jsonify({"error": "Incorrect email or password"}), 401

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
        if not messages:
            prompt =(
                f"{user_input}\n"
                f"This is the user's first message. I want you to just give me a title as a response which matches the user's first message."
                f"Just give me the title. Nothing else. No other lines or things as a response. I repeat just the title."
            )
            response = model.generate_content(prompt)
            title = response.candidates[0].content.parts[0].text.strip() if response.candidates else "Hello chat"
            chatt = Chat.query.filter_by(user_id=user_id,id=chat_id).first()
            if chatt:
                chatt.title = title
                db.session.commit()
                print(f"Chat updated with title: {chatt.title}")

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
        chat = db.session.get(Chat, chat_id)


        # if not messages:
        #     return jsonify({"error": "No messages found for this chat"}), 404

        return jsonify({
            "chat_id": chat.id,
            "title": chat.title,
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

        # if not chats:
        #     return jsonify({"error": "No chats found for this user"}), 404

        return jsonify({
            "chats": [{"chat_id": chat.id, "title": chat.title} for chat in chats]
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
    # print(f"Form Data: {request.form}")
    # if request.method == "POST":
    #     try:
    #         name = request.form['name']
    #         email = request.form['email']
    #         query = request.form['message']
    #         contacted_on = datetime.now()
    #         # data = request.get_json().get("data", {})
    #         # name = data.get("name")
    #         # email = data.get("email")
    #         # query = data.get("messsage")
    #         # contacted_on = datetime.datetime.now()

    #         # if request.is_json:
    #         #     data = request.get_json().get("data", {})
    #         #     name = data.get("name")
    #         #     email = data.get("email")
    #         #     query = data.get("query")
    #         #     contacted_on = datetime.datetime.now()
    #         # else:
    #         #     return jsonify({"status": "error", "error": "Invalid content type"}), 400

    #         try:
    #             name = name.upper()[0] + name[1:].lower()
    #         except IndexError:
    #             name = name

    #         new_query = ContactUs(
    #             name = name,
    #             email = email,
    #             query = query,
    #             contacted_on = contacted_on
    #         )
    #         db.session.add(new_query)
    #         db.session.commit()

    #         # print(new_query)
    #         print(name)
    #         return jsonify({"status": "success"}), 200
    #     except Exception as e:
    #         print(f'Error: {e}, Trace: {traceback.format_exc()}')
    #         return jsonify({"status": "error", "error": str(e)}), 400
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        query = data.get("message")  
        contacted_on = datetime.now()

        if not name or not email or not query:
            return jsonify({"status": "error", "error": "Missing required fields"}), 400

        name = name.capitalize()

        new_query = ContactUs(
            name=name,
            email=email,
            query=query,
            contacted_on=contacted_on
        )
        db.session.add(new_query)
        db.session.commit()

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
                    
                    <p><a href="http://localhost:5173/reset-password" class="button">Reset Your Password</a></p>
                    
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
    new_password = data.get('newPassword')

    if not email or not new_password:
        return jsonify({"error": "Email and new password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Email not found"}), 404
    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    user.password = hashed_password
    db.session.commit()

    return jsonify({"message": "Password reset successful"}), 200


@app.route('/list_users', methods=['GET'])
def list_users():
    users = db.session.query(User.id, User.first_name, User.last_name,User.email, User.treated, User.coupons).filter(User.is_active == True).all()
    user_list = [{"id": u[0], "first_name": u[1], "last_name":u[2],"email": u[3], "Treated":u[4], "Coupons":u[5]} for u in users]
    
    return jsonify(user_list), 200


@app.route('/get_user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = db.session.get(User,user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user_schema.dump(user)), 200



@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user.is_active = False
    db.session.commit()

    return jsonify({"message": "User deactivated successfully"}), 200


@app.route('/add_admin/<int:user_id>', methods=['POST'])
def add_admin(user_id):

    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user.admin = True
    db.session.commit()

    return jsonify({"message": f"User with ID {user_id} has been made an admin."}), 200

@app.route('/delete_admin/<int:user_id>', methods=['POST'])
def delete_admin(user_id):

    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.admin = False
    db.session.commit()

    return jsonify({"message": f"Admin privileges removed for user with ID {user_id}."}), 200


@app.route('/get_articles', methods=['GET'])
def get_articles():
    articles = db.session.query(Article).all()

    return jsonify([{"id": a.id, "topic": a.topic, "category": a.category, "content":a.text,"created_at": a.created_at.isoformat()} for a in articles]), 200


@app.route('/create_article', methods=['POST'])
def create_article():
    data = request.get_json()
    topic = data.get('topic')
    category = data.get('category')
    text = data.get('text')

    if not topic or not category or not text:
        return jsonify({"error": "All fields are required"}), 400
    
    created_at = datetime.now()

    new_article = Article(topic=topic, category=category, text=text, created_at=created_at)
    db.session.add(new_article)
    db.session.commit()
    
    return jsonify({"message": "Article created successfully", "article_id": new_article.id}), 201

@app.route('/enter_review', methods=['POST'])
def enter_review():
    data = request.get_json()
    user_id = data.get('user_id')
    reviewing_msg = data.get('reviewing_msg')
    rating = data.get('rating')

    if not user_id or not reviewing_msg or not rating:
        return jsonify({"error": "All fields (user_id, reviewing_msg, rating) are required"}), 400

    if not isinstance(rating, int) or rating < 1 or rating > 5:
        return jsonify({"error": "Rating must be an integer between 1 and 5"}), 400

    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    new_review = Review(user_id=user_id, reviewing_msg=reviewing_msg, rating=rating, created_at=datetime.now())
    db.session.add(new_review)
    db.session.commit()

    return jsonify({"message": "Review submitted successfully", "review_id": new_review.id}), 201


@app.route('/list_reviews', methods=['GET'])
def list_reviews():
    reviews = db.session.query(Review, User).join(User, Review.user_id == User.id).all()

    review_list = [
        {
            "id": review.id,
            "user_id": review.user_id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "reviewing_msg": review.reviewing_msg,
            "rating": review.rating
        }
        for review, user in reviews
    ]

    return jsonify(review_list), 200



@app.route('/create_therapist', methods=['POST'])
def create_therapist():
    data = request.get_json()
    name = data.get('name')
    designation = data.get('designation')
    qualification = data.get('qualification')
    location = data.get('location') 

    if not name or not designation:
        return jsonify({"error": "Name and designation are required"}), 400

    new_therapist = Therapist(
        name=name,
        designation=designation,
        qualification=qualification,
        location=location,
        created_at=datetime.now(timezone.utc)
    )
    db.session.add(new_therapist)
    db.session.commit()

    return jsonify({"message": "Therapist created successfully", "therapist_id": new_therapist.id}), 201


@app.route('/list_therapists', methods=['GET'])
def list_therapists():
 
    therapists = db.session.query(Therapist).all()

    therapist_list = [
        {
            "id": therapist.id,
            "name": therapist.name,
            "designation": therapist.designation,
            "qualification": therapist.qualification,
            "location": therapist.location,
            "is_available": therapist.is_available,
            "patients_treated": therapist.patients_treated,
            "patients_queue": therapist.patients_queue
        }
        for therapist in therapists
    ]

    return jsonify(therapist_list), 200


@app.route('/add_finances', methods=['POST'])
def add_finances():
    data = request.get_json()
    money = data.get('money')

    if not isinstance(money, (int, float)) or money <= 0:
        return jsonify({"error": "Invalid amount. Money must be a positive number."}), 400

    finance = db.session.query(Finances).first()

    if not finance:
        finance = Finances(finances_available=0)
        db.session.add(finance)

    finance.finances_available += money
    db.session.commit()

    return jsonify({"message": f"Added {money} to finances.", "current_finances": finance.finances_available}), 201



@app.route('/add_coupons', methods=['POST'])
def add_coupons():
    data = request.get_json()
    coupon_id = data.get('coupon_id')
    num_coupons = data.get('num_coupons')

    if not coupon_id or not isinstance(num_coupons, int) or num_coupons <= 0:
        return jsonify({"error": "Invalid input. 'coupon_id' and 'num_coupons' are required and 'num_coupons' must be a positive integer."}), 400

    coupon = db.session.query(Coupon).filter_by(id=coupon_id).first()

    if not coupon:
        return jsonify({"error": "Coupon ID not found"}), 404

    coupon.total_coupons += num_coupons
    db.session.commit()

    return jsonify({"message": f"Added {num_coupons} coupons to coupon ID {coupon_id}.", 
                    "total_coupons": coupon.total_coupons}), 201


@app.route('/enlist_coupon', methods=['POST'])
def enlist_coupon():
    data = request.get_json()
    partner_name = data.get('partner_name')
    num_coupons = data.get('num_coupons')
    valid_until = data.get('valid_until')

    if not partner_name or not isinstance(num_coupons, int) or num_coupons <= 0:
        return jsonify({"error": "Invalid input. 'partner_name' is required and 'num_coupons' must be a positive integer."}), 400
    
    if not valid_until:
        return jsonify({"error": "'valid_until' is required"}), 400
    
    try:
        valid_until_date = datetime.fromisoformat(valid_until)
    except ValueError:
        return jsonify({"error": "'valid_until' must be a valid ISO 8601 date string"}), 400

    new_coupon = Coupon(
        partner_name=partner_name,
        total_coupons=num_coupons,
        coupons_allotted=0,
        valid_until=valid_until_date
    )
    db.session.add(new_coupon)
    db.session.commit()

    return jsonify({"message": f"Coupon added successfully for partner {partner_name}.", "coupon_id": new_coupon.id}), 201





@app.route('/get_finances', methods=['GET'])
def get_finances():
    finance = db.session.query(Finances).first()
    coupons = db.session.query(Coupon).all()

    if not finance:
        return jsonify({"finances_available": 0, "coupons": []}), 200

    coupon_list = [
        {
            "partner_name": coupon.partner_name,
            "total_coupons": coupon.total_coupons,
            "coupons_allotted": coupon.coupons_allotted
        }
        for coupon in coupons
    ]

    return jsonify({
        "finances_available": finance.finances_available,
        "coupons": coupon_list
    }), 200


@app.route('/add_exercise', methods=['POST'])
def add_exercise():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    reps = data.get('reps')

    if not name or not description or not reps:
        return jsonify({"error": "name, description, and reps are required"}), 400

    try:
        reps = int(reps)  
        if reps < 0:
            return jsonify({"error": "reps must be a positive integer"}), 400
    except ValueError:
        return jsonify({"error": "reps must be an integer"}), 400

    new_exercise = SubActivity(name=name, description=description, reps=reps, is_active=True)
    db.session.add(new_exercise)
    db.session.commit()

    return jsonify({"message": "Exercise added successfully", "exercise_id": new_exercise.id}), 201



@app.route('/delete_exercise', methods=['DELETE'])
def delete_exercise():
    data = request.get_json()
    exercise_id = data.get('exercise_id')

    if not exercise_id:
        return jsonify({"error": "exercise_id is required"}), 400

    exercise = SubActivity.query.filter_by(id=exercise_id, is_active=True).first()
    if not exercise:
        return jsonify({"error": "Exercise not found or already deleted"}), 404

    exercise.is_active = False
    db.session.commit()

    return jsonify({"message": f"Exercise with ID {exercise_id} has been deactivated successfully."}), 200




@app.route('/list_exercises', methods=['GET'])
def list_exercises():
    exercises = SubActivity.query.filter_by(is_active=True).all()
    exercise_list = [
        {
            "id": exercise.id,
            "name": exercise.name,
            "description": exercise.description,
            "reps": exercise.reps,
        }
        for exercise in exercises
    ]
    return jsonify(exercise_list), 200


@app.route('/add_journal', methods=['POST'])
def add_journal():
    data = request.get_json()
    user_id = data.get('user_id')
    text = data.get('text')
    journal_flag = data.get('journal', False)
    questionaire_flag = data.get('questionaire', False)
    mood = data.get('mood')

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    user = db.session.query(User).filter_by(id=user_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    if text and journal_flag:
        new_journal = Journal(
            user_id=user_id,
            text=text,
            journal=True,
            questionaire=False
        )
        db.session.add(new_journal)
        db.session.commit()

        try:
            prompt = f"Analyze the following journal and determine the mood: happy, sad, or angry. Just give a single word answer.\nJournal: {text}"
            response = model.generate_content(prompt)
            detected_mood = response.candidates[0].content.parts[0].text.strip() if response.candidates else "Neutral"
        except Exception as e:
            detected_mood = "Unknown"

        new_mood = Mood(
            user_id=user_id,
            mood_category=detected_mood,
            date=datetime.now()
        )
        db.session.add(new_mood)
        db.session.commit()

        return jsonify({
            "user_id": user_id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "text": text,
            "mood": detected_mood
        }), 201

    elif questionaire_flag and mood:
        new_journal = Journal(
            user_id=user_id,
            text=text or "",
            journal=False,
            questionaire=True
        )
        db.session.add(new_journal)

        new_mood = Mood(
            user_id=user_id,
            mood_category=mood,
            date=datetime.now()
        )
        db.session.add(new_mood)
        db.session.commit()

        return jsonify({
            "user_id": user_id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "mood": mood
        }), 201

    else:
        return jsonify({"error": "Invalid request. Provide either 'text' with 'journal=true' or 'questionaire=true' with 'mood'"}), 400


@app.route('/list_journals', methods=['POST'])
def list_journals():
    data = request.get_json()
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    journals = Journal.query.filter_by(user_id=user_id).all()

    if not journals:
        return jsonify({"error": "No journals found for this user"}), 404

    journal_list = [
        {
            "id": journal.id,
            "text": journal.text,
            "journal": journal.journal,
            "questionaire": journal.questionaire,
            "created_at": journal.created_at.isoformat()
        }
        for journal in journals
    ]

    return jsonify(journal_list), 200



@app.route('/get_moods', methods=['GET'])
def get_moods():
    try:
        subquery = (
            db.session.query(
                Mood.user_id,
                db.func.max(Mood.date).label('latest_date')
            ).group_by(Mood.user_id).subquery()
        )

        moods = (
            db.session.query(Mood, User)
            .join(subquery, db.and_(Mood.user_id == subquery.c.user_id, Mood.date == subquery.c.latest_date))
            .join(User, Mood.user_id == User.id)
            .all()
        )

        mood_data = {
            "happy": [],
            "sad": [],
            "angry": [],
            "neutral": []
        }

        for mood, user in moods:
            mood_entry = {
                "user_id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "mood": mood.mood_category
            }
            if mood.mood_category.lower() == "happy":
                mood_data["happy"].append(mood_entry)
            elif mood.mood_category.lower() == "sad":
                mood_data["sad"].append(mood_entry)
            elif mood.mood_category.lower() == "angry":
                mood_data["angry"].append(mood_entry)
            else:
                mood_data["neutral"].append(mood_entry)

        return jsonify(mood_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



@app.route('/create_forum', methods=['POST'])
def create_forum():
    try:
        data = request.get_json()
        created_by = data.get('created_by')
        category = data.get('category')
        title = data.get('title')

        if not created_by or not category or not title:
            return jsonify({"error": "created_by, category, and title are required"}), 400

        user = db.session.query(User).filter_by(id=created_by).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        new_forum = Forum(
            created_by=created_by,
            category=category,
            title=title,
            members=1,
            created_at=datetime.now(timezone.utc)
        )
        db.session.add(new_forum)
        db.session.commit()

        forum_membership = ForumMembership(
            forum_id=new_forum.id,
            user_id=created_by,
            joined_at=datetime.now(timezone.utc)
        )
        db.session.add(forum_membership)
        db.session.commit()

        return jsonify({
            "message": "Forum created successfully",
            "forum_id": new_forum.id,
            "title": new_forum.title,
            "category": new_forum.category,
            "created_by": created_by,
            "created_at": datetime.now(timezone.utc)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/join_forum', methods=['POST'])
def join_forum():
    try:
        data = request.get_json()
        forum_id = data.get('forum_id')
        user_id = data.get('user_id')

        if not forum_id or not user_id:
            return jsonify({"error": "forum_id and user_id are required"}), 400

        forum = db.session.query(Forum).filter_by(id=forum_id).first()
        if not forum:
            return jsonify({"error": "Forum not found"}), 404

        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        existing_membership = ForumMembership.query.filter_by(forum_id=forum_id, user_id=user_id).first()
        if existing_membership:
            return jsonify({"error": "User is already a member of this forum"}), 400

        new_membership = ForumMembership(forum_id=forum_id, user_id=user_id)
        db.session.add(new_membership)

        forum.members += 1
        db.session.commit()

        return jsonify({"message": f"User {user_id} joined forum {forum_id}", "forum_title": forum.title}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/get_forum/<int:forum_id>', methods=['GET'])
def get_forum(forum_id):
    try:
        forum = db.session.query(Forum).filter_by(id=forum_id).first()
        if not forum:
            return jsonify({"error": "Forum not found"}), 404
        
        # Retrieve the user who created the forum
        user = db.session.query(User).filter_by(id=forum.created_by).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Retrieve members of the forum
        memberships = db.session.query(ForumMembership).filter_by(forum_id=forum_id).all()
        members = []
        for membership in memberships:
            member = db.session.query(User).filter_by(id=membership.user_id).first()
            if member:
                members.append({
                    "user_id": member.id,
                    "first_name": member.first_name,
                    "last_name": member.last_name
                })
        
        forum_details = {
            "forum_id": forum.id,
            "created_by": {
                "user_id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name
            },
            "created_at": forum.created_at.isoformat(),
            "category": forum.category,
            "title": forum.title,
            "members": members
        }

        return jsonify(forum_details), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
   

@app.route('/list_forums', methods=['GET'])
def list_forums():
    try:
        forums = db.session.query(Forum, User).join(User, Forum.created_by == User.id).all()

        forum_list = [
            {
                "forum_id": forum.id,
                "title": forum.title, 
                "category": forum.category,
                "created_by": {
                    "user_id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name
                },
                "members": forum.members,
                "created_at": forum.created_at.isoformat()
            }
            for forum, user in forums
        ]

        return jsonify(forum_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/forum_message', methods=['POST'])
def forum_message():
    try:
        data = request.get_json()
        forum_id = data.get('forum_id')
        user_id = data.get('user_id')
        text = data.get('text')

        if not forum_id or not user_id or not text:
            return jsonify({"error": "forum_id, user_id, and text are required"}), 400

        forum = db.session.query(Forum).filter_by(id=forum_id).first()
        if not forum:
            return jsonify({"error": "Forum not found"}), 404
        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        # membership = ForumMembership.query.filter_by(forum_id=forum_id, user_id=user_id).first()
        # if not membership:
        #     return jsonify({"error": "User is not a member of this forum"}), 403

        new_message = ForumMessage(
            forum_id=forum_id,
            user_id=user_id,
            text=text,
            created_at=datetime.now(timezone.utc)
        )
        db.session.add(new_message)
        db.session.commit()

        return jsonify({"message": "Message added to the forum", "message_id": new_message.id}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/list_forum_messages', methods=['POST'])
def list_forum_messages():
    try:
        data = request.get_json()
        forum_id = data.get('forum_id')

        if not forum_id:
            return jsonify({"error": "forum_id is required"}), 400

        forum = Forum.query.filter_by(id=forum_id).first()
        if not forum:
            return jsonify({"error": "Forum not found"}), 404

        messages = (
            db.session.query(ForumMessage, User)
            .join(User, ForumMessage.user_id == User.id)
            .filter(ForumMessage.forum_id == forum_id)
            .order_by(ForumMessage.created_at.asc())
            .all()
        )

        if not messages:
            return jsonify({"error": "No messages found for this forum"}), 404

        message_list = [
            {
                "message_id": message.id,
                "forum_id": message.forum_id,
                "user_id": message.user_id,
                "text": message.text,
                "created_at": message.created_at.isoformat(),
                "first_name": user.first_name,
                "last_name": user.last_name
            }
            for message, user in messages
        ]

        return jsonify(message_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_forum/<int:forum_id>', methods=['GET'])
def get_forum(forum_id):
    try:
        forum = db.session.query(Forum).filter_by(id=forum_id).first()
        if not forum:
            return jsonify({"error": "Forum not found"}), 404
        
        # Retrieve the user who created the forum
        user = db.session.query(User).filter_by(id=forum.created_by).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Retrieve members of the forum
        memberships = db.session.query(ForumMembership).filter_by(forum_id=forum_id).all()
        members = []
        for membership in memberships:
            member = db.session.query(User).filter_by(id=membership.user_id).first()
            if member:
                members.append({
                    "user_id": member.id,
                    "first_name": member.first_name,
                    "last_name": member.last_name
                })
        
        forum_details = {
            "id": forum.id,
            "created_by": {
                "user_id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name
            },
            "created_at": forum.created_at.isoformat(),
            "category": forum.category,
            "title": forum.title,
            "members": members
        }

        return jsonify(forum_details), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    


@app.route('/add_badge', methods=['POST'])
def add_badge():
    try:
        data = request.get_json()
        name = data.get('name')
        picture = data.get('picture')

        if not name:
            return jsonify({"error": "Badge name is required"}), 400

        new_badge = Badge(
            name=name,
            picture=picture
        )
        db.session.add(new_badge)
        db.session.commit()

        return jsonify({"message": "Badge added successfully", "badge_id": new_badge.id}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/delete_badge/<int:badge_id>', methods=['DELETE'])
def delete_badge(badge_id):
    try:
        badge = db.session.query(Badge).filter_by(id=badge_id).first()

        if not badge:
            return jsonify({"error": "Badge not found"}), 404

        db.session.delete(badge)
        db.session.commit()

        return jsonify({"message": f"Badge with ID {badge_id} deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@app.route('/get_treated', methods=['POST'])
def get_treated():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        therapist_id = data.get('therapist_id')

        if not user_id or not therapist_id:
            return jsonify({"error": "user_id and therapist_id are required"}), 400

        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        therapist = db.session.query(Therapist).filter_by(id=therapist_id).first()
        if not therapist:
            return jsonify({"error": "Therapist not found"}), 404
        

        appointment = db.session.query(Appointment).filter_by(user_id=user_id, therapist_id=therapist_id).first()
        if not appointment:
            return jsonify({"error": "No appointment found for this user with the therapist"}), 404

        db.session.delete(appointment)

        user.treated = True
        therapist.patients_treated += 1
        therapist.patients_queue = max(0, therapist.patients_queue - 1)
        db.session.commit()

        return jsonify({"message": f"User {user_id} marked as treated by therapist {therapist_id}"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/book_appointment', methods=['POST'])
def book_appointment():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        therapist_id = data.get('therapist_id')

        if not user_id or not therapist_id:
            return jsonify({"error": "user_id and therapist_id are required"}), 400

        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        therapist = db.session.query(Therapist).filter_by(id=therapist_id).first()
        if not therapist:
            return jsonify({"error": "Therapist not found"}), 404

        new_appointment = Appointment(
            user_id=user_id,
            therapist_id=therapist_id,
            booked_at=datetime.now(timezone.utc)
        )
        db.session.add(new_appointment)

        therapist.patients_queue += 1
        db.session.commit()

        return jsonify({"message": f"Appointment booked for user {user_id} with therapist {therapist_id}"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/alot_badge', methods=['POST'])
def alot_badge():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        badge_id = data.get('badge_id')

        if not user_id or not badge_id:
            return jsonify({"error": "user_id and badge_id are required"}), 400

        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        badge = db.session.query(Badge).filter_by(id=badge_id).first()
        if not badge:
            return jsonify({"error": "Badge not found"}), 404

        existing_badge = UserBadge.query.filter_by(user_id=user_id, badge_id=badge_id).first()
        if existing_badge:
            return jsonify({"error": "Badge already assigned to this user"}), 400

        new_user_badge = UserBadge(user_id=user_id, badge_id=badge_id)
        db.session.add(new_user_badge)
        db.session.commit()

        return jsonify({"message": f"Badge {badge_id} assigned to user {user_id}"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/alot_coupons', methods=['POST'])
def alot_coupons():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        coupon_id = data.get('coupon_id')

        if not user_id or not coupon_id:
            return jsonify({"error": "user_id and coupon_id are required"}), 400

        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        coupon = db.session.query(Coupon).filter_by(id=coupon_id).first()
        if not coupon:
            return jsonify({"error": "Coupon not found"}), 404

        if coupon.total_coupons <= coupon.coupons_allotted:
            return jsonify({"error": "No coupons available for allotment"}), 400

        existing_coupon = UserCoupon.query.filter_by(user_id=user_id, coupon_id=coupon_id).first()
        if existing_coupon:
            return jsonify({"error": "Coupon already assigned to this user"}), 400

        new_user_coupon = UserCoupon(user_id=user_id, coupon_id=coupon_id)
        db.session.add(new_user_coupon)

        coupon.coupons_allotted += 1
        coupon.total_coupons -=1
        user.coupons += 1
        db.session.commit()

        return jsonify({"message": f"Coupon {coupon_id} assigned to user {user_id}"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/log_visit', methods=['POST'])
def log_visit():
    try:
        data = request.get_json()
        module_name = data.get('module_name')

        if not module_name:
            return jsonify({"error": "Module name is required"}), 400

        module_visit = ModuleVisit.query.filter_by(module_name=module_name).first()

        if module_visit:
            module_visit.visit_count += 1
            module_visit.last_visited_at = datetime.now(timezone.utc)
        else:
            module_visit = ModuleVisit(
                module_name=module_name,
                visit_count=1,
                last_visited_at=datetime.now(timezone.utc)
            )
            db.session.add(module_visit)

        db.session.commit()

        return jsonify({"message": f"Visit logged for module '{module_name}'", "visit_count": module_visit.visit_count}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_visit_stats', methods=['GET'])
def get_visit_stats():
    try:
        visits = ModuleVisit.query.all()

        visit_stats = [
            {
                "module_name": visit.module_name,
                "visit_count": visit.visit_count,
                "last_visited_at": visit.last_visited_at.isoformat()
            }
            for visit in visits
        ]

        return jsonify(visit_stats), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
