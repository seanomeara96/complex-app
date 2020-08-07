import React from "react";

const AuthorPostControls = (props) => {
  if (props.true) {
    return (
      <span className="pt-2">
        {/* why is this edit button not working */}
        <a
          href="/post/<%= post._id %>/edit"
          className="text-primary mr-2"
          data-toggle="tooltip"
          data-placement="top"
          title="Edit"
        >
          <i className="fas fa-edit"></i>
        </a>
        <form
          className="delete-post-form d-inline"
          action="/post/<%= post._id %>/delete"
          method="POST"
        >
          <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
          <button
            className="delete-post-button text-danger"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <i class="fas fa-trash"></i>
          </button>
        </form>
      </span>
    );
  } else {
    return <div></div>;
  }
};

export default AuthorPostControls;
