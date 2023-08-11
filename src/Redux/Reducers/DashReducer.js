export default function DashReducer(state = {}, action) {

    //console.log('user inside reducer', action.data)

    switch (action.type) {

        case 'SET_DASHBOARD_USERS': return { ...state, login: action.data }

   
        default: return state

    }

}

