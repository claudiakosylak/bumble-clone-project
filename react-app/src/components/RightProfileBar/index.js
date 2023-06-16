import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RightProfileBar.css";
import { ageChanger } from "../BrowseItem";
import { NavLink, useHistory } from "react-router-dom";

function RightProfileBar() {
    const currentMatch = useSelector(state => state.match.currentMatch)

    return (
        <>
            {currentMatch.id && (
                <div className="right-profile-bar-wrapper">
                    <div className="right-profile-top">
                        <img className="right-first-image" src={currentMatch.picture_1}></img>
                        <p className="right-profile-name">{currentMatch.first_name}, {ageChanger(currentMatch.date_of_birth)}</p>
                        <NavLink to="/app" className="exit-match-x">X</NavLink>

                    </div>
                    <div className="right-profile-about">
                        <p>About {currentMatch.first_name}</p>
                        <p>{currentMatch.about}</p>
                        <p>{currentMatch.flake_score}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default RightProfileBar;
