from core.recipe.recipe import Recipe
from core.recipe.recipe_repository import RecipeRepository

class RecipeService:
    def __init__(self):
        self.repository = RecipeRepository()


    def create_recipe(self, title, ingredients, instructions, category,user_id):
        if not title or not ingredients or not instructions or not category or not user_id:
            raise ValueError("All fields are required")

        recipe = Recipe(title.strip(), ingredients.strip(), instructions.strip(), category, user_id)

        return self.repository.set_recipe(recipe)

    
    def list_recipes(self):
        return self.repository.list_all_recipes()
    
    def edit_recipe(self, title, ingredients, instructions, category, user_id):

        if not title or not ingredients or not instructions or not category or not user_id:
            raise ValueError("All fields are required")

        recipe = self.repository.search_recipe_by_id(id)
        recipe.title = title.strip()
        recipe.ingredients = ingredients.strip()
        recipe.instructions = instructions.strip()
        recipe.category = category
        recipe.category = user_id

        if not recipe:
            raise ValueError("Recipe not found")

        return self.repository.set_recipe(recipe)

    
    def delete_recipe(self, id):
        recipe = self.repository.search_recipe_by_id(id)

        if not recipe:
            raise ValueError("Recipe not found")

        return self.repository.delete_recipe(recipe)