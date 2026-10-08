import { useState } from "react";
import { API_BASE_URL } from "../api/apiConfig";
import { fetchJson } from "../api/bookingStatus";
import ModalFrame from "./ui/ModalFrame";

export default function AccountRecovery({onClose}) {
  const [email,setEmail]=useState(""); const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const [message,setMessage]=useState("");
  const submit=async event=>{event.preventDefault();setBusy(true);setError("");try{const result=await fetchJson(`${API_BASE_URL}/api/account/forgot-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email.trim().toLowerCase()})});setMessage(result.message);}catch(error){setError(error.message);}finally{setBusy(false);}};
  return <ModalFrame isOpen onClose={onClose} closeDisabled={busy} title="Let's get you back in." description="Request a reset link for your email/password account.">{message ? <><p role="status" className="form-success">{message}</p><button className="button button-primary mt-5" onClick={onClose}>Return to sign in</button></> : <form className="form-stack" onSubmit={submit}><label><span className="field-label">Account email</span><input className="field-input" type="email" autoComplete="email" required value={email} onChange={event=>setEmail(event.target.value)}/></label>{error && <p role="alert" className="form-error">{error} <a href="mailto:themindsoul.in@gmail.com" className="underline">Contact support</a></p>}<button className="button button-primary" disabled={busy}>{busy ? "Requesting..." : "Send reset link"}</button></form>}</ModalFrame>;
}
