# AI Handoff — HerAI Fellowship SuperApp

**Checkpoint:** 27 Juli 2026 (Sesi Sisyphus — Score Display + Leaderboard), Asia/Jakarta
**Workspace:** `/home/faiz/her6/Her-AI`
**Branch:** `main`
**Last Commit:** (pending — commit after this checkpoint)
**Total commits:** 32 + 1 (new)
**GAS Deployment:** ⚠️ BELUM redeploy — Code.gs changed (getParticipantDashboardData + seedDashboardLeaderboard)
**Worktree:** Modified: gas/Code.gs, settings.js, dashboard.css, index.html, e2e/fellow-dashboard.spec.js, gemini.md, handover/
**Playwright:** 8/8 PASS (8 skipped — no credentials)

> **Ini adalah sumber kebenaran tunggal.** Dokumen handover lain yang bertentangan diabaikan.

---

## ⚡ IDENTITAS SISTEM

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| GAS Code | `gas/Code.gs` (~2420 baris, 52 routes, 23 sheets) |
| SPA | Vanilla JS hash-router, Node.js proxy (`node server.js` -> `http://127.0.0.1:3000`) |
| Proxy | POST `/__gas` (token auto-injected oleh main.js) |
| Participant accounts | 187 akun di `ParticipantAccounts`, 431 di `peserta_tahap_1` |
| Admin login | `super-admin` / `admin123` |
| WA env | `GAS_WEB_APP_URL` di `.env` |

---

## 📊 STATUS FITUR

| Fitur | Status |
|---|---|
| Login peserta | ✅ 3 jalur verifikasi (hash, participant_pw, generated_pw) |
| Nama dinamis dashboard | ✅ "Halo, Peserta HerAI!" |
| Ganti password mandiri | ✅ old/new -> hash -> sync 2 sheet |
| Settings save profil | ✅ form -> GAS -> session update |
| Chapter progress auto-save | ✅ 28 module wired |
| Quiz score wiring | ✅ 28 module + ai-intro: POST score ke participant_progress |
| Practice/latihan wiring | ✅ 28 module: POST ke participant_progress (score=null) |
| Dashboard skeleton/error/fade-in | ✅ Shimmer loader + retry button + cache |
| Dashboard modules/journey/events/tracks | ✅ Dari GAS seed |
| Leaderboard | ✅ Masked, auto-populate |
| Dashboard score display | ✅ Quiz score muncul di module card (pill badge, auto-format /20 atau %) |

---

## 🚫 HARD BLOCK

- Signaling (Go), Messaging/Chat (Go), Participant Portal (Go)
- Admin dashboard: `pages/dashboard/`, `js/dashboard/`
- Security hardening
- Leaderboard, Certificates, Tasks, Projects, Events, Community, Mentor
- `provisionParticipantAccounts` / `generateParticipantAccounts*` — **AKAN RESET 187 AKUN**
- `forceReset:true` — **RESET DATA**
- 231 file lesson HTML/JS — pakai JS injection
- `js/main.js`, `js/router.js` — kecuali tambah route/handler baru

---

## ✅ BOLEH DISENTUH

| File | Fungsi |
|---|---|
| `js/frontend/fellow-dashboard/settings.js` | Logic dashboard, settings, password, cache, quiz handler (~2190 baris) |
| `js/frontend/fellow-dashboard/ai-*.js` | 29 module files (semua wiring injected) |
| `pages/frontend/fellow-dashboard/dashboard.html` | UI dashboard (205 baris) |
| `css/frontend/fellow-dashboard/dashboard.css` | Skeleton, shimmer, error, fade-in (2195 baris) |
| `css/frontend/fellow-dashboard/settings.css` | Styling settings |
| `gas/Code.gs` | HANYA bug fix (52 routes, 23 sheets) |
| `index.html` | HANYA cache buster (`?v=...`) |
| `gemini.md`, `handover/` | Dokumentasi |

---

## 📋 SEMUA YANG SUDAH DIKERJAKAN

### Dari Sesi Sebelumnya (25 commit)
- Task A: Chapter progress wiring (28 module)
- Task B: 7 GAS seed functions (idempotent)
- Task C: Skeleton loader, error state, fade-in, dashboard cache
- Bug fixes #29-44 (16 bug)

### Sesi Sebelumnya (7 commit: #45-#51)
| # | Item | Detail |
|---|------|--------|
| 1 | seedDashboardDiscussions idempotent | `addRowObject` -> `upsertByKey('topic')` |
| #45 | Quiz wiring | 28 ai-*.js + score POST ke GAS |
| #50 | ai-intro quiz wiring | handler di settings.js — missed by ai-*.js scan |
| #51 | Practice wiring | 28 ai-*.js save latihan POST ke GAS |
| #46 | Cache busters | 19 file tanpa `?v=` ditambahkan |
| #48 | Duplicate scripts | Hapus duplicate ai-evaluation/evolution |

**Playwright e2e:** Installed + 13 tests, 13/13 PASS

### Sesi Ini (1 commit: #52-#53)
| # | Item | Detail |
|---|------|--------|
| #52 | Dashboard Score Display | GAS: quiz_score di getParticipantDashboardData. FE: quiz badge pill di module card. CSS: .quiz-badge styling |
| #53 | seedDashboardLeaderboard | clearContent+addRowObject → upsertByKey('rank') |
| | e2e tests | 3 new tests (quiz render, practice render, password form validation) |

---

## ⚠️ TEMUAN KRITIS

| Temuan | Detail |
|--------|--------|
| Login form IDs | `#profileNik`, `#profilePassword`, `#btnParticipantLogin` (BUKAN `#participantNik`) |
| participantPortalOpen | HARUS lowercase `true` (boolean), bukan `"TRUE"` (string) |
| Settings race condition | Fresh browser: `getGlobalSettings()` sync -> default false. Async runs after router |
| #47: ai-python-basic.js | INTENTIONAL skip — namespace conflict `window.loadPythonTopik()` |
| #49: Score semantics | ai-math-for-ai: percentage, others: raw count. DEFERRED |

---

## 🔑 DATA FLOW

```
CHAPTER: window.saveChapterProgress(id, ch, 'completed')
  -> participant_progress: chapter_id='1','2','3'...

QUIZ: window.saveChapterProgress(id, 'quiz', 'completed', score)
  -> participant_progress: chapter_id='quiz', score terisi

PRACTICE: window.saveChapterProgress(id, 'practice', 'completed')
  -> participant_progress: chapter_id='practice', score=null

LOGIN: participantLogin(nik, password) -> 3 jalur -> token 12 jam
PASSWORD: changeParticipantPassword(old, new) -> hash -> sync 2 sheet -> status='changed'
DASHBOARD: initParticipantDashboardData() -> skeleton -> fetch -> render/cache
SETTINGS GATE: localStorage.heraiGlobalSettings -> .cursor/global-settings.json
```

---

## 📝 NEXT PLAN

1. **Score semantics normalization (#49)** — ai-math-for-ai: percentage (0-100), lainnya: raw count (0-20). Either normalize all to percentage or add per-module quiz_total config.
2. **Add math-for-ai to dashboard modules seed** — module ada (ai-math-for-ai.js) tapi tidak di seedDashboardModules.
3. **GAS Redeploy** — Code.gs changed, perlu redeploy web app sebelum perubahan backend aktif.
4. **Additional e2e tests with credentials** — quiz submit full flow, practice save full flow, password change end-to-end (butuh TEST_PARTICIPANT_NIK + TEST_PARTICIPANT_PASSWORD).

---

## 📐 ATURAN KERJA

1. Commit PER FITUR | 2. Update handover & gemini.md | 3. Bug baru #52+
4. No dark theme — light pink | 5. CSS scope ai-lab-content | 6. Diagram kontras
7. NO NIK/password exposed | 8. TANYA user kalo ambigu
9. Verify: node --check, test flow, null guards | 10. NO provision/generate
11. NO touch 231 lesson files | 12. sessionStorage = source of truth
13. Bump cache buster | 14. No silent fail | 15. NO push GitHub | 16. Redeploy after Code.gs edit
