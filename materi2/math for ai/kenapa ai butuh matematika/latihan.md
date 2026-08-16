# Latihan Submodul 01 — Kenapa AI Butuh Matematika? + Mathematical Readiness

> Latihan ini dirancang untuk menguji reasoning, bukan hanya kemampuan mengganti angka pada worked example.

---

# Latihan 1 — Representation Audit

**Objective:** menguji LO-01.1.  
**Difficulty:** Basic → Intermediate.  
**Concept tested:** representation, information loss, categorical coding, semantics.

## Prompt

HerAI memiliki dua versi record peserta.

### Versi A

| Field | Value |
|---|---|
| participant | Rani |
| quiz_score | 9/10 |
| completion | 7/8 |
| math_readiness | Medium |
| preferred_learning_style | Example-first |

### Versi B

| Field | Value |
|---|---|
| participant | Rani |
| status | Good |

Jawab:

1. Mengapa Versi B bukan “Rani yang sebenarnya”?
2. Informasi apa yang hilang dari Versi A ketika diubah menjadi Versi B?
3. Dalam kondisi apa Versi B masih mungkin berguna?
4. Jika `Medium = 2`, apakah kita otomatis boleh mengatakan peserta dengan `High = 3` mempunyai readiness $1.5$ kali peserta `Medium = 2`? Jelaskan.

## Staged Hints

### Hint 1
Bedakan real-world participant, record data, dan compressed label.

### Hint 2
Tanyakan pertanyaan apa yang masih dapat dijawab oleh masing-masing representation.

### Hint 3
Angka kategori dapat menjadi code tanpa menjadi ratio-scale quantity.

## Expected Reasoning

Jawaban kuat harus menyebut bahwa representation mempertahankan sebagian informasi dan membuang sebagian lain. `status = Good` mungkin cukup untuk routing sederhana, tetapi tidak cukup untuk analisis yang membutuhkan quiz, completion, readiness, atau preference. Numeric coding `Medium = 2`, `High = 3` tidak otomatis memberi meaningful ratio.

## Rubric — 10 poin

- membedakan participant vs record: 2;
- mengidentifikasi information loss: 3;
- menjelaskan trade-off utility: 2;
- menolak ratio interpretation kategori: 2;
- komunikasi jelas: 1.

## Strong Answer Example

Versi B adalah label ringkas tentang Rani, bukan Rani sendiri. Ia membuang skor quiz, completion, readiness, dan preference yang tersedia pada Versi A. Versi B bisa berguna jika task hanya memerlukan status kasar untuk routing. Namun coding `Medium = 2` dan `High = 3` belum mendefinisikan bahwa High adalah $1.5$ kali Medium; angka itu bisa hanya index/ordinal code.

## Common Mistakes

- “Versi B salah karena datanya lebih sedikit.”
- menganggap representation paling detail selalu paling baik;
- menganggap angka kategori otomatis quantity.

---

# Latihan 2 — Observation, Feature, Target, atau Leakage?

**Objective:** menguji LO-01.2.  
**Difficulty:** Intermediate.  
**Concept tested:** observation unit, identifier, feature, target, temporal availability.

## Prompt

HerAI ingin membuat toy supervised task:

> Sebelum peserta memulai materi kandidat, prediksi apakah peserta akan mencapai mastery setelah menyelesaikan materi tersebut.

Dataset memiliki columns:

- `participant_id`
- `candidate_material_id`
- `previous_quiz_ratio`
- `previous_completion_ratio`
- `previous_study_duration`
- `post_material_quiz_ratio`
- `mastery_after_material`

Jawab:

1. Jika satu row adalah satu pasangan peserta–material, apa observation unit-nya?
2. Klasifikasikan setiap field sebagai identifier, candidate feature, target, atau tidak valid sebagai pre-material feature.
3. Mengapa `post_material_quiz_ratio` bermasalah jika prediction dilakukan sebelum material dimulai?
4. Apakah semua candidate features pasti harus digunakan?

## Staged Hints

- Bedakan kapan data tersedia.
- Target adalah outcome yang ingin diprediksi.
- Identifier bukan otomatis model feature.

## Expected Reasoning

Observation = satu participant–candidate-material record. `participant_id` dan `candidate_material_id` identifiers; previous metrics candidate features; `mastery_after_material` target; `post_material_quiz_ratio` unavailable at prediction time dan berpotensi leakage jika dipakai sebagai pre-material input.

## Rubric — 12 poin

- observation unit: 2;
- role classification: 5;
- temporal reasoning: 3;
- feature-selection caveat: 1;
- clarity: 1.

## Strong Answer Example

Satu observation adalah satu participant–material historical interaction. Pre-existing quiz, completion, dan duration dapat menjadi candidate features. Outcome mastery adalah target. Post-material quiz baru diketahui setelah treatment/material sehingga tidak tersedia pada prediction time. Candidate feature juga tidak otomatis berguna; relevansi, quality, availability, dan evaluation tetap diperlukan.

## Common Mistakes

- semua columns disebut feature;
- target dimasukkan ke feature set;
- ID dianggap numeric quantity;
- future information dianggap valid karena “ada di database”.

---

# Latihan 3 — Denominator Matters

**Objective:** menguji LO-01.3.  
**Difficulty:** Basic → Intermediate.  
**Concept tested:** fraction, decimal, percentage, denominator, interpretation.

## Prompt

Tiga peserta memiliki completion:

- Rani: $9/12$
- Sari: $7/8$
- Tono: $16/20$

1. Ubah semuanya menjadi decimal dan percentage.
2. Urutkan dari completion proportion tertinggi ke terendah.
3. Jelaskan mengapa membandingkan numerator `9`, `7`, dan `16` saja tidak valid.
4. Apakah peserta dengan $7/8$ memiliki probability sukses $87.5\%$? Jelaskan.

## Staged Hints

- fraction bar berarti division;
- decimal ke percent dikali $100\%$;
- semantics completion berbeda dari probability.

## Expected Reasoning

$$
\frac{9}{12}=0.75=75\%
$$

$$
\frac{7}{8}=0.875=87.5\%
$$

$$
\frac{16}{20}=0.8=80\%
$$

Urutan: Sari, Tono, Rani. Probability claim tidak valid hanya dari completion.

## Rubric — 10 poin

- conversion benar: 4;
- ranking: 2;
- denominator reasoning: 2;
- probability safety: 2.

## Strong Answer Example

Sari memiliki completion proportion tertinggi $87.5\%$, lalu Tono $80\%$, lalu Rani $75\%$. Numerator tidak dapat dibandingkan sendirian karena total unit berbeda. Completion $87.5\%$ adalah fraction unit yang selesai, bukan probability keberhasilan.

## Common Mistakes

- $0.875=0.875\%$;
- mengurutkan dari numerator terbesar;
- menyamakan persentase dengan probability.

---

# Latihan 4 — Formula Reading dan Substitution

**Objective:** menguji LO-01.4.  
**Difficulty:** Intermediate.  
**Concept tested:** variable, coefficient, expression, equation, substitution, semantics.

## Prompt

Definisikan:

- $q$ = quiz ratio;
- $c$ = completion ratio;
- $r$ = toy score.

Formula:

$$
r=0.7q+0.3c
$$

Untuk peserta Nisa:

$$
q=0.90
$$

$$
c=0.60
$$

Kerjakan:

1. Identifikasi coefficients.
2. Terjemahkan formula ke bahasa manusia.
3. Hitung $r$ langkah demi langkah.
4. Ubah hanya $c$ menjadi $0.80$. Prediksi arah perubahan $r$ sebelum menghitung.
5. Apakah coefficient $0.7$ membuktikan quiz menyebabkan $70\%$ outcome? Jelaskan.

## Staged Hints

- substitution dulu;
- multiplication sebelum addition;
- positive coefficient berarti menaikkan input akan menaikkan output pada rule ini.

## Expected Reasoning

Awal:

$$
r=0.7(0.90)+0.3(0.60)
$$

$$
r=0.63+0.18=0.81
$$

Setelah $c=0.80$:

$$
r=0.63+0.24=0.87
$$

Coefficient adalah property formula, bukan causal evidence.

## Rubric — 12 poin

- coefficients: 2;
- translation: 2;
- computation awal: 3;
- sensitivity prediction + computation: 3;
- causal safety: 2.

## Common Mistakes

- $0.7+0.3$ dihitung tanpa mengalikan inputs;
- $r=0.81$ disebut probability;
- coefficient dibaca sebagai causal percentage.

---

# Latihan 5 — Function dan Domain

**Objective:** menguji LO-01.5.  
**Difficulty:** Intermediate.  
**Concept tested:** function, function notation, domain, same-output allowance.

## Prompt

Diberikan:

$$
f(x)=0.5x+0.2
$$

1. Hitung $f(0.4)$ dan $f(0.8)$.
2. Jika $x$ merepresentasikan quiz ratio, berikan domain semantik yang masuk akal.
3. Apakah relation berikut function?

- $0.2\rightarrow0.3$
- $0.4\rightarrow0.4$
- $0.8\rightarrow0.6$
- $1.0\rightarrow0.7$

4. Apakah relation berikut function dari participant saja ke readiness?

- Alya $\rightarrow$ Medium
- Alya $\rightarrow$ High

5. Bagaimana menambahkan context agar mapping terakhir bisa masuk akal sebagai function?

## Expected Reasoning

$$
f(0.4)=0.4
$$

$$
f(0.8)=0.6
$$

Quiz-ratio domain:

$$
0\le x\le1
$$

Relation angka pertama valid function. Relation Alya dua output bukan function dari participant saja; tambahkan time/context seperti `(Alya, January)` dan `(Alya, June)`.

## Rubric — 10 poin

- evaluation: 2;
- domain: 2;
- function classification: 2;
- non-function explanation: 2;
- context repair: 2.

## Common Mistakes

- mengira dua input tidak boleh punya output sama;
- membaca $f(x)$ sebagai $f\times x$;
- mengabaikan semantics domain.

---

# Latihan 6 — Graph dan Average Rate of Change

**Objective:** menguji LO-01.6.  
**Difficulty:** Intermediate → Challenge.  
**Concept tested:** coordinates, delta, rate, graph literacy, causation safety.

## Prompt

Sebuah toy function memiliki points:

$$
(0.2,0.35)
$$

dan:

$$
(0.8,0.65)
$$

1. Hitung $\Delta x$.
2. Hitung $\Delta y$.
3. Hitung average rate of change.
4. Interpretasikan hasil dalam format “output units per input unit”.
5. Jika graph terlihat sangat curam karena vertical axis hanya ditampilkan dari $0.34$ sampai $0.66$, apa yang perlu diwaspadai?
6. Jika horizontal axis adalah study duration dan vertical axis quiz score, apakah positive slope membuktikan causation?

## Expected Reasoning

$$
\Delta x=0.8-0.2=0.6
$$

$$
\Delta y=0.65-0.35=0.30
$$

$$
\frac{\Delta y}{\Delta x}
=
\frac{0.30}{0.60}
=
0.5
$$

Interpretasi: output berubah rata-rata $0.5$ unit per satu unit input pada interval tersebut. Curam secara visual dapat dipengaruhi axis scale. Positive slope bukan causal proof.

## Rubric — 12 poin

- deltas: 3;
- rate: 3;
- interpretation: 2;
- axis-scale reasoning: 2;
- causation safety: 2.

## Common Mistakes

- membalik numerator/denominator;
- lupa units;
- graph naik = causation;
- menganggap visual steepness tanpa membaca axis.

---

# Latihan 7 — Powers, Logarithms, dan Sigma

**Objective:** menguji LO-01.7.  
**Difficulty:** Intermediate.  
**Concept tested:** exponent, inverse log relationship, summation, grouping.

## Prompt

Kerjakan:

1. Hitung $2^5$.
2. Jika $3^4=81$, tentukan $\log_3(81)$.
3. Expand:

$$
\sum_{i=1}^{4}a_i
$$

4. Jika:

$$
a_1=1,\quad a_2=2,\quad a_3=3,\quad a_4=4
$$

hitung summation.
5. Bandingkan:

$$
\left(\sum_{i=1}^{3}a_i\right)^2
$$

dengan:

$$
\sum_{i=1}^{3}a_i^2
$$

untuk $a_1=1$, $a_2=2$, $a_3=3$.

## Expected Reasoning

1. $2^5=32$.
2. $\log_3(81)=4$.
3. $a_1+a_2+a_3+a_4$.
4. $10$.
5. Square of sum $=36$, sum of squares $=14$.

## Rubric — 10 poin

- power: 1;
- log: 2;
- sigma expansion: 2;
- sum: 2;
- grouping comparison: 3.

## Common Mistakes

- $2^5=10$;
- log dibaca sebagai division;
- sigma dianggap mean;
- exponent ditempatkan pada sum yang salah.

---

# Latihan 8 — Integrated HerAI Reasoning Audit

**Objective:** menguji integrasi LO-01.1–LO-01.7.  
**Difficulty:** Challenge.  
**Concept tested:** cross-topic reasoning dan conceptual safety.

## Prompt

Seorang anggota tim membuat laporan:

> “Alya punya `completion = 6/8 = 0.75%`. Karena `0.75` berada di antara 0 dan 1, peluang Alya sukses adalah 75%. Kita memberi `Basic=1`, `Medium=2`, `High=3`, sehingga High tiga kali lebih siap daripada Basic. Model kita memakai $h(q,c)=0.6q+0.4c$ dan menghasilkan $0.78$, jadi model akurat 78%. Graph study duration vs quiz score naik, jadi tambahan waktu belajar menyebabkan skor naik. Karena $\sum$ berarti average, $\sum_{i=1}^{4}q_i=0.75$.”

Audit laporan tersebut.

Temukan **minimal enam kesalahan** dan tulis versi perbaikannya.

## Staged Hints

### Hint 1
Periksa conversion fraction → decimal → percentage.

### Hint 2
Periksa semantics angka kategori.

### Hint 3
Pisahkan toy score, probability, dan accuracy.

### Hint 4
Periksa graph association vs causation.

### Hint 5
Periksa sigma vs mean.

## Expected Reasoning

Contoh temuan:

1. $6/8=0.75=75\%$, bukan $0.75\%$.
2. Completion tidak otomatis probability.
3. Numeric coding kategori tidak memberi ratio semantics.
4. $h=0.78$ adalah toy score, bukan accuracy/probability.
5. Positive graph association tidak membuktikan causation.
6. Sigma adalah sum, bukan average.
7. Untuk quiz ratios HerAI:

$$
\sum_{i=1}^{4}q_i=3.00
$$

sedangkan mean preview:

$$
\frac{1}{4}\sum_{i=1}^{4}q_i=0.75
$$

## Rubric — 16 poin

- enam valid errors: 6;
- corrections mathematically correct: 6;
- semantics/AI safety: 3;
- clarity: 1.

## Strong Answer Example

Laporan mencampur format angka dengan semantics. Completion Alya adalah $75\%$, tetapi itu tetap completion, bukan probability. Coding Basic/Medium/High tidak membuktikan ratio antar-level. Output $0.78$ berasal dari toy weighted function sehingga bukan accuracy atau probability kecuali didefinisikan dan divalidasi demikian. Graph naik hanya mendeskripsikan association. Sigma menjumlahkan values; mean membutuhkan division by $n$. Total quiz ratios empat peserta adalah $3.00$, dan mean-nya $0.75$.

## Common Mistakes

- hanya menemukan arithmetic errors;
- melewatkan semantics;
- menyebut toy score sebagai confidence;
- menganggap “model” selalu berarti learned ML model.
