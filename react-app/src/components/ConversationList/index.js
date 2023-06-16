import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMatchThunk, getMatch, getMatchesThunk, potentialMatchesThunk } from "../../store/match";
import { NavLink, useHistory } from "react-router-dom";
import "./ConversationList.css";

function ConversationList({ messagedMatches }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    const handlePicClick = async (match) => {
        await dispatch(getMatch(match))
        history.push("/app/connections")
    }

    console.log("MESSAGED MATCHES: ", messagedMatches)
    return (
        <ul className="conversations-list-wrapper">
            {messagedMatches.map(match => (
                <li key={match.id}>
                    <div className="conversation-list-item">
                        <img onClick={() => handlePicClick(match)} className="mini-match-icons" src={match.picture_1}></img>
                        <div className="conversation-list-item-right">
                            <div className="convo-list-header">
                                <p className="convo-list-first-name">{match.first_name}</p>
                                {match.last_message.user_id !== user.id && (
                                    <p id="your-move">Your move</p>
                                )}

                            </div>
                            <p>{match.last_message.content}</p>

                        </div>

                    </div>
                </li>
            ))}
        </ul>
    )
}

export default ConversationList;
