import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PostInputs from "./PostInputs";
const EditPost = (props) => {
  return (
    <div className="container py-md-5 container--narrow">
      {/* <%- include('includes/flash')%> */}
      <Link to="/post/<%=post._id%>" className="small font-weight-bold">
        &laquo; Back to post permalink
      </Link>
      {/* action="/post/<%= post._id %>/edit" */}
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
            value="<%= post.title%>"
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
            post.body{" "}
          </Field>
        </div>

        {/* <input type="hidden" name="_csrf" value="<%= csrfToken %>" /> */}
        <button className="btn btn-primary">Save Updates</button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "editPost"
})(EditPost);
