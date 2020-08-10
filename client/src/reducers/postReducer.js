const INITIAL_STATE = {
  post: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_POST":
      return { ...state, post: action.payload };
    default:
      return { ...state };
  }
};
