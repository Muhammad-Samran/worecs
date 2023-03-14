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

const initialState = {
  loading: false,
  allJobs: null,
  singleJob: {},
  jobApply: {},
};

export const homeJobReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_TRUE:
      return { ...state, loading: true };
    case LOADING_FALSE:
      return { ...state, loading: false };
    case GET_ALL_JOBS_HOMEPAGE:
      return { ...state, allJobs: payload, loading: false };
    case GET_ALL_JOBS_HOMEPAGE_START:
      return { ...state, allJobs: null, loading: true };
    case GET_ALL_JOBS_HOMEPAGE_FAIL:
      return { ...state, allJobs: null, loading: false };
    case SINGLE_JOB:
      return { ...state, singleJob: payload, loading: false };
    case SINGLE_JOB_START:
      return { ...state, singleJob: null, loading: true };
    case SINGLE_JOB_FAIL:
      return { ...state, singleJob: null, loading: false };

    case APPLY_JOB_HOME:
      return { ...state, jobApply: payload, loading: false };
    case APPLY_JOB_HOME_START:
      return { ...state, jobApply: null, loading: true };
    case APPLY_JOB_HOME_FAIL:
      return { ...state, jobApply: null, loading: false };

    case RESET_MODAL:
      return {
        ...state,
        singleJob: {},
        jobApply: {},
      };

    default:
      return state;
  }
};
