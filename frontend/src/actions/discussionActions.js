import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_CLEAR,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DISCUSSION_GET_BY_ID_FAIL,
  DISCUSSION_GET_BY_ID_REQUEST,
  DISCUSSION_GET_BY_ID_SUCCESS,
  DISCUSSION_GET_FAIL,
  DISCUSSION_GET_REQUEST,
  DISCUSSION_GET_SUCCESS,
  FLAG_COMMENT_REQUEST,
  FLAG_COMMENT_SUCCESS,
  FLAG_DISCUSSION_FAIL,
  FLAG_DISCUSSION_REQUEST,
  FLAG_DISCUSSION_SUCCESS,
  SET_CATEGORY_FAIL,
  SET_CATEGORY_REQUEST,
  SET_CATEGORY_SUCCESS,
} from "../constants/discussionConstants";
import axios from "axios";
import { AccordionSummary } from "@material-ui/core";

export const getDiscussions = () => async (dispatch) => {
  try {
    dispatch({
      type: DISCUSSION_GET_REQUEST,
    });

    const { data } = await axios.get("/api/discussions");

    dispatch({
      type: DISCUSSION_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCUSSION_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDiscussionsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: DISCUSSION_GET_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/discussions/cat/${category}`,
      config
    );

    dispatch({
      type: DISCUSSION_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCUSSION_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDiscussionsBySearch = (search) => async (dispatch) => {
  try {
    dispatch({
      type: DISCUSSION_GET_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/discussions/search/${search}`,
      config
    );

    dispatch({
      type: DISCUSSION_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCUSSION_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDiscussionById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DISCUSSION_GET_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/discussions/${id}`, config);

    dispatch({
      type: DISCUSSION_GET_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCUSSION_GET_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: SET_CATEGORY_REQUEST,
    });

    dispatch({
      type: SET_CATEGORY_SUCCESS,
      payload: category,
    });
  } catch (error) {
    dispatch({
      type: SET_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createComment = (text, id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/discussions/${id}/comments`, { text }, config);

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteComment = (commentId, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_COMMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/discussions/${id}/comments/${commentId}`, config);

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
    });

    setTimeout(() => {
      dispatch({ type: DELETE_COMMENT_CLEAR });
    }, 3000);
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const flagComment = (commentId, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FLAG_COMMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/discussions/${id}/flag/comment/${commentId}`, config);

    dispatch({
      type: FLAG_COMMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const flagDiscussion = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FLAG_DISCUSSION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/discussions/flag/${id}`, config);

    dispatch({
      type: FLAG_DISCUSSION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FLAG_DISCUSSION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
