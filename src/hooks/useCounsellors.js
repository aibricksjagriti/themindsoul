import { API_BASE_URL } from "../api/apiConfig.js";
import { useEffect, useState } from "react";
import { fetchJson } from "../api/bookingStatus";

export default function useCounsellors() {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError("");
    fetchJson(`${API_BASE_URL}/api/counsellor/list`, { signal: controller.signal })
      .then((data) => {
        if (!Array.isArray(data.counsellors)) throw new Error("We couldn't load the counsellor directory. Please try again.");
        if (!controller.signal.aborted) setCounsellors(data.counsellors);
      }).catch((error) => { if (!controller.signal.aborted) setError(error.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);
  return { counsellors, loading, error, retry: () => setAttempt((value) => value + 1) };
}
