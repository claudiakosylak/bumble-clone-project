const GET_DATES = "date/GET_DATES";
const GET_DATE = "date/GET_DATE"

const getDates = dates => ({
    type: GET_DATES,
    dates
})

const getDate = date => ({
    type: GET_DATE,
    date
})


export const getDatesThunk = () => async dispatch => {
    const res = await fetch("/api/dates")
    if (res.ok) {
        const dates = await res.json()
        dispatch(getDates(dates))
        return dates;
    } else {
        return ["An error occurred. Please try again."]
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


const initialState = {allDates: {}, currentDate: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATES:
            const datesState = {...state, allDates: {}, currentDate: {...state.currentDate}}
            datesState.allDates = action.dates;
            return datesState;
        case GET_DATE:
            const dateState = {...state, allDates: {...state.allDates}, currentDate: {}}
            dateState.currentDate = action.date;
            return dateState;
        default:
            return state;
    }
}
