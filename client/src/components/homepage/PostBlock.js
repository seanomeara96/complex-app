import React from "react";
import { Link } from "react-router-dom";
const createdDate = new Date();
const PostBlock = (props) => {
  return (
    <Link
      to={"/post/" + props.userId}
      className="list-group-item list-group-item-action"
    >
      <img
        alt="small avatar"
        className="avatar-tiny"
        src="https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80"
      />
      <strong>{props.title ? props.title : "title"}</strong>{" "}
      {createdDate.toString()}
    </Link>
  );
};

export default PostBlock;
