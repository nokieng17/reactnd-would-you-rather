import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ConnectedLoadingBar from 'react-redux-loading-bar'
import ConnectedQuizResult from './QuizResult';
import ConnectedQuiz from './Quiz';
import Login from './Login';
import ConnectedQuizHome from './QuizHome';
import ConnectedQuizNew from './QuizNew';
import ConnectedLeaderBoard from './LeaderBoard';
import ConnectedNav from './Nav';
import ConnectedLogout from './Logout'
import { handleInitialData } from './../actions/shared'


class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { loading, authedUser } = this.props
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
                                                    <Route path='/login' exact ></Route>
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
function mapStateToProps({ shared, authedUser }) {
    const { loading } = shared
    return {
        loading,
        authedUser
    }
}
export default connect(mapStateToProps)(App);