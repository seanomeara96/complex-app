import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AuthorPostControls from "../components/posts/AuthorPostControls";
import Flash from "../components/Flash";

import { fetchSinglePost } from "../actions/post-actions";
const SinglePostScreen = (props) => {
  const { fetchSinglePost } = props;
  useEffect(() => {
    if (props.post._id === "") {
      console.log("fetching post..");
      fetchSinglePost(window.location.pathname);
    }
  }, [fetchSinglePost, props.post._id]);
  if (props.post._id === "") {
    return (
      <div className="container py-md-5 container--narrow">loading...</div>
    );
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
export default connect(mapStateToProps, { fetchSinglePost })(SinglePostScreen);
