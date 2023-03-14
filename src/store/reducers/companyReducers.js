import {
  CREATE_COMPANY,
  DELETE_COMPANY,
  EDIT_COMPANY,
  GET_COMPANY_LIST,
  IS_COMPANY_EXISIT,
  LOADING_FALSE,
  LOADING_TRUE,
  RESET_MODAL,
  STATUS_CHANGE,
  UPDATE_COMPANY,
  DELETE_COMPANY_IMAGE,
} from "../constants/constants";

const initialState = {
  loading: false,
  allCompany: JSON.parse(localStorage.getItem("company")) || [],
  editedCompany: JSON.parse(localStorage.getItem("companyEdit")) || {},
  createdCompany: {},
  deletedItem: {},
  deleteImage: {},
};

export const companyReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_TRUE:
      return { ...state, loading: true };
    case LOADING_FALSE:
      return { ...state, loading: false };
    case IS_COMPANY_EXISIT: {
      return { ...state, existCompany: payload, loading: false };
    }
    case GET_COMPANY_LIST:
      return { ...state, allCompany: payload, loading: false };
    case CREATE_COMPANY:
      return { ...state, createdCompany: payload, loading: false };
    case DELETE_COMPANY:
      return { ...state, deletedItem: payload };
    case EDIT_COMPANY:
      return { ...state, editedCompany: payload, edit: true, loading: false };
    case UPDATE_COMPANY:
      return { ...state, updatedCompany: payload, loading: false };
    case DELETE_COMPANY_IMAGE:
      return { ...state, deleteImage: payload, loading: false };
    case STATUS_CHANGE: {
      return { ...state, status: payload };
    }

    case RESET_MODAL:
      return {
        ...state,
        editedCompany: {},
        existCompany: {},
        createdCompany: {},
        edit: null,
        deletedItem: {},
        updatedCompany: {},
        loading: false,
      };

    default:
      return state;
  }
};
