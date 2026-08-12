# Kuis Submodul 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks

> **Jumlah:** 10 MCQ  
> **Pilihan per soal:** 4  
> **Correct answer:** 1 best answer  
> **Bloom distribution:** 2 Understand, 4 Apply, 4 Analyze  
> **Apply/Analyze:** 8/10 = 80%  
> **Fokus:** computation + conceptual interpretation + misconception diagnosis

---

# Soal 1

Diberikan participant vector:

$$
\mathbf{x}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

dengan schema `[quiz ratio, completion ratio]`.

Pernyataan paling tepat adalah:

A. $\mathbf{x}$ adalah participant Alya secara lengkap.  
B. Karena kedua entries berada pada range $0$–$1$, keduanya adalah probabilities.  
C. $\mathbf{x}$ adalah ordered numerical representation yang maknanya bergantung pada feature schema.  
D. Urutan kedua entries dapat ditukar tanpa mengubah meaning.

**Correct answer:** C  
**LO:** LO-02.1  
**Difficulty:** Easy  
**Bloom:** Understand

**Rationale:** Vector merepresentasikan selected numerical features dengan ordered semantics. Ia bukan real-world participant, dan range $0$–$1$ tidak otomatis probability.

**Why distractors are wrong:**

- A: representation ≠ underlying person;
- B: range tidak menentukan probability semantics;
- D: feature order adalah bagian dari schema.

---

# Soal 2

Diberikan:

$$
\mathbf{x}\in\mathbb{R}^{3}.
$$

Apa yang dapat disimpulkan langsung?

A. Norm $\mathbf{x}$ adalah $3$.  
B. Vector mempunyai tiga components.  
C. Setiap component bernilai antara $0$ dan $1$.  
D. Vector memiliki shape matrix $3\times3$.

**Correct answer:** B  
**LO:** LO-02.2  
**Difficulty:** Easy  
**Bloom:** Understand

**Rationale:** $\mathbb{R}^{3}$ menyatakan vector real dengan tiga components.

**Why distractors are wrong:**

- A: dimension bukan magnitude;
- C: tidak ada range tersebut dalam notation;
- D: vector dimension $3$ tidak berarti matrix $3\times3$.

---

# Soal 3

Diberikan:

$$
\mathbf{x}
=
\begin{bmatrix}
0.8\\
0.6
\end{bmatrix},
\qquad
\mathbf{y}
=
\begin{bmatrix}
0.3\\
0.2
\end{bmatrix}.
$$

Nilai:

$$
\mathbf{x}-\mathbf{y}
$$

adalah:

A. $\begin{bmatrix}0.5\\0.4\end{bmatrix}$  
B. $\begin{bmatrix}1.1\\0.8\end{bmatrix}$  
C. $0.9$  
D. $\begin{bmatrix}0.24\\0.12\end{bmatrix}$

**Correct answer:** A  
**LO:** LO-02.3  
**Difficulty:** Easy–Medium  
**Bloom:** Apply

**Rationale:** Vector subtraction dilakukan component-wise.

**Why distractors are wrong:**

- B: itu addition;
- C: subtraction menghasilkan vector, bukan langsung distance/scalar;
- D: itu component-wise multiplication.

---

# Soal 4

Alya dan Bima mempunyai difference vector:

$$
\mathbf{x}_A-\mathbf{x}_B
=
\begin{bmatrix}
0.20\\
0.125
\end{bmatrix}.
$$

Euclidean distance mereka adalah:

A. $0.325$  
B. $0.20$  
C. $0.015625$  
D. $\sqrt{0.20^2+0.125^2}$

**Correct answer:** D  
**LO:** LO-02.4  
**Difficulty:** Medium  
**Bloom:** Apply

**Rationale:** Euclidean distance adalah L2 norm dari difference vector.

**Why distractors are wrong:**

- A: menjumlahkan differences tanpa square/root;
- B: hanya memakai satu component;
- C: hanya satu squared component.

---

# Soal 5

Diberikan:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
0.6\\
0.4
\end{bmatrix},
\qquad
\mathbf{x}
=
\begin{bmatrix}
0.8\\
0.75
\end{bmatrix}.
$$

Nilai $\boldsymbol{\theta}^{\top}\mathbf{x}$ adalah:

A. $1.55$  
B. $0.30$  
C. $0.78$  
D. $\begin{bmatrix}0.48\\0.30\end{bmatrix}$

**Correct answer:** C  
**LO:** LO-02.5  
**Difficulty:** Medium  
**Bloom:** Apply

**Rationale:**

$$
0.6(0.8)+0.4(0.75)=0.48+0.30=0.78.
$$

Dot product menghasilkan scalar.

**Why distractors are wrong:**

- A: menjumlahkan raw entries;
- B: hanya product component kedua;
- D: itu intermediate component-wise products, belum dijumlahkan.

---

# Soal 6

Jika:

$$
\mathbf{v}=3\mathbf{u}
$$

dan $\mathbf{u}\neq\mathbf{0}$, maka standard cosine similarity antara $\mathbf{u}$ dan $\mathbf{v}$ adalah:

A. $3$  
B. $0$  
C. bergantung hanya pada norm $\mathbf{u}$  
D. $1$

**Correct answer:** D  
**LO:** LO-02.6  
**Difficulty:** Medium  
**Bloom:** Apply

**Rationale:** Positive scaling mempertahankan direction, sehingga cosine similarity $=1$.

**Why distractors are wrong:**

- A: cosine tidak menjadi scale factor;
- B: zero berarti perpendicular pada nonzero vectors;
- C: normalization menghilangkan positive magnitude scaling.

---

# Soal 7

Sebuah sistem menghasilkan cosine similarity $0.94$ antara participant-need vector dan material-support vector.

Kesimpulan paling aman adalah:

A. Ada $94\%$ probability participant akan berhasil.  
B. Material tersebut pasti pilihan terbaik.  
C. Kedua real-world objects hampir identik.  
D. Pada representation dan metric yang didefinisikan, kedua vectors memiliki directional alignment tinggi.

**Correct answer:** D  
**LO:** LO-02.6, LO-02.9  
**Difficulty:** Medium–High  
**Bloom:** Analyze

**Rationale:** Cosine similarity adalah directional alignment score pada vector representation, bukan calibrated probability, causality, identity, atau final decision.

**Why distractors are wrong:**

- A: score ≠ probability;
- B: metric output ≠ complete decision policy;
- C: representation similarity ≠ object identity.

---

# Soal 8

Diberikan:

$$
\mathbf{X}
=
\begin{bmatrix}
0.8&0.7\\
0.6&0.5\\
0.9&1.0
\end{bmatrix}.
$$

Dengan rows = observations dan columns = features, pernyataan paling tepat adalah:

A. $\mathbf{X}\in\mathbb{R}^{2\times3}$ dan $X_{23}=0.5$.  
B. $\mathbf{X}\in\mathbb{R}^{3\times2}$ dan $X_{21}=0.6$.  
C. $\mathbf{X}\in\mathbb{R}^{3}$ karena ada tiga rows.  
D. $\mathbf{X}^{\top}$ tetap mempunyai shape $3\times2$.

**Correct answer:** B  
**LO:** LO-02.7  
**Difficulty:** Medium  
**Bloom:** Analyze

**Rationale:** Matrix memiliki $3$ rows dan $2$ columns. Entry row 2, column 1 adalah $0.6$.

**Why distractors are wrong:**

- A: shape terbalik dan column 3 tidak ada;
- C: matrix shape membutuhkan dua axes;
- D: transpose menjadi $2\times3$.

---

# Soal 9

Jika:

$$
\mathbf{A}\in\mathbb{R}^{4\times2},
\qquad
\mathbf{B}\in\mathbb{R}^{2\times3},
$$

maka:

A. $\mathbf{A}\mathbf{B}\in\mathbb{R}^{4\times3}$  
B. $\mathbf{A}\mathbf{B}\in\mathbb{R}^{2\times2}$  
C. product invalid karena shapes berbeda  
D. output harus mempunyai shape $8\times6$

**Correct answer:** A  
**LO:** LO-02.8  
**Difficulty:** Medium  
**Bloom:** Analyze

**Rationale:** Inner dimensions $2$ dan $2$ match; outer dimensions $4$ dan $3$ survive.

**Why distractors are wrong:**

- B: bukan aturan product shape;
- C: matrix multiplication tidak membutuhkan identical shapes;
- D: shape dimensions tidak dikalikan secara arithmetic.

---

# Soal 10

Tim mempunyai two matrices yang shape-compatible dan product-nya dapat dihitung. Namun column semantics matrix pertama adalah `[quiz ratio, completion ratio]`, sedangkan rows matrix kedua diasumsikan `[study duration, attendance]`.

Apa diagnosis terbaik?

A. Product pasti meaningful karena inner dimensions match.  
B. Product harus diubah menjadi cosine similarity.  
C. Product dapat mathematically valid tetapi semantically tidak justified karena aligned positions tidak merepresentasikan quantities yang compatible.  
D. Semua matrix multiplication selalu semantic-free sehingga masalah tersebut tidak relevan.

**Correct answer:** C  
**LO:** LO-02.8, LO-02.9, LO-02.10  
**Difficulty:** High  
**Bloom:** Analyze

**Rationale:** Shape compatibility adalah mathematical requirement. Meaningful multiplication juga membutuhkan semantic alignment dari dimensions yang dikombinasikan.

**Why distractors are wrong:**

- A: mathematical validity ≠ semantic validity;
- B: mengganti metric tidak memperbaiki schema mismatch;
- D: applied interpretation tetap bergantung pada representation semantics.

---

# Rekap Blueprint Kuis

| Soal | LO | Bloom | Fokus |
|---:|---|---|---|
| 1 | LO-02.1 | Understand | vector representation |
| 2 | LO-02.2 | Understand | dimension |
| 3 | LO-02.3 | Apply | vector subtraction |
| 4 | LO-02.4 | Apply | Euclidean distance |
| 5 | LO-02.5 | Apply | dot product |
| 6 | LO-02.6 | Apply | cosine scaling |
| 7 | LO-02.6/9 | Analyze | similarity interpretation |
| 8 | LO-02.7 | Analyze | matrix shape/index |
| 9 | LO-02.8 | Analyze | multiplication shape |
| 10 | LO-02.8/9/10 | Analyze | mathematical vs semantic validity |

Apply/Analyze:

$$
\frac{8}{10}\times100\%=80\%.
$$

Correct-answer sequence:

**C, B, A, D, C, D, D, B, A, C**
