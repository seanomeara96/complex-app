import React from "react";
import { Link } from "react-router-dom";

const UserBlock = (props) => {
  return (
    <Link
      to={`/profile/${props.followedUser.username}`}
      className="list-group-item list-group-item-action"
    >
      <img className="avatar-tiny" src={props.followedUser.avatar} />
      {props.followedUser.username}
    </Link>
  );
};

export default UserBlock;
