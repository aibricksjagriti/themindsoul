export const formatMoney = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value));

export const formatTimeRange = (slot) => {
  if (typeof slot !== "string") return "Time pending";
  const format = (time) => {
    const date = new Date(`2000-01-01T${time.trim()}:00+05:30`);
    return Number.isFinite(date.getTime()) ? date.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }) : time;
  };
  return slot.split("-").map(format).join(" – ") + " IST";
};

export const sessionCalendarFile = (appointment) => {
  const escape = (value) => String(value || "").replace(/\\/g,"\\\\").replace(/\r?\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;");
  const [start,end] = appointment.timeSlot.split("-");
  const instant = (time) => new Date(`${appointment.date}T${time.trim()}:00+05:30`).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z");
  const rows = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//MindSoul//Sessions//EN","BEGIN:VEVENT",
    `UID:${escape(appointment.appointmentId || appointment.id || `${appointment.date}-${start}`)}@themindsoul.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z")}`,
    `DTSTART:${instant(start)}`,`DTEND:${instant(end)}`,"SUMMARY:MindSoul counselling session",
    `DESCRIPTION:${escape("Online counselling session. " + (appointment.zoomLink || appointment.meetingLink || "Find the meeting link in your dashboard."))}`,
    "END:VEVENT","END:VCALENDAR"];
  return rows.join("\r\n") + "\r\n";
};

export const downloadSessionCalendar = (appointment) => {
  const url = URL.createObjectURL(new Blob([sessionCalendarFile(appointment)], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a"); link.href = url; link.download = "mindsoul-session.ics"; link.click();
  setTimeout(() => URL.revokeObjectURL(url),1000);
};
