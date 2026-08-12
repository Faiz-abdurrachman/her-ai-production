# Topic 08 — Matrix Operations & Matrix Multiplication: Shape, Transformasi, dan AI Connection

> **Submodule 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks**  
> **Filename:** `08-matrix-operations-multiplication.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan background campuran, termasuk non-IT  
> **Prerequisite:** Topic 01–07 Submodule 02  
> **Forward dependency:** Submodule 03 — Statistics for AI: Membaca Pola dan Variasi Data  
> **Boundary:** Topic ini membahas operasi matrix dasar, matrix-vector multiplication, matrix-matrix multiplication, shape compatibility, dan transformation intuition. Inverse, determinant-heavy theory, eigenvalues/eigenvectors, PCA, SVD, formal proof, gradient, dan optimizer tetap deferred.

---

# 1. Mengapa Topik Ini Ada?

Pada Topic 07 kita sudah memiliki feature matrix HerAI:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
\in\mathbb{R}^{4\times2}.
$$

Rows merepresentasikan empat participants:

1. Alya;
2. Bima;
3. Citra;
4. Dewi.

Columns menggunakan feature schema yang sudah konsisten sejak Topic 01:

1. quiz ratio $q$;
2. completion ratio $c$.

Sampai Topic 07, matrix ini baru kita **baca dan interpretasikan**.

Sekarang muncul pertanyaan yang lebih kuat:

> Bagaimana satu operasi matematika dapat memproses seluruh participants secara konsisten sekaligus?

Di Topic 05, kita pernah menulis toy instructional function:

$$
h(q,c)=0.6q+0.4c.
$$

Untuk satu participant, fungsi itu juga dapat ditulis sebagai dot product:

$$
h(q,c)=\boldsymbol{\theta}^{\top}\mathbf{x}
$$

jika:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}.
$$

Tetapi sekarang kita punya **empat participant vectors sekaligus** di dalam $\mathbf{X}$.

Apakah kita harus menghitung satu per satu selamanya?

Tidak.

Matrix multiplication memberi kita bahasa untuk melakukan structured combinations terhadap banyak values sekaligus. MIT Linear Algebra menempatkan matrix multiplication sebagai operasi fundamental, dan matrix-vector multiplication dapat dibaca sebagai kombinasi linear dari columns maupun sebagai sekumpulan dot products dengan rows. [R1][R2]

Di machine learning modern, bentuk operasi yang sangat dekat dengan ini muncul berulang. Sebagai contoh, dokumentasi PyTorch mendeskripsikan linear layer sebagai affine transformation $y=xA^{\top}+b$, dengan input features dipetakan ke output features melalui weights. [R4]

Namun kita harus berhati-hati:

> **Matrix multiplication bukan sekadar “kalikan semua angka”. Shape, order, orientation, dan semantics menentukan apakah operasi itu valid dan apa arti output-nya.**

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 08, kamu diharapkan mampu:

1. menjelaskan matrix addition sebagai operasi component-wise pada matrices dengan shape yang sama;
2. menjelaskan matrix subtraction sebagai operasi component-wise pada matrices dengan shape yang sama;
3. melakukan scalar multiplication pada matrix;
4. membedakan scalar multiplication, elementwise multiplication, dan matrix multiplication;
5. memeriksa shape compatibility sebelum melakukan matrix multiplication;
6. menjelaskan aturan inner dimensions dan outer dimensions;
7. menghitung matrix-vector multiplication langkah demi langkah;
8. membaca matrix-vector multiplication sebagai row-by-vector dot products;
9. membaca matrix-vector multiplication sebagai transformation dari input vector ke output vector;
10. menghitung matrix-matrix multiplication kecil dengan row-column rule;
11. membaca formula entry product $C_{ij}$;
12. menjelaskan mengapa matrix multiplication umumnya tidak commutative;
13. menjelaskan mengapa $\mathbf{A}\mathbf{B}$ dapat valid sementara $\mathbf{B}\mathbf{A}$ tidak valid;
14. menjelaskan identity matrix pada level operasi dasar;
15. menggunakan $\mathbf{X}\boldsymbol{\theta}$ untuk menghitung seluruh toy scores HerAI sekaligus;
16. menggunakan matrix multiplication untuk menghasilkan beberapa weighted outputs per participant;
17. menjelaskan hubungan matrix multiplication dengan linear transformation dan linear layers pada AI;
18. mengaudit operasi yang mathematically valid tetapi semantically tidak meaningful;
19. menjaga distinction antara toy score, similarity score, probability, dan production prediction;
20. menjelaskan bridge dari feature matrix ke Statistics for AI.

---

# 3. Prerequisite Recall — Apa yang Sudah Kita Punya?

Topic ini tidak mengulang seluruh Submodule 02. Kita hanya menarik konsep yang benar-benar dibutuhkan.

## 3.1 Feature matrix HerAI

$$
\mathbf{X}
\in\mathbb{R}^{4\times2}
$$

berarti:

- $4$ rows;
- $2$ columns;
- pada convention HerAI, rows = observations;
- columns = features.

## 3.2 Dot product

Untuk vectors dengan dimension sama:

$$
\mathbf{x}^{\top}\mathbf{y}
=
\sum_{j=1}^{d}x_jy_j.
$$

Matrix multiplication nanti akan menggunakan ide **pair → multiply → sum** berulang kali.

## 3.3 Vector operations

Kita sudah tahu bahwa addition dan scalar multiplication bekerja component-wise pada vector.

Matrix addition dan scalar multiplication akan memperluas ide yang sama ke rows dan columns.

## 3.4 Shape dan orientation

Dari Topic 07:

$$
\mathbf{A}\in\mathbb{R}^{m\times n}
$$

berarti $m$ rows dan $n$ columns.

Kali ini shape bukan sekadar informasi deskriptif. Shape akan menentukan apakah product dapat dibentuk.

---

# 4. Pertanyaan Pemantik

Bayangkan:

$$
\mathbf{X}\in\mathbb{R}^{4\times2}
$$

dan:

$$
\boldsymbol{\theta}\in\mathbb{R}^{2}.
$$

Kita ingin satu score untuk setiap participant.

### Pertanyaan A

Apakah output harus mempunyai 2 values karena $\boldsymbol{\theta}$ mempunyai 2 components?

### Pertanyaan B

Apakah kita mengalikan setiap entry $\mathbf{X}$ dengan setiap entry $\boldsymbol{\theta}$ tanpa aturan pairing?

### Pertanyaan C

Jika:

$$
\mathbf{A}\in\mathbb{R}^{3\times2},
\qquad
\mathbf{B}\in\mathbb{R}^{2\times4},
$$

apakah $\mathbf{A}\mathbf{B}$ valid?

Jika valid, shape output apa?

### Pertanyaan D

Kalau $\mathbf{A}\mathbf{B}$ valid, apakah otomatis $\mathbf{B}\mathbf{A}$ juga valid?

Jangan buru-buru menghafal aturan. Kita akan membangun alasan di baliknya.

---

# 5. Predict Before Calculate

## Prediksi 1 — Same shape

Dua matrices:

$$
\mathbf{A},\mathbf{B}\in\mathbb{R}^{2\times3}.
$$

Mana yang jelas structurally valid?

A. $\mathbf{A}+\mathbf{B}$  
B. $\mathbf{A}\mathbf{B}$  
C. Keduanya selalu valid  
D. Tidak ada yang valid

Simpan jawabanmu.

## Prediksi 2 — Inner dimensions

$$
(3\times2)(2\times5)
$$

Apa shape output?

A. $3\times5$  
B. $2\times2$  
C. $3\times2$  
D. $5\times3$

## Prediksi 3 — Multiplication order

Jika:

$$
\mathbf{A}\in\mathbb{R}^{2\times3},
\qquad
\mathbf{B}\in\mathbb{R}^{3\times4},
$$

maka $\mathbf{A}\mathbf{B}$ valid.

Apakah $\mathbf{B}\mathbf{A}$ juga valid?

## Prediksi 4 — HerAI batch score

Jika $\mathbf{X}$ punya 4 participant rows dan kita mengalikan dengan satu weight vector untuk menghasilkan satu score per row, kira-kira output punya berapa entries?

Catat reasoning, bukan hanya jawaban.

---

# 6. Intuisi — Tiga Jenis “Multiplication” yang Jangan Dicampur

Kata “multiplication” sering terasa seperti satu operasi saja.

Di Linear Algebra, kita harus membedakan beberapa hal.

## 6.1 Scalar multiplication

Satu scalar mengalikan semua entries matrix.

Contoh:

$$
2
\begin{bmatrix}
1&3\\
2&4
\end{bmatrix}
=
\begin{bmatrix}
2&6\\
4&8
\end{bmatrix}.
$$

## 6.2 Elementwise multiplication

Entry pada posisi yang sama dikalikan entry pada posisi yang sama.

Contoh konseptual:

$$
\begin{bmatrix}
a&b\\
c&d
\end{bmatrix}
\odot
\begin{bmatrix}
e&f\\
g&h
\end{bmatrix}
=
\begin{bmatrix}
ae&bf\\
cg&dh
\end{bmatrix}.
$$

Symbol $\odot$ di sini digunakan agar kita tidak menyamakan operasi ini dengan matrix multiplication.

## 6.3 Matrix multiplication

Matrix multiplication bukan pairwise multiplication lalu berhenti.

Ia menggunakan pola:

> **row dari matrix kiri → pair dengan column dari matrix kanan → multiply corresponding entries → sum.**

Jadi matrix multiplication adalah struktur dot product yang diulang untuk setiap output entry.

---

# 7. Matrix Addition

Diberikan:

$$
\mathbf{A}
=
\begin{bmatrix}
1&2\\
3&4
\end{bmatrix},
\qquad
\mathbf{B}
=
\begin{bmatrix}
5&6\\
7&8
\end{bmatrix}.
$$

Karena shape keduanya sama:

$$
\mathbf{A},\mathbf{B}\in\mathbb{R}^{2\times2},
$$

kita dapat menjumlahkan entries pada posisi yang sama:

$$
\mathbf{A}+\mathbf{B}
=
\begin{bmatrix}
1+5 & 2+6\\
3+7 & 4+8
\end{bmatrix}
=
\begin{bmatrix}
6&8\\
10&12
\end{bmatrix}.
$$

## Definisi formal

Jika:

$$
\mathbf{A},\mathbf{B}\in\mathbb{R}^{m\times n},
$$

maka:

$$
(\mathbf{A}+\mathbf{B})_{ij}=A_{ij}+B_{ij}.
$$

### Symbol definitions

- $\mathbf{A},\mathbf{B}$ = matrices dengan shape yang sama;
- $A_{ij}$ = entry row $i$, column $j$ pada $\mathbf{A}$;
- $B_{ij}$ = entry row $i$, column $j$ pada $\mathbf{B}$;
- $i$ = row index;
- $j$ = column index.

### Constraint

Matrix addition membutuhkan **shape yang sama**.

Tetapi, seperti pada vector operations:

> **same shape membuat operasi structurally possible; same semantics diperlukan agar interpretation masuk akal.**

---

# 8. Matrix Subtraction

Dengan matrix yang sama:

$$
\mathbf{B}-\mathbf{A}
=
\begin{bmatrix}
5-1 & 6-2\\
7-3 & 8-4
\end{bmatrix}
=
\begin{bmatrix}
4&4\\
4&4
\end{bmatrix}.
$$

Secara formal:

$$
(\mathbf{A}-\mathbf{B})_{ij}=A_{ij}-B_{ij}.
$$

Interpretasi tergantung context.

Difference matrix dapat merepresentasikan perubahan entry-wise jika kedua matrices memang menggambarkan quantities yang comparable pada row dan column yang sama.

---

# 9. Scalar Multiplication pada Matrix

Jika $\alpha$ adalah scalar dan:

$$
\mathbf{A}\in\mathbb{R}^{m\times n},
$$

maka:

$$
(\alpha\mathbf{A})_{ij}=\alpha A_{ij}.
$$

Contoh:

$$
0.5
\begin{bmatrix}
2&4\\
6&8
\end{bmatrix}
=
\begin{bmatrix}
1&2\\
3&4
\end{bmatrix}.
$$

Shape tidak berubah.

Jika $\mathbf{A}\in\mathbb{R}^{m\times n}$, maka:

$$
\alpha\mathbf{A}\in\mathbb{R}^{m\times n}.
$$

---

# 10. Misconception Challenge 1 — “Semua Operasi Matrix Butuh Same Shape”

Tidak.

Addition dan subtraction membutuhkan same shape.

Matrix multiplication mempunyai compatibility rule yang berbeda.

Contoh:

$$
\mathbf{A}\in\mathbb{R}^{3\times2},
\qquad
\mathbf{B}\in\mathbb{R}^{2\times5}.
$$

Shapes berbeda, tetapi product $\mathbf{A}\mathbf{B}$ justru valid.

Mengapa?

Itulah fokus berikutnya.

---

# 11. Matrix-Vector Multiplication — Mulai dari Satu Output Vector

Diberikan:

$$
\mathbf{A}
=
\begin{bmatrix}
1&2\\
3&4\\
5&6
\end{bmatrix}
\in\mathbb{R}^{3\times2}
$$

dan:

$$
\mathbf{x}
=
\begin{bmatrix}
10\\
20
\end{bmatrix}
\in\mathbb{R}^{2}.
$$

Kita ingin:

$$
\mathbf{A}\mathbf{x}.
$$

Setiap row $\mathbf{A}$ mempunyai 2 entries.

Vector $\mathbf{x}$ juga mempunyai 2 components.

Jadi setiap row dapat melakukan dot product dengan $\mathbf{x}$.

Row 1:

$$
1(10)+2(20)=50.
$$

Row 2:

$$
3(10)+4(20)=110.
$$

Row 3:

$$
5(10)+6(20)=170.
$$

Sehingga:

$$
\mathbf{A}\mathbf{x}
=
\begin{bmatrix}
50\\
110\\
170
\end{bmatrix}.
$$

Input vector dimension adalah $2$.

Output vector dimension adalah $3$.

Matrix $\mathbf{A}$ melakukan mapping:

$$
\mathbb{R}^{2}\to\mathbb{R}^{3}.
$$

---

# 12. Shape Contract — Matrix × Vector

Jika:

$$
\mathbf{A}\in\mathbb{R}^{m\times n}
$$

dan:

$$
\mathbf{x}\in\mathbb{R}^{n},
$$

maka:

$$
\mathbf{A}\mathbf{x}\in\mathbb{R}^{m}.
$$

Cara membaca:

> matrix dengan $m$ rows dan $n$ columns mengalikan vector dengan $n$ components, menghasilkan vector dengan $m$ components.

Kenapa $n$ harus sama?

Karena setiap row matrix mempunyai $n$ entries, dan dot product row tersebut membutuhkan vector dengan $n$ components.

---

# 13. Math Reading Skill — Inner Match, Outer Survive

Untuk matrix-vector:

$$
(m\times n)(n\times1)\to(m\times1).
$$

Kamu dapat menggunakan mnemonic:

> **inner dimensions harus match; outer dimensions menentukan shape output.**

Tapi jangan hanya hafal mnemonic.

Underlying reason-nya adalah dot-product compatibility.

Contoh:

$$
(4\times2)(2\times1)\to(4\times1).
$$

Angka tengah $2$ dan $2$ harus sama.

Output membawa angka luar $4$ dan $1$.

---

# 14. HerAI Running Case — Semua Toy Scores Sekaligus

Recall:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80&0.75\\
0.60&0.625\\
0.90&1.00\\
0.70&0.50
\end{bmatrix}
\in\mathbb{R}^{4\times2}.
$$

Weight vector:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}
\in\mathbb{R}^{2}.
$$

Karena inner dimension match:

$$
(4\times2)(2\times1)\to(4\times1),
$$

product valid.

## Worked Example 1 — $\mathbf{X}\boldsymbol{\theta}$ Step by Step

### Row 1 — Alya

$$
0.80(0.60)+0.75(0.40)
$$

$$
=0.48+0.30
$$

$$
=0.78.
$$

### Row 2 — Bima

$$
0.60(0.60)+0.625(0.40)
$$

$$
=0.36+0.25
$$

$$
=0.61.
$$

### Row 3 — Citra

$$
0.90(0.60)+1.00(0.40)
$$

$$
=0.54+0.40
$$

$$
=0.94.
$$

### Row 4 — Dewi

$$
0.70(0.60)+0.50(0.40)
$$

$$
=0.42+0.20
$$

$$
=0.62.
$$

Jadi:

$$
\mathbf{X}\boldsymbol{\theta}
=
\begin{bmatrix}
0.78\\
0.61\\
0.94\\
0.62
\end{bmatrix}.
$$

Ini sangat penting untuk continuity.

Nilai tersebut **harus sama** dengan toy instructional scores yang kita hitung satu per satu pada Topic 05.

Matrix multiplication tidak menciptakan formula baru. Ia melakukan operasi yang sama secara terstruktur untuk seluruh rows.

### Interpretation safety

Vector output ini adalah **toy instructional scores** berdasarkan fixed rule:

$$
h(q,c)=0.6q+0.4c.
$$

Ia bukan:

- probability keberhasilan;
- accuracy;
- confidence terkalibrasi;
- production recommendation output;
- causal effect.

---

# 15. Row-Dot-Vector View

Matrix-vector multiplication dapat dibaca sebagai serangkaian dot products.

Jika rows $\mathbf{A}$ adalah:

$$
\mathbf{a}_1^{\top},\ldots,\mathbf{a}_m^{\top},
$$

maka:

$$
\mathbf{A}\mathbf{x}
=
\begin{bmatrix}
\mathbf{a}_1^{\top}\mathbf{x}\\
\vdots\\
\mathbf{a}_m^{\top}\mathbf{x}
\end{bmatrix}.
$$

Pada HerAI:

- row Alya dot $\boldsymbol{\theta}$ → score Alya;
- row Bima dot $\boldsymbol{\theta}$ → score Bima;
- row Citra dot $\boldsymbol{\theta}$ → score Citra;
- row Dewi dot $\boldsymbol{\theta}$ → score Dewi.

Ini menghubungkan Topic 05 dan Topic 08 secara langsung.

---

# 16. Column-Combination View

Ada cara lain membaca:

$$
\mathbf{A}\mathbf{x}.
$$

Jika columns $\mathbf{A}$ adalah:

$$
\mathbf{a}_1,\mathbf{a}_2,\ldots,\mathbf{a}_n
$$

dan:

$$
\mathbf{x}
=
\begin{bmatrix}
x_1\\
\vdots\\
x_n
\end{bmatrix},
$$

maka:

$$
\mathbf{A}\mathbf{x}
=x_1\mathbf{a}_1+\cdots+x_n\mathbf{a}_n.
$$

Jadi matrix-vector multiplication juga dapat dibaca sebagai **weighted combination of columns**.

MIT OCW menekankan perspektif $A\mathbf{x}$ sebagai combination of columns dalam pembahasan column space. [R2]

Untuk beginner, dua views yang perlu diingat adalah:

1. rows melakukan dot product dengan input vector;
2. input components menjadi weights untuk columns matrix.

Keduanya menghasilkan object yang sama.

---

# 17. Change One Thing — Ubah Satu Weight

Awal:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}.
$$

Misalkan kita ubah menjadi:

$$
\boldsymbol{\theta}'
=
\begin{bmatrix}
0.70\\
0.30
\end{bmatrix}.
$$

Sebelum menghitung:

> participant dengan quiz ratio relatif tinggi dibanding completion ratio akan cenderung mendapat perubahan seperti apa?

Untuk Alya:

$$
0.70(0.80)+0.30(0.75)
=0.56+0.225
=0.785.
$$

Score berubah dari $0.78$ menjadi $0.785$.

Ini adalah sensitivity reasoning terhadap **fixed rule**.

Jangan membaca perubahan weight sebagai causal evidence.

---

# 18. Checkpoint 1

Jawab tanpa melihat ke atas.

1. Jika $\mathbf{A}\in\mathbb{R}^{5\times3}$ dan $\mathbf{x}\in\mathbb{R}^{3}$, shape output apa?
2. Mengapa matrix-vector product dapat dilihat sebagai repeated dot products?
3. Dalam $\mathbf{X}\boldsymbol{\theta}$ HerAI, apa arti setiap output entry?
4. Apakah output $0.94$ otomatis probability $94\%$?

### Jawaban ringkas

1. vector dimension $5$;
2. setiap row matrix mempunyai 3 entries dan di-dot-product dengan vector 3 components;
3. toy instructional score untuk participant pada row yang sama;
4. tidak.

---

# 19. Dari Matrix-Vector ke Matrix-Matrix Multiplication

Sekarang misalkan kita tidak hanya ingin satu weighted output.

Kita ingin beberapa outputs sekaligus.

Misalnya satu participant memiliki dua features:

$$
[q,c].
$$

Kita ingin dua toy outputs:

- output 1: bobot $0.60$ pada $q$, $0.40$ pada $c$;
- output 2: bobot $0.20$ pada $q$, $0.80$ pada $c$.

Weight matrix:

$$
\mathbf{W}
=
\begin{bmatrix}
0.60&0.20\\
0.40&0.80
\end{bmatrix}.
$$

Perhatikan orientation.

Column 1 $\mathbf{W}$ menyimpan weights untuk output 1.

Column 2 menyimpan weights untuk output 2.

Karena:

$$
\mathbf{X}\in\mathbb{R}^{4\times2}
$$

dan:

$$
\mathbf{W}\in\mathbb{R}^{2\times2},
$$

maka:

$$
\mathbf{X}\mathbf{W}\in\mathbb{R}^{4\times2}.
$$

Sekarang setiap participant row menghasilkan dua output values.

---

# 20. Definisi Formal — Matrix-Matrix Multiplication

Jika:

$$
\mathbf{A}\in\mathbb{R}^{m\times n}
$$

dan:

$$
\mathbf{B}\in\mathbb{R}^{n\times p},
$$

maka product:

$$
\mathbf{C}=\mathbf{A}\mathbf{B}
$$

terdefinisi dan:

$$
\mathbf{C}\in\mathbb{R}^{m\times p}.
$$

Setiap entry $C_{ij}$ dihitung sebagai:

$$
C_{ij}
=
\sum_{k=1}^{n}A_{ik}B_{kj}.
$$

---

# 21. Formula Contract — $C_{ij}$

## Formula

$$
C_{ij}
=
\sum_{k=1}^{n}A_{ik}B_{kj}.
$$

## Symbol definitions

- $\mathbf{A}$ = matrix kiri, shape $m\times n$;
- $\mathbf{B}$ = matrix kanan, shape $n\times p$;
- $\mathbf{C}=\mathbf{A}\mathbf{B}$ = output matrix;
- $C_{ij}$ = output entry pada row $i$, column $j$;
- $A_{ik}$ = entry row $i$, column $k$ dari $\mathbf{A}$;
- $B_{kj}$ = entry row $k$, column $j$ dari $\mathbf{B}$;
- $k$ = index yang berjalan sepanjang shared inner dimension $n$.

## Natural-language reading

> Untuk mendapatkan output pada row $i$, column $j$, ambil row $i$ dari matrix kiri dan column $j$ dari matrix kanan, kalikan corresponding entries, lalu jumlahkan.

## Conceptual meaning

Setiap output entry adalah satu dot product.

## Constraint

Jumlah columns matrix kiri harus sama dengan jumlah rows matrix kanan.

---

# 22. Row-Column Rule

Misalkan:

$$
\mathbf{A}
=
\begin{bmatrix}
1&2\\
3&4
\end{bmatrix}
$$

dan:

$$
\mathbf{B}
=
\begin{bmatrix}
5&6\\
7&8
\end{bmatrix}.
$$

Untuk $C_{11}$:

$$
C_{11}
=1(5)+2(7)
=5+14
=19.
$$

Untuk $C_{12}$:

$$
C_{12}
=1(6)+2(8)
=6+16
=22.
$$

Untuk $C_{21}$:

$$
C_{21}
=3(5)+4(7)
=15+28
=43.
$$

Untuk $C_{22}$:

$$
C_{22}
=3(6)+4(8)
=18+32
=50.
$$

Jadi:

$$
\mathbf{A}\mathbf{B}
=
\begin{bmatrix}
19&22\\
43&50
\end{bmatrix}.
$$

---

# 23. Worked Example 2 — Shape Sebelum Angka

Diberikan:

$$
\mathbf{A}\in\mathbb{R}^{3\times2},
\qquad
\mathbf{B}\in\mathbb{R}^{2\times4}.
$$

Sebelum menyentuh entries:

## Step 1 — Periksa inner dimensions

Columns $\mathbf{A}$ = $2$.

Rows $\mathbf{B}$ = $2$.

Match.

## Step 2 — Product valid

$$
\mathbf{A}\mathbf{B}
$$

valid.

## Step 3 — Ambil outer dimensions

Rows $\mathbf{A}$ = $3$.

Columns $\mathbf{B}$ = $4$.

Maka:

$$
\mathbf{A}\mathbf{B}
\in\mathbb{R}^{3\times4}.
$$

## Interpretation

Output punya satu row untuk setiap row matrix kiri dan satu column untuk setiap column matrix kanan.

---

# 24. Misconception Challenge 2 — “Kalikan Shape-nya”

Salah satu kesalahan umum:

$$
(3\times2)(2\times4)
$$

lalu peserta mencoba:

$$
(3\cdot2)\times(2\cdot4)=6\times8.
$$

Itu bukan aturan matrix multiplication.

Shape output adalah:

$$
3\times4.
$$

Inner dimensions dipakai sebagai compatibility + summation length.

Outer dimensions menjadi output shape.

---

# 25. HerAI Worked Example — Dua Outputs per Participant

Gunakan:

$$
\mathbf{W}
=
\begin{bmatrix}
0.60&0.20\\
0.40&0.80
\end{bmatrix}.
$$

Kita definisikan secara eksplisit:

- column 1 $\mathbf{W}$ = toy weighted score A;
- column 2 $\mathbf{W}$ = toy weighted score B.

Ini hanya instructional construction untuk belajar matrix multiplication.

## Alya — output column 1

$$
0.80(0.60)+0.75(0.40)
=0.48+0.30
=0.78.
$$

## Alya — output column 2

$$
0.80(0.20)+0.75(0.80)
=0.16+0.60
=0.76.
$$

Jadi row Alya pada output:

$$
[0.78,0.76].
$$

Jika seluruh rows dihitung:

$$
\mathbf{X}\mathbf{W}
=
\begin{bmatrix}
0.78&0.76\\
0.61&0.62\\
0.94&0.98\\
0.62&0.54
\end{bmatrix}.
$$

## Interpretation

- rows output masih align dengan participants;
- columns output sekarang align dengan dua defined weighted-output schemas;
- matrix multiplication telah mengubah representation dari 2 input features menjadi 2 output quantities.

Tetapi sekali lagi:

> output columns tidak otomatis probability hanya karena values berada sekitar $0$ sampai $1$.

---

# 26. Matrix Multiplication sebagai Transformation

Salah satu cara paling penting memandang matrix adalah sebagai transformation.

Jika:

$$
\mathbf{W}\in\mathbb{R}^{d\times r},
$$

maka row vector dengan $d$ input features dapat dipetakan menjadi $r$ output features melalui multiplication yang sesuai orientation.

Pada batch representation:

$$
\mathbf{X}\in\mathbb{R}^{n\times d}
$$

dan:

$$
\mathbf{W}\in\mathbb{R}^{d\times r},
$$

maka:

$$
\mathbf{X}\mathbf{W}
\in\mathbb{R}^{n\times r}.
$$

Interpretasi:

- $n$ observations tetap $n$;
- input feature dimension $d$ dipetakan ke output dimension $r$.

Ini adalah bridge yang sangat penting menuju model layers.

---

# 27. AI/ML Connection — Linear Layer tanpa Training Theory

PyTorch mendeskripsikan linear layer sebagai affine transformation:

$$
y=xA^{\top}+b.
$$

[R4]

Pada batch input, conceptual pattern-nya adalah:

> input representations → multiplication dengan weight matrix → optional bias → output representations.

Kita **belum** membahas:

- bagaimana weights dipelajari;
- loss;
- backpropagation;
- gradient;
- optimizer.

Semua itu adalah later dependencies.

Yang perlu dipahami sekarang:

> matrix multiplication menyediakan mechanism untuk menggabungkan banyak input components menjadi satu atau banyak output components secara terstruktur.

---

# 28. Linear vs Affine — Jangan Campur Terlalu Cepat

Pure matrix multiplication:

$$
\mathbf{y}=\mathbf{A}\mathbf{x}
$$

adalah linear transformation.

Jika ditambah bias:

$$
\mathbf{y}=\mathbf{A}\mathbf{x}+\mathbf{b},
$$

secara matematika disebut affine transformation.

Pada ML practice, layer bernama “Linear” sering juga mempunyai bias term. PyTorch secara eksplisit menyebut operasinya affine transformation. [R4]

Untuk Submodule 02, fokus kita tetap:

- matrix multiplication;
- shape;
- weighted combinations;
- transformation intuition.

Bukan taxonomy formal mendalam tentang linear vs affine maps.

---

# 29. Matrix Multiplication ≠ Elementwise Multiplication

Gunakan matrices:

$$
\mathbf{A}
=
\begin{bmatrix}
1&2\\
3&4
\end{bmatrix},
\qquad
\mathbf{B}
=
\begin{bmatrix}
5&6\\
7&8
\end{bmatrix}.
$$

Elementwise product:

$$
\mathbf{A}\odot\mathbf{B}
=
\begin{bmatrix}
5&12\\
21&32
\end{bmatrix}.
$$

Matrix product:

$$
\mathbf{A}\mathbf{B}
=
\begin{bmatrix}
19&22\\
43&50
\end{bmatrix}.
$$

Hasil berbeda karena operasi berbeda.

NumPy juga membedakan matrix product `matmul` dari ordinary elementwise operations; dokumentasi `matmul` menggunakan signature shape $(n,k)(k,m)\to(n,m)$ untuk conventional matrix product. [R3]

---

# 30. Order Matters — Matrix Multiplication Umumnya Tidak Commutative

Untuk scalar numbers:

$$
2\cdot3=3\cdot2.
$$

Matrix multiplication tidak mempunyai general property tersebut.

Umumnya:

$$
\mathbf{A}\mathbf{B}
\neq
\mathbf{B}\mathbf{A}.
$$

Bahkan salah satu product dapat valid dan yang lain invalid.

Contoh:

$$
\mathbf{A}\in\mathbb{R}^{2\times3},
\qquad
\mathbf{B}\in\mathbb{R}^{3\times4}.
$$

$\mathbf{A}\mathbf{B}$:

$$
(2\times3)(3\times4)\to2\times4
$$

valid.

Tetapi $\mathbf{B}\mathbf{A}$:

$$
(3\times4)(2\times3)
$$

inner dimensions $4$ dan $2$ tidak match.

Jadi invalid.

---

# 31. Worked Example 3 — Ketika Dua Arah Sama-sama Valid tetapi Hasil Berbeda

Pilih square matrices:

$$
\mathbf{A}
=
\begin{bmatrix}
1&1\\
0&1
\end{bmatrix},
\qquad
\mathbf{B}
=
\begin{bmatrix}
1&0\\
1&1
\end{bmatrix}.
$$

## Hitung $\mathbf{A}\mathbf{B}$

$$
\mathbf{A}\mathbf{B}
=
\begin{bmatrix}
1(1)+1(1) & 1(0)+1(1)\\
0(1)+1(1) & 0(0)+1(1)
\end{bmatrix}
$$

$$
=
\begin{bmatrix}
2&1\\
1&1
\end{bmatrix}.
$$

## Hitung $\mathbf{B}\mathbf{A}$

$$
\mathbf{B}\mathbf{A}
=
\begin{bmatrix}
1(1)+0(0) & 1(1)+0(1)\\
1(1)+1(0) & 1(1)+1(1)
\end{bmatrix}
$$

$$
=
\begin{bmatrix}
1&1\\
1&2
\end{bmatrix}.
$$

Keduanya valid, tetapi:

$$
\mathbf{A}\mathbf{B}\neq\mathbf{B}\mathbf{A}.
$$

---

# 32. Why Order Matters Conceptually

Jika matrices merepresentasikan transformations, composition order dapat mengubah hasil.

“Lakukan transformation A lalu B” tidak otomatis sama dengan “B lalu A”.

Kita tidak masuk formal composition theory di sini.

Yang perlu kamu pegang:

> matrix product membawa order yang meaningful.

---

# 33. Identity Matrix — Matrix Version dari “Do Nothing”

Untuk dimension $n$, identity matrix dinotasikan:

$$
\mathbf{I}_n.
$$

Contoh:

$$
\mathbf{I}_2
=
\begin{bmatrix}
1&0\\
0&1
\end{bmatrix}.
$$

Jika shape compatible:

$$
\mathbf{I}\mathbf{x}=\mathbf{x}.
$$

Untuk matrix:

$$
\mathbf{I}\mathbf{A}=\mathbf{A}
$$

dan:

$$
\mathbf{A}\mathbf{I}=\mathbf{A}
$$

dengan identity matrix yang dimension-nya sesuai pada masing-masing sisi.

Identity berguna untuk memahami transformation yang mempertahankan input.

Kita belum masuk inverse matrix.

---

# 34. Misconception Challenge 3 — “Kalau Product Valid, Meaning Pasti Valid”

Tidak.

Misalkan:

$$
\mathbf{X}
$$

memiliki columns:

$$
[q,c].
$$

Lalu weight matrix $\mathbf{W}$ didesain dengan row order:

$$
[c,q].
$$

Shape mungkin tetap compatible:

$$
(4\times2)(2\times2).
$$

Software dapat menghitung product.

Tetapi weight-to-feature alignment salah.

Ini adalah **silent semantic bug**.

Shape compatibility adalah necessary condition untuk matrix multiplication, bukan sufficient condition untuk meaningful model semantics.

---

# 35. Feature Order Contract Tetap Berlaku

Jika input schema:

$$
[q,c],
$$

maka rows weight matrix yang berinteraksi dengan input dimension harus menggunakan urutan yang sama.

Misalnya:

$$
\mathbf{W}
=
\begin{bmatrix}
0.60&0.20\\
0.40&0.80
\end{bmatrix}.
$$

Interpretation:

- first row weights correspond to $q$;
- second row weights correspond to $c$.

Jika rows $\mathbf{W}$ ditukar tanpa menukar schema, output berubah makna.

---

# 36. HerAI Extension — Participant Need Matrix × Material Support Matrix

Topic 06 memperkenalkan learning-need vectors:

$$
\mathbf{n}
=
\begin{bmatrix}
1-q\\
1-c
\end{bmatrix}.
$$

Untuk empat participants:

$$
\mathbf{N}
=
\begin{bmatrix}
0.20&0.25\\
0.40&0.375\\
0.10&0.00\\
0.30&0.50
\end{bmatrix}
\in\mathbb{R}^{4\times2}.
$$

Gunakan tiga toy material support profiles:

$$
\mathbf{S}
=
\begin{bmatrix}
0.90&0.20\\
0.20&0.90\\
0.70&0.70
\end{bmatrix}
\in\mathbb{R}^{3\times2}.
$$

Rows $\mathbf{S}$:

1. Material A — quiz reinforcement;
2. Material B — completion support;
3. Material C — balanced support.

Untuk mendapatkan raw dot products antara setiap participant need dan setiap material support, kita menggunakan:

$$
\mathbf{N}\mathbf{S}^{\top}.
$$

Shape:

$$
(4\times2)(2\times3)\to4\times3.
$$

Jadi output mempunyai:

- 4 participant rows;
- 3 material columns.

---

# 37. Worked Example 4 — Satu Entry Recommendation-Score Matrix

Cari entry row Alya, column Material A.

Alya need:

$$
[0.20,0.25].
$$

Material A support:

$$
[0.90,0.20].
$$

Raw dot score:

$$
0.20(0.90)+0.25(0.20)
$$

$$
=0.18+0.05
$$

$$
=0.23.
$$

Jadi output entry $(1,1)$ adalah:

$$
0.23.
$$

Jika seluruh product dihitung:

$$
\mathbf{N}\mathbf{S}^{\top}
=
\begin{bmatrix}
0.2300&0.2650&0.3150\\
0.4350&0.4175&0.5425\\
0.0900&0.0200&0.0700\\
0.3700&0.5100&0.5600
\end{bmatrix}.
$$

## Apa arti output ini?

Setiap entry adalah **raw dot-product alignment score** antara one participant need vector dan one material support vector.

Ini **bukan cosine similarity**, karena norm normalization tidak dilakukan.

Ini juga bukan probability.

Topic 06 sudah menunjukkan bahwa dot product dan cosine similarity dapat memberi ranking berbeda karena dot product sensitif terhadap magnitude.

---

# 38. Critical Comparison — Dot Score Matrix vs Cosine Similarity Matrix

Matrix multiplication di atas menghitung banyak dot products sekaligus.

Itu berguna.

Tetapi jangan berpikir:

> “Karena sekarang output-nya matrix, berarti semua cells sudah recommendation probabilities.”

Tidak.

Math operation menentukan computation.

Semantics ditentukan oleh:

- representation design;
- chosen metric;
- normalization;
- task definition;
- evaluation evidence.

Matrix multiplication tidak memberikan probabilistic meaning secara otomatis.

---

# 39. Try It Yourself 1 — Shape Compatibility

Tentukan valid/tidak valid dan output shape jika valid.

### A

$$
(5\times3)(3\times2)
$$

### B

$$
(5\times3)(4\times2)
$$

### C

$$
(1\times4)(4\times7)
$$

### D

$$
(2\times2)(2\times2)
$$

### Expected answers

A:

$$
5\times2
$$

B: invalid.

C:

$$
1\times7
$$

D:

$$
2\times2.
$$

---

# 40. Try It Yourself 2 — One Matrix Entry

Diberikan:

$$
\mathbf{A}
=
\begin{bmatrix}
2&1\\
0&3
\end{bmatrix},
\qquad
\mathbf{B}
=
\begin{bmatrix}
4&5\\
6&7
\end{bmatrix}.
$$

Hitung hanya:

$$
(\mathbf{A}\mathbf{B})_{12}.
$$

Row 1 $\mathbf{A}$:

$$
[2,1].
$$

Column 2 $\mathbf{B}$:

$$
\begin{bmatrix}
5\\
7
\end{bmatrix}.
$$

Maka:

$$
2(5)+1(7)=17.
$$

---

# 41. Try It Yourself 3 — HerAI Batch Score Audit

Gunakan:

$$
\boldsymbol{\phi}
=
\begin{bmatrix}
0.50\\
0.50
\end{bmatrix}.
$$

Tanpa menghitung semua participants sekaligus, hitung output Alya dan Dewi.

### Alya

$$
0.50(0.80)+0.50(0.75)=0.775.
$$

### Dewi

$$
0.50(0.70)+0.50(0.50)=0.60.
$$

Pertanyaan interpretasi:

Apakah $0.775$ berarti probability Alya berhasil $77.5\%$?

Jawaban: tidak, kecuali model dan output memang didefinisikan serta divalidasi sebagai probability.

---

# 42. Misconception Challenge 4 — “Output Matrix Lebih Objective”

Matrix notation dapat membuat calculation tampak formal dan sophisticated.

Tetapi:

> formal notation tidak memperbaiki questionable assumptions.

Jika feature semantics buruk, weights arbitrary, atau schema salah, matrix multiplication hanya menghitung dengan sangat konsisten berdasarkan desain yang salah.

Ini sama dengan principle dari Submodule 01:

> **mathematical correctness ≠ interpretation correctness.**

---

# 43. Misconception Challenge 5 — “Banyak Output = Model Lebih Pintar”

Jika:

$$
\mathbf{X}\mathbf{W}\in\mathbb{R}^{n\times100},
$$

itu berarti kita menghasilkan 100 output components per observation.

Itu tidak otomatis berarti:

- information quality lebih tinggi;
- model lebih accurate;
- representation lebih fair;
- system lebih useful.

Dimension adalah structural property.

Utility perlu evidence dan task context.

---

# 44. Visualization Spec 1 — Matrix Multiplication Shape Gate

[INTERACTIVE VISUAL]

**Learning purpose:** membuat shape compatibility menjadi visual reasoning, bukan hafalan.

**Initial state/data:**

- Matrix A shape control: $m\times n$;
- Matrix B shape control: $r\times p$.

**Learner action:** ubah $m,n,r,p$ dengan sliders/dropdowns.

**Expected behavior:**

- inner dimensions $n$ dan $r$ diberi visual linkage;
- jika $n=r$, product gate terbuka;
- output shape $m\times p$ muncul;
- jika mismatch, product tidak ditampilkan.

**Feedback:** “Inner dimensions match” atau “Cannot multiply: columns of A must equal rows of B.”

**Safety note:** structural compatibility belum menjamin semantic compatibility.

---

# 45. Visualization Spec 2 — Row × Column Dot Product Reveal

[STEP-BY-STEP REVEAL]

**Learning purpose:** menunjukkan bagaimana satu output cell dibentuk.

**Initial state:** matrix $2\times2$ kecil.

**Learner action:** klik cell output $C_{ij}$.

**Expected behavior:**

1. row $i$ matrix kiri highlight;
2. column $j$ matrix kanan highlight;
3. corresponding pairs highlight;
4. pairwise products muncul;
5. sum muncul;
6. output cell terisi.

**Feedback:** formula symbolic dan numeric ditampilkan berdampingan.

---

# 46. Visualization Spec 3 — Elementwise vs Matrix Product

[COMPARE VIEW]

**Learning purpose:** menghilangkan misconception bahwa multiplication matrix = elementwise.

**Initial state:** dua matrices $2\times2$ yang sama.

**Learner action:** toggle `Elementwise` vs `Matrix product`.

**Expected behavior:** output berbeda ditampilkan dengan process berbeda.

**Feedback:** elementwise highlights same-position cells; matrix product highlights row-column pairs.

---

# 47. Visualization Spec 4 — HerAI Batch Score Engine

[INTERACTIVE VISUAL]

**Learning purpose:** menghubungkan $\mathbf{X}\boldsymbol{\theta}$ dengan four participant scores.

**Initial state:**

$$
\boldsymbol{\theta}=[0.60,0.40].
$$

**Learner action:** slider quiz weight dan completion weight.

**Expected behavior:** seluruh four outputs update bersamaan.

**Feedback:** setiap output dapat di-expand menjadi row dot weight vector.

**Safety note:** label output sebagai `toy instructional score`, bukan probability.

---

# 48. Visualization Spec 5 — Transformation Dimension Mapper

[STATIC VISUAL]

**Learning purpose:** menunjukkan:

$$
(n\times d)(d\times r)\to(n\times r).
$$

**Initial state:** 4 participants × 2 input features → weight matrix 2 × 3 → 4 participants × 3 outputs.

**Expected behavior:** rows “flow through” sedangkan feature dimension berubah dari 2 ke 3.

**Safety note:** visual tidak boleh mengimplikasikan new outputs otomatis meaningful; output semantics harus didefinisikan.

---

# 49. Visualization Spec 6 — Order Matters

[COMPARE VIEW]

**Learning purpose:** menunjukkan $\mathbf{A}\mathbf{B}$ vs $\mathbf{B}\mathbf{A}$.

**Initial state:** square matrices yang kedua products-nya valid tetapi berbeda.

**Learner action:** switch product order.

**Expected behavior:** perhitungan row-column berubah dan outputs berbeda.

**Feedback:** tampilkan “matrix multiplication is generally non-commutative.”

---

# 50. Visualization Spec 7 — Participant × Material Score Matrix

[INTERACTIVE VISUAL]

**Learning purpose:** menunjukkan matrix-matrix multiplication sebagai many pairwise dot products.

**Initial state:**

- 4 participant need rows;
- 3 material support rows;
- output $4\times3$.

**Learner action:** klik output cell.

**Expected behavior:** selected participant need vector dan selected material support vector ditampilkan; dot product decomposition muncul.

**Safety note:** raw dot score ≠ cosine similarity ≠ probability ≠ causal suitability.

---

# 51. Checkpoint 2 — Shape Audit

Tentukan apakah product valid.

## A

$$
\mathbf{A}\in\mathbb{R}^{8\times3},
\qquad
\mathbf{B}\in\mathbb{R}^{3\times5}.
$$

Valid:

$$
8\times5.
$$

## B

$$
\mathbf{A}\in\mathbb{R}^{8\times3},
\qquad
\mathbf{B}\in\mathbb{R}^{4\times5}.
$$

Invalid karena $3\neq4$.

## C

$$
\mathbf{X}\in\mathbb{R}^{4\times2},
\qquad
\boldsymbol{\theta}\in\mathbb{R}^{2}.
$$

Valid, menghasilkan 4 outputs.

---

# 52. Checkpoint 3 — Semantics Audit

Tim mempunyai:

$$
\mathbf{X}
$$

dengan feature order `[quiz ratio, completion ratio]`.

Matrix $\mathbf{W}$ didokumentasikan dengan row order `[completion ratio, quiz ratio]`.

Shapes match.

Apakah product aman digunakan?

**Jawaban:** belum. Alignment semantics salah. Weight rows harus dipetakan ke input feature order yang sama, atau representation harus diubah secara eksplisit.

---

# 53. Checkpoint 4 — Output Interpretation

Jika:

$$
\mathbf{X}\mathbf{W}
$$

menghasilkan matrix $4\times3$, apa yang perlu diketahui sebelum menginterpretasikan column 2?

Jawaban kuat:

- definisi column 2;
- weight semantics;
- input feature schema;
- units/scales;
- task context;
- apakah output raw score, transformed feature, logit-like quantity, probability, atau quantity lain.

Shape saja tidak memberi semantics.

---

# 54. AI Connection — Mengapa Matrix Multiplication Begitu Penting?

Banyak AI systems harus memproses:

- banyak observations;
- banyak features;
- banyak learned or designed combinations;
- banyak output dimensions.

Matrix multiplication menyediakan operasi terstruktur untuk pola tersebut.

Contoh high-level:

$$
\text{batch representations}
\times
\text{weight matrix}
\to
\text{new representations}.
$$

PyTorch `Linear` menerima input dengan last dimension equal to `in_features` dan menghasilkan last dimension `out_features`, menggunakan affine transformation $y=xA^{\top}+b$. [R4]

Itu adalah direct practical connection ke shape literacy yang sedang kita bangun.

Tetapi:

> mengetahui matrix multiplication belum berarti kita sudah memahami neural networks secara penuh.

Masih ada:

- nonlinear activation;
- loss;
- gradient;
- optimization;
- architecture;
- evaluation;
- training dynamics.

Semua itu berada di later modules.

---

# 55. Why This Matters for Modern AI Representations

Representations seperti embeddings sering mempunyai banyak dimensions.

Transformation matrices dapat:

- mengubah dimension representation;
- membuat weighted combinations;
- menghasilkan new feature spaces;
- menyiapkan quantities untuk tahap computation berikutnya.

Tetapi Topic 08 tidak masuk ke advanced tensor algebra atau transformer architecture.

Kita hanya membangun mathematical mechanism yang akan muncul kembali di sana.

---

# 56. Production Safety — Matrix Multiplication Tidak Menghapus Data-Quality Problem

Misalkan satu feature column salah scale, mislabeled, atau contaminated oleh leakage.

Matrix multiplication tetap dapat berjalan sempurna.

Itu justru berbahaya karena calculation error tidak muncul.

Maka sebelum multiplication, tetap perlu memastikan:

- feature semantics;
- order;
- units;
- missing-value policy;
- temporal validity;
- target leakage safety;
- shape.

Linear Algebra adalah computation language, bukan automatic guarantee of valid modeling.

---

# 57. Mastery Check

Sebelum menutup Submodule 02, pastikan kamu dapat mengatakan:

- [ ] **I can** menjumlahkan matrices dengan shape yang sama.
- [ ] **I can** mengurangkan matrices dengan shape yang sama.
- [ ] **I can** melakukan scalar multiplication pada matrix.
- [ ] **I can** membedakan scalar, elementwise, dan matrix multiplication.
- [ ] **I can** mengecek inner dimensions sebelum matrix multiplication.
- [ ] **I can** menentukan output shape dari matrix product.
- [ ] **I can** menghitung matrix-vector multiplication langkah demi langkah.
- [ ] **I can** membaca $\mathbf{A}\mathbf{x}$ sebagai repeated row dot products.
- [ ] **I can** membaca $\mathbf{A}\mathbf{x}$ sebagai weighted combination of columns.
- [ ] **I can** menghitung satu entry $C_{ij}$ dari row-column rule.
- [ ] **I can** menghitung small matrix-matrix product.
- [ ] **I can** menjelaskan mengapa $\mathbf{A}\mathbf{B}\neq\mathbf{B}\mathbf{A}$ secara umum.
- [ ] **I can** menjelaskan identity matrix pada level dasar.
- [ ] **I can** membaca $\mathbf{X}\boldsymbol{\theta}$ sebagai batch weighted scoring.
- [ ] **I can** menjelaskan $\mathbf{X}\mathbf{W}$ sebagai mapping input features ke output features.
- [ ] **I can** menjaga feature-order semantics pada weight matrix.
- [ ] **I can** membedakan raw dot-score matrix dari cosine similarity matrix.
- [ ] **I can** menjelaskan mengapa matrix output tidak otomatis probability.
- [ ] **I can** menjelaskan hubungan matrix multiplication dengan linear layer tanpa mengklaim sudah memahami training.
- [ ] **I can** menjelaskan mengapa shape correctness belum menjamin semantic correctness.

Jika lima atau lebih belum yakin, ulangi:

- Shape Contract;
- Row-Column Rule;
- HerAI $\mathbf{X}\boldsymbol{\theta}$ example;
- Matrix-Matrix Worked Example;
- Order Matters;
- Misconception Challenges.

---

# 58. Integrated Submodule 02 Concept Map

Perjalanan kita sekarang lengkap:

**scalar**  
$\downarrow$  
**multiple meaningful features**  
$\downarrow$  
**vector**  
$\downarrow$  
**components + dimension + feature order**  
$\downarrow$  
**vector operations**  
$\downarrow$  
**norm**  
$\downarrow$  
**distance**  
$\downarrow$  
**dot product**  
$\downarrow$  
**cosine similarity**  
$\downarrow$  
**matrix**  
$\downarrow$  
**matrix operations**  
$\downarrow$  
**matrix-vector / matrix-matrix multiplication**  
$\downarrow$  
**structured transformations used throughout AI**

---

# 59. What We Deliberately Did Not Cover

Submodule 02 sengaja tidak membuat semua Linear Algebra masuk sekaligus.

Tetap deferred:

- determinant-heavy computation;
- matrix inverse procedures;
- Gaussian elimination formal course;
- rank theorem;
- vector spaces abstract;
- basis/change of basis formal;
- eigenvalues/eigenvectors detail;
- diagonalization;
- PCA;
- SVD;
- tensor algebra mendalam;
- proofs formal.

Bukan karena concepts tersebut tidak penting.

Tetapi dependency dan cognitive load harus sehat.

---

# 60. Summary

Topic 08 menyatukan seluruh Linear Algebra foundation Submodule 02.

Kita belajar bahwa:

1. matrix addition/subtraction bekerja entry-wise dan membutuhkan same shape;
2. scalar multiplication mengalikan seluruh entries;
3. matrix multiplication berbeda dari elementwise multiplication;
4. matrix-vector multiplication dapat dibaca sebagai repeated dot products;
5. jika $\mathbf{A}\in\mathbb{R}^{m\times n}$ dan $\mathbf{x}\in\mathbb{R}^{n}$, maka $\mathbf{A}\mathbf{x}\in\mathbb{R}^{m}$;
6. jika $\mathbf{A}\in\mathbb{R}^{m\times n}$ dan $\mathbf{B}\in\mathbb{R}^{n\times p}$, maka $\mathbf{A}\mathbf{B}\in\mathbb{R}^{m\times p}$;
7. each product entry adalah row-column dot product;
8. matrix multiplication umumnya tidak commutative;
9. matrix dapat bertindak sebagai transformation;
10. batch AI computation sering mempunyai pola input matrix × weights → output representations;
11. $\mathbf{X}\boldsymbol{\theta}$ mengembalikan exact toy scores HerAI yang sudah kita miliki;
12. shape correctness tidak menjamin semantic correctness;
13. matrix output bukan otomatis probability;
14. representation semantics tetap menjadi guardrail utama.

---

# 61. Bridge ke Submodule 03 — Statistics for AI

Sekarang kita mempunyai dataset matrix:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80&0.75\\
0.60&0.625\\
0.90&1.00\\
0.70&0.50
\end{bmatrix}.
$$

Linear Algebra menjawab banyak pertanyaan tentang:

- representation;
- geometry;
- similarity;
- structured transformations.

Tetapi kita belum menjawab pertanyaan seperti:

> Secara keseluruhan, bagaimana pola quiz ratio peserta?

> Berapa typical value-nya?

> Seberapa besar variasinya?

> Apakah ada observation yang jauh dari pola umum?

> Bagaimana dua features berubah bersama pada sekumpulan observations?

Pertanyaan-pertanyaan tersebut membawa kita ke:

# Submodule 03 — Statistics for AI: Membaca Pola dan Variasi Data

Di sana, matrix $\mathbf{X}$ yang sudah kita bangun tidak dibuang.

Ia menjadi dataset yang akan kita baca secara statistik.

---

# 62. References

## [R1] MIT OpenCourseWare — 18.06 Linear Algebra, Multiplication and Inverse Matrices

Mendukung: matrix multiplication sebagai operasi fundamental dan multiple viewpoints terhadap product.

https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/ax-b-and-the-four-subspaces/multiplication-and-inverse-matrices/

## [R2] MIT OpenCourseWare — 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning, Lecture 1

Mendukung: matrix-vector multiplication $A\mathbf{x}$, column-combination interpretation, dan shape reasoning.

https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/resources/lecture-1-the-column-space-of-a-contains-all-vectors-ax/

## [R3] NumPy — `numpy.matmul`

Mendukung: conventional matrix-product semantics dan shape signature $(n,k),(k,m)\to(n,m)$; distinction dari scalar/other multiplication behavior pada implementation context.

https://numpy.org/doc/stable/reference/generated/numpy.matmul

## [R4] PyTorch — `torch.nn.Linear`

Mendukung: AI connection bahwa linear layer menerapkan affine transformation $y=xA^{\top}+b$ dan memetakan `in_features` ke `out_features`.

https://docs.pytorch.org/docs/main/generated/torch.nn.Linear.html

## [R5] Stanford — Boyd & Vandenberghe, Introduction to Applied Linear Algebra: Vectors, Matrices, and Least Squares

Mendukung: applied vector/matrix notation, matrix-vector products, linear functions, dan transformation interpretation.

https://web.stanford.edu/~boyd/vmls/

---

# 63. QA Notes

## Academic QA

- Matrix addition/subtraction tidak dicampur dengan matrix multiplication.
- Matrix multiplication tidak disebut elementwise multiplication.
- Shape compatibility dijelaskan melalui inner dimensions.
- Output shape dijelaskan melalui outer dimensions.
- Row-column rule digunakan secara konsisten.
- Matrix multiplication tidak disebut commutative.
- Matrix-vector multiplication dihubungkan ke dot product tanpa menyamakan seluruh concepts.
- Matrix transformation framing digunakan pada level beginner-safe.
- Linear vs affine diberi distinction secukupnya tanpa membuka formal theory terlalu jauh.
- Feature-order semantics tetap dijaga.
- Same shape/compatible shape tidak diperlakukan sebagai sufficient semantic validity.
- Toy scores tidak disebut probability.
- Dot score matrix tidak disebut cosine similarity.
- No gradient, backpropagation, optimizer, PCA, SVD, eigen decomposition, atau inverse procedure.

## Running Case QA

Persistent participants tetap:

- Alya;
- Bima;
- Citra;
- Dewi.

Persistent features tetap:

- quiz ratio $q$;
- completion ratio $c$.

Batch computation menghasilkan:

$$
\begin{bmatrix}
0.78\\
0.61\\
0.94\\
0.62
\end{bmatrix}
$$

sesuai Topic 05.

## Markdown + LaTeX QA

- canonical source Markdown + LaTeX;
- inline math memakai `$...$`;
- display math memakai `$$...$$`;
- no equation images;
- formulas tidak ditempatkan dalam fenced code block;
- environments menggunakan KaTeX-safe basic syntax seperti `bmatrix`;
- browser-level KaTeX rendering belum diklaim sampai actual frontend test.

---

# 64. STOP Gate

Topic 08 menutup **materi inti Submodule 02**, tetapi **final combined assessment Submodule 02 belum dianggap selesai hanya karena Topic 08 selesai**.

Sesuai workflow, setelah Topic 08 disetujui barulah package final Submodule 02 dapat digabung/audit secara keseluruhan bila diminta.

> **Apakah Topic 08 Submodule 02 disetujui dan kita boleh melanjutkan ke final consolidation/assessment Submodule 02 sebelum masuk Submodule 03?**
