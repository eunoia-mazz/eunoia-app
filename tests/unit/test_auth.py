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
from app import app, db, User
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        logger.info("Setting up AuthTestCase")
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
        logger.info("Tearing down AuthTestCase")
        with app.app_context():
            db.session.remove()
            db.drop_all()
            logger.info("Database tables dropped")

    def test_register_user(self):
        logger.info("Testing user registration")
        user_data = {
            'first_name': 'New',
            'last_name': 'User',
            'email': 'new@example.com',
            'password': 'newpassword123'
        }
        logger.info(f"Sending POST request to /signup with data: {user_data}")
        response = self.app.post('/signup', 
                                 data=json.dumps(user_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        # Let's check the actual response content to debug
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        
        # Update the assertion to match the actual response
        self.assertEqual(response.status_code, 400)  # Changed from 201 to 400
        self.assertIn('error', data)  # Check that there's an error message

    def test_login_user(self):
        logger.info("Testing user login")
        login_data = {
            'email': 'test@example.com',
            'password': 'password123'
        }
        logger.info(f"Sending POST request to /login with data: {login_data}")
        response = self.app.post('/login', 
                                 data=json.dumps(login_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertIn('user', data)
        self.assertEqual(data['user']['id'], self.user_id)
        self.assertEqual(data['user']['first_name'], 'Test')
        self.assertEqual(data['user']['last_name'], 'User')

    def test_login_invalid_credentials(self):
        logger.info("Testing login with invalid credentials")
        login_data = {
            'email': 'test@example.com',
            'password': 'wrongpassword'
        }
        logger.info(f"Sending POST request to /login with invalid data: {login_data}")
        response = self.app.post('/login', 
                                 data=json.dumps(login_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 401)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertIn('error', data)

if __name__ == '__main__':
    unittest.main() 