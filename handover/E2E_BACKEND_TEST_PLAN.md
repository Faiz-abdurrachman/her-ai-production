# E2E Backend Test Plan — Participant Progress

**File utama:** `e2e/participant-backend.spec.js`

**Runner:** Playwright, menggunakan Node `fetch()` melalui `POST /__gas`

**Coverage:** 20 test terdaftar dalam 5 group

**Default:** request mutasi di-skip

## Tujuan

Memastikan kontrak frontend/proxy/GAS konsisten untuk login, progress chapter, nilai kuis, latihan, dashboard, profil, dan password—tanpa menjadikan akun production sebagai fixture yang selalu dimutasi.

## Kontrak Penting

- Login menerima `nik` + `password`, lalu mengembalikan `token`, `profile`, dan `expires_at`.
- Protected actions memakai field `participantToken`, bukan `token`.
- `getParticipantProgress` mengembalikan array pada `data`, bukan `progress`.
- `getParticipantDashboardData` mengembalikan `{data: {modules, leaderboard, tracks, journey, events}}`.
- Item dashboard tidak memiliki `module_id`; identifikasi lewat `href` atau `title`.
- `chapter_id` chapter harus numerik; `quiz` dan `practice` adalah kategori khusus.
- Score dashboard harus 0–100 setelah dinormalisasi dengan denominator yang benar.

## Policy Eksekusi

| Level | Prasyarat | Jenis test |
|---|---|---|
| Local/static | tidak ada | invalid token/NIK dan pemeriksaan non-kredensial |
| Live read | `TEST_PARTICIPANT_NIK` + `TEST_PARTICIPANT_PASSWORD` | login, dashboard, validation yang tidak mengubah data |
| Live write | kredensial + `TEST_ALLOW_MUTATIONS=true` | progress, score, practice, profile |
| Password cycle | semua di atas + `TEST_ALLOW_PASSWORD_MUTATIONS=true` | ganti password lalu restore |

Kredensial tidak boleh ditulis di source, dokumentasi, command history yang di-commit, atau artifact report.

## Test Matrix

### 1. Authentication — 7 test

- login valid mengembalikan token/profile/expiry;
- NIK tidak terdaftar, password salah, input kosong;
- endpoint terlindungi tanpa token dan dengan token invalid.

### 2. Progress CRUD — 5 test

- simpan chapter aktif;
- simpan quiz + score;
- simpan practice;
- write lalu read kembali dari `data`;
- upsert idempotent tidak membuat duplicate key module/chapter.

### 3. Dashboard — 2 test

- struktur dashboard lengkap;
- score kuis tampil dalam persen 0–100.

### 4. Password — 3 test

- full change/login/restore cycle dengan opt-in khusus;
- password lama salah;
- field kosong ditolak.

### 5. Edge Cases — 3 test

- update profile;
- highest quiz score dipilih oleh dashboard;
- progress dua module aktif tetap terpisah.

## Urutan Aman Menjalankan

```bash
# 1. Safe deterministic frontend/backend-contract mock
npm run test:qa:mock

# 2. Live read-only
TEST_PARTICIPANT_NIK="<qa-nik>" \
TEST_PARTICIPANT_PASSWORD="<qa-password>" \
npm run test:qa:live:read

# 3. Hanya staging atau akun QA yang boleh diubah
TEST_ALLOW_MUTATIONS=true \
TEST_PARTICIPANT_NIK="<qa-nik>" \
TEST_PARTICIPANT_PASSWORD="<qa-password>" \
npm run test:qa:live:write
```

Siklus password tetap di-skip pada langkah 3. Untuk mengaktifkannya, operator harus menambahkan `TEST_ALLOW_PASSWORD_MUTATIONS=true` pada command yang sama.

## Acceptance Criteria

Sebuah flow progress baru dianggap benar jika:

1. UI mengirim identity module/chapter yang valid.
2. GAS mengembalikan `status: success` dan frontend memeriksa hasil tersebut.
3. Data dapat dibaca kembali setelah reload/session baru.
4. Dashboard dan Ringkasan Belajar menghitung dari sumber data yang sama.
5. Quiz/practice tidak ikut dihitung sebagai chapter selesai.
6. Error backend terlihat di UI dan tidak gagal diam-diam.
7. Mutation test berjalan pada dataset yang boleh diubah serta memiliki strategi restore/cleanup.

## Known Gaps dari Audit 29 Juli 2026

- #78 Ringkasan Belajar masih hardcoded.
- #79 denominator kuis Reasoning masih tidak sinkron (UI 26 vs GAS 20).
- #80 Evaluation/Evolution FIXED: masing-masing 20 soal dan score payload terverifikasi mock.
- #81/#82 write identity AI Modern rusak.
- #84 backend mengagregasi quiz/practice sebagai chapter.
- #85 frontend menelan kegagalan save.

Jangan mengubah atau deploy `gas/Code.gs`, module berstruktur khusus, maupun kredensial peserta hanya untuk membuat test hijau. Perbaikan harus mendapat approval dan expected failure dihapus hanya setelah acceptance test benar-benar lolos.
