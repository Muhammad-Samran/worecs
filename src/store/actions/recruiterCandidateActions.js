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
  GET_ALL_CREATED_INDUSTIRES_CANDIDATE_START,
  GET_ALL_CREATED_CANDITDATE_INDUSTIRES,
  SHOW_CANDIDATE_RECRUITER,
  CREATE_EXISIT_CANDIDATE_RECRUITER,
} from "../constants/constants";
import { ShowAlert } from "./alertActions";

export const getAllRecruiterCandidate = () => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });

  try {
    dispatch({
      type: GET_ALL_CANDIDATE_RECRUITER_START,
    });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/index`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_ALL_CANDIDATE_RECRUITER,
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
export const getAllRecruiterCreatedIndustry = (body) => async (dispatch) => {
  // dispatch({
  //   type: LOADING_TRUE,
  // });
  const data = JSON.stringify(body);
  try {
    dispatch({
      type: GET_ALL_CREATED_INDUSTIRES_CANDIDATE_START,
    });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/recruitment-industry/get-recruitment-industry-id`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_ALL_CREATED_CANDITDATE_INDUSTIRES,
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
export const getExisitingCandidateFunc = (body) => async (dispatch) => {
  // dispatch({
  //   type: LOADING_TRUE,
  // });
  const data = JSON.stringify(body);
  try {
    // dispatch({
    //   type: GET_ALL_CREATED_INDUSTIRES_START,
    // });

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/getListing`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_EXISITING_CANDIDATE,
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

export const editCandidateFunc = (uuid) => async (dispatch) => {
  // let body = JSON.stringify({ uuid });
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/edit/${uuid}`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: EDIT_CANDIDATE_RECRUITER,
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
export const ShowCandidateFunc = (uuid) => async (dispatch) => {
  // let body = JSON.stringify({ uuid });
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/show/${uuid}`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: SHOW_CANDIDATE_RECRUITER,
      payload: results,
    });
    localStorage.setItem("candidateID", results?.results?.id);
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
// export const StatusJobFunc = (body, value) => async (dispatch) => {
//   console.log(value);
//   try {
//     const data = JSON.stringify(body);
//     const request = await axios.post(
//       `${process.env.REACT_APP_API_URL}/workspace/user/member/user_status`,
//       data,
//       { headers: authHeader() }
//     );
//     const results = await request.data;

//     dispatch({
//       type: STATUS_CHANGE,
//       payload: results,
//     });
//     if (results?.success === true) {
//       dispatch(ShowAlert("Status Changed", "success"));
//       value === 0 && dispatch(getAllRecruiterjobs());
//       value === 1 && dispatch(getAllArchivedRecruiterjobs({ is_archived: 1 }));
//       value === 2 && dispatch(getAllDeActivateRecruiterjobs({ job_status: 0 }));
//     } else {
//       if (Object.keys(results?.message).length > 0) {
//         Object.entries(results?.message)?.map(([key, value], i) =>
//           dispatch(ShowAlert(value, "error"))
//         );
//       } else {
//         dispatch(ShowAlert(results?.message, "error"));
//       }
//     }
//   } catch (e) {
//     // console.log("Error");
//     dispatch(ShowAlert("Something went wrong", "error"));
//   }
// };

export const createCandidateFunc = (body) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const data = JSON.stringify(body);

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/store`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: CREATE_CANDIDATE_RECRUITER,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Candidate created", "success"));
      dispatch(getAllRecruiterCandidate());

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

export const existCreateCandidateFunc = (body) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const data = JSON.stringify(body);

    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/workspace/candidate/already/exist`,
      data,
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: CREATE_EXISIT_CANDIDATE_RECRUITER,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("An email sent to candidate", "success"));
      dispatch(getAllRecruiterCandidate());

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

export const resetCandidate = () => (dispatch) => {
  dispatch({
    type: RESET_MODAL,
  });
};

// export const deleteJobFunc = (uuid) => async (dispatch) => {
//   dispatch({
//     type: LOADING_TRUE,
//   });
//   try {
//     let body = JSON.stringify({ uuid });
//     const request = await axios.post(
//       `${process.env.REACT_APP_API_URL}/job/delete`,
//       body,
//       { headers: authHeader() }
//     );
//     const results = await request.data;

//     dispatch({
//       type: DELETE_JOB_RECRUITER,
//       payload: results,
//     });
//     if (results?.success === true) {
//       dispatch(ShowAlert("Job Deleted ", "success"));
//       dispatch(getAllRecruiterjobs());
//       dispatch({
//         type: LOADING_FALSE,
//       });
//     } else {
//       dispatch(ShowAlert("Somthing Went Wrong", "error"));
//       dispatch({
//         type: LOADING_FALSE,
//       });
//     }
//   } catch (e) {
//     dispatch(ShowAlert("Something went wrong", "error"));
//     dispatch({
//       type: LOADING_FALSE,
//     });
//   }
// };

// export const editJobFunc = (uuid) => async (dispatch) => {
//   // let body = JSON.stringify({ uuid });
//   dispatch({
//     type: LOADING_TRUE,
//   });
//   try {
//     const request = await axios.post(
//       `${process.env.REACT_APP_API_URL}/job/edit/${uuid}`,
//       {},
//       { headers: authHeader() }
//     );
//     const results = await request.data;

//     dispatch({
//       type: EDIT_JOB_RECRUITER,
//       payload: results,
//     });
//     dispatch({
//       type: LOADING_FALSE,
//     });
//   } catch (e) {
//     dispatch(ShowAlert("Something went wrong", "error"));
//     dispatch({
//       type: LOADING_FALSE,
//     });
//   }
// };

// export const updateJobFunc = (body, workspaceId) => async (dispatch) => {
//   dispatch({
//     type: LOADING_TRUE,
//   });
//   try {
//     const data = JSON.stringify(body);
//     const request = await axios.post(
//       `${process.env.REACT_APP_API_URL}/job/update`,
//       data,
//       { headers: authHeader() }
//     );
//     const results = await request.data;

//     dispatch({
//       type: UPDATE_JOB_RECRUITER,
//       payload: results,
//     });
//     if (results?.success === true) {
//       dispatch(ShowAlert("Job Updated", "success"));
//       dispatch(getAllRecruiterjobs());
//     } else {
//       if (Object.keys(results?.message).length > 0) {
//         Object.entries(results?.message)?.map(([key, value], i) =>
//           dispatch(ShowAlert(value, "error"))
//         );
//         dispatch({
//           type: LOADING_FALSE,
//         });
//       } else {
//         dispatch(ShowAlert(results?.message, "error"));
//         dispatch({
//           type: LOADING_FALSE,
//         });
//       }
//     }
//   } catch (e) {
//     // console.log("Error");
//     dispatch(ShowAlert("Something went wrong", "error"));
//     dispatch({
//       type: LOADING_FALSE,
//     });
//   }
// };

// export const StatusJobFunc = (body, value) => async (dispatch) => {
//   console.log(value);
//   try {
//     const data = JSON.stringify(body);
//     const request = await axios.post(
//       `${process.env.REACT_APP_API_URL}/job/status`,
//       data,
//       { headers: authHeader() }
//     );
//     const results = await request.data;

//     dispatch({
//       type: STATUS_CHANGE,
//       payload: results,
//     });
//     if (results?.success === true) {
//       dispatch(ShowAlert("Status Changed", "success"));
//       value === 0 && dispatch(getAllRecruiterjobs());
//       value === 1 && dispatch(getAllArchivedRecruiterjobs({ is_archived: 1 }));
//       value === 2 && dispatch(getAllDeActivateRecruiterjobs({ job_status: 0 }));
//     } else {
//       if (Object.keys(results?.message).length > 0) {
//         Object.entries(results?.message)?.map(([key, value], i) =>
//           dispatch(ShowAlert(value, "error"))
//         );
//       } else {
//         dispatch(ShowAlert(results?.message, "error"));
//       }
//     }
//   } catch (e) {
//     // console.log("Error");
//     dispatch(ShowAlert("Something went wrong", "error"));
//   }
// };
