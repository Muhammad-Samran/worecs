import EndPoints from "../EndPoints";
import axios from "../axiosConfig";

export const createForm = async (payload) => {
  try {
    return await axios.post(EndPoints.createForm, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};
