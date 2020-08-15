import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserLoggedIn.module.css";
import Search from "../Search";
import SignOutButton from "./SignOutButton";
import { connect } from "react-redux";
import { signOut } from "../../actions";
const UserLoggedIn = (props) => {
  const onSubmit = () => {
    props.signOut();
  };

  return (
    <div className="flex-row my-3 my-md-0">
      <i
        className="text-white mr-2 header-search-icon"
        title="Search"
        data-toggle="tooltip"
        data-placement="bottom"
        onClick={props.handleClick}
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
      <Link to={`/profile/${props.user.username}`} className="mr-2">
        <img
          title="My Profile"
          alt="profile pic"
          data-toggle="tooltip"
          data-placement="bottom"
          className={styles.avatar}
          src={props.user.avatar}
        />
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <SignOutButton csrfToken={props.csrfToken} onSubmit={onSubmit} />
      <Search open={props.searchIsOpen} toggleSearchModal={props.handleClick} />
    </div>
  );
};
const mapstateToProps = (state) => {
  return { csrfToken: state.csrfToken, user: state.auth.auth };
};
export default connect(mapstateToProps, { signOut })(UserLoggedIn);
