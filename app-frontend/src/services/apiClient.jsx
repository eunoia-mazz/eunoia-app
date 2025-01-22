import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://",
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;
