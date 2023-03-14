import axios from "axios";
import authHeader from "../../api/authToken";
import {
  GET_ALL_INDUSTRY_PRICING,
  GET_PRICING_DETAIL,
  GET_PRICING_DETAIL_FAIL,
  GET_PRICING_DETAIL_START,
  LOADING_FALSE,
  LOADING_TRUE,
  PAYMENT_FAIL,
  PAYMENT_SENT,
  PAYMENT_START,
  PRICE_CART_ADD,
  VERIFY_COUPOUN,
  VERIFY_COUPOUN_FAIL,
  VERIFY_COUPOUN_START,
  CARD_DETAILS,
  CARD_DETAILS_FAIL,
  CARD_DETAILS_START,
  RESET_MODAL,
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
import { ShowAlert } from "./alertActions";
import { refreshToken } from "./authActions";

export const addPrice = (money) => async (dispatch) => {
  dispatch({
    type: PRICE_CART_ADD,
    payload: money,
  });
};

export const getCurrentCard = () => async (dispatch) => {
  // dispatch({
  //   type: LOADING_TRUE,
  // });
  //   const data = JSON.stringify(body);
  try {
    dispatch({
      type: CARD_DETAILS_START,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/costCalculator/get-card`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: CARD_DETAILS,
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
      dispatch({
        type: LOADING_FALSE,
      });
    }
  } catch (e) {
    // console.log("Error");
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: CARD_DETAILS_FAIL,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const verifyCopoun = (body) => async (dispatch) => {
  // dispatch({
  //   type: LOADING_TRUE,
  // });
  //   const data = JSON.stringify(body);
  try {
    const data = JSON.stringify(body);
    dispatch({
      type: VERIFY_COUPOUN_START,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/coupon`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: VERIFY_COUPOUN,
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
      dispatch({
        type: LOADING_FALSE,
      });
    }
  } catch (e) {
    // console.log("Error");
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: VERIFY_COUPOUN_FAIL,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const getPricingDetailsFunc = () => async (dispatch) => {
  // dispatch({
  //   type: LOADING_TRUE,
  // });
  //   const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_PRICING_DETAIL_START,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/costCalculator/index`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_PRICING_DETAIL,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    // console.log("Error");
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: GET_PRICING_DETAIL_FAIL,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  }
};
//

export const checkoutPayment = (body) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_START,
    });
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/costCalculator/store`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: PAYMENT_SENT,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(refreshToken());
      dispatch(ShowAlert("Payment done", "success"));
    } else {
      if (typeof results?.message === "object") {
        Object.entries(results?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(results?.message, "error"));
        // console.log();
      }
      dispatch({
        type: LOADING_FALSE,
      });
    }
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
    dispatch({
      type: PAYMENT_FAIL,
    });
  }
};

export const subscriptionPayment = (body) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_START,
    });
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/costCalculator/e-worec`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;
    dispatch({
      type: PAYMENT_SENT,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(refreshToken());
      dispatch(ShowAlert("Subscription done", "success"));
    } else {
      if (typeof results?.message === "object") {
        Object.entries(results?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(results?.message, "error"));
        // console.log();
      }
      dispatch({
        type: LOADING_FALSE,
      });
    }
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
    dispatch({
      type: PAYMENT_FAIL,
    });
  }
};

export const getIndustryPricing = (body) => async (dispatch) => {
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/industry-license`,
      body,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_ALL_INDUSTRY_PRICING,
      payload: results,
    });
  } catch (e) {
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const getSubscription = () => async (dispatch) => {
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/costCalculator/get-subscrption`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_SUBSCRIPTON,
      payload: results,
    });
  } catch (e) {
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const getTrail = () => async (dispatch) => {
  try {
    dispatch({
      type: TRAIL_PERIOD_START,
    });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/trail`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    if (results?.success === true) {
      dispatch(refreshToken());
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
      type: TRAIL_PERIOD,
      payload: results,
    });
  } catch (e) {
    dispatch({
      type: LOADING_FALSE,
    });
    dispatch({
      type: TRAIL_PERIOD_FAIL,
    });
  }
};

export const deleteSubs = () => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SUBSCRIPTON_START,
    });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/costCalculator/cancel-subscription`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;
    if (results?.success) {
      dispatch(getSubscription());
      dispatch(refreshToken());
      dispatch(ShowAlert("Unsubscribed", "success"));
    }
    dispatch({
      type: DELETE_SUBSCRIPTON,
      payload: results,
    });
  } catch (e) {
    dispatch({
      type: DELETE_SUBSCRIPTON_FAIL,
    });
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const updateSubcrib = (body) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SUBSCRIPTON_START,
    });
    const date = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/costCalculator/update-subscription`,
      date,
      { headers: authHeader() }
    );
    const results = await request.data;
    if (results?.success) {
      dispatch(refreshToken());
      dispatch(getSubscription());
      dispatch(ShowAlert("Unsubscribed", "success"));
    }
    dispatch({
      type: UPDATE_SUBSCRIPTON,
      payload: results,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_SUBSCRIPTON_START,
    });
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const resetPricing = () => (dispatch) => {
  dispatch({
    type: RESET_MODAL,
  });
};
