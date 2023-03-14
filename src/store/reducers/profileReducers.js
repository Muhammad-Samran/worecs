import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CHANGE_PASSWORD_PORFILE,
  PROFILE_IMAGE_UPLOAD,
  PROFILE_IMAGE_UPLOAD_DELETE,
  LOADING_TRUE,
  RESET_MODAL,
  LOADING_FALSE,
  LOGOUT_USER,
} from "../constants/constants";

const initialState = {
  profile: JSON.parse(localStorage.getItem("profile")) || {},
  updateProfile: {},
  changePassword: {},
  ImageUpload: {},
  deleteUpload: {},
  loading: false,
};

export const Rprofile = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_TRUE:
      return { ...state, loading: true };
    case LOADING_FALSE:
      return { ...state, loading: false };
    case GET_PROFILE:
      return { ...state, profile: payload };
    case UPDATE_PROFILE:
      return { ...state, updateProfile: payload };
    case CHANGE_PASSWORD_PORFILE:
      return { ...state, changePassword: payload };
    case PROFILE_IMAGE_UPLOAD:
      return { ...state, ImageUpload: payload };
    case PROFILE_IMAGE_UPLOAD_DELETE:
      return { ...state, deleteUpload: payload };
    case RESET_MODAL:
      return {
        ...state,
        updateProfile: null,
        ImageUpload: null,
        deleteUpload: null,
      };
    case LOGOUT_USER:
      return { ...state, profile: {} };
    default:
      return state;
  }
};
