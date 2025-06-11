from core.profile.profile import Profile
from core.extensions import db
from sqlalchemy.exc import IntegrityError
from sqlalchemy import or_

class ProfileRepository:
    def get_profile_by_user_id(self, user_id):
        print(user_id)
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            profile = Profile(user_id=user_id, contact="[]")
        print(profile)
        return profile


    def create_profile_for_user(self, user_id, data):
        profile = Profile(user_id=user_id, contact=data["contact"] or [])
        db.session.add(profile)
        db.session.commit()
        return profile
