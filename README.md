# HerAI Fellowship SuperApp

Control panel, participant portal, learning dashboard, assessment tools, messaging prototype, and meeting infrastructure for HerAI Fellowship.

## Current Scope

This repository is the development workspace for the HerAI Fellowship web app. It contains:

- Public SPA pages for registration, announcement, participant login, profile, competency test, re-test, projects, and meetings.
- Admin dashboard for selection workflow, AI pre-screening, scoring, announcements, global settings, learning content, re-test, and meeting room controls.
- Participant dashboard with modules, AI Fundamentals learning pages, profile dropdown, masked leaderboard, dynamic dashboard data, and under-development placeholders.
- Google Apps Script backend contract in `gas/Code.gs`.
- Node gateway in `server.js` for local proxying, GAS access, and static SPA serving.
- Go services for messaging/signaling/participant-portal experiments.
- QA smoke automation and documentation for handover, GAS contracts, and security hardening.

## Repository Map

```text
.
├── index.html                         # SPA shell and route registry
├── server.js                          # Local Node gateway/static server
├── gas/Code.gs                        # Google Apps Script backend
├── pages/
│   ├── dashboard/                     # Admin dashboard pages
│   └── frontend/                      # Public, participant, meeting, and learning pages
├── js/
│   ├── dashboard/                     # Admin-side scripts
│   └── frontend/                      # Public/participant-side scripts
├── css/frontend/                      # Frontend and participant dashboard styling
├── assets/branding/                   # HerAI logo and participant portal visual assets
├── participant-portal/                # Go service for participant portal settings
├── messaging/                         # Go messaging prototype
├── signaling/                         # Go meeting signaling service
├── docs/                              # Handover, GAS/API contracts, security notes
├── scripts/qa-smoke.mjs               # Smoke QA automation
└── reports/                           # Latest QA output
```

## Main Features

### Admin Dashboard

- Stage control for fellowship workflow.
- Registration database, anti-duplicate checks, and participant profile popups.
- AI pre-screening and leaderboard selection workflow.
- Stage 1, Stage 2 competency test, and re-test monitoring.
- Manual decision controls for selection results.
- Announcement configuration and countdown behavior.
- Global settings for registration, announcement, competency test, participant login, and participant dashboard pages.
- Learning content management foundation for modules, submodules, lessons, exercises, quizzes, discussion, and publish toggles.
- Audit trail, RBAC from `dashboard_admin`, asset/link management, bootcamp/final project/certificate placeholders.
- Meeting room control and server monitor.

### Participant Portal

- Participant login page using NIK and password.
- Participant dashboard at `#/participant-dashboard`.
- Sidebar with persistent expand/minimize behavior.
- Topbar profile dropdown with account settings and logout.
- Dashboard sections for learning progress, fellowship journey, upcoming events, activity trail, masked leaderboard, and specialization tracks.
- Under-development page for unfinished features without public navbar/footer.
- Modules catalog at `#/participant-modules`.
- AI Fundamentals page at `#/participant-ai-fundamentals`.
- Intro AI learning flow with separate material, exercise, quiz, and discussion pages.

### Assessment

- Stage 2 competency test flow.
- Re-test flow with NIK + unique access code.
- Admin pages for access generation, live monitoring, and visual result summaries.
- GAS-backed sheets for attempts, answers, weighted scoring, access codes, and logs.

### Communication And Meeting

- Messaging prototype with friend/group concepts, attachment preview, emoji, and call UI foundation.
- Meeting experience with room code, preview camera/mic, chat, participant list, raise hand, share screen controls, and LiveKit/SFU exploration.
- `signaling/` keeps the Gorilla WebSocket service for room signaling.

## Local Development

Run the SPA and Node gateway:

```bash
node server.js
```

Open:

```text
http://127.0.0.1:3000/
```

Common routes:

```text
http://127.0.0.1:3000/#/dashboard
http://127.0.0.1:3000/#/participant-login
http://127.0.0.1:3000/#/participant-dashboard
http://127.0.0.1:3000/#/participant-modules
http://127.0.0.1:3000/#/participant-ai-fundamentals
http://127.0.0.1:3000/#/meeting
```

Run signaling service if testing local WebRTC signaling:

```bash
cd signaling
go mod tidy
go run .
```

Default local signaling endpoint:

```text
ws://127.0.0.1:8080/ws
```

Run messaging prototype:

```bash
cd messaging
go mod tidy
go run .
```

## Environment Variables

Set these in local `.env` or deployment dashboard as needed:

```bash
GAS_WEB_APP_URL=https://script.google.com/macros/s/.../exec
LIVEKIT_URL=wss://your-livekit-cloud-url
LIVEKIT_API_KEY=your-livekit-api-key
LIVEKIT_API_SECRET=your-livekit-api-secret
```

Notes:

- Do not commit real secrets into the repository.
- `server.js` exposes `/__gas` as the local gateway to GAS when `GAS_WEB_APP_URL` is configured.
- If `GAS_WEB_APP_URL` is missing, dashboard/API calls through `/__gas` will fail with configuration errors.

## Google Apps Script Backend

Backend source lives in:

```text
gas/Code.gs
```

Recommended flow:

1. Open the target Google Spreadsheet.
2. Go to `Extensions > Apps Script`.
3. Paste or update `gas/Code.gs`.
4. Deploy as Web App.
5. Put the Web App URL into `GAS_WEB_APP_URL`.

Important GAS documentation:

- `docs/gas-learning-content-contract.md`
- `docs/gas-participant-dashboard-contract.md`

The GAS layer currently covers registration, admin login/RBAC, AI screening result reads, selection status, competency and re-test data, settings, participant dashboard data, learning content scaffolding, audit trail, and utility setup functions.

## QA Automation

Smoke QA script:

```bash
node scripts/qa-smoke.mjs
```

Optional endpoint override:

```bash
QA_FRONTEND_URL=http://127.0.0.1:3000 \
QA_MESSAGING_URL=http://127.0.0.1:8091 \
QA_SIGNALING_URL=http://127.0.0.1:8080 \
GAS_WEB_APP_URL=https://script.google.com/macros/s/.../exec \
node scripts/qa-smoke.mjs
```

Latest outputs:

- `reports/qa-report-latest.md`
- `reports/qa-report-latest.json`

## Deployment Notes

### Frontend

The SPA can be deployed as a static site, but production should preserve hash routing and serve `index.html` for fallback routing.

### Render

`render.yaml` contains service definitions used during development. Ensure every required environment variable is configured in Render before redeploying.

### Meeting Services

For production meeting usage:

- Use `wss://`, not `ws://`.
- Avoid `127.0.0.1` in shared links.
- Host long-running WebSocket/SFU services on infrastructure that supports persistent connections.
- For LiveKit, keep API key/secret in backend environment variables only.

## Documentation

Developer-facing documents:

- `docs/DEVELOPER_HANDOVER_AND_ROADMAP.md`
- `docs/SECURITY_HARDENING_REPORT.md`
- `docs/gas-learning-content-contract.md`
- `docs/gas-participant-dashboard-contract.md`

## Development Hygiene

- Keep local runtime files out of commits.
- Do not commit `.env`, secrets, spreadsheet credentials, or PATs.
- Update `gas/Code.gs` and the matching contract docs together when API actions change.
- Keep participant dashboard pages under `pages/frontend/fellow-dashboard/`.
- Keep participant dashboard scripts under `js/frontend/fellow-dashboard/`.
- Prefer backend/GAS actions for data-sensitive logic; browser JS should remain UI-oriented.
