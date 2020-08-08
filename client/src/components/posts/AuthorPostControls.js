import React from "react";
import { Link } from "react-router-dom";

const AuthorPostControls = (props) => {
  if (props.isViewerOwner === true) {
    return (
      <span className="pt-2">
        {/* why is this edit button not working */}
        <Link
          to={`/post/${props.postId}/edit`}
          className="text-primary mr-2"
          data-toggle="tooltip"
          data-placement="top"
          title="Edit"
        >
          <i className="fas fa-edit"></i>
        </Link>
        <form
          className="delete-post-form d-inline"
          action={`/post/${props.postId}/delete`}
          method="POST"
        >
          <input type="hidden" name="_csrf" value={props.csrfToken} />
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
