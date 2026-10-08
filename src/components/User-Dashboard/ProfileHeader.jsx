import { useState } from "react";
import { Pencil } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import UserProfileUpdateModal from "./UserProfileUpdateModal";

export default function ProfileHeader() {
  const { user } = useAuth(); const [open, setOpen] = useState(false);
  if (!user) return null;
  const initials = String(user.name || "You").split(" ").filter(Boolean).slice(0,2).map((word) => word[0]).join("").toUpperCase();
  return <><header className="dashboard-hero"><div className="container"><div className="dashboard-person"><span className="dashboard-avatar">{initials}</span><div><p className="eyebrow">Your wellbeing space</p><h1>Welcome, {String(user.name || "friend").split(" ")[0]}.</h1><p>Your sessions, personal details, and next steps, together in one place.</p></div></div><button className="button button-secondary" onClick={() => setOpen(true)}><Pencil size={15} /> Edit my details</button></div></header><UserProfileUpdateModal isOpen={open} onClose={() => setOpen(false)} /></>;
}
