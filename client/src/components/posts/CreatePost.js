import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import CreatePostForm from "./CreatePostForm";
import Flash from "../Flash";

class CreatePost extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    console.log("the state", this.props);
    if (this.props.isSignedIn === true) {
      return (
        <div className="container py-md-5 container--narrow">
          <Flash successes={this.props.successes} errors={this.props.errors} />
          <CreatePostForm handleSubmit={this.handleSubmit} />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    successes: state.flash.successes,
    errors: state.flash.errors,
    form: state,
  };
};
export default connect(mapStateToProps)(CreatePost);
