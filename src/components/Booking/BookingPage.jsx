import React, { useEffect, useState } from "react";
import { fetchSlots, generateSlots } from "../../api/timeslotsApi";

function BookingPage({ counsellorId }) {
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [slots, setSlots] = useState({
    morning: [],
    afternoon: [],
    evening: [],
  });
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    loadSlots(selectedDate);
  }, [selectedDate]);

  async function loadSlots(date) {
    try {
      setLoading(true);

      const response = await fetchSlots(counsellorId, date);
      const data = response.data.slots;

      // CASE 1 → Slots found
      if (data.morning.length || data.afternoon.length || data.evening.length) {
        setSlots(data);
      } else {
        // CASE 2 → No slots → generate them
        await generateSlots(counsellorId, date);
        const newResp = await fetchSlots(counsellorId, date);
        setSlots(newResp.data.slots);
      }
    } catch (error) {
      console.error("Slot loading error:", error);
    } finally {
      setLoading(false);
    }
  }

  function getToday() {
    return new Date().toISOString().split("T")[0];
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Book Appointment</h2>

      {/* DATE SELECTOR */}
      <div style={{ display: "flex", gap: 10 }}>
        {[0, 1, 2].map((offset) => {
          const dt = new Date();
          dt.setDate(dt.getDate() + offset);
          const dateStr = dt.toISOString().split("T")[0];

          return (
            <button
              key={offset}
              style={{
                padding: 10,
                background: selectedDate === dateStr ? "#4a3aff" : "#eee",
                color: selectedDate === dateStr ? "#fff" : "#000",
              }}
              onClick={() => setSelectedDate(dateStr)}
            >
              {offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : dateStr}
            </button>
          );
        })}
      </div>

      {/* SLOT LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ marginTop: 20 }}>
          <SlotGroup
            title="Morning Slots"
            slots={slots.morning}
            selectedSlot={selectedSlot}
            onSelect={setSelectedSlot}
          />

          <SlotGroup
            title="Afternoon Slots"
            slots={slots.afternoon}
            selectedSlot={selectedSlot}
            onSelect={setSelectedSlot}
          />

          <SlotGroup
            title="Evening Slots"
            slots={slots.evening}
            selectedSlot={selectedSlot}
            onSelect={setSelectedSlot}
          />
        </div>
      )}

      {/* Selected Slot Confirmation */}
      <button
        disabled={!selectedSlot}
        style={{
          marginTop: 20,
          padding: 15,
          width: "100%",
          background: selectedSlot ? "#4a3aff" : "#999",
          color: "white",
        }}
      >
        Book Appointment Now
      </button>
    </div>
  );
}

function SlotGroup({ title, slots, selectedSlot, onSelect }) {
  return (
    <div style={{ marginBottom: 15 }}>
      <h4>{title}</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {slots.length === 0 ? (
          <p>No slots available</p>
        ) : (
          slots.map((slot) => (
            <label
              key={slot.id}
              style={{
                padding: "10px 15px",
                border: "1px solid #ccc",
                borderRadius: 8,
                cursor: "pointer",
                background: selectedSlot?.id === slot.id ? "#e0d8ff" : "#fff",
              }}
            >
              <input
                type="radio"
                name="slot"
                value={slot.id}
                checked={selectedSlot?.id === slot.id}
                onChange={() => onSelect(slot)}
                style={{ marginRight: 8 }}
              />
              {slot.startTime}–{slot.endTime}
            </label>
          ))
        )}
      </div>
    </div>
  );
}

export default BookingPage;
