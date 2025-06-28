from core.extensions import db

class Recipe(db.Model):
    __tablename__ = "recipe"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), nullable=False)
    ingredients = db.Column(db.String(400), nullable=False)
    instructions = db.Column(db.String(800), nullable=False)
    category = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)  # A chave estrangeira correta

    # Relacionamento com o modelo User
    user = db.relationship("User", backref="recipes", lazy=True)

    def __init__(self, title, ingredients, instructions, category, user_id):
        self.title = title
        self.ingredients = ingredients
        self.instructions = instructions
        self.category = category
        self.user_id = user_id

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "ingredients": self.ingredients,
            "instructions": self.instructions,
            "category": self.category,
            "user_id": self.user_id,
            "user": self.user.to_dict() if self.user else None  
        }
