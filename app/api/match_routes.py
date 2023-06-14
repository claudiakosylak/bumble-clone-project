from flask import Blueprint, jsonify, session, request
match_routes = Blueprint("matches", __name__)
from flask_login import current_user
from app.models import Match, db, User, RequestedMatch

@match_routes.route("")
def all_user_matches():
    all_matches1 = Match.query.filter(Match.user1_id == current_user.id).all()
    all_matches2 = Match.query.filter(Match.user2_id == current_user.id).all()
    all_matches1.extend(all_matches2)

    matched_users = []
    for match in all_matches1:
        if match.user1_id == current_user.id:
            user = User.query.get(match.user2_id)
            matched_users.append(user)
        else:
            user = User.query.get(match.user1_id)
            matched_users.append(user)

    matched_users_dict = {}
    for user in matched_users:
        matched_users_dict[user.id] = user.to_dict()

    return matched_users_dict

@match_routes.route("/potential-matches")
def potential_matches():
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
