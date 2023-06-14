from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import Match, db, User, RequestedMatch
from sqlalchemy import or_

request_match_routes = Blueprint("requested_matches", __name__)




@request_match_routes.route("/<int:id1>/<int:id2>", methods=["POST"])
def create_match_request(id1, id2):
    """
    Creates a new match request if one does not already exist.
    """
    request1 = RequestedMatch.query.filter(RequestedMatch.requesting_user_id == id1, RequestedMatch.requested_user_id == id2).first()
    request2 = RequestedMatch.query.filter(RequestedMatch.requesting_user_id == id2, RequestedMatch.requested_user_id == id1).first()

    if request1 or request2:
        return {"error": "match request already exists"}
    new_request = RequestedMatch(
        requesting_user_id = id1,
        requested_user_id = 2
    )
    db.session.add(new_request)
    db.session.commit()
    return new_request.to_dict()

@request_match_routes.route("/<int:id1>/<int:id2>", methods=["PUT"])
def reject_match_request(id1, id2):
    request = RequestedMatch.query.filter(RequestedMatch.requesting_user_id == id1, RequestedMatch.requested_user_id == id2).first()
    if request:
        request.rejected = True
        db.session.commit()
        return request.to_dict()
    else:
        new_request = RequestedMatch(
            requesting_user_id = id1,
            requested_user_id = id2,
            rejected = True
        )
        db.session.add(new_request)
        db.session.commit()
        return new_request.to_dict()

@request_match_routes.route("/<int:id>")
def get_unrejected_requests(id):
    requests = RequestedMatch.query.filter(RequestedMatch.requested_user_id == id, RequestedMatch.rejected == False).all()
    print("🍎REQUESTS IN BACKEND: ", requests)

    requests_dict = {}
    for request in requests:
        requests_dict[request.id] = request.to_dict()
    return requests_dict
