import {
  CREATE_JOB_RECRUITER,
  DELETE_JOB_RECRUITER,
  EDIT_JOB_RECRUITER,
  GET_ALL_JOB_RECRUITER,
  JOB_CATEGORY,
  JOB_EMPLOYEMENT_SIZE,
  JOB_EXPERIENCE,
  JOB_SALARY,
  JOB_TYPE,
  LOADING_FALSE,
  LOADING_TRUE,
  RESET_MODAL,
  STATUS_CHANGE,
  UPDATE_JOB_RECRUITER,
  GET_ALL_JOB_ARCHIVED_RECRUITER,
  GET_ALL_JOB_DEACTIVATE_RECRUITER,
  GET_ALL_JOB_ARCHIVED_RECRUITER_START,
  GET_ALL_JOB_RECRUITER_START,
  GET_ALL_JOB_DEACTIVATE_RECRUITER_START,
  GET_ALL_JOBS_HOMEPAGE,
  GET_ALL_JOBS_HOMEPAGE_START,
  GET_ALL_JOBS_HOMEPAGE_FAIL,
  SINGLE_JOB,
  SINGLE_JOB_START,
  SINGLE_JOB_FAIL,
} from "../constants/constants";

const initialState = {
  loading: false,
  allJobs: null,
  archivedJobs: null,
  deactiveJobs: null,
  editedJob: {},
  createdJob: {},
  deletedItem: {},
};

export const recruiterJobsReducers = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case LOADING_TRUE:
      return { ...state, loading: true };
    case LOADING_FALSE:
      return { ...state, loading: false };
    case GET_ALL_JOB_ARCHIVED_RECRUITER_START:
      return { ...state, archivedJobs: null };
    case GET_ALL_JOB_RECRUITER_START:
      return { ...state, allJobs: null };
    case GET_ALL_JOB_DEACTIVATE_RECRUITER_START:
      return { ...state, deactiveJobs: null };
    case GET_ALL_JOB_ARCHIVED_RECRUITER:
      return { ...state, archivedJobs: payload, loading: false };
    case GET_ALL_JOB_DEACTIVATE_RECRUITER:
      return { ...state, deactiveJobs: payload, loading: false };
    case GET_ALL_JOB_RECRUITER:
      return { ...state, allJobs: payload, loading: false };
    case JOB_TYPE: {
      return { ...state, jobType: payload };
    }
    case JOB_EXPERIENCE: {
      return { ...state, jobExp: payload };
    }
    case JOB_EMPLOYEMENT_SIZE: {
      return { ...state, jobEmpSize: payload };
    }
    case JOB_SALARY: {
      return { ...state, jobSalary: payload };
    }
    case JOB_CATEGORY: {
      return { ...state, jobCata: payload };
    }

    case CREATE_JOB_RECRUITER:
      return { ...state, createdJob: payload, loading: false };
    case DELETE_JOB_RECRUITER:
      return { ...state, deletedItem: payload };
    case EDIT_JOB_RECRUITER:
      return { ...state, editedJob: payload, edit: true, loading: false };
    case UPDATE_JOB_RECRUITER:
      return { ...state, updateJob: payload, loading: false };
    case STATUS_CHANGE: {
      return { ...state, status: payload };
    }
    case RESET_MODAL:
      return {
        ...state,
        editedJob: {},
        createdJob: {},
        edit: null,
        deletedItem: {},
        updateJob: {},
        loading: false,
      };

    default:
      return state;
  }
};
