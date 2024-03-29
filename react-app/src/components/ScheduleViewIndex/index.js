import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getDateRequestsThunk, getDatesThunk } from "../../store/date";
import StaticLeftSettingsBar from "../StaticLeftSettingsBar";
import { dateTransformer, niceDateString } from "../../helpers";
import styles from "./ScheduleViewIndex.module.sass";

const sortDatesRecentTop = (dates) => {
  const sortedDates = dates.toSorted((a, b) => {
    const aDate = new Date(a.scheduled_date);
    const bDate = new Date(b.scheduled_date);

    if (aDate < bDate) return -1;
    if (bDate < aDate) return 1;
    return 0;
  });
  return sortedDates;
};

const sortDatesRecentBottom = (dates) => {
  const sortedDates = dates.toSorted((a, b) => {
    const aDate = new Date(a.scheduled_date);
    const bDate = new Date(b.scheduled_date);

    if (aDate < bDate) return 1;
    if (bDate < aDate) return -1;
    return 0;
  });
  return sortedDates;
};

const sortDateRequests = (requests) => {
  const currentDate = new Date();
  const expiredRequests = [];
  const upcomingRequests = [];
  for (let request of requests) {
    const requestDate = new Date(request.suggested_date);
    if (requestDate < currentDate) {
      expiredRequests.push(request);
    } else {
      upcomingRequests.push(request);
    }
  }
  const sortedExpired = expiredRequests.toSorted((a, b) => {
    const aDate = new Date(a.suggested_date);
    const bDate = new Date(b.suggested_date);
    if (aDate < bDate) return 1;
    if (bDate < aDate) return -1;
    return 0;
  });
  const sortedUpcoming = upcomingRequests.toSorted((a, b) => {
    const aDate = new Date(a.suggested_date);
    const bDate = new Date(b.suggested_date);
    if (aDate > bDate) return 1;
    if (bDate > aDate) return -1;
    return 0;
  });
  return [sortedUpcoming, sortedExpired];
};

function ScheduleViewIndex({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const datesObj = useSelector((state) => state.date.allDates);
  const allDates = Object.values(datesObj);
  const dateRequestsObj = useSelector((state) => state.date.dateRequests);
  const dateRequests = Object.values(dateRequestsObj);
  let userRequestingDates = [];
  let userRequestedDates = [];
  for (let request of dateRequests) {
    if (request.requesting_user_id === user.id) {
      userRequestingDates.push(request);
    } else {
      userRequestedDates.push(request);
    }
  }
  const dispatch = useDispatch();
  const currentDate = new Date();

  const upcomingDates = [];
  const pastDates = [];

  for (let date of allDates) {
    const dateDate = new Date(date.scheduled_date);

    if (dateDate > currentDate) {
      upcomingDates.push(date);
    } else {
      pastDates.push(date);
    }
  }

  const sortedPastDates = sortDatesRecentBottom(pastDates);
  const sortedUpcomingDates = sortDatesRecentTop(upcomingDates);
  const sortedRequestingDates = sortDateRequests(userRequestingDates);
  const sortedRequestedDates = sortDateRequests(userRequestedDates);

  useEffect(() => {
    dispatch(getDatesThunk());
    dispatch(getDateRequestsThunk());
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.wrapper}>
      <StaticLeftSettingsBar user={user} />
      <div className={styles.inner_wrapper}>
        <div className={styles.header}>
          <h2>Date Calendar</h2>
        </div>
        <div className={styles.main_content}>
          <div className={styles.main_content_inner}>
            <div className={styles.dates_section}>
              <h3>Upcoming Dates</h3>
              {upcomingDates.length > 0 ? (
                sortedUpcomingDates.map((date) => (
                  <div>
                    <div className="date-item-left">
                      <p>Date with {date.other_user.first_name}</p>
                      <p>
                        {niceDateString(dateTransformer(date.scheduled_date))}
                      </p>
                    </div>
                    <div></div>
                  </div>
                ))
              ) : (
                <p>You don't have any upcoming dates.</p>
              )}
            </div>
            <div className={styles.dates_section}>
              <h3>Past Dates</h3>
              {pastDates.length > 0 ? (
                sortedPastDates.map((date) => (
                  <div>
                    <div className="date-item-left">
                      <p>Date with {date.other_user.first_name}</p>
                      <p>
                        {niceDateString(dateTransformer(date.scheduled_date))}
                      </p>
                    </div>
                    <div></div>
                  </div>
                ))
              ) : (
                <p>You haven't had any dates yet. </p>
              )}
            </div>
            <div className={styles.dates_section}>
              <h3>Pending Date Requests Made by You</h3>
              {sortedRequestingDates[0].length > 0 ? (
                sortedRequestingDates[0].map((request) => (
                  <div>
                    <p>Date Request with {request.other_user.first_name}</p>
                    <p>
                      {niceDateString(dateTransformer(request.suggested_date))}
                    </p>
                  </div>
                ))
              ) : (
                <p>You don't have any pending date requests. </p>
              )}
              {sortedRequestingDates[1].length > 0 && (
                <h4>Expired requests:</h4>
              )}
              {sortedRequestingDates[1].length > 0 &&
                sortedRequestingDates[1].map((request) => (
                  <div>
                    <p>Date Request with {request.other_user.first_name}</p>
                    <p>
                      {niceDateString(dateTransformer(request.suggested_date))}
                    </p>
                  </div>
                ))}
            </div>
            <div className={styles.dates_section}>
              <h3>Pending Dates Requested by Your Matches</h3>
              {sortedRequestedDates[0].length > 0 ? (
                sortedRequestedDates[0].map((request) => (
                  <div>
                    <p>Date Request with {request.other_user.first_name}</p>
                    <p>
                      {niceDateString(dateTransformer(request.suggested_date))}
                    </p>
                  </div>
                ))
              ) : (
                <p>You don't have any pending date requests. </p>
              )}
              {sortedRequestedDates[1].length > 0 && <h4>Expired requests:</h4>}
              {sortedRequestedDates[1].length > 0 &&
                sortedRequestedDates[1].map((request) => (
                  <div>
                    <p>Date Request with {request.other_user.first_name}</p>
                    <p>
                      {niceDateString(dateTransformer(request.suggested_date))}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleViewIndex;
