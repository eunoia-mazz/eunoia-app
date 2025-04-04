import unittest
import json
import sys
import os
import logging
from datetime import datetime, timezone, timedelta
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
# Fix the import path to point to app-backend
app_backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'app-backend'))
sys.path.insert(0, app_backend_path)
# Now import from app.py directly
from app import app, db, User, Coupon, UserCoupon
from flask_bcrypt import Bcrypt

class CouponTestCase(unittest.TestCase):
    def setUp(self):
        logger.info("Setting up CouponTestCase")
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
            
            # Create a test coupon with valid_until date
            valid_until = datetime.now(timezone.utc) + timedelta(days=30)  # Valid for 30 days
            test_coupon = Coupon(
                id=1,
                partner_name="Test Partner",
                total_coupons=5,
                coupons_allotted=0,
                valid_until=valid_until  # Add the required valid_until field
            )
            db.session.add(test_coupon)
            db.session.commit()
            
            self.user_id = test_user.id
            self.coupon_id = test_coupon.id
            logger.info(f"Test user created with ID: {self.user_id}")
            logger.info(f"Test coupon created with ID: {self.coupon_id}")

    def tearDown(self):
        logger.info("Tearing down CouponTestCase")
        with app.app_context():
            db.session.remove()
            db.drop_all()
            logger.info("Database tables dropped")

    def test_alot_coupons(self):
        logger.info("Testing coupon allocation")
        # Test allocating the coupon to a user
        assign_data = {
            'user_id': self.user_id,
            'coupon_id': self.coupon_id
        }
        logger.info(f"Sending POST request to /alot_coupons with data: {assign_data}")
        response = self.app.post('/alot_coupons', 
                                 data=json.dumps(assign_data),
                                 content_type='application/json')
        logger.info(f"Response status code: {response.status_code}")
        self.assertEqual(response.status_code, 201)
        
        # Verify the coupon was assigned to the user
        with app.app_context():
            user_coupon = UserCoupon.query.filter_by(user_id=self.user_id, coupon_id=self.coupon_id).first()
            self.assertIsNotNone(user_coupon)
            
            # Check that coupon counts were updated
            coupon = Coupon.query.get(self.coupon_id)
            self.assertEqual(coupon.coupons_allotted, 1)
            self.assertEqual(coupon.total_coupons, 4)
            
            # Check that user coupon count was updated
            user = User.query.get(self.user_id)
            self.assertEqual(user.coupons, 1)
            
            logger.info(f"Coupon {self.coupon_id} assigned to user {self.user_id}")

if __name__ == '__main__':
    unittest.main() 