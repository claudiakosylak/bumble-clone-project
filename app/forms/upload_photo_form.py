from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class UploadPhotoForm(FlaskForm):
    picture_url = StringField('picture_url', validators=[DataRequired()])
