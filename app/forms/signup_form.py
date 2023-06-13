from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def phone_exists(form, field):
    # Checking if username is already in use
    phone = field.data
    user = User.query.filter(User.phone == phone).first()
    if user:
        raise ValidationError('Phone number is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField(
        'first_name', validators=[DataRequired()])
    phone = IntegerField('phone', validators=[DataRequired(), phone_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    date_of_birth = DateField('date_of_birth', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
    looking_for_gender = SelectField('looking_for_gender', default="Looking for:", choices=["Women", "Men", "Both", "Nonbinary", "Open"], validators=[DataRequired()])
    gender = SelectField('gender', default="Gender", choices=["Woman", "Man", "Nonbinary", "Other"], validators=[DataRequired()])
    state = StringField('state', default="State", validators=[DataRequired()])
    city = StringField('city', default="City", validators=[DataRequired()])
