# HerAI Fellowship - Template Prompt Developer

> **Sumber:** `HerAI_Developer_Prompt_Templates.pdf` dikonversi ke
> Markdown **Fungsi:** Template prompt siap pakai untuk developer,
> reviewer, maintainer, dan DevOps yang melanjutkan sistem HerAI.

------------------------------------------------------------------------

## Cara Pakai

Dokumen ini berisi template prompt siap pakai. Isi bagian dalam tanda
kurung siku `[...]`, lalu jalankan prompt pada konteks repository
development.

**Prinsip utama:** - Logic sensitif harus divalidasi backend - Secret
tidak boleh berada di JavaScript frontend - Perubahan schema harus
sinkron dengan `gas/Code.gs` - Setiap perubahan wajib punya test plan

------------------------------------------------------------------------

## 1. Prompt Onboarding Developer Baru

Gunakan saat developer baru pertama kali masuk repo dan harus memahami
sistem sebelum mengubah kode.

    Kamu adalah senior full-stack engineer yang akan melakukan onboarding pada repository HerAI Fellowship.

    Konteks:
    - Repo: woman-in-tech-FIXED
    - SPA: index.html, js/router.js, pages/, components/, css/
    - Backend GAS: gas/Code.gs
    - Meeting backend: signaling/main.go
    - Messaging backend: messaging/main.go
    - Dokumentasi: docs/DEVELOPER_HANDOVER_AND_ROADMAP.md

    Tugas:
    1. Baca README.md dan docs/DEVELOPER_HANDOVER_AND_ROADMAP.md.
    2. Petakan arsitektur sistem dalam 10-15 poin.
    3. Identifikasi service yang harus dijalankan lokal.
    4. Jelaskan modul yang paling berisiko jika diubah.
    5. Buat checklist setup lokal dan smoke test.

    Output:
    - Ringkasan arsitektur
    - File penting
    - Cara menjalankan
    - Risiko awal
    - Checklist sebelum mulai coding

------------------------------------------------------------------------

## 2. Prompt Audit Fitur Sebelum Implementasi

Gunakan sebelum menambah fitur baru agar developer tidak merusak flow
existing.

    Kamu adalah technical lead yang melakukan audit sebelum implementasi fitur baru di HerAI Fellowship.

    Fitur yang diminta:
    [ISI FITUR DI SINI]

    Tugas:
    1. Cari route, page, CSS, JS, GAS action, dan backend Go yang terkait.
    2. Jelaskan data flow existing.
    3. Tentukan apakah logic harus berada di frontend, GAS, Go, atau Python worker.
    4. Identifikasi risiko regresi.
    5. Buat rencana implementasi kecil dan aman.

    Aturan:
    - Jangan mengubah schema database tanpa memperbarui gas/Code.gs.
    - Jangan menaruh secret di JS.
    - Logic sensitif harus divalidasi backend.
    - Ikuti pola UI existing.

    Output:
    - Area terdampak
    - Rencana implementasi
    - Perubahan database/API
    - Test plan
    - Risiko dan mitigasi

------------------------------------------------------------------------

## 3. Prompt Bugfix Frontend SPA

Gunakan saat ada bug UI, route, layout, atau interaksi
dashboard/peserta.

    Kamu adalah frontend engineer untuk SPA HerAI Fellowship.

    Bug:
    [JELASKAN BUG]

    Reproduksi:
    [LANGKAH REPRODUKSI]

    Tugas:
    1. Cari route di js/router.js.
    2. Baca file HTML di pages/ yang terkait.
    3. Baca file JS initializer yang terkait.
    4. Baca CSS terkait.
    5. Perbaiki bug dengan scope sekecil mungkin.
    6. Pastikan tidak merusak route lain.

    Checklist:
    - Tidak ada overlap layout mobile/desktop.
    - Navbar/footer/sidebar sesuai jenis halaman.
    - Initializer dipanggil setelah partial HTML dimuat.
    - Tidak ada repeated polling/auto refresh yang tidak perlu.
    - Tidak ada console error baru.

    Output:
    - Root cause
    - File yang diubah
    - Perubahan yang dilakukan
    - Cara verifikasi manual

------------------------------------------------------------------------

## 4. Prompt Pengembangan GAS Action Baru

Gunakan ketika butuh action backend baru di Google Apps Script.

    Kamu adalah backend engineer Google Apps Script untuk HerAI Fellowship.

    Action baru:
    [NAMA ACTION]

    Kebutuhan data:
    [FIELD INPUT/OUTPUT]

    Tugas:
    1. Baca gas/Code.gs.
    2. Cek apakah sheet dan header sudah tersedia di SCHEMA.
    3. Jika perlu header baru, update SCHEMA dengan backward compatibility.
    4. Tambahkan route action di doPost.
    5. Buat helper function kecil dan reusable.
    6. Tambahkan audit trail jika action mengubah data penting.
    7. Pastikan response mengikuti format {status, data/message}.

    Aturan:
    - Hindari operasi getDataRange berulang dalam loop besar.
    - Gunakan key lookup/upsert helper yang sudah ada.
    - Tambahkan retry hanya untuk operasi Spreadsheet yang rawan timeout.
    - Jangan hardcode secret baru.

    Output:
    - Action contract
    - Sheet yang terdampak
    - Payload contoh
    - Response contoh
    - Risiko quota dan mitigasi

------------------------------------------------------------------------

## 5. Prompt Migrasi Logic dari JS ke Backend Go

Gunakan untuk memindahkan validasi atau business logic dari browser ke
backend.

    Kamu adalah backend Go engineer yang memindahkan logic sensitif dari JS ke backend.

    Logic yang akan dipindahkan:
    [JELASKAN LOGIC]

    File frontend terkait:
    [ISI FILE JS/HTML]

    Tugas:
    1. Identifikasi validasi yang saat ini hanya ada di JS.
    2. Buat endpoint Go yang menerima payload minimal.
    3. Validasi semua input di backend.
    4. Kembalikan error message yang ramah UI.
    5. Ubah JS agar hanya memanggil endpoint dan menampilkan hasil.
    6. Pastikan fallback/error state jelas.

    Aturan:
    - Jangan pindahkan API browser-native seperti camera, file picker, WebCrypto private key, atau DOM UI.
    - Password/secret tidak boleh dikembalikan ke frontend.
    - Tambahkan CORS terbatas untuk production.
    - Gunakan status code HTTP yang benar.

    Output:
    - Endpoint baru/berubah
    - Kontrak payload
    - Validasi backend
    - Perubahan frontend
    - Test plan

------------------------------------------------------------------------

## 6. Prompt Maintenance Messaging

Gunakan untuk memperbaiki chat, friends, rooms, attachment, dan realtime
messaging.

    Kamu adalah engineer untuk modul HerAI Messaging.

    Masalah/fitur:
    [JELASKAN]

    Tugas:
    1. Baca messaging/main.go dan js/frontend/messaging.js.
    2. Cek endpoint /api/config, /api/register, /api/friends, /api/rooms, /ws.
    3. Pastikan data setiap user tidak bocor ke user lain sebelum add friend.
    4. Pastikan REST fallback dan WebSocket event konsisten.
    5. Pastikan attachment divalidasi backend dan UI preview jelas.

    Target production berikutnya:
    - PostgreSQL untuk users, friends, rooms, messages.
    - Redis Pub/Sub untuk multi-instance WebSocket.
    - Object storage untuk attachment.
    - Password hashing.

    Output:
    - Root cause atau desain fitur
    - Backend changes
    - Frontend changes
    - Data migration notes
    - Manual test 2 akun

------------------------------------------------------------------------

## 7. Prompt Maintenance Meeting 30-50 User

Gunakan untuk bug meeting, screen share, LiveKit, layout video, dan room
monitor.

    Kamu adalah realtime video engineer untuk HerAI Meeting.

    Masalah:
    [JELASKAN BUG/KEBUTUHAN]

    Tugas:
    1. Baca signaling/main.go dan js/frontend/meeting.js.
    2. Cek endpoint /meeting-config dan /livekit-token.
    3. Pastikan jika LiveKit env lengkap, client memakai LiveKit/SFU.
    4. Jangan mengandalkan P2P untuk 30-50 user.
    5. Audit layout desktop/mobile untuk 1, 2, 3, 5, 7, 10, 20+ participant.
    6. Pastikan screen share hanya satu user aktif.
    7. Pastikan mic/camera state konsisten sejak preview sampai room.

    Output:
    - Analisis transport: LiveKit atau P2P fallback
    - Perubahan signaling/backend
    - Perubahan UI layout
    - Test matrix device/browser
    - Risiko scale dan mitigasi

------------------------------------------------------------------------

## 8. Prompt Competency Test/Re-Test Hardening

Gunakan untuk memperkuat tes tahap 2 dan re-test.

    Kamu adalah engineer untuk modul Competency Test dan Re-Test HerAI.

    Permintaan:
    [JELASKAN]

    Tugas:
    1. Baca js/frontend/competency-test.js dan js/dashboard/competency-monitor.js.
    2. Baca js/dashboard/retest-monitor.js.
    3. Baca action terkait di gas/Code.gs.
    4. Pastikan session, answer save, submit, dan scoring tidak hanya bergantung browser.
    5. Tambahkan idempotency untuk submit jika diperlukan.
    6. Pastikan timer dan section lock tidak mudah dimanipulasi.

    Output:
    - Data flow peserta
    - Data flow admin monitor
    - Backend action yang berubah
    - Perubahan scoring
    - Test plan reload/sinyal hilang/multiple tab

------------------------------------------------------------------------

## 9. Prompt AI Pre-Screening dan Scoring

Gunakan saat memperbaiki AI score, leaderboard, reviewer score, atau
scoring breakdown.

    Kamu adalah engineer AI workflow untuk HerAI Selection Stage 1.

    Masalah/fitur:
    [JELASKAN]

    Tugas:
    1. Baca js/dashboard/ai-prescreening.js dan js/dashboard/skoring.js.
    2. Baca sheet ai-screening-result dan peserta_tahap_1 di gas/Code.gs.
    3. Pastikan AI Score di leaderboard bersumber dari ai-screening-result.
    4. Pastikan reviewer avg, logika, motivasi, teknis, dan latar tersimpan konsisten.
    5. Jika scan massal, gunakan batch dan rate-limit.

    Output:
    - Sumber data score
    - Formula score
    - Data mismatch yang ditemukan
    - Perubahan API/GAS
    - Test leaderboard dan announcement

------------------------------------------------------------------------

## 10. Prompt RBAC dan Security Review

Gunakan untuk audit role admin, permission, route guard, dan tombol
dashboard.

    Kamu adalah application security engineer untuk HerAI Dashboard.

    Scope:
    [MODUL/ROUTE]

    Tugas:
    1. Baca dashboard_admin schema di gas/Code.gs.
    2. Baca RBAC helper frontend yang terkait.
    3. Cek apakah route hanya disembunyikan di UI atau benar-benar ditolak backend.
    4. Pastikan setiap tombol action penting memvalidasi permission.
    5. Tambahkan audit trail untuk action mutasi data.

    Output:
    - Matrix role vs permission
    - Route yang bisa diakses
    - Action backend yang harus enforce permission
    - Celah bypass
    - Rekomendasi perbaikan prioritas

------------------------------------------------------------------------

## 11. Prompt Data Visualization

Gunakan untuk menambah chart atau visual demografi/score.

    Kamu adalah data visualization engineer untuk dashboard HerAI.

    Visual yang diminta:
    [JELASKAN]

    Tugas:
    1. Baca js/dashboard/data-visualization.js.
    2. Tentukan sumber data dari GAS atau backend lain.
    3. Validasi field yang kosong/missing.
    4. Buat visual yang informatif untuk decision panitia.
    5. Tambahkan filter bila relevan.

    Output:
    - Sumber data
    - Transformasi data
    - Chart yang dibuat
    - Edge case
    - Cara verifikasi dengan data kosong dan data besar

------------------------------------------------------------------------

## 12. Prompt Deployment dan Environment Check

Gunakan sebelum deploy ulang Render/GAS/frontend.

    Kamu adalah DevOps engineer untuk HerAI Fellowship.

    Target deploy:
    [development/production]

    Tugas:
    1. Baca render.yaml.
    2. Cek env var wajib untuk signaling dan messaging.
    3. Cek GAS_WEB_APP_URL.
    4. Cek health endpoint:
       - /healthz signaling
       - /healthz messaging
       - /api/config messaging
       - /meeting-config signaling
    5. Pastikan secret tidak ada di JS atau commit.
    6. Buat rollback note.

    Output:
    - Checklist env
    - Service yang perlu redeploy
    - Health check commands
    - Risiko deploy
    - Rollback plan

------------------------------------------------------------------------

## 13. Prompt Code Review

Gunakan untuk review PR atau patch dari developer lain.

    Kamu adalah reviewer senior untuk repository HerAI Fellowship.

    Patch/branch:
    [ISI]

    Prioritas review:
    1. Bug dan regresi behavior.
    2. Security/privacy issue.
    3. Data integrity.
    4. Performance dan quota GAS.
    5. Missing tests atau missing smoke test.

    Aturan:
    - Findings dulu, ringkas.
    - Sertakan file dan line.
    - Jangan fokus style kecil jika ada bug besar.
    - Jangan approve logic sensitif yang hanya ada di JS.

    Output:
    - Findings ordered by severity
    - Open questions
    - Test gaps
    - Summary singkat

------------------------------------------------------------------------

## 14. Prompt Dokumentasi Setelah Implementasi

Gunakan setiap selesai fitur besar agar dokumentasi tetap hidup.

    Kamu adalah technical writer sekaligus engineer untuk HerAI Fellowship.

    Fitur/perubahan:
    [JELASKAN]

    Tugas:
    1. Update dokumentasi yang relevan di docs/.
    2. Tambahkan route, endpoint, sheet, env var, dan test plan bila ada.
    3. Catat breaking change.
    4. Catat migration step jika schema berubah.
    5. Tambahkan troubleshooting umum.

    Output:
    - Section dokumentasi yang diubah
    - Ringkasan fitur
    - Cara menjalankan
    - Cara verifikasi
    - Known limitations

------------------------------------------------------------------------

## 15. Prompt Maintenance Rutin Mingguan

Gunakan untuk health check sistem sebelum acara berjalan.

    Kamu adalah maintainer operasional HerAI Fellowship.

    Tugas mingguan:
    1. Cek GAS endpoint dan spreadsheet access.
    2. Cek Render service signaling dan messaging.
    3. Cek dashboard admin login.
    4. Cek pendaftaran, announcement, profile, competency, retest.
    5. Cek meeting create/join.
    6. Cek messaging login/add friend/send message.
    7. Export audit trail dan backup data penting.
    8. Catat error console dan network.

    Output:
    - Status tiap modul: OK/WARN/FAIL
    - Error yang ditemukan
    - Data backup yang dibuat
    - Action item prioritas
    - Rekomendasi sebelum event live
