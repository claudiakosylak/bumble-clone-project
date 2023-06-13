import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


function MainIndex() {
    const user = useSelector(state => state.session.user)

    if (!user) {
        return <Redirect to="/" />
    }

    return (
        <div>Hi from the main page</div>
    )
}

export default MainIndex;
