from flask import Blueprint, request, jsonify, g
from core.user.user_service import UserService
from core.auth.auth_service import AuthService
from core.user.user import User
from core.decorators import login_required, admin_required

users_bp = Blueprint("users", __name__)
user_service = UserService()
auth_service = AuthService()

@users_bp.route("", methods=["GET"])
@login_required
def get_users():
    users = user_service.list_users()
    users_dict = [user.to_dict() for user in users]
    return jsonify(users_dict), 200


@users_bp.route('', methods=['DELETE','OPTIONS'])
@login_required
@admin_required
def delete_user():
    user_id = request.args.get('id', type=int)

    try:
        user_service.delete_user(user_id)
        return jsonify({"message": f"User {user_id} deleted."}), 200

    except Exception as e:
        return jsonify({"error": "Unexpected error"}), 500


@users_bp.route('/me', methods=['DELETE','OPTIONS'])
@login_required
def delete_own_user():
    try:
        user_service.delete_user(g.current_user.id)
        auth_service.logout_user()
        return jsonify({"message": "Your account was deleted."}), 200

    except Exception as e:
        return jsonify({"error": "Unexpected error"}), 500


@users_bp.route('', methods=['POST'])
@login_required
@admin_required
def post_user():
    data = request.get_json()

    try:
        user_service.validate_user_data(data)
        user = user_service.create_user(
            data['username'],
            data['first_name'],
            data['last_name'],
            data['password'],
            data['email']
        )

        return jsonify(user.to_dict()), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
        
    except Exception as e:
        return jsonify({'error': 'Unexpected error'}), 500


@users_bp.route('/set-role', methods=['PUT'])
@login_required
@admin_required
def set_role():
    user_id = request.args.get('id', type=int)
    data = request.get_json()

    try:
        if not data or 'role' not in data:
            return jsonify({"error": "Role is required"}), 400

        user = user_service.set_role(user_id, data['role'])
        return jsonify(user.to_dict()), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        return jsonify({"error": "Unexpected error"}), 500
