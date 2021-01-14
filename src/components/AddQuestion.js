import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { asyncAddQuestion } from "../actions/questions";

class AddQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    redirToHome: false,
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    if (optionOne && optionTwo) {
      this.props.dispatch(asyncAddQuestion(optionOne, optionTwo));
      this.setState({
        optionOne: "",
        optionTwo: "",
        redirToHome: true,
      });
    }
  };

  render() {
    const { state, props, handleChange, handleSubmit } = this;
    const { redirToHome, optionOne, optionTwo } = state;
    const { authedUser } = props;

    if (!authedUser) return <Redirect to="/login" />;

    if (redirToHome) return <Redirect to={"/home"} />;

    return (
      <div className="container new-question">
        <h1>Add New Question</h1>
        <div className="question-card">
          <h2>Complete the question:</h2>
          <p className="newQuestionText">Would you rather...</p>
          <form onSubmit={handleSubmit}>
            <input
              className="option-input"
              type="text"
              value={optionOne}
              onChange={handleChange("optionOne")}
            />
            <div className="new-question-separator">OR</div>
            <input
              className="option-input"
              type="text"
              value={optionTwo}
              onChange={handleChange("optionTwo")}
            />
            <input className="submit-question" type="submit" value="Submit" disabled={!optionOne || !optionTwo} />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(AddQuestion);
