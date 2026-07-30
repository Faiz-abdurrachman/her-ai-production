# NEXT PLAN — HerAI Fellowship SuperApp

**Tanggal:** 30 Juli 2026

**Baseline:** `6508121` sebelum resolusi audit #78–#91

**Production:** GAS live `2026.3.4-session-cohort-guard`; data #98 live (100 target active); Vercel menyajikan build frontend terbaru. Authenticated seed/tracking read-back tetap pending

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
| Dynamic module release contract (#94) | ✅ deployed / ⏳ auth read-back | `is_active` + `tracking_enabled` + `dashboard_visible` + `phase_id`; endpoint 2026.3.4 live, tracking output belum dibaca dengan akun QA |
| Pengantar AI chapter 1–5 (#94) | ✅ backend+frontend live / ⏳ auth read-back | save + `getParticipantProgress` read-back; progress sidebar tidak lagi dihitung dari posisi route |
| Journey Fellowship (#94) | ✅ backend+frontend live / ⏳ auth read-back | Foundation/Specialization dihitung dari module aktif; phase tanpa sumber memakai ikon kunci + `Belum Dibuka` |
| Computer Vision release lock (#95) | ✅ production live / ⏳ auth read-back | Router production identik dan direct route CV menampilkan Under Development; hasil seed/tracking menunggu read-back akun QA |
| Pengantar AI practice editability (#96) | ✅ frontend live / ⏳ auth UI check | Asset production identik; payload kosong/corrupt tidak mengunci textarea dan save kosong ditolak |
| Participant access reconciliation (#97) | ✅ live code + data / ⏳ auth read-back | Inner join 100 target + 87 non-target selesai; main sheet tepat 100 target active dan login guard berada pada deployment 2026.3.4 |
| ParticipantAccounts compaction (#98) | ✅ live | Main sheet tepat 100 target active; 0 outside/missing/duplicate; backup manual + otomatis tersedia; export read-back lulus |
| Session cohort guard (#99) | ✅ deployed / ⏳ auth read-back | Token lama non-target/inactive ditolak setiap protected request; token Re-Test tetap hanya untuk action Re-Test |

Safe mock gate: **85/85 PASS**, tanpa expected failure dan tanpa live write. Full suite **140 = 96 PASS + 44 SKIP + 0 FAIL**. Audit serta bukti resolusi tersedia di `handover/E2E_AUDIT_2026-07-29.md`.

---

## URUTAN LANGKAH BERIKUTNYA

1. **Audit deployment lama tanpa mutation — DONE:** endpoint sebelum redeploy mengembalikan `2026.2-progress-persistence`.
2. **Compaction live #98 — DONE:** main sheet 100 target active; backup otomatis dan export read-back lulus.
3. **GAS deployment — DONE:** endpoint live `2026.3.4-session-cohort-guard`.
4. **Authenticated read-back:** dengan credential QA via environment, pastikan login target, protected action, enam `trackingModules`, CV excluded, dan dashboard summary konsisten.
5. **Release/verifikasi frontend #94–#96 — DONE:** `main` sudah pushed dan sinkron; Vercel HTTP 200, asset production identik, cache buster benar, dan direct route CV menampilkan Under Development.
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
