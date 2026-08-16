# Topic 07 — Random Variable, Distribution, dan Expected Value

> **Submodule 04 — Probability: Menalar Ketidakpastian dalam AI**  
> **Filename:** `07-random-variable-distribution-expected-value.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Prasyarat:** Topic 01–06 selesai; learner memahami outcome, sample space $\Omega$, event, probability, discrete probability table, weighted arithmetic, dan sigma notation dasar  
> **Forward dependency:** Topic 08 — Score, Probability, Calibration, dan Probabilistic Loss  
> **Boundary:** Topic ini membahas **discrete random variable**, mapping outcome ke nilai numerik, discrete probability distribution, dan expected value. Continuous density/integral, CDF sebagai core, named distributions, variance of random variables sebagai computation baru, transformations, moment generating functions, dan law of total expectation tetap deferred.

---

# 1. Hook — Dari “Apa yang Terjadi?” ke “Berapa Nilainya?”

Pada topic sebelumnya, pertanyaan probability kita banyak berbentuk:

> “Apakah event tertentu terjadi?”

Sekarang bayangkan satu **hypothetical HerAI future learning session**.

Possible outcomes:

- learner berhenti sebelum menyelesaikan unit inti;
- learner menyelesaikan satu unit inti;
- learner menyelesaikan dua unit inti;
- learner menyelesaikan tiga unit inti.

Outcome-outcome itu menjelaskan **apa yang terjadi**.

Tetapi sebuah sistem sering membutuhkan pertanyaan numerik:

> “Berapa banyak unit inti yang selesai?”

Untuk menjawabnya, kita memerlukan sebuah aturan yang memetakan setiap possible outcome menjadi angka.

Aturan pemetaan itulah yang disebut **random variable** atau **variabel acak**.

Dalam sebagian literatur akademik Indonesia, istilah **peubah acak** juga digunakan. [R3]

---

# 2. Learning Objectives

Setelah menyelesaikan Topic 07, kamu diharapkan mampu mengatakan:

- **I can distinguish** outcome dari random variable.
- **I can explain** random variable sebagai mapping dari outcomes ke numerical values.
- **I can read** notation $X$, $x$, dan $P(X=x)$.
- **I can map** finite outcomes ke values of $X$.
- **I can construct** discrete probability distribution untuk $X$.
- **I can verify** total probability distribution bernilai 1.
- **I can calculate** expected value $E[X]$.
- **I can interpret** expected value sebagai probability-weighted average.
- **I can explain** mengapa expected value tidak harus merupakan possible realized value.
- **I can distinguish** empirical distribution dari probability distribution dalam stated model.
- **I can avoid** menyebut ordinary observed dataset column sebagai random variable tanpa probabilistic setup yang jelas.

---

# 3. Recall — Outcome Bukan Angka Secara Otomatis

Misalkan dua fair coin tosses mempunyai sample space:

$$
\Omega
=
\{HH,HT,TH,TT\}.
$$

Setiap item seperti $HT$ adalah **outcome**.

Sekarang kita bertanya:

> “Berapa banyak heads?”

Outcome $HT$ bukan angka 1 secara otomatis.

Kita perlu sebuah rule:

- $HH\mapsto2$;
- $HT\mapsto1$;
- $TH\mapsto1$;
- $TT\mapsto0$.

Kita beri nama rule itu:

$$
X.
$$

Di sini $X$ adalah random variable:

> **number of heads in two tosses**.

MIT mendefinisikan discrete random variable sebagai function yang memberi sebuah number kepada setiap outcome dalam sample space. [R1]

---

# 4. Predict — Outcome Berbeda Bisa Memberi Nilai $X$ yang Sama

Perhatikan:

| Outcome | Number of heads |
|---|---:|
| $HH$ | 2 |
| $HT$ | 1 |
| $TH$ | 1 |
| $TT$ | 0 |

Sebelum menghitung, prediksi:

1. Apakah $HT$ dan $TH$ outcome yang sama?
2. Apakah keduanya bisa menghasilkan nilai random variable yang sama?
3. Jika tiap outcome mempunyai probability $1/4$, berapa probability bahwa $X=1$?
4. Apakah event $X=1$ hanya berisi satu outcome?

Jawaban kunci:

> beberapa outcomes yang berbeda dapat dipetakan ke numerical value yang sama.

---

# 5. Intuition — Random Variable sebagai “Mesin Pemetaan”

Bayangkan random variable sebagai mesin:

**outcome masuk → angka keluar**

Untuk dua tosses:

- $HH$ → 2;
- $HT$ → 1;
- $TH$ → 1;
- $TT$ → 0.

Random variable bukan “angka random yang muncul tanpa aturan.”

Randomness berasal dari uncertain outcome. Nilai $X$ ditentukan oleh outcome yang terjadi.

---

# 6. Formal Definition — Mapping dari $\Omega$ ke Angka

Untuk sample space $\Omega$, random variable $X$ dapat ditulis:

$$
X:\Omega\to\mathbb{R}.
$$

Baca formula ini sebagai:

> $X$ memetakan setiap outcome dalam sample space $\Omega$ ke sebuah nilai real.

Kita tidak masuk ke function theory secara mendalam.

Untuk course ini, cukup pahami:

1. ada probability experiment/model;
2. ada possible outcomes;
3. ada rule $X$;
4. setiap outcome mendapat numerical value.

MIT 18.05 memakai formalization ini untuk discrete random variables. [R1]

---

# 7. $X$ dan $x$ Bukan Hal yang Sama

Canonical notation Topic 07:

- $X$ = random variable;
- $x$ = salah satu possible numerical value dari $X$.

Untuk coin example:

$$
X=\text{number of heads in two tosses}.
$$

Possible values:

$$
x\in\{0,1,2\}.
$$

Kalimat:

$$
X=1
$$

berarti event:

> random variable $X$ mengambil value 1.

Pada coin example:

$$
X=1
$$

berkaitan dengan outcomes:

$$
\{HT,TH\}.
$$

Sehingga:

$$
P(X=1)
=
\frac{2}{4}
=
0.5.
$$

---

# 8. Math Reading Skill — Membaca $P(X=x)$

Perhatikan:

$$
P(X=x).
$$

## Symbols

- $X$ = random variable;
- $x$ = satu possible numerical value;
- $P$ = probability.

## Input

Kita membutuhkan:

- probabilistic setup;
- mapping dari outcomes ke $X$;
- probability assignments pada outcomes atau directly pada values.

## Operation

Cari semua outcomes yang dipetakan menjadi value $x$, lalu jumlahkan probability mereka.

## Result

$$
P(X=x)
$$

adalah probability bahwa $X$ mengambil value $x$.

## Range

$$
0\le P(X=x)\le1.
$$

## Formula ini tidak menyatakan

- $X$ adalah ordinary spreadsheet column secara otomatis;
- $x$ sama dengan outcome;
- observed frequency otomatis theoretical probability;
- semua values $x$ equally likely.

---

# 9. Dari Outcome Mapping ke Discrete Probability Distribution

Untuk dua fair coin tosses:

| Outcome | $X$ | Probability outcome |
|---|---:|---:|
| $HH$ | 2 | $1/4$ |
| $HT$ | 1 | $1/4$ |
| $TH$ | 1 | $1/4$ |
| $TT$ | 0 | $1/4$ |

Aggregate berdasarkan value $X$:

| $x$ | $P(X=x)$ |
|---:|---:|
| 0 | $1/4$ |
| 1 | $1/2$ |
| 2 | $1/4$ |

Table ini adalah **discrete probability distribution** untuk $X$.

MIT menunjukkan bahwa discrete random variable dapat dideskripsikan dengan possible values beserta probabilities yang terkait dengan values tersebut. [R1]

---

# 10. Distribution Safety — Probability Mass Harus Lengkap

Untuk discrete probability distribution yang valid:

$$
\sum_x P(X=x)=1.
$$

Pada example:

$$
\frac14+\frac12+\frac14=1.
$$

Dan untuk setiap possible value:

$$
P(X=x)\ge0.
$$

Jika table berjumlah 0.80 atau 1.20, probability assignment belum valid atau belum lengkap.

---

# 11. Empirical Distribution vs Probability Distribution

Ini adalah bridge penting dari Submodule 03 — Statistics.

## Empirical distribution

Meringkas **observed data**.

Contoh:

> pada 20 observed sessions, 7 sessions menyelesaikan dua unit.

Observed relative frequency:

$$
\frac7{20}=0.35.
$$

Angka 0.35 di sini adalah **observed proportion**.

## Probability distribution

Menetapkan probabilities untuk possible values random variable dalam **stated probability model**.

Contoh:

$$
P(X=2)=0.35
$$

baru mempunyai probability meaning jika setup/model memang mendefinisikannya demikian.

## Angka yang sama dapat memiliki semantics berbeda

0.35 dapat menjadi:

- empirical relative frequency;
- stipulated probability model;
- estimated probability jika modeling/estimation method didefinisikan.

Jangan mengubah label semantic hanya karena angkanya sama.

---

# 12. Worked Example 1 — Basic: Gain/Loss Random Variable

Sebuah hypothetical game mempunyai three possible outcomes:

- win kecil;
- seri;
- lose kecil.

Definisikan random variable $X$ sebagai gain/loss points:

| Outcome | $X$ | Probability |
|---|---:|---:|
| win | 4 | 0.25 |
| seri | 1 | 0.50 |
| lose | -2 | 0.25 |

Distribution sudah langsung diberikan:

| $x$ | $P(X=x)$ |
|---:|---:|
| -2 | 0.25 |
| 1 | 0.50 |
| 4 | 0.25 |

Total:

$$
0.25+0.50+0.25=1.
$$

Ini valid sebagai discrete distribution.

Perhatikan bahwa value random variable dapat negatif, nol, atau positif tergantung definition.

---

# 13. Expected Value — Probability-Weighted Average

Sekarang kita ingin satu summary number yang mempertimbangkan:

- possible values;
- probability masing-masing value.

Expected value ditulis:

$$
E[X].
$$

Untuk finite discrete random variable:

$$
\boxed{
E[X]
=
\sum_x xP(X=x)
}
$$

MIT mendefinisikan expected value sebagai sum dari setiap possible value dikalikan probability-nya, dan menekankan bahwa expected value adalah weighted average. [R2]

---

# 14. Math Reading Skill — Membaca $E[X]$

Perhatikan:

$$
E[X]
=
\sum_x xP(X=x).
$$

## Symbols

- $E[X]$ = expected value dari random variable $X$;
- $\sum_x$ = jumlahkan untuk semua possible values $x$;
- $x$ = satu possible value;
- $P(X=x)$ = probability value tersebut.

## Input

Discrete distribution untuk $X$.

## Operation

Untuk setiap row:

1. kalikan value $x$ dengan probability-nya;
2. jumlahkan semua products.

## Result

Satu probability-weighted average.

## Unit

Jika $X$ mempunyai unit, $E[X]$ memiliki unit yang sama.

Jika $X$ = jumlah unit selesai, $E[X]$ juga dalam “unit”.

## Formula ini tidak menyatakan

- expected value pasti terjadi pada next trial;
- expected value adalah mode/most likely value;
- expected value harus merupakan possible value.

---

# 15. Worked Example 1 Continued — Menghitung Expected Value

Gunakan distribution:

| $x$ | $P(X=x)$ | $xP(X=x)$ |
|---:|---:|---:|
| -2 | 0.25 | -0.50 |
| 1 | 0.50 | 0.50 |
| 4 | 0.25 | 1.00 |

Maka:

$$
E[X]
=
(-2)(0.25)
+
(1)(0.50)
+
(4)(0.25).
$$

$$
E[X]=1.
$$

Interpretasi:

> weighted average dari model adalah 1 point.

Pada example ini 1 memang possible value.

Tetapi itu tidak selalu terjadi.

---

# 16. Worked Example 2 — Synthetic HerAI Future Session

> **Label:** synthetic/hypothetical instructional probability model.  
> **Unit:** satu hypothetical future HerAI learning session.  
> **Random variable:** $X$ = jumlah unit inti yang selesai dalam session tersebut.  
> **Bukan:** actual participant distribution, prediction model, causal model, atau empirical estimate dari empat canonical participants.

Gunakan stipulated distribution:

| $x$ = unit selesai | $P(X=x)$ |
|---:|---:|
| 0 | 0.10 |
| 1 | 0.30 |
| 2 | 0.40 |
| 3 | 0.20 |

Check:

$$
0.10+0.30+0.40+0.20=1.
$$

Expected value:

$$
E[X]
=
0(0.10)
+
1(0.30)
+
2(0.40)
+
3(0.20).
$$

$$
E[X]
=
0+0.30+0.80+0.60
=
1.70.
$$

Interpretasi aman:

> dalam stipulated synthetic probability model ini, expected number of completed core units per modeled session adalah 1.70.

---

# 17. Expected Value Tidak Harus Possible Outcome

Pada synthetic HerAI model:

possible values hanya:

$$
\{0,1,2,3\}.
$$

Tetapi:

$$
E[X]=1.70.
$$

Tidak ada single session yang “menyelesaikan 1.70 unit.”

Expected value adalah weighted average dari distribution, bukan guarantee dan bukan necessarily possible realized value.

MIT secara eksplisit menekankan bahwa expected value **need not be a possible value** dari random variable. [R2]

Ini adalah misconception safety point yang sangat penting.

---

# 18. Change One Thing — Geser Probability Mass

Pertahankan possible values:

$$
\{0,1,2,3\}.
$$

Model awal:

| $x$ | Probability |
|---:|---:|
| 0 | 0.10 |
| 1 | 0.30 |
| 2 | 0.40 |
| 3 | 0.20 |

Sekarang pindahkan probability mass 0.10 dari $x=1$ ke $x=3$:

| $x$ | New probability |
|---:|---:|
| 0 | 0.10 |
| 1 | 0.20 |
| 2 | 0.40 |
| 3 | 0.30 |

Total masih:

$$
1.
$$

Expected value baru:

$$
E[X]
=
0(0.10)
+
1(0.20)
+
2(0.40)
+
3(0.30).
$$

$$
E[X]
=
0.20+0.80+0.90
=
1.90.
$$

Expected value naik dari:

$$
1.70
$$

menjadi:

$$
1.90.
$$

Intuition:

> probability mass digeser dari lower value ke higher value, sehingga weighted average naik.

Tetapi kita tetap tidak boleh mengatakan next session “akan menghasilkan 1.90 unit.”

---

# 19. Persistent HerAI Continuity — Ordinary Dataset Variable ≠ Random Variable Otomatis

Canonical HerAI observed data tetap:

| Peserta | Quiz ratio $q$ | Completion ratio $c$ | Study duration $t$ |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 menit |
| Bima | 0.60 | 0.625 | 30 menit |
| Citra | 0.90 | 1.00 | 55 menit |
| Dewi | 0.70 | 0.50 | 40 menit |

Old instructional score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Scores:

- Alya 0.78;
- Bima 0.61;
- Citra 0.94;
- Dewi 0.62.

Data tersebut adalah **observed dataset**.

Kita tidak otomatis mengatakan:

> “Kolom $t$ adalah random variable.”

atau:

> “Completion ratio Citra 1.00 adalah realization dari probability distribution tertentu.”

Untuk menggunakan random-variable language secara formal, kita perlu probabilistic setup yang menjelaskan:

- experiment/process;
- observational/random unit;
- possible outcomes;
- mapping;
- probability model.

Topic 07 memakai separate synthetic future-session model untuk itu.

---

# 20. Why This Matters in AI

AI sering bekerja dengan quantities yang uncertain:

- target class;
- number of events;
- cost/reward;
- future count;
- estimated probability.

Random-variable literacy membantu kita bertanya:

> “Apa uncertain outcome-nya, dan numerical quantity apa yang kita definisikan dari outcome itu?”

Distribution literacy membantu:

> “Nilai apa yang mungkin, dan probability mass ada di mana?”

Expected-value literacy membantu:

> “Berapa probability-weighted average quantity menurut model?”

Tetapi Topic 07 belum membahas apakah model score tertentu benar-benar probability atau calibrated.

Itu sengaja ditahan ke Topic 08.

---

# 21. Misconception Challenge

## Miskonsepsi 1 — Random variable = random-looking spreadsheet column

Salah.

Random variable didefinisikan dalam probability setup sebagai mapping dari outcomes ke numbers.

---

## Miskonsepsi 2 — Outcome dan value $X$ adalah objek yang sama

Salah.

Dua outcomes berbeda dapat menghasilkan value $X$ yang sama.

Contoh:

$$
HT
$$

dan:

$$
TH
$$

keduanya memberi:

$$
X=1.
$$

---

## Miskonsepsi 3 — Probability distribution = histogram observed data

Tidak otomatis.

Histogram/empirical distribution meringkas observations. Probability distribution menetapkan probabilities dalam model.

---

## Miskonsepsi 4 — Expected value adalah guaranteed outcome

Salah.

$$
E[X]=1.70
$$

tidak berarti next session menyelesaikan 1.70 unit.

---

## Miskonsepsi 5 — Expected value pasti most likely value

Salah.

Expected value dan mode menjawab pertanyaan berbeda.

---

## Miskonsepsi 6 — Expected value harus merupakan possible value

Salah.

Weighted average dapat berada di antara possible values.

---

# 22. Try It Yourself

## Try 1 — Mapping

Sample space:

$$
\Omega=\{AA,AB,BA,BB\}.
$$

Definisikan $X$ = number of letter $A$.

Buat mapping outcome → $X$.

## Try 2 — Distribution

Jika keempat outcomes equally likely, buat table:

$$
x,\quad P(X=x).
$$

Check apakah total probability = 1.

## Try 3 — Expected value

Gunakan distribution:

| $x$ | $P(X=x)$ |
|---:|---:|
| 0 | 0.20 |
| 1 | 0.50 |
| 2 | 0.30 |

Hitung:

$$
E[X].
$$

Lalu jawab: apakah expected value harus terjadi pada satu realization?

## Try 4 — Semantic audit

Seseorang berkata:

> “Di data HerAI, mean study duration 42.5 menit, berarti random variable study duration punya expected value 42.5 menit.”

Apa information/modeling step yang hilang?

---

# 23. Visual / Interactive Specification

## [INTERACTIVE VISUAL] Outcome → $X$ → Distribution → Expected Value

**Purpose:** membuat learner melihat bahwa random variable adalah mapping, distribution mengaggregate probability by value, dan expected value adalah weighted average.

**Initial state/data:**

Synthetic future-session outcomes:

- `stop_early_A` → 0 units;
- `stop_early_B` → 0 units;
- `finish_one` → 1 unit;
- `finish_two_A` → 2 units;
- `finish_two_B` → 2 units;
- `finish_three` → 3 units.

Stipulated outcome probabilities dipilih agar aggregate distribution menjadi:

- $P(X=0)=0.10$;
- $P(X=1)=0.30$;
- $P(X=2)=0.40$;
- $P(X=3)=0.20$.

**Learner action:**

1. click an outcome;
2. see its mapped $X$ value;
3. click `Aggregate by X`;
4. distribution bars appear;
5. click `Compute expected value`;
6. reveal each product $xP(X=x)$;
7. move 0.10 probability mass from $x=1$ to $x=3$.

**Expected behavior:**

- multiple outcomes can merge into same $X$ value;
- aggregated probability mass still sums to 1;
- expected value marker appears at 1.70 initially;
- after probability shift, marker moves to 1.90.

**Feedback:**

- `Outcome is not the same object as X value.`
- `Distribution groups probability by values of X.`
- `Expected value is a weighted average.`
- `1.70 need not be a realizable session outcome.`

**Safety / interpretation note:**

- all probabilities are synthetic/stipulated;
- visual is not derived from canonical four-participant data;
- empirical histogram and probability distribution must remain semantically labeled;
- expected value is not a guarantee.

---

# 24. Checkpoint

Jawab tanpa melihat bagian sebelumnya.

1. Apa random variable?
2. Apa difference $X$ dan $x$?
3. Bisakah dua outcomes berbeda memiliki value $X$ yang sama?
4. Apa arti $P(X=x)$?
5. Apa syarat total mass discrete distribution?
6. Apa expected value?
7. Apa arti sigma dalam formula expected value?
8. Apakah expected value harus possible value?
9. Apakah expected value guaranteed?
10. Apa beda empirical distribution dan probability distribution?
11. Apakah canonical $c$ column otomatis random variable?
12. Mengapa Topic 07 belum menyebut calibration?

---

# 25. Mastery Check — “I Can”

- [ ] **I can** distinguish outcome from random-variable value.
- [ ] **I can** explain $X:\Omega\to\mathbb{R}$ secara verbal.
- [ ] **I can** read $P(X=x)$.
- [ ] **I can** construct a discrete probability distribution.
- [ ] **I can** verify probabilities sum to 1.
- [ ] **I can** calculate $E[X]$.
- [ ] **I can** explain expected value as weighted average.
- [ ] **I can** reject expected-value-as-guarantee.
- [ ] **I can** reject random-variable-as-ordinary-column.
- [ ] **I can** distinguish empirical distribution from model probability distribution.

---

# 26. Scope Boundary — Apa yang Sengaja Belum Dibahas?

Topic 07 tidak memperluas core ke:

- continuous probability density;
- integrals for expectation;
- CDF calculations as a core skill;
- Bernoulli/binomial/geometric distributions as named-distribution unit;
- theoretical variance of random variables sebagai new computation;
- covariance of random variables;
- transformations of random variables;
- moment generating functions;
- law of total expectation;
- posterior predictive distributions;
- logits;
- sigmoid/softmax;
- calibration;
- reliability diagrams;
- cross-entropy/log loss;
- gradients;
- backprop;
- optimization.

Sumber MIT membahas sebagian topik tersebut dalam course yang lebih luas, tetapi HerAI sengaja menahan scope sesuai approved blueprint.

---

# 27. Summary

Topic 07 mengubah cara kita melihat uncertainty.

1. outcome menjelaskan possible result;
2. random variable $X$ memetakan outcome menjadi number;
3. $x$ adalah salah satu possible value;
4. $P(X=x)$ adalah probability bahwa $X$ mengambil value $x$;
5. discrete probability distribution mengorganisasi possible values dan probability mass;
6. total probability mass harus 1;
7. empirical distribution dan probability distribution tidak boleh dicampur tanpa modeling step;
8. expected value:

$$
E[X]
=
\sum_x xP(X=x);
$$

9. expected value adalah probability-weighted average;
10. expected value tidak harus possible value;
11. expected value bukan guarantee;
12. canonical HerAI observed columns tidak otomatis random variables.

---

# 28. Bridge to Topic 08 — Score, Probability, Calibration, dan Probabilistic Loss

Sekarang kita sudah memahami:

- random quantities;
- probability distributions;
- probability-weighted numerical summaries.

Topic berikutnya akan masuk ke safety layer AI yang sangat penting:

> Jika sebuah model mengeluarkan angka seperti 0.94, apakah angka itu benar-benar probability?

Kita akan membedakan:

- score;
- probability;
- predicted probability;
- calibrated probability;
- logits;
- probabilistic loss.

Tetapi **Topic 08 baru boleh diproduksi setelah Topic 07 disetujui**.

---

# References Used

Markers `[R1]`, `[R2]`, dan `[R3]` mengacu ke `referensi-topic-07.md`.
