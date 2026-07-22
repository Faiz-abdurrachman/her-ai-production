# Submateri 3 — Chain-of-Thought dan Langkah Penyelesaian Terstruktur

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/04-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Submateri 3 — Chain-of-Thought dan Langkah Penyelesaian Terstruktur

#### 3.1 Pembuka: Jawaban Akhir dan Langkah Perantara

Bandingkan dua jawaban berikut.

##### Jawaban Langsung

> “Anggaran cukup.”

##### Jawaban Terstruktur

> “Total konsumsi Rp2.100.000. Setelah ditambah biaya administrasi Rp250.000, total kebutuhan menjadi Rp2.350.000. Dari anggaran Rp3.000.000, tersisa Rp650.000. Jadi, anggaran cukup.”

Jawaban kedua lebih mudah diperiksa karena pengguna dapat melihat:

-   data yang dipakai;
-   operasi yang dilakukan;
-   hasil antara;
-   dasar kesimpulan.

#### 3.2 Apa Itu Chain-of-Thought?

**Chain-of-Thought (CoT)** adalah rangkaian langkah perantara berbentuk bahasa yang dihasilkan model sebelum atau bersama jawaban akhir.

    Pertanyaan
       ↓
    Langkah perantara
       ↓
    Pemeriksaan
       ↓
    Jawaban akhir

Penelitian Chain-of-Thought menunjukkan bahwa contoh yang berisi langkah reasoning perantara dapat meningkatkan performa model besar pada beberapa tugas aritmetika, commonsense, dan symbolic reasoning dalam eksperimen yang diuji [2].

> **Istilah yang disarankan untuk peserta:** “Langkah penyelesaian yang dapat diperiksa.”

CoT tidak boleh digambarkan sebagai:

-   isi pikiran rahasia AI;
-   rekaman lengkap proses mental;
-   bukti kesadaran;
-   jaminan bahwa alasan model benar.

#### 3.3 Bentuk Langkah Perantara

##### A. Langkah Aritmetika

    jumlah × harga
    → total biaya
    → tambah biaya lain
    → bandingkan dengan anggaran

##### B. Pelacakan Batasan

    durasi maksimal 120 menit
    → susun sesi
    → jumlahkan durasi
    → kurangi atau ubah sesi jika melebihi batas

##### C. Perbandingan Alternatif

    Alternatif A
    → kelebihan
    → kekurangan
    → risiko

    Alternatif B
    → kelebihan
    → kekurangan
    → risiko

##### D. Multi-Hop Reasoning

    Informasi A berhubungan dengan B
    B berhubungan dengan C
    hubungan A dan C diperiksa melalui B

##### E. Troubleshooting

    Gejala
    → kemungkinan penyebab
    → pemeriksaan
    → hasil pemeriksaan
    → penyebab berikutnya atau solusi

* * * * *

#### 3.4 Zero-Shot dan Few-Shot Chain-of-Thought

##### Zero-Shot Structured Instruction

Pengguna meminta penyelesaian bertahap tanpa memberi contoh.

    Identifikasi tujuan dan data penting.
    Susun langkah penyelesaian.
    Kerjakan langkah tersebut.
    Periksa hasilnya.
    Berikan jawaban akhir secara ringkas.

Penelitian Zero-Shot-CoT menunjukkan bahwa instruksi sederhana yang mendorong penyelesaian bertahap dapat meningkatkan performa pada sejumlah benchmark reasoning untuk model yang diuji [3].

##### Few-Shot Chain-of-Thought

Prompt memberikan contoh soal dan langkah penyelesaiannya, lalu meminta model menyelesaikan soal baru menggunakan pola serupa.

    Contoh 1:
    Pertanyaan → langkah → jawaban

    Contoh 2:
    Pertanyaan → langkah → jawaban

    Tugas baru:
    Pertanyaan → model melanjutkan pola

Kualitas contoh sangat penting. Contoh yang salah, tidak relevan, atau terlalu berbeda dapat mengarahkan model ke pola yang buruk.

* * * * *

#### 3.5 CoT Bukan Sekadar Penjelasan Panjang

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Penjelasan Panjang
Langkah Terstruktur</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Banyak kalimat
Setiap langkah memiliki fungsi</td>
<td align="left">Dapat berulang
Ringkas dan berurutan</td>
</tr>
</tbody>
</table>

Langkah terstruktur yang baik seharusnya:

-   relevan terhadap tugas;
-   mengikuti urutan;
-   menggunakan data yang tersedia;
-   menyatakan asumsi penting;
-   tidak berulang;
-   menghasilkan output yang dapat diperiksa;
-   berakhir pada jawaban yang jelas.

* * * * *

#### 3.6 Contoh Terurai 1 — Anggaran

##### Data

    Peserta: 80
    Biaya konsumsi: Rp27.500 per peserta
    Transportasi: Rp350.000
    Anggaran: Rp3.000.000

##### Langkah

    1. Hitung konsumsi:
       80 × Rp27.500 = Rp2.200.000

    2. Tambahkan transportasi:
       Rp2.200.000 + Rp350.000 = Rp2.550.000

    3. Hitung sisa:
       Rp3.000.000 − Rp2.550.000 = Rp450.000

    4. Kesimpulan:
       Anggaran cukup dengan sisa Rp450.000.

##### Contoh Kesalahan

    80 × Rp27.500 = Rp2.020.000

Meskipun struktur langkahnya terlihat benar, hasil perkalian salah. Inilah alasan CoT tetap perlu diverifikasi.

* * * * *

#### 3.7 Contoh Terurai 2 — Rencana Belajar Python

##### Kasus

> Peserta pemula memiliki waktu satu jam per hari dan ingin belajar Python selama dua minggu.

##### Langkah Terstruktur

1.  Identifikasi kemampuan awal.
2.  Tentukan hasil yang realistis untuk 14 jam belajar.
3.  Pilih materi minimum:
4.  sintaks dasar;
5.  variabel dan tipe data;
6.  kondisi;
7.  perulangan;
8.  fungsi;
9.  struktur data sederhana.
10. Sisipkan praktik setiap hari.
11. Sisakan satu hari untuk proyek kecil.
12. Sisakan satu hari untuk evaluasi dan perbaikan.
13. Periksa agar durasi setiap hari tidak melebihi satu jam.

CoT tidak hanya berguna untuk soal matematika. Langkah perantara juga dapat membantu tugas perencanaan, analisis, perbandingan, dan troubleshooting.

* * * * *

#### 3.8 Kapan Chain-of-Thought Berguna?

CoT atau langkah terstruktur dapat berguna pada:

-   masalah multi-langkah;
-   perhitungan;
-   perencanaan;
-   analisis perbandingan;
-   tugas dengan banyak batasan;
-   troubleshooting;
-   pemeriksaan konsistensi;
-   evaluasi beberapa alternatif.

#### 3.9 Kapan Chain-of-Thought Tidak Perlu Dipaksakan?

CoT tidak selalu diperlukan pada:

-   pertanyaan fakta sederhana;
-   terjemahan satu kalimat;
-   perbaikan typo;
-   perubahan format;
-   jawaban satu langkah;
-   kondisi ketika pengguna hanya membutuhkan hasil sangat ringkas.

Penjelasan yang terlalu panjang dapat:

-   memperlambat respons;
-   menambah token;
-   menambah peluang kesalahan;
-   mengaburkan jawaban utama;
-   membuat pengguna sulit menemukan hasil.

* * * * *

#### 3.10 Faithfulness: Apakah Langkah AI Selalu Menunjukkan Proses yang Sebenarnya?

Teks langkah penyelesaian yang dihasilkan model tidak selalu menjadi gambaran lengkap atau setia dari seluruh faktor yang memengaruhi jawabannya.

Penelitian tentang *unfaithful explanations* menunjukkan bahwa model dapat dipengaruhi petunjuk bias dalam prompt tanpa menyebutkan pengaruh tersebut dalam penjelasan, bahkan dapat membuat alasan yang merasionalisasi jawaban salah [7].

Kemungkinan yang perlu dipahami:

-   model menghasilkan alasan setelah memilih jawaban;
-   model mengikuti pola penjelasan yang terdengar masuk akal;
-   petunjuk tertentu memengaruhi jawaban tetapi tidak diakui;
-   langkah terlihat benar, tetapi hasil salah;
-   hasil benar, tetapi sebagian langkah tidak valid.

> **Prinsip penting:** Chain-of-Thought membantu struktur dan pemeriksaan, tetapi bukan bukti mutlak bahwa model benar-benar menggunakan alasan yang ditampilkan.

* * * * *

#### 3.11 Pola Prompt Praktis

##### Template Lengkap

    Tugas:
    [masukkan masalah]

    Kerjakan dengan format:
    1. Tujuan
    2. Informasi yang tersedia
    3. Informasi yang belum tersedia
    4. Batasan atau asumsi
    5. Langkah penyelesaian utama
    6. Pemeriksaan
    7. Jawaban akhir

##### Template Ringkas

    Berikan langkah utama yang dapat diverifikasi,
    kemudian tampilkan jawaban akhir secara ringkas.

##### Template Perbandingan

    Bandingkan alternatif A dan B berdasarkan:
    - manfaat;
    - biaya;
    - risiko;
    - batasan;
    - rekomendasi akhir.

##### Template Verifikasi

    Periksa kembali jawaban berikut.
    Cari kesalahan data, asumsi, urutan, perhitungan,
    dan kesimpulan. Tulis hanya perbaikan yang diperlukan.

Hindari instruksi:

> “Ungkapkan seluruh pikiran internalmu.”

Fokus pembelajaran sebaiknya pada **langkah utama yang dapat diverifikasi**, bukan klaim akses ke proses internal model.

* * * * *

#### 3.12 Cara Memeriksa CoT

    □ Setiap langkah relevan terhadap tujuan
    □ Data yang digunakan tersedia
    □ Asumsi disebutkan
    □ Urutan langkah benar
    □ Tidak ada langkah yang hilang
    □ Perhitungan dapat diulang
    □ Tidak ada kontradiksi
    □ Kesimpulan mengikuti langkah
    □ Jawaban akhir mudah ditemukan
    □ Penjelasan tidak terlalu panjang

* * * * *

#### 3.13 Ringkasan Submateri

-   CoT adalah rangkaian langkah perantara berbentuk bahasa.
-   CoT dapat membantu tugas bertahap dan membuat jawaban lebih mudah diperiksa.
-   Zero-shot CoT menggunakan instruksi bertahap tanpa contoh.
-   Few-shot CoT menggunakan contoh langkah penyelesaian.
-   CoT bukan sekadar penjelasan panjang.
-   CoT tidak menjamin jawaban benar.
-   CoT tidak selalu menjadi penjelasan setia tentang seluruh faktor internal model.
-   Gunakan langkah utama yang dapat diverifikasi dan jawaban akhir yang jelas.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Submateri 3 — Chain-of-Thought dan Langkah Penyelesaian Terstruktur</h1>
<h2>3.1 Pembuka: Jawaban Akhir dan Langkah Perantara</h2>
<p>Bandingkan dua jawaban berikut.</p>
<h3>Jawaban Langsung</h3>
<blockquote>
<p>“Anggaran cukup.”</p>
</blockquote>
<h3>Jawaban Terstruktur</h3>
<blockquote>
<p>“Total konsumsi Rp2.100.000. Setelah ditambah biaya administrasi Rp250.000, total kebutuhan menjadi Rp2.350.000. Dari anggaran Rp3.000.000, tersisa Rp650.000. Jadi, anggaran cukup.”</p>
</blockquote>
<p>Jawaban kedua lebih mudah diperiksa karena pengguna dapat melihat:</p>
<ul>
<li>data yang dipakai;</li>
<li>operasi yang dilakukan;</li>
<li>hasil antara;</li>
<li>dasar kesimpulan.</li>
</ul>
<h2>3.2 Apa Itu Chain-of-Thought?</h2>
<p><strong>Chain-of-Thought (CoT)</strong> adalah rangkaian langkah perantara berbentuk bahasa yang dihasilkan model sebelum atau bersama jawaban akhir.</p>
<pre><code class="language-text">Pertanyaan
   ↓
Langkah perantara
   ↓
Pemeriksaan
   ↓
Jawaban akhir
</code></pre>
<p>Penelitian Chain-of-Thought menunjukkan bahwa contoh yang berisi langkah reasoning perantara dapat meningkatkan performa model besar pada beberapa tugas aritmetika, commonsense, dan symbolic reasoning dalam eksperimen yang diuji [2].</p>
<blockquote>
<p><strong>Istilah yang disarankan untuk peserta:</strong> “Langkah penyelesaian yang dapat diperiksa.”</p>
</blockquote>
<p>CoT tidak boleh digambarkan sebagai:</p>
<ul>
<li>isi pikiran rahasia AI;</li>
<li>rekaman lengkap proses mental;</li>
<li>bukti kesadaran;</li>
<li>jaminan bahwa alasan model benar.</li>
</ul>
<h2>3.3 Bentuk Langkah Perantara</h2>
<h3>A. Langkah Aritmetika</h3>
<pre><code class="language-text">jumlah × harga
→ total biaya
→ tambah biaya lain
→ bandingkan dengan anggaran
</code></pre>
<h3>B. Pelacakan Batasan</h3>
<pre><code class="language-text">durasi maksimal 120 menit
→ susun sesi
→ jumlahkan durasi
→ kurangi atau ubah sesi jika melebihi batas
</code></pre>
<h3>C. Perbandingan Alternatif</h3>
<pre><code class="language-text">Alternatif A
→ kelebihan
→ kekurangan
→ risiko

Alternatif B
→ kelebihan
→ kekurangan
→ risiko
</code></pre>
<h3>D. Multi-Hop Reasoning</h3>
<pre><code class="language-text">Informasi A berhubungan dengan B
B berhubungan dengan C
hubungan A dan C diperiksa melalui B
</code></pre>
<h3>E. Troubleshooting</h3>
<pre><code class="language-text">Gejala
→ kemungkinan penyebab
→ pemeriksaan
→ hasil pemeriksaan
→ penyebab berikutnya atau solusi
</code></pre>
<hr />
<h2>3.4 Zero-Shot dan Few-Shot Chain-of-Thought</h2>
<h3>Zero-Shot Structured Instruction</h3>
<p>Pengguna meminta penyelesaian bertahap tanpa memberi contoh.</p>
<pre><code class="language-text">Identifikasi tujuan dan data penting.
Susun langkah penyelesaian.
Kerjakan langkah tersebut.
Periksa hasilnya.
Berikan jawaban akhir secara ringkas.
</code></pre>
<p>Penelitian Zero-Shot-CoT menunjukkan bahwa instruksi sederhana yang mendorong penyelesaian bertahap dapat meningkatkan performa pada sejumlah benchmark reasoning untuk model yang diuji [3].</p>
<h3>Few-Shot Chain-of-Thought</h3>
<p>Prompt memberikan contoh soal dan langkah penyelesaiannya, lalu meminta model menyelesaikan soal baru menggunakan pola serupa.</p>
<pre><code class="language-text">Contoh 1:
Pertanyaan → langkah → jawaban

Contoh 2:
Pertanyaan → langkah → jawaban

Tugas baru:
Pertanyaan → model melanjutkan pola
</code></pre>
<p>Kualitas contoh sangat penting. Contoh yang salah, tidak relevan, atau terlalu berbeda dapat mengarahkan model ke pola yang buruk.</p>
<hr />
<h2>3.5 CoT Bukan Sekadar Penjelasan Panjang</h2>
<table>
<thead>
<tr>
<th>Penjelasan Panjang</th>
<th>Langkah Terstruktur</th>
</tr>
</thead>
<tbody>
<tr>
<td>Banyak kalimat</td>
<td>Setiap langkah memiliki fungsi</td>
</tr>
<tr>
<td>Dapat berulang</td>
<td>Ringkas dan berurutan</td>
</tr>
<tr>
<td>Tidak selalu dapat diverifikasi</td>
<td>Data dan operasi dapat diperiksa</td>
</tr>
<tr>
<td>Dapat menyembunyikan inti jawaban</td>
<td>Memisahkan proses dan jawaban akhir</td>
</tr>
</tbody>
</table>
<p>Langkah terstruktur yang baik seharusnya:</p>
<ul>
<li>relevan terhadap tugas;</li>
<li>mengikuti urutan;</li>
<li>menggunakan data yang tersedia;</li>
<li>menyatakan asumsi penting;</li>
<li>tidak berulang;</li>
<li>menghasilkan output yang dapat diperiksa;</li>
<li>berakhir pada jawaban yang jelas.</li>
</ul>
<hr />
<h2>3.6 Contoh Terurai 1 — Anggaran</h2>
<h3>Data</h3>
<pre><code class="language-text">Peserta: 80
Biaya konsumsi: Rp27.500 per peserta
Transportasi: Rp350.000
Anggaran: Rp3.000.000
</code></pre>
<h3>Langkah</h3>
<pre><code class="language-text">1. Hitung konsumsi:
   80 × Rp27.500 = Rp2.200.000

2. Tambahkan transportasi:
   Rp2.200.000 + Rp350.000 = Rp2.550.000

3. Hitung sisa:
   Rp3.000.000 − Rp2.550.000 = Rp450.000

4. Kesimpulan:
   Anggaran cukup dengan sisa Rp450.000.
</code></pre>
<h3>Contoh Kesalahan</h3>
<pre><code class="language-text">80 × Rp27.500 = Rp2.020.000
</code></pre>
<p>Meskipun struktur langkahnya terlihat benar, hasil perkalian salah. Inilah alasan CoT tetap perlu diverifikasi.</p>
<hr />
<h2>3.7 Contoh Terurai 2 — Rencana Belajar Python</h2>
<h3>Kasus</h3>
<blockquote>
<p>Peserta pemula memiliki waktu satu jam per hari dan ingin belajar Python selama dua minggu.</p>
</blockquote>
<h3>Langkah Terstruktur</h3>
<ol>
<li>Identifikasi kemampuan awal.</li>
<li>Tentukan hasil yang realistis untuk 14 jam belajar.</li>
<li>Pilih materi minimum:</li>
<li>sintaks dasar;</li>
<li>variabel dan tipe data;</li>
<li>kondisi;</li>
<li>perulangan;</li>
<li>fungsi;</li>
<li>struktur data sederhana.</li>
<li>Sisipkan praktik setiap hari.</li>
<li>Sisakan satu hari untuk proyek kecil.</li>
<li>Sisakan satu hari untuk evaluasi dan perbaikan.</li>
<li>Periksa agar durasi setiap hari tidak melebihi satu jam.</li>
</ol>
<p>CoT tidak hanya berguna untuk soal matematika. Langkah perantara juga dapat membantu tugas perencanaan, analisis, perbandingan, dan troubleshooting.</p>
<hr />
<h2>3.8 Kapan Chain-of-Thought Berguna?</h2>
<p>CoT atau langkah terstruktur dapat berguna pada:</p>
<ul>
<li>masalah multi-langkah;</li>
<li>perhitungan;</li>
<li>perencanaan;</li>
<li>analisis perbandingan;</li>
<li>tugas dengan banyak batasan;</li>
<li>troubleshooting;</li>
<li>pemeriksaan konsistensi;</li>
<li>evaluasi beberapa alternatif.</li>
</ul>
<h2>3.9 Kapan Chain-of-Thought Tidak Perlu Dipaksakan?</h2>
<p>CoT tidak selalu diperlukan pada:</p>
<ul>
<li>pertanyaan fakta sederhana;</li>
<li>terjemahan satu kalimat;</li>
<li>perbaikan typo;</li>
<li>perubahan format;</li>
<li>jawaban satu langkah;</li>
<li>kondisi ketika pengguna hanya membutuhkan hasil sangat ringkas.</li>
</ul>
<p>Penjelasan yang terlalu panjang dapat:</p>
<ul>
<li>memperlambat respons;</li>
<li>menambah token;</li>
<li>menambah peluang kesalahan;</li>
<li>mengaburkan jawaban utama;</li>
<li>membuat pengguna sulit menemukan hasil.</li>
</ul>
<hr />
<h2>3.10 Faithfulness: Apakah Langkah AI Selalu Menunjukkan Proses yang Sebenarnya?</h2>
<p>Teks langkah penyelesaian yang dihasilkan model tidak selalu menjadi gambaran lengkap atau setia dari seluruh faktor yang memengaruhi jawabannya.</p>
<p>Penelitian tentang <em>unfaithful explanations</em> menunjukkan bahwa model dapat dipengaruhi petunjuk bias dalam prompt tanpa menyebutkan pengaruh tersebut dalam penjelasan, bahkan dapat membuat alasan yang merasionalisasi jawaban salah [7].</p>
<p>Kemungkinan yang perlu dipahami:</p>
<ul>
<li>model menghasilkan alasan setelah memilih jawaban;</li>
<li>model mengikuti pola penjelasan yang terdengar masuk akal;</li>
<li>petunjuk tertentu memengaruhi jawaban tetapi tidak diakui;</li>
<li>langkah terlihat benar, tetapi hasil salah;</li>
<li>hasil benar, tetapi sebagian langkah tidak valid.</li>
</ul>
<blockquote>
<p><strong>Prinsip penting:</strong> Chain-of-Thought membantu struktur dan pemeriksaan, tetapi bukan bukti mutlak bahwa model benar-benar menggunakan alasan yang ditampilkan.</p>
</blockquote>
<hr />
<h2>3.11 Pola Prompt Praktis</h2>
<h3>Template Lengkap</h3>
<pre><code class="language-text">Tugas:
[masukkan masalah]

Kerjakan dengan format:
1. Tujuan
2. Informasi yang tersedia
3. Informasi yang belum tersedia
4. Batasan atau asumsi
5. Langkah penyelesaian utama
6. Pemeriksaan
7. Jawaban akhir
</code></pre>
<h3>Template Ringkas</h3>
<pre><code class="language-text">Berikan langkah utama yang dapat diverifikasi,
kemudian tampilkan jawaban akhir secara ringkas.
</code></pre>
<h3>Template Perbandingan</h3>
<pre><code class="language-text">Bandingkan alternatif A dan B berdasarkan:
- manfaat;
- biaya;
- risiko;
- batasan;
- rekomendasi akhir.
</code></pre>
<h3>Template Verifikasi</h3>
<pre><code class="language-text">Periksa kembali jawaban berikut.
Cari kesalahan data, asumsi, urutan, perhitungan,
dan kesimpulan. Tulis hanya perbaikan yang diperlukan.
</code></pre>
<p>Hindari instruksi:</p>
<blockquote>
<p>“Ungkapkan seluruh pikiran internalmu.”</p>
</blockquote>
<p>Fokus pembelajaran sebaiknya pada <strong>langkah utama yang dapat diverifikasi</strong>, bukan klaim akses ke proses internal model.</p>
<hr />
<h2>3.12 Cara Memeriksa CoT</h2>
<pre><code class="language-text">□ Setiap langkah relevan terhadap tujuan
□ Data yang digunakan tersedia
□ Asumsi disebutkan
□ Urutan langkah benar
□ Tidak ada langkah yang hilang
□ Perhitungan dapat diulang
□ Tidak ada kontradiksi
□ Kesimpulan mengikuti langkah
□ Jawaban akhir mudah ditemukan
□ Penjelasan tidak terlalu panjang
</code></pre>
<hr />
<h2>3.13 Ringkasan Submateri</h2>
<ul>
<li>CoT adalah rangkaian langkah perantara berbentuk bahasa.</li>
<li>CoT dapat membantu tugas bertahap dan membuat jawaban lebih mudah diperiksa.</li>
<li>Zero-shot CoT menggunakan instruksi bertahap tanpa contoh.</li>
<li>Few-shot CoT menggunakan contoh langkah penyelesaian.</li>
<li>CoT bukan sekadar penjelasan panjang.</li>
<li>CoT tidak menjamin jawaban benar.</li>
<li>CoT tidak selalu menjadi penjelasan setia tentang seluruh faktor internal model.</li>
<li>Gunakan langkah utama yang dapat diverifikasi dan jawaban akhir yang jelas.</li>
</ul>
<hr />

````
