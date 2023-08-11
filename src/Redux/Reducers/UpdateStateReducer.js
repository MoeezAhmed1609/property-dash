export default function UpdateStateReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_UPDATE_STATE': return { ...state, property: action.data }
        default: return state

    }

}

