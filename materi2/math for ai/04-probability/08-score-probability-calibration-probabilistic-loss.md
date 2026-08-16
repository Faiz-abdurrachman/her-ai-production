# Topic 08 — Score, Probability, Calibration, dan Probabilistic Loss

> **Submodule 04 — Probability: Menalar Ketidakpastian dalam AI**  
> **Filename:** `08-score-probability-calibration-probabilistic-loss.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Prasyarat:** Topic 01–07 selesai; learner memahami event, conditional probability, random variable, probability distribution, dan expected value  
> **Status:** Topic penutup konten Submodule 04  
> **Boundary:** calibration algorithms, temperature-scaling computation, isotonic regression, logistic-regression derivation, sigmoid/softmax derivatives, entropy, KL divergence, gradient, backprop, optimizer behavior, dan full cross-entropy derivation tetap deferred.

---

# 1. Hook — Angka 0.94 Belum Tentu Berarti “94% Probability”

Kita kembali ke canonical HerAI case.

Instructional score lama:

$$
h(q,c)=0.6q+0.4c.
$$

Untuk Citra:

$$
q=0.90,
\qquad
c=1.00.
$$

Maka:

$$
h
=
0.6(0.90)+0.4(1.00)
=
0.94.
$$

Sekarang ada dua kalimat:

### Kalimat A

> “Score Citra adalah 0.94.”

### Kalimat B

> “Probability Citra akan sukses adalah 94%.”

Kalimat A sesuai definisi score yang sudah dibuat.

Kalimat B **tidak otomatis valid**.

Kenapa?

Karena angka berada di rentang $[0,1]$ **tidak cukup** untuk memberi probability semantics.

Topic 08 menjawab pertanyaan terakhir dari Submodule Probability:

> Ketika sebuah AI/model mengeluarkan angka, kapan angka itu hanyalah score, kapan ia dimaksudkan sebagai probability, dan bagaimana kita mengecek apakah probability tersebut benar-benar layak dipercaya sebagai probability?

---

# 2. Learning Objectives

Setelah topic ini, kamu diharapkan mampu mengatakan:

- **I can distinguish** model/raw score, predicted probability, dan calibrated probability.
- **I can explain** mengapa angka dalam $[0,1]$ tidak otomatis probability.
- **I can read** notation $s$, $\hat p$, dan $\hat P(Y=1\mid\mathbf{x})$.
- **I can explain** basic calibration using grouped predictions and observed positive fractions.
- **I can read** a simple reliability diagram.
- **I can explain** calibration bukan accuracy, certainty, discrimination, atau causality.
- **I can identify** logits sebagai raw model outputs, bukan probabilities.
- **I can explain** softmax normalization tanpa mengklaim bahwa softmax otomatis calibrated.
- **I can describe** probabilistic loss sebagai ukuran kualitas probability prediction terhadap observed target.
- **I can explain** mengapa log loss / cross-entropy adalah loss, bukan probability.
- **I can reject** “Citra 0.94 = 94% probability” tanpa explicit probabilistic model.

---

# 3. Recall — Probability Punya Semantics, Bukan Hanya Range

Topic 02 mengajarkan:

$$
0\le P(A)\le1.
$$

Tetapi kebalikannya tidak berlaku.

Dari:

$$
0\le s\le1
$$

kita **tidak** boleh menyimpulkan bahwa $s$ adalah probability.

Contoh angka 0.8 dapat berarti:

- quiz ratio;
- completion ratio;
- normalized score;
- similarity score;
- ranking score;
- predicted probability;
- calibrated probability estimate.

Nilainya sama.

Semantics-nya bisa berbeda.

---

# 4. Tiga Layer Angka yang Harus Dibedakan

## Layer 1 — Model / raw score

Canonical notation:

$$
s.
$$

Score adalah numerical output yang dipakai untuk ranking, matching, weighting, heuristic, atau tujuan lain sesuai definisinya.

Contoh canonical:

$$
h(q,c)=0.6q+0.4c.
$$

Nilai 0.94 pada Citra adalah instructional score.

Tidak ada probability interpretation yang otomatis mengikuti.

---

## Layer 2 — Predicted probability

Canonical notation:

$$
\hat p.
$$

Atau lebih eksplisit:

$$
\hat P(Y=1\mid\mathbf{x}).
$$

Dibaca:

> model menghasilkan sebuah estimate yang **dimaksudkan** sebagai probability bahwa target $Y=1$, given observed features $\mathbf{x}$.

Kata pentingnya:

> **dimaksudkan sebagai probability.**

Predicted probability memerlukan:

- target/event yang jelas;
- model semantics yang jelas;
- unit/horizon yang jelas;
- output definition yang memang probabilistik.

---

## Layer 3 — Calibrated probability

Predicted probability belum tentu memiliki empirical probability quality yang baik.

Sebuah system disebut well calibrated jika, secara aggregate dalam evaluation setup yang tepat, prediction levels selaras dengan observed frequencies.

scikit-learn memberi intuition:

> di antara samples dengan predicted probability sekitar 0.8, sekitar 80% seharusnya benar-benar positive pada well-calibrated binary system. [R1]

Calibration adalah property/evaluation dari probability predictions.

Bukan jaminan untuk satu individual case.

---

# 5. Canonical HerAI Safety — Citra 0.94 Tetap Score

Canonical scores:

- Alya: 0.78
- Bima: 0.61
- Citra: 0.94
- Dewi: 0.62

Semua berasal dari:

$$
h(q,c)=0.6q+0.4c.
$$

Definisi tersebut hanya mengatakan:

> score adalah weighted combination dari quiz ratio dan completion ratio.

Definisi tersebut **tidak** mengatakan:

$$
h
=
P(\text{success}).
$$

Jadi kita tidak boleh menulis:

- “Citra punya 94% success probability”;
- “Citra confidence 94%”;
- “Citra calibrated probability 0.94”;
- “Citra punya 94% chance lulus.”

Tanpa model probabilistik tambahan, semuanya overclaim.

---

# 6. Predict — Dua System Sama-sama Mengeluarkan 0.8

Bayangkan dua systems.

### System A

Output:

$$
s=0.80.
$$

Dokumentasi berkata:

> “score relevance untuk ranking content.”

### System B

Output:

$$
\hat p=0.80.
$$

Dokumentasi berkata:

> “estimated probability bahwa binary event $Y=1$ terjadi dalam defined horizon.”

Prediksi:

1. Apakah kedua 0.80 boleh disebut probability?
2. Apakah System B otomatis calibrated?
3. Jika System B well calibrated, apa yang kita harapkan terjadi pada kelompok cases dengan prediction sekitar 0.80?
4. Apakah 0.80 berarti event pasti terjadi untuk current case?

Jawaban:

- hanya System B yang punya intended probability semantics;
- intended probability semantics belum membuktikan calibration;
- calibration harus dievaluasi;
- 0.80 tetap uncertainty, bukan certainty.

---

# 7. Calibration — Probability Level vs Observed Frequency

Gunakan **synthetic evaluation dataset**, bukan canonical 4 participants.

> **Label:** synthetic instructional evaluation summary.

Suppose model membuat binary predictions.

Kita group prediction ke tiga bins:

| Prediction bin | Average predicted probability | Observed positive fraction |
|---|---:|---:|
| Low | 0.20 | 0.22 |
| Medium | 0.50 | 0.48 |
| High | 0.80 | 0.79 |

Interpretasi:

- predictions sekitar 0.20 → observed positive fraction sekitar 0.22;
- predictions sekitar 0.50 → observed positive fraction sekitar 0.48;
- predictions sekitar 0.80 → observed positive fraction sekitar 0.79.

Angka-angka dekat dengan diagonal:

$$
\text{observed fraction}
\approx
\text{predicted probability}.
$$

Ini adalah pattern yang consistent dengan good calibration pada summary synthetic ini.

scikit-learn menjelaskan reliability diagram dengan x-axis berupa average predicted probability dalam bin dan y-axis berupa fraction of positives pada bin tersebut. [R1]

---

# 8. Reliability Diagram — Cara Membacanya

Reliability diagram mempunyai reference line:

$$
y=x.
$$

Artinya:

- prediction 0.2 idealnya dekat observed fraction 0.2;
- prediction 0.5 idealnya dekat 0.5;
- prediction 0.8 idealnya dekat 0.8.

## Jika titik berada dekat diagonal

Calibration lebih baik pada region/bin tersebut.

## Jika titik 0.8 ternyata observed fraction 0.55

Model terlalu tinggi dalam probability claim pada bin itu.

Kita dapat menyebutnya secara beginner-safe sebagai:

> probability predictions pada bin tersebut terlalu besar dibanding observed fraction.

## Jika titik 0.3 ternyata observed fraction 0.55

Predictions terlalu rendah pada bin tersebut.

---

# 9. Change One Thing — Same Predicted Probability, Different Calibration

Bandingkan dua synthetic systems.

## System A

| Avg predicted probability | Observed positive fraction |
|---:|---:|
| 0.20 | 0.21 |
| 0.50 | 0.49 |
| 0.80 | 0.78 |

## System B

| Avg predicted probability | Observed positive fraction |
|---:|---:|
| 0.20 | 0.40 |
| 0.50 | 0.62 |
| 0.80 | 0.58 |

Keduanya sama-sama dapat menghasilkan numbers seperti 0.8.

Tetapi aggregate relationship prediction-vs-outcome berbeda.

Maka:

> memiliki probability-shaped output tidak sama dengan memiliki well-calibrated probabilities.

Guo et al. menunjukkan pada neural networks yang mereka evaluasi bahwa strong classification performance dapat coexist dengan poor calibration, sehingga calibration perlu diperiksa secara terpisah. [R2]

---

# 10. Calibration Bukan Accuracy

## Accuracy

Menjawab:

> berapa banyak class decisions yang benar under a chosen decision rule?

## Calibration

Menjawab:

> apakah probability levels selaras dengan observed event frequencies?

Sebuah model dapat:

- punya accuracy tinggi tetapi calibration buruk;
- punya calibration cukup baik tetapi ranking/discrimination behavior berbeda;
- berubah calibration tanpa makna yang sama dengan perubahan accuracy.

scikit-learn juga mengingatkan bahwa scoring rules seperti log loss/Brier score mengandung beberapa aspek sekaligus—reliability/calibration, resolution/discrimination, dan uncertainty—sehingga satu aggregate score tidak identik dengan calibration alone. [R1]

---

# 11. Calibration Bukan Certainty

Jika:

$$
\hat p=0.90,
$$

kalimat aman:

> model assigns estimated probability 0.90 to the defined event.

Bukan:

> event pasti terjadi.

Bahkan pada perfectly calibrated system, individual outcome masih bisa berbeda.

Calibration adalah aggregate property.

---

# 12. Calibration Bukan Causality

Jika model mengeluarkan:

$$
\hat P(Y=1\mid\mathbf{x})=0.80,
$$

itu tidak berarti feature tertentu **menyebabkan** $Y=1$.

Probability prediction dan causal inference adalah problem berbeda.

Topic ini tidak mengajarkan causal effect.

---

# 13. Raw Logits — Bukan Probability

Neural network classifier sering menghasilkan raw outputs sebelum normalization.

Kita sebut:

$$
z
$$

atau vector logits.

Contoh:

$$
z=[2.0,1.0,-0.5].
$$

Apakah ini probability vector?

Tidak.

Kenapa?

- ada values yang bisa negative;
- entries tidak harus berada di $[0,1]$;
- entries tidak harus sum to 1.

Official PyTorch `CrossEntropyLoss` menerima **unnormalized logits**, yang tidak harus positive dan tidak harus sum to 1. [R3]

Jadi:

> **logits ≠ probabilities.**

---

# 14. Softmax — Normalization Bridge, Bukan Calibration Proof

Softmax mengubah vector raw values menjadi vector yang:

- tiap entry berada di $[0,1]$;
- entries sum to 1.

PyTorch mendokumentasikan property tersebut secara eksplisit. [R4]

Secara simbolik:

$$
\operatorname{softmax}(z_i)
=
\frac{e^{z_i}}{\sum_j e^{z_j}}.
$$

Tetapi Topic 08 harus menjaga satu warning:

> softmax normalization **tidak otomatis membuktikan empirical calibration**.

Softmax memberi numerical constraints yang mirip probability vector.

Apakah outputs tersebut benar-benar behave sebagai reliable probabilities tetap perlu evaluation/calibration framing. [R1][R4]

---

# 15. Sigmoid — Bridge Only

Untuk binary setup, sigmoid sering dipakai untuk memetakan scalar model output ke rentang:

$$
(0,1).
$$

Bentuknya:

$$
\sigma(z)
=
\frac{1}{1+e^{-z}}.
$$

Di topic ini sigmoid hanya **bridge concept**.

Kita tidak membahas:

- derivative sigmoid;
- logistic-regression training;
- parameter estimation;
- gradient;
- backprop.

Sama seperti softmax:

> masuk ke $(0,1)$ belum otomatis berarti empirically calibrated.

---

# 16. Probabilistic Loss — Mengukur Kualitas Probability Assignment

Probability prediction bukan hanya soal memilih class.

Kita juga dapat menilai **seberapa baik probability yang diberikan**.

Contoh binary event:

Actual target:

$$
y=1.
$$

Model A memberi:

$$
p=0.90.
$$

Model B memberi:

$$
p=0.10.
$$

Keduanya bisa dibandingkan dengan probabilistic loss.

Intuition:

- Model A memberi probability tinggi ke event yang ternyata terjadi;
- Model B memberi probability sangat rendah ke event yang ternyata terjadi.

Probabilistic loss seharusnya memberi penalty lebih besar pada Model B.

---

# 17. Log Loss / Cross-Entropy — Advanced Optional

scikit-learn menyebut log loss sebagai **logistic loss / cross-entropy loss** dan mendefinisikannya untuk binary target $y\in\{0,1\}$ serta probability estimate $p$. [R5]

## [Advanced Optional]

$$
L_{\log}(y,p)
=
-\left[
y\log p
+
(1-y)\log(1-p)
\right].
$$

Untuk:

$$
y=1,
$$

formula menyederhana secara conceptual menjadi:

$$
L=-\log p.
$$

Maka:

- jika $p$ tinggi untuk event yang benar → loss lebih kecil;
- jika $p$ sangat kecil untuk event yang benar → loss lebih besar.

## Penting

Cross-entropy/log loss adalah:

> **loss value**.

Bukan:

- probability;
- confidence;
- accuracy;
- calibration score yang berdiri sendiri;
- posterior probability.

---

# 18. PyTorch vs Evaluation API — Jangan Campur Input Semantics

Ada dua contexts yang perlu dibedakan.

## Context A — scikit-learn `log_loss`

API menerima predicted probabilities untuk evaluation. [R5]

## Context B — PyTorch `CrossEntropyLoss`

PyTorch menerima raw unnormalized logits untuk multiclass training/evaluation computation dan internally combines log-softmax-style computation dengan target loss. [R3]

Jadi kalimat:

> “CrossEntropyLoss selalu menerima probabilities”

tidak benar secara framework-general.

Sebaliknya:

> “Cross-entropy adalah probability”

juga salah.

Cross-entropy adalah loss.

---

# 19. Why This Matters in AI

Satu angka model dapat gagal dipahami pada beberapa layer:

### Error 1

> score disebut probability.

### Error 2

> probability-shaped output dianggap calibrated.

### Error 3

> calibrated probability dianggap certainty.

### Error 4

> calibration dianggap accuracy.

### Error 5

> logits dianggap probability.

### Error 6

> cross-entropy dianggap probability.

Topic 08 memberi checklist audit:

1. **Apa angka ini?**
2. **Bagaimana ia didefinisikan?**
3. **Apakah ia intended probability?**
4. **Apa target event-nya?**
5. **Apakah probability quality dievaluasi?**
6. **Apakah calibration statement aggregate atau individual?**
7. **Apakah raw logits sudah dibedakan dari normalized output?**
8. **Apakah loss dibedakan dari probability?**

---

# 20. Misconception Challenge

## Miskonsepsi 1 — Semua angka $[0,1]$ adalah probability

Salah.

Range adalah necessary property probability, bukan sufficient semantic definition.

---

## Miskonsepsi 2 — Score = probability

Salah.

Canonical:

$$
h=0.94
$$

tetap instructional score.

---

## Miskonsepsi 3 — Predicted probability = calibrated probability

Belum tentu.

Probability output dapat miscalibrated.

---

## Miskonsepsi 4 — Calibration = accuracy

Salah.

Mereka menjawab pertanyaan evaluation berbeda.

---

## Miskonsepsi 5 — Calibration = certainty

Salah.

Calibration adalah aggregate predictive property.

---

## Miskonsepsi 6 — Logit = probability

Salah.

Raw logits tidak perlu memenuhi probability constraints. [R3]

---

## Miskonsepsi 7 — Softmax otomatis calibrated

Salah.

Softmax memberikan normalized output, bukan empirical calibration proof. [R1][R4]

---

## Miskonsepsi 8 — Cross-entropy = probability

Salah.

Cross-entropy/log loss adalah loss. [R3][R5]

---

# 21. Try It Yourself

## Try 1 — Classify the number

Tentukan label paling aman untuk setiap angka.

1. $h=0.78$ dari weighted formula HerAI.
2. $\hat p=0.78$ dari model yang documented sebagai estimate $P(Y=1\mid\mathbf{x})$.
3. raw logit $z=2.4$.
4. log loss $L=0.22$.

Pilihan semantic:

- score;
- predicted probability;
- raw logit;
- loss.

---

## Try 2 — Calibration reading

Synthetic bin:

$$
\text{avg predicted}=0.80,
$$

$$
\text{observed positive fraction}=0.57.
$$

Apa diagnosis paling aman?

---

## Try 3 — Canonical safety

Seseorang berkata:

> “Citra score 0.94 berarti model 94% confident.”

Apa information yang hilang?

---

## Try 4 — Softmax safety

Seseorang berkata:

> “Softmax outputs sum to one, jadi pasti calibrated.”

Apa yang benar dan apa yang salah?

---

# 22. Visual / Interactive Specification

## [COMPARE VIEW] Score vs Probability vs Calibration + Reliability Diagram

**Purpose:** membantu learner membedakan numerical shape dari probability semantics dan empirical calibration.

**Initial state/data:**

### Panel A — Canonical score

Citra:

$$
h=0.94.
$$

Label:

`Instructional score — no probability semantics.`

### Panel B — Synthetic probability predictions

Bins:

| Avg prediction | Observed positive fraction |
|---:|---:|
| 0.20 | 0.22 |
| 0.50 | 0.48 |
| 0.80 | 0.79 |

### Panel C — Synthetic miscalibrated predictions

| Avg prediction | Observed positive fraction |
|---:|---:|
| 0.20 | 0.40 |
| 0.50 | 0.62 |
| 0.80 | 0.58 |

**Learner action:**

- click `Classify Citra 0.94`;
- toggle `Show reliability diagonal`;
- toggle calibrated/miscalibrated dataset;
- hover each bin;
- click `Is this accuracy?`;
- click `Is this certainty?`.

**Expected behavior:**

- Citra 0.94 is rejected as probability unless semantics are added;
- reliability plot shows diagonal $y=x$;
- Panel B points sit near diagonal;
- Panel C visibly deviates;
- explanations distinguish calibration from accuracy and certainty.

**Feedback:**

- `Range [0,1] is not enough.`
- `Calibration compares probability levels with observed event fractions across groups/bins.`
- `One prediction is not a calibration proof.`
- `Calibration is not accuracy.`
- `Calibration is not certainty.`

**Safety note:**

- canonical four participants are **not** used to construct calibration bins;
- calibration panels use larger synthetic evaluation summaries;
- no production-model claim;
- no causal claim;
- diagonal is a calibration reference, not an “accuracy line.”

---

# 23. Checkpoint

1. Apa beda $s$ dan $\hat p$?
2. Mengapa 0.94 belum tentu probability?
3. Apa arti well calibrated untuk prediction sekitar 0.8?
4. Apa yang ditampilkan reliability diagram?
5. Apakah calibration sama dengan accuracy?
6. Apakah calibration berarti certainty?
7. Apakah raw logits probabilities?
8. Apa property softmax?
9. Mengapa softmax belum membuktikan calibration?
10. Apa probabilistic loss?
11. Apakah cross-entropy probability?
12. Mengapa canonical HerAI score tidak boleh dibuat menjadi probability secara otomatis?

---

# 24. Mastery Check — “I Can”

- [ ] **I can** membedakan score dan probability.
- [ ] **I can** membaca $\hat P(Y=1\mid\mathbf{x})$.
- [ ] **I can** menjelaskan calibration.
- [ ] **I can** membaca simple reliability diagram.
- [ ] **I can** menjelaskan calibration bukan accuracy.
- [ ] **I can** menjelaskan calibration bukan certainty.
- [ ] **I can** menjelaskan logits bukan probabilities.
- [ ] **I can** menjelaskan softmax normalization tanpa overclaim calibration.
- [ ] **I can** menjelaskan probabilistic loss secara qualitative.
- [ ] **I can** menyebut cross-entropy/log loss sebagai loss, bukan probability.
- [ ] **I can** menolak “Citra 0.94 = 94% probability.”

---

# 25. Scope Boundary

Topic 08 tidak memperluas core ke:

- calibration algorithm implementation;
- temperature scaling computation;
- isotonic regression;
- Platt scaling derivation;
- logistic regression derivation;
- sigmoid derivative;
- softmax derivative/Jacobian;
- entropy theory;
- KL divergence;
- full information theory;
- cross-entropy derivation;
- gradients;
- backpropagation;
- optimizer behavior;
- model training code;
- production calibration protocol design.

Cross-entropy formula hanya **Advanced Optional**.

---

# 26. Summary

Topic 08 menyatukan Probability dengan AI-output literacy.

Core conclusions:

1. score $s$ tidak otomatis probability;
2. angka $[0,1]$ tidak otomatis probability;
3. predicted probability harus memiliki explicit target/event semantics;
4. calibrated probability berarti probability levels align dengan observed event frequencies dalam evaluation framing;
5. reliability diagram membandingkan average predicted probability dengan observed positive fraction;
6. calibration bukan accuracy;
7. calibration bukan certainty;
8. calibration bukan causality;
9. logits bukan probabilities;
10. softmax menghasilkan normalized outputs tetapi tidak otomatis membuktikan calibration;
11. probabilistic loss menilai kualitas probability assignment terhadap target;
12. cross-entropy/log loss adalah loss, bukan probability;
13. canonical Citra score 0.94 tetap score, bukan “94% probability.”

---

# 27. End of Topic 08 — Stop Before Final Consolidation

Dengan Topic 08, semua topic content Submodule 04 sudah memiliki jalur:

1. Event, Outcome, Sample Space
2. Probability dan Complement
3. Joint, Union, Probability Table
4. Conditional Probability
5. Independence dan Dependence
6. Bayes sebagai Update Keyakinan
7. Random Variable, Distribution, Expected Value
8. Score, Probability, Calibration, Probabilistic Loss

Tetapi workflow belum mengizinkan final consolidation secara otomatis.

> **Final consolidation + combined assessment hanya boleh dibuat setelah Topic 08 mendapat explicit user approval.**

---

# References Used

Markers `[R1]`–`[R5]` mengacu ke `referensi-topic-08.md`.
