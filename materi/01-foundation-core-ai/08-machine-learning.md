# Machine Learning

> Ekspor lengkap dari sumber materi HerAI yang tersedia di repository.
> Mencakup materi, latihan, kuis, diskusi, pembahasan, versi legacy, dan/atau data interaktif bila tersedia.

## Pengantar Machine Learning

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-1.html`

Chapter 1

#### Pengantar Machine Learning

Machine Learning adalah cara membuat sistem yang belajar pola dari data, lalu memakai pola itu untuk memprediksi, mengelompokkan, atau mengambil keputusan pada data baru.

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Membedakan pemrograman rule-based dan Machine Learning.
-   **Menjelaskan supervised, unsupervised, dan reinforcement learning.
-   **Membaca istilah dasar seperti fitur, label, model, hipotesis, dan generalisasi.

Why it matters

##### Kenapa ML penting di AI?

AI modern jarang hanya berisi aturan manual. Sistem rekomendasi, filter spam, deteksi fraud, computer vision, dan NLP membutuhkan model yang bisa menemukan pola dari contoh. ML menjadi jembatan antara data mentah dan keputusan yang adaptif.

**Data** Contoh historis: input, label, perilaku, teks, gambar, transaksi.

**

**Learning** Algoritma mencari pola yang menurunkan error pada contoh data.

**

**Prediction** Model memberi output untuk data baru yang belum pernah dilihat.

Core idea

##### Rule-based vs Machine Learning

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Pendekatan
Cara kerja
Cocok saat
Risiko</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Rule-based
Developer menulis aturan eksplisit, misalnya if nominal &gt; 10 juta maka review manual.
Aturannya stabil, jelas, dan mudah diaudit.
Rapuh saat pola berubah atau kombinasinya terlalu banyak.</td>
<td align="left">Machine Learning
Model belajar dari contoh data untuk menemukan pola yang tidak mudah ditulis manual.
Ada data historis dan pola bisa berubah.
Butuh evaluasi, data bersih, dan kontrol bias.</td>
</tr>
</tbody>
</table>

Analogy

##### Analogi belajar dari contoh

Bayangkan kamu mengajari teman membedakan email spam. Cara rule-based adalah memberi daftar aturan tetap. Cara ML adalah memberi banyak contoh email spam dan non-spam, lalu temanmu belajar pola seperti kata tertentu, link mencurigakan, atau pengirim tidak dikenal.

**

##### Supervised

Belajar dari data berlabel. Contoh: email ini spam atau bukan spam.

`input x -> label y`

**

##### Unsupervised

Mencari struktur tanpa label. Contoh: segmentasi pelanggan dari pola belanja.

`input x -> struktur`

**

##### Reinforcement

Agen belajar dari reward dan konsekuensi aksi. Contoh: strategi game atau robot navigasi.

`aksi -> reward`

Formula

##### Bahasa dasar model

`x in R^n`

**Feature vector.** Satu data direpresentasikan sebagai kumpulan angka. Jika n = 5, berarti ada 5 fitur, misalnya umur akun, jumlah klik, durasi belajar, nilai latihan, dan jumlah diskusi.

`h: X -> Y`

**Hypothesis.** Model belajar fungsi yang memetakan input X menjadi output Y. Pada klasifikasi, Y bisa berupa kelas; pada regresi, Y berupa angka.

`generalization = performa pada data baru`

**Generalisasi.** Tujuan ML bukan menghafal data train, tetapi membuat prediksi yang tetap bagus pada data yang belum pernah dilihat.

Real examples

##### Contoh penggunaan nyata

**Rekomendasi belajar**

Model mempelajari minat, progres, dan performa peserta untuk menyarankan materi berikutnya.

**Deteksi fraud**

Model melihat kombinasi nominal, lokasi, jam, dan riwayat transaksi untuk menandai risiko.

**Computer vision**

Model mengenali pola piksel untuk klasifikasi gambar, deteksi objek, atau inspeksi kualitas.

Mini checkpoint

##### Jawab sebentar

Jika aturan bisnisnya stabil dan bisa ditulis jelas, apakah kamu tetap perlu ML? Jelaskan satu alasan pro dan satu alasan kontra.

Common mistakes

##### Kesalahan yang sering terjadi

-   **Menganggap ML selalu lebih baik dari aturan sederhana.
-   **Melatih model tanpa mendefinisikan target dan metrik sukses.
-   **Mengira akurasi train tinggi otomatis berarti model siap dipakai.

Summary

##### Ringkasan

Machine Learning dipakai saat sistem perlu belajar pola dari data. Fondasinya adalah fitur, label, hipotesis, model, dan generalisasi. Di chapter berikutnya, kamu akan masuk ke supervised learning secara lebih sistematis.

[Lanjut ke Supervised Learning **](#/participant-ai-lab-ml-supervised)

## Supervised Learning

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-2.html`

Chapter 2

#### Supervised Learning

Supervised learning melatih model dari pasangan input dan label. Model belajar hubungan antara fitur dan jawaban benar, lalu memprediksi label untuk data baru.

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Menyusun komponen supervised learning: data, model, loss, dan optimisasi.
-   **Menjelaskan empirical risk dan kenapa model perlu validation set.
-   **Membedakan model generative, discriminative, parametric, non-parametric, linear, dan non-linear.

Why it matters

##### Kenapa supervised learning jadi fondasi?

Banyak masalah AI dimulai dari contoh berlabel: prediksi kelulusan, klasifikasi spam, estimasi harga, deteksi penyakit, atau prediksi churn. Jika labelnya jelas, supervised learning memberi cara terukur untuk belajar dari histori.

**Model H** Kumpulan fungsi kandidat, misalnya semua garis linear atau semua pohon keputusan.

**

**Loss function** Mengukur selisih prediksi dengan label benar.

**

**Optimization** Mencari parameter yang membuat loss sekecil mungkin.

Core idea

##### Dari data ke hipotesis

`D = {(x_i, y_i)} from i=1..N`

**Dataset berlabel.** Setiap contoh memiliki input x dan label y. Untuk prediksi harga, x adalah fitur rumah dan y adalah harga aktual.

`h_theta(x) = y_hat`

**Model berparameter.** Theta adalah nilai yang dipelajari, misalnya bobot dalam regresi linear atau neural network.

`empirical risk = (1/N) sum L(h(x_i), y_i)`

**Risk pada data train.** Ini rata-rata loss pada contoh training. Nilai rendah penting, tetapi belum cukup untuk memastikan generalisasi.

Analogy

##### Analogi guru dan latihan soal

Supervised learning seperti belajar dari buku soal yang punya kunci jawaban. Kamu mengerjakan soal, membandingkan dengan kunci, memperbaiki strategi, lalu diuji pada soal baru. Jika hanya menghafal soal latihan, kamu gagal saat variasi soal berubah.

**Train** Dipakai untuk belajar parameter model.

**Validation** Dipakai untuk memilih model dan hyperparameter.

**Test** Dipakai sekali untuk estimasi performa final.

Model selection

##### Memilih model tanpa menipu diri sendiri

Jika kamu mencoba banyak model dan memilih yang paling bagus di test set, test set berubah menjadi validation set tersembunyi. Karena itu, pisahkan data untuk training, validation, dan test. Pada data kecil, gunakan cross validation.

Fold 1 validasi Fold 2 train Fold 3 train Fold 4 train Fold 5 train

Model families

##### Cara membaca keluarga model

**

###### Generative vs discriminative

Generative mencoba memahami cara data tiap kelas terbentuk, seperti Naive Bayes. Discriminative langsung belajar batas keputusan atau probabilitas kelas, seperti logistic regression.

**

###### Parametric vs non-parametric

Parametric punya jumlah parameter tetap, misalnya linear regression. Non-parametric lebih fleksibel terhadap data, misalnya k-NN atau decision tree.

**

###### Linear vs non-linear

Linear memakai batas sederhana seperti garis atau hyperplane. Non-linear bisa menangkap pola melengkung dan interaksi fitur yang kompleks.

**

###### Bias, variance, dan no free lunch

Tidak ada model yang selalu menang. Model sederhana bisa underfit; model kompleks bisa overfit. Pilihan terbaik bergantung data, target, dan constraint produk.

Mini checkpoint

##### Jawab sebentar

Kamu punya dataset 1.000 peserta dengan label "selesai tepat waktu" atau "tidak". Sebutkan 3 fitur, 1 loss yang mungkin, dan 1 metrik evaluasi yang masuk akal.

Common mistakes

##### Kesalahan yang sering terjadi

-   **Melakukan tuning berulang di test set.
-   **Menggunakan fitur yang bocor dari masa depan, misalnya status kelulusan sebagai input prediksi kelulusan.
-   **Memilih model hanya dari akurasi tanpa melihat biaya salah prediksi.

Summary

##### Ringkasan

Supervised learning membutuhkan input, label, model, loss, dan proses optimisasi. Validasi yang benar menjaga model tetap jujur pada data baru. Berikutnya, kamu akan membedah regresi dan klasifikasi dasar.

[Lanjut ke Regresi & Klasifikasi **](#/participant-ai-lab-ml-regression-classification)

## Regresi & Klasifikasi Dasar

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-3.html`

Chapter 3

#### Regresi & Klasifikasi Dasar

Regresi memprediksi angka kontinu, sedangkan klasifikasi memprediksi kategori. Dua bentuk ini menjadi pintu masuk untuk membaca banyak algoritma ML klasik.

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Membedakan regresi dan klasifikasi dari tipe targetnya.
-   **Menjelaskan intuisi linear regression, decision tree, random forest, boosting, dan k-NN.
-   **Membaca overfitting, underfitting, dan pilihan metrik evaluasi dasar.

Why it matters

##### Kenapa chapter ini penting?

Sebelum masuk model probabilistik, SVM, dan neural network, kamu perlu kuat di dua pertanyaan praktis: output yang diprediksi angka atau kelas? Lalu algoritma apa yang paling masuk akal untuk data dan kebutuhan interpretasi?

**

##### Regresi

Target berupa angka kontinu: harga rumah, suhu besok, estimasi durasi pengerjaan, atau nilai penjualan.

`y_hat = angka`

**

##### Klasifikasi

Target berupa kelas: spam/non-spam, lulus/tidak, fraud/aman, atau kategori sentimen.

`y_hat = kelas`

Formula

##### Regresi linear dan least squares

`y_hat = w^T x + w0`

**Prediksi linear.** Model menjumlahkan fitur yang diberi bobot. Bobot positif menaikkan prediksi, bobot negatif menurunkan prediksi.

`residual = y - y_hat`

**Residual.** Selisih antara nilai aktual dan prediksi. Residual besar berarti model masih jauh dari jawaban benar.

`min sum (y_i - y_hat_i)^2`

**Least squares.** Training mencari bobot yang membuat total error kuadrat sekecil mungkin. Error kuadrat memberi penalti besar untuk prediksi yang sangat meleset.

Analogy

##### Analogi garis dan aturan bertanya

Linear regression seperti menarik garis terbaik di tengah titik data. Decision tree seperti permainan dua puluh pertanyaan: apakah usia akun lebih dari 30 hari? apakah progres modul di bawah 50%? Jawaban dari pertanyaan bertingkat menentukan prediksi.

###### Decision Tree

Membagi data berdasarkan pertanyaan fitur. Split dipilih dengan ukuran seperti Information Gain atau Gini.

###### Random Forest

Menggabungkan banyak tree dari sampel dan fitur berbeda. Bagging membantu menurunkan variance.

###### Boosting

Membangun model bertahap untuk memperbaiki error model sebelumnya. Contoh populer: XGBoost dan LightGBM.

k-NN

##### Belajar dari tetangga terdekat

k-Nearest Neighbors menyimpan data training dan memprediksi data baru dari k tetangga terdekat. Ia disebut lazy learning karena tidak banyak membangun model saat training.

**

###### Jarak

Euclidean cocok untuk jarak lurus di ruang fitur. Manhattan cocok saat jarak dihitung per langkah fitur. Skala fitur harus dinormalisasi agar satu fitur tidak mendominasi.

**

###### Curse of dimensionality

Saat jumlah fitur terlalu banyak, konsep "dekat" menjadi kurang bermakna. k-NN bisa lambat karena prediksi perlu membandingkan data baru dengan banyak contoh.

Evaluation

##### Overfitting, underfitting, dan metrik

###### Underfitting

Train rendah, test rendah

Model terlalu sederhana atau fitur kurang informatif.

###### Overfitting

Train tinggi, test rendah

Model menghafal noise dan gagal generalisasi.

###### Good fit

Train dan test stabil

Model cukup belajar pola tanpa terlalu menghafal.

**Pred PositifPred Negatif** **Aktual PositifTPFN** **Aktual NegatifFPTN**

**Accuracy**Proporsi prediksi benar. Bisa menipu pada data imbalanced.

**Precision**Dari yang diprediksi positif, berapa yang benar positif.

**Recall**Dari semua aktual positif, berapa yang berhasil ditemukan.

**F1-score**Rata-rata harmonik precision dan recall.

Mini checkpoint

##### Jawab sebentar

Untuk prediksi harga kos, apakah targetnya regresi atau klasifikasi? Untuk deteksi spam, metrik mana yang akan kamu cek selain accuracy?

Common mistakes

##### Kesalahan yang sering terjadi

-   **Memakai accuracy pada data sangat tidak seimbang tanpa melihat precision, recall, atau F1.
-   **Memakai k-NN tanpa scaling fitur.
-   **Menganggap model kompleks selalu lebih baik dari baseline linear atau tree sederhana.

Summary

##### Ringkasan

Regresi memprediksi angka, klasifikasi memprediksi kelas. Linear model, tree-based model, boosting, dan k-NN punya kekuatan dan risiko masing-masing. Evaluasi perlu membaca gap train-test dan metrik yang sesuai masalah.

[Lanjut ke Probabilistic Models **](#/participant-ai-lab-ml-probabilistic)

## Probabilistic Models

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-4.html`

Chapter 4

#### Probabilistic Models

Probabilistic models melihat prediksi sebagai ketidakpastian yang bisa dihitung. Alih-alih hanya memberi kelas, model dapat berkata "kemungkinan kelas A lebih besar daripada kelas B".

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Membaca konsep probability, expectation, variance, dan independence dalam konteks ML.
-   **Menjelaskan Bayes theorem, MLE, Naive Bayes, dan Laplace smoothing.
-   **Memahami kapan Bayesian Network berguna untuk relasi antar variabel.

Why it matters

##### Kenapa probabilitas penting?

Data dunia nyata penuh ketidakpastian. Email dengan kata "gratis" belum tentu spam. Gejala tertentu belum tentu penyakit tertentu. Probabilistic models membantu model menyatakan tingkat keyakinan dan menggabungkan bukti.

**

##### Probability

Ukuran peluang sebuah kejadian terjadi, dari 0 sampai 1.

**

##### Expectation & variance

Expectation membaca nilai rata-rata jangka panjang; variance membaca sebaran atau ketidakstabilan.

**

##### Independence

Dua variabel independen jika mengetahui satu variabel tidak mengubah peluang variabel lain.

Formula

##### Bayes theorem dan Naive Bayes

`P(A|B) = P(B|A) P(A) / P(B)`

**Bayes theorem.** Mengubah prior belief P(A) menjadi posterior P(A|B) setelah melihat bukti B.

`argmax_c P(c) product_j P(x_j|c)`

**Naive Bayes.** Pilih kelas c yang paling mungkin berdasarkan prior kelas dan peluang tiap fitur pada kelas tersebut.

`P(word|class) = (count + alpha) / (total + alpha V)`

**Laplace smoothing.** Mencegah peluang menjadi nol saat kata tertentu belum pernah muncul pada kelas tertentu.

Analogy

##### Analogi detektif

Seorang detektif tidak langsung menyimpulkan. Ia mulai dari dugaan awal, lalu memperbarui keyakinan setelah melihat bukti. Naive Bayes melakukan hal serupa: prior kelas diperbarui oleh bukti fitur, meski dengan asumsi fitur saling independen dalam kelas.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Konsep
Makna manusiawi
Contoh spam filter</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Prior
Keyakinan sebelum melihat isi email.
30% email historis adalah spam.</td>
<td align="left">Likelihood
Seberapa cocok bukti dengan kelas tertentu.
Kata &quot;hadiah&quot; sering muncul di email spam.</td>
<td align="left">Posterior
Keyakinan setelah bukti digabungkan.
Email ini 86% mungkin spam.</td>
</tr>
</tbody>
</table>

Real examples

##### Contoh penggunaan nyata

**Text classification**

Naive Bayes sering menjadi baseline kuat untuk spam detection dan klasifikasi dokumen.

**Medical triage**

Probabilitas membantu membaca risiko berdasarkan gejala, usia, dan histori.

**Risk scoring**

Model probabilistik dapat memberi skor risiko alih-alih keputusan hitam-putih.

Bayesian Network

##### Relasi antar variabel

Bayesian Network memakai Directed Acyclic Graph (DAG) untuk memodelkan ketergantungan antar variabel. Ini berguna saat kamu ingin menyatakan struktur sebab-akibat atau dependensi yang lebih eksplisit daripada asumsi Naive Bayes.

**Cause** Contoh: kondisi cuaca.

**

**Evidence** Contoh: jalan basah, keterlambatan.

**

**Belief update** Model memperbarui probabilitas kejadian terkait.

Mini checkpoint

##### Jawab sebentar

Naive Bayes mengasumsikan fitur independen dalam kelas. Menurutmu, kenapa asumsi yang tidak selalu realistis ini masih bisa bekerja baik untuk klasifikasi teks?

Common mistakes

##### Kesalahan yang sering terjadi

-   **Membaca probabilitas model sebagai kepastian mutlak.
-   **Lupa smoothing sehingga satu kata yang tidak pernah muncul membuat peluang kelas menjadi nol.
-   **Mengabaikan calibration saat probabilitas dipakai untuk keputusan berisiko tinggi.

Summary

##### Ringkasan

Probabilistic models membantu AI bekerja dengan ketidakpastian. Bayes theorem menggabungkan prior dan bukti, Naive Bayes memberi baseline cepat, dan Bayesian Network memperkaya relasi antar variabel.

[Lanjut ke Linear Discriminative Models **](#/participant-ai-lab-ml-linear-discriminative)

## Linear Discriminative Models

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-5.html`

Chapter 5

#### Linear Discriminative Models

Linear discriminative models langsung belajar batas keputusan antar kelas. Model ini sering menjadi baseline yang kuat karena cepat, relatif mudah dijelaskan, dan cocok untuk banyak data tabular maupun teks.

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Menjelaskan hyperplane, logistic regression, sigmoid, dan cross-entropy.
-   **Membedakan strategi one-vs-rest dan one-vs-one untuk multi-class.
-   **Memilih metrik untuk data imbalanced dan memahami regularization.

Why it matters

##### Kenapa model linear masih penting?

Sebelum memakai model besar, baseline linear membantu menjawab: apakah fitur sudah informatif? apakah masalahnya bisa dipisahkan cukup sederhana? apakah kita butuh interpretabilitas tinggi?

****

###### Hyperplane sebagai batas

Di 2D, batasnya garis. Di 3D, batasnya bidang. Di dimensi tinggi, kita menyebutnya hyperplane. Model belajar posisi batas yang memisahkan kelas.

Formula

##### Generalized linear model dan logistic regression

`h(x) = f(w^T x + w0)`

**GLM intuition.** Gabungkan fitur secara linear, lalu masukkan ke fungsi aktivasi f untuk menghasilkan output yang sesuai.

`sigmoid(z) = 1 / (1 + exp(-z))`

**Sigmoid.** Mengubah skor z menjadi angka 0 sampai 1, sehingga bisa dibaca sebagai probabilitas kelas positif.

`cross entropy = - y log(p) - (1-y) log(1-p)`

**Loss klasifikasi.** Menghukum model saat memberi probabilitas rendah pada label benar.

Analogy

##### Analogi garis batas di peta

Bayangkan kamu memisahkan area aman dan berisiko di peta. Linear model menggambar satu garis batas. Jika data punya pola yang cukup lurus, garis itu sudah sangat berguna. Jika pola melingkar atau kompleks, kamu perlu fitur tambahan atau model non-linear.

**

###### One-vs-rest

Untuk banyak kelas, latih satu classifier per kelas: kelas A melawan semua kelas lain.

**

###### One-vs-one

Latih classifier untuk setiap pasangan kelas, lalu gabungkan voting prediksi.

Imbalance

##### Saat kelas tidak seimbang

Pada fraud detection, mungkin hanya 1% data yang fraud. Model yang selalu menjawab "aman" bisa punya accuracy 99%, tetapi tidak berguna. Karena itu, gunakan confusion matrix, precision, recall, F1, ROC-AUC, dan strategi imbalance.

**

###### Class weights

Memberi penalti lebih besar pada kelas minoritas.

**

###### Oversampling

Menambah contoh kelas minoritas pada training.

**

###### Undersampling

Mengurangi contoh kelas mayoritas agar distribusi lebih seimbang.

**

###### SMOTE

Membuat contoh sintetis kelas minoritas dari tetangga terdekat.

Regularization

##### Menahan model agar tidak terlalu liar

**

##### L2 regularization

Mendorong bobot tetap kecil dan tersebar. Sering dipakai sebagai default untuk stabilitas.

`loss + lambda sum w^2`

**

##### L1 regularization

Mendorong sebagian bobot menjadi nol, sehingga bisa membantu feature selection.

`loss + lambda sum |w|`

Mini checkpoint

##### Jawab sebentar

Pada deteksi fraud dengan fraud hanya 1%, mengapa accuracy tidak cukup? Metrik apa yang akan kamu prioritaskan dan kenapa?

Common mistakes

##### Kesalahan yang sering terjadi

-   **Menganggap logistic regression sama dengan linear regression, padahal outputnya probabilitas kelas.
-   **Melaporkan accuracy saja pada data imbalanced.
-   **Menggunakan regularization terlalu besar sampai model underfit.

Summary

##### Ringkasan

Linear discriminative models belajar batas keputusan langsung dari data. Logistic regression memakai sigmoid dan cross-entropy, regularization menjaga bobot tetap terkendali, dan evaluasi perlu sensitif terhadap imbalance.

[Lanjut ke Support Vector Machine **](#/participant-ai-lab-ml-svm)

## Support Vector Machine

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-6.html`

Chapter 6

#### Support Vector Machine

Support Vector Machine mencari batas keputusan dengan margin selebar mungkin. Titik data yang paling dekat dengan batas disebut support vectors, dan titik-titik inilah yang sangat menentukan posisi batas.

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Menjelaskan margin, support vector, hard margin, soft margin, dan parameter C.
-   **Memahami intuisi kernel trick untuk batas non-linear.
-   **Membaca kapan SVM cocok dipakai dan kapan perlu hati-hati.

Why it matters

##### Kenapa SVM penting?

SVM memberi cara elegan untuk mencari batas yang tidak hanya memisahkan data, tetapi juga punya ruang aman dari titik terdekat. Ide margin ini membantu generalisasi, terutama pada data dengan fitur cukup tinggi dan jumlah data tidak terlalu besar.

****

###### Margin sebagai zona aman

Jika dua batas sama-sama memisahkan kelas, SVM memilih batas yang memberi jarak terbesar dari titik terdekat. Jarak itu disebut margin.

Formula

##### Margin dan soft margin

`w^T x + b = 0`

**Hyperplane.** Batas keputusan linear. Tanda dari skor menentukan kelas prediksi.

`margin = 2 / ||w||`

**Margin.** Semakin kecil norm bobot w, semakin lebar margin. SVM mencari pemisah dengan margin besar.

`loss + C sum slack`

**Soft margin.** Slack mengizinkan beberapa pelanggaran margin. C mengatur seberapa keras model menghukum pelanggaran.

Analogy

##### Analogi jalan pembatas

Bayangkan kamu membuat jalan di antara dua kelompok rumah. Jalan yang baik bukan hanya lewat di tengah, tetapi juga memberi jarak aman dari rumah terdekat di kedua sisi. Support vectors adalah rumah yang paling dekat dengan jalan; posisinya menentukan lebar jalan.

**

###### Hard margin

Tidak mengizinkan salah klasifikasi. Cocok hanya jika data benar-benar terpisah rapi.

**

###### Soft margin

Mengizinkan beberapa titik melanggar margin agar model lebih tahan noise.

**

###### Parameter C

C besar lebih keras menghukum error; C kecil lebih toleran dan bisa memberi margin lebih lebar.

Kernel trick

##### Memisahkan pola non-linear

Jika data tidak bisa dipisahkan dengan garis di ruang asli, kernel membantu SVM menghitung kemiripan seolah data dipetakan ke ruang fitur lebih tinggi, tanpa benar-benar membangun semua dimensi itu secara eksplisit.

`K(x, x') = phi(x)^T phi(x')`

**Kernel.** Fungsi kemiripan yang menggantikan dot product di ruang fitur baru.

`polynomial kernel`

**Polynomial.** Cocok untuk interaksi fitur dengan derajat tertentu.

`RBF kernel`

**RBF.** Cocok untuk batas melengkung yang lebih fleksibel, tetapi perlu tuning gamma dan C.

Real examples

##### Kapan SVM sering dipakai?

**Text classification**

SVM linear bisa kuat pada data sparse berdimensi tinggi seperti bag-of-words atau TF-IDF.

**Bioinformatics**

SVM sering dipakai pada data dengan jumlah fitur besar dan sampel terbatas.

**Baseline klasifikasi**

SVM menjadi pembanding kuat sebelum memakai model yang lebih kompleks.

Mini checkpoint

##### Jawab sebentar

Jika data punya outlier, mengapa soft margin biasanya lebih realistis daripada hard margin?

Common mistakes

##### Kesalahan yang sering terjadi

-   **Memakai hard margin pada data noisy.
-   **Menggunakan RBF tanpa scaling fitur.
-   **Tidak melakukan tuning C dan gamma sehingga model underfit atau overfit.

Summary

##### Ringkasan

SVM mencari batas dengan margin besar. Support vectors menentukan batas, soft margin membuat model tahan noise, dan kernel trick membantu menangani pola non-linear.

[Lanjut ke Neural Networks **](#/participant-ai-lab-ml-neural-networks)

## Neural Networks

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-7.html`

Chapter 7

#### Neural Networks

Neural network membangun prediksi dari lapisan-lapisan komputasi sederhana. Dengan cukup data, arsitektur, dan training yang tepat, network bisa menangkap pola non-linear yang sulit ditulis manual.

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Menjelaskan perceptron, MLP, activation, forward pass, dan backpropagation.
-   **Membaca masalah vanishing gradient, exploding gradient, dan overfitting.
-   **Membedakan peran optimizer, regularization, dan mini-batch training.

Why it matters

##### Kenapa neural network jadi pusat AI modern?

Deep learning di computer vision, speech, NLP, dan generative AI berangkat dari ide neural network. Chapter ini memberi peta konsep agar kamu tidak hanya memakai model, tetapi juga paham mengapa training bisa berhasil atau gagal.

x1x2x3

**

h1h2h3h4

**

y

###### Layered representation

Setiap layer mengubah representasi. Layer awal membaca sinyal sederhana, layer berikutnya menggabungkan sinyal menjadi pola yang lebih kompleks.

Formula

##### Dari perceptron ke MLP

`z = w^T x + w0`

**Net input.** Neuron menghitung kombinasi linear dari input dan bobot.

`a = activation(z)`

**Activation.** Fungsi seperti ReLU, sigmoid, tanh, atau softmax memberi non-linearitas dan bentuk output yang sesuai.

`w <- w - learning_rate * gradient`

**Gradient update.** Training memperbarui bobot berlawanan arah gradient agar loss menurun.

Analogy

##### Analogi tim penyaring informasi

Bayangkan satu tim menilai aplikasi fellowship. Orang pertama membaca kelengkapan data, orang kedua membaca pola progres, orang ketiga membaca kualitas jawaban. Keputusan akhir muncul dari gabungan penilaian bertingkat. Neural network melakukan komposisi sinyal seperti itu, tetapi dengan angka dan bobot.

**

###### Forward pass

Input mengalir dari layer awal ke output untuk menghasilkan prediksi.

**

###### Backpropagation

Error dihitung di output, lalu gradient disebarkan mundur dengan chain rule.

**

###### Mini-batch

Training memakai sebagian data per update agar lebih stabil dan efisien.

Training toolkit

##### Optimizer dan regularization

**

###### SGD

Update sederhana berdasarkan mini-batch gradient.

**

###### Momentum

Menyimpan arah update agar training tidak terlalu zig-zag.

**

###### RMSprop/Adam

Menyesuaikan learning rate per parameter agar training lebih adaptif.

**

###### Dropout & weight decay

Mengurangi overfitting dengan membatasi ketergantungan dan bobot besar.

Failure modes

##### Kenapa network bisa gagal belajar?

**

##### Vanishing gradient

Gradient sangat kecil saat melewati banyak layer, sehingga layer awal belajar sangat lambat.

**

##### Exploding gradient

Gradient terlalu besar dan membuat update bobot tidak stabil. Gradient clipping bisa membantu.

**

##### Overfitting

Model terlalu kuat dibanding data. Gunakan regularization, data augmentation, early stopping, atau arsitektur lebih sederhana.

**

##### Training instability

Learning rate terlalu besar, batch terlalu kecil, atau data tidak ternormalisasi dapat membuat loss sulit turun.

Mini checkpoint

##### Jawab sebentar

Jika train loss turun tajam tetapi validation loss naik, apa diagnosisnya? Sebutkan dua tindakan perbaikan.

Common mistakes

##### Kesalahan yang sering terjadi

-   **Memakai network besar untuk data kecil tanpa regularization.
-   **Tidak menormalisasi fitur numerik sebelum training.
-   **Mengubah banyak hyperparameter sekaligus sehingga sulit tahu penyebab perbaikan.

Summary

##### Ringkasan

Neural network menggabungkan layer, activation, forward pass, dan backpropagation untuk belajar pola non-linear. Training yang baik membutuhkan optimizer, regularization, dan monitoring validation.

[Lanjut ke Unsupervised Learning **](#/participant-ai-lab-ml-unsupervised)

## Unsupervised Learning

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-8.html`

Chapter 8

#### Unsupervised Learning

Unsupervised learning mencari struktur dari data tanpa label. Fokusnya bukan memprediksi jawaban benar, tetapi menemukan cluster, representasi ringkas, anomali, atau pola tersembunyi.

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Menjelaskan clustering, dimensionality reduction, dan density estimation.
-   **Membedakan K-Means, hierarchical clustering, DBSCAN, dan Gaussian Mixture Model.
-   **Memahami PCA dan t-SNE sebagai cara merangkum atau memvisualisasi data berdimensi tinggi.

Why it matters

##### Kenapa belajar tanpa label penting?

Di banyak situasi, label mahal atau belum tersedia. Kita tetap bisa menemukan segmen pelanggan, pola perilaku peserta, struktur topik, representasi fitur, atau kandidat anomali dari data mentah.

**

##### Clustering

Mengelompokkan data yang mirip tanpa kategori awal.

**

##### Dimensionality reduction

Meringkas banyak fitur menjadi representasi lebih kecil.

**

##### Density estimation

Membaca area data yang padat dan area yang jarang atau anomali.

Formula

##### K-Means dan tujuan clustering

`assign x_i to nearest centroid`

**Assignment step.** Setiap titik ditempatkan ke cluster dengan centroid terdekat.

`centroid = mean(points in cluster)`

**Update step.** Centroid digeser ke rata-rata titik dalam cluster.

`min sum ||x_i - mu_cluster||^2`

**Objective.** K-Means mencoba mengecilkan jarak titik ke centroid cluster masing-masing.

Analogy

##### Analogi mengatur peserta ke kelompok belajar

Jika kamu tidak punya label "beginner", "intermediate", atau "advanced", kamu masih bisa mengelompokkan peserta dari pola progres, skor latihan, dan topik minat. Setelah cluster muncul, manusia memberi interpretasi pada tiap kelompok.

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Metode
Intuisi
Kuat saat
Perhatian</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">K-Means
Cluster berbasis centroid.
Cluster relatif bulat dan jumlah cluster kira-kira diketahui.
Sensitif scaling dan outlier.</td>
<td align="left">Hierarchical
Menggabungkan titik/cluster bertahap menjadi dendrogram.
Ingin melihat struktur bertingkat.
Linkage choice memengaruhi hasil.</td>
<td align="left">DBSCAN
Cluster sebagai area padat dan noise sebagai area jarang.
Cluster bentuk bebas dan ada outlier.
Parameter eps dan min_samples perlu tuning.</td>
<td align="left">GMM
Soft clustering dari campuran distribusi Gaussian.
Satu titik bisa punya probabilitas ke beberapa cluster.
Butuh asumsi distribusi dan estimasi EM.</td>
</tr>
</tbody>
</table>

Cluster quality

##### Memilih jumlah cluster

**

###### Elbow method

Lihat titik ketika penurunan inertia mulai melambat. Titik "siku" memberi kandidat jumlah cluster.

**

###### Silhouette score

Mengukur apakah titik lebih dekat ke cluster sendiri dibanding cluster lain. Nilai lebih tinggi biasanya lebih baik.

Dimensionality reduction

##### PCA dan t-SNE

**

##### PCA

Mencari arah komponen utama yang mempertahankan variasi data sebanyak mungkin. Cocok untuk kompresi fitur dan eksplorasi awal.

`new axes = maximum variance`

**

##### t-SNE

Membantu visualisasi data berdimensi tinggi ke 2D atau 3D. Bagus untuk eksplorasi, tetapi jarak global tidak selalu bisa ditafsirkan langsung.

`high-D -> 2D map`

Real examples

##### Contoh penggunaan nyata

**Segmentasi peserta**

Mengelompokkan peserta berdasarkan progres, skor, dan aktivitas diskusi.

**Eksplorasi embedding**

Memvisualisasi embedding teks untuk melihat topik yang berdekatan.

**Anomaly discovery**

Menemukan pola transaksi, login, atau aktivitas yang jauh dari populasi normal.

Mini checkpoint

##### Jawab sebentar

Jika kamu punya data peserta tanpa label kemampuan, metode apa yang kamu pilih untuk membuat kelompok belajar awal? Fitur apa saja yang akan kamu pakai?

Common mistakes

##### Kesalahan yang sering terjadi

-   **Menganggap cluster otomatis berarti kategori bisnis yang benar tanpa validasi domain.
-   **Memakai K-Means tanpa scaling fitur.
-   **Menafsirkan visualisasi t-SNE terlalu literal untuk jarak global.

Summary

##### Ringkasan

Unsupervised learning membantu menemukan struktur tanpa label. K-Means, hierarchical clustering, DBSCAN, GMM, PCA, dan t-SNE adalah alat eksplorasi penting, tetapi hasilnya tetap perlu interpretasi domain dan validasi.

[Buka Latihan Machine Learning **](#/participant-ai-lab-ml-practice)

## Forum Pertanyaan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/diskusi.html`

Discussion Board

#### Forum Pertanyaan

Pilih salah satu prompt atau tulis pertanyaanmu sendiri. Thread dan balasan tersimpan di browser dengan key `heraiAiMlDiscussion`.

** Pengantar ML

** Supervised

** Algoritma dasar

** Probabilistic

** Metrik & interpretasi

** SVM

** Neural network

** Unsupervised

Prompt diskusi Ceritakan satu kasus di sekitarmu yang cocok diselesaikan dengan ML, bukan rule-based biasa. Bagaimana kamu menentukan fitur, label, loss, dan metrik untuk masalah supervised learning? Kapan kamu memilih regresi, klasifikasi, decision tree, random forest, atau k-NN? Apa risiko asumsi independen pada Naive Bayes, dan kapan asumsi itu masih berguna? Mana yang lebih penting untuk kasus sensitif: akurasi tinggi, recall tinggi, atau model yang mudah dijelaskan? Bagaimana margin, support vector, dan kernel membantu SVM memisahkan data non-linear? Apa tantangan utama melatih neural network agar tidak overfit atau gagal belajar? Kapan clustering atau reduksi dimensi lebih tepat dibanding supervised learning? Tulis posting diskusi

Posting akan tersimpan di browser ini.

** Posting Diskusi

## Kuis Konsep Machine Learning

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/kuis.html`

Knowledge Check

#### Kuis Konsep Machine Learning

Pilih satu jawaban paling tepat. Kuis ini disimpan dengan key `heraiAiMlQuizDone`, `heraiAiMlQuizScore`, dan `heraiAiMlQuizAnswers`.

1

##### Kapan ML paling masuk akal digunakan?

Saat aturan bisnis sederhana dan stabil. Saat pola kompleks berubah dan tersedia data contoh. Saat tidak ada data sama sekali. Saat output tidak perlu dievaluasi.

2

##### Apa makna x in R\^n pada konteks ML?

Satu label kategori untuk semua data. Satu data sebagai vektor fitur dengan n dimensi. Jumlah epoch training. Nilai loss final.

3

##### Contoh tugas unsupervised learning adalah...

Memprediksi spam berdasarkan label lama. Mengelompokkan pelanggan tanpa kategori awal. Menghitung pajak dengan rumus tetap. Mengunci akun dengan aturan manual tunggal.

4

##### Data seperti apa yang dibutuhkan supervised learning?

Input dan label benar untuk contoh training. Input tanpa label dan tanpa tujuan. Hanya desain UI tanpa data. Hanya daftar warna dashboard.

5

##### Hubungan loss dan optimisasi yang benar adalah...

Loss adalah jumlah fitur, optimisasi menghapus data. Loss mengukur error, optimisasi mencari parameter dengan loss lebih rendah. Loss hanya dipakai untuk clustering. Optimisasi berarti selalu menambah layer.

6

##### Fungsi validation set adalah...

Menggantikan semua data train. Membantu memilih model sebelum evaluasi test final. Menyembunyikan label dari semua data. Menjadi data produksi utama.

7

##### Prediksi harga rumah termasuk...

Regresi. Klasifikasi biner. Reinforcement learning. Tokenization.

8

##### Intuisi decision tree adalah...

Menghitung satu centroid untuk semua data. Membuat pertanyaan fitur bertingkat untuk mencapai prediksi. Selalu memakai sigmoid sebagai output. Menghapus data validasi.

9

##### Hal penting sebelum memakai k-NN adalah...

Menambah label palsu ke data test. Memastikan semua fitur diukur dengan skala berbeda ekstrem. Melakukan scaling fitur agar jarak adil. Menghindari semua metrik evaluasi.

10

##### Apa fungsi utama Bayes theorem?

Memperbarui peluang setelah melihat bukti. Menentukan jumlah hidden layer. Mengubah semua fitur menjadi gambar. Menghapus prior dari model.

11

##### Mengapa Naive Bayes disebut "naive"?

Karena tidak memakai probabilitas. Karena mengasumsikan fitur independen dalam kelas. Karena hanya bisa untuk gambar. Karena selalu tanpa label.

12

##### Laplace smoothing dipakai untuk...

Membuat kernel RBF. Menghapus semua kata langka. Mencegah peluang nol pada Naive Bayes. Mengganti validation set.

13

##### Peran sigmoid dalam logistic regression adalah...

Mengubah skor linear menjadi probabilitas 0 sampai 1. Menghitung centroid cluster. Menentukan jumlah fold validasi. Menghapus fitur kategorikal.

14

##### Untuk deteksi penyakit, metrik yang sering sangat penting karena FN mahal adalah...

Jumlah parameter. Recall. Ukuran file model. Banyaknya warna chart.

15

##### Pernyataan yang benar tentang regularization adalah...

Regularization selalu menambah data baru. L2 selalu membuat semua bobot nol. L1 bisa membantu feature selection dengan bobot nol. Regularization hanya untuk unsupervised learning.

16

##### Intuisi Support Vector Machine adalah...

Menghafal semua titik tanpa batas keputusan. Mencari pemisah dengan margin yang baik. Menghapus semua support vector. Mengubah supervised menjadi reinforcement.

17

##### Kapan soft margin lebih masuk akal daripada hard margin?

Saat data noisy atau tidak terpisah sempurna. Saat semua data identik. Saat tidak ada fitur. Saat model tidak perlu generalisasi.

18

##### Kernel trick pada SVM membantu untuk...

Mengunci semua bobot menjadi nol. Menghapus kebutuhan scaling selamanya. Membuat batas non-linear melalui fungsi kemiripan. Mengubah label menjadi teks.

19

##### Peran activation function pada neural network adalah...

Memberi non-linearitas pada output neuron. Menentukan jumlah data test. Menghapus gradient. Mengubah semua masalah menjadi clustering.

20

##### Backpropagation digunakan untuk...

Membuat dendrogram cluster. Menghitung gradient agar bobot bisa diperbarui. Mengganti semua loss function. Menentukan label manual.

21

##### Train loss turun, tetapi validation loss naik. Ini biasanya tanda...

Model makin sempurna di data baru. Overfitting. Data tidak punya fitur sama sekali. K-Means berhasil.

22

##### Intuisi utama K-Means adalah...

Menetapkan titik ke centroid terdekat dan memperbarui centroid. Melatih classifier dari label benar. Menghitung sigmoid untuk tiap kelas. Menghapus semua cluster kecil.

23

##### Keunggulan DBSCAN dibanding K-Means adalah...

Selalu membutuhkan label lengkap. Bisa menemukan cluster bentuk bebas dan noise. Selalu lebih cepat pada semua dataset. Tidak memiliki parameter sama sekali.

24

##### PCA umumnya digunakan untuk...

Menambah label manual ke dataset. Menghitung confusion matrix. Mereduksi dimensi data. Menentukan reward reinforcement learning.

** Submit Kuis

## Analisis Kasus Machine Learning

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/latihan.html`

Practice Lab

#### Analisis Kasus Machine Learning

Jawab dengan bahasamu sendiri. Sistem menyimpan jawaban di browser melalui localStorage dengan key `heraiAiMlPractice`.

1

##### Rule-based vs Machine Learning

Sebuah platform selalu meninjau transaksi di atas Rp10.000.000. Namun pola fraud kecil sering berubah mengikuti promo dan jam tertentu.

Keputusanmu Pilih pendekatan Cukup rule-based Gunakan ML Gabungkan rule-based dan ML Jelaskan alasanmu

2

##### Fitur, label, dan target

Kamu membangun model untuk memprediksi apakah peserta fellowship akan menyelesaikan modul tepat waktu.

Fitur yang relevan

Label atau target

3

##### Supervised, unsupervised, atau reinforcement?

Tentukan paradigma untuk tiga kasus: prediksi kelulusan berlabel, segmentasi peserta tanpa label, dan agen yang belajar memilih jalur belajar dari reward.

Pemetaan paradigma

4

##### Pilih algoritma regresi

Produk ingin memprediksi harga kos dari luas kamar, lokasi, fasilitas, jarak kampus, dan rating pemilik.

Algoritma regresi pilihanmu

5

##### Pilih algoritma klasifikasi

Tim ingin mengklasifikasikan komentar forum menjadi positif, netral, atau perlu perhatian mentor.

Algoritma klasifikasi pilihanmu

6

##### Probabilistic model dan Naive Bayes

Email mengandung kata "hadiah", "klik", dan "sekarang". Kamu ingin memberi skor kemungkinan spam.

Bagaimana Naive Bayes membaca kasus ini?

7

##### Interpretasi confusion matrix

Kasus deteksi penyakit: TP=45, FP=10, FN=5, TN=140. Hitung insight utama dan metrik mana yang paling penting.

**Pred PositifPred Negatif** **Aktual Positif45 TP5 FN** **Aktual Negatif10 FP140 TN**

Interpretasi dan metrik prioritas

8

##### Metrik untuk data imbalanced

Model fraud punya accuracy 99%, tetapi fraud hanya 1% dari data dan banyak fraud tidak terdeteksi.

Metrik dan strategi perbaikan

9

##### SVM margin dan kernel

Data dua kelas tidak bisa dipisahkan garis lurus, tetapi terlihat bisa dipisahkan jika fiturnya diproyeksikan ke ruang yang lebih tinggi.

Jelaskan solusi SVM

10

##### Clustering dan dimensionality reduction

Kamu punya data aktivitas peserta tanpa label kemampuan. Tujuannya membuat kelompok belajar dan visualisasi pola.

Rancangan unsupervised learning

##### Simpan Latihan

Jawaban akan tersimpan di browsermu.

** Simpan Jawaban

** Edit

** Hapus

## Intuisi Dasar — Target vs Prediksi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/legacy-lessons/ml-bias-variance.html`

01

#### Intuisi Dasar — Target vs Prediksi

Analogi dart board yang menjelaskan bias dan variance secara visual

Bayangkan kamu melempar dart ke papan. **Bias** adalah seberapa jauh rata-rata lemparanmu dari target. **Variance** adalah seberapa tersebar lemparanmu satu sama lain. Keduanya independen — kamu bisa punya kombinasi apapun dari keduanya.

Low Bias · Low Variance

Ideal — akurat dan konsisten

High Bias · Low Variance

Konsisten tapi sistematis salah

Low Bias · High Variance

Rata-rata tepat tapi tidak stabil

High Bias · High Variance

Kasus terburuk — salah dan tidak stabil

️ Interactive · Sesuaikan Kompleksitas Model

Polynomial Regression — Lihat Bias-Variance Berubah

Derajat Polinomial 1

Train Error—

Test Error—

Status—

02

#### Dekomposisi Error — Bias² + Variance + σ²

Penurunan matematis Expected Prediction Error (EPE)

Expected Prediction Error (EPE) di titik x bisa didekomposisi menjadi tiga komponen yang independen. Ini adalah hasil fundamental dalam ML theory yang menjelaskan *mengapa* tidak ada model yang sempurna.

Bias-Variance Decomposition (untuk regresi dengan squared loss)

EPE(x) = E[(y − ĥ(x))²]

Bias²(ĥ(x)) + Var(ĥ(x)) + σ²

**Bias²** = (E[ĥ(x)] − f(x))² — seberapa jauh rata-rata prediksi dari nilai sebenarnya

**Variance** = E[(ĥ(x) − E[ĥ(x)])²] — seberapa bervariasi prediksi antar training set berbeda

**σ²** = Irreducible error — noise inheren dalam data, tidak bisa dihilangkan oleh model apapun

Penurunan Matematis Lengkap

Dari E[(y−ĥ)²] ke Bias² + Var + σ²

1

Expand dengan menambah dan mengurangi E[ĥ(x)]

E[(y − ĥ)²] = E[(y − f + f − E[ĥ] + E[ĥ] − ĥ)²]

dimana f(x) = fungsi target sebenarnya, y = f(x) + ε

2

Cross terms hilang karena ε independen dari ĥ

= E[(f − E[ĥ])²] + E[(E[ĥ] − ĥ)²] + E[ε²]

3

Setiap term memiliki interpretasi jelas

= (E[ĥ(x)] − f(x))² + Var[ĥ(x)] + σ²

= Bias² + Variance + Irreducible Error

Visualisasi: 100 model yang dilatih pada dataset berbeda

Low Bias, Low Var

High Bias, Low Var

Low Bias, High Var

High Bias, High Var

⚠️

**σ² tidak bisa diminimasi** — ini adalah batas bawah absolut error yang bisa dicapai. Bahkan oracle yang tahu fungsi target f(x) sepenuhnya pun masih punya error σ². Oleh karena itu, tujuan sebenarnya adalah meminimasi *Bias² + Variance*, bukan total error.

03

#### High Bias — Underfitting

Model terlalu kaku untuk menangkap pola yang ada di data

**Underfitting** terjadi ketika model H terlalu sederhana — kapasitasnya tidak cukup untuk merepresentasikan fungsi target f(x). Model membuat asumsi yang terlalu kuat tentang bentuk fungsi.

⬆ High Bias — Karakteristik

Training error tinggi

Model bahkan tidak bisa fit data latihnya sendiri. E\_train ≫ 0.

Test error ≈ Train error

Gap kecil antara train dan test — keduanya sama-sama buruk.

Plateau cepat pada learning curve

Menambah lebih banyak data tidak membantu — masalah bukan di data.

Asumsi model terlalu kuat

Contoh: pakai linear model untuk data yang fundamentally non-linear.

Contoh nyata underfitting:

Regresi linear pada data sinusoidal

Decision tree depth=1 untuk XOR

MLP 1 neuron untuk MNIST

Naive Bayes ketika fitur sangat berkorelasi

Solusi untuk High Bias

1

**Tambah fitur** — Feature engineering, polynomial features, interaction terms

2

**Model lebih kompleks** — Naik ke arsitektur yang lebih expressive (linear → polynomial → neural net)

3

**Kurangi regularisasi** — Turunkan λ pada L1/L2, kurangi dropout rate

4

**Latih lebih lama** — Biarkan training berjalan lebih banyak epoch

04

#### High Variance — Overfitting

Model terlalu sensitif terhadap noise — menghafal bukan belajar

**Overfitting** terjadi ketika model terlalu fleksibel — ia belajar tidak hanya pola sebenarnya tapi juga noise dalam data latih. Model yang overfit punya training error sangat rendah tapi generalisasi buruk ke data baru.

⬆ High Variance — Karakteristik

✅

Training error sangat rendah

Model "hafal" semua data latih, termasuk noise-nya. E\_train ≈ 0.

❌

Test error jauh lebih tinggi

Gap besar antara train dan test error — tanda overfitting yang jelas.

Prediksi sangat bervariasi

Ganti sedikit data latih → prediksi berubah drastis. Var[ĥ(x)] besar.

Membaik dengan lebih banyak data

Tidak seperti underfitting — menambah data latih membantu mengurangi variance.

️ Interactive · Noise & Overfitting

Lihat bagaimana model degree-10 bereaksi terhadap noise

Level Noise σ 15

Jumlah Data N 16

Resample Data

Solusi untuk High Variance

1

**Regularisasi** — L1 (Lasso), L2 (Ridge), Elastic Net. Dropout untuk neural network.

2

**Tambah data latih** — Lebih banyak data membatasi variance secara alami. Data augmentation juga membantu.

3

**Kurangi kompleksitas model** — Pakai model yang lebih sederhana, kurangi parameter.

4

**Early Stopping** — Berhenti training ketika validation error mulai naik.

5

**Dimensionality Reduction** — PCA, feature selection untuk mengurangi noise dimensions.

05

#### Inductive Bias — Asumsi yang Memungkinkan Belajar

Setiap algoritma punya asumsi implisit tentang struktur data

**Inductive bias** adalah kumpulan asumsi yang dibuat algoritma ML untuk melakukan generalisasi dari data latih ke data baru. Tanpa asumsi ini, generalisasi tidak mungkin (lihat No Free Lunch Theorem). Setiap pilihan algoritma adalah pilihan tentang asumsi apa yang kita percayai tentang data.

1

Relational Bias

Asumsi tentang struktur hubungan antar fitur

Linear Model Hubungan antar fitur dan target adalah linear

CNN Spatial invariance — fitur penting sama di seluruh gambar

RNN/LSTM Urutan waktu penting, ada dependensi jangka panjang

k-NN Titik yang dekat di ruang fitur cenderung punya label sama

Naive Bayes Fitur independen secara kondisional diberikan kelas

2

Strength of Bias

Seberapa kuat asumsi diberlakukan

Parametrik (Strong Bias)

Bentuk fungsi diasumsikan (misal: linear)

Jumlah parameter tetap, tidak bergantung N

Butuh lebih sedikit data untuk konvergen

Salah jika asumsi tidak tepat

Linear Reg, Logistic Reg, Naive Bayes

Non-parametrik (Weak Bias)

Asumsi minimal tentang bentuk fungsi

Kompleksitas tumbuh dengan N

Butuh lebih banyak data untuk konvergen

Lebih fleksibel, tapi lebih mudah overfit

k-NN, Decision Tree, Kernel SVM

**CNN dan Spatial Invariance:** CNN secara eksplisit encode asumsi bahwa fitur visual (tepi, tekstur, bentuk) sama pentingnya di semua lokasi gambar — itulah mengapa weight sharing bekerja. Tanpa asumsi ini, kita butuh jauh lebih banyak parameter dan data untuk mencapai performa yang sama.

06

#### No Free Lunch Theorem

Tidak ada algoritma terbaik untuk semua masalah — ini bukan opini, ini teorema

NFL Theorem (Wolpert, 1996) membuktikan secara matematis bahwa jika kita rata-rata performa semua algoritma ML di *semua* distribusi data yang mungkin, semua algoritma punya performa yang **sama**.

Pernyataan Formal (simplified)

Σ\_f E[L | f, A₁] = Σ\_f E[L | f, A₂]   untuk sembarang A₁, A₂

dimana jumlah dilakukan atas semua possible target function f, dan L adalah loss.

Implikasi Praktis

✅

Yang berarti...

Setiap algoritma punya "niche" — ada distribusi data di mana ia unggul. Tidak ada yang universal inferior.

❌

Yang tidak berarti...

Bukan berarti semua algoritma sama baik pada masalah spesifik! Pada domain tertentu (misal: gambar), CNN jelas unggul.

Kesimpulan utama

Pilih algoritma berdasarkan asumsi yang sesuai dengan struktur masalahmu. Domain knowledge sangat penting.

Ilustrasi: Algoritma A unggul di distribusi P, kalah di distribusi Q

07

#### Diagnosis — Learning & Complexity Curves

Cara sistematis mendiagnosis apakah masalahnya bias atau variance

Sebelum menerapkan solusi, kita perlu *mendiagnosis* masalahnya dengan tepat. Dua alat utama: **Learning Curves** (error vs ukuran dataset) dan **Complexity Curves** (error vs kompleksitas model).

Learning Curves — Error vs Jumlah Data N

Pilih skenario untuk melihat pola diagnostik

Underfitting

Overfitting

Good Fit

**Underfitting:** Training dan validation error keduanya tinggi dan konvergen ke nilai yang sama. Menambah data tidak membantu. Masalah ada di model, bukan data.

Complexity Curves — Error vs Derajat Kebebasan Model

Temukan sweet spot kompleksitas optimal

── Training error ── Validation error ★ Model optimal

High Bias Region

Sweet Spot

High Variance Region

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Gejala
Diagnosa
Solusi</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Train error tinggi, Val error ≈ Train error
High Bias
Model lebih kompleks, lebih banyak fitur</td>
<td align="left">Train error rendah, Val error jauh lebih tinggi
High Variance
Regularisasi, lebih banyak data</td>
<td align="left">Keduanya tinggi, gap besar
Bias + Variance
Model berbeda, lebih banyak data dan reg</td>
</tr>
</tbody>
</table>

08

#### Mitigasi — Regularisasi & Ensemble

Teknik spesifik untuk mengurangi bias atau variance

️ Regularisasi — Mengurangi Variance

L1, L2, dan Dropout: cara kerja matematis

L1 Regularisasi (Lasso)

L\_total = L(θ) + λ·Σ|θᵢ|

Mendorong banyak weight → **tepat nol**

Efek: **feature selection otomatis**

Solusi: sparse weight vector

L2 Regularisasi (Ridge)

L\_total = L(θ) + λ·Σθᵢ²

Mendorong weight → **kecil tapi tidak nol**

Efek: **weight decay** yang halus

Solusi: weight tersebar merata

Dropout (Neural Networks)

p(neuron aktif) = 1 − p\_drop

Matikan neuron acak saat training

Efek: ensemble dari 2ᴺ sub-network

Mencegah co-adaptation

Ensemble Methods — Bagging vs Boosting

Dua strategi berbeda untuk target yang berbeda

Bagging

Target: kurangi **Variance**

Train banyak model secara **paralel**

↓

Setiap model pada **bootstrap sample** berbeda

↓

Rata-rata prediksi → variance berkurang √k kali

Var[ĥ̄] = σ²/k (jika model independen)

Contoh: **Random Forest**

Boosting

Target: kurangi **Bias**

Train model **sekuensial**

↓

Model baru fokus pada **error model sebelumnya**

↓

Gabungkan → weak learners → strong learner

F\_T(x) = Σₜ αₜ · hₜ(x)

Contoh: **XGBoost, AdaBoost**

09

#### Paradoks Modern — Double Descent

Deep learning melanggar "hukum" bias-variance klasik — dan ternyata ada penjelasannya

Classical ML theory memprediksi kurva U-shape untuk test error sebagai fungsi kompleksitas model. Tapi model modern seperti deep neural networks menunjukkan fenomena **double descent** — setelah "puncak" overfitting, error turun lagi ketika model menjadi *sangat* over-parameterized.

Fenomena Double Descent

Classical U-curve vs Modern Double Descent

── Classical theory (U-curve) ── Modern observation (double descent) ── Interpolation threshold

Mengapa ini terjadi?

Zona 1: Under-parameterized

Model tidak cukup parameter untuk fit semua data. Sesuai teori klasik — lebih banyak parameter = lebih baik.

Zona 2: Interpolation Threshold

Model bisa persis fit semua training data. Ini adalah puncak test error — model harus "bergelut" untuk fit semua titik.

Zona 3: Over-parameterized (benign overfitting)

Model punya banyak lebih banyak parameter dari data. Tapi SGD+inductive bias memilih solusi yang "smooth" — dan error generalisasi turun kembali!

**Benign Overfitting (Bartlett et al., 2020):** Model yang persis menginterpolasi training data bisa tetap generalisasi baik jika dimensi fitur jauh lebih besar dari jumlah data. Inilah mengapa GPT-4 (trillions parameter) generalisasi baik meski kapasitasnya jauh melebihi ukuran training set yang terlihat. Bias-variance tradeoff klasik tidak ditinggalkan — tapi perlu diperluas.

Ringkasan — Bias-Variance dalam Satu Pandangan

**Bias** → model terlalu sederhana, asumsi terlalu kuat

**Variance** → model terlalu kompleks, sensitif terhadap noise

**σ²** → tidak bisa dihilangkan, batas bawah absolut

**Optimal** → minimasi Bias² + Variance secara bersamaan

Modul berikutnya

##### Supervised Learning →

Fondasi teoritis sudah kamu kuasai. Saatnya masuk ke algoritma konkret — regresi, klasifikasi Bayesian, logistic regression, SVM, dan neural networks.

[Kembali ke ML Overview](/pages/ai-lab/machine-learning.html)

## Vektor Fitur & Ruang Input

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/legacy-lessons/ml-hypothesis.html`

01

#### Vektor Fitur & Ruang Input

Bagaimana ML merepresentasikan "dunia" sebagai angka

Sebelum algoritma apapun bisa belajar, data harus direpresentasikan dalam bentuk yang bisa diproses secara matematis. ML merepresentasikan setiap **contoh latih** sebagai sebuah **vektor fitur** — titik dalam ruang berdimensi tinggi.

Definisi · Contoh Latih (Training Example)

x = (x₁, x₂, …, xₙ)ᵀ ∈ ℝⁿ

dimana n = jumlah fitur (dimensi), setiap xᵢ adalah nilai fitur ke-i

Semua contoh membentuk sebuah **ruang input** (input space) atau **ruang contoh** (instance space) X. Setiap titik dalam X merepresentasikan satu kemungkinan contoh.

** Contoh Konkret · Fitur = Angka

Dari Objek Nyata ke Vektor Fitur

** Rumah

** Email

** Pasien

**

Rumah di Jakarta Selatan

Luas bangunan120 m²

Jumlah kamar3

Jarak ke pusat kota8.5 km

Usia bangunan12 tahun

Ada garasi?Ya (1)

encode

x ∈ ℝ⁵

x₁luas120.0

x₂kamar3.0

x₃jarak8.5

x₄usia12.0

x₅garasi1.0

Target y = Rp 2.4 M (regresi)

**

Email masuk

Jumlah kata "gratis"5

Jumlah tanda seru8

Pengirim dikenal?Tidak (0)

Ada link?Ya (1)

Panjang subjek42 karakter

encode

x ∈ ℝ⁵

x₁kata gratis5.0

x₂tanda !8.0

x₃dikenal0.0

x₄ada link1.0

x₅pjg subjek42.0

Target y = SPAM (1) (klasifikasi)

**

Data pasien

Usia54 tahun

Tekanan darah145 mmHg

Kolesterol240 mg/dL

Merokok?Ya (1)

BMI28.4

encode

x ∈ ℝ⁵

x₁usia54.0

x₂tekanan145.0

x₃kolesterol240.0

x₄rokok1.0

x₅BMI28.4

Target y = Risiko Tinggi (1) (klasifikasi)

**

**Asumsi IID:** Semua algoritma ML mengasumsikan bahwa data latih diambil secara **i.i.d.** (independent and identically distributed) — setiap contoh diambil secara independen dari distribusi yang sama P(x, y). Ini berarti urutan data tidak penting, dan tidak ada dependensi antar contoh.

** Visualisasi · Ruang Input 2 Dimensi

X = ℝ² — Setiap titik adalah satu contoh

● Kelas positif (y = 1) ● Kelas negatif (y = 0) Sumbu = fitur x₁ dan x₂

02

#### Hipotesis h: X → Y

Fungsi yang diinduksi dari data — ini yang dicari oleh algoritma ML

Tugas algoritma ML adalah menginduksi sebuah **hipotesis** — fungsi h yang memetakan setiap input x ke output ŷ. Hipotesis adalah "model terlatih" kita. Untuk klasifikasi biner, hipotesis memetakan ke {0, 1}.

Definisi · Hipotesis (Klasifikasi Biner)

h : X → {0, 1}

`h(x) = 1`→ x diprediksi masuk kelas C (positif)

`h(x) = 0`→ x diprediksi tidak masuk kelas C (negatif)

Hipotesis Konsisten

Hipotesis h **konsisten** dengan contoh latih (x, y) jika `h(x) = y`.

Konsisten dengan semua data D:

Consistent(h, D) ⟺ ∀(x,y) ∈ D: h(x) = y

Empirical Error E(h|D)

Fraksi contoh latih yang salah diklasifikasikan:

E(h|D) = (1/N) · Σᵢ 𝟙[h(x⁽ⁱ⁾) ≠ y⁽ⁱ⁾]

Hipotesis konsisten ⟺ E(h|D) = 0

**️ Interactive · Error Hipotesis

Visualisasi: Hipotesis Linear di Ruang 2D

FP: 0

FN: 0

E(h|D): 0%

Putar garis pemisah:

90°

Geser garis:

Coba temukan garis yang memisahkan ● dan ● sempurna (E = 0%).

**

**False Positives vs False Negatives:** Contoh yang diprediksi **positif tapi sebenarnya negatif** = *False Positive (FP)*. Contoh yang diprediksi **negatif tapi sebenarnya positif** = *False Negative (FN)*. Dalam domain seperti deteksi kanker, FN jauh lebih berbahaya dari FP.

03

#### Model & Ruang Hipotesis H

Bukan satu fungsi — tapi seluruh keluarga fungsi yang mungkin

Hipotesis tidak diciptakan dari nol. Kita *memilih* dari kumpulan fungsi yang telah ditentukan sebelumnya. Kumpulan ini disebut **model** atau **ruang hipotesis H**. Pilihan H adalah keputusan desain terpenting dalam ML — ini adalah bentuk "pengetahuan awal" kita tentang masalah.

Definisi · Model (Ruang Hipotesis)

H = { h | h : X → Y }

Kumpulan semua hipotesis yang mungkin — algoritma mencari h\* ∈ H yang terbaik

Pilihan Model H yang Berbeda untuk Ruang 2D

Model Linear

H = garis lurus (hyperplane)

Kapasitas Rendah

Model Persegi Panjang

H = persegi panjang axis-aligned

Kapasitas Sedang

Model Lingkaran

H = lingkaran dengan radius r

Kapasitas Sedang

Model Polinomial

H = kurva derajat tinggi

Kapasitas Tinggi

**

**Kapasitas Model:** Semakin besar H, semakin banyak fungsi yang bisa direpresentasikan, semakin tinggi kapasitas model. Model dengan kapasitas terlalu rendah → *underfitting*. Terlalu tinggi → *overfitting*. Memilih H yang tepat adalah inti dari ML.

**️

Model H

Keluarga / kelas fungsi

Contoh: "semua garis lurus di ℝ²"
 Tidak punya nilai parameter spesifik.
 Dipilih sebelum training.

H = { h(x|θ) | θ ∈ Θ }

≠

**

Hipotesis h

Satu fungsi konkret

Contoh: "garis y = 2x₁ − 3x₂ + 1"
 Parameter θ sudah ditetapkan.
 Hasil setelah training.

h = h(x|θ\*) untuk θ\* spesifik

04

#### Parametrisasi Model

Cara praktis mendefinisikan H — melalui parameter θ

Mendefinisikan H sebagai "himpunan semua fungsi" terlalu abstrak untuk implementasi. Dalam praktik, kita merepresentasikan model sebagai **fungsi yang diparameterisasi**: `h(x|θ)`. Training ML = mencari θ\* yang optimal.

Definisi · Model Terparameterisasi

H = { h(·|θ) | θ ∈ Θ }

θ = vektor parameter, Θ = ruang parameter (semua nilai θ yang mungkin)

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Model H
Hipotesis h(x|θ)
Parameter θ
Jumlah Param</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Regresi Linear
<code>h(x) = θᵀx + θ₀</code>
<code>θ ∈ ℝⁿ, θ₀ ∈ ℝ</code>
n + 1</td>
<td align="left">Persegi Panjang (ℝ²)
<code>h(x) = 𝟙[θ_x1 ≤ x₁ ≤ θ_x2 ∧ θ_y1 ≤ x₂ ≤ θ_y2]</code>
<code>θ = (θ_x1, θ_x2, θ_y1, θ_y2)</code>
4</td>
<td align="left">Lingkaran (ℝ²)
<code>h(x) = 𝟙[x₁² + x₂² ≤ θ]</code>
<code>θ ∈ ℝ (radius²)</code>
1</td>
<td align="left">MLP (1 hidden layer)
<code>h(x) = σ(W₂·σ(W₁x + b₁) + b₂)</code>
<code>W₁, b₁, W₂, b₂</code>
n·h + h·k + h + k</td>
</tr>
</tbody>
</table>

⚙️ Training = Optimisasi

Tiga Komponen Algoritma ML

1

Model H = { h(·|θ) }

Keluarga fungsi yang diparameterisasi. Menentukan bentuk solusi yang bisa ditemukan.

Contoh: H = semua garis lurus → θ = (w, b)

→

2

Loss Function L(θ|D)

Mengukur seberapa besar kesalahan prediksi model pada data latih D.

Contoh: L = MSE = (1/N)Σ(h(xᵢ) − yᵢ)²

→

3

Optimisasi: θ\* = argmin L

Cari parameter θ\* yang meminimalkan loss. Gradient descent, closed-form solution, dll.

Hasil: hipotesis h\* = h(·|θ\*)

**

Ketiga pilihan ini — model, loss, optimisasi — sepenuhnya menentukan **induktif bias** algoritma. Dua algoritma dengan model yang sama tapi loss berbeda akan menghasilkan hipotesis yang berbeda.

05

#### Ruang Inaˇcica (Version Space)

Semua hipotesis yang konsisten dengan data — tidak hanya satu!

Satu set data latih D biasanya tidak cukup untuk menentukan *satu* hipotesis unik. Ada banyak (bahkan tak terhingga) hipotesis dalam H yang konsisten dengan D. Kumpulan semua hipotesis konsisten tersebut disebut **Ruang Inaˇcica** (Version Space).

Definisi · Ruang Inaˇcica (Version Space)

VS<sub>H,D</sub> = { h ∈ H | Consistent(h, D) }

Himpunan semua hipotesis di H yang konsisten (tidak ada error) pada training data D

** Visualisasi · Ruang Inaˇcica

Model persegi panjang — banyak hipotesis konsisten

Positif (y=1)

Negatif (y=0)

Hipotesis spesifik (S) — terkecil

Hipotesis umum (G) — terbesar

Version Space — semua di antara S dan G

**Boundary S (paling spesifik):** persegi panjang terkecil yang masih mencakup semua titik positif.
 **Boundary G (paling umum):** persegi panjang terbesar yang tidak mencakup titik negatif manapun.
 **Version Space:** semua persegi panjang antara S dan G — semuanya konsisten dengan D.

Fakta bahwa version space sangat besar adalah alasan mengapa kita butuh **induktif bias** — asumsi tambahan untuk memilih satu hipotesis dari sekian banyak yang konsisten.

**

**Active Learning:** Strategi optimal untuk memperkecil version space adalah memilih contoh x yang membagi version space menjadi dua bagian sama besar — yaitu contoh yang diklasifikasikan berbeda oleh setengah hipotesis dalam VS. Dengan strategi ini, dibutuhkan hanya O(log|VS|) pertanyaan untuk menentukan hipotesis benar.

06

#### Induktif Bias

Asumsi yang memungkinkan generalisasi — tanpanya, ML tidak mungkin

Ini adalah konsep paling fundamental — dan paling sering diabaikan — dalam ML. Pembelajaran tanpa asumsi tambahan adalah *mustahil*. Fakta ini diformalisasikan dalam **No Free Lunch Theorem**.

**️

No Free Lunch Theorem

Tidak ada algoritma ML yang secara universal lebih baik dari algoritma lain untuk *semua* masalah. Jika satu algoritma unggul di satu kelas masalah, pasti ada kelas masalah lain di mana ia lebih buruk. Setiap keunggulan datang dari asumsi (induktif bias) yang sesuai dengan masalah spesifik.

1

Bias Pembatasan

(Restriction / Language Bias)

Membatasi ruang hipotesis H — hanya fungsi dari keluarga tertentu yang dipertimbangkan.

Contoh:

H = hanya garis lurus → tidak bisa belajar XOR

H = hanya pohon keputusan dengan max depth 5

H = hanya fungsi yang mulus (smooth)

✓ Lebih mudah dioptimalkan ✗ Mungkin tidak cukup ekspresif

2

Bias Preferensi

(Preference / Search Bias)

H tidak dibatasi, tapi ada preferensi — hipotesis tertentu diutamakan atas yang lain.

Contoh:

Pilih hipotesis paling sederhana (Occam's Razor)

Pilih hipotesis dengan margin terbesar (SVM)

Pilih hipotesis dengan probabilitas posterior tertinggi (Bayes)

✓ Lebih fleksibel ✗ Harder to optimize (search over all H)

**

**Occam's Razor dalam ML:** Di antara semua hipotesis yang sama-sama konsisten dengan data, pilihlah yang *paling sederhana*. Ini bukan hanya prinsip estetis — model lebih sederhana punya lebih sedikit parameter, lebih sulit overfit, dan lebih mudah diinterpretasi. Formalisasi matematisnya adalah **Minimum Description Length (MDL)**.

**️ Peta Konsep · Hubungan Semua Konsep

Dari Data ke Hipotesis — Alur Lengkap

**

Data D

{ (x⁽ⁱ⁾, y⁽ⁱ⁾) }ᴺ

+

**️

Model H

{ h(·|θ) }

+

**

Induktif Bias

Preferensi / Pembatasan

⟹

**

Hipotesis h\*

h(·|θ\*) optimal

Lesson berikutnya

##### VC-Dimension →

Sekarang kamu tahu apa itu Model H dan Hipotesis h. Pertanyaan selanjutnya: berapa kapasitas model? VC-Dimension memberikan jawaban formal — dan menentukan apakah model bisa generalisasi.

[Lanjut ke VC-Dimension](#/participant-ai-lab-ml-vc-dim)

## Apa itu Machine Learning?

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/legacy-lessons/ml-intro.html`

01

#### Apa itu Machine Learning?

Perbedaan fundamental antara pemrograman klasik dan ML

Pemrograman klasik bekerja dengan cara sederhana: programmer menulis **aturan eksplisit**, komputer mengeksekusinya. Tapi ada kelas masalah — mengenali wajah, memahami kalimat, memprediksi harga saham — di mana tidak ada manusia yang bisa menuliskan aturannya secara eksplisit. Di sinilah **Machine Learning** masuk.

Pemrograman Klasik

** Data Input

+

** Aturan (oleh programmer)

↓

** Output / Jawaban

Contoh: `if suhu > 38: return "demam"`

VS

Machine Learning

** Data Input

+

** Jawaban (label/output)

↓

** Aturan ditemukan sendiri oleh model

Contoh: `model.fit(data_pasien, diagnosa)`

**

**Definisi formal (Tom Mitchell, 1997):** "A computer program is said to learn from experience E with respect to some task T and performance measure P, if its performance on T, as measured by P, improves with experience E."
 Dengan kata lain: ML adalah program yang **menjadi lebih baik seiring bertambahnya data**.

** Motivasi

Mengapa ML Dibutuhkan?

**

Masalah Terlalu Kompleks

Pengenalan wajah, penerjemahan bahasa, diagnosis medis — tidak ada manusia yang bisa menulis aturannya secara eksplisit.

**

Data Tersedia Masif

Internet menghasilkan miliaran titik data setiap hari. ML bisa memanfaatkan data ini untuk menemukan pola yang tidak terlihat manusia.

**

Lingkungan Dinamis

Filter spam harus adaptif — spammer terus berubah taktik. Aturan statis tidak bisa mengikuti, tapi model ML bisa belajar terus.

**

Menemukan Pola Tersembunyi

Pola dalam data genomik, perilaku finansial, atau cuaca — terlalu kompleks dan multidimensional untuk ditemukan secara manual.

02

#### Tiga Paradigma Utama ML

Cara yang berbeda untuk belajar dari data, tergantung informasi apa yang tersedia

ML bukan satu algoritma — melainkan keluarga besar pendekatan. Perbedaan paling mendasar ada di **jenis sinyal pembelajaran**: apakah kita punya jawaban benar? Apakah data sudah berlabel? Dari sini muncul tiga paradigma utama.

01

**

Supervised Learning

Belajar dari contoh berlabel

Setiap data latih memiliki label yang diketahui. Model belajar memetakan input ke output yang benar.

Sinyal: Label eksplisit y untuk setiap x

Klasifikasi emailspam / bukan spam

Prediksi harga rumahnilai numerik Rp

Deteksi penyakitpositif / negatif

02

**

Unsupervised Learning

Temukan struktur tanpa label

Tidak ada label. Model harus menemukan sendiri pola, kelompok, atau struktur tersembunyi dalam data.

Sinyal: Hanya data x, tanpa label y

Segmentasi pelanggancluster otomatis

Kompresi datarepresentasi ringkas

Anomali detectionpola tidak biasa

03

**

Reinforcement Learning

Belajar dari interaksi & reward

Agen belajar dengan mencoba aksi dan menerima sinyal reward/penalti dari lingkungan. Tidak ada dataset statis.

Sinyal: Reward r setelah aksi a di state s

AlphaGo / chess AImenang / kalah

Robot navigasireach target

Rekomendasi kontenklik / scroll

03

#### Supervised Learning — Lebih Dalam

Paradigma paling umum — fondasi sebagian besar aplikasi ML di industri

Supervised learning adalah paradigma paling dominan di industri. Hampir semua model produksi — dari filter konten hingga sistem rekomendasi — dibangun di atasnya. Ada dua sub-tugas utama: **klasifikasi** dan **regresi**.

**️

Klasifikasi

Output diskrit

h : X → {C₁, C₂, …, Cₖ}

Menetapkan kelas kategorikal ke setiap input. Bisa binary (2 kelas) atau multi-class (k kelas).

Email → spam / ham

Foto → anjing / kucing / burung

Transaksi → fraud / normal

**

Regresi

Output kontinu

h : X → ℝ

Memprediksi nilai numerik kontinu. Perbedaannya dengan klasifikasi hanya pada tipe output.

Fitur rumah → harga Rp

Data cuaca → suhu besok °C

Profil pengguna → revenue prediksi

⚙️ Bagaimana Supervised Learning Bekerja

Pipeline Lengkap — 4 Langkah

1

Kumpulkan Training Data

Dataset D = {(x⁽¹⁾, y⁽¹⁾), ..., (x⁽ᴺ⁾, y⁽ᴺ⁾)}. Setiap contoh adalah pasangan input-output. Kualitas dan kuantitas data sangat menentukan hasil.

↓

2

Pilih Model (Ruang Hipotesis H)

Tentukan keluarga fungsi yang akan dicari: linear, polynomial, decision tree, neural network. Pilihan ini disebut *induktif bias*.

↓

3

Training — Minimalkan Loss

Cari parameter θ yang meminimalkan fungsi loss L(θ) — ukuran kesalahan prediksi di atas training data. Biasanya via gradient descent.

↓

4

Evaluasi Generalisasi

Uji pada test set yang tidak pernah dilihat model. Tujuan bukan menghafal data latih — tapi bisa memprediksi data baru dengan akurat.

04

#### Unsupervised Learning

Menemukan struktur tersembunyi tanpa label

Memberi label data itu mahal dan lambat. Untungnya, banyak hal berguna bisa dipelajari dari data yang **tidak berlabel** — menemukan kelompok alami, memampatkan representasi, atau mendeteksi anomali.

**

Clustering

Mengelompokkan data berdasarkan kemiripan tanpa label. **K-Means** mencari K cluster dengan meminimalkan jarak intra-cluster. **DBSCAN** menemukan cluster bentuk arbitrer berdasarkan density.

K-Means DBSCAN Agglomerative GMM

**

Dimensionality Reduction

Meringkas data berdimensi tinggi ke representasi lebih padat tanpa kehilangan informasi penting. Berguna untuk visualisasi, kompresi, dan feature engineering sebelum supervised learning.

PCA t-SNE Autoencoder UMAP

**

Anomaly Detection

Mengidentifikasi titik data yang menyimpang jauh dari pola normal. Tidak perlu label "anomali" — cukup pelajari distribusi data normal, lalu flagging yang tidak cocok.

Isolation Forest Autoencoder LOF

05

#### Reinforcement Learning

Belajar dari konsekuensi aksi — seperti cara manusia belajar

RL paling mirip dengan cara manusia belajar secara alami: mencoba sesuatu, melihat hasilnya, dan menyesuaikan perilaku. Tidak ada dataset statis — agen **mengumpulkan pengalamannya sendiri** melalui interaksi dengan lingkungan.

**

Agent

**

Environment

aksi a

state s, reward r

State `s`

Representasi situasi lingkungan saat ini yang dilihat agen. Misalnya: posisi robot, posisi bidak catur, frame video game.

Action `a`

Pilihan yang bisa dilakukan agen di suatu state. Bisa diskrit (maju/mundur/kiri/kanan) atau kontinu (torsi motor 0–100%).

Reward `r`

Sinyal skalar dari lingkungan setelah agen melakukan aksi. Positif = bagus (menang, skor naik), negatif = buruk (jatuh, kalah). Ini *satu-satunya* sinyal pembelajaran.

Policy `π`

Strategi agen — fungsi yang memetakan state ke aksi: π(s) = a. Tujuan RL adalah menemukan policy optimal yang memaksimalkan cumulative reward.

**

**AlphaGo Zero (DeepMind, 2017)** — belajar bermain Go dari nol hanya dengan RL, tanpa data partai manusia sama sekali. Setelah 3 hari, ia mengalahkan AlphaGo versi sebelumnya (yang sudah mengalahkan juara dunia manusia) dengan skor 100-0.

06

#### Kapan Pakai ML — dan Kapan Tidak

ML bukan solusi untuk semua masalah. Memilih dengan tepat sama pentingnya dengan kemampuan teknis.

Salah satu skill paling berharga seorang ML practitioner adalah tahu kapan *tidak* menggunakan ML. ML butuh data, waktu, dan sumber daya — sering ada solusi lebih sederhana yang lebih baik.

** Gunakan ML

**

Aturan tidak bisa ditulis manual

Pengenalan wajah, pemahaman bahasa natural — terlalu kompleks untuk di-hardcode.

**

Data latih tersedia banyak

ML butuh data untuk belajar. Semakin banyak data berkualitas, semakin baik hasilnya.

**

Performa bisa diukur

Ada metrik jelas (accuracy, F1, RMSE) untuk menentukan apakah model cukup baik.

**

Pola bisa berubah seiring waktu

Model bisa di-retrain dengan data baru, sedangkan aturan statis butuh update manual.

** Jangan Pakai ML

**

Aturan sudah jelas dan simpel

if-else yang simpel lebih cepat, lebih mudah di-debug, dan lebih explainable dari model ML manapun.

**️

Data sangat sedikit

Model ML butuh data yang cukup untuk generalisasi. Dengan data terlalu sedikit, hasil tidak bisa dipercaya.

**

Interpretabilitas kritis

Sistem hukum, medis, keuangan sering butuh penjelasan tiap keputusan — "black box" tidak bisa diterima.

**

Biaya lebih besar dari manfaat

Mengumpulkan data, training, deployment, monitoring — semua berbiaya. Pastikan ROI-nya worth it.

Lesson berikutnya

##### Hipotesis & Model →

Sekarang kamu tahu APA itu ML — saatnya pelajari bahasa matematisnya. Apa itu hipotesis, ruang hipotesis H, dan bagaimana model diparameterisasi.

[Lanjut ke Hipotesis & Model](#/participant-ai-lab-ml-hypothesis)

## Kapasitas Model

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/legacy-lessons/ml-vc-dim.html`

01

#### Kapasitas Model

Tidak semua model sama fleksibelnya — bagaimana kita mengukurnya?

Model yang berbeda memiliki **kapasitas** yang berbeda — kemampuan untuk merepresentasikan fungsi yang beragam. Model dengan kapasitas terlalu rendah tidak bisa mempelajari pola yang ada. Model dengan kapasitas terlalu tinggi akan menghafal data latih termasuk noise-nya.

Terlalu rendah
Underfitting

Optimal ✓
Generalisasi baik

Terlalu tinggi
Overfitting

Kapasitas Rendah Kapasitas Tinggi

Pertanyaannya: bagaimana mengukur kapasitas secara *formal* dan *matematis*? Inilah yang dijawab oleh **VC-Dimension** — ukuran kapasitas paling fundamental dalam statistical learning theory.

‍

**Vladimir Vapnik & Alexey Chervonenkis (1971)** mengembangkan teori ini sebagai fondasi dari *Statistical Learning Theory*. Kerja mereka kemudian menjadi dasar dari Support Vector Machine (SVM) dan banyak algoritma modern lainnya.

02

#### Shatter & Definisi VC-Dimension

Konsep "memecah" (shattering) sebagai inti dari VC-dim

Untuk memahami VC-Dimension, kita perlu dulu memahami konsep **shatter**. Model H men-shatter N titik jika ia bisa mengklasifikasikan N titik tersebut dengan *semua kemungkinan pelabelan* yang ada.

Definisi · Shatter (Pemecahan)

Model H **men-shatter** N titik {x⁽¹⁾,...,x⁽ᴺ⁾} jika untuk *setiap* fungsi pelabelan y: {x⁽¹⁾,...,x⁽ᴺ⁾} → {0,1}, terdapat hipotesis h ∈ H yang konsisten dengan pelabelan tersebut.

∀ y: {x⁽¹⁾,...,x⁽ᴺ⁾} → {0,1}, ∃ h ∈ H: h(x⁽ⁱ⁾) = y(x⁽ⁱ⁾) ∀i

N titik → 2ᴺ kemungkinan pelabelan. H harus bisa handle SEMUA 2ᴺ kemungkinan.

Definisi · VC-Dimension

VC-Dimension dari model H, ditulis **VC(H)**, adalah jumlah titik *terbesar* yang bisa di-shatter oleh H.

VC(H) = max{ N | ∃ {x⁽¹⁾,...,x⁽ᴺ⁾} yang bisa di-shatter oleh H }

️ Interactive · Lihat Shatter Secara Langsung

Model Linear (Garis) — Bisa shatter 3 titik, tidak bisa 4

Jumlah titik:

2 titik

3 titik

4 titik

Pilih pelabelan:

✓ Bisa dipisahkan

2 titik 4 pelabelan ✓ Semua bisa dipisahkan

3 titik 8 pelabelan ✓ Semua bisa dipisahkan

4 titik 16 pelabelan ✗ XOR tidak bisa dipisahkan

Dalam graph lengkap dengan 4 simpul, selalu ada 2 edge yang bersilangan. Jika titik positif di ujung satu edge dan negatif di ujung edge lain yang bersilangan, tidak ada garis lurus yang bisa memisahkannya. Ini membuktikan **VC(H\_linear) \< 4**.

Berapa banyak pelabelan yang mungkin?

N titik

2ᴺ pelabelan

Model Linear bisa?

1

2

✓ Ya

2

4

✓ Ya

3

8

✓ Ya — VC-dim = 3

4

16

✗ Tidak

5

32

✗ Tidak

03

#### VC-Dim Model Linear di ℝⁿ = n+1

Bukti intuitif mengapa hyperplane di ℝⁿ memiliki VC-dim tepat n+1

Ini adalah hasil paling penting dalam teori VC: model linear (hyperplane) di ruang berdimensi n memiliki VC-Dimension tepat **n+1**. Artinya ia bisa men-shatter n+1 titik, tapi tidak bisa men-shatter n+2 titik.

Bukti Intuitif — VC(H\_linear di ℝⁿ) = n+1

Dua langkah: tunjukkan bisa shatter n+1, lalu tidak bisa n+2

✓

Bagian 1: H bisa shatter n+1 titik

Ada konfigurasi n+1 titik yang bisa di-shatter

Ambil n+1 titik: vektor basis standar e₁, e₂, ..., eₙ dan titik asal **0**.

Untuk setiap pelabelan y ∈ {0,1}ⁿ⁺¹, kita bisa membangun hyperplane pemisah. Menggunakan solusi sistem linear Wᵀxᵢ = yᵢ yang selalu memiliki solusi karena n+1 titik ini linearly independent.

Titik: {0, e₁, e₂, ..., eₙ} — n+1 titik linearly independent
 → Selalu ada hyperplane memisahkan semua 2ⁿ⁺¹ pelabelan

✗

Bagian 2: H tidak bisa shatter n+2 titik

Untuk sembarang n+2 titik, selalu ada pelabelan yang tidak bisa dipisahkan

Ambil sembarang n+2 titik di ℝⁿ. Karena dimensi ℝⁿ adalah n, pasti ada dependensi linear — satu titik bisa dinyatakan sebagai kombinasi linear titik lain:

x⁽ᵏ⁾ = Σᵢ αᵢ x⁽ⁱ⁾, dengan αᵢ ∈ ℝ

Pelabelan yang membuat titik-titik dengan koefisien positif (+) dan negatif (−) tidak bisa dipisahkan oleh hyperplane manapun — karena sifat linearitas.

ℝ¹

Threshold

VC = **2**

Garis bilangan — bisa shatter 2 titik, tidak 3

ℝ²

Garis Lurus

VC = **3**

Bidang — bisa shatter 3 titik, tidak 4 (XOR)

ℝ³

Hyperplane

VC = **4**

Ruang 3D — bisa shatter 4 titik, tidak 5

ℝⁿ

Hyperplane

VC = **n+1**

Rumus umum: n dimensi → VC = n+1

**Hubungan dengan Parameter:** Model linear di ℝⁿ memiliki n+1 parameter (n bobot + 1 bias). VC-dim = n+1 = jumlah parameter. Ini bukan kebetulan — secara umum, model dengan p parameter bebas cenderung memiliki VC-dim ≈ p. Tapi ini *bukan aturan pasti* — ada model dengan banyak parameter yang VC-dim-nya kecil.

04

#### VC-Dim Berbagai Model

Dari model sederhana hingga tak terhingga — perbandingan kapasitas

VC-Dimension berbeda-beda untuk setiap keluarga model. Tabel berikut adalah referensi penting yang harus dikuasai setiap ML practitioner.

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Model H
Ruang
VC(H)
Penjelasan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Threshold (f(x) = 𝟙[x ≥ θ])
<code>ℝ¹</code>
1
Hanya 1 titik yang bisa di-shatter</td>
<td align="left">Interval (𝟙[a ≤ x ≤ b])
<code>ℝ¹</code>
2
Bisa shatter 2 titik, tidak 3</td>
<td align="left">Garis lurus (linear classifier)
<code>ℝ²</code>
3
VC = n+1 = 2+1 = 3</td>
<td align="left">Hyperplane
<code>ℝⁿ</code>
n+1
Rumus umum: VC = dimensi + 1</td>
</tr>
</tbody>
</table>

️ Interactive · Perbandingan Kapasitas

Pilih model — lihat apa yang bisa dan tidak bisa ia shatter

Garis (VC=3)

Persegi (VC=4)

Lingkaran (VC=1)

VC-Dim = 3

Model garis lurus bisa men-shatter 3 titik (semua 8 pelabelan), tapi tidak bisa men-shatter 4 titik karena XOR tidak linearly separable.

05

#### Worked Problems — Hitung VC-Dim

Latihan formal: buktikan VC-dim dengan dua langkah — shatter N, gagal N+1

Membuktikan VC(H) = N selalu membutuhkan **dua langkah**: (1) tunjukkan ada konfigurasi N titik yang bisa di-shatter, dan (2) tunjukkan untuk sembarang N+1 titik, selalu ada pelabelan yang tidak bisa dipisahkan. Jika hanya langkah 1, itu hanya membuktikan VC(H) ≥ N.

✏️ Contoh 1 · Interval [a, b] di ℝ¹

Buktikan VC(H\_interval) = 2

✓

Langkah 1 — H bisa shatter 2 titik

Ambil 2 titik: x₁ \< x₂. Ada 4 pelabelan:

y₁y₂Interval yang memisahkan

00[∞, −∞] (kosong)✓

10[x₁−ε, x₁+ε]✓

01[x₂−ε, x₂+ε]✓

11[x₁−ε, x₂+ε]✓

Semua 2² = 4 pelabelan bisa direpresentasikan → H *shatter* 2 titik.

✗

Langkah 2 — H tidak bisa shatter 3 titik

Ambil sembarang 3 titik: x₁ \< x₂ \< x₃. Pertimbangkan pelabelan y = (1, 0, 1):

Agar x₁ positif, interval harus mencakup x₁. Agar x₃ positif, interval harus mencakup x₃. Tapi interval adalah *kontinu* — jika mencakup x₁ dan x₃, ia *pasti* mencakup x₂ di antaranya. Kontradiksi dengan y₂ = 0.

Pelabelan (1,0,1) ≡ XOR-like — tidak bisa direalisasikan oleh interval kontinu apapun.
∴ VC(H\_interval) \< 3, sehingga VC(H\_interval) = 2. □

✏️ Contoh 2 · Persegi Panjang Axis-Aligned di ℝ²

Buktikan VC(H\_rect) = 4

✓

Langkah 1 — H bisa shatter 4 titik

Ambil 4 titik membentuk "diamond" (bukan persegi): N, S, E, W. Untuk setiap subset titik yang ingin diberi label 1, ambil persegi panjang terkecil yang mencakup tepat titik-titik tersebut.

Semua 2⁴ = 16 pelabelan bisa direpresentasikan (termasuk ∅ = persegi panjang di luar semua titik).

✗

Langkah 2 — H tidak bisa shatter 5 titik

Ambil sembarang 5 titik. Dari 5 titik tersebut, selalu ada satu yang berada *di dalam* convex hull dari 4 titik lainnya. Sebut titik tersebut x\_mid.

Pertimbangkan pelabelan: semua titik luar = 1, x\_mid = 0. Persegi panjang apapun yang mencakup 4 titik luar *pasti* mencakup x\_mid juga. Tidak ada persegi panjang yang bisa merealisasikan pelabelan ini.

∴ VC(H\_rect) \< 5, sehingga VC(H\_rect) = 4. □

Contoh 3 · 1-Nearest Neighbor (Paradoks)

VC(H\_1NN) = ∞ — tapi parameternya 0!

1-NN tidak punya parameter yang dioptimalkan saat training. Tapi VC-dimensinya tak terhingga — ini membuktikan bahwa VC-dim ≠ jumlah parameter.

✓

1-NN bisa shatter N titik sembarang untuk N berapa saja

Untuk sembarang N titik dengan pelabelan apapun: 1-NN mengklasifikasikan setiap titik sesuai label titik terdekatnya di training set. Jika training set = test set, semua titik diklasifikasikan benar.

Untuk sembarang {x⁽¹⁾,...,x⁽ᴺ⁾} dan sembarang labeling y:
 h\_1NN dilatih pada {(x⁽ⁱ⁾, yᵢ)} → h\_1NN(x⁽ⁱ⁾) = yᵢ ∀i
 ∴ 1-NN shatter sembarang N titik → VC(H\_1NN) = ∞

Model\# ParameterVC-DimKeterangan

Linear ℝⁿn+1n+1Parameter = VC-dim

Polynomial degree dC(n+d,d)C(n+d,d)Sesuai jumlah parameter

1-Nearest Neighbor0∞0 parameter, kapasitas ∞!

Lookup TableN∞Menghafal data, tidak generalisasi

SVM (hard margin)n+1≤ R²/γ²VC-dim bergantung margin γ, bukan n!

**Pelajaran:** VC-dim mengukur kapasitas *fungsional*, bukan jumlah parameter. SVM bisa punya VC-dim kecil meski berdimensi tinggi — karena memaksimalkan margin γ secara efektif membatasi kapasitas. Inilah mengapa SVM generalisasi baik di ruang berdimensi tinggi.

Teori Lanjutan · Growth Function & Sauer's Lemma

Mengapa VC-dim cukup untuk karakterisasi learnability?

VC-dim bekerja melalui konsep **growth function** — jumlah maksimal pola berbeda yang bisa direalisasikan model pada N titik.

Definisi · Growth Function Π\_H(N)

Π\_H(N) = max<sub>{x⁽¹⁾,...,x⁽ᴺ⁾}</sub> |{ (h(x⁽¹⁾),...,h(x⁽ᴺ⁾)) | h ∈ H }|

Jumlah pola klasifikasi berbeda yang bisa dihasilkan H pada N titik terbaik

Sauer's Lemma (1972)

Jika VC(H) = d, maka:   Π\_H(N) ≤ Σₖ₌₀ᵈ C(N,k) ≤ (eN/d)ᵈ

Jika N ≤ d: Π\_H(N) = 2ᴺ — semua pelabelan mungkin (exponential)

Jika N \> d: Π\_H(N) ≤ O(Nᵈ) — polynomial dalam N! Growth "patah"

"Patahnya" growth function dari exponential ke polynomial inilah yang memungkinkan generalisasi. Model dengan VC-dim terhingga *pasti* bisa belajar dengan data yang cukup.

06

#### VC-Dim & Batas Atas Error Generalisasi

Teorema fundamental: hubungan antara kapasitas, data, dan kemampuan belajar

VC-Dimension bukan hanya ukuran teoretis — ia memberikan **batas atas (upper bound)** yang dapat dihitung untuk error generalisasi model kita. Ini adalah jantung dari Statistical Learning Theory.

Teorema · VC Generalization Bound

E\*(h) ≤ E(h|D) + √( VC(H)·[log(2N/VC(H)) + 1] − log(η/4) ) / N

E\*(h)Error generalisasi (yang ingin kita minimasi)

E(h|D)Empirical error pada training data

VC(H)VC-Dimension model

NJumlah training examples

ηProbabilitas bound tidak berlaku (biasanya 0.05)

Bound ini berlaku dengan probabilitas ≥ 1−η untuk semua h ∈ H secara simultan.

Kalkulator · VC Bound Real-time

Lihat bagaimana N dan VC(H) mempengaruhi batas error

Training examples N 100

VC-Dimension VC(H) 5

Empirical error E(h|D) 5%

Complexity penalty (VC confidence) —

Empirical error 5%

Batas atas error generalisasi —

── Empirical error ── Complexity penalty ── Upper bound generalisasi ── True generalization error (approx)

Lebih banyak data N → bound lebih ketat

Complexity penalty ∝ 1/√N. Dengan N → ∞, bound mendekati empirical error. Ini membenarkan "lebih banyak data selalu membantu".

⬆️

VC(H) lebih besar → bound lebih longgar

Model dengan kapasitas tinggi punya complexity penalty lebih besar. Bahkan jika empirical error = 0, bound generalisasi bisa sangat besar.

⚖️

Tradeoff fundamental

Kapasitas lebih besar → empirical error lebih kecil, tapi complexity penalty lebih besar. Kapasitas optimal meminimalkan jumlah keduanya.

07

#### Structural Risk Minimization (SRM)

Menggunakan VC-bound untuk memilih model yang optimal

VC bound memberikan resep praktis untuk pemilihan model: pilih model yang meminimalkan *jumlah* empirical error dan complexity penalty. Prinsip ini disebut **Structural Risk Minimization (SRM)**.

── Empirical error E(h|D) — turun seiring kapasitas naik

── VC confidence — naik seiring kapasitas naik

── Upper bound E\* = E(h|D) + VC confidence

★ Model optimal H\* — minimum upper bound

1

Susun keluarga model H₁ ⊂ H₂ ⊂ ... ⊂ Hₙ

Urutkan model dari VC-dim kecil ke besar: VC(H₁) ≤ VC(H₂) ≤ ... ≤ VC(Hₙ). Contoh: linear → polynomial degree 2 → degree 3 → ...

2

Untuk setiap Hₖ, latih hipotesis terbaik hₖ\*

hₖ\* = argmin E(h|D) untuk h ∈ Hₖ. Hitung empirical error E(hₖ\*|D) dan VC confidence Ωₖ = f(VC(Hₖ), N).

3

Pilih k\* yang meminimalkan E(hₖ\*|D) + Ωₖ

Model optimal adalah yang meminimalkan batas atas generalisasi, bukan hanya empirical error. Ini secara eksplisit mencegah overfitting.

**Mengapa SVM optimal secara VC?** Support Vector Machine secara eksplisit memaksimalkan margin — dan terbukti bahwa memaksimalkan margin ekuivalen dengan meminimalkan VC-dimension yang efektif, yang meminimalkan upper bound generalisasi. Ini adalah alasan matematis mengapa SVM bekerja dengan baik bahkan di dimensi tinggi.

⚠️ Keterbatasan VC-Dimension

**Bound sangat pesimistis** — dalam praktik, model sering generalisasi jauh lebih baik dari yang dijamin bound. VC bound adalah *worst-case*.

**Mengabaikan distribusi data** — VC-dim tidak memperhitungkan bahwa beberapa pelabelan lebih mungkin daripada yang lain.

**Sulit dihitung** — untuk model kompleks seperti deep neural network, menghitung VC-dim eksak sangat sulit. Alternatif modern: Rademacher complexity, PAC-Bayes bounds.

Lesson berikutnya

##### Bias-Variance Tradeoff →

VC-dim memberi kita upper bound teoritis. Bias-Variance decomposition memberi perspektif berbeda — bagaimana error model bisa didekomposisi menjadi komponen yang bisa dianalisis dan diminimasi.

[Lanjut ke Bias-Variance](#/participant-ai-lab-ml-bias-variance)

## Machine Learning

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/legacy-overview.html`

****

### Machine Learning

Dari regresi linear hingga neural network — kurikulum lengkap untuk membangun fondasi ML yang kuat.

** 8 Modul ** 50+ Topik **** AI Lab · Marchel Andrian Shevchenko**

![HerAI ML learning](/assets/messaging/herai-chat-persona.png)

01

Foundation

#### Pengantar Machine Learning

Sebelum menyentuh algoritma apapun, pahami dulu apa yang sebenarnya dilakukan ML — dan mengapa cara berpikirnya berbeda dari pemrograman biasa.

**

##### [Apa itu Machine Learning?](#/participant-ai-lab-ml-intro)

Perbedaan fundamental antara pemrograman klasik dan ML — dari aturan eksplisit ke induksi dari data. Tiga paradigma utama: supervised, unsupervised, dan reinforcement learning. Kapan ML adalah solusi yang tepat, dan kapan tidak.

SupervisedUnsupervisedReinforcementInductive Learning

**

##### [Hipotesis, Model & Ruang Fitur](#/participant-ai-lab-ml-hypothesis)

Mendefinisikan contoh latih sebagai vektor fitur x ∈ ℝⁿ. Hipotesis h: X → Y sebagai fungsi yang diinduksi dari data. Perbedaan antara model (ruang hipotesis H) dan hipotesis konkret (satu fungsi dengan parameter θ tetap).

Feature VectorHypothesisTraining SetInstance Space

**

##### [VC Dimension & Kapasitas Model](#/participant-ai-lab-ml-vc-dim)

Vapnik-Chervonenkis dimension sebagai ukuran kapasitas model — berapa banyak titik yang bisa di-shatter oleh H. Mengapa model linear di ℝⁿ memiliki VC-dim = n+1. Hubungan antara VC-dim dengan kemampuan generalisasi dan upper bound error.

VC-DimensionShatterModel CapacityStatistical Learning

**

##### [Bias-Variance Tradeoff](#/participant-ai-lab-ml-bias-variance)

Overfitting terjadi saat model terlalu kompleks — menghafal noise, generalisasi buruk. Underfitting saat model terlalu sederhana. Induktif bias sebagai asumsi yang memungkinkan generalisasi. The No Free Lunch Theorem: tidak ada algoritma terbaik untuk semua masalah.

OverfittingUnderfittingBiasVarianceNo Free Lunch

02

Core Concept

#### Supervised Learning

Kerangka kerja paling umum dalam ML — belajar dari data berlabel untuk memprediksi label baru.

**

##### Komponen Algoritma ML

Tiga komponen yang mendefinisikan setiap algoritma supervised learning: (1) Model H — ruang hipotesis yang dibatasi, (2) Fungsi Loss L — mengukur kesalahan prediksi, (3) Prosedur Optimisasi — mencari parameter θ optimal. Pilihan ketiganya menentukan induktif bias.

ModelLoss FunctionOptimizationEmpirical Risk

**

##### Model Selection & Cross-Validation

Memisahkan data ke training set dan validation set. k-Fold cross-validation untuk estimasi error generalisasi yang lebih robust. Prinsip Structural Risk Minimization (SRM), Akaike Information Criterion (AIC), dan Bayesian Information Criterion (BIC).

k-Fold CVTrain/Val/TestSRMAICBIC

    from sklearn.model_selection import cross_val_score
    scores = cross_val_score(model, X, y, cv=5)
    # Rata-rata akurasi 5-fold
    print(scores.mean(), scores.std())

**

##### Generatif vs Diskriminatif

Model generatif memodelkan distribusi gabungan P(x, Cⱼ) — bisa generate data baru, interpretable. Model diskriminatif langsung memodelkan P(Cⱼ|x) — akurasi lebih tinggi. Model parametrik vs non-parametrik, dan model linear vs non-linear.

GeneratifDiskriminatifParametrikNon-parametrik

03

Algorithm

#### Regresi & Klasifikasi Dasar

Algoritma paling fundamental — yang masih relevan dan dipakai di production hingga hari ini.

**

##### Linear & Polynomial Regression

Memodelkan hubungan antara fitur dan nilai kontinu. Metode Least Squares — meminimalkan jumlah kuadrat residual. Solusi analitik via Moore-Penrose pseudoinverse: w = (XᵀX)⁻¹Xᵀy. Regresi polinomial sebagai perluasan dengan fitur x², x³.

Least SquaresPseudoinversePolynomialResiduals

    import numpy as np
    # Solusi analitik least squares
    w = np.linalg.lstsq(X, y, rcond=None)[0]
    y_pred = X @ w  # prediksi

**

##### Decision Trees & Ensembles

Pohon keputusan mempartisi ruang fitur secara rekursif menggunakan kriteria Information Gain / Gini Impurity. Random Forest menggabungkan banyak pohon dengan bagging. Gradient Boosting (XGBoost, LightGBM) membangun pohon secara sekuensial — state-of-the-art untuk data tabular.

Information GainGiniRandom ForestXGBoostBagging

    from sklearn.ensemble import RandomForestClassifier
    rf = RandomForestClassifier(n_estimators=100, max_depth=5)
    rf.fit(X_train, y_train)
    importance = rf.feature_importances_

**

##### k-Nearest Neighbors (k-NN)

Algoritma non-parametrik — tidak ada fase training, semua kerja dilakukan saat prediksi. Klasifikasi berdasarkan mayoritas k tetangga terdekat menggunakan jarak Euclidean / Manhattan. Curse of dimensionality dan kompleksitas O(N·n) per prediksi.

k-NNEuclidean DistanceLazy LearningCurse of Dim.

04

Probabilistic

#### Probabilistic Models

Menggunakan teori probabilitas untuk membangun model yang bisa mengekspresikan ketidakpastian prediksi.

**

##### Teori Probabilitas untuk ML

Ekspektasi, variansi, dan independensi variabel. Distribusi Bernoulli, Multinomial, dan Gaussian sebagai building blocks. Maximum Likelihood Estimation (MLE) untuk mengoptimalkan parameter — "pilih parameter yang paling memungkinkan data yang kita amati terjadi".

MLEGaussianBernoulliEkspektasiVariansi

**

##### Naive Bayes Classifier

Menggunakan Teorema Bayes: P(Cⱼ|x) ∝ P(x|Cⱼ)·P(Cⱼ). Asumsi "naif" — semua fitur independen secara kondisional diberikan kelas. Gaussian NB untuk variabel kontinu. Laplace smoothing untuk mengatasi zero probability. Sangat efektif untuk text classification.

Bayes TheoremCond. IndependenceGaussian NBLaplace Smoothing

    from sklearn.naive_bayes import GaussianNB
    clf = GaussianNB()
    clf.fit(X_train, y_train)
    proba = clf.predict_proba(X_test)

**

##### Bayesian Networks

Semi-Naive Bayes yang memodelkan dependensi antar fitur menggunakan Directed Acyclic Graph (DAG). Algoritma FSSJ dan TAN (Tree-Augmented Naive Bayes) untuk membangun struktur jaringan secara otomatis dari data menggunakan Mutual Information.

DAGTANFSSJMarkov BlanketMutual Information

05

**Industry Core

#### Linear Discriminative Models

Model yang langsung memodelkan batas keputusan — lebih sederhana, sering lebih akurat dari model generatif.

**

##### Generalized Linear Model

Perluasan regresi linear untuk klasifikasi via fungsi aktivasi f: h(x) = f(wᵀx + w₀). Geometri hyperplane pemisah di ruang n-dimensi — w sebagai normal hyperplane. Klasifikasi multi-kelas dengan strategi one-vs-rest dan one-vs-one.

HyperplaneDecision BoundaryOne-vs-RestMulti-class

**

##### Logistic Regression

Model diskriminatif probabilistik — output adalah P(C₁|x) = σ(wᵀx + w₀). Fungsi sigmoid mengubah output linear ke [0,1]. Cross-entropy loss sebagai fungsi objektif yang konveks. Gradient descent dan SGD untuk optimisasi. Regularisasi L1 (Lasso) dan L2 (Ridge).

SigmoidCross-EntropyGradient DescentL1/L2 RegSGD

    from sklearn.linear_model import LogisticRegression
    clf = LogisticRegression(C=1.0, penalty='l2')
    clf.fit(X_train, y_train)
    y_prob = clf.predict_proba(X_test)[:,1]

**

##### Evaluasi Model Klasifikasi

Confusion matrix sebagai fondasi: TP, TN, FP, FN. Precision dan Recall — trade-off bergantung pada domain. F1-score sebagai harmonic mean. ROC curve dan AUC untuk evaluasi threshold-independent. Strategi untuk imbalanced dataset: oversampling (SMOTE), undersampling, class weights.

Confusion MatrixPrecisionRecallF1ROC-AUC

06

Advanced

#### Support Vector Machine

Algoritma klasifikasi yang elegan secara matematis — memaksimalkan margin untuk generalisasi terbaik.

Hard Margin SVM

Data harus linearly separable sempurna. Tidak ada toleransi misklasifikasi.

-   Margin maksimum: 2/||w||
-   Kendala ketat per sampel
-   Sensitif terhadap outlier

Teoretis

VS

Soft Margin SVM

Toleransi misklasifikasi terkontrol via parameter C.

-   Slack variables ξᵢ ≥ 0
-   C besar = margin kecil, fit ketat
-   Robust terhadap noise

Production

**

##### Maximum Margin Hyperplane

Formulasi sebagai masalah optimisasi kuadratik — meminimalkan (1/2)||w||² subject to constraint klasifikasi. Metode Lagrange Multipliers mengubahnya ke dual problem. Support vectors sebagai titik kritis — menghapus titik lain tidak mengubah solusi.

Quadratic ProgrammingLagrangeSupport VectorsDual Problem

**

##### Kernel Trick

Untuk data non-linearly separable: peta ke ruang berdimensi tinggi via fungsi kernel K(x,x') = φ(x)ᵀφ(x') tanpa eksplisit menghitung φ(x). Mercer's theorem sebagai kondisi kernel valid. Polynomial K(x,x') = (xᵀx'+c)ᵈ, Gaussian RBF exp(-||x-x'||²/2σ²).

Kernel TrickRBF KernelPolynomial KernelMercer Theorem

    from sklearn.svm import SVC
    svm = SVC(kernel='rbf', C=1.0, gamma='scale')
    svm.fit(X_train, y_train)
    score = svm.decision_function(X_test)

07

**Must Know

#### Neural Networks

Dari perceptron satu neuron hingga deep network berlapis — fondasi semua arsitektur AI modern.

1958

Perceptron

Frank Rosenblatt

→

1986

Backprop

Rumelhart et al.

→

1989

MLP

Universal Approx.

→

2012

Deep Learning

AlexNet, GPU era

→

2017+

Transformers

Attention is all

**

##### Single Layer Perceptron

Unit komputasi terinspirasi neuron biologis: net input z = wᵀx + w₀, lalu fungsi aktivasi f(z). Perceptron Learning Rule — update bobot berdasarkan error: w ← w + η·(y - ŷ)·x. Dijamin konvergen jika data linearly separable (Perceptron Convergence Theorem). Keterbatasan: tidak bisa memecahkan XOR.

Perceptron RuleStep FunctionConvergence TheoremLinear Separability

    # Perceptron learning rule
    for x, y in training_data:
        y_hat = step(w @ x + w0)
        error = y - y_hat
        w  += lr * error * x
        w0 += lr * error

**

##### Multi-Layer Perceptron (MLP)

Menyusun layer perceptron: input → hidden layers → output. Forward pass: z⁽ˡ⁾ = W⁽ˡ⁾a⁽ˡ⁻¹⁾ + b⁽ˡ⁾, a⁽ˡ⁾ = f(z⁽ˡ⁾). Fungsi aktivasi non-linear (ReLU, Sigmoid, Tanh, Softmax) — krusial agar network bukan sekadar regresi linear. Universal Approximation Theorem.

Forward PassReLUSoftmaxHidden LayerUniversal Approx.

**

##### Backpropagation

Algoritma efisien untuk menghitung gradien ∂L/∂W⁽ˡ⁾ menggunakan chain rule mundur dari output ke input. Error term: δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾)ᵀδ⁽ˡ⁺¹⁾ ⊙ f'(z⁽ˡ⁾). Masalah vanishing/exploding gradient — diatasi dengan ReLU, BatchNorm, dan gradient clipping.

Chain RuleGradientVanishing GradientBatchNorm

**

##### Optimisasi & Regularisasi

SGD dengan momentum, RMSprop, dan Adam sebagai optimizer modern. Mini-batch training untuk keseimbangan kecepatan dan stabilitas. Dropout — mematikan neuron secara acak saat training. Batch Normalization, weight decay, dan early stopping.

AdamSGD + MomentumDropoutWeight DecayEarly Stopping

    import torch.nn as nn, torch.optim as optim
    model = nn.Sequential(
        nn.Linear(128, 64), nn.ReLU(), nn.Dropout(0.3),
        nn.Linear(64, 10)
    )
    optimizer = optim.Adam(model.parameters(), lr=1e-3)

08

Unsupervised

#### Unsupervised Learning

Menemukan struktur tersembunyi dalam data tanpa label — clustering, dimensionality reduction, dan density estimation.

**

##### K-Means Clustering

Mempartisi data ke K cluster dengan meminimalkan intra-cluster variance. Algoritma iteratif: (1) assign tiap titik ke centroid terdekat, (2) update centroid sebagai rata-rata cluster. K-Medoids sebagai varian robust terhadap outlier. Pemilihan K via Elbow method dan Silhouette score.

K-MeansK-MedoidsElbow MethodSilhouetteInertia

    from sklearn.cluster import KMeans
    km = KMeans(n_clusters=3, random_state=42)
    labels = km.fit_predict(X)
    centers = km.cluster_centers_

**

##### Hierarchical & Density Clustering

Agglomerative clustering membangun dendrogram — tidak perlu menentukan K di awal. Linkage criteria: single, complete, average, Ward. DBSCAN menemukan cluster dengan bentuk arbitrer berdasarkan density — robust terhadap noise, tidak butuh K.

DendrogramAgglomerativeDBSCANWard Linkage

**

##### Gaussian Mixture Models & EM

Memodelkan data sebagai campuran K distribusi Gaussian. Algoritma Expectation-Maximization (EM): E-step menghitung probabilitas keanggotaan (soft assignment), M-step mengupdate parameter μ, Σ, π. PCA dan t-SNE untuk visualisasi dan dimensionality reduction.

GMMEM AlgorithmSoft ClusteringPCAt-SNE

Isi Materi

-   [01Pengantar ML](#m1)
-   [02Supervised Learning](#m2)
-   [03Regresi & Klasifikasi](#m3)
-   [04Probabilistic Models](#m4)
-   [05Linear Discriminative](#m5)
-   [06Support Vector Machine](#m6)
-   [07Neural Networks](#m7)
-   [08Unsupervised Learning](#m8)

Progress0% ******

Selanjutnya di AI Lab

##### Computer Vision →

Ajarkan mesin untuk melihat dan memahami dunia visual — dari piksel mentah hingga deteksi real-time.

[Lanjutkan →](#/participant-ai-lab-cv)

## materi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/materi.html`

Topik aktif **Pengantar Machine Learning**

**

Memuat materi Machine Learning...

** Topik Sebelumnya

Topik Selanjutnya **

[Buka Latihan **](#/participant-ai-lab-ml-practice)

## Konten Dinamis dan Interaktif

> Data berikut diekstrak dari JavaScript runtime untuk `ml`, termasuk teks yang baru muncul setelah interaksi.

#### CHAPTERS

#### Pengantar Machine Learning

- **number:** 1
- **route:** /participant-ai-lab-ml-intro
- **title:** Pengantar Machine Learning
- **shortTitle:** Pengantar

#### Supervised Learning

- **number:** 2
- **route:** /participant-ai-lab-ml-supervised
- **aliases:** /participant-ai-lab-ml-hypothesis
- **title:** Supervised Learning
- **shortTitle:** Supervised

#### Regresi & Klasifikasi Dasar

- **number:** 3
- **route:** /participant-ai-lab-ml-regression-classification
- **aliases:** /participant-ai-lab-ml-vc-dim, /participant-ai-lab-ml-bias-variance
- **title:** Regresi & Klasifikasi Dasar
- **shortTitle:** Regresi & Klasifikasi

#### Probabilistic Models

- **number:** 4
- **route:** /participant-ai-lab-ml-probabilistic
- **title:** Probabilistic Models
- **shortTitle:** Probabilistic

#### Linear Discriminative Models

- **number:** 5
- **route:** /participant-ai-lab-ml-linear-discriminative
- **title:** Linear Discriminative Models
- **shortTitle:** Linear Models

#### Support Vector Machine

- **number:** 6
- **route:** /participant-ai-lab-ml-svm
- **title:** Support Vector Machine
- **shortTitle:** SVM

#### Neural Networks

- **number:** 7
- **route:** /participant-ai-lab-ml-neural-networks
- **title:** Neural Networks
- **shortTitle:** Neural Networks

#### Unsupervised Learning

- **number:** 8
- **route:** /participant-ai-lab-ml-unsupervised
- **title:** Unsupervised Learning
- **shortTitle:** Unsupervised

#### DISCUSSION_PROMPTS

- Ceritakan satu kasus di sekitarmu yang cocok diselesaikan dengan ML, bukan rule-based biasa.
- Bagaimana kamu menentukan fitur, label, loss, dan metrik untuk masalah supervised learning?
- Kapan kamu memilih regresi, klasifikasi, decision tree, random forest, atau k-NN?
- Apa risiko asumsi independen pada Naive Bayes, dan kapan asumsi itu masih berguna?
- Mana yang lebih penting untuk kasus sensitif: akurasi tinggi, recall tinggi, atau model yang mudah dijelaskan?
- Bagaimana margin, support vector, dan kernel membantu SVM memisahkan data non-linear?
- Apa tantangan utama melatih neural network agar tidak overfit atau gagal belajar?
- Kapan clustering atau reduksi dimensi lebih tepat dibanding supervised learning?
