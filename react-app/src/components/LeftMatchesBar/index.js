import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchesThunk } from "../../store/match";

function LeftMatchesBar() {
    const matchesObj = useSelector(state => state.match.currentMatches)
    const matches = Object.values(matchesObj)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMatchesThunk())
    }, [dispatch])

    return (
        <div>
        <ul>
            {matches.map(match => (
                <li key={match.id}>{match.first_name}</li>
            ))}
        </ul>
    </div>
    )
}

export default LeftMatchesBar;
