import { API_BASE_URL } from "../../api/apiConfig.js";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { fetchJson } from "../../api/bookingStatus";
import ModalFrame from "../ui/ModalFrame";

const BASE = `${API_BASE_URL}/api/users`;
const empty = { age: "", gender: "", phone: "", medications: "", medicalHistory: "" };
const text = (value) => Array.isArray(value) ? value.filter((item) => typeof item === "string").join(", ") : typeof value === "string" ? value : "";
export default function UserProfileUpdateModal({ isOpen, onClose }) {
  const [form, setForm] = useState(empty); const [loading, setLoading] = useState(false); const [fetching, setFetching] = useState(false); const [error, setError] = useState(""); const [saved, setSaved] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController(); setFetching(true); setError(""); setSaved(false);
    fetchJson(`${BASE}/user-profile`, { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal }).then(({data}) => { if (!controller.signal.aborted) setForm({ age: data?.age || "", gender: data?.gender || "", phone: data?.phone || "", medications: text(data?.medications), medicalHistory: text(data?.medicalHistory) }); }).catch((error) => { if (!controller.signal.aborted) setError(error.message || "Could not load your details"); }).finally(() => { if (!controller.signal.aborted) setFetching(false); });
    return () => controller.abort();
  }, [isOpen,token]);
  const change = (event) => setForm((old) => ({ ...old, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault(); if (loading) return; setLoading(true); setError("");
    try { await fetchJson(`${BASE}/update-profile`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ ...form, medications: form.medications.split(",").map((value) => value.trim()).filter(Boolean), medicalHistory: form.medicalHistory.split(",").map((value) => value.trim()).filter(Boolean) }) }); setSaved(true); window.dispatchEvent(new Event("mindsoul-profile-updated")); }
    catch (error) { setError(error.message || "We couldn't save your details"); }
    finally { setLoading(false); }
  };
  return <ModalFrame isOpen={isOpen} onClose={onClose} closeDisabled={loading} title={saved ? "Your details are updated." : "A little about you."} description="Share the details that help us support you. Medical information is optional.">
    {saved ? <div className="text-center"><CheckCircle2 className="text-primary mx-auto mb-5" size={34} /><button className="button button-primary w-full" onClick={onClose}>Done</button></div> : fetching ? <p role="status" className="text-sm text-gray-500">Loading your details...</p> : <form className="form-stack" onSubmit={submit}>
      {error && <p className="form-error" role="alert">{error}</p>}<div className="grid grid-cols-2 gap-4"><label><span className="field-label">Age *</span><input type="number" name="age" min={1} max={120} required className="field-input" value={form.age} onChange={change} /></label><label><span className="field-label">Gender *</span><select name="gender" required className="field-input" value={form.gender} onChange={change}><option value="">Select</option><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option></select></label></div>
      <label><span className="field-label">Phone number *</span><input type="tel" name="phone" autoComplete="tel-national" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} required className="field-input" value={form.phone} onChange={change} placeholder="10-digit phone number" /></label>
      <label><span className="field-label">Medications <span className="text-gray-400 font-normal">(optional)</span></span><textarea name="medications" rows={2} className="field-input" value={form.medications} onChange={change} placeholder="Separate medications with a comma" /></label>
      <label><span className="field-label">Medical history <span className="text-gray-400 font-normal">(optional)</span></span><textarea name="medicalHistory" rows={2} className="field-input" value={form.medicalHistory} onChange={change} placeholder="Anything you'd like your care team to know" /></label><button className="button button-primary w-full" disabled={loading}>{loading ? "Saving..." : "Save my details"}</button>
    </form>}
  </ModalFrame>;
}
