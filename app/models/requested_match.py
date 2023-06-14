from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class RequestedMatch(db.Model):
    __tablename__ = "requested_matches"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rejected = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    requesting_user_id = db.Column(db.Integer, nullable=False)
    requested_user_id = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "rejected": self.rejected,
            "created_at": self.created_at,
            "requesting_user_id": self.requesting_user_id,
            "requested_user_id": self.requested_user_id
        }
