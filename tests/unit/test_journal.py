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
from app import app, db, Journal, User
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt

class JournalTestCase(unittest.TestCase):
    def setUp(self):
        logger.info("Setting up JournalTestCase")
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
        logger.info("Tearing down JournalTestCase")
        with app.app_context():
            db.session.remove()
            db.drop_all()
            logger.info("Database tables dropped")

    def test_add_journal(self):
        logger.info("Testing journal creation")
        # Test adding a journal entry
        journal_data = {
            'user_id': self.user_id,
            'text': 'This is a test journal entry',
            'journal': True
        }
        logger.info(f"Sending POST request to /add_journal with data: {journal_data}")
        response = self.app.post('/add_journal', 
                                 data=json.dumps(journal_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertEqual(data['text'], 'This is a test journal entry')
        
        # Verify the journal was added to the database
        with app.app_context():
            journal = Journal.query.filter_by(user_id=self.user_id).first()
            self.assertIsNotNone(journal)
            self.assertEqual(journal.text, 'This is a test journal entry')
            self.assertTrue(journal.journal)
            logger.info(f"Journal created with ID: {journal.id}")

    def test_add_questionnaire(self):
        logger.info("Testing questionnaire creation with mood")
        # Test adding a questionnaire entry with mood
        questionnaire_data = {
            'user_id': self.user_id,
            'text': 'Questionnaire response',
            'questionaire': True,
            'mood': 'happy'
        }
        logger.info(f"Sending POST request to /add_journal with data: {questionnaire_data}")
        response = self.app.post('/add_journal', 
                                 data=json.dumps(questionnaire_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertEqual(data['mood'], 'happy')
        
        # Verify the questionnaire and mood were added to the database
        with app.app_context():
            journal = Journal.query.filter_by(user_id=self.user_id, questionaire=True).first()
            self.assertIsNotNone(journal)
            self.assertEqual(journal.text, 'Questionnaire response')
            self.assertTrue(journal.questionaire)
            logger.info(f"Questionnaire created with ID: {journal.id}")

    def test_list_journals(self):
        logger.info("Testing journal listing")
        # First add a journal entry
        journal_data = {
            'user_id': self.user_id,
            'text': 'Journal for listing test',
            'journal': True
        }
        logger.info(f"Creating test journal with data: {journal_data}")
        self.app.post('/add_journal', 
                      data=json.dumps(journal_data),
                      content_type='application/json')
        
        # Test listing journals
        list_data = {'user_id': self.user_id}
        logger.info(f"Sending POST request to /list_journals with data: {list_data}")
        response = self.app.post('/list_journals',
                                 data=json.dumps(list_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        logger.info(f"Retrieved {len(data)} journals")
        self.assertIsInstance(data, list)
        self.assertGreaterEqual(len(data), 1)
        self.assertEqual(data[0]['text'], 'Journal for listing test')
        logger.info(f"First journal text matches expected: {data[0]['text']}")

    def test_missing_user_id(self):
        logger.info("Testing error handling for missing user_id")
        # Test error handling when user_id is missing
        journal_data = {
            'text': 'This should fail',
            'journal': True
        }
        logger.info(f"Sending POST request to /add_journal with incomplete data: {journal_data}")
        response = self.app.post('/add_journal', 
                                 data=json.dumps(journal_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        logger.info(f"Response data: {data}")
        self.assertIn('error', data)
        logger.info("Error message present in response as expected")

if __name__ == '__main__':
    unittest.main() 