# Topic 07 — Evaluation, Failure Modes, dan What Comes Next
## Submodule 07 — Integrated Case Study: Math for AI di HerAI

> **Final Topic Submodule 07.** Topic ini menutup end-to-end mathematical reasoning chain. Semua model, target, session outcome, dan held-out evaluation records yang ditambahkan pada Integrated Case tetap **SINTETIK / HIPOTETIK / INSTRUKSIONAL**. Tidak ada angka pada Topic ini yang boleh dipresentasikan sebagai performa sistem produksi HerAI.

---

# 1. HOOK / REAL PROBLEM — Training objective turun. Apakah sistem sudah “bagus”?

Pada Topic 06:

$$
J_0
\approx
0.1083902602
$$

turun menjadi:

$$
J_2
\approx
0.1080109017.
$$

Secara optimization trace, itu benar.

Tetapi kalimat berikut terlalu jauh:

> “Loss turun, jadi recommendation system sudah bagus untuk peserta.”

Kenapa?

Karena ada minimal tiga lapisan berbeda:

1. **training objective** — apa yang optimizer coba turunkan;
2. **evaluation quantities** — bagaimana behavior di data yang tidak dipakai untuk update dinilai;
3. **educational/product outcomes** — apakah sistem benar-benar membantu learner dan produk.

Mereka saling berhubungan, tetapi tidak sama.

---

# 2. PREDICT — Accuracy sama berarti model behavior sama?

Bayangkan dua evaluation sets menghasilkan:

$$
\text{Accuracy}=0.75.
$$

Apakah behavior keduanya pasti sama?

Tidak.

Satu model/set dapat punya:

- lebih banyak false positive;
- lebih banyak false negative;
- precision lebih rendah;
- recall lebih tinggi.

Jadi satu metric tidak menceritakan seluruh error structure.

---

# 3. LEARNING OUTCOMES

Setelah Topic 07, kamu diharapkan mampu:

1. membedakan training objective, held-out evaluation quantity, dan educational/product outcome;
2. menjelaskan mengapa training data tidak boleh diam-diam disebut unseen evaluation data;
3. menghitung held-out half-squared loss, MSE, MAE, accuracy, precision, dan recall pada synthetic example;
4. membaca confusion matrix;
5. menjelaskan pengaruh threshold terhadap predicted class;
6. membedakan raw model score dari probability dan class decision;
7. menjelaskan mengapa equal accuracy dapat menyembunyikan different error profiles;
8. mengidentifikasi failure modes dari seluruh Integrated Case;
9. menulis justified conclusion dan prohibited conclusion;
10. menjelaskan kapan system evidence masih belum cukup untuk deployment/educational claim;
11. menelusuri seluruh chain Math for AI dari representation sampai evaluation;
12. menjelaskan apa yang seharusnya dipelajari setelah Math for AI tanpa menganggap advanced topic sudah dikuasai.

---

# 4. REACTIVATE ONLY WHAT IS NEEDED

Learner sudah punya:

- data contract;
- vectors dan cosine;
- descriptive diagnostics;
- probability semantics;
- score/target/loss/objective distinction;
- gradient/update distinction.

Topic 07 tidak membuka cabang matematika baru.

Ia menjawab:

> **Apakah conclusion kita sesuai dengan evidence yang benar-benar dimiliki?**

---

# 5. END-TO-END TRACE YANG SUDAH DIBANGUN

```text
participant + material records
        ↓
shared feature representation
        ↓
cosine matching score
        ↓
descriptive diagnostics
        ↓
explicit probability experiment
        ↓
synthetic target
        ↓
raw model score
        ↓
per-example loss
        ↓
training objective
        ↓
gradient
        ↓
parameter update
        ↓
evaluation
        ↓
failure modes + conclusion boundary
```

Tidak ada arrow yang mengizinkan semantic collapse.

---

# 6. TIGA LAPIS EVALUATION CONTRACT

## 6.1 Layer A — Training objective

Locked objective:

$$
J(w,b)
=
\frac1{16}
\sum_{i=1}^{16}
\frac12(ws_i+b-y_i)^2.
$$

Ia dipakai langsung untuk optimization.

Semantic type:

> **training objective**

---

## 6.2 Layer B — Held-out synthetic evaluation quantities

Untuk belajar evaluation dengan benar, kita membutuhkan records yang **tidak dipakai menghitung gradient Topic 06**.

Topic ini menambahkan:

> **SUPPLEMENTARY SYNTHETIC HELD-OUT SESSION TABLE**

Records ini:

- bukan production data;
- tidak digunakan dalam Topic 05–06 parameter update;
- hanya untuk evaluation exercise.

---

## 6.3 Layer C — Educational/product outcomes

Contoh quantity yang mungkin relevan di dunia nyata:

- mastery;
- retention;
- learner satisfaction;
- dropout;
- accessibility;
- fairness across groups;
- curriculum progression;
- long-term educational benefit.

Tetapi Integrated Case **tidak mempunyai real evidence** untuk quantity tersebut.

Jadi result yang benar:

> **educational/product outcome = NOT ESTABLISHED by this case.**

---

# 7. POST-UPDATE PARAMETER STATE

Kita evaluate exact state setelah dua Gradient Descent steps:

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

Raw score:

$$
\hat y
=
0.5083089922\,s
+
0.1033411070.
$$

Reminder:

> $\hat y$ adalah raw model score, bukan probability.

---

# 8. THRESHOLD CONTRACT

Untuk membuat **toy binary decision** dari raw score, kita tetapkan:

$$
\tau=0.5.
$$

Decision rule:

$$
\hat c_i
=
\begin{cases}
1,& \hat y_i\ge0.5,\\
0,& \hat y_i<0.5.
\end{cases}
$$

Important:

- threshold $0.5$ adalah **pedagogical evaluation choice**;
- bukan probability threshold;
- tidak learned;
- tidak optimized;
- bukan production policy.

Raw score dan class decision berbeda:

$$
\hat y_i\neq \hat c_i.
$$

---

# 9. SUPPLEMENTARY SYNTHETIC HELD-OUT TABLE

> Unit: synthetic later session record. Outcome tetap `completed_7d`. Nilai target di bawah dibuat untuk evaluation exercise dan tidak overwrite training table Topic 04–06.

| Eval ID | Participant | Material | $s$ | $y$ | $\hat y$ | $\hat c$ | Half-loss |
|---|---|---|---:|---:|---:|---:|---:|
| E01 | Alya | Intro AI | 0.9257 | 1 | 0.57388 | 1 | 0.090788 |
| E02 | Alya | Matematika Dasar | 0.8753 | 1 | 0.54826 | 1 | 0.102033 |
| E03 | Bima | Belajar Python | 0.8907 | 1 | 0.55609 | 1 | 0.098527 |
| E04 | Bima | Intro AI | 0.8612 | 0 | 0.54110 | 1 | 0.146393 |
| E05 | Citra | Matematika Dasar | 0.9081 | 0 | 0.56494 | 1 | 0.159577 |
| E06 | Citra | Intro AI | 0.9056 | 1 | 0.56367 | 1 | 0.095194 |
| E07 | Dewi | Desain UI/UX | 0.8867 | 1 | 0.55406 | 1 | 0.099432 |
| E08 | Dewi | Belajar Python | 0.7117 | 0 | 0.46510 | 0 | 0.108161 |

Ada:

$$
n_{\text{eval}}=8.
$$

---

# 10. HELD-OUT LOSS QUANTITIES

Held-out mean half-squared loss:

$$
J_{\text{eval}}
=
\frac1{8}
\sum_{i=1}^{8}
\frac12(\hat y_i-y_i)^2.
$$

Result:

$$
J_{\text{eval}}
\approx
0.1125130188.
$$

Corresponding MSE:

$$
\operatorname{MSE}_{\text{eval}}
=
2J_{\text{eval}}
\approx
0.2250260377.
$$

MAE:

$$
\operatorname{MAE}_{\text{eval}}
=
\frac1{8}
\sum_i|\hat y_i-y_i|
\approx
0.4718968593.
$$

Compare training objective at same parameter state:

$$
J_{\text{train}}
\approx
0.1080109017.
$$

Held-out synthetic loss sedikit lebih tinggi:

$$
J_{\text{eval}}
>
J_{\text{train}}.
$$

Safe:

> Pada exact synthetic split ini, held-out half-squared loss lebih tinggi daripada training half-squared objective.

Unsafe:

> “Model overfit secara pasti.”

Perbedaan kecil pada tiny synthetic evaluation set tidak cukup untuk sweeping diagnosis.

---

# 11. CONFUSION MATRIX

Dengan threshold:

$$
\tau=0.5,
$$

held-out predictions menghasilkan:

- True Positive:

$$
TP=5
$$

- True Negative:

$$
TN=1
$$

- False Positive:

$$
FP=2
$$

- False Negative:

$$
FN=0.
$$

Confusion matrix:

| | Actual $y=1$ | Actual $y=0$ |
|---|---:|---:|
| Predicted $\hat c=1$ | TP = 5 | FP = 2 |
| Predicted $\hat c=0$ | FN = 0 | TN = 1 |

---

# 12. ACCURACY

Formula:

$$
\text{Accuracy}
=
\frac{TP+TN}{TP+TN+FP+FN}.
$$

Substitusi:

$$
\text{Accuracy}
=
\frac{5+1}{8}
=
\frac68
=
0.75.
$$

Interpretation:

> 6 dari 8 held-out synthetic class decisions cocok dengan synthetic binary targets.

Bukan:

> “Sistem HerAI 75% akurat.”

---

# 13. PRECISION

Formula:

$$
\text{Precision}
=
\frac{TP}{TP+FP}.
$$

Substitusi:

$$
\text{Precision}
=
\frac{5}{5+2}
=
\frac57
\approx
0.7143.
$$

Interpretation:

> Dari 7 held-out records yang diberi predicted class 1, 5 mempunyai synthetic target 1.

---

# 14. RECALL

Formula:

$$
\text{Recall}
=
\frac{TP}{TP+FN}.
$$

Substitusi:

$$
\text{Recall}
=
\frac{5}{5+0}
=
1.
$$

Interpretation:

> Semua five actual-positive synthetic eval records mendapat predicted class 1 pada threshold ini.

Bukan:

> “Model tidak pernah miss positive di dunia nyata.”

Kita hanya punya 8 synthetic records.

---

# 15. SAME ACCURACY, DIFFERENT ERROR PROFILE

Pada 16 training rows, dengan **parameter state dan threshold yang sama**:

$$
TP=6,\quad TN=6,\quad FP=2,\quad FN=2.
$$

Training accuracy:

$$
\frac{6+6}{16}
=
0.75.
$$

Training precision:

$$
\frac6{6+2}
=
0.75.
$$

Training recall:

$$
\frac6{6+2}
=
0.75.
$$

Held-out synthetic:

- accuracy $=0.75$;
- precision $\approx0.7143$;
- recall $=1.0$.

Jadi:

> **Accuracy sama, error behavior berbeda.**

Ini alasan metric harus dipilih sesuai question/cost, bukan karena satu metric populer.

---

# 16. MATH / SYSTEM READING SKILL — BEDAH ACCURACY

Untuk:

$$
\text{Accuracy}=0.75,
$$

baca:

1. **Object:** 8 held-out synthetic session records.
2. **Source:** predicted classes + synthetic targets.
3. **Operation:** count correct / total.
4. **Output:** scalar ratio.
5. **Semantic type:** evaluation metric.
6. **Threshold dependency:** yes, karena predicted class memakai $\tau=0.5$.
7. **Assumption:** this synthetic eval set is the reference set.
8. **Justified:** 75% decisions correct on this set.
9. **Not justified:** 75% future accuracy, educational success, calibration.
10. **Downstream role:** one piece of evaluation evidence.

---

# 17. EVALUATION METRIC VS TRAINING OBJECTIVE

Training objective:

$$
J_{\text{train}}.
$$

Evaluation metric:

$$
\text{Accuracy},
\quad
\text{Precision},
\quad
\text{Recall}.
$$

Mereka berbeda.

Optimizer Topic 06 tidak langsung mengoptimalkan accuracy.

Ia mengoptimalkan:

$$
J(w,b).
$$

Jadi:

> training objective $\neq$ evaluation metric automatically.

---

# 18. EVALUATION METRIC VS EDUCATIONAL OUTCOME

Suppose:

$$
\text{Accuracy}=0.75.
$$

Apakah berarti:

> 75% learner lebih paham?

Tidak.

Prediction target kita hanya:

> synthetic `completed_7d`.

Completion berbeda dari:

- mastery;
- learning gain;
- retention;
- quality of recommendation.

Metric hanya sebaik semantics dari target dan evaluation design-nya.

---

# 19. THRESHOLD CHANGES THE CLASSIFICATION

Decision:

$$
\hat c_i
=
\mathbb{1}[\hat y_i\ge\tau].
$$

Jika $\tau$ berubah:

- TP dapat berubah;
- FP dapat berubah;
- TN dapat berubah;
- FN dapat berubah;
- accuracy/precision/recall dapat berubah.

Jadi classification metric bukan property raw model score saja.

Ia juga bergantung pada **decision threshold**.

Topic ini tidak melakukan threshold optimization.

---

# 20. FAILURE-MODE TAXONOMY — SELURUH INTEGRATED CASE

## 20.1 Problem-definition failure

Contoh:

> Sistem diminta “meningkatkan hasil belajar”, tetapi target yang tersedia hanya completion.

Risk:

objective proxy tidak sama dengan ultimate goal.

---

## 20.2 Data-contract failure

Contoh:

- `0.8` dan `80` dicampur;
- missing dianggap zero;
- field `score` tidak punya definition.

Downstream math dapat benar tetapi meaning salah.

---

## 20.3 Representation failure

Participant/material shared axes dapat:

- tidak lengkap;
- terlalu simplistik;
- tidak mencerminkan pedagogical prerequisites.

Cosine hanya bekerja pada representation yang diberikan.

---

## 20.4 Matching failure

Highest cosine:

> bukan otomatis best educational recommendation.

Metric choice dapat mengubah ranking.

---

## 20.5 Data-diagnostics failure

Potential issues:

- outlier dihapus tanpa investigation;
- correlation dibaca sebagai causation;
- tiny-$n$ dianggap population evidence.

---

## 20.6 Uncertainty failure

Contoh:

$$
0.90\text{ score}\rightarrow90\%\text{ probability}
$$

tanpa probability model.

Itu semantic error.

---

## 20.7 Target failure

Synthetic `completed_7d` berguna untuk toy task.

Tetapi completion dapat menjadi poor proxy jika goal sebenarnya mastery/retention.

---

## 20.8 Objective failure

Optimizer dapat berhasil menurunkan:

$$
J
$$

tetapi objective mungkin tidak align dengan product/educational value.

---

## 20.9 Optimization failure

- learning rate terlalu besar;
- stale gradient;
- wrong sign;
- one update dianggap convergence.

---

## 20.10 Evaluation failure

- evaluate pada training data lalu menyebut unseen performance;
- hanya memilih metric yang terlihat bagus;
- threshold tidak didokumentasikan;
- tiny synthetic evaluation digeneralisasi.

---

## 20.11 Generalization failure

Model dapat perform baik pada training tetapi lebih buruk pada unseen data.

Training fit bukan generalization guarantee.

---

## 20.12 Human/system failure

Even if metrics look acceptable:

- curriculum constraints dapat dilanggar;
- learner goals dapat diabaikan;
- data dapat incomplete;
- risk/impact belum dinilai.

Mathematical score tidak menggantikan human/system judgment.

---

# 21. CONCLUSION BOUNDARY TABLE

| Evidence | Boleh disimpulkan | Tidak boleh disimpulkan |
|---|---|---|
| cosine top-1 | top score menurut metric/representation | pedagogically best |
| $P(E\mid A)$ synthetic | conditional probability di defined experiment | causal effect |
| lower $J_{\text{train}}$ | better fit to chosen training objective | better education |
| held-out accuracy 0.75 | 6/8 synthetic decisions correct | future HerAI accuracy 75% |
| recall 1.0 | no FN pada 8-row synthetic eval | real-world misses impossible |
| two GD steps | objective lowered for those steps | model converged/production-ready |

---

# 22. WHAT-IF — METRIC SELECTION CHANGES THE STORY

Suppose team hanya melaporkan:

$$
\text{Recall}=1.0.
$$

Itu terdengar sempurna.

Tetapi:

$$
FP=2.
$$

Precision hanya:

$$
\frac57\approx0.7143.
$$

Jadi report “recall sempurna” tanpa precision/confusion context dapat menyesatkan.

Sebaliknya, metric overload juga tidak membantu.

Good evaluation bertanya:

> **Metric mana yang menjawab risk/decision question kita?**

---

# 23. WHY THIS MATTERS IN AI

AI bukan hanya:

> “buat model lalu lihat accuracy.”

Reliable reasoning memerlukan:

- source/data audit;
- target semantics;
- objective semantics;
- evaluation design;
- metric choice;
- generalization boundary;
- downstream impact;
- documentation.

Optimization adalah bagian dari system.

Bukan keseluruhan system.

---

# 24. MISCONCEPTION / FAILURE-MODE CHALLENGE

## 24.1 “Training loss turun → model bagus”
**Tidak cukup.**

## 24.2 “Held-out accuracy 75% → future accuracy pasti 75%”
**Salah.**

## 24.3 “Recall 1.0 → model sempurna”
**Salah.**

## 24.4 “Accuracy sama → behavior sama”
**Salah.**

## 24.5 “High cosine → high probability”
**Salah.**

## 24.6 “Completion target → mastery”
**Salah.**

## 24.7 “Good offline metric → deployment-ready”
**Salah.**

## 24.8 “More data fixes wrong objective”
**Salah.**

## 24.9 “Optimizer guarantees generalization”
**Salah.**

## 24.10 “Mathematical ranking is causal recommendation rule”
**Salah.**

---

# 25. TRY IT YOURSELF — CONFUSION MATRIX

Suppose synthetic evaluation gives:

$$
TP=4,\quad TN=2,\quad FP=1,\quad FN=1.
$$

Compute:

$$
\text{Accuracy}
=
\frac{4+2}{8}
=
0.75.
$$

$$
\text{Precision}
=
\frac4{4+1}
=
0.8.
$$

$$
\text{Recall}
=
\frac4{4+1}
=
0.8.
$$

Same accuracy $0.75$ as canonical held-out exercise.

But precision/recall differ.

Again:

> same accuracy does not imply same error profile.

---

# 26. VISUAL / INTERACTIVE ARCHITECTURE

## [STATIC VISUAL] — Three evaluation layers

**Learning purpose:** separate training, evaluation, and educational/product outcomes.  
**Initial state:** three horizontal layers.  
**Learner action:** trace one quantity per layer.  
**Expected behavior:** learner places $J$, accuracy, mastery in different layers.  
**Feedback:** semantic definitions.  
**Safety note:** no arrow implies equivalence.

## [COMPARE VIEW] — Same accuracy, different confusion matrix

**Learning purpose:** show why one metric is incomplete.  
**Initial state:** training vs held-out confusion matrices.  
**Learner action:** compare accuracy/precision/recall.  
**Expected behavior:** recognizes equal accuracy but different error composition.  
**Feedback:** highlights FP/FN changes.  
**Safety note:** synthetic counts only.

## [NUMBER MANIPULATOR] — Threshold explorer

**Learning purpose:** connect threshold to decision metrics.  
**Initial state:** $\tau=0.5$.  
**Learner action:** move threshold.  
**Expected behavior:** predicted classes and confusion metrics recompute.  
**Feedback:** explain precision/recall tradeoff when observed.  
**Safety note:** raw score is not probability; threshold is not production policy.

## [STEP-BY-STEP REVEAL] — Evidence-to-conclusion boundary

**Learning purpose:** train claim discipline.  
**Initial state:** evidence card.  
**Learner action:** reveal justified then prohibited conclusion.  
**Expected behavior:** learner identifies overclaim.  
**Feedback:** explanation references semantic type.  
**Safety note:** educational claims require educational evidence.

## [INTERACTIVE VISUAL] — Failure-mode audit

**Learning purpose:** integrate all seven topics.  
**Initial state:** pipeline from data contract to evaluation.  
**Learner action:** click a stage and diagnose one failure.  
**Expected behavior:** learner proposes detection + boundary.  
**Feedback:** distinguishes math bug vs semantic/system bug.  
**Safety note:** not a production audit checklist certification.

---

# 27. CHECKPOINT

1. Is $J_{\text{train}}$ an evaluation accuracy metric?  
   **No.**

2. Is held-out accuracy $0.75$ a future guarantee?  
   **No.**

3. Held-out confusion values?  
   $$TP=5,\ TN=1,\ FP=2,\ FN=0.$$

4. Held-out precision?  
   $$5/7\approx0.7143.$$

5. Held-out recall?  
   $$1.0.$$

6. Training accuracy and held-out accuracy both?  
   $$0.75.$$

7. Do they have identical error profiles?  
   **No.**

8. Is synthetic completion equivalent to mastery?  
   **No.**

9. Does good offline metric imply deployment readiness?  
   **No.**

---

# 28. MASTERY CHECK — “I CAN…”

- **I can** separate training objective from evaluation metric.
- **I can** separate evaluation metric from educational outcome.
- **I can** calculate confusion-matrix metrics.
- **I can** explain accuracy/precision/recall.
- **I can** explain threshold dependency.
- **I can** compare training and held-out synthetic evidence.
- **I can** reject unseen/generalization claims unsupported by data.
- **I can** identify failure modes across the full pipeline.
- **I can** write justified and unjustified conclusions.
- **I can** explain why mathematical success does not equal product success.
- **I can** trace all Math for AI concepts through one coherent case.

---

# 29. SCOPE BOUNDARY

Topic 07 does **not** become a full course in:

- model selection;
- cross-validation;
- ROC/AUC derivation;
- recommender ranking metrics catalog;
- calibration procedures;
- fairness metric catalog;
- causal inference;
- A/B testing;
- production monitoring;
- MLOps;
- deployment;
- human-subject educational research.

Those can become future learning paths.

---

# 30. WHAT COMES NEXT

Setelah Math for AI, learner sekarang punya conceptual readiness untuk memahami kenapa bidang berikut membutuhkan fondasi matematika ini:

### Machine Learning
- features;
- labels;
- train/eval split;
- objective;
- generalization.

### Deep Learning
- vector/matrix transformations;
- computational graph;
- chain rule;
- gradients;
- optimization.

### Generative AI / LLM
- high-dimensional representations;
- probability distributions;
- loss/objective;
- training/evaluation boundaries.

### Responsible / production AI
- evaluation design;
- failure modes;
- risk;
- data/model documentation;
- system-level evidence.

Ini adalah **orientation**, bukan claim bahwa learner sudah menguasai semua bidang tersebut.

---

# 31. FINAL INTEGRATED SYSTEM READING CHECK

Untuk quantity apa pun, learner harus mampu menjawab:

1. object apa?
2. notation apa?
3. source-nya observed/engineered/derived/model-produced?
4. input/current state apa?
5. operation apa?
6. output apa?
7. semantic type apa?
8. assumptions apa?
9. conclusion apa yang justified?
10. conclusion apa yang prohibited?
11. siapa downstream consumer-nya?

Jika learner bisa melakukan ini dari:

$$
q
\rightarrow
\mathbf{x}
\rightarrow
s
\rightarrow
P(E\mid A)
\rightarrow
\hat y
\rightarrow
\ell
\rightarrow
J
\rightarrow
\nabla J
\rightarrow
\theta_{t+1}
\rightarrow
\text{evaluation metric},
$$

maka tujuan utama Integrated Case tercapai.

---

# 32. FINAL SUMMARY

Submodule 07 bukan matematika baru.

Ia menyatukan:

### Mathematical Readiness
notation, function, variable, data meaning.

### Linear Algebra
vectors, norms, dot product, cosine similarity.

### Statistics
center, spread, diagnostics, correlation boundary.

### Probability
event, conditioning, uncertainty semantics.

### Calculus
derivative, partial derivative, gradient.

### Optimization
loss, objective, Gradient Descent, learning rate.

### Integrated Case
menanyakan:

> **Apa yang quantity ini benar-benar berarti dalam satu AI-system reasoning chain?**

Final semantic firewall:

$$
\text{score}
\neq
\text{probability}
\neq
\text{loss}
\neq
\text{objective}
\neq
\text{evaluation metric}
\neq
\text{educational/product outcome}.
$$

Dan:

> **mathematical correctness adalah syarat penting, tetapi bukan satu-satunya syarat untuk system correctness.**

---

# 33. STOP / NEXT STAGE

Topic 07 adalah final topic Submodule 07.

Setelah Topic 07 approved, next action **bukan Topic 08**.

Next action adalah:

> **FINAL CONSOLIDATION + COMBINED INTEGRATED ASSESSMENT**

dengan approved Topic 01–07 lessons preserved verbatim sesuai final consolidation contract.
