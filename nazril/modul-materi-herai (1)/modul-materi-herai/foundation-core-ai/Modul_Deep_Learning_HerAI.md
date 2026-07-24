---
course_id: deep-learning
title: Deep Learning
slug: deep-learning
category: Foundation and Core AI
sub_category: Machine Learning
level: Intermediate
language: id
status: ready
version: 1.0.0
estimated_duration: 18-22 jam
route: /participant/courses/deep-learning
updated_at: 2026-07-23
---

# Deep Learning

> Modul belajar praktis dan mudah dipahami untuk peserta HerAI Fellowship. Materi dimulai dari konsep neuron dan proses training, kemudian berlanjut ke regularisasi, CNN, RNN, Transformer, evaluasi, implementasi, dan mini project klasifikasi gambar.

## Informasi Course

| Komponen | Keterangan |
|---|---|
| Level | Intermediate |
| Estimasi belajar | 18-22 jam |
| Prasyarat | Python dasar, matematika dasar, dan konsep machine learning |
| Bentuk pembelajaran | Materi, analogi, contoh, latihan, checkpoint, kuis, diskusi, dan mini project |
| Hasil akhir | Peserta mampu memahami, melatih, mengevaluasi, dan mendokumentasikan model deep learning sederhana |

## Tentang Modul Ini

Modul ini dirancang untuk membantu peserta memahami deep learning secara bertahap. Setiap konsep dijelaskan menggunakan bahasa sederhana, analogi, contoh, latihan, dan checkpoint pemahaman.

Fokus modul bukan menghafal rumus. Tujuan utamanya adalah memahami apa yang terjadi ketika sebuah neural network menerima data, membuat prediksi, melakukan kesalahan, lalu memperbaiki dirinya melalui proses training.

> **Cara belajar yang disarankan:** baca satu bab, kerjakan checkpoint tanpa melihat materi, kemudian praktikkan latihan. Jangan terburu-buru menuju kode sebelum memahami alur data dan tujuan setiap komponen.

## Capaian Pembelajaran

Setelah menyelesaikan modul ini, peserta diharapkan mampu:

1. Menjelaskan perbedaan machine learning dan deep learning.
2. Memahami neuron, layer, activation function, loss function, dan optimizer.
3. Menjelaskan forward propagation dan backpropagation secara intuitif.
4. Menyusun training loop dan membaca gejala training yang bermasalah.
5. Mengurangi overfitting dengan regularisasi dan data augmentation.
6. Memahami cara kerja dasar CNN, RNN, dan Transformer.
7. Mengevaluasi model menggunakan metrik yang sesuai.
8. Membangun mini project klasifikasi gambar dari persiapan data hingga laporan hasil.

## Prasyarat

Peserta sebaiknya sudah mengenal variabel, fungsi, list, loop, dan library Python dasar. Pemahaman tentang train-test split, fitur, label, serta supervised learning akan sangat membantu.

> **Tidak harus ahli matematika:** cukup pahami operasi dasar, grafik, rata-rata, dan intuisi turunan sebagai arah perubahan. Rumus digunakan untuk memperjelas ide, bukan untuk membebani proses belajar.

## Peta Materi

1. Pengantar Deep Learning
2. Neuron dan Arsitektur Dasar
3. Forward Propagation, Loss, dan Backpropagation
4. Training dan Optimizer
5. Regularisasi dan Generalisasi
6. Convolutional Neural Network
7. RNN dan Data Berurutan
8. Transformer Dasar
9. Evaluasi dan Implementasi
10. Mini Project Klasifikasi Gambar
11. Kuis Akhir
12. Diskusi dan Refleksi
13. Glosarium
14. Ringkasan Cepat
15. Referensi Belajar

---

# Bab 1 - Pengantar Deep Learning

Mengenali masalah yang cocok diselesaikan menggunakan neural network bertingkat.

## 1.1 Apa Itu Deep Learning?

Deep learning adalah bagian dari machine learning yang menggunakan neural network dengan banyak lapisan. Istilah *deep* mengacu pada banyaknya tahapan pemrosesan yang dilalui data, bukan berarti model selalu lebih pintar.

Pada machine learning klasik, manusia sering menentukan fitur terlebih dahulu. Contohnya, untuk mengenali gambar kucing, kita mungkin merancang fitur tentang bentuk telinga, panjang kumis, atau warna bulu. Pada deep learning, model belajar sendiri pola yang berguna langsung dari data, selama tersedia data dan proses training yang memadai.

> **Analogi sederhana:** bayangkan seorang peserta belajar mengenali buah. Pada awalnya ia melihat warna. Setelah berlatih, ia juga memperhatikan tekstur, bentuk, ukuran, dan pola permukaan. Lapisan neural network bekerja serupa: lapisan awal menangkap pola sederhana, sedangkan lapisan lebih dalam menggabungkannya menjadi pola yang lebih kompleks.

## 1.2 Machine Learning vs Deep Learning

| Aspek | Machine Learning Klasik | Deep Learning |
|---|---|---|
| Fitur | Sering dirancang manual | Banyak fitur dipelajari otomatis |
| Kebutuhan data | Dapat bekerja dengan data lebih sedikit | Biasanya membutuhkan data lebih banyak |
| Komputasi | Relatif ringan | Sering membutuhkan GPU atau akselerator |
| Interpretasi | Sering lebih mudah dijelaskan | Sering lebih sulit dijelaskan |
| Data kompleks | Terbatas pada fitur yang dirancang | Sangat kuat untuk gambar, suara, teks, dan multimodal |

## 1.3 Kapan Deep Learning Layak Digunakan?

Deep learning layak dipertimbangkan ketika:

- Data berupa gambar, suara, teks panjang, video, atau gabungan beberapa jenis data.
- Pola sulit dirancang secara manual, tetapi tersedia banyak contoh data.
- Masalah membutuhkan representasi yang kompleks, misalnya deteksi objek atau pemahaman bahasa.
- Tersedia sumber daya komputasi dan waktu eksperimen yang cukup.

> **Tidak selalu menjadi pilihan terbaik:** untuk data tabular kecil, model seperti logistic regression, decision tree, random forest, atau gradient boosting dapat lebih cepat, lebih murah, dan lebih mudah dijelaskan.

## 1.4 Contoh Penerapan

| Bidang | Contoh masalah | Output model |
|---|---|---|
| Computer Vision | Klasifikasi penyakit dari citra medis | Probabilitas kelas atau lokasi objek |
| Natural Language Processing | Klasifikasi sentimen atau ringkasan teks | Label, skor, atau teks baru |
| Speech | Mengubah suara menjadi teks | Transkripsi |
| Rekomendasi | Memprediksi konten yang relevan | Skor atau peringkat item |
| Forecasting | Memprediksi permintaan atau beban | Nilai numerik masa depan |

## Checkpoint Bab 1

1. Mengapa deep learning disebut *deep*?
2. Apa kelemahan menggunakan deep learning pada dataset yang sangat kecil?
3. Sebutkan satu kondisi ketika model klasik lebih masuk akal daripada neural network.

## Latihan Bab 1 - Memilih Pendekatan yang Tepat

**Tujuan:** melatih kemampuan memilih apakah suatu masalah memerlukan deep learning.

**Tingkat kesulitan:** Dasar

Gunakan tiga kasus berikut:

1. Prediksi kelulusan dari 500 baris data tabular.
2. Klasifikasi 100.000 gambar produk.
3. Deteksi spam dari 2.000 email.

Untuk setiap kasus:

- Tuliskan kandidat model awal yang paling sederhana.
- Jelaskan alasan pemilihannya.
- Jelaskan kapan deep learning baru layak dicoba.
- Tuliskan risiko penggunaan deep learning.

**Hasil yang dikumpulkan:** tabel berisi kasus, pendekatan awal, alasan, dan risiko penggunaan deep learning.

---

# Bab 2 - Neuron dan Arsitektur Dasar

Membongkar neural network menjadi komponen kecil yang mudah dipahami.

## 2.1 Neuron Buatan

Neuron buatan menerima beberapa nilai input. Setiap input dikalikan dengan bobot. Hasilnya dijumlahkan bersama sebuah bias. Nilai tersebut kemudian dilewatkan melalui activation function untuk menghasilkan output.

Bobot menunjukkan seberapa kuat pengaruh sebuah input. Bias memberi fleksibilitas agar neuron tidak selalu bergantung pada titik nol.

Rumus sederhana neuron:

```text
z = (x1 × w1) + (x2 × w2) + ... + b
y = activation(z)
```

> **Analogi panel penilaian:** bayangkan beberapa juri memberi nilai pada sebuah proposal. Setiap juri memiliki bobot berbeda. Bias adalah kecenderungan awal panel. Activation function menentukan apakah skor akhir cukup kuat untuk diteruskan.

## 2.2 Layer: Input, Hidden, dan Output

| Jenis layer | Peran | Contoh |
|---|---|---|
| Input layer | Menerima data awal | 784 nilai piksel untuk gambar 28 × 28 |
| Hidden layer | Mengubah representasi data | Menggabungkan garis menjadi bentuk |
| Output layer | Menghasilkan prediksi | 10 probabilitas untuk digit 0-9 |

Sebuah jaringan disebut *fully connected* ketika setiap neuron pada satu layer terhubung ke seluruh neuron di layer berikutnya. Arsitektur ini sederhana, tetapi jumlah parameternya dapat membesar dengan cepat.

## 2.3 Activation Function

| Aktivasi | Intuisi | Umum digunakan untuk |
|---|---|---|
| ReLU | Nilai negatif menjadi 0; nilai positif diteruskan | Hidden layer pada banyak model |
| Sigmoid | Mengubah nilai menjadi rentang 0 sampai 1 | Output klasifikasi biner |
| Tanh | Mengubah nilai menjadi rentang -1 sampai 1 | Beberapa model berurutan |
| Softmax | Mengubah sekumpulan skor menjadi probabilitas | Output klasifikasi multikelas |

> **Mengapa aktivasi penting?** Tanpa activation function non-linear, tumpukan banyak layer tetap setara dengan satu transformasi linear. Model tidak akan mampu mempelajari hubungan yang kompleks.

## 2.4 Parameter dan Hyperparameter

| Jenis | Dipelajari model? | Contoh |
|---|---|---|
| Parameter | Ya | Weight dan bias |
| Hyperparameter | Tidak; ditentukan sebelum atau selama eksperimen | Learning rate, batch size, jumlah layer, dropout rate |

## 2.5 Menghitung Jumlah Parameter

Untuk dense layer dengan 8 input dan 4 neuron output, jumlah weight adalah `8 × 4`. Setiap neuron output juga memiliki satu bias, sehingga total parameter adalah:

```text
jumlah_parameter = (jumlah_input × jumlah_neuron) + jumlah_neuron
jumlah_parameter = (8 × 4) + 4 = 36
```

## Checkpoint Bab 2

1. Apa perbedaan weight dan bias?
2. Mengapa ReLU sering digunakan pada hidden layer?
3. Berapa jumlah parameter pada dense layer dengan 10 input dan 3 output?

## Latihan Bab 2 - Membaca Arsitektur

**Tujuan:** mengenali bentuk tensor dan jumlah parameter pada neural network sederhana.

**Tingkat kesulitan:** Dasar

Gunakan arsitektur berikut:

```text
Input 20 fitur
→ Hidden layer 16 neuron
→ Hidden layer 8 neuron
→ Output 3 kelas
```

Kerjakan hal berikut:

1. Hitung jumlah parameter pada setiap layer.
2. Tentukan activation function yang masuk akal untuk hidden dan output layer.
3. Jelaskan bentuk output untuk satu sampel.

**Hasil yang dikumpulkan:** perhitungan parameter, pilihan activation function, dan penjelasan bentuk output.

---

# Bab 3 - Forward Propagation, Loss, dan Backpropagation

Memahami bagaimana prediksi dibuat dan bagaimana kesalahan digunakan untuk belajar.

## 3.1 Forward Propagation

Forward propagation adalah aliran data dari input menuju output. Setiap layer menerima nilai dari layer sebelumnya, melakukan transformasi, kemudian meneruskan hasilnya.

Pada tahap ini model belum memperbaiki apa pun. Model hanya menggunakan weight dan bias saat ini untuk menghasilkan prediksi.

```text
Input
→ transformasi linear
→ activation function
→ hidden representation
→ output
→ prediksi
```

## 3.2 Loss Function

Loss function mengukur seberapa jauh prediksi model dari jawaban benar. Nilai loss kecil berarti prediksi lebih dekat dengan target. Training bertujuan menurunkan loss secara bertahap.

| Masalah | Loss yang umum | Contoh |
|---|---|---|
| Regresi | Mean Squared Error | Prediksi harga rumah |
| Klasifikasi biner | Binary Cross-Entropy | Spam atau bukan spam |
| Klasifikasi multikelas | Categorical Cross-Entropy | Kelas digit 0-9 |

> **Loss bukan accuracy:** accuracy menghitung proporsi prediksi benar. Loss memperhatikan tingkat keyakinan model dan memberi sinyal yang lebih halus untuk proses belajar.

## 3.3 Gradient

Gradient menunjukkan arah dan besar perubahan loss terhadap sebuah parameter. Jika gradient positif, menaikkan parameter cenderung menaikkan loss. Jika gradient negatif, menaikkan parameter dapat menurunkan loss.

Optimizer menggunakan gradient untuk mengubah weight dan bias ke arah yang diharapkan menurunkan loss.

```text
parameter_baru = parameter_lama - learning_rate × gradient
```

## 3.4 Backpropagation

Backpropagation adalah proses menghitung kontribusi setiap parameter terhadap kesalahan. Proses dimulai dari output, kemudian bergerak mundur melalui jaringan menggunakan *chain rule*.

Secara praktis, framework seperti TensorFlow dan PyTorch menghitung gradient secara otomatis. Namun, memahami alurnya membantu saat model tidak belajar atau gradient menjadi terlalu kecil maupun terlalu besar.

> **Analogi evaluasi proyek:** tim melihat hasil akhir yang kurang baik, lalu menelusuri penyebabnya dari tahap terakhir ke tahap awal. Setiap tahap mendapat bagian tanggung jawab dan diperbaiki sesuai pengaruhnya.

## 3.5 Satu Langkah Belajar

Satu langkah pembelajaran neural network umumnya terdiri dari:

1. Ambil satu batch data.
2. Lakukan forward propagation.
3. Hitung loss.
4. Hitung gradient melalui backpropagation.
5. Optimizer memperbarui parameter.
6. Ulangi untuk batch berikutnya.

## Checkpoint Bab 3

1. Apa fungsi loss function?
2. Mengapa gradient diperlukan oleh optimizer?
3. Apa yang terjadi lebih dahulu: forward propagation atau backpropagation?

## Latihan Bab 3 - Simulasi Manual Satu Neuron

**Tujuan:** melihat hubungan antara prediksi, loss, dan pembaruan parameter.

**Tingkat kesulitan:** Dasar

Gunakan nilai berikut:

```text
x = 2
w = 0.5
b = 0
target y = 3
```

Kerjakan:

1. Hitung prediksi linear `y_hat = x × w + b`.
2. Hitung squared error `(y_hat - y)²`.
3. Ubah `w` menjadi `1.0`, kemudian hitung kembali prediksi dan loss.
4. Jelaskan perubahan mana yang membuat prediksi lebih dekat dengan target.

**Hasil yang dikumpulkan:** perhitungan dua percobaan dan kesimpulan singkat.

---

# Bab 4 - Training dan Optimizer

Menjalankan proses belajar model secara terukur dan mengenali gejala kegagalan training.

## 4.1 Epoch, Batch, dan Iteration

| Istilah | Arti | Contoh |
|---|---|---|
| Epoch | Satu kali seluruh data training digunakan | 10.000 data selesai dilalui |
| Batch | Sekelompok data yang diproses bersama | 32 sampel |
| Iteration | Satu kali pembaruan parameter | Satu batch menghasilkan satu update |

Jika terdapat 1.000 sampel dan batch size 100, maka satu epoch memiliki sekitar 10 iteration.

## 4.2 Learning Rate

Learning rate menentukan seberapa besar langkah pembaruan parameter. Nilai terlalu besar dapat membuat loss berosilasi atau bahkan meningkat. Nilai terlalu kecil membuat training sangat lambat.

**Tanda learning rate terlalu besar:**

- Loss tidak stabil atau melonjak.
- Loss menghasilkan `NaN`.
- Accuracy tidak pernah membaik.

**Tanda learning rate terlalu kecil:**

- Loss turun sangat lambat.
- Model membutuhkan banyak epoch untuk mencapai hasil yang layak.

## 4.3 Optimizer Populer

| Optimizer | Karakteristik | Kapan dicoba |
|---|---|---|
| SGD | Sederhana dan mudah dipahami | Baseline atau saat ingin kontrol lebih jelas |
| SGD + Momentum | Mengurangi gerakan zig-zag | Masalah dengan arah gradient yang berubah-ubah |
| Adam | Adaptif dan sering cepat pada awal training | Pilihan awal praktis untuk banyak tugas |
| AdamW | Adam dengan weight decay yang lebih terpisah | Transformer dan model modern |

## 4.4 Training Loop

Contoh pseudocode training loop dengan PyTorch:

```python
for epoch in range(num_epochs):
    for x_batch, y_batch in train_loader:
        predictions = model(x_batch)
        loss = loss_function(predictions, y_batch)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    evaluate_on_validation_data()
```

Langkah `zero_grad()` penting pada framework seperti PyTorch karena gradient dapat terakumulasi. Evaluasi validation dilakukan tanpa memperbarui parameter.

## 4.5 Masalah Umum Saat Training

| Gejala | Kemungkinan penyebab | Tindakan awal |
|---|---|---|
| Loss tidak turun | Learning rate tidak cocok, label salah, data tidak ternormalisasi | Periksa pipeline data dan coba overfit batch kecil |
| Loss menjadi `NaN` | Learning rate terlalu besar, input ekstrem, operasi numerik tidak stabil | Turunkan learning rate dan periksa data |
| Training bagus, validation buruk | Overfitting | Gunakan regularisasi, augmentation, atau lebih banyak data |
| Accuracy stagnan pada tebakan acak | Output/loss tidak cocok, mapping label salah | Periksa activation function dan loss |
| Training sangat lambat | Model atau input terlalu besar, pipeline lambat | Lakukan profiling dan sederhanakan baseline |

## 4.6 Teknik Debugging Penting

- Coba overfit 10-50 sampel. Jika model tidak bisa menghafal data kecil, kemungkinan terdapat bug.
- Periksa bentuk tensor pada setiap tahap.
- Lihat distribusi label dan pastikan tidak tertukar.
- Pastikan preprocessing training dan validation konsisten.
- Catat arsitektur, learning rate, batch size, seed, dan hasil setiap eksperimen.

## Checkpoint Bab 4

1. Apa perbedaan epoch dan iteration?
2. Mengapa validation data tidak boleh dipakai untuk memperbarui weight?
3. Apa tes sederhana untuk mengecek apakah pipeline dan model dapat belajar?

## Latihan Bab 4 - Diagnosis Kurva Training

**Tujuan:** membaca pola loss dan accuracy untuk menentukan tindakan berikutnya.

**Tingkat kesulitan:** Menengah

Analisis tiga skenario berikut:

1. Training loss dan validation loss sama-sama turun.
2. Training loss turun, tetapi validation loss naik.
3. Training loss dan validation loss sama-sama datar.

Untuk setiap skenario:

- Jelaskan diagnosis yang paling mungkin.
- Tuliskan dua tindakan yang dapat dicoba.

**Hasil yang dikumpulkan:** tabel diagnosis dan tindakan untuk setiap skenario.

---

# Bab 5 - Regularisasi dan Generalisasi

Membuat model tidak hanya menghafal data training, tetapi juga bekerja pada data baru.

## 5.1 Overfitting dan Underfitting

| Kondisi | Ciri | Makna |
|---|---|---|
| Underfitting | Training dan validation sama-sama buruk | Model belum menangkap pola |
| Fit yang baik | Training baik, validation juga baik dan stabil | Model belajar pola yang dapat digeneralisasi |
| Overfitting | Training sangat baik, validation jauh lebih buruk | Model terlalu menghafal data training |

## 5.2 Dropout

Dropout menonaktifkan sebagian neuron secara acak selama training. Tujuannya agar model tidak terlalu bergantung pada jalur tertentu. Saat inference, seluruh neuron digunakan dengan penyesuaian skala yang ditangani framework.

> **Intuisi dropout:** seperti melatih tim tanpa selalu mengandalkan satu orang. Setiap anggota harus mampu berkontribusi sehingga tim lebih tahan ketika kondisi berubah.

## 5.3 Weight Decay

Weight decay mendorong parameter agar tidak tumbuh terlalu besar. Model dengan parameter yang lebih terkendali sering memiliki batas keputusan yang lebih halus dan lebih mudah melakukan generalisasi.

## 5.4 Normalization

| Teknik | Ide dasar | Catatan |
|---|---|---|
| Input normalization | Menyetarakan skala data input | Hampir selalu penting |
| Batch Normalization | Menormalkan aktivasi berdasarkan batch | Umum pada CNN |
| Layer Normalization | Menormalkan fitur dalam satu sampel | Umum pada Transformer |

## 5.5 Data Augmentation

Data augmentation membuat variasi baru dari data training tanpa mengubah label. Pada gambar, contohnya adalah flip, crop, rotasi kecil, perubahan brightness, atau noise ringan. Transformasi harus tetap masuk akal untuk konteks masalah.

> **Hati-hati pada transformasi:** membalik gambar angka 6 dapat mengubah makna menjadi 9. Rotasi besar pada citra medis juga bisa tidak realistis. Augmentation harus mengikuti karakteristik domain.

## 5.6 Early Stopping

Early stopping menghentikan training ketika performa validation tidak membaik selama beberapa epoch. Simpan checkpoint terbaik, bukan hanya model dari epoch terakhir.

## Checkpoint Bab 5

1. Apa perbedaan overfitting dan underfitting?
2. Mengapa data augmentation hanya diterapkan pada training data?
3. Apa manfaat menyimpan model dengan validation loss terbaik?

## Latihan Bab 5 - Rencana Mengurangi Overfitting

**Tujuan:** menyusun intervensi bertahap untuk model yang menghafal data training.

**Tingkat kesulitan:** Menengah

Gunakan skenario berikut:

```text
Training accuracy: 99%
Validation accuracy: 72%
```

Kerjakan:

1. Susun urutan tiga eksperimen dari yang paling murah.
2. Tentukan metrik yang diamati dan kriteria keberhasilan.
3. Jelaskan mengapa mengubah banyak hal sekaligus membuat eksperimen sulit dianalisis.

**Hasil yang dikumpulkan:** rencana eksperimen berurutan lengkap dengan hipotesis dan metrik.

---

# Bab 6 - Convolutional Neural Network

Memahami bagaimana model melihat pola lokal pada gambar.

## 6.1 Mengapa Dense Layer Tidak Ideal untuk Gambar Besar?

Gambar memiliki struktur ruang. Piksel yang berdekatan biasanya saling berkaitan. Jika gambar langsung diratakan menjadi satu vektor, hubungan lokal ini tidak digunakan secara efisien.

CNN menggunakan filter kecil yang digeser di seluruh gambar. Filter yang sama digunakan berulang kali sehingga jumlah parameter lebih hemat dan pola dapat dikenali di berbagai posisi.

## 6.2 Convolution dan Filter

Filter atau kernel adalah matriks kecil, misalnya 3 × 3. Filter bergerak di atas gambar, melakukan perkalian elemen, kemudian menjumlahkannya untuk menghasilkan feature map. Selama training, nilai filter dipelajari secara otomatis.

> **Lapisan awal dan lapisan dalam:** lapisan awal sering belajar mendeteksi tepi dan tekstur. Lapisan lebih dalam menggabungkan fitur menjadi bagian objek, kemudian menjadi representasi objek yang lebih utuh.

## 6.3 Stride, Padding, dan Pooling

| Istilah | Arti | Dampak |
|---|---|---|
| Stride | Jarak perpindahan filter | Stride lebih besar mengecilkan feature map |
| Padding | Menambah batas di sekitar gambar | Membantu mempertahankan ukuran |
| Pooling | Merangkum area lokal | Mengurangi ukuran dan komputasi |

Max pooling mengambil nilai terbesar pada area tertentu. Global average pooling merata-ratakan setiap feature map dan sering digunakan sebelum output layer.

## 6.4 Arsitektur CNN Sederhana

```text
Input image
→ Conv2D + ReLU
→ MaxPool
→ Conv2D + ReLU
→ MaxPool
→ GlobalAveragePooling
→ Dense output
```

## 6.5 Transfer Learning

Transfer learning menggunakan model yang telah dilatih pada dataset besar sebagai feature extractor. Pendekatan ini sangat berguna ketika dataset sendiri terbatas.

Tahapan umumnya:

1. Pilih backbone pralatih.
2. Ganti classification head.
3. Bekukan sebagian besar layer.
4. Latih classification head.
5. Lakukan fine-tuning menggunakan learning rate kecil.

> **Baseline yang praktis:** untuk dataset gambar kecil hingga menengah, transfer learning biasanya menjadi baseline yang lebih kuat daripada melatih CNN besar dari nol.

## 6.6 Contoh Kode Keras

Contoh model klasifikasi gambar tiga kelas:

```python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(128, 128, 3)),
    tf.keras.layers.Rescaling(1.0 / 255),
    tf.keras.layers.Conv2D(32, 3, activation="relu"),
    tf.keras.layers.MaxPooling2D(),
    tf.keras.layers.Conv2D(64, 3, activation="relu"),
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(3, activation="softmax"),
])

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)
```

## Checkpoint Bab 6

1. Mengapa CNN menggunakan filter yang sama pada banyak posisi?
2. Apa fungsi pooling?
3. Kapan transfer learning lebih masuk akal daripada training dari nol?

## Latihan Bab 6 - Mendesain CNN Baseline

**Tujuan:** menyusun CNN kecil yang sesuai dengan ukuran data dan jumlah kelas.

**Tingkat kesulitan:** Menengah

Gunakan kebutuhan berikut:

```text
Input: gambar RGB 128 × 128
Jumlah kelas: 5
```

Kerjakan:

1. Rancang dua blok convolution dan satu output layer.
2. Tuliskan bentuk output setelah setiap tahap secara kasar.
3. Tambahkan satu strategi regularisasi.
4. Jelaskan alasan desain tersebut.

**Hasil yang dikumpulkan:** diagram arsitektur, alasan desain, dan estimasi perubahan bentuk tensor.

---

# Bab 7 - RNN dan Data Berurutan

Memahami data yang urutannya membawa makna, seperti teks dan deret waktu.

## 7.1 Mengapa Urutan Penting?

Pada data berurutan, posisi dan konteks memengaruhi makna. Kalimat “anjing menggigit manusia” berbeda dari “manusia menggigit anjing”, walaupun kata yang digunakan sama.

RNN memproses elemen satu per satu sambil membawa hidden state sebagai ringkasan konteks sebelumnya.

```text
hidden_t = f(input_t, hidden_(t-1))
```

## 7.2 Kelemahan RNN Sederhana

RNN sederhana sulit mempertahankan informasi yang sangat jauh karena *vanishing gradient* atau *exploding gradient*. LSTM dan GRU menambahkan mekanisme gerbang untuk mengatur informasi yang disimpan, dilupakan, dan diteruskan.

## 7.3 Bentuk Masalah Sequence

| Pola | Contoh |
|---|---|
| One-to-one | Klasifikasi gambar biasa |
| Many-to-one | Klasifikasi sentimen dari satu kalimat |
| One-to-many | Membuat rangkaian output dari satu input |
| Many-to-many | Terjemahan atau pelabelan setiap token |

## 7.4 RNN, LSTM, atau Transformer?

RNN dan LSTM masih berguna untuk model kecil, data streaming, dan kebutuhan latensi tertentu. Namun, Transformer lebih dominan pada banyak tugas bahasa karena dapat memproses token secara paralel dan menangkap hubungan jarak jauh dengan attention.

## Checkpoint Bab 7

1. Mengapa urutan kata memengaruhi makna?
2. Apa fungsi hidden state?
3. Masalah apa yang coba diatasi LSTM dan GRU?

## Latihan Bab 7 - Memetakan Masalah Sequence

**Tujuan:** mengenali input-output pada masalah berurutan.

**Tingkat kesulitan:** Dasar

Gunakan tiga kasus berikut:

1. Sentiment analysis.
2. Prediksi suhu harian.
3. Named entity recognition.

Untuk setiap kasus:

- Tentukan bentuk input dan output.
- Tentukan apakah masalahnya many-to-one atau many-to-many.
- Jelaskan satu risiko preprocessing yang dapat merusak urutan.

**Hasil yang dikumpulkan:** tabel kasus, bentuk sequence, tipe mapping, dan risiko preprocessing.

---

# Bab 8 - Transformer Dasar

Memahami attention, embedding, dan informasi posisi sebagai fondasi model modern.

## 8.1 Keterbatasan Pemrosesan Berurutan

RNN memproses token secara bertahap. Hal ini menyulitkan paralelisasi dan membuat hubungan jarak jauh lebih sulit dipelajari. Transformer menggunakan attention agar setiap token dapat mempertimbangkan token lain secara langsung.

## 8.2 Embedding

Embedding mengubah token menjadi vektor angka. Token dengan konteks atau fungsi yang mirip dapat memiliki representasi yang berdekatan. Embedding dipelajari selama training atau berasal dari model pralatih.

## 8.3 Self-Attention

Self-attention menghitung seberapa relevan token lain terhadap token yang sedang diproses. Setiap token menghasilkan query, key, dan value.

- **Query** menggambarkan informasi yang dicari.
- **Key** menggambarkan karakteristik token.
- **Value** membawa informasi yang akan digabungkan.

Kecocokan query dan key menentukan bobot attention terhadap value.

> **Analogi rapat tim:** seseorang mengajukan pertanyaan tertentu. Ia memberi perhatian lebih besar kepada anggota yang pengetahuannya paling relevan. Jawaban akhir merupakan gabungan informasi dengan bobot yang berbeda.

## 8.4 Positional Information

Self-attention sendiri tidak mengetahui urutan token. Karena itu, model menambahkan positional encoding atau positional embedding agar posisi pertama, kedua, dan seterusnya dapat dibedakan.

## 8.5 Multi-Head Attention

Multi-head attention menjalankan beberapa pola attention secara paralel. Satu head mungkin fokus pada hubungan subjek-predikat, head lain pada referensi kata, dan head lainnya pada konteks lokal. Hasil setiap head kemudian digabungkan.

## 8.6 Encoder dan Decoder

| Komponen | Fungsi umum | Contoh penggunaan |
|---|---|---|
| Encoder | Membangun representasi input | Klasifikasi dan pemahaman teks |
| Decoder | Menghasilkan token secara bertahap | Text generation |
| Encoder-decoder | Membaca input lalu menghasilkan output | Terjemahan dan summarization |

## Checkpoint Bab 8

1. Apa tujuan embedding?
2. Mengapa positional information dibutuhkan?
3. Apa peran query, key, dan value dalam attention?

## Latihan Bab 8 - Menjelaskan Attention Tanpa Rumus

**Tujuan:** mengomunikasikan ide self-attention menggunakan bahasa nonteknis.

**Tingkat kesulitan:** Menengah

Gunakan kalimat berikut atau buat contoh serupa:

> “Rina memberi buku kepada Sari karena ia lulus.”

Kerjakan:

1. Jelaskan token mana yang perlu saling memperhatikan untuk memahami kata “ia”.
2. Tuliskan penjelasan self-attention dalam maksimal 150 kata.

**Hasil yang dikumpulkan:** penjelasan maksimal 150 kata yang dapat dipahami pemula.

---

# Bab 9 - Evaluasi dan Implementasi

Menilai model secara benar, menganalisis kesalahan, dan menyiapkan penggunaan nyata.

## 9.1 Pembagian Data

| Bagian | Fungsi | Catatan |
|---|---|---|
| Training | Memperbarui parameter | Boleh menerima augmentation |
| Validation | Memilih model dan hyperparameter | Tidak dipakai untuk update weight |
| Test | Estimasi akhir pada data yang belum terlihat | Digunakan setelah keputusan final |

> **Hindari data leakage:** informasi dari validation atau test tidak boleh bocor ke proses training. Contohnya, parameter normalisasi harus dihitung dari training data, kemudian diterapkan ke validation dan test.

## 9.2 Metrik Klasifikasi

| Metrik | Makna sederhana | Penting ketika |
|---|---|---|
| Accuracy | Proporsi prediksi benar | Kelas relatif seimbang |
| Precision | Dari prediksi positif, berapa yang benar | False positive mahal |
| Recall | Dari semua kasus positif, berapa yang ditemukan | False negative mahal |
| F1-score | Keseimbangan precision dan recall | Kelas tidak seimbang |
| Confusion matrix | Rincian jenis kesalahan per kelas | Analisis error |

## 9.3 Analisis Kesalahan

- Lihat contoh yang salah, bukan hanya angka agregat.
- Kelompokkan error berdasarkan kualitas data, label ambigu, kelas mirip, kondisi ekstrem, atau bias domain.
- Periksa performa per kelas dan per segmen pengguna.
- Pastikan sampel salah tidak berasal dari data duplikat atau preprocessing yang rusak.

## 9.4 Reproducibility

Catat versi data, kode, library, seed, hyperparameter, dan checkpoint. Hasil deep learning dapat berubah karena inisialisasi acak, urutan batch, dan operasi GPU. Reproducibility memudahkan perbandingan eksperimen.

## 9.5 Inference dan Deployment

| Pertimbangan | Pertanyaan |
|---|---|
| Latency | Seberapa cepat prediksi harus tersedia? |
| Ukuran model | Apakah model berjalan di server, browser, atau perangkat mobile? |
| Throughput | Berapa banyak request yang harus diproses? |
| Monitoring | Bagaimana mendeteksi penurunan kualitas atau data drift? |
| Privasi | Apakah data sensitif boleh dikirim ke server? |

> **Model terbaik belum tentu model terbesar:** dalam produk nyata, model yang sedikit kurang akurat tetapi jauh lebih cepat, murah, dan stabil bisa menjadi pilihan yang lebih baik.

## Checkpoint Bab 9

1. Apa perbedaan validation set dan test set?
2. Kapan recall lebih penting daripada precision?
3. Mengapa analisis contoh yang salah penting setelah melihat metrik?

## Latihan Bab 9 - Menentukan Metrik

**Tujuan:** memilih metrik berdasarkan dampak kesalahan.

**Tingkat kesulitan:** Menengah

Bandingkan dua kasus berikut:

1. Deteksi penyakit berisiko tinggi.
2. Penyaringan komentar spam.

Untuk masing-masing kasus:

- Jelaskan dampak false positive.
- Jelaskan dampak false negative.
- Pilih metrik utama dan metrik pendamping.
- Jelaskan mengapa accuracy saja mungkin menyesatkan.

**Hasil yang dikumpulkan:** analisis dampak kesalahan dan rekomendasi metrik.

---

# Bab 10 - Mini Project: Klasifikasi Gambar

Menerapkan seluruh alur kerja deep learning dari definisi masalah sampai laporan evaluasi.

## 10.1 Tujuan Proyek

Membangun model klasifikasi gambar minimal tiga kelas. Dataset dapat berupa jenis sampah, jenis makanan, kondisi daun, kategori produk, atau objek lain yang relevan.

Fokus penilaian bukan hanya accuracy, tetapi kualitas proses dan kemampuan menjelaskan keputusan.

## 10.2 Batasan Proyek

- Minimal 300 gambar secara keseluruhan dan minimal 3 kelas.
- Pisahkan training, validation, dan test secara jelas.
- Buat baseline sederhana sebelum mencoba model kompleks.
- Gunakan minimal satu teknik regularisasi atau augmentation.
- Laporkan confusion matrix dan minimal tiga contoh prediksi salah.
- Simpan model terbaik berdasarkan validation metric.

## 10.3 Tahapan Pengerjaan

| Tahap | Aktivitas utama |
|---|---|
| Definisi masalah | Tentukan pengguna, tujuan prediksi, kelas, dan dampak kesalahan |
| Audit data | Periksa jumlah data, duplikat, kualitas gambar, label, dan ketidakseimbangan kelas |
| Split data | Buat training, validation, dan test tanpa kebocoran |
| Baseline | Bangun CNN kecil atau transfer learning sederhana |
| Eksperimen | Ubah satu faktor setiap kali dan catat hasil |
| Evaluasi | Gunakan metrik, confusion matrix, dan analisis error |
| Kesimpulan | Jelaskan keterbatasan dan langkah pengembangan |

## 10.4 Template Laporan

Laporan proyek minimal memuat:

1. Judul dan ringkasan proyek.
2. Latar belakang dan tujuan.
3. Deskripsi dataset dan distribusi kelas.
4. Preprocessing dan augmentation.
5. Arsitektur atau model pralatih yang digunakan.
6. Konfigurasi training dan hyperparameter.
7. Hasil eksperimen dalam tabel.
8. Confusion matrix dan analisis kesalahan.
9. Risiko, keterbatasan, dan rencana peningkatan.

## 10.5 Template Log Eksperimen

| ID | Perubahan | Hipotesis | Validation metric | Catatan |
|---|---|---|---|---|
| E01 | Baseline CNN | Mendapatkan titik awal | ... | ... |
| E02 | Tambah augmentation | Mengurangi overfitting | ... | ... |
| E03 | Transfer learning | Meningkatkan kualitas fitur | ... | ... |

## 10.6 Rubrik Penilaian

| Aspek | Bobot | Kriteria |
|---|---:|---|
| Definisi masalah | 10% | Tujuan, pengguna, kelas, dan dampak kesalahan jelas |
| Kualitas data | 15% | Audit, split, dan preprocessing benar |
| Metodologi | 20% | Baseline dan eksperimen terstruktur |
| Evaluasi | 25% | Metrik sesuai, confusion matrix, dan error analysis |
| Pemahaman | 20% | Mampu menjelaskan alasan desain dan hasil |
| Dokumentasi | 10% | Laporan rapi dan dapat direproduksi |

### Kriteria Kelulusan

Peserta dinyatakan memenuhi kompetensi apabila memperoleh nilai minimal **70/100** dan tidak melakukan data leakage yang mendasar.

---

# Bab 11 - Kuis Akhir

Uji pemahaman konsep sebelum menutup modul.

## Soal

1. Istilah *deep* pada deep learning terutama mengacu pada ...
   - A. ukuran dataset
   - B. jumlah lapisan pemrosesan
   - C. panjang kode
   - D. jenis komputer

2. Komponen yang dipelajari langsung selama training adalah ...
   - A. batch size
   - B. learning rate
   - C. weight dan bias
   - D. jumlah epoch

3. Activation function dibutuhkan terutama untuk ...
   - A. menambah data
   - B. memberi non-linearitas
   - C. membagi dataset
   - D. menyimpan checkpoint

4. Fungsi utama loss adalah ...
   - A. mengukur kesalahan prediksi
   - B. memperbesar input
   - C. memilih batch
   - D. menghapus noise

5. Backpropagation digunakan untuk ...
   - A. membagi data
   - B. menghitung gradient
   - C. melakukan augmentation
   - D. menambah kelas

6. Learning rate terlalu besar sering menyebabkan ...
   - A. loss tidak stabil
   - B. parameter tidak berubah sama sekali
   - C. dataset bertambah
   - D. output selalu satu kelas karena softmax

7. Training accuracy sangat tinggi tetapi validation accuracy rendah adalah tanda ...
   - A. underfitting
   - B. overfitting
   - C. data augmentation
   - D. normalisasi

8. Dropout bekerja dengan cara ...
   - A. menghapus label
   - B. menonaktifkan neuron secara acak saat training
   - C. memperbesar gambar
   - D. mengganti optimizer

9. CNN efektif untuk gambar karena ...
   - A. mengabaikan posisi piksel
   - B. memakai filter lokal dan weight sharing
   - C. selalu memiliki parameter paling banyak
   - D. tidak memerlukan data

10. Pooling biasanya digunakan untuk ...
    - A. memperbesar resolusi
    - B. mengurangi ukuran feature map
    - C. menambah kelas
    - D. menghitung loss

11. Transfer learning berarti ...
    - A. memindahkan file dataset
    - B. memakai pengetahuan model pralatih
    - C. mengganti bahasa pemrograman
    - D. menghapus semua weight

12. Hidden state pada RNN berfungsi sebagai ...
    - A. ringkasan konteks sebelumnya
    - B. label tambahan
    - C. loss function
    - D. jenis optimizer

13. Self-attention membantu setiap token ...
    - A. menghapus token lain
    - B. mempertimbangkan token lain secara langsung
    - C. selalu fokus pada token terdekat
    - D. menjadi gambar

14. Positional encoding dibutuhkan karena ...
    - A. attention tidak otomatis mengetahui urutan
    - B. embedding terlalu kecil
    - C. optimizer tidak mengenal token
    - D. loss tidak memiliki gradient

15. Test set sebaiknya digunakan ...
    - A. untuk update weight
    - B. berulang kali memilih hyperparameter
    - C. untuk evaluasi akhir
    - D. sebagai augmentation

16. Recall penting ketika ...
    - A. false negative mahal
    - B. false positive satu-satunya masalah
    - C. semua kelas seimbang pasti
    - D. tidak ada label

17. Data leakage terjadi ketika ...
    - A. training lambat
    - B. informasi test masuk ke proses training
    - C. batch size kecil
    - D. model disimpan

18. Tes overfit batch kecil berguna untuk ...
    - A. mengecek apakah model dan pipeline bisa belajar
    - B. mengukur performa final
    - C. membuat dataset lebih besar
    - D. menghapus gradient

19. Model terbaik untuk produk nyata selalu ...
    - A. model terbesar
    - B. model paling baru
    - C. model dengan kompromi kualitas, biaya, dan latency yang tepat
    - D. model dengan epoch terbanyak

20. Eksperimen yang baik sebaiknya ...
    - A. mengubah semua hal sekaligus
    - B. tidak mencatat konfigurasi
    - C. mengubah satu faktor utama setiap kali
    - D. hanya melihat training accuracy

## Kunci Jawaban

| Nomor | Jawaban | Nomor | Jawaban |
|---:|:---:|---:|:---:|
| 1 | B | 11 | B |
| 2 | C | 12 | A |
| 3 | B | 13 | B |
| 4 | A | 14 | A |
| 5 | B | 15 | C |
| 6 | A | 16 | A |
| 7 | B | 17 | B |
| 8 | B | 18 | A |
| 9 | B | 19 | C |
| 10 | B | 20 | C |

## Interpretasi Skor

| Skor | Interpretasi |
|---:|---|
| 17-20 | Sangat baik |
| 14-16 | Baik |
| 10-13 | Perlu mengulang beberapa bab |
| Di bawah 10 | Ulangi materi inti dan kerjakan latihan sebelum mencoba kembali |

---

# Bab 12 - Diskusi dan Refleksi

Menghubungkan konsep teknis dengan keputusan nyata.

## Pertanyaan Diskusi

1. Apakah model yang lebih akurat selalu lebih baik untuk digunakan? Jelaskan dengan contoh biaya atau risiko.
2. Bagaimana menentukan apakah masalah disebabkan oleh kekurangan data atau kekurangan kapasitas model?
3. Apa risiko etis ketika dataset gambar tidak mewakili seluruh kelompok pengguna?
4. Dalam kondisi apa transfer learning dapat membawa bias dari dataset asal?
5. Bagaimana menjelaskan keputusan model kepada pengguna nonteknis tanpa memberi klaim berlebihan?

## Refleksi Individu

- Konsep mana yang paling mudah dipahami?
- Konsep mana yang masih membingungkan?
- Kesalahan apa yang paling mungkin terjadi ketika Anda membangun model pertama?
- Apa satu eksperimen kecil yang akan Anda lakukan setelah menyelesaikan modul?

---

# Bab 13 - Glosarium

Ringkasan istilah penting dalam deep learning.

| Istilah | Penjelasan |
|---|---|
| Activation function | Fungsi non-linear yang menentukan output neuron |
| Backpropagation | Proses menghitung gradient dari output kembali ke parameter sebelumnya |
| Batch | Sekelompok sampel yang diproses bersama |
| Bias | Parameter tambahan yang menggeser hasil transformasi |
| Checkpoint | Salinan parameter model yang disimpan pada titik tertentu |
| Convolution | Operasi filter lokal pada data seperti gambar |
| Data leakage | Masuknya informasi validation atau test ke proses training |
| Dropout | Regularisasi dengan menonaktifkan sebagian unit secara acak saat training |
| Embedding | Representasi vektor dari token atau objek diskret |
| Epoch | Satu kali seluruh training data dilalui |
| Feature map | Hasil penerapan filter convolution |
| Fine-tuning | Melanjutkan training model pralatih pada data tugas tertentu |
| Gradient | Arah dan besar perubahan loss terhadap parameter |
| Hyperparameter | Konfigurasi yang ditentukan di luar proses belajar parameter |
| Inference | Proses menggunakan model terlatih untuk menghasilkan prediksi |
| Learning rate | Besarnya langkah pembaruan parameter |
| Loss | Ukuran kesalahan prediksi |
| Optimizer | Algoritma pembaruan parameter berdasarkan gradient |
| Overfitting | Model terlalu menyesuaikan diri dengan training data |
| Parameter | Nilai yang dipelajari model, terutama weight dan bias |
| Pooling | Operasi peringkasan area pada feature map |
| Regularization | Teknik untuk membantu generalisasi dan mengurangi overfitting |
| Self-attention | Mekanisme yang menggabungkan informasi antar token berdasarkan relevansi |
| Tensor | Struktur data numerik multidimensi |
| Underfitting | Model belum mampu menangkap pola penting |
| Validation set | Data untuk mengevaluasi pilihan model selama pengembangan |
| Weight | Parameter yang mengatur kekuatan pengaruh input |

---

# Bab 14 - Ringkasan Cepat

Checklist praktis sebelum, selama, dan setelah training.

## Sebelum Training

- Definisikan tujuan dan dampak kesalahan.
- Audit distribusi data dan label.
- Pisahkan training, validation, dan test.
- Buat baseline sederhana.
- Pastikan preprocessing dapat direproduksi.

## Selama Training

- Pantau training loss dan validation loss.
- Simpan checkpoint terbaik.
- Catat hyperparameter dan seed.
- Ubah satu faktor utama per eksperimen.
- Gunakan overfit batch kecil saat debugging.

## Setelah Training

- Evaluasi pada test set hanya setelah keputusan final.
- Lihat confusion matrix dan contoh error.
- Periksa performa per kelas dan per segmen.
- Bandingkan kualitas dengan latency dan biaya.
- Dokumentasikan keterbatasan model.

## Alur Inti Deep Learning

```text
Data
→ preprocessing
→ model
→ prediksi
→ loss
→ backpropagation
→ optimizer
→ evaluasi
→ perbaikan
```

---

# Bab 15 - Referensi Belajar

Sumber lanjutan untuk memperdalam konsep dan praktik.

| Sumber | Keterangan |
|---|---|
| *Deep Learning* | Ian Goodfellow, Yoshua Bengio, dan Aaron Courville |
| *Dive into Deep Learning* | Aston Zhang, Zachary C. Lipton, Mu Li, dan Alexander J. Smola |
| *Neural Networks and Deep Learning* | Michael Nielsen |
| TensorFlow Guides | Dokumentasi resmi TensorFlow untuk model, data pipeline, dan training |
| PyTorch Tutorials | Dokumentasi resmi PyTorch untuk autograd, model, dan training loop |
| CS231n | Materi Stanford tentang convolutional neural networks untuk visual recognition |
| *The Illustrated Transformer* | Penjelasan visual tentang Transformer dan attention |

---

# Penutup

Deep learning menjadi lebih mudah dipahami ketika dipandang sebagai proses iteratif: model membuat prediksi, mengukur kesalahan, menghitung arah perbaikan, lalu memperbarui parameter.

Kemampuan terpenting bukan menghafal banyak arsitektur, tetapi membangun baseline, membaca gejala training, menganalisis kesalahan, dan membuat keputusan eksperimen yang terukur.

## Langkah Berikutnya

Setelah menyelesaikan modul ini, peserta siap mempelajari Reinforcement Learning, Large Language Model, atau spesialisasi Computer Vision dengan fondasi yang lebih kuat.

---

**HerAI Fellowship - Participant Module**  
Course ID: `deep-learning`  
Status: `ready`  
Version: `1.0.0`
