import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMatchThunk, getMatch, getMatchesThunk, potentialMatchesThunk } from "../../store/match";
import Navigation from "../Navigation";
import "./LeftMatchesBar.css";
import { NavLink, useHistory } from "react-router-dom";

function LeftMatchesBar({isLoaded}) {
    const matchesObj = useSelector(state => state.match.currentMatches)
    const matches = Object.values(matchesObj)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getMatchesThunk())
    }, [dispatch])

    const handleUnmatch = async (matchId) => {
        await dispatch(deleteMatchThunk(matchId))
        await dispatch(potentialMatchesThunk())
    }

    const handlePicClick = async (match) => {
        await dispatch(getMatch(match))
        history.push("/app/connections")
    }

    return (
        <div className="left-matches-wrapper">
            <Navigation isLoaded={isLoaded}/>
            <p className="left-headers">Unmessaged Matches ({matches.length})</p>
        <ul className="unmessaged-matches-wrapper">
            <div className="inner-wrapper">
            {matches.map(match => (
                <li key={match.id} className="scroll-match-item"><img onClick={() => handlePicClick(match)} className="mini-match-icons" src={match.picture_1}></img><button onClick={() => handleUnmatch(match.matchId)}>Unmatch</button></li>
            ))}

            </div>
        </ul>
        <p className="left-headers">Conversations</p>
    </div>
    )
}

export default LeftMatchesBar;
