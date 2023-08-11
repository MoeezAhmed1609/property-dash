function Dashboard(user) {
    console.log(user);
    return {

        type: 'SET_DASHBOARD_USERS',

        data: user

    }

}

export {
    Dashboard
}