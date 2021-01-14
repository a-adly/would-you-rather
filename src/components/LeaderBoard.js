import React, { Component } from "react";
import UserScoreCard from "./UserScoreCard";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserScore } from "../utils/helper";

class LeaderBoard extends Component {
  render() {
    const { userIds, authedUser } = this.props;

    if (!authedUser) return <Redirect to="/login" />;

    return (
      <div className="container leaderBoard">
        {userIds.map((id) => (
          <UserScoreCard key={id} id={id} />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    authedUser,
    userIds: Object.keys(users).sort(
      (a, b) => getUserScore(users[b]) - getUserScore(users[a])
    ),
  };
}

export default connect(mapStateToProps)(LeaderBoard);
