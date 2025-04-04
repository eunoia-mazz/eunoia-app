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
from app import app, db, User, Forum, ForumMessage, ForumMembership
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt

class ForumTestCase(unittest.TestCase):
    def setUp(self):
        logger.info("Setting up ForumTestCase")
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        app.config['TESTING'] = True
        self.app = app.test_client()
        with app.app_context():
            db.create_all()
            logger.info("Database tables created")
            # Create test users
            bcrypt = Bcrypt()
            hashed_password = bcrypt.generate_password_hash('password123').decode('utf-8')
            
            test_user1 = User(
                first_name='Test',
                last_name='User1',
                email='test1@example.com',
                password=hashed_password,
                created_at=datetime.now(timezone.utc)
            )
            
            test_user2 = User(
                first_name='Test',
                last_name='User2',
                email='test2@example.com',
                password=hashed_password,
                created_at=datetime.now(timezone.utc)
            )
            
            db.session.add_all([test_user1, test_user2])
            db.session.commit()
            
            self.user1_id = test_user1.id
            self.user2_id = test_user2.id
            logger.info(f"Test users created with IDs: {self.user1_id}, {self.user2_id}")

    def tearDown(self):
        logger.info("Tearing down ForumTestCase")
        with app.app_context():
            db.session.remove()
            db.drop_all()
            logger.info("Database tables dropped")

    def test_create_forum(self):
        logger.info("Testing forum creation")
        # Test creating a forum
        forum_data = {
            'created_by': self.user1_id,
            'category': 'Test Category',
            'title': 'Test Forum'
        }
        logger.info(f"Sending POST request to /create_forum with data: {forum_data}")
        response = self.app.post('/create_forum', 
                                 data=json.dumps(forum_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertEqual(data['title'], 'Test Forum')
        self.assertEqual(data['category'], 'Test Category')
        
        # Verify the forum was created in the database
        with app.app_context():
            forum = Forum.query.filter_by(title='Test Forum').first()
            self.assertIsNotNone(forum)
            self.assertEqual(forum.category, 'Test Category')
            self.assertEqual(forum.created_by, self.user1_id)
            self.assertEqual(forum.members, 1)  # Creator is automatically a member
            logger.info(f"Forum created with ID: {forum.id}, members: {forum.members}")
            
            # Verify creator is in the membership table
            membership = ForumMembership.query.filter_by(forum_id=forum.id, user_id=self.user1_id).first()
            self.assertIsNotNone(membership)
            logger.info(f"Creator membership verified with ID: {membership.id}")

    def test_join_forum(self):
        logger.info("Testing forum joining")
        # First create a forum
        forum_data = {
            'created_by': self.user1_id,
            'category': 'Join Test',
            'title': 'Forum to Join'
        }
        logger.info(f"Creating test forum with data: {forum_data}")
        create_response = self.app.post('/create_forum', 
                                        data=json.dumps(forum_data),
                                        content_type='application/json')
        forum_id = json.loads(create_response.data)['forum_id']
        logger.info(f"Test forum created with ID: {forum_id}")
        
        # Test joining the forum with another user
        join_data = {
            'forum_id': forum_id,
            'user_id': self.user2_id
        }
        logger.info(f"Sending POST request to /join_forum with data: {join_data}")
        response = self.app.post('/join_forum', 
                                 data=json.dumps(join_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 201)
        
        # Verify the user joined the forum
        with app.app_context():
            forum = Forum.query.get(forum_id)
            self.assertEqual(forum.members, 2)
            logger.info(f"Forum now has {forum.members} members as expected")
            
            membership = ForumMembership.query.filter_by(forum_id=forum_id, user_id=self.user2_id).first()
            self.assertIsNotNone(membership)
            logger.info(f"User2 membership verified with ID: {membership.id}")

    def test_forum_message(self):
        logger.info("Testing forum message posting")
        # First create a forum and join it
        forum_data = {
            'created_by': self.user1_id,
            'category': 'Message Test',
            'title': 'Forum for Messages'
        }
        logger.info(f"Creating test forum with data: {forum_data}")
        
        create_response = self.app.post('/create_forum', 
                                        data=json.dumps(forum_data),
                                        content_type='application/json')
        forum_id = json.loads(create_response.data)['forum_id']
        logger.info(f"Test forum created with ID: {forum_id}")
        
        # Test posting a message to the forum
        message_data = {
            'forum_id': forum_id,
            'user_id': self.user1_id,
            'text': 'This is a test message'
        }
        logger.info(f"Sending POST request to /forum_message with data: {message_data}")
        response = self.app.post('/forum_message', 
                                 data=json.dumps(message_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 201)
        
        # Verify the message was added to the database
        with app.app_context():
            message = ForumMessage.query.filter_by(forum_id=forum_id, user_id=self.user1_id).first()
            self.assertIsNotNone(message)
            self.assertEqual(message.text, 'This is a test message')
            logger.info(f"Forum message created with ID: {message.id}, text: '{message.text}'")

    def test_list_forum_messages(self):
        logger.info("Testing forum message listing")
        # First create a forum and add a message
        forum_data = {
            'created_by': self.user1_id,
            'category': 'List Test',
            'title': 'Forum for Listing'
        }
        logger.info(f"Creating test forum with data: {forum_data}")
        create_response = self.app.post('/create_forum', 
                                        data=json.dumps(forum_data),
                                        content_type='application/json')
        forum_id = json.loads(create_response.data)['forum_id']
        logger.info(f"Test forum created with ID: {forum_id}")
        
        message_data = {
            'forum_id': forum_id,
            'user_id': self.user1_id,
            'text': 'Message for listing test'
        }
        logger.info(f"Creating test message with data: {message_data}")
        self.app.post('/forum_message', 
                      data=json.dumps(message_data),
                      content_type='application/json')
        
        # Test listing messages
        list_data = {'forum_id': forum_id}
        logger.info(f"Sending POST request to /list_forum_messages with data: {list_data}")
        response = self.app.post('/list_forum_messages',
                                 data=json.dumps(list_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        logger.info(f"Retrieved {len(data)} messages")
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['text'], 'Message for listing test')
        logger.info(f"First message text matches expected: {data[0]['text']}")

if __name__ == '__main__':
    unittest.main() 