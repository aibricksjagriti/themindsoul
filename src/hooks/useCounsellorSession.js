import { useEffect, useState } from "react";
import { checkCounsellorSession } from "../api/counsellorSession";
import { useAuth } from "../context/AuthContext";

export const useCounsellorSession = () => {
  const { loginCounsellor, clearCounsellorSession } = useAuth();
  const [state, setState] = useState({ loading: true, session: null, error: "" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setState({ loading: true, session: null, error: "" });
    checkCounsellorSession(controller.signal).then((session) => {
      if (controller.signal.aborted) return;
      if (session) {
        loginCounsellor(session.counsellorId);
      } else {
        clearCounsellorSession();
      }
      setState({ loading: false, session, error: "" });
    }).catch((error) => {
      if (!controller.signal.aborted) setState({ loading: false, session: null, error: error.message || "Could not verify your session" });
    });
    return () => controller.abort();
  }, [attempt, loginCounsellor, clearCounsellorSession]);
  return { ...state, retry: () => setAttempt((value) => value + 1) };
};
