import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("ql_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || "Unable to connect to server.";

    if (status === 401) {
      toast.error("Session expired. Please login again.");
      Cookies.remove("ql_token");
      window.location.href = "/login";
    } else if (status === 403) {
      toast.error("Access denied.");
    } else if (status >= 500) {
      toast.error("Server error. Try again later.");
    } else if (message) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;

