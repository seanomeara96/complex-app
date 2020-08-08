import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Flash from "../Flash";

class EditPost extends React.Component {
  componentDidMount() {
    // clear errors and successes
    // fetch post data
  }
  onSubmit = (formvalues) => {
    console.log("success");
    axios.post(`/post/${this.props.post._id}/edit`, formvalues).then(() => {
      return <Redirect to={`/post/${this.props.post._id}`} />;
    });
  };
  render() {
    if (this.props.user.userId === this.props.author.userId) {
      return (
        <div className="container py-md-5 container--narrow">
          <Flash errors={this.props.errors} successes={this.props.successes} />
          <Link
            to={`/post/${this.props.post._id}`}
            className="small font-weight-bold"
          >
            &laquo; Back to post permalink
          </Link>
        </div>
      );
    } else {
      <Redirect to="/" />;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.auth,
  };
};
export default connect(mapStateToProps)(EditPost);
