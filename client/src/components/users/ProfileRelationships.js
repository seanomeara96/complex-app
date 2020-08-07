import React from "react";

const ProfileRelationships = () => {
  return (
    <div className="profile-nav nav nav-tabs pt-2 mb-4">
      <a
        href="/profile/<%=profileUsername%>"
        className="profile-nav-link nav-item nav-link <%if(currentPage == 'posts'){%>active<%}%>"
      >
        Posts: counts.postCount{" "}
      </a>
      <a
        href="/profile/<%=profileUsername%>/followers"
        className="profile-nav-link nav-item nav-link <%if(currentPage == 'followers'){%>active<%}%> "
      >
        Followers: counts.followerCount
      </a>
      <a
        href="/profile/<%=profileUsername%>/following"
        className="profile-nav-link nav-item nav-link <%if(currentPage == 'following'){%>active<%}%>"
      >
        Following: counts.followingCount
      </a>
    </div>
  );
};

export default ProfileRelationships;
