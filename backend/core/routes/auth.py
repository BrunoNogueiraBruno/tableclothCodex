from flask import Blueprint, request, jsonify, session
from core.decorators import login_required
from core.auth.auth_service import AuthService
from core.user.user_service import UserService
from core.auth.auth import Auth

auth_bp = Blueprint("auth", __name__)
login_service = AuthService()
user_service = UserService()

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'identifier' not in data or 'password' not in data:
        return jsonify({"error": "Missing identifier or password"}), 400
    
    login = Auth(data['identifier'], data['password'])

    try:
        user = login_service.authenticate(login)
        session["user"] = user.id

        return jsonify(user.to_dict()), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 401



@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    session.pop("user", None)
    return "", 204


@auth_bp.route("/info", methods=['GET'])
@login_required
def me():
    if 'user' in session:
        current_user = user_service.list_user_by_id(session['user'])
        return {"authenticated": True, "user": current_user.to_dict()}
    else:
        return {"authenticated": False}, 401