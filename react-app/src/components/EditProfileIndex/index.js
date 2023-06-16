import React from "react";
import "./EditProfileIndex.css";
import StaticLeftSettingsBar from "../StaticLeftSettingsBar";
import { useSelector } from "react-redux";

function EditProfileIndex({isLoaded}) {
    const user = useSelector(state => state.session.user)
    return (
        <div className="edit-profile-index-wrapper">
            <StaticLeftSettingsBar user={user} />
            <h1>Hello from edit profile page</h1>
        </div>
    )
}


export default EditProfileIndex;
