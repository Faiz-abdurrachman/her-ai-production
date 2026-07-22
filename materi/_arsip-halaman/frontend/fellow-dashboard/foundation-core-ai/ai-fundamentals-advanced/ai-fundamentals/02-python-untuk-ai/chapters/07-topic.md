# Chapter 12 — Ekosistem Python untuk AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/07-topic.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 12 — Ekosistem Python untuk AI

#### Learning Objectives

-   Mengenali library utama dalam workflow AI.
-   Memilih library berdasarkan masalah.
-   Memahami package sebagai kemampuan tambahan, bukan tujuan belajar.

#### Kenapa Materi Ini Penting?

Pemula sering kewalahan oleh banyak nama library yang bermunculan setiap tahun. Rasa ingin memasang semuanya sangat kuat, padahal setiap library lahir untuk menyelesaikan masalah spesifik. Chapter ini tidak akan mengajarkan semua library secara mendalam. Tujuannya lebih sederhana: memberi peta sehingga kamu tahu library apa yang cocok untuk masalah apa, dan tidak panic saat membaca tutorial yang menyebut NumPy, Pandas, Scikit-learn, atau PyTorch.

Peta ini penting karena workflow AI melibatkan beberapa tahap yang masing-masing membutuhkan alat berbeda. Tahap data tabular paling efisien dengan Pandas, komputasi numerik dengan NumPy, visualisasi dengan Matplotlib, dan machine learning dengan Scikit-learn atau PyTorch. Tidak ada satu library yang mengerjakan semuanya dengan optimal. Memahami peran masing-masing membantu kamu memilih alat yang tepat tanpa membuang waktu mempelajari yang tidak relevan.

Pada modul ini kita hanya akan mendalami NumPy dan Pandas secara langsung. Library lain akan kamu temui di modul-modul berikutnya. Namun peta keseluruhan tetap penting agar setiap library baru yang kamu pelajari nanti memiliki tempat yang jelas dalam workflow.

#### Hubungan dengan AI

Ekosistem library Python mencakup seluruh tahap workflow AI: dari pengambilan data (requests, BeautifulSoup), penyimpanan (SQLAlchemy, PyArrow), pemrosesan (NumPy, Pandas), visualisasi (Matplotlib, Seaborn), machine learning (Scikit-learn, XGBoost), deep learning (PyTorch, TensorFlow), hingga deployment (FastAPI, Flask). Setiap tahap memiliki library yang menjadi standar di industrinya masing-masing.

Pada tahap ini, fokus kita adalah pada library yang menangani data tabular dan komputasi numerik—yaitu NumPy dan Pandas. Keduanya adalah fondasi yang hampir selalu muncul sebelum library machine learning digunakan. Jika kamu memahami keduanya dengan baik, belajar Scikit-learn atau PyTorch nanti akan jauh lebih lancar karena pola datanya sudah familiar.

#### Analogi

Python adalah smartphone; library adalah aplikasi di dalamnya. Kamu tidak memasang semua aplikasi yang ada di App Store atau Play Store—kamu memasang yang kamu butuhkan. Sama halnya dengan library: instal NumPy ketika perlu komputasi array, instal Pandas ketika perlu tabel, instal Matplotlib ketika perlu grafik. Memasang library tanpa kebutuhan hanya menambah kompleksitas environment dan memperlambat proses belajar.

Lebih penting lagi: memiliki banyak aplikasi di smartphone tidak membuatmu jago menggunakan semuanya. Sama dengan library—memasang Scikit-learn tidak berarti kamu sudah bisa machine learning. Kuasai satu library untuk satu kebutuhan, lalu perluas secara bertahap.

#### Penjelasan Konsep

Library dalam ekosistem Python dapat dikelompokkan berdasarkan tahap workflow AI yang mereka dukung. Tabel berikut menunjukkan library utama dan peran ringkasnya. Kamu tidak perlu menghafal semuanya; cukup pahami kategori dan fungsi masing-masing agar ketika tutorial atau dokumentasi menyebut nama library tersebut, kamu memiliki gambaran tentang apa yang dilakukannya.

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Library
Peran ringkas</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">NumPy
Array dan komputasi numerik</td>
<td align="left">Pandas
Data tabular dan cleaning</td>
</tr>
</tbody>
</table>

Dari tabel di atas, perhatikan bahwa Scikit-learn, PyTorch, TensorFlow, Transformers, dan OpenCV diberi label "modul berikutnya" atau "modul lanjutan". Ini berarti kita belum menggunakannya sekarang. Fokus modul ini adalah NumPy (komputasi array) dan Pandas (data tabular)—dua library yang menjadi fondasi sebelum library machine learning mana pun.

#### Visual Thinking

    Data tabular ─ Pandas ─ NumPy ─ visualisasi
                                  ├─ Scikit-learn (nanti)
                                  ├─ PyTorch/TensorFlow (nanti)
    Teks/gambar ─ Transformers/OpenCV (nanti)

#### Contoh Nyata

Pandas membaca file nilai, NumPy menghitung statistik, Matplotlib membuat grafik.

#### Contoh AI

Pada project lanjutan, Scikit-learn atau framework lain menerima data yang sudah disiapkan. Kualitas tahap persiapan tetap penting.

#### Kode Python

    import numpy as np
    import pandas as pd

    print(np.__name__)
    print(pd.__name__)

#### Penjelasan Kode Baris per Baris

1.  NumPy diimpor dengan alias konvensional `np`.
2.  Pandas diimpor dengan alias `pd`.
3.  Nama module ditampilkan sebagai pemeriksaan sederhana.

#### Common Mistakes

-   **Memasang semua library sekaligus.** Ini membuat environment membengkak, dependency sulit dikelola, dan kamu tidak benar-benar memahami library mana yang dipakai untuk apa. Instal hanya library yang kamu butuhkan untuk tugas saat ini.
-   **Mengimpor package yang tidak dipakai.** Import yang tidak terpakai membuat kode lebih sulit dibaca dan memberikan kesan bahwa library tertentu diperlukan padahal tidak. Hapus import yang tidak digunakan.
-   **Mengira library menggantikan pemahaman data.** Library adalah alat. Memanggil fungsi cleaning tidak berarti data sudah bersih jika kamu tidak memahami aturan cleaning yang tepat untuk konteksmu.

#### Best Practices

-   **Mulai dari kebutuhan workflow.** Tentukan dulu apa yang perlu dilakukan terhadap data, baru pilih library yang sesuai. Jangan memilih library dulu lalu mencari masalah yang cocok.
-   **Gunakan dokumentasi resmi.** Dokumentasi resmi NumPy, Pandas, dan library lain adalah sumber kebenaran. Tutorial pihak ketiga boleh dipakai untuk gambaran awal, tapi jangan dijadikan satu-satunya referensi.
-   **Catat dependency project.** Simpan daftar library yang digunakan dalam requirements.txt agar environment dapat dibangun ulang oleh anggota tim lain atau oleh dirimu sendiri di masa depan.

#### Mini Challenge

Pilih library yang paling relevan untuk: tabel CSV, array angka, grafik, gambar, dan Deep Learning. Jelaskan alasannya satu kalimat.

#### Ringkasan

Ekosistem library Python sangat luas, tetapi kamu tidak perlu menguasai semuanya sekaligus. Kuncinya adalah memahami peran setiap library dalam workflow AI dan memilih yang sesuai dengan kebutuhan tahap saat ini. Pada modul ini, NumPy dan Pandas adalah dua library yang akan kita gunakan secara langsung—sisanya akan muncul secara alami di modul-modul berikutnya. Yang terpenting: library adalah alat, bukan tujuan. Memahami data dan masalah yang ingin diselesaikan jauh lebih penting daripada menghafal API library.

#### Persiapan Chapter Berikutnya

Kita mulai dari NumPy untuk memahami operasi pada sekumpulan angka.

* * * * *

### Chapter 13 — NumPy: Komputasi Numerik dalam Array

#### Learning Objectives

-   Membuat NumPy array dan membaca `shape`.
-   Melakukan operasi vectorized sederhana.
-   Menghitung statistik sambil menangani `NaN`.

#### Kenapa Materi Ini Penting?

Dalam workflow data, kamu sering perlu melakukan operasi yang sama pada sekumpulan angka: menghitung rata-rata, mencari nilai tertinggi, atau menormalisasi data ke skala tertentu. Dengan list Python biasa, operasi semacam itu membutuhkan loop manual yang panjang dan rawan error. NumPy array menyediakan cara yang lebih ringkas dan lebih cepat—dengan operasi vectorized, satu baris kode dapat menggantikan satu blok loop.

Perbedaan kecepatan juga signifikan untuk dataset berukuran sedang ke besar. Operasi pada array NumPy dijalankan dalam kode C di belakang layar, bukan dalam Python loop yang lambat. Pada modul ini dataset yang kita pakai masih kecil, jadi perbedaan kecepatan mungkin tidak terasa. Namun kebiasaan menulis operasi vectorized akan sangat berguna ketika kamu mulai menangani dataset ribuan atau jutaan baris.

Selain kecepatan, array NumPy juga memberikan informasi struktur data melalui shape dan dtype. Informasi ini berguna untuk memvalidasi apakah data yang akan diproses memiliki bentuk yang diharapkan—misalnya 100 baris dan 5 kolom—sebelum operasi dilakukan.

#### Hubungan dengan AI

Data numerik dalam workflow AI hampir selalu direpresentasikan sebagai array—baik itu satu dimensi (vektor fitur), dua dimensi (tabel), atau dimensi lebih tinggi (tensor gambar). NumPy adalah fondasi untuk representasi ini. Library seperti Pandas menggunakan NumPy di dalamnya; Scikit-learn dan PyTorch juga menerima dan mengembalikan array NumPy.

Pada chapter ini kita tidak membahas tensor, model, atau machine learning. Fokusnya adalah pada cara berpikir data berdimensi: apa artinya suatu data memiliki shape (5,), (3, 4), atau (2, 3, 4)? Bagaimana operasi diterapkan pada seluruh elemen tanpa menulis loop? Pemahaman ini akan langsung berguna ketika nanti kamu bekerja dengan dataset yang lebih besar dan kompleks.

#### Analogi

List Python seperti kotak campuran yang bisa berisi angka, teks, dan benda lain secara bersamaan. Setiap kali kamu ingin menjumlahkan semua angka, kamu harus mengambil satu per satu secara manual. NumPy array seperti rak angka yang rapi: semua elemen memiliki tipe yang sama, tersusun dalam baris dan kolom yang jelas, dan kamu bisa memberi perintah seperti "jumlahkan semua" atau "kalikan setiap elemen dengan 2" tanpa harus menyentuh setiap kotak satu per satu.

Rak yang rapi ini juga memberitahu bentuknya melalui shape—apakah rak itu barisan panjang (vektor), persegi panjang (matriks), atau balok tiga dimensi (tensor). Informasi bentuk ini penting agar kamu tidak mencoba menjumlahkan rak yang tidak cocok ukurannya.

#### Penjelasan Konsep

**Array dan Shape.** NumPy array dibuat dari list Python dengan `np.array()`. Setiap array memiliki **shape** yang menunjukkan ukuran pada setiap dimensi: (5,) berarti array 1 dimensi dengan 5 elemen, (3, 4) berarti 3 baris dan 4 kolom. Shape adalah properti yang paling sering diperiksa karena operasi antar-array biasanya mensyaratkan shape yang kompatibel.

**Operasi Vectorized.** Alih-alih menulis loop untuk menjumlahkan setiap elemen, kamu cukup menulis `scores + 5` dan seluruh elemen akan ditambah 5 secara otomatis. Operasi vectorized berlaku untuk penjumlahan, pengurangan, perkalian, pembagian, perbandingan, dan fungsi matematika. Keuntungan utamanya adalah kode lebih pendek, lebih mudah dibaca, dan dieksekusi lebih cepat.

**Missing Value: NaN.** Dalam dataset nyata, hampir selalu ada nilai yang hilang. NumPy merepresentasikannya sebagai `np.nan` (Not a Number). Fungsi statistik biasa seperti `np.mean()` akan menghasilkan NaN jika ada satu saja nilai yang hilang. Untuk itu NumPy menyediakan fungsi nan-aware seperti `np.nanmean()`, `np.nansum()`, dan `np.nanstd()` yang secara otomatis mengabaikan NaN. Namun penting untuk diingat: mengabaikan NaN bukan berarti data yang hilang tidak penting. Kamu tetap perlu bertanya mengapa data tersebut hilang dan apakah penghilangannya memengaruhi kesimpulan.

**Boolean Masking.** Kamu dapat memilih elemen array berdasarkan kondisi, misalnya `scores[scores > 75]` untuk mengambil semua nilai di atas 75. Hasilnya adalah array baru yang hanya berisi elemen yang memenuhi kondisi. Teknik ini sangat berguna untuk filtering data tanpa loop.

#### Visual Thinking

    [[80, 90, 70],
     [88, 92, 84]]  → shape (2, 3)
       2 peserta, 3 penilaian

#### Contoh Nyata

Seorang panitia memiliki daftar 200 nilai peserta dalam format list Python. Ia ingin mengetahui rata-rata nilai, nilai tertinggi dan terendah, serta standar deviasi. Dengan list biasa, ia harus menulis loop atau menggunakan fungsi built-in sum() dan len() yang terbatas. Dengan NumPy, ia cukup mengubah list menjadi array dan memanggil `np.mean()`, `np.min()`, `np.max()`, dan `np.std()`—semuanya dalam beberapa baris tanpa loop manual.

Jika ada beberapa nilai yang hilang dalam data, `np.nanmean()` tetap dapat menghitung rata-rata dari nilai yang tersedia. Namun panitia harus mencatat berapa banyak data yang hilang dan melaporkannya sebagai bagian dari hasil.

#### Contoh AI

Array NumPy adalah format data standar yang digunakan oleh library Machine Learning. Ketika Scikit-learn menerima data pelatihan, data tersebut biasanya berupa array NumPy dua dimensi dengan shape (n\_samples, n\_features). Ketika PyTorch menerima data untuk deep learning, data dikonversi menjadi tensor yang mirip dengan NumPy array dengan dukungan GPU. Pada chapter ini kita belum masuk ke model tersebut, tetapi setiap operasi array yang kamu praktikkan sekarang—shape, broadcasting, boolean masking—adalah keterampilan yang akan kamu gunakan setiap hari dalam workflow AI.

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

-   **Mencampur shape yang tidak kompatibel.** Menjumlahkan array (3,) dan (4,) akan menghasilkan error karena bentuknya berbeda. Selalu periksa shape dengan `.shape` sebelum operasi antar-array.
-   **Mengabaikan dtype.** Jika array berisi campuran integer dan float, NumPy akan memilih dtype yang bisa menampung keduanya. Jika tidak sadar akan hal ini, kamu bisa mendapatkan hasil yang tidak diharapkan—misalnya pembagian integer yang menghasilkan angka bulat alih-alih desimal.
-   **Menghapus NaN tanpa memahami penyebab.** `np.isnan()` dan `np.nan_to_num()` memang mudah dipakai, tetapi menghapus atau mengganti NaN tanpa investigasi dapat menghilangkan informasi penting. Cari tahu dulu mengapa data hilang.

#### Best Practices

-   **Periksa `shape` dan `dtype`.** Sebelum operasi apa pun, ketahui bentuk dan tipe data array-mu. Ini mencegah error yang tidak terduga dan membantu memahami struktur data.
-   **Tentukan kebijakan missing value secara eksplisit.** Putuskan sejak awal: apakah NaN akan diabaikan, diisi dengan nilai tertentu, atau menyebabkan baris tersebut dibuang? Dokumentasikan keputusan ini.
-   **Gunakan operasi vectorized yang tetap mudah dibaca.** Operasi vectorized memang ringkas, tetapi jika satu baris kode terlalu padat hingga sulit dipahami, pecah menjadi beberapa baris yang lebih jelas. Keterbacaan tetap prioritas.

#### Mini Challenge

Buat array lima nilai termasuk satu `np.nan`. Tampilkan jumlah data valid, minimum, maksimum, dan rata-rata valid.

#### Ringkasan

NumPy adalah fondasi komputasi numerik dalam ekosistem Python AI. Array-nya menyediakan struktur data yang efisien, operasi vectorized yang ringkas, dan fungsi statistik yang menangani missing value. Tiga konsep utama yang perlu diingat: shape menentukan dimensi data, vectorized operation menggantikan loop manual, dan NaN adalah sinyal yang perlu diinvestigasi—bukan sekadar angka yang dibuang. Pemahaman ini akan langsung berguna ketika kamu mulai menggunakan Pandas di chapter berikutnya.

#### Persiapan Chapter Berikutnya

Array kuat untuk angka; Pandas menambahkan nama kolom dan baris agar data tabular lebih mudah dipahami.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 12 — Ekosistem Python untuk AI</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Mengenali library utama dalam workflow AI.</li>
<li>Memilih library berdasarkan masalah.</li>
<li>Memahami package sebagai kemampuan tambahan, bukan tujuan belajar.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Pemula sering kewalahan oleh banyak nama library yang bermunculan setiap tahun. Rasa ingin memasang semuanya sangat kuat, padahal setiap library lahir untuk menyelesaikan masalah spesifik. Chapter ini tidak akan mengajarkan semua library secara mendalam. Tujuannya lebih sederhana: memberi peta sehingga kamu tahu library apa yang cocok untuk masalah apa, dan tidak panic saat membaca tutorial yang menyebut NumPy, Pandas, Scikit-learn, atau PyTorch.</p>
<p>Peta ini penting karena workflow AI melibatkan beberapa tahap yang masing-masing membutuhkan alat berbeda. Tahap data tabular paling efisien dengan Pandas, komputasi numerik dengan NumPy, visualisasi dengan Matplotlib, dan machine learning dengan Scikit-learn atau PyTorch. Tidak ada satu library yang mengerjakan semuanya dengan optimal. Memahami peran masing-masing membantu kamu memilih alat yang tepat tanpa membuang waktu mempelajari yang tidak relevan.</p>
<p>Pada modul ini kita hanya akan mendalami NumPy dan Pandas secara langsung. Library lain akan kamu temui di modul-modul berikutnya. Namun peta keseluruhan tetap penting agar setiap library baru yang kamu pelajari nanti memiliki tempat yang jelas dalam workflow.</p>
<h2>Hubungan dengan AI</h2>
<p>Ekosistem library Python mencakup seluruh tahap workflow AI: dari pengambilan data (requests, BeautifulSoup), penyimpanan (SQLAlchemy, PyArrow), pemrosesan (NumPy, Pandas), visualisasi (Matplotlib, Seaborn), machine learning (Scikit-learn, XGBoost), deep learning (PyTorch, TensorFlow), hingga deployment (FastAPI, Flask). Setiap tahap memiliki library yang menjadi standar di industrinya masing-masing.</p>
<p>Pada tahap ini, fokus kita adalah pada library yang menangani data tabular dan komputasi numerik—yaitu NumPy dan Pandas. Keduanya adalah fondasi yang hampir selalu muncul sebelum library machine learning digunakan. Jika kamu memahami keduanya dengan baik, belajar Scikit-learn atau PyTorch nanti akan jauh lebih lancar karena pola datanya sudah familiar.</p>
<h2>Analogi</h2>
<p>Python adalah smartphone; library adalah aplikasi di dalamnya. Kamu tidak memasang semua aplikasi yang ada di App Store atau Play Store—kamu memasang yang kamu butuhkan. Sama halnya dengan library: instal NumPy ketika perlu komputasi array, instal Pandas ketika perlu tabel, instal Matplotlib ketika perlu grafik. Memasang library tanpa kebutuhan hanya menambah kompleksitas environment dan memperlambat proses belajar.</p>
<p>Lebih penting lagi: memiliki banyak aplikasi di smartphone tidak membuatmu jago menggunakan semuanya. Sama dengan library—memasang Scikit-learn tidak berarti kamu sudah bisa machine learning. Kuasai satu library untuk satu kebutuhan, lalu perluas secara bertahap.</p>
<h2>Penjelasan Konsep</h2>
<p>Library dalam ekosistem Python dapat dikelompokkan berdasarkan tahap workflow AI yang mereka dukung. Tabel berikut menunjukkan library utama dan peran ringkasnya. Kamu tidak perlu menghafal semuanya; cukup pahami kategori dan fungsi masing-masing agar ketika tutorial atau dokumentasi menyebut nama library tersebut, kamu memiliki gambaran tentang apa yang dilakukannya.</p>
<table>
<thead>
<tr>
<th>Library</th>
<th>Peran ringkas</th>
</tr>
</thead>
<tbody><tr>
<td>NumPy</td>
<td>Array dan komputasi numerik</td>
</tr>
<tr>
<td>Pandas</td>
<td>Data tabular dan cleaning</td>
</tr>
<tr>
<td>Matplotlib</td>
<td>Visualisasi dasar</td>
</tr>
<tr>
<td>Seaborn</td>
<td>Visualisasi statistik tingkat tinggi</td>
</tr>
<tr>
<td>Scikit-learn</td>
<td>Workflow Machine Learning klasik, modul berikutnya</td>
</tr>
<tr>
<td>PyTorch</td>
<td>Deep Learning, modul lanjutan</td>
</tr>
<tr>
<td>TensorFlow</td>
<td>Deep Learning, modul lanjutan</td>
</tr>
<tr>
<td>Hugging Face Transformers</td>
<td>Model bahasa/vision siap pakai, modul lanjutan</td>
</tr>
<tr>
<td>OpenCV</td>
<td>Pemrosesan gambar dan video, modul Computer Vision</td>
</tr>
</tbody></table>
<p>Dari tabel di atas, perhatikan bahwa Scikit-learn, PyTorch, TensorFlow, Transformers, dan OpenCV diberi label "modul berikutnya" atau "modul lanjutan". Ini berarti kita belum menggunakannya sekarang. Fokus modul ini adalah NumPy (komputasi array) dan Pandas (data tabular)—dua library yang menjadi fondasi sebelum library machine learning mana pun.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">Data tabular ─ Pandas ─ NumPy ─ visualisasi
                              ├─ Scikit-learn (nanti)
                              ├─ PyTorch/TensorFlow (nanti)
Teks/gambar ─ Transformers/OpenCV (nanti)
</code></pre>
<h2>Contoh Nyata</h2>
<p>Pandas membaca file nilai, NumPy menghitung statistik, Matplotlib membuat grafik.</p>
<h2>Contoh AI</h2>
<p>Pada project lanjutan, Scikit-learn atau framework lain menerima data yang sudah disiapkan. Kualitas tahap persiapan tetap penting.</p>
<h2>Kode Python</h2>
<pre><code class="language-python">import numpy as np
import pandas as pd

print(np.__name__)
print(pd.__name__)
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li>NumPy diimpor dengan alias konvensional <code>np</code>.</li>
<li>Pandas diimpor dengan alias <code>pd</code>.</li>
<li>Nama module ditampilkan sebagai pemeriksaan sederhana.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li><strong>Memasang semua library sekaligus.</strong> Ini membuat environment membengkak, dependency sulit dikelola, dan kamu tidak benar-benar memahami library mana yang dipakai untuk apa. Instal hanya library yang kamu butuhkan untuk tugas saat ini.</li>
<li><strong>Mengimpor package yang tidak dipakai.</strong> Import yang tidak terpakai membuat kode lebih sulit dibaca dan memberikan kesan bahwa library tertentu diperlukan padahal tidak. Hapus import yang tidak digunakan.</li>
<li><strong>Mengira library menggantikan pemahaman data.</strong> Library adalah alat. Memanggil fungsi cleaning tidak berarti data sudah bersih jika kamu tidak memahami aturan cleaning yang tepat untuk konteksmu.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li><strong>Mulai dari kebutuhan workflow.</strong> Tentukan dulu apa yang perlu dilakukan terhadap data, baru pilih library yang sesuai. Jangan memilih library dulu lalu mencari masalah yang cocok.</li>
<li><strong>Gunakan dokumentasi resmi.</strong> Dokumentasi resmi NumPy, Pandas, dan library lain adalah sumber kebenaran. Tutorial pihak ketiga boleh dipakai untuk gambaran awal, tapi jangan dijadikan satu-satunya referensi.</li>
<li><strong>Catat dependency project.</strong> Simpan daftar library yang digunakan dalam requirements.txt agar environment dapat dibangun ulang oleh anggota tim lain atau oleh dirimu sendiri di masa depan.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Pilih library yang paling relevan untuk: tabel CSV, array angka, grafik, gambar, dan Deep Learning. Jelaskan alasannya satu kalimat.</p>
<h2>Ringkasan</h2>
<p>Ekosistem library Python sangat luas, tetapi kamu tidak perlu menguasai semuanya sekaligus. Kuncinya adalah memahami peran setiap library dalam workflow AI dan memilih yang sesuai dengan kebutuhan tahap saat ini. Pada modul ini, NumPy dan Pandas adalah dua library yang akan kita gunakan secara langsung—sisanya akan muncul secara alami di modul-modul berikutnya. Yang terpenting: library adalah alat, bukan tujuan. Memahami data dan masalah yang ingin diselesaikan jauh lebih penting daripada menghafal API library.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Kita mulai dari NumPy untuk memahami operasi pada sekumpulan angka.</p>
<hr>
<h1>Chapter 13 — NumPy: Komputasi Numerik dalam Array</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Membuat NumPy array dan membaca <code>shape</code>.</li>
<li>Melakukan operasi vectorized sederhana.</li>
<li>Menghitung statistik sambil menangani <code>NaN</code>.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Dalam workflow data, kamu sering perlu melakukan operasi yang sama pada sekumpulan angka: menghitung rata-rata, mencari nilai tertinggi, atau menormalisasi data ke skala tertentu. Dengan list Python biasa, operasi semacam itu membutuhkan loop manual yang panjang dan rawan error. NumPy array menyediakan cara yang lebih ringkas dan lebih cepat—dengan operasi vectorized, satu baris kode dapat menggantikan satu blok loop.</p>
<p>Perbedaan kecepatan juga signifikan untuk dataset berukuran sedang ke besar. Operasi pada array NumPy dijalankan dalam kode C di belakang layar, bukan dalam Python loop yang lambat. Pada modul ini dataset yang kita pakai masih kecil, jadi perbedaan kecepatan mungkin tidak terasa. Namun kebiasaan menulis operasi vectorized akan sangat berguna ketika kamu mulai menangani dataset ribuan atau jutaan baris.</p>
<p>Selain kecepatan, array NumPy juga memberikan informasi struktur data melalui shape dan dtype. Informasi ini berguna untuk memvalidasi apakah data yang akan diproses memiliki bentuk yang diharapkan—misalnya 100 baris dan 5 kolom—sebelum operasi dilakukan.</p>
<h2>Hubungan dengan AI</h2>
<p>Data numerik dalam workflow AI hampir selalu direpresentasikan sebagai array—baik itu satu dimensi (vektor fitur), dua dimensi (tabel), atau dimensi lebih tinggi (tensor gambar). NumPy adalah fondasi untuk representasi ini. Library seperti Pandas menggunakan NumPy di dalamnya; Scikit-learn dan PyTorch juga menerima dan mengembalikan array NumPy.</p>
<p>Pada chapter ini kita tidak membahas tensor, model, atau machine learning. Fokusnya adalah pada cara berpikir data berdimensi: apa artinya suatu data memiliki shape (5,), (3, 4), atau (2, 3, 4)? Bagaimana operasi diterapkan pada seluruh elemen tanpa menulis loop? Pemahaman ini akan langsung berguna ketika nanti kamu bekerja dengan dataset yang lebih besar dan kompleks.</p>
<h2>Analogi</h2>
<p>List Python seperti kotak campuran yang bisa berisi angka, teks, dan benda lain secara bersamaan. Setiap kali kamu ingin menjumlahkan semua angka, kamu harus mengambil satu per satu secara manual. NumPy array seperti rak angka yang rapi: semua elemen memiliki tipe yang sama, tersusun dalam baris dan kolom yang jelas, dan kamu bisa memberi perintah seperti "jumlahkan semua" atau "kalikan setiap elemen dengan 2" tanpa harus menyentuh setiap kotak satu per satu.</p>
<p>Rak yang rapi ini juga memberitahu bentuknya melalui shape—apakah rak itu barisan panjang (vektor), persegi panjang (matriks), atau balok tiga dimensi (tensor). Informasi bentuk ini penting agar kamu tidak mencoba menjumlahkan rak yang tidak cocok ukurannya.</p>
<h2>Penjelasan Konsep</h2>
<p><strong>Array dan Shape.</strong> NumPy array dibuat dari list Python dengan <code>np.array()</code>. Setiap array memiliki <strong>shape</strong> yang menunjukkan ukuran pada setiap dimensi: (5,) berarti array 1 dimensi dengan 5 elemen, (3, 4) berarti 3 baris dan 4 kolom. Shape adalah properti yang paling sering diperiksa karena operasi antar-array biasanya mensyaratkan shape yang kompatibel.</p>
<p><strong>Operasi Vectorized.</strong> Alih-alih menulis loop untuk menjumlahkan setiap elemen, kamu cukup menulis <code>scores + 5</code> dan seluruh elemen akan ditambah 5 secara otomatis. Operasi vectorized berlaku untuk penjumlahan, pengurangan, perkalian, pembagian, perbandingan, dan fungsi matematika. Keuntungan utamanya adalah kode lebih pendek, lebih mudah dibaca, dan dieksekusi lebih cepat.</p>
<p><strong>Missing Value: NaN.</strong> Dalam dataset nyata, hampir selalu ada nilai yang hilang. NumPy merepresentasikannya sebagai <code>np.nan</code> (Not a Number). Fungsi statistik biasa seperti <code>np.mean()</code> akan menghasilkan NaN jika ada satu saja nilai yang hilang. Untuk itu NumPy menyediakan fungsi nan-aware seperti <code>np.nanmean()</code>, <code>np.nansum()</code>, dan <code>np.nanstd()</code> yang secara otomatis mengabaikan NaN. Namun penting untuk diingat: mengabaikan NaN bukan berarti data yang hilang tidak penting. Kamu tetap perlu bertanya mengapa data tersebut hilang dan apakah penghilangannya memengaruhi kesimpulan.</p>
<p><strong>Boolean Masking.</strong> Kamu dapat memilih elemen array berdasarkan kondisi, misalnya <code>scores[scores > 75]</code> untuk mengambil semua nilai di atas 75. Hasilnya adalah array baru yang hanya berisi elemen yang memenuhi kondisi. Teknik ini sangat berguna untuk filtering data tanpa loop.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">[[80, 90, 70],
 [88, 92, 84]]  → shape (2, 3)
   2 peserta, 3 penilaian
</code></pre>
<h2>Contoh Nyata</h2>
<p>Seorang panitia memiliki daftar 200 nilai peserta dalam format list Python. Ia ingin mengetahui rata-rata nilai, nilai tertinggi dan terendah, serta standar deviasi. Dengan list biasa, ia harus menulis loop atau menggunakan fungsi built-in sum() dan len() yang terbatas. Dengan NumPy, ia cukup mengubah list menjadi array dan memanggil <code>np.mean()</code>, <code>np.min()</code>, <code>np.max()</code>, dan <code>np.std()</code>—semuanya dalam beberapa baris tanpa loop manual.</p>
<p>Jika ada beberapa nilai yang hilang dalam data, <code>np.nanmean()</code> tetap dapat menghitung rata-rata dari nilai yang tersedia. Namun panitia harus mencatat berapa banyak data yang hilang dan melaporkannya sebagai bagian dari hasil.</p>
<h2>Contoh AI</h2>
<p>Array NumPy adalah format data standar yang digunakan oleh library Machine Learning. Ketika Scikit-learn menerima data pelatihan, data tersebut biasanya berupa array NumPy dua dimensi dengan shape (n_samples, n_features). Ketika PyTorch menerima data untuk deep learning, data dikonversi menjadi tensor yang mirip dengan NumPy array dengan dukungan GPU. Pada chapter ini kita belum masuk ke model tersebut, tetapi setiap operasi array yang kamu praktikkan sekarang—shape, broadcasting, boolean masking—adalah keterampilan yang akan kamu gunakan setiap hari dalam workflow AI.</p>
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
<li><strong>Mencampur shape yang tidak kompatibel.</strong> Menjumlahkan array (3,) dan (4,) akan menghasilkan error karena bentuknya berbeda. Selalu periksa shape dengan <code>.shape</code> sebelum operasi antar-array.</li>
<li><strong>Mengabaikan dtype.</strong> Jika array berisi campuran integer dan float, NumPy akan memilih dtype yang bisa menampung keduanya. Jika tidak sadar akan hal ini, kamu bisa mendapatkan hasil yang tidak diharapkan—misalnya pembagian integer yang menghasilkan angka bulat alih-alih desimal.</li>
<li><strong>Menghapus NaN tanpa memahami penyebab.</strong> <code>np.isnan()</code> dan <code>np.nan_to_num()</code> memang mudah dipakai, tetapi menghapus atau mengganti NaN tanpa investigasi dapat menghilangkan informasi penting. Cari tahu dulu mengapa data hilang.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li><strong>Periksa <code>shape</code> dan <code>dtype</code>.</strong> Sebelum operasi apa pun, ketahui bentuk dan tipe data array-mu. Ini mencegah error yang tidak terduga dan membantu memahami struktur data.</li>
<li><strong>Tentukan kebijakan missing value secara eksplisit.</strong> Putuskan sejak awal: apakah NaN akan diabaikan, diisi dengan nilai tertentu, atau menyebabkan baris tersebut dibuang? Dokumentasikan keputusan ini.</li>
<li><strong>Gunakan operasi vectorized yang tetap mudah dibaca.</strong> Operasi vectorized memang ringkas, tetapi jika satu baris kode terlalu padat hingga sulit dipahami, pecah menjadi beberapa baris yang lebih jelas. Keterbacaan tetap prioritas.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Buat array lima nilai termasuk satu <code>np.nan</code>. Tampilkan jumlah data valid, minimum, maksimum, dan rata-rata valid.</p>
<h2>Ringkasan</h2>
<p>NumPy adalah fondasi komputasi numerik dalam ekosistem Python AI. Array-nya menyediakan struktur data yang efisien, operasi vectorized yang ringkas, dan fungsi statistik yang menangani missing value. Tiga konsep utama yang perlu diingat: shape menentukan dimensi data, vectorized operation menggantikan loop manual, dan NaN adalah sinyal yang perlu diinvestigasi—bukan sekadar angka yang dibuang. Pemahaman ini akan langsung berguna ketika kamu mulai menggunakan Pandas di chapter berikutnya.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Array kuat untuk angka; Pandas menambahkan nama kolom dan baris agar data tabular lebih mudah dipahami.</p>
<hr>

````
