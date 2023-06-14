const GET_MATCHES = "match/GET_MATCHES";
const POTENTIAL_MATCHES = "match/POTENTIAL_MATCHES";
const GET_MATCH = "match/GET_MATCH";
const DELETE_MATCH = "match/DELETE_MATCH";

const getMatches = (matches) => ({
    type: GET_MATCHES,
    matches
})

const getMatch = match => ({
    type: GET_MATCH,
    match
})

const potentialMatches = matches => ({
    type: POTENTIAL_MATCHES,
    matches
})

const deleteMatch = userId => ({
    type: DELETE_MATCH,
    userId
})


export const getMatchesThunk = () => async dispatch => {
    const res = await fetch("/api/matches")
    if (res.ok) {
        const matches = await res.json();
        dispatch(getMatches(matches))
        return matches;
    } else {
        return ["An error occurred. Please try again."]
    }
}

export const potentialMatchesThunk = () => async dispatch => {
    const res = await fetch("/api/matches/potential-matches")
    if (res.ok) {
        const matches = await res.json();
        dispatch(potentialMatches(matches))
        return matches;
    } else {
        return ["An error occurred. Please try again."]
    }
}

export const rejectMatchThunk = (id1, id2) => async dispatch => {
    const res = await fetch(`/api/requested_matches/${id1}/${id2}`, {method: "PUT"})
    if (res.ok) {
        const res2 = await fetch("/api/matches/potential-matches")
        if (res2.ok) {
            const matches = await res2.json();
            dispatch(potentialMatches(matches))
            return matches;
        } else {
            return ["An error occurred. Please try again."]
        }
    } else {
        return ["An error occurred. Please try again."]
    }
}

export const createMatchThunk = (id1, id2) => async dispatch => {
    const res = await fetch(`/api/matches/${id1}/${id2}`, {method: "POST"})
    if (res.ok) {
        const match = await res.json()
        dispatch(getMatch(match))
        const res2 = await fetch("/api/matches")
        const matches = await res2.json()
        dispatch(getMatches(matches))
        const res3 = await fetch("/api/matches/potential-matches")
        const potential = await res3.json()
        dispatch(potentialMatches(potential))
        return match;
    } else {
        return ["An error occurred. Please try again."]
    }
}

export const createMatchRequestThunk = (id1, id2) => async dispatch => {
    const res = await fetch(`/api/requested_matches/${id1}/${id2}`, {method: "POST"})
    if (res.ok) {
        const res2 = await fetch("/api/matches/potential-matches")
        const matches = await res2.json()
        dispatch(potentialMatches(matches))
        return matches;
    } else {
        return ["An error occurred. Please try again."]
    }
}

export const deleteMatchThunk = matchId => async dispatch => {
    const res = await fetch(`/api/matches/${matchId}`, {method: "DELETE"})
    if (res.ok) {
        const data = await res.json();
        dispatch(deleteMatch(data.userId))
    }
}

const initialState = {currentMatches: {}, potentialMatches: {}, currentMatch: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MATCHES:
            const matchesState = {...state, currentMatches: {}, potentialMatches: {...state.potentialMatches}, currentMatch: {...state.currentMatch}}
            matchesState.currentMatches = action.matches;
            return matchesState;
        case POTENTIAL_MATCHES:
            const potentialState = {...state, currentMatches: {...state.currentMatches}, potentialMatches: {}, currentMatch: {...state.currentMatch}}
            potentialState.potentialMatches = action.matches;
            return potentialState;
        case GET_MATCH:
            const matchState = {...state, currentMatches: {...state.currentMatches}, potentialMatches: {...state.potentialMatches}, currentMatch: {}}
            matchState.currentMatch = action.match
            return matchState;
        case DELETE_MATCH:
            const deleteState = {...state, currentMatches: {...state.currentMatches}, potentialMatches: {...state.potentialMatches}, currentMatch: {}}
            delete deleteState.currentMatches[action.userId]
            return deleteState;
        default:
            return state;

    }
}
