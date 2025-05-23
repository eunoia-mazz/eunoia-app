from flask import Flask, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_cors import CORS
from sqlalchemy import select, delete, func, extract
import google.generativeai as genai
import os
from sqlalchemy.exc import IntegrityError
from dotenv import load_dotenv
from datetime import datetime, timezone, timedelta
import traceback
import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask_migrate import Migrate
from urllib.parse import quote
from sentence_transformers import SentenceTransformer
import chromadb
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from collections import Counter
import jwt

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///eunoia.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key ="zzboss1234"

EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
print(EMAIL_ADDRESS)
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
logging.basicConfig(level=logging.INFO)

CC_EMAIL = "ammarnadeem490@gmail.com"

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def load_text(txt_path):
    with open(txt_path, 'r', encoding='utf-8') as file:
        return file.read().strip().splitlines()

# Instead of hardcoded paths:
quran_path = os.path.join(os.path.dirname(__file__), 'quran.txt')  
bible_path = os.path.join(os.path.dirname(__file__), 'bible.txt')  
quran_ayat = load_text(quran_path)
bible_verses = load_text(bible_path)
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.PersistentClient(path="chroma_db")
collection = client.get_or_create_collection("eunoia")

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
    phone = db.Column(db.String(20), nullable=True)        
    religion = db.Column(db.String(100), nullable=True)   
    token = db.Column(db.Text, nullable=True)    

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
    completed = db.Column(db.Boolean, default=False, nullable=True)
    completed_at = db.Column(db.DateTime, nullable=True)
    completed_in_time = db.Column(db.Boolean, default=False, nullable=False)

    activity = db.relationship('Activity', backref='user_activity_details', lazy=True)



class Activity(db.Model):
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True)
    mood = db.Column(db.Text, nullable=False)
    activity_path = db.Column(db.Text, nullable=True)
    recommended_activity = db.Column(db.Text,db.ForeignKey('subactivities.name'), nullable=True)

    # user_activities = db.relationship('UserActivity', backref='activity_parent', lazy=True)

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
    duration = db.Column(db.Integer)  
    category = db.Column(db.String(100)) 
    difficulty_level = db.Column(db.Enum('easy', 'medium', 'hard', name='difficulty_levels'))

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
    about = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    specialization = db.Column(db.Text, nullable=True)
    rating = db.Column(db.Integer, nullable=True)
    experience = db.Column(db.Text,nullable=True)
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

class GeneralSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    platform_name = db.Column(db.Text, nullable=False)
    support_email = db.Column(db.Text, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

class SecuritySettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    minimum_password_length = db.Column(db.Integer, default=8)
    two_factor_auth = db.Column(db.Boolean, default=False)
    ssl_encryption = db.Column(db.Boolean, default=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

class NotificationSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email_notifications = db.Column(db.Boolean, default=False)
    push_notifications = db.Column(db.Boolean, default=True)
    sms_notifications = db.Column(db.Boolean, default=False)
    notification_frequency = db.Column(db.Integer, default=24) 
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

class IntegrationSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    google_calendar = db.Column(db.Boolean, default=False)
    slack_integration = db.Column(db.Boolean, default=False)
    zoom_integration = db.Column(db.Boolean, default=False)
    api_key = db.Column(db.Text, nullable=True)
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

class UserSettings(db.Model):
    __tablename__ = 'user_settings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    email_notifications = db.Column(db.Boolean, default=False, nullable=False)
    sms_notifications = db.Column(db.Boolean, default=False, nullable=False)
    push_notifications = db.Column(db.Boolean, default=False, nullable=False)
    location_sharing = db.Column(db.Boolean, default=False, nullable=False)

    user = db.relationship('User', backref=db.backref('settings', uselist=False))



class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    fname = data.get('fname')
    lname = data.get('lname')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

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
        return jsonify({"error": "Invalid email or password"}), 401
    token = jwt.encode({'email': user.email},"This is my secret key", algorithm='HS256')
    user.token = token
    db.session.commit()
    return jsonify({"message": "Login successful", "user": user_schema.dump(user),"token": token}), 200


@app.route('/logout', methods=['POST'])
def logout():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'error': 'Token missing'}), 400

    # Remove "Bearer " from the token if it's in the header
    if token.startswith('Bearer '):
        token = token.split(' ')[1]

    user = User.query.filter_by(token=token).first()
    
    if not user:
        return jsonify({'error': 'Invalid token'}), 400

    user.token = None
    db.session.commit()

    return jsonify({'message': 'Logout successful'}), 200


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



def retrieve_context(user_input):
    """Retrieve relevant context from ChromaDB based on the user query."""
    try:
        query_embedding = embedding_model.encode(user_input)

        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=3  
        )

        if not results or 'metadatas' not in results or not results['metadatas'][0]:
            return "No relevant context found."

        retrieved_contexts = "\n\n".join([
            f"Q: {metadata.get('question', 'N/A')}\n"
            f"A: {metadata.get('answer', 'N/A')}\n"
            f"Context: {metadata.get('context', 'N/A')}"
            for metadata in results['metadatas'][0]
        ])
        return retrieved_contexts

    except Exception as e:
        print(f"Error retrieving context: {e}")
        return "No relevant context found."

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
                
        if not data or 'user_input' not in data:
            return jsonify({"error": "Please say something"}), 400
        user_input = data.get('user_input', 'I am not feeling well')  

        conversation_history = "\n".join(f"{msg.client_msg or ''} {msg.bot_msg or ''}".strip() for msg in messages)
        retrieved_context = retrieve_context(user_input)

        prompt = (
            f"{conversation_history}\n"
            f"User question: {user_input}\n\n"
            f"Relevant context:\n{retrieved_context}\n\n"
            "You are a friendly and helpful chatbot. Provide clear answers and support based on the user's question. "
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
        bot_response = (
            response.candidates[0].content.parts[0].text.strip()
            if response and response.candidates and response.candidates[0].content.parts else "Sorry, I couldn't generate a response."
        )

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


        if not messages:
            return jsonify({"error": "No messages found for this chat"}), 404

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

        if not chats:
            return jsonify({"error": "No chats found for this user"}), 404

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
    
@app.route("/contact_us", methods=["POST"])
def contact_us():
   
        try:
            data = request.get_json() 
            name = data.get('name')
            email = data.get('email')
            query = data.get('query')
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


@app.route('/list_users', methods=['GET'])
def list_users():
    users = db.session.query(
        User.id, User.first_name, User.last_name, User.email, User.treated, User.coupons, User.is_active, User.created_at
    ).all()
    
    user_list = []
    for u in users:
        # Get user's badges
        user_badges = db.session.query(Badge.name).join(UserBadge).filter(UserBadge.user_id == u[0]).all()
        badges = [badge[0] for badge in user_badges]  # Extract just the badge names
        
        user_list.append({
            "id": u[0], 
            "name": f"{u[1]} {u[2]}",
            "email": u[3],
            "Treated": u[4],
            "Coupons": u[5],
            "Active": "yes" if u[6] else "no",
            "Joined At": u[7],
            "badges": badges
        })
    
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
            "rating": review.rating,
            "date":review.created_at,
            "email":user.email
        }
        for review, user in reviews
    ]

    return jsonify(review_list), 200

@app.route('/list_queries', methods=['GET'])
def list_queries():
    queries = db.session.query(ContactUs).all()

    query_list = [
        {
            "id": q.id,
            "name": q.name,
            "email": q.email,
            "query": q.query,
            "contacted_on": q.contacted_on
        }
        for q in queries
    ]
    print(query_list)

    return jsonify(query_list), 200



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
    result = [
        {c.name: getattr(t, c.name) for c in t.__table__.columns}
        for t in therapists
    ]
    return jsonify(result), 200

@app.route('/get_therapist/<int:id>', methods=['GET'])
def get_therapist(id):
    therapist = db.session.query(Therapist).get(id)
    if therapist is None:
        return jsonify({'error': 'Therapist not found'}), 404

    result = {c.name: getattr(therapist, c.name) for c in therapist.__table__.columns}
    return jsonify(result), 200


@app.route('/edit_therapist/<int:therapist_id>', methods=['PUT'])
def edit_therapist(therapist_id):
    data = request.get_json()
    therapist = Therapist.query.filter_by(id=therapist_id).first()
    if not therapist:
        return jsonify({"error": "Therapist not found"}), 404

    try:
        if 'name' in data:
            therapist.name = data['name']
        if 'designation' in data:
            therapist.designation = data['designation']
        if 'qualification' in data:
            therapist.qualification = data['qualification']
        if 'location' in data:
            therapist.location = data['location']
        if 'is_available' in data:
            therapist.is_available = data['is_available']

        db.session.commit()
        return jsonify({"message": "Therapist updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/view_patients/<int:therapist_id>', methods=['GET'])
def view_patients(therapist_id):
    therapist = Therapist.query.filter_by(id=therapist_id).first()
    if not therapist:
        return jsonify({"error": "Therapist not found"}), 404

    appointments = Appointment.query.filter_by(therapist_id=therapist_id).all()
    patients_in_queue = []
    patients_treated = []

    for appointment in appointments:
        patient = {
            "id": appointment.user.id,
            "name": f"{appointment.user.first_name} {appointment.user.last_name}",
            "email": appointment.user.email,
            "treated": "Yes" if appointment.user.treated else "No"
        }
        if appointment.user.treated:
            patients_treated.append(patient)
        else:
            patients_in_queue.append(patient)

    return jsonify({
        "patients_in_queue": patients_in_queue,
        "patients_treated": patients_treated
    }), 200




@app.route('/add_finances', methods=['POST'])
def add_finances():
    data = request.get_json()
    money_str = data.get('money')
    money = float(money_str)
    if money <= 0:
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
    coupon_id_str = data.get('coupon_id')
    num_coupons_str = data.get('num_coupons')
    num_coupons=float(num_coupons_str)
    coupon_id=float(coupon_id_str)
    print(num_coupons,coupon_id)

    if not coupon_id or num_coupons <= 0:
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
    num_coupons_str = data.get('num_coupons')
    valid_until = data.get('valid_until')
    num_coupons=float(num_coupons_str)
    print(partner_name,num_coupons,valid_until)
    if not partner_name  or num_coupons <= 0:
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
    try:
        if not all(key in data for key in ['name', 'description', 'reps', 'duration', 'category', 'difficulty_level']):
            return jsonify({"error": "All fields are required"}), 400
        
        difficulty_level = data.get('difficulty_level')
        if difficulty_level not in ['easy', 'medium', 'hard']:
            raise ValueError(f"Invalid difficulty level: {difficulty_level}")

        new_exercise = SubActivity(
            name=data['name'],
            description=data['description'],
            reps=int(data['reps']),
            duration=int(data['duration']),
            category=data['category'],
            difficulty_level=data['difficulty_level'],
            is_active=True
        )
        db.session.add(new_exercise)
        db.session.commit()
        return jsonify({"message": "Exercise added successfully", "exercise_id": new_exercise.id}), 201
    except ValueError:
        return jsonify({"error": "Invalid input for integer fields"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500




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

@app.route('/enable_exercise', methods=['POST'])
def enable_exercise():
    data = request.get_json()
    exercise_id = data.get('exercise_id')

    if not exercise_id:
        return jsonify({"error": "exercise_id is required"}), 400

    exercise = SubActivity.query.filter_by(id=exercise_id).first()
    if not exercise:
        return jsonify({"error": "Exercise not found"}), 404

    if exercise.is_active:
        return jsonify({"message": "Exercise is already active."}), 200

    exercise.is_active = True
    db.session.commit()

    return jsonify({"message": f"Exercise with ID {exercise_id} has been reactivated successfully."}), 200



@app.route('/list_exercises', methods=['GET'])
def list_exercises():
    exercises = SubActivity.query.filter_by(is_active=True).all()
    exercise_list = [
        {
            "id": exercise.id,
            "name": exercise.name,
            "description": exercise.description,
            "reps": exercise.reps,
            "duration": exercise.duration,
            "category": exercise.category,
            "difficulty_level": exercise.difficulty_level
        }
        for exercise in exercises
    ]
    return jsonify(exercise_list), 200

@app.route('/edit_exercise/<int:exercise_id>', methods=['PUT'])
def edit_exercise(exercise_id):
    data = request.get_json()
    exercise = SubActivity.query.filter_by(id=exercise_id).first()

    if not exercise:
        return jsonify({"error": "Exercise not found"}), 404

    try:
        if 'name' in data:
            exercise.name = data['name']
        if 'description' in data:
            exercise.description = data['description']
        if 'reps' in data:
            exercise.reps = int(data['reps'])
        if 'duration' in data:
            exercise.duration = int(data['duration'])
        if 'category' in data:
            exercise.category = data['category']
        if 'difficulty_level' in data:
            if data['difficulty_level'] in ['easy', 'medium', 'hard']:
                exercise.difficulty_level = data['difficulty_level']
            else:
                return jsonify({"error": "Invalid difficulty level. Allowed values are: easy, medium, hard"}), 400
        if 'is_active' in data:
            exercise.is_active = data['is_active']
        
        db.session.commit()
        return jsonify({"message": "Exercise updated successfully"}), 200
    except ValueError:
        db.session.rollback()
        return jsonify({"error": "Invalid input for integer fields"}), 400
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500




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
            prompt = f"Analyze the following journal and determine the mood. Just give a single word answer.Mood must be among these [\"happy\", \"sad\", \"angry\", \"calm\", \"stressed\", \"excited\", \"bored\", \"anxious\", \"content\"].Just give a single word answer.\nJournal: {text}"
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
            "mood": detected_mood,
            "created_at":new_journal.created_at
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
            .join(User, db.and_(Mood.user_id == User.id, User.is_active == True))
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
                "name": f"{user.first_name} {user.last_name}",
                "mood": mood.mood_category
            }
            mood_data[mood.mood_category.lower()].append(mood_entry)

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
            "created_by": created_by
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


@app.route('/list_forums', methods=['GET'])
def list_forums():
    try:
        forums = db.session.query(Forum, User).join(User, Forum.created_by == User.id).all()

        forum_list = [
            {
                "id": forum.id,
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
        membership = ForumMembership.query.filter_by(forum_id=forum_id, user_id=user_id).first()
        if not membership:
            return jsonify({"error": "User is not a member of this forum"}), 403

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
        
        user = db.session.query(User).filter_by(id=forum.created_by).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

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

@app.route('/update_visit_stats', methods=['PUT'])
def update_visit_stats():
    try:
        data = request.get_json()
        module_name = data.get('module_name')
        visit_count = data.get('visit_count')
        last_visited_at = data.get('last_visited_at')

        visit = ModuleVisit.query.filter_by(module_name=module_name).first()
        if not visit:
            return jsonify({"error": "Module not found."}), 404

        visit.visit_count = visit_count
        visit.last_visited_at = datetime.fromisoformat(last_visited_at)

        db.session.commit()

        return jsonify({"message": "Visit stats updated successfully."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete_visit_stats', methods=['DELETE'])
def delete_visit_stats():
    try:
        data = request.get_json()
        module_name = data.get('module_name')

        visit = ModuleVisit.query.filter_by(module_name=module_name).first()
        if not visit:
            return jsonify({"error": "Module not found."}), 404

        db.session.delete(visit)
        db.session.commit()

        return jsonify({"message": "Visit stats deleted successfully."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/user_growth', methods=['GET'])
def user_growth():
    current_month = datetime.now(timezone.utc).month
    current_year = datetime.now(timezone.utc).year
    
    start_year = current_year - 1 if current_month == 1 else current_year
    start_month = current_month + 1 if current_month < 12 else 1

    start_date = datetime(start_year, start_month, 1)
    end_date = datetime(current_year, current_month, 1)

    user_counts = db.session.query(
        extract('year', User.created_at).label('year'),
        extract('month', User.created_at).label('month'),
        func.count(User.id).label('count')
    ).filter(User.created_at >= start_date, User.created_at < end_date
    ).group_by('year', 'month'
    ).order_by('year', 'month').all()

    results = []
    for i in range(12):
        year = (start_year if start_month + i <= 12 else start_year + 1)
        month = (start_month + i - 1) % 12 + 1
        month_name = datetime(year, month, 1).strftime('%B %Y').lower()
        results.append({month_name: 0}) 

    for year, month, count in user_counts:
        month_name = datetime(year, month, 1).strftime('%B %Y').lower()
        for result in results:
            if month_name in result:
                result[month_name] = count
                break

    total_users = sum(result[next(iter(result))] for result in results)
    results.append({'total_users': total_users})

    return jsonify(results)


@app.route('/get_moods_counts', methods=['GET'])
def get_moods_counts():
    try:
        subquery = db.session.query(
            Mood.user_id,
            db.func.max(Mood.date).label('latest_date')
        ).group_by(Mood.user_id).subquery('latest_moods')

        mood_counts = db.session.query(
            Mood.mood_category,
            db.func.count(Mood.user_id).label('count')
        ).join(
            subquery,
            db.and_(
                Mood.user_id == subquery.c.user_id,
                Mood.date == subquery.c.latest_date
            )
        ).join(
            User, db.and_(Mood.user_id == User.id, User.is_active == True)
        ).group_by(Mood.mood_category).all()

        result = {
           "happy":0, 
            "sad":0,
            "angry":0,
            "calm":0,
            "stressed":0,
            "excited":0,
            "bored":0,
            "anxious":0,
            "content":0,
        }

        for mood, count in mood_counts:
            mood_key = mood.lower() 
            if mood_key in result:
                result[mood_key] = count

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/edit_user_admin/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    if not request.json:
        return jsonify({"error": "No input data provided"}), 400

    data = request.json
    try:
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'email' in data:
            if User.query.filter(User.email == data['email'], User.id != user_id).first():
                return jsonify({"error": "Email already in use"}), 400
            user.email = data['email']
        if 'is_active' in data:
            user.is_active = data['is_active']

        db.session.commit()
        return jsonify({"message": "User updated successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# It will only run in browser
@app.route('/respond_to_review/<int:user_id>', methods=['GET'])
def respond_to_review(user_id):
    try:
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        subject = quote("Response to Your Feedback")
        body = quote("Dear {},\n\nThank you for your feedback.".format(user.first_name))

        mailto_link = f"mailto:{user.email}?subject={subject}&body={body}"

        return redirect(mailto_link)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    




@app.route('/store_mood', methods=['POST'])
def store_mood():
    data = request.get_json()
    user_id = data.get('user_id')
    mood_category = data.get('mood_category')

    if not user_id or not mood_category:
        return jsonify({"error": "Missing data: user_id and mood_category are required."}), 400

    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"error": "User not found."}), 404

    new_mood = Mood(
        user_id=user_id,
        mood_category=mood_category,
        date=datetime.now(timezone.utc) 
    )

    db.session.add(new_mood)
    db.session.commit()

    return jsonify({"message": "Mood stored successfully.", "mood_id": new_mood.id}), 201


@app.route('/mark_activity_as_done', methods=['POST'])
def mark_activity_as_done():
    data = request.get_json()
    user_id = data.get('user_id')
    activity_id = data.get('activity_id')

    activity = UserActivity.query.filter_by(user_id=user_id, activity_id=activity_id).first()
    if not activity:
        return jsonify({"error": "Activity not found or already marked as done"}), 404

    if activity.completed:
        return jsonify({"error": "Activity is already marked as done"}), 409

    activity.completed = True
    activity.completed_at = datetime.now()

    if activity.deadline and activity.completed_at <= activity.deadline:
        activity.completed_in_time = True
    else:
        activity.completed_in_time = False

    db.session.commit()

    return jsonify({
        "message": "Activity marked as done successfully",
        "completed_in_time": activity.completed_in_time
    }), 200


# @app.route('/get_activities/<int:user_id>', methods=['GET'])
# def get_activities(user_id):
#     assigned_activities = UserActivity.query.filter_by(user_id=user_id, completed=False).all()
#     completed_activities = UserActivity.query.filter_by(user_id=user_id, completed=True).all()
#     print(assigned_activities,completed_activities)
#     assigned_list = [
#         {
#             "activity_id": act.activity_id,
#             "activity_name": act.activity.name,  # Assuming 'name' is a field in the Activity model
#             "deadline": act.deadline.strftime('%Y-%m-%d %H:%M:%S') if act.deadline else "No deadline"
#         }
#         for act in assigned_activities
#     ]

#     completed_list = [
#         {
#             "activity_id": act.activity_id,
#             "activity_name": act.activity.name,  # Assuming 'name' is a field in the Activity model
#             "completed_at": act.completed_at.strftime('%Y-%m-%d %H:%M:%S') if act.completed_at else "Not marked",
#             "completed_in_time": act.completed_in_time
#         }
#         for act in completed_activities
#     ]

#     return jsonify({"Assigned Activities": assigned_list, "Completed Activities": completed_list}), 200
#     # assigned_list = [{"activity_id": act.activity_id} for act in assigned_activities]
#     # completed_list = [{"activity_id": act.activity_id, "completed_at": act.completed_at.strftime('%Y-%m-%d %H:%M:%S') if act.completed_at else "Not marked"} for act in completed_activities]

#     # return jsonify({"Assigned Activities": assigned_list, "Completed Activities": completed_list}), 200
@app.route('/get_activities/<int:user_id>', methods=['GET'])
def get_activities(user_id):
    try:
        # Get active and completed activities
        assigned_activities = UserActivity.query.filter_by(
            user_id=user_id, 
            completed=False
        ).all()

        completed_activities = UserActivity.query.filter_by(
            user_id=user_id, 
            completed=True
        ).all()

        # Serialize assigned activities
        assigned_list = [{
            "activity_id": ua.activity.id,
            "activity_name": ua.activity.recommended_activity,
            "mood": ua.activity.mood,
            "activity_path": ua.activity.activity_path,
            "deadline": ua.deadline.strftime('%Y-%m-%d %H:%M:%S') if ua.deadline else None
        } for ua in assigned_activities]

        # Serialize completed activities
        completed_list = [{
            "activity_id": ua.activity.id,
            "activity_name": ua.activity.recommended_activity,
            "completed_at": ua.completed_at.strftime('%Y-%m-%d %H:%M:%S') if ua.completed_at else None,
            "completed_in_time": ua.completed_in_time
        } for ua in completed_activities]

        return jsonify({
            "assigned_activities": assigned_list,
            "completed_activities": completed_list
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recommend_activity', methods=['POST'])
def recommend_activity():
    user_id = request.json.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    latest_mood = Mood.query.filter(Mood.user_id == user_id).order_by(Mood.date.desc()).first()
    if not latest_mood:
        return jsonify({"error": "No mood data found for the user"}), 404

    subactivities = SubActivity.query.filter_by(is_active=True).all()
    subactivities_list = [subactivity.name for subactivity in subactivities]

    try:
        # prompt = f"Generate a simple activity path for a user feeling {latest_mood.mood_category}. Suggest a sequence of these activities: {', '.join(subactivities_list)}. The output should be formatted as a simple comma list."
        # response = model.generate_content(prompt)
        # activity_path = response.candidates[0].content.parts[0].text.strip()

        # recommended_activities = activity_path.split(', ')

        deadline = datetime.now() + timedelta(days=7)

        new_activity = Activity(
            mood=latest_mood.mood_category, 
            activity_path=subactivities_list, 
            recommended_activity=', '.join(recommended_activities)
        )
        db.session.add(new_activity)
        db.session.commit()

        new_user_activity = UserActivity(
            user_id=user_id, 
            activity_id=new_activity.id, 
            recommended_at=datetime.now(), 
            deadline=deadline
        )
        db.session.add(new_user_activity)
        db.session.commit()

        return jsonify({
            "message": "Activity recommended successfully",
            "activity_path": activity_path,
            "deadline": deadline.strftime("%Y-%m-%d")
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    


@app.route('/store_user_settings', methods=['POST'])
def store_user_settings():
    data = request.get_json()
    user_id = data.get('user_id')
    email_notifications = data.get('email_notifications', False)
    sms_notifications = data.get('sms_notifications', False)
    push_notifications = data.get('push_notifications', False)
    location_sharing = data.get('location_sharing', False)

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    settings = UserSettings.query.filter_by(user_id=user_id).first()
    
    if settings:
        settings.email_notifications = email_notifications
        settings.sms_notifications = sms_notifications
        settings.push_notifications = push_notifications
        settings.location_sharing = location_sharing
    else:
        settings = UserSettings(
            user_id=user_id,
            email_notifications=email_notifications,
            sms_notifications=sms_notifications,
            push_notifications=push_notifications,
            location_sharing=location_sharing
        )
        db.session.add(settings)
    
    db.session.commit()

    return jsonify({"message": "User settings updated successfully"}), 200


@app.route('/get_user_settings/<int:user_id>', methods=['GET'])
def get_user_settings(user_id):
    settings = UserSettings.query.filter_by(user_id=user_id).first()
    
    if not settings:
        return jsonify({"error": "Settings not found for this user"}), 404
    
    return jsonify({
        "user_id": user_id,
        "email_notifications": settings.email_notifications,
        "sms_notifications": settings.sms_notifications,
        "push_notifications": settings.push_notifications,
        "location_sharing": settings.location_sharing
    }), 200

@app.route('/edit_profile/<int:user_id>', methods=['PUT'])
def edit_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'email' in data:
        if User.query.filter(User.email == data['email'], User.id != user_id).first():
            return jsonify({"error": "Email already in use"}), 409
        user.email = data['email']
    if 'password' in data:
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user.password = hashed_password

    db.session.commit()
    return jsonify({"message": "Profile updated successfully"}), 200

@app.route('/store_general_settings', methods=['POST'])
def create_general_settings():
    data = request.get_json()
    settings = GeneralSettings(platform_name=data['platform_name'], support_email=data['support_email'])
    db.session.add(settings)
    db.session.commit()
    return jsonify({"message": "General settings saved successfully."}), 201

@app.route('/get_general_settings', methods=['GET'])
def get_general_settings():
    settings = GeneralSettings.query.first()
    if settings:
        return jsonify({
            "platform_name": settings.platform_name,
            "support_email": settings.support_email
        }), 200
    return jsonify({"error": "General settings not found"}), 404



@app.route('/store_security_settings', methods=['POST'])
def create_security_settings():
    data = request.get_json()
    settings = SecuritySettings(
        minimum_password_length=data['minimum_password_length'],
        two_factor_auth=data['two_factor_auth'],
        ssl_encryption=data['ssl_encryption']
    )
    db.session.add(settings)
    db.session.commit()
    return jsonify({"message": "Security settings saved successfully."}), 201

@app.route('/get_security_settings', methods=['GET'])
def get_security_settings():
    settings = SecuritySettings.query.first()
    if settings:
        return jsonify({
            "minimum_password_length": settings.minimum_password_length,
            "two_factor_auth": settings.two_factor_auth,
            "ssl_encryption": settings.ssl_encryption
        }), 200
    return jsonify({"error": "Security settings not found"}), 404




@app.route('/store_notifications_settings', methods=['POST'])
def create_notification_settings():
    data = request.get_json()
    settings = NotificationSettings(
        email_notifications=data['email_notifications'],
        push_notifications=data['push_notifications'],
        sms_notifications=data['sms_notifications'],
        notification_frequency=data['notification_frequency']
    )
    db.session.add(settings)
    db.session.commit()
    return jsonify({"message": "Notification settings saved successfully."}), 201

@app.route('/get_notifications_settings', methods=['GET'])
def get_notification_settings():
    settings = NotificationSettings.query.first()
    if settings:
        return jsonify({
            "email_notifications": settings.email_notifications,
            "push_notifications": settings.push_notifications,
            "sms_notifications": settings.sms_notifications,
            "notification_frequency": settings.notification_frequency
        }), 200
    return jsonify({"error": "Notification settings not found"}), 404




@app.route('/store_integration_settings', methods=['POST'])
def create_integration_settings():
    data = request.get_json()
    settings = IntegrationSettings(
        google_calendar=data['google_calendar'],
        slack_integration=data['slack_integration'],
        zoom_integration=data['zoom_integration'],
        api_key=data['api_key']
    )
    db.session.add(settings)
    db.session.commit()
    return jsonify({"message": "Integration settings saved successfully."}), 201

@app.route('/get_integration_settings', methods=['GET'])
def get_integration_settings():
    settings = IntegrationSettings.query.first()
    if settings:
        return jsonify({
            "google_calendar": settings.google_calendar,
            "slack_integration": settings.slack_integration,
            "zoom_integration": settings.zoom_integration,
            "api_key": settings.api_key
        }), 200
    return jsonify({"error": "Integration settings not found"}), 404

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
    
@app.route('/profile', methods=['PATCH'])
def update_profile():
    try:
        data = request.get_json()
        client_id = data.get('client_id')
        if not client_id:
            return jsonify({"error": "Client ID is required"}), 400

        user = db.session.get(User, client_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        if 'fname' in data:
            user.first_name = data['fname']
        if 'lname' in data:
            user.last_name = data['lname']
        if 'phone' in data:
            user.phone = data['phone']
        if 'religion' in data:
            user.religion = data['religion']
        user.updated_at = datetime.now(timezone.utc)
        db.session.commit()
        return jsonify({"message": "Profile updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500  

        daily_moods.setdefault(day, []).append(mood.mood_category)

ALLOWED_MOODS = {"happy", "sad", "angry", "calm", "stressed", "excited", "bored", "anxious", "content"}

@app.route('/user/<int:user_id>/weekly_moods', methods=['GET'])
def get_weekly_moods(user_id):
    try:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=7)

        moods = (
            db.session.query(Mood)
            .filter(
                Mood.user_id == user_id,
                Mood.date >= start_date,
                Mood.date <= end_date
            )
            .order_by(Mood.date)
            .all()
        )

        # Group moods by day and convert each mood to lowercase.
        daily_moods = {}
        for mood in moods:
            day = mood.date.strftime('%Y-%m-%d')
            mood_lower = mood.mood_category.lower()
            # Only add if the mood is allowed
            if mood_lower in ALLOWED_MOODS:
                daily_moods.setdefault(day, []).append(mood_lower)

        weekly_data = {}
        for day, moods_list in daily_moods.items():
            if moods_list:
                # Determine overall mood as the most common allowed mood
                overall_mood = Counter(moods_list).most_common(1)[0][0]
            else:
                overall_mood = None
            weekly_data[day] = {
                "overall_mood": overall_mood,
                "all_moods": moods_list
            }

        return jsonify({
            "user_id": user_id,
            "weekly_moods": weekly_data
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500






# Schduler to respond to journals of day
def check_and_add_activities():
    with app.app_context():
        # Get the current date to filter journals by date
        # today_date = (datetime.now() - timedelta(days=1)).date()
        today_date = datetime.now().date()
        print("today_date",today_date)

        # Get all users who have less than 10 activities
        users = User.query.all()
        print("users",users)
        for user in users:
            # Count the number of journals for the user on the current day
            journals_today = Journal.query.filter(
                Journal.user_id == user.id,
                db.func.date(Journal.created_at) == today_date
            ).all()
            print("journals_today",journals_today)

            if len(journals_today) >= 1:  # If there is at least 1 journal for the day
                # Get the latest mood of the user
                latest_mood = Mood.query.filter(Mood.user_id == user.id).order_by(Mood.date.desc()).first()
           
                if not latest_mood:
                    continue  # Skip if no mood data is found

                # Check if user has less than 10 activities
                user_activities_count = UserActivity.query.filter_by(user_id=user.id).count()
                if user_activities_count < 10:
                    # Get all active subactivities
                    subactivities = SubActivity.query.filter_by(is_active=True).all()
                    subactivities_list = [subactivity.name for subactivity in subactivities]

                    try:
                        # Generate activity path based on user's mood
                        prompt = (
                            f"Generate a simple activity path for a user feeling {latest_mood.mood_category}. "
                            f"Suggest a sequence of these activities: {', '.join(subactivities_list)}. "
                            "The output should be formatted as a simple comma list."
                        )
                        response = model.generate_content(prompt)
                        activity_path = response.candidates[0].content.parts[0].text.strip()

                        recommended_activities = activity_path.split(', ')

                        # Set the deadline for the activity
                        deadline = datetime.now() + timedelta(days=7)
                        print(recommended_activities,deadline,response)
                        # Create a new activity
                        new_activity = Activity(
                            mood=latest_mood.mood_category,
                            activity_path=activity_path,
                            recommended_activity=', '.join(recommended_activities)
                        )
                        db.session.add(new_activity)
                        db.session.commit()

                        # Add the activity to user_activities
                        new_user_activity = UserActivity(
                            user_id=user.id,
                            activity_id=new_activity.id,
                            recommended_at=datetime.now(),
                            deadline=deadline,
                            completed=False  # Explicitly setting the value
                        )
                        db.session.add(new_user_activity)
                        db.session.commit()

                        # Remove the journals for the day once activities are added
                        for journal in journals_today:
                            db.session.delete(journal)
                        db.session.commit()

                        print(f"Activities added for user {user.id} and journals removed for {today_date}")

                    except Exception as e:
                        db.session.rollback()
                        print(f"Error occurred while recommending activity for user {user.id}: {str(e)}")
                        continue
                else:
                    print(f"User {user.id} already has 10 activities. No new activities added.")


# Scheduler to run the check_and_add_activities function every midnight
# scheduler = BackgroundScheduler()
# scheduler.add_job(check_and_add_activities, 'interval', days=1, start_date='2025-04-06 00:00:00')  # Start at midnight of a specific date
# scheduler.start()
scheduler = BackgroundScheduler()
start_time = datetime.now() + timedelta(seconds=10)  # Set to 10 seconds from now
scheduler.add_job(check_and_add_activities, 'date', run_date=start_time)  # Run once at the specified time
scheduler.start()


@app.route('/list_badges', methods=['GET'])
def list_badges():
    try:
        badges = db.session.query(Badge).all()
        badge_list = [{"id": badge.id, "name": badge.name} for badge in badges]
        return jsonify(badge_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

with app.app_context():
    db.create_all()
@app.route('/get_user_badges/<int:user_id>', methods=['GET'])
def get_user_badges(user_id):
    
    badges = (
        db.session.query(Badge)
        .join(UserBadge)
        .filter(UserBadge.user_id == user_id)
        .all()
    )
    print("''''''''''''''''''''''''''''''''''''''''''''")
    print("''''''''''''''''''''''''''''''''''''''''''''")
    print("''''''''''''''''''''''''''''''''''''''''''''")
    print("''''''''''''''''''''''''''''''''''''''''''''")

    print("''''''''''''''''''''''''''''''''''''''''''''")
    print("user_id",badges)
    return [
        {
            "id": badge.id,
            "name": badge.name,
            "picture": badge.picture
        }
        for badge in badges
    ]




if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
