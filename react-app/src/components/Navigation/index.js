import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.sass";

function Navigation({ isLoaded, isSmaller, isHovered }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      {isLoaded && (
        <div className={styles.closed_wrapper} style={isHovered ? {justifyContent: "flex-start", margin: "20px"} : {}}>
          <ProfileButton user={sessionUser} isHovered={isHovered}/>
          {(!isSmaller || isHovered) && (
            <p className={styles.user_name}>{sessionUser.first_name}</p>
          )}
        </div>
      )}
    </>
  );
}

export default Navigation;
