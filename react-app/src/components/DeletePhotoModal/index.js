import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import UploadPhotoModal from "../UploadPhotoModal";

function DeletePhotoModal({photoNumber}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    return (
        <div className="delete-photo-modal-container">
            <h2>Are you sure you want to delete your photo?</h2>
            <OpenModalButton
                buttonText="Upload a new picture"
                modalComponent={<UploadPhotoModal photoNumber={photoNumber} />}
            />
            <p>Delete photo</p>
        </div>
    )
}

export default DeletePhotoModal
