import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function DeletePhotoModal({photoNumber}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    return (
        <div className="delete-photo-modal-container">
            
        </div>
    )
}
