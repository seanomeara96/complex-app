const INITIAL_STATE = {
  errors: [],
  successes: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PUSH_ERRORS":
      return { ...state, errors: action.payload };
    case "PUSH_SUCCESSES":
      return { ...state, successes: action.payload };
    default:
      return state;
  }
};
