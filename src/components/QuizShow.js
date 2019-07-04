import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import QuizTemplate from './QuizTemplate';
import Typography from '@material-ui/core/Typography'

class QuizShow extends Component {

    render() {
        const { quiz, author } = this.props
        if (null == quiz || null == author) {
            return (
                <p color="secondary">Sorry, the question does not exists</p>
            )
        }
        return (
            <QuizTemplate author={author}>
                <div>
                    <div style={{ textAlign: "left", margin: "0px 10px 0px 10px" }}>
                        <Typography variant="h6">Would you rather</Typography>
                        <p>{quiz.optionOne.text} Or {quiz.optionTwo.text}</p>
                        <Link to={`/quiz/${quiz.id}`}>
                            <Button variant="outlined" fullWidth color="primary">View Poll</Button>
                        </Link>
                    </div>
                    <br />
                </div>
            </QuizTemplate>
        )
    }
}
//mapStateToProps, mapDispatchToProps
function mapStateToProps({ questions, users }, { id }) {
    const quiz = questions[id]
    return {
        quiz,
        author: users[quiz.author]
    }
}
export default connect(mapStateToProps)(withRouter(QuizShow))

