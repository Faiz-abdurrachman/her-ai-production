# NEXT PLAN — HerAI Fellowship SuperApp

**Tanggal:** 29 Juli 2026

**Baseline:** `6508121` sebelum resolusi audit #78–#91

**GAS:** production masih ✅ `2026.2-progress-persistence`; source #94/#95 adalah `2026.3.1-cv-locked` dan belum dideploy

**QA:** safe mock 84/84 PASS; full 95 PASS + 44 SKIP + 0 FAIL; authenticated live read-only terakhir 29 PASS + 18 SKIP pada GAS 2026.2; controlled live write/read-back terakhir PASS
**Leaderboard:** sumber live; authenticated read-back terakhir 1.039 pts, screenshot user berikutnya menampilkan Brenda 1.054 pts

---

## CURRENT STATE

Phase 0 QA dan seluruh perbaikan audit #78–#91 sudah tersedia di source. Test tidak menulis ke GAS production secara default.

| Area | Status | Catatan |
|---|---|---|
| Active-module manifest | ✅ | Tepat 6 module Foundation: 5 card dashboard + Pengantar AI; seluruh Computer Vision terkunci |
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
| Dynamic module release contract (#94) | ✅ code | `is_active` + `tracking_enabled` + `dashboard_visible` + `phase_id`; source GAS 2026.3 pending deploy |
| Pengantar AI chapter 1–5 (#94) | ✅ code | save + `getParticipantProgress` read-back; progress sidebar tidak lagi dihitung dari posisi route |
| Journey Fellowship (#94) | ✅ code | Foundation/Specialization dihitung dari module aktif; phase tanpa sumber memakai ikon kunci + `Belum Dibuka` |
| Computer Vision release lock (#95) | ✅ code | 9 route CV + seluruh prefix child menampilkan Under Development; loader/progress CV tidak berjalan; default tracking dinonaktifkan |

Safe mock gate: **84/84 PASS**, tanpa expected failure dan tanpa live write. Full suite **139 = 95 PASS + 44 SKIP + 0 FAIL**. Audit serta bukti resolusi tersedia di `handover/E2E_AUDIT_2026-07-29.md`.

---

## URUTAN LANGKAH BERIKUTNYA

1. **Migrasi schema #94/#95:** paste/save `gas/Code.gs`, jalankan `seedDashboardModules()` dan `seedDashboardJourney()` dari Apps Script editor. Ini menambahkan metadata dan menetapkan current release tepat enam module: Pengantar AI + lima AI Fundamentals; Computer Vision dan 20+ module lain tetap nonaktif.
2. **Redeploy GAS #94/#95:** buat deployment baru, pastikan `doGet.version` menjadi `2026.3.1-cv-locked`, lalu jalankan authenticated read-only contract untuk `trackingModules`, `learningSummary`, dan status `journey`. Pastikan `computer-vision` tidak masuk `trackingModules`.
3. **Release frontend #94/#95:** deploy setelah backend/schema lolos. Cache buster tracking tetap `20260729-dynamic-tracking`; router sudah `20260729-cv-locked`.
4. **Verifikasi Pengantar AI production:** dengan approval mutation, buka topik 1–5 memakai akun QA dan pastikan chapter `1..5` terbaca kembali serta summary berubah idempotent. Jangan mengubah password/profile.
5. **Putuskan scope #92:** jika isi jawaban latihan harus tercatat lintas perangkat, tambah schema/API practice-response, frontend acknowledgment/read-back, dan E2E production-safe.

Authenticated read-only sudah selesai pada baseline 94 row progress (42 chapter numerik unik, 26 practice, 25 quiz). Controlled mutation kemudian lulus untuk chapter, marker practice, quiz, diskusi, dan reply. Ringkasan Belajar tetap 33% (1 tuntas, 4 proses, 1 belum mulai) dan leaderboard tetap 1.039 poin.

---

## DEFINITION OF DONE PER MODULE

Satu module baru boleh dinyatakan sehat jika:

- semua route mengarah ke konten module yang benar, bukan UD/restricted;
- row metadata memiliki `is_active=true`, `tracking_enabled=true`, `phase_id`, serta `total_chapters` benar; `dashboard_visible=true` hanya bila kartunya perlu tampil;
- overview mencatat chapter ID numerik yang valid;
- practice dan quiz menampilkan konten nyata serta feedback loading/success/error;
- chapter, score quiz, status practice, diskusi, dan reply tersimpan ke backend serta terbaca kembali setelah reload;
- bila isi jawaban practice wajib lintas perangkat, response body juga harus dipersist sebelum module dinyatakan lengkap (#92);
- dashboard dan Ringkasan Belajar merefleksikan sumber data yang sama;
- Foundation/Specialization journey berubah dari sumber module yang sama; phase tanpa sumber tidak boleh mengaku `0%` live;
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
