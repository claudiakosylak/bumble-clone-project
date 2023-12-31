from app.models import db, Match, environment, SCHEMA
from sqlalchemy.sql import text

def seed_matches():
    matches = []
    match1 = Match(
        user1_id = 1, user2_id = 2, scheduled_status = True
    )
    matches.append(match1)
    match2 = Match(
        user1_id = 1, user2_id = 7,  scheduled_status = True
    )
    matches.append(match2)
    match3 = Match(
        user1_id = 9, user2_id = 1
    )
    matches.append(match3)
    match4 = Match(
        user1_id = 10, user2_id = 1
    )
    matches.append(match4)
    match5 = Match(
        user1_id = 11, user2_id = 1
    )
    matches.append(match5)

    match6 = Match(
        user1_id = 12, user2_id = 1
    )
    matches.append(match6)

    match7 = Match(
        user1_id = 13, user2_id = 1
    )
    matches.append(match7)

    match8 = Match(
        user1_id = 14, user2_id = 1
    )
    matches.append(match8)

    match9 = Match(
        user1_id = 15, user2_id = 1
    )
    matches.append(match9)

    match10 = Match(
        user1_id = 16, user2_id = 1
    )
    matches.append(match10)

    match11 = Match(
        user1_id = 17, user2_id = 1
    )
    matches.append(match11)

    match12 = Match(
        user1_id = 18, user2_id = 1
    )
    matches.append(match12)

    match13 = Match(
        user1_id = 19, user2_id = 1
    )
    matches.append(match13)

    match14 = Match(
        user1_id = 20, user2_id = 1
    )
    matches.append(match14)

    match15 = Match(
        user1_id = 21, user2_id = 1
    )
    matches.append(match15)

    for match in matches:
        db.session.add(match)
    db.session.commit()


def undo_matches():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.matches RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM matches"))

    db.session.commit()
