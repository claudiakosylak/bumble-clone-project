import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMatchesThunk } from "../../store/match";
import LeftMatchesBar from "../LeftMatchesBar";


function MainIndex() {
    const user = useSelector(state => state.session.user)

    if (!user) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <LeftMatchesBar />
        </div>
    )
}

export default MainIndex;
