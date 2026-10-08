import { API_BASE_URL } from "../../api/apiConfig.js";
import { useEffect, useState } from "react";

const BASE_URL =
  `${API_BASE_URL}/api`;

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PERIODS = ["morning", "afternoon", "evening"];

const actionBtnStyle = {
  padding: "8px 14px",
  background: "#ede9fe",
  color: "#4c1d95",
  border: "1px solid #c4b5fd",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

export default function CounsellorWeeklySchedule() {
  const [counsellorId, setCounsellorId] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  /* -------------------------------
     GET counsellorId (OTP login)
  ------------------------------- */
  useEffect(() => {
    const storedCounsellorId = localStorage.getItem("counsellorId");
    const isLoggedIn = localStorage.getItem("isCounsellorLoggedIn");

    if (storedCounsellorId && isLoggedIn === "true") {
      setCounsellorId(storedCounsellorId);
    } else {
      console.error("Counsellor not logged in");
      setLoading(false);
    }
  }, []);

  /* -------------------------------
     FETCH Weekly Schedule
  ------------------------------- */
  useEffect(() => {
    if (!counsellorId) return;

    async function fetchSchedule() {
      try {

        const res = await fetch(`${BASE_URL}/schedule/${counsellorId}`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Unauthorized");
        }

        const initial = data.weeklySchedule || data.schedulePreferences || {};

        setSchedule(initial);
      } catch (err) {
        console.error("Failed to fetch schedule:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, [counsellorId]);

  /* -------------------------------
     Toggle All
  ------------------------------- */
  function toggleAll(value) {
    const updated = {};
    DAYS.forEach((day) => {
      updated[day] = {
        morning: value,
        afternoon: value,
        evening: value,
      };
    });
    setSchedule(updated);
  }

  /* -------------------------------
     Toggle Slot
  ------------------------------- */
  function toggle(day, period) {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [period]: !prev[day]?.[period],
      },
    }));
  }

  /* -------------------------------
     SAVE Weekly Schedule
  ------------------------------- */
  async function saveSchedule() {
    if (!counsellorId) return;

    if (saving) return;
    setSaving(true); setFeedback(""); setError("");

    try {

      const res = await fetch(`${BASE_URL}/schedule/${counsellorId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weekly: schedule }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Unauthorized");
      }

      setFeedback("Your recurring weekly availability is saved and upcoming slots have been refreshed.");
    } catch (err) {
      console.error("Failed to save schedule:", err.message);
      setError(err.message || "We couldn't save your schedule. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading schedule...</p>;

  return (
    <div style={{ maxWidth: "1100px", margin: "auto" }} className="font-body">
      <p className="text-sm text-gray-500">This schedule repeats each week. Update it when your availability changes; there is no need to save it every weekend. Existing booked sessions are preserved.</p>
      {feedback && <p className="form-success mt-4" role="status">{feedback}</p>}
      {error && <p className="form-error mt-4" role="alert">{error}</p>}
      <h2 className="text-lg mt-8">Weekly Availability</h2>

      <div
        style={{ marginBottom: "16px", display: "flex", gap: "12px" }}
        className="mt-2"
      >
        <button onClick={() => toggleAll(true)} style={actionBtnStyle}>
          Select All
        </button>
        <button onClick={() => toggleAll(false)} style={actionBtnStyle}>
          Clear All
        </button>
      </div>

      <table
        style={{ width: "100%", borderCollapse: "collapse" }}
        className="text-lg"
      >
        <thead>
          <tr>
            <th align="left">Day</th>
            {PERIODS.map((p) => (
              <th key={p}>{p}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {DAYS.map((day) => (
            <tr key={day}>
              <td style={{ padding: "10px 0" }}>{day}</td>
              {PERIODS.map((period) => (
                <td key={period} align="center">
                  <input
                    type="checkbox"
                    checked={schedule?.[day]?.[period] || false}
                    onChange={() => toggle(day, period)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={saveSchedule}
        disabled={saving}
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          background: "#778DA9",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        {saving ? "Saving..." : "Save Weekly Schedule"}
      </button>
    </div>
  );
}
