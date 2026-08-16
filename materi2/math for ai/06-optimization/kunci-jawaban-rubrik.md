# Kunci Jawaban dan Rubrik — Final Assessment Submodule 06 Optimization

# A. Model Answer + Rubric untuk Latihan Terintegrasi

---

## Latihan 1 — Per-Example Loss → Objective → Metric

### Model answer

Aggregate objective:

$$
J
=
\frac{0.16+0.04+0.25+0.09}{4}
=
\frac{0.54}{4}
=
0.135.
$$

Classification:

- $0.16,0.04,0.25,0.09$ = per-example losses;
- $0.135$ = aggregate training objective pada convention soal;
- validation accuracy $82\%$ = evaluation metric pada validation data;
- completion rate $68\%$ = product/business metric.

Validation accuracy tidak otomatis menjadi term training objective. Secara matematis quantity yang sama **dapat** dipakai dalam lebih dari satu role jika design explicitly mendefinisikannya demikian, tetapi role tidak boleh diasumsikan dari nama/angka.

Product completion juga tidak otomatis menjadi model evaluation metric. Ia dapat dipengaruhi banyak komponen system dan perlu definisi pengukuran sendiri.

Claim “objective turun, validation accuracy pasti naik” tidak valid. Safe report:

> Aggregate training objective pada data/definition ini adalah $0.135$ dan lebih rendah daripada $0.20$ sebelumnya; validation accuracy serta product metrics harus diperiksa terpisah sebelum membuat claim yang lebih luas.

### Rubric — 10 points

- 2: average objective benar;
- 2: empat role quantity dibedakan;
- 2: training objective vs validation metric reasoning;
- 1: product metric boundary;
- 2: guaranteed-improvement claim ditolak;
- 1: safe reporting statement.

---

## Latihan 2 — Minimization + One-Step GD

### Model answer

Untuk:

$$
J(w)=(w-2)^2,
$$

candidate values:

| $w$ | $J(w)$ |
|---:|---:|
| $-1$ | $9$ |
| $0$ | $4$ |
| $1$ | $1$ |
| $2$ | $0$ |
| $3$ | $1$ |

Nilai minimum pada candidate set adalah:

$$
0.
$$

Minimizer:

$$
\operatorname*{arg\,min}_{w\in\{-1,0,1,2,3\}}J(w)=\{2\}.
$$

Derivative:

$$
J'(w)=2(w-2).
$$

Pada $w_0=0$:

$$
J'(0)=-4.
$$

Update:

$$
w_1
=
0-0.25(-4)
=
1.
$$

Objective:

$$
J(w_0)=4,
\qquad
J(w_1)=1.
$$

Gradient/derivative adalah local-change information. Scaled gradient adalah $\eta J'(w_0)=-1$. Displacement yang diterapkan adalah $-\eta J'(w_0)=+1$. Next state adalah $w_1=1$.

Satu successful step tidak membuktikan universal convergence atau global-minimum guarantee.

### Rubric — 10 points

- 2: candidate objective values;
- 1: minimum value vs argmin benar;
- 2: derivative/evaluation;
- 2: update + objective baru;
- 2: gradient/scaled/update/state distinction;
- 1: guarantee overclaim ditolak.

---

## Latihan 3 — Learning Rate Trajectories

### Model answer

Initial:

$$
w_0=0,
\qquad
J(w_0)=16,
\qquad
J'(0)=-8.
$$

### A. $\eta_A=0.25$

Step 1:

$$
w_1
=
0-0.25(-8)
=
2,
$$

$$
J(w_1)=4.
$$

Gradient baru:

$$
J'(2)=-4.
$$

Step 2:

$$
w_2
=
2-0.25(-4)
=
3,
$$

$$
J(w_2)=1.
$$

Trajectory:

| $t$ | $w_t$ | $J(w_t)$ |
|---:|---:|---:|
| 0 | 0 | 16 |
| 1 | 2 | 4 |
| 2 | 3 | 1 |

### B. $\eta_B=1.2$

Step 1:

$$
w_1
=
0-1.2(-8)
=
9.6,
$$

$$
J(w_1)
=
(9.6-4)^2
=
31.36.
$$

Gradient baru:

$$
J'(9.6)=11.2.
$$

Step 2:

$$
w_2
=
9.6-1.2(11.2)
=
-3.84,
$$

$$
J(w_2)
=
(-3.84-4)^2
=
61.4656.
$$

Trajectory:

| $t$ | $w_t$ | $J(w_t)$ |
|---:|---:|---:|
| 0 | 0 | 16 |
| 1 | 9.6 | 31.36 |
| 2 | -3.84 | 61.4656 |

Pada trace ini, $\eta_A$ menghasilkan approach yang lebih terkendali, sedangkan $\eta_B$ terlalu agresif dan objective membesar. Itu tidak membuat $0.25$ universal-best atau $1.2$ universal-bad.

Learning rate sangat kecil juga bukan rule universal “paling aman”: ia dapat menghasilkan progress sangat lambat, dan scaling/geometry problem menentukan behavior.

Objective tidak dijamin turun setiap update untuk semua objective/step-size/stochastic setting.

### Rubric — 10 points

- 3: trace A benar;
- 3: trace B benar;
- 1: trajectory comparison;
- 1: large-LR overclaim ditolak;
- 1: small-LR overclaim ditolak;
- 1: monotonic-loss boundary benar.

---

## Latihan 4 — Batch / Minibatch / Stochastic

### Model answer

Full-batch:

$$
g_{\text{full}}
=
\frac{2+6-2+10}{4}
=
4.
$$

Minibatch A:

$$
g_A
=
\frac{2+6}{2}
=
4.
$$

Minibatch B:

$$
g_B
=
\frac{-2+10}{2}
=
4.
$$

Single example 3:

$$
g_{\text{single}}=-2.
$$

Dengan $\theta_t=1$ dan $\eta=0.1$:

$$
\theta_{\text{full,next}}
=
1-0.1(4)
=
0.6.
$$

$$
\theta_{A,\text{next}}=0.6,
\qquad
\theta_{B,\text{next}}=0.6.
$$

$$
\theta_{\text{single,next}}
=
1-0.1(-2)
=
1.2.
$$

Pada angka khusus ini kedua minibatch kebetulan sama dengan full-batch. Itu **bukan property universal**. Minibatch gradient berasal dari subset yang dipakai pada current state dan dapat berbeda dari full gradient.

“Stochastic” bukan random-number replacement; gradient tetap dihitung dari sampled data/example.

Full-batch tidak otomatis “lebih baik” secara keseluruhan hanya karena gradient terhadap full training objective lebih exact pada state itu. Computational cost, update frequency, stochasticity, dan problem context berbeda.

Tidak ada conclusion generalization dari satu comparison gradient saja.

### Rubric — 10 points

- 2: full-batch gradient;
- 2: minibatch gradients;
- 1: single-example gradient;
- 2: next states;
- 1: subset reasoning;
- 1: stochastic misconception ditolak;
- 1: full-batch/generalization overclaim ditolak.

---

## Latihan 5 — Momentum + Adam Concept Map

### Model answer

Step 1:

$$
u_1
=
0.5(0)-0.1(2)
=
-0.2,
$$

$$
\theta_1=-0.2.
$$

Step 2:

$$
u_2
=
0.5(-0.2)-0.1(2)
=
-0.1-0.2
=
-0.3,
$$

$$
\theta_2
=
-0.2-0.3
=
-0.5.
$$

Step 3:

$$
u_3
=
0.5(-0.3)-0.1(-2)
=
-0.15+0.2
=
0.05,
$$

$$
\theta_3
=
-0.5+0.05
=
-0.45.
$$

Pada step 3, gradient terbaru negatif tetapi velocity menjadi small positive karena merupakan kombinasi memory term dan current gradient term. Sign terbaru tidak berdiri sendiri.

Momentum menambah state/velocity yang membawa historical information.

Adam secara konseptual menyimpan:

1. moving average / first-moment estimate dari gradient;
2. moving average dari squared gradient / second raw-moment state.

Adaptive scaling tidak menghilangkan learning rate dan tidak memberi universal tuning/optimality guarantee.

Trace ini hanya menunjukkan mechanics pada satu synthetic gradient sequence.

### Rubric — 10 points

- 4: tiga velocity/parameter steps benar;
- 1: step-3 sign interpretation;
- 1: Momentum state concept;
- 2: dua Adam state concepts;
- 1: adaptive/tuning boundary;
- 1: universal-superiority overclaim ditolak.

---

## Latihan 6 — Regularization + Generalization

### Model answer

Untuk $w_A=2$:

$$
J_{\text{train}}(2)=0,
$$

$$
J_{\text{reg}}(2)
=
0+0.5(4)
=
2.
$$

Untuk $w_B=1.5$:

$$
J_{\text{train}}(1.5)
=
(-0.5)^2
=
0.25,
$$

$$
J_{\text{reg}}(1.5)
=
0.25+0.5(2.25)
=
0.25+1.125
=
1.375.
$$

Menurut training-fit term saja, $w_A$ lebih baik. Menurut regularized objective, $w_B$ lebih baik.

Regularization mengubah objective yang diberikan ke optimizer, sehingga ranking candidate dapat berubah.

Generalization/evaluation gaps:

$$
G_A=0.24-0.05=0.19,
$$

$$
G_B=0.14-0.08=0.06.
$$

Model A mempunyai training quantity lebih rendah, tetapi Model B mempunyai evaluation quantity lebih rendah pada data evaluasi tersebut.

Larger $\lambda$ tidak otomatis lebih baik; terlalu kuat penalty dapat merusak fit/menyebabkan underfitting.

Regularization adalah design/preference pada learning problem/objective, sedangkan optimizer adalah algorithm untuk mengubah parameter terhadap objective.

### Rubric — 10 points

- 3: candidate calculations;
- 1: training-fit preference;
- 1: regularized preference;
- 1: objective-change reasoning;
- 1: gap calculations;
- 1: training vs evaluation diagnosis;
- 1: lambda boundary;
- 1: regularization vs optimizer distinction.

---

## Latihan 7 — HerAI Synthetic Update

### Model answer

At $w_0=0.50$:

Alya:

$$
\ell^{(A)}
=
(0.50-0.78)^2
=
(-0.28)^2
=
0.0784.
$$

Bima:

$$
\ell^{(B)}
=
(0.50-0.61)^2
=
(-0.11)^2
=
0.0121.
$$

Aggregate objective:

$$
J
=
\frac{0.0784+0.0121}{2}
=
0.04525.
$$

Per-example gradients:

$$
g_A
=
2(0.50-0.78)
=
-0.56,
$$

$$
g_B
=
2(0.50-0.61)
=
-0.22.
$$

Full-batch gradient:

$$
g_{\text{full}}
=
\frac{-0.56-0.22}{2}
=
-0.39.
$$

Full-batch update:

$$
w_1
=
0.50-0.20(-0.39)
=
0.578.
$$

Alya-only update:

$$
w_{1,A}
=
0.50-0.20(-0.56)
=
0.612.
$$

Perbedaan next parameters terjadi karena gradient information yang digunakan berbeda.

Safety interpretation:

- $h_A=0.78$ dan $h_B=0.61$ tetap canonical instructional scores;
- $w_{\text{syn}}$ dibuat khusus latihan;
- synthetic loss bukan evidence tentang production training objective;
- optimization update tidak menghasilkan causal recommendation rule.

Sebelum real-world quality claim, perlu evaluation definition/data, unseen-data performance, relevant system/product metrics, data validity, fairness/calibration/robustness checks sesuai problem, serta production assumptions.

### Rubric — 10 points

- 2: two losses;
- 1: aggregate objective;
- 2: per-example gradients;
- 1: full-batch gradient;
- 1: full-batch update;
- 1: single-example update;
- 1: difference explained;
- 1: HerAI/production safety reasoning.

---

## Latihan 8 — End-to-End Claim Audit

### Model answer

Expected corrections:

1. **Loss/objective/metric/business metric:** roles berbeda; mathematical form kadang overlap tetapi tidak otomatis interchangeable.
2. **`argmin`:** mengembalikan parameter/minimizer, bukan minimum objective value.
3. **Gradient:** local-change vector/scalar derivative information; bukan update state.
4. **Negative gradient:** local descent direction under standard framing; bukan global-minimum guarantee.
5. **Learning rate:** larger tidak universal faster/better.
6. **Loss trajectory:** monotonic decrease tidak universal guarantee.
7. **Minibatch:** gradient berbeda dari full-batch dapat valid karena subset berbeda.
8. **SGD terminology:** strict stochastic dapat berarti one example, tetapi praktik sering memakai label SGD untuk minibatch stochastic methods.
9. **Momentum:** historical state dapat mengubah trajectory; tidak universal superior.
10. **Adam:** adaptive moment estimates tidak menghapus learning rate/tuning dan tidak universal best.
11. **Regularization:** bukan optimizer; mengubah/menambah preference pada objective/learning problem.
12. **Generalization:** lower training loss tidak otomatis lower evaluation loss atau better real-world performance.
13. **HerAI:** $0.94$ adalah instructional score, bukan probability.
14. **Weights:** fixed $0.6/0.4$ tidak terbukti learned atau causal importance.

Safe rewrite example:

> Training mengoptimalkan objective yang telah didefinisikan dengan update berbasis gradient atau gradient estimate. Learning rate, batching, dan optimizer state memengaruhi trajectory, tetapi tidak memberi universal guarantee terhadap monotonic loss, global optimum, atau generalization. Momentum dan Adam menggunakan historical gradient information dengan cara berbeda dan tetap membutuhkan problem-appropriate settings. Regularization dapat mengubah learning objective, tetapi bukan optimizer dan bukan jaminan unseen performance. Evaluation dan business metrics harus diperiksa terpisah. Dalam canonical HerAI case, $h(q,c)=0.6q+0.4c$ tetap instructional score; nilainya, termasuk Citra $0.94$, bukan otomatis probability, production loss, learned weight evidence, atau causal importance.

### Rubric — 10 points

- 4: minimal 12 misconception corrections substantive;
- 2: optimization mechanics distinctions;
- 1: batch/optimizer-state distinctions;
- 1: regularization/generalization boundary;
- 1: HerAI score/probability/causality safety;
- 1: rewritten paragraph academically safe.

---

# B. Kunci Final Integrated Quiz

| No. | Jawaban | Alasan ringkas |
|---:|:---:|---|
| 1 | B | `argmin` mengacu pada minimizer/parameter, bukan hanya nilai objective minimum. |
| 2 | B | Regularization dapat mengubah objective; optimizer tetap mechanism terpisah. |
| 3 | B | $(0.10+0.30+0.20+0.40)/4=0.25$. |
| 4 | C | $J'(1)=-4$, sehingga $w_1=1-0.25(-4)=2$. |
| 5 | C | $(2+8)/2=5$. |
| 6 | C | $0.5(-0.4)-0.1(-2)=-0.2+0.2=0$. |
| 7 | B | Diagnosis valid hanya pada trajectory/context tersebut; tidak universal. |
| 8 | B | Adam memakai historical moment information dan tetap tidak memberi universal guarantee. |
| 9 | B | B memiliki evaluation quantity lebih rendah walau training quantity lebih tinggi. |
| 10 | C | Canonical $h$ adalah instructional score; semantics lain memerlukan definition/evidence. |

## MCQ taxonomy check

- Recall: 1
- Understand: 1
- Apply: 4
- Analyze: 4
- Apply/Analyze: **8/10 = 80%**

---

# C. Discussion Guidance

## Diskusi 1 — Training vs Evaluation

### Strong-answer indicators

- optimizer role disebut secara eksplisit;
- training objective dan evaluation quantity dipisahkan;
- Adam/Momentum tidak dijadikan generalization guarantee;
- regularization diposisikan sebagai learning-objective/design bridge;
- broader ML concepts diakui sebagai scope berikutnya;
- diagnosis evidence-driven, bukan mengganti optimizer secara refleks.

### Discussion rubric — 10 points

- 2: optimizer role;
- 2: training/evaluation distinction;
- 1: optimizer-switch overclaim rejected;
- 1: regularization bridge;
- 2: evidence/diagnosis reasoning;
- 1: scope boundary;
- 1: communication/technical precision.

## Diskusi 2 — HerAI Semantics

### Strong-answer indicators

- score/probability/loss/objective/metric/product metric dipisahkan;
- target dan prediction semantics diminta sebelum probability/loss claim;
- trainable parameter dipisahkan dari canonical fixed weights;
- optimizer dipisahkan dari objective;
- regularization dipisahkan dari optimizer;
- causal claim tidak disimpulkan dari optimized predictive score;
- production readiness memerlukan evaluation/evidence yang lebih luas.

### Discussion rubric — 10 points

- 3: quantity-role separation;
- 1: target/data contract;
- 1: parameter/optimizer distinction;
- 1: regularization distinction;
- 1: generalization evidence;
- 1: causal boundary;
- 1: production readiness boundary;
- 1: clarity.
