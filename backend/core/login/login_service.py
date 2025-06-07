from core.login.login import Login
from core.login.login_repository import LoginRepository

class LoginService:
    def __init__(self):
        self.repository = LoginRepository()

    def authenticate(self, login: Login):
        user = self.repository.search_user(login.identifier)

        if not user:
            raise ValueError("User not found")
        if user.password != login.password:
            raise ValueError("Incorrect password")

        return user
