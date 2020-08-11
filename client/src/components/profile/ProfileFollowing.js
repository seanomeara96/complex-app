import React from "react";
import UserBlock from "./USerBlock";
import Flash from "../Flash";
import ProfileShared from "./ProfileShared";

const ProfileFollowing = () => {
  return (
    <div className="container py-md-5 container--narrow">
      <Flash />
      <ProfileShared />
      <div className="list-group">
        {/* Output an array of user blocks */}
        <UserBlock />
      </div>
    </div>
  );
};

export default ProfileFollowing;
