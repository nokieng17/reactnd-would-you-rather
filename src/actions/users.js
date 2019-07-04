export const RECEIVE_USERS = "RECEIVE_USERS"
export const USER_LOGOUT = 'USER_LOGOUT'


export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}