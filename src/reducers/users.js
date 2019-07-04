import { RECEIVE_USERS } from './../actions/users'
import { VOTE_QUESTION } from '../actions/questions';


export default function users(uState = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...uState,
                ...action.users
            }
        case VOTE_QUESTION:
            const { qid, answer, authedUser } = action
            return {
                ...uState,
                [authedUser]: {
                    ...uState[authedUser],
                    answers: {
                        ...uState[authedUser].answers,
                        [qid]: answer
                    }
                },
            }
        default:
            return uState
    }
}