# Topic 04 — Distribution dan Histogram: Melihat Pola Seluruh Data

> **Submodule 03 — Statistics for AI: Membaca Pola dan Variasi Data**  
> **Filename:** `04-distribution-dan-histogram.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar akademik/teknis campuran, termasuk non-IT  
> **Prerequisite:** Topic 01–03 Submodule 03  
> **Forward dependency:** Topic 05 — Percentile, Quartile, dan IQR  
> **Boundary:** Topic ini membahas **distribution sebagai pola observed/empirical data**, frequency, relative frequency secara intuitif, center–spread–shape, dan histogram. Probability distribution, random variable, probability density, PDF, CDF, normal-distribution theory, density estimation, formal skewness/kurtosis, distribution fitting, dan goodness-of-fit tetap ditunda.

---

# 1. Mengapa Topik Ini Ada?

Pada Topic 02 dan Topic 03 kita sudah memiliki beberapa numerical summaries.

Untuk study duration HerAI:

$$
45,\;30,\;55,\;40
$$

menit.

Kita mengetahui:

$$
\bar{d}=42.5\text{ menit},
$$

$$
\operatorname{range}(d)=25\text{ menit},
$$

dan:

$$
\sigma_d\approx9.01\text{ menit}.
$$

Informasi itu berguna.

Tetapi ada pertanyaan yang belum terjawab:

> **Bagaimana nilai-nilai itu tersusun sebagai satu pola?**

Dua datasets dapat mempunyai center dan spread yang mirip, tetapi tetap mempunyai susunan observations yang berbeda.

Karena itu statistik tidak berhenti pada satu atau dua summary numbers.

Kita juga perlu **melihat distribution dari observed data**.

NIST menjelaskan distribution data melalui perspektif **location, spread, dan shape**, sedangkan histogram digunakan untuk merangkum distribution dari satu numerical variable melalui bins dan counts. [R1][R2]

Guardrail penting sejak awal:

> **“Distribution” pada Topic ini berarti pola observed/empirical values yang kita miliki, bukan probability distribution.**

---

# 2. Tujuan Pembelajaran

Setelah menyelesaikan Topic 04, kamu diharapkan mampu:

1. menjelaskan distribution sebagai pola observed values dari satu variable;
2. membedakan numerical summary dengan distribution view;
3. menghitung frequency sederhana;
4. menghitung relative frequency sebagai bagian observed data;
5. menjelaskan center, spread, dan shape sebagai perspektif yang saling melengkapi;
6. menjelaskan apa itu histogram;
7. membaca horizontal dan vertical axis histogram;
8. menjelaskan fungsi **bin/class interval**;
9. menghitung frequency tiap bin pada dataset kecil;
10. menjelaskan mengapa histogram bars merepresentasikan **groups of observations**, bukan satu observation per bar;
11. membedakan histogram dari bar chart kategorikal;
12. menjelaskan mengapa changing bins dapat mengubah tampilan tanpa mengubah raw observations;
13. membandingkan dua histogram yang dibuat dari raw data yang sama;
14. mengenali cluster, gap, concentration, dan possible asymmetry secara deskriptif;
15. menghindari klaim “bell-shaped berarti terbukti normal”;
16. menjelaskan mengapa empat canonical participants terlalu sedikit untuk shape lesson yang kuat;
17. menggunakan supplementary HerAI session dataset tanpa mengganti canonical cohort;
18. menjelaskan kegunaan distribution inspection sebelum numerical data digunakan dalam AI.

---

# 3. Recall — Apa yang Sudah Kita Tahu?

Canonical HerAI participant table tetap:

| Participant | Quiz ratio $q$ | Completion ratio $c$ | Study duration |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 min |
| Bima | 0.60 | 0.625 | 30 min |
| Citra | 0.90 | 1.00 | 55 min |
| Dewi | 0.70 | 0.50 | 40 min |

Untuk duration:

- center sudah dibahas;
- spread sudah dibahas;
- unit sudah jelas: menit.

Sekarang kita bergerak dari:

> **“berapa center/spread-nya?”**

menjadi:

> **“bagaimana seluruh observed values tersusun?”**

---

# 4. Hook — Summary Sama, Bentuk Bisa Berbeda

Bayangkan dua datasets.

### Dataset A

$$
2,\;4,\;6,\;8,\;10
$$

### Dataset B

$$
2,\;2,\;6,\;10,\;10
$$

Keduanya mempunyai mean:

$$
6.
$$

Keduanya mempunyai range:

$$
8.
$$

Tetapi arrangement-nya berbeda.

Dataset A tersebar cukup merata.

Dataset B banyak berkumpul di dua sisi.

Artinya:

> **Mean dan range tidak menyimpan semua informasi tentang bentuk observed data.**

---

# 5. Predict Before Plot

Sebelum membuat histogram, jawab secara intuitif.

## Prediksi 1

Data:

$$
21,\;22,\;23,\;48,\;49,\;50
$$

Apakah values tampak:

A. terkonsentrasi pada satu daerah sempit;  
B. mempunyai dua kelompok yang terpisah;  
C. semua sama;  
D. tidak mempunyai pola sama sekali?

## Prediksi 2

Jika raw data tidak berubah tetapi kita mengganti bin width histogram, apakah:

- raw observations berubah?
- count total berubah?
- bentuk visual dapat berubah?

## Prediksi 3

Jika histogram terlihat agak seperti lonceng, apakah itu sudah membuktikan data berasal dari normal distribution?

Simpan jawabanmu.

---

# 6. Intuisi — Distribution sebagai Pola Observed Data

Pada level Topic ini, **distribution** berarti:

> **bagaimana observed values dari satu variable tersebar, terkumpul, dan tersusun di sepanjang scale-nya.**

Kita dapat mengamati:

- di mana values banyak berkumpul;
- seberapa lebar values tersebar;
- apakah ada gap;
- apakah pola tampak simetris atau lebih berat ke satu sisi;
- apakah ada beberapa concentration regions.

NIST menggunakan location, spread, dan shape sebagai tiga perspektif utama untuk memahami distribution data. [R1]

Kita belum sedang membuat probability model.

---

# 7. Frequency

**Frequency** adalah jumlah observations yang memenuhi value atau kelompok tertentu.

Contoh:

$$
2,\;2,\;3,\;4,\;4,\;4.
$$

Frequency:

| Value | Frequency |
|---:|---:|
| 2 | 2 |
| 3 | 1 |
| 4 | 3 |

Total frequency:

$$
2+1+3=6,
$$

sesuai jumlah observations:

$$
n=6.
$$

---

# 8. Relative Frequency

Relative frequency adalah frequency dibagi total observations:

$$
\text{relative frequency}
=
\frac{\text{frequency}}{n}.
$$

Untuk value $4$ pada contoh sebelumnya:

$$
\frac{3}{6}
=
0.5.
$$

Artinya:

> setengah dari **observations yang kita amati** memiliki value $4$.

Guardrail:

> **Relative frequency observed data bukan otomatis theoretical probability.**

Kita belum membahas probability distribution.

---

# 9. Math/Data Reading Skill — Membaca Frequency

Jika sebuah bin mempunyai count $7$ dari $24$ sessions, bacalah:

> “Terdapat 7 dari 24 observed learning sessions yang duration-nya masuk interval tersebut.”

Jangan otomatis membaca:

> “Probability session berikutnya masuk interval ini adalah $7/24$.”

Pernyataan kedua sudah masuk ke probabilistic generalization yang belum menjadi scope.

---

# 10. Mengapa Canonical HerAI 4-Person Data Belum Cukup?

Canonical duration:

$$
30,\;40,\;45,\;55.
$$

Kita bisa membuat histogram dari empat values.

Tetapi dengan hanya empat observations:

- satu bin boundary dapat sangat menentukan tampilan;
- shape sulit dibaca secara pedagogis;
- satu value mewakili 25% dari seluruh data.

Stage B karena itu mengizinkan **supplementary learning-session dataset** dengan sekitar 24 observations khusus untuk Topic 04.

Canonical participant table tetap source of continuity.

Supplement ini **tidak menggantikannya**.

---

# 11. Supplementary HerAI Session Dataset — Status dan Construction Contract

File:

`data-supplement-topic-04.csv`

adalah **synthetic instructional dataset**.

Ia bukan data peserta nyata.

## Observational unit baru

Pada canonical table:

> satu row = satu participant.

Pada supplementary dataset:

> **satu row = satu learning session.**

Satu participant dapat muncul pada beberapa rows.

Ini konsisten dengan prinsip Topic 01 bahwa observational unit ditentukan oleh design dataset.

## Construction rule yang dibekukan

Untuk setiap participant, canonical duration dijadikan baseline:

- Alya = 45 min;
- Bima = 30 min;
- Citra = 55 min;
- Dewi = 40 min.

Enam session offsets yang sama diterapkan kepada setiap baseline:

$$
-7,\;-3,\;0,\;+2,\;+5,\;+8.
$$

Jadi nilai tidak diedit setelah melihat histogram.

Rule ini terdokumentasi dan dibekukan sebelum analysis.

Tujuannya adalah memberi jumlah observations yang cukup untuk latihan histogram **tanpa mengklaim data tersebut berasal dari pengukuran nyata**.

---

# 12. Supplementary Dataset

| Session | Participant | Duration (min) |
|---|---|---:|
| S01 | Alya | 38 |
| S02 | Alya | 42 |
| S03 | Alya | 45 |
| S04 | Alya | 47 |
| S05 | Alya | 50 |
| S06 | Alya | 53 |
| S07 | Bima | 23 |
| S08 | Bima | 27 |
| S09 | Bima | 30 |
| S10 | Bima | 32 |
| S11 | Bima | 35 |
| S12 | Bima | 38 |
| S13 | Citra | 48 |
| S14 | Citra | 52 |
| S15 | Citra | 55 |
| S16 | Citra | 57 |
| S17 | Citra | 60 |
| S18 | Citra | 63 |
| S19 | Dewi | 33 |
| S20 | Dewi | 37 |
| S21 | Dewi | 40 |
| S22 | Dewi | 42 |
| S23 | Dewi | 45 |
| S24 | Dewi | 48 |

Total observations:

$$
n=24.
$$

Minimum:

$$
23\text{ menit}.
$$

Maximum:

$$
63\text{ menit}.
$$

Raw values ini akan tetap sama ketika kita mengganti bin.

---

# 13. Dot-Plot Intuition sebelum Histogram

Bayangkan setiap session sebagai satu titik pada number line.

Jika beberapa sessions mempunyai duration dekat, titik-titik akan terkumpul.

Jika terdapat interval tanpa observations, terlihat gap.

Dot plot mempertahankan visibility setiap observation.

Histogram melakukan sesuatu yang berbeda:

> ia **mengelompokkan** observations ke dalam intervals.

---

# 14. Definisi Histogram

Histogram adalah graphical summary untuk numerical data yang membagi numerical range menjadi **bins/classes**, lalu menghitung berapa observations yang jatuh ke setiap bin.

NIST mendefinisikan bentuk histogram yang umum dengan:

- horizontal axis = response/numerical variable;
- vertical axis = frequency/count;
- range dibagi menjadi bins/classes;
- observations dihitung per bin. [R2]

OpenStax juga menjelaskan histogram menggunakan contiguous bars dan frequency atau relative frequency pada vertical axis. [R3]

---

# 15. Apa Itu Bin?

**Bin** adalah numerical interval.

Contoh:

$$
[20,30)
$$

berarti:

$$
20\le x<30.
$$

Lalu:

$$
[30,40)
$$

berarti:

$$
30\le x<40.
$$

Dalam Topic ini kita akan menggunakan convention:

- lower boundary included;
- upper boundary excluded;
- kecuali bin terakhir, upper boundary terakhir boleh included.

Yang penting bukan bahwa convention ini universal.

Yang penting:

> **boundary rule harus jelas dan konsisten.**

---

# 16. Worked Example 1 — Histogram Kecil

Data:

$$
2,\;3,\;4,\;6,\;7,\;8,\;9.
$$

Gunakan bins:

$$
[0,5),\;[5,10).
$$

Bin pertama memuat:

$$
2,\;3,\;4
$$

sehingga frequency:

$$
3.
$$

Bin kedua memuat:

$$
6,\;7,\;8,\;9
$$

sehingga frequency:

$$
4.
$$

Histogram secara konsep memiliki dua bars:

| Bin | Frequency |
|---|---:|
| $[0,5)$ | 3 |
| $[5,10)$ | 4 |

Jumlah seluruh bar counts:

$$
3+4=7=n.
$$

---

# 17. Math/Data Reading Skill — Membaca Histogram

Ketika kamu melihat sebuah histogram, baca minimal empat hal.

## 17.1 Horizontal axis

Apa variable-nya?

Contoh:

> study duration dalam menit.

## 17.2 Vertical axis

Apakah menunjukkan:

- count/frequency; atau
- relative frequency?

Jangan menebak.

## 17.3 Bin boundaries

Interval apa yang direpresentasikan setiap bar?

## 17.4 Pattern

Di interval mana observations banyak terkumpul?

Apakah spread luas?

Apakah ada gap?

Apakah ada lebih dari satu concentration region?

---

# 18. Worked Example 2 — Supplementary HerAI Histogram

Gunakan bins:

$$
[20,30),\;
[30,40),\;
[40,50),\;
[50,60),\;
[60,70].
$$

Counts dari fixed supplementary dataset adalah:

| Bin duration | Frequency |
|---|---:|
| 20–<30 min | 2 |
| 30–<40 min | 7 |
| 40–<50 min | 8 |
| 50–<60 min | 5 |
| 60–70 min | 2 |

Check:

$$
2+7+8+5+2
=
24
=
24.
$$

Interpretasi deskriptif:

- sebagian besar observed sessions berada antara 30 dan 60 menit;
- bin dengan count tertinggi pada binning ini adalah 40–<50 menit;
- observations lebih sedikit berada di dua ujung range.

Ini hanya deskripsi **observed synthetic sessions**.

Kita tidak mengatakan bahwa populasi learner mengikuti distribution tertentu.

---

# 19. Relative Frequency pada HerAI Supplement

Untuk bin 40–<50 menit:

$$
\frac{8}{24}
\approx
0.333.
$$

Jadi sekitar:

$$
33.3\%
$$

dari supplementary observed sessions berada di interval tersebut.

Sekali lagi:

> ini empirical relative frequency dari dataset synthetic yang diamati, bukan theoretical probability.

---

# 20. Center, Spread, dan Shape Saling Melengkapi

Topic 02 memberi:

- center.

Topic 03 memberi:

- spread.

Topic 04 menambahkan:

- shape/pattern.

NIST menempatkan tiga perspektif ini sebagai bagian dari characterization distribution data. [R1]

Satu angka tidak menggantikan visual inspection.

Dan satu visual juga tidak membuat numerical summaries tidak berguna.

Keduanya saling melengkapi.

---

# 21. Shape — Beginner-Safe Language

Kita boleh memakai bahasa deskriptif seperti:

- values terkonsentrasi di tengah;
- lebih banyak values di sisi rendah;
- lebih banyak values di sisi tinggi;
- ada gap;
- terdapat dua concentration regions;
- tampak relatif symmetric;
- tampak asymmetric.

Tetapi jangan langsung mengubah visual impression menjadi formal proof.

Contoh:

> “Histogram tampak agak symmetric.”

lebih aman daripada:

> “Data terbukti berasal dari normal distribution.”

---

# 22. Histogram Bukan Bar Chart Kategorikal

Histogram dan bar chart sama-sama memakai bars, tetapi struktur datanya berbeda.

## Histogram

- untuk numerical variable;
- x-axis menggunakan numerical intervals;
- bars merepresentasikan adjacent numerical bins;
- ordering berasal dari numerical scale.

## Bar chart

- sering untuk categories;
- setiap bar merepresentasikan category;
- category spacing/order tidak harus mempunyai numerical-distance meaning.

Karena itu:

> **Histogram participant_id 101, 102, 103 sebagai numerical bins dapat tidak bermakna jika ID hanyalah identifier.**

Semantics tetap datang sebelum plotting.

---

# 23. Bars Tidak Sama dengan Individual Observations

Pada histogram:

> satu bar biasanya mewakili **sekumpulan observations dalam satu interval**.

Jadi jika bar 40–<50 mempunyai height $8$:

itu berarti:

> ada 8 observations pada interval tersebut.

Bukan:

> ada satu observation bernilai 8.

---

# 24. Change One Thing — Ganti Bin Boundaries

Raw supplementary durations tetap sama.

Sekarang gunakan bins berbeda:

$$
[15,25),\;
[25,35),\;
[35,45),\;
[45,55),\;
[55,65].
$$

Counts menjadi:

| Bin duration | Frequency |
|---|---:|
| 15–<25 min | 1 |
| 25–<35 min | 4 |
| 35–<45 min | 7 |
| 45–<55 min | 8 |
| 55–65 min | 4 |

Total tetap:

$$
23.
$$

Bandingkan dengan binning sebelumnya.

Raw observations tidak berubah.

Tetapi:

- jumlah bars berubah;
- bar heights berubah;
- visual concentration dapat tampak berbeda.

NIST menjelaskan bins/classes dapat ditentukan dengan rule tertentu atau dipilih dengan cara lain; histogram tetap merupakan grouped representation dari raw observations yang sama. [R2]

---

# 25. Bin Choice adalah Modeling/Display Choice, Bukan Data Mutation

Jika kita mengganti bins:

> **kita mengubah cara mengelompokkan data, bukan data itu sendiri.**

Ini penting.

Salah:

> “Setelah bin width diganti, distribution datanya berubah.”

Lebih tepat:

> “Observed data sama, tetapi histogram representation-nya berubah.”

Karena itu analyst harus berhati-hati agar visual setting tidak menyesatkan pembaca.

---

# 26. Bin Terlalu Lebar

Jika bins terlalu lebar:

- detail lokal dapat hilang;
- beberapa concentration regions bisa tergabung.

Misalnya semua 24 sessions dikelompokkan ke hanya dua bins yang sangat lebar.

Kita mungkin kehilangan banyak information tentang internal pattern.

---

# 27. Bin Terlalu Sempit

Jika bins sangat sempit:

- banyak bars dapat memiliki count kecil;
- visual dapat tampak noisy;
- learner dapat sulit melihat broad pattern.

Tidak ada satu bin width yang otomatis sempurna untuk semua datasets.

Topic ini tidak mengajarkan optimal bin-width formulas.

Target kita adalah memahami **sensitivity**.

---

# 28. Misconception Challenge 1 — “Changing Bins Changes Data”

Salah.

Raw observations tetap sama.

Yang berubah:

> grouping representation.

---

# 29. Misconception Challenge 2 — “Histogram Bar = One Observation”

Salah.

Satu bar mewakili count observations pada interval.

---

# 30. Misconception Challenge 3 — “Histogram = Bar Chart”

Salah.

Histogram memakai numerical intervals dan adjacency pada scale.

Bar chart biasanya mewakili categories.

---

# 31. Misconception Challenge 4 — “Bell-Shaped = Proven Normal”

Salah.

Visual resemblance bukan proof bahwa data mengikuti theoretical normal distribution.

Normal-distribution theory dan goodness-of-fit belum menjadi scope Topic ini.

---

# 32. Misconception Challenge 5 — “Distribution = Probability Distribution”

Tidak pada Topic ini.

Di sini distribution berarti:

> observed/empirical arrangement of data.

Probability distribution akan datang setelah fondasi Probability tersedia.

---

# 33. Misconception Challenge 6 — “Same Mean dan SD = Same Distribution”

Salah.

Mean dan SD hanya dua summaries.

Dua datasets dapat mempunyai mean dan SD yang sama atau mirip tetapi mempunyai arrangement/shape berbeda.

Karena itu visualization tetap penting.

---

# 34. Why This Matters in AI

Sebelum numerical data digunakan untuk AI, distribution inspection dapat membantu menemukan pertanyaan seperti:

- apakah values terkonsentrasi pada range sempit;
- apakah scale sangat luas;
- apakah ada gaps;
- apakah data tampak mempunyai beberapa clusters;
- apakah ada values jarang di ujung;
- apakah transformasi/measurement process mungkin menghasilkan pattern tertentu.

Tetapi histogram tidak otomatis menjawab:

- feature importance;
- model accuracy;
- causality;
- fairness;
- probability of future outcomes.

Ia adalah **data-understanding tool**.

---

# 35. Histogram dan Data Quality

Bayangkan quiz ratio seharusnya berada antara:

$$
0
$$

dan:

$$
1.
$$

Tetapi histogram menunjukkan banyak values sekitar:

$$
70,\;80,\;90.
$$

Ini dapat memicu pertanyaan:

> apakah sebagian records memakai percentage 0–100 sedangkan yang lain memakai ratio 0–1?

Histogram tidak membuktikan error.

Tetapi visual pattern dapat membantu menemukan **data-quality issue untuk diperiksa**.

Formal Data Quality for AI akan dibahas pada Topic 08.

---

# 36. Try It Yourself 1 — Frequency Table

Data:

$$
11,\;12,\;12,\;15,\;18,\;18,\;18,\;19.
$$

1. hitung frequency setiap distinct value;
2. pastikan total frequency = $n$;
3. value mana paling sering muncul?
4. apakah pertanyaan ini sama dengan membaca histogram bin?

---

# 37. Try It Yourself 2 — Bin Counts

Data:

$$
2,\;4,\;5,\;7,\;8,\;11,\;12.
$$

Gunakan bins:

$$
[0,5),\;[5,10),\;[10,15].
$$

Hitung count setiap bin.

---

# 38. Try It Yourself 3 — Relative Frequency

Jika sebuah histogram mempunyai total:

$$
n=20
$$

dan satu bin mempunyai count:

$$
5,
$$

berapa relative frequency observed?

Apa yang **tidak boleh** langsung disimpulkan dari angka itu?

---

# 39. Try It Yourself 4 — Histogram vs Bar Chart

Untuk setiap field, pilih apakah histogram masuk akal.

1. `study_duration_min`
2. `participant_name`
3. `participant_id` berupa angka acak
4. `quiz_ratio`

Jelaskan berdasarkan semantics.

---

# 40. Try It Yourself 5 — Bin Sensitivity

Raw data:

$$
1,\;2,\;3,\;4,\;5,\;6,\;7,\;8.
$$

Buat dua grouping:

A.

$$
[0,4),\;[4,8),\;[8,12)
$$

B.

$$
[0,3),\;[3,6),\;[6,9)
$$

Bandingkan counts.

Apakah raw values berubah?

---

# 41. Visual / Interactive Specifications

## [STEP-BY-STEP REVEAL] Dot Plot → Histogram

**Purpose:** menunjukkan bahwa histogram berasal dari raw observations.

**Initial state:** tampilkan 24 supplementary session dots pada number line.

**Action:**

1. learner melihat individual dots;
2. bin boundaries muncul;
3. dots di setiap bin diberi grouping;
4. bars tumbuh sesuai count;
5. dot layer dapat di-toggle.

**Expected behavior:** learner memahami bar = grouped observations.

**Feedback:** saat hover bar, tampilkan interval + count + daftar session IDs.

**Safety:** jangan menyebut bar height sebagai probability kecuali UI secara eksplisit sedang menampilkan empirical relative frequency.

---

## [INTERACTIVE VISUAL] Draggable Bin Boundaries

**Purpose:** memahami bin sensitivity.

**Initial state:** bins 20–<30, 30–<40, 40–<50, 50–<60, 60–70.

**Action:** learner mengubah bin width/boundary.

**Expected behavior:**

- raw dots tidak bergerak;
- counts per bar berubah;
- total count tetap $24$.

**Feedback:** tampilkan pesan:

> “Representation changed; observations did not.”

---

## [COMPARE VIEW] Same Data, Two Histograms

**Purpose:** membandingkan dua legitimate groupings.

**Left:** bins 10 menit mulai 20.

**Right:** bins 10 menit mulai 15.


---

## [STATIC VISUAL] Center + Spread + Shape

**Purpose:** menghubungkan Topics 02–04.

Satu panel berisi:

- vertical mean marker;
- horizontal spread indication;
- histogram bars.

Learner melihat bahwa center dan spread adalah summaries, sedangkan histogram menunjukkan arrangement.

---

# 42. Checkpoint 1

Histogram mempunyai x-axis `study_duration_min` dan y-axis `frequency`.

Satu bar pada 40–<50 mempunyai height $8$.

Interpretasi yang benar:

> ada 8 observed sessions dengan duration antara 40 inclusive dan 50 exclusive menurut stated boundary convention.

---

# 43. Checkpoint 2

Jika bin width diubah lalu histogram terlihat berbeda, apakah raw dataset berubah?

**Tidak.**

Yang berubah adalah grouping/representation.

---

# 44. Checkpoint 3

Pernyataan:

> “Histogram ini mirip lonceng, jadi data terbukti normal.”

**Tidak valid.**

Visual resemblance tidak sama dengan formal distribution verification.

---

# 45. Checkpoint 4

Apakah relative frequency:

$$
\frac{8}{24}
$$

berarti probability future session pasti:

$$
\frac{8}{24}?
$$

**Tidak.**

Dalam Topic ini angka itu hanya observed proportion pada supplementary dataset.

---

# 46. Mastery Check

Pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan distribution sebagai pola observed data.
- [ ] **I can** membedakan empirical distribution dari probability distribution.
- [ ] **I can** menghitung frequency.
- [ ] **I can** menghitung relative frequency.
- [ ] **I can** membaca axes histogram.
- [ ] **I can** menjelaskan bin/class interval.
- [ ] **I can** menghitung count per bin.
- [ ] **I can** menjelaskan bahwa satu histogram bar mewakili grouped observations.
- [ ] **I can** membedakan histogram dan categorical bar chart.
- [ ] **I can** menjelaskan center, spread, dan shape sebagai perspectives yang saling melengkapi.
- [ ] **I can** menjelaskan mengapa changing bins tidak mengubah raw observations.
- [ ] **I can** membandingkan dua histograms dari dataset yang sama.
- [ ] **I can** menghindari klaim “bell-shaped = proven normal”.
- [ ] **I can** menjaga canonical HerAI cohort terpisah dari supplementary synthetic sessions.
- [ ] **I can** menjelaskan mengapa histogram membantu data understanding sebelum AI modeling.

---

# 47. Yang Sengaja Belum Dibahas

Topic ini tidak menjadikan core:

- normal distribution;
- probability distribution;
- random variable;
- probability density function;
- cumulative distribution function;
- probability mass function;
- theoretical distribution parameter estimation;
- kernel density estimation;
- formal skewness formula;
- formal kurtosis formula;
- goodness-of-fit tests;
- hypothesis tests;
- percentile;
- quartile;
- IQR;
- formal outlier rules.

---

# 48. Ringkasan

Kita belajar bahwa:

1. center dan spread belum menggambarkan seluruh arrangement data;
2. distribution pada Topic ini berarti **observed/empirical pattern**;
3. frequency = jumlah observations;
4. relative frequency = observed count dibagi total observations;
5. histogram mengelompokkan numerical values ke bins;
6. x-axis menunjukkan numerical variable/interval;
7. y-axis menunjukkan frequency atau explicitly stated relative frequency;
8. satu bar mewakili banyak observations pada interval;
9. histogram berbeda dari categorical bar chart;
10. center, spread, dan shape saling melengkapi;
11. changing bins dapat mengubah visual appearance tanpa mengubah raw data;
12. bell-shaped visual bukan proof normal distribution;
13. same mean/SD tidak menjamin same distribution;
14. canonical HerAI participant table tetap unchanged;
15. supplementary 24-session dataset adalah synthetic instructional data dengan observational unit berbeda;
16. histogram adalah tool untuk memahami data, bukan bukti model quality atau probability.

---

# 49. Bridge ke Topic 05 — Percentile, Quartile, dan IQR

Sekarang kita dapat melihat:

- di mana observed values terkumpul;
- seberapa menyebar;
- bagaimana shape tampak;
- bagaimana grouping bins memengaruhi visual.

Pertanyaan berikutnya:

> **Di posisi mana satu value berada relatif terhadap observations lain dalam ordered distribution?**

Itulah pintu masuk ke:

**Topic 05 — Percentile, Quartile, dan IQR.**

---

# 50. Referensi Topic 04

Source ledger lengkap tersedia di `referensi-topic-04.md`.

- [R1] NIST/SEMATECH — *Terminology/Concepts*.
- [R2] NIST/SEMATECH — *Histogram*.
- [R3] OpenStax — *2.2 Histograms, Frequency Polygons, and Time Series Graphs*.

---

# 51. Gerbang STOP

Topic 04 selesai pada scope:

**observed distribution → frequency → relative frequency → center/spread/shape → histogram → bins → axes → counts → bin sensitivity → supplementary HerAI session dataset → AI data-understanding connection.**

Topic 05 **belum diproduksi**.

> **Apakah Topic 04 Submodule 03 disetujui dan kita boleh melanjutkan ke Topic 05 — Percentile, Quartile, dan IQR?**
