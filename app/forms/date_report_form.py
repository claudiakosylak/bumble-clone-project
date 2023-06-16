from flask_wtf import FlaskForm
from wtforms import SelectField
from wtforms.validators import DataRequired

class DateReportForm(FlaskForm):
    reported_activity = SelectField('reported_activity', default="What happened?", choices=["flake_and_ghost", "flake_with_message", "arrived_late", "showed_up"], validators=[DataRequired()])
