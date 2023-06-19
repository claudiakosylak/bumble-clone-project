import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RequestDateModal.css";
import { createDateRequestThunk, getDateRequestsThunk } from "../../store/date";

function RequestDateModal({match}) {
    const { closeModal } = useModal();
    const [scheduleDay, setScheduleDay] = useState("")
    const [errors, setErrors] = useState({})
    const errorsArr = Object.values(errors)
    const dispatch = useDispatch();
    const currentDate = new Date();
    const scheduleDate = new Date(scheduleDay);


    useEffect(() => {
        const newErrors = {}
        if (scheduleDate < currentDate) newErrors.past = "Please select a date and time in the future."
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
                {errors.past && (
                    <p>{errors.past}</p>
                )}
                <button type="submit" disabled={errorsArr.length > 0}>Request Date</button>
            </form>
        </div>
    )
}

export default RequestDateModal;
