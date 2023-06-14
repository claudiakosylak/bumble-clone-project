from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Match, db, User, RequestedMatch, Message
match_routes = Blueprint("matches", __name__)

@match_routes.route("/<int:id>/messages")
@login_required
def match_messages(id):

    """Returns all the messages for a specific match"""

    messages = Message.query.filter(Message.match_id == id).all()

    message_dict = []

    for message in messages:
        message_dict.append(message.to_dict())

    return message_dict

@match_routes.route("/<int:id1>/<int:id2>", methods=["POST"])
def create_match(id1, id2):
    """
    Creates a new match and deletes the match request. id2 belongs to the second person accepting the match request and id1 belongs to the person who created the match request first.
    """
    match = Match(
        user1_id = id1,
        user2_id = id2
    )
    db.session.add(match)
    db.session.commit()

    match_request = RequestedMatch.query.filter(RequestedMatch.requesting_user_id == id1, RequestedMatch.requested_user_id == id2).first()
    db.session.delete(match_request)
    db.session.commit()
    return match.to_dict()


@match_routes.route("/potential-matches")
def potential_matches():
    """
    Query for all potential matches the user can browse through, excluding people the user has already requested to match with, people whose match request the user has already rejected, and people that the user is already matched with.
    """
    unacceptable_user_ids = []
    user_requested_matches = RequestedMatch.query.filter(RequestedMatch.requesting_user_id == current_user.id).all()
    for match in user_requested_matches:
        unacceptable_user_ids.append(match.requested_user_id)
    all_users = User.query.filter(User.id != current_user.id).all()
    inbound_requests = RequestedMatch.query.filter(RequestedMatch.requested_user_id == current_user.id).all()
    for request in inbound_requests:
        if request.rejected:
            unacceptable_user_ids.append(request.requesting_user_id)
    all_matches1 = Match.query.filter(Match.user1_id == current_user.id).all()
    for match in all_matches1:
        unacceptable_user_ids.append(match.user2_id)
    all_matches2 = Match.query.filter(Match.user2_id == current_user.id).all()
    for match in all_matches2:
        unacceptable_user_ids.append(match.user1_id)


    acceptable_users = [user for user in all_users if user.id not in unacceptable_user_ids]

    potential_match_dict = {}
    for user in acceptable_users:
        potential_match_dict[user.id] = user.to_dict()

    return potential_match_dict

@match_routes.route("/<int:id>", methods=["DELETE"])
def delete_match(id):
    match = Match.query.get(id)
    matchUser = match.user1_id
    if matchUser == current_user.id:
        matchUser = match.user2_id
    db.session.delete(match)
    db.session.commit()
    return {"userId": matchUser}

@match_routes.route("")
def all_user_matches():

    """
    Query for all active matches the current user has.
    """
    all_matches1 = Match.query.filter(Match.user1_id == current_user.id).all()
    all_matches2 = Match.query.filter(Match.user2_id == current_user.id).all()
    all_matches1.extend(all_matches2)

    matched_users = []
    for match in all_matches1:
        if match.user1_id == current_user.id:
            user = User.query.get(match.user2_id)
            user_dict = user.to_dict()
            user_dict["matchId"] = match.id
            matched_users.append(user_dict)
        else:
            user = User.query.get(match.user1_id)
            user_dict = user.to_dict()
            user_dict["matchId"] = match.id
            matched_users.append(user_dict)
    print("😈matched users list: ", matched_users)

    matched_users_dict = {}
    for user in matched_users:
        userId = user["id"]
        matched_users_dict[userId] = user

    return matched_users_dict
