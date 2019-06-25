import * as API from './../_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'


export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        Promise.all([API._getUsers, API._getQuestions])
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}