# Topic 03 — Joint, Union, dan Probability Table

> **Submodule 04 — Probability: Menalar Ketidakpastian dalam AI**  
> **Filename:** `03-joint-union-probability-table.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Prasyarat:** Topic 01–02 selesai; peserta dapat menjelaskan sample space $\Omega$, event $A$, probability $P(A)$, complement $A^c$, serta membedakan ratio/score dari probability  
> **Forward dependency:** Topic 04 — Conditional Probability  
> **Boundary:** Topic ini memperkenalkan intersection/joint event, union, overlap, tabel dua arah, probability table, row/column totals, dan full addition rule. Topic ini **belum** menghitung conditional probability, menguji independence, memakai Bayes, random variable, expected value, calibration, logits, atau probabilistic loss.

---

# 1. Hook — Kalau Dua Kondisi Bisa Terjadi Bersamaan, Boleh Langsung Dijumlahkan?

Bayangkan sebuah sistem pembelajaran memiliki dua event dalam satu probability model:

- $A$: sebuah learning card bertipe **challenge**;
- $B$: learning card tersebut juga meminta **reflection**.

Seseorang melihat:

$$
P(A)=0.30
$$

serta:

$$
P(B)=0.40.
$$

Lalu ia menyimpulkan:

> “Probability card termasuk challenge **atau** reflection adalah $0.30+0.40=0.70$.”

Masalahnya: bagaimana jika ada card yang **sekaligus** challenge dan reflection?

Card seperti itu akan masuk ke $A$ dan juga ke $B$. Jika kita langsung menjumlahkan $P(A)$ dan $P(B)$, bagian overlap dapat terhitung dua kali.

Inilah alasan kita memerlukan tiga ide baru:

1. **intersection** — bagian yang memenuhi $A$ **dan** $B$;
2. **union** — bagian yang memenuhi $A$ **atau** $B$, termasuk yang memenuhi keduanya;
3. **probability table** — cara menata kombinasi dua event supaya overlap terlihat jelas.

MIT 18.05 menjelaskan bahwa ketika dua event overlap, penjumlahan sederhana menghitung overlap dua kali; karena itu overlap harus dikurangkan satu kali dalam inclusion–exclusion rule. [R1]

---

# 2. Tujuan Topic 03

Setelah menyelesaikan topic ini, kamu diharapkan mampu mengatakan:

- **I can distinguish** event “$A$ dan $B$” dari event “$A$ atau $B$”.
- **I can identify** intersection $A\cap B$ sebagai bagian yang memenuhi kedua event.
- **I can identify** union $A\cup B$ sebagai bagian yang memenuhi minimal salah satu event.
- **I can read** sebuah two-way count table dan sebuah probability table tanpa mencampur semantics keduanya.
- **I can compute** simple joint probability dari probability table/model yang sudah didefinisikan.
- **I can compute and interpret** $P(A\cup B)$ dengan memperhitungkan overlap.
- **I can explain** mengapa $P(A)+P(B)$ tidak selalu sama dengan $P(A\cup B)$.
- **I can diagnose** pernyataan yang salah karena menganggap “or” selalu exclusive.
- **I can distinguish** observed count, empirical proportion, dan modeled probability table.
- **I can explain** mengapa joint probability belum sama dengan conditional probability.

---

# 3. Recall dari Topic 02 — Probability Mass Sudah Ada, Sekarang Kita Gabungkan Event

Pada Topic 02 kita sudah memakai ide bahwa total probability pada sample space adalah:

$$
P(\Omega)=1.
$$

Kita juga sudah mengenal complement:

$$
P(A^c)=1-P(A).
$$

Sekarang fokusnya berubah.

Bukan lagi hanya:

> “Berapa probability satu event?”

melainkan:

> “Bagaimana dua event berhubungan di dalam sample space yang sama?”

Dua event bisa:

- overlap;
- tidak overlap;
- atau salah satu bisa berada di dalam event lain.

Topic 03 tidak mengasumsikan bahwa semua hubungan event sama. Kita akan **melihat strukturnya terlebih dahulu**, baru menghitung.

---

# 4. Predict — Tandai Dulu Region-nya

Gunakan satu fair die dengan:

$$
\Omega=\{1,2,3,4,5,6\}.
$$

Definisikan:

- $A$: hasil genap;
- $B$: hasil lebih dari 3.

Sebelum menghitung probability, jawab:

## Prediksi 1 — “A dan B”

Outcomes mana yang memenuhi **$A$ dan $B$ sekaligus**?

## Prediksi 2 — “A atau B”

Outcomes mana yang memenuhi **minimal salah satu** dari $A$ atau $B$?

## Prediksi 3 — Apakah Boleh Langsung Menjumlahkan?

Apakah probability “$A$ atau $B$” cukup dihitung sebagai:

$$
P(A)+P(B)?
$$

Tulis alasan sebelum melihat rumus formal.

---

# 5. Intuisi — “Dan” Menunjuk Overlap, “Atau” Mengumpulkan Region

Untuk contoh dadu:

$$
A=\{2,4,6\}
$$

serta:

$$
B=\{4,5,6\}.
$$

Bagian yang muncul pada **keduanya** adalah:

$$
\{4,6\}.
$$

Ini adalah region “$A$ dan $B$”.

Sementara itu, jika kita mengumpulkan semua outcomes yang ada di $A$, di $B$, atau di keduanya, kita mendapat:

$$
\{2,4,5,6\}.
$$

Ini adalah region “$A$ atau $B$”.

Dalam probability, kata **or / atau** biasanya dibaca **inclusive**:

> $A$ atau $B$ berarti masuk $A$, masuk $B$, atau masuk keduanya.

Jadi “or” tidak otomatis berarti “tepat salah satu”.

---

# 6. Formal Definition — Intersection dan Joint Event

## 6.1 Intersection

Intersection dari event $A$ dan $B$ ditulis:

$$
A\cap B.
$$

Dibaca:

> “$A$ intersection $B$” atau “$A$ dan $B$”.

Maknanya:

> kumpulan outcomes yang memenuhi kondisi event $A$ **dan** event $B$ sekaligus.

Untuk contoh dadu:

$$
A\cap B=\{4,6\}.
$$

## 6.2 Joint probability

Probability bahwa kedua event terjadi bersama ditulis:

$$
P(A\cap B).
$$

Ini disebut **joint probability** dalam Topic 03.

Perhatikan semantic-nya:

- $A\cap B$ adalah **event**;
- $P(A\cap B)$ adalah **probability dari joint event tersebut**.

Joint probability **belum** berarti conditional probability. Topic 04 baru akan mengubah reference set dengan kata “given”.

---

# 7. Formal Definition — Union

Union dari event $A$ dan $B$ ditulis:

$$
A\cup B.
$$

Dibaca:

> “$A$ union $B$” atau “$A$ atau $B$”.

Maknanya:

> kumpulan outcomes yang berada di $A$, di $B$, atau di keduanya.

Untuk contoh dadu:

$$
A\cup B=\{2,4,5,6\}.
$$

Probability-nya ditulis:

$$
P(A\cup B).
$$

---

# 8. Math Reading Skill — Membaca Simbol sebelum Menghitung

Perhatikan dua expression:

$$
P(A\cap B)
$$

serta:

$$
P(A\cup B).
$$

## 8.1 Membaca $P(A\cap B)$

- $P$ = probability function;
- $A$ dan $B$ = dua defined events pada sample space yang sama;
- $\cap$ = intersection / “dan”;
- $A\cap B$ = outcomes yang memenuhi kedua kondisi;
- hasil $P(A\cap B)$ = sebuah probability di antara 0 dan 1.

Expression ini **tidak** mengatakan bahwa satu event menjadi condition untuk event lain.

## 8.2 Membaca $P(A\cup B)$

- $\cup$ = union / inclusive “atau”;
- $A\cup B$ mencakup bagian $A$ saja, bagian $B$ saja, dan bagian overlap;
- hasil $P(A\cup B)$ = probability minimal salah satu event terjadi.

Sebelum menghitung, tanyakan:

> “Apakah $A$ dan $B$ overlap?”

Itu menentukan apakah penjumlahan sederhana akan double count.

---

# 9. Explore Small Data — Two-Way Table sebagai Peta Kombinasi

Sebuah tabel dua arah dapat mengatur dua binary event menjadi empat region:

|  | $B$ | $B^c$ | Total |
|---|---:|---:|---:|
| $A$ | $A\cap B$ | $A\cap B^c$ | $A$ |
| $A^c$ | $A^c\cap B$ | $A^c\cap B^c$ | $A^c$ |
| **Total** | $B$ | $B^c$ | $\Omega$ |

Empat cell di bagian dalam menjawab kombinasi:

1. $A$ dan $B$;
2. $A$ dan bukan $B$;
3. bukan $A$ dan $B$;
4. bukan $A$ dan bukan $B$.

Kolom/row **Total** disebut margin atau total tepi. Pada probability table, margin dapat diperoleh dengan menjumlahkan cell yang relevan.

Tetapi ada aturan semantic yang lebih penting daripada arithmetic:

> **Sebuah tabel harus jelas apakah isinya observed counts, empirical proportions, atau modeled probabilities.**

Jangan mengganti status tabel secara diam-diam.

---

# 10. Canonical HerAI Continuity — Observed Count Table, Bukan Probability Table

Data canonical tetap:

| Peserta | Quiz ratio $q$ | Completion ratio $c$ | Study duration $t$ |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 menit |
| Bima | 0.60 | 0.625 | 30 menit |
| Citra | 0.90 | 1.00 | 55 menit |
| Dewi | 0.70 | 0.50 | 40 menit |

Untuk latihan descriptive **observed-data only**, definisikan label:

- $A_{obs}$: observed participant memiliki $q\ge0.80$;
- $B_{obs}$: observed participant memiliki $c\ge0.625$.

Dari empat rows:

- Alya: $A_{obs}$ dan $B_{obs}$;
- Bima: bukan $A_{obs}$, tetapi $B_{obs}$;
- Citra: $A_{obs}$ dan $B_{obs}$;
- Dewi: bukan $A_{obs}$ dan bukan $B_{obs}$.

Observed count table:

|  | $B_{obs}$ | bukan $B_{obs}$ | Total observed rows |
|---|---:|---:|---:|
| $A_{obs}$ | 2 | 0 | 2 |
| bukan $A_{obs}$ | 1 | 1 | 2 |
| **Total observed rows** | 3 | 1 | 4 |

Yang boleh dikatakan:

> “Pada empat observed participant rows ini, 2 rows memenuhi kedua criteria.”

Yang **tidak** boleh langsung dikatakan:

> “Maka probability future participant memenuhi kedua criteria adalah $2/4=0.5$.”

Mengapa? Karena tabel ini adalah **observed count table**, bukan probability model untuk future participant.

Tidak ada canonical number yang diubah. Threshold hanya dipakai untuk membuat descriptive label pada rows yang sudah ada.

---

# 11. Probability Table — Ketika Cell Memang Berisi Modeled Probability

Sekarang kita memakai **supplementary hypothetical/synthetic HerAI probability model** yang terpisah dari canonical participant data.

## Scenario

Satu HerAI learning-support randomizer menghasilkan satu card untuk sebuah hypothetical future learning interaction.

Definisikan:

- $A$: card bertipe **challenge**;
- $B$: card meminta **reflection**.

Probability table model ditetapkan sebagai:

|  | $B$ reflection | $B^c$ bukan reflection | Total |
|---|---:|---:|---:|
| $A$ challenge | 0.18 | 0.12 | 0.30 |
| $A^c$ bukan challenge | 0.22 | 0.48 | 0.70 |
| **Total** | 0.40 | 0.60 | 1.00 |

**Label semantic:** angka di atas adalah **stipulated modeled probabilities** untuk hypothetical randomizer. Angka tersebut bukan estimasi dari Alya, Bima, Citra, atau Dewi dan bukan evidence produksi.

Dari tabel:

$$
P(A\cap B)=0.18.
$$

Artinya:

> dalam stated synthetic model, probability sebuah card sekaligus challenge dan reflection adalah 0.18.

Row total memberi:

$$
P(A)=0.30.
$$

Column total memberi:

$$
P(B)=0.40.
$$

Seluruh probability table berjumlah:

$$
P(\Omega)=1.
$$

---

# 12. Mengapa Union Tidak Bisa Selalu Dijumlahkan Langsung?

Dari synthetic model:

$$
P(A)=0.30
$$

serta:

$$
P(B)=0.40.
$$

Jika dijumlahkan langsung:

$$
0.30+0.40=0.70.
$$

Namun bagian overlap:

$$
P(A\cap B)=0.18
$$

sudah masuk ke $P(A)$ **dan** ke $P(B)$.

Jadi overlap terhitung dua kali.

Untuk menghitung union dengan tepat, kita kurangi satu copy overlap.

---

# 13. Core Formula — Addition Rule / Inclusion–Exclusion untuk Dua Event

Untuk dua event $A$ dan $B$:

$$
P(A\cup B)
=
P(A)+P(B)-P(A\cap B).
$$

MIT 18.05 menjelaskan rule ini dengan logika double counting: pada $P(A)+P(B)$, bagian overlap $A\cap B$ terhitung dua kali; mengurangkan $P(A\cap B)$ satu kali membuat semua bagian union terhitung tepat sekali. [R1] OpenStax juga menyajikan general addition rule dalam bentuk yang sama. [R2]

## Math Reading Skill — Formula Ini Sedang Melakukan Apa?

Baca dari kiri ke kanan:

- $P(A\cup B)$ = probability minimal salah satu event terjadi;
- $P(A)$ = seluruh probability mass event $A$;
- $P(B)$ = seluruh probability mass event $B$;
- $P(A\cap B)$ = overlap yang tadi terhitung di kedua mass;
- tanda minus = menghapus **satu duplicate copy**, bukan menghapus overlap dari union.

Formula ini **tidak** berarti intersection “buruk” atau “harus dihilangkan”. Intersection tetap bagian sah dari union; kita hanya memperbaiki double counting dalam arithmetic.

---

# 14. Worked Example 1 — Basic: Fair Die

Gunakan:

$$
\Omega=\{1,2,3,4,5,6\}.
$$

Event:

$$
A=\{2,4,6\}
$$

serta:

$$
B=\{4,5,6\}.
$$

Karena fair die memberi enam outcomes equally likely:

$$
P(A)=\frac{3}{6},
$$

$$
P(B)=\frac{3}{6},
$$

serta:

$$
A\cap B=\{4,6\},
$$

sehingga:

$$
P(A\cap B)=\frac{2}{6}.
$$

Gunakan addition rule:

$$
P(A\cup B)
=
\frac{3}{6}+\frac{3}{6}-\frac{2}{6}
=
\frac{4}{6}
=
\frac{2}{3}.
$$

Cek dengan listing union:

$$
A\cup B=\{2,4,5,6\}.
$$

Ada 4 dari 6 equally likely outcomes. Hasil konsisten.

## Interpretasi

Dalam fair-die model, probability hasil genap **atau** lebih dari 3 adalah $2/3$.

Kata “atau” di sini inclusive: hasil 4 dan 6 termasuk karena memenuhi kedua event.

---

# 15. Worked Example 2 — HerAI Synthetic Probability Table

Gunakan kembali synthetic randomizer:

|  | Reflection $B$ | Bukan reflection $B^c$ | Total |
|---|---:|---:|---:|
| Challenge $A$ | 0.18 | 0.12 | 0.30 |
| Bukan challenge $A^c$ | 0.22 | 0.48 | 0.70 |
| **Total** | 0.40 | 0.60 | 1.00 |

Kita ingin:

> probability card **challenge atau reflection**.

Dari table:

$$
P(A)=0.30,
$$

$$
P(B)=0.40,
$$

$$
P(A\cap B)=0.18.
$$

Maka:

$$
P(A\cup B)
=
0.30+0.40-0.18
=
0.52.
$$

Kita juga dapat mengecek langsung cell yang termasuk union:

- challenge + reflection: 0.18;
- challenge + bukan reflection: 0.12;
- bukan challenge + reflection: 0.22.

Jumlah:

$$
0.18+0.12+0.22=0.52.
$$

Interpretasi aman:

> Dalam synthetic probability model ini, probability sebuah card memenuhi minimal salah satu kondisi—challenge atau reflection—adalah 0.52.

Bukan:

> “52% participant HerAI pasti seperti ini.”

Unit model adalah **randomizer card**, bukan participant.

---

# 16. Special Case — Jika Tidak Ada Overlap

Jika dua event tidak overlap, maka:

$$
P(A\cap B)=0.
$$

Addition rule menjadi:

$$
P(A\cup B)=P(A)+P(B).
$$

Ini adalah **special case**, bukan default universal rule.

Jadi urutan reasoning yang aman adalah:

1. cek apakah ada overlap;
2. gunakan full addition rule;
3. jika overlap memang 0, formula otomatis menyederhana.

Topic 05 nanti akan membahas secara lebih hati-hati perbedaan antara hubungan event yang tidak overlap dan konsep independence. Jangan menyamakan keduanya sekarang.

---

# 17. Change One Thing — Apa yang Terjadi jika Overlap Bertambah?

Kembali ke synthetic model awal:

$$
P(A)=0.30,
$$

$$
P(B)=0.40,
$$

$$
P(A\cap B)=0.18.
$$

Sehingga:

$$
P(A\cup B)=0.52.
$$

Sekarang **ubah satu hal**:

- $P(A)$ tetap 0.30;
- $P(B)$ tetap 0.40;
- overlap naik menjadi 0.25.

Sebelum menghitung, prediksi:

> Apakah $P(A\cup B)$ naik, turun, atau tetap?

Hitung:

$$
P(A\cup B)
=
0.30+0.40-0.25
=
0.45.
$$

Union **turun**.

Mengapa?

Karena dengan total probability $A$ dan $B$ tetap, overlap yang lebih besar berarti lebih banyak mass yang “dipakai bersama”, sehingga region yang memenuhi minimal salah satu event menjadi lebih kecil.

Ini adalah sensitivity reasoning, bukan aturan bahwa overlap selalu “buruk”. Maknanya tergantung context.

---

# 18. Probability Table Safety — Empat Label yang Jangan Dicampur

Saat melihat table, tanyakan terlebih dahulu: **angka ini apa?**

## 18.1 Observed count table

Contoh cell berisi:

> 2 observed participants.

Itu adalah count.

## 18.2 Empirical proportion table

Jika observed count dibagi total observed rows, kita mendapat empirical proportion.

Itu masih summary dari observed data.

## 18.3 Probability model table

Jika cell diberi probability berdasarkan stated probabilistic model, maka cell dapat dibaca sebagai modeled probability.

## 18.4 Predicted probability output

Ini adalah jenis output AI/ML tertentu yang membutuhkan target dan probabilistic interpretation yang jelas. Detail score-vs-probability dan calibration baru dibahas di Topic 08.

**Kesamaan angka tidak membuat keempatnya sama secara semantic.**

---

# 19. Why This Matters in AI

Joint dan union muncul ketika AI system harus menalar lebih dari satu kondisi.

Contoh conceptual:

- $A$: system menandai input sebagai perlu review;
- $B$: system menandai input sebagai berisiko format;
- $A\cap B$: kedua flag aktif;
- $A\cup B$: minimal salah satu flag aktif.

Mengapa penting?

## 19.1 Multi-trigger logic

Jika workflow mengirim case ke human review saat **minimal satu** trigger aktif, kita sedang berbicara tentang union.

## 19.2 Co-occurrence

Jika kita ingin tahu seberapa sering dua probabilistic conditions terjadi bersama dalam stated model, kita melihat joint event.

## 19.3 Avoid double counting

Menjumlahkan dua alert probabilities tanpa memeriksa overlap dapat melebih-lebihkan combined probability.

## 19.4 Table literacy

Confusion matrix, contingency table, joint table, dan banyak diagnostic summaries memakai struktur dua arah. Topic 03 memberi literacy dasar untuk membaca cell dan margins sebelum conditional probability diperkenalkan.

Tetapi ingat:

> joint association tidak otomatis berarti causal relationship.

Causality bukan scope Topic 03.

---

# 20. Misconception Challenge

Tentukan **Benar / Salah**, lalu perbaiki yang salah.

## Pernyataan 1

> “$A\cap B$ berarti $A$ atau $B$.”

**Salah.** Intersection berarti kedua kondisi terpenuhi.

## Pernyataan 2

> “$A\cup B$ hanya mencakup outcomes yang tepat berada di salah satu event, tetapi tidak keduanya.”

**Salah.** Union pada core probability dibaca inclusive dan mencakup overlap.

## Pernyataan 3

> “$P(A\cup B)=P(A)+P(B)$ selalu.”

**Salah.** Jika ada overlap, kita harus mengurangkan $P(A\cap B)$ satu kali.

## Pernyataan 4

> “Jika cell tabel berisi 2 dari 4 observed participants, cell itu otomatis joint probability 0.5 untuk future participants.”

**Salah.** Itu observed count/proportion kecuali ada probabilistic modeling step yang dinyatakan.

## Pernyataan 5

> “Joint probability dan conditional probability adalah hal yang sama.”

**Salah.** Joint memakai event gabungan pada original probability space. Conditional probability akan mengubah reference set pada Topic 04.

---

# 21. Try It Yourself

Sebuah synthetic probability model memiliki:

$$
P(A)=0.55,
$$

$$
P(B)=0.35,
$$

serta:

$$
P(A\cap B)=0.20.
$$

Tanpa membuka jawaban:

1. hitung $P(A\cup B)$;
2. jelaskan mengapa menjumlahkan 0.55 dan 0.35 saja belum selesai;
3. tulis satu kalimat yang menjelaskan arti $A\cap B$;
4. jika overlap berubah menjadi 0.10 sedangkan $P(A)$ dan $P(B)$ tetap, prediksi arah perubahan union sebelum menghitung.

## Check

$$
P(A\cup B)
=
0.55+0.35-0.20
=
0.70.
$$

Jika overlap turun ke 0.10:

$$
P(A\cup B)=0.80.
$$

Dengan marginals tetap, overlap yang lebih kecil membuat union lebih besar.

---

# 22. Visual / Interactive Spec

[COMPARE VIEW]

## Nama

**Overlap + Two-Way Probability Table**

## Purpose

Membantu learner melihat bahwa Venn-style regions dan two-way table adalah dua representasi dari relationship event yang sama, serta menunjukkan mengapa union perlu mengoreksi double counting.

## Initial state / data

Gunakan **synthetic probability model**:

|  | $B$ | $B^c$ | Total |
|---|---:|---:|---:|
| $A$ | 0.18 | 0.12 | 0.30 |
| $A^c$ | 0.22 | 0.48 | 0.70 |
| **Total** | 0.40 | 0.60 | 1.00 |

Panel kiri: dua overlapping regions $A$ dan $B$.  
Panel kanan: two-way probability table.

## Learner action

Learner dapat memilih toggle:

- `A`;
- `B`;
- `A AND B`;
- `A OR B`;
- `Show naive sum`;
- `Correct double count`.

## Expected behavior

- memilih `A AND B` menyorot hanya overlap dan cell 0.18;
- memilih `A OR B` menyorot tiga cells: 0.18, 0.12, 0.22;
- `Show naive sum` menampilkan 0.30 + 0.40 dan memberi highlight ganda pada overlap;
- `Correct double count` menghapus satu duplicate copy dan menampilkan 0.52.

## Feedback

Jika learner memilih hanya non-overlap parts untuk union, tampilkan:

> “Union bersifat inclusive: overlap tetap bagian dari $A\cup B$.”

Jika learner menjumlahkan 0.30 + 0.40 tanpa correction, tampilkan:

> “Cell 0.18 sudah masuk ke total $A$ dan total $B$. Kurangi satu copy overlap.”

## Safety / interpretation note

Selalu tampilkan badge:

> **Synthetic probability model — not canonical participant evidence.**

Jangan menampilkan table canonical Alya/Bima/Citra/Dewi sebagai modeled probabilities. Jika canonical observed count table ditampilkan sebagai compare mode, beri badge berbeda:

> **Observed counts only — not a future probability model.**

---

# 23. Checkpoint

Tanpa melihat bagian sebelumnya, jawab:

1. Apa beda $A\cap B$ dan $A\cup B$?
2. Mengapa union probability tidak selalu $P(A)+P(B)$?
3. Apa arti $P(A\cap B)$?
4. Dalam two-way probability table, apa fungsi row/column totals?
5. Apa beda observed count table dan probability model table?
6. Jika $P(A)=0.4$, $P(B)=0.5$, dan $P(A\cap B)=0.2$, berapa $P(A\cup B)$?
7. Apakah “or” pada union biasanya inclusive atau exclusive?
8. Mengapa joint probability belum sama dengan conditional probability?

### Jawaban ringkas

1. Intersection = kedua event; union = minimal salah satu, termasuk keduanya.
2. Karena overlap dapat terhitung dua kali.
3. Probability kedua event terpenuhi bersama.
4. Merangkum mass/count untuk satu event di seluruh kategori event lain.
5. Yang satu merekam observed data; yang lain menyatakan probabilistic model.
6. $0.4+0.5-0.2=0.7$.
7. Inclusive.
8. Joint tetap memakai original space; conditional akan mengubah reference set pada Topic 04.

---

# 24. Mastery Check — “I Can...”

Sebelum lanjut, pastikan kamu dapat mengatakan:

- [ ] I can explain intersection sebagai “$A$ dan $B$”.
- [ ] I can explain union sebagai inclusive “$A$ atau $B$”.
- [ ] I can read $P(A\cap B)$ sebagai joint probability.
- [ ] I can read a two-way count/probability table dan menemukan relevant cell serta margins.
- [ ] I can compute union dengan full addition rule.
- [ ] I can explain double counting dengan kata-kata, bukan hanya menghafal rumus.
- [ ] I can identify kapan simple addition adalah special case karena overlap 0.
- [ ] I can distinguish observed count/proportion dari modeled probability.
- [ ] I can reject the claim bahwa joint probability sama dengan conditional probability.
- [ ] I can keep canonical HerAI ratios/scores separate dari probability semantics.

Jika beberapa checkbox belum yakin, ulangi Worked Example 1, Probability Table Safety, dan Misconception Challenge.

---

# 25. Scope Boundary — Apa yang Sengaja Belum Dibahas?

Topic 03 berhenti pada:

- intersection dan joint event;
- union;
- overlap;
- two-way count/probability table;
- margins;
- full addition rule;
- no-overlap simplification;
- table semantic safety.

Belum dibahas sebagai core:

- conditional probability dan denominator “given”;
- independence/dependence test;
- mutually exclusive vs independence secara formal;
- Bayes;
- random variable dan expected value;
- combinatorics berat;
- 3+ event inclusion–exclusion;
- continuous joint density;
- calibration;
- logits / softmax / cross-entropy.

---

# 26. Summary

Topic 03 menambah vocabulary untuk menalar dua event sekaligus.

## Intersection

$$
A\cap B
$$

berarti kedua event terjadi.

Joint probability:

$$
P(A\cap B).
$$

## Union

$$
A\cup B
$$

berarti minimal salah satu event terjadi, termasuk overlap.

## Addition rule

$$
P(A\cup B)
=
P(A)+P(B)-P(A\cap B).
$$

Kita mengurangi overlap satu kali karena ia semula terhitung dua kali.

## Table safety

Two-way table sangat berguna, tetapi label semantics wajib jelas:

- observed counts;
- empirical proportions;
- modeled probabilities.

Angka yang terlihat sama tidak otomatis mempunyai meaning yang sama.

---

# 27. Bridge to Topic 04 — Conditional Probability

Sekarang kita sudah bisa melihat joint cell:

$$
A\cap B.
$$

Pertanyaan berikutnya adalah:

> “Bagaimana jika kita **hanya** melihat cases yang berada di event $B$? Di dalam reference set baru itu, seberapa besar bagian yang juga berada di $A$?”

Itulah perubahan besar pada Topic 04:

> **Conditional Probability — conditioning mengubah reference set.**

Kita akan menggunakan joint region dan table margins yang baru dipelajari, tetapi **formula conditional probability belum diproduksi di Topic 03 ini**.

---

# References

Sumber lengkap dan claim mapping tersedia pada `referensi-topic-03.md`.
