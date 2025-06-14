import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from core.extensions import db
from core.routes import register_blueprints

def create_app():
    load_dotenv()

    app = Flask(__name__)
    
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.config['SESSION_COOKIE_DOMAIN'] = os.getenv('SESSION_COOKIE_DOMAIN', None)
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Necessário para cross-origin com credenciais
    app.config['SESSION_COOKIE_SECURE'] = True      # HTTPS obrigatório se usar 'None' no Samesite

    db.init_app(app)

    CORS(app, resources={r"/*": {
        "origins": ["http://localhost:5173"],
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
