# Her-AI SuperApp - AI Developer Guide

Dokumen ini adalah sumber kebenaran (source of truth) dan aturan main bagi AI / developer yang bekerja di repository `Her-AI`, terutama terkait UI/UX dan arsitektur front-end di Fellow Dashboard. **Setiap AI yang bekerja pada project ini wajib membaca dan mengikuti aturan di bawah ini sebelum mengeksekusi kode.**

## 1. UI Consistency & Modern Aesthetic (Standardisasi Layout - NEW PLAN)
Referensi utama (Gold Standard) untuk desain antarmuka hero/header materi adalah **Pengantar AI** yang simpel, elegan, dan *full-width* tanpa sidebar yang membatasi layout materi (menggunakan desain banner pink bergradasi yang seragam).

**Aturan Konsistensi:**
- **Terminologi:** Jangan mencampuradukkan "Chapter" dan "Topik". Gunakan **Topik** secara konsisten di seluruh aplikasi (baik di UI sidebar, judul banner, maupun navigasi).
- **Styling Banner:** Semua modul wajib menggunakan satu komponen banner yang konsisten (seperti di Pengantar AI). Banner ini diatur dengan class `.lesson-topic-banner` (yang akan kita buat terpusat di `modules.css`).
  - Elemen ini menggantikan `.ai-modern-chapter-hero` maupun `.ai-evaluation-chapter-head` agar tampilan lebih seragam dan tidak terlalu memakan ruang (*compact & elegant*).
  - Contoh HTML Banner Standar:
    ```html
    <header class="lesson-topic-banner">
        <h3><i class="fas fa-book-open"></i> Topik [X]: [Judul Topik]</h3>
        <p>Goal: [Deskripsi/Tujuan Topik]</p>
    </header>
    ```

## 2. Bug History & Lessons Learned
### 2.1 CSS Variable Omission (The "White on White" Bug)
- **Gejala:** Elemen interaktif seperti tombol navigasi kuis atau badge angka yang aktif/di-hover teksnya berubah menjadi putih namun background-nya juga putih/hilang, sehingga konten tidak terlihat.
- **Penyebab:** Modul baru (seperti `ai-python-page`) diatur untuk memanggil variabel CSS (contoh: `var(--python-pink)`, `var(--python-surface)`), tetapi variabel-variabel tersebut **lupa didefinisikan** pada scope utama modul tersebut. Sehingga browser menganggap nilainya transparan/kosong.
- **Pencegahan / Aturan Utama CSS:** Setiap kali menduplikasi atau membuat scope page modul baru (`.ai-[topik]-page`), **wajib** mendefinisikan palet warnanya secara lengkap di `modules.css`.

### 2.2 Right Sidebar Layout Constraint
- **Gejala:** Jarak antara main content dan right sidebar terlalu rapat atau layout tidak bisa melar 100%.
- **Penyebab:** Adanya pembungkus (wrapper) berlebih seperti `.ai-evaluation-shell` atau `max-width` yang mengunci ukuran `div` materi padahal `lesson-layout` sudah menggunakan Grid yang otomatis membagi ruang.
- **Pencegahan:** Selalu sandarkan elemen utama pada struktur `.lesson-layout > .lesson-main-content` dan `aside.lesson-right-panel` (jika dibutuhkan) tanpa menambah wrapper pengunci lebar (constrained wrapper).

## 3. Execution Plan (Konsistensi "Topik" & Layout "Pengantar AI")
Agar seluruh halaman konsisten, kita menggunakan workflow berikut:

**Langkah demi Langkah Eksekusi (Setelah Rencana Disetujui):**
1. **Pusatkan CSS:** Buat class `.lesson-topic-banner` di `modules.css` yang mereplikasi desain pink gradient dari Pengantar AI.
2. **Refactor Pengantar AI:** Ganti inline-css yang ada di `settings.js` dan `materi.html` dengan class `.lesson-topic-banner`. Ubah teks "Chapter 2" dsb menjadi "Topik 2".
3. **Script Massal / Edit Granular Modul Lain:** Ubah struktur header di folder `chapters/` (Evaluation, Evolution, Reasoning, Modern, Python) untuk menggunakan class `.lesson-topic-banner` dan mengubah kata "Chapter" menjadi "Topik".
4. **Refactor JS Navigation:** Pastikan JS yang merender navigasi list atau tombol prev/next mengubah labelnya menjadi "Topik Sebelumnya / Topik Selanjutnya" agar 100% konsisten.
