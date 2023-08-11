export default function SinglePropertyReducer(state = {}, action) {

    //console.log('user inside reducer', action.data)

    switch (action.type) {

        case 'SET_SINGLE_PROPERTY': return { ...state, property: action.data }

   
        default: return state

    }

}

