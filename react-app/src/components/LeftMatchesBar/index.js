import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchesThunk } from "../../store/match";
import Navigation from "../Navigation";
import "./LeftMatchesBar.css";

function LeftMatchesBar({isLoaded}) {
    const matchesObj = useSelector(state => state.match.currentMatches)
    const matches = Object.values(matchesObj)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMatchesThunk())
    }, [dispatch])

    return (
        <div className="left-matches-wrapper">
            <Navigation isLoaded={isLoaded}/>
        <ul>
            {matches.map(match => (
                <li key={match.id}>{match.first_name}</li>
            ))}
        </ul>
    </div>
    )
}

export default LeftMatchesBar;
