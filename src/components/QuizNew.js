import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStyles, TextField, Typography, } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/styles';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom'


const createStyle = createStyles((theme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        border: `0.5px ${theme.palette.divider} solid`,
        borderRadius: 5,
        paddingBottom: 10,
        '& > div': {
            padding: "0 10px 0 10px"
        },
        '& img': {
            maxWidth: '40%',
        },
        '& *': {
            textAlign: 'left',
        },
    },
    header: {
        padding: "10px !important",
        backgroundColor: theme.palette.primary.dark,
        borderRadius: 5,
        color: '#fff',
        textAlign: "left",
        '& span': {
            fontSize: '1em'
        }
    },
    p: {
        margin: 0,
        width: '100%',
        textAlign: 'center',
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        '&:before, &:after': {
            position: "absolute",
            top: "51%",
            overflow: "hidden",
            width: "50%",
            height: 1,
            content: `''`,
            backgroundColor: theme.palette.divider
        },
        '&:before': {
            marginLeft: '-53%',
            textAlign: 'right'
        },
        '&:after': {
            marginLeft: '2%'
        }
    }
}))
class QuizNew extends Component {

    state = {
        disableBtn: true,
        optionOneText: '',
        optionTwoText: '',
        toHome: ''
    }

    handleCreateQuestion = (e) => {
        e.preventDefault()
        const { optionOneText, optionTwoText } = this.state
        const { addQuestion } = this.props
        addQuestion(optionOneText, optionTwoText)
        this.setState({ toHome: true })
    }

    onOptionOneChange = (e) => {
        const value = e.target.value
        this.setState((prevState) => ({
            disableBtn: '' === prevState.optionTwoText || '' === value,
            optionOneText: value
        }))
    }

    onOptionTwoChange = (e) => {
        const value = e.target.value
        this.setState((prevState) => ({
            disableBtn: '' === prevState.optionOneText || '' === value,
            optionTwoText: value
        }))
    }

    render() {
        const { classes, authedUser } = this.props;
        const { toHome } = this.state
        if (toHome) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div className={classes.card}>
                <div className={classes.header}>
                    <Typography variant={"body1"}>Create new Question</Typography>
                </div>
                <div>
                    <p>complete the question</p>
                    <h4>Would you rather ...</h4>
                    <TextField
                        id="outlined-option-one-input"
                        label="Enter option one here"
                        type="text"
                        autoComplete="current-option"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={this.state.optionOneText}
                        onChange={this.onOptionOneChange}
                    />
                    <p className={classes.p}>OR</p>
                    <TextField
                        id="outlined-option-two-input"
                        label="Enter option two here"
                        type="text"
                        autoComplete="current-option"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={this.state.optionTwoText}
                        onChange={this.onOptionTwoChange}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={this.handleCreateQuestion}
                        disabled={this.state.disableBtn && '' === authedUser}
                    >Submit</Button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addQuestion: (optionOneText, optionTwoText) => dispatch(handleAddQuestion(optionOneText, optionTwoText)),
})
const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default connect(null, mapDispatchToProps)(withStyles(createStyle)(QuizNew))