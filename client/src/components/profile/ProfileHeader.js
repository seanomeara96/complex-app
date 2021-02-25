import React from "react";
import FollowButton from "../FollowButton";
import { connect } from "react-redux";
import PostFeed from "../posts/PostFeed";
import UserList from "./UserList";
import style from "./ProfileHeader.module.css";
import { getProfilePosts } from "../../actions/post-actions";
import {
  getProfileFollowers,
  getProfileFollowing,
} from "../../actions/follow-actions";
class ProfileHeader extends React.Component {
  state = { currentPage: "posts" };
  renderList() {
    if (this.state.currentPage === "posts") {
      return <PostFeed posts={this.props.posts} />;
    } else if (this.state.currentPage === "followers") {
      return <UserList users={this.props.followers} />;
    } else {
      return <UserList users={this.props.following} />;
    }
  }
  render() {
    return (
      <div>
        <h2>
          <img
            className={`avatar-small ${style.avatar}`}
            src={this.props.profileAvatar}
            alt="a users profile"
          />
          {this.props.profileUsername}
          {/* if user is logged in && !isVisitorsProfile */}
          {/* button changes based on following status */}
          <FollowButton />
        </h2>
        <div className="profile-nav nav nav-tabs pt-2 mb-4">
          <div
            onClick={() => {
              this.setState({ currentPage: "posts" });
              this.props.getProfilePosts(window.location.pathname);
            }}
            className={`profile-nav-link nav-item nav-link ${style.link} ${
              this.state.currentPage === "posts" ? "active" : ""
            }`}
          >
            Posts:{" "}
            {this.props.counts.postCount ? this.props.counts.postCount : "0"}{" "}
          </div>
          <div
            onClick={() => {
              this.setState({ currentPage: "followers" });
              this.props.getProfileFollowers(window.location.pathname);
            }}
            className={`profile-nav-link nav-item nav-link ${style.link} ${
              this.state.currentPage === "followers" ? "active" : ""
            }`}
          >
            Followers:{" "}
            {this.props.counts.followerCount
              ? this.props.counts.followerCount
              : "0"}
          </div>
          <div
            onClick={() => {
              this.setState({ currentPage: "following" });
              this.props.getProfileFollowing(window.location.pathname);
            }}
            className={`profile-nav-link nav-item nav-link ${style.link} ${
              this.state.currentPage === "following" ? "active" : ""
            }`}
          >
            Following:{" "}
            {this.props.counts.followingCount
              ? this.props.counts.followingCount
              : "0"}
          </div>
        </div>
        <div className="list-group">{this.renderList()}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.auth.auth, profileAvatar: state.profile.profileAvatar };
};
export default connect(mapStateToProps, {
  getProfileFollowers,
  getProfileFollowing,
  getProfilePosts,
})(ProfileHeader);
