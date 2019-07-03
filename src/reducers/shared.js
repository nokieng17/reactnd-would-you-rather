import { RECEIVED_COMPLETE } from './../actions/shared'

export default function shared(state = { loading: true }, action) {
    switch (action.type) {
        case RECEIVED_COMPLETE:
            return {
                loading: false
            }
        default:
            return state;
    }
}