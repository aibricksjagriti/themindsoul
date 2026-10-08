export const indiaDateString = (date = new Date()) =>
  new Date(date.getTime() + 330 * 60 * 1000).toISOString().slice(0, 10);

export const bookingDays = (count = 14, now = new Date()) => {
  const today = new Date(`${indiaDateString(now)}T00:00:00Z`);
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() + i);
    return {
      label: i === 0 ? "Today" : date.toLocaleDateString("en-US", {
        weekday: "short", timeZone: "Asia/Kolkata",
      }),
      date: date.toLocaleDateString("en-US", {
        day: "2-digit", month: "short", timeZone: "Asia/Kolkata",
      }),
      fullDate: date.toISOString().slice(0, 10),
    };
  });
};

export const isPastBookingSlot = (date, time, now = Date.now()) =>
  new Date(`${date}T${time}:00+05:30`).getTime() <= now;
