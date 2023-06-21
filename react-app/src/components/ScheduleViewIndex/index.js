import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ScheduleViewIndex.css";
import LeftMatchesBar from "../LeftMatchesBar";
import { Redirect } from "react-router-dom";
import { getDatesThunk } from "../../store/date";
import StaticLeftSettingsBar from "../StaticLeftSettingsBar";
import { dateTransformer, niceDateString } from "../ConversationViewHeader";

function ScheduleViewIndex({ isLoaded }) {
    const user = useSelector(state => state.session.user);
    const datesObj = useSelector(state => state.date.allDates);
    const allDates = Object.values(datesObj);
    const dispatch = useDispatch();
    const currentDate = new Date();


    const upcomingDates = []
    const pastDates = []

    console.log("ALL DATES: ", allDates)
    console.log("UPCOMING DATES: ", upcomingDates)
    console.log("PAST DATES: ", pastDates)

    for (let date of allDates) {

        const dateDate = new Date(date.scheduled_date)

        if (dateDate > currentDate) {
            upcomingDates.push(date)
        } else {
            pastDates.push(date)
        }
    }



    useEffect(() => {
        dispatch(getDatesThunk())
    }, [dispatch])

    if (!user) {
        return <Redirect to="/" />
    }

    return (
        <div className="schedule-view-wrapper">
            <StaticLeftSettingsBar user={user} />
            <div className="schedule-view-right-side">
                <div className="schedule-view-header">
                    <h2>Date Calendar</h2>
                </div>
                <div className="schedule-main-content dates-items-wrapper">
                    <div className="upcoming-dates-wrapper">
                        <h3>Upcoming Dates:</h3>
                        {upcomingDates.length > 0 ? (upcomingDates.map(date => (
                            <div>
                                <p>Date with {date.other_user.first_name}</p>
                                <p>{niceDateString(dateTransformer(date.scheduled_date))}</p>
                            </div>
                        ))) : (
                            <p>You don't have any upcoming dates.</p>
                        )}
                    </div>
                    <div className="past-dates-wrapper dates-items-wrapper">
                        <h3>Past Dates:</h3>
                        {pastDates.length > 0 ?(pastDates.map(date => (

                            <div>
                                <p>Date with {date.other_user.first_name}</p>
                                <p>{niceDateString(dateTransformer(date.scheduled_date))}</p>
                            </div>
                        ))) : (
                            <p>You haven't had any dates yet. </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleViewIndex;
