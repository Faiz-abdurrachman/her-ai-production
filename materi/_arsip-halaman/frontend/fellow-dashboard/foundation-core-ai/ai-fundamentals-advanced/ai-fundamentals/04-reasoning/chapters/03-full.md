# Submateri 2 — Planning dan Problem Decomposition

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/03-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Submateri 2 — Planning dan Problem Decomposition

#### 2.1 Pembuka: Tujuan Besar Tidak Dikerjakan dalam Satu Langkah

Permintaan berikut terlihat sederhana:

> “Buat workshop pengenalan AI.”

Namun, permintaan tersebut sebenarnya terdiri atas banyak keputusan:

-   siapa pesertanya;
-   apa tujuan belajarnya;
-   berapa durasinya;
-   materi apa yang dipilih;
-   bagaimana bentuk latihan;
-   fasilitas apa yang tersedia;
-   bagaimana keberhasilannya diukur.

Sistem AI yang langsung menghasilkan jadwal tanpa memahami bagian-bagian tersebut berisiko membuat rencana yang tidak realistis.

    Reasoning:
    Apa masalahnya, informasi apa yang penting,
    dan hubungan apa yang perlu dipahami?

    Planning:
    Langkah apa yang perlu dilakukan
    untuk mencapai tujuan?

#### 2.2 Apa Itu Planning?

**Planning** adalah proses mengubah tujuan menjadi urutan langkah yang dapat dilaksanakan.

Planning menjawab pertanyaan seperti:

-   apa hasil akhirnya;
-   apa kondisi awalnya;
-   apa batasannya;
-   tugas kecil apa yang diperlukan;
-   apa urutan yang tepat;
-   kapan rencana dinyatakan selesai;
-   apa yang dilakukan jika kondisi berubah.

Pendekatan Plan-and-Solve membagi proses menjadi dua bagian: menyusun rencana yang memecah tugas menjadi subtugas, kemudian menjalankan subtugas tersebut berdasarkan rencana [1].

#### 2.3 Komponen Utama Planning

##### 1. Goal

Goal adalah hasil akhir yang ingin dicapai.

Contoh terlalu kabur:

> “Membuat workshop yang bagus.”

Contoh lebih terukur:

> “Menyelenggarakan workshop pengenalan AI selama dua jam untuk 50 peserta pemula, dengan satu sesi praktik dan satu kuis akhir.”

Goal yang jelas membantu AI menentukan apakah rencana sudah sesuai.

##### 2. Initial State

Initial state adalah kondisi awal sebelum tindakan dilakukan.

Contoh:

-   peserta berjumlah 50;
-   tersedia dua mentor;
-   hanya ada satu proyektor;
-   internet tidak stabil;
-   ruangan tersedia selama 120 menit.

##### 3. Constraints

Constraints adalah batasan yang harus dipatuhi.

Batasan dapat berupa:

-   waktu;
-   anggaran;
-   jumlah orang;
-   kapasitas ruangan;
-   kebijakan;
-   akses alat;
-   kemampuan peserta;
-   tenggat;
-   izin.

##### 4. Actions

Actions adalah tindakan yang dapat dilakukan untuk mendekati goal.

Contoh:

-   menentukan materi;
-   membuat slide;
-   menyiapkan demo;
-   membagi kelompok;
-   membuat kuis.

##### 5. Dependencies

Dependencies adalah hubungan ketergantungan antarpekerjaan.

    Materi selesai
        ↓
    Slide dapat dibuat
        ↓
    Latihan disesuaikan
        ↓
    Kuis disusun

##### 6. Success Criteria

Success criteria menentukan kapan rencana dianggap berhasil.

Contoh:

-   total durasi tepat 120 menit;
-   peserta memperoleh satu aktivitas praktik;
-   semua sesi memiliki tujuan;
-   tidak ada kebutuhan alat yang melebihi fasilitas;
-   terdapat evaluasi akhir.

* * * * *

#### 2.4 Problem Decomposition

**Problem decomposition** adalah proses memecah tugas besar menjadi bagian yang lebih kecil, lebih jelas, dan dapat dikerjakan.

    Tugas besar:
    Menyelenggarakan workshop AI

    Subtugas:
    1. Menentukan profil peserta.
    2. Menentukan tujuan belajar.
    3. Memilih materi.
    4. Menentukan metode.
    5. Membuat jadwal.
    6. Menentukan kebutuhan fasilitas.
    7. Membuat latihan.
    8. Menyiapkan evaluasi.
    9. Memeriksa risiko.

Subtugas yang baik seharusnya:

-   memiliki tujuan yang jelas;
-   memiliki input;
-   menghasilkan output;
-   dapat dikerjakan;
-   dapat diperiksa;
-   tidak terlalu besar;
-   tidak terlalu kecil;
-   memiliki hubungan yang jelas dengan goal utama.

##### Subtugas Terlalu Besar

> “Selesaikan seluruh persiapan workshop.”

Subtugas ini masih terlalu luas.

##### Subtugas Terlalu Kecil

> “Tekan tombol Enter setelah menulis judul.”

Subtugas ini terlalu detail untuk planning tingkat modul.

##### Subtugas yang Lebih Baik

> “Buat outline materi yang mencakup pengertian AI, contoh penggunaan, risiko, dan latihan.”

* * * * *

#### 2.5 Hierarchical Planning

Planning dapat disusun dalam beberapa tingkat.

    Tujuan utama
    ├── Persiapan materi
    │   ├── Menentukan topik
    │   ├── Membuat contoh
    │   └── Membuat latihan
    ├── Persiapan teknis
    │   ├── Memeriksa ruangan
    │   ├── Memeriksa proyektor
    │   └── Menyiapkan demo offline
    └── Evaluasi
        ├── Membuat kuis
        └── Mengumpulkan feedback

Struktur hierarkis membantu AI dan manusia melihat hubungan antara tujuan besar dan pekerjaan kecil.

#### 2.6 Urutan dan Dependensi

Perhatikan rencana berikut:

    1. Mencetak sertifikat.
    2. Menentukan nama peserta.
    3. Membuka pendaftaran.

Urutannya salah. Nama peserta belum tersedia sebelum pendaftaran dibuka.

Urutan yang lebih tepat:

    1. Membuka pendaftaran.
    2. Mengumpulkan nama peserta.
    3. Memverifikasi kehadiran.
    4. Mencetak sertifikat.

Kesalahan dependensi dapat menghasilkan:

-   pekerjaan ulang;
-   waktu terbuang;
-   data tidak akurat;
-   output yang harus dibuat ulang;
-   konflik jadwal.

* * * * *

#### 2.7 Static Planning dan Dynamic Planning

##### Static Planning

Rencana statis dibuat di awal dan dijalankan tanpa perubahan.

    Plan → Step 1 → Step 2 → Step 3 → Result

Cocok ketika:

-   kondisi stabil;
-   data lengkap;
-   langkah sudah jelas;
-   risiko perubahan rendah;
-   tugas berulang dengan pola yang sama.

Contoh:

> Mengubah ukuran 20 gambar ke dimensi yang sama menggunakan satu proses otomatis.

##### Dynamic Planning

Rencana dinamis dapat diperbarui berdasarkan hasil atau informasi baru.

    Buat rencana
        ↓
    Jalankan langkah
        ↓
    Amati hasil
        ↓
    Apakah kondisi sesuai?
     ├── Ya → lanjut
     └── Tidak → ubah rencana

Contoh:

> Workshop direncanakan menggunakan demo online. Tiga puluh menit sebelum acara, internet tidak tersedia. Rencana perlu diperbarui menjadi demo offline atau simulasi berbasis tangkapan layar.

Replanning bukan selalu tanda kegagalan. Dalam lingkungan yang berubah, replanning justru dapat menunjukkan bahwa sistem menggunakan observation untuk menyesuaikan tindakan.

* * * * *

#### 2.8 Contoh Terurai — Merencanakan Workshop AI

##### Kondisi Awal

    Peserta: 50
    Durasi: 120 menit
    Mentor: 2
    Proyektor: 1
    Internet: tidak stabil
    Target: peserta memahami konsep dasar AI dan mencoba satu aktivitas

##### Goal

Menyelenggarakan workshop pengenalan AI selama 120 menit untuk 50 peserta pemula, dengan penjelasan konsep, demonstrasi, aktivitas praktik, dan evaluasi.

##### Constraints

-   total waktu tidak boleh melebihi 120 menit;
-   hanya tersedia satu proyektor;
-   internet tidak stabil;
-   hanya terdapat dua mentor;
-   seluruh peserta harus dapat mengikuti aktivitas.

##### Dekomposisi

1.  Pembukaan dan orientasi.
2.  Pengenalan konsep AI.
3.  Contoh penggunaan AI.
4.  Demonstrasi offline.
5.  Latihan kelompok.
6.  Pembahasan hasil.
7.  Kuis singkat.
8.  Penutup.

##### Jadwal

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Sesi
Durasi</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Pembukaan
10 menit</td>
<td align="left">Konsep dasar AI
25 menit</td>
</tr>
</tbody>
</table>

##### Dependensi

-   latihan harus dibuat setelah tujuan belajar ditentukan;
-   demo harus diuji sebelum acara;
-   kuis harus mengukur materi yang benar-benar disampaikan;
-   pembagian kelompok harus mempertimbangkan jumlah mentor.

##### Skenario Perubahan

> Proyektor tidak dapat digunakan selama 30 menit pertama.

##### Replanning

    Menit 0–10:
    Pembukaan tanpa proyektor.

    Menit 10–30:
    Diskusi contoh AI dari pengalaman peserta.

    Menit 30–50:
    Konsep dasar menggunakan papan tulis atau handout.

    Setelah proyektor tersedia:
    Demo dan materi visual dilanjutkan.

Rencana yang baik tidak hanya menyusun urutan ideal, tetapi juga mengenali titik yang mungkin gagal.

* * * * *

#### 2.9 Planning Failure

##### 1. Goal Terlalu Kabur

Tanpa target terukur, AI tidak tahu kapan rencana selesai.

##### 2. Subtugas Tidak Lengkap

Rencana melupakan evaluasi, izin, atau kebutuhan teknis.

##### 3. Dependensi Terlewat

Sertifikat dicetak sebelum peserta terverifikasi.

##### 4. Batasan Tidak Diperhitungkan

Total sesi menjadi 150 menit padahal ruangan hanya tersedia 120 menit.

##### 5. Rencana Terlalu Kaku

Rencana tetap memaksakan demo online meskipun internet mati.

##### 6. Terlalu Banyak Langkah

Rencana menjadi sangat detail hingga sulit digunakan.

##### 7. Tidak Ada Success Criteria

AI tidak dapat memeriksa apakah tujuan sudah tercapai.

##### 8. Tidak Mengantisipasi Risiko

Tidak ada alternatif ketika alat utama gagal.

##### 9. Tidak Memperbarui Rencana

Observation baru diabaikan.

* * * * *

#### 2.10 Cara Memeriksa Rencana AI

    □ Tujuan dapat diukur
    □ Kondisi awal sudah dicatat
    □ Batasan sudah dikenali
    □ Subtugas mencakup seluruh kebutuhan
    □ Subtugas memiliki output yang jelas
    □ Urutan mengikuti dependensi
    □ Total waktu dan sumber daya masuk akal
    □ Risiko penting sudah dipertimbangkan
    □ Rencana dapat diperbarui jika kondisi berubah
    □ Kriteria selesai sudah jelas

* * * * *

#### 2.11 Kapan Planning Diperlukan?

Planning diperlukan ketika:

-   tugas terdiri atas banyak langkah;
-   terdapat dependensi;
-   terdapat batasan waktu atau sumber daya;
-   hasil membutuhkan koordinasi;
-   tugas dapat berubah berdasarkan observation;
-   kegagalan satu langkah memengaruhi langkah lain.

Planning sederhana atau eksplisit tidak selalu diperlukan untuk:

-   jawaban fakta satu langkah;
-   formatting teks;
-   koreksi typo;
-   operasi yang sangat kecil dan langsung.

* * * * *

#### 2.12 Ringkasan Submateri

-   Planning mengubah tujuan menjadi urutan tindakan.
-   Goal, initial state, constraints, actions, dependencies, dan success criteria adalah komponen utama rencana.
-   Problem decomposition memecah tugas besar menjadi subtugas yang dapat dikerjakan.
-   Urutan harus mengikuti dependensi.
-   Static plan cocok untuk kondisi stabil.
-   Dynamic plan cocok untuk kondisi yang dapat berubah.
-   Rencana AI tetap harus diperiksa dari sisi kelengkapan, kelayakan, risiko, dan batasan.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Submateri 2 — Planning dan Problem Decomposition</h1>
<h2>2.1 Pembuka: Tujuan Besar Tidak Dikerjakan dalam Satu Langkah</h2>
<p>Permintaan berikut terlihat sederhana:</p>
<blockquote>
<p>“Buat workshop pengenalan AI.”</p>
</blockquote>
<p>Namun, permintaan tersebut sebenarnya terdiri atas banyak keputusan:</p>
<ul>
<li>siapa pesertanya;</li>
<li>apa tujuan belajarnya;</li>
<li>berapa durasinya;</li>
<li>materi apa yang dipilih;</li>
<li>bagaimana bentuk latihan;</li>
<li>fasilitas apa yang tersedia;</li>
<li>bagaimana keberhasilannya diukur.</li>
</ul>
<p>Sistem AI yang langsung menghasilkan jadwal tanpa memahami bagian-bagian tersebut berisiko membuat rencana yang tidak realistis.</p>
<pre><code class="language-text">Reasoning:
Apa masalahnya, informasi apa yang penting,
dan hubungan apa yang perlu dipahami?

Planning:
Langkah apa yang perlu dilakukan
untuk mencapai tujuan?
</code></pre>
<h2>2.2 Apa Itu Planning?</h2>
<p><strong>Planning</strong> adalah proses mengubah tujuan menjadi urutan langkah yang dapat dilaksanakan.</p>
<p>Planning menjawab pertanyaan seperti:</p>
<ul>
<li>apa hasil akhirnya;</li>
<li>apa kondisi awalnya;</li>
<li>apa batasannya;</li>
<li>tugas kecil apa yang diperlukan;</li>
<li>apa urutan yang tepat;</li>
<li>kapan rencana dinyatakan selesai;</li>
<li>apa yang dilakukan jika kondisi berubah.</li>
</ul>
<p>Pendekatan Plan-and-Solve membagi proses menjadi dua bagian: menyusun rencana yang memecah tugas menjadi subtugas, kemudian menjalankan subtugas tersebut berdasarkan rencana [1].</p>
<h2>2.3 Komponen Utama Planning</h2>
<h3>1. Goal</h3>
<p>Goal adalah hasil akhir yang ingin dicapai.</p>
<p>Contoh terlalu kabur:</p>
<blockquote>
<p>“Membuat workshop yang bagus.”</p>
</blockquote>
<p>Contoh lebih terukur:</p>
<blockquote>
<p>“Menyelenggarakan workshop pengenalan AI selama dua jam untuk 50 peserta pemula, dengan satu sesi praktik dan satu kuis akhir.”</p>
</blockquote>
<p>Goal yang jelas membantu AI menentukan apakah rencana sudah sesuai.</p>
<h3>2. Initial State</h3>
<p>Initial state adalah kondisi awal sebelum tindakan dilakukan.</p>
<p>Contoh:</p>
<ul>
<li>peserta berjumlah 50;</li>
<li>tersedia dua mentor;</li>
<li>hanya ada satu proyektor;</li>
<li>internet tidak stabil;</li>
<li>ruangan tersedia selama 120 menit.</li>
</ul>
<h3>3. Constraints</h3>
<p>Constraints adalah batasan yang harus dipatuhi.</p>
<p>Batasan dapat berupa:</p>
<ul>
<li>waktu;</li>
<li>anggaran;</li>
<li>jumlah orang;</li>
<li>kapasitas ruangan;</li>
<li>kebijakan;</li>
<li>akses alat;</li>
<li>kemampuan peserta;</li>
<li>tenggat;</li>
<li>izin.</li>
</ul>
<h3>4. Actions</h3>
<p>Actions adalah tindakan yang dapat dilakukan untuk mendekati goal.</p>
<p>Contoh:</p>
<ul>
<li>menentukan materi;</li>
<li>membuat slide;</li>
<li>menyiapkan demo;</li>
<li>membagi kelompok;</li>
<li>membuat kuis.</li>
</ul>
<h3>5. Dependencies</h3>
<p>Dependencies adalah hubungan ketergantungan antarpekerjaan.</p>
<pre><code class="language-text">Materi selesai
    ↓
Slide dapat dibuat
    ↓
Latihan disesuaikan
    ↓
Kuis disusun
</code></pre>
<h3>6. Success Criteria</h3>
<p>Success criteria menentukan kapan rencana dianggap berhasil.</p>
<p>Contoh:</p>
<ul>
<li>total durasi tepat 120 menit;</li>
<li>peserta memperoleh satu aktivitas praktik;</li>
<li>semua sesi memiliki tujuan;</li>
<li>tidak ada kebutuhan alat yang melebihi fasilitas;</li>
<li>terdapat evaluasi akhir.</li>
</ul>
<hr />
<h2>2.4 Problem Decomposition</h2>
<p><strong>Problem decomposition</strong> adalah proses memecah tugas besar menjadi bagian yang lebih kecil, lebih jelas, dan dapat dikerjakan.</p>
<pre><code class="language-text">Tugas besar:
Menyelenggarakan workshop AI

Subtugas:
1. Menentukan profil peserta.
2. Menentukan tujuan belajar.
3. Memilih materi.
4. Menentukan metode.
5. Membuat jadwal.
6. Menentukan kebutuhan fasilitas.
7. Membuat latihan.
8. Menyiapkan evaluasi.
9. Memeriksa risiko.
</code></pre>
<p>Subtugas yang baik seharusnya:</p>
<ul>
<li>memiliki tujuan yang jelas;</li>
<li>memiliki input;</li>
<li>menghasilkan output;</li>
<li>dapat dikerjakan;</li>
<li>dapat diperiksa;</li>
<li>tidak terlalu besar;</li>
<li>tidak terlalu kecil;</li>
<li>memiliki hubungan yang jelas dengan goal utama.</li>
</ul>
<h3>Subtugas Terlalu Besar</h3>
<blockquote>
<p>“Selesaikan seluruh persiapan workshop.”</p>
</blockquote>
<p>Subtugas ini masih terlalu luas.</p>
<h3>Subtugas Terlalu Kecil</h3>
<blockquote>
<p>“Tekan tombol Enter setelah menulis judul.”</p>
</blockquote>
<p>Subtugas ini terlalu detail untuk planning tingkat modul.</p>
<h3>Subtugas yang Lebih Baik</h3>
<blockquote>
<p>“Buat outline materi yang mencakup pengertian AI, contoh penggunaan, risiko, dan latihan.”</p>
</blockquote>
<hr />
<h2>2.5 Hierarchical Planning</h2>
<p>Planning dapat disusun dalam beberapa tingkat.</p>
<pre><code class="language-text">Tujuan utama
├── Persiapan materi
│   ├── Menentukan topik
│   ├── Membuat contoh
│   └── Membuat latihan
├── Persiapan teknis
│   ├── Memeriksa ruangan
│   ├── Memeriksa proyektor
│   └── Menyiapkan demo offline
└── Evaluasi
    ├── Membuat kuis
    └── Mengumpulkan feedback
</code></pre>
<p>Struktur hierarkis membantu AI dan manusia melihat hubungan antara tujuan besar dan pekerjaan kecil.</p>
<h2>2.6 Urutan dan Dependensi</h2>
<p>Perhatikan rencana berikut:</p>
<pre><code class="language-text">1. Mencetak sertifikat.
2. Menentukan nama peserta.
3. Membuka pendaftaran.
</code></pre>
<p>Urutannya salah. Nama peserta belum tersedia sebelum pendaftaran dibuka.</p>
<p>Urutan yang lebih tepat:</p>
<pre><code class="language-text">1. Membuka pendaftaran.
2. Mengumpulkan nama peserta.
3. Memverifikasi kehadiran.
4. Mencetak sertifikat.
</code></pre>
<p>Kesalahan dependensi dapat menghasilkan:</p>
<ul>
<li>pekerjaan ulang;</li>
<li>waktu terbuang;</li>
<li>data tidak akurat;</li>
<li>output yang harus dibuat ulang;</li>
<li>konflik jadwal.</li>
</ul>
<hr />
<h2>2.7 Static Planning dan Dynamic Planning</h2>
<h3>Static Planning</h3>
<p>Rencana statis dibuat di awal dan dijalankan tanpa perubahan.</p>
<pre><code class="language-text">Plan → Step 1 → Step 2 → Step 3 → Result
</code></pre>
<p>Cocok ketika:</p>
<ul>
<li>kondisi stabil;</li>
<li>data lengkap;</li>
<li>langkah sudah jelas;</li>
<li>risiko perubahan rendah;</li>
<li>tugas berulang dengan pola yang sama.</li>
</ul>
<p>Contoh:</p>
<blockquote>
<p>Mengubah ukuran 20 gambar ke dimensi yang sama menggunakan satu proses otomatis.</p>
</blockquote>
<h3>Dynamic Planning</h3>
<p>Rencana dinamis dapat diperbarui berdasarkan hasil atau informasi baru.</p>
<pre><code class="language-text">Buat rencana
    ↓
Jalankan langkah
    ↓
Amati hasil
    ↓
Apakah kondisi sesuai?
 ├── Ya → lanjut
 └── Tidak → ubah rencana
</code></pre>
<p>Contoh:</p>
<blockquote>
<p>Workshop direncanakan menggunakan demo online. Tiga puluh menit sebelum acara, internet tidak tersedia. Rencana perlu diperbarui menjadi demo offline atau simulasi berbasis tangkapan layar.</p>
</blockquote>
<p>Replanning bukan selalu tanda kegagalan. Dalam lingkungan yang berubah, replanning justru dapat menunjukkan bahwa sistem menggunakan observation untuk menyesuaikan tindakan.</p>
<hr />
<h2>2.8 Contoh Terurai — Merencanakan Workshop AI</h2>
<h3>Kondisi Awal</h3>
<pre><code class="language-text">Peserta: 50
Durasi: 120 menit
Mentor: 2
Proyektor: 1
Internet: tidak stabil
Target: peserta memahami konsep dasar AI dan mencoba satu aktivitas
</code></pre>
<h3>Goal</h3>
<p>Menyelenggarakan workshop pengenalan AI selama 120 menit untuk 50 peserta pemula, dengan penjelasan konsep, demonstrasi, aktivitas praktik, dan evaluasi.</p>
<h3>Constraints</h3>
<ul>
<li>total waktu tidak boleh melebihi 120 menit;</li>
<li>hanya tersedia satu proyektor;</li>
<li>internet tidak stabil;</li>
<li>hanya terdapat dua mentor;</li>
<li>seluruh peserta harus dapat mengikuti aktivitas.</li>
</ul>
<h3>Dekomposisi</h3>
<ol>
<li>Pembukaan dan orientasi.</li>
<li>Pengenalan konsep AI.</li>
<li>Contoh penggunaan AI.</li>
<li>Demonstrasi offline.</li>
<li>Latihan kelompok.</li>
<li>Pembahasan hasil.</li>
<li>Kuis singkat.</li>
<li>Penutup.</li>
</ol>
<h3>Jadwal</h3>
<table>
<thead>
<tr>
<th>Sesi</th>
<th style="text-align: right;">Durasi</th>
</tr>
</thead>
<tbody>
<tr>
<td>Pembukaan</td>
<td style="text-align: right;">10 menit</td>
</tr>
<tr>
<td>Konsep dasar AI</td>
<td style="text-align: right;">25 menit</td>
</tr>
<tr>
<td>Contoh dan demo</td>
<td style="text-align: right;">20 menit</td>
</tr>
<tr>
<td>Latihan kelompok</td>
<td style="text-align: right;">35 menit</td>
</tr>
<tr>
<td>Pembahasan</td>
<td style="text-align: right;">15 menit</td>
</tr>
<tr>
<td>Kuis</td>
<td style="text-align: right;">10 menit</td>
</tr>
<tr>
<td>Penutup</td>
<td style="text-align: right;">5 menit</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td style="text-align: right;"><strong>120 menit</strong></td>
</tr>
</tbody>
</table>
<h3>Dependensi</h3>
<ul>
<li>latihan harus dibuat setelah tujuan belajar ditentukan;</li>
<li>demo harus diuji sebelum acara;</li>
<li>kuis harus mengukur materi yang benar-benar disampaikan;</li>
<li>pembagian kelompok harus mempertimbangkan jumlah mentor.</li>
</ul>
<h3>Skenario Perubahan</h3>
<blockquote>
<p>Proyektor tidak dapat digunakan selama 30 menit pertama.</p>
</blockquote>
<h3>Replanning</h3>
<pre><code class="language-text">Menit 0–10:
Pembukaan tanpa proyektor.

Menit 10–30:
Diskusi contoh AI dari pengalaman peserta.

Menit 30–50:
Konsep dasar menggunakan papan tulis atau handout.

Setelah proyektor tersedia:
Demo dan materi visual dilanjutkan.
</code></pre>
<p>Rencana yang baik tidak hanya menyusun urutan ideal, tetapi juga mengenali titik yang mungkin gagal.</p>
<hr />
<h2>2.9 Planning Failure</h2>
<h3>1. Goal Terlalu Kabur</h3>
<p>Tanpa target terukur, AI tidak tahu kapan rencana selesai.</p>
<h3>2. Subtugas Tidak Lengkap</h3>
<p>Rencana melupakan evaluasi, izin, atau kebutuhan teknis.</p>
<h3>3. Dependensi Terlewat</h3>
<p>Sertifikat dicetak sebelum peserta terverifikasi.</p>
<h3>4. Batasan Tidak Diperhitungkan</h3>
<p>Total sesi menjadi 150 menit padahal ruangan hanya tersedia 120 menit.</p>
<h3>5. Rencana Terlalu Kaku</h3>
<p>Rencana tetap memaksakan demo online meskipun internet mati.</p>
<h3>6. Terlalu Banyak Langkah</h3>
<p>Rencana menjadi sangat detail hingga sulit digunakan.</p>
<h3>7. Tidak Ada Success Criteria</h3>
<p>AI tidak dapat memeriksa apakah tujuan sudah tercapai.</p>
<h3>8. Tidak Mengantisipasi Risiko</h3>
<p>Tidak ada alternatif ketika alat utama gagal.</p>
<h3>9. Tidak Memperbarui Rencana</h3>
<p>Observation baru diabaikan.</p>
<hr />
<h2>2.10 Cara Memeriksa Rencana AI</h2>
<pre><code class="language-text">□ Tujuan dapat diukur
□ Kondisi awal sudah dicatat
□ Batasan sudah dikenali
□ Subtugas mencakup seluruh kebutuhan
□ Subtugas memiliki output yang jelas
□ Urutan mengikuti dependensi
□ Total waktu dan sumber daya masuk akal
□ Risiko penting sudah dipertimbangkan
□ Rencana dapat diperbarui jika kondisi berubah
□ Kriteria selesai sudah jelas
</code></pre>
<hr />
<h2>2.11 Kapan Planning Diperlukan?</h2>
<p>Planning diperlukan ketika:</p>
<ul>
<li>tugas terdiri atas banyak langkah;</li>
<li>terdapat dependensi;</li>
<li>terdapat batasan waktu atau sumber daya;</li>
<li>hasil membutuhkan koordinasi;</li>
<li>tugas dapat berubah berdasarkan observation;</li>
<li>kegagalan satu langkah memengaruhi langkah lain.</li>
</ul>
<p>Planning sederhana atau eksplisit tidak selalu diperlukan untuk:</p>
<ul>
<li>jawaban fakta satu langkah;</li>
<li>formatting teks;</li>
<li>koreksi typo;</li>
<li>operasi yang sangat kecil dan langsung.</li>
</ul>
<hr />
<h2>2.12 Ringkasan Submateri</h2>
<ul>
<li>Planning mengubah tujuan menjadi urutan tindakan.</li>
<li>Goal, initial state, constraints, actions, dependencies, dan success criteria adalah komponen utama rencana.</li>
<li>Problem decomposition memecah tugas besar menjadi subtugas yang dapat dikerjakan.</li>
<li>Urutan harus mengikuti dependensi.</li>
<li>Static plan cocok untuk kondisi stabil.</li>
<li>Dynamic plan cocok untuk kondisi yang dapat berubah.</li>
<li>Rencana AI tetap harus diperiksa dari sisi kelengkapan, kelayakan, risiko, dan batasan.</li>
</ul>
<hr />

````
