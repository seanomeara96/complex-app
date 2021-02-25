import React from "react";
import { connect } from "react-redux";
import SignupForm from "./SignupForm";
import Flash from "../Flash";
import { registerUser } from "../../actions/auth-actions";
class GuestHome extends React.Component {
  onSubmit = async (data) => {
    this.props.registerUser(data);
  };
  render() {
    return (
      <div className="container py-md-5">
        <Flash />
        <div className="row align-items-center">
          <div className="col-lg-7 py-3 py-md-5">
            <h1 className="display-3">Remember Writing?</h1>
            <p className="lead text-muted">
              Are you sick of short tweets and impersonal &ldquo;shared&rdquo;
              posts that are reminiscent of the late 90&rsquo;s email forwards?
              We believe getting back to actually writing is the key to enjoying
              the internet again.
            </p>
          </div>
          <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
            <SignupForm
              csrfToken={this.props.csrfToken}
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    csrfToken: state.csrfToken,
  };
};
export default connect(mapStateToProps, { registerUser })(GuestHome);
