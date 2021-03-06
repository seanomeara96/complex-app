const INITIAL_STATE = {
  currentPage: "",
  posts: [],
  followers: [],
  following: [],
  profileUsername: "loading...",
  profileAvatar: "",
  isFollowing: false,
  isVisitorsProfile: false,
  counts: {
    postCount: 0,
    followerCount: 0,
    followingCount: 0,
  },
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PROFILE_DEFAULT":
      return {
        ...state,
        ...action.payload,
      };
    case "PROFILE_FOLLOWERS":
      return {
        ...state,
        ...action.payload,
      };
    case "PROFILE_FOLLOWING":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_FOLLOW_STATUS":
      return {
        ...state,
        isFollowing: action.payload,
      };
    default:
      return { ...state };
  }
};
