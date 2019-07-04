import { RECEIVE_QUESTIIONS, ADD_QUESTION, VOTE_QUESTION } from './../actions/questions'
import { statement } from '@babel/template';

export default function questions(qState = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIIONS:
            return {
                ...qState,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...qState,
                [action.question.id]: action.question
            }
        case VOTE_QUESTION:
            const { qid, answer, authedUser } = action
            //update user and question
            return {
                ...qState,
                [qid]: {
                    ...qState[qid],
                    [answer]: {
                        ...qState[qid][answer],
                        votes: qState[qid][answer].votes.concat([authedUser])
                    }
                }
            }
        default:
            return qState
    }
}
