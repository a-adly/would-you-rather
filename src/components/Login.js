import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FilledInput from "@material-ui/core/FilledInput";
import { connect } from "react-redux";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Redirect } from "react-router-dom";
import { setAuthedUser } from "../store/actions/authedUser";

import "./Login.css";

class Login extends Component {
  state = {
    userId: "",
    toHome: false,
  };

  handleChange = (e) => {
    // console.log(e)
    this.setState({ userId: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userId } = this.state;
    this.props.dispatch(setAuthedUser(userId));
    // add in store
    this.setState({
      userId: "",
      toHome: true,
    });
  };

  render() {
    const { userIds, users } = this.props;

    if (this.state.toHome) {
      return <Redirect to="/home" />;
    }

    return (
      <div>
        <div className="long-loginContainer">
          <Paper>
            <div className="loginBoxHeader">
              <h1 className="loginBoxTitle">
                Welcome to the Would you Rather App!
              </h1>
              <p className="loginBoxMessage">Please sign in to continue</p>
            </div>
            <div className="loginControls">
              <p>Sign In</p>
              <form>
                <FormControl variant="filled" className="formControl">
                  <InputLabel htmlFor="filled-user">Select User</InputLabel>
                  <Select
                    value={this.state.userId}
                    onChange={this.handleChange}
                    input={<FilledInput name="userId" id="filled-user" />}
                  >
                    {userIds.map((id) => (
                      <MenuItem key={id} value={id}>
                        <ListItemIcon>
                          <img
                            className="loginBoxImage"
                            alt="complex"
                            src={users[id].avatarURL}
                          />
                        </ListItemIcon>
                        <ListItemText inset primary={users[id].name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            </div>
            <Button
              variant="contained"
              color="inherit"
              className="formControl loginBtn"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    userIds: Object.keys(users),
    users: users,
  };
}

export default connect(mapStateToProps)(Login);