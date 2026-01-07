// import React, { useState } from "react";
// import {
//   FaCalendarAlt,
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaClipboardList,
// } from "react-icons/fa";

// export default function AppointmentForm({ user }) {
//   const [formData, setFormData] = useState({
//     fullName: user?.displayName || "",
//     email: user?.email || "",
//     phone: "",
//     counselor: "",
//     sessionType: "",
//     mode: "Online",
//     date: "",
//     time: "",
//     concern: "",
//     language: "",
//     genderPreference: "No Preference",
//     consent: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.consent) {
//       alert("Please agree to the consent terms before booking.");
//       return;
//     }
//     alert(
//       `✅ Appointment booked successfully for ${formData.date} at ${formData.time}!`
//     );
//   };

//   return (
//     <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-[#f3f1ff] to-[#fff] text-gray-900 mt-30">
//       <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-6 md:p-10">
//         <h2 className="text-3xl font-semibold text-center text-[#6C4FFF] mb-6 font-serif">
//           Book Your MindSoul Appointment 💜
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Row 1: Name, Email */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Full Name
//               </label>
//               <div className="flex items-center bg-gray-100 rounded-md px-3">
//                 <FaUser className="text-gray-500" />
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="Your full name"
//                   required
//                   className="w-full bg-transparent px-2 py-2 outline-none"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">Email</label>
//               <div className="flex items-center bg-gray-100 rounded-md px-3">
//                 <FaEnvelope className="text-gray-500" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   readOnly
//                   placeholder="your@email.com"
//                   className="w-full bg-transparent px-2 py-2 outline-none"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Row 2: Phone, Counselor */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Phone Number
//               </label>
//               <div className="flex items-center bg-gray-100 rounded-md px-3">
//                 <FaPhone className="text-gray-500" />
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="e.g., +91 98765 43210"
//                   required
//                   className="w-full bg-transparent px-2 py-2 outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Select Counselor
//               </label>
//               <select
//                 name="counselor"
//                 value={formData.counselor}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
//               >
//                 <option value="">Choose Counselor</option>
//                 <option value="Dr. Meera Kapoor">Dr. Meera Kapoor</option>
//                 <option value="Mr. Rahul Sharma">Mr. Rahul Sharma</option>
//                 <option value="Ms. Ananya Verma">Ms. Ananya Verma</option>
//               </select>
//             </div>
//           </div>

//           {/* Row 3: Session Type, Mode */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Session Type
//               </label>
//               <select
//                 name="sessionType"
//                 value={formData.sessionType}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
//               >
//                 <option value="">Select Type</option>
//                 <option value="Child Counseling">Child Counseling</option>
//                 <option value="Family Therapy">Family Therapy</option>
//                 <option value="Career Guidance">Career Guidance</option>
//                 <option value="Anxiety & Stress Support">
//                   Anxiety & Stress Support
//                 </option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Mode</label>
//               <div className="flex gap-4">
//                 {["Online", "In-Person"].map((mode) => (
//                   <label key={mode} className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="mode"
//                       value={mode}
//                       checked={formData.mode === mode}
//                       onChange={handleChange}
//                     />
//                     {mode}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Row 4: Date & Time */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">Date</label>
//               <div className="flex items-center bg-gray-100 rounded-md px-3">
//                 <FaCalendarAlt className="text-gray-500" />
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-transparent px-2 py-2 outline-none"
//                   min={new Date().toISOString().split("T")[0]}
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Time Slot
//               </label>
//               <select
//                 name="time"
//                 value={formData.time}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
//               >
//                 <option value="">Select Time</option>
//                 <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
//                 <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
//                 <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
//                 <option value="4:30 PM - 5:30 PM">4:30 PM - 5:30 PM</option>
//               </select>
//             </div>
//           </div>

//           {/* Row 5: Additional Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Preferred Language
//               </label>
//               <select
//                 name="language"
//                 value={formData.language}
//                 onChange={handleChange}
//                 className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
//               >
//                 <option value="">Select Language</option>
//                 <option value="English">English</option>
//                 <option value="Hindi">Hindi</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Counselor Gender Preference
//               </label>
//               <select
//                 name="genderPreference"
//                 value={formData.genderPreference}
//                 onChange={handleChange}
//                 className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
//               >
//                 <option value="No Preference">No Preference</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             </div>
//           </div>

//           {/* Concern / Goal */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Brief Concern / Goal
//             </label>
//             <textarea
//               name="concern"
//               value={formData.concern}
//               onChange={handleChange}
//               placeholder="Tell us a bit about what you'd like to discuss..."
//               rows={3}
//               className="w-full bg-gray-100 rounded-md px-3 py-2 outline-none"
//             ></textarea>
//           </div>

//           {/* Consent */}
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="consent"
//               checked={formData.consent}
//               onChange={handleChange}
//               required
//             />
//             <label className="text-sm text-gray-700">
//               I consent to receive therapy services and agree to MindSoul’s
//               privacy policy.
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full md:w-auto bg-[#6C4FFF] hover:bg-[#5436F0] text-white py-3 px-6 rounded-md font-medium transition-all mx-auto block"
//           >
//             Book My Session
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

const counsellorId = "Qqq2eWY6w9NEE5UfTCmb"; // STATIC FOR LOCAL TESTING
const BASE_URL = "http://localhost:3000/api";

export default function AppointmentModal({ onClose }) {
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [weeklySchedule, setWeeklySchedule] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [error, setError] = useState("");

  const [morningOpen, setMorningOpen] = useState(true);
  const [afternoonOpen, setAfternoonOpen] = useState(true);
  const [eveningOpen, setEveningOpen] = useState(true);

  async function fetchSchedule() {
    const res = await fetch(`${BASE_URL}/schedule/${counsellorId}`);
    const data = await res.json();

    if (!data.success || !data.weeklySchedule) {
      setError("Weekly schedule not set by counsellor");
      return;
    }
    setWeeklySchedule(data.weeklySchedule);
    setError("");
  }

  async function refreshSlotsForDate(date) {
    await fetch(
      `${BASE_URL}/timeslots/counsellor/${counsellorId}/refresh?date=${date}`,
      { method: "POST" }
    );
  }

  async function fetchAvailableSlots(date) {
    const res = await fetch(
      `${BASE_URL}/timeslots/counsellor/${counsellorId}/slots?date=${date}`
    );
    const data = await res.json();

    return [
      ...(data.slots?.morning || []),
      ...(data.slots?.afternoon || []),
      ...(data.slots?.evening || []),
    ];
  }

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    if (!weeklySchedule) return;

    async function loadSlots() {
      await refreshSlotsForDate(selectedDate);
      const available = await fetchAvailableSlots(selectedDate);

      const res = await fetch(
        `${BASE_URL}/timeslots/counsellor/${counsellorId}/booked?date=${selectedDate}`
      );
      const bookedData = await res.json();

      const booked = (bookedData.bookedSlots || []).map((s) => ({
        ...s,
        isBooked: true,
      }));

      const slotMap = new Map();

      available.forEach((s) =>
        slotMap.set(s.startTime, { ...s, isBooked: false })
      );
      booked.forEach((s) => slotMap.set(s.startTime, s));

      let mergedSlots = Array.from(slotMap.values());

      if (selectedDate === getToday()) {
        const now = new Date();
        mergedSlots = mergedSlots.filter((slot) => {
          const [h, m] = slot.startTime.split(":").map(Number);
          const t = new Date();
          t.setHours(h, m, 0, 0);
          return t > now;
        });
      }

      mergedSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));

      setSlots(mergedSlots);
    }

    loadSlots();
  }, [selectedDate, weeklySchedule]);

  const { morning, afternoon, evening } = groupSlots(slots);

  return (
    <div className="fixed inset-0 z-[1000] bg-black/55 flex items-center justify-center">
      <div className="bg-white w-[520px] max-h-[85vh] overflow-y-auto rounded-2xl p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Book Appointment
          </h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        {/* Date Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 my-4">
          {generateWeek().map((d) => (
            <button
              key={d.date}
              onClick={() => setSelectedDate(d.date)}
              className={`min-w-[76px] px-3 py-2 rounded-lg border text-sm transition
                ${
                  selectedDate === d.date
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
            >
              {d.label}
              <br />
              {d.date.slice(5)}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-600 font-medium text-sm mb-3">{error}</p>
        )}

        {!error && (
          <>
            <Section
              title="Morning Slots"
              open={morningOpen}
              toggle={() => setMorningOpen(!morningOpen)}
              slots={morning}
              selectedSlot={selectedSlot}
              onSelect={setSelectedSlot}
            />

            <Section
              title="Afternoon Slots"
              open={afternoonOpen}
              toggle={() => setAfternoonOpen(!afternoonOpen)}
              slots={afternoon}
              selectedSlot={selectedSlot}
              onSelect={setSelectedSlot}
            />

            <Section
              title="Evening Slots"
              open={eveningOpen}
              toggle={() => setEveningOpen(!eveningOpen)}
              slots={evening}
              selectedSlot={selectedSlot}
              onSelect={setSelectedSlot}
            />
          </>
        )}

        <button
          disabled={!selectedSlot}
          className="w-full mt-6 py-3 rounded-xl text-white font-semibold text-base
            bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Book Appointment Now
        </button>
      </div>
    </div>
  );
}

/* -------------------- Section -------------------- */
function Section({ title, open, toggle, slots, selectedSlot, onSelect }) {
  return (
    <div className="mt-5">
      <div
        onClick={toggle}
        className="font-semibold text-sm text-gray-900 border-b pb-1 mb-3 cursor-pointer"
      >
        {title}
      </div>

      {open && (
        <div className="grid grid-cols-3 gap-3">
          {slots.length === 0 && (
            <p className="col-span-3 text-center text-sm text-gray-500">
              No slots
            </p>
          )}

          {slots.map((slot) => (
            <button
              key={slot.startTime}
              disabled={slot.isBooked}
              onClick={() => onSelect(slot)}
              className={`py-3 px-2 rounded-xl text-sm font-medium transition
                ${
                  slot.isBooked
                    ? "bg-red-100 text-red-800 border border-red-300 cursor-not-allowed"
                    : selectedSlot === slot
                    ? "bg-violet-600 text-white shadow-lg"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                }`}
            >
              {slot.startTime} - {slot.endTime}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------- Helpers -------------------- */
function getToday() {
  return new Date().toISOString().split("T")[0];
}

function generateWeek() {
  const arr = [];
  const d = new Date();

  for (let i = 0; i < 7; i++) {
    const newD = new Date();
    newD.setDate(d.getDate() + i);
    arr.push({
      date: newD.toISOString().split("T")[0],
      label:
        i === 0 ? "Today" : newD.toLocaleString("en", { weekday: "short" }),
    });
  }
  return arr;
}

function groupSlots(slots) {
  const morning = [];
  const afternoon = [];
  const evening = [];

  slots.forEach((s) => {
    const hour = parseInt(s.startTime.split(":")[0], 10);
    if (hour < 12) morning.push(s);
    else if (hour < 17) afternoon.push(s);
    else evening.push(s);
  });

  return { morning, afternoon, evening };
}
