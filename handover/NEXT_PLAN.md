# NEXT PLAN — HerAI Fellowship SuperApp

**Tanggal:** 29 Juli 2026

**Baseline:** `6c35926` (245 commits sebelum Phase 0 QA)

**GAS:** deployed dari checkpoint sebelumnya; tidak diubah pada Phase 0

**QA:** 115 test terdaftar, safe mock gate 62 test, live mutation default OFF
**Leaderboard:** status terakhir terverifikasi LIVE — 1.024 pts untuk peringkat pertama

---

## CURRENT STATE

Phase 0 QA untuk module aktif sudah tersedia. Test tidak lagi bergantung pada route Deep Learning/Healthcare yang sekarang Under Development, dan tidak menulis ke GAS production secara default.

| Area | Status | Catatan |
|---|---|---|
| Active-module manifest | ✅ | 5 card dashboard + AI Intro; CV Digital Image dicatat terpisah |
| Route/content smoke | ✅ | overview, practice, quiz, discussion |
| Payload progress mock | ✅/⚠️ | empat module lolos; AI Modern gagal (#81, #82) |
| Ringkasan Belajar | ❌ | masih statis (#78) |
| Quiz readiness | ✅ | 5 module memiliki quiz nyata; Evaluation/Evolution masing-masing 20 soal |
| Quiz navigator | ✅ | horizontal + wrap, tombol 44px, desktop/mobile (#86) |
| Metadata score | ⚠️ | hanya Reasoning: UI 26 vs GAS 20 (#79) |
| Responsive/focus/motion | ✅ | 375/768/1280, keyboard focus, reduced motion |
| Mobile touch target | ⚠️ | dua tombol praktik di bawah 44px (#83) |
| Backend aggregation | ⚠️ | quiz/practice ikut dihitung sebagai chapter (#84) |
| Error feedback save | ❌ | respons gagal ditelan frontend (#85) |

Safe mock gate: **62 dieksekusi = 56 ordinary pass + 6 expected failures**, tanpa live write. Expected failure dipertahankan supaya bug terbuka terlihat dan otomatis berubah menjadi failure saat perilakunya bergeser.

---

## URUTAN PERBAIKAN YANG DIREKOMENDASIKAN

1. **Data integrity:** #81, #82, #84, #85.
   - Perubahan `ai-modern.js` perlu approval karena struktur khusus.
   - Perubahan `gas/Code.gs` wajib redeploy dan verifikasi.
2. **Truthful progress UI:** #78 dan kontrak perhitungan status Tuntas/Dalam Proses/Belum Dimulai.
3. **Quiz consistency:** selesaikan mismatch denominator Reasoning #79. #80 sudah fixed.
4. **UI polish:** #83 untuk minimum touch target 44×44px.
5. **Live read-only verification:** jalankan dengan kredensial via environment, tanpa `TEST_ALLOW_MUTATIONS`.
6. **Staging mutation E2E:** hanya pada akun QA/dataset yang boleh diubah, dengan opt-in `TEST_ALLOW_MUTATIONS=true`.

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
