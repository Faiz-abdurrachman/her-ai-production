# Submateri 4 — Tool Use: Ketika AI Membutuhkan Alat Eksternal

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/05-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Submateri 4 — Tool Use: Ketika AI Membutuhkan Alat Eksternal

#### 4.1 Pembuka: Model Tidak Memiliki Semua Data dan Kemampuan

Pengguna dapat meminta AI:

-   mengetahui cuaca hari ini;
-   membaca spreadsheet;
-   menghitung statistik ribuan data;
-   memeriksa isi dokumen;
-   mencari slot kalender;
-   menjalankan kode;
-   mengirim email.

Sebagian tugas tersebut tidak dapat diselesaikan secara andal hanya dengan menghasilkan teks dari parameter model.

**Tool use** memungkinkan sistem AI menggunakan alat atau layanan eksternal, menerima hasilnya, lalu menggunakan hasil tersebut untuk melanjutkan tugas.

Toolformer mempelajari kapan tool perlu dipanggil, tool apa yang digunakan, argumen apa yang diberikan, dan bagaimana hasil tool dimasukkan ke generasi berikutnya [4]. ReAct menggabungkan reasoning dan tindakan secara bergantian sehingga hasil tindakan dapat memengaruhi rencana berikutnya [5].

* * * * *

#### 4.2 Mengapa AI Membutuhkan Tool?

##### A. Informasi Tidak Selalu Terbaru

Model mungkin tidak memiliki:

-   cuaca hari ini;
-   harga saat ini;
-   jadwal terbaru;
-   berita terbaru;
-   status server;
-   stok produk.

Informasi semacam itu memerlukan sumber aktual.

##### B. Perhitungan Tidak Selalu Presisi

LLM dapat salah dalam:

-   aritmetika panjang;
-   statistik;
-   pengolahan ribuan data;
-   konversi berulang;
-   agregasi tabel.

Kalkulator, spreadsheet, atau Python lebih tepat untuk eksekusi deterministik.

##### C. Data Pengguna Tidak Ada dalam Prompt

AI memerlukan tool untuk mengakses:

-   file;
-   spreadsheet;
-   email;
-   kalender;
-   database;
-   dokumen organisasi.

##### D. Tindakan Tidak Dapat Dilakukan Hanya dengan Teks

Mengatakan “email sudah dikirim” berbeda dari benar-benar memanggil layanan email.

Tool diperlukan untuk:

-   membuat agenda;
-   mengirim email;
-   menyimpan file;
-   memperbarui data;
-   menjalankan kode;
-   mengambil informasi dari aplikasi lain.

* * * * *

#### 4.3 Jenis-Jenis Tool

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Kebutuhan
Tool
Contoh Output</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Perhitungan
Calculator
Hasil aritmetika</td>
<td align="left">Analisis data
Python
Statistik dan transformasi</td>
<td align="left">Data tabel
Spreadsheet
Filter, rata-rata, agregasi</td>
</tr>
</tbody>
</table>

* * * * *

#### 4.4 Siklus Tool Use

    REASON
    Memahami kebutuhan
       ↓
    PLAN
    Menentukan data dan tool
       ↓
    ACT
    Memanggil tool
       ↓
    OBSERVE
    Membaca hasil
       ↓
    VALIDATE
    Memeriksa hasil
       ↓
    UPDATE
    Mengubah rencana jika perlu
       ↓
    ANSWER
    Menyampaikan hasil

##### Reason

AI menentukan apakah informasi di dalam prompt sudah cukup.

##### Plan

AI menentukan data apa yang dibutuhkan dan tool apa yang paling sesuai.

##### Act

AI menyiapkan tool call beserta parameter.

##### Observe

Tool mengembalikan hasil atau error.

##### Validate

AI memeriksa kelengkapan, format, satuan, dan konsistensi.

##### Update

Rencana diperbarui jika hasil belum cukup atau tool gagal.

##### Answer

AI menyampaikan hasil berdasarkan observation yang benar-benar diterima.

* * * * *

#### 4.5 Memilih Tool

Gunakan pertanyaan berikut:

1.  Apa tujuan tugas?
2.  Data apa yang dibutuhkan?
3.  Apakah data sudah tersedia dalam prompt?
4.  Apakah data dapat berubah?
5.  Apakah tugas membutuhkan presisi?
6.  Tool mana yang paling sesuai?
7.  Apakah pengguna memberikan izin?
8.  Apa dampak tindakan tool?

##### Contoh Pemilihan Buruk

    Tugas:
    Menghitung rata-rata 10.000 nilai.

    Pilihan buruk:
    Menghitung melalui generasi teks satu per satu.

##### Pilihan Lebih Baik

    Gunakan spreadsheet atau Python untuk:
    - membaca kolom;
    - membersihkan data;
    - menghitung jumlah data valid;
    - menghitung rata-rata.

* * * * *

#### 4.6 Tool Call dan Parameter

Tool call biasanya memiliki:

-   nama tool;
-   parameter;
-   format input;
-   batasan;
-   output.

##### Contoh Kalkulator

    Tool:
    calculator

    Input:
    (80 × 27500) + 350000

    Output:
    2550000

##### Contoh Kalender

    Tool:
    calendar.search

    Input:
    - tanggal mulai;
    - tanggal akhir;
    - durasi dua jam;
    - zona waktu;
    - kalender yang diperiksa.

    Output:
    daftar slot kosong

Parameter yang salah dapat menghasilkan output yang salah meskipun tool bekerja dengan benar.

Contoh:

-   tanggal salah;
-   zona waktu salah;
-   kolom spreadsheet salah;
-   satuan meter dibaca kilometer;
-   filter data tidak lengkap.

* * * * *

#### 4.7 Observation

**Observation** adalah hasil yang dikembalikan tool kepada AI.

Observation dapat berupa:

-   data;
-   daftar hasil;
-   nilai numerik;
-   file;
-   status berhasil;
-   status gagal;
-   permission denied;
-   data kosong;
-   format tidak dikenal.

##### Contoh Observation yang Tidak Sesuai Harapan

    Tool result:
    File tidak memiliki kolom “nilai akhir”.

AI tidak boleh mengarang rata-rata.

Respons yang lebih tepat:

> “Kolom ‘nilai akhir’ tidak ditemukan. File memiliki kolom ‘nilai tugas’ dan ‘nilai kuis’. Saya perlu mengetahui kolom mana yang ingin digunakan.”

* * * * *

#### 4.8 Contoh Terurai 1 — Spreadsheet

##### Tugas

> Hitung rata-rata nilai peserta dari spreadsheet.

##### Reason

Data nilai berada di file, bukan di prompt.

##### Plan

1.  Buka file.
2.  Temukan sheet yang relevan.
3.  Identifikasi kolom nilai.
4.  Periksa data kosong.
5.  Periksa nilai nonnumerik.
6.  Hitung jumlah data valid.
7.  Hitung rata-rata.
8.  Laporkan data yang tidak digunakan.

##### Observation

    Jumlah baris: 50
    Nilai valid: 47
    Nilai kosong: 2
    Nilai tidak valid: 1
    Rata-rata nilai valid: 82,4

##### Jawaban

> “Dari 50 baris data, terdapat 47 nilai valid. Rata-rata nilai valid adalah 82,4. Dua nilai kosong dan satu nilai tidak valid tidak dimasukkan dalam perhitungan.”

Jawaban ini lebih baik daripada hanya menyebut “82,4” karena menjelaskan kualitas data.

* * * * *

#### 4.9 Contoh Terurai 2 — Informasi Terbaru

##### Tugas

> “Bagaimana cuaca hari ini?”

AI memerlukan:

-   lokasi;
-   tanggal;
-   sumber cuaca aktual;
-   satuan yang sesuai.

Jika lokasi tidak diketahui, AI tidak boleh menebak.

Alur:

    Reason:
    Informasi cuaca berubah dan membutuhkan lokasi.

    Plan:
    1. Dapatkan lokasi.
    2. Panggil weather tool.
    3. Baca kondisi dan waktu data.
    4. Sampaikan hasil.

    Act:
    Panggil weather tool.

    Observe:
    Data cuaca aktual.

    Answer:
    Sampaikan suhu, kondisi, dan waktu pembaruan.

* * * * *

#### 4.10 Contoh Terurai 3 — Kalender

##### Tugas

> “Cari waktu rapat dua jam minggu depan.”

AI perlu:

1.  menentukan tanggal “minggu depan” berdasarkan zona waktu;
2.  membaca kalender;
3.  menemukan slot dua jam;
4.  menghindari konflik;
5.  menampilkan satu atau beberapa alternatif.

Perlu membedakan:

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Read Action
Write Action</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Melihat jadwal
Membuat event</td>
<td align="left">Mencari slot kosong
Mengubah waktu rapat</td>
</tr>
</tbody>
</table>

Jika pengguna hanya meminta rekomendasi, AI tidak boleh langsung membuat event tanpa izin.

* * * * *

#### 4.11 Permission dan Otorisasi

##### Low Impact

-   menggunakan kalkulator;
-   mencari informasi publik;
-   membaca data yang diberikan dalam prompt.

##### Medium Impact

-   membaca kalender;
-   membaca dokumen pribadi;
-   membuat draft email;
-   menganalisis file pengguna.

##### High Impact

-   mengirim email;
-   menghapus data;
-   melakukan transaksi;
-   mengubah jadwal;
-   memublikasikan informasi;
-   mengubah konfigurasi sistem.

> **Prinsip:** Semakin besar dampak tindakan, semakin penting persetujuan, konfirmasi, dan batas otorisasi.

* * * * *

#### 4.12 Tool Errors

##### 1. Tool Tidak Tersedia

AI harus menjelaskan keterbatasan, bukan berpura-pura telah menggunakan tool.

##### 2. Parameter Salah

AI harus memperbaiki input atau meminta informasi.

##### 3. Data Kosong

AI harus menyatakan bahwa data tidak ditemukan.

##### 4. Format Berubah

AI perlu mengenali struktur baru sebelum memproses.

##### 5. Network Error

AI tidak boleh menyatakan tindakan berhasil.

##### 6. Permission Denied

AI harus menyebut akses ditolak.

##### 7. Data Kedaluwarsa

AI perlu memeriksa waktu pembaruan.

##### 8. Hasil Ambigu

AI perlu membandingkan atau meminta klarifikasi.

##### 9. Salah Membaca Output

Kesalahan dapat terjadi setelah tool memberikan data benar.

##### 10. Menjawab Seolah Tool Berhasil

Ini adalah kegagalan serius karena jawaban tidak sesuai observation.

###### Contoh

    Tool error:
    Permission denied.

Respons salah:

> “Email berhasil dikirim.”

Respons benar:

> “Email belum terkirim karena akses pengiriman ditolak.”

* * * * *

#### 4.13 Output Tool Bukan Kebenaran Mutlak

Tool dapat memiliki:

-   input salah;
-   data lama;
-   bug;
-   hasil parsial;
-   unit berbeda;
-   izin terbatas;
-   sumber yang kurang tepercaya.

Gunakan checklist:

    □ Tool sesuai dengan tugas
    □ Parameter benar
    □ Rentang data benar
    □ Zona waktu benar
    □ Satuan konsisten
    □ Output lengkap
    □ Tidak ada error tersembunyi
    □ Data masih aktual
    □ Hasil sesuai dengan tujuan
    □ Tindakan memiliki izin

* * * * *

#### 4.14 Kapan Tool Diperlukan?

Gunakan tool ketika:

-   informasi berubah dari waktu ke waktu;
-   data tidak tersedia di konteks;
-   perhitungan membutuhkan presisi;
-   jumlah data besar;
-   tugas membutuhkan eksekusi;
-   pengguna meminta akses ke aplikasi atau file;
-   hasil perlu diverifikasi dengan sistem eksternal.

Tool tidak selalu diperlukan ketika:

-   informasi sudah tersedia;
-   tugas hanya meminta penulisan ulang;
-   pertanyaan konseptual stabil;
-   tugas sederhana dapat diselesaikan langsung;
-   penggunaan tool tidak menambah akurasi.

* * * * *

#### 4.15 Ringkasan Submateri

-   Tool use memperluas kemampuan AI di luar generasi teks.
-   AI harus menentukan apakah tool benar-benar diperlukan.
-   Pemilihan tool dan parameter sama pentingnya dengan kemampuan tool.
-   Observation harus dibaca dan divalidasi.
-   Tool dapat gagal dan output tool juga dapat salah.
-   Read action dan write action memiliki tingkat dampak berbeda.
-   Tindakan berdampak tinggi memerlukan izin dan kontrol lebih kuat.
-   Jawaban AI harus sesuai dengan hasil tool yang benar-benar diterima.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Submateri 4 — Tool Use: Ketika AI Membutuhkan Alat Eksternal</h1>
<h2>4.1 Pembuka: Model Tidak Memiliki Semua Data dan Kemampuan</h2>
<p>Pengguna dapat meminta AI:</p>
<ul>
<li>mengetahui cuaca hari ini;</li>
<li>membaca spreadsheet;</li>
<li>menghitung statistik ribuan data;</li>
<li>memeriksa isi dokumen;</li>
<li>mencari slot kalender;</li>
<li>menjalankan kode;</li>
<li>mengirim email.</li>
</ul>
<p>Sebagian tugas tersebut tidak dapat diselesaikan secara andal hanya dengan menghasilkan teks dari parameter model.</p>
<p><strong>Tool use</strong> memungkinkan sistem AI menggunakan alat atau layanan eksternal, menerima hasilnya, lalu menggunakan hasil tersebut untuk melanjutkan tugas.</p>
<p>Toolformer mempelajari kapan tool perlu dipanggil, tool apa yang digunakan, argumen apa yang diberikan, dan bagaimana hasil tool dimasukkan ke generasi berikutnya [4]. ReAct menggabungkan reasoning dan tindakan secara bergantian sehingga hasil tindakan dapat memengaruhi rencana berikutnya [5].</p>
<hr />
<h2>4.2 Mengapa AI Membutuhkan Tool?</h2>
<h3>A. Informasi Tidak Selalu Terbaru</h3>
<p>Model mungkin tidak memiliki:</p>
<ul>
<li>cuaca hari ini;</li>
<li>harga saat ini;</li>
<li>jadwal terbaru;</li>
<li>berita terbaru;</li>
<li>status server;</li>
<li>stok produk.</li>
</ul>
<p>Informasi semacam itu memerlukan sumber aktual.</p>
<h3>B. Perhitungan Tidak Selalu Presisi</h3>
<p>LLM dapat salah dalam:</p>
<ul>
<li>aritmetika panjang;</li>
<li>statistik;</li>
<li>pengolahan ribuan data;</li>
<li>konversi berulang;</li>
<li>agregasi tabel.</li>
</ul>
<p>Kalkulator, spreadsheet, atau Python lebih tepat untuk eksekusi deterministik.</p>
<h3>C. Data Pengguna Tidak Ada dalam Prompt</h3>
<p>AI memerlukan tool untuk mengakses:</p>
<ul>
<li>file;</li>
<li>spreadsheet;</li>
<li>email;</li>
<li>kalender;</li>
<li>database;</li>
<li>dokumen organisasi.</li>
</ul>
<h3>D. Tindakan Tidak Dapat Dilakukan Hanya dengan Teks</h3>
<p>Mengatakan “email sudah dikirim” berbeda dari benar-benar memanggil layanan email.</p>
<p>Tool diperlukan untuk:</p>
<ul>
<li>membuat agenda;</li>
<li>mengirim email;</li>
<li>menyimpan file;</li>
<li>memperbarui data;</li>
<li>menjalankan kode;</li>
<li>mengambil informasi dari aplikasi lain.</li>
</ul>
<hr />
<h2>4.3 Jenis-Jenis Tool</h2>
<table>
<thead>
<tr>
<th>Kebutuhan</th>
<th>Tool</th>
<th>Contoh Output</th>
</tr>
</thead>
<tbody>
<tr>
<td>Perhitungan</td>
<td>Calculator</td>
<td>Hasil aritmetika</td>
</tr>
<tr>
<td>Analisis data</td>
<td>Python</td>
<td>Statistik dan transformasi</td>
</tr>
<tr>
<td>Data tabel</td>
<td>Spreadsheet</td>
<td>Filter, rata-rata, agregasi</td>
</tr>
<tr>
<td>Informasi terbaru</td>
<td>Web search atau API</td>
<td>Cuaca, berita, harga</td>
</tr>
<tr>
<td>Dokumen</td>
<td>File retrieval</td>
<td>Isi panduan atau laporan</td>
</tr>
<tr>
<td>Jadwal</td>
<td>Calendar</td>
<td>Slot waktu</td>
</tr>
<tr>
<td>Komunikasi</td>
<td>Email</td>
<td>Draft atau pesan terkirim</td>
</tr>
<tr>
<td>Lokasi</td>
<td>Maps</td>
<td>Rute dan jarak</td>
</tr>
<tr>
<td>Data aplikasi</td>
<td>Database atau API</td>
<td>Profil, transaksi, status</td>
</tr>
</tbody>
</table>
<hr />
<h2>4.4 Siklus Tool Use</h2>
<pre><code class="language-text">REASON
Memahami kebutuhan
   ↓
PLAN
Menentukan data dan tool
   ↓
ACT
Memanggil tool
   ↓
OBSERVE
Membaca hasil
   ↓
VALIDATE
Memeriksa hasil
   ↓
UPDATE
Mengubah rencana jika perlu
   ↓
ANSWER
Menyampaikan hasil
</code></pre>
<h3>Reason</h3>
<p>AI menentukan apakah informasi di dalam prompt sudah cukup.</p>
<h3>Plan</h3>
<p>AI menentukan data apa yang dibutuhkan dan tool apa yang paling sesuai.</p>
<h3>Act</h3>
<p>AI menyiapkan tool call beserta parameter.</p>
<h3>Observe</h3>
<p>Tool mengembalikan hasil atau error.</p>
<h3>Validate</h3>
<p>AI memeriksa kelengkapan, format, satuan, dan konsistensi.</p>
<h3>Update</h3>
<p>Rencana diperbarui jika hasil belum cukup atau tool gagal.</p>
<h3>Answer</h3>
<p>AI menyampaikan hasil berdasarkan observation yang benar-benar diterima.</p>
<hr />
<h2>4.5 Memilih Tool</h2>
<p>Gunakan pertanyaan berikut:</p>
<ol>
<li>Apa tujuan tugas?</li>
<li>Data apa yang dibutuhkan?</li>
<li>Apakah data sudah tersedia dalam prompt?</li>
<li>Apakah data dapat berubah?</li>
<li>Apakah tugas membutuhkan presisi?</li>
<li>Tool mana yang paling sesuai?</li>
<li>Apakah pengguna memberikan izin?</li>
<li>Apa dampak tindakan tool?</li>
</ol>
<h3>Contoh Pemilihan Buruk</h3>
<pre><code class="language-text">Tugas:
Menghitung rata-rata 10.000 nilai.

Pilihan buruk:
Menghitung melalui generasi teks satu per satu.
</code></pre>
<h3>Pilihan Lebih Baik</h3>
<pre><code class="language-text">Gunakan spreadsheet atau Python untuk:
- membaca kolom;
- membersihkan data;
- menghitung jumlah data valid;
- menghitung rata-rata.
</code></pre>
<hr />
<h2>4.6 Tool Call dan Parameter</h2>
<p>Tool call biasanya memiliki:</p>
<ul>
<li>nama tool;</li>
<li>parameter;</li>
<li>format input;</li>
<li>batasan;</li>
<li>output.</li>
</ul>
<h3>Contoh Kalkulator</h3>
<pre><code class="language-text">Tool:
calculator

Input:
(80 × 27500) + 350000

Output:
2550000
</code></pre>
<h3>Contoh Kalender</h3>
<pre><code class="language-text">Tool:
calendar.search

Input:
- tanggal mulai;
- tanggal akhir;
- durasi dua jam;
- zona waktu;
- kalender yang diperiksa.

Output:
daftar slot kosong
</code></pre>
<p>Parameter yang salah dapat menghasilkan output yang salah meskipun tool bekerja dengan benar.</p>
<p>Contoh:</p>
<ul>
<li>tanggal salah;</li>
<li>zona waktu salah;</li>
<li>kolom spreadsheet salah;</li>
<li>satuan meter dibaca kilometer;</li>
<li>filter data tidak lengkap.</li>
</ul>
<hr />
<h2>4.7 Observation</h2>
<p><strong>Observation</strong> adalah hasil yang dikembalikan tool kepada AI.</p>
<p>Observation dapat berupa:</p>
<ul>
<li>data;</li>
<li>daftar hasil;</li>
<li>nilai numerik;</li>
<li>file;</li>
<li>status berhasil;</li>
<li>status gagal;</li>
<li>permission denied;</li>
<li>data kosong;</li>
<li>format tidak dikenal.</li>
</ul>
<h3>Contoh Observation yang Tidak Sesuai Harapan</h3>
<pre><code class="language-text">Tool result:
File tidak memiliki kolom “nilai akhir”.
</code></pre>
<p>AI tidak boleh mengarang rata-rata.</p>
<p>Respons yang lebih tepat:</p>
<blockquote>
<p>“Kolom ‘nilai akhir’ tidak ditemukan. File memiliki kolom ‘nilai tugas’ dan ‘nilai kuis’. Saya perlu mengetahui kolom mana yang ingin digunakan.”</p>
</blockquote>
<hr />
<h2>4.8 Contoh Terurai 1 — Spreadsheet</h2>
<h3>Tugas</h3>
<blockquote>
<p>Hitung rata-rata nilai peserta dari spreadsheet.</p>
</blockquote>
<h3>Reason</h3>
<p>Data nilai berada di file, bukan di prompt.</p>
<h3>Plan</h3>
<ol>
<li>Buka file.</li>
<li>Temukan sheet yang relevan.</li>
<li>Identifikasi kolom nilai.</li>
<li>Periksa data kosong.</li>
<li>Periksa nilai nonnumerik.</li>
<li>Hitung jumlah data valid.</li>
<li>Hitung rata-rata.</li>
<li>Laporkan data yang tidak digunakan.</li>
</ol>
<h3>Observation</h3>
<pre><code class="language-text">Jumlah baris: 50
Nilai valid: 47
Nilai kosong: 2
Nilai tidak valid: 1
Rata-rata nilai valid: 82,4
</code></pre>
<h3>Jawaban</h3>
<blockquote>
<p>“Dari 50 baris data, terdapat 47 nilai valid. Rata-rata nilai valid adalah 82,4. Dua nilai kosong dan satu nilai tidak valid tidak dimasukkan dalam perhitungan.”</p>
</blockquote>
<p>Jawaban ini lebih baik daripada hanya menyebut “82,4” karena menjelaskan kualitas data.</p>
<hr />
<h2>4.9 Contoh Terurai 2 — Informasi Terbaru</h2>
<h3>Tugas</h3>
<blockquote>
<p>“Bagaimana cuaca hari ini?”</p>
</blockquote>
<p>AI memerlukan:</p>
<ul>
<li>lokasi;</li>
<li>tanggal;</li>
<li>sumber cuaca aktual;</li>
<li>satuan yang sesuai.</li>
</ul>
<p>Jika lokasi tidak diketahui, AI tidak boleh menebak.</p>
<p>Alur:</p>
<pre><code class="language-text">Reason:
Informasi cuaca berubah dan membutuhkan lokasi.

Plan:
1. Dapatkan lokasi.
2. Panggil weather tool.
3. Baca kondisi dan waktu data.
4. Sampaikan hasil.

Act:
Panggil weather tool.

Observe:
Data cuaca aktual.

Answer:
Sampaikan suhu, kondisi, dan waktu pembaruan.
</code></pre>
<hr />
<h2>4.10 Contoh Terurai 3 — Kalender</h2>
<h3>Tugas</h3>
<blockquote>
<p>“Cari waktu rapat dua jam minggu depan.”</p>
</blockquote>
<p>AI perlu:</p>
<ol>
<li>menentukan tanggal “minggu depan” berdasarkan zona waktu;</li>
<li>membaca kalender;</li>
<li>menemukan slot dua jam;</li>
<li>menghindari konflik;</li>
<li>menampilkan satu atau beberapa alternatif.</li>
</ol>
<p>Perlu membedakan:</p>
<table>
<thead>
<tr>
<th>Read Action</th>
<th>Write Action</th>
</tr>
</thead>
<tbody>
<tr>
<td>Melihat jadwal</td>
<td>Membuat event</td>
</tr>
<tr>
<td>Mencari slot kosong</td>
<td>Mengubah waktu rapat</td>
</tr>
<tr>
<td>Membaca detail agenda</td>
<td>Menghapus agenda</td>
</tr>
</tbody>
</table>
<p>Jika pengguna hanya meminta rekomendasi, AI tidak boleh langsung membuat event tanpa izin.</p>
<hr />
<h2>4.11 Permission dan Otorisasi</h2>
<h3>Low Impact</h3>
<ul>
<li>menggunakan kalkulator;</li>
<li>mencari informasi publik;</li>
<li>membaca data yang diberikan dalam prompt.</li>
</ul>
<h3>Medium Impact</h3>
<ul>
<li>membaca kalender;</li>
<li>membaca dokumen pribadi;</li>
<li>membuat draft email;</li>
<li>menganalisis file pengguna.</li>
</ul>
<h3>High Impact</h3>
<ul>
<li>mengirim email;</li>
<li>menghapus data;</li>
<li>melakukan transaksi;</li>
<li>mengubah jadwal;</li>
<li>memublikasikan informasi;</li>
<li>mengubah konfigurasi sistem.</li>
</ul>
<blockquote>
<p><strong>Prinsip:</strong> Semakin besar dampak tindakan, semakin penting persetujuan, konfirmasi, dan batas otorisasi.</p>
</blockquote>
<hr />
<h2>4.12 Tool Errors</h2>
<h3>1. Tool Tidak Tersedia</h3>
<p>AI harus menjelaskan keterbatasan, bukan berpura-pura telah menggunakan tool.</p>
<h3>2. Parameter Salah</h3>
<p>AI harus memperbaiki input atau meminta informasi.</p>
<h3>3. Data Kosong</h3>
<p>AI harus menyatakan bahwa data tidak ditemukan.</p>
<h3>4. Format Berubah</h3>
<p>AI perlu mengenali struktur baru sebelum memproses.</p>
<h3>5. Network Error</h3>
<p>AI tidak boleh menyatakan tindakan berhasil.</p>
<h3>6. Permission Denied</h3>
<p>AI harus menyebut akses ditolak.</p>
<h3>7. Data Kedaluwarsa</h3>
<p>AI perlu memeriksa waktu pembaruan.</p>
<h3>8. Hasil Ambigu</h3>
<p>AI perlu membandingkan atau meminta klarifikasi.</p>
<h3>9. Salah Membaca Output</h3>
<p>Kesalahan dapat terjadi setelah tool memberikan data benar.</p>
<h3>10. Menjawab Seolah Tool Berhasil</h3>
<p>Ini adalah kegagalan serius karena jawaban tidak sesuai observation.</p>
<h4>Contoh</h4>
<pre><code class="language-text">Tool error:
Permission denied.
</code></pre>
<p>Respons salah:</p>
<blockquote>
<p>“Email berhasil dikirim.”</p>
</blockquote>
<p>Respons benar:</p>
<blockquote>
<p>“Email belum terkirim karena akses pengiriman ditolak.”</p>
</blockquote>
<hr />
<h2>4.13 Output Tool Bukan Kebenaran Mutlak</h2>
<p>Tool dapat memiliki:</p>
<ul>
<li>input salah;</li>
<li>data lama;</li>
<li>bug;</li>
<li>hasil parsial;</li>
<li>unit berbeda;</li>
<li>izin terbatas;</li>
<li>sumber yang kurang tepercaya.</li>
</ul>
<p>Gunakan checklist:</p>
<pre><code class="language-text">□ Tool sesuai dengan tugas
□ Parameter benar
□ Rentang data benar
□ Zona waktu benar
□ Satuan konsisten
□ Output lengkap
□ Tidak ada error tersembunyi
□ Data masih aktual
□ Hasil sesuai dengan tujuan
□ Tindakan memiliki izin
</code></pre>
<hr />
<h2>4.14 Kapan Tool Diperlukan?</h2>
<p>Gunakan tool ketika:</p>
<ul>
<li>informasi berubah dari waktu ke waktu;</li>
<li>data tidak tersedia di konteks;</li>
<li>perhitungan membutuhkan presisi;</li>
<li>jumlah data besar;</li>
<li>tugas membutuhkan eksekusi;</li>
<li>pengguna meminta akses ke aplikasi atau file;</li>
<li>hasil perlu diverifikasi dengan sistem eksternal.</li>
</ul>
<p>Tool tidak selalu diperlukan ketika:</p>
<ul>
<li>informasi sudah tersedia;</li>
<li>tugas hanya meminta penulisan ulang;</li>
<li>pertanyaan konseptual stabil;</li>
<li>tugas sederhana dapat diselesaikan langsung;</li>
<li>penggunaan tool tidak menambah akurasi.</li>
</ul>
<hr />
<h2>4.15 Ringkasan Submateri</h2>
<ul>
<li>Tool use memperluas kemampuan AI di luar generasi teks.</li>
<li>AI harus menentukan apakah tool benar-benar diperlukan.</li>
<li>Pemilihan tool dan parameter sama pentingnya dengan kemampuan tool.</li>
<li>Observation harus dibaca dan divalidasi.</li>
<li>Tool dapat gagal dan output tool juga dapat salah.</li>
<li>Read action dan write action memiliki tingkat dampak berbeda.</li>
<li>Tindakan berdampak tinggi memerlukan izin dan kontrol lebih kuat.</li>
<li>Jawaban AI harus sesuai dengan hasil tool yang benar-benar diterima.</li>
</ul>
<hr />

````
