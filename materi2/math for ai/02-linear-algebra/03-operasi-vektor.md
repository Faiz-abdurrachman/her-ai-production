# Topic 03 — Operasi Vektor: Penjumlahan, Pengurangan, dan Scalar Multiplication

> **Submodul 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks**  
> **Filename:** `03-operasi-vektor.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 75–95 menit membaca + 40–55 menit eksplorasi/praktik  
> **Prerequisite:** Topic 01–02 — scalar→vector, components, indexing, dimension, shape, dan feature order  
> **Forward dependency:** Topic 04 — Magnitude/Norm dan Distance: Mengukur Besar dan Kedekatan  
> **Boundary:** Topic ini mengajarkan vector addition, vector subtraction, dan scalar multiplication secara component-wise dan interpretatif. Belum mengajarkan norm, distance, dot product, cosine similarity, matrix, matrix multiplication, probability, gradient, atau optimization.

---

# 1. Mengapa Topik Ini Ada?

Pada Topic 01 kita membangun kebutuhan untuk menyatukan beberapa scalar features menjadi satu vector.

Pada Topic 02 kita belajar membaca vector secara presisi:

- component;
- index;
- dimension;
- shape;
- feature order;
- feature schema.

Sekarang kita siap melakukan langkah berikutnya dalam Linear Algebra:

> **melakukan operasi terhadap vector sambil tetap menjaga arti setiap component.**

Secara matematis, vector addition dan scalar multiplication adalah operasi dasar yang membentuk banyak konstruksi Linear Algebra. MIT OpenCourseWare bahkan menempatkan addition dan multiplication sebagai operasi dasar yang kemudian membangun linear combinations. [R1]

Untuk vector di $\mathbb{R}^{d}$, penjumlahan, pengurangan, dan scalar multiplication dilakukan **component-wise**: component pada posisi yang sama diproses bersama. [R2][R3]

Tetapi pada course HerAI kita perlu menambahkan satu lapisan reasoning yang sangat penting:

> **Mathematical compatibility belum tentu sama dengan semantic compatibility.**

Dua vector bisa sama-sama berada di $\mathbb{R}^{2}$, tetapi jika component pertama pada vector A berarti quiz ratio sedangkan component pertama pada vector B berarti study duration, penjumlahan component-wise dapat dihitung tetapi hasilnya tidak otomatis punya makna yang valid.

Itulah alasan feature-order dan feature-schema dari Topic 02 bukan formalitas.

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 03, kamu diharapkan mampu:

1. menjelaskan vector addition secara intuitif dan formal;
2. menghitung penjumlahan dua vectors secara component-wise;
3. menjelaskan syarat mathematical compatibility untuk vector addition;
4. menjelaskan mengapa same dimension belum cukup untuk semantic compatibility;
5. menjelaskan vector subtraction sebagai component-wise difference;
6. membaca subtraction sebagai perbedaan berarah per component, bukan distance;
7. menghitung vector subtraction secara langkah demi langkah;
8. menjelaskan scalar multiplication sebagai satu scalar yang mengalikan setiap component;
9. menghitung scalar multiplication untuk scalar positif, nol, pecahan, dan negatif;
10. membedakan scalar multiplication dari menambah scalar ke setiap component;
11. mengenali zero vector yang muncul dari $0\mathbf{x}$;
12. menjelaskan bahwa hasil operasi dapat mathematically valid tetapi keluar dari valid application domain;
13. mempertahankan feature order selama seluruh operasi;
14. melakukan HerAI feature-wise comparison menggunakan vector subtraction;
15. menjelaskan mengapa $\mathbf{x}^{(A)}+\mathbf{x}^{(B)}$ bukan otomatis “gabungan dua peserta” yang meaningful;
16. menjelaskan bahwa $k\mathbf{x}$ bukan berarti “$k$ kali peserta”;
17. membaca operasi vector dalam natural language;
18. memprediksi arah perubahan component sebelum menghitung;
19. mengaudit kesalahan operasi akibat dimension/schema mismatch;
20. memahami bahwa vector operations menjadi fondasi untuk konsep Linear Algebra dan ML berikutnya tanpa masuk ke norm/distance/dot product sekarang.

---

# 3. Prerequisite Recall — Apa yang Sudah Harus Kamu Tahu?

Kita tidak mengulang Topic 01–02 secara panjang.

Cukup pegang empat contract.

## 3.1 Vector adalah ordered representation

Contoh canonical HerAI:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

## 3.2 Feature order canonical HerAI

1. component pertama = quiz ratio;
2. component kedua = completion ratio.

## 3.3 Semua canonical participant vectors berada di ruang yang sama

$$
\mathbf{x}^{(i)}\in\mathbb{R}^{2}
$$

## 3.4 Same position means same intended feature

Untuk operation yang meaningful:

- posisi 1 harus dibandingkan/digabung dengan posisi 1;
- posisi 2 harus dibandingkan/digabung dengan posisi 2.

Kita tidak boleh diam-diam menukar schema.

---

# 4. Pertanyaan Pemantik — “Kalau Dua Vector Punya Dua Angka, Tinggal Dijumlahkan?”

Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Bima:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

Seorang developer berkata:

> “Dua-duanya vector dua dimensi. Berarti tinggal jumlahkan dan hasilnya adalah participant gabungan.”

Jika kita hitung component-wise:

$$
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
+
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
=
\begin{bmatrix}
1.40 \\
1.375
\end{bmatrix}
$$

Perhitungannya benar.

Tetapi apakah:

$$
1.40
$$

masih valid sebagai quiz ratio peserta?

Tidak, jika quiz ratio didefinisikan pada domain $[0,1]$.

Maka kita sudah menemukan distinction penting:

> **Sebuah operasi dapat valid secara Linear Algebra tetapi hasilnya belum tentu valid sebagai real-world feature representation untuk task tertentu.**

---

# 5. Predict Before Calculate

Jangan langsung hitung detail.

Gunakan reasoning dulu.

## Prediksi A — Addition

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
2 \\
5
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
3 \\
-1
\end{bmatrix}
$$

Untuk:

$$
\mathbf{u}+\mathbf{v}
$$

prediksi:

- component pertama naik atau turun?
- component kedua naik atau turun?

Simpan prediksimu.

---

## Prediksi B — Subtraction

Alya punya quiz ratio $0.80$.

Bima punya quiz ratio $0.60$.

Tanpa menghitung seluruh vector, apakah component pertama dari:

$$
\mathbf{x}^{(1)}-\mathbf{x}^{(2)}
$$

positif, negatif, atau nol?

---

## Prediksi C — Scalar Multiplication

Jika:

$$
k=2
$$

apa yang terjadi pada setiap component dari:

$$
k\mathbf{u}
$$

?

A. hanya component pertama dikali $2$  
B. semua components dikali $2$  
C. dimension menjadi dua kali lipat  
D. vector berubah menjadi scalar

---

## Prediksi D — Compatibility

Vector A:

$$
\mathbf{a}
=
\begin{bmatrix}
0.8 \\
0.7
\end{bmatrix}
$$

Schema:

1. quiz ratio;
2. completion ratio.

Vector B:

$$
\mathbf{b}
=
\begin{bmatrix}
45 \\
20
\end{bmatrix}
$$

Schema:

1. study duration minutes;
2. age years.

Keduanya berada di $\mathbb{R}^{2}$.

Apakah itu cukup untuk mengatakan:

$$
\mathbf{a}+\mathbf{b}
$$

punya semantic meaning yang jelas?

---

# 6. Intuisi — “Satu Posisi, Satu Operasi”

Bayangkan dua tray yang masing-masing mempunyai dua slot.

Tray pertama:

$$
\begin{bmatrix}
2 \\
5
\end{bmatrix}
$$

Tray kedua:

$$
\begin{bmatrix}
3 \\
-1
\end{bmatrix}
$$

Untuk vector addition, kita tidak mencampur semua angka ke satu total.

Kita bekerja berdasarkan **matching position**:

- slot pertama dengan slot pertama;
- slot kedua dengan slot kedua.

Sehingga:

$$
\begin{bmatrix}
2 \\
5
\end{bmatrix}
+
\begin{bmatrix}
3 \\
-1
\end{bmatrix}
=
\begin{bmatrix}
2+3 \\
5+(-1)
\end{bmatrix}
$$

Vector operation mempertahankan structure position.

Dalam data/ML, position sering terikat ke feature schema. Google ML menjelaskan feature vector sebagai sekumpulan numerical feature values untuk satu example. Karena tiap position membawa feature meaning, consistency dari representation tetap penting saat mathematical operations dilakukan. [R4][R5]

---

# 7. Concrete Example 1 — Vector Addition Tanpa Notasi General

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
2 \\
5
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
3 \\
-1
\end{bmatrix}
$$

Kita pasangkan component yang posisinya sama.

Component pertama:

$$
2+3=5
$$

Component kedua:

$$
5+(-1)=4
$$

Maka:

$$
\mathbf{u}+\mathbf{v}
=
\begin{bmatrix}
5 \\
4
\end{bmatrix}
$$

Perhatikan:

- dua input vectors dimension $2$;
- output juga dimension $2$;
- kita tidak menjumlahkan $2+5+3-1$ menjadi satu scalar.

---

# 8. Definisi Formal — Vector Addition

Jika:

$$
\mathbf{u}
=
\begin{bmatrix}
u_1 \\
u_2 \\
\vdots \\
u_d
\end{bmatrix}
$$

 dan:

$$
\mathbf{v}
=
\begin{bmatrix}
v_1 \\
v_2 \\
\vdots \\
v_d
\end{bmatrix}
$$

keduanya berada di:

$$
\mathbb{R}^{d}
$$

maka vector addition didefinisikan component-wise sebagai:

$$
\mathbf{u}+\mathbf{v}
=
\begin{bmatrix}
u_1+v_1 \\
u_2+v_2 \\
\vdots \\
u_d+v_d
\end{bmatrix}
$$

Definisi component-wise ini adalah standard vector algebra. [R2][R3]

---

# 9. Notasi — Apa Arti Setiap Simbol?

Pada:

$$
\mathbf{u}+\mathbf{v}
$$

- $\mathbf{u}$ = vector pertama;
- $\mathbf{v}$ = vector kedua;
- $+$ = vector addition;
- output = vector baru.

Pada:

$$
u_j+v_j
$$

- $j$ = component position;
- $u_j$ = component ke-$j$ dari $\mathbf{u}$;
- $v_j$ = component ke-$j$ dari $\mathbf{v}$.

Jadi operation tidak dilakukan secara random.

Ia mengikuti matching index.

---

# 10. Math Reading Skill — Membaca Vector Addition

Baca:

$$
\mathbf{u}+\mathbf{v}
$$

sebagai:

> “Jumlah vector $\mathbf{u}$ dan vector $\mathbf{v}$, diperoleh dengan menjumlahkan matching components.”

Baca:

$$
(\mathbf{u}+\mathbf{v})_j
=
u_j+v_j
$$

sebagai:

> “Component ke-$j$ dari hasil penjumlahan sama dengan component ke-$j$ dari $\mathbf{u}$ ditambah component ke-$j$ dari $\mathbf{v}$.”

Ini adalah skill penting karena formula panjang nantinya dapat dipahami sebagai aturan per-component, bukan sekadar simbol.

---

# 11. Syarat Mathematical Compatibility

Untuk menjumlahkan dua vectors dengan aturan component-wise, keduanya harus mempunyai jumlah components yang sesuai.

Misalnya:

$$
\mathbf{u}\in\mathbb{R}^{2}
$$

sedangkan:

$$
\mathbf{v}\in\mathbb{R}^{3}
$$

Maka ekspresi:

$$
\mathbf{u}+\mathbf{v}
$$

**tidak terdefinisi sebagai ordinary component-wise vector addition** karena tidak ada pairing satu-ke-satu untuk semua components.

Contoh:

$$
\begin{bmatrix}
2 \\
5
\end{bmatrix}
+
\begin{bmatrix}
1 \\
4 \\
9
\end{bmatrix}
$$

Component ketiga pada vector kedua tidak mempunyai pasangan.

---

# 12. Tetapi Same Dimension Belum Cukup

Secara mathematical structure:

$$
\mathbf{a}\in\mathbb{R}^{2}
$$

$$
\mathbf{b}\in\mathbb{R}^{2}
$$

membuat component-wise addition possible.

Tetapi pada applied data representation kita perlu bertanya lagi:

> Apakah component positions mempunyai semantics yang compatible?

Contoh A:

$$
\mathbf{a}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Schema:

1. quiz ratio;
2. completion ratio.

Contoh B:

$$
\mathbf{b}
=
\begin{bmatrix}
45 \\
20
\end{bmatrix}
$$

Schema:

1. study duration in minutes;
2. age in years.

Secara arithmetic:

$$
\mathbf{a}+\mathbf{b}
=
\begin{bmatrix}
45.80 \\
20.75
\end{bmatrix}
$$

Tetapi bagaimana kita menamai component pertama $45.80$?

Apakah “quiz-ratio-minutes”?

Tidak ada semantics yang didefinisikan.

Jadi:

> **same dimension membuat operasi structurally possible, tetapi bukan jaminan bahwa operasi tersebut meaningful untuk application task.**

---

# 13. Worked Example 1 — Addition Step by Step

Diberikan:

$$
\mathbf{a}
=
\begin{bmatrix}
4 \\
-2 \\
3
\end{bmatrix}
$$

$$
\mathbf{b}
=
\begin{bmatrix}
1 \\
5 \\
-4
\end{bmatrix}
$$

## Step 1 — Check dimension

Keduanya memiliki tiga components:

$$
\mathbf{a},\mathbf{b}\in\mathbb{R}^{3}
$$

## Step 2 — Pair component 1

$$
4+1=5
$$

## Step 3 — Pair component 2

$$
-2+5=3
$$

## Step 4 — Pair component 3

$$
3+(-4)=-1
$$

## Step 5 — Build result vector

$$
\mathbf{a}+\mathbf{b}
=
\begin{bmatrix}
5 \\
3 \\
-1
\end{bmatrix}
$$

## Interpretation

Hasil memiliki dimension yang sama:

$$
3
$$

Karena penjumlahan dilakukan matching component-wise.

---

# 14. Geometric Intuition — Addition sebagai “Move, Lalu Move Lagi”

Pada vector 2D, addition dapat divisualisasikan menggunakan head-to-tail / triangle rule. OpenStax menjelaskan sum sebagai resultant dari menempatkan satu vector setelah vector lain. [R3]

Misalnya:

$$
\mathbf{u}
=
\begin{bmatrix}
2 \\
1
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
1 \\
2
\end{bmatrix}
$$

Maka:

$$
\mathbf{u}+\mathbf{v}
=
\begin{bmatrix}
3 \\
3
\end{bmatrix}
$$

Geometrically:

1. bergerak mengikuti $\mathbf{u}$;
2. dari ujungnya bergerak mengikuti $\mathbf{v}$;
3. resultant menghubungkan starting point ke final point.

Tetapi hati-hati:

> Pada HerAI, arrow hanyalah visual representation untuk membantu intuition. Ia bukan movement fisik participant.

---

# 15. Change One Thing — Kalau Satu Component Berubah?

Mulai dari:

$$
\mathbf{u}
=
\begin{bmatrix}
2 \\
5
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
3 \\
-1
\end{bmatrix}
$$

Hasil:

$$
\mathbf{u}+\mathbf{v}
=
\begin{bmatrix}
5 \\
4
\end{bmatrix}
$$

Sekarang ubah hanya component kedua $\mathbf{v}$:

$$
\mathbf{v}'
=
\begin{bmatrix}
3 \\
2
\end{bmatrix}
$$

Prediksi:

- apakah component pertama result berubah?
- apakah component kedua result berubah?

Hitung:

$$
\mathbf{u}+\mathbf{v}'
=
\begin{bmatrix}
2+3 \\
5+2
\end{bmatrix}
=
\begin{bmatrix}
5 \\
7
\end{bmatrix}
$$

Yang berubah hanya matching component.

Ini memperjelas sifat component-wise operation.

---

# 16. Vector Subtraction — Intuisi

Jika addition bertanya:

> “Apa hasil ketika matching components digabung dengan penjumlahan?”

maka subtraction bertanya:

> **“Apa signed difference pada setiap matching component?”**

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
5 \\
7
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
2 \\
4
\end{bmatrix}
$$

maka:

$$
\mathbf{u}-\mathbf{v}
=
\begin{bmatrix}
5-2 \\
7-4
\end{bmatrix}
=
\begin{bmatrix}
3 \\
3
\end{bmatrix}
$$

---

# 17. Definisi Formal — Vector Subtraction

Jika:

$$
\mathbf{u},\mathbf{v}\in\mathbb{R}^{d}
$$

maka:

$$
\mathbf{u}-\mathbf{v}
=
\begin{bmatrix}
u_1-v_1 \\
u_2-v_2 \\
\vdots \\
u_d-v_d
\end{bmatrix}
$$

Vector subtraction juga dapat dipahami sebagai:

$$
\mathbf{u}-\mathbf{v}
=
\mathbf{u}+(-1)\mathbf{v}
$$

Hubungan ini akan menjadi jelas setelah scalar multiplication.

---

# 18. Math Reading Skill — Membaca Difference Vector

Baca:

$$
\mathbf{u}-\mathbf{v}
$$

sebagai:

> “Vector perbedaan dari $\mathbf{v}$ menuju $\mathbf{u}$ dalam bentuk signed component-wise differences.”

Jangan langsung membaca sebagai:

> “jarak antara $\mathbf{u}$ dan $\mathbf{v}$.”

**Difference vector bukan distance.**

Distance akan membutuhkan konsep tambahan di Topic 04.

---

# 19. Worked Example 2 — HerAI Feature-Wise Difference

Canonical vectors:

Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Bima:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

Kita ingin membaca:

$$
\mathbf{x}^{(1)}-\mathbf{x}^{(2)}
$$

## Step 1 — Check schema

Keduanya memakai order:

1. quiz ratio;
2. completion ratio.

Jadi matching positions punya semantics yang sama.

## Step 2 — Quiz-ratio difference

$$
0.80-0.60=0.20
$$

## Step 3 — Completion-ratio difference

$$
0.75-0.625=0.125
$$

## Step 4 — Build difference vector

$$
\mathbf{x}^{(1)}-\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.20 \\
0.125
\end{bmatrix}
$$

## Interpretation

Pada toy dataset ini:

- Alya mempunyai quiz ratio $0.20$ lebih tinggi daripada Bima;
- Alya mempunyai completion ratio $0.125$ lebih tinggi daripada Bima.

Tetapi jangan menyimpulkan:

- Alya “$0.236$ lebih dekat/jauh”;
- Alya “lebih baik secara keseluruhan”;
- selisih tersebut causal;
- difference vector adalah probability.

Kita baru membaca **signed feature-wise differences**.

---

# 20. Direction Matters pada Subtraction

Perhatikan:

$$
\mathbf{x}^{(1)}-\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.20 \\
0.125
\end{bmatrix}
$$

Jika order subtraction dibalik:

$$
\mathbf{x}^{(2)}-\mathbf{x}^{(1)}
$$

maka:

$$
0.60-0.80=-0.20
$$

$$
0.625-0.75=-0.125
$$

sehingga:

$$
\mathbf{x}^{(2)}-\mathbf{x}^{(1)}
=
\begin{bmatrix}
-0.20 \\
-0.125
\end{bmatrix}
$$

Jadi:

$$
\mathbf{u}-\mathbf{v}
\neq
\mathbf{v}-\mathbf{u}
$$

secara umum.

Subtraction tidak commutative.

---

# 21. Misconception Check — Difference ≠ Distance

Diberikan:

$$
\mathbf{a}-\mathbf{b}
=
\begin{bmatrix}
0.20 \\
-0.30
\end{bmatrix}
$$

Apakah kita sudah memperoleh satu angka “distance”?

Tidak.

Kita punya vector dengan dua signed components.

Distance adalah konsep berbeda yang nantinya menghasilkan scalar measure of separation berdasarkan metric tertentu.

Topic 04 akan membangun kebutuhan itu setelah kita memahami norm.

---

# 22. Scalar Multiplication — Intuisi

Sekarang bukan dua vectors yang berinteraksi.

Kita punya:

- satu scalar $k$;
- satu vector $\mathbf{v}$.

Scalar multiplication berarti:

> **scalar yang sama mengalikan setiap component vector.**

Contoh:

$$
2
\begin{bmatrix}
3 \\
-1
\end{bmatrix}
$$

Component pertama:

$$
2(3)=6
$$

Component kedua:

$$
2(-1)=-2
$$

Maka:

$$
2
\begin{bmatrix}
3 \\
-1
\end{bmatrix}
=
\begin{bmatrix}
6 \\
-2
\end{bmatrix}
$$

---

# 23. Definisi Formal — Scalar Multiplication

Jika:

$$
k\in\mathbb{R}
$$

 dan:

$$
\mathbf{v}
=
\begin{bmatrix}
v_1 \\
v_2 \\
\vdots \\
v_d
\end{bmatrix}
\in\mathbb{R}^{d}
$$

maka:

$$
k\mathbf{v}
=
\begin{bmatrix}
kv_1 \\
kv_2 \\
\vdots \\
kv_d
\end{bmatrix}
$$

Ini adalah scalar multiplication standard. [R2][R3]

---

# 24. Notasi Scalar Multiplication

Pada:

$$
k\mathbf{v}
$$

- $k$ = scalar;
- $\mathbf{v}$ = vector;
- hasil = vector baru.

Jika:

$$
\mathbf{v}\in\mathbb{R}^{d}
$$

maka:

$$
k\mathbf{v}\in\mathbb{R}^{d}
$$

Scalar multiplication mengubah component values, bukan jumlah component slots.

Jadi dimension tetap sama.

---

# 25. Worked Example 3 — Positive Scalar

Diberikan:

$$
\mathbf{v}
=
\begin{bmatrix}
2 \\
-3 \\
4
\end{bmatrix}
$$

Hitung:

$$
3\mathbf{v}
$$

## Step 1 — Component 1

$$
3(2)=6
$$

## Step 2 — Component 2

$$
3(-3)=-9
$$

## Step 3 — Component 3

$$
3(4)=12
$$

## Step 4 — Build result

$$
3\mathbf{v}
=
\begin{bmatrix}
6 \\
-9 \\
12
\end{bmatrix}
$$

Dimension tetap:

$$
3
$$

---

# 26. Scalar Nol dan Zero Vector

Jika:

$$
k=0
$$

maka setiap component menjadi nol.

Untuk:

$$
\mathbf{v}
=
\begin{bmatrix}
2 \\
-3 \\
4
\end{bmatrix}
$$

kita punya:

$$
0\mathbf{v}
=
\begin{bmatrix}
0 \\
0 \\
0
\end{bmatrix}
$$

Vector yang semua components-nya nol disebut **zero vector**.

Kita dapat menuliskannya sebagai:

$$
\mathbf{0}
$$

Dengan context dimension yang jelas.

---

# 27. Negative Scalar

Jika scalar negatif, semua components dikalikan scalar negatif.

Diberikan:

$$
\mathbf{v}
=
\begin{bmatrix}
2 \\
-3
\end{bmatrix}
$$

maka:

$$
-1\mathbf{v}
=
\begin{bmatrix}
-2 \\
3
\end{bmatrix}
$$

Kita biasanya menulis:

$$
-\mathbf{v}
=
\begin{bmatrix}
-2 \\
3
\end{bmatrix}
$$

Pada geometric arrow interpretation, multiplying by a negative scalar reverses direction; OpenStax menjelaskan scalar multiplication dengan sign negatif menghasilkan direction yang opposite. [R3]

Dalam feature-vector semantics, jangan terlalu cepat menerjemahkan “direction” sebagai real-world behavioral direction. Tetap lihat arti tiap component.

---

# 28. Fractional Scalar

Diberikan:

$$
\mathbf{v}
=
\begin{bmatrix}
8 \\
4
\end{bmatrix}
$$

Hitung:

$$
0.5\mathbf{v}
$$

Component pertama:

$$
0.5(8)=4
$$

Component kedua:

$$
0.5(4)=2
$$

Maka:

$$
0.5\mathbf{v}
=
\begin{bmatrix}
4 \\
2
\end{bmatrix}
$$

---

# 29. Common Misconception — Scalar Multiplication ≠ Scalar Addition

Jangan salah baca:

$$
2\mathbf{v}
$$

sebagai:

> “tambahkan $2$ ke setiap component.”

Jika:

$$
\mathbf{v}
=
\begin{bmatrix}
3 \\
5
\end{bmatrix}
$$

maka:

$$
2\mathbf{v}
=
\begin{bmatrix}
6 \\
10
\end{bmatrix}
$$

bukan:

$$
\begin{bmatrix}
5 \\
7
\end{bmatrix}
$$

---

# 30. Scalar Multiplication pada HerAI — Mathematical vs Semantic Validity

Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Secara matematika:

$$
2\mathbf{x}^{(1)}
=
\begin{bmatrix}
1.60 \\
1.50
\end{bmatrix}
$$

Perhitungan benar.

Tetapi jika kedua components didefinisikan sebagai ratios pada $[0,1]$, maka:

$$
1.60>1
$$

$$
1.50>1
$$

Jadi result tidak lagi valid sebagai ordinary quiz/completion ratios untuk satu participant.

Ini bukan berarti scalar multiplication salah.

Artinya:

> **mathematical operation dan application-domain validity adalah dua pertanyaan berbeda.**

---

# 31. Jadi Kapan Scalar Multiplication Berguna?

Di aplikasi matematika dan AI, scalar multiplication dipakai ketika kita ingin rescale atau memberi coefficient pada seluruh vector.

Contoh abstract:

$$
0.5\mathbf{v}
$$

berarti semua components menerima factor yang sama.

Dalam machine learning, banyak mathematical pipelines menggabungkan scaling dan addition terhadap numerical representations. Kita belum masuk ke parameter learning atau dot product, tetapi operasi dasar ini adalah building block penting sebelum konsep tersebut. [R1][R4]

Kita harus tetap membedakan:

- mathematical coefficient;
- real-world causal effect;
- probability;
- model confidence.

Scalar $0.5$ tidak otomatis berarti “confidence 50%”.

---

# 32. Subtraction sebagai Addition of a Negative Vector

Sekarang kita dapat memahami:

$$
\mathbf{u}-\mathbf{v}
$$

sebagai:

$$
\mathbf{u}+(-\mathbf{v})
$$

Contoh:

$$
\mathbf{u}
=
\begin{bmatrix}
5 \\
7
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
2 \\
4
\end{bmatrix}
$$

Pertama:

$$
-\mathbf{v}
=
\begin{bmatrix}
-2 \\
-4
\end{bmatrix}
$$

Lalu:

$$
\mathbf{u}+(-\mathbf{v})
=
\begin{bmatrix}
5+(-2) \\
7+(-4)
\end{bmatrix}
$$

$$
=
\begin{bmatrix}
3 \\
3
\end{bmatrix}
$$

Sama dengan:

$$
\mathbf{u}-\mathbf{v}
$$

---

# 33. Properties yang Perlu Dikenal — Tanpa Proof Formal

Kita tidak masuk abstract vector-space proofs.

Tetapi beberapa pattern sangat berguna untuk dibaca.

## 33.1 Commutative addition

$$
\mathbf{u}+\mathbf{v}
=
\mathbf{v}+\mathbf{u}
$$

## 33.2 Associative addition

$$
(\mathbf{u}+\mathbf{v})+\mathbf{w}
=
\mathbf{u}+(\mathbf{v}+\mathbf{w})
$$

## 33.3 Zero vector

$$
\mathbf{v}+\mathbf{0}
=
\mathbf{v}
$$

## 33.4 Additive inverse

$$
\mathbf{v}+(-\mathbf{v})
=
\mathbf{0}
$$

## 33.5 Distributive scalar multiplication

$$
k(\mathbf{u}+\mathbf{v})
=
k\mathbf{u}+k\mathbf{v}
$$

OpenStax dan standard vector algebra references mencatat sifat-sifat addition/scalar multiplication ini. [R2][R3]

Kita hanya mengenal pattern-nya sekarang; proofs formal tidak diperlukan untuk tujuan course ini.

---

# 34. Worked Example 4 — Distributive Check dengan Angka Kecil

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
1 \\
2
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
3 \\
4
\end{bmatrix}
$$

$$
k=2
$$

Kita cek sisi kiri.

## Step 1 — Add vectors

$$
\mathbf{u}+\mathbf{v}
=
\begin{bmatrix}
1+3 \\
2+4
\end{bmatrix}
=
\begin{bmatrix}
4 \\
6
\end{bmatrix}
$$

## Step 2 — Multiply by scalar

$$
2(\mathbf{u}+\mathbf{v})
=
2
\begin{bmatrix}
4 \\
6
\end{bmatrix}
=
\begin{bmatrix}
8 \\
12
\end{bmatrix}
$$

Sekarang sisi kanan.

## Step 3 — Scale each vector

$$
2\mathbf{u}
=
\begin{bmatrix}
2 \\
4
\end{bmatrix}
$$

$$
2\mathbf{v}
=
\begin{bmatrix}
6 \\
8
\end{bmatrix}
$$

## Step 4 — Add results

$$
2\mathbf{u}+2\mathbf{v}
=
\begin{bmatrix}
8 \\
12
\end{bmatrix}
$$

Kedua route menghasilkan vector yang sama.

---

# 35. Linear Combination — Preview Ringan

Karena kita sudah mengenal:

- scalar multiplication;
- vector addition;

kita sekarang dapat membaca expression seperti:

$$
a\mathbf{u}+b\mathbf{v}
$$

Ini disebut **linear combination** dari $\mathbf{u}$ dan $\mathbf{v}$ dengan scalars $a$ dan $b$. [R1][R2]

Pada Topic 03 kita hanya perlu mampu membaca struktur:

1. scale $\mathbf{u}$ dengan $a$;
2. scale $\mathbf{v}$ dengan $b$;
3. jumlahkan results.

Kita **belum** masuk:

- span;
- basis;
- independence;
- matrix transformation.

---

# 36. Worked Example 5 — Linear Combination Preview

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
1 \\
2
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
3 \\
-1
\end{bmatrix}
$$

Hitung:

$$
2\mathbf{u}+0.5\mathbf{v}
$$

## Step 1 — Scale $\mathbf{u}$

$$
2\mathbf{u}
=
\begin{bmatrix}
2 \\
4
\end{bmatrix}
$$

## Step 2 — Scale $\mathbf{v}$

$$
0.5\mathbf{v}
=
\begin{bmatrix}
1.5 \\
-0.5
\end{bmatrix}
$$

## Step 3 — Add

$$
2\mathbf{u}+0.5\mathbf{v}
=
\begin{bmatrix}
2+1.5 \\
4+(-0.5)
\end{bmatrix}
$$

$$
=
\begin{bmatrix}
3.5 \\
3.5
\end{bmatrix}
$$

Interpretasi saat ini hanya mathematical:

> expression tersebut membentuk vector baru dari scaled versions dua vectors.

Tidak ada claim probability atau causal meaning.

---

# 37. HerAI Running Case — Empat Participant Vectors

Canonical dataset tetap:

| $i$ | Participant | quiz ratio $q$ | completion ratio $c$ |
|---:|---|---:|---:|
| 1 | Alya | $0.80$ | $0.75$ |
| 2 | Bima | $0.60$ | $0.625$ |
| 3 | Citra | $0.90$ | $1.00$ |
| 4 | Dewi | $0.70$ | $0.50$ |

Feature order:

1. quiz ratio;
2. completion ratio.

Sehingga:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

$$
\mathbf{x}^{(3)}
=
\begin{bmatrix}
0.90 \\
1.00
\end{bmatrix}
$$

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70 \\
0.50
\end{bmatrix}
$$

Tidak ada dataset reset.

---

# 38. HerAI Comparison 1 — Citra vs Dewi

Hitung:

$$
\mathbf{x}^{(3)}-\mathbf{x}^{(4)}
$$

## Quiz component

$$
0.90-0.70=0.20
$$

## Completion component

$$
1.00-0.50=0.50
$$

Maka:

$$
\mathbf{x}^{(3)}-\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.20 \\
0.50
\end{bmatrix}
$$

Interpretasi:

- Citra quiz ratio $0.20$ lebih tinggi daripada Dewi;
- Citra completion ratio $0.50$ lebih tinggi daripada Dewi.

Tidak lebih dari itu.

---

# 39. HerAI Comparison 2 — Dewi vs Citra

Balik urutan:

$$
\mathbf{x}^{(4)}-\mathbf{x}^{(3)}
$$

$$
=
\begin{bmatrix}
0.70-0.90 \\
0.50-1.00
\end{bmatrix}
$$

$$
=
\begin{bmatrix}
-0.20 \\
-0.50
\end{bmatrix}
$$

Negative sign bukan error.

Ia memberi direction of comparison.

---

# 40. HerAI Addition — Valid Computation, Questionable Participant Semantics

Citra + Dewi:

$$
\mathbf{x}^{(3)}+\mathbf{x}^{(4)}
$$

$$
=
\begin{bmatrix}
0.90+0.70 \\
1.00+0.50
\end{bmatrix}
$$

$$
=
\begin{bmatrix}
1.60 \\
1.50
\end{bmatrix}
$$

Mathematically valid.

Tetapi jika kita menamai output sebagai “participant vector baru dengan quiz/completion ratios,” semantics rusak karena values keluar dari expected ratio domain.

Jadi output lebih aman disebut:

> **mathematical sum of two participant feature vectors**

bukan:

> **new participant representation**

kecuali application definition secara eksplisit memberi makna pada operation tersebut.

---

# 41. Feature Order Failure saat Operation

Misalnya Bima seharusnya:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

Schema:

1. quiz;
2. completion.

Tetapi pipeline rusak menghasilkan:

$$
\tilde{\mathbf{x}}^{(2)}
=
\begin{bmatrix}
0.625 \\
0.60
\end{bmatrix}
$$

Kemudian kita hitung:

$$
\mathbf{x}^{(1)}-\tilde{\mathbf{x}}^{(2)}
$$

Component pertama:

$$
0.80-0.625=0.175
$$

Tetapi sekarang kita sebenarnya membandingkan:

> quiz Alya dengan completion Bima.

Arithmetic scanner mungkin tidak melihat error.

Semantic schema audit yang harus menemukannya.

---

# 42. Scale/Unit Safety — Study Duration Belum Boleh Dicampur Sembarangan

Jika kita memperluas representation menjadi:

$$
\mathbf{z}^{(i)}
=
\begin{bmatrix}
q^{(i)} \\
c^{(i)} \\
t^{(i)}
\end{bmatrix}
$$

Dengan:

- $q$ = quiz ratio;
- $c$ = completion ratio;
- $t$ = study duration dalam minutes.

Secara structure ini vector tiga dimensi.

Tetapi values memiliki scale yang sangat berbeda:

- ratio sekitar $0$–$1$;
- study duration bisa puluhan menit.

Untuk addition/subtraction pada matching participant records, arithmetic tetap component-wise.

Namun interpretation harus mempertahankan unit:

$$
\Delta t=15
$$

berarti $15$ minutes, bukan $15$ ratio units.

Dan kita belum boleh menggunakan raw mixed-scale vector tersebut untuk menyimpulkan “kedekatan” sebelum membahas scale effect dan distance di Topic 04.

Google ML juga menekankan bahwa numerical features dengan range berbeda memerlukan perhatian pada representation/scaling dalam model pipelines. [R5]

---

# 43. Common Misconception 1 — “Semua Vector dengan Dimension Sama Bisa Dijumlahkan Secara Meaningful”

**Common misconception**

> “Kalau sama-sama $\mathbb{R}^{2}$, pasti aman dijumlahkan.”

**Correction**

Secara mathematical structure, component-wise addition defined.

Tetapi meaningful applied interpretation juga memerlukan:

- same feature semantics;
- same feature order;
- compatible units/scale interpretation;
- application definition untuk output.

---

# 44. Common Misconception 2 — “Difference Vector adalah Distance”

**Common misconception**

> “$\mathbf{u}-\mathbf{v}$ sudah merupakan distance.”

**Correction**

$\mathbf{u}-\mathbf{v}$ adalah vector.

Distance biasanya berupa scalar yang dibangun menggunakan metric tertentu.

Distance belum diajarkan pada Topic 03.

---

# 45. Common Misconception 3 — “Scalar $0.5$ Berarti Probability 50%”

**Common misconception**

> “Kalau kita menghitung $0.5\mathbf{x}$, berarti confidence/probability-nya 50%.”

**Correction**

$0.5$ pada scalar multiplication hanya multiplication factor pada mathematical expression.

Semantics probability membutuhkan definition/model probability yang terpisah.

---

# 46. Common Misconception 4 — “$2\mathbf{x}$ Menggandakan Dimension”

**Common misconception**

> “Kalau vector dikali 2, dimension-nya jadi dua kali.”

**Correction**

Scalar multiplication mengubah values, bukan number of component slots.

Jika:

$$
\mathbf{x}\in\mathbb{R}^{d}
$$

maka:

$$
2\mathbf{x}\in\mathbb{R}^{d}
$$

---

# 47. Common Misconception 5 — “Vector Addition Menjumlahkan Semua Entries Menjadi Satu”

**Common misconception**

Untuk:

$$
\begin{bmatrix}
1 \\
2
\end{bmatrix}
+
\begin{bmatrix}
3 \\
4
\end{bmatrix}
$$

peserta menulis:

$$
1+2+3+4=10
$$

**Correction**

Vector addition menghasilkan vector:

$$
\begin{bmatrix}
1+3 \\
2+4
\end{bmatrix}
=
\begin{bmatrix}
4 \\
6
\end{bmatrix}
$$

---

# 48. Common Misconception 6 — “Participant Sum adalah Participant Baru”

**Common misconception**

> “Jika Alya + Bima bisa dihitung, hasilnya adalah participant gabungan yang valid.”

**Correction**

Vector addition menghasilkan mathematical vector.

Apakah result merupakan valid application object bergantung pada semantic definition dan domain constraints.

Representation bukan real-world participant itu sendiri.

---

# 49. AI/ML Connection — Kenapa Vector Operations Penting?

Machine learning models menerima numerical representations dalam bentuk feature vectors. [R4]

Vector addition dan scalar multiplication adalah building blocks untuk banyak computations yang kemudian muncul sebagai:

- weighted combinations;
- updates;
- aggregation;
- transformations;
- linear-model computations;
- neural-network internal operations.

Namun Topic 03 tidak mengajarkan implementasi seluruh hal tersebut.

Yang perlu dipahami sekarang:

> **sebelum formula AI menjadi kompleks, banyak bagiannya tetap kembali ke operasi sederhana pada matching vector components.**

Kita juga harus membawa safety dari Submodule 01:

- coefficient ≠ causality;
- score ≠ probability;
- mathematically valid computation ≠ validated production model.

---

# 50. Predict → Calculate → Interpret Pattern

Gunakan pattern ini untuk setiap vector operation.

## Step A — Predict

Apa arah perubahan yang diharapkan?

## Step B — Check compatibility

- dimension cocok?
- schema sama?
- order sama?
- units meaningful?

## Step C — Calculate component-wise

Tunjukkan setiap component.

## Step D — Interpret

Apa arti result?

## Step E — Safety check

Apakah result tetap dalam valid application domain?

Pattern ini akan sangat berguna pada topics berikutnya.

---

# 51. Try It Yourself 1 — Addition

Diberikan:

$$
\mathbf{a}
=
\begin{bmatrix}
-2 \\
4 \\
1
\end{bmatrix}
$$

$$
\mathbf{b}
=
\begin{bmatrix}
5 \\
-3 \\
2
\end{bmatrix}
$$

Hitung:

$$
\mathbf{a}+\mathbf{b}
$$

Sebelum menghitung, prediksi sign setiap output component.

**Target:**

$$
\begin{bmatrix}
3 \\
1 \\
3
\end{bmatrix}
$$

---

# 52. Try It Yourself 2 — Subtraction

Gunakan HerAI:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70 \\
0.50
\end{bmatrix}
$$

Hitung:

$$
\mathbf{x}^{(1)}-\mathbf{x}^{(4)}
$$

Lalu interpretasikan **setiap component**, bukan hanya result vector.

**Target:**

$$
\begin{bmatrix}
0.10 \\
0.25
\end{bmatrix}
$$

---

# 53. Try It Yourself 3 — Scalar Multiplication

Diberikan:

$$
\mathbf{v}
=
\begin{bmatrix}
6 \\
-2
\end{bmatrix}
$$

Hitung:

$$
-0.5\mathbf{v}
$$

**Target:**

$$
\begin{bmatrix}
-3 \\
1
\end{bmatrix}
$$

---

# 54. Try It Yourself 4 — Semantic Compatibility

Vector A:

$$
\mathbf{a}
=
\begin{bmatrix}
0.9 \\
0.8
\end{bmatrix}
$$

Schema A:

1. quiz ratio;
2. completion ratio.

Vector B:

$$
\mathbf{b}
=
\begin{bmatrix}
0.6 \\
0.7
\end{bmatrix}
$$

Schema B:

1. completion ratio;
2. quiz ratio.

Pertanyaan:

1. apakah dimensions match?
2. apakah raw arithmetic addition bisa dilakukan?
3. apakah interpretation aman tanpa memperbaiki order?
4. apa yang harus dilakukan sebelum operation?

---

# 55. Misconception Challenge — Audit Lima Pernyataan

Nilai setiap statement sebagai **Benar**, **Salah**, atau **Butuh konteks tambahan**.

### Statement A

> Dua vector di $\mathbb{R}^{2}$ pasti mempunyai feature semantics yang sama.

### Statement B

> Vector addition dilakukan matching component-wise.

### Statement C

> $\mathbf{u}-\mathbf{v}$ otomatis menghasilkan distance.

### Statement D

> $k\mathbf{v}$ mempertahankan dimension $\mathbf{v}$.

### Statement E

> Jika vector operation secara arithmetic benar, result pasti valid untuk application domain.

## Expected reasoning

- A: Salah;
- B: Benar;
- C: Salah;
- D: Benar;
- E: Salah.

---

# 56. [INTERACTIVE VISUAL] Component-Wise Addition Builder

**Learning purpose:** memperlihatkan bahwa addition memasangkan component dengan position yang sama.

**Initial state/data:**

$$
\mathbf{u}
=
\begin{bmatrix}
2 \\
5
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
3 \\
-1
\end{bmatrix}
$$

**Learner action:** ubah empat component values melalui sliders/input fields.

**Expected behavior:**

- garis/highlight menghubungkan $u_1$ dengan $v_1$;
- garis/highlight menghubungkan $u_2$ dengan $v_2$;
- result update real-time;
- output tetap vector 2D.

**Feedback:** jika learner mencoba “sum all numbers,” tampilkan pesan:

> “Vector addition preserves component positions.”

**Safety note:** visual generic; belum memberi semantic claim HerAI.

---

# 57. [COMPARE VIEW] Same Dimension vs Same Schema

**Learning purpose:** membedakan mathematical structural compatibility dan semantic compatibility.

**Left panel:**

Vector A schema:

1. quiz ratio;
2. completion ratio.

Vector B schema:

1. quiz ratio;
2. completion ratio.

Label:

> “Structure + semantics aligned.”

**Right panel:**

Vector A:

1. quiz ratio;
2. completion ratio.

Vector C:

1. study minutes;
2. age years.

Label:

> “Same dimension, different semantics.”

**Learner action:** klik “Can I calculate?” dan “Can I interpret?” secara terpisah.

**Expected behavior:** tool membedakan arithmetic possibility dari semantic validity.

---

# 58. [INTERACTIVE VISUAL] Arrow Addition — Head to Tail

**Learning purpose:** memberi geometric intuition untuk 2D vector addition.

**Initial state:**

$$
\mathbf{u}
=
\begin{bmatrix}
2 \\
1
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
1 \\
2
\end{bmatrix}
$$

**Learner action:** drag vector components atau sliders.

**Expected behavior:**

- first arrow dari origin;
- second arrow ditempatkan head-to-tail;
- resultant update;
- component equation ditampilkan bersamaan.

**Safety note:** arrow is mathematical visualization, not participant physical movement.

---

# 59. [NUMBER MANIPULATOR] Scalar Multiplier

**Learning purpose:** menunjukkan satu scalar mengalikan semua components tanpa mengubah dimension.

**Initial vector:**

$$
\mathbf{v}
=
\begin{bmatrix}
2 \\
-1
\end{bmatrix}
$$

**Scalar slider:** dari $-3$ sampai $3$.

**Expected behavior:**

- components update;
- dimension label tetap $d=2$;
- saat $k=0$, result menjadi zero vector;
- saat $k<0$, arrow visual flips direction.

**Feedback:**

> “Values changed. Number of components did not.”

---

# 60. [STEP-BY-STEP REVEAL] HerAI Difference Audit

**Learning purpose:** menghubungkan subtraction dengan feature-wise interpretation.

**Initial:** Alya dan Bima vectors.

Reveal stages:

1. validate schema;
2. highlight quiz components;
3. compute quiz difference;
4. highlight completion components;
5. compute completion difference;
6. reveal result vector;
7. reveal safe natural-language interpretation;
8. reject “distance” label.

**Safety note:** signed difference ≠ distance and ≠ overall quality score.

---

# 61. Checkpoint 1 — Addition

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
1 \\
4
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
2 \\
3
\end{bmatrix}
$$

Apa:

$$
\mathbf{u}+\mathbf{v}
$$

?

**Jawaban:**

$$
\begin{bmatrix}
3 \\
7
\end{bmatrix}
$$

---

# 62. Checkpoint 2 — Subtraction

Apa:

$$
\begin{bmatrix}
5 \\
2
\end{bmatrix}
-
\begin{bmatrix}
3 \\
7
\end{bmatrix}
$$

?

**Jawaban:**

$$
\begin{bmatrix}
2 \\
-5
\end{bmatrix}
$$

---

# 63. Checkpoint 3 — Scalar Multiplication

Jika:

$$
\mathbf{v}
=
\begin{bmatrix}
4 \\
-6
\end{bmatrix}
$$

maka:

$$
0.5\mathbf{v}=?
$$

**Jawaban:**

$$
\begin{bmatrix}
2 \\
-3
\end{bmatrix}
$$

---

# 64. Checkpoint 4 — Dimension

Jika:

$$
\mathbf{v}\in\mathbb{R}^{5}
$$

maka dimension dari:

$$
-3\mathbf{v}
$$

adalah?

**Jawaban:**

$$
5
$$

---

# 65. Checkpoint 5 — Semantic Safety

Dua vectors sama-sama dimension $2$.

Apakah itu cukup untuk menjamin addition mereka meaningful sebagai feature representation?

**Jawaban:** Tidak.

Kita juga perlu schema/semantics/order yang compatible.

---

# 66. Checkpoint 6 — Difference vs Distance

Apakah:

$$
\mathbf{x}^{(1)}-\mathbf{x}^{(2)}
$$

sudah merupakan distance?

**Jawaban:** Tidak.

Itu difference vector.

---

# 67. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan vector addition sebagai component-wise operation.
- [ ] **I can** menghitung $\mathbf{u}+\mathbf{v}$ langkah demi langkah.
- [ ] **I can** mengecek dimension compatibility sebelum addition/subtraction.
- [ ] **I can** menjelaskan mengapa same dimension belum menjamin same semantics.
- [ ] **I can** menghitung vector subtraction.
- [ ] **I can** membaca sign pada difference vector sebagai direction of comparison per component.
- [ ] **I can** menjelaskan bahwa difference vector bukan distance.
- [ ] **I can** menghitung scalar multiplication.
- [ ] **I can** menjelaskan bahwa scalar multiplication tidak mengubah dimension.
- [ ] **I can** mengenali zero vector dari $0\mathbf{v}$.
- [ ] **I can** membedakan scalar multiplication dari scalar addition.
- [ ] **I can** menjaga feature order selama vector operations.
- [ ] **I can** menemukan semantic error ketika schema positions tidak match.
- [ ] **I can** menjelaskan mengapa arithmetic-valid result dapat invalid untuk application domain.
- [ ] **I can** menggunakan subtraction untuk membaca HerAI feature-wise differences secara aman.
- [ ] **I can** membaca expression sederhana $a\mathbf{u}+b\mathbf{v}$ sebagai scaled vectors yang dijumlahkan.
- [ ] **I can** menolak probability/causality claims yang tidak didefinisikan oleh operasi vector.

Jika lebih dari tiga kotak belum yakin, ulangi Worked Examples, Misconception Challenge, dan Try It Yourself.

---

# 68. Why This Matters Later

Topic 03 memberi kita kemampuan untuk menghasilkan **difference vector**.

Misalnya:

$$
\mathbf{x}^{(1)}-\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.20 \\
0.125
\end{bmatrix}
$$

Sekarang muncul pertanyaan baru:

> Bagaimana merangkum “besar” sebuah vector menjadi satu scalar?

Dan:

> Bagaimana mengubah difference vector menjadi ukuran separation/kedekatan?

Untuk menjawabnya kita butuh konsep berikutnya:

- magnitude / norm;
- distance.

Tetapi sebelum itu, ingat:

> difference vector menyimpan arah dan component-wise differences; distance akan menjadi konsep berbeda.

---

# 69. Summary

Pada Topic 03 kita mempelajari tiga operasi dasar.

## Vector addition

$$
\mathbf{u}+\mathbf{v}
=
\begin{bmatrix}
u_1+v_1 \\
\vdots \\
u_d+v_d
\end{bmatrix}
$$

## Vector subtraction

$$
\mathbf{u}-\mathbf{v}
=
\begin{bmatrix}
u_1-v_1 \\
\vdots \\
u_d-v_d
\end{bmatrix}
$$

## Scalar multiplication

$$
k\mathbf{v}
=
\begin{bmatrix}
kv_1 \\
\vdots \\
kv_d
\end{bmatrix}
$$

Key safety rules:

1. operations are component-wise;
2. addition/subtraction need matching dimension mathematically;
3. meaningful application interpretation also needs matching semantics/schema/order;
4. difference vector ≠ distance;
5. scalar multiplication changes values, not dimension;
6. scalar factor ≠ probability/confidence;
7. mathematically valid result can violate application-domain constraints;
8. vector sum of participants ≠ automatically valid new participant representation;
9. units/scales remain important when features are mixed;
10. representation semantics must survive the operation.

---

# 70. Bridge ke Topic 04

Sekarang kita bisa menghitung:

$$
\mathbf{d}
=
\mathbf{x}^{(A)}-\mathbf{x}^{(B)}
$$

Tetapi $\mathbf{d}$ masih sebuah vector.

Jika HerAI ingin bertanya:

> “Seberapa besar perbedaan kedua representations?”

kita membutuhkan cara mengukur **size/magnitude** dari sebuah vector.

Setelah itu barulah kita dapat membangun distance secara terkontrol.

Itulah fokus:

> **Topic 04 — Magnitude/Norm dan Distance: Mengukur Besar dan Kedekatan.**

---

# 71. References

## [R1] Boyd & Vandenberghe — *Introduction to Applied Linear Algebra: Vectors, Matrices, and Least Squares*

**Institution:** Stanford University / UCLA.  
**Concept supported:** vector arithmetic, scalar multiplication, linear combinations, applied interpretation of vectors.  
**URL:** https://stanford.edu/~boyd/vmls/

## [R2] MIT OpenCourseWare — Linear Algebra / Vector Addition Foundations

**Institution:** Massachusetts Institute of Technology.  
**Concept supported:** addition and multiplication as foundational Linear Algebra operations; vector addition learning resources.  
**URL:** https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/syllabus/  
**Supplement:** https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/resources/mit18_02sc_we_1_comb/

## [R3] OpenStax — *Algebra and Trigonometry 2e*, Section 10.8: Vectors

**Concept supported:** vector addition, subtraction, scalar multiplication, component-wise operations, geometric head-to-tail interpretation.  
**URL:** https://openstax.org/books/algebra-and-trigonometry-2e/pages/10-8-vectors

## [R4] Google for Developers — Machine Learning Crash Course: How a model ingests data using feature vectors

**Concept supported:** feature vectors as numerical representation of one example and model-facing representation.  
**URL:** https://developers.google.com/machine-learning/crash-course/numerical-data/feature-vectors

## [R5] Google for Developers — Numerical Data: Qualities of Good Numerical Features / Normalization

**Concept supported:** feature semantics should be clear; numerical ranges/scales require attention in ML representation pipelines.  
**URL:** https://developers.google.com/machine-learning/crash-course/numerical-data/qualities-of-good-numerical-features  
**Scale reference:** https://developers.google.com/machine-learning/crash-course/numerical-data/normalization

## [R6] Deisenroth, Faisal, Ong — *Mathematics for Machine Learning*

**Publisher:** Cambridge University Press.  
**Concept supported:** Linear Algebra foundations for ML and operations on vectors as prerequisite mathematical language.  
**URL:** https://mml-book.github.io/

## [R7] OpenStax — *Calculus Volume 3*, Vectors in the Plane / Three Dimensions

**Concept supported:** scalar multiplication, addition/subtraction, vector-operation properties and geometric interpretation.  
**URL:** https://openstax.org/books/calculus-volume-3/pages/2-1-vectors-in-the-plane  
**3D summary:** https://openstax.org/books/calculus-volume-3/pages/2-2-vectors-in-three-dimensions

## [R8] KaTeX — Supported Functions

**Concept supported:** source-level support for the matrix/vector notation used in this topic.  
**URL:** https://katex.org/docs/supported.html

---

# 72. QA Notes

## Academic QA

- Vector addition defined component-wise.
- Vector subtraction defined component-wise and related to addition of a negative vector.
- Scalar multiplication applies one scalar to every component.
- Dimension compatibility is required for ordinary component-wise addition/subtraction.
- Same dimension is not equated with same semantic schema.
- Feature order remains part of the data contract.
- Difference vector is explicitly separated from distance.
- Scalar multiplication does not change dimension.
- Zero vector introduced only as basic operation result.
- Linear combination introduced only as a light preview from addition + scalar multiplication; span/basis/independence are deferred.
- Addition/scalar multiplication properties introduced without abstract proofs.
- Participant-vector addition is not labeled as valid participant synthesis.
- Result outside ratio domain is used to teach mathematical vs application validity.
- No probability, norm, distance, dot product, cosine similarity, matrix, gradient, or optimization formula is taught.

## Mathematical QA

Canonical HerAI difference checks:

$$
0.80-0.60=0.20
$$

$$
0.75-0.625=0.125
$$

$$
0.90-0.70=0.20
$$

$$
1.00-0.50=0.50
$$

Canonical addition warning:

$$
0.90+0.70=1.60
$$

$$
1.00+0.50=1.50
$$

All are arithmetically correct.

## Notation QA

- scalar: non-bold $k,a,b$;
- vector: bold lowercase $\mathbf{u},\mathbf{v},\mathbf{x}$;
- observation vector: $\mathbf{x}^{(i)}$;
- zero vector: $\mathbf{0}$;
- no matrix notation used as a teaching object.

## Dependency QA

Topic 03 assumes Topic 02 established:

- components;
- dimension;
- schema;
- feature order;
- shape/orientation awareness.

Topic 03 prepares Topic 04 using difference vectors but does not teach norm/distance.

## Markdown + KaTeX Source QA

- Inline math uses `$...$`.
- Display math uses `$$...$$`.
- Formulae are not placed in fenced code blocks.
- No equation images.
- Basic commands are expected KaTeX-safe [R8].
- Browser-level KaTeX rendering is **not claimed PASS** until frontend runtime test.

---

# STOP CHECKPOINT

**Topic 03 selesai pada batas vector addition → vector subtraction → scalar multiplication → lightweight linear-combination preview. Topic 04 belum diproduksi.**

> **Apakah Topic 03 Submodule 02 disetujui dan kita boleh melanjutkan ke Topic 04 — Magnitude/Norm dan Distance?**
