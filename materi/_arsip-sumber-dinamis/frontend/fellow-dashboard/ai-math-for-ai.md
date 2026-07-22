# Sumber Dinamis: ai-math-for-ai.js

> Sumber: `js/frontend/fellow-dashboard/ai-math-for-ai.js`
> Arsip lengkap JavaScript pembentuk materi/interaksi. Disimpan tanpa potongan agar string, soal, pembahasan, konfigurasi, dan variasi interaktif tetap terlacak.

````javascript
(function() {
    'use strict';

    const MATH_AI_STORAGE_KEYS = {
        progress: 'heraiAiMathProgress',
        currentLesson: 'heraiAiMathCurrentLesson',
        practice: 'heraiAiMathPractice',
        quizDone: 'heraiAiMathQuizDone',
        quizScore: 'heraiAiMathQuizScore',
        discussion: 'heraiAiMathDiscussion'
    };

    const mathForAiCourse = {
        id: 'math-for-ai',
        title: 'Math for AI',
        subtitle: 'Memahami cara AI berpikir, belajar, dan mengambil keputusan dengan angka.',
        category: 'Foundation & Core AI',
        level: 'Beginner Friendly',
        audience: 'Fellowship Non-IT',
        estimatedDuration: '2-3 jam',
        totalLessons: 7,
        passingGrade: 75,
        description: 'Course ini membantu peserta memahami matematika inti di balik AI tanpa harus menjadi ahli matematika. Peserta akan belajar bagaimana data diubah menjadi angka, bagaimana AI membaca pola, bagaimana model membuat prediksi, mengukur kesalahan, memperbaiki diri, dan mengambil keputusan berdasarkan peluang.',
        outcomes: [
            'Memahami kenapa AI membutuhkan matematika.',
            'Memahami data sebagai vektor dan matriks.',
            'Membaca pola dasar data menggunakan statistik.',
            'Memahami probabilitas dan confidence score dalam AI.',
            'Memahami fungsi, turunan, gradient, dan loss function secara konseptual.',
            'Memahami optimasi, gradient descent, learning rate, regularisasi, dan overfitting.',
            'Menghubungkan seluruh konsep Math for AI ke fitur nyata di HerAI SuperApp.'
        ]
    };

    const mathForAiLessons = [
        {
            id: 'intro',
            route: '#/participant-ai-lab-math-intro',
            title: 'Kenapa AI Butuh Matematika?',
            icon: 'fas fa-brain',
            duration: '15 menit',
            level: 'Foundation',
            objective: 'Peserta memahami bahwa AI tidak membaca dunia seperti manusia, tetapi memproses data dalam bentuk angka.',
            opening: 'Saat manusia melihat gambar, kita langsung mengenali wajah, warna, dan ekspresi. Namun komputer tidak melihat gambar seperti itu. Komputer hanya membaca angka. Teks, gambar, suara, nilai quiz, durasi belajar, dan aktivitas user semuanya harus diterjemahkan menjadi data numerik agar bisa diproses oleh AI.',
            coreConcept: 'Matematika adalah bahasa internal AI. Dengan matematika, AI dapat menyimpan data, menghitung kemiripan, membaca pola, memperkirakan peluang, mengukur kesalahan, dan memperbaiki model agar hasil prediksinya semakin baik.',
            keyPoints: [
                'AI tidak memahami teks, gambar, atau suara secara langsung.',
                'Semua data harus diubah menjadi angka.',
                'Angka membuat data bisa dihitung, dibandingkan, dan dipelajari.',
                'Math for AI membantu kita memahami proses kerja AI dari dalam.',
                'Core Math for AI terdiri dari linear algebra, statistics, probability, calculus, dan optimization.'
            ],
            analogy: 'Bayangkan AI seperti mesin kasir. Mesin kasir tidak peduli bentuk barangnya, tetapi membaca kode, harga, jumlah, dan angka. AI juga begitu. Bedanya, AI membaca angka dalam jumlah sangat besar untuk menemukan pola.',
            aiExample: 'Sistem rekomendasi seperti Netflix, Spotify, atau platform belajar dapat menebak konten yang cocok untuk user karena profil user dan konten diubah menjadi angka, lalu dihitung tingkat kecocokannya.',
            herAiExample: 'Di HerAI, data seperti minat peserta, progress modul, nilai quiz, dan aktivitas belajar dapat diubah menjadi angka untuk membantu sistem merekomendasikan materi yang lebih tepat.',
            miniFormula: 'Data nyata -> angka -> perhitungan -> prediksi -> evaluasi -> perbaikan',
            advancedNote: 'Di tahap lanjutan, proses mengubah data menjadi angka dapat melibatkan embedding, feature engineering, normalisasi, dan representasi multidimensi.',
            summary: 'AI membutuhkan matematika karena semua proses belajar model dimulai dari data yang diubah menjadi angka.'
        },
        {
            id: 'linear-algebra',
            route: '#/participant-ai-lab-math-linear-algebra',
            title: 'Linear Algebra: Data sebagai Vektor dan Matriks',
            icon: 'fas fa-table-cells',
            duration: '25 menit',
            level: 'Core',
            objective: 'Peserta memahami bahwa vektor dan matriks adalah cara utama AI menyimpan dan menghitung data.',
            opening: 'Linear algebra adalah fondasi paling penting untuk memahami bagaimana AI menyimpan data. Dalam AI, satu objek dapat direpresentasikan sebagai vektor, sedangkan kumpulan banyak objek dapat disusun menjadi matriks.',
            coreConcept: 'Vektor adalah daftar angka yang mewakili satu data. Matriks adalah tabel angka yang berisi banyak vektor. Dengan vektor dan matriks, AI dapat menghitung kemiripan, jarak, transformasi data, dan proses layer pada neural network.',
            keyPoints: [
                'Vektor merepresentasikan satu objek atau satu data.',
                'Matriks merepresentasikan kumpulan banyak data.',
                'Dot product dapat dipakai untuk mengukur kecocokan atau kemiripan arah dua vektor.',
                'Norm atau jarak membantu AI melihat seberapa jauh dua data berbeda.',
                'Perkalian matriks menjadi dasar banyak proses di neural network.'
            ],
            analogy: 'Vektor bisa dianggap seperti kartu identitas numerik. Misalnya seorang peserta punya skor minat AI, kemampuan coding, dan pemahaman statistik. Semua itu bisa ditulis sebagai daftar angka.',
            aiExample: 'Dalam sistem rekomendasi, profil user dan profil materi bisa diubah menjadi vektor. Jika arah vektornya mirip, sistem menilai user kemungkinan cocok dengan materi tersebut.',
            herAiExample: 'Contoh profil peserta HerAI: [AI = 5, Python = 2, Statistik = 1, UI/UX = 3]. Contoh profil materi Math for AI: [AI = 5, Python = 1, Statistik = 5, UI/UX = 1]. Sistem bisa menghitung kecocokan dua vektor ini.',
            miniFormula: 'User Vector = [5, 2, 1, 3], Materi Vector = [5, 1, 5, 1]',
            advancedNote: 'Konsep seperti eigenvector, PCA, dan SVD penting untuk meringkas data besar, tetapi untuk pemula cukup pahami bahwa semuanya membantu AI menemukan struktur penting dalam data.',
            summary: 'Linear algebra membuat AI bisa menyimpan data sebagai vektor dan matriks agar data dapat dihitung.'
        },
        {
            id: 'statistics',
            route: '#/participant-ai-lab-math-statistics',
            title: 'Statistics for AI: Membaca Pola dari Data',
            icon: 'fas fa-chart-line',
            duration: '25 menit',
            level: 'Core',
            objective: 'Peserta memahami statistik dasar untuk membaca pola, penyebaran, hubungan, dan anomali pada data.',
            opening: 'Sebelum AI belajar dari data, manusia perlu memahami data tersebut. Statistik membantu kita melihat gambaran umum data, apakah datanya stabil, menyebar, berhubungan, atau memiliki nilai aneh yang perlu diperiksa.',
            coreConcept: 'Statistik membantu AI dan manusia memahami data melalui ukuran seperti mean, median, modus, standar deviasi, korelasi, distribusi, dan outlier.',
            keyPoints: [
                'Mean menunjukkan rata-rata data.',
                'Median menunjukkan nilai tengah.',
                'Modus menunjukkan nilai yang paling sering muncul.',
                'Standar deviasi menunjukkan seberapa menyebar data dari rata-rata.',
                'Korelasi membantu melihat hubungan dua variabel.',
                'Outlier adalah data yang sangat berbeda dari pola umum.'
            ],
            analogy: 'Statistik seperti melihat suasana kelas dari jauh. Kita tidak melihat satu peserta saja, tetapi melihat rata-rata nilai, siapa yang tertinggal, siapa yang terlalu jauh berbeda, dan pola umum kelas.',
            aiExample: 'Sebelum melatih model, data scientist biasanya mengecek statistik data. Jika ada nilai kosong, outlier ekstrem, atau distribusi tidak seimbang, model bisa belajar secara keliru.',
            herAiExample: 'Di HerAI, statistik bisa dipakai untuk melihat rata-rata skor quiz Math for AI, lesson paling sulit, peserta yang progress-nya tertinggal, dan hubungan antara durasi belajar dengan skor quiz.',
            miniFormula: 'Rata-rata = total nilai / jumlah peserta',
            advancedNote: 'Pada tahap lanjutan, statistik juga dipakai untuk sampling, hypothesis testing, confidence interval, dan evaluasi performa model.',
            summary: 'Statistics membantu membaca pola data sebelum data dipakai untuk membuat keputusan atau melatih AI.'
        },
        {
            id: 'probability',
            route: '#/participant-ai-lab-math-probability',
            title: 'Probability: AI Tidak Selalu Pasti',
            icon: 'fas fa-percent',
            duration: '25 menit',
            level: 'Core',
            objective: 'Peserta memahami bahwa banyak output AI berbentuk peluang, confidence score, atau tingkat keyakinan.',
            opening: 'AI jarang benar-benar mengatakan sesuatu dengan kepastian mutlak. Dalam banyak kasus, AI memberi prediksi dalam bentuk peluang. Misalnya peluang email adalah spam 95%, peluang gambar adalah kucing 87%, atau peluang peserta cocok belajar Python 80%.',
            coreConcept: 'Probability membantu AI menghadapi ketidakpastian. Dengan probabilitas, AI dapat menghitung kemungkinan kejadian, memperbarui keyakinan setelah melihat bukti baru, dan memberi confidence score pada prediksi.',
            keyPoints: [
                'Probabilitas adalah ukuran kemungkinan.',
                'Probabilitas berada antara 0 sampai 1 atau 0% sampai 100%.',
                'Conditional probability menghitung peluang jika kondisi tertentu sudah terjadi.',
                'Bayes membantu AI memperbarui keyakinan setelah mendapat bukti baru.',
                'Distribusi membantu memahami pola penyebaran peluang.',
                'Cross entropy menghukum prediksi yang salah, terutama jika model terlalu percaya diri.'
            ],
            analogy: 'Probabilitas seperti menebak cuaca. Kita tidak bisa selalu berkata pasti hujan, tetapi bisa berkata kemungkinan hujan 80% karena melihat awan gelap, kelembapan tinggi, dan data cuaca sebelumnya.',
            aiExample: 'Spam filter menggunakan probabilitas untuk menebak apakah email termasuk spam berdasarkan kata-kata tertentu, pengirim, pola link, dan riwayat email sebelumnya.',
            herAiExample: 'HerAI dapat menampilkan rekomendasi seperti: Python Basic cocok 91%, Math for AI cocok 84%, UI Design cocok 55%. Angka ini menunjukkan tingkat kecocokan, bukan kepastian absolut.',
            miniFormula: 'Prior + Bukti Baru -> Posterior',
            advancedNote: 'Konsep seperti entropy, KL divergence, dan Bayesian inference penting dalam AI modern, tetapi untuk pemula cukup pahami bahwa AI sering berpikir dalam bentuk kemungkinan.',
            summary: 'Probability membantu AI membuat keputusan saat data tidak memberi jawaban yang benar-benar pasti.'
        },
        {
            id: 'calculus',
            route: '#/participant-ai-lab-math-calculus',
            title: 'Calculus: Cara AI Membaca Arah Perubahan',
            icon: 'fas fa-wave-square',
            duration: '30 menit',
            level: 'Core',
            objective: 'Peserta memahami fungsi, loss, turunan, gradient, dan chain rule sebagai dasar cara AI belajar dari kesalahan.',
            opening: 'AI belajar dengan cara memperbaiki kesalahan sedikit demi sedikit. Untuk tahu apa yang harus diperbaiki, AI perlu membaca arah perubahan. Di sinilah calculus digunakan.',
            coreConcept: 'Calculus membantu AI mengetahui bagaimana perubahan kecil pada parameter dapat memengaruhi nilai kesalahan. Turunan menunjukkan arah perubahan, gradient menjadi kompas, dan chain rule membantu menyebarkan informasi kesalahan dalam neural network.',
            keyPoints: [
                'Fungsi adalah mesin input-output.',
                'Loss function mengukur seberapa besar kesalahan prediksi AI.',
                'Turunan menunjukkan laju perubahan.',
                'Gradient menunjukkan arah kenaikan tercepat.',
                'AI bergerak ke arah kebalikan gradient untuk menurunkan error.',
                'Chain rule adalah dasar backpropagation pada neural network.'
            ],
            analogy: 'Bayangkan AI sedang turun gunung dengan mata tertutup. AI ingin mencari lembah paling rendah, yaitu error paling kecil. Gradient memberi tahu arah tanjakan, lalu AI berjalan ke arah sebaliknya agar turun.',
            aiExample: 'Saat model salah memprediksi, loss function menghitung besar kesalahan. Gradient membantu menentukan parameter mana yang harus diubah agar kesalahan berikutnya lebih kecil.',
            herAiExample: 'Jika HerAI memiliki model rekomendasi materi dan rekomendasinya tidak dibuka peserta, sistem dapat menganggap rekomendasi itu kurang tepat. Dalam model AI, error ini dapat dipakai sebagai sinyal untuk memperbaiki bobot rekomendasi.',
            miniFormula: 'Prediksi -> Loss -> Gradient -> Update Parameter',
            advancedNote: 'Turunan parsial, Hessian, dan integral penting dalam AI tingkat lanjut, tetapi fokus pemula adalah memahami arah perubahan dan hubungan calculus dengan training model.',
            summary: 'Calculus membantu AI membaca arah perbaikan agar nilai kesalahan dapat dikurangi.'
        },
        {
            id: 'optimization',
            route: '#/participant-ai-lab-math-optimization',
            title: 'Optimization: Cara AI Mencari Hasil Terbaik',
            icon: 'fas fa-bullseye',
            duration: '30 menit',
            level: 'Core',
            objective: 'Peserta memahami optimasi sebagai proses mencari parameter terbaik agar model menghasilkan prediksi paling akurat.',
            opening: 'AI tidak langsung pintar. Model biasanya mulai dari tebakan awal yang masih buruk, lalu memperbaiki diri berkali-kali. Proses mencari konfigurasi terbaik inilah yang disebut optimasi.',
            coreConcept: 'Optimization adalah proses mencari nilai terbaik dari sebuah fungsi tujuan. Dalam AI, biasanya yang dicari adalah nilai loss paling kecil. Gradient descent, learning rate, optimizer, regularisasi, dan dropout adalah bagian dari strategi optimasi.',
            keyPoints: [
                'AI biasanya melakukan minimisasi error.',
                'Gradient descent memperbaiki model sedikit demi sedikit.',
                'Learning rate menentukan besar langkah belajar.',
                'Learning rate terlalu kecil membuat proses lambat.',
                'Learning rate terlalu besar bisa membuat model melewati titik terbaik.',
                'Optimizer seperti SGD, Momentum, RMSProp, dan Adam membantu proses training.',
                'Regularisasi membantu mencegah model terlalu hafal data latihan.',
                'Overfitting terjadi saat model bagus di data latihan tetapi buruk di data baru.'
            ],
            analogy: 'Optimization seperti mencari titik terendah di pegunungan. Jika langkah terlalu kecil, perjalanan lama. Jika langkah terlalu besar, kita bisa melewati lembah terbaik. Strategi berjalan yang tepat membuat kita sampai lebih cepat dan stabil.',
            aiExample: 'Dalam machine learning, optimizer mengubah bobot model berdasarkan loss dan gradient. Tujuannya agar model tidak hanya benar di data latihan, tetapi juga baik pada data baru.',
            herAiExample: 'Jika HerAI nanti punya sistem rekomendasi otomatis, optimasi dapat membantu sistem mencari pola rekomendasi yang paling sering membuat peserta menyelesaikan materi dan mendapat skor lebih baik.',
            miniFormula: 'Loss besar -> update bobot -> loss lebih kecil -> ulangi sampai stabil',
            advancedNote: 'Metode Newton, Lagrange multiplier, KKT, simulated annealing, genetic algorithm, dan particle swarm adalah topik optimasi lanjutan yang tidak perlu masuk MVP course pemula.',
            summary: 'Optimization membantu AI mencari setelan terbaik agar prediksi semakin akurat dan tidak terlalu menghafal data latihan.'
        },
        {
            id: 'case-study',
            route: '#/participant-ai-lab-math-case-study',
            title: 'Case Study: Math for AI di HerAI SuperApp',
            icon: 'fas fa-diagram-project',
            duration: '20 menit',
            level: 'Applied',
            objective: 'Peserta memahami hubungan semua materi Math for AI dengan fitur nyata di HerAI SuperApp.',
            opening: 'Setelah memahami linear algebra, statistics, probability, calculus, dan optimization, kita perlu melihat bagaimana semuanya terhubung dalam satu fitur nyata.',
            coreConcept: 'Salah satu contoh fitur yang cocok untuk menjelaskan Math for AI adalah rekomendasi materi belajar. Sistem dapat memakai data peserta, progress, skor quiz, dan minat untuk memberikan rekomendasi materi yang lebih relevan.',
            keyPoints: [
                'Linear algebra mengubah profil peserta dan materi menjadi vektor.',
                'Statistics membaca pola progress dan nilai peserta.',
                'Probability menghitung peluang kecocokan materi.',
                'Calculus membantu memahami arah perbaikan model.',
                'Optimization mencari parameter terbaik agar rekomendasi semakin tepat.',
                'Evaluasi dilakukan dengan melihat apakah peserta membuka, menyelesaikan, dan mendapat nilai baik pada materi yang direkomendasikan.'
            ],
            analogy: 'Bayangkan mentor yang mengenal banyak peserta. Mentor melihat minat, kemampuan, dan progress mereka, lalu menyarankan materi yang paling cocok. AI melakukan hal serupa, tetapi menggunakan angka dan pola.',
            aiExample: 'Recommendation system di platform belajar memakai interaksi user untuk menebak materi yang paling relevan. Semakin banyak data interaksi, semakin baik rekomendasinya.',
            herAiExample: 'HerAI dapat menyimpan data seperti minat AI, skill Python, skor Math for AI, durasi belajar, dan materi yang sering dibuka. Data ini dapat dipakai untuk membuat rekomendasi learning path berikutnya.',
            miniFormula: 'Profil Peserta + Data Materi + Progress + Skor Quiz -> Rekomendasi Belajar',
            advancedNote: 'Pada tahap lanjut, HerAI dapat memakai model rekomendasi berbasis similarity, collaborative filtering, atau learning-to-rank.',
            summary: 'Math for AI bukan sekadar teori, tetapi fondasi untuk membangun fitur rekomendasi, evaluasi, dan personalisasi belajar di HerAI.'
        }
    ];

    const mathForAiPracticeTasks = [
        {
            id: 'practice-vector',
            title: 'Latihan 1: Ubah Profil Peserta Menjadi Vektor',
            prompt: 'Bayangkan seorang peserta memiliki minat AI tinggi, kemampuan Python dasar, pemahaman statistik rendah, dan minat UI/UX sedang. Tuliskan bagaimana data tersebut bisa direpresentasikan sebagai vektor angka.',
            placeholder: 'Contoh: [AI = 5, Python = 2, Statistik = 1, UI/UX = 3] lalu jelaskan arti setiap angka...'
        },
        {
            id: 'practice-statistics',
            title: 'Latihan 2: Baca Pola Data Peserta',
            prompt: 'Jika rata-rata nilai quiz peserta adalah 72, tetapi standar deviasinya besar, apa artinya bagi mentor atau admin HerAI?',
            placeholder: 'Jelaskan dengan bahasa sederhana. Hubungkan dengan kondisi peserta yang pemahamannya mungkin tidak merata...'
        },
        {
            id: 'practice-probability',
            title: 'Latihan 3: Pahami Confidence Score',
            prompt: "Jika HerAI menampilkan rekomendasi 'Math for AI cocok untuk kamu: 84%', bagaimana kamu menjelaskan arti angka 84% kepada peserta non-IT?",
            placeholder: 'Jelaskan bahwa angka ini adalah tingkat kecocokan atau keyakinan sistem, bukan kepastian mutlak...'
        },
        {
            id: 'practice-gradient',
            title: 'Latihan 4: Analogi Gradient Descent',
            prompt: 'Jelaskan ulang analogi AI turun gunung untuk mencari error paling kecil. Apa peran gradient dan learning rate dalam analogi tersebut?',
            placeholder: 'Gradient menunjukkan arah tanjakan, AI berjalan ke arah sebaliknya, learning rate adalah besar langkah...'
        },
        {
            id: 'practice-herai-case',
            title: 'Latihan 5: Hubungkan Math for AI ke HerAI',
            prompt: 'Buat satu ide fitur sederhana di HerAI yang memakai konsep Math for AI. Jelaskan konsep matematika apa saja yang terlibat.',
            placeholder: 'Contoh: fitur rekomendasi materi memakai vektor, statistik progress, probabilitas kecocokan, dan optimasi...'
        }
    ];

    const mathForAiQuiz = [
        { id: 'q1', question: 'Kenapa AI membutuhkan matematika?', options: ['Karena AI hanya bisa bekerja dengan data yang sudah berbentuk angka', 'Karena AI tidak membutuhkan data', 'Karena semua AI hanya berisi rumus kalkulator', 'Karena matematika menggantikan semua proses programming'], correctIndex: 0, explanation: 'AI memproses teks, gambar, suara, dan aktivitas user setelah data tersebut direpresentasikan menjadi angka.' },
        { id: 'q2', question: 'Apa itu vektor dalam konteks AI?', options: ['Gambar yang sudah diberi warna', 'Daftar angka yang merepresentasikan satu objek atau data', 'Database untuk menyimpan password', 'Bahasa pemrograman untuk AI'], correctIndex: 1, explanation: 'Vektor adalah daftar angka. Dalam AI, satu user, satu kata, satu gambar, atau satu materi dapat direpresentasikan sebagai vektor.' },
        { id: 'q3', question: 'Apa peran matriks dalam AI?', options: ['Menghapus data yang salah', 'Menyimpan kumpulan vektor atau tabel angka', 'Menggantikan semua algoritma', 'Membuat tampilan UI menjadi responsif'], correctIndex: 1, explanation: 'Matriks adalah tabel angka yang dapat berisi banyak vektor. Neural network juga banyak memakai operasi matriks.' },
        { id: 'q4', question: 'Apa fungsi dot product secara sederhana?', options: ['Mengukur kecocokan atau kemiripan dua vektor', 'Mengubah warna gambar', 'Menghapus outlier', 'Menentukan password user'], correctIndex: 0, explanation: 'Dot product dapat dipakai untuk melihat apakah dua vektor memiliki arah atau kecocokan yang mirip.' },
        { id: 'q5', question: 'Apa manfaat standar deviasi dalam statistik?', options: ['Mengukur seberapa menyebar data dari rata-rata', 'Mengubah teks menjadi angka', 'Menentukan warna dashboard', 'Menyimpan file materi'], correctIndex: 0, explanation: 'Standar deviasi membantu melihat apakah data peserta stabil atau sangat bervariasi.' },
        { id: 'q6', question: 'Apa yang dimaksud dengan outlier?', options: ['Data yang sangat berbeda dari pola umum', 'Data yang selalu benar', 'Data yang tidak boleh dihitung', 'Data yang hanya muncul di UI'], correctIndex: 0, explanation: 'Outlier adalah nilai yang jauh berbeda dari data lainnya dan perlu diperiksa lebih lanjut.' },
        { id: 'q7', question: 'Apa arti confidence score dalam AI?', options: ['Tingkat keyakinan model terhadap prediksinya', 'Jumlah file yang berhasil diupload', 'Kecepatan internet user', 'Jumlah halaman dalam modul'], correctIndex: 0, explanation: 'Confidence score menunjukkan seberapa yakin model terhadap output yang diberikan.' },
        { id: 'q8', question: 'Apa fungsi Bayes secara konsep?', options: ['Memperbarui keyakinan setelah mendapat bukti baru', 'Menghapus semua data lama', 'Membuat layout dashboard', 'Mengubah HTML menjadi CSS'], correctIndex: 0, explanation: 'Bayes membantu sistem memperbarui prediksi atau keyakinan berdasarkan informasi baru.' },
        { id: 'q9', question: 'Apa fungsi loss function dalam AI?', options: ['Mengukur kesalahan prediksi model', 'Menampilkan ikon pada halaman', 'Menyimpan gambar user', 'Mengatur warna tombol'], correctIndex: 0, explanation: 'Loss function mengukur seberapa jauh prediksi AI dari jawaban sebenarnya.' },
        { id: 'q10', question: 'Apa peran gradient dalam proses belajar AI?', options: ['Menunjukkan arah perubahan agar error dapat dikurangi', 'Menghapus route yang tidak dipakai', 'Mengatur ukuran font', 'Membuat data selalu benar'], correctIndex: 0, explanation: 'Gradient membantu model mengetahui arah perubahan parameter yang memengaruhi loss.' },
        { id: 'q11', question: 'Apa yang terjadi jika learning rate terlalu besar?', options: ['Model bisa melewati titik terbaik dan tidak stabil', 'Model pasti langsung sempurna', 'Data otomatis bersih', 'Quiz otomatis benar semua'], correctIndex: 0, explanation: 'Learning rate terlalu besar dapat membuat proses training melompat terlalu jauh dan gagal stabil.' },
        { id: 'q12', question: 'Apa itu overfitting?', options: ['Model terlalu hafal data latihan dan buruk pada data baru', 'Model tidak bisa membaca angka', 'Model tidak punya data sama sekali', 'Model hanya mengubah tampilan dashboard'], correctIndex: 0, explanation: 'Overfitting terjadi ketika model terlalu cocok dengan data latihan sehingga gagal melakukan generalisasi.' }
    ];

    const mathForAiDiscussionPrompts = [
        {
            id: 'discussion-main',
            title: 'Menurutmu bagian Math for AI mana yang paling sulit?',
            body: 'Bagikan bagian yang paling membingungkan, misalnya vektor, probabilitas, gradient, atau optimasi. Jelaskan juga kenapa bagian itu terasa sulit.'
        },
        {
            id: 'discussion-case',
            title: 'Ide fitur HerAI berbasis Math for AI',
            body: 'Tuliskan satu ide fitur HerAI yang menurutmu bisa memakai konsep Math for AI. Misalnya rekomendasi materi, deteksi peserta tertinggal, atau confidence score untuk quiz.'
        }
    ];

    function escapeHtml(value = '') {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function readJson(key, fallback) {
        try {
            return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
        } catch {
            return fallback;
        }
    }

    function writeJson(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function currentPath() {
        return window.location.hash.replace(/^#/, '').split('?')[0] || '/participant-ai-lab-math';
    }

    function getMathAiProgress() {
        const fallback = {
            completedLessons: [],
            currentLesson: localStorage.getItem(MATH_AI_STORAGE_KEYS.currentLesson) || 'intro',
            lastAccessedAt: new Date().toISOString()
        };
        const progress = readJson(MATH_AI_STORAGE_KEYS.progress, fallback);
        if (!Array.isArray(progress.completedLessons)) progress.completedLessons = [];
        if (!progress.currentLesson) progress.currentLesson = fallback.currentLesson;
        return progress;
    }

    function saveMathAiProgress(progress) {
        const normalized = {
            completedLessons: Array.from(new Set(progress.completedLessons || [])),
            currentLesson: progress.currentLesson || 'intro',
            lastAccessedAt: new Date().toISOString()
        };
        writeJson(MATH_AI_STORAGE_KEYS.progress, normalized);
        localStorage.setItem(MATH_AI_STORAGE_KEYS.currentLesson, normalized.currentLesson);
        return normalized;
    }

    function markMathAiLessonDone(lessonId) {
        const progress = getMathAiProgress();
        progress.currentLesson = lessonId;
        if (!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
        }
        return saveMathAiProgress(progress);
    }

    function getMathAiLessonByRoute() {
        const path = currentPath();
        return mathForAiLessons.find(lesson => lesson.route.replace(/^#/, '') === path) || mathForAiLessons[0];
    }

    function calculateMathAiProgress() {
        const progress = getMathAiProgress();
        const done = progress.completedLessons.filter(id => mathForAiLessons.some(lesson => lesson.id === id)).length;
        return {
            done,
            total: mathForAiLessons.length,
            percent: Math.round((done / mathForAiLessons.length) * 100),
            progress
        };
    }

    function simpleSimilarity(a, b) {
        const dot = a.reduce((sum, value, index) => sum + value * b[index], 0);
        const normA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
        const normB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));
        return Math.round((dot / (normA * normB)) * 100);
    }

    function renderMathAiProgressPanel(target, activeLessonId = '') {
        const panel = typeof target === 'string' ? document.getElementById(target) : target;
        if (!panel) return;
        const state = calculateMathAiProgress();
        panel.innerHTML = `
            <section class="module-side-card lesson-progress-card">
                <h2>Progress Math for AI</h2>
                <div class="lesson-progress-mini"><b style="--value:${state.percent}%"></b><strong>${state.percent}%</strong></div>
                <p>${state.done} dari ${state.total} lesson selesai.</p>
                <a href="#/participant-ai-lab-math-practice">Buka Latihan</a>
            </section>
            <section class="module-side-card lesson-list-card">
                <h2>Daftar Lesson</h2>
                <ol>
                    ${mathForAiLessons.map((lesson, index) => {
                        const active = lesson.id === activeLessonId ? ' class="active"' : '';
                        const completed = state.progress.completedLessons.includes(lesson.id);
                        const icon = completed ? 'fas fa-circle-check' : (lesson.id === activeLessonId ? 'far fa-circle-play' : 'far fa-circle');
                        return `<li${active}><span>${index + 1}</span><a href="${lesson.route}">${escapeHtml(lesson.title)}</a><i class="${icon}"></i></li>`;
                    }).join('')}
                </ol>
            </section>
            <section class="module-side-card lesson-note-card lesson-compact-note">
                <div class="module-side-head"><h2>Next Step</h2></div>
                <p>Setelah selesai semua lesson, kerjakan latihan, submit kuis, lalu lanjut diskusi.</p>
                <a href="#/participant-ai-lab-math-quiz">Ke Kuis</a>
            </section>
        `;
    }

    function renderMathAiTabs(active) {
        const items = [
            ['overview', '#/participant-ai-lab-math', 'fas fa-layer-group', 'Overview'],
            ['lesson', '#/participant-ai-lab-math-intro', 'fas fa-book-open', 'Materi'],
            ['practice', '#/participant-ai-lab-math-practice', 'fas fa-pen-to-square', 'Latihan'],
            ['quiz', '#/participant-ai-lab-math-quiz', 'far fa-clipboard', 'Kuis'],
            ['discussion', '#/participant-ai-lab-math-discussion', 'far fa-message', 'Diskusi']
        ];
        return `<div class="lesson-tabs" role="tablist" aria-label="Navigasi Math for AI">${items.map(item => `<a href="${item[1]}" class="${item[0] === active ? 'active' : ''}"><i class="${item[2]}"></i> ${item[3]}</a>`).join('')}</div>`;
    }

    function setupSimilaritySimulation(scope) {
        const root = scope.querySelector('[data-math-sim]');
        if (!root) return;
        const output = root.querySelector('[data-sim-output]');
        const inputs = Array.from(root.querySelectorAll('input[type="range"]'));
        const labels = Array.from(root.querySelectorAll('[data-range-value]'));
        const materialVector = [5, 1, 5, 1];
        const update = () => {
            const values = inputs.map(input => Number(input.value));
            labels.forEach((label, index) => { label.textContent = values[index]; });
            const score = simpleSimilarity(values, materialVector);
            if (output) {
                output.innerHTML = `<strong>${score}% cocok</strong><span>Semakin dekat arah profil peserta dengan profil materi, semakin tinggi kecocokannya.</span>`;
            }
        };
        inputs.forEach(input => input.addEventListener('input', update));
        update();
    }

    window.initAiLabMathOverview = function() {
        const container = document.getElementById('mathAiOverview');
        if (!container || container.dataset.ready) return;
        container.dataset.ready = 'true';
        const state = calculateMathAiProgress();
        container.innerHTML = `
            <section class="lesson-hero compact math-ai-hero">
                <div class="lesson-hero-copy">
                    <span class="math-ai-eyebrow"><i class="fas fa-square-root-variable"></i> ${escapeHtml(mathForAiCourse.category)}</span>
                    <h1>${escapeHtml(mathForAiCourse.title)}</h1>
                    <p>${escapeHtml(mathForAiCourse.subtitle)}</p>
                    <div class="lesson-meta-row">
                        <span><i class="far fa-clock"></i> ${escapeHtml(mathForAiCourse.estimatedDuration)}</span>
                        <span><i class="fas fa-layer-group"></i> ${mathForAiCourse.totalLessons} Lesson</span>
                        <b><i class="fas fa-user-graduate"></i> ${escapeHtml(mathForAiCourse.level)}</b>
                    </div>
                </div>
                <img src="/assets/messaging/herai-chat-persona.png" alt="HerAI Math for AI learning">
            </section>
            <section class="lesson-material-panel">
                ${renderMathAiTabs('overview')}
                <article class="lesson-article math-ai-content">
                    <div class="math-ai-card">
                        <h2>Math for AI bukan tentang menghafal rumus</h2>
                        <p>${escapeHtml(mathForAiCourse.description)}</p>
                    </div>
                    <div class="math-ai-grid">
                        ${mathForAiCourse.outcomes.map((item, index) => `<article class="math-ai-card"><span>${index + 1}</span><p>${escapeHtml(item)}</p></article>`).join('')}
                    </div>
                    <div class="math-ai-simulation" data-math-sim>
                        <div>
                            <span class="math-ai-eyebrow"><i class="fas fa-diagram-project"></i> Simulasi Profil Vektor</span>
                            <h2>Seberapa cocok profil peserta dengan Math for AI?</h2>
                            <p>Ubah nilai profil peserta dan lihat estimasi kecocokan sederhana berbasis cosine similarity.</p>
                        </div>
                        ${['AI', 'Python', 'Statistik', 'UI/UX'].map((label, index) => `
                            <label><span>${label}</span><b data-range-value>${[5, 2, 1, 3][index]}</b><input type="range" min="1" max="5" value="${[5, 2, 1, 3][index]}"></label>
                        `).join('')}
                        <div class="math-ai-sim-result" data-sim-output></div>
                    </div>
                    <div class="math-ai-lesson-grid">
                        ${mathForAiLessons.map((lesson, index) => {
                            const done = state.progress.completedLessons.includes(lesson.id);
                            return `<a href="${lesson.route}" class="math-ai-lesson-card ${done ? 'is-done' : ''}">
                                <i class="${lesson.icon}"></i>
                                <span>${String(index + 1).padStart(2, '0')}</span>
                                <h3>${escapeHtml(lesson.title)}</h3>
                                <p>${escapeHtml(lesson.objective)}</p>
                                <small>${escapeHtml(lesson.duration)} | ${escapeHtml(lesson.level)}</small>
                            </a>`;
                        }).join('')}
                    </div>
                    <footer class="lesson-nav-footer">
                        <a href="#/participant-modules"><i class="fas fa-chevron-left"></i> Kembali ke Modul</a>
                        <a href="#/participant-ai-lab-math-intro">Mulai Lesson Pertama <i class="fas fa-arrow-right"></i></a>
                    </footer>
                </article>
            </section>
        `;
        renderMathAiProgressPanel('mathAiProgressPanel');
        setupSimilaritySimulation(container);
    };

    window.initAiLabMathLesson = function() {
        const container = document.getElementById('mathAiLessonContent');
        if (!container || container.dataset.ready) return;
        container.dataset.ready = 'true';
        const lesson = getMathAiLessonByRoute();
        const index = mathForAiLessons.findIndex(item => item.id === lesson.id);
        const prev = mathForAiLessons[index - 1];
        const next = mathForAiLessons[index + 1];
        const progress = getMathAiProgress();
        progress.currentLesson = lesson.id;
        saveMathAiProgress(progress);
        const breadcrumb = document.querySelector('[data-math-ai-breadcrumb]');
        if (breadcrumb) breadcrumb.textContent = lesson.title;
        container.innerHTML = `
            <section class="lesson-hero compact math-ai-hero">
                <div class="lesson-hero-copy">
                    <span class="math-ai-eyebrow"><i class="${lesson.icon}"></i> ${escapeHtml(lesson.level)}</span>
                    <h1>${escapeHtml(lesson.title)}</h1>
                    <p>${escapeHtml(lesson.objective)}</p>
                    <div class="lesson-meta-row">
                        <span><i class="far fa-clock"></i> ${escapeHtml(lesson.duration)}</span>
                        <span><i class="fas fa-layer-group"></i> Lesson ${index + 1} dari ${mathForAiLessons.length}</span>
                        <b>Math for AI</b>
                    </div>
                </div>
                <img src="/assets/messaging/herai-chat-persona.png" alt="HerAI Math for AI lesson">
            </section>
            <section class="lesson-material-panel">
                ${renderMathAiTabs('lesson')}
                <article class="lesson-article math-ai-content">
                    <div class="math-ai-card"><h2>Opening</h2><p>${escapeHtml(lesson.opening)}</p></div>
                    <div class="math-ai-card"><h2>Core Concept</h2><p>${escapeHtml(lesson.coreConcept)}</p></div>
                    <div class="math-ai-card">
                        <h2>Key Points</h2>
                        <ol class="lesson-numbered-list">${lesson.keyPoints.map(point => `<li>${escapeHtml(point)}</li>`).join('')}</ol>
                    </div>
                    <div class="math-ai-grid two">
                        <article class="math-ai-card"><h3>Analogi</h3><p>${escapeHtml(lesson.analogy)}</p></article>
                        <article class="math-ai-card"><h3>Contoh AI</h3><p>${escapeHtml(lesson.aiExample)}</p></article>
                    </div>
                    <div class="math-ai-card"><h2>Contoh di HerAI</h2><p>${escapeHtml(lesson.herAiExample)}</p></div>
                    <div class="math-ai-formula"><i class="fas fa-square-root-variable"></i><span>${escapeHtml(lesson.miniFormula)}</span></div>
                    <div class="math-ai-card"><h2>Advanced Note</h2><p>${escapeHtml(lesson.advancedNote)}</p></div>
                    <div class="math-ai-summary"><strong>Ringkasan:</strong> ${escapeHtml(lesson.summary)}</div>
                    <footer class="lesson-nav-footer">
                        ${prev ? `<a href="${prev.route}"><i class="fas fa-chevron-left"></i> Sebelumnya</a>` : '<a href="#/participant-ai-lab-math"><i class="fas fa-chevron-left"></i> Overview</a>'}
                        <button type="button" class="math-ai-done-btn" data-mark-lesson="${lesson.id}"><i class="fas fa-circle-check"></i> Tandai Selesai</button>
                        ${next ? `<a href="${next.route}">Selanjutnya <i class="fas fa-arrow-right"></i></a>` : '<a href="#/participant-ai-lab-math-practice">Latihan <i class="fas fa-arrow-right"></i></a>'}
                    </footer>
                </article>
            </section>
        `;
        renderMathAiProgressPanel('mathAiLessonNav', lesson.id);
        container.querySelector('[data-mark-lesson]')?.addEventListener('click', (event) => {
            markMathAiLessonDone(event.currentTarget.dataset.markLesson);
            event.currentTarget.innerHTML = '<i class="fas fa-circle-check"></i> Lesson Selesai';
            event.currentTarget.disabled = true;
            renderMathAiProgressPanel('mathAiLessonNav', lesson.id);
        });
    };

    window.initAiLabMathPractice = function() {
        const container = document.getElementById('mathAiPracticeContent');
        if (!container || container.dataset.ready) return;
        container.dataset.ready = 'true';
        const saved = readJson(MATH_AI_STORAGE_KEYS.practice, {});
        container.innerHTML = `
            <section class="lesson-material-panel">
                ${renderMathAiTabs('practice')}
                <article class="lesson-article math-ai-content">
                    <div class="math-ai-card">
                        <span class="math-ai-eyebrow"><i class="fas fa-pen-to-square"></i> Latihan</span>
                        <h1>Latihan Reflektif Math for AI</h1>
                        <p>Gunakan bahasa sederhana. Fokusnya bukan jawaban sempurna, tetapi kemampuan menghubungkan konsep angka dengan cara AI bekerja.</p>
                    </div>
                    <form id="mathAiPracticeForm" class="math-ai-form">
                        ${mathForAiPracticeTasks.map(task => `
                            <label class="math-ai-task">
                                <span>${escapeHtml(task.title)}</span>
                                <p>${escapeHtml(task.prompt)}</p>
                                <textarea name="${task.id}" rows="5" placeholder="${escapeHtml(task.placeholder)}">${escapeHtml(saved[task.id] || '')}</textarea>
                            </label>
                        `).join('')}
                        <div class="math-ai-actions">
                            <button type="button" data-practice-save><i class="fas fa-floppy-disk"></i> Simpan Jawaban</button>
                            <button type="button" data-practice-reset><i class="fas fa-rotate-left"></i> Reset Jawaban</button>
                        </div>
                        <p class="math-ai-status" id="mathAiPracticeStatus">${Object.keys(saved).length ? 'Jawaban practice tersimpan di perangkatmu.' : ''}</p>
                    </form>
                    <footer class="lesson-nav-footer">
                        <a href="#/participant-ai-lab-math-case-study"><i class="fas fa-chevron-left"></i> Kembali ke Lesson</a>
                        <a href="#/participant-ai-lab-math-quiz">Lanjut Kuis <i class="fas fa-arrow-right"></i></a>
                    </footer>
                </article>
            </section>
        `;
        renderMathAiProgressPanel('mathAiPracticePanel');
        const form = document.getElementById('mathAiPracticeForm');
        const status = document.getElementById('mathAiPracticeStatus');
        form?.querySelector('[data-practice-save]')?.addEventListener('click', () => {
            const payload = {};
            form.querySelectorAll('textarea[name]').forEach(field => {
                payload[field.name] = field.value.trim();
            });
            writeJson(MATH_AI_STORAGE_KEYS.practice, payload);
            if (status) status.textContent = 'Jawaban berhasil disimpan.';
        });
        form?.querySelector('[data-practice-reset]')?.addEventListener('click', () => {
            localStorage.removeItem(MATH_AI_STORAGE_KEYS.practice);
            form.querySelectorAll('textarea[name]').forEach(field => { field.value = ''; });
            if (status) status.textContent = 'Jawaban practice direset.';
        });
    };

    window.initAiLabMathQuiz = function() {
        const container = document.getElementById('mathAiQuizContent');
        if (!container || container.dataset.ready) return;
        container.dataset.ready = 'true';
        const isDone = localStorage.getItem(MATH_AI_STORAGE_KEYS.quizDone) === 'true';
        const savedScore = Number(localStorage.getItem(MATH_AI_STORAGE_KEYS.quizScore) || 0);
        const renderResult = (score) => {
            const passed = score >= mathForAiCourse.passingGrade;
            return `<div class="math-ai-result ${passed ? 'is-pass' : 'is-review'}">
                <strong>Skor kamu: ${score}%</strong>
                <span>${passed ? 'Lulus. Pemahaman dasar Math for AI kamu sudah kuat.' : 'Belum lulus bukan masalah. Ulangi bagian yang masih terasa sulit.'}</span>
                <a href="#/participant-ai-lab-math-discussion">Lanjut Diskusi <i class="fas fa-arrow-right"></i></a>
            </div>`;
        };
        container.innerHTML = `
            <section class="lesson-material-panel">
                ${renderMathAiTabs('quiz')}
                <article class="lesson-article math-ai-content">
                    <div class="math-ai-card">
                        <span class="math-ai-eyebrow"><i class="far fa-clipboard"></i> Kuis</span>
                        <h1>Kuis Math for AI</h1>
                        <p>Jawab semua pertanyaan. Skor minimal lulus adalah ${mathForAiCourse.passingGrade}%.</p>
                    </div>
                    <form id="mathAiQuizForm" class="math-ai-quiz">
                        ${mathForAiQuiz.map((item, index) => `
                            <fieldset class="math-ai-question">
                                <legend>${index + 1}. ${escapeHtml(item.question)}</legend>
                                ${item.options.map((option, optionIndex) => `
                                    <label>
                                        <input type="radio" name="${item.id}" value="${optionIndex}" ${isDone ? 'disabled' : ''}>
                                        <span>${escapeHtml(option)}</span>
                                    </label>
                                `).join('')}
                                ${isDone ? `<p class="math-ai-explanation"><strong>Jawaban:</strong> ${escapeHtml(item.options[item.correctIndex])}<br>${escapeHtml(item.explanation)}</p>` : ''}
                            </fieldset>
                        `).join('')}
                        <div id="mathAiQuizResult">${isDone ? renderResult(savedScore) : ''}</div>
                        <button type="submit" class="quiz-submit-btn math-ai-submit" ${isDone ? 'disabled' : 'disabled'}><i class="fas fa-paper-plane"></i> Submit Kuis</button>
                    </form>
                    <footer class="lesson-nav-footer">
                        <a href="#/participant-ai-lab-math-practice"><i class="fas fa-chevron-left"></i> Kembali Latihan</a>
                        <a href="#/participant-ai-lab-math-discussion">Diskusi <i class="fas fa-arrow-right"></i></a>
                    </footer>
                </article>
            </section>
        `;
        renderMathAiProgressPanel('mathAiQuizPanel');
        const form = document.getElementById('mathAiQuizForm');
        const submit = form?.querySelector('.math-ai-submit');
        const result = document.getElementById('mathAiQuizResult');
        if (!form || isDone) return;
        const updateSubmit = () => {
            const answered = mathForAiQuiz.every(item => form.querySelector(`input[name="${item.id}"]:checked`));
            if (submit) submit.disabled = !answered;
        };
        form.addEventListener('change', updateSubmit);
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let correct = 0;
            mathForAiQuiz.forEach(item => {
                const selected = form.querySelector(`input[name="${item.id}"]:checked`);
                if (selected && Number(selected.value) === item.correctIndex) correct += 1;
            });
            const score = Math.round((correct / mathForAiQuiz.length) * 100);
            localStorage.setItem(MATH_AI_STORAGE_KEYS.quizDone, 'true');
            localStorage.setItem(MATH_AI_STORAGE_KEYS.quizScore, String(score));
            if (result) result.innerHTML = renderResult(score);
            form.querySelectorAll('input').forEach(input => { input.disabled = true; });
            if (submit) {
                submit.disabled = true;
                submit.innerHTML = '<i class="fas fa-circle-check"></i> Quiz Sudah Dikirim';
            }
            mathForAiQuiz.forEach(item => {
                const fieldset = form.querySelector(`input[name="${item.id}"]`)?.closest('fieldset');
                if (fieldset && !fieldset.querySelector('.math-ai-explanation')) {
                    fieldset.insertAdjacentHTML('beforeend', `<p class="math-ai-explanation"><strong>Jawaban:</strong> ${escapeHtml(item.options[item.correctIndex])}<br>${escapeHtml(item.explanation)}</p>`);
                }
            });
        });
        updateSubmit();
    };

    window.initAiLabMathDiscussion = function() {
        const container = document.getElementById('mathAiDiscussionContent');
        if (!container || container.dataset.ready) return;
        container.dataset.ready = 'true';
        const fallbackThreads = [
            {
                id: 'seed-vector',
                name: 'Aisyah Putri',
                time: 'Hari ini, 09.30',
                text: 'Aku paling kebayang bagian vektor karena bisa dipakai untuk menggambarkan profil peserta dan materi.',
                replies: [{ name: 'Mentor Rani', time: 'Hari ini, 09.45', text: 'Betul. Vektor membantu sistem menghitung kemiripan tanpa harus memahami profil seperti manusia.' }]
            }
        ];
        const loadThreads = () => readJson(MATH_AI_STORAGE_KEYS.discussion, fallbackThreads);
        const saveThreads = items => writeJson(MATH_AI_STORAGE_KEYS.discussion, items);
        const timestamp = () => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date());
        container.innerHTML = `
            <section class="lesson-material-panel">
                ${renderMathAiTabs('discussion')}
                <article class="lesson-article math-ai-content">
                    <div class="math-ai-card">
                        <span class="math-ai-eyebrow"><i class="far fa-message"></i> Diskusi</span>
                        <h1>Diskusi Math for AI</h1>
                        <p>Gunakan ruang ini untuk menulis bagian yang masih membingungkan atau ide fitur HerAI yang memakai konsep Math for AI.</p>
                    </div>
                    <div class="math-ai-grid two">
                        ${mathForAiDiscussionPrompts.map(prompt => `<article class="math-ai-card"><h3>${escapeHtml(prompt.title)}</h3><p>${escapeHtml(prompt.body)}</p></article>`).join('')}
                    </div>
                    <form id="mathAiDiscussionForm" class="math-ai-form">
                        <label class="math-ai-task">
                            <span>Buat Post Diskusi</span>
                            <input type="text" name="title" placeholder="Judul singkat diskusi">
                            <textarea name="text" rows="5" placeholder="Tulis pertanyaan, refleksi, atau ide fitur..."></textarea>
                        </label>
                        <div class="math-ai-actions"><button type="submit"><i class="fas fa-paper-plane"></i> Kirim Post</button></div>
                    </form>
                    <div id="mathAiDiscussionList" class="math-ai-discussion-list"></div>
                    <footer class="lesson-nav-footer">
                        <a href="#/participant-ai-lab-math-quiz"><i class="fas fa-chevron-left"></i> Kembali Kuis</a>
                        <a href="#/participant-ai-lab-math">Kembali Overview <i class="fas fa-arrow-right"></i></a>
                    </footer>
                </article>
            </section>
        `;
        renderMathAiProgressPanel('mathAiDiscussionPanel');
        const form = document.getElementById('mathAiDiscussionForm');
        const list = document.getElementById('mathAiDiscussionList');
        const renderThreads = () => {
            const threads = loadThreads();
            if (!list) return;
            list.innerHTML = threads.map(item => `
                <article class="discussion-bubble">
                    <div><span>${escapeHtml(item.name.charAt(0))}</span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.time)}</small></div>
                    ${item.title ? `<h3>${escapeHtml(item.title)}</h3>` : ''}
                    <p>${escapeHtml(item.text)}</p>
                    <button type="button" data-reply="${escapeHtml(item.id)}">Reply</button>
                    <div class="discussion-replies">${(item.replies || []).map(reply => `<article><strong>${escapeHtml(reply.name)}</strong><small>${escapeHtml(reply.time)}</small><p>${escapeHtml(reply.text)}</p></article>`).join('')}</div>
                </article>
            `).join('');
            list.querySelectorAll('[data-reply]').forEach(button => {
                button.addEventListener('click', () => {
                    const text = prompt('Tulis balasan diskusi:');
                    if (!text || !text.trim()) return;
                    const threads = loadThreads();
                    const target = threads.find(item => item.id === button.dataset.reply);
                    if (target) {
                        target.replies = target.replies || [];
                        target.replies.push({ name: 'Aisyah Putri', time: timestamp(), text: text.trim() });
                        saveThreads(threads);
                        renderThreads();
                    }
                });
            });
        };
        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = form.elements.title.value.trim();
            const text = form.elements.text.value.trim();
            if (!text) return;
            const threads = loadThreads();
            threads.unshift({ id: `post-${Date.now()}`, name: 'Aisyah Putri', time: timestamp(), title, text, replies: [] });
            saveThreads(threads);
            form.reset();
            renderThreads();
        });
        renderThreads();
    };
})();

````
