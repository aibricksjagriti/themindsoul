import React, { useState } from "react";

export default function AppointmentFormModal({ isOpen, onClose, counselor }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Appointment booked with ${counselor.name} on ${formData.date}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[90%] md:w-[500px] p-6 rounded-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Book Appointment with {counselor?.name}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <textarea
            name="notes"
            placeholder="Additional notes (optional)"
            value={formData.notes}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            rows={3}
          ></textarea>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
