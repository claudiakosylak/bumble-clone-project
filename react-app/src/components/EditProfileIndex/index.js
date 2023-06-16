import React, { useState } from "react";
import "./EditProfileIndex.css";
import StaticLeftSettingsBar from "../StaticLeftSettingsBar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { updateAboutThunk } from "../../store/session";

function EditProfileIndex({ isLoaded }) {
    const user = useSelector(state => state.session.user)
    const beginningAbout = user.about
    const [aboutMe, setAboutMe] = useState(user.about)
    const dispatch = useDispatch();

    // helper function to handle an edit to the user's about section
    const handleAboutSubmit = async (e) => {
        e.preventDefault()
        const about = {
            about: aboutMe
        }
        await dispatch(updateAboutThunk(about))
    }

    return (
        <div className="edit-profile-index-wrapper">
            <StaticLeftSettingsBar user={user} />
            <div className="schedule-view-right-side">
                <div className="schedule-view-header">
                    <h2>Edit Profile</h2>
                </div>
                <div className="edit-profile-main-content">
                    <div className="left-flake-score-container">
                        <p>Your flake score is {user.flake_score}%</p>
                    </div>
                    <div className="right-edit-profile-container">
                        <div className="edit-profile-images-wrapper">
                            <div className="image-boxes-top">
                                <img src={user.picture_1} className="pic-1"></img>
                                <div className="image-boxes-top-right">
                                    {user.picture_2 ? (
                                        <img src={user.picture_2} className="smaller-image"></img>
                                    ) : (
                                        <div className="smaller-image empty-image"></div>
                                    )}
                                    {user.picture_3 ? (
                                        <img src={user.picture_3} className="smaller-image"></img>
                                    ) : (
                                        <div className="smaller-image empty-image"></div>
                                    )}
                                </div>
                            </div>
                            <div className="image-boxes-bottom">
                                {user.picture_4 ? (
                                    <img src={user.picture_4} className="smaller-image"></img>
                                ) : (
                                    <div className="smaller-image empty-image"></div>
                                )}
                                {user.picture_5 ? (
                                    <img src={user.picture_5} className="smaller-image"></img>
                                ) : (
                                    <div className="smaller-image empty-image"></div>
                                )}
                                {user.picture_6 ? (
                                    <img src={user.picture_6} className="smaller-image"></img>
                                ) : (
                                    <div className="smaller-image empty-image"></div>
                                )}
                            </div>

                        </div>
                        <div className="about-me edit-profile-text-inputs">
                            <h4>About Me</h4>
                            <form onSubmit={handleAboutSubmit}>

                            <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)}></textarea>
                            <button type="submit" disabled={aboutMe === beginningAbout}>Save</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default EditProfileIndex;
