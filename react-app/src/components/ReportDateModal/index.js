import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReportDateModal.css";
import { createDateReportThunk, getMadeDateReportsThunk } from "../../store/date_report";
import { getOneMatchThunk } from "../../store/match";

function ReportDateModal({ match, date }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [reportActivity, setReportActivity] = useState("")


    // helper function to create the date report and update the store with user's created reports
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newReport = {
            reported_activity: reportActivity
        }
        await dispatch(createDateReportThunk(match.id, newReport))
        dispatch(getMadeDateReportsThunk())
        await dispatch(getOneMatchThunk(match.matchId))
        closeModal()
    }

    return (
        <div className="report-date-modal-container">
            <h3>Report on your date with {match.first_name}</h3>
            <p>What happened with your date with {match.first_name} on {date.scheduled_date}?</p>
            <div className="date-report-button-container">

                <button onClick={() => setReportActivity("showed_up")} className={`date-report-button ${reportActivity === "showed_up" ? "active-date-report-button" : ""}`}>We had the date!</button>
                <button onClick={() => setReportActivity("arrived_late")} className={`date-report-button ${reportActivity === "arrived_late" ? "active-date-report-button" : ""}`}>My date showed up late.</button>
                <button onClick={() => setReportActivity("flake_with_message")} className={`date-report-button ${reportActivity === "flake_with_message" ? "active-date-report-button" : ""}`}>They flaked, but let me know.</button>
                <button onClick={() => setReportActivity("flake_and_ghost")} className={`date-report-button ${reportActivity === "flake_and_ghost" ? "active-date-report-button" : ""}`}>They completely ghosted on the date.</button>
            </div>
            <form onSubmit={handleSubmit}>
                <select className="hidden-report-form"
                value={reportActivity}
                >
                    <option onChange={(e) => setReportActivity("showed_up")}value="showed_up">Showed Up</option>
                    <option value="arrived_late" onChange={(e) => setReportActivity("arrived_late")}>Arrived Late</option>
                    <option value="flake_with_message" onChange={(e) => setReportActivity("flake_with_message")}>Flaked but messaged</option>
                    <option value="flake_and_ghost" onChange={(e) => setReportActivity("flake_and_ghost")}>Ghost and flake</option>
                </select>
                <button onClick={closeModal}>Cancel</button>
                <button type="submit">Submit Report</button>
            </form>
        </div>
    )
}

export default ReportDateModal;
