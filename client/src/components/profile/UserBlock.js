import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfilePosts } from "../../actions/post-actions";
const UserBlock = ({ username, avatar, getProfilePosts }) => {
  return (
    <Link
      to={`/profile/${username}`}
      className="list-group-item list-group-item-action"
      onClick={() => {
        getProfilePosts(`/profile/${username}`);
      }}
    >
      <img className="avatar-tiny" alt="tiny avatar" src={avatar} />
      {username}
    </Link>
  );
};

export default connect(null, { getProfilePosts })(UserBlock);
