import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class NavBar extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(null));
  };
  render() {
    const { loggedInUser } = this.props;
    return (
      <header>
        <nav>
          <Link className="navLink" to="/home">
            Home
          </Link>
          <Link className="navLink" to="/add">
            New Question
          </Link>
          <Link className="navLink" to="/leaderboard">
            Leader Board
          </Link>
        </nav>
        <div className="user-area">
          {loggedInUser ? (
            <Fragment>
              <h6>Hello {loggedInUser.name}</h6>
              <img
                className="userAvatar"
                alt={`${loggedInUser.name} avatar`}
                src={loggedInUser.avatarURL}
              />
              <button className="navLinkButton" onClick={this.handleLogout}>
                Logout
              </button>
            </Fragment>
          ) : (
            <Link className="navLink login" to="/login">
              Login
            </Link>
          )}
        </div>
      </header>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loggedInUser: users[authedUser],
  };
}

export default connect(mapStateToProps)(NavBar);
