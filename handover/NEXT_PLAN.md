# 📐 NEXT PLAN — HerAI Fellowship SuperApp

**Tanggal:** 27 Juli 2026
**Sesi:** Sisyphus sesi ke-2
**Last commit:** `db93ad8`
**Total commits:** 50
**Worktree:** BERSIH
**E2E Tests:** 53/53 PASS (serial)

---

## 📊 CURRENT STATE ASSESSMENT

### E2E: ✅ COMPLETE
53 tests, 3 files, all pass. Backend API, frontend UI, full workflow integration.
No further E2E work planned.

### Konten Module: ⚠️ MIXED QUALITY

| Category | Count | Quality |
|----------|-------|---------|
| Foundation/Gen AI (deep-learning, rl, agentic-ai, llm, multimodal, vlm) | 6 | **OK** — konten teknis, spesifik modul |
| Data Engineering (deployment, back-end, bioinformatics, data-eng, data-science, front-end, infrastructure) | 7 | **OK** — cukup spesifik |
| Business (ui-ux, healthcare, geospatial, manufacturing, culture, business-insight, people-business-mgt) | 7 | **❌ POOR** — glossary boilerplate |
| Rewritten (ai-python.js) | 1 | **✅ DONE** — 8 GUIDES proper |
| Bersih/Untouched (cv, math-for-ai, ml-basic, python-basic, reasoning) | 5 | **❌ BLANK/NONE** — masih template Python |
| Placeholder (evaluation, evolution, modern) | 3 | **⚠️ MINIMAL** — konten placeholder |

**Total module JS:** 29 files

### Performance: ⚠️ CRITICAL
- **75 script tags** di `index.html` — semua module JS loaded eagerly
- 29 ai-*.js files @ 155-172KB each = **~4.5MB JS** loaded on every page
- Tidak ada lazy loading, code splitting, atau dynamic import

### AI Lab UX: ⚠️ BASIC
- Skeleton loader + error state + fade-in (dari Task C)
- Tidak ada GSAP atau animation library
- Roadmap menggunakan native `<details>` — fungsional tapi basic
- Quiz/practice: form HTML standard, tidak ada interactive polish
- Tidak ada module transition animations

---

## 🔴 PRIORITY 1 — Content Quality: Business Module Glossary Fix

### Masalah
7 business module GUIDES memiliki `glossary` boilerplate:
```json
["desirability", "konsep penting dalam human-centered design dan design thinking yang perlu diberi definisi operasional sebelum dipakai"]
["feasibility", "konsep penting dalam human-centered design dan design thinking yang perlu diberi definisi operasional sebelum dipakai"]
```
Deskripsi **identik** untuk semua term — tidak ada nilai edukasi.

### Approach
Dua opsi:

**Opsi A — Enrich dari Nazril MD (disarankan)**
- 7 business MD files exist di `nazril/modul-materi-herai/business-industry-application/`
- Parse ulang dengan fokus pada glossary/enrichment dari `## Konsep Inti` dan `## Gambaran Sederhana`
- Update `scripts/extract-nazril-guides.js` untuk extract definisi spesifik per term
- Re-inject via `scripts/inject-guides.js --phase=1`

**Opsi B — Rewrite manual (jika MD tidak cukup kaya)**
- Tulis definisi spesifik untuk setiap glossary term
- Contoh: "desirability" → "Tingkat kebutuhan/keinginan pengguna terhadap solusi. Diukur melalui user interview, survey, atau A/B testing. Bukan sekedar 'what users say they want' tapi 'what they actually need.'"

### Implementasi
```
1. Check 1-2 Nazril business MD files untuk ketersediaan definisi glossary
2. Jika cukup → update extraction script → re-extract → re-inject
3. Jika tidak → write 7 module glossary dari nol (estimated 5-8 terms per module)
4. Verify: node --check, visual check glossary tidak boilerplate
```

### Effort: 2-3 jam

---

## 🔴 PRIORITY 2 — Content Quality: Foundation Module Glossary

### Masalah
6 Foundation/Gen AI modules punya `glossary` yang juga placeholder:
```json
["Konsep", "Definisi."]
["Jawaban A", "Jawaban B", "Jawaban C"]
```

### Approach
Sama seperti P1 — enrich dari Nazril MD (ada 6 MD files di `foundation-core-ai/` dan `generative-multimodal-ai/`).

### Implementasi
```
1. Update extract-nazril-guides.js untuk parse glossary dari MD
2. Re-extract Phase 3 (foundation/gen-ai)
3. Re-inject Phase 3
4. Verify all 6 modules have specific glossary definitions
```

### Effort: 2-3 jam

---

## 🔴 PRIORITY 3 — Module Bersih: Content Loading

### Masalah
5 module bersih (cv, math-for-ai, ml-basic, python-basic, reasoning) masih kosong/template:
- `ai-cv.js` — SKIP dari quiz/practice wiring, GUIDES unknown
- `ai-math-for-ai.js` — seed exists di dashboard, redirect under-dev, GUIDES unknown
- `ai-ml-basic.js` — GUIDES unknown
- `ai-python-basic.js` — INTENTIONAL SKIP (namespace collision)
- `ai-reasoning.js` — 172KB file, GUIDES unknown

### Key Constraint
**TIDAK ADA Nazril MD source** untuk 5 modul ini. Konten harus ditulis dari nol.

### Approach

| Module | Status | Rencana | Effort |
|--------|--------|---------|--------|
| `ai-cv.js` | SKIP wiring | Review GUIDES, isi jika kosong | 1-2 jam |
| `ai-math-for-ai.js` | Under-dev redirect | Tulis 8 GUIDES (math untuk AI: linear algebra, probability, stats, calculus, optimization) | 3-4 jam |
| `ai-ml-basic.js` | Unknown | Tulis 8 GUIDES (ML fundamentals: supervised, unsupervised, evaluation, feature engineering) | 3-4 jam |
| `ai-python-basic.js` | SKIP namespace | **JANGAN DISENTUH** — conflict dengan ai-python.js | 0 |
| `ai-reasoning.js` | 172KB (besar!) | Investigasi — mungkin sudah ada konten. Review dulu baru decide | 1-2 jam |

### Implementasi
```
1. Review ai-reasoning.js GUIDES section — check apakah ada konten atau placeholder
2. Review ai-cv.js, ai-math-for-ai.js, ai-ml-basic.js GUIDES
3. Jika kosong → tulis konten per modul (8 GUIDES each)
4. ai-python-basic.js: JANGAN disentuh (HARD BLOCK — namespace collision)
5. Verify: node --check + visual check konten
```

### Effort: 8-12 jam (3 modules @ 3-4 jam each)

---

## 🟡 PRIORITY 4 — Performance: Lazy Loading + Code Splitting

### Masalah
75 script tags, ~4.5MB JS eager-loaded. Setiap page load men-download semua 29 module JS meskipun user hanya akses 1-2 module.

### Approach

**Phase A — Dynamic Script Loading (low risk)**
```
1. Hapus 29 <script> tag ai-*.js dari index.html
2. Di router.js handler, sebelum panggil initAi* function, load script dynamically:
   const script = document.createElement('script');
   script.src = `/js/frontend/fellow-dashboard/ai-module-name.js?v=...`;
   document.head.appendChild(script);
   script.onload = () => initFunction();
3. Cache loaded scripts di Map untuk avoid re-load
```

**Phase B — CSS Splitting (medium risk)**
```
4. Split dashboard.css: core.css (skeleton, layout, nav) + modules.css (roadmap, quiz, practice)
5. Load modules.css on-demand saat user masuk ke module first time
```

**Phase C — Bundle Analysis (informational)**
```
6. Run bundle analysis untuk identify largest files
7. Consider minification/build step
```

### Expected impact
- Initial page load: **4.5MB → ~500KB** (90% reduction)
- First module visit: +160KB (one-time)
- Subsequent module visits: instant (cached)

### Implementasi
```
1. Create lazy loader utility function in settings.js
2. Remove ai-*.js script tags from index.html
3. Add dynamic loading to router.js module handlers
4. Test: semua module pages tetap berfungsi
5. Test: E2E suite re-run — terutama quiz/practice yang depend on IIFE timing
```

### Effort: 3-5 jam
### Risk: MEDIUM — bisa break quiz/practice IIFE timing

---

## 🟡 PRIORITY 5 — AI Lab UX Polish

### Masalah
- Roadmap pakai native `<details>` — fungsional tapi flat
- Quiz: standard radio buttons, no animation
- Practice: standard textarea, no rich feedback
- No module transition animations
- No progress celebration/feedback

### Approach

**A. Roadmap Enhancement (medium effort)**
```
1. Tambah CSS transition: details[open] summary → smooth height animation
2. Active step highlighting (current chapter vs completed vs upcoming)
3. Progress bar animation (CSS transition on width change)
4. Stagger animation saat roadmap pertama kali render
```

**B. Quiz Polish (low effort)**
```
1. Answer feedback animation (correct = green pulse, wrong = red shake)
2. Score reveal animation (count-up number)
3. Radio button → custom styled card selector
```

**C. Module Transitions (medium effort)**
```
1. Page enter animation: fade-in + slide-up (CSS only)
2. Chapter navigation: cross-fade between chapters
3. Loading → content transition: skeleton → smooth reveal
```

**D. Micro-interactions (low effort)**
```
1. Button hover/active states
2. Save confirmation toast/pulse
3. Quiz submit → loading spinner → result reveal
```

### Implementasi
```
Semua pakai CSS animation + native JS. Tidak perlu GSAP/library tambahan.
1. dashboard.css: tambah keyframes + transition utilities
2. settings.js: tambah animation trigger helpers
3. ai-*.js: inject animation classes ke roadmap/quiz/practice render
4. Scope: ai-lab-content (rule #5)
```

### Effort: 5-8 jam

---

## 🟢 PRIORITY 6 — ai-python.js Review

### Status
Sudah di-rewrite sesi kemarin — 8 GUIDES konten Python proper.

### Yang perlu dicek
1. Apakah konten akurat dan cukup dalam untuk AI/ML context?
2. Apakah hook questions engaging?
3. Apakah quickCheck + challenge relevan?
4. Apakah glossary sudah spesifik atau masih generic?

### Implementasi
```
1. Baca full ai-python.js GUIDES section
2. Review: akurasi, kedalaman, engagement
3. Jika minor issues → fix langsung
4. Jika major gaps → rewrite dengan referensi tambahan
```

### Effort: 1-2 jam

---

## 📊 EXECUTION ORDER

| # | Priority | Task | Effort | Depends On |
|---|----------|------|--------|------------|
| 1 | 🔴 P1 | Business module glossary fix (7 modules) | 2-3h | — |
| 2 | 🔴 P2 | Foundation module glossary (6 modules) | 2-3h | — |
| 3 | 🔴 P3 | Module bersih content (3-4 modules) | 8-12h | — |
| 4 | 🟡 P4 | Lazy loading + code splitting | 3-5h | P1-P3 (need stable module JS) |
| 5 | 🟡 P5 | AI lab UX polish | 5-8h | P4 (need lazy loading for transition testing) |
| 6 | 🟢 P6 | ai-python.js review | 1-2h | — |

**Total estimated effort:** 21-33 jam

---

## 🚫 HARD BLOCK REMINDER

- `ai-python-basic.js` — **JANGAN disentuh** (namespace collision)
- 231 lesson HTML files — jangan edit, pakai CSS injection
- `js/main.js`, `js/router.js` — TANYA dulu sebelum edit
- No push GitHub without approval
- Commit PER fitur, update gemini.md setiap commit
- GAS redeploy hanya jika edit Code.gs
- NO provision/generate participant accounts

---

## 📝 QUICK WINS (bisa dikerjain duluan)

1. **ai-python.js review** (1-2h) — paling ringan, bisa langsung
2. **Business glossary fix** (2-3h) — high impact, low risk, extraction script sudah ada
3. **Foundation glossary fix** (2-3h) — high impact, low risk

---

## ⚡ NEXT SESSION START

Begitu next AI masuk, ini yang harus dibaca (urutan):
1. `handover/AI_HANDOFF_CURRENT_STATE.md` — single source of truth
2. `gemini.md` — bug #1-62
3. **`handover/NEXT_PLAN.md` (INI)** — execution plan
4. `handover/NEXT_AI_TRANSFER_PROMPT.txt` — system identity + rules
