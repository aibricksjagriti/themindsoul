import { API_BASE_URL } from "./apiConfig.js";
import axios from "axios";

const BASE_URL =
  `${API_BASE_URL}/api/timeslots`;

// 1. Fetch slots for selected date
export const fetchSlots = async (counsellorId, date) => {
  return axios.get(`${BASE_URL}/counsellor/${counsellorId}/slots`, {
    params: { date },
    withCredentials: true,
  });
};

// 2. Generate slots for a date if missing
export const generateSlots = async (counsellorId, date) => {
  return axios.post(
    `${BASE_URL}/counsellor/${counsellorId}/slots/generate`,
    { date },
    { withCredentials: true }
  );
};

// 3. Delete slots (admin action)
export const deleteSlots = async (counsellorId, date) => {
  return axios.delete(`${BASE_URL}/counsellor/${counsellorId}/slots`, {
    params: { date },
    withCredentials: true,
  });
};
