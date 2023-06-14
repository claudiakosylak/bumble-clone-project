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
    console.log("THE Array: ", requestArray)
    const requestUsers = []
    for (let request of requestArray) {
        requestUsers.push(request.requesting_user_id)
    }

    console.log("REQUEST USERS, ", requestUsers)

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
                <div className="browse-item-wrapper">
                    <div className="main-browse-picture">
                        <img src={browseUsers[0].picture_1}></img>
                    </div>
                    <div className="browse-item-right-side">
                        <p>{browseUsers[0].first_name}, {ageChanger(browseUsers[0].date_of_birth)}</p>
                        <button onClick={() => handleReject(browseUsers[0].id, currentUser.id)}>Reject</button>
                        <button onClick={() => handleSwipeRight(browseUsers[0].id, currentUser.id)}>Swipe Right</button>
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
