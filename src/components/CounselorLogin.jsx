import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import api from "../api/axios";
import ModalFrame from "./ui/ModalFrame";

export default function CounselorLogin({ isOpen, onClose, onOtpOpen }) {
  const [email, setEmail] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); if (loading) return; setError(""); setLoading(true);
    try {
      const normalized = email.trim().toLowerCase();
      const response = await api.post("/api/counsellor/send-otp", { email: normalized });
      if (response.data.success === false) throw new Error(response.data.message || "Could not send your code");
      localStorage.setItem("counsellorEmail", normalized); onClose?.(); onOtpOpen?.();
    } catch (error) { setError(error.response?.data?.message || error.message || "We couldn't send your code. Please try again."); }
    finally { setLoading(false); }
  };
  return <ModalFrame isOpen={isOpen} onClose={onClose} closeDisabled={loading} title="Your care starts here." description="Sign in to your counsellor space. We'll send a verification code to your email.">
    <form className="form-stack" onSubmit={submit}><label><span className="field-label">Counsellor email address</span><input className="field-input" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary w-full" disabled={loading}>{loading ? "Sending your code..." : "Send verification code"}<ArrowRight size={16} /></button></form><p className="modal-footnote flex items-center justify-center gap-2"><Mail size={14} /> Check your inbox and spam folder.</p>
  </ModalFrame>;
}
