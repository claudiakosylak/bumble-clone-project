import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ScheduleViewIndex.css";
import LeftMatchesBar from "../LeftMatchesBar";
import { Redirect } from "react-router-dom";

function ScheduleViewIndex({ isLoaded }) {
    const user = useSelector(state => state.session.user)

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
            </div>
        </div>
    )
}

export default ScheduleViewIndex;
