# Math for AI

> Ekspor lengkap dari sumber materi HerAI yang tersedia di repository.
> Mencakup materi, latihan, kuis, diskusi, pembahasan, versi legacy, dan/atau data interaktif bila tersedia.

## discussion

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/math-for-ai/discussion.html`

_Halaman ini berupa shell/placeholder dan tidak memiliki teks materi statis._

## lesson

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/math-for-ai/lesson.html`

_Halaman ini berupa shell/placeholder dan tidak memiliki teks materi statis._

## overview

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/math-for-ai/overview.html`

_Halaman ini berupa shell/placeholder dan tidak memiliki teks materi statis._

## practice

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/math-for-ai/practice.html`

_Halaman ini berupa shell/placeholder dan tidak memiliki teks materi statis._

## quiz

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/math-for-ai/quiz.html`

_Halaman ini berupa shell/placeholder dan tidak memiliki teks materi statis._

## Konten Dinamis dan Interaktif

> Data berikut diekstrak dari JavaScript runtime untuk `math`, termasuk teks yang baru muncul setelah interaksi.

#### mathForAiCourse

- **id:** math-for-ai
- **title:** Math for AI
- **subtitle:** Memahami cara AI berpikir, belajar, dan mengambil keputusan dengan angka.
- **category:** Foundation & Core AI
- **level:** Beginner Friendly
- **audience:** Fellowship Non-IT
- **estimatedDuration:** 2-3 jam
- **totalLessons:** 7
- **passingGrade:** 75
- **description:** Course ini membantu peserta memahami matematika inti di balik AI tanpa harus menjadi ahli matematika. Peserta akan belajar bagaimana data diubah menjadi angka, bagaimana AI membaca pola, bagaimana model membuat prediksi, mengukur kesalahan, memperbaiki diri, dan mengambil keputusan berdasarkan peluang.
##### outcomes

- Memahami kenapa AI membutuhkan matematika.
- Memahami data sebagai vektor dan matriks.
- Membaca pola dasar data menggunakan statistik.
- Memahami probabilitas dan confidence score dalam AI.
- Memahami fungsi, turunan, gradient, dan loss function secara konseptual.
- Memahami optimasi, gradient descent, learning rate, regularisasi, dan overfitting.
- Menghubungkan seluruh konsep Math for AI ke fitur nyata di HerAI SuperApp.


#### mathForAiLessons

#### Kenapa AI Butuh Matematika?

- **id:** intro
- **route:** #/participant-ai-lab-math-intro
- **title:** Kenapa AI Butuh Matematika?
- **icon:** fas fa-brain
- **duration:** 15 menit
- **level:** Foundation
- **objective:** Peserta memahami bahwa AI tidak membaca dunia seperti manusia, tetapi memproses data dalam bentuk angka.
- **opening:** Saat manusia melihat gambar, kita langsung mengenali wajah, warna, dan ekspresi. Namun komputer tidak melihat gambar seperti itu. Komputer hanya membaca angka. Teks, gambar, suara, nilai quiz, durasi belajar, dan aktivitas user semuanya harus diterjemahkan menjadi data numerik agar bisa diproses oleh AI.
- **coreConcept:** Matematika adalah bahasa internal AI. Dengan matematika, AI dapat menyimpan data, menghitung kemiripan, membaca pola, memperkirakan peluang, mengukur kesalahan, dan memperbaiki model agar hasil prediksinya semakin baik.
##### keyPoints

- AI tidak memahami teks, gambar, atau suara secara langsung.
- Semua data harus diubah menjadi angka.
- Angka membuat data bisa dihitung, dibandingkan, dan dipelajari.
- Math for AI membantu kita memahami proses kerja AI dari dalam.
- Core Math for AI terdiri dari linear algebra, statistics, probability, calculus, dan optimization.

- **analogy:** Bayangkan AI seperti mesin kasir. Mesin kasir tidak peduli bentuk barangnya, tetapi membaca kode, harga, jumlah, dan angka. AI juga begitu. Bedanya, AI membaca angka dalam jumlah sangat besar untuk menemukan pola.
- **aiExample:** Sistem rekomendasi seperti Netflix, Spotify, atau platform belajar dapat menebak konten yang cocok untuk user karena profil user dan konten diubah menjadi angka, lalu dihitung tingkat kecocokannya.
- **herAiExample:** Di HerAI, data seperti minat peserta, progress modul, nilai quiz, dan aktivitas belajar dapat diubah menjadi angka untuk membantu sistem merekomendasikan materi yang lebih tepat.
- **miniFormula:** Data nyata -> angka -> perhitungan -> prediksi -> evaluasi -> perbaikan
- **advancedNote:** Di tahap lanjutan, proses mengubah data menjadi angka dapat melibatkan embedding, feature engineering, normalisasi, dan representasi multidimensi.
- **summary:** AI membutuhkan matematika karena semua proses belajar model dimulai dari data yang diubah menjadi angka.

#### Linear Algebra: Data sebagai Vektor dan Matriks

- **id:** linear-algebra
- **route:** #/participant-ai-lab-math-linear-algebra
- **title:** Linear Algebra: Data sebagai Vektor dan Matriks
- **icon:** fas fa-table-cells
- **duration:** 25 menit
- **level:** Core
- **objective:** Peserta memahami bahwa vektor dan matriks adalah cara utama AI menyimpan dan menghitung data.
- **opening:** Linear algebra adalah fondasi paling penting untuk memahami bagaimana AI menyimpan data. Dalam AI, satu objek dapat direpresentasikan sebagai vektor, sedangkan kumpulan banyak objek dapat disusun menjadi matriks.
- **coreConcept:** Vektor adalah daftar angka yang mewakili satu data. Matriks adalah tabel angka yang berisi banyak vektor. Dengan vektor dan matriks, AI dapat menghitung kemiripan, jarak, transformasi data, dan proses layer pada neural network.
##### keyPoints

- Vektor merepresentasikan satu objek atau satu data.
- Matriks merepresentasikan kumpulan banyak data.
- Dot product dapat dipakai untuk mengukur kecocokan atau kemiripan arah dua vektor.
- Norm atau jarak membantu AI melihat seberapa jauh dua data berbeda.
- Perkalian matriks menjadi dasar banyak proses di neural network.

- **analogy:** Vektor bisa dianggap seperti kartu identitas numerik. Misalnya seorang peserta punya skor minat AI, kemampuan coding, dan pemahaman statistik. Semua itu bisa ditulis sebagai daftar angka.
- **aiExample:** Dalam sistem rekomendasi, profil user dan profil materi bisa diubah menjadi vektor. Jika arah vektornya mirip, sistem menilai user kemungkinan cocok dengan materi tersebut.
- **herAiExample:** Contoh profil peserta HerAI: [AI = 5, Python = 2, Statistik = 1, UI/UX = 3]. Contoh profil materi Math for AI: [AI = 5, Python = 1, Statistik = 5, UI/UX = 1]. Sistem bisa menghitung kecocokan dua vektor ini.
- **miniFormula:** User Vector = [5, 2, 1, 3], Materi Vector = [5, 1, 5, 1]
- **advancedNote:** Konsep seperti eigenvector, PCA, dan SVD penting untuk meringkas data besar, tetapi untuk pemula cukup pahami bahwa semuanya membantu AI menemukan struktur penting dalam data.
- **summary:** Linear algebra membuat AI bisa menyimpan data sebagai vektor dan matriks agar data dapat dihitung.

#### Statistics for AI: Membaca Pola dari Data

- **id:** statistics
- **route:** #/participant-ai-lab-math-statistics
- **title:** Statistics for AI: Membaca Pola dari Data
- **icon:** fas fa-chart-line
- **duration:** 25 menit
- **level:** Core
- **objective:** Peserta memahami statistik dasar untuk membaca pola, penyebaran, hubungan, dan anomali pada data.
- **opening:** Sebelum AI belajar dari data, manusia perlu memahami data tersebut. Statistik membantu kita melihat gambaran umum data, apakah datanya stabil, menyebar, berhubungan, atau memiliki nilai aneh yang perlu diperiksa.
- **coreConcept:** Statistik membantu AI dan manusia memahami data melalui ukuran seperti mean, median, modus, standar deviasi, korelasi, distribusi, dan outlier.
##### keyPoints

- Mean menunjukkan rata-rata data.
- Median menunjukkan nilai tengah.
- Modus menunjukkan nilai yang paling sering muncul.
- Standar deviasi menunjukkan seberapa menyebar data dari rata-rata.
- Korelasi membantu melihat hubungan dua variabel.
- Outlier adalah data yang sangat berbeda dari pola umum.

- **analogy:** Statistik seperti melihat suasana kelas dari jauh. Kita tidak melihat satu peserta saja, tetapi melihat rata-rata nilai, siapa yang tertinggal, siapa yang terlalu jauh berbeda, dan pola umum kelas.
- **aiExample:** Sebelum melatih model, data scientist biasanya mengecek statistik data. Jika ada nilai kosong, outlier ekstrem, atau distribusi tidak seimbang, model bisa belajar secara keliru.
- **herAiExample:** Di HerAI, statistik bisa dipakai untuk melihat rata-rata skor quiz Math for AI, lesson paling sulit, peserta yang progress-nya tertinggal, dan hubungan antara durasi belajar dengan skor quiz.
- **miniFormula:** Rata-rata = total nilai / jumlah peserta
- **advancedNote:** Pada tahap lanjutan, statistik juga dipakai untuk sampling, hypothesis testing, confidence interval, dan evaluasi performa model.
- **summary:** Statistics membantu membaca pola data sebelum data dipakai untuk membuat keputusan atau melatih AI.

#### Probability: AI Tidak Selalu Pasti

- **id:** probability
- **route:** #/participant-ai-lab-math-probability
- **title:** Probability: AI Tidak Selalu Pasti
- **icon:** fas fa-percent
- **duration:** 25 menit
- **level:** Core
- **objective:** Peserta memahami bahwa banyak output AI berbentuk peluang, confidence score, atau tingkat keyakinan.
- **opening:** AI jarang benar-benar mengatakan sesuatu dengan kepastian mutlak. Dalam banyak kasus, AI memberi prediksi dalam bentuk peluang. Misalnya peluang email adalah spam 95%, peluang gambar adalah kucing 87%, atau peluang peserta cocok belajar Python 80%.
- **coreConcept:** Probability membantu AI menghadapi ketidakpastian. Dengan probabilitas, AI dapat menghitung kemungkinan kejadian, memperbarui keyakinan setelah melihat bukti baru, dan memberi confidence score pada prediksi.
##### keyPoints

- Probabilitas adalah ukuran kemungkinan.
- Probabilitas berada antara 0 sampai 1 atau 0% sampai 100%.
- Conditional probability menghitung peluang jika kondisi tertentu sudah terjadi.
- Bayes membantu AI memperbarui keyakinan setelah mendapat bukti baru.
- Distribusi membantu memahami pola penyebaran peluang.
- Cross entropy menghukum prediksi yang salah, terutama jika model terlalu percaya diri.

- **analogy:** Probabilitas seperti menebak cuaca. Kita tidak bisa selalu berkata pasti hujan, tetapi bisa berkata kemungkinan hujan 80% karena melihat awan gelap, kelembapan tinggi, dan data cuaca sebelumnya.
- **aiExample:** Spam filter menggunakan probabilitas untuk menebak apakah email termasuk spam berdasarkan kata-kata tertentu, pengirim, pola link, dan riwayat email sebelumnya.
- **herAiExample:** HerAI dapat menampilkan rekomendasi seperti: Python Basic cocok 91%, Math for AI cocok 84%, UI Design cocok 55%. Angka ini menunjukkan tingkat kecocokan, bukan kepastian absolut.
- **miniFormula:** Prior + Bukti Baru -> Posterior
- **advancedNote:** Konsep seperti entropy, KL divergence, dan Bayesian inference penting dalam AI modern, tetapi untuk pemula cukup pahami bahwa AI sering berpikir dalam bentuk kemungkinan.
- **summary:** Probability membantu AI membuat keputusan saat data tidak memberi jawaban yang benar-benar pasti.

#### Calculus: Cara AI Membaca Arah Perubahan

- **id:** calculus
- **route:** #/participant-ai-lab-math-calculus
- **title:** Calculus: Cara AI Membaca Arah Perubahan
- **icon:** fas fa-wave-square
- **duration:** 30 menit
- **level:** Core
- **objective:** Peserta memahami fungsi, loss, turunan, gradient, dan chain rule sebagai dasar cara AI belajar dari kesalahan.
- **opening:** AI belajar dengan cara memperbaiki kesalahan sedikit demi sedikit. Untuk tahu apa yang harus diperbaiki, AI perlu membaca arah perubahan. Di sinilah calculus digunakan.
- **coreConcept:** Calculus membantu AI mengetahui bagaimana perubahan kecil pada parameter dapat memengaruhi nilai kesalahan. Turunan menunjukkan arah perubahan, gradient menjadi kompas, dan chain rule membantu menyebarkan informasi kesalahan dalam neural network.
##### keyPoints

- Fungsi adalah mesin input-output.
- Loss function mengukur seberapa besar kesalahan prediksi AI.
- Turunan menunjukkan laju perubahan.
- Gradient menunjukkan arah kenaikan tercepat.
- AI bergerak ke arah kebalikan gradient untuk menurunkan error.
- Chain rule adalah dasar backpropagation pada neural network.

- **analogy:** Bayangkan AI sedang turun gunung dengan mata tertutup. AI ingin mencari lembah paling rendah, yaitu error paling kecil. Gradient memberi tahu arah tanjakan, lalu AI berjalan ke arah sebaliknya agar turun.
- **aiExample:** Saat model salah memprediksi, loss function menghitung besar kesalahan. Gradient membantu menentukan parameter mana yang harus diubah agar kesalahan berikutnya lebih kecil.
- **herAiExample:** Jika HerAI memiliki model rekomendasi materi dan rekomendasinya tidak dibuka peserta, sistem dapat menganggap rekomendasi itu kurang tepat. Dalam model AI, error ini dapat dipakai sebagai sinyal untuk memperbaiki bobot rekomendasi.
- **miniFormula:** Prediksi -> Loss -> Gradient -> Update Parameter
- **advancedNote:** Turunan parsial, Hessian, dan integral penting dalam AI tingkat lanjut, tetapi fokus pemula adalah memahami arah perubahan dan hubungan calculus dengan training model.
- **summary:** Calculus membantu AI membaca arah perbaikan agar nilai kesalahan dapat dikurangi.

#### Optimization: Cara AI Mencari Hasil Terbaik

- **id:** optimization
- **route:** #/participant-ai-lab-math-optimization
- **title:** Optimization: Cara AI Mencari Hasil Terbaik
- **icon:** fas fa-bullseye
- **duration:** 30 menit
- **level:** Core
- **objective:** Peserta memahami optimasi sebagai proses mencari parameter terbaik agar model menghasilkan prediksi paling akurat.
- **opening:** AI tidak langsung pintar. Model biasanya mulai dari tebakan awal yang masih buruk, lalu memperbaiki diri berkali-kali. Proses mencari konfigurasi terbaik inilah yang disebut optimasi.
- **coreConcept:** Optimization adalah proses mencari nilai terbaik dari sebuah fungsi tujuan. Dalam AI, biasanya yang dicari adalah nilai loss paling kecil. Gradient descent, learning rate, optimizer, regularisasi, dan dropout adalah bagian dari strategi optimasi.
##### keyPoints

- AI biasanya melakukan minimisasi error.
- Gradient descent memperbaiki model sedikit demi sedikit.
- Learning rate menentukan besar langkah belajar.
- Learning rate terlalu kecil membuat proses lambat.
- Learning rate terlalu besar bisa membuat model melewati titik terbaik.
- Optimizer seperti SGD, Momentum, RMSProp, dan Adam membantu proses training.
- Regularisasi membantu mencegah model terlalu hafal data latihan.
- Overfitting terjadi saat model bagus di data latihan tetapi buruk di data baru.

- **analogy:** Optimization seperti mencari titik terendah di pegunungan. Jika langkah terlalu kecil, perjalanan lama. Jika langkah terlalu besar, kita bisa melewati lembah terbaik. Strategi berjalan yang tepat membuat kita sampai lebih cepat dan stabil.
- **aiExample:** Dalam machine learning, optimizer mengubah bobot model berdasarkan loss dan gradient. Tujuannya agar model tidak hanya benar di data latihan, tetapi juga baik pada data baru.
- **herAiExample:** Jika HerAI nanti punya sistem rekomendasi otomatis, optimasi dapat membantu sistem mencari pola rekomendasi yang paling sering membuat peserta menyelesaikan materi dan mendapat skor lebih baik.
- **miniFormula:** Loss besar -> update bobot -> loss lebih kecil -> ulangi sampai stabil
- **advancedNote:** Metode Newton, Lagrange multiplier, KKT, simulated annealing, genetic algorithm, dan particle swarm adalah topik optimasi lanjutan yang tidak perlu masuk MVP course pemula.
- **summary:** Optimization membantu AI mencari setelan terbaik agar prediksi semakin akurat dan tidak terlalu menghafal data latihan.

#### Case Study: Math for AI di HerAI SuperApp

- **id:** case-study
- **route:** #/participant-ai-lab-math-case-study
- **title:** Case Study: Math for AI di HerAI SuperApp
- **icon:** fas fa-diagram-project
- **duration:** 20 menit
- **level:** Applied
- **objective:** Peserta memahami hubungan semua materi Math for AI dengan fitur nyata di HerAI SuperApp.
- **opening:** Setelah memahami linear algebra, statistics, probability, calculus, dan optimization, kita perlu melihat bagaimana semuanya terhubung dalam satu fitur nyata.
- **coreConcept:** Salah satu contoh fitur yang cocok untuk menjelaskan Math for AI adalah rekomendasi materi belajar. Sistem dapat memakai data peserta, progress, skor quiz, dan minat untuk memberikan rekomendasi materi yang lebih relevan.
##### keyPoints

- Linear algebra mengubah profil peserta dan materi menjadi vektor.
- Statistics membaca pola progress dan nilai peserta.
- Probability menghitung peluang kecocokan materi.
- Calculus membantu memahami arah perbaikan model.
- Optimization mencari parameter terbaik agar rekomendasi semakin tepat.
- Evaluasi dilakukan dengan melihat apakah peserta membuka, menyelesaikan, dan mendapat nilai baik pada materi yang direkomendasikan.

- **analogy:** Bayangkan mentor yang mengenal banyak peserta. Mentor melihat minat, kemampuan, dan progress mereka, lalu menyarankan materi yang paling cocok. AI melakukan hal serupa, tetapi menggunakan angka dan pola.
- **aiExample:** Recommendation system di platform belajar memakai interaksi user untuk menebak materi yang paling relevan. Semakin banyak data interaksi, semakin baik rekomendasinya.
- **herAiExample:** HerAI dapat menyimpan data seperti minat AI, skill Python, skor Math for AI, durasi belajar, dan materi yang sering dibuka. Data ini dapat dipakai untuk membuat rekomendasi learning path berikutnya.
- **miniFormula:** Profil Peserta + Data Materi + Progress + Skor Quiz -> Rekomendasi Belajar
- **advancedNote:** Pada tahap lanjut, HerAI dapat memakai model rekomendasi berbasis similarity, collaborative filtering, atau learning-to-rank.
- **summary:** Math for AI bukan sekadar teori, tetapi fondasi untuk membangun fitur rekomendasi, evaluasi, dan personalisasi belajar di HerAI.

#### mathForAiPracticeTasks

#### Latihan 1: Ubah Profil Peserta Menjadi Vektor

- **id:** practice-vector
- **title:** Latihan 1: Ubah Profil Peserta Menjadi Vektor
- **prompt:** Bayangkan seorang peserta memiliki minat AI tinggi, kemampuan Python dasar, pemahaman statistik rendah, dan minat UI/UX sedang. Tuliskan bagaimana data tersebut bisa direpresentasikan sebagai vektor angka.
- **placeholder:** Contoh: [AI = 5, Python = 2, Statistik = 1, UI/UX = 3] lalu jelaskan arti setiap angka...

#### Latihan 2: Baca Pola Data Peserta

- **id:** practice-statistics
- **title:** Latihan 2: Baca Pola Data Peserta
- **prompt:** Jika rata-rata nilai quiz peserta adalah 72, tetapi standar deviasinya besar, apa artinya bagi mentor atau admin HerAI?
- **placeholder:** Jelaskan dengan bahasa sederhana. Hubungkan dengan kondisi peserta yang pemahamannya mungkin tidak merata...

#### Latihan 3: Pahami Confidence Score

- **id:** practice-probability
- **title:** Latihan 3: Pahami Confidence Score
- **prompt:** Jika HerAI menampilkan rekomendasi 'Math for AI cocok untuk kamu: 84%', bagaimana kamu menjelaskan arti angka 84% kepada peserta non-IT?
- **placeholder:** Jelaskan bahwa angka ini adalah tingkat kecocokan atau keyakinan sistem, bukan kepastian mutlak...

#### Latihan 4: Analogi Gradient Descent

- **id:** practice-gradient
- **title:** Latihan 4: Analogi Gradient Descent
- **prompt:** Jelaskan ulang analogi AI turun gunung untuk mencari error paling kecil. Apa peran gradient dan learning rate dalam analogi tersebut?
- **placeholder:** Gradient menunjukkan arah tanjakan, AI berjalan ke arah sebaliknya, learning rate adalah besar langkah...

#### Latihan 5: Hubungkan Math for AI ke HerAI

- **id:** practice-herai-case
- **title:** Latihan 5: Hubungkan Math for AI ke HerAI
- **prompt:** Buat satu ide fitur sederhana di HerAI yang memakai konsep Math for AI. Jelaskan konsep matematika apa saja yang terlibat.
- **placeholder:** Contoh: fitur rekomendasi materi memakai vektor, statistik progress, probabilitas kecocokan, dan optimasi...

#### mathForAiQuiz

#### Item 1

- **id:** q1
- **question:** Kenapa AI membutuhkan matematika?
##### options

- Karena AI hanya bisa bekerja dengan data yang sudah berbentuk angka
- Karena AI tidak membutuhkan data
- Karena semua AI hanya berisi rumus kalkulator
- Karena matematika menggantikan semua proses programming

- **correctIndex:** 0
- **explanation:** AI memproses teks, gambar, suara, dan aktivitas user setelah data tersebut direpresentasikan menjadi angka.

#### Item 2

- **id:** q2
- **question:** Apa itu vektor dalam konteks AI?
##### options

- Gambar yang sudah diberi warna
- Daftar angka yang merepresentasikan satu objek atau data
- Database untuk menyimpan password
- Bahasa pemrograman untuk AI

- **correctIndex:** 1
- **explanation:** Vektor adalah daftar angka. Dalam AI, satu user, satu kata, satu gambar, atau satu materi dapat direpresentasikan sebagai vektor.

#### Item 3

- **id:** q3
- **question:** Apa peran matriks dalam AI?
##### options

- Menghapus data yang salah
- Menyimpan kumpulan vektor atau tabel angka
- Menggantikan semua algoritma
- Membuat tampilan UI menjadi responsif

- **correctIndex:** 1
- **explanation:** Matriks adalah tabel angka yang dapat berisi banyak vektor. Neural network juga banyak memakai operasi matriks.

#### Item 4

- **id:** q4
- **question:** Apa fungsi dot product secara sederhana?
##### options

- Mengukur kecocokan atau kemiripan dua vektor
- Mengubah warna gambar
- Menghapus outlier
- Menentukan password user

- **correctIndex:** 0
- **explanation:** Dot product dapat dipakai untuk melihat apakah dua vektor memiliki arah atau kecocokan yang mirip.

#### Item 5

- **id:** q5
- **question:** Apa manfaat standar deviasi dalam statistik?
##### options

- Mengukur seberapa menyebar data dari rata-rata
- Mengubah teks menjadi angka
- Menentukan warna dashboard
- Menyimpan file materi

- **correctIndex:** 0
- **explanation:** Standar deviasi membantu melihat apakah data peserta stabil atau sangat bervariasi.

#### Item 6

- **id:** q6
- **question:** Apa yang dimaksud dengan outlier?
##### options

- Data yang sangat berbeda dari pola umum
- Data yang selalu benar
- Data yang tidak boleh dihitung
- Data yang hanya muncul di UI

- **correctIndex:** 0
- **explanation:** Outlier adalah nilai yang jauh berbeda dari data lainnya dan perlu diperiksa lebih lanjut.

#### Item 7

- **id:** q7
- **question:** Apa arti confidence score dalam AI?
##### options

- Tingkat keyakinan model terhadap prediksinya
- Jumlah file yang berhasil diupload
- Kecepatan internet user
- Jumlah halaman dalam modul

- **correctIndex:** 0
- **explanation:** Confidence score menunjukkan seberapa yakin model terhadap output yang diberikan.

#### Item 8

- **id:** q8
- **question:** Apa fungsi Bayes secara konsep?
##### options

- Memperbarui keyakinan setelah mendapat bukti baru
- Menghapus semua data lama
- Membuat layout dashboard
- Mengubah HTML menjadi CSS

- **correctIndex:** 0
- **explanation:** Bayes membantu sistem memperbarui prediksi atau keyakinan berdasarkan informasi baru.

#### Item 9

- **id:** q9
- **question:** Apa fungsi loss function dalam AI?
##### options

- Mengukur kesalahan prediksi model
- Menampilkan ikon pada halaman
- Menyimpan gambar user
- Mengatur warna tombol

- **correctIndex:** 0
- **explanation:** Loss function mengukur seberapa jauh prediksi AI dari jawaban sebenarnya.

#### Item 10

- **id:** q10
- **question:** Apa peran gradient dalam proses belajar AI?
##### options

- Menunjukkan arah perubahan agar error dapat dikurangi
- Menghapus route yang tidak dipakai
- Mengatur ukuran font
- Membuat data selalu benar

- **correctIndex:** 0
- **explanation:** Gradient membantu model mengetahui arah perubahan parameter yang memengaruhi loss.

#### Item 11

- **id:** q11
- **question:** Apa yang terjadi jika learning rate terlalu besar?
##### options

- Model bisa melewati titik terbaik dan tidak stabil
- Model pasti langsung sempurna
- Data otomatis bersih
- Quiz otomatis benar semua

- **correctIndex:** 0
- **explanation:** Learning rate terlalu besar dapat membuat proses training melompat terlalu jauh dan gagal stabil.

#### Item 12

- **id:** q12
- **question:** Apa itu overfitting?
##### options

- Model terlalu hafal data latihan dan buruk pada data baru
- Model tidak bisa membaca angka
- Model tidak punya data sama sekali
- Model hanya mengubah tampilan dashboard

- **correctIndex:** 0
- **explanation:** Overfitting terjadi ketika model terlalu cocok dengan data latihan sehingga gagal melakukan generalisasi.

#### mathForAiDiscussionPrompts

#### Menurutmu bagian Math for AI mana yang paling sulit?

- **id:** discussion-main
- **title:** Menurutmu bagian Math for AI mana yang paling sulit?
- **body:** Bagikan bagian yang paling membingungkan, misalnya vektor, probabilitas, gradient, atau optimasi. Jelaskan juga kenapa bagian itu terasa sulit.

#### Ide fitur HerAI berbasis Math for AI

- **id:** discussion-case
- **title:** Ide fitur HerAI berbasis Math for AI
- **body:** Tuliskan satu ide fitur HerAI yang menurutmu bisa memakai konsep Math for AI. Misalnya rekomendasi materi, deteksi peserta tertinggal, atau confidence score untuk quiz.
