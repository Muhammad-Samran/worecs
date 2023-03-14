import EndPoints from "../EndPoints";
import axios from "./axiosFileUpload";

// Upload Files Section
export const uploadFiles = async (payload) => {
  try {
    return await axios.post(EndPoints.uploadFiles, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const uploadResume = async (payload) => {
  try {
    return await axios.post(EndPoints.uploadResume, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const deleteResume = async (payload) => {
  try {
    return await axios.post(EndPoints.deleteResume, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const showResume = async (payload) => {
  try {
    return await axios.post(EndPoints.showResume, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// multipart/form-data
