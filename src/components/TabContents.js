import React, { Component } from "react";
import PollCard from "./PollCard";
import { connect } from "react-redux";

class TabContents extends Component {
  render() {
    const { questionIds } = this.props;
    return (
      <div>
        {questionIds.map((id) => (
          <PollCard key={id} qId={id} />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { showAnswered }) {
  return {
    questionIds: Object.keys(questions)
      .filter((qId) =>
        showAnswered
          ? qId in users[authedUser].answers
          : !(qId in users[authedUser].answers)
      )
      .sort(
        (qId1, qId2) => questions[qId2].timestamp - questions[qId1].timestamp
      ),
  };
}

export default connect(mapStateToProps)(TabContents);
