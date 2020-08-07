import React from "react";
import PostBlock from "./PostBlock";
const Profile = () => {
  return (
    <div className="container py-md-5 container--narrow">
      {/* <%- include('includes/flash')%> */}
      {/* <%- include('includes/profileShared')%> */}
      <div className="list-group">
        <PostBlock />
        {/* Output an array of postblocks */}
      </div>
    </div>
  );
};

export default Profile;
