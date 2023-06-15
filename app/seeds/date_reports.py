from app.models import db, DateReport, environment, SCHEMA
from sqlalchemy.sql import text

def seed_date_reports():
    date_reports = []
    report1 = DateReport(
        match_id = 4, date_id = 3, reporting_user_id = 7, reported_user_id = 1, reported_activity= "flake_and_ghost"
    )

    date_reports.append(report1)

    for report in date_reports:
        db.session.add(report)
    db.session.commit()

def undo_date_reports():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.date_reports RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM date_reports"))

    db.session.commit()
