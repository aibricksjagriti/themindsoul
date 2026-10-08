import { API_BASE_URL } from "../../api/apiConfig.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { fetchJson } from "../../api/bookingStatus";

export default function CounsellorProfileHeader() {
  const id = localStorage.getItem("counsellorId"); const [profile, setProfile] = useState(null);
  useEffect(() => { if (!id) return; const controller = new AbortController(); fetchJson(`${API_BASE_URL}/api/counsellor/${id}`, { credentials: "include", signal: controller.signal }).then((data) => { if (!controller.signal.aborted) setProfile(data.counsellor); }).catch(() => {}); return () => controller.abort(); }, [id]);
  const name = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");
  return <header className="dashboard-hero"><div className="container"><div className="dashboard-person"><span className="dashboard-avatar">{name ? name.split(" ").slice(0,2).map((word) => word[0]).join("") : "MS"}</span><div><p className="eyebrow">Your counsellor space</p><h1>{name ? `Welcome, ${profile.firstName}.` : "Your care, thoughtfully organised."}</h1><p>Make space for your sessions, availability, and professional profile.</p></div></div><Link className="button button-secondary" to="/counsellor/profile"><Pencil size={15} /> Edit my profile</Link></div></header>;
}
