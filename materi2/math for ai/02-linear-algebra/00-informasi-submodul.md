# 00 — Informasi Submodul

# Linear Algebra: Representasi Data, Vektor, dan Matriks

> **Program:** HerAI Fellowship  
> **Kategori:** Foundation & Core AI  
> **Modul:** Math for AI  
> **Submodul:** 02  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan background campuran, termasuk non-IT  
> **Canonical source:** Markdown + LaTeX  
> **Target renderer:** KaTeX pada frontend Vanilla JavaScript  
> **Prerequisite:** Submodul 01 — Kenapa AI Butuh Matematika? + Mathematical Readiness  
> **Forward dependency:** Submodul 03 — Statistics for AI: Membaca Pola dan Variasi Data

---

# 1. Ringkasan

Submodul ini membangun Linear Algebra secara bertahap dari object matematika yang paling sederhana sampai computation terhadap banyak observations sekaligus.

Learning journey utama:

**scalar**  
↓  
**vector**  
↓  
**components, dimension, shape, feature order**  
↓  
**vector operations**  
↓  
**norm**  
↓  
**distance**  
↓  
**dot product**  
↓  
**cosine similarity**  
↓  
**matrix**  
↓  
**matrix-vector dan matrix-matrix multiplication**

Tujuan submodul bukan membuat peserta menghafal formula sebanyak mungkin.

Tujuan utamanya adalah agar peserta mampu:

> **membaca representasi numerik dengan semantics yang jelas, memilih operasi yang sesuai, memeriksa shape dan compatibility, menghitung langkah demi langkah, lalu menginterpretasikan hasil tanpa membuat klaim yang tidak didukung matematika.**

Submodul ini mempertahankan running case **HerAI Next-Best Learning Recommendation** dari Submodul 01.

---

# 2. Role dalam Overall Curriculum

Submodul 01 membangun mathematical readiness.

Submodul 02 mengubah readiness tersebut menjadi mathematical objects dan operations yang akan digunakan berulang dalam AI/ML.

## 2.1 Representation Layer

Peserta mulai dari scalar features seperti:

$$
q=0.80
$$

dan:

$$
c=0.75.
$$

Kemudian features tersebut disusun menjadi participant vector:

$$
\mathbf{x}
=
\begin{bmatrix}
q\\
c
\end{bmatrix}.
$$

## 2.2 Geometry and Comparison Layer

Setelah vector terbentuk, peserta mempelajari:

- vector operations;
- magnitude melalui norm;
- kedekatan melalui distance;
- weighted interaction melalui dot product;
- directional alignment melalui cosine similarity.

## 2.3 Dataset and Transformation Layer

Banyak participant vectors kemudian disusun menjadi matrix:

$$
\mathbf{X}\in\mathbb{R}^{n\times d}.
$$

Submodul ditutup dengan matrix multiplication sebagai structured combination dan transformation.

## 2.4 Forward Dependency

Submodul 03 akan membaca feature matrix sebagai dataset statistik.

Statistics tidak menghapus Linear Algebra.

Statistics menggunakan structure yang sudah dibangun di sini:

- observations;
- features;
- columns;
- rows;
- numerical values;
- consistent schema.

---

# 3. Prerequisite

Peserta tidak harus mempunyai background IT.

Namun peserta diharapkan sudah dapat:

1. membedakan real-world object dari data representation;
2. menjelaskan observation, feature, identifier, target, dan prediction;
3. membaca fraction, decimal, ratio, dan percentage;
4. memahami bahwa nilai pada range $0$–$1$ tidak otomatis probability;
5. membaca variable, expression, equation, dan simple function;
6. membaca ordered pair dan coordinate plane sederhana;
7. membaca summation notation;
8. membaca indexed feature $x_j^{(i)}$;
9. menjaga interpretation berdasarkan semantics quantity.

---

# 4. Learning Outcomes Submodul

Setelah menyelesaikan Submodul 02, peserta diharapkan mampu:

## LO-02.1 — Vector Representation

Menyusun meaningful numerical features menjadi ordered vector representation dan menjelaskan bahwa vector bukan real-world object itu sendiri.

## LO-02.2 — Components, Dimension, Shape, dan Schema

Membaca components, indexing, dimension, shape/orientation, serta menjaga feature order tetap konsisten.

## LO-02.3 — Vector Operations

Melakukan vector addition, subtraction, dan scalar multiplication serta membedakan mathematical validity dari semantic validity.

## LO-02.4 — Norm dan Distance

Menghitung L2 norm dan Euclidean distance, membedakan magnitude dari distance, serta menjelaskan pengaruh unit/scale.

## LO-02.5 — Dot Product

Menghitung dan menginterpretasikan dot product sebagai scalar result, weighted sum, dan alignment-sensitive quantity tanpa menyamakannya dengan cosine similarity.

## LO-02.6 — Cosine Similarity

Menghitung cosine similarity pada nonzero compatible vectors, menginterpretasikan directional alignment, serta menjelaskan bahwa similarity score bukan probability.

## LO-02.7 — Matrix Representation

Menyusun banyak observations menjadi matrix, membaca rows, columns, entries, shape, indexing, dan transpose.

## LO-02.8 — Matrix Multiplication

Memeriksa shape compatibility dan menghitung matrix-vector serta matrix-matrix multiplication sebagai structured weighted combinations dan transformations.

## LO-02.9 — AI Interpretation Safety

Membedakan:

- feature value;
- toy score;
- distance;
- dot product;
- cosine similarity;
- model output;
- probability;
- recommendation decision.

## LO-02.10 — Integrated Reasoning

Mengaudit satu Linear Algebra pipeline dari feature schema hingga matrix output dengan mathematical, semantic, dan implementation reasoning yang konsisten.

---

# 5. Estimasi Waktu

Setiap topic memiliki estimasi belajar sendiri pada halaman materinya.

Topic 01–07 mencantumkan estimasi membaca dan aktivitas secara eksplisit. Topic 08 pada source final tidak menetapkan angka durasi khusus, sehingga package final ini **tidak mengarang estimasi baru untuk Topic 08**.

Untuk delivery, submodul sebaiknya dipecah per topic dan tidak diwajibkan selesai dalam satu sesi.

Recommended cadence:

1. pelajari satu topic;
2. kerjakan checkpoint dan Try It Yourself;
3. gunakan formative practice bila diperlukan;
4. lanjut hanya setelah concepts utama stabil;
5. kerjakan assessment final setelah Topic 01–08 selesai.

---

# 6. Concept Map

**Scalar**  
satu quantity

↓ combine meaningful features dengan fixed order

**Vector**  
satu observation, banyak components

↓ read structure

**Component → Dimension → Shape → Feature Order**

↓ perform compatible operations

**Addition / Subtraction / Scalar Multiplication**

↓ measure one vector

**Norm**

↓ compare two vectors by separation

**Distance**

↓ combine paired components

**Dot Product**

↓ normalize by lengths

**Cosine Similarity**

↓ stack many observations

**Matrix**

↓ process many values consistently

**Matrix-Vector / Matrix-Matrix Multiplication**

↓ forward bridge

**Statistics for AI**

---

# 7. Daftar Topic

| Topic | Judul | Core transition |
|---|---|---|
| 01 | Dari Scalar ke Vector — Satu Peserta, Banyak Feature | scalar → ordered vector representation |
| 02 | Membaca Vektor — Komponen, Dimensi, Shape, dan Feature Order | vector → readable structure |
| 03 | Operasi Vektor — Penjumlahan, Pengurangan, dan Scalar Multiplication | structure → vector operations |
| 04 | Magnitude/Norm dan Distance — Mengukur Besar dan Kedekatan | operations → geometry |
| 05 | Dot Product — Menggabungkan Dua Vektor Secara Matematis | paired components → scalar interaction |
| 06 | Cosine Similarity — Membandingkan Arah, Bukan Sekadar Besar | raw interaction → normalized directional alignment |
| 07 | Matrix — Banyak Observation dalam Satu Struktur | many vectors → matrix |
| 08 | Matrix Operations & Matrix Multiplication — Shape, Transformasi, dan AI Connection | matrix structure → batch computation/transformation |

---

# 8. Persistent HerAI Running Case

Participants utama:

- Alya;
- Bima;
- Citra;
- Dewi.

Raw data:

| Participant | Quiz correct | Quiz total | Completion done | Completion total | Study duration |
|---|---:|---:|---:|---:|---:|
| Alya | 8 | 10 | 6 | 8 | 45 min |
| Bima | 6 | 10 | 5 | 8 | 30 min |
| Citra | 9 | 10 | 8 | 8 | 55 min |
| Dewi | 7 | 10 | 4 | 8 | 40 min |

Canonical derived features:

| Participant | Quiz ratio $q$ | Completion ratio $c$ |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

Canonical feature order:

1. quiz ratio $q$;
2. completion ratio $c$.

Participant vector:

$$
\mathbf{x}^{(i)}
=
\begin{bmatrix}
q^{(i)}\\
c^{(i)}
\end{bmatrix}.
$$

Feature matrix:

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

Toy instructional weight vector:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix}.
$$

Toy score function:

$$
h(q,c)=0.6q+0.4c.
$$

Vector form:

$$
h(q,c)
=
\boldsymbol{\theta}^{\top}\mathbf{x}.
$$

Batch form:

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

Interpretation contract:

- output di atas adalah **toy instructional score**;
- bukan probability;
- bukan validated production prediction;
- bukan causal effect;
- bukan automatic recommendation decision.

---

# 9. Canonical Notation

## Scalar

$$
x,\ y,\ q,\ c,\ p,\ L
$$

## Vector

$$
\mathbf{x},\ \mathbf{y},\ \mathbf{v}
$$

## Observation vector

$$
\mathbf{x}^{(i)}
$$

## Indexed feature

$$
x_j^{(i)}
$$

## Vector space notation

$$
\mathbf{x}\in\mathbb{R}^{d}
$$

## Parameter vector

$$
\boldsymbol{\theta}
$$

## Matrix

$$
\mathbf{X},\ \mathbf{A},\ \mathbf{B},\ \mathbf{W}
$$

## Matrix shape

$$
\mathbf{X}\in\mathbb{R}^{n\times d}
$$

## Matrix entry

$$
X_{ij}=x_j^{(i)}
$$

## Transpose

$$
\mathbf{x}^{\top},
\qquad
\mathbf{X}^{\top}
$$

## L2 norm

$$
\|\mathbf{x}\|_2
=
\sqrt{\sum_{j=1}^{d}x_j^2}
$$

## Euclidean distance

$$
d(\mathbf{x},\mathbf{y})
=
\|\mathbf{x}-\mathbf{y}\|_2
$$

## Dot product

$$
\mathbf{x}^{\top}\mathbf{y}
=
\sum_{j=1}^{d}x_jy_j
$$

## Cosine similarity

Untuk nonzero compatible vectors:

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})
=
\frac{\mathbf{x}^{\top}\mathbf{y}}
{\|\mathbf{x}\|_2\|\mathbf{y}\|_2}.
$$

## Matrix product

Jika:

$$
\mathbf{A}\in\mathbb{R}^{m\times n}
$$

dan:

$$
\mathbf{B}\in\mathbb{R}^{n\times p},
$$

maka:

$$
\mathbf{A}\mathbf{B}
\in
\mathbb{R}^{m\times p}.
$$

Entry product:

$$
C_{ij}
=
\sum_{k=1}^{n}A_{ik}B_{kj}.
$$

---

# 10. Interpretation Safety Contract

Submodul ini secara aktif mencegah misconception berikut:

1. vector bukan random list angka tanpa semantics;
2. feature order harus konsisten;
3. dimension bukan magnitude;
4. norm bukan distance;
5. distance dipengaruhi scale dan unit;
6. distance kecil bukan otomatis “best recommendation”;
7. dot product bukan cosine similarity;
8. raw dot product dapat dipengaruhi magnitude;
9. cosine similarity memerlukan nonzero norms pada definisi matematis standard;
10. cosine similarity bukan probability;
11. cosine similarity tinggi bukan causal similarity;
12. same shape tidak otomatis same semantics;
13. matrix bukan sekadar spreadsheet;
14. transpose mengubah orientation tetapi tidak memperbaiki semantic mismatch;
15. matrix multiplication bukan elementwise multiplication;
16. shape compatibility adalah necessary mathematical condition, bukan sufficient semantic condition;
17. mathematically valid operation belum tentu meaningful untuk task;
18. output matrix belum tentu probability matrix;
19. numerical representation tetap membawa design choices dan assumptions;
20. lebih banyak features tidak otomatis membuat representation lebih baik.

---

# 11. Math Authoring Contract

Canonical source:

**Markdown + LaTeX**

Inline mathematics:

`$...$`

Display mathematics menggunakan delimiter display yang didukung pipeline Markdown → KaTeX.

Rules:

- setiap symbol baru harus didefinisikan;
- tidak ada raw LaTeX di luar math mode;
- formula tidak ditempatkan dalam fenced code block;
- equation tidak dijadikan image;
- notation harus konsisten;
- mathematical correctness, source correctness, dan browser rendering diperlakukan sebagai tiga QA berbeda;
- browser-level KaTeX PASS hanya boleh dinyatakan setelah runtime frontend benar-benar diuji.

---

# 12. Assessment Alignment

| LO | Evidence utama pada assessment final |
|---|---|
| LO-02.1 | Latihan 1, Kuis 1 |
| LO-02.2 | Latihan 1, Kuis 2 |
| LO-02.3 | Latihan 2, Kuis 3 |
| LO-02.4 | Latihan 3, Kuis 4 |
| LO-02.5 | Latihan 4, Kuis 5 |
| LO-02.6 | Latihan 5, Kuis 6–7 |
| LO-02.7 | Latihan 6, Kuis 8 |
| LO-02.8 | Latihan 7, Kuis 9 |
| LO-02.9 | Latihan 4–8, Diskusi 1–2, Kuis 10 |
| LO-02.10 | Latihan 8, Diskusi 1–2 |

Assessment final terdiri dari:

- **8 open exercises**;
- **10 MCQ**;
- **2 discussion prompts**;
- reasoning-heavy distractors dan rubrics;
- integrated HerAI reasoning;
- numerical computation;
- interpretation audit.

---

# 13. Completion Criteria

Peserta siap menuju Submodul 03 jika sebagian besar kondisi berikut terpenuhi:

1. dapat membangun dan membaca vector dengan feature schema yang jelas;
2. dapat memeriksa dimension dan shape sebelum computation;
3. dapat melakukan operasi vector dasar;
4. dapat menghitung norm dan distance;
5. dapat menghitung dot product;
6. dapat menghitung dan menginterpretasikan cosine similarity secara aman;
7. dapat membangun dan membaca feature matrix;
8. dapat menentukan valid/tidaknya matrix multiplication dari shape;
9. dapat menghitung product kecil dengan langkah yang dapat ditelusuri;
10. dapat menjelaskan perbedaan mathematical validity dan semantic validity;
11. tidak menyamakan similarity/score dengan probability;
12. dapat menyelesaikan integrated HerAI reasoning audit dengan justification.

---

# 14. Bridge ke Submodul 03 — Statistics for AI

Linear Algebra memberi kita structure.

Sekarang kita mempunyai:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}.
$$

Kita dapat membaca:

- setiap row sebagai observation;
- setiap column sebagai feature;
- setiap entry sebagai satu feature value;
- shape sebagai jumlah observations × features.

Pertanyaan berikutnya bukan lagi:

> “Bagaimana data disusun?”

Pertanyaan berikutnya adalah:

> **“Apa pola, pusat, variasi, distribution, dan relationship yang terlihat ketika kita membaca banyak observations bersama?”**

Itulah peran:

# Submodul 03 — Statistics for AI: Membaca Pola dan Variasi Data
