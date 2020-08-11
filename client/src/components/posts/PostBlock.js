import React from "react";
import { Link } from "react-router-dom";
const createdDate = new Date(); // temporary
const PostBlock = ({ postId, title, avatar }) => {
  return (
    <Link
      to={`/post/${postId}`}
      className="list-group-item list-group-item-action"
    >
      <img alt="small avatar" className="avatar-tiny" src={avatar} />
      <strong>{title ? title : "No Title"}</strong>{" "}
      {createdDate.toString() /* temporary: remove later */}
    </Link>
  );
};

export default PostBlock;
