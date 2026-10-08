import { API_BASE_URL } from "../api/apiConfig.js";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { fetchJson } from "../api/bookingStatus";
import ModalFrame from "./ui/ModalFrame";

export default function Registration({ isOpen, onClose, onSignupSuccess, onSwitchToLogin }) {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [success, setSuccess] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); if (loading) return;
    setLoading(true); setError("");
    try {
      const response = await fetchJson(`${API_BASE_URL}/api/auth/signup`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), email: email.trim(), password }) });
      onSignupSuccess?.(response); setPassword(""); setSuccess(true);
    } catch (error) { setError(error.message || "We couldn't create your account. Please try again."); }
    finally { setLoading(false); }
  };
  return <ModalFrame isOpen={isOpen} onClose={onClose} closeDisabled={loading} title={success ? "You're ready to begin." : "Make room for yourself."} description={success ? "Your account is created. Sign in to explore counsellors and book your first session." : "Create your account and take the first step towards finding support."}>
    {success ? <button className="button button-primary w-full" onClick={() => onSwitchToLogin ? onSwitchToLogin(email) : onClose?.()}>Continue to sign in <ArrowRight size={16} /></button> : <><form className="form-stack" onSubmit={submit}>
      <label><span className="field-label">Your name</span><input className="field-input" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" maxLength={120} /></label>
      <label><span className="field-label">Email address</span><input className="field-input" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
      <label><span className="field-label">Create a password</span><input className="field-input" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /></label>
      {error && <p className="form-error" role="alert">{error}</p>}<p className="text-xs text-gray-500">By creating an account, you agree to our <a className="underline" href="/privacy-policy">policies and privacy notice</a>. We use your details to manage your account and sessions.</p><button className="button button-primary w-full" disabled={loading}>{loading ? "Creating your account..." : "Create account"}<ArrowRight size={16} /></button>
    </form><p className="modal-footnote">Already have an account? <button onClick={() => onSwitchToLogin ? onSwitchToLogin(email) : onClose?.()}>Sign in</button></p></>}
  </ModalFrame>;
}
