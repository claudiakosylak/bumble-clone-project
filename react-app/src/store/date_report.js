GET_DATE_REPORTS = "date_reports/GET_DATE_REPORTS";


const getDateReports = reports => ({
    type: GET_DATE_REPORTS,
    reports
})

export const getDateReportsThunk = (matchId, userId, report) => async dispatch => {
    const res = await fetch(`/api/date_reports`)
    if (res.ok) {
        const reports = await res.json()
        dispatch(getDateReports(reports))
        return reports
    } else {
        return ["An error occurred. Please try again."];
    }
}


const initialState = {dateReports: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATE_REPORTS:
            const newState = {...state, dateReports: {}}
            newState.dateReports = action.reports
            return newState;
        default:
            return state;
    }
}
