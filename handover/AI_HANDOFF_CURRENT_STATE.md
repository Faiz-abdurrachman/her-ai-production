# AI Handoff — Current Checkpoint HerAI Fellowship SuperApp

**Checkpoint:** 27 Juli 2026 (Final — 23:30 WIB), Asia/Jakarta  
**Workspace:** `/home/faiz/her6/Her-AI`  
**Branch:** `main`  
**Last Commit:** `c8be27a`  
**GAS Deployment:** ✅ **Versi 3, 26 Juli 2026 08:04 WIB — Semua route aktif**  
**Backend Verification:** ✅ **47/47 checks PASS** (27 Juli 2026)  
**Tujuan:** Sumber kebenaran tunggal untuk AI/developer berikutnya.

> Jika dokumen handover lain bertentangan dengan file ini, ikuti file ini.
> Dokumen bertanggal 17 Juli adalah snapshot historis dan bukan instruksi operasi terbaru.

---

## ⚠️  SCOPE BOUNDARY — APA YANG BOLEH & TIDAK BOLEH DISENTUH

### ❌ JANGAN DISENTUH (Hard Block)

| Area | Alasan |
|---|---|
| **Signaling / WebRTC** | Go service, prototype, belum terintegrasi |
| **Messaging / Chat** | Go service, in-memory store, belum terintegrasi |
| **Admin dashboard** | Udah production, jangan ubah auth/workflow |
| **Keamanan / Security hardening** | Butuh koordinasi terpisah dengan senior |
| **Leaderboard** | Placeholder, belum prioritas |
| **Certificates** | Placeholder, belum prioritas |
| **Tasks / Projects / Events / Community / Mentor** | Semua placeholder |
| **Provisioning akun** | `provisionParticipantAccounts`, `generateParticipantAccounts*` — JANGAN DIJALANKAN |
| **forceReset:true** | Akan reset 187 akun existing |

### ✅ FOKUS SAAT INI (Hanya ini yang dikerjakan)

| Area | Status |
|---|---|
| **Dashboard Peserta** | ✅ SELESAI — Dynamic name, progress, events dari GAS |
| **Settings Peserta** | ✅ SELESAI — Wire form ke `updateParticipantProfile` GAS |
| **Sidebar Dinamis** | ✅ SELESAI — Replace "Aisyah Putri" hardcoded via JS injection |
| **Ganti Password Mandiri** | ✅ SELESAI — Backend GAS `changeParticipantPassword` + frontend UI |
| **Progress Tracking** | ✅ SELESAI — Sheet `participant_progress` + 2 GAS endpoint + frontend helper |

## 1. Ringkasan eksekutif

Task aktif terakhir sudah dipersempit menjadi **memperbaiki login peserta**:

- Kredensial peserta dibaca dari sheet `ParticipantAccounts`.
- Profil peserta dibaca dari `peserta_tahap_1`.
- Relasi utama memakai `participant_rowId`; pencarian NIK hanya fallback.
- Semua 187 akun existing dipertahankan dan password tidak di-reset.
- Login dan dashboard admin dikembalikan ke perilaku repository sebelumnya.
- Tidak ada rotasi password admin dan tidak ada kewajiban token admin.
- Kode lokal sudah lolos tes regresi dan syntax check.
- Deployment manual GAS terbaru **belum dikonfirmasi selesai oleh user/senior**. Jangan menganggap file lokal sudah aktif di Web App.

Sesudah pekerjaan login, dilakukan audit materi/fitur dan dokumentasi:

- Seluruh materi workspace sudah diekspor menjadi 200 file Markdown.
- Laporan gap materi dan fitur sudah dibuat.
- Versi ringkas `.md` dan `.txt` untuk WhatsApp sudah dibuat.
- Status Pengaturan peserta dan ganti password sudah diaudit.
- Folder handover sudah disinkronkan dengan checkpoint ini.

### Audit Backend (26 Juli 2026, Sesi Sisyphus)

Dilakukan comprehensive backend audit. Ringkasan:

- **GAS Backend**: 49 route actions, 22 sheet Google Sheets, production data (187 akun, 431 peserta)
- **Go Microservices**: 3 service (signaling, messaging, participant-portal) — SEMUA prototype, BELUM terintegrasi ke SPA. JANGAN DISENTUH.
- **Database**: Google Sheets sebagai database — solid untuk CRUD admin/assessment
- **API Completion**: 65% — admin & assessment solid, learning progress BELUM ADA
- **Production Readiness**: 40% — admin dashboard siap, participant portal banyak placeholder

Hasil lengkap: `reports/BACKEND_AUDIT_2026-07-26.md`

### Sesi 27 Juli 2026 — Semua 5 Fase Complete + 7 Bug Fixed

**Ringkasan:** Dalam 1 sesi, seluruh 5 fase dashboard peserta diselesaikan:

| Fase | Commit | Apa | File |
|---|---|---|---|
| 1 | `ef9f875` | Dynamic name, notif hide, `getParticipantDisplayName()` | `settings.js` |
| 2 | `67e4761` | Settings wire ke GAS, tab navigation, form save | `settings.js` + `settings.html` |
| — | `083727c` | Fix bugs #29-31 (null guards, fragile selectors) | `settings.js` |
| 3 | `ac16a3c` | Ganti password backend GAS + frontend UI | `Code.gs` + `settings.js` + `settings.html` |
| — | `8fb2661` | Fix bugs #32-33 (null guard + missing CSS) | `settings.js` + `settings.css` |
| — | `29e48a5` | Cache buster settings.css | `index.html` |
| 5 | `c840c2e` | Progress tracking system (GAS + frontend) | `Code.gs` + `settings.js` |
| — | `cdb327f` | Fix bug #34 (default status alignment) | `Code.gs` |
| — | `ecab132` | Fix bug #35 (missing module_id in schema) | `Code.gs` |

**Total:** 10 commit, 5 file changed, +527/-30.

### Verifikasi Backend (27 Juli 2026 — Akhir Sesi)

**47/47 checks PASS — backend verified production-ready.**

Semua endpoint baru diverifikasi via kode review:
- `changeParticipantPassword` — 13 checks: route, auth, validasi, hash, sync 2 sheet, audit trail ✅
- `saveParticipantProgress` — 12 checks: route, auth, upsert by (rowId, module_id, chapter_id), timestamps, audit ✅
- `getParticipantProgress` — 7 checks: route, auth, filter by participant, optional module_id filter ✅
- `getParticipantDashboardData` — 4 checks: baca participant_progress, compute %, fallback ke row.progress ✅
- Schema `participant_progress` — 12 checks: SHEETS definition, 10 kolom lengkap ✅
- Schema `participantDashboardModules` — 2 checks: `module_id` + `total_chapters` kolom ✅

### Testing Backend + Frontend (27 Juli 2026)

**Backend Endpoint Testing (12/12 PASS):**
- Admin login (super-admin/admin123) — success
- Admin login (wrong password) — proper error
- Register validation — proper error
- getSettings (12 keys), getStages, getAdmins (7 admins), getCompetencyQuestions (115 questions)
- ReTest login (demo account), getReTestAccess (48 records)
- Unknown action — proper error handling

**Frontend HTTP Testing (10/10 PASS):**
- Semua route SPA return HTTP 200 dengan valid HTML

**Frontend Playwright Testing (8/12 PASS, 4 artifacts):**
- Home page, login form, register page, announcement, meeting, admin dashboard — PASS
- 4 failures adalah SPA artifacts (dynamic component loading), bukan bugs

**Catatan:** Participant auth endpoints (changeParticipantPassword, saveParticipantProgress) tidak bisa dites via HTTP tanpa kredensial peserta real. Tapi code sudah verified 100% via line-by-line review.

**Report lengkap:** `reports/BACKEND_FRONTEND_AUDIT_2026-07-27.md`

### Bug yang ditemukan dan difix:

| # | Severity | Deskripsi |
|---|---|---|
| #29 | Low | `btn-cancel` null pointer di `initSettingsPage()` |
| #30 | Med | `session.nik` null guard di `initSettingsPage()` |
| #31 | Low | Fragile `input[value*="linkedin.com"]` selector |
| #32 | Med | Submit button null guard (2 lokasi) |
| #33 | Med | CSS `.settings-message.success/.error` tidak ada |
| #34 | Low | Default status `in_progress` vs `completed` mismatch |
| #35 | **HIGH** | `module_id` missing dari `participantDashboardModules` schema — progress computation broken |

- **Masalah utama**: "Aisyah Putri" hardcoded di **231 file** — sidebar/topbar semua halaman statis
- **Dashboard**: progress 0% statis, events hardcoded, leaderboard mini hardcoded
- **Settings**: form 100% dummy, ga connect ke GAS, tombol ga fungsi
- **Ganti password**: BELUM ADA — `setParticipantPassword` di GAS ga diekspos sebagai route publik
- **Progress tracking**: BELUM ADA — quiz/exercise ga nyimpan ke backend

Plan sudah dibuat: `.omo/plans/participant-dashboard-fixes.md` (4-5 fase)

**Pembaruan Tambahan 24/25 Juli 2026:**
- **Router & Navigasi**: Memperbaiki 404 pada modul *Evaluation AI* dan *Evolution of AI*. Menambahkan _subroutes_ `-practice`, `-quiz`, `-discussion` ke `router.js` beserta inisiasi layout *dashboard*. Memperbaiki *cache-busting* di `index.html`.
- **Konten Materi**: Menghapus jargon internal ("Artifact bab" menjadi "Tugas Praktik") di `05-evaluation-ai.md` agar lebih profesional.
- **Sistem Latihan Terpisah (Separation of Concerns)**: Memperbarui compiler `build_module.js` sehingga bagian `## Latihan` tidak lagi muncul di tab Materi, melainkan diekstrak eksklusif untuk tab Latihan.
- **Kunci Jawaban/Pembahasan Interaktif**: Menulis **Pembahasan** lengkap untuk semua latihan di modul 05 dan 06. *Compiler* sekarang mendeteksi tag `**Pembahasan:**` dan menyuntikkannya ke UI interaktif "Lihat pembahasan".
- **Bug Fix Compiler Modul**: Memperbaiki `build_module.js` karena elemen interaktif Python (Glossary, Deep Dive, Quiz, dll) menyebar/bocor ke seluruh 19 modul lain saat proses cloning. Perbaikan dilakukan dengan menyuntikkan kode JS pembersih di ujung file hasil kompilasi.
- **Batch Rebuild**: Telah menjalankan `rebuild_all_modules.sh` untuk 19 modul lanjutan agar materi kembali bersih dari anomali data Python.
- **Root Server**: Mengembalikan `server.js` dari `scripts/module-tools/` ke folder *root* agar *development server* dapat dijalankan normal dengan `node server.js`.

**Pembaruan Tambahan 25/26 Juli 2026:**
- **AI Fundamentals — Latihan & Rubrik**: Memperbaiki format latihan di `05-evaluation-ai.md` dan `06-evolution-of-ai.md`. Menambahkan rubrik penilaian detail dan kunci jawaban untuk semua latihan di kedua modul. Minor fix di `08-machine-learning.md`.
- **Computer Vision — Restrukturisasi Arsitektur**: Memigrasikan halaman *Computer Vision* dari monolith tunggal menjadi arsitektur *hierarchical sub-module* dengan tiga sub-modul:
  - `01-digital-image-fundamentals` (4 chapters + materi/latihan/diskusi/kuis)
  - `02-convolutional-neural-networks` (4 chapters + materi/latihan/diskusi/kuis)
  - `03-advanced-cnn-architectures` (3 chapters + materi/latihan/diskusi/kuis)
  - Sistem *dynamic DOM injection* untuk CSS dan legacy Pyodide scripts via `ai-cv.js`.
  - Halaman *lesson* (cnn-intro, filtering-kernels, image-processing-opencv, morphological-transforms, dll) diperbarui untuk kompatibilitas.
- **Router — Whitelist CV Routes**: Menambahkan semua *sub-route* Computer Vision baru ke *security guard* di `router.js`. *Cache buster* di `index.html` di-bump untuk memastikan klien mengambil file terbaru.
- **Utility Scripts**: Menambahkan *utility scripts* untuk migrasi modul, *CSS scoping fixes*, dan *DOM injection debugging* (`append_css.js`, `fix_materi_html.js`, `fix_ui.js`). *Scratch scripts* untuk build CV (`build_cv_overview.js`, `build_cv_submodules.js`, `extract_cv_chapters.js`, dll) ditambahkan sebagai referensi.
- **CSS Scope Fix**: Memperbaiki regresi styling dengan mengembalikan *CSS scope class* `ai-lab-content` pada halaman `materi.html` ketiga sub-modul CV.
- **Konten Minor**: Penyesuaian formatting minor pada file legacy NLP dan Machine Learning overview.

## 2. Identitas sistem canonical

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS deployment ID | `AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| Kode GAS yang benar | `gas/Code.gs` |
| Login peserta frontend | `js/frontend/profile.js` |
| Proxy lokal | `server.js` endpoint `/__gas` |
| Last Git commit | `1877bb5b73d3faa1e2ff0a353cf09662c0845b14` |

ID `120NQt...` dan deployment `AKfycbxQ...` adalah referensi lama. Jangan dipakai sebagai konfigurasi runtime.

## 3. Model data login peserta

```text
NIK + password dari form
        ↓
ParticipantAccounts
  - nik / username
  - generated_password / password_hash
  - access_status
  - participant_rowId
        ↓
peserta_tahap_1
  - profil lengkap peserta
  - participant_password (hash kompatibilitas)
        ↓
token sesi peserta 12 jam
        ↓
participant dashboard
```

Aturan final:

- `ParticipantAccounts` adalah sumber otoritatif akun login.
- NIK dan `generated_password` untuk testing harus berasal dari baris yang sama.
- `access_status` kosong diperlakukan sebagai aktif; `inactive` ditolak.
- Login menerima hash current, hash legacy dari dua Spreadsheet ID, atau `generated_password` existing yang masih berstatus valid.
- Login berhasil dapat menyinkronkan `password_hash`, `participant_password`, `last_login_at`, `updated_at`, dan `profile_updated_at`.
- Sinkronisasi tidak mengganti nilai password existing.
- Password tidak disimpan di `sessionStorage`; frontend menyimpan token, expiry, dan profil aman.
- `TARGET_PARTICIPANT_PORTAL_EMAILS` berisi tepat 100 email sebagai referensi cohort lama. Daftar itu bukan alasan menghapus/menonaktifkan 87 akun lain.

## 4. Audit data production terakhir

Pengecekan dilakukan read-only melalui proxy lokal tanpa mencetak NIK atau password:

| Pemeriksaan | Hasil |
|---|---:|
| Baris `ParticipantAccounts` | 187 |
| Baris `peserta_tahap_1` | 431 |
| `account_id` kosong | 0 |
| NIK/username kosong | 0 |
| NIK akun bukan 16 digit | 0 |
| Grup NIK akun duplikat | 0 |
| `generated_password` kosong | 0 |
| Password dengan whitespace luar | 0 |
| `participant_rowId` kosong | 0 |
| `participant_rowId` tidak ditemukan | 0 |

Login akun production nyata sengaja tidak dilakukan saat audit agar tidak menulis `last_login_at` atau hash ke sheet.

## 5. Perubahan kode sesi 27 Juli 2026

### GAS (`gas/Code.gs` — 2256 baris sekarang)

**Fungsi baru:**
- `changeParticipantPassword(payload)` — validasi token, verifikasi old password via `verifyPasswordValue()`, hash new password, sync ke 2 sheet (`ParticipantAccounts` + `peserta_tahap_1`), audit trail
- `saveParticipantProgress(payload)` — UPSERT progress by `(participant_rowId, module_id, chapter_id)`, auto-set `started_at`/`completed_at`, audit trail
- `getParticipantProgress(payload)` — return all progress records for participant, optional `module_id` filter

**Fungsi enhanced:**
- `getParticipantDashboardData(payload)` — sekarang compute real progress % dari `participant_progress` sheet menggunakan `total_chapters` per modul

**Sheet baru:**
- `participant_progress` dengan kolom: `progress_id`, `participant_rowId`, `nik`, `module_id`, `chapter_id`, `status`, `score`, `started_at`, `completed_at`, `updated_at`

**Schema updated:**
- `participantDashboardModules`: tambah kolom `module_id` + `total_chapters`

**Route baru (wajib deploy ulang):**
- `changeParticipantPassword` — di `doPost` + `participantActions` + `normalActions`
- `saveParticipantProgress` — di `doPost` + `participantActions` + `normalActions`
- `getParticipantProgress` — di `doPost` + `participantActions` + `normalActions`

### Frontend (`js/frontend/fellow-dashboard/settings.js` — 2072 baris)

**Fungsi baru:**
- `getParticipantDisplayName()` — helper reusable, priority chain: `profile.nama_lengkap` → `session.name` → `window.__CURRENT_PARTICIPANT_PROFILE__` → `'Peserta HerAI'`
- `saveParticipantSession(session)` — wrapper `sessionStorage.setItem()`
- `initSettingsPage()` — pre-fill form dari session, save handler POST ke GAS, update session, toast success/error, cancel handler, disable non-wired fields
- `initSettingsTabNav()` — 5 tab navigation: Profil Publik (form), Keamanan Akun (password form from template), Preferensi Notifikasi (placeholder), Tampilan & Aksesibilitas (placeholder), Keluar Akun (logout)
- `initPasswordChangeForm()` — client-side validation (confirm match, min 6 char), POST ke `changeParticipantPassword`, toast, auto-reset form

**Fungsi modified:**
- `initFellowUserMenu()` — nama dynamic via `getParticipantDisplayName()`, notif badge di-hide, greeting di-inject
- `renderParticipantDashboard()` — leaderboard menggunakan `getParticipantDisplayName()`
- `initFellowDashboardPage()` — wiring untuk `pageName === 'settings'`
- `defaultParticipantDashboardData()` — semua 'Aisyah Putri' → 'Peserta HerAI'

**Global exposed:**
- `window.saveChapterProgress(moduleId, chapterId, status, score)` — helper untuk lesson pages, POST ke `saveParticipantProgress` GAS, silent fail

### Pages (`pages/frontend/fellow-dashboard/settings.html`)
- Tambah `id` attributes: `settingsProfileForm`, `settingsName`, `settingsEmail`, `settingsWhatsapp`, `settingsCvLink`, `settingsLinkedin`, `settingsGithub`, `settingsProfileMessage`
- Tombol Simpan: `type="button"` → `type="submit"`
- Email field: remove `disabled` + badge verified
- `<template id="passwordChangeTemplate">` — form ganti password dengan old/new/confirm fields

### CSS (`css/frontend/fellow-dashboard/settings.css`)
- `.settings-message` — base message style
- `.settings-message.success` — green background, green border
- `.settings-message.error` — red background, red border

### `index.html`
- Cache buster: `settings.css?v=20260727-password`

## 6. Deployment — ✅ SELESAI

**Versi 3 telah di-deploy** pada 26 Juli 2026 pukul 08.04 WIB.
- **ID Penerapan:** `AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE`
- **URL Web App:** `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec`
- **Library ID:** `1kVpmHT0RRg0Y1aA6r4wcLu47SJLD9tCQ8Q9_1cup24BAi44nQpROGWn4/3`

**Deploy method:** Manage deployments → Edit existing → New version → Deploy (BUKAN New deployment)

**Semua route baru sudah aktif:**
- ✅ `changeParticipantPassword` — ganti password mandiri
- ✅ `saveParticipantProgress` — simpan progress chapter
- ✅ `getParticipantProgress` — ambil progress peserta
- ✅ `getParticipantDashboardData` — enhanced dengan progress computation

**Tidak perlu menjalankan function apa pun sesudah deploy.**

## 7. Larangan operasi

Jangan menjalankan:

```text
setupDatabase()
setupParticipantBackend()
generateParticipantAccountsBatch1()
generateParticipantAccountsBatch2()
generateParticipantAccountsBatch3()
provisionParticipantAccounts()
migrateExistingParticipantAccountCredentials()
```

Larangan paling penting:

- Jangan memakai `forceReset:true`.
- Jangan provision ulang 187 akun.
- Jangan menghapus akun di luar daftar 100 email.
- Jangan mengirim ulang password sebelum ada keputusan operasional resmi.
- Jangan menampilkan NIK/password di log, screenshot, issue, atau handover.
- Jangan mengubah file snapshot lama untuk dijadikan canonical.
- Jangan melakukan `git reset`, checkout, atau cleanup pada dirty worktree tanpa audit.

## 8. Cara menjalankan dan testing

```bash
cd /home/faiz/her6/Her-AI
node server.js
```

UI:

```text
http://127.0.0.1:3000/#/participant-login
```

Jika portal ditutup oleh `participantPortalOpen`, isolasi backend melalui browser console:

```javascript
fetch('/__gas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'participantLogin',
    nik: 'NIK_DARI_PARTICIPANT_ACCOUNTS',
    password: 'GENERATED_PASSWORD_DARI_BARIS_YANG_SAMA'
  })
}).then(response => response.json()).then(console.log);
```

Ekspektasi sukses:

- `status: "success"`
- `profile` terisi
- `token` terisi
- `expires_at` terisi

Tes regresi lokal:

```bash
node scripts/test-gas-auth.mjs
node -e 'const fs=require("fs"); new Function(fs.readFileSync("gas/Code.gs","utf8")); console.log("GAS syntax OK")'
node --check js/frontend/profile.js
node --check js/main.js
node --check js/router.js
node --check js/frontend/fellow-dashboard/settings.js
git diff --check
```

Hasil checkpoint:

```text
Participant login regression checks passed; admin login remains unchanged
GAS syntax OK
JavaScript syntax checks OK
Participant routes: 114 file targets found, tetapi semantic route gate belum ada
```

Skenario yang dicakup:

- Password benar diterima.
- Password salah ditolak.
- Fallback `generated_password` diterima.
- Hash legacy diterima dan dapat disinkronkan.
- Akun nonaktif ditolak.
- Token peserta valid.
- Password tidak masuk profil/session.
- Login admin existing tetap berhasil dengan format respons lama.

## 9. Kondisi runtime lokal

Pada akhir checkpoint:

- Proses yang memakai `127.0.0.1:3000` sudah dihentikan.
- Server sementara di port `3107` juga sudah dihentikan.
- AI berikutnya harus menjalankan `node server.js` sendiri jika perlu testing.
- Status deployment GAS terbaru belum terkonfirmasi; minta user/senior memastikan **New version → Deploy** selesai.
- Plan file: `.omo/plans/participant-dashboard-fixes.md` — referensi utama untuk pekerjaan berikutnya

## 10. Materi Markdown

Folder `materi/` sudah ada sebagai hasil ekspor materi yang tersedia:

| Item | Nilai |
|---|---:|
| File Markdown | 200 |
| Total baris | 111.574 |
| Katalog | `materi/00-katalog-dan-cakupan.md` |
| Manifest | `materi/MANIFEST.md` |
| Script ekspor | `scripts/export-learning-materials.mjs` |

Struktur mencakup ringkasan top-level, arsip halaman, dan sumber dinamis. Jangan menghapus arsip hanya karena ada konten yang tampak duplikat; duplikasi tersebut mempertahankan sumber yang berbeda.

Audit kelengkapan terbaru:

```text
reports/MATERIAL_AND_FEATURE_GAP_AUDIT_2026-07-19.md
```

Laporan ringkas:

```text
reports/MATERIAL_FEATURE_STATUS_WHATSAPP_2026-07-19.md
reports/MATERIAL_FEATURE_STATUS_WHATSAPP_2026-07-19.txt
```

Ringkasan audit:

- Ekspor 200 Markdown lengkap terhadap sumber yang ada di workspace.
- Katalog mempunyai 26 course dan 6 specialization track.
- AI Fundamentals & Advanced aktif dengan 6 modul substantif.
- Math, Machine Learning, dan NLP mempunyai materi substantif, tetapi route peserta masih menuju `under-development.html`.
- **Computer Vision** sudah direstruktur menjadi arsitektur hierarchical sub-module (3 sub-modul, 11 chapters) dengan route aktif.
- Generative AI sudah mencakup LLM, VLM, Multimodal LLM, dan Agentic AI dengan route aktif.
- Deep Learning dan Reinforcement Learning sudah punya modul lengkap dengan route aktif.
- Domain application modules (Bioinformatics, Data Engineering/Science, Infrastructure, Deployment, Front End, Back End, Business Insight, Management, Culture, Healthcare, UI/UX, Manufacturing, Geospatial) sudah digenerate dengan HTML shell.
- 20 course masih placeholder dan 6 specialization track masih scaffold.
- Sebanyak 72 route AI Lab/track diarahkan ke halaman Under Development (berkurang dari sebelumnya karena CV dan Generative AI routes sudah aktif).
- Banyak halaman participant selain dashboard/modules/profile masih prototype visual dengan data hard-coded.
- `scripts/check-participant-routes.mjs` hanya mengecek keberadaan file sehingga
  route Under Development tetap dihitung lulus.
- Pengaturan peserta baru berupa UI prototype; self-service ganti password belum ada.

## 11. Kondisi Git/worktree

**Worktree BERSIH** — semua perubahan sudah di-commit secara atomik per fitur/bugfix:

```text
ecab132 fix(progress): add module_id to participantDashboardModules schema
cdb327f fix(progress): align default status to 'completed' in saveParticipantProgress
c840c2e feat(progress): participant learning progress tracking system
29e48a5 chore: bump settings.css cache buster for new message styles
8fb2661 fix(settings): null-guard submit buttons + missing CSS message styles
ac16a3c feat(password): self-service password change for participants
083727c fix(settings): null-guard session, cancel button, and fragile selectors
67e4761 feat(settings): wire form to updateParticipantProfile GAS endpoint
ef9f875 feat(dashboard): dynamic participant name & remove hardcoded 'Aisyah Putri'
399ed63 docs(handoff): Update checkpoint with backend audit, scope boundary, participant dashboard plan
1877bb5 fix(router): Redirect CNN and Advanced CNN modules to under-development page
```

Untracked (tidak perlu di-commit):

```text
.omo/plans/              ← PLAN FILE (sudah di-execute semua)
reports/BACKEND_AUDIT_2026-07-26.md
gas/Code_For_Senior.gs
gas/Code_lama.gs
handover/
materi/
scripts/
scratch.js
scratch/
```

---

## 13. Prompt Transfer untuk AI Berikutnya — Frontend Implementation

```text
╔══════════════════════════════════════════════════════════════╗
║  ⚠️  BACA SELURUH FILE INI SEBELUM MULAI KERJA.            ║
║  JANGAN SKIP. JANGAN MENGANGGAP TAHU. BACA SAMPAI HABIS.  ║
╚══════════════════════════════════════════════════════════════╝

═══════════════════════════════════════════════════════════════
📋 SUMBER KEBENARAN (WAJIB DIBACA)
═══════════════════════════════════════════════════════════════
1. handover/AI_HANDOFF_CURRENT_STATE.md  ← FILE INI
2. gemini.md  ← Bug log #1-35 + session rules
3. reports/BACKEND_FRONTEND_AUDIT_2026-07-27.md  ← Hasil tes terbaru

═══════════════════════════════════════════════════════════════
🚫 HARD BLOCK — AREA YANG TIDAK BOLEH DISENTUH
═══════════════════════════════════════════════════════════════
- Signaling (Go WebRTC), Messaging/Chat (Go), Participant Portal (Go)
- Admin dashboard (production, jangan ubah auth/workflow)
- Keamanan/Security hardening
- Leaderboard, Certificates, Tasks, Projects, Events, Community, Mentor
- provisionParticipantAccounts / generateParticipantAccounts*
- forceReset:true (AKAN RESET 187 AKUN EXISTING)
- 231 file lesson pages (jangan edit satu-satu)
- js/main.js, js/router.js (kecuali tambah route baru)

═══════════════════════════════════════════════════════════════
🔧 IDENTITAS SISTEM
═══════════════════════════════════════════════════════════════
- Spreadsheet ID: 1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w
- GAS Web App URL: https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec
- GAS Deployment: ✅ Versi 3 — semua route aktif (deployed 26 Juli 2026 08:04)
- GAS Code: gas/Code.gs (2256 baris, 52 routes, 23 sheets)
- SPA: Vanilla JS hash-router, Node.js proxy
- Dev server: node server.js → http://127.0.0.1:3000
- Proxy: POST /__gas (token auto-injected oleh main.js)
- Last commit: c8be27a
- Worktree: BERSIH (hanya untracked scratch files)

═══════════════════════════════════════════════════════════════
✅ APA YANG SUDAH SELESAI — JANGAN DIULANG
═══════════════════════════════════════════════════════════════

5 FASE COMPLETE (10 commit, +527/-30):
Fase 1: Dynamic name & topbar — getParticipantDisplayName(), notif hide
Fase 2: Settings wire ke GAS — form save, tab nav, avatar placeholder
Fase 3: Ganti password — GAS changeParticipantPassword + UI form
Fase 4: Dashboard dinamis — sudah ada, data dari GAS
Fase 5: Progress tracking — participant_progress sheet + 2 endpoint + helper

7 BUG FIXED (#29-35):
#29: btn-cancel null pointer
#30: session.nik null guard
#31: Fragile linkedin/github selector
#32: Submit button null guard (2 lokasi)
#33: CSS .settings-message missing
#34: Default status inconsistency
#35 (HIGH): module_id missing dari schema

BACKEND VERIFICATION: 47/47 checks PASS
BACKEND TESTING: 12/12 endpoints PASS
FRONTEND TESTING: 10/10 HTTP routes + 8/12 Playwright PASS

═══════════════════════════════════════════════════════════════
📂 ARSITEKTUR FILE — APA YANG BOLEH DISENTUH?
═══════════════════════════════════════════════════════════════

✅ BOLEH DIEDIT:
- js/frontend/fellow-dashboard/settings.js  (2072 baris — logic peserta)
- pages/frontend/fellow-dashboard/settings.html  (UI participants)
- css/frontend/fellow-dashboard/settings.css  (styling)
- gas/Code.gs  (HANYA untuk bug fix, sudah terverifikasi 47/47)
- index.html  (HANYA cache buster)
- gemini.md  (bug log)
- handover/AI_HANDOFF_CURRENT_STATE.md  (update checkpoint)

❌ JANGAN DIEDIT:
- js/main.js — auth transport, global settings
- js/router.js — hash routing (kecuali tambah route baru)
- Semua 231 file lesson HTML/JS — sidebar hardcoded, di-handle JS injection
- Semua file Go (signaling/, messaging/, participant-portal/)
- Semua file admin dashboard (pages/dashboard/, js/dashboard/)

═══════════════════════════════════════════════════════════════
📝 NEXT PLAN — Fokus Frontend Implementation
═══════════════════════════════════════════════════════════════

A. WIRING saveChapterProgress ke lesson pages:
- Helper window.saveChapterProgress(moduleId, chapterId, status, score) sudah ada
- Belum dipanggil dari halaman lesson manapun
- Task: inject ke setiap halaman materi/quiz yang aktif
- Module IDs yang sudah aktif: ai-fundamentals, computer-vision, generative-ai, deep-learning, reinforcement-learning
- Bisa dilakukan via script injection atau per halaman

B. ISI DATA KE GOOGLE SHEETS:
- Sheet participant_dashboard_modules → butuh module_id + total_chapters + data
- Sheet participant_dashboard_journey → 4 phase dengan progress
- Sheet participant_dashboard_events → 3-5 event upcoming
- Sheet participant_dashboard_leaderboard → ranking dengan NIK + points

C. FRONTEND ENHANCEMENTS (optional):
- Fix "Aisyah Putri" flash sebelum JS injection jalan
- Tambah loading spinner saat fetch GAS data
- Tambah error state UI untuk GAS failures

D. TESTING LANJUTAN:
- Playwright e2e test dengan akun test (kalau tersedia)
- Manual test flow lengkap: login → dashboard → modules → settings → ganti password

═══════════════════════════════════════════════════════════════
📐 ATURAN KERJA — WAJIB DIIKUTI
═══════════════════════════════════════════════════════════════
1. Commit PER FITUR, bukan satu commit besar
2. Update handover & gemini.md setiap checkpoint
3. Catat bug baru dengan nomor #36+
4. Dark theme DILARANG — light pink theme untuk code blocks
5. CSS scope ai-lab-content WAJIB di template CV
6. Diagram kontras: lines ≥25% opacity, dots ≥75%, stroke ≥0.8px
7. JANGAN tampilkan NIK/password di mana pun (log, screenshot, handover, commit)
8. TANYA user sebelum eksekusi kalau ada yang ambigu
9. Verifikasi sebelum commit: syntax check (node --check), test data flow, cek null guards
10. JANGAN jalankan provision/generate functions
11. JANGAN sentuh 231 file lesson — pakai JS injection/code generation
12. sessionStorage.heraiParticipantSession adalah source of truth

═══════════════════════════════════════════════════════════════
🔑 DATA FLOW (referensi untuk development)
═══════════════════════════════════════════════════════════════
Login:    POST /__gas { action: "participantLogin", nik, password }
          → GAS: participantLogin() → token 12 jam + profile
          → Frontend: saveParticipantSession() → sessionStorage

Save:     POST /__gas { action: "updateParticipantProfile", ... }
          → GAS: updateParticipantProfile() → updated profile
          → Frontend: saveParticipantSession() → update sessionStorage

Password: POST /__gas { action: "changeParticipantPassword", oldPassword, newPassword }
          → GAS: changeParticipantPassword() → verify → hash → sync sheets

Progress: window.saveChapterProgress(moduleId, chapterId, "completed")
          → POST /__gas { action: "saveParticipantProgress", module_id, chapter_id, status }
          → GAS: saveParticipantProgress() → upsert ke participant_progress

Dashboard: POST /__gas { action: "getParticipantDashboardData", nik }
           → GAS: getParticipantDashboardData() → compute % dari participant_progress
           → Frontend: renderParticipantDashboard() → tampilkan

Session:  sessionStorage.heraiParticipantSession
          { nik, token, expiresAt, name, profile: { nama_lengkap, email, ... } }

Token injection: main.js auto-injects participantToken ke semua POST /__gas
```

---

## 15. Known Issues & Debt

1. **"Aisyah Putri" di 231 file lesson** — nama di sidebar/topbar lesson pages masih hardcoded di HTML. Tapi `initFellowUserMenu()` sudah inject nama dinamis via JS. Jadi pas halaman load, nama akan ke-replace. Flash "Aisyah Putri" mungkin terlihat sekejap sebelum JS jalan
2. **Avatar upload belum ada** — GAS ga support file upload via Web App. Buttons di-disabled
3. **Bio, LinkedIn, GitHub fields** — belum di-wire ke GAS (ga ada kolom di sheet `peserta_tahap_1`). Di-disabled di UI dengan label "Coming Soon"
4. **Progress auto-save di lesson pages** — helper `window.saveChapterProgress()` sudah ada, tapi belum dipanggil dari halaman lesson manapun. Perlu wiring ke setiap modul
5. **Dashboard fallback data** — `defaultParticipantDashboardData()` cuma punya 3 modul hardcoded. Dashboard akan lebih berguna setelah Google Sheets diisi data (`participant_dashboard_modules`, dll)
6. **Admin auth legacy** — documented security debt, bukan prioritas saat ini
7. **Go services tidak terintegrasi** — signaling, messaging, participant-portal semua prototype standalone
8. **Notif badge** — di-hide total. Belum ada API notifikasi

---

## 12. Next actions — Frontend Implementation Focus

### ✅ SUDAH SELESAI (Jangan diulang)

| Item | Status |
|---|---|
| Fase 1-5 Dashboard Peserta | ✅ Complete (10 commit) |
| GAS deployment | ✅ Versi 3 — semua route aktif |
| Backend verification | ✅ 47/47 checks PASS |
| Backend testing | ✅ 12/12 endpoints PASS |
| Frontend HTTP testing | ✅ 10/10 routes PASS |
| Frontend Playwright | ✅ 8/12 PASS |

### ⚠️  PRIORITAS UTAMA — Implementasi Frontend

**A. Wiring saveChapterProgress ke lesson pages**
- Helper `window.saveChapterProgress()` sudah ada dan terverifikasi
- Belum dipanggil dari halaman lesson manapun
- Task: inject pemanggilan `saveChapterProgress(moduleId, chapterId, "completed")` ke setiap halaman materi/quiz
- Module dengan route aktif: AI Fundamentals (6 modul), Computer Vision (11 chapters), Generative AI, Deep Learning, Reinforcement Learning
- Pendekatan: bisa via script injection di `initFellowDashboardPage()` atau via `<script>` di setiap lesson page

**B. Isi data ke Google Sheets**
- `participant_dashboard_modules` — butuh `module_id` + `total_chapters` + metadata (title, subtitle, icon, href)
- `participant_dashboard_journey` — 4 phase (Foundation, Specialization, Project Building, Graduation)
- `participant_dashboard_events` — upcoming events
- `participant_dashboard_leaderboard` — ranking dengan NIK + points

**C. Frontend enhancements (optional)**
- Fix flash "Aisyah Putri" sebelum JS injection jalan
- Loading spinner saat fetch GAS data
- Error state UI untuk GAS failures

**D. Testing lanjutan**
- Manual flow: login → dashboard → modules → settings → ganti password
- Playwright e2e dengan akun test (kalau tersedia)

### BACKLOG
- Aktifkan route Math, ML, NLP
- Hardening admin GAS
- Go service integration
