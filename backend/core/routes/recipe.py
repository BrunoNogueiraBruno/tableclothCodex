from flask import Blueprint, request, jsonify, g
from core.recipe.recipe_service import RecipeService
from core.decorators import login_required, admin_required

recipe_bp = Blueprint("recipe", __name__)
recipe_service = RecipeService()

@recipe_bp.route("", methods=["GET"])
@login_required
def get_recipes():
    recipes = recipe_service.list_recipes()
    recipes_dict = [recipe.to_dict() for recipe in recipes]
    return jsonify(recipes_dict), 200


@recipe_bp.route('', methods=['POST'])
@login_required
def post_recipe():
    data = request.get_json()

    try:
        recipe = recipe_service.create_recipe(
            data['title'],
            data['ingredients'],
            data['instructions'],
            data['category'],
            data['user_id'],
        )

        return jsonify(recipe.to_dict()), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
        
    except Exception as e:
        print(e)
        return jsonify({'error': 'Unexpected error'}), 500


@recipe_bp.route('/<int:id>', methods=['PUT'])
@login_required
def edit_recipe(id):
    data = request.get_json()

    try:
        recipe = recipe_service.edit_recipe(
            id,
            data['title'],
            data['ingredients'],
            data['instructions'],
            data['category'],
            data['user_id'],
        )

        return jsonify(recipe.to_dict()), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': 'Unexpected error'}), 500


@recipe_bp.route('/<int:id>', methods=['DELETE','OPTIONS'])
@login_required
def delete_recipe(id):
    try:
        recipe_service.delete_recipe(id)

        return jsonify({}), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': 'Unexpected error'}), 500