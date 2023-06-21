from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import DateReport, db, Date, User
from app.forms import DateReportForm

date_report_routes = Blueprint("date_reports", __name__)

"""
helper function to calculate a user's new flake score after a new report has been submitted
"""
def flake_score_transformer(flake_score, new_report_activity):
    if new_report_activity == "ghost_no_date":
        flake_score *= 0.9
    elif new_report_activity == "flake_and_ghost":
        flake_score *= 0.7
    elif new_report_activity == "flake_with_message":
        flake_score *= 0.8
    elif new_report_activity == "arrived_late":
        flake_score *= 0.95
    else:
        flake_score *= 1.2
    if flake_score > 100:
        flake_score = 100
    return round(flake_score)


@date_report_routes.route("/made")
@login_required
def get_made_reports():
    """
    Fetch all date reports the current user has made.
    """
    date_reports = DateReport.query.filter(DateReport.reporting_user_id == current_user.id).all()
    date_report_dict = {}
    for report in date_reports:
        date_report_dict[report.id] = report.to_dict()
    return date_report_dict

@date_report_routes.route("/ghosts/<int:id>", methods=["POST"])
@login_required
def create_ghost_report(id):
    """
    Creates a new date report specifically on ghosts with no date scheduled.
    """
    date_report = DateReport(
        reporting_user_id = current_user.id,
        reported_user_id = id,
        reported_activity = "ghost_no_date"
    )
    db.session.add(date_report)
    db.session.commit()

    """
    Updates the receiving user's flake score
    """
    reported_user = User.query.get(id)
    new_score = flake_score_transformer(reported_user.flake_score, "ghost_no_date")
    reported_user.flake_score = new_score
    db.session.commit()
    return date_report.to_dict()

@date_report_routes.route("/<int:reported_user_id>", methods=["POST"])
@login_required
def create_date_report(reported_user_id):
    """
    Creates a new date report
    """
    form = DateReportForm()
    date_report = DateReport(
        reporting_user_id = current_user.id,
        reported_user_id = reported_user_id,
        reported_activity = form.data["reported_activity"]
    )
    db.session.add(date_report)
    db.session.commit()

    """
    Updates the receiving user's flake score
    """
    reported_user = User.query.get(reported_user_id)
    new_score = flake_score_transformer(reported_user.flake_score, date_report.reported_activity)
    reported_user.flake_score = new_score
    db.session.commit()
    return date_report.to_dict()

@date_report_routes.route("")
@login_required
def get_all_date_reports():
    """
    Fetch all date reports made about the current user
    """
    date_reports = DateReport.query.filter(DateReport.reported_user_id == current_user.id).all()
    date_report_dict = {}
    for report in date_reports:
        date_report_dict[report.id] = report.to_dict()
    return date_report_dict
