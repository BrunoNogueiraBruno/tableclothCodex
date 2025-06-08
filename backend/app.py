import uuid
import os

from flask import Flask, jsonify, request, session
from dotenv import load_dotenv
from flask_cors import CORS
from functools import wraps

from core.user.user_service import UserService
from core.login.login import Login
from core.login.login_service import LoginService
from db import db

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

db.init_app(app)

with app.app_context():
    from core.user.user import User
    db.create_all()

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

user_service = UserService()
login_service = LoginService()


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user" not in session:
            return jsonify({"error": "Authentication required"}), 401
        return f(*args, **kwargs)
    return decorated_function


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get("user")
        user = user_service.list_user_by_id(user_id)
        print(user)

        if not user or not user.is_admin():
            return jsonify({"error": "Forbidden"}), 403
        return f(*args, **kwargs)
    return decorated_function


@app.route('/users', methods=['GET'])
@login_required
@admin_required
def list_users():
    users = user_service.list_users()
    users_dict = [user.to_dict() for user in users]
    return jsonify(users_dict), 200


@app.route('/set-role', methods=['PUT'])
@login_required
@admin_required
def set_role():
    id = request.args.get('id', type=int)
    user = User.query.get(id)

    if not user:
        return jsonify({"error": "User not found"}), 404
        
    data = request.get_json()
    role = data['role']

    if not role:
        return jsonify({"error": "Role is required"}), 403

    try:
        user = user_service.set_role(user, role)

        return jsonify(user.to_dict()), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/user', methods=['POST'])
@login_required
def create_user():
    data = request.get_json()

    required_fields = ['username', 'first_name', 'last_name', 'password', 'email']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

    try:
        role = data.get('role')

        user = user_service.create_user(
            data['username'],
            data['first_name'],
            data['last_name'],
            data['password'],
            data['email'],
            role
        )

        return jsonify(user.to_dict()), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'identifier' not in data or 'password' not in data:
        return jsonify({"error": "Missing identifier or password"}), 400
    
    login = Login(data['identifier'], data['password'])

    try:
        user = login_service.authenticate(login)
        session["user"] = user.id

        return jsonify(user.to_dict()), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 401



@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return "", 204


@app.route("/info", methods=['GET'])
def me():
    if 'user' in session:
        current_user = user_service.list_user_by_id(session['user'])
        return {"authenticated": True, "user": current_user.to_dict()}
    else:
        return {"authenticated": False}, 401


if __name__ == '__main__':
    app.run(debug=True)
