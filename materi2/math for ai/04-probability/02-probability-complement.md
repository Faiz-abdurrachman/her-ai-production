# Topic 02 — Probability dan Complement

> **Submodule 04 — Probability: Menalar Ketidakpastian dalam AI**  
> **Filename:** `02-probability-complement.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Prasyarat:** Topic 01 selesai; peserta dapat membedakan process/experiment, outcome, sample space $\Omega$, dan event $A$; peserta nyaman dengan pecahan, desimal, dan persentase  
> **Forward dependency:** Topic 03 — Joint, Union, dan Probability Table  
> **Boundary:** Topic ini memperkenalkan makna $P(A)$, rentang probabilitas, model finite yang outcomes-nya secara eksplisit equally likely, dan complement $A^c$. Topic ini **belum** membahas joint probability, intersection, union, conditional probability, independence, Bayes, random variable, expected value, calibration, logits, atau probabilistic loss.

---

# 1. Hook — Angka 0.80 Itu Sebenarnya Apa?

Di HerAI kita sudah pernah melihat angka seperti:

- quiz ratio Alya: $q=0.80$;
- instructional score Alya: $h=0.78$;
- instructional score Citra: $h=0.94$.

Semua angka itu berada di antara 0 dan 1.

Sekarang bayangkan ada pernyataan baru:

> “Dalam sebuah probability model yang sudah didefinisikan, event $A$ mempunyai probability $0.80$.”

Secara bentuk, ketiganya sama-sama berupa angka desimal. Tetapi secara **makna**, mereka tidak sama.

Angka $0.80$ dapat berarti:

- 8 jawaban benar dari 10 quiz items;
- 80% dari observed rows pada data tertentu memenuhi suatu label;
- sebuah score yang dibuat dengan rumus tertentu;
- probability yang **secara eksplisit** diberikan oleh sebuah probability model.

Range angka saja tidak menentukan maknanya.

Inilah fokus Topic 02:

> **Kapan sebuah angka benar-benar boleh dibaca sebagai probability, bagaimana kita mengecek nilainya, dan bagaimana kita menalar event “bukan $A$” melalui complement?**

MIT 18.05 menyatakan bahwa probability pada discrete setup harus berada di antara 0 dan 1, dan seluruh probability mass pada semua possible outcomes berjumlah 1. Materi yang sama juga menekankan bahwa outcomes tidak otomatis mempunyai probability yang sama. [R1]

---

# 2. Tujuan Topic 02

Setelah menyelesaikan topic ini, kamu diharapkan mampu mengatakan:

- **I can interpret** $P(A)$ sebagai probability yang diberikan kepada event $A$ dalam model/context yang sudah dinyatakan.
- **I can check** apakah candidate probability berada pada rentang yang valid.
- **I can explain** mengapa probability $0.80$ tidak berarti event pasti terjadi pada trial berikutnya.
- **I can compute** simple event probability dengan count ratio **hanya jika** finite outcomes secara eksplisit equally likely.
- **I can identify** complement $A^c$ sebagai event “bukan $A$”.
- **I can compute and interpret** $P(A^c)=1-P(A)$.
- **I can distinguish** observed proportion, ratio, model score, dan modeled probability meskipun nilai numeriknya sama.
- **I can diagnose** penggunaan asumsi equal likelihood yang tidak pernah dinyatakan.

---

# 3. Recall dari Topic 01 — Probability Harus Punya Object

Sebelum sebuah probability ditulis, kita perlu tahu:

1. process/experiment/context;
2. sample space $\Omega$;
3. event yang dimaksud.

Misalnya:

> Satu dadu enam sisi dilempar satu kali dan angka sisi atas dicatat.

Sample space:

$$
\Omega=\{1,2,3,4,5,6\}.
$$

Definisikan event:

> $A$: “angka yang muncul genap.”

Maka:

$$
A=\{2,4,6\}.
$$

Baru sekarang pertanyaan seperti

> “Berapa $P(A)$?”

mempunyai object yang cukup jelas.

Tetapi masih ada satu hal penting yang belum kita nyatakan:

> **Bagaimana probability dialokasikan ke outcomes dalam $\Omega$?**

Jika dadu dinyatakan fair, kita dapat memakai equal-likelihood model. Jika tidak, hanya menghitung jumlah outcomes belum cukup.

---

# 4. Predict — Sebelum Menghitung

Jawab secara intuitif dulu.

## Prediksi 1 — Valid atau Tidak?

Manakah yang **mungkin** menjadi sebuah probability?

- $-0.20$
- $0$
- $0.35$
- $1$
- $1.40$

Jangan hanya pilih. Tulis alasan singkat.

## Prediksi 2 — Apakah 0.80 Berarti Pasti?

Jika:

$$
P(A)=0.80,
$$

apakah event $A$ harus terjadi pada trial berikutnya?

Pilih salah satu:

- pasti terjadi;
- belum tentu terjadi;
- tidak mungkin terjadi.

## Prediksi 3 — Dua dari Empat Outcomes

Sebuah sample space mempunyai empat outcomes. Event $A$ berisi dua outcomes.

Apakah otomatis:

$$
P(A)=\frac{2}{4}?
$$

Tuliskan kondisi apa yang perlu diketahui sebelum menyimpulkan demikian.

---

# 5. Intuisi — Probability sebagai “Berat” dalam Model

Untuk beginner course ini, kita akan memakai language contract berikut:

> **Probability adalah nilai yang diberikan kepada outcome atau event dalam probability model/context yang sudah dinyatakan untuk merepresentasikan uncertainty.**

Kita tidak memaksakan satu philosophical interpretation sebagai satu-satunya interpretasi probability.

Dalam berbagai context, probability dapat muncul dari:

- model yang secara eksplisit diasumsikan;
- mekanisme random yang diketahui;
- estimation dari data;
- model machine learning yang memang dirancang menghasilkan predicted probability.

Tetapi di Topic 02 kita fokus pada **finite, explicit probability model**.

Bayangkan seluruh sample space memiliki total “probability mass” sebesar 1.

Setiap outcome atau event mendapatkan bagian dari total tersebut.

Karena sebuah bagian tidak masuk akal jika negatif dan tidak dapat melebihi seluruh total, probability berada pada rentang:

$$
0\le P(A)\le1.
$$

Interpretasi learner-facing:

- $P(A)=0$: model memberi event $A$ probability nol;
- $P(A)$ dekat 0: event diberi probability rendah dalam model;
- $P(A)$ dekat 1: event diberi probability tinggi dalam model;
- $P(A)=1$: model menempatkan seluruh probability mass pada event $A$.

**Penting:** nilai tinggi bukan janji bahwa event harus terjadi pada next trial.

---

# 6. Formal Definition — Apa Arti $P(A)$?

Misalkan:

- $\Omega$ adalah sample space;
- $A$ adalah event yang sudah didefinisikan dari $\Omega$.

Notation:

$$
P(A)
$$

dibaca:

> “probability dari event $A$.”

Dalam Topic 02, setiap kali menulis $P(A)$ kita harus bisa menjawab:

1. **Apa event $A$?**
2. **Apa sample space $\Omega$?**
3. **Probability ini berasal dari model/context apa?**
4. **Apakah probability outcome diberikan langsung, diasumsikan equally likely, atau berasal dari mekanisme lain?**
5. **Apa yang tidak boleh disimpulkan dari angka tersebut?**

MIT 18.05 menggunakan probability function untuk memberikan probability pada discrete outcomes dan mensyaratkan probability values berada di $[0,1]$ serta total probability semua outcomes sama dengan 1. [R1]

---

# 7. Math Reading Skill — Membaca Rentang Probability

Perhatikan:

$$
0\le P(A)\le1.
$$

Jangan hanya membaca “P A di antara nol dan satu”.

Baca lengkap:

- **$A$**: event yang telah didefinisikan;
- **$P(A)$**: probability yang diberikan kepada event $A$ dalam stated probability setup;
- **$0\le P(A)$**: probability tidak negatif;
- **$P(A)\le1$**: probability tidak melebihi total mass 1;
- **range**: nilai valid dari 0 sampai 1, termasuk kedua ujung;
- **unit**: probability tidak mempunyai unit fisik seperti menit atau kilogram;
- **percent form**: $0.80$ dapat ditulis sebagai 80%;
- **tidak berarti**: angka di $[0,1]$ otomatis probability;
- **tidak berarti**: $P(A)=0.80$ menjamin $A$ terjadi pada trial berikutnya.

### Quick check

Candidate berikut:

$$
P(A)=-0.1
$$

tidak valid karena berada di bawah 0.

Candidate:

$$
P(A)=1.2
$$

tidak valid karena melebihi 1.

Candidate:

$$
P(A)=0.62
$$

**berada pada range yang mungkin**, tetapi kita masih harus tahu apakah angka 0.62 memang didefinisikan sebagai probability. Range valid adalah syarat perlu, bukan bukti bahwa semantics-nya probability.

---

# 8. Total Probability 1 — “Sesuatu dari Sample Space Harus Terjadi”

Dalam finite model, seluruh possible outcomes yang membentuk sample space bersama-sama membawa total probability 1.

Secara learner-facing:

> Jika $\Omega$ sudah benar-benar memuat seluruh possible outcomes menurut setup, maka probability mass keseluruhan space adalah 1.

Kita tulis:

$$
P(\Omega)=1.
$$

Ini tidak berarti semua outcomes mempunyai probability sama.

Misalnya sebuah model mempunyai tiga outcomes:

- `ringan`: probability $0.20$;
- `sedang`: probability $0.50$;
- `tinggi`: probability $0.30$.

Totalnya:

$$
0.20+0.50+0.30=1.
$$

Outcomes berbeda boleh mempunyai probability berbeda.

**Equal likelihood adalah asumsi tambahan, bukan konsekuensi dari keberadaan sample space.**

---

# 9. Worked Example 1 — Basic: Fair Six-Sided Die

## 9.1 Setup

Process:

> Lempar satu fair six-sided die satu kali dan catat angka sisi atas.

Sample space:

$$
\Omega=\{1,2,3,4,5,6\}.
$$

Event:

> $A$: “angka genap.”

Maka:

$$
A=\{2,4,6\}.
$$

Karena dadu **secara eksplisit dinyatakan fair**, keenam outcomes diperlakukan equally likely.

## 9.2 Equal-likelihood count ratio

Untuk finite outcomes yang equally likely:

> probability event = jumlah outcomes yang memenuhi event dibagi jumlah seluruh outcomes.

Untuk event $A$:

- favorable outcomes: 3;
- total outcomes: 6.

Jadi:

$$
P(A)=\frac{3}{6}=0.5.
$$

Baca hasil:

> Dalam model fair-die ini, event “angka genap” diberi probability $0.5$.

Jangan baca:

> “Karena probability-nya 0.5, lemparan berikutnya pasti setengah genap.”

Satu trial hanya menghasilkan satu outcome.

---

# 10. Equal-Likelihood Safety — Kapan Count Ratio Boleh Dipakai?

Formula count ratio terasa sederhana, sehingga sering dipakai terlalu cepat.

Aturan course:

> **Jangan memakai “jumlah favorable outcomes / jumlah total outcomes” kecuali equal likelihood sudah dinyatakan atau dibenarkan oleh model.**

MIT memberi contoh dua dadu: jika outcome dicatat sebagai pasangan hasil dua fair dice, 36 pasangan dapat equally likely; tetapi jika output dicatat sebagai **jumlah** dua dice, outcomes 2 sampai 12 **tidak** equally likely. [R1]

Contoh singkat:

Sample space:

$$
\Omega=\{\text{alpha},\text{beta},\text{gamma},\text{delta}\}.
$$

Misalkan event:

$$
A=\{\text{gamma},\text{delta}\}.
$$

Jika probabilities outcome adalah:

| Outcome | Modeled probability |
|---|---:|
| alpha | 0.10 |
| beta | 0.20 |
| gamma | 0.30 |
| delta | 0.40 |

Event berisi 2 dari 4 outcomes, tetapi probability event bukan otomatis $2/4$.

Probability mass event berasal dari outcomes `gamma` dan `delta`:

$$
P(A)=0.30+0.40=0.70.
$$

Pelajaran utama:

> **Count outcomes hanya cukup jika probability setiap outcome memang sama.**

---

# 11. Complement — Event “Bukan $A$”

Setelah kita punya event $A$, complement adalah event yang berisi semua outcomes dalam $\Omega$ yang **tidak** berada di $A$.

Notation canonical:

$$
A^c.
$$

Dibaca:

> “A complement” atau “komplemen A”.

Jika:

$$
\Omega=\{1,2,3,4,5,6\}
$$

dan:

$$
A=\{2,4,6\},
$$

maka complement-nya:

$$
A^c=\{1,3,5\}.
$$

$A$ dan $A^c$ bersama-sama mencakup seluruh sample space.

Karena total probability adalah 1:

$$
P(A^c)=1-P(A).
$$

MIT menjelaskan complement rule dengan ide bahwa $A$ dan $A^c$ membagi sample space menjadi dua region yang tidak overlap dan bersama-sama mempunyai total probability 1. [R1]

---

# 12. Math Reading Skill — Membaca Complement Formula

Perhatikan:

$$
P(A^c)=1-P(A).
$$

Baca langkah demi langkah:

- **$A$**: event yang kita minati;
- **$A^c$**: semua outcomes dalam $\Omega$ yang bukan anggota $A$;
- **$P(A)$**: probability event $A$;
- **$P(A^c)$**: probability event “bukan $A$”;
- **$1$**: total probability sample space;
- **operation**: subtract probability mass milik $A$ dari total 1;
- **result**: remaining probability mass milik complement.

Formula ini **tidak** mengatakan bahwa semua event selain $A$ adalah satu event terpisah yang “berlawanan secara makna”. Ia hanya mengatakan complement berisi semua outcomes yang bukan anggota $A$.

---

# 13. Worked Example 2 — Complement Tanpa Equal-Likelihood Counting

Misalkan sebuah explicitly stated probability model untuk satu status proses mempunyai event:

> $A$: “review diperlukan.”

Model memberi:

$$
P(A)=0.35.
$$

Kita ingin probability:

> “review tidak diperlukan.”

Itulah complement $A^c$.

Gunakan:

$$
P(A^c)=1-P(A).
$$

Substitusi:

$$
P(A^c)=1-0.35=0.65.
$$

Interpretasi:

> Dalam model yang dinyatakan, probability event “review tidak diperlukan” adalah $0.65$.

Perhatikan: kita tidak perlu menghitung jumlah outcomes. Probability $P(A)$ sudah diberikan oleh model.

---

# 14. HerAI Continuity — Same Number, Different Semantics

Sekarang kembali ke canonical HerAI data.

| Participant | Quiz ratio $q$ | Completion ratio $c$ | Instructional score $h(q,c)$ |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 0.78 |
| Bima | 0.60 | 0.625 | 0.61 |
| Citra | 0.90 | 1.00 | 0.94 |
| Dewi | 0.70 | 0.50 | 0.62 |

Dengan:

$$
h(q,c)=0.6q+0.4c.
$$

Semua values tersebut berada dalam $[0,1]$.

Tetapi:

- $q$ adalah quiz performance ratio;
- $c$ adalah completion ratio;
- $h$ adalah instructional weighted score;
- tidak ada satu pun yang otomatis menjadi probability.

Contoh claim yang **tidak aman**:

> “Karena Alya punya $q=0.80$, probability Alya sukses pada sesi berikutnya adalah 80%.”

Data yang tersedia tidak mendefinisikan probability model seperti itu.

Claim yang benar:

> “Alya menjawab 8 dari 10 quiz items dengan benar pada observed data yang digunakan, sehingga quiz ratio-nya $0.80$.”

Ini adalah Statistik/deskripsi observed performance, bukan automatic future-event probability.

---

# 15. Worked HerAI / AI Example — Hypothetical Probability Model

> **HYPOTHETICAL / SYNTHETIC INSTRUCTIONAL MODEL — BUKAN DATA PESERTA NYATA**

HerAI mempunyai sebuah practice randomizer untuk satu future practice session.

Unit:

> satu randomizer draw sebelum session dimulai.

System design menetapkan bahwa randomizer memilih **tepat satu** dari lima card types dengan **equal probability**:

$$
\Omega
=
\{
\text{konsep},
\text{contoh},
\text{latihan\_ringan},
\text{latihan\_tantangan},
\text{refleksi}
\}.
$$

Equal likelihood di sini adalah **stipulated design assumption** untuk contoh, bukan hasil estimasi dari Alya/Bima/Citra/Dewi.

Definisikan event:

> $A$: “card yang terpilih adalah card latihan.”

Maka:

$$
A=
\{
\text{latihan\_ringan},
\text{latihan\_tantangan}
\}.
$$

Karena ada 5 equally likely outcomes dan 2 di antaranya memenuhi event $A$:

$$
P(A)=\frac{2}{5}=0.40.
$$

Complement:

> $A^c$: “card yang terpilih bukan card latihan.”

Sehingga:

$$
P(A^c)=1-0.40=0.60.
$$

Interpretasi yang aman:

> Dalam synthetic randomizer model ini, probability memilih card latihan adalah $0.40$, dan probability memilih card non-latihan adalah $0.60$.

Interpretasi yang tidak aman:

> “40% peserta HerAI akan membutuhkan latihan.”

Model ini tidak berbicara tentang kebutuhan peserta. Ia hanya berbicara tentang output randomizer.

---

# 16. Change One Thing — Equal Likelihood Dihapus

Kita pertahankan **sample space dan event yang sama**, tetapi ubah model.

Sekarang probability outcome ditetapkan:

| Card type | Modeled probability |
|---|---:|
| konsep | 0.15 |
| contoh | 0.20 |
| latihan_ringan | 0.25 |
| latihan_tantangan | 0.35 |
| refleksi | 0.05 |

Total:

$$
0.15+0.20+0.25+0.35+0.05=1.
$$

Event $A$ tetap:

> card latihan.

Karena outcomes tidak equally likely, kita **tidak** memakai:

$$
\frac{2}{5}.
$$

Kita jumlahkan probability mass dari dua outcomes yang masuk event:

$$
P(A)=0.25+0.35=0.60.
$$

Complement:

$$
P(A^c)=1-0.60=0.40.
$$

### Apa yang berubah?

- $\Omega$ tidak berubah;
- definisi event $A$ tidak berubah;
- probability model berubah;
- karena itu $P(A)$ berubah.

Ini menunjukkan bahwa:

> **event structure dan probability assignment adalah dua lapisan yang berbeda.**

---

# 17. Probability 0.80 Tidak Berarti “Pasti Terjadi”

Misalkan suatu stated model mempunyai:

$$
P(A)=0.80.
$$

Apa artinya?

Beginner-safe reading:

> Model memberikan probability tinggi, yaitu $0.80$, kepada event $A$.

Apa yang **tidak** boleh disimpulkan?

- event $A$ pasti terjadi pada next trial;
- 8 dari setiap 10 consecutive trials harus selalu menghasilkan $A$ secara exact;
- setiap individual case dengan probability 0.80 “80% terjadi” secara literal;
- angka 0.80 otomatis calibrated predicted probability dari AI.

Probability merepresentasikan uncertainty dalam defined model. Satu realization tetap dapat menghasilkan $A$ atau $A^c$.

---

# 18. Observed Relative Frequency vs Modeled Probability

Kita perlu menjaga jembatan dari Submodule Statistics.

## Observed relative frequency

Misalkan dari 20 historical sessions, 14 berakhir dengan status tertentu.

Observed relative frequency:

$$
\frac{14}{20}=0.70.
$$

Pernyataan yang aman:

> “Pada 20 observed sessions ini, 70% mempunyai status tersebut.”

## Modeled probability

Pernyataan:

$$
P(A)=0.70
$$

memerlukan setup probability yang mendefinisikan event $A$ dan alasan/model yang memberi probability 0.70.

Angka numeriknya dapat sama, tetapi semantics berbeda.

Observed relative frequency **dapat** digunakan dalam proses estimation/modeling pada konteks yang tepat, tetapi Topic 02 tidak mengajarkan bahwa satu observed proportion otomatis merupakan universal future probability.

OpenStax menggunakan long-run relative-frequency language sebagai salah satu framing probability, tetapi HerAI sengaja tidak menjadikannya satu-satunya definisi universal. Di course ini, kita selalu meminta **defined event + stated probabilistic context/model** sebelum memakai probability language. [R2]

---

# 19. Why This Matters in AI

AI systems sering menghasilkan angka.

Contoh bentuk output:

- similarity score;
- ranking score;
- anomaly score;
- margin;
- confidence-like score;
- predicted probability.

Masalah muncul ketika semua angka antara 0 dan 1 langsung disebut probability.

Topic 02 memberi safety test awal:

### Sebelum menyebut angka sebagai probability, tanyakan:

1. Apa event/target yang probabilitasinya dibicarakan?
2. Apa context/model yang mendefinisikan probability itu?
3. Apakah output memang dirancang untuk mempunyai probabilistic semantics?
4. Apakah angka hanya score atau ratio?
5. Apakah ada evaluation yang diperlukan sebelum menyebutnya calibrated?

Pertanyaan terakhir baru akan dibahas penuh di Topic 08.

Untuk sekarang, aturan aman:

> **Range $[0,1]$ tidak cukup untuk mengubah score menjadi probability.**

---

# 20. Misconception Challenge

Nilai setiap statement sebagai **aman** atau **bermasalah**, lalu jelaskan.

## Claim 1

> “Nilai 0.94 pasti probability karena berada di antara 0 dan 1.”

**Bermasalah.** Range valid tidak menentukan semantics. Citra mempunyai instructional score 0.94, bukan automatic probability.

## Claim 2

> “Jika $P(A)=0.8$, event $A$ pasti terjadi pada next trial.”

**Bermasalah.** Probability tinggi bukan guarantee single realization.

## Claim 3

> “Kalau event memuat 3 dari 6 outcomes, probability-nya selalu 0.5.”

**Bermasalah.** Hanya aman jika 6 outcomes equally likely.

## Claim 4

> “Jika $P(A)=0.35$, maka probability ‘bukan $A$’ adalah 0.65.”

**Aman**, jika $A^c$ benar-benar complement $A$ dalam sample space yang sama.

## Claim 5

> “Alya mempunyai $q=0.80$, jadi $P(\text{sukses next session})=0.80$.”

**Bermasalah.** Quiz ratio observed tidak otomatis menjadi probability model untuk future success.

---

# 21. Try It Yourself

## Task A — Range

Tentukan mana yang dapat menjadi candidate probability:

$$
-0.02,\quad0,\quad0.27,\quad1,\quad1.03.
$$

Jelaskan mengapa “dapat menjadi candidate” belum sama dengan “pasti probability”.

## Task B — Equal likelihood

Satu fair spinner mempunyai 8 equal sectors bernomor 1 sampai 8.

Event $A$:

> hasil lebih dari 5.

1. tuliskan outcomes dalam $A$;
2. hitung $P(A)$;
3. tentukan $P(A^c)$;
4. interpretasikan keduanya dengan satu kalimat.

## Task C — Semantics

Bandingkan:

- observed completion ratio $c=0.75$;
- stated model probability $P(A)=0.75$.

Tuliskan perbedaan makna meskipun angka sama.

---

# 22. Visual / Interactive Spec

## [NUMBER MANIPULATOR] Probability + Complement

### Purpose

Membantu learner melihat bahwa probability event dan complement berbagi total probability mass 1, sekaligus menanamkan bahwa probability tinggi tidak sama dengan guarantee.

### Initial state / data

Synthetic model dengan satu defined event $A$.

Initial value:

$$
P(A)=0.40.
$$

System menampilkan dua regions:

- $A$: 0.40;
- $A^c$: 0.60.

Total label:

$$
P(A)+P(A^c)=1.
$$

Semua values diberi badge:

> **STIPULATED MODEL PROBABILITY — NOT OBSERVED HERAI DATA**

### Learner action

Learner menggeser slider $P(A)$ dari 0 sampai 1.

Contoh checkpoints:

- 0;
- 0.25;
- 0.50;
- 0.80;
- 1.

### Expected behavior

Saat learner mengubah $P(A)$:

$$
P(A^c)=1-P(A)
$$

ter-update secara real time.

Ketika $P(A)=0.80$, interface tetap menunjukkan dua possible regions $A$ dan $A^c$; $A^c$ tidak hilang hanya karena probability-nya lebih kecil.

### Feedback

Jika learner mencoba memasukkan:

- negative value;
- value greater than 1;

system menolak input dan menjelaskan valid range.

Jika learner memilih statement:

> “$P(A)=0.8$ berarti $A$ pasti terjadi next trial,”

system memberi feedback:

> “Tidak. 0.8 adalah probability dalam stated model, bukan guarantee satu realization.”

### Safety / interpretation note

Visual tidak boleh menampilkan canonical Alya/Bima/Citra/Dewi score sebagai probability.

Visual harus menyatakan bahwa slider value adalah **modeled probability yang ditetapkan untuk exercise**, bukan estimate dari participant data.

---

# 23. Checkpoint

Jawab tanpa melihat bagian sebelumnya.

1. Apa arti $P(A)$?
2. Apa rentang valid probability?
3. Mengapa angka 0.62 belum otomatis probability?
4. Kapan count ratio “favorable / total” aman dipakai?
5. Apa arti $A^c$?
6. Jika $P(A)=0.72$, berapa $P(A^c)$?
7. Apakah $P(A)=0.9$ menjamin event terjadi next trial?
8. Mengapa $q=0.80$ milik Alya tidak boleh langsung dibaca sebagai future-success probability?

### Checkpoint answer

1. Probability yang diberikan kepada event $A$ dalam stated probability context/model.
2. Dari 0 sampai 1, inclusive.
3. Karena range tidak menentukan semantics angka.
4. Saat finite outcomes secara eksplisit equally likely.
5. Event “bukan $A$” dalam sample space yang sama.
6. $0.28$.
7. Tidak.
8. Karena $q$ adalah observed quiz ratio, bukan probability model untuk future event.

---

# 24. Mastery Check — “I Can...”

Sebelum lanjut, cek apakah kamu sudah bisa mengatakan:

- [ ] I can define event $A$ sebelum membaca $P(A)$.
- [ ] I can explain why $0\le P(A)\le1$.
- [ ] I can reject negative probability atau probability lebih dari 1.
- [ ] I can explain why a number in $[0,1]$ is not automatically probability.
- [ ] I can use favorable/total counting only when outcomes are explicitly equally likely.
- [ ] I can explain that unequal-likelihood outcomes require probability assignments, not simple counting.
- [ ] I can identify complement $A^c$.
- [ ] I can compute $P(A^c)=1-P(A)$.
- [ ] I can distinguish observed ratio, instructional score, and modeled probability.
- [ ] I can explain why probability 0.8 is not a guarantee of the next outcome.

Jika beberapa item belum yakin, ulangi sections 10–18 sebelum lanjut.

---

# 25. Scope Boundary — Apa yang Sengaja Belum Kita Masuki?

Topic 02 **belum** membahas:

- intersection atau “$A$ dan $B$” secara formal;
- union atau “$A$ atau $B$” secara formal;
- joint probability;
- two-way probability table;
- addition rule untuk overlapping events;
- conditional probability;
- independence/dependence;
- Bayes;
- random variable;
- expected value;
- predicted-probability calibration;
- logits, sigmoid, softmax;
- cross-entropy.

Kita juga belum melakukan:

- proof axiomatic probability;
- law-of-large-numbers derivation;
- continuous probability density;
- combinatorics berat.

Ini disengaja agar learner benar-benar stabil pada:

> **defined event → probability semantics → valid range → equal-likelihood safety → complement**

sebelum menggabungkan beberapa events.

---

# 26. Summary

Topic 02 membangun lima gagasan utama.

## 1. Probability mempunyai object dan context

Notation:

$$
P(A)
$$

hanya meaningful jika event $A$ dan probabilistic setup sudah didefinisikan.

## 2. Probability berada pada rentang 0 sampai 1

$$
0\le P(A)\le1.
$$

Tetapi angka dalam range tersebut **tidak otomatis probability**.

## 3. Total probability sample space adalah 1

$$
P(\Omega)=1.
$$

Ini tidak berarti semua outcomes equally likely.

## 4. Count ratio memerlukan equal-likelihood assumption

Favorable-outcome counting aman hanya ketika outcomes memang equally likely dalam stated finite model.

## 5. Complement mengisi probability mass yang tersisa

$$
P(A^c)=1-P(A).
$$

Complement adalah event “bukan $A$”.

Dan boundary HerAI tetap:

> quiz ratio, completion ratio, dan instructional weighted score bukan automatic probabilities.

---

# 27. Bridge to Topic 03 — Apa Jika Ada Dua Events?

Sekarang kita sudah dapat menalar:

- satu event $A$;
- probability $P(A)$;
- complement $A^c$.

Tetapi AI/data scenarios sering mempunyai **dua conditions sekaligus**.

Misalnya:

- event $A$: session selesai;
- event $B$: hint digunakan.

Pertanyaan baru muncul:

- bagaimana jika keduanya dapat terjadi pada session yang sama?
- apa arti “$A$ dan $B$”?
- apa arti “$A$ atau $B$”?
- jika kita menambahkan probability dua events, apakah ada bagian yang terhitung dua kali?

Itulah fokus berikutnya:

> **Topic 03 — Joint, Union, dan Probability Table**

Topic 02 berhenti di sini.

---

# References

Lihat `referensi-topic-02.md` untuk verified source ledger dan source-to-claim mapping.

**[R1]** MIT OpenCourseWare, 18.05, *Probability: Terminology and Examples*.  
**[R2]** OpenStax, *Introductory Statistics*, §3.1 Terminology.
