# AI Handoff — HerAI Fellowship SuperApp

**Checkpoint: 28 Juli 2026 (Sisyphus - Sesi ke-3), Asia/Jakarta**
**Workspace:** `/home/faiz/her6/Her-AI`
**Branch:** `main`
**Last Commit:** `49bc9c2` - fix: GAS — leaderboard is_active filter (#77)
**Total commits:** 243
**GAS:** ⚠️ Perlu redeploy (#77 filter fix)
**Worktree:** BERSIH
**E2E:** 33/33 PASS | Password Brenda: intact

> **Sumber kebenaran tunggal.** Dokumen lain yang bertentangan diabaikan.

---

## IDENTITAS SISTEM

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| GAS Code | `gas/Code.gs` (2562 baris, 54 routes, 23 sheets) |
| SPA | Vanilla JS hash-router, Node proxy (`node server.js` → `:3000`) |
| Proxy | POST `/__gas` (token auto-injected, Origin WAJIB) |
| Test participant | NIK `8204086711010003` / Brenda Rahmandea Arsy / `brenda123` |
| Module JS | 30 ai-*.js (24 standard + 5 berbeda + 1 interactive) |

---

## ✅ STATUS FITUR

| Fitur | Status |
|---|---|
| Login peserta (3 jalur) | ✅ |
| Chapter progress auto-save | ✅ 28 module |
| Quiz score wiring | ✅ GAS `participant_progress` |
| Practice/latihan wiring | ✅ localStorage + GAS |
| Dashboard: skeleton/cache/modules | ✅ 3-tier cache + 5 AI Fundamentals |
| **Leaderboard LIVE** | ✅ Brenda 1,024 pts (was 2,406 seed) |
| Avatar/foto profil | ✅ Upload→preview→confirm, base64 sheet |
| CV Interactive widgets | ✅ Sandbox, flip, bitwise, Otsu, quiz, challenges |
| Restricted access | ✅ Beranda/Modul/Pengaturan only |
| Module lockdown | ✅ 20 UD, only 5 AI Fundamentals online |
| Lazy loading | ✅ __aiLabLoader, 4.5MB→500KB |
| UX Polish | ✅ 12 animations, toast, quiz feedback |
| Dashboard cache | ✅ sessionStorage 5min, 0.2s refresh |

---

## 📦 COMMITS SESI INI (#65-#77)

```
49bc9c2 fix: GAS — leaderboard is_active filter (#77)
a8a88bc fix: GAS — activeRows scope error (#76)
72e833b fix: Dashboard — hide UD modules (#75)
c2f6667 fix: All modules UD except AI Fundamentals (#74)
899e5f4 feat: CV interactive widgets (#73)
a620734 fix: CV CNN/Advanced → UD (#72)
9a9761c fix: CV back online (#71)
5092a19 perf: Dashboard cache sessionStorage (#70)
f749ca7 feat: Live leaderboard (#69)
85772cd fix: Math/ML/CV → UD + template fix (#68)
```

---

## 📊 MODULE STATUS

### ✅ ONLINE — AI Fundamentals (5)
Python, Reasoning, Modern AI, Evaluation, Evolution (+ AI Intro)

### ✅ ONLINE — Computer Vision (partial)
CV Overview + Digital Image Fundamentals (with interactive widgets)
CNN + Advanced CNN → 🔒 Under Development

### 🔒 UNDER DEVELOPMENT (20+)
Deep Learning, RL, ML, Math, LLM, VLM, Multimodal, Agentic, Culture, Healthcare, UI/UX, Manufacturing, Biz Insight, People Mgt, Geospatial, Bioinformatics, Data Eng, Data Sci, Infra, Deploy, Front-end, Back-end

---

## 🚫 HARD BLOCK

- **Go services** (Signaling, Messaging, Participant Portal)
- **Admin dashboard** (`pages/dashboard/`, `js/dashboard/`)
- **Auth flow** — jangan ubah tanpa approval
- **provision/generate accounts** — AKAN RESET AKUN
- **forceReset:true** — AKAN RESET DATA
- **231 lesson HTML files** — CSS/JS injection only
- **js/main.js** — TANYA DULU
- **js/router.js** — lazy loading modified. TANYA DULU
- **ai-python-basic.js** — INTENTIONAL SKIP, namespace collision
- **5 module struktur berbeda**: ai-cv.js, ai-math-for-ai.js, ai-ml-basic.js, ai-python-basic.js, ai-reasoning.js
- **GAS Code.gs** — HANYA bug fix/feature diminta user. Redeploy setiap edit.

---

## ⚠️ TEMUAN KRITIS

1. participantPortalOpen: HARUS lowercase "true"
2. Login form: #profileNik, #profilePassword, #participantLoginForm
3. GAS Token field: `participantToken` NOT `token`
4. Dashboard response: `data.modules`, `data.leaderboard`
5. chapter_id: NUMBER from sheet → use String()
6. Playwright: page.goto() > page.evaluate(), primeSettings() before nav
7. Leaderboard formula: `sum(quiz) + (chapters×15) + (practice×5)`
8. ai-modern.js: BEGINNER_GUIDES, not PYTHON_GUIDES
9. CV: ai-cv.js + ai-cv-interactive.js (1,241 lines)
10. Dashboard filter: only ai-python/ai-reasoning/ai-modern/ai-evaluation/ai-evolution
11. Password Brenda: bisa berubah setelah E2E password test

---

## 🔑 DATA FLOW

```
CHAPTER → saveChapterProgress(id, ch, 'completed') → participant_progress
QUIZ   → saveChapterProgress(id, 'quiz', 'completed', score)
PRACTICE → saveChapterProgress(id, 'practice', 'completed')
LOGIN  → participantLogin(nik, pw) → 3 jalur → token 12 jam
DASHBOARD → initParticipantDashboardData() → 3-tier cache
LEADERBOARD → computeLiveLeaderboard() → aggregate by NIK → top 10
```

---

## 🔧 TOOLS

```bash
node server.js                                    # → :3000
TEST_PARTICIPANT_NIK="8204086711010003" TEST_PARTICIPANT_PASSWORD="brenda123" npx playwright test --workers=1
node --check js/router.js
node --check js/frontend/fellow-dashboard/settings.js
```

---

## 📐 20 RULE WAJIB

1. Commit PER FITUR | 2. Update handover & gemini.md | 3. Bug baru #78+
4. No dark theme — light pink | 5. CSS scope ai-lab-content
6. Diagram kontras | 7. NO NIK/password exposed | 8. TANYA user
9. Verify: node --check, E2E | 10. NO provision/generate
11. NO touch 231 lesson files | 12. sessionStorage = source of truth
13. Bump cache buster | 14. No silent fail | 15. NO push GitHub
16. Redeploy GAS after Code.gs edit | 17. TANYA before edit struktur berbeda
18. page.goto() > page.evaluate() | 19. __aiLabLoader integrated
20. No router.js module handler change without loader wrapper
