import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import logo from './../logo.svg'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card/index'
import CardContent from '@material-ui/core/CardContent';
import { Avatar, Divider } from '@material-ui/core';

function LeaderBoardItem(props) {


    const createStyle = makeStyles((theme) => ({
        card: {
            maxWidth: 400,
            padding: 0,
            "&::before": {
                content: `''`,
                display: "block",
                position: "absolute",
                width: 40,
                height: 40,
                backgroundImage: props.prize !== "none" ? `url(./prize_${props.prize}.svg)` : "none"
            }
        },
        header: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            span: {
                fontSize: "0.5em"
            }
        },
        content: {
            display: "flex",
            margin: 10
        },
        avatar: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        avatarLogo: {
            width: 60,
            height: 60,
            border: `0.5px ${theme.palette.divider} solid`,
            borderRadius: 30
        },
        detail: {
            flex: 3,
            borderLeft: `0.5px ${theme.palette.divider} solid`,
            borderRight: `0.5px ${theme.palette.divider} solid`,
            margin: '0px 10px 0px 10px',
            padding: '0px 10px 0px 10px',
            '& > p': {
                fontSize: "0.8em",
                fontWeight: 500
            },
            '& > *': {
                textAlign: "left"
            },
            '& span': {
                float: "right"
            }
        },
        score: {
            flex: 1,
            display: "flex",
            flexDirection: 'column',
            border: `0.5px ${theme.palette.divider} solid`,
            borderRadius: 4,
        },
        scoreHeader: {
            backgroundColor: theme.palette.divider,
            height: 30,
            fontWeight: 450,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        scoreAvatarBox: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        },
        scoreAvatar: {
            backgroundColor: theme.palette.primary.light,
            margin: '0 auto',
        }
    }))

    const classes = createStyle()
    const { answers, questions, logo, name } = props
    const numAnswers = Object.keys(answers).length
    const numQuestions = questions.length
    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <div className={classes.avatar}>
                    <img src={process.env.PUBLIC_URL + logo} className={classes.avatarLogo} alt={name} />
                </div>
                <div className={classes.detail}>
                    <h4 style={{ margin: 0, marginBottom: 15 }}>{name}</h4>
                    <p>Answered questions<span>{numAnswers}</span></p>
                    <Divider variant="fullWidth" />
                    <p>Created questions<span>{numQuestions}</span></p>
                </div>
                <div className={classes.score}>
                    <div className={classes.scoreHeader}>
                        <span >Score</span>
                    </div>
                    <div className={classes.scoreAvatarBox}>
                        <Avatar rounded="true" className={classes.scoreAvatar}>{numAnswers + numQuestions + ''}</Avatar>
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}

LeaderBoardItem.propTypes = {
    prize: PropTypes.string.isRequired,
}

LeaderBoardItem.defaultProps = {
    answers: {},
    questions: [],
    name: "no name",
    logo: "./images/snow.png"
}

export default connect()(LeaderBoardItem)