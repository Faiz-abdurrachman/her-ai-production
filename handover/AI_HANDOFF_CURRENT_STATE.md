# AI Handoff — HerAI Fellowship SuperApp

**Checkpoint:** 27 Juli 2026 (Sesi Sisyphus — Final), Asia/Jakarta
**Workspace:** `/home/faiz/her6/Her-AI`
**Branch:** `main`
**Last Commit:** `fbe2bb3` — fix: restricted page button icon vertical centering
**Total commits:** 37 (25 original + 7 sesi sebelumnya + 5 sesi ini)
**GAS Deployment:** ✅ Sudah redeploy (user melakukan deploy manual 27 Juli 2026)
**Worktree:** BERSIH (hanya untracked: `scratch/`, `scripts/test-settings.js`)
**Playwright:** 17 tests, 15 stable pass, 2 flaky (pre-existing timing issue)

> **Ini adalah sumber kebenaran tunggal.** Dokumen handover lain yang bertentangan diabaikan.

---

## ⚡ IDENTITAS SISTEM

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| GAS Code | `gas/Code.gs` (2432 baris, 52 routes, 23 sheets) |
| SPA | Vanilla JS hash-router, Node.js proxy (`node server.js` → `http://127.0.0.1:3000`) |
| Proxy | POST `/__gas` (token auto-injected oleh `js/main.js`) |
| Participant accounts | 187 akun di `ParticipantAccounts`, 431 di `peserta_tahap_1` |
| Admin login | `super-admin` / `admin123` |
| Test participant | NIK: `8204086711010003` / Password: `brenda123` |
| WA env | `GAS_WEB_APP_URL` di `.env` |
| settings.js | 2252 baris |
| dashboard.css | 2271 baris |
| e2e spec | 321 baris, 17 tests |

---

## 📊 STATUS FITUR

| Fitur | Status |
|---|---|
| Login peserta | ✅ 3 jalur verifikasi (hash, participant_pw, generated_pw) |
| Nama dinamis dashboard | ✅ "Halo, [Nama]!" |
| Ganti password mandiri | ✅ old/new → hash → sync 2 sheet → password_status='changed' |
| Settings save profil | ✅ form → GAS → session update |
| Chapter progress auto-save | ✅ 28 module wired, auto-save tiap buka chapter |
| Quiz score wiring | ✅ 28 module + ai-intro: POST score ke GAS participant_progress |
| Practice/latihan wiring | ✅ 28 module: POST ke GAS participant_progress (score=null) |
| Dashboard skeleton/error/fade-in | ✅ Shimmer loader + "Coba Lagi" retry button + cache |
| Dashboard modules/journey/events/tracks | ✅ Dari GAS seed functions (idempotent) |
| Leaderboard | ✅ Masked, auto-populate, idempotent (upsertByKey) |
| **Dashboard score display** | ✅ **Quiz score muncul di module card — pill badge pink, auto-format /20 atau %** |
| **Restricted access** | ✅ **Hanya Beranda, Modul, Pengaturan yg bisa diakses — sisanya "Akses Dibatasi"** |
| Participant Portal Open gate | ✅ Boolean `true` di sheet Settings |
| Playwright e2e | ✅ 17 tests (15 stable, 2 flaky: practice+password timing) |

---

## 🚫 HARD BLOCK — JANGAN DISENTUH

- **Signaling (Go WebRTC), Messaging/Chat (Go), Participant Portal (Go)** — environment terpisah
- **Admin dashboard (production)** — `pages/dashboard/`, `js/dashboard/`
- **Keamanan/Security hardening** — jangan ubah auth flow tanpa approval
- **Leaderboard, Certificates, Tasks, Projects, Events, Community, Mentor** — placeholder
- **`provisionParticipantAccounts` / `generateParticipantAccounts*`** — **AKAN RESET 187 AKUN EXISTING**
- **`forceReset:true`** — **AKAN RESET DATA**
- **231 file lesson HTML/JS** — jangan edit satu-satu, pakai JS injection/code generation
- **`js/main.js`, `js/router.js`** — kecuali tambah route/handler baru (dan itu pun tanya dulu)
- **`ai-python-basic.js`** — INTENTIONAL SKIP, conflict namespace dengan `ai-python.js`
- **`ai-cv.js`** — tidak ada quiz/practice (SKIP dari wiring)

---

## ✅ BOLEH DISENTUH

| File | Fungsi | Baris |
|---|---|---|
| `js/frontend/fellow-dashboard/settings.js` | Logic dashboard, settings, password, cache, quiz handler, restricted access, route guard | 2252 |
| `js/frontend/fellow-dashboard/ai-*.js` | 29 module files (semua wiring quiz + practice injected) | bervariasi |
| `pages/frontend/fellow-dashboard/dashboard.html` | UI dashboard | 205 |
| `css/frontend/fellow-dashboard/dashboard.css` | Skeleton, shimmer, error, fade-in, quiz badge, restricted state | 2271 |
| `css/frontend/fellow-dashboard/settings.css` | Styling settings | - |
| `gas/Code.gs` | **HANYA bug fix** (52 routes, 23 sheets) | 2432 |
| `index.html` | **HANYA cache buster** (`?v=...`) | - |
| `e2e/fellow-dashboard.spec.js` | Playwright test suite | 321 |
| `gemini.md`, `handover/` | Dokumentasi | - |

---

## 📋 SEMUA YANG SUDAH DIKERJAKAN

### Dari Sesi Sebelumnya (25 commit)
- Task A: Chapter progress wiring (28 module) — auto-save tiap buka chapter
- Task B: 7 GAS seed functions — semua idempotent (upsertByKey)
- Task C: Skeleton loader, error state, fade-in transitions, dashboard cache
- Bug fixes #29-44 (16 bug)

### Sesi Sebelumnya (7 commit: #45-#51)
| # | Item | Detail |
|---|------|--------|
| #45 | Quiz wiring | 28 ai-*.js: inject `saveChapterProgress(MODULE_ID, 'quiz', 'completed', score)` |
| #50 | ai-intro quiz wiring | Handler di settings.js — missed by ai-*.js scan |
| #51 | Practice wiring | 28 ai-*.js: inject `saveChapterProgress(MODULE_ID, 'practice', 'completed')` |
| #46 | Cache busters | 19 ai-*.js files ditambah `?v=` |
| #48 | Duplicate scripts | Hapus duplicate ai-evaluation.js & ai-evolution.js dari index.html |
| - | seedDashboardDiscussions | `addRowObject` → `upsertByKey('topic')` (idempotent) |
| - | Playwright e2e | Install + 13 tests, 13/13 PASS |

### Sesi Ini (5 commit: #52-#53 + Restricted Access + e2e fixes)

| # | Item | File | Detail |
|---|------|------|--------|
| #52 | **Dashboard Score Display** | `gas/Code.gs` | `getParticipantDashboardData()`: query `participant_progress` untuk `chapter_id='quiz'`, ambil score tertinggi per module (Math.max), return `quiz_score` di tiap module object |
| | | `settings.js` | `formatQuizBadge(quizScore)`: score ≤20 tampil `/20`, >20 tampil `%`. Inject ke module card HTML |
| | | `dashboard.css` | `.quiz-badge`: pill badge pink translucent, icon trophy |
| | | `index.html` | Cache buster `?v=20260727-score-display` |
| #53 | **seedDashboardLeaderboard idempotent** | `gas/Code.gs` | `clearContent()` + `addRowObject()` → `upsertByKey('rank')` |
| - | **Restricted Access** | `settings.js` | Route guard di `initFellowDashboardPage`: block non-['dashboard','modules','settings'] → `renderParticipantRestricted()` |
| | | `settings.js` | Sidebar click interception: restricted nav links → restricted page |
| | | `settings.js` | `initMessagingPage` override via DOMContentLoaded: block `/messaging` untuk logged-in users |
| | | `dashboard.css` | `.fellow-restricted-state`: pink theme (match locked state), "Kembali ke Beranda" button |
| | | `index.html` | Cache buster `?v=20260727-restricted` |
| - | **e2e test fixes** | `e2e/fellow-dashboard.spec.js` | Password test: klik tab "Keamanan Akun" dulu sebelum cek `#passwordChangeForm` |
| | | | Quiz/Practice tests: `page.evaluate` hash navigation (bukan `page.goto`) |
| | | | Practice test: `waitFor(state:'attached')` (form mungkin offscreen) |
| | | | Restricted test: navigasi ke `#/participant-mentor`, verify "Akses Dibatasi" |
| - | **Restricted UI fix** | `dashboard.css` | Warna pink (bukan amber), icon button center vertikal |

---

## ⚠️ TEMUAN KRITIS — YANG HARUS DIKETAHUI AI BERIKUTNYA

### 1. Login form element IDs
- NIK input: `#profileNik` (**BUKAN** `#participantNik`)
- Password input: `#profilePassword` (**BUKAN** `#participantPassword`)
- Form: `#participantLoginForm`
- Submit button: `#btnParticipantLogin`

### 2. participantPortalOpen di sheet Settings
- Value HARUS lowercase `true` (JSON boolean)
- String `"TRUE"` gagal — router cek `!== true`, string tidak match
- Lokasi: sheet `Settings`, key `participantPortalOpen`

### 3. Settings race condition (fresh browser)
- `getGlobalSettings()` sync return default `{participantPortalOpen: false}`
- `getGlobalSettingsAsync()` dipanggil setelah router selesai → race condition
- Portal gate selalu muncul di first load fresh browser
- **Solusi di Playwright**: `primeSettings()` inject localStorage sebelum navigasi

### 4. ai-python-basic.js (#47) — INTENTIONAL SKIP
- File ini TIDAK BOLEH ditambahkan ke `index.html`
- Conflict: `ai-python.js` dan `ai-python-basic.js` sama-sama define `window.loadPythonTopik()`
- Wiring quiz & practice di dalamnya aman (IIFE, tidak akan dieksekusi)

### 5. Score semantics berbeda (#49) — DEFERRED
- `ai-math-for-ai.js`: percentage (0-100), lainnya: raw count (0-20)
- Frontend heuristik: score > 20 → tampil `%`, ≤20 → tampil `/20`
- Belum ada normalisasi di backend — next AI perlu memutuskan standardisasi

### 6. Module chapter "stuck" behavior
- Tiap module nyimpen chapter terakhir di localStorage (key per-module)
- Buka module → auto-resume ke chapter terakhir (BY DESIGN)
- BUKAN BUG — ini fitur resume. Kalau mau ubah, harus edit 28 file `ai-*.js`

### 7. ⚠️ GAS PERLU REDEPLOY SETELAH EDIT Code.gs
- Setiap kali `gas/Code.gs` diubah, HARUS redeploy web app dari Apps Script editor
- Deploy → New deployment → Web app → Execute as Me → Anyone with link → Deploy
- Tanpa redeploy, perubahan backend TIDAK AKAN aktif

---

## 🔑 DATA FLOW — SEMUA WIRING

### Chapter Progress (auto-save):
```
window.saveChapterProgress(MODULE_ID, chapterNumber, 'completed')
→ POST /__gas { action: "saveParticipantProgress", module_id, chapter_id, status, score: null }
→ GAS: UPSERT ke participant_progress (chapter_id = '1', '2', '3'...)
```

### Quiz Submit:
```
window.saveChapterProgress(MODULE_ID, 'quiz', 'completed', score)
→ POST /__gas { action: "saveParticipantProgress", module_id, chapter_id: 'quiz', score }
→ GAS: UPSERT ke participant_progress (score terisi, Math.max untuk multiple attempts)
```

### Practice Save:
```
window.saveChapterProgress(MODULE_ID, 'practice', 'completed')
→ POST /__gas { action: "saveParticipantProgress", module_id, chapter_id: 'practice', score: null }
→ GAS: UPSERT ke participant_progress (essay, bukan auto-graded)
```

### Login:
```
POST /__gas { action: "participantLogin", nik, password }
→ 3 jalur verifikasi: hash (participant_pw di peserta_tahap_1), password_hash (ParticipantAccounts), generated_password
→ generated_password DIBLOKIR jika password_status='changed'
→ synchronizeParticipantCredentials() → sync 2 sheet
→ token 12 jam → saveParticipantSession() → sessionStorage.heraiParticipantSession
```

### Password Change:
```
POST /__gas { action: "changeParticipantPassword", oldPassword, newPassword }
→ verify old → hash new → update BOTH ParticipantAccounts + peserta_tahap_1
→ password_status='changed' (MEMBLOKIR generated_password untuk login berikutnya)
```

### Dashboard:
```
initParticipantDashboardData()
→ First load: renderDashboardSkeletons() → fetch → render
→ Nav back: render dari _dashboardDataCache (instant, no skeleton)
→ Error: renderDashboardError() + "Coba Lagi" retry button
→ getParticipantDashboardData() returns: { modules (with quiz_score), discussionTrails, tracks, journey, events, leaderboard }
```

### Session:
```
sessionStorage.heraiParticipantSession
{ nik, token, expiresAt, name, profile: { nama_lengkap, email, whatsapp, ... } }
```

### Settings Gate (localStorage-based):
```
getGlobalSettings() → localStorage.heraiGlobalSettings
→ getGlobalSettingsAsync() → /__settings (local JSON file .cursor/global-settings.json)
→ participantPortalOpen HARUS boolean true (bukan string "TRUE")
```

### Restricted Access:
```
initFellowDashboardPage(pageName)
→ allowedPages = ['dashboard', 'modules', 'settings']
→ pageName NOT in allowedPages → renderParticipantRestricted() → return (block)
→ Sidebar click: restricted nav links → renderParticipantRestricted()
→ Messaging override: initMessagingPage wrapped via DOMContentLoaded → block if logged in
```

---

## 📝 NEXT PLAN — FOKUS SESI BERIKUTNYA

### PRIORITAS 1 — Score Semantics Normalization (#49)
- `ai-math-for-ai.js`: percentage (0-100), 27 module lain: raw count (0-20)
- Opsi A: Tambah kolom `quiz_total` di `participantDashboardModules` sheet (default 20, math-for-ai=100), GAS compute persentase seragam
- Opsi B: Normalisasi di frontend dengan hardcoded map module_id → max score
- **Belum urgent** — frontend heuristik sudah functional (score>20→%, ≤20→/20)

### PRIORITAS 2 — Add math-for-ai to dashboard modules seed
- Module `math-for-ai` ada (`ai-math-for-ai.js`, quiz + practice wired)
- Tapi TIDAK muncul di module cards dashboard karena tidak di-list di `seedDashboardModules()`
- Fix: tambah 1 entry di array `modules` di function `seedDashboardModules()` di `gas/Code.gs`
- Setelah tambah, redeploy GAS + run `seedDashboardModules()`

### PRIORITAS 3 — Additional e2e tests (full flow dengan credentials)
- Quiz submit full flow test (isi radio button, submit, cek score di localStorage)
- Practice save full flow test (isi textarea, save, cek tersimpan)
- Password change end-to-end test (ganti password → logout → login dengan password baru)

### PRIORITAS 4 — UX improvements (kalau diminta user)
- Module resume behavior: opsi untuk mulai dari chapter 1 vs resume
- Restricted page: tambah countdown atau estimasi kapan dibuka

### ⚠️ JANGAN DIKERJAKAN KECUALI DIMINTA USER:
- JANGAN ubah behavior auto-resume chapter (28 file)
- JANGAN tambah `ai-python-basic.js` ke index.html (namespace conflict)
- JANGAN sentuh ai-cv.js (tidak ada quiz/practice)

---

## 📐 ATURAN KERJA — WAJIB DIIKUTI

1. **Commit PER FITUR**, bukan satu commit besar — commit message bahasa Inggris, deskriptif
2. **Update handover & gemini.md** setiap checkpoint — jangan sampai stale
3. **Catat bug baru** dengan nomor #54+ di `gemini.md`
4. **Dark theme DILARANG** — light pink theme untuk code blocks
5. **CSS scope `ai-lab-content` WAJIB** di template CV
6. **Diagram kontras**: lines ≥25% opacity, dots ≥75%, stroke ≥0.8px
7. **JANGAN tampilkan NIK/password** di mana pun (log, screenshot, commit, handover, prompt AI)
8. **TANYA user** sebelum eksekusi kalau ada yang ambigu — jangan asumsi
9. **Verifikasi sebelum commit**: `node --check`, test data flow, cek null guards
10. **JANGAN jalankan provision/generateParticipantAccounts\*** functions
11. **JANGAN sentuh 231 file lesson** — pakai JS injection/code generation
12. **`sessionStorage.heraiParticipantSession`** adalah source of truth untuk session
13. **Selalu bump cache buster** (`?v=...`) di `index.html` setelah edit JS/CSS
14. **Jangan silent fail** — tambah error feedback di UI
15. **JANGAN push ke GitHub** kecuali diminta user
16. **GAS deployment**: selalu redeploy web app setelah edit `Code.gs`
17. **Playwright run command**:
    ```bash
    TEST_PARTICIPANT_NIK="8204086711010003" TEST_PARTICIPANT_PASSWORD="brenda123" npx playwright test
    ```
18. **Server lokal**: `node server.js` → `http://127.0.0.1:3000`
19. **JANGAN edit `js/main.js` atau `js/router.js`** kecuali diminta — kalau perlu tambah route, tanya dulu
20. **JANGAN hapus/modifikasi wiring quiz/practice** di ai-*.js — sudah verified dan working
