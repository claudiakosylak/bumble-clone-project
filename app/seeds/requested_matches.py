from app.models import db, RequestedMatch, environment, SCHEMA
from sqlalchemy.sql import text

def seed_requested_matches():
    requested_matches = []
    request1 = RequestedMatch(
        requesting_user_id = 3, requested_user_id = 1
    )
    requested_matches.append(request1)
    request2 = RequestedMatch(
        requesting_user_id = 5, requested_user_id = 1
    )
    requested_matches.append(request2)

    for request in requested_matches:
        db.session.add(request)
    db.session.commit()

def undo_requested_matches():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.requested_matches RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM requested_matches"))

    db.session.commit()
