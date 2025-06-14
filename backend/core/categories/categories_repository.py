from core.categories.category import Category
from core.extensions import db
from sqlalchemy.exc import IntegrityError
from sqlalchemy import or_

class CategoriesRepository:
    def set_category(self, category: Category):
        db.session.add(category)
        db.session.commit()
        return category


    def list_all_categories(self):
        return Category.query.all()


    def search_category_by_id(self, id):
        return Category.query.filter(Category.id == id).first()


    def delete_category(self, category):
        try:
            db.session.delete(category)
            db.session.commit()

        except SQLAlchemyError as e:
            db.session.rollback()
            raise ValueError("Error deleting category")