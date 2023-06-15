import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ScheduleViewIndex.css";
import LeftMatchesBar from "../LeftMatchesBar";
import { Redirect } from "react-router-dom";
import { getDatesThunk } from "../../store/date";

function ScheduleViewIndex({ isLoaded }) {
    const user = useSelector(state => state.session.user);
    const datesObj = useSelector(state => state.date.allDates);
    const allDates = Object.values(datesObj);
    const dispatch = useDispatch();
    const currentDate = new Date();

    console.log("CURRENT DATE: ", currentDate)
    const upcomingDates = []
    const pastDates = []



    for (let date of allDates) {
        console.log("SCHEDULED DATE: ", date.scheduled_date)
        const dateDate = new Date(date.scheduled_date)
        console.log("DATE DATE: ", dateDate)
        if (dateDate > currentDate) {
            upcomingDates.push(date)
        } else {
            pastDates.push(date)
        }
    }

    console.log("UPCOMING DATES: ", upcomingDates)
    console.log("PAST DATES: ", pastDates)


    useEffect(() => {
        dispatch(getDatesThunk())
    }, [dispatch])

    if (!user) {
        return <Redirect to="/" />
    }

    return (
        <div className="schedule-view-wrapper">
            <LeftMatchesBar isLoaded={isLoaded} />
            <div className="schedule-view-right-side">
                <div className="schedule-view-header">
                    <h2>Date Calendar</h2>
                </div>
                <div className="schedule-main-content dates-items-wrapper">
                    <div className="upcoming-dates-wrapper">
                        <h3>Upcoming Dates:</h3>
                        {upcomingDates.map(date => (
                            <div>
                                <p>Date with </p>
                                <p>{date.scheduled_date}</p>
                            </div>
                        ))}
                    </div>
                    <div className="past-dates-wrapper dates-items-wrapper">
                        <h3>Past Dates:</h3>
                        {pastDates.map(date => (
                            <div>
                                <p>Date with </p>
                                <p>{date.scheduled_date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleViewIndex;
