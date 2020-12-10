import {
  DISCUSSION_GET_BY_ID_FAIL,
  DISCUSSION_GET_BY_ID_REQUEST,
  DISCUSSION_GET_BY_ID_SUCCESS,
  DISCUSSION_GET_FAIL,
  DISCUSSION_GET_REQUEST,
  DISCUSSION_GET_SUCCESS,
  SET_CATEGORY_FAIL,
  SET_CATEGORY_REQUEST,
  SET_CATEGORY_SUCCESS,
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

    const { data } = await axios.get(`/api/discussions/${search}`, config);

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

    const { data } = await axios.get(`/api/discussions/${id}`);

    console.log(data);

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
