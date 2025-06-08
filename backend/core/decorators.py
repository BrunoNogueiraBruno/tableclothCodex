from functools import wraps
from flask import session, jsonify, g
from core.user.user_service import UserService


def get_current_user():
    user_id = session.get("user")
    if not user_id:
        return None

    user_service = UserService()
    return user_service.list_user_by_id(user_id)


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        user = get_current_user()
        if not user:
            return jsonify({"error": "Authentication required"}), 401
        
        g.current_user = user

        return f(*args, **kwargs)

    return wrapper


def admin_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        user = getattr(g, "current_user", None) or get_current_user()

        if not user or not user.is_admin():
            return jsonify({"error": "Admin access required"}), 403

        return f(*args, **kwargs)

    return wrapper
