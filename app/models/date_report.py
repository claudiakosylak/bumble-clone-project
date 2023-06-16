from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class DateReport(db.Model):
    __tablename__ = "date_reports"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    reporting_user_id = db.Column(db.Integer, nullable=False)
    reported_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    reported_activity = db.Column(db.String(50), nullable=False)

    reported_user = db.relationship("User", back_populates="date_reports")

    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at,
            'reporting_user_id': self.reporting_user_id,
            'reported_user_id': self.reported_user_id,
            'reported_activity': self.reported_activity
        }
