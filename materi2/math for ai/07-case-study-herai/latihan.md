# Latihan Final Terintegrasi — Submodule 07
## Integrated Case Study: Math for AI di HerAI

> Assessment ini **baru dan integratif**. Gunakan canonical case yang sama. Jawaban dan rubric tersedia terpisah di `kunci-jawaban-rubrik.md`.

---

## Latihan 1 — Data Contract dan Quantity Semantics

**Objective:** mengaudit semantic meaning sebelum menghitung.  
**Difficulty:** Intermediate  
**Coverage:** Topic 01 + seluruh semantic firewall

### Prompt

Untuk quantity berikut:

1. Bima $c=0.625$;
2. Alya AI interest $=0.80$;
3. Citra $h=0.94$;
4. Alya–Intro AI cosine $=0.9257$;
5. synthetic target $y=1$;
6. raw model score $\hat y=0.56$;
7. per-example loss $\ell$;
8. held-out accuracy $=0.75$.

Untuk setiap quantity, tulis:

- object;
- source class: observed/context, synthetic/engineered, derived, atau model-produced;
- semantic type;
- satu justified conclusion;
- satu prohibited conclusion.

Lalu jelaskan mengapa dua angka yang sama-sama berada pada $[0,1]$ tidak otomatis mempunyai semantic type yang sama.

---

## Latihan 2 — Representation, Dot Product, dan Cosine Ranking

**Objective:** menghubungkan shared feature representation dengan matching tanpa mengubah score menjadi probability.  
**Difficulty:** Apply/Analyze  
**Coverage:** Topic 01–02

### Prompt

Gunakan participant vector Bima:

$$
\mathbf{x}_{\mathrm{Bima}}
=
\begin{bmatrix}
0.50\\
0.70\\
0.60\\
0.40
\end{bmatrix}
$$

Candidate vectors:

$$
\mathbf{v}_{\mathrm{IntroAI}}
=
\begin{bmatrix}
1.00\\
0.60\\
0.30\\
0.20
\end{bmatrix}
$$

$$
\mathbf{v}_{\mathrm{Python}}
=
\begin{bmatrix}
0.20\\
1.00\\
0.50\\
0.10
\end{bmatrix}.
$$

Kerjakan:

1. hitung kedua dot products;
2. hitung kedua vector norms yang dibutuhkan;
3. hitung kedua cosine similarities;
4. tentukan ranking Bima antara Intro AI dan Belajar Python;
5. jelaskan mengapa raw dot-product ranking dan cosine ranking dapat berbeda;
6. jelaskan mengapa top cosine tidak boleh disebut probability atau educational proof.

---

## Latihan 3 — Data Diagnostics dan Corrupted Record

**Objective:** menggabungkan descriptive statistics dengan data-quality reasoning.  
**Difficulty:** Apply/Analyze  
**Coverage:** Topic 03 + Topic 01

### Prompt

Gunakan canonical completion ratios:

$$
[0.75,0.625,1.00,0.50].
$$

1. hitung mean;
2. hitung median;
3. hitung range;
4. jelaskan apa yang masing-masing summary tunjukkan dan apa yang tidak ditunjukkan;
5. sekarang bayangkan muncul record counterfactual `completion_ratio = 1.20`;
6. jelaskan minimal tiga kemungkinan root cause yang harus diaudit;
7. jelaskan mengapa automatic clipping menjadi `1.00` tanpa audit dapat berbahaya;
8. jika study duration dan quiz ratio pada empat canonical records mempunyai correlation sangat tinggi, jelaskan mengapa causal claim tetap tidak justified.

---

## Latihan 4 — Conditional Probability Tanpa Mengubah Score Menjadi Probability

**Objective:** menghitung conditional probability dari explicit event/count contract.  
**Difficulty:** Apply/Analyze  
**Coverage:** Topic 04 + Topic 02–03

### Prompt

Supplementary synthetic probability experiment memiliki:

$$
|\Omega|=16,
\quad
|A|=7,
\quad
|E|=8,
\quad
|A\cap E|=5.
$$

Dengan:

- $A$ = high-alignment record menurut synthetic threshold;
- $E$ = synthetic `completed_7d=1`.

Hitung:

1. $P(A)$;
2. $P(E)$;
3. $P(A\cap E)$;
4. $P(E\mid A)$;
5. $P(A\mid E)$;
6. $P(E^c\mid A)$.

Lalu jawab:

- mengapa $P(E\mid A)\neq P(A\mid E)$;
- mengapa $P(E\mid A)$ tidak membuktikan cosine menyebabkan completion;
- mengapa cosine $0.90$ tetap bukan probability 90%.

---

## Latihan 5 — Prediction Score, Error, Loss, dan Objective

**Objective:** menelusuri satu example dari matching score sampai loss.  
**Difficulty:** Apply/Analyze  
**Coverage:** Topic 05 + Topic 02/04

### Prompt

Untuk Bima–Belajar Python:

$$
s=0.8907,
\qquad
y=1.
$$

Toy model awal:

$$
\hat y=ws+b,
\qquad
w=0.5,
\qquad
b=0.1.
$$

Loss:

$$
\ell=\frac12(\hat y-y)^2.
$$

Kerjakan:

1. hitung $\hat y$;
2. hitung signed error $e=\hat y-y$;
3. hitung $\ell$;
4. jelaskan perbedaan $e$ dan $\ell$;
5. jelaskan perbedaan $\ell_i$ dan aggregate objective $J$;
6. jelaskan mengapa $\hat y$ bukan probability;
7. jelaskan mengapa $h(q,c)$ tidak dipakai sebagai target pada toy model ini.

---

## Latihan 6 — Gradient, Update, dan Learning Rate

**Objective:** menelusuri exact optimization state transition.  
**Difficulty:** Apply/Analyze  
**Coverage:** Topic 06 + Topic 05

### Prompt

Diketahui:

$$
\boldsymbol{\theta}_0
=
\begin{bmatrix}
0.5\\
0.1
\end{bmatrix},
$$

$$
\nabla J(\boldsymbol{\theta}_0)
=
\begin{bmatrix}
-0.043585209375\\
-0.01933125
\end{bmatrix},
$$

$$
\eta=0.1.
$$

Kerjakan:

1. hitung update vector $-\eta\nabla J$;
2. hitung $\boldsymbol{\theta}_1$;
3. jelaskan mengapa kedua parameter naik meskipun algoritmanya disebut Gradient Descent;
4. bedakan gradient, update, dan next parameter state;
5. diketahui $J_0\approx0.1083902602$ dan $J_1\approx0.1081768917$ — apa yang justified?
6. jika $\eta=2$ justru menghasilkan objective lebih tinggi, jelaskan mengapa itu tidak berarti gradient formula salah.

---

## Latihan 7 — Held-Out Evaluation dan Metric Semantics

**Objective:** membedakan training objective dari held-out evaluation dan educational outcomes.  
**Difficulty:** Analyze  
**Coverage:** Topic 07 + Topic 05–06

### Prompt

Held-out synthetic confusion counts:

$$
TP=5,
\quad TN=1,
\quad FP=2,
\quad FN=0.
$$

Training diagnostic confusion counts pada threshold yang sama:

$$
TP=6,
\quad TN=6,
\quad FP=2,
\quad FN=2.
$$

Kerjakan:

1. hitung held-out accuracy, precision, recall;
2. hitung training accuracy, precision, recall;
3. tunjukkan bahwa accuracy keduanya sama;
4. jelaskan minimal tiga perbedaan error behavior;
5. jelaskan mengapa held-out accuracy $0.75$ bukan “HerAI production accuracy 75%”;
6. jelaskan mengapa completion target bukan mastery;
7. bedakan training objective, evaluation metric, dan educational/product outcome.

---

## Latihan 8 — End-to-End Failure-Mode Audit

**Objective:** melakukan integrated system reading dan conclusion-boundary audit.  
**Difficulty:** Challenge  
**Coverage:** Topic 01–07

### Prompt

Audit statement berikut:

> “Citra punya cosine 0.9081 sehingga probability suksesnya 90.81%. Karena model kemudian menurunkan training loss dan held-out accuracy mencapai 75%, Matematika Dasar terbukti menjadi rekomendasi terbaik untuk Citra dan sistem sudah siap dipakai.”

Tugas:

1. identifikasi **minimal 10** semantic, mathematical, data, optimization, evaluation, atau system-level failures;
2. petakan masing-masing failure ke stage pipeline;
3. tulis ulang statement menjadi conclusion yang defensible;
4. sebutkan evidence apa yang masih dibutuhkan sebelum mengklaim educational effectiveness;
5. sebutkan evidence/system work apa yang masih dibutuhkan sebelum deployment/go-live claim;
6. tutup dengan satu paragraph yang menjelaskan peran matematika dalam AI **tanpa** mengatakan matematika sendirian cukup untuk system correctness.
