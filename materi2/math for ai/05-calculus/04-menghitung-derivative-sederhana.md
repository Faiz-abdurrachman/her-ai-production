# Topic 04 — Menghitung Derivative Sederhana
## Submodule 05 — Calculus: Perubahan, Turunan, dan Gradient

> **Posisi topik:** Topic 03 sudah membangun derivative sebagai **local rate of change** dan slope garis tangent melalui difference quotient. Topic 04 sekarang memperkenalkan aturan hitung yang membuat derivative fungsi sederhana dapat diperoleh dengan lebih efisien. Fokus tetap pada **satu variabel** dan fungsi polynomial sederhana. Partial derivative, gradient, chain rule, loss landscape, serta mechanics Optimization masih ditahan untuk topic berikutnya.

## Tujuan Pembelajaran

Setelah menyelesaikan topik ini, peserta diharapkan mampu:

1. menjelaskan mengapa differentiation rules dibutuhkan setelah memahami derivative dari definisi;
2. menggunakan **constant rule** untuk fungsi konstan;
3. menggunakan **power rule** untuk $x^n$ dengan pangkat bulat positif;
4. menggunakan **constant multiple rule**;
5. menggunakan **sum rule** dan **difference rule**;
6. menghitung derivative polynomial sederhana secara bertahap;
7. membedakan **derivative function** $f'(x)$ dengan **derivative value** $f'(a)$;
8. menginterpretasikan sign dan magnitude derivative secara lokal setelah hasil perhitungan diperoleh;
9. membaca unit derivative sebagai output-unit per input-unit ketika konteks memiliki unit;
10. menggunakan one-variable slice dari canonical HerAI instructional score secara aman tanpa menyebut derivative sebagai probability, causal effect, atau production rule;
11. mendiagnosis kesalahan umum seperti “turunkan koefisien saja”, “pangkat turun tanpa dikalikan”, atau “constant derivative tetap constant”; dan
12. mengetahui dengan jelas aturan apa yang **belum** menjadi scope Topic 04.

---

# 1. HOOK / REAL PROBLEM — Kalau Selalu Kembali ke Limit, Kita Akan Sangat Lambat

Pada Topic 03, kita menghitung derivative dari definisi.

Untuk:

$$
f(x)=x^2,
$$

di sekitar suatu input $x$, derivative dapat dibangun dari:

$$
\frac{f(x+h)-f(x)}{h}.
$$

Kemudian kita sederhanakan dan melihat apa yang terjadi saat:

$$
h\to0.
$$

Pendekatan itu penting karena menjelaskan **makna** derivative. Tetapi bayangkan kita harus mengulang proses limit lengkap setiap kali menemukan fungsi seperti:

$$
f(x)=4x^5-3x^3+2x-7.
$$

Secara matematis mungkin dilakukan, tetapi untuk pekerjaan sehari-hari itu tidak efisien.

Calculus kemudian memberi kita **differentiation rules**: pola-pola yang sudah dibuktikan dari definisi derivative dan dapat digunakan kembali.

> **Inti Topic 04:** kita tidak mengganti makna derivative dengan hafalan rumus. Kita menggunakan rules sebagai shortcut yang tetap harus dibaca sebagai informasi perubahan lokal.

## Predict

Sebelum melihat aturan formal, coba prediksi:

1. Jika fungsi selalu bernilai 8, apakah local rate-nya 8 atau 0?
2. Jika $f(x)=x^3$, apakah derivative-nya mungkin tetap $x^3$?
3. Jika $f(x)=5x^2$, bagaimana angka 5 kemungkinan memengaruhi derivative?
4. Jika $f(x)=x^2+x$, apakah kita harus membuat satu rule baru untuk seluruh fungsi, atau bisa memecahnya menjadi bagian-bagian?

---

# 2. INTUITION — Derivative Function adalah “Peta Local Rate”

Pada Topic 03 kita sering membahas derivative di satu titik, misalnya:

$$
f'(2)=4.
$$

Tetapi kita juga dapat mencari derivative untuk **setiap input yang relevan** dan menulis hasilnya sebagai fungsi baru.

Misalnya:

$$
f(x)=x^2.
$$

Dari definition, kita dapat menunjukkan bahwa:

$$
f'(x)=2x.
$$

Artinya:

- ketika $x=1$, local rate adalah $2$;
- ketika $x=2$, local rate adalah $4$;
- ketika $x=3$, local rate adalah $6$.

Jadi:

$$
f'(x)
$$

adalah **fungsi yang memberi local rate** dari $f$ pada input $x$, ketika derivative ada.

Ini berbeda dari:

$$
f(x),
$$

yang memberi **nilai output** fungsi asli.

### Dua pertanyaan berbeda

Untuk:

$$
f(x)=x^2,
$$

pertanyaan:

> “Berapa nilai fungsi di $x=3$?”

menghasilkan:

$$
f(3)=9.
$$

Sedangkan:

> “Berapa local rate fungsi di $x=3$?”

menghasilkan:

$$
f'(3)=6.
$$

Nilai 9 dan 6 bukan dua cara menulis hal yang sama.

---

# 3. EXPLORE — Mencari Pola dari Derivative yang Sudah Dikenal

Kita mulai dari beberapa fungsi sederhana.

## Fungsi konstan

Misalnya:

$$
f(x)=5.
$$

Grafiknya horizontal. Saat input berubah, output tetap 5.

Maka local rate adalah:

$$
0.
$$

Sehingga:

$$
f'(x)=0.
$$

## Fungsi linear sederhana

Misalnya:

$$
g(x)=x.
$$

Setiap kenaikan input sebesar 1 meningkatkan output sebesar 1.

Jadi:

$$
g'(x)=1.
$$

## Fungsi kuadrat

Untuk:

$$
h(x)=x^2,
$$

Topic 03 sudah menunjukkan local rate berubah menurut posisi. Hasil umumnya:

$$
h'(x)=2x.
$$

## Fungsi kubik

Untuk:

$$
p(x)=x^3,
$$

hasil differentiation adalah:

$$
p'(x)=3x^2.
$$

Perhatikan pola:

| Fungsi | Derivative |
|---|---|
| $x$ | $1$ |
| $x^2$ | $2x$ |
| $x^3$ | $3x^2$ |
| $x^4$ | $4x^3$ |

Pola ini membawa kita ke **power rule**.

---

# 4. FORMAL DEFINITION — Differentiation sebagai Proses Menghasilkan Derivative

**Differentiation** adalah proses mencari derivative suatu fungsi.

Jika fungsi awal adalah:

$$
y=f(x),
$$

maka hasil differentiation dapat ditulis sebagai:

$$
f'(x)
$$

atau dengan notasi Leibniz:

$$
\frac{df}{dx}.
$$

Pada Topic 04, notasi utama tetap:

$$
f'(x).
$$

Notasi:

$$
\frac{df}{dx}
$$

digunakan sebagai notasi pendamping untuk membantu membaca “derivative $f$ terhadap $x$”.

> Differentiation menghasilkan **fungsi derivative**. Evaluating derivative pada satu input menghasilkan **derivative value**.

Contoh:

$$
f'(x)=6x^2+2
$$

adalah derivative function.

Sedangkan:

$$
f'(3)=56
$$

adalah derivative value pada $x=3$.

---

# 5. NOTATION + FORMULA — Empat Rules Inti Topic 04

Topic ini menggunakan empat rule utama.

## 5.1 Constant Rule

Jika:

$$
f(x)=c,
$$

dengan $c$ constant, maka:

$$
f'(x)=0.
$$

Atau:

$$
\frac{d}{dx}(c)=0.
$$

### Kenapa masuk akal?

Fungsi konstan tidak berubah ketika input berubah. Karena local change-nya nol, derivative-nya juga nol.

---

## 5.2 Power Rule

Untuk pangkat bulat positif $n$:

$$
\frac{d}{dx}(x^n)=nx^{n-1}.
$$

Cara membaca:

1. pangkat lama $n$ turun menjadi multiplier;
2. pangkat baru menjadi $n-1$.

Contoh:

$$
\frac{d}{dx}(x^5)=5x^4.
$$

Bukan:

$$
x^4,
$$

karena faktor 5 tidak boleh hilang.

---

## 5.3 Constant Multiple Rule

Jika $k$ adalah constant dan $f$ differentiable, maka:

$$
\frac{d}{dx}\big(kf(x)\big)
=
kf'(x).
$$

Contoh:

$$
\frac{d}{dx}(3x^2)
=
3\frac{d}{dx}(x^2)
=
3(2x)
=
6x.
$$

Angka 3 tetap menjadi multiplier.

---

## 5.4 Sum dan Difference Rules

Jika $f$ dan $g$ differentiable, maka:

$$
\frac{d}{dx}\big(f(x)+g(x)\big)
=
f'(x)+g'(x),
$$

serta:

$$
\frac{d}{dx}\big(f(x)-g(x)\big)
=
f'(x)-g'(x).
$$

Ini memungkinkan polynomial di-differentiate **term by term**.

Contoh:

$$
f(x)=3x^2+2x-5.
$$

Maka:

$$
f'(x)
=
6x+2.
$$

Konstanta $-5$ menghasilkan derivative 0.

---

# 6. MATH READING SKILL — Cara Membaca Power Rule dengan Benar

Mari baca:

$$
\frac{d}{dx}(x^n)=nx^{n-1}.
$$

## Symbol

- $x$ = input variable;
- $n$ = constant exponent;
- $\frac{d}{dx}$ = differentiation terhadap $x$;
- $nx^{n-1}$ = derivative function.

## Input

Input matematisnya adalah fungsi power:

$$
x^n.
$$

## Operation

Differentiation mencari local rate function terhadap $x$.

## Output

Output-nya adalah:

$$
nx^{n-1}.
$$

## Units

Jika $x$ memiliki unit dan output fungsi juga memiliki unit, derivative membawa unit:

> output-unit per input-unit.

Rule algebra saja tidak menghapus unit dari konteks.

## Assumptions

Dalam core Topic 04, kita menggunakan power rule terutama untuk pangkat bulat positif dan polynomial sederhana.

## Local vs global meaning

Nilai:

$$
f'(a)
$$

menjelaskan local rate di sekitar $a$.

Derivative function:

$$
f'(x)
$$

memberi local rate untuk banyak input, tetapi setiap nilai tetap harus dibaca **di titiknya masing-masing**.

## Tidak berarti

Derivative tidak otomatis berarti:

- causal effect;
- probability;
- confidence;
- accuracy;
- global trend yang sama di seluruh domain;
- proses optimization.

---

# 7. WORKED BASIC EXAMPLE 1 — Constant Rule

Diberikan:

$$
f(x)=12.
$$

Karena 12 adalah constant:

$$
f'(x)=0.
$$

### Interpretation

Berapa pun nilai $x$, output tetap 12. Jadi local rate terhadap $x$ adalah 0.

### Misconception check

Salah:

$$
f'(x)=12.
$$

Angka 12 adalah **nilai fungsi**, bukan rate perubahan fungsi.

---

# 8. WORKED BASIC EXAMPLE 2 — Power Rule

Diberikan:

$$
f(x)=x^4.
$$

Power rule:

$$
\frac{d}{dx}(x^n)=nx^{n-1}.
$$

Dengan $n=4$:

$$
f'(x)=4x^3.
$$

Sekarang evaluasi di $x=2$:

$$
f'(2)=4(2)^3=32.
$$

### Interpretation

Nilai 32 adalah local rate fungsi $x^4$ di sekitar $x=2$.

Ia bukan:

$$
f(2).
$$

Karena:

$$
f(2)=16.
$$

Jadi:

- function value = 16;
- derivative value = 32.

---

# 9. WORKED BASIC EXAMPLE 3 — Constant Multiple Rule

Diberikan:

$$
g(x)=5x^3.
$$

Langkah 1: constant 5 tetap di depan.

$$
g'(x)
=
5\frac{d}{dx}(x^3).
$$

Langkah 2: gunakan power rule.

$$
\frac{d}{dx}(x^3)=3x^2.
$$

Maka:

$$
g'(x)=5(3x^2)=15x^2.
$$

### Kesalahan umum

Salah:

$$
g'(x)=3x^2.
$$

karena coefficient 5 hilang.

Salah juga:

$$
g'(x)=5x^2.
$$

karena exponent 3 belum dipakai sebagai multiplier.

---

# 10. WORKED BASIC EXAMPLE 4 — Polynomial Term by Term

Diberikan:

$$
f(x)=4x^3-2x^2+7x-9.
$$

Kita differentiate setiap term.

## Term 1

$$
\frac{d}{dx}(4x^3)
=
4(3x^2)
=
12x^2.
$$

## Term 2

$$
\frac{d}{dx}(-2x^2)
=
-2(2x)
=
-4x.
$$

## Term 3

Karena:

$$
x=x^1,
$$

maka:

$$
\frac{d}{dx}(7x)
=
7(1)
=
7.
$$

## Term 4

$$
\frac{d}{dx}(-9)=0.
$$

Gabungkan:

$$
f'(x)=12x^2-4x+7.
$$

### Evaluate di $x=1$

$$
f'(1)=12-4+7=15.
$$

Jadi local rate di $x=1$ adalah 15 output-unit per input-unit.

---

# 11. WORKED HerAI EXAMPLE — One-Variable Slice yang Aman

Canonical HerAI instructional score adalah:

$$
h(q,c)=0.6q+0.4c.
$$

Ingat kembali:

- $q$ = quiz ratio;
- $c$ = completion ratio;
- $h$ = **instructional score only**.

Topic 04 belum mengajarkan partial derivative. Jadi kita **tidak** menulis derivative multivariable terhadap $q$ sambil membiarkan $c$ sebagai variable kedua.

Sebaliknya, kita membuat **one-variable slice** dengan memilih nilai $c$ tertentu.

Misalkan:

$$
c=0.75.
$$

Maka:

$$
r(q)=h(q,0.75).
$$

Substitusi:

$$
r(q)=0.6q+0.4(0.75).
$$

Karena:

$$
0.4(0.75)=0.30,
$$

maka:

$$
r(q)=0.6q+0.30.
$$

Sekarang ini benar-benar fungsi **satu variabel**.

Differentiate term by term:

$$
r'(q)
=
\frac{d}{dq}(0.6q)
+
\frac{d}{dq}(0.30).
$$

Constant multiple + power rule pada $q^1$ memberi:

$$
\frac{d}{dq}(0.6q)=0.6.
$$

Constant rule memberi:

$$
\frac{d}{dq}(0.30)=0.
$$

Sehingga:

$$
r'(q)=0.6.
$$

## Math reading skill

Angka 0.6 berarti:

> Dalam one-variable instructional slice yang sudah didefinisikan tersebut, score berubah dengan local rate 0.6 score-unit per satu q-unit.

Jika $q$ naik sebesar 0.1 dalam fungsi linear ini, perubahan score adalah:

$$
0.6(0.1)=0.06.
$$

Tetapi ini **tidak berarti**:

- probability keberhasilan naik 6%;
- quiz menyebabkan outcome meningkat 6%;
- accuracy model adalah 60%;
- HerAI production memakai derivative ini;
- $q$ adalah causal feature importance.

Ini hanya konsekuensi matematis dari instructional formula yang didefinisikan.

---

# 12. CHANGE ONE THING — Apa yang Berubah Jika Coefficient Berubah?

Bandingkan:

$$
f(x)=2x^3
$$

dan:

$$
g(x)=5x^3.
$$

Derivative pertama:

$$
f'(x)=6x^2.
$$

Derivative kedua:

$$
g'(x)=15x^2.
$$

Untuk input yang sama, coefficient lebih besar menghasilkan derivative function yang juga diskalakan lebih besar.

Contoh di $x=2$:

$$
f'(2)=6(4)=24,
$$

sedangkan:

$$
g'(2)=15(4)=60.
$$

Namun hati-hati:

> “Derivative lebih besar” berarti local rate matematis lebih besar dalam konteks fungsi tersebut. Itu tidak otomatis berarti objek dunia nyata “lebih penting”, “lebih baik”, atau “lebih causal”.

---

# 13. CHANGE ONE THING — Apa yang Berubah Jika Exponent Berubah?

Bandingkan:

$$
f(x)=x^2
$$

dan:

$$
g(x)=x^4.
$$

Derivative-nya:

$$
f'(x)=2x,
$$

serta:

$$
g'(x)=4x^3.
$$

Di $x=1$:

$$
f'(1)=2,
$$

$$
g'(1)=4.
$$

Di $x=2$:

$$
f'(2)=4,
$$

$$
g'(2)=32.
$$

Jadi derivative function juga membantu melihat bahwa **local behavior dapat berubah sangat berbeda** pada fungsi dengan bentuk berbeda.

---

# 14. WHY THIS MATTERS IN AI — Mengapa Kita Butuh Differentiation Rules?

Model AI dan objective function dapat bergantung pada parameter numerik. Untuk memahami bagaimana suatu output berubah terhadap parameter, kita membutuhkan derivative.

Pada fungsi sangat sederhana, derivative dari definition masih mungkin dihitung manual. Tetapi fungsi yang lebih realistis dapat memiliki banyak operasi.

Differentiation rules memberi kita bahasa modular:

- derivative constant;
- derivative power;
- derivative constant multiple;
- derivative sum/difference;
- lalu pada topic berikutnya partial derivative;
- kemudian gradient;
- lalu chain rule untuk komposisi.

Topic 04 adalah langkah penting karena learner mulai bisa **menghasilkan derivative function secara sistematis**.

Tetapi kita belum membahas training algorithm.

> Mengetahui derivative bukan sama dengan menjalankan optimization.

---

# 15. DIFFERENTIATE LALU INTERPRET — Jangan Berhenti di Manipulasi Simbol

Diberikan synthetic function:

$$
J(w)=2w^3-3w^2+4w+1.
$$

> **Label:** synthetic mathematical function untuk latihan differentiation. Pada Topic 04, simbol $J$ tidak dimaknai sebagai actual production loss HerAI.

Differentiate:

$$
J'(w)
=
6w^2-6w+4.
$$

Sekarang evaluasi pada:

$$
w=1.
$$

Maka:

$$
J'(1)
=
6-6+4
=
4.
$$

Interpretasi yang aman:

> Local rate fungsi $J$ terhadap $w$ di sekitar $w=1$ adalah 4 output-unit per w-unit.

Interpretasi yang **tidak** aman:

> “Karena derivative 4, model pasti harus menurunkan $w$ empat unit.”

Itu sudah masuk ke keputusan update/Optimization dan tidak dibenarkan hanya dari derivative value ini.

---

# 16. MISCONCEPTION CHALLENGE — “Pangkat Tinggal Dikurangi Satu”

Seorang learner menulis:

$$
\frac{d}{dx}(x^5)=x^4.
$$

Apa yang salah?

Power rule bukan sekadar “kurangi pangkat satu”. Rule lengkap adalah:

$$
\frac{d}{dx}(x^n)=nx^{n-1}.
$$

Jadi:

$$
\frac{d}{dx}(x^5)=5x^4.
$$

Coefficient 5 muncul dari exponent lama.

---

# 17. MISCONCEPTION CHALLENGE — “Constant Tetap Ikut”

Seorang learner menulis:

$$
\frac{d}{dx}(3x^2+7)=6x+7.
$$

Bagian:

$$
6x
$$

benar.

Tetapi derivative constant 7 adalah:

$$
0.
$$

Sehingga hasil yang benar:

$$
6x.
$$

Mengapa?

Karena 7 tidak berubah ketika $x$ berubah.

---

# 18. MISCONCEPTION CHALLENGE — “Derivative Positif Berarti Bagus”

Misalnya:

$$
f'(2)=5.
$$

Ini berarti fungsi memiliki local rate positif di sekitar $x=2$.

Ia **tidak** berarti:

- sistem bagus;
- loss bagus;
- outcome baik;
- parameter harus dinaikkan;
- real-world effect menguntungkan.

Positive/negative adalah **arah perubahan matematis**, bukan label moral atau kualitas.

---

# 19. MISCONCEPTION CHALLENGE — “Derivative Besar = Feature Paling Penting”

Bahkan pada fungsi satu variabel, magnitude derivative perlu dibaca bersama:

- unit;
- skala input;
- titik evaluasi;
- definisi output;
- konteks fungsi.

Saat nanti masuk multivariable derivative dan gradient, persoalan ini menjadi lebih penting.

Karena itu, Topic 04 tidak boleh menanamkan shortcut:

> “Derivative terbesar = faktor dunia nyata paling penting.”

Itu bukan kesimpulan yang sah tanpa konteks tambahan.

---

# 20. TRY IT YOURSELF — Micro Practice 1

Differentiate:

$$
f(x)=x^6.
$$

Berhenti sebelum membuka jawaban.

### Jawaban

$$
f'(x)=6x^5.
$$

---

# 21. TRY IT YOURSELF — Micro Practice 2

Differentiate:

$$
g(x)=4x^3+2x-10.
$$

### Jawaban

$$
g'(x)=12x^2+2.
$$

---

# 22. TRY IT YOURSELF — Micro Practice 3

Diberikan:

$$
p(x)=3x^2-5x+4.
$$

1. Cari $p'(x)$.
2. Hitung $p'(2)$.
3. Interpretasikan hasilnya sebagai local rate.

### Jawaban

Derivative function:

$$
p'(x)=6x-5.
$$

Pada $x=2$:

$$
p'(2)=12-5=7.
$$

Interpretasi:

> Local rate fungsi $p$ di sekitar $x=2$ adalah 7 output-unit per input-unit.

---

# 23. VISUAL / INTERACTIVE SPEC — Derivative Function sebagai “Peta Slope”

[STATIC VISUAL]

**Learning purpose:** membedakan grafik fungsi asli dan derivative function.

**Initial state:** tampilkan dua panel vertikal/mobile-friendly:

1. grafik:
   $$
   f(x)=x^2;
   $$
2. grafik:
   $$
   f'(x)=2x.
   $$

**Learner action:** tidak ada.

**Expected behavior:** titik pada grafik $f$ di beberapa $x$ diberi tangent kecil; nilai slope tangent dicocokkan dengan nilai pada grafik $f'$.

**Feedback:** label misalnya:

- $x=-2\Rightarrow f'(-2)=-4$;
- $x=0\Rightarrow f'(0)=0$;
- $x=2\Rightarrow f'(2)=4$.

**Safety note:** derivative graph bukan grafik “error”. Ia adalah grafik local-rate function dari fungsi yang sedang didifferentiate.

---

# 24. VISUAL / INTERACTIVE SPEC — Power Rule Manipulator

[NUMBER MANIPULATOR]

**Learning purpose:** melihat hubungan exponent dengan derivative.

**Initial state:** fungsi:

$$
f(x)=x^n
$$

with slider:

$$
n\in\{1,2,3,4,5\}.
$$

**Learner action:** ubah $n$.

**Expected behavior:** sistem menampilkan berdampingan:

$$
f(x)=x^n
$$

serta:

$$
f'(x)=nx^{n-1}.
$$

**Feedback:** highlight dua perubahan:

1. exponent lama menjadi coefficient;
2. exponent baru berkurang satu.

**Safety note:** visual hanya untuk pangkat yang memang masuk core Topic 04; jangan menggeneralisasi tanpa penjelasan ke semua kemungkinan exponent/function.

---

# 25. VISUAL / INTERACTIVE SPEC — Differentiate Term by Term

[STEP-BY-STEP REVEAL]

**Learning purpose:** mencegah learner melompati rule pada polynomial.

**Initial function:**

$$
f(x)=3x^4-2x^2+5x-7.
$$

**Learner action:** tekan “next step”.

**Expected behavior:** reveal berurutan:

1. split per term;
2. constant multiple rule;
3. power rule;
4. constant rule;
5. combine result.

Final:

$$
f'(x)=12x^3-4x+5.
$$

**Feedback:** jika learner memilih “$3x^3-2x+5-7$”, sistem menandai bahwa exponent lama belum dikalikan dan constant belum menjadi zero.

**Safety note:** product/quotient/chain rule tidak dimasukkan ke interaction ini.

---

# 26. CHECKPOINT — Bisa Bedakan Rule-nya?

Cocokkan setiap fungsi dengan rule utama yang paling langsung dibutuhkan.

1. $f(x)=8$
2. $g(x)=x^5$
3. $p(x)=4x^3$
4. $r(x)=x^3+2x$

### Jawaban

1. constant rule;
2. power rule;
3. constant multiple + power rule;
4. sum rule + power rule.

---

# 27. CHECKPOINT — Diagnose the Error

Seorang learner menulis:

$$
f(x)=2x^4-3x+5
$$

kemudian:

$$
f'(x)=8x^3-3+5.
$$

Apa koreksinya?

Constant 5 harus menghasilkan:

$$
0.
$$

Sehingga:

$$
f'(x)=8x^3-3.
$$

---

# 28. CHECKPOINT — Derivative Function vs Value

Diberikan:

$$
f'(x)=4x^3-2.
$$

Apa beda:

$$
f'(x)
$$

dan:

$$
f'(2)?
$$

Jawaban:

- $f'(x)$ adalah derivative function;
- $f'(2)$ adalah local-rate value pada input 2.

Hitung:

$$
f'(2)=4(8)-2=30.
$$

---

# 29. MASTERY CHECK — I Can...

Setelah Topic 04, learner seharusnya dapat mengatakan:

- **I can** menjelaskan perbedaan derivative dari definition dengan derivative rules.
- **I can** menggunakan constant rule.
- **I can** menggunakan power rule pada pangkat bulat positif.
- **I can** mempertahankan coefficient dengan constant multiple rule.
- **I can** differentiate sum/difference term by term.
- **I can** menghitung derivative polynomial sederhana.
- **I can** membedakan $f'(x)$ dari $f'(a)$.
- **I can** menginterpretasikan sign, magnitude, dan unit derivative secara lokal.
- **I can** menggunakan one-variable HerAI slice tanpa mengubah instructional score menjadi probability atau causal effect.
- **I can** menyebut aturan yang belum dipelajari tanpa mencoba mengarang rule sendiri.

---

# 30. SCOPE BOUNDARY — Apa yang Belum Kita Ajarkan?

Topic 04 **tidak** menjadikan berikut sebagai computation requirement:

- product rule;
- quotient rule;
- trigonometric derivative catalog;
- exponential/log derivative catalog;
- implicit differentiation;
- higher derivatives;
- partial derivative;
- gradient;
- directional derivative;
- Jacobian;
- Hessian;
- chain rule;
- full backpropagation;
- automatic differentiation implementation;
- Gradient Descent;
- learning rate;
- parameter update;
- optimizer families.

### Catatan tentang product dan quotient rule

MIT/OpenStax calculus tentu mengajarkan product dan quotient rules. Namun untuk HerAI beginner core, Topic 04 sengaja fokus pada minimum rules yang cukup untuk polynomial toy functions dan continuity menuju partial derivative.

Product/quotient rules tidak perlu dijadikan core hanya karena tersedia di textbook umum.

### Catatan tentang $e^x$, $\sin x$, dan $\log x$

Function families tersebut penting dalam calculus yang lebih luas, tetapi tidak diperlukan untuk memenuhi learning destination Topic 04. Mereka tidak dijadikan manual-computation requirement di sini.

---

# 31. SUMMARY

Topic 04 mengubah derivative dari konsep yang dihitung berulang lewat limit menjadi skill perhitungan yang lebih efisien.

Rules inti:

## Constant rule

$$
\frac{d}{dx}(c)=0.
$$

## Power rule

$$
\frac{d}{dx}(x^n)=nx^{n-1}.
$$

## Constant multiple rule

$$
\frac{d}{dx}\big(kf(x)\big)=kf'(x).
$$

## Sum rule

$$
\frac{d}{dx}\big(f(x)+g(x)\big)=f'(x)+g'(x).
$$

## Difference rule

$$
\frac{d}{dx}\big(f(x)-g(x)\big)=f'(x)-g'(x).
$$

Dengan rules tersebut, polynomial sederhana dapat di-differentiate term by term.

Tetapi setiap hasil tetap harus dibaca sebagai **local rate information**, bukan sekadar manipulasi simbol.

---

# 32. BRIDGE — Dari Satu Variable ke Banyak Variable

Kita sekarang dapat melakukan:

$$
f(x)
\longrightarrow
f'(x)
$$

untuk fungsi satu variabel sederhana.

Namun sistem AI sering melibatkan lebih dari satu input atau parameter.

Misalnya:

$$
J(w,b)
$$

bergantung pada dua variable, $w$ dan $b$.

Pertanyaan baru muncul:

> Jika kita ingin mengetahui perubahan lokal terhadap $w$ saja, apa yang dilakukan terhadap $b$?

Dan sebaliknya:

> Jika kita ingin mengetahui perubahan lokal terhadap $b$, bagaimana kita memperlakukan $w$?

Pertanyaan inilah yang membawa kita ke:

# **Topic 05 — Partial Derivative**

Di sana baru kita akan memperkenalkan turunan terhadap **satu variable pada fungsi multivariable** sambil memperlakukan variable lain sebagai constant dalam operasi matematis.
