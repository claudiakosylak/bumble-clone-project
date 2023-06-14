import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMatchesThunk } from "../../store/match";
import LeftMatchesBar from "../LeftMatchesBar";
import "./MainIndex.css";


function MainIndex({isLoaded}) {
    const user = useSelector(state => state.session.user)

    if (!user) {
        return <Redirect to="/" />
    }

    return (
        <div className="main-index-wrapper">
            <LeftMatchesBar isLoaded={isLoaded}/>
        </div>
    )
}

export default MainIndex;
