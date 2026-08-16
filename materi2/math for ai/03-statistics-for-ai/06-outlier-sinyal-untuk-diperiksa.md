# Topic 06 — Outlier: Sinyal untuk Diperiksa

> **Submodule 03 — Statistics for AI: Membaca Pola dan Variasi Data**  
> **Filename:** `06-outlier-sinyal-untuk-diperiksa.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar akademik/teknis campuran, termasuk non-IT  
> **Prerequisite:** Topic 01–05 Submodule 03  
> **Forward dependency:** Topic 07 — Covariance, Correlation, dan Association  
> **Boundary:** Topic ini membahas **potential outlier flag**, IQR-fence sebagai satu descriptive diagnostic, context/provenance inspection, rare-but-valid observations, kemungkinan data-entry/measurement issue, dan inspect-before-action workflow. Formal outlier hypothesis tests, Grubbs test, modified z-score sebagai core, robust-statistics theory, anomaly-detection algorithms, Probability, dan inference tetap ditunda.

---

# 1. Mengapa Topik Ini Ada?

Pada Topic 05 kita sudah memiliki:

$$
Q_1,\qquad Q_2,\qquad Q_3
$$

dan:

$$
\operatorname{IQR}=Q_3-Q_1.
$$

Sekarang muncul pertanyaan:

> **Bagaimana jika satu observation terlihat jauh dari bagian utama data?**

Refleks yang berbahaya adalah langsung berkata:

> “Itu outlier. Hapus saja.”

Statistik tidak bekerja seceroboh itu.

NIST menjelaskan bahwa observation yang tampak menyimpang jauh dapat:

- merupakan erroneous data;
- muncul karena ordinary/random variation;
- atau justru menjadi sesuatu yang scientifically/operationally interesting.

NIST juga secara eksplisit mengatakan kita biasanya **tidak ingin sekadar menghapus** observation yang outlying ketika belum terbukti erroneous. [R2]

OpenStax menggunakan istilah **potential outlier** untuk point yang berada melewati IQR fence dan mengatakan potential outliers memerlukan further investigation. [R1]

Guardrail utama Topic ini:

> **Outlier flag adalah sinyal untuk diperiksa, bukan vonis bahwa data salah.**

---

# 2. Tujuan Pembelajaran

Setelah Topic 06, kamu diharapkan mampu:

1. menjelaskan perbedaan **unusual observation**, **potential outlier flag**, dan **verified error**;
2. menjelaskan mengapa “outlier = error” adalah salah;
3. menjelaskan mengapa “outlier = auto-delete” adalah salah;
4. menghitung lower dan upper IQR fence;
5. menggunakan IQR fence sebagai **descriptive flagging rule**, bukan universal truth;
6. mengidentifikasi observations yang berada di luar fence;
7. menjelaskan bahwa canonical HerAI quiz ratio tidak mempunyai IQR-fence flag;
8. menjelaskan bahwa “tidak ada flagged outlier” tidak sama dengan “data pasti clean”;
9. melakukan inspect-before-action workflow;
10. membedakan data-entry issue, unit mismatch, measurement issue, dan rare-but-valid case;
11. menjelaskan pengaruh nilai ekstrem terhadap mean/spread;
12. membandingkan mean dan median sebelum/sesudah hypothetical extreme;
13. menggunakan supplementary HerAI session data tanpa mengubah frozen dataset;
14. menghindari penyebutan participant sebagai “suspicious person” hanya karena satu value ekstrem;
15. menjelaskan bagaimana outlier reasoning relevan terhadap data preparation untuk AI;
16. menjelaskan mengapa statistical flag tidak otomatis menjadi anomaly label untuk model;
17. membatasi conclusion pada observed data dan evidence yang tersedia.

---

# 3. Recall — Canonical HerAI Tetap Sama

Quiz ratio:

| Participant | $q$ |
|---|---:|
| Alya | 0.80 |
| Bima | 0.60 |
| Citra | 0.90 |
| Dewi | 0.70 |

Ordered:

$$
0.60,\;0.70,\;0.80,\;0.90.
$$

Dari Topic 05:

$$
Q_1=0.65
$$

$$
Q_2=0.75
$$

$$
Q_3=0.85
$$

dan:

$$
\operatorname{IQR}=0.20.
$$

Kita akan memakai nilai ini tanpa mengubah canonical cohort.

---

# 4. Hook — Angka Aneh, Hapus atau Periksa?

Bayangkan duration dataset:

$$
38,\;40,\;42,\;43,\;45,\;47,\;120.
$$

Value $120$ jauh dari yang lain.

Kemungkinan:

1. benar-benar ada session 120 menit;
2. data-entry seharusnya 12.0 tetapi decimal hilang;
3. unit salah;
4. session khusus memang berlangsung jauh lebih lama;
5. measurement process berbeda.

Tanpa provenance/context, angka itu belum boleh dihukum sebagai error.

---

# 5. Predict Before Calculate

## Prediksi 1

Jika suatu point berada di luar IQR fence, apakah otomatis harus dihapus?

## Prediksi 2

Jika tidak ada point di luar IQR fence, apakah dataset otomatis clean?

## Prediksi 3

Jika observation sangat tinggi, summary mana yang biasanya lebih mudah tertarik:

- mean;
- median?

Catat jawaban sebelum lanjut.

---

# 6. Intuisi — “Unusual” Bukan “Wrong”

Kita perlu memisahkan tiga lapisan.

## 6.1 Unusual observation

Secara visual/numerik terlihat berbeda dari banyak values lain.

## 6.2 Potential outlier flag

Observation memenuhi satu **rule/diagnostic** yang kita gunakan untuk menandai point agar diperiksa.

## 6.3 Verified error

Ada evidence yang mendukung bahwa record memang salah, misalnya:

- salah input;
- salah unit;
- broken sensor;
- duplicated/corrupted pipeline;
- measurement tidak dilakukan sesuai procedure.

Urutan aman:

> **lihat → flag → inspect → kumpulkan evidence → decide.**

Bukan:

> **lihat → delete.**

---

# 7. IQR Fence sebagai Satu Descriptive Diagnostic

Salah satu mechanical flag yang umum memakai IQR.

Lower fence:

$$
L
=
Q_1-1.5(\operatorname{IQR}).
$$

Upper fence:

$$
U
=
Q_3+1.5(\operatorname{IQR}).
$$

Dalam Topic ini:

- observation $x<L$ → **lower potential-outlier flag**;
- observation $x>U$ → **upper potential-outlier flag**.

OpenStax menggunakan rule $1.5\times\operatorname{IQR}$ untuk menandai **potential outliers** dan mengatakan flag tersebut memerlukan further investigation. [R1]

---

# 8. Math Reading Skill — Membaca Fence

Baca:

$$
Q_1-1.5(\operatorname{IQR})
$$

sebagai:

> “first quartile dikurangi satu setengah kali spread middle-50%.”

Baca:

$$
Q_3+1.5(\operatorname{IQR})
$$

sebagai:

> “third quartile ditambah satu setengah kali spread middle-50%.”

Jangan baca:

> “semua nilai di luar sini adalah salah.”

Rule hanya menghasilkan **flag berdasarkan definition yang dipilih**.

---

# 9. Worked Example 1 — Basic IQR Fence

Ordered data:

$$
10,\;11,\;12,\;13,\;14,\;15,\;16,\;40.
$$

Course quartile convention:

Lower half:

$$
10,\;11,\;12,\;13
$$

sehingga:

$$
Q_1
=
\frac{11+12}{2}
=
11.5.
$$

Upper half:

$$
14,\;15,\;16,\;40
$$

sehingga:

$$
Q_3
=
\frac{15+16}{2}
=
15.5.
$$

IQR:

$$
15.5-11.5
=
4.
$$

Lower fence:

$$
11.5-1.5(4)
=
5.5.
$$

Upper fence:

$$
15.5+1.5(4)
=
21.5.
$$

Value:

$$
40>21.5
$$

sehingga $40$ mendapat:

> **upper potential-outlier flag.**

Apa conclusion yang boleh dibuat?

> “40 perlu diperiksa lebih lanjut.”

Bukan:

> “40 pasti salah.”

---

# 10. Canonical HerAI Quiz Ratio — Tidak Ada Flag

Kita sengaja **tidak memanipulasi canonical data supaya ada outlier**.

Quiz:

$$
Q_1=0.65,
\qquad
Q_3=0.85,
\qquad
\operatorname{IQR}=0.20.
$$

Lower fence:

$$
L
=
0.65-1.5(0.20)
$$

$$
=
0.65-0.30
$$

$$
=
0.35.
$$

Upper fence:

$$
U
=
0.85+1.5(0.20)
$$

$$
=
0.85+0.30
$$

$$
=
1.15.
$$

Canonical values:

$$
0.60,\;0.70,\;0.80,\;0.90
$$

semuanya memenuhi:

$$
0.35\le q\le1.15.
$$

Jadi:

> **Tidak ada canonical quiz-ratio observation yang mendapat IQR-fence potential-outlier flag.**

Ini pedagogically penting:

> **Tidak setiap dataset harus memiliki outlier.**

---

# 11. “Tidak Ada Flag” Bukan Berarti “Data Pasti Clean”

Canonical $q$ tidak mempunyai IQR-fence flag.

Apakah kita boleh berkata:

> “Data pasti sempurna.”

Tidak.

IQR fence hanya satu diagnostic.

Data masih dapat punya masalah lain:

- wrong participant mapping;
- duplicate row;
- stale data;
- incorrect quiz total;
- hidden unit/scale problem;
- missing value yang tidak terlihat di subset;
- semantic mismatch.

Topic 08 akan membahas Data Quality lebih luas.

---

# 12. Canonical Completion Ratio — Juga Tidak Ada Flag

Dari Topic 05:

$$
Q_1=0.5625,
\qquad
Q_3=0.875,
\qquad
\operatorname{IQR}=0.3125.
$$

Lower fence:

$$
L
=
0.5625-1.5(0.3125)
$$

$$
=
0.09375.
$$

Upper fence:

$$
U
=
0.875+1.5(0.3125)
$$

$$
=
1.34375.
$$

Observed completion ratios:

$$
0.50,\;0.625,\;0.75,\;1.00
$$

semua masih di dalam fences.

Jadi tidak ada IQR-fence flag pada canonical completion ratios.

---

# 13. Extreme Participant ≠ Suspicious Participant

Misalkan satu value participant sangat tinggi atau rendah.

Kita sedang mengevaluasi:

> **record/value**

bukan memberi label karakter pada manusia.

Hindari bahasa:

- “participant mencurigakan”;
- “learner abnormal”;
- “orang ini outlier.”

Gunakan:

- “observation flagged”;
- “record perlu diperiksa”;
- “value unusual relative to observed distribution.”

Ini bukan hanya lebih respectful.

Ini juga lebih statistically precise.

---

# 14. Apa yang Harus Diperiksa?

Ketika point ter-flag, tanyakan:

## 14.1 Data entry

Apakah ada typo?

Contoh:

$$
45
\to
450.
$$

## 14.2 Unit

Apakah sebagian records menit dan sebagian jam?

Contoh:

$$
45\text{ menit}
$$

vs:

$$
0.75\text{ jam}.
$$

Secara numerik sangat berbeda formatnya meskipun duration-nya setara.

## 14.3 Measurement process

Apakah pengukuran dilakukan dengan rule/device berbeda?

## 14.4 Legitimate rare case

Apakah value jarang tetapi benar?

## 14.5 Data provenance

Dari source mana record datang?

Kapan dikumpulkan?

Apa pipeline transformation-nya?

## 14.6 Domain context

Apakah event khusus menjelaskan value?

---

# 15. Inspect-Before-Action Workflow

Gunakan workflow:

### STEP 1 — FLAG

Tandai observation sebagai:

> potential outlier.

### STEP 2 — VERIFY RAW RECORD

Periksa source data.

### STEP 3 — CHECK SEMANTICS & UNIT

Pastikan variable meaning dan unit konsisten.

### STEP 4 — CHECK MEASUREMENT / PIPELINE

Cari data-entry, parsing, conversion, sensor, merge, atau transformation issue.

### STEP 5 — ASK CONTEXT

Apakah ada real-world explanation?

### STEP 6 — DECIDE

Kemungkinan actions:

- **correct** jika error terverifikasi dan correct value diketahui;
- **remove** jika error terverifikasi dan policy/analysis membenarkan removal;
- **retain** jika valid;
- **retain + annotate** jika unusual tetapi penting;
- **escalate/investigate** jika belum cukup evidence.

NIST membedakan outlier **labeling** sebagai flag untuk further investigation dari formal identification dan accommodation. [R2]

---

# 16. Worked Example 2 — Verified Typo vs Valid Rare Case

Dua records sama-sama ter-flag.

## Record A

`study_duration_min = 450`

Source form menunjukkan learner memilih `45`, tetapi parser menambahkan zero.

Ini evidence kuat untuk:

> **correct record menjadi 45.**

## Record B

`study_duration_min = 120`

Session log menunjukkan peserta memang mengikuti extended lab selama 120 menit.

Ini bukan data-entry error.

Mungkin:

> **retain sebagai valid rare observation**, dengan context jika diperlukan.

Statistical flag sama.

Decision berbeda karena evidence berbeda.

---

# 17. Supplementary HerAI Dataset — Reuse, Bukan Retune

Topic 04 membuat frozen synthetic instructional dataset:

`data-supplement-topic-06.csv`

Package Topic 06 menyalin dataset yang sama tanpa mengubah values untuk “menciptakan outlier”.

Observational unit:

> satu row = satu synthetic learning session.

Durations terurut:

$$
23,\;27,\;30,\;32,\;33,\;35,\;37,\;38,\;38,\;40,\;42,\;42,
$$

$$
45,\;45,\;47,\;48,\;48,\;50,\;52,\;53,\;55,\;57,\;60,\;63.
$$

Dengan course quartile convention:

$$
Q_1=36,
\qquad
Q_2=43.5,
\qquad
Q_3=51.
$$

IQR:

$$
\operatorname{IQR}
=
51-36
=
15.
$$

Fences:

$$
L
=
36-1.5(15)
=
13.5
$$

dan:

$$
U
=
51+1.5(15)
=
73.5.
$$

Semua observed synthetic sessions berada pada:

$$
23\le d\le63.
$$

Jadi:

> **frozen supplementary dataset juga tidak memiliki IQR-fence flag.**

Kita tidak mengedit dataset agar narrative menjadi nyaman.

---

# 18. Change One Thing — Hypothetical 63 → 100

Sekarang kita melakukan **sensitivity exercise**, bukan mengganti frozen data.

Ubah satu hypothetical observation:

$$
63\to100.
$$

Sorted hypothetical data tetap mempunyai:

$$
Q_1=36,
\qquad
Q_2=43.5,
\qquad
Q_3=51,
$$

dan:

$$
\operatorname{IQR}=15.
$$

Fences tetap:

$$
13.5
$$

dan:

$$
73.5.
$$

Karena:

$$
100>73.5,
$$

maka $100$ mendapat:

> **upper potential-outlier flag.**

Tetapi kita masih belum tahu apakah 100:

- typo;
- unit issue;
- valid extended session;
- special event;
- measurement/pipeline issue.

Flag hanya memulai investigation.

---

# 19. Mean vs Median sebelum dan sesudah Hypothetical Extreme

Frozen synthetic sessions mempunyai mean sekitar:

$$
43.33\text{ menit}
$$

dan median:

$$
43.5\text{ menit}.
$$

Setelah hypothetical:

$$
63\to100,
$$

mean menjadi:

$$
44.875\text{ menit}.
$$

Median tetap:

$$
43.5\text{ menit}.
$$

Observation ekstrem menarik mean lebih kuat, sementara median tidak berubah pada case ini.

Ini menghubungkan kembali Topic 02:

> mean dan median mempunyai sensitivity berbeda.

Tetapi jangan mengubah ini menjadi rule:

> “median selalu lebih baik.”

Statistic yang tepat tetap bergantung pertanyaan.

---

# 20. IQR Fence Juga Bukan Universal Truth

Rule:

$$
Q_1-1.5(\operatorname{IQR})
$$

dan:

$$
Q_3+1.5(\operatorname{IQR})
$$

berguna sebagai **beginner-friendly descriptive flag**.

Tetapi:

- tidak mendefinisikan kebenaran domain;
- tidak membuktikan error;
- tidak cocok sebagai universal anomaly detector untuk semua data;
- tidak menggantikan provenance/context;
- hasil bergantung pada quartile convention dan observed distribution.

Formal outlier tests juga mempunyai assumptions dan scope sendiri; NIST menunjukkan beberapa formal methods bergantung pada distribution assumptions. [R2]

Kita sengaja tidak mengajarkan formal tests di Topic ini.

---

# 21. Misconception Challenge 1 — “Outlier = Error”

Salah.

NIST menyebut possibilities termasuk:

- bad data;
- random variation;
- scientifically interesting observation. [R2]

Jadi flag harus diikuti investigation.

---

# 22. Misconception Challenge 2 — “Outlier = Delete”

Salah.

Delete hanya masuk akal jika:

- error terverifikasi;
- atau analysis policy mempunyai alasan yang justified dan documented.

NIST secara eksplisit memperingatkan agar tidak sekadar menghapus unexplained outlying observation. [R2]

---

# 23. Misconception Challenge 3 — “Di Luar Fence = Invalid”

Salah.

Di luar fence berarti:

> flagged oleh IQR rule.

Validity masih memerlukan evidence/context.

---

# 24. Misconception Challenge 4 — “Tidak Ada Flag = Clean Data”

Salah.

IQR fence tidak mendeteksi:

- missingness;
- wrong unit bila masih berada dalam range;
- duplicated rows;
- mislabeled participant;
- inconsistent semantics;
- stale values.

---

# 25. Misconception Challenge 5 — “Extreme Participant = Suspicious Person”

Salah.

Statistik menilai observation.

Jangan menempelkan label pada manusia.

---

# 26. Misconception Challenge 6 — “Outlier Removal Selalu Membuat Model Lebih Baik”

Salah.

Removal dapat:

- menghilangkan genuine rare cases;
- membuat model gagal mengenali legitimate edge cases;
- mempersempit representation data secara tidak justified;
- mengubah distribution;
- menghasilkan misleading evaluation.

Keputusan preprocessing harus mempunyai evidence dan task context.

---

# 27. Why This Matters in AI

AI pipelines sering menerima large numerical datasets.

Potential-outlier inspection dapat membantu menemukan:

- unit mismatch;
- corrupted sensor reading;
- parsing error;
- impossible value;
- rare-but-valid event;
- distribution shift candidate.

Tetapi statistical outlier flag bukan otomatis:

- anomaly label;
- fraud label;
- malicious-user label;
- model error;
- probability of failure.

---

# 28. Outlier Detection vs Anomaly Detection

Topic ini hanya mengajarkan statistical **outlier flagging** pada satu variable.

Anomaly detection dalam ML dapat melibatkan:

- multiple features;
- model-based scores;
- temporal context;
- neighborhood structure;
- learned representations.

Semua itu berada di luar scope Topic 06.

Jangan menganggap IQR fence sebagai “AI anomaly detector lengkap”.

---

# 29. Visual Inspection Masih Penting

Histogram Topic 04 dapat membantu menunjukkan rare tails.

Ordered strip Topic 05 dapat menunjukkan relative position.

Topic 06 menambahkan:

- fences;
- flagged status;
- inspection questions.

NIST merekomendasikan graphical methods sebagai complement dalam outlier analysis. [R2]

---

# 30. Visual / Interactive Specifications

## [STEP-BY-STEP REVEAL] Quartiles → IQR → Fences

**Purpose:** menunjukkan bahwa flag berasal dari prior concepts.

**Initial state:** ordered values.

**Reveal:**

1. $Q_1,Q_2,Q_3$;
2. middle-50% band;
3. IQR;
4. lower fence;
5. upper fence;
6. highlight only points outside fences.

**Label:** `potential outlier flag`.

**Safety:** tidak menggunakan icon “error” atau warna/language “bad data” sebagai default.

---

## [INTERACTIVE VISUAL] Inspect Flagged Record

**Purpose:** mengubah learner behavior dari delete-first ke investigate-first.

Saat learner memilih flagged point, tampilkan questions:

- Data entry?
- Unit mismatch?
- Measurement issue?
- Valid rare case?
- Source/provenance?
- Context event?
- Need more evidence?

Actions:

- `Correct`
- `Retain`
- `Retain + annotate`
- `Investigate more`

`Delete` tidak menjadi default action.

---

## [COMPARE VIEW] Before vs After Extreme

Panel A:

Frozen supplementary data.

Panel B:

Hypothetical $63\to100$.

Tampilkan:

- mean;
- median;
- quartiles;
- IQR;
- fences;
- flagged points.

Main insight:

> satu observation dapat memengaruhi summaries secara berbeda.

---

## [STATIC VISUAL] Boxplot/Fence Preview

**Purpose:** menghubungkan five-number summary dengan potential-outlier visualization.

Display conceptual:

- $Q_1$;
- median;
- $Q_3$;
- IQR box;
- fence guide lines;
- flagged points di luar fence.

**Safety:** ini adalah conceptual visual; full boxplot implementation conventions tidak dijadikan core Topic.

---

# 31. Try It Yourself 1 — Hitung IQR Fence

Data:

$$
5,\;6,\;7,\;8,\;9,\;10,\;11,\;30.
$$

Gunakan course quartile convention.

1. hitung $Q_1$;
2. hitung $Q_3$;
3. hitung IQR;
4. hitung lower fence;
5. hitung upper fence;
6. tentukan potential-outlier flag;
7. tulis conclusion yang **tidak overclaim**.

---

# 32. Try It Yourself 2 — Canonical HerAI

Gunakan:

$$
Q_1=0.65,
\quad
Q_3=0.85,
\quad
\operatorname{IQR}=0.20.
$$

1. hitung fences;
2. periksa $0.60,0.70,0.80,0.90$;
3. apakah ada flag?
4. apakah tidak adanya flag membuktikan data clean?

---

# 33. Try It Yourself 3 — Verified Error atau Valid Rare Case?

Untuk tiap scenario tentukan next action awal.

A. `duration=450`, source form = `45`.  
B. `duration=120`, event log menunjukkan extended workshop 2 jam.  
C. `duration=100`, source metadata hilang.  
D. `quiz_ratio=80`, schema mendefinisikan ratio seharusnya $0$–$1$.

Pilih:

- correct;
- retain;
- investigate;
- escalate.

Jelaskan evidence.

---

# 34. Try It Yourself 4 — Mean vs Median Sensitivity

Dataset:

$$
10,\;11,\;12,\;13,\;14.
$$

Lalu ubah:

$$
14\to50.
$$

1. hitung mean sebelum/sesudah;
2. hitung median sebelum/sesudah;
3. statistic mana berubah lebih besar?
4. apakah itu berarti median selalu preferred?

---

# 35. Try It Yourself 5 — Language Audit

Ubah kalimat berikut menjadi statistically safer:

1. “Citra adalah outlier.”
2. “Nilai ini di luar fence, jadi salah.”
3. “Tidak ada outlier, data clean.”
4. “Kita hapus semua outlier sebelum training.”
5. “Outlier berarti fraud.”

---

# 36. Checkpoint 1

Jika:

$$
Q_1=20,
\qquad
Q_3=40,
$$

maka:

$$
\operatorname{IQR}=20.
$$

Fences:

$$
L=20-1.5(20)=-10
$$

$$
U=40+1.5(20)=70.
$$

Observation $75$:

> **upper potential-outlier flag.**

Bukan “verified error”.

---

# 37. Checkpoint 2

Observation berada di luar upper fence.

Apa langkah berikutnya?

**Inspect context/provenance.**

Bukan auto-delete.

---

# 38. Checkpoint 3

Tidak ada observation di luar fence.

Apa conclusion valid?

> “Tidak ada IQR-fence potential-outlier flag menurut convention ini.”

Bukan:

> “Dataset pasti clean.”

---

# 39. Checkpoint 4

Record ter-flag dan source log membuktikan parsing error.

Apakah sekarang correction justified?

**Ya**, jika correct value dapat ditentukan dan audit trail/policy dijaga.

Ini berbeda dari menghapus unexplained rare record.

---

# 40. Mastery Check

Pastikan kamu dapat mengatakan:

- [ ] **I can** membedakan unusual observation, potential-outlier flag, dan verified error.
- [ ] **I can** menghitung lower/upper IQR fence.
- [ ] **I can** menyebut output rule sebagai potential-outlier flag.
- [ ] **I can** menjelaskan outlier ≠ error.
- [ ] **I can** menjelaskan outlier ≠ auto-delete.
- [ ] **I can** menjalankan flag → inspect → decide workflow.
- [ ] **I can** memeriksa data entry, unit, measurement, provenance, dan domain context.
- [ ] **I can** mengenali valid rare cases.
- [ ] **I can** menjelaskan bahwa canonical HerAI $q$ tidak memiliki IQR-fence flag.
- [ ] **I can** menjelaskan no flag ≠ clean data.
- [ ] **I can** membandingkan mean/median sensitivity terhadap extreme value.
- [ ] **I can** menghindari labeling participant sebagai suspicious person.
- [ ] **I can** membedakan IQR outlier flagging dari full ML anomaly detection.
- [ ] **I can** menjelaskan mengapa removal tanpa evidence dapat merusak AI data representation.

---

# 41. Yang Sengaja Belum Dibahas

Topic ini tidak mengajarkan sebagai core:

- Grubbs test;
- Generalized ESD;
- Tietjen–Moore test;
- formal outlier hypothesis tests;
- modified z-score threshold;
- MAD-based robust-statistics theory;
- multivariate outlier detection;
- isolation forest;
- one-class SVM;
- local outlier factor;
- autoencoder anomaly detection;
- Probability;
- confidence intervals;
- p-values.

NIST membahas formal outlier methods dengan assumptions tertentu, tetapi itu berada di luar current beginner scope. [R2]

---

# 42. Ringkasan

Kita belajar bahwa:

1. observation yang unusual belum tentu salah;
2. IQR fence dapat dipakai sebagai descriptive potential-outlier flag;
3. lower fence:

$$
Q_1-1.5(\operatorname{IQR});
$$

4. upper fence:

$$
Q_3+1.5(\operatorname{IQR});
$$

5. di luar fence = **flag untuk investigation**, bukan invalidity proof;
6. canonical HerAI quiz ratio mempunyai fences:

$$
0.35
\quad\text{dan}\quad
1.15,
$$

dan tidak ada flagged observation;
7. canonical completion ratio juga tidak mempunyai flag;
8. frozen supplementary sessions mempunyai:

$$
Q_1=36,
\quad
Q_3=51,
\quad
\operatorname{IQR}=15,
$$

dengan fences:

$$
13.5
\quad\text{dan}\quad
73.5,
$$

dan juga tidak mempunyai flag;
9. hypothetical $63\to100$ menghasilkan potential-outlier flag;
10. mean dapat lebih sensitif terhadap extreme observation daripada median;
11. safe workflow:

> **flag → verify raw record → check semantics/unit → inspect pipeline → ask context → decide;**

12. correction/deletion membutuhkan evidence/justification;
13. rare-but-valid observations dapat penting untuk AI;
14. outlier flag bukan anomaly/fraud/model-error label.

---

# 43. Bridge ke Topic 07 — Covariance, Correlation, dan Association

Sampai sekarang kita terutama menganalisis **satu variable pada satu waktu**.

Sekarang kita sudah mengerti:

- center;
- spread;
- distribution;
- relative position;
- unusual observations.

Pertanyaan berikutnya:

> **Bagaimana dua numerical variables bergerak bersama pada observations yang sama?**

Contoh:

- apakah quiz ratio cenderung lebih tinggi saat completion ratio lebih tinggi?
- apakah duration dan quiz ratio bergerak searah pada observed cohort?

Itulah pintu masuk ke:

**Topic 07 — Covariance, Correlation, dan Association.**

---

# 44. Referensi Topic 06

Source ledger lengkap tersedia di `referensi-topic-06.md`.

- [R1] OpenStax — *2.3 Measures of the Location of the Data*.
- [R2] NIST/SEMATECH — *Detection of Outliers*.

---

# 45. Gerbang STOP

Topic 06 selesai pada scope:

**unusual observation → potential-outlier flag → IQR fences → canonical no-flag case → supplementary no-retuning → hypothetical sensitivity → inspect context/provenance → verified error vs valid rare case → responsible data action → AI connection.**

Topic 07 **belum diproduksi**.

> **Apakah Topic 06 Submodule 03 disetujui dan kita boleh melanjutkan ke Topic 07 — Covariance, Correlation, dan Association?**
