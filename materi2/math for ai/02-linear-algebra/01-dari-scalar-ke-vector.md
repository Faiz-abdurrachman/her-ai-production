# Topic 01 — Dari Scalar ke Vector: Satu Peserta, Banyak Feature

> **Submodul 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks**  
> **Filename:** `01-dari-scalar-ke-vector.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 55–75 menit membaca + 30–40 menit eksplorasi/praktik  
> **Prerequisite:** Submodul 01 — Mathematical Readiness, khususnya representation, feature, ratio, variable, ordered pair, dan indexed notation  
> **Forward dependency:** Topic 02 — Membaca Vektor: Komponen, Dimensi, Shape, dan Feature Order  
> **Boundary:** Topic ini berhenti pada scalar → multiple scalar features → ordered collection → vector intuition → vector notation → components → dimension preview. Belum mengajarkan operasi vektor, norm, distance, dot product, cosine similarity, atau matrix.

---

# 1. Mengapa topik ini ada?

Pada Submodul 01 kita sudah bekerja dengan beberapa quantity yang mewakili sebagian informasi tentang peserta HerAI.

Untuk Alya, misalnya, kita sudah mempunyai:

$$
q=0.80
$$

dan:

$$
c=0.75
$$

Dengan definisi:

- $q$ = quiz ratio Alya;
- $c$ = completion ratio Alya.

Masing-masing nilai tersebut adalah **satu numerical quantity**.

Ketika kita hanya ingin membicarakan quiz ratio, satu scalar sudah cukup.

Ketika kita hanya ingin membicarakan completion ratio, satu scalar juga cukup.

Tetapi sistem AI hampir tidak pernah bekerja hanya dengan satu aspek dari sebuah observation.

Satu participant dapat mempunyai beberapa feature yang relevan sekaligus:

- quiz ratio;
- completion ratio;
- study duration;
- jumlah aktivitas;
- hasil assessment sebelumnya;
- dan numerical features lain yang didefinisikan sesuai task.

Google Machine Learning Glossary menyebut **feature** sebagai input variable untuk model, dan **feature vector** sebagai array dari feature values yang membentuk satu example. [R2]

Masalah kita sekarang adalah:

> **Jika satu participant memiliki beberapa meaningful numerical features, bagaimana kita merepresentasikannya sebagai satu object tanpa kehilangan feature order dan semantics?**

Inilah titik masuk ke Linear Algebra.

Kita belum akan menghitung jarak, similarity, atau melakukan operasi terhadap vector.

Pekerjaan Topic 01 lebih mendasar:

> **membangun object representasi yang menyatukan beberapa scalar dengan urutan dan arti yang jelas.**

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 01, kamu diharapkan mampu:

1. membedakan **scalar** dan **vector** pada contoh data sederhana;
2. menjelaskan mengapa satu observation dapat membutuhkan lebih dari satu numerical feature;
3. menjelaskan mengapa vector bukan sekadar kumpulan angka acak;
4. menyusun beberapa scalar features menjadi **ordered collection**;
5. menjelaskan mengapa **feature order** harus konsisten;
6. membaca dan menulis vector menggunakan notation bold lowercase seperti $\mathbf{x}$;
7. membaca participant vector seperti $\mathbf{x}^{(i)}$;
8. menghubungkan component vector dengan indexed feature $x_j^{(i)}$;
9. mengidentifikasi component pertama dan kedua dari vector dua komponen;
10. menjelaskan secara preview bahwa dimension menunjukkan jumlah components pada representation;
11. membangun participant vector HerAI dari quiz ratio dan completion ratio;
12. membedakan **coordinate point**, **vector components**, **arrow representation**, dan **underlying participant data**;
13. menjelaskan mengapa nilai dalam rentang $0$–$1$ tidak otomatis probability;
14. menjelaskan mengapa categorical labels seperti `Basic/Medium/High` tidak boleh dipaksa menjadi arbitrary numerical components tanpa justification;
15. mengenali masalah unit/scale ketika feature seperti study duration ditambahkan ke vector;
16. menjelaskan secara konseptual mengapa feature-vector representation penting dalam AI/ML tanpa menganggap vector sebagai model AI.

---

# 3. Prerequisite Recall — Apa yang Sudah Kita Punya?

Topic ini tidak mengulang Submodul 01 dari awal.

Kita hanya mengaktifkan kembali beberapa konsep yang sudah dikenal.

## 3.1 Representation

Alya sebagai manusia nyata bukan sama dengan data yang disimpan tentang Alya.

Record hanya merepresentasikan sebagian informasi.

## 3.2 Feature

Feature adalah information/input variable yang dipilih untuk membantu task tertentu.

Tidak semua field harus menjadi feature.

## 3.3 Ratio

Untuk Alya:

$$
q=0.80
$$

berarti quiz ratio-nya $0.80$.

Dan:

$$
c=0.75
$$

berarti completion ratio-nya $0.75$.

Nilai tersebut adalah ratio, bukan otomatis probability.

## 3.4 Indexed feature

Kita sudah pernah membaca:

$$
x_j^{(i)}
$$

sebagai:

> nilai feature ke-$j$ untuk observation ke-$i$.

Topic 01 akan mengumpulkan beberapa $x_j^{(i)}$ milik observation yang sama ke dalam satu vector.

---

# 4. Pertanyaan Pemantik — Satu Peserta, Dua Angka

Perhatikan Alya.

| Feature | Nilai |
|---|---:|
| Quiz ratio | $0.80$ |
| Completion ratio | $0.75$ |

Kalau kita menulis:

$$
q=0.80
$$

kita sedang menyimpan satu quantity.

Kalau kita menulis:

$$
c=0.75
$$

kita juga sedang menyimpan satu quantity.

Sekarang bayangkan sistem ingin membawa **dua informasi tersebut bersama-sama** sebagai representation dari satu observation.

Kita mungkin menuliskan:

$$
(0.80,0.75)
$$

Tetapi muncul pertanyaan penting.

Apa arti angka pertama?

Apa arti angka kedua?

Apakah:

$$
(0.80,0.75)
$$

sama maknanya dengan:

$$
(0.75,0.80)?
$$

Kalau kita tidak mendefinisikan urutan, representation menjadi ambigu.

---

# 5. Predict Before Formalization

Sebelum membaca definisi vector, jawab berdasarkan reasoning.

## Prediksi A — Apakah Urutan Penting?

Kita mendefinisikan:

- posisi pertama = quiz ratio;
- posisi kedua = completion ratio.

Alya disimpan sebagai:

$$
(0.80,0.75)
$$

Apakah berikut ini masih merepresentasikan nilai yang sama dengan contract yang sama?

$$
(0.75,0.80)
$$

Pilih:

A. Ya, karena dua angka yang digunakan sama.  
B. Tidak, karena posisi pertama dan kedua mempunyai semantics berbeda.

**Simpan jawabanmu sebelum lanjut.**

## Prediksi B — Apakah Vector Sama dengan Participant?

Jika Alya direpresentasikan dengan dua nilai:

$$
(0.80,0.75)
$$

apakah representation tersebut adalah Alya secara utuh?

A. Ya.  
B. Tidak.

## Prediksi C — Apakah Semua Angka Aman Menjadi Component?

HerAI memiliki kategori:

`Math Readiness = Medium`

Seseorang mengusulkan:

`Basic = 1`, `Medium = 2`, `High = 3`

lalu memasukkan nilai `2` ke vector dan memperlakukan jarak antara `1`, `2`, dan `3` sebagai meaningful numerical distance.

Apakah ini otomatis valid?

A. Ya, karena kategorinya sudah menjadi angka.  
B. Tidak, karena numeric coding tidak otomatis mendefinisikan interval/distance yang bermakna.

Kita akan kembali ke tiga prediksi ini nanti.

---

# 6. Intuisi — Dari Satu Label Angka ke Satu Paket Terurut

Bayangkan kamu mempunyai satu kartu peserta.

Di kartu itu ada dua kotak:

- kotak pertama selalu menyimpan quiz ratio;
- kotak kedua selalu menyimpan completion ratio.

Untuk Alya:

- kotak 1 berisi $0.80$;
- kotak 2 berisi $0.75$.

Untuk Bima:

- kotak 1 berisi $0.60$;
- kotak 2 berisi $0.625$.

Kita tidak hanya menyimpan **dua angka**.

Kita menyimpan:

> **dua angka dalam dua posisi yang telah mempunyai arti.**

Itulah intuisi paling penting sebelum notation vector muncul.

Kita dapat memikirkan perjalanan ini sebagai:

**satu scalar**  
↓  
**beberapa scalar untuk observation yang sama**  
↓  
**posisi feature didefinisikan**  
↓  
**values disusun sebagai ordered collection**  
↓  
**vector representation**

Vector menjadi berguna bukan hanya karena ia “mengumpulkan angka”, tetapi karena ia menyediakan struktur yang konsisten untuk membawa beberapa numerical components bersama-sama.

---

# 7. Concrete Example — Dua Pengukuran Sederhana

Sebelum menggunakan HerAI, lihat contoh matematika kecil.

Kita mempunyai dua scalar:

$$
x_1=2
$$

$$
x_2=5
$$

Kita ingin menyimpan keduanya dalam urutan:

1. $x_1$;
2. $x_2$.

Ordered collection-nya dapat dibaca sebagai:

$$
(2,5)
$$

Dalam Linear Algebra, kita dapat merepresentasikan dua components tersebut sebagai vector kolom:

$$
\mathbf{x}
=
\begin{bmatrix}
2 \\
5
\end{bmatrix}
$$

Georgia Tech *Interactive Linear Algebra* menggunakan coordinate/list representation dan lazim menuliskan vector secara vertikal seperti satu column. [R1]

Di sini:

- $\mathbf{x}$ = nama vector;
- component pertama = $2$;
- component kedua = $5$.

Jika kita menulis:

$$
\begin{bmatrix}
5 \\
2
\end{bmatrix}
$$

kita memperoleh vector terurut yang berbeda.

Kedua vector menggunakan angka yang sama, tetapi order-nya berbeda.

---

# 8. Definisi Formal — Scalar, Vector, dan Component

Kita sekarang masuk ke definisi yang cukup formal untuk kebutuhan Math for AI.

## 8.1 Scalar

Pada konteks Topic 01, **scalar** adalah satu numerical value yang merepresentasikan satu quantity.

Contoh:

$$
q=0.80
$$

$$
c=0.75
$$

$$
t=45
$$

jika $t$ didefinisikan sebagai study duration dalam menit.

Scalar tidak berarti “angka kecil” dan vector tidak berarti “angka besar”.

Perbedaannya adalah struktur representation.

## 8.2 Vector

Untuk Topic 01, kita menggunakan definisi:

> **Vector adalah mathematical object yang mempunyai beberapa numerical components yang tersusun dalam urutan tertentu.**

Dalam konteks data/ML, jika components tersebut adalah feature values dari satu example, representation tersebut dapat disebut **feature vector**. Google mendefinisikan feature vector sebagai array feature values yang membentuk satu example. [R2]

## 8.3 Component

**Component** adalah satu scalar value yang menempati satu posisi di dalam vector.

Misalnya:

$$
\mathbf{x}
=
\begin{bmatrix}
2 \\
5
\end{bmatrix}
$$

mempunyai:

- component pertama = $2$;
- component kedua = $5$.

## 8.4 Ordered

Kata **ordered** sangat penting.

Vector:

$$
\begin{bmatrix}
2 \\
5
\end{bmatrix}
$$

berbeda dengan:

$$
\begin{bmatrix}
5 \\
2
\end{bmatrix}
$$

karena posisi component berbeda.

---

# 9. Dari Feature ke Feature Vector

Pada machine learning, satu example dapat mempunyai satu atau lebih features. [R2]

Misalkan HerAI memilih dua numerical features:

1. quiz ratio;
2. completion ratio.

Kita definisikan **feature contract**:

$$
\text{component 1}=\text{quiz ratio}
$$

$$
\text{component 2}=\text{completion ratio}
$$

Setelah contract tersebut dibuat, setiap participant vector harus mengikuti urutan yang sama.

Alya tidak boleh disimpan sebagai `[quiz, completion]` sementara Bima tiba-tiba disimpan sebagai `[completion, quiz]`.

Kalau itu terjadi, posisi yang sama tidak lagi mempunyai meaning yang konsisten.

---

# 10. Notasi — Dari Scalar ke Vector

Notation contract pada Math for AI membedakan scalar dan vector secara visual.

## 10.1 Scalar — non-bold

Gunakan non-bold:

$$
x,\,y,\,q,\,c
$$

Contoh:

$$
q=0.80
$$

## 10.2 Vector — bold lowercase

Gunakan bold lowercase:

$$
\mathbf{x},\,\mathbf{y},\,\mathbf{v}
$$

Contoh:

$$
\mathbf{x}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

## 10.3 Observation index

Untuk observation ke-$i$:

$$
\mathbf{x}^{(i)}
$$

Dibaca:

> “vector $x$ untuk observation ke-$i$.”

## 10.4 Component index

Component ke-$j$ dari observation ke-$i$:

$$
x_j^{(i)}
$$

Perhatikan perbedaannya:

- $\mathbf{x}^{(i)}$ = seluruh vector observation ke-$i$;
- $x_j^{(i)}$ = satu scalar component di dalam vector tersebut.

Boldness di sini membantu kita membaca object matematika dengan aman.

---

# 11. Formula Representasi Utama

Untuk dua feature, kita dapat menulis generic participant vector:

$$
\mathbf{x}^{(i)}
=
\begin{bmatrix}
x_1^{(i)} \\
x_2^{(i)}
\end{bmatrix}
$$

## Definisi simbol

- $\mathbf{x}^{(i)}$ = vector untuk observation ke-$i$;
- $i$ = index observation;
- $x_1^{(i)}$ = component pertama observation ke-$i$;
- $x_2^{(i)}$ = component kedua observation ke-$i$.

Untuk HerAI, kita tetapkan:

$$
x_1^{(i)}=\text{quiz ratio}
$$

$$
x_2^{(i)}=\text{completion ratio}
$$

## Cara membaca

Formula:

$$
\mathbf{x}^{(i)}
=
\begin{bmatrix}
x_1^{(i)} \\
x_2^{(i)}
\end{bmatrix}
$$

bisa dibaca:

> “Vector untuk observation ke-$i$ terdiri dari component pertama dan component kedua yang disusun sesuai feature order yang sudah didefinisikan.”

## Kapan digunakan?

Notation ini digunakan ketika kita ingin membawa beberapa numerical features milik satu observation sebagai satu object terstruktur.

## Batas interpretasi

Formula tersebut **tidak** mengatakan:

- vector adalah participant secara utuh;
- vector adalah prediction;
- vector adalah probability;
- vector adalah model AI;
- setiap component pasti useful untuk task.

Ia hanya menyatakan sebuah representation structure.

---

# 12. Math Reading Skill — Membaca Vector sebagai Makna

Linear Algebra untuk AI bukan sekadar melihat bracket.

Kamu perlu mampu bergerak dua arah:

**symbol → meaning**

dan:

**meaning → symbol**

Misalnya:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

Jika feature order adalah:

1. quiz ratio;
2. completion ratio;

maka kita harus mampu mengatakan:

> Observation kedua mempunyai quiz ratio $0.60$ dan completion ratio $0.625$.

Sebaliknya, jika diketahui:

- Dewi quiz ratio $0.70$;
- Dewi completion ratio $0.50$;

kita harus mampu membangun:

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70 \\
0.50
\end{bmatrix}
$$

Math Reading Skill memastikan notation tidak menjadi “kode rahasia”.

---

# 13. Worked Example 1 — Basic: Dari Dua Scalar ke Vector

Diketahui:

$$
x_1=3
$$

$$
x_2=7
$$

Feature/coordinate order sudah didefinisikan:

1. posisi pertama menyimpan $x_1$;
2. posisi kedua menyimpan $x_2$.

## Step 1 — Identifikasi scalar

Kita mempunyai dua scalar:

$$
x_1=3
$$

$$
x_2=7
$$

## Step 2 — Pertahankan order

Urutan yang ditetapkan adalah:

$$
(x_1,x_2)
$$

Dengan values:

$$
(3,7)
$$

## Step 3 — Tulis sebagai vector

$$
\mathbf{x}
=
\begin{bmatrix}
3 \\
7
\end{bmatrix}
$$

## Step 4 — Baca components

Component pertama:

$$
x_1=3
$$

Component kedua:

$$
x_2=7
$$

## Step 5 — Interpretasi

Vector tersebut mempunyai dua numerical components dalam urutan yang sudah ditentukan.

Kalau order ditukar:

$$
\begin{bmatrix}
7 \\
3
\end{bmatrix}
$$

kita mendapatkan vector yang berbeda.

Belum ada penjumlahan, pengurangan, magnitude, atau distance yang dihitung.

---

# 14. Worked Example 2 — HerAI: Membangun Vector Alya

Kita kembali ke running case.

Data Alya:

| Participant | Quiz ratio $q$ | Completion ratio $c$ |
|---|---:|---:|
| Alya | $0.80$ | $0.75$ |

Feature contract:

1. component pertama = quiz ratio;
2. component kedua = completion ratio.

Alya adalah observation pertama pada mini dataset kita.

## Step 1 — Tulis scalar yang sudah dikenal

$$
q=0.80
$$

$$
c=0.75
$$

## Step 2 — Hubungkan scalar ke component position

Untuk Alya:

$$
x_1^{(1)}=0.80
$$

karena component pertama adalah quiz ratio.

Dan:

$$
x_2^{(1)}=0.75
$$

karena component kedua adalah completion ratio.

## Step 3 — Susun vector

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

## Step 4 — Baca dalam bahasa manusia

> Vector participant Alya pada representation ini mempunyai quiz ratio $0.80$ pada component pertama dan completion ratio $0.75$ pada component kedua.

## Step 5 — Interpretasi yang aman

Vector ini merepresentasikan **dua aspek numerik yang dipilih** tentang Alya.

Vector ini bukan Alya secara utuh.

Vector ini juga bukan:

- probability keberhasilan;
- ranking peserta;
- AI confidence;
- model recommendation.

Kita baru membangun representation.

---

# 15. Explore with Small Data — Empat Participant, Satu Feature Contract

Persistent HerAI dataset:

| $i$ | Participant | Quiz ratio $q$ | Completion ratio $c$ |
|---:|---|---:|---:|
| 1 | Alya | $0.80$ | $0.75$ |
| 2 | Bima | $0.60$ | $0.625$ |
| 3 | Citra | $0.90$ | $1.00$ |
| 4 | Dewi | $0.70$ | $0.50$ |

Feature order tetap:

1. quiz ratio;
2. completion ratio.

Maka:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

$$
\mathbf{x}^{(3)}
=
\begin{bmatrix}
0.90 \\
1.00
\end{bmatrix}
$$

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70 \\
0.50
\end{bmatrix}
$$

Sekarang baca beberapa component.

## 15.1 Bima

$$
x_1^{(2)}=0.60
$$

Artinya:

> quiz ratio Bima adalah $0.60$.

$$
x_2^{(2)}=0.625
$$

Artinya:

> completion ratio Bima adalah $0.625$.

## 15.2 Citra

$$
x_1^{(3)}=0.90
$$

$$
x_2^{(3)}=1.00
$$

## 15.3 Dewi

$$
x_1^{(4)}=0.70
$$

$$
x_2^{(4)}=0.50
$$

Pertanyaan utama bukan “siapa paling dekat?” atau “berapa similarity?”.

Itu belum scope kita.

Pertanyaan Topic 01 adalah:

> **Apakah kita dapat membaca setiap vector dan memastikan setiap posisi tetap mempunyai semantics yang sama?**

---

# 16. Component dan Dimension Preview

Kita sekarang memiliki:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Berapa components?

Ada dua.

Pada level Topic 01, kita cukup memperkenalkan:

> **dimension menunjukkan berapa banyak components yang dimiliki vector representation.**

Karena vector Alya memiliki dua components, kita mengatakan representation ini berdimensi $2$.

Penting:

> **dimension bukan ukuran seberapa “besar” vector.**

Vector:

$$
\begin{bmatrix}
1000 \\
2000
\end{bmatrix}
$$

juga mempunyai dua components.

Vector:

$$
\begin{bmatrix}
0.01 \\
0.02
\end{bmatrix}
$$

juga mempunyai dua components.

Jadi keduanya sama-sama berdimensi $2$, walaupun values-nya sangat berbeda.

Kita belum membahas **magnitude/norm**. Itu konsep berikutnya di topic lain.

---

# 17. Point, Vector, Arrow, dan Participant — Jangan Dicampur

Pada Submodul 01 kita sudah mengenal ordered pair dan coordinate plane.

Alya dapat ditulis sebagai pair:

$$
(0.80,0.75)
$$

Jika:

- horizontal axis = quiz ratio;
- vertical axis = completion ratio;

maka pair tersebut dapat dipetakan sebagai point pada plane.

Dalam Linear Algebra, coordinates yang sama juga dapat direpresentasikan sebagai vector:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Georgia Tech menjelaskan hubungan point dan vector melalui coordinate lists, serta menunjukkan vector secara geometris sebagai arrow. [R1]

Tetapi kita harus membedakan empat hal.

## 17.1 Underlying participant

Alya adalah manusia nyata dengan pengalaman dan konteks yang jauh lebih kaya.

## 17.2 Participant data

`quiz ratio = 0.80` dan `completion ratio = 0.75` adalah dua data values yang direkam.

## 17.3 Vector components

$$
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

adalah structured mathematical representation dari dua values tersebut.

## 17.4 Geometric arrow/point

Kita dapat memvisualisasikan coordinates pada plane untuk membantu intuition.

Visual tersebut bukan lokasi fisik Alya.

Ia adalah geometric representation dari numerical components.

---

# 18. Change One Thing — Satu Feature Berubah

Sekarang kita ubah hanya satu bagian.

Vector awal Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Misalkan quiz ratio tetap:

$$
q=0.80
$$

Tetapi completion ratio berubah:

$$
c:0.75\rightarrow0.85
$$

Sebelum melihat jawabannya, prediksi:

> component mana yang harus berubah?

Karena feature order adalah `[quiz ratio, completion ratio]`, component pertama tetap dan component kedua berubah.

Representation baru:

$$
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
\rightarrow
\begin{bmatrix}
0.80 \\
0.85
\end{bmatrix}
$$

Kita belum menghitung subtraction antar-vector.

Kita hanya melakukan **component-level reasoning**:

- quiz ratio tidak berubah → component pertama tetap;
- completion ratio berubah → component kedua berubah.

---

# 19. Apa yang Terjadi Jika Feature Order Salah?

Canonical feature order:

$$
[\text{quiz ratio},\text{completion ratio}]
$$

Bima seharusnya:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

Sekarang seseorang salah menyimpan:

$$
\tilde{\mathbf{x}}^{(2)}
=
\begin{bmatrix}
0.625 \\
0.60
\end{bmatrix}
$$

Angkanya masih “benar” secara individual.

Tetapi representation contract rusak.

Component pertama seharusnya quiz ratio, tetapi sekarang berisi completion ratio.

Component kedua seharusnya completion ratio, tetapi sekarang berisi quiz ratio.

Ini contoh penting:

> **data values dapat valid, tetapi representation tetap salah karena semantics posisi tidak konsisten.**

---

# 20. Feature Tambahan — Study Duration dan Masalah Scale

HerAI juga mempunyai study duration.

Untuk Alya:

$$
t=45\text{ min}
$$

Secara representation, kita dapat membayangkan tiga components:

1. quiz ratio;
2. completion ratio;
3. study duration dalam menit.

Maka bentuk struktur dapat menjadi:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75 \\
45
\end{bmatrix}
$$

Apakah ini otomatis salah?

Tidak.

Ketiga values dapat disimpan dalam ordered numerical representation **jika semantics dan unit setiap component jelas**.

Tetapi ada masalah baru.

- quiz ratio berada sekitar $0$ sampai $1$;
- completion ratio berada sekitar $0$ sampai $1$;
- study duration menggunakan unit menit dan nilainya dapat puluhan atau ratusan.

Google menjelaskan bahwa numerical features dengan ranges yang sangat berbeda sering memerlukan scaling/normalization agar berada pada scale yang lebih sebanding untuk banyak ML workflows. [R4]

Topic 01 belum mengajarkan normalization.

Pesan yang perlu kita pegang hanya:

> **menempatkan beberapa numbers dalam satu vector tidak membuat units dan scales-nya otomatis comparable.**

Karena itu kita juga tidak boleh mengatakan:

> “$45$ adalah component paling penting karena $45>0.80$.”

Numerical magnitude tidak otomatis berarti feature importance.

---

# 21. Numerical Feature ≠ Angka yang Kebetulan Berbentuk Digit

Google membedakan numerical data yang benar-benar berperilaku sebagai numbers dari categorical data yang kebetulan ditulis menggunakan digits. [R3]

Contoh:

`Participant ID = 204`

Angka `204` tidak otomatis berarti participant tersebut mempunyai quantity yang dua kali lebih besar daripada ID `102`.

Begitu juga kategori:

- Basic;
- Medium;
- High.

Jika kita memberi code:

- Basic = 1;
- Medium = 2;
- High = 3;

kita belum otomatis mendefinisikan:

- bahwa jarak Basic→Medium sama dengan Medium→High;
- bahwa High adalah $3$ kali Basic;
- bahwa distance geometris berdasarkan coding tersebut meaningful.

Karena itu Topic 01 menggunakan quiz ratio dan completion ratio sebagai canonical components: keduanya sudah mempunyai meaningful numerical interpretation dari Submodul 01.

---

# 22. Why This Matters in AI/ML

Feature-vector representation muncul sangat sering dalam machine learning.

Google mendefinisikan feature vector sebagai array feature values yang membentuk satu example, dan feature vector digunakan sebagai input pada training maupun inference. [R2]

Secara konseptual:

**one example**  
↓  
**multiple feature values**  
↓  
**feature vector**  
↓  
**model consumes representation**

Tetapi jangan melompat terlalu jauh.

Membuat vector belum berarti kita sudah:

- memilih model yang tepat;
- melakukan training;
- memperoleh prediction;
- mengetahui feature mana yang useful;
- melakukan evaluation;
- membuat recommendation yang valid.

Vector hanya menyediakan **structured numerical representation** yang dapat digunakan tahap berikutnya.

Dalam modern ML, vector representations juga muncul pada tabular input, embeddings, hidden representations, model parameters, dan banyak bentuk data lain.

Namun Topic 01 tidak membahas embeddings atau parameter vectors secara formal.

Kita hanya membangun grammar dasarnya.

---

# 23. Misconception Challenge

## Common misconception 1

> “Vector itu cuma list angka.”

### Koreksi

Secara mathematical coordinate representation, vector memang dapat ditulis sebagai ordered numerical components. Tetapi dalam data/AI context, setiap posisi harus mempunyai semantics yang didefinisikan jika vector tersebut ingin menjadi meaningful feature representation.

---

## Common misconception 2

> “Kalau angkanya sama, order tidak penting.”

### Koreksi

Order adalah bagian dari representation.

$$
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
\neq
\begin{bmatrix}
0.75 \\
0.80
\end{bmatrix}
$$

pada feature contract yang sama.

---

## Common misconception 3

> “Dimension 2 berarti vector-nya kecil.”

### Koreksi

Dimension menunjukkan jumlah components, bukan magnitude.

---

## Common misconception 4

> “Kalau semua component berada antara 0 dan 1, vector itu probability.”

### Koreksi

Range numerical tidak menentukan semantics.

Quiz ratio dan completion ratio adalah ratios yang didefinisikan dari aktivitas belajar, bukan probability hanya karena nilainya berada pada $0$–$1$.

---

## Common misconception 5

> “Basic = 1, Medium = 2, High = 3, berarti aman dipakai seperti numerical coordinate biasa.”

### Koreksi

Arbitrary numeric coding tidak otomatis memberikan interval atau ratio meaning.

---

## Common misconception 6

> “Kalau study duration bernilai 45 dan quiz ratio 0.80, berarti study duration lebih penting.”

### Koreksi

Nilai menggunakan unit dan scale berbeda. Raw magnitude tidak otomatis berarti importance. [R4]

---

## Common misconception 7

> “Vector Alya adalah Alya dalam bentuk digital.”

### Koreksi

Vector adalah representation dari selected features tentang Alya, bukan Alya sebagai manusia secara utuh.

---

# 24. Try It Yourself

Gunakan feature contract:

1. component pertama = quiz ratio;
2. component kedua = completion ratio.

## A. Bima

Diketahui:

$$
q=0.60
$$

$$
c=0.625
$$

Tulis:

$$
\mathbf{x}^{(2)}
$$

lalu jelaskan arti kedua components.

## B. Citra

Diketahui:

$$
q=0.90
$$

$$
c=1.00
$$

Tulis vector Citra dan sebutkan jumlah components.

## C. Audit Order

Seseorang menulis Dewi sebagai:

$$
\begin{bmatrix}
0.50 \\
0.70
\end{bmatrix}
$$

Padahal canonical order tetap `[quiz ratio, completion ratio]`.

Apa masalahnya?

## D. Representation Safety

Apakah kita boleh memasukkan `participant_id = 204` sebagai numerical component lalu mengatakan participant ID `408` dua kali “lebih besar” secara meaningful?

Jelaskan.

---

# 25. Visual / Interactive Specification untuk Web

## [STEP-BY-STEP REVEAL] Scalar Cards → Vector

**Learning purpose:**  
Menunjukkan bahwa vector lahir dari beberapa scalar yang disusun dalam fixed order, bukan dari angka acak.

**Initial state/data:**

- Participant: Alya;
- quiz ratio $q=0.80$;
- completion ratio $c=0.75$.

**Learner action:**  
Klik `Susun sebagai vector`.

**Expected behavior:**

1. scalar card `Quiz ratio = 0.80` muncul;
2. scalar card `Completion ratio = 0.75` muncul;
3. UI menampilkan label `Feature order: q → c`;
4. cards bergerak/tersusun menjadi:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

5. label component muncul:
   - component 1 = quiz ratio;
   - component 2 = completion ratio.

**Feedback:**  
“Dua scalar sekarang berada dalam satu ordered vector representation.”

**Safety note:**  
“Vector ini merepresentasikan selected participant features, bukan participant secara utuh.”

---

## [INTERACTIVE VISUAL] Participant Switcher

**Learning purpose:**  
Menunjukkan bahwa feature order tetap, sementara values berubah antar-observations.

**Initial state:** Alya.

**Learner action:**  
Pilih Alya/Bima/Citra/Dewi.

**Expected behavior:**  
UI update:

- participant name;
- $q$;
- $c$;
- $\mathbf{x}^{(i)}$;
- component labels;
- natural-language reading.

**Safety:**  
Tidak menampilkan ranking, norm, distance, nearest participant, atau similarity.

---

## [COMPARE VIEW] Same Numbers, Different Order

**Learning purpose:**  
Menguatkan bahwa order adalah bagian dari meaning.

Left:

$$
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Label:

`[quiz ratio, completion ratio]`

Right:

$$
\begin{bmatrix}
0.75 \\
0.80
\end{bmatrix}
$$

Label tetap:

`[quiz ratio, completion ratio]`

**Learner action:**  
Pilih representation Alya yang benar.

**Feedback:**  
Jika salah: “Angkanya sama, tetapi component positions berubah. Posisi pertama wajib tetap quiz ratio.”

---

## [INTERACTIVE VISUAL] Point vs Vector vs Participant

**Learning purpose:**  
Membedakan empat level representation.

**Tabs:**

1. `Participant` — text card Alya;
2. `Data` — $q=0.80$, $c=0.75$;
3. `Vector` — column vector;
4. `2D view` — point/arrow dari origin ke $(0.80,0.75)$.

**Expected message:**  
“Empat view ini berkaitan, tetapi bukan object yang identik.”

---

## [NUMBER MANIPULATOR] Add One Feature Preview

**Learning purpose:**  
Memperlihatkan dimension preview dan scale warning.

**Initial vector:**

$$
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Toggle:

`Tambahkan study duration = 45 min`

Setelah aktif:

$$
\begin{bmatrix}
0.80 \\
0.75 \\
45
\end{bmatrix}
$$

UI update:

`2 components → 3 components`

**Safety note:**  
“Feature ketiga menggunakan menit, sedangkan dua feature pertama adalah ratios. Kita belum membandingkan scale atau menghitung distance.”

---

# 26. Checkpoint

## Checkpoint 1

Mana scalar?

A.

$$
q=0.80
$$

B.

$$
\mathbf{x}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

**Jawaban:** A adalah scalar; B adalah vector.

---

## Checkpoint 2

Jika feature order adalah `[quiz ratio, completion ratio]`, apa arti:

$$
x_2^{(3)}=1.00?
$$

**Jawaban:** completion ratio observation ke-3, yaitu Citra, bernilai $1.00$.

---

## Checkpoint 3

Apakah:

$$
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

dan:

$$
\begin{bmatrix}
0.75 \\
0.80
\end{bmatrix}
$$

sama pada feature contract `[quiz ratio, completion ratio]`?

**Jawaban:** Tidak.

---

## Checkpoint 4

Vector memiliki tiga components. Berapa dimension preview-nya?

**Jawaban:** $3$.

---

## Checkpoint 5

Apakah dimension $3$ berarti vector mempunyai magnitude $3$?

**Jawaban:** Tidak. Dimension adalah jumlah components; magnitude belum dipelajari.

---

## Checkpoint 6

Apakah `Medium = 2` otomatis valid sebagai quantitative coordinate dengan meaningful distance?

**Jawaban:** Tidak.

---

# 27. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** membedakan scalar dan vector.
- [ ] **I can** menjelaskan mengapa satu participant dapat mempunyai beberapa numerical features.
- [ ] **I can** menjelaskan bahwa vector adalah ordered representation, bukan random list.
- [ ] **I can** menyebut arti setiap component pada participant vector HerAI.
- [ ] **I can** menulis $\mathbf{x}^{(i)}$ untuk satu observation.
- [ ] **I can** membaca $x_j^{(i)}$ sebagai satu scalar component.
- [ ] **I can** menjaga feature order tetap konsisten antar-participants.
- [ ] **I can** menjelaskan bahwa dimension adalah jumlah components pada level topic ini.
- [ ] **I can** membedakan participant, data values, vector, dan geometric visual.
- [ ] **I can** menolak arbitrary category coding sebagai quantitative distance tanpa justification.
- [ ] **I can** mengenali bahwa unit/scale berbeda perlu diperhatikan ketika feature baru ditambahkan.
- [ ] **I can** menjelaskan bahwa feature vector bukan probability, prediction, atau model AI.

Jika lebih dari dua kotak belum terasa yakin, ulangi bagian **Worked Example**, **Feature Order**, dan **Misconception Challenge** sebelum melanjutkan.

---

# 28. Why This Matters Later

Topic ini sengaja berhenti sebelum kita melakukan operasi terhadap vector.

Kita baru memastikan learner mempunyai object yang benar untuk dioperasikan.

Perjalanan berikutnya:

**Topic 02**  
Membaca component, dimension, shape, orientation, dan feature order dengan lebih formal.

↓

**Topic 03**  
Baru mulai vector addition, subtraction, dan scalar multiplication.

↓

**Topic 04**  
Magnitude/norm dan distance.

↓

**Topic 05**  
Dot product.

↓

**Topic 06**  
Cosine similarity.

↓

**Topic 07–08**  
Matrix dan matrix multiplication.

Tanpa Topic 01, semua operasi tersebut mudah berubah menjadi manipulasi angka tanpa semantics.

---

# 29. Summary

Hal utama Topic 01 bukan:

> “Vector adalah angka di dalam bracket.”

Hal utamanya adalah:

> **Vector memberi kita cara untuk menyusun beberapa numerical components menjadi satu ordered mathematical representation.**

Untuk HerAI:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

berarti, pada feature contract yang telah ditetapkan:

- component 1 = quiz ratio Alya;
- component 2 = completion ratio Alya.

Kita juga belajar:

- scalar = satu numerical quantity;
- vector = beberapa ordered numerical components;
- vector notation menggunakan bold lowercase;
- $\mathbf{x}^{(i)}$ adalah seluruh vector observation ke-$i$;
- $x_j^{(i)}$ adalah satu component;
- feature order harus konsisten;
- dimension preview = jumlah components;
- vector bukan participant secara utuh;
- vector bukan probability atau model AI;
- numeric coding kategori tidak otomatis meaningful;
- units/scales perlu diperhatikan jika feature berbeda jenis digabungkan.

---

# 30. Bridge ke Topic 02

Sekarang kita sudah dapat membangun participant vector.

Tetapi beberapa pertanyaan baru muncul.

Jika vector mempunyai dua, tiga, atau ratusan components:

- bagaimana kita menyebut jumlah components secara formal?
- apa yang dimaksud shape?
- apa beda row vector dan column vector?
- bagaimana memastikan component positions selalu konsisten?
- bagaimana membaca vector yang lebih panjang tanpa kehilangan feature semantics?

Itulah fokus:

> **Topic 02 — Membaca Vektor: Komponen, Dimensi, Shape, dan Feature Order.**

---

# 31. References

## [R1] Georgia Institute of Technology — *Interactive Linear Algebra*, Section 2.1: Vectors

**Concept supported:** vector coordinates, point/vector relationship, vertical column representation, geometric arrow interpretation.  
**URL:** https://textbooks.math.gatech.edu/ila/1553/vectors.html

## [R2] Google for Developers — Machine Learning Glossary: ML Fundamentals

**Concept supported:** feature as model input variable; feature vector as array of feature values comprising an example; feature-vector role in training/inference.  
**URL:** https://developers.google.com/machine-learning/glossary/fundamentals

## [R3] Google for Developers — Machine Learning Crash Course: Working with Numerical Data

**Concept supported:** distinction between numerical data and numbers that actually represent categories; numerical semantics matter.  
**URL:** https://developers.google.com/machine-learning/crash-course/numerical-data

## [R4] Google for Developers — Machine Learning Crash Course: Numerical Data — Normalization

**Concept supported:** features with substantially different ranges/scales require scaling consideration in many ML workflows.  
**URL:** https://developers.google.com/machine-learning/crash-course/numerical-data/normalization

## [R5] KaTeX — Supported Functions

**Concept supported:** source-level support for `bmatrix`, `\mathbf`, and basic notation used in this topic.  
**URL:** https://katex.org/docs/supported.html

---

# 32. QA Notes

## Academic QA

- Scalar dan vector dibedakan berdasarkan structure, bukan ukuran value.
- Vector dijelaskan sebagai ordered numerical components.
- Feature vector tidak disamakan dengan model.
- Feature order diperlakukan sebagai representation contract.
- Vector representation tidak disamakan dengan real-world participant.
- Dimension hanya diperkenalkan sebagai jumlah components pada preview level.
- Tidak mengajarkan magnitude/norm secara formal.
- Tidak mengajarkan distance.
- Tidak mengajarkan dot product.
- Tidak mengajarkan cosine similarity.
- Tidak mengajarkan matrix.
- Arbitrary categorical coding tidak diperlakukan sebagai meaningful numeric distance.
- Study duration hanya dipakai sebagai scale-warning preview.
- Score/probability semantics tetap aman.

## Mathematical QA

Canonical HerAI values:

- Alya: $q=0.80$, $c=0.75$;
- Bima: $q=0.60$, $c=0.625$;
- Citra: $q=0.90$, $c=1.00$;
- Dewi: $q=0.70$, $c=0.50$.

Feature order:

1. quiz ratio;
2. completion ratio.

Notation:

- scalar: non-bold;
- vector: bold lowercase;
- whole observation vector: $\mathbf{x}^{(i)}$;
- indexed scalar component: $x_j^{(i)}$.

## Dependency QA

Topic 01 menggunakan prerequisite Submodul 01:

- representation;
- feature;
- ratio;
- variable;
- ordered pair;
- indexed feature notation.

Topic 01 tidak mengambil scope Topic 02+.

## Markdown + KaTeX Source QA

- Inline mathematics menggunakan `$...$`.
- Display mathematics menggunakan `$$...$$`.
- Tidak ada intended mathematical formula di fenced code block.
- Tidak ada equation image.
- `bmatrix` dan `\mathbf` termasuk syntax yang didukung KaTeX [R5].
- Browser-level rendering tetap harus diuji saat integration ke frontend.

---

# STOP CHECKPOINT

**Topic 01 selesai pada batas scalar → vector representation. Topic 02 belum diproduksi.**

> **Apakah Topic 01 Submodule 02 disetujui dan kita boleh melanjutkan ke Topic 02?**
