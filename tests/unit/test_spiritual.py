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
from app import app, db, User, Chat, Message
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt
from unittest.mock import patch

class SpiritualContentTestCase(unittest.TestCase):
    def setUp(self):
        logger.info("Setting up SpiritualContentTestCase")
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
        logger.info("Tearing down SpiritualContentTestCase")
        with app.app_context():
            db.session.remove()
            db.drop_all()
            logger.info("Database tables dropped")

    def test_create_chat(self):
        logger.info("Testing chat creation")
        chat_data = {'user_id': self.user_id}
        logger.info(f"Creating a new chat with data: {chat_data}")
        response = self.app.post('/create_chat', 
                                 data=json.dumps(chat_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertIn('chat_id', data)
        logger.info(f"Chat created with ID: {data['chat_id']}")
        

if __name__ == '__main__':
    unittest.main() 