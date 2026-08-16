# Topic 04 — Variable, Expression, dan Equation: Memberi Nama pada Kuantitas dan Membaca Hubungan Matematis

> **Submodul 01 — Kenapa AI Butuh Matematika? + Mathematical Readiness**  
> **Filename:** `04-variable-expression-equation.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 45–60 menit membaca + 25–35 menit latihan/interaksi  
> **Prerequisite:** Topic 01–03  
> **Forward dependency:** Topic 05 — Function dan Input–Output

---

# 1. Mengapa topik ini ada?

Pada Topic 03 kita sudah menghitung dua quantity untuk Alya:

Quiz ratio:

$$
\frac{8}{10}
=
0.80
$$

Completion ratio:

$$
\frac{6}{8}
=
0.75
$$

Kalau setiap kali kita ingin membicarakan quantity tersebut kita harus menulis:

> “quiz ratio Alya yang bernilai 0.80”

dan:

> “completion ratio Alya yang bernilai 0.75”

materi akan cepat menjadi panjang.

Matematika memberi kita cara yang jauh lebih ringkas:

$$
q = 0.80
$$

dan:

$$
c = 0.75
$$

Sekarang kita bisa membangun expression:

$$
0.6q + 0.4c
$$

atau equation:

$$
s = 0.6q + 0.4c
$$

Lalu kita dapat melakukan substitution:

$$
s
=
0.6(0.80)
+
0.4(0.75)
$$

dan menghitungnya.

Ini terlihat sederhana, tetapi kemampuan membaca variable, coefficient, expression, equation, dan substitution adalah salah satu **bahasa dasar matematika AI**.

Nanti kita akan melihat bentuk seperti:

$$
\hat{y}
=
f(\mathbf{x})
$$

atau:

$$
J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta})
$$

Kita belum akan mempelajari formula-formula tersebut sekarang.

Tetapi Topic 04 memastikan bahwa ketika simbol mulai bertambah, peserta tidak merasa sedang membaca “kode rahasia”.

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 04, kamu diharapkan mampu:

1. menjelaskan apa itu **variable**, **constant**, **coefficient**, **expression**, dan **equation**;
2. membedakan symbol sebagai nama quantity dari value yang sedang disimpan atau direpresentasikan;
3. membaca expression matematika menjadi bahasa manusia;
4. mengubah kalimat sederhana menjadi expression matematika;
5. melakukan substitution pada expression;
6. mengevaluasi expression langkah demi langkah dengan urutan operasi yang benar;
7. membedakan expression dari equation;
8. menjelaskan arti tanda sama dengan $=$ sebagai hubungan kesetaraan matematis;
9. menyelesaikan equation linear sangat sederhana untuk mencari nilai variable;
10. menjelaskan mengapa formula seperti $s=0.6q+0.4c$ hanyalah **toy instructional formula**, bukan model probabilitas;
11. menjelaskan bagaimana perubahan coefficient mengubah kontribusi relatif input;
12. menyiapkan pemahaman untuk Topic 05 tentang function sebagai aturan input-output.

---

# 3. Hook — Apa Arti Huruf di Dalam Matematika?

Lihat:

$$
q = 0.80
$$

Kalau kamu belum terbiasa matematika formal, huruf `q` mungkin terasa lebih rumit daripada angka `0.80`.

Padahal idenya sederhana.

`q` hanya nama ringkas untuk quantity yang sedang kita bicarakan.

Misalnya kita sepakati:

> $q$ = quiz ratio Alya.

Maka:

$$
q = 0.80
$$

dibaca:

> “Quiz ratio Alya, yang kita beri simbol $q$, bernilai 0.80.”

Begitu juga:

$$
c = 0.75
$$

jika:

> $c$ = completion ratio Alya.

Dengan simbol, kita bisa mengatakan:

$$
q > c
$$

dan membaca:

> Quiz ratio Alya lebih tinggi daripada completion ratio Alya.

Matematika menjadi ringkas bukan karena menyembunyikan makna, tetapi karena kita **memberi nama yang konsisten pada quantity**.

---

# 4. Predict Before Formalization

Sebelum membaca definisi, coba jawab secara intuisi.

## Prediksi A

Jika:

$$
q = 0.80
$$

apakah huruf $q$ dan angka $0.80$ adalah benda yang sama?

**A.** Ya, selalu identik.  
**B.** Tidak persis; $q$ adalah symbol/variable, sedangkan $0.80$ adalah value pada konteks ini.  
**C.** Ya, karena semua variable harus bernilai tetap.  
**D.** Tidak, karena huruf tidak boleh mewakili angka.

---

## Prediksi B

Mana yang merupakan **expression**?

**A.** $0.6q + 0.4c$  
**B.** $s = 0.6q + 0.4c$  
**C.** $q = 0.80$  
**D.** Semua equation adalah expression yang sama persis

---

## Prediksi C

Jika:

$$
q = 0.80
$$

dan:

$$
c = 0.75
$$

apakah:

$$
0.6q + 0.4c
$$

dapat dihitung?

**A.** Ya, setelah values di-substitute.  
**B.** Tidak, karena ada huruf.  
**C.** Hanya jika $q=c$.  
**D.** Hanya jika hasilnya probability.

---

## Prediksi D

Jika:

$$
s = 0.6q + 0.4c
$$

dan hasil akhirnya $s=0.78$, apakah itu otomatis berarti:

> “Alya punya 78% probability untuk berhasil”?

**A.** Ya  
**B.** Tidak otomatis  
**C.** Ya karena $s$ ada di antara 0 dan 1  
**D.** Ya jika coefficient berjumlah 1

Simpan jawabanmu.

---

# 5. Intuisi — Variable sebagai Label untuk Quantity

Bayangkan kita memiliki tiga kotak:

- kotak `q`;
- kotak `c`;
- kotak `s`.

Pada satu keadaan tertentu:

- `q` berisi `0.80`;
- `c` berisi `0.75`;
- `s` akan dihitung berdasarkan aturan tertentu.

Secara matematis:

$$
q = 0.80
$$

$$
c = 0.75
$$

Symbol membuat kita bisa membicarakan **hubungan antar-quantity** tanpa menulis kalimat panjang setiap saat.

Variable bukan sekadar “huruf random”.

Variable harus mempunyai definisi.

Untuk course ini:

- $q$ = quiz ratio;
- $c$ = completion ratio;
- $s$ = toy instructional score.

Jika simbol tidak didefinisikan, formula sulit dibaca.

Karena itu aturan course kita:

> **Setiap simbol baru harus didefinisikan saat pertama kali muncul.**

---

# 6. Vocabulary Utama

## 6.1 Variable

**Variable** adalah symbol yang digunakan untuk merepresentasikan suatu quantity atau value yang dapat berbeda bergantung pada context.

Contoh:

$$
q = 0.80
$$

Untuk Alya, $q$ bernilai $0.80$.

Untuk Bima, jika kita memakai simbol lokal yang sama dalam perhitungan peserta yang berbeda:

$$
q = 0.60
$$

Jadi variable name dapat merepresentasikan jenis quantity yang sama, sementara value-nya berubah berdasarkan observation.

OpenStax menjelaskan variable sebagai letter yang mewakili number yang nilainya dapat berubah. [R1]

---

## 6.2 Constant

**Constant** adalah value yang diperlakukan tetap dalam expression atau problem tertentu.

Dalam:

$$
0.6q + 0.4c
$$

angka:

$$
0.6
$$

dan:

$$
0.4
$$

berperan sebagai constants pada formula tersebut.

Mereka tidak berubah selama kita mengevaluasi formula yang sama.

---

## 6.3 Coefficient

**Coefficient** adalah angka yang mengalikan variable.

Dalam:

$$
0.6q
$$

angka:

$$
0.6
$$

adalah coefficient dari $q$.

Dalam:

$$
0.4c
$$

angka:

$$
0.4
$$

adalah coefficient dari $c$.

OpenStax menggunakan istilah coefficient untuk numerical factor dari sebuah term. [R2]

---

## 6.4 Term

**Term** adalah bagian dari expression yang dipisahkan oleh operasi penjumlahan atau pengurangan pada level utama.

Dalam:

$$
0.6q + 0.4c
$$

ada dua terms:

$$
0.6q
$$

dan:

$$
0.4c
$$

---

## 6.5 Expression

**Expression** adalah kombinasi numbers, variables, dan operations yang merepresentasikan sebuah value.

Contoh:

$$
0.6q + 0.4c
$$

Expression ini belum menyatakan bahwa ia sama dengan sesuatu tertentu.

Ia hanya merepresentasikan perhitungan/value.

---

## 6.6 Equation

**Equation** adalah pernyataan bahwa dua expressions memiliki nilai yang sama.

Contoh:

$$
s = 0.6q + 0.4c
$$

Bagian kiri:

$$
s
$$

dan bagian kanan:

$$
0.6q + 0.4c
$$

dinyatakan equal.

OpenStax membedakan expressions dari equations dengan adanya equality relation. [R3]

---

# 7. Expression vs Equation

Bandingkan.

## Expression

$$
0.6q + 0.4c
$$

Tidak ada tanda equality.

Ini hanya sebuah expression.

## Equation

$$
s = 0.6q + 0.4c
$$

Ada tanda:

$$
=
$$

Equation mengatakan:

> “Value dari $s$ sama dengan value expression di sebelah kanan.”

Ini perbedaan penting.

---

# 8. Tanda Sama Dengan Bukan “Sekarang Hitung”

Banyak beginner terbiasa melihat tanda:

$$
=
$$

seolah berarti:

> “Jawabannya setelah ini.”

Padahal secara matematis:

$$
=
$$

berarti:

> **kedua sisi mempunyai nilai yang sama.**

Contoh:

$$
\frac{6}{8}
=
\frac{3}{4}
$$

Artinya kedua fractions equivalent.

Contoh:

$$
0.75
=
75\%
$$

Artinya kedua representation menyatakan quantity yang sama.

Contoh:

$$
s
=
0.6q+0.4c
$$

Artinya value $s$ didefinisikan/ditentukan oleh expression tersebut pada context yang diberikan.

---

# 9. Math Reading Skill — Membaca Formula Menjadi Bahasa Manusia

Lihat:

$$
s = 0.6q + 0.4c
$$

Kita definisikan:

- $s$ = toy instructional score;
- $q$ = quiz ratio;
- $c$ = completion ratio;
- $0.6$ = coefficient untuk quiz ratio;
- $0.4$ = coefficient untuk completion ratio.

Baca perlahan:

> Nilai $s$ dihitung dengan mengambil $0.6$ kali quiz ratio, lalu menambahkan $0.4$ kali completion ratio.

Bacaan alternatif:

> Formula memberi kontribusi relatif 60% pada $q$ dan 40% pada $c$ dalam weighted combination ini.

Tetapi hati-hati.

Kalimat kedua **bukan** berarti:

> “Quiz menyebabkan 60% keberhasilan.”

Coefficient hanya menjelaskan struktur formula yang kita pilih.

Ia belum membuktikan causal effect.

---

# 10. Bahasa Manusia → Expression

Kalimat:

> Ambil 60% dari quiz ratio dan 40% dari completion ratio, lalu jumlahkan.

Kita definisikan:

- $q$ = quiz ratio;
- $c$ = completion ratio.

Maka expression:

$$
0.6q + 0.4c
$$

Jika kita ingin memberi nama hasilnya:

- $s$ = score.

Maka equation:

$$
s = 0.6q + 0.4c
$$

---

# 11. Multiplication yang Tidak Menulis Tanda Kali

Dalam algebra, kita sering menulis:

$$
0.6q
$$

untuk berarti:

$$
0.6 \times q
$$

Begitu juga:

$$
0.4c
$$

berarti:

$$
0.4 \times c
$$

Penulisan tanpa simbol kali membuat formula lebih ringkas.

Jadi jangan membaca:

> “nol koma enam q”

sebagai dua object terpisah.

Bacalah:

> “nol koma enam dikali q.”

---

# 12. Substitution — Mengganti Symbol dengan Value

Sekarang kita punya:

$$
q = 0.80
$$

dan:

$$
c = 0.75
$$

serta:

$$
s = 0.6q + 0.4c
$$

**Substitution** berarti mengganti variable dengan value yang diketahui.

Kita substitute:

$$
q \rightarrow 0.80
$$

dan:

$$
c \rightarrow 0.75
$$

Sehingga:

$$
s
=
0.6(0.80)
+
0.4(0.75)
$$

Ini adalah bridge penting dari symbolic representation menuju computation.

---

# 13. Worked Example 1 — Menghitung Toy Score Alya

Diketahui:

$$
q = 0.80
$$

$$
c = 0.75
$$

dan formula:

$$
s = 0.6q + 0.4c
$$

## Langkah 1 — Substitution

Ganti $q$ dengan $0.80$ dan $c$ dengan $0.75$:

$$
s
=
0.6(0.80)
+
0.4(0.75)
$$

## Langkah 2 — Hitung term pertama

$$
0.6 \times 0.80 = 0.48
$$

## Langkah 3 — Hitung term kedua

$$
0.4 \times 0.75 = 0.30
$$

## Langkah 4 — Jumlahkan

$$
s
=
0.48 + 0.30
$$

$$
s
=
0.78
$$

## Interpretasi

> Berdasarkan toy formula yang kita definisikan, Alya memperoleh toy instructional score $0.78$.

Yang **tidak** boleh dikatakan:

> “Alya memiliki probability berhasil sebesar $78\%$.”

Karena kita belum mendefinisikan $s$ sebagai probability dan formula ini bukan probability model.

---

# 14. Kenapa Coefficient Penting?

Bandingkan dua formula.

## Formula A

$$
s = 0.6q + 0.4c
$$

## Formula B

$$
s = 0.4q + 0.6c
$$

Input-nya sama.

Tetapi contribution weights berbeda.

Untuk Alya:

$$
q = 0.80
$$

dan:

$$
c = 0.75
$$

Mari hitung Formula B.

$$
s
=
0.4(0.80)
+
0.6(0.75)
$$

$$
s
=
0.32
+
0.45
$$

$$
s
=
0.77
$$

Formula A menghasilkan:

$$
0.78
$$

Formula B menghasilkan:

$$
0.77
$$

Perbedaannya kecil karena $q$ dan $c$ Alya cukup dekat.

Tetapi prinsipnya penting:

> **Mengubah coefficient dapat mengubah output meskipun input tetap sama.**

---

# 15. Change One Thing — Ubah Completion Saja

Gunakan formula:

$$
s = 0.6q + 0.4c
$$

Tetapkan quiz ratio:

$$
q = 0.80
$$

Awalnya:

$$
c = 0.75
$$

dan kita sudah mendapatkan:

$$
s = 0.78
$$

Sekarang ubah hanya completion menjadi:

$$
c = 0.90
$$

## Prediksi dulu

Apakah $s$ akan:

- naik;
- turun;
- tetap?

Karena coefficient $c$ positif:

$$
0.4 > 0
$$

dan $c$ naik, kita memperkirakan $s$ naik.

Mari hitung.

$$
s
=
0.6(0.80)
+
0.4(0.90)
$$

$$
s
=
0.48
+
0.36
$$

$$
s
=
0.84
$$

Output naik:

$$
0.78 \rightarrow 0.84
$$

Ini belum calculus.

Tetapi ini mulai membangun **sensitivity intuition**:

> jika satu input berubah dan aturan tetap, output dapat berubah.

Nanti Topic 05 dan Submodule Calculus akan memperdalam gagasan perubahan tersebut.

---

# 16. Order of Operations — Jangan Hitung Sembarangan

Expression:

$$
0.6q + 0.4c
$$

setelah substitution:

$$
0.6(0.80) + 0.4(0.75)
$$

Harus dibaca dengan urutan operasi yang benar.

Kita hitung multiplications terlebih dahulu:

$$
0.6(0.80)=0.48
$$

$$
0.4(0.75)=0.30
$$

baru menjumlahkan:

$$
0.48+0.30=0.78
$$

Bukan:

$$
0.6+0.4
$$

dulu lalu mengalikan sembarang terhadap $q$ dan $c$.

OpenStax membahas order of operations sebagai aturan untuk mengevaluasi expressions secara konsisten. [R4]

---

# 17. Parentheses — Mengelompokkan Operasi

Bandingkan:

$$
0.5(q+c)
$$

dan:

$$
0.5q+c
$$

Keduanya bukan expression yang sama.

Misalkan:

$$
q=0.80
$$

dan:

$$
c=0.75
$$

## Expression A

$$
0.5(q+c)
$$

Substitution:

$$
0.5(0.80+0.75)
$$

Hitung di dalam parentheses:

$$
0.80+0.75=1.55
$$

Lalu:

$$
0.5(1.55)=0.775
$$

## Expression B

$$
0.5q+c
$$

Substitution:

$$
0.5(0.80)+0.75
$$

$$
0.40+0.75=1.15
$$

Jadi:

$$
0.775 \ne 1.15
$$

Parentheses mengubah grouping, dan grouping mengubah hasil.

---

# 18. Worked Example 2 — Empat Peserta HerAI

Kita gunakan formula toy yang sama:

$$
s=0.6q+0.4c
$$

dengan:

- $q$ = quiz ratio;
- $c$ = completion ratio.

Dataset dari Topic 03:

| participant | $q$ | $c$ |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

> **Catatan:** score ini hanya alat latihan algebra dan formula reading. Ia bukan production recommendation model HerAI.

---

## 18.1 Alya

$$
s
=
0.6(0.80)
+
0.4(0.75)
$$

$$
s
=
0.48
+
0.30
$$

$$
s
=
0.78
$$

---

## 18.2 Bima

$$
s
=
0.6(0.60)
+
0.4(0.625)
$$

Term pertama:

$$
0.6(0.60)=0.36
$$

Term kedua:

$$
0.4(0.625)=0.25
$$

Jumlah:

$$
s
=
0.36+0.25
$$

$$
s
=
0.61
$$

---

## 18.3 Citra

$$
s
=
0.6(0.90)
+
0.4(1.00)
$$

$$
s
=
0.54
+
0.40
$$

$$
s
=
0.94
$$

---

## 18.4 Dewi

$$
s
=
0.6(0.70)
+
0.4(0.50)
$$

$$
s
=
0.42
+
0.20
$$

$$
s
=
0.62
$$

---

## 18.5 Hasil

| participant | $q$ | $c$ | toy $s$ |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 0.78 |
| Bima | 0.60 | 0.625 | 0.61 |
| Citra | 0.90 | 1.00 | 0.94 |
| Dewi | 0.70 | 0.50 | 0.62 |

Sekali lagi:

> Ranking toy score ini tidak boleh dianggap recommendation final atau probability outcome.

Kita belum memvalidasi formula, weights, target, data quality, fairness, atau predictive usefulness.

---

# 19. Math Reading Skill — Dari Formula ke Kalimat

Baca:

$$
s=0.6q+0.4c
$$

Strong reading:

> Score $s$ adalah weighted combination dari quiz ratio $q$ dan completion ratio $c$, dengan coefficient $0.6$ untuk $q$ dan $0.4$ untuk $c$.

Weak reading:

> “s sama dengan nol koma enam q tambah nol koma empat c.”

Bacaan kedua benar secara verbal, tetapi belum menunjukkan pemahaman.

Tujuan kita adalah bisa bergerak dari:

**symbol → meaning**

dan:

**meaning → symbol**.

---

# 20. Bahasa Manusia → Formula

Kalimat:

> Buat score $r$ yang mengambil 70% dari quiz ratio $q$ dan 30% dari completion ratio $c$.

Kita tulis:

$$
r=0.7q+0.3c
$$

Sekarang gunakan Alya:

$$
q=0.80
$$

$$
c=0.75
$$

Substitution:

$$
r
=
0.7(0.80)
+
0.3(0.75)
$$

$$
r
=
0.56
+
0.225
$$

$$
r
=
0.785
$$

Jadi:

$$
r=0.785
$$

---

# 21. Expression Tidak Harus Menghasilkan Persentase

Jika:

$$
q=0.80
$$

dan:

$$
c=0.75
$$

serta:

$$
s=q+c
$$

maka:

$$
s=1.55
$$

Tidak ada aturan bahwa semua outputs harus berada antara $0$ dan $1$.

Range output bergantung pada expression.

Inilah alasan kita tidak boleh melihat angka lalu menebak semantics.

---

# 22. Equation sebagai Constraint

Equation juga dapat digunakan bukan hanya untuk “menghitung output”, tetapi untuk menyatakan hubungan yang harus benar.

Contoh:

$$
x+2=5
$$

Equation mengatakan:

> nilai $x$ ditambah 2 harus sama dengan 5.

Kita dapat mencari value $x$ yang membuat equality tersebut benar.

---

# 23. Solving a Simple Equation

Diberikan:

$$
x+2=5
$$

Tujuan kita:

> cari $x$.

Kita ingin mempertahankan equality.

Kurangi kedua sisi dengan $2$:

$$
x+2-2
=
5-2
$$

Sehingga:

$$
x=3
$$

Check:

$$
3+2=5
$$

Benar.

Prinsip dasar:

> Apa yang kita lakukan pada satu sisi equation harus dipertimbangkan secara konsisten terhadap sisi lain untuk mempertahankan equality.

---

# 24. Worked Example 3 — Mencari Input dari Output Toy

Misalkan:

$$
s=0.6q+0.4c
$$

Kita tahu:

$$
s=0.78
$$

dan:

$$
c=0.75
$$

Kita ingin mencari $q$.

Substitute values:

$$
0.78
=
0.6q
+
0.4(0.75)
$$

Hitung:

$$
0.4(0.75)=0.30
$$

Maka:

$$
0.78
=
0.6q+0.30
$$

Kurangi kedua sisi dengan $0.30$:

$$
0.78-0.30
=
0.6q
$$

$$
0.48
=
0.6q
$$

Bagi kedua sisi dengan $0.6$:

$$
\frac{0.48}{0.6}
=
q
$$

$$
q=0.80
$$

Check:

$$
0.6(0.80)+0.4(0.75)
=
0.48+0.30
=
0.78
$$

Kita kembali mendapatkan quiz ratio Alya.

---

# 25. Equation dan Programming Assignment Tidak Selalu Sama

Banyak peserta dengan background coding pernah melihat:

`x = x + 1`

Dalam banyak programming languages, ini berarti:

> ambil value lama `x`, tambah satu, lalu simpan kembali sebagai value baru `x`.

Tetapi sebagai equation matematika biasa:

$$
x=x+1
$$

tidak memiliki solusi real biasa, karena jika kita kurangi $x$ dari kedua sisi:

$$
0=1
$$

yang salah.

Jadi simbol `=` dalam source code tertentu dapat berfungsi sebagai **assignment operator**, sedangkan dalam matematika:

$$
=
$$

menyatakan equality.

Ini penting agar peserta yang punya background coding tidak mencampur semantics keduanya.

---

# 26. Naming Matters

Bandingkan:

$$
a=0.80
$$

$$
b=0.75
$$

dengan:

$$
q=0.80
$$

$$
c=0.75
$$

Keduanya valid secara matematika jika didefinisikan.

Tetapi $q$ dan $c$ lebih membantu karena dekat dengan:

- quiz;
- completion.

Pada formula besar, naming yang konsisten mengurangi cognitive load.

Tetapi jangan bergantung pada nama symbol saja.

Selalu baca definisinya.

Dalam paper lain, $q$ bisa berarti probability distribution, query, charge, atau quantity lain.

---

# 27. Constants dan Coefficients Membawa Assumption

Formula:

$$
s=0.6q+0.4c
$$

mengandung keputusan desain:

- quiz diberi coefficient $0.6$;
- completion diberi coefficient $0.4$.

Pertanyaan penting:

> Dari mana angka $0.6$ dan $0.4$ berasal?

Dalam toy example kita:

> angka tersebut sengaja dipilih untuk latihan.

Dalam system nyata, weights dapat berasal dari:

- human design;
- domain policy;
- model training;
- optimization;
- calibration;
- atau metode lain.

Jangan melihat coefficient lalu menganggapnya “objektif” hanya karena ditulis secara matematis.

Mathematical notation dapat membuat keputusan desain terlihat formal, tetapi keputusan itu tetap perlu justification.

---

# 28. Coefficients Berjumlah 1 — Apa Artinya?

Pada toy formula:

$$
0.6+0.4=1
$$

Karena coefficients positive dan berjumlah $1$, expression:

$$
s=0.6q+0.4c
$$

dapat dibaca sebagai weighted average sederhana dari $q$ dan $c$.

Jika:

$$
0 \le q \le 1
$$

dan:

$$
0 \le c \le 1
$$

maka weighted combination ini juga akan berada di antara nilai input minimum dan maksimum.

Tetapi:

> **weighted average bukan otomatis probability model.**

Ini distinction penting.

---

# 29. Change One Thing — Coefficient Menjadi Negatif

Misalkan:

$$
s=0.6q-0.4c
$$

Sekarang coefficient $c$ adalah:

$$
-0.4
$$

Jika $c$ naik, contribution dari term:

$$
-0.4c
$$

menjadi lebih negatif.

Jadi output bisa turun.

Ini membantu kita melihat bahwa sign coefficient:

- positive;
- negative;

mempengaruhi arah hubungan di dalam formula.

Kita belum membahas model fitting atau causal interpretation.

Kita hanya membaca structure expression.

---

# 30. HerAI Running Case — Data Menjadi Variables

Dataset raw/derived dari Topic 03:

| participant | quiz ratio | completion ratio |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

Sekarang kita punya symbolic layer:

- $q$ = quiz ratio;
- $c$ = completion ratio;
- $s$ = toy instructional score.

Untuk setiap participant, values berubah.

Contoh Alya:

$$
q=0.80,\qquad c=0.75
$$

Bima:

$$
q=0.60,\qquad c=0.625
$$

Citra:

$$
q=0.90,\qquad c=1.00
$$

Dewi:

$$
q=0.70,\qquad c=0.50
$$

Formula yang sama:

$$
s=0.6q+0.4c
$$

dapat dievaluasi pada values yang berbeda.

Ini adalah bridge langsung menuju **function**.

---

# 31. Misconception Challenge

## Challenge 1 — “Variable adalah huruf yang selalu berubah”

Tidak selalu.

Variable adalah symbol yang merepresentasikan quantity/value.

Dalam satu evaluation:

$$
q=0.80
$$

dapat tetap fixed.

Di observation lain, value $q$ dapat berbeda.

---

## Challenge 2 — “Expression dan equation itu sama”

Tidak.

$$
0.6q+0.4c
$$

adalah expression.

$$
s=0.6q+0.4c
$$

adalah equation.

---

## Challenge 3 — “Coefficient 0.6 berarti q menyebabkan 60% output”

Tidak.

Coefficient menjelaskan hubungan dalam formula.

Causal interpretation membutuhkan evidence dan design yang jauh lebih kuat.

---

## Challenge 4 — “Kalau coefficients total 1, hasil pasti probability”

Tidak.

Weighted average dapat berada pada range $0$–$1$ jika inputs-nya demikian, tetapi semantics-nya belum tentu probability.

---

## Challenge 5 — “Tanda = selalu berarti assignment”

Tidak dalam matematika.

$$
=
$$

berarti equality.

Programming languages dapat menggunakan symbol yang sama dengan semantics assignment.

---

## Challenge 6 — “Kalau hasil expression 1.2 berarti salah”

Tidak otomatis.

Range bergantung pada expression dan semantics quantity.

---

## Challenge 7 — “Huruf bikin matematika lebih abstrak, jadi sebaiknya dihindari”

Symbol justru membantu kita menyatakan pattern dan relationship secara ringkas.

Yang penting adalah symbol didefinisikan.

---

# 32. Try It Yourself

## Practice A — Identify the parts

Diberikan:

$$
r=0.7q+0.3c
$$

Identifikasi:

- output variable;
- coefficients;
- input variables;
- expression di sisi kanan.

### Expected answer

- output variable: $r$;
- coefficients: $0.7$ dan $0.3$;
- variables: $q$ dan $c$;
- expression: $0.7q+0.3c$.

---

## Practice B — Substitution

Diberikan:

$$
q=0.70
$$

$$
c=0.50
$$

dan:

$$
s=0.6q+0.4c
$$

Hitung $s$.

### Solution

$$
s
=
0.6(0.70)
+
0.4(0.50)
$$

$$
s
=
0.42+0.20
$$

$$
s=0.62
$$

---

## Practice C — Expression atau equation?

Klasifikasikan:

1. $q+c$
2. $s=q+c$
3. $0.5q$
4. $q=0.8$

### Expected

1. expression;
2. equation;
3. expression;
4. equation.

---

## Practice D — Translate to math

Kalimat:

> Score $r$ adalah 80% quiz ratio ditambah 20% completion ratio.

### Expected

$$
r=0.8q+0.2c
$$

---

## Practice E — Solve

Diberikan:

$$
x+4=9
$$

Cari $x$.

### Solution

$$
x+4-4
=
9-4
$$

$$
x=5
$$

---

## Practice F — Spot the semantic error

Seseorang menghitung:

$$
s=0.78
$$

lalu mengatakan:

> “Probability Alya lulus adalah 78%.”

Apa masalahnya?

### Expected reasoning

Formula $s=0.6q+0.4c$ belum didefinisikan atau divalidasi sebagai probability model. Nilai pada range $0$–$1$ tidak otomatis merupakan probability.

---

# 33. Visual & Interactive Specification untuk Web

## [STEP-BY-STEP REVEAL] From Data to Symbol

**Learning purpose:**  
Menunjukkan bahwa variable adalah nama ringkas untuk quantity.

**Initial state:**

`Quiz ratio Alya = 0.80`

**Reveal:**

$$
q = 0.80
$$

Lalu:

`Completion ratio Alya = 0.75`

**Reveal:**

$$
c = 0.75
$$

**Expected feedback:**  
“Symbol tidak mengganti makna; symbol memberi nama ringkas pada quantity.”

---

## [INTERACTIVE VISUAL] Expression Builder

**Learning purpose:**  
Membedakan coefficient, variable, term, expression.

**Cards:**

- `0.6`
- `q`
- `+`
- `0.4`
- `c`

**Learner action:**  
Drag menjadi:

$$
0.6q+0.4c
$$

**Expected behavior:**  
UI memberi label:

- coefficient;
- variable;
- term;
- operator;
- expression.

---

## [STEP-BY-STEP REVEAL] Substitution Engine

**Initial:**

$$
s=0.6q+0.4c
$$

Input boxes:

$q=0.80$

$c=0.75$

**Step 1:**

$$
s=0.6(0.80)+0.4(0.75)
$$

**Step 2:**

$$
s=0.48+0.30
$$

**Step 3:**

$$
s=0.78
$$

**Learning purpose:**  
Membuat symbolic evaluation transparan.

---

## [NUMBER MANIPULATOR] Change One Input

**Initial state:**

$$
s=0.6q+0.4c
$$

with:

$$
q=0.80
$$

$$
c=0.75
$$

**Learner action:**  
Slider untuk $c$ dari $0$ hingga $1$.

**Expected behavior:**  
$s$ update real-time.

**Prompt:**  
“Ketika $c$ naik, apa yang terjadi pada $s$?”

---

## [NUMBER MANIPULATOR] Change the Coefficients

**Initial:**

$$
s=w_q q+w_c c
$$

Untuk interactive layer saja, tampilkan sliders:

- quiz weight;
- completion weight.

**Constraint:**  
Option untuk menjaga total weights = $1$.

**Learning purpose:**  
Menunjukkan bahwa coefficients adalah bagian dari rule/design.

**Safety feedback:**  
“Weight besar tidak membuktikan causal importance.”

---

## [COMPARE VIEW] Expression vs Equation

Left:

$$
0.6q+0.4c
$$

Label:

`Expression`

Right:

$$
s=0.6q+0.4c
$$

Label:

`Equation`

**Expected behavior:**  
Highlight tanda equality pada equation.

---

## [COMPARE VIEW] Mathematics vs Programming Assignment

Left:

$$
x=x+1
$$

Label:

`Mathematical equation`

Right:

`x = x + 1`

Label:

`Possible programming assignment`

**Expected feedback:**  
“Symbol yang sama dapat mempunyai semantics berbeda berdasarkan language/context.”

---

# 34. Checkpoint

## Checkpoint 1

Apa itu variable?

**Jawaban:**  
Symbol yang merepresentasikan quantity/value pada suatu context.

---

## Checkpoint 2

Dalam:

$$
0.6q+0.4c
$$

apa coefficient dari $q$?

**Jawaban:**

$$
0.6
$$

---

## Checkpoint 3

Apakah:

$$
0.6q+0.4c
$$

merupakan equation?

**Jawaban:**  
Tidak. Itu expression.

---

## Checkpoint 4

Apakah:

$$
s=0.6q+0.4c
$$

merupakan equation?

**Jawaban:**  
Ya.

---

## Checkpoint 5

Jika:

$$
q=0.8
$$

apa arti substitution?

**Jawaban:**  
Mengganti symbol $q$ dengan value $0.8$ ketika mengevaluasi expression.

---

## Checkpoint 6

Hitung:

$$
s=0.6(0.8)+0.4(0.75)
$$

**Jawaban:**

$$
s=0.78
$$

---

## Checkpoint 7

Apakah $s=0.78$ otomatis probability?

**Jawaban:**  
Tidak.

---

## Checkpoint 8

Apa beda mathematical equality dan programming assignment?

**Jawaban:**  
Mathematical equality menyatakan dua sisi memiliki value yang sama, sedangkan assignment menyimpan/update value pada variable dalam konteks bahasa pemrograman.

---

# 35. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan variable.
- [ ] **I can** menjelaskan constant.
- [ ] **I can** menjelaskan coefficient.
- [ ] **I can** menjelaskan term.
- [ ] **I can** membedakan expression dan equation.
- [ ] **I can** membaca tanda $=$ sebagai equality.
- [ ] **I can** membaca $0.6q$ sebagai $0.6\times q$.
- [ ] **I can** melakukan substitution.
- [ ] **I can** mengevaluasi expression langkah demi langkah.
- [ ] **I can** membaca formula menjadi bahasa manusia.
- [ ] **I can** mengubah kalimat menjadi formula sederhana.
- [ ] **I can** menjelaskan efek mengubah coefficient.
- [ ] **I can** menyelesaikan equation sederhana.
- [ ] **I can** membedakan target semantics dari angka output.
- [ ] **I can** menjelaskan mengapa weighted score tidak otomatis probability.

Jika tiga atau lebih belum yakin, ulangi:

- Vocabulary Utama;
- Worked Example 1;
- Worked Example 3;
- Misconception Challenge;
- Try It Yourself.

---

# 36. Why This Matters Later

Topic 04 membangun kemampuan symbolic reading.

## Topic 05 — Function

Sekarang kita sudah punya rule:

$$
s=0.6q+0.4c
$$

Topic 05 akan mengubah cara kita melihat rule tersebut.

Bukan hanya sebagai equation, tetapi sebagai **function**:

> input masuk → rule bekerja → output keluar.

---

## Topic 06 — Coordinate, Graph, dan Change

Ketika input berubah, output berubah.

Gagasan:

$$
c: 0.75 \rightarrow 0.90
$$

menghasilkan:

$$
s: 0.78 \rightarrow 0.84
$$

akan menjadi bridge menuju perubahan pada graph.

---

## Submodule 02 — Linear Algebra

Daripada satu variable seperti $q$ atau $c$, nanti kita akan mengorganisasi beberapa quantities menjadi vector.

---

## Submodule 05 — Calculus

Variable dan function adalah prerequisite fundamental untuk derivative dan gradient.

---

## Submodule 06 — Optimization

Parameters, objective, dan update rules semuanya menggunakan symbolic expressions dan equations.

---

# 37. Summary

Pada Topic 04 kita belajar bahwa simbol matematika adalah **bahasa ringkas untuk quantity dan relationship**.

Kita mendefinisikan:

$$
q=0.80
$$

sebagai quiz ratio Alya,

$$
c=0.75
$$

sebagai completion ratio Alya,

dan menggunakan toy equation:

$$
s=0.6q+0.4c
$$

Kita belajar:

1. variable merepresentasikan quantity/value;
2. constants diperlakukan tetap pada problem tertentu;
3. coefficient mengalikan variable;
4. expression tidak memerlukan equality;
5. equation menyatakan dua sisi equal;
6. substitution mengganti symbol dengan value;
7. order of operations dan parentheses memengaruhi hasil;
8. coefficients memengaruhi contribution pada output;
9. mathematical equality berbeda dari programming assignment;
10. formula yang terlihat formal tetap membawa design assumptions;
11. weighted score bukan otomatis probability.

Most importantly:

> **Matematika bukan sekadar angka. Matematika memberi kita bahasa untuk menyatakan hubungan antar-quantity secara eksplisit.**

---

# 38. Bridge ke Topic 05

Sekarang kita sudah punya:

$$
s=0.6q+0.4c
$$

dan dapat mengevaluasinya untuk peserta berbeda.

Tetapi kita belum punya bahasa formal untuk menjelaskan:

> “Rule ini menerima input $q$ dan $c$, kemudian menghasilkan output $s$.”

Itulah ide **function**.

Pada Topic 05 kita akan belajar:

- function sebagai mapping input → output;
- function notation;
- domain dan output secara beginner-friendly;
- table, formula, dan diagram sebagai cara merepresentasikan function;
- bagaimana satu rule dapat dievaluasi pada banyak inputs;
- mengapa functions menjadi fondasi untuk model AI dan calculus.

Selanjutnya:

> **Topic 05 — Function: Dari Input ke Output**

---

# 39. References

## [R1] OpenStax — *Elementary Algebra 2e*, Variables and Constants  
**Institution:** OpenStax  
**Concept supported:** variable sebagai symbol yang merepresentasikan number/value; constants dan algebraic language.

https://openstax.org/books/elementary-algebra-2e/pages/1-2-use-the-language-of-algebra

## [R2] OpenStax — *Elementary Algebra 2e*, Properties of Real Numbers / Algebraic Expressions  
**Institution:** OpenStax  
**Concept supported:** coefficient sebagai numerical factor dan terminology algebraic expressions.

https://openstax.org/books/elementary-algebra-2e/pages/1-3-add-and-subtract-integers

## [R3] OpenStax — *Elementary Algebra 2e*, Solve Linear Equations  
**Institution:** OpenStax  
**Concept supported:** equation sebagai statement of equality dan prinsip menjaga equality ketika solving.

https://openstax.org/books/elementary-algebra-2e/pages/2-1-solve-equations-using-the-subtraction-and-addition-properties-of-equality

## [R4] OpenStax — *Prealgebra*, Use the Language of Algebra  
**Institution:** OpenStax  
**Concept supported:** evaluation of expressions, grouping symbols, dan order of operations.

https://openstax.org/books/prealgebra/pages/2-2-evaluate-simplify-and-translate-expressions

---

# 40. QA Notes

## Academic QA

- Variable tidak disederhanakan menjadi “huruf yang selalu berubah”.
- Expression dan equation dibedakan.
- Equality tidak disamakan dengan programming assignment.
- Coefficient tidak diberi causal interpretation.
- Weighted score tidak disebut probability.
- Coefficients $0.6$ dan $0.4$ dinyatakan sebagai toy design choice, bukan learned parameters.
- Weighted-average interpretation hanya diberikan saat positive coefficients berjumlah $1$.
- Solving equation dibatasi pada readiness-level algebra.
- Formal function treatment ditahan untuk Topic 05.
- Tidak masuk model fitting, regression, gradient, atau optimization.

## Mathematical QA

Core calculations checked:

$$
0.6(0.80)+0.4(0.75)
=
0.48+0.30
=
0.78
$$

$$
0.4(0.80)+0.6(0.75)
=
0.32+0.45
=
0.77
$$

$$
0.6(0.80)+0.4(0.90)
=
0.48+0.36
=
0.84
$$

$$
0.5(0.80+0.75)
=
0.775
$$

$$
0.5(0.80)+0.75
=
1.15
$$

Bima:

$$
0.6(0.60)+0.4(0.625)
=
0.36+0.25
=
0.61
$$

Citra:

$$
0.6(0.90)+0.4(1.00)
=
0.94
$$

Dewi:

$$
0.6(0.70)+0.4(0.50)
=
0.62
$$

Inverse toy example:

$$
0.78=0.6q+0.30
$$

$$
0.48=0.6q
$$

$$
q=0.80
$$

## Notation QA

New symbols:

- $q$ = quiz ratio;
- $c$ = completion ratio;
- $s$ = toy instructional score;
- $r$ = alternative toy score;
- $x$ = generic unknown variable for equation-solving example.

All defined before substantive use.

## Dependency QA

Topic 04 does not formally teach:

- function notation;
- graphing;
- vector/matrix operations;
- statistics;
- probability rules;
- loss functions;
- gradients;
- optimization.

It prepares algebra literacy for those concepts.

## Markdown + KaTeX Contract

- Inline math uses `$...$`.
- Display math uses `$$...$$`.
- No intended formulas are placed in fenced code blocks.
- No intended raw LaTeX commands appear outside math delimiters.
- Commands are limited to basic KaTeX-safe notation such as `\frac`, `\times`, `\qquad`, `\le`, `\ne`, `\boldsymbol`, and `\mathbf`.
- Browser-level rendering still needs integration testing in the Vanilla JS + KaTeX frontend.

---

# STOP CHECKPOINT

**Topic 04 selesai. Topic 05 belum diproduksi.**

> **Apakah Topic 04 disetujui dan kita boleh melanjutkan ke Topic 05 — Function: Dari Input ke Output?**
