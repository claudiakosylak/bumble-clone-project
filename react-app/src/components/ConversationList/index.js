import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatch } from "../../store/match";
import { useHistory } from "react-router-dom";
import { getDatesThunk, getDateRequestsThunk } from "../../store/date";
import styles from "./ConversationList.module.sass";

function ConversationList({ messagedMatches, isSmaller, isHovered }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const currentMatch = useSelector((state) => state.match.currentMatch);
  const allDatesObj = useSelector((state) => state.date.allDates);
  const allDates = Object.values(allDatesObj);
  const dateRequestsObj = useSelector((state) => state.date.dateRequests);
  const dateRequests = Object.values(dateRequestsObj);
  let allDateMatchIds = [];
  for (let date of allDates) {
    allDateMatchIds.push(date.match_id);
  }

  let dateRequestMatchIds = [];
  for (let request of dateRequests) {
    dateRequestMatchIds.push(request.match_id);
  }

  useEffect(() => {
    dispatch(getDatesThunk());
    dispatch(getDateRequestsThunk());
  }, [dispatch]);

  const handlePicClick = async (match) => {
    await dispatch(getMatch(match));
    history.push("/app/connections");
  };

  const sortedMatches = messagedMatches.toSorted((a, b) => {
    const aId = a.last_message.id;
    const bId = b.last_message.id;

    if (aId > bId) return -1;
    if (bId > aId) return 1;
    return 0;
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        {sortedMatches.map((match) => (
          <li
            key={match.last_message.created_at.id}
            onClick={() => handlePicClick(match)}
          >
            <div
              className={`${styles.conversation} ${
                currentMatch && currentMatch.id === match.id && styles.active
              }`}
            >
              <img
                className={styles.image}
                src={match.picture_1}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";
                }}
              ></img>
              {(!isSmaller || isHovered) && (
                <div className={styles.right}>
                <div className={styles.header}>
                  <p className={styles.name}>
                    {match.first_name}{" "}
                    {allDateMatchIds.includes(match.matchId) && (
                      <i
                      className={`fa-regular fa-calendar-days ${styles.calendar}`}
                      ></i>
                    )}{" "}
                    {dateRequestMatchIds.includes(match.matchId) && (
                      <span>
                        <i
                          className={`fa-regular fa-calendar-days ${styles.calendar}`}
                          ></i>
                        <span className={styles.calendar}> ??</span>
                      </span>
                    )}
                  </p>
                  {match.last_message.user_id !== user.id && (
                    <div className={styles.your_move}>Your move</div>
                  )}
                </div>
                <p className={styles.preview}>
                  {match.last_message.content}
                </p>
              </div>
                )}
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default ConversationList;
