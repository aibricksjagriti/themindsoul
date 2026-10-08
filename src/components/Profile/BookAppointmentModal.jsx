import DialogPortal from "../ui/DialogPortal";
import { formatTimeRange } from "../../utils/sessionDisplay";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../api/apiConfig.js";
import React, { useState, useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import AppointmentConfirmationModal from "./AppointmentConfirmationModal";
import { fetchJson, waitForScheduledAppointment } from "../../api/bookingStatus";
import { bookingDays, isPastBookingSlot } from "../../utils/bookingDate";
import BookingCalendar from "./BookingCalendar";
import Wellness3D from "../ui/Wellness3D";
import { complimentaryEligibility, createComplimentaryBooking, complimentaryRequestStatus } from "../../api/complimentaryApi";

const BASE_URL = `${API_BASE_URL}/api`;

export default function BookAppointmentModal({
  isOpen,
  onClose,
  counsellorId,
}) {
  const [counsellor, setCounsellor] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState({
    morning: [],
    afternoon: [],
    evening: [],
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);
  useEffect(() => { setSelectionConfirmed(false); }, [selectedDay?.fullDate, selectedSlot?.startTime, selectedSlot?.endTime]);
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState("");
  const [slotAttempt, setSlotAttempt] = useState(0);
  const [availability, setAvailability] = useState(null);
  const [availabilityError, setAvailabilityError] = useState("");
  const [availabilityAttempt, setAvailabilityAttempt] = useState(0);
  const [accessAttempt, setAccessAttempt] = useState(0);
  const reviewRef = useRef(null);
  useEffect(() => { if (selectionConfirmed) { reviewRef.current?.scrollIntoView({block:"nearest",behavior:"smooth"}); reviewRef.current?.focus({preventScroll:true}); } },[selectionConfirmed]);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showFinalLoader, setShowFinalLoader] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [pendingAppointment, setPendingAppointment] = useState(null);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const processingRef = useRef(false);
  const confirmationRef = useRef(null);
  const freeRequestRef = useRef(null);
  const [freeEligible, setFreeEligible] = useState(false);
  const [accessLoading, setAccessLoading] = useState(true);
  const [freeRecovery, setFreeRecovery] = useState(false);
  const [accessError, setAccessError] = useState("");
  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();
    setAccessLoading(true); setFreeEligible(false); setAccessError(""); setFreeRecovery(false); freeRequestRef.current = null;
    const token = localStorage.getItem("token");
    complimentaryEligibility(token, controller.signal).then((data) => {
      if (!controller.signal.aborted) setFreeEligible(data.eligible === true);
    }).catch(() => {
      if (!controller.signal.aborted) setAccessError("We couldn't verify your booking access. Please retry before proceeding.");
    }).finally(() => { if (!controller.signal.aborted) setAccessLoading(false); });
    return () => controller.abort();
  }, [isOpen, counsellorId, accessAttempt]);
  useEffect(() => {
    if (isOpen) {
      setIsBooked(false); setAppointmentData(null); setPendingAppointment(null);
      setAwaitingConfirmation(false); setBookingError(""); setShowFinalLoader(false);
      setProcessingPayment(false); setSelectedSlot(null); processingRef.current = false;
      setCounsellor(null); setSelectedDay(null); setAvailableDays([]);
    }
    return () => confirmationRef.current?.abort();
  }, [isOpen, counsellorId]);

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  /* -------------------- Generate Next 14 Days -------------------- */
  /* -------------------- Fetch Counsellor -------------------- */
  useEffect(() => {
    if (!isOpen || !counsellorId) return;
    const controller = new AbortController();

    const fetchCounsellor = async () => {
      try {
        setLoading(true);
        const data = await fetchJson(`${BASE_URL}/counsellor/${counsellorId}`, { signal: controller.signal });
        if (controller.signal.aborted) return;

        if (data?.counsellor) {
          setCounsellor(data.counsellor);
          const days = bookingDays(45);
          setAvailableDays(days);

        }
      } catch (err) {
        if (!controller.signal.aborted) setBookingError(err.message || "Could not load counsellor");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchCounsellor();
    return () => controller.abort();
  }, [isOpen, counsellorId]);

  useEffect(() => {
    if (!isOpen || !selectedDay || !counsellorId) { setLoadingSlots(false); return; }
    const controller = new AbortController();
    setLoadingSlots(true); setSelectedSlot(null); setSlotError("");
    setSlots({ morning: [], afternoon: [], evening: [] });
    const load = async () => {
      try {
        const [available, booked] = await Promise.all([
          fetchJson(`${BASE_URL}/timeslots/counsellor/${counsellorId}/slots?date=${selectedDay.fullDate}`, { signal: controller.signal }),
          fetchJson(`${BASE_URL}/timeslots/counsellor/${counsellorId}/booked?date=${selectedDay.fullDate}`, { signal: controller.signal }),
        ]);
        if (controller.signal.aborted) return;
        const grouped = { morning: [], afternoon: [], evening: [] };
        for (const period of Object.keys(grouped)) grouped[period] = (available.slots?.[period] || []).map((slot) => ({ ...slot, isBooked: false }));
        for (const slot of booked.bookedSlots || []) if (grouped[slot.period]) grouped[slot.period].push({ ...slot, isBooked: true });
        for (const group of Object.values(grouped)) group.sort((a, b) => a.startTime.localeCompare(b.startTime));
        setSlots(grouped);
      } catch (error) {
        if (!controller.signal.aborted) setSlotError(error.message || "Could not load available slots");
      } finally {
        if (!controller.signal.aborted) setLoadingSlots(false);
      }
    };
    load();
    return () => controller.abort();
  }, [isOpen, selectedDay, counsellorId, slotAttempt]);

  useEffect(() => {
    if (!isOpen || !counsellorId || !availableDays.length) return;
    const controller = new AbortController(); setAvailability(null); setAvailabilityError("");
    fetchJson(`${BASE_URL}/timeslots/counsellor/${counsellorId}/availability?from=${availableDays[0].fullDate}&days=45`,{signal:controller.signal})
      .then((data) => { if (!Array.isArray(data.dates)) throw new Error("Availability response is invalid"); if (controller.signal.aborted) return; setAvailability(data.dates); setSelectedDay((current) => data.dates.some((item) => item.date === current?.fullDate) ? current : availableDays.find((day) => day.fullDate === data.nextAvailableDate) || null); })
      .catch((error) => { if (!controller.signal.aborted) setAvailabilityError(error.message || "Could not check available dates"); });
    return () => controller.abort();
  },[isOpen,counsellorId,availableDays,availabilityAttempt]);

  /* -------------------- Razorpay Script -------------------- */
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      const timeout = setTimeout(() => {
        script.remove();
        resolve(false);
      }, 15000);
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => { clearTimeout(timeout); resolve(true); };
      script.onerror = () => { clearTimeout(timeout); script.remove(); resolve(false); };
      document.body.appendChild(script);
    });

  const handleComplimentaryBooking = async () => {
    if (processingRef.current || !freeEligible || !selectedDay || !selectedSlot) return;
    processingRef.current = true; setProcessingPayment(true); setBookingError("");
    const token = localStorage.getItem("token");
    const timeSlot = selectedSlot.startTime + "-" + selectedSlot.endTime;
    if (!freeRequestRef.current || (!freeRecovery && (freeRequestRef.current.date !== selectedDay.fullDate || freeRequestRef.current.timeSlot !== timeSlot))) freeRequestRef.current = { requestId: crypto.randomUUID(), counsellorId, date: selectedDay.fullDate, timeSlot };
    try {
      let result;
      if (freeRecovery) {
        result = await complimentaryRequestStatus(freeRequestRef.current.requestId, token);
        if (result.appointment?.status === "booking_failed") { setFreeRecovery(false); const failure = new Error("The session could not be prepared. Try booking again; no payment is required."); failure.status = 400; throw failure; }
        if (result.appointment?.status === "preparing" && Date.now() - result.appointment.reservationStartedAt >= 180000) {
          result = await createComplimentaryBooking(freeRequestRef.current, token);
        }
      } else {
        result = await createComplimentaryBooking(freeRequestRef.current, token);
      }
      if (result.appointment?.status !== "scheduled") { setFreeRecovery(true); throw new Error("Your free booking is still processing. Check its status shortly."); }
      setAppointmentData(result.appointment); setIsBooked(true); setFreeRecovery(false);
    } catch (error) {
      if (error.status === 404) setFreeRecovery(false);
      else if (!error.status || error.status === 409 || error.status >= 500) setFreeRecovery(true);
      setBookingError(error.message || "We couldn't complete the complimentary booking.");
    } finally {
      setProcessingPayment(false); processingRef.current = false;
    }
  };

  const confirmAppointment = async (appointment, token, signal) => {
    const scheduled = await waitForScheduledAppointment({ appointmentId: appointment.appointmentId || appointment.id, token, signal });
    if (signal.aborted) return;
    setAppointmentData({ ...appointment, ...scheduled, zoomLink: scheduled.meetingLink || appointment.zoomLink });
    setIsBooked(true); setAwaitingConfirmation(false);
  };
  const checkBookingStatus = async () => {
    if (!pendingAppointment || processingRef.current) return;
    processingRef.current = true; setBookingError(""); setShowFinalLoader(true);
    const controller = new AbortController(); confirmationRef.current = controller;
    try {
      await confirmAppointment(pendingAppointment, localStorage.getItem("token"), controller.signal);
    } catch (error) {
      if (!controller.signal.aborted) setBookingError(error.message || "Could not check booking status. Do not pay again.");
    } finally {
      if (!controller.signal.aborted) { setShowFinalLoader(false); processingRef.current = false; }
    }
  };
  const handlePaymentAndBooking = async () => {
    if ((!pendingAppointment && (!selectedSlot || !selectedDay)) || processingRef.current || awaitingConfirmation) return;
    processingRef.current = true; setProcessingPayment(true); setBookingError("");
    let checkoutOpened = false;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login again");
      if (!razorpayKey) throw new Error("Checkout is not configured. Please contact support.");
      let appointment = pendingAppointment;
      if (!appointment) {
        const data = await fetchJson(`${BASE_URL}/appointment`, {
          method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ counsellorId, date: selectedDay.fullDate, timeSlot: `${selectedSlot.startTime}-${selectedSlot.endTime}` }),
        });
        appointment = data.appointment; setPendingAppointment(appointment);
      }
      const orderData = await fetchJson(`${BASE_URL}/payment/create-order`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ appointmentId: appointment.appointmentId }),
      });
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Razorpay SDK failed to load");
      const checkout = new window.Razorpay({
        key: razorpayKey, amount: orderData.order.amount, currency: orderData.order.currency || "INR",
        name: "MindSoul Counselling", description: "Counselling Session", order_id: orderData.order.id,
        modal: { ondismiss: () => { processingRef.current = false; setProcessingPayment(false); } },
        handler: async (response) => {
          setAwaitingConfirmation(true); setShowFinalLoader(true);
          const controller = new AbortController(); confirmationRef.current = controller;
          try {
            await fetchJson(`${BASE_URL}/payment/verify-payment`, {
              method: "POST", signal: controller.signal,
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify({ appointmentId: appointment.appointmentId,
                razorpay_payment_id: response.razorpay_payment_id, razorpay_order_id: response.razorpay_order_id, razorpay_signature: response.razorpay_signature }),
            });
            await confirmAppointment(appointment, token, controller.signal);
          } catch (error) {
            if (!controller.signal.aborted) setBookingError(error.message || "Could not confirm your appointment. Check its status before paying again.");
          } finally {
            if (!controller.signal.aborted) { setShowFinalLoader(false); setProcessingPayment(false); processingRef.current = false; }
          }
        }, theme: { color: "#778DA9" },
      });
      checkout.open(); checkoutOpened = true;
    } catch (error) {
      setBookingError(error.message || "Something went wrong");
    } finally {
      if (!checkoutOpened) { setProcessingPayment(false); processingRef.current = false; }
    }
  };

  /* -------------------- Slot Card -------------------- */
  const SlotCard = ({ slot }) => {
    const isSelected =
      selectedSlot?.startTime === slot.startTime &&
      selectedSlot?.endTime === slot.endTime;

    const isPast = selectedDay && isPastBookingSlot(selectedDay.fullDate, slot.startTime);

    return (
      <button
        disabled={slot.isBooked || isPast || loadingSlots || processingPayment || !!pendingAppointment}
        onClick={() => !slot.isBooked && !isPast && setSelectedSlot(slot)}
        className={`border rounded-lg px-4 py-2 text-sm
          ${
            slot.isBooked
              ? "bg-red-100 text-red-500 cursor-not-allowed"
              : isPast
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "hover:border-accent"
          }
          ${isSelected ? "bg-primary text-white" : ""}
          
        `}
      >
        {slot.startTime} - {slot.endTime}
        {slot.isBooked && (
          <span className="ml-2 text-xs text-green-600">(Scheduled)</span>
        )}
      </button>
    );
  };

  if (!isOpen) return null;

  /* -------------------- FINAL LOADER UI -------------------- */
  if (showFinalLoader) {
    return (
      <DialogPortal label="Confirming your appointment" onClose={onClose} locked><div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">
            Confirming Your Appointment
          </h3>
          <p className="text-sm text-gray-600">
            Please do not refresh or close this page.
            <br />
            Your appointment is being confirmed.
          </p>
        </div>
      </div></DialogPortal>
    );
  }

  if (isBooked && appointmentData) {
    return (
      <AppointmentConfirmationModal
        isOpen
        appointment={appointmentData}
        onClose={onClose}
      />
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <DialogPortal label="Book your session" onClose={onClose} locked={processingPayment}><div className="booking-modal fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-6 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative max-h-[90dvh] overflow-y-auto pb-2">
        <button onClick={onClose} disabled={processingPayment} aria-label="Close booking" className="absolute top-4 right-4 text-xl">
          <FiX />
        </button>

        <div className="px-6 pt-6">
          <h2 className="text-2xl font-semibold">Book Appointment</h2>
        </div>

        {/* Counsellor Info */}
        <div className="px-6 mt-4 flex items-center gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : counsellor ? (
            <>
              <img
                src={counsellor.imageUrl}
                className="w-16 h-16 rounded-full object-cover"
                alt=""
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {counsellor.firstName} {counsellor.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {counsellor.experience} Experience
                </p>
              </div>
            </>
          ) : null}
        </div>

        <div className="px-6 mt-6 booking-date-layout">
          <BookingCalendar availableDates={availability?.map((item) => item.date) || []} days={availableDays} selectedDay={selectedDay} onSelect={(day) => { setSelectedSlot(null); setSelectedDay(day); }} disabled={processingPayment || !!pendingAppointment || freeRecovery} />
          <div className="booking-date-summary"><Wellness3D className="booking-wellness-3d" /><p className="eyebrow">A little time for you</p><h3>{selectedDay ? new Date(selectedDay.fullDate + "T00:00:00Z").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }) : "Choose your day"}</h3><p aria-live="polite">{selectedSlot ? formatTimeRange(selectedSlot.startTime + "-" + selectedSlot.endTime) : "Choose an available session time below."}</p></div>
        </div>

        {availabilityError && <p role="alert" className="form-error mx-6 mt-4">{availabilityError} <button className="underline" onClick={() => setAvailabilityAttempt((value) => value + 1)}>Retry availability</button></p>}
        {!availability && !availabilityError && <p role="status" className="px-6 mt-4 text-sm">Checking available dates...</p>}
        {availability?.length === 0 && <div className="surface mx-6 mt-4"><p>No appointments are available in the next 45 days.</p><Link className="text-link mt-3" to="/counsellors" onClick={onClose}>Browse other counsellors</Link></div>}
        {slotError && <p role="alert" className="form-error mx-6 mt-4">{slotError} <button className="underline" onClick={() => setSlotAttempt((value) => value + 1)}>Retry times</button></p>}
        {/* Slots */}
        {loadingSlots && <p role="status" className="px-6 mt-5 text-sm text-gray-500">Finding available times...</p>}
        {!loadingSlots && !slotError && selectedDay && !Object.values(slots).some((group) => group.length) && <div className="surface mx-6 mt-4"><p>This date no longer has available times.</p><button className="text-link mt-3" onClick={() => { const next = availability?.find((item) => item.date > selectedDay.fullDate); if (next) setSelectedDay(availableDays.find((day) => day.fullDate === next.date)); else setAvailabilityAttempt((value) => value + 1); }}>Find next available</button></div>}
        {["morning", "afternoon", "evening"].filter((period) => slots[period].length).map((period) => (
          <div key={period} className="px-6 mt-4">
            <p className="font-medium capitalize">{period} Slots</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2 ">
              {slots[period].map((slot) => (
                <SlotCard key={slot.startTime} slot={slot} />
              ))}
            </div>
          </div>
        ))}

        {/* Book */}
        <div className="booking-sticky-footer px-6 py-4">
          {selectionConfirmed && selectedDay && selectedSlot && <section ref={reviewRef} tabIndex={-1} className="surface mb-4" aria-label="Review date and time" aria-live="polite"><p className="eyebrow">Review your session</p><h3 className="text-lg">Confirm your date &amp; time</h3><p className="mt-3 text-sm">{new Date(selectedDay.fullDate + "T00:00:00Z").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</p><p className="text-sm font-semibold mt-2">{formatTimeRange(selectedSlot.startTime + "-" + selectedSlot.endTime)}</p><p className="text-xs text-gray-500 mt-3">{freeEligible ? "This session is complimentary. No payment is required." : "Your booking will proceed to secure checkout after confirmation."}</p><button className="text-link mt-4" disabled={processingPayment} onClick={() => setSelectionConfirmed(false)}>Change date or time</button></section>}
          {freeEligible && <p className="form-success mb-3">Unlimited complimentary access: this session is free. No payment is required.</p>}
          {accessLoading && <p role="status" className="mb-3 text-xs text-gray-500">Checking your booking access...</p>}
          {accessError && <p role="alert" className="form-error mb-3">{accessError} <button className="underline" onClick={() => setAccessAttempt((value) => value + 1)}>Retry access</button></p>}
          {bookingError && <p role="alert" className="mb-3 text-sm text-red-600">{bookingError}</p>}
          {awaitingConfirmation && <p className="mb-3 text-sm text-gray-600">Your booking is processing. Check its status before paying again.</p>}
          <button
            onClick={() => {
              if (!selectionConfirmed && !freeRecovery && !awaitingConfirmation && !pendingAppointment) { setSelectionConfirmed(true); return; }
              if (freeEligible) handleComplimentaryBooking();
              else if (awaitingConfirmation) checkBookingStatus();
              else handlePaymentAndBooking();
            }}
            disabled={processingPayment || loading || loadingSlots || accessLoading || !!accessError || (!awaitingConfirmation && !pendingAppointment && !selectedSlot)}
            className={`w-full py-3 rounded-lg text-white cursor-pointer ${
              selectedSlot ? "bg-primary" : "bg-gray-300"
            }`}
          >
            {processingPayment ? "Processing..." : freeRecovery ? "Check free booking status" : awaitingConfirmation ? "Check appointment status" : pendingAppointment ? "Resume checkout" : !selectionConfirmed ? "Review date & time" : freeEligible ? "Confirm free booking" : "Confirm & pay"}
          </button>
        </div>
      </div>
    </div></DialogPortal>
  );
}

