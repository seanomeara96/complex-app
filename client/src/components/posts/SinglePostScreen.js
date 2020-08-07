import React from "react";
import AuthorPostControls from "./AuthorPostControls";

const SinglePostScreen = () => {
  return (
    <div className="container py-md-5 container--narrow">
      {/* <%- include('includes/flash')%> */}
      <div className="d-flex justify-content-between">
        <h2>Post Title Goes Here</h2>
        <AuthorPostControls />
      </div>
      <p className="text-muted small mb-4">
        <a href="/profile/<%= post.author.username %>">
          <img className="avatar-tiny" src="<%= post.author.avatar %>" />
        </a>
        Posted by{" "}
        <a href="/profile/<%= post.author.username %>">post.author.username</a>
        on DD/MM/YYYY
      </p>
      <div className="body-content">
        post.body
        {/* <%- filterUserHTML(post.body) %> */}
      </div>
    </div>
  );
};

export default SinglePostScreen;
