import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./UploadPhotoModal.css";
import { updatePhotoThunk } from "../../store/session";

function UploadPhotoModal({ photoNumber }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // helper function to handle form submisison
    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        const errorsArr = Object.values(errors)
        if (errorsArr.length === 0) {
            const formData = new FormData();
            formData.append("picture_url", imageUrl)
            await dispatch(updatePhotoThunk(photoNumber, formData))
            setHasSubmitted(false)
            closeModal()
        }
    }

    return (
        <div className="upload-photo-modal-container">
            <h3>Upload photo</h3>
            <p>Adding photos is a great way to show off more about yourself! Please enter an image url.</p>
            <form onSubmit={handleSubmit}>
                <div id="upload-file-field-wrapper">
                    <input type="file" accept="image/*" onChange={(e) => setImageUrl(e.target.files[0])} required></input>
                </div>
                <button type="submit" >Upload</button>
            </form>
        </div>
    )

}

export default UploadPhotoModal
