import {
  CREATE_MEMBER_RECRUITER,
  DELETE_MEMBER_RECRUITER,
  EDIT_MEMBER_RECRUITER,
  GET_ALL_MEMBER_RECRUITER,
  GET_ALL_MEMBER_RECRUITER_START,
  LOADING_FALSE,
  LOADING_TRUE,
  RESET_MODAL,
  STATUS_CHANGE,
  UPDATE_MEMBER_RECRUITER,
} from "../constants/constants";

const initialState = {
  loading: false,
  allMembers: [],
  editedMember: {},
  createdMember: {},
  deletedItem: {},
};

export const recruiterMembersReducers = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case LOADING_TRUE:
      return { ...state, loading: true };
    case LOADING_FALSE:
      return { ...state, loading: false };
    case GET_ALL_MEMBER_RECRUITER_START:
      return { ...state, allMembers: null, loading: true };
    case GET_ALL_MEMBER_RECRUITER:
      return { ...state, allMembers: payload, loading: false };
    case CREATE_MEMBER_RECRUITER:
      return { ...state, createdMember: payload, loading: false };
    case DELETE_MEMBER_RECRUITER:
      return { ...state, deletedItem: payload };
    case EDIT_MEMBER_RECRUITER:
      return { ...state, editedMember: payload, edit: true, loading: false };
    case UPDATE_MEMBER_RECRUITER:
      return { ...state, updateMember: payload, loading: false };
    case STATUS_CHANGE: {
      return { ...state, status: payload };
    }
    case RESET_MODAL:
      return {
        ...state,
        editedMember: {},
        createdMember: {},
        edit: null,
        deletedItem: {},
        updateMember: {},
        loading: false,
      };

    default:
      return state;
  }
};
