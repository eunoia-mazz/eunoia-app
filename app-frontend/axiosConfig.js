import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.REACT_APP_API_BASE_URL_PROD,
  baseURL: import.meta.env.REACT_APP_API_BASE_URL_DEV,
});

export default api;
