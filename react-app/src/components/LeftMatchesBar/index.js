import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMatchThunk, getMatch, getMatchesThunk, potentialMatchesThunk } from "../../store/match";
import Navigation from "../Navigation";
import "./LeftMatchesBar.css";
import { NavLink, useHistory } from "react-router-dom";
import ConversationList from "../ConversationList";

function LeftMatchesBar({isLoaded}) {
    const matchesObj = useSelector(state => state.match.currentMatches)
    const currentMatch = useSelector(state => state.match.currentMatch)
    const matches = Object.values(matchesObj)
    const dispatch = useDispatch();
    const history = useHistory();
    const messagedMatches = []
    const unMessagedMatches = []
    for (let match of matches) {
        if (match.last_message) {
            messagedMatches.push(match)
        } else {
            unMessagedMatches.push(match)
        }
    }

    useEffect(() => {
        dispatch(getMatchesThunk())
    }, [dispatch])

    const handlePicClick = async (match) => {
        await dispatch(getMatch(match))
        history.push("/app/connections")
    }

    return (
        <div className="left-matches-wrapper">
            <Navigation isLoaded={isLoaded}/>
            <p className="left-headers">Unmessaged Matches ({unMessagedMatches.length})</p>
        <ul className="unmessaged-matches-wrapper">
            <div className="inner-wrapper">
            {unMessagedMatches.length > 0 ? unMessagedMatches.map(match => (
                <li key={match.id} className="scroll-match-item"><img onClick={() => handlePicClick(match)} className="mini-match-icons" src={match.picture_1}></img></li>
            )) : (
                <p>You don't have any matches yet!</p>
            )}

            </div>
        </ul>
        <div>
            {(currentMatch.id && currentMatch.last_message) && (
                <NavLink to="/app">Get back to swiping</NavLink>
            )}
        </div>
        <p className="left-headers">Conversations</p>
        {messagedMatches.length > 0 ? (
            <ConversationList messagedMatches={messagedMatches}/>

        ): (
            <p>You haven't started any conversations yet</p>
        )}
    </div>
    )
}

export default LeftMatchesBar;
