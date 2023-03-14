import axios from "axios";
import authHeader from "../../api/authToken";
import {
  CREATE_CANDIDATE_RECRUITER,
  DELETE_CANDIDATE_RECRUITER,
  EDIT_CANDIDATE_RECRUITER,
  GET_ALL_CANDIDATE_RECRUITER,
  LOADING_FALSE,
  LOADING_TRUE,
  RESET_MODAL,
  STATUS_CHANGE,
  UPDATE_CANDIDATE_RECRUITER,
  GET_EXISITING_CANDIDATE,
  GET_ALL_CANDIDATE_RECRUITER_START,
  GET_ALL_CREATED_INDUSTIRES_START,
  GET_ALL_CREATED_INDUSTIRES,
  SHOW_CANDIDATE_RECRUITER,
  CREATE_EXISIT_CANDIDATE_RECRUITER,
  SHOW_CANDIDATE_RECRUITER_REFF_START,
  SHOW_CANDIDATE_RECRUITER_REFF,
  SHOW_CANDIDATE_RECRUITER_CERTIFICATE_START,
  SHOW_CANDIDATE_RECRUITER_CERTIFICATE,
  CREATE_CANDIDATE_RECRUITER_REFF,
  REST_REFF,
  CREATE_CANDIDATE_RECRUITER_CERTIFICATE,
  CREATE_CANDIDATE_RECRUITER_INTERVIEW,
  SHOW_CANDIDATE_RECRUITER_INTERVIEW,
  SHOW_CANDIDATE_RECRUITER_INTERVIEW_START,
  STATUS_SINGLE_CANDIDATE_RECRUITER_REFF,
  STATUS_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
  RESEND_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
  RESEND_SINGLE_CANDIDATE_RECRUITER_REFF,
  EDIT_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
  UPDATE_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
  UPDATE_CANDIDATE_RECRUITER_INTERVIEW,
  EDIT_CANDIDATE_RECRUITER_INTERVIEW,
  SHOW_CANDIDATE_RECRUITER_REFF_FAIL,
  SHOW_CANDIDATE_RECRUITER_INTERVIEW_FAIL,
  SHOW_CANDIDATE_RECRUITER_CERTIFICATE_FAIL,
  DELETE_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
  SHOW_CANDIDATE_RECRUITER_INTERVIEW_RESEND,
} from "../constants/constants";
import { ShowAlert } from "./alertActions";

export const getAllRecruiterCandidateReff = (body) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });

  dispatch({
    type: SHOW_CANDIDATE_RECRUITER_REFF_START,
  });
  try {
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/reference/index`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: SHOW_CANDIDATE_RECRUITER_REFF,
      payload: results,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  } catch (e) {
    // console.log("Error");
    // dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: SHOW_CANDIDATE_RECRUITER_REFF_FAIL,
    });
    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const getAllRecruiterCandidateCertificates =
  (body) => async (dispatch) => {
    dispatch({
      type: LOADING_TRUE,
    });
    dispatch({
      type: SHOW_CANDIDATE_RECRUITER_CERTIFICATE_START,
    });

    try {
      const data = JSON.stringify(body);
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}/workspace/candidate/license-certification/index`,
        data,
        { headers: authHeader() }
      );
      const results = await request.data;

      dispatch({
        type: SHOW_CANDIDATE_RECRUITER_CERTIFICATE,
        payload: results,
      });
      dispatch({
        type: LOADING_FALSE,
      });
    } catch (e) {
      // console.log("Error");
      // dispatch(ShowAlert("Something went wrong", "error"));
      dispatch({
        type: SHOW_CANDIDATE_RECRUITER_CERTIFICATE_FAIL,
      });
      dispatch({
        type: LOADING_FALSE,
      });
    }
  };

export const resetSingleCandidate = () => (dispatch) => {
  dispatch({
    type: RESET_MODAL,
  });
};
export const resetSingleCandidateReff = () => (dispatch) => {
  dispatch({
    type: REST_REFF,
  });
};

//REST_REFF

export const createSingleReffFunc = (body, body2) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const data = JSON.stringify(body);

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/reference/request`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: CREATE_CANDIDATE_RECRUITER_REFF,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Reffernce added", "success"));
      dispatch(getAllRecruiterCandidateReff(body2));

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

export const createSingleReffFunc2 = (body, body2) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/reference/store`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: CREATE_CANDIDATE_RECRUITER_REFF,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Reffernce added", "success"));
      dispatch(getAllRecruiterCandidateReff(body2));

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
    console.log("Error", e);
    dispatch(ShowAlert("Something went wrong", "error"));
    dispatch({
      type: LOADING_FALSE,
    });
  }
};
export const createSingleCertificateFunc =
  (body, body2) => async (dispatch) => {
    dispatch({
      type: LOADING_TRUE,
    });
    try {
      const data = JSON.stringify(body);

      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}/workspace/candidate/license-certification/store`,
        data,
        { headers: authHeader() }
      );
      const results = await request.data;

      dispatch({
        type: CREATE_CANDIDATE_RECRUITER_CERTIFICATE,
        payload: results,
      });
      if (results?.success === true) {
        dispatch(ShowAlert("Certificate added", "success"));
        dispatch(getAllRecruiterCandidateCertificates(body2));

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

export const getAllRecruiterInterview = (body) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });
    dispatch({
      type: SHOW_CANDIDATE_RECRUITER_INTERVIEW_START,
    });

    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/interview/index`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: SHOW_CANDIDATE_RECRUITER_INTERVIEW,
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
    dispatch({
      type: SHOW_CANDIDATE_RECRUITER_INTERVIEW_FAIL,
    });
  }
};
export const createSingleInterviewFunc = (body, body2) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const data = JSON.stringify(body);

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/interview/store`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: CREATE_CANDIDATE_RECRUITER_INTERVIEW,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Interview created", "success"));
      dispatch(getAllRecruiterInterview(body2));

      dispatch({
        type: LOADING_FALSE,
      });
    } else {
      if (typeof results?.message === "object") {
        Object.entries(results?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert("Something went wrong", "error"));
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
//

export const updateSingleInterviewFunc = (body, body2) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/interview/update`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;
    dispatch({
      type: UPDATE_CANDIDATE_RECRUITER_INTERVIEW,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Updated", "success"));
      dispatch(getAllRecruiterInterview(body2));

      dispatch({
        type: LOADING_FALSE,
      });
    } else {
      if (typeof results?.message === "object") {
        Object.entries(results?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        console.log(results?.message);
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

export const editSingleCandidateInterview = (uuid) => async (dispatch) => {
  // let body = JSON.stringify({ uuid });
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    // const body = JSON.stringify(candidate);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/interview/edit/${uuid}`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: EDIT_CANDIDATE_RECRUITER_INTERVIEW,
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

export const resendSingleCandidateInterview = (uuid) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    let body = JSON.stringify({ uuid });
    // const body = JSON.stringify(candidate);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/interview/resend`,
      body,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: SHOW_CANDIDATE_RECRUITER_INTERVIEW_RESEND,
      payload: results,
    });
    dispatch(ShowAlert("Interview Resend", "success"));
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

//
// STATUS_CANDIDATE_RECRUITER_INTERVIEW
export const updateSingleCertificateFunc =
  (body, body2) => async (dispatch) => {
    dispatch({
      type: LOADING_TRUE,
    });
    try {
      const data = JSON.stringify(body);
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}/workspace/candidate/license-certification/update`,
        data,
        { headers: authHeader() }
      );
      const results = await request.data;
      dispatch({
        type: UPDATE_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
        payload: results,
      });
      if (results?.success === true) {
        dispatch(ShowAlert("Updated", "success"));
        dispatch(getAllRecruiterCandidateCertificates(body2));

        dispatch({
          type: LOADING_FALSE,
        });
      } else {
        if (typeof results?.message === "object") {
          Object.entries(results?.message)?.map(([key, value], i) =>
            dispatch(ShowAlert(value, "error"))
          );
        } else {
          console.log(results?.message);
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

export const StatusShowSingleReffFunc = (uuid, body) => async (dispatch) => {
  try {
    const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/reference/show/${uuid}`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: STATUS_SINGLE_CANDIDATE_RECRUITER_REFF,
      payload: results,
    });
    if (results?.success === true) {
      // dispatch(ShowAlert("Status Changed", "success"));
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
  }
};
export const StatusShowSingleCertificateFunc = (uuid) => async (dispatch) => {
  try {
    // const data = JSON.stringify(body);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/license-certification/show/${uuid}`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: STATUS_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
      payload: results,
    });
    if (results?.success === true) {
      // dispatch(ShowAlert("Status Changed", "success"));
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
  }
};

export const resendSingleCertificateFunc = (uuid) => async (dispatch) => {
  try {
    const data = JSON.stringify({ uuid });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/license-certification/resend`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: RESEND_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Status changed", "success"));
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
  }
};
export const resendSingleReffFunc = (uuid, name) => async (dispatch) => {
  try {
    const data = JSON.stringify({ uuid });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/reference/verify`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: RESEND_SINGLE_CANDIDATE_RECRUITER_REFF,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert(results?.message, "success"));
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
  }
};
export const verifySingleReffFunc = (uuid, name) => async (dispatch) => {
  try {
    const data = JSON.stringify({ uuid });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/reference/verify`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: RESEND_SINGLE_CANDIDATE_RECRUITER_REFF,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert(results?.message, "success"));
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
  }
};

export const verifySingleCandidateCertificate =
  (uuid, name) => async (dispatch) => {
    try {
      const data = JSON.stringify({ uuid });
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}/workspace/candidate/license-certification/verify`,
        data,
        { headers: authHeader() }
      );
      const results = await request.data;

      dispatch({
        type: RESEND_SINGLE_CANDIDATE_RECRUITER_REFF,
        payload: results,
      });
      if (results?.success === true) {
        dispatch(ShowAlert("Successfully verified", "success"));
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
    }
  };

export const editSingleCandidateCertificate =
  (uuid, candidate) => async (dispatch) => {
    // let body = JSON.stringify({ uuid });
    dispatch({
      type: LOADING_TRUE,
    });
    try {
      const body = JSON.stringify(candidate);
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}/workspace/candidate/license-certification/edit/${uuid}`,
        body,
        { headers: authHeader() }
      );
      const results = await request.data;

      dispatch({
        type: EDIT_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
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

export const deleteInterviewFucntion = (uuid, body2) => async (dispatch) => {
  try {
    let body = JSON.stringify({ uuid });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/interview/delete`,
      body,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: DELETE_SINGLE_CANDIDATE_RECRUITER_CERTIFICATE,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Interview deleted ", "success"));
      dispatch(getAllRecruiterInterview(body2));
      // dispatch(getAllCreatedIndustry(workspaceId));
      dispatch({
        type: LOADING_FALSE,
      });
    } else {
      dispatch({
        type: LOADING_FALSE,
      });
      dispatch(ShowAlert("Something Went Wrong", "error"));
    }
  } catch (e) {
    dispatch({
      type: LOADING_FALSE,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};
