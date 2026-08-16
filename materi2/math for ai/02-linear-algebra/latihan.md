# Latihan Submodul 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks

> **Jenis:** Final integrated open exercises  
> **Jumlah:** 8 latihan  
> **Fokus:** computation + interpretation + error diagnosis + HerAI integration  
> **Catatan:** Latihan ini adalah assessment final Submodul 02, bukan pengganti formative practice pada setiap topic.

---

# Latihan 1 — Representation & Schema Audit

**Objective:** LO-02.1, LO-02.2  
**Difficulty:** Medium  
**Concept tested:** scalar, vector, component, dimension, feature order, semantics

## Prompt

HerAI ingin merepresentasikan satu participant menggunakan:

1. quiz ratio;
2. completion ratio.

Untuk Alya:

$$
q=0.80,
\qquad
c=0.75.
$$

Seorang anggota tim menulis dua representations:

$$
\mathbf{a}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

dan:

$$
\mathbf{b}
=
\begin{bmatrix}
0.75\\
0.80
\end{bmatrix}.
$$

Jawab:

1. tuliskan feature schema yang membuat $\mathbf{a}$ menjadi representation Alya yang konsisten dengan submodul;
2. berapa dimension $\mathbf{a}$?
3. apa arti component pertama dan kedua?
4. apakah $\mathbf{b}$ otomatis merepresentasikan participant yang berbeda?
5. jelaskan mengapa nilai yang sama tetapi urutan berbeda dapat menghasilkan semantic error;
6. tuliskan $x_1^{(1)}$ dan $x_2^{(1)}$ untuk Alya.

## Staged Hints

### Hint 1

Jangan mulai dari angka. Mulai dari **feature order contract**.

### Hint 2

Dimension menghitung jumlah components, bukan besar numerical values.

### Hint 3

Vector tidak membawa nama feature secara otomatis. Semantics datang dari schema yang didefinisikan.

## Expected Reasoning

Jawaban kuat menjelaskan:

- schema canonical adalah `[quiz ratio, completion ratio]`;
- $\mathbf{a}$ berdimension $2$;
- component pertama $=0.80$ adalah quiz ratio;
- component kedua $=0.75$ adalah completion ratio;
- $\mathbf{b}$ tidak otomatis participant berbeda; bisa saja data Alya yang salah posisi;
- vector dengan angka sama tetapi schema/order berbeda memiliki interpretation berbeda;
- $x_1^{(1)}=0.80$ dan $x_2^{(1)}=0.75$.

## Rubric — 10 poin

- schema benar: 2
- dimension benar: 1
- component semantics: 2
- audit $\mathbf{b}$: 2
- indexed notation: 2
- komunikasi/notation: 1

## Strong Answer Example

Dengan schema `[quiz ratio, completion ratio]`:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}.
$$

Vector tersebut berdimension $2$. Nilai pertama adalah quiz ratio dan nilai kedua completion ratio. Vector $\mathbf{b}$ tidak membuktikan adanya participant baru; ia dapat menjadi representation Alya dengan feature order yang tertukar. Karena position membawa semantics, pertukaran position dapat menjadi silent semantic bug.

## Common Mistakes

- menyebut dimension sebagai $0.80+0.75$;
- menganggap vector menyimpan nama feature secara otomatis;
- menganggap urutan component tidak penting;
- menyebut $\mathbf{b}$ pasti participant lain.

---

# Latihan 2 — Vector Operations: Valid secara Matematis, Valid secara Makna?

**Objective:** LO-02.3, LO-02.9  
**Difficulty:** Medium  
**Concept tested:** addition, subtraction, scalar multiplication, semantic validity

## Prompt

Diberikan:

$$
\mathbf{x}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix},
\qquad
\mathbf{y}
=
\begin{bmatrix}
0.60\\
0.625
\end{bmatrix}.
$$

Keduanya memakai schema `[quiz ratio, completion ratio]`.

Hitung:

1. $\mathbf{x}+\mathbf{y}$;
2. $\mathbf{x}-\mathbf{y}$;
3. $0.5\mathbf{x}$.

Lalu jawab:

4. apakah $\mathbf{x}+\mathbf{y}$ dapat langsung disebut “participant gabungan”?
5. apakah $\mathbf{x}-\mathbf{y}$ sudah merupakan distance?
6. apakah $0.5\mathbf{x}$ otomatis berarti “setengah kemampuan Alya”?
7. berikan satu kalimat yang membedakan mathematical operation dari semantic interpretation.

## Expected Reasoning

$$
\mathbf{x}+\mathbf{y}
=
\begin{bmatrix}
1.40\\
1.375
\end{bmatrix}.
$$

$$
\mathbf{x}-\mathbf{y}
=
\begin{bmatrix}
0.20\\
0.125
\end{bmatrix}.
$$

$$
0.5\mathbf{x}
=
\begin{bmatrix}
0.40\\
0.375
\end{bmatrix}.
$$

Interpretation:

- addition valid karena dimension/schema compatible;
- hasil addition tidak otomatis participant nyata;
- difference vector belum menjadi distance karena distance harus menghasilkan scalar;
- scalar multiplication valid secara matematika tetapi interpretation aplikasinya harus didefinisikan;
- valid computation tidak otomatis memberi valid real-world meaning.

## Rubric — 12 poin

- tiga computations: 6
- distinction difference vs distance: 2
- semantic reasoning addition: 1
- semantic reasoning scaling: 2
- komunikasi: 1

## Common Mistakes

- menjumlahkan hanya component pertama;
- menyebut difference vector sebagai distance;
- menganggap semua hasil operasi vector punya direct real-world interpretation.

---

# Latihan 3 — Norm, Distance, dan Scale Trap

**Objective:** LO-02.4, LO-02.9  
**Difficulty:** Medium–High  
**Concept tested:** L2 norm, Euclidean distance, unit/scale

## Prompt

Gunakan:

$$
\mathbf{x}_{A}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

untuk Alya dan:

$$
\mathbf{x}_{B}
=
\begin{bmatrix}
0.60\\
0.625
\end{bmatrix}
$$

untuk Bima.

1. hitung $\|\mathbf{x}_A\|_2$;
2. hitung $d(\mathbf{x}_A,\mathbf{x}_B)$;
3. jelaskan perbedaan pertanyaan yang dijawab norm dan distance;
4. sekarang tambahkan raw study duration sehingga:

$$
\tilde{\mathbf{x}}_A
=
\begin{bmatrix}
0.80\\
0.75\\
45
\end{bmatrix},
\qquad
\tilde{\mathbf{x}}_B
=
\begin{bmatrix}
0.60\\
0.625\\
30
\end{bmatrix}.
$$

Hitung approximate Euclidean distance baru.

5. mengapa angka distance berubah sangat besar?
6. apa yang harus diaudit sebelum menyimpulkan bahwa raw three-feature distance lebih meaningful?

## Staged Hints

### Hint 1

Untuk distance, mulai dari difference vector.

### Hint 2

Study duration memakai unit menit, sedangkan dua feature pertama berupa ratio.

## Expected Reasoning

Norm Alya:

$$
\|\mathbf{x}_A\|_2
=
\sqrt{0.80^2+0.75^2}
=
\sqrt{1.2025}
\approx1.097.
$$

Distance Alya–Bima:

$$
d(\mathbf{x}_A,\mathbf{x}_B)
=
\sqrt{(0.20)^2+(0.125)^2}
=
\sqrt{0.055625}
\approx0.236.
$$

Dengan duration:

$$
d(\tilde{\mathbf{x}}_A,\tilde{\mathbf{x}}_B)
=
\sqrt{0.20^2+0.125^2+15^2}
\approx15.002.
$$

Interpretation:

- norm mengukur magnitude satu vector relatif terhadap origin;
- distance mengukur separation antara dua vectors;
- raw minutes mendominasi karena numerical scale jauh lebih besar;
- sebelum memilih representation/metric, audit unit, scale, semantics, preprocessing, dan tujuan comparison.

## Rubric — 14 poin

- norm: 3
- two-feature distance: 3
- three-feature distance: 3
- norm vs distance interpretation: 2
- scale audit: 2
- komunikasi: 1

## Common Mistakes

- menjumlahkan values tanpa square;
- menyebut norm dan distance sebagai konsep identik;
- menyimpulkan duration “lebih penting” hanya karena angka menit lebih besar.

---

# Latihan 4 — Dot Product sebagai Weighted Sum, Bukan Probability

**Objective:** LO-02.5, LO-02.9  
**Difficulty:** Medium  
**Concept tested:** dot product, weighted sum, score semantics

## Prompt

Gunakan:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix},
\qquad
\mathbf{x}_{A}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}.
$$

1. hitung $\boldsymbol{\theta}^{\top}\mathbf{x}_A$;
2. tunjukkan hubungan hasil dengan $h(q,c)=0.6q+0.4c$;
3. sebutkan output type dari dot product;
4. apakah nilai $0.78$ boleh disebut $78\%$ probability keberhasilan?
5. jika weight pertama dinaikkan menjadi $0.80$ tanpa mengubah yang lain, apakah perubahan score membuktikan quiz ratio menyebabkan outcome?
6. jelaskan perbedaan weight interpretation dan causal interpretation.

## Expected Reasoning

$$
\boldsymbol{\theta}^{\top}\mathbf{x}_A
=
0.60(0.80)+0.40(0.75)
=
0.78.
$$

Itu sama dengan toy function lama.

Output dot product adalah scalar.

Nilai $0.78$ tetap toy instructional score. Bentuk angka pada range $0$–$1$ tidak membuatnya otomatis probability.

Mengubah weight menunjukkan sensitivitas formula terhadap design parameter, bukan bukti causal effect.

## Rubric — 12 poin

- computation: 3
- connection ke toy function: 2
- output type: 1
- probability safety: 2
- weight vs causality: 3
- komunikasi: 1

## Common Mistakes

- menyebut output vector;
- menyebut $0.78$ calibrated probability;
- menganggap coefficient adalah causal effect.

---

# Latihan 5 — Cosine Similarity: Ranking dan Interpretation Audit

**Objective:** LO-02.6, LO-02.9  
**Difficulty:** High  
**Concept tested:** normalized dot product, scaling invariance, zero vector, ranking interpretation

## Prompt

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
1\\
2
\end{bmatrix},
\qquad
\mathbf{v}
=
\begin{bmatrix}
2\\
4
\end{bmatrix},
\qquad
\mathbf{w}
=
\begin{bmatrix}
2\\
1
\end{bmatrix}.
$$

1. hitung $\operatorname{cos\_sim}(\mathbf{u},\mathbf{v})$;
2. hitung $\operatorname{cos\_sim}(\mathbf{u},\mathbf{w})$;
3. jelaskan mengapa $\mathbf{v}$ mempunyai magnitude lebih besar tetapi cosine dengan $\mathbf{u}$ dapat mencapai $1$;
4. apakah cosine $1$ berarti dua underlying objects identik?
5. apa yang terjadi secara matematis jika salah satu vector adalah:

$$
\mathbf{0}
=
\begin{bmatrix}
0\\
0
\end{bmatrix}?
$$

6. jelaskan mengapa cosine ranking hanya meaningful jika vector space dan component semantics compatible.

## Expected Reasoning

Karena $\mathbf{v}=2\mathbf{u}$ dengan positive scalar:

$$
\operatorname{cos\_sim}(\mathbf{u},\mathbf{v})=1.
$$

Untuk $\mathbf{w}$:

$$
\mathbf{u}^{\top}\mathbf{w}=4,
$$

$$
\|\mathbf{u}\|_2=\sqrt{5},
\qquad
\|\mathbf{w}\|_2=\sqrt{5},
$$

sehingga:

$$
\operatorname{cos\_sim}(\mathbf{u},\mathbf{w})
=
\frac{4}{5}
=
0.8.
$$

Cosine $1$ berarti same direction pada representation tersebut, bukan real-world identity, causation, atau probability.

Untuk zero vector, denominator norm menjadi zero sehingga standard mathematical cosine similarity tidak terdefinisi.

## Rubric — 14 poin

- cosine $\mathbf{u},\mathbf{v}$: 3
- cosine $\mathbf{u},\mathbf{w}$: 4
- magnitude/direction reasoning: 2
- identity/probability safety: 2
- zero-vector reasoning: 2
- semantics: 1

## Common Mistakes

- menganggap cosine sama dengan dot product;
- menganggap magnitude besar pasti cosine besar;
- menyebut cosine $1$ berarti objects identik;
- membagi dengan zero norm.

---

# Latihan 6 — Dari Participant Vectors ke Feature Matrix

**Objective:** LO-02.7  
**Difficulty:** Medium  
**Concept tested:** matrix, shape, indexing, transpose, schema

## Prompt

Gunakan canonical HerAI data:

| Participant | $q$ | $c$ |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

Dengan rows = participants dan columns = `[q,c]`:

1. tuliskan feature matrix $\mathbf{X}$;
2. tuliskan shape $\mathbf{X}$;
3. apa arti $X_{32}$?
4. hubungkan $X_{32}$ dengan notation $x_j^{(i)}$;
5. tuliskan row untuk Bima sebagai participant vector;
6. tuliskan completion column;
7. tentukan shape $\mathbf{X}^{\top}$;
8. jelaskan mengapa transpose tidak boleh dianggap “memperbaiki” feature-order error.

## Expected Reasoning

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

$$
X_{32}=1.00=x_2^{(3)}.
$$

Bima row:

$$
\begin{bmatrix}
0.60&0.625
\end{bmatrix}.
$$

Completion column:

$$
\begin{bmatrix}
0.75\\
0.625\\
1.00\\
0.50
\end{bmatrix}.
$$

Transpose shape:

$$
2\times4.
$$

Transpose hanya mengubah orientation. Semantic schema tetap harus benar.

## Rubric — 12 poin

- matrix: 3
- shape: 1
- indexing: 2
- row/column extraction: 3
- transpose shape: 1
- semantic reasoning: 2

## Common Mistakes

- membaca shape sebagai columns × rows;
- menganggap $X_{32}$ row 2 column 3;
- mengubah semantics saat transpose tanpa declaration.

---

# Latihan 7 — Matrix Multiplication: Shape Gate dan Batch Score

**Objective:** LO-02.8, LO-02.9  
**Difficulty:** High  
**Concept tested:** shape compatibility, matrix-vector product, matrix-matrix product

## Prompt

Gunakan:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80&0.75\\
0.60&0.625\\
0.90&1.00\\
0.70&0.50
\end{bmatrix}
\in\mathbb{R}^{4\times2}
$$

dan:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.60\\
0.40
\end{bmatrix},
$$

dengan mathematical column shape:

$$
2\times1.
$$

1. jelaskan mengapa $\mathbf{X}\boldsymbol{\theta}$ valid;
2. tentukan output shape;
3. hitung seluruh output;
4. interpretasikan setiap row output secara aman;
5. apakah $\boldsymbol{\theta}^{\top}\mathbf{X}$ valid dalam orientation yang ditulis? Jelaskan berdasarkan shape;
6. diberikan:

$$
\mathbf{W}
=
\begin{bmatrix}
0.60&0.20\\
0.40&0.80
\end{bmatrix},
$$

tentukan shape $\mathbf{X}\mathbf{W}$;
7. tanpa menghitung seluruh product, hitung entry row pertama, column kedua;
8. jelaskan mengapa product yang shape-compatible masih bisa semantically salah jika columns $\mathbf{W}$ tidak didefinisikan.

## Expected Reasoning

Inner dimension:

$$
(4\times2)(2\times1)
\rightarrow
4\times1.
$$

Output:

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

Output adalah toy instructional scores per participant, bukan probabilities.

$\boldsymbol{\theta}^{\top}$ memiliki shape $1\times2$, sehingga:

$$
(1\times2)(4\times2)
$$

tidak valid karena inner dimensions $2$ dan $4$ tidak match.

Untuk $\mathbf{X}\mathbf{W}$:

$$
(4\times2)(2\times2)
\rightarrow
4\times2.
$$

Entry $(1,2)$:

$$
0.80(0.20)+0.75(0.80)
=
0.16+0.60
=
0.76.
$$

Shape compatibility tidak mendefinisikan semantics output. Meaning columns $\mathbf{W}$ harus ditetapkan.

## Rubric — 16 poin

- shape gate: 3
- output shape: 1
- batch computation: 4
- reverse-order audit: 2
- $\mathbf{X}\mathbf{W}$ shape: 2
- one entry: 2
- semantics: 2

## Common Mistakes

- mengalikan shape numbers;
- menggunakan elementwise multiplication;
- menganggap product commutative;
- menganggap output otomatis probability.

---

# Latihan 8 — Integrated HerAI Linear Algebra Reasoning Audit

**Objective:** LO-02.1–LO-02.10  
**Difficulty:** High  
**Concept tested:** full-submodule integration

## Prompt

Seorang anggota tim HerAI mengusulkan pipeline berikut:

1. gunakan feature order `[completion ratio, quiz ratio]` untuk sebagian participants tetapi `[quiz ratio, completion ratio]` untuk participants lain;
2. tambahkan `study duration` dalam raw minutes tanpa scaling;
3. pilih nearest participant menggunakan Euclidean distance;
4. untuk candidate materials, gunakan cosine similarity antara participant vector dan material vector;
5. sebut cosine $0.92$ sebagai “92% kemungkinan cocok”;
6. susun participant data menjadi matrix $\mathbf{X}$;
7. kalikan $\mathbf{X}$ dengan weight matrix yang shape-compatible;
8. sebut output terbesar sebagai “rekomendasi terbaik” tanpa mendefinisikan output semantics.

Tugas:

Untuk setiap langkah, beri label:

- **SAFE AS WRITTEN**
- **MATHEMATICALLY POSSIBLE BUT SEMANTICALLY UNSAFE**
- **MATHEMATICALLY / STRUCTURALLY INVALID**
- **NEEDS MORE INFORMATION**

Kemudian berikan alasan.

Terakhir, tuliskan versi pipeline yang lebih aman dari:

**feature schema → representation → scale audit → metric/operation → matrix computation → interpretation**.

## Staged Hints

### Hint 1

Pisahkan tiga audit:

1. representation;
2. mathematics;
3. interpretation.

### Hint 2

Shape compatibility hanya menjawab satu jenis pertanyaan.

### Hint 3

Similarity score tidak memiliki probability semantics secara otomatis.

### Hint 4

Metric yang berbeda menjawab pertanyaan geometry yang berbeda.

## Expected Reasoning

Minimal points:

1. inconsistent feature order → structurally/semantically invalid representation;
2. raw duration + ratios → mathematically possible tetapi scale-sensitive dan unsafe tanpa design decision;
3. Euclidean nearest participant → possible jika representation/scale compatible, tetapi “nearest” bukan automatic best match;
4. cosine participant-material → needs shared vector-space semantics dan nonzero vectors;
5. cosine $0.92$ → tidak boleh disebut $92\%$ probability;
6. matrix construction → safe jika row/column contract konsisten;
7. shape-compatible matrix product → mathematically possible, semantics tetap harus didefinisikan;
8. maximum output → tidak otomatis best recommendation.

Pipeline yang lebih aman harus:

- menetapkan feature meanings dan order;
- memvalidasi units/scales;
- memastikan vectors berada pada compatible representation space;
- memilih metric/operation sesuai pertanyaan;
- memeriksa dimension/shape;
- menghitung;
- menginterpretasikan output sesuai definisi;
- memisahkan score/similarity dari probability dan decision policy.

## Rubric — 20 poin

- representation audit: 4
- scale/metric audit: 4
- cosine/probability safety: 3
- matrix/shape audit: 3
- output interpretation: 3
- reconstructed safe pipeline: 3

## Strong Answer Example

Jawaban terbaik tidak hanya mengatakan “salah” atau “benar”, tetapi menyebut **jenis error**. Misalnya, raw duration dapat secara matematis dimasukkan sebagai component ketiga, tetapi distance kemudian dapat didominasi unit menit. Itu bukan syntax error; itu representation/metric-design problem.

## Common Mistakes

- menganggap semua masalah sebagai arithmetic error;
- menganggap shape-compatible berarti semantically meaningful;
- menyebut cosine sebagai probability;
- menganggap nearest/highest score otomatis final decision.
