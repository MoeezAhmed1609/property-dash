function SingleProperty(user) {
    console.log(user);
    return {

        type: 'SET_SINGLE_PROPERTY',

        data: user

    }

}

export {
    SingleProperty
}