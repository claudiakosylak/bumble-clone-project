import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConversationViewIndex.css";
import LeftMatchesBar from "../LeftMatchesBar";
import RightProfileBar from "../RightProfileBar";
import MatchMessages from "../MatchMessages";
import { Redirect } from "react-router-dom";
import ConversationViewHeader from "../ConversationViewHeader";

function ConversationViewIndex({ isLoaded }) {
    const user = useSelector(state => state.session.user)

    if (!user) {
        return <Redirect to="/" />
    }

    return (
        <div className="conversation-view-index-wrapper">
            <LeftMatchesBar isLoaded={isLoaded} />
            <div className="conversation-view-right-side">
                <div className="messages-container">

                    <ConversationViewHeader />
                    <MatchMessages />
                </div>


                <RightProfileBar />
            </div>
        </div>
    )
}


export default ConversationViewIndex;
