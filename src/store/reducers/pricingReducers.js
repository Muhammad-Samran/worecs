import {
  LOADING_TRUE,
  RESET_MODAL,
  LOADING_FALSE,
  GET_PRICING_DETAIL_FAIL,
  GET_PRICING_DETAIL_START,
  GET_PRICING_DETAIL,
  PAYMENT_SENT,
  PAYMENT_FAIL,
  PAYMENT_START,
  GET_ALL_INDUSTRY_PRICING,
  VERIFY_COUPOUN,
  VERIFY_COUPOUN_FAIL,
  VERIFY_COUPOUN_START,
  PRICE_CART_ADD,
  CARD_DETAILS,
  CARD_DETAILS_FAIL,
  CARD_DETAILS_START,
  GET_SUBSCRIPTON,
  GET_SUBSCRIPTON_START,
  GET_SUBSCRIPTON_FAIL,
  DELETE_SUBSCRIPTON,
  DELETE_SUBSCRIPTON_START,
  DELETE_SUBSCRIPTON_FAIL,
  UPDATE_SUBSCRIPTON,
  UPDATE_SUBSCRIPTON_START,
  UPDATE_SUBSCRIPTON_FAIL,
  TRAIL_PERIOD,
  TRAIL_PERIOD_START,
  TRAIL_PERIOD_FAIL,
} from "../constants/constants";

const initialState = {
  paymentList: [],
  paymentDone: {},
  updateCard: {},
  couponCode: {},
  price: 0,
  cart: {},
  cardDetail: {},
  subscription: {},
  updateSubscription: {},
  delteSub: {},
  trail: null,
};

export const pricingReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRICE_CART_ADD:
      return { ...state, price: payload };
    case LOADING_TRUE:
      return { ...state, isLoading: true };
    case LOADING_FALSE:
      return { ...state, isLoading: false };

    case GET_PRICING_DETAIL_START: {
      return { ...state, isLoading: true, paymentList: null };
    }
    case GET_PRICING_DETAIL: {
      return { ...state, isLoading: false, paymentList: payload };
    }
    case GET_PRICING_DETAIL_FAIL: {
      return { ...state, isLoading: false, paymentList: null };
    }
    case PAYMENT_START: {
      return { ...state, isLoading: true, paymentDone: null };
    }
    case PAYMENT_SENT: {
      return { ...state, isLoading: false, paymentDone: payload };
    }
    case PAYMENT_FAIL: {
      return { ...state, isLoading: false, paymentDone: null };
    }
    case GET_ALL_INDUSTRY_PRICING: {
      return { ...state, industry: payload };
    }
    case VERIFY_COUPOUN:
      return { ...state, couponCode: payload, isLoading: false };
    case VERIFY_COUPOUN_FAIL:
      return { ...state, couponCode: null, isLoading: false };
    case VERIFY_COUPOUN_START:
      return { ...state, couponCode: null, isLoading: true };

    case CARD_DETAILS:
      return { ...state, cardDetail: payload, isLoading: false };
    case CARD_DETAILS_FAIL:
      return { ...state, cardDetail: null, isLoading: false };
    case CARD_DETAILS_START:
      return { ...state, cardDetail: null, isLoading: true };

    case GET_SUBSCRIPTON:
      return { ...state, subscription: payload, isLoading: false };
    case GET_SUBSCRIPTON_FAIL:
      return { ...state, subscription: null, isLoading: false };
    case GET_SUBSCRIPTON_START:
      return { ...state, subscription: null, isLoading: true };

    case DELETE_SUBSCRIPTON:
      return { ...state, delteSub: payload, isLoading: false };
    case DELETE_SUBSCRIPTON_FAIL:
      return { ...state, delteSub: null, isLoading: false };
    case DELETE_SUBSCRIPTON_START:
      return { ...state, delteSub: null, isLoading: true };

    case UPDATE_SUBSCRIPTON:
      return { ...state, updateSubscription: payload, isLoading: false };
    case UPDATE_SUBSCRIPTON_FAIL:
      return { ...state, updateSubscription: null, isLoading: false };
    case UPDATE_SUBSCRIPTON_START:
      return { ...state, updateSubscription: null, isLoading: true };

    case TRAIL_PERIOD:
      return { ...state, trail: payload, isLoading: false };
    case TRAIL_PERIOD_FAIL:
      return { ...state, trail: null, isLoading: false };
    case TRAIL_PERIOD_START:
      return { ...state, trail: null, isLoading: true };

    case RESET_MODAL: {
      return {
        ...state,
        paymentDone: null,
        couponCode: null,
        delteSub: null,
        updateSubscription: null,
      };
    }

    default:
      return state;
  }
};
