export default (state = false, action) => {
  switch (action.type) {
    case "OPEN_BOX":
      return true;
    case "CLOSE_BOX":
      return false;
    default:
      return state;
  }
};
