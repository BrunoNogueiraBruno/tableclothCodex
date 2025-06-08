from core.auth.auth import Auth
from core.auth.auth_repository import AuthRepository
from werkzeug.security import check_password_hash

class AuthService:
    def __init__(self):
        self.repository = AuthRepository()

    def authenticate(self, auth: Auth):
        user = self.repository.search_user(auth.identifier)

        if not user:
            raise ValueError("User not found")
            
        if not check_password_hash(user.password, auth.password):
            raise ValueError("Incorrect password")

        return user
