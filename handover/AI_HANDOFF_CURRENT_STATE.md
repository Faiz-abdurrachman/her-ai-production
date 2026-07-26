# AI Handoff — HerAI Fellowship SuperApp

**Checkpoint:** 27 Juli 2026 (Final — Sesi Sisyphus), Asia/Jakarta
**Workspace:** `/home/faiz/her6/Her-AI`
**Branch:** `main`
**Last Commit:** `b263612` — fix: change password_status to 'changed' (#44b)
**Total commits sesi ini:** 25
**GAS Deployment:** ⚠️ PERLU REDEPLOY — Versi 4 (27 Juli 2026)
**Worktree:** BERSIH (hanya untracked `scratch/`, `test-results/`, `scripts/test-settings.js`)
**Backend:** 47/47 checks PASS | GAS: 52 routes, 23 sheets | Frontend: 10/10 HTTP

> **Ini adalah sumber kebenaran tunggal.** Dokumen handover lain yang bertentangan diabaikan.

---

## ⚡ IDENTITAS SISTEM

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| GAS Code | `gas/Code.gs` (~2420 baris, 52 routes, 23 sheets) |
| SPA | Vanilla JS hash-router, Node.js proxy |
| Dev server | `node server.js` → `http://127.0.0.1:3000` |
| Proxy | POST `/__gas` (token auto-injected oleh main.js) |
| Participant accounts | 187 akun di `ParticipantAccounts`, 431 di `peserta_tahap_1` |
| Admin login | `super-admin` / `admin123` |
| WA env | `GAS_WEB_APP_URL` di `.env` — wajib set untuk `/__gas` proxy |

---

## 📊 STATUS FITUR

| Fitur | Status |
|---|---|
| **Login peserta** | ✅ Production — 3 jalur verifikasi (hash, participant_pw, generated_pw) |
| **Nama dinamis dashboard** | ✅ "Halo, Peserta HerAI!" (ganti otomatis kalau session punya nama) |
| **Ganti password mandiri** | ✅ old/new → hash → sync 2 sheet (`ParticipantAccounts` + `peserta_tahap_1`). `password_status='changed'` memblok `generated_password` |
| **Settings save profil** | ✅ form → GAS → session update |
| **Progress auto-save** | ✅ 28 module wired — tiap buka chapter auto-save ke GAS |
| **Dashboard modules** | ✅ 8 modul + "Lihat Semua (27)" dari GAS. Skeleton loader + error state + retry |
| **Dashboard journey/events/tracks** | ✅ dari sheet (seed functions sudah dijalankan) |
| **Leaderboard** | ✅ masked (NIK disensor), auto-populate dari ParticipantAccounts |
| **Dashboard cache** | ✅ Data di-cache di `_dashboardDataCache` — navigasi balik tidak re-fetch |
| **Dashboard skeleton** | ✅ 6 section shimmer placeholders — hanya first load |
| **Dashboard error state** | ✅ Retry button + error message kalau GAS gagal |
| **Kuis modul** | ❌ Soal ada di HTML, jawaban belum nyimpen ke backend |

---

## 🚫 HARD BLOCK — JANGAN DISENTUH

| Area | Alasan |
|---|---|
| Signaling / WebRTC (Go) | Prototype, `signaling/` |
| Messaging / Chat (Go) | In-memory store, `messaging/` |
| Participant Portal (Go) | `participant-portal/` |
| Admin dashboard | Production, `pages/dashboard/`, `js/dashboard/` |
| Security hardening | Butuh koordinasi terpisah |
| Leaderboard, Certificates, Tasks, Projects, Events, Community, Mentor | Placeholder / under-development |
| `provisionParticipantAccounts` / `generateParticipantAccounts*` | **AKAN RESET 187 AKUN EXISTING** |
| `forceReset:true` | **RESET DATA EXISTING** |
| 231 file lesson HTML/JS | Hardcoded sidebar, di-handle JS injection |
| `js/main.js`, `js/router.js` | **KECUALI** tambah route/handler baru |

---

## ✅ FILE YANG BOLEH DISENTUH

| File | Fungsi | Baris |
|---|---|---|
| `js/frontend/fellow-dashboard/settings.js` | Logic dashboard, settings, progress, password, user menu, skeleton, cache | ~2175 |
| `pages/frontend/fellow-dashboard/settings.html` | UI settings | — |
| `pages/frontend/fellow-dashboard/dashboard.html` | UI dashboard | 205 |
| `css/frontend/fellow-dashboard/dashboard.css` | Styling dashboard (skeleton, shimmer, error, fade-in) | 2195 |
| `css/frontend/fellow-dashboard/settings.css` | Styling settings | — |
| `gas/Code.gs` | **HANYA bug fix** — logic 47/47 verified | 2420 |
| `index.html` | **HANYA cache buster** (`?v=...`) | — |
| `gemini.md` | Bug log | 656 |
| `handover/` | Dokumentasi | — |

---

## 📋 SEMUA YANG SUDAH DIKERJAKAN

### Sebelum Sesi 27 Juli (Sudah Ada)
- 5 Fase dashboard: dynamic name, settings wire GAS, ganti password, progress tracking
- 7 bug fixed: #29-35 (null guards, CSS, schema fix)
- Backend 47/47, frontend 12/12 endpoint tested

### Task A: saveChapterProgress Wiring (6 commit)
- 28/29 module JS wired → `window.saveChapterProgress(MODULE_ID, chapter, 'completed')`
- POST ke GAS `saveParticipantProgress` → UPSERT ke `participant_progress`
- 1 skipped: `ai-math-for-ai.js`, 2 manual fix: `ai-modern.js`, `ai-python-basic.js`
- 29/29 syntax PASS

### Task B: Seed Dashboard Data (3 commit)
- 7 GAS seed functions: `seedAllDashboardData`, `seedDashboardModules/Journey/Events/Tracks/Discussions/Leaderboard`
- 27 modul dengan module_id, total_chapters, icon, tone, href
- Semua idempotent (upsertByKey) — aman dijalankan ulang
- ⚠️ `seedDashboardDiscussions` pakai `addRowObject` (duplikasi tiap rerun)

### Task C: Frontend Polish — Skeleton + Error + Fade-In (2 commit)
- CSS: `dash-shimmer`, `dash-fade-in` keyframes, skeleton placeholders 6 section
- CSS: `.dashboard-error` state + `.btn-retry`
- JS: `renderDashboardSkeletons()` — 6 animated shimmer sections
- JS: `renderDashboardError()` — retry via `window.__retryDashboard()`
- JS: `fetchParticipantDashboardData()` throw on error (no silent fallback)
- JS: Semua template `renderParticipantDashboard()` ditambah class `dash-real`
- Cache buster: `dashboard.css?v=20260727-skeleton`, `settings.js?v=20260727-skeleton`

### Bug Fixes Sesi Ini (16 bug — #29-44)

| # | Bug | Root Cause | Fix |
|---|---|---|---|
| 29-35 | Pre-session bugs | null guards, CSS, schema | Prior session fixes |
| 36 | Task A wiring | Missing MODULE_ID in 1 file | Injection script |
| 37 | Task B seed | ai-ml-basic.js MODULE_ID wrong | Fixed to `machine-learning` |
| 38a | Sidebar deep-learning | HTML ID `aiDeepLearningList` vs JS `reasoning-sidebar-list` | Match IDs |
| 38b | Dropdown "Setting Akun" | Link `participant-profile` → harus `participant-settings` | Fix href |
| 38c | Settings route handler | Kena catchall `under-development` | Add route before catchall |
| 38d | Profile redirect | Diblok `isParticipantRouteAllowed` guard | Redirect before guard |
| 38e | Redirect skip | `currentPath` set bikin router skip | Remove currentPath set |
| 38f | Password silent fail | `session.nik` null + `btn` null → silent | Error feedback |
| 38g | Flash "Aisyah Putri" | Hardcode di HTML | Ganti "Peserta" netral |
| 38h | Dashboard 27 modul | Terlalu rame | Limit 8 + "Lihat Semua" |
| 38i | Greeting fallback | "Halo!" kosong | "Halo, Peserta HerAI!" |
| 39 | Skeleton circle invisible | `<span>` inline → width/height ignored | `display: inline-block` |
| 40 | Redundant `border-radius` | Copy-paste shimmer base → double declaration | Clean redundant |
| 41 | Unused `dash-spin` keyframe | Defined but never referenced | Remove |
| 42 | Module href 404 | Seed `participant-ai-*` vs router `participant-ai-lab-*` | Fix 22 href di `seedDashboardModules()` |
| 43 | Skeleton re-render on nav | `initParticipantDashboardData()` no cache | `_dashboardDataCache` — instant render on nav back |
| 44a | Password UX | Client-side validasi kosong | Empty field checks + same-password guard |
| 44b | Generated password still works | `password_status='changed_by_participant'` vs login check `'changed'` | Fix to `'changed'` |

---

## ⚠️ YANG HARUS DILAKUKAN MANUAL

1. **Copy `Code.gs` ke Apps Script** — file terbaru ada di `gas/Code.gs`
2. **Redeploy Web App** — Deploy → Manage deployments → Edit → New version → Deploy
   - **PENTING:** Tanpa redeploy, `changeParticipantPassword` akan pakai kode lama
   - Status `'changed_by_participant'` di sheet lama tidak akan memblok `generated_password`
3. **Run `seedAllDashboardData()`** — dari Apps Script editor (sekali saja)
   - Memperbarui href module di sheet `participant_dashboard_modules` ke route yang benar
4. **Ganti password ulang untuk akun yang sudah pernah ganti** — supaya `password_status` jadi `'changed'`
5. **Test login dengan password baru** — pastikan password lama sudah tidak bisa dipakai

---

## 🔑 DATA FLOW

```
Login:    POST /__gas { action: "participantLogin", nik, password }
          → GAS: participantLogin() → 3 jalur verifikasi:
            1. verifyPasswordValue(account.password_hash, password)
            2. verifyPasswordValue(participant.participant_password, password)
            3. account.generated_password (HANYA jika password_status ≠ 'changed'/'revoked')
          → synchronizeParticipantCredentials() → sync hash ke 2 sheet
          → issueAuthToken('participant', nik, 12 jam) → token + profile
          → Frontend: saveParticipantSession() → sessionStorage

Password: POST /__gas { action: "changeParticipantPassword", oldPassword, newPassword }
          → GAS: changeParticipantPassword() → verify old → hash new
          → updateByKey(ParticipantAccounts): password_hash + password_status='changed'
          → updateByKey(peserta_tahap_1): participant_password
          → generated_password TETAP DISIMPAN (audit trail) tapi DIBLOKIR oleh password_status

Settings: POST /__gas { action: "updateParticipantProfile", ... }
          → GAS: updateParticipantProfile() → updated profile
          → Frontend: saveParticipantSession() → update sessionStorage

Progress: window.saveChapterProgress(moduleId, chapterId, "completed")
          → POST /__gas { action: "saveParticipantProgress", module_id, chapter_id, status }
          → GAS: saveParticipantProgress() → UPSERT ke participant_progress
          → Dipanggil otomatis dari setiap ai-*.js saat chapter load

Dashboard: POST /__gas { action: "getParticipantDashboardData", nik }
           → GAS: getParticipantDashboardData() → compute % dari participant_progress
           → Frontend: initParticipantDashboardData()
             - First load: renderDashboardSkeletons() → fetch → render/cache
             - Nav back: render from _dashboardDataCache instantly (no skeleton)
             - Error: renderDashboardError() with retry button

Session:  sessionStorage.heraiParticipantSession
          { nik, token, expiresAt, name, profile: { nama_lengkap, email, ... } }
```

---

## 📐 ATURAN KERJA (WAJIB)

1. **Commit PER FITUR** — bukan satu commit besar
2. **Update handover & gemini.md** setiap checkpoint
3. **Catat bug baru** dengan nomor #45+
4. **Dark theme DILARANG** — light pink theme untuk code blocks
5. **CSS scope `ai-lab-content`** WAJIB di template CV
6. **Diagram kontras**: lines ≥25% opacity, dots ≥75%, stroke ≥0.8px
7. **JANGAN tampilkan NIK/password** di log, screenshot, handover, commit
8. **TANYA user** sebelum eksekusi kalau ambigu
9. **Verifikasi sebelum commit**: `node --check`, test data flow, cek null guards
10. **JANGAN jalankan** `provision/generateParticipantAccounts*` functions
11. **JANGAN sentuh** 231 file lesson — pakai JS injection/code generation
12. **sessionStorage.heraiParticipantSession** adalah source of truth
13. **Selalu bump cache buster** (`?v=...`) di `index.html` setelah edit JS/CSS
14. **Jangan silent fail** — tambah error feedback di UI
15. **JANGAN push ke GitHub** kecuali diminta user
16. **GAS deployment**: selalu redeploy web app setelah edit `Code.gs`

---

## 📝 NEXT PLAN

### Prioritas 1: Redeploy GAS + Test (MANUAL — User)
- Copy Code.gs → Redeploy web app (Versi 4)
- Run `seedAllDashboardData()`
- Test: login → dashboard → klik module (pastikan gak 404) → settings → ganti password → logout → login password baru → pastikan password lama ditolak

### Prioritas 2: Kuis Backend Wiring
- Saat ini jawaban kuis disimpan lokal di HTML
- Wire ke `saveParticipantProgress` dengan parameter `score`
- Tampilkan hasil kuis di dashboard

### Prioritas 3: Testing (Task D)
- Playwright e2e test: login flow, dashboard render, module navigation, settings, password change
- Manual smoke test semua 27 modul

### Prioritas 4: seedDashboardDiscussions Idempotency
- Ganti `addRowObject` jadi `upsertByKey` biar gak duplikasi tiap rerun

---

## 📂 ARSITEKTUR FILE

```
✅ BOLEH DIEDIT:
js/frontend/fellow-dashboard/settings.js  — logic dashboard, settings, password, cache (~2175 baris)
pages/frontend/fellow-dashboard/dashboard.html  — UI dashboard (205 baris)
css/frontend/fellow-dashboard/dashboard.css  — skeleton, shimmer, error, fade-in (2195 baris)
css/frontend/fellow-dashboard/settings.css  — styling settings
gas/Code.gs  — HANYA bug fix (2420 baris, 52 routes, 23 sheets)
index.html  — HANYA cache buster

❌ JANGAN DIEDIT:
js/main.js — auth transport, global settings
js/router.js — hash routing (kecuali tambah route/handler baru)
Semua 231 file lesson HTML/JS — sidebar hardcoded
Semua file Go (signaling/, messaging/, participant-portal/)
Semua file admin dashboard (pages/dashboard/, js/dashboard/)
