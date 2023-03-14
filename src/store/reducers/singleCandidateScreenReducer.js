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
  SHOW_CANDIDATE_RECRUITER_INTERVIEW_RESEND,
  REST_REFF,
  SHOW_CANDIDATE_RECRUITER_REFF_START,
  SHOW_CANDIDATE_RECRUITER_REFF,
  SHOW_CANDIDATE_RECRUITER_CERTIFICATE_START,
  SHOW_CANDIDATE_RECRUITER_CERTIFICATE,
  CREATE_CANDIDATE_RECRUITER_REFF,
  SHOW_SINGLE_CANDIDATE_RECRUITER_REFF,
  CREATE_CANDIDATE_RECRUITER_CERTIFICATE,
  SHOW_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
  CREATE_CANDIDATE_RECRUITER_INTERVIEW,
  SHOW_CANDIDATE_RECRUITER_INTERVIEW,
  SHOW_CANDIDATE_RECRUITER_INTERVIEW_START,
  STATUS_SINGLE_CANDIDATE_RECRUITER_REFF,
  RESEND_SINGLE_CANDIDATE_RECRUITER_REFF,
  RESEND_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
  STATUS_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
  EDIT_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
  UPDATE_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
  DELETE_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
  UPDATE_CANDIDATE_RECRUITER_INTERVIEW,
  EDIT_CANDIDATE_RECRUITER_INTERVIEW,
  STATUS_CANDIDATE_RECRUITER_INTERVIEW,
  SHOW_CANDIDATE_RECRUITER_CERTIFICATE_FAIL,
  SHOW_CANDIDATE_RECRUITER_REFF_FAIL,
  SHOW_CANDIDATE_RECRUITER_INTERVIEW_FAIL,
} from "../constants/constants";

const initialState = {
  loading: false,
  singleCandidateReff: [],
  singleCandidateCertificates: [],
  singleCandidateInterview: [],
  deactiveJobs: null,
  editedJob: {},
  createdJob: {},
  deletedItem: {},
  resendInterView: {},
};

export const singleCandidateScreenReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case LOADING_TRUE:
      return { ...state, loading: true };
    case LOADING_FALSE:
      return { ...state, loading: false };

    case SHOW_CANDIDATE_RECRUITER_REFF_START:
      return {
        ...state,
        singleCandidateReff: null,
        singleCandidateReffLoading: true,
      };
    case SHOW_CANDIDATE_RECRUITER_CERTIFICATE_START:
      return {
        ...state,
        singleCandidateCertificates: null,
        singleCandidateCertificatesLoading: true,
      };

    case SHOW_CANDIDATE_RECRUITER_REFF:
      return {
        ...state,
        singleCandidateReff: payload,
        singleCandidateReffLoading: false,
        loading: false,
      };
    case SHOW_CANDIDATE_RECRUITER_CERTIFICATE_FAIL:
      return {
        ...state,
        singleCandidateCertificates: null,
        singleCandidateCertificatesLoading: false,
      };
    case SHOW_CANDIDATE_RECRUITER_REFF_FAIL:
      return {
        ...state,
        singleCandidateReff: null,
        singleCandidateReffLoading: false,
      };
    case SHOW_CANDIDATE_RECRUITER_CERTIFICATE:
      return {
        ...state,
        singleCandidateCertificates: payload,
        singleCandidateCertificatesLoading: false,
        loading: false,
      };
    case CREATE_CANDIDATE_RECRUITER_REFF:
      return { ...state, createReff: payload, loading: false };
    case SHOW_SINGLE_CANDIDATE_RECRUITER_REFF:
      return { ...state, showSingleReff: payload, loading: false };
    case CREATE_CANDIDATE_RECRUITER_CERTIFICATE:
      return { ...state, createCertificate: payload, loading: false };
    case SHOW_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE:
      return { ...state, showSingleCertificate: payload, loading: false };
    case SHOW_CANDIDATE_RECRUITER_INTERVIEW_START:
      return {
        ...state,
        singleCandidateInterview: null,
        singleCandidateInterviewLoading: true,
      };
    case SHOW_CANDIDATE_RECRUITER_INTERVIEW:
      return {
        ...state,
        singleCandidateInterview: payload,
        singleCandidateInterviewLoading: false,
        loading: false,
      };
    case SHOW_CANDIDATE_RECRUITER_INTERVIEW_FAIL:
      return {
        ...state,
        singleCandidateInterview: null,
        singleCandidateInterviewLoading: false,
      };
    case CREATE_CANDIDATE_RECRUITER_INTERVIEW:
      return { ...state, createInterView: payload, loading: false };
    case UPDATE_CANDIDATE_RECRUITER_INTERVIEW:
      return { ...state, updateInterView: payload, loading: false };
    case EDIT_CANDIDATE_RECRUITER_INTERVIEW:
      return { ...state, editInterView: payload, loading: false };
    case STATUS_CANDIDATE_RECRUITER_INTERVIEW:
      return { ...state, statusInterView: payload, loading: false };
    case STATUS_SINGLE_CANDIDATE_RECRUITER_REFF:
      return { ...state, statusReff: payload, loading: false };
    case RESEND_SINGLE_CANDIDATE_RECRUITER_REFF:
      return { ...state, resendReff: payload, loading: false };
    case RESEND_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE:
      return { ...state, resendCertificate: payload, loading: false };
    case STATUS_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE:
      return { ...state, statusCertificate: payload, loading: false };
    case EDIT_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE:
      return { ...state, editCertificate: payload, loading: false };
    case UPDATE_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE:
      return { ...state, updateCertificate: payload, loading: false };
    case DELETE_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE:
      return { ...state, deletedItem: payload, loading: false };
    case SHOW_CANDIDATE_RECRUITER_INTERVIEW_RESEND:
      return { ...state, resendInterView: payload, loading: false };
    case STATUS_CHANGE: {
      return { ...state, status: payload };
    }
    case REST_REFF: {
      return {
        ...state,
        createReff: {},
        showSingleReff: {},
        createCertificate: {},
        showSingleCertificate: {},
        createInterView: {},
        statusReff: {},
        resendReff: {},
        resendCertificate: {},
        statusCertificate: {},
        editCertificate: {},
        updateCertificate: {},
        updateInterView: {},
        editInterView: {},
        statusInterView: {},
        deletedItem: {},
        resendInterView: {},
      };
    }
    case RESET_MODAL:
      return {
        ...state,
        singleCandidateReff: [],
        singleCandidateCertificates: [],
        // createReff: {},
        // showSingleReff: {},
        loading: false,
      };

    default:
      return state;
  }
};
