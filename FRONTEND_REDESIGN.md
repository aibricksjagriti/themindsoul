# Frontend redesign

The website now shares a warm ivory, deep green, sage and peach visual system,
with Lora headings, responsive layouts, and consistent cards, controls, dialogs,
loading states, and empty states.

## Updated experiences

- Home: editorial hero, care pathways, live counsellor cards, getting-started steps,
  community story, expandable FAQs, and clear calls to action.
- Navigation/footer: active links, mobile menu with keyboard handling, account
  controls, corrected contact navigation, and a consistent brand treatment.
- Directory: searchable names/expertise/languages, combined filters, removable
  selections, accessible profile links, and reliable portrait fallbacks.
- Counsellor profiles: clearer introductions, areas of focus, session details,
  responsive booking panel, and sign-in-to-book continuity.
- About/contact/programs/policies: consistent typography and spacing, clear school
  and workplace enquiry paths, improved labelled forms, and mobile layouts.
- Sign-in/signup/counsellor verification: shared dialogs, focus containment,
  Escape handling, scroll locking, field labels, and useful errors/success states.
- User/counsellor dashboards: compact profile headers, responsive section controls,
  readable session cards, personal details, and transaction history states.
- Professional profile editor: labelled fields, inline save feedback, duplicate-save
  prevention, and an optional new base-fee field. An unchanged session price is not
  resubmitted, preventing price increases when saving unrelated profile changes.
- Booking/confirmation: mobile scrolling, clearer close controls and styling,
  retaining the existing verification and scheduled-state confirmation flow.
- Booking calendar: month navigation, a 45-day date selection window, disabled
  past/out-of-range dates, Indian-time labels, and slot reset when changing dates.
- CSS 3D wellness animation in the home hero and booking dialog, with reduced-motion
  support and no extra rendering dependency.
- Route titles, skip navigation, reduced-motion support, and a useful not-found page.

## Checks

- Production build succeeds.
- All 13 frontend regression tests pass, including calendar leap-year/month-boundary checks.
- Browser checks covered 12 routes at 1440px and 390px widths, with no page errors
  or horizontal overflow.
- Intercepted browser checks passed for menu/focus handling, sign-up/sign-in states,
  filters/search, profile-to-booking, dashboard sections, personal details, contact
  submission, and unchanged-fee profile saves.
- Browser checks used isolated test responses. They did not create real accounts,
  bookings, enquiries, payments, or profile updates.
- No introduced lint findings. Existing lint issues in legacy components and the
  authentication context remain.

Backend implementation and production credentials were not changed in this
redesign. Existing email authentication, frontend checkout-key configuration,
and deployment/session-endpoint issues remain separate integration work.

Local preview: http://localhost:5173/
