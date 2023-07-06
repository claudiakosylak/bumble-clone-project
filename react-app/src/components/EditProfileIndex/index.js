import React, { useState, useEffect } from "react";
import "./EditProfileIndex.css";
import StaticLeftSettingsBar from "../StaticLeftSettingsBar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { updateAboutThunk } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import UploadPhotoModal from "../UploadPhotoModal";
import DeletePhotoModal from "../DeletePhotoModal";

function EditProfileIndex({ isLoaded }) {
    const user = useSelector(state => state.session.user)
    const [aboutMe, setAboutMe] = useState(user ? user.about : "")
    const [activeEdit, setActiveEdit] = useState(false)
    // const [aboutChars, setAboutChars] = useState(user ? (300 - user.about.length) : "")
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();

    useEffect(() => {
        const newErrors = {}
        if (aboutMe && aboutMe.length > 300) newErrors.about = "About me can be 300 characters long maximum. "
        setErrors(newErrors)
    }, [aboutMe])

    // helper function to handle an edit to the user's about section
    const handleAboutSubmit = async (e) => {
        e.preventDefault()
        const about = {
            about: aboutMe
        }
        await dispatch(updateAboutThunk(about))
        setActiveEdit(false)
    }
    if (!user) return <Redirect to="/" />
    const beginningAbout = user.about
    return (
        <div className="edit-profile-index-wrapper">
            <StaticLeftSettingsBar user={user} />
            <div className="schedule-view-right-side">
                <div className="schedule-view-header">
                    <h2>Edit Profile</h2>
                </div>
                <div className="edit-profile-main-content">

                    <div className="right-edit-profile-container">
                        <div className="edit-profile-images-wrapper">
                            <div className="image-boxes-top">
                                <div className="image-mini-wrapper">
                                    <img src={user.picture_1} className="pic-1"

                                        onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }} ></img>
                                </div>
                                <div className="image-boxes-top-right">
                                    <div>

                                        {user.picture_2 ? (
                                            <img src={user.picture_2} className="smaller-image"
                                                onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }} ></img>

                                        ) : (
                                            <div className="smaller-image empty-image"><OpenModalButton buttonText="+" modalComponent={<UploadPhotoModal photoNumber={2} />} /></div>
                                        )}
                                    </div>
                                    <div>

                                        {user.picture_3 ? (
                                            <img src={user.picture_3} className="smaller-image"
                                                onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }} ></img>
                                        ) : (
                                            <div className="smaller-image empty-image"><OpenModalButton buttonText="+" modalComponent={<UploadPhotoModal photoNumber={3} />} /></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="image-boxes-bottom">
                                <div>

                                    {user.picture_4 ? (
                                        <img src={user.picture_4} className="smaller-image"
                                            onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }} ></img>
                                    ) : (
                                        <div className="smaller-image empty-image"><OpenModalButton buttonText="+" modalComponent={<UploadPhotoModal photoNumber={4} />} /></div>
                                    )}
                                </div>
                                <div>

                                    {user.picture_5 ? (
                                        <img src={user.picture_5} className="smaller-image"
                                            onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }} ></img>
                                    ) : (
                                        <div className="smaller-image empty-image"><OpenModalButton buttonText="+" modalComponent={<UploadPhotoModal photoNumber={5} />} /></div>
                                    )}
                                </div>
                                <div>

                                    {user.picture_6 ? (
                                        <img src={user.picture_6} className="smaller-image"
                                            onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }} ></img>
                                    ) : (
                                        <div className="smaller-image empty-image"><OpenModalButton buttonText="+" modalComponent={<UploadPhotoModal photoNumber={6} />} /></div>
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className={`about-me edit-profile-text-inputs ${activeEdit && "actively-editing-about"}`}>
                            <div className="about-header" onClick={() => setActiveEdit(!activeEdit)}>

                                <h4>About Me </h4><i className={`fa-solid fa-angle-down ${activeEdit && "hidden"}`} ></i><i class={`fa-solid fa-angle-up ${!activeEdit && "hidden"}`}></i>
                            </div>
                            <form onSubmit={handleAboutSubmit} className={`about-me-edit-form ${!activeEdit && "non-active-about"}`}>

                                <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)}></textarea>
                                {errors.about && (
                                    <p className="about-error">{errors.about}</p>
                                )}
                                <div className="about-edit-bottom">
                                    <p className="about-edit-cancel" onClick={() => setActiveEdit(false)}>Cancel</p>
                                    {aboutMe && aboutMe.length > 0 && (
                                        <p>{300 - aboutMe.length} characters left</p>
                                    )}
                                    <button type="submit" disabled={(aboutMe === beginningAbout || errors.about)} id={(aboutMe === beginningAbout || errors.about) && "disabled-about-save"}>Save</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default EditProfileIndex;
