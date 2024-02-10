import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.sass";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      {isLoaded && (
        <div className={styles.closed_wrapper}>
          <ProfileButton user={sessionUser} />
          <p className={styles.user_name}>{sessionUser.first_name}</p>
        </div>
      )}
    </>
  );
}

export default Navigation;
