import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LeftMatchesBar from "../LeftMatchesBar";
import "./MainIndex.css";
import PotentialMatchBrowse from "../PotentialMatchBrowse";


function MainIndex({isLoaded}) {
    const user = useSelector(state => state.session.user)

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
