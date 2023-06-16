const GET_DATES = "date/GET_DATES";
const GET_DATE = "date/GET_DATE";
const GET_DATE_REQUESTS = "date/GET_DATE_REQUESTS";

//date related actions here

const getDates = dates => ({
    type: GET_DATES,
    dates
})

const getDate = date => ({
    type: GET_DATE,
    date
})

const getDateRequests = requests => ({
    type: GET_DATE_REQUESTS,
    requests
})

//date related thunks here

//get all of a user's date requests (both made by user and requested of user)

export const getDateRequestsThunk = () => async dispatch => {
    const res = await fetch("/api/dates/date-requests")
    if (res.ok) {
        const requests = await res.json()
        dispatch(getDateRequests(requests))
        return requests
    } else {
        return ["An error occurred. Please try again."]
    }
}

// get all of a user's scheduled dates

export const getDatesThunk = () => async dispatch => {
    const res = await fetch("/api/dates")
    console.log("HIT THE THUNK: ")
    if (res.ok) {
        const dates = await res.json()
        dispatch(getDates(dates))
        return dates;
    } else {
        return ["An error occurred. Please try again."]
    }
}

//makes a new date request by the current user

export const createDateRequestThunk = (matchId, suggested_date) => async dispatch => {
    const res = await fetch(`/api/matches/${matchId}/date-requests`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
            suggested_date
        })
    })
    if (res.ok) {
        const newRequest = await res.json()
        return newRequest;
    }
}

// creates a new date based off of an accepted date request and deletes the associated date request

export const createNewDateThunk = (dateRequestId) => async dispatch => {
    const res = await fetch(`/api/dates/${dateRequestId}`, {
        method: "POST"
    })
    if (res.ok) {
        const newDate = await res.json();
        dispatch(getDate(newDate));
        return newDate;
    } else {
        return ["An error occurred. Please try again."]
    }
}

// get details of a single date by match id

export const getDateThunk = (matchId) => async dispatch => {
    const res = await fetch(`/api/dates/${matchId}`)
    if (res.ok) {
        const date = await res.json()
        dispatch(getDate(date))
        return date;
    } else {
        return ["An error occurred. Please try again."]
    }
}

// date reducer with inital state here

const initialState = {allDates: {}, currentDate: {}, dateRequests: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATES:
            const datesState = {...state, allDates: {}, currentDate: {...state.currentDate}, dateRequests: {...state.dateRequests}}
            datesState.allDates = action.dates;
            return datesState;
        case GET_DATE:
            const dateState = {...state, allDates: {...state.allDates}, currentDate: {}, dateRequests: {...state.dateRequests}}
            dateState.currentDate = action.date;
            return dateState;
        case GET_DATE_REQUESTS:
            const requestState = {...state, allDates: {...state.allDates}, currentDate: {...state.currentDate}, dateRequests: {}}
            requestState.dateRequests = action.requests
            return requestState;
        default:
            return state;
    }
}
