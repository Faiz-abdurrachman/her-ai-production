# Audit Materi dan Feature Gap HerAI Fellowship SuperApp

**Tanggal audit:** 19 Juli 2026  
**Workspace:** `/home/faiz/her6/Her-AI`  
**Jenis audit:** Read-only codebase audit, tanpa mengubah data Google Sheets atau deployment  
**Cakupan:** Materi pembelajaran, route peserta, halaman publik, dashboard peserta, dashboard admin, GAS, Node gateway, dan tiga service Go

## 1. Ringkasan Eksekutif

Project ini mempunyai basis implementasi yang besar dan beberapa alur penting sudah nyata, tetapi tampilan yang lengkap belum selalu berarti fiturnya sudah operasional.

### 1.1 Angka utama

| Area | Hasil audit |
|---|---:|
| File Markdown dalam `materi/` | 200 |
| Total baris Markdown | 111.574 |
| Materi utama terkurasi | 14 file |
| Arsip halaman HTML | 121 file |
| Arsip sumber JavaScript dinamis | 35 file |
| Outline course/track | 28 file |
| Course dalam katalog LMS | 26 |
| Specialization track dalam katalog | 6 |
| Course katalog yang masih placeholder | 20 |
| Specialization track yang masih scaffold | 6 |
| Route AI Lab/track yang diarahkan ke `under-development.html` | 72 |

### 1.2 Kesimpulan singkat

1. **Ekspor Markdown sudah lengkap terhadap materi yang ada di repository.** HTML, JavaScript dinamis, versi canonical, dan versi legacy sudah dicatat dengan manifest dan checksum.
2. **Kurikulum belum lengkap terhadap janji katalog 25+ modul.** Dari 26 course katalog:
   - 1 course payung, **AI Fundamentals & Advanced**, aktif dan berisi 6 modul substantif;
   - 4 course mempunyai materi substantif, tetapi route peserta masih diblokir;
   - 1 course, Generative AI, baru parsial;
   - 20 course baru berupa outline/placeholder.
3. **Enam specialization track belum mempunyai course final.** Semua masih berupa outline generik.
4. **Masalah terbesar materi saat ini bukan hanya penulisan konten, tetapi wiring route.** Math for AI, Machine Learning, NLP, dan Computer Vision sudah mempunyai banyak materi nyata, tetapi peserta tetap menerima halaman Under Development.
5. **Banyak halaman peserta adalah prototype visual.** Tasks, mentor, events, community, projects, certificates, leaderboard, dan chatroom menampilkan contoh data hard-coded dan belum menjadi workflow peserta yang terhubung penuh ke backend.
6. **Beberapa fitur admin membaca data GAS, tetapi operasi tambah/edit masih lokal.** Bootcamp, final project, certificates, assets, dan learning content belum mempunyai CRUD end-to-end yang konsisten.
7. **Ada security debt penting di GAS.** Login peserta sudah memakai token, tetapi action admin tidak mempunyai otorisasi server-side dan beberapa action sensitif masih dapat dipanggil tanpa sesi admin.
8. **QA saat ini belum cukup menjadi release gate.** Route checker hanya mengecek keberadaan file, sehingga route ke halaman Under Development dianggap lulus. Service Go dapat dikompilasi, tetapi belum memiliki test case.

## 2. Definisi Status

Status di laporan ini tidak ditentukan dari jumlah baris atau tampilan visual saja.

| Status | Definisi |
|---|---|
| **Tersedia dan aktif** | Isi substantif ada dan route peserta membuka materi tersebut. |
| **Tersedia tetapi diblokir** | Isi substantif ada, tetapi route aktif menunjuk ke halaman Under Development. |
| **Parsial** | Ada overview atau beberapa bagian, tetapi belum membentuk course lengkap. |
| **Outline/scaffold** | Struktur topik ada, tetapi isi materi, latihan, kuis, dan diskusi masih teks draft generik. |
| **Prototype visual** | UI terlihat lengkap, tetapi data/aksi utama masih hard-coded, lokal, atau tidak tersambung backend. |
| **Operasional di kode** | Frontend dan backend contract tersedia; status deployment production tetap perlu diverifikasi. |

“Lengkap” dalam laporan ini berarti lengkap terhadap implementasi repository, bukan jaminan bahwa materi sudah melewati review Subject Matter Expert, proofreading, accessibility review, atau uji peserta.

## 3. Audit Folder `materi/`

### 3.1 Struktur ekspor

| Lapisan | Jumlah | Fungsi |
|---|---:|---|
| Materi utama terkurasi | 14 | Menggabungkan seluruh sumber per subject agar mudah dibaca. |
| Outline course/track | 28 | Menyimpan konfigurasi scaffold dari `course-placeholder.js`. |
| Arsip halaman | 121 | Satu Markdown untuk setiap halaman HTML sumber. |
| Arsip sumber dinamis | 35 | JavaScript lengkap untuk konten yang dirender dinamis. |
| README | 1 | Indeks manusia. |
| Manifest | 1 | Pemetaan sumber, ukuran, output, dan checksum. |
| **Total** | **200** | Seluruh ekspor Markdown yang tersedia. |

File penting:

- `materi/README.md`
- `materi/MANIFEST.md`
- `materi/00-katalog-dan-cakupan.md`
- `scripts/export-learning-materials.mjs`

### 3.2 Apakah ada materi repository yang terpotong?

Tidak ditemukan indikasi pemotongan oleh proses ekspor:

- halaman HTML disimpan satu per satu;
- sumber JavaScript dinamis disimpan utuh di dalam Markdown;
- versi legacy tetap dipertahankan;
- manifest mencatat ukuran dan checksum setiap output;
- total arsip mencakup 121 halaman HTML dan 35 sumber JavaScript pembelajaran.

Batasannya:

- materi yang hanya ada di Google Sheets/Drive/production dan tidak ada di workspace tidak dapat diaudit dari filesystem;
- state jawaban pengguna di browser tidak termasuk materi;
- duplikasi di file terkurasi memang berasal dari beberapa versi sumber dan tidak boleh dihapus tanpa editorial review.

## 4. Matriks Materi yang Sudah Tersedia

### 4.1 AI Fundamentals & Advanced — aktif

| Modul | Isi yang ditemukan | Aktivitas | Runtime | Status |
|---|---|---|---|---|
| Pengantar AI | Materi utama, 10 subtopik, kasus sosio-teknis | Latihan, kuis, diskusi | Route aktif | **Tersedia dan aktif** |
| Python untuk AI | 15 chapter, environment, sintaks, collection, control flow, function, OOP, file I/O, NumPy, Pandas, mini workflow | Practice, mini project, kuis 20 soal, diskusi | Route aktif | **Tersedia dan aktif** |
| Konsep AI Modern | Foundation model, transformer, agent, sistem AI modern, oversight | Latihan, kuis, diskusi | Route aktif | **Tersedia dan aktif** |
| Reasoning AI | Reasoning, decomposition, chain-of-thought, tool use, integrated workflow | Latihan, evaluasi, kuis, diskusi | Route aktif | **Tersedia dan aktif** |
| Evaluation AI | Output evaluation, benchmark, reliability, robustness, bias, fairness, evaluation plan | Latihan, kuis, diskusi | Route aktif | **Tersedia dan aktif** |
| Evolution of AI | Symbolic AI, ML, RL, VAE/GAN, diffusion, transformer/LLM, hybrid AI | Latihan, kuis, diskusi | Route aktif | **Tersedia dan aktif** |

Catatan:

- Overview AI Fundamentals juga tersedia.
- Enam modul di atas adalah area belajar paling siap di repository.
- Tetap diperlukan SME review untuk referensi, konsistensi istilah, tingkat kesulitan, dan learning outcomes.

### 4.2 Materi substantif yang belum bisa dibuka peserta

| Course | Isi yang ditemukan | Kekurangan | Runtime | Status |
|---|---|---|---|---|
| Math for AI | Linear algebra, statistik, probabilitas, kalkulus, optimisasi, case study | Belum ada penyimpanan progres server-side | Seluruh route Math menuju Under Development | **Tersedia tetapi diblokir** |
| Machine Learning | 8 chapter canonical, supervised/unsupervised, regression/classification, probabilistic model, SVM, neural network; versi legacy juga ada | Belum ada grading/progress terpusat | Seluruh route ML menuju Under Development | **Tersedia tetapi diblokir** |
| Natural Language Processing | Tokenization, preprocessing, POS/NER, Bag-of-Words, TF-IDF | Belum menjadi track NLP/LLM penuh; ada satu tombol “Coming Soon” pada POS/NER | Overview dan 5 lesson menuju Under Development | **Tersedia tetapi diblokir** |
| Computer Vision | 11 lesson: pixel, filtering, morphology, OpenCV, CNN intro/why/ReLU/FC/hands/architecture/builder | Belum mencakup course specialization final seperti detection, segmentation, ViT, dan portfolio project | Overview dan 11 lesson menuju Under Development | **Tersedia tetapi diblokir** |

Ini adalah quick win terbesar. File dan initializer sudah ada, serta asset JavaScript sudah dimuat oleh `index.html`, tetapi guard router berhenti sebelum initializer tersebut dijalankan.

### 4.3 Materi parsial

| Course | Yang tersedia | Yang belum tersedia | Runtime | Status |
|---|---|---|---|---|
| Generative AI | Satu halaman overview substantif dan scaffold 5 modul yang diperkaya | Course canonical lengkap, latihan, kuis, diskusi, project, dan assessment final | Route menuju Under Development | **Parsial** |
| AI for Industries | Halaman publik berisi lima contoh sektor/case study | Bukan course LMS; tidak ada lesson, latihan, kuis, diskusi, atau project rubric | Hanya halaman publik | **Parsial** |

## 5. Materi yang Belum Tersedia

### 5.1 Dua puluh course yang masih placeholder

File outline memang ada di `materi/04-outline-course-dan-spesialisasi/`, tetapi isi aktivitasnya masih berbentuk kalimat generik seperti “Draft materi…”, “Draft latihan…”, “Draft kuis…”, dan “Draft diskusi…”.

#### Foundation & Core AI

1. Deep Learning
2. Reinforcement Learning

#### Generative & Multimodal AI

3. LLM
4. VLM
5. Multimodal LLM
6. Agentic AI

#### Data & Engineering Domains

7. Bioinformatics
8. Data Engineering
9. Data Science
10. Infrastructure
11. Deployment
12. Front-end
13. Back-end

#### Business & Industry Applications

14. Business Insight
15. People & Business Management
16. AI for Culture
17. AI for Healthcare
18. UI/UX Design Thinking
19. AI for Manufacturing
20. AI for Geospatial

Folder halaman final untuk area-area tersebut masih berisi `.gitkeep`, bukan lesson HTML final.

### 5.2 Enam specialization track yang masih scaffold

1. Computer Vision Track
2. Speech Recognition Track
3. NLP & LLM Track
4. MLOps & Deployment Track
5. Multimodal LLM Track
6. Medical & Biology AI Track

Setiap track sudah mempunyai outline sekitar lima modul, tetapi konten aktivitas masih generik dan folder halaman final hanya berisi `.gitkeep`.

### 5.3 Gap terhadap syllabus publik

Syllabus publik menjanjikan beberapa area yang belum diwujudkan sebagai course final:

- Fundamental Data Science & EDA;
- Statistical Thinking & Probability sebagai course terpisah;
- Deep Learning Fundamentals;
- Reinforcement Learning Basics;
- Data Engineering Pipelines;
- Back-end Development for ML APIs;
- Cloud Infrastructure & Databases;
- LLM, RAG, dan fine-tuning;
- VLM, object detection, dan segmentation;
- Multimodal dan Agentic AI;
- Speech/ASR/TTS;
- Bioinformatics dan Medical AI;
- MLOps, Docker, Kubernetes, cloud, observability;
- tujuh business/industry courses;
- Pitching & Effective Communication;
- enam specialization tracks end-to-end.

## 6. Masalah Route Materi

### 6.1 Kondisi aktual

Di `js/router.js`, baris route AI Lab dan specialization mengarah ke:

```text
/pages/frontend/fellow-dashboard/under-development.html
```

Jumlahnya **72 route**. Ini mencakup seluruh route Math, Machine Learning, NLP, Computer Vision, Generative AI, course placeholder, dan specialization track.

Router mempunyai initializer untuk Math, ML, NLP, dan CV, tetapi sebelum blok initializer dijalankan terdapat guard:

```text
if routeUrl adalah under-development, render halaman tersebut lalu return
```

Akibatnya initializer materi yang sudah tersedia tidak pernah terpanggil.

### 6.2 Blind spot checker

`node scripts/check-participant-routes.mjs` melaporkan:

```text
Total: 114 | 114 passed | 0 failed
```

Hasil itu hanya berarti file target ada. Checker tidak membedakan lesson nyata dengan satu halaman Under Development. Karena itu, hasil tersebut tidak dapat dipakai sebagai bukti bahwa course sudah aktif.

### 6.3 Perbaikan yang dibutuhkan

1. Tambahkan expected-target map untuk course yang seharusnya sudah siap.
2. Jadikan route checker gagal jika course siap masih menunjuk ke Under Development.
3. Sambungkan route Math, ML, NLP, dan CV ke file HTML aktual.
4. Jalankan browser smoke test untuk overview, lesson, latihan, kuis, diskusi, next/previous navigation, mobile sidebar, dan logout.
5. Jangan mengaktifkan 20 placeholder dan 6 track sebelum kontennya benar-benar final.

## 7. Audit Fitur Project

### 7.1 Halaman publik dan proses seleksi

| Area | Yang sudah ada | Gap utama | Status |
|---|---|---|---|
| Home, about, curriculum, FAQ, industry | Halaman konten publik | Konten statis, belum melalui CMS; beberapa klaim/tanggal perlu editorial review | **Foundation** |
| Registrasi | Form lengkap, validasi, NIK parsing, submit ke GAS | Perlu production E2E dan observability error | **Operasional di kode** |
| Pengumuman | Lookup NIK, stage, countdown, setting GAS | Perlu production E2E per stage | **Operasional di kode** |
| Login peserta | NIK + password dari `ParticipantAccounts`, profil dari `peserta_tahap_1`, token 12 jam | Deploy GAS terbaru belum dikonfirmasi dan akun production belum diuji end-to-end | **Operasional di kode, deploy belum pasti** |
| Competency test | Session, soal, autosave/heartbeat, scoring, focus/media flags | Belum ada automated browser test dan recovery test jaringan | **Substantif** |
| Re-test | Access code, session, monitor, submit | Belum ada automated E2E | **Substantif** |
| Public project submission | List dan submit final project melalui GAS dengan local fallback | Perlu validasi akses peserta dan sinkronisasi dengan participant project UI | **Foundation** |
| Graduation | Informasi TBA dan RSVP disabled | Jadwal, RSVP, streaming, attendee workflow | **Placeholder publik** |
| Wall of Fame | Slot visual reserved | Data fellow, ranking, profil, project, social links dari backend | **Placeholder publik** |

### 7.2 Dashboard peserta

| Area | Yang sudah ada | Gap utama | Status |
|---|---|---|---|
| Dashboard home | Dapat membaca modules, trail, track, journey, event, leaderboard dari GAS | Progress bersifat row global, bukan hasil agregasi aktivitas per peserta; fallback berisi data contoh | **Foundation dinamis** |
| Modules catalog | Katalog 26 course dan 6 track, filter/tab | 72 route diblokir; statistik 26 course/8 selesai/32%/48 jam hard-coded | **Parsial** |
| Learning activity | Kuis/latihan interaktif dan `ParticipantActivity` append-only | Jawaban/progres utama banyak tersimpan di `localStorage`; belum ada enrollment, completion, gradebook, resume lintas device | **Parsial** |
| Profile | Profil login dan update GAS | Halaman sendiri menyatakan task, mentoring, dan dokumen baru akan disambungkan bertahap | **Foundation** |
| Tasks | UI daftar tugas, deadline, point, status | Data dan aksi submit belum tersambung backend; contoh task hard-coded | **Prototype visual** |
| Projects | UI project board peserta | Berbeda dari public project workflow; data, create, filter, team, feedback hard-coded | **Prototype visual** |
| Events | UI event/calendar | Data contoh, join/calendar/filter belum end-to-end | **Prototype visual** |
| Mentor | UI mentor dan schedule | Matching, availability, booking, reminder, meeting record belum tersambung | **Prototype visual** |
| Community | Feed, topic, contributor UI | Posting, reaction, moderation, persistence, notification belum ada | **Prototype visual** |
| Certificates | Galeri dan filter sertifikat | Data nama/sertifikat contoh; download dan verification URL belum nyata | **Prototype visual** |
| Leaderboard | UI ranking lengkap | Halaman utama hard-coded; hanya widget dashboard yang mempunyai GAS contract | **Prototype visual** |
| Settings | Form dan portal feature flags | Sebagian setting hanya browser/local service; belum ada account/security preference terpusat | **Foundation** |
| Help | FAQ dan contact cards | Contact link masih `#`; belum ada ticketing/helpdesk | **Konten statis** |

### Duplikasi surface yang perlu dirapikan

- `#/messaging` membuka `fellow-dashboard/chatroom.html`, yaitu chatroom hard-coded.
- Implementasi messaging yang berbicara ke service Go berada di `#/messaging-alt`.
- Sidebar peserta mengarah ke `#/messaging`, sehingga implementasi messaging nyata tidak menjadi alur utama.
- Public final project page mempunyai integrasi GAS, sedangkan `#/participant-projects` masih prototype terpisah.
- Widget leaderboard dashboard dapat membaca GAS, sedangkan halaman leaderboard peserta masih berisi contoh statis.

### 7.3 Dashboard admin

| Modul | Kondisi aktual | Gap |
|---|---|---|
| Selection database/dashboard | Membaca dan memperbarui data peserta | Server-side admin authorization belum ada |
| Scoring dan AI pre-screening | Flow dan action GAS tersedia | Butuh audit model, retry, quota, cost, dan E2E |
| Competency/re-test monitoring | Membaca session dan decision | Butuh automated test dan operational runbook |
| Data Visualization | Mengambil participant, competency, dan retest data lalu merender 20+ visual | Dokumen lama menyebut stub, tetapi kode sekarang substantif; masih perlu privacy/access control |
| Stage Control | Membaca/simpan stage | Otorisasi hanya di browser |
| Global Settings | Membaca/simpan setting | Perlu single source of truth dan audit perubahan |
| RBAC | UI role, tambah/edit/hapus admin | Enforcement route berada di browser; action admin GAS tidak memverifikasi token/role |
| Learning Content | Editor localStorage dan tombol Sync GAS | `getLearningContent`, `saveLearningContent`, dan `deleteLearningContent` hanya ada di dokumen contract, belum ada di `gas/Code.gs`; konten tidak mengubah halaman course aktual |
| Assets & Links | CRUD lokal dan mencoba `saveAsset` | Tidak load dari GAS; delete/toggle tidak sync; payload frontend memakai object `asset`, sedangkan GAS membaca field top-level sehingga contract tidak cocok |
| Bootcamp | Dapat membaca `getBootcampSessions` | Tambah sesi hanya localStorage; tidak memanggil `saveBootcampSession`; attendance selalu 0% |
| Final Project | Dapat membaca `getFinalProjects` | Tambah team hanya localStorage; scoring, mentor, status, feedback, dan submission belum end-to-end |
| Certificates | Dapat membaca `getCertificates`; GAS punya `generateCertificates` | Tombol Generate hanya membuat sample lokal dan tidak memanggil action GAS; preview PDF, issue, send, revoke, verify belum ada |
| Audit Trail | Log dan tampilan tersedia | Action log/admin belum dilindungi server-side |

### 7.4 Backend dan services

| Komponen | Yang sudah ada | Gap utama | Status |
|---|---|---|---|
| Node gateway | Static SPA, `/__gas`, settings, security headers, fallback opt-in | Belum ada automated integration test terhadap GAS production | **Operasional** |
| GAS | 48 action terdeteksi; registration, participant login, selection, assessment, project, certificate, dashboard data | Deployment terbaru belum dikonfirmasi; auth admin dan beberapa contract belum selesai | **Foundation-production** |
| Messaging Go | Login bcrypt, bearer session, friend, room, WebSocket, encrypted payload contract, attachment metadata, origin whitelist | Persistence satu file JSON; session in-memory; belum PostgreSQL; belum backup/migration/concurrency strategy | **Prototype backend kuat** |
| Signaling Go | WebSocket room signaling, P2P, LiveKit optional, Pion SFU code, GAS proxy | Client menetapkan `USE_SFU_TRANSPORT = false`; P2P tidak cocok untuk room besar; TURN/LiveKit deployment perlu verifikasi | **P2P foundation** |
| Participant Portal Go | Feature flag settings, file persistence, origin check, optional admin key | Frontend default fallback berbeda dari service; admin key kosong berarti write diizinkan; service hanya mengelola flags | **Utility service** |

## 8. Security dan Data Integrity Gap

Temuan ini tidak diubah dalam audit, tetapi perlu dijadwalkan bersama senior karena dapat memengaruhi workflow admin:

1. **Action admin GAS tidak mempunyai token/role enforcement server-side.**
   - Login admin hanya menyimpan status di `sessionStorage`/`localStorage`.
   - Pengguna yang mengetahui Web App URL dapat mencoba action admin langsung.
2. **`getParticipantAccounts` mengembalikan baris mentah.**
   - Helper sanitasi sudah ada, tetapi route masih memakai `getRows(...)` langsung.
   - Field `generated_password` dan `password_hash` berisiko terekspos.
3. **`provisionParticipantAccounts` dapat dipanggil dari route tanpa sesi admin.**
   - Request reset yang salah dapat merotasi password peserta.
4. **`getData`, `getAdmins`, update status/score/settings/stage, certificate, dan project admin action tidak dilindungi server-side.**
5. **Fallback contoh dapat menyamarkan kegagalan backend.**
   - Dashboard dapat tetap terlihat “berisi” walau GAS kosong/error.
6. **Belum ada audit khusus XSS untuk konten HTML dari Learning Content.**
   - Editor mengizinkan HTML ringan, tetapi pipeline sanitasi/publish belum dibuat.

## 9. QA dan Release Engineering Gap

### Yang berhasil divalidasi

- `scripts/check-participant-routes.mjs`: 114 route mempunyai file target.
- `go test ./...` pada `messaging/`, `signaling/`, dan `participant-portal/`: build berhasil.
- Syntax JavaScript utama berhasil diperiksa.
- Material manifest dan file ekspor tersedia.

### Yang belum tersedia

- Tidak ada test file Go; hasilnya `[no test files]`.
- Tidak ada unit test suite frontend.
- Tidak ada browser E2E untuk login → dashboard → course → quiz → logout.
- Tidak ada automated test untuk role admin dan forbidden action.
- Tidak ada semantic route test yang menolak target Under Development.
- Tidak ditemukan CI workflow repository.
- QA report 17 Juli sebelumnya terblokir karena konfigurasi cache dan service tidak berjalan; hasil itu bukan release approval.
- Belum ada load test untuk 100 participant, WebSocket, assessment heartbeat, atau meeting.
- Belum ada backup/restore drill untuk Sheets, JSON messaging, dan portal settings.

## 10. Prioritas Rekomendasi

### P0 — sebelum menyatakan portal peserta siap

1. Konfirmasi `gas/Code.gs` terbaru sudah di-deploy sebagai new version pada deployment existing.
2. Jalankan E2E satu akun nyata tanpa mencatat NIK/password:
   - login;
   - token terbit;
   - dashboard terbuka;
   - profile update;
   - activity log;
   - logout dan expiry.
3. Lindungi action admin GAS dengan token dan role server-side.
4. Ganti route `getParticipantAccounts` ke response yang sudah disanitasi dan batasi provisioning ke admin.
5. Perbaiki route checker agar 72 target Under Development tidak dianggap course lulus.

### P1 — quick win materi dan LMS

1. Sambungkan route Math for AI ke lima halaman aktual.
2. Sambungkan route Machine Learning ke overview, 8 chapter, latihan, kuis, dan diskusi.
3. Sambungkan route NLP ke overview dan 5 lesson.
4. Sambungkan route Computer Vision ke overview dan 11 lesson.
5. Lakukan smoke test desktop/mobile untuk seluruh route di atas.
6. Buat model progress per peserta:
   - enrollment;
   - lesson started/completed;
   - quiz attempts dan score;
   - total progress;
   - resume lintas perangkat.
7. Hilangkan statistik course/progress yang hard-coded.

### P1 — fitur operasional program

1. Satukan participant projects dengan GAS final project workflow.
2. Buat CRUD task, submission, rubric, feedback, dan deadline.
3. Buat event/mentor schedule dan booking.
4. Sambungkan certificate page ke registry nyata.
5. Jadikan messaging Go route utama atau hapus duplikasi static chatroom.
6. Lengkapi admin Bootcamp, Final Project, dan Certificate agar seluruh mutation benar-benar masuk GAS.

### P2 — produksi konten

1. Finalisasi Generative AI.
2. Tulis 20 course placeholder menjadi materi final dengan standar:
   - learning outcomes;
   - prerequisite;
   - chapter;
   - contoh;
   - praktik;
   - kuis dan pembahasan;
   - diskusi;
   - referensi;
   - project/rubric.
3. Tulis enam specialization track end-to-end.
4. Tambahkan Pitching & Effective Communication agar sesuai syllabus.
5. Lakukan SME review, citation review, proofreading, accessibility, dan pilot test.

### P2 — CMS dan admin

1. Implementasikan tiga action Learning Content di GAS atau pilih backend CMS lain.
2. Hubungkan hasil publish CMS ke route peserta, bukan hanya localStorage.
3. Tambahkan versioning, preview, draft/publish, rollback, audit, dan sanitasi HTML.
4. Perbaiki contract Assets dan tambahkan load/delete/toggle GAS.
5. Implementasikan PDF certificate, verification URL/QR, issue/revoke, dan delivery.

### P3 — scale dan reliability

1. Migrasikan messaging JSON ke PostgreSQL.
2. Persist session/token messaging atau gunakan stateless signed token.
3. Aktifkan LiveKit atau selesaikan Pion SFU setelah integration/load test.
4. Konfigurasikan TURN untuk jaringan ketat.
5. Tambahkan metrics, structured logging, alerting, backup, dan disaster recovery.
6. Tambahkan CI untuk syntax, unit, integration, semantic route, dan browser E2E.

## 11. Urutan Eksekusi yang Disarankan

```text
Deploy dan verifikasi login peserta
        ↓
Tutup security gap action GAS
        ↓
Aktifkan 4 course yang materinya sudah ada
        ↓
Bangun progress/gradebook peserta
        ↓
Sambungkan task, project, event, mentor, certificate, messaging
        ↓
Finalisasi 20 course + 6 specialization track
        ↓
Scale messaging dan meeting
```

Alasannya: menulis 26 area baru sebelum route, auth, dan progress model stabil akan memperbesar rework.

## 12. Bukti dan File Rujukan

| Temuan | Sumber utama |
|---|---|
| Inventaris materi | `materi/README.md`, `materi/MANIFEST.md` |
| Katalog 26 course + 6 track | `pages/frontend/fellow-dashboard/modules.html` |
| 20 placeholder + 6 scaffold track | `js/frontend/fellow-dashboard/course-placeholder.js` |
| 72 route Under Development | `js/router.js` |
| Materi Math/ML/NLP/CV aktual | `pages/frontend/fellow-dashboard/` dan `js/frontend/fellow-dashboard/` |
| Dashboard fallback/contoh | `js/frontend/fellow-dashboard/settings.js` |
| Participant pages hard-coded | `pages/frontend/fellow-dashboard/*.html` |
| Admin partial CRUD | `js/dashboard/admin-modules.js` |
| Action GAS dan auth | `gas/Code.gs` |
| Messaging persistence | `messaging/main.go` |
| P2P/LiveKit/SFU | `js/frontend/meeting.js`, `signaling/main.go` |
| Portal feature flags | `participant-portal/main.go` |
| QA blind spot | `scripts/check-participant-routes.mjs`, `scripts/qa-smoke.mjs` |

## 13. Keputusan Status Akhir

| Sasaran | Status |
|---|---|
| “Semua materi repository sudah diekspor ke Markdown tanpa potongan” | **Ya, sejauh sumber yang ada di workspace.** |
| “Semua course yang dijanjikan sudah mempunyai materi final” | **Belum.** |
| “Semua materi substantif sudah dapat dibuka peserta” | **Belum; Math, ML, NLP, dan CV diblokir route.** |
| “Dashboard peserta sudah memakai data nyata di semua halaman” | **Belum; mayoritas halaman core masih prototype visual.** |
| “Dashboard admin sudah CRUD end-to-end” | **Belum; beberapa modul read-only atau localStorage.** |
| “Backend aman untuk action admin” | **Belum; perlu server-side admin auth/RBAC.** |
| “Project siap production penuh” | **Belum; login/selection kuat, tetapi LMS, portal program, security, dan QA masih perlu pekerjaan prioritas.** |
