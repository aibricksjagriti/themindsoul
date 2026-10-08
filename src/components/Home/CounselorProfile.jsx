import useBookingAccess from "../../hooks/useBookingAccess";
import { formatMoney } from "../../utils/sessionDisplay";
import { API_BASE_URL } from "../../api/apiConfig.js";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CalendarDays, Languages, Video, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { fetchJson } from "../../api/bookingStatus";
import StatePanel from "../ui/StatePanel";
import LoginPage from "../LoginPage";
import BookAppointmentModal from "../Profile/BookAppointmentModal";

const array = (value) => Array.isArray(value) ? value.filter((item) => typeof item === "string") : typeof value === "string" ? [value] : [];
export default function CounselorProfile() {
  const access = useBookingAccess();
  const { counsellorId } = useParams(); const { user, token } = useAuth();
  const [counsellor, setCounsellor] = useState(null); const [error, setError] = useState(""); const [attempt, setAttempt] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false); const [bookingOpen, setBookingOpen] = useState(false);
  useEffect(() => {
    const controller = new AbortController(); setCounsellor(null); setError("");
    fetchJson(`${API_BASE_URL}/api/counsellor/${counsellorId}`, { signal: controller.signal }).then((data) => { if (!data.counsellor) throw new Error("We couldn't find this counsellor."); if (!controller.signal.aborted) setCounsellor(data.counsellor); }).catch((error) => { if (!controller.signal.aborted) setError(error.message); });
    return () => controller.abort();
  }, [counsellorId,attempt]);
  if (!counsellor) return <div className="container section-space"><StatePanel loading={!error} title={error ? "We couldn't load this profile" : "Getting to know your counsellor"} description={error} onRetry={error ? () => setAttempt((value) => value + 1) : undefined} /></div>;
  const c = counsellor; const name = [c.firstName,c.lastName].filter(Boolean).join(" ");
  const book = () => { if (user?.role === "user" && token) setBookingOpen(true); else setLoginOpen(true); };
  return <div className="container counsellor-profile-page">
    <Link to="/counsellors" className="text-link mb-8"><ArrowLeft size={15} /> Back to counsellors</Link>
    <div className="profile-grid"><div>
      <section className="surface profile-overview"><img src={c.imageUrl || "/counsellor-placeholder.svg"} alt={name || "Counsellor"} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/counsellor-placeholder.svg"; }} /><div><p className="eyebrow">A space for your wellbeing</p><h1>{name || "Your counsellor"}</h1><p className="text-gray-500 text-sm mt-3">{array(c.expertise).join(" · ") || "Emotional wellbeing support"}</p><div className="profile-facts">{c.experience && <p><CalendarDays size={16} />{String(c.experience)}{!/year/i.test(String(c.experience)) ? " years of experience" : ""}</p>}<p><Languages size={16} />{array(c.languages).join(" · ") || "See profile for session languages"}</p><p><Video size={16} /> Online sessions</p></div></div></section>
      <section className="surface mt-6"><p className="eyebrow">Get to know your counsellor</p><h2>About {c.firstName || "your counsellor"}</h2><p className="profile-description">{c.description || "Explore this counsellor's areas of focus and availability, or contact our team to learn more about their approach."}</p>{array(c.focusAreas).length > 0 && <><h3 className="text-sm font-semibold mt-7 mb-3">Areas of focus</h3><div className="flex flex-wrap gap-2">{array(c.focusAreas).map((value) => <span className="profile-tag" key={value}>{value}</span>)}</div></>}
        {array(c.workingDays).length > 0 && <><h3 className="text-sm font-semibold mt-7 mb-3">Usual working days</h3><p className="text-sm text-gray-500">{array(c.workingDays).join(" · ")}</p><p className="text-xs text-gray-500 mt-2">Choose a date when booking to see current availability.</p></>}
      </section>
    </div><aside className="surface session-panel"><p className="eyebrow">Make time for yourself</p><h2>Your next conversation.</h2><p className="session-price">{Number(c.sessionPrice) > 0 ? <><strong>{formatMoney(c.sessionPrice)}</strong><span> / session</span></> : "Contact us for session details"}</p>{user?.role === "user" && <div className="mt-3">{access.loading ? <p className="text-xs text-gray-500">Checking your price...</p> : access.error ? <p role="alert" className="text-xs text-red-600">{access.error} <button className="underline" onClick={access.retry}>Retry</button></p> : access.eligible ? <p className="form-success">Your price: Free ? unlimited complimentary access</p> : <p className="text-xs text-gray-500">Your session total: {formatMoney(c.sessionPrice)}</p>}</div>}<div className="profile-facts"><p><Video size={16} /> Join your session online</p>{Number(c.slotDuration) > 0 && <p><Clock size={16} />{c.slotDuration}-minute session</p>}<p><CalendarDays size={16} /> Choose a time that suits you</p></div><button className="button button-primary w-full mt-7" onClick={book} disabled={access.loading || !!access.error || (!access.eligible && !Number(c.sessionPrice))}>Choose a date & time <ArrowUpRight size={16} /></button><p className="text-xs text-gray-500 text-center mt-4">{user?.role === "user" ? "Choose an available date and time to review your session." : "Sign in to complete your booking."}</p><div className="border-t mt-6 pt-5 text-xs text-gray-500">Need a little guidance? <Link className="text-primary underline" to="/contacts">Talk to our team.</Link></div></aside></div>
    <LoginPage isOpen={loginOpen} onClose={() => setLoginOpen(false)} onUserLoginSuccess={() => { setLoginOpen(false); setBookingOpen(true); }} />
    <BookAppointmentModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} counsellorId={c.counsellorId || counsellorId} />
  </div>;
}
