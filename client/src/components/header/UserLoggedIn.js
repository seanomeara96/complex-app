import React from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import styles from "./UserLoggedIn.module.css";
const UserLoggedIn = (props) => {
  return (
    <div className="flex-row my-3 my-md-0">
      <i
        className="text-white mr-2 header-search-icon"
        title="Search"
        data-toggle="tooltip"
        data-placement="bottom"
      >
        <i className="fas fa-search"></i>
      </i>
      <span
        className="text-white mr-2 header-chat-icon"
        title="Chat"
        data-toggle="tooltip"
        data-placement="bottom"
        onClick={props.engageChat}
      >
        <i className="fas fa-comment"></i>
      </span>
      <Link to="/profile/:id" className="mr-2">
        <img
          title="My Profile"
          alt="profile pic"
          data-toggle="tooltip"
          data-placement="bottom"
          className={styles.avatar}
          src="https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80"
        />
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <form onSubmit={props.handleSubmit(props.signOut)} className="d-inline">
        {/* <input type="hidden" name="_csrf" value="<%= csrfToken %>" /> */}
        <button className="btn btn-sm btn-secondary">Sign Out</button>
      </form>
    </div>
  );
};

export default reduxForm({
  // Name of form
  form: "logOut",
})(UserLoggedIn);
