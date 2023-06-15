from flask_wtf import FlaskForm
from wtforms import DateTimeLocalField
from wtforms.validators import DataRequired

class RequestDateForm(FlaskForm):
    suggested_date = DateTimeLocalField('suggested_date', format="%Y-%m-%dT%H:%M", validators=[DataRequired()])
