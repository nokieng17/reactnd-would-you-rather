import React, { Component } from "react";
import { connect } from 'react-redux'
import logo from './../logo.1.svg'
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import { Avatar } from "@material-ui/core";

class Nav extends Component {


    render() {
        const { authedUser, users } = this.props
        return (
            <div className="root-nav">
                <Container maxWidth="md">
                    <div className="nav">
                        <ul>
                            <li className="selected">
                                <NavLink to="/" exact activeClassName="active">
                                    Home
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to="/new" exact activeClassName="active">
                                    New Question
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to="/leader-board" exact activeClassName="active">
                                    Leader Board
                            </NavLink>
                            </li>
                        </ul>
                        <ul className="nav-user">
                            <li>
                                <NavLink to="/logout" exact activeClassName="active">
                                    Logout
                            </NavLink>
                            </li>
                            <li>
                                {
                                    '' === authedUser
                                        ?
                                        <NavLink to="/login" exact activeClassName="active">
                                            Login  &nbsp;
                                            <Avatar src={logo} />
                                        </NavLink>
                                        :
                                        <NavLink to="/user" exact activeClassName="active">
                                            Hello, {users[authedUser].name} &nbsp;
                                            <Avatar src={logo} />
                                        </NavLink>
                                }
                            </li>
                        </ul>
                    </div>
                </Container>
            </div>
        )
    }
}
// mapStateToProps, mapDispatchToProps
const mapStateToProps = ({ authedUser, users }) => {
    return {
        authedUser,
        users
    }
}
export default connect(mapStateToProps)(Nav)