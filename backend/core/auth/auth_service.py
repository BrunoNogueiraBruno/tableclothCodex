from flask import session
from core.auth.auth import Auth
from core.auth.auth_repository import AuthRepository
from core.user.user_service import UserService
from werkzeug.security import check_password_hash

class AuthService:
    def __init__(self):
        self.repository = AuthRepository()
        self.user_service = UserService()

    def authenticate(self, auth: Auth):
        user = self.repository.search_user(auth.identifier)

        if not user:
            raise ValueError("User not found")
            
        if not check_password_hash(user.password, auth.password):
            raise ValueError("Incorrect password")

        return user

    def login_user(self, user):
        session["user"] = user.id

    def logout_user(self):
        session.pop("user", None)

    def get_authenticated_user(self):
        user_id = session.get("user")
        if not user_id:
            return None
        return self.user_service.list_user_by_id(user_id)

