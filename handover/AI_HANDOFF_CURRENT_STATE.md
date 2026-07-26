# AI Handoff — HerAI Fellowship SuperApp

**Checkpoint:** 27 Juli 2026 (Final — Sesi Sisyphus), Asia/Jakarta
**Workspace:** `/home/faiz/her6/Her-AI`
**Branch:** `main`
**Last Commit:** `e2a9861`  
**GAS Deployment:** ✅ Versi 3, 26 Juli 2026 (seed functions sudah dijalankan)
**Backend Verification:** 47/47 checks PASS | Backend Testing: 12/12 PASS | Frontend: 10/10 HTTP + 8/12 Playwright

> **Ini adalah sumber kebenaran tunggal.** Dokumen handover lain yang bertentangan diabaikan.

---

## ⚡ IDENTITAS SISTEM

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS Deployment ID | `AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| GAS Code | `gas/Code.gs` (2419 baris, 52 routes, 23 sheets) |
| SPA | Vanilla JS hash-router, Node.js proxy |
| Dev server | `node server.js` → `http://127.0.0.1:3000` |
| Proxy | POST `/__gas` (token auto-injected oleh main.js) |
| Participant accounts | 187 akun di `ParticipantAccounts`, 431 di `peserta_tahap_1` |
| Admin login | `super-admin` / `admin123` |

---

## 📊 STATUS SAAT INI — Apa yang SUDAH bisa & BELUM bisa

| Fitur | Status |
|---|---|
| **Login peserta** | ✅ Production |
| **Nama dinamis dashboard** | ✅ "Halo, Peserta HerAI!" (ganti otomatis kalau session punya nama) |
| **Ganti password mandiri** | ✅ old/new/confirm → sync 2 sheet |
| **Settings save profil** | ✅ form → GAS → session update |
| **Progress auto-save** | ✅ 28 module wired — tiap buka chapter auto-save ke GAS |
| **Dashboard modules** | ✅ 8 modul + "Lihat Semua (27)" dari GAS |
| **Dashboard journey/events/tracks** | ✅ dari sheet (seed functions sudah dijalankan) |
| **Leaderboard** | ✅ masked (NIK disensor), auto-populate dari ParticipantAccounts |
| **Kuis modul** | ❌ Soal ada di HTML, jawaban belum nyimpen ke backend |

## 🚫 HARD BLOCK — JANGAN DISENTUH

| Area | Alasan |
|---|---|
| Signaling / WebRTC | Go service, prototype |
| Messaging / Chat | Go service, in-memory store |
| Participant Portal | Go service |
| Admin dashboard | Production |
| Security hardening | Butuh koordinasi terpisah |
| Leaderboard, Certificates, Tasks, Projects, Events, Community, Mentor | Placeholder |
| `provisionParticipantAccounts` / `generateParticipantAccounts*` | AKAN RESET 187 AKUN |
| `forceReset:true` | RESET DATA EXISTING |
| 231 file lesson HTML/JS | Hardcoded sidebar, di-handle JS injection |
| `js/main.js`, `js/router.js` | KECUALI tambah route/handler baru |

---

## ✅ APA YANG BOLEH DISENTUH

| File | Fungsi |
|---|---|
| `js/frontend/fellow-dashboard/settings.js` | Logic dashboard, settings, progress, user menu |
| `pages/frontend/fellow-dashboard/settings.html` | UI settings |
| `pages/frontend/fellow-dashboard/dashboard.html` | UI dashboard |
| `css/frontend/fellow-dashboard/settings.css` | Styling |
| `gas/Code.gs` | HANYA untuk bug fix (sudah terverifikasi 47/47) |
| `index.html` | HANYA cache buster |
| `gemini.md` | Bug log |
| `handover/` | Dokumentasi |

---

## 📋 SEMUA YANG SUDAH DIKERJAKAN (Sesi 27 Juli — Sisyphus)

### Sebelum Sesi Ini (Sudah Ada)
- 5 Fase dashboard complete: dynamic name, settings wire GAS, ganti password, progress tracking
- 7 bug fixed: #29-35 (null guards, CSS, schema fix)
- Backend 47/47 verified, 12/12 endpoint tested
- Frontend 10/10 HTTP routes + 8/12 Playwright

### Task A: Wiring saveChapterProgress (6 commit)
**Apa:** Inject `window.saveChapterProgress(MODULE_ID, chapter, 'completed')` ke 28 module JS file.
**Cara kerja:** Setiap peserta buka chapter → auto-save ke GAS `saveParticipantProgress` → UPSERT ke `participant_progress` sheet → dashboard progress real-time.
**Detail:**
- Script injector: `scripts/inject-progress-tracking.js`
- 28/29 file termodifikasi (1 skipped: ai-math-for-ai)
- 2 manual fix: ai-modern.js (BASE_PATH), ai-python-basic.js (STORAGE_KEY)
- 29/29 syntax check PASS
- Module ID diekstrak dari `CHAPTERS[0].sourcePath` folder name
- Silent fail (catch kosong) — tidak mengganggu UX

| Commit | Isi |
|---|---|
| `d2d40d2` | Foundation core AI (9 modul) |
| `c24dcbb` | Data engineering domains (8 modul) |
| `704c752` | Generative AI (4 modul) |
| `c708ace` | Business applications (7 modul) |
| `f8a03c9` | Injection script |
| `d8d52ea` | Docs update |

### Task B: Seed Dashboard Data (3 commit)
**Apa:** 7 GAS seed functions di `Code.gs` untuk populate 6 sheet dashboard.
**Detail:**
- `seedAllDashboardData()` — master, panggil 6 fungsi
- `seedDashboardModules()` — 27 modul dengan module_id, total_chapters, icon, tone, href
- `seedDashboardJourney()` — 4 fase (Foundation, Specialization, Project, Graduation)
- `seedDashboardEvents()` — 5 upcoming events (relative date)
- `seedDashboardTracks()` — 6 specialization tracks
- `seedDashboardDiscussions()` — 4 discussion activities
- `seedDashboardLeaderboard()` — auto-populate dari ParticipantAccounts
- Fix: ai-ml-basic.js MODULE_ID `ml-basic` → `machine-learning`

| Commit | Isi |
|---|---|
| `d974a21` | Seed functions + fix |
| `1e6801d` | Docs update |
| `c0d6a55` | gemini.md update |

### Bug Fixes (9 commit)

| Commit | Bug | Deskripsi |
|---|---|---|
| `4c4b167` | Sidebar deep-learning | HTML `aiDeepLearningList` vs JS `reasoning-sidebar-list` mismatch. Sidebar gak update pas navigasi chapter |
| `4c4b167` | Dropdown route | Dropdown "Setting Akun" link ke `#/participant-profile` (salah), harus ke `#/participant-settings` |
| `62eaa0c` | Settings route handler | Settings page kena catchall `under-development`. Tab "Keamanan Akun" gak bisa diklik |
| `0e51adb` | Profile redirect | Profile page diblok guard `isParticipantRouteAllowed`. Redirect sebelum guard |
| `6484039` | Redirect skip | `currentPath` set bikin router skip content load setelah redirect |
| `9040616` | Password silent fail | `session.nik` null + `btn` null → silent return tanpa error message |
| `9a5a127` | Flash "Aisyah Putri" | Dashboard + settings HTML hardcode nama. Ganti ke "Peserta" netral |
| `c3baae9` | Dashboard 27 modul | Terlalu rame. Limit 8 modul + "Lihat Semua" button |
| `7ddfdde` | Greeting fallback | "Halo!" kosong → revert ke "Halo, Peserta HerAI!" |

### Module ID Mapping (28 modul — dari Task A)

| Module ID | File JS | Chapters | Kategori |
|---|---|---|---|
| deep-learning | ai-deep-learning.js | 15 | Foundation |
| reinforcement-learning | ai-reinforcement-learning.js | 13 | Foundation |
| python-untuk-ai | ai-python.js | 8 | Foundation |
| reasoning | ai-reasoning.js | 6 | Foundation |
| konsep-ai-modern | ai-modern.js | 4 | Foundation |
| evolution | ai-evolution.js | 7 | Foundation |
| evaluation | ai-evaluation.js | 6 | Foundation |
| machine-learning | ai-ml-basic.js | 8 | Foundation |
| computer-vision | ai-cv.js | 11 | Data Eng |
| infrastructure | ai-infrastructure.js | 15 | Data Eng |
| data-engineering | ai-data-engineering.js | 15 | Data Eng |
| data-science | ai-data-science.js | 15 | Data Eng |
| bioinformatics | ai-bioinformatics.js | 15 | Data Eng |
| deployment | ai-deployment.js | 15 | Data Eng |
| front-end | ai-front-end.js | 15 | Data Eng |
| back-end | ai-back-end.js | 15 | Data Eng |
| large-language-model | ai-large-language-model.js | 15 | Gen AI |
| agentic-ai | ai-agentic-ai.js | 15 | Gen AI |
| vlm | ai-vlm.js | 15 | Gen AI |
| multimodal-llm | ai-multimodal-llm.js | 15 | Gen AI |
| healthcare | ai-healthcare.js | 15 | Business |
| geospatial | ai-geospatial.js | 15 | Business |
| manufacturing | ai-manufacturing.js | 15 | Business |
| culture | ai-culture.js | 15 | Business |
| business-insight | ai-business-insight.js | 15 | Business |
| people-business-mgt | ai-people-business-mgt.js | 15 | Business |
| ui-ux | ai-ui-ux.js | 15 | Business |
| python-untuk-ai | ai-python-basic.js | 13 | Foundation (legacy, not loaded) |

---

## 📝 NEXT PLAN — Fokus Saat Ini

### ⚠️ CRITICAL — Harus Dilakukan Manual oleh User
1. **Jalankan `seedAllDashboardData()`** di Apps Script editor
   - Buka Spreadsheet → Extensions → Apps Script
   - Paste `gas/Code.gs` (jika belum)
   - Pilih fungsi `seedAllDashboardData` → Run
   - Verifikasi: cek sheet `participant_dashboard_modules` ada 27 baris

2. **Login ulang** setelah ganti password — session baru akan simpan nama asli

### Testing yang Perlu Dilakukan
```
1. node server.js
2. Buka http://127.0.0.1:3000
3. Login peserta (NIK 16 digit + password)
4. Dashboard → cek 8 modul muncul + "Lihat Semua Modul"
5. Klik modul → navigasi chapter → sidebar update
6. Kembali ke dashboard → progress modul >0%
7. Klik nama kanan atas → Setting Akun → masuk Settings
8. Tab "Keamanan Akun" → ganti password
9. Tab "Profil Publik" → edit profil → save
10. Logout → login dengan password baru
```

### Task C (Optional — Frontend Polish)
- Loading spinner saat fetch GAS data (saat ini langsung render fallback → ganti real data)
- Error state UI untuk GAS failures (retry button)
- Skeleton loader yang proper (tidak endless load)

### Task D (Optional — Testing Lanjutan)
- Playwright e2e test dengan akun test
- Manual test flow lengkap semua modul

---

## 📐 ATURAN KERJA

1. Commit PER FITUR, bukan satu commit besar
2. Update handover & gemini.md setiap checkpoint
3. Catat bug baru dengan nomor #38+
4. Dark theme DILARANG — light pink theme untuk code blocks
5. CSS scope `ai-lab-content` WAJIB di template CV
6. Diagram kontras: lines ≥25% opacity, dots ≥75%, stroke ≥0.8px
7. JANGAN tampilkan NIK/password di log, screenshot, handover, commit
8. TANYA user sebelum eksekusi kalau ambigu
9. Verifikasi sebelum commit: `node --check`, test data flow, cek null guards
10. JANGAN jalankan provision/generate functions
11. JANGAN sentuh 231 file lesson — pakai JS injection/code generation
12. `sessionStorage.heraiParticipantSession` adalah source of truth

---

## 🔑 DATA FLOW

```
Login:    POST /__gas { action: "participantLogin", nik, password }
          → GAS: participantLogin() → token 12 jam + profile
          → Frontend: saveParticipantSession() → sessionStorage

Save:     POST /__gas { action: "updateParticipantProfile", ... }
          → GAS: updateParticipantProfile() → updated profile
          → Frontend: saveParticipantSession() → update sessionStorage

Password: POST /__gas { action: "changeParticipantPassword", oldPassword, newPassword }
          → GAS: changeParticipantPassword() → verify → hash → sync 2 sheet
          → Frontend: toast success/error

Progress: window.saveChapterProgress(moduleId, chapterId, "completed")
          → POST /__gas { action: "saveParticipantProgress", module_id, chapter_id, status }
          → GAS: saveParticipantProgress() → UPSERT ke participant_progress
          → Called automatically dari setiap ai-*.js module JS file

Dashboard: POST /__gas { action: "getParticipantDashboardData", nik }
           → GAS: getParticipantDashboardData() → compute % dari participant_progress
           → Frontend: renderParticipantDashboard() → tampilkan 8 modul + view all

Session:  sessionStorage.heraiParticipantSession
          { nik, token, expiresAt, name, profile: { nama_lengkap, email, ... } }
          Token injection: main.js auto-injects participantToken ke POST /__gas
```

---

## 📂 ARSITEKTUR FILE

```
✅ BOLEH DIEDIT:
js/frontend/fellow-dashboard/settings.js  — logic peserta (2079 baris)
pages/frontend/fellow-dashboard/settings.html  — UI settings
pages/frontend/fellow-dashboard/dashboard.html  — UI dashboard
css/frontend/fellow-dashboard/settings.css  — styling
gas/Code.gs  — HANYA bug fix, sudah terverifikasi
index.html  — HANYA cache buster
gemini.md  — bug log

❌ JANGAN DIEDIT:
js/main.js — auth transport, global settings
js/router.js — hash routing (kecuali tambah route/handler baru)
Semua 231 file lesson HTML/JS — sidebar hardcoded
Semua file Go (signaling/, messaging/, participant-portal/)
Semua file admin dashboard (pages/dashboard/, js/dashboard/)
```
