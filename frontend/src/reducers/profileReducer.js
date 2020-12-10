import {
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_GET_BY_ID_REQUEST,
  PROFILE_GET_BY_ID_SUCCESS,
  PROFILE_GET_BY_ID_FAIL,
} from "../constants/profileConstants";

export const getProfileReducer = (state = { userProfile: {} }, action) => {
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
  state = { userProfileById: {} },
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
