import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ConnectedLoadingBar from 'react-redux-loading-bar'
import ConnectedQuizResult from './QuizResult';
import ConnectedQuiz from './Quiz';
import ConnectedLogin from './Login';
import ConnectedQuizHome from './QuizHome';
import ConnectedQuizNew from './QuizNew';
import ConnectedLeaderBoard from './LeaderBoard';
import ConnectedNav from './Nav';
import ConnectedLogout from './Logout'
import { handleInitialData } from './../actions/shared'
import { setAuthedUser } from '../actions/authedUser';


class App extends Component {

    componentDidMount() {
        this.props.handleInitialData()
    }

    render() {
        const { loading, authedUser, handleLogin, users } = this.props
        const warnLogin = () => (
            '' === authedUser ?
                <div>
                    <p color="secondary">Please login to create or vote a question</p>
                </div>
                :
                ''
        )
        return (
            <Router >
                <Fragment >
                    <ConnectedLoadingBar />
                    <div className="App" >
                        <ConnectedNav />
                        <div className="container">
                            {
                                loading === true
                                    ? null
                                    : <div>
                                        <Route path="/" exact component={ConnectedQuizHome} />
                                        <Route path='/quiz/:id' exact component={ConnectedQuiz} />
                                        <Route path='/quiz/:id/result' exact component={ConnectedQuizResult} />

                                        <Route path="/new" exact component={ConnectedQuizNew} />
                                        <Route path="/leader-board" exact component={ConnectedLeaderBoard} />
                                        <Route path="/logout" exact component={ConnectedLogout} />
                                        <Route path='/'>
                                            <div>
                                                <Switch>
                                                    <Route path='/login' exact component={ConnectedLogin} actionLogin={handleLogin} users={users}></Route>
                                                    <Route path='/'>{warnLogin}</Route>
                                                </Switch>
                                            </div>
                                        </Route>
                                    </div>
                            }

                            <Route path="/!*" exact component={warnLogin} />

                        </div>
                    </div>
                </Fragment>
            </Router >
        )
    }
}
//mapStateToProps, mapDispatchToProps
function mapStateToProps({ shared, authedUser, users }) {
    const { loading } = shared
    return {
        loading,
        authedUser,
        users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (authedUser) => dispatch(setAuthedUser(authedUser)),
        handleInitialData: () => dispatch(handleInitialData())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);