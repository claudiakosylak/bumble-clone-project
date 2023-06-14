import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConversationViewIndex.css";
import LeftMatchesBar from "../LeftMatchesBar";
import RightProfileBar from "../RightProfileBar";

function ConversationViewIndex({ isLoaded }) {
    return (
        <div className="conversation-view-index-wrapper">
            <LeftMatchesBar isLoaded={isLoaded} />
            <div className="conversation-view-right-side">
                <div>
                    <h3>Welcome to conversation view</h3>

                </div>
                <RightProfileBar />
            </div>
        </div>
    )
}


export default ConversationViewIndex;
