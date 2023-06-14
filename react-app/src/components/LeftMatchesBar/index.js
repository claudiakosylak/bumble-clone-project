import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMatchThunk, getMatchesThunk, potentialMatchesThunk } from "../../store/match";
import Navigation from "../Navigation";
import "./LeftMatchesBar.css";

function LeftMatchesBar({isLoaded}) {
    const matchesObj = useSelector(state => state.match.currentMatches)
    const matches = Object.values(matchesObj)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMatchesThunk())
    }, [dispatch])

    const handleUnmatch = async (matchId) => {
        await dispatch(deleteMatchThunk(matchId))
        await dispatch(potentialMatchesThunk())
    }

    return (
        <div className="left-matches-wrapper">
            <Navigation isLoaded={isLoaded}/>
        <ul>
            {matches.map(match => (
                <li key={match.id}>{match.first_name}<button onClick={() => handleUnmatch(match.matchId)}>Unmatch</button></li>
            ))}
        </ul>
    </div>
    )
}

export default LeftMatchesBar;
