import useBookingAccess from "../../hooks/useBookingAccess";
import { API_BASE_URL } from "../../api/apiConfig.js";
import { useEffect, useState } from "react";
import { Receipt } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { fetchJson } from "../../api/bookingStatus";
import StatePanel from "./StatePanel";

const formatDate = (value) => {
  const seconds = value?._seconds ?? value?.seconds;
  const date = new Date(seconds != null ? seconds * 1000 : typeof value === "string" ? value : NaN);
  return Number.isFinite(date.getTime()) ? date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }) : "";
};
export default function PaymentHistory({ counsellor = false }) {
  const access = useBookingAccess();
  const { token } = useAuth(); const [payments, setPayments] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [filter, setFilter] = useState("all"); const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); setLoading(true); setError("");
    fetchJson(`${API_BASE_URL}/api/payment/history/${counsellor ? "counsellor" : "user"}`, { ...(counsellor ? { credentials: "include" } : { headers: { Authorization: `Bearer ${token}` } }), signal: controller.signal }).then((data) => {
      const records = Array.isArray(data) ? data : data.payments || data.data;
      if (!Array.isArray(records)) throw new Error("We couldn't load your transaction history.");
      if (!controller.signal.aborted) setPayments(records);
    }).catch((error) => { if (!controller.signal.aborted) setError(error.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [counsellor,token,attempt]);
  const visible = filter === "all" ? payments : payments.filter((payment) => payment.status === filter);
  return <section><p className="eyebrow">Your payment records</p><h2 className="text-3xl mb-7">Transaction history.</h2><div className="flex gap-2 mb-6">{["all","success","failed"].map((value) => <button className={`button !min-h-9 !py-2 !px-4 !text-xs ${filter === value ? "button-primary" : "button-secondary"}`} aria-pressed={filter === value} key={value} onClick={() => setFilter(value)}>{value === "all" ? "All transactions" : value === "success" ? "Successful" : "Failed"}</button>)}</div>
    {loading ? <StatePanel loading title="Loading your transactions" /> : error ? <StatePanel title="We couldn't load your transactions" description={error} onRetry={() => setAttempt((value) => value + 1)} /> : !visible.length ? <StatePanel title="No transactions here yet." description={access.eligible ? "Your complimentary sessions do not create payment records. Find them in Appointments." : "Your payment records will appear here once a payment has been processed."} /> : <div className="space-y-4">{visible.map((payment) => <article className="surface transaction-record" key={payment.id || payment.paymentId}><div className="flex gap-4 items-start"><span className="session-avatar"><Receipt size={22} /></span><div><h3 className="font-heading text-xl">Counselling session</h3><p className="text-xs text-gray-500 mt-2">{counsellor ? payment.userName || payment.userEmail || "Client" : payment.counsellorName || "Counsellor"}</p><p className="text-xs text-gray-500 mt-2">{payment.appointmentDate} {payment.timeSlot && `· ${payment.timeSlot}`}</p><p className="text-[10px] text-gray-400 mt-2 break-all">Payment ID: {payment.paymentId || payment.id}</p></div></div><div className="transaction-record-amount"><p className="text-xl font-heading">{Number.isFinite(Number(payment.amountRupees)) ? `\u20b9${Number(payment.amountRupees).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "Amount unavailable"}</p><p className="text-xs text-gray-500">{formatDate(payment.createdAt)}</p><span className={`session-status ${payment.status === "success" ? "session-status-active" : ""}`}>{payment.status === "success" ? "Successful" : payment.status || "Processing"}</span></div></article>)}</div>}
  </section>;
}
