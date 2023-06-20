from app.models import db, Date, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

day1 = datetime.strptime('2023-06-19 20:00', '%Y-%m-%d %H:%M')
day2 = datetime.strptime('2023-07-01 21:00', '%Y-%m-%d %H:%M')

def seed_dates():
    dates = []
    date1 = Date(
        match_id = 6, scheduled_date = day1.date()
    )
    dates.append(date1)
    date2 = Date(
        match_id = 7, scheduled_date = day2.date()
    )
    dates.append(date2)

    for date in dates:
        db.session.add(date)
    db.session.commit()

def undo_dates():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dates RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dates"))

    db.session.commit()
