import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { fetchJson, waitForScheduledAppointment } from "../src/api/bookingStatus.js";
import { bookingDays, isPastBookingSlot } from "../src/utils/bookingDate.js";
import { calendarCells, adjacentMonth } from "../src/utils/calendar.js";
import { formatMoney,formatTimeRange,sessionCalendarFile } from "../src/utils/sessionDisplay.js";

test("session money, time and calendar exports are correctly formatted",()=>{
  assert.ok(formatMoney(3300).includes("₹"));
  assert.match(formatTimeRange("09:00-10:00"),/9:00.*10:00.*IST/);
  const file=sessionCalendarFile({id:"a",date:"2030-01-01",timeSlot:"09:00-10:00"});
  assert.ok(file.includes("DTSTART:20300101T033000Z"));
  assert.ok(file.includes("DTEND:20300101T043000Z"));
});

test("calendar aligns weekdays, handles leap days and crosses year boundaries", () => {
  const october = calendarCells("2026-10");
  assert.equal(october[3], "2026-10-01");
  assert.equal(october.filter(Boolean).length, 31);
  assert.equal(calendarCells("2028-02").filter(Boolean).at(-1), "2028-02-29");
  assert.equal(adjacentMonth("2026-12", 1), "2027-01");
  assert.equal(adjacentMonth("2027-01", -1), "2026-12");
  const days = bookingDays(45, new Date("2026-12-20T12:00:00Z"));
  assert.equal(days.at(-1).fullDate, "2027-02-02");
});

test("booking day labels and submitted dates agree before 05:30 IST", () => {
  const days = bookingDays(2, new Date("2026-10-05T22:30:00Z"));
  assert.equal(days[0].fullDate, "2026-10-06");
  assert.equal(days[0].date, "Oct 06");
  assert.equal(days[1].fullDate, "2026-10-07");
  assert.equal(isPastBookingSlot("2026-10-06", "04:00", Date.parse("2026-10-05T22:31:00Z")), true);
});

test("confirmation waits for scheduled state, rather than pending payment", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  let calls = 0;
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ success: true, data: [{ id: "a", status: ++calls === 1 ? "pending_payment" : "scheduled" }] }) });
  const result = await waitForScheduledAppointment({ appointmentId: "a", token: "test", attempts: 2, intervalMs: 0 });
  assert.equal(result.status, "scheduled");
  assert.equal(calls, 2);
});

test("pending bookings stop polling and provide safe recovery instead of false confirmation", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ data: [{ id: "a", status: "pending_payment" }] }) });
  await assert.rejects(waitForScheduledAppointment({ appointmentId: "a", token: "test", attempts: 1 }), /do not pay again/i);
});

test("failed API responses and malformed appointment responses are not treated as confirmation", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => ({ ok: false, json: async () => ({ message: "Session expired" }) });
  await assert.rejects(fetchJson("test"), /Session expired/);
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ success: true }) });
  await assert.rejects(waitForScheduledAppointment({ appointmentId: "a", token: "test" }), /Invalid appointment response/);
});

test("closing a modal aborts outstanding confirmation requests", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
  });
  const controller = new AbortController();
  const pending = waitForScheduledAppointment({ appointmentId: "a", token: "test", signal: controller.signal });
  controller.abort();
  await assert.rejects(pending, { name: "AbortError" });
});

async function checkoutHarness(overrides = {}) {
  const source = await readFile(new URL("../src/components/Profile/BookAppointmentModal.jsx", import.meta.url), "utf8");
  const start = source.match(/^ {2}const confirmAppointment =/m).index;
  const end = source.indexOf("  /* -------------------- Slot Card", start);
  const state = { confirmed: false, loader: false, error: "", requests: [] };
  const context = vm.createContext({
    BASE_URL: "mock", pendingAppointment: null, awaitingConfirmation: false,
    selectedSlot: { startTime: "09:00", endTime: "09:30" }, selectedDay: { fullDate: "2030-01-01" },
    counsellorId: "c", razorpayKey: "test-key", AbortController,
    processingRef: { current: false }, confirmationRef: { current: null },
    localStorage: { getItem: () => "token" },
    setBookingError: (value) => { state.error = value; },
    setShowFinalLoader: (value) => { state.loader = value; },
    setProcessingPayment: () => {},
    setAppointmentData: (value) => { state.appointment = value; },
    setIsBooked: (value) => { state.confirmed = value; },
    setPendingAppointment: (value) => { context.pendingAppointment = value; },
    setAwaitingConfirmation: (value) => { context.awaitingConfirmation = value; },
    loadRazorpayScript: async () => true,
    fetchJson: async (url) => {
      state.requests.push(url);
      if (url.endsWith("/appointment")) return { appointment: { appointmentId: "a", status: "pending_payment" } };
      if (url.endsWith("/create-order")) return { order: { id: "order", amount: 100, currency: "INR" } };
      throw new Error("Verification unavailable");
    },
    waitForScheduledAppointment: async () => ({ id: "a", status: "scheduled", meetingLink: "mock-meeting" }),
    window: { Razorpay: class { constructor(options) { state.checkout = options; } open() {} } },
    ...overrides,
  });
  vm.runInContext(source.slice(start, end) + "\nglobalThis.actions = { handlePaymentAndBooking, checkBookingStatus };", context);
  return { state, context, ...context.actions };
}

test("asynchronous verification failures release the loader and offer status recovery", async () => {
  const harness = await checkoutHarness();
  await harness.handlePaymentAndBooking();
  await harness.state.checkout.handler({});
  assert.equal(harness.state.loader, false);
  assert.equal(harness.state.confirmed, false);
  assert.match(harness.state.error, /Verification unavailable/);
  assert.equal(harness.context.awaitingConfirmation, true);
  await harness.checkBookingStatus();
  assert.equal(harness.state.confirmed, true);
  assert.equal(harness.state.appointment.status, "scheduled");
});

test("checkout dismiss/retry reuses the appointment and prevents duplicate in-flight submissions", async () => {
  const harness = await checkoutHarness();
  await Promise.all([harness.handlePaymentAndBooking(), harness.handlePaymentAndBooking()]);
  harness.state.checkout.modal.ondismiss();
  await harness.handlePaymentAndBooking();
  assert.equal(harness.state.requests.filter((url) => url.endsWith("/appointment")).length, 1);
});

test("successful verification alone does not display appointment confirmation", async () => {
  let release;
  const pending = new Promise((resolve) => { release = resolve; });
  const harness = await checkoutHarness({
    fetchJson: async (url) => url.endsWith("/appointment")
      ? { appointment: { appointmentId: "a", status: "pending_payment" } }
      : url.endsWith("/create-order") ? { order: { id: "order", amount: 100 } } : { success: true },
    waitForScheduledAppointment: () => pending,
  });
  await harness.handlePaymentAndBooking();
  const callback = harness.state.checkout.handler({});
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(harness.state.confirmed, false);
  assert.equal(harness.state.loader, true);
  release({ id: "a", status: "scheduled" });
  await callback;
  assert.equal(harness.state.confirmed, true);
  assert.equal(harness.state.loader, false);
});
