import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import "./StaticLeftSettingsBar.css";

function StaticLeftSettingsBar({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const goToSchedule = (e) => {
        history.push("/app/schedule")
      }

      const goToEditProfile = (e) => {
        history.push("/app/edit-profile")
      }

    return (
        <>
            <ul className="static-left-settings-wrapper">
                {user && (
                    <div className="static-left-inside">
                        <div className="static-left-header">
                            <i class="fa-solid fa-angle-left" onClick={() => history.push("/app")}></i>
                            <img src={user.picture_1} className="current-user-image"
                                onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }}></img>
                        </div>
                        <div className="left-menu-itemss">

                            <li className="user-flake-score"><i class="fa-regular fa-snowflake"></i>{user.flake_score}%</li>
                            <li className="profile-dropdown-item" id={location.pathname === "/app/schedule" ? "dropdown-active" : ""} onClick={goToSchedule}>Scheduled Dates</li>
                            <li className="profile-dropdown-item" id={location.pathname === "/app/edit-profile" ? "dropdown-active" : ""} onClick={goToEditProfile}>Edit Profile</li>
                            <li className="profile-dropdown-item" onClick={handleLogout}>Log Out
                            </li>
                        </div>
                    </div>
                )}
            </ul>
        </>
    );
}

export default StaticLeftSettingsBar;
