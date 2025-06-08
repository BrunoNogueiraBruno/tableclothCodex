from flask import Blueprint, request, jsonify
from core.user.user_service import UserService
from core.user.user import User
from core.decorators import login_required, admin_required

users_bp = Blueprint("users", __name__)
user_service = UserService()

@users_bp.route("/", methods=["GET"])
@login_required
def get_users():
    users = user_service.list_users()
    users_dict = [user.to_dict() for user in users]
    return jsonify(users_dict), 200


@users_bp.route('/create', methods=['POST'])
@login_required
@admin_required
def post_user():
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

        return jsonify(user.to_dict()), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@users_bp.route('/set-role', methods=['PUT'])
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
