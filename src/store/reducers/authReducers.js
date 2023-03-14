import {
  API_LOGIN,
  LOGIN_CANDIDATE,
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  LOADING_TRUE,
  RESET_MODAL,
  LOADING_FALSE,
  RESET_AUTH,
  GOOGLE_LOGIN,
  Verify_Email_LOGIN,
} from "../constants/constants";

const initialState = {
  token: JSON.parse(localStorage.getItem("token")) || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  candidateLogin: JSON.parse(localStorage.getItem("candidate")) || false,
  isLoading: false,
  isNewUser: false,
  verfiy: {},
};

export const authReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_TRUE:
      return { ...state, isLoading: true };
    case LOADING_FALSE:
      return { ...state, isLoading: false };

    case SIGNUP_USER:
      return {
        ...state,
        isLoading: false,
        newSignup: payload,
        isNewUser: true,
      };
    case API_LOGIN:
      return {
        ...state,
        isLoading: false,
        ...payload,
        isNewUser: false,
        user: payload?.results?.type,
        token: payload.results?.access_token,
      };
    case GOOGLE_LOGIN:
      return {
        ...state,
        ...payload,
      };
    case Verify_Email_LOGIN:
      return { ...state, verfiy: payload };
    case LOGIN_USER:
      return { ...state, ...payload };
    case LOGIN_CANDIDATE:
      return { ...state, ...payload };
    case LOGOUT_USER:
      return { token: null, user: null };
    case RESET_AUTH:
      return {};
    default:
      return state;
  }
};
