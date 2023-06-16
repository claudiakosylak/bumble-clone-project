from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import UpdateAboutForm, UploadPhotoForm

user_routes = Blueprint('users', __name__)


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

@user_routes.route("/update-photo/<int:num>", methods=["PUT"])
@login_required
def update_photo(num):
    """ Updates one of a user's photos """
    form = UploadPhotoForm()
    user = User.query.get(current_user.id)
    if num == 1:
        user.picture_1 = form.data["picture_url"]
    elif num == 2:
        user.picture_2 = form.data["picture_url"]
    elif num == 3:
        user.picture_3 = form.data["picture_url"]
    elif num == 4:
        user.picture_4 = form.data["picture_url"]
    elif num == 5:
        user.picture_5 = form.data["picture_url"]
    else:
        user.picture_6 = form.data["picture_url"]
    db.session.commit()
    return user.to_dict()


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
