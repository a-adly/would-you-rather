import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserScore } from "../utils/helper";

class UserScoreCard extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="container score-card">
        <div className="card-contents">
          <img className="userAvatar" alt="avatar" src={user.avatarURL} />
          <div className="card-separator"></div>
          <div className="card-text">
            <h2>{user.name}</h2>
            <p>
              Created questions: <span>{user.questions.length}</span>
            </p>
            <p>
              Answered questions:{" "}
              <span>{Object.keys(user.answers).length}</span>
            </p>
            <p>
              Score: <span>{getUserScore(user)}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
  return {
    authedUser,
    user: users[id],
  };
}

export default connect(mapStateToProps)(UserScoreCard);
