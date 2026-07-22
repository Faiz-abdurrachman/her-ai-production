# HerAI Participant Login Update

Tanggal: 19 Juli 2026

Dokumen ini melengkapi handover lama. Status menyeluruh ada di
[`AI_HANDOFF_CURRENT_STATE.md`](AI_HANDOFF_CURRENT_STATE.md).
`gas/Code_For_Senior.gs` dan `gas/Code_lama.gs` adalah snapshot lama; kode
canonical yang dikirim/deploy adalah `gas/Code.gs`.

## Keputusan canonical

- Spreadsheet: `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w`
- GAS deployment: `AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE`
- Seluruh 187 akun existing di `ParticipantAccounts` dipertahankan.
- Akun existing dengan `access_status` kosong diperlakukan sebagai `active`.
- `TARGET_PARTICIPANT_PORTAL_EMAILS` berisi 100 email dan dipertahankan sebagai referensi cohort lama. Daftar tersebut tidak boleh digunakan untuk menonaktifkan 87 akun lainnya.

## Scope perubahan

- `ParticipantAccounts` menjadi sumber akun portal.
- Login mengikuti `participant_rowId`, sehingga NIK duplikat tidak mengambil baris peserta yang salah.
- Hash lama dari dua Spreadsheet ID tetap dapat diverifikasi dan dimigrasikan ke pepper stabil.
- Login peserta menghasilkan token 12 jam.
- Login Re-Test menghasilkan token 4 jam.
- Password tidak lagi disimpan di `sessionStorage`.
- Pengumuman memakai `getPublicParticipantResult` yang hanya mengembalikan satu data cocok berdasarkan NIK+email.
- Pembuatan password mandiri melalui `setParticipantPassword` tidak lagi diekspos.
- Ganti password mandiri peserta belum diimplementasikan.
- Local GAS fallback hanya aktif bila `HERAI_ENABLE_LOCAL_GAS_FALLBACK=true`.
- Generator password baru tidak memakai `Math.random()` dan tidak menghasilkan awalan formula spreadsheet.
- Login dan dashboard admin tidak diubah. Kredensial admin existing tetap berjalan seperti sebelumnya.
- Tidak ada rotasi password admin atau requirement token admin.

Karena user membatasi scope ke login peserta, route admin GAS lama tidak
di-hardening pada checkpoint ini. `getParticipantAccounts` masih berpotensi
mengembalikan `generated_password`; jangan dump atau membagikan responsnya.

## Urutan deployment

1. Buka Apps Script project yang terhubung ke spreadsheet canonical.
2. Ganti isi `Code.gs` dengan `gas/Code.gs`.
3. Save, kemudian Deploy > Manage deployments > New version > Deploy.
4. Tidak perlu mengubah password atau konfigurasi admin.
5. Restart localhost: `node server.js`.
6. Hard refresh browser.
7. Uji login peserta memakai NIK dan password existing dari `ParticipantAccounts`.

Untuk task ini jangan menjalankan function dari Apps Script editor.
`migrateExistingParticipantAccountCredentials()` tidak diperlukan; login pertama
peserta akan menyinkronkan hash akun tersebut tanpa mengganti password existing.

Status deployment latest belum dikonfirmasi oleh user/senior. Save saja tidak
cukup; harus ada **Manage deployments > Edit > New version > Deploy**.

## Larangan operasional

- Jangan jalankan provisioning dengan `forceReset:true`.
- Jangan menghapus atau menonaktifkan 87 akun hanya karena tidak ada di daftar 100 email.
- Jangan membagikan respons/API dump `ParticipantAccounts`.
- Jangan mengubah kredensial admin sebagai bagian task login peserta.
- Jangan memakai `gas/Code_For_Senior.gs` atau `gas/Code_lama.gs` sebagai source deployment.

## Verifikasi minimal

- Login peserta menggunakan NIK dan password existing harus menghasilkan token.
- Setelah reload, session peserta tidak mengandung field `password`.
- Akun dengan `access_status=inactive` harus ditolak.
- Pengumuman hanya mengembalikan data untuk pasangan NIK+email yang tepat.
- Login admin existing tetap berjalan dengan alur lama.

Audit read-only terakhir menemukan 187 akun dan 431 baris peserta. Seluruh akun
memiliki `account_id`, NIK 16 digit, password terisi, dan `participant_rowId`
yang valid.

## Status Pengaturan dan Password Peserta

- Halaman `#/participant-settings` ada, tetapi data profil di form masih hard-coded.
- Tab Keamanan Akun belum mempunyai workflow aktif.
- Tombol Simpan, upload avatar, dan hapus avatar belum tersambung ke backend.
- Edit profil dasar tersedia di halaman profil terpisah melalui
  `updateParticipantProfile`.
- `setParticipantPassword` tidak boleh diekspos sebagai solusi cepat karena hanya
  dirancang untuk akun yang belum mempunyai password dan tidak memverifikasi old
  password.
- Reset/provision ulang bukan fitur ganti password peserta.
- Implementasi baru harus memakai token peserta, memverifikasi password lama,
  menyinkronkan hash account/profile secara atomik, mencatat audit, dan menentukan
  apakah seluruh sesi lama dicabut.
