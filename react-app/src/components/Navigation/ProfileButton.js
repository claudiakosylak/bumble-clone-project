import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const goToSchedule = (e) => {
    e.preventDefault();
    setShowMenu(false)
    history.push("/app/schedule")
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="current-user-image-button" onClick={openMenu}>
        <img src={user.picture_1} className="current-user-image" />
      </div>
      <ul className={ulClassName}>
        {user && (
          <>
            <div className="left-bar-top">
              <i class="fa-solid fa-angle-left" onClick={closeMenu}></i>
              <img className="current-user-image" src={user.picture_1}></img>
              <div></div>
            </div>
            <div classname="left-menu-items">
              <li><i class="fa-regular fa-snowflake"></i>{user.flake_score}%</li>
              <li ><button onClick={goToSchedule}>Scheduled Dates</button></li>
              <li><NavLink to="/app/edit-profile">Edit Profile</NavLink></li>
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
