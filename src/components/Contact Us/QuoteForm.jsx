import { API_BASE_URL } from "../../api/apiConfig.js";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchJson } from "../../api/bookingStatus";

const initial = { firstName: "", lastName: "", email: "", phone: "", company: "", jobTitle: "", country: "India", employees: "", allowCommunication: false };
export default function QuoteForm() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const change = (event) => { const {name,value,type,checked} = event.target; setForm((old) => ({ ...old, [name]: type === "checkbox" ? checked : value })); };
  const submit = async (event) => {
    event.preventDefault(); if (loading) return;
    setLoading(true); setError("");
    try { await fetchJson(`${API_BASE_URL}/api/quote`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); setSuccess(true); setForm(initial); }
    catch (error) { setError(error.message || "We couldn't submit your enquiry. Please try again."); }
    finally { setLoading(false); }
  };
  if (success) return <div className="text-center py-10" role="status"><CheckCircle2 size={42} className="mx-auto text-primary mb-5" /><h3 className="text-2xl font-heading">Thank you for reaching out.</h3><p className="text-sm text-gray-500 mt-4">We've received your enquiry. Our team will follow up with you.</p><button onClick={() => setSuccess(false)} className="button button-secondary mt-6">Send another enquiry</button></div>;
  return <form onSubmit={submit} className="form-stack">
    <div className="grid sm:grid-cols-2 gap-4">{[["firstName","First name","text","given-name"],["lastName","Last name","text","family-name"],["email","Work email","email","email"],["phone","Phone number","tel","tel"],["company","School / organisation","text","organization"],["jobTitle","Your role","text","organization-title"]].map(([name,label,type,autoComplete]) => <label key={name}><span className="field-label">{label} <span aria-hidden="true">*</span></span><input className="field-input" name={name} type={type} autoComplete={autoComplete} required value={form[name]} onChange={change} maxLength={300} /></label>)}</div>
    <div className="grid sm:grid-cols-2 gap-4"><label><span className="field-label">Country *</span><select className="field-input" name="country" required value={form.country} onChange={change}>{["India","United States","United Kingdom","Canada","Australia","Other"].map((country) => <option key={country}>{country}</option>)}</select></label><label><span className="field-label">Community size *</span><select className="field-input" name="employees" required value={form.employees} onChange={change}><option value="">Select a range</option>{["1-50","51-200","201-1,000","1,000+"].map((size) => <option key={size}>{size}</option>)}</select></label></div>
    <label className="flex gap-3 text-xs text-gray-500 items-start"><input type="checkbox" name="allowCommunication" checked={form.allowCommunication} onChange={change} className="mt-0.5 shrink-0" />I'd like to receive updates about MindSoul's programs and services.</label>
    {error && <p role="alert" className="form-error">{error}</p>}
    <button className="button button-primary w-full" type="submit" disabled={loading}>{loading ? "Sending your enquiry..." : "Send enquiry"}<ArrowUpRight size={17} /></button><p className="text-xs text-gray-500">We'll use your details to respond to your enquiry. Read our <Link to="/privacy-policy" className="underline underline-offset-2">privacy policy</Link>.</p>
  </form>;
}
