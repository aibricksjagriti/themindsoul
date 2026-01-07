# MINDSOUL – API List (Clean Version)

Base URL:
https://mindsoul-backend-772700176760.asia-south1.run.app

---

## User Authentication

POST /api/auth/signup  
POST /api/auth/login  
POST /api/auth/google  
POST /api/auth/session

---

## Counsellor

POST /api/counsellor/send-otp ( to email )
POST /api/counsellor/verify-otp  
POST /api/counsellor/update-profile (counsellor profile)

# list all counsellors

GET /api/counsellor/list

# filter counsellors

GET /api/counsellor/filter

---

## Appointment Booking

POST /api/appointment/
