const GET_MATCHES = "session/GET_MATCHES";

const getMatches = (matches) => ({
    type: GET_MATCHES,
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

const initialState = {currentMatches: {}, potentialMatches: {}, currentMatch: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MATCHES:
            const matchesState = {...state, currentMatches: {}, potentialMatches: {...state.potentialMatches}, currentMatch: {...state.currentMatch}}
            matchesState.currentMatches = action.matches;
            return matchesState;
        default:
            return state;

    }
}
