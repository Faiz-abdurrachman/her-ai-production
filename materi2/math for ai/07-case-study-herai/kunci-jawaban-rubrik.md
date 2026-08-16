# Kunci Jawaban dan Rubrik — Final Assessment Submodule 07

---

# A. Kunci + Rubrik Open Exercises

## Latihan 1 — Data Contract dan Quantity Semantics

### Model reasoning

Expected classifications:

| Quantity | Source class | Semantic type |
|---|---|---|
| Bima $c=0.625$ | canonical observed/context | completion ratio/context scalar |
| Alya AI interest $0.80$ | synthetic pedagogical | participant feature |
| Citra $h=0.94$ | derived | constructed instructional score |
| cosine $0.9257$ | derived | matching score |
| $y=1$ | synthetic pedagogical outcome | target/label |
| $\hat y=0.56$ | model-produced | raw prediction score |
| $\ell$ | derived | per-example loss |
| accuracy $0.75$ | derived from eval decisions/targets | evaluation metric |

Key principle:

> Numeric range does not determine semantic type; definition, provenance, operation, and intended use do.

### Rubric — 10 poin

- 4: classifications/source types largely correct.
- 2: justified conclusions.
- 2: prohibited conclusions.
- 2: explains same-range/different-meaning principle.

---

## Latihan 2 — Representation, Dot Product, dan Cosine Ranking

### Model answer

Bima:

$$
\mathbf{x}=[0.5,0.7,0.6,0.4]^\top.
$$

Dot Intro AI:

$$
0.5(1.0)+0.7(0.6)+0.6(0.3)+0.4(0.2)=1.18.
$$

Dot Belajar Python:

$$
0.5(0.2)+0.7(1.0)+0.6(0.5)+0.4(0.1)=1.14.
$$

Norms:

$$
\|\mathbf{x}_{\mathrm{Bima}}\|=\sqrt{0.25+0.49+0.36+0.16}=\sqrt{1.26}\approx1.1225.
$$

$$
\|\mathbf{v}_{\mathrm{IntroAI}}\|=\sqrt{1+0.36+0.09+0.04}=\sqrt{1.49}\approx1.2207.
$$

$$
\|\mathbf{v}_{\mathrm{Python}}\|=\sqrt{0.04+1+0.25+0.01}=\sqrt{1.30}\approx1.1402.
$$

Cosine:

$$
\cos(\mathbf{x},\mathbf{v}_{\mathrm{IntroAI}})
\approx0.8612.
$$

$$
\cos(\mathbf{x},\mathbf{v}_{\mathrm{Python}})
\approx0.8907.
$$

Thus cosine ranks Belajar Python above Intro AI, while raw dot product ranks Intro AI above Belajar Python.

Reason: cosine normalizes by vector magnitude; dot does not.

### Rubric — 10 poin

- 2: dot products.
- 2: norms.
- 2: cosine calculations.
- 1: ranking.
- 1: dot-vs-cosine explanation.
- 2: similarity/probability/educational boundary.

---

## Latihan 3 — Data Diagnostics dan Corrupted Record

### Model answer

Canonical completion values:

$$
0.50,0.625,0.75,1.00.
$$

Mean:

$$
\bar c=\frac{2.875}{4}=0.71875.
$$

Median:

$$
\tilde c=\frac{0.625+0.75}{2}=0.6875.
$$

Range:

$$
1.00-0.50=0.50.
$$

For `1.20`, possible audit causes include wrong denominator, duplicate events, unit/scale mismatch, transformation bug, or changed field definition.

Automatic clipping can hide upstream data corruption and silently alter evidence.

High duration–quiz correlation on four pedagogical records supports association only, not causation.

### Rubric — 10 poin

- 3: center/range calculations.
- 2: summary interpretation.
- 2: root-cause audit.
- 1: clipping risk.
- 2: correlation/causation + tiny-$n$ boundary.

---

## Latihan 4 — Conditional Probability

### Model answer

$$
P(A)=\frac7{16}=0.4375
$$

$$
P(E)=\frac8{16}=0.5
$$

$$
P(A\cap E)=\frac5{16}=0.3125
$$

$$
P(E\mid A)=\frac57\approx0.7143
$$

$$
P(A\mid E)=\frac58=0.625
$$

$$
P(E^c\mid A)=\frac27\approx0.2857.
$$

$P(E\mid A)$ and $P(A\mid E)$ use different conditioned reference sets/denominators. Conditional association does not prove causal effect. Cosine has different provenance and definition from probability.

### Rubric — 10 poin

- 5: six calculations substantially correct.
- 2: conditional-denominator explanation.
- 2: causation boundary.
- 1: cosine/probability distinction.

---

## Latihan 5 — Prediction, Error, Loss, Objective

### Model answer

$$
\hat y=0.5(0.8907)+0.1=0.54535.
$$

$$
e=0.54535-1=-0.45465.
$$

$$
\ell=\frac12(-0.45465)^2\approx0.103353.
$$

Error is signed residual; squared loss is nonnegative penalty. $\ell_i$ is one-example loss; $J$ aggregates many losses. $\hat y$ is raw score, not probability. $h$ is not target because it is a constructed instructional score; using it as target would create a circular/semantic-ground-truth risk.

### Rubric — 10 poin

- 2: prediction.
- 2: error.
- 2: loss.
- 1: error-vs-loss.
- 1: loss-vs-objective.
- 2: raw-score/$h$ semantic boundaries.

---

## Latihan 6 — Gradient, Update, dan Learning Rate

### Model answer

$$
-\eta\nabla J
=
-0.1
\begin{bmatrix}
-0.043585209375\\
-0.01933125
\end{bmatrix}
=
\begin{bmatrix}
0.0043585209375\\
0.001933125
\end{bmatrix}.
$$

$$
\theta_1
=
\begin{bmatrix}
0.5043585209375\\
0.101933125
\end{bmatrix}.
$$

Parameters rise because subtracting negative gradient components creates positive increments. Gradient is local derivative information; update is $-\eta\nabla J$; next parameter is current + update. $J_1<J_0$ justifies only that chosen objective decreased on that step. Large $\eta$ can overshoot despite correct local descent direction.

### Rubric — 10 poin

- 2: update vector.
- 2: next parameters.
- 2: sign/descent explanation.
- 2: gradient/update/state distinction.
- 2: objective + learning-rate boundary.

---

## Latihan 7 — Held-Out Evaluation

### Model answer

Held-out:

$$
\text{Accuracy}=\frac{5+1}{8}=0.75
$$

$$
\text{Precision}=\frac5{5+2}=\frac57\approx0.7143
$$

$$
\text{Recall}=\frac5{5+0}=1.0.
$$

Training:

$$
\text{Accuracy}=\frac{6+6}{16}=0.75
$$

$$
\text{Precision}=\frac6{6+2}=0.75
$$

$$
\text{Recall}=\frac6{6+2}=0.75.
$$

Accuracy matches but error profiles differ; held-out has no FN in eight examples but has two FP. Tiny synthetic held-out metrics are not production HerAI performance. Completion is not mastery. Training objective, evaluation metric, and educational outcome answer different questions.

### Rubric — 10 poin

- 3: held-out metrics.
- 2: training metrics.
- 2: error-profile comparison.
- 2: production/generalization boundary.
- 1: objective/metric/outcome distinction.

---

## Latihan 8 — End-to-End Failure Audit

### Model reasoning

A strong answer should identify at least ten failures, such as:

1. cosine $0.9081$ relabeled probability;
2. score range mistaken for probabilistic semantics;
3. highest similarity treated as educational best;
4. mathematical matching treated as causal evidence;
5. synthetic data treated as real production data;
6. completion target treated as educational success/mastery;
7. lower training loss treated as evaluation success;
8. optimization success treated as generalization;
9. held-out synthetic accuracy generalized to future HerAI;
10. one metric treated as full system quality;
11. no real educational-effect evidence;
12. no deployment/risk/fairness/operational evidence;
13. uncertainty/probability model omitted;
14. data/representation assumptions ignored.

Defensible rewrite should say the case demonstrates an instructional mathematical pipeline on synthetic data and can report exact matching/training/evaluation quantities only within that defined case.

### Rubric — 10 poin

- 4: at least ten meaningful failures across stages.
- 2: correct pipeline mapping.
- 2: defensible rewrite.
- 1: missing educational evidence.
- 1: missing deployment/system evidence.

---

# B. Kunci MCQ

| Q | Answer | Rationale |
|---|---|---|
| 1 | C | $h$ is constructed instructional score only. |
| 2 | B | Semantic type comes from definition/provenance, not numerical range. |
| 3 | B | Dot and cosine can rank differently because cosine normalizes magnitudes. |
| 4 | C | $(0.75+0.625+1+0.5)/4=0.71875$. |
| 5 | C | Conditioning on $A$ changes denominator to $|A|=7$. |
| 6 | D | $\hat y=0.5$, error $=-0.5$, half-squared loss $=0.125$. |
| 7 | B | Subtracting a negative gradient component creates a positive update component. |
| 8 | B | Equal accuracy can hide different FP/FN structures. |
| 9 | C | Lower training objective does not establish educational outcome. |
| 10 | C | Integrated Case demonstrates coherent reasoning with explicit semantic/evidence boundaries. |

---

# C. Expected Reasoning — Discussions

## Diskusi 1 — Apakah Bukti Cukup untuk Launch?

Expected strong reasoning:

- current profiles/outcomes/evaluation are synthetic;
- no representative production population evidence;
- cosine is not probability;
- completion is a proxy, not mastery;
- training-objective decrease is not held-out/generalization proof;
- eight held-out synthetic records are insufficient for production claims;
- fairness/risk/human/curriculum constraints remain unresolved;
- deployment requires system-level operational, monitoring, safety, documentation, governance, and real-world evidence beyond this math exercise.

**Boundary:** discussion is conceptual, not compliance certification.

## Diskusi 2 — Apa yang Sebaiknya Dioptimalkan HerAI?

Expected strong reasoning:

- objective must reflect a clearly defined task;
- completion may be useful but can misalign with learning effectiveness;
- mastery, retention, satisfaction, accessibility, fairness, and completion are distinct outcomes;
- adding more data cannot repair the semantics of a wrong target/objective;
- optimization objective and evaluation metrics are technical quantities; product/educational goals require broader evidence and judgment;
- next research questions may include target validity, measurement, evaluation design, subgroup behavior, and real educational outcomes, but those are not solved by this submodule.
