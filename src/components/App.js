import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import QuizResult from './QuizResult';
import Quiz from './Quiz';
import Login from './Login';
import QuizHome from './QuizHome';
import QuizNew from './QuizNew';
import LeaderBoard from './LeaderBoard';
import Nav from './Nav';
import { handleInitialData } from './../actions/shared'

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { loading, autheduser } = this.props
        const warnLogin = () => (
            '' === autheduser ? '' :
                <div>
                    <p color="secondary">Please login to create or vote a question</p>
                </div>
        )
        return (
            <Router >
                <Fragment >
                    <LoadingBar />
                    <div className="App" >
                        <Nav />
                        <div className="container">
                            {
                                loading === true
                                    ? null
                                    : <div>
                                        <Route path="/" exact component={QuizHome} />
                                        <Route path='/quiz/:id' exact component={Quiz} />
                                        <Route path="/quiz/:id/result" exact component={QuizResult} />
                                        <Route path="/new" exact component={QuizNew} />
                                        <Route path="/leader-board" exact component={LeaderBoard} />
                                        <Route path='/'>
                                            <div>
                                                <Switch>
                                                    <Route path='/login' exact ></Route>
                                                    <Route path="/leader-board" component={LeaderBoard} />
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
function mapStateToProps({ shared, autheduser }) {
    const { loading } = shared
    return {
        loading,
        autheduser
    }
}
export default connect(mapStateToProps)(App);