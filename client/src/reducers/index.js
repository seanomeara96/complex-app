import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from './postsReducer';
import { reducer as formReducer } from "redux-form";
import flashReducer from "./flashReducer";
import chatReducer from "./chatReducer";
export default combineReducers({
  // reducers go here
  chatBox: chatReducer,
  auth: authReducer,
  posts: postsReducer,
  flash: flashReducer,
  form: formReducer,
});
