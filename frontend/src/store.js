import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import { profileGetReducer } from "./reducers/profileReducer";
import {
  getDiscussions,
  likeDiscussion,
  dislikeDiscussion,
  getDiscussionById,
  getDiscussionByCategory,
} from "./reducers/discussionReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userProfile: profileGetReducer,
  discussions: getDiscussions,
  discussionsByCat: getDiscussionByCategory,
  discussion: getDiscussionById,
  like: likeDiscussion,
  dislike: dislikeDiscussion,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userProfile: {},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
