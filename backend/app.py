import uuid
from flask import Flask, jsonify, request, session
from flask_cors import CORS

from core.user.user_service import UserService
from core.login.login import Login
from core.login.login_service import LoginService

app = Flask(__name__)
app.secret_key = "123456"
CORS(app, supports_credentials=True)

user_service = UserService()
login_service = LoginService()

@app.route('/list-users', methods=['GET'])
def list_users():
    users = user_service.list_users()
    return jsonify([user.__dict__ for user in users]), 200


@app.route('/create-user', methods=['POST'])
def create_user():
    data = request.get_json()

    required_fields = ['username', 'first_name', 'last_name', 'password', 'email']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

    try:
        user = user_service.create_user(
            data['username'],
            data['first_name'],
            data['last_name'],
            data['password'],
            data['email']
        )

        user_data = user.__dict__.copy()
        user_data.pop('password', None)

        return jsonify(user_data), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'identifier' not in data or 'password' not in data:
        return jsonify({"error": "Missing identifier or password"}), 400
    
    login = Login(data['identifier'], data['password'])

    try:
        session["user"] = data["identifier"]
        user = login_service.authenticate(login)
        user_data = user.__dict__.copy()
        user_data.pop("password", None)
        return jsonify(user_data), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 401


@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return "", 204


@app.route("/info", methods=['GET'])
def me():
    if 'user' in session:
        return {"authenticated": True, "user": session['user']}
    else:
        return {"authenticated": False}, 401


if __name__ == '__main__':
    app.run(debug=True)
