# Topic 06 — Gradient dan Parameter Update
## Submodule 07 — Integrated Case Study: Math for AI di HerAI

> **Synthetic / hypothetical / instructional optimization only.** Topic ini melanjutkan **exact toy model dan exact objective Topic 05**. Ia bukan training recipe produksi HerAI. Canonical $h(q,c)=0.6q+0.4c$ tetap instructional score only dan tidak masuk objective ini.

---

# 1. HOOK / REAL PROBLEM — Objective sudah ada. Sekarang parameter bergerak ke mana?

Topic 05 mengunci:

$$
\hat y_i = w s_i+b
$$

dan:

$$
J(w,b)
=
\frac{1}{16}
\sum_{i=1}^{16}
\frac12(ws_i+b-y_i)^2.
$$

Initial parameter state:

$$
w_0=0.5,
\qquad
b_0=0.1.
$$

Initial objective:

$$
J(w_0,b_0)
\approx
0.1083902602.
$$

Sekarang pertanyaannya:

> **Bagaimana calculus memberi direction untuk mengubah $w$ dan $b$, lalu bagaimana optimization mengubah direction itu menjadi parameter state baru?**

Inilah distinction paling penting:

> **gradient $\neq$ update.**

Gradient memberi local sensitivity/direction information.

Update membutuhkan:

- current parameter state;
- gradient;
- learning rate;
- update rule.

---

# 2. PREDICT — Gradient negatif berarti parameter harus turun?

Misalkan:

$$
\frac{\partial J}{\partial w}<0.
$$

Apakah gradient descent membuat $w$ turun?

Belum tentu.

Gradient descent memakai:

$$
w_{t+1}
=
w_t
-
\eta
\frac{\partial J}{\partial w}.
$$

Jika derivative negatif, maka:

$$
-\eta
\frac{\partial J}{\partial w}
$$

menjadi positif.

Artinya $w$ justru dapat **naik**.

Jadi:

> gradient descent bukan “selalu mengecilkan parameter”.

Ia bergerak **berlawanan dengan gradient**.

---

# 3. LEARNING OUTCOMES

Setelah Topic 06, kamu diharapkan mampu:

1. menulis gradient objective terhadap $w$ dan $b$;
2. menjelaskan gradient sebagai vector partial derivatives;
3. membedakan current parameter, gradient, update vector, dan next parameter;
4. menjelaskan peran negative sign;
5. menjelaskan peran learning rate $\eta$;
6. menghitung exact full-batch gradient untuk toy HerAI objective;
7. melakukan satu complete Gradient Descent update;
8. recompute objective setelah update;
9. menjelaskan mengapa objective turun pada satu step tidak membuktikan production success;
10. menjelaskan mengapa learning rate terlalu besar dapat membuat objective naik;
11. memahami bahwa gradient harus dihitung ulang setelah parameter berubah;
12. menyiapkan optimization trace untuk Topic 07 — Evaluation, Failure Modes, dan What Comes Next.

---

# 4. REACTIVATE ONLY WHAT IS NEEDED

Learner sudah mengenal dari Calculus:

- partial derivative;
- gradient;
- chain rule;
- local rate of change.

Learner juga sudah mengenal dari Optimization:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t).
$$

Integrated Case tidak mengulang semuanya.

Kita akan memberi semua simbol itu **meaning pada case yang sama**.

---

# 5. SAME LOCKED MODEL CONTRACT

Input:

$$
s_i
$$

= cosine matching score.

Target:

$$
y_i\in\{0,1\}
$$

= synthetic 7-day completion outcome.

Model:

$$
\hat y_i=ws_i+b.
$$

Per-example loss:

$$
\ell_i(w,b)
=
\frac12(ws_i+b-y_i)^2.
$$

Aggregate objective:

$$
J(w,b)
=
\frac1{16}
\sum_{i=1}^{16}\ell_i(w,b).
$$

No reset.

No new dataset.

No use of $h$ as target.

---

# 6. PARAMETER VECTOR

Tuliskan:

$$
\boldsymbol{\theta}
=
\begin{bmatrix}
w\\
b
\end{bmatrix}.
$$

Initial state:

$$
\boldsymbol{\theta}_0
=
\begin{bmatrix}
0.5\\
0.1
\end{bmatrix}.
$$

Gradient:

$$
\nabla J(w,b)
=
\begin{bmatrix}
\frac{\partial J}{\partial w}\\
\frac{\partial J}{\partial b}
\end{bmatrix}.
$$

Gradient dan parameter mempunyai shape yang kompatibel:

$$
2\times1.
$$

Itu memungkinkan update component-wise.

---

# 7. DERIVE $\frac{\partial J}{\partial w}$

Objective:

$$
J(w,b)
=
\frac1{16}
\sum_{i=1}^{16}
\frac12(ws_i+b-y_i)^2.
$$

Untuk satu example:

$$
\ell_i
=
\frac12(ws_i+b-y_i)^2.
$$

Definisikan:

$$
e_i=ws_i+b-y_i.
$$

Maka:

$$
\ell_i=\frac12e_i^2.
$$

Chain rule:

$$
\frac{\partial \ell_i}{\partial w}
=
e_i
\frac{\partial e_i}{\partial w}.
$$

Karena:

$$
e_i=ws_i+b-y_i,
$$

maka:

$$
\frac{\partial e_i}{\partial w}=s_i.
$$

Sehingga:

$$
\frac{\partial \ell_i}{\partial w}
=
e_i s_i.
$$

Aggregate:

$$
\boxed{
\frac{\partial J}{\partial w}
=
\frac1{16}
\sum_{i=1}^{16}
(ws_i+b-y_i)s_i
}
$$

---

# 8. DERIVE $\frac{\partial J}{\partial b}$

Untuk satu example:

$$
\frac{\partial e_i}{\partial b}=1.
$$

Maka:

$$
\frac{\partial \ell_i}{\partial b}
=
e_i.
$$

Aggregate:

$$
\boxed{
\frac{\partial J}{\partial b}
=
\frac1{16}
\sum_{i=1}^{16}
(ws_i+b-y_i)
}
$$

Jadi:

$$
\boxed{
\nabla J(w,b)
=
\begin{bmatrix}
\frac1{16}\sum_i e_i s_i\\
\frac1{16}\sum_i e_i
\end{bmatrix}
}
$$

---

# 9. MATH / SYSTEM READING SKILL — APA ARTI GRADIENT INI?

Untuk:

$$
\nabla J(w,b),
$$

baca:

1. **Object:** current toy training objective.
2. **Input/current state:** current $w,b$ + 16 $s_i,y_i$ pairs.
3. **Operation:** partial derivatives aggregated across the full training table.
4. **Output:** two-component vector.
5. **Semantic type:** local sensitivity/direction information.
6. **Assumption:** differentiable squared objective.
7. **Justified conclusion:** nearby parameter changes interact with objective according to local derivatives.
8. **Not justified:** causal effect, probability, production feature importance.
9. **Downstream role:** multiplied by learning rate and negative sign to create update.
10. **Important:** gradient is computed **at a parameter state**.

Gradient bukan number yang “milik dataset selamanya”.

Kalau $w,b$ berubah, gradient perlu dihitung ulang.

---

# 10. WORKED BASIC MICRO-EXAMPLE

Misalkan satu toy example:

$$
s=0.8,
\qquad
y=1,
$$

dengan:

$$
w=0.5,
\qquad
b=0.1.
$$

Prediction:

$$
\hat y
=
0.5(0.8)+0.1
=
0.5.
$$

Residual:

$$
e=0.5-1=-0.5.
$$

Gradient contribution terhadap $w$:

$$
e s
=
(-0.5)(0.8)
=
-0.4.
$$

Gradient contribution terhadap $b$:

$$
e=-0.5.
$$

Ini belum full gradient dataset.

Ini hanya **one-example contribution**.

---

# 11. FULL-BATCH GRADIENT CONTRIBUTION TABLE

Pada initial state:

$$
w_0=0.5,
\qquad
b_0=0.1.
$$

| # | Participant | Material | $s_i$ | $y_i$ | $\hat y_i$ | $e_i$ | $e_i s_i$ |
|---:|---|---|---:|---:|---:|---:|---:|
| 01 | Alya | Intro AI | 0.9257 | 1 | 0.56285 | -0.43715 | -0.404670 |
| 02 | Alya | Belajar Python | 0.7523 | 1 | 0.47615 | -0.52385 | -0.394092 |
| 03 | Alya | Desain UI/UX | 0.5485 | 0 | 0.37425 | 0.37425 | 0.205276 |
| 04 | Alya | Matematika Dasar | 0.8753 | 1 | 0.53765 | -0.46235 | -0.404695 |
| 05 | Bima | Intro AI | 0.8612 | 1 | 0.53060 | -0.46940 | -0.404247 |
| 06 | Bima | Belajar Python | 0.8907 | 1 | 0.54535 | -0.45465 | -0.404957 |
| 07 | Bima | Desain UI/UX | 0.6258 | 0 | 0.41290 | 0.41290 | 0.258393 |
| 08 | Bima | Matematika Dasar | 0.7813 | 1 | 0.49065 | -0.50935 | -0.397955 |
| 09 | Citra | Intro AI | 0.9056 | 1 | 0.55280 | -0.44720 | -0.404984 |
| 10 | Citra | Belajar Python | 0.6828 | 0 | 0.44140 | 0.44140 | 0.301388 |
| 11 | Citra | Desain UI/UX | 0.4594 | 0 | 0.32970 | 0.32970 | 0.151464 |
| 12 | Citra | Matematika Dasar | 0.9081 | 0 | 0.55405 | 0.55405 | 0.503133 |
| 13 | Dewi | Intro AI | 0.7104 | 0 | 0.45520 | 0.45520 | 0.323374 |
| 14 | Dewi | Belajar Python | 0.7117 | 1 | 0.45585 | -0.54415 | -0.387272 |
| 15 | Dewi | Desain UI/UX | 0.8867 | 0 | 0.54335 | 0.54335 | 0.481788 |
| 16 | Dewi | Matematika Dasar | 0.6559 | 0 | 0.42795 | 0.42795 | 0.280692 |

Jumlah residual:

$$
\sum_{i=1}^{16}e_i
=
-0.309300.
$$

Jumlah weighted residual:

$$
\sum_{i=1}^{16}e_i s_i
=
-0.69736335.
$$

---

# 12. WORKED HerAI INTEGRATED EXAMPLE — EXACT GRADIENT

Maka:

$$
\frac{\partial J}{\partial w}
=
\frac{-0.69736335}{16}
=
-0.043585209375.
$$

Dan:

$$
\frac{\partial J}{\partial b}
=
\frac{-0.309300}{16}
=
-0.01933125.
$$

Jadi:

$$
\boxed{
\nabla J(\boldsymbol{\theta}_0)
=
\begin{bmatrix}
-0.043585209375\\
-0.01933125
\end{bmatrix}
}
$$

Interpretation:

Pada current parameter state, kedua partial derivatives negatif.

Ini **tidak** berarti:

- loss negatif;
- prediction negatif;
- parameter buruk;
- probability negatif.

Itu hanya tanda local slope terhadap masing-masing parameter.

---

# 13. UPDATE RULE

Kita kunci learning rate pedagogis:

$$
\eta=0.1.
$$

Ini **design choice untuk trace manual**, bukan claim bahwa $0.1$ universally optimal.

Update:

$$
\boldsymbol{\theta}_1
=
\boldsymbol{\theta}_0
-
\eta\nabla J(\boldsymbol{\theta}_0).
$$

Substitusi:

$$
\boldsymbol{\theta}_1
=
\begin{bmatrix}
0.5\\
0.1
\end{bmatrix}
-
0.1
\begin{bmatrix}
-0.043585209375\\
-0.01933125
\end{bmatrix}.
$$

Update vector:

$$
-\eta\nabla J
=
\begin{bmatrix}
0.0043585209375\\
0.001933125
\end{bmatrix}.
$$

Jadi:

$$
\boxed{
w_1
=
0.5043585209375
}
$$

$$
\boxed{
b_1
=
0.101933125
}
$$

Perhatikan:

> kedua parameter **naik**, walaupun nama algoritmanya “gradient descent”.

Yang “descent” adalah target arah objective, bukan aturan bahwa setiap parameter harus turun.

---

# 14. CURRENT PARAMETER VS GRADIENT VS UPDATE VS NEXT PARAMETER

| Quantity | Value | Semantic type |
|---|---|---|
| $w_0$ | $0.5$ | current parameter |
| $\partial J/\partial w$ | $-0.0435852$ | gradient component |
| $-\eta\partial J/\partial w$ | $+0.00435852$ | update component |
| $w_1$ | $0.50435852$ | next parameter |
| $b_0$ | $0.1$ | current parameter |
| $\partial J/\partial b$ | $-0.01933125$ | gradient component |
| $-\eta\partial J/\partial b$ | $+0.001933125$ | update component |
| $b_1$ | $0.101933125$ | next parameter |

Ini harus tetap terpisah.

---

# 15. RECOMPUTE OBJECTIVE AFTER ONE UPDATE

Initial:

$$
J_0
=
J(0.5,0.1)
\approx
0.1083902602.
$$

After update:

$$
J_1
=
J(0.5043585209375,0.101933125)
\approx
0.1081768917.
$$

Difference:

$$
J_1-J_0
\approx
-0.0002133685.
$$

Jadi pada exact step ini:

$$
J_1<J_0.
$$

Justified:

> One Gradient Descent step dengan $\eta=0.1$ menurunkan chosen synthetic training objective.

Not justified:

- model sekarang production-ready;
- recommendation lebih baik secara pedagogis;
- generalization membaik;
- probability menjadi lebih calibrated;
- satu step berarti training selesai.

---

# 16. ONE MORE ITERATION — GRADIENT HARUS DIHITUNG ULANG

Pada:

$$
(w_1,b_1)
=
(0.5043585209375,0.101933125),
$$

gradient baru adalah approximately:

$$
\nabla J(\boldsymbol{\theta}_1)
=
\begin{bmatrix}
-0.03950471242\\
-0.01407981957
\end{bmatrix}.
$$

Gradient berubah.

Kenapa?

Karena prediction berubah, residual berubah, dan slope objective di current location juga berubah.

Dengan learning rate sama:

$$
\eta=0.1,
$$

second update memberi:

$$
w_2
\approx
0.5083089922,
$$

$$
b_2
\approx
0.1033411070.
$$

Objective:

$$
J_2
\approx
0.1080109017.
$$

Trace:

$$
0.1083902602
\rightarrow
0.1081768917
\rightarrow
0.1080109017.
$$

Ini menunjukkan iteration.

Tetapi dua decreasing steps pun belum membuktikan generalization.

---

# 17. LEARNING RATE — APA YANG DIKONTROL?

Update:

$$
\Delta\boldsymbol{\theta}
=
-\eta\nabla J.
$$

Learning rate $\eta$ menskalakan magnitude step.

Dengan gradient yang sama:

- smaller $\eta$ → smaller update;
- larger $\eta$ → larger update.

Tetapi:

> lebih besar tidak otomatis lebih cepat atau lebih baik.

> lebih kecil juga tidak otomatis lebih aman secara universal.

Learning rate adalah hyperparameter yang effect-nya bergantung pada objective/data/state.

---

# 18. CHANGE ONE THING — LEARNING RATE TERLALU BESAR

Gunakan **gradient initial yang sama** tetapi ubah:

$$
\eta=2.
$$

Update:

$$
w_1
=
0.5
-
2(-0.043585209375)
=
0.58717041875.
$$

$$
b_1
=
0.1
-
2(-0.01933125)
=
0.1386625.
$$

Recompute objective:

$$
J
\approx
0.1094308453.
$$

Bandingkan:

$$
0.1094308453
>
0.1083902602.
$$

Jadi step besar ini justru **menaikkan objective**.

Important lesson:

> negative-gradient direction bersifat local; finite step size tetap harus dipilih dengan hati-hati.

Gradient Descent tidak menjamin setiap arbitrary learning-rate step menurunkan loss.

---

# 19. NEGATIVE SIGN — JANGAN DIHAFAL TANPA MAKNA

Gradient:

$$
\nabla J
$$

menunjuk ke direction local increase paling tajam di bawah standard Euclidean interpretation.

Untuk mencari descent direction, kita gunakan:

$$
-\nabla J.
$$

Learning rate mengontrol seberapa jauh kita bergerak:

$$
-\eta\nabla J.
$$

Jadi negative sign:

> bukan dekorasi formula.

Ia mengubah ascent direction menjadi descent direction.

---

# 20. FULL-BATCH MEANING

Gradient yang kita hitung memakai semua:

$$
16
$$

synthetic training examples sebelum update.

Karena itu ini adalah **full-batch gradient** untuk table tersebut.

Topic ini tidak perlu kembali mengajar full batch/minibatch/SGD dari nol.

Learner sudah tahu distinction dari Optimization.

Integrated Case hanya memastikan:

> exact gradient trace kita memakai **all 16 examples**.

---

# 21. WHY THIS MATTERS IN AI

Training loop secara konseptual:

```text
current parameters
      ↓
predictions
      ↓
loss/objective
      ↓
gradient at current parameters
      ↓
learning-rate-scaled update
      ↓
new parameters
      ↓
recompute
```

Common semantic bugs:

- menyebut gradient “error”;
- menyebut gradient sebagai update;
- lupa current state;
- tidak recompute gradient;
- menganggap loss turun = model generalizes;
- menganggap optimizer memperbaiki target semantics.

Optimizer hanya mengubah parameters untuk objective yang kita definisikan.

Ia tidak memilih apakah objective itu educationally meaningful.

---

# 22. MISCONCEPTION / FAILURE-MODE CHALLENGE

## 22.1 “Gradient = update”
**Salah.**

Update:

$$
-\eta\nabla J.
$$

## 22.2 “Negative gradient component berarti parameter harus turun”
**Salah.**

Subtracting negative value dapat menaikkan parameter.

## 22.3 “Loss harus turun setiap step”
**Tidak guaranteed untuk arbitrary step size.**

## 22.4 “Larger learning rate always faster”
**Salah.**

## 22.5 “Smaller learning rate always better”
**Salah.**

## 22.6 “Gradient tells causal feature importance”
**Salah.**

Gradient adalah derivative of chosen objective with respect to parameter state.

## 22.7 “One successful update means training success”
**Salah.**

## 22.8 “Optimizer fixes wrong target”
**Salah.**

## 22.9 “Lower training objective means better real-world learning”
**Salah.**

---

# 23. TRY IT YOURSELF

Gunakan:

$$
w=0.5,
\qquad
\frac{\partial J}{\partial w}=-0.04,
\qquad
\eta=0.2.
$$

Hitung:

$$
w_{\text{next}}
=
w
-
\eta
\frac{\partial J}{\partial w}.
$$

Solution:

$$
w_{\text{next}}
=
0.5
-
0.2(-0.04)
=
0.5+0.008
=
0.508.
$$

Question:

Mengapa $w$ naik?

Karena gradient component negatif dan update bergerak opposite to gradient.

---

# 24. VISUAL / INTERACTIVE ARCHITECTURE

## [STATIC VISUAL] — Parameter / gradient / update anatomy

**Learning purpose:** memisahkan empat quantity.  
**Initial state:** $\theta_t$, $\nabla J$, $-\eta\nabla J$, $\theta_{t+1}$.  
**Learner action:** trace left-to-right.  
**Expected behavior:** learner identifies current state vs direction vs movement vs next state.  
**Feedback:** each arrow labels operation.  
**Safety note:** gradient is not an update.

## [STEP-BY-STEP REVEAL] — Full gradient derivation

**Learning purpose:** connect residual → partial derivative → mean gradient.  
**Initial state:** hidden chain-rule steps.  
**Learner action:** reveal $e_i$, $e_is_i$, aggregation.  
**Expected behavior:** formula emerges from per-example contributions.  
**Feedback:** explains factor $s_i$ only appears in $w$ derivative.  
**Safety note:** derivative is local sensitivity, not causal effect.

## [NUMBER MANIPULATOR] — Learning rate

**Learning purpose:** show step-size effect.  
**Initial state:** exact $\theta_0$ and gradient.  
**Learner action:** vary $\eta$.  
**Expected behavior:** recompute update, next parameters, $J_{\text{next}}$.  
**Feedback:** flag decrease/increase.  
**Safety note:** no “best universal $\eta$”.

## [COMPARE VIEW] — $\eta=0.1$ vs $\eta=2$

**Learning purpose:** compare safe small pedagogical step with overshoot example.  
**Initial state:** same current gradient.  
**Learner action:** compare parameter jump and objective.  
**Expected behavior:** sees $J$ decrease for $0.1$ and increase for $2$.  
**Feedback:** highlights finite-step consequence.  
**Safety note:** one comparison does not define universally optimal learning rate.

## [INTERACTIVE VISUAL] — Two-iteration trace

**Learning purpose:** show gradient must be recomputed.  
**Initial state:** $t=0$.  
**Learner action:** click “next iteration”.  
**Expected behavior:** $\theta$, gradient, objective update at each step.  
**Feedback:** blocks reuse of stale gradient without warning.  
**Safety note:** decreasing training objective is not generalization evidence.

---

# 25. CHECKPOINT

1. Initial parameters?  
   $$w_0=0.5,\quad b_0=0.1.$$

2. Initial gradient?  
   $$
   \nabla J(\theta_0)
   =
   \begin{bmatrix}
   -0.043585209375\\
   -0.01933125
   \end{bmatrix}.
   $$

3. Learning rate?  
   $$\eta=0.1.$$

4. Update vector?  
   $$
   -\eta\nabla J
   =
   \begin{bmatrix}
   0.0043585209375\\
   0.001933125
   \end{bmatrix}.
   $$

5. New parameters?  
   $$w_1=0.5043585209375,$$
   $$b_1=0.101933125.$$

6. Initial objective?  
   $$J_0\approx0.1083902602.$$

7. After one update?  
   $$J_1\approx0.1081768917.$$

8. Does one decrease prove generalization?  
   **No.**

9. Is gradient equal to update?  
   **No.**

---

# 26. MASTERY CHECK — “I CAN…”

- **I can** derive $\partial J/\partial w$.
- **I can** derive $\partial J/\partial b$.
- **I can** read a gradient vector.
- **I can** distinguish gradient from update.
- **I can** explain the negative sign.
- **I can** calculate one Gradient Descent step.
- **I can** explain why a negative gradient component may increase a parameter.
- **I can** recompute objective after update.
- **I can** explain why gradient must be recomputed at new parameters.
- **I can** explain learning-rate tradeoffs.
- **I can** reject “one update = trained model”.
- **I can** reject “lower training objective = educational success”.

---

# 27. SCOPE BOUNDARY

Topic 06 does **not**:

- derive Momentum;
- derive Adam;
- teach RMSProp;
- implement autograd;
- teach neural-network backprop;
- perform hyperparameter search;
- prove convergence theorems;
- claim global-minimum guarantees for arbitrary models;
- claim production training;
- evaluate generalization.

Those concepts either sudah learner kenal secara orientation dari Optimization atau berada di luar Integrated Case core.

---

# 28. SUMMARY

Exact training trace:

$$
\boldsymbol{\theta}_0
=
\begin{bmatrix}
0.5\\
0.1
\end{bmatrix}
$$

$$
J_0\approx0.1083902602
$$

$$
\nabla J(\theta_0)
=
\begin{bmatrix}
-0.043585209375\\
-0.01933125
\end{bmatrix}
$$

$$
\eta=0.1
$$

$$
\boldsymbol{\theta}_1
=
\begin{bmatrix}
0.5043585209375\\
0.101933125
\end{bmatrix}
$$

$$
J_1\approx0.1081768917.
$$

Critical distinctions:

$$
\text{gradient}\neq\text{update}
$$

$$
\text{update}\neq\text{training success}
$$

$$
\text{lower training objective}\neq\text{generalization}
$$

$$
\text{optimizer success}\neq\text{educational-value proof}
$$

---

# 29. BRIDGE TO TOPIC 07 — EVALUATION, FAILURE MODES, DAN WHAT COMES NEXT

Kita sudah menyelesaikan mathematical chain:

```text
data
→ representation
→ diagnostics
→ uncertainty
→ raw model score
→ target
→ loss
→ objective
→ gradient
→ update
```

Sekarang pertanyaan terakhir:

> **Setelah training objective turun, bagaimana kita mengevaluasi system reasoning tanpa mencampurkan training fit, evaluation quantities, dan educational/product outcomes?**

Itulah fokus final topic:

# **Topic 07 — Evaluation, Failure Modes, dan What Comes Next**
