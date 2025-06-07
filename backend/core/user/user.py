class User:
    def __init__(self, username, first_name, last_name, password, email, role, id=None):
        self.id = id
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.password = password
        self.email = email
        self.role = role