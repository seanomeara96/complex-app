import React from "react";
import { Link } from "react-router-dom";

const ProfileRelationships = (props) => {
  let currentPage;
  return (
    <div className="profile-nav nav nav-tabs pt-2 mb-4">
      <Link
        to={`/profile/${props.profileUsername}`}
        className={`profile-nav-link nav-item nav-link ${
          currentPage === "posts" ? "active" : ""
        }`}
      >
        Posts: {props.counts.postCount}{" "}
      </Link>
      <Link
        to={`/profile/${props.profileUsername}/followers`}
        className={`profile-nav-link nav-item nav-link ${
          currentPage === "followers" ? "active" : ""
        }`}
      >
        Followers: {props.counts.followerCount}
      </Link>
      <Link
        to={`/profile/${props.profileUsername}/following`}
        className={`profile-nav-link nav-item nav-link ${
          currentPage === "following" ? "active" : ""
        }`}
      >
        Following: {props.counts.followingCount}
      </Link>
    </div>
  );
};

export default ProfileRelationships;
