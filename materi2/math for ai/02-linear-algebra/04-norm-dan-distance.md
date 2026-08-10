# Topic 04 — Magnitude/Norm dan Distance: Mengukur Besar dan Kedekatan

> **Submodul 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks**  
> **Filename:** `04-norm-dan-distance.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 90–115 menit membaca + 45–60 menit eksplorasi/praktik  
> **Prerequisite:** Topic 01–03 — scalar→vector, components, dimension/shape/feature order, vector addition, subtraction, dan scalar multiplication  
> **Forward dependency:** Topic 05 — Dot Product: Menggabungkan Dua Vektor Secara Matematis  
> **Boundary:** Topic ini mengajarkan magnitude melalui Euclidean/L2 norm dan kedekatan melalui Euclidean distance. Topic ini belum mengajarkan dot product sebagai konsep formal, cosine similarity, matrix, matrix multiplication, probability, gradient, atau optimization.

---

# 1. Mengapa Topik Ini Ada?

Pada tiga topic sebelumnya, kita sudah membangun bahasa dasar Linear Algebra secara bertahap.

**Topic 01**

scalar → beberapa feature → vector.

**Topic 02**

vector → component → index → dimension → shape → feature order.

**Topic 03**

vector → addition → subtraction → scalar multiplication.

Sekarang muncul dua pertanyaan yang sangat natural.

Pertama:

> **Seberapa besar sebuah vector jika kita ingin merangkum semua components menjadi satu nonnegative number?**

Kedua:

> **Seberapa jauh dua vectors satu sama lain?**

Di Linear Algebra, konsep pertama dijawab dengan **norm**.

Konsep kedua dapat dibangun dari norm terhadap **difference vector**.

MIT OpenCourseWare menjelaskan distance antara dua vectors sebagai length dari difference vector, dan untuk Euclidean distance panjang tersebut mengikuti generalisasi Pythagorean theorem. [R1]

MIT juga menempatkan vector norms sebagai cara mengukur size sebuah vector. [R2]

Tetapi pada HerAI ada safety layer yang tidak boleh dilewati:

> **angka distance yang kecil hanya meaningful jika representation, feature order, units, scale, dan metric choice memang sesuai dengan task.**

Google ML menekankan bahwa similarity measure harus merefleksikan real-world similarity yang ingin direpresentasikan, dan preprocessing feature perlu dipilih dengan hati-hati. [R4]

Jadi Topic 04 bukan sekadar belajar square root.

Kita belajar:

**difference → squared differences → aggregate → square root → distance → interpretation → scale audit.**

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 04, kamu diharapkan mampu:

1. menjelaskan perbedaan antara vector, norm, dan distance;
2. menjelaskan norm secara intuitif sebagai ukuran magnitude sebuah vector;
3. membaca notation $\|\mathbf{x}\|_2$ dengan benar;
4. menghitung Euclidean/L2 norm vector 2D dan 3D secara langkah demi langkah;
5. menjelaskan mengapa norm menghasilkan scalar nonnegative;
6. menjelaskan bahwa norm zero terjadi pada zero vector;
7. membedakan dimension dari magnitude;
8. membedakan component value dari vector magnitude;
9. menjelaskan distance sebagai ukuran separation antara dua vectors;
10. membaca notation $d(\mathbf{x},\mathbf{y})$;
11. menghitung Euclidean distance menggunakan difference vector;
12. menghitung Euclidean distance langsung dari components;
13. menjelaskan hubungan:
   $\text{distance}=\text{norm of the difference vector}$;
14. menjelaskan mengapa subtraction order mengubah sign difference vector tetapi tidak mengubah Euclidean distance;
15. mengenali bahwa distance dari vector ke dirinya sendiri adalah zero;
16. menjelaskan symmetry distance;
17. membandingkan beberapa participant vectors berdasarkan distance;
18. menggunakan persistent HerAI vectors Alya, Bima, Citra, Dewi tanpa mengganti dataset;
19. menginterpretasikan “nearest” sebagai nearest **under a defined representation and metric**, bukan universal similarity;
20. menjelaskan mengapa feature units dan scales dapat mendominasi Euclidean distance;
21. menunjukkan secara numerik bagaimana menambahkan study duration dalam minutes dapat mengubah distance secara drastis;
22. menjelaskan mengapa mengubah minutes ke seconds seharusnya tidak mengubah real-world learning behavior tetapi dapat mengubah raw Euclidean distance jika data tidak diproses secara konsisten;
23. memahami scaling/normalization sebagai preprocessing issue tanpa mempelajari metode Statistics secara formal;
24. menjelaskan bahwa Euclidean distance bukan satu-satunya possible distance metric;
25. membedakan “close in feature space” dari “causally similar”;
26. membedakan distance dari probability, confidence, dan accuracy;
27. menjelaskan mengapa norm besar bukan otomatis participant lebih baik;
28. menjelaskan mengapa distance kecil bukan otomatis recommendation terbaik;
29. membaca formula secara natural-language;
30. memprediksi perubahan norm/distance sebelum menghitung;
31. mengaudit misconception tentang units, scale, dimension, dan semantics;
32. memahami mengapa Topic 04 menjadi prerequisite penting sebelum dot product dan cosine similarity.

---

# 3. Prerequisite Recall — Apa yang Kita Bawa dari Topic 03?

Kita tidak mengulang semua materi sebelumnya.

Pegang lima contract.

## 3.1 Canonical feature order HerAI

Setiap participant vector dua dimensi menggunakan:

1. quiz ratio;
2. completion ratio.

## 3.2 Canonical participants

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

untuk Alya.

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

untuk Bima.

$$
\mathbf{x}^{(3)}
=
\begin{bmatrix}
0.90 \\
1.00
\end{bmatrix}
$$

untuk Citra.

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70 \\
0.50
\end{bmatrix}
$$

untuk Dewi.

## 3.3 Difference vector sudah dipahami

Contoh:

$$
\mathbf{x}^{(1)}-\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.20 \\
0.125
\end{bmatrix}
$$

Topic 03 sengaja berhenti di sini.

Kita belum menyebut vector tersebut sebagai distance.

## 3.4 Difference vector masih mempunyai beberapa components

Ia memberi tahu **arah dan besar perbedaan per feature**.

## 3.5 Distance harus menghasilkan satu scalar

Topic 04 akan mengubah beberapa component differences menjadi satu ukuran nonnegative yang disebut Euclidean distance.

---

# 4. Pertanyaan Pemantik — “Siapa yang Lebih Dekat dengan Alya?”

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

Citra:

$$
\mathbf{x}^{(3)}
=
\begin{bmatrix}
0.90 \\
1.00
\end{bmatrix}
$$

Dewi:

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70 \\
0.50
\end{bmatrix}
$$

Sekilas:

- Bima berbeda $0.20$ pada quiz dan $0.125$ pada completion;
- Citra berbeda $0.10$ pada quiz dan $0.25$ pada completion;
- Dewi berbeda $0.10$ pada quiz dan $0.25$ pada completion.

Pertanyaan:

> **Bagaimana kita mengubah dua component differences menjadi satu number yang dapat dibandingkan secara konsisten?**

Dan pertanyaan yang lebih penting:

> **Jika satu distance ternyata lebih kecil, apakah itu otomatis berarti dua participant benar-benar “mirip” dalam semua hal?**

Jawaban pertanyaan kedua adalah:

**tidak.**

Distance hanya berlaku terhadap:

- representation yang dipilih;
- features yang dipilih;
- units dan scales;
- metric yang dipilih;
- task yang ingin dibantu.

---

# 5. Predict Before Calculate

## Prediksi A — Vector yang Lebih Panjang

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
3 \\
4
\end{bmatrix}
$$

dan:

$$
\mathbf{v}
=
\begin{bmatrix}
1 \\
1
\end{bmatrix}
$$

Tanpa menghitung exact value, vector mana yang kamu duga mempunyai magnitude lebih besar?

---

## Prediksi B — Distance ke Diri Sendiri

Apa yang kamu prediksi untuk:

$$
d(\mathbf{x},\mathbf{x})?
$$

A. selalu $1$  
B. selalu $0$  
C. tergantung dimension  
D. probability $100\%$

---

## Prediksi C — Reversing Order

Jika:

$$
\mathbf{x}-\mathbf{y}
=
\begin{bmatrix}
2\\
-3
\end{bmatrix}
$$

maka:

$$
\mathbf{y}-\mathbf{x}
=
\begin{bmatrix}
-2\\
3
\end{bmatrix}
$$

Apakah Euclidean distance akan berubah hanya karena subtraction order dibalik?

Simpan jawabanmu.

---

## Prediksi D — Unit Trap

Dataset memakai feature:

1. quiz ratio dalam range $0$–$1$;
2. completion ratio dalam range $0$–$1$;
3. study duration dalam **minutes**.

Dua participant berbeda:

- quiz ratio: $0.20$;
- completion ratio: $0.125$;
- study duration: $15$ minutes.

Menurutmu component mana yang cenderung mendominasi raw Euclidean distance?

---

# 6. Intuisi 1 — Magnitude sebagai “Seberapa Jauh dari Origin”

Bayangkan coordinate plane 2D.

Vector:

$$
\mathbf{u}
=
\begin{bmatrix}
3\\
4
\end{bmatrix}
$$

dapat divisualisasikan sebagai arrow dari origin:

$$
(0,0)
$$

menuju point:

$$
(3,4)
$$

Jika kita ingin panjang arrow tersebut, kita dapat menggunakan Pythagorean theorem.

Horizontal length:

$$
3
$$

Vertical length:

$$
4
$$

Maka total length:

$$
\sqrt{3^2+4^2}
$$

$$
=
\sqrt{9+16}
$$

$$
=
\sqrt{25}
$$

$$
=
5
$$

Di Linear Algebra, ukuran seperti ini disebut **Euclidean norm** atau **L2 norm**. [R1][R2]

---

# 7. Concrete Example — Dari Pythagoras ke Vector Norm

Diberikan:

$$
\mathbf{v}
=
\begin{bmatrix}
6\\
8
\end{bmatrix}
$$

Kita ingin satu scalar yang menyatakan Euclidean magnitude.

### Step 1 — Square setiap component

$$
6^2=36
$$

$$
8^2=64
$$

### Step 2 — Jumlahkan

$$
36+64=100
$$

### Step 3 — Square root

$$
\sqrt{100}=10
$$

Maka:

$$
\|\mathbf{v}\|_2=10
$$

Perhatikan:

- input adalah vector;
- output adalah scalar;
- output tidak negative;
- dimension vector tetap $2$;
- magnitude $10$ **bukan** dimension.

---

# 8. Definisi Formal — Euclidean/L2 Norm

Untuk vector:

$$
\mathbf{x}
=
\begin{bmatrix}
x_1\\
x_2\\
\vdots\\
x_d
\end{bmatrix}
\in\mathbb{R}^{d}
$$

Euclidean norm didefinisikan sebagai:

$$
\|\mathbf{x}\|_2
=
\sqrt{
\sum_{j=1}^{d}x_j^2
}
$$

[R1][R2][R3]

Bentuk yang sama dapat ditulis expanded:

$$
\|\mathbf{x}\|_2
=
\sqrt{
x_1^2+x_2^2+\cdots+x_d^2
}
$$

## Arti setiap simbol

### $\mathbf{x}$

Vector yang diukur.

### $x_j$

Component ke-$j$ dari vector.

### $d$

Dimension vector, yaitu jumlah components.

### $\sum$

Menjumlahkan terms dari index yang ditentukan.

### $x_j^2$

Square component ke-$j$.

### $\sqrt{\phantom{x}}$

Square root.

### $\|\mathbf{x}\|_2$

L2 norm atau Euclidean norm dari vector $\mathbf{x}$.

Subscript $2$ menunjukkan bahwa norm ini menggunakan squares dan square root dalam bentuk L2.

---

# 9. Math Reading Skill — Cara Membaca Norm

Formula:

$$
\|\mathbf{x}\|_2
=
\sqrt{
\sum_{j=1}^{d}x_j^2
}
$$

dapat dibaca:

> “Norm dua dari vector x adalah square root dari jumlah square setiap component x dari component pertama sampai component ke-d.”

Atau lebih natural:

> “Square setiap component, jumlahkan semuanya, lalu ambil square root.”

Jangan membaca:

> “Dua garis x dua.”

Symbol:

$$
\|\cdot\|_2
$$

adalah operator norm, bukan absolute value scalar biasa.

---

# 10. Mengapa Semua Components Di-square?

Untuk:

$$
\mathbf{u}
=
\begin{bmatrix}
3\\
-4
\end{bmatrix}
$$

kita tidak ingin negative component membuat panjang menjadi negative.

Square membuat:

$$
3^2=9
$$

dan:

$$
(-4)^2=16
$$

sehingga:

$$
\|\mathbf{u}\|_2
=
\sqrt{9+16}
=
5
$$

Magnitude bersifat nonnegative.

Tetapi jangan menyimpulkan:

> “negative components tidak penting.”

Sign tetap penting untuk location/direction.

Hanya ketika menghitung L2 norm, squares membuat contributions terhadap magnitude menjadi nonnegative.

---

# 11. Properties Dasar Norm — Beginner Version

Kita tidak melakukan formal proof.

Cukup kenali properties inti sebuah norm. [R1][R7]

## 11.1 Nonnegative

$$
\|\mathbf{x}\|_2\ge 0
$$

## 11.2 Zero hanya untuk zero vector

$$
\|\mathbf{x}\|_2=0
$$

jika:

$$
\mathbf{x}=\mathbf{0}
$$

## 11.3 Scaling

Untuk scalar $k$:

$$
\|k\mathbf{x}\|_2
=
|k|\|\mathbf{x}\|_2
$$

Artinya magnitude ikut scale berdasarkan absolute value scalar.

## 11.4 Triangle inequality

$$
\|\mathbf{x}+\mathbf{y}\|_2
\le
\|\mathbf{x}\|_2+\|\mathbf{y}\|_2
$$

Pada Topic ini, cukup pahami intuition:

> rute langsung tidak lebih panjang daripada memaksa perjalanan lewat dua legs terpisah.

Kita tidak membuktikan theorem ini.

---

# 12. Worked Example 1 — Norm 3D Step by Step

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
2\\
-3\\
6
\end{bmatrix}
$$

Hitung:

$$
\|\mathbf{u}\|_2
$$

## Step 1 — Tulis formula

$$
\|\mathbf{u}\|_2
=
\sqrt{
2^2+(-3)^2+6^2
}
$$

## Step 2 — Square setiap component

$$
2^2=4
$$

$$
(-3)^2=9
$$

$$
6^2=36
$$

## Step 3 — Jumlahkan

$$
4+9+36=49
$$

## Step 4 — Square root

$$
\sqrt{49}=7
$$

## Result

$$
\boxed{
\|\mathbf{u}\|_2=7
}
$$

## Interpretation

Vector tiga dimensi tersebut mempunyai Euclidean magnitude $7$.

Ini tidak berarti:

- dimension-nya $7$;
- vector mempunyai tujuh features;
- probability-nya $70\%$;
- “quality”-nya adalah $7$.

Dimension tetap:

$$
3
$$

---

# 13. Change One Thing — Apa yang Terjadi jika Satu Component Naik?

Mulai dari:

$$
\mathbf{u}
=
\begin{bmatrix}
3\\
4
\end{bmatrix}
$$

dengan:

$$
\|\mathbf{u}\|_2=5
$$

Sekarang ubah hanya component pertama:

$$
\mathbf{u}'
=
\begin{bmatrix}
6\\
4
\end{bmatrix}
$$

Prediksi dulu:

> norm naik, turun, atau tetap?

Hitung:

$$
\|\mathbf{u}'\|_2
=
\sqrt{6^2+4^2}
$$

$$
=
\sqrt{36+16}
$$

$$
=
\sqrt{52}
$$

$$
\approx 7.21
$$

Norm naik.

Tetapi relationship tidak sekadar “component pertama dua kali → norm dua kali”, karena component lain tetap.

---

# 14. HerAI Norm — Hati-hati dengan Interpretation

Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Norm:

$$
\|\mathbf{x}^{(1)}\|_2
=
\sqrt{
0.80^2+0.75^2
}
$$

$$
=
\sqrt{
0.64+0.5625
}
$$

$$
=
\sqrt{1.2025}
$$

$$
\approx 1.097
$$

Calculation benar.

Tetapi apa arti:

$$
1.097
$$

?

Ia adalah L2 magnitude dari **representation Alya dengan schema quiz ratio/completion ratio**.

Ia **bukan**:

- probability mastery;
- recommendation confidence;
- participant quality;
- intelligence score;
- universal learning readiness.

Norm terhadap origin bergantung pada arti origin dan feature representation.

Dalam schema ini, origin:

$$
\begin{bmatrix}
0\\
0
\end{bmatrix}
$$

berarti zero quiz ratio dan zero completion ratio.

Itu konteks yang cukup masuk akal untuk geometric exercise, tetapi norm tetap bukan ukuran universal “bagus”.

---

# 15. Common Misconception — “Norm Besar = Participant Lebih Baik”

Citra:

$$
\mathbf{x}^{(3)}
=
\begin{bmatrix}
0.90\\
1.00
\end{bmatrix}
$$

memiliki norm lebih besar daripada Dewi:

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70\\
0.50
\end{bmatrix}
$$

Tetapi menyatakan:

> “Citra adalah participant yang secara universal lebih baik karena norm-nya lebih besar”

adalah overclaim.

Mengapa?

Karena:

1. vector hanya menyimpan dua selected features;
2. feature importance belum ditentukan oleh norm;
3. representation bukan participant;
4. larger coordinate values kebetulan berarti higher ratios pada schema ini;
5. task recommendation bisa membutuhkan factors lain;
6. norm bukan validated learning outcome metric.

---

# 16. Dari Magnitude ke Distance

Sekarang kita pindah pertanyaan.

Norm:

> “Seberapa besar satu vector dari origin?”

Distance:

> “Seberapa jauh dua vectors satu sama lain?”

MIT memberikan intuition penting:

> distance antara dua vectors dapat dipahami sebagai length/norm dari difference vector. [R1]

Secara konsep:

$$
\mathbf{x}-\mathbf{y}
$$

memberi displacement dari $\mathbf{y}$ ke $\mathbf{x}$.

Norm displacement tersebut memberi satu nonnegative number.

---

# 17. Definisi Formal — Euclidean Distance

Untuk:

$$
\mathbf{x},\mathbf{y}\in\mathbb{R}^{d}
$$

kita definisikan Euclidean distance:

$$
d(\mathbf{x},\mathbf{y})
=
\|\mathbf{x}-\mathbf{y}\|_2
$$

[R1][R3]

Expanded form:

$$
d(\mathbf{x},\mathbf{y})
=
\sqrt{
\sum_{j=1}^{d}
\left(x_j-y_j\right)^2
}
$$

Atau:

$$
d(\mathbf{x},\mathbf{y})
=
\sqrt{
(x_1-y_1)^2
+
(x_2-y_2)^2
+
\cdots
+
(x_d-y_d)^2
}
$$

---

# 18. Notasi Distance — Semua Simbol Harus Punya Makna

## $d(\mathbf{x},\mathbf{y})$

Euclidean distance antara vectors $\mathbf{x}$ dan $\mathbf{y}$ pada Topic ini.

## $\mathbf{x}-\mathbf{y}$

Difference vector.

## $\|\mathbf{x}-\mathbf{y}\|_2$

L2 norm dari difference vector.

## $x_j-y_j$

Signed difference pada component ke-$j$.

## $(x_j-y_j)^2$

Squared component difference.

## $\sum_{j=1}^{d}$

Jumlahkan squared differences pada seluruh components.

---

# 19. Math Reading Skill — Membaca Distance Formula

Formula:

$$
d(\mathbf{x},\mathbf{y})
=
\sqrt{
\sum_{j=1}^{d}
(x_j-y_j)^2
}
$$

dapat dibaca:

> “Distance antara vector x dan y adalah square root dari jumlah square perbedaan matching components.”

Workflow reading:

1. **match** component ke-$j$;
2. **subtract**;
3. **square**;
4. **sum**;
5. **square root**.

Ini adalah algoritma mental yang akan kita gunakan berulang kali.

---

# 20. Worked Example 2 — Basic Euclidean Distance

Diberikan:

$$
\mathbf{u}
=
\begin{bmatrix}
1\\
2
\end{bmatrix}
$$

dan:

$$
\mathbf{v}
=
\begin{bmatrix}
4\\
6
\end{bmatrix}
$$

Hitung:

$$
d(\mathbf{u},\mathbf{v})
$$

## Step 1 — Difference vector

$$
\mathbf{u}-\mathbf{v}
=
\begin{bmatrix}
1-4\\
2-6
\end{bmatrix}
$$

$$
=
\begin{bmatrix}
-3\\
-4
\end{bmatrix}
$$

## Step 2 — Norm of difference

$$
\|\mathbf{u}-\mathbf{v}\|_2
=
\sqrt{
(-3)^2+(-4)^2
}
$$

## Step 3 — Squares

$$
(-3)^2=9
$$

$$
(-4)^2=16
$$

## Step 4 — Sum

$$
9+16=25
$$

## Step 5 — Square root

$$
\sqrt{25}=5
$$

## Result

$$
\boxed{
d(\mathbf{u},\mathbf{v})=5
}
$$

---

# 21. Why Negative Differences Do Not Create Negative Distance

Difference:

$$
\mathbf{u}-\mathbf{v}
=
\begin{bmatrix}
-3\\
-4
\end{bmatrix}
$$

mempunyai negative components.

Tetapi distance:

$$
5
$$

nonnegative.

Ini bukan contradiction.

Difference vector menyimpan direction.

Distance merangkum separation magnitude.

---

# 22. Reversing Subtraction — Difference Berubah, Distance Tetap

Tadi:

$$
\mathbf{u}-\mathbf{v}
=
\begin{bmatrix}
-3\\
-4
\end{bmatrix}
$$

Jika dibalik:

$$
\mathbf{v}-\mathbf{u}
=
\begin{bmatrix}
3\\
4
\end{bmatrix}
$$

Vectors berbeda.

Tetapi:

$$
\sqrt{(-3)^2+(-4)^2}
=
\sqrt{3^2+4^2}
=
5
$$

Sehingga:

$$
d(\mathbf{u},\mathbf{v})
=
d(\mathbf{v},\mathbf{u})
$$

Ini disebut **symmetry**.

---

# 23. Basic Properties of Euclidean Distance

Tanpa formal proof panjang, Euclidean distance memiliki metric properties. [R1]

## 23.1 Nonnegative

$$
d(\mathbf{x},\mathbf{y})\ge 0
$$

## 23.2 Identity

$$
d(\mathbf{x},\mathbf{x})=0
$$

dan jika Euclidean distance zero:

$$
d(\mathbf{x},\mathbf{y})=0
$$

maka:

$$
\mathbf{x}=\mathbf{y}
$$

untuk vectors pada representation yang sama.

## 23.3 Symmetry

$$
d(\mathbf{x},\mathbf{y})
=
d(\mathbf{y},\mathbf{x})
$$

## 23.4 Triangle inequality

$$
d(\mathbf{x},\mathbf{z})
\le
d(\mathbf{x},\mathbf{y})
+
d(\mathbf{y},\mathbf{z})
$$

Kita hanya perlu conceptual intuition sekarang.

---

# 24. HerAI Worked Example 3 — Alya vs Bima

Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

Bima:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60\\
0.625
\end{bmatrix}
$$

Kita hitung:

$$
d(\mathbf{x}^{(1)},\mathbf{x}^{(2)})
$$

## Step 1 — Difference

$$
\mathbf{x}^{(1)}-\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.80-0.60\\
0.75-0.625
\end{bmatrix}
$$

$$
=
\begin{bmatrix}
0.20\\
0.125
\end{bmatrix}
$$

## Step 2 — Square differences

$$
0.20^2=0.04
$$

$$
0.125^2=0.015625
$$

## Step 3 — Sum

$$
0.04+0.015625
=
0.055625
$$

## Step 4 — Square root

$$
\sqrt{0.055625}
\approx
0.236
$$

## Result

$$
\boxed{
d(\mathbf{x}^{(1)},\mathbf{x}^{(2)})
\approx
0.236
}
$$

## Interpretation

Pada feature space:

1. quiz ratio;
2. completion ratio;

dengan raw values pada scale yang comparable $0$–$1$, Alya dan Bima mempunyai Euclidean distance sekitar $0.236$.

Kalimat aman:

> “Under this two-feature representation and Euclidean metric, distance Alya–Bima adalah sekitar 0.236.”

Kalimat berbahaya:

> “Alya dan Bima 76.4% mirip.”

Distance $0.236$ **bukan** similarity percentage.

---

# 25. HerAI Worked Example 4 — Citra vs Dewi

Citra:

$$
\mathbf{x}^{(3)}
=
\begin{bmatrix}
0.90\\
1.00
\end{bmatrix}
$$

Dewi:

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70\\
0.50
\end{bmatrix}
$$

## Step 1 — Difference

$$
\mathbf{x}^{(3)}-\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.20\\
0.50
\end{bmatrix}
$$

## Step 2 — Squares

$$
0.20^2=0.04
$$

$$
0.50^2=0.25
$$

## Step 3 — Sum

$$
0.04+0.25=0.29
$$

## Step 4 — Square root

$$
\sqrt{0.29}
\approx
0.539
$$

## Result

$$
\boxed{
d(\mathbf{x}^{(3)},\mathbf{x}^{(4)})
\approx
0.539
}
$$

Distance ini lebih besar daripada Alya–Bima:

$$
0.539>0.236
$$

Dalam representation dua feature tersebut, Citra–Dewi lebih separated daripada Alya–Bima.

---

# 26. HerAI Distance Table — Semua Pair

Dengan feature order yang sama:

1. quiz ratio;
2. completion ratio;

kita memperoleh approximate Euclidean distances:

| Pair | Distance |
|---|---:|
| Alya–Bima | $0.236$ |
| Alya–Citra | $0.269$ |
| Alya–Dewi | $0.269$ |
| Bima–Citra | $0.480$ |
| Bima–Dewi | $0.160$ |
| Citra–Dewi | $0.539$ |

## Observation

Pair terdekat pada toy representation ini:

$$
\text{Bima–Dewi}
$$

dengan distance sekitar:

$$
0.160
$$

Pair paling jauh:

$$
\text{Citra–Dewi}
$$

dengan distance sekitar:

$$
0.539
$$

Tetapi statement ini hanya berlaku:

> **under the current two-feature representation and Euclidean distance.**

Bukan universal similarity ranking.

---

# 27. Worked Example 5 — Siapa yang Nearest ke Alya?

Candidate distances:

$$
d(\text{Alya},\text{Bima})
\approx
0.236
$$

$$
d(\text{Alya},\text{Citra})
\approx
0.269
$$

$$
d(\text{Alya},\text{Dewi})
\approx
0.269
$$

Nearest pada toy representation:

$$
\text{Bima}
$$

Tetapi Citra dan Dewi mempunyai tie distance sekitar $0.269$ walaupun arah feature differences berbeda.

Ini memberi lesson penting:

> **satu scalar distance merangkum information dan dapat membuang arah perbedaan per component.**

Difference vectors Citra dan Dewi terhadap Alya tidak sama, walaupun magnitudes-nya sama.

---

# 28. Same Distance ≠ Same Difference Pattern

Alya ke Citra:

$$
\mathbf{x}^{(3)}-\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.10\\
0.25
\end{bmatrix}
$$

Alya ke Dewi:

$$
\mathbf{x}^{(1)}-\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.10\\
0.25
\end{bmatrix}
$$

Jika orientation konsisten dari Alya:

$$
\mathbf{x}^{(3)}-\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.10\\
0.25
\end{bmatrix}
$$

$$
\mathbf{x}^{(4)}-\mathbf{x}^{(1)}
=
\begin{bmatrix}
-0.10\\
-0.25
\end{bmatrix}
$$

Norm keduanya sama.

Jadi scalar distance tidak menunjukkan apakah candidate berada “di atas” atau “di bawah” Alya pada features.

Distance mengatakan **how far**, bukan **which direction**.

---

# 29. Distance dan Coordinate Geometry

Pada 2D, Euclidean distance adalah extension langsung dari Pythagorean theorem.

Untuk points:

$$
(x_1,y_1)
$$

dan:

$$
(x_2,y_2)
$$

distance:

$$
\sqrt{
(x_2-x_1)^2+(y_2-y_1)^2
}
$$

Dalam vector notation, ide sama ditulis lebih general:

$$
d(\mathbf{x},\mathbf{y})
=
\sqrt{
\sum_{j=1}^{d}(x_j-y_j)^2
}
$$

Keuntungan vector notation:

formula tetap berlaku ketika dimension lebih dari $2$.

Kita tidak perlu menggambar semua dimensions untuk menghitungnya.

---

# 30. Critical Safety — Distance Sangat Dipengaruhi Units dan Scale

Ini bagian paling penting untuk applied AI.

HerAI semula menggunakan:

1. quiz ratio $0$–$1$;
2. completion ratio $0$–$1$.

Sekarang bayangkan kita menambahkan:

3. study duration dalam minutes.

Alya:

$$
\begin{bmatrix}
0.80\\
0.75\\
45
\end{bmatrix}
$$

Bima:

$$
\begin{bmatrix}
0.60\\
0.625\\
30
\end{bmatrix}
$$

Raw difference:

$$
\begin{bmatrix}
0.20\\
0.125\\
15
\end{bmatrix}
$$

Euclidean distance:

$$
\sqrt{
0.20^2+0.125^2+15^2
}
$$

$$
=
\sqrt{
0.04+0.015625+225
}
$$

$$
=
\sqrt{
225.055625
}
$$

$$
\approx
15.002
$$

Perhatikan contributions:

- quiz difference squared: $0.04$;
- completion difference squared: $0.015625$;
- duration difference squared: $225$.

Study duration mendominasi.

Bukan otomatis karena duration “lebih penting”.

Ia mendominasi karena **numerical scale dan unit** jauh lebih besar.

scikit-learn menunjukkan bahwa distance-based K-neighbors dapat berubah drastis ketika features berada pada orders of magnitude yang berbeda, karena feature dengan scale lebih besar dapat mendominasi distances. [R6]

---

# 31. Unit Change Thought Experiment — Minutes ke Seconds

Real-world behavior tidak berubah jika kita hanya mengganti unit.

Alya:

$$
45\text{ minutes}
=
2700\text{ seconds}
$$

Bima:

$$
30\text{ minutes}
=
1800\text{ seconds}
$$

Difference duration:

$$
900\text{ seconds}
$$

Jika raw Euclidean distance dihitung tanpa scaling:

$$
\sqrt{
0.20^2+0.125^2+900^2
}
$$

akan mendekati:

$$
900
$$

Padahal participant behavior sama persis.

Hanya unit yang berubah.

Ini menunjukkan:

> **raw Euclidean distance tidak otomatis invariant terhadap unit choice.**

Maka units dan preprocessing bukan detail administratif.

Mereka mempengaruhi geometry feature space.

---

# 32. Jadi Haruskah Semua Features Dinormalisasi?

Jawaban beginner-safe:

> **Tidak ada satu rule “selalu” yang valid untuk semua problems.**

Namun jika numeric features mempunyai ranges yang sangat berbeda dan downstream method sensitif terhadap distance, scaling sering perlu dipertimbangkan. Google ML menjelaskan normalization sebagai transformasi untuk membawa features ke scale yang lebih comparable. [R5]

scikit-learn juga menunjukkan secara konkret bahwa K-neighbors dapat menghasilkan sangat berbeda pada scaled vs unscaled features karena distances berubah. [R6]

Di Topic ini kita hanya memegang principle:

> **audit scale sebelum mempercayai distance.**

Kita **belum** mendalami:

- Z-score derivation;
- mean/standard deviation;
- distribution analysis;
- advanced preprocessing design.

Itu akan memperoleh treatment lebih tepat pada Statistics.

---

# 33. Common Misconception — “Kalau Semua Feature Numeric, Distance Pasti Valid”

Tidak.

Numeric format bukan jaminan semantic comparability.

Contoh buruk:

$$
\mathbf{x}
=
\begin{bmatrix}
0.80\\
0.75\\
2
\end{bmatrix}
$$

dengan component ketiga:

`learning_style = 2`

jika angka $2$ hanyalah arbitrary category code.

Distance terhadap code tersebut dapat memperlakukan:

$$
1,\ 2,\ 3
$$

seolah memiliki meaningful interval.

Padahal belum tentu.

Submodule 01 sudah melarang interpretation seperti itu.

Rule:

> **Jangan masukkan arbitrary category code ke Euclidean geometry seolah code tersebut numerical quantity yang meaningful.**

---

# 34. Common Misconception — “Nearest = Paling Cocok Direkomendasikan”

Tidak otomatis.

Nearest under Euclidean distance hanya menjawab:

> “vector mana yang paling dekat menurut representation dan metric ini?”

Recommendation membutuhkan task definition.

Misalnya recommendation dapat membutuhkan:

- learning objective;
- material difficulty;
- participant needs;
- prerequisite;
- historical outcome;
- fairness constraints;
- evaluation.

Distance bisa menjadi salah satu signal.

Bukan otomatis decision.

---

# 35. Common Misconception — “Distance $0.20$ Berarti 80% Similar”

Salah.

Distance:

$$
0.20
$$

bukan probability.

Bukan similarity percentage.

Bukan confidence.

Bukan accuracy.

Ia adalah magnitude separation berdasarkan metric yang didefinisikan.

Jika ingin mengubah distance menjadi similarity score, perlu transformation yang didefinisikan dan dibenarkan.

Topic 06 nanti membahas cosine similarity, tetapi cosine similarity pun **bukan probability**.

---

# 36. Common Misconception — “Norm dan Distance Sama”

Mereka related, tetapi bukan identical concept.

Norm:

$$
\|\mathbf{x}\|_2
$$

mengukur magnitude satu vector relatif terhadap origin.

Distance:

$$
d(\mathbf{x},\mathbf{y})
$$

mengukur separation dua vectors.

Relationship:

$$
d(\mathbf{x},\mathbf{y})
=
\|\mathbf{x}-\mathbf{y}\|_2
$$

Jadi distance dapat dibangun dari norm difference.

---

# 37. Common Misconception — “Dimension Tinggi Berarti Norm Besar”

Tidak otomatis.

Vector:

$$
\mathbf{u}
=
\begin{bmatrix}
100\\
100
\end{bmatrix}
$$

dimension:

$$
2
$$

Vector:

$$
\mathbf{v}
=
\begin{bmatrix}
0.001\\
0.001\\
0.001\\
0.001\\
0.001
\end{bmatrix}
$$

dimension:

$$
5
$$

Walaupun $\mathbf{v}$ punya lebih banyak components, norm $\mathbf{u}$ jauh lebih besar.

Dimension = jumlah components.

Magnitude = size menurut norm.

---

# 38. Common Misconception — “Distance Selalu Harus Euclidean”

Tidak.

MIT mencatat bahwa ada berbagai distance notions, termasuk Manhattan-style alternatives. [R1]

scikit-learn nearest-neighbor tooling juga mendukung banyak metrics selain Euclidean. [R7]

Topic ini memilih Euclidean distance karena:

1. paling natural setelah coordinate geometry/Pythagoras;
2. mudah dihitung manual;
3. umum dalam applied ML;
4. menjadi fondasi yang baik untuk memahami geometry.

Tetapi:

> **metric adalah design choice.**

Google ML menekankan similarity measure perlu disesuaikan dengan real-world similarity yang ingin direpresentasikan. [R4]

---

# 39. Why This Matters in AI/ML

## 39.1 Nearest Neighbors

Nearest-neighbor methods mencari training samples yang closest menurut metric tertentu; scikit-learn menyebut standard Euclidean distance sebagai pilihan umum. [R7]

Intuition:

new participant vector  
↓  
compute distances ke existing participant vectors  
↓  
find nearest neighbors  
↓  
gunakan neighbors untuk downstream task tertentu

Ini hanya conceptual orientation.

Kita belum membangun classifier.

---

## 39.2 Clustering

Google ML menjelaskan k-means sebagai metode yang mengassign points ke centroid terdekat berdasarkan similarity/distance measure. [R4]

Artinya konsep “closest” bukan detail kecil.

Ia mempengaruhi cluster membership.

---

## 39.3 Recommendation / Retrieval

Dalam banyak representation systems, item atau user dapat direpresentasikan sebagai vectors, lalu kedekatan/similarity digunakan sebagai signal retrieval.

Tetapi metric yang tepat bergantung pada representation.

Untuk HerAI, kita belum boleh mengklaim:

> “Euclidean distance pada quiz/completion adalah production recommendation metric.”

Ini masih pedagogical toy geometry.

---

# 40. HerAI Running Case — Distance Audit

Canonical data:

| Participant | Quiz ratio $q$ | Completion ratio $c$ |
|---|---:|---:|
| Alya | $0.80$ | $0.75$ |
| Bima | $0.60$ | $0.625$ |
| Citra | $0.90$ | $1.00$ |
| Dewi | $0.70$ | $0.50$ |

Canonical vector schema:

$$
\mathbf{x}^{(i)}
=
\begin{bmatrix}
q^{(i)}\\
c^{(i)}
\end{bmatrix}
$$

Semua canonical features saat ini:

- meaningful numerical ratios;
- scale $0$–$1$;
- same order;
- same units/type of scale class.

Karena itu, toy Euclidean distance lebih pedagogically controlled daripada langsung mencampur duration minutes.

---

# 41. HerAI Nearest-Neighbor Reasoning — Jangan Hanya Ranking

Misalkan targetnya hanya exploratory:

> “Siapa participant dengan quiz/completion profile paling dekat dengan Bima?”

Distances:

$$
d(\text{Bima},\text{Alya})
\approx
0.236
$$

$$
d(\text{Bima},\text{Citra})
\approx
0.480
$$

$$
d(\text{Bima},\text{Dewi})
\approx
0.160
$$

Nearest:

$$
\text{Dewi}
$$

Tetapi sebelum operational decision, audit:

1. Apakah quiz/completion cukup untuk task?
2. Apakah current ratios comparable across participants?
3. Apakah time/context sama?
4. Apakah Euclidean metric sesuai?
5. Apakah material recommendation benar-benar terkait profile similarity?
6. Apakah outcome sudah dievaluasi?

Matematika memberi structure.

Evaluation memberi evidence.

---

# 42. Change One Thing — Tambahkan Duration

Versi dua feature:

$$
\mathbf{x}_{A}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

$$
\mathbf{x}_{B}
=
\begin{bmatrix}
0.60\\
0.625
\end{bmatrix}
$$

distance:

$$
\approx 0.236
$$

Versi tiga feature raw:

$$
\mathbf{x}'_{A}
=
\begin{bmatrix}
0.80\\
0.75\\
45
\end{bmatrix}
$$

$$
\mathbf{x}'_{B}
=
\begin{bmatrix}
0.60\\
0.625\\
30
\end{bmatrix}
$$

distance:

$$
\approx 15.002
$$

Apa yang berubah?

Bukan hanya dimension.

Geometry berubah karena component ketiga membawa unit dan scale jauh lebih besar.

---

# 43. Predict → Calculate → Interpret Pattern untuk Distance

Setiap kali menghitung distance:

## Step 1 — Predict

Feature mana yang berbeda paling banyak?

## Step 2 — Validate schema

Apakah positions bermakna sama?

## Step 3 — Validate units/scale

Apakah satu feature punya numerical range jauh lebih besar?

## Step 4 — Calculate

Gunakan formula.

## Step 5 — Interpret

Apa arti scalar result?

## Step 6 — Restrict claim

Distance berlaku under representation + metric yang didefinisikan.

Pattern ini jauh lebih aman daripada:

> “Masukkan angka → dapat distance → langsung buat keputusan.”

---

# 44. Try It Yourself 1 — Norm Dasar

Diberikan:

$$
\mathbf{v}
=
\begin{bmatrix}
5\\
12
\end{bmatrix}
$$

Sebelum menghitung, prediksi apakah norm lebih dekat ke:

A. $10$  
B. $13$  
C. $17$  
D. $25$

Lalu hitung:

$$
\|\mathbf{v}\|_2
$$

### Jawaban

$$
\|\mathbf{v}\|_2
=
\sqrt{25+144}
=
\sqrt{169}
=
13
$$

---

# 45. Try It Yourself 2 — Distance

Diberikan:

$$
\mathbf{a}
=
\begin{bmatrix}
2\\
1
\end{bmatrix}
$$

$$
\mathbf{b}
=
\begin{bmatrix}
5\\
5
\end{bmatrix}
$$

Hitung:

$$
d(\mathbf{a},\mathbf{b})
$$

### Solution

Difference:

$$
\mathbf{a}-\mathbf{b}
=
\begin{bmatrix}
-3\\
-4
\end{bmatrix}
$$

Distance:

$$
\sqrt{9+16}
=
5
$$

---

# 46. Try It Yourself 3 — HerAI

Hitung distance Bima–Dewi.

Bima:

$$
\begin{bmatrix}
0.60\\
0.625
\end{bmatrix}
$$

Dewi:

$$
\begin{bmatrix}
0.70\\
0.50
\end{bmatrix}
$$

### Step 1

$$
0.60-0.70=-0.10
$$

$$
0.625-0.50=0.125
$$

### Step 2

$$
(-0.10)^2=0.01
$$

$$
0.125^2=0.015625
$$

### Step 3

$$
0.01+0.015625=0.025625
$$

### Step 4

$$
\sqrt{0.025625}
\approx
0.160
$$

---

# 47. Try It Yourself 4 — Scale Audit

Dua vectors:

$$
\mathbf{a}
=
\begin{bmatrix}
0.80\\
0.75\\
120
\end{bmatrix}
$$

$$
\mathbf{b}
=
\begin{bmatrix}
0.70\\
0.65\\
60
\end{bmatrix}
$$

Schema:

1. quiz ratio;
2. completion ratio;
3. duration minutes.

Tanpa menghitung exact square root:

1. component mana yang mendominasi raw Euclidean distance?
2. apakah itu membuktikan duration adalah feature paling important?
3. apa yang perlu diaudit sebelum distance digunakan?

### Expected reasoning

Duration difference:

$$
60
$$

jauh lebih besar numerical scale daripada ratio differences:

$$
0.10
$$

dan:

$$
0.10
$$

Maka duration akan mendominasi raw Euclidean distance.

Ini tidak membuktikan causal/predictive importance.

---

# 48. Misconception Challenge — Audit Delapan Pernyataan

Tentukan **aman** atau **bermasalah**.

## Statement 1

> “Norm adalah jumlah components.”

Bermasalah.

## Statement 2

> “Euclidean distance adalah norm dari difference vector.”

Aman.

## Statement 3

> “Jika distance kecil, probability dua participant punya outcome sama pasti besar.”

Bermasalah.

## Statement 4

> “Distance dipengaruhi feature scale.”

Aman.

## Statement 5

> “Mengganti minutes menjadi seconds dapat mengubah raw Euclidean distance jika preprocessing tidak menyesuaikan scale.”

Aman.

## Statement 6

> “Dimension dan magnitude adalah konsep yang sama.”

Bermasalah.

## Statement 7

> “Euclidean distance adalah satu metric choice, bukan satu-satunya possible metric.”

Aman.

## Statement 8

> “Nearest under current representation berarti universally most similar.”

Bermasalah.

---

# 49. [STATIC VISUAL] Norm sebagai Panjang Arrow

**Learning purpose:** menghubungkan vector components dengan magnitude.

**Initial state/data:**

$$
\mathbf{v}
=
\begin{bmatrix}
3\\
4
\end{bmatrix}
$$

Tampilkan coordinate plane, arrow origin→$(3,4)$, horizontal leg $3$, vertical leg $4$, hypotenuse $5$.

**Learner action:** tidak wajib; visual static.

**Expected behavior:** peserta melihat square components sebagai Pythagorean legs.

**Feedback:** label:

- component 1 = $3$;
- component 2 = $4$;
- norm = $5$.

**Safety note:** arrow geometry merepresentasikan vector; bukan lokasi fisik real-world object.

---

# 50. [NUMBER MANIPULATOR] Norm Component Sliders

**Learning purpose:** membangun sensitivity intuition.

**Initial state/data:**

$$
\mathbf{v}
=
\begin{bmatrix}
3\\
4
\end{bmatrix}
$$

**Learner action:** slider $v_1$ dan $v_2$ dari $-6$ sampai $6$.

**Expected behavior:**

- arrow berubah;
- squared contributions diperbarui;
- norm diperbarui;
- sign flip sendiri tidak mengubah squared contribution magnitude.

**Feedback:** tampilkan breakdown:

$$
v_1^2+v_2^2
$$

sebelum square root.

**Safety note:** norm bukan “score kualitas”.

---

# 51. [STEP-BY-STEP REVEAL] Distance Builder

**Learning purpose:** memastikan peserta memahami pipeline difference→square→sum→root.

**Initial state/data:**

$$
\mathbf{u}
=
\begin{bmatrix}
1\\
2
\end{bmatrix}
$$

$$
\mathbf{v}
=
\begin{bmatrix}
4\\
6
\end{bmatrix}
$$

**Learner action:** klik `Next`.

**Expected behavior:**

1. reveal matching differences;
2. reveal squares;
3. reveal sum;
4. reveal square root;
5. reveal interpretation.

**Feedback:** jika learner memilih “distance = difference vector”, tandai:

> difference vector masih vector; distance harus scalar.

---

# 52. [COMPARE VIEW] Difference Vector vs Distance

**Learning purpose:** memisahkan direction information dari scalar separation.

**Initial state/data:**

left:

$$
\mathbf{x}-\mathbf{y}
$$

right:

$$
d(\mathbf{x},\mathbf{y})
$$

**Learner action:** swap order.

**Expected behavior:**

- left vector flips sign;
- right distance tetap.

**Feedback:** “Direction changed; separation did not.”

---

# 53. [INTERACTIVE VISUAL] HerAI Distance Explorer

**Learning purpose:** melihat pairwise closeness pada persistent dataset.

**Initial state/data:**

Alya, Bima, Citra, Dewi pada 2D plane:

- x-axis = quiz ratio;
- y-axis = completion ratio.

**Learner action:** pilih participant A dan B.

**Expected behavior:**

- line segment connecting points;
- horizontal/vertical differences;
- Euclidean distance;
- safe interpretation label.

**Feedback example:**

> “Bima–Dewi distance ≈ 0.160 under q/c representation.”

**Safety note:** jangan label sebagai probability atau percentage similarity.

---

# 54. [COMPARE VIEW] Scale Trap — 2D vs 3D Raw Features

**Learning purpose:** menunjukkan effect study duration scale.

**Initial state/data:**

Panel A:

- q;
- c.

Panel B:

- q;
- c;
- duration minutes.

**Learner action:** toggle duration `off/on`.

**Expected behavior:**

- raw distance berubah drastis;
- contribution bars menunjukkan squared contribution setiap feature.

**Feedback:** highlight bahwa duration dominates due to raw scale, not proven importance.

**Safety note:** jangan otomatis menawarkan normalization formula; cukup beri note bahwa scaling/preprocessing harus dipertimbangkan.

---

# 55. Checkpoint 1 — Norm

Untuk:

$$
\mathbf{v}
=
\begin{bmatrix}
3\\
4
\end{bmatrix}
$$

mana benar?

A. dimension $5$  
B. norm $5$  
C. distance ke origin negative  
D. probability $5$

**Jawaban:** B.

---

# 56. Checkpoint 2 — Zero

Jika:

$$
\mathbf{x}=\mathbf{0}
$$

maka:

$$
\|\mathbf{x}\|_2=?
$$

**Jawaban:**

$$
0
$$

---

# 57. Checkpoint 3 — Distance

Jika:

$$
\mathbf{x}=\mathbf{y}
$$

maka:

$$
d(\mathbf{x},\mathbf{y})=?
$$

**Jawaban:**

$$
0
$$

---

# 58. Checkpoint 4 — Symmetry

True atau false:

$$
d(\mathbf{x},\mathbf{y})
=
d(\mathbf{y},\mathbf{x})
$$

untuk Euclidean distance.

**Jawaban:** true.

---

# 59. Checkpoint 5 — Scale

Quiz ratio berbeda $0.1$.

Duration minutes berbeda $50$.

Jika raw values digabung tanpa scaling, apakah duration kemungkinan besar mendominasi Euclidean distance?

**Jawaban:** ya, karena numerical magnitude difference jauh lebih besar.

Itu **tidak** membuktikan duration paling important.

---

# 60. Checkpoint 6 — Semantics

Dua participant distance:

$$
0.12
$$

Apakah valid menyatakan:

> “Mereka 88% mirip”?

**Jawaban:** tidak.

Tidak ada transformation dari distance ke percentage similarity yang didefinisikan.

---

# 61. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan norm sebagai magnitude satu vector.
- [ ] **I can** membaca $\|\mathbf{x}\|_2$.
- [ ] **I can** menghitung L2 norm 2D/3D langkah demi langkah.
- [ ] **I can** membedakan dimension dari magnitude.
- [ ] **I can** menjelaskan distance sebagai norm dari difference vector.
- [ ] **I can** membaca $d(\mathbf{x},\mathbf{y})$.
- [ ] **I can** menghitung Euclidean distance.
- [ ] **I can** menjelaskan mengapa distance nonnegative.
- [ ] **I can** menjelaskan symmetry Euclidean distance.
- [ ] **I can** menjelaskan bahwa difference vector dan distance bukan object yang sama.
- [ ] **I can** membandingkan HerAI participant vectors menggunakan distance.
- [ ] **I can** membatasi interpretation menjadi “under this representation and metric”.
- [ ] **I can** menjelaskan mengapa feature scale mempengaruhi Euclidean distance.
- [ ] **I can** menjelaskan unit-change trap minutes→seconds.
- [ ] **I can** menolak arbitrary category codes dalam raw Euclidean geometry.
- [ ] **I can** menjelaskan nearest ≠ automatically best recommendation.
- [ ] **I can** menjelaskan distance ≠ probability/confidence.
- [ ] **I can** menjelaskan metric choice adalah design decision.
- [ ] **I can** menjelaskan mengapa norm besar bukan universal “lebih baik”.
- [ ] **I can** menjelaskan apa yang masih belum dipelajari: dot product dan cosine similarity.

Jika lebih dari tiga checklist belum yakin, ulangi:

- Worked Example 1;
- HerAI Worked Example 3;
- Scale Trap;
- Misconception Challenge.

---

# 62. Why This Matters Later

Topic 04 memberi fondasi geometry.

Kita sekarang sudah dapat:

1. represent participant sebagai vector;
2. membaca components;
3. melakukan vector operations;
4. mengukur magnitude;
5. mengukur Euclidean distance.

Tetapi distance hanya satu cara membandingkan vectors.

Ada pertanyaan baru.

Misalnya dua vectors:

$$
\mathbf{u}
=
\begin{bmatrix}
1\\
1
\end{bmatrix}
$$

dan:

$$
\mathbf{v}
=
\begin{bmatrix}
10\\
10
\end{bmatrix}
$$

mempunyai direction yang sama tetapi magnitude sangat berbeda.

Bagaimana kita membangun operasi yang membantu menghubungkan components dua vectors secara lebih langsung?

Itu membawa kita ke **dot product**.

Dan setelah dot product, kita akan dapat memahami **cosine similarity**, yang menekankan directional alignment.

---

# 63. Summary

Pada Topic 04 kita belajar bahwa Linear Algebra bukan hanya menyimpan dan mengubah vectors.

Kita juga membutuhkan tools untuk mengukur geometry.

## Core Concept 1 — Norm

$$
\|\mathbf{x}\|_2
=
\sqrt{
\sum_{j=1}^{d}x_j^2
}
$$

Norm menghasilkan satu scalar nonnegative yang mengukur Euclidean magnitude vector.

## Core Concept 2 — Distance

$$
d(\mathbf{x},\mathbf{y})
=
\|\mathbf{x}-\mathbf{y}\|_2
$$

atau:

$$
d(\mathbf{x},\mathbf{y})
=
\sqrt{
\sum_{j=1}^{d}(x_j-y_j)^2
}
$$

## Core Concept 3 — Difference ≠ Distance

Difference:

$$
\mathbf{x}-\mathbf{y}
$$

adalah vector.

Distance:

$$
d(\mathbf{x},\mathbf{y})
$$

adalah scalar.

## Core Concept 4 — Dimension ≠ Magnitude

Dimension = number of components.

Norm = magnitude.

## Core Concept 5 — Distance Depends on Representation

Distance hanya meaningful dengan:

- same feature semantics;
- same order;
- meaningful numeric features;
- units/scale yang dipahami;
- metric yang sesuai task.

## Core Concept 6 — Scale Matters

Feature dengan numerical range besar dapat mendominasi raw Euclidean distance.

## Core Concept 7 — Nearest is Conditional

“Nearest” selalu perlu dilengkapi:

> **nearest under which representation and metric?**

---

# 64. Bridge ke Topic 05

Kita sekarang dapat menghitung:

$$
\|\mathbf{x}\|_2
$$

dan:

$$
d(\mathbf{x},\mathbf{y})
$$

Tetapi kita belum punya operasi yang secara langsung:

- memasangkan corresponding components;
- mengalikan pairs;
- menjumlahkan hasilnya menjadi scalar;
- dan kemudian dapat dihubungkan dengan geometric alignment.

Topic berikutnya:

# Topic 05 — Dot Product: Menggabungkan Dua Vektor Secara Matematis

Kita akan membangun dari operasi yang sudah dikenal:

**matching components → multiply → sum → scalar**

tanpa langsung melompat ke cosine similarity.

---

# 65. References

## [R1] MIT OpenCourseWare — Digression on Length and Distance in Vector Spaces

Mendukung:

- distance as length of difference vector;
- Euclidean distance;
- Pythagorean interpretation;
- existence of alternative distance notions;
- basic norm/distance properties.

https://ocw.mit.edu/ans7870/18/18.013a/textbook/HTML/chapter03/section08.html

## [R2] MIT OpenCourseWare — Lecture 8: Norms of Vectors and Matrices

Mendukung:

- norm as a way to measure size;
- L1/L2/L-infinity orientation;
- vector norm terminology.

https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/resources/lecture-8-norms-of-vectors-and-matrices/

## [R3] Stephen Boyd & Lieven Vandenberghe — Introduction to Applied Linear Algebra: Vectors, Matrices, and Least Squares

Mendukung:

- applied vector notation;
- vector norms;
- distance and geometry within applied Linear Algebra.

https://stanford.edu/~boyd/vmls/

## [R4] Google for Developers — Machine Learning: Manual Similarity Measure

Mendukung:

- “closest” depends on similarity measure;
- similarity measure must reflect intended real-world similarity;
- preprocessing matters;
- k-means uses closeness to centroid.

https://developers.google.com/machine-learning/clustering/kmeans/manual-similarity

## [R5] Google for Developers — Machine Learning Crash Course: Numerical Data — Normalization

Mendukung:

- features on very different ranges;
- normalization/scaling as preprocessing;
- scale can affect how models treat features.

https://developers.google.com/machine-learning/crash-course/numerical-data/normalization

## [R6] scikit-learn — Importance of Feature Scaling

Mendukung:

- distance-sensitive K-neighbors can change dramatically with feature scaling;
- large-scale feature can dominate distances;
- scaling can materially change nearest-neighbor geometry.

https://scikit-learn.org/stable/auto_examples/preprocessing/plot_scaling_importance.html

## [R7] scikit-learn — Nearest Neighbors User Guide

Mendukung:

- nearest-neighbor methods find samples closest in distance;
- Euclidean distance is a common metric;
- multiple distance metrics are supported.

https://scikit-learn.org/stable/modules/neighbors.html

## [R8] KaTeX — Supported Functions

Mendukung source/render contract untuk notation seperti `\sqrt`, `\sum`, `\begin{bmatrix}`, `\lVert`, dan standard math syntax.

https://katex.org/docs/supported.html

---

# 66. QA Notes

## Academic QA

- Norm tidak disamakan dengan dimension.
- Norm tidak disebut participant quality score.
- Distance didefinisikan sebagai L2 norm dari difference vector.
- Difference vector tetap dibedakan dari scalar distance.
- Euclidean distance tidak disebut satu-satunya distance metric.
- Distance kecil tidak disebut probability/similarity percentage.
- Nearest tidak disebut otomatis recommendation terbaik.
- Feature scale/unit diberi treatment eksplisit.
- Arbitrary categorical numeric code tetap dilarang.
- Study duration hanya digunakan untuk scale demonstration yang terkontrol.
- Scaling disebut sebagai preprocessing orientation; Statistics detail tidak dicuri.
- AI/ML connection menyebut nearest neighbors/clustering dengan interpretation limits.

## Mathematical QA

Canonical formulas:

$$
\|\mathbf{x}\|_2
=
\sqrt{
\sum_{j=1}^{d}x_j^2
}
$$

$$
d(\mathbf{x},\mathbf{y})
=
\|\mathbf{x}-\mathbf{y}\|_2
$$

$$
d(\mathbf{x},\mathbf{y})
=
\sqrt{
\sum_{j=1}^{d}(x_j-y_j)^2
}
$$

Checked HerAI values:

- Alya–Bima $\approx 0.236$;
- Alya–Citra $\approx 0.269$;
- Alya–Dewi $\approx 0.269$;
- Bima–Citra $\approx 0.480$;
- Bima–Dewi $\approx 0.160$;
- Citra–Dewi $\approx 0.539$.

Raw Alya–Bima with duration minutes:

$$
\approx 15.002
$$

## Notation QA

Maintained:

- scalar non-bold;
- vector bold lowercase;
- participant vector $\mathbf{x}^{(i)}$;
- component $x_j$ / $x_j^{(i)}$;
- dimension $d$;
- norm $\|\mathbf{x}\|_2$;
- distance $d(\mathbf{x},\mathbf{y})$.

No matrix notation introduced.

## Dependency QA

Topic 04 uses:

- subtraction from Topic 03;
- dimension/components from Topic 02;
- semantics/order from Topic 01–02.

Topic 04 does not formally teach:

- dot product;
- cosine similarity;
- matrix;
- matrix multiplication;
- probability;
- gradient;
- optimizer;
- PCA/SVD/eigen topics.

## Markdown + KaTeX Contract

- inline math uses `$...$`;
- display math uses `$$...$$`;
- no equation images;
- no intentional formula in fenced code block;
- formulas use standard KaTeX-safe syntax.

**Browser-level KaTeX PASS is not claimed.**

Runtime render testing remains frontend integration work.

---

# STOP CHECKPOINT

Topic 04 selesai pada:

**norm → Euclidean distance → scale/metric safety.**

Topic 05 belum diproduksi di file ini.

> **Apakah Topic 04 Submodule 02 disetujui dan kita boleh melanjutkan ke Topic 05?**
