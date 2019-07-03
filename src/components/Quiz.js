import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import QuizTemplate from './QuizTemplate';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { handleVoteQuestion } from '../actions/questions';

class Quiz extends React.Component {

    state = {
        answer: ''
    }

    render() {
        const { author, quiz, authedUser } = this.props
        if (null == quiz) {
            return (
                <p>Could not found the question</p>
            )
        }
        return (
            <QuizTemplate author={author}>
                <div style={{ textAlign: "left", margin: "0px 10px 10px 10px" }}>
                    <h3>Would you rather...</h3>

                    <RadioGroup
                        aria-label="Would you rather"
                        name="quiz"
                    >
                        <FormControlLabel value="optionOne" control={<Radio />} label={quiz.optionOne.text} />
                        <FormControlLabel value="optionTwo" control={<Radio />} label={quiz.optionTwo.text} />
                    </RadioGroup>
                    <Button fullWidth variant="contained" disabled={'' !== this.state.answer && '' !== authedUser} color="primary">Submit</Button>
                </div>
            </QuizTemplate>
        )
    }
}
//mapStateToProps, mapDispatchToProps
function mapStateToProps({ author, questions, users, authedUser }, props) {
    const { id } = props.match.params
    const quiz = questions[id];
    if (null == author && null != quiz) {
        author = users[quiz.author]
    }
    return {
        author,
        quiz,
        authedUser
    }
}
const mapDispatchToProps = dispatch => ({
    voteQuestion: (qid, answer) => dispatch(handleVoteQuestion(qid, answer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)