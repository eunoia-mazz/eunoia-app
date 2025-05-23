from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json
import random
import time

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///eunoia.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Therapist model
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
    experience =  db.Column(db.Text, nullable=True)

def generate_therapist_info(therapist):
    prompt = f"""
    Generate additional information for a therapist with the following details:
    Name: {therapist.name}
    Designation: {therapist.designation}
    Qualification: {therapist.qualification}

    Return a JSON object in this exact format without any markdown formatting or additional text:
    {{
        "location": "<randomly choose: Lahore, Karachi, or Islamabad>",
        "rating": <randomly choose one value : 3, 4, or 5>,
        "description": "<2-3 sentences about their practice>",
        "about": "<3-4 sentences about their background>",
        "specialization": "<2-3 mental health specialties>",
        "experience":"<Give a random 'x-y' string where x is 1-4 and y = x + 1>"
    }}
    """

    try:
        response = model.generate_content(prompt)
        # Clean the response text
        text = response.text.strip()
        if text.startswith('```json'):
            text = text[7:]  # Remove ```json
        if text.endswith('```'):
            text = text[:-3]  # Remove ```
        
        # Print cleaned response for debugging
        print(f"Cleaned response: {text}")
        
        result = json.loads(text)
        return result
    except Exception as e:
        print(f"Error generating info for {therapist.name}: {str(e)}")
        # Fallback to random data if API fails
        cities = ['Lahore', 'Karachi', 'Islamabad']
        specialties = ['Anxiety & Depression', 'Cognitive Behavioral Therapy', 'Family Counseling', 
                      'Trauma Recovery', 'Stress Management', 'Mental Wellness']
        return {
            'location': random.choice(cities),
            'rating': random.randint(3, 5),
            'description': 'Experienced therapist providing compassionate care and evidence-based treatment.',
            'about': 'Dedicated mental health professional with years of experience in helping clients achieve emotional well-being.',
            'specialization': ', '.join(random.sample(specialties, 2)),
            'experience':'1-2'
        }

def update_therapists():
     with app.app_context():
        therapists = Therapist.query.all()
        print(f"Found {len(therapists)} therapists")

        for therapist in therapists:
            print(f"\nUpdating therapist: {therapist.name}")
            
            # Add delay between requests to avoid rate limiting
            time.sleep(2)
            
            info = generate_therapist_info(therapist)
            if info:
                try:
                    # Always use random choice for rating to ensure variability
                    therapist.rating = random.choice([3, 4, 5])
                    # Process other fields
                    therapist.location = info.get('location', random.choice(['Lahore', 'Karachi', 'Islamabad']))
                    therapist.description = info.get('description', 'Experienced therapist providing compassionate care.')
                    therapist.about = info.get('about', 'Dedicated mental health professional.')
                    
                    # Handle specialization which might come as list or string
                    specs = info.get('specialization')
                    if isinstance(specs, list):
                        specs = ', '.join(specs)
                    elif not specs:
                        specs = random.choice([
                            'Anxiety & Depression, Stress Management',
                            'Cognitive Behavioral Therapy, Trauma Recovery',
                            'Family Counseling, Mental Wellness'
                        ])
                    therapist.specialization = specs
                    
                    # Handle experience
                    exp = info.get('experience')
                    if not exp:
                        x = random.randint(1, 4)
                        exp = f"{x}-{x+1}"
                    therapist.experience = exp
                    
                    db.session.commit()
                    print(f"Successfully updated {therapist.name} with rating: {therapist.rating}")
                except Exception as e:
                    print(f"Error updating database for {therapist.name}: {str(e)}")
                    db.session.rollback()

if __name__ == "__main__":
    update_therapists() 