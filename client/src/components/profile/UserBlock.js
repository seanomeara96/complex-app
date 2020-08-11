import React from "react";
import { Link } from "react-router-dom";

const UserBlock = ({ username, avatar }) => {
  return (
    <Link
      to={`/profile/${username}`}
      className="list-group-item list-group-item-action"
    >
      <img className="avatar-tiny" alt="tiny avatar" src={avatar} />
      {username}
    </Link>
  );
};

export default UserBlock;
