# Product and user-experience cross-check

Reviewed the current local site at 1440px and 390px widths, including live public
profiles and sign-in with the dedicated complimentary account. No bookings,
payments, enquiries or emails were submitted. No application code was changed.

## What works

- The checked home, directory, contact, program and policy pages render without
  page errors or horizontal overflow at both widths.
- The live directory returned five profiles.
- The dedicated account signs in and its booking dialog displays complimentary access.
- The visual system, readable typography, search/filter structure and date/time
  review are a stronger foundation than the previous pages.
- Earlier controlled interaction checks covered successful/error/empty states;
  those checks used intercepted responses, not real transactions.

## Must fix

| Priority | Finding and evidence | Recommended change |
| --- | --- | --- |
| High | The live profile price reads `?3,300 / session`. `CounselorProfile.jsx` contains a literal question mark before the price. Some contact size-range labels also have corrupted dash characters. | Use UTF-8-safe currency formatting and repair corrupted labels. Check every money/range display. |
| High | Complimentary entitlement is shown only after opening booking. The profile still presents a paid price and tells the already signed-in account to sign in. | Show the normal session price alongside a clearly labelled account-specific `Your price: Free` state once server eligibility is verified. Make signed-in copy accurate. |
| High | Calendar buttons indicate dates within the booking horizon, not dates with actual availability. The checked date had no slots, yet there is no next-available action. | Distinguish selectable dates from available dates. Offer `Find next available` and `Browse other counsellors`; avoid issuing 45 separate availability requests on every visit. |
| High | Paid checkout has no configured frontend key. Complimentary calls target localhost while other integrations target production. A missing eligibility endpoint is treated as ordinary checkout. | Define and verify the intended environment before release. Make unknown entitlement explicit rather than presenting a paid offer as though eligibility was checked. Preserve backend payment implementation. |
| High | SMTP verification still returns `EAUTH`. Counsellor OTP and appointment/enquiry notifications cannot rely on working email delivery. | Correct mail authentication and test actual delivery with an approved recipient. Keep accepted enquiry records visible for operational follow-up. |
| High | The booking overlay has zero dialog roles in the live browser. It does not use the focus containment/scroll lock of the sign-in dialog. | Add dialog semantics, focus entry/return, keyboard containment and Escape handling when it is safe to close. Verify the confirmation and processing overlays too. |

## Should fix

| Priority | Finding and evidence | Recommended change |
| --- | --- | --- |
| Medium | Failed slot loading can show both an error and `No session times are available`: the grid is cleared before the request, and the empty-state condition does not distinguish failure. | Keep loading, failed and genuinely empty states separate. Add retry without losing the selected date. |
| Medium | On mobile, calendar, 3D decoration, slots, review and the final button occupy a long scroll area. The review step does not explicitly move focus into its summary. | Keep the selected date/time and action visible together. Scroll/focus the review heading after the review action; keep decorative content subordinate to the decision. |
| Medium | Confirmation offers a meeting link and close button, but no clear return-to-dashboard or add-to-calendar action. | Add `View my appointment`, a calendar export, and a concise explanation of where the booking is saved. Do not promise an email until delivery works. |
| Medium | The policy describes cancellation/rescheduling, but the session card has no matching action or clear support route. | Provide a request/support action now, or an approved management flow later. Clearly state deadlines and consequences; payment/refund implementation stays protected. |
| Medium | Sign-in has no password recovery. A lost password leaves users dependent on external assistance. | Build a secure recovery flow with useful success/error states; do not add a nonfunctional link. |
| Medium | Free-account transaction history has no complimentary explanation. An empty payment list can look like a missing booking record. | Explain that complimentary sessions appear under Appointments and do not create paid transactions. Keep the booking's free badge visible. |
| Medium | The weekly-schedule screen still says updating every weekend is mandatory, although the backend stores a persistent weekly schedule and generates a rolling horizon. Errors are all labelled session expiry. | Explain the actual recurring schedule behavior. Show inline saved/failed states and distinguish authorization, validation and availability-generation errors. |

## Nice to improve

- Show first useful availability, language and session duration when comparing
  counsellors, without inventing ratings or credentials.
- Display slot times in a familiar `9:00–10:00 AM IST` format consistently.
- Clarify the privacy notice beside account creation and who can access optional
  medical details. Have business/legal owners review the policy promises.
- Improve calendar keyboard navigation and accessible month/day announcements.
- Keep the 3D animation subtle, responsive, and disabled for reduced-motion users.

## Recommended next pass

1. Repair currency and account-specific pricing/sign-in copy.
2. Improve availability discovery, empty/error recovery and booking accessibility.
3. Make mobile review and confirmation-to-dashboard continuity clear.
4. Address deployment/checkout configuration and email delivery separately.
5. Add account recovery and appointment-management flows with appropriate backend support.

## Fix status - October 8, 2026

The actionable frontend and nonpayment backend findings above have been addressed: currency and range labels; verified complimentary pricing; availability summaries and next-date discovery; shared environment configuration; booking dialog semantics; separate loading/error/empty states and retry; mobile review focus; appointment/calendar confirmation actions; owned session-change support requests; password recovery; complimentary transaction explanation; recurring schedule copy and error handling; privacy notice; IST time formatting; keyboard calendar navigation. Existing 3D visuals respect reduced motion.

Validation: 36 backend tests, 14 frontend tests, production build and selected new-module lint pass. Production live keys match; local test keys match; SMTP authentication and the approved test submission passed. See ../PRODUCTION_READINESS.md for deployment checks and remaining payment-owner findings.

Support requests are stored for manual review, with no automatic cancellation/refund or staff notification. Password reset does not revoke already issued stateless login tokens. Optional directory comparison enhancements and business/legal review of policy promises remain improvements, not claimed complete here.
