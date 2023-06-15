from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class DateRequest(db.Model):
    __tablename__ = "date_requests"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    requesting_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    match_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("matches.id")), nullable=False)
    suggested_date = db.Column(db.DateTime, nullable=False)

    match = db.relationship("Match", back_populates="date_requests")
    requesting_user = db.relationship("User", back_populates="date_requests")

    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at,
            'match_id': self.match_id,
            'requesting_user_id': self.requesting_user_id,
            'suggested_date': self.suggested_date,
            'match': self.match.to_dict(),
            'requesting_user': self.requesting_user.to_dict()
        }
