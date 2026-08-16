# Topic 08 — Data Quality untuk AI: Angka yang Bisa Dihitung Belum Tentu Layak Dipakai

> **Submodule 03 — Statistics for AI: Membaca Pola dan Variasi Data**  
> **Filename:** `08-data-quality-untuk-ai.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar akademik/teknis campuran, termasuk non-IT  
> **Prerequisite:** Topic 01–07 Submodule 03 + representation semantics dari Submodule 01  
> **Boundary:** Topic ini membahas missingness, zero-vs-missing, inconsistent unit/scale, categorical/identifier codes yang tampak numerik, implausible/suspicious values, duplicates secara konseptual, target-class imbalance, serta audit-before-model workflow. Full preprocessing pipelines, advanced imputation, SMOTE/resampling derivations, weighting derivations, leakage engineering, fairness metrics, full model evaluation, dan production governance tetap ditunda.

---

# 1. Mengapa Topic Terakhir Ini Penting?

Sepanjang Submodule 03 kita sudah belajar menghitung dan membaca:

- mean;
- median;
- mode;
- range;
- variance;
- standard deviation;
- distribution;
- histogram;
- percentile;
- quartile;
- IQR;
- potential-outlier flag;
- covariance;
- correlation.

Tetapi ada satu pertanyaan yang lebih mendasar:

> **Apakah angka yang kita hitung memang merepresentasikan data yang benar dan bermakna?**

Sebuah komputer dapat menghitung mean dari column ID.

Sebuah script dapat menghitung correlation antara feature yang salah unit.

Sebuah model dapat menerima angka hasil encoding category.

Tetapi:

> **computationally valid belum tentu semantically valid.**

Google ML Crash Course membedakan numerical data yang benar-benar “berperilaku seperti angka” dari digit yang sebenarnya merepresentasikan categories seperti postal codes. [R2][R3]

Google juga menekankan kualitas dataset dan menyebut omitted values, duplicate examples, bad feature values, dan bad labels sebagai common causes of unreliable data. [R5]

---

# 2. Tujuan Pembelajaran

Setelah Topic 08, kamu diharapkan mampu:

1. menjelaskan mengapa data quality adalah bagian dari statistical reasoning;
2. membedakan missing value dari genuine zero;
3. mengenali blank, `NA`, dan `NaN` sebagai possible missing placeholders;
4. menjelaskan mengapa missing value tidak boleh otomatis diganti zero;
5. menjelaskan bahwa deleting incomplete rows dapat kehilangan informasi;
6. menjelaskan imputation sebagai deliberate strategy, bukan automatic truth;
7. mengenali inconsistent unit;
8. mengenali inconsistent numerical scale;
9. membedakan “feature memiliki range berbeda” dari “record memakai unit/scale yang salah”;
10. menjelaskan tujuan normalization secara benar;
11. menjelaskan mengapa normalization tidak memperbaiki bad semantics;
12. mengenali numeric-looking identifiers/categories;
13. menjelaskan mengapa arithmetic pada IDs dapat tidak meaningful;
14. mengenali duplicate candidate;
15. membedakan repeated entity dari duplicate record berdasarkan observational unit;
16. mengenali implausible/suspicious value sebagai signal untuk audit;
17. menjelaskan bahwa clean data ≠ no outliers;
18. menjelaskan class imbalance hanya ketika supervised target/label ada;
19. membedakan class imbalance dari uneven numerical feature distribution;
20. menghitung simple target-label frequencies;
21. menggunakan controlled corrupted copy tanpa mengganti canonical HerAI data;
22. melakukan schema/semantics/unit/missing/duplicate/target audit sebelum modeling;
23. menjelaskan mengapa scaling, deletion, dan imputation membutuhkan context;
24. menjelaskan bagaimana data-quality problems dapat merusak downstream AI reasoning;
25. menyusun safe “inspect → decide → document” workflow.

---

# 3. Canonical HerAI Tetap Menjadi Source of Truth

Canonical raw data tetap:

| Participant | Quiz correct | Quiz total | Completion done | Completion total | Study duration |
|---|---:|---:|---:|---:|---:|
| Alya | 8 | 10 | 6 | 8 | 45 min |
| Bima | 6 | 10 | 5 | 8 | 30 min |
| Citra | 9 | 10 | 8 | 8 | 55 min |
| Dewi | 7 | 10 | 4 | 8 | 40 min |

Derived:

$$
q=
0.80,\;0.60,\;0.90,\;0.70
$$

dan:

$$
c=
0.75,\;0.625,\;1.00,\;0.50.
$$

Topic 08 **tidak mengubah data ini**.

---

# 4. Controlled Corrupted Copy

Untuk belajar audit, package menyediakan:

`data-quality-audit-copy-topic-08.csv`

Statusnya:

> **synthetic instructional controlled-corruption dataset.**

Ia bukan real participant dataset dan tidak boleh mengganti canonical table.

Satu row dalam file audit berarti:

> satu participant-account snapshot dalam controlled audit copy.

Issues sengaja diinjeksi **sebelum analysis**, lalu dibekukan.

---

# 5. Audit Copy — Apa yang Sengaja Diubah?

| Record | Participant | Quiz ratio | Completion | Duration | Unit | Participant code | Support label |
|---|---|---:|---:|---:|---|---:|---|
| A01 | Alya | 0.80 | 0.75 | 45 | min | 101 | on_track |
| A02 | Bima | 60 | 0.625 | 30 | min | 102 | on_track |
| A03 | Citra | 0.90 | NA | 55 | min | 103 | on_track |
| A04 | Dewi | 0.70 | 0.50 | 0.6666667 | hour | 104 | needs_support |
| A05 | Alya | 0.80 | 0.75 | 45 | min | 101 | on_track |
| A06 | Bima | 0.60 | 0.625 | 30 | min | 102 | on_track |
| A07 | Citra | 0.90 | 1.00 | 55 | min | 103 | on_track |
| A08 | Dewi | 0.70 | 0.50 | 40 | min | 104 | on_track |

Controlled issues:

1. A02: quiz ratio scale mismatch;
2. A03: missing completion;
3. A04: mixed duration unit;
4. A01/A05: duplicate candidate;
5. `participant_code`: numeric-looking identifier;
6. `support_label`: synthetic imbalanced target for concept practice only.

---

# 6. Hook — “Datanya Angka Semua, Berarti Siap AI?”

Audit copy hampir seluruhnya terdiri dari digits.

Apakah itu berarti:

> “Semua columns bisa langsung masuk model sebagai numerical features?”

Tidak.

Contoh:

`participant_code = 101,102,103,104`

memang digits.

Tetapi apakah:

$$
104-101=3
$$

memiliki quantitative meaning tentang participant?

Tidak.

Google memberi contoh postal code: meskipun berupa angka, postal code tidak berperilaku sebagai quantity dan harus dipahami sebagai categorical data. [R2][R3]

---

# 7. Predict Before Cleaning

Sebelum membaca jawabannya, prediksi.

## Prediksi 1

A03 completion = `NA`.

Haruskah langsung diubah menjadi:

$$
0?
$$

## Prediksi 2

A02 quiz ratio = `60`, sementara records lain sekitar:

$$
0.60\text{ sampai }0.90.
$$

Haruskah langsung dilakukan normalization?

## Prediksi 3

A01 dan A05 terlihat sama.

Haruskah salah satunya langsung dihapus?

## Prediksi 4

`support_label` memiliki 7 `on_track` dan 1 `needs_support`.

Apakah ini sama dengan mengatakan `quiz_ratio` “imbalanced”?

Simpan jawaban.

---

# 8. Missing Value ≠ Zero

Misalkan:

| Learner | Number of late submissions |
|---|---:|
| A | 0 |
| B | NA |

`0` berarti:

> observed quantity diketahui dan nilainya zero.

`NA` berarti:

> value tidak tersedia/unknown/not recorded menurut representation yang dipakai.

Menyamakan keduanya menghancurkan semantics.

scikit-learn menjelaskan bahwa real-world missing values sering direpresentasikan dengan blanks, `NaN`, atau placeholders lain. [R1]

---

# 9. Math/Data Reading Skill — Zero dan Missing

Jika:

$$
x=0,
$$

kita memiliki numerical value zero.

Jika:

$$
x=\text{missing},
$$

kita **tidak memiliki observed numeric value yang sama dengan zero**.

Karena itu expression seperti:

$$
\bar{x}
=
\frac{\sum x_i}{n}
$$

memerlukan keputusan tentang bagaimana missing observations diperlakukan.

Kita tidak boleh diam-diam memasukkan missing sebagai zero.

---

# 10. Missingness Mengubah Pertanyaan Statistik

Canonical completion Citra:

$$
1.00.
$$

Audit row A03 mengubahnya menjadi:

`NA`.

Jika analyst secara salah mengganti:

$$
\text{NA}\to0,
$$

mean completion akan turun bukan karena participant benar-benar menyelesaikan 0%, tetapi karena **unknown value dipalsukan sebagai zero**.

Ini contoh:

> data cleaning decision dapat mengubah statistic.

---

# 11. Delete atau Impute?

scikit-learn menjelaskan salah satu basic strategy untuk incomplete data adalah membuang rows/columns yang missing, tetapi hal itu dapat kehilangan valuable data. Alternatifnya adalah imputation—mengisi missing values menggunakan strategy tertentu. [R1]

Topic ini tidak mengajarkan satu imputation method sebagai universal answer.

Pertanyaan awal yang lebih penting:

- kenapa missing?
- apakah missing random atau systematic secara operasional?
- apakah field wajib?
- apakah source lain tersedia?
- apakah record masih berguna?
- apakah imputation method sesuai semantics?

---

# 12. Imputation ≠ Menemukan “Nilai Asli”

Jika missing completion diisi mean:

> itu adalah **imputed value**, bukan bukti bahwa actual participant completion sama dengan mean.

scikit-learn menyediakan strategies seperti constant, mean, median, dan most-frequent untuk konteks tertentu. [R1]

Tetapi course lesson:

> imputation adalah transformation decision yang harus didokumentasikan.

Bukan truth recovery otomatis.

---

# 13. Inconsistent Scale — A02

Canonical Bima quiz ratio:

$$
0.60.
$$

Audit A02:

$$
60.
$$

Jika schema `quiz_ratio` seharusnya:

$$
0\le q\le1,
$$

maka:

$$
60
$$

adalah strong scale/schema inconsistency signal.

Kemungkinan:

- ratio vs percentage mix;
- parsing error;
- wrong source column;
- unit convention mismatch.

---

# 14. Range Check sebagai Data-Quality Tool

Jika feature definition mengatakan:

$$
q
=
\frac{\text{quiz correct}}{\text{quiz total}},
$$

maka untuk nonnegative correct/total dengan correct tidak melebihi total:

$$
0\le q\le1.
$$

Value:

$$
60
$$

tidak konsisten dengan representation contract itu.

Ini lebih kuat daripada sekadar berkata:

> “60 terlihat seperti outlier.”

Kita punya **semantic/schema evidence**.

---

# 15. Normalization Bukan Obat untuk Wrong Scale Semantics

Google menjelaskan normalization sebagai transformation agar numerical features berada pada scale/range yang lebih serupa untuk membantu training. [R4]

Namun A02 bukan sekadar:

> “feature A punya range besar, feature B range kecil.”

Masalahnya adalah:

> **records dalam variable yang sama memakai representation tidak konsisten.**

Blind normalization tidak menjawab:

> apakah `60` berarti 60%, 60 ratio-units, typo, atau wrong field?

Audit semantics dulu.

---

# 16. Inconsistent Units — A04

Canonical Dewi duration:

$$
40\text{ min}.
$$

Audit A04:

$$
0.6666667\text{ hour}.
$$

Kedua values kira-kira merepresentasikan duration yang sama.

Tetapi jika analyst mengabaikan column `study_duration_unit` dan hanya mengambil number:

$$
0.6666667
$$

maka Dewi tampak belajar jauh lebih singkat dari participant lain.

Problem-nya bukan “Dewi outlier.”

Problem-nya:

> **mixed units.**

---

# 17. Convert Setelah Semantics Jelas

Jika kita telah memverifikasi bahwa:

$$
1\text{ hour}=60\text{ min},
$$

maka:

$$
0.6666667\times60
\approx40\text{ min}.
$$

Setelah conversion yang documented, values dapat dibandingkan.

Workflow:

> identify unit → verify conversion → standardize → preserve provenance.

---

# 18. Same Scale vs Same Meaning

Dua columns dapat sama-sama berada pada:

$$
[0,1]
$$

tetapi belum tentu punya semantics sama.

Contoh:

- quiz ratio;
- completion ratio;
- binary flag.

Numerical range yang sama tidak membuat variables interchangeable.

Data quality selalu mencakup:

> meaning, bukan hanya scale.

---

# 19. Numeric-Looking Categories dan Identifiers

`participant_code`:

$$
101,\;102,\;103,\;104.
$$

Mean-nya secara komputer dapat dihitung:

$$
102.5.
$$

Tetapi apa arti “average participant code 102.5”?

Tidak ada natural quantitative interpretation dalam running case.

Google menjelaskan numbers juga dapat menjadi categorical data ketika digits hanyalah labels/codes, bukan quantities. [R3]

---

# 20. Encoding Tidak Memberi Arithmetic Meaning

Misalkan category:

- beginner → 1;
- intermediate → 2;
- advanced → 3.

Encoding ini belum otomatis membuat:

$$
3-1=2
$$

sebagai meaningful “distance kemampuan”.

Atau:

$$
2\times1=2
$$

sebagai meaningful operation.

Representation untuk model harus sesuai semantics.

---

# 21. Duplicate Candidate — A01 dan A05

A01 dan A05 mempunyai same participant dan same modeled fields.

Mereka terlihat seperti duplicate.

Google menyebut duplicate examples sebagai salah satu common cause of unreliable data. [R5]

Tetapi sebelum deletion, kita tetap perlu tahu observational unit.

---

# 22. Repeated Entity ≠ Duplicate secara Universal

Jika dataset:

> satu row = one participant account snapshot,

dua identical rows untuk Alya pada timestamp yang sama bisa jadi duplicate.

Tetapi jika dataset:

> satu row = one session,

Alya boleh muncul berkali-kali secara legitimate.

Jadi duplicate detection membutuhkan:

- observational-unit definition;
- keys;
- timestamp/context;
- source provenance.

---

# 23. Bad Feature Value dan Implausible Value

Google memberi contoh bad feature value dapat muncul karena extra digit atau measurement problem. [R5]

Topic 06 mengajarkan:

> unusual value → inspect.

Topic 08 menambahkan:

> bandingkan value dengan schema, unit, range, source, dan representation contract.

Contoh:

$$
q=60
$$

lebih mudah didiagnosis karena kita tahu field seharusnya ratio $0$–$1$.

---

# 24. Data Quality ≠ “Hapus Semua Outlier”

Dataset dapat clean dan tetap memiliki legitimate rare observations.

Sebaliknya dataset dapat tidak punya IQR-fence flag tetapi tetap bermasalah karena:

- missingness;
- wrong unit;
- duplicate;
- category code treated numeric;
- label errors.

Jadi:

> **clean data ≠ no outliers.**

---

# 25. Class Imbalance — Hanya Jika Ada Target Class

Audit copy menambahkan **synthetic instructional target**:

`support_label`

Counts:

- `on_track` = 7;
- `needs_support` = 1.

Total:

$$
n=8.
$$

Relative class frequencies:

$$
\frac{7}{8}=0.875=87.5\%
$$

dan:

$$
\frac{1}{8}=0.125=12.5\%.
$$

Google mendefinisikan class-imbalanced dataset ketika satu label/class jauh lebih umum daripada class lain; yang lebih umum disebut majority class dan yang lebih sedikit minority class. [R6]

---

# 26. Class Imbalance ≠ Uneven Feature Histogram

Misalkan `study_duration_min` lebih banyak berada di 30–50 menit daripada 50–70 menit.

Itu:

> distribution dari numerical feature.

Bukan otomatis:

> class imbalance.

Class imbalance membutuhkan:

> target/label categories dengan frequency yang tidak seimbang.

Blueprint Topic 08 sengaja membedakan dua konsep ini.

---

# 27. Synthetic Target Warning

`support_label` dalam audit copy adalah **instructional synthetic label**.

Ia bukan:

- diagnosis learner;
- real HerAI production target;
- prediction recommendation;
- probability;
- evidence bahwa Dewi membutuhkan support.

Label itu hanya dibuat untuk belajar **target-frequency audit**.

---

# 28. Worked Audit Example 1 — A02

Record:

| Field | Value |
|---|---|
| participant | Bima |
| quiz_ratio | 60 |
| completion_ratio | 0.625 |
| duration | 30 min |

## Step 1 — Schema

`quiz_ratio` expected:

$$
0\le q\le1.
$$

## Step 2 — Flag

$$
60>1.
$$

Schema mismatch.

## Step 3 — Compare source

Ada A06:

$$
q=0.60.
$$

## Step 4 — Hypotheses

- A02 mistakenly stores percentage-like 60;
- duplicate/conflicting pipeline;
- wrong transform.

## Step 5 — Decision

Belum asal:

$$
60\to0.60.
$$

Kita perlu provenance/source evidence.

Jika confirmed percentage scale:

$$
60\%
=
0.60.
$$

Lalu correct + document.

---

# 29. Worked Audit Example 2 — A03 Missing Completion

A03:

`completion_ratio = NA`

Do not compute:

$$
\text{NA}=0.
$$

Audit:

1. verify missing marker;
2. check source;
3. check whether completion can be reconstructed from done/total;
4. decide retain/drop/impute only after use-case/context;
5. record transformation.

Canonical source tells us Citra actually has:

$$
c=1.00.
$$

Dalam real workflow, jika canonical source benar-benar authoritative dan linkage valid, kita dapat restore from source.

Tetapi lesson point-nya:

> correction berasal dari provenance evidence, bukan tebakan statistik.

---

# 30. Worked Audit Example 3 — A04 Mixed Unit

A04:

$$
0.6666667\text{ hour}.
$$

Most other rows:

`min`.

Convert after verifying unit:

$$
0.6666667\times60
\approx40.000002\text{ min}.
$$

Round according to measurement policy if appropriate.

Again:

> conversion is semantic repair based on unit metadata.

---

# 31. Math/Data Reading Skill — Label Frequency

If:

$$
n_{\text{on}}=7
$$

and:

$$
n=8,
$$

observed label frequency:

$$
f_{\text{on}}
=
\frac{7}{8}
=
0.875.
$$

This says:

> 87.5% rows in **this synthetic audit copy** carry `on_track`.

It does **not** say:

> probability a future learner is on-track = 87.5%.

Probability/inference remain outside Submodule 03.

---

# 32. Change One Thing — Missing → Zero

Controlled completion values include:

- `NA` for A03.

Hypothetical wrong action:

$$
\text{NA}\to0.
$$

What changes?

- mean;
- variance;
- histogram;
- correlation with other variables;
- possibly model input distribution.

What does **not** become true?

> We still do not know that actual completion was zero.

Data transformation can create a precise number without creating truthful knowledge.

---

# 33. Change One Thing — Minutes → Hours tanpa Unit Column

Suppose all durations are converted to hours but header remains:

`study_duration_min`.

Then values may look:

$$
0.5,\;0.667,\;0.75,\;0.917.
$$

Numerically consistent.

Semantically mislabeled.

This demonstrates:

> a dataset can look statistically tidy while being wrong.

---

# 34. Why This Matters in AI

Data-quality issues can alter what a model learns.

Examples:

- missing values may block/alter preprocessing;
- mixed units distort distances/weights;
- scale inconsistency creates artificial extremes;
- category codes treated numeric create fake arithmetic relations;
- duplicates can overweight repeated records;
- bad labels teach wrong target mapping;
- severe target imbalance can leave too few minority examples for training.

Google's ML materials explicitly connect dataset quality, missing/unreliable data, numerical scaling, categorical semantics, and target imbalance to ML training behavior. [R2][R3][R4][R5][R6]

---

# 35. Normalization — Apa yang Bisa dan Tidak Bisa Dilakukan

Normalization dapat membantu ketika legitimate numerical features memiliki ranges berbeda. Google describes normalization as transforming features onto similar scales. [R4]

Normalization dapat:

- change scale;
- preserve relative numerical structure under selected method;
- help some model training processes.

Normalization tidak otomatis:

- fix wrong unit labels;
- restore missing values;
- turn IDs into quantities;
- remove duplicate semantics;
- repair wrong target labels.

---

# 36. Scaling ≠ Cleaning Semantics

Suppose participant code:

$$
101,\;102,\;103,\;104
$$

dinormalize ke:

$$
0,\;0.333,\;0.667,\;1.
$$

Sekarang numbers berada pada nice scale.

Tetapi participant code masih:

> identifier/category-like variable.

Transformation tidak menciptakan quantitative meaning.

---

# 37. Data Quality Checklist untuk Numerical Feature

Untuk setiap candidate numerical feature, tanyakan:

1. apa semantics-nya?
2. observational unit?
3. expected type?
4. expected unit?
5. expected range?
6. missing marker?
7. zero valid?
8. duplicates possible?
9. source/provenance?
10. measurement/update timing?
11. scale consistent?
12. transformations documented?

---

# 38. Data Quality Checklist untuk Categorical/Identifier Field

Tanyakan:

1. category atau identifier?
2. digits hanya code?
3. ordering meaningful?
4. arithmetic meaningful?
5. unseen/unknown category possible?
6. missing category representation?
7. encoding method preserve semantics?

---

# 39. Data Quality Checklist untuk Target/Label

Jika supervised target ada:

1. apa definisi label?
2. siapa/apa yang memberi label?
3. label errors mungkin?
4. class frequencies?
5. majority/minority?
6. target leakage risk?
7. timestamp/source consistent?
8. label synthetic atau observed?

Full leakage engineering dan label-quality methodology bukan core Topic ini, tetapi learner harus tahu target memerlukan audit sendiri.

---

# 40. Misconception Challenge 1 — “Missing = 0”

Salah.

Missing = unavailable/unknown/unrecorded representation.

Zero = observed numeric value zero.

---

# 41. Misconception Challenge 2 — “Normalize Dulu, Masalah Selesai”

Salah.

Normalization addresses scale.

Ia tidak memperbaiki semantic/schema corruption.

---

# 42. Misconception Challenge 3 — “Angka Berarti Numerical Feature”

Salah.

IDs dan category codes dapat berupa digits tetapi tidak mempunyai quantitative arithmetic meaning. [R2][R3]

---

# 43. Misconception Challenge 4 — “Duplicate = Nama Muncul Dua Kali”

Tidak selalu.

Jika observational unit = session, participant dapat muncul berkali-kali.

Duplicate harus didefinisikan sesuai keys/context.

---

# 44. Misconception Challenge 5 — “Imbalance = Histogram Feature Tidak Rata”

Salah.

Dalam classification context Topic ini, class imbalance berarti target label frequencies sangat tidak seimbang. [R6]

---

# 45. Misconception Challenge 6 — “Data Clean = Tidak Ada Outlier”

Salah.

Missing, duplicate, unit mismatch, bad labels, dan wrong semantics dapat ada tanpa statistical outlier flag.

---

# 46. Misconception Challenge 7 — “Imputation Mengembalikan True Value”

Tidak otomatis.

Imputation mengisi berdasarkan strategy.

Nilai hasilnya harus diperlakukan sebagai imputed/transformed value.

---

# 47. Try It Yourself 1 — Missing vs Zero

Field: `help_requests_count`.

Values:

$$
0,\;2,\;\text{NA},\;1.
$$

1. apa beda zero dan NA?
2. apa risiko mengganti NA→0?
3. information apa yang ingin diperiksa sebelum cleaning?

---

# 48. Try It Yourself 2 — Scale Audit

`quiz_ratio`:

$$
0.80,\;60,\;0.90,\;0.70.
$$

1. value mana melanggar expected ratio range?
2. tiga possible causes?
3. mengapa normalization bukan first fix?
4. source evidence apa yang dicari?

---

# 49. Try It Yourself 3 — Unit Audit

Durations:

- Alya: 45 min
- Bima: 30 min
- Citra: 55 min
- Dewi: 0.6667 hour

1. convert Dewi;
2. apakah raw number 0.6667 boleh dibandingkan langsung dengan 45?
3. apa yang harus disimpan dalam schema?

---

# 50. Try It Yourself 4 — Identifier Audit

Field:

`campus_id = 241111021, 241111022, ...`

1. apakah mean ID meaningful?
2. apakah min-max scaling membuatnya meaningful?
3. bagaimana field ini sebaiknya diperlakukan secara semantic?

---

# 51. Try It Yourself 5 — Class Imbalance

Synthetic labels:

- 18 `on_track`;
- 2 `needs_support`.

1. majority class?
2. minority class?
3. observed frequencies?
4. apakah ini sama dengan numerical feature spread?
5. apakah percentage ini probability future learner?

---

# 52. Visual / Interactive Specifications

## [STEP-BY-STEP REVEAL] Canonical → Controlled Corruption

**Purpose:** menunjukkan issue injection tanpa mengganti source of truth.

**Initial state:** canonical 4-row HerAI table.

**Reveal:**

1. clone menjadi audit copy;
2. A02 $0.60\to60$;
3. A03 completion → `NA`;
4. A04 `40 min` → `0.6667 hour`;
5. duplicate A01;
6. add numeric ID;
7. add synthetic imbalanced target.

**Safety:** persistent banner:

> `Instructional audit copy — canonical data unchanged.`

---

## [INTERACTIVE VISUAL] Data Quality Audit Dashboard

Columns:

- Semantics
- Missingness
- Unit
- Scale
- Range
- Duplicate candidate
- Type
- Target frequency

Learner clicks each field/record.

Feedback:

- `Inspect`
- `Needs source verification`
- `Potential schema mismatch`
- `No issue found under this check`

Avoid red “BAD DATA” as automatic final judgment.

---

## [COMPARE VIEW] Missing vs Zero

Left:

`0 — observed zero`

Right:

`NA — value unavailable`

Learner selects whether mean calculation should silently treat both equal.

Correct feedback:

> “No. Missingness needs an explicit handling decision.”

---

## [NUMBER MANIPULATOR] Scale vs Semantics

Show participant code:

$$
101,102,103,104.
$$

Button:

`Normalize to 0–1`

After transform, ask:

> “Did this become a meaningful quantitative feature?”

Expected:

> **No. Scale changed; semantics did not.**

---

# 53. Checkpoint 1

A field is stored as digits.

Can we conclude it is numerical quantitative?

**No.**

Need semantic meaning.

---

# 54. Checkpoint 2

Missing value is replaced by zero without justification.

What is the problem?

> unknown information has been converted into a specific observed quantity.

---

# 55. Checkpoint 3

One duration record uses hour while others use minutes.

What is first action?

> verify units and convert consistently with documented rule.

Not “delete outlier”.

---

# 56. Checkpoint 4

Target labels are 97% class A and 3% class B.

Is that feature spread?

**No.**

It is target-class imbalance.

---

# 57. Checkpoint 5

Two identical participant rows appear.

Delete one immediately?

**Not before confirming observational unit, keys, timestamps, and provenance.**

---

# 58. Mastery Check

Pastikan kamu dapat mengatakan:

- [ ] **I can** membedakan missing dan zero.
- [ ] **I can** mengenali missing placeholders.
- [ ] **I can** menjelaskan deletion/imputation sebagai decisions, bukan automatic truth.
- [ ] **I can** mengenali inconsistent scale.
- [ ] **I can** mengenali mixed units.
- [ ] **I can** membedakan unit repair dari normalization.
- [ ] **I can** menjelaskan normalization tidak memperbaiki semantics.
- [ ] **I can** mengenali numeric-looking IDs/categories.
- [ ] **I can** menjelaskan arithmetic pada identifier dapat tidak meaningful.
- [ ] **I can** mengenali duplicate candidate.
- [ ] **I can** menggunakan observational unit untuk menilai duplicate.
- [ ] **I can** membedakan class imbalance dari numerical feature distribution.
- [ ] **I can** menghitung label frequencies.
- [ ] **I can** menjelaskan no-outlier ≠ clean data.
- [ ] **I can** menggunakan schema/range checks.
- [ ] **I can** menjaga canonical data terpisah dari controlled corrupted copy.
- [ ] **I can** melakukan inspect → decide → document workflow.
- [ ] **I can** menjelaskan dampak data quality terhadap downstream AI reasoning.

---

# 59. Yang Sengaja Belum Dibahas

Topic ini tidak menjadi full preprocessing course.

Deferred:

- advanced missingness mechanisms;
- multiple-imputation theory;
- learned imputers in depth;
- SMOTE;
- class-resampling implementation;
- class-weight derivations;
- feature-selection pipelines;
- leakage engineering;
- fairness metrics;
- train/validation/test pipeline design;
- schema tooling implementation;
- data contracts implementation;
- drift monitoring;
- automated feature stores;
- model evaluation.

---

# 60. Ringkasan Substantif Topic 08

Data quality berarti lebih dari “tidak ada null”.

Kita belajar:

1. **missing ≠ zero**;
2. missing dapat berupa blank, `NA`, `NaN`, atau placeholder lain;
3. delete/impute perlu deliberate decision;
4. imputation bukan proof true value;
5. mixed units dapat membuat false numerical pattern;
6. inconsistent scale dapat membuat false extreme;
7. normalization menyamakan scale, bukan memperbaiki wrong semantics;
8. digit-based IDs/categories tidak otomatis quantitative;
9. duplicate harus dinilai dengan observational-unit/key context;
10. schema/range dapat membantu flag bad feature values;
11. clean data tidak berarti tanpa outlier;
12. class imbalance berarti target-label frequency imbalance;
13. class imbalance berbeda dari uneven numerical feature distribution;
14. controlled audit copy hanya instructional dan canonical HerAI tetap unchanged;
15. data transformations harus documented;
16. statistics dan AI hanya sebaik semantics/data yang menjadi input.

---

# 61. Bridge — Submodule 03 Selesai Secara Topic Coverage

Kita sudah melewati delapan topics:

1. Dari Matrix ke Dataset Statistik
2. Mean, Median, Mode
3. Range, Variance, Standard Deviation
4. Distribution dan Histogram
5. Percentile, Quartile, dan IQR
6. Outlier: Sinyal untuk Diperiksa
7. Covariance, Correlation, dan Association
8. Data Quality untuk AI

Tetapi **final combined assessment Submodule 03 belum dibuat**.

Sesuai production gate, consolidation/final assessment hanya boleh dibuat setelah Topic 08 explicitly approved.

---

# 62. Referensi Topic 08

Source ledger lengkap tersedia di `referensi-topic-08.md`.

- [R1] scikit-learn — *Imputation of missing values*
- [R2] Google ML Crash Course — *Working with numerical data*
- [R3] Google ML Crash Course — *Working with categorical data*
- [R4] Google ML Crash Course — *Numerical data: Normalization*
- [R5] Google ML Crash Course — *Datasets: Data characteristics*
- [R6] Google ML Crash Course — *Datasets: Class-imbalanced datasets*

---

# 63. Gerbang STOP

Topic 08 selesai pada scope:

**missing vs zero → missing handling reasoning → unit/scale consistency → schema/range checks → numeric code semantics → duplicate reasoning → target-class imbalance → controlled HerAI audit copy → normalization boundary → AI data-quality workflow.**

**Final combined Submodule 03 assessment BELUM diproduksi.**

> **Apakah Topic 08 Submodule 03 disetujui dan kita boleh melanjutkan ke final consolidation + combined assessment Submodule 03?**
