import unittest
import sys
import os

# Add the parent directory to the path so we can import the app
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import test modules
from tests.unit.test_journal import JournalTestCase
from tests.unit.test_forum import ForumTestCase
from tests.unit.test_chat import ChatTestCase
from tests.unit.test_mood import MoodTestCase
# Import modified test modules
from tests.unit.test_auth import AuthTestCase
from tests.unit.test_coupon import CouponTestCase
from tests.unit.test_spiritual import SpiritualContentTestCase
from tests.unit.test_profile import ProfileTestCase
# Import new test module
from tests.unit.test_activity import ActivityTestCase

if __name__ == '__main__':
    # Create a test suite
    test_suite = unittest.TestSuite()
    
    # Add test cases
    test_suite.addTest(unittest.makeSuite(JournalTestCase))
    test_suite.addTest(unittest.makeSuite(ForumTestCase))
    test_suite.addTest(unittest.makeSuite(ChatTestCase))
    test_suite.addTest(unittest.makeSuite(MoodTestCase))
    # Add modified test cases
    test_suite.addTest(unittest.makeSuite(AuthTestCase))
    test_suite.addTest(unittest.makeSuite(CouponTestCase))
    test_suite.addTest(unittest.makeSuite(SpiritualContentTestCase))
    test_suite.addTest(unittest.makeSuite(ProfileTestCase))
    # Add new test case
    test_suite.addTest(unittest.makeSuite(ActivityTestCase))
    
    # Run the tests
    runner = unittest.TextTestRunner(verbosity=2)
    
    runner.run(test_suite) 