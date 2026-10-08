import { API_BASE_URL } from "../../api/apiConfig.js";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchJson } from "../../api/bookingStatus";
import StatePanel from "../ui/StatePanel";
import AppointmentCard from "./AppointmentCard";

export default function UserAppointments() {
  const { token } = useAuth(); const [appointments, setAppointments] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!token) return; const controller = new AbortController(); setLoading(true); setError("");
    fetchJson(`${API_BASE_URL}/api/users/appointments`, { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal }).then(({data}) => { if (!Array.isArray(data)) throw new Error("We couldn't load your appointments."); if (!controller.signal.aborted) setAppointments(data); }).catch((error) => { if (!controller.signal.aborted) setError(error.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [token,attempt]);
  const sorted = useMemo(() => appointments.filter((item) => !["pending_payment", "preparing"].includes(item.status)).sort((a,b) => {
    const time = (item) => Date.parse(`${item.date}T${item.timeSlot?.split("-")[0]}:00+05:30`) || 0;
    const now = Date.now(); return Number(time(a) < now) - Number(time(b) < now) || time(a) - time(b);
  }), [appointments]);
  if (loading) return <StatePanel loading title="Loading your sessions" />;
  if (error) return <StatePanel title="We couldn't load your sessions" description={error} onRetry={() => setAttempt((value) => value + 1)} />;
  if (!sorted.length) return <div><StatePanel title={appointments.length ? "Your booking is being processed" : "Your next conversation starts here."} description={appointments.length ? "Your appointment will appear here once it has been scheduled." : "Find a counsellor and make a little time for yourself."} /><div className="text-center mt-6"><Link className="button button-primary" to="/counsellors">Explore counsellors</Link></div></div>;
  return <section><p className="eyebrow">Your care, at a glance</p><h2 className="text-3xl mb-7">Your sessions.</h2><div className="space-y-5">{sorted.map((item) => <AppointmentCard key={item.id} name={item.counsellorName} subtitle="Counselling session" date={item.date} timeSlot={item.timeSlot} meetingLink={item.meetingLink} status={item.status} bookingType={item.bookingType} appointmentId={item.id} />)}</div></section>;
}
