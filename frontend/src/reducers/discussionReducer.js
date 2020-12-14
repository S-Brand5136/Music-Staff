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
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_CLEAR,
  CREATE_COMMENT_CLOSE,
  FLAG_COMMENT_REQUEST,
  FLAG_COMMENT_SUCCESS,
  FLAG_COMMENT_FAIL,
  FLAG_DISCUSSION_REQUEST,
  FLAG_DISCUSSION_SUCCESS,
  FLAG_DISCUSSION_FAIL,
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

export const createComment = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return { loading: true, open: true };
    case CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true, open: false };
    case CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_COMMENT_CLOSE:
      return { loading: false, open: false };
    default:
      return state;
  }
};

export const deleteComment = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true };
    case DELETE_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_COMMENT_CLEAR:
      return { loading: false, success: false, reload: true };
    default:
      return state;
  }
};

export const flagComment = (state = {}, action) => {
  switch (action.type) {
    case FLAG_COMMENT_REQUEST:
      return { loading: true };
    case FLAG_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case FLAG_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const flagDiscussion = (state = {}, action) => {
  switch (action.type) {
    case FLAG_DISCUSSION_REQUEST:
      return { loading: true };
    case FLAG_DISCUSSION_SUCCESS:
      return { loading: false, success: true };
    case FLAG_DISCUSSION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
