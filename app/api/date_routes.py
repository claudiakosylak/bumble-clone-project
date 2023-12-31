from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Date, db, Match, User, DateRequest
from sqlalchemy import or_

date_routes = Blueprint("dates", __name__)

@date_routes.route("/date-requests")
@login_required
def get_all_date_requests():
    """
    Retrieves all dates that have been requested of the current user or requested by the current user;
    """
    matches = Match.query.filter(or_(Match.user1_id == current_user.id, Match.user2_id == current_user.id))
    match_ids = [match.id for match in matches]
    requests = DateRequest.query.all()

    requests_dict = {}
    for request in requests:
        if request.match_id in match_ids:
            request_dict = request.to_dict()
            match = Match.query.get(request.match_id)
            if match.user1_id == current_user.id:
                other_user_id = match.user2_id
            else:
                other_user_id = match.user1_id
            other_user = User.query.get(other_user_id)
            request_dict["other_user"] = other_user.to_dict()
            requests_dict[request.id] = request_dict
    return requests_dict

@date_routes.route("/date-requests/<int:id>", methods=["DELETE"])
@login_required
def delete_date_request(id):
    """
    Deletes a date request based off date request id.
    """
    date_request = DateRequest.query.get(id)
    db.session.delete(date_request)
    db.session.commit()
    return {"message" : "Success! Date request has been deleted."}


@date_routes.route("/<int:id>")
@login_required
def get_date(id):
    """
    Gets details of a single date by date id .
    """
    date = Date.query.filter(Date.match_id == id).first()
    return date.to_dict()

@date_routes.route("/<int:id>", methods=["POST"])
@login_required
def create_date(id):
    """
    Creates a date based off of a date request id and deletes the date request.
    """
    date_request = DateRequest.query.get(id)
    date = Date(
        scheduled_date = date_request.suggested_date,
        match_id = date_request.match_id
    )
    db.session.add(date)
    db.session.commit()
    db.session.delete(date_request)
    db.session.commit()
    return date.to_dict()

@date_routes.route("")
@login_required
def get_dates():
    """
    Gets all of a user's dates
    """

    matches = Match.query.filter(or_(Match.user1_id == current_user.id, Match.user2_id == current_user.id)).all()
    match_ids = [match.id for match in matches]
    dates = []
    for match in matches:
        date = Date.query.filter(Date.match_id == match.id).first()
        if date:
            date_dict = date.to_dict()
            if match.user1_id == current_user.id:
                other_user = match.user2_id
            else:
                other_user = match.user1_id
            other = User.query.get(other_user)
            date_dict["other_user"] = other.to_dict()
            dates.append(date_dict)

    dates_dict = {}
    for date in dates:
        dates_dict[date["id"]] = date

    return dates_dict
