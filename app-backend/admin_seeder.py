from app import db, User, app
from flask_bcrypt import Bcrypt
from datetime import datetime, timezone

bcrypt = Bcrypt(app)

def seed_admin():
    with app.app_context():
        admin_email = 'nadeemammar04@gmail.com'
        
        existing_admin = User.query.filter_by(email=admin_email).first()
        if existing_admin:
            print("⚠️ Admin already exists. Deleting old one...")
            db.session.delete(existing_admin)
            db.session.commit()

        admin = User(
            first_name='Admin',
            last_name='User',
            email=admin_email,
            password=bcrypt.generate_password_hash('adminpassword').decode('utf-8'),
            created_at=datetime.now(timezone.utc),
            admin=True,
            treated=True,
            is_active=True,
            phone="1234567890",
            religion="Islam"
        )

        db.session.add(admin)
        db.session.commit()
        print("✅ Admin user replaced successfully!")

if __name__ == '__main__':
    seed_admin()
