import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helper";

class PollCard extends Component {
  render() {
    const { questionInfo, pollLink } = this.props;
    return (
      <div className="container poll-card">
        <h2>{questionInfo.authorName} asks:</h2>
        <div className="card-contents">
          <img className="userAvatar" alt="avatar" src={questionInfo.avatar} />
          <div className="card-separator"></div>
          <div className="card-text">
            <h3>Would you Rather...</h3>
            <p>...{questionInfo.optionOne.text}...</p>
          </div>
        </div>
        <Link to={pollLink}>Open Poll</Link>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { qId }) {
  const questionInfo = questions[qId];
  return {
    authedUser,
    questionInfo: formatQuestion(
      questionInfo,
      users[questionInfo.author],
      authedUser
    ),
    pollLink:
      qId in users[authedUser].answers
        ? `/pollresult/${qId}`
        : `/question/${qId}`,
  };
}

export default connect(mapStateToProps)(PollCard);
