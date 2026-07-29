# NEXT PLAN — HerAI Fellowship SuperApp

**Tanggal:** 29 Juli 2026

**Baseline:** `6508121` sebelum resolusi audit #78–#91

**GAS:** user melaporkan redeploy setelah #94, tetapi sebelum perubahan #95. Source lokal sekarang `2026.3.1-cv-locked`; versi live, seed metadata, dan read-back pasca-#95 belum diverifikasi

**QA:** safe mock 85/85 PASS; full 96 PASS + 44 SKIP + 0 FAIL; authenticated live read-only terakhir 29 PASS + 18 SKIP pada GAS 2026.2; controlled live write/read-back terakhir PASS
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
| Isi jawaban practice (#92) | ⚠️ deferred | User menerima batasan sementara: marker selesai masuk backend, tetapi teks jawaban masih localStorage-only |
| Pengantar AI active material (#93) | ✅ | 5/5 route menandai satu current item dengan visual + `aria-current` |
| Dynamic module release contract (#94) | ✅ code | `is_active` + `tracking_enabled` + `dashboard_visible` + `phase_id`; source GAS 2026.3.1, deployment pasca-#95 belum terverifikasi |
| Pengantar AI chapter 1–5 (#94) | ✅ code | save + `getParticipantProgress` read-back; progress sidebar tidak lagi dihitung dari posisi route |
| Journey Fellowship (#94) | ✅ code | Foundation/Specialization dihitung dari module aktif; phase tanpa sumber memakai ikon kunci + `Belum Dibuka` |
| Computer Vision release lock (#95) | ✅ code | 9 route CV + seluruh prefix child menampilkan Under Development; loader/progress CV tidak berjalan; default tracking dinonaktifkan |
| Pengantar AI practice editability (#96) | ✅ code | Payload kosong/corrupt tidak mengunci textarea; save kosong ditolak; jawaban nyata bertahan setelah reload dan dapat diedit |

Safe mock gate: **85/85 PASS**, tanpa expected failure dan tanpa live write. Full suite **140 = 96 PASS + 44 SKIP + 0 FAIL**. Audit serta bukti resolusi tersedia di `handover/E2E_AUDIT_2026-07-29.md`.

---

## URUTAN LANGKAH BERIKUTNYA

1. **Audit deployment live tanpa mutation:** buka endpoint GET GAS dan catat `doGet.version`. Jangan menganggap redeploy user sudah memuat #95 karena deployment tersebut terjadi sebelum source CV lock dibuat.
2. **Migrasi/redeploy GAS #94/#95:** paste/save `gas/Code.gs`, jalankan `seedDashboardModules()` dan `seedDashboardJourney()` dari Apps Script editor, lalu buat deployment baru. Pastikan `doGet.version=2026.3.1-cv-locked`, `trackingModules` tepat enam Foundation, dan `computer-vision` tidak masuk tracking. Tindakan ini membutuhkan konfirmasi user.
3. **Release/verifikasi frontend #94–#96:** pastikan build terbaru terdeploy. Cache buster `settings.js` harus `20260729-intro-practice-editable`; router harus `20260729-cv-locked`. Fix #96 tidak membutuhkan redeploy GAS.
4. **Verifikasi Pengantar AI production:** dengan approval mutation, buka topik 1–5 memakai akun QA dan pastikan chapter `1..5` terbaca kembali serta summary berubah idempotent. Jangan mengubah password/profile.
5. **Scope #92 ditunda dengan sepengetahuan user:** isi jawaban latihan masih localStorage-only. Jika nanti harus tercatat lintas perangkat, tambah schema/API practice-response, frontend acknowledgment/read-back, dan E2E production-safe.

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
