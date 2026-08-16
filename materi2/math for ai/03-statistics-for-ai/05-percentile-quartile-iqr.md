# Topic 05 — Percentile, Quartile, dan IQR: Membaca Posisi Relatif dalam Data

> **Submodule 03 — Statistics for AI: Membaca Pola dan Variasi Data**  
> **Filename:** `05-percentile-quartile-iqr.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar akademik/teknis campuran, termasuk non-IT  
> **Prerequisite:** Topic 02 — Mean, Median, Mode; Topic 03 — Range, Variance, Standard Deviation; Topic 04 — Distribution dan Histogram  
> **Forward dependency:** Topic 06 — Outlier: Sinyal untuk Diperiksa  
> **Boundary:** Topic ini membahas posisi relatif, percentile secara interpretatif, quartile $Q_1,Q_2,Q_3$, median sebagai $Q_2$, dan IQR sebagai spread middle 50%. Formal outlier fences, boxplot mechanics, probability quantiles, theoretical probability distributions, advanced percentile interpolation, confidence intervals, dan inference tetap ditunda.

---

# 1. Mengapa Topik Ini Ada?

Pada Topic 04 kita mulai melihat **seluruh observed distribution**.

Sekarang muncul pertanyaan baru.

Misalnya quiz ratio HerAI setelah diurutkan:

$$
0.60,\;0.70,\;0.80,\;0.90.
$$

Kita sudah dapat menghitung:

- mean;
- median;
- range;
- variance;
- standard deviation.

Tetapi bagaimana jika pertanyaannya bukan:

> “Berapa pusat data?”

atau:

> “Seberapa menyebar data?”

melainkan:

> **“Di posisi mana suatu nilai berada dibanding observations lain?”**

Contoh:

- apakah suatu nilai berada di bagian bawah distribution?
- sekitar tengah?
- bagian atas?
- seberapa lebar middle 50% observations?

Di sinilah **percentile**, **quartile**, dan **interquartile range (IQR)** berguna.

OpenStax menjelaskan bahwa quartiles membagi ordered data menjadi empat bagian dan percentiles membagi ordered data menjadi seratus bagian. NIST juga mendefinisikan percentile melalui ordered observations dan relative position. [R1][R2]

Guardrail terpenting:

> **Percentile adalah posisi relatif dalam ordered data, bukan persentase nilai mentah.**

---

# 2. Tujuan Pembelajaran

Setelah menyelesaikan Topic 05, kamu diharapkan mampu:

1. menjelaskan percentile sebagai ukuran posisi relatif;
2. membedakan percentile dari percentage;
3. menjelaskan mengapa data perlu diurutkan sebelum quartile/percentile reasoning;
4. menjelaskan arti $Q_1$, $Q_2$, dan $Q_3$;
5. menjelaskan hubungan $Q_2$ dengan median;
6. menginterpretasikan $Q_1$ sebagai sekitar 25th percentile;
7. menginterpretasikan $Q_3$ sebagai sekitar 75th percentile;
8. menggunakan **course quartile convention** secara konsisten;
9. menghitung quartiles pada small even-sized datasets;
10. menghitung IQR;
11. menjelaskan IQR sebagai spread middle 50%;
12. membedakan IQR dari full range;
13. menjelaskan bahwa quartile values tidak harus merupakan raw observed value;
14. menjelaskan bahwa software/textbooks dapat menggunakan percentile conventions berbeda;
15. menginterpretasikan HerAI quiz-ratio quartiles;
16. menginterpretasikan HerAI completion-ratio quartiles;
17. memprediksi bagaimana perubahan satu observation dapat memengaruhi quartiles/IQR;
18. menghindari klaim bahwa percentile tinggi otomatis “baik”;
19. menghindari generalisasi dari empat HerAI participants ke seluruh population;
20. menjelaskan mengapa relative-position summaries berguna dalam data understanding untuk AI.

---

# 3. Recall — Distribution Harus Bisa Diurutkan

Topic ini bekerja terutama pada numerical data yang dapat ditempatkan pada ordered scale.

Canonical HerAI:

| Participant | Quiz ratio $q$ | Completion ratio $c$ |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

Untuk quiz ratio:

$$
0.80,\;0.60,\;0.90,\;0.70
$$

harus diurutkan menjadi:

$$
0.60,\;0.70,\;0.80,\;0.90.
$$

Urutan adalah fondasi Topic ini.

---

# 4. Hook — 90th Percentile Bukan Nilai 90%

Bayangkan dua kalimat:

> “Nilai quiz learner adalah 90%.”

dan:

> “Learner berada pada 90th percentile.”

Apakah sama?

**Tidak.**

Kalimat pertama berbicara tentang **raw score/percentage**.

Kalimat kedua berbicara tentang **relative standing terhadap data lain**.

OpenStax secara eksplisit memperingatkan bahwa berada pada 90th percentile tidak berarti memperoleh 90% pada tes. [R1]

Contoh:

Seseorang dapat mendapat raw score:

$$
72\%
$$

tetapi tetap berada pada percentile tinggi jika mayoritas scores lain lebih rendah.

---

# 5. Predict Before Calculate

## Prediksi 1 — Posisi Relatif

Ordered data:

$$
10,\;20,\;30,\;40.
$$

Nilai mana yang paling dekat dengan middle position?

A. 10  
B. 20 dan 30  
C. 40  
D. tidak ada konsep tengah

## Prediksi 2 — Middle 50%

Jika $Q_1=20$ dan $Q_3=60$, menurutmu IQR mengukur:

A. seluruh range  
B. spread middle 50%  
C. mean  
D. probability

## Prediksi 3 — Percentage vs Percentile

Jika learner berada di 75th percentile, apakah raw score-nya harus 75%?

Catat reasoning sebelum lanjut.

---

# 6. Intuisi — Data sebagai Barisan Terurut

Bayangkan observed data diletakkan dari kecil ke besar.

Percentile adalah cara menanyakan:

> **“Seberapa jauh kita telah bergerak melalui ordered observations?”**

Secara intuitif:

- percentile rendah → posisi relatif lebih dekat bagian bawah;
- percentile tengah → sekitar center;
- percentile tinggi → posisi relatif lebih dekat bagian atas.

Tetapi:

> **high percentile tidak otomatis good.**

Untuk duration menyelesaikan bug misalnya, percentile tinggi dapat berarti waktu yang lebih lama.

Makna “baik/buruk” selalu context-dependent.

OpenStax menekankan bahwa percentile sendiri tidak membawa value judgment universal. [R1]

---

# 7. Definisi Percentile — Beginner-Safe

Percentile adalah nilai yang menggambarkan **relative standing** pada ordered data.

Secara konseptual:

> $p$th percentile adalah lokasi sehingga kira-kira $p\%$ observations berada pada atau di bawah posisi/value tersebut, dengan detail exact calculation bergantung convention dan penanganan ties/interpolation.

NIST menjelaskan percentiles melalui order statistics dan secara eksplisit menyatakan bahwa ketika percentile tidak jatuh tepat pada satu data point, interpolation diperlukan dan **tidak ada satu metode interpolation yang diterima universal**. [R2]

Karena itu Topic ini tidak akan berpura-pura bahwa satu percentile formula berlaku untuk semua software.

---

# 8. Percentile vs Percentage

## Percentage

Menjawab:

> “Berapa bagian dari total yang dicapai?”

Contoh quiz:

$$
\frac{8}{10}=80\%.
$$

## Percentile

Menjawab:

> “Di mana posisi nilai ini relatif terhadap ordered observations lain?”

Contoh:

> 80th percentile berarti relative position sekitar bagian atas distribution, bukan raw score 80%.

### Guardrail

$$
80\%\text{ score}
\neq
80\text{th percentile}
$$

secara umum.

---

# 9. Quartiles

Quartiles adalah special relative-position summaries yang membagi ordered data menjadi empat bagian.

Kita menggunakan:

- $Q_1$ = first quartile;
- $Q_2$ = second quartile;
- $Q_3$ = third quartile.

Interpretasi umum:

$$
Q_1 \approx P_{25}
$$

$$
Q_2 \approx P_{50}
$$

$$
Q_3 \approx P_{75}.
$$

Di sini $P_{25}$, $P_{50}$, dan $P_{75}$ berarti 25th, 50th, dan 75th percentile.

OpenStax mendeskripsikan $Q_1,Q_2,Q_3$ dengan pembagian ordered data ke empat bagian dan menempatkan $Q_2$ sebagai median. [R1]

---

# 10. $Q_2$ adalah Median

Dari Topic 02:

median adalah nilai tengah ordered data.

Dalam quartile language:

$$
Q_2=\text{median}.
$$

Untuk ordered quiz ratio:

$$
0.60,\;0.70,\;0.80,\;0.90,
$$

karena ada empat values:

$$
Q_2
=
\frac{0.70+0.80}{2}
=
0.75.
$$

Jadi median Topic 02 kembali muncul sebagai second quartile.

---

# 11. Course Quartile Convention

Ada beberapa valid quartile/percentile conventions pada statistik dan software.

Agar hand calculation konsisten, **course convention** untuk small manual quartile examples adalah:

1. sort data ascending;
2. cari overall median $Q_2$;
3. bagi ordered data menjadi lower half dan upper half;
4. $Q_1$ = median dari lower half;
5. $Q_3$ = median dari upper half.

Untuk Topic ini, manual calculation utama sengaja menggunakan **even-sized datasets** agar lower/upper halves jelas.

Untuk odd-sized datasets, textbook/software conventions dapat berbeda tentang bagaimana overall median diperlakukan dalam halves. Jika kasus itu muncul di production system, convention harus dinyatakan secara eksplisit.

Jangan mengklaim:

> “Semua software pasti menghasilkan quartiles identik.”

NIST secara eksplisit mencatat tidak ada satu percentile interpolation method yang universally accepted. [R2]

---

# 12. Worked Example 1 — Quartiles Dasar

Ordered dataset:

$$
2,\;4,\;6,\;8,\;10,\;12,\;14,\;16.
$$

## Step 1 — $Q_2$

Middle values:

$$
8,\;10.
$$

Maka:

$$
Q_2
=
\frac{8+10}{2}
=
9.
$$

## Step 2 — Lower half

$$
2,\;4,\;6,\;8.
$$

Median lower half:

$$
Q_1
=
\frac{4+6}{2}
=
5.
$$

## Step 3 — Upper half

$$
10,\;12,\;14,\;16.
$$

Median upper half:

$$
Q_3
=
\frac{12+14}{2}
=
13.
$$

Jadi:

$$
\boxed{
Q_1=5,\quad Q_2=9,\quad Q_3=13
}
$$

---

# 13. Math/Data Reading Skill — Membaca Quartiles

Jika:

$$
Q_1=5,
$$

beginner-safe reading:

> sekitar seperempat ordered observations berada pada/bawah bagian yang direpresentasikan oleh first quartile, dan sekitar tiga perempat berada pada/atas sisi lainnya, bergantung ties/convention.

Jika:

$$
Q_2=9,
$$

baca:

> $Q_2$ adalah median dan membagi ordered data menjadi lower dan upper halves.

Jika:

$$
Q_3=13,
$$

baca:

> sekitar tiga perempat observations berada pada/bawah posisi third quartile.

Jangan membaca:

> “$Q_1$ berarti nilai 25% dari maximum.”

Itu salah.

---

# 14. Interquartile Range

IQR adalah:

$$
\operatorname{IQR}
=
Q_3-Q_1.
$$

OpenStax dan NIST sama-sama mendefinisikan IQR sebagai difference antara upper dan lower quartile, yaitu spread bagian tengah data. [R1][R3]

Untuk example:

$$
Q_1=5
$$

dan:

$$
Q_3=13,
$$

maka:

$$
\operatorname{IQR}
=
13-5
=
8.
$$

---

# 15. Apa yang Diukur IQR?

IQR menggambarkan spread **middle 50%** data.

Artinya ia tidak memakai full minimum-to-maximum span seperti range.

Compare:

## Range

$$
x_{\max}-x_{\min}
$$

menggunakan ujung keseluruhan data.

## IQR

$$
Q_3-Q_1
$$

fokus pada bagian tengah distribution.

NIST menjelaskan IQR sebagai measure of scale yang mengukur variability di sekitar center melalui 75th minus 25th percentile. [R3]

---

# 16. IQR Bukan “50% dari Range”

Salah satu jebakan umum:

> “Karena IQR adalah middle 50%, berarti IQR = 50% × range.”

Tidak.

IQR berasal dari:

$$
Q_3-Q_1.
$$

Bukan:

$$
0.5(x_{\max}-x_{\min}).
$$

Kedua expression dapat menghasilkan values berbeda.

---

# 17. Quartile Values Tidak Harus Raw Observation

Pada HerAI quiz ratio:

$$
0.60,\;0.70,\;0.80,\;0.90,
$$

nanti kita mendapat:

$$
Q_1=0.65.
$$

Tetapi:

$$
0.65
$$

tidak ada sebagai raw quiz-ratio observation.

Itu tidak masalah.

Seperti median pada even-sized data, quartile dapat berada di antara observed values menurut course convention.

OpenStax juga menyatakan quartiles may or may not be actual data values. [R1]

---

# 18. Worked Example 2 — HerAI Quiz Ratio

Canonical quiz ratios:

| Participant | $q$ |
|---|---:|
| Alya | 0.80 |
| Bima | 0.60 |
| Citra | 0.90 |
| Dewi | 0.70 |

Sort:

$$
0.60,\;0.70,\;0.80,\;0.90.
$$

## $Q_2$

$$
Q_2
=
\frac{0.70+0.80}{2}
=
0.75.
$$

## $Q_1$

Lower half:

$$
0.60,\;0.70.
$$

Maka:

$$
Q_1
=
\frac{0.60+0.70}{2}
=
0.65.
$$

## $Q_3$

Upper half:

$$
0.80,\;0.90.
$$

Maka:

$$
Q_3
=
\frac{0.80+0.90}{2}
=
0.85.
$$

Jadi:

$$
\boxed{
Q_1=0.65,\quad
Q_2=0.75,\quad
Q_3=0.85
}
$$

---

# 19. IQR HerAI Quiz Ratio

$$
\operatorname{IQR}_q
=
Q_3-Q_1
$$

$$
=
0.85-0.65
$$

$$
=
0.20.
$$

Jadi:

$$
\boxed{
\operatorname{IQR}_q=0.20
}
$$

Interpretasi:

> middle 50% posisi quiz ratios pada empat observed participants membentang sekitar $0.20$ ratio-unit menurut course quartile convention.

Guardrail:

> ini adalah property dari **empat observed quiz ratios**, bukan hukum tentang seluruh HerAI population.

---

# 20. Percentile Interpretation pada $Q_3$

Untuk canonical $q$:

$$
Q_3=0.85.
$$

Observed values:

$$
0.60,\;0.70,\;0.80,\;0.90.
$$

Tiga dari empat raw values berada pada atau di bawah $0.85$:

$$
\frac{3}{4}=75\%.
$$

Satu berada di atas:

$$
\frac{1}{4}=25\%.
$$

Ini membantu membangun intuition:

> $Q_3$ berkaitan dengan upper-quarter boundary dalam ordered data.

Bukan:

> “Quiz score-nya 85% karena third quartile.”

$0.85$ memang numerically equivalent ke 85% jika ratio dikonversi, tetapi **makna quartile** tetap relative-position boundary, bukan raw-performance percentage statement.

---

# 21. Worked Example 3 — HerAI Completion Ratio

Canonical completion ratios:

$$
0.75,\;0.625,\;1.00,\;0.50.
$$

Sort:

$$
0.50,\;0.625,\;0.75,\;1.00.
$$

## $Q_2$

$$
Q_2
=
\frac{0.625+0.75}{2}
=
0.6875.
$$

## $Q_1$

$$
Q_1
=
\frac{0.50+0.625}{2}
=
0.5625.
$$

## $Q_3$

$$
Q_3
=
\frac{0.75+1.00}{2}
=
0.875.
$$

## IQR

$$
\operatorname{IQR}_c
=
0.875-0.5625
=
0.3125.
$$

Jadi:

$$
\boxed{
Q_1=0.5625,\;
Q_2=0.6875,\;
Q_3=0.875,\;
\operatorname{IQR}=0.3125
}
$$

---

# 22. Compare View — Quiz vs Completion

Quiz:

$$
\operatorname{IQR}_q=0.20.
$$

Completion:

$$
\operatorname{IQR}_c=0.3125.
$$

Untuk observed four-participant cohort:

> middle 50% completion ratios lebih lebar daripada middle 50% quiz ratios pada scale ratio yang sama.

Tetapi jangan memperluas menjadi:

> “completion selalu lebih variable di semua HerAI cohorts.”

Dataset kita hanya empat observations.

---

# 23. Change One Thing — Ubah Satu Quiz Ratio

Canonical:

$$
0.60,\;0.70,\;0.80,\;0.90.
$$

Sekarang buat **hypothetical sensitivity case**:

ubah Bima dari:

$$
0.60\to0.10.
$$

Ordered data menjadi:

$$
0.10,\;0.70,\;0.80,\;0.90.
$$

## Prediksi dulu

Apa yang akan terjadi pada:

- $Q_1$?
- $Q_2$?
- $Q_3$?
- IQR?

## Hitung

$$
Q_1
=
\frac{0.10+0.70}{2}
=
0.40.
$$

$$
Q_2
=
\frac{0.70+0.80}{2}
=
0.75.
$$

$$
Q_3
=
\frac{0.80+0.90}{2}
=
0.85.
$$

IQR:

$$
0.85-0.40
=
0.45.
$$

Bandingkan:

| Summary | Canonical | Hypothetical |
|---|---:|---:|
| $Q_1$ | 0.65 | 0.40 |
| $Q_2$ | 0.75 | 0.75 |
| $Q_3$ | 0.85 | 0.85 |
| IQR | 0.20 | 0.45 |

Satu lower observation yang berubah jauh dapat mengubah lower quartile dan IQR, sementara median tetap sama.

Kita belum memberi label “outlier”.

Itu scope Topic 06.

---

# 24. Why IQR Is Useful

Range:

$$
x_{\max}-x_{\min}
$$

sangat dipengaruhi dua extremes.

IQR:

$$
Q_3-Q_1
$$

fokus pada middle half.

NIST menjelaskan IQR sebagai robust measure of scale yang lebih sedikit dipengaruhi extremes dibanding standard deviation. [R3]

Untuk beginner interpretation:

> IQR berguna ketika kita ingin melihat seberapa lebar bagian tengah data tanpa menjadikan minimum dan maximum sebagai satu-satunya penentu spread.

Tetapi:

> **IQR bukan otomatis “lebih baik” daripada SD.**

Mereka menjawab aspek yang berbeda.

---

# 25. Five-Number Summary — Preview Ringan

Struktur yang sering dipakai untuk merangkum ordered data adalah:

1. minimum;
2. $Q_1$;
3. $Q_2$;
4. $Q_3$;
5. maximum.

Untuk quiz ratio:

$$
0.60,\;0.65,\;0.75,\;0.85,\;0.90.
$$

Ini disebut **five-number summary**.

Topic ini hanya memperkenalkannya sebagai structural summary.

Boxplot dan formal outlier flagging belum menjadi fokus.

---

# 26. Arbitrary Percentiles — Fokus pada Interpretasi

Selain 25th, 50th, dan 75th percentile, kita dapat berbicara tentang:

- 10th percentile;
- 80th percentile;
- 90th percentile;
- dan lainnya.

Namun exact calculation pada small datasets dapat berbeda antar methods/software karena interpolation conventions berbeda.

NIST menyatakan secara langsung bahwa tidak ada satu universal interpolation method; beberapa methods digunakan dalam praktik. [R2]

Karena itu core learner outcome Topic ini adalah:

> **mampu menginterpretasikan percentile secara benar**, bukan menghafal satu arbitrary formula seolah universal.

---

# 27. Math/Data Reading Skill — Membaca $P_{80}$

Jika suatu report mengatakan:

$$
P_{80}=52\text{ menit},
$$

baca secara context-aware:

> sekitar 80% ordered observations berada pada atau di bawah relative-position boundary sekitar 52 menit menurut convention yang dipakai.

Jangan baca:

> “52 menit adalah 80% dari maximum.”

Jangan pula baca:

> “probability future session di bawah 52 menit pasti 80%.”

Itu sudah melampaui descriptive observed-data scope.

---

# 28. Ties dan Small Data

Jika banyak observations memiliki value yang sama, kalimat percentile seperti:

> “tepat 75% values di bawah”

dapat menjadi terlalu kaku.

Lebih aman menggunakan language:

- pada atau di bawah;
- sekitar;
- relative position;
- sesuai convention yang dipakai.

Ini menjaga interpretation ketika ties atau interpolation muncul.

---

# 29. Misconception Challenge 1 — “75th Percentile = 75% Score”

Salah.

Percentile = relative position.

Percentage = raw fraction of total.

Mereka dapat kebetulan mempunyai angka yang sama tetapi maknanya berbeda.

---

# 30. Misconception Challenge 2 — “$Q_1$ = Seperempat Maximum”

Salah.

$Q_1$ ditentukan dari ordered data, bukan:

$$
\frac{1}{4}x_{\max}.
$$

---

# 31. Misconception Challenge 3 — “IQR = Full Range”

Salah.

Full range:

$$
x_{\max}-x_{\min}.
$$

IQR:

$$
Q_3-Q_1.
$$

IQR hanya menggambarkan middle 50%.

---

# 32. Misconception Challenge 4 — “Semua Software Harus Sama”

Tidak selalu.

Percentile interpolation dan quartile conventions dapat berbeda.

Maka report yang reproducible harus menyebut method/convention ketika perbedaan method material.

---

# 33. Misconception Challenge 5 — “High Percentile = Good”

Tidak universal.

Contoh:

- percentile tinggi untuk quiz performance mungkin desirable;
- percentile tinggi untuk response latency mungkin undesirable;
- percentile tinggi untuk body measurement bisa netral.

Statistical position tidak membawa value judgment otomatis.

---

# 34. Misconception Challenge 6 — “IQR Kecil = Model Bagus”

Salah.

IQR merangkum spread middle 50% variable.

Ia tidak mengukur:

- model accuracy;
- calibration;
- fairness;
- causal validity;
- feature importance;
- generalization.

---

# 35. Why This Matters in AI

Percentiles dan quartiles berguna dalam data-understanding workflows.

Contoh pertanyaan:

- apakah satu value berada sangat rendah/tinggi relatif terhadap observed records?
- di mana middle half feature berada?
- apakah middle 50% feature sangat sempit atau lebar?
- apakah threshold operasional berbasis relative position lebih meaningful daripada threshold raw yang arbitrary?

Tetapi:

> relative position tidak otomatis menjadi prediction probability atau model confidence.

---

# 36. Percentile-Based Thresholds Membutuhkan Context

Misalnya tim ingin mengatakan:

> “Prioritaskan learners di bawah 25th percentile quiz ratio.”

Secara data operation, threshold ini dapat didefinisikan.

Tetapi secara product decision masih perlu mempertimbangkan:

- apakah variable benar-benar relevan;
- apakah cohort representatif;
- apakah threshold mempunyai pedagogical justification;
- apakah data recent;
- apakah decision fairness sudah dipikirkan.

Statistic tidak membuat policy decision otomatis benar.

---

# 37. Try It Yourself 1 — Quartiles Dasar

Ordered data:

$$
3,\;5,\;7,\;9,\;11,\;13,\;15,\;17.
$$

Gunakan course convention.

1. hitung $Q_2$;
2. hitung $Q_1$;
3. hitung $Q_3$;
4. hitung IQR.

---

# 38. Try It Yourself 2 — HerAI Quiz

Tanpa melihat worked example:

$$
0.60,\;0.70,\;0.80,\;0.90.
$$

1. cari $Q_1$;
2. cari $Q_2$;
3. cari $Q_3$;
4. cari IQR;
5. jelaskan middle 50% dalam kata-kata.

---

# 39. Try It Yourself 3 — Percentage atau Percentile?

Klasifikasikan.

1. “Alya menjawab 8 dari 10 soal benar.”
2. “Alya berada di 80th percentile cohort.”
3. “Completion ratio = 75%.”
4. “Study duration berada di 25th percentile.”

Untuk masing-masing, jelaskan apakah berbicara tentang raw proportion atau relative position.

---

# 40. Try It Yourself 4 — IQR vs Range

Data:

$$
1,\;4,\;5,\;6,\;7,\;8,\;9,\;20.
$$

Gunakan course convention.

1. hitung range;
2. hitung $Q_1$;
3. hitung $Q_3$;
4. hitung IQR;
5. jelaskan mengapa range dan IQR berbeda cukup besar.

Jangan menyebut nilai tertentu sebagai outlier pada Topic ini.

---

# 41. Try It Yourself 5 — Interpretasi $P_{90}$

Sebuah dashboard menampilkan:

> `P90 response time = 1.8 detik`

Tulis interpretation descriptive yang aman.

Lalu tulis dua interpretation yang **tidak** boleh dibuat tanpa informasi tambahan.

---

# 42. Visual / Interactive Specifications

## [STEP-BY-STEP REVEAL] Ordered Strip → Quartiles

**Purpose:** menunjukkan bahwa quartile berasal dari ordered positions.

**Initial state:** raw quiz ratios acak:

$$
0.80,\;0.60,\;0.90,\;0.70.
$$

**Reveal:**

1. sort;
2. identify $Q_2$;
3. shade lower half;
4. identify $Q_1$;
5. shade upper half;
6. identify $Q_3$;
7. shade middle-50% band;
8. display IQR.

**Safety:** label method sebagai **course quartile convention**.

---

## [INTERACTIVE VISUAL] Percentile Locator

**Purpose:** memahami relative position.

**Initial state:** ordered strip dengan marker draggable.

**Action:** learner move marker ke lower/middle/upper region.

**Feedback:** tampilkan approximate observed fraction at/below marker.

**Safety:** gunakan “observed proportion/relative position”, bukan future-event probability.

---

## [COMPARE VIEW] Percentage vs Percentile

**Left card:** `quiz ratio = 0.80 = 80% correct`

**Right card:** `80th percentile = relative standing`

**Feedback:** “same number can represent different concepts.”

---

## [NUMBER MANIPULATOR] Change One Observation

**Initial data:**

$$
0.60,\;0.70,\;0.80,\;0.90.
$$

**Action:** ubah lowest value.

**Live output:**

- $Q_1$;
- $Q_2$;
- $Q_3$;
- IQR.

**Expected behavior:** learner melihat quartiles merespons perubahan berbeda-beda.

**Safety:** jangan otomatis menandai changed value sebagai error/outlier.

---

# 43. Checkpoint 1

Jika:

$$
Q_1=10,
\qquad
Q_3=18,
$$

maka:

$$
\operatorname{IQR}=8.
$$

Apa artinya?

> middle 50% ordered data membentang 8 unit antara first dan third quartile menurut convention yang digunakan.

---

# 44. Checkpoint 2

Pernyataan:

> “Seorang learner di 90th percentile pasti memiliki raw score 90%.”

**Salah.**

Percentile dan percentage adalah konsep berbeda.

---

# 45. Checkpoint 3

Pernyataan:

> “Karena aplikasi A memberi $Q_1=6.5$ dan aplikasi B memberi $Q_1=7$, salah satunya pasti bug.”

**Tidak otomatis.**

Periksa:

- data yang sama?
- sorting?
- missing values?
- percentile/quartile convention?
- interpolation method?

---

# 46. Checkpoint 4

Jika:

$$
\operatorname{IQR}=0,
$$

apa yang pasti?

Yang aman:

> $Q_1$ dan $Q_3$ sama menurut convention yang digunakan, sehingga middle-half boundary span adalah zero.

Jangan otomatis menyimpulkan seluruh raw dataset identik.

Values di luar middle region masih dapat berbeda.

---

# 47. Mastery Check

Pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan percentile sebagai relative position.
- [ ] **I can** membedakan percentile dari percentage.
- [ ] **I can** mengurutkan data sebelum quartile reasoning.
- [ ] **I can** menjelaskan $Q_1,Q_2,Q_3$.
- [ ] **I can** menjelaskan $Q_2$ sebagai median.
- [ ] **I can** menggunakan course quartile convention pada even-sized data.
- [ ] **I can** menghitung IQR.
- [ ] **I can** menjelaskan IQR sebagai spread middle 50%.
- [ ] **I can** membedakan IQR dari range.
- [ ] **I can** menjelaskan bahwa quartile tidak harus raw data value.
- [ ] **I can** menjelaskan mengapa software quartiles/percentiles dapat berbeda.
- [ ] **I can** menginterpretasikan canonical HerAI quartiles dengan aman.
- [ ] **I can** menghindari high-percentile = good fallacy.
- [ ] **I can** menghindari percentile = probability fallacy.
- [ ] **I can** membatasi conclusion hanya pada observed cohort.

---

# 48. Yang Sengaja Belum Dibahas

Topic ini tidak mengajarkan sebagai core:

- IQR outlier fences;
- automatic outlier classification;
- boxplot construction;
- probability quantiles;
- theoretical-distribution quantile functions;
- inverse CDF;
- advanced interpolation algorithms;
- quantile regression;
- confidence intervals;
- hypothesis tests;
- probability distribution theory.

Outlier inspection baru menjadi fokus Topic 06.

---

# 49. Ringkasan

Kita belajar bahwa:

1. percentile menjelaskan relative position dalam ordered data;
2. percentile berbeda dari percentage;
3. quartiles membagi ordered data menjadi empat bagian;
4. $Q_2$ adalah median;
5. $Q_1$ berkaitan dengan sekitar 25th percentile;
6. $Q_3$ berkaitan dengan sekitar 75th percentile;
7. manual quartile calculation course memakai declared median-of-halves convention;
8. percentile algorithms tidak universal di semua software;
9. IQR:

$$
\operatorname{IQR}=Q_3-Q_1;
$$

10. IQR menggambarkan middle-50% spread;
11. IQR berbeda dari full range;
12. quiz ratio HerAI menghasilkan:

$$
Q_1=0.65,\quad
Q_2=0.75,\quad
Q_3=0.85,
$$

dan:

$$
\operatorname{IQR}_q=0.20;
$$

13. completion ratio menghasilkan:

$$
Q_1=0.5625,\quad
Q_2=0.6875,\quad
Q_3=0.875,
$$

dan:

$$
\operatorname{IQR}_c=0.3125;
$$

14. semua hasil itu mendeskripsikan empat observed participants, bukan seluruh population;
15. percentile tinggi tidak otomatis berarti baik;
16. relative-position summaries bukan model confidence atau probability.

---

# 50. Bridge ke Topic 06 — Outlier: Sinyal untuk Diperiksa

Sekarang kita mempunyai:

- center;
- spread;
- distribution;
- quartiles;
- middle-50% IQR.

Pertanyaan berikutnya:

> **Bagaimana kita menandai observation yang cukup jauh dari bagian utama data untuk diperiksa lebih lanjut—tanpa otomatis menyebutnya error?**

Itulah pintu masuk ke:

**Topic 06 — Outlier: Sinyal untuk Diperiksa.**

---

# 51. Referensi Topic 05

Source ledger lengkap tersedia di `referensi-topic-05.md`.

- [R1] OpenStax — *2.3 Measures of the Location of the Data*.
- [R2] NIST — *Percentiles*.
- [R3] NIST — *Interquartile Range*.

---

# 52. Gerbang STOP

Topic 05 selesai pada scope:

**ordered data → relative position → percentile interpretation → percentage distinction → $Q_1,Q_2,Q_3$ → declared quartile convention → IQR → middle-50% spread → HerAI interpretation → convention safety.**

Topic 06 **belum diproduksi**.

> **Apakah Topic 05 Submodule 03 disetujui dan kita boleh melanjutkan ke Topic 06 — Outlier: Sinyal untuk Diperiksa?**
