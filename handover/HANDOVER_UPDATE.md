# Handover Update - HerAI Fellowship SuperApp

**Tanggal:** 17 Juli 2026
**Auditor:** Sisyphus AI Agent
**Dasar:** Perbandingan antara `docs/DEVELOPER_HANDOVER_AND_ROADMAP.md` (13 Juni 2026) dan kondisi aktual kode

---

> **Status dokumen:** snapshot historis audit 17 Juli. Untuk kondisi operasional
> terbaru, baca [`AI_HANDOFF_CURRENT_STATE.md`](AI_HANDOFF_CURRENT_STATE.md).
> Jangan menggunakan angka provisioning atau instruksi akun di dokumen ini
> untuk menjalankan reset/provisioning.

> **Koreksi audit 19 Juli:** istilah “FULLY BUILT”, “COMPLETE”, atau “Production”
> di dokumen historis ini sering berarti file/UI sudah ada, bukan workflow
> end-to-end. Audit terbaru menemukan Math, ML, NLP, dan CV masih diblokir router;
> mayoritas halaman program peserta masih prototype; Pengaturan belum tersambung
> penuh; dan ganti password mandiri belum tersedia. Gunakan
> [`MODULE_STATUS_MAP.md`](MODULE_STATUS_MAP.md) untuk klasifikasi terbaru.

## 1. Ringkasan Perubahan Besar

Sejak handover terakhir (13 Juni 2026), mentor telah membangun **perubahan massif** terutama di area **Participant Dashboard** dan **AI Learning Modules**.

### Statistik Perbandingan

| Area | Handover Lama | Kondisi Aktual | Delta |
|---|---|---|---|
| Total HTML pages | ~50+ | ~170+ | **+120 halaman** |
| JS files | ~25 | ~65+ | **+40 file** |
| CSS files | ~15 | 33 | **+18 file** |
| GAS baris kode | ~350 | 1.608 | **+1.258 baris** |
| GAS actions | ~25 | 40+ | **+15 action** |
| GAS sheets | ~13 | 20+ | **+7 sheet** |
| Participant Dashboard | Stub/placeholder | **UI luas, banyak workflow masih prototype** | 131 HTML + 55 JS |
| AI Learning Content | Tidak ada | **6 modul aktif; 4 course substantif diblokir** | Ratusan halaman materi |
| QA coverage | Tidak ada | **44 test pass** | 3 script QA |

---

## 2. Yang Dibangun Mentor (Detail)

### 2.1 Participant Dashboard - UI Luas, Operasional Parsial

**Sebelum:** Hanya placeholder "under development"
**Sesudah:** Sistem participant dashboard lengkap dengan fitur:

| Fitur | File | Status |
|---|---|---|
| Dashboard beranda | `fellow-dashboard/dashboard.html` + CSS | Real |
| Katalog modul | `fellow-dashboard/modules.html` + CSS | Real |
| Profile peserta | `fellow-dashboard/profile.html` + CSS | Real |
| Chatroom | `fellow-dashboard/chatroom.html` + CSS | Real |
| Community | `fellow-dashboard/community.html` + CSS | Real |
| Events | `fellow-dashboard/events.html` + CSS | Real |
| Tasks | `fellow-dashboard/tasks.html` + CSS | Real |
| Projects | `fellow-dashboard/projects.html` + CSS | Real |
| Certificates | `fellow-dashboard/certificates.html` + CSS | Real |
| Leaderboard | `fellow-dashboard/leaderboard.html` + CSS | Real |
| Mentor page | `fellow-dashboard/mentor.html` + CSS | Real |
| Help page | `fellow-dashboard/help.html` + CSS | Real |
| Settings | `fellow-dashboard/settings.html` + CSS | Prototype visual |
| Course placeholder engine | `course-placeholder.js` (1141 baris) | Generic renderer |

### 2.2 AI Learning Modules - 6 Modul Aktif dalam 1 Course Payung

**Foundation Core AI:**

| Modul | Materi | Latihan | Kuis | Diskusi | Chapters |
|---|---|---|---|---|---|
| 01 Pengantar AI | ✅ | ✅ | ✅ | ✅ | lesson.html (10 sub-topik) |
| 02 Python untuk AI | ✅ | ✅ | ✅ | ✅ | 15 chapter files |
| 03 Konsep AI Modern | ✅ | ✅ | ✅ | ✅ | 4 chapter files |
| 04 Reasoning | ✅ | ✅ | ✅ | ✅ | 6 chapter files |

**AI Advanced:**

| Modul | Materi | Latihan | Kuis | Diskusi | Chapters |
|---|---|---|---|---|---|
| 05 Evaluation | ✅ | ✅ | ✅ | ✅ | 6 chapters |
| 06 Evolution of AI | ✅ | ✅ | ✅ | ✅ | 7 chapters |

### 2.3 AI Lab Modules - HANDS-ON LESSONS

**Computer Vision (CV):** 11 file lesson dengan JS interaktif
- pixel-anatomy.html (1294), cnn-intro (637), cnn-why (810), cnn-relu (539), cnn-fc (508), cnn-arch (677), cnn-hands (488), cnn-arch-builder (436), filtering-kernels (1314), morphological-transforms (1295), image-processing-opencv (1607)

**NLP:** 5 file lesson
- tokenization (731), preprocessing (1171), pos-ner (908), bow (855), tfidf (824)

**Machine Learning:** 5 legacy lessons
- ml-intro (594), ml-hypothesis (747), ml-bias-variance (736), ml-vc-dim (800)

**JS Interactive Engines:**
- `ai-python.js` (1994 baris) - full interactive code runner
- `ai-reasoning.js` (2646 baris) - reasoning exercises
- `ai-modern.js` (1181 baris) - modern AI concepts
- `ai-math-for-ai.js` (760 baris) - math for AI
- `ai-ml-basic.js` (620 baris) - ML basics
- `course-placeholder.js` (1141 baris) - generic rendering engine
- `ai-lab/` - 20+ JS files untuk CV, NLP, ML interactive lessons
- `settings.js` (1830 baris) - shared participant dashboard utilities dan feature
  flags; bukan bukti account settings sudah operasional

**Domain Explorations (scaffold):**
- `data-engineering-domains/` - computer-vision (11 real lessons), nlp (5 real lessons), 7 domain stubs
- `business-industry-applications/` - 7 domain stubs (culture, geospatial, healthcare, manufacturing, dll)
- `generative-multimodal-ai/` - generative AI overview
- `specialization-tracks/` - specialization stubs

### 2.4 Google Apps Script Expansion

**New Sheets:**
| Sheet | Fungsi |
|---|---|
| `ParticipantAccounts` | Akun peserta (username, password, NIK) |
| `ParticipantActivity` | Log aktivitas peserta |
| `participant_dashboard_modules` | Konfigurasi modul dashboard |
| `participant_dashboard_discussion_trails` | Aktivitas diskusi komunitas |
| `participant_dashboard_tracks` | Specialization tracks |
| `participant_dashboard_journey` | Journey/fase fellowship |
| `participant_dashboard_events` | Upcoming events |
| `participant_dashboard_leaderboard` | Leaderboard peserta |

**New Actions (15+):**
| Action | Fungsi |
|---|---|
| `provisionParticipantAccounts` | Batch buat akun peserta |
| `getParticipantAccounts` | Daftar akun peserta |
| `recordParticipantActivity` | Log aktivitas peserta |
| `getParticipantDashboardData` | Data dinamis dashboard peserta |
| `participantLogin` | Login dengan verifikasi password hash |
| `setParticipantPassword` | Function legacy; route publik sudah dinonaktifkan |
| `updateParticipantProfile` | Update profil peserta |
| `addAdmin`, `updateAdmin`, `deleteAdmin` | CRUD admin |
| `saveStage` | Update stage |
| `getBootcampSessions`, `saveBootcampSession` | CRUD bootcamp |
| `saveCompetencyAnswer` | Auto-save jawaban |
| `retestLogin` | Login khusus re-test |
| `startReTestSession` | Mulai sesi re-test |
| `submitReTest` | Submit re-test |
| `generateCertificates` | Generate sertifikat massal |
| `deleteReTestAccess` | Hapus akses re-test |

**Security Hardening:**
- Hash password dengan prefix `pw$1$`
- Migrasi password plaintext ke hash saat login
- `TARGET_PARTICIPANT_PORTAL_EMAILS` - tepat 100 email referensi cohort legacy
- Batch provisioning tersedia sebagai utility legacy; 187 akun existing jangan diprovision ulang

### 2.5 Participant Login & Auth System

- Halaman login NIK/password (`participant-login.html`, 42 baris)
- Verifikasi password dengan hash di GAS
- `TARGET_PARTICIPANT_PORTAL_EMAILS` berisi 100 email dan bukan sumber otoritatif akun
- `ParticipantAccounts` berisi 187 akun existing dan menjadi sumber login
- Fallback lokal di `server.js`: `participant-accounts.json`, `participant-activity.json`

### 2.6 Scripts & Tools Baru

| Script | Fungsi |
|---|---|
| `scripts/check-participant-routes.mjs` | Validasi route participant dashboard |
| `scripts/harden-public.mjs` | Hardening untuk production deployment |
| `scripts/qa-smoke.mjs` (355 baris) | QA automation: 44 check |

### 2.7 Docs Baru

| Dokumen | Deskripsi |
|---|---|
| `docs/admin-selection-scoring-guide.md` | Panduan admin untuk scoring & seleksi |
| `docs/video-conference-communication-network.md` | Detail arsitektur video conference, WebSocket payload, HTTP API, signaling flow |
| `handover/README.md` | Handover baru - project overview |
| `handover/HANDOVER_UPDATE.md` | Ini - perubahan dari handover lama |
| `handover/UNIVERSAL_COSTUME_STANDARD.md` | Standar kode & UI |
| `handover/REGRESSION_AND_ERROR_PLAYBOOK.md` | Playbook debugging |
| `handover/MODULE_STATUS_MAP.md` | Status semua modul |

### 2.8 Router Expansion

Router `js/router.js` (962 baris) sekarang menangani **100+ route** termasuk:
- 50+ route participant AI learning
- Routing untuk AI Lab, specialization, dan under-development pages
- Conditional initializer chaining untuk learning paths

---

## 3. Yang Masih Stub / Perlu Diselesaikan

| Area | Status | Keterangan |
|---|---|---|
| Business & industry course | Outline/placeholder | Tujuh course belum mempunyai lesson final |
| Data & engineering course | Campuran | NLP/CV parsial; course lain mayoritas outline |
| `specialization-tracks/` | Scaffold | Enam track belum mempunyai course final |
| Deep Learning dan Reinforcement Learning | Outline/placeholder | Baru struktur topik |
| Math for AI | Tersedia tetapi diblokir | Materi/latihan/kuis/diskusi ada, route Under Development |
| Machine Learning, NLP, Computer Vision | Tersedia tetapi diblokir | Materi substantif ada, route Under Development |
| Generative AI | Parsial | Overview + scaffold lima modul; belum course final |
| `messaging-closed.html` | Real | 15 baris, page sederhana |
| Final project, certificates, bootcamp admin | Foundation | HTML minimal (30-33 baris) |
| Pion SFU path | Experimental | Ada di Go tapi `USE_SFU_TRANSPORT = false` |
| LiveKit | Optional | Bisa aktif kalau env lengkap |

---

## 4. Catatan Penting untuk Next Developer

1. **GAS production** - `SPREADSHEET_ID` di `gas/Code.gs` (line 13) pointing ke sheet production. Jangan diubah tanpa koordinasi.
2. **Participant cohort reference** - `TARGET_PARTICIPANT_PORTAL_EMAILS` tepat 100 email; jangan gunakan untuk menonaktifkan 87 akun lain.
3. **Akun existing** - 187 akun sudah tersedia; jangan jalankan batch provisioning atau `forceReset:true`.
4. **Password hash** - Format `pw$1$...`; hash legacy tetap diverifikasi dan login pertama dapat menyinkronkan hash current.
5. **QA checkpoint 19 Juli** - regression login peserta dan syntax GAS lulus; lihat checkpoint utama.
6. **Handover folder ini** - letaknya di `/home/faiz/her6/Her-AI/handover/`. Bukan di `docs/`.
7. **Total codebase ~82K+ baris, 280+ file** - jauh lebih besar dari handover sebelumnya.
8. **Status UI bukan bukti backend** - cek data hard-coded, localStorage, action GAS,
   route aktual, dan automated test sebelum menyebut fitur production.
