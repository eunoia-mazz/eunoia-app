# Eunoia: AI-Powered Mental Health Web Application

**Eunoia** is an AI-powered mental health web application that offers personalized emotional support, mental well-being tools, and religious therapy. Designed with inclusivity and accessibility in mind, Eunoia provides users with a holistic mental health journey through advanced AI-driven features, gamification, and scalable spiritual guidance.

## 🌟 Features

### Mental Health and Emotional Well-Being

- **Mental Health Tracking**: Includes daily journaling, AI-driven sentiment analysis, and mood tracking.
- **Personalized Emotional Support**: Tailored recommendations and chatbot interactions powered by advanced sentiment analysis.
- **AI-Powered Chatbot Assistance**: Real-time support to help users manage emotions and stress.

### Religious Therapy

- **Personalized Religious Support**: Quranic ayaat and religious text recommendations based on emotional states.
- **Scalable Spiritual Guidance**: Planned expansion to include spiritual texts like the Bible, Torah, and Gita.

### Community and Crisis Support

- **Community Engagement**: Peer support forums for anonymous sharing and emotional support.
- **Crisis Management**: Emergency contact features, crisis hotline information, and automated alerts.

### Gamification and Habit Building

- **Interactive Tools**: Stress-relief games, habit-building trackers, and progress visualization.
- **Gamified Motivation**: Achieve mental health goals through rewards and milestones.

### Accessibility and Localization

- **Multi-Language Support**: Fully localized for diverse communities.
- **Offline Functionality**: Key features like journaling available offline.

### Therapist Connection

- **Access to Professionals**: Connect with certified therapists for online video sessions.

### Advanced AI Features

- **Advanced Sentiment Analysis**: Utilizing the Gemini API and Hugging Face Transformers for NLP.
- **Self-Assessment Tools**: Insightful self-assessment quizzes (non-diagnostic).

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React.js

### Backend

- **Framework**: Flask

### Database

- **Database Management System**: PostgreSQL

### APIs and Libraries

- **Sentiment Analysis**: Gemini API
- **Natural Language Processing**: Hugging Face Transformers

---

## 📖 Installation

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/eunoia-mazz/eunoia-app.git
cd eunoia-app
```

### 2. Set up the Backend (Flask)

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Start the Flask backend server:

```bash
python app.py
```

### 3. Set up the Frontend (React)

Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm run dev
```

### 5. Run the Application

Once the backend and frontend are set up and running, you can access the app by navigating to `http://localhost:5173` for the frontend and `http://localhost:5000` for the backend.

### 4. Access the Application

Once both servers are running, you can access the application at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 🧪 Testing

### Overview

The Eunoia App includes a comprehensive test suite to ensure the reliability and functionality of the application. The tests cover various components including authentication, chat functionality, activity tracking, spiritual content, and more.

### Test Structure

Tests are organized in the `tests/unit/` directory with each module focusing on a specific area of functionality:

- **test_auth.py**: Tests user authentication (signup, login)
- **test_chat.py**: Tests chat creation and message generation
- **test_activity.py**: Tests activity and subactivity models
- **test_coupon.py**: Tests coupon allocation functionality
- **test_spiritual.py**: Tests spiritual content features
- **test_profile.py**: Tests user profile management
- **test_journal.py**: Tests journal entry functionality
- **test_forum.py**: Tests forum post and comment features
- **test_mood.py**: Tests mood tracking functionality

### Running Tests

To run the entire test suite:

```bash
cd tests
python run_tests.py
```

To run a specific test file:

```bash
cd tests
python -m unittest unit.test_auth
```

### Continuous Integration

Tests are automatically run on GitHub Actions when code is pushed to the main branch or when a pull request is created. The workflow configuration is defined in `.github/workflows/python-tests.yml`.

### Test Coverage

The tests use SQLite in-memory databases to ensure tests are isolated and don't affect production data. Key areas covered include:

1. **Authentication**
   - User registration
   - User login with valid and invalid credentials

2. **Chat Functionality**
   - Creating new chats
   - Generating AI responses (with mocked AI model)
   - Retrieving chat history

3. **Activities**
   - Activity model validation
   - SubActivity model validation
   - Relationship between activities and subactivities

4. **Coupons**
   - Coupon allocation to users
   - Validation of coupon limits

5. **Spiritual Content**
   - Creating spiritual guidance chats
   - Testing chat creation

6. **User Profiles**
   - Profile retrieval through login

### Adding New Tests

When adding new features, corresponding tests should be created following the existing patterns:

1. Create a new test class that inherits from `unittest.TestCase`
2. Implement `setUp` and `tearDown` methods
3. Add test methods that start with `test_`
4. Update `run_tests.py` to include your new test case

### Mocking External Services

For tests that involve external services (like AI models), we use Python's `unittest.mock` to create mock responses:

```python
@patch('app.model.generate_content')
def test_some_ai_feature(self, mock_generate_content):
    # Set up the mock
    mock_response = MagicMock()
    mock_response.text = "This is a mock response"
    mock_generate_content.return_value = mock_response
    
    # Test code that uses the AI model
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Future Plans

- **Religious Texts Expansion**: Include spiritual guidance based on the Bible, Torah, Gita, and other religious texts.
- **Advanced AI Features**: Enhance emotional support with more advanced AI-driven insights.
- **Mobile App**: Launch a native mobile application for both iOS and Android.
- **Global Outreach**: Further language localization and accessibility improvements.

## 🎯 Future Plans

- **Religious Text Expansion**: Incorporate additional spiritual texts, including the Bible, Torah, and Gita.
- **Advanced AI Features**: Develop more sophisticated AI-driven insights for emotional support.
- **Mobile App**: Launch native iOS and Android applications.
- **Global Outreach**: Expand localization to support additional languages and accessibility features.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

For support or inquiries, please email: [team.eunoia.ai@example.com](mailto:team.eunoia.ai@example.com).

---

Elevate your mental health journey with **Eunoia**, where technology, emotional support, and spirituality converge. 💙
