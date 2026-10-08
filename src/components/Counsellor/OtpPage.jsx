import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import ModalFrame from "../ui/ModalFrame";

export default function OtpPage({ onClose }) {
  const navigate = useNavigate(); const { loginCounsellor } = useAuth();
  const email = localStorage.getItem("counsellorEmail");
  const [code, setCode] = useState(""); const [seconds, setSeconds] = useState(60); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  useEffect(() => { const timer = setInterval(() => setSeconds((value) => Math.max(0,value - 1)),1000); return () => clearInterval(timer); }, []);
  const verify = async (event) => {
    event.preventDefault(); if (loading) return;
    if (!email) { setError("Please return to sign in and enter your email again."); return; }
    setLoading(true); setError("");
    try {
      const response = await api.post("/api/counsellor/verify-otp", { email, otp: code });
      if (!response.data.counsellorId || response.data.role !== "counsellor") throw new Error("We couldn't verify your sign in. Please try again.");
      loginCounsellor(response.data.counsellorId); onClose?.(); navigate(response.data.profileCompleted ? "/counsellor-dashboard" : "/counsellor/profile");
    } catch (error) { setError(error.response?.data?.message || error.message || "Please check your code and try again."); }
    finally { setLoading(false); }
  };
  const resend = async () => {
    if (seconds || loading || !email) return; setLoading(true); setError("");
    try { await api.post("/api/counsellor/send-otp", { email }); setSeconds(60); setCode(""); }
    catch (error) { setError(error.response?.data?.message || "We couldn't resend your code. Please try again."); }
    finally { setLoading(false); }
  };
  return <ModalFrame isOpen onClose={onClose} closeDisabled={loading} title="Check your inbox." description={`Enter the six-digit code we sent to ${email || "your email address"}.`}>
    <form className="form-stack" onSubmit={verify}><label><span className="field-label">Verification code</span><input className="field-input !text-center !text-2xl tracking-[.35em]" aria-label="Six-digit verification code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g,""))} placeholder="000000" /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary w-full" disabled={loading || code.length !== 6}>{loading ? "Please wait..." : "Verify & continue"}<ArrowRight size={16} /></button></form><p className="modal-footnote">Didn't receive a code? <button onClick={resend} disabled={seconds > 0 || loading}>{seconds ? `Resend in ${seconds}s` : "Resend code"}</button></p>
  </ModalFrame>;
}
