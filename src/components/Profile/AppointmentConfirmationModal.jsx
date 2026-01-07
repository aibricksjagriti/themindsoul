import React from "react";
import { FiX, FiCalendar, FiClock, FiMapPin, FiVideo } from "react-icons/fi";

export default function AppointmentConfirmationModal({
  isOpen,
  onClose,
  appointment,
}) {
  if (!isOpen || !appointment) return null;

  const { counsellorProfileSnapshot, date, timeSlot, zoomLink } = appointment;

  /* ---- Helpers ---- */
  const getInitials = (firstName = "", lastName = "") =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getDurationFromSlot = (slot) => {
    if (!slot) return "";
    const [start, end] = slot.split("-");
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const diff = (endTime - startTime) / (1000 * 60);
    return `${diff} Minutes`;
  };

  const counselorName = `${counsellorProfileSnapshot?.firstName || ""} ${
    counsellorProfileSnapshot?.lastName || ""
  }`;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          <FiX />
        </button>

        {/* Header */}
        <div className="text-center mt-2">
          <h2 className="text-3xl font-semibold text-gray-800">
            Appointment Confirmation
          </h2>

          <div className="flex justify-center mt-4">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-indigo-700 mt-4">
            Appointment Confirmed
          </h3>

          <p className="text-gray-500 mt-1 text-lg">
            Your counselling session has been scheduled successfully.
          </p>
        </div>

        {/* Session Card */}
        <div className="bg-gray-50 mt-8 rounded-xl p-5 shadow-sm">
          {/* Counselor */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-semibold text-indigo-700">
              {getInitials(
                counsellorProfileSnapshot?.firstName,
                counsellorProfileSnapshot?.lastName
              )}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Counselling Session
              </h4>
              <p className="text-gray-600 text-md">with {counselorName}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
              <FiCalendar className="text-indigo-600 text-xl" />
              <div>
                <p className="text-lg text-gray-500">Date</p>
                <p className="font-medium text-md text-gray-800">
                  {formatDate(date)}
                </p>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
              <FiClock className="text-indigo-600 text-xl" />
              <div>
                <p className="text-lg text-gray-500">Timing</p>
                <p className="font-medium text-md text-gray-800">{timeSlot}</p>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="mt-6">
            <h5 className="text-gray-700 text-lg font-semibold mb-2">
              Session Details
            </h5>

            <div className="flex flex-col gap-2 text-gray-600">
              <div className="flex items-center gap-2">
                <FiClock className="text-indigo-600" />
                <span>Duration: {getDurationFromSlot(timeSlot)}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiMapPin className="text-indigo-600" />
                <span>Format: Online</span>
              </div>

              {zoomLink && (
                <div className="flex items-center gap-2">
                  <FiVideo className="text-indigo-600" />
                  <a
                    href={zoomLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 underline"
                  >
                    Join Zoom Meeting
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
