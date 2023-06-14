const GET_MATCHES = "match/GET_MATCHES";
const POTENTIAL_MATCHES = "match/POTENTIAL_MATCHES"

const getMatches = (matches) => ({
    type: GET_MATCHES,
    matches
})

const potentialMatches = matches => ({
    type: POTENTIAL_MATCHES,
    matches
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
        default:
            return state;

    }
}
