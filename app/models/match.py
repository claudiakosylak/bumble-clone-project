from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Match(db.Model):
    __tablename__ = "matches"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    scheduled_status = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user_1_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    user_2_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    user1 = db.relationship("User", back_populates="matches")
    user2 = db.relationship("User", back_populates="matches2")

    def to_dict(self):
        return {
            "id": self.id,
            "scheduled_status": self.scheduled_status,
            "created_at": self.created_at,
            "user_1.id": self.user_1_id,
            "user1": self.user1.to_dict(),
            "user2": self.user2.to_dict()
        }
