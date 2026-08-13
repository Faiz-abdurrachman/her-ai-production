# Hierarki Kurikulum dan Persistensi Database HerAI

Dokumen ini memetakan **Hierarki Kurikulum (Pemahaman Peserta/Bisnis)** dengan **Hierarki Database (Realita Google Sheets & Code.gs)** untuk menghindari miskomunikasi pengembangan antara modul lama dan modul baru.

## 1. Pemetaan Hierarki

### A. Modul Lama (Contoh: AI Fundamentals)
Pada modul lama, struktur di mata peserta (Kurikulum) dan struktur di database sangat berdekatan:

*   **Kategori:** Foundation & Core AI
*   **Module:** AI Fundamentals (`module_id: 'ai-fundamentals'`)
    *   **Submodule:** Pengantar AI *(Di DB tidak ada ID khusus, hanya label UI)*
        *   **Topik 1:** Kecerdasan Buatan di Sekitar Kita ➔ **Terkirim sbg `chapter_id: 1` (15 Poin)**
        *   **Topik 2:** Definisi, Software Biasa ➔ **Terkirim sbg `chapter_id: 2` (15 Poin)**
        *   *(Tiap 1 Topik dihargai 15 poin)*

### B. Modul Baru (Contoh: Math for AI)
Modul baru seperti Math for AI memiliki hierarki yang **satu tingkat lebih dalam** karena topiknya dipecah menjadi *micro-topics* yang sangat banyak.

*   **Kategori:** Foundation & Core AI
*   **Module:** Math for AI (`module_id: 'math-for-ai'`)
    *   **Submodule 01:** Kenapa AI Butuh Matematika? ➔ **Terkirim sbg `chapter_id: 1` (15 Poin)**
        *   **Topik Mikro:** Dunia nyata representasi ➔ *(0 Poin, direkam sbg `topic-01-topic-01`)*
        *   **Topik Mikro:** Data, observation, feature, target ➔ *(0 Poin, direkam sbg `topic-01-topic-02`)*
        *   *(Poin 15 baru cair secara Lump Sum ketika seluruh Topik Mikro di dalam Submodule 01 selesai dibaca)*

---

## 2. Rincian Eksekusi Poin per Aksi (Berdasarkan `Code.gs`)

Sistem poin diatur oleh fungsi `computeLiveLeaderboard` di backend, dengan rumus baku: 
`Poin = (Jumlah Chapter × 15) + (Jumlah Practice × 5) + Total Skor Kuis`

### AI Fundamentals (Sistem Langsung)
| Aksi Peserta | Payload Database (`chapter_id`) | Poin |
| :--- | :--- | :---: |
| Tamat Topik (Kecerdasan Buatan) | `1` | **15** |
| Tamat Topik (Software Biasa) | `2` | **15** |
| Mengerjakan Latihan | `'practice'` | **5** |
| Mengerjakan Kuis | `'quiz'` | **Sesuai Skor** |

### Math for AI (Sistem Macro-Progress / Nabung Poin)
Karena hierarkinya lebih dalam, pemberian poin harus "ditahan" agar tidak terjadi inflasi poin.

| Aksi Peserta (di Submodul 1) | Payload Database (`chapter_id`) | Poin |
| :--- | :--- | :---: |
| Membaca Topik Mikro 01 s/d 06 | `'topic-01-topic-N'` | **0** |
| Mengerjakan Kuis Diagnostic/Kecil | `'quiz-01'` | **0** |
| **✅ Tamat Topik Mikro 07 (Terakhir)** | `1` | **15** |
| **✅ Mensubmit Kuis 07 (Final Kuis)** | `'quiz'` | **Rata-rata Skor** |

---

## 3. Ketahanan Terhadap Spam Poin
- **Idempotensi Database:** Jika peserta mengklik tombol "Materi Selanjutnya" berkali-kali pada topik terakhir, sistem frontend mungkin mengirimkan `chapter_id: 1` berkali-kali ke Google Sheets.
- **Penyaringan di Leaderboard:** Script backend `computeLiveLeaderboard` secara otomatis menindih data duplikat dengan melakukan agregasi unik berdasarkan NIK. Satu peserta hanya bisa mendapat 15 poin dari `chapter_id: 1` satu kali per `module_id`. Skema poin dipastikan tidak akan bisa dijebol/dimanipulasi ganda.
