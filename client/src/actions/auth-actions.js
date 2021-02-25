import api from "../axios/config";
export function signIn({ username, password }) {
  console.log("sign in action performed");
  return async (dispatch) => {
    try {
      const response = await api.post("/login", {
        username,
        password,
      });

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
}

export const signOut = () => {
  console.log("sign out action performed");
  return async (dispatch) => {
    try {
      await api.post("/logout", {});
      dispatch({
        type: "SIGN_OUT",
      });
    } catch (err) {
      dispatch({ type: "PUSH_ERRORS", payload: ["Error signing out."] });
    }
  };
};

export const registerUser = (formValues) => {
  console.log("regitration action performed");
  return async (dispatch) => {
    try {
      const response = await api.post("/register", formValues);
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

export const validateSession = () => {
  console.log("session validation action performed");
  return async (dispatch) => {
    const response = await api.get("/");
    if (response.data !== {}) {
      dispatch({
        type: "SIGN_IN",
        payload: response.data,
      });
    }
  };
};
