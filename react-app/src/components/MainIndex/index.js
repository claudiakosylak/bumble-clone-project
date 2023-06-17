import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LeftMatchesBar from "../LeftMatchesBar";
import "./MainIndex.css";
import PotentialMatchBrowse from "../PotentialMatchBrowse";
import { clearCurrentMatch } from "../../store/match";


function MainIndex({isLoaded}) {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCurrentMatch())
    }, [dispatch])
    if (!user) {
        return <Redirect to="/" />
    }

    return (
        <div className="main-index-wrapper">
            <LeftMatchesBar isLoaded={isLoaded}/>
            <PotentialMatchBrowse />
        </div>
    )
}

export default MainIndex;
