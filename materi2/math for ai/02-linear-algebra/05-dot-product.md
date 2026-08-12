# Topic 05 — Dot Product: Menggabungkan Dua Vektor Secara Matematis

> **Submodul 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks**  
> **Filename:** `05-dot-product.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 95–120 menit membaca + 45–60 menit eksplorasi/praktik  
> **Prerequisite:** Topic 01–04 — scalar→vector, components/dimension/shape/feature order, vector operations, L2 norm, dan Euclidean distance  
> **Forward dependency:** Topic 06 — Cosine Similarity: Membandingkan Arah, Bukan Sekadar Besar  
> **Boundary:** Topic ini mengajarkan dot product secara algebraic dan geometric, weighted-sum interpretation, serta AI/ML connection. Topic ini **belum** mengajarkan cosine similarity sebagai metric formal, matrix, matrix multiplication, probability, gradient, atau optimization.

---

# 1. Mengapa Topik Ini Ada?

Pada Topic 04 kita belajar bahwa dua vectors dapat dibandingkan menggunakan **distance**.

Distance menjawab pertanyaan seperti:

> “Seberapa jauh dua representations?”

Tetapi banyak sistem matematika dan AI membutuhkan pertanyaan yang berbeda:

> **“Bagaimana dua vectors berinteraksi component-by-component lalu diringkas menjadi satu scalar?”**

Kita mungkin punya:

- satu vector berisi **features**;
- satu vector lain berisi **weights**;
- atau dua vectors yang ingin dibandingkan melalui suatu compatibility score.

Operasi yang sangat penting untuk kebutuhan tersebut adalah **dot product**.

MIT OpenCourseWare memperkenalkan dot product sebagai operasi yang mengambil sepasang vectors dan menghasilkan sebuah real number, sedangkan materi MIT tentang uses of dot product menghubungkannya dengan lengths dan angles. [R1][R2]

Dalam Machine Learning, weighted sums muncul pada linear models: setiap feature dikalikan weight yang sesuai lalu hasilnya dijumlahkan. [R7]

Dalam recommender systems dan embedding-based retrieval, dot product juga dapat dipakai sebagai similarity/scoring mechanism. Namun Google menekankan bahwa dot product dipengaruhi oleh **vector length**, sehingga score yang besar tidak hanya dipengaruhi directional alignment. [R4][R5][R6]

Karena itu, Topic 05 bukan sekadar:

> “kalikan lalu jumlahkan.”

Kita akan membangun reasoning:

**match components → multiply pairs → sum contributions → scalar → interpret carefully.**

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 05, kamu diharapkan mampu:

1. menjelaskan dot product secara intuitif;
2. menjelaskan bahwa dot product menerima dua vectors dan menghasilkan satu scalar;
3. membaca notation $\mathbf{x}^{\top}\mathbf{y}$;
4. membaca notation $\mathbf{x}\cdot\mathbf{y}$;
5. memahami bahwa dua notation tersebut dapat mewakili dot product pada vectors real dengan orientation yang sesuai;
6. menghitung dot product 2D secara component-by-component;
7. menghitung dot product 3D termasuk negative components;
8. menggunakan summation notation untuk dot product;
9. menjelaskan arti $x_jy_j$ sebagai contribution pasangan component ke-$j$;
10. menjelaskan bahwa vectors harus memiliki jumlah components yang compatible untuk dot product component-wise;
11. menjelaskan bahwa matching index saja belum cukup jika feature semantics/order tidak cocok;
12. membedakan dot product dari elementwise multiplication;
13. membedakan dot product dari vector addition;
14. membedakan dot product dari Euclidean distance;
15. membedakan dot product dari cosine similarity;
16. menjelaskan bahwa dot product dipengaruhi magnitude;
17. menjelaskan hubungan $\mathbf{x}^{\top}\mathbf{x}$ dengan squared L2 norm;
18. menjelaskan geometric identity antara dot product, norms, dan angle untuk nonzero vectors;
19. menjelaskan sign dot product secara geometric untuk nonzero vectors;
20. mengenali orthogonality melalui zero dot product;
21. menjelaskan exception bahwa zero vector menghasilkan dot product zero tetapi tidak memiliki angle yang dapat dipakai seperti vector nonzero;
22. menggunakan dot product sebagai weighted sum;
23. menulis toy HerAI function sebagai dot product antara weight vector dan participant feature vector;
24. menghitung toy HerAI score Alya, Bima, Citra, dan Dewi melalui dot product;
25. mempertahankan warning bahwa toy score bukan probability dan bukan production recommendation model;
26. menjelaskan perbedaan participant-participant dot product dengan weight-feature dot product;
27. memprediksi pengaruh scaling salah satu vector terhadap dot product;
28. menjelaskan mengapa vector dengan norm lebih besar dapat menghasilkan dot product lebih besar;
29. menjelaskan mengapa dot product besar tidak otomatis berarti “lebih mirip arah”;
30. menjelaskan mengapa feature order mismatch dapat menghasilkan angka yang mathematically computable tetapi semantically salah;
31. menjelaskan AI/ML connection ke linear models;
32. menjelaskan AI/ML connection ke embeddings/recommender candidate scoring;
33. menghindari interpretation dot product sebagai probability, confidence, accuracy, atau causality;
34. memahami mengapa Topic 05 menjadi prerequisite langsung untuk cosine similarity.

---

# 3. Prerequisite Recall — Apa yang Kita Bawa dari Topic 04?

Kita tidak mengulang seluruh Linear Algebra dari awal.

Pegang contract berikut.

## 3.1 Canonical HerAI feature order

Semua participant vectors dua dimensi menggunakan:

1. quiz ratio;
2. completion ratio.

Jadi:

$$
\mathbf{x}
=
\begin{bmatrix}
q\\
c
\end{bmatrix}
$$

bukan sekadar dua angka tanpa nama.

## 3.2 Persistent HerAI vectors

Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Bima:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60\\
0.625
\end{bmatrix}
$$

Citra:

$$
\mathbf{x}^{(3)}
=
\begin{bmatrix}
0.90\\
1.00
\end{bmatrix}
$$

Dewi:

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70\\
0.50
\end{bmatrix}
$$

## 3.3 Kita sudah memahami norm

$$
\|\mathbf{x}\|_2
=
\sqrt{
\sum_{j=1}^{d}x_j^2
}
$$

Norm menghasilkan **scalar nonnegative**.

## 3.4 Kita sudah memahami distance

$$
d(\mathbf{x},\mathbf{y})
=
\|\mathbf{x}-\mathbf{y}\|_2
$$

Distance menjawab separation, bukan weighted interaction.

## 3.5 Topic 05 akan memakai multiplication + summation

Submodule 01 sudah menyiapkan kita membaca:

$$
\sum_{j=1}^{d}
$$

Sekarang summation tersebut akan digunakan pada operasi vector yang sangat penting.

---

# 4. Pertanyaan Pemantik — Bagaimana Dua Vektor Menghasilkan Satu Score?

Bayangkan HerAI masih menggunakan toy instructional rule:

$$
h(q,c)=0.6q+0.4c
$$

Untuk Alya:

$$
q=0.80
$$

dan:

$$
c=0.75
$$

Kita sudah tahu:

$$
h(0.80,0.75)=0.78
$$

Sekarang lihat pola yang tersembunyi.

Ada feature vector:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

dan weight vector:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}
$$

Pertanyaannya:

> **Apakah ada satu operasi vector yang langsung melakukan “pasangkan weight dengan feature yang sesuai, kalikan, lalu jumlahkan”?**

Ada.

Itulah **dot product**.

---

# 5. Predict Before Calculate

Jangan langsung menghafal formula.

Gunakan intuisi dulu.

## Prediksi A — Output Type

Diberikan dua vectors:

$$
\mathbf{u}
=
\begin{bmatrix}
2\\
3
\end{bmatrix}
,\qquad
\mathbf{v}
=
\begin{bmatrix}
4\\
5
\end{bmatrix}
$$

Menurutmu dot product menghasilkan:

A. vector dua dimensi;  
B. satu scalar;  
C. matrix $2\times2$;  
D. probability.

Simpan jawabanmu.

## Prediksi B — Feature Pairing

Jika vector pertama memakai order:

$$
[q,c]
$$

sedangkan vector kedua sebenarnya memakai order:

$$
[c,q]
$$

apakah kita boleh memasangkan components hanya karena keduanya sama-sama 2D?

Prediksi dulu:

**ya / tidak**.

## Prediksi C — Scale

Jika:

$$
\mathbf{u}^{\top}\mathbf{v}=6
$$

lalu $\mathbf{u}$ dikalikan $3$, menurutmu dot product baru:

- tetap $6$;
- menjadi $2$;
- menjadi $18$;
- tidak dapat diprediksi.

## Prediksi D — Dot Product dan Similarity

Jika dua participant vectors memiliki dot product lebih besar, apakah itu otomatis berarti arah kedua vectors lebih mirip?

**Jangan jawab terlalu cepat.**

Topic ini akan menunjukkan mengapa magnitude ikut berperan.

---

# 6. Intuisi — Pair, Multiply, Sum

Dot product dapat dipahami melalui tiga langkah.

Misalkan:

$$
\mathbf{u}
=
\begin{bmatrix}
2\\
3
\end{bmatrix}
$$

dan:

$$
\mathbf{v}
=
\begin{bmatrix}
4\\
5
\end{bmatrix}
$$

### Langkah 1 — Pair components yang posisinya sama

Pasangan pertama:

$$
2 \leftrightarrow 4
$$

Pasangan kedua:

$$
3 \leftrightarrow 5
$$

### Langkah 2 — Multiply setiap pasangan

$$
2(4)=8
$$

$$
3(5)=15
$$

### Langkah 3 — Sum contributions

$$
8+15=23
$$

Jadi dot product:

$$
23
$$

Perhatikan perubahan object type:

**dua vectors masuk → satu scalar keluar.**

---

# 7. Concrete Example — Contribution per Component

Kita tulis contributions sebagai tabel.

| Component | $\mathbf{u}$ | $\mathbf{v}$ | Product contribution |
|---|---:|---:|---:|
| 1 | $2$ | $4$ | $8$ |
| 2 | $3$ | $5$ | $15$ |

Total:

$$
8+15=23
$$

Ini membantu membangun intuition penting:

> **Dot product menggabungkan pairwise component interactions menjadi satu scalar aggregate.**

Tetapi “interaction” di sini adalah mathematical operation.

Makna aplikasi tetap bergantung pada:

- apa arti vector pertama;
- apa arti vector kedua;
- apa arti setiap component;
- apakah component order compatible;
- untuk task apa scalar tersebut digunakan.

---

# 8. Definisi Formal — Dot Product

Untuk vectors real berdimensi sama:

$$
\mathbf{x}
=
\begin{bmatrix}
x_1\\
x_2\\
\vdots\\
x_d
\end{bmatrix}
$$

dan:

$$
\mathbf{y}
=
\begin{bmatrix}
y_1\\
y_2\\
\vdots\\
y_d
\end{bmatrix}
$$

dot product didefinisikan sebagai:

$$
\mathbf{x}^{\top}\mathbf{y}
=
\sum_{j=1}^{d}x_jy_j
$$

atau secara expanded:

$$
\mathbf{x}^{\top}\mathbf{y}
=
x_1y_1+x_2y_2+\cdots+x_dy_d
$$

MIT OpenCourseWare memperlakukan dot product sebagai operasi dari sepasang vectors ke sebuah real number. [R1]

---

# 9. Notasi — Tidak Ada Simbol Tanpa Definisi

## 9.1 $\mathbf{x}$

Bold lowercase menunjukkan **vector**.

## 9.2 $\mathbf{y}$

Vector kedua.

## 9.3 $d$

Jumlah components atau dimension vector dalam formula tersebut.

## 9.4 $x_j$

Component ke-$j$ dari $\mathbf{x}$.

## 9.5 $y_j$

Component ke-$j$ dari $\mathbf{y}$.

## 9.6 $x_jy_j$

Product dari pair components pada index yang sama.

## 9.7 $\sum_{j=1}^{d}$

Jumlahkan contributions dari component pertama sampai component ke-$d$.

## 9.8 $\mathbf{x}^{\top}$

Transpose dari $\mathbf{x}$.

Dalam Topic 05, transpose terutama membantu menuliskan column vector menjadi orientation yang memungkinkan row-by-column multiplication interpretation.

## 9.9 $\mathbf{x}^{\top}\mathbf{y}$

Dot product antara $\mathbf{x}$ dan $\mathbf{y}$.

Hasilnya scalar.

---

# 10. Dua Notasi Dot Product

Kita dapat menjumpai:

$$
\mathbf{x}^{\top}\mathbf{y}
$$

atau:

$$
\mathbf{x}\cdot\mathbf{y}
$$

Pada konteks vectors real yang sedang kita gunakan, keduanya dapat merepresentasikan dot product yang sama.

Untuk course ini:

> **canonical notation utama adalah $\mathbf{x}^{\top}\mathbf{y}$**, karena notation tersebut akan menyambung lebih mulus ke matrix multiplication.

Notation:

$$
\mathbf{x}\cdot\mathbf{y}
$$

tetap dikenalkan agar peserta dapat membaca textbook atau dokumentasi yang menggunakannya.

---

# 11. Math Reading Skill — Cara Membaca Formula Dot Product

Formula:

$$
\mathbf{x}^{\top}\mathbf{y}
=
\sum_{j=1}^{d}x_jy_j
$$

Bacaan natural-language:

> “Dot product vector x dan vector y diperoleh dengan mengalikan components yang memiliki index sama, lalu menjumlahkan semua hasil perkalian tersebut dari component pertama sampai component ke-d.”

Jangan membaca formula hanya sebagai simbol.

Tanyakan:

1. object apa yang masuk?
2. bagaimana components dipasangkan?
3. operasi apa yang dilakukan per pasangan?
4. apa yang di-aggregate?
5. object type apa yang keluar?

Jawabannya:

**vector + vector → pairwise multiplication → summation → scalar.**

---

# 12. Output Contract — Dot Product Menghasilkan Scalar

Jika:

$$
\mathbf{x},\mathbf{y}\in\mathbb{R}^{d}
$$

maka:

$$
\mathbf{x}^{\top}\mathbf{y}\in\mathbb{R}
$$

Artinya:

- input: dua vectors;
- output: satu real scalar.

Ini berbeda dari:

$$
\mathbf{x}+\mathbf{y}
$$

yang menghasilkan vector.

Juga berbeda dari elementwise multiplication yang, jika didefinisikan, menghasilkan vector berisi products per component.

---

# 13. Compatibility — Sama Dimension Belum Cukup Secara Semantik

Secara arithmetic, vectors:

$$
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

dan:

$$
\begin{bmatrix}
0.60\\
0.625
\end{bmatrix}
$$

sama-sama punya dua components.

Tetapi HerAI contract juga membutuhkan feature order:

1. quiz ratio;
2. completion ratio.

Misalkan sebuah vector lain ditulis:

$$
\begin{bmatrix}
0.625\\
0.60
\end{bmatrix}
$$

tetapi sebenarnya mempunyai schema:

1. completion ratio;
2. quiz ratio.

Kalau kita diam-diam memperlakukannya sebagai:

1. quiz;
2. completion;

maka multiplication pairing menjadi salah secara semantics.

> **Compatible dimension adalah syarat mathematical structure. Compatible schema adalah syarat interpretation.**

---

# 14. Worked Example 1 — Dot Product 2D

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
2\\
3
\end{bmatrix}
$$

dan:

$$
\mathbf{v}
=
\begin{bmatrix}
4\\
5
\end{bmatrix}
$$

Hitung:

$$
\mathbf{u}^{\top}\mathbf{v}
$$

## Step 1 — Tulis expanded form

$$
\mathbf{u}^{\top}\mathbf{v}
=
u_1v_1+u_2v_2
$$

## Step 2 — Substitute values

$$
=
(2)(4)+(3)(5)
$$

## Step 3 — Multiply each pair

$$
=
8+15
$$

## Step 4 — Sum

$$
=
23
$$

## Result

$$
\boxed{23}
$$

## Interpretation

Hasil $23$ adalah **scalar dot product**.

Ia bukan:

- vector;
- distance;
- probability;
- cosine similarity.

---

# 15. Worked Example 2 — Negative Components

Diberikan:

$$
\mathbf{a}
=
\begin{bmatrix}
3\\
-2\\
4
\end{bmatrix}
$$

dan:

$$
\mathbf{b}
=
\begin{bmatrix}
1\\
5\\
-1
\end{bmatrix}
$$

Hitung:

$$
\mathbf{a}^{\top}\mathbf{b}
$$

## Step 1 — Pair components

$$
(3,1),\qquad(-2,5),\qquad(4,-1)
$$

## Step 2 — Multiply

$$
(3)(1)=3
$$

$$
(-2)(5)=-10
$$

$$
(4)(-1)=-4
$$

## Step 3 — Sum

$$
3+(-10)+(-4)
$$

$$
=3-10-4
$$

$$
=-11
$$

## Result

$$
\boxed{-11}
$$

## Interpretation

Dot product dapat:

- positive;
- zero;
- negative.

Jadi dot product **tidak** memiliki nonnegative-only property seperti norm.

---

# 16. Common Misconception — “Dot Product Harus Positive”

Salah.

Contoh sebelumnya memberi:

$$
-11
$$

Negative result dapat terjadi ketika signed component interactions secara aggregate menghasilkan negative scalar.

Pada geometric interpretation untuk **nonzero vectors**, sign juga terkait dengan angle:

- positive dot product → acute angle;
- zero dot product → right angle;
- negative dot product → obtuse angle.

Kita akan membangun hubungan ini dengan hati-hati.

---

# 17. Properties Dasar Dot Product

Untuk vectors real compatible $\mathbf{x},\mathbf{y},\mathbf{z}$ dan scalar $a$:

## 17.1 Symmetry

$$
\mathbf{x}^{\top}\mathbf{y}
=
\mathbf{y}^{\top}\mathbf{x}
$$

Mengapa?

Karena ordinary scalar multiplication commutative:

$$
x_jy_j=y_jx_j
$$

untuk setiap component.

## 17.2 Distributive over addition

$$
\mathbf{x}^{\top}(\mathbf{y}+\mathbf{z})
=
\mathbf{x}^{\top}\mathbf{y}
+
\mathbf{x}^{\top}\mathbf{z}
$$

## 17.3 Scalar compatibility

$$
(a\mathbf{x})^{\top}\mathbf{y}
=
a(\mathbf{x}^{\top}\mathbf{y})
$$

## 17.4 Self dot product is nonnegative

$$
\mathbf{x}^{\top}\mathbf{x}
=
x_1^2+x_2^2+\cdots+x_d^2
\ge 0
$$

## 17.5 Self dot product zero only for zero vector

Dalam Euclidean real-vector setting:

$$
\mathbf{x}^{\top}\mathbf{x}=0
$$

hanya jika:

$$
\mathbf{x}=\mathbf{0}
$$

---

# 18. Hubungan Dot Product dengan Norm

Dari Topic 04:

$$
\|\mathbf{x}\|_2
=
\sqrt{
x_1^2+x_2^2+\cdots+x_d^2
}
$$

Square kedua sisi:

$$
\|\mathbf{x}\|_2^2
=
x_1^2+x_2^2+\cdots+x_d^2
$$

Tetapi:

$$
\mathbf{x}^{\top}\mathbf{x}
=
x_1^2+x_2^2+\cdots+x_d^2
$$

Maka:

$$
\boxed{
\mathbf{x}^{\top}\mathbf{x}
=
\|\mathbf{x}\|_2^2
}
$$

Ini adalah connection penting.

> **Self dot product = squared L2 norm.**

---

# 19. Worked Example 3 — Self Dot Product

Diberikan:

$$
\mathbf{v}
=
\begin{bmatrix}
3\\
4
\end{bmatrix}
$$

Self dot product:

$$
\mathbf{v}^{\top}\mathbf{v}
=
(3)(3)+(4)(4)
$$

$$
=9+16
$$

$$
=25
$$

Norm:

$$
\|\mathbf{v}\|_2
=
\sqrt{3^2+4^2}
$$

$$
=5
$$

Squared norm:

$$
\|\mathbf{v}\|_2^2
=
25
$$

Jadi:

$$
\mathbf{v}^{\top}\mathbf{v}
=
\|\mathbf{v}\|_2^2
=
25
$$

---

# 20. Geometric Interpretation — Magnitude dan Alignment

Untuk **nonzero** real vectors $\mathbf{x}$ dan $\mathbf{y}$, dot product memiliki hubungan geometric:

$$
\mathbf{x}^{\top}\mathbf{y}
=
\|\mathbf{x}\|_2
\|\mathbf{y}\|_2
\cos(\theta)
$$

di mana:

- $\|\mathbf{x}\|_2$ = magnitude vector $\mathbf{x}$;
- $\|\mathbf{y}\|_2$ = magnitude vector $\mathbf{y}$;
- $\theta$ = angle antara vectors;
- $\cos(\theta)$ = cosine dari angle tersebut.

MIT membahas dot product bersama lengths dan angles. [R2]

Perhatikan tiga faktor:

1. magnitude $\mathbf{x}$;
2. magnitude $\mathbf{y}$;
3. directional alignment melalui $\cos(\theta)$.

Ini menjelaskan kenapa dot product besar **tidak hanya** berarti directions mirip.

Magnitude ikut memengaruhi hasil.

---

# 21. Safety Condition — Angle Interpretation Membutuhkan Nonzero Vectors

Jika:

$$
\mathbf{x}=\mathbf{0}
$$

maka:

$$
\mathbf{x}^{\top}\mathbf{y}=0
$$

untuk vector $\mathbf{y}$ apa pun.

Tetapi kita tidak boleh berkata:

> “Karena dot product zero, angle-nya pasti $90^\circ$.”

Angle dengan zero vector tidak memiliki directional interpretation biasa karena zero vector tidak memiliki direction.

Jadi statement yang lebih aman:

> Jika **dua vectors nonzero** dan dot product mereka zero, maka mereka orthogonal.

---

# 22. Orthogonality

Dua nonzero vectors disebut **orthogonal** jika:

$$
\mathbf{x}^{\top}\mathbf{y}=0
$$

Contoh:

$$
\mathbf{u}
=
\begin{bmatrix}
1\\
0
\end{bmatrix}
,\qquad
\mathbf{v}
=
\begin{bmatrix}
0\\
1
\end{bmatrix}
$$

Dot product:

$$
(1)(0)+(0)(1)
$$

$$
=0
$$

Secara geometry, kedua directions membentuk right angle.

---

# 23. Positive, Zero, Negative — Beginner Geometric Reading

Untuk **nonzero vectors**:

## Positive

Jika:

$$
\mathbf{x}^{\top}\mathbf{y}>0
$$

maka angle antara keduanya acute:

$$
0^\circ\le\theta<90^\circ
$$

## Zero

Jika:

$$
\mathbf{x}^{\top}\mathbf{y}=0
$$

maka vectors orthogonal:

$$
\theta=90^\circ
$$

## Negative

Jika:

$$
\mathbf{x}^{\top}\mathbf{y}<0
$$

maka angle obtuse:

$$
90^\circ<\theta\le180^\circ
$$

Topic ini tidak membutuhkan kita menghitung angle dengan inverse cosine.

Fokusnya membaca relationship.

---

# 24. Dot Product ≠ Elementwise Multiplication

Misalkan:

$$
\mathbf{u}
=
\begin{bmatrix}
2\\
3
\end{bmatrix}
,\qquad
\mathbf{v}
=
\begin{bmatrix}
4\\
5
\end{bmatrix}
$$

Pairwise products:

$$
\begin{bmatrix}
8\\
15
\end{bmatrix}
$$

adalah **vector of componentwise products** jika operasi elementwise memang didefinisikan.

Dot product melakukan satu langkah tambahan:

$$
8+15=23
$$

sehingga hasil akhir:

$$
23
$$

adalah scalar.

> **Elementwise multiplication menyimpan pairwise products. Dot product menjumlahkan pairwise products menjadi scalar.**

---

# 25. Dot Product ≠ Distance

Euclidean distance:

$$
d(\mathbf{x},\mathbf{y})
=
\|\mathbf{x}-\mathbf{y}\|_2
$$

mengukur separation.

Dot product:

$$
\mathbf{x}^{\top}\mathbf{y}
$$

menggabungkan matched components melalui multiply-and-sum.

Mereka menjawab pertanyaan berbeda.

Distance kecil dan dot product besar dapat sama-sama muncul dalam similarity systems, tetapi interpretation dan behavior metric-nya berbeda. Google menunjukkan bahwa Euclidean distance, cosine, dan dot product dapat menghasilkan ranking yang berbeda ketika vector magnitudes berbeda. [R5][R6]

---

# 26. Dot Product ≠ Cosine Similarity

Ini adalah boundary paling penting sebelum Topic 06.

Dot product:

$$
\mathbf{x}^{\top}\mathbf{y}
$$

masih dipengaruhi:

- magnitude $\mathbf{x}$;
- magnitude $\mathbf{y}$;
- angle/alignment.

Cosine similarity akan menggunakan normalization oleh vector norms sehingga fokusnya berbeda.

**Topic 05 belum mendefinisikan formula cosine similarity secara formal.**

Yang perlu kamu pegang sekarang:

> **Dot product dan cosine similarity bukan operasi yang sama.**

---

# 27. HerAI Running Case — Weight Vector

Kita kembali ke toy instructional rule:

$$
h(q,c)=0.6q+0.4c
$$

Definisikan weight vector:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}
$$

Feature order weight vector harus sama dengan participant vector:

1. quiz ratio;
2. completion ratio.

Jadi:

- $\theta_1=0.60$ terkait quiz ratio;
- $\theta_2=0.40$ terkait completion ratio.

Ini bukan sekadar dua weights tanpa labels.

---

# 28. HerAI — Menulis Toy Function sebagai Dot Product

Participant vector:

$$
\mathbf{x}
=
\begin{bmatrix}
q\\
c
\end{bmatrix}
$$

Weight vector:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}
$$

Dot product:

$$
\boldsymbol{\theta}^{\top}\mathbf{x}
=
(0.60)q+(0.40)c
$$

Karena:

$$
h(q,c)=0.6q+0.4c
$$

kita dapat menulis:

$$
\boxed{
h(q,c)
=
\boldsymbol{\theta}^{\top}\mathbf{x}
}
$$

untuk representation dan weight schema yang sudah didefinisikan.

Ini menunjukkan bahwa formula scalar dari Submodule 01 ternyata dapat dibaca sebagai operasi Linear Algebra.

---

# 29. Worked Example 4 — Alya sebagai Weighted Dot Product

Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Weight vector:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}
$$

Hitung:

$$
\boldsymbol{\theta}^{\top}\mathbf{x}^{(1)}
$$

## Step 1 — Pair weights dan features

Quiz:

$$
0.60\leftrightarrow0.80
$$

Completion:

$$
0.40\leftrightarrow0.75
$$

## Step 2 — Multiply

$$
(0.60)(0.80)=0.48
$$

$$
(0.40)(0.75)=0.30
$$

## Step 3 — Sum

$$
0.48+0.30=0.78
$$

## Result

$$
\boxed{0.78}
$$

Sama dengan output toy function sebelumnya.

## Interpretation

Nilai $0.78$ adalah:

> **toy instructional weighted score di bawah rule yang sudah didefinisikan.**

Nilai tersebut bukan otomatis:

- $78\%$ probability keberhasilan;
- model confidence;
- accuracy;
- production recommendation score;
- evidence of causality.

---

# 30. HerAI — Semua Participants melalui Dot Product

Weight vector tetap:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}
$$

## Alya

$$
(0.60)(0.80)+(0.40)(0.75)
=
0.48+0.30
=
0.78
$$

## Bima

$$
(0.60)(0.60)+(0.40)(0.625)
$$

$$
=
0.36+0.25
$$

$$
=
0.61
$$

## Citra

$$
(0.60)(0.90)+(0.40)(1.00)
$$

$$
=
0.54+0.40
$$

$$
=
0.94
$$

## Dewi

$$
(0.60)(0.70)+(0.40)(0.50)
$$

$$
=
0.42+0.20
$$

$$
=
0.62
$$

Ringkas:

| Participant | $\boldsymbol{\theta}^{\top}\mathbf{x}^{(i)}$ |
|---|---:|
| Alya | $0.78$ |
| Bima | $0.61$ |
| Citra | $0.94$ |
| Dewi | $0.62$ |

Nilai-nilai ini exactly mempertahankan toy function yang sudah digunakan sejak Submodule 01.

---

# 31. Kenapa Dot Product Cocok untuk Weighted Sum?

Perhatikan formula:

$$
\boldsymbol{\theta}^{\top}\mathbf{x}
=
\theta_1x_1+\theta_2x_2+\cdots+\theta_dx_d
$$

Setiap feature:

1. dipasangkan dengan weight yang sesuai;
2. dikalikan;
3. contributions dijumlahkan.

Itulah struktur weighted sum.

Google Machine Learning Crash Course menjelaskan linear models dengan bentuk multi-feature:

$$
\hat y
=
b+w_1x_1+w_2x_2+\cdots+w_dx_d
$$

di mana setiap feature memiliki weight sendiri. [R7]

Secara Linear Algebra, weighted part tersebut dapat ditulis compact sebagai dot product.

---

# 32. AI/ML Connection 1 — Linear Model

Sebuah generic linear model dapat ditulis:

$$
\hat y
=
b+\boldsymbol{\theta}^{\top}\mathbf{x}
$$

di mana:

- $\mathbf{x}$ = feature vector;
- $\boldsymbol{\theta}$ = parameter/weight vector;
- $b$ = bias/intercept scalar;
- $\hat y$ = raw prediction/output sesuai model.

**Important:**

HerAI toy function:

$$
h(q,c)=0.6q+0.4c
$$

tidak tiba-tiba menjadi validated ML model hanya karena kita menuliskannya sebagai dot product.

Mathematical form dan empirical validity adalah dua hal berbeda.

---

# 33. Common Misconception — “Kalau Sudah Pakai Dot Product, Berarti Itu Machine Learning”

Tidak.

Dot product adalah mathematical operation.

Ia dapat digunakan di:

- linear models;
- neural networks;
- embeddings;
- recommender systems;
- geometry;
- physics;
- banyak bidang lain.

Tetapi menggunakan dot product tidak membuktikan bahwa:

- weights dipelajari dari data;
- model telah dilatih;
- model telah divalidasi;
- output adalah prediction yang reliable.

---

# 34. Participant-Participant Dot Product

Kita juga dapat menghitung dot product dua participant feature vectors jika schema sama.

Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Bima:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60\\
0.625
\end{bmatrix}
$$

Dot product:

$$
(\mathbf{x}^{(1)})^{\top}\mathbf{x}^{(2)}
$$

$$
=
(0.80)(0.60)+(0.75)(0.625)
$$

$$
=
0.48+0.46875
$$

$$
=
0.94875
$$

Hasil:

$$
\boxed{0.94875}
$$

Tetapi interpretation berbeda dari:

$$
\boldsymbol{\theta}^{\top}\mathbf{x}^{(1)}
$$

Pada participant-participant dot product, kedua vectors adalah participant representations.

Pada weight-feature dot product, satu vector adalah weights dan satu vector adalah features.

> **Formula serupa tidak menjamin semantics serupa.**

---

# 35. HerAI Pairwise Dot Products

Dengan canonical $q,c$ vectors:

| Pair | Dot product |
|---|---:|
| Alya–Bima | $0.94875$ |
| Alya–Citra | $1.47$ |
| Alya–Dewi | $0.935$ |
| Bima–Citra | $1.165$ |
| Bima–Dewi | $0.7325$ |
| Citra–Dewi | $1.13$ |

Jangan langsung membuat ranking “most similar” dari angka ini tanpa memahami magnitude effect.

Pada current features yang semuanya nonnegative, participant dengan generally larger components juga cenderung dapat menghasilkan dot product besar dengan participant lain.

Itulah alasan Topic 06 diperlukan.

---

# 36. Magnitude Sensitivity — Eksperimen Sederhana

Misalkan:

$$
\mathbf{u}
=
\begin{bmatrix}
1\\
2
\end{bmatrix}
$$

dan:

$$
\mathbf{v}
=
\begin{bmatrix}
3\\
4
\end{bmatrix}
$$

Dot product:

$$
\mathbf{u}^{\top}\mathbf{v}
=
(1)(3)+(2)(4)
$$

$$
=3+8
$$

$$
=11
$$

Sekarang scale $\mathbf{u}$ menjadi:

$$
2\mathbf{u}
=
\begin{bmatrix}
2\\
4
\end{bmatrix}
$$

Dot product baru:

$$
(2\mathbf{u})^{\top}\mathbf{v}
=
(2)(3)+(4)(4)
$$

$$
=6+16
$$

$$
=22
$$

Jadi:

$$
(2\mathbf{u})^{\top}\mathbf{v}
=
2(\mathbf{u}^{\top}\mathbf{v})
$$

Direction $\mathbf{u}$ tidak berubah ketika dikalikan positive scalar $2$, tetapi dot product doubled.

Ini bukti konkret bahwa raw dot product tidak hanya membaca direction.

---

# 37. Why Magnitude Matters in Embedding Similarity

Google menjelaskan bahwa dot-product similarity pada embeddings dipengaruhi oleh vector length; item dengan embedding norm besar dapat memperoleh score lebih besar. [R5][R6]

Dalam recommendation systems, behavior tersebut kadang desirable jika magnitude membawa signal yang memang ingin dipertahankan.

Tetapi kadang magnitude mencerminkan faktor seperti popularity sehingga dapat mendominasi ranking. [R5][R6]

Karena itu:

> **“lebih besar dot product” bukan universal synonym dari “lebih mirip secara direction.”**

Metric choice harus sesuai task.

---

# 38. AI/ML Connection 2 — Content-Based Recommendation

Google memberikan contoh content-based filtering di mana user embedding dan item embedding dibandingkan menggunakan dot product. [R4]

Jika components binary merepresentasikan active features, maka product:

$$
x_jy_j
$$

bernilai $1$ ketika feature ke-$j$ aktif pada kedua vectors.

Summation kemudian menghitung banyaknya overlap aktif dalam toy representation tersebut.

Ini contoh yang sangat jelas mengapa dot product berguna:

**matching components → contributions → one score.**

Tetapi real recommender systems dapat memakai continuous learned embeddings yang semantics-nya lebih kompleks.

---

# 39. AI/ML Connection 3 — Candidate Generation

Pada candidate-generation systems, query/user embedding dapat dibandingkan dengan banyak item embeddings.

Google mendokumentasikan beberapa choices:

- Euclidean distance;
- cosine;
- dot product.

Ranking yang dihasilkan dapat berbeda karena tiap measure menekankan geometry yang berbeda. [R6]

Jadi sistem designer harus menjawab:

> **“Similarity seperti apa yang sebenarnya kita butuhkan untuk task ini?”**

Bukan:

> “Metric mana yang paling terkenal?”

---

# 40. Feature Order Safety — Weighted Score Bisa Rusak Diam-Diam

Correct schema:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}
=
\begin{bmatrix}
\text{quiz weight}\\
\text{completion weight}
\end{bmatrix}
$$

Correct Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
=
\begin{bmatrix}
\text{quiz ratio}\\
\text{completion ratio}
\end{bmatrix}
$$

Correct score:

$$
0.60(0.80)+0.40(0.75)=0.78
$$

Sekarang suppose feature vector order terbalik tanpa mengubah weights:

$$
\tilde{\mathbf{x}}^{(1)}
=
\begin{bmatrix}
0.75\\
0.80
\end{bmatrix}
$$

Compute:

$$
0.60(0.75)+0.40(0.80)
$$

$$
=0.45+0.32
$$

$$
=0.77
$$

Arithmetic valid.

Semantics salah jika weight vector masih menganggap component pertama adalah quiz.

Ini adalah **silent semantic bug**.

---

# 41. Same Shape ≠ Same Meaning

Dua vectors dapat sama-sama mempunyai shape:

$$
2\times1
$$

tetapi mewakili hal berbeda.

Contoh:

$$
\begin{bmatrix}
q\\
c
\end{bmatrix}
$$

versus:

$$
\begin{bmatrix}
\text{study duration}\\
\text{age}
\end{bmatrix}
$$

Mereka mathematically compatible untuk dot product.

Tetapi tanpa defined task dan semantics, hasilnya bisa tidak meaningful.

> **Shape compatibility is necessary for the arithmetic. Semantic compatibility is necessary for interpretation.**

---

# 42. Unit Safety pada Weighted Dot Product

Misalkan suatu future representation memasukkan:

- quiz ratio;
- completion ratio;
- study duration dalam minutes.

Sekarang weighted score akan mempunyai contribution:

$$
\theta_3 t
$$

dengan:

$$
t=\text{study duration}
$$

Sebelum menggunakan formula, tim harus jelas tentang:

- unit $t$;
- arti $\theta_3$;
- apakah duration di-scale;
- bagaimana weights diperoleh;
- apakah formula tetap meaningful jika minutes diubah ke seconds.

Perubahan unit dapat mengubah numerical contributions jika weight/preprocessing tidak disesuaikan.

Ini bukan alasan untuk menghindari dot product.

Ini alasan untuk menjaga **feature pipeline + weight semantics** secara konsisten.

---

# 43. Change One Thing — Quiz Ratio Alya Naik

Original Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Weight:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}
$$

Original score:

$$
0.78
$$

Sekarang ubah satu component:

$$
q:0.80\rightarrow0.90
$$

Completion tetap:

$$
c=0.75
$$

Prediksi dulu:

> Score naik, turun, atau tetap?

Karena quiz weight positive:

$$
0.60>0
$$

kita prediksi score naik.

Compute:

$$
(0.60)(0.90)+(0.40)(0.75)
$$

$$
=0.54+0.30
$$

$$
=0.84
$$

Perubahan:

$$
0.84-0.78=0.06
$$

Karena quiz berubah:

$$
0.10
$$

dan weight:

$$
0.60
$$

contribution change:

$$
0.60(0.10)=0.06
$$

Ini memperlihatkan bagaimana setiap component contribution bekerja di weighted dot product.

---

# 44. Change One Weight — Completion Weight Naik

Original:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}
$$

Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Suppose hanya untuk sensitivity exploration kita ubah:

$$
\theta_2:0.40\rightarrow0.50
$$

tanpa menyatakan bahwa weights baru valid sebagai model.

Score eksplorasi:

$$
0.60(0.80)+0.50(0.75)
$$

$$
=0.48+0.375
$$

$$
=0.855
$$

Perubahan weight mengubah mathematical rule.

Itu tidak membuktikan bahwa rule baru lebih baik.

Evaluation tetap diperlukan.

---

# 45. Predict → Pair → Multiply → Sum → Interpret

Gunakan workflow ini setiap kali menghadapi dot product.

## Step 1 — Predict

Perkirakan sign atau relative behavior.

## Step 2 — Validate object types

Pastikan kedua input memang vectors.

## Step 3 — Validate dimension/shape compatibility

Pastikan jumlah components compatible.

## Step 4 — Validate feature semantics/order

Pastikan component ke-$j$ berpasangan dengan meaning yang benar.

## Step 5 — Multiply matched components

Hitung:

$$
x_jy_j
$$

## Step 6 — Sum

Aggregate semua contributions.

## Step 7 — Interpret

Tanyakan scalar itu merepresentasikan apa dalam task.

## Step 8 — Restrict the claim

Jangan mengubah score menjadi probability/similarity percentage tanpa definition.

---

# 46. Misconception Challenge 1 — “Dot Product Itu Perkalian Vektor Biasa”

Tidak cukup tepat.

Ada beberapa operations berbeda yang melibatkan multiplication pada vectors.

Dot product secara khusus:

- memasangkan components;
- mengalikan pair;
- menjumlahkan products;
- menghasilkan scalar.

Jangan menganggap semua “vector multiplication” sama.

---

# 47. Misconception Challenge 2 — “Dot Product Sama dengan Cosine Similarity”

Salah.

Dot product sensitif terhadap vector magnitude.

Cosine similarity pada Topic 06 akan memperhitungkan normalization oleh norms agar directional alignment menjadi fokus.

Google secara eksplisit membedakan dot product dan cosine dalam embedding similarity. [R5][R6]

---

# 48. Misconception Challenge 3 — “Dot Product Besar Berarti Probability Besar”

Salah.

Dot product dapat:

- lebih besar dari $1$;
- negative;
- zero;
- tergantung scale/magnitude.

Tidak ada probability semantics kecuali sebuah model/procedure secara eksplisit mendefinisikan transformation dan probabilistic interpretation yang valid.

---

# 49. Misconception Challenge 4 — “Dot Product Zero Selalu Berarti 90 Derajat”

Perlu syarat.

Jika kedua vectors **nonzero**:

$$
\mathbf{x}^{\top}\mathbf{y}=0
$$

berarti orthogonal.

Tetapi zero vector memiliki dot product zero dengan semua vectors dan tidak memiliki ordinary direction untuk angle interpretation.

---

# 50. Misconception Challenge 5 — “Same Dimension Berarti Boleh Dipasangkan”

Secara arithmetic mungkin bisa.

Secara semantics belum tentu.

Harus cocok:

- feature definitions;
- feature order;
- measurement units;
- preprocessing;
- task meaning.

---

# 51. Misconception Challenge 6 — “Weight $0.6$ Membuktikan Quiz Menyebabkan Outcome”

Salah.

Weight adalah coefficient/parameter pada mathematical rule.

Causal claim membutuhkan methodology dan evidence yang jauh lebih kuat.

Submodule 01 sudah memperingatkan:

> coefficient ≠ causal effect.

Linear Algebra tidak menghapus rule tersebut.

---

# 52. Misconception Challenge 7 — “Toy Score $0.78$ Sekarang Jadi Prediction karena Ditulis dengan Vector”

Salah.

Notation yang lebih compact tidak mengubah epistemic status formula.

$$
h(q,c)=0.6q+0.4c
$$

dan:

$$
h(q,c)=\boldsymbol{\theta}^{\top}\mathbf{x}
$$

adalah dua cara menulis rule instructional yang sama.

Ia tetap bukan validated production model.

---

# 53. Worked Example 5 — Schema Audit Sebelum Compute

Weight vector:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.7\\
0.3
\end{bmatrix}
$$

Documented order:

1. completion ratio;
2. quiz ratio.

Participant vector:

$$
\mathbf{x}
=
\begin{bmatrix}
0.8\\
0.6
\end{bmatrix}
$$

Documented order:

1. quiz ratio;
2. completion ratio.

Apakah langsung hitung:

$$
0.7(0.8)+0.3(0.6)?
$$

**Tidak.**

Sebelum compute, align schema.

Jika kita ingin weight order mengikuti participant vector, weights harus ditulis ulang sesuai meaning:

$$
\tilde{\boldsymbol{\theta}}
=
\begin{bmatrix}
0.3\\
0.7
\end{bmatrix}
$$

baru:

$$
\tilde{\boldsymbol{\theta}}^{\top}\mathbf{x}
=
0.3(0.8)+0.7(0.6)
$$

$$
=0.24+0.42
$$

$$
=0.66
$$

Pelajaran:

> **dot product bukan excuse untuk mengabaikan metadata.**

---

# 54. Try It Yourself 1 — Basic 3D

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
2\\
-1\\
3
\end{bmatrix}
$$

dan:

$$
\mathbf{v}
=
\begin{bmatrix}
4\\
5\\
2
\end{bmatrix}
$$

Hitung:

$$
\mathbf{u}^{\top}\mathbf{v}
$$

### Solution

$$
(2)(4)+(-1)(5)+(3)(2)
$$

$$
=8-5+6
$$

$$
=9
$$

---

# 55. Try It Yourself 2 — Self Dot Product

Diberikan:

$$
\mathbf{z}
=
\begin{bmatrix}
-3\\
4
\end{bmatrix}
$$

Hitung:

1. $\mathbf{z}^{\top}\mathbf{z}$;
2. $\|\mathbf{z}\|_2$;
3. verifikasi hubungan squared norm.

### Solution

Self dot:

$$
(-3)^2+4^2
=
9+16
=
25
$$

Norm:

$$
\sqrt{25}=5
$$

Squared norm:

$$
5^2=25
$$

Maka:

$$
\mathbf{z}^{\top}\mathbf{z}
=
\|\mathbf{z}\|_2^2
$$

---

# 56. Try It Yourself 3 — HerAI Dewi

Dewi:

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70\\
0.50
\end{bmatrix}
$$

Weight:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}
$$

Hitung toy score dengan dot product.

### Solution

$$
(0.60)(0.70)+(0.40)(0.50)
$$

$$
=0.42+0.20
$$

$$
=0.62
$$

Interpretation:

> toy instructional weighted score under the defined rule.

Bukan probability.

---

# 57. Try It Yourself 4 — Magnitude Effect

Diberikan:

$$
\mathbf{a}
=
\begin{bmatrix}
1\\
1
\end{bmatrix}
$$

$$
\mathbf{b}
=
\begin{bmatrix}
2\\
2
\end{bmatrix}
$$

$$
\mathbf{c}
=
\begin{bmatrix}
10\\
10
\end{bmatrix}
$$

Hitung:

$$
\mathbf{a}^{\top}\mathbf{b}
$$

dan:

$$
\mathbf{a}^{\top}\mathbf{c}
$$

### Solution

$$
\mathbf{a}^{\top}\mathbf{b}
=
1(2)+1(2)
=
4
$$

$$
\mathbf{a}^{\top}\mathbf{c}
=
1(10)+1(10)
=
20
$$

Vectors $\mathbf{b}$ dan $\mathbf{c}$ mempunyai direction yang sama, tetapi raw dot product berbeda besar karena magnitude berbeda.

Itulah bridge penting ke Topic 06.

---

# 58. Try It Yourself 5 — Semantic Compatibility

Tim mempunyai:

$$
\mathbf{x}
=
\begin{bmatrix}
0.8\\
0.7
\end{bmatrix}
$$

schema:

1. quiz ratio;
2. completion ratio.

Vector lain:

$$
\mathbf{y}
=
\begin{bmatrix}
0.8\\
0.7
\end{bmatrix}
$$

schema:

1. normalized study duration;
2. attendance ratio.

Apakah:

$$
\mathbf{x}^{\top}\mathbf{y}
$$

boleh dihitung secara arithmetic?

Ya.

Apakah hasilnya otomatis meaningful sebagai participant similarity?

Tidak.

Explanation harus menyebut **schema semantics mismatch**.

---

# 59. Misconception Audit — Benar atau Salah?

## Statement 1

“Dot product dua vectors berdimensi $d$ menghasilkan vector berdimensi $d$.”

**Salah.**

Hasil dot product adalah scalar.

## Statement 2

“Dot product menghitung products per component lalu menjumlahkannya.”

**Benar.**

## Statement 3

“Jika feature order salah, arithmetic dapat tetap berjalan tetapi interpretation rusak.”

**Benar.**

## Statement 4

“Dot product dan Euclidean distance selalu memberikan ranking similarity yang sama.”

**Salah.**

## Statement 5

“Jika satu vector dikalikan $2$, dot product dengan vector lain juga dikalikan $2$.”

**Benar.**

## Statement 6

“Dot product zero dari dua nonzero vectors berarti orthogonal.”

**Benar.**

## Statement 7

“Dot product zero selalu membuktikan angle $90^\circ$, bahkan jika salah satu vector zero.”

**Salah.**

## Statement 8

“HerAI toy score $0.78$ menjadi probability hanya karena sekarang ditulis sebagai $\boldsymbol{\theta}^{\top}\mathbf{x}$.”

**Salah.**

## Statement 9

“Dot product besar dapat dipengaruhi magnitude.”

**Benar.**

## Statement 10

“Cosine similarity dan dot product adalah nama berbeda untuk operasi yang selalu sama.”

**Salah.**

---

# 60. [STEP-BY-STEP REVEAL] Dot Product Builder

**Learning purpose:** memperlihatkan struktur pair → multiply → sum.

**Initial state/data:**

$$
\mathbf{u}
=
\begin{bmatrix}
2\\
3
\end{bmatrix}
,\qquad
\mathbf{v}
=
\begin{bmatrix}
4\\
5
\end{bmatrix}
$$

**Learner action:**

Tekan:

1. `Pair components`;
2. `Multiply pairs`;
3. `Sum contributions`.

**Expected behavior:**

UI menampilkan:

$$
2(4)=8
$$

$$
3(5)=15
$$

lalu:

$$
8+15=23
$$

**Feedback:**

Highlight output sebagai **scalar**.

**Safety note:**

Jangan label hasil sebagai similarity percentage.

---

# 61. [INTERACTIVE VISUAL] Component Contribution Explorer

**Learning purpose:** melihat contribution setiap component terhadap dot product.

**Initial state:**

2D vectors dengan sliders untuk:

$$
x_1,x_2,y_1,y_2
$$

**Learner action:**

Ubah satu component.

**Expected behavior:**

Tampilkan:

- pair product pertama;
- pair product kedua;
- total dot product;
- sign setiap contribution.

**Feedback:**

Jika component sign berubah, highlight perubahan contribution.

**Safety note:**

Total adalah scalar mathematical aggregate; application semantics membutuhkan schema.

---

# 62. [INTERACTIVE VISUAL] Geometric Dot Product Explorer

**Learning purpose:** membangun intuition bahwa dot product bergantung magnitude dan alignment.

**Initial state:**

Dua nonzero arrows 2D.

**Learner action:**

Drag direction dan length salah satu arrow.

**Expected behavior:**

Tampilkan:

- $\|\mathbf{x}\|_2$;
- $\|\mathbf{y}\|_2$;
- angle $\theta$;
- dot product;
- label sign: positive / zero / negative.

**Feedback:**

Ketika angle mendekati $90^\circ$, dot product mendekati $0$.

**Safety note:**

Jika salah satu vector dibuat zero, nonaktifkan angle interpretation dan tampilkan:

> “Zero vector has no ordinary direction; do not infer a $90^\circ$ angle.”

---

# 63. [NUMBER MANIPULATOR] HerAI Weighted Score

**Learning purpose:** menghubungkan Submodule 01 formula dengan vector dot product.

**Initial state:**

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}
$$

Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

**Learner action:**

Ubah:

- quiz ratio;
- completion ratio;
- optional weights.

**Expected behavior:**

Tampilkan contribution:

$$
\theta_1q
$$

dan:

$$
\theta_2c
$$

lalu total.

**Feedback:**

Setiap perubahan satu component memperbarui satu contribution terkait.

**Safety note:**

Persistent badge:

> “Instructional weighted score — not probability, confidence, or validated recommendation.”

---

# 64. [COMPARE VIEW] Same Direction, Different Magnitude

**Learning purpose:** menunjukkan magnitude sensitivity raw dot product.

**Initial state:**

$$
\mathbf{a}
=
\begin{bmatrix}
1\\
1
\end{bmatrix}
$$

candidate A:

$$
\mathbf{b}
=
\begin{bmatrix}
2\\
2
\end{bmatrix}
$$

candidate B:

$$
\mathbf{c}
=
\begin{bmatrix}
10\\
10
\end{bmatrix}
$$

**Learner action:**

Bandingkan dot products.

**Expected behavior:**

$$
\mathbf{a}^{\top}\mathbf{b}=4
$$

$$
\mathbf{a}^{\top}\mathbf{c}=20
$$

UI menunjukkan bahwa candidate directions sama tetapi raw dot products berbeda.

**Safety note:**

Jangan menjelaskan cosine similarity formula di visual ini; cukup bridge:

> “Topic berikutnya akan memisahkan directional alignment dari magnitude.”

---

# 65. [COMPARE VIEW] Feature Order Audit

**Learning purpose:** mendeteksi silent semantic bug.

**Initial state:**

Weight schema:

`quiz, completion`

Feature schema A:

`quiz, completion`

Feature schema B:

`completion, quiz`

**Learner action:**

Toggle antara schema A dan B.

**Expected behavior:**

System menghitung dua scalar berbeda dan memberi warning ketika schema mismatch.

**Feedback:**

Highlight component pairing.

**Safety note:**

Math-valid result tidak berarti semantically valid result.

---

# 66. Checkpoint 1 — Output Type

Apa object type dari:

$$
\mathbf{x}^{\top}\mathbf{y}
$$

**Jawaban:** scalar.

---

# 67. Checkpoint 2 — Formula Reading

Apa arti:

$$
\sum_{j=1}^{d}x_jy_j
$$

**Jawaban:** kalikan matched components pada setiap index, lalu jumlahkan contributions dari $1$ sampai $d$.

---

# 68. Checkpoint 3 — Self Dot

Jika:

$$
\|\mathbf{x}\|_2=5
$$

berapa:

$$
\mathbf{x}^{\top}\mathbf{x}?
$$

**Jawaban:**

$$
25
$$

karena:

$$
\mathbf{x}^{\top}\mathbf{x}
=
\|\mathbf{x}\|_2^2
$$

---

# 69. Checkpoint 4 — Orthogonality Safety

Jika dua **nonzero** vectors mempunyai dot product zero, apa hubungan geometric-nya?

**Jawaban:** orthogonal.

---

# 70. Checkpoint 5 — HerAI Interpretation

Jika:

$$
\boldsymbol{\theta}^{\top}\mathbf{x}^{(3)}=0.94
$$

bolehkah kita menyatakan:

> “Citra punya probability sukses $94\%$”?

**Jawaban:** tidak.

Output tersebut adalah toy instructional weighted score di bawah rule yang didefinisikan.

---

# 71. Checkpoint 6 — Magnitude

Jika candidate vector dikalikan positive scalar $10$ tanpa mengubah direction, apakah raw dot product dengan query tetap sama?

**Jawaban:** tidak.

Dot product juga berubah factor $10$.

---

# 72. Checkpoint 7 — Schema

Dua vectors sama-sama berada di $\mathbb{R}^2$.

Apakah itu cukup untuk memastikan dot product meaningful secara aplikasi?

**Jawaban:** tidak.

Dimension compatibility tidak menjamin semantic/schema compatibility.

---

# 73. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan dot product sebagai pair-multiply-sum.
- [ ] **I can** membaca $\mathbf{x}^{\top}\mathbf{y}$.
- [ ] **I can** membaca $\mathbf{x}\cdot\mathbf{y}$.
- [ ] **I can** menghitung dot product 2D.
- [ ] **I can** menghitung dot product 3D dengan negative values.
- [ ] **I can** menjelaskan bahwa output dot product adalah scalar.
- [ ] **I can** membedakan dot product dari elementwise multiplication.
- [ ] **I can** membedakan dot product dari vector addition.
- [ ] **I can** membedakan dot product dari distance.
- [ ] **I can** menjelaskan bahwa dot product bukan cosine similarity.
- [ ] **I can** menjelaskan $\mathbf{x}^{\top}\mathbf{x}=\|\mathbf{x}\|_2^2$.
- [ ] **I can** menjelaskan hubungan dot product dengan magnitude dan angle.
- [ ] **I can** menjelaskan orthogonality untuk nonzero vectors.
- [ ] **I can** menjelaskan zero-vector caveat pada angle interpretation.
- [ ] **I can** menulis weighted sum sebagai dot product.
- [ ] **I can** menghitung HerAI toy score dengan $\boldsymbol{\theta}^{\top}\mathbf{x}^{(i)}$.
- [ ] **I can** menjaga feature order antara weights dan features.
- [ ] **I can** menjelaskan mengapa same dimension belum menjamin same semantics.
- [ ] **I can** menjelaskan mengapa raw dot product dipengaruhi magnitude.
- [ ] **I can** menolak klaim “dot product besar = probability besar”.
- [ ] **I can** menjelaskan satu penggunaan dot product pada linear model.
- [ ] **I can** menjelaskan satu penggunaan dot product pada embedding/recommender scoring.
- [ ] **I can** menjelaskan mengapa metric choice harus mengikuti task.

Jika beberapa poin masih belum yakin, ulangi:

- Worked Example 4;
- Magnitude Sensitivity;
- Feature Order Safety;
- Misconception Challenges;
- Try It Yourself.

---

# 74. Why This Matters Later

Dot product adalah prerequisite langsung Topic 06.

Sekarang kita tahu:

$$
\mathbf{x}^{\top}\mathbf{y}
$$

dipengaruhi oleh:

- magnitude $\mathbf{x}$;
- magnitude $\mathbf{y}$;
- directional alignment.

Tetapi bagaimana jika yang ingin kita bandingkan terutama adalah **arah**, bukan besar?

Kita membutuhkan cara untuk mengontrol magnitude effect.

Itulah motivasi untuk **cosine similarity**.

Topic 06 akan menggunakan:

- dot product;
- L2 norm;
- nonzero-vector requirement;
- angle intuition;

yang semuanya sudah tersedia dari Topic 04–05.

---

# 75. Summary

## Core Concept 1 — Dot Product

$$
\mathbf{x}^{\top}\mathbf{y}
=
\sum_{j=1}^{d}x_jy_j
$$

Pair matched components, multiply, then sum.

## Core Concept 2 — Output Scalar

Dot product mengubah dua compatible vectors menjadi satu scalar.

## Core Concept 3 — Semantics Matter

Same dimension tidak cukup.

Feature meaning dan order harus compatible.

## Core Concept 4 — Self Dot Product

$$
\mathbf{x}^{\top}\mathbf{x}
=
\|\mathbf{x}\|_2^2
$$

## Core Concept 5 — Geometry

Untuk nonzero vectors:

$$
\mathbf{x}^{\top}\mathbf{y}
=
\|\mathbf{x}\|_2
\|\mathbf{y}\|_2
\cos(\theta)
$$

Dot product dipengaruhi magnitude dan alignment.

## Core Concept 6 — Weighted Sum

$$
\boldsymbol{\theta}^{\top}\mathbf{x}
$$

adalah compact form untuk weighted feature sum.

## Core Concept 7 — HerAI Continuity

Toy function:

$$
h(q,c)=0.6q+0.4c
$$

dapat ditulis:

$$
h(q,c)=\boldsymbol{\theta}^{\top}\mathbf{x}
$$

tanpa mengubah statusnya menjadi probability atau production model.

## Core Concept 8 — Dot Product ≠ Cosine Similarity

Raw dot product masih sensitive terhadap magnitude.

Topic 06 akan menangani directional comparison secara lebih eksplisit.

---

# 76. Bridge ke Topic 06

Kita sekarang punya dua participant vectors.

Misalnya:

$$
\mathbf{x}^{(1)}
$$

dan:

$$
\mathbf{x}^{(3)}
$$

Kita dapat menghitung dot product mereka.

Tetapi raw dot product dapat meningkat jika salah satu vector menjadi lebih panjang, bahkan ketika direction tetap sama.

Jadi muncul pertanyaan baru:

> **Bagaimana kita membandingkan alignment dua vectors sambil mengurangi pengaruh magnitude?**

Itulah fokus:

# Topic 06 — Cosine Similarity: Membandingkan Arah, Bukan Sekadar Besar

Kita akan mulai dari identity yang sudah dikenal, tetapi tidak akan menganggap similarity tersebut sebagai probability.

---

# 77. References

## [R1] MIT OpenCourseWare — Lecture 7: Dot Products

Mendukung:

- dot product sebagai map dari ordered pair of vectors ke real number;
- inner-product foundation.

https://ocw.mit.edu/courses/res-18-008-calculus-revisited-complex-variables-differential-equations-and-linear-algebra-fall-2011/resources/lecture-7-dot-products/

## [R2] MIT OpenCourseWare — Session 3: Uses of the Dot Product — Lengths and Angles

Mendukung:

- geometric relation;
- lengths;
- angles;
- dot-product geometry.

https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/pages/1.-vectors-and-matrices/part-a-vectors-determinants-and-planes/session-3-uses-of-the-dot-product-lengths-and-angles/

## [R3] Boyd & Vandenberghe — Introduction to Applied Linear Algebra

Mendukung:

- vector notation;
- dot products;
- norms;
- applied vector reasoning.

https://stanford.edu/~boyd/vmls/

## [R4] Google for Developers — Content-Based Filtering

Mendukung:

- dot product sebagai similarity/scoring measure;
- feature overlap interpretation pada binary vectors;
- recommendation context.

https://developers.google.com/machine-learning/recommendation/content-based/basics

## [R5] Google for Developers — Measuring Similarity from Embeddings

Mendukung:

- Euclidean/cosine/dot-product comparison;
- raw dot product sensitivity terhadap vector length;
- magnitude/popularity implications.

https://developers.google.com/machine-learning/clustering/dnn-clustering/supervised-similarity

## [R6] Google for Developers — Candidate Generation Overview

Mendukung:

- candidate scoring via dot product;
- relation to embedding norm and angle;
- ranking differences across similarity measures.

https://developers.google.com/machine-learning/recommendation/overview/candidate-generation

## [R7] Google for Developers — Machine Learning Crash Course: Linear Regression

Mendukung:

- multi-feature weighted sum;
- features, weights, bias;
- linear model connection.

https://developers.google.com/machine-learning/crash-course/linear-regression

## [R8] KaTeX — Supported Functions

Mendukung source compatibility untuk:

- `\mathbf`;
- `\boldsymbol`;
- `\top`;
- `\sum`;
- `\begin{bmatrix}`;
- `\|\cdot\|`;
- `\cos`;
- `\theta`.

https://katex.org/docs/supported.html

---

# 78. QA Notes

## Academic QA

- Dot product didefinisikan sebagai multiply matched components lalu sum.
- Output dinyatakan sebagai scalar.
- Dot product tidak disamakan dengan elementwise multiplication.
- Dot product tidak disamakan dengan Euclidean distance.
- Dot product tidak disamakan dengan cosine similarity.
- Magnitude sensitivity dibahas eksplisit.
- Geometric angle interpretation diberi nonzero-vector condition.
- Zero-vector caveat dibahas eksplisit.
- Orthogonality tidak dioverclaim.
- Weighted sum connection ke linear model technically meaningful.
- Embedding/recommender connection menggunakan official Google ML sources.
- Dot product tidak disebut probability, confidence, accuracy, atau causality.
- HerAI toy function tetap instructional, bukan validated production model.
- Feature order dan semantic compatibility dipertahankan.

## Mathematical QA

Checked:

$$
\begin{bmatrix}2\\3\end{bmatrix}^{\top}
\begin{bmatrix}4\\5\end{bmatrix}
=
23
$$

$$
\begin{bmatrix}3\\-2\\4\end{bmatrix}^{\top}
\begin{bmatrix}1\\5\\-1\end{bmatrix}
=
-11
$$

HerAI:

- Alya: $0.78$;
- Bima: $0.61$;
- Citra: $0.94$;
- Dewi: $0.62$.

Pairwise HerAI dot products:

- Alya–Bima: $0.94875$;
- Alya–Citra: $1.47$;
- Alya–Dewi: $0.935$;
- Bima–Citra: $1.165$;
- Bima–Dewi: $0.7325$;
- Citra–Dewi: $1.13$.

## Notation QA

Canonical notation maintained:

- scalar: non-bold;
- vector: bold lowercase;
- participant vector: $\mathbf{x}^{(i)}$;
- component: $x_j$;
- parameter vector: $\boldsymbol{\theta}$;
- transpose: $\mathbf{x}^{\top}$;
- norm: $\|\mathbf{x}\|_2$;
- dot product canonical: $\mathbf{x}^{\top}\mathbf{y}$;
- alternate readable notation: $\mathbf{x}\cdot\mathbf{y}$.

No matrix notation formally introduced.

## Dependency QA

Prerequisites used:

- vector components/order;
- vector operations;
- L2 norm;
- distance distinction;
- summation notation.

Topic 05 formally teaches:

- dot product;
- scalar output;
- component contributions;
- dot-product properties;
- self dot product;
- relation to norm;
- geometric alignment intuition;
- orthogonality beginner treatment;
- weighted sums;
- linear-model connection;
- embedding/recommendation connection;
- magnitude sensitivity.

Topic 05 does **not** formally teach:

- cosine similarity formula;
- cosine-similarity ranking;
- matrix;
- matrix multiplication;
- projection;
- Gram matrices;
- kernels;
- eigenvalues/eigenvectors;
- PCA;
- SVD;
- probability;
- calculus;
- optimization.

## Markdown + KaTeX Contract

- Inline math uses `$...$`.
- Display math uses `$$...$$`.
- No mathematical equations are represented as images.
- No formulas are intentionally placed in fenced code blocks.
- Commands used are standard KaTeX-supported constructs.
- Source-level QA can be checked here.
- Browser-level KaTeX rendering is **not claimed PASS** until runtime frontend test is executed.

---

# STOP CHECKPOINT

**Topic 05 selesai. Jangan lanjut Topic 06 sebelum approval user.**

Pertanyaan approval:

> **Apakah Topic 05 Submodule 02 disetujui dan kita boleh melanjutkan ke Topic 06?**
