# HerAI Fellowship — Backend Audit Report
**Date:** 26 July 2026
**Auditor:** AI Agent (Sisyphus)
**Branch:** `main`
**Last Commit:** `1877bb5`

---

## 1. Backend Stack

| Component | Technology | Status |
|---|---|---|
| **Primary Backend** | Google Apps Script (GAS) | ✅ Deployed (pending re-deploy confirmation) |
| **Node.js Gateway** | Express-like HTTP server (`server.js`) | ✅ Local dev only |
| **WebRTC Signaling** | Go + Gorilla WebSocket + Pion WebRTC (`signaling/main.go`) | 🔶 Prototype |
| **Messaging** | Go + Gorilla WebSocket + JSON file store (`messaging/main.go`) | 🔶 Prototype |
| **Participant Portal** | Go + JSON file store (`participant-portal/main.go`) | 🔶 Prototype |
| **Database** | Google Sheets (22 tabs) | ✅ Production |
| **Auth** | Password hash (SHA-256 + pepper) + JWT-style token (HMAC-SHA256) | ✅ |
| **AI Integration** | Groq API (external LLM for participant screening) | ✅ |
| **Deployment** | Render.com (3 services) | 🔶 Configured, not confirmed active |

### Architecture Diagram

```
Browser (SPA)
    │
    ├─► server.js (Node Gateway, local dev only)
    │       │
    │       ├─► /__gas ──► api/gas.js ──► GAS Web App (Google)
    │       ├─► /__settings ──► GAS (getSettings/saveSettings)
    │       ├─► /__debug ──► Local file writes
    │       ├─► /* ──► Static SPA files
    │       └─► /__local-gas ──► Local fallback (TEST_PARTICIPANT)
    │
    ├─► GAS Web App (production)
    │       └─► Google Sheets (22 tabs)
    │       └─► Groq API (AI screening)
    │
    ├─► signaling/main.go (WebRTC rooms, ws://)
    ├─► messaging/main.go (Chat, ws://)
    └─► participant-portal/main.go (Portal toggle, HTTP REST)
```

---

## 2. Backend Architecture

### 2.1 Google Apps Script (`gas/Code.gs` - 2071 lines)

**Entry Point:** `doPost(e)` (line 192)
**Action Router:** JSON payload with `action` field → 48 registered routes (lines 197-249)

**Authentication:**
- `login(payload)` — Admin login (plain password check, no token issuance)
- `participantLogin(payload)` — Participant login (hash validation + 12h token)
- `retestLogin(payload)` — Re-test login (access code + 4h token)
- `authorizeGasAction(action, payload)` — Route-level authorization (line 262)
- `requireParticipantToken(payload)` — Token validation (line 296)
- `issueAuthToken(type, subject, details, ttl)` — Token generation (HMAC-SHA256, line 304)
- `verifyAuthToken(token)` — Token verification (line 321)
- `getAuthTokenSecret()` — ScriptProperties-backed secret (line 335)

**Password Security:**
- `hashPasswordValue(password)` — SHA-256 + pepper + prefix (line 1181)
- `verifyPasswordValue(stored, password)` — Current + legacy hash validation (line 1191)
- `verifyPasswordValueCurrent(stored, password)` — Current hash only (line 1209)
- `migrateParticipantPasswordIfNeeded(participant, password)` — Auto-upgrade legacy → current (line 1244)
- `generateParticipantPassword(length)` — Random password generation (line 1093)
- Rate limiting: `enforceAttemptLimit(key, maxAttempts, ttlSeconds)` (line 1277)

**Database:** Google Sheets via `SpreadsheetApp`
- Spreadsheet ID: `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w`
- 22 sheet tabs (line 128-152)
- CRUD utilities: `getRows()`, `addRowObject()`, `updateByKey()`, `upsertByKey()`, `deleteByKey()`

### 2.2 Node.js Gateway (`server.js` - 1222 lines)

**Routes:**

| Path | Method | Handler | Purpose |
|---|---|---|---|
| `/__gas` | POST | `api/gas.js` | Proxy to GAS Web App |
| `/__settings` | GET/POST | Inline | GAS settings proxy |
| `/__debug` | POST | Inline | Debug log writer |
| `/*` | GET | Static | SPA file serving |
| `/` | GET | Static | index.html |

**Local Fallback (ENABLE_LOCAL_GAS_FALLBACK):**
- When enabled, `/__gas` falls back to local participant data (`TEST_PARTICIPANT`, line 28-71)
- Includes test competency questions, test password (`herai2026`)
- **WARNING:** Production MUST have this DISABLED

### 2.3 Go Services

**Signaling Service** (`signaling/main.go` - 1488 lines):
- WebSocket-based WebRTC signaling for meeting rooms
- Room management, ICE candidate relay, screen sharing
- `HERAI_ICE_SERVERS`, `LIVEKIT_URL/KEY/SECRET` env vars required
- Password-protected participant access (bcrypt)

**Messaging Service** (`messaging/main.go` - 1002 lines):
- WebSocket-based chat with E2E encryption (AES-GCM-256)
- User registration, friend system, room management
- JSON file persistence (`MESSAGING_DATA_FILE`)
- Schema defined in `schema.sql` (PostgreSQL — NOT in use, JSON file only)

**Participant Portal Service** (`participant-portal/main.go` - 210 lines):
- REST API for portal feature toggles
- `GET/POST /api/participant-portal/settings`
- Admin-key protected writes
- JSON file persistence

---

## 3. API Endpoint Audit

### GAS Actions (48 routes via `doPost`)

| # | Action | Method | Purpose | Backend | Frontend |
|---|---|---|---|---|---|
| 1 | `register` | POST | Participant registration | ✅ Complete | ⚠ Used in `profile.js` |
| 2 | `participantLogin` | POST | Participant login + token | ✅ Complete | ✅ `profile.js` |
| 3 | `updateParticipantProfile` | POST | Update name/email/WA/address/CV | ✅ Complete | ⚠ Partial UI |
| 4 | `provisionParticipantAccounts` | POST | Batch account generation | ✅ Complete | 🔴 Admin only (DO NOT RUN) |
| 5 | `getParticipantAccounts` | POST | List all participant accounts | ✅ Complete | 🔴 Admin only |
| 6 | `recordParticipantActivity` | POST | Activity logging | ✅ Complete | ⚠ Called from frontend |
| 7 | `getData` | POST | Get all participants | ✅ Complete | ⚠ Admin dashboard |
| 8 | `getPublicParticipantResult` | POST | Public result lookup | ✅ Complete | ⚠ Announcement page |
| 9 | `updateStatus` | POST | Update participant status | ✅ Complete | ⚠ Admin dashboard |
| 10 | `updateScore` | POST | Update participant score | ✅ Complete | ⚠ Admin dashboard |
| 11 | `runAiAnalysis` | POST | AI screening (Groq API) | ✅ Complete | ⚠ Admin dashboard |
| 12 | `login` | POST | Admin login | ✅ Complete | ✅ `dashboard.js` |
| 13 | `logActivity` | POST | Admin activity logging | ✅ Complete | ⚠ Admin dashboard |
| 14 | `getAuditData` | POST | Audit trail | ✅ Complete | 🔴 No UI |
| 15 | `getAdmins` | POST | List admins | ✅ Complete | ⚠ Admin dashboard |
| 16 | `addAdmin` | POST | Create admin | ✅ Complete | 🔴 No UI |
| 17 | `updateAdmin` | POST | Update admin | ✅ Complete | 🔴 No UI |
| 18 | `deleteAdmin` | POST | Delete admin | ✅ Complete | 🔴 No UI |
| 19 | `getSettings` | POST | Get global settings | ✅ Complete | ✅ Admin + `server.js` |
| 20 | `saveSettings` | POST | Save global settings | ✅ Complete | ✅ Admin dashboard |
| 21 | `getStages` | POST | List stages | ✅ Complete | ⚠ Admin |
| 22 | `saveStage` | POST | Save stage | ✅ Complete | 🔴 No UI |
| 23 | `getBootcampSessions` | POST | List bootcamp sessions | ✅ Complete | 🔴 No UI |
| 24 | `saveBootcampSession` | POST | Save bootcamp session | ✅ Complete | 🔴 No UI |
| 25 | `getCompetencyQuestions` | POST | Get competency questions | ✅ Complete | ✅ Competency test |
| 26 | `startCompetencySession` | POST | Start competency test | ✅ Complete | ✅ Competency test |
| 27 | `heartbeatCompetencySession` | POST | Session heartbeat | ✅ Complete | ✅ Competency test |
| 28 | `saveCompetencyAnswer` | POST | Save answer (alias) | ✅ Complete | ✅ Competency test |
| 29 | `submitCompetencyTest` | POST | Submit test | ✅ Complete | ✅ Competency test |
| 30 | `getCompetencySessions` | POST | List competency sessions | ✅ Complete | ⚠ Admin |
| 31 | `updateCompetencyDecision` | POST | Decision after test | ✅ Complete | ⚠ Admin |
| 32 | `getReTestAccess` | POST | List re-test access codes | ✅ Complete | ⚠ Admin |
| 33 | `generateReTestAccess` | POST | Generate re-test codes | ✅ Complete | ⚠ Admin |
| 34 | `deleteReTestAccess` | POST | Delete re-test access | ✅ Complete | 🔴 No UI |
| 35 | `retestLogin` | POST | Re-test participant login | ✅ Complete | ✅ Re-test page |
| 36-39 | `startReTestSession` etc. | POST | Re-test session management | ✅ Complete | ✅ Re-test page |
| 40 | `getFinalProjects` | POST | List final projects | ✅ Complete | 🔴 No UI |
| 41 | `submitFinalProject` | POST | Submit final project | ✅ Complete | 🔴 No UI |
| 42 | `saveFinalProject` | POST | Save final project | ✅ Complete | 🔴 No UI |
| 43 | `getCertificates` | POST | List certificates | ✅ Complete | 🔴 No UI |
| 44 | `generateCertificates` | POST | Generate certificates | ✅ Complete | 🔴 No UI |
| 45 | `getAssets` | POST | List assets | ✅ Complete | 🔴 No UI |
| 46 | `saveAsset` | POST | Save asset | ✅ Complete | 🔴 No UI |
| 47 | `getParticipantDashboardData` | POST | Participant dashboard data | ✅ Complete | ✅ `participant-dashboard` |
| 48 | `getParticipantAccountsForApi` | POST | Account list (API) | ✅ Complete | 🔴 No UI |

### Go Service Endpoints

| Service | Endpoint | Method | Purpose | Status |
|---|---|---|---|---|
| Signaling | `ws://host/ws` | WebSocket | WebRTC signaling | 🔶 Prototype |
| Signaling | `/healthz` | GET | Health check | ✅ |
| Messaging | `ws://host/ws` | WebSocket | Chat messaging | 🔶 Prototype |
| Messaging | `/api/register` | POST | User registration | 🔶 |
| Messaging | `/api/login` | POST | User login | 🔶 |
| Messaging | `/api/users/search` | GET | User search | 🔶 |
| Participant Portal | `/api/participant-portal/settings` | GET/POST | Portal toggles | 🔶 |
| Participant Portal | `/healthz` | GET | Health check | ✅ |

---

## 4. Database Audit

### Type: Google Sheets (spreadsheet-backed)

**22 tabs:**

| Sheet Tab | Purpose | Records | CRUD |
|---|---|---|---|
| `peserta_tahap_1` | Participant profiles | 431 | ✅ Full |
| `dashboard_admin` | Admin accounts | ? | ✅ Full |
| `AuditTrail` | Admin activity log | ? | ✅ Write, Read |
| `Settings` | Global key-value settings | ? | ✅ Full |
| `Stages` | Fellowship workflow stages | ? | ✅ Full |
| `BootcampSessions` | Bootcamp schedule | ? | ✅ Full |
| `Attendance` | Attendance tracking | ? | ✅ Full |
| `CompetencyQuestions` | Test question bank | ? | ✅ Read |
| `CompetencySessions` | Test sessions + answers | ? | ✅ Full |
| `ReTestAccess` | Re-test access codes | ? | ✅ Full |
| `ReTestSessions` | Re-test sessions | ? | ✅ Full |
| `ai-screening-result` | AI screening output | ? | ✅ Write, Read |
| `FinalProjects` | Final project submissions | ? | ✅ Full |
| `Certificates` | Certificate records | ? | ✅ Full |
| `Assets` | Asset management | ? | ✅ Full |
| `participant_dashboard_modules` | Dashboard module cards | ? | ✅ Read |
| `participant_dashboard_discussion_trails` | Activity feed | ? | ✅ Read |
| `participant_dashboard_tracks` | Specialization tracks | ? | ✅ Read |
| `participant_dashboard_journey` | Learning journey | ? | ✅ Read |
| `participant_dashboard_events` | Upcoming events | ? | ✅ Read |
| `participant_dashboard_leaderboard` | Leaderboard data | ? | ✅ Read |
| `ParticipantAccounts` | Login credentials (187 accounts) | 187 | ✅ Full |
| `ParticipantActivity` | Activity logging | ? | ✅ Write, Read |

---

## 5. Feature Audit

### ✅ Fully Implemented (Backend + Frontend)

| Feature | Backend | Frontend | Notes |
|---|---|---|---|
| **Participant Login** | `participantLogin` action | `profile.js` → `/__gas` | Hash validation, 12h token, session management |
| **Admin Login** | `login` action | `dashboard.js` | Plain password, no token |
| **Competency Test** | Full lifecycle | `competency-test.js` | Start, heartbeat, submit, scoring |
| **Re-test** | Full lifecycle | Re-test pages | Access code, session, submit |
| **Registration** | `register` action | Registration page | Anti-duplicate, validation |
| **Public Results** | `getPublicParticipantResult` | Announcement page | NIK-based lookup |
| **AI Screening** | Groq API integration | Admin dashboard | Auto-analysis of participant essays |

### 🟡 Partially Implemented

| Feature | Backend | Frontend | Gap |
|---|---|---|---|
| **Participant Dashboard** | `getParticipantDashboardData` returns data from 6 sheets | Dashboard JS renders correctly | Dashboard content is sheet-driven (not real-time), progress is NOT participant-personalized |
| **Profile Update** | `updateParticipantProfile` works | Settings page has UI but uses hardcoded "Aisyah Putri" data | Form not connected to backend |
| **Global Settings** | `getSettings/saveSettings` works | Admin settings page | Participant portal toggle works but other settings not exposed |
| **Leaderboard** | `participant_dashboard_leaderboard` sheet | Dashboard renders | Static data in sheet, not computed from actual activity |
| **Learning Progress** | No tracking endpoint | Dashboard shows 0% hardcoded | No progress calculation backend |
| **Quiz/Practice** | Module compiler generates HTML | Tab UI works | No answer submission or scoring backend |
| **Discussion** | No backend | Tab UI exists | No message storage or retrieval |

### 🔴 Frontend-Only / Mock / Not Connected

| Feature | Current State | What's Missing |
|---|---|---|
| **Participant Settings** | UI prototype with hardcoded "Aisyah Putri" data | Backend integration, form submission |
| **Password Change** | Function `setParticipantPassword` exists in GAS but NOT exposed in action map | Full self-service flow: old password, new password, confirm, token auth, sheet sync |
| **Notifications** | Bell icon with hardcoded "5" count | No notification system, no backend |
| **Chatroom** | Go WebSocket service exists | Not integrated with participant portal, no auth bridge |
| **Mentor Page** | Route → under-development | No backend |
| **Tasks** | Route → under-development | No backend |
| **Projects** | `submitFinalProject` GAS action exists | No frontend submission UI |
| **Events** | `participant_dashboard_events` sheet | Static data, no RSVP/registration |
| **Community** | Route → under-development | No backend |
| **Certificates** | GAS actions exist | No frontend UI |
| **Course Content** | Module compiler builds from Markdown | Quizzes/practice are client-side only, no score persistence |
| **Computer Vision Interactive** | Canvas + Pyodide demos work | No score/answer persistence |
| **Meeting/Video Call** | WebRTC signaling service exists | Not integrated into participant experience |

---

## 6. Hardcoded / Mock Data

### Critical Instances

| Location | Data | Impact |
|---|---|---|
| `server.js:28-71` | `TEST_PARTICIPANT` — full fake profile | Only used when `ENABLE_LOCAL_GAS_FALLBACK=true` |
| `server.js:73` | `TEST_PASSWORD = 'herai2026'` | Only local fallback |
| All lesson pages | `Aisyah Putri` as hardcoded participant name in sidebar | Cosmetic — shown in every lesson/learning page |
| Participant dashboard sidebar | `Aisyah Putri` name | Cosmetic |
| Notifications bell | Hardcoded `5` count | Should be dynamic |
| Dashboard progress | Hardcoded `0%` | No real progress tracking |
| `participant_dashboard_leaderboard` sheet | Static leaderboard entries | Not computed from actual participant activity |
| CV overview page | `0 dari 3 sub materi dimulai`, `0%` progress | Static |

---

## 7. Security Audit

### Strengths
- ✅ Participant passwords hashed with SHA-256 + unique pepper per spreadsheet
- ✅ JWT-style tokens with HMAC-SHA256, 12h TTL
- ✅ Legacy password migration path (auto-upgrade on login)
- ✅ Rate limiting on login attempts
- ✅ `setParticipantPassword` NOT exposed in action map (prevents self-service password creation)
- ✅ Go services have admin-key protected write endpoints
- ✅ E2E encrypted messaging (AES-GCM-256)

### Concerns
- 🔴 **Admin login has NO token** — `login(payload)` returns success with admin data, no token issued or validated server-side
- 🔴 **`getParticipantAccounts` returns `generated_password`** — sensitive field exposed via API
- 🟡 **`TARGET_PARTICIPANT_PORTAL_EMAILS`** — 100 emails hardcoded in source (lines 25-126 of Code.gs)
- 🟡 **No CSRF protection** on GAS endpoints
- 🟡 **No API rate limiting on non-login endpoints**
- 🟡 **GAS auth relies on "Execute as Me"** — all requests run as spreadsheet owner
- 🟡 **Go services use JSON file persistence** — no database, no backups
- 🟡 **`APP_ACCESS_PASSWORD` in plain text** in environment variables

---

## 8. Production Readiness

### Scoring

| Category | Score | Notes |
|---|---|---|
| Backend Completion | **65/100** | Core auth + CRUD works. Learning content, discussion, notifications missing. |
| API Completion | **60/100** | 48 GAS endpoints implemented but ~12 have no frontend integration. |
| Database Completion | **70/100** | 22 sheets, schema complete. No real learning progress tracking. |
| Authentication | **55/100** | Participant auth solid. Admin auth has no server-side token. No RBAC enforcement. |
| Production Readiness | **45/100** | Go services are prototypes. GAS works but needs re-deploy. No CI/CD. |

### Estimated Completion

| Area | % Complete |
|---|---|
| Backend code | 65% |
| API endpoints | 60% |
| Database schema | 70% |
| Authentication | 55% |
| Frontend-backend integration | 40% |
| **Overall** | **~55%** |

---

## 9. Prioritized Roadmap

### Immediate (Blocking Production)

1. **Re-deploy gas/Code.gs** — Senior must deploy latest version as New Version on existing deployment
2. **End-to-end login test** — Verify 1 real participant can login with credentials from `ParticipantAccounts`
3. **Remove hardcoded emails from Code.gs** — Move `TARGET_PARTICIPANT_PORTAL_EMAILS` to sheet or config
4. **Admin token auth** — Issue and validate tokens for admin sessions like participant tokens

### High Priority (Core Experience)

5. **Participant progress tracking** — Backend endpoint to save/retrieve per-participant module progress
6. **Quiz/practice scoring** — Submit answers to backend, persist scores
7. **Participant settings** — Connect settings UI to `updateParticipantProfile` endpoint
8. **Self-service password change** — Design and implement secure password change flow
9. **Notification system** — Backend-driven notification bell count
10. **Leaderboard compute** — Calculate rankings from actual participant data

### Medium Priority (Feature Completion)

11. **Discussion backend** — Message storage and retrieval per module
12. **Activate Math, ML, NLP routes** — Redirect from under-development to actual content
13. **Project submission UI** — Connect to existing `submitFinalProject` endpoint
14. **Certificate generation UI** — Connect to existing `generateCertificates` endpoint
15. **Integrate Go messaging with participant auth** — Bridge participant tokens to chat service
16. **Meeting integration** — Connect WebRTC signaling to participant meeting experience

### Low Priority (Polish)

17. **Admin audit UI** — Visualize `getAuditData` results
18. **Asset management UI** — Connect to `getAssets/saveAsset`
19. **Bootcamp management UI** — Connect to `getBootcampSessions`
20. **Sanitize `getParticipantAccounts`** — Strip `generated_password` from response

---

*End of Audit Report*
