import {
  DISCUSSION_GET_FAIL,
  DISCUSSION_GET_REQUEST,
  DISCUSSION_GET_SUCCESS,
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
