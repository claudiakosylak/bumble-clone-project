import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConversationViewHeader.css";
import { getDateThunk, getDatesThunk } from "../../store/date";

function ConversationViewHeader() {
    const currentMatch = useSelector(state => state.match.currentMatch)
    const allDatesObj = useSelector(state => state.date.allDates)
    const allDates = Object.values(allDatesObj)
    const allDateMatchIds = allDates.map(date => date.match_id)
    const currentDate = allDates.find(date => date.match_id === currentMatch.matchId)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    console.log("CURRENT DATE: ", currentDate)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDatesThunk())
    }, [dispatch])

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "match-settings-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <div className='conversation-view-header-wrapper'>
            <img src={currentMatch.picture_1}></img>
            <h2>{currentMatch.first_name}</h2>
            {(allDateMatchIds.includes(currentMatch.matchId)) && (
                <div className="scheduled-status">
                    <i class="fa-regular fa-calendar-days"></i>
                    <p className="scheduled-status-text">You are scheduled for a date on {currentDate.scheduled_date}</p>
                </div>
            )}
            <i class="fa-solid fa-ellipsis-vertical" onClick={openMenu}></i>
            <ul className={ulClassName} ref={ulRef}>
                <div>
                    {!currentDate ? (
                        <li>Schedule a date</li>

                    ) : (
                        <li>Report on date</li>
                    )}
                    <li>Report ghosted</li>
                </div>
            </ul>
        </div>
    )
}

export default ConversationViewHeader;
