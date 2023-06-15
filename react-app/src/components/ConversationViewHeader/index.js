import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConversationViewHeader.css";
import { getDateThunk, getDatesThunk } from "../../store/date";

function ConversationViewHeader() {
    const currentMatch = useSelector(state => state.match.currentMatch)
    const allDatesObj = useSelector(state => state.date.allDates)
    const allDates = Object.values(allDatesObj)
    console.log("ALL DATES: ", allDates)
    const allDateMatchIds = allDates.map(date => date.match_id)

    console.log("ALL DATE MATCH IDS", allDateMatchIds)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDatesThunk())
    }, [dispatch])


    return (
        <div className='conversation-view-header-wrapper'>
            <img src={currentMatch.picture_1}></img>
            {(allDateMatchIds.includes(currentMatch.matchId)) && (
                <p>Scheduled</p>
            )}
            <h2>{currentMatch.first_name}</h2>
        </div>
    )
}

export default ConversationViewHeader;
