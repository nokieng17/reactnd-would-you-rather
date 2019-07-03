import React from 'react'
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import logo from './../logo.svg';

export default function Quiz(props) {

    const createStyle = makeStyles((theme) => ({
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
            }
        },
        header: {
            backgroundColor: theme.palette.divider,
            borderRadius: 5
        }
    }))

    const classes = createStyle();
    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <h4>Welcome to Would You Rather App!</h4>
                <p>Please login to continue</p>
            </div>
            <div>
                <img src={logo} alt="logo" />
                <Typography color="primary" variant="h5"><b>Sign in</b></Typography>
            </div>
            <div>
                <TextField
                    id="outlined-password-input"
                    label="username"
                    type="text"
                    autoComplete="current-username"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <Button variant="contained" color="primary" fullWidth>Sign in</Button>
            </div>
        </div>
    )
}