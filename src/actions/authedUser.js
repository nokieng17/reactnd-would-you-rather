export const SET_AUTHED_USER = "SET_AUTHED_USER"
export const SET_AUTHED_USER_LOGOUT = "SET_AUTHED_USER_LOGOUT"

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id
    }
}

export function handleLogout() {
    return {
        type: SET_AUTHED_USER_LOGOUT
    }
}