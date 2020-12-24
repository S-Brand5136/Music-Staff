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

export const getProfileReducer = (
  state = { loading: true, userProfile: {} },
  action
) => {
  switch (action.type) {
    case PROFILE_GET_REQUEST:
      return { loading: true };
    case PROFILE_GET_SUCCESS:
      return { loading: false, userProfile: action.payload };
    case PROFILE_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getProfileByIdReducer = (
  state = { loading: true, userProfileById: {} },
  action
) => {
  switch (action.type) {
    case PROFILE_GET_BY_ID_REQUEST:
      return { loading: true };
    case PROFILE_GET_BY_ID_SUCCESS:
      return { loading: false, userProfileById: action.payload };
    case PROFILE_GET_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_PROFILE_CLEAR:
      return { loading: false, success: false };
    default:
      return state;
  }
};
