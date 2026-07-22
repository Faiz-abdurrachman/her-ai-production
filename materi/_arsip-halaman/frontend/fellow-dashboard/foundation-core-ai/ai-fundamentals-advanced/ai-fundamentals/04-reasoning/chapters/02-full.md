# 1.4 Fakta, Asumsi, Langkah, dan Kesimpulan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/02-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

#### 1.4 Fakta, Asumsi, Langkah, dan Kesimpulan

Empat elemen berikut sering tercampur dalam jawaban AI.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Elemen
Pengertian
Contoh</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Fakta
Informasi yang diberikan atau sudah diverifikasi
Peserta berjumlah 60 orang</td>
<td align="left">Asumsi
Informasi yang dianggap benar agar proses dapat dilanjutkan
Semua peserta menerima satu paket konsumsi</td>
<td align="left">Langkah
Operasi atau proses yang dilakukan
60 × Rp35.000</td>
</tr>
</tbody>
</table>

##### Contoh Jawaban Bermasalah

> “Anggarannya pasti cukup karena acara sebelumnya juga memiliki anggaran yang cukup.”

Masalah dalam jawaban tersebut:

-   menggunakan pengalaman sebelumnya sebagai dasar utama;
-   tidak menghitung kebutuhan acara sekarang;
-   mengabaikan kemungkinan perbedaan harga;
-   mengabaikan kemungkinan perbedaan jumlah peserta;
-   menggunakan kata “pasti” tanpa bukti yang cukup.

* * * * *

#### 1.5 Contoh Terurai 1 — Perhitungan Anggaran

##### Kasus

    Anggaran: Rp3.000.000
    Peserta: 60 orang
    Konsumsi: Rp35.000 per orang
    Biaya administrasi: Rp250.000

##### Langkah 1 — Hitung konsumsi

    60 × Rp35.000 = Rp2.100.000

##### Langkah 2 — Tambahkan biaya administrasi

    Rp2.100.000 + Rp250.000 = Rp2.350.000

##### Langkah 3 — Bandingkan dengan anggaran

    Rp3.000.000 − Rp2.350.000 = Rp650.000

##### Kesimpulan

> Anggaran mencukupi. Setelah biaya konsumsi dan administrasi, terdapat sisa Rp650.000.

##### Kesalahan yang Mungkin Terjadi

1.  **Melupakan biaya administrasi**
     AI hanya menghitung konsumsi dan menyatakan sisa Rp900.000.

2.  **Salah membaca angka**
     Rp35.000 dibaca sebagai Rp350.000.

3.  **Salah operasi**
     Anggaran dikalikan dengan jumlah peserta.

4.  **Kesimpulan tanpa perhitungan**
     AI menyatakan anggaran cukup karena Rp3.000.000 “terlihat besar”.

5.  **Tidak menyatakan asumsi**
     AI menganggap seluruh peserta menerima konsumsi, padahal panitia mungkin termasuk dalam perhitungan.

* * * * *

#### 1.6 Contoh Terurai 2 — Menentukan Prioritas

##### Kasus

Sebuah tim memiliki tiga pekerjaan:

1.  memperbaiki bug login;
2.  mengganti ikon menu;
3.  menambahkan animasi transisi.

Bug login membuat sebagian pengguna tidak dapat masuk ke aplikasi.

##### Informasi Relevan

-   bug login menghalangi fungsi utama;
-   ikon dan animasi lebih bersifat visual;
-   fitur lain tidak bermanfaat jika pengguna tidak dapat masuk.

##### Urutan yang Wajar

    1. Perbaiki bug login.
    2. Uji autentikasi dan sesi pengguna.
    3. Ganti ikon menu.
    4. Tambahkan animasi setelah fungsi utama stabil.

##### Dasar Penalaran

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Kriteria
Bug Login
Ikon
Animasi</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Dampak pada fungsi utama
Sangat tinggi
Rendah
Rendah</td>
<td align="left">Urgensi
Tinggi
Rendah
Rendah</td>
<td align="left">Risiko jika ditunda
Tinggi
Rendah
Rendah</td>
<td align="left">Ketergantungan pekerjaan lain
Tinggi
Rendah
Rendah</td>
</tr>
</tbody>
</table>

Reasoning tidak hanya digunakan untuk matematika. Reasoning juga dapat digunakan untuk:

-   menentukan prioritas;
-   memilih alternatif;
-   menyusun rekomendasi;
-   menganalisis penyebab;
-   memeriksa konsistensi;
-   membuat keputusan berdasarkan beberapa kriteria.

* * * * *

#### 1.7 Kesalahan Umum dalam Reasoning AI

##### 1. Salah Memahami Tujuan

AI menjawab topik yang berhubungan, tetapi tidak menjawab tugas utama.

##### 2. Mengabaikan Batasan

AI memberikan solusi yang melebihi anggaran, waktu, atau kapasitas.

##### 3. Menggunakan Informasi Tidak Relevan

AI memasukkan detail yang tidak memengaruhi hasil.

##### 4. Membuat Asumsi Tersembunyi

AI menganggap sesuatu benar tanpa mengatakannya.

##### 5. Mengarang Fakta

AI menambahkan data, sumber, atau kondisi yang tidak tersedia.

##### 6. Salah Urutan Langkah

AI menggunakan hasil yang belum dihitung atau melewati dependensi.

##### 7. Salah Perhitungan

Langkah terlihat benar, tetapi operasi atau angkanya salah.

##### 8. Tidak Memeriksa Hasil

AI berhenti setelah memperoleh angka tanpa memeriksa apakah angka masuk akal.

##### 9. Terlalu Percaya Diri

AI menggunakan kata “pasti” pada hasil yang masih bergantung pada asumsi.

##### 10. Penjelasan Meyakinkan tetapi Tidak Valid

Bahasa yang lancar dapat menutupi kesalahan logika.

> **Prinsip penting:** Penjelasan yang terdengar meyakinkan bukan bukti bahwa jawabannya benar.

* * * * *

#### 1.8 Cara Memeriksa Reasoning AI

Gunakan checklist berikut:

    □ Apakah AI menjawab pertanyaan yang benar?
    □ Apakah tujuan dan batasan dipahami?
    □ Apakah informasi yang dipakai tersedia?
    □ Apakah fakta dan asumsi dibedakan?
    □ Apakah asumsi penting disebutkan?
    □ Apakah urutan langkah masuk akal?
    □ Apakah perhitungan dapat diulang?
    □ Apakah kesimpulan mengikuti data?
    □ Apakah ada alternatif yang perlu dipertimbangkan?
    □ Apakah tingkat keyakinan sesuai dengan bukti?

* * * * *

#### 1.9 Kapan Reasoning Terstruktur Berguna?

Reasoning terstruktur berguna ketika tugas:

-   memiliki lebih dari satu langkah;
-   mengandung beberapa batasan;
-   melibatkan perhitungan;
-   membutuhkan perbandingan;
-   membutuhkan prioritas;
-   membutuhkan justifikasi;
-   menggunakan data dari beberapa sumber;
-   berpotensi memiliki asumsi tersembunyi.

Reasoning panjang tidak selalu diperlukan untuk:

-   memperbaiki satu typo;
-   menerjemahkan satu frasa;
-   menjawab definisi sederhana;
-   mengubah format teks;
-   memberikan jawaban satu langkah yang sudah jelas.

* * * * *

#### 1.10 Ringkasan Submateri

-   Reasoning menghubungkan informasi untuk menghasilkan kesimpulan atau langkah berikutnya.
-   LLM tetap bekerja melalui prediksi token, tetapi dapat menghasilkan perilaku penyelesaian masalah bertahap.
-   Reasoning yang baik dimulai dari memahami tujuan dan batasan.
-   Fakta, asumsi, langkah, dan kesimpulan harus dibedakan.
-   Jawaban yang runtut belum tentu benar.
-   Hasil AI perlu diperiksa dari sisi logika, data, perhitungan, dan kesesuaian tujuan.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h2>1.4 Fakta, Asumsi, Langkah, dan Kesimpulan</h2>
<p>Empat elemen berikut sering tercampur dalam jawaban AI.</p>
<table>
<thead>
<tr>
<th>Elemen</th>
<th>Pengertian</th>
<th>Contoh</th>
</tr>
</thead>
<tbody>
<tr>
<td>Fakta</td>
<td>Informasi yang diberikan atau sudah diverifikasi</td>
<td>Peserta berjumlah 60 orang</td>
</tr>
<tr>
<td>Asumsi</td>
<td>Informasi yang dianggap benar agar proses dapat dilanjutkan</td>
<td>Semua peserta menerima satu paket konsumsi</td>
</tr>
<tr>
<td>Langkah</td>
<td>Operasi atau proses yang dilakukan</td>
<td>60 × Rp35.000</td>
</tr>
<tr>
<td>Kesimpulan</td>
<td>Hasil yang ditarik dari fakta dan langkah</td>
<td>Anggaran cukup</td>
</tr>
</tbody>
</table>
<h3>Contoh Jawaban Bermasalah</h3>
<blockquote>
<p>“Anggarannya pasti cukup karena acara sebelumnya juga memiliki anggaran yang cukup.”</p>
</blockquote>
<p>Masalah dalam jawaban tersebut:</p>
<ul>
<li>menggunakan pengalaman sebelumnya sebagai dasar utama;</li>
<li>tidak menghitung kebutuhan acara sekarang;</li>
<li>mengabaikan kemungkinan perbedaan harga;</li>
<li>mengabaikan kemungkinan perbedaan jumlah peserta;</li>
<li>menggunakan kata “pasti” tanpa bukti yang cukup.</li>
</ul>
<hr />
<h2>1.5 Contoh Terurai 1 — Perhitungan Anggaran</h2>
<h3>Kasus</h3>
<pre><code class="language-text">Anggaran: Rp3.000.000
Peserta: 60 orang
Konsumsi: Rp35.000 per orang
Biaya administrasi: Rp250.000
</code></pre>
<h3>Langkah 1 — Hitung konsumsi</h3>
<pre><code class="language-text">60 × Rp35.000 = Rp2.100.000
</code></pre>
<h3>Langkah 2 — Tambahkan biaya administrasi</h3>
<pre><code class="language-text">Rp2.100.000 + Rp250.000 = Rp2.350.000
</code></pre>
<h3>Langkah 3 — Bandingkan dengan anggaran</h3>
<pre><code class="language-text">Rp3.000.000 − Rp2.350.000 = Rp650.000
</code></pre>
<h3>Kesimpulan</h3>
<blockquote>
<p>Anggaran mencukupi. Setelah biaya konsumsi dan administrasi, terdapat sisa Rp650.000.</p>
</blockquote>
<h3>Kesalahan yang Mungkin Terjadi</h3>
<ol>
<li>
<p><strong>Melupakan biaya administrasi</strong><br />
   AI hanya menghitung konsumsi dan menyatakan sisa Rp900.000.</p>
</li>
<li>
<p><strong>Salah membaca angka</strong><br />
   Rp35.000 dibaca sebagai Rp350.000.</p>
</li>
<li>
<p><strong>Salah operasi</strong><br />
   Anggaran dikalikan dengan jumlah peserta.</p>
</li>
<li>
<p><strong>Kesimpulan tanpa perhitungan</strong><br />
   AI menyatakan anggaran cukup karena Rp3.000.000 “terlihat besar”.</p>
</li>
<li>
<p><strong>Tidak menyatakan asumsi</strong><br />
   AI menganggap seluruh peserta menerima konsumsi, padahal panitia mungkin termasuk dalam perhitungan.</p>
</li>
</ol>
<hr />
<h2>1.6 Contoh Terurai 2 — Menentukan Prioritas</h2>
<h3>Kasus</h3>
<p>Sebuah tim memiliki tiga pekerjaan:</p>
<ol>
<li>memperbaiki bug login;</li>
<li>mengganti ikon menu;</li>
<li>menambahkan animasi transisi.</li>
</ol>
<p>Bug login membuat sebagian pengguna tidak dapat masuk ke aplikasi.</p>
<h3>Informasi Relevan</h3>
<ul>
<li>bug login menghalangi fungsi utama;</li>
<li>ikon dan animasi lebih bersifat visual;</li>
<li>fitur lain tidak bermanfaat jika pengguna tidak dapat masuk.</li>
</ul>
<h3>Urutan yang Wajar</h3>
<pre><code class="language-text">1. Perbaiki bug login.
2. Uji autentikasi dan sesi pengguna.
3. Ganti ikon menu.
4. Tambahkan animasi setelah fungsi utama stabil.
</code></pre>
<h3>Dasar Penalaran</h3>
<table>
<thead>
<tr>
<th>Kriteria</th>
<th style="text-align: right;">Bug Login</th>
<th style="text-align: right;">Ikon</th>
<th style="text-align: right;">Animasi</th>
</tr>
</thead>
<tbody>
<tr>
<td>Dampak pada fungsi utama</td>
<td style="text-align: right;">Sangat tinggi</td>
<td style="text-align: right;">Rendah</td>
<td style="text-align: right;">Rendah</td>
</tr>
<tr>
<td>Urgensi</td>
<td style="text-align: right;">Tinggi</td>
<td style="text-align: right;">Rendah</td>
<td style="text-align: right;">Rendah</td>
</tr>
<tr>
<td>Risiko jika ditunda</td>
<td style="text-align: right;">Tinggi</td>
<td style="text-align: right;">Rendah</td>
<td style="text-align: right;">Rendah</td>
</tr>
<tr>
<td>Ketergantungan pekerjaan lain</td>
<td style="text-align: right;">Tinggi</td>
<td style="text-align: right;">Rendah</td>
<td style="text-align: right;">Rendah</td>
</tr>
</tbody>
</table>
<p>Reasoning tidak hanya digunakan untuk matematika. Reasoning juga dapat digunakan untuk:</p>
<ul>
<li>menentukan prioritas;</li>
<li>memilih alternatif;</li>
<li>menyusun rekomendasi;</li>
<li>menganalisis penyebab;</li>
<li>memeriksa konsistensi;</li>
<li>membuat keputusan berdasarkan beberapa kriteria.</li>
</ul>
<hr />
<h2>1.7 Kesalahan Umum dalam Reasoning AI</h2>
<h3>1. Salah Memahami Tujuan</h3>
<p>AI menjawab topik yang berhubungan, tetapi tidak menjawab tugas utama.</p>
<h3>2. Mengabaikan Batasan</h3>
<p>AI memberikan solusi yang melebihi anggaran, waktu, atau kapasitas.</p>
<h3>3. Menggunakan Informasi Tidak Relevan</h3>
<p>AI memasukkan detail yang tidak memengaruhi hasil.</p>
<h3>4. Membuat Asumsi Tersembunyi</h3>
<p>AI menganggap sesuatu benar tanpa mengatakannya.</p>
<h3>5. Mengarang Fakta</h3>
<p>AI menambahkan data, sumber, atau kondisi yang tidak tersedia.</p>
<h3>6. Salah Urutan Langkah</h3>
<p>AI menggunakan hasil yang belum dihitung atau melewati dependensi.</p>
<h3>7. Salah Perhitungan</h3>
<p>Langkah terlihat benar, tetapi operasi atau angkanya salah.</p>
<h3>8. Tidak Memeriksa Hasil</h3>
<p>AI berhenti setelah memperoleh angka tanpa memeriksa apakah angka masuk akal.</p>
<h3>9. Terlalu Percaya Diri</h3>
<p>AI menggunakan kata “pasti” pada hasil yang masih bergantung pada asumsi.</p>
<h3>10. Penjelasan Meyakinkan tetapi Tidak Valid</h3>
<p>Bahasa yang lancar dapat menutupi kesalahan logika.</p>
<blockquote>
<p><strong>Prinsip penting:</strong> Penjelasan yang terdengar meyakinkan bukan bukti bahwa jawabannya benar.</p>
</blockquote>
<hr />
<h2>1.8 Cara Memeriksa Reasoning AI</h2>
<p>Gunakan checklist berikut:</p>
<pre><code class="language-text">□ Apakah AI menjawab pertanyaan yang benar?
□ Apakah tujuan dan batasan dipahami?
□ Apakah informasi yang dipakai tersedia?
□ Apakah fakta dan asumsi dibedakan?
□ Apakah asumsi penting disebutkan?
□ Apakah urutan langkah masuk akal?
□ Apakah perhitungan dapat diulang?
□ Apakah kesimpulan mengikuti data?
□ Apakah ada alternatif yang perlu dipertimbangkan?
□ Apakah tingkat keyakinan sesuai dengan bukti?
</code></pre>
<hr />
<h2>1.9 Kapan Reasoning Terstruktur Berguna?</h2>
<p>Reasoning terstruktur berguna ketika tugas:</p>
<ul>
<li>memiliki lebih dari satu langkah;</li>
<li>mengandung beberapa batasan;</li>
<li>melibatkan perhitungan;</li>
<li>membutuhkan perbandingan;</li>
<li>membutuhkan prioritas;</li>
<li>membutuhkan justifikasi;</li>
<li>menggunakan data dari beberapa sumber;</li>
<li>berpotensi memiliki asumsi tersembunyi.</li>
</ul>
<p>Reasoning panjang tidak selalu diperlukan untuk:</p>
<ul>
<li>memperbaiki satu typo;</li>
<li>menerjemahkan satu frasa;</li>
<li>menjawab definisi sederhana;</li>
<li>mengubah format teks;</li>
<li>memberikan jawaban satu langkah yang sudah jelas.</li>
</ul>
<hr />
<h2>1.10 Ringkasan Submateri</h2>
<ul>
<li>Reasoning menghubungkan informasi untuk menghasilkan kesimpulan atau langkah berikutnya.</li>
<li>LLM tetap bekerja melalui prediksi token, tetapi dapat menghasilkan perilaku penyelesaian masalah bertahap.</li>
<li>Reasoning yang baik dimulai dari memahami tujuan dan batasan.</li>
<li>Fakta, asumsi, langkah, dan kesimpulan harus dibedakan.</li>
<li>Jawaban yang runtut belum tentu benar.</li>
<li>Hasil AI perlu diperiksa dari sisi logika, data, perhitungan, dan kesesuaian tujuan.</li>
</ul>
<hr />

````
