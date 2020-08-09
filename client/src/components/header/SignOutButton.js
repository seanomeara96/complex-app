import React from "react";

import { reduxForm } from "redux-form";

const SignOutButton = (props) => {
  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)} className="d-inline">
      <input type="hidden" name="_csrf" value={props.csrfToken} />
      <button className="btn btn-sm btn-secondary">Sign Out</button>
    </form>
  );
};

export default reduxForm({
  // Name of form
  form: "signOut",
})(SignOutButton);
