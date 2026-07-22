# Chapter 13 — NumPy: Komputasi Numerik dalam Array

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/13-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 13 — NumPy: Komputasi Numerik dalam Array

#### Learning Objectives

-   Membuat NumPy array dan membaca `shape`.
-   Melakukan operasi vectorized sederhana.
-   Menghitung statistik sambil menangani `NaN`.

#### Kenapa Materi Ini Penting?

Loop Python cocok untuk belajar, tetapi operasi data numerik sering lebih ringkas dan efisien dengan array.

#### Hubungan dengan AI

Data numerik pada workflow AI banyak direpresentasikan sebagai array. Kita tidak membahas tensor atau model; fokusnya cara berpikir data berdimensi.

#### Analogi

List seperti kotak campuran. NumPy array seperti rak angka yang rapi: bentuk dan tipe datanya mendukung operasi massal.

#### Penjelasan Konsep

Array memiliki `shape`. Operasi `scores + 5` diterapkan ke setiap elemen tanpa loop manual. `np.nan` mewakili nilai numerik yang hilang. `np.nanmean()` menghitung rata-rata sambil mengabaikan NaN, tetapi kita tetap perlu memahami mengapa data hilang.

#### Visual Thinking

    [[80, 90, 70],
     [88, 92, 84]]  → shape (2, 3)
      2 peserta, 3 penilaian

#### Contoh Nyata

Hitung rata-rata nilai peserta dan normalisasi sederhana ke skala 0–1.

#### Contoh AI

Array adalah bentuk umum untuk data numerik yang kelak dipakai library Machine Learning.

#### Kode Python

    import numpy as np

    scores = np.array([80.0, 90.0, np.nan, 70.0])
    average = np.nanmean(scores)
    valid_scores = scores[~np.isnan(scores)]
    scaled_scores = valid_scores / 100

    print(scores.shape)
    print(average)
    print(scaled_scores)

#### Penjelasan Kode Baris per Baris

1.  NumPy diimpor sebagai `np`.
2.  Array float dibuat; satu nilai hilang ditandai `np.nan`.
3.  `np.nanmean` menghitung rata-rata nilai valid.
4.  Boolean mask memilih elemen yang bukan NaN.
5.  Pembagian diterapkan ke seluruh nilai valid.
6.  Shape, rata-rata, dan hasil skala ditampilkan.

#### Common Mistakes

-   Mencampur shape yang tidak kompatibel.
-   Mengabaikan dtype.
-   Menghapus NaN tanpa memahami penyebab.

#### Best Practices

-   Periksa `shape` dan `dtype`.
-   Tentukan kebijakan missing value secara eksplisit.
-   Gunakan operasi vectorized yang tetap mudah dibaca.

#### Mini Challenge

Buat array lima nilai termasuk satu `np.nan`. Tampilkan jumlah data valid, minimum, maksimum, dan rata-rata valid.

#### Ringkasan

NumPy membantu memproses sekumpulan angka sebagai array dengan operasi yang ringkas dan konsisten.

#### Persiapan Chapter Berikutnya

Array kuat untuk angka; Pandas menambahkan nama kolom dan baris agar data tabular lebih mudah dipahami.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 13 — NumPy: Komputasi Numerik dalam Array</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Membuat NumPy array dan membaca <code>shape</code>.</li>
<li>Melakukan operasi vectorized sederhana.</li>
<li>Menghitung statistik sambil menangani <code>NaN</code>.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Loop Python cocok untuk belajar, tetapi operasi data numerik sering lebih ringkas dan efisien dengan array.</p>
<h2>Hubungan dengan AI</h2>
<p>Data numerik pada workflow AI banyak direpresentasikan sebagai array. Kita tidak membahas tensor atau model; fokusnya cara berpikir data berdimensi.</p>
<h2>Analogi</h2>
<p>List seperti kotak campuran. NumPy array seperti rak angka yang rapi: bentuk dan tipe datanya mendukung operasi massal.</p>
<h2>Penjelasan Konsep</h2>
<p>Array memiliki <code>shape</code>. Operasi <code>scores + 5</code> diterapkan ke setiap elemen tanpa loop manual. <code>np.nan</code> mewakili nilai numerik yang hilang. <code>np.nanmean()</code> menghitung rata-rata sambil mengabaikan NaN, tetapi kita tetap perlu memahami mengapa data hilang.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">[[80, 90, 70],
 [88, 92, 84]]  → shape (2, 3)
  2 peserta, 3 penilaian
</code></pre>
<h2>Contoh Nyata</h2>
<p>Hitung rata-rata nilai peserta dan normalisasi sederhana ke skala 0–1.</p>
<h2>Contoh AI</h2>
<p>Array adalah bentuk umum untuk data numerik yang kelak dipakai library Machine Learning.</p>
<h2>Kode Python</h2>
<pre><code class="language-python">import numpy as np

scores = np.array([80.0, 90.0, np.nan, 70.0])
average = np.nanmean(scores)
valid_scores = scores[~np.isnan(scores)]
scaled_scores = valid_scores / 100

print(scores.shape)
print(average)
print(scaled_scores)
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li>NumPy diimpor sebagai <code>np</code>.</li>
<li>Array float dibuat; satu nilai hilang ditandai <code>np.nan</code>.</li>
<li><code>np.nanmean</code> menghitung rata-rata nilai valid.</li>
<li>Boolean mask memilih elemen yang bukan NaN.</li>
<li>Pembagian diterapkan ke seluruh nilai valid.</li>
<li>Shape, rata-rata, dan hasil skala ditampilkan.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li>Mencampur shape yang tidak kompatibel.</li>
<li>Mengabaikan dtype.</li>
<li>Menghapus NaN tanpa memahami penyebab.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Periksa <code>shape</code> dan <code>dtype</code>.</li>
<li>Tentukan kebijakan missing value secara eksplisit.</li>
<li>Gunakan operasi vectorized yang tetap mudah dibaca.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Buat array lima nilai termasuk satu <code>np.nan</code>. Tampilkan jumlah data valid, minimum, maksimum, dan rata-rata valid.</p>
<h2>Ringkasan</h2>
<p>NumPy membantu memproses sekumpulan angka sebagai array dengan operasi yang ringkas dan konsisten.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Array kuat untuk angka; Pandas menambahkan nama kolom dan baris agar data tabular lebih mudah dipahami.</p>
<hr>

````
