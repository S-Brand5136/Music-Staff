import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  adminGetUsersReducer,
  adminDeleteUserReducer,
} from "./reducers/userReducer";
import {
  getProfileReducer,
  getProfileByIdReducer,
  updateProfileReducer,
} from "./reducers/profileReducer";
import {
  getDiscussions,
  getDiscussionById,
  setCategory,
  createComment,
  deleteComment,
  flagComment,
  flagDiscussion,
  createDiscussion,
  deleteDiscussion,
} from "./reducers/discussionReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userProfile: getProfileReducer,
  userProfileById: getProfileByIdReducer,
  userList: adminGetUsersReducer,
  adminDeleteUser: adminDeleteUserReducer,
  updateProfile: updateProfileReducer,
  discussions: getDiscussions,
  discussion: getDiscussionById,
  deleteDiscussion: deleteDiscussion,
  createDiscussion: createDiscussion,
  category: setCategory,
  createComment: createComment,
  deleteComment: deleteComment,
  flagComment: flagComment,
  flagDiscussion: flagDiscussion,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
