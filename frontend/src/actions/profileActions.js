import {
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,
} from "../constants/profileConstants";
import axios from "axios";

export const getProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_GET_REQUEST,
    });

    const { data } = await axios.get("/api/profile");

    dispatch({
      type: PROFILE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
