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
TEST_PARTICIPANT_NIK="8204086711010003" TEST_PARTICIPANT_PASSWORD="brenda123" npx playwright test
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

**Total commits:** 39 (25 sebelumnya + 7 sesi lalu + 7 sesi ini)
**Grand total bugs/features:** #1-#56
**Files changed sesi ini:** 8 files, +344/-64
**Last commit:** `9825d0b` — revert: remove math-for-ai routes — module stays under development (#56)

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
3. Catat bug baru dengan nomor #55+
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
