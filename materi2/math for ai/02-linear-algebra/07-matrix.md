# Topic 07 — Matrix: Banyak Observation dalam Satu Struktur

> **Submodule 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks**  
> **Filename:** `07-matrix.md`  
> **Level:** Beginner → Early Intermediate  
> **Target learner:** peserta dewasa dengan background campuran, termasuk non-IT  
> **Estimasi belajar:** 70–90 menit membaca + 35–45 menit latihan/interaksi  
> **Prerequisite:** Topic 01–06 Submodule 02  
> **Forward dependency:** Topic 08 — Matrix Operations & Matrix Multiplication  
> **Boundary:** Topic ini memformalkan matrix, rows, columns, entries, shape, dataset orientation, row/column extraction, dan transpose sebagai orientation concept. Matrix multiplication belum diajarkan.

---

# 1. Mengapa Topik Ini Ada?

Sampai Topic 06, kita banyak bekerja dengan **satu vector pada satu waktu**.

Contohnya, participant vector Alya adalah:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Dengan schema:

1. component pertama = quiz ratio $q$;
2. component kedua = completion ratio $c$.

Kita juga mempunyai participant vectors lain:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60\\
0.625
\end{bmatrix}
$$

untuk Bima,

$$
\mathbf{x}^{(3)}
=
\begin{bmatrix}
0.90\\
1.00
\end{bmatrix}
$$

untuk Citra, dan:

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70\\
0.50
\end{bmatrix}
$$

untuk Dewi.

Sekarang muncul problem baru:

> Jika HerAI memiliki banyak participants dan setiap participant mempunyai feature vector dengan schema yang sama, bagaimana semua vectors itu disusun menjadi satu mathematical object yang rapi?

Kita membutuhkan object yang dapat menyimpan banyak rows dan columns sekaligus.

Object itu adalah **matrix**.

Dalam machine learning, data berbentuk rectangular biasanya direpresentasikan sebagai matrix dengan samples pada satu axis dan features pada axis lain. Scikit-learn, misalnya, menggunakan convention umum bahwa input $\mathbf{X}$ memiliki samples pada axis pertama dan features pada axis kedua. [R2]

Tetapi ada satu safety rule yang langsung harus diingat:

> **Matrix bukan sekadar tabel yang kebetulan berisi angka.**

Matrix adalah mathematical object dengan:

- entries;
- row structure;
- column structure;
- shape;
- orientation;
- semantics.

Nanti, matrix juga dapat berperan sebagai linear transformation. MIT Linear Algebra membahas matrix sebagai object yang dapat memetakan input vector menjadi output vector. [R5]

Namun itu **belum** kita hitung pada Topic 07.

Fokus kita sekarang adalah belajar **membaca matrix dengan benar sebelum mengoperasikannya**.

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 07, kamu diharapkan mampu:

1. menjelaskan mengapa banyak feature vectors dapat disusun menjadi matrix;
2. mendefinisikan matrix sebagai rectangular arrangement of scalar entries;
3. membedakan row, column, dan individual entry;
4. membaca shape matrix dengan urutan **rows × columns**;
5. menjelaskan arti $\mathbf{X}\in\mathbb{R}^{n\times d}$;
6. menghubungkan $n$ dengan jumlah observations dan $d$ dengan jumlah features pada convention HerAI;
7. membaca entry $X_{ij}$ sebagai entry pada row ke-$i$, column ke-$j$;
8. menghubungkan $X_{ij}$ dengan feature notation $x_j^{(i)}$;
9. membangun HerAI dataset matrix dari Alya, Bima, Citra, dan Dewi;
10. mengidentifikasi satu participant vector dari satu row matrix;
11. mengidentifikasi satu feature column dari matrix;
12. membedakan **vector dimension**, **matrix shape**, dan **total number of entries**;
13. menjelaskan mengapa feature order harus konsisten di seluruh rows;
14. menjelaskan mengapa same shape tidak otomatis berarti same semantics;
15. menjelaskan mengapa missing value tidak boleh otomatis diganti $0$ tanpa definisi;
16. membaca transpose sebagai perubahan row/column orientation;
17. menentukan shape hasil transpose tanpa melakukan matrix multiplication;
18. menjelaskan hubungan dataset table, feature vectors, dan matrix tanpa menyamakan ketiganya secara sembarangan;
19. menjelaskan penggunaan matrix representation pada machine learning secara beginner-safe;
20. mempersiapkan diri untuk Topic 08 tentang matrix operations dan matrix multiplication.

---

# 3. Prerequisite Recall — Apa yang Sudah Kita Punya?

Sebelum matrix, pastikan konsep berikut masih jelas.

## 3.1 Vector adalah ordered representation

Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Urutan components tidak random.

Schema:

$$
[q,c]
$$

berarti:

- component 1 = quiz ratio;
- component 2 = completion ratio.

## 3.2 Dimension vector

Karena participant vector mempunyai dua components:

$$
\mathbf{x}^{(i)}\in\mathbb{R}^{2}
$$

Dimension participant vector adalah $2$.

## 3.3 Feature indexing

Kita sudah mengenal:

$$
x_j^{(i)}
$$

Dengan:

- $i$ = observation / participant index;
- $j$ = feature index.

Untuk Alya sebagai observation pertama:

$$
x_1^{(1)}=0.80
$$

$$
x_2^{(1)}=0.75
$$

## 3.4 Semantics tetap wajib

Angka tidak otomatis meaningful hanya karena dapat ditulis dalam vector.

Rule ini akan menjadi lebih penting saat kita menyusun banyak rows menjadi matrix.

---

# 4. Pertanyaan Pemantik

Bayangkan HerAI memiliki data berikut:

| Participant | Quiz ratio | Completion ratio |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

Jawab secara intuitif dulu.

### Pertanyaan A

Jika satu participant adalah satu vector dengan dua features, bagaimana cara menyusun empat participant vectors tanpa kehilangan siapa row dan apa arti setiap column?

### Pertanyaan B

Apakah matrix dengan $4$ rows dan $2$ columns sama artinya dengan matrix dengan $2$ rows dan $4$ columns?

### Pertanyaan C

Jika dua matrices sama-sama memiliki shape $4\times2$, apakah keduanya otomatis dapat dianggap merepresentasikan hal yang sama?

### Pertanyaan D

Jika satu cell tidak diketahui, apakah kita boleh langsung menulis $0$?

Simpan jawaban sementaramu.

---

# 5. Predict Before Formalization

Jangan baca definisi formal dulu.

## Prediksi 1

Mana yang paling masuk akal untuk menyusun empat participant vectors?

A. Menggabungkan seluruh angka tanpa row/column structure.  
B. Menaruh setiap participant pada satu row dengan feature order yang konsisten.  
C. Mengurutkan angka dari kecil ke besar.  
D. Menghapus participant name dan feature meaning karena sudah numerik.

**Prediksi terbaik:** B.

## Prediksi 2

Jika matrix memiliki:

- 4 observations;
- 2 features per observation;

shape yang paling logis pada convention rows-as-observations adalah:

A. $2\times4$  
B. $4\times2$  
C. $6\times1$  
D. $8\times8$

**Prediksi terbaik:** B.

## Prediksi 3

Apakah matrix shape $4\times2$ berarti “dimension participant vector = 4”?

**Tidak.**

Kita akan formalize alasannya.

---

# 6. Intuisi — Matrix sebagai “Stack of Compatible Vectors”

Cara paling natural untuk masuk ke matrix dari Topic 01–06 adalah membayangkan kita **menumpuk participant vectors yang compatible**.

Participant vector Alya:

$$
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Bima:

$$
\begin{bmatrix}
0.60\\
0.625
\end{bmatrix}
$$

Citra:

$$
\begin{bmatrix}
0.90\\
1.00
\end{bmatrix}
$$

Dewi:

$$
\begin{bmatrix}
0.70\\
0.50
\end{bmatrix}
$$

Karena setiap participant memakai schema yang sama:

$$
[q,c]
$$

kita dapat menyusunnya menjadi satu structure:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
$$

Sekarang:

- setiap **row** = satu participant observation;
- setiap **column** = satu feature;
- setiap **cell/entry** = satu scalar value.

Ini adalah matrix.

---

# 7. Concrete Example — Dari Tabel ke Matrix

Perhatikan lagi table HerAI:

| Participant | $q$ | $c$ |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

Participant name membantu manusia mengidentifikasi row.

Tetapi feature matrix numerik yang akan kita gunakan adalah:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
$$

Penting:

> Menghapus participant name dari numerical matrix **tidak berarti participant identity tidak penting**.

Identifier dapat disimpan di structure lain yang tetap menjaga mapping row.

Kita tidak ingin menggunakan participant name sebagai arbitrary numerical feature hanya demi memasukkannya ke matrix.

Ini meneruskan representation safety dari Submodule 01.

---

# 8. Definisi Formal — Apa Itu Matrix?

Secara beginner-safe, sebuah **matrix** adalah rectangular arrangement of scalar entries yang disusun dalam rows dan columns.

Secara umum:

$$
\mathbf{A}
=
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & \ddots & \vdots\\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
$$

Matrix tersebut mempunyai:

- $m$ rows;
- $n$ columns;
- shape $m\times n$.

Stanford's *Introduction to Applied Linear Algebra* treats matrices as central mathematical objects alongside vectors, and later uses them for many applied tasks. [R1]

Pada HerAI, kita akan menggunakan symbol khusus:

$$
\mathbf{X}
$$

untuk feature matrix.

---

# 9. Notasi — Jangan Ada Symbol Tanpa Makna

## 9.1 Matrix

Gunakan **bold uppercase**:

$$
\mathbf{X},\ \mathbf{A},\ \mathbf{W}
$$

Pada Topic 07, matrix utama adalah:

$$
\mathbf{X}
$$

## 9.2 Observation count

Gunakan:

$$
n
$$

untuk jumlah observations.

## 9.3 Feature count

Gunakan:

$$
d
$$

untuk jumlah features per observation.

## 9.4 Dataset matrix shape

Convention HerAI:

$$
\mathbf{X}\in\mathbb{R}^{n\times d}
$$

Artinya:

- $n$ rows;
- $d$ columns;
- setiap entry berupa real number.

## 9.5 Entry matrix

Entry pada row ke-$i$ dan column ke-$j$ dapat ditulis:

$$
X_{ij}
$$

Dalam dataset convention kita:

$$
X_{ij}=x_j^{(i)}
$$

Ini adalah bridge penting antara Topic 02 dan Topic 07.

---

# 10. Formula Contract — Shape Dataset Matrix

Formula utama pertama:

$$
\mathbf{X}\in\mathbb{R}^{n\times d}
$$

### Symbol definitions

- $\mathbf{X}$ = feature matrix;
- $n$ = jumlah observations;
- $d$ = jumlah features per observation;
- $\mathbb{R}$ = real numbers;
- $n\times d$ = row count × column count.

### Cara membaca

> “Matrix X adalah real-valued matrix dengan n rows dan d columns.”

Pada convention HerAI:

> “Ada n observations, dan setiap observation mempunyai d numerical features.”

### Kapan digunakan?

Ketika banyak feature vectors dengan schema compatible disusun menjadi satu rectangular numerical structure.

### Constraint

Setiap row harus mengikuti **feature schema dan feature order yang sama**.

---

# 11. Formula Contract — Matrix Entry

Formula:

$$
X_{ij}=x_j^{(i)}
$$

### Symbol definitions

- $X_{ij}$ = entry matrix pada row $i$, column $j$;
- $i$ = observation index;
- $j$ = feature index;
- $x_j^{(i)}$ = feature ke-$j$ milik observation ke-$i$.

### Cara membaca

> “Entry X i-j adalah feature j dari observation i.”

### Mengapa penting?

Karena formula ini menghubungkan:

- individual participant feature;
- participant vector;
- dataset matrix.

---

# 12. Math Reading Skill — Membaca $\mathbf{X}\in\mathbb{R}^{4\times2}$

Jika ditulis:

$$
\mathbf{X}\in\mathbb{R}^{4\times2}
$$

jangan membacanya sebagai:

> “X punya dimension enam.”

atau:

> “X adalah empat kali dua.”

Bacaan yang lebih tepat:

> “X adalah real-valued matrix dengan 4 rows dan 2 columns.”

Dalam HerAI:

> “X merepresentasikan 4 observations dengan 2 features pada setiap observation.”

---

# 13. HerAI Dataset Matrix

Gunakan urutan participants:

1. Alya;
2. Bima;
3. Citra;
4. Dewi.

Gunakan urutan features:

1. quiz ratio $q$;
2. completion ratio $c$.

Maka:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
$$

Karena ada 4 participants dan 2 features:

$$
\mathbf{X}\in\mathbb{R}^{4\times2}
$$

---

# 14. Worked Example 1 — Tentukan Shape

Diberikan:

$$
\mathbf{A}
=
\begin{bmatrix}
2 & 5 & 7\\
1 & 0 & 4
\end{bmatrix}
$$

## Langkah 1 — Hitung rows

Ada dua horizontal rows:

- row 1: $2,5,7$;
- row 2: $1,0,4$.

Jadi:

$$
m=2
$$

## Langkah 2 — Hitung columns

Setiap row mempunyai tiga entries.

Jadi:

$$
n=3
$$

## Langkah 3 — Tulis shape

$$
\operatorname{shape}(\mathbf{A})=2\times3
$$

Dalam mathematical notation:

$$
\mathbf{A}\in\mathbb{R}^{2\times3}
$$

## Interpretasi

Matrix ini memiliki:

- 2 rows;
- 3 columns;
- total $2\times3=6$ entries.

Tetapi jangan menyimpulkan semantics apa pun sebelum row/column meaning didefinisikan.

---

# 15. Worked Example 2 — Membaca Entry Matrix

Gunakan HerAI matrix:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
$$

Apa arti:

$$
X_{32}
$$

## Langkah 1 — Baca index pertama

Index pertama adalah:

$$
3
$$

Berarti row ke-3.

Row ke-3 adalah Citra.

## Langkah 2 — Baca index kedua

Index kedua adalah:

$$
2
$$

Berarti column ke-2.

Column ke-2 adalah completion ratio.

## Langkah 3 — Cari value

Row 3, column 2:

$$
X_{32}=1.00
$$

## Langkah 4 — Hubungkan ke notation lama

$$
X_{32}=x_2^{(3)}
$$

## Interpretasi

Nilai tersebut adalah **completion ratio Citra**, bukan probability, bukan participant ID, dan bukan “entry ke-32”.

---

# 16. Checkpoint 1

Gunakan:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
$$

Jawab:

1. Berapa jumlah rows?
2. Berapa jumlah columns?
3. Apa shape $\mathbf{X}$?
4. Apa arti row ke-2?
5. Apa arti column ke-1?
6. Berapa $X_{41}$?

### Jawaban

1. 4 rows.
2. 2 columns.
3. $4\times2$.
4. Bima observation.
5. Quiz ratio.
6. $0.70$.

---

# 17. Rows — Satu Observation per Row

Pada convention HerAI:

> **Satu row = satu observation / participant feature vector.**

Row pertama:

$$
\begin{bmatrix}
0.80 & 0.75
\end{bmatrix}
$$

merepresentasikan Alya.

Row kedua:

$$
\begin{bmatrix}
0.60 & 0.625
\end{bmatrix}
$$

merepresentasikan Bima.

Scikit-learn menggunakan convention yang sama untuk rectangular machine-learning input: jumlah rows pada $\mathbf{X}$ adalah jumlah samples. [R2]

---

# 18. Column Vector vs Row dalam Dataset Matrix

Di Topic 01–06, participant vector kita sering ditulis sebagai **column vector**:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Tetapi pada dataset matrix, observation ditaruh sebagai row:

$$
\begin{bmatrix}
0.80 & 0.75
\end{bmatrix}
$$

Apakah ini contradiction?

Tidak.

Ini adalah **orientation convention**.

Untuk menghubungkan keduanya:

$$
(\mathbf{x}^{(1)})^{\top}
=
\begin{bmatrix}
0.80 & 0.75
\end{bmatrix}
$$

Jadi dataset matrix dapat ditulis sebagai stack of transposed participant vectors:

$$
\mathbf{X}
=
\begin{bmatrix}
(\mathbf{x}^{(1)})^{\top}\\
(\mathbf{x}^{(2)})^{\top}\\
(\mathbf{x}^{(3)})^{\top}\\
(\mathbf{x}^{(4)})^{\top}
\end{bmatrix}
$$

Kita akan membahas transpose lebih lanjut sebentar lagi.

---

# 19. Columns — Satu Feature per Column

Column pertama adalah quiz ratio:

$$
\begin{bmatrix}
0.80\\
0.60\\
0.90\\
0.70
\end{bmatrix}
$$

Column kedua adalah completion ratio:

$$
\begin{bmatrix}
0.75\\
0.625\\
1.00\\
0.50
\end{bmatrix}
$$

Ini penting karena column bukan hanya “garis vertikal angka”.

Setiap column harus mempunyai **feature semantics** yang konsisten untuk semua rows.

---

# 20. Feature Schema Contract

HerAI schema:

| Column index | Feature | Semantics | Scale |
|---:|---|---|---|
| 1 | $q$ | quiz correct / quiz total | ratio $0$–$1$ |
| 2 | $c$ | completion done / completion total | ratio $0$–$1$ |

Maka setiap row wajib mengikuti:

$$
[q,c]
$$

Bukan sebagian rows:

$$
[q,c]
$$

lalu row lain:

$$
[c,q]
$$

karena nilai matrix mungkin tetap numerik, tetapi semantics menjadi corrupted.

---

# 21. Misconception Challenge 1 — “Matrix Cuma Spreadsheet”

> **Common misconception:** “Matrix itu cuma spreadsheet tanpa header.”

Koreksi:

Spreadsheet adalah salah satu data interface yang dapat menampilkan rows dan columns.

Matrix adalah mathematical object.

Matrix dapat:

- mempunyai shape formal;
- memiliki algebraic operations;
- dipakai sebagai representation;
- nanti merepresentasikan transformation.

Jadi analogi table boleh dipakai sebagai entry point, tetapi jangan berhenti di sana. MIT menekankan peran matrix pada linear transformations, yang akan menjadi bridge pada Topic 08. [R5]

---

# 22. Misconception Challenge 2 — “Same Shape = Same Meaning”

Misalkan:

$$
\mathbf{A}
=
\begin{bmatrix}
0.8 & 0.7\\
0.6 & 0.5
\end{bmatrix}
$$

dan:

$$
\mathbf{B}
=
\begin{bmatrix}
170 & 65\\
160 & 55
\end{bmatrix}
$$

Keduanya mempunyai shape:

$$
2\times2
$$

Tetapi $\mathbf{A}$ mungkin berarti:

- quiz ratio;
- completion ratio.

Sedangkan $\mathbf{B}$ mungkin berarti:

- height in cm;
- weight in kg.

Same shape **tidak** membuat semantics sama.

---

# 23. Matrix Shape vs Vector Dimension

Ini source confusion yang sangat umum.

## Participant vector

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Dimension:

$$
2
$$

karena ada 2 components.

## Dataset matrix

$$
\mathbf{X}\in\mathbb{R}^{4\times2}
$$

Shape:

$$
4\times2
$$

karena ada 4 rows dan 2 columns.

### Jangan campur

- **vector dimension** = number of components;
- **matrix shape** = rows × columns.

Pada HerAI:

- participant vector dimension = $2$;
- dataset matrix shape = $4\times2$.

---

# 24. Matrix Shape vs Total Number of Entries

Untuk:

$$
\mathbf{X}\in\mathbb{R}^{4\times2}
$$

total entries adalah:

$$
4\times2=8
$$

Jadi ada tiga quantities berbeda:

1. row count = $4$;
2. column count = $2$;
3. total entry count = $8$.

Tidak ada satupun yang boleh ditukar sembarangan.

---

# 25. Change One Thing — Tambah Satu Participant

Awalnya:

$$
\mathbf{X}\in\mathbb{R}^{4\times2}
$$

Sekarang tambahkan participant baru, misalnya Eka, dengan schema yang sama.

Jumlah observations naik dari:

$$
4\to5
$$

Jumlah features tetap:

$$
2
$$

Maka shape menjadi:

$$
5\times2
$$

Perubahan terjadi pada **row count**.

---

# 26. Change One Thing — Tambah Satu Feature

Awalnya:

$$
\mathbf{X}\in\mathbb{R}^{4\times2}
$$

Sekarang kita ingin menambahkan satu feature numerik baru.

Misalnya normalized study-duration feature yang **sudah didefinisikan dengan jelas**.

Jika feature baru ditambahkan untuk setiap observation, jumlah columns berubah:

$$
2\to3
$$

Maka:

$$
\mathbf{X}_{\text{new}}\in\mathbb{R}^{4\times3}
$$

Tetapi kita tidak boleh menambahkan column baru hanya karena “angka tambahan terlihat berguna”.

Semantics, scale, availability, dan data quality tetap perlu diperiksa.

---

# 27. Why Feature Order Across Rows Is Non-Negotiable

Correct matrix:

$$
\mathbf{X}
=
\begin{bmatrix}
q_{\text{Alya}} & c_{\text{Alya}}\\
q_{\text{Bima}} & c_{\text{Bima}}\\
q_{\text{Citra}} & c_{\text{Citra}}\\
q_{\text{Dewi}} & c_{\text{Dewi}}
\end{bmatrix}
$$

Wrong silent representation:

$$
\mathbf{X}_{\text{broken}}
=
\begin{bmatrix}
q_{\text{Alya}} & c_{\text{Alya}}\\
c_{\text{Bima}} & q_{\text{Bima}}\\
q_{\text{Citra}} & c_{\text{Citra}}\\
q_{\text{Dewi}} & c_{\text{Dewi}}
\end{bmatrix}
$$

Matrix kedua masih terlihat rectangular.

Shape masih:

$$
4\times2
$$

Semua entries masih numbers.

Tetapi row Bima telah merusak schema.

Ini contoh **semantic bug yang tidak terlihat dari shape saja**.

---

# 28. Worked Example 3 — Audit Broken Feature Order

Diberikan:

$$
\mathbf{Z}
=
\begin{bmatrix}
0.80 & 0.75\\
0.625 & 0.60\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
$$

Tim berkata:

> “Shape masih $4\times2$, jadi dataset valid.”

## Langkah 1 — Periksa shape

Benar:

$$
\mathbf{Z}\in\mathbb{R}^{4\times2}
$$

## Langkah 2 — Periksa schema

Schema seharusnya:

$$
[q,c]
$$

## Langkah 3 — Periksa row 2

Row 2 adalah:

$$
[0.625,0.60]
$$

Padahal Bima seharusnya:

$$
[0.60,0.625]
$$

## Kesimpulan

Mathematical rectangular shape valid.

Semantic dataset contract **tidak valid**.

---

# 29. Missing Value ≠ Zero

Misalkan completion ratio Bima belum tersedia.

Matrix sementara mungkin secara konseptual mempunyai missing entry.

Kita **tidak otomatis** mengganti missing tersebut dengan:

$$
0
$$

karena:

$$
c=0
$$

mempunyai semantics:

> “completion ratio terukur sebesar nol.”

Sedangkan missing berarti:

> “value belum tersedia / tidak terobservasi sesuai definisi data.”

Itu dua keadaan berbeda.

Google ML menekankan pentingnya feature meaning yang jelas dan menghindari “magic values” yang diam-diam mewakili missingness. [R4]

---

# 30. Misconception Challenge 3 — “Missing = 0 Biar Matrix Lengkap”

> **Common misconception:** “Matrix harus penuh angka, jadi missing value paling aman diganti zero.”

Koreksi:

Tidak ada rule linear algebra yang mengatakan missing data berarti zero.

Missing-data handling adalah **data-design / preprocessing choice** yang harus mengikuti semantics dan metode yang digunakan.

Di Topic 07 kita hanya menjaga distinction-nya.

---

# 31. Row Extraction — Membaca Satu Observation

Dari:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
$$

row ke-3 adalah:

$$
\begin{bmatrix}
0.90 & 1.00
\end{bmatrix}
$$

Itu adalah Citra dalam row orientation.

Participant vector column form:

$$
\mathbf{x}^{(3)}
=
\begin{bmatrix}
0.90\\
1.00
\end{bmatrix}
$$

Keduanya mengandung same ordered values, tetapi orientation berbeda.

---

# 32. Column Extraction — Membaca Satu Feature Across Observations

Column pertama:

$$
\begin{bmatrix}
0.80\\
0.60\\
0.90\\
0.70
\end{bmatrix}
$$

adalah seluruh quiz-ratio observations.

Column kedua:

$$
\begin{bmatrix}
0.75\\
0.625\\
1.00\\
0.50
\end{bmatrix}
$$

adalah seluruh completion-ratio observations.

Ini adalah bridge penting menuju Submodule 03 Statistics, karena statistics sering menganalisis **satu variable/feature across many observations**.

---

# 33. Bridge ke Statistics — Tetapi Belum Menghitung Statistics

Topic 07 membuat kita bisa melihat:

$$
\text{one participant row}
$$

versus:

$$
\text{one feature column across participants}
$$

Di Submodule 03 nanti, kita akan bertanya:

- berapa mean column ini?;
- seberapa tersebar values-nya?;
- bagaimana distribution-nya?;
- bagaimana relationship antarcolumns?

Tetapi Topic 07 belum mengajarkan mean, variance, correlation, atau distribution.

---

# 34. Transpose — Mengubah Orientation

Transpose menukar rows dan columns.

Untuk matrix:

$$
\mathbf{A}
=
\begin{bmatrix}
1 & 2 & 3\\
4 & 5 & 6
\end{bmatrix}
$$

transpose-nya:

$$
\mathbf{A}^{\top}
=
\begin{bmatrix}
1 & 4\\
2 & 5\\
3 & 6
\end{bmatrix}
$$

Shape awal:

$$
2\times3
$$

Shape setelah transpose:

$$
3\times2
$$

---

# 35. Formula Contract — Transpose Shape

Jika:

$$
\mathbf{A}\in\mathbb{R}^{m\times n}
$$

maka:

$$
\mathbf{A}^{\top}\in\mathbb{R}^{n\times m}
$$

### Symbol definitions

- $\mathbf{A}$ = original matrix;
- $\mathbf{A}^{\top}$ = transpose of $\mathbf{A}$;
- $m$ = original row count;
- $n$ = original column count.

### Conceptual meaning

Rows menjadi columns dan columns menjadi rows.

### Safety note

Transpose **tidak memperbaiki semantic mismatch**.

Ia hanya mengubah orientation.

---

# 36. HerAI Matrix Transpose

HerAI matrix:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
$$

Shape:

$$
4\times2
$$

Transpose:

$$
\mathbf{X}^{\top}
=
\begin{bmatrix}
0.80 & 0.60 & 0.90 & 0.70\\
0.75 & 0.625 & 1.00 & 0.50
\end{bmatrix}
$$

Shape:

$$
2\times4
$$

Sekarang:

- row 1 = quiz ratio across participants;
- row 2 = completion ratio across participants;
- columns = participants.

Values tidak berubah.

Orientation dan indexing interpretation berubah.

---

# 37. Worked Example 4 — Transpose Step by Step

Diberikan:

$$
\mathbf{B}
=
\begin{bmatrix}
2 & 7\\
4 & 1\\
5 & 3
\end{bmatrix}
$$

## Langkah 1 — Baca shape awal

Ada 3 rows dan 2 columns.

$$
\mathbf{B}\in\mathbb{R}^{3\times2}
$$

## Langkah 2 — Jadikan column pertama sebagai row pertama

Column pertama:

$$
\begin{bmatrix}
2\\
4\\
5
\end{bmatrix}
$$

menjadi:

$$
\begin{bmatrix}
2 & 4 & 5
\end{bmatrix}
$$

## Langkah 3 — Jadikan column kedua sebagai row kedua

Column kedua:

$$
\begin{bmatrix}
7\\
1\\
3
\end{bmatrix}
$$

menjadi:

$$
\begin{bmatrix}
7 & 1 & 3
\end{bmatrix}
$$

## Langkah 4 — Tulis transpose

$$
\mathbf{B}^{\top}
=
\begin{bmatrix}
2 & 4 & 5\\
7 & 1 & 3
\end{bmatrix}
$$

## Langkah 5 — Shape baru

$$
\mathbf{B}^{\top}\in\mathbb{R}^{2\times3}
$$

---

# 38. Misconception Challenge 4 — “Transpose Mengubah Data”

> **Common misconception:** “Transpose membuat dataset baru dengan values baru.”

Koreksi:

Transpose menukar position/orientation entries.

Numerical values tetap sama.

Tetapi interpretation row/column harus diperbarui.

---

# 39. Orientation Is a Contract

Pada HerAI kita memilih:

- rows = observations;
- columns = features.

Scikit-learn menggunakan convention ini untuk rectangular input $\mathbf{X}$ dengan shape `(n_samples, n_features)`. [R2]

Namun mathematical literature atau software tertentu dapat menggunakan orientation berbeda dalam beberapa context.

Karena itu prinsip yang lebih aman adalah:

> **Jangan menebak orientation. Definisikan dan baca shape + semantics.**

---

# 40. Software Note — Matrix vs 2D Array

Dalam NumPy, shape sebuah two-dimensional array ditulis sebagai tuple seperti:

`(rows, columns)`.

Contoh array dengan 2 rows dan 3 columns mempunyai shape `(2, 3)`. NumPy mendefinisikan `shape` sebagai ukuran sepanjang masing-masing array dimension/axis. [R3]

Tetapi:

> mathematical matrix dan software array bukan kata yang selalu identik dalam semua detail.

Topic 07 fokus pada mathematical meaning.

Implementation mapping baru secondary.

---

# 41. AI/ML Connection 1 — Design Matrix / Feature Matrix

Banyak machine-learning workflows menerima feature input dalam bentuk:

$$
\mathbf{X}\in\mathbb{R}^{n\times d}
$$

Dengan:

- $n$ samples;
- $d$ features.

Scikit-learn secara eksplisit menggunakan $\mathbf{X}$ dengan rows sebagai samples pada rectangular data. [R2]

Ini membuat model dapat memproses banyak observations dengan feature schema yang konsisten.

---

# 42. AI/ML Connection 2 — Feature Vector Is One Row Conceptually

Google ML menjelaskan bahwa model mengonsumsi feature vectors yang berasal dari dataset features. Satu example dapat direpresentasikan sebagai feature vector, bukan sekadar raw dataset row tanpa preprocessing. [R4]

Topic 07 menghubungkan itu menjadi:

> banyak feature vectors → feature matrix.

Dengan kata lain:

$$
\text{one example}
\rightarrow
\mathbf{x}^{(i)}
$$

$$
\text{many examples}
\rightarrow
\mathbf{X}
$$

---

# 43. AI/ML Connection 3 — Batch Representation

Dalam banyak AI systems, beberapa examples diproses bersama sebagai batch.

Secara konsep, batch of fixed-length feature vectors dapat disusun menjadi matrix-like structure:

$$
\text{batch size}\times\text{feature dimension}
$$

Topic 07 belum membahas tensor atau deep-learning batch axes secara formal.

Kita hanya membangun intuisi bahwa **stacking compatible vectors** adalah pattern yang sangat umum.

---

# 44. AI/ML Connection 4 — Matrix Bukan Hanya Dataset Container

Satu matrix dapat mempunyai role berbeda tergantung context.

Contoh role yang akan muncul nanti:

- feature matrix;
- weight matrix;
- transformation matrix;
- embedding matrix.

Karena itu:

> jangan menganggap semua matrix berarti dataset.

MIT menunjukkan matrix dapat merepresentasikan linear transformation, yang akan menjadi bridge penting ke Topic 08. [R5]

---

# 45. HerAI Material Support Matrix

Topic 06 menggunakan toy material-support profiles pada shared axes.

Misalnya:

- feature 1 = support toward quiz-skill need;
- feature 2 = support toward completion/progression need.

Candidate materials:

$$
\mathbf{m}^{(1)}
=
\begin{bmatrix}
0.90\\
0.30
\end{bmatrix}
$$

$$
\mathbf{m}^{(2)}
=
\begin{bmatrix}
0.50\\
0.80
\end{bmatrix}
$$

$$
\mathbf{m}^{(3)}
=
\begin{bmatrix}
0.30\\
0.90
\end{bmatrix}
$$

Kita dapat menyusun material matrix:

$$
\mathbf{M}
=
\begin{bmatrix}
0.90 & 0.30\\
0.50 & 0.80\\
0.30 & 0.90
\end{bmatrix}
$$

Maka:

$$
\mathbf{M}\in\mathbb{R}^{3\times2}
$$

Interpretasi:

- 3 material observations;
- 2 support-profile features.

---

# 46. Important Boundary — Participant Matrix dan Material Matrix Bukan Otomatis Sama Role

HerAI participant matrix:

$$
\mathbf{X}\in\mathbb{R}^{4\times2}
$$

Material matrix:

$$
\mathbf{M}\in\mathbb{R}^{3\times2}
$$

Keduanya mempunyai 2 columns.

Tetapi semantics columns harus diperiksa.

Jika participant columns adalah:

$$
[q,c]
$$

sedangkan material columns adalah:

$$
[\text{quiz-support},\text{completion-support}]
$$

maka mereka berada pada related but not identical semantics.

Kita tidak boleh melakukan operasi hanya karena shape terlihat compatible tanpa terlebih dahulu mendefinisikan mathematical meaning.

---

# 47. Checkpoint 2 — Shape Reasoning

Tentukan shape.

## A

4 participants, masing-masing 2 features:

$$
4\times2
$$

## B

20 participants, masing-masing 5 features:

$$
20\times5
$$

## C

3 materials, masing-masing 2 support features:

$$
3\times2
$$

## D

Transpose dari matrix $20\times5$:

$$
5\times20
$$

---

# 48. Misconception Challenge 5 — “Lebih Banyak Rows = Higher Vector Dimension”

Jika:

$$
\mathbf{X}\in\mathbb{R}^{1000\times2}
$$

participant vector dimension tetap:

$$
2
$$

Jumlah observations menjadi:

$$
1000
$$

Menambah participants tidak menambah feature dimension.

---

# 49. Misconception Challenge 6 — “Lebih Banyak Columns Selalu Lebih Baik”

Jika matrix berubah dari:

$$
4\times2
$$

menjadi:

$$
4\times20
$$

itu hanya menunjukkan kita sekarang mempunyai 20 columns/features.

Tidak membuktikan:

- data lebih relevan;
- model pasti lebih akurat;
- representation lebih fair;
- recommendation lebih baik.

Feature quality dan semantics tetap harus dievaluasi.

---

# 50. Misconception Challenge 7 — “Matrix Entry Tidak Perlu Unit”

Matrix numerik dapat berisi quantities dengan units berbeda.

Contoh:

$$
[q,c,t]
$$

Jika:

- $q$ ratio;
- $c$ ratio;
- $t$ minutes;

maka column semantics dan units berbeda.

Matrix representation sendiri tidak menghapus unit problem yang kita lihat pada distance Topic 04.

---

# 51. Misconception Challenge 8 — “Row Number = Participant Identity”

Row 1 saat ini adalah Alya.

Tetapi row index:

$$
1
$$

bukan identitas intrinsik Alya.

Jika dataset di-reorder, Alya bisa pindah ke row lain.

Karena itu external identifier mapping tetap penting.

---

# 52. Try It Yourself 1 — Build a Matrix

Diberikan:

$$
\mathbf{u}^{(1)}
=
\begin{bmatrix}
0.2\\
0.4
\end{bmatrix}
$$

$$
\mathbf{u}^{(2)}
=
\begin{bmatrix}
0.7\\
0.1
\end{bmatrix}
$$

$$
\mathbf{u}^{(3)}
=
\begin{bmatrix}
0.5\\
0.9
\end{bmatrix}
$$

Susun menjadi matrix dengan observations sebagai rows.

### Jawaban

$$
\mathbf{U}
=
\begin{bmatrix}
0.2 & 0.4\\
0.7 & 0.1\\
0.5 & 0.9
\end{bmatrix}
$$

$$
\mathbf{U}\in\mathbb{R}^{3\times2}
$$

---

# 53. Try It Yourself 2 — Entry Reading

Gunakan HerAI matrix.

Apa arti:

$$
X_{21}
$$

### Jawaban

Row 2 = Bima.

Column 1 = quiz ratio.

$$
X_{21}=0.60
$$

---

# 54. Try It Yourself 3 — Column Meaning

Apa arti column kedua dari $\mathbf{X}$?

### Jawaban

Completion ratio untuk semua participants sesuai row order.

---

# 55. Try It Yourself 4 — Shape After Change

Awalnya:

$$
\mathbf{X}\in\mathbb{R}^{4\times2}
$$

Tambahkan:

- 2 participants;
- 1 valid feature baru.

Shape baru?

### Jawaban

Jumlah observations:

$$
4+2=6
$$

Jumlah features:

$$
2+1=3
$$

Jadi:

$$
6\times3
$$

---

# 56. Try It Yourself 5 — Transpose

Jika:

$$
\mathbf{A}\in\mathbb{R}^{7\times3}
$$

apa shape:

$$
\mathbf{A}^{\top}
$$

### Jawaban

$$
\mathbf{A}^{\top}\in\mathbb{R}^{3\times7}
$$

---

# 57. Try It Yourself 6 — Semantic Audit

Dua matrices:

$$
\mathbf{A}\in\mathbb{R}^{4\times2}
$$

$$
\mathbf{B}\in\mathbb{R}^{4\times2}
$$

Bolehkah kita langsung menyatakan kedua matrices compatible untuk semua operations hanya dari shape?

### Jawaban

Tidak.

Kita masih perlu mengetahui:

- row semantics;
- column semantics;
- feature order;
- units/scales;
- operation yang ingin dilakukan.

---

# 58. Worked Reasoning Audit — Empat Klaim

Audit statements berikut.

## Klaim 1

> “$\mathbf{X}$ shape $4\times2$, jadi setiap participant punya 4 features.”

**Salah.**

Setiap participant mempunyai 2 features. Angka 4 adalah number of observations.

## Klaim 2

> “$X_{32}=1.00$ berarti Citra completion ratio = 1.00.”

**Benar**, dengan row/column schema yang telah didefinisikan.

## Klaim 3

> “Dua matrices dengan shape sama pasti mempunyai semantics sama.”

**Salah.**

Shape hanya structure, bukan meaning.

## Klaim 4

> “Transpose $\mathbf{X}^{\top}$ menukar observation dan feature orientation.”

**Benar**, tetapi values-nya tidak diganti dengan numbers baru.

---

# 59. Visual / Interactive Specification 1 — Stack Vectors into Matrix

**Label:** `[STEP-BY-STEP REVEAL]`

## Learning purpose

Menunjukkan bahwa matrix dataset dapat dibangun dari compatible participant vectors.

## Initial state/data

Empat cards:

- Alya vector;
- Bima vector;
- Citra vector;
- Dewi vector.

## Learner action

Klik “Stack observations”.

## Expected behavior

Setiap column vector berotasi menjadi row representation lalu masuk ke matrix $4\times2$.

## Feedback

Highlight mapping:

- observation → row;
- feature → column.

## Safety note

Visual harus menjelaskan orientation convention, bukan menyiratkan column vector “berubah meaning”.

---

# 60. Visual / Interactive Specification 2 — Row/Column Highlighter

**Label:** `[INTERACTIVE VISUAL]`

## Learning purpose

Melatih row vs column semantics.

## Initial state/data

HerAI matrix $4\times2$.

## Learner action

Hover/click row atau column.

## Expected behavior

Jika row dipilih:

- tampil participant name;
- tampil feature-vector semantics.

Jika column dipilih:

- tampil feature name;
- tampil values across participants.

## Feedback

UI menyebut:

> “Row = observation”

atau:

> “Column = feature”

---

# 61. Visual / Interactive Specification 3 — Shape Builder

**Label:** `[NUMBER MANIPULATOR]`

## Learning purpose

Membedakan number of observations dari number of features.

## Initial state/data

Controls:

- observations = 4;
- features = 2.

## Learner action

Ubah sliders.

## Expected behavior

Grid berubah ukuran dan notation update:

$$
\mathbf{X}\in\mathbb{R}^{n\times d}
$$

## Feedback

Tampilkan terpisah:

- row count;
- column count;
- total entries.

---

# 62. Visual / Interactive Specification 4 — Entry Locator

**Label:** `[INTERACTIVE VISUAL]`

## Learning purpose

Memahami $X_{ij}$.

## Initial state/data

HerAI matrix dengan row dan column labels.

## Learner action

Input $i$ dan $j$.

## Expected behavior

Corresponding cell disorot.

Contoh:

$$
(i,j)=(3,2)
$$

menyorot Citra completion ratio.

## Feedback

Tampilkan:

$$
X_{32}=x_2^{(3)}=1.00
$$

---

# 63. Visual / Interactive Specification 5 — Feature Order Trap

**Label:** `[COMPARE VIEW]`

## Learning purpose

Menunjukkan bahwa same shape dapat menyembunyikan semantic bug.

## Initial state/data

Left matrix = correct HerAI schema.

Right matrix = Bima row swapped.

## Learner action

Toggle “show headers”.

## Expected behavior

Tanpa headers kedua matrices tampak sama-sama valid rectangular structure.

Dengan headers, Bima mismatch terlihat.

## Feedback

> “Shape check alone cannot verify semantics.”

---

# 64. Visual / Interactive Specification 6 — Transpose Animation

**Label:** `[STEP-BY-STEP REVEAL]`

## Learning purpose

Memahami transpose sebagai row-column orientation switch.

## Initial state/data

Small matrix $2\times3$.

## Learner action

Klik “Transpose”.

## Expected behavior

Cells animate across diagonal-like mapping into $3\times2$ structure.

## Feedback

Display:

$$
(m\times n)\rightarrow(n\times m)
$$

## Safety note

Jelaskan values tidak berubah, hanya position/orientation.

---

# 65. Visual / Interactive Specification 7 — Dataset Matrix vs Material Matrix

**Label:** `[COMPARE VIEW]`

## Learning purpose

Mencegah assumption bahwa semua matrices berarti hal sama.

## Initial state/data

- Participant matrix $\mathbf{X}\in\mathbb{R}^{4\times2}$;
- material matrix $\mathbf{M}\in\mathbb{R}^{3\times2}$.

## Learner action

Klik column labels masing-masing matrix.

## Expected behavior

UI menampilkan semantic definitions.

## Feedback

> “Same number of columns does not guarantee identical meaning.”

---

# 66. Checkpoint 3 — Can You Read the Matrix?

Diberikan:

$$
\mathbf{A}
=
\begin{bmatrix}
2 & 4 & 6\\
1 & 3 & 5\\
7 & 8 & 9\\
0 & 2 & 1
\end{bmatrix}
$$

Jawab:

1. shape?
2. number of rows?
3. number of columns?
4. total entries?
5. $A_{23}$?
6. shape $\mathbf{A}^{\top}$?

### Jawaban

1. $4\times3$.
2. 4.
3. 3.
4. 12.
5. $5$.
6. $3\times4$.

---

# 67. Practical Data Safety — Matrix Validity Has More Than One Layer

Ketika melihat feature matrix, lakukan minimal empat audits.

## Layer 1 — Structural validity

Apakah rows mempunyai jumlah columns yang konsisten?

## Layer 2 — Shape validity

Apakah shape sesuai expected number of samples/features?

## Layer 3 — Semantic validity

Apakah column meanings konsisten?

## Layer 4 — Data validity

Apakah values sesuai unit, range, missingness rule, dan collection definition?

Matrix rectangular saja belum cukup.

---

# 68. Matrix Is Representation, Not Reality

Kembali ke principle Submodule 01.

HerAI matrix:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
$$

bukan:

> “empat participants itu sendiri.”

Matrix hanya menyimpan representation berdasarkan chosen features.

Banyak informasi tidak ada di matrix ini:

- participant motivation;
- context belajar;
- materi sebelumnya;
- accessibility needs;
- temporal changes;
- dan banyak faktor lain.

Jadi:

> **Matrix memberi structure pada representation; matrix tidak membuat representation menjadi lengkap.**

---

# 69. Why This Matters in AI

Matrix literacy sangat penting karena banyak AI/ML formulas nantinya akan ditulis dengan matrix notation.

Contohnya, kita akan melihat object seperti:

$$
\mathbf{X}
$$

untuk data,

$$
\mathbf{W}
$$

untuk weights,

serta operasi yang memetakan banyak values menjadi output baru.

Tetapi jika kita belum bisa membaca:

- rows;
- columns;
- shape;
- feature order;
- entry position;

maka matrix multiplication nanti hanya akan terasa seperti rule angka tanpa meaning.

---

# 70. Why This Matters Later — Topic 08

Topic berikutnya akan menjawab:

> Jika matrix sudah terbentuk, bagaimana kita mengoperasikannya secara matematis?

Kita akan masuk ke:

- matrix addition pada compatible shapes;
- scalar multiplication;
- matrix-vector multiplication;
- matrix multiplication;
- shape compatibility;
- weighted combinations;
- transformation intuition;
- AI connection.

Topic 07 sengaja berhenti **sebelum operasi itu** supaya shape dan semantics tidak tercampur dengan computation baru.

---

# 71. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan matrix sebagai rectangular arrangement of scalar entries.
- [ ] **I can** membedakan row, column, dan entry.
- [ ] **I can** membaca matrix shape sebagai rows × columns.
- [ ] **I can** membaca $\mathbf{X}\in\mathbb{R}^{n\times d}$.
- [ ] **I can** menjelaskan $n$ sebagai number of observations pada HerAI convention.
- [ ] **I can** menjelaskan $d$ sebagai number of features.
- [ ] **I can** membaca $X_{ij}$ sebagai row $i$, column $j$.
- [ ] **I can** menghubungkan $X_{ij}$ dengan $x_j^{(i)}$.
- [ ] **I can** membangun matrix dari multiple compatible vectors.
- [ ] **I can** mengambil satu row sebagai one observation representation.
- [ ] **I can** mengambil satu column sebagai one feature across observations.
- [ ] **I can** membedakan vector dimension dari matrix shape.
- [ ] **I can** membedakan matrix shape dari total number of entries.
- [ ] **I can** menjelaskan mengapa feature order harus konsisten.
- [ ] **I can** menjelaskan mengapa same shape tidak menjamin same semantics.
- [ ] **I can** menjelaskan mengapa missing value tidak otomatis sama dengan zero.
- [ ] **I can** membaca transpose sebagai row-column orientation switch.
- [ ] **I can** menentukan transpose shape.
- [ ] **I can** menjelaskan hubungan feature vectors dan feature matrix.
- [ ] **I can** menjelaskan mengapa matrix tidak hanya berarti spreadsheet.
- [ ] **I can** menjelaskan mengapa matrix representation bukan participant reality.

Jika lebih dari empat belum yakin, ulangi:

- HerAI Dataset Matrix;
- Matrix Entry;
- Rows dan Columns;
- Shape vs Dimension;
- Feature Order;
- Transpose.

---

# 72. Summary

Topic 07 membawa kita dari:

> satu vector per observation

menjadi:

> banyak observations dalam satu matrix.

Konsep utama:

1. matrix adalah rectangular arrangement of scalar entries;
2. HerAI menggunakan rows = observations dan columns = features;
3. feature matrix dinotasikan:

$$
\mathbf{X}\in\mathbb{R}^{n\times d}
$$

4. entry matrix:

$$
X_{ij}=x_j^{(i)}
$$

5. HerAI participant matrix:

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

6. row = one observation representation;
7. column = one feature across observations;
8. vector dimension ≠ matrix shape;
9. same shape ≠ same semantics;
10. feature order wajib konsisten;
11. missing ≠ automatically zero;
12. transpose menukar row/column orientation:

$$
\mathbf{A}\in\mathbb{R}^{m\times n}
\Rightarrow
\mathbf{A}^{\top}\in\mathbb{R}^{n\times m}
$$

13. matrix adalah mathematical object, bukan hanya spreadsheet-like table;
14. matrix dapat menjadi feature matrix sekarang dan transformation/weight matrix pada context lain nanti.

---

# 73. Bridge ke Topic 08 — Matrix Operations & Matrix Multiplication

Sekarang kita sudah bisa membaca:

$$
\mathbf{X}\in\mathbb{R}^{4\times2}
$$

Kita tahu:

- apa arti $4$;
- apa arti $2$;
- apa arti setiap row;
- apa arti setiap column;
- apa arti $X_{ij}$;
- apa yang dilakukan transpose.

Pertanyaan berikutnya:

> Jika matrix adalah mathematical object, bagaimana matrix berinteraksi dengan vector atau matrix lain?

Di situlah kita akan masuk ke:

# **Topic 08 — Matrix Operations & Matrix Multiplication: Shape, Transformasi, dan AI Connection**

Kita akan belajar mengapa:

> **shape compatibility bukan detail format—shape compatibility menentukan apakah operasi tertentu secara matematis terdefinisi.**

---

# 74. References

## [R1] Boyd, S. & Vandenberghe, L. — *Introduction to Applied Linear Algebra: Vectors, Matrices, and Least Squares*

Mendukung:

- applied vector and matrix foundations;
- matrix notation;
- row/column organization;
- matrix as core linear-algebra object.

Source:
https://stanford.edu/~boyd/vmls/

## [R2] scikit-learn — Glossary: rectangular data, samples, features

Mendukung:

- rectangular data represented with samples on first axis and features on second;
- `n_samples` corresponds to rows;
- `n_features` corresponds to features.

Source:
https://scikit-learn.org/stable/glossary.html

## [R3] NumPy — `ndarray.shape` and array basics

Mendukung:

- shape as sizes along array axes;
- 2D software arrays described with row/column shape;
- implementation note distinction between mathematical object and array storage.

Sources:
https://numpy.org/doc/stable/reference/generated/numpy.ndarray.shape.html
https://numpy.org/doc/stable/user/absolute_beginners.html

## [R4] Google for Developers — Machine Learning Crash Course: Feature Vectors and Numerical Feature Quality

Mendukung:

- models ingest feature-vector representations;
- one example maps to a feature vector;
- feature meaning and preprocessing matter;
- avoiding ambiguous/magic representations for missing data.

Sources:
https://developers.google.com/machine-learning/crash-course/numerical-data/feature-vectors
https://developers.google.com/machine-learning/crash-course/numerical-data/qualities-of-good-numerical-features

## [R5] MIT OpenCourseWare — Linear Transformations and Their Matrices

Mendukung:

- matrix as more than a table;
- matrices as representations of linear transformations;
- bridge toward Topic 08 matrix-vector multiplication.

Source:
https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-30-linear-transformations-and-their-matrices/

---

# 75. Topic-Level QA Notes

## Academic QA

- Matrix tidak direduksi menjadi spreadsheet analogy saja.
- Rows/columns semantics didefinisikan eksplisit.
- HerAI convention rows = observations, columns = features konsisten dengan common ML rectangular-data convention.
- Feature matrix $\mathbf{X}\in\mathbb{R}^{n\times d}$ digunakan konsisten.
- Entry mapping $X_{ij}=x_j^{(i)}$ konsisten dengan notation Topic 02.
- Vector dimension dibedakan dari matrix shape.
- Matrix shape dibedakan dari total number of entries.
- Same shape tidak dianggap same semantics.
- Missing value tidak disamakan otomatis dengan zero.
- Transpose dijelaskan sebagai orientation/shape change, bukan semantic repair.
- Matrix tidak dianggap participant reality.
- Matrix multiplication belum diajarkan.

## Running Case QA

Persistent participants tetap:

- Alya;
- Bima;
- Citra;
- Dewi.

Persistent features tetap:

- quiz ratio $q$;
- completion ratio $c$.

Dataset values tetap:

| Participant | $q$ | $c$ |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

Tidak ada random dataset reset.

## Scope QA

Topic 07 mengajarkan:

- matrix intuition;
- formal definition;
- rows;
- columns;
- entries;
- shape;
- indexing;
- dataset orientation;
- feature order;
- row/column extraction;
- transpose orientation;
- AI/ML matrix representation.

Topic 07 **tidak** mengajarkan secara formal:

- matrix addition;
- matrix scalar multiplication;
- matrix-vector multiplication;
- matrix multiplication;
- linear transformation computation;
- determinant;
- inverse;
- rank;
- eigenvalues/eigenvectors;
- PCA;
- SVD;
- deep tensor algebra.

## Markdown + LaTeX QA Contract

- inline math menggunakan `$...$`;
- display math menggunakan `$$...$$`;
- no mathematical formulas inside fenced code blocks;
- no equation images;
- canonical vector notation bold lowercase;
- canonical matrix notation bold uppercase;
- source ditargetkan ke Markdown + LaTeX + KaTeX;
- browser-level KaTeX rendering belum diklaim sampai integration runtime benar-benar dijalankan.

## Production Status

**Topic 07 content complete.**

**STOP before Topic 08 pending user approval.**
