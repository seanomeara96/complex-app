import api from "../axios/config";
// This may need to be renamed in the future
export const fetchPosts = () => {
  console.log("fetch posts action performed");
  // Payload should be an array of posts
  return async (dispatch) => {
    try {
      let posts = await api.get("/posts");
      dispatch({
        type: "POSTS",
        payload: posts.data,
      });
    } catch (err) {
      dispatch({
        type: "PUSH_ERRORS",
        payload: ["Error fetching posts"],
      });
    }
  };
};

export const createPost = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/create-post", formValues);
      const { data } = response.data;
      dispatch({
        type: "SET_POST",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "PUSH_ERRORS",
        payload: ["there was a problem creating this post"],
      });
    }
  };
};
export const setPost = (post) => {
  return {
    type: "SET_POST",
    payload: post,
  };
};
export const fetchSinglePost = (url) => {
  return async (dispatch) => {
    try {
      let response = await api.get(`${url}`);
      dispatch({
        type: "SET_POST",
        payload: response.data.post,
      });
    } catch (err) {
      dispatch({
        type: "PUSH_ERRORS",
        payload: ["there was a problem fetching this post"],
      });
    }
  };
};
export const getProfilePosts = (url) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`${url}/posts`);
      dispatch({
        type: "PROFILE_DEFAULT",
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: "PUSH_ERRORS",
        payload: ["problem fetching profile data"],
      });
    }
  };
};
