import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import TabContents from "./TabContents";

class Home extends Component {
  state = {
    tabValue: 0,
  };

  handleChange = (tabValue) => (e) => this.setState({ tabValue });

  render() {
    const { state, props, handleChange } = this;
    const { authedUser } = props;
    const { tabValue } = state;

    if (!authedUser) return <Redirect to="/login" />;

    return (
      <div className="container home">
        <div className="tabs">
          <button className={`tab-link ${!tabValue && "active"}`} onClick={handleChange(0)}>
            Unanswered Questions
          </button>
          <button className={`tab-link ${tabValue && "active"}`} onClick={handleChange(1)}>
            Answered Questions
          </button>
        </div>
        <TabContents showAnswered={tabValue} />
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Home);
