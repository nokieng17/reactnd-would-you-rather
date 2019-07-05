import { RECEIVE_USERS, ADD_USER } from './../actions/users'
import { VOTE_QUESTION, ADD_QUESTION } from '../actions/questions';


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
        case ADD_USER:
            const { id, name, avatarUrl, password } = action
            return {
                ...uState,
                [id]: {
                    id,
                    name,
                    avatarUrl,
                    answers: {},
                    password
                }
            }
        case ADD_QUESTION:
            const { author, questionId } = action.question
            return {
                ...uState,
                [author]: {
                    ...uState[author],
                    questions: uState[author].questions.concat([questionId])
                }
            }
        default:
            return uState
    }
}