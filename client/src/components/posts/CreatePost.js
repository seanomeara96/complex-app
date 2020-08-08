import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import CreatePostForm from "./CreatePostForm";
import Flash from "../Flash";

class CreatePost extends React.Component {
  onSubmit = ({ title, body }) => {
    // implement redux thunk here
    axios
      .post("/create-post", { title, body, userId: this.props.user.userId })
      .then(() => {
        // redirect after success message has shown
        return <Redirect to="/posts" />;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    if (this.props.user.isSignedIn === true) {
      return (
        <div className="container py-md-5 container--narrow">
          <Flash />
          <CreatePostForm
            onSubmit={this.onSubmit}
            csrfToken={this.props.csrfToken}
          />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth,
    form: state.form.createPost,
    csrfToken: state.csrfToken,
  };
};
export default connect(mapStateToProps)(CreatePost);
