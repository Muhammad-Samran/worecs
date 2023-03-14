import axios from "axios";
const axiosFileApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosFileApi.interceptors.request.use(
  async (config) => {
    const value = await JSON.parse(localStorage.getItem("token"));
    if (value) {
      config.headers = {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${value}`,
      };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosFileApi;
