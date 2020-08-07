import React from "react";

const ProfileInteraction = () => {
  return (
    <h2>
      <img className="avatar-small" src="<%=profileAvatar%>" />
      profileUsername
      {/* if user is logged in && !isVisitorsProfile */}
      {/* button changes based on following status */}
      <FollowButton following="false" />
    </h2>
  );
};

export default ProfileInteraction;
