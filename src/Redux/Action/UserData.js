function USERDATA(user) {
    console.log(user);
    return {

        type: 'SET_USER_DATA',

        data: user

    }

}

export {
    USERDATA
}