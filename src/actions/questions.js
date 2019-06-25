import { showLoading, hideLoading } from 'react-redux-loading'
import * as API from '../_DATA'

export const RECEIVE_QUESTIIONS = "RECEIVE_QUESTIIONS"
export const ADD_QUESTION = "ADD_QUESTION"
export const VOTE_QUESTION = "VOTE_QUESTION"


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIIONS,
        questions
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

function voteQuestion({ qid, answer, authedUser }) {
    return {
        type: VOTE_QUESTION,
        qid,
        answer,
        authedUser
    }
}

export function handleAddQuestion({ optionOneText, optionTwoText }) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading())

        API._saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser.id
        })
            .then(question => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}

export function handleVoteQuestion({ qid, answer }) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        API._saveQuestionAnswer({
            authedUser: authedUser,
            qid,
            answer
        })
            .then(() => dispatch(voteQuestion({ qid, answer })))
            .then(() => dispatch(hideLoading()))
    }
}