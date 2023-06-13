import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


function SplashIndex() {
    const user = useSelector(state => state.session.user)

    if (user) {
        return <Redirect to="/app" />
    }

    return (
        <div>Hi from the splash page</div>
    )
}

export default SplashIndex;
