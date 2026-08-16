# Topic 04 — Conditional Probability

> **Submodule 04 — Probability: Menalar Ketidakpastian dalam AI**  
> **Filename:** `04-conditional-probability.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Prasyarat:** Topic 01–03 selesai; peserta dapat menjelaskan sample space $\Omega$, event $A,B$, probability $P(A)$, intersection $A\cap B$, joint probability $P(A\cap B)$, union, serta membaca two-way probability table  
> **Forward dependency:** Topic 05 — Independence dan Dependence  
> **Boundary:** Topic ini memperkenalkan conditional probability sebagai perubahan reference set, notation $P(A\mid B)$, formula definisi, arah kondisi, serta secondary multiplication identity. Topic ini **belum** menguji independence, memakai Bayes, law of total probability, random variable, expected value, calibration, logits, atau probabilistic loss.

---

# 1. Hook — Pertanyaan Sama, Informasi Berbeda, Jawaban Bisa Berbeda

Bayangkan sebuah hypothetical HerAI learning-card randomizer.

Kita tertarik pada event:

- $A$: card yang dipilih bertipe **challenge**.

Tanpa informasi tambahan, pertanyaannya adalah:

> “Berapa probability card bertipe challenge?”

Sekarang seseorang memberi informasi baru:

- $B$: card yang dipilih memiliki fitur **reflection**.

Pertanyaannya berubah menjadi:

> “Jika kita sudah tahu card tersebut memiliki reflection, berapa probability card itu juga bertipe challenge?”

Kata **“jika kita sudah tahu...”** mengubah cara kita melihat probability.

Kita tidak lagi memakai seluruh sample space sebagai reference set. Kita hanya melihat bagian yang memenuhi condition $B$.

Itulah ide utama **conditional probability**.

MIT 18.05 menjelaskan conditional probability dengan cara yang sangat langsung: setelah informasi $B$ diketahui, perhatian kita dibatasi ke $B$; probability $A$ kemudian dibaca sebagai bagian dari $B$ yang juga berada di $A$. [R1]

---

# 2. Tujuan Topic 04

Setelah menyelesaikan topic ini, kamu diharapkan mampu mengatakan:

- **I can explain** conditional probability sebagai perubahan reference set karena sebuah condition diketahui.
- **I can read** $P(A\mid B)$ sebagai “probability $A$ given $B$”.
- **I can identify** event of interest dan condition dari kalimat sehari-hari.
- **I can identify** numerator $P(A\cap B)$ dan denominator $P(B)$ dari table/model.
- **I can calculate** $P(A\mid B)$ ketika $P(B)>0$.
- **I can explain** mengapa denominator adalah probability dari condition $B$, bukan otomatis seluruh sample space.
- **I can distinguish** joint probability $P(A\cap B)$ dari conditional probability $P(A\mid B)$.
- **I can distinguish** $P(A\mid B)$ dari $P(B\mid A)$.
- **I can interpret** conditional probability tanpa mengubahnya menjadi causal claim.
- **I can distinguish** observed conditional proportion dari probability claim tentang future cases ketika probability model belum didefinisikan.

---

# 3. Recall — Dari Joint Event ke Pertanyaan “Given”

Pada Topic 03 kita sudah mengenal intersection:

$$
A\cap B.
$$

Ini adalah event ketika $A$ dan $B$ terjadi bersama.

Probability-nya ditulis:

$$
P(A\cap B).
$$

Joint probability masih dinilai terhadap **seluruh probability model yang sedang dipakai**.

Conditional probability mengajukan pertanyaan berbeda:

> Di antara cases yang sudah diketahui berada di $B$, seberapa besar bagian yang juga berada di $A$?

Perubahan kecil pada kalimat ini sangat penting.

Topic 03 bertanya:

> “Berapa bagian dari seluruh model yang berada di $A$ dan $B$?”

Topic 04 bertanya:

> “Kalau kita hanya melihat $B$, berapa bagian dari $B$ yang juga berada di $A$?”

Numerator bisa melibatkan region yang sama, yaitu $A\cap B$, tetapi denominator-nya berubah karena reference set berubah.

---

# 4. Predict — Filter Universe Sebelum Menghitung

Satu fair die dilempar satu kali.

$$
\Omega=\{1,2,3,4,5,6\}.
$$

Definisikan:

- $A$: hasil kurang dari atau sama dengan 2, sehingga $A=\{1,2\}$;
- $B$: hasil genap, sehingga $B=\{2,4,6\}$.

Sekarang jawab **sebelum menghitung dengan formula**.

## Prediksi 1

Jika tidak ada condition, reference set kita adalah apa?

## Prediksi 2

Jika kita diberi informasi bahwa $B$ terjadi, outcomes mana yang masih relevan?

## Prediksi 3

Di dalam reference set baru itu, outcomes mana yang juga memenuhi $A$?

## Prediksi 4

Apakah denominator seharusnya tetap 6, atau berubah menjadi ukuran/probability dari $B$?

Tahan jawabanmu. Kita akan formalize setelah intuition-nya jelas.

---

# 5. Intuisi — Conditioning = “Filter Dulu, Baru Ukur”

Pada contoh dadu, condition $B$ adalah:

$$
B=\{2,4,6\}.
$$

Begitu kita tahu $B$ terjadi, outcomes 1, 3, dan 5 tidak lagi berada dalam reference set untuk pertanyaan tersebut.

Reference set kita sekarang hanya:

$$
\{2,4,6\}.
$$

Di antara tiga outcomes itu, mana yang juga memenuhi $A=\{1,2\}$?

Hanya outcome 2.

Jadi secara intuitive:

> dari tiga equally likely outcomes yang masih mungkin setelah condition $B$, satu juga memenuhi $A$.

Maka:

$$
P(A\mid B)=\frac{1}{3}.
$$

OpenStax menjelaskan intuition yang sama: conditional probability mengurangi/restrict sample space ke condition, lalu probability event of interest dihitung di dalam reduced sample space tersebut. [R2]

**Kata kunci Topic 04:**

> **filter reference set terlebih dahulu.**

---

# 6. Formal Definition — Conditional Probability

Jika $A$ dan $B$ adalah events dan $P(B)>0$, conditional probability dari $A$ **given** $B$ didefinisikan sebagai:

$$
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)}.
$$

Dibaca:

> “probability $A$ given $B$”

atau:

> “probability $A$ dengan condition $B$”.

MIT memberikan definisi yang sama dan menekankan bahwa secara visual kita membatasi perhatian pada $B$, kemudian melihat bagian $B$ yang ditempati $A$. [R1]

## Apa arti setiap bagian?

- $A$ = event of interest, yaitu event yang ingin kita ukur setelah condition diketahui;
- $B$ = condition / informasi yang diketahui berlaku;
- $A\cap B$ = bagian yang memenuhi event of interest **dan** condition;
- $P(A\cap B)$ = probability mass pada overlap tersebut;
- $P(B)$ = probability mass dari seluruh reference set setelah conditioning;
- $P(A\mid B)$ = bagian dari probability mass $B$ yang juga berada pada $A$.

---

# 7. Mengapa Harus $P(B)>0$?

Formula:

$$
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)}
$$

mengandung pembagian oleh $P(B)$.

Jika:

$$
P(B)=0,
$$

maka denominator-nya nol. Dalam arithmetic biasa, pembagian dengan nol tidak terdefinisi.

Karena itu, pada level course ini kita memakai formula conditional probability hanya ketika:

$$
P(B)>0.
$$

Tidak perlu membawa teori yang lebih advanced untuk memahami boundary ini.

Beginner-safe reading:

> Kita hanya memakai formula ini jika condition $B$ memiliki probability lebih dari nol dalam model yang sedang dipakai.

---

# 8. Math Reading Skill — Jangan Baca Formula Hanya sebagai “Bagi Atas dengan Bawah”

Perhatikan:

$$
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)}.
$$

## 8.1 Input

Kita memerlukan:

1. event of interest $A$;
2. condition $B$;
3. joint probability $P(A\cap B)$;
4. condition probability $P(B)$;
5. syarat $P(B)>0$.

## 8.2 Operation

Kita membagi joint probability oleh probability dari condition:

$$
\text{bagian dari }B\text{ yang juga }A
=
\frac{\text{mass pada }A\cap B}{\text{mass pada }B}.
$$

## 8.3 Result

Result-nya adalah probability $A$ **di dalam reference set $B$**.

Karena ia tetap probability, nilainya berada pada rentang:

$$
0\le P(A\mid B)\le1.
$$

## 8.4 Unit

Probability tidak memiliki physical unit seperti menit atau kilogram.

## 8.5 Formula ini tidak mengatakan apa?

Formula ini **tidak otomatis mengatakan**:

- $B$ menyebabkan $A$;
- $P(A\mid B)=P(B\mid A)$;
- $A$ dan $B$ independent;
- observed conditional proportion dari empat rows otomatis menjadi future probability;
- sebuah model score dalam $[0,1]$ otomatis menjadi $P(A\mid B)$.

---

# 9. Worked Example 1 — Basic Finite Example

Kembali ke fair die:

$$
\Omega=\{1,2,3,4,5,6\}.
$$

Definisikan:

$$
A=\{1,2\}
$$

untuk event “hasil kurang dari atau sama dengan 2”, dan:

$$
B=\{2,4,6\}
$$

untuk event “hasil genap”.

Kita ingin menghitung:

$$
P(A\mid B).
$$

## Step 1 — Find the joint event

$$
A\cap B=\{2\}.
$$

Karena die fair:

$$
P(A\cap B)=\frac{1}{6}.
$$

## Step 2 — Find the condition probability

$B$ memiliki tiga outcomes dari enam:

$$
P(B)=\frac{3}{6}=\frac{1}{2}.
$$

## Step 3 — Divide joint by condition

$$
P(A\mid B)
=
\frac{1/6}{1/2}
=
\frac{1}{3}.
$$

## Step 4 — Interpret

> Setelah kita tahu hasilnya genap, reference set menjadi $\{2,4,6\}$. Dari tiga equally likely outcomes tersebut, hanya outcome 2 yang memenuhi $A$.

Perhatikan bahwa kita **tidak** lagi membagi dengan seluruh enam outcomes pada tahap interpretasi conditional.

---

# 10. Worked Example 2 — HerAI Synthetic Probability Model

## 10.1 Status example

Contoh ini adalah **hypothetical/synthetic probability model** untuk tujuan belajar.

Ini **bukan** observed production data HerAI dan **bukan** probability yang diturunkan dari canonical Alya/Bima/Citra/Dewi.

### Unit

Satu unit adalah **satu learning card yang dipilih oleh hypothetical HerAI randomizer**.

### Events

- $A$: card bertipe **challenge**;
- $B$: card memiliki fitur **reflection**.

Model probability table yang sudah dipakai di Topic 03:

|  | Reflection $B$ | Bukan reflection $B^c$ | Total |
|---|---:|---:|---:|
| Challenge $A$ | 0.18 | 0.12 | 0.30 |
| Bukan challenge $A^c$ | 0.22 | 0.48 | 0.70 |
| **Total** | 0.40 | 0.60 | 1.00 |

Kita ingin menghitung:

$$
P(A\mid B).
$$

## 10.2 Identify numerator

Cell $A$ dan $B$ adalah:

$$
P(A\cap B)=0.18.
$$

## 10.3 Identify denominator

Condition-nya adalah $B$, sehingga denominator adalah column total $B$:

$$
P(B)=0.40.
$$

## 10.4 Calculate

$$
P(A\mid B)
=
\frac{0.18}{0.40}
=
0.45.
$$

## 10.5 Interpret

Dalam **stated synthetic probability model** ini:

> di antara probability mass untuk cards yang memiliki reflection, 45% berada pada cards yang juga challenge.

Kita boleh memberi probability interpretation karena table ini memang secara eksplisit didefinisikan sebagai probability model.

---

# 11. Canonical HerAI Contrast — Filtering Observed Data Bukan Otomatis Future Probability

Sekarang kembali ke canonical observed data:

| Peserta | Quiz ratio $q$ | Completion ratio $c$ | Study duration $t$ |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 menit |
| Bima | 0.60 | 0.625 | 30 menit |
| Citra | 0.90 | 1.00 | 55 menit |
| Dewi | 0.70 | 0.50 | 40 menit |

Definisikan **descriptive labels** pada observed rows:

- $A_{obs}$: row memiliki $q\ge0.80$;
- $B_{obs}$: row memiliki $c\ge0.625$.

Observed count table:

|  | $B_{obs}$ | bukan $B_{obs}$ | Total observed rows |
|---|---:|---:|---:|
| $A_{obs}$ | 2 | 0 | 2 |
| bukan $A_{obs}$ | 1 | 1 | 2 |
| **Total** | 3 | 1 | 4 |

Jika kita **secara descriptive** memfilter hanya observed rows yang memenuhi $B_{obs}$, ada 3 rows:

- Alya;
- Bima;
- Citra.

Dari 3 rows itu, 2 juga memenuhi $A_{obs}$:

- Alya;
- Citra.

Maka observed within-filter proportion adalah:

$$
\frac{2}{3}.
$$

Wording yang aman:

> “Di antara tiga observed participant rows yang memiliki $c\ge0.625$, dua juga memiliki $q\ge0.80$.”

Wording yang **belum didukung** hanya dari empat rows tersebut:

> “Probability future participant memiliki $q\ge0.80$ given $c\ge0.625$ adalah $2/3$.”

Untuk membuat future/model probability claim, kita masih memerlukan probabilistic modeling, sampling, atau estimation setup yang jelas.

**Angka yang sama dapat memiliki semantics berbeda tergantung asal dan definisinya.**

---

# 12. Joint Probability vs Conditional Probability — Numerator Sama, Reference Set Berbeda

Gunakan synthetic probability table HerAI tadi.

Joint probability:

$$
P(A\cap B)=0.18.
$$

Artinya:

> 0.18 dari **seluruh probability mass model** berada pada cards yang challenge sekaligus reflection.

Conditional probability:

$$
P(A\mid B)=0.45.
$$

Artinya:

> setelah reference set dibatasi hanya ke reflection cards, 0.45 dari mass $B$ juga merupakan challenge.

Jadi:

- joint menggunakan original probability space sebagai reference;
- conditional menggunakan condition $B$ sebagai new reference set.

Walaupun numerator melibatkan $A\cap B$, kedua quantities menjawab pertanyaan yang berbeda.

---

# 13. Conditional Reversal — $P(A\mid B)$ Bukan $P(B\mid A)$

Masih dari table yang sama:

$$
P(A\cap B)=0.18.
$$

Kita sudah menghitung:

$$
P(A\mid B)=\frac{0.18}{0.40}=0.45.
$$

Sekarang balik pertanyaannya:

> Jika kita tahu card adalah challenge, berapa probability card tersebut memiliki reflection?

Ini adalah:

$$
P(B\mid A).
$$

Condition sekarang $A$, jadi denominator berubah menjadi:

$$
P(A)=0.30.
$$

Maka:

$$
P(B\mid A)
=
\frac{0.18}{0.30}
=
0.60.
$$

Jadi pada model ini:

$$
P(A\mid B)=0.45
$$

sementara:

$$
P(B\mid A)=0.60.
$$

Keduanya memakai overlap yang sama, tetapi denominator/reference set berbeda.

**Arah condition matters.**

OpenStax juga memberi contoh beginner-level yang secara eksplisit meminta learner membandingkan dua arah conditional dan menunjukkan bahwa keduanya tidak harus sama. [R2]

---

# 14. Change One Thing — Ubah Condition, Ubah Denominator

Mulai dari synthetic HerAI model:

|  | Reflection $B$ | Bukan reflection $B^c$ | Total |
|---|---:|---:|---:|
| Challenge $A$ | 0.18 | 0.12 | 0.30 |
| Bukan challenge $A^c$ | 0.22 | 0.48 | 0.70 |
| **Total** | 0.40 | 0.60 | 1.00 |

Kita tahu:

$$
P(A\mid B)=0.45.
$$

Sekarang ubah **satu hal saja**: condition menjadi “bukan reflection”, yaitu $B^c$.

Pertanyaan baru:

$$
P(A\mid B^c).
$$

Numerator menjadi:

$$
P(A\cap B^c)=0.12.
$$

Denominator menjadi:

$$
P(B^c)=0.60.
$$

Maka:

$$
P(A\mid B^c)
=
\frac{0.12}{0.60}
=
0.20.
$$

Compare:

$$
P(A\mid B)=0.45
$$

versus:

$$
P(A\mid B^c)=0.20.
$$

Perubahan condition mengubah reference set dan dapat mengubah probability yang kita ukur.

Topic 05 nanti akan memakai ide “apakah conditioning mengubah probability?” untuk memperkenalkan independence dan dependence secara formal.

---

# 15. Secondary Identity — Multiplication Rule sebagai Rearrangement

Dari definisi:

$$
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)},
$$

selama $P(B)>0$, kita dapat mengalikan kedua sisi dengan $P(B)$:

$$
P(A\cap B)
=
P(A\mid B)P(B).
$$

MIT menyebut bentuk ini **multiplication rule** dan menjelaskan bahwa ia hanyalah rearrangement dari definisi conditional probability. [R1]

Untuk Topic 04, fungsi identity ini hanya sebagai **bridge**:

- jika conditional probability dan probability condition diketahui, kita bisa mendapatkan joint probability;
- identity ini belum dipakai untuk Bayes;
- jangan menganggap multiplication otomatis berarti events independent.

Contoh dari model HerAI:

$$
P(A\cap B)
=
0.45\times0.40
=
0.18.
$$

Ini konsisten dengan table.

---

# 16. Why This Matters in AI — Banyak Klaim AI Sebenarnya Bersifat Conditional

Banyak output atau pertanyaan AI memiliki struktur seperti:

> “probability target $Y$ given observed features $X$.”

Walaupun notation ML formal baru dibahas lebih lengkap di Topic 08, conditional reasoning sudah penting sekarang karena kita perlu bertanya:

- event apa yang ingin diprediksi?
- informasi apa yang sedang dianggap diketahui?
- siapa/apa reference set-nya?
- denominator apa yang implied oleh “given”?

Misalnya sebuah system note berbunyi:

> “Among cases with condition $B$, event $A$ occurs with probability 0.7.”

Learner yang probability-literate akan bertanya:

1. apa $A$?
2. apa $B$?
3. probability model atau estimation setup apa yang mendukung 0.7?
4. apakah 0.7 benar-benar conditional probability atau hanya score?
5. apakah statement itu hanya association atau ada evidence causal terpisah?

Conditional probability membantu kita **membaca model claims secara semantic**, bukan sekadar menghitung fraction.

---

# 17. Safety Boundary — “Given” Tidak Sama dengan “Caused By”

Misalkan sebuah model menyatakan:

$$
P(A\mid B)=0.70.
$$

Ini mengatakan:

> dalam probability setup yang didefinisikan, probability $A$ setelah conditioning pada $B$ adalah 0.70.

Itu **tidak otomatis mengatakan**:

> “$B$ menyebabkan $A$.”

Conditional probability adalah relationship dalam probability model / data-generating framing. Causal conclusion memerlukan assumptions dan evidence tambahan yang belum menjadi scope topic ini.

Jadi hindari wording seperti:

> “Karena $P(A\mid B)$ tinggi, berarti $B$ menyebabkan $A$.”

Wording yang lebih aman:

> “Dalam stated model, $A$ lebih/kurang common under condition $B$; causal interpretation belum ditetapkan.”

Kita juga belum membandingkan independence secara formal di Topic 04. Itu akan menjadi inti Topic 05.

---

# 18. Misconception Challenge

## Misconception 1 — “Denominator Selalu Seluruh Sample Space”

Salah.

Untuk $P(A\mid B)$, denominator adalah probability dari condition:

$$
P(B),
$$

bukan otomatis $P(\Omega)$.

---

## Misconception 2 — “Joint = Conditional”

Salah.

$$
P(A\cap B)
$$

mengukur overlap terhadap original model.

Sementara:

$$
P(A\mid B)
$$

mengukur bagian dari $B$ yang juga $A$.

---

## Misconception 3 — “$P(A\mid B)=P(B\mid A)$”

Tidak secara umum.

Numerator overlap dapat sama, tetapi denominator/reference set berbeda.

---

## Misconception 4 — “Kalau Nilai Conditional Besar, Condition Menyebabkan Event”

Tidak otomatis.

Conditional probability sendiri bukan causal proof.

---

## Misconception 5 — “Observed Conditional Proportion = Universal Future Probability”

Tidak otomatis.

Observed filtering adalah descriptive result. Future probability claim memerlukan setup probabilistik/estimasi yang sesuai.

---

## Misconception 6 — “Kalau $P(B)=0$, Tinggal Pakai Formula Saja”

Tidak pada level ini.

Formula conditional probability yang kita gunakan memerlukan:

$$
P(B)>0.
$$

---

# 19. Try It Yourself

Gunakan synthetic probability table berikut:

|  | Signal $B$ | Bukan signal $B^c$ | Total |
|---|---:|---:|---:|
| Action $A$ | 0.12 | 0.18 | 0.30 |
| Bukan action $A^c$ | 0.28 | 0.42 | 0.70 |
| **Total** | 0.40 | 0.60 | 1.00 |

Tanpa melihat jawaban:

1. tentukan $P(A\cap B)$;
2. tentukan $P(B)$;
3. hitung $P(A\mid B)$;
4. hitung $P(B\mid A)$;
5. jelaskan mengapa kedua conditional probabilities tidak harus sama;
6. tulis satu sentence yang benar tentang $P(A\mid B)$ tanpa causal overclaim;
7. jelaskan mengapa table harus dilabel sebagai **synthetic probability model** sebelum angka-angkanya diberi probability interpretation.

### Quick check

Kamu seharusnya mendapatkan:

$$
P(A\mid B)=\frac{0.12}{0.40}=0.30,
$$

serta:

$$
P(B\mid A)=\frac{0.12}{0.30}=0.40.
$$

---

# 20. [INTERACTIVE VISUAL] Filter the Universe

## Purpose

Membuat learner **melihat denominator/reference set berubah** sebelum formula dihitung.

## Initial state / data

Gunakan synthetic HerAI probability table:

|  | Reflection $B$ | $B^c$ | Total |
|---|---:|---:|---:|
| Challenge $A$ | 0.18 | 0.12 | 0.30 |
| $A^c$ | 0.22 | 0.48 | 0.70 |
| **Total** | 0.40 | 0.60 | 1.00 |

Initial view memperlihatkan seluruh table dengan total 1.00.

## Learner action

Learner dapat memilih:

- `No condition`;
- `Given B`;
- `Given A`;
- `Given B^c`.

## Expected behavior

Jika learner memilih `Given B`:

- column $B^c$ memudar;
- column $B$ tetap aktif;
- denominator badge berubah menjadi $P(B)=0.40$;
- overlap $A\cap B=0.18$ di-highlight;
- equation reveal menunjukkan:

$$
P(A\mid B)=\frac{0.18}{0.40}=0.45.
$$

Jika learner memilih `Given A`, row $A^c$ memudar dan denominator berubah menjadi $P(A)=0.30$.

## Feedback

Jika learner memilih whole-space total 1.00 sebagai denominator untuk a conditional question, UI memberi feedback:

> “Condition sudah membatasi reference set. Gunakan total probability dari condition yang dipilih.”

Jika learner menukar arah:

> “Periksa siapa event of interest dan siapa condition setelah kata given.”

## Safety / interpretation note

- table harus selalu berbadge **Synthetic Probability Model**;
- visual tidak boleh memberi kesan bahwa values berasal dari canonical participant observations;
- `Given` tidak diberi arrow causal;
- UI tidak menyebut hasil sebagai “confidence”;
- browser implementation harus menjaga notation $P(A\mid B)$ dan $P(B\mid A)$ visually distinct.

---

# 21. Checkpoint — Bisa Temukan Denominator Tanpa Menghitung?

Untuk setiap statement, tentukan **condition** dan **denominator** saja.

### A

“Probability card challenge given card has reflection.”

Condition:

$$
B=\text{reflection}.
$$

Denominator:

$$
P(B).
$$

### B

“Probability card has reflection given card is challenge.”

Condition:

$$
A=\text{challenge}.
$$

Denominator:

$$
P(A).
$$

### C

“Probability $A$ and $B$.”

Ini **bukan** conditional question. Ini joint probability:

$$
P(A\cap B).
$$

Jika kamu bisa memisahkan tiga bentuk ini tanpa menghitung, semantic foundation-mu sudah kuat.

---

# 22. Mastery Check — I Can...

Sebelum lanjut, cek apakah kamu sudah bisa mengatakan:

- [ ] **I can** explain conditioning sebagai perubahan reference set.
- [ ] **I can** read $P(A\mid B)$ dengan arah yang benar.
- [ ] **I can** identify $A$, $B$, $A\cap B$, dan denominator dari table.
- [ ] **I can** calculate $P(A\mid B)$ ketika $P(B)>0$.
- [ ] **I can** explain mengapa $P(B)$ menjadi denominator.
- [ ] **I can** distinguish joint probability dari conditional probability.
- [ ] **I can** distinguish $P(A\mid B)$ dari $P(B\mid A)$.
- [ ] **I can** reject causal claims yang hanya berdasar conditional probability.
- [ ] **I can** distinguish observed within-filter proportion dari modeled probability.
- [ ] **I can** explain mengapa arbitrary score dalam $[0,1]$ bukan otomatis conditional probability.

---

# 23. Scope Boundary — Apa yang Sengaja Belum Dipelajari?

Topic 04 berhenti setelah conditional probability stabil.

## Dipelajari sekarang

- conditioning sebagai reference-set change;
- $P(A\mid B)$;
- denominator = probability of the condition;
- $P(B)>0$;
- joint-vs-conditional;
- direction reversal;
- simple table/formula calculation;
- multiplication identity sebagai rearrangement;
- observed-filter vs modeled-probability safety;
- conditional does not imply causation.

## Belum dipelajari

- formal independence/dependence criteria;
- mutually exclusive vs independence proof;
- Bayes theorem;
- law of total probability sebagai core computation;
- probability trees sebagai required technique;
- conditional independence;
- random variables dan expected value;
- calibration;
- logits/sigmoid/softmax;
- cross-entropy;
- causal inference.

Sumber MIT yang dipakai memang membahas independence, Bayes, dan law of total probability setelah conditional probability, tetapi Topic 04 sengaja hanya mengambil bagian yang sesuai approved HerAI sequence. [R1]

---

# 24. Summary

Conditional probability menjawab pertanyaan probability setelah sebuah condition diketahui.

Core notation:

$$
P(A\mid B).
$$

Core definition:

$$
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)},
\qquad P(B)>0.
$$

Mental model terpenting:

> **Filter to $B$ → lalu ukur bagian $B$ yang juga berada di $A$.**

Ingat:

- denominator mengikuti condition;
- joint bukan conditional;
- arah condition matters;
- $P(A\mid B)$ tidak secara umum sama dengan $P(B\mid A)$;
- conditional probability tidak otomatis berarti causation;
- observed filtered proportion tidak otomatis menjadi universal future probability;
- canonical $q$, $c$, dan score $h$ tetap bukan probability hanya karena nilainya berada di $[0,1]$.

---

# 25. Bridge to Topic 05 — Independence dan Dependence

Sekarang kita sudah bisa membandingkan dua pertanyaan:

$$
P(A)
$$

versus:

$$
P(A\mid B).
$$

Pertanyaan berikutnya sangat penting:

> **Bagaimana jika mengetahui $B$ ternyata tidak mengubah probability $A$?**

Atau sebaliknya:

> **Bagaimana jika mengetahui $B$ mengubah probability $A$?**

Itulah pintu masuk ke:

# Topic 05 — Independence dan Dependence

**STOP — Topic 05 belum diproduksi pada package ini.**
