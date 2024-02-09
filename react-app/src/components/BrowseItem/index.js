import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMatchRequestThunk,
  createMatchThunk,
  rejectMatchThunk,
} from "../../store/match";
import { getUnrejectedRequestsThunk } from "../../store/match_request";
import styles from "./BrowseItem.module.sass";

export const ageChanger = (dateOfBirth) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let compareDate = new Date(dateOfBirth);
  const birthYear = compareDate.getFullYear();
  let compareAge = currentYear - birthYear;
  compareDate.setFullYear(currentYear);
  if (compareDate > currentDate) {
    return compareAge - 1;
  } else {
    return compareAge;
  }
};

function BrowseItem({ browseUsers }) {
  const currentUser = useSelector((state) => state.session.user);
  const allMatchesObj = useSelector((state) => state.match.currentMatches);
  const allMatches = Object.values(allMatchesObj);
  const dispatch = useDispatch();
  const unrejectedRequestsObj = useSelector(
    (state) => state.matchRequest.unrejectedRequests
  );
  const requestArray = Object.values(unrejectedRequestsObj);
  const [matched, setMatched] = useState(false);
  const [matchedUser, setMatchedUser] = useState("");
  const shuffledMatches = [...browseUsers];
  const requestUsers = [];
  for (let request of requestArray) {
    requestUsers.push(request.requesting_user_id);
  }

  const newUser =
    allMatches.length === 2 &&
    allMatches[0].id === 1 &&
    allMatches[1].id === 153;
  let newUserMessage = false;

  useEffect(() => {
    dispatch(getUnrejectedRequestsThunk(currentUser.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUnrejectedRequestsThunk(currentUser.id));
  }, [browseUsers[0]]);

  const handleReject = async (id1, id2) => {
    await dispatch(rejectMatchThunk(id1, id2));
  };

  const handleSwipeRight = async (id1, id2) => {
    const requestExists = requestUsers.includes(id1);
    if (requestExists || newUser) {
      if (newUser) {
        newUserMessage = true;
      } else {
        newUserMessage = false;
      }
      setMatched(true);
      setMatchedUser(browseUsers[0]);
      dispatch(createMatchThunk(id1, id2));
    } else {
      dispatch(createMatchRequestThunk(id2, id1));
    }
  };

  const keepBrowsing = () => {
    setMatched(false);
    setMatchedUser("");
  };

  return (
    <>
      {browseUsers.length > 0 && (
        <div className={styles.wrapper}>
          <div className={styles.inner_wrapper}>
            <div className={styles.main_image}>
              <img
                src={shuffledMatches[0].picture_1}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";
                }}
              ></img>
            </div>
            <div className={styles.right_side}>
              <p className={styles.name_age}>
                {shuffledMatches[0].first_name},{" "}
                {ageChanger(shuffledMatches[0].date_of_birth)}
              </p>
              <p className={styles.main_about}>{shuffledMatches[0].about}</p>
              <div className={styles.flake_wrapper}>
                <p className={styles.flake_score}>
                  <i className="fa-regular fa-snowflake"></i>
                  {shuffledMatches[0].flake_score}%
                </p>
                {shuffledMatches[0].flake_score === 100 && (
                  <p className={styles.flake_text}>
                    Wow, you've found a noFlake!!!{" "}
                    {shuffledMatches[0].first_name} hasn't flaked or ghosted on
                    anyone.
                  </p>
                )}
                {shuffledMatches[0].flake_score < 100 &&
                  shuffledMatches[0].flake_score > 80 && (
                    <p className={styles.flake_text}>
                      {shuffledMatches[0].first_name} is mostly reliable. We
                      can't all be a perfect noFlake!
                    </p>
                  )}
                {shuffledMatches[0].flake_score < 80 &&
                  shuffledMatches[0].flake_score > 50 && (
                    <p className={styles.flake_text}>
                      {shuffledMatches[0].first_name} is somewhat reliable, but
                      may be more likely than average to flake.
                    </p>
                  )}
                {shuffledMatches[0].flake_score < 50 && (
                  <p className={styles.flake_text}>
                    {shuffledMatches[0].first_name} is pretty unreliable - might
                    be pretty hard to catch this YesFlake...
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.swipe_buttons}>
            <button
              className={styles.swipe_button}
              onClick={() =>
                handleReject(shuffledMatches[0].id, currentUser.id)
              }
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <button
              className={styles.swipe_button}
              onClick={() =>
                handleSwipeRight(shuffledMatches[0].id, currentUser.id)
              }
            >
              <i className="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      )}
      {shuffledMatches.length === 0 && (
        <div className={styles.empty_browse_wrapper}>
          <h3>
            You've run out of potential matches to browse. Check back soon as
            new users sign up!
          </h3>
        </div>
      )}
      {shuffledMatches.length > 0 && (
        <div className={matched ? styles.matched_wrapper : "hidden"}>
          <h2>Boom!</h2>
          <div className={styles.overlap_pics}>
            <img
              className={`${styles.overlap_pic} ${styles.ov1}`}
              src={currentUser.picture_1}
              onError={(e) => {
                e.currentTarget.src =
                  "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";
              }}
            ></img>
            <img
              className={`${styles.overlap_pic} ${styles.ov2}`}
              src={matchedUser.picture_1}
              onError={(e) => {
                e.currentTarget.src =
                  "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";
              }}
            ></img>
          </div>
          {newUserMessage ? (
            <p>
              When you swipe right on someone that has swiped right on you
              already, you have a match! You'll be able to see your new
              unmessaged matches at the top of the left bar.
            </p>
          ) : (
            <p>
              They like you too! Don't let this match get too cold and send them
              a message.
            </p>
          )}
          <br></br>
          <p onClick={keepBrowsing} className={styles.keep_browsing}>
            Keep Browsing
          </p>
        </div>
      )}
    </>
  );
}

export default BrowseItem;
