import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RequestDateModal.css";
import { createDateRequestThunk, getDateRequestsThunk } from "../../store/date";

function RequestDateModal({match}) {
    const { closeModal } = useModal();
    const [scheduleDay, setScheduleDay] = useState("")
    const [scheduleTime, setScheduleTime] = useState("")
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {

        e.preventDefault();
        dispatch(createDateRequestThunk(match.matchId, scheduleDay))
        dispatch(getDateRequestsThunk())
        closeModal()
    }

    return (
        <div className="request-date-modal-container">
            <p onClick={closeModal}>x</p>
            <h3>Request a date with {match.first_name}! We'll add it to your calendar once he confirms.</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Select a date:
                    <input
                        type="datetime-local"
                        value={scheduleDay}
                        onChange={(e) => setScheduleDay(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Request Date</button>
            </form>
        </div>
    )
}

export default RequestDateModal;
