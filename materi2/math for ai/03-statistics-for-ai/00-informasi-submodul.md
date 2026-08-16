# Submodule 03 — Statistics for AI: Membaca Pola dan Variasi Data

> **Final Consolidation Package**  
> Materi Topic 01–08 di folder `materi/` disalin **verbatim** dari package topic yang telah disetujui. File ini adalah peta konsolidasi, bukan pengganti materi lengkap.

---

# 1. Tujuan Besar Submodule

Submodule ini membangun kemampuan untuk membaca data secara **deskriptif dan eksploratif** sebelum masuk ke Probability atau statistical inference.

Alur besarnya:

$$
\text{representation}
\rightarrow
\text{center}
\rightarrow
\text{spread}
\rightarrow
\text{distribution}
\rightarrow
\text{relative position}
\rightarrow
\text{potential outlier}
\rightarrow
\text{association}
\rightarrow
\text{data quality}.
$$

Pertanyaan utamanya:

> **Apa yang sebenarnya dikatakan oleh data yang kita observasi, dan apa yang tidak boleh kita simpulkan dari data tersebut?**

---

# 2. Delapan Topic yang Sudah Disetujui

1. **Dari Matrix ke Dataset Statistik**  
   Fokus: observation, variable, feature, identifier, observational unit, semantics.

2. **Mean, Median, Mode**  
   Fokus: ukuran pusat dan kapan masing-masing ringkasan masuk akal.

3. **Range, Variance, Standard Deviation**  
   Fokus: spread, deviation, squared units, descriptive $1/n$ convention.

4. **Distribution dan Histogram**  
   Fokus: observed distribution, frequency, relative frequency, bins, shape.

5. **Percentile, Quartile, dan IQR**  
   Fokus: relative position, $Q_1,Q_2,Q_3$, middle-50% spread, quartile convention.

6. **Outlier: Sinyal untuk Diperiksa**  
   Fokus: potential-outlier flag, IQR fence, inspect-before-action.

7. **Covariance, Correlation, dan Association**  
   Fokus: paired observations, co-movement, linear association, association ≠ causation.

8. **Data Quality untuk AI**  
   Fokus: missingness, units, scales, IDs/categories, duplicates, class imbalance, audit workflow.

---

# 3. Persistent HerAI Running Case

Canonical participant data tetap:

| Participant | Quiz correct | Quiz total | Completion done | Completion total | Study duration |
|---|---:|---:|---:|---:|---:|
| Alya | 8 | 10 | 6 | 8 | 45 min |
| Bima | 6 | 10 | 5 | 8 | 30 min |
| Citra | 9 | 10 | 8 | 8 | 55 min |
| Dewi | 7 | 10 | 4 | 8 | 40 min |

Derived features:

$$
q=
[0.80,\;0.60,\;0.90,\;0.70]
$$

dan:

$$
c=
[0.75,\;0.625,\;1.00,\;0.50].
$$

Feature matrix:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}.
$$

Toy score yang berasal dari submodule sebelumnya tetap hanya instructional:

$$
h(q,c)=0.6q+0.4c.
$$

Ia **bukan probability, model accuracy, calibrated score, causal effect, atau production recommendation**.

---

# 4. Formula Sheet — Core Descriptive Statistics

## Mean

$$
\bar{x}
=
\frac{1}{n}
\sum_{i=1}^{n}x_i.
$$

## Range

$$
\operatorname{range}(x)
=
x_{\max}-x_{\min}.
$$

## Descriptive variance — course convention

$$
\sigma^2
=
\frac{1}{n}
\sum_{i=1}^{n}(x_i-\bar{x})^2.
$$

## Standard deviation

$$
\sigma
=
\sqrt{\sigma^2}.
$$

## Relative frequency

$$
f_{\text{rel}}
=
\frac{\text{observed count}}{n}.
$$

Observed relative frequency pada Submodule 03 **tidak otomatis menjadi future-event probability**.

## Interquartile range

$$
\operatorname{IQR}
=
Q_3-Q_1.
$$

## Potential-outlier fences

$$
L
=
Q_1-1.5(\operatorname{IQR})
$$

$$
U
=
Q_3+1.5(\operatorname{IQR}).
$$

Observation di luar fence disebut **potential-outlier flag** dan perlu diperiksa; bukan otomatis error.

## Descriptive covariance — course convention

$$
\operatorname{cov}_{\text{desc}}(x,y)
=
\frac{1}{n}
\sum_{i=1}^{n}
(x_i-\bar{x})(y_i-\bar{y}).
$$

## Pearson-style correlation

$$
r
=
\frac{
\sum_{i=1}^{n}
(x_i-\bar{x})(y_i-\bar{y})
}{
\sqrt{\sum_{i=1}^{n}(x_i-\bar{x})^2}
\sqrt{\sum_{i=1}^{n}(y_i-\bar{y})^2}
}.
$$

$$
-1\le r\le1.
$$

Pearson $r$ merangkum **linear association**, bukan causality.

---

# 5. Canonical Numerical Checkpoints

Quiz ratio:

$$
\bar q=0.75
$$

$$
\operatorname{range}(q)=0.30
$$

$$
\sigma_q^2=0.0125
$$

$$
\sigma_q\approx0.1118.
$$

Quartiles menurut course median-of-halves convention:

$$
Q_1=0.65,\quad
Q_2=0.75,\quad
Q_3=0.85
$$

$$
\operatorname{IQR}_q=0.20.
$$

IQR fences:

$$
0.35,\quad1.15.
$$

Tidak ada canonical quiz-ratio observation yang ter-flag.

Completion ratio:

$$
Q_1=0.5625,\quad
Q_2=0.6875,\quad
Q_3=0.875
$$

$$
\operatorname{IQR}_c=0.3125.
$$

Association:

$$
r_{q,c}\approx0.832
$$

$$
r_{q,t}\approx0.992
$$

dan:

$$
\operatorname{cov}_{\text{desc}}(q,t)=1.00
$$

dalam ratio-minutes.

Semua association ini hanya mendeskripsikan **empat observed participants**.

---

# 6. Safety Map — Klaim yang Harus Ditolak

| Unsafe claim | Correction |
|---|---|
| Mean selalu paling representatif | Mean adalah satu ringkasan pusat; sensitivity terhadap extremes perlu dipertimbangkan |
| Same mean = same distribution | Center tidak menentukan spread/shape |
| Mode selalu ada dan unik | Mode bisa tidak ada atau lebih dari satu |
| Large SD = bad data | SD hanya menggambarkan dispersion; baik/buruk bergantung context |
| Variance = SD | SD adalah square root variance; units berbeda |
| Distribution = probability distribution | Di sini distribution adalah observed/empirical pattern |
| Histogram appearance = raw data | Bin choice mengubah representation, bukan raw observations |
| Percentile = percentage | Percentile adalah relative position |
| Semua software quartile harus identik | Quartile/percentile conventions dapat berbeda |
| Outlier = error | Potential outlier perlu investigation |
| Outlier = delete | Flag → inspect → decide |
| Correlation = causation | Correlation hanya association |
| $r=0$ = no relationship | Pearson $r=0$ hanya berarti no linear association |
| Covariance lebih besar = association lebih kuat lintas unit | Covariance bergantung scale/unit |
| Missing = zero | Missing berarti value tidak tersedia/unknown |
| Digits = quantitative feature | ID/category codes dapat tetap non-quantitative |
| Normalization memperbaiki semantics | Normalization hanya scale transformation |
| No outlier = clean data | Missing/unit/duplicate/label/type problems masih dapat ada |
| Class imbalance = histogram numerical feature tidak rata | Class imbalance berkaitan dengan target-label frequency |

---

# 7. Descriptive Boundary

Submodule 03 **belum** mengajarkan sebagai core:

- Probability distributions;
- random variables;
- confidence intervals;
- hypothesis tests;
- $p$-values;
- correlation significance tests;
- causal inference;
- regression inference;
- advanced outlier hypothesis tests;
- full preprocessing/model-evaluation pipelines.

Jika suatu assessment meminta conclusion yang membutuhkan konsep tersebut, jawaban yang benar adalah:

> **data/material Submodule 03 belum mendukung claim itu.**

---

# 8. Cara Menggunakan Final Assessment

Final assessment terdiri dari:

- `latihan.md` — 8 integrated open exercises;
- `kuis.md` — 10 MCQ;
- `diskusi.md` — 2 integrated discussions;
- `kunci-jawaban-rubrik.md` — model reasoning, answers, rubrics;
- `coverage-map.json` — coverage topic/concept/misconception;
- `qa-report.md` — final QA.

Assessment tidak sekadar mengulang soal per-topic. Banyak item meminta learner menghubungkan:

> **semantics → calculation → interpretation → safety → AI consequence.**
