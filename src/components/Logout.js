import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleLogout } from './../actions/authedUser'


class Logout extends React.Component {

    render() {
        const { handleLogout } = this.props
        handleLogout()
        return (
            <Redirect to="/login" />
        )
    }
}

const mapDispatchToProps = dispatch => ({
    handleLogout: () => dispatch(handleLogout()),
})

export default connect(null, mapDispatchToProps)(Logout)