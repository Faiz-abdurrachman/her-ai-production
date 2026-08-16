# Final Integrated Exercises — Submodule 03 Statistics for AI

> **8 soal terbuka terintegrasi.**  
> Jawab dengan calculation **dan** interpretation. Jangan membuat probability, causality, atau population claim yang tidak didukung.

---

# Soal 1 — Dari Matrix ke Pertanyaan Statistik

Gunakan canonical matrix:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80&0.75\\
0.60&0.625\\
0.90&1.00\\
0.70&0.50
\end{bmatrix}.
$$

Kolom pertama = quiz ratio $q$, kolom kedua = completion ratio $c$.

### Tugas

1. Jelaskan observational unit dan arti satu row.
2. Jelaskan arti satu column.
3. Apakah `participant_code = 101,102,103,104` boleh langsung ditambahkan sebagai numerical feature hanya karena berbentuk digits? Jelaskan.
4. Jika rows diacak tetapi participant labels ikut bergerak bersama rows, apakah mean tiap column berubah?
5. Jika $q$ diacak independen dari $c$, apakah univariate mean masing-masing berubah?
6. Apa yang dapat rusak jika $q$ diacak independen dari $c$?
7. Jelaskan bedanya **computational validity** dan **semantic validity**.

**Anchor:** Topic 01, dengan bridge ke Topic 07–08.

---

# Soal 2 — Center dan Spread Tidak Menjawab Hal yang Sama

Gunakan study duration:

$$
30,\;40,\;45,\;55.
$$

### Tugas

1. Hitung mean dan median.
2. Hitung range.
3. Dengan descriptive course convention, hitung variance.
4. Hitung standard deviation.
5. Jelaskan units dari range, variance, dan SD.
6. Bandingkan dengan dataset hypothetical:

$$
40,\;42,\;43,\;45.
$$

Kedua dataset mempunyai mean:

$$
42.5.
$$

Apa insight utamanya?
7. Apakah dataset dengan SD lebih besar otomatis “lebih buruk”? Jelaskan.

**Anchor:** Topic 02–03.

---

# Soal 3 — Distribution, Histogram, dan Representation Choice

Gunakan frozen supplementary duration Topic 04. Salah satu binning:

$$
[20,30),[30,40),[40,50),[50,60),[60,70]
$$

dengan counts:

$$
2,\;7,\;8,\;5,\;2.
$$

### Tugas

1. Verifikasi total observations.
2. Hitung relative frequency untuk bin $[40,50)$.
3. Apakah relative frequency itu future-session probability? Jelaskan.
4. Jika boundaries diubah, apakah raw observations berubah?
5. Jelaskan dua risiko:
   - bins terlalu lebar;
   - bins terlalu sempit.
6. Apakah histogram yang tampak “bell-shaped” membuktikan normal distribution?
7. Mengapa histogram perlu dibaca bersama center/spread dan data semantics?

**Anchor:** Topic 04, dengan bridge ke Topic 02–03 dan safety Probability boundary.

---

# Soal 4 — Quartile, IQR, dan Relative Position

Canonical quiz ratio setelah sorting:

$$
0.60,\;0.70,\;0.80,\;0.90.
$$

Gunakan course median-of-halves convention.

### Tugas

1. Hitung $Q_1,Q_2,Q_3$.
2. Hitung IQR.
3. Jelaskan arti middle 50%.
4. Apakah $Q_1=0.65$ harus merupakan observed raw value?
5. Jelaskan mengapa “75th percentile = raw score 75%” salah.
6. Mengapa dua software dapat memberi quartile sedikit berbeda pada small dataset?
7. Bandingkan IQR dengan full range.

**Anchor:** Topic 05.

---

# Soal 5 — Flag Bukan Vonis

Gunakan hasil Soal 4.

### Tugas

1. Hitung lower dan upper IQR fence.
2. Apakah ada canonical quiz value yang ter-flag?
3. Apakah “tidak ada flag” berarti data clean?
4. Hypothetically tambahkan/ubah satu observation sehingga muncul value:

$$
1.50.
$$

Anggap quartile/fence lama hanya sebagai first quick check. Apa yang harus dilakukan sebelum menyebut value tersebut error?
5. Buat workflow minimal:
   - flag;
   - verify;
   - inspect;
   - decide.
6. Berikan satu contoh **verified error** dan satu **valid rare case**.
7. Mengapa blanket deletion dapat merusak AI dataset?

**Anchor:** Topic 06, dengan bridge ke Topic 08.

---

# Soal 6 — Covariance, Correlation, dan Causation Audit

Canonical:

$$
q=
0.80,\;0.60,\;0.90,\;0.70
$$

$$
t=
45,\;30,\;55,\;40.
$$

Diketahui:

$$
\bar q=0.75,\qquad\bar t=42.5.
$$

### Tugas

1. Hitung paired deviations.
2. Hitung product paired deviations.
3. Tunjukkan bahwa:

$$
\operatorname{cov}_{\text{desc}}(q,t)=1.00.
$$

4. Jelaskan unit covariance.
5. Diketahui:

$$
r_{q,t}\approx0.992.
$$

Interpretasikan secara aman.
6. Jika duration dikonversi dari minutes ke seconds, apa yang terjadi pada covariance dan correlation?
7. Audit claim:

> “Karena $r=0.992$, belajar lebih lama menyebabkan nilai quiz naik.”

8. Mengapa $n=4$ sangat penting untuk interpretation?

**Anchor:** Topic 07.

---

# Soal 7 — Controlled Data Quality Audit

Gunakan `data/data-quality-audit-copy-topic-08.csv`.

Audit copy sengaja mengandung:

- A02 scale mismatch;
- A03 missing value;
- A04 mixed unit;
- A01/A05 duplicate candidate;
- numeric participant code;
- synthetic target imbalance.

### Tugas

Untuk setiap issue:

1. identify field/record;
2. classify issue;
3. jelaskan evidence;
4. jelaskan next action;
5. jelaskan apa yang harus documented;
6. sebutkan satu statistik/AI consequence jika issue diabaikan.

Tambahan:

7. Mengapa `NA→0` bukan neutral cleaning?
8. Mengapa normalization tidak memperbaiki `participant_code` semantics?
9. Mengapa duplicate candidate membutuhkan observational-unit/key context?

**Anchor:** Topic 08, integrated dengan seluruh submodule.

---

# Soal 8 — End-to-End HerAI Data Reasoning

Seorang analyst menulis report:

> “Citra memiliki quiz ratio 0.90 dan completion ratio 1.00. Karena quiz-completion correlation sekitar 0.832 dan quiz-duration correlation 0.992, Citra pasti sukses karena belajar lebih lama. Dataset sudah clean karena tidak ada outlier pada canonical quiz ratio. Kita juga dapat mengganti semua missing values dengan zero dan menormalisasi semua digit columns supaya siap AI.”

### Tugas

Audit report tersebut baris demi baris.

Minimal identifikasi dan koreksi:

1. raw ratio vs probability;
2. small-$n$ association;
3. correlation vs causation;
4. no-outlier vs clean data;
5. missing vs zero;
6. normalization vs semantics;
7. digit code vs quantitative variable;
8. observation-level vs population-level conclusion;
9. apa yang data canonical benar-benar support;
10. apa yang memerlukan data/evidence/metode tambahan.

Akhiri dengan versi conclusion yang **descriptive, defensible, dan beginner-safe**.

**Anchor:** Semua Topic 01–08.
