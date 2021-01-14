import React, { Component, Fragment } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchInitialData } from "../actions";
import Navbar from "./NavBar";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import AddQuestion from "./AddQuestion";
import Question from "./Question";
import PollResult from "./PollResult";
import page404 from "./page404";
import history from "../History";



class App extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <Router history={history}>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/add" component={AddQuestion} />
            <Route exact path="/leaderboard" component={LeaderBoard} />
            <Route exact path="/pollresult/:id" component={PollResult} />
            <Route exact path="/question/:id" component={Question} />
            <Route path="*" component={page404} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => {
      dispatch(fetchInitialData());
    },
  };
}

export default connect(null, mapDispatchToProps)(App);
