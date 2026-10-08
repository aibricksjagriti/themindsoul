import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../api/apiConfig";
import { fetchJson } from "../api/bookingStatus";
import PageHeading from "../components/ui/PageHeading";

export default function ResetPassword() {
  const [token]=useState(()=>new URLSearchParams(window.location.search).get("token") || "");
  const [password,setPassword]=useState(""); const [confirm,setConfirm]=useState(""); const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const [done,setDone]=useState(false);
  useEffect(()=>{window.history.replaceState(null,"",window.location.pathname);},[]);
  const submit=async event=>{event.preventDefault();if(password!==confirm){setError("Passwords must match");return;}setBusy(true);setError("");try{await fetchJson(`${API_BASE_URL}/api/account/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token,password})});setDone(true);setPassword("");setConfirm("");}catch(error){setError(error.message);}finally{setBusy(false);}};
  return <div><PageHeading eyebrow="Account recovery" title="A fresh start for your account." description="Reset links expire after 15 minutes and can only be used once."/><div className="container pb-20"><div className="surface max-w-lg mx-auto">{done ? <><p className="form-success" role="status">Password updated. Sign in with your new password.</p><Link to="/" className="button button-primary mt-5">Go to sign in</Link></> : !/^[a-f0-9]{64}$/.test(token) ? <p className="form-error">This link is invalid. Return to sign in and request a new link.</p> : <form className="form-stack" onSubmit={submit}><label><span className="field-label">New password</span><input className="field-input" type="password" autoComplete="new-password" minLength={12} maxLength={128} required value={password} onChange={event=>setPassword(event.target.value)}/></label><label><span className="field-label">Confirm password</span><input className="field-input" type="password" autoComplete="new-password" required value={confirm} onChange={event=>setConfirm(event.target.value)}/></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary" disabled={busy}>{busy ? "Updating..." : "Update password"}</button></form>}</div></div></div>;
}
