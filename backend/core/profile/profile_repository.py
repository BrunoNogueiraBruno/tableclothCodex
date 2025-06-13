from core.profile.profile import Profile
from core.extensions import db
from sqlalchemy.exc import IntegrityError
from sqlalchemy import or_

class ProfileRepository:
    def get_profile_by_user_id(self, user_id):
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            profile = Profile(user_id=user_id, contact="[]")
        return profile

    def create_profile_for_user(self, user_id, data):
        contact_data = data.get("contact", [])
        contact_str = contact_data if isinstance(contact_data, str) else json.dumps(contact_data)

        profile = Profile.query.filter_by(user_id=user_id).first()

        if profile:
            profile.contact = contact_str

        else:
            profile = Profile(user_id=user_id, contact=contact_str)
            db.session.add(profile)

        try:
            db.session.commit()
            return profile

        except IntegrityError:
            db.session.rollback()
            raise ValueError("Error saving profile")
