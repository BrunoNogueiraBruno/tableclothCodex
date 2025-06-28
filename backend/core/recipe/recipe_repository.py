from core.recipe.recipe import Recipe
from core.extensions import db
from sqlalchemy.exc import IntegrityError
from sqlalchemy import or_

class RecipeRepository:
    def set_recipe(self, recipe: Recipe):
        db.session.add(recipe)
        db.session.commit()
        return recipe


    def list_all_recipes(self):
        return Recipe.query.all()


    def search_recipe_by_id(self, id):
        return Recipe.query.filter(Recipe.id == id).first()


    def delete_recipe(self, recipe):
        try:
            db.session.delete(recipe)
            db.session.commit()

        except SQLAlchemyError as e:
            db.session.rollback()
            raise ValueError("Error deleting recipe")