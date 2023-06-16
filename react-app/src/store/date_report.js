const GET_DATE_REPORTS = "date_reports/GET_DATE_REPORTS";
const GET_DATE_REPORT = "date_reports/GET_DATE_REPORT";
const GET_MADE_DATE_REPORTS = "date_reports/GET_MADE_DATE_REPORTS";

//Actions related to date reports here


const getDateReports = reports => ({
    type: GET_DATE_REPORTS,
    reports
})

const getDateReport = report => ({
    type: GET_DATE_REPORT,
    report
})

const getMadeDateReports = reports => ({
    type: GET_MADE_DATE_REPORTS,
    reports
})

//Thunks related to date reports here

//Get all date reports made about a user

export const getDateReportsThunk = () => async dispatch => {
    const res = await fetch(`/api/date_reports`)
    if (res.ok) {
        const reports = await res.json()
        dispatch(getDateReports(reports))
        return reports
    } else {
        return ["An error occurred. Please try again."];
    }
}

// Create a date report about another user

export const createDateReportThunk = (reportedUserId, report) => async dispatch => {
    const res = await fetch(`/api/date_reports/${reportedUserId}`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(report)
    })
    if (res.ok) {
        const newReport = await res.json();
        dispatch(getDateReport(newReport));
        return newReport;
    } else {
        return ["An error occurred. Please try again."]
    }
}

// Get all date reports the current user has made

export const getMadeDateReportsThunk = () => async dispatch => {
    const res = await fetch("/api/date_reports/made")
    if (res.ok) {
        const reports = await res.json();
        dispatch(getMadeDateReports(reports))
        return reports;
    } else {
        return ["An error occurred. Please try again."]
    }
}

// Create a date report about ghosting where no date was scheduled

export const makeGhostReportThunk = userId => async dispatch => {
    const res = await fetch(`/api/date_reports/ghosts/${userId}`, {method: "POST"})
    if (res.ok) {
        const report = await res.json();
        dispatch(getDateReport(report))
        return report;
    } else {
        return ["An error occurred. Please try again."]
    }
}

//Date reports reducer here with initial state

const initialState = {dateReports: {}, currentDateReport: {}, madeDateReports: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATE_REPORTS:
            const newState = {...state, dateReports: {}, currentDateReport: {...state.currentDateReport}, madeDateReports: {...state.madeDateReports}}
            newState.dateReports = action.reports
            return newState;
        case GET_DATE_REPORT:
            const reportState = {...state, dateReports: {...state.dateReports}, currentDateReport: {}, madeDateReports: {...state.madeDateReports}}
            reportState.currentDateReport = action.report;
            return reportState;
        case GET_MADE_DATE_REPORTS:
            const madeState = {...state, dateReports: {...state.dateReports}, currentDateReport: {...state.currentDateReport}, madeDateReports: {}}
            madeState.madeDateReports = action.reports;
            return madeState;
        default:
            return state;
    }
}
