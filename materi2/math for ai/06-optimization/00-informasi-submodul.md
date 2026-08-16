# Informasi Submodule 06 — Optimization: Dari Loss ke Parameter yang Lebih Baik

## Program

**HerAI Fellowship**  
**Category:** Foundation & Core AI  
**Module:** Math for AI  
**Submodule:** 06 — Optimization: Dari Loss ke Parameter yang Lebih Baik

## Status

**FINAL CONSOLIDATION + COMBINED ASSESSMENT**

Topic 01–08 telah diproduksi dan disetujui secara individual sebelum konsolidasi final.

## Tujuan akhir submodule

Setelah menyelesaikan Submodule 06, learner diharapkan mampu:

1. membedakan **per-example loss**, **aggregate training objective**, **evaluation metric**, dan **business/product metric** berdasarkan peran;
2. membaca minimization problem dan membedakan nilai minimum dari parameter yang meminimalkannya;
3. menghitung satu Gradient Descent update sederhana secara manual;
4. menjelaskan tanda negatif pada update sebagai minimization direction terhadap local gradient information;
5. menjelaskan learning rate sebagai pengontrol step magnitude tanpa menganggap ada satu nilai universal terbaik;
6. mengikuti beberapa update dan membaca parameter trajectory serta objective trajectory;
7. membedakan full-batch, minibatch, dan single-example/stochastic gradient;
8. mengenali Momentum dan Adam sebagai stateful first-order optimizer concepts tanpa menghafal seluruh derivasi;
9. menjelaskan regularization sebagai perubahan pada learning objective / preference, bukan optimizer;
10. menjelaskan mengapa lower training objective tidak otomatis berarti better unseen performance, generalization, fairness, calibration, atau production quality;
11. mentransfer konsep Optimization ke contoh HerAI yang eksplisit synthetic/hypothetical tanpa mengubah canonical HerAI score menjadi production loss.

## Approved Topic Map

1. **Loss, Objective, dan Evaluation Metric**
2. **Minimization dan Landscape**
3. **Gradient Descent Update Rule**
4. **Learning Rate**
5. **Beberapa Iterasi Sampai Loss Berubah**
6. **Batch, Minibatch, dan Stochastic Gradient**
7. **Momentum dan Adam: Peta Konsep**
8. **Regularization, Generalization, dan Boundary Modul**

## Core mathematical arc

Per-example loss:

$$
\ell^{(i)}(\boldsymbol{\theta}).
$$

Aggregate objective:

$$
J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta}).
$$

Gradient Descent update:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t),
\qquad
\eta>0.
$$

Minibatch gradient:

$$
g_t
=
\frac{1}{m}
\sum_{i\in\mathcal{B}_t}
\nabla\ell^{(i)}(\boldsymbol{\theta}_t).
$$

Regularized objective bridge:

$$
J_{\text{reg}}(\boldsymbol{\theta})
=
J_{\text{train}}(\boldsymbol{\theta})
+
\lambda\Omega(\boldsymbol{\theta}).
$$

## Canonical HerAI continuity

Peserta canonical tetap:

- Alya;
- Bima;
- Citra;
- Dewi.

Canonical score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Dengan data canonical:

| Peserta | $q$ | $c$ | $h(q,c)$ |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 0.78 |
| Bima | 0.60 | 0.625 | 0.61 |
| Citra | 0.90 | 1.00 | 0.94 |
| Dewi | 0.70 | 0.50 | 0.62 |

**Hard semantic boundary:**

$h(q,c)$ adalah **instructional weighted score only**.

Ia bukan otomatis:

- probability;
- predicted probability;
- calibrated probability;
- confidence;
- causal effect;
- universal feature importance;
- training loss;
- production objective;
- production recommendation rule.

Setiap trainable parameter atau objective tambahan pada assessment harus dibaca sebagai **synthetic / hypothetical / instructional** kecuali dinyatakan lain.

## Optimization / generalization boundary

Optimizer mengubah parameters terhadap objective yang diberikan.

Keberhasilan optimization **tidak otomatis** menjamin:

- global optimum;
- generalization;
- overfitting terselesaikan;
- fairness;
- calibration;
- robustness;
- business/product success;
- production readiness.

## Source-of-truth rule

Semua learner-facing Topic files di `materi/` adalah **verbatim copies** dari Topic 01–08 yang telah disetujui.

Semua `referensi-per-topic/` juga dipreservasi verbatim.

Kesamaan SHA-256 dicatat dalam `verbatim-copy-manifest.json`.

## Rendering

- Markdown + LaTeX source-level QA: dilakukan pada package final.
- Browser-level HerAI Markdown parser + KaTeX runtime: **NOT TESTED / NOT CLAIMED PASS**.

## Boundary ke Submodule 07

Submodule 06 berakhir setelah learner mampu membaca dan menilai optimization process serta batas generalization-nya.

**Submodule 07 — Integrated Case Study** belum dimulai dalam package ini.
