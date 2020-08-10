import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CreatePostForm from "./CreatePostForm";
import Flash from "../Flash";
import { createPost } from "../../actions";
class CreatePost extends React.Component {
  onSubmit = (formValues) => {
    this.props.createPost({ ...formValues, userId: this.props.auth.auth._id });
  };
  render() {
    if (this.props.auth.isSignedIn === true) {
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
    auth: state.auth,
    form: state.form.createPost,
    csrfToken: state.csrfToken,
  };
};
export default connect(mapStateToProps, { createPost })(CreatePost);
