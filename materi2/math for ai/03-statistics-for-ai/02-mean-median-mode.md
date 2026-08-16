# Topic 02 — Mean, Median, Mode: Membaca Pusat Data dengan Tepat

> **Submodule 03 — Statistics for AI: Membaca Pola dan Variasi Data**  
> **Filename:** `02-mean-median-mode.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar akademik/teknis campuran, termasuk non-IT  
> **Prerequisite:** Topic 01 — Dari Matrix ke Dataset Statistik  
> **Forward dependency:** Topic 03 — Range, Variance, Standard Deviation  
> **Boundary:** Topic ini membahas ukuran pusat data: mean, median, dan mode. Range, variance, standard deviation, histogram, percentile/quartile/IQR, formal outlier rules, covariance/correlation, Probability, dan statistical inference tetap ditunda.

---

# 1. Mengapa Topik Ini Ada?

Pada Topic 01 kita sudah mengubah cara pandang dari sekadar **matrix** menjadi **dataset statistik**.

Kita tahu bahwa feature matrix HerAI:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
\in\mathbb{R}^{4\times2}
$$

mempunyai:

- empat baris observasi: Alya, Bima, Citra, Dewi;
- kolom pertama: quiz ratio $q$;
- kolom kedua: completion ratio $c$.

Sekarang kita memilih satu variable, misalnya quiz ratio:

$$
\mathbf{q}
=
\begin{bmatrix}
0.80\\
0.60\\
0.90\\
0.70
\end{bmatrix}.
$$

Daripada membaca empat nilai satu per satu, kita mulai bertanya:

> **Adakah satu nilai yang dapat membantu kita menggambarkan “pusat” kumpulan data ini?**

Pertanyaan ini tampak sederhana, tetapi jawabannya tidak selalu hanya satu.

Statistik mempunyai beberapa cara untuk menggambarkan pusat data. Tiga yang paling penting untuk fondasi kita adalah:

1. **mean** — rata-rata aritmetika;
2. **median** — nilai tengah setelah data diurutkan;
3. **mode** — nilai yang paling sering muncul.

OpenStax dan NIST sama-sama menempatkan mean dan median sebagai ukuran pusat/lokasi data, sementara OpenStax juga mendefinisikan mode sebagai nilai dengan frekuensi tertinggi. [R1][R2]

Namun guardrail terpentingnya adalah:

> **Tidak ada satu ukuran pusat yang otomatis paling benar untuk semua dataset dan semua pertanyaan.**

---

# 2. Tujuan Pembelajaran

Setelah menyelesaikan Topic 02, kamu diharapkan mampu:

1. menjelaskan apa yang dimaksud ukuran pusat data;
2. menghitung arithmetic mean dari dataset numerik kecil;
3. membaca formula mean dengan sigma notation;
4. menjelaskan arti $x_i$, $i$, $n$, $\sum$, dan $\bar{x}$;
5. mengurutkan data sebelum menentukan median;
6. menentukan median untuk jumlah observasi ganjil;
7. menentukan median untuk jumlah observasi genap;
8. menjelaskan mengapa median tidak harus merupakan salah satu nilai observasi ketika $n$ genap;
9. menentukan mode dari data numerik maupun kategorikal;
10. mengenali dataset tanpa mode dan dataset dengan lebih dari satu mode;
11. membandingkan interpretasi mean, median, dan mode;
12. memprediksi bagaimana satu nilai ekstrem dapat menggeser mean dan median;
13. memilih ukuran pusat yang lebih sesuai untuk pertanyaan sederhana dan menjelaskan alasannya;
14. menjelaskan mengapa mean yang sama tidak berarti dua dataset identik;
15. menghubungkan ukuran pusat dengan ringkasan data HerAI tanpa mengklaim probability, causality, atau kualitas model.

---

# 3. Prerequisite Recall — Apa yang Sudah Kita Tahu?

Kita tidak mengulang Topic 01 seluruhnya. Kita hanya menarik fondasi yang diperlukan.

## 3.1 Observation dan variable

Dalam dataset HerAI saat ini:

- satu participant = satu unit observasi;
- $q$ adalah satu variable numerik;
- $c$ adalah satu variable numerik;
- study duration adalah variable numerik dengan unit menit.

Sebelum menghitung ukuran pusat, kita harus tahu **variable mana yang sedang diringkas**.

## 3.2 Nilai numerik tidak boleh dicampur sembarangan

Mean dari quiz ratio dan mean dari study duration menjawab pertanyaan berbeda.

- quiz ratio bersifat dimensionless ratio;
- study duration mempunyai unit menit.

Menjumlahkan $0.80+45$ hanya karena keduanya angka tidak mempunyai makna statistik yang benar.

## 3.3 Ordering

Median membutuhkan data yang diurutkan.

Kita sudah cukup mengenal perbandingan angka untuk melakukan ini.

## 3.4 Sigma notation

Dari Submodule 01, simbol $\sum$ berarti penjumlahan berulang.

Pada Topic ini, sigma notation dipakai untuk menulis mean secara ringkas, bukan untuk membuka teori baru.

---

# 4. Hook — Empat Nilai, Satu Cerita?

Quiz ratio HerAI adalah:

$$
0.80,\ 0.60,\ 0.90,\ 0.70.
$$

Bayangkan kamu harus memberi ringkasan singkat kepada mentor:

> “Secara umum, quiz ratio cohort ini berada di sekitar ...”

Nilai apa yang akan kamu pilih?

Sebelum menghitung apa pun, coba tebak:

- apakah pusatnya lebih dekat ke $0.60$?
- $0.75$?
- $0.90$?
- atau kita sebenarnya membutuhkan lebih dari satu cara untuk menjawab?

Simpan prediksimu.

---

# 5. Predict Before Calculate

## Prediksi A — Mean

Untuk data:

$$
2,\ 4,\ 6,\ 8
$$

apakah mean berada:

A. di bawah 2  
B. di antara 2 dan 8  
C. di atas 8  
D. tidak dapat ditentukan

Jangan hitung dulu. Gunakan intuisi “titik keseimbangan”.

## Prediksi B — Median

Untuk data terurut:

$$
3,\ 5,\ 9,\ 20,\ 100
$$

nilai mana yang membagi posisi data menjadi bagian bawah dan atas?

## Prediksi C — Mode

Untuk:

$$
\text{teks},\ \text{video},\ \text{teks},\ \text{kuis},\ \text{teks}
$$

apakah kita masih dapat mencari mode walaupun datanya bukan angka?

## Prediksi D — Change One Thing

Bandingkan:

$$
30,\ 40,\ 45,\ 55
$$

terhadap:

$$
30,\ 40,\ 45,\ 120.
$$

Satu nilai berubah besar.

Prediksi:

- ukuran mana yang akan bergeser banyak: mean atau median?
- apakah keduanya pasti berubah dengan jumlah yang sama?

---

# 6. Intuisi — “Pusat” Itu Bisa Berarti Berbeda

Kata **pusat** tidak selalu berarti satu konsep tunggal.

Bayangkan beberapa pertanyaan berbeda.

### Pertanyaan 1

“Jika seluruh nilai dijumlahkan lalu dibagi rata ke setiap observasi, berapa bagian per observasi?”

Ini mengarah ke **mean**.

### Pertanyaan 2

“Jika semua nilai diurutkan, di mana posisi tengahnya?”

Ini mengarah ke **median**.

### Pertanyaan 3

“Nilai atau kategori apa yang paling sering muncul?”

Ini mengarah ke **mode**.

Ketiganya sama-sama dapat membantu merangkum pusat, tetapi memakai logika berbeda. [R1][R2]

---

# 7. Mean — Rata-Rata Aritmetika

## 7.1 Definisi intuitif

Mean menjumlahkan seluruh nilai numerik lalu membaginya dengan banyaknya nilai yang disertakan.

Untuk data:

$$
2,\ 4,\ 6,\ 8,
$$

jumlahnya adalah:

$$
2+4+6+8=20.
$$

Ada empat nilai, sehingga:

$$
\text{mean}=\frac{20}{4}=5.
$$

Mean dapat dibaca sebagai nilai hasil “pembagian rata” total data.

---

# 8. Formula Mean

Untuk satu variable numerik dengan $n$ nilai observasi:

$$
\bar{x}
=
\frac{1}{n}\sum_{i=1}^{n}x_i.
$$

Keterangan:

- $x$ = variable numerik yang sedang diringkas;
- $x_i$ = nilai variable $x$ pada observasi ke-$i$;
- $i$ = indeks observasi;
- $n$ = jumlah nilai observasi yang disertakan;
- $\sum_{i=1}^{n}x_i$ = jumlah semua nilai dari observasi pertama sampai ke-$n$;
- $\bar{x}$ dibaca **x-bar**, yaitu mean dari nilai $x$ yang sedang dianalisis.

Formula ini adalah kontrak core Topic 02. [R1][R2]

---

# 9. Math Reading Skill — Membaca Formula Mean dengan Bahasa Manusia

Lihat lagi:

$$
\bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_i.
$$

Jangan membacanya hanya sebagai simbol.

Baca sebagai:

> “Jumlahkan seluruh nilai variable $x$ yang sedang dianalisis, lalu bagi dengan jumlah nilai observasi yang dimasukkan.”

## Apa yang formula ini lakukan?

- menggabungkan seluruh nilai numerik;
- memakai setiap nilai dalam perhitungan;
- menghasilkan satu angka ringkas.

## Apa yang formula ini tidak jamin?

Mean tidak otomatis:

- menjadi nilai yang benar-benar dimiliki salah satu participant;
- menjadi nilai yang paling sering muncul;
- menjadi ringkasan terbaik jika ada nilai sangat ekstrem;
- menceritakan spread/distribution;
- membuktikan kualitas dataset;
- menjadi probability;
- menjadi model performance.

Ini penting: **formula menghasilkan angka, tetapi interpretasi tetap membutuhkan konteks.**

---

# 10. Worked Example 1 — Mean Dasar

Data durasi empat sesi latihan kecil:

$$
20,\ 30,\ 30,\ 40.
$$

## Langkah 1 — Identifikasi $n$

$$
n=4.
$$

## Langkah 2 — Jumlahkan nilai

$$
20+30+30+40=120.
$$

## Langkah 3 — Bagi dengan $n$

$$
\bar{x}
=
\frac{120}{4}
=
30.
$$

Jika variable diukur dalam menit, mean juga mempunyai unit **menit**.

Interpretasi:

> Rata-rata aritmetika dari empat durasi tersebut adalah 30 menit.

Jangan memperluas klaim menjadi:

> “Semua sesi berlangsung 30 menit.”

Itu salah. Mean merangkum, bukan mengganti semua observasi.

---

# 11. Worked Example 2 — Mean Quiz Ratio HerAI

Canonical quiz ratio:

| Participant | Quiz ratio $q$ |
|---|---:|
| Alya | 0.80 |
| Bima | 0.60 |
| Citra | 0.90 |
| Dewi | 0.70 |

Mean-nya:

$$
\bar{q}
=
\frac{0.80+0.60+0.90+0.70}{4}.
$$

Jumlah nilai:

$$
0.80+0.60+0.90+0.70=3.00.
$$

Maka:

$$
\bar{q}=\frac{3.00}{4}=0.75.
$$

Interpretasi aman:

> Mean quiz ratio pada empat participant yang diamati adalah $0.75$.

Jika dikonversi untuk komunikasi manusia, $0.75=75\%$ dari skala quiz ratio ini.

Tetapi:

> $0.75$ **bukan probability** hanya karena nilainya berada di antara $0$ dan $1$.

---

# 12. Median — Nilai Tengah Setelah Data Diurutkan

## 12.1 Definisi intuitif

Median menggunakan **posisi**, bukan total penjumlahan seluruh nilai.

Langkah dasarnya:

1. urutkan data dari kecil ke besar;
2. cari posisi tengah;
3. jika jumlah data ganjil, ambil satu nilai di tengah;
4. jika jumlah data genap, ambil mean dari dua nilai tengah.

NIST dan OpenStax sama-sama mendeskripsikan median melalui data yang sudah diurutkan. [R1][R2]

---

# 13. Notasi Data Terurut

Misalkan setelah diurutkan kita menulis:

$$
x_{(1)}\le x_{(2)}\le\cdots\le x_{(n)}.
$$

Tanda kurung pada indeks, seperti $x_{(1)}$, menunjukkan **urutan posisi** setelah sorting.

- $x_{(1)}$ = nilai paling kecil;
- $x_{(n)}$ = nilai paling besar.

Ini berbeda dari $x_i$ yang sekadar berarti nilai pada observasi ke-$i$ sebelum kita membicarakan urutan.

---

# 14. Median untuk Jumlah Data Ganjil

Jika $n$ ganjil, posisi tengah adalah:

$$
\frac{n+1}{2}.
$$

Untuk data terurut:

$$
3,\ 5,\ 9,\ 20,\ 100,
$$

kita punya:

$$
n=5.
$$

Posisi tengah:

$$
\frac{5+1}{2}=3.
$$

Nilai ke-3 adalah:

$$
9.
$$

Jadi median adalah:

$$
9.
$$

---

# 15. Median untuk Jumlah Data Genap

Jika $n$ genap, tidak ada satu observasi tepat di tengah.

Kita mengambil dua posisi tengah:

$$
\frac{n}{2}
\quad\text{dan}\quad
\frac{n}{2}+1.
$$

Lalu menghitung mean dari dua nilai tersebut:

$$
\operatorname{median}(x)
=
\frac{x_{(n/2)}+x_{(n/2+1)}}{2}.
$$

Contoh:

$$
2,\ 4,\ 8,\ 10.
$$

Dua nilai tengah adalah $4$ dan $8$.

Maka:

$$
\operatorname{median}(x)
=
\frac{4+8}{2}
=6.
$$

Perhatikan:

> **Median $6$ tidak muncul sebagai observasi asli.**

Ini normal untuk $n$ genap.

---

# 16. Worked Example 3 — Median Quiz Ratio HerAI

Quiz ratio belum terurut:

$$
0.80,\ 0.60,\ 0.90,\ 0.70.
$$

Urutkan:

$$
0.60,\ 0.70,\ 0.80,\ 0.90.
$$

Karena:

$$
n=4,
$$

dua nilai tengah adalah:

$$
0.70\quad\text{dan}\quad0.80.
$$

Maka:

$$
\operatorname{median}(q)
=
\frac{0.70+0.80}{2}
=0.75.
$$

Pada variable $q$ ini:

$$
\bar{q}=0.75
$$

dan:

$$
\operatorname{median}(q)=0.75.
$$

Mean dan median kebetulan sama.

**Jangan generalisasikan** bahwa keduanya selalu sama.

---

# 17. Worked Example 4 — Completion Ratio HerAI

Canonical completion ratio:

$$
0.75,\ 0.625,\ 1.00,\ 0.50.
$$

## Mean

$$
\bar{c}
=
\frac{0.75+0.625+1.00+0.50}{4}.
$$

Jumlah:

$$
0.75+0.625+1.00+0.50=2.875.
$$

Maka:

$$
\bar{c}=\frac{2.875}{4}=0.71875.
$$

## Median

Urutkan:

$$
0.50,\ 0.625,\ 0.75,\ 1.00.
$$

Dua nilai tengah:

$$
0.625\quad\text{dan}\quad0.75.
$$

Maka:

$$
\operatorname{median}(c)
=
\frac{0.625+0.75}{2}
=0.6875.
$$

Jadi:

$$
\bar{c}=0.71875
$$

sedangkan:

$$
\operatorname{median}(c)=0.6875.
$$

Kali ini mean dan median berbeda.

Ini mengingatkan bahwa “pusat” tergantung pada definisi yang dipakai.

---

# 18. Worked Example 5 — Study Duration HerAI

Durasi belajar canonical:

| Participant | Study duration |
|---|---:|
| Alya | 45 min |
| Bima | 30 min |
| Citra | 55 min |
| Dewi | 40 min |

## Mean

$$
\bar{d}
=
\frac{45+30+55+40}{4}
=
\frac{170}{4}
=42.5\text{ menit}.
$$

## Median

Urutkan:

$$
30,\ 40,\ 45,\ 55.
$$

Dua nilai tengah:

$$
40\quad\text{dan}\quad45.
$$

Maka:

$$
\operatorname{median}(d)
=
\frac{40+45}{2}
=42.5\text{ menit}.
$$

Sekali lagi, mean dan median sama untuk variable ini.

Tetapi kita belum tahu **spread**-nya secara formal. Itu baru Topic 03.

---

# 19. Mode — Nilai yang Paling Sering Muncul

## 19.1 Definisi intuitif

Mode adalah nilai atau kategori yang mempunyai frekuensi kemunculan tertinggi. [R1]

Contoh:

$$
2,\ 2,\ 3,\ 4,\ 5.
$$

Nilai $2$ muncul dua kali, sementara yang lain satu kali.

Mode:

$$
2.
$$

---

# 20. Mode Tidak Harus Numerik

Misalkan format materi yang dipilih dalam contoh kecil adalah:

$$
\text{teks},\ \text{video},\ \text{teks},\ \text{kuis},\ \text{teks}.
$$

Kategori `teks` muncul tiga kali.

Maka mode adalah:

> **teks**

OpenStax secara eksplisit mencatat bahwa mode dapat digunakan untuk data kualitatif/kategorikal. [R1]

Ini membuat mode berbeda dari arithmetic mean.

Kita tidak dapat menghitung mean dari kategori:

$$
\text{teks},\ \text{video},\ \text{kuis}.
$$

Tetapi kita dapat mencari kategori yang paling sering muncul.

---

# 21. Dataset Tanpa Mode

Quiz ratio HerAI:

$$
0.80,\ 0.60,\ 0.90,\ 0.70.
$$

Setiap nilai muncul satu kali.

Tidak ada satu nilai yang frekuensinya lebih tinggi daripada nilai lain.

Dalam convention course ini, kita menyatakan:

> **Quiz ratio HerAI pada empat participant tersebut tidak mempunyai mode.**

Ini lebih informatif daripada memaksa memilih salah satu nilai.

---

# 22. Lebih dari Satu Mode

Data:

$$
2,\ 2,\ 3,\ 3,\ 4.
$$

Frekuensi tertinggi adalah 2 kemunculan, dimiliki oleh $2$ dan $3$.

Jadi data mempunyai dua mode:

$$
2\quad\text{dan}\quad3.
$$

Ini sering disebut **bimodal**. [R1]

Guardrail:

> Dataset tidak harus mempunyai tepat satu mode.

---

# 23. Mean, Median, Mode Menjawab Pertanyaan Berbeda

| Ukuran | Intuisi utama | Membutuhkan numerik? | Sensitif pada nilai ekstrem? | Dapat dipakai untuk kategori? |
|---|---|---|---|---|
| Mean | total dibagi rata | Ya | Relatif sensitif | Tidak |
| Median | posisi tengah setelah sorting | Perlu data yang dapat diurutkan secara bermakna | Lebih tahan terhadap nilai ekstrem | Umumnya bukan untuk nominal categories |
| Mode | nilai/kategori paling sering | Tidak selalu | Tidak bergantung pada besar numerik ekstrem dengan cara seperti mean | Ya |

Tidak ada kolom “selalu terbaik”.

Pemilihan ukuran pusat harus mengikuti:

- tipe variable;
- tujuan pertanyaan;
- pola data;
- keberadaan nilai ekstrem;
- kebutuhan komunikasi.

---

# 24. Change One Thing — Satu Nilai Ekstrem

Gunakan study duration canonical yang sudah diurutkan:

$$
30,\ 40,\ 45,\ 55.
$$

Mean:

$$
42.5.
$$

Median:

$$
42.5.
$$

Sekarang untuk **eksperimen sensitivitas saja**, ubah nilai $55$ menjadi $120$:

$$
30,\ 40,\ 45,\ 120.
$$

Data ini **bukan pengganti canonical HerAI dataset**. Kita hanya mengubah satu nilai untuk melihat efeknya.

## Mean baru

$$
\bar{d}'
=
\frac{30+40+45+120}{4}
=
\frac{235}{4}
=58.75.
$$

## Median baru

Dua nilai tengah tetap:

$$
40\quad\text{dan}\quad45.
$$

Maka:

$$
\operatorname{median}(d')=42.5.
$$

Perubahan:

- mean: $42.5\to58.75$;
- median: tetap $42.5$.

NIST dan OpenStax sama-sama menunjukkan bahwa nilai ekstrem dapat menarik mean lebih kuat, sementara median berbasis posisi dan lebih sedikit dipengaruhi oleh besar nilai ekstrem. [R1][R2]

Tetapi jangan mengubah ini menjadi aturan buta:

> **Median bukan otomatis “selalu lebih baik”.**

Pilihan ukuran pusat tetap bergantung pada pertanyaan dan karakter data.

---

# 25. Mengapa Mean Terpengaruh?

Formula mean memakai **setiap besar nilai**:

$$
\bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_i.
$$

Jika satu nilai naik sangat besar, total jumlah juga naik besar.

Median tidak memakai total besar semua nilai. Median terutama bergantung pada posisi setelah sorting.

Ini alasan struktural, bukan sekadar hafalan.

---

# 26. Mean Sama Tidak Berarti Data Sama

Bandingkan:

Dataset A:

$$
4,\ 5,\ 5,\ 6
$$

Dataset B:

$$
0,\ 5,\ 5,\ 10.
$$

Mean A:

$$
\frac{4+5+5+6}{4}=5.
$$

Mean B:

$$
\frac{0+5+5+10}{4}=5.
$$

Keduanya mempunyai mean yang sama.

Tetapi nilainya jelas tidak sama.

Artinya:

> **Satu angka pusat tidak menceritakan seluruh dataset.**

Perbedaan sebaran atau spread akan dipelajari pada Topic 03.

---

# 27. “Average” Tidak Selalu Harus Dibaca Tanpa Klarifikasi

Dalam percakapan sehari-hari, kata “average” sering berarti arithmetic mean. OpenStax mencatat penggunaan tersebut umum. [R1]

Namun dalam komunikasi statistik, lebih aman mengatakan secara spesifik:

- arithmetic mean;
- median;
- mode.

Daripada hanya berkata:

> “rata-ratanya 0.75”

lebih jelas berkata:

> “arithmetic mean quiz ratio adalah 0.75.”

Ini mengurangi ambiguitas.

---

# 28. AI Connection — Mengapa Ukuran Pusat Penting?

Dalam pipeline AI, sebelum training atau evaluation, tim sering perlu memahami nilai-nilai feature dan data yang dikumpulkan.

Ukuran pusat membantu membuat ringkasan awal seperti:

- typical study duration;
- typical quiz ratio;
- typical completion behavior;
- kategori yang paling sering muncul.

Tetapi Topic ini **tidak** mengklaim bahwa ukuran pusat saja cukup untuk menilai dataset atau model.

Mean/median/mode tidak otomatis menjawab:

- apakah data seimbang;
- apakah ada missing value;
- apakah ada data leakage;
- apakah model akurat;
- apakah ada causality;
- apakah nilai ekstrem salah;
- apakah suatu score adalah probability.

Ukuran pusat adalah **descriptive summary**, bukan validasi AI.

---

# 29. HerAI Interpretation Audit

Pernyataan A:

> “Mean quiz ratio adalah $0.75$, jadi semua participant mempunyai quiz ratio $0.75$.”

**Salah.** Mean merangkum empat nilai; observasi aktual tetap $0.80$, $0.60$, $0.90$, $0.70$.

Pernyataan B:

> “Median completion ratio $0.6875$ berarti pasti ada participant dengan completion ratio $0.6875$.”

**Salah.** Untuk jumlah data genap, median dapat menjadi mean dua nilai tengah dan tidak harus muncul di data asli.

Pernyataan C:

> “Quiz ratio tidak punya mode, berarti datanya rusak.”

**Salah.** Tidak adanya mode bukan data-quality error.

Pernyataan D:

> “Mean dan median yang sama berarti distribution-nya pasti sama.”

**Salah.** Mean dan median adalah ringkasan pusat, bukan deskripsi lengkap seluruh distribution.

---

# 30. Misconception Challenge 1 — “Mean Selalu Paling Representatif”

Data:

$$
30,\ 40,\ 45,\ 120.
$$

Mean:

$$
58.75.
$$

Tiga dari empat nilai berada di bawah $58.75$.

Pertanyaan:

> Apakah mean salah?

Tidak.

Mean dihitung dengan benar.

Pertanyaan yang benar adalah:

> Apakah mean merupakan ringkasan pusat yang paling membantu untuk tujuan tertentu?

Itu membutuhkan konteks.

---

# 31. Misconception Challenge 2 — “Median Selalu Lebih Baik”

Median lebih tahan terhadap pengaruh nilai ekstrem, tetapi bukan berarti median selalu jawaban terbaik.

Contoh pertanyaan:

> “Berapa total quiz ratio yang dibagi rata ke empat observasi?”

Logika pertanyaan ini secara langsung cocok dengan mean.

Jadi jangan mengganti satu dogma dengan dogma lain.

---

# 32. Misconception Challenge 3 — “Mode Selalu Ada Tepat Satu”

Quiz ratio HerAI tidak mempunyai nilai berulang.

Data lain dapat mempunyai dua atau lebih nilai yang sama-sama paling sering muncul.

Jadi:

- no mode dapat terjadi;
- one mode dapat terjadi;
- multiple modes dapat terjadi.

---

# 33. Misconception Challenge 4 — “Mode Hanya untuk Angka”

Mode bekerja berdasarkan **frekuensi**, bukan operasi aritmetika.

Karena itu mode dapat relevan untuk data kategorikal seperti pilihan format materi.

Mean tidak mempunyai property tersebut. [R1]

---

# 34. Misconception Challenge 5 — “Median Harus Ada di Dataset”

Untuk data genap:

$$
2,\ 4,\ 8,\ 10,
$$

median adalah:

$$
6.
$$

Nilai $6$ tidak ada pada dataset.

Tetap valid.

---

# 35. Try It Yourself 1 — Mean

Hitung mean dari:

$$
5,\ 7,\ 8,\ 10.
$$

Checklist:

- [ ] tentukan $n$;
- [ ] hitung jumlah nilai;
- [ ] bagi dengan $n$;
- [ ] tulis interpretasi satu kalimat.

Jawaban cepat:

$$
\bar{x}=7.5.
$$

---

# 36. Try It Yourself 2 — Median

Data:

$$
12,\ 4,\ 9,\ 5,\ 20.
$$

Jangan langsung mengambil elemen ke-3 dari urutan awal.

Urutkan dahulu:

$$
4,\ 5,\ 9,\ 12,\ 20.
$$

Median:

$$
9.
$$

---

# 37. Try It Yourself 3 — Mode

Data:

$$
\text{A},\ \text{B},\ \text{A},\ \text{C},\ \text{B},\ \text{A}.
$$

Kategori dengan frekuensi tertinggi adalah:

> A

Jadi mode adalah A.

---

# 38. Try It Yourself 4 — Choose the Center

Sebuah variable durasi memiliki data:

$$
25,\ 27,\ 28,\ 29,\ 120.
$$

Tanpa menyatakan ada “data salah”, jawab:

1. mana yang kemungkinan lebih banyak bergeser karena nilai $120$: mean atau median?
2. jika tujuanmu menggambarkan posisi tengah mayoritas nilai, ukuran mana yang mungkin lebih informatif?
3. informasi apa yang masih belum kamu punya?


- mean lebih tertarik ke nilai 120;
- median lebih stabil terhadap besar nilai ekstrem;
- kita masih belum membahas spread, distribution, dan alasan nilai 120 muncul.

---

# 39. Visual Specification

## [STATIC VISUAL] Mean, Median, Mode pada Number Line

**Tujuan:** memperlihatkan bahwa tiga ukuran pusat dapat berada di lokasi berbeda.

**Initial data:**

$$
2,\ 2,\ 3,\ 4,\ 9.
$$

**Tampilan:**

- titik data pada number line;
- marker mean;
- marker median;
- marker mode;
- legend yang membedakan tiga konsep.

**Expected behavior:** learner melihat bahwa mean, median, dan mode tidak harus sama.

**Safety:** visual tidak boleh memberi label “mean terbaik” atau “median terbaik” tanpa konteks.

---

# 40. Interactive Specification — Change One Extreme Value

## [NUMBER MANIPULATOR]

**Tujuan:** memperlihatkan sensitivity mean vs median.

**Initial data:**

$$
30,\ 40,\ 45,\ 55.
$$

**Action:** learner menggeser nilai terakhir dari $55$ menuju $120$.

**Expected behavior:**

- mean marker bergerak ke kanan secara nyata;
- median marker tetap di $42.5$ selama dua middle values tidak berubah;
- raw observations tetap terlihat;
- nilai mean dan median diperbarui live.

**Feedback:**

> “Mean memakai besar setiap nilai. Median terutama menggunakan posisi setelah data diurutkan.”

**Safety:** label nilai yang digeser sebagai **eksperimen sensitivitas**, bukan otomatis outlier/error.

---

# 41. Interactive Specification — Build the Median

## [STEP-BY-STEP REVEAL]

**Tujuan:** mencegah learner mengambil “nilai tengah” sebelum sorting.

**Initial state:**

$$
12,\ 4,\ 9,\ 5,\ 20.
$$

**Step 1:** learner memilih tombol “urutkan”.

**Step 2:** sistem menampilkan:

$$
4,\ 5,\ 9,\ 12,\ 20.
$$

**Step 3:** posisi ke-3 disorot.

**Feedback:** median $=9$.

**Safety:** untuk jumlah genap, sistem harus memperlihatkan dua middle positions dan proses averaging keduanya.

---

# 42. Interactive Specification — Which Statistic?

## [COMPARE VIEW]

**Tujuan:** melatih pemilihan ukuran pusat berdasarkan pertanyaan.

Panel kiri: data numerik dengan satu nilai ekstrem.  
Panel kanan: data kategorikal dengan satu kategori dominan.

Learner memilih:

- mean;
- median;
- mode;
- “butuh konteks tambahan”.

Feedback harus menjelaskan alasan, bukan sekadar benar/salah.

---

# 43. Checkpoint 1 — Formula Mean

Diberikan:

$$
\bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_i.
$$

Jawab tanpa menghitung:

1. apa arti $n$?
2. apa arti $x_i$?
3. apa arti $\sum$?
4. apakah $\bar{x}$ harus sama dengan salah satu $x_i$?

Jawaban:

1. jumlah nilai observasi yang disertakan;
2. nilai variable $x$ pada observasi ke-$i$;
3. menjumlahkan nilai sesuai indeks;
4. tidak harus.

---

# 44. Checkpoint 2 — Median

Mana langkah yang benar?

A. ambil elemen yang berada di tengah urutan input apa adanya  
B. urutkan data terlebih dahulu, lalu cari posisi tengah  
C. jumlahkan data, lalu pilih nilai terdekat  
D. pilih nilai dengan frekuensi tertinggi

Jawaban: **B**.

---

# 45. Checkpoint 3 — Mode

Dataset:

$$
1,\ 2,\ 3,\ 4.
$$

Semua nilai muncul satu kali.

Dalam convention course ini:

> tidak ada mode.

Tidak adanya mode bukan error.

---

# 46. Checkpoint 4 — HerAI

Dari quiz ratio:

$$
0.80,\ 0.60,\ 0.90,\ 0.70,
$$

kita memperoleh:

$$
\bar{q}=0.75
$$

dan:

$$
\operatorname{median}(q)=0.75.
$$

Apakah ini berarti keempat nilai quiz ratio sama?

> **Tidak.**

Mean dan median yang sama tidak berarti semua observations sama.

---

# 47. Decision Guide — Kapan Memikirkan Mean, Median, Mode?

Gunakan panduan ini sebagai reasoning aid, bukan hukum universal.

## Pertimbangkan mean ketika:

- variable bersifat numerik;
- besar setiap nilai memang bermakna;
- pertanyaan sesuai dengan pembagian rata total;
- nilai ekstrem tidak membuat ringkasan menyesatkan untuk tujuanmu.

## Pertimbangkan median ketika:

- ordering bermakna;
- kamu ingin pusat berdasarkan posisi;
- nilai ekstrem dapat menarik mean jauh dari mayoritas posisi data.

## Pertimbangkan mode ketika:

- kamu ingin nilai/kategori paling sering muncul;
- data bisa bersifat numerik atau kategorikal;
- frekuensi adalah inti pertanyaan.

## Kadang jawaban terbaik adalah:

> laporkan lebih dari satu ukuran dan jelaskan konteks.

NIST menunjukkan bahwa mean, median, dan mode dapat memberikan gambaran lokasi yang berbeda tergantung bentuk dan ekor data. [R2]

---

# 48. What We Deliberately Do Not Do Yet

Topic 02 tidak masuk ke:

- range;
- variance;
- standard deviation;
- histogram mechanics;
- distribution shape formal;
- percentile;
- quartile;
- IQR;
- formal outlier rule;
- weighted mean;
- trimmed mean;
- expected value;
- covariance;
- correlation;
- sampling distribution;
- confidence interval;
- hypothesis test;
- $p$-value;
- Bayes;
- probability model.

Beberapa konsep tersebut mungkin disebut sebagai **preview**, tetapi tidak diajarkan formal di sini.

---

# 49. Why This Matters Later

Topic 03 akan bertanya:

> “Jika kita sudah tahu pusat data, seberapa jauh observations menyebar dari pusat tersebut?”

Itu membutuhkan mean sebagai referensi penting untuk variance dan standard deviation.

Jadi dependency-nya:

**meaningful variable**  
$\downarrow$  
**observed values**  
$\downarrow$  
**center: mean / median / mode**  
$\downarrow$  
**spread: range / variance / standard deviation**

---

# 50. Summary

Pada Topic 02 kita belajar bahwa:

1. ukuran pusat membantu merangkum kumpulan data;
2. mean adalah jumlah seluruh nilai dibagi banyak nilai;
3. formula core mean adalah:

$$
\bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_i;
$$

4. median membutuhkan sorting;
5. untuk $n$ ganjil, median adalah satu nilai di posisi tengah;
6. untuk $n$ genap, median adalah mean dua nilai tengah;
7. median tidak harus muncul sebagai observation asli;
8. mode adalah nilai/kategori dengan frekuensi tertinggi;
9. mode dapat diterapkan pada data kategorikal;
10. dataset dapat tidak mempunyai mode atau mempunyai lebih dari satu mode;
11. mean lebih sensitif terhadap besar nilai ekstrem karena memakai setiap nilai dalam penjumlahan;
12. median berbasis posisi sehingga sering lebih stabil terhadap nilai ekstrem;
13. median tidak otomatis selalu lebih baik daripada mean;
14. mean yang sama tidak berarti dua dataset sama;
15. satu ukuran pusat tidak menjelaskan spread atau distribution secara lengkap;
16. mean quiz ratio HerAI adalah $0.75$;
17. median quiz ratio HerAI juga $0.75$;
18. mean completion ratio HerAI adalah $0.71875$;
19. median completion ratio HerAI adalah $0.6875$;
20. mean dan median study duration HerAI adalah $42.5$ menit;
21. canonical quiz ratio HerAI tidak mempunyai mode;
22. tidak satu pun hasil tersebut otomatis merupakan probability atau bukti kualitas model.

---

# 51. Mastery Check

Sebelum lanjut, pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan apa yang dimaksud ukuran pusat data.
- [ ] **I can** menghitung arithmetic mean dataset numerik kecil.
- [ ] **I can** membaca $\bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_i$ dengan bahasa manusia.
- [ ] **I can** menjelaskan arti $x_i$, $i$, $n$, $\sum$, dan $\bar{x}$.
- [ ] **I can** mengurutkan data sebelum mencari median.
- [ ] **I can** menentukan median untuk $n$ ganjil.
- [ ] **I can** menentukan median untuk $n$ genap.
- [ ] **I can** menjelaskan mengapa median tidak harus ada di raw observations.
- [ ] **I can** menentukan mode dari data numerik.
- [ ] **I can** menentukan mode dari data kategorikal.
- [ ] **I can** mengenali dataset tanpa mode.
- [ ] **I can** mengenali lebih dari satu mode.
- [ ] **I can** menjelaskan mengapa nilai ekstrem lebih kuat menggeser mean daripada median.
- [ ] **I can** menjelaskan mengapa median tidak selalu otomatis lebih baik.
- [ ] **I can** menjelaskan mengapa mean sama tidak berarti dataset sama.
- [ ] **I can** memilih ukuran pusat berdasarkan pertanyaan dan semantics variable.
- [ ] **I can** menjelaskan bahwa ukuran pusat bukan model evaluation, probability, atau causal evidence.

Jika beberapa poin masih belum yakin, ulangi:

- Formula Mean;
- Median Odd vs Even;
- Mode;
- Change One Thing;
- HerAI Worked Examples;
- Misconception Challenges.

---

# 52. Bridge ke Topic 03 — Range, Variance, Standard Deviation

Kita sekarang dapat menjawab pertanyaan seperti:

> “Di mana pusat data ini?”

Tetapi dua dataset dapat mempunyai mean yang sama dan tetap terlihat sangat berbeda.

Contoh:

$$
4,\ 5,\ 5,\ 6
$$

dan:

$$
0,\ 5,\ 5,\ 10
$$

sama-sama mempunyai mean:

$$
5.
$$

Pertanyaan berikutnya adalah:

> **Seberapa tersebar nilai-nilai tersebut dari pusatnya?**

Itulah pintu masuk ke:

**Topic 03 — Range, Variance, Standard Deviation.**

---

# 53. Referensi Topic 02

Sumber lengkap dan claim mapping tersedia di `referensi-topic-02.md`.

- [R1] OpenStax — *Measures of the Center of the Data*.
- [R2] NIST/SEMATECH — *Measures of Location*.
- [R3] NIST/SEMATECH — *Distribution (Location, Spread and Shape)*.

---

# 54. Gerbang STOP

Topic 02 selesai pada scope:

**center intuition → mean → sigma notation → median ordered data → odd/even median → mode → no/multiple modes → extreme-value sensitivity → choosing a center → HerAI interpretation → AI safety.**

Topic 03 **belum** diproduksi di package ini.

> **Apakah Topic 02 Submodule 03 disetujui dan kita boleh melanjutkan ke Topic 03 — Range, Variance, Standard Deviation?**
