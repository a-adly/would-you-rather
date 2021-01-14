import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  state = {
    userId: "",
  };

  handleLogin = (userId) => (e) => {
    this.props.dispatch(setAuthedUser(userId));
    this.setState({
      userId,
    });
  };

  render() {
    const { state, props, handleLogin } = this,
      { userId } = state,
      { users } = props,
      userIds = Object.keys(users);

    if (userId) return <Redirect to="/home" />;

    return (
      <div className="container login">
        <h1>Welcome to <span>Would you Rather</span> Game!</h1>
        <div className="loginBox">
          <p>Select a user to login</p>
          {userIds.map((id) => (
            <button key={id} onClick={handleLogin(id)} className="user-login-btn">
              <img
                className="userAvatar"
                alt={`${users[id].name} avatar`}
                src={users[id].avatarURL}
              />
              <div className="userName">{users[id].name}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: users,
    userIds: Object.keys(users),
  };
}

export default connect(mapStateToProps)(Login);
