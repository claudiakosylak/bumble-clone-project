from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Date(db.Model):
    __tablename__ = "dates"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    scheduled_date = db.Column(db.DateTime, nullable=False)
    match_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("matches.id")), nullable=False)

    match = db.relationship("Match", back_populates="dates")

    def to_dict(self):
        return {
            'id': self.id,
            'scheduled_date': self.content,
            'created_at': self.created_at,
            'match_id': self.match_id,
            'match': self.match.to_dict()
        }
