from sqlalchemy import or_
from core.user.user import User

class LoginRepository:
    def search_user(self, identifier):
        return User.query.filter(
            or_(
                User.email == identifier,
                User.username == identifier
            )
        ).first()
