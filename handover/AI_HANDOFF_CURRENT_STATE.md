# AI Handoff — HerAI Fellowship SuperApp

**Checkpoint:** 27 Juli 2026 (Sesi Sisyphus — Sesi ke-2), Asia/Jakarta
**Workspace:** `/home/faiz/her6/Her-AI`
**Branch:** `main`
**Last Commit:** `d82ebc7` — feat: rewrite ai-python.js GUIDES with proper Python-for-AI content
**Total commits:** 45 (25 original + 7 sesi lalu + 9 sesi sebelumnya + 4 sesi ini)
**GAS Deployment:** ✅ Sudah redeploy — score normalization + quiz_total schema active
**Worktree:** BERSIH (hanya untracked: `scratch/`, `scripts/test-settings.js`, `nazril/`)
**Playwright:** 17 tests, 15 stable, 2 flaky (practice + password timing)

> **Ini adalah sumber kebenaran tunggal.** Dokumen handover lain yang bertentangan diabaikan.

---

## ⚡ IDENTITAS SISTEM

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| GAS Code | `gas/Code.gs` (2438 baris, 52 routes, 23 sheets) |
| SPA | Vanilla JS hash-router, Node.js proxy (`node server.js` → `http://127.0.0.1:3000`) |
| Proxy | POST `/__gas` (token auto-injected oleh `js/main.js`) |
| Participant accounts | 187 akun di `ParticipantAccounts`, 431 di `peserta_tahap_1` |
| Test participant | NIK: `8204086711010003` / Password: `brenda123` |
| WA env | `GAS_WEB_APP_URL` di `.env` |

---

## 📊 STATUS FITUR — SEMUA SUDAH SELESAI

| Fitur | Status |
|---|---|
| Login peserta | ✅ 3 jalur verifikasi |
| Nama dinamis dashboard | ✅ "Halo, [Nama]!" |
| Ganti password mandiri | ✅ old/new → hash → sync 2 sheet |
| Settings save profil | ✅ form → GAS → session update |
| Chapter progress auto-save | ✅ 28 module wired |
| Quiz score wiring | ✅ 28 module + ai-intro |
| Practice/latihan wiring | ✅ 28 module |
| Dashboard skeleton/error/fade-in | ✅ Shimmer + retry + cache |
| Dashboard modules/journey/events/tracks | ✅ Dari GAS seed (idempotent) |
| Leaderboard | ✅ Masked, upsertByKey |
| Dashboard score display | ✅ Quiz badge persentase, pill pink |
| Score normalization (#55) | ✅ quiz_total column, GAS compute % |
| math-for-ai in seed | ✅ Card muncul, redirect under-dev |
| Restricted access | ✅ Hanya Beranda/Modul/Pengaturan |
| **Bug #57: Python contamination** | ✅ **24 module JS — konten module-specific dari Nazril MD** |
| **Bug #58: "Topik 01/02" labels** | ✅ **Hide via CSS global** |
| **ai-python.js rewrite** | ✅ **8 GUIDES konten Python proper** |

---

## 🚫 HARD BLOCK — JANGAN DISENTUH

- **Signaling (Go WebRTC), Messaging/Chat (Go), Participant Portal (Go)**
- **Admin dashboard (production)** — `pages/dashboard/`, `js/dashboard/`
- **Keamanan/Security hardening** — jangan ubah auth flow tanpa approval
- **Leaderboard, Certificates, Tasks, Projects, Events, Community, Mentor**
- **`provisionParticipantAccounts` / `generateParticipantAccounts*`** — AKAN RESET 187 AKUN
- **`forceReset:true`** — AKAN RESET DATA
- **231 file lesson HTML/JS** — jangan edit satu-satu, pakai CSS/JS injection
- **`js/main.js`, `js/router.js`** — kecuali tambah route/handler baru (TANYA DULU)
- **`ai-python-basic.js`** — INTENTIONAL SKIP, conflict namespace dengan `ai-python.js`
- **`ai-cv.js`** — tidak ada quiz/practice (SKIP dari wiring)
- **Module bersih (5)**: ai-cv.js, ai-math-for-ai.js, ai-ml-basic.js, ai-python-basic.js, ai-reasoning.js

---

## ✅ BOLEH DISENTUH

| File | Fungsi |
|---|---|
| `js/frontend/fellow-dashboard/ai-*.js` | 24 module yang sudah di-inject (GUIDES dari Nazril) |
| `js/frontend/fellow-dashboard/ai-python.js` | Sudah rewrite konten Python proper |
| `js/frontend/fellow-dashboard/settings.js` | Logic dashboard, settings, password, cache |
| `pages/frontend/fellow-dashboard/dashboard.html` | UI dashboard |
| `css/frontend/fellow-dashboard/dashboard.css` | Skeleton, shimmer, error, quiz badge, topic-label |
| `css/frontend/fellow-dashboard/settings.css` | Styling settings |
| `gas/Code.gs` | **HANYA bug fix** |
| `index.html` | **HANYA cache buster** |
| `e2e/*.spec.js` | Playwright test suite |
| `gemini.md`, `handover/` | Dokumentasi |
| `scripts/extract-nazril-guides.js` | Reusable — parse Nazril MD → GUIDES JSON |
| `scripts/inject-guides.js` | Reusable — inject GUIDES ke ai-*.js |
| `scripts/nazril-guides-output/` | 20 GUIDES JSON dari Nazril MD |

---

## 🔴 APA YANG SUDAH DIKERJAKAN SESI INI (4 commit)

### Commit 1: `b0ae9bb` — Fase 0: Extraction + Injector Scripts
- `scripts/extract-nazril-guides.js` (566 baris): dual-format MD parser
  - Format template (`## Gambaran Sederhana`, `## Konsep Inti`) → business/data-eng modules
  - Format naratif (`## N.N Title`) → foundation/gen-ai modules
  - 20 Nazril MD files → 20 GUIDES JSON files
  - Mapping: Tujuan Bab→hook, Konsep Inti→glossary, Langkah Kerja→flow, dll
- `scripts/inject-guides.js` (180 baris): GUIDES + roadmap header injector
  - Phase-based injection (--phase=1/2/3/4)
  - Dry-run mode (--dry-run)
  - Auto node --check after each injection
- `scripts/nazril-guides-output/`: 20 module GUIDES JSONs + roadmap headers

### Commit 2: `9a9c428` — Fase 1-4: 24 Module JS Injections
- **Fase 1**: 7 Business (ui-ux, healthcare, geospatial, manufacturing, culture, business-insight, people-business-mgt)
- **Fase 2**: 7 Data Eng (deployment, back-end, bioinformatics, data-engineering, data-science, front-end, infrastructure)
- **Fase 3**: 6 Foundation/Gen AI (deep-learning, reinforcement-learning, agentic-ai, large-language-model, multimodal-llm, vlm)
- **Fase 4**: 4 Placeholder (evaluation, evolution, modern, python — saat itu placeholder)
- Roadmap header: `<span>Jalur Pemula</span>` → `<span>Design Thinking</span>`, `<span>Deep Learning</span>`, dll
- Verification: node --check 24/24 PASS, 0 "Jalur Pemula", 0 "Python adalah penghubung"

### Commit 3: `448f46e` — Hide "Topik 01/02" Badges
- 313 chapter HTML files punya inline `<div class="topic-label">Topik 01</div>`
- Fix: 1 baris CSS di dashboard.css — `.topic-label { display: none !important; }`
- Tidak edit 313 file satu-satu
- Cache buster: `dashboard.css?v=20260727-topic-label`

### Commit 4: `d82ebc7` — ai-python.js Rewrite
- 8 GUIDES entries ditulis ulang dari placeholder ke konten Python spesifik:
  1. Python & AI Mindset — venv, reproducibility, computational thinking
  2. Data Dasar — list/tuple/set/dict use cases
  3. Control Flow — guard clause, defensive programming
  4. Function — pure function, type hints, testing
  5. OOP untuk AI — Dataset/Model classes
  6. Error & File — exception handling, CSV/JSON I/O
  7. NumPy — vectorization, broadcasting
  8. Mini Workflow — pipeline: load→clean→analyze→visualize
- Guides JSON also saved to scripts/nazril-guides-output/guides-python.json

---

## ⚠️ TEMUAN KRITIS

1. **participantPortalOpen di Settings**: HARUS lowercase "true" (boolean), string "TRUE" gagal
2. **Login form IDs**: NIK=`#profileNik`, Password=`#profilePassword`, Form=`#participantLoginForm`
3. **Fresh browser localStorage kosong**: `getGlobalSettings()` sync return default `participantPortalOpen:false`
4. **Playwright navigation**: pakai `page.evaluate(() => window.location.hash = ...)`, JANGAN `page.goto()`
5. **Score normalization done**: semua quiz_score persentase (0-100%), `formatQuizBadge()` selalu `X%`
6. **Module chapter auto-resume**: BY DESIGN — simpan chapter terakhir di localStorage
7. **GAS perlu redeploy** setiap edit Code.gs
8. **ai-python-basic.js**: INTENTIONAL SKIP — namespace collision dengan ai-python.js
9. **ai-modern.js**: struktur berbeda (BEGINNER_GUIDES, bukan PYTHON_GUIDES) — eyebrow: "Jalur Pemula" sudah diganti ke "AI Modern"
10. **231 chapter HTML files**: punya inline topic-label — sudah di-handle via CSS global

---

## 🔑 DATA FLOW

```
CHAPTER: saveChapterProgress(id, ch, 'completed') → participant_progress
QUIZ: saveChapterProgress(id, 'quiz', 'completed', score) → participant_progress (Math.max)
PRACTICE: saveChapterProgress(id, 'practice', 'completed') → participant_progress
LOGIN: participantLogin(nik, pw) → 3 jalur verifikasi → token 12 jam
PASSWORD: changeParticipantPassword(old, new) → hash → sync 2 sheet
DASHBOARD: initParticipantDashboardData() → skeleton → fetch → render/cache + score badge
SESSION: sessionStorage.heraiParticipantSession
SETTINGS: localStorage.heraiGlobalSettings → participantPortalOpen boolean
```

---

## 📐 NEXT PLAN — FOKUS SESI BERIKUTNYA

### 🔴 PRIORITAS #1 — E2E Test Suite (SUDAH DIPLAN, BELUM DIIMPLEMENTASI)

**3 file test, ~53 total tests:**

#### A. `e2e/participant-backend.spec.js` — Backend API (NEW, ~20 tests)
Test via `fetch(POST /__gas)` langsung, tanpa browser:
- Login valid/invalid/expired/password salah
- Token TTL & validation
- saveParticipantProgress (chapter, quiz, practice)
- getParticipantProgress (verifikasi data tersimpan)
- getParticipantDashboardData (modules, quiz_score persentase)
- changeParticipantPassword (valid, wrong old, empty → login ulang)
- Quiz score persistent (submit 3x → highest kept)

#### B. `e2e/fellow-dashboard.spec.js` — Frontend UI (Enhanced 17→25 tests)
Fix 2 flaky tests + tambah 8 test baru:
- Dashboard module cards render (min 5 cards)
- Dashboard quiz badge format X% (bukan /20)
- Dashboard skeleton loader muncul sebelum data
- Module overview — konten module-specific (tidak ada "Python" di healthcare)
- Module overview — 8 roadmap cards dengan judul CHAPTERS
- Module overview — GUIDES hook question relevan
- Topik label tidak muncul (.topic-label hidden)
- Logout → sessionStorage cleared

#### C. `e2e/participant-workflow.spec.js` — Full Flow (NEW, ~8 tests)
End-to-end user journey:
- Login → Dashboard → Module → Quiz submit → Verify score di dashboard
- Chapter auto-save & resume
- Practice save flow (isi → save → cek localStorage + GAS)
- Password change full cycle (ganti → logout → login baru → ganti balik)
- Dashboard cache on nav back
- Multi-module progress tracking
- Quiz badge update after submit

#### Prioritas Eksekusi:
| P1 | `participant-backend.spec.js` | Backend critical — progress wajib benar |
| P2 | `fellow-dashboard.spec.js` | Fix flaky + tambah coverage |
| P3 | `participant-workflow.spec.js` | Full integration |

---

## 📞 DISKUSI YANG PERLU DIKONFIRMASI NEXT AI

1. **E2E tests**: Mulai dari P1 (backend API) dulu, lalu P2, lalu P3? Atau semua sekaligus?
2. **Flaky tests**: Practice + password timing — perbaiki di P2 atau biarkan dulu?
3. **ai-python.js**: Konten sudah ditulis ulang — perlu direview user atau langsung OK?
4. **Nazril MD content quality**: Business module MD punya konten agak generik (Konsep Inti deskripsi boilerplate "konsep penting dalam..."). Foundation/gen-ai MD jauh lebih kaya. Perlu revisit business MD content?
5. **Module bersih (5)**: ai-cv, math-for-ai, ml-basic, python-basic, reasoning — ada rencana update atau biarkan?

---

## 📊 COMMIT HISTORY SESI INI

```
d82ebc7 feat: rewrite ai-python.js GUIDES with proper Python-for-AI content
448f46e fix: hide 'Topik 01/02/03' pill badges from chapter content
c13c243 Revert "fix: remove 'Topik N:' prefix from roadmap card labels"
a26286a fix: remove 'Topik N:' prefix from roadmap card labels (REVERTED)
9a9c428 fix: Fase 1-4 — Replace Python GUIDES with module-specific content
b0ae9bb feat: Fase 0 — Nazril MD extraction + GUIDES injector scripts
```

---

## 🔧 TOOLS & SCRIPTS (UNTUK NEXT AI)

```bash
# Extract Nazril MD → GUIDES JSON
node scripts/extract-nazril-guides.js

# Inject GUIDES ke ai-*.js
node scripts/inject-guides.js --phase=1    # Business (7 module)
node scripts/inject-guides.js --phase=2    # Data Eng (7 module)
node scripts/inject-guides.js --phase=3    # Foundation/Gen AI (6 module)
node scripts/inject-guides.js --phase=4    # Placeholder (4 module)
node scripts/inject-guides.js --phase=all  # Semua

# Dry-run (preview tanpa edit)
node scripts/inject-guides.js --phase=1 --dry-run

# Playwright tests
TEST_PARTICIPANT_NIK="8204086711010003" TEST_PARTICIPANT_PASSWORD="brenda123" npx playwright test

# Server lokal
node server.js  # → http://127.0.0.1:3000

# Syntax check semua module
for f in js/frontend/fellow-dashboard/ai-*.js; do node --check "$f" && echo "✅ $f" || echo "❌ $f"; done
```
