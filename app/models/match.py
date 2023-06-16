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

    messages = db.relationship("Message", back_populates="match", cascade="all, delete-orphan")
    dates = db.relationship("Date", back_populates="match", cascade="all, delete-orphan")
    date_requests = db.relationship("DateRequest", back_populates="match", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "scheduled_status": self.scheduled_status,
            "created_at": self.created_at,
            "user1_id": self.user1_id,
            "user2_id": self.user2_id
        }
