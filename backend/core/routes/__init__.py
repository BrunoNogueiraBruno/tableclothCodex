from .users import users_bp
from .auth import auth_bp
from .profile import profile_bp
from .categories import categories_bp
from .recipe import recipe_bp

def register_blueprints(app):
    app.register_blueprint(users_bp, url_prefix="/users")
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(profile_bp, url_prefix="/profile")
    app.register_blueprint(categories_bp, url_prefix="/categories")
    app.register_blueprint(recipe_bp, url_prefix="/recipe")
