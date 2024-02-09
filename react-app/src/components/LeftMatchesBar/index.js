import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchesThunk } from "../../store/match";
import Navigation from "../Navigation";
import { NavLink, useLocation } from "react-router-dom";
import ConversationList from "../ConversationList";
import MatchesCarousel from "../MatchesCarousel";
import styles from "./LeftMatchesBar.module.sass";

function LeftMatchesBar({ isLoaded }) {
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

  return (
    <div className={styles.wrapper}>
      <Navigation isLoaded={isLoaded} />
      {location.pathname === "/app/connections" && (
        <NavLink to="/app" className={styles.back_to_browse}>
          Back to meeting new people<i className="fa-solid fa-angle-right"></i>
        </NavLink>
      )}
      <p className={styles.labels}>
        Unmessaged Matches ({unMessagedMatches.length})
      </p>
      <MatchesCarousel unMessagedMatches={unMessagedMatches} />

      <p className={styles.labels}>Conversations</p>
      {messagedMatches.length > 0 ? (
        <ConversationList messagedMatches={messagedMatches} />
      ) : (
        <p>You haven't started any conversations yet</p>
      )}
    </div>
  );
}

export default LeftMatchesBar;
