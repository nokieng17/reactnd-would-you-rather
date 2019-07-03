import * as API from './../_DATA'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'

export const RECEIVED_COMPLETE = "RECEIVED_COMPLETE";


export function receivedComplete() {
    return {
        type: RECEIVED_COMPLETE
    }
}

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        Promise.all([API._getUsers(), API._getQuestions()])
            .then(([users, questions]) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(receivedComplete())
                dispatch(hideLoading())
            })
    }
}