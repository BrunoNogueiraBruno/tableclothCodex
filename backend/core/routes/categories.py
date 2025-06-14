from flask import Blueprint, request, jsonify, g
from core.categories.categories_service import CategoriesService
from core.decorators import login_required, admin_required

categories_bp = Blueprint("categories", __name__)
categories_service = CategoriesService()

@categories_bp.route("", methods=["GET"])
@login_required
def get_categories():
    categories = categories_service.list_categories()
    categories_dict = [category.to_dict() for category in categories]
    return jsonify(categories_dict), 200


@categories_bp.route('', methods=['POST'])
@login_required
def post_category():
    data = request.get_json()

    try:
        category = categories_service.create_category(
            data['name'],
        )

        return jsonify(category.to_dict()), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
        
    except Exception as e:
        print(e)
        return jsonify({'error': 'Unexpected error'}), 500


@categories_bp.route('/<int:id>', methods=['PUT'])
@login_required
def edit_category(id):
    data = request.get_json()

    try:
        if not data or 'name' not in data:
            raise ValueError("Name is a required field")

        category = categories_service.edit_category(id, data['name'])

        return jsonify(category.to_dict()), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': 'Unexpected error'}), 500


@categories_bp.route('/<int:id>', methods=['DELETE','OPTIONS'])
@login_required
def delete_category(id):
    try:
        categories_service.delete_category(id)

        return jsonify({}), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': 'Unexpected error'}), 500