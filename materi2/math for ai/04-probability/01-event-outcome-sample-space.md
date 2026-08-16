# Topic 01 — Event, Outcome, dan Sample Space

> **Submodule 04 — Probability: Menalar Ketidakpastian dalam AI**  
> **Filename:** `01-event-outcome-sample-space.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Prasyarat:** Submodule 01–03 sudah selesai; peserta familiar dengan observation, variable/feature, categorical/numerical semantics, ratio, observed frequency, dan empirical distribution  
> **Forward dependency:** Topic 02 — Probability dan Complement  
> **Boundary:** Topic ini hanya membangun objek dasar reasoning probabilitas: process/experiment/context, outcome, sample space, dan event. Topic ini **belum** menghitung $P(A)$, complement, intersection, union, conditional probability, independence, Bayes, random variable, expected value, calibration, atau probabilistic loss.

---

# 1. Mengapa Kita Tidak Langsung Menghitung Probabilitas?

Bayangkan seseorang berkata:

> “Peluang suksesnya tinggi.”

Kalimat itu terdengar seperti pernyataan probabilitas, tetapi ada beberapa pertanyaan yang belum dijawab:

- **Sukses yang dimaksud apa?**
- **Sukses untuk siapa atau untuk unit apa?**
- **Dalam proses apa hasil itu diamati?**
- **Hasil lain yang mungkin terjadi apa saja?**
- **Kapan sebuah hasil dianggap masuk kategori sukses?**

Tanpa jawaban tersebut, angka probabilitas—bahkan jika nanti diberikan—belum punya objek yang jelas.

Probability reasoning yang rapi tidak dimulai dari rumus. Kita mulai dengan mendefinisikan **apa yang sedang terjadi** dan **apa saja hasil yang mungkin**.

MIT 18.05 memperkenalkan probability terminology dengan urutan yang sama: sebuah experiment/process mempunyai possible outcomes; kumpulan seluruh possible outcomes membentuk sample space; dan event merupakan kumpulan outcomes dari sample space tersebut. MIT juga menekankan bahwa untuk satu setup dapat ada lebih dari satu sample space yang masuk akal, tergantung apa yang dipilih untuk dicatat. [R1]

Topic 01 akan membangun fondasi itu.

---

# 2. Tujuan Topic 01

Setelah menyelesaikan topic ini, kamu diharapkan mampu mengatakan:

- **I can identify** process/experiment, outcome, sample space, dan event dalam scenario sederhana.
- **I can distinguish** satu outcome dari event yang dapat berisi satu atau beberapa outcomes.
- **I can construct** finite sample space yang sesuai dengan apa yang dicatat.
- **I can explain** bahwa sample space bergantung pada definisi process dan output yang direkam.
- **I can diagnose** sample space yang terlalu sempit, terlalu luas, ambigu, atau mencampur beberapa aturan pencatatan.
- **I can distinguish** observed dataset dari probability experiment/model.
- **I can explain** mengapa quiz ratio, completion ratio, dan instructional score HerAI tidak otomatis menjadi probability.

---

# 3. Prerequisite Recall — Apa yang Sudah Kita Bawa dari Statistics?

Pada Submodule 03, kita membaca data yang **sudah diamati**.

Canonical HerAI cohort tetap:

| Participant | Quiz correct | Quiz total | Completion done | Completion total | Study duration |
|---|---:|---:|---:|---:|---:|
| Alya | 8 | 10 | 6 | 8 | 45 min |
| Bima | 6 | 10 | 5 | 8 | 30 min |
| Citra | 9 | 10 | 8 | 8 | 55 min |
| Dewi | 7 | 10 | 4 | 8 | 40 min |

Derived ratios:

$$
q=[0.80,\;0.60,\;0.90,\;0.70]
$$

$$
c=[0.75,\;0.625,\;1.00,\;0.50]
$$

Kita juga pernah memakai instructional weighted score:

$$
h(q,c)=0.6q+0.4c.
$$

Nilainya:

- Alya: $0.78$;
- Bima: $0.61$;
- Citra: $0.94$;
- Dewi: $0.62$.

Semua nilai di atas adalah **historical observed data atau derived instructional scores**.

Mereka **bukan otomatis**:

- outcome dari probability experiment;
- sample space;
- probability;
- predicted probability;
- calibrated probability;
- confidence;
- accuracy.

Ini adalah jembatan penting dari Statistics ke Probability: **deskripsi data yang sudah kita lihat tidak otomatis menjadi model tentang apa yang mungkin terjadi berikutnya.**

---

# 4. Hook — “Empat Peserta Berarti Empat Outcome?”

Perhatikan empat participant canonical:

- Alya;
- Bima;
- Citra;
- Dewi.

Seseorang berkata:

> “Karena ada empat participant, sample space Probability kita adalah Alya, Bima, Citra, dan Dewi.”

Apakah pernyataan itu selalu benar?

Belum tentu.

Daftar participant baru menjadi sample space jika kita **mendefinisikan process** yang memang menghasilkan salah satu nama tersebut sebagai outcome. Misalnya:

> “Pilih secara acak tepat satu participant dari empat participant tersebut dan catat namanya.”

Dalam process itu, nama participant memang dapat menjadi outcomes.

Tetapi jika pertanyaannya adalah:

> “Apa status akhir satu future learning session?”

maka Alya, Bima, Citra, dan Dewi bukan lagi daftar outcomes yang tepat.

**Pelajaran pertama:** sample space tidak ditentukan hanya oleh data yang kebetulan tersedia. Sample space ditentukan oleh **process dan apa yang kita putuskan untuk dicatat sebagai hasil**.

---

# 5. Predict — Sebelum Definisi Formal

Jangan langsung menghafal istilah. Buat prediksi dulu.

## Prediksi 1 — Dadu

Satu dadu enam sisi dilempar satu kali dan kita mencatat angka sisi atas.

Mana yang paling masuk akal sebagai seluruh hasil yang mungkin?

A. hanya angka yang benar-benar keluar setelah dilempar  
B. $\{1,2,3,4,5,6\}$  
C. “angka genap”  
D. probability masing-masing angka

Simpan jawabanmu.

## Prediksi 2 — Event atau Outcome?

Untuk process yang sama, “hasilnya angka genap” lebih tepat disebut:

- satu outcome; atau
- kumpulan beberapa outcomes?

## Prediksi 3 — HerAI

Dataset canonical memiliki empat rows.

Apakah empat rows tersebut otomatis menjadi sample space untuk pertanyaan “status akhir satu future learning session”?

Tuliskan satu kalimat alasan.

---

# 6. Intuisi — Empat Lapisan yang Harus Dipisahkan

Kita akan memakai empat lapisan:

1. **Process / experiment / context** — apa yang dilakukan atau diamati?
2. **Outcome** — satu hasil spesifik yang mungkin keluar dari process itu.
3. **Sample space** — kumpulan seluruh outcomes yang relevan menurut aturan pencatatan.
4. **Event** — satu kondisi yang berisi satu atau beberapa outcomes dari sample space.

Bayangkan sebuah kamera yang merekam satu process.

- Process menjelaskan **adegan apa yang sedang direkam**.
- Outcome adalah **satu frame hasil akhir tertentu**.
- Sample space adalah **daftar semua hasil akhir yang kita izinkan menurut definisi**.
- Event adalah **filter yang memilih outcomes tertentu dari daftar tersebut**.

Analogi ini membantu, tetapi definisi formal tetap penting agar kita tidak mencampur istilah.

---

# 7. Explore Small Data — Contoh Dasar Tanpa Menghitung Probability

Kita mulai dengan contoh paling kecil.

## Process

Lempar satu dadu enam sisi satu kali dan **catat angka sisi atas**.

## Possible outcomes

Hasil yang mungkin adalah:

$$
1,\;2,\;3,\;4,\;5,\;6.
$$

Jika lemparan nyata menghasilkan angka $4$, maka:

- **observed outcome** untuk trial tersebut adalah $4$;
- tetapi outcomes lain tetap **possible outcomes** sebelum trial dilakukan.

## Sample space

Kumpulan seluruh possible outcomes yang kita catat adalah:

$$
\Omega=\{1,2,3,4,5,6\}.
$$

## Event

Misalkan kita tertarik pada kondisi:

> “angka yang muncul adalah genap.”

Kondisi ini mencakup tiga outcomes:

$$
A=\{2,4,6\}.
$$

Perhatikan:

- $4$ dapat menjadi **satu outcome**;
- $A=\{2,4,6\}$ adalah **event**;
- $\Omega=\{1,2,3,4,5,6\}$ adalah **sample space**.

Kita **belum perlu** mengatakan berapa probability event $A$.

Bahkan kita belum perlu mengasumsikan dadu itu fair untuk membedakan outcome, sample space, dan event.

---

# 8. Formal Definition — Dari Bahasa Biasa ke Bahasa Probability

## 8.1 Process / experiment / context

Dalam course ini, **process/experiment/context** adalah prosedur atau situasi yang didefinisikan sehingga kita tahu:

- unit apa yang diamati;
- kapan process dimulai dan berakhir;
- apa yang dicatat sebagai hasil;
- possible outcomes apa yang relevan.

MIT mendeskripsikan experiment sebagai procedure dengan well-defined possible outcomes. [R1]

Untuk learner beginner, kata **process** dan **experiment** boleh muncul bersama. Fokusnya bukan pada eksperimen laboratorium, tetapi pada **aturan yang membuat outcome dapat didefinisikan**.

## 8.2 Outcome

**Outcome** adalah **satu hasil spesifik** yang mungkin dihasilkan oleh process yang sudah didefinisikan.

OpenStax juga menggunakan outcome sebagai result dari suatu experiment. [R2]

Contoh:

- dadu menghasilkan $4$;
- status session adalah `selesai_dengan_bantuan`;
- sistem mencatat `offline`.

## 8.3 Sample space

**Sample space** atau **ruang sampel** adalah kumpulan seluruh possible outcomes yang sesuai dengan process dan aturan pencatatan yang sedang digunakan. [R1][R2]

Course ini memakai simbol:

$$
\Omega
$$

untuk sample space.

Simbol $\Omega$ dibaca **“omega”**.

Contoh:

$$
\Omega=\{1,2,3,4,5,6\}.
$$

Artinya: untuk process lempar satu dadu dan catat angka sisi atas, seluruh outcomes yang sedang kita modelkan adalah $1$ sampai $6$.

## 8.4 Event

**Event** atau **kejadian** adalah kumpulan outcomes dari sample space yang memenuhi suatu kondisi tertentu. MIT memformalkannya sebagai subset dari sample space. [R1]

Pada Topic 01, kita belum perlu menekankan simbol subset. Yang penting adalah memahami hubungan:

> event mengambil outcomes **dari dalam** sample space.

Contoh:

$$
A=\{2,4,6\}
$$

untuk event “angka genap”.

Event dapat berisi:

- satu outcome;
- beberapa outcomes;
- bahkan seluruh outcomes, tergantung definisinya.

Tetapi **event bukan sinonim untuk satu outcome**.

---

# 9. Math Reading Skill — Cara Membaca Notasi Topic 01

Topic ini hanya membutuhkan notasi yang sedikit.

## 9.1 Membaca sample space

$$
\Omega=\{1,2,3,4,5,6\}
$$

Baca sebagai:

> “Ruang sampel omega berisi outcomes 1, 2, 3, 4, 5, dan 6.”

### Apa arti simbolnya?

- $\Omega$: nama sample space;
- $=$: “didefinisikan sebagai / sama dengan” dalam konteks ini;
- $\{\;\}$: braces yang mengelompokkan anggota sebuah set;
- angka di dalam braces: outcomes yang mungkin menurut aturan pencatatan.

### Apa yang tidak dikatakan notasi ini?

Notasi tersebut **tidak** mengatakan:

- outcome mana yang lebih mungkin;
- apakah semua outcome equally likely;
- probability setiap outcome;
- outcome mana yang benar-benar akan terjadi.

## 9.2 Membaca event

$$
A=\{2,4,6\}
$$

Baca sebagai:

> “Event $A$ berisi outcomes 2, 4, dan 6.”

Jika process-nya dadu dan event-nya “angka genap”, maka daftar tersebut menjelaskan outcome mana yang memenuhi kondisi event.

### Math-reading checkpoint

Jika kamu melihat:

$$
B=\{5,6\}
$$

jangan langsung bertanya “berapa probability $B$?”.

Pertanyaan pertama adalah:

> “Process dan sample space-nya apa, serta apa arti event $B$?”

---

# 10. Worked Example 1 — Satu Process, Dua Event

## Scenario

Sebuah quality-check tool menghasilkan tepat satu status akhir setelah satu pemeriksaan:

- `lolos`;
- `perlu_review`;
- `gagal`.

Tidak ada probability yang diberikan. Kita hanya mengorganisasi possible outcomes.

## Langkah 1 — Definisikan process

Process:

> jalankan satu quality check dan catat **status akhir**.

## Langkah 2 — Identifikasi outcomes

Possible outcomes:

- `lolos`;
- `perlu_review`;
- `gagal`.

## Langkah 3 — Bangun sample space

$$
\Omega=\{\text{lolos},\;\text{perlu\_review},\;\text{gagal}\}.
$$

## Langkah 4 — Definisikan event

Misalkan event $A$ adalah:

> “hasil membutuhkan tindak lanjut.”

Maka:

$$
A=\{\text{perlu\_review},\;\text{gagal}\}.
$$

Misalkan event $B$ adalah:

> “hasil langsung lolos.”

Maka:

$$
B=\{\text{lolos}\}.
$$

## Interpretasi

- `lolos` adalah satu outcome;
- $B$ adalah event yang kebetulan hanya berisi satu outcome;
- $A$ adalah event yang berisi dua outcomes;
- $\Omega$ berisi semua possible outcomes yang didefinisikan untuk process tersebut.

**Tidak ada alasan untuk menganggap ketiga outcomes equally likely.** Topic 01 belum membahas probability assignment.

---

# 11. Worked Example 2 — HerAI: Observed Data vs Hypothetical Probability Process

Bagian ini penting karena HerAI sudah mempunyai canonical historical data.

## 11.1 Canonical observed data — tidak diubah

Alya, Bima, Citra, dan Dewi adalah empat participant yang sudah muncul sejak submodule sebelumnya.

Data mereka adalah **observed historical records**.

Kita tidak akan mengubah:

- quiz ratio;
- completion ratio;
- study duration;
- instructional score.

Kita juga tidak akan menyebut empat participant tersebut sebagai “empat outcomes yang equally likely” tanpa process pemilihan yang eksplisit.

## 11.2 Supplementary hypothetical HerAI process

> **[HYPOTHETICAL / SYNTHETIC INSTRUCTIONAL SCENARIO]**  
> Scenario berikut dibuat khusus untuk belajar struktur probability. Ia **bukan** data production HerAI dan tidak mengubah canonical participant data.

### Unit

Satu **future HerAI learning session** setelah participant menekan tombol `Mulai` pada sebuah materi.

### Process

Amati session tersebut selama maksimum 30 menit dan catat **tepat satu status akhir** menurut aturan berikut:

- `selesai_mandiri`: participant mencapai akhir materi tanpa memakai hint;
- `selesai_dengan_bantuan`: participant mencapai akhir materi setelah memakai minimal satu hint;
- `belum_selesai`: participant belum mencapai akhir materi saat batas 30 menit tercapai.

Definisi ini sengaja dibuat agar setiap session yang masuk process memperoleh tepat satu label akhir.

### Outcome

Jika satu session tertentu berakhir dengan `selesai_dengan_bantuan`, maka itu adalah **satu observed outcome** untuk session tersebut.

### Sample space

Seluruh outcomes yang mungkin menurut aturan pencatatan adalah:

$$
\Omega
=
\{\text{selesai\_mandiri},\;\text{selesai\_dengan\_bantuan},\;\text{belum\_selesai}\}.
$$

### Event

Misalkan event $A$ adalah:

> “materi selesai dalam 30 menit.”

Maka event tersebut berisi dua outcomes:

$$
A
=
\{\text{selesai\_mandiri},\;\text{selesai\_dengan\_bantuan}\}.
$$

### Apa yang belum boleh kita katakan?

Dari definisi di atas, kita **belum** tahu:

- probability `selesai_mandiri`;
- probability event $A$;
- apakah outcomes equally likely;
- probability Alya/Bima/Citra/Dewi akan sukses;
- apakah historical completion ratio dapat dipakai sebagai probability future session.

Kita baru membangun **bahasa dan objek** yang nantinya dapat diberi probabilistic model.

---

# 12. Change One Thing — Apa yang Terjadi Jika Aturan Pencatatan Diubah?

Gunakan hypothetical HerAI process yang sama.

Awalnya kita mencatat tiga status:

$$
\Omega
=
\{\text{selesai\_mandiri},\;\text{selesai\_dengan\_bantuan},\;\text{belum\_selesai}\}.
$$

Sekarang ubah **satu hal**:

> sistem tidak lagi membedakan apakah participant memakai hint. Sistem hanya mencatat `selesai` atau `belum_selesai`.

Sample space baru menjadi:

$$
\Omega'
=
\{\text{selesai},\;\text{belum\_selesai}\}.
$$

Perhatikan sesuatu yang penting.

Real-world session yang mendasari bisa saja sama, tetapi **representation of outcome** berubah karena aturan pencatatannya berubah.

MIT menunjukkan ide sejenis ketika dua dadu dapat dicatat sebagai pasangan angka atau sebagai jumlah kedua angka; pilihan sample space bergantung pada context dan apa yang direkam. [R1]

## Pertanyaan sensitivitas

Apa yang berubah?

- label outcomes;
- jumlah outcomes yang dibedakan;
- sample space;
- bentuk event yang dapat kita tulis.

Apa yang tidak otomatis berubah?

- real-world session yang sebenarnya terjadi.

**Lesson:** sample space adalah bagian dari model/representation terhadap process, bukan copy mentah dari realitas.

---

# 13. Sample Space Harus Sesuai Pertanyaan

Sample space yang baik bukan sekadar “daftar sebanyak mungkin hal”.

Ia harus **selaras dengan apa yang dicatat**.

## Terlalu sempit

Process:

> catat status akhir session: selesai mandiri, selesai dengan bantuan, atau belum selesai.

Candidate sample space:

$$
\{\text{selesai\_mandiri},\;\text{belum\_selesai}\}
$$

Masalah: outcome `selesai_dengan_bantuan` hilang.

## Terlalu luas / mencampur semantics

Candidate sample space:

$$
\{\text{selesai\_mandiri},\;\text{selesai\_dengan\_bantuan},\;\text{belum\_selesai},\;45\text{ menit},\;\text{Alya}\}
$$

Masalah: daftar ini mencampur:

- status akhir;
- duration;
- participant identity.

Itu tiga jenis output berbeda.

Sample space boleh kompleks, tetapi complexity harus datang dari **defined output**, bukan dari mencampur field tanpa aturan.

## Ambigu

Candidate outcome: `selesai`.

Pertanyaan yang harus dijawab:

- selesai dalam berapa lama?;
- apakah menggunakan hint tetap dihitung selesai?;
- apakah session yang di-resume setelah 30 menit termasuk?;

Jika aturan tidak jelas, dua orang dapat membangun sample space berbeda dari scenario yang sama.

---

# 14. Mengapa Ini Penting dalam AI?

AI sering menghasilkan atau mengonsumsi statement seperti:

- “probability user akan klik”;
- “probability transaksi fraud”;
- “probability learner akan menyelesaikan modul”;
- “probability label adalah kelas A.”

Tetapi setiap statement membutuhkan event/target yang jelas.

Contoh:

> “Learner akan menyelesaikan materi.”

Belum cukup.

Kita perlu bertanya:

- unit-nya participant, session, atau enrollment?;
- horizon waktunya 30 menit, 24 jam, atau 7 hari?;
- “selesai” berarti membuka halaman terakhir, menyelesaikan quiz, atau mencapai mastery threshold?;
- apakah withdraw dan timeout adalah outcomes yang dibedakan?;

Jika target event kabur, model yang sangat canggih pun dapat menghasilkan angka yang **sulit diinterpretasikan**.

Topic 01 mengajarkan kebiasaan sebelum modeling:

> **Define the process. Define the possible outcomes. Define the event. Baru kemudian bicara probability.**

---

# 15. Misconception Challenge

## Misconception 1 — “Dataset adalah sample space”

**Claim:**

> “Empat rows Alya, Bima, Citra, Dewi adalah sample space Probability HerAI.”

**Diagnosis:** tidak otomatis.

Rows tersebut adalah observed data. Mereka hanya menjadi outcomes jika process yang didefinisikan memang menghasilkan salah satu participant identity sebagai output, misalnya random selection of one participant.

---

## Misconception 2 — “Outcome dan event sama”

**Claim:**

> “Event angka genap adalah outcome $2$.”

**Diagnosis:** keliru.

Untuk dadu:

$$
A=\{2,4,6\}
$$

adalah event “angka genap”. Angka $2$ hanyalah salah satu outcome di dalam event.

---

## Misconception 3 — “Semua outcome harus equally likely”

**Claim:**

> “Kalau ada tiga outcomes, berarti masing-masing punya chance yang sama.”

**Diagnosis:** tidak didukung.

Jumlah outcomes tidak memberi tahu probability masing-masing. MIT secara eksplisit menunjukkan sample spaces yang outcomes-nya tidak equally likely. [R1]

Topic 01 bahkan belum menetapkan probability assignment.

---

## Misconception 4 — “Kalau event sudah diberi nama, otomatis probability-nya diketahui”

**Claim:**

> “Event $A$ sudah didefinisikan, jadi kita pasti bisa langsung menghitung $P(A)$.”

**Diagnosis:** belum tentu.

Mendefinisikan event memberi tahu **outcomes mana yang termasuk**. Untuk menghitung probability, kita masih membutuhkan probability setup/model yang sesuai. Itu masuk Topic 02.

---

## Misconception 5 — “Angka 0.80 pada HerAI pasti probability”

Quiz ratio Alya:

$$
q=0.80
$$

berarti $8$ jawaban benar dari $10$ quiz items pada observed data.

Itu bukan otomatis probability future success.

Demikian pula instructional score Citra $0.94$ bukan otomatis “94% chance”.

---

# 16. Try It Yourself

Jangan hitung probability. Fokus pada struktur.

## Mini Task A

Process:

> Sistem mengirim satu undangan sesi dan setelah 24 jam mencatat final response sebagai `diterima`, `ditolak`, atau `tidak_ada_respons`.

Jawab:

1. Apa unit process-nya?
2. Sebutkan satu possible outcome.
3. Tuliskan sample space.
4. Definisikan event $A$: “ada respons eksplisit”.

## Mini Task B

Candidate sample space:

$$
\{\text{dibuka},\;\text{ditolak}\}.
$$

Apakah sudah complete untuk process di atas?

Jika belum, jelaskan outcome yang hilang.

## Mini Task C

Ubah aturan pencatatan menjadi hanya:

- `ada_respons`;
- `tidak_ada_respons`.

Apa yang berubah pada sample space?

---

# 17. Visual / Interactive Specification

## [INTERACTIVE VISUAL] Outcome–Sample Space–Event Selector

**Learning purpose**  
Membantu learner membedakan process, individual outcome, sample space, dan event tanpa harus menghitung probability.

**Initial state / data**  
Gunakan scenario hypothetical HerAI Topic 01:

- process: satu future learning session setelah tombol `Mulai`, diamati maksimal 30 menit;
- outcomes: `selesai_mandiri`, `selesai_dengan_bantuan`, `belum_selesai`;
- event $A$: “materi selesai dalam 30 menit”.

**Learner action**  
Learner melakukan tiga tahap:

1. memilih cards yang termasuk possible outcomes untuk membangun $\Omega$;
2. memilih satu card untuk melihat contoh **individual outcome**;
3. memilih outcomes yang memenuhi kondisi event $A$.

**Expected behavior**  
- panel `Sample Space` hanya menerima tiga valid status akhir;
- setelah $\Omega$ complete, learner dapat menyorot satu outcome;
- event $A$ menyorot `selesai_mandiri` dan `selesai_dengan_bantuan` tanpa mengubah $\Omega$;
- toggle `Catat hanya selesai/belum selesai` mengubah representation menjadi sample space baru $\Omega'$.

**Feedback**  
- jika learner memasukkan `Alya`, tampilkan feedback: “Alya adalah participant identity pada canonical observed data; process ini mencatat status session, bukan nama participant.”
- jika learner hanya memilih satu dari tiga possible status, tampilkan: “Sample space belum complete menurut aturan pencatatan.”
- jika learner menganggap event $A$ sebagai seluruh $\Omega$, minta membaca kembali kondisi event.

**Safety / interpretation note**  
Visual **tidak menampilkan probability bar, persentase, atau equal-size likelihood encoding**. Ukuran cards tidak boleh memberi kesan outcomes equally likely. Canonical HerAI participant data tidak diubah dan tidak dipakai untuk membuat probability estimate.

---

# 18. Checkpoint — Bisa Bedakan Keempatnya?

Gunakan scenario:

> satu future learning session dicatat sebagai `selesai_mandiri`, `selesai_dengan_bantuan`, atau `belum_selesai`.

Cocokkan:

| Object | Contoh |
|---|---|
| Process | amati satu future session maksimal 30 menit dan catat status akhir |
| Outcome | `selesai_dengan_bantuan` |
| Sample space | seluruh tiga status yang didefinisikan |
| Event $A$ | dua outcomes yang berarti materi selesai |

Jika kamu masih tertukar antara outcome dan event, kembali ke Worked Example 1.

---

# 19. Mastery Check

Sebelum lanjut, pastikan kamu dapat menyatakan dengan bahasamu sendiri:

- **I can identify** apa process/experiment yang sedang dibahas.
- **I can name** satu outcome tanpa menyebut seluruh sample space.
- **I can construct** sample space yang complete sesuai aturan pencatatan.
- **I can define** event sebagai kumpulan outcomes yang memenuhi sebuah kondisi.
- **I can explain** bahwa sample space dapat berubah ketika output yang dicatat berubah.
- **I can reject** claim bahwa semua outcomes otomatis equally likely.
- **I can reject** claim bahwa canonical rows HerAI otomatis merupakan probability sample space.
- **I can reject** claim bahwa $q=0.80$ atau score $0.94$ otomatis merupakan probability.

Jika salah satu poin masih belum jelas, jangan buru-buru masuk rumus.

---

# 20. Scope Boundary — Apa yang Sengaja Belum Kita Pelajari?

Topic 01 sengaja **tidak** mengajarkan:

- probability value $P(A)$ secara computational;
- range probability;
- complement $A^c$;
- intersection $A\cap B$;
- union $A\cup B$;
- conditional probability;
- independence/dependence;
- Bayes;
- random variable;
- probability distribution;
- expected value;
- model-predicted probability;
- calibration;
- logits;
- cross-entropy.

Kita juga tidak masuk ke:

- heavy combinatorics;
- continuous sample-space calculus;
- measure theory;
- formal axiomatic proofs.

Boundary ini bukan karena konsep-konsep tersebut tidak penting. Mereka ditunda agar setiap layer mempunyai prerequisite yang jelas.

---

# 21. Summary

Topic 01 dapat diringkas sebagai chain berikut:

**Process / experiment**  
menentukan apa yang dilakukan atau diamati

↓

**Outcome**  
adalah satu hasil spesifik yang mungkin

↓

**Sample space $\Omega$**  
adalah kumpulan seluruh possible outcomes menurut aturan pencatatan

↓

**Event $A$**  
adalah kumpulan outcomes dari sample space yang memenuhi kondisi tertentu

Empat safety rule utama:

1. observed dataset **tidak otomatis** sample space;
2. outcome **tidak sama** dengan event;
3. outcomes **tidak otomatis equally likely**;
4. event yang sudah didefinisikan **belum otomatis memiliki probability yang diketahui**.

---

# 22. Bridge to Topic 02 — Probability dan Complement

Sekarang kita sudah dapat mengatakan dengan jelas:

- process apa yang dibahas;
- possible outcomes apa saja;
- sample space-nya apa;
- event mana yang ingin kita perhatikan.

Pertanyaan berikutnya baru menjadi meaningful:

> **Bagaimana sebuah probability model memberi nilai probabilitas kepada event yang sudah didefinisikan?**

Pada Topic 02 kita akan mulai membaca probability value dan complement dengan hati-hati—tanpa mengubah quiz ratio atau instructional score menjadi probability secara sembarangan.

---

# Referensi Ringkas Topic 01

- **[R1]** MIT OpenCourseWare, Jeremy Orloff & Jonathan Bloom, *Probability: Terminology and Examples*, 18.05 Introduction to Probability and Statistics, Spring 2022.
- **[R2]** OpenStax, Barbara Illowsky & Susan Dean, *Introductory Statistics*, Section 3.1 — Terminology.

Ledger verifikasi lengkap tersedia di `referensi-topic-01.md`.
