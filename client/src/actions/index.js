import api from "../axios/config";
export const signIn = ({ username, password }) => {
  console.log(username, password);
  return async (dispatch) => {
    try {
      const response = await api.post("/login", {
        username,
        password,
      });
      console.log(response.data);
      dispatch({
        type: "SIGN_IN",
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: "PUSH_ERRORS",
        payload: ["There was a problem loggin you in"],
      });
    }
  };
};
export const signOut = () => {
  return async (dispatch) => {
    try {
      console.log("logging out");
      const response = await api.post("/logout", {});
      console.log(response);
      dispatch({
        type: "SIGN_OUT",
      });
    } catch (err) {
      dispatch({ type: "PUSH_ERRORS", payload: ["Error signing out."] });
    }
  };
};
export const registerUser = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/register", formValues);
      console.log("register user response data", response.data);
      dispatch({
        type: "SIGN_IN",
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: "PUSH_ERRORS",
        payload: ["Error registering user"],
      });
    }
  };
};
// This may need to be renamed in the future
export const posts = () => {
  // Payload should be an array of posts
  return async (dispatch) => {
    console.log("fetching posts...");
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
export const flashErrors = (payload) => {
  // Payload should be an array if errors
  return {
    type: "PUSH_ERRORS",
    payload,
  };
};
export const flashSuccesses = (payload) => {
  // Payload should be an array of successes
  return {
    type: "PUSH_SUCCESSES",
    payload,
  };
};
export const openChatBox = () => {
  return {
    type: "OPEN_BOX",
  };
};
export const closeChatBox = () => {
  return {
    type: "CLOSE_BOX",
  };
};

export const validateSession = () => {
  return async (dispatch) => {
    console.log("validating session");
    const response = await api.get("/");
    if (response.data !== {}) {
      dispatch({
        type: "SIGN_IN",
        payload: response.data,
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
export const getProfilePosts = (url) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`${url}/posts`);
      dispatch({
        type: "PROFILE_DEFAULT",
        payload: response.data,
      });
    } catch (err) {
      console.log("actions/index -> getProfilePosts", err);
      dispatch({
        type: "PUSH_ERRORS",
        payload: ["problem fetching profile data"],
      });
    }
  };
};
export const getProfileFollowers = (url) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`${url}/followers`);
      dispatch({
        type: "PROFILE_FOLLOWERS",
        payload: response.data,
      });
    } catch (err) {
      console.log("actions/index -> getProfileFollowers", err);
      dispatch({
        type: "PUSH_ERRORS",
        payload: ["problem fetching profile data"],
      });
    }
  };
};
export const getProfileFollowing = (url) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`${url}/following`);
      dispatch({
        type: "PROFILE_FOLLOWING",
        payload: response.data,
      });
    } catch (err) {
      console.log("actions/index -> getProfileFollowing", err);
      dispatch({
        type: "PUSH_ERRORS",
        payload: ["problem fetching profile data"],
      });
    }
  };
};
