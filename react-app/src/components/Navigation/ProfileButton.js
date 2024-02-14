import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./Navigation.module.sass";

function ProfileButton({ user, isHovered }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const location = useLocation();

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
    setShowMenu(false);
    history.push("/app/schedule");
  };

  const goToEditProfile = (e) => {
    e.preventDefault();
    setShowMenu(false);
    history.push("/app/edit-profile");
  };

  const ulClassName = styles.dropdown + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className={styles.open_menu} onClick={openMenu} style={isHovered ? {flexDirection: "row", marginRight: "20px"} : {}}>
        <img
          src={user.picture_1}
          className={styles.image}
          onError={(e) => {
            e.currentTarget.src =
              "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";
          }}
        />
        <i className="fa-solid fa-bars"></i>
      </div>
      <ul className={ulClassName}>
        <i className="fa-solid fa-angle-left" onClick={closeMenu}></i>
        {user && (
          <>
            <div className={styles.top}>
              <img
                className={styles.image}
                src={user.picture_1}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";
                }}
              ></img>
              <div></div>
            </div>
            <div className={styles.bottom}>
              <li className={styles.flake_score}>
                <i className="fa-regular fa-snowflake"></i>
                {user.flake_score}%
              </li>
              <li
                className={`${styles.dropdown_item} ${location.pathname === "/app/schedule" ? styles.active : ""}`}
                onClick={goToSchedule}
              >
                Scheduled Dates
              </li>
              <li
                className={`${styles.dropdown_item} ${location.pathname === "/app/edit-profile" ? styles.active : ""}`}
                onClick={goToEditProfile}
              >
                Edit Profile
              </li>
              <li className={styles.dropdown_item} onClick={handleLogout}>
                Log Out
              </li>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
