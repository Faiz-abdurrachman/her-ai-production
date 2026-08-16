# Kunci Jawaban dan Rubrik — Final Assessment Submodule 04

# Bagian A — Latihan Terbuka

## Latihan 1 — Model Answer / Rubric

- Process/unit: satu hypothetical session yang diamati maksimum 30 menit.
- $\Omega=\{\text{selesai_mandiri},\text{selesai_dengan_bantuan},\text{belum_selesai}\}$.
- $A=\{\text{selesai_mandiri},\text{selesai_dengan_bantuan}\}$.
- Dengan explicitly equal-likely model:

$$
P(A)=\frac23.
$$

- $A^c=\{\text{belum_selesai}\}$ dan:

$$
P(A^c)=1-\frac23=\frac13.
$$

- Equal-likelihood count ratio tidak boleh dipakai tanpa assumption.
- Canonical completion ratio adalah observed ratio, bukan probability dari setup ini.

**Rubric 10:** setup 2, event/sample space 2, probability 2, complement 1, assumption reasoning 2, observed-vs-model distinction 1.

---

## Latihan 2 — Model Answer / Rubric

$$
P(A)=0.70,
\quad
P(B)=0.50,
\quad
P(A\cap B)=0.30.
$$

$$
P(A\cup B)=0.70+0.50-0.30=0.90.
$$

$$
P(A\mid B)=\frac{0.30}{0.50}=0.60.
$$

$$
P(B\mid A)=\frac{0.30}{0.70}\approx0.429.
$$

Conditional directions berbeda karena denominator/reference set berbeda. Claim simple addition salah karena overlap 0.30 akan dihitung dua kali.

**Rubric 10:** marginals/joint 2, union 2, both conditionals 3, denominator explanation 2, union audit 1.

---

## Latihan 3 — Model Answer / Rubric

Scenario A:

$$
P(A)P(B)=0.40(0.50)=0.20=P(A\cap B),
$$

jadi independent.

$$
P(A\mid B)=0.20/0.50=0.40=P(A).
$$

Scenario B mutually exclusive karena joint 0. Namun:

$$
P(C)P(D)=0.20\ne0,
$$

jadi positive-probability events tersebut tidak independent. Tidak ada causal conclusion dari equality/inequality probability ini.

**Rubric 10:** A product 2, A conditional 2, B exclusivity 2, B independence 2, conceptual/causal boundary 2.

---

## Latihan 4 — Model Answer / Rubric

Awal:

$$
P(H^c)=0.80.
$$

$$
P(D)=0.80(0.20)+0.20(0.80)=0.32.
$$

$$
P(H\mid D)=\frac{0.16}{0.32}=0.50.
$$

Likelihood 0.80 bukan posterior karena arah conditional berbeda dan posterior perlu prior/denominator.

Jika prior 0.05:

$$
P(D)=0.80(0.05)+0.20(0.95)=0.23,
$$

$$
P(H\mid D)=\frac{0.04}{0.23}\approx0.174.
$$

Base rate mengubah posterior meskipun likelihood terms sama.

**Rubric 10:** denominator 2, posterior 2, reversal explanation 2, changed-prior computation 2, base-rate audit 2.

---

## Latihan 5 — Model Answer / Rubric

$X$ adalah mapping “number of completed units”; outcomes adalah possible session results. Distribution sudah diberikan pada $x=0,1,2,3$ dan total:

$$
0.10+0.25+0.40+0.25=1.
$$

Expected value:

$$
E[X]
=0(0.10)+1(0.25)+2(0.40)+3(0.25)
=1.80.
$$

1.80 tidak harus menjadi realized value; possible realizations hanya 0,1,2,3. Empirical histogram meringkas observations; probability distribution adalah part of stated model unless an estimation relation is explicitly made.

**Rubric 10:** RV/outcome distinction 2, distribution 1, total 1, EV 3, non-guarantee 2, empirical/model distinction 1.

---

## Latihan 6 — Model Answer / Rubric

$q$ quiz ratio, $c$ completion ratio, $h$ instructional weighted score. Range $[0,1]$ tidak memberi probability semantics.

Minimal probability claim memerlukan:

- target/event, misalnya $Y=1$;
- observational unit;
- horizon;
- probability-intended model output;
- evaluation/calibration data yang sesuai.

Empat canonical scores tidak cukup untuk meaningful calibration bins. Safe current wording:

> `Instructional score: 0.94`

**Rubric 10:** semantics 2, range reasoning 2, target/unit/horizon 2, modeling/evaluation 2, calibration/UI safety 2.

---

## Latihan 7 — Model Answer / Rubric

- Logit = raw model output, tidak perlu berada $[0,1]$ atau sum to 1.
- Normalization can map outputs into probability-shaped values, tetapi calibration tetap empirical evaluation.
- Bin 0.80 vs observed 0.61 menunjukkan probability level overstated pada bin itu.
- Reliability diagram membandingkan predicted probability dan observed positive fraction, bukan hard-class accuracy.
- Untuk $y=1,p=0.10$, $-\log p$ relatif besar karena true event diberi probability rendah.
- Log loss/cross-entropy adalah loss quantity.

**Rubric 10:** logits 2, normalization/calibration 2, bin diagnosis 2, accuracy distinction 1, loss reasoning 2, loss semantics 1.

---

## Latihan 8 — Model Answer / Rubric

Strong answer minimal mengoreksi:

1. four observed participants bukan sample space otomatis;
2. participant tidak boleh dianggap equally likely outcomes tanpa random-selection model;
3. $h=0.94$ adalah score, bukan 94% probability;
4. `success` membutuhkan event + unit/horizon/model semantics;
5. conditional association tidak membuktikan hint causes success;
6. co-occurrence bukan independence; gunakan product/no-change criterion;
7. Bayes bukan simple reversal dan membutuhkan prior/base rate;
8. softmax normalization bukan calibration proof;
9. cross-entropy/log loss adalah loss;
10. safe rewrite harus mempertahankan semua claim hanya pada level yang didukung.

**Rubric 20:** sembilan audit points 18 (2 masing-masing untuk 9 core errors), safe rewrite 2.

---

# Bagian B — Kunci Kuis

| Q | Jawaban | Konsep |
|---:|:---:|---|
| 1 | B | conditional probability |
| 2 | C | score/probability semantics |
| 3 | C | union with overlap |
| 4 | A | independence product criterion |
| 5 | C | evidence probability / Bayes denominator |
| 6 | B | expected value |
| 7 | B | mutually exclusive vs independent |
| 8 | B | calibration |
| 9 | B | Bayes reversal/base rate |
| 10 | C | logits/calibration/loss semantics |

## Q5 check

$$
P(D)=0.80(0.20)+0.20(0.80)=0.32.
$$

## Q6 check

$$
E[X]=0(0.25)+1(0.50)+2(0.25)=1.
$$

---

# Bagian C — Discussion Rubric

## Diskusi 1 — 10 points

- target/event + unit/horizon: 2;
- score vs probability semantics: 2;
- probability-intended model explanation: 2;
- calibration/evaluation: 2;
- staged safe UI wording: 2.

Strong answer menolak canonical $h$ sebagai automatic probability dan membedakan “probability-intended” dari “calibrated.”

## Diskusi 2 — 10 points

- Bayes/causal boundary: 2;
- posterior uncertainty: 1;
- expected value interpretation: 2;
- independence/dependence boundary: 1;
- calibration: 1;
- probabilistic loss semantics: 1;
- operational/context reasoning: 2.
