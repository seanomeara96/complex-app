import React from "react";
import { Field, reduxForm } from "redux-form";
import LoginInputs from "./LoginInputs";
const UserLoggedOut = (props) => {
  return (
    <form
      onSubmit={props.handleSubmit(props.signIn)}
      className="mb-0 pt-2 pt-md-0"
    >
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <Field
            component={LoginInputs}
            name="username"
            className="form-control form-control-sm input-dark"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <Field
            component={LoginInputs}
            name="password"
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="col-md-auto">
          <input type="hidden" name="_csrf" value={props.csrfToken} />
          <button className="btn btn-primary btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  // Name of form
  form: "logIn",
})(UserLoggedOut);
