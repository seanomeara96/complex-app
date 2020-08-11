import React from "react";
import AuthorPostControls from "./AuthorPostControls";
import Flash from "../Flash";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const SinglePostScreen = (props) => {
  if (props.post._id === "") {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container py-md-5 container--narrow">
        <Flash errors={props.errors} successes={props.successes} />
        <div className="d-flex justify-content-between">
          <h2>{props.post.title}</h2>
          <AuthorPostControls
            isViewerOwner={props.post.isVisitorOwner}
            postId={props.post._id}
            csrfToken={props.csrfToken}
          />
        </div>
        <p className="text-muted small mb-4">
          <Link to={`/profile/${props.post.author.username}`}>
            <img
              className="avatar-tiny"
              alt="tiny avatar"
              src={props.post.author.avatar}
            />
          </Link>
          Posted by{" "}
          <Link to={`/profile/${props.post.author.username}`}>
            {props.post.author.username}
          </Link>{" "}
          on {props.post.createdDate}
        </p>
        <div className="body-content">
          {props.post.body}
          {/* <%- filterUserHTML(post.body) %> */}
        </div>
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.auth,
    csrfToken: state.csrfToken,
  };
};
export default connect(mapStateToProps)(SinglePostScreen);
