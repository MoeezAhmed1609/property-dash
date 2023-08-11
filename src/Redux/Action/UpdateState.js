function UpdateState(user) {
    console.log(user);
    return {

        type: 'SET_UPDATE_STATE',

        data: user

    }

}

export {
    UpdateState
}