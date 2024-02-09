import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./StaticLeftSettingsBar.module.sass";

function StaticLeftSettingsBar({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const goToSchedule = (e) => {
    history.push("/app/schedule");
  };

  const goToEditProfile = (e) => {
    history.push("/app/edit-profile");
  };

  return (
    <>
      <ul className={styles.wrapper}>
        {user && (
          <div className={styles.inside}>
            <div className={styles.header}>
              <i
                className="fa-solid fa-angle-left"
                onClick={() => history.push("/app")}
              ></i>
              <img
                src={user.picture_1}
                className={styles.image}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";
                }}
              ></img>
            </div>
            <div className={styles.bottom}>
              <li className={styles.flake_score}>
                <i class="fa-regular fa-snowflake"></i>
                {user.flake_score}%
              </li>
              <li
                className={`${styles.dropdown_item} ${
                  location.pathname === "/app/schedule" ? styles.active : ""
                }`}
                onClick={goToSchedule}
              >
                Scheduled Dates
              </li>
              <li
                className={`${styles.dropdown_item} ${
                  location.pathname === "/app/edit-profile" ? styles.active : ""
                }`}
                onClick={goToEditProfile}
              >
                Edit Profile
              </li>
              <li className={styles.dropdown_item} onClick={handleLogout}>
                Log Out
              </li>
            </div>
          </div>
        )}
      </ul>
    </>
  );
}

export default StaticLeftSettingsBar;
