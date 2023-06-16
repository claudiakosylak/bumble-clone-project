import React from "react";
import "./ReportGhostModal.css";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getMadeDateReportsThunk, makeGhostReportThunk } from "../../store/date_report";
import { getMatchesThunk, getOneMatchThunk } from "../../store/match";

function ReportGhostModal({match}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    // helper function to create the date report for ghosting and update the store with user's created reports
    const handleSubmit = async (e) => {
        await dispatch(makeGhostReportThunk(match.id))
        await dispatch(getMadeDateReportsThunk())
        // update current match to display new score
        await dispatch(getMatchesThunk())
        await dispatch(getOneMatchThunk(match.matchId))
        // close modal
        closeModal()
    }

    return (
        <div className="report-ghost-modal">
            <h3>Report {match.first_name} as a ghoster</h3>
            <p>Are you sure you'd like to report {match.first_name} as a ghoster? This can't be undone and you will not be able to submit another report about this match if they do come back around. </p>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleSubmit}>Yes, report ghosting - Boo!</button>
        </div>
    )
}

export default ReportGhostModal;
