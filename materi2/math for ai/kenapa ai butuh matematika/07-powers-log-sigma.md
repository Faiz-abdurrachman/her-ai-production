# Topic 07 — Powers, Logarithms, dan Sigma: Membaca Notasi yang Sering Muncul di AI

> **Submodul 01 — Kenapa AI Butuh Matematika? + Mathematical Readiness**  
> **Filename:** `07-powers-log-sigma.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 55–70 menit membaca + 30–40 menit latihan/interaksi  
> **Prerequisite:** Topic 01–06  
> **Forward dependency:** Submodule 02 — Linear Algebra, Submodule 03 — Statistics, Submodule 04 — Probability, Submodule 05 — Calculus, Submodule 06 — Optimization  
> **Boundary:** Topic ini membangun notation literacy. Ia tidak masuk ke algebra exponent yang berat, logarithmic identities kompleks, entropy, cross-entropy, atau derivasi loss.

---

# 1. Mengapa topik ini ada?

Sampai Topic 06, kita sudah belajar membaca:

- fractions;
- decimals;
- percentages;
- variables;
- expressions;
- equations;
- functions;
- coordinates;
- graphs;
- average rate of change.

Sekarang ada beberapa notasi yang hampir pasti akan muncul lagi saat kita masuk ke AI:

$$
x^2
$$

$$
a^n
$$

$$
\log_b(x)
$$

dan:

$$
\sum_{i=1}^{n}x_i
$$

Bagi peserta yang lama tidak belajar matematika formal, simbol-simbol ini sering terlihat lebih menakutkan daripada konsep sebenarnya.

Padahal untuk kebutuhan awal Math for AI, kita tidak perlu menjadi ahli algebra.

Kita perlu mampu menjawab:

> Apa arti simbol ini?

> Apa yang sedang dihitung?

> Input mana yang berubah?

> Apa arti index?

> Apa arti batas bawah dan batas atas pada sigma?

> Mengapa notasi ini muncul lagi di statistics, probability, dan optimization?

Itulah tujuan Topic 07.

Topic ini adalah penutup **Mathematical Readiness Bridge**.

Setelah ini, peserta tidak diharapkan menguasai seluruh matematika AI.

Yang kita targetkan adalah:

> **peserta siap membaca notasi dasar tanpa berhenti setiap kali melihat simbol baru.**

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 07, kamu diharapkan mampu:

1. menjelaskan arti exponent pada bentuk $a^n$;
2. menghitung powers sederhana seperti $2^3$, $5^2$, dan $10^0$;
3. menjelaskan secara intuitif mengapa exponent menggambarkan repeated multiplication untuk positive integer exponent;
4. membedakan $2x$ dari $x^2$;
5. menjelaskan aturan dasar bahwa $a^1=a$ dan $a^0=1$ untuk $a\ne0$;
6. membaca logarithm sebagai inverse dari exponentiation;
7. menginterpretasikan:

$$
\log_b(x)=y
$$

sebagai:

$$
b^y=x
$$

8. menghitung logarithm sederhana yang hasilnya integer;
9. menjelaskan domain dasar logarithm real pada readiness level;
10. membaca notasi sigma:

$$
\sum_{i=1}^{n}x_i
$$

11. menjelaskan arti index, lower bound, upper bound, dan term pada summation;
12. meng-expand sigma notation menjadi penjumlahan biasa;
13. mengubah penjumlahan berulang menjadi sigma notation;
14. menghitung summation sederhana;
15. menjelaskan mengapa sigma berguna ketika jumlah terms banyak;
16. menghubungkan sigma dengan mean pada Statistics dan average loss pada Optimization secara preview;
17. menjelaskan mengapa square dan logarithm sering muncul di AI tanpa mempelajari derivasi lanjut;
18. membaca notasi dengan benar tanpa mengasumsikan semantics yang belum didefinisikan;
19. menyelesaikan integrated readiness check menggunakan seluruh vocabulary Topic 01–07.

---

# 3. Hook — Formula yang Terlihat Sulit, Tapi Bisa Dibaca

Lihat formula:

$$
\frac{1}{n}
\sum_{i=1}^{n}
x_i
$$

Kalau belum terbiasa, formula ini mungkin terasa seperti kombinasi simbol acak.

Tetapi jika kita pecah:

- $n$ = jumlah values;
- $i$ = index;
- $x_i$ = value ke-$i$;
- $\sum$ = jumlahkan;
- $\frac{1}{n}$ = bagi total dengan jumlah values.

Maka formula tersebut sebenarnya hanya mengatakan:

> jumlahkan semua values, lalu bagi dengan banyaknya values.

Itulah struktur mean yang akan kita pelajari secara formal di Statistics.

Tujuan Topic 07 bukan membuat kamu menghafal formula sebanyak mungkin.

Tujuannya:

> **melatih kemampuan membongkar notasi menjadi langkah-langkah yang dapat dipahami.**

---

# 4. Predict Before Formalization

## Prediksi A — Power

Mana yang benar?

$$
3^2
$$

berarti:

**A.** $3+3$  
**B.** $3\times3$  
**C.** $2\times3\times3$  
**D.** $3\times2$

---

## Prediksi B — Beda $2x$ dan $x^2$

Jika:

$$
x=3
$$

apakah:

$$
2x
$$

dan:

$$
x^2
$$

selalu sama?

**A.** Ya  
**B.** Tidak  
**C.** Hanya jika $x$ positif  
**D.** Hanya pada AI

---

## Prediksi C — Logarithm

Jika:

$$
2^3=8
$$

maka:

$$
\log_2(8)
$$

bernilai:

**A.** $2$  
**B.** $3$  
**C.** $8$  
**D.** $16$

---

## Prediksi D — Sigma

Apa arti:

$$
\sum_{i=1}^{4}x_i
$$

**A.** Kalikan empat values  
**B.** Jumlahkan $x_1+x_2+x_3+x_4$  
**C.** Ambil value terbesar  
**D.** Bagi semua values dengan $4$

Simpan jawabanmu.

---

# 5. Bagian I — Powers dan Exponents

## 5.1 Apa itu exponent?

Bentuk:

$$
a^n
$$

dibaca:

> “$a$ pangkat $n$”

atau:

> “$a$ to the power of $n$.”

Untuk positive integer exponent:

$$
a^n
$$

berarti $a$ dikalikan dengan dirinya sendiri sebanyak $n$ factors.

Contoh:

$$
2^3
=
2\times2\times2
$$

$$
2^3=8
$$

OpenStax menjelaskan exponential notation sebagai cara ringkas untuk menuliskan repeated multiplication dari factor yang sama. [R1]

---

# 6. Base dan Exponent

Dalam:

$$
a^n
$$

- $a$ disebut **base**;
- $n$ disebut **exponent**.

Contoh:

$$
5^2
$$

- base = $5$;
- exponent = $2$.

Hitung:

$$
5^2
=
5\times5
=
25
$$

---

# 7. Square dan Cube

Dua exponent yang sangat umum mempunyai nama khusus.

## Square

$$
x^2
$$

dibaca:

> “x squared”

atau:

> “x pangkat dua.”

Contoh:

$$
4^2=16
$$

---

## Cube

$$
x^3
$$

dibaca:

> “x cubed”

atau:

> “x pangkat tiga.”

Contoh:

$$
2^3=8
$$

---

# 8. Jangan Samakan $2x$ dan $x^2$

Ini misconception penting.

Jika:

$$
x=3
$$

maka:

$$
2x
=
2(3)
=
6
$$

Sedangkan:

$$
x^2
=
3^2
=
9
$$

Jadi:

$$
2x\ne x^2
$$

untuk contoh tersebut.

Mengapa?

Karena:

- $2x$ berarti dua kali $x$;
- $x^2$ berarti $x$ dikalikan dengan dirinya sendiri.

---

# 9. Worked Example 1 — Powers Dasar

Hitung:

$$
3^4
$$

## Langkah 1 — Expand

$$
3^4
=
3\times3\times3\times3
$$

## Langkah 2 — Kalikan bertahap

$$
3\times3=9
$$

$$
9\times3=27
$$

$$
27\times3=81
$$

Jadi:

$$
3^4=81
$$

---

# 10. Exponent Satu dan Nol

## Exponent satu

$$
a^1=a
$$

Contoh:

$$
7^1=7
$$

---

## Exponent nol

Untuk:

$$
a\ne0
$$

berlaku:

$$
a^0=1
$$

Contoh:

$$
5^0=1
$$

dan:

$$
10^0=1
$$

OpenStax menjelaskan zero exponent rule sebagai bagian dari properties of exponents. [R2]

Untuk readiness level ini, cukup ingat:

> nonzero number pangkat nol bernilai satu.

Kita tidak membahas $0^0$ karena membutuhkan context lebih lanjut dan tidak dibutuhkan sekarang.

---

# 11. Kenapa Powers Muncul di AI?

Powers muncul karena banyak mathematical quantities perlu:

- memperbesar penalti terhadap deviasi besar;
- merepresentasikan nonlinear relationships;
- menulis polynomial expressions;
- mendefinisikan norms dan distances;
- menghitung variance;
- membentuk transformations.

Contoh yang nanti sering muncul:

$$
(y-\hat{y})^2
$$

Ini membaca:

> square dari selisih antara target $y$ dan prediction $\hat{y}$.

Topic ini belum mengajarkan squared error sebagai loss.

Kita hanya belajar membaca notation.

---

# 12. HerAI Example — Square dari Selisih

Misalkan toy target:

$$
y=0.80
$$

dan toy prediction:

$$
\hat{y}=0.70
$$

Selisih:

$$
y-\hat{y}
=
0.80-0.70
=
0.10
$$

Square:

$$
(y-\hat{y})^2
=
(0.10)^2
$$

$$
(0.10)^2
=
0.01
$$

Jika prediction berbeda lebih jauh:

$$
\hat{y}=0.50
$$

maka:

$$
y-\hat{y}
=
0.80-0.50
=
0.30
$$

Square:

$$
(0.30)^2
=
0.09
$$

Perhatikan:

$$
0.09>0.01
$$

Square membuat deviasi yang lebih besar menghasilkan nilai square yang lebih besar.

Tetapi:

> Kita belum mendefinisikan ini sebagai production loss HerAI.

Ini hanya readiness example.

---

# 13. Change One Thing — Sign Hilang Setelah Squaring

Bandingkan:

$$
(+0.2)^2
$$

dan:

$$
(-0.2)^2
$$

Hitung:

$$
(+0.2)^2=0.04
$$

$$
(-0.2)^2=0.04
$$

Keduanya sama.

Squaring menghilangkan sign pada dua values dengan magnitude yang sama.

Ini membantu menjelaskan mengapa square sering berguna ketika kita peduli pada **besar deviasi**, bukan direction sign-nya.

Tetapi interpretation final tetap bergantung pada formula dan problem.

---

# 14. Math Reading Skill — Powers

Baca:

$$
(y-\hat{y})^2
$$

Weak reading:

> y minus y hat pangkat dua.

Lebih kuat:

> Ambil selisih target $y$ dan prediction $\hat{y}$, lalu square seluruh selisih tersebut.

Parentheses penting.

Bandingkan:

$$
(y-\hat{y})^2
$$

dengan:

$$
y-\hat{y}^2
$$

Keduanya tidak sama.

Pada formula pertama, seluruh selisih di-square.

Pada formula kedua, hanya $\hat{y}$ yang di-square.

---

# 15. Bagian II — Logarithms

## 15.1 Intuisi logarithm

Exponentiation bertanya:

> Jika base dan exponent diketahui, berapa hasilnya?

Contoh:

$$
2^3=8
$$

Logarithm membalik pertanyaan:

> Jika base dan hasil diketahui, exponent berapa yang dibutuhkan?

Karena:

$$
2^3=8
$$

maka:

$$
\log_2(8)=3
$$

OpenStax menjelaskan logarithmic function sebagai inverse dari exponential function. [R3]

---

# 16. Hubungan Exponent dan Logarithm

Hubungan fundamental:

$$
b^y=x
$$

ekuivalen dengan:

$$
\log_b(x)=y
$$

dengan kondisi real-valued logarithm yang sesuai:

$$
b>0,\qquad b\ne1,\qquad x>0
$$

Untuk readiness level:

- base logarithm harus positif;
- base tidak boleh $1$;
- input logarithm real harus positif.

OpenStax menjelaskan hubungan inverse dan domain logarithmic function pada bagian logarithmic functions. [R3][R4]

---

# 17. Worked Example 2 — Membaca Logarithm

Diketahui:

$$
10^2=100
$$

Maka:

$$
\log_{10}(100)=2
$$

Karena pertanyaannya:

> “10 harus dipangkatkan berapa agar menjadi 100?”

Jawabannya:

$$
2
$$

---

# 18. Worked Example 3 — Base Dua

Diketahui:

$$
2^4=16
$$

Maka:

$$
\log_2(16)=4
$$

Karena:

$$
2\times2\times2\times2=16
$$

---

# 19. Logarithm Bukan Division

Jangan membaca:

$$
\log_2(8)
$$

sebagai:

> “log dibagi dua dikali delapan.”

Ini adalah satu function notation.

Input-nya:

$$
8
$$

base-nya:

$$
2
$$

output:

$$
3
$$

karena:

$$
2^3=8
$$

---

# 20. Mengapa Logarithm Muncul di AI?

Logarithm muncul dalam banyak area AI dan statistics, misalnya:

- log-likelihood;
- log probability;
- cross-entropy;
- information theory;
- numerical computation;
- transforming multiplicative relationships.

Tetapi Topic 07 **tidak mengajarkan cross-entropy atau likelihood secara formal**.

Yang perlu kamu pegang hanya:

> logarithm adalah transformation yang berhubungan erat dengan exponentiation.

Nanti pada Probability dan Optimization, notasi log tidak lagi terasa asing.

---

# 21. Preview Aman — Log Probability

Misalkan sebuah probability valid:

$$
p=0.5
$$

Kita mungkin melihat:

$$
\log(p)
$$

atau lebih spesifik:

$$
\ln(p)
$$

pada formula AI.

Symbol:

$$
\ln
$$

biasanya berarti natural logarithm dengan base:

$$
e
$$

Topic ini tidak meminta kamu menghitung natural log manual.

Tujuannya hanya:

> mengenali bahwa $\ln$ adalah jenis logarithm.

---

# 22. Domain Safety — Logarithm Real

Pada real numbers:

$$
\log_b(x)
$$

membutuhkan:

$$
x>0
$$

Jadi expression seperti:

$$
\log_2(0)
$$

tidak mempunyai real finite value.

Dan:

$$
\log_2(-4)
$$

tidak mempunyai real value dalam elementary real-number setting.

Kita tidak masuk complex numbers.

---

# 23. Change One Thing — Exponent ↔ Log

Mulai dari:

$$
3^2=9
$$

Tulis bentuk log:

$$
\log_3(9)=2
$$

Sekarang ubah exponent:

$$
3^3=27
$$

Maka:

$$
\log_3(27)=3
$$

Kita sedang melihat dua representation dari relationship yang sama.

---

# 24. Math Reading Skill — Logarithm

Baca:

$$
\log_2(32)=5
$$

Strong reading:

> Dua harus dipangkatkan lima untuk menghasilkan tiga puluh dua.

Karena:

$$
2^5=32
$$

Itu jauh lebih bermakna daripada hanya membaca simbol satu per satu.

---

# 25. Bagian III — Sigma / Summation Notation

Sekarang kita masuk salah satu notation paling sering muncul di mathematics for AI:

$$
\sum
$$

Symbol tersebut adalah capital Greek letter **Sigma**.

Dalam matematika, ia sering digunakan untuk menulis penjumlahan berulang secara compact.

---

# 26. Apa Arti Sigma?

Lihat:

$$
\sum_{i=1}^{4}x_i
$$

Artinya:

$$
x_1+x_2+x_3+x_4
$$

Jadi sigma bukan operasi misterius.

Ia hanya shorthand untuk:

> jumlahkan terms sesuai index dan bounds yang ditulis.

OpenStax menjelaskan summation notation sebagai compact notation untuk sums dengan index, lower limit, dan upper limit. [R5]

---

# 27. Bagian-Bagian Summation

Perhatikan:

$$
\sum_{i=1}^{n}x_i
$$

Ada beberapa bagian.

## Summation symbol

$$
\sum
$$

berarti:

> jumlahkan.

---

## Index

$$
i
$$

adalah index yang berubah.

---

## Lower bound

$$
i=1
$$

berarti mulai dari index $1$.

---

## Upper bound

$$
n
$$

berarti berhenti pada index $n$.

---

## Term

$$
x_i
$$

adalah value yang dijumlahkan pada setiap index.

---

# 28. Expand Sigma Step by Step

Jika:

$$
n=4
$$

maka:

$$
\sum_{i=1}^{4}x_i
$$

expand menjadi:

$$
x_1+x_2+x_3+x_4
$$

Misalkan:

$$
x_1=2
$$

$$
x_2=5
$$

$$
x_3=3
$$

$$
x_4=10
$$

Maka:

$$
\sum_{i=1}^{4}x_i
=
2+5+3+10
$$

$$
=20
$$

---

# 29. Worked Example 4 — Summation Dasar

Diberikan values:

$$
4,\ 7,\ 2,\ 5
$$

Definisikan:

$$
x_1=4
$$

$$
x_2=7
$$

$$
x_3=2
$$

$$
x_4=5
$$

Maka:

$$
\sum_{i=1}^{4}x_i
=
x_1+x_2+x_3+x_4
$$

Substitute:

$$
=
4+7+2+5
$$

Hitung:

$$
4+7=11
$$

$$
11+2=13
$$

$$
13+5=18
$$

Jadi:

$$
\sum_{i=1}^{4}x_i
=
18
$$

---

# 30. Sigma Tidak Berarti Average

Ini misconception penting.

$$
\sum_{i=1}^{n}x_i
$$

berarti total sum.

Bukan mean.

Untuk mean, nanti kita akan membagi total dengan:

$$
n
$$

sehingga:

$$
\bar{x}
=
\frac{1}{n}
\sum_{i=1}^{n}x_i
$$

Topic 07 hanya preview formula tersebut.

Statistics formal datang di Submodule 03.

---

# 31. Worked Example 5 — Preview Mean dari Sigma

Gunakan:

$$
x_1=4,\quad x_2=7,\quad x_3=2,\quad x_4=5
$$

Kita sudah mendapatkan:

$$
\sum_{i=1}^{4}x_i=18
$$

Jumlah values:

$$
n=4
$$

Mean preview:

$$
\bar{x}
=
\frac{1}{4}
\sum_{i=1}^{4}x_i
$$

Substitute total sum:

$$
\bar{x}
=
\frac{1}{4}(18)
$$

$$
\bar{x}=4.5
$$

Kita belum membahas properties mean.

Tujuannya hanya menunjukkan:

> sigma akan muncul lagi pada Statistics.

---

# 32. Sigma dengan Expression di Dalamnya

Sigma tidak harus menjumlahkan raw variable saja.

Contoh:

$$
\sum_{i=1}^{3}x_i^2
$$

Artinya:

$$
x_1^2+x_2^2+x_3^2
$$

Jika:

$$
x_1=1
$$

$$
x_2=2
$$

$$
x_3=3
$$

maka:

$$
\sum_{i=1}^{3}x_i^2
=
1^2+2^2+3^2
$$

$$
=
1+4+9
$$

$$
=14
$$

Perhatikan order:

> square tiap term, lalu jumlahkan.

---

# 33. Jangan Samakan Dua Formula Ini

Bandingkan:

$$
\left(
\sum_{i=1}^{3}x_i
\right)^2
$$

dan:

$$
\sum_{i=1}^{3}x_i^2
$$

Keduanya berbeda.

Misalkan:

$$
x_1=1,\quad x_2=2,\quad x_3=3
$$

## Formula A

$$
\left(
1+2+3
\right)^2
$$

$$
=
6^2
$$

$$
=36
$$

## Formula B

$$
1^2+2^2+3^2
$$

$$
=
1+4+9
$$

$$
=14
$$

Jadi:

$$
36\ne14
$$

Parentheses dan posisi exponent sangat penting.

---

# 34. HerAI Example — Sum Quiz Ratios

Gunakan quiz ratios:

| Participant | Quiz ratio |
|---|---:|
| Alya | 0.80 |
| Bima | 0.60 |
| Citra | 0.90 |
| Dewi | 0.70 |

Definisikan:

$$
q_1=0.80
$$

$$
q_2=0.60
$$

$$
q_3=0.90
$$

$$
q_4=0.70
$$

Jumlah:

$$
\sum_{i=1}^{4}q_i
=
0.80+0.60+0.90+0.70
$$

Hitung:

$$
0.80+0.60=1.40
$$

$$
1.40+0.90=2.30
$$

$$
2.30+0.70=3.00
$$

Jadi:

$$
\sum_{i=1}^{4}q_i=3.00
$$

Jika nanti kita ingin mean:

$$
\frac{1}{4}
\sum_{i=1}^{4}q_i
=
\frac{3.00}{4}
=
0.75
$$

Sekali lagi, formal statistics ditahan untuk Submodule 03.

---

# 35. Why Sigma Matters in AI

AI formulas sering perlu menghitung sesuatu untuk banyak observations.

Daripada menulis:

$$
\ell^{(1)}
+
\ell^{(2)}
+
\ell^{(3)}
+
\cdots
+
\ell^{(n)}
$$

kita dapat menulis:

$$
\sum_{i=1}^{n}\ell^{(i)}
$$

Jika ingin average:

$$
\frac{1}{n}
\sum_{i=1}^{n}\ell^{(i)}
$$

Di sini:

- $\ell^{(i)}$ = suatu per-example quantity;
- $i$ = index example;
- $n$ = jumlah examples.

Nanti pada Optimization, $\ell^{(i)}$ dapat menjadi per-example loss.

Topic ini tidak mengajarkan loss formal.

Kita hanya mempersiapkan kemampuan membaca notasi.

---

# 36. Math Reading Skill — Sigma ke Bahasa Manusia

Baca:

$$
\frac{1}{n}
\sum_{i=1}^{n}x_i
$$

Step 1:

$$
\sum_{i=1}^{n}x_i
$$

berarti:

> jumlahkan $x_i$ dari observation pertama sampai observation ke-$n$.

Step 2:

$$
\frac{1}{n}
$$

berarti:

> bagi total tersebut dengan jumlah observations.

Strong reading:

> Ambil seluruh values $x_1$ sampai $x_n$, jumlahkan semuanya, kemudian bagi dengan jumlah values $n$.

---

# 37. Bahasa Manusia → Sigma

Kalimat:

> Jumlahkan completion ratio dari participant 1 sampai participant 4.

Definisikan:

$$
c_i
$$

sebagai completion ratio participant ke-$i$.

Maka:

$$
\sum_{i=1}^{4}c_i
$$

---

# 38. Worked Example 6 — HerAI Completion Sum

Completion ratios:

$$
c_1=0.75
$$

$$
c_2=0.625
$$

$$
c_3=1.00
$$

$$
c_4=0.50
$$

Sum:

$$
\sum_{i=1}^{4}c_i
=
0.75+0.625+1.00+0.50
$$

Hitung:

$$
0.75+0.625=1.375
$$

$$
1.375+1.00=2.375
$$

$$
2.375+0.50=2.875
$$

Jadi:

$$
\sum_{i=1}^{4}c_i
=
2.875
$$

Preview mean:

$$
\frac{1}{4}(2.875)
=
0.71875
$$

Kita belum perlu menginterpretasikan statistik ini lebih jauh.

---

# 39. Summation Index Bisa Dimulai dari Angka Lain

Contoh:

$$
\sum_{i=0}^{3}x_i
$$

berarti:

$$
x_0+x_1+x_2+x_3
$$

Jadi jangan berasumsi summation selalu mulai dari $1$.

Baca lower bound.

---

# 40. Upper Bound Menentukan Kapan Berhenti

Contoh:

$$
\sum_{i=1}^{5}x_i
$$

mempunyai terms:

$$
x_1+x_2+x_3+x_4+x_5
$$

Ada lima terms.

Tetapi:

$$
\sum_{i=3}^{5}x_i
$$

berarti:

$$
x_3+x_4+x_5
$$

Hanya tiga terms.

Baca lower dan upper bounds bersama.

---

# 41. Index adalah Penunjuk Posisi, Bukan Nilai Data

Dalam:

$$
x_i
$$

$i$ menunjukkan **which item**.

Jika:

$$
i=3
$$

maka:

$$
x_i=x_3
$$

Index $3$ tidak berarti value tersebut bernilai $3$.

Contoh:

$$
x_3=100
$$

Index:

$$
3
$$

Value:

$$
100
$$

Ini distinction penting untuk dataset notation.

---

# 42. HerAI Running Case — From Participants to Indexed Data

Topic 02 memperkenalkan observation index.

Sekarang kita menggunakannya lagi.

Misalnya:

- observation $1$ = Alya;
- observation $2$ = Bima;
- observation $3$ = Citra;
- observation $4$ = Dewi.

Quiz ratio:

$$
q_i
$$

Completion ratio:

$$
c_i
$$

Maka HerAI dataset dapat diringkas:

| $i$ | Participant | $q_i$ | $c_i$ |
|---:|---|---:|---:|
| 1 | Alya | 0.80 | 0.75 |
| 2 | Bima | 0.60 | 0.625 |
| 3 | Citra | 0.90 | 1.00 |
| 4 | Dewi | 0.70 | 0.50 |

Sekarang notation:

$$
\sum_{i=1}^{4}q_i
$$

dan:

$$
\sum_{i=1}^{4}c_i
$$

mempunyai concrete meaning.

---

# 43. Change One Thing — Tambah Satu Participant

Awalnya:

$$
n=4
$$

dan:

$$
\sum_{i=1}^{4}q_i=3.00
$$

Sekarang tambahkan participant ke-$5$ dengan:

$$
q_5=0.50
$$

Maka:

$$
n=5
$$

dan:

$$
\sum_{i=1}^{5}q_i
=
3.00+0.50
$$

$$
=3.50
$$

Upper bound berubah karena jumlah observations berubah.

Ini intuition penting:

> summation notation dapat berkembang dengan ukuran dataset.

---

# 44. Powers + Sigma Bersama

Formula seperti:

$$
\sum_{i=1}^{n}
(y^{(i)}-\hat{y}^{(i)})^2
$$

mungkin terlihat kompleks.

Mari baca layer demi layer.

## Layer 1

$$
y^{(i)}
$$

target observation ke-$i$.

## Layer 2

$$
\hat{y}^{(i)}
$$

prediction observation ke-$i$.

## Layer 3

$$
y^{(i)}-\hat{y}^{(i)}
$$

selisih target dan prediction.

## Layer 4

$$
(y^{(i)}-\hat{y}^{(i)})^2
$$

square dari selisih.

## Layer 5

$$
\sum_{i=1}^{n}
(y^{(i)}-\hat{y}^{(i)})^2
$$

jumlahkan squared differences untuk observations $1$ sampai $n$.

Kita belum menyebutnya loss function formal.

Tujuannya hanya membuktikan bahwa dengan readiness yang cukup, formula panjang bisa dibaca secara modular.

---

# 45. Worked Example 7 — Membaca Formula Kompleks secara Modular

Diberikan dua toy observations.

Observation 1:

$$
y^{(1)}=0.8
$$

$$
\hat{y}^{(1)}=0.7
$$

Observation 2:

$$
y^{(2)}=0.6
$$

$$
\hat{y}^{(2)}=0.5
$$

Hitung:

$$
\sum_{i=1}^{2}
(y^{(i)}-\hat{y}^{(i)})^2
$$

## Observation 1

$$
y^{(1)}-\hat{y}^{(1)}
=
0.8-0.7
=
0.1
$$

Square:

$$
(0.1)^2=0.01
$$

## Observation 2

$$
y^{(2)}-\hat{y}^{(2)}
=
0.6-0.5
=
0.1
$$

Square:

$$
(0.1)^2=0.01
$$

## Sum

$$
\sum_{i=1}^{2}
(y^{(i)}-\hat{y}^{(i)})^2
=
0.01+0.01
$$

$$
=0.02
$$

Interpretasi aman:

> Sum dari squared differences pada dua toy observations adalah $0.02$.

Jangan overclaim:

> “Model ini bagus.”

Kita belum punya metric threshold, context, atau evaluation framework.

---

# 46. Logarithm + Probability — Preview Tanpa Masuk Probability Formal

Nanti kita dapat melihat expression:

$$
-\log(p)
$$

dengan:

$$
0<p\le1
$$

Topic ini tidak membahas mengapa expression tersebut digunakan pada log loss.

Kita hanya ingin kamu bisa membaca:

1. $p$ adalah suatu probability jika memang didefinisikan demikian;
2. hitung logarithm dari $p$;
3. beri negative sign di depan hasilnya.

Penting:

> Jangan menyebut variable $p$ sebagai probability kalau context belum mendefinisikannya.

Notation tidak menentukan semantics sendirian.

---

# 47. Misconception Challenge

## Challenge 1 — “$x^2$ sama dengan $2x$”

Tidak.

Contoh:

$$
x=3
$$

$$
x^2=9
$$

sementara:

$$
2x=6
$$

---

## Challenge 2 — “Exponent berarti multiplication biasa”

Tidak.

$$
3^4
$$

berarti:

$$
3\times3\times3\times3
$$

bukan:

$$
3\times4
$$

---

## Challenge 3 — “Logarithm adalah division”

Tidak.

$$
\log_2(8)=3
$$

berarti:

$$
2^3=8
$$

---

## Challenge 4 — “Logarithm selalu bisa menerima zero atau negative numbers”

Tidak pada real-valued logarithm dasar.

Input harus:

$$
x>0
$$

---

## Challenge 5 — “Sigma berarti average”

Tidak.

Sigma berarti sum.

Average membutuhkan pembagian tambahan dengan jumlah values.

---

## Challenge 6 — “Index $i=3$ berarti value-nya 3”

Tidak.

Index menunjukkan posisi/item.

Value bisa apa saja.

---

## Challenge 7 — “$\sum x_i^2$ sama dengan $(\sum x_i)^2$”

Tidak.

Contoh sebelumnya menghasilkan:

$$
14
$$

versus:

$$
36
$$

---

## Challenge 8 — “Kalau ada square dan sigma berarti itu pasti loss”

Tidak.

Notation saja tidak menentukan semantics.

---

## Challenge 9 — “Kalau ada log berarti probability”

Tidak.

Logarithm dapat digunakan pada banyak quantities dan contexts.

---

# 48. Try It Yourself

## Practice A — Power

Hitung:

$$
2^5
$$

### Solution

$$
2^5
=
2\times2\times2\times2\times2
$$

$$
=32
$$

---

## Practice B — Zero exponent

Hitung:

$$
7^0
$$

### Answer

$$
1
$$

---

## Practice C — Compare

Jika:

$$
x=4
$$

hitung:

$$
2x
$$

dan:

$$
x^2
$$

### Solution

$$
2x=8
$$

$$
x^2=16
$$

---

## Practice D — Logarithm

Jika:

$$
5^3=125
$$

maka:

$$
\log_5(125)=?
$$

### Answer

$$
3
$$

---

## Practice E — Convert exponential to logarithmic

Ubah:

$$
10^3=1000
$$

menjadi logarithmic form.

### Answer

$$
\log_{10}(1000)=3
$$

---

## Practice F — Expand sigma

Expand:

$$
\sum_{i=1}^{5}a_i
$$

### Answer

$$
a_1+a_2+a_3+a_4+a_5
$$

---

## Practice G — Compute sigma

Diberikan:

$$
a_1=2,\quad
a_2=4,\quad
a_3=6
$$

Hitung:

$$
\sum_{i=1}^{3}a_i
$$

### Solution

$$
2+4+6=12
$$

---

## Practice H — Sigma with squares

Diberikan:

$$
a_1=1,\quad
a_2=2,\quad
a_3=4
$$

Hitung:

$$
\sum_{i=1}^{3}a_i^2
$$

### Solution

$$
1^2+2^2+4^2
$$

$$
=1+4+16
$$

$$
=21
$$

---

## Practice I — Semantic reading

Baca:

$$
\sum_{i=1}^{n}q_i
$$

### Strong answer

> Jumlahkan quiz ratio $q_i$ untuk observations dari index $1$ sampai $n$.

---

## Practice J — Integrated notation

Baca:

$$
\frac{1}{n}
\sum_{i=1}^{n}
q_i
$$

### Strong answer

> Jumlahkan seluruh quiz ratio dari observation pertama sampai observation ke-$n$, lalu bagi hasilnya dengan jumlah observations $n$.

---

# 49. Visual & Interactive Specification untuk Web

## [NUMBER MANIPULATOR] Power Builder

**Learning purpose:**  
Menghubungkan exponent dengan repeated multiplication.

**Controls:**

Base $a$ dari $1$ sampai $10$.

Exponent $n$ dari $1$ sampai $6$.

**Display:**

Jika:

$$
a=3,\quad n=4
$$

tampilkan:

$$
3^4
=
3\times3\times3\times3
=
81
$$

---

## [COMPARE VIEW] $2x$ vs $x^2$

**Initial:**

$$
x=3
$$

Left:

$$
2x=6
$$

Right:

$$
x^2=9
$$

**Learner action:**  
Slider $x$.

**Expected behavior:**  
Kedua outputs update.

**Learning purpose:**  
Mematahkan misconception coefficient vs exponent.

---

## [INTERACTIVE VISUAL] Exponent ↔ Logarithm

**Learning purpose:**  
Menunjukkan inverse relationship.

**Initial state:**

Base:

$$
2
$$

Exponent:

$$
3
$$

Display:

$$
2^3=8
$$

dan otomatis:

$$
\log_2(8)=3
$$

**Learner action:**  
Ubah base dan integer exponent.

**Expected behavior:**  
Kedua representation update together.

---

## [STEP-BY-STEP REVEAL] Anatomy of Sigma

Tampilkan:

$$
\sum_{i=1}^{4}x_i
$$

Highlight bertahap:

1. $\sum$ → operation;
2. $i$ → index;
3. $1$ → lower bound;
4. $4$ → upper bound;
5. $x_i$ → term.

Final reveal:

$$
x_1+x_2+x_3+x_4
$$

---

## [NUMBER MANIPULATOR] Sigma Calculator

**Initial values:**

$$
x_1=2,\quad
x_2=5,\quad
x_3=3,\quad
x_4=10
$$

Display:

$$
\sum_{i=1}^{4}x_i
=
20
$$

**Learner action:**  
Edit values.

**Expected behavior:**  
Expanded sum dan total update real-time.

---

## [COMPARE VIEW] Square of Sum vs Sum of Squares

Left:

$$
\left(
\sum_{i=1}^{3}x_i
\right)^2
$$

Right:

$$
\sum_{i=1}^{3}x_i^2
$$

Initial:

$$
x_1=1,\quad
x_2=2,\quad
x_3=3
$$

Display:

Left:

$$
36
$$

Right:

$$
14
$$

**Learning purpose:**  
Menunjukkan grouping dan exponent placement.

---

## [STEP-BY-STEP REVEAL] Read a Future AI Formula

Start:

$$
\frac{1}{n}
\sum_{i=1}^{n}
(y^{(i)}-\hat{y}^{(i)})^2
$$

Reveal layers:

1. target/prediction difference;
2. square;
3. sum across observations;
4. divide by $n$.

Final text:

> “Sekarang formula panjang dapat dibaca sebagai urutan operasi, bukan sebagai satu blok simbol.”

Do not label it as a specific loss function in this topic.

---

# 50. Integrated HerAI Readiness Challenge

Sekarang kita gabungkan skill dari Topic 01–07.

Dataset:

| $i$ | Participant | Quiz correct | Quiz total | Completion done | Completion total |
|---:|---|---:|---:|---:|---:|
| 1 | Alya | 8 | 10 | 6 | 8 |
| 2 | Bima | 6 | 10 | 5 | 8 |
| 3 | Citra | 9 | 10 | 8 | 8 |
| 4 | Dewi | 7 | 10 | 4 | 8 |

---

## Step 1 — Representation

Dataset adalah representation dari participant-learning information, bukan participant secara utuh.

---

## Step 2 — Observation

Satu row pada toy table:

> satu participant record.

---

## Step 3 — Ratio

Alya:

$$
q_1
=
\frac{8}{10}
=
0.80
$$

Completion:

$$
c_1
=
\frac{6}{8}
=
0.75
$$

---

## Step 4 — Variables

$$
q_1=0.80
$$

$$
c_1=0.75
$$

---

## Step 5 — Function

Toy function:

$$
h(q,c)=0.6q+0.4c
$$

Alya:

$$
h(0.80,0.75)=0.78
$$

---

## Step 6 — Change

Jika completion ditahan:

$$
c=0.75
$$

maka:

$$
h(q,0.75)=0.6q+0.30
$$

Toy rate terhadap $q$:

$$
0.6
$$

---

## Step 7 — Summation

Total quiz ratios:

$$
\sum_{i=1}^{4}q_i
=
3.00
$$

Preview mean:

$$
\frac{1}{4}
\sum_{i=1}^{4}q_i
=
0.75
$$

---

## Step 8 — Notation Reading

Jika nanti kamu melihat:

$$
\sum_{i=1}^{n}
(y^{(i)}-\hat{y}^{(i)})^2
$$

kamu sudah bisa mengatakan:

> untuk setiap observation, hitung selisih target dan prediction, square selisih itu, lalu jumlahkan seluruh squared differences.

Itulah target utama readiness.

---

# 51. Checkpoint

## Checkpoint 1

Apa arti:

$$
3^4
$$

**Jawaban:**  
Empat factors dari $3$ dikalikan:

$$
3\times3\times3\times3
$$

---

## Checkpoint 2

Apakah:

$$
2x=x^2
$$

selalu benar?

**Jawaban:**  
Tidak.

---

## Checkpoint 3

Jika:

$$
2^5=32
$$

maka:

$$
\log_2(32)=?
$$

**Jawaban:**

$$
5
$$

---

## Checkpoint 4

Apa hubungan:

$$
b^y=x
$$

dan:

$$
\log_b(x)=y
$$

**Jawaban:**  
Keduanya adalah equivalent exponential/logarithmic forms dari relationship yang sama.

---

## Checkpoint 5

Apa arti:

$$
\sum_{i=1}^{4}x_i
$$

**Jawaban:**

$$
x_1+x_2+x_3+x_4
$$

---

## Checkpoint 6

Apakah sigma otomatis berarti mean?

**Jawaban:**  
Tidak. Sigma berarti sum.

---

## Checkpoint 7

Apa arti $i$ pada $x_i$?

**Jawaban:**  
Index yang menunjukkan item/observation tertentu.

---

## Checkpoint 8

Apakah:

$$
\sum_{i=1}^{3}x_i^2
$$

sama dengan:

$$
\left(
\sum_{i=1}^{3}x_i
\right)^2
$$

**Jawaban:**  
Tidak.

---

## Checkpoint 9

Apakah semua formula yang mengandung log adalah probability formula?

**Jawaban:**  
Tidak.

---

## Checkpoint 10

Apakah semua formula yang mengandung square dan sigma adalah loss?

**Jawaban:**  
Tidak.

---

# 52. Mastery Check

Sebelum menutup Submodul 01, pastikan kamu dapat mengatakan:

- [ ] **I can** membaca $a^n$ sebagai power.
- [ ] **I can** membedakan base dan exponent.
- [ ] **I can** menghitung positive integer powers sederhana.
- [ ] **I can** menjelaskan $a^0=1$ untuk $a\ne0$.
- [ ] **I can** membedakan $2x$ dan $x^2$.
- [ ] **I can** membaca square dari seluruh expression dengan parentheses.
- [ ] **I can** menjelaskan logarithm sebagai inverse exponentiation.
- [ ] **I can** mengubah bentuk exponential sederhana menjadi logarithmic form.
- [ ] **I can** membaca $\log_b(x)$ dengan benar.
- [ ] **I can** mengingat bahwa real logarithm membutuhkan input positif.
- [ ] **I can** membaca symbol $\sum$ sebagai summation.
- [ ] **I can** menjelaskan lower bound, upper bound, index, dan term.
- [ ] **I can** expand sigma notation.
- [ ] **I can** menulis repeated sum menggunakan sigma.
- [ ] **I can** membedakan sum dari mean.
- [ ] **I can** membedakan sum of squares dari square of sum.
- [ ] **I can** membaca formula AI-like secara modular.
- [ ] **I can** menghubungkan sigma dengan Statistics dan Optimization secara conceptual.
- [ ] **I can** menjelaskan bahwa notation tidak menentukan semantics sendirian.
- [ ] **I can** membaca ulang integrated HerAI case dari representation sampai summation.

Jika lima atau lebih belum yakin, ulangi bagian:

- Powers;
- Logarithm;
- Sigma Anatomy;
- Worked Examples;
- Integrated HerAI Readiness Challenge.

---

# 53. Why This Matters Later

Topic 07 adalah akhir readiness bridge, tetapi notation di sini akan muncul berulang.

## Submodule 02 — Linear Algebra

Square akan muncul ketika kita membicarakan magnitude, distance, dan norm.

Sigma dapat muncul sebagai cara menulis dot product atau aggregate operations, walaupun kita akan memulai dari bentuk vector yang lebih konkret.

---

## Submodule 03 — Statistics

Mean:

$$
\bar{x}
=
\frac{1}{n}
\sum_{i=1}^{n}x_i
$$

Variance juga akan menggunakan square dan summation.

---

## Submodule 04 — Probability

Powers dan logarithms muncul dalam distributions dan log-based quantities.

Tetapi probability rules akan diajarkan dulu sebelum formula yang lebih berat.

---

## Submodule 05 — Calculus

Powers menjadi salah satu family functions yang mudah digunakan untuk memahami derivative.

Logarithm juga mempunyai derivative khusus nanti.

---

## Submodule 06 — Optimization

Objective sering mengaggregate per-example quantities dengan sigma:

$$
J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta})
$$

Pada saat itu, peserta tidak perlu lagi bertanya:

> “Sigma ini apa?”

Mereka dapat fokus pada:

> “Apa arti objective dan loss-nya?”

---

# 54. Summary

Topic 07 menutup Mathematical Readiness dengan tiga notasi besar.

## Powers

$$
a^n
$$

untuk positive integer $n$ berarti repeated multiplication.

Contoh:

$$
2^3=8
$$

Kita juga belajar:

$$
a^1=a
$$

dan untuk:

$$
a\ne0
$$

$$
a^0=1
$$

---

## Logarithms

Logarithm adalah inverse relationship dari exponentiation.

Jika:

$$
b^y=x
$$

maka:

$$
\log_b(x)=y
$$

Contoh:

$$
2^3=8
$$

berarti:

$$
\log_2(8)=3
$$

---

## Sigma

Summation notation:

$$
\sum_{i=1}^{n}x_i
$$

berarti:

> jumlahkan terms $x_i$ dari index $1$ sampai $n$.

Sigma memberi cara compact untuk bekerja dengan banyak observations.

---

Yang lebih penting, seluruh Submodul 01 sekarang membangun satu language chain:

**real world**  
↓  
**representation**  
↓  
**dataset / observation / feature / target**  
↓  
**fraction / decimal / percentage**  
↓  
**variable / expression / equation**  
↓  
**function**  
↓  
**coordinate / graph / change**  
↓  
**power / logarithm / sigma**

Sekarang kita siap masuk ke mathematical object yang lebih terstruktur:

> **vector dan matrix.**

---

# 55. Bridge ke Submodule 02

Di Topic 07 kita menulis data participant satu per satu:

Alya:

$$
q_1=0.80
$$

$$
c_1=0.75
$$

Bima:

$$
q_2=0.60
$$

$$
c_2=0.625
$$

Tetapi AI systems sering bekerja dengan **beberapa features sekaligus**.

Daripada terus menulis quantities terpisah seperti:

- quiz ratio;
- completion ratio;
- math readiness;
- Python readiness;
- AI interest;

kita membutuhkan representation yang dapat mengorganisasi beberapa values menjadi satu mathematical object.

Di situlah kita mulai mengenal:

> **vector**

dan ketika banyak vectors disusun bersama:

> **matrix**

Submodule berikutnya:

# **Submodule 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks**

akan melanjutkan langsung dari readiness yang sudah dibangun di tujuh topic ini.

---

# 56. References

## [R1] OpenStax — *Prealgebra*, Section 10.1: Integer Exponents  
**Institution:** OpenStax  
**Concept supported:** exponential notation sebagai repeated multiplication; base dan exponent.

https://openstax.org/books/prealgebra/pages/10-1-integer-exponents

## [R2] OpenStax — *Elementary Algebra 2e*, Section 6.2: Use Multiplication Properties of Exponents  
**Institution:** OpenStax  
**Concept supported:** zero exponent rule dan foundational exponent properties.

https://openstax.org/books/elementary-algebra-2e/pages/6-2-use-multiplication-properties-of-exponents

## [R3] OpenStax — *Precalculus 2e*, Section 4.3: Logarithmic Functions  
**Institution:** OpenStax  
**Concept supported:** logarithmic function sebagai inverse exponential function; conversion between exponential and logarithmic forms.

https://openstax.org/books/precalculus-2e/pages/4-3-logarithmic-functions

## [R4] OpenStax — *Precalculus 2e*, Section 4.3: Logarithmic Functions  
**Institution:** OpenStax  
**Concept supported:** logarithm domain and base restrictions in real-number setting.

https://openstax.org/books/precalculus-2e/pages/4-3-logarithmic-functions

## [R5] OpenStax — *Calculus Volume 2*, Section 5.2: The Definite Integral / Summation Notation Context  
**Institution:** OpenStax  
**Concept supported:** sigma notation, index, bounds, and summation structure.

https://openstax.org/books/calculus-volume-2/pages/5-2-the-definite-integral

---

# 57. QA Notes

## Academic QA

- Positive integer exponent introduced before broader exponent rules.
- $a^0=1$ limited to $a\ne0$.
- $0^0$ intentionally deferred.
- $2x$ explicitly distinguished from $x^2$.
- Squared difference used only as notation-readiness example, not formal loss teaching.
- Logarithm defined as inverse exponential relationship.
- Real logarithm domain constrained to positive input.
- Base restrictions stated.
- Natural logarithm only previewed.
- Cross-entropy, entropy, likelihood, and log loss are not formally taught.
- Sigma explicitly distinguished from mean.
- Index distinguished from value.
- Sum of squares distinguished from square of sum.
- AI-like formula is decomposed for reading only, not treated as a production loss.
- No ungrounded probability semantics assigned to arbitrary $p$ or score values.

## Mathematical QA

### Powers

$$
3^4=81
$$

$$
5^2=25
$$

$$
2^5=32
$$

$$
(+0.2)^2=0.04
$$

$$
(-0.2)^2=0.04
$$

### Squared difference preview

$$
(0.80-0.70)^2
=
0.10^2
=
0.01
$$

$$
(0.80-0.50)^2
=
0.30^2
=
0.09
$$

### Logarithms

$$
2^3=8
\Longleftrightarrow
\log_2(8)=3
$$

$$
10^2=100
\Longleftrightarrow
\log_{10}(100)=2
$$

$$
2^4=16
\Longleftrightarrow
\log_2(16)=4
$$

### Summation

$$
2+5+3+10=20
$$

$$
4+7+2+5=18
$$

Mean preview:

$$
\frac{18}{4}=4.5
$$

Sum of squares:

$$
1^2+2^2+3^2=14
$$

Square of sum:

$$
(1+2+3)^2=36
$$

HerAI quiz sum:

$$
0.80+0.60+0.90+0.70=3.00
$$

HerAI quiz mean preview:

$$
\frac{3.00}{4}=0.75
$$

HerAI completion sum:

$$
0.75+0.625+1.00+0.50=2.875
$$

Completion mean preview:

$$
\frac{2.875}{4}=0.71875
$$

Toy squared-difference sum:

$$
0.01+0.01=0.02
$$

## Notation QA

New/reused notation:

- $a$ = generic base;
- $n$ = generic exponent / number of observations depending context;
- $a^n$ = power;
- $\log_b(x)$ = logarithm base $b$ of input $x$;
- $\ln(x)$ = natural logarithm preview;
- $\sum$ = summation;
- $i$ = index;
- $x_i$, $q_i$, $c_i$ = indexed values;
- $y^{(i)}$ = target observation ke-$i$;
- $\hat{y}^{(i)}$ = prediction observation ke-$i$;
- $\ell^{(i)}$ = future per-example quantity/loss preview only;
- $J(\boldsymbol{\theta})$ = future objective preview only.

Symbols are defined before substantive use or explicitly labeled as future preview.

## Dependency QA

Topic 07 does **not** formally teach:

- advanced exponent laws;
- irrational/complex logarithms;
- entropy;
- cross-entropy;
- likelihood;
- log loss;
- statistical variance;
- dot product;
- norm;
- derivative rules;
- gradient;
- objective optimization.

Those remain in later submodules.

## Markdown + KaTeX Contract

- Inline mathematics uses `$...$`.
- Display mathematics uses `$$...$$`.
- No mathematical formulas are intentionally placed inside fenced code blocks.
- No raw LaTeX commands are intentionally placed outside math delimiters.
- Commands used are standard KaTeX-safe notation such as `\frac`, `\sum`, `\log`, `\ln`, `\ne`, `\le`, `\qquad`, `\Longleftrightarrow`, `\hat`, `\boldsymbol`, and `\ell`.
- Browser-level rendering remains an integration test for the Vanilla JS + KaTeX frontend; source-level compliance is maintained here.

---

# STOP CHECKPOINT

**Topic 07 selesai. Seluruh tujuh topic materi utama Submodul 01 sekarang sudah diproduksi per topik.**

Belum dibuat pada workflow per-topic ini:

- final `00-informasi-submodul.md` versi sinkron dengan actual Topic 01–07;
- `latihan.md`;
- `kuis.md`;
- `diskusi.md`;
- `referensi.md` gabungan;
- final QA package Submodul 01.

> **Apakah Topic 07 disetujui? Jika iya, langkah berikutnya adalah kita rapikan dan produksi komponen penutup Submodul 01 berdasarkan tujuh topic yang sudah final, sebelum masuk Submodule 02.**
