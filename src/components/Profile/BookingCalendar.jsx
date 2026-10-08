import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { adjacentMonth, calendarCells } from "../../utils/calendar";

export default function BookingCalendar({ days, availableDates, selectedDay, onSelect, disabled = false }) {
  const [requestedMonth, setRequestedMonth] = useState(null);
  const [focused, setFocused] = useState(null);
  const grid = useRef(null);
  useEffect(() => { setRequestedMonth(null); setFocused(null); }, [selectedDay?.fullDate]);
  if (!days.length) return <p role="status" className="text-sm text-gray-500">Loading your calendar...</p>;
  const firstMonth = days[0].fullDate.slice(0,7), lastMonth = days.at(-1).fullDate.slice(0,7);
  const month = requestedMonth && requestedMonth >= firstMonth && requestedMonth <= lastMonth ? requestedMonth : selectedDay?.fullDate.slice(0,7) || firstMonth;
  const dates = new Map(days.map((day) => [day.fullDate,day]));
  const available = new Set(availableDates ?? days.map((day) => day.fullDate));
  const cells = calendarCells(month);
  const selectable = cells.filter((date) => date && dates.has(date) && available.has(date));
  const active = selectable.includes(focused) ? focused : selectable.includes(selectedDay?.fullDate) ? selectedDay.fullDate : selectable[0];
  const keyboard = (event,date) => {
    const steps = { ArrowLeft:-1, ArrowRight:1, ArrowUp:-7, ArrowDown:7 };
    if (!(event.key in steps)) return;
    event.preventDefault(); let index = cells.indexOf(date) + steps[event.key];
    while(index >= 0 && index < cells.length) { const next = cells[index]; if(selectable.includes(next)) { setFocused(next); grid.current.querySelector(`[data-date="${next}"]`)?.focus(); break; } index += steps[event.key]; }
  };
  const heading = new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-IN",{month:"long",year:"numeric",timeZone:"UTC"});
  return <section className="booking-calendar" aria-label="Choose a session date"><div className="calendar-heading"><h3 aria-live="polite">{heading}</h3><div className="flex gap-1"><button type="button" aria-label="Previous month" disabled={disabled || month <= firstMonth} onClick={() => { setRequestedMonth(adjacentMonth(month,-1)); setFocused(null); }}><ChevronLeft size={17}/></button><button type="button" aria-label="Next month" disabled={disabled || month >= lastMonth} onClick={() => { setRequestedMonth(adjacentMonth(month,1)); setFocused(null); }}><ChevronRight size={17}/></button></div></div>
    <div className="calendar-weekdays" aria-hidden="true">{["M","T","W","T","F","S","S"].map((value,index) => <span key={index}>{value}</span>)}</div><div className="calendar-days" ref={grid}>{cells.map((date,index) => { if(!date) return <span key={index}/>; const label = new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}); const canBook = selectable.includes(date); return <button type="button" key={date} data-date={date} tabIndex={date === active ? 0 : -1} aria-label={label + (canBook ? ", sessions available" : ", unavailable")} aria-pressed={date === selectedDay?.fullDate} aria-current={date === days[0].fullDate ? "date" : undefined} disabled={disabled || !canBook} onFocus={() => setFocused(date)} onKeyDown={(event) => keyboard(event,date)} onClick={() => onSelect(dates.get(date))}>{Number(date.slice(-2))}{canBook && <span className="calendar-today-dot"/>}</button>; })}</div><p className="calendar-note">Marked dates have available sessions. Use arrow keys to move between dates. Times are in IST.</p>
  </section>;
}
