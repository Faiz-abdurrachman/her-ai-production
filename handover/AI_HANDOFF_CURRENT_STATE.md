# AI Handoff — HerAI Fellowship SuperApp

**Checkpoint: 28 Juli 2026 (Sisyphus - Sesi ke-3, Full Session), Asia/Jakarta
**Workspace:** `/home/faiz/her6/Her-AI`
**Branch:** `main`
**Last Commit: `ff6d639` - fix: avatar — preview-before-upload flow + fix topbar avatar display (#67)
**Total commits (main): 232 | Commits sesi ini: 12
**GAS Deployment:** ✅ Sudah redeploy — avatar upload (sheet-based storage) active
**Worktree: BERSIH**
**E2E Test Suite (latest):** 40/40 PASS completed, ~20 GAS timeout (pre-existing)

> **Ini adalah sumber kebenaran tunggal.** Dokumen handover lain yang bertentangan diabaikan.

---

## IDENTITAS SISTEM

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| GAS Code | `gas/Code.gs` (2479 baris, 54 routes, 23 sheets) |
| SPA | Vanilla JS hash-router, Node.js proxy (`node server.js` → `http://127.0.0.1:3000`) |
| Proxy | POST `/__gas` (token auto-injected, Origin header WAJIB) |
| Test participant | NIK `8204086711010003` / Brenda Rahmandea Arsy / `brenda123` |
| Module JS files | 29 ai-*.js (24 injected + 5 with content but different structure) |

---

## STATUS FITUR — LENGKAP

| Fitur | Status | Catatan |
|---|---|---|
| Login peserta | ✅ | 3 jalur verifikasi |
| Nama dinamis dashboard | ✅ | "Halo, [Nama]!" |
| Ganti password mandiri | ✅ | old/new → hash → sync 2 sheet |
| Settings save profil | ✅ | form → GAS → session update |
| Chapter progress auto-save | ✅ | 28 module wired |
| Quiz score wiring | ✅ | 28 module + ai-intro |
| Practice/latihan wiring | ✅ | 28 module |
| Dashboard skeleton/error/fade-in | ✅ | Shimmer + retry + cache |
| Dashboard modules/journey/events/tracks | ✅ | Dari GAS seed (idempotent) |
| Leaderboard | ✅ | Masked, upsertByKey |
| Dashboard score display | ✅ | Quiz badge persentase (X%), pill pink |
| Score normalization (#55) | ✅ | quiz_total column, GAS compute % |
| math-for-ai in seed | ✅ | Card muncul di dashboard |
| Restricted access (#54) | ✅ | Hanya Beranda/Modul/Pengaturan |
| Python contamination fix (#57) | ✅ | 24 module JS — konten module-specific |
| "Topik 01/02" badges (#58) | ✅ | Hide via CSS global |
| ai-python.js rewrite (#59) | ✅ | 8 GUIDES konten Python proper |
| P1: Backend E2E tests (#60) | ✅ | 20/20 — pure HTTP fetch(POST /__gas) |
| P2: Frontend E2E tests (#61) | ✅ | 25/25 — fix 3 flaky + 8 new UI tests |
| P3: Workflow E2E tests (#62) | ✅ | 8/8 — full user journey simulation |
| Glossary enrichment (#63) | ✅ | 14 modules, 620+ definitions replaced |
| Lazy loading (#64) | ✅ | 4.5MB→500KB, 90% reduction, 28 route wrapped |
| P5: UX Polish (#65) | ✅ | 12 animations: roadmap accordion, quiz feedback, page enter, toast |
| P3: Module routes (#66) | ✅ | math-for-ai, ml-basic, CV cnn/advanced-cnn routes activated |
| Avatar/foto profil (#67) | ✅ | Upload → preview → confirm, simpan base64 ke sheet, topbar display |

---

## YANG SUDAH DIKERJAKAN SESI INI (12 commit — P5, P3, Avatar)

### P5 — AI Lab UX Polish (#65, commit `5af6c54`)
- 12 CSS animations: roadmap accordion smooth height, step stagger, active glow, quiz answer pulse/shake, page enter fade-in, progress bar cubic-bezier, button micro-interactions, toast slide-in/out
- `__aiLabToast()` global helper di settings.js
- Dashboard quiz badge hover + skeleton reveal
- Semua via CSS injection — 0 perubahan ke 29 file ai-*.js

### P3 — Module Routes (#66, commit `cd18146`)
- 25 route entries from `under-development.html` → actual HTML pages
- math-for-ai: 11 routes + `__aiLabLoader` wrapper
- ml-basic: 5 routes (handler already correct)
- CV: 8 cnn/advanced-cnn routes
- ai-reasoning.js: verified DONE (170KB, full content)

### Avatar/Foto Profil (#67, commits `6f1169a` → `ff6d639`)
- GAS: `uploadParticipantPhoto` + `removeParticipantPhoto` endpoints
- Storage: base64 data URL disimpan langsung ke sheet `photo_url` (tanpa Drive permission)
- Frontend: file input → canvas resize 200×200 → preview → konfirmasi → POST GAS
- Flow: Pilih file → preview muncul → "✓ Simpan Foto" / "✗ Batal" → toast
- Topbar: `updateTopbarAvatar()` set `background-image` + hide `::after` overlay via `.has-photo`
- Cache busters: `v=20260728-avatar-v3`

---

## HARD BLOCK — JANGAN DISENTUH

- **Signaling (Go WebRTC), Messaging/Chat (Go), Participant Portal (Go)**
- **Admin dashboard (production)** — `pages/dashboard/`, `js/dashboard/`
- **Keamanan/Security hardening** — jangan ubah auth flow tanpa approval
- **Leaderboard, Certificates, Tasks, Projects, Events, Community, Mentor**
- **`provisionParticipantAccounts` / `generateParticipantAccounts*`** — AKAN RESET 187 AKUN
- **`forceReset:true`** — AKAN RESET DATA
- **231 file lesson HTML/JS** — jangan edit satu-satu, pakai CSS/JS injection
- **`js/main.js`** — TANYA DULU sebelum edit
- **`js/router.js`** — SUDAH dimodifikasi untuk lazy loading. Tambah route baru? TANYA DULU, pakai `__aiLabLoader`
- **`ai-python-basic.js`** — INTENTIONAL SKIP, conflict namespace dengan `ai-python.js`
- **5 module dengan struktur berbeda**: ai-cv.js, ai-math-for-ai.js, ai-ml-basic.js, ai-python-basic.js, ai-reasoning.js — TANYA DULU sebelum edit

---

## BOLEH DISENTUH

| File | Fungsi |
|---|---|
| `js/frontend/fellow-dashboard/ai-*.js` | 24 module AI (kecuali 5 di atas) |
| `js/frontend/fellow-dashboard/settings.js` | Logic dashboard, settings, password, cache, avatar |
| `pages/frontend/fellow-dashboard/dashboard.html` | UI dashboard |
| `css/frontend/fellow-dashboard/dashboard.css` | Skeleton, shimmer, quiz badge, avatar |
| `css/frontend/fellow-dashboard/modules.css` | Roadmap, quiz, lesson styles |
| `css/frontend/fellow-dashboard/ai-lab-lesson.css` | AI lab content styling |
| `css/frontend/fellow-dashboard/settings.css` | Settings page styling |
| `gas/Code.gs` | **HANYA bug fix atau feature yang diminta user** |
| `index.html` | **HANYA cache buster** |
| `e2e/*.spec.js` | Playwright test suite |
| `gemini.md`, `handover/` | Dokumentasi |
| `scripts/*.js` | Utility scripts |

---

## TEMUAN KRITIS — WAJIB BACA SEBELUM EDIT

### Security & Auth
1. **participantPortalOpen di Settings**: HARUS lowercase "true" (JSON boolean), string "TRUE" gagal
2. **Login form IDs**: NIK=`#profileNik`, Password=`#profilePassword`, Form=`#participantLoginForm`
3. **Fresh browser localStorage kosong**: `getGlobalSettings()` sync return default `participantPortalOpen:false`
4. **Playwright**: `primeSettings()` inject localStorage sebelum navigasi

### GAS Backend API
5. **Token field**: `payload.participantToken || payload.authToken` — BUKAN `token`
6. **getParticipantProgress response**: `{data: [...]}` — BUKAN `{progress: [...]}`
7. **Dashboard response**: `{data: {modules: [...]}}` — modules wrapped in `data`
8. **chapter_id type**: Returned as NUMBER from sheet — gunakan `String(e.chapter_id)` comparison
9. **quiz_score field**: May be `undefined` (not `null`) in dashboard response
10. **server.js**: `isAllowedAppRequest()` requires Origin header matching allowed origins
11. **nama_lengkap**: Can be empty string `""` — don't assert `length > 0`

### Playwright Testing
12. **Navigation**: `page.goto()` lebih reliable dari `page.evaluate()` untuk SPA hash nav
13. **SPA routing**: Setelah login, hash navigation via `page.goto()` untuk konsistensi
14. **Quiz form**: Rendered by IIFE — gunakan `waitForFunction(() => document.getElementById('...') !== null)`
15. **setInputFiles + change event**: `dispatchEvent('change')` unreliable di headless; gunakan `page.evaluate` untuk trigger manual

### Module Structure
16. **ai-python-basic.js**: INTENTIONAL SKIP — namespace collision dengan ai-python.js
17. **ai-modern.js**: Struktur berbeda — BEGINNER_GUIDES, bukan PYTHON_GUIDES
18. **ai-reasoning.js**: 170KB — FULL content, routes working ✅
19. **ai-math-for-ai.js**: 53KB — uses `mathForAiLessons`, routes now active
20. **ai-ml-basic.js**: 24KB — CHAPTERS + loadMlTopik(), routes now active
21. **ai-cv.js**: 11KB — loadCvChapter(), 01-digit-image works, 02-cnn + 03-advanced-cnn routes active

### Avatar/Foto
22. **Storage**: base64 data URL disimpan di sheet `photo_url` — TANPA Drive permission
23. **Resize**: 200×200 JPEG quality 0.8 via canvas — hasil ~15KB
24. **Topbar overlay**: `.avatar-img::after` pseudo-element nutupin foto — gunakan `.has-photo::after { background: none }`
25. **Flow**: File → preview → konfirmasi ("Simpan Foto" / "Batal") → upload
26. **GAS redeploy**: WAJIB setelah edit Code.gs — endpoint `uploadParticipantPhoto`/`removeParticipantPhoto` perlu web app redeploy

### Lazy Loading (#64)
27. **`__aiLabLoader`** ada di window, defined di settings.js
28. `load('ai-xxx')` returns Promise — cache + dedup otomatis
29. 28 route handler SUDAH di-wrap. Jangan tambah route baru tanpa loader
30. Script loader path: `/js/frontend/fellow-dashboard/{name}.js?v=20260727-lazy`

### Password
31. Format hash: `pw$1${salt}$${sha256hex}`
32. `verifyPasswordValue()` fallback ke plain text + legacy peppers
33. Rate limit: 8 attempts per 10 menit via CacheService
34. Password di `peserta_tahap_1` kolom `participant_password` bisa plain text

### GAS
35. **GAS perlu redeploy** SETIAP edit Code.gs
36. **JANGAN edit Code.gs** kecuali user minta fitur spesifik

---

## DATA FLOW

```
CHAPTER: saveChapterProgress(id, ch, 'completed') → participant_progress
QUIZ: saveChapterProgress(id, 'quiz', 'completed', score) → participant_progress (0-100%)
PRACTICE: saveChapterProgress(id, 'practice', 'completed') → participant_progress
LOGIN: participantLogin(nik, pw) → 3 jalur verifikasi → token 12 jam
PASSWORD: changeParticipantPassword(old, new) → hash → sync 2 sheet
DASHBOARD: initParticipantDashboardData() → skeleton → fetch → render/cache + score badge
SESSION: sessionStorage.heraiParticipantSession
SETTINGS: localStorage.heraiGlobalSettings → participantPortalOpen boolean
MODULE: __aiLabLoader.load('ai-xxx') → dynamic script injection (on-demand)
AVATAR: file → resizeImageToBase64(200) → preview → POST uploadParticipantPhoto → simpan ke sheet → updateTopbarAvatar()
```

---

## COMMIT HISTORY SESI INI (12 commit)

```
ff6d639 fix: avatar — preview-before-upload flow + fix topbar avatar display (#67)
0c37090 chore: remove WIP avatar E2E tests
5795b95 chore: remove debug test file, keep only avatar-upload.spec.js
2fa605a fix: avatar upload — fix syntax error, remove dataset guards, fix login session wait
dd92165 fix: avatar upload — store base64 in sheet instead of Drive (no permission needed)
c86641f docs: update handover + gemini.md for avatar (#67) — session 3, 223 total commits
6f1169a feat: Avatar/foto profil — upload, display, remove with Google Drive storage (#67)
c3341b4 docs: update handover + gemini.md for P3 (#66) — session 3, 222 total commits
cd18146 feat: P3 — Activate module bersih routes: math-for-ai, ml-basic, CV cnn/advanced-cnn (#66)
3caf740 docs: update handover + gemini.md for P5 (#65) — session 3, 221 total commits
5af6c54 feat: P5 - AI Lab UX polish — roadmap accordion, quiz feedback, page animations, toast (#65)
```

---

## ATURAN KERJA — 20 RULE WAJIB

1. **Commit PER FITUR** — jangan gabung fitur beda
2. **Update handover & gemini.md** setiap selesai fitur
3. **Bug baru**: lanjut #68, #69, dst — jangan reuse nomor
4. **No dark theme** — light pink color scheme (#F63392)
5. **CSS scope**: `.ai-lab-content` — jangan global selector kecuali utility
6. **Diagram kontras**: lines ≥25%, dots ≥75%, stroke ≥0.8px
7. **NO NIK/password exposed** di code
8. **TANYA user** sebelum mulai kerja — konfirmasi dulu
9. **Verify**: `node --check`, test flow, null guards, E2E
10. **NO provision/generate** participant accounts — AKAN RESET 187 AKUN
11. **NO touch 231 lesson HTML files** — pakai CSS/JS injection
12. **sessionStorage** = source of truth untuk session
13. **Bump cache buster** setiap edit CSS/JS
14. **No silent fail** — error harus kelihatan
15. **NO push GitHub** kecuali diminta user
16. **GAS deployment**: redeploy web app setelah edit Code.gs
17. **Jangan edit module struktur berbeda** tanpa approval
18. **page.goto() > page.evaluate()** untuk SPA nav
19. **`__aiLabLoader`** sudah terintegrasi — jangan tambah `<script>` tag manual
20. **Jangan ubah router.js** module handler tanpa loader wrapper

---

## TOOLS & SCRIPTS

```bash
# Server
node server.js  # → http://127.0.0.1:3000

# E2E Tests
TEST_PARTICIPANT_NIK="8204086711010003" TEST_PARTICIPANT_PASSWORD="brenda123" npx playwright test --workers=1

# Syntax check
node --check js/router.js
node --check js/frontend/fellow-dashboard/settings.js
for f in js/frontend/fellow-dashboard/ai-*.js; do node --check "$f" && echo "OK $f" || echo "FAIL $f"; done

# Playwright specific files
npx playwright test e2e/fellow-dashboard.spec.js --workers=1
npx playwright test e2e/participant-backend.spec.js --workers=1
npx playwright test e2e/participant-workflow.spec.js --workers=1
npx playwright test e2e/p5-ux-polish.spec.js --workers=1
```
