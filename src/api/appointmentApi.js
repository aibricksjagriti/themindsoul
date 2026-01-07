import api from "./axios";

export const createAppointment = (payload) => {
  return api.post("/api/appointments/create", payload);
};
