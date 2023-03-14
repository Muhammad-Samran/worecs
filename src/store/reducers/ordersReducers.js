import {
  LOADING_TRUE,
  RESET_MODAL,
  LOADING_FALSE,
  ORDER_LIST_START,
  ORDER_LIST,
  ORDER_LIST_FAIL,
  ORDER_DETAIL_START,
  ORDER_DETAIL,
  ORDER_DETAIL_FAIL,
  LOGOUT_USER,
} from "../constants/constants";

const initialState = {
  orderList: [],
  singleOrder: {},
  loading: false,
};

export const ordersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_TRUE:
      return { ...state, loading: true };
    case LOADING_FALSE:
      return { ...state, loading: false };
    case ORDER_LIST_START:
      return { ...state, orderList: null, loading: true };
    case ORDER_LIST:
      return { ...state, orderList: payload, loading: false };
    case ORDER_LIST_FAIL:
      return { ...state, orderList: null, loading: false };
    case ORDER_DETAIL_START:
      return { ...state, singleOrder: null, loading: true };
    case ORDER_DETAIL:
      return { ...state, singleOrder: payload, loading: false };
    case ORDER_DETAIL_FAIL:
      return { ...state, singleOrder: null, loading: false };
    case RESET_MODAL:
      return { ...state, singleOrder: null };

    default:
      return state;
  }
};
