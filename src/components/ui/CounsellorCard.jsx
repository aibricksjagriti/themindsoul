import { ArrowUpRight, Languages, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export default function CounsellorCard({ counsellor }) {
  const c = counsellor;
  const name = [c.firstName, c.lastName].filter(Boolean).join(" ") || "Counsellor";
  const expertise = Array.isArray(c.expertise) ? c.expertise : c.expertise ? [c.expertise] : [];
  const languages = Array.isArray(c.languages) ? c.languages : [];
  return <article className="counsellor-card">
    <Link to={`/counsellor/${c.counsellorId || c.id}`} className="counsellor-portrait" aria-label={`View ${name}'s profile`}>
      <img src={c.imageUrl || "/counsellor-placeholder.svg"} alt={name} loading="lazy" onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = "/counsellor-placeholder.svg";
      }} />
      <span className="portrait-badge">Online sessions</span>
    </Link>
    <div className="counsellor-card-body">
      <p className="card-kicker">{expertise[0] || "Emotional wellbeing"}</p>
      <h3><Link to={`/counsellor/${c.counsellorId || c.id}`}>{name}</Link></h3>
      <p className="card-detail"><Languages size={15} />{languages.join(" · ") || "View profile for languages"}</p>
      {c.experience && <p className="card-detail"><Briefcase size={15} />{String(c.experience)}{!/year/i.test(String(c.experience)) ? " years of experience" : ""}</p>}
      <div className="counsellor-card-bottom">
        <p>{Number(c.sessionPrice) > 0 ? <><strong>₹{Number(c.sessionPrice).toLocaleString("en-IN")}</strong><span> / session</span></> : <span>See session details</span>}</p>
        <Link to={`/counsellor/${c.counsellorId || c.id}`} className="icon-link" aria-label={`View ${name}'s profile`}><ArrowUpRight size={20} /></Link>
      </div>
    </div>
  </article>;
}
