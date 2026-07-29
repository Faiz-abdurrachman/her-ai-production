# NEXT PLAN — HerAI Fellowship SuperApp

**Tanggal:** 29 Juli 2026

**Baseline:** `6508121` sebelum resolusi audit #78–#91

**GAS:** source terbaru sudah diperbaiki; **manual redeploy masih pending**

**QA:** 131 test terdaftar; safe mock gate 76/76 PASS; full 87 PASS + 44 SKIP + 0 FAIL
**Leaderboard:** status terakhir terverifikasi LIVE — 1.024 pts untuk peringkat pertama

---

## CURRENT STATE

Phase 0 QA dan seluruh perbaikan audit #78–#91 sudah tersedia di source. Test tidak menulis ke GAS production secara default.

| Area | Status | Catatan |
|---|---|---|
| Active-module manifest | ✅ | 5 card dashboard + AI Intro; CV Digital Image dicatat terpisah |
| Route/content smoke | ✅ | overview, practice, quiz, discussion |
| Payload progress mock | ✅ | lima module: chapter/practice/quiz + score benar |
| Ringkasan Belajar | ✅ code | dinamis dari `learningSummary`; live menunggu redeploy |
| Quiz readiness | ✅ | 5 module memiliki quiz nyata; Evaluation/Evolution masing-masing 20 soal |
| Quiz navigator | ✅ | Evaluation/Evolution/Reasoning horizontal + wrap |
| Metadata score | ✅ code | Reasoning 26; module lain 20 |
| Responsive/focus/motion | ✅ | 375/768/1280, keyboard focus, reduced motion |
| Mobile touch target | ✅ | kontrol utama minimum 44px |
| Backend aggregation | ✅ code | hanya chapter numerik unik; redeploy pending |
| Error feedback save | ✅ | loading/success/error + retry; lock setelah ack |
| Reasoning quiz navigator | ✅ | 26 tombol horizontal/wrap pada mobile |
| Runtime module | ✅ | Modern integrity passed; Evaluation/Evolution tanpa pageerror |
| Module identity copy | ✅ | label module-specific |
| Discussion persistence | ✅ code | post/reply + read-back lima module; redeploy pending |

Safe mock gate: **76/76 PASS**, tanpa expected failure dan tanpa live write. Audit serta bukti resolusi tersedia di `handover/E2E_AUDIT_2026-07-29.md`.

---

## URUTAN LANGKAH BERIKUTNYA

1. **Manual redeploy GAS:** paste source `gas/Code.gs`, deploy Web App versi baru, pertahankan access policy existing, lalu verifikasi versi `2026.2-progress-persistence`.
2. **Live read-only verification:** jalankan dengan kredensial via secret environment, tanpa `TEST_ALLOW_MUTATIONS`.
3. **Staging mutation E2E:** hanya pada akun QA/dataset yang boleh diubah, dengan opt-in `TEST_ALLOW_MUTATIONS=true`; verifikasi chapter, practice, quiz, discussion, dan dashboard read-back.
4. **Frontend release:** push/deploy hanya jika diminta user; cache buster sudah `20260729-progress-persistence`.

---

## DEFINITION OF DONE PER MODULE

Satu module baru boleh dinyatakan sehat jika:

- semua route mengarah ke konten module yang benar, bukan UD/restricted;
- overview mencatat chapter ID numerik yang valid;
- practice dan quiz menampilkan konten nyata serta feedback loading/success/error;
- payload tersimpan ke backend dan terbaca kembali setelah reload;
- dashboard dan Ringkasan Belajar merefleksikan sumber data yang sama;
- tidak ada console/page error;
- tombol, keyboard focus, touch target, dan layout 375/768/1280 lolos;
- test tidak membutuhkan kredensial hardcoded atau menulis ke production secara default.

---

## COMMANDS

```bash
# Safe deterministic gate — tidak menyentuh GAS live
npm run test:qa:mock

# Hanya baca backend live; kredensial disuplai dari luar repo
TEST_PARTICIPANT_NIK="<qa-nik>" \
TEST_PARTICIPANT_PASSWORD="<qa-password>" \
npm run test:qa:live:read

# Mutasi hanya untuk staging/akun QA yang diizinkan
TEST_ALLOW_MUTATIONS=true \
TEST_PARTICIPANT_NIK="<qa-nik>" \
TEST_PARTICIPANT_PASSWORD="<qa-password>" \
npm run test:qa:live:write

# Untuk ikut mengizinkan siklus password, tambahkan pada command yang sama:
# TEST_ALLOW_PASSWORD_MUTATIONS=true TEST_ALLOW_MUTATIONS=true ... npm run test:qa:live:write
```

Jangan push, edit module berstruktur khusus, atau mengubah/deploy GAS tanpa instruksi user yang eksplisit.
