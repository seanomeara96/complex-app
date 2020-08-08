import React from "react";
import ProfileInteraction from "./ProfileInteraction";
import ProfileRelationships from "./ProfileRelationships";

const ProfileShared = () => {
  return (
    <React.Fragment>
      <ProfileInteraction />
      <ProfileRelationships />
    </React.Fragment>
  );
};

export default ProfileShared;
