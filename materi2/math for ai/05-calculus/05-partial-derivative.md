# Topic 05 — Partial Derivative
## Submodule 05 — Calculus: Perubahan, Turunan, dan Gradient

> **Posisi topik:** Topic 04 sudah mengajarkan cara menghitung derivative sederhana untuk fungsi **satu variabel**. Topic 05 memperluas ide tersebut ke fungsi dengan **lebih dari satu input**. Fokusnya adalah partial derivative: bagaimana output berubah secara lokal terhadap **satu variabel yang dipilih**, sementara variabel independen lain diperlakukan tetap dalam operasi matematika. Gradient, chain rule, loss landscape, dan mechanics Optimization masih ditahan untuk topic berikutnya.

## Tujuan Pembelajaran

Setelah menyelesaikan topik ini, peserta diharapkan mampu:

1. membedakan fungsi satu variabel dan fungsi dua variabel;
2. menjelaskan mengapa fungsi multivariable memerlukan lebih dari satu derivative direction;
3. membaca notasi $\frac{\partial f}{\partial x}$ dan $\frac{\partial f}{\partial y}$;
4. menjelaskan makna “variabel lain diperlakukan konstan” secara matematis;
5. menghitung partial derivative fungsi polynomial dua variabel sederhana;
6. mengevaluasi partial derivative pada titik tertentu;
7. menginterpretasikan sign, magnitude, dan unit partial derivative secara lokal;
8. menghubungkan partial derivative dengan irisan/slice dari permukaan fungsi;
9. menghitung $\frac{\partial h}{\partial q}$ dan $\frac{\partial h}{\partial c}$ untuk canonical HerAI instructional score;
10. menjelaskan mengapa partial derivative dari instructional score **bukan probability, causal effect, atau production feature importance**;
11. menggunakan synthetic scalar loss sederhana untuk membaca sensitivity terhadap satu parameter tanpa melakukan parameter update; dan
12. mengetahui secara jelas bahwa penggabungan semua partial derivatives menjadi satu vector baru akan dipelajari di Topic 06.

---

# 1. HOOK / REAL PROBLEM — Bagaimana Kalau Output Bergantung pada Lebih dari Satu Input?

Sampai Topic 04, kita sering melihat fungsi seperti:

$$
f(x)=x^2+3x.
$$

Ada satu input utama, yaitu $x$.

Kalau kita bertanya:

> “Bagaimana output berubah ketika $x$ berubah sedikit?”

kita cukup mencari derivative terhadap $x$.

Tetapi banyak fungsi yang relevan untuk AI memiliki beberapa input atau parameter.

Misalnya sebuah **synthetic instructional function**:

$$
F(x,y)=x^2+xy+y^2.
$$

Output $F$ bergantung pada **dua input**, yaitu $x$ dan $y$.

Sekarang pertanyaannya bercabang:

- bagaimana $F$ berubah jika $x$ berubah sedikit sementara $y$ dipertahankan tetap?
- bagaimana $F$ berubah jika $y$ berubah sedikit sementara $x$ dipertahankan tetap?

Kedua pertanyaan itu tidak harus memiliki jawaban yang sama.

Di sinilah kita membutuhkan **partial derivative**.

## Predict

Sebelum melihat aturan formal, coba prediksi:

1. Untuk $F(x,y)=x^2+y$, jika kita hanya mengubah $x$, apakah bagian $y$ ikut menghasilkan perubahan?
2. Untuk $G(x,y)=3x+5y$, apakah sensitivity terhadap $x$ sama dengan sensitivity terhadap $y$?
3. Jika suatu partial derivative bernilai positif, apakah itu otomatis berarti variabel tersebut “baik”?
4. Jika partial derivative terhadap satu input lebih besar, apakah itu otomatis membuktikan input tersebut paling penting di dunia nyata?

Simpan jawaban awalmu. Kita akan mengujinya secara matematis.

---

# 2. INTUITION — “Change One Input” pada Fungsi Multivariable

Bayangkan sebuah panel dengan dua knob:

- knob pertama mengubah $x$;
- knob kedua mengubah $y$;
- layar menunjukkan output $F(x,y)$.

Kalau kita ingin mengetahui sensitivity terhadap $x$, kita melakukan eksperimen matematis sederhana:

> gerakkan knob $x$ sedikit, sementara knob $y$ **tidak digerakkan**.

Kalau ingin sensitivity terhadap $y$:

> gerakkan knob $y$ sedikit, sementara knob $x$ **tidak digerakkan**.

Itulah intuisi partial derivative.

Penting:

> “Variabel lain dianggap konstan” adalah **aturan operasi matematika** saat menghitung partial derivative. Kalimat itu tidak berarti variabel lain benar-benar tidak berubah di dunia nyata, tidak berarti eksperimen kausal telah dilakukan, dan tidak membuktikan bahwa satu variabel menyebabkan output.

---

# 3. EXPLORE — Satu Permukaan, Dua Irisan

Ambil:

$$
F(x,y)=x^2+xy+y^2.
$$

Karena ada dua input dan satu output, graph lengkapnya dapat dibayangkan sebagai sebuah **surface**.

Kita tidak perlu menguasai gambar 3D secara mendalam. Yang lebih penting adalah ide **slice**.

## Slice 1 — tahan $y=2$

Substitusikan $y=2$:

$$
F(x,2)=x^2+2x+4.
$$

Sekarang kita memiliki fungsi satu variabel dalam $x$.

Derivative-nya:

$$
\frac{d}{dx}F(x,2)=2x+2.
$$

Ini memberi local rate pada slice ketika $y$ dipertahankan 2.

## Slice 2 — tahan $x=2$

Substitusikan $x=2$:

$$
F(2,y)=4+2y+y^2.
$$

Derivative terhadap $y$:

$$
\frac{d}{dy}F(2,y)=2+2y.
$$

Kita melihat bahwa satu surface dapat dibaca dari arah input yang berbeda.

Partial derivative memberi cara formal untuk melakukan ini tanpa harus selalu menulis slice secara terpisah.

---

# 4. FORMAL DEFINITION — Apa Itu Partial Derivative?

Untuk fungsi dua variabel:

$$
f(x,y),
$$

partial derivative terhadap $x$ adalah derivative fungsi terhadap $x$ ketika $y$ diperlakukan konstan.

Kita tulis:

$$
\frac{\partial f}{\partial x}.
$$

Partial derivative terhadap $y$ adalah derivative terhadap $y$ ketika $x$ diperlakukan konstan:

$$
\frac{\partial f}{\partial y}.
$$

Secara konseptual, partial derivative tetap merupakan **local rate of change**. Perbedaannya adalah kita sekarang menentukan **variabel mana** yang sedang diubah.

## Advanced / Optional — hubungan dengan limit

Secara formal, partial derivative terhadap $x$ dapat ditulis:

$$
\frac{\partial f}{\partial x}(x,y)
=
\lim_{h\to0}
\frac{f(x+h,y)-f(x,y)}{h},
$$

jika limit tersebut ada.

Perhatikan bahwa pada expression itu:

- $x$ berubah menjadi $x+h$;
- $y$ tetap $y$;
- kita melihat ratio perubahan output terhadap perubahan kecil pada $x$.

Formula limit ini membuat definisi mathematically honest, tetapi **bukan computation requirement utama** Topic 05. Untuk fungsi sederhana, kita akan memakai differentiation rules dari Topic 04 sambil memperlakukan variabel lain sebagai constant.

---

# 5. NOTATION + FORMULA — Mengapa Simbolnya $\partial$, Bukan $d$?

Untuk fungsi satu variabel kita biasa menulis:

$$
\frac{df}{dx}.
$$

Untuk fungsi beberapa variabel, kita gunakan simbol partial:

$$
\frac{\partial f}{\partial x},
\qquad
\frac{\partial f}{\partial y}.
$$

Bacanya:

- $\frac{\partial f}{\partial x}$: “partial derivative $f$ terhadap $x$”;
- $\frac{\partial f}{\partial y}$: “partial derivative $f$ terhadap $y$”.

Notation alternatif seperti $f_x$ dan $f_y$ memang ada di literatur, tetapi Topic 05 memakai notation fraction berbasis $\partial$ sebagai learner-facing notation utama karena lebih eksplisit menunjukkan variabel differentiation.

---

# 6. MATH READING SKILL — Cara Membaca Partial Derivative dengan Lengkap

Diberikan:

$$
\frac{\partial f}{\partial x}(a,b)=3.
$$

Jangan hanya membaca “hasilnya tiga”. Baca delapan lapis maknanya.

## 1. Symbol

- $f$: fungsi yang menghasilkan output scalar;
- $x$: variabel yang sedang divariasikan;
- $(a,b)$: titik tempat partial derivative dievaluasi;
- $3$: local rate terhadap $x$ pada titik tersebut.

## 2. Input

Input fungsi adalah pasangan $(x,y)$.

## 3. Operation

Kita membaca perubahan lokal output ketika $x$ berubah sedikit dan $y$ diperlakukan tetap.

## 4. Output

Hasilnya scalar: di titik $(a,b)$ local rate terhadap $x$ bernilai 3.

## 5. Unit

Jika $f$ memiliki unit “score-unit” dan $x$ memiliki unit “x-unit”, maka partial derivative memiliki unit:

$$
\frac{\text{score-unit}}{\text{x-unit}}.
$$

## 6. Assumption / condition

Interpretasi local derivative mengasumsikan derivative yang relevan ada pada titik tersebut.

## 7. Local, bukan global

Nilai 3 adalah informasi local di sekitar $(a,b)$. Ia tidak otomatis berlaku di seluruh domain.

## 8. Apa yang **tidak** diimplikasikan

Nilai 3 tidak otomatis berarti:

- $x$ menyebabkan perubahan dunia nyata sebesar 3;
- $x$ adalah feature paling penting;
- output adalah probability;
- sistem harus mengubah $x$ sebesar nilai tertentu;
- proses Optimization sudah terjadi.

---

# 7. WORKED BASIC EXAMPLE — Hitung Dua Partial Derivative

Gunakan fungsi **synthetic**:

$$
F(x,y)=x^2+xy+y^2.
$$

Kita cari partial derivative terhadap masing-masing variable.

## Terhadap $x$

Saat differentiating terhadap $x$, anggap $y$ sebagai constant.

Term demi term:

$$
\frac{\partial}{\partial x}(x^2)=2x,
$$

$$
\frac{\partial}{\partial x}(xy)=y,
$$

karena $y$ diperlakukan sebagai constant multiplier, dan:

$$
\frac{\partial}{\partial x}(y^2)=0.
$$

Maka:

$$
\frac{\partial F}{\partial x}=2x+y.
$$

## Terhadap $y$

Sekarang $x$ diperlakukan constant.

$$
\frac{\partial}{\partial y}(x^2)=0,
$$

$$
\frac{\partial}{\partial y}(xy)=x,
$$

$$
\frac{\partial}{\partial y}(y^2)=2y.
$$

Maka:

$$
\frac{\partial F}{\partial y}=x+2y.
$$

## Evaluate di titik $(1,2)$

Untuk $x$ direction:

$$
\frac{\partial F}{\partial x}(1,2)
=
2(1)+2
=
4.
$$

Untuk $y$ direction:

$$
\frac{\partial F}{\partial y}(1,2)
=
1+2(2)
=
5.
$$

Interpretasi aman:

- di sekitar $(1,2)$, output berubah secara lokal dengan rate 4 per unit $x$ ketika $y$ mathematically held fixed;
- di titik yang sama, output berubah dengan local rate 5 per unit $y$ ketika $x$ held fixed.

Jangan mengubah angka 4 dan 5 menjadi causal-effect claim.

---

# 8. WORKED HerAI EXAMPLE — Partial Derivative dari Canonical Instructional Score

Canonical HerAI instructional score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Di sini:

- $q$ = quiz ratio;
- $c$ = completion ratio;
- $h$ = **instructional score only**.

Score ini **bukan** probability, confidence, accuracy, causal outcome, atau production recommendation rule.

## Partial terhadap $q$

Saat differentiating terhadap $q$, perlakukan $c$ sebagai constant.

$$
\frac{\partial h}{\partial q}
=
0.6.
$$

Artinya di dalam fungsi instructional yang didefinisikan, local rate score terhadap perubahan $q$ adalah 0.6 score-unit per q-unit.

Karena fungsi ini linear, rate tersebut constant di seluruh domain fungsi toy ini.

## Partial terhadap $c$

Saat differentiating terhadap $c$, perlakukan $q$ sebagai constant.

$$
\frac{\partial h}{\partial c}
=
0.4.
$$

Interpretasinya: di dalam instructional function tersebut, local rate score terhadap $c$ adalah 0.4 score-unit per c-unit.

## Contoh menggunakan Alya

Alya memiliki:

$$
q=0.80,
\qquad
c=0.75.
$$

Partial derivatives tetap:

$$
\frac{\partial h}{\partial q}(0.80,0.75)=0.6,
$$

$$
\frac{\partial h}{\partial c}(0.80,0.75)=0.4.
$$

Mengapa tidak berubah terhadap participant? Karena $h$ adalah toy **linear** function dengan coefficient tetap. Itu adalah property dari fungsi pedagogis ini, bukan fakta umum tentang model AI.

### Safety reading

Dari $0.6>0.4$ kita **tidak boleh** menyimpulkan secara otomatis bahwa:

- quiz “lebih menyebabkan” keberhasilan belajar;
- quiz adalah feature paling penting secara real-world;
- quiz memiliki probability impact 60%;
- production HerAI harus memberi bobot tersebut.

Angka itu hanya local mathematical sensitivity dari function yang sejak awal kita definisikan sendiri.

---

# 9. CHANGE ONE THING — Bedakan Perubahan $q$ dan Perubahan $c$

Misalkan kita tetap menggunakan:

$$
h(q,c)=0.6q+0.4c.
$$

Jika $c$ dianggap tetap dan $q$ naik sebesar 0.01, exact score change untuk fungsi linear ini adalah:

$$
0.6(0.01)=0.006.
$$

Jika $q$ dianggap tetap dan $c$ naik 0.01:

$$
0.4(0.01)=0.004.
$$

Kedua angka tersebut konsisten dengan partial derivatives.

Tetapi perbandingan itu tetap berada **di dalam fungsi instructional**. Ia tidak otomatis mengatakan mana intervention pendidikan yang lebih efektif.

---

# 10. SYNTHETIC AI EXAMPLE — Sensitivity pada Dua Parameter

Gunakan **synthetic / hypothetical loss function**:

$$
J(w,b)=w^2+wb+2b^2.
$$

Ini hanya fungsi pedagogis untuk latihan calculus. Ia **bukan production HerAI loss**.

## Partial terhadap $w$

Saat $b$ diperlakukan constant:

$$
\frac{\partial J}{\partial w}=2w+b.
$$

## Partial terhadap $b$

Saat $w$ diperlakukan constant:

$$
\frac{\partial J}{\partial b}=w+4b.
$$

Di titik:

$$
(w,b)=(1,2),
$$

kita memperoleh:

$$
\frac{\partial J}{\partial w}(1,2)=2(1)+2=4,
$$

$$
\frac{\partial J}{\partial b}(1,2)=1+4(2)=9.
$$

Apa yang boleh dikatakan?

> Pada titik tersebut, $J$ memiliki local rate 4 terhadap $w$ jika $b$ held fixed, dan local rate 9 terhadap $b$ jika $w$ held fixed.

Apa yang belum boleh kita lakukan?

- menggabungkan keduanya menjadi algorithm update;
- memilih learning rate;
- menjalankan Gradient Descent;
- mengklaim 9 berarti parameter $b$ “lebih penting” secara universal.

Topic 05 hanya mengukur local sensitivity per variable.

---

# 11. GEOMETRIC INTUITION — Partial Derivative sebagai Slope pada Slice

Untuk function dua variabel, graph dapat divisualisasikan sebagai surface.

Partial derivative terhadap $x$ dapat dibayangkan dengan:

1. pilih nilai $y$ tertentu;
2. potong surface pada $y$ tersebut;
3. hasil potongan menjadi curve satu variabel terhadap $x$;
4. baca tangent slope pada curve itu.

Partial terhadap $y$ melakukan ide serupa dengan menahan $x$.

Ini membantu kita memahami bahwa partial derivative bukan “dua derivative yang terpisah secara acak”. Keduanya membaca **surface yang sama dari slice berbeda**.

---

# 12. WHY THIS MATTERS IN AI — Banyak Parameter, Satu Quantity yang Diamati

Dalam banyak model matematika untuk AI, sebuah scalar quantity dapat bergantung pada banyak parameter.

Secara schematic:

$$
J(\theta_1,\theta_2,\ldots,\theta_d).
$$

Untuk memahami local sensitivity terhadap satu parameter, kita dapat bertanya:

> “Bagaimana $J$ berubah jika hanya $\theta_i$ yang berubah secara infinitesimal, sementara parameter lain diperlakukan fixed dalam partial-derivative operation?”

Itulah peran partial derivative.

Namun Topic 05 berhenti pada **component-wise local sensitivity**.

Belum dibahas:

- bagaimana semua components disusun bersama;
- direction of steepest change;
- parameter update;
- training iteration.

Itu menjaga Calculus dan Optimization tetap terpisah secara konseptual.

---

# 13. MISCONCEPTION CHALLENGE

## Misconception 1 — “Held fixed berarti benar-benar dikontrol di dunia nyata”

Salah.

Held fixed adalah statement tentang mathematical operation. Causal inference memerlukan desain, data, dan assumptions tambahan.

## Misconception 2 — “Partial derivative terbesar = feature paling penting”

Tidak otomatis.

Magnitude dipengaruhi oleh:

- scaling variable;
- unit;
- titik evaluasi;
- bentuk function;
- semantics model;
- interactions.

## Misconception 3 — “Partial derivative selalu constant”

Tidak.

Pada:

$$
F(x,y)=x^2+xy+y^2,
$$

kita mendapat:

$$
\frac{\partial F}{\partial x}=2x+y,
$$

jadi nilainya bergantung pada posisi $(x,y)$.

Constant partial pada $h(q,c)$ muncul karena fungsi itu linear.

## Misconception 4 — “Jika partial derivative nol, variable tidak penting selamanya”

Tidak.

Nilai nol di satu titik hanya mengatakan local sensitivity terhadap direction itu nol pada titik tersebut. Nilai bisa berbeda di titik lain.

## Misconception 5 — “Partial derivative adalah probability impact”

Salah.

Derivative membawa unit output per input, bukan otomatis probability.

## Misconception 6 — “Menghitung partial derivative sudah melakukan Optimization”

Salah.

Differentiation menghasilkan informasi local change. Optimization adalah proses keputusan/iteration terpisah yang akan dipelajari di Submodule 06.

---

# 14. TRY IT YOURSELF

Diberikan **synthetic function**:

$$
P(a,b)=3a^2+2ab+b^2.
$$

Tanpa melihat jawaban, coba:

1. hitung $\frac{\partial P}{\partial a}$;
2. hitung $\frac{\partial P}{\partial b}$;
3. evaluasi keduanya di $(a,b)=(1,2)$;
4. jelaskan variable mana yang held fixed pada setiap operation;
5. tulis satu kalimat tentang apa yang **tidak** dapat disimpulkan dari hasil tersebut.

### Check answer

$$
\frac{\partial P}{\partial a}=6a+2b,
$$

$$
\frac{\partial P}{\partial b}=2a+2b.
$$

Pada $(1,2)$:

$$
\frac{\partial P}{\partial a}(1,2)=10,
$$

$$
\frac{\partial P}{\partial b}(1,2)=6.
$$

Nilai 10 dan 6 adalah local rates pada dua input directions yang berbeda, bukan causal-effect estimates.

---

# 15. VISUAL / INTERACTIVE SPEC

## [STATIC VISUAL] Surface dan Dua Slice

**Learning purpose:** menunjukkan bahwa satu function $F(x,y)$ dapat memiliki partial derivative berbeda terhadap $x$ dan $y$.

**Initial state:** surface sederhana dari:

$$
F(x,y)=x^2+xy+y^2.
$$

**Learner action:** tidak ada; visual menampilkan dua slice: $y=2$ dan $x=2$.

**Expected behavior:** masing-masing slice menampilkan curve 2D dengan tangent lokal pada titik corresponding.

**Feedback:** labelkan bahwa slice $y=2$ digunakan untuk membaca change terhadap $x$, sedangkan slice $x=2$ digunakan untuk change terhadap $y$.

**Safety note:** visual menjelaskan mathematical holding-fixed operation, bukan causal experiment.

## [NUMBER MANIPULATOR] Hold One Variable Fixed

**Learning purpose:** membangun intuition “change one input”.

**Initial function:**

$$
F(x,y)=x^2+xy+y^2.
$$

**Learner action:** learner memilih target derivative ($x$ atau $y$), mengunci variabel lain, lalu menggeser input target sedikit.

**Expected behavior:** interface menunjukkan perubahan output dan local-rate estimate menuju nilai partial derivative.

**Feedback:** tampilkan variabel yang berubah dan variabel yang locked secara eksplisit.

**Safety note:** locked variable adalah bagian dari mathematical demonstration, bukan statement bahwa variable itu physically controllable.

## [COMPARE VIEW] HerAI Sensitivity

**Learning purpose:** membandingkan dua partial derivatives dari canonical instructional score tanpa mengubah semantics score.

**Initial function:**

$$
h(q,c)=0.6q+0.4c.
$$

**Learner action:** pilih “vary $q$” atau “vary $c$”.

**Expected behavior:** interface menampilkan score change untuk small input change dan corresponding partial derivative.

**Feedback:** selalu tampilkan badge **Instructional score — NOT probability**.

**Safety note:** dilarang memberi label “causal impact”, “feature importance”, atau “production recommendation weight”.

---

# 16. CHECKPOINT

Jawab tanpa menghitung panjang.

1. Saat mencari $\frac{\partial f}{\partial x}$, apa yang dilakukan pada variable independen lain?
2. Apa perbedaan $\frac{\partial f}{\partial x}$ dan $\frac{\partial f}{\partial y}$?
3. Jika $\frac{\partial f}{\partial x}(a,b)>0$, apa interpretasi local yang aman?
4. Apakah partial derivative membuktikan causality?
5. Mengapa $\frac{\partial h}{\partial q}=0.6$ tidak sama dengan “60% probability”?
6. Apa topik berikutnya setelah kita memiliki beberapa partial derivatives?

### Checkpoint answer

1. Variable lain diperlakukan constant dalam mathematical differentiation operation.
2. Keduanya mengukur local change terhadap input direction yang berbeda.
3. Di sekitar titik tersebut, peningkatan kecil $x$ dengan variable lain held fixed secara matematis berkaitan dengan peningkatan local output menurut function.
4. Tidak.
5. Karena $h$ adalah instructional score dan derivative adalah rate score-unit per q-unit, bukan probability statement.
6. Topic 06 akan mempelajari bagaimana partial derivatives dari beberapa variables dipandang bersama sebagai vector local-change information.

---

# 17. MASTERY CHECK — “I can...”

Setelah Topic 05, learner seharusnya dapat mengatakan:

- **I can** mengenali fungsi dengan lebih dari satu input.
- **I can** menjelaskan makna partial derivative sebagai local rate terhadap satu chosen variable.
- **I can** menjelaskan “held fixed” sebagai mathematical operation, bukan causal claim.
- **I can** menghitung partial derivative polynomial dua variabel sederhana.
- **I can** mengevaluasi partial derivative pada titik tertentu.
- **I can** membaca unit partial derivative sebagai output-unit per chosen-input-unit.
- **I can** membaca partial derivative sebagai slope pada slice dari sebuah surface.
- **I can** menghitung partial derivatives canonical $h(q,c)$ secara aman.
- **I can** menolak interpretasi score/probability/causality yang tidak didukung.
- **I can** menjelaskan bahwa partial derivative belum sama dengan Optimization.

---

# 18. SCOPE BOUNDARY — Apa yang Belum Kita Ajarkan?

Topic 05 **tidak** menjadikan berikut sebagai computation requirement:

- gradient sebagai vector dari seluruh partial derivatives;
- directional derivative;
- tangent plane formula;
- total differential;
- Jacobian;
- Hessian;
- higher-order mixed partials;
- multivariable chain rule;
- full backpropagation derivation;
- Gradient Descent;
- learning rate;
- optimizer families;
- constrained optimization.

Beberapa istilah tersebut valid secara matematika, tetapi berada di luar learner objective Topic 05.

---

# 19. SUMMARY

Ketika fungsi memiliki beberapa input, satu pertanyaan “berapa derivative-nya?” belum cukup.

Untuk:

$$
f(x,y),
$$

kita dapat mempelajari local change terhadap $x$:

$$
\frac{\partial f}{\partial x},
$$

atau terhadap $y$:

$$
\frac{\partial f}{\partial y}.
$$

Rule utamanya:

> **Differentiate terhadap variable yang dipilih; perlakukan independent variables lain sebagai constants dalam operasi tersebut.**

Partial derivative tetap harus dibaca secara lengkap:

- variable mana yang berubah;
- variable mana yang held fixed mathematically;
- titik evaluasi;
- sign dan magnitude;
- unit;
- local vs global meaning;
- apa yang tidak diimplikasikan.

Pada canonical HerAI instructional score:

$$
h(q,c)=0.6q+0.4c,
$$

kita mendapat:

$$
\frac{\partial h}{\partial q}=0.6,
\qquad
\frac{\partial h}{\partial c}=0.4.
$$

Keduanya adalah **instructional mathematical sensitivities**, bukan probability atau causal effects.

---

# 20. BRIDGE — Dari Beberapa Partial Derivatives ke Satu Object Vektor

Sekarang kita sudah dapat menghitung local sensitivity terhadap satu variable pada satu waktu.

Untuk function dengan banyak variables, pertanyaan berikutnya adalah:

> Bagaimana kita mengorganisasi semua partial derivatives itu menjadi satu object yang dapat dibaca sebagai informasi perubahan multivariable?

Jawaban tersebut membawa kita ke:

# **Topic 06 — Gradient sebagai Vector Partial Derivatives**

Topic 06 akan mengaktifkan kembali literasi vector dari Linear Algebra dan menyusun partial derivatives menjadi local-change vector. Ia tetap belum menjadi full Optimization lesson.
