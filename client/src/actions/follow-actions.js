import api from "../axios/config";
export const getProfileFollowers = (url) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`${url}/followers`);
      dispatch({
        type: "PROFILE_FOLLOWERS",
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
export const getProfileFollowing = (url) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`${url}/following`);
      dispatch({
        type: "PROFILE_FOLLOWING",
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
export const startFollowing = (followeeUsername) => {
  return async (dispatch) => {
    await api.post(`/addFollow/${followeeUsername}`, {});
    let response = await api.get(`/profile/${followeeUsername}/posts`);
    dispatch({
      type: "UPDATE_FOLLOW_STATUS",
      payload: response.data.isFollowing,
    });
  };
};
export const stopFollowing = (followeeUsername) => {
  return async (dispatch) => {
    await api.post(`/removeFollow/${followeeUsername}`, {});
    let response = await api.get(`/profile/${followeeUsername}/posts`);
    dispatch({
      type: "UPDATE_FOLLOW_STATUS",
      payload: response.data.isFollowing,
    });
  };
};
