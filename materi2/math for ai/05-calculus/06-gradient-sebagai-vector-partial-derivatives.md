# Topic 06 — Gradient sebagai Vector Partial Derivatives
## Submodule 05 — Calculus: Perubahan, Turunan, dan Gradient

> **Posisi topik:** Topic 05 sudah mengajarkan partial derivative untuk membaca perubahan lokal terhadap satu input pada satu waktu. Topic 06 menyatukan partial derivatives tersebut menjadi **satu vector** bernama gradient. Fokusnya adalah membangun, mengevaluasi, dan menginterpretasikan gradient sebagai informasi perubahan lokal sebuah scalar function. Chain rule, computational graph, dan mekanik Optimization masih ditahan untuk topic berikutnya.

## Tujuan Pembelajaran

Setelah menyelesaikan topik ini, peserta diharapkan mampu:

1. menjelaskan mengapa beberapa partial derivatives dapat dikumpulkan menjadi satu vector;
2. membaca simbol $\nabla f$ sebagai gradient function;
3. menyusun gradient dari partial derivatives suatu scalar function;
4. menentukan dimensi gradient dari jumlah input/parameter function;
5. mengevaluasi gradient pada sebuah titik;
6. menginterpretasikan setiap komponen gradient sebagai local rate terhadap satu variable;
7. menjelaskan bahwa gradient menunjukkan arah **steepest local increase** di bawah standard Euclidean interpretation;
8. menjelaskan bahwa $-\nabla f$ adalah corresponding local-decrease direction tanpa mengubahnya menjadi algorithm update;
9. menghubungkan gradient dengan contour/level curve secara intuitif;
10. menyusun dan membaca $\nabla h$ untuk canonical HerAI instructional score $h(q,c)=0.6q+0.4c$;
11. menjelaskan mengapa gradient bukan error, probability, causal feature importance, atau production recommendation rule; dan
12. menjelaskan mengapa gradient nol tidak otomatis membuktikan global minimum.

---

# 1. HOOK / REAL PROBLEM — Dua Partial Derivatives, Lalu Apa?

Pada Topic 05 kita melihat **synthetic function**:

$$
F(x,y)=x^2+xy+y^2.
$$

Kita dapat menghitung dua local rates:

$$
\frac{\partial F}{\partial x}=2x+y,
$$

serta:

$$
\frac{\partial F}{\partial y}=x+2y.
$$

Masing-masing menjawab pertanyaan yang berbeda:

- apa yang terjadi secara lokal ketika $x$ berubah dan $y$ mathematically held fixed?
- apa yang terjadi secara lokal ketika $y$ berubah dan $x$ mathematically held fixed?

Tetapi jika kita ingin melihat **seluruh local-change information terhadap kedua input sekaligus**, kita membutuhkan satu object yang dapat membawa kedua angka tersebut bersama-sama.

Dari Linear Algebra, kita sudah mengenal object itu:

> **vector**.

Gradient adalah jembatan antara calculus dan vector literacy yang sudah dipelajari sebelumnya.

## Predict

Sebelum melihat formula, coba prediksi:

1. Jika function memiliki dua independent variables, berapa komponen gradient-nya?
2. Jika kedua partial derivatives bernilai 0, apakah gradient scalar atau vector?
3. Jika gradient memiliki komponen positif dan negatif, apakah itu berarti function “baik” dan “buruk” sekaligus?
4. Jika gradient suatu loss diketahui, apakah kita sudah otomatis melakukan training model?

Simpan jawaban awalmu.

---

# 2. INTUITION — Gradient sebagai “Paket” Local Rates

Bayangkan function dengan dua knob input:

$$
f(x,y).
$$

Topic 05 memeriksa satu knob pada satu waktu:

- sensitivity terhadap $x$;
- sensitivity terhadap $y$.

Gradient tidak mengganti makna partial derivative. Gradient hanya **mengorganisasi semua first-order partial derivatives ke dalam satu vector**.

Kalau:

$$
\frac{\partial f}{\partial x}=3,
\qquad
\frac{\partial f}{\partial y}=-2,
$$

maka local rate information dapat dikumpulkan menjadi:

$$
\nabla f=
\begin{bmatrix}
3\\
-2
\end{bmatrix}.
$$

Vector ini memberi dua informasi sekaligus:

- komponen pertama: local rate terhadap $x$;
- komponen kedua: local rate terhadap $y$.

Penting:

> Gradient adalah **vector of local rates**, bukan nilai function itu sendiri dan bukan “jumlah error”.

---

# 3. EXPLORE — Dari Partial Derivatives ke Satu Vector

Gunakan kembali **synthetic function**:

$$
F(x,y)=x^2+xy+y^2.
$$

Partial derivatives-nya:

$$
\frac{\partial F}{\partial x}=2x+y,
$$

$$
\frac{\partial F}{\partial y}=x+2y.
$$

Sekarang susun keduanya dalam urutan variable $(x,y)$:

$$
\nabla F(x,y)
=
\begin{bmatrix}
\frac{\partial F}{\partial x}\\
\frac{\partial F}{\partial y}
\end{bmatrix}
=
\begin{bmatrix}
2x+y\\
x+2y
\end{bmatrix}.
$$

Ini adalah **gradient function**.

Pada titik $(x,y)=(1,2)$:

$$
\nabla F(1,2)
=
\begin{bmatrix}
2(1)+2\\
1+2(2)
\end{bmatrix}
=
\begin{bmatrix}
4\\
5
\end{bmatrix}.
$$

Gradient function memberikan formula untuk semua titik yang relevan. Gradient value $[4,5]^\top$ memberikan local information di satu titik tertentu.

---

# 4. FORMAL DEFINITION — Apa Itu Gradient?

Untuk scalar-valued function dengan dua variables:

$$
f(x,y),
$$

gradient didefinisikan sebagai vector:

$$
\nabla f(x,y)
=
\begin{bmatrix}
\frac{\partial f}{\partial x}\\
\frac{\partial f}{\partial y}
\end{bmatrix}.
$$

Untuk function dengan $d$ variables:

$$
f(x_1,x_2,\ldots,x_d),
$$

gradient memiliki $d$ components:

$$
\nabla f
=
\begin{bmatrix}
\frac{\partial f}{\partial x_1}\\
\frac{\partial f}{\partial x_2}\\
\vdots\\
\frac{\partial f}{\partial x_d}
\end{bmatrix}.
$$

Jadi:

> **dimensi gradient mengikuti jumlah variables/parameters yang sedang didiferensiasikan.**

Gradient dalam topik ini selalu digunakan untuk **scalar output**. Jacobian untuk vector-valued output adalah topic lanjutan dan bukan requirement Submodule 05.

---

# 5. NOTATION + FORMULA — Membaca Simbol $\nabla$

Simbol:

$$
\nabla
$$

disebut **nabla** atau sering dibaca “del”.

Jika kita menulis:

$$
\nabla f(x,y),
$$

artinya:

> gradient dari function $f$ pada input $(x,y)$.

Jika variable yang relevan adalah parameter vector $\boldsymbol{\theta}$, notation yang nanti sering ditemukan dalam AI adalah:

$$
\nabla_{\boldsymbol{\theta}}J(\boldsymbol{\theta}).
$$

Artinya gradient objective $J$ terhadap components pada parameter vector $\boldsymbol{\theta}$.

Topic 06 hanya membangun kemampuan **membaca object tersebut**. Iterative parameter update belum dibahas.

---

# 6. MATH READING SKILL — Membaca Gradient dengan Delapan Lapis Makna

Diberikan:

$$
\nabla f(a,b)
=
\begin{bmatrix}
3\\
-2
\end{bmatrix}.
$$

Jangan hanya membaca “gradient-nya tiga, minus dua.”

## 1. Symbols

- $f$: scalar-valued function;
- $(a,b)$: point tempat gradient dievaluasi;
- $\nabla$: operator gradient;
- 3: local rate terhadap variable pertama;
- $-2$: local rate terhadap variable kedua.

## 2. Input

Input function adalah pasangan $(x,y)$.

## 3. Operation

Kita menghitung partial derivative terhadap setiap chosen variable dan menyusunnya dengan urutan yang konsisten.

## 4. Output

Output operasi gradient adalah **vector**, bukan scalar.

## 5. Units

Setiap component memiliki unit:

$$
\frac{\text{output-unit}}{\text{corresponding input-unit}}.
$$

Jika input variables punya unit berbeda, components gradient juga dapat mempunyai unit berbeda. Karena itu magnitude component tidak boleh dibandingkan secara naif sebagai “feature importance”.

## 6. Assumptions / conditions

Interpretasi gradient memerlukan partial derivatives yang relevan ada pada point tersebut. Klaim arah steepest increase juga menggunakan standard Euclidean geometry pada coordinate system yang sedang dipakai.

## 7. Local, bukan global

Gradient di $(a,b)$ menjelaskan perilaku **lokal** sekitar $(a,b)$.

Ia tidak otomatis menggambarkan seluruh domain function.

## 8. What it does NOT imply

Gradient tersebut tidak otomatis berarti:

- error = $[3,-2]^\top$;
- probability tertentu;
- causal effect dua features;
- global minimum berada pada arah tertentu;
- sistem harus mengubah parameters dengan langkah tertentu.

---

# 7. WORKED BASIC EXAMPLE — Build, Evaluate, Interpret

Gunakan **synthetic function**:

$$
G(x,y)=x^2+2xy+3y^2.
$$

## Langkah 1 — Partial derivative terhadap $x$

$$
\frac{\partial G}{\partial x}=2x+2y.
$$

## Langkah 2 — Partial derivative terhadap $y$

$$
\frac{\partial G}{\partial y}=2x+6y.
$$

## Langkah 3 — Assemble gradient

$$
\nabla G(x,y)
=
\begin{bmatrix}
2x+2y\\
2x+6y
\end{bmatrix}.
$$

## Langkah 4 — Evaluate di $(2,1)$

$$
\nabla G(2,1)
=
\begin{bmatrix}
6\\
10
\end{bmatrix}.
$$

## Interpretasi

Pada coordinate scale yang sedang digunakan:

- component pertama memberi local rate terhadap $x$ ketika $y$ mathematically held fixed;
- component kedua memberi local rate terhadap $y$ ketika $x$ mathematically held fixed.

Angka 10 yang lebih besar daripada 6 **tidak otomatis membuktikan** bahwa $y$ lebih penting secara real-world. Scale, units, semantics, model structure, dan data context tetap penting.

---

# 8. DIRECTION — Mengapa Gradient Disebut Arah Perubahan Tercepat?

Gradient bukan hanya container partial derivatives. Dalam standard Euclidean interpretation, gradient menunjukkan direction of **steepest local increase** dari scalar function.

Jika:

$$
\nabla f(a,b)
=
\begin{bmatrix}
3\\
4
\end{bmatrix},
$$

maka arah vector $[3,4]^\top$ adalah arah local increase paling cepat menurut geometry tersebut.

Arah yang berlawanan:

$$
-\nabla f(a,b)
=
\begin{bmatrix}
-3\\
-4
\end{bmatrix}
$$

adalah corresponding direction of steepest local decrease.

Tetapi perhatikan boundary penting:

> Mengetahui arah $-\nabla f$ **belum sama dengan melakukan Gradient Descent**.

Kita belum memilih step size, learning rate, iteration rule, stopping criterion, atau optimizer.

Semua mechanics tersebut milik Submodule 06 — Optimization.

## Advanced / Optional — directional derivative connection

Jika $\mathbf{u}$ adalah unit vector direction, local rate pada direction tersebut dapat ditulis:

$$
D_{\mathbf{u}}f
=
\nabla f\cdot\mathbf{u}.
$$

Formula ini menjelaskan mengapa gradient menyimpan directional rate information. Namun manual computation directional derivative **bukan assessment requirement utama** Topic 06.

---

# 9. CONTOUR INTUITION — Panah Gradient di Peta Ketinggian Function

Untuk scalar function dua variables, kita dapat menggambar **level curves / contours**: kumpulan titik yang mempunyai nilai function sama.

Secara geometris, gradient pada titik yang regular mengarah tegak lurus terhadap contour setempat dan menunjuk ke arah kenaikan paling cepat.

Analogi yang aman:

- contour seperti garis ketinggian pada peta;
- gradient seperti panah local uphill paling curam.

Tetapi analogi harus kembali ke matematika:

> Gradient bekerja pada scalar function yang didefinisikan dan coordinate geometry yang digunakan. Ia bukan “kompas universal” untuk keputusan dunia nyata.

---

# 10. WORKED HerAI EXAMPLE — Gradient Canonical Instructional Score

Canonical HerAI instructional score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Dengan:

- $q$: quiz ratio;
- $c$: completion ratio;
- $h$: **instructional score**, bukan probability.

Dari Topic 05:

$$
\frac{\partial h}{\partial q}=0.6,
$$

$$
\frac{\partial h}{\partial c}=0.4.
$$

Sekarang assemble gradient:

$$
\nabla h(q,c)
=
\begin{bmatrix}
0.6\\
0.4
\end{bmatrix}.
$$

Karena function ini linear, gradient-nya constant di semua $(q,c)$ pada toy domain yang sedang digunakan.

## Math reading

Gradient tersebut berarti:

- local score rate terhadap $q$ adalah 0.6 per q-unit;
- local score rate terhadap $c$ adalah 0.4 per c-unit;
- seluruh first-order local sensitivity information untuk dua variables itu dikumpulkan dalam satu vector.

Gradient tersebut **tidak** berarti:

- probability keberhasilan = 60% atau 40%;
- quiz menyebabkan learning outcome lebih besar daripada completion;
- vector ini adalah production learned parameter;
- arah gradient adalah recommendation kebijakan HerAI;
- production system wajib mengubah data peserta mengikuti vector tersebut.

---

# 11. CHANGE ONE THING — Apa yang Terjadi Jika Function-nya Nonlinear?

Canonical $h$ memiliki constant gradient. Itu bagus untuk first vector assembly, tetapi tidak menunjukkan gradient yang berubah dari point ke point.

Gunakan **synthetic / hypothetical function**:

$$
J(w,b)=w^2+2b^2.
$$

Partial derivatives:

$$
\frac{\partial J}{\partial w}=2w,
$$

$$
\frac{\partial J}{\partial b}=4b.
$$

Gradient:

$$
\nabla J(w,b)
=
\begin{bmatrix}
2w\\
4b
\end{bmatrix}.
$$

Di $(w,b)=(1,1)$:

$$
\nabla J(1,1)
=
\begin{bmatrix}
2\\
4
\end{bmatrix}.
$$

Di $(w,b)=(2,-1)$:

$$
\nabla J(2,-1)
=
\begin{bmatrix}
4\\
-4
\end{bmatrix}.
$$

Berbeda dengan canonical linear $h$, synthetic nonlinear $J$ memiliki gradient yang bergantung pada point.

Ini adalah salah satu alasan kata **local** sangat penting.

---

# 12. WHY THIS MATTERS IN AI

Banyak objective/loss dalam AI bergantung pada banyak parameters.

Secara konseptual:

$$
J(\theta_1,\theta_2,\ldots,\theta_d)
$$

mempunyai gradient:

$$
\nabla_{\boldsymbol{\theta}}J
=
\begin{bmatrix}
\frac{\partial J}{\partial \theta_1}\\
\frac{\partial J}{\partial \theta_2}\\
\vdots\\
\frac{\partial J}{\partial \theta_d}
\end{bmatrix}.
$$

Ini membuat calculus dapat berbicara dalam bahasa vector yang cocok dengan parameter spaces berdimensi banyak.

Tetapi Topic 06 hanya sampai pada **informasi perubahan**.

Belum dibahas:

- bagaimana gradient dihitung melalui composed computations;
- bagaimana chain rule membantu computation tersebut;
- bagaimana parameter di-update;
- bagaimana learning rate dipilih;
- bagaimana optimizer bekerja.

Topic 07 akan membahas **Chain Rule dan Computational Graph**. Submodule 06 nanti membahas Optimization.

---

# 13. MISCONCEPTION CHALLENGE

Tentukan apakah setiap pernyataan berikut aman.

## A. “Gradient adalah error.”

**Salah.** Error/loss adalah scalar quantity atau object lain sesuai definition. Gradient adalah vector partial derivatives dari scalar function terhadap variables/parameters.

## B. “Gradient selalu menunjuk downhill.”

**Salah.** Gradient menunjuk steepest **local increase** dalam standard Euclidean interpretation. Arah negatifnya adalah corresponding steepest local decrease.

## C. “Jika gradient nol, kita pasti menemukan global minimum.”

**Salah.** Zero gradient dapat muncul di minimum lokal, maximum lokal, saddle/stationary point, atau situasi lain. Global conclusion membutuhkan informasi tambahan.

Contoh **synthetic function**:

$$
S(x,y)=x^2-y^2.
$$

Gradient:

$$
\nabla S(x,y)
=
\begin{bmatrix}
2x\\
-2y
\end{bmatrix}.
$$

Pada $(0,0)$:

$$
\nabla S(0,0)
=
\begin{bmatrix}
0\\
0
\end{bmatrix}.
$$

Tetapi $(0,0)$ bukan global minimum karena function dapat menjadi lebih kecil ketika $|y|$ membesar.

## D. “Component gradient paling besar pasti feature paling penting.”

**Salah.** Component adalah local mathematical rate dalam coordinate system dan units yang digunakan. Real-world importance memerlukan konteks tambahan.

## E. “Setelah punya negative gradient, kita sudah melakukan Optimization.”

**Salah.** Direction information bukan algorithm update.

---

# 14. TRY IT YOURSELF

Gunakan **synthetic function**:

$$
R(a,b)=3a^2+ab+b^2.
$$

Coba tanpa melihat jawaban:

1. hitung $\frac{\partial R}{\partial a}$;
2. hitung $\frac{\partial R}{\partial b}$;
3. susun $\nabla R(a,b)$;
4. evaluasi di $(1,2)$;
5. jelaskan arti kedua components secara lokal;
6. jelaskan satu kesimpulan yang **tidak boleh** dibuat dari gradient tersebut.

### Self-check

$$
\frac{\partial R}{\partial a}=6a+b,
$$

$$
\frac{\partial R}{\partial b}=a+2b,
$$

sehingga:

$$
\nabla R(a,b)
=
\begin{bmatrix}
6a+b\\
a+2b
\end{bmatrix}.
$$

Di $(1,2)$:

$$
\nabla R(1,2)
=
\begin{bmatrix}
8\\
5
\end{bmatrix}.
$$

---

# 15. VISUAL / INTERACTIVE SPEC

## [STATIC VISUAL] Partial Components → Gradient Vector

**Learning purpose:** menunjukkan bahwa gradient dibangun dari partial derivative components.  
**Initial state:** function $F(x,y)=x^2+xy+y^2$ dan dua boxes partial derivative.  
**Learner action:** membaca urutan variable $(x,y)$ lalu mengikuti arrows menuju vector column.  
**Expected behavior:** visual menyatukan $2x+y$ dan $x+2y$ menjadi $\nabla F$.  
**Feedback:** highlight component pertama saat $x$ dipilih dan component kedua saat $y$ dipilih.  
**Safety note:** urutan component harus konsisten dengan urutan variables.

## [INTERACTIVE VISUAL] Contour + Gradient Arrow

**Learning purpose:** menghubungkan vector gradient dengan local direction pada scalar surface.  
**Initial state:** contour synthetic $J(w,b)=w^2+2b^2$ dengan point draggable.  
**Learner action:** memindahkan point pada contour plane.  
**Expected behavior:** tampilkan $J(w,b)$, $\nabla J(w,b)$, dan arrow gradient yang berubah sesuai point.  
**Feedback:** arrow memanjang/berubah arah sesuai local gradient; jika point di origin, vector menjadi zero.  
**Safety note:** gradient adalah local information dan bukan optimizer trajectory.

## [COMPARE VIEW] Gradient vs Negative Gradient

**Learning purpose:** membedakan arah local increase dengan corresponding local decrease.  
**Initial state:** satu point dengan dua arrows: $\nabla J$ dan $-\nabla J$.  
**Learner action:** toggle “increase” / “decrease”.  
**Expected behavior:** gradient arrow menunjuk local steepest increase; negative-gradient arrow arah berlawanan.  
**Feedback:** label eksplisit “direction only — no parameter update”.  
**Safety note:** jangan tampilkan learning rate, iteration trail, atau optimizer mechanics.

## [NUMBER MANIPULATOR] Canonical HerAI Gradient

**Learning purpose:** memperlihatkan bahwa gradient canonical linear $h$ tetap constant meskipun point $(q,c)$ berubah.  
**Initial state:** sliders $q,c\in[0,1]$.  
**Learner action:** mengubah $q$ dan $c$.  
**Expected behavior:** score $h(q,c)$ berubah, tetapi $\nabla h=[0.6,0.4]^\top$ tetap.  
**Feedback:** tampilkan pesan “constant gradient adalah property toy linear function ini”.  
**Safety note:** jangan label 0.6/0.4 sebagai probability atau causal importance.

---

# 16. CHECKPOINT

Jawab singkat:

1. Apa perbedaan partial derivative dan gradient?
2. Jika $f$ punya 5 independent variables dan scalar output, berapa component gradient-nya?
3. Mengapa $\nabla f$ adalah vector?
4. Arah apa yang ditunjukkan gradient secara lokal dalam standard Euclidean interpretation?
5. Apakah $-\nabla f$ otomatis berarti satu update parameter?
6. Mengapa zero gradient belum cukup untuk menyatakan global minimum?

### Jawaban ringkas

1. Partial derivative adalah satu local rate component; gradient mengumpulkan semua components yang relevan.
2. Lima components.
3. Karena setiap partial derivative ditempatkan sebagai component dalam ordered vector.
4. Steepest local increase.
5. Tidak. Itu direction information; update mechanics belum ditentukan.
6. Karena stationary point tidak harus global minimum.

---

# 17. MASTERY CHECK — “I Can...”

- **I can** membangun gradient dari partial derivatives.
- **I can** menentukan dimension gradient dari jumlah variables.
- **I can** membedakan gradient function dan gradient value at a point.
- **I can** menjelaskan arti setiap component gradient.
- **I can** membaca gradient sebagai local vector information.
- **I can** menjelaskan steepest local increase dan corresponding negative-gradient direction secara aman.
- **I can** menggunakan canonical HerAI $\nabla h=[0.6,0.4]^\top$ tanpa mengubahnya menjadi probability atau causal claim.
- **I can** menjelaskan mengapa gradient bukan error.
- **I can** menjelaskan mengapa zero gradient tidak otomatis global minimum.

---

# 18. SCOPE BOUNDARY — Apa yang Belum Kita Ajarkan?

Topic 06 berhenti pada **gradient sebagai vector local-change information**.

Belum menjadi core/computation requirement:

- multivariable chain rule;
- computational graph differentiation;
- backpropagation derivation;
- automatic differentiation implementation;
- Jacobian matrices sebagai full theory;
- Hessian / second-order derivatives;
- full directional-derivative catalog;
- Gradient Descent iteration;
- learning rate;
- Momentum, RMSProp, Adam, atau optimizer families;
- proof of convergence;
- constrained optimization.

Negative gradient hanya disebut sebagai **corresponding local-decrease direction**, bukan algorithm.

---

# 19. SUMMARY

Gradient mengumpulkan partial derivatives ke dalam satu vector:

$$
\nabla f
=
\begin{bmatrix}
\frac{\partial f}{\partial x_1}\\
\vdots\\
\frac{\partial f}{\partial x_d}
\end{bmatrix}.
$$

Inti interpretasinya:

- output gradient adalah vector;
- jumlah components mengikuti jumlah differentiation variables;
- setiap component adalah local rate terhadap satu variable;
- gradient menunjukkan steepest local increase dalam standard Euclidean interpretation;
- $-\nabla f$ menunjukkan corresponding steepest local decrease direction;
- informasi tersebut masih local, bukan global guarantee;
- gradient bukan error, probability, causality, atau feature importance otomatis.

Canonical HerAI example:

$$
\nabla h(q,c)
=
\begin{bmatrix}
0.6\\
0.4
\end{bmatrix},
$$

tetap hanya gradient dari **instructional score**.

---

# 20. BRIDGE — Bagaimana Gradient Mengalir Melalui Fungsi yang Tersusun?

Sekarang kita sudah bisa membangun gradient ketika scalar function ditulis langsung terhadap variables-nya.

Tetapi sistem AI sering berbentuk composed computations:

$$
x\rightarrow u\rightarrow z\rightarrow J.
$$

Pertanyaan berikutnya:

> Jika perubahan pada $x$ memengaruhi $u$, lalu $u$ memengaruhi $z$, lalu $z$ memengaruhi output, bagaimana local change dihitung melewati rangkaian tersebut?

Itulah peran **chain rule**.

Topic berikutnya:

# **Topic 07 — Chain Rule dan Computational Graph**
