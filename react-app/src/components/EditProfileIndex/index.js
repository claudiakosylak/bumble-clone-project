import React, { useState } from "react";
import "./EditProfileIndex.css";
import StaticLeftSettingsBar from "../StaticLeftSettingsBar";
import { useSelector } from "react-redux";

function EditProfileIndex({ isLoaded }) {
    const user = useSelector(state => state.session.user)
    const [aboutMe, setAboutMe] = useState(user.about)

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
                            <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)}></textarea>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default EditProfileIndex;
