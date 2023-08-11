export default function UpdatePropertyReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_UPDATED_PROPERTY': return { ...state, property: action.data }
        default: return state

    }

}

