export default function UserDataReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_USER_DATA': return { ...state, property: action.data }
        default: return state
    }
}

