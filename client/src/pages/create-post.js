import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CreatePostForm from "../components/posts/CreatePostForm";
import Flash from "../components/Flash";
import { createPost } from "../actions";
const CreatePost = (props) => {
  const onSubmit = (formValues) => {
    getLocation().then((location) => {
      props.createPost({
        ...formValues,
        userId: props.auth.auth._id,
        location,
      });
    });
  };
  return props.auth.isSignedIn === true ? (
    <div className="container py-md-5 container--narrow">
      <Flash />
      <CreatePostForm onSubmit={onSubmit} csrfToken={props.csrfToken} />
    </div>
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    form: state.form.createPost,
    csrfToken: state.csrfToken,
  };
};

export default connect(mapStateToProps, { createPost })(CreatePost);

function getLocation() {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          lat: coords.latitude,
          long: coords.longitude,
        });
      },
      (err) => reject(err)
    );
  });
}
