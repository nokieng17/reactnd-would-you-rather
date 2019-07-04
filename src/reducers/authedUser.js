import { SET_AUTHED_USER, SET_AUTHED_USER_LOGOUT } from './../actions/authedUser'

export default function authedUser(state = '', action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.id;
        case SET_AUTHED_USER_LOGOUT:
            return '';
        default:
            return state
    }
}