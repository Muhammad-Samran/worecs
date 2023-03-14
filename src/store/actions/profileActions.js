import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CHANGE_PASSWORD_PORFILE,
  PROFILE_IMAGE_UPLOAD,
  PROFILE_IMAGE_UPLOAD_DELETE,
  LOADING_TRUE,
  RESET_MODAL,
  LOADING_FALSE,
} from "../constants/constants";
import axios from "axios";
import authHeader from "../../api/authToken";
import { ShowAlert } from "./alertActions";

export const getProfile = (body) => async (dispatch) => {
  try {
    const data = JSON.stringify(body);
    dispatch({ type: LOADING_TRUE });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/profile/index`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_PROFILE,
      payload: results,
    });
    localStorage.setItem("profile", JSON.stringify(results));
    dispatch({ type: LOADING_FALSE });
  } catch (e) {
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({ type: LOADING_FALSE });
  }
};

export const updateProfile = (body, body2) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/profile/update`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: UPDATE_PROFILE,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Profile updated", "success"));
      dispatch(getProfile(body2));
    } else {
      if (typeof results?.message === "object") {
        Object.entries(results?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(results?.message, "error"));
        // console.log();
      }
      dispatch({
        type: LOADING_FALSE,
      });
    }
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const updatePassword = (body) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/profile/change-password`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: CHANGE_PASSWORD_PORFILE,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Password Changed", "success"));
    } else {
      if (typeof results?.message === "object") {
        Object.entries(results?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(results?.message, "error"));
        // console.log();
      }
      dispatch({
        type: LOADING_FALSE,
      });
    }
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

// const formdata = new FormData();
// Object.entries(body).map(([key, value]) => formdata.append(key, value));

export const UploadImage = (body, body2) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const formdata = new FormData();
    Object.entries(body).map(([key, value]) => formdata.append(key, value));
    // console.log(body);
    // const data = JSON.stringify(body);
    // console.log(data);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/profile/image/upload`,
      formdata,
      {
        headers: authHeader(),
      }
    );
    const results = await request.data;

    dispatch({
      type: PROFILE_IMAGE_UPLOAD,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Profile image updted ", "success"));
      dispatch(getProfile(body2));
      // dispatch(getCompany());
      //   dispatch(getAllRecruiterMembers(workspace_id));
      dispatch({
        type: LOADING_FALSE,
      });
    } else if (typeof results.message === "object") {
      Object.entries(results?.message)?.map(([key, value], i) =>
        dispatch(ShowAlert(value, "error"))
      );
    } else {
      dispatch(ShowAlert(results.message, "error"));
    }

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};
export const deleteImage = (body, body2) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const formdata = new FormData();
    // Object.entries(body).map(([key, value]) => formdata.append(key, value));
    // console.log(body);
    const data = JSON.stringify({ uuid: body });
    // console.log(data);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/profile/image/delete`,
      data,
      {
        headers: authHeader(),
      }
    );
    const results = await request.data;

    dispatch({
      type: PROFILE_IMAGE_UPLOAD_DELETE,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Profile image deleted ", "success"));
      dispatch(getProfile(body2));
      // dispatch(getCompany());
      //   dispatch(getAllRecruiterMembers(workspace_id));
      dispatch({
        type: LOADING_FALSE,
      });
    } else if (typeof results.message === "object") {
      Object.entries(results?.message)?.map(([key, value], i) =>
        dispatch(ShowAlert(value, "error"))
      );
    } else {
      dispatch(ShowAlert(results.message, "error"));
    }

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const resetModel = () => (dispatch) => {
  dispatch({
    type: RESET_MODAL,
  });
};
