const GET_ALL_MESSAGES = "messages/GET_ALL_MESSAGES"

const getAllMessagesAction = (messages) => ({
    type: GET_ALL_MESSAGES,
    messages
})

export const getMatchMessagesThunk = matchId => async dispatch => {
    const res = await fetch(`/api/matches/${matchId}/messages`)
    if (res.ok) {
        const messages = await res.json();
        dispatch(getAllMessagesAction(messages))
        return messages;
    } else {
        return ["There was an error."]
    }
}


const initialState = {allMatchMessages: {}};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_MESSAGES:
            const newState = {...state, allMatchMessages: {}}
            newState.allMatchMessages = action.messages;
            return newState;
        default:
            return state;
    }
}
