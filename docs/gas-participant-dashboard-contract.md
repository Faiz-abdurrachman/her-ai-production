# GAS Contract - Participant Dashboard

Dokumen ini mendefinisikan data dinamis untuk Beranda Dashboard Peserta HerAI Fellowship.

## Action

### `getParticipantDashboardData`

Frontend mengirim:

```json
{
  "action": "getParticipantDashboardData",
  "nik": "3276xxxxxxxxxxxx"
}
```

Backend mengembalikan:

```json
{
  "status": "success",
  "data": {
    "modules": [],
    "discussionTrails": [],
    "tracks": [],
    "journey": [],
    "events": [],
    "leaderboard": []
  }
}
```

Jika action belum tersedia atau error, frontend memakai fallback lokal agar halaman tidak kosong.

## Sheets

### `participant_dashboard_modules`

| column | type | note |
|---|---|---|
| title | string | Nama module card |
| subtitle | string | Deskripsi pendek |
| progress | number | 0-100 |
| icon | string | Class Font Awesome, contoh `fas fa-brain` |
| tone | string | `pink`, `purple`, `orange` |
| href | string | Hash route, contoh `#/participant-ai-fundamentals` |
| is_active | boolean | TRUE/FALSE |
| sort_order | number | Urutan tampil |

### `participant_dashboard_discussion_trails`

Berisi aktivitas komunitas khusus diskusi.

| column | type | note |
|---|---|---|
| actor | string | Nama mentor/panitia/peserta |
| action | string | Contoh `membalas diskusi` |
| topic | string | Nama topik |
| time_label | string | Contoh `2 jam yang lalu` |
| tone | string | Kosong, `blue`, atau `green` |
| is_active | boolean | TRUE/FALSE |
| created_at | datetime | Timestamp asli |

### `participant_dashboard_tracks`

| column | type | note |
|---|---|---|
| title | string | Nama specialization track |
| subtitle | string | Deskripsi pendek |
| icon | string | Class Font Awesome |
| is_active | boolean | TRUE/FALSE |
| sort_order | number | Urutan tampil |

### `participant_dashboard_journey`

| column | type | note |
|---|---|---|
| title | string | Nama fase |
| subtitle | string | Deskripsi |
| progress | number | 0-100 |
| icon | string | Class Font Awesome |
| accent | string | Hex color |
| is_active | boolean | TRUE/FALSE |
| sort_order | number | Urutan tampil |

### `participant_dashboard_events`

Upcoming Events diisi panitia dari dashboard admin.

| column | type | note |
|---|---|---|
| day | string | Tanggal, contoh `22` |
| month | string | Bulan singkat, contoh `MEI` |
| title | string | Judul event |
| time | string | Waktu tampil |
| url | string | Link meeting/detail event |
| is_active | boolean | TRUE/FALSE |
| sort_order | number | Urutan tampil |

### `participant_dashboard_leaderboard`

Frontend hanya menampilkan nama peserta aktif. Nama peserta lain disensor menjadi `*********`.

| column | type | note |
|---|---|---|
| rank | number | Peringkat |
| nik | string | Anchor peserta |
| name | string | Nama asli, hanya muncul untuk NIK login |
| points | number | Total poin |
| is_active | boolean | TRUE/FALSE |

## Catatan Keamanan Tampilan

- Sensor nama leaderboard tetap dilakukan di frontend sebagai UX guard.
- Untuk privasi lebih kuat, GAS sebaiknya juga mengembalikan nama peserta lain sebagai `*********`, kecuali `nik` sama dengan NIK yang sedang login.
- Dashboard peserta tidak boleh mengandalkan data sensitif di JavaScript. Data final tetap berasal dari GAS.
