const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isSignedIn: true };
    case "SIGN_OUT":
      return { ...state, isSignedIn: null };
    default:
      return state;
  }
};
