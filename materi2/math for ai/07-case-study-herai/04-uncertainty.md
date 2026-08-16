# Topic 04 — Uncertainty
## Submodule 07 — Integrated Case Study: Math for AI di HerAI

> **Case status:** Topic ini mempertahankan canonical Alya/Bima/Citra/Dewi, canonical participant context, dan cosine matching outputs Topic 02. Karena Stage B tidak mengunci angka interaction/outcome untuk probability secara cukup spesifik, Topic 04 menambahkan **SUPPLEMENTARY SYNTHETIC SESSION TABLE** yang terpisah, eksplisit, dan hanya untuk latihan probabilitas. Tabel ini **bukan data produksi HerAI**, tidak mengubah canonical participant records, dan tidak dibentuk dari $h(q,c)$.

---

# 1. HOOK / REAL PROBLEM — “0.90” itu probability atau cuma score?

Topic 02 menghasilkan cosine similarity seperti:

- Citra ↔ Matematika Dasar: $0.9081$;
- Citra ↔ Intro AI: $0.9056$.

Topic 03 juga menghasilkan top-two gap:

$$
0.9081-0.9056=0.0025.
$$

Sekarang bayangkan seseorang berkata:

> “Berarti probability Citra sukses di Matematika Dasar adalah 90.81%.”

Itu **salah**.

Cosine similarity menjawab pertanyaan geometris tentang alignment di feature space.

Probability membutuhkan hal berbeda:

1. event yang jelas;
2. sample space atau probability model yang jelas;
3. conditioning statement yang jelas jika memakai conditional probability;
4. sumber probability yang jelas.

Jadi pertanyaan Topic 04 bukan:

> “Bagaimana mengubah cosine menjadi probability?”

Pertanyaannya:

> **Bagaimana berbicara tentang uncertainty secara sah tanpa mengganti nama score menjadi probability?**

---

# 2. PREDICT — Apakah probability yang besar berarti outcome pasti terjadi?

Misalkan benar-benar ada suatu event $E$ dengan:

$$
P(E)=0.80.
$$

Apakah itu berarti $E$ pasti terjadi pada satu kasus?

Tidak.

Probability $0.80$ menyatakan uncertainty di bawah probability model/experiment yang didefinisikan.

Satu realization tetap bisa menghasilkan $E$ atau $E^c$.

Probability bukan certainty.

---

# 3. LEARNING OUTCOMES

Setelah Topic 04, kamu diharapkan mampu:

1. mendefinisikan experiment, outcome, sample space, dan event dalam Integrated Case;
2. membedakan empirical count/proportion dari universal future probability;
3. menghitung probability pada finite synthetic sampling experiment;
4. menghitung joint probability;
5. menghitung complement;
6. menghitung conditional probability dengan denominator/reference set yang benar;
7. membedakan $P(E\mid A)$ dan $P(A\mid E)$;
8. menjelaskan mengapa conditioning tidak membuktikan causation;
9. menjaga cosine similarity, ranking margin, $q$, $c$, dan $h(q,c)$ sebagai quantity non-probabilistik;
10. menyiapkan semantic bridge menuju Topic 05 — Prediction Score dan Loss.

---

# 4. REACTIVATE ONLY WHAT IS NEEDED

Learner sudah pernah mempelajari Probability pada Submodule 04.

Kita hanya mengaktifkan kembali konsep yang diperlukan.

## 4.1 Experiment

**Experiment** adalah proses yang possible outcomes-nya kita definisikan.

Pada Topic ini experiment pedagogis kita adalah:

> **Pilih satu record secara uniform dari 16 supplementary synthetic session records.**

Karena setiap record dipilih dengan probability yang sama:

$$
P(S_i)=\frac{1}{16}.
$$

Ini adalah probability model finite yang eksplisit.

## 4.2 Outcome

Satu outcome adalah satu session record yang terpilih:

$$
S_{01},S_{02},\ldots,S_{16}.
$$

## 4.3 Sample space

$$
\Omega=\{S_{01},S_{02},\ldots,S_{16}\}.
$$

## 4.4 Event

Event adalah subset dari sample space.

### Event $A$ — high alignment

$$
A=\{S_i:\text{ cosine similarity }\ge0.85\}.
$$

Threshold $0.85$ adalah **synthetic pedagogical categorization rule**, bukan production threshold.

### Event $E$ — complete within 7-day synthetic horizon

$$
E=\{S_i:\text{completed\_7d}=1\}.
$$

Outcome `completed_7d` juga **synthetic pedagogical outcome**.

---

# 5. CRITICAL SEMANTIC MAP

| Quantity | Contoh | Semantic type | Probability? |
|---|---:|---|---|
| quiz ratio | $q=0.80$ | historical/context ratio | **No** |
| completion ratio | $c=0.75$ | historical/context ratio | **No** |
| $h(q,c)$ | $0.78$ | constructed instructional score | **No** |
| cosine similarity | $0.9257$ | matching score | **No** |
| ranking gap | $0.0504$ | derived score difference | **No** |
| `completed_7d` | $0/1$ | synthetic session outcome | **No** by itself |
| $P(E)$ | $8/16$ | probability under defined experiment | **Yes** |
| $P(E\mid A)$ | $5/7$ | conditional probability | **Yes** |

**Range $[0,1]$ tidak menentukan semantic type.**

---

# 6. EXPLORE THE SAME CANONICAL CASE

| Peserta | $q$ | $c$ | Duration | $h(q,c)$ |
|---|---:|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 | 0.78 |
| Bima | 0.60 | 0.625 | 30 | 0.61 |
| Citra | 0.90 | 1.00 | 55 | 0.94 |
| Dewi | 0.70 | 0.50 | 40 | 0.62 |

Dan:

$$
h(q,c)=0.6q+0.4c
$$

tetap **instructional score only**.

Tidak ada langkah di Topic 04 yang memakai $h$ untuk menghitung $P(E)$.

---

# 7. SUPPLEMENTARY SYNTHETIC SESSION TABLE

## 7.1 Unit of observation

Satu row adalah:

> **satu synthetic participant–material session record dalam horizon 7 hari yang didefinisikan khusus untuk latihan probability.**

Ini berbeda dari canonical participant-level table Topic 01.

## 7.2 Table

| Session | Participant | Material | Cosine | Alignment group | Synthetic 7-day outcome |
|---|---|---|---:|---|---|
| S01 | Alya | Intro AI | 0.9257 | High | 1 (complete) |
| S02 | Alya | Belajar Python | 0.7523 | Lower | 1 (complete) |
| S03 | Alya | Desain UI/UX | 0.5485 | Lower | 0 (not complete) |
| S04 | Alya | Matematika Dasar | 0.8753 | High | 1 (complete) |
| S05 | Bima | Intro AI | 0.8612 | High | 1 (complete) |
| S06 | Bima | Belajar Python | 0.8907 | High | 1 (complete) |
| S07 | Bima | Desain UI/UX | 0.6258 | Lower | 0 (not complete) |
| S08 | Bima | Matematika Dasar | 0.7813 | Lower | 1 (complete) |
| S09 | Citra | Intro AI | 0.9056 | High | 1 (complete) |
| S10 | Citra | Belajar Python | 0.6828 | Lower | 0 (not complete) |
| S11 | Citra | Desain UI/UX | 0.4594 | Lower | 0 (not complete) |
| S12 | Citra | Matematika Dasar | 0.9081 | High | 0 (not complete) |
| S13 | Dewi | Intro AI | 0.7104 | Lower | 0 (not complete) |
| S14 | Dewi | Belajar Python | 0.7117 | Lower | 1 (complete) |
| S15 | Dewi | Desain UI/UX | 0.8867 | High | 0 (not complete) |
| S16 | Dewi | Matematika Dasar | 0.6559 | Lower | 0 (not complete) |

## 7.3 Important boundary

Tabel ini **tidak menyatakan** bahwa:

- HerAI pernah menjalankan 16 sessions tersebut;
- cosine menyebabkan completion;
- threshold $0.85$ optimal;
- completion rate ini memprediksi future learners;
- high alignment adalah treatment.

Tujuan tabel hanya menyediakan finite, manually checkable probability experiment yang **tidak bergantung pada $h$**.

---

# 8. FORMAL PROBABILITY FROM THE DEFINED EXPERIMENT

Karena kita memilih satu dari 16 rows secara uniform:

$$
P(B)=\frac{|B|}{16}
$$

untuk event $B\subseteq\Omega$.

Ini valid karena **equal-likelihood assumption sudah didefinisikan**.

---

# 9. WORKED BASIC MICRO-EXAMPLE — $P(E)$

Dari 16 rows:

- complete: $8$;
- not complete: $8$.

Maka:

$$
P(E)=\frac{8}{16}=0.5.
$$

Complement:

$$
P(E^c)=1-P(E)=0.5.
$$

Interpretasi sah:

> “Jika satu dari 16 synthetic session records dipilih uniformly, probability bahwa selected record mempunyai `completed_7d=1` adalah $0.5$.”

Tidak sah:

> “Setiap learner HerAI punya 50% chance menyelesaikan materi.”

---

# 10. EVENT $A$ — HIGH ALIGNMENT

Ada $7$ records dengan cosine $\ge0.85$.

$$
P(A)=\frac{7}{16}=0.4375.
$$

Dan:

$$
P(A^c)=\frac{9}{16}=0.5625.
$$

---

# 11. JOINT EVENT — $A\cap E$

Ada $5$ records yang sekaligus high alignment dan completed.

$$
P(A\cap E)=\frac{5}{16}=0.3125.
$$

Denominator masih seluruh sample space $16$.

---

# 12. CONDITIONAL PROBABILITY — UBAH REFERENCE SET

Kita ingin:

> Dari **high-alignment records saja**, berapa fraction yang completed?

$$
P(E\mid A)=\frac{P(E\cap A)}{P(A)},\qquad P(A)>0.
$$

Substitusi:

$$
P(E\mid A)
=
\frac{5/16}{7/16}
=
\frac{5}{7}
\approx0.7143.
$$

Natural-count reading:

> Dari $7$ high-alignment records, $5$ mempunyai synthetic completion outcome.

Denominator berubah dari $16$ menjadi $7$.

Itulah inti conditioning:

> **reference set berubah menjadi kondisi $A$.**

---

# 13. LOWER-ALIGNMENT CONDITION

Pada $A^c$:

- total records: $9$;
- completed: $3$.

$$
P(E\mid A^c)=\frac{3}{9}=\frac{1}{3}\approx0.3333.
$$

Secara descriptive dalam synthetic experiment:

$$
P(E\mid A)>P(E\mid A^c).
$$

Tetapi kita **tidak boleh** mengatakan:

> “High cosine menyebabkan completion.”

Conditional difference adalah **association inside this defined synthetic table/model**, bukan causal effect.

---

# 14. REVERSE CONDITION — $P(A\mid E)$

Dari records yang completed:

- total completed: $8$;
- high alignment dan completed: $5$.

$$
P(A\mid E)=\frac{5}{8}=0.625.
$$

Bandingkan:

$$
P(E\mid A)=\frac{5}{7}\approx0.7143
$$

dan:

$$
P(A\mid E)=\frac{5}{8}=0.625.
$$

Mereka tidak sama karena denominator/reference set berbeda.

---

# 15. MATH / SYSTEM READING SKILL — BEDAH $P(E\mid A)$

Untuk:

$$
P(E\mid A)=\frac{5}{7},
$$

baca:

1. **Object:** selected synthetic session record.
2. **Notation:** conditional probability.
3. **Source:** finite uniform sampling experiment.
4. **Input:** event $E$ dan condition $A$.
5. **Operation:** restrict reference set to $A$, then count $E$.
6. **Output:** scalar $5/7$.
7. **Semantic type:** probability under defined experiment.
8. **Assumption:** 16 records equally likely to be selected.
9. **Justified:** 5 of 7 high-alignment records are completion outcomes in this synthetic table.
10. **Not justified:** future learner probability, causal effect, production confidence.
11. **Downstream role:** probability-semantic bridge sebelum model score/loss.

---

# 16. SAME NUMBER, DIFFERENT MEANING

Bima:

$$
c_{\text{Bima}}=0.625.
$$

Ini historical/context completion ratio.

Sedangkan:

$$
P(A\mid E)=0.625.
$$

Ini probability dalam defined synthetic experiment.

Numerically sama, semantically berbeda.

---

# 17. WHAT-IF — UBAH SATU SYNTHETIC OUTCOME

Counterfactual only:

Misalkan `Citra → Matematika Dasar` berubah dari `completed_7d=0` menjadi `1`.

High-alignment group tetap $7$ records.

Completion di high group naik dari $5$ menjadi $6$.

$$
P(E\mid A)=\frac{6}{7}\approx0.8571.
$$

Yang tidak berubah:

- Citra cosine $0.9081$;
- canonical $q,c,h$;
- participant/material vectors;
- threshold $0.85$.

Outcome counts dan matching scores adalah quantity families berbeda.

---

# 18. PROBABILITY VS CERTAINTY

Jika:

$$
P(E\mid A)=\frac{5}{7},
$$

maka:

$$
P(E^c\mid A)=1-\frac57=\frac27.
$$

Jadi probability tinggi pun tidak berarti certainty.

---

# 19. PROBABILITY VS COSINE

Alya–Intro AI:

$$
s_{\cos}=0.9257.
$$

Ini **tidak** berarti:

$$
P(E\mid\text{Alya, Intro AI})=0.9257.
$$

Tidak ada probability model per pair yang mendukung equality tersebut.

---

# 20. PROBABILITY VS $h(q,c)$

Alya:

$$
h(0.80,0.75)=0.78.
$$

Apakah:

$$
P(E\mid\text{Alya})=0.78?
$$

Tidak.

Topic 04 **tidak mendefinisikan** probability per participant dari $h$.

Tidak ada langkah `h → probability` dalam contract.

---

# 21. EMPIRICAL RELATIVE FREQUENCY VS FUTURE PROBABILITY

“5 dari 7 high-alignment synthetic records completed” adalah observed proportion pada synthetic table.

Ia menjadi probability **untuk experiment memilih satu record uniformly dari tabel itu**.

Ia tidak otomatis menjadi future learner probability.

---

# 22. WHY THIS MATTERS IN AI

Sebelum memakai kata **probability**, tanyakan:

1. event apa?
2. sample space/model apa?
3. condition apa?
4. probability berasal dari mana?
5. apakah quantity memang dimaksudkan sebagai probability?
6. apakah interpretation berlaku pada table/model ini atau future cases?

---

# 23. MISCONCEPTION / FAILURE-MODE CHALLENGE

- cosine $0.90$ = 90% chance → **salah**
- $h=0.94$ = 94% probability → **salah**
- semua value $[0,1]$ = probability → **salah**
- $P(E\mid A)=P(A\mid E)$ → **salah secara umum**
- conditional difference proves causation → **salah**
- probability 0.8 means event pasti terjadi → **salah**
- observed proportion automatically universal future probability → **salah**
- more records automatically fix wrong event definition → **salah**

---

# 24. TRY IT YOURSELF

Dari table:

- $|\Omega|=16$;
- $|A|=7$;
- $|E|=8$;
- $|A\cap E|=5$.

Maka:

$$
P(A)=\frac7{16}=0.4375,
$$

$$
P(E)=\frac8{16}=0.5,
$$

$$
P(A\cap E)=\frac5{16}=0.3125,
$$

$$
P(E\mid A)=\frac57\approx0.7143,
$$

$$
P(A\mid E)=\frac58=0.625.
$$

---

# 25. VISUAL / INTERACTIVE ARCHITECTURE

## [STATIC VISUAL] — Score vs probability provenance

**Learning purpose:** memisahkan $h$, cosine, ranking gap, dan conditional probability.  
**Initial state:** empat cards.  
**Learner action:** baca source chain.  
**Expected behavior:** hanya probability card mempunyai event + sample space + model.  
**Feedback:** tiap card menampilkan source, semantic type, forbidden label.  
**Safety note:** same numeric range does not imply same meaning.

## [STEP-BY-STEP REVEAL] — Conditional denominator

**Learning purpose:** menunjukkan reference-set change.  
**Initial state:** 16 session rows.  
**Learner action:** reveal all 16 → highlight 7 high-alignment → count 5 complete.  
**Expected behavior:** learner membaca $5/7$, bukan $5/16$.  
**Feedback:** wrong denominator memunculkan explanation.  
**Safety note:** condition narrows reference set; it does not cause event.

## [COMPARE VIEW] — $P(E\mid A)$ vs $P(A\mid E)$

**Learning purpose:** mencegah conditional reversal.  
**Initial state:** same intersection count 5.  
**Learner action:** switch denominator.  
**Expected behavior:** $5/7$ vs $5/8$.  
**Feedback:** UI labels “given A” vs “given E”.  
**Safety note:** same numerator can have different meaning.

## [NUMBER MANIPULATOR] — Change one synthetic outcome

**Learning purpose:** inspect count sensitivity.  
**Initial state:** canonical supplementary synthetic table.  
**Learner action:** flip one outcome.  
**Expected behavior:** recompute $P(E)$, $P(E\mid A)$, $P(E\mid A^c)$.  
**Feedback:** show probabilities that changed vs scores that did not.  
**Safety note:** counterfactual only; canonical package values remain unchanged.

## [INTERACTIVE VISUAL] — “Can I call this probability?”

**Learning purpose:** semantic classification.  
**Initial state:** `0.78`, `0.9257`, `0.0025`, `5/7`.  
**Learner action:** classify score/ratio/probability.  
**Expected behavior:** only $5/7$ under defined experiment is probability.  
**Feedback:** require event/model explanation.  
**Safety note:** probability label requires semantics, not just numeric range.

---

# 26. CHECKPOINT

1. $h=0.94$ probability? **Tidak.**
2. cosine $0.9081$ probability? **Tidak.**
3. denominator $P(E\mid A)$? **7.**
4. $P(E\mid A)$? **$5/7\approx0.7143$.**
5. $P(A\mid E)$? **$5/8=0.625$.**
6. Conditional difference proves causation? **Tidak.**
7. Synthetic table = actual HerAI evidence? **Tidak.**

---

# 27. MASTERY CHECK — “I CAN…”

- **I can** define experiment, outcome, sample space, and event.
- **I can** identify the source of a probability.
- **I can** compute joint and conditional probability.
- **I can** choose the correct conditional denominator.
- **I can** distinguish $P(E\mid A)$ from $P(A\mid E)$.
- **I can** explain why conditioning does not prove causation.
- **I can** distinguish observed proportion from universal future probability.
- **I can** keep cosine, $h$, and ranking gap separate from probability.
- **I can** explain why probability does not mean certainty.

---

# 28. SCOPE BOUNDARY

Topic 04 tidak:

- estimate production probabilities;
- fit calibration;
- infer probability from cosine;
- infer probability from $h$;
- perform causal inference;
- run A/B testing;
- estimate confidence intervals;
- train recommendation model;
- compute loss;
- compute gradients.

---

# 29. SUMMARY

```text
Topic 01
data contract
    ↓
Topic 02
representation + matching score
    ↓
Topic 03
diagnostics + association limits
    ↓
Topic 04
explicit uncertainty experiment + event probability
```

Critical distinctions:

$$
\text{cosine score}\neq\text{probability}
$$

$$
h(q,c)\neq\text{probability}
$$

$$
P(E\mid A)\neq P(A\mid E)
$$

$$
\text{conditional association}\neq\text{causal effect}
$$

$$
\text{probability}\neq\text{certainty}
$$

---

# 30. BRIDGE TO TOPIC 05 — PREDICTION SCORE DAN LOSS

Sekarang kita telah melihat seperti apa quantity yang benar-benar mempunyai probability semantics.

Topic berikutnya menanyakan:

> **Jika synthetic trainable model menghasilkan output numerik, apa semantic type output tersebut, bagaimana membandingkannya dengan target instruksional yang terpisah dari $h$, dan bagaimana error menjadi loss/objective?**

Rule tetap:

> **raw/model score tidak otomatis probability.**

# **Topic 05 — Prediction Score dan Loss**
