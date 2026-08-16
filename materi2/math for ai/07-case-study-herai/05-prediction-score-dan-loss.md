# Topic 05 — Prediction Score dan Loss
## Submodule 07 — Integrated Case Study: Math for AI di HerAI

> **Synthetic / hypothetical / instructional model only.** Topic ini **bukan** deskripsi model produksi HerAI. Target $y$ berasal dari supplementary synthetic 7-day session outcomes Topic 04. Canonical $h(q,c)=0.6q+0.4c$ tetap instructional score only dan **tidak** dipakai sebagai target, label, loss, objective, atau probability.

---

# 1. HOOK / REAL PROBLEM — Score matching sudah ada, tetapi model belajar dari apa?

Topic 02 memberi kita cosine similarity.

Topic 04 memberi kita synthetic outcome:

- `completed_7d = 1`;
- `completed_7d = 0`.

Sekarang ada dua quantity berbeda:

1. **matching score** $s$;
2. **observed synthetic outcome** $y$.

Pertanyaan baru:

> **Bisakah kita membuat toy model yang menggunakan matching score sebagai input untuk menghasilkan raw prediction score, lalu mengukur seberapa jauh output itu dari target sintetik?**

Inilah jembatan menuju training.

Tetapi kita harus menjaga batas:

> prediction score $\neq$ probability $\neq$ loss $\neq$ objective $\neq$ educational outcome.

---

# 2. PREDICT — Kalau output model 0.56, apakah berarti 56% chance?

Misalkan model toy menghasilkan:

$$
\hat y=0.56.
$$

Apakah itu otomatis:

> “56% probability complete”?

Tidak.

Pada Topic 05, $\hat y$ adalah **raw model score** dari model linear:

$$
\hat y=ws+b.
$$

Model ini tidak memakai sigmoid, tidak didefinisikan sebagai calibrated probability model, dan tidak mempunyai probability contract.

Jadi meskipun output kebetulan ada di $[0,1]$:

> **range tidak mengubah semantic type.**

---

# 3. LEARNING OUTCOMES

Setelah Topic 05, kamu diharapkan mampu:

1. membedakan input feature, target, prediction, error, loss, dan aggregate objective;
2. menjelaskan semantic role $s_i$, $y_i$, $\hat y_i$, $e_i$, $\ell_i$, dan $J$;
3. menghitung raw prediction score dari model linear sederhana;
4. menghitung per-example half-squared loss;
5. menghitung aggregate objective dari banyak examples;
6. menjelaskan mengapa loss rendah pada satu example tidak berarti educational recommendation benar;
7. menjelaskan mengapa target synthetic completion bukan educational ground truth universal;
8. menjelaskan mengapa $h(q,c)$ tidak dipakai sebagai target;
9. membandingkan dua parameter states menggunakan objective yang sama;
10. menyiapkan parameter/objective contract untuk Topic 06 — Gradient dan Parameter Update.

---

# 4. REACTIVATE ONLY WHAT IS NEEDED

Kita tidak mengulang full Machine Learning course.

Kita hanya butuh:

- function;
- parameter;
- input;
- output;
- target;
- error;
- squared loss;
- aggregate objective.

Learner sudah mengenal:

$$
J(\theta)=\frac1n\sum_i\ell^{(i)}(\theta)
$$

dari Optimization.

Sekarang kita memberi quantity itu **end-to-end meaning** dalam case yang sama.

---

# 5. SAME CANONICAL CASE

Canonical participant data tetap:

| Peserta | $q$ | $c$ | Duration | $h(q,c)$ |
|---|---:|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 | 0.78 |
| Bima | 0.60 | 0.625 | 30 | 0.61 |
| Citra | 0.90 | 1.00 | 55 | 0.94 |
| Dewi | 0.70 | 0.50 | 40 | 0.62 |

Reminder:

$$
h(q,c)=0.6q+0.4c
$$

adalah **constructed instructional score only**.

Topic 05 **tidak** menggunakan:

$$
y=h(q,c).
$$

Mengapa?

Karena itu akan membuat toy model belajar meniru formula yang kita sendiri sudah konstruksi, lalu mudah disalahartikan sebagai “ground truth”.

Target Topic 05 berasal dari source lain:

> supplementary synthetic session outcome Topic 04.

---

# 6. UNIT OF LEARNING EXAMPLE

Satu training example adalah satu synthetic participant–material session record.

Example $i$ mempunyai:

- participant;
- material;
- matching score $s_i$;
- synthetic target $y_i$.

Target:

$$
y_i\in\{0,1\},
$$

dengan:

- $y_i=1$: synthetic `completed_7d=1`;
- $y_i=0$: synthetic `completed_7d=0`.

Important:

> $y_i$ adalah label untuk **toy instructional task**, bukan ukuran educational value secara keseluruhan.

Completion dalam 7 hari juga tidak otomatis berarti:

- mastery;
- learning gain;
- satisfaction;
- long-term retention;
- recommendation quality.

---

# 7. EXACT TOY MODEL CONTRACT

Model:

$$
\hat y_i = w s_i + b.
$$

Dengan:

- $s_i$ = cosine matching score dari Topic 02;
- $w$ = trainable synthetic weight;
- $b$ = trainable synthetic bias;
- $\hat y_i$ = raw model prediction score.

Initial parameter state:

$$
w_0=0.5,
$$

$$
b_0=0.1.
$$

Jadi initial model:

$$
\hat y_i=0.5s_i+0.1.
$$

## 7.1 Why this model?

Karena model ini:

- simple enough untuk manual reasoning;
- memakai quantity dari Topic 02;
- target-nya terpisah dari $h$;
- memberi parameter yang bisa dioptimalkan pada Topic 06;
- tidak membutuhkan neural network;
- tidak membutuhkan full regression/classification theory.

## 7.2 What this model is NOT

Ini bukan:

- production recommender;
- probability model;
- calibrated model;
- causal model;
- educational-effect model.

---

# 8. QUANTITY SEMANTICS MAP

| Symbol | Object | Source | Operation | Semantic type |
|---|---|---|---|---|
| $s_i$ | participant–material pair | derived Topic 02 | cosine similarity | matching score |
| $y_i$ | synthetic session | synthetic Topic 04 | assigned outcome | target/label |
| $w,b$ | model | synthetic parameter state | chosen/updated | trainable parameters |
| $\hat y_i$ | example | model-produced | $ws_i+b$ | raw prediction score |
| $e_i$ | example | derived | $\hat y_i-y_i$ | signed residual/error |
| $\ell_i$ | example | derived | $\frac12 e_i^2$ | per-example loss |
| $J(w,b)$ | dataset | aggregate derived | mean of $\ell_i$ | training objective |

Semantic firewall:

$$
s_i\neq \hat y_i\neq y_i\neq \ell_i\neq J.
$$

Dan:

$$
h(q,c)
$$

adalah quantity family lain.

---

# 9. WORKED BASIC MICRO-EXAMPLE

Misalkan:

$$
s=0.80,
$$

$$
y=1.
$$

Initial model:

$$
\hat y=0.5(0.80)+0.1.
$$

$$
\hat y=0.40+0.10=0.50.
$$

Signed error:

$$
e=\hat y-y=0.50-1=-0.50.
$$

Per-example half-squared loss:

$$
\ell
=
\frac12(\hat y-y)^2.
$$

$$
\ell
=
\frac12(-0.50)^2
=
\frac12(0.25)
=
0.125.
$$

Interpretation:

- $\hat y=0.50$ = raw model score;
- $e=-0.50$ = model output berada 0.50 di bawah target;
- $\ell=0.125$ = scalar penalty menurut chosen loss.

Tidak satu pun otomatis probability.

---

# 10. WHY THE FACTOR $\frac12$?

Kita memakai:

$$
\ell_i(w,b)
=
\frac12(\hat y_i-y_i)^2.
$$

Bukan karena $\frac12$ membuat model lebih benar.

Faktor $\frac12$ adalah **pedagogical convenience**.

Ketika Topic 06 mengambil derivative dari square:

$$
\frac{d}{dz}\frac12z^2=z.
$$

Itu membuat expression gradient lebih bersih.

Objective ini dapat disebut:

> **mean half-squared loss**

dan bukan standard MSE persis.

Hubungannya:

$$
J_{\text{half}}
=
\frac12\operatorname{MSE}
$$

pada dataset yang sama.

Mereka memiliki minimizer yang sama karena berbeda hanya dengan positive constant factor.

---

# 11. WORKED HerAI EXAMPLE 1 — ALYA × INTRO AI

Dari Topic 02:

$$
s=0.9257.
$$

Dari synthetic Topic 04 outcome:

$$
y=1.
$$

Prediction:

$$
\hat y
=
0.5(0.9257)+0.1.
$$

$$
\hat y
=
0.46285+0.1
=
0.56285.
$$

Error:

$$
e
=
0.56285-1
=
-0.43715.
$$

Loss:

$$
\ell
=
\frac12(-0.43715)^2
\approx
0.095550.
$$

Safe interpretation:

> Pada initial toy parameter state, Alya–Intro AI mempunyai raw model score $0.56285$ dan half-squared loss sekitar $0.09555$ terhadap synthetic target $1$.

Unsafe:

> “Model yakin 56.285% Alya akan selesai.”

Tidak ada probability semantics.

---

# 12. WORKED HerAI EXAMPLE 2 — CITRA × MATEMATIKA DASAR

Citra–Matematika Dasar memiliki cosine sangat tinggi:

$$
s=0.9081.
$$

Tetapi synthetic Topic 04 target adalah:

$$
y=0.
$$

Prediction:

$$
\hat y
=
0.5(0.9081)+0.1
=
0.55405.
$$

Error:

$$
e=0.55405-0=0.55405.
$$

Loss:

$$
\ell
=
\frac12(0.55405)^2
\approx
0.153486.
$$

Ini contoh penting:

> **high matching score tidak menjamin positive target.**

Karena:

- cosine mengukur geometric alignment;
- synthetic outcome adalah quantity berbeda.

---

# 13. FULL INITIAL PREDICTION / LOSS TABLE

Initial parameters:

$$
w_0=0.5,\qquad b_0=0.1.
$$

| # | Participant | Material | $s_i$ | $y_i$ | $\hat y_i$ | $e_i$ | $\ell_i$ |
|---:|---|---|---:|---:|---:|---:|---:|
| 01 | Alya | Intro AI | 0.9257 | 1 | 0.56285 | -0.43715 | 0.095550 |
| 02 | Alya | Belajar Python | 0.7523 | 1 | 0.47615 | -0.52385 | 0.137209 |
| 03 | Alya | Desain UI/UX | 0.5485 | 0 | 0.37425 | 0.37425 | 0.070032 |
| 04 | Alya | Matematika Dasar | 0.8753 | 1 | 0.53765 | -0.46235 | 0.106884 |
| 05 | Bima | Intro AI | 0.8612 | 1 | 0.53060 | -0.46940 | 0.110168 |
| 06 | Bima | Belajar Python | 0.8907 | 1 | 0.54535 | -0.45465 | 0.103353 |
| 07 | Bima | Desain UI/UX | 0.6258 | 0 | 0.41290 | 0.41290 | 0.085243 |
| 08 | Bima | Matematika Dasar | 0.7813 | 1 | 0.49065 | -0.50935 | 0.129719 |
| 09 | Citra | Intro AI | 0.9056 | 1 | 0.55280 | -0.44720 | 0.099994 |
| 10 | Citra | Belajar Python | 0.6828 | 0 | 0.44140 | 0.44140 | 0.097417 |
| 11 | Citra | Desain UI/UX | 0.4594 | 0 | 0.32970 | 0.32970 | 0.054351 |
| 12 | Citra | Matematika Dasar | 0.9081 | 0 | 0.55405 | 0.55405 | 0.153486 |
| 13 | Dewi | Intro AI | 0.7104 | 0 | 0.45520 | 0.45520 | 0.103604 |
| 14 | Dewi | Belajar Python | 0.7117 | 1 | 0.45585 | -0.54415 | 0.148050 |
| 15 | Dewi | Desain UI/UX | 0.8867 | 0 | 0.54335 | 0.54335 | 0.147615 |
| 16 | Dewi | Matematika Dasar | 0.6559 | 0 | 0.42795 | 0.42795 | 0.091571 |

Tabel ini adalah **training-table computation** untuk toy instructional task.

---

# 14. AGGREGATE OBJECTIVE

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
\frac1n
\sum_{i=1}^{n}
\ell_i(w,b).
$$

Karena:

$$
n=16,
$$

maka:

$$
J(w,b)
=
\frac1{16}
\sum_{i=1}^{16}
\frac12(ws_i+b-y_i)^2.
$$

Pada initial state:

$$
J(0.5,0.1)
\approx
0.108390.
$$

Equivalent MSE:

$$
\operatorname{MSE}
=
2J
\approx
0.216781.
$$

Important:

> $J$ adalah **training objective pada synthetic training table**.

Ia bukan:

- recommendation quality;
- educational outcome;
- calibration;
- fairness metric;
- production KPI.

---

# 15. MATH / SYSTEM READING SKILL — BEDAH $J(w,b)$

Untuk:

$$
J(w,b)
=
\frac1{16}
\sum_{i=1}^{16}
\frac12(ws_i+b-y_i)^2,
$$

baca:

1. **Object:** entire 16-row synthetic training table.
2. **Notation:** scalar-valued objective function.
3. **Source:** constructed from model outputs and synthetic targets.
4. **Input/current state:** $w,b$, all $s_i$, all $y_i$.
5. **Operation:** predict → subtract target → square → half → average.
6. **Output:** one scalar.
7. **Semantic type:** training objective.
8. **Assumption/design choice:** half-squared loss chosen for manual optimization bridge.
9. **Justified conclusion:** parameter state with lower $J$ fits this chosen synthetic objective better on this table.
10. **Not justified:** better educational recommendation, better future generalization, causal benefit.
11. **Downstream role:** Topic 06 computes gradient of this exact $J$ and updates $w,b$.

---

# 16. LOSS VS ERROR

Error:

$$
e_i=\hat y_i-y_i.
$$

Error dapat negatif atau positif.

Loss:

$$
\ell_i=\frac12e_i^2.
$$

Loss tidak negatif:

$$
\ell_i\ge0.
$$

Jadi:

> **error $\neq$ loss.**

Contoh:

$$
e=-0.4
$$

memberi:

$$
\ell=\frac12(0.16)=0.08.
$$

Loss tidak mempertahankan arah error.

---

# 17. LOSS VS OBJECTIVE

Per-example loss:

$$
\ell_i.
$$

Aggregate objective:

$$
J=\frac1n\sum_i\ell_i.
$$

Jadi:

> **loss satu example $\neq$ objective seluruh dataset.**

Training algorithm nanti menggunakan objective/gradient yang menggabungkan banyak examples.

---

# 18. MODEL OUTPUT VS TARGET

Model-produced:

$$
\hat y_i.
$$

Synthetic target:

$$
y_i.
$$

Mereka adalah objects berbeda.

Jika:

$$
\hat y_i=y_i,
$$

maka per-example loss menjadi:

$$
\ell_i=0.
$$

Tetapi zero loss pada satu synthetic example tidak berarti:

- production success;
- correct recommendation causally;
- mastered material;
- future generalization.

---

# 19. CHANGE ONE THING — PARAMETER STATE BERBEDA

Bandingkan beberapa parameter states dengan **objective yang sama**.

### State A

$$
w=0.5,\qquad b=0.1
$$

$$
J\approx0.108390.
$$

### State B — constant score

$$
w=0,\qquad b=0.5
$$

Semua examples mendapat:

$$
\hat y=0.5.
$$

Objective:

$$
J=0.125.
$$

### State C — copy cosine numerically

$$
w=1,\qquad b=0.
$$

$$
J\approx0.130281.
$$

### State D — all-zero prediction

$$
w=0,\qquad b=0
$$

$$
J=0.25.
$$

Di **training objective ini**:

$$
J_A<J_B<J_C<J_D.
$$

Tetapi kita belum boleh berkata:

> “State A adalah model terbaik secara educational.”

Kita hanya tahu State A mempunyai lowest chosen training objective di antara empat parameter states yang dibandingkan.

---

# 20. WHY NOT TRAIN AGAINST $h(q,c)$?

Misalkan kita memilih:

$$
y_i=h(q_i,c_i).
$$

Lalu model belajar dari features yang dekat dengan formula itu.

Masalah pedagogisnya:

- target dibangun dari formula buatan kita sendiri;
- learner dapat menganggap $h$ ground truth;
- learned weight dapat tampak seperti discovery, padahal sebenarnya mereplikasi construction;
- risk besar mengubah instructional score menjadi educational truth.

Karena itu Topic 05 sengaja memakai:

> **synthetic completion outcome yang terpisah dari $h$.**

Ini menjaga causal/semantic boundary.

---

# 21. WHY THIS MATTERS IN AI

AI training membutuhkan explicit answers untuk:

- model menerima apa?
- model mengeluarkan apa?
- target artinya apa?
- loss menghukum apa?
- objective menggabungkan loss bagaimana?

Jika quantity semantics kabur, optimization dapat sukses secara matematis tetapi mengoptimalkan hal yang salah.

> **A perfectly optimized wrong objective is still the wrong objective.**

Lebih banyak data tidak otomatis memperbaiki objective yang salah definisi.

---

# 22. MISCONCEPTION / FAILURE-MODE CHALLENGE

## 22.1 “$\hat y=0.56$ berarti 56% probability”
**Salah.**

## 22.2 “Target 1 berarti peserta pasti belajar dengan baik”
**Salah.** Target hanya synthetic 7-day completion outcome.

## 22.3 “Loss adalah probability error”
**Salah.** Loss adalah penalty function.

## 22.4 “Low training objective = good educational outcome”
**Salah.**

## 22.5 “$h$ lebih cocok jadi target karena sudah ada”
**Tidak.** Itu justru circular instructional design risk.

## 22.6 “Cosine tertinggi harus punya $y=1$”
**Salah.** Matching score dan outcome berbeda.

## 22.7 “One zero-loss example means model trained”
**Salah.**

## 22.8 “MSE/half-squared loss selalu loss terbaik”
**Salah.** Loss choice depends on task and error semantics.

---

# 23. TRY IT YOURSELF

Untuk Bima–Belajar Python:

$$
s=0.8907,
$$

$$
y=1.
$$

Dengan:

$$
\hat y=0.5s+0.1,
$$

hitung prediction, error, loss.

Prediction:

$$
\hat y
=
0.5(0.8907)+0.1
=
0.54535.
$$

Error:

$$
e
=
0.54535-1
=
-0.45465.
$$

Loss:

$$
\ell
=
\frac12(-0.45465)^2
\approx
0.103353.
$$

---

# 24. VISUAL / INTERACTIVE ARCHITECTURE

## [STATIC VISUAL] — Quantity pipeline

**Learning purpose:** memisahkan input, model output, target, error, loss, objective.  
**Initial state:** $s_i\rightarrow\hat y_i$ dan parallel target $y_i$.  
**Learner action:** follow arrows.  
**Expected behavior:** learner identifies every semantic type.  
**Feedback:** callout “score ≠ probability ≠ loss”.  
**Safety note:** no arrow from $h$ into target.

## [NUMBER MANIPULATOR] — Change $w$ and $b$

**Learning purpose:** show parameter state changes predictions/objective.  
**Initial state:** $w=0.5,b=0.1$.  
**Learner action:** move $w,b$.  
**Expected behavior:** all $\hat y_i$, $\ell_i$, and $J$ recompute.  
**Feedback:** highlight which examples improve/worsen.  
**Safety note:** lower training $J$ is not educational-value proof.

## [COMPARE VIEW] — Same number, different type

**Learning purpose:** prevent semantic collapse.  
**Initial state:** cards for cosine $0.625$, target $0/1$, raw score around $0.625$, probability example from Topic 04.  
**Learner action:** classify.  
**Expected behavior:** distinguishes semantic origin.  
**Feedback:** correct/incorrect explanation.  
**Safety note:** numeric equality does not imply semantic equality.

## [STEP-BY-STEP REVEAL] — One example loss

**Learning purpose:** make calculation trace explicit.  
**Initial state:** $s,y,w,b$.  
**Learner action:** reveal prediction → error → square → half-loss.  
**Expected behavior:** learner understands dependency chain.  
**Feedback:** incorrect sign on error does not change squared loss, but error semantics remain signed.  
**Safety note:** loss is not probability.

## [INTERACTIVE VISUAL] — Objective comparison

**Learning purpose:** compare parameter states.  
**Initial state:** State A/B/C/D.  
**Learner action:** select two states.  
**Expected behavior:** compare $J$ only.  
**Feedback:** language checker rejects “educationally best”.  
**Safety note:** this is training-objective comparison only.

---

# 25. CHECKPOINT

1. Input toy model?  
   **Cosine matching score $s_i$.**

2. Target?  
   **Synthetic `completed_7d` outcome $y_i$.**

3. Is $y_i=h(q,c)$?  
   **No.**

4. Prediction formula?  
   $$\hat y_i=ws_i+b.$$

5. Is $\hat y_i$ probability?  
   **No. Raw model score.**

6. Per-example loss?  
   $$\ell_i=\frac12(\hat y_i-y_i)^2.$$

7. Aggregate objective?  
   $$J=\frac1n\sum_i\ell_i.$$

8. Initial $J$?  
   **Approximately $0.108390$.**

9. Does lower $J$ guarantee better educational outcome?  
   **No.**

---

# 26. MASTERY CHECK — “I CAN…”

- **I can** distinguish matching score, target, model output, error, loss, and objective.
- **I can** compute $\hat y=ws+b$.
- **I can** calculate half-squared loss.
- **I can** calculate aggregate objective.
- **I can** explain why raw score is not probability.
- **I can** explain why $h$ is not the target.
- **I can** explain why target completion is not educational-value ground truth.
- **I can** compare parameter states using one fixed objective.
- **I can** reject “lower training loss guarantees real-world quality”.
- **I can** identify $w,b$ as trainable synthetic parameters.

---

# 27. SCOPE BOUNDARY

Topic 05 does **not** teach as core:

- logistic regression;
- sigmoid;
- calibration;
- cross-entropy derivation;
- full classification theory;
- neural networks;
- backpropagation;
- regularization derivation;
- generalization theory;
- hyperparameter search;
- production recommender training.

Topic 05 juga belum menghitung gradient.

---

# 28. SUMMARY

End-to-end trace sekarang:

```text
participant/material profiles
→ cosine matching score s
→ synthetic session target y
→ toy model raw score y-hat
→ error
→ per-example loss
→ aggregate objective J
```

Critical semantic rules:

$$
s\neq\hat y
$$

$$
\hat y\neq P(E)
$$

$$
\hat y\neq y
$$

$$
\ell\neq J
$$

$$
J\neq\text{educational value}
$$

dan:

$$
h(q,c)
$$

tetap instructional score only.

---

# 29. BRIDGE TO TOPIC 06 — GRADIENT DAN PARAMETER UPDATE

Sekarang objective sudah exact:

$$
J(w,b)
=
\frac1{16}
\sum_{i=1}^{16}
\frac12(ws_i+b-y_i)^2.
$$

Initial parameters juga exact:

$$
w_0=0.5,\qquad b_0=0.1.
$$

Topic berikutnya bertanya:

> **Bagaimana gradient memberi local direction untuk mengubah $w,b$, dan bagaimana satu gradient-descent update mengubah objective—tanpa menganggap gradient itu sendiri sebagai update atau training success?**

# **Topic 06 — Gradient dan Parameter Update**
