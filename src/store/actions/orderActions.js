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
import axios from "axios";
import authHeader from "../../api/authToken";
import { ShowAlert } from "./alertActions";

export const getOrderList = (workspaceId) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  dispatch({
    type: ORDER_LIST_START,
  });
  try {
    // let body = JSON.stringify({ workspace_id: workspaceId });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/list`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: ORDER_LIST,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    dispatch({
      type: ORDER_LIST_FAIL,
    });
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};
export const singleOrder = (body) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAIL_START,
    });
    let data = JSON.stringify(body);

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/order-detail`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;
    dispatch({
      type: ORDER_DETAIL,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
    });
  }
};
