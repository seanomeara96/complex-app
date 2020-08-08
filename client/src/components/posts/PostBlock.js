import React from "react";
import { Link } from "react-router-dom";
const createdDate = new Date(); // temporary
const PostBlock = ({ userId, title }) => {
  return (
    <Link
      to={`/post/${userId}`}
      className="list-group-item list-group-item-action"
    >
      <img
        alt="small avatar"
        className="avatar-tiny"
        src="https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80"
      />
      <strong>{title ? title : "No Title"}</strong>{" "}
      {createdDate.toString() /* temporary: remove later */}
    </Link>
  );
};

export default PostBlock;
