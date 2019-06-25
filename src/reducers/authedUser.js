import { SET_AUTHED_USER } from './../actions/authedUser'

export default function authedUser(authState = {}, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return {
                id: action.id
            }
        default:
            return authState
    }
}