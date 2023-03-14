import axios from "axios";
import authHeader from "../../api/authToken";
import {
  GET_ALL_JOBS_HOMEPAGE,
  GET_ALL_JOBS_HOMEPAGE_START,
  GET_ALL_JOBS_HOMEPAGE_FAIL,
  SINGLE_JOB,
  SINGLE_JOB_START,
  SINGLE_JOB_FAIL,
  LOADING_TRUE,
  LOADING_FALSE,
  RESET_MODAL,
  APPLY_JOB_HOME,
  APPLY_JOB_HOME_START,
  APPLY_JOB_HOME_FAIL,
} from "../constants/constants";
import { ShowAlert } from "./alertActions";

export const getHomeJobs = (body) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const data = JSON?.stringify(body);
    dispatch({
      type: GET_ALL_JOBS_HOMEPAGE_START,
    });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/jobs`,
      body,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_ALL_JOBS_HOMEPAGE,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_JOBS_HOMEPAGE_FAIL,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const getSingleJob = (uuid) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    // const data = JSON?.stringify(body);
    dispatch({
      type: SINGLE_JOB_START,
    });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job-detail/${uuid}`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: SINGLE_JOB,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    dispatch({
      type: SINGLE_JOB_FAIL,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const ApplyJob = (body) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    // const data = JSON?.stringify(body);
    dispatch({
      type: APPLY_JOB_HOME_START,
    });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/applied/post`,
      body,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: APPLY_JOB_HOME,
      payload: results,
    });
    if (results?.success) {
      dispatch(ShowAlert(results?.message, "error"));
    } else {
      if (typeof results?.message === "object") {
        Object.entries(results?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(results?.message, "error"));
        // console.log();
      }
    }
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    dispatch({
      type: APPLY_JOB_HOME_FAIL,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};
