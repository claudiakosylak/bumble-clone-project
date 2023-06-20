from app.models import db, DateRequest, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

day1 = datetime.strptime('2023-07-10 03:30', '%Y-%m-%d %H:%M')

def seed_date_requests():
    date_requests = []
    request1 = DateRequest(
        requesting_user_id = 1,
        match_id = 5,
        suggested_date = day1.date()
    )
    date_requests.append(request1)

    for request in date_requests:
        db.session.add(request)
    db.session.commit()

def undo_date_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.date_requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM date_requests"))

    db.session.commit()
