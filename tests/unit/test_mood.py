import unittest
import json
import sys
import os
import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
# Fix the import path to point to app-backend
app_backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'app-backend'))
sys.path.insert(0, app_backend_path)
# Now import from app.py directly
from app import app, db, User, Mood
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt


class MoodTestCase(unittest.TestCase):
    def setUp(self):
        logger.info("Setting up MoodTestCase")
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        app.config['TESTING'] = True
        self.app = app.test_client()
        with app.app_context():
            db.create_all()
            logger.info("Database tables created")
            # Create a test user
            bcrypt = Bcrypt()
            hashed_password = bcrypt.generate_password_hash('password123').decode('utf-8')
            test_user = User(
                first_name='Test',
                last_name='User',
                email='test@example.com',
                password=hashed_password,
                created_at=datetime.now(timezone.utc)
            )
            db.session.add(test_user)
            db.session.commit()
            self.user_id = test_user.id
            logger.info(f"Test user created with ID: {self.user_id}")

    def tearDown(self):
        logger.info("Tearing down MoodTestCase")
        with app.app_context():
            db.session.remove()
            db.drop_all()
            logger.info("Database tables dropped")

    def test_store_mood(self):
        logger.info("Testing mood storage")
        # Test storing a mood
        mood_data = {
            'user_id': self.user_id,
            'mood_category': 'happy'
        }
        logger.info(f"Sending POST request to /store_mood with data: {mood_data}")
        response = self.app.post('/store_mood', 
                                 data=json.dumps(mood_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertIn('mood_id', data)
        
        # Verify the mood was stored in the database
        with app.app_context():
            mood = Mood.query.filter_by(user_id=self.user_id).first()
            self.assertIsNotNone(mood)
            self.assertEqual(mood.mood_category, 'happy')
            self.assertEqual(mood.day, datetime.now(timezone.utc).strftime("%A"))
            logger.info(f"Mood created with ID: {mood.id}, category: '{mood.mood_category}', day: '{mood.day}'")

    def test_get_moods_counts(self):
        logger.info("Testing mood counts retrieval")
        # Add some moods to the database
        with app.app_context():
            # Create another test user
            bcrypt = Bcrypt()
            hashed_password = bcrypt.generate_password_hash('password456').decode('utf-8')
            test_user2 = User(
                first_name='Another',
                last_name='User',
                email='another@example.com',
                password=hashed_password,
                created_at=datetime.now(timezone.utc)
            )
            db.session.add(test_user2)
            db.session.commit()
            user2_id = test_user2.id
            logger.info(f"Second test user created with ID: {user2_id}")
            
            # Add moods for both users
            mood1 = Mood(user_id=self.user_id, mood_category='happy', date=datetime.now(timezone.utc))
            mood2 = Mood(user_id=user2_id, mood_category='sad', date=datetime.now(timezone.utc))
            db.session.add_all([mood1, mood2])
            db.session.commit()
            logger.info(f"Added test moods: happy for user1, sad for user2")
        
        # Test getting mood counts
        logger.info("Sending GET request to /get_moods_counts")
        response = self.app.get('/get_moods_counts')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertEqual(data['happy'], 1)
        self.assertEqual(data['sad'], 1)
        self.assertEqual(data['angry'], 0)
        self.assertEqual(data['neutral'], 0)
        logger.info("Mood counts verified: happy=1, sad=1, angry=0, neutral=0")

if __name__ == '__main__':
    unittest.main() 