# 00 — Informasi Submodule
## HerAI Fellowship — Foundation & Core AI — Math for AI

# Submodule 07 — Integrated Case Study: Math for AI di HerAI

**Status:** COMPLETE — FINAL CONSOLIDATION PACKAGE  
**Learning mode:** self-study web course  
**Academic source format:** Markdown + LaTeX/KaTeX-oriented notation  
**Runtime claim:** browser-level KaTeX **NOT TESTED / NOT CLAIMED PASS**

---

## 1. Posisi Submodule

Submodule 07 adalah penutup rangkaian Math for AI:

1. Mathematical Readiness
2. Linear Algebra
3. Statistics
4. Probability
5. Calculus
6. Optimization
7. **Integrated Case Study: Math for AI di HerAI**

Submodule ini bukan cabang matematika baru. Tujuannya adalah **transfer + synthesis**: membaca satu AI-system story secara end-to-end dan menjaga semantic meaning setiap quantity.

---

## 2. Approved Topic Map

1. **Problem Definition dan Data Contract**
2. **Representation dan Matching**
3. **Data Diagnostics**
4. **Uncertainty**
5. **Prediction Score dan Loss**
6. **Gradient dan Parameter Update**
7. **Evaluation, Failure Modes, dan What Comes Next**

Approved learner-facing lesson files tersedia di `materi/` dan dipertahankan **verbatim**.

---

## 3. Persistent Running Case

> **HerAI Next-Best Learning Recommendation**

Kasus ini adalah instructional decision-support story, **bukan production HerAI recommendation architecture**.

Canonical participant context:

| Peserta | Quiz ratio $q$ | Completion ratio $c$ | Study duration | $h(q,c)$ |
|---|---:|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 menit | 0.78 |
| Bima | 0.60 | 0.625 | 30 menit | 0.61 |
| Citra | 0.90 | 1.00 | 55 menit | 0.94 |
| Dewi | 0.70 | 0.50 | 40 menit | 0.62 |

Canonical instructional score:

$$
h(q,c)=0.6q+0.4c.
$$

**Hard semantic rule:** $h(q,c)$ adalah constructed instructional weighted score only.

Ia bukan otomatis:

- probability;
- calibrated probability;
- confidence;
- target/ground truth;
- training loss;
- optimization objective;
- causal effect;
- production recommendation rule;
- proof of educational effectiveness.

---

## 4. Canonical Shared Feature Axes

Participant side:

1. AI interest
2. Python readiness
3. Math readiness
4. UI/UX interest

Material side:

1. AI relevance
2. Python requirement
3. Math requirement
4. UI/UX relevance

Participant/material profile values pada course case bersifat **synthetic pedagogical data** dan dipertahankan sesuai approved lessons.

Candidate learning materials:

- Intro AI
- Belajar Python
- Desain UI/UX
- Matematika Dasar

---

## 5. Integrated Quantity Firewall

Learner harus menjaga distinction:

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

Juga:

- similarity $\neq$ probability;
- highest similarity $\neq$ automatically best educational recommendation;
- correlation $\neq$ causation;
- gradient $\neq$ update;
- one update $\neq$ trained production model;
- lower training objective $\neq$ automatic generalization;
- good offline metric $\neq$ deployment readiness.

---

## 6. Assessment Structure

Final package ini menyediakan **assessment baru yang integratif**:

- 8 open exercises (`latihan.md`);
- 10 MCQ (`kuis.md`);
- 2 substantive discussions (`diskusi.md`);
- answer key + rubrics (`kunci-jawaban-rubrik.md`).

Assessment tidak menggantikan formative assessment per-topic; ia menguji kemampuan menghubungkan seluruh chain.

---

## 7. Source and QA Structure

- `referensi.md` — master reference index;
- `referensi-per-topic/` — approved per-topic source ledgers preserved verbatim;
- `source-audit.md` — preservation/source audit;
- `verbatim-copy-manifest.json` — lesson SHA-256 verification;
- `coverage-map.json` — topic/assessment coverage;
- `static-validation.json` — automated source-level checks;
- `qa-report.md` — human-readable QA summary;
- `qa-manifest.json` — file integrity manifest.
