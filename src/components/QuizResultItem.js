import React from 'react'
import votedLogo from './../voted_badge.svg'
import { makeStyles } from '@material-ui/styles';


export default function QuizResultItem(props) {

    const createStyle = makeStyles((theme) => ({
        box: {
            border: `0.5px ${theme.palette.divider} solid`,
            borderRadius: 5,
            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 10,
            backgroundColor: `${props.isMyVote ? theme.palette.primary.light : theme.palette.divider}`,
            color: `${props.isMyVote ? theme.palette.primary.dark : 'inherit'}`,
            position: "relative",
            '& img': {
                position: "absolute",
                width: 40,
                height: 40,
                top: -20,
                left: '89%',
            }
        },
        p: {
            fontWeight: 500,
            margin: 10
        },
        progress: {
            height: 20,
            width: "100%",
            borderRadius: 5,
            backgroundColor: theme.palette.primary.dark,
            "&::-webkit-progress-bar": {
                backgroundColor: "#ccc",
                borderRadius: 5
            },
            "&::-webkit-progress-value": {
                borderRadius: 5,
                backgroundColor: theme.palette.primary.dark,
            }
        }
    }))

    const classes = createStyle()
    const { text, score, total } = props
    return (
        <div className={classes.box}>
            {
                props.isMyVote &&
                <img src={votedLogo} alt={"my vote"} />
            }
            <p className={classes.p}>{text}</p>
            <progress className={classes.progress} value={score} max={total}></progress>
            <p className={classes.p}>{score} out of {total} votes</p>
        </div>
    )
}