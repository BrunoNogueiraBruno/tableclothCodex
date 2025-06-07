import sqlite3
from core.user.user import User

class UserRepository:
    def __init__(self, db_path="database.db"):
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
        self._gen_table()


    def _gen_table(self):
        query = '''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )
        '''
        self.conn.execute(query)
        self.conn.commit()


    def set_user(self, user: User):
        cursor = self.conn.cursor()
        already_existent = self.search_by_username(user.username)
        
        if already_existent:
            query = '''
            UPDATE users SET username=?, first_name=?, last_name=?, password=?, email=?, role=? WHERE email=?
            '''
            cursor.execute(query, (user.username, user.first_name, user.last_name, user.password, user.email, user.role, user.email))
        
        else:
            query = '''
            INSERT INTO users (username, first_name, last_name, password, email, role) VALUES (?, ?, ?, ?, ?, ?)
            '''
            cursor.execute(query, (user.username, user.first_name, user.last_name, user.password, user.email, user.role))
        
        self.conn.commit()
        return user

    
    def list_all_users(self):
        query = "SELECT * FROM users"
        cursor = self.conn.execute(query)
        return [User(**row) for row in cursor.fetchall()]


    def search_by_username(self, username):
        query = 'SELECT * FROM users WHERE username = ?'
        cursor = self.conn.execute(query, (username,))
        row = cursor.fetchone()
        return User(**row) if row else None

