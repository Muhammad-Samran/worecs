import axios from "axios";
import { loadScript } from "pdfjs-dist";
import authHeader from "../../api/authToken";
import {
  CREATE_COMPANY,
  EDIT_COMPANY,
  GET_COMPANY_LIST,
  IS_COMPANY_EXISIT,
  LOADING_FALSE,
  LOADING_TRUE,
  RESET_MODAL,
  UPDATE_COMPANY,
  DELETE_COMPANY_IMAGE,
} from "../constants/constants";
import { ShowAlert } from "./alertActions";
import { refreshToken } from "./authActions";

export const isCompanyExisit = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/company-detail/get-company-detail-id`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: IS_COMPANY_EXISIT,
      payload: results,
    });

    if (results.success === false) {
      if (typeof results?.message === "object") {
        Object.entries(results?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert("Create Company First", "error"));
      }
    }
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

export const createCompany = (body) => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });

  try {
    const formdata = new FormData();
    Object.entries(body).map(([key, value]) => formdata.append(key, value));
    // console.log(body);
    // const data = JSON.stringify(body);
    // console.log(data);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/company-detail/store`,
      formdata,
      {
        headers: authHeader(),
      }
    );
    const results = await request.data;

    dispatch({
      type: CREATE_COMPANY,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("COMPANY Created", "success"));
      await dispatch(refreshToken());
      await dispatch(getCompany());
      // dispatch(editCompany(results?.results?.uuid));
      //   dispatch(getAllRecruiterMembers(workspace_id));
      dispatch({
        type: LOADING_FALSE,
      });
    } else  if (typeof results.message === "object") {
        Object.entries(results?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(results.message, "error"));
      }

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

export const editCompany = (uuid) => async (dispatch) => {
  // let body = JSON.stringify({ uuid });
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/company-detail/edit/${uuid}`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: EDIT_COMPANY,
      payload: results,
    });
    localStorage.setItem("companyEdit", JSON.stringify(results));

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

export const getCompany = () => async (dispatch) => {
  dispatch({
    type: LOADING_TRUE,
  });
  try {
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/company-detail/index`,
      {},
      { headers: authHeader() }
    );
    const results = await request.data;

    dispatch({
      type: GET_COMPANY_LIST,
      payload: results,
    });
    localStorage.setItem("company", JSON.stringify(results));
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

export const updateCompany = (body) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const formdata = new FormData();
    Object.entries(body).map(([key, value]) => formdata.append(key, value));
    // console.log(body);
    // const data = JSON.stringify(body);
    // console.log(data);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/company-detail/update`,
      formdata,
      {
        headers: authHeader(),
      }
    );
    const results = await request.data;

    dispatch({
      type: UPDATE_COMPANY,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Updated company ", "success"));
      await dispatch(refreshToken());
      await dispatch(getCompany());
      //   dispatch(getAllRecruiterMembers(workspace_id));
      dispatch({
        type: LOADING_FALSE,
      });
    } else if (typeof results.message === "object") {
      Object.entries(results?.message)?.map(([key, value], i) =>
        dispatch(ShowAlert(value, "error"))
      );
    } else {
      dispatch(ShowAlert(results.message, "error"));
    }

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
//

export const deleteImage = (body, body2) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const formdata = new FormData();
    // Object.entries(body).map(([key, value]) => formdata.append(key, value));
    // console.log(body);
    const data = JSON.stringify({ uuid: body });
    // console.log(data);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/job/company-detail/image/delete`,
      data,
      {
        headers: authHeader(),
      }
    );
    const results = await request.data;

    dispatch({
      type: DELETE_COMPANY_IMAGE,
      payload: results,
    });
    if (results?.success === true) {
      dispatch(ShowAlert("Company image deleted ", "success"));
      dispatch(refreshToken());
      // dispatch(getProfile(body2));
      // dispatch(getCompany());
      //   dispatch(getAllRecruiterMembers(workspace_id));
      dispatch({
        type: LOADING_FALSE,
      });
    } else  if (typeof results.message === "object") {
        Object.entries(results?.message)?.map(([key, value], i) =>
          dispatch(ShowAlert(value, "error"))
        );
      } else {
        dispatch(ShowAlert(results.message, "error"));
      }

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

// export const editMember = (uuid) => async (dispatch) => {
//   // let body = JSON.stringify({ uuid });
//   dispatch({
//     type: LOADING_TRUE,
//   });
//   try {
//     const request = await axios.post(
//       `${process.env.REACT_APP_API_URL}/workspace/user/member/edit/${uuid}`,
//       {},
//       { headers: authHeader() }
//     );
//     const results = await request.data;

//     dispatch({
//       type: EDIT_MEMBER_RECRUITER,
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

// export const updateMember = (body, workspaceId) => async (dispatch) => {
//   dispatch({
//     type: LOADING_TRUE,
//   });
//   try {
//     const data = JSON.stringify(body);
//     const request = await axios.post(
//       `${process.env.REACT_APP_API_URL}/workspace/user/member/update`,
//       data,
//       { headers: authHeader() }
//     );
//     const results = await request.data;

//     dispatch({
//       type: UPDATE_MEMBER_RECRUITER,
//       payload: results,
//     });
//     if (results?.success === true) {
//       dispatch(ShowAlert("Member Updated", "success"));
//       dispatch(getAllRecruiterMembers(workspaceId));
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

// export const deleteMember =
//   (uuid, workspaceId, owner_name) => async (dispatch) => {
//     dispatch({
//       type: LOADING_TRUE,
//     });
//     try {
//       if (owner_name === "Owner") {
//         return dispatch(ShowAlert("You Cannot Delete The Owner", "error"));
//       }
//       let body = JSON.stringify({ uuid });
//       const request = await axios.post(
//         `${process.env.REACT_APP_API_URL}/workspace/user/member/delete`,
//         body,
//         { headers: authHeader() }
//       );
//       const results = await request.data;

//       dispatch({
//         type: DELETE_MEMBER_RECRUITER,
//         payload: results,
//       });
//       if (results?.success === true) {
//         dispatch(ShowAlert("Member Deleted ", "success"));
//         dispatch(getAllRecruiterMembers(workspaceId));
//         dispatch({
//           type: LOADING_FALSE,
//         });
//       } else {
//         dispatch(ShowAlert("Somthing Went Wrong", "error"));
//         dispatch({
//           type: LOADING_FALSE,
//         });
//       }
//     } catch (e) {
//       dispatch(ShowAlert("Something went wrong", "error"));
//       dispatch({
//         type: LOADING_FALSE,
//       });
//     }
//   };
// export const StatusChangeMember = (body, workspaceId) => async (dispatch) => {
//   const data = JSON.stringify(body);
//   const request = await axios.post(
//     `${process.env.REACT_APP_API_URL}/workspace/user/member/status`,
//     data,
//     { headers: authHeader() }
//   );
//   const results = await request.data;

//   try {
//     dispatch({
//       type: STATUS_CHANGE,
//       payload: results,
//     });
//     if (results?.success === true) {
//       dispatch(ShowAlert("Status Changed", "success"));
//       dispatch(getAllRecruiterMembers(workspaceId));
//       //   dispatch(getAllCreatedIndustry(workspaceId));
//     } else {
//       dispatch(ShowAlert(results?.message, "error"));
//     }
//   } catch (e) {
//     // console.log("Error");
//     dispatch(ShowAlert("Something went wrong", "error"));
//   }
// };

export const resetCompany = () => (dispatch) => {
  dispatch({
    type: RESET_MODAL,
  });
};
