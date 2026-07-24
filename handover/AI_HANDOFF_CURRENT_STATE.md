# AI Handoff — Current Checkpoint HerAI Fellowship SuperApp

**Checkpoint:** 25 Juli 2026, Asia/Jakarta  
**Workspace:** `/home/faiz/her6/Her-AI`  
**Branch:** `main`  
**Tujuan:** Sumber kebenaran utama untuk AI/developer berikutnya.

> Jika dokumen handover lain bertentangan dengan file ini, ikuti file ini.
> Dokumen bertanggal 17 Juli adalah snapshot historis dan bukan instruksi operasi terbaru.

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

**Pembaruan Tambahan 24/25 Juli 2026:**
- **Router & Navigasi**: Memperbaiki 404 pada modul *Evaluation AI* dan *Evolution of AI*. Menambahkan _subroutes_ `-practice`, `-quiz`, `-discussion` ke `router.js` beserta inisiasi layout *dashboard*. Memperbaiki *cache-busting* di `index.html`.
- **Konten Materi**: Menghapus jargon internal ("Artifact bab" menjadi "Tugas Praktik") di `05-evaluation-ai.md` agar lebih profesional.
- **Sistem Latihan Terpisah (Separation of Concerns)**: Memperbarui compiler `build_module.js` sehingga bagian `## Latihan` tidak lagi muncul di tab Materi, melainkan diekstrak eksklusif untuk tab Latihan.
- **Kunci Jawaban/Pembahasan Interaktif**: Menulis **Pembahasan** lengkap untuk semua latihan di modul 05 dan 06. *Compiler* sekarang mendeteksi tag `**Pembahasan:**` dan menyuntikkannya ke UI interaktif "Lihat pembahasan".
- **Bug Fix Compiler Modul**: Memperbaiki `build_module.js` karena elemen interaktif Python (Glossary, Deep Dive, Quiz, dll) menyebar/bocor ke seluruh 19 modul lain saat proses cloning. Perbaikan dilakukan dengan menyuntikkan kode JS pembersih di ujung file hasil kompilasi.
- **Batch Rebuild**: Telah menjalankan `rebuild_all_modules.sh` untuk 19 modul lanjutan agar materi kembali bersih dari anomali data Python.
- **Root Server**: Mengembalikan `server.js` dari `scripts/module-tools/` ke folder *root* agar *development server* dapat dijalankan normal dengan `node server.js`.

## 2. Identitas sistem canonical

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS deployment ID | `AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| Kode GAS yang benar | `gas/Code.gs` |
| Login peserta frontend | `js/frontend/profile.js` |
| Proxy lokal | `server.js` endpoint `/__gas` |
| Last Git commit | `f6bd53cd4f5b82d567d255952f582e29bf3ec430` |

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

## 5. Perubahan kode checkpoint ini

### GAS

- `gas/Code.gs` menunjuk Spreadsheet canonical.
- `participantLogin()` membaca akun dari `ParticipantAccounts`.
- Profil dipilih berdasarkan `participant_rowId`, lalu fallback NIK.
- Password existing dipertahankan.
- Login menghasilkan token peserta 12 jam.
- `setParticipantPassword` tidak diekspos sebagai route publik.
- Provisioning menjaga akun existing jika tidak memakai reset.
- `migrateExistingParticipantAccountCredentials()` tersedia sebagai utility, tetapi tidak diperlukan untuk deployment task ini.
- Login admin `login(payload)` kembali ke alur lama; tidak menerbitkan token admin dan tidak memaksa rotasi.

### Frontend

- `js/frontend/profile.js` login hanya melalui GAS dan tidak memiliki fallback password lokal.
- Session peserta tidak menyimpan password.
- `js/main.js` hanya menyisipkan token peserta pada request `/__gas`; tidak mengubah auth admin.
- `js/router.js` melindungi route participant dengan session token dan expiry.
- `participantPortalOpen` tetap dapat menutup UI login. Direct API test masih dapat dipakai untuk isolasi backend.
- `#/participant-settings` sudah mempunyai UI, tetapi form memakai data contoh
  Aisyah Putri dan aksi Simpan/Unggah/Hapus belum tersambung ke backend.
- Tombol Keamanan Akun, Preferensi Notifikasi, dan Tampilan & Aksesibilitas belum
  membuka workflow yang operasional.
- Edit profil dasar tersedia melalui halaman profil terpisah dan
  `updateParticipantProfile` untuk nama, email, WhatsApp, alamat, dan link CV.
- Self-service ganti password peserta belum tersedia. Password peserta masih
  dikelola melalui akun hasil provisioning/admin.

### Gateway/config

- `.env`, `api/gas.js`, `api/settings.js`, `render.yaml`, dan `signaling/main.go` menunjuk deployment canonical.
- `server.js` hanya memakai fallback GAS lokal jika `HERAI_ENABLE_LOCAL_GAS_FALLBACK=true`.
- Tanpa flag tersebut, error GAS diteruskan sebagai error sehingga tidak menyamar sebagai “password salah”.

### Admin

- `js/dashboard/dashboard.js` dan `js/dashboard/admin-modules.js` sama dengan baseline repository.
- Tidak ada `NEXT_SUPER_ADMIN_PASSWORD`.
- Tidak ada `rotateSuperAdminPasswordFromScriptProperty()`.
- Jangan mengubah kredensial atau workflow admin sebagai bagian task login peserta.

Known security debt yang sengaja tidak diubah karena di luar scope:

- Route admin GAS tetap memakai perilaku lama tanpa token server-side.
- `getParticipantAccounts` masih dapat mengembalikan `generated_password`.
- Jangan memanggil atau membagikan dump endpoint tersebut di channel publik.
- Perbaikan debt ini memerlukan scope/koordinasi terpisah karena dapat mengubah dashboard admin.

Catatan password peserta:

- Function `setParticipantPassword(payload)` masih ada di file GAS, tetapi tidak
  diekspos di action map.
- Function tersebut hanya menerima pembuatan password saat password profil masih
  kosong; bukan alur ganti password existing.
- Frontend secara eksplisit menonaktifkan pembuatan password mandiri.
- Implementasi ganti password kelak perlu old password, new password, confirm,
  autentikasi token peserta, sinkronisasi dua sheet, audit, dan kebijakan sesi.

## 6. Deployment yang harus dilakukan senior

File yang dikirim:

```text
/home/faiz/her6/Her-AI/gas/Code.gs
```

Jangan kirim:

- `gas/Code_For_Senior.gs` — snapshot lama.
- `gas/Code_lama.gs` — snapshot lama/tidak canonical.

Langkah deployment:

1. Buka Apps Script project yang memiliki akses ke Spreadsheet canonical.
2. Timpa isi `Code.gs` dengan seluruh isi `gas/Code.gs`.
3. Save.
4. Pilih **Deploy → Manage deployments**.
5. Edit deployment Web App existing.
6. Pilih **New version**, lalu **Deploy**.
7. Jangan memilih **New deployment** kecuali memang sengaja membuat URL baru.
8. Jika membuat URL baru, update seluruh `GAS_WEB_APP_URL`.

Tidak perlu menjalankan function apa pun sesudah deploy.
Tidak perlu membuat atau mengubah Script Properties secara manual; secret token
peserta dibuat otomatis saat dibutuhkan.

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
- Math, Machine Learning, NLP, dan Computer Vision mempunyai materi substantif,
  tetapi route peserta masih menuju `under-development.html`.
- Generative AI baru parsial.
- 20 course masih placeholder dan 6 specialization track masih scaffold.
- Sebanyak 72 route AI Lab/track diarahkan ke halaman Under Development.
- Banyak halaman participant selain dashboard/modules/profile masih prototype visual
  dengan data hard-coded.
- `scripts/check-participant-routes.mjs` hanya mengecek keberadaan file sehingga
  route Under Development tetap dihitung lulus.
- Pengaturan peserta baru berupa UI prototype; self-service ganti password belum ada.

## 11. Kondisi Git/worktree

Worktree dirty dan belum ada commit untuk checkpoint ini. Perubahan user/AI bercampur; jangan revert massal.

Modified tracked:

```text
.cursor/global-settings.json
.cursor/participants.json
.gitignore
api/gas.js
api/settings.js
gas/Code.gs
index.html
js/frontend/announcement.js
js/frontend/competency-test.js
js/frontend/profile.js
js/main.js
js/router.js
render.yaml
reports/qa-report-latest.json
reports/qa-report-latest.md
server.js
signaling/main.go
```

Untracked penting:

```text
.omo/
gas/Code_For_Senior.gs
gas/Code_lama.gs
handover/
materi/
scripts/export-learning-materials.mjs
scripts/test-gas-auth.mjs
reports/MATERIAL_AND_FEATURE_GAP_AUDIT_2026-07-19.md
reports/MATERIAL_FEATURE_STATUS_WHATSAPP_2026-07-19.md
reports/MATERIAL_FEATURE_STATUS_WHATSAPP_2026-07-19.txt
```

Tidak ada commit baru yang dibuat oleh AI dalam rangkaian kerja ini.

## 12. Next actions

Prioritas berikutnya:

1. Konfirmasi senior menerima `gas/Code.gs`, bukan snapshot lama.
2. Konfirmasi senior deploy sebagai **New version** pada deployment existing.
3. Jalankan localhost dan tes satu akun nyata dari `ParticipantAccounts`.
4. Catat hanya hasil sukses/gagal; jangan catat kredensial.
5. Perbaiki semantic route check lalu aktifkan Math, ML, NLP, dan CV setelah smoke test.
6. Rancang progress/gradebook server-side sebelum membuka seluruh katalog.
7. Koordinasikan hardening action admin GAS dan sanitasi response account dengan senior.
8. Gunakan laporan audit terbaru untuk backlog konten, admin, messaging, dan meeting.
9. Jika diminta mengerjakan Pengaturan, sambungkan data peserta nyata dan pisahkan
   scope edit profil, preferensi, aksesibilitas, dan keamanan akun.
10. Jika diminta membuat ganti password, desain kontrak baru; jangan mengekspos
    function legacy `setParticipantPassword` apa adanya.
11. Setelah user menyetujui, review dirty worktree dan buat commit terpisah per area.

Login peserta tetap task deployment paling dekat. Backlog di luar login didokumentasikan
tanpa mengubah admin atau melakukan provisioning.

## 13. Prompt singkat untuk AI berikutnya

```text
Baca handover/AI_HANDOFF_CURRENT_STATE.md sebagai sumber utama.
Jangan provision/reset akun dan jangan mengubah admin.
Kode canonical GAS adalah gas/Code.gs; spreadsheet canonical 1n4ZV...
Status deploy terbaru belum dikonfirmasi. Lanjutkan dari verifikasi deploy dan
end-to-end login peserta menggunakan kredensial dari satu baris ParticipantAccounts,
tanpa mencetak atau menyimpan kredensial. Setelah login terverifikasi, gunakan
reports/MATERIAL_AND_FEATURE_GAP_AUDIT_2026-07-19.md untuk backlog. Pengaturan
peserta masih prototype dan ganti password mandiri belum tersedia.
```
