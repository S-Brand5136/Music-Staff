import {
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_GET_BY_ID_REQUEST,
  PROFILE_GET_BY_ID_SUCCESS,
  PROFILE_GET_BY_ID_FAIL,
} from "../constants/profileConstants";
import axios from "axios";

export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_GET_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/profile", config);

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

export const getProfileById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_GET_BY_ID_REQUEST,
    });

    const { data } = await axios.get(`/api/profile/user/${id}`);

    dispatch({
      type: PROFILE_GET_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_GET_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
