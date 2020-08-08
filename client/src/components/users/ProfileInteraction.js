import React from "react";

const ProfileInteraction = (props) => {
  return (
    <h2>
      <img className="avatar-small" src={props.profileAvatar} />
      {props.profileUsername}
      {/* if user is logged in && !isVisitorsProfile */}
      {/* button changes based on following status */}
      <FollowButton following="false" />
    </h2>
  );
};

export default ProfileInteraction;
