import {
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_RESET,
  ADMIN_GET_USERS_FAIL,
  ADMIN_GET_USERS_REQUEST,
  ADMIN_GET_USERS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminGetUsersReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS_REQUEST:
      return { loading: true };
    case ADMIN_GET_USERS_SUCCESS:
      return { loading: false, userList: action.payload };
    case ADMIN_GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminDeleteUserReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ADMIN_DELETE_USER_REQUEST:
      return { loading: true };
    case ADMIN_DELETE_USER_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_DELETE_USER_RESET:
      return { success: false, loading: true };
    default:
      return state;
  }
};
