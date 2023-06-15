import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory} from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = (e) => {
  //     if (!ulRef.current.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

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
          <div>
          <i class="fa-solid fa-angle-left" onClick={closeMenu}></i>
          </div>
          <div>

            <li>{user.first_name}</li>
            <li ><button onClick={goToSchedule}>Scheduled Dates</button></li>
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
