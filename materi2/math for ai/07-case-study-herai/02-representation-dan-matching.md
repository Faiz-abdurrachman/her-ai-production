# Topic 02 — Representation dan Matching
## Submodule 07 — Integrated Case Study: Math for AI di HerAI

> **Status kasus:** Topic ini melanjutkan **canonical mini-dataset Topic 01**. Participant profile dan material profile tetap **SINTETIK / PEDAGOGIS / INSTRUKSIONAL**. Matching yang dihitung di sini adalah **matching signal**, bukan probability, bukan educational outcome, dan bukan production HerAI recommendation rule.

---

# 1. HOOK / REAL PROBLEM — Dari data contract ke pertanyaan “mana yang lebih selaras?”

Pada Topic 01 kita belum memilih materi apa pun. Kita hanya memastikan bahwa object, feature, provenance, dan semantic type setiap quantity sudah jelas.

Sekarang kita punya empat participant profile dan empat candidate-material profile pada **shared feature axes** yang sama:

1. AI;
2. Python;
3. Math;
4. UI/UX.

Pertanyaan berikutnya adalah:

> **Bagaimana kita mengukur alignment antara participant profile dan candidate-material profile secara konsisten?**

Perhatikan kata **alignment**.

Kita belum bertanya:

- materi mana yang pasti membuat learner lebih pintar;
- materi mana yang pasti meningkatkan nilai;
- materi mana yang mempunyai probability sukses tertinggi;
- materi mana yang merupakan production recommendation terbaik.

Topic 02 hanya membangun **representation → matching score**.

---

# 2. Learning Outcomes

Setelah menyelesaikan Topic 02, peserta mampu:

1. menuliskan participant dan material sebagai vector pada shared feature space yang konsisten;
2. memeriksa dimension dan feature order sebelum melakukan operasi vector;
3. menghitung Euclidean norm pada vector kecil;
4. menghitung dot product participant–material secara manual;
5. menjelaskan pengaruh magnitude terhadap raw dot product;
6. menghitung cosine similarity dengan benar;
7. membedakan raw dot product, cosine similarity, dan Euclidean distance;
8. meranking candidate materials menggunakan **canonical cosine matching score**;
9. mendiagnosis kasus ketika dua metrics memberi ranking berbeda;
10. menjelaskan mengapa highest similarity tetap **bukan** automatic best educational recommendation.

---

# 3. PREDICT — Citra harus mendapat Intro AI atau Matematika Dasar?

Canonical synthetic profile Citra:

$$
\mathbf{x}_{\mathrm{Citra}}
=
\begin{bmatrix}
0.90\\
0.40\\
0.80\\
0.20
\end{bmatrix}.
$$

Dua candidate material:

$$
\mathbf{v}_{\mathrm{IntroAI}}
=
\begin{bmatrix}
1.00\\
0.60\\
0.30\\
0.20
\end{bmatrix},
\qquad
\mathbf{v}_{\mathrm{Math}}
=
\begin{bmatrix}
0.50\\
0.10\\
1.00\\
0.20
\end{bmatrix}.
$$

Tanpa menghitung, coba prediksi:

> Manakah yang lebih aligned dengan profile Citra?

Jawaban yang baik bukan sekadar menebak nama materi. Kita akan melihat bahwa **metric choice dapat mengubah ranking**.

---

# 4. REACTIVATE ONLY WHAT IS NEEDED

## 4.1 Vector

Sebuah feature vector menyimpan beberapa feature dalam urutan yang disepakati.

Canonical participant vector:

$$
\mathbf{x}_p
=
\begin{bmatrix}
x_{\mathrm{AI}}\\
x_{\mathrm{Python}}\\
x_{\mathrm{Math}}\\
x_{\mathrm{UIUX}}
\end{bmatrix}.
$$

Canonical material vector:

$$
\mathbf{v}_m
=
\begin{bmatrix}
v_{\mathrm{AI}}\\
v_{\mathrm{Python}}\\
v_{\mathrm{Math}}\\
v_{\mathrm{UIUX}}
\end{bmatrix}.
$$

Keduanya berdimensi:

$$
d=4.
$$

## 4.2 Feature order adalah bagian dari contract

Vector berikut:

$$
[0.8,0.5,0.7,0.3]
$$

hanya bermakna jika kita tahu urutannya.

Pada case ini urutan canonical adalah:

```text
[AI, Python, Math, UI/UX]
```

Jika satu file menggunakan:

```text
[AI, Python, Math, UI/UX]
```

sementara file lain diam-diam menggunakan:

```text
[Math, AI, UI/UX, Python]
```

maka arithmetic dot product masih bisa menghasilkan angka, tetapi **angka itu tidak lagi mewakili alignment yang kita maksud**.

> **Mathematical compatibility tidak cukup; semantic compatibility juga wajib.**

---

# 5. EXPLORE THE SAME CANONICAL CASE

## 5.1 Canonical synthetic participant profiles

| Peserta | AI | Python | Math | UI/UX |
|---|---:|---:|---:|---:|
| Alya | 0.80 | 0.50 | 0.70 | 0.30 |
| Bima | 0.50 | 0.70 | 0.60 | 0.40 |
| Citra | 0.90 | 0.40 | 0.80 | 0.20 |
| Dewi | 0.40 | 0.60 | 0.50 | 0.90 |

Participant-side semantics:

- AI = AI interest;
- Python = Python readiness;
- Math = Math readiness;
- UI/UX = UI/UX interest.

## 5.2 Canonical synthetic material profiles

| Materi | AI | Python | Math | UI/UX |
|---|---:|---:|---:|---:|
| Intro AI | 1.00 | 0.60 | 0.30 | 0.20 |
| Belajar Python | 0.20 | 1.00 | 0.50 | 0.10 |
| Desain UI/UX | 0.30 | 0.20 | 0.10 | 1.00 |
| Matematika Dasar | 0.50 | 0.10 | 1.00 | 0.20 |

Material-side semantics:

- AI = AI relevance;
- Python = Python requirement;
- Math = Math requirement;
- UI/UX = UI/UX relevance.

## 5.3 Shared-axis assumption

Kita sengaja menempatkan participant dan material pada empat axis yang sepadan.

Contoh:

- participant **Math readiness** dibandingkan dengan material **Math requirement**;
- participant **AI interest** dibandingkan dengan material **AI relevance**.

Ini adalah **engineered pedagogical design assumption**.

Bukan fakta universal bahwa semua readiness–requirement relationship seharusnya dinilai dengan cosine similarity.

---

# 6. FORMAL ROLE — Apa sebenarnya “matching score”?

Pada Topic ini, matching score adalah scalar yang dihasilkan dari dua vector:

$$
s(\mathbf{x}_p,\mathbf{v}_m).
$$

Object yang dibandingkan:

- satu participant $p$;
- satu candidate material $m$.

Input:

$$
(\mathbf{x}_p,\mathbf{v}_m).
$$

Output:

$$
s_{p,m}\in\mathbb{R}.
$$

Tetapi semantic type output bergantung pada metric yang dipakai.

Contoh:

- raw dot product → dot-product score;
- cosine similarity → cosine matching score;
- Euclidean distance → distance, bukan similarity score kecuali kita mendefinisikan transformasi tambahan.

---

# 7. NORM — Mengukur panjang vector

Euclidean norm:

$$
\|\mathbf{x}\|_2
=
\sqrt{\sum_{j=1}^{d}x_j^2}.
$$

Untuk Alya:

$$
\mathbf{x}_{\mathrm{Alya}}
=
\begin{bmatrix}
0.80\\
0.50\\
0.70\\
0.30
\end{bmatrix}.
$$

Maka:

$$
\|\mathbf{x}_{\mathrm{Alya}}\|_2
=
\sqrt{0.80^2+0.50^2+0.70^2+0.30^2}.
$$

$$
=
\sqrt{0.64+0.25+0.49+0.09}
=
\sqrt{1.47}
\approx 1.2124.
$$

Untuk Intro AI:

$$
\|\mathbf{v}_{\mathrm{IntroAI}}\|_2
=
\sqrt{1.00^2+0.60^2+0.30^2+0.20^2}
$$

$$
=
\sqrt{1.00+0.36+0.09+0.04}
=
\sqrt{1.49}
\approx 1.2207.
$$

### Interpretation

Norm memberi informasi tentang **magnitude** vector.

Dalam case synthetic ini, magnitude mencerminkan seberapa besar nilai profile secara keseluruhan pada empat axis.

Namun:

> norm besar **bukan** berarti participant lebih baik atau material lebih berkualitas.

---

# 8. DOT PRODUCT — Alignment yang masih dipengaruhi magnitude

Dot product:

$$
\mathbf{x}^{\top}\mathbf{v}
=
\sum_{j=1}^{d}x_jv_j.
$$

## 8.1 Worked micro-example

Misalkan:

$$
\mathbf{a}
=
\begin{bmatrix}
1\\
0
\end{bmatrix},
\qquad
\mathbf{b}
=
\begin{bmatrix}
2\\
0
\end{bmatrix}.
$$

Dot product:

$$
\mathbf{a}^{\top}\mathbf{b}
=1(2)+0(0)=2.
$$

Jika:

$$
\mathbf{c}
=
\begin{bmatrix}
1\\
0
\end{bmatrix},
$$

maka:

$$
\mathbf{a}^{\top}\mathbf{c}=1.
$$

Padahal $\mathbf{b}$ dan $\mathbf{c}$ menunjuk arah yang sama dengan $\mathbf{a}$.

Perbedaannya berasal dari **magnitude**.

---

# 9. DOT PRODUCT PADA HerAI CASE

## 9.1 Alya × Intro AI

$$
\mathbf{x}_{\mathrm{Alya}}^{\top}\mathbf{v}_{\mathrm{IntroAI}}
$$

$$
=
0.80(1.00)
+0.50(0.60)
+0.70(0.30)
+0.30(0.20)
$$

$$
=
0.80+0.30+0.21+0.06
=1.37.
$$

Semantic type:

> **raw dot-product matching score**.

Bukan probability $137\%$.

Bukan confidence.

Bukan educational outcome.

---

# 10. COSINE SIMILARITY — Normalized dot product

Canonical primary matching metric pada Integrated Case adalah **cosine similarity**.

$$
s_{\cos}(\mathbf{x},\mathbf{v})
=
\frac{\mathbf{x}^{\top}\mathbf{v}}
{\|\mathbf{x}\|_2\,\|\mathbf{v}\|_2}.
$$

Cosine membandingkan alignment setelah memperhitungkan norm kedua vector.

Untuk vector nonzero dengan nilai non-negatif seperti case kita, hasil berada pada rentang $[0,1]$.

**Peringatan:**

> berada pada $[0,1]$ tetap **tidak membuat cosine similarity menjadi probability**.

---

# 11. WORKED BASIC EXAMPLE — Alya × Intro AI

Kita sudah punya:

$$
\mathbf{x}_{\mathrm{Alya}}^{\top}\mathbf{v}_{\mathrm{IntroAI}}=1.37.
$$

Norm:

$$
\|\mathbf{x}_{\mathrm{Alya}}\|_2\approx1.2124,
$$

$$
\|\mathbf{v}_{\mathrm{IntroAI}}\|_2\approx1.2207.
$$

Maka:

$$
s_{\cos}(\mathrm{Alya},\mathrm{IntroAI})
=
\frac{1.37}{(1.2124)(1.2207)}.
$$

$$
\approx
\frac{1.37}{1.4799}
\approx0.9257.
$$

Interpretasi yang sah:

> “Pada shared synthetic feature space dan menggunakan cosine similarity yang telah kita pilih, Alya–Intro AI memperoleh matching score sekitar $0.9257$.”

Interpretasi yang **tidak sah**:

> “Alya punya 92.57% chance sukses di Intro AI.”

---

# 12. EUCLIDEAN DISTANCE — Pembanding, bukan primary ranking contract

Euclidean distance:

$$
d(\mathbf{x},\mathbf{v})
=
\|\mathbf{x}-\mathbf{v}\|_2.
$$

Untuk Alya dan Intro AI:

$$
\mathbf{x}_{\mathrm{Alya}}-
\mathbf{v}_{\mathrm{IntroAI}}
=
\begin{bmatrix}
-0.20\\
-0.10\\
0.40\\
0.10
\end{bmatrix}.
$$

Maka:

$$
d
=
\sqrt{(-0.20)^2+(-0.10)^2+(0.40)^2+(0.10)^2}
$$

$$
=
\sqrt{0.04+0.01+0.16+0.01}
=
\sqrt{0.22}
\approx0.4690.
$$

Untuk distance:

> **lebih kecil** berarti vector lebih dekat menurut Euclidean geometry.

Tetapi Topic ini tidak memakai Euclidean distance sebagai canonical final matching score.

Kita memakainya sebagai **compare view** untuk memahami metric choice.

---

# 13. MENGAPA COSINE MENJADI PRIMARY INSTRUCTIONAL MATCHING METRIC?

Ini adalah keputusan **pedagogical case design**, bukan universal theorem.

Alasannya:

1. participant dan material sudah berada di shared feature axes;
2. kita ingin menekankan **pattern/alignment** antaraxis;
3. raw dot product sensitif terhadap magnitude;
4. cosine menormalisasi dot product dengan norm kedua vector;
5. calculation masih cukup kecil untuk dicek manual oleh beginner;
6. cosine menciptakan kesempatan bagus untuk membedakan score dari probability.

Important boundary:

> Metric terbaik selalu bergantung pada representation, task, objective, dan evidence. Topic ini tidak menyatakan cosine selalu terbaik untuk recommender systems.

---

# 14. WORKED HerAI INTEGRATED EXAMPLE — Citra dan ranking yang berubah

Ini contoh terpenting Topic 02.

Citra:

$$
\mathbf{x}_{\mathrm{Citra}}
=
\begin{bmatrix}
0.90\\
0.40\\
0.80\\
0.20
\end{bmatrix}.
$$

## 14.1 Citra × Intro AI — raw dot product

$$
0.90(1.00)+0.40(0.60)+0.80(0.30)+0.20(0.20)
$$

$$
=0.90+0.24+0.24+0.04
=1.42.
$$

## 14.2 Citra × Matematika Dasar — raw dot product

$$
0.90(0.50)+0.40(0.10)+0.80(1.00)+0.20(0.20)
$$

$$
=0.45+0.04+0.80+0.04
=1.33.
$$

Dengan raw dot product:

$$
\mathrm{IntroAI}\;(1.42)
>
\mathrm{Math}\;(1.33).
$$

Jadi raw dot product memilih Intro AI sebagai score lebih tinggi.

## 14.3 Norm Citra

$$
\|\mathbf{x}_{\mathrm{Citra}}\|_2
=
\sqrt{0.90^2+0.40^2+0.80^2+0.20^2}
$$

$$
=
\sqrt{0.81+0.16+0.64+0.04}
=
\sqrt{1.65}
\approx1.2845.
$$

Norm Intro AI:

$$
\sqrt{1.49}\approx1.2207.
$$

Norm Matematika Dasar:

$$
\sqrt{0.50^2+0.10^2+1.00^2+0.20^2}
=
\sqrt{1.30}
\approx1.1402.
$$

## 14.4 Cosine Citra × Intro AI

$$
s_{\cos}
=
\frac{1.42}{(1.2845)(1.2207)}
\approx0.9056.
$$

## 14.5 Cosine Citra × Matematika Dasar

$$
s_{\cos}
=
\frac{1.33}{(1.2845)(1.1402)}
\approx0.9081.
$$

Sekarang ranking berubah:

$$
\mathrm{Math}\;(0.9081)
>
\mathrm{IntroAI}\;(0.9056).
$$

Perbedaannya kecil:

$$
0.9081-0.9056=0.0025.
$$

### Apa yang harus dipelajari?

Bukan:

> “Cosine membuktikan Matematika Dasar pasti lebih baik.”

Melainkan:

> “Metric choice mempengaruhi score dan bahkan dapat mempengaruhi ranking.”

Dan karena selisih cosine sangat kecil, learner juga harus berhati-hati terhadap overclaim seperti:

> “Math jelas jauh lebih cocok.”

Tidak. Pada metric ini keduanya **sangat dekat**.

---

# 15. CANONICAL COSINE SCORE MATRIX

Dengan cosine similarity sebagai primary instructional metric, seluruh participant–material pair menghasilkan:

| Peserta | Intro AI | Belajar Python | Desain UI/UX | Matematika Dasar |
|---|---:|---:|---:|---:|
| Alya | **0.9257** | 0.7523 | 0.5485 | 0.8753 |
| Bima | 0.8612 | **0.8907** | 0.6258 | 0.7813 |
| Citra | 0.9056 | 0.6828 | 0.4594 | **0.9081** |
| Dewi | 0.7104 | 0.7117 | **0.8867** | 0.6559 |

### 15.1 Ranking berdasarkan cosine

**Alya**

1. Intro AI — $0.9257$
2. Matematika Dasar — $0.8753$
3. Belajar Python — $0.7523$
4. Desain UI/UX — $0.5485$

**Bima**

1. Belajar Python — $0.8907$
2. Intro AI — $0.8612$
3. Matematika Dasar — $0.7813$
4. Desain UI/UX — $0.6258$

**Citra**

1. Matematika Dasar — $0.9081$
2. Intro AI — $0.9056$
3. Belajar Python — $0.6828$
4. Desain UI/UX — $0.4594$

**Dewi**

1. Desain UI/UX — $0.8867$
2. Belajar Python — $0.7117$
3. Intro AI — $0.7104$
4. Matematika Dasar — $0.6559$

---

# 16. “TOP-1 MATCH” BUKAN “BEST EDUCATIONAL RECOMMENDATION”

Untuk memudahkan pembelajaran, kita boleh menyebut candidate dengan cosine tertinggi sebagai:

> **top-1 cosine match**.

Kita tidak menyebutnya:

> **best educational recommendation**.

Kenapa?

Cosine matrix tidak memuat secara lengkap:

- curriculum prerequisites;
- actual learning gain;
- learner fatigue;
- accessibility needs;
- content freshness;
- instructor constraints;
- fairness considerations;
- causal effect dari material terhadap learning outcome.

Jadi top-1 cosine match hanya menjawab:

> “Candidate mana yang paling aligned menurut **representation + metric** yang kita definisikan?”

Itu adalah pertanyaan jauh lebih sempit daripada:

> “Candidate mana yang paling baik bagi learner di dunia nyata?”

---

# 17. $h(q,c)$ TETAP DI LUAR MATCHING VECTOR

Canonical score:

$$
h(q,c)=0.6q+0.4c
$$

**tidak dimasukkan** ke participant vector Topic 02.

Mengapa?

Karena $h$ adalah participant-only constructed context score.

Material tidak mempunyai axis canonical bernama “$h$ requirement”.

Jika kita memasukkan $h$ ke participant vector tetapi tidak mempunyai counterpart semantic yang jelas pada material vector, kita merusak shared feature-space contract.

Ini contoh bahwa:

> tidak semua angka yang tersedia harus dimasukkan ke matching model.

Lebih banyak feature **tidak otomatis lebih benar**.

---

# 18. MATRIX VIEW — Semua participant dan material sekaligus

Participant matrix:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.50 & 0.70 & 0.30\\
0.50 & 0.70 & 0.60 & 0.40\\
0.90 & 0.40 & 0.80 & 0.20\\
0.40 & 0.60 & 0.50 & 0.90
\end{bmatrix}.
$$

Rows:

1. Alya;
2. Bima;
3. Citra;
4. Dewi.

Material matrix:

$$
\mathbf{V}
=
\begin{bmatrix}
1.00 & 0.60 & 0.30 & 0.20\\
0.20 & 1.00 & 0.50 & 0.10\\
0.30 & 0.20 & 0.10 & 1.00\\
0.50 & 0.10 & 1.00 & 0.20
\end{bmatrix}.
$$

Rows:

1. Intro AI;
2. Belajar Python;
3. Desain UI/UX;
4. Matematika Dasar.

Raw pairwise dot-product matrix dapat ditulis secara compact:

$$
\mathbf{D}=\mathbf{X}\mathbf{V}^{\top}.
$$

Namun Topic ini **tidak membutuhkan peserta menghafal matrix implementation**.

Yang penting adalah memahami bahwa setiap cell merepresentasikan satu participant–material pair.

---

# 19. SYSTEM-READING SKILL — Membaca satu cosine score dengan benar

Ambil:

$$
s_{\cos}(\mathrm{Dewi},\mathrm{UIUX})=0.8867.
$$

### 19.1 Object

Participant–material pair:

```text
(Dewi, Desain UI/UX)
```

### 19.2 Notation

Scalar similarity score.

### 19.3 Source

**Derived** dari dua synthetic feature vectors.

### 19.4 Input

$$
\mathbf{x}_{\mathrm{Dewi}},
\quad
\mathbf{v}_{\mathrm{UIUX}}.
$$

### 19.5 Operation

Normalized dot product / cosine similarity.

### 19.6 Output

$$
0.8867.
$$

### 19.7 Semantic type

**cosine matching score**.

### 19.8 Assumptions

- shared axes valid;
- feature order konsisten;
- scale feature cukup comparable untuk case;
- cosine dipilih sebagai relevant matching metric;
- synthetic values diperlakukan sesuai pedagogical contract.

### 19.9 Justified conclusion

> “Desain UI/UX mempunyai cosine alignment tertinggi untuk Dewi di antara empat candidate synthetic profiles pada case ini.”

### 19.10 Unjustified conclusion

> “Dewi punya 88.67% probability sukses.”

atau:

> “Desain UI/UX pasti meningkatkan hasil belajar Dewi.”

### 19.11 Downstream role

Score matrix akan dibawa ke Topic 03 sebagai **derived matching quantity** ketika kita mulai memeriksa distribution, variation, dan data diagnostics.

---

# 20. CHANGE ONE THING / WHAT-IF — Scaling vector

Misalkan vector:

$$
\mathbf{x}
=
\begin{bmatrix}
0.5\\
0.5
\end{bmatrix}
$$

kita kalikan 2:

$$
2\mathbf{x}
=
\begin{bmatrix}
1\\
1
\end{bmatrix}.
$$

Terhadap vector:

$$
\mathbf{v}
=
\begin{bmatrix}
1\\
0
\end{bmatrix},
$$

raw dot product berubah:

$$
\mathbf{x}^{\top}\mathbf{v}=0.5,
$$

menjadi:

$$
(2\mathbf{x})^{\top}\mathbf{v}=1.
$$

Tetapi cosine tetap sama karena arah vector tidak berubah.

Ini memperjelas:

> raw dot product sensitif terhadap magnitude; cosine menormalisasi magnitude untuk mengukur angular alignment.

---

# 21. WHY THIS MATTERS IN AI

Representation dan metric adalah bagian dari model assumptions.

Dua sistem dapat menggunakan data participant yang sama tetapi menghasilkan ranking berbeda karena:

- feature axes berbeda;
- preprocessing berbeda;
- scaling berbeda;
- metric berbeda;
- candidate set berbeda.

Karena itu, ketika melihat sebuah recommendation score, kita seharusnya bertanya:

> **Score ini dihitung dari representation apa dan metric apa?**

Bukan hanya:

> “Angkanya tinggi atau rendah?”

---

# 22. MISCONCEPTION / FAILURE-MODE CHALLENGE

## 22.1 “Dot product = cosine similarity”

Salah secara umum.

Cosine adalah normalized dot product:

$$
\cos(\mathbf{x},\mathbf{v})
=
\frac{\mathbf{x}^{\top}\mathbf{v}}
{\|\mathbf{x}\|\|\mathbf{v}\|}.
$$

Keduanya sama hanya pada kondisi tertentu, misalnya ketika vectors sudah dinormalisasi ke unit norm.

## 22.2 “Cosine $0.92$ = 92% probability”

Salah.

Cosine adalah geometric similarity score.

## 22.3 “Highest similarity = best learning material”

Salah.

Similarity hanya menjawab alignment menurut representation dan metric yang ditentukan.

## 22.4 “Semua axes 0–1 berarti sudah comparable secara ilmiah”

Tidak otomatis.

Range sama belum membuktikan measurement quality, calibration, construct validity, atau causal relevance.

Pada case ini comparability adalah **synthetic pedagogical assumption**.

## 22.5 “Tambah $h$ ke vector supaya datanya lebih lengkap”

Tidak otomatis benar.

Feature harus punya semantic role yang jelas pada shared space.

---

# 23. TRY IT YOURSELF

Tanpa melihat answer table, coba:

1. hitung dot product Bima × Belajar Python;
2. hitung norm Bima;
3. hitung norm Belajar Python;
4. hitung cosine similarity;
5. tentukan semantic type hasilnya.

Data:

$$
\mathbf{x}_{\mathrm{Bima}}
=
\begin{bmatrix}
0.50\\
0.70\\
0.60\\
0.40
\end{bmatrix},
$$

$$
\mathbf{v}_{\mathrm{Python}}
=
\begin{bmatrix}
0.20\\
1.00\\
0.50\\
0.10
\end{bmatrix}.
$$

Expected result:

$$
\mathbf{x}_{\mathrm{Bima}}^{\top}\mathbf{v}_{\mathrm{Python}}=1.14,
$$

$$
\|\mathbf{x}_{\mathrm{Bima}}\|\approx1.1225,
$$

$$
\|\mathbf{v}_{\mathrm{Python}}\|\approx1.1402,
$$

$$
s_{\cos}\approx0.8907.
$$

Semantic type:

> cosine matching score.

---

# 24. VISUAL / INTERACTIVE ARCHITECTURE

## 24.1 [STATIC VISUAL] — Shared feature-space map

**Learning purpose:** menunjukkan bahwa participant dan material harus mempunyai axis order yang sama.

**Initial state:** empat horizontal axes: AI, Python, Math, UI/UX; satu participant vector dan satu material vector.

**Learner action:** membaca correspondence antaraxis.

**Expected behavior:** learner dapat menjelaskan mengapa `Math readiness` dibandingkan dengan `Math requirement`.

**Feedback:** label semantic pair muncul pada setiap axis.

**Safety / interpretation note:** shared axis adalah engineered case design, bukan claim bahwa real learner profile hanya memiliki empat dimension.

---

## 24.2 [NUMBER MANIPULATOR] — Dot vs cosine under scaling

**Learning purpose:** memahami magnitude sensitivity.

**Initial state:** dua vector sederhana 2D.

**Learner action:** mengubah scale salah satu vector.

**Expected behavior:** dot product berubah; cosine tetap ketika hanya magnitude yang berubah dan direction sama.

**Feedback:** tampilkan dot, norm, dan cosine step-by-step.

**Safety / interpretation note:** contoh geometry sederhana tidak otomatis menentukan metric terbaik untuk semua recommender systems.

---

## 24.3 [COMPARE VIEW] — Citra: Intro AI vs Matematika Dasar

**Learning purpose:** menunjukkan metric choice dapat mengubah ranking.

**Initial state:** dua candidate cards.

**Learner action:** toggle `Dot Product` ↔ `Cosine`.

**Expected behavior:** dot ranking Intro AI di atas Math; cosine ranking Math sedikit di atas Intro AI.

**Feedback:** tampilkan norm dan margin score.

**Safety / interpretation note:** ranking change bukan bukti bahwa salah satu metric “benar” secara educational outcome.

---

## 24.4 [INTERACTIVE VISUAL] — Participant × material matching matrix

**Learning purpose:** membaca pairwise score matrix.

**Initial state:** 4 × 4 cosine matrix.

**Learner action:** pilih satu participant row.

**Expected behavior:** matrix menyorot top-1 cosine match dan margin ke runner-up.

**Feedback:** UI menampilkan “matching signal only”.

**Safety / interpretation note:** jangan label top-1 sebagai “best recommendation”.

---

## 24.5 [STEP-BY-STEP REVEAL] — Satu cosine calculation

**Learning purpose:** membuat calculation transparan.

**Initial state:** Alya × Intro AI.

**Learner action:** reveal dot → norm participant → norm material → denominator → cosine.

**Expected behavior:** learner dapat menghubungkan setiap intermediate quantity.

**Feedback:** setiap step diberi semantic label.

**Safety / interpretation note:** cosine score bukan probability.

---

# 25. CHECKPOINT

Jawab sebelum lanjut:

1. Apa canonical primary matching metric?  
   **Cosine similarity.**

2. Apakah raw dot product sama dengan cosine?  
   **Tidak secara umum.**

3. Apa arti cosine $0.9257$ untuk Alya–Intro AI?  
   **High alignment pada synthetic shared feature space menurut cosine metric.**

4. Apakah itu probability?  
   **Tidak.**

5. Mengapa $h(q,c)$ tidak masuk matching vector?  
   **Karena $h$ adalah participant-only constructed context score dan tidak memiliki shared material-axis counterpart dalam contract.**

6. Apakah Citra–Math dengan cosine $0.9081$ membuktikan Math adalah educationally best?  
   **Tidak.**

---

# 26. MASTERY CHECK — “I can…”

- **I can** memeriksa feature order sebelum melakukan operasi vector.
- **I can** menghitung norm vector kecil.
- **I can** menghitung raw dot product.
- **I can** menghitung cosine similarity.
- **I can** membedakan similarity dan distance.
- **I can** menjelaskan mengapa dot product dan cosine dapat memberi ranking berbeda.
- **I can** membaca cosine matrix sebagai matching signal.
- **I can** mempertahankan score/probability boundary.
- **I can** menjelaskan bahwa highest similarity bukan automatic educational truth.

---

# 27. SCOPE BOUNDARY

Topic 02 **tidak** mengajarkan:

- collaborative filtering;
- matrix factorization;
- learned embeddings;
- neural recommendation;
- learning-to-rank;
- production ranking architecture;
- calibration;
- causal recommendation;
- supervised training;
- loss optimization.

Istilah “embedding” boleh dikenali sebagai future orientation, tetapi participant/material vectors kita saat ini adalah **hand-engineered synthetic profiles**, bukan learned embeddings.

---

# 28. SUMMARY

Kita memulai dari representation:

$$
\mathbf{x}_p,\mathbf{v}_m\in\mathbb{R}^{4}.
$$

Raw dot product:

$$
\mathbf{x}_p^{\top}\mathbf{v}_m.
$$

Norm:

$$
\|\mathbf{x}\|_2.
$$

Canonical primary matching score:

$$
s_{\cos}(p,m)
=
\frac{\mathbf{x}_p^{\top}\mathbf{v}_m}
{\|\mathbf{x}_p\|_2\|\mathbf{v}_m\|_2}.
$$

Key semantic boundary:

> **cosine similarity = matching score, not probability.**

Dan:

> **top-1 cosine match = highest alignment under this representation and metric, not automatic best educational recommendation.**

---

# 29. BRIDGE TO TOPIC 03 — Data Diagnostics

Sekarang kita mempunyai:

- canonical participant/context data;
- participant/material profiles;
- full cosine matching matrix;
- top-1 matching signals.

Pertanyaan selanjutnya:

> **Sebelum mempercayai pattern yang muncul, apa yang dapat kita pelajari dari center, spread, distribution, outlier, correlation, dan data-quality checks pada mini-dataset yang sama?**

Itulah fokus:

# **Topic 03 — Data Diagnostics**

Topic 03 akan memakai **dataset yang sama**, bukan membuat kasus baru.
