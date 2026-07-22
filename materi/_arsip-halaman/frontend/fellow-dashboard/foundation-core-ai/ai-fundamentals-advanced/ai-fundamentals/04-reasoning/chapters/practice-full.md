# 1.11 Latihan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/practice-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

#### 1.11 Latihan

##### Latihan 1 — Fakta atau Asumsi?

Kasus:

> Sebuah kelas memiliki 40 peserta. Biaya modul Rp20.000 per orang. Panitia menyiapkan anggaran Rp1.000.000. AI menghitung seluruh peserta memperoleh satu modul.

Klasifikasikan pernyataan berikut:

1.  Peserta berjumlah 40 orang.
2.  Biaya modul Rp20.000 per orang.
3.  Semua peserta memperoleh satu modul.
4.  Total biaya modul Rp800.000.
5.  Anggaran cukup.

###### Pembahasan

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Pernyataan
Kategori</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Peserta berjumlah 40 orang
Fakta</td>
<td align="left">Biaya modul Rp20.000 per orang
Fakta</td>
</tr>
</tbody>
</table>

##### Latihan 2 — Urutkan Langkah

Urutkan langkah berikut:

-   bandingkan total kebutuhan dengan anggaran;
-   hitung sisa anggaran;
-   identifikasi jumlah peserta;
-   hitung total konsumsi;
-   identifikasi harga per peserta.

###### Pembahasan

    1. Identifikasi jumlah peserta.
    2. Identifikasi harga per peserta.
    3. Hitung total konsumsi.
    4. Bandingkan total kebutuhan dengan anggaran.
    5. Hitung sisa anggaran.

##### Latihan 3 — Temukan Kesalahan

Jawaban AI:

> “Untuk 50 peserta dengan harga Rp25.000 per orang dan biaya sewa Rp400.000, total kebutuhannya adalah Rp1.250.000. Anggaran Rp1.500.000 berarti tersisa Rp250.000.”

###### Pembahasan

AI melupakan biaya sewa.

    Konsumsi:
    50 × Rp25.000 = Rp1.250.000

    Total:
    Rp1.250.000 + Rp400.000 = Rp1.650.000

    Kekurangan:
    Rp1.650.000 − Rp1.500.000 = Rp150.000

##### Latihan 4 — Prioritas Nonnumerik

Urutkan pekerjaan berikut:

-   memperbaiki tombol pembayaran yang gagal;
-   mengubah warna kartu;
-   menambah ilustrasi kosong.

###### Pembahasan

Tombol pembayaran harus diprioritaskan karena memengaruhi fungsi dan transaksi utama. Perubahan visual dapat dikerjakan setelah fungsi kritis stabil.

* * * * *

#### 2.13 Latihan

##### Latihan 1 — Pecah Tujuan

Tugas:

> Buat program mentoring AI selama empat minggu untuk peserta pemula.

Buat 6–10 subtugas.

###### Contoh Pembahasan

1.  Mengidentifikasi kemampuan awal peserta.
2.  Menentukan tujuan empat minggu.
3.  Membagi materi per minggu.
4.  Menentukan mentor.
5.  Menyiapkan contoh dan latihan.
6.  Menentukan jadwal.
7.  Menyiapkan kanal diskusi.
8.  Membuat evaluasi mingguan.
9.  Membuat proyek akhir.
10. Mengumpulkan feedback.

##### Latihan 2 — Temukan Dependensi

Urutkan:

-   melakukan evaluasi akhir;
-   menetapkan tujuan belajar;
-   membuat latihan;
-   memilih materi;
-   menjalankan sesi.

###### Pembahasan

    1. Menetapkan tujuan belajar.
    2. Memilih materi.
    3. Membuat latihan.
    4. Menjalankan sesi.
    5. Melakukan evaluasi akhir.

##### Latihan 3 — Replanning

Rencana awal menggunakan laboratorium komputer. Pada hari pelaksanaan, setengah komputer tidak dapat digunakan.

###### Contoh Pembahasan

-   ubah latihan menjadi berpasangan;
-   prioritaskan aktivitas yang dapat dijalankan melalui browser;
-   siapkan demonstrasi terpusat;
-   kurangi aktivitas yang membutuhkan satu perangkat per peserta;
-   pertahankan tujuan belajar, tetapi ubah metode.

##### Latihan 4 — Evaluasi Rencana

Sebuah workshop memiliki durasi 90 menit, tetapi rencana AI berisi:

-   pembukaan 15 menit;
-   materi 35 menit;
-   demo 25 menit;
-   latihan 30 menit;
-   kuis 15 menit.

###### Pembahasan

Total rencana adalah 120 menit. Rencana melanggar batas waktu dan harus dipangkas atau disusun ulang.

* * * * *

#### 3.14 Latihan

##### Latihan 1 — Ubah Prompt

Prompt awal:

> “Hitung biaya acara ini.”

###### Contoh Perbaikan

> “Identifikasi jumlah peserta, biaya per peserta, biaya tambahan, dan anggaran. Hitung total kebutuhan, bandingkan dengan anggaran, periksa perhitungan, lalu berikan kesimpulan.”

##### Latihan 2 — Temukan Kesalahan

    Peserta: 45
    Biaya: Rp30.000
    Total menurut AI: Rp1.250.000

###### Pembahasan

    45 × Rp30.000 = Rp1.350.000

##### Latihan 3 — Kurangi Penjelasan Berlebihan

Tugas peserta: ringkas penjelasan 10 paragraf menjadi:

1.  data;
2.  tiga langkah utama;
3.  hasil;
4.  satu catatan asumsi.

##### Latihan 4 — Perlu CoT atau Tidak?

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Tugas
CoT?
Alasan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Memperbaiki typo “algoritm”
Tidak
Satu langkah</td>
<td align="left">Membandingkan dua rencana anggaran
Ya
Banyak kriteria</td>
<td align="left">Menerjemahkan “good morning”
Tidak
Tugas sederhana</td>
</tr>
</tbody>
</table>

* * * * *

#### 4.16 Latihan

##### Latihan 1 — Pilih Tool

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Tugas
Tool</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Menghitung 287 × 9.451
Kalkulator</td>
<td align="left">Menganalisis 10.000 baris data
Spreadsheet atau Python</td>
</tr>
</tbody>
</table>

##### Latihan 2 — Tentukan Parameter

Tugas:

> Cari slot rapat dua jam minggu depan.

Parameter yang perlu ditentukan:

-   tanggal mulai;
-   tanggal akhir;
-   zona waktu;
-   durasi;
-   kalender;
-   jam kerja;
-   peserta yang perlu diperiksa.

##### Latihan 3 — Baca Observation

    Jumlah baris: 100
    Nilai valid: 0
    Error: kolom “score” berisi teks

###### Pembahasan

AI tidak boleh menghitung rata-rata. AI harus menjelaskan bahwa kolom tidak berisi nilai numerik dan meminta kolom alternatif atau perbaikan data.

##### Latihan 4 — Permission Check

Klasifikasikan:

-   membaca kalender sendiri;
-   membuat draft email;
-   mengirim email;
-   menghapus agenda;
-   menjalankan kalkulator.

Tindakan mengirim email dan menghapus agenda memiliki dampak lebih tinggi daripada sekadar membaca atau membuat draft.

##### Latihan 5 — Perbaiki Tool Loop

Alur salah:

    Reason → Tool → Answer

Alur perbaikan:

    Reason → Plan → Tool → Observe → Validate → Update → Answer

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h2>1.11 Latihan</h2>
<h3>Latihan 1 — Fakta atau Asumsi?</h3>
<p>Kasus:</p>
<blockquote>
<p>Sebuah kelas memiliki 40 peserta. Biaya modul Rp20.000 per orang. Panitia menyiapkan anggaran Rp1.000.000. AI menghitung seluruh peserta memperoleh satu modul.</p>
</blockquote>
<p>Klasifikasikan pernyataan berikut:</p>
<ol>
<li>Peserta berjumlah 40 orang.</li>
<li>Biaya modul Rp20.000 per orang.</li>
<li>Semua peserta memperoleh satu modul.</li>
<li>Total biaya modul Rp800.000.</li>
<li>Anggaran cukup.</li>
</ol>
<h4>Pembahasan</h4>
<table>
<thead>
<tr>
<th>Pernyataan</th>
<th>Kategori</th>
</tr>
</thead>
<tbody>
<tr>
<td>Peserta berjumlah 40 orang</td>
<td>Fakta</td>
</tr>
<tr>
<td>Biaya modul Rp20.000 per orang</td>
<td>Fakta</td>
</tr>
<tr>
<td>Semua peserta memperoleh satu modul</td>
<td>Asumsi</td>
</tr>
<tr>
<td>Total biaya modul Rp800.000</td>
<td>Hasil langkah</td>
</tr>
<tr>
<td>Anggaran cukup</td>
<td>Kesimpulan</td>
</tr>
</tbody>
</table>
<h3>Latihan 2 — Urutkan Langkah</h3>
<p>Urutkan langkah berikut:</p>
<ul>
<li>bandingkan total kebutuhan dengan anggaran;</li>
<li>hitung sisa anggaran;</li>
<li>identifikasi jumlah peserta;</li>
<li>hitung total konsumsi;</li>
<li>identifikasi harga per peserta.</li>
</ul>
<h4>Pembahasan</h4>
<pre><code class="language-text">1. Identifikasi jumlah peserta.
2. Identifikasi harga per peserta.
3. Hitung total konsumsi.
4. Bandingkan total kebutuhan dengan anggaran.
5. Hitung sisa anggaran.
</code></pre>
<h3>Latihan 3 — Temukan Kesalahan</h3>
<p>Jawaban AI:</p>
<blockquote>
<p>“Untuk 50 peserta dengan harga Rp25.000 per orang dan biaya sewa Rp400.000, total kebutuhannya adalah Rp1.250.000. Anggaran Rp1.500.000 berarti tersisa Rp250.000.”</p>
</blockquote>
<h4>Pembahasan</h4>
<p>AI melupakan biaya sewa.</p>
<pre><code class="language-text">Konsumsi:
50 × Rp25.000 = Rp1.250.000

Total:
Rp1.250.000 + Rp400.000 = Rp1.650.000

Kekurangan:
Rp1.650.000 − Rp1.500.000 = Rp150.000
</code></pre>
<h3>Latihan 4 — Prioritas Nonnumerik</h3>
<p>Urutkan pekerjaan berikut:</p>
<ul>
<li>memperbaiki tombol pembayaran yang gagal;</li>
<li>mengubah warna kartu;</li>
<li>menambah ilustrasi kosong.</li>
</ul>
<h4>Pembahasan</h4>
<p>Tombol pembayaran harus diprioritaskan karena memengaruhi fungsi dan transaksi utama. Perubahan visual dapat dikerjakan setelah fungsi kritis stabil.</p>
<hr />
<h2>2.13 Latihan</h2>
<h3>Latihan 1 — Pecah Tujuan</h3>
<p>Tugas:</p>
<blockquote>
<p>Buat program mentoring AI selama empat minggu untuk peserta pemula.</p>
</blockquote>
<p>Buat 6–10 subtugas.</p>
<h4>Contoh Pembahasan</h4>
<ol>
<li>Mengidentifikasi kemampuan awal peserta.</li>
<li>Menentukan tujuan empat minggu.</li>
<li>Membagi materi per minggu.</li>
<li>Menentukan mentor.</li>
<li>Menyiapkan contoh dan latihan.</li>
<li>Menentukan jadwal.</li>
<li>Menyiapkan kanal diskusi.</li>
<li>Membuat evaluasi mingguan.</li>
<li>Membuat proyek akhir.</li>
<li>Mengumpulkan feedback.</li>
</ol>
<h3>Latihan 2 — Temukan Dependensi</h3>
<p>Urutkan:</p>
<ul>
<li>melakukan evaluasi akhir;</li>
<li>menetapkan tujuan belajar;</li>
<li>membuat latihan;</li>
<li>memilih materi;</li>
<li>menjalankan sesi.</li>
</ul>
<h4>Pembahasan</h4>
<pre><code class="language-text">1. Menetapkan tujuan belajar.
2. Memilih materi.
3. Membuat latihan.
4. Menjalankan sesi.
5. Melakukan evaluasi akhir.
</code></pre>
<h3>Latihan 3 — Replanning</h3>
<p>Rencana awal menggunakan laboratorium komputer. Pada hari pelaksanaan, setengah komputer tidak dapat digunakan.</p>
<h4>Contoh Pembahasan</h4>
<ul>
<li>ubah latihan menjadi berpasangan;</li>
<li>prioritaskan aktivitas yang dapat dijalankan melalui browser;</li>
<li>siapkan demonstrasi terpusat;</li>
<li>kurangi aktivitas yang membutuhkan satu perangkat per peserta;</li>
<li>pertahankan tujuan belajar, tetapi ubah metode.</li>
</ul>
<h3>Latihan 4 — Evaluasi Rencana</h3>
<p>Sebuah workshop memiliki durasi 90 menit, tetapi rencana AI berisi:</p>
<ul>
<li>pembukaan 15 menit;</li>
<li>materi 35 menit;</li>
<li>demo 25 menit;</li>
<li>latihan 30 menit;</li>
<li>kuis 15 menit.</li>
</ul>
<h4>Pembahasan</h4>
<p>Total rencana adalah 120 menit. Rencana melanggar batas waktu dan harus dipangkas atau disusun ulang.</p>
<hr />
<h2>3.14 Latihan</h2>
<h3>Latihan 1 — Ubah Prompt</h3>
<p>Prompt awal:</p>
<blockquote>
<p>“Hitung biaya acara ini.”</p>
</blockquote>
<h4>Contoh Perbaikan</h4>
<blockquote>
<p>“Identifikasi jumlah peserta, biaya per peserta, biaya tambahan, dan anggaran. Hitung total kebutuhan, bandingkan dengan anggaran, periksa perhitungan, lalu berikan kesimpulan.”</p>
</blockquote>
<h3>Latihan 2 — Temukan Kesalahan</h3>
<pre><code class="language-text">Peserta: 45
Biaya: Rp30.000
Total menurut AI: Rp1.250.000
</code></pre>
<h4>Pembahasan</h4>
<pre><code class="language-text">45 × Rp30.000 = Rp1.350.000
</code></pre>
<h3>Latihan 3 — Kurangi Penjelasan Berlebihan</h3>
<p>Tugas peserta: ringkas penjelasan 10 paragraf menjadi:</p>
<ol>
<li>data;</li>
<li>tiga langkah utama;</li>
<li>hasil;</li>
<li>satu catatan asumsi.</li>
</ol>
<h3>Latihan 4 — Perlu CoT atau Tidak?</h3>
<table>
<thead>
<tr>
<th>Tugas</th>
<th>CoT?</th>
<th>Alasan</th>
</tr>
</thead>
<tbody>
<tr>
<td>Memperbaiki typo “algoritm”</td>
<td>Tidak</td>
<td>Satu langkah</td>
</tr>
<tr>
<td>Membandingkan dua rencana anggaran</td>
<td>Ya</td>
<td>Banyak kriteria</td>
</tr>
<tr>
<td>Menerjemahkan “good morning”</td>
<td>Tidak</td>
<td>Tugas sederhana</td>
</tr>
<tr>
<td>Menyusun jadwal dengan lima batasan</td>
<td>Ya</td>
<td>Perlu pelacakan batasan</td>
</tr>
<tr>
<td>Menghitung data dari 5.000 baris</td>
<td>Perlu langkah + tool</td>
<td>CoT saja tidak cukup</td>
</tr>
</tbody>
</table>
<hr />
<h2>4.16 Latihan</h2>
<h3>Latihan 1 — Pilih Tool</h3>
<table>
<thead>
<tr>
<th>Tugas</th>
<th>Tool</th>
</tr>
</thead>
<tbody>
<tr>
<td>Menghitung 287 × 9.451</td>
<td>Kalkulator</td>
</tr>
<tr>
<td>Menganalisis 10.000 baris data</td>
<td>Spreadsheet atau Python</td>
</tr>
<tr>
<td>Mengetahui cuaca hari ini</td>
<td>Weather tool</td>
</tr>
<tr>
<td>Merangkum paragraf yang diberikan</td>
<td>Tidak perlu tool eksternal</td>
</tr>
<tr>
<td>Mencari isi kebijakan dalam PDF</td>
<td>File retrieval</td>
</tr>
<tr>
<td>Mencari slot rapat</td>
<td>Calendar</td>
</tr>
<tr>
<td>Membuat draft email</td>
<td>Email drafting tool</td>
</tr>
<tr>
<td>Mengetahui rute</td>
<td>Maps</td>
</tr>
</tbody>
</table>
<h3>Latihan 2 — Tentukan Parameter</h3>
<p>Tugas:</p>
<blockquote>
<p>Cari slot rapat dua jam minggu depan.</p>
</blockquote>
<p>Parameter yang perlu ditentukan:</p>
<ul>
<li>tanggal mulai;</li>
<li>tanggal akhir;</li>
<li>zona waktu;</li>
<li>durasi;</li>
<li>kalender;</li>
<li>jam kerja;</li>
<li>peserta yang perlu diperiksa.</li>
</ul>
<h3>Latihan 3 — Baca Observation</h3>
<pre><code class="language-text">Jumlah baris: 100
Nilai valid: 0
Error: kolom “score” berisi teks
</code></pre>
<h4>Pembahasan</h4>
<p>AI tidak boleh menghitung rata-rata. AI harus menjelaskan bahwa kolom tidak berisi nilai numerik dan meminta kolom alternatif atau perbaikan data.</p>
<h3>Latihan 4 — Permission Check</h3>
<p>Klasifikasikan:</p>
<ul>
<li>membaca kalender sendiri;</li>
<li>membuat draft email;</li>
<li>mengirim email;</li>
<li>menghapus agenda;</li>
<li>menjalankan kalkulator.</li>
</ul>
<p>Tindakan mengirim email dan menghapus agenda memiliki dampak lebih tinggi daripada sekadar membaca atau membuat draft.</p>
<h3>Latihan 5 — Perbaiki Tool Loop</h3>
<p>Alur salah:</p>
<pre><code class="language-text">Reason → Tool → Answer
</code></pre>
<p>Alur perbaikan:</p>
<pre><code class="language-text">Reason → Plan → Tool → Observe → Validate → Update → Answer
</code></pre>
<hr />

````
