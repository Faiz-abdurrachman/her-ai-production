# Topic 03 — Data Diagnostics
## Submodule 07 — Integrated Case Study: Math for AI di HerAI

> **Case status:** Topic ini memakai **canonical participant records dan matching outputs yang sama** dari Topic 01–02. Nilai participant/material profile tambahan tetap **SINTETIK / PEDAGOGIS / INSTRUKSIONAL**. Analisis statistik pada empat peserta ini adalah latihan membaca data kecil—bukan klaim tentang populasi peserta HerAI dan bukan evaluasi sistem produksi.

---

# 1. HOOK / REAL PROBLEM — Ranking sudah ada. Apakah kita langsung percaya?

Pada Topic 02 kita sudah mempunyai **matching scores** antara participant profile dan candidate-material profile.

Contoh:

- Alya memiliki cosine similarity tertinggi dengan **Intro AI**;
- Bima dengan **Belajar Python**;
- Citra dengan **Matematika Dasar**;
- Dewi dengan **Desain UI/UX**.

Tetapi sebelum bergerak ke uncertainty dan probability, ada pertanyaan yang lebih dasar:

> **Apakah data yang kita gunakan cukup masuk akal, konsisten, dan informatif untuk dibaca?**

Sistem yang memiliki formula matching yang benar tetap bisa menghasilkan reasoning buruk jika:

- ada nilai yang mustahil;
- ada missing value yang diam-diam dianggap nol;
- satu peserta sangat berbeda dari yang lain tetapi langsung dihapus;
- mean dipakai tanpa melihat spread;
- correlation dibaca sebagai causation;
- ranking tipis dipresentasikan seperti keputusan yang sangat kuat;
- empat observation diperlakukan seperti representasi seluruh populasi.

Jadi Topic 03 tidak bertanya “siapa pemenangnya?”

Topic 03 bertanya:

> **Apa yang sebenarnya dikatakan data kita, seberapa bervariasi nilainya, pola apa yang terlihat, dan apa yang belum boleh disimpulkan?**

---

# 2. PREDICT — Dua ranking yang sama-sama top-1 belum tentu sama kuat

Lihat dua pasangan top-1 berikut:

- Citra → Matematika Dasar: cosine $\approx 0.9081$
- Dewi → Desain UI/UX: cosine $\approx 0.8867$

Sekilas Citra mempunyai score lebih tinggi.

Tetapi bagaimana dengan candidate kedua?

Untuk Citra:

- Matematika Dasar $\approx 0.9081$
- Intro AI $\approx 0.9056$

Selisihnya hanya:

$$
0.9081-0.9056 \approx 0.0025.
$$

Untuk Dewi:

- Desain UI/UX $\approx 0.8867$
- Belajar Python $\approx 0.7117$

Selisihnya:

$$
0.8867-0.7117=0.1750.
$$

Pertanyaan:

> Apakah “top-1” Citra dan “top-1” Dewi mempunyai konteks diagnostik yang sama?

Tidak.

Keduanya memang top-1 **menurut cosine**, tetapi bentuk score landscape-nya sangat berbeda.

Ini contoh kenapa statistik deskriptif dan diagnostics penting sebelum kita mulai berbicara tentang uncertainty.

---

# 3. LEARNING OUTCOMES

Setelah menyelesaikan Topic 03, kamu diharapkan mampu:

1. membaca canonical mini-dataset sebagai kumpulan observations dan variables;
2. menghitung mean, median, range, population-style variance, dan standard deviation pada dataset kecil;
3. menjelaskan apa yang center dan spread tunjukkan—dan apa yang tidak ditunjukkan;
4. membandingkan distributions secara sederhana tanpa menganggap satu summary number sudah cukup;
5. mengenali potential outlier sebagai **signal to investigate**, bukan otomatis “data salah”;
6. membaca scatter/correlation sebagai association, bukan causation;
7. mengidentifikasi data-quality failures seperti missingness, invalid range, inconsistent scale, duplicate record, dan semantic mismatch;
8. membaca ranking margin sebagai **derived matching diagnostic**, bukan probability atau confidence;
9. menjelaskan mengapa empat synthetic observations tidak mewakili populasi HerAI;
10. menyiapkan data reasoning untuk Topic 04 — Uncertainty.

---

# 4. REACTIVATE ONLY WHAT IS NEEDED

Kita tidak mengulang seluruh Statistics submodule.

Kita hanya mengaktifkan kembali alat yang diperlukan untuk kasus ini.

## 4.1 Center

Center membantu menjawab:

> “Di sekitar nilai berapa data berada?”

Kita akan memakai:

- mean;
- median.

## 4.2 Spread

Spread membantu menjawab:

> “Seberapa tersebar nilai-nilai tersebut?”

Kita akan memakai:

- range;
- variance;
- standard deviation.

## 4.3 Distribution shape

Summary number tidak menunjukkan semua bentuk data.

Karena itu kita tetap melihat:

- individual observations;
- ordered values;
- simple dot/strip plot;
- scatter plot ketika dua variables dibandingkan.

## 4.4 Association

Correlation membantu merangkum **linear association**.

Tetapi:

> **correlation $\neq$ causation.**

## 4.5 Data quality

Sebelum menghitung summary, kita harus memeriksa apakah data:

- ada;
- berada pada range yang benar;
- memakai unit yang konsisten;
- tidak duplikat secara keliru;
- mempunyai definisi field yang stabil.

---

# 5. EXPLORE THE SAME CANONICAL CASE

## 5.1 Canonical participant context table

| Peserta | Quiz ratio $q$ | Completion ratio $c$ | Study duration | $h(q,c)$ |
|---|---:|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 menit | 0.78 |
| Bima | 0.60 | 0.625 | 30 menit | 0.61 |
| Citra | 0.90 | 1.00 | 55 menit | 0.94 |
| Dewi | 0.70 | 0.50 | 40 menit | 0.62 |

Remember:

$$
h(q,c)=0.6q+0.4c
$$

tetap **constructed instructional score only**.

Topic ini boleh menganalisis distribution dari $h$, tetapi itu **tidak mengubah semantic type-nya**.

---

# 6. FORMAL SYSTEM ROLE — DATA DIAGNOSTICS BUKAN “MEMBUKTIKAN MODEL BAGUS”

Data diagnostics dalam kasus ini mempunyai empat role:

1. **describe** — merangkum center dan spread;
2. **inspect** — melihat observation yang tidak biasa;
3. **validate** — memeriksa contract dan kualitas field;
4. **warn** — menunjukkan pola yang perlu ditafsirkan hati-hati.

Data diagnostics **bukan**:

- causal inference;
- production validation;
- proof of educational effectiveness;
- proof that matching metric is optimal;
- proof that top-1 recommendation is correct.

---

# 7. NOTATION DAN MATHEMATICAL CONVENTION

Untuk satu variable $x$ dengan $n$ observations:

$$
x_1,x_2,\ldots,x_n.
$$

Mean:

$$
\bar[0.71040305 0.71170489 0.88667812 0.6558849 ]
=
\frac{1}{n}
\sum_{i=1}^n x_i.
$$

Untuk core descriptive mini-dataset kita tetap memakai **population-style variance**, sesuai contract Math for AI sebelumnya:

$$
\sigma^2
=
\frac{1}{n}
\sum_{i=1}^n
(x_i-\bar{x})^2.
$$

Standard deviation:

$$
\sigma=\sqrt{\sigma^2}.
$$

Range:

$$
R=x_{\max}-x_{\min}.
$$

> **Scope note:** statistik literatur sering memakai sample variance dengan denominator $n-1$. Itu valid dalam konteks estimation. Di case ini kita sedang mendeskripsikan **empat records yang sengaja ditetapkan sebagai keseluruhan tiny pedagogical dataset**, sehingga computation requirement tetap population-style $1/n$. Kita tidak sedang melakukan population inference.

---

# 8. MATH / SYSTEM READING SKILL — MEMBACA SUMMARY STATISTIC

Untuk setiap summary, jawab:

1. **Object:** variable apa yang dirangkum?
2. **Input:** observations mana yang masuk?
3. **Operation:** mean? variance? correlation?
4. **Output:** scalar berapa?
5. **Semantic type:** descriptive statistic atau quantity lain?
6. **Assumptions:** dataset mana yang dianggap tercakup?
7. **Justified conclusion:** apa yang boleh dikatakan?
8. **Unjustified conclusion:** apa yang tidak boleh dikatakan?
9. **Downstream role:** keputusan/diagnostic apa yang dibantu?

Contoh:

$$
\bar{q}=0.75.
$$

Justified:

> “Mean quiz ratio pada empat canonical participant records adalah $0.75$.”

Tidak justified:

> “Rata-rata quiz ratio seluruh peserta HerAI pasti $75\%$.”

Empat synthetic/canonical records kita tidak dipilih sebagai representative sample populasi.

---

# 9. WORKED BASIC MICRO-EXAMPLE — MEAN DAN MEDIAN

Gunakan quiz ratio:

$$
0.80,\ 0.60,\ 0.90,\ 0.70.
$$

## 9.1 Mean

$$
\bar{q}
=
\frac{0.80+0.60+0.90+0.70}{4}
=
\frac{3.00}{4}
=
0.75.
$$

## 9.2 Median

Urutkan:

$$
0.60,\ 0.70,\ 0.80,\ 0.90.
$$

Karena $n=4$, median adalah mean dari dua nilai tengah:

$$
\tilde{q}
=
\frac{0.70+0.80}{2}
=
0.75.
$$

Pada $q$, mean dan median sama:

$$
\bar{q}=\tilde{q}=0.75.
$$

Apakah ini berarti distribution “normal”?

Tidak.

Empat points terlalu sedikit untuk menarik klaim distributional seperti itu, dan kesamaan mean/median sendiri tidak membuktikan bentuk distribution tertentu.

---

# 10. WORKED HerAI EXAMPLE — COMPLETION RATIO: CENTER DAN SPREAD

Completion ratios:

$$
0.75,\ 0.625,\ 1.00,\ 0.50.
$$

## 10.1 Mean

$$
\bar{c}
=
\frac{0.75+0.625+1.00+0.50}{4}
=
\frac{2.875}{4}
=
0.71875.
$$

## 10.2 Median

Urutkan:

$$
0.50,\ 0.625,\ 0.75,\ 1.00.
$$

Median:

$$
\tilde{c}
=
\frac{0.625+0.75}{2}
=
0.6875.
$$

## 10.3 Range

$$
R_c=1.00-0.50=0.50.
$$

Jadi dua summary center memberi perspektif sedikit berbeda:

- mean $=0.71875$;
- median $=0.6875$.

Dan spread kasar dari minimum ke maksimum adalah $0.50$.

---

# 11. VARIANCE DAN STANDARD DEVIATION — LANGKAH MANUAL

Masih gunakan completion ratio.

Mean:

$$
\bar{c}=0.71875.
$$

Deviation:

| Peserta | $c_i$ | $c_i-\bar{c}$ | $(c_i-\bar{c})^2$ |
|---|---:|---:|---:|
| Alya | 0.750 | 0.03125 | 0.0009765625 |
| Bima | 0.625 | -0.09375 | 0.0087890625 |
| Citra | 1.000 | 0.28125 | 0.0791015625 |
| Dewi | 0.500 | -0.21875 | 0.0478515625 |

Jumlah squared deviations:

$$
0.0009765625
+
0.0087890625
+
0.0791015625
+
0.0478515625
=
0.13671875.
$$

Population-style variance:

$$
\sigma_c^2
=
\frac{0.13671875}{4}
=
0.0341796875.
$$

Standard deviation:

$$
\sigma_c
=
\sqrt{0.0341796875}
\approx
0.1849.
$$

Interpretasi:

> Completion ratio pada empat records mempunyai standard deviation sekitar $0.1849$ dalam unit ratio.

Bukan:

> “Data completion jelek karena standard deviation-nya besar.”

“Besar” atau “kecil” harus ditafsirkan relatif terhadap scale, konteks, dan tujuan.

---

# 12. DIAGNOSTIC SUMMARY TABLE

Semua perhitungan berikut direcompute dari canonical records:

| Variable | Mean | Median | Range | Population variance | Population SD |
|---|---:|---:|---:|---:|---:|
| Quiz ratio $q$ | 0.7500 | 0.7500 | 0.3000 | 0.012500 | 0.1118 |
| Completion $c$ | 0.7188 | 0.6875 | 0.5000 | 0.034180 | 0.1849 |
| Duration (menit) | 42.5000 | 42.5000 | 25.0000 | 81.250000 | 9.0139 |
| $h(q,c)$ | 0.7375 | 0.7000 | 0.3300 | 0.018219 | 0.1350 |

## 12.1 Apa yang dapat dilihat?

- completion mempunyai range ratio lebih lebar daripada quiz ratio dalam mini-dataset;
- duration tersebar dari 30 hingga 55 menit;
- $h$ mempunyai mean $0.7375$, tetapi tetap merupakan constructed score;
- tidak ada summary di atas yang membuktikan educational outcome.

## 12.2 Apa yang hilang jika hanya melihat mean?

Jika hanya melihat:

$$
\bar{h}=0.7375,
$$

kita tidak langsung tahu bahwa actual scores adalah:

$$
0.61,\ 0.62,\ 0.78,\ 0.94.
$$

Mean menyederhanakan data.
Itu berguna, tetapi juga membuang detail.

---

# 13. DISTRIBUTION — LIHAT DATA, JANGAN HANYA SUMMARY

Dengan empat observations, histogram formal tidak terlalu informatif.

Lebih masuk akal menggunakan simple ordered values atau dot plot.

Quiz ratio:

```text
0.60     0.70     0.80     0.90
 Bima     Dewi     Alya     Citra
```

Completion ratio:

```text
0.50      0.625      0.75                    1.00
Dewi       Bima       Alya                    Citra
```

Pertanyaan diagnostik:

- apakah ada gap besar?
- apakah satu observation jauh dari yang lain?
- apakah field punya range yang masuk akal?
- apakah satu summary cukup?

Dengan $n=4$, kita harus lebih berhati-hati daripada lebih percaya diri.

---

# 14. OUTLIER — SIGNAL TO INVESTIGATE, BUKAN TOMBOL DELETE

Pada canonical duration:

$$
30,\ 40,\ 45,\ 55.
$$

Tidak ada alasan kuat dari inspeksi sederhana untuk langsung menghapus satu observation.

Sekarang buat **COUNTERFACTUAL DATA-QUALITY EXAMPLE**, bukan canonical data:

$$
30,\ 40,\ 45,\ 180.
$$

Nilai $180$ menit tampak sangat jauh.

Tetapi langkah yang benar bukan:

> “Delete karena outlier.”

Pertanyaan yang lebih aman:

1. apakah 180 salah input?
2. apakah unit berubah dari menit ke sesuatu yang lain?
3. apakah learner memang belajar lama?
4. apakah session tracker menghitung idle time?
5. apakah event log duplicate?
6. apakah record berasal dari kondisi berbeda?

Outlier dapat mengandung error **atau** informasi penting.

---

# 15. DATA QUALITY CONTRACT

## 15.1 Missingness

Misalkan `study_duration_min` Bima hilang.

Jangan diam-diam mengganti:

```text
missing → 0
```

karena:

- `0` berarti nilai yang benar-benar diamati nol menit;
- missing berarti **tidak ada nilai yang tersedia**.

Itu dua semantic states berbeda.

## 15.2 Invalid range

Untuk completion ratio, contract case adalah:

$$
0\le c\le1.
$$

Jika muncul:

$$
c=1.20,
$$

itu memerlukan audit.

Kemungkinan:

- field bukan ratio;
- denominator salah;
- duplicate event;
- transformation bug;
- definisi field berubah.

## 15.3 Inconsistent scale

Participant profile memakai $0$–$1$.

Jika satu record tiba-tiba memakai `80` untuk AI interest sementara yang lain memakai `0.8`, matching calculation akan terdistorsi.

## 15.4 Duplicate identity

Dua baris bernama Bima belum tentu duplicate—mungkin participant_id berbeda.

Sebaliknya, dua row dengan participant_id sama bisa menjadi duplicate tidak disengaja.

Karena itu identifier contract penting.

## 15.5 Semantic mismatch

Field bernama `score` sangat berbahaya jika tidak dijelaskan.

Score apa?

- quiz ratio?
- $h$?
- cosine similarity?
- model output?
- evaluation metric?

Data quality juga berarti **quality of meaning**, bukan hanya tidak ada `NaN`.

---

# 16. CORRELATION — POLA KUAT YANG TETAP TIDAK BOLEH JADI CAUSATION

Gunakan canonical variables:

- study duration: $30,40,45,55$ bila diurut berdasarkan value;
- quiz ratio sesuai participant pairs.

Dari empat canonical participant records, Pearson correlation antara duration dan quiz ratio adalah sekitar:

$$
r_{\mathrm{duration},q}
\approx
0.9923.
$$

Angka ini sangat dekat ke $1$.

Godaan yang salah:

> “Berarti belajar lebih lama menyebabkan quiz score lebih tinggi.”

Tidak.

Yang didukung:

> “Pada empat canonical pedagogical records ini, duration dan quiz ratio menunjukkan strong positive linear association.”

Yang **tidak** didukung:

- causation;
- effect size pada populasi;
- universal learner behavior;
- recommendation policy;
- statement “tambah 10 menit pasti menaikkan score”.

Mengapa?

- hanya empat observations;
- case ini pedagogical;
- tidak ada randomized intervention;
- banyak potential confounders;
- correlation hanya merangkum association.

---

# 17. MENGAPA SMALL-$n$ BISA MENIPU INTUISI?

Dengan $n=4$, satu perubahan record dapat mengubah correlation secara dramatis.

Ini penting karena learner sering melihat:

$$
r\approx0.99
$$

dan menganggap “evidence sangat kuat”.

Tetapi numerical magnitude tidak menghapus context.

Kita perlu menanyakan:

- berapa observations?
- bagaimana data dikumpulkan?
- apakah points representative?
- adakah leverage/outlier?
- apakah relationship linear?
- apakah claim hanya descriptive atau inferential?

Topic 03 berhenti pada **descriptive diagnostics**.

Formal inference bukan scope kita.

---

# 18. REACTIVATE OUTPUT TOPIC 02 — MATCHING MATRIX

Primary instructional matching score dari Topic 02 adalah cosine similarity.

| Participant | Intro AI | Belajar Python | Desain UI/UX | Matematika Dasar |
|---|---:|---:|---:|---:|
| Alya | 0.9257 | 0.7523 | 0.5485 | 0.8753 |
| Bima | 0.8612 | 0.8907 | 0.6258 | 0.7813 |
| Citra | 0.9056 | 0.6828 | 0.4594 | 0.9081 |
| Dewi | 0.7104 | 0.7117 | 0.8867 | 0.6559 |

Reminder:

> cosine similarity = **matching score**, bukan probability.

---

# 19. RANKING MARGIN SEBAGAI DIAGNOSTIC, BUKAN CONFIDENCE

Definisikan untuk diagnostic sederhana:

$$
\Delta_p
=
s_{p,(1)}-s_{p,(2)},
$$

dengan:

- $s_{p,(1)}$ = top cosine score participant $p$;
- $s_{p,(2)}$ = second-highest cosine score.

Ini adalah **derived ranking-gap diagnostic**.

Bukan probability.
Bukan confidence.
Bukan uncertainty probability.

Canonical values:

| Participant | Top-1 | Top-2 | $\Delta_p$ |
|---|---|---|---:|
| Alya | Intro AI 0.9257 | Matematika Dasar 0.8753 | 0.0504 |
| Bima | Belajar Python 0.8907 | Intro AI 0.8612 | 0.0295 |
| Citra | Matematika Dasar 0.9081 | Intro AI 0.9056 | 0.0025 |
| Dewi | Desain UI/UX 0.8867 | Belajar Python 0.7117 | 0.1750 |

## 19.1 Diagnostic interpretation

Citra mempunyai ranking yang sangat dekat di top two.

Justified:

> “Cosine top-two gap Citra sangat kecil pada synthetic feature space ini.”

Tidak justified:

> “Sistem hanya 0.25% yakin.”

$\Delta_p$ bukan probability.

---

# 20. CHANGE ONE THING / WHAT-IF — SATU CORRUPTED RECORD

Gunakan **COUNTERFACTUAL**, bukan canonical dataset:

Dewi:

```text
uiux_interest = 90
```

padahal contract semua profile adalah $[0,1]$.

Apa dampaknya?

- norm Dewi berubah ekstrem;
- dot product berubah;
- cosine direction bisa berubah;
- ranking dapat terdistorsi;
- hasil mathematical calculation mungkin tetap “valid” secara arithmetic tetapi **invalid secara data contract**.

Pelajaran:

> mathematical correctness tidak bisa menggantikan data-quality correctness.

---

# 21. WHY THIS MATTERS IN AI

AI pipeline sering mengubah data berkali-kali:

```text
raw record
→ cleaned field
→ engineered feature
→ vector
→ score
→ model input/output
→ metric
```

Jika anomaly atau semantic error masuk pada awal pipeline, downstream calculation dapat tetap terlihat rapi.

Karena itu diagnostics harus dilakukan **sebelum** kita terlalu percaya pada ranking atau model output.

---

# 22. MISCONCEPTION / FAILURE-MODE CHALLENGE

## 22.1 “Mean cukup untuk memahami data”

Salah.

Dua datasets dapat mempunyai mean sama tetapi spread/bentuk berbeda.

## 22.2 “Standard deviation besar berarti data buruk”

Salah.

Standard deviation menggambarkan spread relatif terhadap mean; judgement “buruk” memerlukan context.

## 22.3 “Outlier harus dihapus”

Salah.

Potential outlier harus diinvestigasi.

## 22.4 “Correlation $0.99$ membuktikan causation”

Salah.

Association tidak membuktikan cause-effect.

## 22.5 “Top-two gap kecil = probability kecil”

Salah.

Ranking gap adalah score difference.

## 22.6 “Empat peserta cukup untuk generalisasi”

Tidak.

Canonical mini-dataset dibuat untuk reasoning manual, bukan population inference.

## 22.7 “More data automatically fixes the system”

Tidak.

Lebih banyak data tidak memperbaiki:

- salah objective;
- semantic mismatch;
- leakage;
- measurement yang tidak relevan;
- data contract yang ambigu.

---

# 23. TRY IT YOURSELF

Gunakan $h$ values:

$$
0.78,\ 0.61,\ 0.94,\ 0.62.
$$

Tanpa kalkulator terlebih dahulu, prediksi:

1. apakah mean lebih besar atau kecil dari median?
2. peserta mana yang paling memengaruhi upper side?
3. apakah mean $h$ boleh disebut average probability?

Sekarang cek:

Ordered:

$$
0.61,\ 0.62,\ 0.78,\ 0.94.
$$

Median:

$$
\tilde{h}
=
\frac{0.62+0.78}{2}
=
0.70.
$$

Mean:

$$
\bar{h}
=
\frac{0.78+0.61+0.94+0.62}{4}
=
0.7375.
$$

Mean lebih tinggi daripada median karena nilai $0.94$ menarik mean ke atas.

Tetapi:

> $\bar{h}=0.7375$ tetap mean **instructional score**, bukan average probability.

---

# 24. VISUAL / INTERACTIVE ARCHITECTURE

## [STATIC VISUAL] — Center vs spread strip plot

**Learning purpose:** menunjukkan bahwa mean saja tidak menggambarkan semua observations.

**Initial state:** strip plot $q$, $c$, duration, dan $h$.

**Learner action:** bandingkan mean marker dengan actual points.

**Expected behavior:** learner melihat center + individual spread bersamaan.

**Feedback:** hover/callout menjelaskan mean, median, min, max.

**Safety / interpretation note:** chart hanya menggambarkan empat canonical records.

---

## [NUMBER MANIPULATOR] — Change one record

**Learning purpose:** menunjukkan sensitivity summary statistics.

**Initial state:** canonical duration $[45,30,55,40]$.

**Learner action:** ubah satu duration.

**Expected behavior:** mean, range, SD, dan correlation recompute.

**Feedback:** UI menandai summary mana yang berubah paling banyak.

**Safety / interpretation note:** changed value adalah counterfactual; canonical dataset tidak berubah.

---

## [COMPARE VIEW] — Correlation vs causation

**Learning purpose:** mencegah causal overclaim.

**Initial state:** scatter duration vs $q$, dengan $r\approx0.9923$.

**Learner action:** pilih statement:
- “associated”;
- “causes”;
- “guarantees”.

**Expected behavior:** hanya association diterima.

**Feedback:** causal statements ditolak karena observational tiny synthetic case.

**Safety / interpretation note:** correlation coefficient tidak membuktikan mechanism.

---

## [INTERACTIVE VISUAL] — Data-quality inspector

**Learning purpose:** mengidentifikasi contract violations.

**Initial state:** table dengan beberapa counterfactual corruptions:
- missing duration;
- $c=1.20$;
- `uiux_interest=90`;
- duplicate participant_id.

**Learner action:** tandai issue dan pilih next diagnostic action.

**Expected behavior:** system menjelaskan invalid range, scale mismatch, missingness, duplicate identity.

**Feedback:** learner harus menjelaskan sebelum “fix”.

**Safety / interpretation note:** jangan melakukan automatic deletion/imputation tanpa rule.

---

## [STEP-BY-STEP REVEAL] — Citra top-two gap

**Learning purpose:** membedakan ranking label dan score geometry.

**Initial state:** hidden candidate scores.

**Learner action:** reveal top-1, lalu top-2, lalu $\Delta$.

**Expected behavior:** learner melihat $0.0025$ gap.

**Feedback:** pertanyaan “Apakah ini 0.25% confidence?” → **Tidak**.

**Safety / interpretation note:** $\Delta$ adalah derived score difference.

---

# 25. CHECKPOINT

Jawab:

### 1. Mean completion ratio?
$$
0.71875.
$$

### 2. Population-style SD completion ratio?
$$
\approx0.1849.
$$

### 3. Apakah $r\approx0.9923$ duration-vs-$q$ membuktikan duration menyebabkan quiz ratio?
**Tidak.**

### 4. Apakah record outlier otomatis dihapus?
**Tidak. Investigate first.**

### 5. Apakah $\Delta_{\mathrm{Citra}}\approx0.0025$ berarti confidence 0.25%?
**Tidak.**

### 6. Apakah mean $h=0.7375$ adalah probability?
**Tidak.**

---

# 26. MASTERY CHECK — “I CAN…”

Setelah Topic 03:

- **I can** menghitung center dan spread pada tiny dataset.
- **I can** membedakan mean, median, range, variance, dan SD.
- **I can** membaca summary tanpa kehilangan individual observations.
- **I can** melihat potential outlier sebagai signal to investigate.
- **I can** membedakan missing dan zero.
- **I can** menemukan invalid range dan inconsistent scale.
- **I can** membaca correlation sebagai association, bukan causation.
- **I can** menjelaskan keterbatasan $n=4$.
- **I can** membaca top-two ranking margin sebagai diagnostic score gap, bukan probability/confidence.
- **I can** menjaga $h$ sebagai instructional score meskipun dianalisis secara statistik.

---

# 27. SCOPE BOUNDARY

Topic 03 **tidak** mengajarkan sebagai core:

- hypothesis testing;
- confidence intervals;
- p-values;
- regression inference;
- causal inference;
- formal outlier hypothesis tests;
- population estimation;
- production data-cleaning pipeline;
- recommender evaluation catalog.

Kita juga **belum**:

- mendefinisikan probability event;
- menghitung conditional probability;
- membuat synthetic predictive model;
- menghitung loss;
- mengoptimalkan parameter.

---

# 28. SUMMARY

Integrated Case sekarang mempunyai tiga layer:

```text
Topic 01
data contract + quantity semantics
        ↓
Topic 02
representation + matching
        ↓
Topic 03
descriptive diagnostics + data-quality reasoning
```

Key takeaway:

> **Sebelum menanyakan “berapa probability-nya?”, periksa dulu data apa yang ada, bagaimana distribusinya, apakah contract-nya sehat, dan apakah pola yang terlihat benar-benar mendukung claim yang ingin dibuat.**

Mean bukan keseluruhan distribution.

Outlier bukan otomatis error.

Correlation bukan causation.

Ranking margin bukan confidence.

Similarity bukan probability.

$h$ tetap instructional score.

---

# 29. BRIDGE TO TOPIC 04 — UNCERTAINTY

Sekarang kita tahu:

- data contract;
- representation;
- matching scores;
- distributions;
- data-quality risks;
- association limitations;
- Citra bahkan mempunyai top-two matching gap yang sangat kecil.

Pertanyaan berikutnya:

> **Bagaimana kita berbicara secara benar tentang ketidakpastian tanpa mengubah score menjadi probability?**

Topic 04 akan memperkenalkan kembali **event, frequency/count, conditional probability, dan probability-vs-score distinction** menggunakan case yang sama.

# **Topic 04 — Uncertainty**
