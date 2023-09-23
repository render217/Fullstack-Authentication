import axios from "axios";

// const BASE_URL = import.meta.env.VITE_SERVER_URI;
const BASE_URL = "https://fair-erin-gecko-cape.cyclic.app";

export const httpClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;
