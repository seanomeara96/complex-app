import React from "react";
import PostInputs from "./PostInputs";
import { Field, reduxForm } from "redux-form";

const EditPostForm = () => {
  return (
    <form className="mt-3" onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="post-title" className="text-muted mb-1">
          <small>Title</small>
        </label>
        <Field
          component={PostInputs}
          required
          name="title"
          id="post-title"
          value={props.post.title}
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
          component={PostInputs}
          textarea
          required
          name="body"
          id="post-body"
          className="body-content tall-textarea form-control"
          type="text"
        >
          {" "}
          {props.post.body}{" "}
        </Field>
      </div>

      <input type="hidden" name="_csrf" value={props.csrfToken} />
      <button className="btn btn-primary">Save Updates</button>
    </form>
  );
};

export default reduxForm({
  form: "editPost",
})(EditPostForm);
