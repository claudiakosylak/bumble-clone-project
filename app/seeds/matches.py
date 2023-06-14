from app.models import db, Match, environment, SCHEMA
from sqlalchemy.sql import text

def seed_matches():
    matches = []
    match1 = Match(
        user1_id = 1, user2_id = 2
    )
    matches.append(match1)
    match2 = Match(
        user1_id = 2, user2_id = 3
    )
    matches.append(match2)
    match3 = Match(
        user1_id = 4, user2_id = 1
    )
    matches.append(match3)

    for match in matches:
        db.session.add(match)
    db.session.commit()


def undo_matches():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.matches RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM matches"))

    db.session.commit()
