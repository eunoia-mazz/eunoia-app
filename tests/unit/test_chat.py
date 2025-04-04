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
from unittest.mock import patch, MagicMock

class ChatTestCase(unittest.TestCase):
    def setUp(self):
        logger.info("Setting up ChatTestCase")
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
        logger.info("Tearing down ChatTestCase")
        with app.app_context():
            db.session.remove()
            db.drop_all()
            logger.info("Database tables dropped")

    def test_create_chat(self):
        logger.info("Testing chat creation")
        # Test creating a new chat
        chat_data = {
            'user_id': self.user_id
        }
        logger.info(f"Sending POST request to /create_chat with data: {chat_data}")
        response = self.app.post('/create_chat', 
                                 data=json.dumps(chat_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertIn('chat_id', data)
        
        # Verify the chat was created in the database
        with app.app_context():
            chat = Chat.query.filter_by(user_id=self.user_id).first()
            self.assertIsNotNone(chat)
            self.assertEqual(chat.id, data['chat_id'])
            logger.info(f"Chat created with ID: {chat.id}")

    @patch('app.model.generate_content')
    def test_generate_response(self, mock_generate_content):
        logger.info("Testing chat response generation with mocked AI model")
        # Mock the AI model response
        class MockResponse:
            class MockCandidate:
                class MockContent:
                    class MockPart:
                        def __init__(self, text):
                            self.text = text
                    def __init__(self, text):
                        self.parts = [self.MockPart(text)]
                def __init__(self, text):
                    self.content = self.MockContent(text)
            def __init__(self, text):
                self.candidates = [self.MockCandidate(text)]
                
        mock_generate_content.return_value = MockResponse("This is a test response")
        logger.info("AI model response mocked")
        
        # First create a chat
        chat_data = {'user_id': self.user_id}
        logger.info(f"Creating test chat with data: {chat_data}")
        chat_response = self.app.post('/create_chat', 
                                      data=json.dumps(chat_data),
                                      content_type='application/json')
        chat_id = json.loads(chat_response.data)['chat_id']
        logger.info(f"Test chat created with ID: {chat_id}")
        
        # Test generating a response
        message_data = {
            'user_id': self.user_id,
            'chat_id': chat_id,
            'user_input': 'Hello, this is a test message'
        }
        logger.info(f"Sending POST request to /generate_response with data: {message_data}")
        response = self.app.post('/generate_response', 
                                 data=json.dumps(message_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertEqual(data['response'], "This is a test response")
        
        # Verify messages were saved to the database
        with app.app_context():
            messages = Message.query.filter_by(chat_id=chat_id).all()
            self.assertEqual(len(messages), 2)  # User message and bot response
            self.assertEqual(messages[0].client_msg, 'Hello, this is a test message')
            self.assertEqual(messages[1].bot_msg, 'This is a test response')
            logger.info(f"Found {len(messages)} messages in database")
            logger.info(f"User message: '{messages[0].client_msg}'")
            logger.info(f"Bot response: '{messages[1].bot_msg}'")

    def test_get_chat(self):
        logger.info("Testing chat retrieval")
        # First create a chat and add messages
        chat_data = {'user_id': self.user_id}
        logger.info(f"Creating test chat with data: {chat_data}")
        chat_response = self.app.post('/create_chat', 
                                      data=json.dumps(chat_data),
                                      content_type='application/json')
        chat_id = json.loads(chat_response.data)['chat_id']
        logger.info(f"Test chat created with ID: {chat_id}")
        
        # Add messages directly to the database
        with app.app_context():
            user_message = Message(
                chat_id=chat_id,
                user_id=self.user_id,
                client_msg="Test user message",
                timestamp=datetime.now(timezone.utc)
            )
            bot_message = Message(
                chat_id=chat_id,
                user_id=self.user_id,
                bot_msg="Test bot response",
                timestamp=datetime.now(timezone.utc)
            )
            db.session.add_all([user_message, bot_message])
            
            # Update chat title
            chat = Chat.query.get(chat_id)
            chat.title = "Test Chat"
            db.session.commit()
            logger.info(f"Added test messages to chat and set title to '{chat.title}'")
        
        # Test getting the chat
        get_data = {'user_id': self.user_id, 'chat_id': chat_id}
        logger.info(f"Sending POST request to /get_chat with data: {get_data}")
        response = self.app.post('/get_chat',
                                 data=json.dumps(get_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertEqual(data['title'], "Test Chat")
        self.assertEqual(len(data['messages']), 2)
        self.assertEqual(data['messages'][0]['role'], 'user')
        self.assertEqual(data['messages'][0]['content'], 'Test user message')
        self.assertEqual(data['messages'][1]['role'], 'bot')
        self.assertEqual(data['messages'][1]['content'], 'Test bot response')
        logger.info("Chat data retrieved successfully with correct messages")

    def test_get_all_chats(self):
        logger.info("Testing retrieval of all chats")
        # Create multiple chats
        chat_data = {'user_id': self.user_id}
        logger.info("Creating first test chat")
        self.app.post('/create_chat', data=json.dumps(chat_data), content_type='application/json')
        logger.info("Creating second test chat")
        self.app.post('/create_chat', data=json.dumps(chat_data), content_type='application/json')
        
        # Update chat titles
        with app.app_context():
            chats = Chat.query.filter_by(user_id=self.user_id).all()
            chats[0].title = "First Test Chat"
            chats[1].title = "Second Test Chat"
            db.session.commit()
            logger.info(f"Updated chat titles: '{chats[0].title}', '{chats[1].title}'")
        
        # Test getting all chats
        get_data = {'user_id': self.user_id}
        logger.info(f"Sending POST request to /get_all_chats with data: {get_data}")
        response = self.app.post('/get_all_chats',
                                 data=json.dumps(get_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertEqual(len(data['chats']), 2)
        self.assertEqual(data['chats'][0]['title'], "First Test Chat")
        self.assertEqual(data['chats'][1]['title'], "Second Test Chat")
        logger.info("All chats retrieved successfully with correct titles")

    @patch('app.model.generate_content')
    def test_chat_response(self, mock_generate_content):
        # Mock the AI response
        mock_response = MagicMock()
        mock_response.text = "This is a mock AI response"
        mock_generate_content.return_value = mock_response
        
        # Rest of your test...

if __name__ == '__main__':
    unittest.main() 