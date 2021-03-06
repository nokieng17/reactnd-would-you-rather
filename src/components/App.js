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
import NotFound from './NotFound';
import DialogLogin from './dialogLogin';


class App extends Component {

    componentDidMount() {
        this.props.handleInitialData()
    }

    render() {
        const { loading, authedUser, handleLogin, users } = this.props

        return (
            <Router >
                <Fragment >
                    <ConnectedLoadingBar />
                    <div className="App" >
                        <ConnectedNav />
                        <div className="container">
                            {
                                '' === authedUser && false === loading ?
                                    <Switch>
                                        <Route path='/login' exact component={ConnectedLogin} actionLogin={handleLogin} users={users}></Route>
                                        {/* regsiter route here */}
                                        <Route component={DialogLogin}></Route>
                                    </Switch>
                                    :
                                    loading === true
                                        ? null
                                        : <div>
                                            <Switch>
                                                <Route path="/" exact component={ConnectedQuizHome} />
                                                <Route path='/question/:question_id' exact component={ConnectedQuiz} />

                                                <Route path="/add" exact component={ConnectedQuizNew} />
                                                <Route path="/leaderboard" exact component={ConnectedLeaderBoard} />
                                                <Route path="/logout" exact component={ConnectedLogout} />
                                                <Route path='/login' exact component={ConnectedLogin} actionLogin={handleLogin} users={users}></Route>
                                                <Route component={NotFound} />
                                            </Switch>
                                        </div>
                            }
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