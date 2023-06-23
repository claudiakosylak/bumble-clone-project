from app.models import db, RequestedMatch, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_requested_matches():
    requested_matches = []
    for x in range(22, 152, 3):
        request = RequestedMatch(
            requesting_user_id = x, requested_user_id = 1
        )
        db.session.add(request)
    db.session.commit()

    for request in requested_matches:
        db.session.add(request)
    db.session.commit()

def undo_requested_matches():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.requested_matches RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM requested_matches"))

    db.session.commit()
