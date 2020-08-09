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
    const response = api.get("/");
    if (response.data !== {}) {
      dispatch({
        type: "SIGN_IN",
        payload: response.data,
      });
    }
  };
};
