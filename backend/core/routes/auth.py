from flask import Blueprint, request, jsonify, session
from core.decorators import login_required
from core.auth.auth_service import AuthService
from core.user.user_service import UserService
from core.auth.auth import Auth

auth_bp = Blueprint("auth", __name__)
auth_service = AuthService()
user_service = UserService()

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'identifier' not in data or 'password' not in data:
        return jsonify({"error": "Missing identifier or password"}), 400

    try:
        auth_data = Auth(data['identifier'], data['password'])
        user = auth_service.authenticate(auth_data)

        print(user)

        auth_service.login_user(user)

        return jsonify(user.to_dict()), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 401



@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    auth_service.logout_user()
    return "", 204


@auth_bp.route("/info", methods=['GET'])
@login_required
def me():
    user = auth_service.get_authenticated_user()
    if not user:
        return jsonify({"authenticated": False}), 401

    return jsonify({"authenticated": True, "user": user.to_dict()})