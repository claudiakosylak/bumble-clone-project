import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PotentialMatchBrowse.css";
import { potentialMatchesThunk } from "../../store/match";


function PotentialMatchBrowse() {
    const potentialMatchesObj = useSelector(state => state.match.potentialMatches)
    const potentialMatchesArr = Object.values(potentialMatchesObj)
    const dispatch = useDispatch();

    console.log("POTENTIAL MATCHES OBJ: ", potentialMatchesObj)

    useEffect(() => {
        dispatch(potentialMatchesThunk())
    }, [dispatch])

    return (
        <div className="potential-match-browse-wrapper">
            <div className="browse-header">
                <h1>noFlake</h1>
            </div>
            <div className="browse-box-wrapper">
                <div className="main-browse-box">
                    {potentialMatchesArr.length > 0 && (
                        <p>{potentialMatchesArr[0].first_name}</p>

                    )}
                </div>
            </div>

        </div>
    )
}

export default PotentialMatchBrowse;
