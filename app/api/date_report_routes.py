from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import DateReport, db, Date
from app.forms import DateReportForm

date_report_routes = Blueprint("date_reports", __name__)

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
