import React from 'react'
import { connect } from 'react-redux'
import QuizTemplate from './QuizTemplate';
import QuizResultItem from './QuizResultItem';
import { Redirect } from 'react-router-dom'

const options = [
    "optionOne",
    "optionTwo"
]

function QuizResult(props) {
    const { author, quiz = null } = props
    const total = quiz.optionOne.votes.length + quiz.optionTwo.votes.length

    if (null == quiz) {
        return (
            <p>The question does not exist</p>
        )
    }
    if (!author.answers[quiz.id]) {
        return (
            <Redirect to={`/quiz/${quiz.id}`} />
        )
    }
    return (
        <QuizTemplate author={author}>
            <div style={{ textAlign: "left", margin: "0px 10px 0px 10px" }}>
                <h3>Result:</h3>
                {
                    options.map(option => (
                        <QuizResultItem
                            isMyVote={author.answers[quiz.id] === option}
                            key={option}
                            text={quiz[option].text}
                            score={quiz[option].votes.length}
                            total={total} />
                    ))
                }
            </div>
        </QuizTemplate>
    )
}
//mapStateToProps, mapDispatchToProps
const mapStateToProps = ({ authedUser, users, questions }, props) => {
    const { id } = props.match.params
    const author = users[authedUser]
    const quiz = questions[id]
    return {
        author,
        quiz
    }
}
export default connect(mapStateToProps)(QuizResult)