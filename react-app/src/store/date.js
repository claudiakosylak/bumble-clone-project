const GET_DATES = "date/GET_DATES";
const GET_DATE = "date/GET_DATE";
const GET_DATE_REQUESTS = "date/GET_DATE_REQUESTS";

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

export const createDateRequestThunk = (matchId, suggested_date) => async dispatch => {
    const res = await fetch(`/api/matches/${matchId}/date-requests`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
            suggested_date
        })
    })
    console.log("RES: ", res)
    if (res.ok) {
        const newRequest = await res.json()
        return newRequest;
    }
}

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
