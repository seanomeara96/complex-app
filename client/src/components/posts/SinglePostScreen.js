import React from "react";
import AuthorPostControls from "./AuthorPostControls";
import Flash from "../Flash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const SinglePostScreen = (props) => {
  return (
    <div className="container py-md-5 container--narrow">
      <Flash errors={props.errors} successes={props.successes} />
      <div className="d-flex justify-content-between">
        <h2>{props.post.title}</h2>
        <AuthorPostControls
          isViewerOwner={
            props.post.author.userId === props.user.userId ? true : false
          }
          postId={props.post._id}
          csrfToken={props.csrfToken}
        />
      </div>
      <p className="text-muted small mb-4">
        <Link to={`/profile/${props.post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by{" "}
        <Link to={`/profile/${props.post.author.username}`}>
          {props.post.author.username}
        </Link>
        on {props.post.createdDate}
      </p>
      <div className="body-content">
        {props.post.body}
        {/* <%- filterUserHTML(post.body) %> */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.auth,
    csrfToken: state.csrfToken,
  };
};
export default connect(mapStateToProps)(SinglePostScreen);
