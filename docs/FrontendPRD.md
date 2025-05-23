### 1. 📌 Overview

PulseTrack is a healthcare engagement platform designed to bridge the communication gap between doctors, patients, caregivers, and administrators. By automating follow-up reminders and providing real-time updates across multiple messaging channels, PulseTrack improves appointment attendance, patient outcomes, and overall clinic efficiency.

---

### 2. 🎯 Goals and Objectives

* Improve healthcare appointment adherence through automated, multi-channel reminders.
* Enable bi-directional communication between patients and doctors.
* Support family/caregiver access to dependent health reminders.
* Equip doctors and administrators with actionable insights via dashboards.
* Maintain HIPAA-compliant data handling and messaging.

---

### 3. ✨ Core Features

* **Automated Follow-Up Reminders:** Sent via SMS, WhatsApp, email, and in-app notifications with customizable frequency.
* **Doctor Scheduling:** Manual scheduling of follow-ups by healthcare providers.
* **Smart Calendar Sync:** Google Calendar / Outlook sync for appointments.
* **Bi-Directional Messaging:** Patients can confirm, cancel, or reschedule via message; doctors are notified in real-time.
* **Multilingual Support:** Auto-detection and support for user-preferred language.
* **Engagement Analytics Dashboard:** Metrics for missed appointments, patient engagement, and response rates.
* **Family Access:** Caregivers can manage and receive reminders for dependents.
* **Admin Dashboard:** Overview of all users, appointments, system metrics, and user management.
* **Landing Page:** Public-facing homepage with CTA and overview of the system.

---

### 4. 🔄 User Flow

1. **User visits landing page.**
2. **User signs up as Doctor, Patient, Admin, or Caregiver.**
3. **Patient books appointment or receives one from doctor.**
4. **Reminders are automatically generated based on settings.**
5. **Patient receives notifications and confirms/reschedules/cancels.**
6. **Doctor receives updates in real-time.**
7. **Caregivers (if linked) receive dependent notifications.**
8. **Admins view analytics and manage users.**

---

### 5. ⚙️ Technical Stack

* **Frontend:** Next.js, Tailwind CSS
* **Backend:** Node.js running on `localhost:3000`
* **Networking:** Axios for HTTP requests
* **Database & Auth:** Supabase
* **Messaging APIs:** Twilio (SMS, WhatsApp), Firebase Cloud Messaging
* **CI/CD:** Firebase Hosting + GitHub Actions

---

### 6. 🔌 API Interaction

**Endpoint:** `POST /api/appointments/schedule`

* **Payload:**

  ```json
  {
    "doctor_id": "abc123",
    "patient_id": "xyz789",
    "date": "2025-06-01T14:30:00Z",
    "channel": ["sms", "email"]
  }
  ```
* **Expected Behavior:**

  * Save appointment in DB
  * Create reminder entries
  * Trigger notification via selected channels

---

### 7. ❗ Validation & Error Handling

* All API calls use `try-catch`
* Display friendly messages for:

  * Network errors
  * Invalid form data
  * Unauthorized access
* Highlight invalid fields with helper text

---

### 8. 🎨 UI/UX Requirements

* Clean and minimal interface
* Responsive layout (desktop & mobile)
* Consistent green color palette
* Tailwind UI components with dark mode
* Loading spinners during API interactions

---

### 9. 📌 Assumptions & Constraints

* All users have access to an internet-enabled device.
* Supabase Auth manages session state securely.
* Firebase and Twilio are properly configured with valid credentials.
* No support for non-smartphone SMS-only users at MVP phase.
* External calendar integrations depend on user API keys (OAuth).
