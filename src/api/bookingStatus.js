import { API_BASE_URL } from "./apiConfig.js";
const BASE_URL = `${API_BASE_URL}/api`;

export const fetchJson = async (url, options = {}) => {
  const controller = new AbortController();
  const abort = () => controller.abort();
  const signal = options.signal;
  if (signal?.aborted) controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  const timeout = setTimeout(abort, 10000);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const data = await response.json();
    if (!response.ok || data.success === false) {
      const error = new Error(data.message || "Request failed. Please try again.");
      error.status = response.status;
      throw error;
    }
    return data;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
};

const delay = (milliseconds, signal) => new Promise((resolve, reject) => {
  const abort = () => {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
    reject(new DOMException("Request cancelled", "AbortError"));
  };
  const timer = setTimeout(() => {
    signal?.removeEventListener("abort", abort);
    resolve();
  }, milliseconds);
  if (signal?.aborted) abort();
  else signal?.addEventListener("abort", abort, { once: true });
});

export const waitForScheduledAppointment = async ({
  appointmentId, token, signal, attempts = 15, intervalMs = 2000,
}) => {
  for (let i = 0; i < attempts; i++) {
    const result = await fetchJson(`${BASE_URL}/users/appointments`, {
      headers: { Authorization: `Bearer ${token}` }, signal,
    });
    if (!Array.isArray(result.data)) throw new Error("Invalid appointment response");
    const appointment = result.data.find((item) => item.id === appointmentId);
    if (appointment?.status === "scheduled") return appointment;
    if (appointment?.status?.startsWith("cancelled")) {
      throw new Error("This appointment could not be scheduled. Contact support before paying again.");
    }
    if (i < attempts - 1) await delay(intervalMs, signal);
  }
  throw new Error("Your booking is still processing. Check its status again; do not pay again.");
};
