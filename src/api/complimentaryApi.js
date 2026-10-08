import { API_BASE_URL } from "./apiConfig.js";
import { fetchJson } from "./bookingStatus.js";

const base = (import.meta.env?.VITE_COMPLIMENTARY_API_BASE_URL || API_BASE_URL).replace(/\/$/, "");
export const complimentaryEligibility = (token, signal) => fetchJson(`${base}/api/complimentary/eligibility`, { headers: { Authorization: `Bearer ${token}` }, signal });
export const createComplimentaryBooking = (payload, token) => fetchJson(`${base}/api/complimentary/appointments`, {
  method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload),
});
export const complimentaryRequestStatus = (requestId, token) => fetchJson(`${base}/api/complimentary/requests/${encodeURIComponent(requestId)}`, { headers: { Authorization: `Bearer ${token}` } });
export const complimentaryHostLink = (appointmentId) => fetchJson(`${base}/api/complimentary/appointments/${encodeURIComponent(appointmentId)}/host`, { credentials: "include" });
