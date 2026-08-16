# Final Integrated Exercises — Submodule 04 Probability

> **8 integrated open exercises**. Setiap item sengaja menghubungkan beberapa topic dan tidak sekadar mengulang formative question.

---

# Latihan 1 — Dari Process ke Probability Claim

**Objective:** membangun probability setup secara lengkap sebelum computation.  
**Difficulty:** Intermediate  
**Coverage:** Topic 01–02

## Scenario

Sebuah hypothetical HerAI session tracker mencatat tepat satu final status dalam 30 menit:

- `selesai_mandiri`;
- `selesai_dengan_bantuan`;
- `belum_selesai`.

Model **secara eksplisit** menetapkan ketiga outcomes equally likely untuk latihan ini.

Definisikan event $A$ = “session selesai dalam 30 menit.”

## Tugas

1. Tulis process/unit, sample space $\Omega$, dan event $A$.
2. Hitung $P(A)$ berdasarkan stated equal-likelihood assumption.
3. Tulis $A^c$ dan hitung $P(A^c)$ dengan complement rule.
4. Jelaskan mengapa computation pada nomor 2 **tidak** boleh dilakukan hanya karena ada tiga outcomes jika equal-likelihood assumption tidak diberikan.
5. Bedakan claim model di soal ini dari observed completion ratio canonical HerAI.

## Optional hint

Event $A$ berisi dua dari tiga outcomes, tetapi count ratio hanya valid karena soal **menetapkan equal likelihood**.

---

# Latihan 2 — Joint, Union, Conditional dalam Satu Table

**Objective:** membaca overlap dan denominator dengan aman.  
**Difficulty:** Intermediate  
**Coverage:** Topic 03–04

## Scenario

Synthetic probability table:

|  | Hint $B$ | No hint $B^c$ | Total |
|---|---:|---:|---:|
| Complete $A$ | 0.30 | 0.40 | 0.70 |
| $A^c$ | 0.20 | 0.10 | 0.30 |
| **Total** | 0.50 | 0.50 | 1.00 |

## Tugas

1. Tentukan $P(A)$, $P(B)$, dan $P(A\cap B)$.
2. Hitung $P(A\cup B)$.
3. Hitung $P(A\mid B)$.
4. Hitung $P(B\mid A)$.
5. Jelaskan mengapa dua conditional pada nomor 3–4 berbeda walaupun joint numerator berasal dari cell yang sama.
6. Audit claim: “Karena $A$ dan $B$ masing-masing cukup probable, $P(A\cup B)=P(A)+P(B)$.”

---

# Latihan 3 — Independence atau Mutually Exclusive?

**Objective:** membedakan independence, dependence, dan mutual exclusivity.  
**Difficulty:** Analyze  
**Coverage:** Topic 04–05

## Scenario A

$$
P(A)=0.40,
\qquad
P(B)=0.50,
\qquad
P(A\cap B)=0.20.
$$

## Scenario B

$$
P(C)=0.40,
\qquad
P(D)=0.50,
\qquad
P(C\cap D)=0.
$$

## Tugas

1. Test independence Scenario A menggunakan product criterion.
2. Verifikasi Scenario A menggunakan conditional no-change check.
3. Tentukan apakah Scenario B mutually exclusive.
4. Test independence Scenario B.
5. Jelaskan mengapa “tidak bisa terjadi bersama” justru berbeda dari “mengetahui satu event tidak mengubah probability event lain.”
6. Jelaskan mengapa tidak ada causal claim yang boleh dibuat hanya dari hasil ini.

---

# Latihan 4 — Bayes + Base Rate Sensitivity

**Objective:** melakukan update dan mengaudit base-rate neglect.  
**Difficulty:** Analyze  
**Coverage:** Topic 04–06

## Scenario

Synthetic review-signal model:

$$
P(H)=0.20,
$$

$$
P(D\mid H)=0.80,
$$

$$
P(D\mid H^c)=0.20.
$$

## Tugas

1. Hitung $P(D)$.
2. Hitung $P(H\mid D)$.
3. Jelaskan mengapa $P(D\mid H)=0.80$ bukan posterior.
4. Ubah **hanya prior** menjadi $P(H)=0.05$; likelihood terms tetap. Hitung posterior baru.
5. Jelaskan peran base rate dari perbandingan dua posterior.
6. Audit claim: “Signal 80% under $H$, jadi ketika signal muncul hypothesis benar 80%.”

---

# Latihan 5 — Outcome → Random Variable → Expected Value

**Objective:** menghubungkan sample-space semantics dengan numerical expectation.  
**Difficulty:** Intermediate  
**Coverage:** Topic 01–02–07

## Scenario

Synthetic future session mempunyai outcomes:

- $o_0$: menyelesaikan 0 unit;
- $o_1$: menyelesaikan 1 unit;
- $o_2$: menyelesaikan 2 unit;
- $o_3$: menyelesaikan 3 unit.

Probability model:

| Outcome | $X$ | Probability |
|---|---:|---:|
| $o_0$ | 0 | 0.10 |
| $o_1$ | 1 | 0.25 |
| $o_2$ | 2 | 0.40 |
| $o_3$ | 3 | 0.25 |

## Tugas

1. Jelaskan perbedaan outcome dan random variable $X$.
2. Tulis distribution $P(X=x)$.
3. Verifikasi total probability.
4. Hitung $E[X]$.
5. Apakah expected value harus menjadi salah satu possible realized values? Jelaskan.
6. Bedakan table probability model ini dari empirical histogram 20 observed sessions.

---

# Latihan 6 — Canonical HerAI Score vs Probability

**Objective:** mengaudit semantic relabeling pada AI output.  
**Difficulty:** Analyze  
**Coverage:** Topic 02, 07, 08

Canonical Citra:

$$
q=0.90,
\qquad
c=1.00,
$$

$$
h(q,c)=0.6q+0.4c=0.94.
$$

Developer ingin menampilkan:

> `Success probability: 94%`

## Tugas

1. Jelaskan semantics $q$, $c$, dan $h$ saat ini.
2. Jelaskan mengapa range $[0,1]$ tidak cukup.
3. Definisikan minimal target event, unit, dan horizon yang harus ada agar “success probability” meaningful.
4. Jelaskan apa additional model/evaluation work yang dibutuhkan sebelum $\hat p$ layak dipakai.
5. Jelaskan mengapa calibration tidak dapat dinilai dari empat canonical scores.
6. Buat safe UI wording untuk kondisi saat ini.

---

# Latihan 7 — Probability, Calibration, Logits, dan Loss

**Objective:** membedakan seluruh output pipeline semantics.  
**Difficulty:** Analyze  
**Coverage:** Topic 08 + Topic 02/07 bridge

## Scenario

Binary classifier menghasilkan raw logit $z$, lalu sebuah probability-intended output $\hat p$. Evaluation summary:

| Avg predicted probability | Observed positive fraction |
|---:|---:|
| 0.20 | 0.23 |
| 0.50 | 0.47 |
| 0.80 | 0.61 |

Untuk satu positive case, model memberi $p=0.10$.

## Tugas

1. Jelaskan mengapa raw logit bukan probability.
2. Jelaskan property softmax/sigmoid-style normalization secara conceptual tanpa menyebutnya calibration proof.
3. Diagnosis calibration pada bin 0.80.
4. Jelaskan mengapa reliability diagram bukan accuracy plot.
5. Untuk $y=1$ dan $p=0.10$, jelaskan qualitatively mengapa log loss besar.
6. Jelaskan mengapa cross-entropy/log loss bukan probability.

---

# Latihan 8 — End-to-End Probability Claim Audit

**Objective:** mengintegrasikan seluruh Submodule 04 dalam satu review.  
**Difficulty:** Advanced Beginner / Analyze  
**Coverage:** Topic 01–08

## Scenario

Tim produk menulis:

> “Dari empat peserta, score rata-rata tinggi. Kami anggap participant sebagai equally likely outcomes. Event `success` didefinisikan sebagai score di atas 0.8. Karena Citra score 0.94, success probability-nya 94%. Jika learner membuka hint, probability success 80%, berarti membuka hint menyebabkan success. Karena hint dan success bisa terjadi bersama, keduanya independent. Setelah signal positif, Bayes cukup membalik conditional. Softmax membuat prediction calibrated, dan cross-entropy adalah probability error model.”

## Tugas

Audit statement tersebut minimal pada aspek berikut:

1. observed dataset vs sample space;
2. equal-likelihood assumption;
3. score vs probability;
4. event definition dan horizon;
5. conditional probability vs causality;
6. independence criterion;
7. Bayes/conditional reversal dan base rate;
8. softmax vs calibration;
9. cross-entropy semantics;
10. tulis ulang versi statement yang academically safe tanpa membuat probability claims yang tidak didukung.
