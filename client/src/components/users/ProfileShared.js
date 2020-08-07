import React from "react";
import ProfileInteraction from "./ProfileInteraction";
import ProfileRelationships from "./ProfileRelationships";

const ProfileShared = () => {
  return (
    <div>
      <ProfileInteraction />
      <ProfileRelationships />
    </div>
  );
};

export default ProfileShared;
