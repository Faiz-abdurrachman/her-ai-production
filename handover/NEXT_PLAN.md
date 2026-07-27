# NEXT PLAN — HerAI Fellowship SuperApp

**Tanggal:** 28 Juli 2026
**Sesi:** Sisyphus sesi ke-3
**Last commit: `ff6d639`
**Total commits: 232 (main)
**Worktree:** BERSIH
**E2E Tests: 40/40 PASS (GAS timeout on remaining — pre-existing)

---

## CURRENT STATE ASSESSMENT

### Semua Prioritas NEXT_PLAN.md: SELESAI
6/6 prioritas dari sesi sebelumnya sudah dikerjakan. Tidak ada pekerjaan tersisa dari backlog existing.

| # | Priority | Task | Effort | Status |
|---|----------|------|--------|--------|
| 1 | P1 | Business module glossary fix (7 modules) | 2-3h | **DONE (#63)** |
| 2 | P2 | Data Engineering module glossary fix (7 modules) | 2-3h | **DONE (#63)** |
| 3 | P3 | Module bersih content + routes | 8-12h → 4h | **DONE (#66)** |
| 4 | P4 | Lazy loading + code splitting | 3-5h | **DONE (#64)** |
| 5 | P5 | AI lab UX polish | 5-8h | **DONE (#65)** |
| 6 | P6 | ai-python.js review | 1-2h | **DONE — PASS** |

### Bonus: Avatar/Foto Profil (#67)
Fitur tambahan yang diminta user — upload, preview, crop, display. **DONE.**

---

## FOKUS SELANJUTNYA — DISKUSI DENGAN USER

Semua prioritas dari NEXT_PLAN.md sudah selesai. **TANYA KE USER** apa yang mau dikerjakan selanjutnya. Tidak ada asumsi — tunggu arahan user.

Beberapa opsi yang mungkin (konfirmasi dulu):
1. **Bug fix** — jika ada bug baru yang muncul
2. **Fitur baru** — sesuai kebutuhan user
3. **Polish lebih lanjut** — improvement pada fitur existing
4. **Testing/QA** — coverage tambahan

---

## STATUS MODULE LENGKAP

| Module | JS File | Size | Status |
|--------|---------|------|--------|
| Deep Learning | ai-deep-learning.js | ~100KB | ✅ Konten + routes |
| Reinforcement Learning | ai-reinforcement-learning.js | ~80KB | ✅ Konten + routes |
| Python untuk AI | ai-python.js | ~30KB | ✅ Rewritten #59 |
| Reasoning AI | ai-reasoning.js | 170KB | ✅ Konten + routes |
| Konsep AI Modern | ai-modern.js | ~40KB | ✅ Konten (BEGINNER_GUIDES) |
| Evolution of AI | ai-evolution.js | ~20KB | ✅ Placeholder |
| Evaluation AI | ai-evaluation.js | ~20KB | ✅ Placeholder |
| Machine Learning | ai-ml-basic.js | 24KB | ✅ Routes active #66 |
| Computer Vision | ai-cv.js | 11KB | ✅ Routes active #66 |
| Math for AI | ai-math-for-ai.js | 53KB | ✅ Routes active #66 |
| 18 business/data-eng modules | ai-*.js | various | ✅ Konten injected #57 |

---

## YANG BELUM/TERTUNDA

| Item | Status | Catatan |
|------|--------|---------|
| Password Brenda | ⚠️ | Perlu diisi ulang `brenda123` di sheet setelah E2E password test |
| GAS redeploy terbaru | ✅ | Sudah redeploy (avatar sheet storage) |
| ai-python-basic.js | HARD BLOCK | Namespace collision — JANGAN disentuh |
| Module placeholder (evolution, evaluation) | ⚠️ | Konten minimal — butuh enrichment kalo diminta user |
