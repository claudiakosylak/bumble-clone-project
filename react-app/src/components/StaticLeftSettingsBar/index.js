import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import "./StaticLeftSettingsBar.css";

function StaticLeftSettingsBar({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <>
            <ul className="static-left-settings-wrapper">
                {user && (
                    <div className="static-left-inside">
                        <div>
                            <i class="fa-solid fa-angle-left" onClick={() => history.goBack()}></i>
                        </div>
                        <div>

                            <li>{user.first_name}</li>
                            <li>{user.flake_score}%</li>
                            <li ><NavLink to="/app/schedule">Scheduled Dates</NavLink></li>
                            <li><NavLink to="/app/edit-profile">Edit Profile</NavLink></li>
                            <li>
                                <button onClick={handleLogout}>Log Out</button>
                            </li>
                        </div>
                    </div>
                )}
            </ul>
        </>
    );
}

export default StaticLeftSettingsBar;
