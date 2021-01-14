import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class page404 extends Component {
  render() {
    const { authedUser } = this.props;
    if (!authedUser) return <Redirect to="/login" />;

    return (
      <div className="container page404">
        <h1>oops!</h1>
        <p>The page you've requested is not found.</p>
        <Link to={"/home"}>Go to Home Page</Link>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(page404);
