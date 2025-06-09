from core.user.user import User
from core.user.user_repository import UserRepository
from werkzeug.security import generate_password_hash, check_password_hash

class UserService:
    def __init__(self):
        self.repository = UserRepository()


    def create_user(self, username, first_name, last_name, password, email):
        role = "user"
        hashed_password = generate_password_hash(password)
        user = User(username, first_name, last_name, hashed_password, email, role)
        return self.repository.set_user(user)

    
    def set_role(self, user_id, role):
        user = self.list_user_by_id(user_id)
        data = {"role": role}
        return self.repository.edit_user(user,data)


    def delete_user(self, user_id):
        user = self.list_user_by_id(user_id)
        return self.repository.delete_user(user)


    def list_users(self):
        return self.repository.list_all_users()


    def list_user_by_id(self, id):
        return self.repository.search_user_by_id(id)


    def validate_user_data(self, data):
        required_fields = ['username', 'first_name', 'last_name', 'password', 'email']
        missing = [f for f in required_fields if f not in data]
        if missing:
            raise ValueError(f"Missing required fields: {', '.join(missing)}")
