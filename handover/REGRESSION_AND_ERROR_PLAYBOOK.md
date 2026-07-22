# Regression & Error Playbook - HerAI Fellowship SuperApp

**Tanggal awal:** 17 Juli 2026  
**Checkpoint terbaru:** 19 Juli 2026
**Tujuan:** Panduan debugging untuk error umum, regresi, dan failure mode di project ini.

---

## 1. QA Gate Status

Checkpoint login peserta 19 Juli:

```text
Participant login regression checks passed; admin login remains unchanged
GAS syntax OK
```

Data read-only: 187 akun, 431 peserta, tanpa akun kosong/duplikat dan seluruh
`participant_rowId` akun ditemukan.

Status deployment GAS latest belum dikonfirmasi. Verifikasi deployment sebelum
menyimpulkan bug login.

### Snapshot historis QA 14 Juni 2026

| Status | Jumlah |
|---|---|
| PASS | 44 |
| WARN | 6 |
| FAIL | 1 |

**Release Gate saat snapshot tersebut: BLOCKED** (karena ada FAIL)

### FAIL Saat Ini
| Check | Error | Sebab |
|---|---|---|
| `signaling: go test ./...` | `no space left on device` | Disk environment habis, bukan error kode |

### WARN (semua terkait runtime endpoint tidak aktif)
Semua WARN karena QA dijalankan tanpa service running:
- `Frontend http://127.0.0.1:3000` - belum jalan `node server.js`
- `Messaging http://127.0.0.1:8091/healthz` - belum jalan `go run .`
- `Signaling http://127.0.0.1:8080/healthz` - belum jalan `go run .`

**Cara re-run:**
```bash
node scripts/qa-smoke.mjs

# Dengan endpoint live:
QA_FRONTEND_URL=http://127.0.0.1:3000 \
QA_MESSAGING_URL=http://127.0.0.1:8091 \
QA_SIGNALING_URL=http://127.0.0.1:8080 \
GAS_WEB_APP_URL=https://script.google.com/macros/s/.../exec \
node scripts/qa-smoke.mjs
```

---

## 2. Error Umum & Solusi

### 2.1 SPA - Halaman Blank / 404
**Gejala:** Halaman kosong atau redirect ke 404.
**Sebab:**
- Hash route tidak terdaftar di `js/router.js` - `router.routes`
- File HTML partial tidak ada di path yang dituju
- Initializer function tidak terdefinisi

**Cek:**
```bash
# Cek route terdaftar
grep '"' /home/faiz/her6/Her-AI/js/router.js | grep 'pages/'

# Cek file HTML ada
ls -la pages/frontend/<path>.html
```

**Fix:**
1. Tambah route ke `router.routes`
2. Jika halaman admin, tambah path ke array `adminPages`
3. Tambah initializer di `js/frontend/` atau `js/dashboard/`
4. Tambah `<script src="...">` di `index.html` bila file JS baru
5. Tambah pemanggilan initializer di `router.handleRouting()`

### 2.2 GAS - "Unknown action"
**Gejala:** Response `{ "status": "error", "message": "Unknown action: xxx" }`
**Sebab:** Action name tidak cocok antara frontend dan GAS routes.

**Cek:**
```bash
grep -oP '^\s*\w+:\s*\(\)\s*=>' gas/Code.gs | head -50
```

**Fix:** Sync action name di frontend dan GAS.

### 2.3 GAS - "Service invoked too many times"
**Gejala:** GAS error rate limit atau timeout.
**Sebab:** Google Apps Script punya quota harian.

**Best Practice:**
- Jangan panggil GAS dalam loop - batch action jika bisa
- AI Pre-Screening: ada rate limit built-in di kode
- Competency test: heartbeat auto-save setiap interval
- Gunakan proxy `/__gas` di `server.js` (bisa fallback lokal)

### 2.4 Login Peserta - "NIK atau password tidak valid"

Sumber login yang benar:

1. Buka tab `ParticipantAccounts`.
2. Ambil `nik`/`username` dan `generated_password` dari baris yang sama.
3. Jangan mengambil password dari `peserta_tahap_1`.
4. Password case-sensitive; salin seluruh simbol dan jangan tambahkan spasi.
5. Pastikan `access_status` bukan `inactive`.
6. Pastikan deployment existing sudah diedit ke **New version**, bukan hanya Save.

GAS akan mencari profil melalui `participant_rowId`, lalu fallback NIK.
`TARGET_PARTICIPANT_PORTAL_EMAILS` bukan syarat login untuk 187 akun existing.

### 2.5 Login Peserta - UI login tidak muncul

Jika route menampilkan “Portal Peserta Belum Dibuka”, cek setting
`participantPortalOpen`. Untuk mengisolasi backend tanpa mengubah setting, tes
`participantLogin` lewat browser console sesuai checkpoint utama.

Jangan menyelesaikan masalah login dengan provisioning ulang, batch generator,
`setupDatabase()`, atau `forceReset:true`.

### 2.6 GAS deployment tampak tidak berubah

Save di Apps Script tidak mengaktifkan kode Web App. Gunakan:

1. Deploy → Manage deployments.
2. Edit deployment Web App existing.
3. Version → New version.
4. Deploy.

Gunakan `gas/Code.gs`, bukan `gas/Code_For_Senior.gs` atau `gas/Code_lama.gs`.

### 2.7 Pengaturan peserta terlihat ada, tetapi tidak menyimpan

Ini adalah kondisi yang diketahui, bukan bukti GAS gagal:

- `#/participant-settings` masih memakai data contoh.
- Tombol Simpan/Unggah/Hapus belum mempunyai binding backend.
- Tab Keamanan, Notifikasi, dan Aksesibilitas belum operasional.
- Edit profil dasar yang nyata berada pada halaman profil terpisah melalui
  `updateParticipantProfile`.

### 2.8 Peserta tidak menemukan menu ganti password

Self-service ganti password memang belum tersedia. Jangan:

- mengekspos `setParticipantPassword` legacy sebagai route;
- memakai provisioning atau `forceReset:true` sebagai flow peserta;
- mengubah password admin;
- menulis password plaintext ke session atau log.

Fitur baru harus mempunyai old password, new password, confirmation, token
peserta, validasi kebijakan password, audit, sinkronisasi dua sheet, dan keputusan
revokasi sesi.

### 2.9 Competency Test - Jawaban Tidak Tersimpan
**Gejala:** Peserta kehilangan jawaban setelah refresh.
**Cek:**
1. `heartbeatCompetencySession` setiap interval (default ~30-60 detik)
2. Cek `CompetencySessions` sheet - field `answers`, `answered_count`
3. Di frontend, `localStorage` backup juga dipakai

### 2.10 Meeting - Tidak Bisa Connect
**Gejala:** WebSocket tidak connect, media tidak jalan.
**Cek:**
1. Apakah signaling server jalan? `curl http://localhost:8080/healthz`
2. Apakah URL signal di invite link benar? Format: `ws://host:port/ws`
3. Cek parameter URL: `?room=ROOM&title=TITLE&signal=WS_URL`
4. Jika P2P gagal: mungkin NAT blocking (butuh TURN server)
5. Cek `GET /meeting-config` - transport dan ICE servers

### 2.11 Messaging - Pesan Tidak Terkirim
**Gejala:** Chat notifikasi success tapi tidak muncul di penerima.
**Cek:**
1. Origin check: apakah domain terdaftar di `HERAI_ALLOWED_ORIGINS`?
2. WebSocket: cek connection status
3. REST fallback: `POST /api/rooms/{id}/messages`
4. Cek file `messaging-data.json` (jika pakai JSON persistence)

### 2.12 GAS - Spreadsheet ID Salah
**Gejala:** Semua action gagal.
**Cek:** `gas/Code.gs` line 13: `const SPREADSHEET_ID = '...'`
**Fix:** Update dengan ID spreadsheet yang benar.

---

## 3. Regression Test Checklist

Setelah perubahan, cek ini:

### 3.1 SPA
- [ ] Semua route publik bisa diakses via hash
- [ ] Admin layout muncul (sidebar, navbar admin)
- [ ] Participant layout muncul (sidebar participant)
- [ ] Fetch partial HTML tidak error 404
- [ ] Initializer function jalan tanpa console error
- [ ] Route yang tidak dikenal redirect ke `/home`

### 3.2 GAS Actions
- [ ] `getData` return data peserta
- [ ] `login` admin berhasil
- [ ] `register` peserta baru
- [ ] `participantLogin` valid
- [ ] `getCompetencyQuestions` return soal
- [ ] `getSettings` / `saveSettings` work
- [ ] `getAuditData` work
- [ ] `getParticipantDashboardData` return data

### 3.3 Participant Dashboard
- [ ] Login NIK/password berhasil
- [ ] Dashboard beranda render data dari GAS
- [ ] Modul catalog muncul
- [ ] AI learning pages render konten (materi, latihan, kuis, diskusi)
- [ ] Leaderboard menampilkan data (nama lain tersensor)
- [ ] Profile dasar bisa di-update melalui action GAS
- [ ] Settings tidak diklaim selesai selama form masih hard-coded
- [ ] Ganti password tidak diklaim tersedia sebelum action dan UI baru selesai
- [ ] Route course siap tidak menuju `under-development.html`

### 3.4 Go Services
- [ ] `signaling/healthz` return 200
- [ ] `messaging/healthz` return 200
- [ ] WebSocket `/ws` accept connection
- [ ] `messaging/api/config` return config

### 3.5 Build & Deploy
- [ ] `node server.js` jalan tanpa error
- [ ] `go build ./...` di signaling & messaging sukses

---

## 4. Failure Mode & Recovery

### 4.1 GAS Down / Timeout
**Gejala:** Semua data gagal load.
**Mitigasi:**
- Fallback lokal hanya aktif jika `HERAI_ENABLE_LOCAL_GAS_FALLBACK=true`.
- Secara default, error GAS diteruskan agar tidak menyamar sebagai error password.
- Cek `GAS_WEB_APP_URL` environment variable

### 4.2 Go Service Crash
**Gejala:** Meeting/messaging tidak bisa diakses.
**Recovery:**
```bash
# Cek log
journalctl -u herai-signaling -n 50
journalctl -u herai-messaging -n 50

# Restart
cd /home/faiz/her6/Her-AI/signaling && go build -o herai-signaling . && ./herai-signaling
cd /home/faiz/her6/Her-AI/messaging && go build -o herai-messaging . && ./herai-messaging
```

### 4.3 SPA Blank Screen
**Gejala:** index.html load tapi #app-content kosong.
**Diagnosis:**
1. Buka browser console - cek network error
2. Cek apakah hash route triggered? `console.log(window.location.hash)`
3. Cek apakah `router.handleRouting()` terpanggil
4. Cek apakah partial HTML path benar (absolute `/`)

### 4.4 Local Server Gagal Start
**Gejala:** `node server.js` error.
**Cek:**
```bash
# Port conflict?
lsof -nP -iTCP:3000 -sTCP:LISTEN
kill <PID_YANG_SUDAH_DIVERIFIKASI>

# Node version?
node --version  # Minimal v16
```

---

## 5. Debugging Commands

```bash
# Cek file exist
ls -la pages/frontend/<path>.html

# Cek routing
grep 'route' js/router.js | grep -o '"[^"]*":' | head -30

# Cek syntax JS
node --check js/router.js
node --check js/main.js

# Cek Go compile
cd signaling && go build ./...
cd messaging && go build ./...

# Cek GAS action name
grep -oP '\w+: \(\) =>' gas/Code.gs | sort

# Cek TODO/FIXME di kode
grep -rn 'TODO\|FIXME\|HACK\|XXX' js/ --include="*.js"

# Cek file size besar
find pages/ -name "*.html" -exec wc -l {} + | sort -rn | head -10
find js/ -name "*.js" -exec wc -l {} + | sort -rn | head -10

# Quick QA
node scripts/qa-smoke.mjs

# Route file check; hasil pass belum membuktikan course aktif
node scripts/check-participant-routes.mjs
```

`check-participant-routes.mjs` saat ini hanya mengecek keberadaan target file.
Hasil 114/114 tetap dapat berisi route ke Under Development; periksa target
secara semantik sebelum menyatakan learning path aktif.
