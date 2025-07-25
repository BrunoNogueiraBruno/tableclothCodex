import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from core.extensions import db
from core.routes import register_blueprints
from flask_migrate import Migrate

from werkzeug.security import generate_password_hash, check_password_hash

def create_app():
    load_dotenv()

    app = Flask(__name__)

    migrate = Migrate(app, db)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.config['SESSION_COOKIE_DOMAIN'] = os.getenv('SESSION_COOKIE_DOMAIN', None)
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'
    app.config['SESSION_COOKIE_SECURE'] = True

    db.init_app(app)

    origins_str = os.getenv("REQUESTS_ALLOWED_ORIGIN", "")
    origins = origins_str.split(",") if origins_str else []

    CORS(app, resources={r"/*": {
        "origins": origins,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
    }}, supports_credentials=True)

    register_blueprints(app)

    with app.app_context():
        from core.user.user import User
        db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
