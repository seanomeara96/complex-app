import React from "react";
import PostFeed from "../PostFeed";
import Flash from "../Flash";
import ProfileShared from "./ProfileShared";
const Profile = () => {
  return (
    <div className="container py-md-5 container--narrow">
      <Flash />
      <ProfileShared />
      <div className="list-group">
        <PostFeed />
      </div>
    </div>
  );
};

export default Profile;
