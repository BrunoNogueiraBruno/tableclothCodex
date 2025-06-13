import json
from core.profile.profile_repository import ProfileRepository
from werkzeug.security import generate_password_hash, check_password_hash

class ProfileService:
    def __init__(self):
        self.repository = ProfileRepository()


    def get_profile(self, user_id):
        data = self.repository.get_profile_by_user_id(user_id)
        return data.to_dict()

    
    def set_profile(self, user_id,data):
        return self.repository.create_profile_for_user(user_id,data)


    def is_missing(self, required_fields, data):
        missing = [f for f in required_fields if f not in data]
        return missing
        

    def validate_profile_data(self, data):
        required_fields = ['contact']
        missing = self.is_missing(required_fields,data)

        if missing:
            raise ValueError(f"Missing required fields: {', '.join(missing)}")

        else:
            contact = json.loads(data["contact"])

            for each_contact in contact:
                required_contact_fields = ["platform", "name", "url"]
                contact_missing = self.is_missing(required_contact_fields,each_contact)

                if contact_missing:
                    raise ValueError(f"Missing required fields in contact: {', '.join(contact_missing)}")
