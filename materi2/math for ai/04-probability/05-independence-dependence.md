# Topic 05 — Independence dan Dependence

> **Submodule 04 — Probability: Menalar Ketidakpastian dalam AI**  
> **Filename:** `05-independence-dependence.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Prasyarat:** Topic 01–04 selesai; peserta dapat menjelaskan sample space $\Omega$, event $A,B$, probability $P(A)$, intersection $A\cap B$, joint probability $P(A\cap B)$, dan conditional probability $P(A\mid B)$  
> **Forward dependency:** Topic 06 — Bayes sebagai Update Keyakinan  
> **Boundary:** Topic ini membahas independence/dependence untuk dua event, dua cara mengeceknya, dan perbedaannya dari mutually exclusive. Topic ini **belum** membahas Bayes, conditional independence untuk banyak variabel, graphical models, Naive Bayes, random variable, expected value, calibration, logits, atau probabilistic loss.

---

# 1. Hook — “Ada Informasi Baru, Apakah Probability Berubah?”

Bayangkan sebuah **synthetic HerAI probability model** untuk satu learning card yang akan dipilih oleh sebuah hypothetical learning-card randomizer.

Definisikan:

- $A$: card memiliki fitur **reflection**;
- $B$: card bertipe **challenge**.

Misalkan model menyatakan:

$$
P(A)=0.40.
$$

Sebelum tahu jenis card, probability reflection adalah 0.40.

Sekarang kita diberi informasi bahwa card yang terpilih adalah challenge. Pertanyaan utamanya:

> Apakah probability reflection berubah setelah kita tahu $B$ terjadi?

Ada dua kemungkinan penting.

### Kemungkinan 1 — tidak berubah

Jika:

$$
P(A\mid B)=0.40,
$$

maka mengetahui bahwa card adalah challenge **tidak mengubah** probability event $A$.

### Kemungkinan 2 — berubah

Jika:

$$
P(A\mid B)=0.60,
$$

maka mengetahui bahwa card adalah challenge **mengubah** probability event $A$.

Perbedaan inilah yang membawa kita ke dua konsep:

- **independence**;
- **dependence**.

MIT 18.05 merumuskan intuition ini secara langsung: dua events independent jika knowledge bahwa satu event terjadi tidak mengubah probability event yang lain. [R1]

---

# 2. Tujuan Topic 05

Setelah menyelesaikan topic ini, kamu diharapkan mampu mengatakan:

- **I can explain** independence sebagai kondisi ketika mengetahui satu event tidak mengubah probability event lain dalam stated probability model.
- **I can compare** $P(A\mid B)$ dengan $P(A)$ untuk mengecek independence ketika $P(B)>0$.
- **I can use** product criterion $P(A\cap B)=P(A)P(B)$ untuk mengecek independence.
- **I can identify** dependence ketika independence criterion tidak terpenuhi.
- **I can distinguish** independence dari mutually exclusive.
- **I can explain** mengapa independent events masih dapat terjadi bersama.
- **I can explain** mengapa mutually exclusive events dengan positive probabilities umumnya tidak independent.
- **I can avoid** mengubah statistical association/correlation dari observed data menjadi formal probability-independence claim tanpa probability model yang sesuai.
- **I can audit** sebuah AI/probability assumption tanpa menganggap “independent” berarti “tidak ada hubungan apa pun di dunia nyata.”

---

# 3. Recall — Conditional Probability sebagai Landasan

Pada Topic 04, kita belajar:

$$
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)},
\qquad P(B)>0.
$$

Interpretasinya:

> setelah diketahui $B$ terjadi, reference set berubah menjadi $B$.

Sekarang kita menggunakan pertanyaan conditional itu untuk hal baru:

> Apakah informasi $B$ mengubah probability $A$?

Bandingkan dua nilai:

$$
P(A\mid B)
$$

dan:

$$
P(A).
$$

Jika nilainya sama, informasi $B$ tidak mengubah probability $A$.

Ini adalah intuition paling penting sebelum masuk ke formula product criterion.

---

# 4. Predict — Dua Model dengan Marginal yang Sama

Perhatikan dua **synthetic probability models** berikut.

Keduanya memakai:

- $A$: reflection;
- $B$: challenge.

Keduanya juga mempunyai:

$$
P(A)=0.40
$$

dan:

$$
P(B)=0.50.
$$

Tetapi joint probability-nya berbeda.

## Model I

$$
P(A\cap B)=0.20.
$$

## Model II

$$
P(A\cap B)=0.30.
$$

Sebelum menghitung, prediksi:

1. Pada model mana mengetahui $B$ kemungkinan **tidak mengubah** $P(A)$?
2. Pada model mana mengetahui $B$ kemungkinan **mengubah** $P(A)$?
3. Apakah cukup melihat bahwa $A$ dan $B$ dapat terjadi bersama untuk menyimpulkan independence?
4. Apakah cukup melihat bahwa dua events tidak overlap untuk menyimpulkan independence?

Tahan prediksimu. Kita akan cek secara formal.

---

# 5. Intuisi — Independence Berarti “Informasi Ini Tidak Mengubah Probability Itu”

Untuk Model I:

$$
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)}
=
\frac{0.20}{0.50}
=
0.40.
$$

Karena:

$$
P(A\mid B)=P(A)=0.40,
$$

mengetahui $B$ tidak mengubah probability $A$.

Kita menyebut $A$ dan $B$ **independent** dalam model tersebut.

Untuk Model II:

$$
P(A\mid B)
=
\frac{0.30}{0.50}
=
0.60.
$$

Tetapi:

$$
P(A)=0.40.
$$

Karena:

$$
P(A\mid B)\ne P(A),
$$

mengetahui $B$ mengubah probability $A$.

Kita menyebut $A$ dan $B$ **dependent** dalam model tersebut.

## Hal yang harus sangat jelas

Kata **independent** di sini adalah istilah matematis.

Ia **tidak** berarti:

- kedua event “tidak berhubungan dalam segala arti”;
- tidak ada common cause;
- tidak ada hubungan domain;
- satu event mustahil terjadi bersama event lain.

Independence adalah pernyataan spesifik tentang probability dalam model yang sedang didefinisikan.

---

# 6. Formal Definition — Independence melalui Conditional Probability

Jika $P(B)>0$, maka satu cara membaca independence adalah:

$$
P(A\mid B)=P(A).
$$

Dibaca:

> probability $A$ setelah diketahui $B$ sama dengan probability $A$ sebelum condition $B$ diberikan.

Dengan kata lain:

> informasi bahwa $B$ terjadi tidak mengubah probability $A$.

MIT juga menunjukkan bahwa, jika probabilities yang relevan positif, arah sebaliknya konsisten:

$$
P(B\mid A)=P(B).
$$

Namun untuk beginner core, kita tidak perlu mengecek **dua arah sekaligus** setiap kali. Satu criterion yang valid dan data yang cukup sudah dapat dipakai.

---

# 7. Product Criterion — Bentuk yang Simetris

Dari conditional probability:

$$
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)},
$$

jika $A$ dan $B$ independent dan $P(B)>0$, maka:

$$
P(A\mid B)=P(A).
$$

Sehingga:

$$
\frac{P(A\cap B)}{P(B)}
=
P(A).
$$

Kalikan kedua sisi dengan $P(B)$:

$$
P(A\cap B)
=
P(A)P(B).
$$

Ini adalah **product criterion** untuk independence:

$$
\boxed{
P(A\cap B)=P(A)P(B)
}
$$

MIT menggunakan equality ini sebagai formal definition yang simetris untuk independence dua events. [R1]

OpenStax juga menyajikan tiga checks yang ekuivalen dalam situasi yang sesuai:

- $P(A\mid B)=P(A)$;
- $P(B\mid A)=P(B)$;
- $P(A\cap B)=P(A)P(B)$. [R2]

---

# 8. Math Reading Skill — Baca Formula, Jangan Hanya Substitusi

Perhatikan:

$$
P(A\cap B)=P(A)P(B).
$$

## Symbol

- $A$ = event pertama;
- $B$ = event kedua;
- $A\cap B$ = event ketika $A$ **dan** $B$ terjadi;
- $P(A)$ = probability event $A$;
- $P(B)$ = probability event $B$;
- $P(A\cap B)$ = joint probability keduanya.

## Input

Kita membutuhkan probability marginal $A$, probability marginal $B$, dan joint probability mereka, atau informasi equivalent untuk menghitungnya.

## Operation

Kita membandingkan:

$$
P(A\cap B)
$$

dengan:

$$
P(A)P(B).
$$

## Result

- jika sama → consistent dengan independence;
- jika tidak sama → events dependent dalam stated model.

## Range

Semua probability tetap berada di:

$$
0\le P(\cdot)\le1.
$$

## Unit

Probability tidak mempunyai physical unit seperti menit atau kilogram.

## Assumption / condition

Criterion ini membahas **dua event dalam probability model yang sama**.

## Formula ini tidak berarti

- multiplication otomatis boleh dipakai untuk semua joint probabilities;
- dua event independent pasti “tidak berkaitan secara nyata”;
- independent events tidak bisa terjadi bersama;
- correlation dari observed dataset otomatis menjadi independence/dependence probability statement.

---

# 9. Worked Example 1 — Basic: Dua Lemparan Koin

Sebuah fair coin dilempar dua kali.

Definisikan:

- $A$: lemparan pertama menghasilkan heads;
- $B$: lemparan kedua menghasilkan heads.

Sample space:

$$
\Omega=\{HH,HT,TH,TT\}.
$$

Karena outcomes equally likely:

$$
P(A)=\frac{2}{4}=\frac{1}{2},
$$

$$
P(B)=\frac{2}{4}=\frac{1}{2}.
$$

Joint event:

$$
A\cap B=\{HH\},
$$

sehingga:

$$
P(A\cap B)=\frac{1}{4}.
$$

Sekarang product:

$$
P(A)P(B)
=
\frac{1}{2}\cdot\frac{1}{2}
=
\frac{1}{4}.
$$

Karena:

$$
P(A\cap B)=P(A)P(B),
$$

maka $A$ dan $B$ independent.

Kita juga bisa membaca lewat conditional:

$$
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)}
=
\frac{1/4}{1/2}
=
\frac{1}{2}
=
P(A).
$$

Informasi bahwa lemparan kedua heads tidak mengubah probability lemparan pertama heads di model fair independent tosses ini.

---

# 10. Worked Example 2 — Synthetic HerAI Probability Model

> **Label:** synthetic/hypothetical instructional probability model.  
> **Unit:** satu learning card dari hypothetical HerAI card randomizer.  
> **Bukan:** data aktual peserta, empirical evidence, atau production model.

Definisikan:

- $A$: card memiliki reflection;
- $B$: card bertipe challenge.

Gunakan probability table berikut:

|  | Challenge $B$ | $B^c$ | Total |
|---|---:|---:|---:|
| Reflection $A$ | 0.20 | 0.20 | 0.40 |
| $A^c$ | 0.30 | 0.30 | 0.60 |
| **Total** | 0.50 | 0.50 | 1.00 |

Dari table:

$$
P(A)=0.40,
$$

$$
P(B)=0.50,
$$

$$
P(A\cap B)=0.20.
$$

Product criterion:

$$
P(A)P(B)
=
0.40\times0.50
=
0.20.
$$

Karena:

$$
P(A\cap B)=P(A)P(B),
$$

maka $A$ dan $B$ independent **dalam synthetic model ini**.

Conditional check memberi:

$$
P(A\mid B)
=
\frac{0.20}{0.50}
=
0.40
=
P(A).
$$

Interpretasi:

> mengetahui bahwa card adalah challenge tidak mengubah modeled probability bahwa card memiliki reflection.

Perhatikan wording **“dalam model ini.”**

Kita tidak sedang menyimpulkan sesuatu tentang semua HerAI learning cards di dunia nyata.

---

# 11. Change One Thing — Joint Probability Saja yang Berubah

Sekarang pertahankan:

$$
P(A)=0.40
$$

dan:

$$
P(B)=0.50,
$$

tetapi ubah joint probability menjadi:

$$
P(A\cap B)=0.30.
$$

Table menjadi:

|  | Challenge $B$ | $B^c$ | Total |
|---|---:|---:|---:|
| Reflection $A$ | 0.30 | 0.10 | 0.40 |
| $A^c$ | 0.20 | 0.40 | 0.60 |
| **Total** | 0.50 | 0.50 | 1.00 |

Product dari marginals masih:

$$
P(A)P(B)=0.40\times0.50=0.20.
$$

Tetapi joint sekarang:

$$
P(A\cap B)=0.30.
$$

Karena:

$$
0.30\ne0.20,
$$

events tidak independent.

Conditional probability juga berubah:

$$
P(A\mid B)
=
\frac{0.30}{0.50}
=
0.60.
$$

Bandingkan:

$$
P(A)=0.40.
$$

Informasi $B$ sekarang mengubah probability $A$ dari 0.40 menjadi 0.60.

Itulah **dependence** dalam stated model.

---

# 12. Dependence — Apa Artinya?

Dua events disebut **dependent** jika independence criterion tidak terpenuhi.

Pada level Topic 05, tanda yang paling mudah dibaca:

$$
P(A\mid B)\ne P(A)
$$

ketika conditional expression itu terdefinisi.

Atau:

$$
P(A\cap B)\ne P(A)P(B).
$$

## Dependence tidak otomatis berarti causation

Jika $A$ dan $B$ dependent, kita hanya tahu bahwa probability relationship-nya tidak memenuhi independence criterion.

Kita **belum** boleh berkata:

> “$B$ menyebabkan $A$.”

Dependence adalah probabilistic relationship. Causal claim membutuhkan desain, asumsi, dan evidence yang memang mendukung causal reasoning.

---

# 13. Independence vs Mutually Exclusive — Jangan Ditukar

Ini salah satu miskonsepsi paling umum.

## Mutually exclusive

Events $A$ dan $B$ mutually exclusive jika mereka **tidak dapat terjadi bersama**.

Artinya:

$$
P(A\cap B)=0.
$$

## Independent

Events $A$ dan $B$ independent jika:

$$
P(A\cap B)=P(A)P(B).
$$

Dua konsep ini menjawab pertanyaan berbeda:

- **mutually exclusive:** bisakah keduanya terjadi bersama?
- **independent:** apakah knowledge tentang satu event mengubah probability event lain?

OpenStax secara eksplisit memisahkan kedua konsep ini dan mendefinisikan mutually exclusive sebagai events tanpa shared outcomes. [R2]

---

# 14. Kenapa Mutually Exclusive Positive-Probability Events Biasanya Tidak Independent?

Ambil fair die.

Definisikan:

- $A$: hasil ganjil $\{1,3,5\}$;
- $B$: hasil genap $\{2,4,6\}$.

Mereka mutually exclusive:

$$
P(A\cap B)=0.
$$

Tetapi:

$$
P(A)=\frac{1}{2},
$$

$$
P(B)=\frac{1}{2}.
$$

Jika independent, product criterion membutuhkan:

$$
P(A\cap B)
=
P(A)P(B)
=
\frac{1}{4}.
$$

Namun actual joint:

$$
0\ne\frac{1}{4}.
$$

Jadi mereka **tidak independent**.

Intuition-nya bahkan lebih jelas:

> jika kamu tahu outcome ganjil terjadi, probability outcome genap menjadi 0.

Informasi tentang satu event sangat mengubah probability event lainnya.

## Edge-case note

Pernyataan aman untuk beginner adalah:

> mutually exclusive events dengan **positive probabilities** tidak independent.

Jika salah satu event memiliki probability 0, ada edge case matematis yang tidak perlu kita dalami di topic ini.

---

# 15. Persistent HerAI Continuity — Observed Data Bukan Independence Test Otomatis

Canonical HerAI data tetap:

| Peserta | Quiz ratio $q$ | Completion ratio $c$ | Study duration $t$ |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 menit |
| Bima | 0.60 | 0.625 | 30 menit |
| Citra | 0.90 | 1.00 | 55 menit |
| Dewi | 0.70 | 0.50 | 40 menit |

Dan instructional score lama tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Nilainya:

- Alya: 0.78;
- Bima: 0.61;
- Citra: 0.94;
- Dewi: 0.62.

## Apa yang boleh kita katakan?

Kita boleh membahas:

- observed patterns;
- descriptive association;
- correlation dari Submodule 03 jika memang dihitung dan didefinisikan.

## Apa yang tidak boleh langsung kita katakan?

Kita tidak boleh mengambil empat rows ini lalu menyimpulkan:

> “Quiz performance dan completion independent.”

atau:

> “Quiz performance dan completion dependent secara probabilistik.”

tanpa mendefinisikan:

- probability experiment/model;
- event-event yang diuji;
- unit dan horizon;
- dari mana probability assignments berasal.

Demikian juga:

$$
q=0.80
$$

tetap quiz ratio, bukan probability.

Dan:

$$
h=0.94
$$

tetap instructional score, bukan probability.

**Statistics association language dan probability independence language bukan objek yang sama.**

---

# 16. Why This Matters in AI

Independence muncul di banyak model probabilistik dan simplification assumptions.

Namun untuk course ini, pesan pentingnya bukan menghafal nama algoritma.

Pesan pentingnya:

> sebuah AI/probability system dapat membuat assumption bahwa events atau quantities tertentu independent dalam model; assumption itu adalah claim matematis yang harus dipahami dan diperiksa.

Contoh reasoning yang aman:

> “Dalam stated probability model, kita mengasumsikan event $A$ dan $B$ independent, sehingga joint probability dapat difactor sebagai $P(A)P(B)$.”

Contoh wording yang terlalu jauh:

> “Karena independent, $A$ dan $B$ tidak punya hubungan apa pun.”

Itu terlalu luas.

Model-level independence bukan pernyataan otomatis tentang:

- causality;
- semantic relatedness;
- correlation dalam setiap representation;
- seluruh dunia di luar model.

---

# 17. Misconception Challenge

## Miskonsepsi 1 — “Independent berarti tidak bisa terjadi bersama”

Salah.

Independent events dapat terjadi bersama.

Contoh dua fair coin tosses:

- first toss heads;
- second toss heads.

Keduanya dapat terjadi bersama sebagai outcome $HH$ dan tetap independent.

---

## Miskonsepsi 2 — “Mutually exclusive berarti independent”

Salah untuk positive-probability events.

Jika $A$ terjadi membuat $B$ mustahil, maka informasi $A$ sangat mengubah probability $B$.

---

## Miskonsepsi 3 — “Kalau $P(A\cap B)=P(A)P(B)$ pada model, berarti tidak ada hubungan nyata”

Terlalu kuat.

Equality tersebut menetapkan independence dalam stated probability model. Ia tidak membuktikan absence of every possible real-world relationship.

---

## Miskonsepsi 4 — “Correlation = dependence probability”

Salah.

Correlation dari Statistics dan event independence dari Probability adalah konsep berbeda.

Correlation tidak otomatis menjadi statement seperti:

$$
P(A\cap B)=P(A)P(B).
$$

---

## Miskonsepsi 5 — “Joint probability selalu boleh dihitung dengan multiplication $P(A)P(B)$”

Salah.

Itu hanya valid ketika independence sudah diketahui/ditetapkan.

Secara umum, multiplication identity dari Topic 04 adalah:

$$
P(A\cap B)=P(A\mid B)P(B).
$$

Mengganti $P(A\mid B)$ dengan $P(A)$ memerlukan independence.

---

# 18. Try It Yourself

## Try 1

Dalam probability model:

$$
P(A)=0.30,
$$

$$
P(B)=0.40,
$$

$$
P(A\cap B)=0.12.
$$

Apakah $A$ dan $B$ independent?

**Jangan langsung jawab.** Bandingkan joint dengan product.

---

## Try 2

Dalam model lain:

$$
P(A)=0.30,
$$

$$
P(B)=0.40,
$$

$$
P(A\cap B)=0.18.
$$

Apakah independence masih berlaku?

Apa yang berubah?

---

## Try 3

Dua events mempunyai positive probabilities dan mutually exclusive.

Apa nilai:

$$
P(A\cap B)?
$$

Apa yang kamu harapkan dari:

$$
P(A)P(B)?
$$

Mengapa keduanya tidak cocok?

---

## Try 4

Seseorang berkata:

> “Completion ratio Alya 0.75 dan quiz ratio 0.80, jadi keduanya independent karena keduanya dekat.”

Apa yang salah dengan reasoning ini?

---

# 19. Visual / Interactive Specification

## [COMPARE VIEW] Independent vs Dependent vs Mutually Exclusive

**Purpose:** membantu learner melihat tiga struktur yang sering tertukar: independent, dependent, dan mutually exclusive.

**Initial state / data:**

### Panel 1 — Independent synthetic model

$$
P(A)=0.40,\qquad
P(B)=0.50,\qquad
P(A\cap B)=0.20.
$$

### Panel 2 — Dependent synthetic model

$$
P(A)=0.40,\qquad
P(B)=0.50,\qquad
P(A\cap B)=0.30.
$$

### Panel 3 — Mutually exclusive positive-probability model

$$
P(A)=0.50,\qquad
P(B)=0.50,\qquad
P(A\cap B)=0.
$$

**Learner action:**

- toggle `Show marginal`;
- toggle `Show conditional`;
- toggle `Show product test`;
- compare all three panels;
- optionally click `What changed?`.

**Expected behavior:**

Panel 1 reveals:

$$
P(A\mid B)=0.40=P(A)
$$

and:

$$
P(A)P(B)=0.20=P(A\cap B).
$$

Panel 2 reveals:

$$
P(A\mid B)=0.60\ne0.40
$$

and:

$$
0.30\ne0.20.
$$

Panel 3 reveals no overlap:

$$
P(A\cap B)=0,
$$

but product:

$$
P(A)P(B)=0.25.
$$

**Feedback:**

- Panel 1: `Independent — conditioning does not change P(A).`
- Panel 2: `Dependent — conditioning changes P(A).`
- Panel 3: `Mutually exclusive, but not independent because both marginals are positive.`

**Safety / interpretation note:**

- all panels are stipulated synthetic probability models;
- independence is model-relative;
- “dependent” does not mean causal;
- “independent” does not mean semantically unrelated in every sense;
- mutually exclusive and independent must not be treated as synonyms.

---

# 20. Checkpoint

Coba jawab tanpa melihat bagian sebelumnya.

1. Apa intuitive meaning independence?
2. Jika $P(B)>0$, equality apa yang dapat dibandingkan untuk mengecek independence?
3. Apa product criterion?
4. Jika product criterion gagal, apa istilahnya?
5. Apakah independent events dapat terjadi bersama?
6. Apa arti mutually exclusive?
7. Mengapa mutually exclusive events dengan positive probabilities biasanya tidak independent?
8. Apakah correlation dari observed data otomatis membuktikan event dependence?
9. Apakah $h=0.94$ otomatis probability?
10. Mengapa kata “dalam stated model” penting?

Jika 7–10 jawabanmu sudah tepat, kamu siap masuk ke latihan formatif.

---

# 21. Mastery Check — “I Can”

Sebelum melanjutkan, cek apakah kamu benar-benar bisa mengatakan:

- [ ] **I can** menjelaskan independence tanpa memakai kalimat “tidak berhubungan sama sekali.”
- [ ] **I can** membandingkan $P(A\mid B)$ dengan $P(A)$.
- [ ] **I can** mengecek $P(A\cap B)=P(A)P(B)$.
- [ ] **I can** menjelaskan dependence sebagai failure of independence criterion.
- [ ] **I can** membedakan independence dari mutually exclusive.
- [ ] **I can** menunjukkan contoh independent events yang dapat terjadi bersama.
- [ ] **I can** menjelaskan positive-probability mutually exclusive events sebagai non-independent.
- [ ] **I can** menghindari causal overclaim.
- [ ] **I can** membedakan observed association dari formal independence claim.
- [ ] **I can** menjelaskan mengapa canonical HerAI ratios/scores bukan probability.

---

# 22. Scope Boundary — Apa yang Sengaja Belum Dibahas?

Topic 05 **tidak** memperluas core ke:

- independence untuk 3+ events;
- pairwise vs mutual independence;
- conditional independence notation;
- graphical models;
- Naive Bayes derivation;
- law of total probability sebagai core technique;
- Bayes update;
- prior, likelihood, posterior;
- random variable;
- expected value;
- continuous distributions;
- calibration;
- logits;
- cross-entropy;
- gradient, backprop, atau optimization.

Kita hanya membutuhkan satu literacy layer yang kuat:

> ketika independence dipakai, learner tahu apa equality yang dimaksud, apa yang tidak dimaksud, dan kapan assumption tersebut tidak boleh diciptakan begitu saja.

---

# 23. Summary

Pada Topic 05 kita belajar bahwa:

1. independence berarti knowledge tentang satu event tidak mengubah probability event lain dalam stated model;
2. ketika $P(B)>0$, independence dapat dibaca melalui:

$$
P(A\mid B)=P(A);
$$

3. product criterion adalah:

$$
P(A\cap B)=P(A)P(B);
$$

4. jika independence criterion tidak terpenuhi, events dependent;
5. dependence bukan causation;
6. independent events masih dapat co-occur;
7. mutually exclusive berarti tidak dapat co-occur;
8. mutually exclusive positive-probability events umumnya tidak independent;
9. observed correlation/association bukan otomatis formal event independence/dependence;
10. canonical HerAI ratios dan old instructional scores tetap bukan probabilities.

---

# 24. Bridge to Topic 06 — Bayes sebagai Update Keyakinan

Kita sekarang sudah tahu:

- bagaimana probability berubah ketika diberi condition;
- bagaimana mengecek apakah condition **tidak mengubah** probability;
- kapan multiplication sederhana $P(A)P(B)$ sah untuk independent events.

Topic berikutnya akan menghadapi pertanyaan berbeda:

> Jika kita benar-benar memperoleh evidence baru, bagaimana probability sebuah hypothesis/event diperbarui secara terstruktur tanpa mengabaikan base rate?

Itulah pintu masuk ke **Topic 06 — Bayes sebagai Update Keyakinan**.

Satu warning penting untuk dibawa ke Topic 06:

> jangan pernah menciptakan assumption independence hanya karena itu membuat perhitungan lebih mudah.

---

# References Used in This Lesson

Markers `[R1]` dan `[R2]` mengacu ke verified source ledger:

- `referensi-topic-05.md`
