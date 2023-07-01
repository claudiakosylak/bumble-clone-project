from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, URL
from app.models import User
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

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

states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]


class SignUpForm(FlaskForm):
    first_name = StringField(
        'first_name', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired(), phone_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    date_of_birth = DateField('date_of_birth', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
    looking_for_gender = SelectField('looking_for_gender', default="Looking for:", choices=["Women", "Men", "Both", "Nonbinary", "Open"], validators=[DataRequired()])
    gender = SelectField('gender', default="Gender", choices=["Woman", "Man", "Nonbinary", "Other"], validators=[DataRequired()])
    state = SelectField('state', default="State", choices=states, validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    picture_1 = FileField("picture_1", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # picture_1 = StringField('picture_1', validators=[DataRequired()])
