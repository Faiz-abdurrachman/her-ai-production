# HerAI Active Modules QA Report

**Tanggal:** 29 Juli 2026, Asia/Jakarta

**Baseline:** `6c35926`

**Scope:** 5 module dashboard, AI Intro, progress/quiz/practice contract, route, UI/UX

**Safety:** deterministic mock; tidak ada write ke GAS/akun peserta live

## Release Gate

**Status: BLOCKED untuk klaim “progress dan semua kuis sudah benar end-to-end”.**

Navigation dan quiz readiness lima module sudah sehat, tetapi masih ada data-integrity gap pada AI Modern, perhitungan backend, dan ringkasan progress.

## Hasil Otomatis

| Item | Hasil |
|---|---:|
| Seluruh test terdaftar | 115 |
| Safe mock gate dieksekusi | 62 |
| Kontrak lolos | 56 |
| Expected known failures | 6 |
| Unexpected failures | 0 |
| Live backend writes | 0 |

Expected failure tetap merupakan bug produk terbuka. Test sengaja mempertahankan assertion yang benar dan menandainya agar suite bisa menjadi baseline berulang, tanpa menyamarkan defect.

## Matriks Module Aktif

| Module | Overview | Practice UI | Quiz UI | Discussion | Progress write contract |
|---|---|---|---|---|---|
| Python untuk AI | PASS | PASS | PASS | PASS | PASS |
| Reasoning AI | PASS | PASS | PASS | PASS | PASS; metadata quiz FAIL (#79) |
| Konsep AI Modern | PASS | PASS | PASS | PASS | FAIL (#81, #82) |
| Evaluation AI | PASS | PASS | PASS — 20 soal | PASS | PASS, score 0–20 tercatat |
| Evolution of AI | PASS | PASS | PASS — 20 soal | PASS | PASS, score 0–20 tercatat |

AI Intro ikut terdaftar dalam manifest enam module di halaman AI Fundamentals. CV Digital Image dicatat terpisah karena tidak termasuk lima card dashboard yang menjadi fokus phase ini.

## Temuan Prioritas

| # | Severity | Area | Temuan | Bukti/kontrak |
|---|---|---|---|---|
| 78 | High | Frontend/data | Ringkasan Belajar tetap 0/0/6 saat mock backend non-zero | dynamic-summary test |
| 79 | High | Frontend/backend | denominator kuis Reasoning 26 soal masih tercatat 20 di GAS | static metadata contract |
| 81 | Critical | Frontend/backend | submit AI Modern melempar `MODULE_ID is not defined` | intercepted GAS write + page error |
| 82 | Critical | Frontend/backend | chapter AI Modern dikirim sebagai object, bukan ID numerik | numeric chapter contract |
| 83 | Medium | Mobile UX | tombol 43,5px dan 42px pada viewport 375px | 44px touch-target gate |
| 84 | High | Backend | quiz/practice berstatus completed ikut dihitung sebagai chapter | review `getParticipantDashboardData()` |
| 85 | High | Error handling | response save tidak diperiksa dan `catch` kosong | review `saveChapterProgress()` |

## Fixed pada Checkpoint Ini

- #80 Evaluation AI: 20 soal nyata, empat opsi, jawaban benar, dan pembahasan.
- #80 Evolution of AI: 20 soal nyata, empat opsi, jawaban benar, dan pembahasan.
- Keduanya lolos render count, complete-answer validation, submit, score range 0–20, dan payload mock GAS.
- Metadata keduanya sekarang cocok dengan GAS `quiz_total: 20`; #79 tersisa hanya untuk Reasoning.
- #86 Navigator kuis Evaluation/Evolution sekarang horizontal, wrap otomatis, tombol 44×44px, dan bebas overflow pada 375/1280px.

## UI/UX Gate

PASS:

- dashboard memaparkan tepat lima card module aktif dengan accessible name;
- tidak ada horizontal overflow pada 375px, 768px, dan 1280px;
- ringkasan tidak mengandalkan warna saja dan donut punya label aksesibel;
- keyboard focus terlihat pada card dashboard;
- CSS menghormati `prefers-reduced-motion`;
- animasi/toast/accordion/progress baseline P5 tetap berfungsi.
- navigator 20 soal tersusun horizontal dan wrap secara responsif.

OPEN:

- dua tombol praktik mobile belum mencapai 44×44px (#83);
- save progress tidak menunjukkan loading/error yang dapat dipercaya ketika backend gagal (#85).

## Safety dan Observability

- E2E source tidak menyimpan literal kredensial peserta.
- Mock mencegat `/__gas` dan menyimpan request untuk assertion, bukan meneruskannya ke production.
- Kredensial live hanya dibaca dari environment variable.
- Mutating suites tidak berjalan kecuali kredensial tersedia **dan** `TEST_ALLOW_MUTATIONS=true`.
- Siklus ganti password tetap skip kecuali `TEST_ALLOW_PASSWORD_MUTATIONS=true` juga diberikan.
- Playwright menghasilkan reporter list, HTML, JSON, plus screenshot/trace/video saat failure.

## Perintah Re-run

```bash
# Safe gate
npm run test:qa:mock

# Enumerasi seluruh coverage
npm run test:qa:list

# Read-only live contract (kredensial dari luar repo)
TEST_PARTICIPANT_NIK="<qa-nik>" \
TEST_PARTICIPANT_PASSWORD="<qa-password>" \
npm run test:qa:live:read
```

Live mutation tidak direkomendasikan ke akun production. Gunakan staging/dedicated QA dataset dan opt-in eksplisit bila siklus write→read→reload→cleanup sudah diotorisasi.

## Rekomendasi Urutan Fix

1. #81, #82, #84, #85 — integritas dan feedback penyimpanan.
2. #78 — jadikan progress backend sumber tunggal untuk Ringkasan Belajar.
3. #79 — samakan denominator Reasoning.
4. #83 — naikkan `min-height` control menjadi sekurangnya 44px.
5. Setelah fix, jalankan safe gate lalu live read-only; lakukan mutation test hanya di staging.
