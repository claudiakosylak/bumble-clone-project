from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

class UploadPhotoForm(FlaskForm):
    picture_url = FileField('picture_url', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
