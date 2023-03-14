import Industry from "../../components/industry/main";
import {
  CREATE_INDUSTRY,
  DELETE_INDUSTRY,
  FAIL_ALL_INDUSTRY,
  GET_ALL_CREATED_INDUSTIRES,
  GET_ALL_INDUSTRY,
  GET_CERTIFICATE,
  GET_CERTIFICATES_INDUSTRIES,
  LOADING_TRUE,
  EDITED_TRUE,
  RESET_MODAL,
  UPDATE_INDUSTRY,
  STATUS_CHANGE,
  INDUSTRY_SIZE,
  LOADING_FALSE,
  GET_ALL_INDUSTRY_START,
  GET_ALL_INDUSTRY_FAil,
  GET_ALL_CREATED_INDUSTIRES_START,
  GET_SINGLE_INDUSTRY,
} from "../constants/constants";

const initialState = {
  loading: false,
  industryList: [],
  certificates: [],
  certificatesIndustries: [],
  createdIndustries: [],
  editedIndustries: {},
  createdIndustry: {},
  deletedItem: {},
  singleModel: {},
};

export const industryReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_TRUE:
      return { ...state, loading: true };
    case LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    case GET_ALL_INDUSTRY_START:
      return { ...state, industryList: null, industryLoading: true };
    case GET_ALL_INDUSTRY:
      return { ...state, industryList: payload, industryLoading: false };
    case GET_ALL_INDUSTRY_FAil:
      return { ...state, industryList: null, industryLoading: false };
    case GET_CERTIFICATE:
      return { ...state, certificates: payload };
    case GET_CERTIFICATES_INDUSTRIES:
      return { ...state, certificatesIndustries: payload };
    case CREATE_INDUSTRY:
      return { ...state, createdIndustry: payload, loading: false };
    case GET_ALL_CREATED_INDUSTIRES_START:
      return { ...state, createdIndustries: null, createdLoading: true };
    case GET_ALL_CREATED_INDUSTIRES:
      return { ...state, createdIndustries: payload, createdLoading: false };
    case DELETE_INDUSTRY:
      return { ...state, deletedItem: payload };
    case EDITED_TRUE:
      return { ...state, editedIndustries: payload, edit: true };
    case UPDATE_INDUSTRY:
      return { ...state, updateIndustry: payload };
    case STATUS_CHANGE: {
      return { ...state, status: payload };
    }
    case GET_SINGLE_INDUSTRY:
      return { ...state, singleIndustry: payload };
    case INDUSTRY_SIZE:
      return { ...state, industry_size: payload };
    case RESET_MODAL:
      return {
        ...state,
        editedIndustries: {},
        createdIndustry: {},
        edit: null,
        updateIndustry: {},
        industry_size: {},
        deletedItem: {},
        singleIndustry: {},
        loading: false,
      };
    case FAIL_ALL_INDUSTRY:
      return state;
    default:
      return state;
  }
};
