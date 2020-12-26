import {
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_GET_BY_ID_REQUEST,
  PROFILE_GET_BY_ID_SUCCESS,
  PROFILE_GET_BY_ID_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_CLEAR,
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

export const updateUserProfile = (
  bio,
  youtube,
  instagram,
  twitter,
  linkedin
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/profile`,
      { bio, youtube, instagram, twitter, linkedin },
      config
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    setTimeout(() => {
      dispatch({
        type: UPDATE_PROFILE_CLEAR,
      });
    }, 3000);
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
