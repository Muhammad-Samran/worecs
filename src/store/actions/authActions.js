import axios from "axios";
import authHeader from "../../api/authToken";
import {
  API_LOGIN,
  GOOGLE_LOGIN,
  LOADING_FALSE,
  LOADING_TRUE,
  LOGIN_CANDIDATE,
  LOGIN_USER,
  LOGOUT_USER,
  RESET_AUTH,
  RESET_MODAL,
  SIGNUP_USER,
  Verify_Email_LOGIN,
} from "../constants/constants";
import { ShowAlert } from "./alertActions";
import { getCompany } from "./companyActions";
import { getProfile } from "./profileActions";
import jwt_decode from "jwt-decode";

export const SignupUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });
    const body = JSON.stringify(data);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/signup`,
      body,
      config
    );
    const getResponse = await response.data;

    dispatch({
      type: SIGNUP_USER,
      payload: getResponse,
    });
    if (getResponse.success === true) {
      dispatch(ShowAlert(getResponse?.message, "success"));
      dispatch({
        type: LOADING_FALSE,
      });
    } else {
      if (typeof getResponse?.message === "object") {
        Object.entries(getResponse?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(getResponse?.message, "error"));
        // console.log();
      }
      dispatch({
        type: LOADING_FALSE,
      });
    }
  } catch (e) {
    // console.log(e, getResponse);

    dispatch(ShowAlert("Something went wrong", "error"));

    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const loginApi = (data) => async (dispatch) => {
  try {
    const body = JSON.stringify(data);
    dispatch({
      type: LOADING_TRUE,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/signin`,
      body,
      config
    );
    const getResponse = await response.data;

    dispatch({
      type: API_LOGIN,
      payload: getResponse,
    });
    // if (getResponse.results?.is_verified) {
    //   return dispatch(ShowAlert(getResponse?.message, "error"));
    // }
    if (
      getResponse.success === true &&
      getResponse.results?.is_verified !== 0
    ) {
      localStorage.setItem(
        "token",
        JSON.stringify(getResponse?.results?.access_token)
      );
      localStorage.setItem("user", JSON.stringify(getResponse?.results?.type));
      localStorage.setItem("auth", JSON.stringify(getResponse));
      await dispatch(
        getProfile({
          uuid: getResponse?.results?.uuid,
          customer_id: getResponse?.results?.recruiter_id,
        })
      );
      dispatch(ShowAlert(getResponse?.message, "success"));
    } else {
      if (typeof getResponse?.message === "object") {
        Object.entries(getResponse?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(getResponse?.message, "error"));
      }
      dispatch({
        type: LOADING_FALSE,
      });
    }
  } catch (e) {
    // if (getResponse.success === false) {
    //   dispatch(ShowAlert(getResponse?.message, "success"));
    // }
    dispatch(ShowAlert("Something went wrong please try again", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
    // dispatch({
    //   type: LOGOUT_USER,
    // });
  }
};

export const Logout = () => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/signout`,
      "body",
      { headers: authHeader() }
    );

    await response.data;

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    localStorage.clear();

    dispatch({
      type: LOGOUT_USER,
    });
    // dispatch(ShowAlert("Logout", "error"));
  } catch (e) {
    console.log(e);
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const refreshToken = (uuid) => async (dispatch) => {
  // let body = JSON.stringify({ uuid });
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/refresh-auth-data`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: API_LOGIN,
      payload: results,
    });
    localStorage.setItem("auth", JSON.stringify(results));
  } catch (e) {
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const resetAuth = (uuid) => async (dispatch) => {
  dispatch({
    type: RESET_AUTH,
  });
};

export const googleAuthSucces = (response) => async (dispatch) => {
  let authData = jwt_decode(response?.credential);
  dispatch(checkToken(authData?.email));
  const values = {
    results: {
      first_name: authData?.given_name,
      last_name: authData?.family_name,
      email: authData?.email,
      profile_image: authData?.picture,
    },
  };
  dispatch({
    type: GOOGLE_LOGIN,
    payload: {
      token: response?.credential,
      ...values,
      googleAuth: true,
    },
  });
};

export const checkToken = (email) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/checkemail`,
      { email },
      { headers: authHeader() }
    );
    const results = await request.data;
    dispatch({
      type: Verify_Email_LOGIN,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const googleSingup = (data) => async (dispatch) => {
  try {
    const body = JSON.stringify(data);
    dispatch({
      type: LOADING_TRUE,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/social-register`,
      body,
      config
    );
    const getResponse = await response.data;

    dispatch({
      type: API_LOGIN,
      payload: getResponse,
    });
    // if (getResponse.results?.is_verified) {
    //   return dispatch(ShowAlert(getResponse?.message, "error"));
    // }
    if (
      getResponse.success === true &&
      getResponse.results?.is_verified !== 0
    ) {
      localStorage.setItem(
        "token",
        JSON.stringify(getResponse?.results?.access_token)
      );
      localStorage.setItem("user", JSON.stringify(getResponse?.results?.type));
      localStorage.setItem("auth", JSON.stringify(getResponse));
      await dispatch(
        getProfile({
          uuid: getResponse?.results?.uuid,
          customer_id: getResponse?.results?.recruiter_id,
        })
      );
      dispatch(ShowAlert(getResponse?.message, "success"));
    } else {
      if (typeof getResponse?.message === "object") {
        Object.entries(getResponse?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(getResponse?.message, "error"));
      }
      dispatch({
        type: LOADING_FALSE,
      });
    }
  } catch (e) {
    // if (getResponse.success === false) {
    //   dispatch(ShowAlert(getResponse?.message, "success"));
    // }
    console.log(e);
    dispatch({
      type: LOADING_FALSE,
    });
    // dispatch({
    //   type: LOGOUT_USER,
    // });
  }
};

export const googleLogin = (data) => async (dispatch) => {
  try {
    const body = JSON.stringify(data);
    dispatch({
      type: LOADING_TRUE,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/social-login`,
      body,
      config
    );
    const getResponse = await response.data;

    dispatch({
      type: API_LOGIN,
      payload: getResponse,
    });
    // if (getResponse.results?.is_verified) {
    //   return dispatch(ShowAlert(getResponse?.message, "error"));
    // }
    if (
      getResponse.success === true &&
      getResponse.results?.is_verified !== 0
    ) {
      localStorage.setItem(
        "token",
        JSON.stringify(getResponse?.results?.access_token)
      );
      localStorage.setItem("user", JSON.stringify(getResponse?.results?.type));
      localStorage.setItem("auth", JSON.stringify(getResponse));
      await dispatch(
        getProfile({
          uuid: getResponse?.results?.uuid,
          customer_id: getResponse?.results?.recruiter_id,
        })
      );
      dispatch(ShowAlert(getResponse?.message, "success"));
    } else {
      if (typeof getResponse?.message === "object") {
        Object.entries(getResponse?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(getResponse?.message, "error"));
      }
      dispatch({
        type: LOADING_FALSE,
      });
    }
  } catch (e) {
    // if (getResponse.success === false) {
    //   dispatch(ShowAlert(getResponse?.message, "success"));
    // }
    dispatch(ShowAlert("Something went wrong please try again", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
    // dispatch({
    //   type: LOGOUT_USER,
    // });
  }
};
