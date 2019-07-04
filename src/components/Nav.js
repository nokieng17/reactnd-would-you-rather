import React, { Component } from "react";
import { connect } from 'react-redux'
import logo from './../logo.1.svg'
import Container from "@material-ui/core/Container";
import { NavLink, withRouter } from "react-router-dom";
import { Avatar } from "@material-ui/core";

const getActiveClass = (path) => (currentPath) => {
    return path === currentPath ? "selected" : ""
}

class Nav extends Component {



    render() {
        const { authedUser, users, loading, path } = this.props
        const activeClass = getActiveClass(path)
        return (
            <div className="root-nav">
                <Container maxWidth="md">
                    <div className="nav">
                        <ul>
                            <li className={activeClass('/')}>
                                <NavLink to="/" exact activeClassName="active">
                                    Home
                                </NavLink>
                            </li>
                            <li className={activeClass('/new')}>
                                <NavLink to="/new" exact activeClassName="active">
                                    New Question
                                </NavLink>
                            </li>
                            <li className={activeClass("/leader-board")}>
                                <NavLink to="/leader-board" exact activeClassName="active">
                                    Leader Board
                                </NavLink>
                            </li>
                        </ul>
                        {
                            '' !== authedUser ?
                                <ul className="nav-user">
                                    <li className={activeClass("/logout")}>
                                        <NavLink to="/logout" exact activeClassName="active">
                                            Logout
                                    </NavLink>
                                    </li>
                                    {
                                        !loading &&
                                        <li className={activeClass("/user" || "/login")}>
                                            <NavLink to="/user" exact activeClassName="active">
                                                Hello, {users[authedUser].name} &nbsp;
                                            <Avatar src={logo} />
                                            </NavLink>
                                        </li>
                                    }
                                </ul>
                                :
                                <ul className="nav-user">
                                    <li className={activeClass("/register")}>
                                        <NavLink to="/register" exact activeClassName="active">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className={activeClass("/login")}>
                                        <NavLink to="/login" exact activeClassName="active">
                                            Login  &nbsp;
                                            <Avatar src={logo} />
                                        </NavLink>
                                    </li>
                                </ul>
                        }
                    </div>
                </Container>
            </div>
        )
    }
}
// mapStateToProps, mapDispatchToProps
const mapStateToProps = ({ authedUser, users, shared }, props) => {
    const { id = null } = props
    const { loading } = shared
    const path = props.location.pathname
    return {
        authedUser,
        users,
        loading,
        id,
        path
    }
}
export default withRouter(connect(mapStateToProps)(Nav))