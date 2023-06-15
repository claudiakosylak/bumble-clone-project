import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConversationViewHeader.css";
import { getDateThunk, getDatesThunk } from "../../store/date";

function ConversationViewHeader() {
    const currentMatch = useSelector(state => state.match.currentMatch)
    const allDatesObj = useSelector(state => state.date.allDates)
    const allDates = Object.values(allDatesObj)
    const allDateMatchIds = allDates.map(date => date.match_id)
    const currentDate = allDates.find(date => date.match_id === currentMatch.matchId)


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDatesThunk())
    }, [dispatch])


    return (
        <div className='conversation-view-header-wrapper'>
            <img src={currentMatch.picture_1}></img>
            {(allDateMatchIds.includes(currentMatch.matchId)) && (
                <div className="scheduled-status">
                    <i class="fa-regular fa-calendar-days"></i>
                    <p className="scheduled-status-text">You are scheduled for a date on {currentDate.scheduled_date}</p>
                </div>
            )}
            <h2>{currentMatch.first_name}</h2>
        </div>
    )
}

export default ConversationViewHeader;
