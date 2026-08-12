# Topic 05 — Function: Dari Input ke Output

> **Submodul 01 — Kenapa AI Butuh Matematika? + Mathematical Readiness**  
> **Filename:** `05-function-input-output.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 50–65 menit membaca + 25–35 menit latihan/interaksi  
> **Prerequisite:** Topic 01–04  
> **Forward dependency:** Topic 06 — Coordinate, Graph, dan Perubahan

---

# 1. Mengapa topik ini ada?

Pada Topic 04 kita sudah mempunyai equation:

$$
s = 0.6q + 0.4c
$$

dengan:

- $q$ = quiz ratio;
- $c$ = completion ratio;
- $s$ = toy instructional score.

Kita juga sudah bisa melakukan substitution.

Untuk Alya:

$$
q = 0.80
$$

dan:

$$
c = 0.75
$$

sehingga:

$$
s
=
0.6(0.80)
+
0.4(0.75)
=
0.78
$$

Sekarang kita akan melihat hubungan tersebut dengan cara yang lebih umum.

Daripada memikirkan formula hanya sebagai satu equation, kita dapat mengatakan:

> Ada sebuah **rule** yang menerima input, memproses input tersebut, lalu menghasilkan output.

Itulah ide utama **function**.

Function adalah salah satu bahasa paling penting dalam matematika modern.

OpenStax mendefinisikan function sebagai relation yang memasangkan setiap input dalam domain dengan **tepat satu output** dalam range. Function notation seperti $y=f(x)$ digunakan untuk menunjukkan bahwa output bergantung pada input. [R1]

Dalam AI, gagasan ini muncul hampir di mana-mana.

Secara konseptual, sebuah model dapat dilihat sebagai rule yang menerima features lalu menghasilkan prediction.

Google, misalnya, menuliskan linear model sebagai hubungan yang mengubah feature values menjadi raw prediction melalui weights dan bias. [R4][R5]

Kita belum belajar training, weights yang dipelajari, atau regression.

Fokus Topic 05 lebih dasar:

> **Apa artinya sebuah rule menerima input dan menghasilkan output secara konsisten?**

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 05, kamu diharapkan mampu:

1. menjelaskan function sebagai mapping dari input ke tepat satu output;
2. membedakan function dari relation yang bukan function;
3. membaca function notation seperti $f(x)$;
4. menjelaskan bahwa parentheses pada $f(x)$ menunjukkan input function, bukan multiplication;
5. mengevaluasi function dengan substitution;
6. membaca function melalui formula, table, dan mapping diagram;
7. menjelaskan domain dan range pada level beginner;
8. menjelaskan bahwa dua input berbeda boleh menghasilkan output yang sama;
9. menjelaskan mengapa satu input yang sama tidak boleh memiliki dua output berbeda jika relation tersebut ingin disebut function;
10. membaca function dengan dua inputs seperti $h(q,c)$;
11. menghubungkan toy HerAI score dengan function notation;
12. menjelaskan bagaimana perubahan input dapat menghasilkan perubahan output;
13. membedakan mathematical function dari program/software yang memiliki hidden state atau randomness pada konteks tertentu;
14. menjelaskan secara konseptual mengapa banyak model AI dapat dipandang sebagai parameterized functions tanpa menganggap semua AI sebagai satu formula sederhana;
15. menyiapkan pemahaman untuk graph dan rate of change pada Topic 06.

---

# 3. Hook — Mesin yang Konsisten

Bayangkan sebuah mesin sederhana.

Kamu memasukkan angka:

$$
3
$$

Mesin menjalankan rule:

> kalikan input dengan $2$, lalu tambah $1$.

Output:

$$
7
$$

Masukkan:

$$
5
$$

Output:

$$
11
$$

Kita bisa menulis rule tersebut:

$$
f(x)=2x+1
$$

Di sini:

- $f$ = nama function;
- $x$ = input;
- $2x+1$ = rule yang menentukan output;
- $f(x)$ = output function ketika input bernilai $x$.

Jika:

$$
x=3
$$

maka:

$$
f(3)=2(3)+1
$$

$$
f(3)=6+1
$$

$$
f(3)=7
$$

Yang penting bukan bentuk “mesin”-nya.

Yang penting adalah:

> Untuk setiap input valid, function tersebut memberi satu output yang ditentukan.

---

# 4. Predict Before Formalization

Sebelum definisi formal, gunakan intuisi.

## Prediksi A

Diketahui:

$$
f(x)=2x+1
$$

Jika:

$$
x=4
$$

berapa output?

**A.** $5$  
**B.** $8$  
**C.** $9$  
**D.** Tidak bisa dihitung

---

## Prediksi B

Sebuah rule memberi:

- input `Alya` → output `Medium`
- input `Bima` → output `Basic`
- input `Citra` → output `High`

Apakah input function harus selalu angka?

**A.** Ya  
**B.** Tidak  
**C.** Hanya pada AI  
**D.** Hanya pada programming

---

## Prediksi C

Apakah relation berikut merupakan function?

- input $1$ → output $5$
- input $2$ → output $5$
- input $3$ → output $7$

**A.** Ya  
**B.** Tidak, karena dua input menghasilkan output yang sama  
**C.** Tidak, karena output harus selalu berbeda  
**D.** Hanya jika input berupa decimal

---

## Prediksi D

Apakah relation berikut merupakan function?

- input $1$ → output $5$
- input $1$ → output $8$

**A.** Ya  
**B.** Tidak  
**C.** Ya, karena input sama  
**D.** Ya, jika output dirata-ratakan

---

# 5. Intuisi — Function sebagai Aturan Input → Output

Function dapat dibayangkan sebagai:

**Input → Rule → Output**

Misalnya:

$$
x
\rightarrow
2x+1
\rightarrow
f(x)
$$

Jika:

$$
x=3
$$

maka:

$$
3
\rightarrow
2(3)+1
\rightarrow
7
$$

Jika:

$$
x=10
$$

maka:

$$
10
\rightarrow
2(10)+1
\rightarrow
21
$$

Function membuat relationship menjadi **reusable**.

Kita tidak perlu membuat aturan baru untuk setiap angka.

Kita mendefinisikan satu rule lalu mengevaluasinya pada banyak inputs.

---

# 6. Definisi Formal Beginner-Friendly

OpenStax menjelaskan bahwa sebuah function adalah relation yang memasangkan setiap input dalam domain dengan **exactly one output** dalam range. [R1]

Untuk course ini, kita akan membacanya sebagai:

> **Function adalah rule atau mapping yang memberikan tepat satu output untuk setiap input yang valid.**

Ada tiga bagian penting:

1. ada input;
2. ada rule/mapping;
3. setiap input valid mempunyai tepat satu output.

---

# 7. Satu Input Harus Memiliki Tepat Satu Output

Perhatikan relation:

- $1 \rightarrow 4$
- $2 \rightarrow 7$
- $3 \rightarrow 10$

Setiap input mempunyai satu output.

Ini dapat menjadi function.

Sekarang:

- $1 \rightarrow 4$
- $1 \rightarrow 9$

Input yang sama:

$$
1
$$

memiliki dua outputs:

$$
4
$$

dan:

$$
9
$$

Dalam definisi function biasa, relation tersebut **bukan function** dari input tersebut ke output tersebut.

Poinnya:

> satu input tidak boleh bercabang menjadi dua output berbeda dalam function yang sama.

---

# 8. Dua Input Berbeda Boleh Memiliki Output yang Sama

Ini misconception yang sangat umum.

Relation:

- $1 \rightarrow 5$
- $2 \rightarrow 5$
- $3 \rightarrow 7$

masih dapat menjadi function.

Kenapa?

Karena setiap input individual hanya mempunyai satu output.

Tidak ada aturan bahwa output harus unik untuk setiap input.

OpenStax secara eksplisit membedakan function dari one-to-one function: function biasa dapat memiliki beberapa inputs yang menghasilkan output sama. [R1]

---

# 9. Function Notation

Bentuk umum:

$$
y=f(x)
$$

dibaca:

> “$y$ adalah function dari $x$”

atau:

> “output $y$ dihasilkan oleh function $f$ dari input $x$.”

Dalam notation:

- $f$ = nama function;
- $x$ = input;
- $f(x)$ = output;
- $y$ = nama lain untuk output.

OpenStax menggunakan $y=f(x)$ untuk menunjukkan bahwa output bergantung pada input $x$. [R1]

---

# 10. Parentheses pada $f(x)$ Bukan Multiplication

Lihat:

$$
f(x)
$$

Ini **bukan**:

$$
f \times x
$$

Parentheses menunjukkan bahwa:

> $x$ sedang diberikan sebagai input ke function $f$.

OpenStax secara eksplisit mengingatkan bahwa parentheses pada notation function menunjukkan input, bukan multiplication. [R1]

Jadi:

$$
f(3)
$$

dibaca:

> nilai function $f$ ketika inputnya $3$.

---

# 11. Worked Example 1 — Evaluating a Function

Diberikan:

$$
f(x)=2x+1
$$

Cari:

$$
f(4)
$$

## Langkah 1 — Identifikasi input

Input:

$$
x=4
$$

## Langkah 2 — Substitute

$$
f(4)
=
2(4)+1
$$

## Langkah 3 — Multiplication

$$
2(4)=8
$$

Maka:

$$
f(4)=8+1
$$

## Langkah 4 — Addition

$$
f(4)=9
$$

## Interpretasi

> Jika function $f$ menerima input $4$, output yang dihasilkan adalah $9$.

---

# 12. Math Reading Skill — Formula ke Bahasa Manusia

Diberikan:

$$
f(x)=3x+2
$$

Weak reading:

> “f x sama dengan tiga x tambah dua.”

Strong reading:

> Function $f$ menerima input $x$, mengalikan input tersebut dengan $3$, kemudian menambahkan $2$ untuk menghasilkan output.

Sekarang:

$$
f(5)=17
$$

Strong reading:

> Ketika input function $f$ adalah $5$, outputnya adalah $17$.

---

# 13. Bahasa Manusia → Function

Kalimat:

> Sebuah rule menerima input $x$, mengalikan input dengan $4$, lalu mengurangi $3$.

Kita dapat menulis:

$$
g(x)=4x-3
$$

Sekarang jika:

$$
x=2
$$

maka:

$$
g(2)=4(2)-3
$$

$$
g(2)=8-3
$$

$$
g(2)=5
$$

---

# 14. Function Bisa Direpresentasikan dengan Banyak Cara

OpenStax membahas function melalui beberapa representation, termasuk formula, table, dan graph. [R3]

Untuk beginner course ini, kita gunakan empat:

1. verbal rule;
2. formula;
3. table;
4. mapping diagram.

---

# 15. Representasi 1 — Verbal Rule

> Kalikan input dengan $2$, lalu tambah $1$.

Ini sudah mendeskripsikan function.

Tidak ada requirement bahwa function harus selalu ditulis sebagai formula.

---

# 16. Representasi 2 — Formula

Rule yang sama:

$$
f(x)=2x+1
$$

Formula lebih compact.

---

# 17. Representasi 3 — Table

| $x$ | $f(x)$ |
|---:|---:|
| 0 | 1 |
| 1 | 3 |
| 2 | 5 |
| 3 | 7 |
| 4 | 9 |

Table memperlihatkan beberapa input-output pairs.

Tetapi table hanya menampilkan values yang dicatat.

Formula dapat mendeskripsikan rule lebih umum jika domain-nya lebih luas.

---

# 18. Representasi 4 — Mapping Diagram

Kita dapat menulis:

- $0 \rightarrow 1$
- $1 \rightarrow 3$
- $2 \rightarrow 5$
- $3 \rightarrow 7$

Mapping diagram bagus untuk menunjukkan aturan:

> satu input → satu output.

---

# 19. Domain — Input Apa yang Diizinkan?

**Domain** adalah set input yang valid untuk sebuah function. [R1][R2]

Contoh:

$$
f(x)=2x+1
$$

Jika tidak ada restriction tambahan dan kita bekerja dengan real numbers, banyak nilai real dapat menjadi input.

Tetapi function lain bisa mempunyai domain yang terbatas oleh semantics.

Contoh HerAI:

Jika:

$$
q
$$

merepresentasikan quiz ratio, maka dalam running case kita:

$$
0 \le q \le 1
$$

karena quiz ratio:

$$
q
=
\frac{\text{correct}}{\text{total}}
$$

dengan correct tidak melebihi total.

Jadi domain bukan hanya soal algebra.

Domain juga bisa dibatasi oleh **makna quantity**.

---

# 20. Range — Output Apa yang Dihasilkan?

**Range** adalah set output yang benar-benar dihasilkan function dari domain yang dipakai. [R1][R2]

Contoh sederhana:

Domain:

$$
\{0,1,2,3\}
$$

Function:

$$
f(x)=2x+1
$$

Outputs:

$$
1,3,5,7
$$

Maka range pada domain tersebut:

$$
\{1,3,5,7\}
$$

Untuk Topic 05 kita tidak masuk interval notation secara mendalam.

Yang penting:

> domain berbicara tentang inputs;
> range berbicara tentang outputs yang dihasilkan.

---

# 21. Domain Bisa Datang dari Dunia Nyata

Bayangkan function:

$$
d(h)=60h
$$

dengan:

- $h$ = durasi dalam jam;
- $d(h)$ = durasi dalam menit.

Secara algebra, kita dapat memasukkan banyak real numbers.

Tetapi jika konteksnya adalah:

> durasi satu sesi belajar,

maka input negatif seperti:

$$
h=-2
$$

tidak mempunyai meaning fisik yang masuk akal.

Jadi mathematical expression dan real-world semantics harus dibaca bersama.

---

# 22. Worked Example 2 — HerAI sebagai Function Satu Input

Sebelum memakai dua inputs, kita buat function sederhana.

Definisikan:

$$
r(q)=0.5q+0.2
$$

dengan:

- $q$ = quiz ratio;
- $r(q)$ = toy readiness output;
- $0.5$ dan $0.2$ = constants untuk latihan.

> Ini bukan production model HerAI dan bukan probability model.

Untuk Alya:

$$
q=0.80
$$

Hitung:

$$
r(0.80)
=
0.5(0.80)+0.2
$$

$$
r(0.80)
=
0.40+0.20
$$

$$
r(0.80)=0.60
$$

Interpretasi:

> Berdasarkan toy rule $r$, input quiz ratio Alya $0.80$ dipetakan ke output $0.60$.

Tidak lebih dari itu.

---

# 23. Change One Thing — Ubah Input

Tetap gunakan:

$$
r(q)=0.5q+0.2
$$

Awalnya:

$$
q=0.80
$$

dan:

$$
r(0.80)=0.60
$$

Sekarang:

$$
q=0.60
$$

Prediksi dulu.

Karena coefficient $q$ positif:

$$
0.5>0
$$

kita memperkirakan output turun.

Hitung:

$$
r(0.60)
=
0.5(0.60)+0.2
$$

$$
r(0.60)
=
0.30+0.20
$$

$$
r(0.60)=0.50
$$

Output berubah:

$$
0.60 \rightarrow 0.50
$$

ketika input:

$$
0.80 \rightarrow 0.60
$$

Ini adalah bridge langsung menuju Topic 06:

> bagaimana perubahan input berhubungan dengan perubahan output?

---

# 24. Function dengan Dua Inputs

Pada HerAI kita sudah memiliki dua quantities:

$$
q
$$

dan:

$$
c
$$

Satu function dapat menerima lebih dari satu input.

OpenStax Calculus Volume 3 mendefinisikan function dua variables sebagai mapping dari setiap ordered pair input ke satu unique output. [R6]

Kita dapat menulis:

$$
h(q,c)=0.6q+0.4c
$$

Dibaca:

> Function $h$ menerima dua inputs, $q$ dan $c$, lalu menghasilkan output berdasarkan weighted combination tersebut.

Di sini:

- $h$ = nama function;
- $q$ = quiz ratio;
- $c$ = completion ratio;
- $h(q,c)$ = output.

---

# 25. Worked Example 3 — HerAI Function Dua Inputs

Definisikan:

$$
h(q,c)=0.6q+0.4c
$$

Untuk Alya:

$$
q=0.80
$$

$$
c=0.75
$$

Kita ingin mencari:

$$
h(0.80,0.75)
$$

## Step 1 — Substitute

$$
h(0.80,0.75)
=
0.6(0.80)
+
0.4(0.75)
$$

## Step 2 — Hitung term pertama

$$
0.6(0.80)=0.48
$$

## Step 3 — Hitung term kedua

$$
0.4(0.75)=0.30
$$

## Step 4 — Jumlahkan

$$
h(0.80,0.75)
=
0.48+0.30
$$

$$
h(0.80,0.75)=0.78
$$

## Interpretasi

> Toy function $h$ memetakan pasangan input quiz ratio $0.80$ dan completion ratio $0.75$ menjadi output $0.78$.

Tetap:

> $0.78$ bukan otomatis probability.

---

# 26. Dari Equation ke Function Notation

Pada Topic 04 kita menulis:

$$
s=0.6q+0.4c
$$

Sekarang kita dapat menulis rule yang sama sebagai:

$$
h(q,c)=0.6q+0.4c
$$

Apa bedanya?

Equation pertama menekankan relationship:

$$
s
=
0.6q+0.4c
$$

Function notation menekankan bahwa:

> output bergantung pada inputs $q$ dan $c$ melalui rule $h$.

Ini membantu ketika kita ingin mengevaluasi rule pada banyak participants.

---

# 27. HerAI Running Case — Satu Function, Banyak Observation

Gunakan:

$$
h(q,c)=0.6q+0.4c
$$

Dataset:

| participant | $q$ | $c$ |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

---

## 27.1 Alya

$$
h(0.80,0.75)=0.78
$$

---

## 27.2 Bima

$$
h(0.60,0.625)
=
0.6(0.60)
+
0.4(0.625)
$$

$$
=
0.36+0.25
$$

$$
=0.61
$$

---

## 27.3 Citra

$$
h(0.90,1.00)
=
0.6(0.90)
+
0.4(1.00)
$$

$$
=
0.54+0.40
$$

$$
=0.94
$$

---

## 27.4 Dewi

$$
h(0.70,0.50)
=
0.6(0.70)
+
0.4(0.50)
$$

$$
=
0.42+0.20
$$

$$
=0.62
$$

---

## 27.5 Table Function Values

| participant | $q$ | $c$ | $h(q,c)$ |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 0.78 |
| Bima | 0.60 | 0.625 | 0.61 |
| Citra | 0.90 | 1.00 | 0.94 |
| Dewi | 0.70 | 0.50 | 0.62 |

Satu rule.

Empat input pairs.

Empat outputs.

Inilah power dari function abstraction.

---

# 28. Same Input → Same Output pada Mathematical Function

Untuk deterministic mathematical function:

$$
h(q,c)=0.6q+0.4c
$$

jika kita memasukkan:

$$
(q,c)=(0.80,0.75)
$$

berulang kali tanpa mengubah rule, hasilnya tetap:

$$
0.78
$$

Function tidak tiba-tiba menghasilkan:

$$
0.42
$$

untuk input yang identik pada rule yang sama.

---

# 29. Tetapi Bagaimana dengan AI yang Tampak Random?

Ini perlu dibedakan secara hati-hati.

Sebuah software AI generatif dapat memberikan output berbeda untuk prompt yang tampak sama karena sistem dapat melibatkan:

- sampling randomness;
- hidden state;
- context yang berbeda;
- system configuration;
- random seed;
- model/version yang berbeda.

Ini tidak membatalkan konsep function.

Secara matematis, kita perlu mendefinisikan **seluruh input/state** yang relevan.

Jika randomness dipakai, kita dapat memandang random source/seed sebagai bagian dari proses/input atau menggunakan probabilistic mapping.

Topic ini tidak membahas stochastic models formal.

Tujuannya hanya mencegah misconception:

> “Kalau chatbot bisa jawab berbeda, berarti function tidak relevan untuk AI.”

Function tetap merupakan fondasi penting; hanya saja sistem nyata dapat mempunyai lebih banyak inputs dan mechanisms daripada formula toy kita.

---

# 30. Function Tidak Harus Berupa Formula Numerik

OpenStax memberi contoh bahwa input function tidak harus selalu angka; input dapat berupa nama atau labels selama setiap input valid menentukan satu output. [R1]

Contoh:

Function:

> bulan → jumlah hari

Pada tahun non-kabisat:

`January → 31`

`February → 28`

`March → 31`

Dua inputs berbeda:

`January`

dan:

`March`

menghasilkan output sama:

`31`

Itu tetap function.

---

# 31. Function vs Non-Function

## Relation A

- `Alya` → `Medium`
- `Bima` → `Basic`
- `Citra` → `High`

Setiap participant mempunyai satu output.

Dapat menjadi function.

---

## Relation B

- `Alya` → `Medium`
- `Alya` → `High`

Jika context dan time-nya sama, input `Alya` memiliki dua outputs berbeda.

Relation ini tidak menjadi function dari participant name saja ke readiness category.

Tetapi mungkin masalah sebenarnya adalah input kita kurang lengkap.

Misalnya:

- `(Alya, January)` → `Medium`
- `(Alya, June)` → `High`

Sekarang inputs berbeda karena time menjadi bagian dari input.

Ini mengajarkan ide penting:

> **Ketika mapping tampak ambigu, mungkin representasi input kita belum memuat context yang dibutuhkan.**

---

# 32. Function dan Data Representation

Topic 01 mengajarkan:

> dunia nyata → representation.

Topic 02:

> representation → observations/features/target.

Topic 03:

> counts → ratios.

Topic 04:

> quantities → variables/expressions.

Sekarang:

> variables → reusable mapping/function.

Jadi function bukan topik yang muncul tiba-tiba.

Ia adalah hasil dari layer-layer sebelumnya.

---

# 33. AI/ML Connection — Model sebagai Mapping dari Features ke Prediction

Secara konseptual, banyak machine learning models dapat dipandang sebagai function yang menerima features dan menghasilkan prediction.

Google menuliskan linear model dalam bentuk:

$$
y'
=
b
+
w_1x_1
+
w_2x_2
+
\cdots
+
w_nx_n
$$

dengan:

- $x_j$ = feature;
- $w_j$ = weight;
- $b$ = bias;
- $y'$ = raw prediction. [R4][R5]

Kita **tidak perlu menguasai formula tersebut sekarang**.

Yang perlu dilihat hanyalah pattern:

**inputs → mathematical rule → output**

Dalam bahasa function, secara konseptual:

$$
\hat{y}=f(\text{features})
$$

Nanti pada Linear Algebra, kita akan membuat representation input lebih compact.

Pada Optimization, parameters dalam function akan diperbaiki berdasarkan objective.

---

# 34. Parameterized Function — Preview Saja

Kita dapat memperluas toy rule:

$$
h(q,c)=0.6q+0.4c
$$

Di sini coefficients sudah fixed.

Model yang belajar dapat mempunyai parameters yang tidak kita tentukan manual.

Secara konseptual:

$$
\hat{y}
=
f(\mathbf{x};\boldsymbol{\theta})
$$

Dibaca:

> prediction $\hat{y}$ dihasilkan oleh function $f$ dari input representation $\mathbf{x}$ dengan parameters $\boldsymbol{\theta}$.

Untuk sekarang:

- $\mathbf{x}$ hanya preview untuk kumpulan inputs;
- $\boldsymbol{\theta}$ hanya preview untuk model parameters.

**Jangan pelajari operasi vector atau optimization dari formula ini sekarang.**

Tujuannya hanya menunjukkan ke mana language function akan dipakai.

---

# 35. Function Bukan Berarti Modelnya Benar

Ini conceptual safety yang penting.

Jika seseorang menulis:

$$
h(q,c)=0.6q+0.4c
$$

formula tersebut adalah function yang valid secara matematis.

Tetapi belum berarti:

- formula itu predictive;
- formula itu fair;
- formula itu calibrated;
- formula itu causal;
- formula itu cocok untuk production;
- weights-nya benar;
- data-nya cukup.

Mathematical validity dan model validity adalah dua hal berbeda.

> **Sebuah rule dapat menjadi function yang sah secara matematika tetapi menjadi model yang buruk untuk dunia nyata.**

---

# 36. Function Output Bukan Otomatis Probability

Toy function:

$$
h(q,c)=0.6q+0.4c
$$

untuk Alya menghasilkan:

$$
0.78
$$

Walaupun nilainya berada pada:

$$
0 \le 0.78 \le 1
$$

kita belum boleh menulis:

$$
P(\text{success})=0.78
$$

Karena $h$ didefinisikan sebagai toy score, bukan probability function.

Sebuah numerical range tidak menentukan semantics.

---

# 37. Function Table sebagai Bridge ke Graph

Gunakan one-input function:

$$
r(q)=0.5q+0.2
$$

Buat table:

| $q$ | $r(q)$ |
|---:|---:|
| 0.0 | 0.20 |
| 0.2 | 0.30 |
| 0.4 | 0.40 |
| 0.6 | 0.50 |
| 0.8 | 0.60 |
| 1.0 | 0.70 |

Perhatikan pattern.

Saat input $q$ naik:

$$
0.0
\rightarrow
0.2
\rightarrow
0.4
$$

output juga naik:

$$
0.20
\rightarrow
0.30
\rightarrow
0.40
$$

Table memberi kita pasangan:

$$
(q,r(q))
$$

Pasangan ini dapat ditempatkan pada coordinate plane.

Itulah yang akan kita lakukan di Topic 06.

---

# 38. Ordered Pair — Preview ke Coordinate

Untuk function satu variable:

$$
y=f(x)
$$

setiap input-output pair dapat ditulis:

$$
(x,y)
$$

atau:

$$
(x,f(x))
$$

Contoh:

$$
f(x)=2x+1
$$

ketika:

$$
x=3
$$

output:

$$
f(3)=7
$$

maka ordered pair:

$$
(3,7)
$$

Topic 06 akan memakai ordered pairs untuk membuat graph.

---

# 39. Change One Thing — Rule yang Berbeda

Input tetap:

$$
x=3
$$

Bandingkan dua functions.

## Function A

$$
f(x)=2x+1
$$

Maka:

$$
f(3)=7
$$

## Function B

$$
g(x)=4x+1
$$

Maka:

$$
g(3)=13
$$

Input sama.

Rule berbeda.

Output berbeda.

Ini menunjukkan:

> output ditentukan oleh **input dan rule**.

Dalam AI, model architecture/parameters merupakan bagian dari rule yang menentukan mapping.

---

# 40. Change One Thing — Input yang Berbeda

Rule tetap:

$$
f(x)=2x+1
$$

Input pertama:

$$
x=3
$$

Output:

$$
7
$$

Input kedua:

$$
x=4
$$

Output:

$$
9
$$

Rule sama.

Input berubah.

Output berubah.

Topic 06 akan mempelajari perubahan tersebut secara visual.

---

# 41. Misconception Challenge

## Challenge 1 — “$f(x)$ berarti $f$ dikali $x$”

Tidak.

$f(x)$ adalah function notation.

Parentheses menunjukkan input. [R1]

---

## Challenge 2 — “Function harus memiliki formula”

Tidak.

Function dapat direpresentasikan dengan mapping, table, verbal rule, atau graph selama mapping input-output memenuhi definisi function.

---

## Challenge 3 — “Dua inputs tidak boleh menghasilkan output sama”

Boleh.

Yang tidak boleh adalah **satu input yang sama** menghasilkan dua outputs berbeda dalam function yang sama.

---

## Challenge 4 — “Input function harus angka”

Tidak.

Function dapat mempunyai non-numerical inputs. [R1]

---

## Challenge 5 — “Kalau output 0.78 berarti probability 78%”

Tidak.

Semantics harus didefinisikan.

---

## Challenge 6 — “Kalau formula valid secara matematika berarti model AI-nya bagus”

Tidak.

Mathematical validity berbeda dari empirical/model validity.

---

## Challenge 7 — “Satu participant harus selalu punya satu readiness untuk selamanya”

Tidak.

Jika readiness berubah terhadap waktu, input perlu memasukkan context/time.

Contoh:

$$
(\text{participant},\text{time})
\rightarrow
\text{readiness}
$$

---

## Challenge 8 — “AI generatif memberi output berbeda, jadi tidak bisa dipahami dengan function”

Terlalu sederhana.

Sistem generatif dapat melibatkan randomness, state, dan context tambahan.

Function/mapping tetap foundational; hanya input/process yang lebih kaya.

---

# 42. Try It Yourself

## Practice A — Evaluate

Diberikan:

$$
f(x)=3x+1
$$

Cari:

$$
f(4)
$$

### Solution

$$
f(4)=3(4)+1
$$

$$
f(4)=12+1
$$

$$
f(4)=13
$$

---

## Practice B — Function atau Bukan?

Relation:

- $1 \rightarrow 4$
- $2 \rightarrow 4$
- $3 \rightarrow 6$

Apakah function?

### Expected answer

Ya.

Setiap input mempunyai tepat satu output.

---

## Practice C — Function atau Bukan?

Relation:

- $1 \rightarrow 4$
- $1 \rightarrow 6$

### Expected answer

Tidak, jika input memang hanya angka $1$ tanpa context tambahan.

---

## Practice D — Translate to function notation

Kalimat:

> Rule $g$ menerima input $x$, mengalikan dengan $5$, lalu mengurangi $2$.

### Expected answer

$$
g(x)=5x-2
$$

---

## Practice E — HerAI one-input function

Diberikan:

$$
r(q)=0.5q+0.2
$$

dan:

$$
q=0.60
$$

Hitung.

### Solution

$$
r(0.60)
=
0.5(0.60)+0.2
$$

$$
=
0.30+0.20
$$

$$
=0.50
$$

---

## Practice F — HerAI two-input function

Diberikan:

$$
h(q,c)=0.6q+0.4c
$$

dan:

$$
q=0.70
$$

$$
c=0.50
$$

Hitung.

### Solution

$$
h(0.70,0.50)
=
0.6(0.70)
+
0.4(0.50)
$$

$$
=
0.42+0.20
$$

$$
=0.62
$$

---

## Practice G — Semantic reasoning

Sebuah function menghasilkan:

$$
h(q,c)=0.62
$$

Apakah itu cukup untuk mengatakan:

> probability participant menguasai materi adalah 62%?

### Expected answer

Tidak.

Function $h$ harus didefinisikan dan divalidasi sebagai probability model sebelum output boleh diberi semantics probability.

---

## Practice H — Domain reasoning

Quiz ratio didefinisikan:

$$
q
=
\frac{\text{correct}}{\text{total}}
$$

dengan:

$$
0
\le
\text{correct}
\le
\text{total}
$$

Apa range valid $q$?

### Expected answer

$$
0 \le q \le 1
$$

---

# 43. Visual & Interactive Specification untuk Web

## [STEP-BY-STEP REVEAL] Function Machine

**Learning purpose:**  
Memperkenalkan input → rule → output.

**Initial state:**

Input card:

`3`

Rule box:

`× 2, then + 1`

Output disembunyikan.

**Learner action:**  
Klik `Run function`.

**Reveal:**

$$
f(3)=2(3)+1=7
$$

---

## [INTERACTIVE VISUAL] One Input, One Output

**Learning purpose:**  
Membedakan function dari non-function.

**Initial state:**  
Input nodes:

`1`, `2`, `3`

Output nodes:

`4`, `5`, `6`

**Learner action:**  
Hubungkan arrows.

**Expected behavior:**  
UI mengizinkan multiple inputs menuju output yang sama.

Jika satu input dihubungkan ke dua outputs, tampilkan:

> “Relation ini tidak lagi menjadi function dari input ini ke output ini.”

---

## [COMPARE VIEW] Function Notation vs Multiplication

Left:

$$
f(x)
$$

Label:

`Function f evaluated at input x`

Right:

$$
f \times x
$$

Label:

`Multiplication`

**Learning purpose:**  
Menghilangkan misconception parentheses.

---

## [INTERACTIVE VISUAL] Formula ↔ Table

**Function:**

$$
f(x)=2x+1
$$

**Learner action:**  
Slider $x$ dari $-5$ sampai $5$.

**Expected behavior:**  
Table menambah/highlight row:

$$
(x,f(x))
$$

secara real-time.

---

## [NUMBER MANIPULATOR] HerAI One-Input Function

Function:

$$
r(q)=0.5q+0.2
$$

**Slider:**

$$
0 \le q \le 1
$$

**Output:**  
$r(q)$ update real-time.

**Prompt:**  
“Ketika $q$ bertambah $0.1$, apa yang terjadi pada output?”

Jangan formalize slope dulu.

---

## [NUMBER MANIPULATOR] HerAI Two-Input Function

Function:

$$
h(q,c)=0.6q+0.4c
$$

Sliders:

$$
0 \le q \le 1
$$

$$
0 \le c \le 1
$$

**Learner action:**  
Ubah satu slider, tahan yang lain fixed.

**Expected behavior:**  
Output update.

**Learning purpose:**  
Membangun sensitivity intuition tanpa calculus formal.

---

## [COMPARE VIEW] Same Input, Different Rule

Input:

$$
x=3
$$

Function A:

$$
f(x)=2x+1
$$

Output:

$$
7
$$

Function B:

$$
g(x)=4x+1
$$

Output:

$$
13
$$

**Learning purpose:**  
Output bergantung pada input dan rule.

---

## [STEP-BY-STEP REVEAL] Table to Ordered Pairs

Table:

| $q$ | $r(q)$ |
|---:|---:|
| 0.0 | 0.20 |
| 0.2 | 0.30 |
| 0.4 | 0.40 |
| 0.6 | 0.50 |
| 0.8 | 0.60 |

**Reveal each row as:**

$$
(q,r(q))
$$

Contoh:

$$
(0.8,0.6)
$$

**Final message:**

> “Di Topic 06, ordered pairs ini akan menjadi points pada coordinate plane.”

---

# 44. Checkpoint

## Checkpoint 1

Apa definisi beginner-friendly function?

**Jawaban:**  
Rule/mapping yang memberikan tepat satu output untuk setiap input valid.

---

## Checkpoint 2

Apakah dua inputs berbeda boleh menghasilkan output sama?

**Jawaban:**  
Ya.

---

## Checkpoint 3

Apakah satu input yang sama boleh mempunyai dua outputs berbeda dalam mathematical function yang sama?

**Jawaban:**  
Tidak.

---

## Checkpoint 4

Apa arti:

$$
f(3)
$$

**Jawaban:**  
Output function $f$ ketika input-nya $3$.

---

## Checkpoint 5

Apakah:

$$
f(x)
$$

berarti:

$$
f\times x
$$

**Jawaban:**  
Tidak.

---

## Checkpoint 6

Apa itu domain?

**Jawaban:**  
Set input yang valid untuk function.

---

## Checkpoint 7

Apa itu range?

**Jawaban:**  
Set outputs yang dihasilkan function dari domain yang digunakan.

---

## Checkpoint 8

Jika:

$$
f(x)=2x+1
$$

berapa:

$$
f(5)
$$

**Jawaban:**

$$
f(5)=11
$$

---

## Checkpoint 9

Apakah function boleh menerima dua inputs?

**Jawaban:**  
Ya.

Contoh:

$$
h(q,c)
$$

---

## Checkpoint 10

Apakah output function HerAI $0.78$ otomatis probability?

**Jawaban:**  
Tidak.

---

# 45. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan function sebagai input → rule → output.
- [ ] **I can** menjelaskan syarat satu input memiliki tepat satu output.
- [ ] **I can** menjelaskan bahwa dua inputs berbeda boleh menghasilkan output sama.
- [ ] **I can** membaca $f(x)$ dengan benar.
- [ ] **I can** menjelaskan bahwa $f(x)$ bukan multiplication.
- [ ] **I can** mengevaluasi function melalui substitution.
- [ ] **I can** membaca function dari formula.
- [ ] **I can** membaca function dari table.
- [ ] **I can** menjelaskan domain.
- [ ] **I can** menjelaskan range.
- [ ] **I can** membaca function dua inputs seperti $h(q,c)$.
- [ ] **I can** mengevaluasi HerAI toy function langkah demi langkah.
- [ ] **I can** menjelaskan bahwa mathematical function yang valid belum tentu model AI yang bagus.
- [ ] **I can** menjelaskan bahwa output range $0$–$1$ tidak otomatis probability.
- [ ] **I can** menjelaskan bagaimana perubahan input dapat mengubah output.
- [ ] **I can** menghubungkan function table dengan ordered pairs yang akan digraph pada Topic 06.

Jika tiga atau lebih item belum yakin, ulangi:

- Function Notation;
- Worked Example 1;
- Function dengan Dua Inputs;
- Misconception Challenge;
- Try It Yourself.

---

# 46. Why This Matters Later

Function adalah salah satu dependency paling besar pada seluruh Math for AI.

## Topic 06 — Coordinate, Graph, dan Perubahan

Function menghasilkan input-output pairs:

$$
(x,f(x))
$$

Pairs tersebut dapat menjadi points pada coordinate plane.

Graph akan membuat perubahan output terhadap input terlihat secara visual.

---

## Topic 07 — Powers, Logarithms, dan Sigma

Function notation membantu ketika kita melihat transformations seperti power dan logarithm sebagai mappings.

---

## Submodule 02 — Linear Algebra

Inputs model nanti tidak hanya satu scalar.

Kita akan bekerja dengan vectors dan matrices.

---

## Submodule 03 — Statistics

Statistical summaries dan transformations dapat dipahami sebagai rules yang menerima data lalu menghasilkan quantities.

---

## Submodule 04 — Probability

Probability distributions dan probability functions akan memakai function language yang lebih formal.

---

## Submodule 05 — Calculus

Derivative bertanya:

> bagaimana output function berubah ketika input berubah?

Tanpa function literacy, derivative akan terasa seperti manipulasi symbol tanpa makna.

---

## Submodule 06 — Optimization

Objective/loss adalah function dari model parameters.

Optimization mencoba mencari parameter values yang membuat objective sesuai tujuan.

---

# 47. Summary

Topic 05 mengubah cara kita melihat formula.

Pada Topic 04:

$$
s=0.6q+0.4c
$$

adalah equation.

Pada Topic 05 kita juga dapat menulis:

$$
h(q,c)=0.6q+0.4c
$$

dan membaca:

> function $h$ menerima quiz ratio $q$ dan completion ratio $c$, kemudian menghasilkan satu output.

Kita belajar bahwa:

1. function adalah mapping input ke tepat satu output;
2. dua inputs boleh menghasilkan output sama;
3. satu input yang sama tidak boleh menghasilkan dua outputs berbeda dalam function yang sama;
4. $f(x)$ adalah function notation, bukan multiplication;
5. evaluating function berarti memberi input lalu menghitung output;
6. function dapat direpresentasikan sebagai verbal rule, formula, table, mapping, dan nanti graph;
7. domain adalah inputs valid;
8. range adalah outputs yang dihasilkan;
9. function dapat menerima lebih dari satu input;
10. machine learning model secara konseptual dapat dipandang sebagai mapping features → prediction;
11. mathematical validity sebuah function tidak menjamin model validity;
12. output $0$–$1$ tidak otomatis probability;
13. perubahan input dapat menghasilkan perubahan output.

HerAI running case sekarang mempunyai reusable rule:

$$
h(q,c)=0.6q+0.4c
$$

Tetapi kita belum melihat rule itu secara visual.

Itulah langkah berikutnya.

---

# 48. Bridge ke Topic 06

Lihat function:

$$
r(q)=0.5q+0.2
$$

Kita sudah mempunyai table:

| $q$ | $r(q)$ |
|---:|---:|
| 0.0 | 0.20 |
| 0.2 | 0.30 |
| 0.4 | 0.40 |
| 0.6 | 0.50 |
| 0.8 | 0.60 |
| 1.0 | 0.70 |

Setiap row dapat ditulis sebagai ordered pair:

$$
(q,r(q))
$$

Misalnya:

$$
(0.0,0.20)
$$

$$
(0.4,0.40)
$$

$$
(0.8,0.60)
$$

Jika pairs tersebut kita letakkan pada coordinate plane, sebuah pattern akan muncul.

Kita akan mulai bertanya:

- apa arti horizontal axis?
- apa arti vertical axis?
- bagaimana membaca point?
- bagaimana membaca garis?
- apa yang dimaksud perubahan?
- bagaimana membandingkan perubahan output terhadap perubahan input?

Itulah:

> **Topic 06 — Coordinate, Graph, dan Perubahan**

---

# 49. References

## [R1] OpenStax — *Precalculus 2e*, Section 1.1: Functions and Function Notation  
**Institution:** OpenStax  
**Concept supported:** definition of function; each input maps to exactly one output; function notation $y=f(x)$; inputs need not always be numerical; parentheses denote function input rather than multiplication.

https://openstax.org/books/precalculus-2e/pages/1-1-functions-and-function-notation

## [R2] OpenStax — *Precalculus 2e*, Section 1.2: Domain and Range  
**Institution:** OpenStax  
**Concept supported:** domain as valid input set and range as output set; domain restrictions.

https://openstax.org/books/precalculus-2e/pages/1-2-domain-and-range

## [R3] OpenStax — *Calculus Volume 1*, Section 1.1: Review of Functions  
**Institution:** OpenStax  
**Concept supported:** function notation, domain/range, and multiple representations of functions through tables, formulas, and graphs.

https://openstax.org/books/calculus-volume-1/pages/1-1-review-of-functions

## [R4] Google for Developers — Machine Learning Glossary  
**Institution:** Google  
**Concept supported:** linear model mapping feature values through weights and bias to a raw prediction.

https://developers.google.com/machine-learning/glossary

## [R5] Google for Developers — Machine Learning Crash Course: Linear Regression  
**Institution:** Google  
**Concept supported:** linear regression uses a mathematical relationship between features and a prediction, with learned weights and bias.

https://developers.google.com/machine-learning/crash-course/linear-regression

## [R6] OpenStax — *Calculus Volume 3*, Section 4.1: Functions of Several Variables  
**Institution:** OpenStax  
**Concept supported:** a function of two variables maps each ordered pair in its domain to a unique output.

https://openstax.org/books/calculus-volume-3/pages/4-1-functions-of-several-variables

---

# 50. QA Notes

## Academic QA

- Function didefinisikan sebagai mapping setiap valid input ke tepat satu output.
- Tidak mengajarkan bahwa outputs harus unique.
- $f(x)$ tidak disamakan dengan multiplication.
- Inputs tidak dibatasi harus numerical.
- Domain/range diajarkan pada readiness level tanpa interval-notation overload.
- Function dua variables diperkenalkan sebagai bridge, bukan multivariable calculus.
- AI model dijelaskan secara konseptual sebagai mapping features → prediction, tidak disederhanakan sebagai seluruh AI hanya satu formula linear.
- Toy HerAI function tidak disebut production recommendation model.
- Output toy score tidak disebut probability.
- Parameterized function hanya preview; vector algebra dan parameter optimization ditahan untuk submodule berikutnya.
- Random/stochastic AI dibahas hanya sebagai conceptual caveat, bukan formal probability module.

## Mathematical QA

Checked:

$$
f(x)=2x+1
$$

$$
f(4)=2(4)+1=9
$$

$$
g(x)=4x-3
$$

$$
g(2)=8-3=5
$$

HerAI one-input:

$$
r(q)=0.5q+0.2
$$

$$
r(0.80)=0.60
$$

$$
r(0.60)=0.50
$$

HerAI two-input:

$$
h(q,c)=0.6q+0.4c
$$

Alya:

$$
h(0.80,0.75)=0.78
$$

Bima:

$$
h(0.60,0.625)=0.61
$$

Citra:

$$
h(0.90,1.00)=0.94
$$

Dewi:

$$
h(0.70,0.50)=0.62
$$

## Notation QA

New/reused symbols:

- $f$, $g$, $h$, $r$ = function names;
- $x$ = generic scalar input;
- $f(x)$ = output of function $f$ at input $x$;
- $q$ = quiz ratio;
- $c$ = completion ratio;
- $h(q,c)$ = HerAI toy output from two inputs;
- $y$ = generic output;
- $\hat{y}$ = prediction preview;
- $\mathbf{x}$ = future vector input preview only;
- $\boldsymbol{\theta}$ = future parameter vector preview only.

Every new symbol is defined before substantive use.

## Dependency QA

Topic 05 does not formally teach:

- coordinate graph construction in detail;
- slope/rate of change;
- vector operations;
- matrix operations;
- probability distributions;
- derivatives;
- gradients;
- optimization;
- parameter fitting.

It prepares those concepts through function literacy.

## Markdown + KaTeX Contract

- Inline mathematics uses `$...$`.
- Display mathematics uses `$$...$$`.
- No intended mathematical formula appears in a fenced code block.
- No intended raw LaTeX command appears outside math delimiters.
- Commands used are KaTeX-safe basic notation such as `\frac`, `\le`, `\cdots`, `\text`, `\hat`, `\mathbf`, and `\boldsymbol`.
- Browser-level rendering still requires integration testing in the Vanilla JS + KaTeX frontend.

---

# STOP CHECKPOINT

**Topic 05 selesai. Topic 06 belum diproduksi.**

> **Apakah Topic 05 disetujui dan kita boleh melanjutkan ke Topic 06 — Coordinate, Graph, dan Perubahan?**
