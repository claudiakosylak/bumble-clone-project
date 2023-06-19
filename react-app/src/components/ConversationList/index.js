import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMatchThunk, getMatch, getMatchesThunk, potentialMatchesThunk } from "../../store/match";
import { NavLink, useHistory } from "react-router-dom";
import "./ConversationList.css";

function ConversationList({ messagedMatches }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const currentMatch = useSelector(state => state.match.currentMatch)

    const handlePicClick = async (match) => {
        await dispatch(getMatch(match))
        history.push("/app/connections")
    }

    // function compareMessageTime(a, b) {
    //     const aDate = new Date(a.last_message.created_at)
    //     const bDate = new Date(b.last_message.created_at)
    //     console.log("THIS IS A: ", aDate)
    //     console.log("THIS IS B: ", bDate)

    //     if (aDate > bDate) return -1;
    //     if (bDate > aDate) return 1;
    //     return 0;
    // }

    const sortedMatches = messagedMatches.toSorted((a, b) => {
        const aDate = new Date(a.last_message.created_at)
        const bDate = new Date(b.last_message.created_at)
        console.log("THIS IS A: ", a.last_message.created_at)
        console.log("THIS IS B: ", b.last_message.created_at)

        if (aDate > bDate) return -1;
        if (bDate > aDate) return 1;
        return 0;
        // return a.last_message.created_at - b.last_message.created_at
    })
    console.log("MESSAGED MATCHES: ", messagedMatches)
    console.log("sorted MATCHES: ", sortedMatches)
    return (
        <ul className="conversations-list-wrapper" >
            {sortedMatches.map(match => (
                <li key={match.last_message.created_at.id} onClick={() => handlePicClick(match)}>
                    <div className={`conversation-list-item ${(currentMatch && currentMatch.id === match.id) && "active-convo"}`}>
                        <img className="mini-match-icons" src={match.picture_1}
                            onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }} ></img>
                        <div className="conversation-list-item-right">
                            <div className="convo-list-header">
                                <p className="convo-list-first-name">{match.first_name}</p>
                                {match.last_message.user_id !== user.id && (
                                    <p id="your-move">Your move</p>
                                )}

                            </div>
                            <p className="message-content-preview">{match.last_message.content.length < 38 ? (
                                match.last_message.content
                            ) : (
                                match.last_message.content.slice(0, 39) + "..."
                            )}</p>

                        </div>

                    </div>
                </li>
            ))}
        </ul>
    )
}

export default ConversationList;
