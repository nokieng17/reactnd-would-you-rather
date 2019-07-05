import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import logo from './../logo.svg';
import * as md5 from 'md5'
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser';



const style = (theme) => ({
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
})

class Login extends React.Component {

    state = {
        username: undefined,
        password: undefined,
        message: ''
    }

    componentDidMount() {
        this.setState({ username: this.props.users[Object.keys(this.props.users)[Math.round(Math.random() * (Object.keys(this.props.users).length - 1))]].id })
    }

    onUsernameCanged = (e) => {
        const { value } = e.target
        if (!value) {
        } else {
            this.setState({ username: value.toLowerCase(), message: '' })
        }
    }
    onPasswordChanged = (e) => {
        const { value } = e.target
        this.setState({ password: value.toLowerCase(), message: '' })
    }

    handleLogin = (e) => {
        e.preventDefault()

        const { actionLogin, users } = this.props
        const { username, password } = this.state

        if (username && password && users[username]) {
            if (users[username].password === md5(password)) {
                actionLogin(username)
            } else {
                this.setState({ message: "the username or password as in correct" })
            }
        } else {
            this.setState({ message: "the username does not exists" })
        }
    }

    handleHackMe = (e) => {
        e.preventDefault()

        this.setState(prevState => ({ password: prevState.username }))
        this.refPassword.value = this.state.password
    }

    render() {
        const { classes, users, authedUser } = this.props
        const {
            message,
            username
        } = this.state

        if (authedUser) {
            const { location = {} } = this.props
            location.state = location.state ? location.state : {}
            const { referrer = undefined } = location.hasOwnProperty('state') ? location.state : {}
            return (
                <Redirect to={{
                    pathname: referrer ? referrer : "/",
                    search: referrer ? location.search : ''
                }} />
            )
        }

        if (this.refUsername) {
            this.refUsername.value = username
        }
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
                        inputRef={ref => this.refUsername = ref}
                        id="outlined-username-input"
                        label="username"
                        type="text"
                        autoComplete="current-username"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        input={username}
                        onChange={this.onUsernameCanged}
                        inputProps={{
                            maxLength: 25,
                        }}
                    />
                    <TextField
                        inputRef={ref => this.refPassword = ref}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        onChange={this.onPasswordChanged}
                        inputProps={{
                            maxLength: 25,
                        }}
                    />
                    {
                        message &&
                        <p color="secondary">{message}</p>
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={this.handleLogin}
                    >Sign in</Button>
                    <hr />
                    {
                        users[username] &&
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={this.handleHackMe}
                        >Hack Me!</Button>
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ users, authedUser }) => {
    return {
        users,
        authedUser
    }
}
const mapDispatchToProps = dispatch => {
    return {
        actionLogin: (authedUser) => dispatch(setAuthedUser(authedUser))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Login))