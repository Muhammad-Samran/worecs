import {
  CREATE_CANDIDATE_RECRUITER,
  DELETE_CANDIDATE_RECRUITER,
  EDIT_CANDIDATE_RECRUITER,
  GET_ALL_CANDIDATE_RECRUITER,
  LOADING_FALSE,
  LOADING_TRUE,
  RESET_MODAL,
  STATUS_CHANGE,
  UPDATE_CANDIDATE_RECRUITER,
  GET_ALL_CANDIDATE_RECRUITER_START,
  GET_ALL_CREATED_CANDITDATE_INDUSTIRES,
  GET_ALL_CREATED_INDUSTIRES_CANDIDATE_START,
  SHOW_CANDIDATE_RECRUITER,
  CREATE_EXISIT_CANDIDATE_RECRUITER,
  GET_EXISITING_CANDIDATE,
} from "../constants/constants";

const initialState = {
  loading: false,
  allCandidate: null,
  editedCandidate: {},
  createdCandidate: {},
  deletedItem: {},
  createdIndustry: null,
  showCandidate: {},
};

export const recruiterCandidateReducers = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case LOADING_TRUE:
      return { ...state, loading: true };
    case LOADING_FALSE:
      return { ...state, loading: false };
    case GET_ALL_CANDIDATE_RECRUITER_START:
      return { ...state, allCandidate: null };
    case GET_ALL_CANDIDATE_RECRUITER:
      return { ...state, allCandidate: payload, loading: false };
    case GET_ALL_CREATED_CANDITDATE_INDUSTIRES:
      return { ...state, createdIndustry: payload, loading: false };
    case GET_ALL_CREATED_INDUSTIRES_CANDIDATE_START:
      return { ...state, createdIndustry: null };
    case GET_EXISITING_CANDIDATE:
      return { ...state, getExisitingCandidate: payload, loading: false };
    case CREATE_CANDIDATE_RECRUITER:
      return { ...state, createdCandidate: payload, loading: false };
    case CREATE_EXISIT_CANDIDATE_RECRUITER:
      return { ...state, alreadyCreatedCandidate: payload, loading: false };
    case DELETE_CANDIDATE_RECRUITER:
      return { ...state, deletedItem: payload };
    case EDIT_CANDIDATE_RECRUITER:
      return { ...state, editedCandidate: payload, edit: true, loading: false };
    case SHOW_CANDIDATE_RECRUITER:
      return { ...state, showCandidate: payload, edit: true, loading: false };
    case UPDATE_CANDIDATE_RECRUITER:
      return { ...state, updateCandidate: payload, loading: false };
    case STATUS_CHANGE: {
      return { ...state, status: payload };
    }
    case RESET_MODAL:
      return {
        ...state,
        editedCandidate: {},
        createdCandidate: {},
        edit: null,
        deletedItem: {},
        updateCandidate: {},
        loading: false,
        createdIndustry: [],
        showCandidate: {},
        getExisitingCandidate: {},
        alreadyCreatedCandidate: {},
      };

    default:
      return state;
  }
};
