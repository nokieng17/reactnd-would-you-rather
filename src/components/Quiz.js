import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import QuizTemplate from './QuizTemplate';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { handleVoteQuestion } from '../actions/questions';
import QuizResult from './QuizResult'

const MyisAnswered = (authedUser) => (quiz) => quiz.optionOne.votes.concat(quiz.optionTwo.votes).includes(authedUser)

class Quiz extends React.Component {

    state = {
        answer: ''
    }

    componentDidMount() {
        const { author = null, quiz = null, authedUser } = this.props
        if (author && quiz) {
            this.setState({
                answer: quiz.optionOne.votes.concat(quiz.optionTwo.votes).includes(authedUser)
            })
        }
    }


    static getDerivedStateFromProps(props, state) {
        // do things with nextProps.someProp and prevState.cachedSomeProp
        const { author = null, quiz = null, authedUser, users } = props
        if (author && quiz && !state.answer) {
            return {
                answer: users[authedUser].answers[quiz]
            }
        }
        return null;
    }

    handleAnswerChange = (e) => {
        const value = e.target.value
        this.setState({
            answer: value
        })
    }

    handleVoteQuestion = () => {

        const {quiz, voteQuestion} = this.props
        voteQuestion(quiz.id, this.state.answer)
    }


    render() {
        const { author, quiz, authedUser,  users } = this.props
        const { answer } = this.state;
        if (!quiz || !author) {
            return (
                <p>The question does not exist</p>
            )
        }
        if ( MyisAnswered(authedUser)(quiz)) {
            return (
                <QuizResult author={author} quiz={quiz} authedUser={users[authedUser]} />
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
                        <FormControlLabel
                            value="optionOne"
                            checked={"optionOne" === answer}
                            control={<Radio />}
                            label={quiz.optionOne.text}
                            onClick={this.handleAnswerChange} />
                        <FormControlLabel
                            value="optionTwo"
                            checked={"optionTwo" === answer}
                            control={<Radio />}
                            label={quiz.optionTwo.text}
                            onClick={this.handleAnswerChange} />
                    </RadioGroup>
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={'' === this.state.answer || '' === authedUser}
                        color="primary"
                        onClick={this.handleVoteQuestion}
                    >Submit</Button>
                </div>
            </QuizTemplate>
        )
    }
}
//mapStateToProps, mapDispatchToProps
function mapStateToProps({ questions, users, authedUser }, props) {
    const { question_id } = props.match.params
    const quiz = questions[question_id];
    return {
        author: undefined !== quiz ? users[quiz.author] : null,
        quiz,
        authedUser,
        users,
    }
}
const mapDispatchToProps = dispatch => ({
    voteQuestion: (qid, answer) => dispatch(handleVoteQuestion(qid, answer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)