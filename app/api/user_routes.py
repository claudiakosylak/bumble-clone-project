from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import UpdateAboutForm, UploadPhotoForm
from app.api.AWS_helpers import (
    upload_file_to_s3, get_unique_filename)

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/about', methods=["PUT"])
@login_required
def update_about():
    """ Updates the current user's about information """
    form = UpdateAboutForm()
    user = User.query.get(current_user.id)
    user.about = form.data["about"]
    db.session.commit()
    return user.to_dict()

@user_routes.route("/filters", methods=["PUT"])
@login_required
def update_filters():
    """ Updates a user's search filter preferences """
    data = request.get_json()
    user = User.query.get(current_user.id)
    user.looking_for_gender = data["gender"]
    user.age_min = data["age_min"]
    user.age_max = data["age_max"]
    db.session.commit()
    return user.to_dict()

@user_routes.route("/update-photo/<int:num>", methods=["PUT"])
@login_required
def update_photo(num):
    """ Updates one of a user's photos """
    form = UploadPhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = form.data["picture_url"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return {"message": "image error"}

        user = User.query.get(current_user.id)
        if num == 1:
            user.picture_1 = upload["url"]
        elif num == 2:
            user.picture_2 = upload["url"]
        elif num == 3:
            user.picture_3 = upload["url"]
        elif num == 4:
            user.picture_4 = upload["url"]
        elif num == 5:
            user.picture_5 = upload["url"]
        else:
            user.picture_6 = upload["url"]
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
