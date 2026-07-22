# Her-AI SuperApp - AI Developer Guide

Dokumen ini adalah sumber kebenaran (source of truth) dan aturan main bagi AI / developer yang bekerja di repository `Her-AI`, terutama terkait UI/UX dan arsitektur front-end di Fellow Dashboard. **Setiap AI yang bekerja pada project ini wajib membaca dan mengikuti aturan di bawah ini sebelum mengeksekusi kode.**

## 1. UI Consistency & Modern Aesthetic (Standardisasi Layout)
Referensi utama (Gold Standard) untuk desain antarmuka modul pembelajaran adalah **Konsep AI Modern** (`ai-modern.js` dan styling `ai-modern-page` di `modules.css`).

**Aturan:**
- Jangan biarkan ada modul (seperti Python, Evaluation, Evolution, Reasoning, dll) yang menggunakan layout teks polos atau desain lawas (misalnya `reasoning-scaffold-module-meta`).
- Gunakan dan manfaatkan class CSS yang sudah standar untuk mempertahankan layout yang dinamis dan terkesan mahal, seperti:
  - `ai-modern-chapter-hero` dan `ai-modern-objectives` untuk bagian orientasi/header materi (Topik, Durasi, dsb).
  - `ai-modern-beginner-roadmap` untuk bagian alur belajar (roadmap).
  - `python-deep-dive-grid` untuk detail teori (tetap pertahankan class namun pastikan bentuknya rapi).
  - `reasoning-qc-enhanced` untuk elemen kuis/latihan (Quick Check) beserta atribut interaktifnya (`data-check-correct`, `data-check-wrong`).

## 2. Bug History & Lessons Learned
### 2.1 CSS Variable Omission (The "White on White" Bug)
- **Gejala:** Elemen interaktif seperti tombol navigasi kuis atau badge angka yang aktif/di-hover teksnya berubah menjadi putih namun background-nya juga putih/hilang, sehingga konten tidak terlihat.
- **Penyebab:** Modul baru (seperti `ai-python-page`) diatur untuk memanggil variabel CSS (contoh: `var(--python-pink)`, `var(--python-surface)`), tetapi variabel-variabel tersebut **lupa didefinisikan** pada scope utama modul tersebut. Sehingga browser menganggap nilainya transparan/kosong.
- **Pencegahan / Aturan Utama CSS:** Setiap kali menduplikasi atau membuat scope page modul baru (`.ai-[topik]-page`), **wajib** mendefinisikan palet warnanya secara lengkap di `modules.css`.
- **Contoh Standard:**
  ```css
  .ai-[topik]-page {
      --[topik]-ink: #171827;
      --[topik]-copy: #51596d;
      --[topik]-muted: #6f7282;
      --[topik]-pink: #f63392;
      --[topik]-pink-deep: #d91d78;
      --[topik]-pink-soft: #fff0f7;
      --[topik]-surface: #fffcfd;
      --[topik]-surface-soft: #fff7fb;
      --[topik]-line: rgba(244, 143, 188, .28);
  }
  ```

### 2.2 JavaScript Rendering Logic
Sebagian besar HTML statis pada halaman `01-materi.html` itu kosong dan di-*inject* langsung via fungsi JavaScript (misalnya `renderOrientationAndNav`, `renderPythonDeepDive`, dll).
- **Aturan:** Ketika me-refactor UI sebuah modul agar "modern", kita **tidak menyentuh** file statis `html` (kecuali dibutuhkan). Sebagai gantinya, rombak fungsi `render` di file `[nama-modul].js` agar melakukan injeksi string HTML yang menggunakan DOM *hierarchy* dan *class* persis seperti di `ai-modern.js`.

## 3. Execution Plan untuk Refactoring Sisa Halaman
Saat ini kita memiliki beberapa modul lain (seperti Reasoning, Machine Learning, Deep Learning, dll). Agar konsisten, kita menggunakan workflow berikut:

**Langkah demi Langkah (Satu per Satu, Jangan Sekaligus):**
1. **Analisis JS Target:** Baca file `.js` modul yang ingin diubah (contoh: `ai-reasoning.js`). Fokus pada fungsi-fungsi *rendering* utama (Hero, Deep Dive, Glossary, Navigation).
2. **Periksa DOM & CSS:** Bandingkan dengan referensi `ai-modern.js` atau perubahan terakhir yang sudah sukses kita aplikasikan (seperti di `ai-python.js`).
3. **Cek Root Variables:** Periksa file `modules.css`. Apakah class `.ai-[modul]-page` sudah punya deklarasi variabel warnanya sendiri? Jika tidak, definisikan dulu.
4. **Eksekusi:** Gunakan tool pengganti konten secara granular (`replace_file_content` / `multi_replace_file_content`) untuk mengubah struktur injeksi HTML dalam JavaScript tersebut.
5. **Verifikasi:** Pastikan styling modern *kick-in* dengan benar tanpa merusak fungsionalitas tombol kuis, latihan, dll. Lanjut ke modul berikutnya jika *user* mengkonfirmasi sudah berhasil.
