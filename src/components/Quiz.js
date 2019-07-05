import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import QuizTemplate from './QuizTemplate';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { handleVoteQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom'

const MyisAnswered = (authedUser) => (quiz) => quiz.optionOne.votes.concat(quiz.optionTwo.votes).includes(authedUser)

class Quiz extends React.Component {

    state = {
        answer: '',
        voted: false
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

        this.setState({
            voted: true
        })
    }


    render() {
        const { author, quiz, authedUser, voteQuestion } = this.props
        const { answer, voted } = this.state;
        if (!quiz || !author) {
            return (
                <p>The question does not exist</p>
            )
        }
        if (voted || MyisAnswered(authedUser)(quiz)) {
            if (voted && undefined !== this.state.answer) {
                voteQuestion(quiz.id, this.state.answer)
            }
            return (
                <Redirect to={`/quiz/${quiz.id}/result`} />
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
    const { id } = props.match.params
    const quiz = questions[id];
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