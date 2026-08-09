# Topic 06 — Coordinate, Graph, dan Perubahan: Melihat Hubungan Input–Output Secara Visual

> **Submodul 01 — Kenapa AI Butuh Matematika? + Mathematical Readiness**  
> **Filename:** `06-coordinate-graph-perubahan.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 55–70 menit membaca + 30–40 menit latihan/interaksi  
> **Prerequisite:** Topic 01–05  
> **Forward dependency:** Topic 07 — Powers, Logarithms, dan Sigma; Submodule 05 — Calculus  
> **Boundary:** Topic ini berhenti pada coordinate literacy, graph interpretation, slope, dan **average rate of change**. Derivative formal belum diajarkan.

---

# 1. Mengapa topik ini ada?

Pada Topic 05 kita mempunyai function:

$$
r(q)=0.5q+0.2
$$

dengan:

- $q$ = quiz ratio sebagai input;
- $r(q)$ = toy readiness output.

Kita juga membuat table:

| $q$ | $r(q)$ |
|---:|---:|
| 0.0 | 0.20 |
| 0.2 | 0.30 |
| 0.4 | 0.40 |
| 0.6 | 0.50 |
| 0.8 | 0.60 |
| 1.0 | 0.70 |

Table sudah membantu kita melihat pasangan input-output.

Tetapi ada pertanyaan baru:

> Bagaimana jika kita ingin **melihat pola perubahan** dengan cepat?

Kita dapat mengubah setiap row menjadi sebuah point:

$$
(q,r(q))
$$

Contoh:

$$
(0.0,0.20)
$$

$$
(0.4,0.40)
$$

$$
(0.8,0.60)
$$

Kemudian points tersebut ditempatkan pada **coordinate plane**.

Graph memberi representation visual dari hubungan input-output.

OpenStax menjelaskan bahwa pada rectangular coordinate system, setiap point direpresentasikan oleh ordered pair $(x,y)$: coordinate pertama menunjukkan posisi pada horizontal $x$-axis dan coordinate kedua menunjukkan posisi pada vertical $y$-axis. [R1]

Setelah kita dapat membaca graph, kita dapat mengajukan pertanyaan yang sangat penting untuk AI:

> **Ketika input berubah, seberapa besar output ikut berubah?**

OpenStax mendefinisikan rate of change sebagai perubahan output relatif terhadap perubahan input; average rate of change dihitung dengan membagi perubahan output dengan perubahan input. [R2][R3]

Inilah bridge kita menuju Calculus nanti.

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 06, kamu diharapkan mampu:

1. menjelaskan fungsi $x$-axis, $y$-axis, dan origin pada coordinate plane;
2. membaca dan menulis ordered pair $(x,y)$ dengan urutan yang benar;
3. memplot point sederhana dari table input-output;
4. membaca graph sebagai representation hubungan, bukan sebagai “gambar dekoratif”;
5. menjelaskan bahwa axis label, unit, dan scale menentukan cara graph harus diinterpretasikan;
6. membedakan graph yang increasing, decreasing, dan constant pada interval sederhana;
7. menghitung perubahan input $\Delta x$ dan perubahan output $\Delta y$;
8. menghitung average rate of change:

$$
\frac{\Delta y}{\Delta x}
$$

9. menginterpretasikan sign positif, negatif, dan nol pada rate of change;
10. menjelaskan unit rate of change sebagai “output unit per input unit”;
11. menghitung average rate of change dari table, dua points, dan simple function;
12. menjelaskan hubungan slope sebuah garis dengan rate of change tanpa masuk derivative;
13. menggunakan HerAI toy function untuk reasoning perubahan input-output;
14. menjelaskan mengapa graph naik tidak membuktikan causation;
15. menjelaskan mengapa visual scale dapat membuat perubahan terlihat lebih besar atau kecil daripada sebenarnya;
16. menyiapkan intuisi untuk derivative dan gradient tanpa mempelajarinya secara formal.

---

# 3. Hook — Dua Cara Melihat Data yang Sama

Perhatikan table berikut:

| Quiz ratio $q$ | Toy output $r(q)$ |
|---:|---:|
| 0.0 | 0.20 |
| 0.2 | 0.30 |
| 0.4 | 0.40 |
| 0.6 | 0.50 |
| 0.8 | 0.60 |
| 1.0 | 0.70 |

Kita bisa membaca row satu per satu.

Tetapi bayangkan keenam ordered pairs tersebut diplot pada bidang koordinat.

Secara visual, kita akan melihat points bergerak:

> ke kanan **dan** ke atas.

Dengan cepat kita mendapat intuition:

> ketika $q$ naik, $r(q)$ juga naik pada toy rule ini.

Graph membuat pattern tertentu lebih mudah terlihat.

Tetapi graph juga dapat menipu jika:

- axis tidak dilabeli;
- units hilang;
- scale dipotong;
- context tidak dijelaskan;
- correlation dibaca sebagai causation.

Jadi tujuan topic ini bukan hanya “bisa gambar grafik”.

Tujuannya:

> **bisa membaca perubahan secara matematis dan interpretatif.**

---

# 4. Predict Before Formalization

## Prediksi A — Urutan coordinate

Point:

$$
(0.8,0.6)
$$

Jika horizontal axis adalah $q$ dan vertical axis adalah $r(q)$, apa artinya?

**A.** $q=0.6$ dan $r(q)=0.8$  
**B.** $q=0.8$ dan $r(q)=0.6$  
**C.** Keduanya tidak punya urutan  
**D.** Angka pertama selalu output

---

## Prediksi B — Arah perubahan

Jika dari satu point ke point berikutnya:

$$
x
$$

naik dan:

$$
y
$$

juga naik, rate of change cenderung memiliki sign apa?

**A.** Positif  
**B.** Negatif  
**C.** Nol  
**D.** Tidak pernah dapat dihitung

---

## Prediksi C — Graph naik = causation?

Jika graph memperlihatkan study duration dan quiz score sama-sama meningkat, apakah itu membuktikan:

> menambah study duration **menyebabkan** quiz score naik?

**A.** Ya  
**B.** Tidak  
**C.** Ya jika garisnya lurus  
**D.** Ya jika datanya banyak

---

## Prediksi D — Mana perubahan yang lebih cepat?

Function A naik dari $0.2$ menjadi $0.4$ ketika input naik dari $0.0$ menjadi $0.4$.

Function B naik dari $0.2$ menjadi $0.6$ ketika input juga naik dari $0.0$ menjadi $0.4$.

Menurut intuition, mana yang berubah lebih cepat terhadap input?

**A.** A  
**B.** B  
**C.** Sama  
**D.** Tidak dapat dibandingkan

Simpan jawabanmu.

---

# 5. Coordinate Plane — Bahasa Posisi

Rectangular coordinate system memiliki dua axes utama:

- horizontal $x$-axis;
- vertical $y$-axis.

Keduanya bertemu di:

$$
(0,0)
$$

yang disebut **origin**. [R1]

Secara sederhana:

- bergerak ke kanan → nilai $x$ bertambah;
- bergerak ke kiri → nilai $x$ berkurang;
- bergerak ke atas → nilai $y$ bertambah;
- bergerak ke bawah → nilai $y$ berkurang.

Untuk running example kita, kita tidak harus menggunakan huruf $x$ dan $y$ sebagai nama quantity sebenarnya.

Kita dapat melabel axis:

- horizontal → quiz ratio $q$;
- vertical → toy output $r(q)$.

Label tersebut penting karena memberi **semantics**.

---

# 6. Ordered Pair

Sebuah point ditulis:

$$
(x,y)
$$

Urutannya penting. [R1]

Coordinate pertama:

$$
x
$$

menunjukkan posisi horizontal.

Coordinate kedua:

$$
y
$$

menunjukkan posisi vertical.

Jadi:

$$
(2,5)
$$

berbeda dari:

$$
(5,2)
$$

Dalam HerAI:

$$
(q,r(q))=(0.8,0.6)
$$

berarti:

- input $q=0.8$;
- output $r(q)=0.6$.

Bukan sebaliknya.

---

# 7. Math Reading Skill — Membaca Point sebagai Pernyataan

Lihat:

$$
(0.8,0.6)
$$

Jika axis:

- horizontal = quiz ratio $q$;
- vertical = toy output $r(q)$;

maka bacaan yang kuat:

> Ketika quiz ratio bernilai $0.8$, function $r$ menghasilkan toy output $0.6$.

Bacaan yang lemah:

> “Point nol koma delapan, nol koma enam.”

Keduanya menyebut coordinate, tetapi hanya bacaan pertama menunjukkan **semantic understanding**.

---

# 8. Plotting Point dari Table

Diberikan:

$$
q=0.4
$$

dan:

$$
r(q)=0.4
$$

Ordered pair:

$$
(0.4,0.4)
$$

Cara membayangkannya:

1. mulai dari origin;
2. bergerak ke kanan hingga $q=0.4$;
3. bergerak ke atas hingga $r(q)=0.4$;
4. tandai titik pertemuan.

OpenStax menggunakan proses serupa untuk plotting ordered pairs pada coordinate plane. [R1]

---

# 9. Dari Function Table ke Graph

Function:

$$
r(q)=0.5q+0.2
$$

memberikan table:

| $q$ | $r(q)$ | Ordered pair |
|---:|---:|---|
| 0.0 | 0.20 | $(0.0,0.20)$ |
| 0.2 | 0.30 | $(0.2,0.30)$ |
| 0.4 | 0.40 | $(0.4,0.40)$ |
| 0.6 | 0.50 | $(0.6,0.50)$ |
| 0.8 | 0.60 | $(0.8,0.60)$ |
| 1.0 | 0.70 | $(1.0,0.70)$ |

Setiap row menjadi satu point.

Jika points berada pada satu linear rule dan kita menggambar graph function-nya, points berada pada garis lurus.

---

# 10. Graph Adalah Representation, Bukan Realitas

Topic 01 mengajarkan:

> representation bukan real-world object itu sendiri.

Hal yang sama berlaku pada graph.

Graph:

- memilih variables tertentu;
- memilih scale tertentu;
- memilih range tampilan;
- dapat menghilangkan variables lain;
- dapat hanya menampilkan subset waktu/data.

Jadi graph yang rapi bukan berarti:

- datanya lengkap;
- hubungan bersifat causal;
- model benar;
- trend akan berlanjut selamanya.

Graph membantu kita **melihat representation sebuah relationship**.

---

# 11. Axis Label, Unit, dan Scale

Bayangkan graph tanpa label:

- horizontal axis: `0, 1, 2, 3`;
- vertical axis: `0, 10, 20, 30`.

Apa artinya?

Kita tidak tahu.

Horizontal axis bisa:

- jam;
- epoch;
- usia;
- quiz attempt;
- distance.

Vertical axis bisa:

- rupiah;
- accuracy;
- loss;
- jumlah peserta.

Karena itu graph yang dapat diinterpretasikan membutuhkan:

1. variable/quantity;
2. unit bila ada;
3. scale.

---

# 12. Scale Bisa Mengubah Kesan Visual

Bayangkan nilai score:

- Day 1 = $79$;
- Day 2 = $80$;
- Day 3 = $81$.

Jika vertical axis ditampilkan dari:

$$
0 \text{ sampai } 100
$$

perubahannya terlihat kecil.

Jika axis dipotong menjadi:

$$
78.5 \text{ sampai } 81.5
$$

perubahan yang sama dapat terlihat sangat dramatis.

Angkanya tidak berubah.

Yang berubah adalah framing visual.

Jadi ketika membaca graph:

> **baca axis sebelum membaca “cerita” garisnya.**

---

# 13. Increasing, Decreasing, dan Constant

OpenStax mendeskripsikan function sebagai **increasing** pada interval ketika function values meningkat saat input meningkat, dan **decreasing** ketika output menurun saat input meningkat. [R2]

## Increasing

Input naik:

$$
x_1 < x_2
$$

dan output:

$$
f(x_1) < f(x_2)
$$

Pada bagian tersebut, graph bergerak ke atas saat kita bergerak ke kanan.

---

## Decreasing

Input naik tetapi output turun:

$$
f(x_1) > f(x_2)
$$

Graph bergerak ke bawah saat ke kanan.

---

## Constant

Input berubah tetapi output tetap:

$$
f(x_1)=f(x_2)
$$

Graph horizontal pada interval tersebut.

---

# 14. Perubahan — Delta

Symbol:

$$
\Delta
$$

dibaca:

> “delta”

dan digunakan untuk menyatakan **change** atau selisih.

Untuk dua input:

$$
x_1
$$

dan:

$$
x_2
$$

perubahan input:

$$
\Delta x
=
x_2-x_1
$$

Untuk dua output:

$$
y_1
$$

dan:

$$
y_2
$$

perubahan output:

$$
\Delta y
=
y_2-y_1
$$

Delta bukan variable baru yang misterius.

Ia adalah shorthand untuk:

> nilai akhir minus nilai awal.

---

# 15. Worked Example 1 — Menghitung $\Delta x$ dan $\Delta y$

Dua points:

$$
(2,5)
$$

dan:

$$
(6,13)
$$

Definisikan:

$$
x_1=2
$$

$$
y_1=5
$$

$$
x_2=6
$$

$$
y_2=13
$$

## Perubahan input

$$
\Delta x
=
x_2-x_1
$$

$$
\Delta x
=
6-2
$$

$$
\Delta x
=
4
$$

## Perubahan output

$$
\Delta y
=
y_2-y_1
$$

$$
\Delta y
=
13-5
$$

$$
\Delta y
=
8
$$

Interpretasi:

> input naik $4$ units dan output naik $8$ units.

---

# 16. Rate of Change — Perubahan Output per Perubahan Input

Hanya mengetahui:

$$
\Delta y=8
$$

belum cukup untuk mengatakan seberapa cepat output berubah.

Kita juga perlu tahu berapa besar input berubah.

Average rate of change:

$$
\frac{\Delta y}{\Delta x}
$$

Dengan coordinate:

$$
\frac{\Delta y}{\Delta x}
=
\frac{y_2-y_1}{x_2-x_1}
$$

dengan:

$$
x_2 \ne x_1
$$

OpenStax mendefinisikan average rate of change sebagai perubahan output dibagi perubahan input. [R2][R3]

---

# 17. Worked Example 2 — Rate of Change Dua Points

Gunakan points:

$$
(2,5)
$$

dan:

$$
(6,13)
$$

Kita sudah punya:

$$
\Delta x=4
$$

dan:

$$
\Delta y=8
$$

Average rate of change:

$$
\frac{\Delta y}{\Delta x}
=
\frac{8}{4}
$$

$$
\frac{\Delta y}{\Delta x}
=
2
$$

Interpretasi:

> Pada interval antara dua points tersebut, output berubah rata-rata $2$ units untuk setiap kenaikan $1$ unit input.

Jika output mempunyai unit rupiah dan input mempunyai unit hari, unit rate-nya:

> rupiah per hari.

OpenStax menekankan bahwa units rate of change adalah **output units per input units**. [R2][R4]

---

# 18. Slope pada Garis

Untuk straight line, rate of change konstan.

Slope biasanya dinotasikan:

$$
m
$$

dan dihitung:

$$
m
=
\frac{y_2-y_1}{x_2-x_1}
$$

atau:

$$
m
=
\frac{\Delta y}{\Delta x}
$$

OpenStax menggunakan slope sebagai change in output divided by change in input. [R4]

Pada garis lurus:

> slope = constant rate of change.

---

# 19. Sign dari Rate of Change

## Positive

Jika:

$$
\Delta x>0
$$

dan:

$$
\Delta y>0
$$

maka:

$$
\frac{\Delta y}{\Delta x}>0
$$

Output naik ketika input naik.

---

## Negative

Jika:

$$
\Delta x>0
$$

tetapi:

$$
\Delta y<0
$$

maka:

$$
\frac{\Delta y}{\Delta x}<0
$$

Output turun ketika input naik.

---

## Zero

Jika:

$$
\Delta y=0
$$

sementara:

$$
\Delta x\ne0
$$

maka:

$$
\frac{\Delta y}{\Delta x}=0
$$

Output tidak berubah pada comparison tersebut.

---

# 20. Worked Example 3 — Positive, Negative, dan Zero

## Case A — Positive

Points:

$$
(1,2)
$$

dan:

$$
(3,6)
$$

Rate:

$$
\frac{6-2}{3-1}
=
\frac{4}{2}
=
2
$$

Positive.

---

## Case B — Negative

Points:

$$
(1,6)
$$

dan:

$$
(3,2)
$$

Rate:

$$
\frac{2-6}{3-1}
=
\frac{-4}{2}
=
-2
$$

Negative.

---

## Case C — Zero

Points:

$$
(1,4)
$$

dan:

$$
(3,4)
$$

Rate:

$$
\frac{4-4}{3-1}
=
\frac{0}{2}
=
0
$$

Output constant antara dua points.

---

# 21. Kenapa $\Delta x=0$ Bermasalah?

Jika:

$$
x_1=x_2
$$

maka:

$$
\Delta x
=
x_2-x_1
=
0
$$

Rate formula akan meminta:

$$
\frac{\Delta y}{0}
$$

Division by zero tidak didefinisikan dalam arithmetic biasa.

Secara geometric, dua points dengan $x$ sama berada pada vertical line.

Slope vertical line tidak memiliki finite value dalam formula slope biasa.

Untuk readiness level kita:

> Jangan gunakan slope formula jika $x_1=x_2$.

---

# 22. Average Rate of Change dari Function

Jika:

$$
y=f(x)
$$

maka average rate of change antara:

$$
x_1
$$

dan:

$$
x_2
$$

dapat ditulis:

$$
\frac{f(x_2)-f(x_1)}{x_2-x_1}
$$

dengan:

$$
x_2\ne x_1
$$

Ini hanya slope antara **dua points** pada graph function. [R2][R3]

Kita belum membahas rate di satu instant tertentu.

Itu wilayah derivative nanti.

---

# 23. HerAI Worked Example — Graph Toy Function

Gunakan function dari Topic 05:

$$
r(q)=0.5q+0.2
$$

Kita pilih dua inputs:

$$
q_1=0.4
$$

dan:

$$
q_2=0.8
$$

## Step 1 — Hitung output pertama

$$
r(0.4)
=
0.5(0.4)+0.2
$$

$$
r(0.4)
=
0.2+0.2
$$

$$
r(0.4)=0.4
$$

Point pertama:

$$
(0.4,0.4)
$$

---

## Step 2 — Hitung output kedua

$$
r(0.8)
=
0.5(0.8)+0.2
$$

$$
r(0.8)
=
0.4+0.2
$$

$$
r(0.8)=0.6
$$

Point kedua:

$$
(0.8,0.6)
$$

---

## Step 3 — Hitung perubahan input

$$
\Delta q
=
0.8-0.4
$$

$$
\Delta q
=
0.4
$$

---

## Step 4 — Hitung perubahan output

$$
\Delta r
=
0.6-0.4
$$

$$
\Delta r
=
0.2
$$

---

## Step 5 — Average rate of change

$$
\frac{\Delta r}{\Delta q}
=
\frac{0.2}{0.4}
$$

$$
\frac{\Delta r}{\Delta q}
=
0.5
$$

Interpretasi:

> Pada toy function $r(q)=0.5q+0.2$, output $r$ berubah $0.5$ unit untuk setiap kenaikan $1$ unit pada $q$.

Karena $q$ sendiri hanya bergerak dari $0$ ke $1$, kita juga dapat membangun intuition yang lebih kecil:

Jika:

$$
\Delta q=0.1
$$

maka pada linear rule ini:

$$
\Delta r
=
0.5(0.1)
=
0.05
$$

Jadi kenaikan quiz ratio $0.1$ berkaitan dengan kenaikan toy output $0.05$ **karena rule tersebut didefinisikan seperti itu**.

Bukan karena kita telah menemukan causal relationship pada data nyata.

---

# 24. Math Reading Skill — Membaca Rate dengan Unit dan Semantics

Misalkan:

$$
\frac{\Delta y}{\Delta x}=2
$$

Jangan berhenti pada:

> “slope dua.”

Tanyakan:

- $x$ mengukur apa?
- $y$ mengukur apa?
- unit-nya apa?

Contoh:

Jika:

- $x$ = study time dalam jam;
- $y$ = completed exercises;

maka rate:

$$
2
$$

dapat dibaca:

> rata-rata tambahan $2$ completed exercises per tambahan $1$ jam pada interval yang sedang dibandingkan.

Tetapi bahkan itu **belum berarti** tambahan satu jam menyebabkan dua exercise selesai.

Itu hanya description rate dalam data/relationship yang diamati.

---

# 25. Bahasa Manusia → Formula

Kalimat:

> Output naik dari 30 menjadi 50 ketika input naik dari 4 menjadi 8.

Definisikan:

$$
x_1=4
$$

$$
x_2=8
$$

$$
y_1=30
$$

$$
y_2=50
$$

Perubahan:

$$
\Delta x
=
8-4
=
4
$$

$$
\Delta y
=
50-30
=
20
$$

Rate:

$$
\frac{\Delta y}{\Delta x}
=
\frac{20}{4}
=
5
$$

Bacaan:

> output berubah rata-rata $5$ units per $1$ unit input pada interval tersebut.

---

# 26. Graph Function Tidak Selalu Garis Lurus

Function:

$$
r(q)=0.5q+0.2
$$

linear, sehingga graph-nya garis lurus dan rate of change konstan.

Tetapi banyak functions tidak linear.

Contoh sederhana:

$$
f(x)=x^2
$$

Table:

| $x$ | $f(x)$ |
|---:|---:|
| 0 | 0 |
| 1 | 1 |
| 2 | 4 |
| 3 | 9 |

Perubahan output:

- dari $0$ ke $1$: naik $1$;
- dari $1$ ke $4$: naik $3$;
- dari $4$ ke $9$: naik $5$.

Jadi rate of change tidak selalu sama di semua interval.

Ini alasan kita menggunakan istilah:

> **average rate of change antara dua points.**

---

# 27. Worked Example 4 — Rate Tidak Konstan

Gunakan:

$$
f(x)=x^2
$$

Bandingkan interval:

$$
0 \rightarrow 1
$$

## Interval 1

$$
f(0)=0
$$

$$
f(1)=1
$$

Average rate:

$$
\frac{1-0}{1-0}
=
1
$$

---

Sekarang interval:

$$
2 \rightarrow 3
$$

$$
f(2)=4
$$

$$
f(3)=9
$$

Average rate:

$$
\frac{9-4}{3-2}
=
5
$$

Jadi:

$$
1 \ne 5
$$

Function yang sama memiliki average rate of change berbeda pada interval berbeda.

Inilah salah satu intuition yang nanti membawa kita ke Calculus.

---

# 28. Average Bukan Instantaneous

Average rate of change:

$$
\frac{f(x_2)-f(x_1)}{x_2-x_1}
$$

menggunakan **dua endpoints**.

Ia menjawab:

> secara rata-rata, seberapa besar output berubah relatif terhadap input antara dua points?

Ia belum menjawab:

> seberapa cepat function berubah tepat pada satu point?

Pertanyaan kedua membutuhkan **instantaneous rate of change** atau derivative.

OpenStax membedakan slope secant line sebagai average rate of change dari derivative sebagai instantaneous rate of change. [R3]

Derivative formal sengaja ditahan untuk Submodule 05.

---

# 29. Secant Line — Preview Tanpa Calculus

Jika kita punya dua points pada curve:

$$
(x_1,f(x_1))
$$

dan:

$$
(x_2,f(x_2))
$$

garis lurus yang menghubungkan kedua points disebut **secant line**.

Slope secant line adalah average rate of change antara dua points tersebut. [R3]

Kita hanya perlu menyimpan intuition:

> dua points → satu secant slope → average change.

Nanti:

> satu point + perubahan yang dibuat makin kecil → derivative intuition.

Belum sekarang.

---

# 30. HerAI — Hold One Input Fixed

Toy function dua input:

$$
h(q,c)=0.6q+0.4c
$$

Graph dua-input function secara penuh memerlukan representation yang lebih kompleks.

Untuk readiness, kita dapat **menahan satu input tetap**.

Misalnya Alya punya completion:

$$
c=0.75
$$

Maka:

$$
h(q,0.75)
=
0.6q+0.4(0.75)
$$

Hitung constant term:

$$
0.4(0.75)=0.30
$$

Sehingga:

$$
h(q,0.75)
=
0.6q+0.30
$$

Sekarang function hanya bergantung pada $q$.

Kita bisa membuat table:

| $q$ | $h(q,0.75)$ |
|---:|---:|
| 0.0 | 0.30 |
| 0.2 | 0.42 |
| 0.4 | 0.54 |
| 0.6 | 0.66 |
| 0.8 | 0.78 |
| 1.0 | 0.90 |

Rate of change:

$$
0.6
$$

pada toy linear rule ini.

Interpretasi:

> Ketika $c$ ditahan pada $0.75$, output toy function berubah $0.6$ unit per kenaikan $1$ unit pada $q$.

Ini bukan partial derivative.

Ini hanya **one-variable slice** dari toy rule.

---

# 31. Change One Thing — Hold $q$ Fixed Instead

Sekarang tahan:

$$
q=0.80
$$

Function:

$$
h(0.80,c)
=
0.6(0.80)+0.4c
$$

$$
h(0.80,c)
=
0.48+0.4c
$$

Table:

| $c$ | $h(0.80,c)$ |
|---:|---:|
| 0.0 | 0.48 |
| 0.2 | 0.56 |
| 0.4 | 0.64 |
| 0.6 | 0.72 |
| 0.8 | 0.80 |
| 1.0 | 0.88 |

Rate:

$$
0.4
$$

Pada toy rule, output lebih sensitive terhadap $q$ daripada $c$ karena coefficient $q$ lebih besar:

$$
0.6>0.4
$$

Tetapi jangan generalize ini menjadi:

> “Quiz lebih penting secara nyata daripada completion.”

Itu hanya property dari **formula yang kita definisikan sendiri**.

---

# 32. Slope Tidak Sama dengan Importance Universal

Misalkan slope toy rule terhadap $q$ adalah:

$$
0.6
$$

dan terhadap $c$ pada slice lain:

$$
0.4
$$

Kita hanya boleh mengatakan:

> Dalam formula toy dan scale yang sedang dipakai, perubahan output terhadap $q$ lebih besar per unit dibanding terhadap $c$.

Kita belum boleh mengatakan:

- $q$ lebih causal;
- $q$ selalu lebih important;
- $q$ lebih useful untuk prediction;
- $q$ harus diberi priority pada production.

Feature scales juga dapat mengubah numeric coefficient interpretation.

Itu nanti membutuhkan model design dan evaluation yang lebih matang.

---

# 33. Graph Association Bukan Causation

Bayangkan scatter plot:

- horizontal = study duration;
- vertical = quiz score.

Points tampak naik ke kanan.

Kita mungkin mendeskripsikan:

> peserta dengan study duration lebih tinggi pada dataset ini cenderung memiliki quiz score lebih tinggi.

Tetapi graph itu sendiri tidak membuktikan:

> menambah study duration **menyebabkan** quiz score naik.

Mungkin ada factors lain:

- prior knowledge;
- motivation;
- difficulty;
- selection effects;
- measurement differences.

Topic Statistics nanti akan menekankan kembali:

> correlation tidak sama dengan causation.

Di sini kita mulai membangun safety habit tersebut.

---

# 34. Graph Tidak Menjamin Extrapolation

Misalkan data hanya tersedia untuk:

$$
0.4 \le q \le 0.9
$$

Lalu kita melihat trend linear.

Apakah kita otomatis boleh memperpanjang graph jauh ke:

$$
q=10
$$

?

Tidak.

Pertama, quiz ratio sendiri secara semantics biasanya berada:

$$
0\le q\le1
$$

Kedua, pattern yang berlaku dalam observed domain tidak otomatis valid jauh di luarnya.

Ini disebut masalah **extrapolation** secara umum.

Untuk beginner level:

> Jangan memperpanjang cerita graph melewati domain yang masuk akal tanpa justification.

---

# 35. Graph dan Missing Context

Sebuah graph dapat mempunyai garis yang sama tetapi meaning berbeda.

Contoh slope:

$$
2
$$

bisa berarti:

- 2 km per jam;
- 2 soal per menit;
- 2 ribu rupiah per hari;
- 2 score units per epoch.

Angka slope tanpa label dan unit tidak cukup.

Matematika selalu harus dibaca bersama semantics.

---

# 36. Misconception Challenge

## Challenge 1 — “Ordered pair $(x,y)$ bisa dibalik”

Tidak.

$$
(x,y)
$$

mempunyai order.

Dalam graph function, coordinate pertama biasanya input dan kedua output.

---

## Challenge 2 — “Graph naik berarti causation”

Tidak.

Graph dapat menunjukkan association/relationship, bukan otomatis causal effect.

---

## Challenge 3 — “Slope besar selalu berarti feature lebih penting”

Tidak.

Slope bergantung pada formula, units, scale, dan context.

---

## Challenge 4 — “Graph yang terlihat curam pasti perubahan numeriknya besar”

Belum tentu.

Axis scale dapat mengubah kesan visual.

---

## Challenge 5 — “Average rate of change adalah derivative”

Tidak.

Average rate menggunakan dua points.

Derivative adalah instantaneous rate pada satu point dan membutuhkan konsep limit yang belum kita pelajari. [R3]

---

## Challenge 6 — “Kalau slope negatif berarti model buruk”

Tidak.

Negative slope hanya berarti output turun ketika input naik pada relationship/interval yang sedang dibaca.

Itu bisa sangat masuk akal tergantung quantity.

---

## Challenge 7 — “Slope nol berarti tidak ada data”

Tidak.

Slope nol dapat berarti output tetap walaupun input berubah.

---

## Challenge 8 — “Coefficient dan slope selalu sama”

Tidak untuk semua function.

Pada linear function:

$$
y=mx+b
$$

coefficient $m$ adalah constant slope.

Pada nonlinear function, rate of change dapat berbeda antar-interval.

---

# 37. Try It Yourself

## Practice A — Ordered Pair

Jika:

$$
(x,y)=(3,7)
$$

mana coordinate horizontal dan vertical?

### Expected answer

- horizontal = $x=3$;
- vertical = $y=7$.

---

## Practice B — Plot from function

Diberikan:

$$
f(x)=2x+1
$$

untuk:

$$
x=2
$$

Hitung point.

### Solution

$$
f(2)=2(2)+1
$$

$$
f(2)=5
$$

Point:

$$
(2,5)
$$

---

## Practice C — Delta

Dua points:

$$
(1,4)
$$

dan:

$$
(5,12)
$$

Hitung:

$$
\Delta x
$$

dan:

$$
\Delta y
$$

### Solution

$$
\Delta x
=
5-1
=
4
$$

$$
\Delta y
=
12-4
=
8
$$

---

## Practice D — Average Rate of Change

Lanjutkan Practice C.

$$
\frac{\Delta y}{\Delta x}
=
\frac{8}{4}
=
2
$$

Interpretasi:

> output bertambah rata-rata 2 units per 1 unit input antara dua points.

---

## Practice E — Negative Rate

Points:

$$
(2,10)
$$

dan:

$$
(6,6)
$$

### Solution

$$
\Delta x
=
6-2
=
4
$$

$$
\Delta y
=
6-10
=
-4
$$

$$
\frac{\Delta y}{\Delta x}
=
\frac{-4}{4}
=
-1
$$

---

## Practice F — HerAI

Function:

$$
r(q)=0.5q+0.2
$$

Hitung average rate antara:

$$
q_1=0.2
$$

dan:

$$
q_2=0.6
$$

### Step 1

$$
r(0.2)=0.3
$$

### Step 2

$$
r(0.6)=0.5
$$

### Step 3

$$
\Delta q
=
0.6-0.2
=
0.4
$$

$$
\Delta r
=
0.5-0.3
=
0.2
$$

### Step 4

$$
\frac{\Delta r}{\Delta q}
=
\frac{0.2}{0.4}
=
0.5
$$

---

## Practice G — Reasoning

Sebuah graph menunjukkan positive slope antara study time dan quiz performance.

Tulis satu pernyataan yang **boleh** dan satu yang **tidak boleh** disimpulkan.

### Strong answer

Boleh:

> Pada data/relationship yang diplot, output meningkat ketika input meningkat pada interval tersebut.

Tidak boleh:

> Tambahan study time pasti menyebabkan quiz performance naik sebesar slope tersebut.

---

## Practice H — Axis trap

Dua graph memakai data yang sama tetapi vertical scale berbeda.

Graph pertama terlihat hampir datar.

Graph kedua terlihat sangat curam.

Apa yang harus dicek?

### Expected answer

- axis minimum/maximum;
- scale interval;
- unit;
- apakah axis dipotong;
- apakah data sebenarnya sama.

---

# 38. Visual & Interactive Specification untuk Web

## [INTERACTIVE VISUAL] Coordinate Plane Basics

**Learning purpose:**  
Memahami $x$-axis, $y$-axis, origin, dan ordered pair.

**Initial point:**

$$
(2,3)
$$

**Learner action:**  
Drag point.

**Expected behavior:**  
Coordinate label update real-time:

$$
(x,y)
$$

Horizontal guide menunjukkan $x$.

Vertical guide menunjukkan $y$.

---

## [STEP-BY-STEP REVEAL] Table → Points → Graph

**Learning purpose:**  
Menunjukkan bahwa graph berasal dari input-output pairs.

**Initial table:**

| $q$ | $r(q)$ |
|---:|---:|
| 0.0 | 0.20 |
| 0.2 | 0.30 |
| 0.4 | 0.40 |
| 0.6 | 0.50 |
| 0.8 | 0.60 |

**Step 1:**  
Highlight row pertama.

**Step 2:**  
Convert menjadi:

$$
(0.0,0.20)
$$

**Step 3:**  
Plot point.

**Repeat** untuk rows berikutnya.

**Final:**  
Reveal graph function.

---

## [INTERACTIVE VISUAL] Rise and Run

**Learning purpose:**  
Membuat $\Delta x$ dan $\Delta y$ terlihat.

**Initial points:**

$$
(2,5)
$$

dan:

$$
(6,13)
$$

**Display:**

Horizontal segment:

$$
\Delta x=4
$$

Vertical segment:

$$
\Delta y=8
$$

**Then reveal:**

$$
\frac{\Delta y}{\Delta x}
=
2
$$

---

## [NUMBER MANIPULATOR] Average Rate of Change

**Function:**

$$
f(x)=x^2
$$

**Controls:**

$x_1$ slider

$x_2$ slider

Constraint:

$$
x_1\ne x_2
$$

**Display:**

$$
\frac{f(x_2)-f(x_1)}{x_2-x_1}
$$

update real-time.

**Learning purpose:**  
Menunjukkan bahwa nonlinear function memiliki average rates yang berbeda pada interval berbeda.

---

## [COMPARE VIEW] Same Data, Different Axis Scale

**Learning purpose:**  
Mengajarkan graph literacy.

**Left graph:**  
Vertical axis $0$–$100$.

**Right graph:**  
Vertical axis $78$–$82$.

Data sama:

$79,80,81$.

**Prompt:**

> “Apakah data berubah, atau hanya visual scale?”

**Expected answer:**  
Data sama; visual framing berbeda.

---

## [NUMBER MANIPULATOR] Hold Completion Fixed

**Function:**

$$
h(q,0.75)=0.6q+0.30
$$

**Slider:**

$$
0\le q\le1
$$

**Display:**

- moving point;
- current $q$;
- output;
- line graph.

**Learning purpose:**  
Melihat effect perubahan satu input ketika input lain ditahan tetap.

**Safety label:**  
“Ini property toy formula, bukan causal effect.”

---

## [COMPARE VIEW] Positive, Negative, Zero Slope

Tampilkan tiga mini graphs:

1. increasing line;
2. decreasing line;
3. horizontal line.

Label:

- positive;
- negative;
- zero rate.

**Learner action:**  
Match interpretation.

---

## [STEP-BY-STEP REVEAL] Average vs Instantaneous

**Learning purpose:**  
Membangun bridge ke Calculus tanpa mengajarkan derivative.

**Initial:**  
Curve dengan two points.

Label:

`Average rate between two points`

Draw secant.

**Final note:**

> “Bagaimana jika dua points dibuat makin dekat? Pertanyaan itu akan muncul lagi di Calculus.”

Jangan tampilkan derivative formula pada Topic 06.

---

# 39. HerAI Running Case — State Setelah Topic 06

Perjalanan kita sekarang:

## Topic 01

Real-world participant:

> Alya

menjadi:

> data representation.

---

## Topic 02

Data mempunyai structure:

- observation;
- feature;
- target;
- prediction.

---

## Topic 03

Raw counts menjadi ratios:

$$
q=0.80
$$

$$
c=0.75
$$

---

## Topic 04

Quantities diberi variables dan masuk expression:

$$
s=0.6q+0.4c
$$

---

## Topic 05

Rule dipandang sebagai function:

$$
h(q,c)=0.6q+0.4c
$$

---

## Topic 06

Kita melihat bagaimana perubahan input berhubungan dengan perubahan output.

Untuk one-input toy function:

$$
r(q)=0.5q+0.2
$$

rate of change:

$$
0.5
$$

Untuk slice HerAI dengan:

$$
c=0.75
$$

kita mendapat:

$$
h(q,0.75)=0.6q+0.30
$$

dengan constant rate:

$$
0.6
$$

Kita belum mengubah coefficient dengan training.

Kita belum menghitung gradient.

Kita belum menyatakan causation.

Kita baru belajar **membaca perubahan**.

---

# 40. Checkpoint

## Checkpoint 1

Apa arti ordered pair:

$$
(x,y)
$$

**Jawaban:**  
Coordinate pertama adalah horizontal/input coordinate $x$, coordinate kedua vertical/output coordinate $y$.

---

## Checkpoint 2

Apa itu origin?

**Jawaban:**

$$
(0,0)
$$

tempat $x$-axis dan $y$-axis berpotongan. [R1]

---

## Checkpoint 3

Apa arti:

$$
\Delta x
$$

**Jawaban:**  
Perubahan input:

$$
x_2-x_1
$$

---

## Checkpoint 4

Apa formula average rate of change?

**Jawaban:**

$$
\frac{\Delta y}{\Delta x}
=
\frac{y_2-y_1}{x_2-x_1}
$$

---

## Checkpoint 5

Apa arti positive rate?

**Jawaban:**  
Ketika input bertambah pada interval yang dibaca, output juga bertambah.

---

## Checkpoint 6

Apa arti negative rate?

**Jawaban:**  
Ketika input bertambah, output menurun pada interval yang dibaca.

---

## Checkpoint 7

Apakah graph naik membuktikan causation?

**Jawaban:**  
Tidak.

---

## Checkpoint 8

Apa unit rate of change?

**Jawaban:**  
Output units per input units. [R2][R4]

---

## Checkpoint 9

Apakah average rate sama dengan derivative?

**Jawaban:**  
Tidak. Average rate menggunakan dua points; derivative adalah instantaneous rate dan akan dipelajari nanti. [R3]

---

## Checkpoint 10

Mengapa axis scale perlu dibaca?

**Jawaban:**  
Karena scale dapat mengubah kesan visual tanpa mengubah underlying data.

---

# 41. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan $x$-axis dan $y$-axis.
- [ ] **I can** membaca origin $(0,0)$.
- [ ] **I can** membaca ordered pair $(x,y)$ dengan urutan benar.
- [ ] **I can** mengubah function table menjadi points.
- [ ] **I can** membaca graph sebagai representation relationship.
- [ ] **I can** memeriksa axis label, unit, dan scale.
- [ ] **I can** mengenali increasing, decreasing, dan constant behavior sederhana.
- [ ] **I can** menghitung $\Delta x$.
- [ ] **I can** menghitung $\Delta y$.
- [ ] **I can** menghitung average rate of change.
- [ ] **I can** menginterpretasikan sign rate.
- [ ] **I can** menyebut unit rate sebagai output per input.
- [ ] **I can** menghitung rate dari dua points.
- [ ] **I can** menghitung rate dari simple function.
- [ ] **I can** menjelaskan mengapa graph naik tidak membuktikan causation.
- [ ] **I can** menjelaskan mengapa axis scale dapat memengaruhi visual impression.
- [ ] **I can** membedakan average rate dari instantaneous rate secara konseptual.
- [ ] **I can** menjelaskan hubungan Topic 06 dengan Calculus tanpa menggunakan derivative formal.

Jika tiga atau lebih belum yakin, ulangi:

- Ordered Pair;
- Delta;
- Worked Example 2;
- HerAI Worked Example;
- Misconception Challenge.

---

# 42. Why This Matters Later

Topic 06 adalah bridge langsung dari algebra ke calculus.

## Topic 07 — Powers, Logarithms, dan Sigma

Topic berikutnya kembali memperkuat notation literacy.

Kita akan belajar symbols yang akan muncul berulang dalam:

- statistics;
- probability;
- loss;
- optimization.

---

## Submodule 02 — Linear Algebra

Coordinate intuition akan membantu membaca:

- vectors;
- geometric distance;
- direction;
- similarity.

Tetapi vector bukan hanya point pada graph; formal treatment datang di Submodule 02.

---

## Submodule 03 — Statistics

Graph akan dipakai untuk membaca:

- distributions;
- scatter patterns;
- trends;
- variability.

Dan kita akan kembali mengingat:

> visual association ≠ causation.

---

## Submodule 05 — Calculus

Average rate of change:

$$
\frac{f(x_2)-f(x_1)}{x_2-x_1}
$$

akan menjadi intuition sebelum kita bertanya:

> bagaimana jika jarak antara dua inputs dibuat semakin kecil?

Itulah jalan menuju derivative.

---

## Submodule 06 — Optimization

Gradient-based optimization membutuhkan pemahaman bahwa perubahan parameter berkaitan dengan perubahan objective.

Topic 06 baru membangun versi satu-dimensional yang paling sederhana dari intuition tersebut.

---

# 43. Summary

Topic 06 mengubah table function menjadi visual relationship.

Kita belajar bahwa coordinate plane menggunakan:

- horizontal $x$-axis;
- vertical $y$-axis;
- origin $(0,0)$;
- ordered pairs $(x,y)$.

Kita kemudian memperkenalkan change:

$$
\Delta x=x_2-x_1
$$

dan:

$$
\Delta y=y_2-y_1
$$

serta average rate of change:

$$
\frac{\Delta y}{\Delta x}
=
\frac{y_2-y_1}{x_2-x_1}
$$

dengan:

$$
x_2\ne x_1
$$

Kita belajar:

1. graph adalah representation, bukan realitas;
2. axis label, unit, dan scale wajib dibaca;
3. positive rate berarti output meningkat saat input meningkat pada comparison tersebut;
4. negative rate berarti output menurun;
5. zero rate berarti output tidak berubah pada interval yang dibandingkan;
6. units rate adalah output units per input units;
7. linear function mempunyai constant slope;
8. nonlinear function dapat mempunyai average rate berbeda di interval berbeda;
9. average rate menggunakan dua points;
10. derivative bukan average rate;
11. graph trend tidak membuktikan causation;
12. slope numeric tidak otomatis berarti universal feature importance.

Pada HerAI toy rule:

$$
r(q)=0.5q+0.2
$$

kita mendapatkan constant rate:

$$
0.5
$$

Dan ketika completion ditahan:

$$
c=0.75
$$

toy two-input function menjadi:

$$
h(q,0.75)=0.6q+0.30
$$

dengan rate terhadap $q$ pada slice tersebut:

$$
0.6
$$

Ini belum calculus.

Tetapi sekarang kita sudah mempunyai intuition yang calculus butuhkan:

> **input berubah → output berubah → kita dapat mengukur perubahan tersebut.**

---

# 44. Bridge ke Topic 07

Sampai Topic 06, kita sudah membangun mathematical language berikut:

- fractions;
- decimals;
- percentages;
- variables;
- expressions;
- equations;
- functions;
- coordinates;
- rates of change.

Masih ada beberapa symbols yang akan muncul berulang di AI tetapi sering membuat beginner berhenti membaca formula:

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

Kita tidak perlu menjadi ahli algebra untuk membacanya.

Tetapi kita perlu mengerti:

- apa arti power/exponent;
- mengapa logarithm membalik exponentiation;
- bagaimana membaca sigma;
- apa arti index dan bounds pada summation;
- kenapa notation tersebut akan muncul pada statistics, probability, loss, dan optimization.

Itulah:

> **Topic 07 — Powers, Logarithms, dan Sigma: Membaca Notasi yang Akan Sering Muncul di AI**

---

# 45. References

## [R1] OpenStax — *Elementary Algebra*, Section 4.1: Use the Rectangular Coordinate System  
**Institution:** OpenStax  
**Concept supported:** rectangular coordinate system, $x$-axis, $y$-axis, origin, ordered pair, plotting points.

https://openstax.org/books/elementary-algebra/pages/4-1-use-the-rectangular-coordinate-system

## [R2] OpenStax — *Precalculus 2e*, Section 1.3: Rates of Change and Behavior of Graphs  
**Institution:** OpenStax  
**Concept supported:** rate of change as change in output relative to change in input; average rate of change; increasing/decreasing behavior.

https://openstax.org/books/precalculus-2e/pages/1-3-rates-of-change-and-behavior-of-graphs

## [R3] OpenStax — *Precalculus 2e*, Section 12.4: Derivatives  
**Institution:** OpenStax  
**Concept supported:** slope of secant line as average rate of change and distinction from instantaneous rate/derivative.

https://openstax.org/books/precalculus-2e/pages/12-4-derivatives

## [R4] OpenStax — *Precalculus 2e*, Section 2.1: Linear Functions  
**Institution:** OpenStax  
**Concept supported:** slope formula, slope as rate of change, output-units per input-units, interpretation of positive/negative slope.

https://openstax.org/books/precalculus-2e/pages/2-1-linear-functions

---

# 46. QA Notes

## Academic QA

- Ordered pair order is preserved.
- Coordinate plane is introduced without unnecessary quadrant memorization.
- Graph is explicitly framed as representation rather than real-world truth.
- Increasing/decreasing statements are bounded to interval/context.
- Rate of change is defined as output change divided by input change.
- Units are explicitly interpreted as output-units per input-units.
- Division by zero case is flagged.
- Average rate of change is not called derivative.
- Secant line is introduced only as a conceptual bridge.
- No formal limit or derivative formula is introduced.
- Positive association/trend is not called causation.
- Toy slope/coefficient is not equated with universal feature importance.
- Two-input HerAI function is reduced to one-variable slices only for readiness; partial derivatives are not introduced.
- Extrapolation outside meaningful domain is warned against.
- Axis-scale manipulation is covered as graph-literacy safety.

## Mathematical QA

### Delta example

$$
\Delta x=6-2=4
$$

$$
\Delta y=13-5=8
$$

$$
\frac{\Delta y}{\Delta x}
=
\frac{8}{4}
=
2
$$

### Positive

$$
\frac{6-2}{3-1}
=
2
$$

### Negative

$$
\frac{2-6}{3-1}
=
-2
$$

### Zero

$$
\frac{4-4}{3-1}
=
0
$$

### HerAI $r(q)$

$$
r(0.4)=0.4
$$

$$
r(0.8)=0.6
$$

$$
\Delta q=0.4
$$

$$
\Delta r=0.2
$$

$$
\frac{\Delta r}{\Delta q}=0.5
$$

### Nonlinear preview

$$
f(x)=x^2
$$

Interval $0\to1$:

$$
\frac{1-0}{1-0}=1
$$

Interval $2\to3$:

$$
\frac{9-4}{3-2}=5
$$

### HerAI slices

At:

$$
c=0.75
$$

$$
h(q,0.75)=0.6q+0.30
$$

At:

$$
q=0.80
$$

$$
h(0.80,c)=0.48+0.4c
$$

All listed table values checked.

## Notation QA

New/reused notation:

- $(x,y)$ = ordered pair;
- $x_1,x_2$ = two input values;
- $y_1,y_2$ = corresponding output values;
- $\Delta x$ = input change;
- $\Delta y$ = output change;
- $m$ = slope for a straight line;
- $f(x)$ = generic function output;
- $q$ = HerAI quiz ratio;
- $c$ = HerAI completion ratio;
- $r(q)$ = one-input toy function;
- $h(q,c)$ = two-input toy function.

All new symbols are explained before or at first substantive use.

## Dependency QA

Topic 06 does **not** formally teach:

- limits;
- derivatives;
- tangent lines;
- gradients;
- partial derivatives;
- vector geometry;
- regression fitting;
- correlation coefficients;
- causal inference;
- optimization.

Those remain in later modules.

## Markdown + KaTeX Contract

- Inline mathematics uses `$...$`.
- Display mathematics uses `$$...$$`.
- No mathematical formula is intentionally placed inside fenced code blocks.
- No raw LaTeX commands are intentionally placed outside math delimiters.
- Commands used are limited to KaTeX-safe notation such as `\frac`, `\Delta`, `\ne`, `\le`, `\rightarrow`, and `\text`.
- Browser-level rendering remains an integration test for the Vanilla JS + KaTeX frontend; this source does not claim runtime browser compilation.

---

# STOP CHECKPOINT

**Topic 06 selesai. Topic 07 belum diproduksi.**

> **Apakah Topic 06 disetujui dan kita boleh melanjutkan ke Topic 07 — Powers, Logarithms, dan Sigma?**
