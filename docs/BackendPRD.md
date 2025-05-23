## 📝 Product Requirements Document (PRD): PulseTrack Minimal Node.js API

---

### 📌 Overview

This document outlines the requirements for a minimalistic Node.js API service that serves as the backend for the PulseTrack healthcare engagement platform. This service will handle appointment scheduling, patient-doctor messaging, and notification queueing.

---

### 🚀 Features to Include

1. **Health Check Endpoint (`GET /`)**
   Returns API status and version. Used for uptime checks.

2. **Schedule Appointment Endpoint (`POST /appointments`)**
   Accepts doctor ID, patient ID, appointment datetime, and delivery channels.

3. **Confirm Appointment Endpoint (`POST /appointments/:id/confirm`)**
   Allows patients or caregivers to confirm scheduled appointments.

4. **Cancel Appointment Endpoint (`POST /appointments/:id/cancel`)**
   Allows patients or caregivers to cancel scheduled appointments.

5. **Environment Configuration**

   * Utilizes `dotenv` for managing API keys and database credentials.

6. **CORS and Express Middleware**

   * Handles JSON and URL-encoded body parsing.
   * CORS enabled for cross-origin requests.

7. **Security & Error Handling**

   * Logs all errors.
   * Responds with appropriate HTTP status codes and error messages.

---

### ⚙️ Technical Stack

* **Node.js** (v18+)
* **Express** (v4+)
* **Axios** (for internal HTTP calls or notifications)
* **dotenv** (for managing environment variables)
* **cors** (to support cross-origin requests)

---

### 🔒 Constraints

* All application logic, dependencies, and scripts must be defined in `package.json`.
* No use of external config files or frameworks outside this scope.

---

### 📄 Functional Specifications

#### 1. `GET /`

**Purpose:** Health check endpoint
**Response:**

```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

#### 2. `POST /appointments`

**Purpose:** Schedule an appointment and queue reminders
**Request Body:**

```json
{
  "doctor_id": "abc123",
  "patient_id": "xyz789",
  "datetime": "2025-06-01T14:30:00Z",
  "channels": ["sms", "email"]
}
```

**Response:**

```json
{
  "message": "Appointment scheduled successfully",
  "appointment_id": "apx001"
}
```

#### 3. `POST /appointments/:id/confirm`

**Purpose:** Patient or caregiver confirms an appointment
**Response:**

```json
{
  "message": "Appointment confirmed"
}
```

#### 4. `POST /appointments/:id/cancel`

**Purpose:** Patient or caregiver cancels an appointment
**Response:**

```json
{
  "message": "Appointment cancelled"
}
```

---

### 🔐 Environment Variables

* `PORT`: Server port (default: 3000)
* `TWILIO_API_KEY`: Key for Twilio SMS/WhatsApp services
* `FIREBASE_SERVER_KEY`: For push notifications
* `DATABASE_URL`: Supabase or other database connection URL

---

### 🔄 Payment Flow (Optional/Future)

* Not part of MVP
* Placeholder routes like `POST /payments/initiate` can be defined
* Would include tokenized card input, webhook for confirmation, etc.

---

### 📦 Key Dependencies & Scripts (from `package.json`)

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.5",
    "dotenv": "^16.1.4",
    "cors": "^2.8.5"
  },
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

---

### 🚀 Deployment & Usage

* **Local Development:**

  * Use Ngrok to expose port 3000 for callback testing: `ngrok http 3000`
  * Start with `npm run dev`

* **Production:**

  * Deploy to Firebase Functions, Railway, or fly.io
  * Ensure `.env` is configured securely and not committed

---

Let me know if you'd like a Swagger/OpenAPI spec next!
