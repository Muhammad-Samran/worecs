import axios from "axios";
import authHeader from "../../api/authToken";
import {
  CREATE_JOB_RECRUITER,
  DELETE_JOB_RECRUITER,
  EDIT_JOB_RECRUITER,
  GET_ALL_JOB_RECRUITER,
  JOB_CATEGORY,
  JOB_EMPLOYEMENT_SIZE,
  JOB_EXPERIENCE,
  JOB_SALARY,
  JOB_TYPE,
  LOADING_FALSE,
  LOADING_TRUE,
  RESET_MODAL,
  STATUS_CHANGE,
  UPDATE_JOB_RECRUITER,
  GET_ALL_JOB_ARCHIVED_RECRUITER,
  GET_ALL_JOB_DEACTIVATE_RECRUITER,
  GET_ALL_JOB_RECRUITER_START,
  GET_ALL_JOB_ARCHIVED_RECRUITER_START,
  GET_ALL_JOB_DEACTIVATE_RECRUITER_START,
} from "../constants/constants";
import { ShowAlert } from "./alertActions";

export const getAllRecruiterjobs = () => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });

  try {
    dispatch({
      type: GET_ALL_JOB_RECRUITER_START,
    });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/index`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_ALL_JOB_RECRUITER,
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
export const getAllArchivedRecruiterjobs = (body) => async (dispatch) => {
  //	"is_archived":1
  dispatch({
    type: LOADING_TRUE,
  });

  try {
    dispatch({
      type: GET_ALL_JOB_ARCHIVED_RECRUITER_START,
    });
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/index`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_ALL_JOB_ARCHIVED_RECRUITER,
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
export const getAllDeActivateRecruiterjobs = (body) => async (dispatch) => {
  // 	"job_status":0

  dispatch({
    type: LOADING_TRUE,
  });

  try {
    dispatch({
      type: GET_ALL_JOB_DEACTIVATE_RECRUITER_START,
    });
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/index`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_ALL_JOB_DEACTIVATE_RECRUITER,
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

export const createjob = (body, workspace_id) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/store`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: CREATE_JOB_RECRUITER,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Job created", "success"));
      dispatch(getAllRecruiterjobs());
      dispatch({
        type: LOADING_FALSE,
      });
    } else {
      if (typeof results.message === "object") {
        Object.entries(results?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(results.message, "error"));
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

export const jobTypeFunc = () => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job-type`,
      {}
      // { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: JOB_TYPE,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};
export const jobExpFunc = () => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job-experience`,
      {}
      // { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: JOB_EXPERIENCE,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const jobSalaryFunc = () => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job-salary`,
      {}
      // { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: JOB_SALARY,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};
export const jobCateFunc = () => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job-category`,
      {}
      // { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: JOB_CATEGORY,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};
export const jobEmpTypeFunc = () => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job-employment-type`,
      {}
      // { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: JOB_EMPLOYEMENT_SIZE,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    // console.log("Error");
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const resetJob = () => (dispatch) => {
  dispatch({
    type: RESET_MODAL,
  });
};

export const deleteJobFunc = (uuid) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    let body = JSON.stringify({ uuid });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/delete`,
      body,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: DELETE_JOB_RECRUITER,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Job deleted ", "success"));
      dispatch(getAllRecruiterjobs());
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

export const editJobFunc = (uuid) => async (dispatch) => {
  // let body = JSON.stringify({ uuid });
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/edit/${uuid}`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: EDIT_JOB_RECRUITER,
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

export const updateJobFunc = (body, workspaceId) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/update`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: UPDATE_JOB_RECRUITER,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Job updated", "success"));
      dispatch(getAllRecruiterjobs());
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

export const StatusJobFunc = (body, value) => async (dispatch) => {
  console.log(value);
  try {
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/status`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: STATUS_CHANGE,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(
        ShowAlert(
          `Job Move to ${
            value === 0
              ? "Deactivate Jobs"
              : value === 1
              ? "Active Jobs"
              : value === 2
              ? "Active Jobs"
              : ""
          }`,
          "success"
        )
      );
      value === 0 && dispatch(getAllRecruiterjobs());
      value === 1 && dispatch(getAllArchivedRecruiterjobs({ is_archived: 1 }));
      value === 2 && dispatch(getAllDeActivateRecruiterjobs({ job_status: 0 }));
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
  }
};
export const StatusJobFuncArchived = (body, value) => async (dispatch) => {
  console.log(value);
  // uuid ,is_archived
  console.log(body);
  const data = JSON.stringify(body);
  const request = await axios.post(
    `${process.env.REACT_APP_API_URL}/job/archived/status`,
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
      dispatch(
        ShowAlert(
          `Job Move to ${
            value === 0
              ? "Archive"
              : value === 1
              ? "Active Job"
              : value === 2
              ? "Archived"
              : ""
          }`,
          "success"
        )
      );
      value === 0 && dispatch(getAllRecruiterjobs());
      value === 1 && dispatch(getAllArchivedRecruiterjobs({ is_archived: 1 }));
      value === 2 && dispatch(getAllDeActivateRecruiterjobs({ job_status: 0 }));

      // dispatch(getAllRecruiterjobs());
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
  }
};
