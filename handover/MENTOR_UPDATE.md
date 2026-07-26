# Mentor Update — HerAI Fellowship Dashboard

**Tanggal:** 27 Juli 2026
**Sesi:** Sisyphus (AI Agent)
**Total commits:** 19 commit

---

## Ringkasan Perubahan

### Task A: Progress Tracking Wired ke 28 Module
Setiap kali peserta membuka chapter di modul apapun, progress otomatis tercatat ke Google Sheets.
- 28 file `ai-*.js` di-inject dengan `MODULE_ID` + `saveChapterProgress()` call
- Progress tersimpan di sheet `participant_progress` via GAS `saveParticipantProgress` endpoint
- Dashboard menghitung progress real-time dari data ini
- Silent fail — tidak mengganggu UX jika GAS unavailable

### Task B: Seed Data Dashboard
Menambahkan 7 fungsi GAS seed untuk populate 6 sheet dashboard yang sebelumnya kosong.
- 27 modul dengan chapter counts, icons, routes
- 4 fase fellowship journey
- 5 upcoming events (relative date)
- 6 specialization tracks
- 4 discussion activities
- Leaderboard auto-populate dari ParticipantAccounts

**⚠️ User harus menjalankan `seedAllDashboardData()` dari Apps Script editor.**

### Bug Fixes (9 commit)
- Sidebar navigasi chapter Deep Learning (sekarang sidebar ikut update)
- Dropdown profil → Setting Akun (sekarang ke halaman yang benar)
- Settings page (sekarang semua tab berfungsi)
- Password change (sekarang ada error feedback)
- Flash "Aisyah Putri" di topbar (sekarang netral "Peserta")
- Dashboard 27 modul → 8 modul + "Lihat Semua"

---

## File yang Berubah

| File | Perubahan |
|---|---|
| `gas/Code.gs` | +163 baris (7 seed functions) |
| `js/router.js` | +13 baris (settings handler, profile redirect, guard) |
| `js/frontend/fellow-dashboard/settings.js` | ~50 baris (bug fixes, name fallback, greeting) |
| `pages/frontend/fellow-dashboard/dashboard.html` | 3 line (hardcode fix) |
| `pages/frontend/fellow-dashboard/settings.html` | 2 line (hardcode fix) |
| `pages/frontend/fellow-dashboard/.../deep-learning/materi.html` | Sidebar ID fix |
| `css/frontend/fellow-dashboard/settings.css` | Cleanup |
| `index.html` | Cache busters |
| 28 `ai-*.js` files | +2 line each (MODULE_ID + saveChapterProgress) |
| `handover/*` | Dokumentasi |
| `gemini.md` | Bug log |
| `scripts/inject-progress-tracking.js` | Tool baru |

---

## GAS Backend — Status

| Endpoint | Status |
|---|---|
| `participantLogin` | ✅ Production |
| `changeParticipantPassword` | ✅ Production |
| `saveParticipantProgress` | ✅ Production |
| `getParticipantProgress` | ✅ Production |
| `getParticipantDashboardData` | ✅ Production |
| `updateParticipantProfile` | ✅ Production |
| Seed functions | ⚠️ Belum dijalankan |

---

## Yang Perlu Dilakukan User

### 1. Jalankan seed dashboard data (5 menit)
```
Buka Google Spreadsheet → Extensions → Apps Script
Paste gas/Code.gs (dari commit terbaru)
Pilih fungsi "seedAllDashboardData" → Run
Cek sheet participant_dashboard_modules → harus 27 baris
```

### 2. Login ulang peserta
```
Logout → login dengan password baru
Session baru akan menyimpan nama asli
```

### 3. Test flow lengkap
```
Login → Dashboard → Klik modul → Navigasi chapter
Kembali ke Dashboard → Progress >0%
Klik nama kanan atas → Setting Akun → Settings
Tab Keamanan Akun → Ganti password
Logout → Login dengan password baru
```

---

## Informasi Sistem

| Item | Nilai |
|---|---|
| Spreadsheet ID | `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w` |
| GAS Web App URL | `https://script.google.com/macros/s/AKfycbz1tT_VoZQYrCxsBUD5v1HJjDNyM_p9TZnXw9t3uJlLmFLA7KGD4FzxPQ1I1a3w5tRE/exec` |
| GAS Deployment | Versi 3 (26 Juli 2026 08:04) |
| Dev server | `node server.js` → `http://127.0.0.1:3000` |
| Admin login | `super-admin` / `admin123` |
| Participant accounts | 187 akun di sheet |
| Last commit | `7ddfdde` |
| Branch | `main` |
