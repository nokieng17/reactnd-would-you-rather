import React from 'react'
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


export default function QuizResultItem(props) {

    const createStyle = makeStyles((theme) => ({
        box: {
            border: `0.5px ${theme.palette.divider} solid`,
            borderRadius: 2,
            paddingLeft: 10,
            paddingRight: 10,
        },
        p: {
            fontWeight: 500
        },
        progress: {
            height: 20,
            width: "100%",
            borderRadius: 5,
            backgroundColor: theme.palette.secondary.light,
            "&::-webkit-progress-bar": {
                backgroundColor: "#ccc",
                borderRadius: 5
            },
            "&::-webkit-progress-value": {
                borderRadius: 5,
                backgroundColor: theme.palette.secondary.light,
            }
        }
    }))

    const classes = createStyle()
    return (
        <div className={classes.box}>
            <p className={classes.p}>Would you rather</p>
            <progress className={classes.progress} value={100 * 2 / 3} max={100}></progress>
            <p className={classes.p}>2 out of 3 votes</p>
        </div>
    )
}