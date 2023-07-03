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


    // useEffect(() => {
    //     const newErrors = {}
    //     if (imageUrl.length > 255) newErrors.imageLength = "Please enter an image url under 255 characters."
    //     if ((imageUrl.slice(imageUrl.length - 4) !== ".jpg" && imageUrl.slice(imageUrl.length - 4) !== ".png" && imageUrl.slice(imageUrl.length - 5) !== ".jpeg")) newErrors.imageEnding = "Please enter an image url ending in .jpg, .png or .jpeg"
    //     if ((imageUrl.slice(0, 7) !== "http://" && imageUrl.slice(0, 8) !== "https://")) newErrors.imageBeginning = "Please enter an image url beginning with 'http://' or 'https://' "
    //     setErrors(newErrors)
    // }, [imageUrl])

    // helper function to handle form submisison
    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        const errorsArr = Object.values(errors)
        if (errorsArr.length === 0) {
            const formData = new FormData();
            formData.append("picture_url", imageUrl)
            // const picture_url = imageUrl;
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
                {/* {(hasSubmitted && errors.imageLength) && (
                    <p>{errors.imageLength}</p>
                )}
                {(hasSubmitted && errors.imageEnding) && (
                    <p>{errors.imageEnding}</p>
                )}
                {(hasSubmitted && errors.imageBeginning) && (
                    <p>{errors.imageBeginning}</p>
                )} */}
                <button type="submit" disabled={imageUrl.length === 0} id={(imageUrl.length === 0) ? "disabled-upload-photo-submit" : ""}>Upload</button>
            </form>
        </div>
    )

}

export default UploadPhotoModal
