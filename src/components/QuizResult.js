import React from 'react'
import QuizTemplate from './QuizTemplate';
import QuizResultItem from './QuizResultItem';

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
export default QuizResult