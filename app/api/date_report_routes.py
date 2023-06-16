from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import DateReport, db, Date
from app.forms import DateReportForm

date_report_routes = Blueprint("date_reports", __name__)

@date_report_routes.route("/<int:match_id>/<int:user_id>", methods=["POST"])
@login_required
def create_date_report(match_id, user_id):
    """
    Creates a new date report for a match
    """
    date = Date.query.filter(Date.match_id == match_id).first()
    form = DateReportForm()
    date_report = DateReport(
        match_id = match_id,
        date_id = date.id,
        reporting_user_id = current_user.id,
        reported_user_id = user_id,
        reported_activity = form.data["reported_activity"]
    )
    db.session.add(date_report)
    db.session.commit()
    return date_report.to_dict()

@date_report_routes.route("")
@login_required
def get_all_date_reports():
    """
    Fetch all of a user's date reports
    """
    date_reports = DateReport.query.filter(DateReport.reported_user_id == current_user.id).all()
    date_report_dict = {}
    for report in date_reports:
        date_report_dict[report.id] = report.to_dict()
    return date_report_dict
