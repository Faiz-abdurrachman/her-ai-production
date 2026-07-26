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

## 49. Issue: Score Semantics Berbeda Antar Module (DEFERRED)

**Deskripsi:**
`ai-math-for-ai.js` menghitung score sebagai persentase (0-100), sedangkan 27 module lainnya menghitung raw count (0-20). GAS menyimpan apa adanya — ini akan menjadi masalah saat dashboard menampilkan score.

**Status:** Deferred. Fix saat dashboard score display diimplementasikan.

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

## Playwright E2E Testing

**Deskripsi:**
Menambahkan Playwright e2e test suite (13 test) untuk memvalidasi fungsionalitas utama.

**Setup:**
- Install `@playwright/test` + Chromium browser
- `playwright.config.js`: headless Chromium, baseURL `http://127.0.0.1:3000`
- `e2e/fellow-dashboard.spec.js`: 13 tests

**Test Results (13/13 PASS):**
- Public Pages (4): Home page, login gate, register, modules catalog ✅
- Login Validation (2): Empty NIK, invalid NIK format ✅
- Authenticated Flow (5): Login session, dashboard greeting, settings, password page, module nav ✅
- Error Handling (2): GAS down, 404 route ✅

**Critical debug findings during testing:**
1. Portal login form uses `#profileNik` / `#profilePassword` (NOT `#participantNik`)
2. `participantPortalOpen` di sheet Settings harus lowercase `true` (string `TRUE` gagal — `JSON.parse("TRUE")` throws, value jadi string `"TRUE"` ≠ boolean `true`)
3. Fresh browser localStorage kosong → `getGlobalSettings()` return default `participantPortalOpen: false` → portal gate muncul. Solusi: `primeSettings()` helper inject localStorage sebelum navigasi.

**Run command:**
```bash
TEST_PARTICIPANT_NIK="..." TEST_PARTICIPANT_PASSWORD="..." npx playwright test
```

---

## Session Summary — 27 Juli 2026 (Sisyphus — Extended)

**Total commits sesi sebelumnya:** 25 | **Total commits sesi ini:** 7 | **Grand total:** 32
**Bugs fixed sesi ini:** #45-#51 (7 issues)
**Files changed sesi ini:** 36 files, +485/-23

**Key deliverables sesi ini:**
- #1: seedDashboardDiscussions idempotent (addRowObject → upsertByKey) ✅
- #45: Quiz wiring — 28 module JS + 1 settings.js handler ✅
- #46: 19 cache busters added to index.html ✅
- #48: 2 duplicate script entries removed ✅
- #50: ai-intro quiz wiring (missed by ai-*.js scan) ✅
- #51: Practice/latihan wiring — 28 module JS ✅
- Playwright e2e: 13/13 tests PASS ✅

**Session Rules (WAJIB — berlaku untuk semua AI session):**
1. Commit PER FITUR, bukan satu commit besar
2. Update handover & gemini.md setiap checkpoint
3. Catat bug baru dengan nomor #52+
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
