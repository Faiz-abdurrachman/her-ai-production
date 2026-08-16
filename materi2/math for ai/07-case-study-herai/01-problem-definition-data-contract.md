# Topic 01 — Problem Definition dan Data Contract
## Submodule 07 — Integrated Case Study: Math for AI di HerAI

> **Status kasus:** seluruh data tambahan pada topic ini bersifat **SINTETIK / PEDAGOGIS / INSTRUKSIONAL** kecuali canonical participant values yang memang sudah menjadi state kasus HerAI dari submodule sebelumnya. Tidak ada bagian pada topic ini yang boleh dibaca sebagai deskripsi arsitektur recommendation system produksi HerAI.

---

## 1. Mengapa kita mulai dari masalah, bukan dari rumus?

Enam submodule sebelumnya sudah memberi kita banyak alat matematika: vector, matrix, statistics, probability, derivative, gradient, loss, objective, dan optimization. Tantangan pada submodule terakhir bukan lagi “apakah kamu pernah melihat rumusnya?”, tetapi:

> **Apakah kamu tahu kapan sebuah quantity boleh digunakan, apa maknanya, dan kesimpulan apa yang tidak boleh diambil darinya?**

Itulah alasan Integrated Case dimulai dari **problem definition** dan **data contract**.

Sebuah sistem AI bisa memiliki perhitungan yang benar secara aritmetika tetapi tetap menghasilkan reasoning yang buruk apabila:

- objek yang dibandingkan tidak jelas;
- satu kolom dianggap “feature” tanpa definisi;
- score diperlakukan sebagai probability;
- data sintetik dipresentasikan seperti data produksi;
- quantity yang dibangun untuk latihan diperlakukan sebagai target dunia nyata;
- hasil ranking diperlakukan sebagai bukti bahwa suatu materi pasti paling baik bagi peserta.

Sebelum menghitung similarity pada Topic 02, kita harus tahu **apa yang sedang direpresentasikan**.

---

## 2. Learning Outcomes

Setelah menyelesaikan Topic 01, kamu diharapkan mampu:

1. menjelaskan decision problem **HerAI Next-Best Learning Recommendation** dalam bahasa sederhana;
2. membedakan participant, candidate material, observation, feature, context variable, constructed score, dan future model output;
3. membaca sebuah data contract dan menjelaskan makna setiap field;
4. membedakan quantity berdasarkan asalnya: **observed**, **synthetic/engineered**, **derived**, atau **model-produced**;
5. menghitung kembali canonical instructional score $h(q,c)$ tanpa mengubah maknanya;
6. menjelaskan mengapa nilai di antara $0$ dan $1$ belum tentu probability;
7. menjelaskan apa yang boleh dan tidak boleh disimpulkan dari canonical participant records;
8. menelusuri satu participant record menuju langkah berikutnya tanpa mencampurkan score, probability, loss, objective, dan metric.

---

# BAGIAN A — HOOK / REAL PROBLEM

## 3. Kasus: HerAI perlu memilih materi berikutnya

Bayangkan seorang peserta telah menyelesaikan beberapa aktivitas belajar. Sistem mempunyai beberapa candidate learning materials.

Pertanyaan yang ingin didukung adalah:

> **Dari beberapa candidate learning materials yang tersedia, materi mana yang paling masuk akal untuk dipertimbangkan sebagai materi berikutnya bagi seorang peserta, berdasarkan informasi yang tersedia?**

Perhatikan pilihan kata **“paling masuk akal untuk dipertimbangkan”**.

Topic ini tidak mengatakan:

> “Materi mana yang pasti paling baik?”

Alasannya sederhana: mathematical matching belum membuktikan educational effectiveness.

Sebuah material dapat terlihat cocok secara feature profile tetapi:

- terlalu sulit;
- kurang relevan terhadap tujuan peserta;
- cocok secara konten tetapi tidak cocok secara urutan kurikulum;
- menghasilkan engagement tinggi tetapi tidak memperbaiki learning outcome;
- menggunakan data peserta yang tidak lengkap.

Jadi decision problem kita adalah **decision support**, bukan causal proof.

---

## 4. PREDICT — Apa yang salah dengan kalimat berikut?

Sebelum membaca bagian selanjutnya, nilai pernyataan ini:

> “Citra mempunyai score $0.94$. Jadi sistem 94% yakin Citra pasti cocok dengan materi berikutnya.”

Ada beberapa masalah sekaligus:

1. $0.94$ berasal dari quantity apa?
2. Apakah quantity itu probability?
3. Materi yang dimaksud bahkan belum disebut.
4. “Pasti” bertentangan dengan makna probability sekalipun quantity itu memang probability.
5. Tidak ada bukti bahwa score tersebut mengukur educational benefit.

Nanti kita akan membedah semuanya secara formal.

---

# BAGIAN B — REACTIVATE ONLY WHAT IS NEEDED

## 5. Empat istilah yang harus tetap terpisah

Kita hanya mengaktifkan kembali konsep yang benar-benar dibutuhkan untuk Topic 01.

### 5.1 Observation

**Observation** adalah satu unit data yang sedang kita amati.

Pada participant table, satu peserta dapat diperlakukan sebagai satu observation.

Contoh:

- Alya = observation pertama;
- Bima = observation kedua.

### 5.2 Feature

**Feature** adalah atribut yang dipakai untuk merepresentasikan observation atau object tertentu.

Contoh:

- quiz ratio;
- completion ratio;
- AI interest;
- Math readiness.

### 5.3 Target / outcome

Target atau outcome **tidak otomatis ada hanya karena dataset mempunyai banyak angka**.

Target harus didefinisikan berdasarkan task tertentu.

Pada Topic 01, kita **belum mendefinisikan supervised-learning target**.

Ini penting.

Canonical score $h(q,c)$ tidak boleh diam-diam diubah menjadi target hanya karena nilainya tersedia.

### 5.4 Model output

Model output adalah quantity yang dihasilkan oleh sebuah model.

Pada Topic 01, **belum ada trainable model**.

Karena itu:

- similarity score belum dihitung;
- probability model belum dibuat;
- prediction belum dibuat;
- loss belum dihitung;
- objective belum dioptimalkan.

---

# BAGIAN C — THE END-TO-END DECISION PROBLEM

## 6. Contract keputusan

Nama running case:

> **HerAI Next-Best Learning Recommendation**

### 6.1 Input konseptual

Sistem instruksional kita mempunyai:

1. **participant records**;
2. **candidate material records**;
3. shared feature axes yang memungkinkan participant dan material dibandingkan pada Topic 02;
4. learning-context variables yang membantu kita memahami keadaan peserta.

### 6.2 Output konseptual yang akan dibangun bertahap

Submodule 07 nantinya akan menghasilkan beberapa quantity yang berbeda:

```text
participant/context data
        ↓
feature representation
        ↓
matching score
        ↓
data diagnostics
        ↓
uncertainty statement
        ↓
synthetic model output
        ↓
loss / objective
        ↓
gradient / parameter update
        ↓
evaluation
        ↓
limitation / conclusion boundary
```

**Tidak semua arrow berarti satu quantity “berubah menjadi” quantity berikutnya.**

Contohnya:

- matching score tidak berubah menjadi probability hanya karena berada sebelum probability;
- probability tidak berubah menjadi loss;
- loss tidak berubah menjadi evaluation metric;
- evaluation metric tidak otomatis menjadi educational value.

Diagram itu menunjukkan **alur reasoning**, bukan equivalence.

---

## 7. Unit of analysis

Kita punya tiga jenis object utama.

### 7.1 Participant object

Contoh:

```text
Participant: Alya
```

Mempunyai context values dan synthetic profile values.

### 7.2 Material object

Contoh:

```text
Material: Intro AI
```

Mempunyai synthetic material-profile values.

### 7.3 Participant–material pair

Contoh:

```text
(Alya, Intro AI)
```

Pair seperti ini menjadi unit penting ketika kita mulai menghitung matching pada Topic 02.

Perhatikan:

> participant record ≠ material record ≠ participant–material pair.

---

# BAGIAN D — CANONICAL MINI-DATASET CONTRACT

## 8. Canonical participant context records

Empat peserta **tidak boleh di-reset**.

| Peserta | Quiz ratio $q$ | Completion ratio $c$ | Study duration |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 menit |
| Bima | 0.60 | 0.625 | 30 menit |
| Citra | 0.90 | 1.00 | 55 menit |
| Dewi | 0.70 | 0.50 | 40 menit |

### 8.1 Makna setiap field

#### Quiz ratio $q$

- **object:** participant;
- **type:** scalar;
- **range kasus:** $0$ sampai $1$;
- **source:** canonical observed/context value pada running case;
- **semantic role:** ringkasan rasio performa quiz sebelumnya;
- **bukan:** probability keberhasilan materi berikutnya.

#### Completion ratio $c$

- **object:** participant;
- **type:** scalar;
- **range kasus:** $0$ sampai $1$;
- **source:** canonical observed/context value;
- **semantic role:** proporsi penyelesaian aktivitas pada konteks sebelumnya;
- **bukan:** probability kelulusan atau educational quality.

#### Study duration

- **object:** participant;
- **type:** scalar;
- **unit:** menit;
- **source:** canonical observed/context value;
- **semantic role:** durasi belajar pada konteks yang ditetapkan case;
- **bukan:** bukti bahwa durasi lebih lama menyebabkan hasil belajar lebih tinggi.

---

## 9. Canonical instructional weighted score

Running case membawa quantity:

$$
h(q,c)=0.6q+0.4c.
$$

Dengan canonical values:

| Peserta | $h(q,c)$ |
|---|---:|
| Alya | $0.78$ |
| Bima | $0.61$ |
| Citra | $0.94$ |
| Dewi | $0.62$ |

### 9.1 Verifikasi manual

Untuk Alya:

$$
h(0.80,0.75)
=
0.6(0.80)+0.4(0.75)
=
0.48+0.30
=
0.78.
$$

Untuk Bima:

$$
h(0.60,0.625)
=
0.6(0.60)+0.4(0.625)
=
0.36+0.25
=
0.61.
$$

Untuk Citra:

$$
h(0.90,1.00)
=
0.6(0.90)+0.4(1.00)
=
0.54+0.40
=
0.94.
$$

Untuk Dewi:

$$
h(0.70,0.50)
=
0.6(0.70)+0.4(0.50)
=
0.42+0.20
=
0.62.
$$

### 9.2 HARD semantic rule

$h(q,c)$ adalah:

> **constructed instructional weighted score.**

$h(q,c)$ **bukan otomatis**:

- probability;
- calibrated probability;
- confidence;
- target/ground truth;
- training loss;
- optimization objective;
- educational outcome;
- causal effect;
- production recommendation rule.

Angka $0.94$ milik Citra berarti:

> “Menurut formula instruksional $h$ yang memang didefinisikan seperti itu, weighted score Citra adalah $0.94$.”

Itu saja.

Kalimat berikut **tidak sah**:

> “Citra punya peluang 94% untuk berhasil.”

Tidak ada probability model yang mendukung kalimat tersebut.

---

# BAGIAN E — SYNTHETIC PARTICIPANT PROFILE CONTRACT

## 10. Mengapa kita membutuhkan feature space tambahan?

Quiz ratio, completion ratio, dan study duration menggambarkan **learning context**, tetapi belum memberi shared axes yang cocok untuk membandingkan participant dengan candidate material.

Untuk Topic 02, kita membutuhkan participant profile dan material profile yang berada pada axis yang sepadan.

Shared axes yang digunakan:

1. AI;
2. Python;
3. Math;
4. UI/UX.

Participant-side meaning:

1. AI interest;
2. Python readiness;
3. Math readiness;
4. UI/UX interest.

### 10.1 Canonical synthetic participant profiles

Seluruh nilai pada tabel berikut adalah **SINTETIK / PEDAGOGIS**.

| Peserta | AI interest | Python readiness | Math readiness | UI/UX interest |
|---|---:|---:|---:|---:|
| Alya | 0.80 | 0.50 | 0.70 | 0.30 |
| Bima | 0.50 | 0.70 | 0.60 | 0.40 |
| Citra | 0.90 | 0.40 | 0.80 | 0.20 |
| Dewi | 0.40 | 0.60 | 0.50 | 0.90 |

Feature vector participant akan ditulis:

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

Pada Topic 01, vector tersebut **belum dipakai menghitung similarity**.

Tujuan kita baru memastikan:

- urutan feature konsisten;
- setiap axis mempunyai makna;
- nilainya diketahui berasal dari data sintetik;
- range $0$–$1$ tidak membuatnya menjadi probability.

---

# BAGIAN F — CANDIDATE LEARNING-MATERIAL CONTRACT

## 11. Candidate materials

Kita menggunakan empat candidate learning materials yang sama sepanjang Integrated Case:

1. **Intro AI**
2. **Belajar Python**
3. **Desain UI/UX**
4. **Matematika Dasar**

Material-side shared axes:

1. AI relevance;
2. Python requirement;
3. Math requirement;
4. UI/UX relevance.

### 11.1 Canonical synthetic material profiles

Seluruh nilai berikut juga **SINTETIK / PEDAGOGIS**.

| Materi | AI relevance | Python requirement | Math requirement | UI/UX relevance |
|---|---:|---:|---:|---:|
| Intro AI | 1.00 | 0.60 | 0.30 | 0.20 |
| Belajar Python | 0.20 | 1.00 | 0.50 | 0.10 |
| Desain UI/UX | 0.30 | 0.20 | 0.10 | 1.00 |
| Matematika Dasar | 0.50 | 0.10 | 1.00 | 0.20 |

Material vector ditulis:

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

Untuk Intro AI:

$$
\mathbf{v}_{\mathrm{IntroAI}}
=
\begin{bmatrix}
1.00\\
0.60\\
0.30\\
0.20
\end{bmatrix}.
$$

Sekali lagi, angka-angka ini adalah **profil instruksional**, bukan probability bahwa material tersebut “benar” atau “bagus”.

---

# BAGIAN G — OBSERVED VS ENGINEERED VS DERIVED VS MODEL-PRODUCED

## 12. Quantity provenance map

Ini salah satu skill paling penting pada Integrated Case.

| Quantity | Contoh | Source class | Semantic type |
|---|---|---|---|
| quiz ratio | $q=0.80$ | canonical observed/context | context scalar |
| completion ratio | $c=0.75$ | canonical observed/context | context scalar |
| study duration | $45$ menit | canonical observed/context | context scalar |
| AI interest | $0.80$ | synthetic pedagogical profile | feature |
| Math readiness | $0.70$ | synthetic pedagogical profile | feature |
| material AI relevance | $1.00$ | synthetic pedagogical profile | feature |
| $h(q,c)$ | $0.78$ | derived from $q,c$ | constructed instructional score |
| future similarity | belum dihitung | derived later | matching score |
| future probability | belum didefinisikan | empirical/modelled later | probability |
| future prediction | belum didefinisikan | model-produced later | model output |
| future loss | belum didefinisikan | derived from model output + target | loss |
| future objective | belum didefinisikan | aggregate quantity | optimization objective |
| future evaluation metric | belum didefinisikan | evaluation calculation | metric |

### 12.1 Kenapa provenance penting?

Dua nilai dapat sama-sama bernilai $0.8$ tetapi memiliki arti yang sangat berbeda.

Contoh:

- AI interest $=0.8$;
- quiz ratio $=0.8$;
- similarity score $=0.8$;
- probability $=0.8$.

Keempatnya **bukan quantity yang sama**.

Nilai numeriknya boleh sama.
Semantiknya tetap berbeda.

---

# BAGIAN H — DATA DICTIONARY

## 13. Participant data dictionary

| Field | Object | Type | Unit/range | Source | Intended use | Prohibited interpretation |
|---|---|---|---|---|---|---|
| `participant_id` | participant | categorical ID | unique | case record | identify participant | numerical feature |
| `q` | participant | scalar | $[0,1]$ | canonical context | learning-context summary | success probability |
| `c` | participant | scalar | $[0,1]$ | canonical context | completion summary | completion probability |
| `study_duration_min` | participant | scalar | minute | canonical context | diagnostic context | causal learning effect |
| `ai_interest` | participant | scalar | $[0,1]$ | synthetic | shared profile axis | probability |
| `python_readiness` | participant | scalar | $[0,1]$ | synthetic | shared profile axis | objective difficulty |
| `math_readiness` | participant | scalar | $[0,1]$ | synthetic | shared profile axis | measured intelligence |
| `uiux_interest` | participant | scalar | $[0,1]$ | synthetic | shared profile axis | probability |
| `h_score` | participant | scalar | derived | formula $h$ | carry-forward instructional score | probability/loss/target |

## 14. Material data dictionary

| Field | Object | Type | Range | Source | Intended use | Prohibited interpretation |
|---|---|---|---|---|---|---|
| `material_id` | material | categorical ID | unique | case record | identify material | numerical feature |
| `ai_relevance` | material | scalar | $[0,1]$ | synthetic | shared profile axis | probability |
| `python_requirement` | material | scalar | $[0,1]$ | synthetic | shared profile axis | guaranteed difficulty |
| `math_requirement` | material | scalar | $[0,1]$ | synthetic | shared profile axis | causal requirement |
| `uiux_relevance` | material | scalar | $[0,1]$ | synthetic | shared profile axis | probability |

---

# BAGIAN I — MATH / SYSTEM READING SKILL

## 15. Cara membaca setiap quantity

Untuk setiap angka penting, tanyakan sebelas hal:

1. **Object** — angka ini milik siapa/apa?
2. **Notation** — scalar, vector, matrix, probability, loss, atau metric?
3. **Source** — observed, synthetic/engineered, derived, atau model-produced?
4. **Input/current state** — apa yang masuk?
5. **Operation** — perhitungan apa yang dilakukan?
6. **Output** — quantity baru apa yang keluar?
7. **Semantic type** — score? probability? loss? objective? metric?
8. **Assumption** — asumsi apa yang sedang dipakai?
9. **Justified conclusion** — apa yang boleh kita katakan?
10. **Unjustified conclusion** — apa yang tidak boleh dikatakan?
11. **Downstream role** — quantity ini dipakai di mana setelah ini?

---

# BAGIAN J — WORKED BASIC MICRO-EXAMPLE

## 16. Angka yang sama, arti yang berbeda

Misalkan kita melihat:

$$
0.80
$$

Apakah itu probability?

Belum tentu.

### Kasus A

Alya mempunyai:

$$
q=0.80.
$$

Artinya quiz ratio Alya adalah $0.80$ pada context case.

### Kasus B

Alya mempunyai:

$$
x_{\mathrm{AI}}=0.80.
$$

Artinya synthetic AI-interest feature Alya bernilai $0.80$.

Keduanya sama-sama berada di $[0,1]$, tetapi:

$$
q \neq P(\text{success})
$$

dan:

$$
x_{\mathrm{AI}} \neq P(\text{likes AI}).
$$

**Range tidak menentukan semantic type.**

---

# BAGIAN K — WORKED HerAI INTEGRATED EXAMPLE

## 17. Membaca Alya sebagai system object

Kita ambil Alya.

Canonical context:

- $q=0.80$;
- $c=0.75$;
- study duration $=45$ menit.

Constructed score:

$$
h(0.80,0.75)=0.78.
$$

Synthetic participant profile:

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

Sekarang ambil candidate material **Intro AI**:

$$
\mathbf{v}_{\mathrm{IntroAI}}
=
\begin{bmatrix}
1.00\\
0.60\\
0.30\\
0.20
\end{bmatrix}.
$$

Apa yang sudah boleh kita katakan?

- kita memiliki participant object;
- kita memiliki material object;
- kedua profile memiliki 4 axes dengan urutan konsisten;
- keduanya dapat dibandingkan menggunakan matching rule yang akan ditetapkan pada Topic 02.

Apa yang **belum** boleh kita katakan?

- “Intro AI adalah material terbaik untuk Alya”;
- “Alya 78% cocok dengan Intro AI”;
- “Alya mempunyai probability 0.78 untuk berhasil”;
- “Intro AI pasti meningkatkan hasil belajar Alya”.

Belum ada operasi yang mendukung klaim tersebut.

---

# BAGIAN L — CHANGE ONE THING / WHAT-IF

## 18. Jika completion ratio berubah, apakah semua quantity berubah?

Misalkan $c$ Alya berubah dari $0.75$ menjadi $0.85$, sementara semua synthetic profile values tetap sama.

Score baru:

$$
h(0.80,0.85)
=
0.6(0.80)+0.4(0.85)
=
0.48+0.34
=
0.82.
$$

Jadi $h$ berubah:

$$
0.78 \rightarrow 0.82.
$$

Tetapi synthetic participant profile masih:

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

Ini mengajarkan hal penting:

> Satu perubahan pada context variable tidak otomatis mengubah semua representation yang ada.

Hubungan antarquantity harus ditentukan oleh contract, bukan diasumsikan.

---

# BAGIAN M — WHY THIS MATTERS IN AI

## 19. Data contract mencegah semantic drift

Dalam sistem AI, istilah yang tidak jelas mudah berubah makna.

Hari ini sebuah kolom disebut “score”.
Besok orang lain menyebutnya “confidence”.
Lalu dashboard menampilkan “78% chance”.

Padahal tidak pernah ada probability model.

Data contract mencegah hal seperti itu dengan menetapkan:

- field name;
- object;
- data type;
- unit/range;
- provenance;
- intended use;
- forbidden interpretation.

Dokumentasi dataset yang baik juga membantu orang memahami composition, motivation, intended uses, dan limitations. Prinsip ini sejalan dengan gagasan *Datasheets for Datasets* yang mendorong dokumentasi eksplisit agar dataset tidak digunakan tanpa konteks.

---

# BAGIAN N — MISCONCEPTION / FAILURE-MODE CHALLENGE

## 20. Challenge 1 — “Semua nilai 0–1 adalah probability”

Salah.

Contoh dari case kita:

- $q=0.80$ adalah ratio;
- AI interest $=0.80$ adalah synthetic feature;
- $h=0.78$ adalah constructed score.

Tidak satupun otomatis probability.

---

## 21. Challenge 2 — “Score tertinggi berarti rekomendasi terbaik”

Citra memiliki:

$$
h=0.94.
$$

Tetapi $h$ bahkan tidak menggunakan candidate-material profile.

Bagaimana mungkin $h$ sendiri membuktikan materi mana yang paling tepat?

Tidak bisa.

---

## 22. Challenge 3 — “Study duration yang lebih panjang menyebabkan score lebih tinggi”

Dari empat peserta kita dapat melihat beberapa angka bergerak bersama, tetapi descriptive pattern tidak membuktikan causation.

Correlation atau apparent pattern bukan causal evidence.

---

## 23. Challenge 4 — “Synthetic profile berarti data nyata yang disamarkan”

Tidak.

Pada case ini, participant profile tambahan dan material profile **dibuat untuk keperluan pedagogis**.

Kita tidak boleh menyatakan bahwa:

- HerAI benar-benar mengumpulkan field tersebut;
- nilainya berasal dari database produksi;
- nilainya merupakan hasil survey riil.

---

# BAGIAN O — TRY IT YOURSELF

## 24. Mini task

Klasifikasikan quantity berikut:

1. $c=0.625$ milik Bima.
2. Math readiness Bima $=0.60$.
3. $h_{\mathrm{Bima}}=0.61$.
4. AI relevance Intro AI $=1.00$.
5. “future similarity Alya–Intro AI”.

Expected classification:

| Quantity | Source class | Semantic type |
|---|---|---|
| $c=0.625$ | canonical observed/context | ratio/context scalar |
| Math readiness $0.60$ | synthetic | feature |
| $h=0.61$ | derived | instructional score |
| AI relevance $1.00$ | synthetic | material feature |
| future similarity | derived later | matching score |

---

# BAGIAN P — VISUAL / INTERACTIVE SPEC

## 25. [STATIC VISUAL] — Quantity provenance map

**Learning purpose:** membedakan asal dan semantic type quantity.

**Initial state:** empat kolom: Observed/Context, Synthetic Features, Derived Quantities, Future Model/Evaluation Quantities.

**Learner action:** membaca arrow dari source menuju downstream quantity.

**Expected behavior:** learner dapat menunjuk bahwa $h$ berada pada “Derived”, bukan “Probability”.

**Feedback:** label pendek muncul di bawah setiap quantity.

**Safety / interpretation note:** posisi quantity pada diagram bukan berarti quantity sebelumnya setara dengan quantity sesudahnya.

---

## 26. [COMPARE VIEW] — Same number, different meaning

**Learning purpose:** menghentikan kebiasaan menganggap nilai $0$–$1$ sebagai probability.

**Initial state:** empat kartu dengan angka `0.80`.

**Learner action:** membandingkan:
- quiz ratio;
- AI interest;
- future similarity score;
- hypothetical probability.

**Expected behavior:** learner menjelaskan bahwa semantic type berasal dari definition/contract, bukan range angka.

**Feedback:** setiap kartu menampilkan object, source, dan allowed interpretation.

**Safety / interpretation note:** hypothetical probability hanya placeholder untuk membandingkan semantic type; probability case sebenarnya baru ditetapkan pada Topic 04.

---

## 27. [INTERACTIVE VISUAL] — Data-contract inspector

**Learning purpose:** melatih system-reading skill.

**Initial state:** pilih satu field, misalnya `h_score`.

**Learner action:** klik field.

**Expected behavior:** UI menampilkan:
- object;
- source;
- operation;
- output type;
- allowed conclusion;
- prohibited conclusion.

**Feedback:** jika learner memilih “probability” untuk `h_score`, UI menjelaskan mengapa salah.

**Safety / interpretation note:** tool ini menguji semantic literacy, bukan menjalankan production recommender.

---

# BAGIAN Q — CHECKPOINT

## 28. Checkpoint singkat

Jawab sebelum lanjut:

1. Apakah $h=0.94$ milik Citra adalah probability?  
   **Tidak.**

2. Apakah AI interest $=0.80$ milik Alya merupakan observed production data?  
   **Tidak. Pada case ini ia synthetic pedagogical feature.**

3. Apakah `study_duration_min` boleh langsung dianggap penyebab score tinggi?  
   **Tidak.**

4. Apakah participant vector dan material vector sudah boleh dibandingkan?  
   **Secara dimensional shared axes sudah disiapkan, tetapi matching metric baru dihitung pada Topic 02.**

5. Apakah material dengan future similarity tertinggi otomatis educationally best?  
   **Tidak. Similarity hanya satu matching signal.**

---

# BAGIAN R — MASTERY CHECK

## 29. “I can…” statements

Setelah Topic 01, kamu seharusnya dapat mengatakan:

- **I can** menjelaskan HerAI Next-Best Learning Recommendation sebagai decision-support problem.
- **I can** membedakan participant, material, dan participant–material pair.
- **I can** membaca source class setiap quantity.
- **I can** membedakan observed/context, synthetic feature, derived score, dan future model-produced quantity.
- **I can** menghitung $h(q,c)$ tanpa menyebutnya probability.
- **I can** menjelaskan mengapa range $[0,1]$ tidak menentukan semantic type.
- **I can** menjelaskan apa yang belum boleh disimpulkan dari dataset kecil ini.

---

# BAGIAN S — SCOPE BOUNDARY

## 30. Yang belum kita lakukan

Topic 01 **belum**:

- menghitung dot product;
- menghitung cosine similarity;
- memilih material berdasarkan similarity;
- menghitung mean/variance dataset;
- mendefinisikan empirical probability event;
- membuat trainable prediction model;
- menghitung loss;
- menghitung gradient;
- melakukan parameter update;
- mengevaluasi model;
- mengklaim production recommendation.

Semua itu mempunyai tempat pada topic berikutnya.

Ini bukan kekurangan.

Ini adalah sequencing.

---

# BAGIAN T — SUMMARY

## 31. Ringkasan

Topic 01 mengunci fondasi Integrated Case:

### Decision problem

> Mendukung pemilihan/ranking candidate next learning material secara instruksional, bukan membuktikan materi yang pasti terbaik.

### Participants

- Alya
- Bima
- Citra
- Dewi

### Canonical context

- quiz ratio;
- completion ratio;
- study duration.

### Synthetic participant profile

- AI interest;
- Python readiness;
- Math readiness;
- UI/UX interest.

### Synthetic material profile

- AI relevance;
- Python requirement;
- Math requirement;
- UI/UX relevance.

### Constructed score

$$
h(q,c)=0.6q+0.4c
$$

tetap **instructional score only**.

### Semantic discipline

> score ≠ probability ≠ loss ≠ objective ≠ metric ≠ educational outcome.

---

# BAGIAN U — BRIDGE TO TOPIC 02

## 32. Pertanyaan berikutnya

Sekarang participant dan material sudah berada pada shared feature axes.

Pertanyaan berikutnya:

> **Bagaimana kita mengukur kedekatan atau alignment antara participant profile dan candidate-material profile tanpa mengubah similarity menjadi probability atau educational truth?**

Itulah fokus:

# **Topic 02 — Representation dan Matching**

Pada Topic 02, kita akan mengaktifkan kembali vector, norm, dot product, dan cosine similarity hanya sebanyak yang diperlukan untuk kasus yang sama.

---

## Catatan sumber

Topic ini mengikuti continuity contract Submodule 07 dan prinsip dokumentasi dataset/feature semantics dari sumber akademik serta dokumentasi ML resmi. Detail source-to-claim mapping tersedia di `referensi-topic-01.md`.
