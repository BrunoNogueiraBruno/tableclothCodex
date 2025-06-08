from core.user.user import User
from db import db
from sqlalchemy.exc import IntegrityError
from sqlalchemy import or_

class UserRepository:
    def set_user(self, user: User):
        existing_user = None
        if user.id:
            existing_user = User.query.get(user.id)
        else:
            existing_user = User.query.filter(
                or_(User.username == user.username, User.email == user.email)
            ).first()

        if existing_user:
            existing_user.username = user.username
            existing_user.first_name = user.first_name
            existing_user.last_name = user.last_name
            existing_user.password = user.password
            existing_user.email = user.email
            existing_user.role = user.role
            try:
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                raise ValueError("Username or Email already exists")
            return existing_user
        else:
            try:
                db.session.add(user)
                db.session.commit()
                return user

            except IntegrityError as e:
                db.session.rollback()
                raise ValueError("Error creating user")


    def edit_user(self, user, data):
        if not user:
            raise ValueError("User not found")

        for key, value in data.items():
            if hasattr(user, key):
                setattr(user, key, value)

        try:
            db.session.commit()
        except IntegrityError:

            db.session.rollback()
            raise ValueError("Username or Email already exists")

        return user


    def list_all_users(self):
        return User.query.all()
        

    def search_user_by_id(self, id):
        return User.query.filter(User.id == id).first()
        

    def search_user(self, identifier):
        return User.query.filter(
            or_(User.username == identifier, User.email == identifier)
        ).first()
