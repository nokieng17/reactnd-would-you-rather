import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';
import QuizShow from './QuizShow';
import Button from '@material-ui/core/Button';

const style = theme => ({
    board: {
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        border: `0.5px ${theme.palette.divider} solid`,
        borderRadius: 5,
    },
    selector: {
        display: "flex",
        borderRadius: 5,
        flexDirection: "row",
        border: '0.5px #ccc solid',
        '&:hover': {
            cursor: "pointer"
        },
        '& > div.selected:nth-of-type(1)': {
            borderRadius: '5px 0 0 5px',
        },
        '& > div.selected:nth-of-type(2)': {
            borderRadius: '0 5px 5px 0',
        },
        '& > div': {
            alignContent: 'center',
            flex: 1,
            fontWeight: 500,
            fontSize: '0.9em',
        },
        '& > div.selected': {
            backgroundColor: theme.palette.divider,
            color: theme.palette.primary.dark,
        }
    },
    list: {
        padding: 10,
        '& > div': {
            marginTop: 10,
        }
    }
})

const isAnswered = (quiz, authedUser) => {
    return quiz.optionOne.votes.concat(quiz.optionTwo.votes).includes(authedUser)
}

const filterAnswered = (questions) => (quizIds, authedUser) => (isShowAnswered) => {
    if (isShowAnswered) {
        return quizIds.filter(id => isAnswered(questions[id], authedUser))
    } else {
        return quizIds.filter(id => !isAnswered(questions[id], authedUser))
    }
}

class QuizHome extends Component {

    state = {
        isShowAnswered: false
    }

    handleToggleQuestion = () => {
        this.setState((prevState) => ({
            isShowAnswered: !prevState.isShowAnswered
        }))
    }

    render() {
        const { classes, questions, quizIds, authedUser, users } = this.props
        const { isShowAnswered } = this.state

        const filter = filterAnswered(questions)(quizIds, authedUser)
        const quizs = filter(isShowAnswered)


        return (
            <div className={classes.board}>
                <div className={classes.selector}>
                    <div className={isShowAnswered ? "" : "selected"} onClick={this.handleToggleQuestion}>
                        <p>Unanswered Questions</p>
                    </div>
                    <div className={isShowAnswered ? "selected" : ""} onClick={this.handleToggleQuestion}>
                        <p>Answered Questions</p>
                    </div>
                </div>
                <div className={classes.list}>
                    {
                        quizs.length === 0 ?

                            <NavLink to="/new" exact>
                                <Button color="primary" variant="outlined" fullWidth>Create New Question</Button>
                            </NavLink> :

                            quizs.map(id => (
                                <div key={id} >
                                    <QuizShow id={id} quiz={questions[id]} author={users[questions[id].author]} />
                                </div>
                            ))
                    }
                </div>
            </div>
        )
    }
}
//mapStateToProps, mapDispatchToProps
function mapStateToProps({ questions, authedUser, users }) {
    return {
        questions,
        quizIds: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        authedUser,
        users
    }
}
export default withStyles(style)(connect(mapStateToProps)(QuizHome))