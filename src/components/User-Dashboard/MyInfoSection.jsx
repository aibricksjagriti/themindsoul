import { API_BASE_URL } from "../../api/apiConfig.js";
import { createElement, useEffect, useState } from "react";
import { Mail, Phone, User, Calendar, HeartPulse } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { fetchJson } from "../../api/bookingStatus";
import StatePanel from "../ui/StatePanel";

const medical = (value) => Array.isArray(value) ? value.filter((item) => typeof item === "string").join(", ") : typeof value === "string" ? value : "";
export default function MyInfoSection() {
  const { token } = useAuth(); const [profile, setProfile] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [attempt, setAttempt] = useState(0);
  useEffect(() => { const update = () => setAttempt((value) => value + 1); window.addEventListener("mindsoul-profile-updated",update); return () => window.removeEventListener("mindsoul-profile-updated",update); }, []);
  useEffect(() => {
    if (!token) return; const controller = new AbortController(); setLoading(true); setError("");
    fetchJson(`${API_BASE_URL}/api/users/user-profile`, { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal }).then(({data}) => { if (!data) throw new Error("We couldn't load your personal details."); if (!controller.signal.aborted) setProfile(data); }).catch((error) => { if (!controller.signal.aborted) setError(error.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [token,attempt]);
  if (loading) return <StatePanel loading title="Loading your details" />;
  if (error) return <StatePanel title="We couldn't load your details" description={error} onRetry={() => setAttempt((value) => value + 1)} />;
  if (!profile) return null;
  return <section><p className="eyebrow">Your personal information</p><h2 className="text-3xl mb-7">A little about you.</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{[[User,"Name",profile.name],[Mail,"Email",profile.email],[Calendar,"Age",profile.age],[User,"Gender",profile.gender],[Phone,"Phone",profile.phone],[HeartPulse,"Medications",medical(profile.medications)],[HeartPulse,"Medical history",medical(profile.medicalHistory)]].map(([icon,label,value]) => <article className="surface" key={label}><p className="flex items-center gap-2 text-xs text-gray-500">{createElement(icon,{size:16})}{label}</p><p className="mt-4 text-sm font-semibold break-words">{value || "Not provided"}</p></article>)}</div></section>;
}
