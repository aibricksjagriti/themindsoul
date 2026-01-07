// export default function CounsellorAppointmentCard({
//   name,
//   subtitle,
//   date,
//   timeSlot,
//   meetingLink,
//   status,
//   image,
// }) {
//   const fallbackImage =
//     image ||
//     `https://ui-avatars.com/api/?name=${encodeURIComponent(
//       name
//     )}&background=6366f1&color=fff`;

//   // 🔹 CHECK IF APPOINTMENT IS EXPIRED
//   const isAppointmentExpired = () => {
//     if (!date || !timeSlot) return false;

//     const endTime = timeSlot.split("-")[1]; // "15:00"
//     const appointmentEndDateTime = new Date(`${date}T${endTime}`);

//     return new Date() > appointmentEndDateTime;
//   };

//   const isExpired = isAppointmentExpired();

//   return (
//     <div
//       className={`rounded-xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6
//         ${isExpired ? "bg-red-50 border border-red-200" : "bg-white"}
//       `}
//     >
//       {/* LEFT */}
//       <div className="flex items-center gap-4">
//         <img
//           src={fallbackImage}
//           alt={name}
//           className="w-16 h-16 rounded-lg object-cover"
//         />

//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
//           <p className="text-gray-500 text-sm">{subtitle}</p>
//         </div>
//       </div>

//       {/* MIDDLE */}
//       <div className="flex gap-12 text-sm">
//         <div>
//           <p className="text-gray-500">Date</p>
//           <p className="font-medium text-gray-800">{date}</p>
//         </div>

//         <div>
//           <p className="text-gray-500">Time</p>
//           <p className="font-medium text-gray-800">{timeSlot}</p>
//         </div>
//       </div>

//       {/* MEETING LINK */}
//       <div>
//         <p className="text-gray-500">Meet Link</p>

//         {meetingLink && !isExpired ? (
//           <a
//             href={meetingLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="font-medium text-blue-600 underline hover:text-blue-800"
//           >
//             Join Meeting
//           </a>
//         ) : (
//           <span className="font-medium text-gray-400 cursor-not-allowed">
//             {isExpired ? "Expired" : "N/A"}
//           </span>
//         )}
//       </div>

//       {/* STATUS */}
//       <span
//         className={`self-start md:self-center px-4 py-1 rounded-full text-sm font-medium
//           ${
//             isExpired
//               ? "bg-red-100 text-red-600"
//               : status === "scheduled"
//               ? "bg-green-100 text-green-600"
//               : "bg-gray-100 text-gray-600"
//           }
//         `}
//       >
//         {isExpired ? "Expired" : status}
//       </span>
//     </div>
//   );
// }

export default function CounsellorAppointmentCard({
  name,
  subtitle,
  date,
  timeSlot,
  meetingLink,
  status,
  image,
}) {
  const fallbackImage =
    image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "Student"
    )}&background=6366f1&color=fff`;

  // 🔹 Convert date + timeSlot end time safely
  const getAppointmentEndDateTime = () => {
    if (!date || !timeSlot) return null;

    // Example: "3:00 PM - 3:30 PM"
    const endTime = timeSlot.split("-")[1]?.trim();
    if (!endTime) return null;

    return new Date(`${date} ${endTime}`);
  };

  const appointmentEnd = getAppointmentEndDateTime();
  const isExpired = appointmentEnd ? new Date() > appointmentEnd : false;

  return (
    <div
      className={`rounded-xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6
        ${isExpired ? "bg-red-50 border border-red-200" : "bg-white"}
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <img
          src={fallbackImage}
          alt={name}
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* MIDDLE */}
      <div className="flex gap-12 text-sm">
        <div>
          <p className="text-gray-500">Date</p>
          <p className="font-medium text-gray-800">{date}</p>
        </div>

        <div>
          <p className="text-gray-500">Time</p>
          <p className="font-medium text-gray-800">{timeSlot}</p>
        </div>
      </div>

      {/* MEETING LINK */}
      <div>
        <p className="text-gray-500">Meeting</p>

        {meetingLink && !isExpired ? (
          <a
            href={meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 underline hover:text-blue-800"
          >
            Start Meeting
          </a>
        ) : (
          <span className="font-medium text-gray-400 cursor-not-allowed">
            {isExpired ? "Expired" : "Not Available"}
          </span>
        )}
      </div>

      {/* STATUS */}
      <span
        className={`self-start md:self-center px-4 py-1 rounded-full text-sm font-medium
          ${
            isExpired
              ? "bg-red-100 text-red-600"
              : status === "scheduled"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600"
          }
        `}
      >
        {isExpired ? "Expired" : status}
      </span>
    </div>
  );
}
