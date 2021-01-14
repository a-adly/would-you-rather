import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { formatQuestion } from "../utils/helper";
import { connect } from "react-redux";

import "./PollItem.css";

class PollItem extends Component {
  render() {
    const { questionInfo, navURL } = this.props;
    return (
      <div className="pollItemContainer">
        <Paper className="pollItemPaper">
          <div className="pollItemBoxHeader">
            {questionInfo.authorName} asks:
          </div>
          <div className="pollItemControls">
            <Grid container spacing={16}>
              <Grid item xs={4} alignItems="center" justify="center" container>
                <div>
                  <img
                    className="scoreCardImg"
                    alt="complex"
                    src={questionInfo.avatar}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div className="pollItemSeparator"></div>
              </Grid>
              <Grid item xs={7} container direction="column">
                <Grid item>
                  <div className="pollItemMainTitle">Would you Rather...</div>
                </Grid>
                <Grid item>
                  <div>..{questionInfo.optionOne.text}...</div>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="inherit"
                    className="pollItemFormControl"
                    component={Link}
                    to={navURL}
                  >
                    View Poll
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
  const questionInfo = questions[id];

  return {
    authedUser,
    questionInfo: formatQuestion(
      questionInfo,
      users[questionInfo.author],
      authedUser
    ),
    navURL: users[authedUser].answers[id]
      ? `pollresult/${questionInfo.id}`
      : `/question/${questionInfo.id}`,
  };
}

export default connect(mapStateToProps)(PollItem);
