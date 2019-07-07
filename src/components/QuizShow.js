import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import QuizTemplate from './QuizTemplate';
import Typography from '@material-ui/core/Typography'

const QuizShow = (props) => {

    const { quiz, author } = props
    if (!quiz || !author) {
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
                    <Link to={`/question/${quiz.id}`}>
                        <Button variant="outlined" fullWidth color="primary">View Poll</Button>
                    </Link>
                </div>
                <br />
            </div>
        </QuizTemplate>
    )
}


QuizShow.propTypes = {
    quiz: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired
}


export default QuizShow
