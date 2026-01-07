import api from "./axios";

export const createRazorpayOrder = (appointmentId) => {
  return api.post("/api/payments/create-order", {
    appointmentId,
  });
};

export const verifyRazorpayPayment = (payload) => {
  return api.post("/api/payments/verify-payment", payload);
};
