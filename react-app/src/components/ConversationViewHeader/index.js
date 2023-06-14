import React from "react";
import { useSelector } from "react-redux";
import "./ConversationViewHeader.css";

function ConversationViewHeader() {
    const currentMatch = useSelector(state => state.match.currentMatch)

    return (
        <div className='conversation-view-header-wrapper'>
            <img src={currentMatch.picture_1}></img>
            <h2>{currentMatch.first_name}</h2>
        </div>
    )
}

export default ConversationViewHeader;
