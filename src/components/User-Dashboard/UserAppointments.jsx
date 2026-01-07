import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import { useAuth } from "../../context/AuthContext";

export default function UserAppointments() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "https://mindsoul-backend-772700176760.asia-south1.run.app/api/users/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  // 🔹 Helper: get appointment start datetime
  const getAppointmentDateTime = (appointment) => {
    if (!appointment.date || !appointment.timeSlot) return new Date(0);

    const startTime = appointment.timeSlot.split("-")[0]; // "14:00"
    return new Date(`${appointment.date}T${startTime}`);
  };

  // 🔹 Sort appointments (upcoming first, expired last)
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
        <AppointmentCard
          key={item.id}
          name={item.counsellorName}
          subtitle="Counselling Session"
          date={item.date}
          timeSlot={item.timeSlot}
          meetingLink={item.meetingLink}
          status={item.status}
        />
      ))}
    </div>
  );
}
