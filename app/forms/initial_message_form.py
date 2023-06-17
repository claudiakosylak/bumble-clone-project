from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class InitialMessageForm(FlaskForm):
    message = StringField('message', validators=[DataRequired()])
