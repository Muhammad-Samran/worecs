import axios from "axios";
import authHeader from "../../api/authToken";
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
import { ShowAlert } from "./alertActions";

export const getAllRecruiterMembers = (workspace_id) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  dispatch({
    type: GET_ALL_MEMBER_RECRUITER_START,
  });
  try {
    let body = JSON.stringify({ workspace_id });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/user/member/index`,
      body,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_ALL_MEMBER_RECRUITER,
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

export const createMember = (body, workspace_id) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/user/member/store`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: CREATE_MEMBER_RECRUITER,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Member created", "success"));
      dispatch(getAllRecruiterMembers(workspace_id));
      dispatch({
        type: LOADING_FALSE,
      });
    }  else {
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

export const editMember = (uuid) => async (dispatch) => {
  // let body = JSON.stringify({ uuid });
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/user/member/edit/${uuid}`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: EDIT_MEMBER_RECRUITER,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const updateMember = (body, workspaceId) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/user/member/update`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: UPDATE_MEMBER_RECRUITER,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Member updated", "success"));
      dispatch(getAllRecruiterMembers(workspaceId));
    }  else {
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

export const deleteMember =
  (uuid, workspaceId, owner_name) => async (dispatch) => {
    dispatch({
      type: LOADING_TRUE,
    });
    try {
      if (owner_name === "Owner") {
        return dispatch(ShowAlert("You cannot delete the owner", "error"));
      }
      let body = JSON.stringify({ uuid });
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}/workspace/user/member/delete`,
        body,
        { headers: authHeader() }
      );
      const results = await request.data;

      dispatch({
        type: DELETE_MEMBER_RECRUITER,
        payload: results,
      });
      if (results?.success === true) {
        dispatch(ShowAlert("Member deleted ", "success"));
        dispatch(getAllRecruiterMembers(workspaceId));
        dispatch({
          type: LOADING_FALSE,
        });
      } else {
        dispatch(ShowAlert("Something Went Wrong", "error"));
        dispatch({
          type: LOADING_FALSE,
        });
      }
    } catch (e) {
      dispatch(ShowAlert("Something went wrong", "error"));
      dispatch({
        type: LOADING_FALSE,
      });
    }
  };
export const StatusChangeMember = (body, workspaceId) => async (dispatch) => {
  const data = JSON.stringify(body);
  const request = await axios.post(
    `${process.env.REACT_APP_API_URL}/workspace/user/member/status`,
    data,
    { headers: authHeader() }
  );
  const results = await request.data;

  try {
    dispatch({
      type: STATUS_CHANGE,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Status changed", "success"));
      dispatch(getAllRecruiterMembers(workspaceId));
      //   dispatch(getAllCreatedIndustry(workspaceId));
    } else {
      dispatch(ShowAlert(results?.message, "error"));
    }
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const resetMember = () => (dispatch) => {
  dispatch({
    type: RESET_MODAL,
  });
};
