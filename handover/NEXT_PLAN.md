# NEXT PLAN — HerAI Fellowship SuperApp

**Tanggal:** 29 Juli 2026

**Baseline:** `6508121` sebelum resolusi audit #78–#91

**GAS:** ✅ `2026.2-progress-persistence` deployed; route diskusi baru + auth guard terverifikasi live

**QA:** safe mock 77/77 PASS; full 88 PASS + 44 SKIP + 0 FAIL; authenticated live read-only 29 PASS + 18 SKIP + 0 FAIL; controlled live write/read-back PASS
**Leaderboard:** status terakhir terverifikasi LIVE — 1.039 pts sebelum dan sesudah controlled mutation

---

## CURRENT STATE

Phase 0 QA dan seluruh perbaikan audit #78–#91 sudah tersedia di source. Test tidak menulis ke GAS production secara default.

| Area | Status | Catatan |
|---|---|---|
| Active-module manifest | ✅ | 5 card dashboard + AI Intro; CV Digital Image dicatat terpisah |
| Route/content smoke | ✅ | overview, practice, quiz, discussion |
| Payload progress mock | ✅ | lima module: chapter/practice/quiz + score benar |
| Ringkasan Belajar | ✅ live | dinamis dari `learningSummary`; tetap 33% setelah controlled mutation |
| Quiz readiness | ✅ | 5 module memiliki quiz nyata; Evaluation/Evolution masing-masing 20 soal |
| Quiz navigator | ✅ | Evaluation/Evolution/Reasoning horizontal + wrap |
| Metadata score | ✅ code | Reasoning 26; module lain 20 |
| Responsive/focus/motion | ✅ | 375/768/1280, keyboard focus, reduced motion |
| Mobile touch target | ✅ | kontrol utama minimum 44px |
| Backend aggregation | ✅ live | hanya chapter numerik unik; summary stabil setelah re-save idempotent |
| Error feedback save | ✅ | loading/success/error + retry; lock setelah ack |
| Reasoning quiz navigator | ✅ | 26 tombol horizontal/wrap pada mobile |
| Runtime module | ✅ | Modern integrity passed; Evaluation/Evolution tanpa pageerror |
| Module identity copy | ✅ | label module-specific |
| Discussion persistence | ✅ live | post/reply + read-back production terverifikasi |
| Isi jawaban practice (#92) | ⚠️ open | marker selesai masuk backend, tetapi teks jawaban masih localStorage-only |
| Pengantar AI active material (#93) | ✅ | 5/5 route menandai satu current item dengan visual + `aria-current` |

Safe mock gate: **77/77 PASS**, tanpa expected failure dan tanpa live write. Audit serta bukti resolusi tersedia di `handover/E2E_AUDIT_2026-07-29.md`.

---

## URUTAN LANGKAH BERIKUTNYA

1. **Putuskan scope #92:** jika isi jawaban latihan harus tercatat lintas perangkat, tambah schema/API practice-response, frontend acknowledgment/read-back, dan E2E production-safe.
2. **Perluas controlled live matrix bila dibutuhkan:** test kelima module satu per satu dengan fixture QA terisolasi; test saat ini membuktikan seluruh tipe data utama tanpa mengubah score/progress logis.
3. **Frontend release:** push/deploy hanya jika diminta user; cache buster `settings.js` sudah `20260729-intro-active-state`.

Authenticated read-only sudah selesai pada baseline 94 row progress (42 chapter numerik unik, 26 practice, 25 quiz). Controlled mutation kemudian lulus untuk chapter, marker practice, quiz, diskusi, dan reply. Ringkasan Belajar tetap 33% (1 tuntas, 4 proses, 1 belum mulai) dan leaderboard tetap 1.039 poin.

---

## DEFINITION OF DONE PER MODULE

Satu module baru boleh dinyatakan sehat jika:

- semua route mengarah ke konten module yang benar, bukan UD/restricted;
- overview mencatat chapter ID numerik yang valid;
- practice dan quiz menampilkan konten nyata serta feedback loading/success/error;
- chapter, score quiz, status practice, diskusi, dan reply tersimpan ke backend serta terbaca kembali setelah reload;
- bila isi jawaban practice wajib lintas perangkat, response body juga harus dipersist sebelum module dinyatakan lengkap (#92);
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
