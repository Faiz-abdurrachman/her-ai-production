# Topic 03 — Derivative sebagai Local Change
## Submodule 05 — Calculus: Perubahan, Turunan, dan Gradient

> **Posisi topik:** Topic 01 mengaktifkan kembali function dan graph. Topic 02 membangun slope dan average rate of change antara **dua titik berbeda**. Topic 03 sekarang menjawab pertanyaan baru: bagaimana kita mendeskripsikan perubahan **secara lokal pada satu input tertentu**? Topik ini memperkenalkan derivative secara konseptual dan melalui difference quotient sederhana, tetapi **belum** mengajarkan katalog differentiation rules seperti power rule, sum rule, product rule, atau chain rule.

## Tujuan Pembelajaran

Setelah menyelesaikan topik ini, peserta diharapkan mampu:

1. membedakan **average rate of change** pada interval dengan **local/instantaneous rate of change** pada satu titik;
2. menjelaskan bagaimana garis secant yang titik keduanya semakin dekat dapat memotivasi garis tangent;
3. menjelaskan derivative sebagai slope garis tangent dan sebagai local rate of change ketika derivative tersebut ada;
4. membaca notasi utama $f'(a)$ dan $f'(x)$ serta mengenali notasi pendamping $\frac{df}{dx}$;
5. membaca secara intuitif difference quotient $\frac{f(a+h)-f(a)}{h}$;
6. menggunakan limit $h\to0$ sebagai bahasa matematis untuk “jarak input dibuat semakin kecil” tanpa melakukan pembuktian epsilon-delta;
7. menghitung derivative pada satu titik untuk fungsi sangat sederhana **dari definisi/difference quotient**, bukan dari differentiation rules;
8. menginterpretasikan sign dan unit derivative secara lokal;
9. menjelaskan bahwa derivative tidak selalu ada dan tidak otomatis menyatakan causal effect;
10. menggunakan canonical instructional score HerAI sebagai contoh local mathematical sensitivity tanpa mengubahnya menjadi probability, accuracy, atau production rule.

---

# 1. HOOK / REAL PROBLEM — Average Speed Bukan Speedometer Saat Ini

Bayangkan Anda menempuh perjalanan 120 km dalam 2 jam. Average speed perjalanan adalah:

$$
\frac{120\text{ km}}{2\text{ jam}}
=
60\text{ km/jam}.
$$

Tetapi angka 60 km/jam tidak berarti speedometer menunjukkan 60 km/jam **setiap saat**.

Mungkin pada beberapa bagian perjalanan kendaraan bergerak 30 km/jam, lalu 80 km/jam, lalu berhenti, lalu kembali bergerak. Average rate merangkum perubahan selama sebuah interval. Ia tidak menjawab secara langsung:

> **“Seberapa cepat keadaan berubah tepat di sekitar saat ini?”**

Pertanyaan seperti itulah yang membawa kita dari **average rate of change** menuju **derivative**.

## Predict

Misalkan:

$$
f(x)=x^2.
$$

Kita ingin memahami perubahan fungsi di sekitar $x=2$.

Tanpa menghitung derivative terlebih dahulu, perhatikan beberapa interval yang semuanya dimulai di $x=2$:

- dari $2$ ke $3$;
- dari $2$ ke $2.5$;
- dari $2$ ke $2.1$;
- dari $2$ ke $2.01$.

Prediksi:

1. Apakah slope secant pada interval-interval tersebut akan sama?
2. Ketika endpoint kedua semakin dekat ke $2$, apakah slope secant tampak mendekati satu nilai tertentu?
3. Jika iya, apa makna nilai tersebut pada grafik?

Simpan prediksi Anda. Kita akan mengujinya dengan angka.

---

# 2. INTUITION — Dari “Dua Titik” ke “Sangat Dekat dengan Satu Titik”

Pada Topic 02, average rate of change fungsi $f$ dari $x_1$ ke $x_2$ adalah:

$$
\frac{f(x_2)-f(x_1)}{x_2-x_1}.
$$

Rumus tersebut membutuhkan **dua input berbeda**.

Sekarang kita memilih satu input utama, misalnya:

$$
x=a.
$$

Lalu kita memilih input kedua yang dekat dengan $a$:

$$
a+h.
$$

Di sini $h$ adalah perubahan kecil pada input. Karena:

$$
(a+h)-a=h,
$$

slope secant antara titik $(a,f(a))$ dan $(a+h,f(a+h))$ adalah:

$$
\frac{f(a+h)-f(a)}{h},
\qquad h\ne0.
$$

Ini masih **secant slope** karena titiknya masih dua dan $h$ belum nol.

Ide Calculus muncul ketika kita bertanya:

> Apa nilai yang didekati slope tersebut ketika $h$ dibuat semakin kecil menuju 0?

Secara visual, titik kedua bergerak semakin dekat ke titik utama. Garis secant kemudian mendekati garis yang menyentuh kurva secara lokal: **tangent line**.

---

# 3. EXPLORE — Secant yang Semakin Dekat

Gunakan fungsi:

$$
f(x)=x^2
$$

pada titik utama:

$$
a=2.
$$

Nilai fungsi di titik utama:

$$
f(2)=4.
$$

Sekarang ambil endpoint kedua $2+h$.

Slope secant-nya:

$$
\frac{f(2+h)-f(2)}{h}.
$$

Karena:

$$
f(2+h)=(2+h)^2,
$$

maka:

$$
\frac{(2+h)^2-4}{h}.
$$

Kembangkan numerator:

$$
(2+h)^2=4+4h+h^2.
$$

Sehingga:

$$
\frac{4+4h+h^2-4}{h}
=
\frac{4h+h^2}{h}.
$$

Untuk $h\ne0$:

$$
\frac{4h+h^2}{h}
=
4+h.
$$

Sekarang lihat beberapa nilai $h$.

| $h$ | Endpoint kedua $2+h$ | Slope secant $4+h$ |
|---:|---:|---:|
| $1$ | $3$ | $5$ |
| $0.5$ | $2.5$ | $4.5$ |
| $0.1$ | $2.1$ | $4.1$ |
| $0.01$ | $2.01$ | $4.01$ |
| $-0.1$ | $1.9$ | $3.9$ |
| $-0.01$ | $1.99$ | $3.99$ |

Dari kanan, slope mendekati 4.

Dari kiri, slope juga mendekati 4.

Jadi perubahan fungsi **secara lokal di sekitar $x=2$** memiliki slope yang didekati sebesar:

$$
4.
$$

Angka 4 inilah derivative $f$ pada $x=2$.

---

# 4. FORMAL DEFINITION — Derivative di Satu Titik

Untuk fungsi $f$ dan input $a$, derivative $f$ di titik $a$ didefinisikan sebagai:

$$
f'(a)
=
\lim_{h\to0}
\frac{f(a+h)-f(a)}{h},
$$

**jika limit tersebut ada**.

Definisi ini menyatukan tiga ide:

1. **difference quotient**
   $$
   \frac{f(a+h)-f(a)}{h};
   $$
2. $h$ dibuat semakin dekat ke 0;
3. nilai yang didekati quotient menjadi derivative di titik $a$.

Secara geometris:

> **$f'(a)$ adalah slope tangent line pada grafik $f$ di titik $(a,f(a))$, ketika slope tersebut terdefinisi.**

Secara perubahan:

> **$f'(a)$ adalah local rate of change fungsi di sekitar input $a$.**

## Advanced / Optional — Apa arti simbol limit di sini?

Tulisan:

$$
\lim_{h\to0}
\frac{f(a+h)-f(a)}{h}
$$

**bukan** berarti kita langsung mengganti $h$ dengan 0 di pecahan awal. Jika langsung dilakukan, denominator menjadi 0.

Makna yang kita perlukan pada submodule ini adalah lebih sederhana:

> lihat nilai difference quotient ketika $h$ semakin kecil dan semakin dekat ke 0, lalu identifikasi nilai yang didekati.

Kita **tidak** mempelajari pembuktian epsilon-delta, teknik limit luas, atau teori limit formal sebagai computation requirement.

---

# 5. NOTATION + FORMULA — Membaca $f'(a)$, $f'(x)$, dan $\frac{df}{dx}$

## 5.1 Derivative di satu titik

$$
f'(a)
$$

dibaca:

> “f prime di a.”

Maknanya adalah derivative fungsi $f$ pada input tertentu $a$.

Contoh:

$$
f'(2)=4
$$

berarti local rate of change fungsi $f$ di sekitar $x=2$ adalah 4 output-unit per input-unit.

## 5.2 Derivative sebagai function

Kadang kita ingin mengetahui local rate untuk banyak input, bukan hanya satu titik. Kita menulis:

$$
f'(x).
$$

Ini adalah **derivative function**: inputnya $x$, outputnya local rate yang terkait dengan $f$ pada input tersebut.

Topic 03 hanya mengenalkan makna ini. Cara cepat menghitung derivative function dengan aturan seperti power rule baru menjadi fokus Topic 04.

## 5.3 Notasi Leibniz

Notasi lain yang umum adalah:

$$
\frac{df}{dx}.
$$

Pada submodule ini:

- $f'(x)$ menjadi notasi learner-facing utama;
- $\frac{df}{dx}$ diperkenalkan sebagai notasi pendamping;
- keduanya tidak boleh dianggap sebagai “pecahan biasa” yang dapat dimanipulasi tanpa aturan.

---

# 6. MATH READING SKILL — Jangan Hanya Melihat Simbol

Perhatikan lagi:

$$
f'(a)
=
\lim_{h\to0}
\frac{f(a+h)-f(a)}{h}.
$$

Kita baca setiap bagiannya.

## Symbols

- $f$ = fungsi yang sedang dipelajari;
- $a$ = input utama tempat local change ingin dibaca;
- $h$ = perubahan kecil pada input;
- $a+h$ = input kedua yang dekat dengan $a$;
- $f(a+h)-f(a)$ = perubahan output;
- $h$ = perubahan input;
- $\frac{f(a+h)-f(a)}{h}$ = secant slope/difference quotient selama $h\ne0$;
- $h\to0$ = $h$ dibuat mendekati 0;
- $f'(a)$ = nilai local rate yang diperoleh jika limit ada.

## Input

Input derivative-at-a adalah titik $a$.

## Operation

Bandingkan perubahan output terhadap perubahan input pada dua titik yang semakin dekat.

## Output

Satu nilai local rate, misalnya:

$$
f'(2)=4.
$$

## Units

Jika $f$ mengukur output dalam unit tertentu dan $x$ mempunyai unit tertentu, derivative membawa unit:

> **output-unit per input-unit.**

Jika posisi $s(t)$ diukur dalam meter dan waktu $t$ dalam detik, maka:

$$
s'(t)
$$

memiliki unit meter per detik.

## Local vs global

Derivative di satu titik memberi informasi **lokal**.

Ia tidak otomatis menjelaskan perilaku fungsi di seluruh domain.

## What it does NOT imply

Derivative tidak otomatis berarti:

- causal effect;
- probability;
- confidence;
- accuracy;
- “baik” ketika positif;
- “buruk” ketika negatif;
- global increase di seluruh domain;
- optimization sudah terjadi.

---

# 7. WORKED BASIC EXAMPLE — Derivative $x^2$ di $x=2$ Tanpa Power Rule

Kita gunakan:

$$
f(x)=x^2.
$$

Tujuan:

$$
f'(2).
$$

Mulai dari definition:

$$
f'(2)
=
\lim_{h\to0}
\frac{f(2+h)-f(2)}{h}.
$$

Substitusi fungsi:

$$
f'(2)
=
\lim_{h\to0}
\frac{(2+h)^2-2^2}{h}.
$$

Kembangkan:

$$
(2+h)^2=4+4h+h^2.
$$

Maka:

$$
f'(2)
=
\lim_{h\to0}
\frac{4+4h+h^2-4}{h}.
$$

Sederhanakan:

$$
f'(2)
=
\lim_{h\to0}
\frac{4h+h^2}{h}.
$$

Untuk $h\ne0$:

$$
\frac{4h+h^2}{h}=4+h.
$$

Ketika $h$ mendekati 0:

$$
4+h\to4.
$$

Jadi:

$$
f'(2)=4.
$$

### Interpretation

- input yang berubah: $x$;
- output yang berubah: $f(x)$;
- lokasi yang dibaca: sekitar $x=2$;
- local rate: 4 output-unit per input-unit;
- slope tangent line di titik $(2,4)$: 4.

Perhatikan: kita belum menggunakan aturan “turunan $x^2$ adalah $2x$”. Itu akan menjadi bagian Topic 04.

---

# 8. WORKED HerAI EXAMPLE — Local Change pada Instructional Score

Canonical instructional score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Ingat:

> **$h$ adalah instructional score, bukan probability, confidence, accuracy, causal model, atau production recommendation.**

Topic 05 nanti akan membahas partial derivative untuk fungsi dengan beberapa input. Karena kita belum sampai sana, pada Topic 03 kita membuat **one-variable slice** dengan satu nilai $c$ dipertahankan tetap secara matematis.

Misalkan untuk ilustrasi kita gunakan:

$$
c=0.75.
$$

Definisikan fungsi satu variabel:

$$
r(q)=h(q,0.75).
$$

Maka:

$$
r(q)=0.6q+0.4(0.75).
$$

Karena:

$$
0.4(0.75)=0.30,
$$

kita memperoleh:

$$
r(q)=0.6q+0.30.
$$

Sekarang pilih titik:

$$
q=0.80.
$$

Difference quotient untuk perubahan kecil $k$ pada $q$ adalah:

$$
\frac{r(0.80+k)-r(0.80)}{k}.
$$

Hitung numerator:

$$
r(0.80+k)
=
0.6(0.80+k)+0.30.
$$

$$
r(0.80+k)
=
0.48+0.6k+0.30
=
0.78+0.6k.
$$

Sedangkan:

$$
r(0.80)=0.78.
$$

Jadi:

$$
\frac{r(0.80+k)-r(0.80)}{k}
=
\frac{0.6k}{k}
=0.6,
\qquad k\ne0.
$$

Nilainya sudah konstan 0.6 untuk setiap perubahan kecil nonzero $k$, sehingga local rate yang didekati adalah:

$$
r'(0.80)=0.6.
$$

### Interpretation yang aman

Dalam **fungsi instructional satu-variabel $r$ ini**, score berubah 0.6 score-unit per satu unit perubahan $q$ ketika $c$ dipertahankan tetap secara matematis.

Untuk perubahan kecil:

$$
\Delta q=0.01,
$$

fungsi linear ini menghasilkan perubahan score:

$$
\Delta r=0.6(0.01)=0.006.
$$

Tetapi ini **tidak** berarti:

- quiz menyebabkan outcome pendidikan naik 0.6;
- probability keberhasilan naik 60%;
- peserta dengan score lebih tinggi pasti lebih berhasil;
- sistem produksi HerAI benar-benar memakai fungsi tersebut.

Kita hanya sedang membaca perilaku fungsi matematika yang sengaja dibuat untuk pembelajaran.

---

# 9. CHANGE ONE THING — Local Rate Bisa Berubah dari Titik ke Titik

Kembali ke fungsi nonlinear:

$$
f(x)=x^2.
$$

Di sekitar $x=2$, kita melihat local rate mendekati 4.

Sekarang bayangkan kita memindahkan titik utama ke lokasi yang berbeda pada parabola.

Secara visual:

- di sisi kiri parabola, tangent dapat memiliki slope negatif;
- di sekitar titik paling bawah, tangent dapat horizontal;
- di sisi kanan, tangent dapat memiliki slope positif;
- semakin jauh ke kanan pada parabola ini, tangent tampak semakin curam.

Artinya:

> **Derivative bukan satu angka global yang otomatis berlaku di semua input.**

Untuk fungsi tertentu, local rate dapat berubah ketika titik input berubah.

Inilah alasan kita membedakan:

$$
f'(a)
$$

sebagai derivative di satu titik dan:

$$
f'(x)
$$

sebagai derivative function.

---

# 10. WHY THIS MATTERS IN AI — Sensitivity Sebelum Optimization

Banyak sistem AI mempunyai mathematical function yang mengubah input atau parameter menjadi output.

Secara konseptual, derivative membantu menjawab pertanyaan seperti:

> Jika satu input atau parameter berubah sedikit, bagaimana output fungsi berubah secara lokal?

Nanti dalam submodule ini, ide tersebut berkembang menjadi:

- partial derivative untuk beberapa variable;
- gradient sebagai vector partial derivatives;
- local change pada loss function;
- bridge menuju Optimization.

Tetapi Topic 03 **belum** melakukan parameter update.

Derivative menyediakan **informasi perubahan**. Ia tidak dengan sendirinya menjalankan training, memilih learning rate, atau memindahkan parameter.

Selain itu, derivative sebuah mathematical function tidak otomatis memiliki makna causal dalam dunia nyata. Jika sebuah score berubah ketika satu input pada rumus diubah, itu menjelaskan **fungsi tersebut**, bukan otomatis membuktikan bahwa mengubah faktor dunia nyata akan menyebabkan outcome berubah dengan besaran yang sama.

---

# 11. MISCONCEPTION CHALLENGE

## Misconception 1 — “Derivative sama dengan average rate of change.”

Tidak secara umum.

Average rate memakai dua endpoint pada interval tertentu. Derivative adalah local rate pada satu titik yang diperoleh dari limit secant slopes ketika interval menyusut.

---

## Misconception 2 — “Derivative adalah nilai $y$ pada grafik.”

Salah.

$f(a)$ adalah **nilai output fungsi**.

$f'(a)$ adalah **local rate/slope tangent**.

Keduanya adalah objek berbeda.

---

## Misconception 3 — “Derivative positif berarti hasilnya baik.”

Tidak.

Derivative positif hanya berarti output cenderung meningkat ketika input meningkat sedikit di sekitar titik tersebut. Apakah peningkatan itu desirable atau undesirable bergantung pada semantik fungsi.

---

## Misconception 4 — “Derivative negatif berarti error.”

Tidak.

Derivative negatif berarti local slope menurun terhadap kenaikan input. Itu bukan label error.

---

## Misconception 5 — “Setiap fungsi pasti punya derivative di setiap titik.”

Tidak.

Misalnya:

$$
g(x)=|x|.
$$

Di sekitar $x=0$:

- slope dari sisi kiri adalah $-1$;
- slope dari sisi kanan adalah $+1$.

Karena keduanya tidak mendekati slope yang sama, tidak ada satu tangent slope yang konsisten pada titik tajam tersebut. Jadi derivative di $x=0$ tidak ada.

Topik ini tidak membangun teori differentiability formal, tetapi learner harus tahu bahwa derivative **tidak otomatis ada di semua titik**.

---

## Misconception 6 — “Derivative membuktikan causality.”

Salah.

Derivative menggambarkan sensitivitas matematis dari sebuah fungsi terhadap input. Claim causal membutuhkan desain data dan asumsi yang jauh berbeda.

---

## Misconception 7 — “Derivative nol berarti global minimum.”

Tidak.

Derivative nol berarti slope tangent lokal horizontal. Titik tersebut bisa saja minimum lokal, maksimum lokal, atau jenis titik lain. Classification seperti itu membutuhkan konteks tambahan dan bukan fokus Topic 03.

---

# 12. TRY IT YOURSELF

## A. Mendekati derivative dari secant slope

Gunakan:

$$
f(x)=x^2
$$

pada $a=3$.

Hitung difference quotient untuk:

- $h=1$;
- $h=0.5$;
- $h=0.1$;
- $h=0.01$.

Prediksi nilai yang didekati ketika $h\to0$.

**Hint:** mulai dari:

$$
\frac{(3+h)^2-9}{h}.
$$

---

## B. Baca sign dari grafik secara konseptual

Bayangkan grafik yang:

- menurun tajam di titik P;
- horizontal di titik Q;
- naik perlahan di titik R.

Tanpa menghitung angka exact, tentukan apakah derivative di masing-masing titik kemungkinan:

- negatif;
- nol;
- positif.

---

## C. Pisahkan value dan rate

Jika:

$$
f(2)=10
$$

dan:

$$
f'(2)=-3,
$$

jelaskan perbedaan makna angka 10 dan $-3$.

---

# 13. VISUAL / INTERACTIVE SPEC

## [STEP-BY-STEP REVEAL] Secant → Tangent

**Learning purpose:** memperlihatkan mengapa derivative muncul dari slope secant yang endpoint-nya mendekat.

**Initial state:** grafik $f(x)=x^2$, titik utama $a=2$, titik kedua $2+h$ dengan $h=1$.

**Learner action:** tekan Next untuk mengubah $h$: $1\to0.5\to0.1\to0.01$.

**Expected behavior:** titik kedua bergerak mendekati $x=2$, secant line berubah, dan nilai slope $4+h$ mendekati 4.

**Feedback:** tampilkan “secant slope semakin dekat ke local slope 4”.

**Safety note:** jangan mengatakan titik kedua benar-benar menjadi titik yang sama dalam quotient dengan denominator 0; yang digunakan adalah nilai yang **didekati**.

---

## [NUMBER MANIPULATOR] Ubah $h$

**Learning purpose:** membangun intuisi limit tanpa epsilon-delta.

**Initial state:** $f(x)=x^2$, $a=2$, $h=0.5$.

**Learner action:** slider $h$ dari nilai negatif kecil ke positif kecil, tetapi tidak mengizinkan $h=0$ pada secant quotient.

**Expected behavior:** tampilkan endpoint kedua, difference quotient, dan nilainya.

**Feedback:** ketika $|h|$ mengecil, slope mendekati 4 dari kedua sisi.

**Safety note:** $h=0$ tidak dimasukkan langsung ke difference quotient awal.

---

## [COMPARE VIEW] Average vs Local

**Learning purpose:** membedakan Topic 02 dan Topic 03.

**Initial state:** panel kiri menunjukkan AROC $f$ pada $[2,4]$; panel kanan menunjukkan secant slopes $[2,2+h]$ dengan $h$ mengecil.

**Learner action:** bandingkan angka dan garis.

**Expected behavior:** learner melihat bahwa interval besar memberikan satu average summary, sedangkan shrinking interval mengarah pada local rate di $x=2$.

**Feedback:** label “interval rate” vs “local rate”.

**Safety note:** jangan menyamakan local rate dengan perilaku global fungsi.

---

## [STATIC VISUAL] Corner yang Tidak Differentiable

**Learning purpose:** menolak miskonsepsi “derivative selalu ada”.

**Initial state:** grafik $g(x)=|x|$ di sekitar $x=0$.

**Learner action:** observasi slope dari kiri dan kanan.

**Expected behavior:** visual menunjukkan slope kiri $-1$ dan slope kanan $+1$.

**Feedback:** “tidak ada satu tangent slope yang disepakati dari kedua sisi.”

**Safety note:** tidak perlu memperluas ke teori one-sided limits formal.

---

# 14. CHECKPOINT

Jawab tanpa melihat kembali materi jika memungkinkan.

1. Apa perbedaan paling penting antara AROC dan derivative?
2. Apa arti $h$ dalam difference quotient?
3. Mengapa $h\to0$ berbeda dari sekadar “substitusi $h=0$ sejak awal”?
4. Jika $f'(a)<0$, apa interpretasi lokal yang aman?
5. Apakah derivative sebuah instructional score membuktikan causal effect? Jelaskan.

### Jawaban ringkas

1. AROC mengukur perubahan rata-rata pada interval; derivative mengukur local rate pada satu titik ketika derivative ada.
2. $h$ adalah perubahan kecil pada input dari $a$ ke $a+h$.
3. Difference quotient membutuhkan $h\ne0$; limit mempelajari nilai yang didekati ketika $h$ semakin dekat ke 0.
4. Output fungsi cenderung menurun terhadap kenaikan kecil input di sekitar titik tersebut.
5. Tidak. Ia hanya menjelaskan sensitivitas fungsi matematis yang didefinisikan.

---

# 15. MASTERY CHECK — “I Can...”

- **I can** membedakan average rate dan local rate.
- **I can** menjelaskan secant line yang mendekati tangent line.
- **I can** membaca $f'(a)$ sebagai derivative di satu titik.
- **I can** mengenali $\frac{df}{dx}$ sebagai notasi derivative lain.
- **I can** membaca difference quotient dan menjelaskan arti $h$.
- **I can** menjelaskan $h\to0$ secara intuitif tanpa mengatakan denominator menjadi 0.
- **I can** menghitung derivative pada satu titik untuk contoh sederhana dari definition.
- **I can** menginterpretasikan sign dan unit derivative secara lokal.
- **I can** menjelaskan bahwa derivative tidak selalu ada.
- **I can** menolak causal/probability overclaim dari derivative instructional score.

---

# 16. SCOPE BOUNDARY — Apa yang Belum Menjadi Materi Hitung?

Topic 03 berhenti pada **makna derivative sebagai local change**, tangent slope, intuitive limit, difference quotient, dan derivative-at-a untuk contoh sederhana.

Belum menjadi computation requirement:

- power rule sebagai metode cepat umum;
- constant/sum/product/quotient rules;
- derivative catalog untuk trigonometric/exponential functions;
- partial derivative;
- gradient;
- chain rule;
- computational graph;
- Hessian atau second-order calculus;
- loss landscape sebagai unit utama;
- Gradient Descent;
- learning rate;
- optimizer mechanics.

Formal epsilon-delta proof dan extensive limit techniques juga tetap di luar core.

---

# 17. SUMMARY

Topic 02 memakai dua endpoint untuk menghitung average rate:

$$
\frac{f(x_2)-f(x_1)}{x_2-x_1}.
$$

Topic 03 memperkecil jarak endpoint kedua dengan menulis:

$$
a+h.
$$

Difference quotient menjadi:

$$
\frac{f(a+h)-f(a)}{h}.
$$

Derivative di titik $a$ adalah nilai yang didekati quotient tersebut ketika $h\to0$:

$$
f'(a)
=
\lim_{h\to0}
\frac{f(a+h)-f(a)}{h},
$$

jika limit ada.

Interpretasi utama:

> **Derivative adalah local rate of change dan, secara geometris, slope tangent line pada titik tersebut.**

Derivative membawa unit output per input ketika unit bermakna. Sign derivative menggambarkan arah local change, bukan label baik/buruk. Derivative juga tidak otomatis berarti causality, probability, atau optimization.

---

# 18. BRIDGE — Dari Memahami Derivative ke Menghitungnya Lebih Efisien

Pada Topic 03 kita menghitung derivative contoh sederhana langsung dari shrinking secant/difference quotient.

Metode tersebut penting karena menunjukkan **asal makna derivative**, tetapi akan merepotkan jika setiap fungsi selalu dihitung dari limit definition.

Pertanyaan berikutnya adalah:

> Bisakah kita menghitung derivative fungsi sederhana dengan aturan yang lebih cepat tanpa kehilangan makna local change yang baru dipahami?

Itulah fokus:

# **Topic 04 — Menghitung Derivative Sederhana**

Di sana barulah differentiation rules sederhana menjadi computation requirement.
