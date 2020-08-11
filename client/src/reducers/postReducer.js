const INITIAL_STATE = {
  _id: "",
  title: "",
  body: "",
  createdDate: undefined,
  authorId: undefined,
  author: {
    username: "",
    avatar: "",
  },
  isVisitorOwner: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_POST":
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};
