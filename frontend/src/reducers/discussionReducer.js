import {
  DISCUSSION_GET_SUCCESS,
  DISCUSSION_GET_REQUEST,
  DISCUSSION_GET_FAIL,
  DISCUSSION_GET_BY_ID_REQUEST,
  DISCUSSION_GET_BY_ID_SUCCESS,
  DISCUSSION_GET_BY_ID_FAIL,
  SET_CATEGORY_REQUEST,
  SET_CATEGORY_SUCCESS,
  SET_CATEGORY_FAIL,
} from "../constants/discussionConstants";

export const getDiscussions = (state = { discussionList: [] }, action) => {
  switch (action.type) {
    case DISCUSSION_GET_REQUEST:
      return { loading: true };
    case DISCUSSION_GET_SUCCESS:
      return { loading: false, discussionList: action.payload };
    case DISCUSSION_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getDiscussionById = (state = { discussion: {} }, action) => {
  switch (action.type) {
    case DISCUSSION_GET_BY_ID_REQUEST:
      return { loading: true };
    case DISCUSSION_GET_BY_ID_SUCCESS:
      return { loading: false, discussion: action.payload };
    case DISCUSSION_GET_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setCategory = (state = { category: {} }, action) => {
  switch (action.type) {
    case SET_CATEGORY_REQUEST:
      return { loading: true };
    case SET_CATEGORY_SUCCESS:
      return { loading: false, category: action.payload };
    case SET_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
