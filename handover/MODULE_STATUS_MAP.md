# Module Status Map - HerAI Fellowship SuperApp

**Tanggal awal:** 17 Juli 2026  
**Checkpoint terbaru:** 19 Juli 2026
**Auditor:** Sisyphus AI Agent
**Legend terbaru:** Aktif | Foundation dinamis | Parsial | Tersedia tetapi diblokir | Prototype visual | Outline/Placeholder

---

> Status rinci di bawah adalah snapshot 17 Juli. Koreksi operasional 19 Juli
> ada di [`AI_HANDOFF_CURRENT_STATE.md`](AI_HANDOFF_CURRENT_STATE.md).
> Audit materi dan fitur yang lebih dalam ada di
> [`../reports/MATERIAL_AND_FEATURE_GAP_AUDIT_2026-07-19.md`](../reports/MATERIAL_AND_FEATURE_GAP_AUDIT_2026-07-19.md).
> Status “complete/production” pada AI Lab di snapshot ini hanya menunjukkan file
> materi tersedia; route peserta saat ini masih mengirim Math, ML, NLP, CV, dan
> course AI Lab lain ke `under-development.html`.

## 1. Public Pages

| Route | HTML File | CSS | Lines | Status |
|---|---|---|---|---|
| `#/home` | `home.html` | - | 508 | Foundation |
| `#/register` | `register.html` | `register.css` | 262 | Production |
| `#/participant-login` | `participant-login.html` | `profile.css` | 42 | Foundation |
| `#/profile` | `profile.html` | `profile.css` | 101 | Foundation |
| `#/announcement` | `announcement.html` | `announcement.css` | 65 | Foundation |
| `#/competency-test` | `competency-test.html` | - | 92 | Production |
| `#/retest` | `retest.html` | - | 92 | Production |
| `#/projects` | `projects.html` | `projects.css` | 99 | Foundation |
| `#/meeting` | `meeting.html` | - | 1228 | Foundation |
| `#/messaging` | `messaging.html` | `messaging.css` | 263 | Foundation |
| `#/messaging-closed` | `messaging-closed.html` | - | 15 | Production |
| `#/twibbon` | `twibbon.html` | `twibbon.css` | 107 | Foundation |
| `#/leaderboard` | `leaderboard.html` | `leaderboard.css` | 139 | Foundation |
| `#/graduation` | `graduation.html` | `graduation.css` | 80 | Stub |
| `#/wall-of-fame` | `wall-of-fame.html` | `wall-of-fame.css` | 102 | Stub |
| `#/faq` | `faq.html` | `faq.css` | 103 | Stub |
| `#/about-us` | `about-us.html` | `about-us.css` | 132 | Foundation |
| `#/curriculum` | `curriculum.html` | `curriculum.css` | 177 | Stub |
| `#/industry-applications` | `industry-applications.html` | `industry.css` | 79 | Stub |
| `#/fellow-dashboard` | `fellow-dashboard.html` | `fellow-dashboard.css` | 339 | Foundation |
| `#/participant-dashboard` | `participant-dashboard.html` | `participant-dashboard.css` | 200 | Stub |

---

## 2. Admin Dashboard Pages

| Route | HTML File | JS | Lines | Status |
|---|---|---|---|---|
| `#/dashboard` | `dashboard.html` | `dashboard.js` | 238 | Foundation |
| `#/skoring` | `skoring.html` | `skoring.js` | 169 | Foundation |
| `#/ai-prescreening` | `ai-prescreening.html` | `ai-prescreening.js` | 229 | Foundation |
| `#/anti-fraud` | `anti-fraud.html` | `admin-modules.js` | 184 | Foundation |
| `#/comm-engine` | `comm-engine.html` | `admin-modules.js` | 214 | Foundation |
| `#/competency-monitor` | `competency-monitor.html` | `competency-monitor.js` | 75 | Foundation |
| `#/retest-monitor` | `retest-monitor.html` | `retest-monitor.js` | 122 | Foundation |
| `#/data-visualization` | `data-visualization.html` | `data-visualization.js` | 89 | Stub |
| `#/stage-control` | `stage-control.html` | `admin-modules.js` | 104 | Foundation |
| `#/video-conference` | `video-conference.html` | `admin-modules.js` | 309 | Foundation |
| `#/global-settings` | `global-settings.html` | `admin-modules.js` | 302 | Foundation |
| `#/rbac` | `rbac.html` | `admin-modules.js` | 262 | Foundation |
| `#/learning-content` | `learning-content.html` | `admin-modules.js` | 258 | Foundation |
| `#/assets` | `assets.html` | `admin-modules.js` | 355 | Foundation |
| `#/bootcamp` | `bootcamp.html` | `admin-modules.js` | 33 | Stub |
| `#/final-project` | `final-project.html` | `admin-modules.js` | 30 | Stub |
| `#/certificates` | `certificates.html` | `admin-modules.js` | 30 | Stub |
| `#/audit-trail` | `audit-trail.html` | `audit-trail.js` | 158 | Foundation |

---

## 3. Participant Dashboard (Fellow Dashboard)

### 3.1 Core Pages

| Page | Files | Status |
|---|---|---|
| Dashboard | `dashboard.html` + CSS + JS | Foundation dinamis; GAS + fallback contoh |
| Modules | `modules.html` + CSS | Parsial; 26 course/6 track, 72 route diblokir |
| Profile | `profile.html` | Foundation |
| Chatroom | `chatroom.html` + CSS | Prototype visual; service Go ada di route lain |
| Community | `community.html` (403 lines) + CSS | Prototype visual |
| Events | `events.html` + CSS | Prototype visual |
| Tasks | `tasks.html` + CSS | Prototype visual |
| Projects | `projects.html` + CSS | Prototype visual |
| Certificates | `certificates.html` (433 lines) + CSS | Prototype visual |
| Leaderboard | `leaderboard.html` (420 lines) + CSS | Prototype visual |
| Mentor | `mentor.html` + CSS | Prototype visual |
| Help | `help.html` + CSS | Konten statis |
| Settings | `settings.html` + CSS | Prototype visual; account settings belum operasional |
| Under Development | `under-development.html` | Utility page aktif |

### 3.2 AI Learning Aktif — AI Fundamentals & Advanced

#### 01 Pengantar AI
Materi (409 baris) + Latihan + Kuis + Diskusi + Lesson (10 sub-topik)

#### 02 Python untuk AI
Materi + Latihan + Kuis + Diskusi + 15 chapter files + 8 topic files

#### 03 Konsep AI Modern
Materi + Latihan + Kuis + Diskusi + 4 chapter files

#### 04 Reasoning
Materi + Latihan + Kuis + Diskusi + 6 chapter files + practice/quiz/discussion source

#### 05 AI Evaluation
Materi + Latihan + Kuis + Diskusi + 6 chapters

#### 06 Evolution of AI
Materi + Latihan + Kuis + Diskusi + 7 chapters

Enam modul yang aktif:

- Pengantar AI.
- Python untuk AI.
- Konsep AI Modern.
- Reasoning AI.
- Evaluation AI.
- Evolution of AI.

Enam modul tersebut mempunyai materi substantif. Latihan/kuis/diskusi tersedia
sesuai modul, tetapi progress/gradebook server-side lintas perangkat belum lengkap.

### 3.3 Computer Vision — 11 Lesson Ada, Route Diblokir

| Lesson | HTML Lines | Status |
|---|---|---|
| pixel-anatomy | 1294 | Tersedia tetapi diblokir |
| cnn-intro | 637 | Tersedia tetapi diblokir |
| cnn-why | 810 | Tersedia tetapi diblokir |
| cnn-relu | 539 | Tersedia tetapi diblokir |
| cnn-fc | 508 | Tersedia tetapi diblokir |
| cnn-arch | 677 | Tersedia tetapi diblokir |
| cnn-hands | 488 | Tersedia tetapi diblokir |
| cnn-arch-builder | 436 | Tersedia tetapi diblokir |
| filtering-kernels | 1314 | Tersedia tetapi diblokir |
| morphological-transforms | 1295 | Tersedia tetapi diblokir |
| image-processing-opencv | 1607 | Tersedia tetapi diblokir |

Masih belum mencakup specialization final seperti detection, segmentation, ViT,
deployment, dan portfolio project.

### 3.4 NLP — 5 Lesson Ada, Route Diblokir

| Lesson | HTML Lines | Status |
|---|---|---|
| tokenization | 731 | Tersedia tetapi diblokir |
| preprocessing | 1171 | Tersedia tetapi diblokir |
| pos-ner | 908 | Tersedia tetapi diblokir; satu aksi Coming Soon |
| bow | 855 | Tersedia tetapi diblokir |
| tfidf | 824 | Tersedia tetapi diblokir |

Belum menjadi NLP/LLM track penuh: embedding modern, classification, sentiment,
transformer/BERT, RAG, fine-tuning, dan capstone belum final.

### 3.5 Machine Learning — Canonical + Legacy Ada, Route Diblokir

| Lesson | HTML Lines | Status |
|---|---|---|
| 8 chapter canonical | Dinamis | Tersedia tetapi diblokir |
| ml-intro | 594 | Legacy, diblokir |
| ml-hypothesis | 747 | Legacy, diblokir |
| ml-bias-variance | 736 | Legacy, diblokir |
| ml-vc-dim | 800 | Legacy, diblokir |
| ml-overview | 524 | Legacy, diblokir |

### 3.6 Math, Generative AI, Placeholder, dan Track

| Direktori | Status |
|---|---|
| Math for AI | Materi, latihan, kuis, diskusi ada; seluruh route diblokir |
| Generative AI | Parsial; overview + scaffold lima modul, route diblokir |
| Deep Learning | Outline/placeholder |
| Reinforcement Learning | Outline/placeholder |
| 18 course lainnya | Outline/placeholder |
| Enam specialization track | Scaffold, belum ada course final |

Total course placeholder final: **20**. Total specialization track scaffold: **6**.
Total route AI Lab/track yang menuju Under Development: **72**.

---

## 4. Backend Services

### 4.1 Google Apps Script
| Metrik | Value |
|---|---|
| Total baris | 2.071 |
| Sheets | 20+ |
| Actions | 40+ |
| Soal kompetensi | 115 (15 math + 50 logic + 50 psychology) |
| Password hashing | Production (`pw$1$`) |
| Participant accounts | 187 akun existing; jangan provision ulang |
| Login verification | Lulus regression test lokal; deploy latest belum dikonfirmasi |
| Password migration | Production |
| Dashboard data API | Production |
| **Status** | **Foundation-Production** |

### 4.2 Node Gateway (server.js)
| Metrik | Value |
|---|---|
| Baris | 1.195 |
| Endpoints | `/__gas`, `/__settings`, `/__debug`, static |
| Security headers | Production |
| Path blocking | Production |
| Fallback data | Opt-in via `HERAI_ENABLE_LOCAL_GAS_FALLBACK=true` |
| **Status** | **Production** |

### 4.3 Go Signaling (meeting)
| Metrik | Value |
|---|---|
| Baris | 1.488 |
| Endpoints | `/ws`, `/rooms`, `/meeting-config`, `/livekit-token`, `/healthz`, `/__gas`, `/__app-auth` |
| P2P | Production |
| LiveKit | Optional |
| Pion SFU | Experimental |
| **Status** | **Foundation-Production (P2P)** |

### 4.4 Go Messaging
| Metrik | Value |
|---|---|
| Baris | 1.002 |
| Endpoints | `/healthz`, `/api/config`, `/api/register/*`, `/api/login`, `/api/users`, `/api/friends`, `/api/rooms`, `/ws` |
| Auth | Production (Bearer + bcrypt) |
| CORS | Production (origin whitelist) |
| Persistence | Foundation (JSON - perlu PostgreSQL) |
| **Status** | **Foundation** |

### 4.5 Go Participant Portal
| Baris | Status |
|---|---|
| 210 | Foundation |

---

## 5. Google Apps Script - Action Catalog

Catatan: label `Production` pada katalog action berarti handler dan kontrak utama
tersedia di kode, bukan security approval. Action admin belum mempunyai
token/role enforcement server-side, dan deployment GAS latest belum dikonfirmasi.

| Action | Status |
|---|---|
| `register` | Production |
| `participantLogin` | Verified local; deployment latest perlu dikonfirmasi |
| `setParticipantPassword` | Function legacy first-set; tidak diekspos dan bukan ganti password |
| `updateParticipantProfile` | Production |
| `provisionParticipantAccounts` | Utility legacy; jangan dijalankan untuk 187 akun existing |
| `getParticipantAccounts` | Legacy/admin debt; dapat memuat password, jangan dump publik |
| `recordParticipantActivity` | Production |
| `getData` | Production |
| `updateStatus` | Production |
| `updateScore` | Production |
| `runAiAnalysis` | Production |
| `login` | Production |
| `logActivity` | Production |
| `getAuditData` | Production |
| `getAdmins` | Production |
| `addAdmin` / `updateAdmin` / `deleteAdmin` | Production |
| `getSettings` / `saveSettings` | Production |
| `getStages` / `saveStage` | Production |
| `getBootcampSessions` / `saveBootcampSession` | Foundation |
| `getCompetencyQuestions` | Production |
| `startCompetencySession` | Production |
| `heartbeatCompetencySession` | Production |
| `saveCompetencyAnswer` | Production |
| `submitCompetencyTest` | Production |
| `getCompetencySessions` | Production |
| `updateCompetencyDecision` | Production |
| `getReTestAccess` | Production |
| `generateReTestAccess` / `deleteReTestAccess` | Production |
| `retestLogin` | Production |
| `startReTestSession` | Production |
| `heartbeatReTestSession` | Production |
| `saveReTestAnswer` | Production |
| `submitReTest` | Production |
| `getReTestSessions` | Production |
| `getFinalProjects` / `submitFinalProject` / `saveFinalProject` | Foundation |
| `getCertificates` / `generateCertificates` | Foundation |
| `getAssets` / `saveAsset` | Foundation |
| `getParticipantDashboardData` | Production |

Fitur ganti password peserta belum mempunyai action operasional. Halaman
`#/participant-settings` juga belum mempunyai workflow keamanan akun aktif.

---

## 6. Total Codebase Size

| Area | Lines | Files |
|---|---|---|
| HTML (public) | ~4.225 | 21 |
| HTML (admin) | ~3.161 | 18 |
| HTML (participant) | ~33.596 | 131 |
| CSS | ~5.000+ | 33 |
| JS (frontend + fellow) | ~25.146 | 65 |
| JS (dashboard) | ~4.000+ | 7 |
| JS (core: router+main) | 1.324 | 2 |
| gas/Code.gs | 2.071 | 1 |
| server.js | 1.222 | 1 |
| Go (signaling + messaging + portal) | 2.700 | 3 |
| **TOTAL (estimated)** | **~82.000+** | **~282+** |
