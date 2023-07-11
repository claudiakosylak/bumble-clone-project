import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RequestDateModal.css";
import { createDateRequestThunk, getDateRequestsThunk } from "../../store/date";

function RequestDateModal({ match }) {
    const { closeModal } = useModal();
    const [scheduleDay, setScheduleDay] = useState("")
    const [errors, setErrors] = useState({})
    const errorsArr = Object.values(errors)
    const dispatch = useDispatch();
    const currentDate = new Date();
    const scheduleDate = new Date(scheduleDay);


    useEffect(() => {
        const newErrors = {}
        if (scheduleDate < currentDate) newErrors.past = "Please select a date in the future."
        setErrors(newErrors)
    }, [scheduleDay])

    const handleSubmit = async (e) => {

        e.preventDefault();
        dispatch(createDateRequestThunk(match.matchId, scheduleDay))
        dispatch(getDateRequestsThunk())
        closeModal()
    }

    return (
        <div className="request-date-modal-container">
            <h3>Request a date with {match.first_name}! We'll add it to your calendar once they confirm.</h3>
            <form onSubmit={handleSubmit} className="request-date-form">
                <label>
                    Select a date:
                    <input
                        type="datetime-local"
                        value={scheduleDay}
                        onChange={(e) => setScheduleDay(e.target.value)}
                        required
                    />
                </label>
                {errors.past && (
                    <p className="errors">{errors.past}</p>
                )}
                <div className="request-date-submit-buttons">

                    <p onClick={closeModal} className="date-request-cancel">Cancel</p>
                    <button type="submit" disabled={errorsArr.length > 0} id={errors.past ? "disabled-request-date-button" : ""}>Request Date</button>
                </div>
            </form>
        </div>
    )
}

export default RequestDateModal;
