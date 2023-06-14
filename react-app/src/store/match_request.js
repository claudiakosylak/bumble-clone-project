const GET_REQUESTS = "match_requests/GET_REQUESTS";

const getRequests = (requests) => ({
    type: GET_REQUESTS,
    requests
})


export const getUnrejectedRequestsThunk = userId => async dispatch => {
    const res = await fetch(`/api/requested_matches/${userId}`)
    if (res.ok) {
        const requests = await res.json()
        dispatch(getRequests(requests))
        return requests;
    } else {
        return ["An error occurred. Please try again."]
    }
}

const initialState = {unrejectedRequests: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_REQUESTS:
            const requestState = {...state, unrejectedRequests: {}}
            requestState.unrejectedRequests = action.requests
            return requestState;
        default:
            return state;

    }
}
