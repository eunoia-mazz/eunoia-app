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
from app import app, db, User, Activity, SubActivity
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt

# Update the file paths to be relative or environment-variable based
quran_path = os.path.join(os.path.dirname(__file__), '..', '..', 'app-backend', 'quran.txt')
bible_path = os.path.join(os.path.dirname(__file__), '..', '..', 'app-backend', 'bible.txt')

class ActivityTestCase(unittest.TestCase):
    def setUp(self):
        logger.info("Setting up ActivityTestCase")
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
            
            # Create a test subactivity first
            test_subactivity = SubActivity(
                name="Meditation",
                description="Daily meditation practice"
            )
            db.session.add(test_subactivity)
            db.session.commit()
            
            # Create a test activity
            test_activity = Activity(
                mood="Calm",
                activity_path="/activities/meditation",
                recommended_activity="Meditation"
            )
            db.session.add(test_activity)
            db.session.commit()
            
            self.user_id = test_user.id
            self.activity_id = test_activity.id
            logger.info(f"Test user created with ID: {self.user_id}")
            logger.info(f"Test activity created with ID: {self.activity_id}")

    def tearDown(self):
        logger.info("Tearing down ActivityTestCase")
        with app.app_context():
            db.session.remove()
            db.drop_all()
            logger.info("Database tables dropped")

    def test_activity_model(self):
        logger.info("Testing Activity model")
        with app.app_context():
            # Query the activity we created
            activity = Activity.query.get(self.activity_id)
            self.assertIsNotNone(activity)
            self.assertEqual(activity.mood, "Calm")
            self.assertEqual(activity.activity_path, "/activities/meditation")
            self.assertEqual(activity.recommended_activity, "Meditation")
            logger.info("Activity model test passed")

    def test_subactivity_model(self):
        logger.info("Testing SubActivity model")
        with app.app_context():
            # Query the subactivity we created
            subactivity = SubActivity.query.filter_by(name="Meditation").first()
            self.assertIsNotNone(subactivity)
            self.assertEqual(subactivity.name, "Meditation")
            self.assertEqual(subactivity.description, "Daily meditation practice")
            logger.info("SubActivity model test passed")

    def test_activity_relationship(self):
        logger.info("Testing Activity-SubActivity relationship")
        with app.app_context():
            # Query the activity and check its relationship to the subactivity
            activity = Activity.query.get(self.activity_id)
            subactivity = SubActivity.query.filter_by(name="Meditation").first()
            self.assertEqual(activity.recommended_activity, subactivity.name)
            logger.info("Activity-SubActivity relationship test passed")

if __name__ == '__main__':
    unittest.main() 