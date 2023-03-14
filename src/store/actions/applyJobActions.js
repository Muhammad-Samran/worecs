import axios from "axios";
import authHeader from "../../api/authToken";
import {
  LOADING_TRUE,
  RESET_MODAL,
  LOADING_FALSE,
  GET_CANDIDATE_FORM,
  GET_CANDIDATE_FORM_FAIL,
  GET_CANDIDATE_FORM_START,
  GET_CANDIDATE_SELECT_FAIL,
  GET_CANDIDATE_SELECT,
  GET_CANDIDATE_SELECT_START,
  GET_CANDIDATE_FORM_START_2,
  GET_CANDIDATE_FORM_2,
  GET_CANDIDATE_FORM_FAIL_2,
  GET_CANDIDATE_FORM_START_3,
  GET_CANDIDATE_FORM_3,
  GET_CANDIDATE_FORM_FAIL_3,
  GET_CANDIDATE_FORM_START_4,
  GET_CANDIDATE_FORM_4,
  GET_CANDIDATE_FORM_FAIL_4,
  GET_CANDIDATE_FORM_SENT,
  GET_CANDIDATE_FORM_SENT_FAIL,
  GET_CANDIDATE_FORM_SENT_START,
  GET_CANDIDATE_FORM_SENT_2,
  GET_CANDIDATE_FORM_SENT_FAIL_2,
  GET_CANDIDATE_FORM_SENT_START_2,
  GET_CANDIDATE_FORM_SENT_START_3,
  GET_CANDIDATE_FORM_SENT_3,
  GET_CANDIDATE_FORM_SENT_FAIL_3,
  GET_CANDIDATE_FORM_SENT_4,
  GET_CANDIDATE_FORM_SENT_FAIL_4,
  GET_CANDIDATE_FORM_SENT_START_4,
  GET_CANDIDATE_FORM_SENT_REMINDER,
  GET_CANDIDATE_FORM_SENT_REMINDER_FAIL,
  GET_CANDIDATE_FORM_SENT_REMINDER_START,
  GET_CANDIDATE_FORM_SENT_REMINDER_2,
  GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_2,
  GET_CANDIDATE_FORM_SENT_REMINDER_START_2,
  GET_CANDIDATE_FORM_SENT_REMINDER_3,
  GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_3,
  GET_CANDIDATE_FORM_SENT_REMINDER_START_3,
  GET_CANDIDATE_FORM_SENT_REMINDER_4,
  GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_4,
  GET_CANDIDATE_FORM_SENT_REMINDER_START_4,
  GET_CANDIDATE_FORM_VIEW,
  GET_CANDIDATE_FORM_SENT_REMINDER_5,
  GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_5,
  GET_CANDIDATE_FORM_SENT_REMINDER_START_5,
  GET_CANDIDATE_FORM_5,
  GET_CANDIDATE_FORM_FAIL_5,
  GET_CANDIDATE_FORM_START_5,
  GET_CANDIDATE_FORM_SENT_5,
  GET_CANDIDATE_FORM_SENT_FAIL_5,
  GET_CANDIDATE_FORM_SENT_START_5,
} from "../constants/constants";
import { ShowAlert } from "./alertActions";

export const resendFormCandidate = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_START,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/resend`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER,
      payload: results,
    });
    if (results?.success) {
      dispatch(ShowAlert("Form has been sent", "success"));
    } else {
      dispatch({
        type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const resendFormCandidate2 = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_START_2,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/resend`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_2,
      payload: results,
    });
    if (results?.success) {
      dispatch(ShowAlert("Form has been sent", "success"));
    } else {
      dispatch({
        type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_2,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_2,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};
export const resendFormCandidate3 = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_START_3,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/resend`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_3,
      payload: results,
    });
    if (results?.success) {
      dispatch(ShowAlert("Form has been sent", "success"));
    } else {
      dispatch({
        type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_3,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_3,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};
export const resendFormCandidate4 = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_START_4,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/resend`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_4,
      payload: results,
    });
    if (results?.success) {
      dispatch(ShowAlert("Form has been sent", "success"));
    } else {
      dispatch({
        type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_4,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_4,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const resendFormCandidate5 = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_START_5,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/resend`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_5,
      payload: results,
    });
    if (results?.success) {
      dispatch(ShowAlert("Form has been sent", "success"));
    } else {
      dispatch({
        type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_5,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_5,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const reqCandidateFormDetail = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_START,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/request`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_SENT,
      payload: results,
    });
    if (results?.success) {
      dispatch(ShowAlert("Form has been sent", "success"));
    } else {
      dispatch({
        type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_FAIL,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const reqCandidateFormDetail2 = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_START_2,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/request`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_SENT_2,
      payload: results,
    });
    if (results?.success) {
      dispatch(ShowAlert("Form has been sent", "success"));
    } else {
      dispatch({
        type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_FAIL_2,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};
export const reqCandidateFormDetail3 = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_START_3,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/request`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_SENT_3,
      payload: results,
    });
    if (results?.success) {
      dispatch(ShowAlert("Form has been sent", "success"));
    } else {
      dispatch({
        type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_FAIL_3,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};
export const reqCandidateFormDetail4 = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_START_4,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/request`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_SENT_4,
      payload: results,
    });
    if (results?.success) {
      dispatch(ShowAlert("Form has been sent", "success"));
    } else {
      dispatch({
        type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_FAIL_4,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const reqCandidateFormDetail5 = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_START_5,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/request`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_SENT_5,
      payload: results,
    });
    if (results?.success) {
      dispatch(ShowAlert("Form has been sent", "success"));
    } else {
      dispatch({
        type: GET_CANDIDATE_FORM_SENT_REMINDER_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_SENT_FAIL_5,
    });
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};

export const getCandidateFormDetail = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_START,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/index`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM,
      payload: results,
    });
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_FAIL,
    });
  }
};

export const getCandidateFormDetail2 = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_START_2,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/index`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_2,
      payload: results,
    });
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_FAIL_2,
    });
  }
};

export const getCandidateFormDetail3 = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_START_3,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/index`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_3,
      payload: results,
    });
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_FAIL_3,
    });
  }
};

export const getCandidateFormDetail4 = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_FORM_START_4,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/form/index`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_4,
      payload: results,
    });
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_FORM_FAIL_4,
    });
  }
};

export const getCandidateFormSelect = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_CANDIDATE_SELECT_START,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/form-builder/get-form-builder`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_SELECT,
      payload: results,
    });
    if (results?.success === false) {
      dispatch({
        type: GET_CANDIDATE_SELECT_FAIL,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_CANDIDATE_SELECT_FAIL,
    });
  }
};

export const resetSelecCandidate = () => async (dispatch) => {
  dispatch({
    type: RESET_MODAL,
  });
};

export const viewForm = (uuid) => async (dispatch) => {
  try {
    const data = JSON.stringify({ uuid: uuid });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/form-submission/show/${uuid}`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_CANDIDATE_FORM_VIEW,
      payload: results,
    });
    // dispatch(ShowAlert("SuccessFull", "success"));
  } catch (e) {
    dispatch(ShowAlert("Something went wrong", "error"));
  }
};
