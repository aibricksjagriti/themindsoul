import axios from "axios";

const BASE_URL =
  "https://mindsoul-backend-772700176760.asia-south1.run.app/api/timeslots";

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
