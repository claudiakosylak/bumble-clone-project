import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftMatchesBar from "../LeftMatchesBar";
import RightProfileBar from "../RightProfileBar";
import MatchMessages from "../MatchMessages";
import { Redirect } from "react-router-dom";
import ConversationViewHeader from "../ConversationViewHeader";
import { getDateRequestsThunk } from "../../store/date";
import styles from "./ConversationViewIndex.module.sass";

function ConversationViewIndex({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const currentMatch = useSelector((state) => state.match.currentMatch);
  const dateRequestsObj = useSelector((state) => state.date.dateRequests);
  const dateRequests = Object.values(dateRequestsObj);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDateRequestsThunk());
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/" />;
  }

  if (!currentMatch.id) {
    return <Redirect to="/app" />;
  }
  return (
    <div className={styles.wrapper}>
      <LeftMatchesBar isLoaded={isLoaded} />
      <div className={styles.main_content}>
        <div className={styles.main_content_inner}>
          <ConversationViewHeader dateRequests={dateRequests} />
          <MatchMessages />
        </div>
        <RightProfileBar />
      </div>
    </div>
  );
}

export default ConversationViewIndex;
