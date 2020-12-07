import {
  DISCUSSION_DISLIKE_FAIL,
  DISCUSSION_DISLIKE_REQUEST,
  DISCUSSION_DISLIKE_SUCCESS,
  DISCUSSION_GET_BY_CATEGORY_FAIL,
  DISCUSSION_GET_BY_CATEGORY_REQUEST,
  DISCUSSION_GET_BY_CATEGORY_SUCCESS,
  DISCUSSION_GET_BY_ID_FAIL,
  DISCUSSION_GET_BY_ID_REQUEST,
  DISCUSSION_GET_BY_ID_SUCCESS,
  DISCUSSION_GET_FAIL,
  DISCUSSION_GET_REQUEST,
  DISCUSSION_GET_SUCCESS,
  DISCUSSION_LIKE_FAIL,
  DISCUSSION_LIKE_REQUEST,
  DISCUSSION_LIKE_SUCCESS,
} from "../constants/discussionConstants";
import axios from "axios";

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

export const getDiscussionById = (discussion) => async (dispatch) => {
  try {
    dispatch({
      type: DISCUSSION_GET_BY_ID_REQUEST,
    });

    const { data } = await axios.get(`/api/discussions/${discussion._id}`);

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

export const getDiscussionsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: DISCUSSION_GET_BY_CATEGORY_REQUEST,
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

    console.log(data);

    dispatch({
      type: DISCUSSION_GET_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCUSSION_GET_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likeDiscussion = (discussion) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISCUSSION_LIKE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/discussions/like/${discussion._id}`, {}, config);

    dispatch({
      type: DISCUSSION_LIKE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DISCUSSION_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const dislikeDiscussion = (discussion) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISCUSSION_DISLIKE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/discussions/dislike/${discussion._id}`, {}, config);

    dispatch({
      type: DISCUSSION_DISLIKE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DISCUSSION_DISLIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
