# NEXT PLAN — HerAI Fellowship SuperApp

**Tanggal:** 29 Juli 2026

**Baseline:** `6508121` sebelum resolusi audit #78–#91

**GAS:** GET read-only 29 Juli 2026 memverifikasi live masih `2026.2-progress-persistence`; source lokal `2026.3.2-participant-access-reconciled`, sehingga #94/#95/#97, seed metadata CV lock, dan rekonsiliasi 100/87 belum live

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
| Dynamic module release contract (#94) | ✅ code | `is_active` + `tracking_enabled` + `dashboard_visible` + `phase_id`; source GAS 2026.3.2, deployment pasca-#97 belum terverifikasi |
| Pengantar AI chapter 1–5 (#94) | ✅ code | save + `getParticipantProgress` read-back; progress sidebar tidak lagi dihitung dari posisi route |
| Journey Fellowship (#94) | ✅ code | Foundation/Specialization dihitung dari module aktif; phase tanpa sumber memakai ikon kunci + `Belum Dibuka` |
| Computer Vision release lock (#95) | ✅ code | 9 route CV + seluruh prefix child menampilkan Under Development; loader/progress CV tidak berjalan; default tracking dinonaktifkan |
| Pengantar AI practice editability (#96) | ✅ code | Payload kosong/corrupt tidak mengunci textarea; save kosong ditolak; jawaban nyata bertahan setelah reload dan dapat diedit |
| Participant access reconciliation (#97) | ✅ code / ⏳ live apply | 187 akun → inner join 100 target + 87 non-target; login non-target ditolak; dry-run `ready_to_apply=true`; Sheet live belum dimutasi |

Safe mock gate: **85/85 PASS**, tanpa expected failure dan tanpa live write. Full suite **140 = 96 PASS + 44 SKIP + 0 FAIL**. Audit serta bukti resolusi tersedia di `handover/E2E_AUDIT_2026-07-29.md`.

---

## URUTAN LANGKAH BERIKUTNYA

1. **Audit deployment live tanpa mutation — DONE:** endpoint GET mengembalikan `2026.2-progress-persistence`; deployment lama belum memuat #94/#95/#97.
2. **Backup + rekonsiliasi akses #97:** duplikat tab `ParticipantAccounts`, save source terbaru, lalu jalankan `auditParticipantPortalAccess()`. Expected: total 187, target 100, outside 87, missing/blank/duplicate 0, `ready_to_apply=true`. Dengan approval live mutation, jalankan `reconcileParticipantPortalAccess()` dan pastikan 100 active + 87 inactive. Fungsi ini tidak mengubah password/progress dan tidak memakai provision/generate/reset.
3. **Migrasi/redeploy GAS #94/#95/#97:** jalankan `seedDashboardModules()` dan `seedDashboardJourney()`, buat deployment baru, lalu pastikan `doGet.version=2026.3.2-participant-access-reconciled`, `trackingModules` tepat enam Foundation, dan `computer-vision` tidak masuk tracking.
4. **Release/verifikasi frontend #94–#96:** pastikan build terbaru terdeploy. Cache buster `settings.js` harus `20260729-intro-practice-editable`; router harus `20260729-cv-locked`. Fix #96 tidak membutuhkan redeploy GAS.
5. **Authenticated read-only:** gunakan akun QA target melalui environment untuk memastikan login tetap sukses, akun non-target ditolak lewat contract test tanpa memakai credential peserta riil, dan dashboard hanya melacak enam Foundation.
6. **Scope #92 ditunda dengan sepengetahuan user:** isi jawaban latihan masih localStorage-only. Jika nanti harus tercatat lintas perangkat, tambah schema/API practice-response, frontend acknowledgment/read-back, dan E2E production-safe.

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
# Audit cohort dari export CSV; output hanya agregat, tanpa PII/credential
node scripts/audit-participant-access.mjs --input "<ParticipantAccounts.csv>"

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
