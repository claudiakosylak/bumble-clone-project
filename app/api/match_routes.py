from flask import Blueprint, jsonify, session, request
match_routes = Blueprint("matches", __name__)
from flask_login import current_user
from app.models import Match, db, User

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
    print("🍎 all matched users: ", matched_users_dict)

    return matched_users_dict
