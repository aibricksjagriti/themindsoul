import { API_BASE_URL } from "../api/apiConfig.js";
import { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchJson } from "../api/bookingStatus";
import ModalFrame from "./ui/ModalFrame";
import Registration from "./Registration";
import AccountRecovery from "./AccountRecovery";

export default function LoginPage({ isOpen, onClose, onUserLoginSuccess, defaultEmail }) {
  const { login } = useAuth();
  const [email, setEmail] = useState(defaultEmail || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [recover, setRecover] = useState(false);
  useEffect(() => { if (defaultEmail) setEmail(defaultEmail); }, [defaultEmail]);
  useEffect(() => { if (!isOpen) { setRegister(false); setRecover(false); setError(""); setPassword(""); } }, [isOpen]);
  const submit = async (event) => {
    event.preventDefault(); if (loading) return;
    setError(""); setLoading(true);
    try {
      const response = await fetchJson(`${API_BASE_URL}/api/auth/login`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), password }) });
      if (!response.data?.user || !response.data?.token) throw new Error("We couldn't complete your sign in. Please try again.");
      login(response.data.user, response.data.token);
      localStorage.setItem("isUserLoggedIn", "true");
      setPassword(""); onUserLoginSuccess?.(); onClose?.();
    } catch (error) { setError(error.message || "We couldn't sign you in. Please check your details."); }
    finally { setLoading(false); }
  };
  if (recover && isOpen) return <AccountRecovery onClose={() => setRecover(false)} />;
  if (register && isOpen) return <Registration isOpen onClose={() => setRegister(false)} onSwitchToLogin={(value) => { if (value) setEmail(value); setRegister(false); }} />;
  return <ModalFrame isOpen={isOpen} onClose={onClose} closeDisabled={loading} title="Welcome back." description="Your space for support, sessions, and a little more peace of mind.">
    <form className="form-stack" onSubmit={submit}>
      <label><span className="field-label">Email address</span><input className="field-input" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
      <label><span className="field-label">Password</span><div className="relative"><input className="field-input !pr-12" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" /><button type="button" className="absolute right-3 top-3.5" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-primary w-full" type="submit" disabled={loading}>{loading ? "Signing you in..." : "Sign in"}<ArrowRight size={16} /></button>
    </form><p className="modal-footnote"><button onClick={() => setRecover(true)}>Forgot your password?</button></p><p className="modal-footnote">New here? <button onClick={() => { setError(""); setRegister(true); }}>Create an account</button></p><p className="modal-footnote">Are you a counsellor? <a className="text-primary underline" href="/counsellor-login">Sign in here</a>.</p>
  </ModalFrame>;
}
