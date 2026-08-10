# Topic 02 — Membaca Vektor: Komponen, Dimensi, Shape, dan Feature Order

> **Submodul 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks**  
> **Filename:** `02-membaca-vektor.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 65–85 menit membaca + 35–45 menit eksplorasi/praktik  
> **Prerequisite:** Topic 01 — Dari Scalar ke Vector: Satu Peserta, Banyak Feature  
> **Forward dependency:** Topic 03 — Operasi Vektor: Penjumlahan, Pengurangan, dan Scalar Multiplication  
> **Boundary:** Topic ini memformalkan components, indexing, dimension, shape/orientation, dan feature order. Belum mengajarkan vector addition, subtraction, scalar multiplication, norm, distance, dot product, cosine similarity, matrix operations, atau matrix multiplication.

---

# 1. Mengapa Topik Ini Ada?

Pada Topic 01 kita sudah membangun participant vector HerAI.

Untuk Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Feature contract-nya adalah:

1. component pertama = quiz ratio;
2. component kedua = completion ratio.

Kita sudah tahu bahwa vector bukan random list angka.

Tetapi untuk benar-benar menggunakan vector di Linear Algebra, kita harus mampu **membacanya dengan presisi**.

Kita perlu menjawab pertanyaan seperti:

- berapa banyak components yang dimiliki vector?
- apa arti component ke-$j$?
- bagaimana membaca $x_j^{(i)}$?
- apa yang dimaksud dimension?
- apa yang dimaksud shape?
- apa beda column vector dan row presentation?
- apakah dua vector dengan angka sama tetapi urutan berbeda mempunyai makna yang sama?
- apakah dimension $3$ berarti vector “lebih besar” daripada dimension $2$?

Stanford *Introduction to Applied Linear Algebra* memperlakukan vector sebagai ordered collection yang entries-nya dapat merepresentasikan berbagai quantities dalam aplikasi, sedangkan MIT Linear Algebra menekankan bahwa components adalah bagian yang membentuk vector dalam coordinate representation. [R1][R2]

Dalam machine learning, masalah ini menjadi sangat praktis karena model menerima **feature vector**: nilai-nilai feature untuk satu example harus dibentuk dengan schema yang konsisten. [R3]

Jadi Topic 02 bukan tentang melakukan operasi.

Topic ini adalah tentang:

> **membaca struktur vector secara benar sebelum vector tersebut digunakan dalam computation.**

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 02, kamu diharapkan mampu:

1. mengidentifikasi setiap **component** dari sebuah vector;
2. membaca notation $x_j$ sebagai component ke-$j$ dari vector $\mathbf{x}$;
3. membaca $x_j^{(i)}$ sebagai feature ke-$j$ dari observation ke-$i$;
4. membedakan index observation $i$ dan index feature/component $j$;
5. menjelaskan **dimension** sebagai jumlah components pada vector;
6. membaca notation $\mathbf{x}\in\mathbb{R}^d$ pada level beginner;
7. menjelaskan arti $\mathbb{R}$ dan $d$ pada notation tersebut;
8. membedakan dimension dari numerical magnitude;
9. menjelaskan **shape** sebagai deskripsi susunan entries menurut axis/arrangement;
10. mengenali column vector dengan shape matematis $d\times1$;
11. mengenali row presentation dengan shape matematis $1\times d$;
12. menjelaskan mengapa orientation/shape dan dimension berkaitan tetapi bukan istilah yang identik;
13. menjaga feature order tetap konsisten antar-observations;
14. membangun **feature schema** sederhana untuk participant vector HerAI;
15. menemukan semantic error ketika values benar tetapi positions salah;
16. menjelaskan bahwa higher dimension tidak otomatis berarti representation lebih baik;
17. menjelaskan risiko memasukkan feature dengan semantics atau scale yang belum jelas;
18. membedakan mathematical vector dari cara sebuah software library dapat menyimpan array;
19. menjelaskan bagaimana fixed feature-vector structure mendukung input AI/ML;
20. menyiapkan diri untuk operasi vector pada Topic 03 tanpa melakukan operasi tersebut sekarang.

---

# 3. Prerequisite Recall — Dari Topic 01

Kita tidak mengulang Topic 01 secara panjang.

Cukup ingat empat hal.

## 3.1 Scalar

Scalar adalah satu numerical quantity.

Contoh:

$$
q=0.80
$$

## 3.2 Vector

Vector dapat menyusun beberapa ordered numerical components menjadi satu mathematical object.

Contoh:

$$
\mathbf{x}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

## 3.3 Feature order

Untuk canonical HerAI participant vector Topic 01–02:

1. quiz ratio;
2. completion ratio.

Urutan adalah bagian dari semantics.

## 3.4 Indexed feature

Kita sudah pernah melihat:

$$
x_j^{(i)}
$$

Sekarang notation itu akan dibaca lebih formal.

---

# 4. Pertanyaan Pemantik — “Dua Angka yang Sama”

Bayangkan dua pipeline HerAI.

Pipeline A menghasilkan Bima sebagai:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

Pipeline B menghasilkan:

$$
\tilde{\mathbf{x}}^{(2)}
=
\begin{bmatrix}
0.625 \\
0.60
\end{bmatrix}
$$

Seorang developer berkata:

> “Santai. Dua angka yang dipakai sama. Jadi representation-nya sama.”

Apakah benar?

Kalau feature contract adalah:

1. quiz ratio;
2. completion ratio;

maka posisi pertama mempunyai arti tertentu dan posisi kedua mempunyai arti tertentu.

Jadi masalahnya bukan sekadar:

> “Apakah angka-angkanya sama?”

Masalahnya adalah:

> **“Apakah setiap angka berada pada posisi yang benar sesuai schema?”**

---

# 5. Predict Before Formalization

Jawab sebelum membaca definisi formal.

## Prediksi A — Component mana?

Diberikan:

$$
\mathbf{v}
=
\begin{bmatrix}
4 \\
7 \\
2
\end{bmatrix}
$$

Apa component kedua?

A. $4$  
B. $7$  
C. $2$  
D. $13$

Simpan jawabanmu.

---

## Prediksi B — Dimension

Vector yang sama mempunyai tiga entries.

Apakah dimension-nya:

A. $13$, karena $4+7+2=13$;  
B. $7$, karena itu entry terbesar;  
C. $3$, karena ada tiga components;  
D. tidak dapat diketahui.

Simpan jawabanmu.

---

## Prediksi C — Observation vs feature index

Jika:

$$
x_2^{(4)}=0.50
$$

pada HerAI, mana pembacaan yang paling tepat?

A. feature ke-$4$ observation ke-$2$;  
B. feature ke-$2$ observation ke-$4$;  
C. vector ke-$2$ mempunyai dimension $4$;  
D. nilai $0.50$ adalah probability.

Simpan jawabanmu.

---

## Prediksi D — Shape

Diberikan column vector:

$$
\mathbf{x}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Berapa shape matematisnya jika kita membaca susunan sebagai baris $\times$ kolom?

A. $1\times2$  
B. $2\times1$  
C. $2\times2$  
D. $0.80\times0.75$

Simpan jawabanmu.

---

# 6. Intuisi — Vector Seperti Form dengan Posisi Tetap

Bayangkan sebuah form yang mempunyai dua slot tetap.

| Posisi | Field | Nilai Alya |
|---:|---|---:|
| 1 | quiz ratio | $0.80$ |
| 2 | completion ratio | $0.75$ |

Vector:

$$
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

bisa dibaca sebagai form numerik yang mempunyai **slot-slot terurut**.

Slot ke-$1$ bukan sekadar “tempat angka pertama”.

Ia mempunyai semantics:

> quiz ratio.

Slot ke-$2$ mempunyai semantics:

> completion ratio.

Jika kita menukar isi dua slot tanpa mengubah schema, kita membuat semantic error.

Ini mirip mengisi:

- tanggal lahir pada field nomor telepon;
- nomor telepon pada field tanggal lahir.

Data mungkin tetap “valid-looking”, tetapi meaning-nya salah.

---

# 7. Concrete Example — Membaca Vector Tiga Komponen

Diberikan:

$$
\mathbf{v}
=
\begin{bmatrix}
4 \\
7 \\
2
\end{bmatrix}
$$

Kita dapat memecahnya menjadi:

- component pertama = $4$;
- component kedua = $7$;
- component ketiga = $2$.

Jika kita menggunakan notation component:

$$
v_1=4
$$

$$
v_2=7
$$

$$
v_3=2
$$

Di sini:

- $\mathbf{v}$ = seluruh vector;
- $v_1$ = satu scalar component;
- $v_2$ = satu scalar component;
- $v_3$ = satu scalar component.

Perhatikan perubahan typography:

- **bold lowercase** $\mathbf{v}$ untuk seluruh vector;
- non-bold $v_j$ untuk satu scalar component.

---

# 8. Definisi Formal — Component Vector

Untuk vector:

$$
\mathbf{x}
=
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_d
\end{bmatrix}
$$

setiap $x_j$ disebut **component** atau **entry** dari vector $\mathbf{x}$. [R1]

## Arti symbol

- $\mathbf{x}$ = seluruh vector;
- $x_j$ = component ke-$j$;
- $j$ = component index;
- $d$ = jumlah components;
- $\vdots$ = notation bahwa ada entries di antara yang tidak ditulis satu per satu.

Topic ini menggunakan istilah **component** sebagai istilah pedagogis utama.

Istilah **entry** boleh dipakai sebagai sinonim ketika merujuk nilai pada posisi tertentu.

---

# 9. Math Reading Skill — Membaca $x_j$

Expression:

$$
x_j
$$

jangan dibaca sebagai:

> “x kali j.”

Subscript $j$ berfungsi sebagai **index**.

Pembacaan natural-language:

> “component ke-$j$ dari vector $\mathbf{x}$.”

Contoh:

$$
x_3=2
$$

berarti:

> component ketiga bernilai $2$.

Subscript membantu kita menunjuk satu posisi tertentu dari ordered vector.

---

# 10. Dari $x_j$ ke $x_j^{(i)}$

Pada running case HerAI kita tidak hanya mempunyai satu participant.

Kita punya banyak observations.

Untuk membedakan observation dan feature position, kita gunakan:

$$
x_j^{(i)}
$$

## Definisi

Pada course ini:

- superscript $(i)$ = observation index;
- subscript $j$ = feature/component index.

Jadi:

$$
x_j^{(i)}
$$

berarti:

> nilai feature ke-$j$ untuk observation ke-$i$.

**Penting:** superscript $(i)$ di sini **bukan exponent**.

Tanda kurung membantu membedakan observation index dari pangkat.

---

# 11. Math Reading Skill — Jangan Tukar $i$ dan $j$

Diberikan:

$$
x_2^{(4)}
$$

Baca dari dua pertanyaan:

## Pertanyaan 1 — Observation mana?

Superscript:

$$
(4)
$$

berarti observation ke-$4$.

Dalam canonical running case:

1. Alya;
2. Bima;
3. Citra;
4. Dewi.

Jadi observation ke-$4$ adalah Dewi.

## Pertanyaan 2 — Feature mana?

Subscript:

$$
2
$$

berarti feature/component ke-$2$.

Canonical feature order:

1. quiz ratio;
2. completion ratio.

Jadi:

$$
x_2^{(4)}=0.50
$$

berarti:

> completion ratio Dewi adalah $0.50$.

---

# 12. Formalizing Dimension

Sekarang kita formalkan preview dimension dari Topic 01.

## Definisi beginner-safe

**Dimension sebuah vector adalah jumlah scalar components yang membentuk vector tersebut.** [R1]

Jika:

$$
\mathbf{x}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

maka terdapat dua components.

Jadi dimension-nya:

$$
d=2
$$

Jika:

$$
\mathbf{v}
=
\begin{bmatrix}
4 \\
7 \\
2
\end{bmatrix}
$$

maka:

$$
d=3
$$

Dimension tidak dihitung dengan menjumlahkan entries.

Dimension tidak ditentukan oleh entry terbesar.

Dimension tidak mengatakan seberapa “kuat” atau “besar” vector.

---

# 13. Notation $\mathbf{x}\in\mathbb{R}^{d}$

Untuk vector yang mempunyai $d$ real-valued components, kita dapat menulis:

$$
\mathbf{x}\in\mathbb{R}^{d}
$$

## Arti setiap symbol

- $\mathbf{x}$ = vector;
- $\in$ = “merupakan anggota dari” / “berada dalam”;
- $\mathbb{R}$ = real numbers;
- $d$ = dimension atau jumlah components;
- $\mathbb{R}^{d}$ = ruang coordinate dengan $d$ real-valued components pada level pembahasan ini.

Natural-language reading:

> “Vector x mempunyai d real-valued components.”

Untuk HerAI canonical vector:

$$
\mathbf{x}^{(i)}\in\mathbb{R}^{2}
$$

karena setiap participant vector mempunyai dua real-valued components.

---

# 14. Apa itu $\mathbb{R}$?

Untuk Topic 02, kita tidak membutuhkan teori himpunan atau abstract vector spaces.

Cukup pahami:

$$
\mathbb{R}
$$

sebagai kumpulan real numbers yang mencakup nilai seperti:

$$
-2,
\quad
0,
\quad
0.75,
\quad
\frac{1}{3},
\quad
\sqrt{2}
$$

Ketika kita menulis:

$$
\mathbb{R}^{2}
$$

kita sedang mengatakan bahwa representation memiliki dua real-valued coordinate/components.

Ketika menulis:

$$
\mathbb{R}^{3}
$$

ada tiga components.

Kita **tidak** masuk ke pembahasan abstract vector space pada topic ini.

---

# 15. Dimension ≠ Magnitude

Ini salah satu safety rule terpenting Submodule 02.

Bandingkan:

$$
\mathbf{a}
=
\begin{bmatrix}
1000 \\
2000
\end{bmatrix}
$$

dan:

$$
\mathbf{b}
=
\begin{bmatrix}
0.1 \\
0.2 \\
0.3
\end{bmatrix}
$$

Vector $\mathbf{a}$ mempunyai dua components:

$$
\dim(\mathbf{a})=2
$$

Vector $\mathbf{b}$ mempunyai tiga components:

$$
\dim(\mathbf{b})=3
$$

Walaupun values $\mathbf{a}$ jauh lebih besar secara numerik, dimension $\mathbf{a}$ tetap $2$.

Walaupun values $\mathbf{b}$ kecil, dimension $\mathbf{b}$ adalah $3$.

Topic 04 nanti akan membahas konsep **magnitude/norm**.

Jangan menggunakan kata “dimension” sebagai sinonim dari magnitude.

---

# 16. Shape — Bukan Hanya “Berapa Banyak Angka”

Dimension menjawab:

> “Berapa banyak components yang dimiliki vector?”

Shape menjawab pertanyaan struktural seperti:

> “Bagaimana entries tersebut disusun sepanjang axis/arrangement?”

Untuk canonical column vector:

$$
\mathbf{x}
=
\begin{bmatrix}
x_1 \\
x_2
\end{bmatrix}
$$

susunan matematisnya mempunyai:

- $2$ rows;
- $1$ column.

Kita dapat menyebut shape matematisnya:

$$
2\times1
$$

Untuk vector dengan $d$ entries yang ditulis sebagai column vector, shape matematisnya:

$$
d\times1
$$

---

# 17. Row Presentation dan Column Presentation

Vector yang sama secara konseptual dapat muncul dengan orientation berbeda dalam berbagai textbook atau software context.

## Column presentation

$$
\mathbf{x}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Shape matematis:

$$
2\times1
$$

## Row presentation

Secara visual kita juga dapat melihat dua entries disusun mendatar:

$$
\begin{bmatrix}
0.80 & 0.75
\end{bmatrix}
$$

Shape matematis:

$$
1\times2
$$

Pada course ini, **canonical teaching representation untuk participant vector tetap column vector** supaya konsisten dengan handoff dan topic-topic berikutnya.

Topic ini belum mengajarkan operasi transpose secara formal.

Yang perlu dipahami sekarang:

> **orientation dapat mengubah shape walaupun jumlah components tetap dua.**

---

# 18. Dimension vs Shape

Untuk column vector dua component:

$$
\mathbf{x}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

kita punya:

- dimension = $2$;
- shape matematis = $2\times1$.

Jika dua values ditampilkan sebagai row:

$$
\begin{bmatrix}
0.80 & 0.75
\end{bmatrix}
$$

kita punya:

- tetap dua components;
- shape matematis = $1\times2$.

Jadi:

> **dimension dan shape berhubungan, tetapi bukan istilah yang identik.**

---

# 19. Implementation Note — Shape Matematika vs Array Software

Ini adalah bridge ringan menuju dunia implementasi, bukan coding lesson.

Dalam matematika kita sering menulis participant vector sebagai column vector dengan shape:

$$
d\times1
$$

Tetapi software library dapat mempunyai convention penyimpanan berbeda.

Contohnya, NumPy mendefinisikan `shape` sebagai tuple dari array dimensions. Array satu dimensi dengan empat entries dapat mempunyai shape `(4,)`, bukan otomatis `(4,1)`. [R4]

Jadi jangan membuat assumption:

> “Kalau sebuah object disebut vector, semua software pasti menyimpannya sebagai column matrix.”

Yang harus dijaga adalah:

- semantics;
- number of components;
- expected orientation ketika operasi membutuhkannya;
- interface contract.

Course ini tetap menggunakan column-vector notation sebagai **mathematical teaching convention**.

---

# 20. Worked Example 1 — Basic Vector Reading

Diberikan:

$$
\mathbf{v}
=
\begin{bmatrix}
-2 \\
5 \\
1.5 \\
0
\end{bmatrix}
$$

Kerjakan secara sistematis.

## Step 1 — Hitung components

Kita melihat empat entries:

1. $-2$;
2. $5$;
3. $1.5$;
4. $0$.

Maka:

$$
d=4
$$

## Step 2 — Tulis components dengan index

$$
v_1=-2
$$

$$
v_2=5
$$

$$
v_3=1.5
$$

$$
v_4=0
$$

## Step 3 — Tulis membership notation

Karena ada empat real-valued components:

$$
\mathbf{v}\in\mathbb{R}^{4}
$$

## Step 4 — Baca shape

Vector ditulis sebagai column vector dengan empat rows dan satu column.

Shape matematis:

$$
4\times1
$$

## Interpretasi

Kita baru membaca **structure** vector.

Kita belum mengetahui semantics dari $v_1,v_2,v_3,v_4$ karena tidak ada feature contract yang diberikan.

Ini penting.

> Mathematics dapat memberi kita structure, tetapi domain semantics tetap harus didefinisikan.

---

# 21. Worked Example 2 — HerAI Participant Vector

Canonical feature schema:

| $j$ | Feature | Meaning | Unit/scale |
|---:|---|---|---|
| 1 | quiz ratio | proporsi quiz benar | ratio $0$–$1$ |
| 2 | completion ratio | proporsi unit selesai | ratio $0$–$1$ |

Running dataset:

| $i$ | Participant | $q$ | $c$ |
|---:|---|---:|---:|
| 1 | Alya | $0.80$ | $0.75$ |
| 2 | Bima | $0.60$ | $0.625$ |
| 3 | Citra | $0.90$ | $1.00$ |
| 4 | Dewi | $0.70$ | $0.50$ |

---

## 21.1 Alya

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Component reading:

$$
x_1^{(1)}=0.80
$$

berarti quiz ratio Alya.

$$
x_2^{(1)}=0.75
$$

berarti completion ratio Alya.

Dimension:

$$
d=2
$$

Membership:

$$
\mathbf{x}^{(1)}\in\mathbb{R}^{2}
$$

Shape matematis column-vector convention:

$$
2\times1
$$

---

## 21.2 Bima

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

$$
x_1^{(2)}=0.60
$$

$$
x_2^{(2)}=0.625
$$

Dimension:

$$
d=2
$$

---

## 21.3 Citra

$$
\mathbf{x}^{(3)}
=
\begin{bmatrix}
0.90 \\
1.00
\end{bmatrix}
$$

$$
x_1^{(3)}=0.90
$$

$$
x_2^{(3)}=1.00
$$

Dimension:

$$
d=2
$$

---

## 21.4 Dewi

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70 \\
0.50
\end{bmatrix}
$$

$$
x_1^{(4)}=0.70
$$

$$
x_2^{(4)}=0.50
$$

Dimension:

$$
d=2
$$

---

# 22. Satu Schema untuk Semua Observation

Empat participant di atas berbeda nilainya.

Tetapi structure-nya sama.

Untuk setiap $i$:

$$
\mathbf{x}^{(i)}
=
\begin{bmatrix}
x_1^{(i)} \\
x_2^{(i)}
\end{bmatrix}
$$

Dengan contract:

$$
x_1^{(i)}=\text{quiz ratio participant }i
$$

$$
x_2^{(i)}=\text{completion ratio participant }i
$$

Dan:

$$
\mathbf{x}^{(i)}\in\mathbb{R}^{2}
$$

untuk setiap participant pada toy representation ini.

Inilah yang membuat representation dapat diproses secara konsisten.

Google ML menjelaskan bahwa model mengonsumsi feature values sebagai feature vector untuk satu example; karena itu definisi feature representation harus konsisten dan jelas. [R3][R5]

---

# 23. Feature Order sebagai Data Contract

Kita tetapkan:

$$
\text{feature order}
=
[\text{quiz ratio},\text{completion ratio}]
$$

Artinya:

- index $1$ selalu quiz ratio;
- index $2$ selalu completion ratio.

Jika Bima ditulis:

$$
\begin{bmatrix}
0.625 \\
0.60
\end{bmatrix}
$$

dengan schema yang sama, system akan membaca:

- quiz ratio = $0.625$;
- completion ratio = $0.60$.

Padahal nilai asli Bima:

- quiz ratio = $0.60$;
- completion ratio = $0.625$.

Semua angka “ada”.

Tetapi semantics salah.

Ini disebut **semantic misalignment** pada level course ini.

Tidak harus ada syntax error agar representation menjadi salah.

---

# 24. Predict Before Calculate — Silent Feature-Order Bug

Developer membuat dua records:

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
0.625 \\
0.60
\end{bmatrix}
$$

Developer berkata:

> “Kedua vector punya dimension $2$, jadi schema-nya sudah konsisten.”

Apakah dimension yang sama **cukup** membuktikan feature order benar?

**Prediksi sebelum lanjut.**

Jawaban:

> Tidak.

Dua vector dapat mempunyai dimension yang sama tetapi positions mempunyai semantics berbeda.

Consistency memerlukan lebih dari length.

Kita perlu fixed mapping:

$$
\text{index}\rightarrow\text{feature meaning}
$$

---

# 25. Change One Thing — Tambahkan Study Duration

Sekarang kita ubah satu hal.

Awalnya Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80 \\
0.75
\end{bmatrix}
$$

Dimension:

$$
d=2
$$

Kita ingin menambahkan study duration Alya:

$$
t=45\text{ minutes}
$$

Representation baru dapat ditulis secara struktur sebagai:

$$
\mathbf{x}^{(1)}_{\text{extended}}
=
\begin{bmatrix}
0.80 \\
0.75 \\
45
\end{bmatrix}
$$

Sekarang jumlah components menjadi tiga:

$$
d=3
$$

Dan jika tetap column-vector convention, shape:

$$
3\times1
$$

Apa yang berubah?

- satu feature baru ditambahkan;
- dimension berubah dari $2$ menjadi $3$;
- feature order harus diperbarui;
- feature schema harus mendefinisikan component ketiga.

Tetapi ada masalah baru.

Dua components pertama adalah ratio $0$–$1$.

Component ketiga adalah minutes.

Google ML menekankan bahwa numerical features dengan range yang sangat berbeda sering memerlukan scaling/normalization consideration. [R6]

Topic ini **belum melakukan normalization** dan belum menghitung distance.

Kita hanya mengenali bahwa:

> **menambah dimension membawa konsekuensi semantics dan scale.**

---

# 26. Higher Dimension ≠ Better Representation

Bandingkan dua proposal.

## Proposal A

$$
\mathbf{x}_{A}
=
\begin{bmatrix}
\text{quiz ratio} \\
\text{completion ratio}
\end{bmatrix}
$$

Dimension:

$$
2
$$

## Proposal B

Memakai:

1. quiz ratio;
2. completion ratio;
3. participant ID encoded sebagai angka;
4. favorite color encoded sebagai angka;
5. smartphone type encoded sebagai angka;
6. random internal database code.

Dimension:

$$
6
$$

Apakah Proposal B otomatis lebih baik karena:

$$
6>2?
$$

Tidak.

Dimension hanya menghitung components.

Ia tidak mengukur:

- relevance;
- data quality;
- causal usefulness;
- predictive utility;
- fairness;
- semantic validity.

Feature engineering tetap membutuhkan task-specific reasoning dan evaluation. [R3][R5]

---

# 27. Categorical Codes Tetap Harus Aman

Misalnya:

- `Basic = 1`;
- `Medium = 2`;
- `High = 3`.

Kita dapat secara teknis menulis:

$$
\begin{bmatrix}
0.80 \\
0.75 \\
2
\end{bmatrix}
$$

Tetapi angka $2$ tidak otomatis berarti measured quantitative component yang boleh diperlakukan seperti quiz ratio.

Coding kategori dapat membawa ordering atau hanya identity, tergantung definition.

Jangan menganggap:

$$
3-2=1
$$

mempunyai semantic distance yang sama dengan:

$$
2-1=1
$$

kecuali measurement model memang mendukung interpretation itu.

Submodule 01 sudah membangun safety rule ini dan Topic 02 mempertahankannya.

---

# 28. Missing Component Bukan Otomatis Nol

Bayangkan completion ratio seorang participant belum tersedia.

Apakah kita boleh langsung menulis:

$$
\begin{bmatrix}
0.80 \\
0
\end{bmatrix}
$$

hanya karena ada satu slot kosong?

Tidak otomatis.

Nilai:

$$
0
$$

bisa mempunyai semantics nyata, misalnya “belum menyelesaikan unit sama sekali”.

Sedangkan missing value berarti:

> “nilai belum diketahui / tidak tersedia / tidak tercatat.”

Menyamakan missing dengan zero dapat mengubah meaning representation.

Topic ini tidak membahas missing-data imputation.

Safety rule-nya hanya:

> **jangan mengisi component dengan arbitrary value tanpa mendefinisikan semantics dan policy.**

---

# 29. AI/ML Connection — Mengapa Structure Harus Konsisten?

Google ML Crash Course menjelaskan bahwa model menerima values untuk satu example melalui feature vector, bukan sekadar membaca seluruh raw dataset row secara semantik seperti manusia. [R3]

Dalam praktik, model atau preprocessing pipeline membutuhkan mapping yang stabil antara posisi dan meaning.

Jika sebuah system mengharapkan:

$$
\text{component 1}=\text{quiz ratio}
$$

$$
\text{component 2}=\text{completion ratio}
$$

lalu sebagian observations menukarnya, downstream computation tetap mungkin berjalan secara numerik tetapi menggunakan meaning yang salah.

Jadi Linear Algebra di AI bukan hanya soal formula.

Ia juga bergantung pada:

- consistent representation;
- fixed dimension ketika interface mengharuskannya;
- documented feature order;
- clear semantics;
- valid preprocessing.

---

# 30. HerAI Running Case — Feature Schema Card

Untuk Topic 02, kita tetapkan schema card sederhana.

## Canonical participant vector v1

**Purpose:** readiness representation untuk toy learning example.

**Dimension:**

$$
d=2
$$

**Mathematical orientation:** column vector.

**Shape:**

$$
2\times1
$$

**Components:**

| $j$ | Name | Symbolic meaning | Allowed interpretation |
|---:|---|---|---|
| 1 | quiz ratio | $x_1^{(i)}$ | proportion correct, $0$–$1$ |
| 2 | completion ratio | $x_2^{(i)}$ | proportion completed, $0$–$1$ |

**Not allowed:**

- component $1$ berubah menjadi completion untuk participant tertentu;
- $0.80$ disebut probability tanpa model probability;
- dimension $2$ disebut quality score;
- participant vector disebut participant itu sendiri.

---

# 31. Worked Example 3 — Audit Feature Schema

Diberikan canonical schema:

1. quiz ratio;
2. completion ratio.

Tiga records:

### Record A

$$
\begin{bmatrix}
0.90 \\
1.00
\end{bmatrix}
$$

### Record B

$$
\begin{bmatrix}
0.70 \\
0.50
\end{bmatrix}
$$

### Record C

$$
\begin{bmatrix}
0.625 \\
0.60
\end{bmatrix}
$$

Metadata mengatakan:

- A = Citra;
- B = Dewi;
- C = Bima.

Kita audit.

## Step 1 — Check dimension

Semua mempunyai dua components.

Jadi secara length:

$$
d=2
$$

untuk semuanya.

Belum cukup.

## Step 2 — Check values terhadap source running case

Bima seharusnya:

- quiz ratio $=0.60$;
- completion ratio $=0.625$.

Tetapi Record C menaruh:

- component 1 $=0.625$;
- component 2 $=0.60$.

## Step 3 — Check semantics

Canonical order mengharuskan:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

Jadi Record C gagal semantic-order check.

## Kesimpulan

> **dimension consistency tidak menjamin feature-order correctness.**

---

# 32. Math Reading Drill

Baca setiap notation berikut dengan bahasa manusia.

## A

$$
\mathbf{x}^{(3)}
$$

Pembacaan:

> seluruh feature vector observation ke-$3$.

Dalam running case:

> participant vector Citra.

---

## B

$$
x_1^{(3)}
$$

Pembacaan:

> component/feature ke-$1$ observation ke-$3$.

Dengan schema HerAI:

> quiz ratio Citra.

---

## C

$$
x_2^{(1)}
$$

Pembacaan:

> component ke-$2$ observation ke-$1$.

Dengan schema HerAI:

> completion ratio Alya.

---

## D

$$
\mathbf{x}^{(i)}\in\mathbb{R}^{2}
$$

Pembacaan:

> participant vector observation ke-$i$ mempunyai dua real-valued components.

---

# 33. Misconception Challenge

## Common misconception 1

> “Dimension adalah seberapa besar angka-angka di vector.”

**Koreksi:** dimension adalah jumlah components. Magnitude/norm adalah concept berbeda dan belum dibahas.

---

## Common misconception 2

> “Kalau dua vector punya values yang sama, order tidak penting.”

**Koreksi:** vector adalah ordered representation. Posisi membawa feature meaning.

---

## Common misconception 3

> “Kalau dua vectors sama-sama dimension $2$, schema-nya pasti sama.”

**Koreksi:** length dapat sama sementara feature meanings berbeda atau order tertukar.

---

## Common misconception 4

> “Shape $2\times1$ dan $1\times2$ pasti berarti dimension berbeda.”

**Koreksi:** keduanya dapat berisi dua components, tetapi orientation/shape berbeda.

---

## Common misconception 5

> “$x_2^{(4)}$ berarti $x$ pangkat $4$ lalu dikali $2$.”

**Koreksi:** pada course convention, $(4)$ adalah observation index dan $2$ adalah component index.

---

## Common misconception 6

> “Higher dimension selalu lebih baik untuk AI.”

**Koreksi:** higher dimension hanya berarti lebih banyak components; usefulness tetap bergantung pada semantics, relevance, data quality, preprocessing, dan evaluation.

---

## Common misconception 7

> “Missing value bisa selalu diganti zero agar shape konsisten.”

**Koreksi:** zero dapat mempunyai real semantics. Missing-data handling membutuhkan policy tersendiri.

---

## Common misconception 8

> “Mathematical column vector pasti disimpan sebagai `(d,1)` di semua software.”

**Koreksi:** implementation conventions berbeda. NumPy, misalnya, dapat menyimpan 1D array dengan shape `(d,)`. [R4]

---

# 34. Try It Yourself

## Challenge 1 — Read Components

Diberikan:

$$
\mathbf{a}
=
\begin{bmatrix}
3 \\
-1 \\
8 \\
4
\end{bmatrix}
$$

Jawab:

1. berapa $a_1$?
2. berapa $a_3$?
3. berapa dimension $\mathbf{a}$?
4. apa shape matematis jika ditulis sebagai column vector?
5. tulis membership notation menggunakan $\mathbb{R}^{d}$.

### Jawaban

$$
a_1=3
$$

$$
a_3=8
$$

$$
d=4
$$

shape:

$$
4\times1
$$

membership:

$$
\mathbf{a}\in\mathbb{R}^{4}
$$

---

## Challenge 2 — HerAI Index Reading

Canonical schema:

1. quiz ratio;
2. completion ratio.

Dewi:

$$
\mathbf{x}^{(4)}
=
\begin{bmatrix}
0.70 \\
0.50
\end{bmatrix}
$$

Jawab:

1. berapa $x_1^{(4)}$?
2. berapa $x_2^{(4)}$?
3. apa arti masing-masing?
4. berapa dimension?
5. apakah $0.50$ otomatis probability?

### Jawaban

$$
x_1^{(4)}=0.70
$$

= quiz ratio Dewi.

$$
x_2^{(4)}=0.50
$$

= completion ratio Dewi.

Dimension:

$$
2
$$

Nilai $0.50$ tidak otomatis probability.

---

## Challenge 3 — Order Audit

Schema:

$$
[\text{quiz ratio},\text{completion ratio}]
$$

Bima seharusnya:

$$
[0.60,0.625]
$$

Pipeline menghasilkan:

$$
[0.625,0.60]
$$

Jawab:

1. apakah dimension benar?
2. apakah feature order benar?
3. apakah values hilang?
4. mengapa representation tetap salah?

### Jawaban

- dimension tetap $2$;
- feature order salah;
- values tidak hilang;
- semantics tiap position salah terhadap canonical contract.

---

## Challenge 4 — Add One Feature

Alya mempunyai:

- quiz ratio $0.80$;
- completion ratio $0.75$;
- study duration $45$ minutes.

Jika ketiga values disusun dengan order:

1. quiz ratio;
2. completion ratio;
3. study duration minutes;

jawab:

1. tulis vector;
2. berapa dimension?
3. berapa shape jika column vector?
4. sebutkan satu warning sebelum vector dipakai untuk distance computation di topic berikutnya.

### Jawaban

$$
\mathbf{x}^{(1)}_{\text{extended}}
=
\begin{bmatrix}
0.80 \\
0.75 \\
45
\end{bmatrix}
$$

Dimension:

$$
3
$$

Shape:

$$
3\times1
$$

Warning:

> component ketiga menggunakan minutes dengan scale berbeda dari ratio $0$–$1$; scale treatment perlu dipikirkan sebelum geometry/distance digunakan.

---

# 35. Visual / Interactive Specification untuk Web

## [STEP-BY-STEP REVEAL] Anatomy of a Vector

**Learning purpose:** menghubungkan entire vector, component index, value, dan dimension.

**Initial state/data:**

$$
\mathbf{v}
=
\begin{bmatrix}
4 \\
7 \\
2
\end{bmatrix}
$$

**Learner action:** klik component $1$, $2$, atau $3$.

**Expected behavior:** component dipilih, label tampil sebagai $v_j$, value terkait disorot, dan dimension tetap ditampilkan sebagai $3$.

**Feedback:** “Kamu memilih component ke-$j$, bukan mengubah dimension.”

**Safety note:** jangan label dimension sebagai magnitude.

---

## [INTERACTIVE VISUAL] Observation Index vs Feature Index

**Learning purpose:** membedakan $i$ dan $j$ pada $x_j^{(i)}$.

**Initial state:** table Alya–Dewi dengan two-feature schema.

**Learner action:** pilih observation index $i$ dan feature index $j$.

**Expected behavior:** UI highlight row participant untuk $i$, lalu highlight field untuk $j$, kemudian render notation seperti:

$$
x_2^{(4)}=0.50
$$

**Feedback:** natural-language explanation otomatis:

> “Feature ke-2 observation ke-4 = completion ratio Dewi.”

---

## [COMPARE VIEW] Dimension vs Numerical Values

**Learning purpose:** membongkar misconception dimension = magnitude.

**Left:**

$$
\begin{bmatrix}
1000 \\
2000
\end{bmatrix}
$$

Label: `dimension = 2`.

**Right:**

$$
\begin{bmatrix}
0.1 \\
0.2 \\
0.3
\end{bmatrix}
$$

Label: `dimension = 3`.

**Learner action:** edit values tanpa mengubah number of slots.

**Expected behavior:** dimension tidak berubah ketika values berubah.

---

## [INTERACTIVE VISUAL] Shape Orientation Switch

**Learning purpose:** membedakan component count dan arrangement.

**Initial state:** column vector dua components.

**Learner action:** toggle `Column view` ↔ `Row view`.

**Expected behavior:** values tetap $0.80,0.75$; component count tetap $2$; shape label berubah:

$$
2\times1
$$

menjadi:

$$
1\times2
$$

**Safety note:** jangan mengajarkan transpose computation di Topic 02.

---

## [INTERACTIVE VISUAL] Feature Order Bug Detector

**Learning purpose:** menunjukkan bahwa correct values in wrong positions tetap salah.

**Initial state:** draggable cards:

- `quiz ratio = 0.60`;
- `completion ratio = 0.625`.

Fixed slots:

1. quiz ratio;
2. completion ratio.

**Learner action:** drag values ke slots.

**Expected behavior:** jika tertukar, UI memberi warning:

> “Numerically valid, semantically misaligned.”

Jika benar:

$$
\mathbf{x}^{(2)}
=
\begin{bmatrix}
0.60 \\
0.625
\end{bmatrix}
$$

---

## [NUMBER MANIPULATOR] Add/Remove Feature Slot

**Learning purpose:** menunjukkan hubungan component count dengan dimension.

**Initial state:** dua components.

**Learner action:** add third feature `study duration = 45 min`.

**Expected behavior:** dimension berubah $2\rightarrow3$, shape $2\times1\rightarrow3\times1$.

**Feedback:** tampilkan warning bahwa scale/units kini mixed.

---

# 36. Checkpoint

## Checkpoint 1

Diberikan:

$$
\mathbf{v}
=
\begin{bmatrix}
2 \\
9 \\
5
\end{bmatrix}
$$

Apa $v_2$?

**Jawaban:**

$$
9
$$

---

## Checkpoint 2

Apa dimension vector tersebut?

**Jawaban:**

$$
3
$$

---

## Checkpoint 3

Apakah dimension sama dengan sum:

$$
2+9+5=16?
$$

**Jawaban:** tidak.

---

## Checkpoint 4

Apa arti:

$$
x_1^{(3)}?
$$

**Jawaban:** feature/component ke-$1$ observation ke-$3$.

Pada schema HerAI, quiz ratio Citra.

---

## Checkpoint 5

Jika:

$$
\mathbf{x}^{(i)}\in\mathbb{R}^{2}
$$

berapa components vector tersebut?

**Jawaban:** dua.

---

## Checkpoint 6

Column vector dengan tiga components mempunyai shape matematis apa?

**Jawaban:**

$$
3\times1
$$

---

## Checkpoint 7

Apakah vector dimension $5$ pasti lebih baik untuk recommendation daripada vector dimension $2$?

**Jawaban:** tidak. Dimension hanya menyatakan component count, bukan feature quality atau model quality.

---

## Checkpoint 8

Jika values Bima benar tetapi component positions tertukar, apakah representation tetap aman?

**Jawaban:** tidak. Feature semantics menjadi misaligned.

---

# 37. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** mengidentifikasi component dari sebuah vector.
- [ ] **I can** membaca $x_j$ sebagai component ke-$j$.
- [ ] **I can** membaca $x_j^{(i)}$ sebagai feature ke-$j$ observation ke-$i$.
- [ ] **I can** membedakan observation index dan feature index.
- [ ] **I can** menjelaskan dimension sebagai jumlah components.
- [ ] **I can** membaca $\mathbf{x}\in\mathbb{R}^{d}$ pada level beginner.
- [ ] **I can** membedakan dimension dari magnitude.
- [ ] **I can** membaca shape column vector sebagai $d\times1$.
- [ ] **I can** menjelaskan perbedaan dimension dan shape.
- [ ] **I can** menjaga feature order tetap konsisten.
- [ ] **I can** menemukan values yang benar tetapi positions yang salah.
- [ ] **I can** menjelaskan bahwa higher dimension tidak otomatis better representation.
- [ ] **I can** mengenali unit/scale issue saat feature baru ditambahkan.
- [ ] **I can** menjelaskan bahwa missing value tidak otomatis sama dengan zero.
- [ ] **I can** menjelaskan bahwa software array shape dapat berbeda dari mathematical column-vector convention.
- [ ] **I can** menjelaskan mengapa consistent feature schema penting untuk AI/ML.

Jika lebih dari dua checklist belum yakin, ulangi **Worked Example 2**, **Feature Order as Data Contract**, dan **Misconception Challenge**.

---

# 38. Why This Matters Later

Topic 03 akan mulai mengoperasikan vectors.

Untuk melakukan:

- addition;
- subtraction;
- scalar multiplication;

kita harus lebih dulu memastikan vector mempunyai structure yang compatible dan feature meanings yang aligned.

Misalnya, tidak masuk akal secara semantic untuk secara diam-diam memperlakukan component pertama satu vector sebagai quiz ratio tetapi component pertama vector lain sebagai study duration.

Topic 04 nanti membawa norm dan distance.

Di sana scale/unit menjadi jauh lebih kritis.

Topic 05–06 membawa dot product dan cosine similarity.

Di sana feature alignment tetap fundamental.

Topic 07–08 mengumpulkan banyak observations ke dalam matrix.

Tanpa indexing, dimension, shape, dan feature-order literacy, matrix akan terasa seperti kumpulan angka tanpa makna.

---

# 39. Summary

Topic 02 memformalkan cara **membaca vector**.

Untuk general vector:

$$
\mathbf{x}
=
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_d
\end{bmatrix}
$$

kita belajar:

- $\mathbf{x}$ = seluruh vector;
- $x_j$ = component ke-$j$;
- $d$ = jumlah components;
- $\mathbf{x}\in\mathbb{R}^{d}$ = vector dengan $d$ real-valued components;
- column-vector convention mempunyai shape $d\times1$;
- dimension dan shape berhubungan tetapi tidak identik.

Untuk HerAI:

$$
\mathbf{x}^{(i)}
=
\begin{bmatrix}
x_1^{(i)} \\
x_2^{(i)}
\end{bmatrix}
$$

Dengan:

- $x_1^{(i)}$ = quiz ratio observation $i$;
- $x_2^{(i)}$ = completion ratio observation $i$;
- $\mathbf{x}^{(i)}\in\mathbb{R}^{2}$.

Safety rules:

- dimension ≠ magnitude;
- same dimension ≠ same schema;
- correct values + wrong order = semantic error;
- higher dimension ≠ better representation;
- missing ≠ automatically zero;
- categorical code ≠ automatically measured quantity;
- adding feature means updating semantics, dimension, shape, and scale considerations;
- mathematical vector representation dan software array storage dapat memakai conventions berbeda.

---

# 40. Bridge ke Topic 03

Sekarang kita sudah dapat:

- membangun vector;
- membaca components;
- membaca index;
- membaca dimension;
- membaca shape;
- menjaga feature order.

Pertanyaan berikutnya:

> Jika dua vectors mempunyai structure dan feature meanings yang compatible, operasi apa yang dapat kita lakukan terhadap keduanya?

Bagaimana jika kita ingin:

- menggabungkan perubahan component demi component;
- menghitung selisih representation;
- memperbesar atau memperkecil seluruh components dengan satu scalar?

Itulah fokus:

> **Topic 03 — Operasi Vektor: Penjumlahan, Pengurangan, dan Scalar Multiplication.**

---

# 41. References

## [R1] Boyd & Vandenberghe — *Introduction to Applied Linear Algebra: Vectors, Matrices, and Least Squares*

**Institution:** Stanford University / UCLA.  
**Concept supported:** vectors as ordered collections, entries/components, dimension, applied interpretation of vector entries.  
**URL:** https://stanford.edu/~boyd/vmls/

## [R2] MIT OpenCourseWare — 18.06SC Linear Algebra

**Institution:** Massachusetts Institute of Technology.  
**Concept supported:** vector components and coordinate interpretation in $\mathbb{R}^{n}$; linear algebra dependency context.  
**URL:** https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/

## [R3] Google for Developers — Machine Learning Crash Course: How a model ingests data using feature vectors

**Concept supported:** feature vectors as numerical representation of one example; feature-vector role between dataset and model.  
**URL:** https://developers.google.com/machine-learning/crash-course/numerical-data/feature-vectors

## [R4] NumPy Documentation — `numpy.ndarray.shape`

**Concept supported:** software array shape is represented as a tuple of array dimensions; one-dimensional arrays can use shape `(d,)`, illustrating that implementation convention is not identical to mathematical column-vector notation.  
**URL:** https://numpy.org/doc/stable/reference/generated/numpy.ndarray.shape.html

## [R5] Google for Developers — Numerical Data: Qualities of good numerical features

**Concept supported:** numerical feature definitions/names need clear meaning; feature quality requires data and semantic checks.  
**URL:** https://developers.google.com/machine-learning/crash-course/numerical-data/qualities-of-good-numerical-features

## [R6] Google for Developers — Machine Learning Crash Course: Numerical Data — Normalization

**Concept supported:** numerical features with substantially different ranges often require scaling/normalization consideration in ML pipelines.  
**URL:** https://developers.google.com/machine-learning/crash-course/numerical-data/normalization

## [R7] Deisenroth, Faisal, Ong — *Mathematics for Machine Learning*

**Publisher:** Cambridge University Press.  
**Concept supported:** Linear Algebra as mathematical foundation for machine learning and beginner-oriented bridge from mathematical objects to ML applications.  
**URL:** https://mml-book.github.io/

## [R8] KaTeX — Supported Functions

**Concept supported:** source-level support for `bmatrix`, `\mathbf`, `\mathbb`, `\in`, and basic notation used in this topic.  
**URL:** https://katex.org/docs/supported.html

---

# 42. QA Notes

## Academic QA

- Component didefinisikan sebagai scalar entry pada fixed position.
- Dimension didefinisikan sebagai jumlah components pada vector.
- Dimension tidak disamakan dengan magnitude/norm.
- Shape dibedakan dari dimension.
- Canonical mathematical teaching convention menggunakan column vector.
- Row presentation hanya digunakan untuk orientation comparison; transpose operation tidak diajarkan formal.
- $x_j^{(i)}$ dibaca konsisten sebagai feature ke-$j$ observation ke-$i$.
- Superscript $(i)$ tidak diperlakukan sebagai exponent.
- Feature order diperlakukan sebagai semantic/data contract.
- Same length tidak dianggap cukup untuk membuktikan same schema.
- Higher dimension tidak disebut otomatis lebih baik.
- Categorical numeric code tidak dianggap automatically metric quantity.
- Missing value tidak disamakan otomatis dengan zero.
- Study duration hanya digunakan sebagai scale-warning extension.
- Probability, gradient, optimizer, norm, distance, dot product, cosine similarity, matrix operations tetap deferred.

## Mathematical QA

Canonical HerAI schema:

1. quiz ratio;
2. completion ratio.

Canonical participant values:

- Alya: $(0.80,0.75)$;
- Bima: $(0.60,0.625)$;
- Citra: $(0.90,1.00)$;
- Dewi: $(0.70,0.50)$.

Canonical dimension:

$$
d=2
$$

Canonical membership:

$$
\mathbf{x}^{(i)}\in\mathbb{R}^{2}
$$

Canonical teaching shape:

$$
2\times1
$$

## Notation QA

- vector: bold lowercase, e.g. $\mathbf{x}$;
- scalar component: non-bold, e.g. $x_j$;
- observation vector: $\mathbf{x}^{(i)}$;
- indexed feature: $x_j^{(i)}$;
- real coordinate space: $\mathbb{R}^{d}$.

No vector operations are introduced.

## Dependency QA

Topic 02 assumes Topic 01 already established:

- scalar vs vector;
- ordered collection;
- participant vector;
- component preview;
- dimension preview;
- feature semantics;
- feature order importance.

Topic 02 prepares Topic 03 by making structure/compatibility readable, but does not perform addition, subtraction, or scalar multiplication.

## Markdown + KaTeX Source QA

- Inline mathematics uses `$...$`.
- Display mathematics uses `$$...$$`.
- Intended formulae are not placed in fenced code blocks.
- No equation images.
- `bmatrix`, `\mathbf`, `\mathbb`, `\in`, and `\vdots` are expected KaTeX-safe basic constructs [R8].
- Browser-level KaTeX rendering is **not claimed PASS** until frontend runtime integration test is executed.

---

# STOP CHECKPOINT

**Topic 02 selesai pada batas components → indexing → dimension → shape/orientation → feature order. Topic 03 belum diproduksi.**

> **Apakah Topic 02 Submodule 02 disetujui dan kita boleh melanjutkan ke Topic 03 — Operasi Vektor?**
