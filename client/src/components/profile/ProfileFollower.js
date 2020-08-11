import React from "react";
import ProfileShared from "./ProfileShared";
import Flash from "../Flash";
import UserList from "./UserList";
const ProfileFollower = () => {
  return (
    <div className="container py-md-5 container--narrow">
      <Flash />
      <ProfileShared />
      <div className="list-group">
        <UserList />
      </div>
    </div>
  );
};

export default ProfileFollower;
