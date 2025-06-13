from flask import Blueprint, request, jsonify, g
from core.profile.profile_service import ProfileService
from core.decorators import login_required, get_current_user

profile_service = ProfileService()

profile_bp = Blueprint("profile", __name__)

@profile_bp.route('', methods=['GET'])
@login_required
def get_profile():
    try:
        curr_user = get_current_user()
        user_id = curr_user.id

        data = profile_service.get_profile(user_id)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"error": "Unexpected error"}), 500


@profile_bp.route('', methods=['POST'])
@login_required
def set_profile():
    try:
        curr_user = get_current_user()
        user_id = curr_user.id

        data = request.get_json()

        profile_service.validate_profile_data(data)
        profile = profile_service.set_profile(user_id,data)

        return jsonify(profile.to_dict()), 200

    except Exception as e:
        return jsonify({"error": "Unexpected error"}), 500
