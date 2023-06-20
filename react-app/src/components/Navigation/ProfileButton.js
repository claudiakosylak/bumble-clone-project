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

  const ulClassName = "profile-dropdown-menu" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

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
            <div id="left-menu-itemss">
              <li className="user-flake-score"><i class="fa-regular fa-snowflake"></i>{user.flake_score}%</li>
              <li className="profile-dropdown-item" onClick={goToSchedule}>Scheduled Dates</li>
              <NavLink className="profile-dropdown-item" to="/app/edit-profile">Edit Profile</NavLink>
              <li>
                <button className="profile-dropdown-item" onClick={handleLogout}>Log Out</button>
              </li>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
