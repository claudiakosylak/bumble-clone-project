import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchesThunk } from "../../store/match";
import Navigation from "../Navigation";
import { NavLink, useLocation } from "react-router-dom";
import ConversationList from "../ConversationList";
import MatchesCarousel from "../MatchesCarousel";
import styles from "./LeftMatchesBar.module.sass";

function LeftMatchesBar({ isLoaded }) {
  const [isSmaller, setIsSmaller] = useState(
    window.innerWidth > 1023 ? false : true
  );
  const matchesObj = useSelector((state) => state.match.currentMatches);
  const matches = Object.values(matchesObj);
  const dispatch = useDispatch();
  const location = useLocation();
  const messagedMatches = [];
  const unMessagedMatches = [];
  for (let match of matches) {
    if (match.last_message) {
      messagedMatches.push(match);
    } else {
      unMessagedMatches.push(match);
    }
  }

  useEffect(() => {
    dispatch(getMatchesThunk());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1023) setIsSmaller(false);
      else setIsSmaller(true);
    });
    return () =>
      window.removeEventListener("resize", () => {
        if (window.innerWidth > 1023) setIsSmaller(false);
        else setIsSmaller(true);
      });
  });

  return (
    <div className={styles.wrapper}>
      <Navigation isLoaded={isLoaded} isSmaller={isSmaller} />
      {isSmaller && <div className={styles.bar}></div>}
      {location.pathname === "/app/connections" && (
        <NavLink to="/app" className={styles.back_to_browse}>
          {!isSmaller ? (
            <>
              Back to meeting new people
              <i className="fa-solid fa-angle-right"></i>
            </>
          ) : (
            <div className={styles.back_to_browse_icon}>
              <div className={`${styles.rectangle1} ${styles.rectangle}`}></div>
              <div className={`${styles.rectangle2} ${styles.rectangle}`}></div>
            </div>
          )}
        </NavLink>
      )}
      {isSmaller && location.pathname === "/app/connections" && (
        <div className={styles.bar}></div>
      )}
      {!isSmaller && (
        <p className={styles.labels}>
          Unmessaged Matches ({unMessagedMatches.length})
        </p>
      )}
      {(!isSmaller || (isSmaller && unMessagedMatches.length > 0)) && (
        <MatchesCarousel
          unMessagedMatches={unMessagedMatches}
          isSmaller={isSmaller}
        />
      )}
      {!isSmaller && (
        <p className={styles.labels}>Conversations</p>
      )}
      {messagedMatches.length > 0 ? (
        <ConversationList messagedMatches={messagedMatches} />
      ) : !isSmaller ? (
        <p className={styles.no_conversations}>
          You haven't started any conversations yet
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default LeftMatchesBar;
