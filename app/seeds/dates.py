from app.models import db, Date, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_dates():
    dates = []
    date1 = Date(
        match_id = 1, scheduled_date = datetime.now()
    )
    dates.append(date1)
    date2 = Date(
        match_id = 3, scheduled_date = datetime.now()
    )
    dates.append(date1)

    for date in dates:
        db.session.add(date)
    db.session.commit()

def undo_dates():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dates RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dates"))

    db.session.commit()
