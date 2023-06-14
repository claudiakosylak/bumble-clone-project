import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMatchesThunk } from "../../store/match";


function MainIndex() {
    const user = useSelector(state => state.session.user)
    const matchesObj = useSelector(state => state.match.currentMatches)
    const matches = Object.values(matchesObj)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMatchesThunk())
    }, [dispatch])

    if (!user) {
        return <Redirect to="/" />
    }

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

export default MainIndex;
