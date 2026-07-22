# Chapter 3 — Computational Thinking

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/03-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 3 — Computational Thinking

#### Learning Objectives

-   Memetakan masalah menjadi input, process, dan output.
-   Menulis langkah solusi sebelum sintaks.
-   Membedakan data, aturan proses, dan hasil.

#### Kenapa Materi Ini Penting?

Program yang baik dimulai dari cara berpikir, bukan dari mengetik. Jika proses belum jelas, kode hanya membuat kebingungan berjalan lebih cepat.

#### Hubungan dengan AI

Pipeline AI menerima input, mengubahnya melalui beberapa proses, lalu menghasilkan output. Cara berpikir ini berlaku dari preprocessing data sampai inference.

#### Analogi

Mesin jus menerima buah sebagai input, memotong dan memblender sebagai process, lalu menghasilkan jus sebagai output. Komputer juga membutuhkan instruksi eksplisit.

#### Penjelasan Konsep

Komputer tidak “mengerti maksud” seperti rekan manusia. Ia menjalankan instruksi sesuai urutan dan data yang diberikan.

-   **Input:** data yang masuk.
-   **Process:** aturan atau transformasi.
-   **Output:** hasil yang keluar.

Sebelum coding, tulis pseudocode dalam bahasa biasa.

#### Visual Thinking

    Nilai peserta → validasi → hitung rata-rata → status kelulusan
         input          process                 output

#### Contoh Nyata

Input: harga dan jumlah barang. Process: perkalian dan penjumlahan. Output: total belanja.

#### Contoh AI

Input dapat berupa dataset teks. Process awal dapat berupa pembersihan teks. Outputnya dataset bersih yang siap dipelajari pada modul berikutnya.

#### Kode Python

    scores = [80, 90, 70]
    average = sum(scores) / len(scores)
    print(average)

#### Penjelasan Kode Baris per Baris

1.  `scores` adalah input berupa tiga nilai.
2.  `sum(scores)` menjumlahkan nilai dan `len(scores)` menghitung jumlah data.
3.  Hasil process disimpan dalam `average`.
4.  `print()` menampilkan output.

#### Common Mistakes

-   Coding sebelum mengetahui output yang diinginkan.
-   Tidak mempertimbangkan input kosong atau salah format.
-   Menggabungkan semua proses dalam satu langkah besar.

#### Best Practices

-   Tulis contoh input dan expected output.
-   Pecah process menjadi langkah kecil.
-   Uji dengan kasus normal dan kasus tidak biasa.

#### Mini Challenge

Tuliskan input–process–output untuk program yang menghitung persentase kehadiran peserta.

#### Ringkasan

Computational thinking mengubah masalah menjadi data masuk, langkah yang eksplisit, dan hasil yang dapat diperiksa.

#### Persiapan Chapter Berikutnya

Kita sekarang menerjemahkan alur tersebut menjadi sintaks dasar Python.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 3 — Computational Thinking</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Memetakan masalah menjadi input, process, dan output.</li>
<li>Menulis langkah solusi sebelum sintaks.</li>
<li>Membedakan data, aturan proses, dan hasil.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Program yang baik dimulai dari cara berpikir, bukan dari mengetik. Jika proses belum jelas, kode hanya membuat kebingungan berjalan lebih cepat.</p>
<h2>Hubungan dengan AI</h2>
<p>Pipeline AI menerima input, mengubahnya melalui beberapa proses, lalu menghasilkan output. Cara berpikir ini berlaku dari preprocessing data sampai inference.</p>
<h2>Analogi</h2>
<p>Mesin jus menerima buah sebagai input, memotong dan memblender sebagai process, lalu menghasilkan jus sebagai output. Komputer juga membutuhkan instruksi eksplisit.</p>
<h2>Penjelasan Konsep</h2>
<p>Komputer tidak “mengerti maksud” seperti rekan manusia. Ia menjalankan instruksi sesuai urutan dan data yang diberikan.</p>
<ul>
<li><strong>Input:</strong> data yang masuk.</li>
<li><strong>Process:</strong> aturan atau transformasi.</li>
<li><strong>Output:</strong> hasil yang keluar.</li>
</ul>
<p>Sebelum coding, tulis pseudocode dalam bahasa biasa.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">Nilai peserta → validasi → hitung rata-rata → status kelulusan
     input          process                 output
</code></pre>
<h2>Contoh Nyata</h2>
<p>Input: harga dan jumlah barang. Process: perkalian dan penjumlahan. Output: total belanja.</p>
<h2>Contoh AI</h2>
<p>Input dapat berupa dataset teks. Process awal dapat berupa pembersihan teks. Outputnya dataset bersih yang siap dipelajari pada modul berikutnya.</p>
<h2>Kode Python</h2>
<pre><code class="language-python">scores = [80, 90, 70]
average = sum(scores) / len(scores)
print(average)
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li><code>scores</code> adalah input berupa tiga nilai.</li>
<li><code>sum(scores)</code> menjumlahkan nilai dan <code>len(scores)</code> menghitung jumlah data.</li>
<li>Hasil process disimpan dalam <code>average</code>.</li>
<li><code>print()</code> menampilkan output.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li>Coding sebelum mengetahui output yang diinginkan.</li>
<li>Tidak mempertimbangkan input kosong atau salah format.</li>
<li>Menggabungkan semua proses dalam satu langkah besar.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Tulis contoh input dan expected output.</li>
<li>Pecah process menjadi langkah kecil.</li>
<li>Uji dengan kasus normal dan kasus tidak biasa.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Tuliskan input–process–output untuk program yang menghitung persentase kehadiran peserta.</p>
<h2>Ringkasan</h2>
<p>Computational thinking mengubah masalah menjadi data masuk, langkah yang eksplisit, dan hasil yang dapat diperiksa.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Kita sekarang menerjemahkan alur tersebut menjadi sintaks dasar Python.</p>
<hr>

````
