import sqlite3
from core.user.user import User

class LoginRepository:
    def __init__(self, db_path="database.db"):
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row

    def search_user(self, identifier):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ? OR username = ?", (identifier, identifier))
        row = cursor.fetchone()

        print(identifier)
        print(row)
        if (row):
            return User(row["username"], row["first_name"], row["last_name"], row["password"], row["email"], row["role"])
        
        return None
