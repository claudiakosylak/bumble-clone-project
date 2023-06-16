import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BrowseItem.css";
import { checkMatchRequestThunk, createMatchRequestThunk, createMatchThunk, rejectMatchThunk } from "../../store/match";
import { getUnrejectedRequestsThunk } from "../../store/match_request";

export const ageChanger = (dateOfBirth) => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear()
    let compareDate = new Date(dateOfBirth)
    const birthYear = compareDate.getFullYear()
    let compareAge = currentYear - birthYear;
    compareDate.setFullYear(currentYear)
    if (compareDate > currentDate) {
        return compareAge - 1;
    } else {
        return compareAge;
    }
}

function BrowseItem({ browseUsers }) {
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const unrejectedRequestsObj = useSelector(state => state.matchRequest.unrejectedRequests)
    const requestArray = Object.values(unrejectedRequestsObj)
    const requestUsers = []
    for (let request of requestArray) {
        requestUsers.push(request.requesting_user_id)
    }

    useEffect(() => {
        dispatch(getUnrejectedRequestsThunk(currentUser.id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getUnrejectedRequestsThunk(currentUser.id))
    }, [browseUsers[0]])

    const handleReject = async (id1, id2) => {
        await dispatch(rejectMatchThunk(id1, id2))
    }

    const handleSwipeRight = async (id1, id2) => {
        const requestExists = requestUsers.includes(id1)
        if (requestExists) {
            dispatch(createMatchThunk(id1, id2))
            // dispatch(getUnrejectedRequestsThunk(currentUser.id))
        } else {
            dispatch(createMatchRequestThunk(id2, id1))
        }
    }

    return (
        <>
            {browseUsers.length > 0 && (
                <div className="browse-item-outer-wrapper">
                    <div className="browse-item-wrapper">
                        <div className="main-browse-picture">
                            <img src={browseUsers[0].picture_1}></img>
                        </div>
                        <div className="browse-item-right-side">
                            <p className="name-and-age">{browseUsers[0].first_name}, {ageChanger(browseUsers[0].date_of_birth)}</p>
                            <p id="main-about">{browseUsers[0].about}</p>
                            <div className="flake-explanation-container">

                            <p className="main-flake-score"><i class="fa-regular fa-snowflake"></i>{browseUsers[0].flake_score}%</p>
                            {browseUsers[0].flake_score === 100 && (
                                <p id="flake-explanation">Wow, you've found a NoFlake!!! {browseUsers[0].first_name} hasn't flaked or ghosted on anyone.</p>
                            )}
                            {(browseUsers[0].flake_score < 100 && browseUsers[0].flake_score > 80)&& (
                                <p id="flake-explanation">{browseUsers[0].first_name} is mostly reliable. We can't all be a perfect NoFlake!</p>
                            )}
                            {(browseUsers[0].flake_score < 80 && browseUsers[0].flake_score > 50) && (
                                <p id="flake-explanation">{browseUsers[0].first_name} is somewhat reliable, but may be more likely than average to flake.</p>
                            )}
                            {(browseUsers[0].flake_score < 50) && (
                                <p id="flake-explanation">{browseUsers[0].first_name} is pretty unreliable - might be pretty hard to catch this YesFlake...</p>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className="swipe-button-container">
                        <button className="swipe-button swipe-nay" onClick={() => handleReject(browseUsers[0].id, currentUser.id)}><i class="fa-solid fa-xmark"></i></button>
                        <button className="swipe-button swipe-yay" onClick={() => handleSwipeRight(browseUsers[0].id, currentUser.id)}><i class="fa-solid fa-check"></i></button>

                    </div>
                </div>
            )}
            {browseUsers.length === 0 && (
                <div className="no-browse-wrapper">
                    <h3>You've run out of potential matches to browse. Check back soon as new users sign up!</h3>
                </div>
            )}
        </>
    )
}

export default BrowseItem;
