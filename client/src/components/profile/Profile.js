import React from "react";
import Flash from "../Flash";
import ProfileHeader from "./ProfileHeader";
import { connect } from "react-redux";
import { getProfilePosts } from "../../actions";
import { Redirect } from "react-router-dom";
import ErrorPage from "../404";
class Profile extends React.Component {
  componentDidMount() {
    if (window.location.pathname.includes("profile")) {
      this.props.getProfilePosts(window.location.pathname);
    }
  }

  render() {
    if (this.props.auth.isSignedIn === false) {
      return <Redirect to="/" />;
    } else {
      if (this.props.profile.profileUsername === "") {
        return <ErrorPage />;
      } else {
        return (
          <div className="container py-md-5 container--narrow">
            <Flash />
            <ProfileHeader
              counts={this.props.profile.counts}
              profileUsername={this.props.profile.profileUsername}
              posts={this.props.profile.posts}
              followers={this.props.profile.followers}
              following={this.props.profile.following}
            />
          </div>
        );
      }
    }
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.auth.auth,
    profile: state.profile,
    selectedProfile: state.selectedProfile,
  };
};
export default connect(mapStateToProps, { getProfilePosts })(Profile);
