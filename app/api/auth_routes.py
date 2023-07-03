from flask import Blueprint, jsonify, session, request
from app.models import User, db, Match, Message
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.AWS_helpers import (
    upload_file_to_s3, get_unique_filename)

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': form.errors}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        image = form.data["picture_1"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return {"message": "image error"}

        user = User(
            first_name=form.data['first_name'],
            email=form.data['email'],
            password=form.data['password'],
            phone = form.data['phone'],
            date_of_birth = form.data['date_of_birth'],
            looking_for_gender = form.data['looking_for_gender'],
            gender = form.data['gender'],
            state = form.data['state'],
            city = form.data['city'],
            picture_1 = upload["url"]
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)


        """
        Creates a match and first message with Demo
        """
        match = Match(
            user1_id = 1,
            user2_id = user.id
        )
        db.session.add(match)
        db.session.commit()

        message = Message(
            match_id = match.id,
            user_id = 1,
            content = "Hi, welcome to noFlake!! This is where you can message your matches once you mutually connect. Get swiping to match with users! "
        )

        db.session.add(message)
        db.session.commit()

        """
        Creates an unmessaged match with Demo-nia
        """
        match2 = Match(
            user1_id = 153, user2_id = user.id
        )
        db.session.add(match2)
        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
