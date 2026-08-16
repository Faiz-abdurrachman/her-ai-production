# Topic 03 — Range, Variance, Standard Deviation: Membaca Seberapa Menyebar Data

> **Submodule 03 — Statistics for AI: Membaca Pola dan Variasi Data**  
> **Filename:** `03-range-variance-standard-deviation.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar akademik/teknis campuran, termasuk non-IT  
> **Prerequisite:** Topic 02 — Mean, Median, Mode  
> **Forward dependency:** Topic 04 — Distribution dan Histogram  
> **Boundary:** Topic ini membahas ukuran penyebaran data: range, deviasi dari mean, descriptive population-style variance dengan convention kursus $1/n$, dan standard deviation. Histogram, percentile/quartile/IQR, formal outlier rules, covariance/correlation, Probability, standard error, confidence interval, dan statistical inference tetap ditunda.

---

# 1. Mengapa Topik Ini Ada?

Pada Topic 02 kita belajar bahwa sekumpulan nilai dapat diringkas melalui **pusat data**.

Untuk study duration HerAI:

| Participant | Study duration |
|---|---:|
| Alya | 45 menit |
| Bima | 30 menit |
| Citra | 55 menit |
| Dewi | 40 menit |

mean-nya adalah:

$$
\bar{d}
=
\frac{45+30+55+40}{4}
=
42.5\text{ menit}.
$$

Median-nya juga:

$$
42.5\text{ menit}.
$$

Apakah informasi itu sudah cukup?

Belum.

Bayangkan dataset lain:

$$
40,\;42,\;43,\;45.
$$

Mean dataset tersebut juga:

$$
42.5.
$$

Jadi kita memiliki dua dataset dengan mean yang sama:

**Dataset A**

$$
40,\;42,\;43,\;45
$$

**Dataset B**

$$
30,\;40,\;45,\;55.
$$

Tetapi secara intuitif, keduanya terlihat berbeda.

Dataset A berkumpul cukup dekat di sekitar $42.5$.

Dataset B jauh lebih melebar.

Inilah masalah yang diselesaikan oleh konsep **spread**, **variability**, atau **penyebaran data**.

OpenStax menjelaskan bahwa standard deviation memberi ukuran numerik terhadap banyaknya variasi dalam data dan bagaimana nilai-nilai tersebar dari mean. NIST juga menempatkan range, variance, dan standard deviation sebagai ukuran penyebaran yang menjawab aspek berbeda dari variability. [R1][R2]

Guardrail utama Topic ini:

> **Mengetahui pusat data belum cukup. Kita juga perlu mengetahui seberapa menyebar nilai-nilainya.**

---

# 2. Tujuan Pembelajaran

Setelah menyelesaikan Topic 03, kamu diharapkan mampu:

1. menjelaskan perbedaan **center** dan **spread**;
2. menghitung range sebagai nilai maksimum dikurangi nilai minimum;
3. menjelaskan keterbatasan range;
4. menghitung deviasi suatu observation dari mean;
5. menjelaskan mengapa penjumlahan raw deviations dari mean saling meniadakan;
6. menjelaskan mengapa variance menggunakan squared deviations;
7. membaca formula descriptive variance dengan benar;
8. menghitung descriptive variance untuk dataset kecil;
9. menghitung standard deviation sebagai akar kuadrat variance;
10. membedakan variance dan standard deviation;
11. menjelaskan unit variance dan standard deviation;
12. mengenali kondisi zero spread;
13. membandingkan dua dataset yang mempunyai center sama tetapi spread berbeda;
14. menjelaskan bahwa standard deviation besar **tidak otomatis** berarti data buruk;
15. membedakan convention kursus $1/n$ dari sample-estimator convention $1/(n-1)$ tanpa mencampurkannya;
16. menginterpretasikan range, variance, dan standard deviation pada running case HerAI;
17. memprediksi pengaruh perubahan satu observation terhadap spread sebelum menghitung ulang;
18. menjelaskan mengapa ukuran spread penting untuk membaca data sebelum digunakan dalam sistem AI.

---

# 3. Prerequisite Recall

Kita hanya mengambil konsep yang diperlukan dari topik sebelumnya.

## 3.1 Mean

Untuk numerical variable $x$ dengan $n$ observed values:

$$
\bar{x}
=
\frac{1}{n}
\sum_{i=1}^{n}x_i.
$$

Di sini:

- $x_i$ = nilai variable $x$ pada observation ke-$i$;
- $i$ = indeks observation;
- $n$ = jumlah observed values yang sedang diringkas;
- $\bar{x}$ = arithmetic mean dari finite set tersebut.

## 3.2 Operasi dasar

Kamu perlu nyaman dengan:

- subtraction;
- square;
- square root;
- sigma notation.

Contoh:

$$
(-3)^2=9
$$

dan:

$$
\sqrt{9}=3.
$$

## 3.3 Dataset HerAI tetap sama

Running case tidak di-reset.

| Participant | Quiz ratio $q$ | Completion ratio $c$ | Study duration |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 min |
| Bima | 0.60 | 0.625 | 30 min |
| Citra | 0.90 | 1.00 | 55 min |
| Dewi | 0.70 | 0.50 | 40 min |

Kita akan menggunakan variable numerik tersebut untuk mempelajari spread.

---

# 4. Hook — Dua Tim, Rata-rata Sama

Bayangkan dua kelompok learner menyelesaikan latihan dalam durasi berikut.

### Kelompok A

$$
40,\;42,\;43,\;45
$$

### Kelompok B

$$
30,\;40,\;45,\;55
$$

Keduanya mempunyai mean:

$$
42.5.
$$

Kalau kamu hanya menerima laporan:

> “Rata-rata durasi belajar = 42.5 menit.”

kamu tidak dapat mengetahui apakah learner:

- semuanya belajar kurang lebih sama lama; atau
- mempunyai perbedaan durasi yang besar.

**Center yang sama tidak berarti spread yang sama.**

---

# 5. Predict Before Calculate

Sebelum melihat formula, buat prediksi.

## Prediksi 1 — Mana yang lebih menyebar?

Dataset A:

$$
4,\;5,\;6
$$

Dataset B:

$$
1,\;5,\;9
$$

Keduanya memiliki mean $5$.

Menurutmu mana yang lebih menyebar?

Catat alasannya tanpa menghitung variance.

## Prediksi 2 — Mengubah nilai ekstrem

HerAI duration:

$$
45,\;30,\;55,\;40.
$$

Bayangkan hanya nilai Citra berubah dari $55$ menjadi $75$ menit.

Apa yang kemungkinan terjadi pada:

- range?
- variance?
- standard deviation?

Apakah naik, turun, atau tetap?

## Prediksi 3 — Semua nilai sama

Dataset:

$$
7,\;7,\;7,\;7.
$$

Menurutmu spread-nya besar, kecil, atau nol?

---

# 6. Intuisi — Apa yang Dimaksud Spread?

**Spread** menjawab pertanyaan seperti:

> Seberapa jauh nilai-nilai data tersebar satu sama lain atau dari pusatnya?

Tidak ada satu ukuran spread yang menjawab semua pertanyaan.

Dalam Topic ini kita fokus pada tiga ukuran:

1. **range** — melihat jarak antara nilai paling kecil dan paling besar;
2. **variance** — merangkum squared deviations dari mean;
3. **standard deviation** — akar variance sehingga kembali ke unit asli data.

NIST menekankan bahwa ukuran penyebaran berbeda memberikan perhatian yang berbeda terhadap bagian data. Range hanya menggunakan dua nilai ekstrem, sementara variance dan standard deviation menggunakan deviasi seluruh observations dari mean. [R2]

---

# 7. Small Data — Center Sama, Spread Berbeda

Gunakan:

### Dataset A

$$
40,\;42,\;43,\;45
$$

### Dataset B

$$
30,\;40,\;45,\;55.
$$

Mean keduanya:

$$
42.5.
$$

Namun:

- A hanya membentang dari $40$ sampai $45$;
- B membentang dari $30$ sampai $55$.

Secara visual:

**A**

`40 — 42 — 43 — 45`

**B**

`30 ————— 40 — 45 ————— 55`

Sebelum rumus formal pun kita sudah melihat:

> **Satu nilai center tidak cukup untuk menggambarkan pola numerical data.**

---

# 8. Range — Ukuran Spread Paling Langsung

Range didefinisikan sebagai:

$$
\operatorname{range}(x)
=
x_{\max}-x_{\min}.
$$

Di sini:

- $x_{\max}$ = observed value terbesar;
- $x_{\min}$ = observed value terkecil.

Untuk Dataset A:

$$
\operatorname{range}(A)
=
45-40
=
5.
$$

Untuk Dataset B:

$$
\operatorname{range}(B)
=
55-30
=
25.
$$

Dataset B mempunyai range lebih besar.

---

# 9. Math Reading Skill — Membaca Range

Jangan hanya membaca:

> “max minus min.”

Baca secara lengkap:

> “Range adalah jarak numerik antara observation terbesar dan observation terkecil pada variable yang sedang dianalisis.”

Hal yang perlu dicek:

1. variable harus numerik dengan perbedaan yang bermakna;
2. unit range mengikuti unit variable asli;
3. range hanya menggunakan dua observations;
4. range tidak memberi tahu bagaimana observations lain tersebar di tengah.

Untuk duration dalam menit:

$$
\operatorname{range}=25\text{ menit}.
$$

Bukan:

$$
25\text{ menit}^2.
$$

---

# 10. Keterbatasan Range

Range sangat mudah dihitung.

Tetapi justru karena hanya memakai:

- minimum;
- maksimum;

ia mengabaikan semua nilai di antara keduanya.

Contoh:

### Dataset C

$$
0,\;4,\;5,\;6,\;10
$$

### Dataset D

$$
0,\;0,\;0,\;10,\;10
$$

Keduanya mempunyai:

$$
\operatorname{range}=10.
$$

Namun susunan internal datanya berbeda.

Karena itu:

> **Range bukan “seluruh cerita” tentang distribution atau spread.**

NIST secara eksplisit mencatat bahwa range hanya didasarkan pada dua extreme values dan tidak menangkap spread di sekitar center. [R2]

---

# 11. Dari Range ke Deviasi dari Mean

Range melihat dua ujung data.

Sekarang kita ingin memakai **seluruh observations**.

Mulai dari mean:

$$
\bar{x}.
$$

Untuk setiap observation $x_i$, kita dapat menghitung:

$$
x_i-\bar{x}.
$$

Besaran ini disebut **deviation from the mean** atau deviasi dari mean.

Interpretasi:

- positif → observation berada di atas mean;
- negatif → observation berada di bawah mean;
- nol → observation sama dengan mean.

---

# 12. Worked Mini Example — Deviasi

Dataset:

$$
2,\;4,\;6,\;8.
$$

Mean:

$$
\bar{x}
=
\frac{2+4+6+8}{4}
=
5.
$$

Deviasinya:

| $x_i$ | $x_i-\bar{x}$ |
|---:|---:|
| 2 | $-3$ |
| 4 | $-1$ |
| 6 | $1$ |
| 8 | $3$ |

Nilai $2$ berada $3$ unit di bawah mean.

Nilai $8$ berada $3$ unit di atas mean.

---

# 13. Mengapa Tidak Cukup Menjumlahkan Deviasi?

Jumlahkan:

$$
(-3)+(-1)+1+3=0.
$$

Apakah ini berarti data tidak menyebar?

Tentu tidak.

Observations jelas berbeda.

Masalahnya:

- deviasi negatif;
- deviasi positif;

saling membatalkan.

OpenStax menjelaskan bahwa deviasi terhadap mean akan saling meniadakan ketika dijumlahkan; karena itu squared deviations digunakan ketika membangun variance. [R1]

---

# 14. Kenapa Deviasi Dikuadratkan?

Untuk dataset sebelumnya:

$$
-3,\;-1,\;1,\;3
$$

kuadratkan:

$$
9,\;1,\;1,\;9.
$$

Sekarang semua kontribusi non-negatif.

Squared deviations:

$$
(x_i-\bar{x})^2
$$

juga membuat observation yang lebih jauh dari mean memberi kontribusi lebih besar.

Contoh:

- deviation $2$ memberi square $4$;
- deviation $10$ memberi square $100$.

NIST menekankan bahwa squaring memberi bobot lebih besar pada values yang lebih jauh dari mean. [R2]

---

# 15. Variance — Kontrak Formal Kursus

Untuk Topic ini, kita memakai **descriptive population-style convention untuk finite set yang sedang dianalisis**:

$$
\sigma^2
=
\frac{1}{n}
\sum_{i=1}^{n}(x_i-\bar{x})^2.
$$

Definisi simbol:

- $\sigma^2$ = descriptive variance pada finite set yang sedang dianalisis;
- $n$ = jumlah observed values yang dimasukkan;
- $i$ = indeks observation;
- $x_i$ = nilai observation ke-$i$;
- $\bar{x}$ = mean dari observed values tersebut;
- $x_i-\bar{x}$ = deviation observation ke-$i$ dari mean;
- $(x_i-\bar{x})^2$ = squared deviation;
- $\sum_{i=1}^{n}$ = jumlahkan squared deviations dari observation pertama sampai ke-$n$.

## Guardrail convention

Formula ini adalah **kontrak kursus untuk descriptive analysis atas finite set yang sedang dibahas**.

Literatur statistik juga menggunakan convention lain ketika data diperlakukan sebagai **sample yang digunakan untuk mengestimasi population variance**. Dalam konteks itu, denominator yang umum adalah:

$$
n-1.
$$

OpenStax secara eksplisit membedakan population calculation dengan sample-estimator calculation. [R1]

Topic ini **tidak** menurunkan Bessel's correction atau teori unbiased estimation.

Jadi jangan membuat aturan palsu:

> “Variance selalu dibagi $n$.”

dan jangan juga membuat aturan palsu:

> “Variance selalu dibagi $n-1$.”

Pertama tanyakan:

> **Convention dan tujuan analisis apa yang sedang digunakan?**

---

# 16. Math Reading Skill — Membaca Formula Variance

Baca formula:

$$
\sigma^2
=
\frac{1}{n}
\sum_{i=1}^{n}(x_i-\bar{x})^2
$$

sebagai alur:

1. ambil satu observed value $x_i$;
2. cari jaraknya secara bertanda dari mean: $x_i-\bar{x}$;
3. kuadratkan deviation itu;
4. lakukan untuk seluruh $n$ observations;
5. jumlahkan seluruh squared deviations;
6. bagi dengan $n$ sesuai descriptive convention kursus.

Hasilnya bukan “jarak biasa”.

Hasilnya adalah:

> **average squared deviation from the mean pada finite set yang sedang dianalisis.**

---

# 17. Unit Variance

Ini bagian yang sering terlewat.

Jika $x$ diukur dalam **menit**, maka:

$$
x_i-\bar{x}
$$

juga dalam menit.

Setelah dikuadratkan:

$$
(x_i-\bar{x})^2
$$

unit-nya menjadi:

$$
\text{menit}^2.
$$

Karena itu variance duration mempunyai unit:

$$
\text{menit}^2.
$$

Bukan menit.

Ini salah satu alasan mengapa standard deviation berguna untuk interpretasi.

---

# 18. Standard Deviation

Standard deviation adalah akar kuadrat variance:

$$
\sigma
=
\sqrt{\sigma^2}.
$$

Karena akar kuadrat mengembalikan squared unit ke unit awal:

- variance duration → $\text{menit}^2$;
- standard deviation duration → menit.

OpenStax dan NIST sama-sama menjelaskan bahwa standard deviation adalah square root dari variance dan mengembalikan ukuran spread ke unit data asli. [R1][R2]

---

# 19. Math Reading Skill — Membaca Standard Deviation

Baca:

$$
\sigma=\sqrt{\sigma^2}
$$

sebagai:

> “Standard deviation adalah square root dari descriptive variance.”

Interpretasi beginner-safe:

> “Standard deviation memberi ukuran seberapa tersebar values dari mean dalam unit yang sama dengan variable asli.”

Jangan membacanya sebagai:

> “Semua observations pasti tepat berjarak $\sigma$ dari mean.”

Itu salah.

Standard deviation adalah **summary of spread**, bukan jarak setiap observation secara individual.

---

# 20. Worked Example 1 — Dataset Dasar

Dataset:

$$
2,\;4,\;6,\;8.
$$

## Step 1 — Mean

$$
\bar{x}
=
\frac{2+4+6+8}{4}
=
5.
$$

## Step 2 — Range

$$
\operatorname{range}
=
8-2
=
6.
$$

## Step 3 — Deviations

$$
2-5=-3
$$

$$
4-5=-1
$$

$$
6-5=1
$$

$$
8-5=3.
$$

## Step 4 — Squared deviations

$$
(-3)^2=9
$$

$$
(-1)^2=1
$$

$$
1^2=1
$$

$$
3^2=9.
$$

## Step 5 — Sum

$$
9+1+1+9=20.
$$

## Step 6 — Descriptive variance

$$
\sigma^2
=
\frac{20}{4}
=
5.
$$

## Step 7 — Standard deviation

$$
\sigma
=
\sqrt{5}
\approx
2.236.
$$

Jadi:

- range = $6$ units;
- variance = $5$ units squared;
- standard deviation $\approx2.236$ units.

---

# 21. Checkpoint 1

Untuk:

$$
3,\;3,\;3,\;3
$$

prediksi:

1. mean?
2. range?
3. setiap deviation?
4. variance?
5. standard deviation?

Jawaban:

$$
\bar{x}=3
$$

$$
\operatorname{range}=0
$$

semua deviations:

$$
0
$$

maka:

$$
\sigma^2=0
$$

dan:

$$
\sigma=0.
$$

---

# 22. Zero Spread

Jika seluruh observed values sama:

$$
x_1=x_2=\cdots=x_n,
$$

maka semua values sama dengan mean.

Karena itu:

$$
x_i-\bar{x}=0
$$

untuk setiap $i$.

Sehingga:

$$
\sigma^2=0
$$

dan:

$$
\sigma=0.
$$

OpenStax menyatakan standard deviation selalu non-negative dan menjadi zero ketika tidak ada spread. [R1]

Tetapi:

> **Standard deviation nol tidak otomatis berarti dataset “bagus”.**

Misalnya semua sensor yang rusak dan terus mengirim nilai identik juga dapat menghasilkan spread nol.

Interpretasi tetap membutuhkan konteks.

---

# 23. Worked Example 2 — HerAI Quiz Ratio

Canonical quiz ratio:

$$
q=
\{0.80,\;0.60,\;0.90,\;0.70\}.
$$

Dari Topic 02:

$$
\bar{q}=0.75.
$$

## Step 1 — Range

$$
\operatorname{range}(q)
=
0.90-0.60
=
0.30.
$$

## Step 2 — Deviations

Alya:

$$
0.80-0.75=0.05
$$

Bima:

$$
0.60-0.75=-0.15
$$

Citra:

$$
0.90-0.75=0.15
$$

Dewi:

$$
0.70-0.75=-0.05.
$$

## Step 3 — Squared deviations

$$
0.05^2=0.0025
$$

$$
(-0.15)^2=0.0225
$$

$$
0.15^2=0.0225
$$

$$
(-0.05)^2=0.0025.
$$

## Step 4 — Sum

$$
0.0025+0.0225+0.0225+0.0025
=
0.05.
$$

## Step 5 — Descriptive variance

$$
\sigma_q^2
=
\frac{0.05}{4}
=
0.0125.
$$

## Step 6 — Standard deviation

$$
\sigma_q
=
\sqrt{0.0125}
\approx
0.1118.
$$

Canonical results:

$$
\boxed{
\operatorname{range}(q)=0.30
}
$$

$$
\boxed{
\sigma_q^2=0.0125
}
$$

$$
\boxed{
\sigma_q\approx0.1118
}
$$

---

# 24. Apa Arti $\sigma_q\approx0.1118$?

Beginner-safe interpretation:

> Quiz ratios pada empat observed participants mempunyai spread sekitar mean yang diringkas oleh standard deviation sekitar $0.1118$ ratio-unit.

Jangan mengubahnya menjadi:

> “Setiap participant berjarak tepat $0.1118$ dari mean.”

Tidak.

Actual deviations adalah:

$$
0.05,\;-0.15,\;0.15,\;-0.05.
$$

Standard deviation merangkum keseluruhan pattern tersebut.

Dan:

> **Nilai $q$ berada di $[0,1]$ karena definisinya sebagai quiz ratio, bukan karena standard deviation menjadikannya probability.**

---

# 25. Worked Example 3 — HerAI Study Duration dan Unit

Study duration:

$$
45,\;30,\;55,\;40
$$

menit.

Mean:

$$
\bar{d}=42.5\text{ menit}.
$$

## Range

$$
55-30
=
25\text{ menit}.
$$

## Deviations

$$
45-42.5=2.5
$$

$$
30-42.5=-12.5
$$

$$
55-42.5=12.5
$$

$$
40-42.5=-2.5.
$$

Semua dalam menit.

## Squared deviations

$$
2.5^2=6.25
$$

$$
(-12.5)^2=156.25
$$

$$
12.5^2=156.25
$$

$$
(-2.5)^2=6.25.
$$

Unit sekarang:

$$
\text{menit}^2.
$$

Sum:

$$
6.25+156.25+156.25+6.25
=
325.
$$

Descriptive variance:

$$
\sigma_d^2
=
\frac{325}{4}
=
81.25\text{ menit}^2.
$$

Standard deviation:

$$
\sigma_d
=
\sqrt{81.25}
\approx
9.01\text{ menit}.
$$

Jadi:

$$
\boxed{
\operatorname{range}(d)=25\text{ menit}
}
$$

$$
\boxed{
\sigma_d^2=81.25\text{ menit}^2
}
$$

$$
\boxed{
\sigma_d\approx9.01\text{ menit}
}
$$

---

# 26. Variance dan Standard Deviation Bukan Hal yang Sama

Untuk duration:

$$
\sigma_d^2=81.25\text{ menit}^2
$$

sedangkan:

$$
\sigma_d\approx9.01\text{ menit}.
$$

Perhatikan:

- simbol berbeda;
- nilai berbeda;
- unit berbeda;
- peran interpretasi berbeda.

Variance berguna karena squared deviations memiliki sifat matematis yang penting.

Standard deviation lebih mudah dihubungkan kembali ke scale asli variable.

---

# 27. Compare View — Mean Sama, Spread Berbeda

Kembali ke:

### Dataset A

$$
40,\;42,\;43,\;45
$$

Mean:

$$
42.5.
$$

Variance:

$$
3.25.
$$

Standard deviation:

$$
\sqrt{3.25}
\approx1.80.
$$

Range:

$$
5.
$$

### Dataset B

$$
30,\;40,\;45,\;55
$$

Mean:

$$
42.5.
$$

Variance:

$$
81.25.
$$

Standard deviation:

$$
\sqrt{81.25}
\approx9.01.
$$

Range:

$$
25.
$$

Kesimpulan:

> Mean keduanya sama, tetapi Dataset B jauh lebih menyebar.

Jadi:

> **Same mean $\neq$ same spread.**

---

# 28. Change One Thing — Citra Belajar Lebih Lama

Canonical duration:

$$
45,\;30,\;55,\;40.
$$

Sekarang ubah **satu observation** saja:

Citra:

$$
55\to75.
$$

Dataset hipotetis menjadi:

$$
45,\;30,\;75,\;40.
$$

Sebelum menghitung, prediksi apa yang terjadi.

## Mean baru

$$
\bar{d}_{\text{baru}}
=
\frac{45+30+75+40}{4}
=
47.5.
$$

## Range baru

$$
75-30
=
45\text{ menit}.
$$

## Descriptive variance baru

$$
\sigma_{\text{baru}}^2
=
281.25\text{ menit}^2.
$$

## Standard deviation baru

$$
\sigma_{\text{baru}}
=
\sqrt{281.25}
\approx
16.77\text{ menit}.
$$

Bandingkan:

| Summary | Canonical | Setelah satu value berubah |
|---|---:|---:|
| Mean | 42.5 min | 47.5 min |
| Range | 25 min | 45 min |
| Variance | 81.25 min² | 281.25 min² |
| Standard deviation | 9.01 min | 16.77 min |

Satu observation yang lebih jauh dapat meningkatkan spread secara besar.

Tetapi jangan langsung menyebut observation tersebut “salah”.

Topik formal tentang outlier baru dibahas nanti.

---

# 29. Mengapa Squaring Membuat Nilai Jauh Lebih Berpengaruh?

Bandingkan dua deviations:

$$
2
$$

dan:

$$
10.
$$

Setelah dikuadratkan:

$$
2^2=4
$$

$$
10^2=100.
$$

Deviation kedua hanya $5$ kali lebih besar secara absolut, tetapi squared contribution-nya menjadi $25$ kali lebih besar.

Ini membuat variance dan standard deviation sensitif terhadap values yang jauh dari mean.

NIST secara eksplisit menunjukkan bahwa squared distance memberi kontribusi jauh lebih besar kepada observations yang lebih jauh dari center. [R2]

---

# 30. Misconception Challenge 1 — “Large SD = Bad Data”

Pernyataan:

> “Standard deviation besar berarti dataset buruk.”

**Salah.**

Standard deviation besar berarti:

> values lebih menyebar pada scale dan context yang sedang dianalisis.

Apakah itu baik, buruk, normal, diharapkan, atau mencurigakan?

Tergantung domain.

Contoh:

- durasi belajar yang bervariasi dapat mencerminkan kebutuhan learner berbeda;
- latency server yang sangat bervariasi mungkin menjadi operational concern;
- variasi ukuran pakaian pelanggan justru normal;
- sensor dengan spread tinggi dapat benar-benar menangkap fenomena yang berubah.

Statistic tidak membawa label moral “bagus/buruk” secara otomatis.

---

# 31. Misconception Challenge 2 — “Negative Deviations → Negative Variance”

Salah.

Walaupun deviation dapat negatif:

$$
x_i-\bar{x}<0,
$$

variance menggunakan:

$$
(x_i-\bar{x})^2.
$$

Squared deviations selalu non-negative.

Karena itu descriptive variance juga tidak negatif.

---

# 32. Misconception Challenge 3 — “Variance dan SD Unit-nya Sama”

Salah.

Jika data dalam menit:

- variance dalam $\text{menit}^2$;
- standard deviation dalam menit.

Jika data dalam meter:

- variance dalam $\text{meter}^2$;
- standard deviation dalam meter.

---

# 33. Misconception Challenge 4 — “Range Sudah Cukup”

Salah.

Range hanya melihat:

$$
x_{\min}
$$

dan:

$$
x_{\max}.
$$

Observations di tengah tidak ikut menentukan range.

Dua datasets dapat memiliki range sama tetapi internal spread berbeda.

---

# 34. Misconception Challenge 5 — “Statistics Selalu Pakai $n-1$”

Salah.

Ada lebih dari satu convention karena tujuan analisis berbeda.

Dalam course ini:

$$
\sigma^2
=
\frac{1}{n}
\sum_{i=1}^{n}(x_i-\bar{x})^2
$$

digunakan sebagai **descriptive population-style summary dari finite set yang sedang dianalisis**.

Ketika statistik digunakan untuk **mengestimasi population variance dari sample**, common sample estimator menggunakan:

$$
n-1.
$$

Kita sengaja tidak mencampur keduanya.

---

# 35. Misconception Challenge 6 — “Small SD = Model Bagus”

Salah.

Standard deviation pada feature atau outcome tertentu tidak mengukur:

- model accuracy;
- fairness;
- calibration;
- causal validity;
- generalization;
- recommendation quality.

Ia hanya merangkum spread dari variable yang didefinisikan.

---

# 36. Why This Matters in AI

Sebelum sebuah numerical feature dipakai dalam AI, kita sering perlu memahami:

- typical value;
- spread;
- scale;
- possible unusual values;
- apakah values relatif homogen atau sangat bervariasi.

Misalnya dua features:

- quiz ratio: scale sekitar $0$–$1$;
- study duration: puluhan menit.

Standard deviation membantu kita melihat variability dalam unit masing-masing.

Tetapi Topic ini belum mengajarkan normalization.

Pesan pentingnya:

> **AI tidak hanya menerima angka. Angka mempunyai scale, spread, unit, dan semantics.**

---

# 37. Spread Tidak Sama dengan Feature Importance

Misalkan:

- Feature A mempunyai SD besar;
- Feature B mempunyai SD kecil.

Tidak boleh langsung menyimpulkan:

> “Feature A lebih penting untuk model.”

Spread bukan feature importance.

Model usefulness bergantung pada:

- hubungan dengan task;
- representation;
- data quality;
- modeling procedure;
- evaluation.

Itu berada di luar Topic ini.

---

# 38. Spread Tidak Sama dengan Uncertainty Probability

Standard deviation sering muncul di banyak area matematika dan probabilitas.

Tetapi dalam Topic ini kita hanya memakainya secara **deskriptif pada observed data**.

Kita belum membahas:

- random variable;
- probability distribution;
- expected value;
- sampling distribution;
- confidence interval;
- probabilistic uncertainty.

Jadi:

> **Standard deviation observed data di sini bukan otomatis probability uncertainty.**

---

# 39. Try It Yourself 1 — Range

Dataset:

$$
12,\;15,\;17,\;20.
$$

1. Tentukan minimum.
2. Tentukan maximum.
3. Hitung range.
4. Apa unit range jika data dalam menit?

---

# 40. Try It Yourself 2 — Deviations

Dataset:

$$
4,\;6,\;8.
$$

1. Hitung mean.
2. Hitung setiap deviation.
3. Jumlahkan raw deviations.
4. Jelaskan mengapa jumlah itu bukan ukuran spread yang berguna.

---

# 41. Try It Yourself 3 — Variance

Gunakan:

$$
4,\;6,\;8.
$$

Dengan descriptive convention kursus:

$$
\sigma^2
=
\frac{1}{n}
\sum_{i=1}^{n}(x_i-\bar{x})^2.
$$

Hitung variance sampai selesai.

---

# 42. Try It Yourself 4 — Standard Deviation dan Unit

Jika variance suatu duration dataset adalah:

$$
64\text{ menit}^2,
$$

berapa standard deviation-nya?

Apa unit-nya?

---

# 43. Try It Yourself 5 — Center vs Spread

Dataset P:

$$
8,\;10,\;12
$$

Dataset Q:

$$
2,\;10,\;18.
$$

1. Apakah mean keduanya sama?
2. Mana range lebih besar?
3. Tanpa menghitung variance penuh, mana yang kamu prediksi mempunyai SD lebih besar?
4. Jelaskan alasannya.

---

# 44. Visual / Interactive Specifications

## [STATIC VISUAL] Center vs Spread

**Purpose:** memperlihatkan bahwa dua datasets dapat mempunyai mean sama tetapi spread berbeda.

**Initial data:**

Dataset A:

$$
40,\;42,\;43,\;45
$$

Dataset B:

$$
30,\;40,\;45,\;55.
$$

**Display:**

- dua horizontal number lines dengan scale sama;
- marker mean $42.5$ pada posisi sama;
- observation dots;
- range bracket.

**Expected behavior:** learner langsung melihat B lebih menyebar.

**Safety:** visual tidak menandai dataset B sebagai “bad”.

---

## [STEP-BY-STEP REVEAL] Dari Deviasi ke Variance

**Purpose:** memahami alasan squared deviations.

**Initial state:** tampilkan:

$$
2,\;4,\;6,\;8
$$

dan mean $5$.

**Reveal sequence:**

1. deviation arrows;
2. signed deviations;
3. sum deviations = $0$;
4. square each deviation;
5. sum squares;
6. divide by $n$;
7. display variance;
8. square root;
9. display standard deviation.

**Feedback:** setiap tahap mempunyai kalimat interpretasi.

**Safety:** jangan menyebut $1/n$ sebagai universal variance convention.

---

## [NUMBER MANIPULATOR] Change One Observation

**Purpose:** sensitivity reasoning.

**Initial state:** duration HerAI:

$$
45,\;30,\;55,\;40.
$$

**Action:** learner drag nilai Citra dari $55$ ke value lain.

**Live outputs:**

- mean;
- range;
- descriptive variance;
- standard deviation.

**Expected behavior:** learner melihat satu value yang menjauh dapat memengaruhi beberapa summaries.

**Safety:** UI menggunakan label “changed observation”, bukan “bad observation” atau “outlier error”.

---

## [COMPARE VIEW] Variance vs Standard Deviation Unit

**Purpose:** membedakan unit.

Untuk duration:

- input: menit;
- deviations: menit;
- squared deviations: $\text{menit}^2$;
- variance: $\text{menit}^2$;
- SD: menit.

**Feedback:** highlight unit pada setiap stage.

---

# 45. Checkpoint 2 — Pilih Pernyataan yang Valid

Mana yang valid?

A. Dataset dengan SD besar pasti buruk.  
B. Variance duration dalam menit.  
C. Standard deviation duration kembali ke unit menit.  
D. Range menggunakan seluruh observations dengan bobot sama.

Jawaban:

**C.**

---

# 46. Checkpoint 3 — Audit Formula

Seorang learner menulis:

$$
\sigma^2
=
\sum_{i=1}^{n}(x_i-\bar{x})
$$

Apa masalahnya?

Dua masalah utama:

1. deviations dapat saling membatalkan;
2. formula tersebut tidak menggunakan squared deviations maupun averaging convention yang disepakati.

---

# 47. Checkpoint 4 — Audit Unit

Seorang learner berkata:

> “Variance study duration HerAI adalah 81.25 menit.”

Perbaiki.

Yang benar:

$$
\sigma_d^2
=
81.25\text{ menit}^2.
$$

Standard deviation:

$$
\sigma_d
\approx
9.01\text{ menit}.
$$

---

# 48. Checkpoint 5 — Audit Convention

Pernyataan:

> “OpenStax memakai $n-1$, jadi formula course $1/n$ pasti salah.”

Tidak tepat.

Yang perlu dibedakan adalah tujuan.

OpenStax membedakan:

- population variance / full population calculation;
- sample variance estimator.

Course ini memilih $1/n$ secara eksplisit untuk descriptive summary finite set yang sedang dianalisis.

Kita belum melakukan inferential estimation.

---

# 49. Mastery Check

Sebelum lanjut, pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan perbedaan center dan spread.
- [ ] **I can** menghitung range.
- [ ] **I can** menjelaskan keterbatasan range.
- [ ] **I can** menghitung deviation dari mean.
- [ ] **I can** menjelaskan mengapa raw deviations saling meniadakan.
- [ ] **I can** menjelaskan mengapa squared deviations dipakai dalam variance.
- [ ] **I can** membaca setiap simbol pada formula variance.
- [ ] **I can** menghitung descriptive variance dengan convention kursus $1/n$.
- [ ] **I can** menghitung standard deviation dari variance.
- [ ] **I can** membedakan unit variance dan SD.
- [ ] **I can** mengenali zero spread.
- [ ] **I can** membandingkan datasets dengan mean sama tetapi spread berbeda.
- [ ] **I can** menjelaskan mengapa large SD tidak otomatis berarti bad data.
- [ ] **I can** menjelaskan bahwa $n$ versus $n-1$ bergantung pada convention/tujuan.
- [ ] **I can** menginterpretasikan spread quiz ratio dan study duration HerAI tanpa mengubahnya menjadi probability atau model quality.

Jika beberapa poin masih belum yakin, ulangi:

- Center vs Spread;
- Deviations;
- Why Square?;
- Course Variance Contract;
- Unit Variance vs SD;
- HerAI Worked Examples;
- Change One Thing.

---

# 50. Why This Matters Later

Topic ini menjadi prerequisite langsung untuk beberapa konsep berikutnya.

## Distribution dan Histogram

Setelah mengetahui center dan spread, kita akan melihat **shape/pattern seluruh observed values**, bukan hanya summary numbers.

## Outlier reasoning

Untuk memahami observation yang jauh dari pola umum, kita perlu terlebih dahulu mengerti apa yang dimaksud spread.

## Covariance dan Correlation

Covariance nanti memperluas reasoning tentang deviations:

> bukan hanya “seberapa jauh $x_i$ dari mean $x$”, tetapi bagaimana deviations dua variables bergerak bersama.

## Data Quality untuk AI

Scale dan variability membantu kita mengaudit numerical features.

---

# 51. Yang Sengaja Belum Dibahas

Topic ini tidak mengajarkan secara formal:

- histogram construction;
- probability distribution;
- normal distribution;
- empirical rule sebagai core;
- percentile;
- quartile;
- IQR;
- formal outlier rules;
- $z$-score inference;
- standard error;
- confidence interval;
- hypothesis test;
- unbiased-estimator derivation;
- Bessel's correction derivation;
- covariance;
- correlation;
- regression;
- feature normalization procedures.

Ini bukan karena konsep tersebut tidak penting.

Kita menjaga dependency dan cognitive load.

---

# 52. Ringkasan

Kita belajar bahwa:

1. center dan spread menjawab pertanyaan berbeda;
2. range adalah:

$$
x_{\max}-x_{\min};
$$

3. range hanya menggunakan minimum dan maximum;
4. deviation observation ke-$i$ adalah:

$$
x_i-\bar{x};
$$

5. raw deviations dari mean saling meniadakan;
6. variance menggunakan squared deviations;
7. convention course:

$$
\sigma^2
=
\frac{1}{n}
\sum_{i=1}^{n}(x_i-\bar{x})^2;
$$

8. standard deviation adalah:

$$
\sigma=\sqrt{\sigma^2};
$$

9. variance memiliki squared units;
10. standard deviation kembali ke unit asli;
11. zero spread menghasilkan variance dan SD nol;
12. same mean tidak berarti same spread;
13. large SD tidak otomatis berarti bad data;
14. small SD tidak otomatis berarti good model;
15. $1/n$ dan $1/(n-1)$ tidak boleh dicampur tanpa memahami tujuan;
16. HerAI quiz ratio mempunyai:

$$
\operatorname{range}(q)=0.30,
$$

$$
\sigma_q^2=0.0125,
$$

$$
\sigma_q\approx0.1118;
$$

17. HerAI study duration mempunyai:

$$
\operatorname{range}(d)=25\text{ menit},
$$

$$
\sigma_d^2=81.25\text{ menit}^2,
$$

$$
\sigma_d\approx9.01\text{ menit}.
$$

---

# 53. Bridge ke Topic 04 — Distribution dan Histogram

Sekarang kita dapat mengatakan sesuatu tentang:

- center;
- range;
- variance;
- standard deviation.

Tetapi dua datasets bahkan dapat memiliki summaries yang mirip dan tetap mempunyai **susunan observations yang berbeda**.

Jadi pertanyaan berikutnya adalah:

> **Bagaimana kita melihat pola seluruh observed values, bukan hanya beberapa summary numbers?**

Itulah pintu masuk ke:

**Topic 04 — Distribution dan Histogram.**

---

# 54. Referensi Topic 03

Source ledger lengkap tersedia di `referensi-topic-03.md`.

- [R1] OpenStax — *2.7 Measures of the Spread of the Data*, Introductory Statistics 2e.
- [R2] NIST/SEMATECH — *Measures of Scale*, e-Handbook of Statistical Methods.

---

# 55. Gerbang STOP

Topic 03 selesai pada scope:

**center → spread → range → deviation → squared deviation → descriptive variance $1/n$ → standard deviation → unit reasoning → zero spread → sensitivity → HerAI interpretation.**

Topic 04 **belum diproduksi** dalam package ini.

> **Apakah Topic 03 Submodule 03 disetujui dan kita boleh melanjutkan ke Topic 04 — Distribution dan Histogram?**
