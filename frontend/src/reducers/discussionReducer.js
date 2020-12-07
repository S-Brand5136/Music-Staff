import {
  DISCUSSION_GET_SUCCESS,
  DISCUSSION_GET_REQUEST,
  DISCUSSION_GET_FAIL,
  DISCUSSION_LIKE_REQUEST,
  DISCUSSION_LIKE_SUCCESS,
  DISCUSSION_LIKE_FAIL,
  DISCUSSION_DISLIKE_REQUEST,
  DISCUSSION_DISLIKE_SUCCESS,
  DISCUSSION_DISLIKE_FAIL,
  DISCUSSION_GET_BY_ID_REQUEST,
  DISCUSSION_GET_BY_ID_SUCCESS,
  DISCUSSION_GET_BY_ID_FAIL,
  DISCUSSION_GET_BY_CATEGORY_REQUEST,
  DISCUSSION_GET_BY_CATEGORY_SUCCESS,
  DISCUSSION_GET_BY_CATEGORY_FAIL,
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

export const getDiscussionByCategory = (
  state = { discussionsByCategory: {} },
  action
) => {
  switch (action.type) {
    case DISCUSSION_GET_BY_CATEGORY_REQUEST:
      return { loading: true };
    case DISCUSSION_GET_BY_CATEGORY_SUCCESS:
      return { loading: false, discussionsByCategory: action.payload };
    case DISCUSSION_GET_BY_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const likeDiscussion = (state = {}, action) => {
  switch (action.type) {
    case DISCUSSION_LIKE_REQUEST:
      return { loading: true };
    case DISCUSSION_LIKE_SUCCESS:
      return { loading: false, success: true };
    case DISCUSSION_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const dislikeDiscussion = (state = {}, action) => {
  switch (action.type) {
    case DISCUSSION_DISLIKE_REQUEST:
      return { loading: true };
    case DISCUSSION_DISLIKE_SUCCESS:
      return { loading: false, success: true };
    case DISCUSSION_DISLIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
