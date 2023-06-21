import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const location = useLocation();

  console.log("LOCATION: ", location)

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

  const goToEditProfile = (e) => {
    e.preventDefault();
    setShowMenu(false)
    history.push("/app/edit-profile")
  }

  const ulClassName = "profile-dropdown-menu" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  let itemAddOn;
  if (location.pathname === "/app/schedule") {
    itemAddOn = "schedule-active"
  } else if (location.pathname === "/app/edit-profile") {
    itemAddOn = "edit-profile-active"
  }

  return (
    <>
      <div className="current-user-image-button" onClick={openMenu}>
        <img src={user.picture_1} className="current-user-image"

          onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }} />
      </div>
      <ul className={ulClassName}>
        {user && (
          <>
            <div className="left-bar-top">
              <i class="fa-solid fa-angle-left" onClick={closeMenu}></i>
              <img className="current-user-image" src={user.picture_1}
                onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }} ></img>
              <div></div>
            </div>
            <div className="left-menu-itemss">
              <li className="user-flake-score"><i class="fa-regular fa-snowflake"></i>{user.flake_score}%</li>
              <li className="profile-dropdown-item" id={location.pathname === "/app/schedule" ? "dropdown-active" : ""} onClick={goToSchedule}>Scheduled Dates</li>
              <li className="profile-dropdown-item" id={location.pathname === "/app/edit-profile" ? "dropdown-active" : ""} onClick={goToEditProfile}>Edit Profile</li>
              <li className="profile-dropdown-item" onClick={handleLogout}>Log Out
              </li>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
