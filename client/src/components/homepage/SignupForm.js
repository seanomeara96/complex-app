import React from "react";
import { Field, reduxForm } from "redux-form";

import SignupInputs from "./SignupInputs";

class SignupForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} id="registration-form">
        {/* output an array of error messages {errorMessages}*/}
        <div className="form-group">
          <label htmlFor="username-register" className="text-muted mb-1">
            <small>Username</small>
          </label>
          <Field
            component={SignupInputs}
            name="username"
            id="username-register"
            className="form-control"
            type="text"
            placeholder="Pick a username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email-register" className="text-muted mb-1">
            <small>Email</small>
          </label>
          <Field
            component={SignupInputs}
            name="email"
            id="email-register"
            className="form-control"
            type="text"
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password-register" className="text-muted mb-1">
            <small>Password</small>
          </label>
          <Field
            component={SignupInputs}
            name="password"
            id="password-register"
            className="form-control"
            type="password"
            placeholder="Create a password"
          />
        </div>

        <input type="hidden" name="_csrf" value={this.props.csrfToken} />
        <button
          type="submit"
          className="py-3 mt-4 btn btn-lg btn-success btn-block"
        >
          Sign up for OurApp
        </button>
      </form>
    );
  }
}
export default reduxForm({
  form: "signUp",
})(SignupForm);
