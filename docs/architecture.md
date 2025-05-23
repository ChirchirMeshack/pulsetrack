# 🏠 PulseTrack Architecture (Next.js + Supabase + Twilio + Firebase + Node.js)

## 📁 File & Folder Structure

```bash
pulsetrack/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                     # 🌐 Landing page
│   ├── dashboard/
│   │   ├── page.tsx                 # 👨‍⚕️ Doctor main dashboard
│   │   ├── appointments.tsx
│   │   ├── analytics.tsx
│   │   ├── messages.tsx
│   │   └── schedule.tsx             # Doctor schedules follow-ups
│   ├── patient/
│   │   ├── page.tsx
│   │   ├── appointments.tsx
│   │   ├── reminders.tsx
│   │   ├── chat.tsx
│   │   └── family.tsx               # 💪 Family/caregiver view
│   └── admin/                       # 🛠️ Admin dashboard
│       ├── page.tsx                 # Admin homepage
│       ├── users.tsx                # Manage patients/doctors
│       ├── metrics.tsx              # System-wide stats
│       ├── messages.tsx             # Review outbound/inbound messages
├── components/
│   ├── layout/
│   ├── charts/
│   ├── calendar/
│   ├── messaging/
│   ├── family/                      # Caregiver UI components
├── lib/
│   ├── supabase.ts
│   ├── twilio.ts
│   ├── firebase.ts
├── context/
│   ├── AuthContext.tsx
│   ├── NotificationContext.tsx
├── hooks/
│   ├── useAppointments.ts
│   ├── useNotifications.ts
│   ├── useCaregiver.ts              # Link dependents and caregivers
├── services/
│   ├── reminderService.ts
│   ├── analyticsService.ts
│   ├── messageService.ts
│   ├── scheduleService.ts           # Logic for doctor scheduling
│   └── appointmentService.ts        # 🚀 Connects to Node.js backend API
├── api/                             # 🧐 Minimal Node.js API service
│   ├── index.js
│   ├── routes/
│   └── controllers/
├── middleware.ts
├── types/
│   ├── index.ts
├── public/
├── styles/
│   ├── globals.css
├── .env.local
├── next.config.js
└── tailwind.config.js
```

---

## ⚙️ Updated Features Overview

### 🌟 Core Features

#### ✅ **Automated Follow-Up Reminders**

* Via SMS, WhatsApp, Email, or In-App
* Customizable timing: 3 days / 1 day / 1 hour before
* Caregivers can receive reminders for their dependents

#### ✅ **Smart Scheduling (No EHR)**

* Syncs with clinic calendars (Google, Outlook)
* **Doctors can schedule follow-ups** from their dashboard

#### ✅ **Bi-Directional Notifications**

* Patients/caregivers confirm/reschedule via messaging
* Doctors receive real-time updates on appointment status

#### ✅ **Multilingual Support**

* Auto-detect and personalize per patient

#### ✅ **Engagement Analytics**

* Doctor & Admin dashboards show:

  * Adherence trends
  * Missed appointments
  * Communication responsiveness

#### ✅ **Family Access**

* Patients can add caregivers
* Caregivers can view/manage reminders
* Caregiver identity is role-based in Supabase

#### ✅ **Admin Dashboard**

* Monitor usage and message delivery stats
* Manage user accounts (patients, doctors)
* Control system-wide configurations

#### ✅ **Landing Page**

* Highlights features, HIPAA compliance, multi-channel reminders
* CTA for clinics/doctors to sign up

#### ✅ **HIPAA-Compliant Data**

* End-to-end encryption
* Supabase RLS + role-based access
* No PHI on client logs

---

## 🧠 Updated State Management

| State           | Method                                 | Consumers                     |
| --------------- | -------------------------------------- | ----------------------------- |
| Auth            | Supabase + `AuthContext`               | All                           |
| Appointments    | Supabase tables + Node API             | Doctors, Patients, Caregivers |
| Reminders       | Supabase + Twilio                      | Patients, Caregivers          |
| Notifications   | Firebase Cloud Messaging               | All                           |
| Messages        | Supabase or Twilio                     | Doctors, Patients             |
| Caregiver Links | Supabase relational tables             | Patients, Caregivers          |
| UI State        | Local/React Context                    | Components                    |
| Admin Metrics   | Supabase views or materialized queries | Admin dashboard               |

---

## 🔌 Service Connections

| Service                     | Role                                             | How It Connects                           |
| --------------------------- | ------------------------------------------------ | ----------------------------------------- |
| **Supabase**                | DB, Auth, Real-time Messaging, Role-based Access | `lib/supabase.ts`                         |
| **Twilio**                  | SMS + WhatsApp                                   | `reminderService.ts`                      |
| **Firebase**                | In-App push notifications                        | `NotificationContext`                     |
| **Node API**                | Backend appointment + messaging API              | Connect via Axios from frontend           |
| **Google/Outlook Calendar** | Calendar sync                                    | `calendar` component, optional OAuth      |
| **i18n**                    | Language detection                               | `next-i18next` or browser logic           |
| **Family Access Logic**     | Link caregiver ↔ dependent                       | `useCaregiver.ts` + Supabase foreign keys |

---

## 🖼️ Example Use Case: Doctor Scheduling a Follow-Up

1. Doctor clicks "Schedule Follow-Up" in `/dashboard/schedule`
2. Selects date/time + communication method
3. `scheduleService.ts` stores it in Supabase and sends to Node.js API
4. Node API handles business logic, validation, response
5. Triggers reminder logic in `reminderService.ts`
6. Patient (and caregiver if linked) receive notification via:

   * Twilio (SMS/WhatsApp)
   * Firebase (push)
   * Email (SendGrid optional)
