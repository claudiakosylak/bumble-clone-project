import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RequestDateModal.css";

function RequestDateModal({match}) {
    const { closeModal } = useModal();
    return (
        <div className="request-date-modal-container">
            <p onClick={closeModal}>x</p>
            <h3>Request a date with {match.first_name}! We'll add it to your calendar once he confirms.</h3>
        </div>
    )
}

export default RequestDateModal;
