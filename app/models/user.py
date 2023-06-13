from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    phone = db.Column(db.Integer, nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    date_of_birth = db.Column(db.Date, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    about = db.Column(db.String(1200))
    employment_title = db.Column(db.String(50))
    employment_company = db.Column(db.String(50))
    education_school = db.Column(db.String(50))
    picture_1 = db.Column(db.String(255), nullable=False, default="https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg")
    picture_2 = db.Column(db.String(255))
    picture_3 = db.Column(db.String(255))
    picture_4 = db.Column(db.String(255))
    picture_5 = db.Column(db.String(255))
    picture_6 = db.Column(db.String(255))
    looking_for_gender = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(40), nullable=False)
    city = db.Column(db.String(40), nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    flake_score = db.Column(db.Numeric, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.now())

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
