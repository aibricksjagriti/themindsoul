import { API_BASE_URL } from "./apiConfig.js";
import { fetchJson } from "./bookingStatus.js";

export const checkCounsellorSession = async (signal) => {
  try {
    const session = await fetchJson(`${API_BASE_URL}/api/counsellor/session`, {
      credentials: "include", signal,
    });
    if (session.role !== "counsellor" || typeof session.counsellorId !== "string" || !session.counsellorId) {
      throw new Error("Invalid counsellor session response");
    }
    return session;
  } catch (error) {
    if (error.status === 401 || error.status === 403) return null;
    throw error;
  }
};
