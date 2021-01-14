import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { formatQuestion } from "../utils/helper";

class PollResult extends Component {
  getOptionPercentage(currOption, question) {
    return (
      (question[currOption].votes.length /
        (question.optionOne.votes.length + question.optionTwo.votes.length)) *
      100
    );
  }
  render() {
    const { props, getOptionPercentage } = this;
    const { question, authedUser } = props;

    if (!authedUser) return <Redirect to="/login" />;

    if (!question) return <Redirect to="/home" />;

    const options = ["optionOne", "optionTwo"];

    return (
      <div className="container poll-result">
        <h2>{question.authorName} asks:</h2>
        <div className="card-contents">
          <img
            className="userAvatar"
            alt={`${question.authorName} avatar`}
            src={question.avatar}
          />
          <div className="card-separator"></div>
          <div className="card-text">
            <h3>Result:</h3>

            {options.map((currOption) => {
              const isAuthedUserAnswer = question[currOption].votes.includes(
                authedUser
              );
              return (
                <div
                  key={currOption}
                  className={
                    isAuthedUserAnswer
                      ? "poll-result-answer activeOption"
                      : "poll-result-answer"
                  }
                >
                  {isAuthedUserAnswer && (
                    <span className="poll-result-userVote">Your Vote</span>
                  )}
                  <p>Would you rather {question[currOption].text}</p>
                  <progress
                    value={getOptionPercentage(currOption, question)}
                    max="100"
                  />
                  <p className="poll-result-voteCount">
                    {question[currOption].votes.length} out of{" "}
                    {question.optionOne.votes.length +
                      question.optionTwo.votes.length}{" "}
                    votes
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { match }) {
  const { id } = match.params;
  return {
    authedUser,
    question:
      id in questions
        ? formatQuestion(questions[id], users[questions[id].author])
        : null,
  };
}

export default connect(mapStateToProps)(PollResult);
