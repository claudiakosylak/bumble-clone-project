from flask import Blueprint, jsonify, session, request
match_routes = Blueprint("matches", __name__)
from flask_login import current_user

@match_routes.route("")
def all_user_matches():
    pass
