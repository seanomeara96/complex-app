import React from "react";

const FollowButton = () => {
  if (false) {
    return (
      <form
        className="ml-2 d-inline"
        action="/removeFollow/<%=profileUsername%>"
        method="POST"
      >
        <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
        <button className="btn btn-danger btn-sm">
          Stop Following <i className="fas fa-user-times"></i>
        </button>
      </form>
    );
  } else {
    return (
      <form
        className="ml-2 d-inline"
        action="/addFollow/<%=profileUsername%>"
        method="POST"
      >
        <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
        <button className="btn btn-primary btn-sm">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </form>
    );
  }
};

export default FollowButton;
