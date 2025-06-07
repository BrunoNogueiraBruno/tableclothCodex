from core.user.user import User
from core.user.user_repository import UserRepository

class UserService:
    def __init__(self):
        self.repository = UserRepository()


    def create_user(self, username, first_name, last_name, password, email):
        role = "user"
        user = User(username, first_name, last_name, password, email, role)
        return self.repository.set_user(user)


    def list_users(self):
        return self.repository.list_all_users()
