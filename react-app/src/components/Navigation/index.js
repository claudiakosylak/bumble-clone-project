import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.sass";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul>
      {isLoaded && (
        <li className={styles.closed_wrapper}>
          <ProfileButton user={sessionUser} />
          <p className={styles.user_name}>{sessionUser.first_name}</p>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
