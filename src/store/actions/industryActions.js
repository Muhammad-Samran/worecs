import {
  CREATE_INDUSTRY,
  DELETE_INDUSTRY,
  EDITED_TRUE,
  GET_ALL_CREATED_INDUSTIRES,
  GET_ALL_CREATED_INDUSTIRES_START,
  GET_ALL_INDUSTRY,
  GET_ALL_INDUSTRY_START,
  GET_CERTIFICATE,
  GET_CERTIFICATES_INDUSTRIES,
  INDUSTRY_SIZE,
  LOADING_FALSE,
  LOADING_TRUE,
  RESET_MODAL,
  STATUS_CHANGE,
  UPDATE_INDUSTRY,
  GET_ALL_INDUSTRY_FAil,
  GET_SINGLE_INDUSTRY,
} from "../constants/constants";
import axios from "axios";
import authHeader from "../../api/authToken";
import { ShowAlert } from "./alertActions";
import { BsFillCloudyFill } from "react-icons/bs";
import { refreshToken } from "./authActions";

export const getAllCatagories = () => async (dispatch) => {
  dispatch({ type: LOADING_TRUE });
  dispatch({
    type: GET_ALL_INDUSTRY_START,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/recruitment-industry/index`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_ALL_INDUSTRY,
      payload: results,
    });
    dispatch({ type: LOADING_FALSE });
  } catch (e) {
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({ type: LOADING_FALSE });
    dispatch({ type: GET_ALL_INDUSTRY_FAil });
  }
};

export const getAllCertificates = (industryId) => async (dispatch) => {
  try {
    let body = {};
    if (industryId) {
      body = JSON.stringify({ industry_id: industryId.toString() });
    } else {
      body = {};
    }

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/industry-certification-license`,
      body,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CERTIFICATE,
      payload: results,
    });
  } catch (e) {
    // console.log("Error");
    // dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const getAllCertificatesIndustry = () => async (dispatch) => {
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/industry-license`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CERTIFICATES_INDUSTRIES,
      payload: results,
    });
  } catch (e) {
    // console.log("Error");
    // dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const CreateIndustry = (body, workspaceId) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });

  const data = JSON.stringify(body);
  const request = await axios.post(
    `${process.env.REACT_APP_API_URL}/recruitment-industry/store`,
    data,
    { headers: authHeader() }
  );
  const results = await request.data;

  try {
    dispatch({
      type: CREATE_INDUSTRY,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Industry created", "success"));
      dispatch(getAllCreatedIndustry(workspaceId));
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
  }
};

export const getAllCreatedIndustry = (workspaceId) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  dispatch({
    type: GET_ALL_CREATED_INDUSTIRES_START,
  });
  try {
    let body = JSON.stringify({ workspace_id: workspaceId });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/recruitment-industry/workspace/index`,
      body,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_ALL_CREATED_INDUSTIRES,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const deleteIndustry = (uuid, workspaceId) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    let body = JSON.stringify({ uuid });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/recruitment-industry/delete`,
      body,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: DELETE_INDUSTRY,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Industry deleted ", "success"));
      dispatch(getAllCreatedIndustry(workspaceId));
      dispatch({
        type: LOADING_FALSE,
      });
    } else {
      dispatch({
        type: LOADING_FALSE,
      });
      dispatch(ShowAlert("Something went wrong", "error"));
    }
  } catch (e) {
    dispatch({
      type: LOADING_FALSE,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const editIndustry = (uuid, workspaceId) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  // let body = JSON.stringify({ uuid });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/recruitment-industry/edit/${uuid}`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: EDITED_TRUE,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    dispatch({
      type: LOADING_FALSE,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const singleIndustry = (uuid) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });
    // let body = JSON.stringify({ uuid });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/recruitment-industry/show/${uuid}`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_SINGLE_INDUSTRY,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const UpdateIndustry = (body, workspaceId) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/recruitment-industry/update`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: UPDATE_INDUSTRY,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Industry updated", "success"));
      dispatch(getAllCreatedIndustry(workspaceId));
      dispatch({
        type: LOADING_FALSE,
      });
    } else {
      dispatch({
        type: LOADING_FALSE,
      });
      dispatch(ShowAlert("something went wrong", "error"));
    }
  } catch (e) {
    // console.log("Error");
    dispatch({
      type: LOADING_FALSE,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};
export const getIndusTrySize = () => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/company-size`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: INDUSTRY_SIZE,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    // console.log("Error");

    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const resetModel = () => (dispatch) => {
  dispatch({
    type: RESET_MODAL,
  });
};

export const StatusChange = (body, workspaceId) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/recruitment-industry/status`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: STATUS_CHANGE,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Status changed", "success"));
      dispatch(getAllCreatedIndustry(workspaceId));
      dispatch({
        type: LOADING_FALSE,
      });
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
  }
};

export const updateComanpyOnIndustry =
  (body, workspaceId) => async (dispatch) => {
    dispatch({
      type: LOADING_TRUE,
    });
    try {
      const data = JSON.stringify(body);
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}/job/company-detail/update-company-industry`,
        data,
        { headers: authHeader() }
      );
      const results = await request.data;

      dispatch({
        type: UPDATE_INDUSTRY,
        payload: results,
      });
      if (results?.success === true) {
        dispatch(ShowAlert("Industry is selected", "success"));
        dispatch(refreshToken());
        // dispatch(getAllCreatedIndustry(workspaceId));
        dispatch({
          type: LOADING_FALSE,
        });
      } else {
        dispatch({
          type: LOADING_FALSE,
        });
        dispatch(ShowAlert("something went wrong", "error"));
      }
    } catch (e) {
      // console.log("Error");
      dispatch({
        type: LOADING_FALSE,
      });
      dispatch(ShowAlert("Something went wrong", "error"));
    }
  };
