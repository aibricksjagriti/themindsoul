import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { complimentaryEligibility } from "../api/complimentaryApi";

export default function useBookingAccess() {
  const { token, user } = useAuth();
  const [state, setState] = useState({ loading: false, eligible: false, error: "" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!token || user?.role !== "user") { setState({ loading: false, eligible: false, error: "" }); return; }
    const controller = new AbortController();
    setState({ loading: true, eligible: false, error: "" });
    complimentaryEligibility(token,controller.signal).then((data) => {
      if (typeof data.eligible !== "boolean") throw new Error("Booking access could not be verified");
      if (!controller.signal.aborted) setState({ loading: false, eligible: data.eligible, error: "" });
    }).catch(() => { if (!controller.signal.aborted) setState({ loading: false, eligible: false, error: "We couldn't verify your booking access. Please try again." }); });
    return () => controller.abort();
  }, [token,user?.role,attempt]);
  return { ...state, retry: () => setAttempt((value) => value + 1) };
}
