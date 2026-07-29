# AI Handoff — HerAI Fellowship SuperApp

**Checkpoint: 29 Juli 2026 (Playwright MCP E2E Audit #87–#91), Asia/Jakarta**
**Workspace:** `/home/faiz/her6/Her-AI`
**Branch:** `main`
**Baseline Commit:** `6c35926` - docs: Final handover update — leaderboard verified LIVE, GAS deployed, all systems go
**Feature Commit:** current HEAD - `test: expand active module end-to-end audit (#87-#91)`
**Total commits:** 249
**GAS Deployment:** ✅ LIVE — leaderboard 1,024 pts verified
**Worktree:** BERSIH
**E2E Test Suite:** 123 test terdaftar | safe mock gate 70 test | live mutation default OFF
**Leaderboard:** ✅ LIVE — Brenda 1,024 pts (#1), peserta lain 245 pts (#2)

> **Ini sumber kebenaran tunggal.** Semua dokumen lain yang bertentangan diabaikan.

## CHECKPOINT QA 29 JULI 2026

Phase 0 testing sudah dibangun, fix #80 menambahkan bank kuis production untuk Evaluation/Evolution, dan audit Playwright MCP menguji 20 route module pada desktop/mobile. Router, source module production, dan GAS tidak diubah pada audit ini. Tidak ada request mutasi yang dikirim ke backend live.

### Cakupan yang sekarang bisa dilacak

| Gate | Cakupan |
|---|---|
| Manifest | 5 module dashboard, AI Intro, CV Digital Image, route dan metadata |
| Frontend | Overview, practice, quiz, discussion, own-content, loader tunggal |
| Frontend → backend | Payload `module_id`, `chapter_id`, status dan score memakai GAS mock |
| Safety | Kredensial tidak disimpan di E2E; live mutation perlu opt-in; password punya opt-in kedua |
| UI/UX | 375/768/1280, overflow, touch target, keyboard focus, reduced motion, non-color status |
| Artefak | HTML + JSON report, screenshot, trace dan video saat failure |

### Hasil safe mock gate

- 70 test dieksekusi tanpa live write.
- 56 alur memenuhi kontrak secara langsung.
- 14 expected failures mewakili bug produk yang masih terbuka; suite exit code 0.
- Review kontrak backend menemukan tambahan #84–#85.
- #80 FIXED: Evaluation dan Evolution masing-masing memiliki 20 soal nyata serta payload score terverifikasi.
- #86 FIXED: navigator 1–20 horizontal, wrap, 44×44px, dan bebas overflow pada 375/1280px.
- Audit MCP: 20/20 route render dan bebas horizontal overflow pada 375px.
- Live read-back production belum dijalankan: sesi MCP kedaluwarsa dan credential secret environment tidak tersedia.

### Temuan terbuka

| # | Severity | Temuan |
|---|---|---|
| 78 | High | Ringkasan Belajar hardcoded dan tidak membaca progress |
| 79 | High | `quiz_total` Reasoning 26 soal masih tercatat 20 di GAS |
| 81 | Critical | AI Modern practice/quiz gagal mencatat karena scope `MODULE_ID` |
| 82 | Critical | AI Modern mengirim object sebagai `chapter_id` |
| 83 | Medium | Dua tombol praktik mobile di bawah 44px |
| 84 | High | Backend menghitung quiz/practice sebagai chapter selesai |
| 85 | High | `saveChapterProgress` mengabaikan respons gagal dan catch kosong |
| 87 | Medium | Navigator 26 soal Reasoning masih vertikal pada mobile |
| 88 | Medium | AI Modern gagal source-integrity assertion |
| 89 | High | Evaluation/Evolution melempar `PYTHON_GUIDES is not defined` |
| 90 | Low | Label `Kuis Python`/`Forum Python AI` bocor ke Evaluation/Evolution |
| 91 | High | Posting diskusi hanya tersimpan di localStorage, bukan backend |

**Penting:** angka leaderboard/GAS live adalah status terverifikasi dari checkpoint sebelumnya. Audit QA ini tidak melakukan live mutation atau verifikasi ulang authenticated production. Laporan rinci ada di `handover/E2E_AUDIT_2026-07-29.md`.

---

## IDENTITAS SISTEM

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| GAS Code | `gas/Code.gs` (2562 baris, 54 routes, 23 sheets) |
| SPA | Vanilla JS hash-router, Node proxy (`node server.js` → `http://127.0.0.1:3000`) |
| Proxy | POST `/__gas` (token auto-injected, Origin header WAJIB) |
| Test participant | Kredensial QA disuplai lewat environment variable; tidak disimpan di repo |
| Module JS files | 30 ai-*.js (24 standard + 5 berbeda + 1 interactive) |
| Cache buster | Loader `?v=20260729-quiz-content`; modules CSS `?v=20260729-quiz-nav` |

---

## STATUS FITUR — LENGKAP

| Fitur | Status | Catatan |
|---|---|---|
| Login peserta | ✅ | 3 jalur verifikasi (hash + plain + account sync) |
| Nama dinamis dashboard | ✅ | "Halo, [Nama]!" dari session |
| Ganti password mandiri | ✅ | old→new→hash→sync 2 sheet, rate limit 8/10min |
| Settings save profil | ✅ | form→GAS→session update |
| Chapter progress auto-save | ⚠️ | Active modules teruji mock; AI Modern salah `chapter_id` (#82); live read-back belum dieksekusi |
| Quiz score wiring | ⚠️ | Evaluation/Evolution lolos 20 soal; AI Modern scope crash (#81); UI dapat lock sebelum ack (#85) |
| Practice/latihan wiring | ⚠️ | Mayoritas aktif; AI Modern gagal POST ke GAS (#81) |
| Dashboard skeleton/cache | ✅ | 3-tier: memory→sessionStorage(5min)→skeleton, 0.2s refresh |
| Dashboard modules filter | ✅ | Dashboard tepat 5 card; overview AI Fundamentals berisi Intro + 5 module |
| Dashboard quiz badge | ✅ | Persentase format (X%), pill pink, skeleton reveal |
| **Leaderboard LIVE** | ✅ | Compute dari `participant_progress`, Brenda 1,024 pts #1 |
| Score normalization (#55) | ⚠️ | Evaluation/Evolution sinkron; Reasoning masih mismatch (#79) |
| Restricted access (#54) | ✅ | Hanya Beranda/Modul/Pengaturan + under-development |
| Python contamination fix (#57) | ✅ | 24 module JS — konten module-specific, 0 kontaminasi |
| ai-python.js rewrite (#59) | ✅ | 8 GUIDES konten Python proper |
| Glossary enrichment (#63) | ✅ | 14 modules, 620+ definitions |
| Lazy loading (#64) | ✅ | `__aiLabLoader`, 28 route wrapped, 4.5MB→500KB, 90% reduction |
| P5: UX Polish (#65) | ✅ | 12 animations: accordion, quiz feedback, page enter, toast, button |
| Discussion persistence | ⚠️ | Post masih browser-only/localStorage (#91) |
| Avatar/foto profil (#67) | ✅ | Upload→canvas resize 200×200→preview→"✓ Simpan"/"✗ Batal", base64 sheet |
| Module lockdown (#68, #74, #75) | ✅ | 20 module UD, dashboard shows only 5 AI Fundamentals |
| CV Interactive widgets (#73) | ✅ | Sandbox, flip/rotate, bitwise, Otsu, quiz, coding challenges |
| CV online (#71, #72) | ✅ | CV overview + Digital Image Fundamentals active, CNN/Advanced UD |

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

## 📊 MODULE STATUS — FINAL

### ✅ ONLINE (5 + AI Intro)
| Module | JS | Size | Route | Quiz | Practice |
|---|---|---|---|---|---|
| Pengantar AI | settings.js | — | `/participant-ai-intro` | ✅ | ✅ |
| Python untuk AI | ai-python.js | ~30KB | `/participant-ai-python` | 80 radios | 12 textareas |
| Reasoning AI | ai-reasoning.js | 170KB | `/participant-ai-reasoning` | 104 radios | 17 textareas |
| Konsep AI Modern | ai-modern.js | ~40KB | `/participant-ai-modern` | UI ada, save crash #81 | UI ada, save crash #81 |
| Evaluation AI | ai-evaluation.js | ~141KB | `/participant-ai-evaluation` | 20 soal + pembahasan ✅ | 5 textareas |
| Evolution of AI | ai-evolution.js | ~143KB | `/participant-ai-evolution` | 20 soal + pembahasan ✅ | 7 textareas |

### ✅ ONLINE — Computer Vision (partial)
| Sub-module | Status |
|---|---|
| CV Overview | ✅ Online |
| Digital Image Fundamentals | ✅ Online (interactive widgets active!) |
| CNN | 🔒 Under Development |
| Advanced CNN Architectures | 🔒 Under Development |

### 🔒 UNDER DEVELOPMENT (20+ modules)
Deep Learning, Reinforcement Learning, Machine Learning, Math for AI,
LLM, VLM, Multimodal LLM, Agentic AI,
Culture, Healthcare, UI/UX, Manufacturing, Business Insight, People Mgt,
Geospatial, Bioinformatics, Data Engineering, Data Science, Infrastructure,
Deployment, Front-end, Back-end

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
6. **Dashboard response**: `{data: {modules, leaderboard, tracks, journey, events}}`
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
24. **Brenda**: 1,024 pts (#1), peserta lain 245 pts (#2)

### Dashboard
25. **Module filter**: Only 5 AI Fundamentals + AI Intro
26. **Persistent cache**: sessionStorage 5min TTL, refresh 0.2s
27. **Password akun QA**: simpan di luar repo; test mutasi wajib opt-in eksplisit

### Avatar
28. **Storage**: base64 data URL di sheet `photo_url` (tanpa Drive)
29. **Size**: 200×200 JPEG quality 0.8, ~15KB
30. **Topbar**: `.has-photo::after { background: none }` — fix overlay

---

## 🔑 DATA FLOW

```
CHAPTER   → saveChapterProgress(id, ch, 'completed') → participant_progress
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
