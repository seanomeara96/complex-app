import React from "react";
import { Field, reduxForm } from "redux-form";
import PostInputs from "./PostInputs";

class CreatePostForm extends React.Component {
  onSubmit = (vals) => {
    this.props.onSubmit(vals);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <Field
            component={PostInputs}
            required
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autocomplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1">
            <small>Body Content</small>
          </label>
          <Field
            textarea
            component={PostInputs}
            required
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          />
        </div>

        <input type="hidden" name="_csrf" value={this.props.csrfToken} />
        <button className="btn btn-primary">Save New Post</button>
      </form>
    );
  }
}
export default reduxForm({
  form: "createPost",
})(CreatePostForm);
