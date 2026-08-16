# Topic 01 — Function dan Graph: Aktivasi Kembali
## Submodule 05 — Calculus: Perubahan, Turunan, dan Gradient

> **Posisi topik:** reaktivasi prerequisite sebelum Calculus formal. Topik ini tidak mengulang seluruh materi fungsi dari Mathematical Readiness dan belum mengajarkan slope formal, derivative, gradient, atau Optimization.

## Tujuan Pembelajaran

Setelah menyelesaikan topik ini, peserta diharapkan mampu:

1. menjelaskan fungsi sebagai hubungan input → output dengan satu output untuk setiap input yang valid;
2. membedakan **input**, **output**, **domain**, dan **range** pada contoh sederhana;
3. mengevaluasi nilai fungsi dari formula, tabel, atau grafik;
4. membaca grafik fungsi linear dan kuadrat secara kualitatif;
5. menghubungkan perubahan input dengan perubahan output tanpa terlebih dahulu menyebutnya sebagai derivative;
6. membaca kembali fungsi instructional HerAI tanpa mengubah score menjadi probability atau causal effect;
7. menjelaskan mengapa literasi function dan graph diperlukan sebelum masuk ke slope dan derivative.

---

# 1. HOOK / REAL PROBLEM — Ketika Satu Input Berubah, Apa yang Terjadi pada Output?

Bayangkan sebuah sistem menerima sebuah nilai dan menghasilkan nilai lain.

Contoh sederhana:

- sebuah kalkulator menerima angka lalu menghasilkan hasil perhitungan;
- sebuah konversi suhu menerima suhu Celsius lalu menghasilkan Fahrenheit;
- sebuah komponen model AI menerima representasi numerik lalu menghasilkan representasi baru;
- sebuah instructional score menerima nilai tertentu lalu menghasilkan score.

Dalam semua contoh itu ada satu ide yang sama:

> **ada input, ada aturan pemetaan, lalu ada output.**

Di Mathematical Readiness, kita sudah mengenal fungsi sebagai cara formal untuk menggambarkan hubungan tersebut. Di Calculus, fungsi menjadi lebih penting karena kita tidak hanya bertanya **“berapa output-nya?”**, tetapi nanti juga akan bertanya:

> **“Jika input berubah sedikit, bagaimana output ikut berubah?”**

Pertanyaan itulah yang akan membawa kita menuju slope dan derivative pada topik berikutnya.

## Predict

Sebelum menghitung apa pun, perhatikan fungsi:

$$
f(x)=2x+1
$$

Tanpa menghitung secara detail, prediksi:

- jika $x$ bertambah, apakah $f(x)$ cenderung bertambah atau berkurang?
- jika $x$ berubah dari $1$ menjadi $2$, apakah output berubah?
- apakah satu input tertentu boleh menghasilkan dua output berbeda dari aturan yang sama?

Simpan prediksi Anda. Kita akan memeriksanya setelah mengaktifkan kembali konsep fungsi.

---

# 2. INTUITION — Fungsi sebagai Pemetaan Input ke Output

Sebuah **fungsi** adalah aturan yang memasangkan setiap input yang valid dengan **tepat satu output**.

Kita dapat memikirkan pola umumnya sebagai:

$$
\text{input} \longrightarrow \text{aturan fungsi} \longrightarrow \text{output}
$$

Jika kita menulis:

$$
y=f(x),
$$

maka:

- $x$ adalah input;
- $f$ adalah nama fungsi atau aturan pemetaan;
- $f(x)$ adalah output yang dihasilkan ketika input-nya $x$;
- $y$ adalah nama lain yang dapat digunakan untuk output.

### Hal yang paling penting

Satu input yang sama tidak boleh menghasilkan dua output berbeda **dalam fungsi yang sama**.

Misalnya:

| Input $x$ | Output $f(x)$ |
|---:|---:|
| 1 | 3 |
| 2 | 5 |
| 3 | 7 |

Tabel ini dapat menjadi fungsi.

Tetapi jika input $2$ sekaligus dipasangkan dengan output $5$ dan $9$ tanpa aturan konteks tambahan, relasi itu bukan fungsi tunggal dari $x$ ke output.

---

# 3. EXPLORE — Satu Fungsi, Banyak Cara Melihat

Sebuah fungsi dapat direpresentasikan dalam beberapa bentuk.

## 3.1 Formula

Contoh:

$$
f(x)=2x+1
$$

## 3.2 Tabel

Untuk beberapa input:

| $x$ | $f(x)=2x+1$ |
|---:|---:|
| 0 | 1 |
| 1 | 3 |
| 2 | 5 |
| 3 | 7 |

## 3.3 Pasangan koordinat

Tabel tadi dapat dibaca sebagai pasangan titik:

$$
(0,1),\;(1,3),\;(2,5),\;(3,7).
$$

## 3.4 Grafik

Pada grafik fungsi:

- sumbu horizontal biasanya memuat input $x$;
- sumbu vertikal memuat output $f(x)$;
- titik $(x,f(x))$ menunjukkan input dan output yang saling berpasangan.

Jadi titik $(2,5)$ berarti:

> ketika input $x=2$, fungsi menghasilkan output $f(2)=5$.

Grafik bukan sekadar gambar dekoratif. Grafik adalah cara visual untuk membaca bagaimana output berperilaku saat input berubah.

---

# 4. FORMAL DEFINITION — Function, Domain, dan Range

## 4.1 Function

Untuk tujuan modul ini, gunakan definisi kerja berikut:

> **Fungsi adalah relasi yang memberikan tepat satu output untuk setiap input yang termasuk domain-nya.**

Definisi ini cukup untuk membawa kita ke Calculus dasar tanpa membebani peserta dengan teori himpunan formal yang tidak diperlukan.

## 4.2 Domain

**Domain** adalah kumpulan input yang valid untuk fungsi.

Jika fungsi kita adalah:

$$
f(x)=x^2,
$$

maka untuk konteks bilangan real, setiap bilangan real dapat dimasukkan sebagai input. Jadi domain-nya dapat dianggap seluruh bilangan real.

Tetapi pada fungsi lain, konteks dapat membatasi input yang bermakna.

Contoh instructional:

$$
p(t)=3t+10
$$

dengan $t$ berarti waktu belajar dalam menit.

Secara aljabar, $t$ bisa saja bilangan negatif. Tetapi secara konteks, “durasi belajar $-15$ menit” tidak bermakna. Jadi domain kontekstual dapat berbeda dari domain aljabar paling luas.

## 4.3 Range

**Range** adalah kumpulan output yang benar-benar dapat dihasilkan dari input dalam domain.

Jika:

$$
f(x)=x^2
$$

dengan domain seluruh bilangan real, maka output tidak pernah negatif. Karena itu range-nya adalah nilai $f(x)\ge 0$.

### Math Reading Skill — membaca $f(x)=x^2$

**Simbol**

- $f$: nama fungsi;
- $x$: input;
- $x^2$: operasi “kuadratkan input”;
- $f(x)$: output.

**Input**

Nilai $x$ yang termasuk domain.

**Operasi**

Kalikan $x$ dengan dirinya sendiri.

**Output**

Nilai hasil kuadrat.

**Unit**

Tergantung konteks. Jika $x$ tidak memiliki unit, output juga tidak memiliki unit khusus. Jika $x$ punya unit, kuadrat dapat mengubah unit sehingga interpretasi harus dijelaskan.

**Asumsi**

Kita sedang membahas fungsi pada bilangan real dan hanya menggunakan input yang valid.

**Makna lokal/global**

Formula ini mendefinisikan hubungan pada seluruh domain, bukan hanya di satu titik.

**Tidak menyiratkan**

Fungsi $f(x)=x^2$ tidak otomatis menggambarkan sistem AI, probability, atau causal relationship. Ia hanyalah objek matematika sampai konteksnya didefinisikan.

---

# 5. NOTATION + FORMULA — Membaca $f(x)$ dengan Benar

Salah satu kesalahan umum adalah membaca $f(x)$ seperti perkalian $f\times x$.

Dalam konteks fungsi, $f(x)$ berarti:

> **nilai fungsi $f$ ketika input-nya $x$.**

Misalnya:

$$
f(x)=3x-2.
$$

Untuk mencari $f(4)$, kita mengganti setiap $x$ dengan $4$:

$$
f(4)=3(4)-2.
$$

Kemudian:

$$
f(4)=12-2=10.
$$

### Math Reading Skill — membaca $f(4)=10$

- input: $4$;
- fungsi: $f$;
- operasi: masukkan $4$ ke formula $3x-2$;
- output: $10$;
- makna: titik $(4,10)$ berada pada grafik fungsi;
- tidak menyiratkan: bahwa $4$ menyebabkan $10$ dalam arti causal dunia nyata. Itu hanya pemetaan yang didefinisikan oleh fungsi.

---

# 6. WORKED BASIC EXAMPLE — Dari Formula ke Tabel dan Grafik

Gunakan fungsi:

$$
g(x)=x^2-1.
$$

Kita evaluasi pada beberapa input.

### Langkah 1 — $x=-2$

$$
g(-2)=(-2)^2-1=4-1=3.
$$

### Langkah 2 — $x=-1$

$$
g(-1)=(-1)^2-1=1-1=0.
$$

### Langkah 3 — $x=0$

$$
g(0)=0^2-1=-1.
$$

### Langkah 4 — $x=1$

$$
g(1)=1^2-1=0.
$$

### Langkah 5 — $x=2$

$$
g(2)=2^2-1=3.
$$

Kita memperoleh:

| $x$ | $g(x)$ |
|---:|---:|
| -2 | 3 |
| -1 | 0 |
| 0 | -1 |
| 1 | 0 |
| 2 | 3 |

Dari tabel ini kita dapat memperkirakan bentuk grafik:

- nilai output turun saat bergerak dari $x=-2$ menuju $x=0$;
- nilai output mencapai $-1$ pada $x=0$;
- nilai output naik lagi setelah $x=0$.

Grafiknya berbentuk parabola.

Perhatikan: kita baru **membaca perilaku perubahan secara kualitatif**. Kita belum menghitung slope atau derivative.

---

# 7. WORKED HerAI EXAMPLE — Membaca Instructional Score sebagai Function

Kita mempertahankan running case yang sudah digunakan sebelumnya:

- Alya
- Bima
- Citra
- Dewi

Salah satu instructional score yang sudah dikunci adalah:

$$
h(q,c)=0.6q+0.4c.
$$

Di sini:

- $q$ = rasio quiz correct;
- $c$ = rasio completion;
- $h(q,c)$ = instructional weighted score;
- $0.6$ dan $0.4$ = bobot instructional yang sudah ditetapkan dalam running case.

Untuk Alya:

$$
q=0.80,
$$

$$
c=0.75.
$$

Masukkan keduanya ke fungsi:

$$
h(0.80,0.75)=0.6(0.80)+0.4(0.75).
$$

Hitung tiap bagian:

$$
0.6(0.80)=0.48,
$$

$$
0.4(0.75)=0.30.
$$

Sehingga:

$$
h(0.80,0.75)=0.78.
$$

### Apa yang baru saja kita lakukan?

Kita membaca $h$ sebagai fungsi dengan **dua input** dan satu output.

### Apa yang tidak boleh disimpulkan?

Nilai $0.78$ tidak otomatis berarti:

- peluang sukses Alya sebesar $78\%$;
- confidence model $78\%$;
- accuracy $78\%$;
- causal effect quiz/completion;
- recommendation produksi HerAI.

Nilai tersebut tetap **instructional score**.

Topik ini hanya memakai fungsi tersebut untuk mengaktifkan kembali literasi input → aturan → output. Partial derivative dan gradient dari fungsi ini baru akan dibahas pada topik yang memang dialokasikan untuk itu.

---

# 8. CHANGE ONE THING — Apa yang Terjadi Jika Input Diubah?

Kembali ke fungsi sederhana:

$$
f(x)=2x+1.
$$

Bandingkan:

$$
f(1)=3
$$

dan

$$
f(2)=5.
$$

Input naik dari $1$ menjadi $2$.
Output naik dari $3$ menjadi $5$.

Sekarang:

$$
f(3)=7.
$$

Terlihat pola:

- ketika input bertambah $1$;
- output bertambah $2$.

Ini adalah **observasi perubahan**.

Tetapi topik ini sengaja berhenti sebelum mendefinisikan slope secara formal.

Pertanyaan yang akan kita bawa ke Topic 02 adalah:

> Bagaimana kita mengukur perubahan output dibanding perubahan input secara sistematis?

---

# 9. MEMBACA GRAFIK FUNGSI

Grafik fungsi memberikan cara visual untuk melihat nilai output dan pola perubahan.

## 9.1 Membaca satu titik

Jika sebuah grafik melalui titik:

$$
(2,5),
$$

maka:

$$
f(2)=5.
$$

## 9.2 Membandingkan dua titik

Misalkan grafik juga melalui:

$$
(4,9).
$$

Kita dapat mengatakan:

- input berubah dari $2$ menjadi $4$;
- output berubah dari $5$ menjadi $9$.

Kita belum perlu menghitung rasio perubahan pada Topic 01. Yang penting sekarang adalah mampu mengidentifikasi **apa yang berubah**.

## 9.3 Grafik linear

Fungsi seperti:

$$
f(x)=2x+1
$$

menghasilkan garis lurus.

Karakteristik yang perlu dikenali:

- perubahan output terlihat konsisten untuk perubahan input yang sama;
- grafik tidak melengkung;
- arah garis dapat naik, turun, atau datar.

Istilah dan perhitungan slope formal akan menjadi fokus Topic 02.

## 9.4 Grafik kuadrat

Fungsi seperti:

$$
g(x)=x^2
$$

menghasilkan parabola.

Berbeda dari grafik linear:

- perubahan output tidak seragam di seluruh domain;
- bagian grafik dapat turun lalu naik;
- “seberapa curam” grafik dapat berbeda dari satu lokasi ke lokasi lain.

Perbedaan inilah yang nantinya membuat kita membutuhkan gagasan **local change** dan derivative.

---

# 10. WHY THIS MATTERS IN AI

Dalam AI dan machine learning, kita sering bekerja dengan transformasi input menjadi output.

Contoh konkret dari dokumentasi PyTorch adalah sebuah linear layer yang melakukan transformasi affine:

$$
\mathbf{y}=\mathbf{x}\mathbf{A}^{\top}+\mathbf{b}.
$$

Kita tidak perlu mempelajari layer tersebut secara detail di topik ini. Yang penting adalah pola matematikanya:

$$
\text{input} \longrightarrow \text{transformasi} \longrightarrow \text{output}.
$$

Hal yang sama berlaku ketika nanti kita membahas loss:

$$
\text{parameter} \longrightarrow \text{loss function} \longrightarrow \text{loss value}.
$$

Calculus kemudian bertanya bagaimana output seperti loss berubah ketika input atau parameter berubah.

Karena itu, kemampuan membaca fungsi dan grafik bukan materi terpisah dari AI. Ia adalah **bahasa dasar** yang nanti digunakan untuk memahami derivative, gradient, dan Optimization.

Tetapi hati-hati:

> hanya karena sesuatu dapat ditulis sebagai fungsi, bukan berarti fungsi itu otomatis merupakan model AI yang benar, probability, atau causal model.

---

# 11. MISCONCEPTION CHALLENGE

## Miskonsepsi 1 — “$f(x)$ berarti $f$ dikali $x$.”

**Salah.** Dalam function notation, $f(x)$ berarti nilai fungsi $f$ untuk input $x$.

## Miskonsepsi 2 — “Satu input boleh punya dua output dalam fungsi yang sama.”

**Salah.** Untuk fungsi, setiap input valid mempunyai tepat satu output.

## Miskonsepsi 3 — “Domain selalu seluruh bilangan real.”

**Salah.** Domain dapat dibatasi oleh formula maupun konteks.

## Miskonsepsi 4 — “Grafik hanya ilustrasi; formula adalah fungsi yang sebenarnya.”

**Salah.** Formula, tabel, pasangan koordinat, dan grafik dapat menjadi representasi dari hubungan fungsi yang sama.

## Miskonsepsi 5 — “Kalau output sebuah score bernilai 0.78, berarti probability-nya 78%.”

**Salah.** Semantik output harus ditentukan dari definisi sistem. Instructional score bukan probability hanya karena nilainya berada di antara 0 dan 1.

## Miskonsepsi 6 — “Kalau output naik saat input naik, berarti input menyebabkan output secara dunia nyata.”

**Salah.** Fungsi matematika menentukan pemetaan. Causal claim memerlukan dasar empiris dan asumsi tambahan yang tidak diberikan oleh formula itu sendiri.

---

# 12. TRY IT YOURSELF

Gunakan fungsi:

$$
r(x)=3x-1.
$$

Tanpa melihat jawaban terlebih dahulu:

1. Hitung $r(0)$.
2. Hitung $r(2)$.
3. Tuliskan dua titik yang sesuai pada grafik.
4. Ketika input berubah dari $0$ menjadi $2$, apakah output naik atau turun?
5. Apakah Anda sudah membutuhkan derivative untuk menjawab nomor 1–4?

### Cek singkat

$$
r(0)=-1,
$$

$$
r(2)=5.
$$

Titiknya adalah $(0,-1)$ dan $(2,5)$.
Output naik.

Kita belum membutuhkan derivative. Kita baru membaca fungsi dan perubahan output secara langsung.

---

# 13. VISUAL / INTERACTIVE SPEC

## [STATIC VISUAL] Input → Function → Output

**Learning purpose**  
Menguatkan pemetaan input → aturan → output sebelum peserta melihat grafik.

**Initial state**  
Fungsi $f(x)=2x+1$ dengan contoh input $x=2$.

**Learner action**  
Tidak ada; learner mengikuti alur visual.

**Expected behavior**  
Panah menunjukkan $2\to f(x)=2x+1\to5$.

**Feedback**  
Label eksplisit: “input”, “aturan fungsi”, “output”.

**Safety / interpretation note**  
Visual tidak menyiratkan causality; hanya memvisualisasikan mathematical mapping.

## [INTERACTIVE VISUAL] Function Value Explorer

**Learning purpose**  
Melihat bahwa perubahan input menghasilkan output baru sesuai aturan fungsi.

**Initial state**  
$f(x)=2x+1$, slider $x$ dari $-3$ sampai $5$.

**Learner action**  
Menggeser $x$.

**Expected behavior**  
Nilai $f(x)$ dan titik $(x,f(x))$ pada grafik berubah bersamaan.

**Feedback**  
UI menampilkan kalimat seperti: “Saat $x=3$, $f(3)=7$.”

**Safety / interpretation note**  
Jangan menampilkan slope/derivative pada visual ini; itu scope Topic 02–03.

## [COMPARE VIEW] Linear vs Quadratic

**Learning purpose**  
Membedakan perilaku grafik lurus dan grafik melengkung secara kualitatif.

**Initial state**  
Dua panel: $f(x)=x$ dan $g(x)=x^2$.

**Learner action**  
Memilih input yang sama pada kedua grafik.

**Expected behavior**  
Kedua panel menyorot titik output masing-masing.

**Feedback**  
Prompt: “Apakah perubahan output terlihat sama di setiap bagian grafik?”

**Safety / interpretation note**  
Belum gunakan istilah derivative; cukup “perubahan output tidak seragam”.

## [NUMBER MANIPULATOR] HerAI Instructional Score Reader

**Learning purpose**  
Mengaktifkan kembali fungsi dua input tanpa masuk partial derivative.

**Initial state**  
$h(q,c)=0.6q+0.4c$ dengan $q=0.80$, $c=0.75$.

**Learner action**  
Mengubah $q$ atau $c$ pada rentang instructional yang diberikan.

**Expected behavior**  
Score $h(q,c)$ dihitung ulang.

**Feedback**  
UI selalu menampilkan badge: “instructional score — bukan probability”.

**Safety / interpretation note**  
Tidak menampilkan causal language, partial derivative, atau gradient di Topic 01.

---

# 14. CHECKPOINT

Jawab tanpa kalkulator jika memungkinkan.

### Checkpoint 1

Jika:

$$
f(x)=x+4,
$$

berapa $f(3)$?

**Jawaban:** $7$.

### Checkpoint 2

Apa arti titik $(2,8)$ pada grafik $y=f(x)$?

**Jawaban:** $f(2)=8$.

### Checkpoint 3

Apakah tabel berikut dapat menjadi fungsi?

| $x$ | $y$ |
|---:|---:|
| 1 | 2 |
| 1 | 5 |

**Jawaban:** Tidak, karena input yang sama, $x=1$, memiliki dua output berbeda.

### Checkpoint 4

Apakah score $0.78$ dari $h(q,c)$ otomatis berarti probability $78\%$?

**Jawaban:** Tidak. Output harus dibaca sesuai semantik fungsi yang ditetapkan; $h$ adalah instructional score.

---

# 15. MASTERY CHECK — “I can...”

Sebelum lanjut, pastikan Anda dapat mengatakan:

- **I can** menjelaskan fungsi sebagai pemetaan input ke tepat satu output.
- **I can** membedakan domain dan range.
- **I can** mengevaluasi nilai fungsi sederhana.
- **I can** membaca titik pada grafik sebagai pasangan input-output.
- **I can** membedakan grafik linear dan kuadrat secara kualitatif.
- **I can** menjelaskan bahwa fungsi HerAI $h(q,c)$ adalah instructional score, bukan probability.
- **I can** melihat bahwa perubahan input menghasilkan perubahan output tanpa menyebutnya causal effect.
- **I can** menjelaskan mengapa graph literacy diperlukan sebelum mempelajari slope dan derivative.

Jika beberapa pernyataan masih terasa kabur, ulangi Worked Basic Example dan HerAI Example sebelum lanjut.

---

# 16. SCOPE BOUNDARY

Topik ini **sengaja tidak** mengajarkan:

- rumus slope $\Delta y/\Delta x$ sebagai computation requirement;
- secant line dan tangent line secara formal;
- limit;
- derivative notation $f'(x)$;
- differentiation rules;
- partial derivative;
- gradient;
- chain rule;
- Gradient Descent;
- learning rate;
- optimizer.

Topik ini juga tidak mengulang seluruh Mathematical Readiness. Function dan graph hanya diaktifkan kembali secukupnya untuk memasuki Calculus.

---

# 17. SUMMARY

Kita telah mengaktifkan kembali empat fondasi:

1. **Function** — setiap input valid memiliki tepat satu output.
2. **Domain** — input yang diizinkan atau bermakna.
3. **Range** — output yang dapat dihasilkan.
4. **Graph** — representasi visual pasangan input-output dan perilaku fungsi.

Kita juga melihat bahwa instructional score HerAI dapat dibaca sebagai fungsi dua input tanpa mengubah semantiknya menjadi probability atau causal model.

Yang paling penting untuk Calculus:

> fungsi memberi tahu kita **bagaimana output ditentukan dari input**; Calculus akan membantu kita memahami **bagaimana output berubah ketika input berubah**.

---

# 18. BRIDGE — Menuju Topic 02

Kita sudah dapat mengatakan:

- input berubah;
- output berubah;
- grafik dapat naik, turun, atau melengkung.

Tetapi kita belum memiliki ukuran formal untuk menjawab:

> **Seberapa besar perubahan output dibanding perubahan input?**

Pertanyaan itu membawa kita ke:

# Topic 02 — Slope dan Rate of Change

Di sana kita mulai dari perubahan dua titik dan membangun ukuran perubahan rata-rata sebelum masuk ke local change dan derivative.
