import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";
import postReducer from "./postReducer";
import { reducer as formReducer } from "redux-form";
import flashReducer from "./flashReducer";
import chatReducer from "./chatReducer";
import profileReducer from "./profileReducer";
export default combineReducers({
  // reducers go here
  chatBox: chatReducer,
  auth: authReducer,
  posts: postsReducer,
  post: postReducer,
  flash: flashReducer,
  form: formReducer,
  profile: profileReducer,
});
