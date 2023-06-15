from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Date, db, Match
from sqlalchemy import or_

date_routes = Blueprint("dates", __name__)

@date_routes.route("/<int:id>")
@login_required
def get_date(id):
    date = Date.query.filter(Date.match_id == id).first()
    return date.to_dict()

@date_routes.route("")
@login_required
def get_dates():
    """
    Gets all of a user's dates
    """

    matches = Match.query.filter(or_(Match.user1_id == current_user.id, Match.user2_id == current_user.id)).all()
    match_ids = [match.id for match in matches]
    print("🍎match IDs: ", match_ids)
    dates = Date.query.filter(Date.match_id in match_ids).all()

    dates_dict = {}
    for date in dates:
        dates_dict.append(date.to_dict())

    return dates_dict
