from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Match(db.Model):
    __tablename__ = "matches"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    scheduled_status = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user1_id = db.Column(db.Integer, nullable=False)
    user2_id = db.Column(db.Integer, nullable=False)

    # user1 = db.relationship("User", back_populates="matches", foreign_keys=[user1_id])
    # user2 = db.relationship("User", back_populates="matches2", foreign_keys=[user2_id])


    def to_dict(self):
        return {
            "id": self.id,
            "scheduled_status": self.scheduled_status,
            "created_at": self.created_at,
            "user1_id": self.user1_id,
            "user2_id": self.user2_id
            # "user1": self.user1.to_dict(),
            # "user2": self.user2.to_dict()
        }
