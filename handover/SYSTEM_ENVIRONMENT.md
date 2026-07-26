# HerAI Fellowship — System Environment & Credentials

**Last updated:** 27 Juli 2026

---

## Google Sheets (Database)

| Item | Value |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| Spreadsheet URL | `https://docs.google.com/spreadsheets/d/1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| Total sheets | 23 |
| Participant accounts | 187 |
| Peserta tahap 1 | 431 |

---

## Google Apps Script (Backend API)

| Item | Value |
|---|---|
| GAS Code | `gas/Code.gs` (2419 baris) |
| Deployment ID | `AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE` |
| Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| Deployment version | Versi 3 (26 Juli 2026 08:04) |
| Deploy as | Execute as Me, Anyone with link |
| Routes | 52 action routes via doPost |
| Auth | Token-based (12 jam participant, 4 jam retest) |

---

## GitHub

| Item | Value |
|---|---|
| Repository | `Faiz-abdurrachman/her-ai-production` |
| URL | `https://github.com/Faiz-abdurrachman/her-ai-production` |
| Branch | `main` |
| Last commit | `e58f99d` |

---

## Node.js Dev Server

| Item | Value |
|---|---|
| File | `server.js` (root) |
| Command | `node server.js` |
| URL | `http://127.0.0.1:3000` |
| Proxy | `POST /__gas` → GAS Web App URL |
| Port | 3000 |

---

## Admin Login

| Item | Value |
|---|---|
| Username | `super-admin` |
| Password | `admin123` |
| Role | superadmin |

---

## Go Services (Prototype — BELUM Production)

| Service | Port | Status |
|---|---|---|
| Signaling (WebRTC) | 8080 | Prototype |
| Messaging (Chat) | 8091 | Prototype |
| Participant Portal | ? | Prototype |

---

## External APIs / Services

| Service | Usage | Status |
|---|---|---|
| Groq AI | AI screening analysis | Configured in sheet `data` B1 |
| LiveKit | Meeting/video | Not configured |
| Font Awesome | Icons | CDN |
| Pyodide | Python runtime | CDN (v0.24.1) |
| UI Avatars | Avatar generation | `ui-avatars.com` API |

---

## Frontend (SPA)

| Item | Value |
|---|---|
| Framework | Vanilla JS hash-router |
| Router | `js/router.js` |
| Entry | `index.html` |
| Auth transport | `js/main.js` (token auto-inject) |
| Session storage | `sessionStorage.heraiParticipantSession` |

---

## Key Routes

| Route | Page |
|---|---|
| `#/home` | Landing |
| `#/register` | Pendaftaran |
| `#/participant-login` | Login peserta |
| `#/participant-dashboard` | Dashboard |
| `#/participant-modules` | Katalog modul |
| `#/participant-settings` | Pengaturan |
| `#/participant-ai-deep-learning` | Deep Learning |
| `#/participant-ai-*` | 50+ modul AI |
| `#/dashboard` | Admin dashboard |
| `#/competency-test` | Tes kompetensi |
| `#/meeting` | Meeting room |

---

## Environment Variables (server.js)

```bash
GAS_WEB_APP_URL=https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec
```

Optional (not currently used):
```bash
LIVEKIT_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
```

---

## Files NOT to touch

| File/Dir | Reason |
|---|---|
| `gas/Code.gs` | Kecuali bug fix (verified 47/47) |
| `js/main.js` | Auth transport |
| `js/router.js` | Kecuali tambah route |
| `signaling/` | Go prototype |
| `messaging/` | Go prototype |
| `participant-portal/` | Go prototype |
| `pages/dashboard/` | Admin dashboard |
| `231 lesson files` | Hardcoded sidebar |

---

## How to run locally

```bash
cd /home/faiz/her6/Her-AI
node server.js
# Open http://127.0.0.1:3000
```
