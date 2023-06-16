import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMatchThunk, getMatch, getMatchesThunk, potentialMatchesThunk } from "../../store/match";
import { NavLink, useHistory } from "react-router-dom";

function ConversationList({ messagedMatches }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleUnmatch = async (matchId) => {
        await dispatch(deleteMatchThunk(matchId))
        await dispatch(potentialMatchesThunk())
    }

    const handlePicClick = async (match) => {
        await dispatch(getMatch(match))
        history.push("/app/connections")
    }
    return (
        <div>
            {messagedMatches.map(match => (
                <li key={match.id}><img onClick={() => handlePicClick(match)} className="mini-match-icons" src={match.picture_1}></img><button onClick={() => handleUnmatch(match.matchId)}>Unmatch</button></li>
            ))}
        </div>
    )
}

export default ConversationList;
