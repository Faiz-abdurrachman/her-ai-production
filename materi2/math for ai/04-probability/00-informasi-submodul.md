# 00 — Informasi Submodule 04

# Probability: Menalar Ketidakpastian dalam AI

**Program:** HerAI Fellowship  
**Category:** Foundation & Core AI  
**Module:** Math for AI  
**Submodule:** 04  
**Status:** **FINAL CONSOLIDATED — TOPIC 01–08 APPROVED**

---

# 1. Tujuan Submodule

Submodule ini membangun literacy probability yang dibutuhkan sebelum peserta masuk ke Calculus dan Optimization. Fokusnya bukan membuat peserta menjadi probability theorist, tetapi membuat mereka mampu:

- mendefinisikan uncertainty problem dengan jelas;
- membaca probability notation secara aman;
- membedakan observed data dari probability model;
- menalar joint, conditional, independence, dan Bayes;
- memahami random variable dan expected value;
- membedakan score, predicted probability, calibrated probability, logits, dan probabilistic loss dalam AI.

---

# 2. Topic Map Final

1. **Event, Outcome, dan Sample Space**
2. **Probability dan Complement**
3. **Joint, Union, dan Probability Table**
4. **Conditional Probability**
5. **Independence dan Dependence**
6. **Bayes sebagai Update Keyakinan**
7. **Random Variable, Distribution, dan Expected Value**
8. **Score, Probability, Calibration, dan Probabilistic Loss**

Approved lessons di folder `materi/` adalah **verbatim copies** dari topic packages yang telah disetujui.

---

# 3. Learning Outcomes Final

Setelah menyelesaikan Submodule 04, learner diharapkan mampu:

- **LO-04.1** mendefinisikan process, outcome, sample space, dan event;
- **LO-04.2** menghitung dan menginterpretasikan basic probability dan complement dengan assumption yang jelas;
- **LO-04.3** membaca intersection, union, overlap, joint probability, dan two-way probability table;
- **LO-04.4** menghitung serta menjelaskan conditional probability sebagai perubahan reference set;
- **LO-04.5** menguji independence dan membedakannya dari mutually exclusive;
- **LO-04.6** menggunakan Bayes sebagai update prior → evidence → posterior tanpa mengabaikan base rate;
- **LO-04.7** memetakan outcomes ke discrete random variable, distribution, dan expected value;
- **LO-04.8** membedakan score, predicted probability, calibration, logits, softmax output, dan probabilistic loss;
- **LO-04.9** menjaga boundary antara observed frequency, estimated probability, model probability, dan instructional score;
- **LO-04.10** mengaudit probability claim dalam AI dari definisi event sampai evaluation semantics.

---

# 4. Canonical Notation Map

| Konsep | Notation | Makna ringkas |
|---|---|---|
| Sample space | $\Omega$ | seluruh possible outcomes dalam stated setup |
| Event | $A,B$ | collection of outcomes |
| Probability | $P(A)$ | probability event $A$ dalam stated model |
| Complement | $A^c$ | event “bukan $A$” |
| Intersection | $A\cap B$ | $A$ dan $B$ terjadi |
| Union | $A\cup B$ | $A$ atau $B$ atau keduanya |
| Conditional | $P(A\mid B)$ | probability $A$ setelah reference set dibatasi ke $B$ |
| Prior | $P(H)$ | probability sebelum current evidence |
| Likelihood term | $P(D\mid H)$ | probability evidence under hypothesis |
| Posterior | $P(H\mid D)$ | updated probability setelah evidence |
| Random variable | $X$ | mapping outcomes ke nilai numerik |
| Value | $x$ | possible value dari $X$ |
| Distribution | $P(X=x)$ | probability mass pada value $x$ |
| Expected value | $E[X]$ | probability-weighted average |
| Model/raw score | $s$ | numerical score tanpa automatic probability semantics |
| Predicted probability | $\hat p$ | output yang intended sebagai probability estimate |

---

# 5. Core Formula Map

Probability range:

$$
0\le P(A)\le1.
$$

Complement:

$$
P(A^c)=1-P(A).
$$

Union:

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B).
$$

Conditional probability:

$$
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)},
\qquad P(B)>0.
$$

Independence criterion:

$$
P(A\cap B)=P(A)P(B).
$$

Bayes:

$$
P(H\mid D)
=
\frac{P(D\mid H)P(H)}{P(D)}.
$$

Random-variable mapping:

$$
X:\Omega\to\mathbb{R}.
$$

Expected value:

$$
E[X]
=
\sum_x xP(X=x).
$$

---

# 6. Persistent HerAI Running Case

Canonical observed data tetap:

| Peserta | Quiz ratio $q$ | Completion ratio $c$ | Study duration |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 menit |
| Bima | 0.60 | 0.625 | 30 menit |
| Citra | 0.90 | 1.00 | 55 menit |
| Dewi | 0.70 | 0.50 | 40 menit |

Instructional weighted score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Dengan scores:

- Alya: 0.78;
- Bima: 0.61;
- Citra: 0.94;
- Dewi: 0.62.

## Safety

Nilai tersebut **tidak otomatis** merupakan:

- probability;
- predicted probability;
- calibrated probability;
- confidence;
- accuracy;
- causal effect.

Canonical n=4 juga **tidak** dipakai untuk membuat calibration bins.

---

# 7. Probability Safety Map

| Unsafe claim | Correction |
|---|---|
| Dataset = sample space otomatis | Sample space memerlukan process/recording setup |
| Semua outcomes equally likely | Equal likelihood harus stated/justified |
| Angka $[0,1]$ = probability | Range tidak cukup memberi probability semantics |
| Relative frequency = universal future probability | Observed proportion perlu modeling/inference step |
| $P(A\cup B)=P(A)+P(B)$ selalu | Overlap harus dikurangi sekali |
| Joint = conditional | Reference denominator berbeda |
| $P(A\mid B)=P(B\mid A)$ | Arah condition berbeda |
| Conditional/dependence = causality | Probability association tidak otomatis causal |
| Independent = mutually exclusive | Independent events dapat co-occur |
| Bayes = membalik conditional | Prior/base rate dan evidence denominator tetap diperlukan |
| Likelihood = posterior | $P(D\mid H)$ berbeda dari $P(H\mid D)$ |
| Expected value = guaranteed outcome | Expected value adalah weighted average |
| Random variable = random-looking column | Harus ada mapping dalam probabilistic setup |
| Score = predicted probability | Probability semantics harus explicit |
| Softmax = calibrated | Normalization bukan empirical calibration proof |
| Calibration = accuracy | Keduanya menilai property berbeda |
| Logit = probability | Logit adalah raw model output |
| Cross-entropy = probability | Cross-entropy/log loss adalah loss |

---

# 8. Final Assessment Structure

- `latihan.md` — **8 integrated open exercises**;
- `kuis.md` — **10 MCQ**, 8/10 Apply/Analyze;
- `diskusi.md` — **2 integrated substantive discussions**;
- `kunci-jawaban-rubrik.md` — model reasoning, MCQ keys, rubrics;
- `coverage-map.json` — mapping coverage Topic 01–08 dan misconceptions.

Assessment final **bukan copy-paste** per-topic formative items. Banyak item menghubungkan:

> **definition → computation → interpretation → safety → AI consequence.**

---

# 9. Completion Criteria

Learner siap menuju Calculus jika sebagian besar kondisi berikut terpenuhi:

1. dapat mendefinisikan event sebelum menghitung probability;
2. dapat menjelaskan assumption equal-likelihood;
3. dapat membaca joint/union/conditional dengan denominator yang tepat;
4. dapat membedakan independence dan mutually exclusive;
5. dapat melakukan Bayes update tanpa conditional reversal/base-rate neglect;
6. dapat membangun/read discrete random variable distribution;
7. dapat menghitung dan menginterpretasikan expected value;
8. tidak menganggap expected value sebagai guaranteed outcome;
9. tidak mengubah observed ratios/scores menjadi probability tanpa semantics;
10. dapat membaca reliability diagram dasar;
11. dapat membedakan logits, normalized outputs, probabilities, dan loss;
12. dapat mengaudit satu AI probability claim end-to-end.

---

# 10. Scope Boundary Final

Submodule 04 tidak menjadikan berikut sebagai core:

- heavy combinatorics/permutations-combinations;
- measure theory/sigma-algebras;
- continuous density integrals;
- advanced Bayesian inference/MCMC;
- named-distribution catalog;
- conditional independence graphical models;
- information theory/entropy/KL sebagai core;
- full cross-entropy derivation;
- gradient/backpropagation;
- optimization algorithms;
- calibration algorithm implementation.

---

# 11. Bridge ke Submodule 05 — Calculus

Probability memberi language untuk uncertainty dan probabilistic loss.

Pertanyaan berikutnya:

> jika sebuah model mempunyai loss yang berubah ketika parameter berubah, **bagaimana kita mengukur arah dan laju perubahan itu?**

Itulah bridge ke:

# Submodule 05 — Calculus: Perubahan, Turunan, dan Gradient
