# 📋 MVP Task Breakdown for PulseTrack

Each task is atomic, testable, and includes a single concern. Tasks are grouped by phase.

---

## 🛠️ Phase 1: Project Setup & CI/CD

### ✅ 1. Initialize Frontend Repo

* **Start**: Run `npx create-next-app@latest pulsetrack`
* **End**: Project scaffolding complete with Tailwind CSS and TypeScript configured.

### ✅ 2. Set up Supabase Project

* **Start**: Create a Supabase project and configure tables for users, appointments, caregivers, messages.
* **End**: Connection established from `lib/supabase.ts`.

### ✅ 3. Create Firebase Project

* **Start**: Set up Firebase for notifications
* **End**: Connected via `lib/firebase.ts` and environment variables.

### ✅ 4. Configure Twilio Credentials

* **Start**: Add Twilio keys to `.env.local`
* **End**: Send test message from `twilio.ts`

### ✅ 5. Create CI/CD with Firebase Hosting + GitHub Actions

* **Start**: Define GitHub Actions workflow to build + deploy frontend to Firebase
* **End**: Push to `main` triggers deployment

### ✅ 6. Scaffold Node.js API Repo

* **Start**: `npm init` + install `express`, `axios`, `cors`, `dotenv`
* **End**: Basic `/` endpoint responds with 200 OK

### ✅ 7. Configure CI/CD for Node API (Firebase Functions or Cloud Run)

* **Start**: Setup GitHub Action to deploy API via Firebase Hosting or Cloud Run
* **End**: Commit to `main` deploys API endpoint automatically

---

## 🧪 Phase 2: Authentication & Routing

### ✅ 8. Integrate Supabase Auth in Next.js

* **Start**: Setup `AuthContext.tsx`
* **End**: Login and session restored on page reload

### ✅ 9. Setup Role-Based Routing

* **Start**: Create protected routes using Supabase role info
* **End**: Doctors, Admins, and Patients redirected properly

---

## 📱 Phase 3: Patient & Caregiver Interface

### ✅ 10. My Appointments UI

* **Start**: Build `/patient/appointments.tsx`
* **End**: Loads upcoming from Supabase

### ✅ 11. Reminder Settings

* **Start**: Implement `/reminders.tsx`
* **End**: Patient can choose channels

### ✅ 12. Family Access UI

* **Start**: Build `/patient/family.tsx` + caregiver linking flow
* **End**: Caregiver sees dependents’ appointments

### ✅ 13. Chat Interface

* **Start**: Build `/chat.tsx` + `messageService.ts`
* **End**: Patient ↔ doctor communication live

---

## 🩺 Phase 4: Doctor Experience

### ✅ 14. Doctor Dashboard Home

* **Start**: `/dashboard/page.tsx` lists urgent appointments
* **End**: Uses hooks from `useAppointments.ts`

### ✅ 15. Schedule Follow-Up

* **Start**: `/dashboard/schedule.tsx` + connect to Node API
* **End**: Calls backend to store reminder logic + Supabase event

### ✅ 16. Analytics Dashboard

* **Start**: `/analytics.tsx` + `analyticsService.ts`
* **End**: Graphs render adherence & responsiveness

### ✅ 17. Messages View

* **Start**: `/messages.tsx`
* **End**: Renders message history per patient

---

## 🧑‍💼 Phase 5: Admin Experience

### ✅ 18. Admin Home

* **Start**: `/admin/page.tsx`
* **End**: Loads overall metrics, links to subpages

### ✅ 19. User Management

* **Start**: `/admin/users.tsx`
* **End**: List and edit patients/doctors

### ✅ 20. System Metrics

* **Start**: `/admin/metrics.tsx`
* **End**: Charts on delivery and usage

---

## 🚀 Phase 6: Landing Page

### ✅ 21. Build Landing Page UI

* **Start**: `/page.tsx` with call to action
* **End**: Links to signup/login

### ✅ 22. Optimize for SEO

* **Start**: Add metadata, OG tags, alt text
* **End**: Page is crawlable and indexable

---

## 📦 Phase 7: Node.js API Development

### ✅ 23. `/reminder` POST Endpoint

* **Start**: Create endpoint that accepts schedule + patient ID
* **End**: Saves to DB and triggers messaging

### ✅ 24. `/confirm` POST Endpoint

* **Start**: Receives patient confirmation from Twilio webhook
* **End**: Updates Supabase + logs result

### ✅ 25. Error Handling Middleware

* **Start**: Add express error middleware
* **End**: Logs errors and sends user-friendly response

### ✅ 26. Env Variables with dotenv

* **Start**: Configure `.env` and use in code
* **End**: Keys securely accessed

---

## 🧪 Phase 8: Testing & QA

### ✅ 27. Manual Test: Patient Flow

* **Start**: Login, schedule follow-up, receive reminder
* **End**: Confirm appointment and view status change

### ✅ 28. Manual Test: Caregiver Flow

* **Start**: Link caregiver to patient and test reminder relay
* **End**: Reminder visible to both parties

### ✅ 29. Manual Test: Admin Controls

* **Start**: Login as admin and audit users/messages
* **End**: Metrics load successfully

### ✅ 30. Regression Test

* **Start**: Run through all primary UIs and forms
* **End**: No critical errors or blocked flows

---

## ✅ Phase 9: Deploy to Production

### ✅ 31. Final Firebase Deploy

* **Start**: Push to `main`
* **End**: Frontend + API hosted on Firebase, reachable by real users
