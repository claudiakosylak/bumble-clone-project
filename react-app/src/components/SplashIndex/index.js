import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SplashIndex.css";
import { NavLink } from "react-router-dom";
import splashPic from "../../images/couple-on-date.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function SplashIndex() {
    const user = useSelector(state => state.session.user)

    if (user) {
        return <Redirect to="/app" />
    }

    return (
        <div className="splash-index-wrapper">
            <div className="splash-header">
                <NavLink className="splash-logo-wrapper" to="/">
                <i class="fa-regular fa-snowflake"></i>
                <h1>noFlake</h1>
                </NavLink>
                <nav className="splash-right-nav">
                    {/* <p>About</p> */}
                </nav>
            </div>
            <div className="splash-main-image">
                <img src={splashPic} className="splash-background-pic"></img>
                <div className="splash-main-textarea">
                    <h2>Stop wasting time with flakes</h2>
                    <p>Start ACTUALLY meeting with new people in your area! If you already have an account, sign up to use NoFlake on the web. </p>
                    <div className="splash-login-buttons">
                        <NavLink to="/signup" className="splash-login-button join-button">Join</NavLink>
                        <NavLink to="/login" className="splash-login-button sign-in-button">Sign In</NavLink>
                    </div>
                </div>
            </div>
            <footer>
                <div className="footer-icons">
                <a href="https://www.linkedin.com/in/claudiakosylak/"><i class="fa-brands fa-linkedin"></i></a>
                <a href="https://github.com/claudiakosylak"><i class="fa-brands fa-github"></i></a>
                </div>
                <p>Developed by Claudia Kosylak</p>
            </footer>
        </div>
    )
}

export default SplashIndex;
