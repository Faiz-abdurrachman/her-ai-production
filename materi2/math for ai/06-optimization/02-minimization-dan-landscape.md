# Topic 02 — Minimization dan Landscape
## Dari “Nilai Objective” ke “Parameter Mana yang Kita Cari?”

> **Posisi dalam modul:** Submodule 06 — Optimization: Dari Loss ke Parameter yang Lebih Baik  
> **Prerequisite aktif:** Topic 01 (loss, aggregate objective, evaluation metric), function/graph, derivative/gradient, local/global minimum recognition dari Calculus  
> **Fokus topic:** memahami minimization problem, membaca notasi $\operatorname*{arg\,min}$, membedakan nilai minimum dari parameter yang menghasilkan minimum, dan membaca objective/loss landscape tanpa masuk ke algoritma Gradient Descent.

---

## Learning Outcomes

Setelah menyelesaikan topic ini, peserta mampu:

1. menjelaskan minimization sebagai proses **mencari nilai parameter** yang membuat scalar objective serendah mungkin;
2. membaca dan menjelaskan notasi

$$
\boldsymbol{\theta}^{*}
\in
\operatorname*{arg\,min}_{\boldsymbol{\theta}} J(\boldsymbol{\theta});
$$

3. membedakan **minimum objective value** dari **argmin / parameter minimizer**;
4. membaca objective landscape 1D dan 2D sebagai hubungan parameter $\rightarrow$ scalar objective;
5. membedakan local minimum, global minimum, dan stationary/critical point secara konseptual;
6. menjelaskan mengapa $\nabla J(\boldsymbol{\theta})=\mathbf{0}$ tidak otomatis berarti global minimum;
7. menjelaskan bahwa mengetahui target minimization dan landscape **belum sama dengan memiliki algoritma update**;
8. menjaga semantic boundary HerAI: $h(q,c)=0.6q+0.4c$ tetap instructional score, bukan objective yang otomatis harus diminimalkan.

---

# 1. HOOK / REAL PROBLEM — Nilai Rendah Ada di Mana?

Pada Topic 01 kita sudah memisahkan beberapa quantity penting. Misalnya, kita dapat memiliki aggregate objective:

$$
J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta}).
$$

Sekarang muncul pertanyaan baru.

Jika parameter model dapat berubah, **parameter mana yang membuat $J$ menjadi rendah?**

Misalkan satu model hanya mempunyai satu parameter $w$. Kita evaluasi beberapa kandidat:

| $w$ | $J(w)$ |
|---:|---:|
| $-1$ | $4$ |
| $0$ | $1$ |
| $1$ | $0$ |
| $2$ | $1$ |
| $3$ | $4$ |

Dari tabel ini, $J(w)$ paling rendah ketika $w=1$.

Tetapi perhatikan dua angka yang berbeda:

- parameter terbaik pada contoh ini adalah $w=1$;
- nilai objective terendahnya adalah $J(1)=0$.

Keduanya berkaitan, tetapi **bukan objek yang sama**.

Optimization membutuhkan kita untuk membedakan:

> **“Berapa nilai objective paling kecil?”**

versus

> **“Parameter mana yang menghasilkan nilai objective paling kecil?”**

Notasi $\operatorname*{arg\,min}$ dibuat untuk pertanyaan kedua.

---

# 2. PREDICT — `min` atau `argmin`?

Gunakan tabel sebelumnya.

Sebelum lanjut, prediksi jawaban dari dua pertanyaan berikut:

1. Jika ditanya **nilai objective minimum**, apakah jawabannya $0$ atau $1$?
2. Jika ditanya **nilai parameter yang meminimalkan objective**, apakah jawabannya $0$ atau $1$?

Jawaban yang benar adalah:

- minimum objective value = $0$;
- minimizer / argmin = $1$.

Kesalahan yang sangat umum adalah menukar keduanya karena keduanya muncul pada masalah minimization yang sama.

---

# 3. INTUITION — Objective sebagai Landscape

Bayangkan $J$ bukan hanya satu angka yang sudah tetap. $J$ adalah **function dari parameter**.

Untuk satu parameter:

$$
w
\longrightarrow
J(w).
$$

Kita dapat menggambarnya sebagai kurva:

- sumbu horizontal = nilai parameter $w$;
- sumbu vertikal = nilai objective $J(w)$.

Untuk dua parameter:

$$
(w,b)
\longrightarrow
J(w,b).
$$

Kita dapat membayangkan permukaan 3D atau contour map:

- dua sumbu menggambarkan parameter;
- tinggi atau contour menggambarkan nilai objective.

Representasi inilah yang sering disebut **objective landscape** atau **loss landscape**.

> Landscape bukan “tempat fisik”. Ia adalah cara melihat bagaimana nilai objective berubah ketika parameter berubah.

Pada Topic 02 kita membaca bentuk problem-nya. Kita **belum menentukan langkah algoritmik** untuk bergerak dari satu parameter ke parameter berikutnya. Itu baru dimulai pada Topic 03.

---

# 4. EXPLORE — Satu Objective, Banyak Kandidat Parameter

Gunakan synthetic objective yang sudah familiar dari Calculus:

$$
J(w)=(w-1)^2.
$$

Mari evaluasi beberapa titik.

### Ketika $w=-1$

$$
J(-1)=(-1-1)^2=(-2)^2=4.
$$

### Ketika $w=0$

$$
J(0)=(0-1)^2=1.
$$

### Ketika $w=1$

$$
J(1)=(1-1)^2=0.
$$

### Ketika $w=2$

$$
J(2)=(2-1)^2=1.
$$

### Ketika $w=3$

$$
J(3)=(3-1)^2=4.
$$

Karena kuadrat tidak negatif,

$$
(w-1)^2\ge 0
$$

untuk semua $w$. Nilai $0$ terjadi ketika $w=1$.

Jadi:

$$
\min_w J(w)=0,
$$

sedangkan parameter yang menghasilkan minimum adalah:

$$
w^*=1.
$$

Kita dapat menulis:

$$
w^*
\in
\operatorname*{arg\,min}_{w} J(w).
$$

Untuk objective ini, argmin hanya berisi satu nilai, yaitu $1$.

---

# 5. FORMAL DEFINITION — Minimization Problem

Secara umum, jika parameter model ditulis sebagai vector $\boldsymbol{\theta}$ dan objective ditulis sebagai scalar function $J(\boldsymbol{\theta})$, maka minimization problem dapat dinyatakan sebagai:

$$
\text{cari }\boldsymbol{\theta}
\text{ yang membuat }
J(\boldsymbol{\theta})
\text{ sekecil mungkin}.
$$

Notasi ringkasnya:

$$
\boldsymbol{\theta}^{*}
\in
\operatorname*{arg\,min}_{\boldsymbol{\theta}}
J(\boldsymbol{\theta}).
$$

Goodfellow, Bengio, dan Courville mendefinisikan optimization sebagai tugas meminimalkan atau memaksimalkan sebuah function dengan mengubah argument/input yang dipilih, dan menggunakan notasi $x^*=\arg\min_x f(x)$ untuk nilai argument yang meminimalkan function. [S1]

## Mengapa memakai $\in$?

Kita sengaja menulis:

$$
\boldsymbol{\theta}^{*}
\in
\operatorname*{arg\,min}_{\boldsymbol{\theta}}J(\boldsymbol{\theta})
$$

karena suatu objective **dapat memiliki lebih dari satu minimizer**.

Contoh sederhana:

$$
J(w)=(w^2-1)^2.
$$

Tanpa perlu menurunkan fungsi tersebut, kita bisa memeriksa:

$$
J(-1)=0,
\qquad
J(1)=0.
$$

Karena nilai objective tidak dapat lebih kecil dari $0$, kedua parameter adalah global minimizers.

Maka:

$$
\operatorname*{arg\,min}_{w}J(w)=\{-1,1\}.
$$

Jadi `argmin` dapat dipandang sebagai himpunan kandidat parameter yang mencapai nilai minimum global, bukan selalu satu angka tunggal.

> Untuk learner beginner, yang paling penting adalah **argmin mengembalikan lokasi/parameter**, sementara minimum mengembalikan **nilai objective**.

---

# 6. NOTATION + FORMULA — Membaca `argmin` dengan Benar

Formula utama:

$$
\boldsymbol{\theta}^{*}
\in
\operatorname*{arg\,min}_{\boldsymbol{\theta}}
J(\boldsymbol{\theta}).
$$

## Arti simbol

| Simbol | Makna |
|---|---|
| $\boldsymbol{\theta}$ | parameter yang boleh berubah |
| $J$ | scalar objective function |
| $J(\boldsymbol{\theta})$ | objective value pada parameter tertentu |
| $\operatorname*{arg\,min}$ | himpunan argument/parameter yang menghasilkan nilai minimum |
| $\boldsymbol{\theta}^{*}$ | satu minimizer yang dipilih dari himpunan argmin |
| $*$ | penanda umum untuk candidate optimum/solution, bukan operasi perkalian |

## Current input/state

Sebelum optimization algorithm dijalankan, kita dapat membicarakan candidate parameter $\boldsymbol{\theta}$ mana pun dan menghitung $J(\boldsymbol{\theta})$.

Topic ini belum memperkenalkan notation iteration seperti $\boldsymbol{\theta}_t$ atau $\boldsymbol{\theta}_{t+1}$ sebagai mekanisme update. Itu milik Topic 03.

## Operation

`argmin` secara konsep meminta kita membandingkan objective di ruang parameter dan mencari lokasi yang menghasilkan nilai paling rendah.

Ini **bukan** instruksi komputasional lengkap tentang bagaimana komputer harus menemukannya.

## Output

Output konseptual `argmin` adalah parameter atau himpunan parameter yang mencapai minimum global, jika minimum tersebut ada pada domain yang sedang dipertimbangkan.

## Units / dimensions

Jika $\boldsymbol{\theta}\in\mathbb{R}^{d}$, maka minimizer $\boldsymbol{\theta}^{*}$ juga berada pada parameter space berdimensi $d$. Sebaliknya, $J(\boldsymbol{\theta})$ tetap scalar.

Unit dari parameter dan objective bergantung pada definisi model/loss. Karena itu kita tidak mengklaim bahwa semua parameter atau objective bersifat unitless.

## Assumptions dan boundary

Notasi minimization tidak otomatis menjamin:

- global minimum mudah ditemukan;
- global minimum unik;
- objective convex;
- gradient method pasti mencapai global minimum;
- objective selalu mempunyai minimum yang tercapai pada domain tertentu;
- parameter yang meminimalkan training objective otomatis memberi generalization atau product performance terbaik.

Stanford CS229 menekankan bahwa mencari global optimum dalam general case dapat sangat sulit; convex optimization adalah special class dengan struktur tambahan. Topic ini menggunakan fakta tersebut hanya sebagai **boundary**, bukan membuka teori convex optimization. [S2]

---

# 7. MATH READING SKILL — Baca dari Dalam ke Luar

Perhatikan:

$$
\operatorname*{arg\,min}_{\boldsymbol{\theta}}
J(\boldsymbol{\theta}).
$$

Bacalah bertahap:

1. **Apa function-nya?** $J$.
2. **Apa input yang boleh berubah?** $\boldsymbol{\theta}$.
3. **Apa output function?** scalar $J(\boldsymbol{\theta})$.
4. **Apa tujuan problem?** membuat scalar tersebut serendah mungkin.
5. **Apa yang ingin dikembalikan?** nilai parameter, bukan nilai objective.

Bandingkan:

$$
\min_{\boldsymbol{\theta}}J(\boldsymbol{\theta})
$$

versus

$$
\operatorname*{arg\,min}_{\boldsymbol{\theta}}J(\boldsymbol{\theta}).
$$

Kalimat learner-facing:

> `min` bertanya **“seberapa rendah?”**, sedangkan `argmin` bertanya **“di parameter mana?”**.

---

# 8. WORKED BASIC EXAMPLE — Mencari Minimizer dari Kandidat Diskrit

Misalkan kita belum memiliki algoritma update. Kita hanya mencoba lima candidate parameter:

| $w$ | $J(w)$ |
|---:|---:|
| $-2$ | $9$ |
| $-1$ | $4$ |
| $0$ | $1$ |
| $1$ | $0$ |
| $2$ | $1$ |

### Langkah 1 — cari objective value terkecil

Nilai terkecil di tabel adalah:

$$
0.
$$

Jadi pada **candidate set yang diperiksa**:

$$
\min J=0.
$$

### Langkah 2 — cari parameter yang menghasilkan nilai tersebut

Nilai $0$ terjadi pada:

$$
w=1.
$$

Jadi:

$$
w^*=1.
$$

### Langkah 3 — jangan klaim lebih dari data yang tersedia

Jika kita hanya diberi tabel candidate points, kita hanya dapat mengatakan $w=1$ terbaik **di antara titik yang diperiksa**, kecuali formula/domain memberi kita alasan untuk membuktikan global minimum pada seluruh domain.

Untuk $J(w)=(w-1)^2$, kita memang tahu seluruh function tidak negatif, sehingga $w=1$ adalah global minimizer pada $\mathbb{R}$.

---

# 9. LANDSCAPE — Local Minimum, Global Minimum, dan Critical Point

Calculus sudah memperkenalkan tiga ide yang sekarang kita aktifkan kembali.

## 9.1 Global minimum

$\boldsymbol{\theta}^{*}$ adalah global minimizer jika objective di sana tidak lebih besar daripada objective pada seluruh parameter lain dalam domain yang dipertimbangkan.

Secara konseptual:

$$
J(\boldsymbol{\theta}^{*})
\le
J(\boldsymbol{\theta})
$$

untuk semua candidate $\boldsymbol{\theta}$ dalam domain.

## 9.2 Local minimum

Local minimum hanya harus lebih rendah dibanding titik-titik **di neighborhood sekitarnya**.

Sebuah valley dapat menjadi local minimum walaupun ada valley lain yang lebih rendah di tempat lain.

Goodfellow et al. membedakan local minimum dari global minimum dan menunjukkan bahwa function dapat memiliki local minima yang bukan global optimum. [S1]

## 9.3 Critical / stationary point

Untuk differentiable multivariable objective, kondisi:

$$
\nabla J(\boldsymbol{\theta})=\mathbf{0}
$$

menandai stationary/critical condition.

Tetapi critical point dapat berupa:

- local minimum;
- local maximum;
- saddle point;
- atau kasus lain yang membutuhkan informasi tambahan untuk diklasifikasikan.

Karena itu:

$$
\nabla J(\boldsymbol{\theta})=\mathbf{0}
\not\Rightarrow
\boldsymbol{\theta}\text{ adalah global minimizer}.
$$

Inilah alasan kita tidak boleh mengubah kalimat “gradient nol” menjadi “optimization selesai sempurna”.

Topic ini **tidak mengajarkan second-derivative test atau Hessian classification sebagai core**. Itu berada di luar scope beginner Optimization saat ini.

---

# 10. WORKED LANDSCAPE EXAMPLE — Dua Valley, Satu Lebih Rendah

Bayangkan synthetic 1D objective curve dengan dua valley:

- valley A berada dekat $w=-2$ dengan objective sekitar $0.8$;
- valley B berada dekat $w=2$ dengan objective sekitar $0.2$.

Jika setiap valley lebih rendah daripada titik-titik tepat di sekitarnya, keduanya dapat disebut local minima.

Namun valley B lebih rendah daripada valley A.

Jika $0.2$ adalah nilai terendah pada seluruh domain yang dibahas, maka valley B juga merupakan global minimum.

### Kesimpulan

Local minimum menjawab:

> “Apakah titik ini rendah dibanding lingkungan dekatnya?”

Global minimum menjawab:

> “Apakah tidak ada titik lain di seluruh domain yang lebih rendah?”

Dari landscape saja kita bisa memahami **target** dan **struktur problem**, tetapi belum memiliki prosedur langkah demi langkah untuk berpindah dari current parameter menuju salah satu valley tersebut.

---

# 11. WORKED HerAI / AI EXAMPLE — Jangan Salah Mengoptimalkan Score

Canonical HerAI instructional score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Untuk Alya:

$$
h(0.80,0.75)
=
0.6(0.80)+0.4(0.75)
=
0.78.
$$

Untuk Bima:

$$
h(0.60,0.625)=0.61.
$$

Untuk Citra:

$$
h(0.90,1.00)=0.94.
$$

Untuk Dewi:

$$
h(0.70,0.50)=0.62.
$$

Angka-angka tersebut adalah **instructional scores**. Dari fakta bahwa mereka merupakan scalar, kita **tidak boleh langsung menulis**:

$$
\operatorname*{arg\,min}_{q,c}h(q,c)
$$

seolah-olah tujuan HerAI adalah “membuat quiz ratio dan completion ratio peserta serendah mungkin”. Itu akan mengubah semantics problem secara keliru.

## Synthetic wrapper yang pernah dikenalkan

Kita boleh menggunakan quantity instructional:

$$
R(q,c)=\left(h(q,c)-0.75\right)^2
$$

untuk menunjukkan bagaimana sebuah scalar penalty dapat dibentuk terhadap target tertentu.

Tetapi pada Topic ini:

- $R$ tetap **synthetic/hypothetical/instructional**;
- $q$ dan $c$ adalah observed participant quantities dalam running case;
- kita tidak mengklaim HerAI production system melatih participant features dengan meminimalkan $R$;
- kita tidak mengklaim target $0.75$ mempunyai dasar product atau causal yang nyata.

Optimization production nanti harus mempunyai **trainable parameter yang didefinisikan secara terpisah**, bukan diam-diam mengubah $h$ menjadi loss.

---

# 12. CHANGE ONE THING — Apa yang Berubah Jika Minimum Tidak Unik?

Kembali ke:

$$
J(w)=(w^2-1)^2.
$$

Kita punya:

$$
J(-1)=0,
\qquad
J(1)=0.
$$

Jadi ada dua global minimizers.

Perubahan kecil pada landscape dapat menghasilkan situasi seperti:

- satu global minimizer;
- beberapa global minimizers dengan objective value sama;
- beberapa local minima dengan kedalaman berbeda;
- flat region tempat banyak parameter memberi objective yang sama atau hampir sama.

Hal penting untuk learner:

> “optimum” tidak selalu berarti **satu titik unik**.

Ini akan membantu kita nanti memahami mengapa optimization algorithm perlu dipisahkan dari definisi mathematical solution.

---

# 13. WHY THIS MATTERS IN AI

Model AI dapat mempunyai banyak parameter. Training objective memberi scalar summary tentang quantity yang ingin diarahkan, sedangkan parameter space dapat memiliki dimensi sangat besar.

Topic ini memberi vocabulary minimum untuk memahami training:

1. kita punya parameter;
2. parameter menentukan objective value;
3. kumpulan hubungan parameter $\rightarrow$ objective membentuk landscape;
4. minimization mendefinisikan target mathematical problem;
5. `argmin` menjelaskan **parameter yang dicari**;
6. algoritma seperti Gradient Descent nanti menjelaskan **bagaimana mencoba bergerak menuju parameter yang lebih baik**.

Jadi:

> **Minimization problem adalah tujuan matematis; optimizer adalah prosedur untuk mencari solusi.**

Keduanya tidak boleh disamakan.

---

# 14. MISCONCEPTION CHALLENGE

Tentukan apakah pernyataan berikut aman atau bermasalah.

### A. “Jika $\nabla J(\boldsymbol{\theta})=0$, parameter pasti global optimum.”

**Bermasalah.** Zero gradient menunjukkan critical/stationary condition pada differentiable setting, bukan global-minimum guarantee.

### B. “$\arg\min J$ adalah nilai objective paling kecil.”

**Bermasalah.** `argmin` mengacu pada argument/parameter yang menghasilkan minimum.

### C. “Jika dua parameter menghasilkan objective minimum yang sama, argmin dapat memiliki lebih dari satu anggota.”

**Aman.** Minimizer tidak harus unik.

### D. “Karena $h(q,c)$ adalah scalar, HerAI pasti harus meminimalkannya.”

**Bermasalah.** Scalar quantity belum otomatis menjadi training objective. Semantics dan decision problem harus didefinisikan.

### E. “Menentukan minimization objective sama dengan menentukan update algorithm.”

**Bermasalah.** Topic ini menentukan apa yang dicari; Topic 03 baru memperkenalkan update rule.

---

# 15. TRY IT YOURSELF

Diberikan candidate table:

| $w$ | $J(w)$ |
|---:|---:|
| $-2$ | $1.4$ |
| $-1$ | $0.7$ |
| $0$ | $0.9$ |
| $1$ | $0.5$ |
| $2$ | $0.2$ |

Jawab tanpa melihat pembahasan lain:

1. Berapa nilai objective minimum **di antara candidate yang diberikan**?
2. Parameter mana yang menjadi argmin **di antara candidate yang diberikan**?
3. Apakah tabel terbatas ini cukup untuk membuktikan bahwa parameter tersebut global minimizer pada seluruh $\mathbb{R}$? Jelaskan.

### Checkpoint answer

1. minimum candidate objective = $0.2$;
2. candidate argmin = $w=2$;
3. tidak cukup, karena kita belum mengetahui objective di semua parameter di luar candidate table.

---

# 16. VISUAL / INTERACTIVE SPEC

## [STATIC VISUAL] `min` vs `argmin`

**Learning purpose:** membedakan objective value dari parameter location.  
**Initial state:** curve $J(w)=(w-1)^2$ dengan titik minimum ditandai.  
**Learner action:** membaca dua callout: horizontal coordinate $w=1$ dan vertical value $J=0$.  
**Expected behavior:** learner mengasosiasikan $w=1$ dengan argmin dan $0$ dengan minimum value.  
**Feedback:** label langsung “parameter/location” vs “objective value”.  
**Safety note:** visual tidak menyiratkan semua objective memiliki satu minimum unik.

## [INTERACTIVE VISUAL] Objective Landscape Explorer

**Learning purpose:** menunjukkan parameter $\rightarrow$ objective.  
**Initial state:** 1D synthetic curve dengan satu marker candidate $w$.  
**Learner action:** drag marker sepanjang sumbu $w$.  
**Expected behavior:** nilai $J(w)$ berubah dan vertical position marker mengikuti curve.  
**Feedback:** panel menampilkan `parameter = ...` dan `objective = ...` secara terpisah.  
**Safety note:** interaction hanya mengevaluasi objective, bukan menjalankan Gradient Descent.

## [COMPARE VIEW] Local vs Global Minimum

**Learning purpose:** membedakan neighborhood comparison dari whole-domain comparison.  
**Initial state:** synthetic curve dua valley, satu lebih rendah.  
**Learner action:** pilih valley A atau B dan klasifikasikan local/global.  
**Expected behavior:** kedua valley dapat local; hanya valley terendah ditandai global pada domain visual.  
**Feedback:** highlight neighborhood untuk local dan seluruh displayed domain untuk global.  
**Safety note:** “global” hanya berlaku terhadap domain/function yang didefinisikan, bukan terhadap metric dunia nyata lain.

## [STEP-BY-STEP REVEAL] Critical Point ≠ Global Minimum

**Learning purpose:** mencegah zero-gradient misconception.  
**Initial state:** tiga shapes: valley, hilltop, saddle-like cross-section/contour.  
**Learner action:** reveal gradient condition lalu classification.  
**Expected behavior:** learner melihat bahwa zero local slope/gradient dapat muncul pada tipe titik berbeda.  
**Feedback:** “stationary condition ditemukan; classification membutuhkan informasi tambahan.”  
**Safety note:** jangan memperkenalkan Hessian computation sebagai requirement.

---

# 17. CHECKPOINT

Sebelum lanjut, pastikan Anda dapat menjawab:

1. Apa bedanya $J(\boldsymbol{\theta})$ dan $\boldsymbol{\theta}$?
2. Apa bedanya `min` dan `argmin`?
3. Mengapa argmin bisa mempunyai lebih dari satu minimizer?
4. Apa arti objective landscape?
5. Mengapa local minimum belum tentu global minimum?
6. Mengapa $\nabla J=0$ belum cukup untuk mengatakan global minimum?
7. Mengapa kita belum memiliki optimizer hanya dengan menulis $\arg\min$?

Jika satu jawaban masih kabur, kembali ke bagian Math Reading Skill dan Worked Landscape Example.

---

# 18. MASTERY CHECK — “I Can…”

Setelah Topic 02, saya dapat mengatakan:

- **I can** membaca minimization problem sebagai pencarian parameter yang menurunkan scalar objective.
- **I can** membedakan minimum objective value dari parameter minimizer.
- **I can** membaca $\operatorname*{arg\,min}$ tanpa menyamakannya dengan nilai loss.
- **I can** membaca 1D/2D landscape sebagai parameter-to-objective relation.
- **I can** membedakan local minimum, global minimum, dan stationary/critical condition secara konseptual.
- **I can** menolak klaim “zero gradient = global optimum”.
- **I can** menjelaskan bahwa definisi minimization belum merupakan update algorithm.
- **I can** menjaga $h(q,c)$ sebagai instructional score, bukan production loss.

---

# 19. SCOPE BOUNDARY

## Masuk Topic 02

- minimization problem;
- scalar objective and parameter space;
- `min` vs `argmin`;
- minimizer dapat tidak unik;
- 1D/2D objective/loss landscape reading;
- local vs global minimum;
- stationary/critical point reactivation;
- zero-gradient safety;
- HerAI semantic boundary.

## Sengaja tidak menjadi core Topic 02

- Gradient Descent update rule;
- negative-sign update mechanics;
- learning rate;
- iterative parameter trace;
- convergence proof;
- convex-analysis proof;
- Hessian / second-order classification;
- Newton or quasi-Newton methods;
- line search;
- KKT / constrained optimization;
- Momentum, RMSProp, Adam;
- generalization theory depth.

Convexity hanya disebut sebagai orientation boundary dari source Stanford: ia adalah special structure yang dapat mengubah sifat optimization problem. Learner **tidak perlu** menguasai definisi/proof convexity untuk lulus Topic 02.

---

# 20. SUMMARY

Topic ini memindahkan kita dari pertanyaan:

> “Apa objective yang dihitung?”

menjadi:

> “Parameter mana yang kita cari agar objective menjadi rendah?”

Notasi inti:

$$
\boldsymbol{\theta}^{*}
\in
\operatorname*{arg\,min}_{\boldsymbol{\theta}}
J(\boldsymbol{\theta}).
$$

`argmin` menunjuk parameter/location, sedangkan minimum menunjuk objective value. Objective landscape menggambarkan bagaimana objective berubah di parameter space. Local minimum tidak otomatis global minimum, dan critical/stationary condition seperti $\nabla J=\mathbf{0}$ tidak otomatis menjamin global optimum.

Yang belum kita punya adalah **aturan gerak**.

---

# 21. BRIDGE — Dari Tujuan ke Gerakan

Sekarang kita sudah tahu bentuk target:

$$
\text{cari parameter yang membuat }J\text{ lebih rendah}.
$$

Calculus sudah memberi local-change information:

$$
\nabla J(\boldsymbol{\theta}).
$$

Tetapi kita belum menjawab:

> Jika saat ini parameter berada di $\boldsymbol{\theta}_t$, bagaimana kita membentuk parameter berikutnya $\boldsymbol{\theta}_{t+1}$?

Pertanyaan itu menjadi fokus **Topic 03 — Gradient Descent Update Rule**.

Topic 02 berhenti sebelum update rule agar learner tidak menyamakan **definisi problem optimization** dengan **algoritma yang mencoba menyelesaikannya**.
