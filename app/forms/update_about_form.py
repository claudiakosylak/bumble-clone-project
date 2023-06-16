from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired


class UpdateAboutForm(FlaskForm):
    about = TextAreaField('about', validators=[DataRequired()])
