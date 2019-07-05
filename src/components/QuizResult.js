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
    const { author, quiz, authedUser } = props
    const total = quiz.optionOne.votes.length + quiz.optionTwo.votes.length

    if (!quiz) {
        return (
            <p>The question does not exist</p>
        )
    }
    if (!authedUser.answers[quiz.id]) {
        return (
            <Redirect to={`/quiz/${quiz.id}`} />
        )
    }
    author.name = "Asked by " + author.name
    return (
        <QuizTemplate author={author}>
            <div style={{ textAlign: "left", margin: "0px 10px 0px 10px" }}>
                <h3>Result:</h3>
                {
                    options.map(option => (
                        <QuizResultItem
                            isMyVote={authedUser.answers[quiz.id] === option}
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
    const quiz = questions[id]
    const author = quiz ? users[quiz.author] : undefined
    return {
        author,
        quiz,
        authedUser: users[authedUser]
    }
}
export default connect(mapStateToProps)(QuizResult)