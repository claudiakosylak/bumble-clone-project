import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SplashIndex.css";
import { NavLink } from "react-router-dom";

function SplashIndex() {
    const user = useSelector(state => state.session.user)

    if (user) {
        return <Redirect to="/app" />
    }

    return (
        <div className="splash-index-wrapper">
            <div className="splash-main-image">
                <div className="splash-main-textarea">
                    <h2>Stop wasting time with flakes</h2>
                    <p>Start ACTUALLY meeting with new people in your area! If you already have an account, sign up to use NoFlake on the web. </p>
                    <div className="splash-login-buttons">
                        <NavLink to="/signup" className="splash-login-button">Join</NavLink>
                        <NavLink to="/login" className="splash-login-button">Sign In</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplashIndex;
