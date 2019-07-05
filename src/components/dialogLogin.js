import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect, withRouter } from 'react-router-dom'

class DialogLogin extends React.Component {

    state = {
        goToLgin: false
    }

    handleClose = () => {
        this.setState({ goToLgin: true })
    }

    render() {
        const { location } = this.props
        if (this.state.goToLgin) {
            return (
                <Redirect to={{
                    pathname: '/login',
                    search: location.search,
                    state: { referrer: location.pathname }
                }} />
            )
        }
        return (
            <Dialog
                open={true}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Please login to continue"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Would you rather offers you a react nano degree certificate!!!
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" variant="contained" >
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withRouter(DialogLogin)