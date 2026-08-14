# Hierarki Kurikulum dan Persistensi Database HerAI

Dokumen ini memetakan **Hierarki Kurikulum (Pemahaman Peserta/Bisnis)** dengan **Hierarki Database (Realita Google Sheets & Code.gs)**. 
*Diperbarui: Menggunakan sistem Numeric ID Injection agar Math for AI setara dengan AI Fundamentals (1 Topik = 15 Poin).*

## 1. Pemetaan Hierarki

### A. Modul Lama (Contoh: AI Fundamentals)
Pada modul lama, struktur di mata peserta (Kurikulum) dan struktur di database sangat berdekatan:

*   **Kategori:** Foundation & Core AI
*   **Module:** AI Fundamentals (`module_id: 'ai-fundamentals'`)
    *   **Submodule:** Pengantar AI *(Di DB tidak ada ID khusus, hanya label UI)*
        *   **Topik 1:** Kecerdasan Buatan di Sekitar Kita ➔ **Terkirim sbg `chapter_id: 1` (15 Poin)**
        *   **Topik 2:** Definisi, Software Biasa ➔ **Terkirim sbg `chapter_id: 2` (15 Poin)**
        *   *(Tiap 1 Topik dihargai 15 poin)*

### B. Modul Baru (Math for AI - Micro-Progress / 15 Poin per Topik)
Math for AI memiliki hierarki yang **satu tingkat lebih dalam** karena topiknya dipecah menjadi *micro-topics*. Agar setara dengan AI Fundamentals, kita men-generate ID Angka unik per topik: `(ID Submodul × 100) + Urutan Topik`.

*   **Kategori:** Foundation & Core AI
*   **Module:** Math for AI (`module_id: 'math-for-ai'`)
    *   **Submodule 01:** Kenapa AI Butuh Matematika?
        *   **Topik Mikro ke-1:** Dunia nyata representasi ➔ **Terkirim sbg `chapter_id: 101` (15 Poin)**
        *   **Topik Mikro ke-2:** Data, observation, feature, target ➔ **Terkirim sbg `chapter_id: 102` (15 Poin)**
    *   **Submodule 02:** Linear Algebra
        *   **Topik Mikro ke-1:** Dari scalar ke vector ➔ **Terkirim sbg `chapter_id: 201` (15 Poin)**
        *   *(Setiap klik Materi Selanjutnya / Tandai Selesai, peserta langsung dapat 15 Poin!)*

---

## 2. Rincian Eksekusi Poin per Aksi (Berdasarkan `Code.gs`)

Sistem poin diatur oleh fungsi `computeLiveLeaderboard` di backend, dengan rumus baku: 
`Poin = (Jumlah Chapter × 15) + (Jumlah Practice × 5) + Total Skor Kuis`

### Math for AI (Sistem Baru Ter-Update)
| Aksi Peserta (di Submodul 1) | Payload Database (`chapter_id`) | Poin |
| :--- | :--- | :---: |
| ✅ Membaca Topik Mikro 1 | `101` (Angka Unik) | **15** |
| ✅ Membaca Topik Mikro 2 | `102` (Angka Unik) | **15** |
| ✅ Membaca Topik Mikro 3 | `103` (Angka Unik) | **15** |
| ✅ Mensubmit Kuis Akhir | `'quiz'` | **Rata-rata Skor Kuis** |

---

## 3. Ketahanan Terhadap Spam Poin
- **Idempotensi Database:** Jika peserta mengklik tombol "Materi Selanjutnya" berkali-kali pada topik yang sama, sistem frontend mungkin mengirimkan `chapter_id: 101` berkali-kali ke Google Sheets.
- **Penyaringan di Leaderboard:** Script backend `computeLiveLeaderboard` secara otomatis menindih data duplikat dengan melakukan agregasi unik berdasarkan NIK. Satu peserta hanya bisa mendapat 15 poin dari `chapter_id: 101` satu kali per `module_id`. Skema poin dipastikan tidak akan bisa dijebol/dimanipulasi ganda.
