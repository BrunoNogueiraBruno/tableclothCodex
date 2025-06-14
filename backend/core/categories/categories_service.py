from core.categories.category import Category
from core.categories.categories_repository import CategoriesRepository

class CategoriesService:
    def __init__(self):
        self.repository = CategoriesRepository()


    def create_category(self, name):
        if not name or name.strip() == "":
            raise ValueError("Category name cannot be empty")
            
        category = Category(name)
        return self.repository.set_category(category)

    
    def list_categories(self):
        return self.repository.list_all_categories()

    
    def edit_category(self, id,name):
        category = self.repository.search_category_by_id(id)

        if not name or name.strip() == "":
            raise ValueError("Category name cannot be empty")

        if name == category.name:
            raise ValueError("New name must be different than the older one")

        category.name = name

        if not category:
            raise ValueError("Category not found")

        return self.repository.set_category(category)

    
    def delete_category(self, id):
        category = self.repository.search_category_by_id(id)

        if not category:
            raise ValueError("Category not found")

        return self.repository.delete_category(category)