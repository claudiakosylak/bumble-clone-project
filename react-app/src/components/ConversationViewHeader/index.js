import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewDateThunk,
  deleteDateRequestThunk,
  getDateRequestsThunk,
  getDatesThunk,
} from "../../store/date";
import OpenModalButton from "../OpenModalButton";
import RequestDateModal from "../RequestDateModal";
import { getMadeDateReportsThunk } from "../../store/date_report";
import ReportGhostModal from "../ReportGhostModal";
import ReportDateModal from "../ReportDateModal";
import { deleteMatchThunk, potentialMatchesThunk } from "../../store/match";
import { dateTransformer, niceDateString } from "../../helpers";
import styles from "./ConversationViewHeader.module.sass";

function ConversationViewHeader({ dateRequests }) {
  // gets all of the date reports the current user has made to others and turns it into an array
  const madeReportsObj = useSelector(
    (state) => state.dateReport.madeDateReports
  );
  const madeReports = Object.values(madeReportsObj);
  // gets the user profile of the current match from the store
  const currentMatch = useSelector((state) => state.match.currentMatch);
  // gets the information of the current user from the store
  const currentUser = useSelector((state) => state.session.user);
  // gets the report current user has made on the current match, if it exists
  const currentMatchReport = madeReports.find(
    (report) => report.reported_user_id === currentMatch.id
  );
  // gets all of the current user's dates from the store and turns them into an array
  const allDatesObj = useSelector((state) => state.date.allDates);
  const allDates = Object.values(allDatesObj);
  // finds information on the date scheduled or pending for the current match by match id from the alldates array
  const allDateMatchIds = allDates.map((date) => date.match_id);
  const currentDate = allDates.find(
    (date) => date.match_id === currentMatch.matchId
  );
  // establish the current date to compare if dates have happened in the past or are coming up
  const todaysDate = new Date();
  // logic to establish if the match settings menu is showing or not
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  // get information on the date request if it was requested by the other user in the match
  const dateRequester = dateRequests.find(
    (request) => request.requesting_user_id === currentMatch.id
  );
  // get information on the date request if it was requested by the current user
  const dateRequested = dateRequests.find(
    (request) =>
      request.requesting_user_id === currentUser.id &&
      request.match_id === currentMatch.matchId
  );
  // change date format on current match date information for better comparison against today's date
  let dateDate;
  if (currentDate) {
    dateDate = new Date(currentDate.scheduled_date);
  }
  const dispatch = useDispatch();

  // update store with freshest list of all user's dates on mount, as well as all the user's created date reports
  useEffect(() => {
    dispatch(getDatesThunk());
    dispatch(getMadeDateReportsThunk());
  }, [dispatch]);

  // logic and helper functions regarding opening the match settings dropdown
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = styles.dropdown + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  //helper function to handle clicking accept date
  const handleAcceptDate = async (e) => {
    // create a new date in the db and delete the date request
    await dispatch(createNewDateThunk(dateRequester.id));
    // refresh the user's dates in store
    dispatch(getDatesThunk());
    // refresh the user's date requests in store
    dispatch(getDateRequestsThunk());
    //close dropdown
    closeMenu();
  };

  //helper function to handle clicking reject date
  const handleRejectDate = async (e) => {
    // deletes the date request and updates the store of date requests for the user
    await dispatch(deleteDateRequestThunk(dateRequester.id));
    // close dropdown
    closeMenu();
  };

  const handleUnmatch = async (matchId) => {
    await dispatch(deleteMatchThunk(matchId));
    await dispatch(potentialMatchesThunk());
  };

  return (
    <div className={styles.wrapper}>
      <img
        src={currentMatch.picture_1}
        onError={(e) => {
          e.currentTarget.src =
            "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";
        }}
      ></img>
      <h2>{currentMatch.first_name}</h2>
      {allDateMatchIds.includes(currentMatch.matchId) && (
        <div className={styles.scheduled_status}>
          <i className="fa-regular fa-calendar-days"></i>
          <p className={styles.scheduled_status_text}>
            You {dateDate > todaysDate ? "are" : "were"} scheduled for a date on{" "}
            {niceDateString(dateTransformer(currentDate.scheduled_date))}
          </p>
        </div>
      )}

      {dateRequested && (
        <div className={styles.scheduled_status}>
          <i class="fa-regular fa-calendar-days"></i>
          <p className={styles.scheduled_status_text}>
            You have requested a date for{" "}
            {niceDateString(dateTransformer(dateRequested.suggested_date))}
          </p>
        </div>
      )}
      {dateRequester && (
        <div className={styles.scheduled_status}>
          <i class="fa-regular fa-calendar-days"></i>
          <p className={styles.scheduled_status_text}>
            {currentMatch.first_name} has requested a date for{" "}
            {niceDateString(dateTransformer(dateRequester.suggested_date))}
          </p>
        </div>
      )}
      {!currentDate && !dateRequester && !dateRequested && (
        <div className={styles.scheduled_status}>
          <p className={styles.scheduled_status_text}>
            You don't have any dates scheduled with {currentMatch.first_name}
          </p>
        </div>
      )}
      <i class="fa-solid fa-ellipsis-vertical" onClick={openMenu}></i>
      <ul className={ulClassName} ref={ulRef}>
        <div className={styles.dropdown_inner}>
          {!currentDate && !dateRequester && !dateRequested && (
            <OpenModalButton
              buttonText="Request a date"
              modalComponent={<RequestDateModal match={currentMatch} />}
            />
          )}
          {dateRequester && (
            <>
              <button onClick={handleAcceptDate}>Accept date</button>
              <button onClick={handleRejectDate}>Reject date</button>
            </>
          )}

          {!currentMatchReport && dateDate && dateDate < todaysDate && (
            <OpenModalButton
              buttonText="Report on date"
              modalComponent={
                <ReportDateModal match={currentMatch} date={currentDate} />
              }
            />
          )}
          {!currentMatchReport && (
            <OpenModalButton
              buttonText="Report ghosting"
              modalComponent={<ReportGhostModal match={currentMatch} />}
            />
          )}
          <button onClick={() => handleUnmatch(currentMatch.matchId)}>
            Unmatch
          </button>
        </div>
      </ul>
    </div>
  );
}

export default ConversationViewHeader;
