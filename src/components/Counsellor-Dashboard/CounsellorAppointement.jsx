import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import CounsellorAppointmentCard from "./CounsellorAppointmentCard";

export default function CounsellorAppointments() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "https://mindsoul-backend-772700176760.asia-south1.run.app/api/counsellor/counsellor-appointments",
          {
            withCredentials: true, // ✅ REQUIRED
          }
        );

        setAppointments(res.data?.data || []);
      } catch (error) {
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
    return <p className="text-center text-gray-500">Loading appointments...</p>;
  }

  if (!appointments.length) {
    return <p className="text-center text-gray-500">No appointments found</p>;
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
          studentEmail={item.studentEmail}
        />
      ))}
    </div>
  );
}
