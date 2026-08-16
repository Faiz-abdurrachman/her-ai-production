# Topic 07 — Covariance, Correlation, dan Association: Membaca Gerak Bersama Dua Variabel

> **Submodule 03 — Statistics for AI: Membaca Pola dan Variasi Data**  
> **Filename:** `07-covariance-correlation-association.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar akademik/teknis campuran, termasuk non-IT  
> **Prerequisite:** Topic 01–06 Submodule 03  
> **Forward dependency:** Topic 08 — Data Quality untuk AI  
> **Boundary:** Topic ini membahas paired observations, positive/negative co-movement, descriptive covariance dengan convention kursus $1/n$, Pearson-style correlation sebagai standardized linear association, scatterplot reading, scale/unit sensitivity, dan association-versus-causation. Correlation significance testing, $p$-value, confidence interval, regression inference, Spearman/Kendall sebagai core, partial correlation, causal inference, dan Probability tetap ditunda.

---

# 1. Mengapa Topik Ini Ada?

Sampai Topic 06 kita paling sering menganalisis **satu variable pada satu waktu**.

Kita sudah bertanya:

- di mana pusatnya?
- seberapa menyebar?
- seperti apa distribution-nya?
- di mana posisi relatif suatu value?
- adakah observation yang perlu diperiksa?

Sekarang kita ingin bertanya:

> **Bagaimana dua numerical variables bergerak bersama pada observations yang sama?**

Contoh HerAI:

| Participant | Quiz ratio $q$ | Completion ratio $c$ | Study duration $t$ |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 min |
| Bima | 0.60 | 0.625 | 30 min |
| Citra | 0.90 | 1.00 | 55 min |
| Dewi | 0.70 | 0.50 | 40 min |

Sekilas, participant dengan quiz ratio lebih tinggi juga sering mempunyai completion ratio dan duration yang lebih tinggi.

Tetapi kita membutuhkan bahasa statistik yang lebih tepat.

NIST mendefinisikan correlation sebagai ukuran **linear relationship** antara dua variables dan membedakan correlation dari causal relationship. Correlation dapat menunjukkan association, tetapi tidak membuktikan bahwa satu variable menyebabkan variable lain. [R2][R3]

Guardrail terbesar Topic ini:

> **Association tidak sama dengan causation.**

---

# 2. Tujuan Pembelajaran

Setelah Topic 07, kamu diharapkan mampu:

1. menjelaskan apa itu paired observations;
2. memastikan dua variables dibandingkan pada observational units yang sama;
3. membaca scatterplot dasar;
4. menjelaskan positive, negative, dan weak/no-linear co-movement;
5. menghitung deviation dua variables dari mean masing-masing;
6. menjelaskan makna product of paired deviations;
7. menghitung descriptive covariance dengan convention kursus $1/n$;
8. membaca tanda covariance;
9. menjelaskan mengapa magnitude covariance bergantung unit/scale;
10. menjelaskan unit covariance;
11. menghitung Pearson-style correlation dari centered sums;
12. menjelaskan bahwa $r$ berada pada interval $[-1,1]$;
13. membedakan tanda dan magnitude correlation;
14. menjelaskan bahwa $r=0$ berarti tidak ada **linear** association, bukan tidak ada relationship jenis apa pun;
15. menjelaskan bahwa correlation dimensionless;
16. menjelaskan mengapa changing units dapat mengubah covariance tetapi tidak correlation;
17. menginterpretasikan canonical HerAI $r_{q,c}$ dan $r_{q,t}$;
18. membatasi conclusion karena HerAI hanya mempunyai empat observations;
19. menjelaskan correlation ≠ causation;
20. menghindari klaim bahwa high correlation membuktikan feature useful atau production-ready;
21. memprediksi sensitivity correlation ketika satu observation diubah;
22. menghubungkan association reasoning dengan data understanding untuk AI.

---

# 3. Prerequisite Recall — Deviations

Dari Topic 03:

$$
x_i-\bar{x}
$$

adalah deviation observation ke-$i$ dari mean variable $x$.

Untuk dua variables $x$ dan $y$, kita punya:

$$
x_i-\bar{x}
$$

dan:

$$
y_i-\bar{y}.
$$

Topic 07 bertanya:

> ketika deviation $x$ positif/negatif, apakah deviation $y$ cenderung mempunyai arah yang sama atau berlawanan?

---

# 4. Paired Observations

Covariance dan correlation membutuhkan **pairs yang benar-benar berasal dari observational unit yang sama**.

HerAI pair:

$$
(q_i,c_i)
$$

untuk Alya berarti:

$$
(0.80,0.75).
$$

Bima:

$$
(0.60,0.625).
$$

Kita tidak boleh mengacak kolom secara independen.

Jika $q$ milik Alya dipasangkan dengan $c$ milik Bima, makna pair rusak.

NIST menyatakan dua variables dalam correlation harus mempunyai jumlah elements yang sama; dalam konteks dataset kita, requirement yang lebih penting adalah pair harus mewakili observation yang sama. [R2]

---

# 5. Hook — Dua Daftar Tidak Cukup, Pairing Harus Benar

Bayangkan:

Quiz ratio:

$$
0.9,\;0.8,\;0.7,\;0.6
$$

Completion ratio:

$$
1.0,\;0.8,\;0.7,\;0.5.
$$

Jika pairs selaras participant, pattern terlihat positif.

Tetapi jika completion column diacak:

$$
0.5,\;1.0,\;0.7,\;0.8,
$$

nilai individual masih sama, namun association berubah.

Jadi:

> **association adalah property dari paired data, bukan sekadar dua sets values.**

---

# 6. Predict Before Calculate

## Prediksi 1 — Positive Association

Jika $x$ meningkat dan $y$ cenderung meningkat juga, tanda covariance kemungkinan:

A. positif  
B. negatif  
C. selalu nol  
D. probability

## Prediksi 2 — Negative Association

Jika $x$ tinggi biasanya muncul bersama $y$ rendah, product paired deviations cenderung:

A. banyak positif  
B. banyak negatif  
C. selalu nol  
D. tidak dapat dihitung

## Prediksi 3 — Unit Toggle

Jika duration diubah dari menit ke detik, apakah correlation dengan quiz ratio berubah?

Catat reasoning sebelum formula.

---

# 7. Intuisi Scatterplot

Scatterplot menempatkan setiap pair sebagai satu point:

$$
(x_i,y_i).
$$

Untuk HerAI:

- x-axis dapat quiz ratio;
- y-axis dapat completion ratio;
- satu point = satu participant.

Jika points cenderung naik dari kiri bawah ke kanan atas:

> positive linear association.

Jika cenderung turun dari kiri atas ke kanan bawah:

> negative linear association.

Jika tidak membentuk linear direction yang jelas:

> weak/no linear association.

Tetapi scatterplot juga dapat memperlihatkan pattern nonlinear yang tidak diringkas dengan baik oleh Pearson correlation.

---

# 8. Paired Deviations

Untuk pair ke-$i$:

$$
(x_i-\bar{x})(y_i-\bar{y})
$$

adalah product of paired deviations.

Tanda product memberi intuition.

## Sama arah

Jika keduanya di atas mean:

$$
(+)(+)=+
$$

Jika keduanya di bawah mean:

$$
(-)(-)=+
$$

Kontribusi positif.

## Berlawanan arah

Jika satu di atas dan satu di bawah:

$$
(+)(-) = -
$$

atau:

$$
(-)(+) = -.
$$

Kontribusi negatif.

---

# 9. Covariance — Kontrak Deskriptif Kursus

Agar konsisten dengan descriptive variance Topic 03, course menggunakan:

$$
\operatorname{cov}_{\text{desc}}(x,y)
=
\frac{1}{n}
\sum_{i=1}^{n}
(x_i-\bar{x})(y_i-\bar{y}).
$$

Di sini:

- $n$ = jumlah paired observations;
- $x_i$ = value variable $x$ pada observation ke-$i$;
- $y_i$ = value variable $y$ pada observation ke-$i$;
- $\bar{x}$ = mean $x$;
- $\bar{y}$ = mean $y$;
- $\operatorname{cov}_{\text{desc}}(x,y)$ = descriptive covariance finite set yang dianalisis.

## Convention safety

NIST pada sample covariance menggunakan denominator:

$$
n-1.
$$

Course ini sengaja menggunakan:

$$
n
$$

sebagai **descriptive finite-set convention**, konsisten dengan Topic 03.

Jangan membuat aturan palsu:

> “Covariance selalu memakai $n$.”

atau:

> “Covariance selalu memakai $n-1$.”

Tujuan/convention harus disebutkan. [R1]

---

# 10. Math Reading Skill — Membaca Covariance

Baca formula:

$$
\operatorname{cov}_{\text{desc}}(x,y)
=
\frac{1}{n}
\sum_{i=1}^{n}
(x_i-\bar{x})(y_i-\bar{y})
$$

sebagai:

1. cari mean masing-masing variable;
2. hitung deviation $x$ dan $y$ untuk observation yang sama;
3. kalikan paired deviations;
4. jumlahkan seluruh products;
5. bagi $n$ sesuai descriptive course convention.

Interpretasi tanda:

- covariance $>0$ → paired deviations cenderung bergerak searah;
- covariance $<0$ → cenderung berlawanan arah;
- covariance dekat $0$ → tidak ada strong average signed co-movement menurut scale tersebut.

Tetapi magnitude covariance sulit dibandingkan lintas unit/scale.

---

# 11. Worked Example 1 — Covariance Positif

Data:

$$
x=1,\;2,\;3
$$

$$
y=2,\;4,\;6.
$$

Means:

$$
\bar{x}=2
$$

$$
\bar{y}=4.
$$

Deviations:

| Pair | $x_i-\bar{x}$ | $y_i-\bar{y}$ | Product |
|---|---:|---:|---:|
| 1 | -1 | -2 | 2 |
| 2 | 0 | 0 | 0 |
| 3 | 1 | 2 | 2 |

Sum products:

$$
4.
$$

Descriptive covariance:

$$
\operatorname{cov}_{\text{desc}}(x,y)
=
\frac{4}{3}
\approx1.333.
$$

Tanda positif sesuai pattern searah.

---

# 12. Worked Example 2 — Covariance Negatif

Gunakan:

$$
x=1,\;2,\;3
$$

$$
y=6,\;4,\;2.
$$

Means:

$$
\bar{x}=2
$$

$$
\bar{y}=4.
$$

Products:

$$
(-1)(2)=-2
$$

$$
(0)(0)=0
$$

$$
(1)(-2)=-2.
$$

Jadi:

$$
\operatorname{cov}_{\text{desc}}(x,y)
=
-\frac{4}{3}.
$$

Negative covariance menunjukkan opposite-direction co-movement pada data tersebut.

---

# 13. Unit Covariance

Jika:

- $q$ = quiz ratio;
- $t$ = duration dalam menit;

maka covariance unit:

$$
\text{ratio}\cdot\text{menit}.
$$

Jika duration diganti menjadi detik, covariance numerical value ikut berubah.

Ini membuat covariance magnitude tidak mudah dibandingkan antara variable pairs yang scale/units berbeda.

---

# 14. HerAI Worked Example — Covariance $q$ dan Duration

Canonical:

$$
q=
0.80,\;0.60,\;0.90,\;0.70
$$

$$
t=
45,\;30,\;55,\;40.
$$

Means:

$$
\bar{q}=0.75
$$

$$
\bar{t}=42.5.
$$

Paired deviations:

| Participant | $q_i-\bar{q}$ | $t_i-\bar{t}$ | Product |
|---|---:|---:|---:|
| Alya | 0.05 | 2.5 | 0.125 |
| Bima | -0.15 | -12.5 | 1.875 |
| Citra | 0.15 | 12.5 | 1.875 |
| Dewi | -0.05 | -2.5 | 0.125 |

Sum:

$$
0.125+1.875+1.875+0.125=4.
$$

Course descriptive covariance:

$$
\operatorname{cov}_{\text{desc}}(q,t)
=
\frac{4}{4}
=
1.00.
$$

Unit:

$$
\text{ratio}\cdot\text{menit}.
$$

Interpretasi:

> quiz ratio dan study duration bergerak searah pada empat observed participants.

Belum boleh berkata:

> “durasi belajar menyebabkan quiz ratio naik.”

---

# 15. Masalah Magnitude Covariance

Misalkan duration dikonversi:

$$
t_{\text{sec}}
=
60t_{\text{min}}.
$$

Maka covariance menjadi:

$$
\operatorname{cov}_{\text{desc}}(q,t_{\text{sec}})
=
60.
$$

Padahal underlying participant pattern tidak berubah.

Apakah association tiba-tiba 60 kali “lebih kuat”?

Tidak.

Yang berubah adalah unit.

Kita membutuhkan standardized measure.

---

# 16. Pearson-Style Correlation

Course menggunakan centered-sums form:

$$
r
=
\frac{
\sum_{i=1}^{n}
(x_i-\bar{x})(y_i-\bar{y})
}{
\sqrt{
\sum_{i=1}^{n}(x_i-\bar{x})^2
}
\sqrt{
\sum_{i=1}^{n}(y_i-\bar{y})^2
}
}.
$$

NIST memberikan centered-sums formula yang sama untuk Pearson correlation dan menjelaskannya sebagai ukuran linear relationship. [R2]

---

# 17. Mengapa Tidak Ada $1/n$ atau $1/(n-1)$ di Formula $r$?

Jika correlation ditulis sebagai covariance dibagi product standard deviations, common divisor yang konsisten akan saling cancel.

Centered-sums form menghindari distraction:

$$
r
=
\frac{S_{xy}}{\sqrt{S_{xx}}\sqrt{S_{yy}}}.
$$

Dengan:

$$
S_{xy}
=
\sum (x_i-\bar{x})(y_i-\bar{y}),
$$

$$
S_{xx}
=
\sum (x_i-\bar{x})^2,
$$

$$
S_{yy}
=
\sum (y_i-\bar{y})^2.
$$

---

# 18. Range Correlation

Pearson correlation berada pada:

$$
-1\le r\le1.
$$

Interpretasi dasar:

- $r$ mendekati $+1$ → strong positive linear alignment;
- $r$ mendekati $-1$ → strong negative linear alignment;
- $r$ dekat $0$ → weak/no linear association.

NIST menyatakan perfect linear relationship menghasilkan $+1$ atau $-1$, sedangkan no linear relationship menghasilkan $0$. [R2]

---

# 19. Math Reading Skill — Tanda dan Magnitude

Jangan hanya berkata:

> “$r=0.8$ besar.”

Baca dua aspek:

## Sign

$$
r>0
$$

→ direction positif.

$$
r<0
$$

→ direction negatif.

## Magnitude

$$
|r|
$$

lebih dekat $1$ → points lebih selaras dengan straight-line direction.

Tetapi magnitude tidak memberi causal strength.

---

# 20. $r=0$ Tidak Berarti “Tidak Ada Relationship Apa Pun”

Pearson $r$ mengukur **linear** relationship.

Dataset dapat mempunyai nonlinear pattern kuat tetapi Pearson $r$ dekat zero.

Contoh conceptual:

$$
y=x^2
$$

dengan symmetric $x$ values dapat menghasilkan weak linear correlation meskipun $y$ jelas berhubungan dengan $x$ secara nonlinear.

Jadi:

> **$r=0$ berarti tidak ada linear relationship yang diringkas oleh Pearson $r$, bukan tidak ada relationship dalam arti universal.**

---

# 21. HerAI Correlation — Quiz vs Completion

Canonical means:

$$
\bar{q}=0.75
$$

dan:

$$
\bar{c}=0.71875.
$$

Paired deviation products:

| Participant | $q_i-\bar{q}$ | $c_i-\bar{c}$ | Product |
|---|---:|---:|---:|
| Alya | 0.05 | 0.03125 | 0.0015625 |
| Bima | -0.15 | -0.09375 | 0.0140625 |
| Citra | 0.15 | 0.28125 | 0.0421875 |
| Dewi | -0.05 | -0.21875 | 0.0109375 |

Sum products:

$$
0.06875.
$$

Also:

$$
\sum(q_i-\bar{q})^2
=
0.05
$$

dan:

$$
\sum(c_i-\bar{c})^2
=
0.13671875.
$$

Maka:

$$
r_{q,c}
=
\frac{0.06875}{
\sqrt{0.05}
\sqrt{0.13671875}
}
$$

$$
\approx0.8315.
$$

Rounded:

$$
\boxed{
r_{q,c}\approx0.832
}
$$

Interpretasi:

> pada empat observed participants, quiz ratio dan completion ratio menunjukkan positive linear association yang cukup kuat secara deskriptif.

Guardrail:

> **empat observations tidak cukup untuk membuat population law.**

---

# 22. HerAI Correlation — Quiz vs Duration

Dari covariance example:

$$
S_{qt}=4.
$$

Untuk quiz:

$$
S_{qq}=0.05.
$$

Untuk duration:

$$
S_{tt}=325.
$$

Maka:

$$
r_{q,t}
=
\frac{4}{
\sqrt{0.05}
\sqrt{325}
}
$$

$$
\approx0.9923.
$$

Rounded:

$$
\boxed{
r_{q,t}\approx0.992
}
$$

Ini terlihat sangat tinggi.

Tetapi kita hanya mempunyai:

$$
n=4.
$$

Kesimpulan aman:

> empat observed HerAI points hampir membentuk positive linear pattern.

Kesimpulan tidak aman:

> “lebih lama belajar menyebabkan score lebih tinggi.”

---

# 23. Correlation ≠ Causation

NIST membedakan:

**Correlation**

> observed change pada satu variable disertai change pada variable lain.

**Causality**

> change pada satu variable menyebabkan change pada variable lain.

NIST secara eksplisit menegaskan:

> correlation does not imply causality. [R3]

Mengapa association dapat muncul tanpa direct causation?

Kemungkinan:

- third variable;
- selection effect;
- common cause;
- measurement process;
- coincidence pada small data;
- reverse direction;
- context confounding.

Topic ini tidak melakukan causal inference.

---

# 24. HerAI Example — Kenapa $r_{q,t}\approx0.992$ Tidak Causal?

Mungkin participant yang:

- sudah lebih siap;
- punya waktu lebih fleksibel;
- lebih familiar dengan materi;
- mempunyai learning strategy berbeda;

cenderung belajar lebih lama **dan** mempunyai quiz ratio lebih tinggi.

Atau small cohort kita kebetulan tersusun seperti itu.

Tanpa design/evidence tambahan, correlation tidak mengidentifikasi cause.

---

# 25. Correlation Juga Tidak Membuktikan Feature Useful

Jika:

$$
|r|
$$

tinggi antara feature dan target-like variable, belum otomatis berarti:

- production model akan bagus;
- feature fair;
- feature stable;
- feature causal;
- feature bebas leakage;
- feature useful setelah features lain dipertimbangkan.

Correlation adalah descriptive association tool.

---

# 26. Unit Toggle — Covariance Berubah, Correlation Tetap

Quiz-duration dalam menit:

$$
\operatorname{cov}_{\text{desc}}(q,t_{\text{min}})
=
1.00.
$$

Dalam detik:

$$
t_{\text{sec}}=60t_{\text{min}}.
$$

Maka:

$$
\operatorname{cov}_{\text{desc}}(q,t_{\text{sec}})
=
60.
$$

Tetapi:

$$
r_{q,t_{\text{min}}}
=
r_{q,t_{\text{sec}}}
\approx0.992.
$$

Karena correlation standardized/dimensionless.

Ini alasan correlation lebih mudah dibandingkan lintas scale daripada raw covariance.

---

# 27. Change One Thing — Ubah Satu Observation

Canonical quiz:

$$
0.80,\;0.60,\;0.90,\;0.70.
$$

Canonical completion:

$$
0.75,\;0.625,\;1.00,\;0.50.
$$

Canonical:

$$
r_{q,c}\approx0.832.
$$

Sekarang hypothetical:

Citra quiz ratio:

$$
0.90\to0.65.
$$

Completion tetap:

$$
1.00.
$$

Quiz menjadi:

$$
0.80,\;0.60,\;0.65,\;0.70.
$$

Correlation baru:

$$
r_{q,c}^{\text{hyp}}
\approx-0.029.
$$

Satu observation change mengubah coefficient secara dramatis.

Pelajaran:

> dengan $n=4$, correlation sangat sensitif terhadap tiap point.

Itulah alasan coefficient yang “impressive” tidak boleh digeneralisasi sembarangan.

---

# 28. Scatterplot Wajib Mendampingi Correlation

Correlation coefficient merangkum satu aspect.

Scatterplot membantu melihat:

- linearity;
- clusters;
- unusual points;
- curvature;
- leverage;
- pairing labels.

Dua datasets dapat mempunyai correlation serupa tetapi visual structure berbeda.

Jadi:

> **jangan membaca $r$ tanpa melihat data pattern jika visual inspection tersedia.**

---

# 29. Association sebagai Istilah Payung

**Association** adalah bahasa umum bahwa dua variables menunjukkan pattern bersama.

Correlation adalah satu numerical summary khusus untuk linear association.

Jadi:

> correlation adalah jenis measure of association.

Tetapi:

> association tidak otomatis causation.

---

# 30. Misconception Challenge 1 — “High Correlation = Cause”

Salah.

$$
r_{q,t}\approx0.992
$$

tidak membuktikan duration menyebabkan quiz performance.

---

# 31. Misconception Challenge 2 — “$r=0$ = Tidak Ada Relationship”

Salah.

Pearson $r$ mengukur linear relationship.

Nonlinear relationship masih mungkin.

---

# 32. Misconception Challenge 3 — “Covariance 60 Lebih Kuat daripada Covariance 1”

Tidak valid tanpa memperhatikan units/scale.

Dalam unit toggle example:

- ratio-minutes covariance = 1;
- ratio-seconds covariance = 60;

underlying association sama.

---

# 33. Misconception Challenge 4 — “Correlation Tidak Punya Unit, Jadi Universal”

Correlation memang dimensionless.

Tetapi interpretation tetap bergantung:

- sample size;
- linearity;
- measurement quality;
- observational context;
- selection process.

Dimensionless bukan berarti context-free.

---

# 34. Misconception Challenge 5 — “Empat Points Sudah Cukup untuk Population Conclusion”

Tidak.

Topic ini hanya descriptive terhadap four observed participants.

Kita belum melakukan formal inference.

---

# 35. Misconception Challenge 6 — “High Correlation = Feature Pasti Bagus”

Salah.

Correlation tidak menguji:

- leakage;
- stability;
- fairness;
- downstream model performance;
- multivariable interactions;
- causal validity.

---

# 36. Why This Matters in AI

Covariance/correlation membantu exploratory data analysis.

Kegunaan:

- melihat feature pairs yang bergerak bersama;
- menemukan redundancy candidate;
- menemukan suspicious relationships;
- membantu inspect scaling/unit behavior;
- merencanakan visual/data-quality checks;
- memahami relationships sebelum modeling.

Tetapi correlation matrix bukan final model evaluation.

---

# 37. Correlation dan Redundancy — Preview Aman

Jika dua input features sangat correlated, mungkin ada duplicated/redundant information.

Namun keputusan menghapus satu feature tidak boleh dibuat hanya dari correlation.

Perlu mempertimbangkan:

- semantics;
- measurement reliability;
- downstream task;
- model behavior;
- leakage;
- domain need.

---

# 38. Try It Yourself 1 — Product of Deviations

Means:

$$
\bar{x}=10,
\qquad
\bar{y}=20.
$$

Observation:

$$
x_i=12,
\qquad
y_i=25.
$$

1. hitung deviations;
2. hitung product;
3. tanda product apa?
4. apa intuition-nya?

---

# 39. Try It Yourself 2 — Negative Covariance

Data:

$$
x=1,\;2,\;3,\;4
$$

$$
y=8,\;6,\;4,\;2.
$$

1. predict sign;
2. hitung means;
3. hitung paired products;
4. hitung course descriptive covariance;
5. interpretasikan.

---

# 40. Try It Yourself 3 — HerAI $q,c$

Gunakan table canonical.

1. hitung $\bar{q}$;
2. hitung $\bar{c}$;
3. buat paired-deviation table;
4. jumlahkan products;
5. hitung $r$ dari centered sums;
6. tulis conclusion tanpa causal language.

---

# 41. Try It Yourself 4 — Unit Toggle

Jika:

$$
\operatorname{cov}(q,t_{\text{min}})=1
$$

dan:

$$
t_{\text{sec}}=60t_{\text{min}},
$$

predict:

1. covariance baru;
2. correlation baru;
3. mengapa?

---

# 42. Try It Yourself 5 — Language Audit

Perbaiki:

1. “Correlation 0.99 membuktikan belajar lama menyebabkan score tinggi.”
2. “$r=0$ berarti tidak ada hubungan.”
3. “Covariance besar berarti association lebih kuat di semua cases.”
4. “Correlation tinggi berarti feature wajib dipakai.”
5. “Empat participant cukup untuk generalisasi.”

---

# 43. Visual / Interactive Specifications

## [STATIC VISUAL] Labeled HerAI Scatterplot

**Purpose:** melihat paired observations.

**Initial state:**

x-axis = quiz ratio $q$  
y-axis = completion ratio $c$

Points berlabel:

- Alya;
- Bima;
- Citra;
- Dewi.

**Safety banner:** `Association ≠ causation`.

---

## [STEP-BY-STEP REVEAL] Deviation Quadrants

**Purpose:** memahami covariance sign.

**Reveal:**

1. draw vertical line at $\bar{x}$;
2. draw horizontal line at $\bar{y}$;
3. show four quadrants;
4. highlight same-sign quadrants → positive products;
5. opposite-sign quadrants → negative products;
6. sum contributions.

---

## [NUMBER MANIPULATOR] Move One Participant

**Purpose:** sensitivity.

**Initial:** canonical $q,c$.

**Action:** drag Citra's quiz value.

**Live outputs:**

- covariance;
- $r$;
- participant-labeled scatterplot.

**Feedback:** show “small $n$: one point can strongly move $r$.”

**Safety:** no causal language.

---

## [COMPARE VIEW] Minutes vs Seconds

**Left:**

duration minutes.

**Right:**

duration seconds.

Show:

- covariance changes from $1$ to $60$;
- correlation remains $\approx0.992$.

Main message:

> covariance scale-sensitive; correlation standardized.

---

# 44. Checkpoint 1

Jika most paired deviations mempunyai same sign products, covariance cenderung:

**positif.**

---

# 45. Checkpoint 2

Jika:

$$
r=-0.9,
$$

apa artinya?

> strong negative **linear** association pada observed data.

Bukan causal effect $-90\%$.

---

# 46. Checkpoint 3

Jika:

$$
r=0,
$$

bolehkah menyimpulkan tidak ada relationship apa pun?

**Tidak.**

Yang dapat dikatakan:

> tidak ada linear association yang diringkas Pearson $r$ pada data tersebut.

---

# 47. Checkpoint 4

HerAI:

$$
r_{q,t}\approx0.992.
$$

Kesimpulan aman:

> four observed points menunjukkan very strong positive linear association descriptively.

Kesimpulan unsafe:

> study duration causes quiz performance.

---

# 48. Mastery Check

Pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan paired observations.
- [ ] **I can** membaca scatterplot dasar.
- [ ] **I can** menjelaskan positive/negative co-movement.
- [ ] **I can** menghitung product paired deviations.
- [ ] **I can** menghitung descriptive covariance dengan $1/n$ course convention.
- [ ] **I can** menjelaskan convention $n$ versus $n-1$.
- [ ] **I can** menjelaskan unit covariance.
- [ ] **I can** menjelaskan covariance scale sensitivity.
- [ ] **I can** menghitung Pearson-style $r$ dari centered sums.
- [ ] **I can** menjelaskan $-1\le r\le1$.
- [ ] **I can** membaca sign dan magnitude.
- [ ] **I can** menjelaskan $r=0$ hanya tentang linear relationship.
- [ ] **I can** menjelaskan correlation dimensionless.
- [ ] **I can** menjelaskan unit conversion tidak mengubah $r$.
- [ ] **I can** menginterpretasikan $r_{q,c}\approx0.832$.
- [ ] **I can** menginterpretasikan $r_{q,t}\approx0.992$ tanpa causal claim.
- [ ] **I can** menjelaskan small-$n$ sensitivity.
- [ ] **I can** menjelaskan correlation ≠ causation.
- [ ] **I can** menjelaskan high correlation ≠ automatically useful feature.

---

# 49. Yang Sengaja Belum Dibahas

Topic ini tidak menjadikan core:

- correlation hypothesis test;
- correlation $p$-value;
- confidence interval for $r$;
- regression slope/intercept;
- regression inference;
- partial correlation;
- Spearman correlation;
- Kendall tau;
- causal inference;
- DAGs;
- randomized experiments as a full method;
- instrumental variables;
- Probability distributions.

NIST correlation page mencantumkan significance-testing machinery, tetapi itu sengaja tidak dibawa ke core karena Submodule 03 masih descriptive/exploratory. [R2]

---

# 50. Ringkasan

Kita belajar:

1. covariance/correlation membutuhkan paired observations;
2. covariance course convention:

$$
\operatorname{cov}_{\text{desc}}(x,y)
=
\frac1n
\sum_{i=1}^{n}
(x_i-\bar{x})(y_i-\bar{y});
$$

3. positive paired products mendorong positive covariance;
4. negative paired products mendorong negative covariance;
5. covariance mempunyai units dan scale sensitivity;
6. correlation:

$$
r
=
\frac{
\sum (x_i-\bar{x})(y_i-\bar{y})
}{
\sqrt{\sum(x_i-\bar{x})^2}
\sqrt{\sum(y_i-\bar{y})^2}
};
$$

7. correlation dimensionless;
8. $-1\le r\le1$;
9. Pearson $r$ membaca **linear** association;
10. $r=0$ bukan bukti “tidak ada relationship apa pun”;
11. unit conversion mengubah covariance tetapi bukan correlation;
12. canonical HerAI:

$$
r_{q,c}\approx0.832;
$$

13. canonical HerAI:

$$
r_{q,t}\approx0.992;
$$

14. descriptive covariance:

$$
\operatorname{cov}_{\text{desc}}(q,t)=1.00
$$

ratio-minutes;
15. coefficients tersebut hanya mendeskripsikan four observed participants;
16. correlation tidak membuktikan causation;
17. correlation tidak otomatis membuktikan feature usefulness;
18. small-$n$ membuat coefficient sensitif terhadap individual observations.

---

# 51. Bridge ke Topic 08 — Data Quality untuk AI

Kita sekarang sudah memiliki tools untuk membaca:

- satu variable;
- center;
- spread;
- distribution;
- relative position;
- potential outliers;
- association dua variables.

Tetapi semua statistik itu hanya berguna jika data yang kita masukkan memang:

- mempunyai semantics benar;
- units konsisten;
- missingness dipahami;
- categories tidak disalahartikan sebagai quantities;
- records tidak corrupted/duplicated;
- target distribution dipahami.

Pertanyaan terakhir Submodule 03:

> **Bagaimana kita memastikan data cukup masuk akal untuk dianalisis dan digunakan dalam AI?**

Itulah Topic 08:

**Data Quality untuk AI.**

---

# 52. Referensi Topic 07

Source ledger lengkap tersedia di `referensi-topic-07.md`.

- [R1] NIST — *Mean Vector and Covariance Matrix*.
- [R2] NIST Dataplot — *CORRELATION*.
- [R3] NIST — *Experiments and Experimental Design*.

---

# 53. Gerbang STOP

Topic 07 selesai pada scope:

**paired observations → scatterplot → paired deviations → descriptive covariance $1/n$ → units/scale → standardized Pearson-style correlation → sign/magnitude/linearity → HerAI $q,c,t$ → unit toggle → small-$n$ sensitivity → association ≠ causation → AI interpretation.**

Topic 08 **belum diproduksi**.

> **Apakah Topic 07 Submodule 03 disetujui dan kita boleh melanjutkan ke Topic 08 — Data Quality untuk AI?**
