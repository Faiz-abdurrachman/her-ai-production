# Topic 06 — Cosine Similarity: Membandingkan Arah, Bukan Sekadar Besar

> **Submodul 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks**  
> **Filename:** `06-cosine-similarity.md`  
> **Level:** Beginner → Early Intermediate  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 65–85 menit membaca + 35–50 menit latihan/interaksi  
> **Prerequisite:** Topic 01–05 Submodul 02, terutama norm dan dot product  
> **Forward dependency:** Topic 07 — Matrix: Banyak Observation dalam Satu Struktur  
> **Boundary:** topik ini mengajarkan cosine similarity secara penuh pada vector real nonzero. Matrix, pairwise similarity matrix, dan matrix multiplication belum diajarkan.

---

# 1. Mengapa Topik Ini Ada?

Pada Topic 05 kita belajar bahwa dot product menggabungkan dua vector menjadi satu scalar:

$$
\mathbf{x}^{\top}\mathbf{y}
=
\sum_{j=1}^{d}x_jy_j
$$

Kita juga melihat geometric interpretation:

$$
\mathbf{x}^{\top}\mathbf{y}
=
\|\mathbf{x}\|_2\,\|\mathbf{y}\|_2\cos(\theta)
$$

Artinya raw dot product dipengaruhi oleh **dua hal sekaligus**:

1. arah relatif kedua vector;
2. magnitude atau panjang kedua vector.

Itu bukan kesalahan. Justru pada beberapa task, magnitude memang merupakan signal yang ingin dipertahankan. Google menjelaskan bahwa dot product pada embedding mempertimbangkan angle sekaligus vector length, sedangkan cosine similarity memusatkan perhatian pada angle atau arah relatif. [R3][R4]

Namun muncul pertanyaan baru:

> **Bagaimana jika kita ingin membandingkan pola arah dua vector tanpa membiarkan panjang vector mendominasi hasil?**

Inilah alasan kita membutuhkan **cosine similarity**.

Scikit-learn mendefinisikan cosine similarity sebagai **normalized dot product**: dot product dibagi product dari kedua L2 norms. [R2]

Topik ini penting karena similarity muncul di banyak sistem AI, termasuk:

- embedding retrieval;
- text/document similarity;
- candidate generation pada recommender;
- clustering dan grouping berbasis representation;
- nearest-neighbor style retrieval dengan metric tertentu.

Tetapi sejak awal kita menetapkan empat aturan keselamatan:

> **Cosine similarity bukan probability.**

> **Cosine similarity bukan dot product mentah.**

> **Cosine similarity tinggi tidak membuktikan causation.**

> **Cosine similarity hanya bermakna jika vector space dan semantics-nya memang relevan terhadap task.**

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 06, kamu diharapkan mampu:

1. menjelaskan mengapa raw dot product dapat dipengaruhi magnitude;
2. menjelaskan intuition cosine similarity sebagai directional alignment;
3. menuliskan formula cosine similarity dengan notation yang benar;
4. mendefinisikan setiap symbol pada formula;
5. membaca cosine similarity sebagai normalized dot product;
6. menghitung L2 norm yang diperlukan untuk cosine similarity;
7. menghitung dot product sebagai numerator;
8. menghitung denominator sebagai product dari dua nonzero norms;
9. menghitung cosine similarity langkah demi langkah sampai selesai;
10. menginterpretasikan nilai mendekati $1$, $0$, dan $-1$ pada vector real;
11. menjelaskan mengapa cosine similarity membutuhkan vector dengan nonzero norm;
12. membedakan mathematical undefined case dari numerical-library convention;
13. menjelaskan mengapa positive rescaling tidak mengubah cosine similarity;
14. membedakan cosine similarity dari Euclidean distance;
15. membedakan cosine similarity dari raw dot product;
16. menjelaskan mengapa nilai $0.97$ tidak otomatis berarti probability $97\%$;
17. membangun toy HerAI need vector dari quiz/completion gap;
18. membandingkan participant need vector dan material support vector pada shared axes;
19. mengaudit apakah dua vector memiliki compatible semantics sebelum dibandingkan;
20. menjelaskan bahwa pemilihan similarity metric merupakan design choice yang harus cocok dengan task;
21. membaca penggunaan cosine similarity pada embedding/recommendation secara beginner-safe;
22. menjelaskan mengapa high similarity tidak otomatis berarti recommendation terbaik;
23. mendeteksi misconception pada klaim similarity;
24. menjelaskan bagaimana Topic 06 menyiapkan peserta untuk matrix pada Topic 07.

---

# 3. Prerequisite Recall — Apa yang Sudah Kita Punya?

Kita tidak mulai dari nol.

Dari Topic 01–05, kamu sudah memiliki:

- scalar;
- vector;
- component;
- dimension;
- feature order;
- vector addition/subtraction/scalar multiplication;
- L2 norm;
- Euclidean distance;
- dot product;
- geometric interpretation dari dot product.

## 3.1 Norm

Untuk:

$$
\mathbf{x}
=
\begin{bmatrix}
x_1\\
x_2\\
\vdots\\
x_d
\end{bmatrix}
$$

L2 norm adalah:

$$
\|\mathbf{x}\|_2
=
\sqrt{
\sum_{j=1}^{d}x_j^2
}
$$

Norm memberi magnitude vector.

## 3.2 Dot product

Untuk dua vector dengan dimension yang compatible:

$$
\mathbf{x}^{\top}\mathbf{y}
=
\sum_{j=1}^{d}x_jy_j
$$

Dot product menghasilkan scalar.

## 3.3 Geometric connection

Jika $\mathbf{x}$ dan $\mathbf{y}$ nonzero:

$$
\mathbf{x}^{\top}\mathbf{y}
=
\|\mathbf{x}\|_2\|\mathbf{y}\|_2\cos(\theta)
$$

Di sinilah cosine similarity akan muncul secara natural.

---

# 4. Pertanyaan Pemantik

Bayangkan sebuah query vector:

$$
\mathbf{q}
=
\begin{bmatrix}
1\\
0
\end{bmatrix}
$$

Ada dua candidate vectors:

$$
\mathbf{a}
=
\begin{bmatrix}
5\\
5
\end{bmatrix}
$$

$$
\mathbf{b}
=
\begin{bmatrix}
2\\
0.2
\end{bmatrix}
$$

Raw dot products:

$$
\mathbf{q}^{\top}\mathbf{a}
=
1(5)+0(5)=5
$$

$$
\mathbf{q}^{\top}\mathbf{b}
=
1(2)+0(0.2)=2
$$

Jika hanya melihat dot product:

$$
5>2
$$

maka $\mathbf{a}$ tampak lebih aligned.

Tetapi lihat arah secara visual.

- $\mathbf{q}$ mengarah penuh ke horizontal positif;
- $\mathbf{b}$ hampir horizontal;
- $\mathbf{a}$ membentuk arah diagonal.

Pertanyaannya:

> Jika kita ingin membandingkan **arah**, apakah raw dot product sudah cukup?

Jawabannya: belum tentu.

Magnitude $\mathbf{a}$ jauh lebih besar dan dapat mendorong dot product naik.

---

# 5. Predict Before Calculate

Jangan hitung cosine similarity dulu.

Gunakan reasoning.

## Prediksi A

Diberikan:

$$
\mathbf{x}
=
\begin{bmatrix}
1\\
1
\end{bmatrix}
$$

$$
\mathbf{y}
=
\begin{bmatrix}
10\\
10
\end{bmatrix}
$$

Apakah arah keduanya sama?

**Prediksi:** ya.

Walaupun magnitude berbeda sepuluh kali, ratio components sama.

## Prediksi B

Jika $\mathbf{y}=10\mathbf{x}$, apakah ukuran directional similarity seharusnya berubah hanya karena vector dipanjangkan?

Jika target kita benar-benar **directional alignment**, intuitively jawabannya:

> seharusnya tidak.

## Prediksi C

Diberikan:

$$
\mathbf{x}
=
\begin{bmatrix}
1\\
0
\end{bmatrix},
\qquad
\mathbf{y}
=
\begin{bmatrix}
0\\
1
\end{bmatrix}
$$

Keduanya tegak lurus.

Prediksi cosine-nya:

$$
0
$$

## Prediksi D

Jika cosine similarity menghasilkan $0.95$, apakah artinya probability dua item cocok adalah $95\%$?

**Tidak.**

Nilai cosine similarity adalah geometric similarity score yang semantics-nya bergantung pada representation dan task. [R2][R3]

---

# 6. Intuisi — Dari Dot Product ke “Arah Saja”

Bayangkan dua anak panah dari origin.

Raw dot product dapat meningkat karena:

- angle lebih kecil;
- vector pertama lebih panjang;
- vector kedua lebih panjang;
- kombinasi ketiganya.

Jika kita ingin mengisolasi angle, kita perlu membuang pengaruh magnitude.

Caranya:

> bagi dot product dengan product dari kedua norms.

Karena:

$$
\mathbf{x}^{\top}\mathbf{y}
=
\|\mathbf{x}\|_2\|\mathbf{y}\|_2\cos(\theta)
$$

maka untuk nonzero vectors:

$$
\frac{
\mathbf{x}^{\top}\mathbf{y}
}{
\|\mathbf{x}\|_2\|\mathbf{y}\|_2
}
=
\cos(\theta)
$$

Ini adalah ide inti cosine similarity. [R2][R3]

---

# 7. Concrete Example — Dua Vector yang Arah Sama

Gunakan:

$$
\mathbf{x}
=
\begin{bmatrix}
1\\
1
\end{bmatrix}
$$

$$
\mathbf{y}
=
\begin{bmatrix}
10\\
10
\end{bmatrix}
$$

## Step 1 — Dot product

$$
\mathbf{x}^{\top}\mathbf{y}
=
1(10)+1(10)
$$

$$
=20
$$

## Step 2 — Norm $\mathbf{x}$

$$
\|\mathbf{x}\|_2
=
\sqrt{1^2+1^2}
$$

$$
=\sqrt{2}
$$

## Step 3 — Norm $\mathbf{y}$

$$
\|\mathbf{y}\|_2
=
\sqrt{10^2+10^2}
$$

$$
=\sqrt{200}
=10\sqrt{2}
$$

## Step 4 — Cosine similarity

$$
\frac{20}{(\sqrt{2})(10\sqrt{2})}
$$

Denominator:

$$
(\sqrt{2})(10\sqrt{2})
=
10(2)
=20
$$

Maka:

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})
=
\frac{20}{20}
=1
$$

Interpretasi:

> kedua vector memiliki arah yang sama walaupun magnitude berbeda.

---

# 8. Definisi Formal

Untuk dua real vectors nonzero:

$$
\mathbf{x},\mathbf{y}\in\mathbb{R}^{d}
$$

cosine similarity didefinisikan sebagai:

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})
=
\frac{
\mathbf{x}^{\top}\mathbf{y}
}{
\|\mathbf{x}\|_2\|\mathbf{y}\|_2
}
$$

dengan syarat:

$$
\|\mathbf{x}\|_2>0
$$

serta:

$$
\|\mathbf{y}\|_2>0
$$

Scikit-learn menyebut formula ini normalized dot product. [R2]

---

# 9. Notasi — Jangan Ada Symbol Tanpa Makna

## 9.1 $\mathbf{x}$

Bold lowercase menunjukkan vector pertama.

## 9.2 $\mathbf{y}$

Bold lowercase menunjukkan vector kedua.

## 9.3 $d$

Dimension atau jumlah components pada masing-masing vector.

Kedua vector harus berada pada feature space yang compatible untuk interpretation yang kita inginkan.

## 9.4 $\mathbf{x}^{\top}\mathbf{y}$

Dot product antara $\mathbf{x}$ dan $\mathbf{y}$.

## 9.5 $\|\mathbf{x}\|_2$

L2 norm dari $\mathbf{x}$.

## 9.6 $\|\mathbf{y}\|_2$

L2 norm dari $\mathbf{y}$.

## 9.7 $\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})$

Nama function untuk cosine similarity.

## 9.8 $\theta$

Angle antara dua nonzero vectors pada geometric interpretation.

---

# 10. Formula Contract

Formula utama:

$$
\boxed{
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})
=
\frac{
\mathbf{x}^{\top}\mathbf{y}
}{
\|\mathbf{x}\|_2\|\mathbf{y}\|_2
}
}
$$

## Cara membaca dalam bahasa manusia

> “Cosine similarity antara vector x dan y adalah dot product x dengan y, dibagi hasil kali norm x dan norm y.”

## Arti konsep

Numerator mengukur combined alignment + magnitude.

Denominator menghapus scale magnitude dari kedua vector.

Hasil akhirnya memusatkan perhatian pada directional alignment. [R2][R3]

## Kapan digunakan?

Cosine similarity cocok ketika task membutuhkan comparison yang lebih fokus pada orientation/pattern daripada absolute vector magnitude.

Contoh nyata pada ML termasuk embedding similarity dan candidate generation pada recommender, tergantung representation dan objective. [R3][R4]

## Assumptions / constraints

1. vector dimensions harus compatible;
2. feature axes harus compatible secara semantics;
3. kedua vector harus nonzero untuk definisi matematis standar;
4. hasil adalah similarity score, bukan probability;
5. nilai tinggi hanya bermakna relatif terhadap representation dan task.

---

# 11. Math Reading Skill — Pecah Formula Menjadi Tiga Bagian

Saat melihat:

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})
=
\frac{
\mathbf{x}^{\top}\mathbf{y}
}{
\|\mathbf{x}\|_2\|\mathbf{y}\|_2
}
$$

jangan langsung melihat “satu formula besar”.

Baca sebagai tiga subtask.

## Subtask 1 — Numerator

$$
N
=
\mathbf{x}^{\top}\mathbf{y}
$$

## Subtask 2 — Denominator

$$
D
=
\|\mathbf{x}\|_2\|\mathbf{y}\|_2
$$

## Subtask 3 — Ratio

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})
=
\frac{N}{D}
$$

Strategi ini mengurangi cognitive load dan membantu audit kesalahan.

---

# 12. Mengapa Disebut “Cosine”?

Dari geometric dot product:

$$
\mathbf{x}^{\top}\mathbf{y}
=
\|\mathbf{x}\|_2\|\mathbf{y}\|_2\cos(\theta)
$$

maka:

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})
=
\cos(\theta)
$$

untuk nonzero vectors.

Karena cosine bergantung pada angle, bukan panjang vector secara langsung, measure ini memberi directional comparison. Google menjelaskan perbedaan ini secara eksplisit: cosine berfokus pada angle, sedangkan dot product ikut berubah dengan vector length. [R3]

---

# 13. Range Cosine Similarity

Untuk real nonzero vectors:

$$
-1
\le
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})
\le
1
$$

## 13.1 Nilai $1$

Jika:

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})=1
$$

kedua vector memiliki arah yang sama.

Angle:

$$
\theta=0^\circ
$$

## 13.2 Nilai $0$

Jika:

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})=0
$$

keduanya orthogonal pada geometric interpretation.

Angle:

$$
\theta=90^\circ
$$

## 13.3 Nilai $-1$

Jika:

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})=-1
$$

keduanya mengarah berlawanan.

Angle:

$$
\theta=180^\circ
$$

## Safety note

Nilai negatif hanya mungkin jika coordinate signs memungkinkan opposite-direction relationship.

Pada HerAI toy vectors yang semua components-nya nonnegative, cosine values kita cenderung berada pada range nonnegative.

Jangan menyimpulkan bahwa “cosine selalu 0 sampai 1”. Itu tergantung domain vector.

---

# 14. Worked Example 1 — Basic 2D Cosine Similarity

Gunakan:

$$
\mathbf{x}
=
\begin{bmatrix}
3\\
4
\end{bmatrix}
$$

serta:

$$
\mathbf{y}
=
\begin{bmatrix}
4\\
3
\end{bmatrix}
$$

## Step 1 — Dot product

$$
\mathbf{x}^{\top}\mathbf{y}
=
3(4)+4(3)
$$

$$
=12+12
$$

$$
=24
$$

## Step 2 — Norm $\mathbf{x}$

$$
\|\mathbf{x}\|_2
=
\sqrt{3^2+4^2}
$$

$$
=\sqrt{9+16}
$$

$$
=\sqrt{25}
$$

$$
=5
$$

## Step 3 — Norm $\mathbf{y}$

$$
\|\mathbf{y}\|_2
=
\sqrt{4^2+3^2}
$$

$$
=\sqrt{16+9}
$$

$$
=5
$$

## Step 4 — Denominator

$$
\|\mathbf{x}\|_2\|\mathbf{y}\|_2
=
5(5)
=25
$$

## Step 5 — Divide

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})
=
\frac{24}{25}
$$

$$
=0.96
$$

## Interpretation

Directional alignment kedua vector tinggi.

Tetapi:

> $0.96$ bukan probability $96\%$.

Ia adalah geometric similarity score berdasarkan representation ini.

---

# 15. Worked Example 2 — Dot Product Ranking Bisa Berbeda dari Cosine Ranking

Kembali ke:

$$
\mathbf{q}
=
\begin{bmatrix}
1\\
0
\end{bmatrix}
$$

Candidate A:

$$
\mathbf{a}
=
\begin{bmatrix}
5\\
5
\end{bmatrix}
$$

Candidate B:

$$
\mathbf{b}
=
\begin{bmatrix}
2\\
0.2
\end{bmatrix}
$$

## 15.1 Raw dot product dengan A

$$
\mathbf{q}^{\top}\mathbf{a}
=
5
$$

## 15.2 Raw dot product dengan B

$$
\mathbf{q}^{\top}\mathbf{b}
=
2
$$

Dot product ranking:

$$
A>B
$$

Sekarang cosine.

## 15.3 Cosine dengan A

Norm query:

$$
\|\mathbf{q}\|_2=1
$$

Norm A:

$$
\|\mathbf{a}\|_2
=
\sqrt{5^2+5^2}
$$

$$
=\sqrt{50}
\approx7.071
$$

Cosine:

$$
\operatorname{cos\_sim}(\mathbf{q},\mathbf{a})
=
\frac{5}{1(7.071)}
$$

$$
\approx0.707
$$

## 15.4 Cosine dengan B

Norm B:

$$
\|\mathbf{b}\|_2
=
\sqrt{2^2+0.2^2}
$$

$$
=\sqrt{4.04}
$$

$$
\approx2.010
$$

Cosine:

$$
\operatorname{cos\_sim}(\mathbf{q},\mathbf{b})
=
\frac{2}{1(2.010)}
$$

$$
\approx0.995
$$

Cosine ranking:

$$
B>A
$$

## Apa yang terjadi?

A mempunyai magnitude besar sehingga raw dot product tinggi.

B mempunyai arah yang jauh lebih dekat ke query.

Jadi:

> similarity metric yang berbeda dapat menghasilkan ranking berbeda.

Google menunjukkan behavior yang sama dalam materi recommender: dot product dipengaruhi vector norm, sedangkan cosine berfokus pada angle. [R4]

---

# 16. Checkpoint 1

Jawab tanpa melihat ke atas.

1. Apa numerator cosine similarity?
2. Apa denominator cosine similarity?
3. Mengapa denominator diperlukan?
4. Apakah dot product dan cosine selalu menghasilkan ranking sama?
5. Apakah cosine $0.95$ berarti probability $95\%$?

### Jawaban singkat

1. $\mathbf{x}^{\top}\mathbf{y}$.
2. $\|\mathbf{x}\|_2\|\mathbf{y}\|_2$.
3. Untuk menghilangkan pengaruh magnitude dan memusatkan comparison pada direction.
4. Tidak.
5. Tidak.

---

# 17. Positive Rescaling — Mengapa Panjang Bisa Berubah Tetapi Cosine Tetap?

Misalkan:

$$
\mathbf{y}=k\mathbf{x}
$$

untuk:

$$
k>0
$$

Arah tetap sama.

Contoh:

$$
\mathbf{x}
=
\begin{bmatrix}
1\\
2
\end{bmatrix}
$$

$$
\mathbf{y}
=
\begin{bmatrix}
10\\
20
\end{bmatrix}
=10\mathbf{x}
$$

Walaupun magnitude berbeda:

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})=1
$$

Inilah salah satu property paling penting cosine similarity:

> positive scaling tidak mengubah arah.

## Jangan overgeneralize

Jika scaling negatif:

$$
\mathbf{y}=-\mathbf{x}
$$

arah berbalik dan cosine menjadi:

$$
-1
$$

---

# 18. Normalized Vector Intuition

Untuk nonzero vector $\mathbf{x}$, kita dapat membaginya dengan norm:

$$
\mathbf{x}_{\text{unit}}
=
\frac{\mathbf{x}}{\|\mathbf{x}\|_2}
$$

Hasilnya memiliki norm:

$$
\|\mathbf{x}_{\text{unit}}\|_2=1
$$

Begitu juga:

$$
\mathbf{y}_{\text{unit}}
=
\frac{\mathbf{y}}{\|\mathbf{y}\|_2}
$$

Maka:

$$
\mathbf{x}_{\text{unit}}^{\top}
\mathbf{y}_{\text{unit}}
=
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})
$$

Inilah alasan scikit-learn menyebut cosine similarity sebagai L2-normalized dot product. [R2]

## Math reading skill

Normalizing bukan berarti “membuat data benar”.

Ia melakukan transformasi matematis tertentu: membuat magnitude menjadi $1$ sambil mempertahankan direction untuk nonzero vector.

---

# 19. Critical Boundary — Zero Vector

Perhatikan:

$$
\mathbf{0}
=
\begin{bmatrix}
0\\
0
\end{bmatrix}
$$

Norm-nya:

$$
\|\mathbf{0}\|_2=0
$$

Jika dimasukkan ke formula cosine:

$$
\frac{
\mathbf{0}^{\top}\mathbf{y}
}{
\|\mathbf{0}\|_2\|\mathbf{y}\|_2
}
$$

Denominator mengandung:

$$
0
$$

sehingga definisi matematis standar tidak terdefinisi.

> **Cosine similarity membutuhkan nonzero norms.**

Handoff Linear Algebra kita secara eksplisit menetapkan safety boundary ini.

## 19.1 Tetapi library kadang tetap memberi angka. Mengapa?

Framework numerik dapat menggunakan convention untuk stability.

Contohnya, PyTorch mendefinisikan implementasinya dengan small $\epsilon$ pada denominator agar menghindari division-by-zero secara numerik. [R5]

Itu adalah implementation behavior.

Jangan mengubah mathematical definition menjadi:

> “cosine zero vector sebenarnya ada.”

Lebih tepat:

> mathematical cosine untuk zero vector undefined; software dapat memakai numerical safeguard atau convention tertentu.

---

# 20. HerAI Running Case — Kita Tidak Reset Dataset

Participants tetap:

| Participant | Quiz ratio $q$ | Completion ratio $c$ |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

Kita tidak mengganti data tersebut.

Namun untuk membuat recommendation-style matching lebih meaningful, kita membangun representation baru **yang diturunkan secara eksplisit** dari data lama.

---

# 21. Dari Performance Profile ke Learning-Need Profile

Raw participant vector sebelumnya:

$$
\mathbf{x}
=
\begin{bmatrix}
q\\
c
\end{bmatrix}
$$

Untuk toy recommendation matching, kita ingin melihat area kebutuhan.

Kita definisikan:

$$
n_q=1-q
$$

$$
n_c=1-c
$$

dengan:

- $n_q$ = quiz gap pada toy representation;
- $n_c$ = completion gap pada toy representation.

Lalu participant need vector:

$$
\mathbf{n}
=
\begin{bmatrix}
n_q\\
n_c
\end{bmatrix}
$$

## Safety note

Ini **bukan diagnosis kemampuan manusia**.

Ini hanya toy mathematical transformation untuk menunjukkan matching pada shared axes.

Nilai gap juga bukan probability.

---

# 22. HerAI Need Vectors

## 22.1 Alya

$$
n_q=1-0.80=0.20
$$

$$
n_c=1-0.75=0.25
$$

Maka:

$$
\mathbf{n}_{\text{Alya}}
=
\begin{bmatrix}
0.20\\
0.25
\end{bmatrix}
$$

## 22.2 Bima

$$
n_q=1-0.60=0.40
$$

$$
n_c=1-0.625=0.375
$$

$$
\mathbf{n}_{\text{Bima}}
=
\begin{bmatrix}
0.40\\
0.375
\end{bmatrix}
$$

## 22.3 Citra

$$
n_q=1-0.90=0.10
$$

$$
n_c=1-1.00=0
$$

$$
\mathbf{n}_{\text{Citra}}
=
\begin{bmatrix}
0.10\\
0
\end{bmatrix}
$$

## 22.4 Dewi

$$
n_q=1-0.70=0.30
$$

$$
n_c=1-0.50=0.50
$$

$$
\mathbf{n}_{\text{Dewi}}
=
\begin{bmatrix}
0.30\\
0.50
\end{bmatrix}
$$

---

# 23. Material Support Profiles — Shared Axes Harus Jelas

Agar cosine comparison memiliki interpretation, candidate materials harus direpresentasikan pada axes yang correspond dengan participant need axes.

Kita definisikan toy support space:

1. component pertama = emphasis dukungan terhadap quiz-concept reinforcement;
2. component kedua = emphasis dukungan terhadap completion/progression support.

Semua values pada range $0$ sampai $1$ hanya sebagai **instructional metadata scale**, bukan probability dan bukan hasil model yang sudah divalidasi.

## Materi A — Quiz Reinforcement

$$
\mathbf{m}_A
=
\begin{bmatrix}
0.90\\
0.30
\end{bmatrix}
$$

## Materi B — Completion Support

$$
\mathbf{m}_B
=
\begin{bmatrix}
0.35\\
0.90
\end{bmatrix}
$$

## Materi C — Balanced Practice

$$
\mathbf{m}_C
=
\begin{bmatrix}
0.75\\
0.75
\end{bmatrix}
$$

## Mengapa comparison ini setidaknya mathematically interpretable?

Karena kedua jenis vector memakai corresponding conceptual axes:

| Position | Participant need | Material support |
|---:|---|---|
| 1 | quiz-related need | quiz-related support emphasis |
| 2 | completion-related need | completion-related support emphasis |

Meskipun roles-nya berbeda—need vs support—component positions memiliki intended correspondence.

Ini tetap toy design, bukan evidence bahwa metric tersebut production-valid.

---

# 24. Worked Example 3 — Alya vs Materi A

Alya:

$$
\mathbf{n}_{\text{Alya}}
=
\begin{bmatrix}
0.20\\
0.25
\end{bmatrix}
$$

Materi A:

$$
\mathbf{m}_A
=
\begin{bmatrix}
0.90\\
0.30
\end{bmatrix}
$$

## Step 1 — Dot product

$$
\mathbf{n}_{\text{Alya}}^{\top}\mathbf{m}_A
=
0.20(0.90)+0.25(0.30)
$$

$$
=0.18+0.075
$$

$$
=0.255
$$

## Step 2 — Norm Alya need vector

$$
\|\mathbf{n}_{\text{Alya}}\|_2
=
\sqrt{0.20^2+0.25^2}
$$

$$
=\sqrt{0.04+0.0625}
$$

$$
=\sqrt{0.1025}
$$

$$
\approx0.3202
$$

## Step 3 — Norm Materi A

$$
\|\mathbf{m}_A\|_2
=
\sqrt{0.90^2+0.30^2}
$$

$$
=\sqrt{0.81+0.09}
$$

$$
=\sqrt{0.90}
$$

$$
\approx0.9487
$$

## Step 4 — Denominator

$$
0.3202(0.9487)
\approx0.3037
$$

## Step 5 — Cosine similarity

$$
\operatorname{cos\_sim}
(\mathbf{n}_{\text{Alya}},\mathbf{m}_A)
=
\frac{0.255}{0.3037}
$$

$$
\approx0.8396
$$

## Interpretation

Arah need profile Alya cukup aligned dengan support profile Materi A.

Tetapi kita belum tahu apakah A adalah recommendation terbaik.

Kita perlu membandingkannya dengan candidates lain.

---

# 25. Worked Example 4 — Alya vs Materi B

Materi B:

$$
\mathbf{m}_B
=
\begin{bmatrix}
0.35\\
0.90
\end{bmatrix}
$$

## Step 1 — Dot product

$$
0.20(0.35)+0.25(0.90)
$$

$$
=0.07+0.225
$$

$$
=0.295
$$

## Step 2 — Norm Materi B

$$
\|\mathbf{m}_B\|_2
=
\sqrt{0.35^2+0.90^2}
$$

$$
=\sqrt{0.1225+0.81}
$$

$$
=\sqrt{0.9325}
$$

$$
\approx0.9657
$$

## Step 3 — Denominator

$$
0.3202(0.9657)
\approx0.3092
$$

## Step 4 — Cosine

$$
\operatorname{cos\_sim}
(\mathbf{n}_{\text{Alya}},\mathbf{m}_B)
=
\frac{0.295}{0.3092}
$$

$$
\approx0.9542
$$

Alya lebih directionally aligned dengan B daripada A pada toy support space ini.

---

# 26. Worked Example 5 — Alya vs Materi C

Materi C:

$$
\mathbf{m}_C
=
\begin{bmatrix}
0.75\\
0.75
\end{bmatrix}
$$

## Step 1 — Dot product

$$
0.20(0.75)+0.25(0.75)
$$

$$
=0.15+0.1875
$$

$$
=0.3375
$$

## Step 2 — Norm C

$$
\|\mathbf{m}_C\|_2
=
\sqrt{0.75^2+0.75^2}
$$

$$
=\sqrt{1.125}
$$

$$
\approx1.0607
$$

## Step 3 — Denominator

$$
0.3202(1.0607)
\approx0.3396
$$

## Step 4 — Cosine

$$
\operatorname{cos\_sim}
(\mathbf{n}_{\text{Alya}},\mathbf{m}_C)
=
\frac{0.3375}{0.3396}
$$

$$
\approx0.9939
$$

Ranking cosine untuk Alya:

$$
C>B>A
$$

## Interpretation safety

Ini hanya mengatakan bahwa **direction of need** Alya paling aligned dengan **direction of support emphasis** Materi C di toy 2D space.

Ini belum mempertimbangkan:

- prerequisite materi;
- difficulty;
- pedagogy preference;
- availability;
- recency;
- fairness;
- evidence of learning effectiveness;
- user choice;
- causal impact.

Jadi jangan menyebut:

> “Materi C pasti terbaik untuk Alya.”

---

# 27. HerAI Comparison Table — Semua Participants

Dengan procedure yang sama:

| Participant | Materi A | Materi B | Materi C | Highest cosine |
|---|---:|---:|---:|---|
| Alya | 0.8396 | 0.9542 | 0.9939 | C |
| Bima | 0.9084 | 0.9019 | 0.9995 | C |
| Citra | 0.9487 | 0.3624 | 0.7071 | A |
| Dewi | 0.7593 | 0.9857 | 0.9701 | B |

## Reading skill

Jangan membaca row Alya sebagai:

> “Alya punya peluang 99.39% berhasil pada Materi C.”

Itu salah.

Baca sebagai:

> “Pada toy 2D need/support representation ini, cosine directional alignment Alya dengan Materi C sekitar 0.9939.”

---

# 28. Checkpoint 2 — Interpretasi HerAI

### Pertanyaan 1

Mengapa Citra lebih aligned dengan Materi A pada toy data?

Citra need vector:

$$
\begin{bmatrix}
0.10\\
0
\end{bmatrix}
$$

arahnya seluruhnya pada quiz-related need axis.

Materi A paling quiz-heavy di antara candidates.

### Pertanyaan 2

Apakah nilai cosine tinggi membuktikan material tersebut efektif?

Tidak.

Cosine hanya menghitung geometric relationship berdasarkan representation yang diberikan.

### Pertanyaan 3

Apakah material dengan cosine terbesar selalu harus direkomendasikan?

Tidak otomatis.

Recommendation system dapat memiliki constraints dan signals lain.

---

# 29. Change One Thing — Besarkan Magnitude Saja

Gunakan:

$$
\mathbf{x}
=
\begin{bmatrix}
1\\
2
\end{bmatrix}
$$

serta:

$$
\mathbf{y}
=
\begin{bmatrix}
2\\
4
\end{bmatrix}
$$

Cosine:

$$
1
$$

Sekarang ubah hanya magnitude $\mathbf{y}$:

$$
\mathbf{y}'
=
\begin{bmatrix}
200\\
400
\end{bmatrix}
$$

Arah tidak berubah.

Cosine tetap:

$$
1
$$

Tetapi raw dot product berubah sangat besar.

Inilah difference fundamental antara cosine dan raw dot product. [R3][R4]

---

# 30. Change One Thing — Ubah Arah Sedikit

Query:

$$
\mathbf{x}
=
\begin{bmatrix}
1\\
0
\end{bmatrix}
$$

Candidate awal:

$$
\mathbf{y}_1
=
\begin{bmatrix}
1\\
0
\end{bmatrix}
$$

Cosine:

$$
1
$$

Ubah second component:

$$
\mathbf{y}_2
=
\begin{bmatrix}
1\\
1
\end{bmatrix}
$$

Cosine:

$$
\frac{1}{\sqrt{2}}
\approx0.7071
$$

Magnitude naik, tetapi arah menjauh dari query.

Cosine turun.

---

# 31. Cosine Similarity vs Euclidean Distance

Keduanya menjawab pertanyaan geometric yang berbeda.

## Euclidean distance

$$
d(\mathbf{x},\mathbf{y})
=
\|\mathbf{x}-\mathbf{y}\|_2
$$

Pertanyaan intuitif:

> seberapa jauh endpoints dua vector?

## Cosine similarity

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})
=
\frac{\mathbf{x}^{\top}\mathbf{y}}
{\|\mathbf{x}\|_2\|\mathbf{y}\|_2}
$$

Pertanyaan intuitif:

> seberapa aligned arah kedua vector?

Google menunjukkan bahwa ranking candidate dapat berbeda tergantung apakah system memakai cosine, dot product, atau Euclidean distance. [R4]

## Safety

Jangan bertanya:

> “Metric mana yang selalu paling benar?”

Pertanyaan yang lebih baik:

> “Geometry seperti apa yang sesuai dengan task dan representation?”

---

# 32. Cosine Similarity vs Dot Product

| Aspect | Dot product | Cosine similarity |
|---|---|---|
| Formula dasar | $\mathbf{x}^{\top}\mathbf{y}$ | normalized dot product |
| Output | scalar | scalar |
| Sensitif magnitude | Ya | Tidak terhadap positive rescaling |
| Fokus geometric | alignment + magnitude | directional alignment |
| Zero-vector issue | dot product tetap dapat dihitung | standard cosine undefined |
| Sama pada unit vectors | Ya, dot = cosine | Ya |

Scikit-learn menyatakan pada L2-normalized data, cosine similarity equivalent dengan linear kernel/dot-product style computation. [R2]

---

# 33. Cosine Similarity Bukan Probability

Ini adalah misconception paling berbahaya di topic ini.

Jika:

$$
\operatorname{cos\_sim}(\mathbf{x},\mathbf{y})=0.92
$$

jangan langsung menulis:

> “probability match = 92%.”

Mengapa?

Karena formula cosine tidak mendefinisikan random event, probability distribution, calibration, atau empirical frequency.

Ia hanya mengukur geometric relation pada vector space.

Bahkan jika output kebetulan berada antara $0$ dan $1$, numerical range tidak menentukan semantics.

Ini melanjutkan safety principle dari Submodule 01:

> value pada range $0$–$1$ tidak otomatis probability.

---

# 34. Cosine Similarity Tinggi Bukan Causation

Misalkan dua learning materials memiliki embedding cosine similarity tinggi.

Yang dapat kita katakan:

> representation mereka aligned menurut metric dan embedding yang dipakai.

Yang tidak otomatis dapat kita katakan:

> salah satu menyebabkan keberhasilan belajar yang sama;

atau:

> menggunakan satu material akan menyebabkan outcome tertentu.

Similarity adalah relationship pada representation.

Causal claim membutuhkan methodology yang berbeda.

---

# 35. Similarity Tidak Menghapus Semantics

Kita hanya boleh membandingkan vector jika coordinate system mempunyai meaning yang compatible.

Contoh aman:

$$
\mathbf{x}
=
\begin{bmatrix}
\text{quiz-related quantity}\\
\text{completion-related quantity}
\end{bmatrix}
$$

serta candidate vector dengan axes corresponding.

Contoh tidak aman:

Vector A:

- first component = quiz ratio;
- second = completion ratio.

Vector B:

- first component = age;
- second = postal code.

Walaupun dimension sama-sama $2$, cosine computation tidak otomatis meaningful.

> **Same dimension is necessary for the standard component pairing, but semantic compatibility is a separate requirement.**

---

# 36. Feature Order Tetap Penting

Misalkan schema canonical:

$$
[q,c]
$$

Vector:

$$
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}
$$

berarti:

- component 1 = quiz ratio;
- component 2 = completion ratio.

Jika candidate diam-diam memakai:

$$
[c,q]
$$

maka pairwise products memasangkan quantities yang salah.

Cosine formula bisa tetap menghasilkan angka.

Tetapi angka tersebut dapat kehilangan intended semantics.

Ini adalah contoh klasik:

> **calculation correctness ≠ representation correctness.**

---

# 37. AI/ML Connection 1 — Embeddings

Embedding adalah vector representation yang dapat dipakai untuk membandingkan examples/items dalam learned representation space.

Google menjelaskan bahwa similarity pada embeddings dapat dihitung menggunakan Euclidean distance, cosine, atau dot product. [R3]

Cosine similarity berguna ketika direction dianggap lebih penting daripada norm.

Namun:

- embedding dimensions biasanya tidak mudah diberi semantic label manual;
- interpretation berasal dari training objective dan learned geometry;
- metric tetap merupakan design choice.

Jangan menganggap setiap embedding model otomatis harus memakai cosine.

---

# 38. AI/ML Connection 2 — Recommender Candidate Generation

Google Recommendation Systems menjelaskan bahwa candidate generation sering mencari item embeddings yang “dekat” dengan query embedding menurut similarity measure seperti cosine, dot product, atau Euclidean distance. [R4]

Poin penting:

> pilihan metric dapat mengubah ranking candidates.

Dot product dapat memfavoritkan vectors dengan norm besar.

Cosine memusatkan comparison pada angle.

Euclidean distance memusatkan comparison pada geometric closeness.

Tidak ada satu metric yang otomatis benar untuk semua recommender.

---

# 39. AI/ML Connection 3 — Text Similarity

Scikit-learn mencatat cosine similarity sebagai pilihan populer untuk document representations seperti TF-IDF vectors. [R6]

Intuition beginner-safe:

- dokumen diubah menjadi numerical vector;
- direction vector dapat merefleksikan relative pattern dari features;
- cosine membandingkan alignment pattern;
- panjang dokumen mentah tidak harus menjadi signal utama similarity.

Tetapi representation choices tetap menentukan meaning dari similarity.

---

# 40. Practical Implementation Note — Framework Behavior

Topic ini bukan coding tutorial, tetapi ada satu detail penting untuk future integration.

PyTorch `CosineSimilarity` menggunakan small epsilon pada denominator untuk numerical stability. [R5]

Hal ini mengajarkan distinction:

## Mathematics layer

Standard cosine membutuhkan nonzero vector norms.

## Numerical implementation layer

Software dapat menambahkan guard terhadap division by zero.

## Product interpretation layer

Aplikasi tetap harus menentukan apa arti zero/near-zero representation.

Tiga layer ini tidak boleh dicampur.

---

# 41. Misconception Challenge 1 — “Cosine 0.87 = 87% Match Probability”

**Common misconception:**

> “Cosine similarity $0.87$ berarti probability cocok adalah $87\%$.”

**Correction:**

Tidak.

Cosine adalah normalized dot-product similarity. Probability membutuhkan probabilistic definition dan evidence berbeda.

---

# 42. Misconception Challenge 2 — “Dot Product dan Cosine Sama”

**Common misconception:**

> “Keduanya sama-sama mengukur similarity, jadi hasilnya sama.”

**Correction:**

Raw dot product memasukkan influence dari vector norms.

Cosine membagi influence tersebut dengan norm product. [R2][R3]

---

# 43. Misconception Challenge 3 — “Cosine Tinggi = Dua Peserta Sama”

**Common misconception:**

> “Kalau participant vectors punya cosine $1$, berarti kedua orang itu sama.”

**Correction:**

Vector representation hanya menyimpan selected numerical aspects.

Dua vector directionally identical tidak berarti dua manusia identical.

Magnitude pun dapat berbeda.

---

# 44. Misconception Challenge 4 — “Zero Vector Cosine = 0 Secara Definisi”

**Common misconception:**

> “Kalau salah satu vector nol, cosine pasti nol.”

**Correction:**

Standard mathematical formula tidak terdefinisi karena denominator nol.

Library dapat menggunakan implementation convention tertentu, tetapi itu bukan definisi standar. [R5]

---

# 45. Misconception Challenge 5 — “High Cosine = Best Recommendation”

**Common misconception:**

> “Candidate dengan cosine tertinggi pasti recommendation terbaik.”

**Correction:**

Cosine hanya satu signal.

Production recommender dapat mempertimbangkan:

- eligibility;
- learning prerequisites;
- safety;
- freshness;
- diversity;
- availability;
- user preference;
- predicted utility;
- business/product constraints;
- evaluation evidence.

---

# 46. Misconception Challenge 6 — “Cosine Tidak Terpengaruh Representation Design”

**Common misconception:**

> “Karena magnitude sudah dinormalisasi, representation choice tidak penting.”

**Correction:**

Feature definitions, signs, preprocessing, dimensions, and learned embedding geometry tetap menentukan angle.

Normalization tidak menghapus semantics.

---

# 47. Try It Yourself 1 — Simple Cosine

Diberikan:

$$
\mathbf{x}
=
\begin{bmatrix}
1\\
0
\end{bmatrix}
$$

$$
\mathbf{y}
=
\begin{bmatrix}
1\\
1
\end{bmatrix}
$$

Hitung:

1. dot product;
2. norm $\mathbf{x}$;
3. norm $\mathbf{y}$;
4. cosine similarity;
5. interpretation.

### Jawaban

Dot:

$$
1
$$

Norm x:

$$
1
$$

Norm y:

$$
\sqrt{2}
$$

Cosine:

$$
\frac{1}{\sqrt{2}}
\approx0.7071
$$

Interpretation: moderate-to-high positive directional alignment pada geometric view; bukan probability.

---

# 48. Try It Yourself 2 — Same Direction, Different Magnitude

Diberikan:

$$
\mathbf{x}
=
\begin{bmatrix}
2\\
3
\end{bmatrix}
$$

$$
\mathbf{y}
=
\begin{bmatrix}
20\\
30
\end{bmatrix}
$$

Prediksi sebelum menghitung.

Cosine seharusnya:

$$
1
$$

karena $\mathbf{y}=10\mathbf{x}$.

Verifikasi dengan formula.

---

# 49. Try It Yourself 3 — Orthogonal

Diberikan:

$$
\mathbf{x}
=
\begin{bmatrix}
2\\
0
\end{bmatrix}
$$

$$
\mathbf{y}
=
\begin{bmatrix}
0\\
5
\end{bmatrix}
$$

Dot product:

$$
0
$$

Kedua norms nonzero.

Maka cosine:

$$
0
$$

---

# 50. Try It Yourself 4 — HerAI Dewi

Gunakan:

$$
\mathbf{n}_{\text{Dewi}}
=
\begin{bmatrix}
0.30\\
0.50
\end{bmatrix}
$$

Bandingkan dengan:

$$
\mathbf{m}_B
=
\begin{bmatrix}
0.35\\
0.90
\end{bmatrix}
$$

Expected result sekitar:

$$
0.9857
$$

Jelaskan hasil tanpa kata “probability”.

---

# 51. Try It Yourself 5 — Semantic Audit

System menerima:

$$
\mathbf{x}
=
\begin{bmatrix}
0.8\\
0.6
\end{bmatrix}
$$

serta:

$$
\mathbf{y}
=
\begin{bmatrix}
40\\
12001
\end{bmatrix}
$$

Keduanya dimension $2$.

Apakah cukup untuk cosine similarity yang meaningful?

Tidak.

Kita belum tahu semantics dan component correspondence.

Jika vector kedua adalah `[age, postal_code]`, comparison dengan `[quiz_ratio, completion_ratio]` tidak meaningful untuk task kita.

---

# 52. Checkpoint 3 — Zero Vector

Diberikan:

$$
\mathbf{x}
=
\begin{bmatrix}
0\\
0
\end{bmatrix}
$$

$$
\mathbf{y}
=
\begin{bmatrix}
1\\
1
\end{bmatrix}
$$

Apa masalahnya?

Norm x:

$$
0
$$

Denominator cosine menjadi nol.

Jadi standard mathematical cosine undefined.

---

# 53. Visual / Interactive Specification 1 — Angle vs Magnitude Explorer

**Label:** `[INTERACTIVE VISUAL]`

**Learning purpose:** membedakan influence angle dari magnitude.

**Initial state/data:**

- vector $\mathbf{x}$ fixed pada angle $0^\circ$;
- vector $\mathbf{y}$ pada angle $45^\circ$;
- lengths masing-masing $1$.

**Learner action:**

- drag length slider $\mathbf{y}$ dari $0.5$ sampai $5$;
- lihat dot product dan cosine update.

**Expected behavior:**

- raw dot product berubah dengan length;
- cosine tetap sama selama direction tidak berubah.

**Feedback:**

Badge:

> “Magnitude changed; direction did not.”

**Safety note:**

Tidak menyebut cosine sebagai probability.

---

# 54. Visual / Interactive Specification 2 — Rotate the Vector

**Label:** `[NUMBER MANIPULATOR]`

**Learning purpose:** menghubungkan angle ke cosine.

**Initial state:**

- $\mathbf{x}$ horizontal;
- $\mathbf{y}$ dapat diputar dari $0^\circ$ sampai $180^\circ$;
- norms fixed.

**Learner action:** drag angle.

**Expected behavior:**

- $0^\circ \rightarrow 1$;
- $90^\circ \rightarrow 0$;
- $180^\circ \rightarrow -1$.

**Feedback:** menampilkan sign dan interpretation direction.

**Safety note:** nilai negatif bukan “negative probability”.

---

# 55. Visual / Interactive Specification 3 — Dot vs Cosine Ranking

**Label:** `[COMPARE VIEW]`

**Learning purpose:** menunjukkan ranking inversion.

**Initial state:**

$$
\mathbf{q}=[1,0]
$$

$$
\mathbf{a}=[5,5]
$$

$$
\mathbf{b}=[2,0.2]
$$

**Learner action:** toggle `Dot Product` / `Cosine Similarity`.

**Expected behavior:**

- dot ranks A first;
- cosine ranks B first.

**Feedback:** highlight source of difference: norm vs angle.

---

# 56. Visual / Interactive Specification 4 — HerAI Need–Support Matching

**Label:** `[INTERACTIVE VISUAL]`

**Learning purpose:** transfer cosine ke running case.

**Initial state:** Alya + Materials A/B/C.

**Learner action:** choose participant.

**Expected behavior:**

- draw participant need vector;
- draw material support vectors;
- show cosine ranking;
- show component semantics.

**Feedback:**

> “Highest directional alignment in this toy representation.”

Bukan:

> “Best material with X% success probability.”

---

# 57. Visual / Interactive Specification 5 — Zero Vector Guard

**Label:** `[STEP-BY-STEP REVEAL]`

**Learning purpose:** memahami undefined denominator.

**Initial state:** vector $\mathbf{x}=[0,0]$.

**Learner action:** click `Compute cosine`.

**Expected behavior:**

1. compute norm x = 0;
2. denominator = 0;
3. stop mathematical calculation;
4. show “undefined under standard cosine formula”.

**Optional implementation note:** show separate card bahwa library dapat memakai epsilon guard.

---

# 58. Visual / Interactive Specification 6 — Feature Order Trap

**Label:** `[COMPARE VIEW]`

**Learning purpose:** menunjukkan bahwa formula tidak dapat menyelamatkan semantic mismatch.

**Initial state:**

Schema A:

`[quiz_gap, completion_gap]`

Schema B benar:

`[quiz_support, completion_support]`

Schema B salah-order:

`[completion_support, quiz_support]`

**Learner action:** toggle order.

**Expected behavior:** cosine berubah.

**Feedback:**

> “Numerical computation succeeded, but component pairing changed.”

---

# 59. Design Choice — Metric Harus Mengikuti Pertanyaan

Sebelum memilih cosine, tanyakan:

1. Apakah magnitude membawa information yang penting?
2. Apakah direction/pattern lebih penting daripada absolute size?
3. Apakah vector axes compatible?
4. Apakah values sudah berada pada representation yang meaningful?
5. Apakah zero vectors mungkin muncul?
6. Bagaimana metric akan dievaluasi pada task nyata?
7. Apakah ranking yang dihasilkan memenuhi tujuan pengguna?

Google recommender material menunjukkan cosine, dot product, dan Euclidean distance dapat menghasilkan ranking berbeda. [R4]

Jadi:

> **Similarity metric adalah bagian dari model/system design, bukan ritual matematika.**

---

# 60. Worked Reasoning Audit — Tiga Pernyataan

Audit setiap kalimat.

## Statement A

> “Cosine $0.98$ berarti vector hampir searah.”

Secara geometric, ini reasonable jika vectors nonzero dan representation valid.

## Statement B

> “Cosine $0.98$ berarti $98\%$ probability cocok.”

Salah tanpa probabilistic model/calibration definition.

## Statement C

> “Cosine $0.98$ berarti material pasti meningkatkan hasil belajar.”

Salah.

Similarity tidak membuktikan causal effect.

---

# 61. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** menjelaskan mengapa dot product sensitif terhadap magnitude.
- [ ] **I can** menjelaskan intuition cosine sebagai directional alignment.
- [ ] **I can** menulis formula cosine similarity.
- [ ] **I can** mendefinisikan setiap symbol pada formula.
- [ ] **I can** menghitung dot product numerator.
- [ ] **I can** menghitung dua L2 norms.
- [ ] **I can** menghitung denominator.
- [ ] **I can** menghitung cosine similarity langkah demi langkah.
- [ ] **I can** menginterpretasikan $1$, $0$, dan $-1$.
- [ ] **I can** menjelaskan mengapa zero vector membuat standard cosine undefined.
- [ ] **I can** membedakan mathematical definition dari numerical epsilon guard.
- [ ] **I can** menjelaskan positive scale invariance.
- [ ] **I can** membedakan cosine dan dot product.
- [ ] **I can** membedakan cosine dan Euclidean distance.
- [ ] **I can** menjelaskan bahwa same dimension belum menjamin semantic compatibility.
- [ ] **I can** menjaga feature order ketika menghitung similarity.
- [ ] **I can** menjelaskan mengapa cosine bukan probability.
- [ ] **I can** menjelaskan mengapa cosine tinggi bukan causal claim.
- [ ] **I can** membaca HerAI cosine score secara aman.
- [ ] **I can** menjelaskan bahwa metric choice harus sesuai task.
- [ ] **I can** menjelaskan penggunaan cosine pada embedding/recommender secara tidak berlebihan.

Jika lebih dari tiga poin belum yakin, ulangi:

- Formula Contract;
- Worked Example 2;
- Zero Vector section;
- HerAI Worked Examples;
- Misconception Challenges.

---

# 62. Why This Matters Later

Topic 06 menyelesaikan bagian utama **pairwise vector similarity** pada progression Linear Algebra kita.

Sekarang kita sudah mempunyai:

$$
\text{scalar}
\rightarrow
\text{vector}
\rightarrow
\text{dimension}
\rightarrow
\text{operations}
\rightarrow
\text{norm}
\rightarrow
\text{distance}
\rightarrow
\text{dot product}
\rightarrow
\text{cosine similarity}
$$

Pertanyaan berikutnya:

> Bagaimana jika bukan hanya satu participant vector, tetapi puluhan, ratusan, atau ribuan observation vectors?

Kita membutuhkan mathematical object yang dapat mengorganisasi banyak vectors secara terstruktur.

Itulah jalan menuju **matrix**.

---

# 63. Summary

Pada Topic 06 kita belajar:

1. dot product menggabungkan angle dan magnitude;
2. cosine similarity menghilangkan pengaruh positive magnitude scaling;
3. formula cosine adalah normalized dot product;
4. standard cosine membutuhkan nonzero vector norms;
5. nilai cosine real berada pada $[-1,1]$ untuk nonzero real vectors;
6. $1$ berarti same direction;
7. $0$ berarti orthogonal;
8. $-1$ berarti opposite direction;
9. dot product dan cosine dapat memberikan ranking berbeda;
10. Euclidean distance dan cosine menjawab pertanyaan geometric berbeda;
11. cosine bukan probability;
12. cosine tinggi bukan causation;
13. same dimension tidak otomatis berarti same semantics;
14. feature order tetap harus konsisten;
15. metric choice merupakan design decision;
16. embeddings/recommenders dapat memakai cosine, dot product, atau distance tergantung objective;
17. HerAI toy need/support matching menunjukkan penggunaan cosine tanpa mengubahnya menjadi production model.

Kalimat paling penting:

> **Cosine similarity mengukur directional alignment pada representation space; ia tidak otomatis mengukur peluang keberhasilan, kebenaran, causation, atau kualitas rekomendasi.**

---

# 64. Bridge ke Topic 07 — Matrix

Selama Topic 01–06, kita sering menulis participant satu per satu:

$$
\mathbf{x}^{(1)},
\mathbf{x}^{(2)},
\mathbf{x}^{(3)},
\ldots
$$

Dengan empat participants HerAI, kita sudah punya banyak vectors dengan feature schema yang sama.

Daripada mengelolanya sebagai object terpisah, kita akan belajar menyusunnya menjadi satu mathematical structure.

Topic berikutnya:

# **Topic 07 — Matrix: Banyak Observation dalam Satu Struktur**

Di sana kita akan membahas:

- matrix sebagai mathematical object;
- row dan column semantics;
- shape;
- observation-by-feature organization;
- bagaimana Alya, Bima, Citra, dan Dewi dapat disusun dalam satu matrix;
- perbedaan matrix dengan sekadar “table biasa”.

Matrix multiplication belum menjadi fokus Topic 07; itu akan datang setelah matrix literacy cukup kuat.

---

# 65. References

## [R1] Boyd, S. & Vandenberghe, L. — Introduction to Applied Linear Algebra: Vectors, Matrices, and Least Squares

Stanford-hosted open textbook used in Stanford/UCLA courses. Mendukung foundation vector, inner product, norm, dan geometric interpretation.

https://web.stanford.edu/~boyd/vmls/

## [R2] scikit-learn — `cosine_similarity`

Mendukung definisi cosine similarity sebagai normalized dot product dan relation pada L2-normalized data.

https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html

## [R3] Google for Developers — Measuring Similarity from Embeddings

Mendukung comparison Euclidean distance, cosine, dan dot product; cosine focuses on angle sedangkan dot product dipengaruhi vector lengths.

https://developers.google.com/machine-learning/clustering/dnn-clustering/supervised-similarity

## [R4] Google for Developers — Recommendation Systems: Candidate Generation Overview

Mendukung penggunaan cosine/dot product/Euclidean distance pada embedding candidate generation dan fakta bahwa pilihan metric dapat mengubah ranking.

https://developers.google.com/machine-learning/recommendation/overview/candidate-generation

## [R5] PyTorch — `torch.nn.CosineSimilarity`

Mendukung implementation note bahwa framework dapat menggunakan epsilon untuk numerical stability pada denominator.

https://docs.pytorch.org/docs/stable/generated/torch.nn.CosineSimilarity.html

## [R6] scikit-learn — Pairwise Metrics, Affinities and Kernels

Mendukung geometric explanation bahwa L2 normalization memproyeksikan vectors ke unit sphere serta contoh cosine similarity untuk document/TF-IDF vectors.

https://scikit-learn.org/stable/modules/metrics.html#cosine-similarity

---

# 66. Topic-Level QA Notes

## Academic QA

- cosine didefinisikan sebagai normalized dot product;
- nonzero norm requirement dinyatakan eksplisit;
- range $[-1,1]$ tidak disalahartikan sebagai probability range;
- dot product tidak disamakan dengan cosine;
- Euclidean distance tidak disamakan dengan cosine;
- high similarity tidak disamakan dengan causation;
- metric choice disebut task-dependent;
- zero-vector framework behavior dipisahkan dari mathematical definition.

## Running Case QA

- Alya/Bima/Citra/Dewi tetap dipakai;
- $q$ dan $c$ tetap sama;
- need vector diturunkan transparan melalui $1-q$ dan $1-c$;
- material profiles diberi semantics eksplisit;
- material values diberi label instructional metadata, bukan probability/model output;
- tidak ada reset random participant dataset.

## Dependency QA

Topic ini menggunakan:

- vector;
- norm;
- dot product;
- previous distance intuition.

Topic ini belum mengajarkan:

- matrix formal;
- pairwise similarity matrix;
- matrix multiplication;
- eigenvalues/eigenvectors;
- PCA;
- SVD;
- probability modeling;
- gradient;
- optimization.

## Markdown + KaTeX Contract

- inline math memakai `$...$`;
- display math memakai `$$...$$`;
- formula tidak ditempatkan dalam fenced code block;
- notation bold lowercase untuk vectors dipertahankan;
- `\operatorname{cos\_sim}` dipakai secara konsisten;
- browser-level KaTeX rendering belum diklaim sampai runtime frontend diuji.
