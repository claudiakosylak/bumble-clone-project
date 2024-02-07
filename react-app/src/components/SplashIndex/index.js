import React from "react";
import { useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import splashPic from "../../images/couple-on-date.jpg";
import { CircleSpinner } from "react-spinners-kit";
import styles from "./SplashIndex.module.sass";

function SplashIndex() {
  const user = useSelector((state) => state.session.user);

  if (user) {
    return <Redirect to="/app" />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo_container}>
          <i className="fa-regular fa-snowflake"></i>
          <div className={styles.logo_text}>noFlake</div>
        </div>
      </div>
      {splashPic ? (
        <div className={styles.main_content}>
          <img src={splashPic} className={styles.image}></img>
          <div className={styles.main_textarea}>
            <h2>Stop wasting time with flakes</h2>
            <p>
              Start ACTUALLY meeting with new people in your area! If you
              already have an account, sign up to use noFlake on the web.{" "}
            </p>
            <div className={styles.buttons}>
              <NavLink
                to="/signup"
                className={`${styles.button} ${styles.join}`}
              >
                Join
              </NavLink>
              <NavLink
                to="/login"
                className={`${styles.button} ${styles.signin}`}
              >
                Sign In
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="splash-spinner-wrapper">
          <CircleSpinner size={30} color="#80F" loading={!splashPic} />
        </div>
      )}
      <footer className={styles.footer}>
        <div className={styles.footer_icons}>
          <a href="https://www.linkedin.com/in/claudiakosylak/" target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/claudiakosylak" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
        <p>Developed by Claudia Kosylak</p>
      </footer>
    </div>
  );
}

export default SplashIndex;
