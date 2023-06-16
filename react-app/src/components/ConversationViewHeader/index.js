import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConversationViewHeader.css";
import { createNewDateThunk, getDateRequestsThunk, getDateThunk, getDatesThunk } from "../../store/date";
import OpenModalButton from "../OpenModalButton";
import RequestDateModal from "../RequestDateModal";

function ConversationViewHeader({ dateRequests }) {
    const currentMatch = useSelector(state => state.match.currentMatch)
    const currentUser = useSelector(state => state.session.user)
    const allDatesObj = useSelector(state => state.date.allDates)
    const allDates = Object.values(allDatesObj)
    const allDateMatchIds = allDates.map(date => date.match_id)
    const currentDate = allDates.find(date => date.match_id === currentMatch.matchId)
    const todaysDate = new Date()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dateRequester = dateRequests.find(request => request.requesting_user_id === currentMatch.id)
    const dateRequested = dateRequests.find(request => (request.requesting_user_id === currentUser.id && request.match_id === currentMatch.matchId))
    let dateDate
    if (currentDate) {
        dateDate = new Date(currentDate.scheduled_date)
    }

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
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "match-settings-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    //helper function to handle clicking accept date
    const handleAcceptDate = async (e) => {
        // create a new date in the db and delete the date request
        await dispatch(createNewDateThunk(dateRequester.id))
        // refresh the user's dates in store
        dispatch(getDatesThunk())
        // refresh the user's date requests in store
        dispatch(getDateRequestsThunk())
        //close dropdown
        closeMenu()
    }

    return (
        <div className='conversation-view-header-wrapper'>
            <img src={currentMatch.picture_1}></img>
            <h2>{currentMatch.first_name}</h2>
            {(allDateMatchIds.includes(currentMatch.matchId)) && (
                <div className="scheduled-status">
                    <i class="fa-regular fa-calendar-days"></i>
                    <p className="scheduled-status-text">You {dateDate > todaysDate ? "are" : "were"} scheduled for a date on {currentDate.scheduled_date}</p>
                </div>
            )}

            {(dateRequested && (
                <div className="scheduled-status">
                    <i class="fa-regular fa-calendar-days"></i>
                    <p className="scheduled-status-text">You have requested a date for {dateRequested.suggested_date}</p>
                </div>
            ))}
            {(dateRequester && (
                <div className="scheduled-status">
                    <i class="fa-regular fa-calendar-days"></i>
                    <p className="scheduled-status-text">{currentMatch.first_name} has requested a date for {dateRequester.suggested_date}</p>
                </div>
            ))}
            <i class="fa-solid fa-ellipsis-vertical" onClick={openMenu}></i>
            <ul className={ulClassName} ref={ulRef}>
                <div>
                    {(!currentDate && !dateRequester && !dateRequested) && (
                        <li>

                            <OpenModalButton
                                buttonText="Request a date"
                                modalComponent={<RequestDateModal match={currentMatch} />}
                            />
                        </li>

                    )}
                    {dateRequester && (
                        <>
                        <button onClick={handleAcceptDate}>Accept date</button>
                        <li>Reject date</li>
                        </>
                    )}

                    {(dateDate && dateDate < todaysDate) && (
                        <li>Report on date</li>
                    )}

                    <li>Report ghosted</li>
                </div>
            </ul>
        </div>
    )
}

export default ConversationViewHeader;
