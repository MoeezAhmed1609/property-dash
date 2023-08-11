function UpdatePropertyAction(user) {
    console.log(user);
    return {

        type: 'SET_UPDATED_PROPERTY',

        data: user

    }

}

export {
    UpdatePropertyAction
}