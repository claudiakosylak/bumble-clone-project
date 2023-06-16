import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./UploadPhotoModal.css";
import { updatePhotoThunk } from "../../store/session";

function UploadPhotoModal({photoNumber}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState("");

    // helper function to handle form submisison
    const handleSubmit = async (e) => {
        e.preventDefault()
        const picture_url = imageUrl;
        await dispatch(updatePhotoThunk(photoNumber, picture_url))
        closeModal()
    }

    return (
        <div className="upload-photo-modal-container">
            <h3>Upload 1 photo</h3>
            <p>Adding photos is a great way to show off more about yourself! Please enter an image url.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}></input>
                <button type="submit">Upload</button>
            </form>
        </div>
    )

}

export default UploadPhotoModal
