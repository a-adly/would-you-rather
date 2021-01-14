import React, { Component } from "react";
import PollItem from "./PollItem";
import { connect } from "react-redux";

class TabContainer extends Component {
  render() {
    return (
      <div>
        {this.props.questionIds.map((id) => (
          <PollItem key={id} id={id}></PollItem>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { answered }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
      .filter(
        (qId) =>
          authedUser &&
          (answered
            ? users[authedUser].answers[qId]
            : !users[authedUser].answers[qId])
      ),
  };
}

export default connect(mapStateToProps, null)(TabContainer);