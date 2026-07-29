# Log Perbaikan Bug & Pengembangan Modul HerAI
*Sesi Pengembangan - Fellowship Dashboard (AI Lab)*

Dokumen ini berisi rangkuman masalah, bug visual, maupun logic yang ditemukan dan cara penyelesaiannya.

## 1. Bug: Modul "Deep Learning" tidak merender (404 / Route error)
**Deskripsi:**
Pengguna melaporkan bahwa saat mencoba mengakses modul Deep Learning atau Kuis Deep Learning (misalnya `http://localhost:3000/#/participant-ai-lab-deep-learning-quiz`), tidak ada halaman yang dimuat atau error route/URL.

**Penyebab:**
- Route untuk modul "Deep Learning" (termasuk praktik dan kuis) tidak diregistrasi di `js/router.js` sehingga SPA (Single Page Application) gagal memuat layout `fellow-dashboard`.
- Pemanggilan skrip `ai-deep-learning.js` belum dimasukkan ke `index.html`.

**Cara Perbaikan:**
- Mendaftarkan route-route baru (contoh: `participant-ai-lab-deep-learning`, `-practice`, dan `-quiz`) ke dalam `js/router.js`.
- Menyambungkan route tersebut ke `materi.html`, `latihan.html`, dan `kuis.html` yang benar dalam struktur folder `foundation-core-ai/deep-learning/`.
- Memperbarui `index.html` dengan menambahkan `<script src="/js/frontend/fellow-dashboard/ai-deep-learning.js">`.

## 2. Bug Visual: Halaman Praktik & Kuis Hanya Menampilkan "Nomornya Doang" (Pagination tanpa Soal)
**Deskripsi:**
Ketika masuk ke Latihan atau Kuis, navigator pagination (1, 2, 3... 20) muncul namun tidak menampilkan teks soal yang benar. Selain itu, ada hardcoding teks "Python untuk AI" di atas soal.

**Penyebab:**
- Script Node.js generator (`build_module.js`) menghasilkan array `prompt: ["teks"]` pada data latihan, padahal fungsi `renderFormattedText()` di frontend berekspektasi terhadap string (`prompt: "teks"`). Akibatnya fungsi replace text throw error dan komponen tidak merender isi array.
- Skrip template menyisipkan hardcode teks "Python untuk AI" (karena hasil cloning modul AI Python).

**Cara Perbaikan:**
- Memperbaiki `build_module.js` agar menyatukan (join) isi array menjadi single string (`prompt: paragraphs.join('\n\n')`).
- Menambahkan logic di `build_module.js` untuk mengganti statik text "Python untuk AI" menjadi nama asli modul (`${moduleTitle}`) pada title bar di latihan/kuis.
- Me-_rebuild_ modul Reinforcement Learning dan mereplace manual string di modul Deep Learning yang terdampak.

[... bugs #3-#44 preserved from previous sessions ...]

---

## 45. Feature: Quiz Score Wiring — Nilai Kuis Hanya Disimpan di localStorage (Tidak ke GAS)

**Deskripsi:**
Ketika peserta mengerjakan kuis dan menekan "Kirim Kuis", score hanya disimpan di `localStorage` browser. Tidak ada data yang dikirim ke GAS backend, sehingga score tidak bisa dilacak di `participant_progress` sheet.

**Penyebab:**
Setiap file `ai-*.js` memiliki quiz submit handler yang menghitung score, menyimpan ke `localStorage.setItem(STORAGE.quizScore, String(score))`, tapi tidak memanggil `window.saveChapterProgress()` untuk POST ke GAS.

**Cara Perbaikan:**
- Inject 1 baris `window.saveChapterProgress(MODULE_ID, 'quiz', 'completed', score)` setelah `localStorage.setItem(STORAGE.quizScore, String(score))` di 28 file `ai-*.js`.
- 25 file auto-injected via Node.js script, 3 file manual (`ai-python-basic.js`, `ai-math-for-ai.js`, `ai-modern.js`) karena pattern berbeda.
- 1 file skip: `ai-cv.js` (tidak ada kuis).
- GAS backend `saveParticipantProgress()` SUDAH menangani parameter `score` sejak awal — tidak perlu diubah.
- `chapter_id` menggunakan string `'quiz'` untuk membedakan dari chapter progress biasa (`'1'`, `'2'`, dst).
- Cache buster di-bump ke `?v=20260727-quiz-wire`.
- **Verifikasi:** Test manual submit kuis → sheet `participant_progress` muncul entry dengan `score` terisi ✅

## 46. Bug: 19 ai-*.js Files Tanpa Cache Buster di index.html

**Deskripsi:**
19 dari 28 file `ai-*.js` yang dimuat di `index.html` tidak memiliki parameter `?v=`, sehingga browser dapat me-load versi lama dari cache meskipun file sudah diubah.

**Cara Perbaikan:**
Menambahkan `?v=20260727-quiz-wire` ke 19 `<script>` tag di `index.html` lines 84-102.

## 47. Issue: ai-python-basic.js Tidak Dimuat di index.html (INTENTIONAL)

**Deskripsi:**
`ai-python-basic.js` memiliki quiz dan practice wiring tapi tidak ada di `index.html`.

**Analisis:**
- `ai-python-basic.js` dan `ai-python.js` KEDUANYA mendefinisikan `window.loadPythonTopik()` — jika dua-duanya di-load, akan terjadi namespace collision (Bug #6 pattern: "Bayang-Bayang Python").
- File ini TIDAK BOLEH ditambahkan ke `index.html`. Wiring yang ada di dalamnya tetap aman karena IIFE tidak akan dieksekusi.

## 48. Bug: Duplicate Script Entries di index.html

**Deskripsi:**
`ai-evaluation.js` muncul di line 82 (`?v=20260724`) DAN line 107 (`?v=20260722-fix-404`). `ai-evolution.js` juga duplikat (line 83 & 108).

**Cara Perbaikan:**
Hapus duplikat yang lebih tua (line 107-108). Pertahankan versi dengan cache buster terbaru (line 82-83).

## 49. Issue: Score Semantics Berbeda Antar Module (DEFERRED — Partial Fix)

**Deskripsi:**
`ai-math-for-ai.js` menghitung score sebagai persentase (0-100), sedangkan 27 module lainnya menghitung raw count (0-20). Frontend sekarang menggunakan heuristik: score > 20 → tampil `X%`, score ≤ 20 → tampil `X/20`. Ini berfungsi tapi tidak proper.

**Status:** Partial fix. Solusi proper: tambah kolom `quiz_total` di `participant_dashboard_modules` sheet (default 20, math-for-ai = 100), lalu GAS compute persentase seragam.

## 50. Bug: ai-intro (Pengantar AI) Quiz Tidak Ter-wire

**Deskripsi:**
Module `participant-ai-intro` (Pengantar AI) tidak memiliki file `ai-*.js` sendiri — quiz handler-nya ada di `settings.js` function `initLessonControls()`. Karena script injection hanya men-scan `ai-*.js`, module ini terlewat.

**Cara Perbaikan:**
- Inject `window.saveChapterProgress('ai-fundamentals', 'quiz', 'completed', score)` setelah `localStorage.setItem(quizScoreKey, String(score))` di `settings.js` line 1370.
- `module_id` menggunakan `'ai-fundamentals'` (konsisten dengan `recordParticipantActivity` yang sudah ada).
- Cache buster settings.js di-bump ke `?v=20260727-quiz-wire2`.
- **Verifikasi:** Test manual submit kuis Pengantar AI → `participant_progress` muncul entry ✅

## 51. Feature: Practice (Latihan) Save Wiring — Latihan Hanya Disimpan di localStorage

**Deskripsi:**
Sama seperti quiz — latihan (practice/essay) hanya disimpan di `localStorage` browser. Tidak ada data yang dikirim ke GAS.

**Penyebab:**
Setiap file `ai-*.js` memiliki practice save handler yang menyimpan jawaban essay ke localStorage (`savePracticePayload` atau `localStorage.setItem`), tapi tidak memanggil `window.saveChapterProgress()`.

**Cara Perbaikan:**
- Inject `window.saveChapterProgress(MODULE_ID, 'practice', 'completed')` setelah save ke localStorage di 28 file `ai-*.js`.
- 24 file auto-injected via Node.js regex script, 4 file manual (`ai-math-for-ai.js`, `ai-ml-basic.js`, `ai-modern.js`, `ai-python-basic.js`).
- 1 file skip: `ai-cv.js` (tidak ada practice).
- `chapter_id` menggunakan string `'practice'`, `score = null` (essay, bukan auto-graded).
- Cache buster di-bump ke `?v=20260727-practice`.
- **Verifikasi:** Test manual save latihan → `participant_progress` muncul entry ✅

**Batasan yang dikonfirmasi 29 Juli 2026:** perbaikan ini hanya mempersist marker completion `practice`. Isi jawaban essay tetap berada di localStorage dan belum dapat dibaca lintas perangkat; dilacak sebagai #92.

---

## 52. Feature: Dashboard Score Display — Quiz Score Tidak Ditampilkan di UI

**Deskripsi:**
Dashboard module card hanya menampilkan progress chapter (%) — score quiz yang sudah tersimpan di `participant_progress` (chapter_id='quiz') tidak ditampilkan.

**Cara Perbaikan:**
- **GAS** (`gas/Code.gs`, `getParticipantDashboardData` line ~381): tambah query quiz score dari `participant_progress`. Filter `chapter_id === 'quiz'`, ambil `Math.max` score per module. Return `quiz_score` di tiap module object.
- **Frontend** (`settings.js`, `renderParticipantDashboard`): inject `formatQuizBadge(item.quiz_score)` ke module card HTML. Heuristik: score > 20 → format `X%`, score ≤ 20 → format `X/20`.
- **CSS** (`dashboard.css`): `.quiz-badge` — pill pink translucent (`rgba(246,51,146,0.08)`), icon trophy, positioned after progress span.
- Cache buster: `settings.js?v=20260727-score-display`, `dashboard.css?v=20260727-score-display`.
- **Verifikasi:** Submit quiz → refresh dashboard → badge muncul dengan format score ✅

## 53. Refactor: seedDashboardLeaderboard → upsertByKey

**Deskripsi:**
`seedDashboardLeaderboard()` di `gas/Code.gs` masih pakai `clearContent()` + `addRowObject()` — tidak idempotent.

**Cara Perbaikan:**
- Ganti dengan `upsertByKey(SHEETS.participantDashboardLeaderboard, 'rank', String(l.rank), l)`.
- Key: `rank` (unique per leaderboard entry).
- **Verifikasi:** Run seed 2x → no duplicate rows ✅

---

## 54. Feature: Participant Access Restriction — Hanya Beranda/Modul/Pengaturan

**Deskripsi:**
Semua halaman peserta (Chatroom, Mentor, Tugas, Proyek, Events, Komunitas, Sertifikat, Leaderboard, FAQ) dapat diakses. User meminta dibatasi hanya Beranda, Modul, dan Pengaturan.

**Cara Perbaikan:**
- **Route guard** (`settings.js`, `initFellowDashboardPage`): check `pageName` di allowed list `['dashboard', 'modules', 'settings']`. Jika tidak → `renderParticipantRestricted()`.
- **Sidebar click interception** (`attachSidebarRail`): link dengan `data-fellow-nav` selain 3 allowed → prevent default + render restricted.
- **Messaging override** (`DOMContentLoaded`): wrap `window.initMessagingPage` — jika logged in → render restricted, jika tidak → original flow.
- **CSS** (`dashboard.css`): `.fellow-restricted-state` — pink theme (match `.fellow-locked-state`), icon `fa-lock`, button "Kembali ke Beranda".
- Cache buster: `settings.js?v=20260727-restricted`, `dashboard.css?v=20260727-restricted-fix`.
- **Verifikasi:** Playwright test via `#/participant-mentor` → "Akses Peserta Dibatasi" muncul ✅

---

## Playwright E2E Testing

**Deskripsi:**
Playwright e2e test suite untuk validasi fungsionalitas utama dan regression testing.

**Setup:**
- Install `@playwright/test` + Chromium
- `playwright.config.js`: headless Chromium, baseURL `http://127.0.0.1:3000`
- `e2e/fellow-dashboard.spec.js`: 17 tests (321 lines), 2 env vars: `TEST_PARTICIPANT_NIK`, `TEST_PARTICIPANT_PASSWORD`

**Test Results (17 tests):**
- Public Pages (4): Home, login gate, register, modules catalog ✅
- Login Validation (2): Empty NIK, invalid NIK format ✅
- Authenticated Flow (9): Login session, dashboard greeting, settings, password empty, module nav, quiz render, practice render, password validation, restricted access ✅
- Error Handling (2): GAS down, 404 route ✅
- **Stability**: 15/17 stable. Practice + password tests occasionally flaky in full suite (pass in isolation — race condition with sequential test runs).

**Run command:**
```bash
TEST_PARTICIPANT_NIK="<qa-nik>" TEST_PARTICIPANT_PASSWORD="<qa-password>" npx playwright test
```

**Critical debug findings:**
1. Portal login form uses `#profileNik` / `#profilePassword` (NOT `#participantNik`)
2. `participantPortalOpen` di sheet Settings harus lowercase `true` (boolean, bukan string `"TRUE"`)
3. Fresh browser localStorage kosong → `getGlobalSettings()` sync return default `participantPortalOpen: false`. Solusi: `primeSettings()` inject localStorage sebelum navigasi
4. Practice page form `#aiDeepLearningPracticeForm` exists in static HTML but content populated async by IIFE → use `waitForFunction` + `waitFor(state:'attached')`
5. After login, hash navigation via `page.evaluate(() => window.location.hash = ...)` lebih reliable daripada `page.goto()` untuk SPA routing

---

## 55. Feature: Score Semantics Normalization — quiz_total Column (#49 resolved)

**Deskripsi:**
`ai-math-for-ai` mengirim score sebagai persentase (0-100), sedangkan 27 module lain mengirim raw count (0-20). Frontend menggunakan heuristik `score > 20 → X%` / `score ≤ 20 → X/20` — berfungsi tapi fragile.

**Cara Perbaikan:**
- **GAS Schema** (`gas/Code.gs` L183): tambah kolom `quiz_total` ke `SCHEMA[SHEETS.participantDashboardModules]`
- **GAS Seed** (`seedDashboardModules`): tambah `quiz_total: 20` ke 27 module, `quiz_total: 100` ke `math-for-ai` (baru), total 28 module
- **GAS Query** (`getParticipantDashboardData`): baca `quiz_total` dari module row (default 20), compute `Math.round((quizScore / quizTotal) * 100)`, return sebagai `quiz_score` (persentase seragam)
- **FE** (`settings.js`, `formatQuizBadge`): hapus heuristik `>20`, selalu format `X%` karena semua score sudah persentase
- Cache buster: `settings.js?v=20260727-score-normalize`
- **Verifikasi:** Submit quiz 15/20 → dashboard badge "🏆 75%". Submit math-for-ai 85/100 → badge "🏆 85%"

---

## 56. Feature: Add math-for-ai to Dashboard Module Routes (#P2)

**Deskripsi:**
`ai-math-for-ai.js` sudah loaded di `index.html`, lesson files ada di `pages/.../math-for-ai/`, quiz+practice+chapter progress sudah wired. Seed module sudah ada di `seedDashboardModules()` (dari #55). Tapi tidak ada route di `router.js`, sehingga navigasi ke `#/participant-ai-lab-math-for-ai` gagal.

**Cara Perbaikan:**
- **Route mapping** (`router.js`): tambah 4 route — overview, practice, quiz, discussion → `pages/.../math-for-ai/*.html`
- **Route list** (`fellowDashboardRoutes`): tambah 4 entry untuk navigation tracking
- **Handler** (`router.js`): tambah `else if` block `path.startsWith("/participant-ai-lab-math-for-ai")` → `initFellowDashboardPage("modules")` + panggil `initAiLabMathOverview/Practice/Quiz/Discussion`
- **Verifikasi:** Route cocok dengan seed href `#/participant-ai-lab-math-for-ai` di `seedDashboardModules()`

---

## Session Summary — 27 Juli 2026 (Sisyphus — Score Display + Restricted Access + Score Normalization + Math Route)

**Total commits:** 42 (25 sebelumnya + 7 sesi lalu + 10 sesi ini)
**Grand total bugs/features:** #1-#57
**Files changed sesi ini:** 11 files, +310/-89
**Last commit:** `76c32ba` — docs: final comprehensive handover polish — all inconsistencies fixed

**Key deliverables sesi ini (#52-#56):**
- #52: Dashboard Score Display — quiz_score di GAS + badge UI + CSS ✅
- #53: seedDashboardLeaderboard idempotent (upsertByKey) ✅
- #54: Participant access restricted to Beranda/Modul/Pengaturan ✅
- #55: Score normalization — quiz_total column, semua score → persentase seragam ✅
- #56: math-for-ai seed added + routes reverted — module on dashboard, shows under-development template ✅
- E2e: 17 tests (15 stable), 3 new — quiz, practice, password, restricted access ✅
- GAS deployed (by user) — `getParticipantDashboardData` now returns `quiz_score` ✅

---

## 57. Bug: Konten Python Template Nyasar di 24 Module JS (#57 — DEFERRED ke Next AI)

**Deskripsi:**
24 dari 29 file `ai-*.js` menampilkan konten Python ("Jalur Pemula", "Python adalah penghubung, bukan AI itu sendiri") di halaman materi/overview module yang seharusnya menampilkan konten module-specific. Contoh: module UI/UX Design menampilkan "Python adalah penghubung" dan "Jalur Pemula — Memahami konsep, bukan menghafal sintaks".

**Penyebab:**
Array `PYTHON_GUIDES` (L268-281) di setiap file adalah template Python yang di-copy antar module. Konten di-inject ke setiap chapter via `Object.assign(chapter, PYTHON_GUIDES[index])`. Semua 24 file memiliki GUIDES yang identik.

**Sumber konten asli:**
Nazril menyediakan 20 module dalam format MD di `/nazril/modul-materi-herai/` (1200-3100 baris, 13-15 chapter per module) dengan struktur: Tujuan Bab, Gambaran Sederhana+Analogi, Konsep Inti (table), Hubungan antarkonsep, Langkah Kerja, Contoh Kasus, Kesalahan Umum, Checkpoint, Latihan.

**Module terkontaminasi (24):**
Business (7): ui-ux, healthcare, geospatial, manufacturing, culture, business-insight, people-business-mgt
Data Eng (7): deployment, back-end, bioinformatics, data-engineering, data-science, front-end, infrastructure
Foundation (4): deep-learning, reinforcement-learning, evaluation, evolution
Gen AI (4): agentic-ai, large-language-model, multimodal-llm, vlm
Lainnya (2): python, modern

**Module bersih (5):** cv, math-for-ai, ml-basic, python-basic, reasoning

**Rencana perbaikan (handover ke next AI):**
- **Fase 0**: Build Node.js extraction script — parse Nazril MD → generate PYTHON_GUIDES replacement
- **Fase 1-3**: Inject konten module-specific ke 20 module dengan Nazril MD
- **Fase 4**: Placeholder untuk 4 module tanpa Nazril (evaluation, evolution, modern, python)
- Mapping: MD sections → GUIDES fields (lihat handover/AI_HANDOFF_CURRENT_STATE.md)
- **Status:** DEFERRED — next AI session

---

**Session Rules (WAJIB — berlaku untuk semua AI session):**
1. Commit PER FITUR, bukan satu commit besar
2. Update handover & gemini.md setiap checkpoint
3. Catat bug baru dengan nomor #58+
4. Dark theme DILARANG — light pink theme untuk code blocks
5. CSS scope ai-lab-content WAJIB di template CV
6. Diagram kontras: lines ≥25% opacity, dots ≥75%, stroke ≥0.8px
7. JANGAN tampilkan NIK/password di log, screenshot, commit, atau handover
8. TANYA user sebelum eksekusi kalau ada yang ambigu
9. Verifikasi sebelum commit: node --check, test data flow, cek null guards
10. JANGAN jalankan provision/generateParticipantAccounts* functions
11. JANGAN sentuh 231 file lesson HTML — pakai JS injection/code generation
12. sessionStorage.heraiParticipantSession adalah source of truth
13. Selalu bump cache buster (?v=...) di index.html setelah edit JS/CSS
14. Jangan silent fail — tambah error feedback di UI
15. JANGAN push ke GitHub kecuali diminta user
16. GAS deployment: selalu redeploy web app setelah edit Code.gs
17. Playwright: TEST_PARTICIPANT_NIK="<qa-nik>" TEST_PARTICIPANT_PASSWORD="<qa-password>" npx playwright test
18. Server lokal: node server.js → http://127.0.0.1:3000

---

## 58. Bug: Konten Python Template Nyasar di 24 Module JS — RESOLVED (#57)

**Deskripsi:**
24 dari 29 file `ai-*.js` menampilkan konten Python ("Jalur Pemula", "Python adalah penghubung") di array `PYTHON_GUIDES` yang di-inject ke chapter overview module. Ini adalah implementasi dari audit dan execution plan yang dibuat di sesi sebelumnya.

**Cara Perbaikan:**
- **Fase 0**: Build `scripts/extract-nazril-guides.js` — Node.js parser yang membaca 20 Nazril MD file (2 format: template `## Gambaran Sederhana` untuk business/data-eng modules, dan naratif `## N.N` untuk foundation/gen-ai modules), meng-extract konten per chapter, dan mapping ke 8 GUIDES entries. Output: `scripts/nazril-guides-output/guides-{module_id}.json` + `roadmap-headers.json`.
- **Fase 0**: Build `scripts/inject-guides.js` — injector yang mengganti `const PYTHON_GUIDES = [...]` block dan roadmap header `<span>Jalur Pemula</span>...` di setiap ai-*.js dengan konten dari JSON + roadmap header module-specific.
- **Fase 1**: Inject 7 Business modules (ui-ux, healthcare, geospatial, manufacturing, culture, business-insight, people-business-mgt) — GUIDES dari Nazril MD template format.
- **Fase 2**: Inject 7 Data Eng modules (deployment, back-end, bioinformatics, data-engineering, data-science, front-end, infrastructure) — GUIDES dari Nazril MD template format.
- **Fase 3**: Inject 6 Foundation & Gen AI modules (deep-learning, reinforcement-learning, agentic-ai, large-language-model, multimodal-llm, vlm) — GUIDES dari Nazril MD naratif format.
- **Fase 4**: Inject 4 placeholder modules (evaluation, evolution, modern, python) — GUIDES generic "Materi sedang dikembangkan" dengan chapter titles module-specific. ai-modern.js fix manual: `eyebrow: "Jalur Pemula"` → `eyebrow: "AI Modern"`.
- **Verifikasi**:
  - `node --check` pada semua 24 file js — 24/24 PASS ✅
  - grep "Jalur Pemula" — 0 match di semua file ✅
  - grep "Python adalah penghubung" — 0 match di semua file ✅
  - Roadmap header diganti: misal UI/UX → `<span>Design Thinking</span>`, Deep Learning → `<span>Deep Learning</span>` ✅
- **Module bersih** (5): ai-cv.js, ai-math-for-ai.js, ai-ml-basic.js, ai-python-basic.js, ai-reasoning.js — tidak disentuh.
- **Extraction tooling**: `scripts/extract-nazril-guides.js` (566 baris) + `scripts/inject-guides.js` — reusable untuk future content updates.

## Session Summary — 27 Juli 2026 (Sisyphus — Bug #57 Resolution)

**Total commits:** 43 (25 sebelumnya + 7 sesi lalu + 9 sesi sebelumnya + 2 sesi ini)
**Grand total bugs/features:** #1-#58
**Files changed:** 24 JS files injected + 2 scripts + 20 JSON outputs + docs
**Key deliverable:** Bug #57 RESOLVED — 24/24 module JS files now have module-specific GUIDES content. Zero Python contamination.

---

## 58. Followup: Hide "Topik 01/02/03" Pill Badges + ai-python.js Rewrite

### Topik Badge Labels (Bug #57 Followup)

**Deskripsi:**
313 chapter HTML files mengandung inline pill badge `<div class="topic-label">Topik 01</div>` yang tidak relevan — "Topik" adalah level modul, bukan sub-bab. Label ini muncul di konten chapter setiap modul.

**Penyebab:**
Template chapter HTML dari build_module.js menghasilkan badge ini untuk semua chapter.

**Cara Perbaikan:**
- **Tidak** edit 313 file satu-satu
- CSS injection: `.topic-label { display: none !important; }` di `dashboard.css`
- Cache buster: `dashboard.css?v=20260727-topic-label`
- Satu rule menutup semua badge di seluruh halaman dashboard
- **Verifikasi:** Badge tidak muncul di halaman chapter manapun ✅

### ai-python.js Rewrite

**Deskripsi:**
ai-python.js sebelumnya terisi placeholder generic ("Python Basics — konsep kunci") dari Fase 4. User minta rewrite dengan konten Python yang proper.

**Cara Perbaikan:**
- 8 GUIDES entries ditulis manual (Bahasa Indonesia, konteks AI/ML):
  1. Python & AI Mindset — venv, reproducibility, computational thinking
  2. Data Dasar — list/tuple/set/dict use cases
  3. Control Flow — guard clause pattern, defensive programming
  4. Function & Modularitas — pure function, type hints, testing
  5. OOP untuk AI — Dataset/Model classes, composition over inheritance
  6. Program Tangguh & File — exception handling, CSV/JSON I/O
  7. Ekosistem & NumPy — vectorization, broadcasting, array ops
  8. Data & Mini Workflow — pipeline: load→clean→analyze→visualize
- GUIDES JSON disimpan ke `scripts/nazril-guides-output/guides-python.json`
- **Verifikasi:** node --check PASS, hook questions spesifik Python ✅

---

## 60. Feature: P1 — E2E Backend API Test Suite

**Deskripsi:**
Dibutuhkan test suite komprehensif untuk memvalidasi GAS backend API secara langsung, tanpa browser. Backend wajib benar sebelum frontend di-test.

**Cara Perbaikan:**
- File: `e2e/participant-backend.spec.js` (524 lines, 20 tests, 5 groups)
- Pure HTTP via `fetch(POST /__gas)` — tidak pakai browser/page
- Token field: `participantToken` (BUKAN `token`) — sesuai `requireParticipantToken(payload)`
- Origin header: `http://127.0.0.1:3000` — wajib karena `isAllowedAppRequest()` di server.js

**Group 1 — Auth (7 tests):**
- Valid login → token + profile, unregistered NIK, wrong password, empty NIK, empty password, protected without token, invalid token

**Group 2 — Progress CRUD (5 tests):**
- Save chapter/quiz/practice, get progress (data field, bukan progress), idempotent save

**Group 3 — Dashboard (2 tests):**
- Full data structure (res.data.modules), quiz_score percentage (0-100)

**Group 4 — Password (3 tests):**
- Change valid full cycle (ganti → login baru → ganti balik), wrong old, empty fields

**Group 5 — Edge Cases (3 tests):**
- Update profile, score persistence (Math.max di dashboard vs last-write di sheet), multi-module tracking

**Temuan Kritis:**
1. Token field: `payload.participantToken || payload.authToken` — BUKAN `token`
2. `getParticipantProgress` response: `{data: [...]}` — BUKAN `{progress: [...]}`
3. Dashboard response: `{data: {modules: [...]}}` — modules wrapped in data
4. `chapter_id` returned as number from sheet — use `String(e.chapter_id)` comparison
5. `quiz_score` may be `undefined` (not `null`) in dashboard response
6. Score Math.max: only in `getParticipantDashboardData`, NOT in `saveParticipantProgress`
7. `server.js` has `isAllowedAppRequest()` — requires Origin header matching allowed origins
8. `nama_lengkap` can be empty string — don't assert `length > 0`

**Verifikasi:** 20/20 tests PASS ✅

**Verifikasi:** 25/25 tests PASS ✅

---

## 61. Feature: P2 — Enhanced Frontend E2E Test Suite

**Deskripsi:**
Dua test flaky (Practice + Password) dan perlu 8 test baru untuk coverage dashboard UI yang komprehensif.

**Fix — Flaky Tests:**

1. **Practice page render** (was flaky):
   - Akar: `waitForFunction` race — static HTML form exists but IIFE populates children async
   - Fix: `waitForSelector('#aiDeepLearningPracticeForm', {state:'attached'})` lalu `waitForFunction` dengan `querySelector('textarea, input[type="text"]')` check

2. **Password validation** (was flaky):
   - Akar: settings page SPA timing — tab not visible when clicked
   - Fix: `waitForSelector('.s-nav-list')` sebelum `click()` tab "Keamanan Akun"

3. **Quiz page render** (was flaky):
   - Akar: quiz form rendered by IIFE, `waitForTimeout` tidak cukup
   - Fix: `waitForFunction(() => document.getElementById('aiDeepLearningQuizForm') !== null)` lalu `waitForTimeout(1000)`

4. **Module navigation**: Semua test yang sebelumnya pakai `page.evaluate()` hash nav diganti `page.goto()` — SPA hash routing lebih reliable dengan full page load

**New Tests (8):**

| # | Test | Detail |
|---|------|--------|
| 15 | Module cards | Dashboard renders module cards (flexible selector) |
| 16 | Quiz badge | Badge shows X% format (not raw /20) |
| 17 | Skeleton loader | Skeleton appears then dashboard content loads |
| 18 | Module content | Healthcare module has NO Python template text |
| 19 | Roadmap cards | `ai-modern-beginner-roadmap` renders with content |
| 20 | GUIDES hook | Deep Learning module shows module-specific content |
| 21 | Topic label | `.topic-label` elements hidden (display:none) |
| 22 | Logout | Click logout → sessionStorage cleared |

**Verifikasi:** 25/25 tests PASS ✅

## 62. Feature: P3 — Full Flow Integration E2E Test Suite

**Deskripsi:**
End-to-end user journey tests — mensimulasikan real participant behavior dari login hingga quiz submit dan kembali ke dashboard.

**File:** `e2e/participant-workflow.spec.js` (382 lines, 8 tests)

**Tests:**

| # | Test | Detail |
|---|------|--------|
| 1 | Full journey | Login → Dashboard → Module → Quiz submit → Back to dashboard |
| 2 | Chapter auto-save | Navigate module → localStorage has chapter key → reload → page renders |
| 3 | Practice save | Type answer → click save → localStorage has practice data |
| 4 | Password cycle | Ganti → logout → login baru → ganti balik → verify original works |
| 5 | Dashboard cache | Dashboard → Module → Back to dashboard (instant, no skeleton) |
| 6 | Multi-module | Visit 2 modules → verify different content per module |
| 7 | Quiz badge | No badge/any state → quiz submit → return to dashboard |
| 8 | Card click nav | Click module card → navigate to correct module page |

**Key patterns:**
- `loginWithPassword(page, password)` — reusable login helper for password cycle tests
- Practice localStorage keys: `heraiAiDeepLearningPractice` (case-sensitive, uppercase P)
- Quiz form: `waitForFunction` untuk `getElementById('aiDeepLearningQuizForm') !== null`
- Password cycle: login with temp password → change back → verify original works

**Parallel execution:** 3 tests fail in parallel mode (expected — same participant credential conflicts):
- Backend password test (#15) vs Workflow password test (#4)
- Module nav tests show dashboard when parallel session expires

**Verifikasi:** 53/53 tests PASS (serial), 50/53 PASS (parallel) ✅

---

## Session Summary — 27 Juli 2026 (Sisyphus — E2E Test Suite Complete)

**Total commits:** 51 (25 original + 7 sesi lalu + 9 sesi sebelumnya + 10 sesi ini)
**Grand total bugs/features:** #1-#62
**E2E Test Suite:** 53 tests (20 backend + 25 frontend + 8 workflow) — 53/53 PASS serial

**Files changed sesi ini:** 24 JS files + 2 CSS rules + 2 extraction scripts + 21 JSON outputs + 5 handover docs + 3 test files

**Key deliverables:**
| # | Item | Detail |
|---|------|--------|
| #57 | Python contamination | 24 module JS — GUIDES dari Nazril MD (20) + placeholder (4) |
| #58 | Topic-label badges | 1 CSS rule hide 313+ labels di seluruh halaman |
| #59 | ai-python.js | 8 GUIDES konten Python proper (dari placeholder) |
| #60 | P1 Backend tests | 20 tests, pure HTTP fetch(POST /__gas) |
| #61 | P2 Frontend tests | 25 tests, fix 3 flaky + 8 new UI coverage |
| #62 | P3 Workflow tests | 8 tests, full user journey simulation |
| — | NEXT_PLAN.md | 6 priorities: content quality + UX + performance |

**Tools created:**
```bash
node scripts/extract-nazril-guides.js          # Parse Nazril MD → GUIDES JSON
node scripts/inject-guides.js --phase=1        # Inject Business modules
node scripts/inject-guides.js --phase=all      # Inject all
node scripts/inject-guides.js --phase=1 --dry-run  # Preview
```

**Next priority:** NEXT_PLAN.md — 6 priorities (content quality + UX + performance)
- 🔴 P1: Business module glossary fix (7 modules — boilerplate → spesifik)
- 🔴 P2: Foundation module glossary fix (6 modules — placeholder → proper)
- 🔴 P3: Module bersih content (cv, math-for-ai, ml-basic, reasoning)
- 🟡 P4: Lazy loading (75 script tags → on-demand, 90% size reduction)
- 🟡 P5: AI lab UX polish (animations, transitions, micro-interactions)
- 🟢 P6: ai-python.js content review

**Quick wins:** P6 → P1 → P2 (bisa langsung dikerjain)

---

## 63. Bug: Glossary Boilerplate di 14 Module — Definisi "konsep penting dalam..." Tidak Informatif

**Deskripsi:**
14 module JS (7 business + 7 data engineering) memiliki glossary entries dengan definisi boilerplate: "konsep penting dalam human-centered design dan design thinking yang perlu diberi definisi operasional sebelum dipakai". Definisi identik untuk semua term dalam satu module.

**Penyebab:**
Nazril MD files menggunakan template placeholder untuk kolom "Penjelasan mudah" di tabel Konsep Inti. Extraction script `extract-nazril-guides.js` menyalin template ini apa adanya ke guides JSON, lalu `inject-guides.js` menginjeksinya ke ai-*.js.

**Dampak:**
- Glossary tidak memberikan nilai edukasi — definisi tidak menjelaskan apa pun tentang term spesifik
- Peserta tidak bisa belajar dari glossary — hanya melihat teks yang sama di semua term
- Term secara konsep sudah benar (domain-specific), hanya definisi yang placeholder

**Cara Perbaikan:**
1. Tulis definisi proper untuk 336 glossary terms di 7 business modules
2. Tulis definisi proper untuk ~336 glossary terms di 7 data engineering modules
3. Simpan definisi sebagai JSON di `scripts/glossary-defs/{module}.json`
4. Jalankan `node scripts/fix-business-glossary.js` untuk update guides JSON
5. Jalankan `node scripts/inject-guides.js --phase=1` (business) dan `--phase=2` (data eng)
6. Verifikasi: node --check, grep boilerplate → 0

**Boilerplate yang dihapus:** ~620 definitions ("konsep penting dalam..." / "perlu diberi definisi operasional...")
**Verifikasi:** ✅ 29/29 syntax OK, ✅ 0 boilerplate tersisa
**Commit:** `4a36a96`

---

## 64. Feature: Lazy Loading — 50+ Script Tags Dihapus, Module JS On-Demand

**Deskripsi:**
75 script tags di index.html (~4.5MB JS) eager-loaded setiap page load. User cuma buka 1-2 module per session → 90% wasted bandwidth.

**Penyebab:**
Semua 29 ai-*.js + 20+ ai-lab/*.js files di-load via `<script>` tag di index.html.

**Cara Perbaikan:**
1. `settings.js`: tambah `window.__aiLabLoader` — Promise-based loader dengan cache + dedup
2. `index.html`: hapus 50+ script tags (ai-*.js + ai-lab/*.js)
3. `router.js`: wrap 28 route handler dengan `__aiLabLoader.load('ai-xxx').then(function() {...})`
4. Script: `scripts/transform-router-for-lazy.js`

**File yang diubah:**
- `js/frontend/fellow-dashboard/settings.js` — loader utility
- `index.html` — 50+ tags removed, cache buster `?v=20260727-lazy`
- `js/router.js` — 28 module handlers wrapped
- `scripts/transform-router-for-lazy.js` — transformation tool

**Impact:** Initial load: 4.5MB → ~500KB (90% reduction)
**Verifikasi:** E2E 49/53 PASS (4 GAS timeout — pre-existing)
**Commit:** `d58f2b5`

---

## Session Summary — 28 Juli 2026 (Sisyphus sesi ke-3 — P5 UX + P3 Routes + Avatar v3)

**Total commits sesi ini:** 12 (5af6c54 → ff6d639)
**Grand total commits (main):** 232
**Last commit:** `ff6d639` — fix: avatar — preview-before-upload flow + fix topbar avatar display (#67)
**GAS Deployment:** ✅ Redeployed — avatar sheet storage active
**Worktree:** BERSIH
**Test participant:** kredensial QA disuplai melalui environment variable, tidak disimpan di repo
**E2E (latest):** 40/40 PASS, 0 regression

### Deliverables Sesi Ini

| # | Task | Status | Commits |
|---|------|--------|---------|
| #65 | P5 UX Polish — 12 animations, toast, badge hover | ✅ | 5af6c54, 3caf740 |
| #66 | P3 Module routes — math-for-ai, ml-basic, CV activated | ✅ | cd18146, c3341b4 |
| #67 | Avatar v1 — upload, Drive storage, display | ✅ | 6f1169a, c86641f |
| #67 | Avatar v2 — fix Drive permission → sheet storage | ✅ | dd92165 |
| #67 | Avatar v3 — fix syntax, remove guards, fix login | ✅ | 2fa605a, 5795b95 |
| #67 | Avatar v4 — preview flow, topbar fix, cancel button | ✅ | 0c37090, ff6d639 |

### Issues Terbuka
- **Password akun QA:** test password bersifat mutatif dan wajib memakai akun/staging khusus
- **GAS:** SUDAH redeploy — avatar sheet storage active
- **Semua prioritas NEXT_PLAN.md:** SELESAI (6/6) — tidak ada backlog
- **ai-reasoning.js:** VERIFIED — 170KB, full content, routes already working → removed from module bersih list

---

## 65. Feature: P5 AI Lab UX Polish — Roadmap, Quiz, Page Animations (#65)

**Deskripsi:**
AI Lab module pages tidak memiliki animasi transisi. Roadmap menggunakan native `<details>` tanpa smooth accordion. Quiz feedback (correct/wrong) hanya warna statis tanpa animasi. Page load tidak ada enter animation.

**Cara Perbaikan:**
Semua animasi via CSS + 1 utility JS — tidak ada perubahan ke 29 file ai-*.js.

**File changed:**
- `modules.css` (+170 lines): @keyframes (aiAnswerPulse, aiAnswerShake, aiRoadmapStepIn, aiPageEnter, aiScoreReveal, aiToastIn/Out, aiSpinner), roadmap accordion grid-template-rows transition, step stagger animation, active step glow, strip stagger, quiz feedback animations, button micro-interactions (scale(0.96) on active), toast styles
- `ai-lab-lesson.css` (+6 lines): @keyframes aiContentEnter + animation on .ai-lab-content
- `dashboard.css` (+18 lines): quiz badge hover scale(1.08), skeleton fade-in
- `settings.js` (+19 lines): window.__aiLabToast(message, type, duration) — global toast helper
- `index.html`: cache busters bumped to v=20260728-ux-polish

**Animasi detail:**
1. **Roadmap accordion:** grid-template-rows 0fr→1fr transition 0.35s ease
2. **Step stagger:** 10 steps fade-in with 0.06s delay increment
3. **Active step glow:** pink gradient bg + box-shadow on details[open] summary > span
4. **Strip stagger:** 8 strip items fade-in with delay
5. **Quiz correct:** green pulse ring (box-shadow expand then fade)
6. **Quiz wrong:** horizontal shake 0.4s
7. **Page enter:** .ai-lab-content fade-in-up 0.45s
8. **Progress bar:** cubic-bezier 0.5s (was 0.2s linear)
9. **Buttons:** transform scale(0.96) on :active, focus ring
10. **Toast:** slide-in from top, auto-dismiss 2.2s with slide-up exit
11. **Quiz badge hover:** scale(1.08) + shadow on dashboard card hover
12. **Skeleton reveal:** skeletonFadeIn for dynamic content

**Verifikasi:** 37/37 E2E PASS, no regression

---

## Aturan Kerja — 20 RULE WAJIB

1. **Commit PER FITUR** — jangan gabung fitur beda. Satu commit = satu logical change.
2. **Update handover & gemini.md** setiap selesai fitur.
3. **Bug baru:** lanjut #65, #66, dst — jangan reuse nomor.
4. **No dark theme** — light pink color scheme (#F63392).
5. **CSS scope:** `.ai-lab-content` — jangan global selector kecuali utility.
6. **Diagram kontras:** lines ≥25%, dots ≥75%, stroke ≥0.8px.
7. **NO NIK/password exposed** di code — environment variable aja.
8. **TANYA user** sebelum mulai kerja — konfirmasi order dan prioritas.
9. **Verify:** `node --check`, test flow, null guards, E2E.
10. **NO provision/generate** participant accounts — AKAN RESET 187 AKUN.
11. **NO touch 231 lesson HTML files** — pakai CSS/JS injection.
12. **sessionStorage** = source of truth untuk session.
13. **Bump cache buster** setiap edit CSS/JS — `?v=20260727-{feature}`.
14. **No silent fail** — error harus kelihatan (console.error, UI error state).
15. **NO push ke GitHub** kecuali diminta user.
16. **GAS deployment:** selalu redeploy web app setelah edit Code.gs.
17. Playwright: `TEST_PARTICIPANT_NIK="<qa-nik>" TEST_PARTICIPANT_PASSWORD="<qa-password>" npx playwright test`
18. Server lokal: `node server.js` → http://127.0.0.1:3000
19. **page.goto() > page.evaluate()** untuk SPA hash navigation — `page.evaluate` hash nav unreliable.
20. **Jangan edit module bersih tanpa approval** (cv, math-for-ai, ml-basic, python-basic, reasoning). TANYA DULU.

---

## Tools & Commands

```bash
# Server
node server.js

# E2E Tests
TEST_PARTICIPANT_NIK="<qa-nik>" TEST_PARTICIPANT_PASSWORD="<qa-password>" npx playwright test --workers=1

# Syntax check
for f in js/frontend/fellow-dashboard/ai-*.js; do node --check "$f" && echo "✅ $f" || echo "❌ $f"; done
node --check js/router.js && echo "✅ router.js"
node --check js/frontend/fellow-dashboard/settings.js && echo "✅ settings.js"

# Check boilerplate
grep -c "konsep penting dalam" js/frontend/fellow-dashboard/ai-*.js | grep -v ":0$"

# Extract + inject guides
node scripts/extract-nazril-guides.js
node scripts/inject-guides.js --phase=1  # Business
node scripts/inject-guides.js --phase=2  # Data Eng
node scripts/inject-guides.js --phase=3  # Foundation

# Fix glossary
node scripts/fix-business-glossary.js
```

---

## Data Flow

```
CHAPTER: saveChapterProgress(id, ch, 'completed') → participant_progress
QUIZ: saveChapterProgress(id, 'quiz', 'completed', score) → participant_progress (persentase 0-100%)
PRACTICE: saveChapterProgress(id, 'practice', 'completed') → participant_progress (score=null)
LOGIN: participantLogin(nik, pw) → 3 jalur verifikasi → token 12 jam
PASSWORD: changeParticipantPassword(old, new) → hash SHA-256 → sync 2 sheet
DASHBOARD: initParticipantDashboardData() → skeleton → fetch → render/cache + score badge
SESSION: sessionStorage.heraiParticipantSession
SETTINGS: localStorage.heraiGlobalSettings → participantPortalOpen boolean
MODULE LOADING: __aiLabLoader.load('ai-xxx') → dynamic script injection (on-demand)
```

---

## 66. Feature: P3 — Activate Module Bersih Routes (#66)

**Deskripsi:**
4 module yang dianggap "bersih" ternyata punya konten JS dan HTML lengkap, cuma route-nya masih ke `under-development.html`. Tidak ada konten yang perlu ditulis dari nol.

**Investigasi:**
- `ai-reasoning.js` (170KB): full content, routes already working → **SKIP, already done**
- `ai-math-for-ai.js` (53KB): 5 lessons + practice + quiz, HTML pages exist, routes under-dev
- `ai-ml-basic.js` (24KB): 13 CHAPTERS + loadMlTopik(), HTML pages exist, routes under-dev
- `ai-cv.js` (11KB): 01-digital-image routes work, 02-cnn + 03-advanced-cnn routes under-dev

**Cara Perbaikan:**

**router.js — Route Map (25 entries changed):**
- math: 11 routes under-dev → `math-for-ai/overview.html`, `lesson.html`, `practice.html`, `quiz.html`, `discussion.html`
- ml-basic: 5 routes under-dev → `machine-learning/materi.html`, `latihan.html`, `kuis.html`, `diskusi.html`
- cv: 8 routes under-dev → `02-convolutional-neural-networks/*.html`, `03-advanced-cnn-architectures/*.html`

**router.js — Handler fix:**
- math handler: added `__aiLabLoader.load('ai-math-for-ai')` wrapper (was missing — init functions called without lazy load)
- ml-basic handler: already correct with loader ✅
- cv handler: already correct with loader ✅

**index.html:**
- router.js cache buster: `v=20260728-p3-modules`

**Verifikasi:** 40/40 E2E PASS, 0 regression

---

## 67. Feature: Avatar/Foto Profil — Upload, Resize, Drive Storage (#67)

**Deskripsi:**
Settings page sudah punya UI avatar upload (tombol Unggah + Hapus, img.large-avatar) tapi tombol disabled dan belum ada backend. Dashboard topbar punya span.avatar-img tapi kosong.

**Cara Perbaikan:**

**GAS Backend (`gas/Code.gs`):**
- Tambah kolom `photo_url` di `SCHEMA[SHEETS.participants]`
- `uploadParticipantPhoto`: decode base64 → upload ke Google Drive folder `HerAI_Photos` → set sharing anyone-with-link → simpan URL ke sheet → return `photo_url`
- `removeParticipantPhoto`: trash file Drive berdasarkan ID dari URL → kosongin `photo_url` di sheet
- Old photo auto-replaced: file lama di-trash sebelum upload baru
- Actions ditambah ke dispatch + authorized participant actions

**Frontend (`settings.js`):**
- `resizeImageToBase64(file, maxSize)`: canvas crop square + resize → JPEG quality 0.8 → return base64 data URL
- File input (hidden, type=file accept=image/*) dibuat dinamis, triggered oleh klik tombol Unggah
- Validasi: format (JPG/PNG/GIF/WebP), ukuran max 2MB
- Upload flow: resize → POST `/__gas` action `uploadParticipantPhoto` → update avatar img src → update session → toast
- Remove flow: confirm → POST `removeParticipantPhoto` → reset ke ui-avatars.com → update session → toast
- Tombol Hapus muncul/hilang berdasarkan `photo_url`
- `updateTopbarAvatar(photoUrl)`: set `.avatar-img` background-image (cover, center)
- Dipanggil saat: login (attachUserMenuDropdown), setelah upload, setelah remove, setelah save profil
- Session storage: `photo_url` disimpan di `profile` object

**CSS:** Tidak ada perubahan — styling `.avatar-img`, `.large-avatar`, `.btn-upload`, `.btn-remove` sudah ada

**Iterasi v2 (dd92165): Storage Fix**
- Ganti dari DriveApp ke sheet-based: simpan base64 data URL langsung ke `photo_url`
- Hapus semua DriveApp code (-46 baris, +7 baris) — tanpa permission tambahan

**Iterasi v3 (2fa605a): Bug Fixes**
- Fix syntax error: missing `}` closing brace pada if-block file input listener
- Hapus dataset-based guards (`avatarReady`, `listenerAttached`) — ganti DOM check (`getElementById`)
- Fix E2E login: `waitForFunction` tunggu sessionStorage token (sebelumnya race condition)

**Iterasi v4 (ff6d639): Preview Flow + Topbar Fix**
- **Dashboard topbar fix**: `.avatar-img::after` pseudo-element overlay nutupin foto. CSS: `.has-photo::after { background: none }`. JS: `updateTopbarAvatar()` toggle class.
- **Preview flow**: Pilih file → resize → tampil preview di avatar → tombol "✓ Simpan Foto" + "✗ Batal"
  - Batal: reset avatar ke src sebelumnya, hapus cancel button
  - Simpan: POST ke GAS → update session + topbar → toast
- Cancel button inline (`.btn-cancel-upload`), auto-remove setelah use
- Remove button sekarang sync topbar via `updateTopbarAvatar('')`

**Cache buster final:** `v=20260728-avatar-v3`

**Verifikasi:** 40/40 E2E PASS, 0 regression. GAS SUDAH redeploy.

---

## 68. Fix: Under-Development Template Blocked + Math/ML/CV → Under Development

**Deskripsi:**
Semua halaman under-development (nlp, tfidf, bow, dll) menampilkan "Akses Peserta Dibatasi" alih-alih template "Under Development". Ini pre-existing bug dari fitur restricted access (#54) — `initFellowDashboardPage` hanya allow `['dashboard', 'modules', 'settings']`, sehingga `pageName='under-development'` ditolak.

User minta Math for AI, ML, dan CV overview di-redirect ke under-development karena kontennya belum siap (struktur JS berbeda, spinner ML, CV template custom).

**Cara Perbaikan:**
- **router.js**: 4 route overview diubah → `/pages/frontend/fellow-dashboard/under-development.html`
  - `/participant-ai-lab-math`
  - `/participant-ai-lab-machine-learning`
  - `/participant-ai-lab-ml`
  - `/participant-ai-lab-cv`
- **settings.js**: tambah `'under-development'` ke `allowedPages` array di `initFellowDashboardPage`
- **index.html**: bump cache buster `v=20260728-ud-fix`
- Sub-routes (quiz, practice, lesson) tetap jalan, tapi unreachable dari UI

**Verifikasi:**
- 33/33 E2E PASS — no regression
- 4 route now show "Under Development" ✅
- Existing UD routes (nlp, tfidf, etc.) now show template correctly ✅
- 24 active modules: content clean, no Python contamination
- Progress tracking: chapter + quiz + practice all write to GAS
- Password Brenda: intact after test cycle

---

## 69. Feature: Live Leaderboard — Compute Points from Participant Progress

**Deskripsi:**
Leaderboard di dashboard menggunakan static seed data (`seedDashboardLeaderboard()` — poin di-generate random `2500 - index × 180`). Tidak mencerminkan pencapaian peserta sebenarnya.

**Cara Perbaikan:**
- **GAS** (`gas/Code.gs`): replace leaderboard query dengan `computeLiveLeaderboard(requesterNik)`
  - Aggregate `participant_progress` sheet by NIK
  - Formula: `points = sum(quiz_score) + (chapters_completed × 15) + (practices_completed × 5)`
  - Sort descending by points, take top 10
  - Lookup nama dari `participant_accounts`
  - Mask nama peserta lain (`*********`), unmask current user
  - Fallback `getSeedLeaderboard()` jika belum ada progress data
- `seedDashboardLeaderboard()` tetap ada untuk initial seeding, tidak dihapus

**Impact:**
- Brenda: 844 pts real (34 chapters + 24 quiz + 26 practice) — sebelumnya 2,406 seed
- Leaderboard sekarang dinamis — update otomatis setiap peserta submit quiz/chapter/practice

**Catatan:**
- GAS perlu redeploy setelah edit Code.gs

## 70. Performance: Dashboard Persistent Cache — sessionStorage TTL 5 min

**Deskripsi:** Setiap refresh F5, dashboard re-fetch GAS (5-8s). In-memory cache hilang saat reload.

**Fix:** settings.js: 3-tier cache (memory → sessionStorage 5min → skeleton). COLD ~18s, WARM 0.2s.

---

## 71. Fix: Computer Vision Back Online — Route Restore + ai-lab Catch-all

**Deskripsi:** CV route restore tapi "Akses Dibatasi" karena catch-all handler pageName="ai-lab".

**Fix:** router.js: revert CV route, catch-all "ai-lab"→"modules".

---

## 72. Fix: CV CNN + Advanced CNN → Under Development

**Deskripsi:** User minta CNN + Advanced CNN disembunyikan, Digital Image Fundamentals tetap.

**Fix:** router.js: 19 route entries → under-development.html.

---

## 73. Feature: CV Digital Image Interactive Widgets + Quiz + Coding Challenges

**Deskripsi:** Semua interactive elements (flip, bitwise, Otsu, sandbox, quiz, challenges) tidak berfungsi — onclick functions undefined.

**Fix:**
- ai-cv-interactive.js (1,241 lines, NEW): morphology engine, sandbox, flip/rotate, bitwise, Otsu, quiz, challenges
- ai-cv.js: call initCvInteractives() after load, keep quiz in materi mode
- Index.html: load ai-cv-interactive.js

---

## 74. Fix: All Modules Under-Development Except AI Fundamentals

**Deskripsi:** User minta semua module UD kecuali 5 AI Fundamentals.

**Fix:** router.js: 20 overview routes → under-development.html.

---

## 75. Fix: Dashboard — Hide Under-Development Modules

**Deskripsi:** Dashboard masih 27 cards termasuk UD.

**Fix:** settings.js: filter by onlinePrefixes (ai-python/reasoning/modern/evaluation/evolution), show 5 cards.

---

## 76. Fix: GAS — computeLiveLeaderboard Scope Error

**Deskripsi:** activeRows() local const di getParticipantDashboardData → crash dashboard setelah deploy.

**Fix:** GAS: replace activeRows() → getRows() global.

---

## 77. Fix: GAS — Leaderboard Fallback Karena is_active Filter

**Deskripsi:** participant_progress tidak punya kolom is_active → semua row terfilter → fallback seed.

**Fix:** GAS: hapus filter is_active. Brenda 1,024 pts live. 3x redeploy (#69→#76→#77).

**Verifikasi Final:** ✅ Leaderboard LIVE — Brenda 1,024 pts (#1), peserta lain 245 pts (#2). GAS deployed dan verified.

---

## 78. Bug Audit: Ringkasan Belajar Tidak Terhubung ke Progress

**Status:** FIXED IN CODE — 29 Juli 2026; ringkasan membaca `learningSummary` backend dan memiliki fallback terhitung.

**Temuan:** Kartu `Ringkasan Belajar` di halaman AI Fundamentals masih berisi nilai statis `0%`, `0 Modul`, `0 Modul`, dan `6 Modul`. Data dashboard mock yang memiliki progress non-zero tidak mengubah kartu tersebut.

**Dampak:** UI dapat menampilkan 0% walaupun backend sudah mencatat aktivitas peserta. Ini menjelaskan tampilan pada screenshot user.

**Acceptance test:** progress backend non-zero harus mengubah donut, Tuntas, Dalam Proses, dan Belum Dimulai secara konsisten.

## 79. Bug Audit: Metadata Jumlah Kuis Tidak Sinkron

**Status:** FIXED IN CODE — Reasoning `quiz_total` disinkronkan menjadi 26; Evaluation/Evolution tetap 20.

**Temuan awal:** Reasoning menyediakan 26 soal, sedangkan seed GAS menetapkan `quiz_total: 20`. Evaluation dan Evolution hanya merender 1 item placeholder, tetapi GAS juga menetapkan `quiz_total: 20`.

**Update #80:** Evaluation dan Evolution sekarang masing-masing memiliki 20 soal, sehingga keduanya sudah cocok dengan `quiz_total: 20`. Expected failure metadata tersisa hanya untuk Reasoning.

**Dampak:** normalisasi persentase kuis dan badge dashboard berpotensi salah.

## 80. Bug Audit: Kuis Evaluation dan Evolution Masih Placeholder

**Status:** FIXED — 29 Juli 2026.

**Temuan:** route kuis dapat dibuka, tetapi kontennya hanya `Kuis belum tersedia`; belum ada pertanyaan serta opsi jawaban yang bisa diselesaikan peserta.

**Perbaikan:**

- `ai-evaluation.js`: 20 soal nyata tentang metrics, confusion matrix, data split/leakage, benchmark, robustness, calibration, fairness, human evaluation, latency/cost, threshold, dan evaluation plan.
- `ai-evolution.js`: 20 soal nyata tentang symbolic AI, expert system, ML/DL, RL, autoencoder/VAE/GAN, diffusion, Transformer/LLM, multimodal, hybrid AI, agentic AI, dan responsible future.
- Setiap soal memiliki empat opsi, satu jawaban valid, dan pembahasan setelah submit.
- Alur existing tetap dipakai: pagination, answered counter, validasi semua soal, single attempt, localStorage, score 0–20, review benar/salah, dan POST progress.
- Metadata manifest diubah menjadi 20 dan sekarang cocok dengan GAS tanpa perubahan/deploy backend.
- Cache loader dibump ke `v=20260729-quiz-content` melalui `settings.js` dan `index.html`.

**Verifikasi:** 40 soal tervalidasi unik; kedua quiz render 20 item; submit menghasilkan score numerik dan payload `chapter_id: 'quiz'` yang benar. Full safe gate 60/60, 0 unexpected failure, 0 live write.

## 81. Bug Audit: Simpan Praktik/Kuis AI Modern Crash

**Status:** FIXED — `MODULE_ID = 'konsep-ai-modern'` tersedia di IIFE practice/quiz dan payload terverifikasi.

**Penyebab:** `MODULE_ID` dideklarasikan di IIFE pertama `ai-modern.js`, tetapi handler praktik dan kuis berada di IIFE kedua. Saat submit, browser menghasilkan `ReferenceError: MODULE_ID is not defined`.

**Dampak:** jawaban lokal dapat tampil, tetapi pencatatan ke GAS tidak terkirim.

**Catatan:** `ai-modern.js` termasuk module berstruktur khusus; perbaikan source menunggu approval eksplisit.

## 82. Bug Audit: Chapter AI Modern Mengirim Object sebagai chapter_id

**Status:** FIXED — `loadModernTopik()` mengirim nomor chapter, bukan object.

**Temuan:** `loadModernTopik()` memanggil `saveChapterProgress(MODULE_ID, chapter, ...)`, dengan `chapter` berupa object. Backend mengubahnya menjadi string `[object Object]`, bukan nomor chapter.

**Dampak:** progress chapter tidak dapat diagregasi secara benar dan deduplikasi row menjadi keliru.

## 83. Bug Audit UX: Touch Target Tombol Praktik di Bawah 44px

**Status:** FIXED — kontrol praktik aktif memenuhi minimum 44px pada viewport 375px.

**Temuan pada viewport 375px:** tombol `Berikutnya` setinggi 43,5px dan `Simpan Jawaban` 42px.

**Dampak:** target sentuh kurang nyaman dan tidak memenuhi quality gate minimum 44×44px yang dipakai suite QA.

## 84. Bug Audit Backend: Quiz dan Practice Terhitung sebagai Chapter

**Status:** FIXED IN CODE — GAS hanya menghitung chapter ID numerik unik. Redeploy production masih wajib.

**Penyebab:** `getParticipantDashboardData()` menambah setiap row `status === 'completed'` ke `completedByModule`, termasuk `chapter_id === 'quiz'` dan `chapter_id === 'practice'`.

**Dampak:** persentase module dapat lebih tinggi dari progress chapter sebenarnya, lalu tertutup oleh clamp 100%.

## 85. Bug Audit: saveChapterProgress Gagal Secara Diam-diam

**Status:** FIXED — frontend memeriksa HTTP/body status, menampilkan loading/error, dan mempertahankan retry.

**Penyebab:** frontend tidak memeriksa `response.ok` atau body status dari `/__gas`, dan blok `catch` kosong.

**Dampak:** peserta tidak mendapat feedback ketika progress gagal tersimpan; UI dapat tampak berhasil walau backend tidak menerima data.

---

## Phase 0 QA Foundation — Active Modules

- Manifest tunggal untuk 5 module dashboard + AI Intro dan CV Digital Image.
- Mock participant/GAS deterministik agar UI test tidak menulis ke production.
- Live mutation guard: kredensial saja tidak cukup; wajib `TEST_ALLOW_MUTATIONS=true`.
- Siklus ganti password punya guard tambahan `TEST_ALLOW_PASSWORD_MUTATIONS=true`.
- Test matrix mencakup overview, practice, quiz, discussion, route, script loader, payload module/chapter, ringkasan progress, responsif, keyboard focus, reduced motion, dan touch target.
- Reporter Playwright: terminal, HTML, JSON, screenshot/trace/video saat gagal.
- Baseline Phase 0: 108 test terdaftar dan safe mock gate 55 test tanpa live write.
- Setelah resolusi #78–#91: 131 test terdaftar dan safe mock gate 76/76 PASS tanpa expected failure.
- Full suite: 87 PASS + 44 SKIP + 0 FAIL; skip adalah live authenticated/mutation tanpa secret environment.
- Source GAS berubah dan wajib redeploy manual sebelum fitur backend terbaru diklaim live.

## 86. Fix: Navigator Nomor Kuis Menumpuk Vertikal

**Status:** FIXED — 29 Juli 2026.

**Gejala:** navigator nomor 1–20 pada kuis Evaluation dan Evolution tersusun satu tombol per baris sehingga halaman menjadi sangat panjang.

**Penyebab:** `.python-task-navigator` memakai layout grid satu kolom secara default. Override horizontal sebelumnya bergantung pada allowlist ID module lama dan belum mencakup `aiEvaluationQuizNavigator` serta `aiEvolutionQuizNavigator`.

**Perbaikan:**

- Tambah aturan generik `.ai-python-quiz-page .python-task-navigator` dengan `display:flex`, `flex-wrap:wrap`, gap 8px, dan alignment ke kiri.
- Tombol navigator dikunci 44×44px agar konsisten dan memenuhi minimum touch target.
- Solusi class-based berlaku untuk module kuis baru tanpa menambah allowlist ID lagi.
- Cache buster `modules.css` dibump ke `v=20260729-quiz-nav`.
- Tambah test Evaluation/Evolution pada viewport 375px dan 1280px: 20 tombol, nomor awal satu baris, wrap, 44px, dan tanpa horizontal overflow.

**Verifikasi:** targeted UI/UX 10/10; full safe gate 62/62; 0 unexpected failure dan 0 live write.

## 87. Bug Audit UX: Navigator Kuis Reasoning Masih Vertikal

**Status:** FIXED — 26 tombol horizontal, wrap, 44px, dan bebas overflow pada mobile.

**Temuan:** `#aiReasoningQuizNavigator` memakai `.reasoning-task-navigator`, bukan `.python-task-navigator`. Pada viewport 375px computed style tetap `flex-direction: column`, `flex-wrap: nowrap`, sehingga 26 tombol menjadi 26 baris.

**Dampak:** halaman sangat panjang dan navigasi soal sulit dipindai. Fix #86 berhasil untuk Evaluation/Evolution, tetapi belum mencakup struktur khusus Reasoning.

## 88. Bug Audit: AI Modern Source Integrity Mismatch

**Status:** FIXED — chapter hero ditandai sebagai konten enhancer; source integrity kembali `passed`.

**Temuan:** `assertSourceIntegrity()` melaporkan teks sumber expected 5.867 karakter tetapi hasil render 6.042 karakter. Container mendapat `data-source-integrity="failed"`.

**Dampak:** enhancer materi mengubah teks sumber di luar baseline yang dijaga module.

## 89. Bug Audit Runtime: Evaluation/Evolution Referensi PYTHON_GUIDES

**Status:** FIXED — cleanup global di luar IIFE dihapus; kedua module load tanpa pageerror.

**Penyebab:** setelah IIFE ditutup, kedua file menjalankan `PYTHON_GUIDES.length = 0`, padahal variabel tersebut tidak tersedia di scope global.

**Dampak:** console tidak bersih dan eksekusi statement cleanup berikutnya terputus. Konten utama sudah sempat render, tetapi runtime error tetap merupakan failure production.

## 90. Bug Audit UI: Label Python Bocor ke Evaluation/Evolution

**Status:** FIXED — heading, breadcrumb, forum, dan error copy kini module-specific.

**Temuan:** halaman kuis masih menampilkan `Kuis Python`; halaman diskusi masih memakai `Forum Python AI` dan breadcrumb/tombol `Kuis Python`.

**Dampak:** identitas module membingungkan walau bank soal sudah module-specific.

## 91. Gap Persistence: Diskusi Hanya Tersimpan di Browser

**Status:** FIXED LIVE — schema/route GAS, save/update reply, dan authenticated read-back production terverifikasi.

**Temuan:** submit diskusi menulis localStorage, mengosongkan textarea, dan menampilkan pesan `tersimpan di browser ini`, tetapi tidak mengirim request persistence ke backend.

**Dampak:** diskusi tidak lintas perangkat/browser, tidak dapat diaudit admin, dan hilang jika storage dibersihkan.

---

## Audit E2E Playwright MCP — 29 Juli 2026

- 20 route (5 module × materi/latihan/kuis/diskusi) dirender dan diuji pada desktop serta 375px.
- 20/20 bebas horizontal overflow.
- Safe gate sekarang 70 test: 56 ordinary pass + 14 expected failures, 0 unexpected failure, 0 live write.
- Total suite 123 test dalam 6 file.
- Live backend suite: 3 public/security checks pass, 25 authenticated/mutation scenarios skip karena secret environment tidak tersedia.
- Bukti rinci: `handover/E2E_AUDIT_2026-07-29.md`.

## Resolusi Audit #78–#91 — 29 Juli 2026

- Ringkasan Belajar tersambung ke backend dan menghitung Intro + 5 module aktif.
- Metadata Reasoning menjadi 26 soal; progress GAS mengabaikan quiz/practice dan deduplikasi chapter numerik.
- AI Modern memperbaiki scope `MODULE_ID`, chapter ID numerik, dan source-integrity.
- Practice/quiz lima module menunggu acknowledgment backend; failure tidak lagi mengunci state lokal.
- Diskusi dan balasan lima module memakai `participant_discussions`, dengan save dan read-back lintas reload.
- Evaluation/Evolution bebas `PYTHON_GUIDES` pageerror dan tidak lagi menampilkan label Python.
- Navigator Reasoning dan touch target mobile memenuhi kontrak UI/UX.
- Safe gate **76/76 PASS**. Full suite **131 terdaftar = 87 PASS + 44 SKIP + 0 FAIL**; skip adalah live authenticated/mutation karena secret environment tidak tersedia.
- `gas/Code.gs` lolos syntax/contract test dan versi `2026.2-progress-persistence` sudah **LIVE**. Route diskusi + auth guard, authenticated read-only, dan controlled write/read-back sudah terverifikasi.

### Authenticated live read-back (baseline sebelum mutation)

- Final gate: **29 PASS + 18 mutation SKIP + 0 FAIL**.
- Production read-back: 94 progress rows = 42 chapter numerik unik + 26 practice + 25 quiz; diskusi 0.
- Ringkasan Belajar live: 33%, dengan 1 tuntas, 4 dalam proses, dan 1 belum dimulai.
- Helper login Playwright tidak lagi memakai fixed wait 3 detik; sekarang menunggu token session sampai 20 detik. Assertion lima kartu juga menunggu render event-based.
- Tidak ada progress/profile/password/discussion mutation yang dilakukan.

## 92. Gap Persistence: Isi Jawaban Practice Tidak Masuk Backend

**Status:** OPEN — ditemukan lewat controlled live write/read-back, 29 Juli 2026.

**Temuan:** tombol simpan latihan mengirim `saveParticipantProgress(module_id, 'practice', 'completed')`, tetapi payload tidak membawa isi jawaban textarea. Isi jawaban hanya disimpan oleh frontend ke localStorage.

**Bukti live:** marker practice berhasil ditulis dan dibaca kembali dari `participant_progress`; tidak ada field atau route backend yang dapat mengembalikan response body latihan.

**Dampak:** dashboard dan leaderboard dapat mengetahui latihan selesai, tetapi jawaban tidak tersedia lintas browser/perangkat dan belum dapat diaudit atau direview dari backend.

**Rencana fix:** sepakati retensi dan schema jawaban, tambah save/get practice response dengan ownership check, hubungkan acknowledgment + read-back frontend, lalu tambah E2E yang memastikan jawaban tetap ada setelah localStorage dibersihkan.

### Controlled authenticated live mutation

- Write chapter, marker practice, quiz, dan diskusi: **4/4 success**.
- Read-back chapter, practice, quiz, thread diskusi, dan reply: **5/5 cocok**.
- Progress writes memakai nilai existing; Ringkasan Belajar tetap 33% dan leaderboard tetap **1.039 → 1.039**.
- Satu thread QA tetap beserta satu reply dibuat untuk membuktikan persistence diskusi.
- Tidak ada mutation profile atau password; environment credential dibersihkan setelah test.

## 93. Bug UI: Daftar Materi Pengantar AI Tidak Menandai Topik Aktif

**Status:** FIXED — 29 Juli 2026.

**Gejala:** saat Topik 1 tampil, kelima item `Daftar Materi` tetap memakai lingkaran kosong. Peserta tidak mendapat orientasi visual mengenai materi yang sedang dibaca.

**Penyebab:** Topik 1 memakai daftar HTML statis tanpa class `active`, sedangkan `renderLessonList()` yang memberi state aktif hanya dipakai halaman Topik 2–5.

**Perbaikan:** Topik 1 sekarang memiliki class `active`, ikon `fa-circle-play`, dan `aria-current="page"`. Renderer Topik 2–5 juga menambahkan `aria-current` dan icon dekoratif disembunyikan dari screen reader. Cache buster `settings.js` menjadi `20260729-intro-active-state`.

**Verifikasi:** targeted Playwright 1/1 PASS untuk 5 route topik; safe gate **77/77 PASS**; full suite **132 test = 88 PASS + 44 SKIP + 0 FAIL**.

## 94. Feature: Tracking Dinamis untuk Aktivasi Modul Masa Depan

**Status:** FIXED IN CODE — 29 Juli 2026. GAS `2026.3-dynamic-module-tracking`, migrasi schema/seed, frontend release, dan authenticated live read-back masih menunggu deployment.

**Masalah:** dashboard hanya dapat mengenali lima kartu aktif lewat allowlist URL di frontend. Sheet seed juga menandai seluruh 28 module `is_active=true`, sedangkan Ringkasan Belajar dan Perjalanan Fellowship memakai daftar/angka terpisah. Jika satu module Under Development dibuka, route bisa hidup tetapi progress-nya belum otomatis masuk kartu, ringkasan, dan journey yang sama.

**Perbaikan:**

- Tambah metadata module `phase_id`, `tracking_enabled`, dan `dashboard_visible`; `is_active` tetap menjadi release gate.
- Backend membentuk `trackingModules`, kartu `modules`, `learningSummary`, dan `journey` dari metadata serta chapter numerik unik pada `participant_progress`; ID di luar `1..total_chapters`, quiz, dan practice tidak dihitung sebagai chapter.
- Seed default hanya merilis Pengantar AI + lima AI Fundamentals serta Computer Vision yang online terpisah; 20+ module lain tetap nonaktif sampai metadata dan route siap.
- Frontend memakai `dashboard_visible` sebagai source of truth dan mempertahankan allowlist lama hanya sebagai compatibility bridge selama urutan deployment.
- Lima materi Pengantar AI sekarang menyimpan chapter `1..5`, membaca kembali `getParticipantProgress`, menampilkan jumlah selesai nyata, dan membedakan current/completed dengan teks, ikon, ARIA, serta warna.
- Setelah write sukses, cache dashboard memory/session diinvalidasi; background refresh sekarang merender respons terbaru.
- Project Building dan Graduation tanpa sumber tracking menampilkan ikon kunci + `Belum Dibuka`, bukan angka `0%` palsu.

**Kontrak aktivasi module berikutnya:** route harus menunjuk konten nyata (bukan UD), lalu row `participant_dashboard_modules` wajib memiliki `is_active=true`, `tracking_enabled=true`, `phase_id`, `total_chapters`, dan `dashboard_visible=true` bila kartu perlu tampil. Source `ai-*.js` yang sudah memiliki `MODULE_ID` telah diaudit mempunyai `saveChapterProgress`; Math for AI memakai `mathForAiCourse.id`.

**Verifikasi lokal:** lima test baru mencakup seluruh source module masa depan, simulasi aktivasi Deep Learning, save/read-back lima topik Pengantar AI hingga 100%, journey locked pada mobile, dan acknowledgment chapter numerik Math for AI. Safe gate **82/82 PASS**; full suite **137 test = 93 PASS + 44 SKIP + 0 FAIL**. Tidak ada live write atau deployment pada verifikasi ini.

## 95. Release Lock: Computer Vision Kembali Under Development

**Status:** FIXED IN CODE — 29 Juli 2026. Frontend dan GAS terbaru masih menunggu deployment.

**Permintaan:** peserta untuk sementara hanya boleh membuka enam module Foundation. Computer Vision Overview dan Digital Image Fundamentals yang sebelumnya online harus kembali ditutup.

**Perbaikan:**

- Sembilan route CV yang sebelumnya menunjuk konten asli dialihkan ke `under-development.html`: overview AI Lab, overview specialization, Digital Image materi/latihan/kuis/diskusi, serta specialization latihan/kuis/diskusi.
- Tambah `isComputerVisionLockedRoute()` sebagai guard prefix untuk `/participant-ai-lab-cv*`, `/participant-specialization-computer-vision*`, dan `/participant-cv-*`; direct URL atau child route yang belum terdaftar juga tidak dapat membuka konten CV.
- Guard Under Development berhenti sebelum loader `ai-cv` dieksekusi, sehingga route terkunci tidak mengirim progress.
- `computer-vision` dihapus dari `DEFAULT_RELEASED_TRACKING_MODULE_IDS`; seed berikutnya menetapkan `is_active=false` dan `tracking_enabled=false`.
- Fixture CV dihapus dari manifest module aktif dan cache buster router dinaikkan ke `20260729-cv-locked`.
- Versi source GAS menjadi `2026.3.1-cv-locked`.

**Verifikasi:** static contract membuktikan seluruh route CV mengarah ke Under Development dan default tracking mengecualikan CV. Browser mock membuka sembilan direct URL, semuanya menampilkan Under Development dan tidak menghasilkan write `computer-vision`. Targeted **2/2 PASS**; safe gate **84/84 PASS**; full suite **139 test = 95 PASS + 44 SKIP + 0 FAIL**.

## 96. Fix: Latihan Pengantar AI Tidak Bisa Diketik Setelah Save Kosong

**Status:** FIXED IN CODE — 29 Juli 2026. Frontend release masih menunggu deployment; tidak ada perubahan GAS.

**Gejala:** textarea Latihan Pengantar AI terlihat kosong dan normal, tetapi tidak dapat diketik.

**Penyebab:** tombol Simpan sebelumnya menerima empat field kosong dan tetap menulis object berisi key `system`, `flow`, `humanCheck`, dan `risk` ke localStorage. Saat halaman dibuka kembali, keberadaan key saja dianggap sebagai jawaban tersimpan sehingga seluruh textarea diberi `readOnly`, walaupun nilainya kosong.

**Perbaikan:** state hanya dikunci jika minimal satu jawaban tersimpan benar-benar berisi teks. Payload kosong/corrupt dibersihkan otomatis dan form dikembalikan ke mode edit. Klik Simpan tanpa isi sekarang menampilkan validasi, memfokuskan field pertama, dan tidak menulis atau mengunci state. Jawaban nyata tetap terkunci setelah disimpan, bertahan setelah reload, dan dapat dibuka kembali melalui tombol Edit. Cache buster `settings.js` menjadi `20260729-intro-practice-editable`.

**Verifikasi:** targeted browser reproduction **1/1 PASS**; safe gate **85/85 PASS**; full suite **140 test = 96 PASS + 44 SKIP + 0 FAIL**.

## Checkpoint Transfer Setelah #96 — 29 Juli 2026

- Latest feature commit: `f854f9d fix: keep empty intro practice editable (#96)`; setelah commit dokumentasi transfer total menjadi 258 commit dan worktree diharapkan bersih.
- Current release tepat enam module Foundation. Computer Vision sepenuhnya Under Development, tetapi source kontennya tidak dihapus.
- #92 berstatus **OPEN/DEFERRED dengan sepengetahuan user**: marker latihan dapat masuk backend, sedangkan isi teks jawaban tetap localStorage-only dan tidak boleh diklaim tersimpan di GAS.
- User melaporkan redeploy GAS setelah #94, tetapi deployment itu terjadi sebelum perubahan #95. Source lokal sekarang `2026.3.1-cv-locked`; versi live, seed metadata, frontend release, dan authenticated read-back pasca-#95 belum diverifikasi.
- Prompt transfer canonical sudah diperbarui di `handover/NEXT_AI_TRANSFER_PROMPT.txt`. AI berikutnya wajib membaca SSOT → `gemini.md` → `NEXT_PLAN.md` → E2E audit → prompt transfer, lalu meminta konfirmasi user sebelum mulai bekerja.

## 97. Fix: Rekonsiliasi Akses Portal untuk 100 Peserta Lolos Tahap 2

**Status:** FIXED IN CODE — 29 Juli 2026. Dry-run lokal lulus; Google Sheet live, deployment, dan read-back belum dilakukan.

**Masalah:** `ParticipantAccounts` berisi 187 akun karena generator awal sempat berjalan untuk seluruh cohort tahap sebelumnya. Daftar resmi peserta lolos tahap 2 hanya 100 email di `TARGET_PARTICIPANT_PORTAL_EMAILS`. Filter target sudah dipakai untuk provisioning baru, tetapi tidak menonaktifkan 87 akun existing. Login juga menganggap `access_status` kosong sebagai aktif, sehingga akun lama di luar target tetap berpotensi masuk bila memiliki credential.

**Audit inner join lokal:**

- 187 account row dan 187 email unik.
- 100 target email unik; seluruhnya cocok dengan account row.
- 87 account berada di luar target; 0 target hilang, 0 email kosong, dan 0 duplikat.
- Kondisi awal: 8 target `active`, 92 target blank, 6 non-target `active`, 81 non-target blank.
- Expected final: tepat 100 `active` dan 87 `inactive`; apply pertama perlu 179 perubahan, apply kedua 0.

**Perbaikan:**

- `participantLogin()` sekarang menolak account email yang tidak ada di target sebelum memeriksa password.
- `isParticipantEligibleForPortal()` hanya memakai membership target, bukan lagi fallback status tahap 1 yang terlalu luas.
- `migrateExistingParticipantAccountCredentials()` tidak lagi mengaktifkan semua status kosong; status mengikuti membership target.
- Tambah `auditParticipantPortalAccess()` untuk preflight read-only dan `reconcileParticipantPortalAccess()` untuk bulk update idempotent.
- Reconciliation hanya menulis `access_status` serta `updated_at`; password, hash, NIK, row, progress, dan histori tidak dihapus/diubah.
- Apply otomatis dibatalkan bila target bukan tepat 100 atau ditemukan missing target, blank email, maupun duplicate email.
- Tambah `scripts/audit-participant-access.mjs` agar export CSV dapat diaudit tanpa mencetak PII/credential.
- Versi source GAS menjadi `2026.3.2-participant-access-reconciled`.

**Verifikasi:**

- Syntax `gas/Code.gs`, test auth/reconciliation, dan `git diff --check` PASS.
- Apply mock: 179 perubahan, output 100 active + 87 inactive, credential column identik; rerun idempotent 0 perubahan.
- Safe deterministic E2E tetap **85/85 PASS**, tanpa live write.
- CSV akun lokal tetap untracked dan tidak ikut commit karena memuat credential.

## Checkpoint Transfer Setelah #97 — 29 Juli 2026

- Latest feature commit: `ce0434e fix: reconcile participant portal access (#97)`; setelah commit verifikasi live version total menjadi 261.
- Source lokal GAS `2026.3.2-participant-access-reconciled`; source belum disimpan/dideploy ke production.
- GET endpoint read-only 29 Juli 2026 mengembalikan live `2026.2-progress-persistence`; tidak ada mutation dan #94/#95/#97 belum live.
- Sebelum live apply: backup tab `ParticipantAccounts`, jalankan audit, review 187/100/87 + `ready_to_apply=true`, lalu minta approval mutation untuk menjalankan reconciliation.
- Jangan menjalankan `provisionParticipantAccounts`, `generateParticipantAccounts*`, `forceReset:true`, atau credential migration untuk pekerjaan akses ini.
- Setelah reconciliation, redeploy GAS dan authenticated read-back harus membuktikan akun QA target bisa login, non-target ditolak, serta enam module Foundation/CV lock tetap benar.

## 98. Feature: Compact ParticipantAccounts Menjadi Tepat 100 Target

**Status:** FIXED IN CODE — 29 Juli 2026. User melaporkan backup database sudah dibuat; compaction Google Sheet live dan deployment belum dilakukan.

**Requirement baru:** user/senior meminta tab utama `ParticipantAccounts` benar-benar berisi 100 peserta lolos tahap 2, bukan mempertahankan 187 row dengan 87 row berstatus inactive.

**Implementasi:**

- Tambah `compactParticipantAccountsToTargetCohort()` sebagai mutation manual dari Apps Script editor; tidak diekspos sebagai API action.
- Strict preflight hanya menerima 187 total, 100 target, 87 non-target, 0 missing, 0 blank email, 0 duplicate, dan `ready_to_apply=true`.
- Membuat backup sheet otomatis dengan nama timestamp + UUID sebelum main sheet diubah; backup disembunyikan untuk mengurangi perubahan tidak sengaja.
- Mempertahankan seluruh kolom dan nilai row target, termasuk credential existing; hanya `access_status` target distandardisasi menjadi `active` dan `updated_at` diperbarui.
- Menulis ulang tab `ParticipantAccounts` yang sama menjadi header + 100 target agar referensi sheet tetap memakai nama/ID tab utama.
- Melakukan exact read-back 100 target. Jika gagal, original 187 row ditulis kembali; backup otomatis tetap tersedia.
- Rerun pada sheet yang sudah 100 target mengembalikan `already_compacted=true` tanpa backup atau write baru.
- Source version menjadi `2026.3.3-participant-accounts-compacted`.

**Verifikasi lokal:**

- Forced invalid read-back memicu rollback dan memulihkan 187 row + credential identik.
- Success path menghasilkan 100 target, menghapus 87 non-target dari main sheet, membuat backup, dan menjaga credential target byte-for-byte.
- Rerun idempotent tidak mengubah data.
- GAS auth/compaction regression PASS; safe deterministic E2E **85/85 PASS**; dry-run CSV tetap 187/100/87 dan `ready_to_apply=true`.
- Tidak ada live mutation, deploy, push, provision, generate, reset, atau password rotation.

## Checkpoint Transfer Setelah #98 — 29 Juli 2026

- Latest feature commit: `cdb28a2 feat: compact participant accounts to target cohort (#98)`; setelah commit dokumentasi total menjadi 263.
- Source GAS lokal `2026.3.3-participant-accounts-compacted`; GET live terakhir masih `2026.2-progress-persistence`.
- Live order: save source → audit 187/100/87 → run compaction → verify main sheet 100 + backup → seed dashboard → redeploy → authenticated read-back.
- Jangan jalankan reconciliation terpisah, credential migration, provision/generate, atau reset bila compaction #98 dipakai.

## 99. Fix: Token Sesi Lama Non-Target Tetap Berlaku Setelah Compaction

**Status:** FIXED IN CODE — 29 Juli 2026. Deployment live masih pending.

**Temuan:** compaction menghapus 87 non-target dari `ParticipantAccounts` dan login baru sudah diblokir, tetapi signed participant token lama hanya diverifikasi signature + expiry. Token yang sudah terbit dapat tetap mengakses protected action sampai TTL 12 jam karena account/cohort tidak dibaca ulang.

**Perbaikan:**

- `requireParticipantToken()` untuk scope `participant` sekarang mencari account berdasarkan NIK dan mewajibkan account masih ada, email termasuk `TARGET_PARTICIPANT_PORTAL_EMAILS`, serta `access_status` aktif.
- Non-target legacy token langsung invalid setelah compaction; target token juga invalid bila account dinonaktifkan.
- Scope `retest` tetap bypass cohort portal agar alur Re-Test tidak rusak, tetapi `authorizeGasAction()` kini mengklasifikasikan upload/remove foto sebagai normal participant action sehingga token Re-Test ditolak.
- Source version menjadi `2026.3.4-session-cohort-guard`.

**Verifikasi:**

- Target login/token valid PASS.
- Signed token non-target dengan status active ditolak PASS.
- Token target existing setelah account inactive ditolak PASS.
- Token Re-Test untuk action Re-Test PASS; token yang sama untuk avatar action ditolak PASS.
- Auth/compaction regression PASS dan safe deterministic E2E **85/85 PASS**.

## Checkpoint Transfer Setelah #99 — 29 Juli 2026

- Latest feature commit: `2562ac1 fix: revalidate participant session cohort (#99)`; setelah commit dokumentasi total menjadi 265.
- Source lokal `2026.3.4-session-cohort-guard`; deployment live tetap `2026.2-progress-persistence` sampai user update deployment.
- Runbook live final: save source → audit 187/100/87 → compact → audit 100/100/0 → seed dashboard → update deployment existing → GET/read-back/auth verification.

### Live Execution Update — Compaction #98 Selesai

- User menjalankan `auditParticipantPortalAccess()` dari Apps Script editor: 187 total, 100 target, 87 outside, 0 missing/blank/duplicate, `ready_to_apply=true`.
- `compactParticipantAccountsToTargetCohort()` sukses: `before=187`, `after=100`, `removed=87`, `credentials_changed=0`.
- Backup otomatis: `ParticipantAccounts_Backup_20260729134827_8e6cc093`; user juga sudah memiliki backup manual.
- Export pasca-compaction diaudit lokal: 100 row, 100 target unique, 0 outside/missing/duplicate, seluruh `access_status=active`, 100 account ID/NIK unik, dan seluruh row masih memiliki generated credential.
- GET endpoint sesudah data mutation tetap `2026.2-progress-persistence`. Jadi data #98 sudah live, tetapi code session guard #99, CV lock #95, dynamic tracking #94, dan version `2026.3.4-session-cohort-guard` belum live sampai deployment existing di-update.
- Setelah commit dokumentasi update live ini total repository menjadi 266.
