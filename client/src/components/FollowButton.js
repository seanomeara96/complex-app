import React from "react";
import { connect } from "react-redux";

import { startFollowing, stopFollowing } from "../actions/follow-actions";

const FollowButton = (props) => {
  if (props.profile.isVisitorsProfile) {
    return <div></div>;
  }
  if (props.profile.isFollowing) {
    return (
      <form
        className="ml-2 d-inline"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(props.profile.profileUsername);
          props.stopFollowing(props.profile.profileUsername);
        }}
      >
        {/**<input type="hidden" name="_csrf" value="<%= csrfToken %>" /> */}
        <button className="btn btn-danger btn-sm">
          Stop Following{" "}
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="user-times"
            className="svg-inline--fa fa-user-times fa-w-20"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path
              fill="currentColor"
              d="M589.6 240l45.6-45.6c6.3-6.3 6.3-16.5 0-22.8l-22.8-22.8c-6.3-6.3-16.5-6.3-22.8 0L544 194.4l-45.6-45.6c-6.3-6.3-16.5-6.3-22.8 0l-22.8 22.8c-6.3 6.3-6.3 16.5 0 22.8l45.6 45.6-45.6 45.6c-6.3 6.3-6.3 16.5 0 22.8l22.8 22.8c6.3 6.3 16.5 6.3 22.8 0l45.6-45.6 45.6 45.6c6.3 6.3 16.5 6.3 22.8 0l22.8-22.8c6.3-6.3 6.3-16.5 0-22.8L589.6 240zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
            ></path>
          </svg>
        </button>
      </form>
    );
  } else {
    return (
      <form
        className="ml-2 d-inline"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(props.profile.profileUsername);
          props.startFollowing(props.profile.profileUsername);
        }}
      >
        {/**<input type="hidden" name="_csrf" value="<%= csrfToken %>" /> */}
        <button className="btn btn-primary btn-sm">
          Follow{" "}
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="user-plus"
            className="svg-inline--fa fa-user-plus fa-w-20"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path
              fill="currentColor"
              d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
            ></path>
          </svg>
        </button>
      </form>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};
export default connect(mapStateToProps, {
  startFollowing,
  stopFollowing,
})(FollowButton);
