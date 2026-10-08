import SessionChangeRequest from "./SessionChangeRequest";
import { downloadSessionCalendar, formatTimeRange } from "../../utils/sessionDisplay";
import { CalendarDays, Clock, Video } from "lucide-react";
import { useState } from "react";
import { complimentaryHostLink } from "../../api/complimentaryApi";

export default function SessionCard({ name, subtitle, date, timeSlot, meetingLink, status, counsellor = false, bookingType, appointmentId }) {
  const [hostError, setHostError] = useState("");
  const [changeOpen, setChangeOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const openHost = async () => {
    const popup = window.open("about:blank", "_blank");
    if (popup) popup.opener = null;
    setOpening(true); setHostError("");
    try {
      const result = await complimentaryHostLink(appointmentId);
      const url = new URL(result.startUrl);
      if (url.protocol !== "https:" || !(url.hostname === "zoom.us" || url.hostname.endsWith(".zoom.us"))) throw new Error("Invalid session link");
      if (!popup) throw new Error("Please allow pop-ups and try again");
      popup.location.href = url.href;
    } catch (error) { popup?.close(); setHostError(error.message || "Could not open the session"); }
    finally { setOpening(false); }
  };
  const end = timeSlot?.split("-")[1]?.trim(); const instant = Date.parse(`${date}T${end}:00+05:30`);
  const past = Number.isFinite(instant) && instant < Date.now();
  const label = status === "scheduled" ? past ? "Past session" : "Scheduled" : String(status || "Awaiting confirmation").replaceAll("_", " ");
  const dateObject = new Date(`${date}T00:00:00+05:30`);
  const formatted = Number.isFinite(dateObject.getTime()) ? dateObject.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }) : "Date pending";
  return <article className="surface session-card"><div className="session-card-person"><span className="session-avatar">{String(name || "MS").split(" ").filter(Boolean).slice(0,2).map((word) => word[0]).join("")}</span><div><h3>{name || "Counselling session"}</h3><p>{subtitle}</p></div></div><div className="session-card-detail"><p><CalendarDays size={15} /> {formatted}</p><p><Clock size={15} /> {formatTimeRange(timeSlot)}</p></div><div className="session-card-action">{bookingType === "complimentary" && <span className="session-status session-status-active">Complimentary</span>}<span className={`session-status ${status === "scheduled" && !past ? "session-status-active" : ""}`}>{label}</span>{counsellor && bookingType === "complimentary" && status === "scheduled" && !past ? <button className="button button-secondary" disabled={opening} onClick={openHost}><Video size={15} />{opening ? "Opening..." : "Open session"}</button> : meetingLink && status === "scheduled" && !past ? <a className="button button-secondary" href={meetingLink} target="_blank" rel="noopener noreferrer"><Video size={15} />{counsellor ? "Open session" : "Join session"}</a> : <p className="text-xs text-gray-500">{past ? "This session has ended." : "Your meeting link will appear here."}</p>}{status === "scheduled" && !past && appointmentId && <div className="flex flex-wrap gap-2"><button className="text-link" onClick={() => downloadSessionCalendar({id:appointmentId,date,timeSlot,meetingLink})}>Add to calendar</button><button className="text-link" onClick={() => setChangeOpen(true)}>Request a change</button></div>}{hostError && <p role="alert" className="text-xs text-red-600">{hostError}</p>}</div>{changeOpen && <SessionChangeRequest appointmentId={appointmentId} counsellor={counsellor} onClose={() => setChangeOpen(false)} />}</article>;
}
