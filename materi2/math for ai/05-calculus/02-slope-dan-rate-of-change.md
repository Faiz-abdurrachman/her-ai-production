# Topic 02 — Slope dan Rate of Change
## Submodule 05 — Calculus: Perubahan, Turunan, dan Gradient

> **Posisi topik:** Topic 01 telah mengaktifkan kembali function dan graph. Topic 02 sekarang memformalkan cara membandingkan **perubahan output terhadap perubahan input** pada dua titik. Topik ini belum mengajarkan derivative formal, limit, partial derivative, gradient, atau Optimization.

## Tujuan Pembelajaran

Setelah menyelesaikan topik ini, peserta diharapkan mampu:

1. membedakan **perubahan total** dengan **rate of change**;
2. menghitung perubahan input $\Delta x$ dan perubahan output $\Delta y$ secara konsisten;
3. menghitung slope antara dua titik dengan $\Delta y/\Delta x$;
4. menghitung **average rate of change** fungsi pada suatu interval dari tabel, formula, atau grafik;
5. menjelaskan hubungan average rate of change dengan slope garis secant;
6. menginterpretasikan tanda positif, negatif, dan nol tanpa memberi label “baik” atau “buruk” secara otomatis;
7. membaca unit rate sebagai **output-unit per input-unit** ketika unit bermakna;
8. menjelaskan mengapa average rate of change pada fungsi nonlinear dapat bergantung pada interval;
9. menggunakan instructional score HerAI untuk contoh sensitivitas matematis tanpa mengubah score menjadi probability atau causal effect;
10. menjelaskan mengapa rate of change pada dua titik menjadi jembatan menuju local change pada Topic 03.

---

# 1. HOOK / REAL PROBLEM — “Naik 20” Belum Menjawab Seberapa Cepat

Bayangkan dua situasi.

- Sistem A menghasilkan output yang naik dari 40 menjadi 60 dalam **2 jam**.
- Sistem B menghasilkan output yang naik dari 40 menjadi 60 dalam **10 jam**.

Keduanya mengalami perubahan total yang sama:

$$
\Delta y = 60-40 = 20.
$$

Tetapi apakah keduanya berubah dengan kecepatan yang sama?

Tidak. Sistem A mengalami perubahan 20 dalam 2 jam, sedangkan Sistem B mengalami perubahan 20 dalam 10 jam.

Jadi hanya mengetahui “output naik 20” belum cukup. Kita juga perlu mengetahui **berapa besar perubahan input yang menyertai perubahan output tersebut**.

Inilah ide dasar **rate of change**.

## Predict

Sebelum memakai rumus, prediksi dua kasus berikut.

### Kasus P

Input berubah dari 1 ke 3 dan output berubah dari 4 ke 10.

### Kasus Q

Input berubah dari 1 ke 7 dan output juga berubah dari 4 ke 10.

Pertanyaan:

- perubahan output mana yang lebih besar?
- kasus mana yang memiliki perubahan output **per satu unit input** lebih besar?

Simpan prediksi Anda. Kita akan memeriksanya secara matematis.

---

# 2. INTUITION — Perubahan Bukan Hanya “Dari Berapa ke Berapa”

Ketika input berubah dari $x_1$ menjadi $x_2$, perubahan input ditulis:

$$
\Delta x = x_2-x_1.
$$

Ketika output berubah dari $y_1$ menjadi $y_2$, perubahan output ditulis:

$$
\Delta y = y_2-y_1.
$$

Simbol $\Delta$ dibaca **delta** dan di sini berarti “perubahan” atau “selisih akhir dikurangi awal”.

Rate of change kemudian membandingkan keduanya:

$$
\frac{\Delta y}{\Delta x}.
$$

Secara verbal:

> **berapa banyak output berubah untuk setiap satu unit perubahan input.**

Kembali ke prediksi awal.

### Kasus P

$$
\Delta y = 10-4 = 6
$$

$$
\Delta x = 3-1 = 2
$$

sehingga:

$$
\frac{\Delta y}{\Delta x}=\frac{6}{2}=3.
$$

### Kasus Q

$$
\Delta y = 10-4 = 6
$$

$$
\Delta x = 7-1 = 6
$$

sehingga:

$$
\frac{\Delta y}{\Delta x}=\frac{6}{6}=1.
$$

Perubahan output totalnya sama-sama 6, tetapi rate of change-nya berbeda.

---

# 3. EXPLORE — Dari Dua Titik ke Slope

Misalkan kita memiliki dua titik pada bidang koordinat:

$$
(x_1,y_1)
$$

dan

$$
(x_2,y_2).
$$

Perubahan horizontal adalah:

$$
\Delta x=x_2-x_1,
$$

sedangkan perubahan vertikal adalah:

$$
\Delta y=y_2-y_1.
$$

Untuk $x_2\ne x_1$, slope garis yang melalui dua titik tersebut adalah:

$$
m=\frac{\Delta y}{\Delta x}
=\frac{y_2-y_1}{x_2-x_1}.
$$

Di sini $m$ adalah simbol yang umum digunakan untuk slope sebuah garis.

## 3.1 Mengapa urutan pengurangan harus konsisten?

Misalkan titiknya $(1,4)$ dan $(3,10)$.

Jika kita memilih titik kedua dikurangi titik pertama:

$$
\frac{10-4}{3-1}=\frac{6}{2}=3.
$$

Kita juga boleh membalik urutan **keduanya**:

$$
\frac{4-10}{1-3}=\frac{-6}{-2}=3.
$$

Yang salah adalah membalik hanya numerator atau hanya denominator:

$$
\frac{10-4}{1-3}=-3.
$$

Kesalahan itu mengubah tanda dan makna slope.

## 3.2 Apa arti slope secara visual?

Ketika kita bergerak dari kiri ke kanan:

- slope positif berarti garis naik;
- slope negatif berarti garis turun;
- slope nol berarti garis horizontal;
- slope dengan magnitude lebih besar berarti perubahan vertikal per unit horizontal lebih besar.

Tetapi tanda positif atau negatif **bukan** label nilai “baik” atau “buruk”. Tanda hanya menyatakan arah perubahan dalam sistem koordinat atau konteks yang sedang dibaca.

---

# 4. FORMAL DEFINITION — Average Rate of Change

Untuk fungsi $f$, **average rate of change** pada interval dari $x_1$ ke $x_2$ didefinisikan sebagai:

$$
\text{AROC}
=
\frac{f(x_2)-f(x_1)}{x_2-x_1},
\qquad x_2\ne x_1.
$$

AROC adalah singkatan dari **average rate of change**.

Definisi tersebut memakai hanya dua endpoint interval:

- input awal $x_1$;
- input akhir $x_2$;
- output awal $f(x_1)$;
- output akhir $f(x_2)$.

Karena itu, AROC menjelaskan **perubahan rata-rata sepanjang interval**, bukan detail perubahan pada setiap titik di dalam interval.

## 4.1 Hubungan dengan slope

Titik pada grafik fungsi adalah:

$$
(x_1,f(x_1))
$$

dan

$$
(x_2,f(x_2)).
$$

Garis lurus yang menghubungkan dua titik pada kurva disebut **secant line**.

Slope secant line tersebut adalah:

$$
\frac{f(x_2)-f(x_1)}{x_2-x_1}.
$$

Jadi:

> **average rate of change fungsi pada suatu interval sama dengan slope garis secant yang menghubungkan dua endpoint pada grafik.**

Ini adalah bridge penting dari pembacaan grafik menuju Calculus.

---

# 5. NOTATION + FORMULA — Membaca Rumus Tanpa Menghafal Buta

Rumus utama Topic 02 adalah:

$$
\frac{\Delta y}{\Delta x}
=
\frac{y_2-y_1}{x_2-x_1}.
$$

Untuk fungsi:

$$
\text{AROC}_{[x_1,x_2]}
=
\frac{f(x_2)-f(x_1)}{x_2-x_1}.
$$

## Math Reading Skill

### Simbol

- $x_1$: input awal;
- $x_2$: input akhir;
- $f(x_1)$: output pada input awal;
- $f(x_2)$: output pada input akhir;
- $\Delta x$: perubahan input;
- $\Delta y$: perubahan output;
- $\text{AROC}$: average rate of change.

### Input

Dua input berbeda, $x_1$ dan $x_2$, yang menentukan interval pengamatan.

### Operasi

1. hitung perubahan output;
2. hitung perubahan input;
3. bagi perubahan output dengan perubahan input.

### Output

Satu nilai yang menyatakan **average output change per one input-unit** pada interval tersebut.

### Unit

Jika $y$ memiliki unit dan $x$ memiliki unit, maka unit rate adalah:

$$
\frac{\text{output-unit}}{\text{input-unit}}.
$$

Contoh: jika output adalah kilometer dan input adalah jam, unit rate menjadi kilometer per jam.

### Asumsi / kondisi

Kita memerlukan:

$$
x_2\ne x_1
$$

karena denominator tidak boleh nol.

### Local vs global meaning

AROC adalah **interval-level quantity**. Ia tidak otomatis memberi tahu rate pada setiap titik di dalam interval.

### Yang tidak boleh disimpulkan

- AROC bukan otomatis derivative;
- AROC positif bukan otomatis “hasil yang baik”;
- AROC negatif bukan otomatis “hasil yang buruk”;
- rate pada instructional score bukan causal effect dunia nyata;
- rate pada score bukan probability.

---

# 6. WORKED BASIC EXAMPLE — Dari Tabel ke Rate

Sebuah objek bergerak dengan data instructional berikut.

| Waktu $t$ (jam) | Jarak $d(t)$ (km) |
|---:|---:|
| 1 | 12 |
| 2 | 19 |
| 4 | 33 |

Hitung average rate of change jarak dari $t=1$ hingga $t=4$.

## Langkah 1 — Tentukan endpoint

$$
t_1=1,
\qquad
t_2=4.
$$

Output-nya:

$$
d(1)=12,
\qquad
d(4)=33.
$$

## Langkah 2 — Hitung perubahan output

$$
\Delta d=33-12=21\text{ km}.
$$

## Langkah 3 — Hitung perubahan input

$$
\Delta t=4-1=3\text{ jam}.
$$

## Langkah 4 — Bagi

$$
\text{AROC}
=
\frac{21\text{ km}}{3\text{ jam}}
=
7\text{ km/jam}.
$$

## Interpretasi

Sepanjang interval dari jam ke-1 sampai jam ke-4, jarak bertambah **rata-rata 7 km untuk setiap 1 jam**.

Ini tidak berarti kecepatan objek pasti tepat 7 km/jam pada setiap saat di dalam interval. Kita hanya menggunakan dua endpoint untuk menghitung average rate.

---

# 7. WORKED EXAMPLE — Formula Linear dan Konstannya Rate

Pertimbangkan fungsi:

$$
f(x)=2x+3.
$$

Hitung AROC dari $x=1$ ke $x=5$.

### Endpoint pertama

$$
f(1)=2(1)+3=5.
$$

### Endpoint kedua

$$
f(5)=2(5)+3=13.
$$

### Rate

$$
\text{AROC}
=
\frac{13-5}{5-1}
=
\frac{8}{4}
=2.
$$

Sekarang coba interval lain, misalnya $x=10$ ke $x=12$.

$$
f(10)=23,
\qquad
f(12)=27.
$$

Maka:

$$
\text{AROC}
=
\frac{27-23}{12-10}
=
\frac{4}{2}
=2.
$$

Untuk fungsi linear ini, AROC tetap 2 pada interval mana pun.

Secara visual, graph-nya adalah garis lurus dengan slope konstan.

---

# 8. WORKED EXAMPLE — Fungsi Nonlinear dan Dependensi Interval

Sekarang gunakan fungsi:

$$
g(x)=x^2.
$$

## Interval $[1,3]$

$$
g(1)=1,
\qquad
g(3)=9.
$$

Maka:

$$
\text{AROC}_{[1,3]}
=
\frac{9-1}{3-1}
=
\frac{8}{2}
=4.
$$

## Interval $[3,5]$

$$
g(3)=9,
\qquad
g(5)=25.
$$

Maka:

$$
\text{AROC}_{[3,5]}
=
\frac{25-9}{5-3}
=
\frac{16}{2}
=8.
$$

Fungsi yang sama menghasilkan average rate berbeda pada interval berbeda.

> Untuk fungsi nonlinear, “seberapa cepat berubah” dapat bergantung pada bagian graph yang kita amati.

Ini adalah salah satu alasan Calculus membutuhkan konsep yang lebih lokal daripada average rate—tetapi konsep itu baru akan dibangun pada Topic 03.

---

# 9. WORKED HerAI EXAMPLE — Rate pada Instructional Score

Kita pertahankan fungsi instructional HerAI:

$$
h(q,c)=0.6q+0.4c.
$$

Dengan:

- $q$: quiz ratio;
- $c$: completion ratio;
- $h(q,c)$: **instructional weighted score**, bukan probability.

Untuk Alya, data canonical adalah:

$$
q=0.80,
\qquad
c=0.75.
$$

Maka:

$$
h(0.80,0.75)
=
0.6(0.80)+0.4(0.75)
=
0.48+0.30
=
0.78.
$$

Sekarang buat **scenario matematis instructional**, bukan data observasi baru: completion ratio dipertahankan pada $c=0.75$, sementara kita membandingkan input quiz ratio $q=0.80$ dan $q=0.90$.

Output kedua:

$$
h(0.90,0.75)
=
0.6(0.90)+0.4(0.75)
=
0.54+0.30
=
0.84.
$$

Perubahan output:

$$
\Delta h=0.84-0.78=0.06.
$$

Perubahan input $q$:

$$
\Delta q=0.90-0.80=0.10.
$$

Rate terhadap perubahan $q$ pada perbandingan instructional ini:

$$
\frac{\Delta h}{\Delta q}
=
\frac{0.06}{0.10}
=0.6.
$$

## Interpretasi yang aman

Dalam **fungsi instructional linear yang didefinisikan**, ketika $c$ secara matematis dipertahankan tetap, perubahan score per satu unit perubahan $q$ adalah 0.6.

Karena $q$ adalah rasio 0 sampai 1, perubahan $0.01$ pada $q$—setara satu percentage point—mengubah score sebesar:

$$
0.6(0.01)=0.006.
$$

## Yang tidak boleh diklaim

Perhitungan tersebut **tidak membuktikan** bahwa:

- menaikkan quiz ratio secara nyata menyebabkan outcome pendidikan meningkat;
- quiz adalah “60% lebih penting” dalam makna kausal;
- $0.78$ atau $0.84$ adalah probability keberhasilan;
- rumus ini adalah model produksi HerAI.

Ini hanya pembacaan matematis terhadap fungsi instructional yang memang kita definisikan sendiri.

---

# 10. CHANGE ONE THING — Mengapa Interval Mengubah Jawaban?

Gunakan kembali:

$$
g(x)=x^2.
$$

Kita sudah memperoleh:

$$
\text{AROC}_{[1,3]}=4.
$$

Sekarang pertahankan endpoint awal $x_1=1$ tetapi ubah endpoint akhir.

| Interval | $g(x_1)$ | $g(x_2)$ | AROC |
|---|---:|---:|---:|
| $[1,2]$ | 1 | 4 | 3 |
| $[1,3]$ | 1 | 9 | 4 |
| $[1,4]$ | 1 | 16 | 5 |
| $[1,5]$ | 1 | 25 | 6 |

Satu perubahan sederhana—menggeser endpoint kedua—mengubah slope secant dan average rate.

Ini menunjukkan dua hal:

1. interval adalah bagian dari makna AROC;
2. satu nilai AROC tidak boleh dianggap menceritakan seluruh bentuk fungsi nonlinear.

---

# 11. WHY THIS MATTERS IN AI

Banyak quantity dalam AI dapat dilihat sebagai output dari function:

- model score sebagai fungsi dari input/parameter;
- loss sebagai fungsi dari prediction dan target;
- objective sebagai fungsi dari parameters;
- activation sebagai fungsi dari input.

Sebelum memahami perubahan **lokal**, learner perlu mampu membaca perubahan **antar dua keadaan** secara benar.

Topic 02 memberi tiga literacy skill yang nantinya dipakai berulang:

1. **numerator punya makna** — apa output yang berubah;
2. **denominator punya makna** — terhadap input apa perubahan dibandingkan;
3. **unit dan sign punya interpretasi** — bukan sekadar hasil aritmetika.

Tanpa ketiga hal ini, simbol derivative dan gradient mudah berubah menjadi hafalan rumus tanpa makna.

---

# 12. MISCONCEPTION CHALLENGE

## Miskonsepsi 1 — “Slope sama dengan nilai $y$”

Salah. Slope membandingkan **perubahan $y$** dengan **perubahan $x$**.

Dua titik dapat mempunyai $y$ besar tetapi slope kecil, atau sebaliknya.

## Miskonsepsi 2 — “Slope adalah perubahan $y$ saja”

Salah. $\Delta y=20$ belum menjadi rate sebelum dibandingkan dengan $\Delta x$.

## Miskonsepsi 3 — “Rate positif berarti bagus”

Salah. Positif hanya berarti output meningkat ketika input bergerak ke arah yang dipilih. Apakah peningkatan itu desirable bergantung pada semantics quantity.

Contoh: jika output adalah **loss**, kenaikan mungkin justru tidak diinginkan. Tetapi evaluasi desirability tersebut bukan bagian dari definisi slope.

## Miskonsepsi 4 — “Rate negatif berarti error”

Salah. Negative rate berarti arah perubahan output berlawanan dengan arah perubahan input yang dipilih.

## Miskonsepsi 5 — “Average rate berlaku di setiap titik”

Salah untuk fungsi nonlinear. AROC hanya merangkum endpoint interval.

## Miskonsepsi 6 — “Average rate of change sudah sama dengan derivative”

Belum. Topic ini menggunakan dua titik berbeda. Derivative sebagai **local change** baru dibangun pada Topic 03.

## Miskonsepsi 7 — “Rate pada score membuktikan causal feature effect”

Salah. Rate yang dihitung dari fungsi instructional hanya menjelaskan perilaku fungsi tersebut secara matematis.

---

# 13. TRY IT YOURSELF

## Coba 1

Dua titik adalah $(2,5)$ dan $(6,17)$.

Hitung:

1. $\Delta x$;
2. $\Delta y$;
3. slope.

**Checkpoint jawaban:** slope seharusnya positif.

## Coba 2

Untuk:

$$
f(x)=x^2+1,
$$

hitung AROC pada interval $[1,3]$.

Kemudian jelaskan dengan satu kalimat apa arti hasilnya sebagai perubahan output per input-unit.

## Coba 3

Sebuah function mempunyai AROC $-2$ pada interval tertentu.

Pilih interpretasi yang paling aman:

- output pasti “buruk”;
- output rata-rata turun 2 unit untuk setiap kenaikan 1 input-unit pada interval itu;
- sistem mengalami error sebesar 2;
- fungsi pasti linear di seluruh domain.

Jawaban aman adalah pilihan kedua.

---

# 14. VISUAL / INTERACTIVE SPEC

## [STATIC VISUAL] Rise, Run, dan Dua Titik

**Learning purpose:** membedakan $\Delta y$ dari $\Delta x$ dan menghubungkannya dengan slope.

**Initial state:** coordinate plane dengan dua titik $(1,4)$ dan $(3,10)$, plus garis yang menghubungkannya.

**Learner action:** membaca horizontal run dan vertical rise.

**Expected behavior:** visual menandai $\Delta x=2$, $\Delta y=6$, lalu $m=3$.

**Feedback:** highlight numerator dan denominator dengan label semantik, bukan hanya warna.

**Safety note:** slope adalah ratio perubahan, bukan tinggi titik.

## [NUMBER MANIPULATOR] Geser Endpoint

**Learning purpose:** menunjukkan bahwa AROC fungsi nonlinear bergantung pada interval.

**Initial function:**

$$
g(x)=x^2.
$$

**Initial endpoints:** $x_1=1$, $x_2=3$.

**Learner action:** menggeser $x_2$ melalui slider.

**Expected behavior:** UI memperbarui $g(x_2)$, $\Delta x$, $\Delta y$, AROC, dan secant line.

**Feedback:** learner melihat slope secant berubah saat endpoint berubah.

**Safety note:** jangan menampilkan nilai tersebut sebagai derivative di Topic 02.

## [COMPARE VIEW] Linear vs Nonlinear

**Learning purpose:** membandingkan constant rate dengan interval-dependent rate.

**Initial functions:**

$$
f(x)=2x+3
$$

dan

$$
g(x)=x^2.
$$

**Learner action:** memilih beberapa interval yang sama untuk kedua fungsi.

**Expected behavior:** AROC $f$ tetap 2, sedangkan AROC $g$ berubah.

**Feedback:** tampilkan kalimat interpretasi otomatis yang menyebut interval.

**Safety note:** “rate berubah” belum berarti derivative sudah dihitung.

## [STEP-BY-STEP REVEAL] HerAI Instructional Rate

**Learning purpose:** memisahkan perubahan input, output, dan interpretasi non-kausal.

**Initial state:** $h(q,c)=0.6q+0.4c$, dengan $c=0.75$.

**Learner action:** reveal bertahap $q=0.80\to0.90$, output $0.78\to0.84$, lalu ratio $0.06/0.10$.

**Expected behavior:** hasil akhir 0.6 muncul bersama label “mathematical rate in an instructional score”.

**Feedback:** learner diminta memilih apakah hasil tersebut probability, causal effect, atau mathematical sensitivity; jawaban benar adalah mathematical sensitivity/function behavior.

**Safety note:** bukan production HerAI model dan bukan causal claim.

---

# 15. CHECKPOINT

Sebelum lanjut, pastikan Anda dapat menjawab:

1. Apa perbedaan $\Delta y$ dengan $\Delta y/\Delta x$?
2. Mengapa urutan subtraction harus konsisten?
3. Apa unit rate jika output dalam rupiah dan input dalam hari?
4. Apa hubungan AROC dengan secant line?
5. Mengapa AROC fungsi nonlinear dapat berubah ketika interval berubah?
6. Mengapa AROC positif tidak otomatis berarti “baik”?

Jika satu atau lebih pertanyaan masih terasa kabur, ulangi Worked Basic Example dan Change One Thing sebelum lanjut.

---

# 16. MASTERY CHECK — “I can...”

Setelah Topic 02, learner seharusnya dapat berkata:

- **I can** menghitung $\Delta x$ dan $\Delta y$ dengan urutan yang konsisten.
- **I can** menghitung slope dari dua titik.
- **I can** menghitung average rate of change dari tabel atau formula.
- **I can** membaca rate sebagai output-unit per input-unit.
- **I can** menjelaskan tanda rate tanpa mengubahnya menjadi label baik/buruk.
- **I can** menjelaskan hubungan average rate dengan secant line.
- **I can** menunjukkan bahwa fungsi nonlinear dapat memiliki AROC berbeda pada interval berbeda.
- **I can** membaca rate pada instructional score tanpa menyebutnya probability atau causal effect.

---

# 17. SCOPE BOUNDARY — Apa yang Belum Kita Ajarkan?

Topic 02 berhenti pada **perubahan antara dua titik berbeda**.

Belum menjadi computation requirement:

- instantaneous rate of change;
- formal limit;
- formal derivative notation;
- derivative rules;
- tangent-line computation;
- partial derivative;
- gradient;
- chain rule;
- Gradient Descent;
- learning rate;
- optimizer mechanics.

Istilah “secant line” digunakan karena memang mewakili slope antara dua endpoint fungsi. **Tangent/local derivative** sengaja ditahan untuk Topic 03 supaya learner memahami kebutuhan konseptualnya terlebih dahulu.

---

# 18. SUMMARY

Pada Topic 02 kita membangun bahasa matematika untuk perubahan antar dua keadaan.

Rumus kunci:

$$
\Delta x=x_2-x_1,
\qquad
\Delta y=y_2-y_1,
$$

serta:

$$
\frac{\Delta y}{\Delta x}
=
\frac{y_2-y_1}{x_2-x_1}.
$$

Untuk fungsi:

$$
\text{AROC}_{[x_1,x_2]}
=
\frac{f(x_2)-f(x_1)}{x_2-x_1}.
$$

Inti interpretasinya:

> **Average rate of change menyatakan rata-rata perubahan output per satu unit perubahan input pada interval yang dipilih.**

Ia sama dengan slope secant line antara dua endpoint pada grafik.

Untuk fungsi linear, rate dapat konstan pada semua interval. Untuk fungsi nonlinear, rate dapat bergantung pada interval.

---

# 19. BRIDGE — Dari Dua Titik Menuju Perubahan Lokal

Sekarang kita sudah tahu cara menghitung perubahan dengan **dua titik yang berbeda**.

Pertanyaan Calculus berikutnya adalah:

> Apa yang terjadi jika kita ingin mengetahui bagaimana fungsi berubah **sangat dekat pada satu input tertentu**, bukan hanya rata-rata antara dua endpoint yang berjauhan?

Pertanyaan tersebut membawa kita ke:

# **Topic 03 — Derivative sebagai Local Change**

Di sana barulah ide instantaneous/local change dibangun dengan treatment limit yang beginner-safe sesuai kontrak Submodule 05.
