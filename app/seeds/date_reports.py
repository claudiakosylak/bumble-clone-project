from app.models import db, DateReport, environment, SCHEMA
from sqlalchemy.sql import text

def seed_date_reports():
    date_reports = []
    report1 = DateReport(
        reporting_user_id = 7, reported_user_id = 1, reported_activity= "flake_and_ghost"
    )
    date_reports.append(report1)
    report2 = DateReport(
        reporting_user_id = 123, reported_user_id = 1, reported_activity= "ghost_no_date"
    )
    date_reports.append(report2)
    report3 = DateReport(
        reporting_user_id = 124, reported_user_id = 1, reported_activity= "flake_with_message"
    )
    date_reports.append(report3)
    report4= DateReport(
        reporting_user_id = 125, reported_user_id = 1, reported_activity= "arrived_late"
    )
    date_reports.append(report4)
    report5= DateReport(
        reporting_user_id = 126, reported_user_id = 1, reported_activity= "showed_up"
    )
    date_reports.append(report5)
    report6= DateReport(
        reporting_user_id = 127, reported_user_id = 1, reported_activity= "showed_up"
    )
    date_reports.append(report6)

    for report in date_reports:
        db.session.add(report)
    db.session.commit()

def undo_date_reports():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.date_reports RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM date_reports"))

    db.session.commit()
