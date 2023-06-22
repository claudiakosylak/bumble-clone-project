import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMatchThunk, getMatch, getMatchesThunk, potentialMatchesThunk } from "../../store/match";
import { NavLink, useHistory } from "react-router-dom";
import "./ConversationList.css";
import { getDatesThunk, getDateRequestsThunk } from "../../store/date";

function ConversationList({ messagedMatches }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const currentMatch = useSelector(state => state.match.currentMatch)
    const allDatesObj = useSelector(state => state.date.allDates)
    const allDates = Object.values(allDatesObj)
    const dateRequestsObj = useSelector(state => state.date.dateRequests)
    const dateRequests = Object.values(dateRequestsObj)
    let allDateMatchIds = [];
    for (let date of allDates) {
        allDateMatchIds.push(date.match_id)
    }

    let dateRequestMatchIds = [];
    for (let request of dateRequests) {
        dateRequestMatchIds.push(request.match_id)
    }

    useEffect(() => {
        dispatch(getDatesThunk())
        dispatch(getDateRequestsThunk())
    }, [dispatch])

    console.log("DATE REQUESTS: ", dateRequests)

    const handlePicClick = async (match) => {
        await dispatch(getMatch(match))
        history.push("/app/connections")
    }

    const sortedMatches = messagedMatches.toSorted((a, b) => {
        const aId = a.last_message.id
        const bId = b.last_message.id

        if (aId > bId) return -1;
        if (bId > aId) return 1;
        return 0;
    })

    console.log("SORTED MATCHES: ", sortedMatches)
    return (
        <div className="conversations-list-wrapper" >
            <div className="inner-convo-list-wrapper">

                {sortedMatches.map(match => (
                    <li key={match.last_message.created_at.id} onClick={() => handlePicClick(match)}>
                        <div className={`conversation-list-item ${(currentMatch && currentMatch.id === match.id) && "active-convo"}`}>
                            <img className="mini-match-icons" src={match.picture_1}
                                onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }} ></img>
                            <div className="conversation-list-item-right">
                                <div className="convo-list-header">
                                    <p className="convo-list-first-name">{match.first_name}   {allDateMatchIds.includes(match.matchId) &&  <i class="fa-regular fa-calendar-days" id="left-calendar-icon"></i>}   {dateRequestMatchIds.includes(match.matchId) && <span><i class="fa-regular fa-calendar-days" id="left-calendar-icon"></i><span id="left-calendar-icon">   ??</span></span>}</p>
                                    {match.last_message.user_id !== user.id && (
                                        <p id="your-move">Your move</p>
                                    )}

                                </div>
                                <p className="message-content-preview">{match.last_message.content.length < 6 ? (
                                    match.last_message.content
                                ) : (
                                    match.last_message.content.slice(0, 37) + "..."
                                )}</p>

                            </div>

                        </div>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default ConversationList;
