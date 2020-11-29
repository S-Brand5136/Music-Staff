import {
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,
} from "../constants/profileConstants";

export const profileGetReducer = (state = { userProfile: {} }, action) => {
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
