import React from "react";

const UserBlock = () => {
  return (
    <a
      href="/profile/<%= followedUser.username %>"
      className="list-group-item list-group-item-action"
    >
      <img className="avatar-tiny" src="<%= followedUser.avatar%>" />
      followedUser.username
    </a>
  );
};

export default UserBlock;
