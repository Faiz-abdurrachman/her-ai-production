# 00 — Informasi Submodul

# Kenapa AI Butuh Matematika? + Mathematical Readiness

> **Kategori:** Foundation & Core AI  
> **Module:** Math for AI  
> **Submodul:** 01  
> **Level:** Beginner  
> **Audience:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Status:** production-ready learning package  
> **Bahasa:** Bahasa Indonesia dengan technical English setelah definisi

---

# 1. Ringkasan

Submodul ini adalah jembatan antara pengalaman sehari-hari peserta dan bahasa matematika yang akan digunakan sepanjang Math for AI.

Tujuan utamanya bukan membuat peserta menguasai seluruh matematika sekolah atau matematika universitas sebelum belajar AI. Submodul ini hanya membangun **minimum mathematical literacy** yang benar-benar diperlukan agar peserta dapat membaca, menghitung, dan menginterpretasikan materi selanjutnya dengan aman.

Learning journey dimulai dari pertanyaan paling dasar:

> Bagaimana keadaan dunia nyata berubah menjadi data yang dapat diproses sistem?

Lalu bergerak bertahap:

**real world**  
↓  
**representation**  
↓  
**dataset / observation / feature / target**  
↓  
**fraction / decimal / percentage**  
↓  
**variable / expression / equation**  
↓  
**function**  
↓  
**coordinate / graph / change**  
↓  
**power / logarithm / sigma**

Submodul berhenti pada **readiness**, bukan mastery.

Vector dan matrix formal tetap berada di Submodul 02. Statistics formal berada di Submodul 03. Probability formal berada di Submodul 04. Derivative dan gradient berada di Submodul 05. Optimization formal berada di Submodul 06.

---

# 2. Role dalam Overall Curriculum

Submodul 01 memiliki empat peran.

## 2.1 Motivation

Menjawab:

> Kenapa matematika muncul ketika kita belajar AI?

Peserta melihat bahwa model tidak menerima dunia nyata secara utuh. Sistem menerima representasi data dan melakukan operations terhadap quantities yang sudah didefinisikan.

## 2.2 Mathematical Reading Readiness

Peserta belajar membaca simbol seperti:

$$
\frac{6}{8}
$$

$$
x_j^{(i)}
$$

$$
f(x)
$$

$$
\frac{\Delta y}{\Delta x}
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

tanpa harus mempelajari teori lanjutnya terlebih dahulu.

## 2.3 Interpretation Safety

Submodul membangun kebiasaan untuk selalu bertanya:

- quantity ini mewakili apa?
- unit-nya apa?
- denominator-nya apa?
- apakah score ini benar-benar probability?
- apakah graph ini hanya association atau membuktikan causation?
- apakah angka kategori mempunyai jarak numerik yang bermakna?
- apakah formula toy ini sudah divalidasi sebagai model?

## 2.4 Forward Dependency

Submodul memastikan materi berikutnya tidak perlu berhenti terus-menerus untuk menjelaskan variable, function, fraction, coordinate, exponent, atau sigma dari nol.

---

# 3. Prerequisite

Tidak diperlukan:

- calculus;
- linear algebra;
- probability formal;
- statistics formal;
- programming;
- machine learning experience.

Peserta diharapkan nyaman dengan:

- membaca angka;
- operasi dasar penjumlahan, pengurangan, perkalian, dan pembagian;
- mengikuti contoh langkah demi langkah.

Jika kemampuan tersebut terasa berkarat, peserta tetap dapat mengikuti normal learning path karena Topic 03–07 menyediakan refresh terstruktur.

---

# 4. Learning Outcomes Submodul

## LO-01.1 — Representation Literacy

Peserta mampu membedakan objek/kejadian dunia nyata dari data yang merepresentasikannya serta menjelaskan konsekuensi pilihan representasi.

**Primary Topic:** Topic 01.

## LO-01.2 — Dataset Literacy

Peserta mampu menentukan observation unit dan membedakan feature, identifier, target, serta prediction dalam supervised learning context sederhana.

**Primary Topic:** Topic 02.

## LO-01.3 — Number Literacy

Peserta mampu mengubah dan menginterpretasikan fraction, decimal, ratio, dan percentage serta menjaga perbedaan antara percentage, normalized value, score, dan probability.

**Primary Topic:** Topic 03.

## LO-01.4 — Algebra Literacy

Peserta mampu membaca variable, constant, coefficient, expression, equation, substitution, serta mengevaluasi expression sederhana.

**Primary Topic:** Topic 04.

## LO-01.5 — Function Literacy

Peserta mampu membaca function sebagai mapping input-output, mengevaluasi function, serta menjelaskan domain/range pada level beginner.

**Primary Topic:** Topic 05.

## LO-01.6 — Graph and Change Literacy

Peserta mampu membaca coordinate graph, menghitung $\Delta x$, $\Delta y$, dan average rate of change serta menginterpretasikan graph tanpa membuat causal claim yang tidak didukung.

**Primary Topic:** Topic 06.

## LO-01.7 — Notation Literacy

Peserta mampu membaca powers, logarithms, dan sigma serta membongkar formula yang lebih panjang menjadi urutan operasi yang dapat dijelaskan.

**Primary Topic:** Topic 07.

---

# 5. Estimasi Waktu

Berdasarkan actual production density tujuh topic:

| Komponen | Estimasi |
|---|---:|
| Topic 01 | 50–75 menit |
| Topic 02 | 60–85 menit |
| Topic 03 | 70–95 menit |
| Topic 04 | 70–95 menit |
| Topic 05 | 75–100 menit |
| Topic 06 | 85–110 menit |
| Topic 07 | 85–110 menit |
| Latihan submodul | 90–140 menit |
| Kuis | 25–40 menit |
| Diskusi/refleksi | 35–60 menit |

Estimasi full path:

$$
645\text{–}910\text{ menit}
$$

atau sekitar:

$$
10.75\text{–}15.2\text{ jam}
$$

Waktu aktual dapat lebih singkat untuk peserta yang sudah memiliki mathematical readiness dan memilih accelerated path.

---

# 6. Diagnostic Ringan

Diagnostic ini **bukan tes kelulusan**. Fungsinya hanya membantu peserta memilih learning path.

Jawab tanpa kalkulator jika memungkinkan.

## D1

Alya menyelesaikan 6 dari 8 unit. Mana bentuk yang benar?

A. $6\%$  
B. $75\%$  
C. $80\%$  
D. $0.6\%$

## D2

Apakah kode peserta `HERAi-204` otomatis merupakan numerical quantity yang boleh dibandingkan dengan operasi “dua kali lebih besar”?

A. Ya  
B. Tidak

## D3

Jika:

$$
q=0.8
$$

apa yang paling tepat?

A. $q$ adalah symbol yang pada konteks ini bernilai $0.8$  
B. $q$ selalu berarti probability  
C. $q$ berarti $8\%$  
D. Huruf tidak boleh mewakili angka

## D4

Jika:

$$
f(x)=2x+1
$$

berapa:

$$
f(3)
$$

A. $5$  
B. $6$  
C. $7$  
D. $9$

## D5

Point:

$$
(2,5)
$$

memiliki coordinate horizontal:

A. $2$  
B. $5$

## D6

Jika output naik $8$ ketika input naik $4$, average rate of change adalah:

A. $0.5$  
B. $2$  
C. $4$  
D. $12$

## D7

$$
3^2
$$

bernilai:

A. $6$  
B. $9$

## D8

Jika:

$$
2^4=16
$$

maka:

$$
\log_2(16)=?
$$

A. $2$  
B. $4$  
C. $8$  
D. $16$

## D9

Apa arti:

$$
\sum_{i=1}^{3}x_i
$$

A. $x_1+x_2+x_3$  
B. $x_1x_2x_3$  
C. rata-rata tiga values secara otomatis  
D. value terbesar

## D10

Apakah score $0.78$ otomatis berarti probability $78\%$?

A. Ya  
B. Tidak

### Kunci Diagnostic

D1 B, D2 B, D3 A, D4 C, D5 A, D6 B, D7 B, D8 B, D9 A, D10 B.

---

# 7. Suggested Learning Path

## 0–4 benar — Foundation Path

Ikuti Topic 01–07 secara penuh.

Kerjakan:

- Predict Before Formalization;
- Worked Examples;
- Try It Yourself;
- Checkpoint;
- Mastery Check.

Tidak ada label “lemah” atau “tertinggal”. Jalur ini hanya memberi lebih banyak repetition.

## 5–7 benar — Standard Path

Ikuti seluruh topic, tetapi bagian yang sudah familiar dapat dibaca lebih cepat.

Tetap kerjakan:

- misconception challenges;
- HerAI running case;
- checkpoint;
- mastery check.

## 8–10 benar — Accelerated Path

Boleh skim:

- operasi dasar yang sudah dikuasai;
- contoh arithmetic yang terlalu familiar.

Tetapi jangan melewati:

- representation semantics;
- feature vs target;
- score vs probability;
- graph vs causation;
- function notation;
- sigma/notational reading;
- integrated exercises dan kuis.

---

# 8. Concept Map

```text
Dunia nyata
   ↓
Representasi
   ↓
Dataset
   ├── Observation
   ├── Feature
   ├── Identifier
   ├── Target
   └── Prediction
   ↓
Raw quantities
   ├── Fraction
   ├── Decimal
   ├── Ratio
   └── Percentage
   ↓
Symbolic language
   ├── Variable
   ├── Constant
   ├── Coefficient
   ├── Expression
   └── Equation
   ↓
Function
   ├── Input
   ├── Rule
   ├── Output
   ├── Domain
   └── Range
   ↓
Graph
   ├── Ordered pair
   ├── Axis
   ├── Δx
   ├── Δy
   └── Average rate of change
   ↓
Notation readiness
   ├── Powers
   ├── Logarithms
   └── Sigma
   ↓
READY FOR LINEAR ALGEBRA
```

---

# 9. Daftar Topic

1. **Dunia Nyata Menjadi Representasi Komputasional**  
   Fokus: real-world object vs recorded data, representation choice, numeric coding safety.

2. **Data, Observation, Feature, dan Target**  
   Fokus: unit observation, feature/identifier/target/prediction, indexed data literacy.

3. **Pecahan, Desimal, dan Persentase: Membaca Proporsi dengan Benar**  
   Fokus: denominator, conversion, comparison, score/percentage/probability safety.

4. **Variable, Expression, dan Equation**  
   Fokus: symbolic naming, coefficients, substitution, equality, simple equations.

5. **Function: Dari Input ke Output**  
   Fokus: mapping, function notation, domain/range, one-input dan two-input functions.

6. **Coordinate, Graph, dan Perubahan**  
   Fokus: ordered pairs, axes, graph literacy, slope, average rate of change.

7. **Powers, Logarithms, dan Sigma**  
   Fokus: notation literacy untuk exponent, inverse log relationship, summation.

---

# 10. Persistent HerAI Running Case

Submodul menggunakan mini dataset yang sama agar learning journey tidak terfragmentasi.

| Participant | Quiz correct | Quiz total | Completion done | Completion total | Study duration |
|---|---:|---:|---:|---:|---:|
| Alya | 8 | 10 | 6 | 8 | 45 min |
| Bima | 6 | 10 | 5 | 8 | 30 min |
| Citra | 9 | 10 | 8 | 8 | 55 min |
| Dewi | 7 | 10 | 4 | 8 | 40 min |

Derived ratios:

| Participant | $q$ | $c$ |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

Toy instructional function:

$$
h(q,c)=0.6q+0.4c
$$

**Safety note:** $h(q,c)$ adalah instructional score untuk belajar mathematics. Ia bukan probability model dan bukan production recommendation formula HerAI.

---

# 11. Vocabulary Awal

| Istilah | Makna ringkas |
|---|---|
| representation | bentuk data yang digunakan sistem untuk menyimpan/memproses informasi |
| dataset | kumpulan examples/records |
| observation | satu unit yang diamati |
| feature | input information untuk model/task tertentu |
| identifier | nilai untuk mengidentifikasi entity/record |
| target / label | outcome yang ingin diprediksi pada supervised task |
| prediction | output model |
| numerator | pembilang |
| denominator | penyebut |
| ratio | perbandingan dua quantities |
| percentage | ratio per 100 |
| variable | symbol yang mewakili quantity/value |
| coefficient | numerical factor yang mengalikan variable |
| expression | kombinasi values/variables/operations |
| equation | statement bahwa dua expressions equal |
| function | mapping setiap valid input ke tepat satu output |
| domain | set valid inputs |
| range | outputs yang dihasilkan |
| ordered pair | coordinate pair $(x,y)$ |
| slope | rate of change garis |
| exponent | pangkat |
| logarithm | inverse relationship dari exponentiation |
| sigma | notation untuk repeated summation |

---

# 12. Notation Convention

## Scalar

Gunakan non-bold:

$$
x,\ y,\ q,\ c,\ s,\ p
$$

## Indexed value

$$
x_i
$$

atau jika menekankan observation/feature:

$$
x_j^{(i)}
$$

## Target dan prediction

$$
y^{(i)}
$$

$$
\hat{y}^{(i)}
$$

## Future vector preview

$$
\mathbf{x}
$$

## Future matrix preview

$$
\mathbf{X}
$$

## Future parameter vector preview

$$
\boldsymbol{\theta}
$$

## Change

$$
\Delta x
$$

$$
\Delta y
$$

## Summation

$$
\sum_{i=1}^{n}x_i
$$

---

# 13. Math Authoring Contract

Canonical source untuk web adalah Markdown + LaTeX.

Inline math:

`$...$`

Display math:

`$$...$$`

Rules:

- setiap simbol baru didefinisikan;
- tidak ada raw LaTeX di luar math delimiters;
- formula tidak ditempatkan di fenced code block;
- formula utama dijelaskan secara konseptual;
- source diarahkan untuk KaTeX pada frontend Vanilla JS;
- source correctness, mathematical correctness, dan browser rendering diperlakukan sebagai QA yang berbeda.

---

# 14. Assessment Alignment

| LO | Topic | Formative evidence | Summative evidence |
|---|---|---|---|
| LO-01.1 | 01 | representation challenges | Latihan 1, Kuis 1 |
| LO-01.2 | 02 | role sorter, notation checkpoints | Latihan 2, Kuis 2 |
| LO-01.3 | 03 | conversion/manipulator | Latihan 3, Kuis 3 & 9 |
| LO-01.4 | 04 | substitution/formula reading | Latihan 4, Kuis 4 |
| LO-01.5 | 05 | function evaluation | Latihan 5, Kuis 5 |
| LO-01.6 | 06 | graph/rate reasoning | Latihan 6, Kuis 6 |
| LO-01.7 | 07 | sigma/log reading | Latihan 7, Kuis 7 |
| Integrated | 01–07 | HerAI running case | Latihan 8, Kuis 8 & 10 |

---

# 15. Completion Criteria

Peserta siap menuju Submodule 02 jika:

1. memperoleh minimal threshold course yang ditetapkan platform pada kuis;
2. mampu menjelaskan kesalahan pada integrated reasoning audit;
3. Mastery Check utama Topic 01–07 sebagian besar sudah tercapai;
4. mampu membaca formula sederhana tanpa mengabaikan semantics quantity;
5. memahami bahwa Math for AI selanjutnya akan menambah rigor, bukan mengganti konsep readiness ini.

---

# 16. Bridge ke Submodule 02

Kita sekarang dapat membaca beberapa quantities terpisah:

$$
q=0.80
$$

$$
c=0.75
$$

Tetapi AI sering bekerja dengan banyak features sekaligus.

Daripada menyimpan setiap quantity sebagai symbol terpisah, kita membutuhkan mathematical object yang dapat mengorganisasi beberapa values bersama.

Submodule 02 memulai dari:

> **scalar → vector → dimension → operations → distance → dot product → cosine similarity → matrix**

tanpa perlu mengulang lagi foundations dari Submodule 01.
