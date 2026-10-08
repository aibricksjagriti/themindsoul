import { API_BASE_URL } from "../../api/apiConfig.js";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import StatePanel from "../ui/StatePanel";
import CounsellorAppointmentCard from "./CounsellorAppointmentCard";

export default function CounsellorAppointments() {
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/counsellor/counsellor-appointments`,
          {
            withCredentials: true, // ✅ REQUIRED
          }
        );

        setAppointments(res.data?.data || []);
      } catch (error) {
        setError("We couldn't load your appointments. Please try again later.");
        console.error(
          "Failed to fetch appointments",
          error.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // 🔹 Convert date + timeSlot to Date object safely
  const getAppointmentDateTime = (appointment) => {
    if (!appointment.date || !appointment.timeSlot) return new Date(0);

    const startTime = appointment.timeSlot.split("-")[0].trim();
    return new Date(`${appointment.date} ${startTime}`);
  };

  // 🔹 Sort: upcoming first, past last
  const sortedAppointments = useMemo(() => {
    const now = new Date();

    return [...appointments].sort((a, b) => {
      const dateA = getAppointmentDateTime(a);
      const dateB = getAppointmentDateTime(b);

      const isExpiredA = dateA < now;
      const isExpiredB = dateB < now;

      if (isExpiredA && !isExpiredB) return 1;
      if (!isExpiredA && isExpiredB) return -1;

      return dateA - dateB;
    });
  }, [appointments]);

  if (loading) {
    return <StatePanel loading title="Loading your care schedule" />;
  }

  if (error) return <StatePanel title="Your sessions are temporarily unavailable" description={error} />;

  if (!appointments.length) {
    return <StatePanel title="A little space in your schedule." description="Your client appointments will appear here as they are booked." />;
  }

  return (
    <div className="space-y-6 mt-8">
      {sortedAppointments.map((item) => (
        <CounsellorAppointmentCard
          key={item.id}
          name={item.studentName}
          subtitle="Counselling Session"
          date={item.date}
          timeSlot={item.timeSlot}
          meetingLink={item.startUrl}
          status={item.status}
          bookingType={item.bookingType}
          appointmentId={item.id}
          studentEmail={item.studentEmail}
        />
      ))}
    </div>
  );
}
