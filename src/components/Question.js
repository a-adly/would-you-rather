import React, { Component } from "react";
import { asyncAddAnswer } from "../actions/answers";
import { Redirect } from "react-router-dom";
import { formatQuestion } from "../utils/helper";
import { connect } from "react-redux";

class Question extends Component {
  state = {
    value: "",
    redirToPollResult: false,
  };

  handleChange = (e) => this.setState({ value: e.currentTarget.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { dispatch, qid } = this.props;
    dispatch(asyncAddAnswer(qid, value)).then(() => {
      this.setState({
        value: "",
        redirToPollResult: true,
      });
    });
  };

  render() {
    const { props, state, handleChange, handleSubmit } = this;
    const { question, authedUser } = props;
    const { redirToPollResult, value } = state;

    if (!authedUser) return <Redirect to="/login" />;

    if (!question) return <Redirect to="/home" />;

    if (redirToPollResult)
      return <Redirect to={`/pollresult/${question.id}`} />;

    return (
      <div className="container question">
        <h2>{question.authorName} asks:</h2>
        <div className="card-contents">
          <img
            className="userAvatar"
            alt={`${question.authorName} avatar`}
            src={question.avatar}
          />
          <div className="card-separator"></div>
          <div className="card-text">
            <h3>Would you Rather...</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  id="a1"
                  type="radio"
                  name="qr"
                  value="optionOne"
                  onChange={handleChange}
                />
                <label htmlFor="a1">{question.optionOne.text}</label>
              </div>
              <div className="input-group">
                <input
                  id="a2"
                  type="radio"
                  name="qr"
                  value="optionTwo"
                  onChange={handleChange}
                />
                <label htmlFor="a2">{question.optionTwo.text}</label>
              </div>
              <input className="submit-question" type="submit" value="Submit" disabled={!value} />
            </form>
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
    qid: id,
    question:
      id in questions
        ? formatQuestion(questions[id], users[questions[id].author], authedUser)
        : null,
  };
}

export default connect(mapStateToProps)(Question);
