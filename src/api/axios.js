import { API_BASE_URL } from "./apiConfig.js";
import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL, // your backend
  withCredentials: true,
});

export default api;
