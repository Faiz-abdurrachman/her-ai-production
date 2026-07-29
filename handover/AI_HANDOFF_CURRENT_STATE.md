# AI Handoff — HerAI Fellowship SuperApp

**Checkpoint: 29 Juli 2026 (Resolution audit #78–#91 + persistence audit #92 + UI #93 + dynamic tracking #94 + CV release lock #95), Asia/Jakarta**
**Workspace:** `/home/faiz/her6/Her-AI`
**Branch:** `main`
**Baseline Commit:** `6508121` - test: expand active module end-to-end audit (#87-#91)
**Feature Commit:** `a3ff0a9` - `fix: persist active module learning progress (#78-#91)`
**Latest Commit:** pending commit - `fix: lock Computer Vision release (#95)`
**Total commits:** 256 setelah commit #95
**GAS Deployment:** ⚠️ production masih `2026.2-progress-persistence`; source lokal `2026.3.1-cv-locked` wajib dimigrasi, redeploy, lalu live read-back
**Worktree:** BERSIH
**E2E Test Suite:** safe mock 84/84 PASS | full 95 PASS + 44 SKIP + 0 FAIL | authenticated live read-only terakhir 29 PASS + 18 SKIP pada GAS 2026.2 | controlled live write/read-back terakhir PASS
**Leaderboard:** ✅ sumber LIVE — authenticated read-back terakhir 1.039 pts; screenshot user sesudahnya menampilkan Brenda 1.054 pts (belum di-read-back ulang)

> **Ini sumber kebenaran tunggal.** Semua dokumen lain yang bertentangan diabaikan.

## CHECKPOINT RESOLUSI 29 JULI 2026

Audit Phase 0 sudah ditindaklanjuti. Source frontend, test contract, dan `gas/Code.gs` diperbaiki untuk materi, latihan, kuis, progress, ringkasan, serta diskusi lima module aktif. Controlled production mutation yang disetujui user juga sudah lulus untuk chapter, status practice, score quiz, post diskusi, dan reply.

Feature #94 menambahkan release contract dinamis untuk modul masa depan. Module UD tidak ikut dihitung sampai `is_active` dan `tracking_enabled` aktif; setelah route konten siap dan metadata diaktifkan, backend otomatis memasukkannya ke progress module, Ringkasan Belajar sesuai phase, serta Perjalanan Fellowship. Pengantar AI kini mencatat lima chapter materi nyata, bukan mengira progress dari urutan halaman.

Release lock #95 menutup kembali seluruh Computer Vision. Hanya enam module Foundation—Pengantar AI dan lima AI Fundamentals—yang dapat membuka konten; semua route CV menampilkan Under Development, loader CV tidak dijalankan, dan default backend tidak lagi mengaktifkan tracking CV.

### Cakupan yang sekarang bisa dilacak

| Gate | Cakupan |
|---|---|
| Manifest | Tepat 6 module Foundation: 5 module dashboard + Pengantar AI; Computer Vision terkunci |
| Frontend | Overview, practice, quiz, discussion, own-content, loader tunggal, Pengantar AI chapter 1–5 |
| Frontend → backend | Payload chapter/status practice/score quiz/diskusi, acknowledgment, retry, dan read-back memakai GAS mock; isi jawaban practice masih localStorage-only (#92) |
| Safety | Kredensial tidak disimpan di E2E; live mutation perlu opt-in; password punya opt-in kedua |
| UI/UX | 375/768/1280, overflow, touch target, keyboard focus, reduced motion, non-color status, journey locked text+icon |
| Artefak | HTML + JSON report, screenshot, trace dan video saat failure |

### Hasil gate dan status temuan

- Safe mock gate: **84/84 PASS**, tanpa expected failure dan tanpa live write.
- Full suite: **139 terdaftar = 95 PASS + 44 SKIP + 0 FAIL**.
- 44 skip adalah alur authenticated/live-mutation yang sengaja tidak dijalankan tanpa secret environment.
- #78, #79, #81–#85, dan #87–#91: **FIXED IN CODE**.
- Lima module: chapter numerik, practice, quiz, score, discussion post/reply, dan read-back terverifikasi pada kontrak deterministik.
- GAS aggregation diuji langsung dengan row duplicate + quiz + practice; hasil hanya menghitung chapter numerik unik.
- UI/UX: 375/768/1280 bebas overflow; Reasoning nav wrap; touch target minimum 44px; source integrity passed; pageerror cleanup selesai.
- Controlled live write/read-back: chapter Python #1, status practice Python, quiz Evaluation score existing, post diskusi tetap, dan reply semuanya tersimpan lalu terbaca kembali.
- Idempotent re-save tidak mengubah Ringkasan Belajar; leaderboard tetap **1.039 → 1.039**. Profile dan password tidak dimutasi.
- #92 **OPEN**: teks jawaban practice tetap hanya di localStorage; backend baru menyimpan marker `chapter_id='practice'` dengan status selesai.
- #93 **FIXED**: kelima topik Pengantar AI sekarang menandai tepat satu materi aktif dengan highlight, ikon play, dan `aria-current="page"`.
- #94 **FIXED IN CODE**: metadata release/tracking/visibility dinamis, agregasi phase, Pengantar AI save/read-back 1–5, cache invalidation, dan journey locked state. Production deployment/read-back masih pending.
- #95 **FIXED IN CODE**: sembilan route CV dan seluruh prefix turunannya terkunci ke Under Development, loader/progress CV tidak berjalan, dan default tracking CV dinonaktifkan. Frontend/GAS deployment masih pending.

### Pekerjaan operasional tersisa

| Item | Status | Tindakan |
|---|---|---|
| Migrasi + redeploy GAS #94/#95 | ⏳ PENDING | Save source terbaru, jalankan `seedDashboardModules()` + `seedDashboardJourney()`, deploy, lalu cek `doGet.version=2026.3.1-cv-locked` |
| Frontend release #94/#95 | ⏳ PENDING | Deploy setelah GAS 2026.3.1 dan schema berhasil diverifikasi; router `20260729-cv-locked` menutup CV di sisi peserta |
| Authenticated live read-back | ✅ DONE | Login, dashboard, progress, diskusi, auth guard: 29 PASS; 18 mutation scenarios sengaja skip |
| Controlled live mutation verification | ✅ DONE | 4 write sukses; 5 read-back cocok; summary dan leaderboard tidak berubah; tanpa profile/password mutation |
| Practice answer persistence (#92) | ⚠️ OPEN | Tentukan schema/API untuk isi jawaban, lalu implement save + authenticated read-back lintas perangkat |

**Read-back production:** baseline 94 row progress: 42 chapter numerik unik, 26 practice, 25 quiz. Controlled test melakukan re-save nilai existing pada tiga row progress dan membuat satu thread QA beserta satu reply. `learningSummary` tetap total 6, tuntas 1, dalam proses 4, belum dimulai 1, progress rata-rata 33%; leaderboard tetap 1.039 poin. Laporan rinci ada di `handover/E2E_AUDIT_2026-07-29.md`.

---

## IDENTITAS SISTEM

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| GAS Code | `gas/Code.gs` (termasuk `participant_discussions`, summary, dan aggregation fix) |
| SPA | Vanilla JS hash-router, Node proxy (`node server.js` → `http://127.0.0.1:3000`) |
| Proxy | POST `/__gas` (token auto-injected, Origin header WAJIB) |
| Test participant | Kredensial QA disuplai lewat environment variable; tidak disimpan di repo |
| Module JS files | 30 ai-*.js (24 standard + 5 berbeda + 1 interactive) |
| Cache buster | `settings.js`, `dashboard.css`, `modules.css`: `v=20260729-dynamic-tracking`; `router.js`: `v=20260729-cv-locked` |

---

## STATUS FITUR — LENGKAP

| Fitur | Status | Catatan |
|---|---|---|
| Login peserta | ✅ | 3 jalur verifikasi (hash + plain + account sync) |
| Nama dinamis dashboard | ✅ | "Halo, [Nama]!" dari session |
| Ganti password mandiri | ✅ | old→new→hash→sync 2 sheet, rate limit 8/10min |
| Settings save profil | ✅ | form→GAS→session update |
| Chapter progress auto-save | ✅ live | Write/read-back chapter numerik terverifikasi production |
| Dynamic module tracking (#94) | ✅ code / ⏳ deploy | Backend metadata-driven; aktivasi module baru otomatis masuk cards/summary/journey setelah schema + GAS 2026.3.1 live |
| Pengantar AI material tracking | ✅ code / ⏳ deploy | Lima route menyimpan chapter 1–5 dan read-back server; bukan progress berbasis posisi halaman |
| Quiz score wiring | ✅ live | Write/read-back score terverifikasi; gagal-save tetap retryable; denominator 20/26 benar |
| Practice/latihan wiring | ⚠️ partial live | Marker selesai terverifikasi production; isi jawaban masih localStorage-only (#92) |
| Dashboard skeleton/cache | ✅ | 3-tier: memory→sessionStorage(5min)→skeleton, 0.2s refresh |
| Dashboard modules filter | ✅ | Dashboard tepat 5 card; overview AI Fundamentals berisi Intro + 5 module |
| Dashboard quiz badge | ✅ | Persentase format (X%), pill pink, skeleton reveal |
| Pengantar AI current material (#93) | ✅ | Topik aktif sinkron dengan route; highlight + ikon play + `aria-current` |
| **Leaderboard LIVE** | ✅ | Compute dari `participant_progress`; 1.039 poin stabil pada controlled mutation |
| Score normalization (#55) | ✅ live | Evaluation/Evolution 20; Reasoning 26 |
| Restricted access (#54) | ✅ | Hanya Beranda/Modul/Pengaturan + under-development |
| Python contamination fix (#57) | ✅ | 24 module JS — konten module-specific, 0 kontaminasi |
| ai-python.js rewrite (#59) | ✅ | 8 GUIDES konten Python proper |
| Glossary enrichment (#63) | ✅ | 14 modules, 620+ definitions |
| Lazy loading (#64) | ✅ | `__aiLabLoader`, 28 route wrapped, 4.5MB→500KB, 90% reduction |
| P5: UX Polish (#65) | ✅ | 12 animations: accordion, quiz feedback, page enter, toast, button |
| Discussion persistence | ✅ live | Post/reply save + authenticated read-back terverifikasi production |
| Avatar/foto profil (#67) | ✅ | Upload→canvas resize 200×200→preview→"✓ Simpan"/"✗ Batal", base64 sheet |
| Module lockdown (#68, #74, #75) | ✅ | 20 module UD, dashboard shows only 5 AI Fundamentals |
| CV Interactive widgets (#73) | ✅ source / 🔒 release | Sandbox, flip/rotate, bitwise, Otsu, quiz, dan coding challenges tetap tersimpan untuk aktivasi nanti |
| CV release lock (#95) | ✅ code / ⏳ deploy | Overview, Digital Image, latihan, kuis, diskusi, dan seluruh direct child route menampilkan Under Development |

---

## COMMIT SESI INI (13 commits: #65-#77 + docs)

```
64dde11 docs: Update all handover — bugs #68-#77, transfer prompt, next plan
49bc9c2 fix: GAS — leaderboard is_active filter removed valid rows (#77)
a8a88bc fix: GAS — computeLiveLeaderboard scope error — activeRows not in scope (#76)
72e833b fix: Dashboard — hide under-development modules, show AI Fundamentals only (#75)
c2f6667 fix: Put all modules under-development except AI Fundamentals (#74)
899e5f4 feat: CV Digital Image — interactive widgets + quiz + coding challenges (#73)
a620734 fix: CV — CNN + Advanced CNN sub-modules → under-development (#72)
9a9761c fix: Computer Vision back online — route restore + ai-lab catch-all fix (#71)
5092a19 perf: Dashboard persistent cache — sessionStorage TTL 5min (#70)
f749ca7 feat: Live leaderboard — compute points from participant_progress (#69)
85772cd fix: Math/ML/CV overview → under-development, fix UD template blocked by restricted access (#68)
```

---

## 📊 MODULE STATUS — CURRENT RELEASE

### ✅ ONLINE (5 + AI Intro)
| Module | JS | Size | Route | Quiz | Practice |
|---|---|---|---|---|---|
| Pengantar AI | settings.js | — | `/participant-ai-intro` | ✅ | ✅ |
| Python untuk AI | ai-python.js | ~30KB | `/participant-ai-python` | 80 radios | 12 textareas |
| Reasoning AI | ai-reasoning.js | 170KB | `/participant-ai-reasoning` | 104 radios | 17 textareas |
| Konsep AI Modern | ai-modern.js | ~40KB | `/participant-ai-modern` | 20 soal + ack/retry ✅ | Save + ack/retry ✅ |
| Evaluation AI | ai-evaluation.js | ~141KB | `/participant-ai-evaluation` | 20 soal + pembahasan ✅ | 5 textareas |
| Evolution of AI | ai-evolution.js | ~143KB | `/participant-ai-evolution` | 20 soal + pembahasan ✅ | 7 textareas |

### 🔒 UNDER DEVELOPMENT — Computer Vision
| Sub-module | Status |
|---|---|
| CV Overview | 🔒 Under Development |
| Digital Image Fundamentals | 🔒 Under Development (source interactive tetap tersedia) |
| CNN | 🔒 Under Development |
| Advanced CNN Architectures | 🔒 Under Development |

### 🔒 UNDER DEVELOPMENT (20+ modules)
Computer Vision, Deep Learning, Reinforcement Learning, Machine Learning, Math for AI,
LLM, VLM, Multimodal LLM, Agentic AI,
Culture, Healthcare, UI/UX, Manufacturing, Business Insight, People Mgt,
Geospatial, Bioinformatics, Data Engineering, Data Science, Infrastructure,
Deployment, Front-end, Back-end

### Kontrak aktivasi #94

Sebelum membuka satu module UD, pastikan route materi/latihan/kuis/diskusi tidak lagi mengarah ke template Under Development. Pada row `participant_dashboard_modules`, isi `total_chapters` dan `quiz_total` yang benar, pilih `phase_id` (`foundation` atau `specialization`), lalu set `is_active=true` dan `tracking_enabled=true`. Set `dashboard_visible=true` hanya bila kartu module harus muncul di Beranda. Backend kemudian menghitung chapter numerik unik, progress module, summary phase, dan journey secara otomatis; practice/quiz tetap dicatat tetapi tidak menaikkan jumlah chapter.

---

## 🚫 HARD BLOCK — JANGAN DISENTUH

- **Go services**: Signaling (WebRTC), Messaging/Chat, Participant Portal
- **Admin dashboard (production)**: `pages/dashboard/`, `js/dashboard/`
- **Auth flow**: jangan ubah tanpa approval eksplisit
- **`provisionParticipantAccounts` / `generateParticipantAccounts*`**: AKAN RESET AKUN → 187 peserta
- **`forceReset:true`**: AKAN RESET SEMUA DATA
- **231 file lesson HTML/JS**: jangan edit satu-satu, pakai CSS/JS injection
- **`js/main.js`**: TANYA DULU sebelum edit
- **`js/router.js`**: SUDAH dimodifikasi lazy loading. Tambah route → TANYA DULU, pakai `__aiLabLoader`
- **`ai-python-basic.js`**: INTENTIONAL SKIP — namespace collision dengan `ai-python.js`
- **5 module struktur berbeda** (ai-cv.js, ai-math-for-ai.js, ai-ml-basic.js, ai-python-basic.js, ai-reasoning.js): TANYA DULU
- **`gas/Code.gs`**: HANYA bug fix atau feature diminta user. Redeploy SETIAP edit.
- **`ai-modern.js`**: BEGINNER_GUIDES structure (bukan PYTHON_GUIDES)

---

## ✅ BOLEH DISENTUH

| File | Fungsi | Catatan |
|---|---|---|
| `ai-*.js` (24 standard) | Module content, quiz, practice handlers | Kecuali 5 struktur berbeda |
| `ai-cv-interactive.js` | CV interactive widgets | 1,241 lines |
| `settings.js` | Dashboard logic, settings, password, cache, avatar, toast | Bump cache buster |
| `dashboard.html` | Dashboard UI | — |
| `dashboard.css` | Skeleton, shimmer, quiz badge, avatar, restricted state | — |
| `modules.css` | Roadmap, quiz, lesson styles, animations | — |
| `ai-lab-lesson.css` | AI lab content styling | — |
| `settings.css` | Settings page styling | — |
| `gas/Code.gs` | Backend | **HANYA bug fix/feature user**, redeploy required |
| `index.html` | Entry point | **HANYA cache buster** |
| `e2e/*.spec.js` | Playwright test suite | — |
| `gemini.md` | Bug log + session rules | Update tiap fitur |
| `handover/` | Documentation | Update tiap fitur |

---

## ⚠️ TEMUAN KRITIS — WAJIB BACA SEBELUM EDIT

### Auth & Login
1. **participantPortalOpen**: HARUS lowercase `"true"` (JSON boolean), string `"TRUE"` gagal
2. **Login form IDs**: `#profileNik`, `#profilePassword`, `#participantLoginForm`
3. **Fresh browser**: localStorage kosong → default `participantPortalOpen: false`
4. **Playwright**: `primeSettings()` inject localStorage sebelum navigasi

### GAS Backend API
5. **Token field**: `participantToken` (BUKAN `token`)
6. **Dashboard response 2026.3**: `{data: {modules, trackingModules, learningSummary, leaderboard, tracks, journey, events}}`
7. **Progress response**: `{data: [...]}` — field name `data`, NOT `progress`
8. **chapter_id**: NUMBER dari sheet → gunakan `String()` comparison
9. **quiz_score**: May be `undefined` (not `null`)
10. **server.js**: `isAllowedAppRequest()` requires Origin header
11. **GAS redeploy**: SETIAP edit `Code.gs` HARUS redeploy web app

### Playwright Testing
12. **Navigation**: `page.goto()` > `page.evaluate()` untuk SPA hash nav
13. **SPA routing**: Setelah login, `page.goto()` ke URL hash langsung
14. **Quiz/Practice**: Form di-render oleh IIFE → `waitForFunction()`
15. **setInputFiles + dispatchEvent('change')**: unreliable di headless

### Module Structure
16. **ai-python-basic.js**: INTENTIONAL SKIP — namespace collision
17. **ai-modern.js**: BEGINNER_GUIDES, NOT PYTHON_GUIDES
18. **ai-reasoning.js**: 170KB, FULL content, routes working
19. **CV modules**: ai-cv.js + ai-cv-interactive.js (1,241 lines interactive)
20. **Lazy loading**: `__aiLabLoader.load('ai-xxx')` returns Promise, cache + dedup

### Leaderboard
21. **Formula**: `points = Σ(quiz_score) + (chapters × 15) + (practice × 5)`
22. **Source**: LIVE dari `participant_progress`, bukan static seed
23. **Masking**: `*********` untuk non-current user
24. **Status terverifikasi terakhir**: 1.039 pts stabil sebelum/sesudah controlled mutation; screenshot user berikutnya menunjukkan Brenda 1.054 pts tetapi belum di-read-back ulang

### Dashboard
25. **Module release contract #94**: `is_active` + `tracking_enabled`; kartu dikontrol `dashboard_visible`; phase dikontrol `phase_id`
26. **Persistent cache**: sessionStorage 5min TTL, refresh 0.2s
27. **Password akun QA**: simpan di luar repo; test mutasi wajib opt-in eksplisit
28. **Aktivasi module baru**: route harus bukan UD, `total_chapters` benar, lalu set metadata; jangan mengandalkan allowlist URL frontend

### Avatar
29. **Storage**: base64 data URL di sheet `photo_url` (tanpa Drive)
30. **Size**: 200×200 JPEG quality 0.8, ~15KB
31. **Topbar**: `.has-photo::after { background: none }` — fix overlay

---

## 🔑 DATA FLOW

```
CHAPTER   → saveChapterProgress(id, ch, 'completed') → participant_progress
RELEASE   → module metadata → trackingModules → phase summary/journey → visible cards
QUIZ      → saveChapterProgress(id, 'quiz', 'completed', score)
PRACTICE  → saveChapterProgress(id, 'practice', 'completed')
LOGIN     → participantLogin(nik, pw) → 3 jalur → token 12 jam
PASSWORD  → changeParticipantPassword(old, new) → hash → sync 2 sheet
DASHBOARD → initParticipantDashboardData() → 3-tier cache → GAS fetch → render
SESSION   → sessionStorage.heraiParticipantSession
SETTINGS  → localStorage.heraiGlobalSettings → participantPortalOpen boolean
MODULE    → __aiLabLoader.load('ai-xxx') → dynamic script injection
AVATAR    → file → resizeImageToBase64(200) → preview → POST uploadParticipantPhoto
LEADERBOARD → computeLiveLeaderboard() → aggregate progress by NIK → top 10
```

---

## 🔧 TOOLS & SCRIPTS

```bash
# Server
node server.js                                    # → http://127.0.0.1:3000

# E2E Tests (all)
TEST_PARTICIPANT_NIK="<qa-nik>" TEST_PARTICIPANT_PASSWORD="<qa-password>" \
  npm run test:qa:live:read

# E2E Tests (specific files)
npx playwright test e2e/fellow-dashboard.spec.js --workers=1
npx playwright test e2e/participant-workflow.spec.js --workers=1

# Syntax check
node --check js/router.js
node --check js/frontend/fellow-dashboard/settings.js
for f in js/frontend/fellow-dashboard/ai-*.js; do node --check "$f" && echo "OK $f" || echo "FAIL $f"; done

# GAS Redeploy (manual via Google Apps Script editor)
# 1. Buka https://script.google.com → project HerAI
# 2. Paste isi gas/Code.gs
# 3. Deploy → New Deployment → Web App
#    - Execute as: Me
#    - Who has access: Anyone
# 4. Copy Web App URL → paste ke .env (GAS_WEB_APP_URL)
```

---

## 📐 ATURAN KERJA — 20 RULE WAJIB

1.  **Commit PER FITUR** — jangan gabung fitur berbeda dalam 1 commit
2.  **Update handover & gemini.md** setiap selesai fitur — jangan ditunda
3.  **Bug baru**: lanjut #78, #79, dst — jangan reuse nomor lama
4.  **No dark theme** — light pink color scheme (#F63392) — DON'T CHANGE
5.  **CSS scope**: `.ai-lab-content` — jangan global selector kecuali utility
6.  **Diagram kontras**: lines ≥25%, dots ≥75%, stroke ≥0.8px
7.  **NO NIK/password exposed** di code, commit, atau log
8.  **TANYA user** sebelum mulai kerja — KONFIRMASI DULU, jangan asumsi
9.  **Verify**: `node --check`, test flow manual, null guards, E2E test suite
10. **NO provision/generate** participant accounts — AKAN RESET 187 AKUN
11. **NO touch 231 lesson HTML files** — pakai CSS/JS injection untuk perubahan global
12. **sessionStorage** = source of truth untuk participant session
13. **Bump cache buster** setiap edit CSS/JS di `index.html`
14. **No silent fail** — error harus kelihatan di UI atau console
15. **NO push GitHub** kecuali diminta user secara eksplisit
16. **GAS deployment**: redeploy web app SETIAP edit `gas/Code.gs`
17. **Jangan edit module struktur berbeda** tanpa approval user
18. **page.goto() > page.evaluate()** untuk SPA hash navigation di Playwright
19. **`__aiLabLoader`** sudah terintegrasi — jangan tambah `<script>` tag manual
20. **Jangan ubah router.js** module handler tanpa `__aiLabLoader` wrapper
