import React from "react";
import UserBlock from "./USerBlock";

const ProfileFollowing = () => {
  return (
    <div className="container py-md-5 container--narrow">
      {/* <%- include('includes/flash')%> */}
      {/* <%- include('includes/profileShared')%> */}
      <div className="list-group">
        {/* Output an array of user blocks */}
        <UserBlock />
      </div>
    </div>
  );
};

export default ProfileFollowing;
