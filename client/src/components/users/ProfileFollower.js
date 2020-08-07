import React from "react";
import UserBlock from "./UserBlock";

const ProfileFollower = () => {
  return (
    <div className="container py-md-5 container--narrow">
      {/* <%- include('includes/flash')%> */}
      {/* <%- include('includes/profileShared')%> */}
      <div className="list-group">
        {/* output an array of user-blocks */}
        <UserBlock />
      </div>
    </div>
  );
};

export default ProfileFollower;
