import { RECEIVE_USERS } from './../actions/users'


export default function users(uState = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...uState,
                ...action.users
            }
        default:
            return uState
    }
}