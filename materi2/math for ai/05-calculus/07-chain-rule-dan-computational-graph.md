# Topic 07 — Chain Rule dan Computational Graph
## Submodule 05 — Calculus: Perubahan, Turunan, dan Gradient

> **Posisi topik:** Topic 06 sudah mengajarkan gradient sebagai vector local-change information. Topic 07 sekarang menjawab pertanyaan berikut: jika sebuah output dibentuk melalui **beberapa fungsi yang tersusun**, bagaimana perubahan lokal dari input awal diteruskan sampai output akhir? Fokus topic ini adalah **chain rule untuk komposisi sederhana** dan **computational graph sebagai peta dependensi perhitungan**. Full neural-network backpropagation, automatic-differentiation implementation, serta mekanik Optimization tetap berada di luar scope.

## Tujuan Pembelajaran

Setelah menyelesaikan topik ini, peserta diharapkan mampu:

1. mengenali function composition seperti $z=f(g(x))$;
2. memecah composed function menjadi intermediate variable, misalnya $u=g(x)$ lalu $z=f(u)$;
3. membaca chain rule dalam notasi:
   $$
   \frac{dz}{dx}
   =
   \frac{dz}{du}
   \frac{du}{dx};
   $$
4. menjelaskan mengapa local derivative pada satu simple path **dikalikan**;
5. menggunakan chain rule pada komposisi polynomial sederhana;
6. membedakan nilai node, local derivative pada edge, dan derivative end-to-end;
7. membaca computational graph sebagai representasi dependensi operasi, bukan sebagai neural network secara otomatis;
8. menghitung derivative pada graph sederhana seperti $x\rightarrow u\rightarrow z$;
9. menggunakan canonical HerAI instructional score dalam contoh komposisi **synthetic** tanpa mengubahnya menjadi probability, causal model, atau production rule;
10. menghubungkan chain rule dengan cara sistem automatic differentiation dapat mengikuti graph secara konseptual, tanpa mempelajari implementasinya;
11. menjelaskan bahwa chain rule adalah mathematical mechanism yang digunakan dalam backpropagation, tetapi **chain rule bukan backpropagation itu sendiri**; dan
12. menjaga boundary bahwa menghitung derivative belum berarti melakukan parameter update atau Optimization.

---

# 1. HOOK / REAL PROBLEM — Ketika Satu Input Melewati Beberapa Tahap

Pada topic sebelumnya, kita sering menulis sebuah scalar function langsung terhadap input-nya.

Contoh:

$$
J(w)=w^2.
$$

Derivative-nya dapat dibaca langsung.

Tetapi banyak computation tidak terjadi dalam satu langkah.

Bayangkan **synthetic computation** berikut:

$$
w
\rightarrow
u=2w-1
\rightarrow
J=u^2.
$$

Nilai $J$ tidak menerima $w$ secara langsung. Perubahan pada $w$ lebih dulu mengubah $u$, lalu perubahan pada $u$ mengubah $J$.

Pertanyaannya:

> Jika $w$ berubah sedikit, bagaimana kita menghitung perubahan lokal pada $J$ melalui dua tahap tersebut?

Kita memerlukan aturan yang menghubungkan local rate pada setiap tahap.

Aturan itu adalah **chain rule**.

## Predict

Sebelum menghitung, coba prediksi:

1. Jika $w$ berubah tetapi $u$ tidak sensitif terhadap $w$, apakah $J$ masih dapat sangat sensitif terhadap $w$ melalui path tersebut?
2. Jika satu tahap menggandakan perubahan dan tahap berikutnya melipatgandakan lagi sebesar 3, kira-kira efek end-to-end menjadi tambah atau kali?
3. Apakah diagram $w\rightarrow u\rightarrow J$ otomatis berarti neural network?
4. Jika kita sudah mengetahui $\frac{dJ}{dw}$, apakah kita sudah mengetahui parameter update berikutnya?

Simpan jawaban awalmu.

---

# 2. INTUITION — Perubahan Lokal Mengalir Melalui Dependensi

Misalkan:

$$
u=g(x)
$$

dan:

$$
z=f(u).
$$

Artinya $z$ bergantung pada $u$, dan $u$ bergantung pada $x$.

Kita mempunyai dua local rates:

$$
\frac{du}{dx}
$$

yang menjawab:

> Seberapa cepat $u$ berubah secara lokal ketika $x$ berubah?

dan:

$$
\frac{dz}{du}
$$

yang menjawab:

> Seberapa cepat $z$ berubah secara lokal ketika $u$ berubah?

Untuk mengetahui perubahan $z$ terhadap input paling awal $x$, kita perlu menggabungkan kedua sensitivitas tersebut.

Intuisi sederhananya:

- perubahan kecil pada $x$ menghasilkan perubahan kecil pada $u$;
- perubahan kecil pada $u$ menghasilkan perubahan kecil pada $z$;
- efek end-to-end bergantung pada **kedua tahap**.

Jika tahap pertama mempunyai local rate 2 dan tahap kedua mempunyai local rate 3 pada point yang sedang dibahas, maka perubahan lokal end-to-end mempunyai faktor:

$$
3\times2=6.
$$

Ini bukan sekadar trik simbol.

Ia menyatakan bahwa sensitivity dari satu tahap **diteruskan melalui** sensitivity tahap berikutnya.

---

# 3. EXPLORE — Dari Function Composition ke Intermediate Variable

Pertimbangkan **synthetic function**:

$$
z=(2x+1)^2.
$$

Kita dapat membaca function ini sebagai komposisi dua function.

Inner function:

$$
u=2x+1.
$$

Outer function:

$$
z=u^2.
$$

Sehingga computation dapat ditulis:

$$
x
\rightarrow
u=2x+1
\rightarrow
z=u^2.
$$

Sekarang local derivative setiap tahap mudah dibaca.

Untuk inner stage:

$$
\frac{du}{dx}=2.
$$

Untuk outer stage:

$$
\frac{dz}{du}=2u.
$$

Chain rule menggabungkannya:

$$
\frac{dz}{dx}
=
\frac{dz}{du}
\frac{du}{dx}.
$$

Substitute local derivatives:

$$
\frac{dz}{dx}
=
(2u)(2)
=
4u.
$$

Karena:

$$
u=2x+1,
$$

maka:

$$
\frac{dz}{dx}
=
4(2x+1).
$$

Kita baru saja menghitung derivative end-to-end dengan mengikuti struktur komposisi.

---

# 4. FORMAL DEFINITION — Chain Rule untuk Komposisi Dua Function

Jika:

$$
u=g(x)
$$

dan:

$$
z=f(u),
$$

dengan function yang relevan differentiable pada point yang sedang dibahas, maka:

$$
\frac{dz}{dx}
=
\frac{dz}{du}
\frac{du}{dx}.
$$

Dalam notation function composition:

$$
z=f(g(x)),
$$

chain rule dapat ditulis:

$$
\frac{dz}{dx}
=
f'(g(x))g'(x).
$$

OpenStax merumuskan chain rule untuk composite function sebagai derivative outer function yang dievaluasi pada inner function, dikalikan derivative inner function. [R1]

## Apa yang sedang dikalikan?

Bukan nilai function sembarang.

Yang dikalikan adalah **local derivatives** yang berada di sepanjang dependency path:

$$
x
\rightarrow
u
\rightarrow
z.
$$

Untuk path sederhana ini:

$$
\text{end-to-end local rate}
=
\text{outer local rate}
\times
\text{inner local rate}.
$$

---

# 5. NOTATION + FORMULA — Dua Cara Membaca Chain Rule

## 5.1 Leibniz-style notation

$$
\frac{dz}{dx}
=
\frac{dz}{du}
\frac{du}{dx}.
$$

Notasi ini berguna karena memperlihatkan dependency stages secara eksplisit.

## 5.2 Function notation

Jika:

$$
h(x)=f(g(x)),
$$

maka:

$$
h'(x)=f'(g(x))g'(x).
$$

Kedua bentuk tersebut mengungkap mathematical relationship yang sama.

Untuk beginner, topic ini menggunakan intermediate variable seperti $u$ ketika hal itu membuat struktur komposisi lebih mudah dibaca.

---

# 6. MATH READING SKILL — Membaca Chain Rule Secara Aman

Ambil formula:

$$
\frac{dz}{dx}
=
\frac{dz}{du}
\frac{du}{dx}.
$$

## Symbols

- $x$ = input awal;
- $u$ = intermediate variable;
- $z$ = output akhir;
- $\frac{du}{dx}$ = local rate intermediate terhadap input;
- $\frac{dz}{du}$ = local rate output terhadap intermediate;
- $\frac{dz}{dx}$ = local rate output akhir terhadap input awal.

## Input

Input derivative end-to-end adalah variable $x$ dan point/local state yang sedang dievaluasi.

## Operation

Hitung local derivative pada masing-masing stage, lalu kalikan sesuai dependency path.

## Output

Output-nya adalah satu derivative end-to-end:

$$
\frac{dz}{dx}.
$$

## Units

Jika units bermakna, chain rule juga konsisten secara unit.

Misalnya:

$$
\frac{dz}{du}
\quad\text{mempunyai unit}\quad
\frac{\text{unit }z}{\text{unit }u},
$$

dan:

$$
\frac{du}{dx}
\quad\text{mempunyai unit}\quad
\frac{\text{unit }u}{\text{unit }x}.
$$

Ketika dikalikan:

$$
\frac{\text{unit }z}{\text{unit }u}
\times
\frac{\text{unit }u}{\text{unit }x}
=
\frac{\text{unit }z}{\text{unit }x}.
$$

## Assumptions

Chain rule digunakan ketika dependency benar-benar berbentuk composition dan derivatives yang diperlukan exist pada point yang relevan.

## Local vs global

Chain rule menggabungkan **local rate information**. Ia tidak memberi global guarantee tentang seluruh bentuk function.

## Formula ini tidak mengimplikasikan

Chain rule tidak otomatis berarti:

- causality;
- probability;
- model training;
- parameter update;
- Gradient Descent;
- global minimum;
- backpropagation implementation lengkap.

---

# 7. WORKED BASIC EXAMPLE — Dua Tahap yang Dapat Dilacak Manual

Gunakan:

$$
u=3x-2
$$

dan:

$$
z=u^3.
$$

Kita ingin mencari:

$$
\frac{dz}{dx}.
$$

## Step 1 — derivative outer stage

$$
z=u^3.
$$

Maka:

$$
\frac{dz}{du}=3u^2.
$$

## Step 2 — derivative inner stage

$$
u=3x-2.
$$

Maka:

$$
\frac{du}{dx}=3.
$$

## Step 3 — apply chain rule

$$
\frac{dz}{dx}
=
\frac{dz}{du}
\frac{du}{dx}
=
(3u^2)(3)
=
9u^2.
$$

Substitute kembali:

$$
u=3x-2.
$$

Sehingga:

$$
\frac{dz}{dx}
=
9(3x-2)^2.
$$

## Evaluate at $x=1$

Pertama:

$$
u=3(1)-2=1.
$$

Maka:

$$
\left.\frac{dz}{dx}\right|_{x=1}
=
9(1)^2
=
9.
$$

Interpretasinya:

> Di sekitar $x=1$, output $z$ memiliki local rate 9 per satu unit $x$, sesuai scale dan units function yang digunakan.

Angka 9 adalah local derivative pada point tersebut, bukan statement global bahwa function selalu berubah 9.

---

# 8. COMPUTATIONAL GRAPH — Peta Operasi dan Dependensi

Sebuah **computational graph** adalah representasi yang menunjukkan bagaimana suatu quantity dibentuk dari quantity lain melalui operations.

Untuk example sebelumnya:

$$
x
\rightarrow
u=3x-2
\rightarrow
z=u^3.
$$

Kita dapat membedakan tiga jenis informasi:

1. **node values**, misalnya $x$, $u$, dan $z$;
2. **operations**, misalnya affine transform dan power;
3. **local derivatives**, misalnya $\frac{du}{dx}$ dan $\frac{dz}{du}$.

PyTorch menjelaskan bahwa automatic differentiation secara konseptual mencatat operations ke dalam directed acyclic graph dan dapat menghitung gradients dengan mengikuti graph menggunakan chain rule. [R3]

Tetapi dalam HerAI Math for AI:

> Computational graph dipakai sebagai **mathematical map of dependency**, bukan sebagai tutorial implementasi autograd.

## Computational graph bukan neural network saja

Graph seperti:

$$
x\rightarrow u\rightarrow z
$$

dapat muncul pada:

- formula matematika biasa;
- preprocessing transformation;
- synthetic score;
- physical model;
- probabilistic computation;
- neural-network computation.

Jadi:

> **computational graph ≠ neural network.**

Neural network dapat direpresentasikan sebagai computational graph, tetapi computational graph adalah gagasan yang lebih umum.

---

# 9. STEP-BY-STEP REVEAL — Forward Values dan Local Derivatives

Gunakan kembali:

$$
x
\rightarrow
u=2x+1
\rightarrow
z=u^2.
$$

Ambil:

$$
x=2.
$$

## Forward values

Pertama:

$$
u=2(2)+1=5.
$$

Kemudian:

$$
z=5^2=25.
$$

Forward values memberi kita:

$$
x=2,
\qquad
u=5,
\qquad
z=25.
$$

## Local derivatives

Inner edge:

$$
\frac{du}{dx}=2.
$$

Outer edge:

$$
\frac{dz}{du}=2u.
$$

Pada $u=5$:

$$
\frac{dz}{du}=10.
$$

## End-to-end derivative

$$
\frac{dz}{dx}
=
10\times2
=
20.
$$

Perhatikan perbedaannya:

- $z=25$ adalah **function value**;
- $\frac{dz}{du}=10$ adalah **local derivative pada satu edge**;
- $\frac{dz}{dx}=20$ adalah **end-to-end local derivative**.

Mencampur ketiga object tersebut adalah miskonsepsi yang umum.

---

# 10. WORKED HerAI EXAMPLE — Canonical Score di Dalam Synthetic Wrapper

Canonical HerAI instructional score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Score ini **bukan probability, bukan causal model, dan bukan production recommendation rule**.

Untuk mempelajari chain rule, kita tambahkan outer function yang sengaja diberi label:

> **SYNTHETIC CALCULUS WRAPPER — bukan behavior HerAI production.**

Definisikan:

$$
s=h(q,c).
$$

Lalu:

$$
R(s)=s^2.
$$

Sehingga:

$$
(q,c)
\rightarrow
s=h(q,c)
\rightarrow
R=s^2.
$$

Kita ingin membaca perubahan $R$ terhadap $q$ ketika $c$ mathematically held fixed.

Chain rule:

$$
\frac{\partial R}{\partial q}
=
\frac{dR}{ds}
\frac{\partial s}{\partial q}.
$$

Kita sudah tahu:

$$
\frac{dR}{ds}=2s
$$

dan dari canonical score:

$$
\frac{\partial s}{\partial q}=0.6.
$$

Maka:

$$
\frac{\partial R}{\partial q}
=
(2s)(0.6)
=
1.2s.
$$

## Alya

Untuk Alya:

$$
q=0.80,
\qquad
c=0.75.
$$

Canonical score:

$$
s=h(0.80,0.75)
=
0.6(0.80)+0.4(0.75)
=
0.78.
$$

Sehingga:

$$
\frac{\partial R}{\partial q}
=
1.2(0.78)
=
0.936.
$$

## Interpretasi aman

Nilai:

$$
0.936
$$

berarti local sensitivity dari **synthetic wrapper $R=s^2$** terhadap $q$ di state tersebut, dengan $c$ held fixed dalam operasi matematis.

Ia **tidak berarti**:

- Alya mempunyai success probability 93.6%;
- quiz menyebabkan outcome sebesar 0.936;
- HerAI production menghitung $R=s^2$;
- $q$ adalah feature paling penting secara universal;
- sistem harus mengubah parameter tertentu.

Contoh ini ada hanya untuk memperlihatkan chain rule sambil mempertahankan continuity dengan canonical instructional score.

---

# 11. CHANGE ONE THING — Mengapa Satu Edge Dapat Mengubah End-to-End Sensitivity?

Pertimbangkan dua **synthetic chains**.

Chain A:

$$
x
\rightarrow
u=2x
\rightarrow
z=3u.
$$

Local rates:

$$
\frac{du}{dx}=2,
\qquad
\frac{dz}{du}=3.
$$

Maka:

$$
\frac{dz}{dx}=6.
$$

Sekarang Chain B hanya mengubah inner stage:

$$
x
\rightarrow
u=0.5x
\rightarrow
z=3u.
$$

Local rates:

$$
\frac{du}{dx}=0.5,
\qquad
\frac{dz}{du}=3.
$$

Sehingga:

$$
\frac{dz}{dx}=1.5.
$$

Outer stage sama, tetapi end-to-end local rate berubah karena satu edge mempunyai sensitivity berbeda.

## Critical observation

Pada simple serial path, jika salah satu local derivative bernilai zero pada point tertentu:

$$
\frac{du}{dx}=0,
$$

maka product sepanjang path menjadi:

$$
\frac{dz}{dx}=0
$$

untuk path tersebut.

Namun ini adalah statement tentang **local derivative pada path dan point itu**, bukan claim bahwa seluruh system global tidak pernah berubah.

---

# 12. WHY THIS MATTERS IN AI — Mengapa Composition Sangat Umum?

Sistem AI biasanya terdiri dari banyak transformations.

Secara abstrak:

$$
\text{input}
\rightarrow
\text{representation}
\rightarrow
\text{score}
\rightarrow
\text{objective}.
$$

Masing-masing stage dapat berupa function.

Ketika objective bergantung pada parameter melalui beberapa transformations, kita membutuhkan cara untuk menghubungkan local rates sepanjang dependency structure.

Chain rule menyediakan mathematical mechanism tersebut.

Dokumentasi PyTorch menjelaskan bahwa autograd membangun graph dari operations dan dapat menghitung gradients dengan menggunakan chain rule. [R3]

Tetapi perlu dibedakan secara tegas:

> **Chain rule adalah aturan matematika. Automatic differentiation adalah sistem untuk menghitung derivatives secara terprogram. Backpropagation adalah prosedur khusus untuk mengorganisasi gradient computation pada composed computations, terutama dikenal dalam neural networks. Ketiganya berkaitan, tetapi bukan istilah yang identik.**

Topik ini hanya mengajarkan fondasi matematikanya.

---

# 13. CHAIN RULE ≠ BACKPROPAGATION ITSELF

Pernyataan berikut terlalu kasar:

> “Chain rule adalah backpropagation.”

Versi yang lebih aman:

> **Backpropagation menggunakan chain rule sebagai mathematical mechanism untuk menghitung derivatives melalui composed computation.**

Mengapa distinction ini penting?

Karena chain rule sudah berlaku pada function sederhana jauh sebelum kita berbicara tentang neural networks:

$$
z=(2x+1)^2.
$$

Kita dapat menggunakan chain rule tanpa:

- dataset training;
- layer neural network;
- loss optimization;
- optimizer;
- learning rate;
- backward implementation.

Jadi chain rule lebih fundamental daripada satu algorithm atau software framework tertentu.

---

# 14. COMPUTATIONAL GRAPH BOUNDARY — Apa yang Kita Ajarkan dan Tidak?

## Core pada Topic 07

Kita mengajarkan:

- node sebagai quantity/intermediate value;
- edge/dependency sebagai hubungan computation;
- function composition;
- local derivative per stage;
- multiplication of local derivatives sepanjang **simple serial path**;
- forward value vs local derivative vs end-to-end derivative;
- hubungan conceptual dengan automatic differentiation.

## Belum core

Kita belum mengajarkan:

- full multibranch backprop derivation;
- gradient accumulation dari banyak paths;
- vector-Jacobian products sebagai theory;
- Jacobian matrices sebagai full theory;
- reverse-mode vs forward-mode implementation details;
- `.backward()` programming workflow;
- memory graph internals;
- neural-network layer-by-layer derivation.

PyTorch boleh menjadi konteks teknis untuk menjelaskan bahwa real autodiff systems menggunakan computation graph dan chain rule, tetapi implementation mechanics bukan learning outcome topic ini. [R3]

---

# 15. MISCONCEPTION CHALLENGE

Evaluasi pernyataan berikut.

## A. “Chain rule berarti kita menjumlahkan semua derivatives.”

**Salah untuk simple serial path yang sedang dipelajari.**

Untuk:

$$
x\rightarrow u\rightarrow z,
$$

chain rule menggunakan:

$$
\frac{dz}{dx}
=
\frac{dz}{du}
\frac{du}{dx}.
$$

Local derivatives pada path tersebut dikalikan.

## B. “Jika ada tiga nodes, computational graph pasti neural network.”

**Salah.**

Computational graph hanyalah representasi operations dan dependencies.

## C. “Jika saya sudah mendapatkan derivative loss terhadap parameter, saya sudah melakukan optimization.”

**Salah.**

Derivative memberi local-change information. Parameter-update mechanics memerlukan keputusan tambahan dan dipelajari di Submodule 06 — Optimization.

## D. “Chain rule sama persis dengan backpropagation.”

**Salah.**

Backpropagation menggunakan chain rule; keduanya bukan istilah yang identik.

## E. “Derivative end-to-end selalu sama dengan derivative outer stage.”

**Salah.**

Inner-stage sensitivity juga memengaruhi hasil.

## F. “Nilai node dan derivative node adalah object yang sama.”

**Salah.**

Misalnya:

$$
z=25
$$

dan:

$$
\frac{dz}{dx}=20
$$

adalah dua quantity dengan makna berbeda.

---

# 16. TRY IT YOURSELF

Gunakan **synthetic computation**:

$$
x
\rightarrow
u=x^2+1
\rightarrow
z=3u^2.
$$

Tanpa melihat solusi penuh, lakukan:

1. tulis $\frac{du}{dx}$;
2. tulis $\frac{dz}{du}$;
3. gunakan:
   $$
   \frac{dz}{dx}
   =
   \frac{dz}{du}
   \frac{du}{dx};
   $$
4. substitute $u=x^2+1$;
5. evaluate pada $x=1$;
6. jelaskan perbedaan nilai $z$ dan derivative $\frac{dz}{dx}$.

Checkpoint singkat:

$$
\frac{du}{dx}=2x,
$$

dan:

$$
\frac{dz}{du}=6u.
$$

Maka:

$$
\frac{dz}{dx}=12xu.
$$

Substitute:

$$
u=x^2+1,
$$

sehingga:

$$
\frac{dz}{dx}
=
12x(x^2+1).
$$

Pada $x=1$:

$$
\frac{dz}{dx}=24.
$$

---

# 17. VISUAL / INTERACTIVE SPEC

## [STEP-BY-STEP REVEAL] Serial Computational Graph

**Learning purpose:** membedakan node values, operations, local derivatives, dan derivative end-to-end.

**Initial state/function:**

$$
x
\rightarrow
u=2x+1
\rightarrow
z=u^2,
\qquad
x=2.
$$

**Learner action:** tekan “next” untuk membuka secara bertahap:

1. forward value $u$;
2. forward value $z$;
3. local derivative $\frac{du}{dx}$;
4. local derivative $\frac{dz}{du}$;
5. product chain rule;
6. final $\frac{dz}{dx}$.

**Expected behavior:** graph tetap sama tetapi annotations muncul per tahap.

**Feedback:** jika learner mencampur $z$ dengan $\frac{dz}{dx}$, tampilkan pesan bahwa value dan rate adalah mathematical objects berbeda.

**Safety note:** visual tidak menyebut proses ini sebagai optimizer atau training.

---

## [NUMBER MANIPULATOR] Ubah Inner Sensitivity

**Learning purpose:** melihat bagaimana local derivative satu edge memengaruhi end-to-end derivative.

**Initial function:**

$$
u=ax,
\qquad
z=3u.
$$

**Learner action:** ubah $a$ dengan slider.

**Expected behavior:** tampilkan:

$$
\frac{du}{dx}=a,
$$

$$
\frac{dz}{du}=3,
$$

serta:

$$
\frac{dz}{dx}=3a.
$$

**Feedback:** highlight bahwa outer stage tetap sama, tetapi end-to-end rate berubah.

**Safety note:** magnitude derivative bukan otomatis “importance” dunia nyata.

---

## [COMPARE VIEW] Direct Formula vs Composed View

**Learning purpose:** menunjukkan bahwa composed representation tidak mengubah function; ia membantu membaca dependency.

**Left view:**

$$
z=(2x+1)^2.
$$

**Right view:**

$$
x\rightarrow u=2x+1\rightarrow z=u^2.
$$

**Learner action:** pilih nilai $x$ dan bandingkan output serta derivative kedua representations.

**Expected behavior:** function value dan end-to-end derivative identik.

**Safety note:** computational graph adalah representasi computation, bukan model production otomatis.

---

## [STATIC VISUAL] Chain Rule vs Optimization Boundary

**Learning purpose:** membedakan tiga tahap konseptual.

Visual:

**composed function → chain rule derivative → [STOP]**

Di bawah garis STOP tampilkan:

**parameter update / learning rate / iteration = Submodule 06 Optimization**

**Safety note:** mendapatkan gradient/derivative tidak menentukan update rule dengan sendirinya.

---

# 18. CHECKPOINT

Jawab tanpa melihat bagian sebelumnya.

1. Apa arti function composition?
2. Jika $u=g(x)$ dan $z=f(u)$, tulis chain rule.
3. Apa yang dikalikan pada simple serial computational path?
4. Apa perbedaan node value dan local derivative?
5. Apakah computational graph selalu neural network?
6. Apakah chain rule sama dengan backpropagation?
7. Jika derivative suatu loss telah diketahui, apakah parameter update sudah otomatis ditentukan?
8. Mengapa synthetic HerAI wrapper $R(s)=s^2$ harus diberi label synthetic?

## Expected checkpoint reasoning

Jawaban yang baik menunjukkan bahwa learner dapat:

- memecah composed function menjadi stages;
- mengidentifikasi inner dan outer derivative;
- mengalikan local derivatives sepanjang simple path;
- membedakan value, local derivative, dan end-to-end derivative;
- menjaga chain rule/backprop/autodiff/optimization boundaries;
- mempertahankan semantic safety pada HerAI running case.

---

# 19. MASTERY CHECK — “I Can...”

- **I can** mengenali composed function.
- **I can** membuat intermediate variable untuk memecah komposisi.
- **I can** membaca $\frac{dz}{dx}=\frac{dz}{du}\frac{du}{dx}$.
- **I can** menghitung chain rule untuk komposisi polynomial sederhana.
- **I can** membaca computational graph $x\rightarrow u\rightarrow z$.
- **I can** membedakan node value, local derivative, dan end-to-end derivative.
- **I can** menjelaskan mengapa local derivatives dikalikan pada simple serial path.
- **I can** menggunakan canonical HerAI score di dalam contoh wrapper yang jelas dilabel synthetic.
- **I can** menjelaskan bahwa computational graph bukan neural network saja.
- **I can** menjelaskan bahwa chain rule bukan backpropagation itu sendiri.
- **I can** menjelaskan bahwa derivative/gradient computation belum sama dengan Optimization.

---

# 20. SCOPE BOUNDARY — Apa yang Belum Kita Ajarkan?

Topic 07 berhenti pada:

> **function composition → intermediate variables → simple chain rule → serial computational graph → local derivatives → end-to-end derivative → conceptual autodiff/backprop bridge.**

Belum menjadi core/computation requirement:

- full neural-network backpropagation derivation;
- multiple-path gradient accumulation;
- Jacobian matrices sebagai full theory;
- Hessians;
- reverse-mode automatic differentiation implementation;
- forward-mode automatic differentiation implementation;
- coding dengan `.backward()`;
- computational graph memory internals;
- Gradient Descent update;
- learning rate;
- optimizer families;
- training loop;
- convergence analysis.

Khusus chain rule multivariable yang lebih luas, MIT 18.02 menunjukkan bahwa versi multivariable memang ada dan lebih kompleks. [R2] HerAI hanya mengambil minimum yang diperlukan untuk membangun foundation menuju AI tanpa menjadikan topic ini kuliah multivariable calculus penuh.

---

# 21. SUMMARY

Chain rule menjelaskan bagaimana local change diteruskan melalui composed functions.

Jika:

$$
u=g(x)
$$

dan:

$$
z=f(u),
$$

maka:

$$
\frac{dz}{dx}
=
\frac{dz}{du}
\frac{du}{dx}.
$$

Dalam function notation:

$$
\frac{d}{dx}f(g(x))
=
f'(g(x))g'(x).
$$

Computational graph membantu memetakan:

- quantities;
- operations;
- dependencies;
- local derivatives.

Untuk simple path:

$$
x\rightarrow u\rightarrow z,
$$

end-to-end derivative diperoleh dengan mengalikan local derivatives sepanjang path.

Hal yang harus tetap aman:

- chain rule ≠ backpropagation itu sendiri;
- computational graph ≠ neural network saja;
- derivative ≠ parameter update;
- gradient ≠ error;
- HerAI instructional score ≠ probability/causality/production model;
- synthetic wrapper tetap synthetic.

---

# 22. BRIDGE — Dari Chain Rule ke Loss Landscape

Sekarang kita sudah memahami bagaimana local-change information dapat melewati composed computation.

Contoh **synthetic toy loss**:

$$
J(w)=(2w-1)^2.
$$

Kita dapat memecahnya menjadi:

$$
w
\rightarrow
u=2w-1
\rightarrow
J=u^2,
$$

dan chain rule memberi:

$$
\frac{dJ}{dw}
=
\frac{dJ}{du}
\frac{du}{dw}.
$$

Tetapi derivative tersebut baru menjawab:

> Bagaimana loss berubah secara lokal jika parameter berubah?

Kita belum membahas:

- bentuk landscape secara menyeluruh;
- minimum lokal/global secara visual;
- gradient pada loss landscape;
- boundary menuju arah penurunan;
- bagaimana semua ini menjembatani Optimization.

Itulah fokus:

# **Topic 08 — Loss Landscape dan Bridge ke Optimization**

---

# Referensi Ringkas

Source ledger lengkap tersedia di `referensi-topic-07.md`.

- [R1] OpenStax — *Calculus Volume 1*, Section 3.6: The Chain Rule.
- [R2] MIT OpenCourseWare — *18.02SC Multivariable Calculus*, Part B: Chain Rule, Gradient and Directional Derivatives.
- [R3] PyTorch Documentation — *Autograd mechanics*.

> Browser-level target HerAI Markdown parser + KaTeX runtime: **NOT TESTED / NOT CLAIMED**.
