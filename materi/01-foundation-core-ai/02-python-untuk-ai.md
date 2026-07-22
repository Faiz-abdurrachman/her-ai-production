# Pemrograman Python untuk AI

> Ekspor lengkap dari sumber materi HerAI yang tersedia di repository.
> Mencakup materi, latihan, kuis, diskusi, pembahasan, versi legacy, dan/atau data interaktif bila tersedia.

## Chapter 1 — Kenapa Python untuk AI?

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/01-full.html`

### Chapter 1 — Kenapa Python untuk AI?

#### Learning Objectives

-   Menjelaskan alasan Python populer dalam pekerjaan AI.
-   Memetakan peran Python dari dataset sampai deployment.
-   Membedakan bahasa Python dan library yang berjalan di atasnya.

#### Kenapa Materi Ini Penting?

Belajar sintaks tanpa melihat gambaran besar terasa seperti mengumpulkan alat tanpa tahu apa yang akan dibangun. Chapter ini memberi peta agar setiap konsep berikutnya memiliki tujuan.

#### Hubungan dengan AI

Workflow AI modern sering terlihat seperti ini:

    Dataset → Python → Cleaning → Exploration → Model → Evaluation → Deployment

Python menjadi penghubung antar-tahap. Ia membaca data, memanggil library, mengatur eksperimen, dan mengubah hasil menjadi sesuatu yang dapat digunakan. Pada modul ini kita fokus sampai tahap cleaning dan exploration.

#### Analogi

Bayangkan dapur profesional. Python adalah area dapurnya; NumPy, Pandas, dan library lain adalah peralatannya; data adalah bahan; model AI adalah salah satu resep lanjutan. Dapur yang baik tidak otomatis menghasilkan makanan, tetapi membuat seluruh proses dapat dilakukan dengan teratur.

#### Penjelasan Konsep

Python disukai karena sintaksnya relatif mudah dibaca, komunitasnya besar, dan ekosistem datanya matang. Python juga dapat dipakai secara interaktif di notebook serta sebagai file program `.py`.

Python bukan AI itu sendiri. Menulis Python tidak otomatis membuat sistem cerdas. Python adalah alat untuk mengekspresikan proses dan menghubungkan komponen.

#### Visual Thinking

    Pertanyaan → Data → Kode Python → Informasi → Keputusan

#### Contoh Nyata

Panitia ingin mengetahui rata-rata nilai 500 peserta. Menghitung manual lambat dan rawan salah. Python dapat membaca file, membersihkan nilai kosong, menghitung rata-rata, dan menyimpan laporan.

#### Contoh AI

Sebelum data dipakai oleh model AI, Python sering digunakan untuk memeriksa apakah format, label, dan nilai kosongnya sudah benar.

#### Kode Python

    module_name = "Python untuk AI"
    participant_count = 500

    print(module_name)
    print(participant_count)

#### Penjelasan Kode Baris per Baris

1.  `module_name` menyimpan teks nama modul.
2.  `participant_count` menyimpan jumlah peserta sebagai angka.
3.  `print()` menampilkan informasi agar dapat dilihat pengguna.

#### Common Mistakes

-   Mengira Python dan AI adalah hal yang sama.
-   Menghafal sintaks tanpa memahami masalah.
-   Memasang banyak library sebelum tahu kegunaannya.

#### Best Practices

-   Mulai dari pertanyaan, bukan library.
-   Gunakan nama variabel yang menjelaskan isi.
-   Bangun workflow kecil yang dapat diperiksa.

#### Mini Challenge

Buat dua variabel untuk nama dataset dan jumlah baris, lalu tampilkan keduanya.

#### Ringkasan

Python adalah bahasa orkestrasi utama dalam banyak workflow AI karena mudah dibaca dan memiliki ekosistem data yang kuat.

#### Persiapan Chapter Berikutnya

Berikutnya kita menyiapkan ruang kerja agar kode dapat dijalankan secara konsisten.

* * * * *

## Chapter 1 — Kenapa Python untuk AI?

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/01-topic.html`

### Chapter 1 — Kenapa Python untuk AI?

#### Learning Objectives

-   Menjelaskan alasan Python populer dalam pekerjaan AI.
-   Memetakan peran Python dari dataset sampai deployment.
-   Membedakan bahasa Python dan library yang berjalan di atasnya.

#### Kenapa Materi Ini Penting?

Setiap tahun muncul bahasa pemrograman baru yang menjanjikan kecepatan lebih tinggi atau sintaks lebih modern. Namun Python tetap menjadi bahasa utama di dunia AI dan data science. Bukan karena Python adalah bahasa tercepat — faktanya Python lebih lambat dibanding C++ atau Rust dalam eksekusi murni — tetapi karena Python memecahkan masalah yang lebih mendasar: bagaimana seorang peneliti atau praktisi AI dapat mengubah ide menjadi eksperimen dalam hitungan menit, bukan hari.

Tanpa memahami posisi Python dalam ekosistem AI, peserta mudah terjebak dalam dua kesalahan umum. Pertama, menganggap Python adalah AI itu sendiri — seolah menulis kode Python otomatis menghasilkan sistem cerdas. Kedua, menghafal sintaks tanpa memahami masalah apa yang sedang dipecahkan. Chapter ini membangun peta mental: Python adalah alat orkestrasi, model AI adalah hasil dari data, proses, dan evaluasi yang dirangkai melalui kode.

Setelah menyelesaikan chapter ini, setiap konsep sintaks yang dipelajari nanti akan memiliki tujuan yang jelas. Bukan sekadar "belajar Python", melainkan "menggunakan Python untuk menyelesaikan masalah data dan AI".

#### Hubungan dengan AI

Workflow AI modern jarang dimulai dari model. Sebelum model menyentuh data, ada rangkaian tahap yang harus dilalui: dataset mentah perlu dibaca, diperiksa, dibersihkan, dan dieksplorasi. Baru setelah data cukup dipahami, tahap pemodelan dimulai. Setelah model menghasilkan output, hasilnya perlu dievaluasi dan disajikan.

Python menjadi benang merah yang menghubungkan seluruh tahap tersebut:

    Dataset → Python → Cleaning → Exploration → Model → Evaluation → Deployment

Python membaca data dari CSV, JSON, atau database. Python memanggil library seperti Pandas untuk membersihkan nilai kosong dan NumPy untuk komputasi numerik. Python mengatur eksperimen, mencatat parameter, dan menyimpan hasil. Pada modul ini kita fokus sampai tahap cleaning dan exploration — fondasi yang paling sering menghabiskan sebagian besar waktu dalam project data nyata.

Penting untuk dicatat bahwa Python bukan satu-satunya bahasa dalam workflow AI. Operasi berat seperti training model skala besar sering dijalankan oleh library yang ditulis dalam C++ atau CUDA, sementara Python berada di atasnya sebagai lapisan kontrol yang ekspresif dan mudah diuji.

#### Analogi

Bayangkan dapur profesional. Python adalah area dapurnya — tempat semua persiapan dan perakitan terjadi. NumPy, Pandas, PyTorch, dan library lain adalah peralatan khusus: pisau, blender, oven, masing-masing dirancang untuk tugas tertentu. Data adalah bahan mentah yang perlu dicuci, dipotong, dan diukur sebelum dimasak. Model AI adalah resep lanjutan yang hanya dapat berhasil jika bahan sudah siap.

Dapur yang baik tidak otomatis menghasilkan makanan lezat. Ia menyediakan alur kerja yang teratur: bahan diterima, disimpan, disiapkan, dimasak, dan disajikan. Demikian pula Python: ia tidak menggantikan pemahaman tentang data atau algoritma, tetapi membuat seluruh proses dapat dilakukan, diulang, dan diperiksa oleh orang lain.

Analogi ini juga menjelaskan mengapa Python mendominasi meskipun bukan bahasa tercepat. Dalam dapur profesional, kecepatan pisau tidak sepenting konsistensi teknik memotong dan kemampuan mengatur banyak bahan secara bersamaan. Python memberikan konsistensi dan keterbacaan yang memungkinkan tim bekerja sama pada pipeline yang sama.

#### Penjelasan Konsep

Python lahir pada tahun 1991 dengan filosofi yang berbeda dari bahasa lain: keterbacaan kode adalah prioritas utama. Indentasi wajib memaksa penulisan yang rapi. Tipe data dinamis memungkinkan eksperimen cepat tanpa deklarasi panjang. Ekosistem library-nya tumbuh secara organik karena komunitas data dan AI memilih Python sebagai bahasa bersama.

Sintaks Python dirancang agar mirip dengan bahasa Inggris sehari-hari. Sebuah loop `for participant in participants` dapat dibaca oleh orang yang tidak pernah belajar coding. Kemampuan ini mengurangi gesekan antara anggota tim non-teknis — seperti domain expert atau manajer produk — dan implementasi teknis. Dalam project AI yang melibatkan banyak peran, keterbacaan ini adalah keunggulan kompetitif.

Python bukan AI itu sendiri. Menulis `import torch` atau `from sklearn import model` tidak otomatis membuat sistem cerdas. Python adalah alat untuk mengekspresikan proses: membaca data, menerapkan transformasi, menjalankan evaluasi, dan menyajikan hasil. Model AI tetap membutuhkan data yang tepat, arsitektur yang sesuai, dan evaluasi yang ketat — Python hanya menyediakan bahasa untuk merangkai semuanya.

Python dapat digunakan dalam dua mode utama. Mode interaktif melalui notebook (Jupyter, Google Colab) cocok untuk eksplorasi bertahap: menulis kode, melihat hasil langsung, menulis catatan, dan mengulang. Mode program melalui file `.py` cocok untuk workflow yang perlu dijalankan ulang secara konsisten, seperti pipeline cleaning atau skrip evaluasi. Kedua mode ini saling melengkapi, bukan bersaing.

#### Visual Thinking

    Pertanyaan → Data → Kode Python → Informasi → Keputusan

#### Contoh Nyata

Panitia fellowship ingin mengetahui rata-rata nilai 500 peserta. Tanpa Python, seseorang harus membuka spreadsheet, memeriksa setiap baris, mencari nilai kosong, menghitung manual, dan menyimpan hasil — proses yang lambat dan rawan salah ketik. Dengan Python, panitia dapat menulis program yang membaca file, membersihkan nilai kosong dengan aturan tertentu, menghitung rata-rata, dan menyimpan laporan dalam waktu beberapa detik. Jika data berubah, program cukup dijalankan ulang tanpa mengulang klik manual.

#### Contoh AI

Sebelum data digunakan untuk melatih model AI, Python memeriksa format setiap kolom, mendeteksi nilai yang hilang, memastikan label kelas seimbang, dan memverifikasi tidak ada data duplikat. Pemeriksaan ini ditulis sebagai skrip yang sama persis setiap kali dataset baru tiba, sehingga konsistensi terjaga dan keputusan cleaning dapat diaudit oleh anggota tim lain.

#### Kode Python

    module_name = "Python untuk AI"
    participant_count = 500

    print(module_name)
    print(participant_count)

#### Penjelasan Kode Baris per Baris

1.  `module_name` menyimpan teks nama modul.
2.  `participant_count` menyimpan jumlah peserta sebagai angka.
3.  `print()` menampilkan informasi agar dapat dilihat pengguna.

#### Common Mistakes

-   **Mengira Python dan AI adalah hal yang sama.** Kesalahan ini menyebabkan ekspektasi tidak realistis: seseorang berpikir "saya bisa Python, berarti saya bisa bikin AI". Padahal Python hanya alat; pemahaman data, algoritma, dan evaluasi tetap harus dikuasai secara terpisah.
-   **Menghafal sintaks tanpa memahami masalah.** Menghafal nama function tidak berguna jika tidak tahu kapan dan kenapa function itu dipakai. Fokus pada pola pikir memecahkan masalah, bukan daftar API.
-   **Memasang banyak library sebelum tahu kegunaannya.** Memasang puluhan package "agar siap" membuat environment sulit dikelola, meningkatkan risiko konflik versi, dan membingungkan pemula ketika error muncul dari library yang tidak digunakan.

#### Best Practices

-   **Mulai dari pertanyaan, bukan library.** Tentukan dulu masalah yang ingin diselesaikan — "Saya ingin menghitung rata-rata nilai dari file CSV" — baru pilih alat yang tepat. Pendekatan ini mencegah belajar library tanpa arah.
-   **Gunakan nama variabel yang menjelaskan isi.** Nama seperti `average_score` atau `participant_list` membuat kode dapat dibaca tanpa komentar tambahan. Nama seperti `x` atau `data1` memaksa pembaca menebak makna.
-   **Bangun workflow kecil yang dapat diperiksa.** Mulai dari satu langkah yang menghasilkan output terlihat, lalu tambahkan langkah berikutnya secara bertahap. Pendekatan ini membuat debugging lebih mudah karena setiap tahap dapat diuji secara terpisah.

#### Mini Challenge

Buat dua variabel untuk nama dataset dan jumlah baris, lalu tampilkan keduanya.

#### Ringkasan

Python adalah bahasa orkestrasi utama dalam workflow AI, bukan karena kecepatan eksekusinya, tetapi karena keterbacaan, ekosistem data yang matang, dan kemampuan menghubungkan berbagai tahap dari dataset mentah hingga hasil evaluasi. Python bukan AI itu sendiri — ia adalah alat untuk mengekspresikan proses secara konsisten dan dapat diulang. Setiap konsep sintaks yang akan dipelajari di chapter berikutnya memiliki tujuan yang jelas dalam pipeline data dan AI.

#### Persiapan Chapter Berikutnya

Setelah memahami posisi Python, langkah berikutnya adalah menyiapkan ruang kerja yang konsisten. Kita akan belajar tentang environment, virtual environment, notebook, dan cara mengelola package — fondasi teknis agar kode dapat berjalan di mana pun.

* * * * *

### Chapter 2 — Development Environment

#### Learning Objectives

-   Mengenali Python, terminal, VS Code, virtual environment, Jupyter, dan Colab.
-   Menjalankan program `.py` dan cell notebook.
-   Mengelola package dasar dengan `pip` dan `requirements.txt`.

#### Kenapa Materi Ini Penting?

Kode yang benar secara logika tetap tidak berjalan jika environment salah. Ini adalah sumber frustrasi paling umum bagi pemula Python: mereka menulis kode yang seharusnya bekerja, tetapi muncul error `ModuleNotFoundError` karena package terpasang di interpreter berbeda, atau error sintaks karena versi Python tidak sesuai. Banyak pemula mengira error instalasi adalah kegagalan coding, padahal masalahnya hanya lokasi file, interpreter yang salah, atau package yang belum terinstal di environment aktif.

Lingkungan pengembangan yang rapi tidak hanya mencegah error, tetapi juga memastikan reproduktibilitas. Dalam project AI, kode yang berhasil di satu laptop sering gagal di laptop lain karena perbedaan versi library. Mengelola environment sejak awal menghemat waktu berjam-jam yang seharusnya bisa dipakai untuk menganalisis data atau membangun model.

#### Hubungan dengan AI

Project AI menggunakan banyak library dengan versi yang spesifik. Versi Pandas yang berbeda dapat mengubah perilaku function yang sama. Versi PyTorch atau TensorFlow yang berbeda dapat menghasilkan output numerik yang tidak persis sama meskipun kode identik. Environment menjaga setiap project memiliki ruang sendiri sehingga upgrade satu eksperimen tidak merusak eksperimen lain yang berjalan bersamaan.

Konsep ini analog dengan containerisasi pada deployment: environment lokal yang terisolasi adalah langkah pertama menuju pipeline yang dapat dijalankan di server produksi tanpa konfigurasi ulang.

#### Analogi

Virtual environment seperti kotak alat khusus untuk satu project. Bayangkan seorang mekanik yang menangani mobil balap dan sepeda motor secara bergantian. Jika semua alat tercampur dalam satu kotak besar, ia akan kesulitan menemukan kunci pas yang tepat — dan mungkin secara tidak sengaja menggunakan oli yang salah. Virtual environment memisahkan "kotak alat" setiap project: package NumPy versi 1.24 untuk project A dan NumPy versi 2.0 untuk project B dapat hidup berdampingan tanpa konflik.

Jika project A membutuhkan Pandas versi tertentu dan project B membutuhkan versi yang lebih baru, environment terpisah memungkinkan keduanya berjalan di komputer yang sama tanpa saling merusak. Inilah mengapa virtual environment adalah praktik standar, bukan opsional.

#### Penjelasan Konsep

Environment kerja Python terdiri dari beberapa lapisan yang perlu dipahami secara terpisah:

-   **Python interpreter:** program yang menjalankan kode. Bisa Python 3.10, 3.11, atau 3.12 — setiap versi memiliki perbedaan sintaks dan dukungan library. Mengetahui versi Python aktif adalah langkah pertama sebelum debugging.
-   **Terminal atau command prompt:** antarmuka teks untuk memberi perintah kepada sistem operasi. Di sinilah kita menjalankan `python`, `pip`, dan `git`.
-   **VS Code atau editor teks:** tempat menulis dan mengedit file `.py`. Editor modern menyediakan syntax highlighting, auto-completion, dan integrated terminal yang mempercepat pengembangan.
-   **Virtual environment:** direktori terisolasi yang berisi Python interpreter dan package khusus untuk satu project. Dibuat dengan `python -m venv .venv` dan diaktifkan dengan perintah `source .venv/bin/activate` (Linux/macOS) atau `.venv\Scripts\Activate.ps1` (Windows PowerShell).
-   **Package manager (`pip`):** alat untuk memasang, memperbarui, dan menghapus library Python. `pip install numpy` memasang NumPy ke environment yang sedang aktif.
-   **Jupyter Notebook dan Google Colab:** lingkungan interaktif berbasis browser. Notebook menggabungkan kode, output, dan catatan dalam satu dokumen — ideal untuk eksplorasi dan visualisasi bertahap. Colab adalah notebook di cloud dengan environment siap pakai dan akselerator GPU (meskipun GPU belum diperlukan di modul ini).

Perbedaan antara file `.py` dan notebook perlu dipahami sejak awal. File `.py` adalah program utuh yang dijalankan dari awal hingga akhir — cocok untuk workflow yang perlu diulang secara konsisten. Notebook adalah dokumen campuran yang dieksekusi per cell — cocok untuk eksplorasi, tetapi memerlukan disiplin karena cell dapat dijalankan dalam urutan berbeda, menghasilkan state yang sulit dilacak.

#### Visual Thinking

    Folder project
    ├── .venv/            environment lokal
    ├── data/             dataset
    ├── notebooks/        eksplorasi
    ├── src/              file .py
    └── requirements.txt  daftar package

#### Contoh Nyata

Seorang peserta mengerjakan tugas kelas yang membutuhkan Pandas versi 1.5 untuk membaca file Excel. Dua minggu kemudian, ia memulai project baru yang membutuhkan Pandas versi 2.0 untuk fitur terbaru. Tanpa virtual environment, meng-upgrade Pandas untuk project baru akan merusak project lama. Dengan virtual environment, kedua project tetap berjalan — masing-masing dengan versi Pandas yang sesuai — tanpa saling memengaruhi.

#### Contoh AI

Dalam project AI, notebook sering digunakan untuk mengeksplorasi dataset baru: melihat distribusi nilai, mendeteksi missing value, dan menguji ide cleaning. Namun, setelah eksplorasi selesai, langkah-langkah yang sudah stabil perlu dipindahkan ke file `.py` agar dapat dijalankan secara otomatis sebagai pipeline. Notebook menyimpan catatan dan visualisasi; file `.py` menyimpan logika yang dapat diuji dan diulang.

#### Kode Python

    python -m venv .venv

    # macOS/Linux
    source .venv/bin/activate

    # Windows PowerShell
    .venv\Scripts\Activate.ps1

    python -m pip install numpy pandas
    python -m pip freeze > requirements.txt
    python app.py

#### Penjelasan Kode Baris per Baris

1.  `python -m venv .venv` membuat environment bernama `.venv` di folder saat ini.
2.  Perintah `activate` mengalihkan interpreter ke environment tersebut — semua perintah `python` dan `pip` selanjutnya akan menggunakan environment ini.
3.  `python -m pip install` memasang package pada interpreter yang sedang aktif.
4.  `pip freeze > requirements.txt` mencatat semua package beserta versinya ke file teks — file ini dapat dibagikan agar orang lain dapat membangun environment yang sama persis.
5.  `python app.py` menjalankan file program menggunakan interpreter environment saat ini.

#### Common Mistakes

-   **Menjalankan `pip` dari interpreter berbeda.** Memasang package dengan `pip install` tanpa mengaktifkan environment terlebih dahulu akan memasang package ke interpreter global — package tidak akan tersedia saat environment aktif. Selalu periksa (`which python`) interpreter mana yang sedang digunakan.
-   **Meng-commit folder `.venv` ke git.** Folder environment bersifat lokal dan spesifik untuk sistem operasi. Cukup commit file `requirements.txt`; orang lain akan membuat environment mereka sendiri dari daftar tersebut.
-   **Menganggap cell notebook selalu berjalan dari atas ke bawah.** Notebook memungkinkan cell dieksekusi dalam urutan apa pun. Jika cell di tengah diubah dan dijalankan ulang tanpa menjalankan cell sebelumnya, state program menjadi tidak konsisten. Jalankan "Restart & Run All" secara berkala untuk memastikan hasil dapat direproduksi dari awal.

#### Best Practices

-   **Gunakan satu virtual environment per project.** Setiap project memiliki kebutuhan dependency yang berbeda. Mencampurnya dalam satu environment global adalah resep konflik versi.
-   **Jalankan notebook dari awal secara berkala.** Menggunakan "Restart & Run All" memastikan tidak ada cell yang bergantung pada state tersembunyi. Jika kode gagal dijalankan dari awal, maka urutan atau dependensi antar-cell perlu diperbaiki.
-   **Simpan dependency penting dalam `requirements.txt`.** File ini adalah kontrak reproduktibilitas. Pastikan untuk memperbaruinya setiap kali menambah atau mengubah package.

#### Mini Challenge

Buat folder project, virtual environment, file `hello.py` yang mencetak `"Environment siap"`, lalu jalankan dari terminal. Jika memakai Colab, buat notebook baru dan jalankan `print("Environment siap")` untuk memverifikasi runtime berfungsi.

#### Ringkasan

Environment yang rapi adalah fondasi dari eksperimen yang dapat diulang. Virtual environment, package manager, dan pilihan antara file `.py` dan notebook bukanlah detail teknis yang dapat diabaikan — mereka adalah alat yang memastikan kode yang berhasil hari ini tetap berhasil minggu depan di laptop yang berbeda. Menguasai environment sejak awal menghemat waktu debugging yang jauh lebih besar di kemudian hari.

#### Persiapan Chapter Berikutnya

Setelah ruang kerja siap, langkah selanjutnya adalah mengubah cara berpikir. Sebelum menulis satu baris kode, kita perlu belajar memecah masalah seperti komputer: input, process, dan output.

* * * * *

### Chapter 3 — Computational Thinking

#### Learning Objectives

-   Memetakan masalah menjadi input, process, dan output.
-   Menulis langkah solusi sebelum sintaks.
-   Membedakan data, aturan proses, dan hasil.

#### Kenapa Materi Ini Penting?

Kesalahan paling umum pemula bukanlah salah menulis kode, tetapi menulis kode untuk masalah yang belum dipahami. Mereka melihat soal, langsung mengetik `if` dan `for`, lalu bingung ketika hasilnya salah. Program yang baik dimulai dari cara berpikir, bukan dari mengetik. Jika proses belum jelas, kode hanya membuat kebingungan berjalan lebih cepat.

Computational thinking adalah kemampuan memecah masalah menjadi langkah-langkah yang cukup kecil dan eksplisit sehingga komputer dapat menjalankannya. Kemampuan ini tidak tergantung pada bahasa pemrograman — ia berlaku di Python, JavaScript, atau bahasa apa pun. Inilah mengapa computational thinking diajarkan sebelum sintaks: sintaks berubah, tetapi cara berpikir ini bertahan.

Dalam konteks AI, computational thinking menjadi semakin penting. Pipeline AI tidak pernah berupa satu langkah besar; ia terdiri dari puluhan langkah kecil: membaca data, memvalidasi format, membersihkan missing value, mengekstrak fitur, melatih model, mengevaluasi, dan menyajikan hasil. Setiap langkah harus didefinisikan secara eksplisit dengan input, proses, output, dan failure case masing-masing.

#### Hubungan dengan AI

Pipeline AI adalah contoh sempurna dari computational thinking dalam skala besar. Sebuah sistem rekomendasi tidak langsung memberikan rekomendasi — ia menerima input (riwayat pengguna, katalog produk), menjalankan serangkaian proses (filter, skor, peringkat), dan menghasilkan output (daftar rekomendasi). Jika salah satu langkah menerima data yang tidak sesuai format, seluruh pipeline dapat menghasilkan output yang salah tanpa peringatan.

Cara berpikir input-proses-output berlaku dari preprocessing data yang paling sederhana — membersihkan string — sampai inference model yang kompleks. Memahami hal ini membantu peserta melihat bahwa AI bukanlah kotak hitam, melainkan rangkaian proses yang dapat dipecah, diperiksa, dan diperbaiki satu per satu.

#### Analogi

Mesin jus menerima buah sebagai input, memotong dan memblender sebagai process, lalu menghasilkan jus sebagai output. Mesin tidak akan bekerja jika inputnya berupa batu — tetapi komputer juga tidak akan "tahu" bahwa batu bukanlah buah. Komputer membutuhkan instruksi yang eksplisit: "periksa apakah input adalah buah, tolak jika bukan, baru proses."

Manusia dapat mengerti maksud dari perintah yang kabur — "hitung rata-rata nilai" — dan secara otomatis menangani kasus khusus seperti data kosong. Komputer tidak memiliki kemampuan ini. Ia menjalankan instruksi sesuai urutan dan data yang diberikan, tanpa interpretasi. Inilah mengapa setiap proses harus didefinisikan dengan batas yang jelas: apa yang masuk, apa yang terjadi, apa yang keluar, dan apa yang dilakukan jika terjadi kondisi tidak terduga.

#### Penjelasan Konsep

Computational thinking terdiri dari empat pilar yang saling melengkapi. **Decomposition** adalah kemampuan memecah masalah besar menjadi bagian kecil yang dapat dikelola — misalnya, menghitung rata-rata nilai dapat dipecah menjadi: baca data, jumlahkan semua nilai, hitung jumlah data, bagi total dengan jumlah. **Pattern recognition** adalah kemampuan melihat kesamaan antar-masalah — misalnya, menghitung rata-rata dan menghitung persentase keduanya membutuhkan operasi pembagian. **Abstraction** adalah kemampuan memilah informasi yang relevan dan mengabaikan sisanya — untuk menghitung rata-rata, nama peserta tidak relevan; hanya nilai numerik yang diperlukan. **Algorithmic thinking** adalah kemampuan menyusun langkah-langkah dalam urutan yang deterministik dan dapat diulang.

Komputer tidak "mengerti maksud" seperti rekan manusia. Ia menjalankan instruksi sesuai urutan dan data yang diberikan. Jika program meminta `total_scores / len(scores)` ketika `scores` kosong, komputer akan menghasilkan error — bukan "menyadari" bahwa seharusnya tidak melakukan pembagian. Menulis pseudocode dalam bahasa biasa sebelum coding membantu mendeteksi kelemahan logika lebih awal. Pseudocode adalah versi kasar dari solusi yang ditulis dalam bahasa manusia, bukan bahasa pemrograman:

    Input: daftar nilai peserta
    Proses:
      1. Jika daftar kosong, kembalikan pesan "belum ada data"
      2. Jumlahkan semua nilai
      3. Hitung jumlah peserta
      4. Bagi total dengan jumlah peserta
    Output: rata-rata nilai atau pesan error

Pendekatan ini memisahkan dua keahlian yang berbeda: merancang solusi (computational thinking) dan menerjemahkannya ke sintaks (coding). Dengan memisahkan keduanya, peserta dapat menguji logika solusi tanpa terganggu oleh error sintaks, dan sebaliknya.

#### Visual Thinking

    Nilai peserta → validasi → hitung rata-rata → status kelulusan
         input          process                 output

#### Contoh Nyata

Input: harga barang (Rp 20.000) dan jumlah barang (3). Process: kalikan harga dengan jumlah, lalu jumlahkan semua total. Output: total belanja (Rp 60.000). Contoh ini terlihat sepele, tetapi mengandung keputusan desain: apakah jumlah barang selalu bilangan bulat? Apa yang terjadi jika harga tidak tersedia? Keputusan-keputusan kecil inilah yang membedakan program yang robust dari program yang mudah crash.

#### Contoh AI

Input dapat berupa dataset teks mentah. Process awal dapat berupa pembersihan teks: menghapus tanda baca, mengubah ke huruf kecil, menghapus kata yang tidak bermakna (stop words). Outputnya adalah dataset bersih yang siap dipelajari oleh model pada modul berikutnya. Setiap langkah pembersihan harus didefinisikan sebagai proses yang eksplisit — bukan "bersihkan teks", melainkan "hapus karakter kecuali huruf dan spasi, lalu ubah ke lowercase".

#### Kode Python

    scores = [80, 90, 70]
    average = sum(scores) / len(scores)
    print(average)

#### Penjelasan Kode Baris per Baris

1.  `scores` adalah input berupa tiga nilai numerik dalam list.
2.  `sum(scores)` menjumlahkan seluruh nilai dan `len(scores)` menghitung jumlah data — keduanya adalah proses.
3.  Hasil proses disimpan dalam variabel `average`.
4.  `print()` menampilkan output agar dapat dilihat oleh pengguna.

#### Common Mistakes

-   **Coding sebelum mengetahui output yang diinginkan.** Tanpa tujuan yang jelas, kode cenderung berkembang tanpa arah. Tentukan output yang diharapkan — "saya ingin angka rata-rata" — baru tulis langkah untuk mencapainya.
-   **Tidak mempertimbangkan input kosong atau salah format.** Program yang hanya berhasil pada data ideal akan gagal di dunia nyata. Data bisa kosong, berisi tipe yang salah, atau memiliki nilai di luar batas yang wajar.
-   **Menggabungkan semua proses dalam satu langkah besar.** Satu baris kode yang melakukan banyak hal sulit diperiksa dan sulit diperbaiki. Pecah menjadi beberapa baris atau function agar setiap langkah dapat diuji.

#### Best Practices

-   **Tulis contoh input dan expected output.** Sebelum coding, tentukan satu kasus sederhana beserta hasil yang diharapkan. Ini menjadi test case yang memandu implementasi.
-   **Pecah proses menjadi langkah kecil.** Satu langkah = satu transformasi. Jika sebuah langkah masih terasa rumit, pecah lagi hingga setiap bagian dapat dijelaskan dalam satu kalimat.
-   **Uji dengan kasus normal dan kasus tidak biasa.** Kasus normal memastikan program bekerja. Kasus tidak biasa — data kosong, data negatif, data sangat besar — memastikan program tidak crash diam-diam.

#### Mini Challenge

Tuliskan input-process-output untuk program yang menghitung persentase kehadiran peserta, termasuk keputusan yang diambil jika total pertemuan adalah nol.

#### Ringkasan

Computational thinking adalah keterampilan yang memisahkan perancang solusi dari penulis kode. Dengan memecah masalah menjadi input, proses, dan output, serta mempertimbangkan kasus khusus sejak awal, peserta membangun fondasi yang berlaku di bahasa pemrograman mana pun. Kemampuan ini adalah investasi jangka panjang: sintask Python mungkin berubah, tetapi cara berpikir terstruktur tetap relevan di setiap pipeline data dan AI.

#### Persiapan Chapter Berikutnya

Sekarang kita telah memiliki cara berpikir yang terstruktur, langkah selanjutnya adalah menerjemahkan alur tersebut menjadi sintaks Python yang nyata — variabel, tipe data, dan operasi dasar.

* * * * *

## Chapter 2 — Development Environment

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/02-full.html`

### Chapter 2 — Development Environment

#### Learning Objectives

-   Mengenali Python, terminal, VS Code, virtual environment, Jupyter, dan Colab.
-   Menjalankan program `.py` dan cell notebook.
-   Mengelola package dasar dengan `pip` dan `requirements.txt`.

#### Kenapa Materi Ini Penting?

Kode yang benar tetap tidak berjalan jika environment salah. Banyak pemula mengira error instalasi adalah kegagalan coding, padahal masalahnya hanya lokasi file, interpreter, atau package.

#### Hubungan dengan AI

Project AI memakai banyak library. Environment menjaga versi dan dependency satu project agar tidak bertabrakan dengan project lain.

#### Analogi

Virtual environment seperti kotak alat khusus untuk satu project. Kamu tidak mencampur alat project kampus dengan alat project kerja.

#### Penjelasan Konsep

-   **Python:** interpreter yang menjalankan kode.
-   **Terminal:** tempat memberi perintah kepada komputer.
-   **VS Code:** editor untuk file `.py` dan project.
-   **Virtual environment:** ruang dependency terisolasi.
-   **Jupyter Notebook:** dokumen berisi cell kode dan penjelasan; cocok untuk eksplorasi data.
-   **Google Colab:** notebook di browser dengan environment siap pakai dan opsi akselerator seperti GPU. Ketersediaan dan batas GPU dapat berubah; GPU juga belum dibutuhkan di modul ini.

File `.py` cocok untuk program yang ingin dijalankan ulang sebagai satu kesatuan. Notebook cocok untuk eksperimen bertahap, visualisasi, dan catatan belajar. Kode produksi biasanya perlu dipindahkan dari eksperimen notebook menjadi modul yang lebih terstruktur.

#### Visual Thinking

    Folder project
    ├── .venv/            environment lokal
    ├── data/             dataset
    ├── notebooks/        eksplorasi
    ├── src/              file .py
    └── requirements.txt  daftar package

#### Contoh Nyata

Kamu memakai Pandas versi tertentu untuk tugas kelas. Virtual environment memastikan project lain tidak ikut berubah saat package dipasang.

#### Contoh AI

Notebook sering dipakai untuk mengeksplorasi dataset sebelum pipeline data dibuat lebih terstruktur.

#### Kode Python

    python -m venv .venv

    # macOS/Linux
    source .venv/bin/activate

    # Windows PowerShell
    .venv\Scripts\Activate.ps1

    python -m pip install numpy pandas
    python -m pip freeze > requirements.txt
    python app.py

#### Penjelasan Kode Baris per Baris

1.  `python -m venv .venv` membuat environment.
2.  Perintah `activate` memilih environment tersebut.
3.  `python -m pip install` memasang package pada interpreter aktif.
4.  `pip freeze` mencatat package dan versinya.
5.  `python app.py` menjalankan file program.

#### Common Mistakes

-   Menjalankan `pip` dari interpreter berbeda.
-   Meng-commit folder `.venv`.
-   Menganggap cell notebook selalu berjalan dari atas ke bawah; cell dapat dieksekusi dalam urutan berbeda.

#### Best Practices

-   Gunakan satu virtual environment per project.
-   Jalankan notebook dari awal secara berkala untuk menguji urutan cell.
-   Simpan dependency penting dalam `requirements.txt`.

#### Mini Challenge

Buat folder project, virtual environment, file `hello.py`, lalu jalankan dari terminal. Jika memakai Colab, buat notebook dan jalankan `print("Environment siap")`.

#### Ringkasan

Environment yang rapi membuat eksperimen dapat diulang dan mengurangi konflik dependency.

#### Persiapan Chapter Berikutnya

Setelah ruang kerja siap, kita belajar memecah masalah seperti komputer: input, process, output.

* * * * *

## Chapter 4 — Sintaks Dasar: Instruksi dan Bahan Data

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/02-topic.html`

### Chapter 4 — Sintaks Dasar: Instruksi dan Bahan Data

#### Learning Objectives

-   Menggunakan `print`, comment, variable, dan tipe data dasar.
-   Memilih tipe data yang sesuai.
-   Menghubungkan string dengan prompt dan metadata.

#### Kenapa Materi Ini Penting?

Setiap program Python — dari skrip sederhana hingga pipeline AI — bekerja dengan menyimpan, membaca, dan mengubah informasi. Tanpa pemahaman tentang bagaimana data disimpan dan apa operasi yang valid untuk setiap bentuk data, program akan menghasilkan error yang membingungkan atau — lebih berbahaya — hasil yang tampak benar tetapi sebenarnya salah. Misalnya menjumlahkan string "80" dan "70" menghasilkan "8070", bukan 150. Pemula sering mengira ini bug Python, padahal ini masalah pemilihan tipe data. Bab ini membangun fondasi yang membuat seluruh kode selanjutnya dapat diprediksi dan dipercaya.

#### Hubungan dengan AI

Dalam workflow AI, hampir setiap titik menyentuh tipe data yang berbeda. Prompt yang dikirim ke LLM adalah string. Skor evaluasi model adalah float. Jumlah baris dataset adalah integer. Status validasi — apakah data sudah siap diproses — adalah boolean. Ketika pipeline menerima input dari file atau API, tipe data sering datang dalam bentuk yang tidak terduga: angka terbaca sebagai string, nilai kosong menjadi None, atau kolom yang seharusnya numerik berisi teks. Memeriksa dan mengonversi tipe data di setiap tahap adalah keterampilan yang menyelamatkan waktu debugging berjam-jam.

#### Analogi

Variabel seperti wadah penyimpanan di dapur. Label pada wadah — misalnya `participant_name` atau `max_score` — memberi tahu isinya tanpa harus membuka tutup. Jenis wadah juga penting: toples kaca (string) cocok untuk label, kotak plastik (integer) untuk jumlah, dan timbangan (float) untuk berat. Menaruh bahan basah di wadah tepung akan merusak keduanya — sama seperti menyimpan skor sebagai string akan membuat operasi matematika gagal atau memberikan hasil yang menyesatkan. Memilih wadah dan label yang tepat sejak awal adalah tanda dapur yang terorganisir, bukan sekadar kebiasaan rapi.

#### Penjelasan Konsep

Python adalah bahasa yang *dynamically typed*, artinya kita tidak perlu mendeklarasikan tipe data secara eksplisit — interpreter akan mengenali jenis nilai yang disimpan. Namun kemudahan ini bukan alasan untuk mengabaikan tipe data. Memahami tipe data berarti kita tahu operasi apa yang aman dilakukan dan konsekuensi dari setiap operasi tersebut.

**str (string)** menyimpan teks — nama peserta, prompt ke model AI, atau path ke file dataset. String bisa digabung dengan operator +, dipecah menjadi potongan kecil dengan `.split()`, dan diformat ulang dengan f-string. Operasi matematika seperti pembagian tidak berlaku untuk string; ekspresi `"100" / 2` akan menghasilkan TypeError. Jika kamu menemukan angka yang sebenarnya adalah teks — misalnya dari file CSV — kamu harus mengonversinya terlebih dahulu menggunakan `int()` atau `float()`.

**int (integer)** menyimpan bilangan bulat seperti jumlah baris, jumlah peserta, atau jumlah epoch dalam pelatihan model. Integer mendukung penjumlahan, pengurangan, perkalian, dan pembagian. Namun perlu diingat: operator pembagian `/` selalu menghasilkan float meskipun hasilnya bilangan bulat. Jika kamu menginginkan hasil bagi yang dibulatkan ke bawah, gunakan operator `//`.

**float** menyimpan bilangan desimal yang mewakili ukuran kontinu — skor 87.5, temperatur 0.7, atau persentase missing value 0.05. Float memiliki keterbatasan presisi karena representasi biner di memori, sehingga operasi seperti `0.1 + 0.2` menghasilkan `0.30000000000000004`. Ini bukan bug Python, melainkan karakteristik komputasi numerik yang perlu dipahami ketika membandingkan nilai float.

**bool (boolean)** hanya memiliki dua nilai: `True` atau `False`. Boolean sering muncul sebagai hasil perbandingan — `score >= 75` menghasilkan True atau False — dan digunakan untuk mengontrol alur program dengan if/else. Boolean juga berguna sebagai status: `is_clean = True`, `has_error = False`.

**None** adalah tipe terpisah yang menandakan tidak ada nilai. None bukan nol, bukan string kosong, dan bukan False. Menyamakan None dengan nol adalah salah satu sumber bug paling umum dalam analisis data. Jika skor seorang peserta adalah None, itu berarti tidak ada data — bukan berarti skornya nol. Memeriksa None dengan `is None` harus dilakukan sebelum operasi numerik apa pun.

Python menggunakan indentasi (spasi atau tab) untuk menandai blok kode. Indentasi yang konsisten — biasanya 4 spasi — adalah bagian dari sintaks, bukan sekadar gaya penulisan. Kesalahan indentasi akan menghasilkan IndentationError dan program tidak berjalan.

#### Visual Thinking

    "Jelaskan AI" → str
    250            → int
    87.5           → float
    True           → bool
    None           → NoneType

#### Contoh Nyata

Bayangkan form pendaftaran peserta. Kolom nama diisi dengan teks (string). Kolom usia diisi dengan angka (int). Kolom nilai tes bisa berisi desimal (float). Kolom persetujuan diisi dengan centang (bool). Jika data dari form disimpan dalam dictionary, setiap field memiliki tipe yang berbeda dan perlu diperlakukan sesuai operasinya masing-masing. Jika kolom nilai kosong, sistem harus menanganinya sebagai None, bukan menganggapnya nol — karena nol akan memengaruhi rata-rata kelas.

#### Contoh AI

LLM menerima prompt sebagai string dan mengembalikan respons sebagai string. Parameter seperti temperature dan max\_tokens adalah float dan integer. Sebelum prompt dikirim ke model, semua parameter dikemas dalam dictionary yang nilainya memiliki tipe berbeda. Sistem yang baik memvalidasi bahwa temperature berada di rentang 0–2 sebelum dikirim, dan memeriksa bahwa respons yang diterima benar-benar string sebelum diproses lebih lanjut. Validasi tipe data di setiap gerbang ini mencegah error yang sulit dilacak.

#### Kode Python

    # Metadata eksperimen sederhana
    prompt = "Jelaskan AI untuk pemula"
    max_words = 100
    temperature = 0.3
    is_reviewed = False

    print(prompt)
    print(type(temperature))

#### Penjelasan Kode Baris per Baris

1.  Comment menjelaskan konteks kode tanpa memengaruhi eksekusi.
2.  `prompt` menyimpan teks sebagai string.
3.  `max_words` menyimpan bilangan bulat sebagai integer.
4.  `temperature` menyimpan desimal; di sini hanya contoh metadata, bukan pembahasan LLM.
5.  `is_reviewed` menyimpan status boolean.
6.  `type()` membantu memeriksa tipe data saat debugging.

#### Common Mistakes

-   **Menulis angka sebagai string lalu mencoba menjumlahkannya.** Jika data berasal dari form atau file CSV, angka sering terbaca sebagai string. Menjumlahkan "80" + "70" menghasilkan "8070" karena Python menggabungkan teks. Konversi dengan `int()` atau `float()` harus dilakukan sebelum operasi matematika.
-   **Nama variabel terlalu pendek tanpa konteks.** Variabel seperti `x`, `y`, atau `tmp` tidak menjelaskan perannya. Ketika kode kembali dibaca seminggu kemudian — atau oleh anggota tim lain — nama yang bermakna seperti `average_score` atau `cleaned_rows` menyelamatkan waktu menebak-nebak.
-   **Menggunakan comment untuk menjelaskan kode yang sebenarnya dapat dibuat lebih jelas.** Comment seharusnya menjelaskan *kenapa*, bukan *apa*. Jika kode membutuhkan comment untuk menjelaskan fungsinya, pertimbangkan untuk menulis ulang kodenya agar lebih ekspresif.

#### Best Practices

-   **Gunakan `snake_case` untuk nama variabel.** Python memiliki konvensi penamaan yang disepakati komunitas: huruf kecil dengan garis bawah sebagai pemisah. Konsistensi ini membuat kode lebih mudah dibaca oleh programmer Python lain.
-   **Pilih nama berdasarkan arti data.** `participant_count` lebih informatif daripada `n`, dan `missing_ratio` lebih jelas daripada `r`. Nama yang baik adalah dokumentasi pertama untuk kode kamu.
-   **Periksa tipe pada batas input.** Data dari file, form, atau API sering datang dalam tipe yang tidak terduga. Biasakan memeriksa dan mengonversi tipe data segera setelah data masuk, bukan saat data akan diproses.

#### Mini Challenge

Buat variabel `dataset_name`, `row_count`, `missing_ratio`, dan `is_clean`, lalu tampilkan nilai serta tipenya.

#### Ringkasan

Tipe data adalah fondasi setiap program Python. String, integer, float, boolean, dan None masing-masing memiliki aturan dan operasi yang berbeda. Memilih tipe yang tepat dan memvalidasi tipe data di titik masuk — terutama ketika data berasal dari sumber eksternal — adalah kebiasaan yang mencegah bug paling umum dalam analisis data. Dari sini kita akan membangun struktur data yang lebih kompleks menggunakan collection.

#### Persiapan Chapter Berikutnya

Satu nilai belum cukup untuk dataset. Berikutnya kita menyimpan banyak nilai dan metadata dalam collection.

* * * * *

### Chapter 5 — Collection: Wadah Data

#### Learning Objectives

-   Menggunakan list, tuple, dictionary, dan set.
-   Memilih collection berdasarkan kebutuhan.
-   Memodelkan baris dataset dan payload JSON sederhana.

#### Kenapa Materi Ini Penting?

Data di dunia nyata hampir tidak pernah berdiri sendiri. Satu peserta memiliki nama, skor, track, dan metadata lain; seribu peserta berarti seribu kumpulan field yang perlu disimpan, diakses, dan diproses. Collection adalah alat untuk mengatur banyak data dalam satu struktur yang terprediksi. Tanpa collection, kita harus membuat variabel terpisah untuk setiap record — pendekatan yang jelas tidak mungkin untuk dataset realistis. Memilih collection yang tepat — apakah list, dictionary, set, atau tuple — menentukan seberapa mudah data dapat diakses, diubah, dan dianalisis.

#### Hubungan dengan AI

Dalam workflow AI, list sering digunakan untuk menyimpan urutan record dataset. Dictionary merepresentasikan satu record — mirip dengan object JSON yang dikirim dan diterima oleh API AI. Set berguna untuk menghimpun kategori unik dari ribuan entri, misalnya semua track yang tersedia dalam program fellowship. Tuple cocok untuk pasangan nilai yang strukturnya tetap, seperti koordinat atau rentang nilai minimum-maksimum. Memahami collection berarti memahami bagaimana data mengalir antara Python, file, dan layanan eksternal.

#### Analogi

List seperti antrean di kasir: orang datang dan pergi, urutannya terjaga, dan kita bisa menambah atau menghapus orang dari antrean. Tuple seperti koordinat GPS: sekali ditulis (lintang, bujur), tidak berubah. Dictionary seperti kartu identitas: setiap label (NIK, nama, alamat) memiliki satu nilai, dan kita mencari berdasarkan label, bukan berdasarkan nomor urut. Set seperti daftar tamu undangan: setiap nama hanya muncul sekali, tidak ada duplikasi, dan urutan tidak penting. Memilih struktur yang tepat sejak awal sama pentingnya dengan memilih wadah yang tepat untuk menyimpan bahan makanan — wadah yang salah akan membuat isinya tumpah atau sulit diambil.

#### Penjelasan Konsep

<table>
<colgroup>
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="20%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Collection
Berurutan
Dapat diubah
Duplikat
Penggunaan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">List
Ya
Ya
Ya
Kumpulan record/nilai</td>
<td align="left">Tuple
Ya
Tidak
Ya
Struktur tetap</td>
<td align="left">Dictionary
Key order terjaga
Ya
Key unik
Metadata/JSON</td>
<td align="left">Set
Tidak untuk indexing
Ya
Tidak
Nilai unik</td>
</tr>
</tbody>
</table>

**List** adalah collection paling serbaguna. Ia menjaga urutan penyisipan, dapat diubah (ditambah, dihapus, diubah elemennya), dan mengizinkan duplikasi. Gunakan list ketika urutan berarti — misalnya daftar peserta sesuai urutan pendaftaran — atau ketika data akan diakses berdasarkan posisi (indeks). List juga cocok untuk menampung kumpulan record yang akan diproses dalam loop.

**Tuple** mirip dengan list tetapi tidak dapat diubah setelah dibuat. Sifat immutability ini membuat tuple aman digunakan sebagai key dalam dictionary atau ketika struktur data harus tetap konstan — misalnya koordinat (lat, lon) atau pasangan (nama\_kolom, tipe\_data). Tuple juga lebih ringan secara memori dibandingkan list.

**Dictionary** menyimpan pasangan key-value. Key harus unik dan immutable (biasanya string atau tuple), sedangkan value bisa berupa tipe apa pun — termasuk list atau dictionary lain. Dictionary sangat cocok untuk merepresentasikan satu record dengan field bernama model, mirip dengan object JSON. Mengakses nilai dengan `dict["key"]` lebih cepat daripada mencari dalam list, tetapi key harus dieja dengan tepat.

**Set** menyimpan nilai unik tanpa urutan tertentu. Operasi utama set adalah membership test ("apakah nilai ini ada?") dan operasi himpunan seperti gabungan, irisan, dan selisih. Set berguna untuk menghapus duplikat dari list atau mencari nilai yang muncul di dua kumpulan data berbeda. Namun set tidak dapat diakses berdasarkan indeks dan tidak dapat menyimpan nilai yang sama dua kali.

Collection dapat bersarang — misalnya list yang berisi dictionary, atau dictionary yang value-nya adalah list. Struktur bersarang ini adalah fondasi dari data tabular di Python dan akan sering ditemui saat bekerja dengan file JSON atau Pandas DataFrame.

#### Visual Thinking

    participant = {
      "name": "Ayu",
      "scores": [80, 90, 85],
      "location": ("Jakarta", "ID")
    }

#### Contoh Nyata

Seorang peserta memiliki nama (string) dan beberapa nilai (list of float). Banyak peserta menjadi list yang berisi dictionary — ini adalah struktur yang sama dengan data tabular. Jika kita ingin mengambil semua track unik dari ratusan peserta, set memberikan hasil instan tanpa perlu menulis loop manual. Jika data peserta perlu dikirim ke API, dictionary dapat langsung dikonversi menjadi JSON tanpa perubahan struktur.

#### Contoh AI

Respons dari API model AI hampir selalu berbentuk dictionary bersarang. Misalnya respons LLM dapat berisi key `"choices"` yang value-nya adalah list, dan setiap elemen list adalah dictionary dengan key `"message"` dan `"finish_reason"`. Memahami cara mengakses data bertingkat ini — `response["choices"][0]["message"]["content"]` — adalah keterampilan dasar yang akan dipakai terus menerus saat mengintegrasikan Python dengan layanan AI.

#### Kode Python

    participants = [
        {"name": "Ayu", "score": 88, "track": "data"},
        {"name": "Nisa", "score": 91, "track": "data"},
    ]

    tracks = {item["track"] for item in participants}
    print(participants[0]["name"])
    print(tracks)

#### Penjelasan Kode Baris per Baris

1.  `participants` adalah list yang menyimpan dua record.
2.  Setiap item dalam list adalah dictionary dengan schema yang sama: name, score, track.
3.  Set comprehension `{item["track"] for item in participants}` mengambil track unik — dalam contoh ini hanya "data" — tanpa perlu loop manual.
4.  Index `0` memilih peserta pertama dari list; key `["name"]` memilih field nama dari dictionary tersebut.
5.  Set track ditampilkan — perhatikan bahwa meskipun "data" muncul dua kali, set hanya menyimpannya sekali.

#### Common Mistakes

-   **Mengakses index yang tidak ada.** List dengan 3 elemen hanya memiliki index 0, 1, dan 2. Mengakses index 3 menghasilkan IndexError. Selalu periksa panjang list dengan `len()` sebelum mengakses index yang tidak pasti.
-   **Mengakses key yang salah eja.** Dictionary mengandalkan kecocokan persis nama key. `participant["name"]` berbeda dengan `participant["nama"]`. Satu huruf yang salah eja menghasilkan KeyError. Gunakan `.get()` jika key boleh tidak ada.
-   **Mengubah list saat sedang di-loop tanpa rencana.** Menghapus elemen dari list yang sedang di-loop dapat menyebabkan elemen terlewat atau error. Jika perlu memfilter, buat list baru daripada menghapus dari list yang sedang diproses.

#### Best Practices

-   **Gunakan struktur konsisten untuk setiap record.** Jika satu record memiliki key "name", semua record lain juga harus memiliki key "name". Inkonsistensi schema adalah sumber bug yang sulit dilacak.
-   **Pakai `.get()` jika key boleh tidak tersedia.** `participant.get("score", 0)` mengembalikan 0 sebagai default jika key "score" tidak ada, tanpa melempar KeyError. Nilai default harus dipilih dengan hati-hati — jangan asumsi nol selalu aman.
-   **Jangan memakai set ketika urutan atau duplikat bermakna.** Set tidak menjamin urutan dan menghapus duplikat secara otomatis. Jika urutan penyisipan penting atau duplikat memiliki arti — misalnya peserta dapat mengikuti beberapa track — set bukan pilihan yang tepat.

#### Mini Challenge

Tambahkan satu peserta, ambil semua nilai menjadi list baru, dan tampilkan track unik.

#### Ringkasan

List, tuple, dictionary, dan set masing-masing memiliki karakteristik yang membuatnya cocok untuk tugas tertentu. List untuk urutan yang dapat berubah, tuple untuk struktur tetap, dictionary untuk data bernama, dan set untuk keunikan. Collection dapat bersarang membentuk struktur data kompleks yang mendekati data dunia nyata. Pemilihan collection yang tepat sejak awal mengurangi kerumitan kode dan mencegah bug yang berkaitan dengan akses dan modifikasi data.

#### Persiapan Chapter Berikutnya

Berikutnya kita membuat program mengambil keputusan dan mengulang proses pada setiap record menggunakan control flow.

* * * * *

## Chapter 3 — Computational Thinking

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/03-full.html`

### Chapter 3 — Computational Thinking

#### Learning Objectives

-   Memetakan masalah menjadi input, process, dan output.
-   Menulis langkah solusi sebelum sintaks.
-   Membedakan data, aturan proses, dan hasil.

#### Kenapa Materi Ini Penting?

Program yang baik dimulai dari cara berpikir, bukan dari mengetik. Jika proses belum jelas, kode hanya membuat kebingungan berjalan lebih cepat.

#### Hubungan dengan AI

Pipeline AI menerima input, mengubahnya melalui beberapa proses, lalu menghasilkan output. Cara berpikir ini berlaku dari preprocessing data sampai inference.

#### Analogi

Mesin jus menerima buah sebagai input, memotong dan memblender sebagai process, lalu menghasilkan jus sebagai output. Komputer juga membutuhkan instruksi eksplisit.

#### Penjelasan Konsep

Komputer tidak “mengerti maksud” seperti rekan manusia. Ia menjalankan instruksi sesuai urutan dan data yang diberikan.

-   **Input:** data yang masuk.
-   **Process:** aturan atau transformasi.
-   **Output:** hasil yang keluar.

Sebelum coding, tulis pseudocode dalam bahasa biasa.

#### Visual Thinking

    Nilai peserta → validasi → hitung rata-rata → status kelulusan
         input          process                 output

#### Contoh Nyata

Input: harga dan jumlah barang. Process: perkalian dan penjumlahan. Output: total belanja.

#### Contoh AI

Input dapat berupa dataset teks. Process awal dapat berupa pembersihan teks. Outputnya dataset bersih yang siap dipelajari pada modul berikutnya.

#### Kode Python

    scores = [80, 90, 70]
    average = sum(scores) / len(scores)
    print(average)

#### Penjelasan Kode Baris per Baris

1.  `scores` adalah input berupa tiga nilai.
2.  `sum(scores)` menjumlahkan nilai dan `len(scores)` menghitung jumlah data.
3.  Hasil process disimpan dalam `average`.
4.  `print()` menampilkan output.

#### Common Mistakes

-   Coding sebelum mengetahui output yang diinginkan.
-   Tidak mempertimbangkan input kosong atau salah format.
-   Menggabungkan semua proses dalam satu langkah besar.

#### Best Practices

-   Tulis contoh input dan expected output.
-   Pecah process menjadi langkah kecil.
-   Uji dengan kasus normal dan kasus tidak biasa.

#### Mini Challenge

Tuliskan input–process–output untuk program yang menghitung persentase kehadiran peserta.

#### Ringkasan

Computational thinking mengubah masalah menjadi data masuk, langkah yang eksplisit, dan hasil yang dapat diperiksa.

#### Persiapan Chapter Berikutnya

Kita sekarang menerjemahkan alur tersebut menjadi sintaks dasar Python.

* * * * *

## Chapter 6 — Control Flow: Keputusan dan Perulangan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/03-topic.html`

### Chapter 6 — Control Flow: Keputusan dan Perulangan

#### Learning Objectives

-   Menggunakan `if`, `for`, dan `while`.
-   Memproses banyak record dengan aturan konsisten.
-   Menentukan kondisi berhenti yang aman.

#### Kenapa Materi Ini Penting?

Program yang hanya menjalankan instruksi lurus dari atas ke bawah sangat terbatas. Dalam workflow data nyata, kamu hampir tidak pernah tahu persis nilai apa yang akan diterima program. Sebuah kolom score dapat berisi angka yang valid, teks yang tidak bisa dikonversi, nilai yang tidak masuk akal seperti -1 atau 200, atau bahkan data kosong sama sekali. Tanpa control flow, program akan crash pada record pertama yang bermasalah atau—lebih berbahaya—diam-diam memproses data rusak seolah-olah semuanya normal.

Control flow memberi program kemampuan untuk mengambil keputusan: "Jika nilai ini kosong, lewati. Jika di bawah threshold, tandai untuk review. Jika valid, lanjutkan." Keputusan-keputusan kecil ini, ketika diterapkan secara konsisten pada ribuan record, menentukan apakah laporan akhir dapat dipercaya atau menyesatkan. Sebuah pipeline data yang baik bukan hanya menghasilkan output, tetapi juga mencatat setiap record yang ditolak dan alasan penolakannya.

Di sisi lain, perulangan memungkinkan program menerapkan aturan yang sama pada seluruh kumpulan data tanpa menulis ulang kode untuk setiap baris. Kombinasi keputusan dan perulangan adalah inti dari hampir semua proses data: validasi, cleansing, transformasi, dan agregasi semuanya bergantung pada kemampuan memeriksa dan mengulang.

#### Hubungan dengan AI

Sebelum data mencapai model AI, hampir selalu ada tahap preprocessing yang menerapkan aturan pada setiap baris dataset. Tahap ini melakukan hal-hal seperti melewati baris dengan nilai kosong, mengubah format tanggal yang tidak konsisten, memberi label sementara berdasarkan range nilai, atau menggabungkan beberapa sumber data. Semua langkah ini membutuhkan control flow—biasanya dalam bentuk loop yang memproses baris demi baris dan kondisi yang memutuskan tindakan apa yang diambil.

Pada modul ini kamu belum membangun model. Tapi setiap latihan control flow yang kamu kerjakan sekarang adalah fondasi untuk pipeline preprocessing yang akan kamu tulis nanti. Bedanya, pipeline produksi akan memproses jutaan baris, bukan tiga atau empat record contoh. Oleh karena itu kebiasaan menulis guard condition, mencatat record yang ditolak, dan menguji boundary harus sudah terbentuk sejak sekarang.

#### Analogi

Bayangkan seorang petugas registrasi di sebuah acara besar. Setiap peserta datang dengan formulir pendaftaran. Petugas memeriksa satu per satu: jika nama dan nomor identitas lengkap, peserta dipersilakan masuk. Jika ada data yang kosong, petugas meminta peserta melengkapi. Jika nilai tidak sah—misalnya usia ditulis "seratus" bukan angka—petugas mencatat untuk diperbaiki nanti. Proses "periksa satu per satu, putuskan tindakan, lanjutkan ke berikutnya" persis seperti yang dilakukan loop dan kondisi pada data.

Perbedaan utama: komputer tidak memiliki intuisi seperti petugas manusia. Jika petugas melihat field usia kosong, ia secara alami akan bertanya. Komputer tidak melakukan itu—ia hanya menjalankan instruksi yang ditulis. Jika tidak ada instruksi untuk menangani data kosong, komputer akan mencoba memprosesnya dan menghasilkan error, atau lebih buruk, menyimpan data rusak tanpa memberi tahu siapa pun. Di sinilah letak pentingnya menulis kondisi yang eksplisit untuk setiap skenario yang mungkin terjadi.

#### Penjelasan Konsep

Control flow dalam Python bekerja dengan mengevaluasi ekspresi boolean—ekspresi yang menghasilkan True atau False—dan memutuskan langkah selanjutnya berdasarkan hasil evaluasi tersebut. Setiap keputusan dan perulangan pada akhirnya kembali ke pertanyaan sederhana: "Apakah kondisi ini terpenuhi?" Memahami urutan evaluasi dan indentation (tanda blok) adalah kunci untuk menulis control flow yang benar.

**if/elif/else** digunakan ketika program perlu memilih satu dari beberapa cabang eksekusi. Kondisi diperiksa dari atas ke bawah; cabang pertama yang True akan dijalankan, sisanya dilewati. Urutan kondisi sangat penting: tempatkan guard condition (seperti pengecekan None atau tipe data) sebelum operasi yang membutuhkan data valid. Sebagai contoh, memeriksa apakah score is None harus dilakukan sebelum membandingkan score \>= 75, karena None tidak dapat dibandingkan dengan angka.

**for loop** digunakan untuk mengulang setiap elemen dalam sebuah collection—list, tuple, dictionary, atau generator. Loop ini adalah pilihan default ketika kamu ingin memproses setiap item dalam kumpulan data. Jumlah iterasi ditentukan oleh panjang collection, sehingga risiko infinite loop sangat kecil selama collection tidak dimodifikasi selama loop berjalan.

**while loop** mengulang selama sebuah kondisi bernilai True. Berbeda dengan for, while tidak secara otomatis berhenti—ia bergantung pada perubahan kondisi di dalam blok. Jika kondisi tidak pernah berubah menjadi False, loop akan berjalan selamanya. While berguna ketika jumlah iterasi tidak diketahui sebelumnya, misalnya membaca data sampai file habis atau menunggu input pengguna. Pastikan selalu ada jalur yang membuat kondisi berubah menjadi False.

**break** menghentikan loop sepenuhnya, sedangkan **continue** melewati sisa iterasi saat ini dan langsung melanjutkan ke iterasi berikutnya. Dalam pipeline data, continue berguna untuk melewati record yang tidak valid tanpa menghentikan seluruh proses, sementara break dapat digunakan ketika kondisi tertentu terpenuhi—misalnya menemukan record pertama yang memenuhi kriteria.

#### Visual Thinking

    Ambil record → nilai tersedia? → ya → proses
                             └───── tidak → tandai

#### Contoh Nyata

Seorang panitia memiliki daftar 200 nilai peserta. Aturannya: nilai minimal 75 dinyatakan lulus, nilai di bawah 75 perlu remedial, dan data kosong tidak diikutsertakan. Tanpa program, panitia harus memeriksa satu per satu secara manual—melelahkan dan rawan salah. Dengan loop Python, program memeriksa seluruh daftar dalam hitungan detik, mencatat jumlah lulus, jumlah remedial, dan jumlah data kosong secara otomatis.

Kunci dari proses ini bukan kecepatan eksekusi, melainkan konsistensi. Program tidak pernah "lelah" dan tidak pernah melewatkan record karena terburu-buru. Selama aturan ditulis dengan benar, setiap record mendapat perlakuan yang persis sama.

#### Contoh AI

Dalam workflow AI, tahap preprocessing hampir selalu melibatkan loop untuk memvalidasi setiap baris dataset. Sebagai contoh, sebelum data numerik digunakan sebagai fitur model, program perlu memeriksa apakah setiap baris memiliki nilai yang valid, apakah ada outlier yang melebihi batas wajar, dan apakah format data konsisten di seluruh baris. Control flow memungkinkan pemeriksaan ini dilakukan secara otomatis dan sistematis.

Pada tahap ini kita belum masuk ke model AI. Tapi kebiasaan menulis validasi berbasis kondisi dan loop akan langsung terpakai ketika kamu mulai membangun pipeline preprocessing yang sesungguhnya.

#### Kode Python

    scores = [88, None, 62, 91]

    for score in scores:
        if score is None:
            print("Data kosong")
            continue

        if score >= 75:
            print("Lulus")
        else:
            print("Perlu belajar ulang")

#### Penjelasan Kode Baris per Baris

1.  List berisi angka dan satu nilai kosong.
2.  `for` mengambil satu score setiap iterasi.
3.  `is None` memeriksa data kosong sebagai guard condition pertama.
4.  `continue` mencegah perbandingan angka dengan `None` yang akan menyebabkan TypeError.
5.  Kondisi `score >= 75` baru dieksekusi setelah guard condition terpenuhi.

#### Common Mistakes

-   **Salah indentasi.** Python menggunakan indentasi untuk menentukan blok kode. Satu spasi yang salah dapat mengubah logika program secara drastis—misalnya kode yang seharusnya di dalam kondisi malah dieksekusi setiap saat. Gunakan 4 spasi secara konsisten dan pastikan editor-mu menampilkan indentasi secara visual.
-   **Loop `while` tanpa perubahan kondisi sehingga tidak berhenti.** Jika kondisi awal True dan tidak pernah berubah di dalam loop, program akan berjalan selamanya dan membekukan sistem. Selalu pastikan ada pernyataan di dalam while yang mengubah kondisi menuju False, atau gunakan break dengan alasan yang jelas.
-   **Membandingkan `None` dengan angka.** None mewakili ketiadaan nilai, bukan angka nol. Operasi seperti `None > 75` akan menghasilkan TypeError. Selalu periksa None terlebih dahulu sebelum operasi numerik.

#### Best Practices

-   **Gunakan `for` ketika memproses collection.** For loop lebih aman daripada while karena jumlah iterasi ditentukan oleh panjang collection. Gunakan while hanya jika kamu benar-benar tidak tahu kapan loop harus berhenti.
-   **Pakai `while` hanya jika kondisi berhenti jelas dan dapat dicapai.** Setiap while loop harus memiliki kondisi yang berubah seiring iterasi. Jika kondisi tetap True selamanya, program tidak akan pernah berhenti.
-   **Tangani nilai kosong sebelum operasi utama.** Letakkan guard condition di awal blok kode. Ini memisahkan "apa yang tidak boleh diproses" dari "apa yang harus diproses" dan membuat kode lebih mudah dibaca serta diuji.

#### Mini Challenge

Hitung jumlah peserta lulus dan jumlah data kosong dari list contoh.

#### Ringkasan

Control flow adalah mekanisme yang membuat program mampu mengambil keputusan dan mengulang proses secara konsisten. Dengan if/elif/else, program dapat memilih tindakan berdasarkan kondisi data. Dengan for dan while, program dapat menerapkan aturan yang sama pada seluruh collection tanpa menulis ulang kode. Kombinasi keduanya—loop yang berisi kondisi—adalah pola yang paling sering muncul dalam pipeline data, validasi, dan preprocessing. Pastikan setiap kondisi memiliki guard yang memadai dan setiap loop memiliki jalan menuju terminasi.

#### Persiapan Chapter Berikutnya

Aturan yang sering digunakan perlu dibungkus menjadi function agar tidak diduplikasi dan mudah diuji secara terpisah.

* * * * *

## Chapter 4 — Sintaks Dasar: Instruksi dan Bahan Data

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/04-full.html`

### Chapter 4 — Sintaks Dasar: Instruksi dan Bahan Data

#### Learning Objectives

-   Menggunakan `print`, comment, variable, dan tipe data dasar.
-   Memilih tipe data yang sesuai.
-   Menghubungkan string dengan prompt dan metadata.

#### Kenapa Materi Ini Penting?

Variabel dan tipe data adalah cara program memberi nama serta makna pada informasi.

#### Hubungan dengan AI

Prompt adalah string, skor dapat berupa float, jumlah data berupa integer, dan status validasi berupa boolean. Tipe yang salah dapat merusak proses berikutnya.

#### Analogi

Variabel seperti label pada wadah. Label `participant_name` memberi tahu bahwa wadah menyimpan nama, bukan nilai ujian.

#### Penjelasan Konsep

-   `str`: teks.
-   `int`: bilangan bulat.
-   `float`: bilangan desimal.
-   `bool`: `True` atau `False`.
-   comment `#`: catatan untuk pembaca kode.

Python menggunakan indentasi untuk menandai blok. Nama variabel peka huruf besar-kecil.

#### Visual Thinking

    "Jelaskan AI" → str
    250            → int
    87.5           → float
    True           → bool

#### Contoh Nyata

Form pendaftaran memiliki nama, usia, nilai tes, dan status persetujuan.

#### Contoh AI

Prompt dan parameter konfigurasi disimpan sebagai string atau angka sebelum dikirim ke sistem AI.

#### Kode Python

    # Metadata eksperimen sederhana
    prompt = "Jelaskan AI untuk pemula"
    max_words = 100
    temperature = 0.3
    is_reviewed = False

    print(prompt)
    print(type(temperature))

#### Penjelasan Kode Baris per Baris

1.  Comment menjelaskan konteks kode.
2.  `prompt` menyimpan teks.
3.  `max_words` menyimpan bilangan bulat.
4.  `temperature` menyimpan desimal; di sini hanya contoh metadata, bukan pembahasan LLM.
5.  `is_reviewed` menyimpan status boolean.
6.  `type()` membantu memeriksa tipe data.

#### Common Mistakes

-   Menulis angka sebagai string lalu mencoba menjumlahkannya.
-   Nama variabel terlalu pendek seperti `x` tanpa konteks.
-   Menggunakan comment untuk menjelaskan kode yang sebenarnya dapat dibuat lebih jelas.

#### Best Practices

-   Gunakan `snake_case`.
-   Pilih nama berdasarkan arti data.
-   Periksa tipe pada batas input, misalnya data dari form atau file.

#### Mini Challenge

Buat variabel `dataset_name`, `row_count`, `missing_ratio`, dan `is_clean`, lalu tampilkan nilai serta tipenya.

#### Ringkasan

Sintaks dasar membantu kita menyimpan, menjelaskan, dan memeriksa data yang akan mengalir dalam program.

#### Persiapan Chapter Berikutnya

Satu nilai belum cukup untuk dataset. Berikutnya kita menyimpan banyak nilai dan metadata dalam collection.

* * * * *

## Chapter 7 — Function: Membangun Pipeline Kecil

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/04-topic.html`

### Chapter 7 — Function: Membangun Pipeline Kecil

#### Learning Objectives

-   Membuat function dengan parameter dan return value.
-   Membedakan input function, proses, dan output.
-   Menyusun beberapa function sebagai pipeline sederhana.

#### Kenapa Materi Ini Penting?

Copy-paste adalah salah satu praktik paling berbahaya dalam pemrograman data. Ketika aturan yang sama ditulis ulang di beberapa tempat, setiap perubahan harus dilakukan di semua lokasi tersebut—dan hampir pasti ada yang terlewat. Akibatnya, beberapa bagian program menggunakan aturan lama sementara bagian lain sudah diperbarui, menghasilkan output yang tidak konsisten dan sulit dilacak.

Function adalah solusi untuk masalah ini. Sebuah function membungkus satu tanggung jawab—misalnya "validasi apakah sebuah score valid"—ke dalam blok yang memiliki nama, input yang jelas, dan output yang dapat diprediksi. Setelah ditulis, function dapat dipanggil dari mana saja tanpa menulis ulang logikanya. Jika aturan berubah, cukup perbarui satu tempat.

Lebih dari sekadar menghindari duplikasi, function mengubah cara kamu berpikir tentang program. Dariba sebuah skrip panjang yang melakukan semuanya sekaligus, kamu mulai melihat program sebagai kumpulan langkah kecil yang masing-masing dapat diuji, diperbaiki, dan diganti secara independen. Inilah inti dari pipeline: serangkaian function yang masing-masing menerima input, melakukan satu transformasi, dan memberikan output ke function berikutnya.

#### Hubungan dengan AI

Pipeline data dalam project AI hampir selalu merupakan rangkaian function. Sebuah pipeline preprocessing tipikal memiliki `load_data()` yang membaca file, `validate_schema()` yang memeriksa kolom, `clean_data()` yang menangani missing value dan duplikat, `transform_features()` yang mengubah data mentah menjadi fitur, dan `save_clean_data()` yang menyimpan hasil. Setiap function memiliki satu tanggung jawab dan dapat diuji secara terpisah.

Pendekatan ini bukan hanya masalah organisasi kode. Dalam project AI, kamu sering perlu mengganti satu langkah preprocessing tanpa mengubah langkah lainnya—misalnya mencoba metode imputasi yang berbeda untuk missing value. Jika setiap langkah adalah function terpisah, kamu cukup menulis function baru dan menggantinya di pipeline tanpa menyentuh kode lain.

#### Analogi

Bayangkan sebuah resep masakan. Resep adalah function: ia menerima bahan (parameter), menentukan langkah-langkah (isi function), dan menghasilkan hidangan (return value). Selama kamu mengikuti resep yang sama, hasilnya akan konsisten. Jika ingin variasi, kamu cukup mengubah satu bagian resep tanpa menulis ulang seluruh buku masak.

Dalam data pipeline, setiap function adalah satu resep kecil. `load_data` adalah resep untuk membaca file. `clean_data` adalah resep untuk membersihkan data. Masing-masing berdiri sendiri, bisa diuji dengan bahannya masing-masing, dan bisa digabung dalam urutan berbeda untuk menghasilkan pipeline yang berbeda pula.

#### Penjelasan Konsep

**def** mendefinisikan function. Parameter adalah variabel input yang diterima function saat dipanggil. **return** mengirim nilai hasil kepada pemanggil. Jika function tidak memiliki return, ia mengembalikan None secara implisit. Perbedaan mendasar antara `return` dan `print`: return mengirim nilai untuk digunakan oleh bagian program lain, sedangkan print hanya menampilkan informasi ke layar dan hasilnya tidak dapat ditangkap oleh variabel.

Setiap function sebaiknya memiliki satu tanggung jawab yang jelas. Tanda sebuah function memiliki terlalu banyak tanggung jawab: namanya mengandung kata "dan" (misalnya `load_and_clean_and_save`), parameter terlalu banyak, atau sulit diuji karena bergantung pada banyak kondisi eksternal. Function yang baik dapat dijelaskan dalam satu kalimat tanpa menggunakan kata "dan".

Docstring—string di baris pertama function—berfungsi sebagai dokumentasi inline. Docstring menjelaskan apa yang dilakukan function, parameter apa yang diterima, dan apa yang dikembalikan. Ini bukan komentar biasa; banyak editor dan tool dokumentasi yang membaca docstring secara otomatis.

#### Visual Thinking

    raw score → validate_score() → clean score

#### Contoh Nyata

Aturan kelulusan dipakai pada ratusan peserta. Jika aturan tersebut ditulis ulang di setiap bagian program—misalnya di skrip laporan, di skrip notifikasi, dan di dashboard—maka ketika threshold berubah dari 75 menjadi 80, kamu harus mencari dan memperbarui ketiga tempat tersebut. Jika satu terlewat, laporan akan menggunakan aturan yang berbeda dari dashboard, menyebabkan kebingungan dan ketidakpercayaan.

Dengan function `classify_score(score, threshold=75)`, aturan ditulis sekali. Ketika threshold berubah, cukup ubah satu baris di definisi function. Semua pemanggil akan menggunakan aturan baru secara otomatis.

#### Contoh AI

Function preprocessing yang sama dapat digunakan pada data training dan data baru agar transformasinya konsisten. Ini adalah konsep yang akan diperdalam pada modul Machine Learning, tetapi fondasinya sudah kamu bangun di sini: menulis function yang menerima input, melakukan transformasi, dan mengembalikan output tanpa efek samping yang tersembunyi.

#### Kode Python

    def classify_score(score, threshold=75):
        """Mengembalikan status nilai peserta."""
        if score is None:
            return "missing"
        if score >= threshold:
            return "pass"
        return "review"

    status = classify_score(88)
    print(status)

#### Penjelasan Kode Baris per Baris

1.  Function menerima `score` dan threshold default 75.
2.  Docstring menjelaskan tanggung jawab function.
3.  Data kosong ditangani lebih dulu sebagai guard condition.
4.  Nilai valid dibandingkan dengan threshold.
5.  `return` mengirim satu status sebagai string.
6.  Function dipanggil dengan nilai 88; hasilnya disimpan di variabel.

#### Common Mistakes

-   **Menggunakan `print()` ketika caller membutuhkan `return`.** Print menampilkan teks ke layar, tetapi nilai tersebut tidak dapat ditangkap oleh variabel atau digunakan oleh function lain dalam pipeline. Jika kamu menulis `classify_score(88)` dan di dalamnya hanya ada `print("pass")`, maka `status = classify_score(88)` akan menyimpan None, bukan "pass".
-   **Function mengerjakan terlalu banyak hal.** Function yang mencampur validasi, transformasi, penyimpanan file, dan pengiriman notifikasi sulit diuji dan sulit digunakan ulang. Jika sebuah function memiliki lebih dari satu alasan untuk berubah, pisahkan.
-   **Mengubah data global secara tersembunyi.** Function yang memodifikasi variabel global tanpa memberi tahu pemanggil dapat menyebabkan bug yang sangat sulit dilacak. Gunakan parameter dan return value untuk komunikasi antar-function.

#### Best Practices

-   **Gunakan nama berupa tindakan.** Nama function seperti `validate_score()`, `load_data()`, atau `build_report()` langsung menjelaskan apa yang dilakukan. Hindari nama generik seperti `process()` atau `handle()`.
-   **Buat input dan output jelas.** Setiap function harus memiliki parameter yang mendokumentasikan data yang dibutuhkan dan return value yang menjelaskan hasilnya. Hindari function yang mengembalikan tipe berbeda tergantung kondisi.
-   **Uji function dengan normal, boundary, dan missing input.** Sebelum function dipakai dalam pipeline, uji dengan nilai normal (misalnya 88), nilai batas (74.9, 75, 100), dan input tidak valid (None, teks, -1). Ketiga kategori ini mencakup sebagian besar skenario error yang akan muncul di produksi.

#### Mini Challenge

Buat `calculate_average(scores)` yang mengabaikan `None` dan mengembalikan rata-rata atau `None` jika tidak ada nilai valid.

#### Ringkasan

Function adalah unit dasar organisasi kode dalam Python. Dengan membungkus satu tanggung jawab ke dalam function yang memiliki nama, parameter, dan return value yang jelas, kamu menghindari duplikasi, memudahkan pengujian, dan membangun fondasi untuk pipeline yang dapat dipercaya. Setiap function harus dapat dijelaskan dalam satu kalimat, diuji secara terpisah, dan digabungkan dengan function lain tanpa efek samping tersembunyi.

#### Persiapan Chapter Berikutnya

Kita akan mengenal dua alat modularitas tambahan: lambda untuk operasi singkat dan generator untuk aliran data bertahap.

* * * * *

### Chapter 8 — Modularitas: Lambda dan Generator

#### Learning Objectives

-   Memahami penggunaan lambda yang tepat.
-   Membuat generator sederhana dengan `yield`.
-   Memilih keterbacaan daripada kode yang terlalu ringkas.

#### Kenapa Materi Ini Penting?

Tidak semua operasi membutuhkan function penuh dengan nama dan docstring. Kadang kamu hanya perlu ekspresi kecil untuk memberi tahu `sorted()` bagaimana mengurutkan data, atau `map()` bagaimana mentransformasi nilai. Lambda adalah jawaban untuk kasus-kasus singkat seperti ini. Namun, kemudahan lambda sering kali menggoda programmer pemula untuk menulis logika rumit dalam satu baris—dan hasilnya justru lebih sulit dibaca daripada function biasa.

Di sisi lain, data dalam project AI bisa sangat besar. Sebuah dataset dengan jutaan baris tidak dapat dimuat seluruhnya ke dalam memori tanpa risiko crash. Generator memungkinkan kamu memproses data satu per satu tanpa menyimpan semuanya sekaligus. Ini bukan optimasi prematur—ini adalah kebiasaan yang diperlukan ketika bekerja dengan data dalam skala nyata.

#### Hubungan dengan AI

Lambda sering muncul dalam operasi sorting, filtering, dan transformasi data. Sebagai contoh, mengurutkan record peserta berdasarkan score membutuhkan key function yang mengambil score dari setiap record—dan lambda adalah cara paling ringkas untuk menulisnya. Generator, di sisi lain, sangat berguna ketika dataset besar perlu dialirkan ke pipeline preprocessing tanpa memuat semuanya ke RAM.

Pada tahap ini kamu belum bekerja dengan dataset besar. Tapi memahami konsep yield dan evaluasi lazy akan memberimu kerangka berpikir yang tepat ketika nanti berhadapan dengan data streaming atau batch processing.

#### Analogi

List seperti membawa seluruh galon air minum sekaligus—berat dan memakan tempat. Generator seperti keran air: air mengalir saat kamu butuh, dan kamu tidak perlu menyimpan seluruh sungai di rumah. Perbedaan ini menjadi sangat penting ketika "air" adalah dataset dengan jutaan baris.

Lambda seperti pisau lipat kecil—praktis untuk membuka kotak atau memotong lakban, tetapi tidak cocok untuk memotong kayu atau memasak. Gunakan lambda untuk tugas kecil yang selesai dalam satu ekspresi. Untuk logika yang membutuhkan beberapa langkah atau kondisi, gunakan def. Keterbacaan selalu lebih penting daripada keringkasan.

#### Penjelasan Konsep

Lambda adalah function anonim satu baris yang ditulis tanpa nama. Sintaksnya: `lambda parameter: ekspresi`. Lambda tidak memiliki pernyataan (statement), hanya ekspresi—artinya tidak bisa mengandung return, if/elif/else blok, atau loop. Cocok untuk operasi sederhana seperti mengambil field dari dictionary. Jika lambda mulai terlihat rumit, saatnya menggantinya dengan def.

Generator adalah function yang menggunakan **yield** sebagai pengganti return. Ketika function mencapai yield, eksekusi dijeda, nilai dikirim ke pemanggil, dan function melanjutkan dari titik yang sama ketika nilai berikutnya diminta. Perilaku ini disebut lazy evaluation: nilai dihasilkan hanya saat dibutuhkan, bukan sebelumnya.

Generator hanya dapat diiterasi satu kali. Setelah habis, kamu perlu membuat generator baru untuk mengulang proses. Ini berbeda dengan list yang dapat diiterasi berkali-kali. Pilihlah generator ketika kamu hanya perlu memproses data satu kali secara berurutan, dan pilihlah list jika data perlu diakses berulang atau secara acak.

#### Visual Thinking

    File besar → record 1 → record 2 → record 3 → ...
                  generator mengirim satu per satu

#### Contoh Nyata

Urutkan peserta berdasarkan score menggunakan key function.

#### Contoh AI

Dataset besar sering dibaca per batch atau per record agar penggunaan memori terkendali.

#### Kode Python

    participants = [
        {"name": "Ayu", "score": 88},
        {"name": "Nisa", "score": 91},
    ]

    ranked = sorted(participants, key=lambda item: item["score"], reverse=True)


    def stream_names(items):
        for item in items:
            yield item["name"]


    for name in stream_names(ranked):
        print(name)

#### Penjelasan Kode Baris per Baris

1.  List menyimpan dua record dengan schema yang sama.
2.  Lambda mengambil field score dari setiap item sebagai kunci pengurutan.
3.  `reverse=True` mengurutkan dari score tertinggi ke terendah.
4.  Generator menerima collection dan menghasilkan satu nama setiap kali yield dipanggil.
5.  `yield` mengirim satu nama pada satu waktu tanpa menyimpan seluruh hasil di memori.
6.  Loop meminta dan menampilkan setiap nama; generator aktif hanya selama loop berjalan.

#### Common Mistakes

-   **Lambda terlalu panjang dan sulit dibaca.** Jika ekspresi lambda melebihi satu baris atau mengandung logika bercabang, gunakan def. Kode yang ringkas tidak otomatis lebih baik.
-   **Mengira generator dapat diulang setelah habis.** Generator adalah iterator satu kali. Setelah semua nilai dihasilkan, loop for berikutnya tidak akan menghasilkan apa-apa. Buat generator baru jika perlu mengulang.
-   **Mengubah semua function menjadi generator tanpa kebutuhan.** Generator memiliki overhead dan keterbatasan (hanya satu kali iterasi). Gunakan hanya ketika aliran data bertahap atau penghematan memori memang relevan.

#### Best Practices

-   **Batasi lambda pada satu ekspresi jelas.** Lambda terbaik adalah yang bisa dibaca dalam sekejap. Jika pembaca perlu berpikir untuk memahami apa yang dilakukan lambda, saatnya beralih ke def.
-   **Pakai `def` untuk logika bernama atau kompleks.** Function dengan nama mendokumentasikan diri mereka sendiri. Nama seperti `get_score` lebih jelas daripada `lambda x: x["score"]` dalam konteks yang rumit.
-   **Gunakan generator ketika aliran data atau memori memang relevan.** Membaca file besar baris per baris, memproses streaming data, atau menghasilkan urutan tak terbatas adalah kasus penggunaan alami untuk generator.

#### Mini Challenge

Buat generator yang hanya menghasilkan score valid dari list yang mengandung `None`.

#### Ringkasan

Lambda dan generator adalah alat modularitas yang melengkapi function biasa. Lambda membantu operasi kecil tetap ringkas tanpa harus mendefinisikan function bernama. Generator memungkinkan aliran data bertahap tanpa memuat semuanya ke memori. Keduanya berguna jika tidak mengorbankan keterbacaan—dan keterbacaan hampir selalu lebih penting daripada keringkasan. Jika ragu, gunakan def.

#### Persiapan Chapter Berikutnya

Selanjutnya kita melihat bagaimana data dan perilaku dapat dibungkus dalam object sederhana melalui OOP.

* * * * *

## Chapter 5 — Collection: Wadah Data

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/05-full.html`

### Chapter 5 — Collection: Wadah Data

#### Learning Objectives

-   Menggunakan list, tuple, dictionary, dan set.
-   Memilih collection berdasarkan kebutuhan.
-   Memodelkan baris dataset dan payload JSON sederhana.

#### Kenapa Materi Ini Penting?

Data nyata terdiri dari banyak observasi. Collection memungkinkan kita menyimpan dan mengorganisasi data tersebut.

#### Hubungan dengan AI

List dapat menyimpan kumpulan label, dictionary menyerupai object JSON dari API, tuple cocok untuk pasangan tetap, dan set berguna mencari kategori unik.

#### Analogi

List seperti antrean yang dapat berubah. Tuple seperti koordinat yang strukturnya tetap. Dictionary seperti kartu identitas dengan label field. Set seperti daftar tamu unik tanpa duplikasi.

#### Penjelasan Konsep

<table>
<colgroup>
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="20%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Collection
Berurutan
Dapat diubah
Duplikat
Penggunaan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">List
Ya
Ya
Ya
Kumpulan record/nilai</td>
<td align="left">Tuple
Ya
Tidak
Ya
Struktur tetap</td>
<td align="left">Dictionary
Key order terjaga
Ya
Key unik
Metadata/JSON</td>
<td align="left">Set
Tidak untuk indexing
Ya
Tidak
Nilai unik</td>
</tr>
</tbody>
</table>

#### Visual Thinking

    participant = {
      "name": "Ayu",
      "scores": [80, 90, 85],
      "location": ("Jakarta", "ID")
    }

#### Contoh Nyata

Satu peserta memiliki nama dan beberapa nilai. Banyak peserta menjadi list berisi dictionary.

#### Contoh AI

Respons API sering direpresentasikan sebagai dictionary bersarang yang dapat diubah menjadi JSON.

#### Kode Python

    participants = [
        {"name": "Ayu", "score": 88, "track": "data"},
        {"name": "Nisa", "score": 91, "track": "data"},
    ]

    tracks = {item["track"] for item in participants}
    print(participants[0]["name"])
    print(tracks)

#### Penjelasan Kode Baris per Baris

1.  `participants` adalah list.
2.  Setiap item adalah dictionary dengan schema yang sama.
3.  Set comprehension mengambil track unik.
4.  Index `0` memilih peserta pertama; key `name` memilih field nama.
5.  Set track ditampilkan.

#### Common Mistakes

-   Mengakses index yang tidak ada.
-   Mengakses key yang salah eja.
-   Mengubah list saat sedang di-loop tanpa rencana.

#### Best Practices

-   Gunakan struktur konsisten untuk setiap record.
-   Pakai `.get()` jika key boleh tidak tersedia.
-   Jangan memakai set ketika urutan atau duplikat bermakna.

#### Mini Challenge

Tambahkan satu peserta, ambil semua nilai menjadi list baru, dan tampilkan track unik.

#### Ringkasan

Collection mengubah nilai terpisah menjadi struktur data yang dapat diproses sebagai dataset kecil.

#### Persiapan Chapter Berikutnya

Berikutnya kita membuat program mengambil keputusan dan mengulang proses pada setiap record.

* * * * *

## Chapter 9 — Object-Oriented Programming Dasar

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/05-topic.html`

### Chapter 9 — Object-Oriented Programming Dasar

#### Learning Objectives

-   Memahami class, object, attribute, dan method.
-   Membuat class kecil dengan tanggung jawab jelas.
-   Mengetahui kapan OOP tidak diperlukan.

#### Kenapa Materi Ini Penting?

Seiring bertambahnya ukuran program, data dan function yang saling terkait perlu diorganisasi supaya tidak tersebar di berbagai variabel global. OOP adalah salah satu cara organisasi tersebut—bukan satu-satunya cara, dan bukan cara yang selalu tepat. Tujuan chapter ini bukan menjadikanmu "pemrogram OOP", melainkan membekali kemampuan membaca dan menggunakan object ketika library atau tim memakainya.

Dalam workflow data skala kecil—misalnya satu script preprocessing—function sudah cukup. Namun ketika program mulai memiliki beberapa komponen yang masing-masing menyimpan state dan perilaku—seperti reader, transformer, dan reporter—class membantu menjaga agar kode tetap terstruktur dan dapat diuji secara terpisah.

#### Hubungan dengan AI

Hampir semua library Python untuk AI menggunakan object. Dataset di PyTorch adalah object; model di Scikit-learn adalah object; tokenizer di Hugging Face adalah object. Pola interaksinya biasanya konsisten: buat object dengan konfigurasi tertentu, lalu panggil method seperti `.fit()`, `.transform()`, atau `.predict()`. Kamu tidak perlu menghafal setiap detail class-library tersebut sekarang; cukup pahami bahwa object menggabungkan data (konfigurasi) dan perilaku (method) dalam satu kesatuan.

Penting untuk dicatat: di chapter ini kita tidak membangun model AI. Kita hanya berlatih membuat class sederhana agar pola `object.method()` terasa alami ketika kamu menjumpainya di library sungguhan.

#### Analogi

Class seperti blueprint formulir pendaftaran kosong: ia menentukan field apa saja yang ada (nama, score, track) dan aturan pengisiannya. Object adalah satu formulir yang sudah diisi dengan data peserta tertentu: "Ayu, 88, data". Kamu dapat membuat banyak object dari satu class yang sama, masing-masing dengan data berbeda, tetapi semuanya mengikuti struktur dan perilaku yang sama.

Perbedaan penting: jika kamu hanya perlu menyimpan data tanpa perilaku khusus, dictionary sudah cukup. Gunakan class ketika data dan perilaku saling terkait erat—misalnya setiap kali data berubah, ada aturan yang harus dijalankan secara otomatis.

#### Penjelasan Konsep

**Class** adalah cetak biru yang mendefinisikan attribute (data apa yang dimiliki) dan method (perilaku apa yang dapat dilakukan). **Object** atau **instance** adalah wujud nyata dari class tersebut, dengan attribute yang sudah diisi nilai konkret. Sebuah class dapat memiliki banyak instance, masing-masing dengan data berbeda tetapi method yang sama.

**\_\_init\_\_** adalah method khusus yang dipanggil secara otomatis ketika object dibuat. Di sinilah attribute pertama kali diisi. Parameter pertama dari setiap method dalam class adalah **self**, yang merujuk pada object yang sedang aktif. self memungkinkan method mengakses attribute instance yang sama—tanpa self, method tidak tahu data object mana yang harus digunakan.

Kapan OOP tidak diperlukan? Jika programmu hanya berupa beberapa function yang menerima input dan mengembalikan output tanpa menyimpan state, class hanya akan menambah kompleksitas tanpa manfaat. Untuk data sederhana, dictionary dengan function utility sudah lebih dari cukup. Jangan membuat class hanya karena "terlihat lebih profesional".

#### Visual Thinking

    Participant (class)
    ├── name, score (attributes)
    └── status() (method)

#### Contoh Nyata

Setiap peserta dalam program fellowship memiliki nama, nilai, dan aturan status yang sama. Daripada menulis function terpisah `get_status(name, score)` yang menerima data dari variabel global, kamu dapat membuat class Participant yang menyimpan data dan method status dalam satu tempat. Ini membuat kode lebih mudah diubah: jika aturan status berubah, kamu hanya mengedit method di dalam class, bukan mencarinya di berbagai function.

#### Contoh AI

Library machine learning seperti Scikit-learn menggunakan pola `model.fit(X, y)` untuk melatih dan `model.predict(X_new)` untuk memprediksi. Di sini model adalah object yang menyimpan state internal (parameter yang dipelajari) dan perilaku (fit, predict). Pada tahap ini kita belum masuk ke model tersebut; fokusnya adalah memahami pola interaksi object agar ketika kamu menjumpainya, sintaksnya tidak terasa asing.

#### Kode Python

    class Participant:
        def __init__(self, name, score):
            self.name = name
            self.score = score

        def status(self):
            return "pass" if self.score >= 75 else "review"


    ayu = Participant("Ayu", 88)
    print(ayu.status())

#### Penjelasan Kode Baris per Baris

1.  `class Participant` membuat blueprint.
2.  `__init__` berjalan saat object dibuat; ia menerima name dan score.
3.  Attribute `self.name` dan `self.score` menyimpan data pada instance.
4.  Method `status` menggunakan data yang tersimpan di instance untuk menentukan hasil.
5.  `ayu = Participant("Ayu", 88)` membuat satu instance dengan data spesifik.
6.  `ayu.status()` memanggil method pada instance tersebut.

#### Common Mistakes

-   **Membuat class untuk satu function sederhana.** Jika class hanya memiliki satu method selain \_\_init\_\_, pertimbangkan apakah function biasa sudah cukup. Class menambah overhead kognitif tanpa manfaat jika tidak ada state yang perlu dijaga.
-   **Lupa `self` sebagai parameter pertama.** Semua method dalam class harus menerima self sebagai parameter pertama. Tanpa self, Python akan menganggap method tersebut sebagai function biasa dan tidak dapat mengakses attribute instance.
-   **Menaruh terlalu banyak tanggung jawab dalam satu class.** Satu class idealnya memiliki satu alasan untuk berubah. Jika class Participant tiba-tiba juga menulis file dan mengirim email, ia sudah kehilangan fokus. Pisahkan tanggung jawab ke class yang lebih kecil.

#### Best Practices

-   **Mulai dengan function; gunakan class jika data dan perilaku benar-benar menyatu.** Jangan memaksakan OOP. Untuk dataset kecil, function yang menerima dictionary sudah cukup bersih dan mudah diuji.
-   **Beri class satu peran jelas.** Nama class harus mencerminkan tanggung jawabnya. Jika sulit menemukan nama yang tepat, mungkin class tersebut mencoba melakukan terlalu banyak hal.
-   **Hindari inheritance kompleks pada tahap pemula.** Pewarisan (inheritance) adalah fitur OOP tingkat lanjut. Pada tahap ini, cukup fokus pada class mandiri yang tidak mewarisi dari class lain.

#### Mini Challenge

Tambahkan method `summary()` yang mengembalikan teks berisi nama, nilai, dan status peserta.

#### Ringkasan

OOP adalah alat organisasi kode, bukan tujuan. Class menyatukan data (attribute) dan perilaku (method) dalam satu blueprint. Object adalah instance nyata dari class tersebut dengan data konkret. Gunakan class ketika state dan perilaku saling terkait dan program mulai memiliki beberapa komponen yang perlu diorganisasi. Untuk kasus sederhana, function dan dictionary sudah lebih dari cukup. Tujuan utama chapter ini adalah membekali kemampuan membaca dan menggunakan object—bukan menjadikanmu arsitek OOP.

#### Persiapan Chapter Berikutnya

Data dan file tidak selalu bersih. Berikutnya kita membuat program gagal dengan aman melalui error handling.

* * * * *

## Chapter 6 — Control Flow: Keputusan dan Perulangan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/06-full.html`

### Chapter 6 — Control Flow: Keputusan dan Perulangan

#### Learning Objectives

-   Menggunakan `if`, `for`, dan `while`.
-   Memproses banyak record dengan aturan konsisten.
-   Menentukan kondisi berhenti yang aman.

#### Kenapa Materi Ini Penting?

Program perlu memilih tindakan dan mengulang proses. Tanpa control flow, Python hanya menjalankan daftar instruksi lurus.

#### Hubungan dengan AI

Preprocessing sering menerapkan aturan yang sama pada setiap baris: melewati data kosong, mengubah format, atau memberi kategori sementara.

#### Analogi

Petugas registrasi memeriksa setiap peserta. Jika datanya lengkap, lanjut; jika tidak, tandai untuk diperbaiki. Itulah `for` dan `if`.

#### Penjelasan Konsep

-   `if/elif/else`: memilih cabang.
-   `for`: mengulang koleksi.
-   `while`: mengulang selama kondisi benar.
-   `break`: menghentikan loop.
-   `continue`: melewati iterasi aktif.

#### Visual Thinking

    Ambil record → nilai tersedia? → ya → proses
                             └───── tidak → tandai

#### Contoh Nyata

Sistem memberikan status “lulus” jika nilai minimal 75.

#### Contoh AI

Sebelum data digunakan dalam workflow AI, setiap record dapat divalidasi menggunakan loop dan kondisi.

#### Kode Python

    scores = [88, None, 62, 91]

    for score in scores:
        if score is None:
            print("Data kosong")
            continue

        if score >= 75:
            print("Lulus")
        else:
            print("Perlu belajar ulang")

#### Penjelasan Kode Baris per Baris

1.  List berisi angka dan satu nilai kosong.
2.  `for` mengambil satu score setiap iterasi.
3.  `is None` memeriksa data kosong.
4.  `continue` mencegah perbandingan angka dengan `None`.
5.  Kondisi nilai menentukan status.

#### Common Mistakes

-   Salah indentasi.
-   Loop `while` tanpa perubahan kondisi sehingga tidak berhenti.
-   Membandingkan `None` dengan angka.

#### Best Practices

-   Gunakan `for` ketika memproses collection.
-   Pakai `while` hanya jika kondisi berhenti jelas.
-   Tangani nilai kosong sebelum operasi utama.

#### Mini Challenge

Hitung jumlah peserta lulus dan jumlah data kosong dari list contoh.

#### Ringkasan

Control flow membuat program mampu menerapkan keputusan yang konsisten pada banyak data.

#### Persiapan Chapter Berikutnya

Aturan yang sering digunakan perlu dibungkus menjadi function agar tidak diduplikasi.

* * * * *

## Chapter 10 — Error Handling: Program yang Tahan Gangguan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/06-topic.html`

### Chapter 10 — Error Handling: Program yang Tahan Gangguan

#### Learning Objectives

-   Membaca error sebagai informasi.
-   Menggunakan `try`, `except`, `else`, dan `finally`.
-   Menangkap exception secara spesifik.

#### Kenapa Materi Ini Penting?

Dalam workflow data nyata, hampir tidak pernah semuanya berjalan mulus. File yang seharusnya ada ternyata hilang. Kolom yang seharusnya berisi angka ternyata berisi teks. Koneksi ke database terputus di tengah proses. Program yang tidak siap menghadapi situasi ini akan crash—dan jika crash terjadi di tengah pipeline yang memproses ribuan baris, kamu bisa kehilangan semua hasil yang sudah dikerjakan.

Error handling bukan tentang menyembunyikan masalah. Justru sebaliknya: ia membuat masalah terlihat, tercatat, dan dapat ditindaklanjuti. Program yang baik memberi pesan error yang jelas—"File participants.csv tidak ditemukan di folder data/"—bukan hanya "Something went wrong" tanpa petunjuk apa pun. Lebih penting lagi, program yang baik tahu kapan harus berhenti (jika data inti rusak) dan kapan harus melanjutkan (jika satu record invalid bisa dilewati).

Keputusan antara "hentikan proses" dan "lewati dan catat" adalah keputusan domain, bukan keputusan teknis. Error handling membantumu mengekspresikan keputusan tersebut dalam kode.

#### Hubungan dengan AI

Pipeline data untuk AI sering melibatkan banyak tahap: load, validate, clean, transform, dan save. Setiap tahap bisa gagal karena alasan berbeda. Error handling memastikan bahwa kegagalan di satu tahap tidak merusak data mentah atau menghasilkan output yang menyesatkan tanpa peringatan. Jika data yang buruk lolos tanpa terdeteksi, model yang dilatih di atasnya akan belajar dari data yang salah—dan hasilnya tidak dapat dipercaya.

#### Analogi

Error handling seperti sabuk pengaman dan airbag di mobil. Sabuk pengaman tidak mencegah tabrakan, tetapi mengurangi dampak ketika tabrakan terjadi. Demikian pula try/except tidak mencegah error, tetapi memastikan program merespons error dengan cara yang terkendali. Tanpa sabuk pengaman, tabrakan kecil dapat berakibat fatal. Tanpa error handling, error kecil (seperti satu file hilang) dapat menghentikan seluruh pipeline tanpa pesan yang jelas.

#### Penjelasan Konsep

Blok `try` berisi kode yang berpotensi menghasilkan error. Jika error terjadi, eksekusi segera melompat ke blok `except` yang sesuai—kode di dalam try setelah titik error tidak akan dijalankan. `except` dapat menangkap jenis error tertentu (misalnya ValueError, FileNotFoundError) atau semua error. Menangkap error spesifik jauh lebih baik karena memberikan kesempatan untuk memberikan respons yang tepat sesuai jenis kegagalan.

`else` berjalan hanya jika blok try tidak menghasilkan error apa pun. Ini berguna untuk kode yang hanya boleh dieksekusi ketika operasi utama berhasil—misalnya menyimpan log "proses berhasil". `finally` selalu berjalan, baik terjadi error maupun tidak. Ini biasanya digunakan untuk membersihkan resource seperti menutup file atau koneksi database.

Penting untuk diingat: exception adalah mekanisme untuk menangani situasi luar biasa, bukan untuk alur normal. Jika suatu kondisi dapat diperiksa dengan if sederhana—misalnya memeriksa apakah file ada sebelum membaca—gunakan if, bukan try/except. Exception handling lebih mahal secara komputasi dan menyembunyikan alur program jika digunakan secara berlebihan.

#### Visual Thinking

    Try process → sukses → else
           └────→ error spesifik → except
                        ↓
                     finally

#### Contoh Nyata

Panitia menerima input nilai dari form web. Input masih berupa teks: "88", "tujuh puluh", "", "91". Tanpa error handling, konversi "tujuh puluh" ke float akan membuat program crash dan menghentikan seluruh proses. Dengan try/except, program dapat menangkap ValueError, mencatat bahwa satu record gagal dikonversi, dan melanjutkan ke record berikutnya.

#### Contoh AI

Sebelum data diproses oleh model, pipeline memvalidasi tipe dan range setiap kolom. Record yang gagal validasi tidak otomatis dihapus—mereka dicatat dalam log agar tim data dapat memeriksa apakah ada pola dalam kegagalan tersebut. Error handling di sini berfungsi sebagai jaring pengaman yang memisahkan "data yang bisa diproses" dari "data yang perlu diperiksa manual".

#### Kode Python

    raw_score = "88"

    try:
        score = float(raw_score)
    except ValueError:
        print("Nilai harus berupa angka")
    else:
        print(f"Nilai valid: {score}")
    finally:
        print("Validasi selesai")

#### Penjelasan Kode Baris per Baris

1.  Input awal masih bertipe string.
2.  `try` mencoba mengubahnya menjadi float.
3.  `ValueError` ditangani jika format tidak sesuai angka.
4.  `else` hanya berjalan saat konversi berhasil.
5.  `finally` selalu dieksekusi sebagai penutup proses validasi.

#### Common Mistakes

-   **Memakai `except:` yang menangkap semua error.** Ini menyembunyikan bug yang tidak terduga. Selalu tangkap exception spesifik seperti ValueError, FileNotFoundError, atau TypeError. Jika memang perlu menangkap semua error, setidaknya catat traceback-nya.
-   **Mengabaikan error tanpa log atau pesan.** `except: pass` adalah salah satu pola paling berbahaya. Error tetap terjadi, tetapi program diam-diam melanjutkan seolah tidak ada masalah. Data yang dihasilkan bisa rusak tanpa ada yang tahu.
-   **Menggunakan exception untuk alur normal yang mudah diperiksa dengan `if`.** Jika suatu kondisi dapat dicegah sebelum terjadi—seperti memeriksa apakah file ada—gunakan if, bukan try/except. Exception handling bukan pengganti validasi biasa.

#### Best Practices

-   **Tangkap exception paling spesifik.** ValueError untuk masalah konversi, FileNotFoundError untuk file hilang, TypeError untuk operasi dengan tipe salah. Ini membuat pesan error lebih bermakna.
-   **Berikan pesan yang membantu tindakan berikutnya.** "File tidak ditemukan. Periksa path dan coba lagi" lebih baik daripada "Error terjadi".
-   **Jangan melanjutkan pipeline dengan data rusak tanpa keputusan eksplisit.** Jika data tidak valid, putuskan: lewati, isi dengan default (dengan catatan), atau hentikan proses. Jangan biarkan program berjalan tanpa menyadari bahwa data yang diproses mungkin tidak akurat.

#### Mini Challenge

Buat function `parse_score(value)` yang mengembalikan float atau `None` dengan pesan yang jelas.

#### Ringkasan

Error handling mengubah kegagalan program dari "diam-diam menghasilkan output salah" menjadi "berhenti dengan pesan jelas" atau "lewati dengan catatan". Gunakan try/except untuk kode yang berpotensi gagal, tangkap exception spesifik, dan berikan pesan yang membantu perbaikan. Jangan gunakan exception sebagai pengganti validasi if yang sederhana, dan jangan pernah mengabaikan error dengan except: pass tanpa setidaknya mencatatnya.

#### Persiapan Chapter Berikutnya

Berikutnya kita membawa program keluar dari memori dengan membaca dan menulis file.

* * * * *

### Chapter 11 — File I/O: Bertemu Dataset

#### Learning Objectives

-   Membaca dan menulis file teks serta CSV dasar.
-   Menggunakan context manager `with`.
-   Memahami path, encoding, dan schema sederhana.

#### Kenapa Materi Ini Penting?

Selama ini data yang kita proses berada di dalam kode: list yang ditulis manual, dictionary yang dibuat di tempat. Di dunia nyata, data datang dari file: CSV dari spreadsheet, JSON dari API, log dari server, atau teks dari laporan. File I/O adalah jembatan pertama antara program Python dan dataset nyata. Tanpa kemampuan membaca dan menulis file, Python hanya bisa memproses data yang diketik langsung oleh programmer—sangat terbatas dan tidak praktis.

Lebih dari sekadar membaca, File I/O juga berarti menyimpan hasil. Pipeline data yang membersihkan ribuan baris perlu menyimpan output-nya ke file baru tanpa menimpa data mentah. Kemampuan memisahkan input, output, dan dokumentasi perubahan adalah ciri workflow data yang profesional dan dapat diaudit.

#### Hubungan dengan AI

Dataset untuk proyek AI hampir selalu disimpan dalam file: CSV untuk data tabular, JSON untuk data terstruktur, teks untuk korpus, atau format biner untuk data terlatih. Mampu membaca file dengan encoding yang benar (UTF-8 untuk teks Indonesia) dan menyimpan hasil tanpa kehilangan informasi adalah prerequisite sebelum masuk ke tahap analisis atau modeling. Pada modul ini kita hanya membaca dan menulis CSV dan teks; format yang lebih kompleks akan diperkenalkan di modul lanjutan.

#### Analogi

Program Python adalah pekerja di meja kerja; file adalah lemari arsip di sebelahnya. Membuka file berarti mengambil arsip dari lemari, membaca atau mengubah isinya, lalu menutup lemari kembali. Jika kamu lupa menutup lemari (file), lama-kelamaan meja akan penuh dengan arsip terbuka dan sistem akan kehabisan tempat. Context manager `with` memastikan file selalu ditutup secara otomatis, seperti lemari yang tertutup sendiri setelah kamu selesai.

#### Penjelasan Konsep

Mode utama membuka file: `r` untuk membaca (read), `w` untuk menulis ulang (write—hati-hati, ini akan menghapus isi file yang sudah ada), dan `a` untuk menambah (append—menambahkan ke akhir file tanpa menghapus isi yang sudah ada). Mode `w` sangat berguna untuk menyimpan output baru, tetapi sangat berbahaya jika digunakan pada file yang masih diperlukan—gunakan pada file output, bukan file input mentah.

**Context manager `with`** memastikan file ditutup secara otomatis setelah blok kode selesai, bahkan jika terjadi error di dalamnya. Ini adalah cara yang direkomendasikan untuk semua operasi file. **Encoding UTF-8** penting untuk teks Indonesia yang mengandung huruf seperti é, ü, atau tanda petik khusus. Tanpa encoding yang tepat, karakter tersebut akan tampil sebagai simbol yang tidak terbaca atau menyebabkan error.

**pathlib.Path** adalah cara modern untuk menangani path file. Path lebih portabel daripada string biasa (tidak perlu khawatir dengan perbedaan slash di Windows vs Linux) dan menyediakan method yang nyaman seperti `.exists()`, `.read_text()`, dan `.write_text()`.

#### Visual Thinking

    participants.csv → open/read → Python → process → report.txt

#### Contoh Nyata

Panitia menyimpan nilai peserta dalam CSV. Program membaca CSV tersebut, menghitung rata-rata dan jumlah peserta per track, lalu menyimpan laporan ke file teks terpisah. Data mentah tetap aman; output baru disimpan sebagai file yang berbeda. Jika ada kesalahan dalam perhitungan, cukup jalankan ulang program tanpa harus memperbaiki data mentah.

#### Contoh AI

CSV yang dibaca dengan Pandas (nanti di chapter 14) adalah format yang sama. Kemampuan membaca CSV dengan Python dasar membantumu memahami apa yang sebenarnya terjadi di belakang layar ketika library seperti Pandas membaca file. Di tahap ini kita hanya fokus pada mekanisme file I/O; Pandas akan menambahkan layer kemudahan di atasnya.

#### Kode Python

    from pathlib import Path

    report_path = Path("report.txt")

    with report_path.open("w", encoding="utf-8") as file:
        file.write("Rata-rata nilai: 84.5\n")

    with report_path.open("r", encoding="utf-8") as file:
        report = file.read()

    print(report)

#### Penjelasan Kode Baris per Baris

1.  `Path` dari pathlib membantu mengelola lokasi file secara portabel.
2.  Path output `report.txt` ditentukan.
3.  File dibuka dalam mode tulis dengan encoding UTF-8. Jika file belum ada, file akan dibuat.
4.  Teks dan newline ditulis ke file.
5.  File dibuka kembali dalam mode baca.
6.  Seluruh isi file disimpan ke variabel `report` dan ditampilkan.

#### Common Mistakes

-   **Memakai `w` lalu tidak sengaja menimpa file.** Mode write menghapus isi file yang sudah ada. Selalu gunakan nama file output yang berbeda dari file input mentah.
-   **Mengandalkan working directory tanpa memahami path.** Program mencari file di direktori kerja saat ini, yang mungkin berbeda dari lokasi script. Gunakan path absolut atau path relatif yang eksplisit.
-   **Tidak menentukan encoding.** Tanpa encoding yang jelas, Python menggunakan encoding default sistem yang mungkin tidak mendukung karakter tertentu. Selalu tentukan `encoding="utf-8"`.

#### Best Practices

-   **Gunakan `with` dan `pathlib.Path`.** Context manager menutup file otomatis; Path membuat pengelolaan path lebih aman dan portabel.
-   **Pisahkan folder data mentah dan output.** Struktur folder yang rapi mencegah penimpaan tidak sengaja dan memudahkan audit.
-   **Jangan menimpa raw dataset; simpan hasil sebagai file baru.** Data mentah adalah satu-satunya referensi yang dapat dipercaya. Semua transformasi harus menghasilkan file baru agar transformasi dapat diperiksa dan diulang.

#### Mini Challenge

Tulis tiga baris ringkasan ke `summary.txt`, baca kembali, dan tampilkan.

#### Ringkasan

File I/O adalah jembatan antara program dan dataset nyata. Context manager `with` memastikan file dikelola dengan aman. Mode `r`, `w`, dan `a` memberikan kontrol atas bagaimana file dibaca atau ditulis. Encoding UTF-8 dan pathlib.Path adalah standar yang harus digunakan sejak awal. Prinsip paling penting: jangan pernah menimpa data mentah—simpan hasil transformasi sebagai file baru agar seluruh proses dapat diaudit dan diulang.

#### Persiapan Chapter Berikutnya

Python dasar dapat melakukan banyak hal, tetapi library membuat pekerjaan data jauh lebih efisien. Kita mulai menjelajahi ekosistem Python untuk AI.

* * * * *

## Chapter 7 — Function: Membangun Pipeline Kecil

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/07-full.html`

### Chapter 7 — Function: Membangun Pipeline Kecil

#### Learning Objectives

-   Membuat function dengan parameter dan return value.
-   Membedakan input function, proses, dan output.
-   Menyusun beberapa function sebagai pipeline sederhana.

#### Kenapa Materi Ini Penting?

Copy-paste membuat perbaikan sulit dan hasil tidak konsisten. Function memberi nama pada satu tanggung jawab.

#### Hubungan dengan AI

Pipeline data dapat terdiri dari `load_data()`, `clean_data()`, `summarize_data()`, dan `save_report()`.

#### Analogi

Function seperti resep. Bahan masuk sebagai parameter, langkah dilakukan di dalamnya, dan hasil dikembalikan.

#### Penjelasan Konsep

`def` mendefinisikan function. Parameter menerima input. `return` mengirim hasil agar dapat dipakai bagian lain. Function sebaiknya memiliki satu tujuan yang jelas.

#### Visual Thinking

    raw score → validate_score() → clean score

#### Contoh Nyata

Aturan kelulusan dipakai pada ratusan peserta. Simpan aturan dalam satu function agar mudah diuji.

#### Contoh AI

Function preprocessing yang sama dapat digunakan pada data training dan data baru agar transformasinya konsisten—konsep ini akan diperdalam nanti.

#### Kode Python

    def classify_score(score, threshold=75):
        """Mengembalikan status nilai peserta."""
        if score is None:
            return "missing"
        if score >= threshold:
            return "pass"
        return "review"


    status = classify_score(88)
    print(status)

#### Penjelasan Kode Baris per Baris

1.  Function menerima `score` dan threshold default.
2.  Docstring menjelaskan tanggung jawabnya.
3.  Data kosong ditangani lebih dulu.
4.  Nilai dibandingkan dengan threshold.
5.  `return` mengirim satu status.
6.  Function dipanggil dengan nilai 88.

#### Common Mistakes

-   Menggunakan `print()` ketika caller sebenarnya membutuhkan `return`.
-   Function mengerjakan terlalu banyak hal.
-   Mengubah data global secara tersembunyi.

#### Best Practices

-   Gunakan nama berupa tindakan.
-   Buat input dan output jelas.
-   Uji function dengan normal, boundary, dan missing input.

#### Mini Challenge

Buat `calculate_average(scores)` yang mengabaikan `None` dan mengembalikan rata-rata atau `None` jika tidak ada nilai valid.

#### Ringkasan

Function mengubah langkah berulang menjadi komponen pipeline yang reusable dan dapat diuji.

#### Persiapan Chapter Berikutnya

Kita akan mengenal dua alat modularitas tambahan: lambda untuk operasi singkat dan generator untuk aliran data.

* * * * *

## Chapter 12 — Ekosistem Python untuk AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/07-topic.html`

### Chapter 12 — Ekosistem Python untuk AI

#### Learning Objectives

-   Mengenali library utama dalam workflow AI.
-   Memilih library berdasarkan masalah.
-   Memahami package sebagai kemampuan tambahan, bukan tujuan belajar.

#### Kenapa Materi Ini Penting?

Pemula sering kewalahan oleh banyak nama library yang bermunculan setiap tahun. Rasa ingin memasang semuanya sangat kuat, padahal setiap library lahir untuk menyelesaikan masalah spesifik. Chapter ini tidak akan mengajarkan semua library secara mendalam. Tujuannya lebih sederhana: memberi peta sehingga kamu tahu library apa yang cocok untuk masalah apa, dan tidak panic saat membaca tutorial yang menyebut NumPy, Pandas, Scikit-learn, atau PyTorch.

Peta ini penting karena workflow AI melibatkan beberapa tahap yang masing-masing membutuhkan alat berbeda. Tahap data tabular paling efisien dengan Pandas, komputasi numerik dengan NumPy, visualisasi dengan Matplotlib, dan machine learning dengan Scikit-learn atau PyTorch. Tidak ada satu library yang mengerjakan semuanya dengan optimal. Memahami peran masing-masing membantu kamu memilih alat yang tepat tanpa membuang waktu mempelajari yang tidak relevan.

Pada modul ini kita hanya akan mendalami NumPy dan Pandas secara langsung. Library lain akan kamu temui di modul-modul berikutnya. Namun peta keseluruhan tetap penting agar setiap library baru yang kamu pelajari nanti memiliki tempat yang jelas dalam workflow.

#### Hubungan dengan AI

Ekosistem library Python mencakup seluruh tahap workflow AI: dari pengambilan data (requests, BeautifulSoup), penyimpanan (SQLAlchemy, PyArrow), pemrosesan (NumPy, Pandas), visualisasi (Matplotlib, Seaborn), machine learning (Scikit-learn, XGBoost), deep learning (PyTorch, TensorFlow), hingga deployment (FastAPI, Flask). Setiap tahap memiliki library yang menjadi standar di industrinya masing-masing.

Pada tahap ini, fokus kita adalah pada library yang menangani data tabular dan komputasi numerik—yaitu NumPy dan Pandas. Keduanya adalah fondasi yang hampir selalu muncul sebelum library machine learning digunakan. Jika kamu memahami keduanya dengan baik, belajar Scikit-learn atau PyTorch nanti akan jauh lebih lancar karena pola datanya sudah familiar.

#### Analogi

Python adalah smartphone; library adalah aplikasi di dalamnya. Kamu tidak memasang semua aplikasi yang ada di App Store atau Play Store—kamu memasang yang kamu butuhkan. Sama halnya dengan library: instal NumPy ketika perlu komputasi array, instal Pandas ketika perlu tabel, instal Matplotlib ketika perlu grafik. Memasang library tanpa kebutuhan hanya menambah kompleksitas environment dan memperlambat proses belajar.

Lebih penting lagi: memiliki banyak aplikasi di smartphone tidak membuatmu jago menggunakan semuanya. Sama dengan library—memasang Scikit-learn tidak berarti kamu sudah bisa machine learning. Kuasai satu library untuk satu kebutuhan, lalu perluas secara bertahap.

#### Penjelasan Konsep

Library dalam ekosistem Python dapat dikelompokkan berdasarkan tahap workflow AI yang mereka dukung. Tabel berikut menunjukkan library utama dan peran ringkasnya. Kamu tidak perlu menghafal semuanya; cukup pahami kategori dan fungsi masing-masing agar ketika tutorial atau dokumentasi menyebut nama library tersebut, kamu memiliki gambaran tentang apa yang dilakukannya.

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Library
Peran ringkas</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">NumPy
Array dan komputasi numerik</td>
<td align="left">Pandas
Data tabular dan cleaning</td>
</tr>
</tbody>
</table>

Dari tabel di atas, perhatikan bahwa Scikit-learn, PyTorch, TensorFlow, Transformers, dan OpenCV diberi label "modul berikutnya" atau "modul lanjutan". Ini berarti kita belum menggunakannya sekarang. Fokus modul ini adalah NumPy (komputasi array) dan Pandas (data tabular)—dua library yang menjadi fondasi sebelum library machine learning mana pun.

#### Visual Thinking

    Data tabular ─ Pandas ─ NumPy ─ visualisasi
                                  ├─ Scikit-learn (nanti)
                                  ├─ PyTorch/TensorFlow (nanti)
    Teks/gambar ─ Transformers/OpenCV (nanti)

#### Contoh Nyata

Pandas membaca file nilai, NumPy menghitung statistik, Matplotlib membuat grafik.

#### Contoh AI

Pada project lanjutan, Scikit-learn atau framework lain menerima data yang sudah disiapkan. Kualitas tahap persiapan tetap penting.

#### Kode Python

    import numpy as np
    import pandas as pd

    print(np.__name__)
    print(pd.__name__)

#### Penjelasan Kode Baris per Baris

1.  NumPy diimpor dengan alias konvensional `np`.
2.  Pandas diimpor dengan alias `pd`.
3.  Nama module ditampilkan sebagai pemeriksaan sederhana.

#### Common Mistakes

-   **Memasang semua library sekaligus.** Ini membuat environment membengkak, dependency sulit dikelola, dan kamu tidak benar-benar memahami library mana yang dipakai untuk apa. Instal hanya library yang kamu butuhkan untuk tugas saat ini.
-   **Mengimpor package yang tidak dipakai.** Import yang tidak terpakai membuat kode lebih sulit dibaca dan memberikan kesan bahwa library tertentu diperlukan padahal tidak. Hapus import yang tidak digunakan.
-   **Mengira library menggantikan pemahaman data.** Library adalah alat. Memanggil fungsi cleaning tidak berarti data sudah bersih jika kamu tidak memahami aturan cleaning yang tepat untuk konteksmu.

#### Best Practices

-   **Mulai dari kebutuhan workflow.** Tentukan dulu apa yang perlu dilakukan terhadap data, baru pilih library yang sesuai. Jangan memilih library dulu lalu mencari masalah yang cocok.
-   **Gunakan dokumentasi resmi.** Dokumentasi resmi NumPy, Pandas, dan library lain adalah sumber kebenaran. Tutorial pihak ketiga boleh dipakai untuk gambaran awal, tapi jangan dijadikan satu-satunya referensi.
-   **Catat dependency project.** Simpan daftar library yang digunakan dalam requirements.txt agar environment dapat dibangun ulang oleh anggota tim lain atau oleh dirimu sendiri di masa depan.

#### Mini Challenge

Pilih library yang paling relevan untuk: tabel CSV, array angka, grafik, gambar, dan Deep Learning. Jelaskan alasannya satu kalimat.

#### Ringkasan

Ekosistem library Python sangat luas, tetapi kamu tidak perlu menguasai semuanya sekaligus. Kuncinya adalah memahami peran setiap library dalam workflow AI dan memilih yang sesuai dengan kebutuhan tahap saat ini. Pada modul ini, NumPy dan Pandas adalah dua library yang akan kita gunakan secara langsung—sisanya akan muncul secara alami di modul-modul berikutnya. Yang terpenting: library adalah alat, bukan tujuan. Memahami data dan masalah yang ingin diselesaikan jauh lebih penting daripada menghafal API library.

#### Persiapan Chapter Berikutnya

Kita mulai dari NumPy untuk memahami operasi pada sekumpulan angka.

* * * * *

### Chapter 13 — NumPy: Komputasi Numerik dalam Array

#### Learning Objectives

-   Membuat NumPy array dan membaca `shape`.
-   Melakukan operasi vectorized sederhana.
-   Menghitung statistik sambil menangani `NaN`.

#### Kenapa Materi Ini Penting?

Dalam workflow data, kamu sering perlu melakukan operasi yang sama pada sekumpulan angka: menghitung rata-rata, mencari nilai tertinggi, atau menormalisasi data ke skala tertentu. Dengan list Python biasa, operasi semacam itu membutuhkan loop manual yang panjang dan rawan error. NumPy array menyediakan cara yang lebih ringkas dan lebih cepat—dengan operasi vectorized, satu baris kode dapat menggantikan satu blok loop.

Perbedaan kecepatan juga signifikan untuk dataset berukuran sedang ke besar. Operasi pada array NumPy dijalankan dalam kode C di belakang layar, bukan dalam Python loop yang lambat. Pada modul ini dataset yang kita pakai masih kecil, jadi perbedaan kecepatan mungkin tidak terasa. Namun kebiasaan menulis operasi vectorized akan sangat berguna ketika kamu mulai menangani dataset ribuan atau jutaan baris.

Selain kecepatan, array NumPy juga memberikan informasi struktur data melalui shape dan dtype. Informasi ini berguna untuk memvalidasi apakah data yang akan diproses memiliki bentuk yang diharapkan—misalnya 100 baris dan 5 kolom—sebelum operasi dilakukan.

#### Hubungan dengan AI

Data numerik dalam workflow AI hampir selalu direpresentasikan sebagai array—baik itu satu dimensi (vektor fitur), dua dimensi (tabel), atau dimensi lebih tinggi (tensor gambar). NumPy adalah fondasi untuk representasi ini. Library seperti Pandas menggunakan NumPy di dalamnya; Scikit-learn dan PyTorch juga menerima dan mengembalikan array NumPy.

Pada chapter ini kita tidak membahas tensor, model, atau machine learning. Fokusnya adalah pada cara berpikir data berdimensi: apa artinya suatu data memiliki shape (5,), (3, 4), atau (2, 3, 4)? Bagaimana operasi diterapkan pada seluruh elemen tanpa menulis loop? Pemahaman ini akan langsung berguna ketika nanti kamu bekerja dengan dataset yang lebih besar dan kompleks.

#### Analogi

List Python seperti kotak campuran yang bisa berisi angka, teks, dan benda lain secara bersamaan. Setiap kali kamu ingin menjumlahkan semua angka, kamu harus mengambil satu per satu secara manual. NumPy array seperti rak angka yang rapi: semua elemen memiliki tipe yang sama, tersusun dalam baris dan kolom yang jelas, dan kamu bisa memberi perintah seperti "jumlahkan semua" atau "kalikan setiap elemen dengan 2" tanpa harus menyentuh setiap kotak satu per satu.

Rak yang rapi ini juga memberitahu bentuknya melalui shape—apakah rak itu barisan panjang (vektor), persegi panjang (matriks), atau balok tiga dimensi (tensor). Informasi bentuk ini penting agar kamu tidak mencoba menjumlahkan rak yang tidak cocok ukurannya.

#### Penjelasan Konsep

**Array dan Shape.** NumPy array dibuat dari list Python dengan `np.array()`. Setiap array memiliki **shape** yang menunjukkan ukuran pada setiap dimensi: (5,) berarti array 1 dimensi dengan 5 elemen, (3, 4) berarti 3 baris dan 4 kolom. Shape adalah properti yang paling sering diperiksa karena operasi antar-array biasanya mensyaratkan shape yang kompatibel.

**Operasi Vectorized.** Alih-alih menulis loop untuk menjumlahkan setiap elemen, kamu cukup menulis `scores + 5` dan seluruh elemen akan ditambah 5 secara otomatis. Operasi vectorized berlaku untuk penjumlahan, pengurangan, perkalian, pembagian, perbandingan, dan fungsi matematika. Keuntungan utamanya adalah kode lebih pendek, lebih mudah dibaca, dan dieksekusi lebih cepat.

**Missing Value: NaN.** Dalam dataset nyata, hampir selalu ada nilai yang hilang. NumPy merepresentasikannya sebagai `np.nan` (Not a Number). Fungsi statistik biasa seperti `np.mean()` akan menghasilkan NaN jika ada satu saja nilai yang hilang. Untuk itu NumPy menyediakan fungsi nan-aware seperti `np.nanmean()`, `np.nansum()`, dan `np.nanstd()` yang secara otomatis mengabaikan NaN. Namun penting untuk diingat: mengabaikan NaN bukan berarti data yang hilang tidak penting. Kamu tetap perlu bertanya mengapa data tersebut hilang dan apakah penghilangannya memengaruhi kesimpulan.

**Boolean Masking.** Kamu dapat memilih elemen array berdasarkan kondisi, misalnya `scores[scores > 75]` untuk mengambil semua nilai di atas 75. Hasilnya adalah array baru yang hanya berisi elemen yang memenuhi kondisi. Teknik ini sangat berguna untuk filtering data tanpa loop.

#### Visual Thinking

    [[80, 90, 70],
     [88, 92, 84]]  → shape (2, 3)
       2 peserta, 3 penilaian

#### Contoh Nyata

Seorang panitia memiliki daftar 200 nilai peserta dalam format list Python. Ia ingin mengetahui rata-rata nilai, nilai tertinggi dan terendah, serta standar deviasi. Dengan list biasa, ia harus menulis loop atau menggunakan fungsi built-in sum() dan len() yang terbatas. Dengan NumPy, ia cukup mengubah list menjadi array dan memanggil `np.mean()`, `np.min()`, `np.max()`, dan `np.std()`—semuanya dalam beberapa baris tanpa loop manual.

Jika ada beberapa nilai yang hilang dalam data, `np.nanmean()` tetap dapat menghitung rata-rata dari nilai yang tersedia. Namun panitia harus mencatat berapa banyak data yang hilang dan melaporkannya sebagai bagian dari hasil.

#### Contoh AI

Array NumPy adalah format data standar yang digunakan oleh library Machine Learning. Ketika Scikit-learn menerima data pelatihan, data tersebut biasanya berupa array NumPy dua dimensi dengan shape (n\_samples, n\_features). Ketika PyTorch menerima data untuk deep learning, data dikonversi menjadi tensor yang mirip dengan NumPy array dengan dukungan GPU. Pada chapter ini kita belum masuk ke model tersebut, tetapi setiap operasi array yang kamu praktikkan sekarang—shape, broadcasting, boolean masking—adalah keterampilan yang akan kamu gunakan setiap hari dalam workflow AI.

#### Kode Python

    import numpy as np

    scores = np.array([80.0, 90.0, np.nan, 70.0])
    average = np.nanmean(scores)
    valid_scores = scores[~np.isnan(scores)]
    scaled_scores = valid_scores / 100

    print(scores.shape)
    print(average)
    print(scaled_scores)

#### Penjelasan Kode Baris per Baris

1.  NumPy diimpor sebagai `np`.
2.  Array float dibuat; satu nilai hilang ditandai `np.nan`.
3.  `np.nanmean` menghitung rata-rata nilai valid.
4.  Boolean mask memilih elemen yang bukan NaN.
5.  Pembagian diterapkan ke seluruh nilai valid.
6.  Shape, rata-rata, dan hasil skala ditampilkan.

#### Common Mistakes

-   **Mencampur shape yang tidak kompatibel.** Menjumlahkan array (3,) dan (4,) akan menghasilkan error karena bentuknya berbeda. Selalu periksa shape dengan `.shape` sebelum operasi antar-array.
-   **Mengabaikan dtype.** Jika array berisi campuran integer dan float, NumPy akan memilih dtype yang bisa menampung keduanya. Jika tidak sadar akan hal ini, kamu bisa mendapatkan hasil yang tidak diharapkan—misalnya pembagian integer yang menghasilkan angka bulat alih-alih desimal.
-   **Menghapus NaN tanpa memahami penyebab.** `np.isnan()` dan `np.nan_to_num()` memang mudah dipakai, tetapi menghapus atau mengganti NaN tanpa investigasi dapat menghilangkan informasi penting. Cari tahu dulu mengapa data hilang.

#### Best Practices

-   **Periksa `shape` dan `dtype`.** Sebelum operasi apa pun, ketahui bentuk dan tipe data array-mu. Ini mencegah error yang tidak terduga dan membantu memahami struktur data.
-   **Tentukan kebijakan missing value secara eksplisit.** Putuskan sejak awal: apakah NaN akan diabaikan, diisi dengan nilai tertentu, atau menyebabkan baris tersebut dibuang? Dokumentasikan keputusan ini.
-   **Gunakan operasi vectorized yang tetap mudah dibaca.** Operasi vectorized memang ringkas, tetapi jika satu baris kode terlalu padat hingga sulit dipahami, pecah menjadi beberapa baris yang lebih jelas. Keterbacaan tetap prioritas.

#### Mini Challenge

Buat array lima nilai termasuk satu `np.nan`. Tampilkan jumlah data valid, minimum, maksimum, dan rata-rata valid.

#### Ringkasan

NumPy adalah fondasi komputasi numerik dalam ekosistem Python AI. Array-nya menyediakan struktur data yang efisien, operasi vectorized yang ringkas, dan fungsi statistik yang menangani missing value. Tiga konsep utama yang perlu diingat: shape menentukan dimensi data, vectorized operation menggantikan loop manual, dan NaN adalah sinyal yang perlu diinvestigasi—bukan sekadar angka yang dibuang. Pemahaman ini akan langsung berguna ketika kamu mulai menggunakan Pandas di chapter berikutnya.

#### Persiapan Chapter Berikutnya

Array kuat untuk angka; Pandas menambahkan nama kolom dan baris agar data tabular lebih mudah dipahami.

* * * * *

## Chapter 8 — Modularitas: Lambda dan Generator

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/08-full.html`

### Chapter 8 — Modularitas: Lambda dan Generator

#### Learning Objectives

-   Memahami penggunaan lambda yang tepat.
-   Membuat generator sederhana dengan `yield`.
-   Memilih keterbacaan daripada kode yang terlalu ringkas.

#### Kenapa Materi Ini Penting?

Data dapat berjumlah besar. Kita perlu cara menulis transformasi singkat dan memproses data bertahap tanpa selalu memuat semuanya ke memori.

#### Hubungan dengan AI

Lambda sering dipakai sebagai fungsi kecil saat sorting atau transformasi. Generator dapat mengalirkan record dataset satu per satu.

#### Analogi

List seperti membawa seluruh galon sekaligus; generator seperti keran yang mengalirkan air saat dibutuhkan.

#### Penjelasan Konsep

Lambda cocok untuk ekspresi singkat yang mudah dibaca. Jika memiliki kondisi rumit, gunakan `def`. Generator memakai `yield`, menghentikan sementara function, lalu melanjutkan saat nilai berikutnya diminta.

#### Visual Thinking

    File besar → record 1 → record 2 → record 3 → ...
                  generator mengirim satu per satu

#### Contoh Nyata

Urutkan peserta berdasarkan score menggunakan key function.

#### Contoh AI

Dataset besar sering dibaca per batch atau per record agar penggunaan memori terkendali.

#### Kode Python

    participants = [
        {"name": "Ayu", "score": 88},
        {"name": "Nisa", "score": 91},
    ]

    ranked = sorted(participants, key=lambda item: item["score"], reverse=True)


    def stream_names(items):
        for item in items:
            yield item["name"]


    for name in stream_names(ranked):
        print(name)

#### Penjelasan Kode Baris per Baris

1.  List menyimpan dua record.
2.  Lambda memberi tahu `sorted()` field yang digunakan.
3.  `reverse=True` mengurutkan dari tinggi ke rendah.
4.  Generator menerima collection.
5.  `yield` mengirim satu nama pada satu waktu.
6.  Loop meminta dan menampilkan setiap nama.

#### Common Mistakes

-   Membuat lambda panjang dan sulit dibaca.
-   Mengira generator dapat diulang setelah habis tanpa dibuat ulang.
-   Mengubah semua function menjadi generator tanpa kebutuhan.

#### Best Practices

-   Batasi lambda pada satu ekspresi jelas.
-   Pakai `def` untuk logika bernama atau kompleks.
-   Gunakan generator ketika aliran data atau memori memang relevan.

#### Mini Challenge

Buat generator yang hanya menghasilkan score valid dari list yang mengandung `None`.

#### Ringkasan

Lambda membantu operasi kecil; generator membantu aliran data bertahap. Keduanya berguna jika tidak mengorbankan keterbacaan.

#### Persiapan Chapter Berikutnya

Selanjutnya kita melihat bagaimana data dan perilaku dapat dibungkus dalam object sederhana.

* * * * *

## Chapter 14 — Pandas: Membaca dan Membersihkan Data Tabular

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/08-topic.html`

### Chapter 14 — Pandas: Membaca dan Membersihkan Data Tabular

#### Learning Objectives

-   Membuat dan membaca DataFrame.
-   Memeriksa, memilih, memfilter, dan membersihkan data.
-   Melakukan agregasi sederhana dan menyimpan CSV.

#### Kenapa Materi Ini Penting?

Sebagian besar waktu dalam project data—hingga 80% menurut berbagai survei—dihabiskan untuk memahami, membersihkan, dan mempersiapkan data, bukan untuk membangun model. Pandas adalah library paling populer di Python untuk tugas ini. Ia menyediakan struktur DataFrame yang menggabungkan kekuatan array NumPy dengan kemudahan nama kolom dan baris, serta metode bawaan untuk membaca, memfilter, membersihkan, merangkum, dan menyimpan data tabular.

Setelah mempelajari variabel, collection, control flow, function, dan NumPy, kamu sekarang memiliki semua fondasi yang diperlukan untuk menggunakan Pandas secara efektif. Pandas tidak menggantikan konsep-konsep tersebut—ia membangun di atasnya. DataFrame pada dasarnya adalah koleksi array NumPy yang diberi label, dan operasi di dalamnya menggunakan prinsip vectorized yang sama.

Yang membedakan Pandas dari NumPy adalah kemampuan untuk bekerja dengan data heterogen: satu kolom bisa berisi angka, kolom lain teks, kolom lain tanggal. NumPy tidak bisa melakukan itu karena semua elemen dalam array harus memiliki tipe yang sama. Pandas bisa, dan inilah yang membuatnya sangat berguna untuk data dunia nyata.

#### Hubungan dengan AI

Model AI hanya dapat belajar dari data yang diberikan. Jika data mengandung nilai kosong yang tidak terdeteksi, duplikat yang tidak sengaja menggandakan bobot record tertentu, atau kolom dengan tipe yang salah, hasil model akan menyesatkan—bukan karena modelnya buruk, tetapi karena datanya tidak siap. Pandas adalah alat untuk menemukan dan menangani masalah-masalah ini sebelum data masuk ke tahap model.

Pada modul ini kita belum masuk ke machine learning. Tapi pipeline cleaning yang kamu bangun dengan Pandas adalah tahap yang selalu mendahului model apa pun. Semakin rapi pipeline cleaning-mu, semakin sedikit waktu yang terbuang untuk debugging di tahap modeling nanti.

#### Analogi

DataFrame seperti spreadsheet Excel atau Google Sheets yang dapat diberi instruksi melalui kode. Kamu bisa membaca file, memilih kolom tertentu, memfilter baris berdasarkan kondisi, mengisi nilai kosong, menghitung rata-rata per kelompok, dan menyimpan hasilnya—semuanya dalam script yang dapat dijalankan ulang kapan saja. Berbeda dengan spreadsheet yang diklik manual, script Pandas dapat diulang pada data baru tanpa khawatir ada langkah yang terlewat.

Perbedaan lain: spreadsheet menyembunyikan proses di balik sel dan formula yang tersebar. Pandas memaksa setiap langkap ditulis secara eksplisit dalam kode. Ini membuat proses lebih transparan dan mudah diaudit.

#### Penjelasan Konsep

**DataFrame** adalah struktur data dua dimensi dengan baris dan kolom. Setiap kolom memiliki nama (label) dan tipe data yang bisa berbeda antar-kolom. Kamu bisa membayangkan DataFrame sebagai spreadsheet yang berada di dalam memori komputer, siap diproses tanpa harus membuka aplikasi spreadsheet.

**Membaca Data.** `pd.read_csv()` adalah fungsi yang paling sering digunakan untuk membaca file CSV ke dalam DataFrame. Fungsi ini secara otomatis mendeteksi baris header, tipe data setiap kolom, dan menangani berbagai format delimiter. Untuk file Excel, ada `pd.read_excel()`, dan untuk JSON ada `pd.read_json()`.

**Memahami Data.** Setelah data dibaca, langkah pertama adalah memahami strukturnya. `df.head()` menampilkan beberapa baris pertama, `df.info()` menunjukkan tipe data dan jumlah non-null per kolom, `df.describe()` memberikan statistik ringkas untuk kolom numerik. Ketiganya adalah panggilan pertama yang hampir selalu dilakukan dalam sesi eksplorasi data.

**Boolean Filtering.** Dengan NumPy kamu sudah belajar boolean masking. Di Pandas konsepnya sama: `df[df["score"] >= 75]` memilih semua baris yang memenuhi kondisi. Hasilnya adalah DataFrame baru yang hanya berisi baris-baris terpilih. Filter dapat dikombinasikan dengan operator \>, \<, ==, dan logika AND (&) serta OR (|).

**Missing Value.** `df.isna().sum()` menghitung jumlah missing value per kolom. `fillna()` mengisi nilai kosong dengan nilai tertentu, sementara `dropna()` membuang baris yang mengandung NaN. Pilihan antara mengisi atau membuang harus didasarkan pada alasan yang jelas, bukan sekadar agar tidak error.

**Agregasi.** `df.groupby("track")["score"].mean()` mengelompokkan baris berdasarkan kolom "track", lalu menghitung rata-rata score di setiap kelompok. Hasilnya adalah Series (satu kolom) dengan track sebagai index. Groupby adalah operasi yang sangat sering digunakan untuk merangkum data per kategori.

**Menyimpan Hasil.** `df.to_csv("output.csv", index=False)` menyimpan DataFrame ke file CSV. Parameter index=False mencegah baris index ikut tersimpan sebagai kolom tambahan.

#### Visual Thinking

    CSV → read → inspect → clean → validate → summarize → save

#### Contoh Nyata

Kolom nilai berisi satu data kosong dan track peserta perlu dibandingkan.

#### Contoh AI

Cleaning yang konsisten menghasilkan dataset yang lebih siap untuk tahap analisis atau model pada modul berikutnya.

#### Kode Python

    import pandas as pd

    data = {
        "name": ["Ayu", "Nisa", "Rani", "Sari"],
        "track": ["data", "data", "product", "product"],
        "score": [88, 91, None, 76],
    }

    df = pd.DataFrame(data)
    df["score"] = df["score"].fillna(df["score"].median())
    passed = df[df["score"] >= 75]
    summary = df.groupby("track")["score"].mean()

    passed.to_csv("participants_clean.csv", index=False)
    print(summary)

#### Penjelasan Kode Baris per Baris

1.  Pandas diimpor sebagai `pd`.
2.  Dictionary menyediakan data kolom.
3.  `DataFrame` mengubahnya menjadi tabel.
4.  Missing score diisi median sebagai keputusan contoh; pada data nyata keputusan harus dibenarkan.
5.  Boolean filter memilih nilai minimal 75.
6.  `groupby` menghitung rata-rata per track.
7.  Data bersih disimpan tanpa index tambahan.
8.  Ringkasan ditampilkan.

#### Common Mistakes

-   **Mengubah data tanpa memeriksa salinan raw.** Setelah data dibersihkan, kamu tidak bisa kembali ke kondisi awal jika tidak menyimpan salinan. Selalu simpan raw data terpisah.
-   **Mengisi semua missing value dengan nol.** Nol adalah nilai yang memiliki makna. Jika score 0 berarti "tidak mengerjakan" dan score yang hilang berarti "belum dinilai", keduanya adalah kasus berbeda yang memerlukan penanganan berbeda.
-   **Mengabaikan tipe data dan duplikat.** Kolom score yang terbaca sebagai object (string) tidak dapat dijumlahkan. Kolom duplikat dapat menyebabkan bias agregasi. Periksa kedua hal ini di awal.
-   **Menganggap hasil agregasi membuktikan sebab-akibat.** Rata-rata score track data lebih tinggi dari track product belum berarti track data lebih mudah. Bisa jadi peserta yang masuk track data memang sudah memiliki skor awal lebih tinggi.

#### Best Practices

-   **Mulai dengan `head()`, `shape`, `info()`, dan pemeriksaan missing value.** Jangan pernah melewati langkah inspeksi awal. Memahami data sebelum membersihkannya adalah aturan nomor satu.
-   **Dokumentasikan setiap keputusan cleaning.** Catat mengapa suatu baris dihapus, mengapa missing value diisi dengan median, dan transformasi apa yang dilakukan. Dokumentasi ini penting untuk audit dan reproduksi.
-   **Simpan output ke file baru.** Jangan pernah menimpa file raw. Gunakan nama file yang berbeda, misalnya `participants_clean.csv`.
-   **Validasi jumlah baris sebelum dan sesudah transformasi.** Pastikan jumlah baris yang hilang dapat dijelaskan: raw = clean + duplicate + missing + invalid + out-of-range.

#### Mini Challenge

Tambahkan satu record duplikat. Deteksi dengan `duplicated()`, hapus dengan `drop_duplicates()`, lalu bandingkan jumlah baris.

#### Ringkasan

Pandas adalah alat utama untuk data tabular dalam ekosistem Python AI. DataFrame menggabungkan kekuatan array NumPy dengan label kolom dan baris, serta menyediakan metode bawaan untuk membaca, memfilter, membersihkan, merangkum, dan menyimpan data. Empat langkah utama yang selalu diingat: inspeksi (head, info, describe), pembersihan (missing value, duplikat, tipe data), analisis (filter, groupby, agregasi), dan penyimpanan (to\_csv dengan file baru). Setiap keputusan cleaning harus didokumentasikan agar pipeline dapat diaudit dan diulang.

#### Persiapan Chapter Berikutnya

Sekarang kita menggabungkan seluruh fondasi menjadi satu mini workflow data berorientasi AI.

* * * * *

### Chapter 15 — Mini AI Workflow: Dataset Nilai Peserta

#### Learning Objectives

-   Menghubungkan file, Pandas, NumPy, function, loop, dan error handling.
-   Memisahkan tahap load, clean, summarize, dan save.
-   Menghasilkan laporan yang dapat digunakan tahap AI berikutnya.

#### Kenapa Materi Ini Penting?

Konsep baru menjadi keterampilan saat dipakai bersama. Chapter ini bukan project Machine Learning; ini simulasi tahap data yang selalu mendahuluinya. Setiap function, loop, penanganan error, operasi NumPy, dan Pandas yang telah kamu pelajari akan dirangkai menjadi satu pipeline yang dapat dijalankan dari awal hingga akhir.

Pipeline ini bukan sekadar latihan. Pola load → validate → clean → summarize → save adalah pola yang akan kamu temui di hampir setiap project data. Perbedaannya hanya pada skala dan kompleksitas data. Jika kamu bisa menulis pipeline kecil yang rapi, kamu sudah memiliki fondasi untuk membangun pipeline yang melayani ribuan baris data.

#### Hubungan dengan AI

    CSV
     ↓
    Pandas: load & cleaning
     ↓
    NumPy: numeric summary
     ↓
    Function: repeatable pipeline
     ↓
    Validation & visualization-ready output
     ↓
    Clean dataset untuk modul model berikutnya

#### Analogi

Menyiapkan data seperti menyiapkan bahan sebelum memasak. Model secanggih apa pun tidak memperbaiki bahan yang salah label atau tercampur data rusak.

#### Penjelasan Konsep

Workflow yang baik memiliki lima komponen: input yang jelas (dari mana data berasal), aturan transformasi yang eksplisit (bagaimana data diubah), validation checkpoint (apakah data memenuhi syarat sebelum lanjut), output yang terpisah dari raw (data bersih disimpan sebagai file baru), dan catatan perubahan (berapa baris hilang dan mengapa). Tanpa kelima komponen ini, pipeline sulit diaudit dan sulit diulang dengan data baru.

Yang paling penting: raw data tidak boleh ditimpa. Setiap transformasi menghasilkan data turunan, bukan data pengganti. Jika kesalahan dalam cleaning baru diketahui minggu depan, kamu masih bisa kembali ke data mentah dan mengulang proses dari awal.

#### Visual Thinking

    participants.csv
      ├─ schema benar?
      ├─ missing?
      ├─ duplicate?
      ├─ range score valid?
      └─ output → participants_clean.csv + report.txt

#### Contoh Nyata

Panitia menerima file CSV berisi data 200 peserta dengan kolom name, track, dan score. Mereka menemukan beberapa baris duplikat, beberapa nilai score kosong, dan satu nilai yang berada di luar range 0–100. Mereka ingin: (1) dataset bersih tanpa duplikat dan nilai invalid, (2) laporan statistik yang mencakup rata-rata, minimum, maksimum, dan jumlah peserta per track, serta (3) file CSV baru yang siap digunakan untuk tahap analisis berikutnya.

Pipeline yang akan kamu bangun di chapter ini menyelesaikan ketiga kebutuhan tersebut secara terprogram. Setelah pipeline selesai, panitia cukup menjalankan satu script untuk mendapatkan hasil yang konsisten setiap kali ada data baru.

#### Contoh AI

Output bersih dari pipeline ini adalah kandidat input bagi workflow Machine Learning di modul berikutnya. Meskipun belum ada model yang dibangun di sini, setiap baris yang lolos validasi adalah baris yang dapat dipercaya untuk digunakan dalam pelatihan atau evaluasi model nanti. Kebiasaan memvalidasi data sebelum masuk ke model adalah salah satu keterampilan paling penting dalam engineering AI.

#### Kode Python

    from pathlib import Path

    import numpy as np
    import pandas as pd


    REQUIRED_COLUMNS = {"name", "track", "score"}


    def load_data(path):
        return pd.read_csv(path)


    def clean_data(df):
        missing_columns = REQUIRED_COLUMNS - set(df.columns)
        if missing_columns:
            raise ValueError(f"Kolom hilang: {sorted(missing_columns)}")

        clean = df.copy()
        clean = clean.drop_duplicates()
        clean["score"] = pd.to_numeric(clean["score"], errors="coerce")
        clean = clean.dropna(subset=["name", "track", "score"])
        clean = clean[clean["score"].between(0, 100)]
        return clean


    def build_report(df):
        scores = df["score"].to_numpy()
        return {
            "rows": len(df),
            "average": float(np.mean(scores)),
            "minimum": float(np.min(scores)),
            "maximum": float(np.max(scores)),
        }


    def run_pipeline(input_path, output_path):
        raw = load_data(input_path)
        clean = clean_data(raw)
        report = build_report(clean)
        clean.to_csv(output_path, index=False)
        return report


    try:
        summary = run_pipeline(
            Path("participants.csv"),
            Path("participants_clean.csv"),
        )
        print(summary)
    except FileNotFoundError:
        print("File participants.csv belum tersedia")
    except ValueError as error:
        print(f"Data tidak valid: {error}")

#### Penjelasan Kode Baris per Baris

1.  Import menyediakan path, komputasi numerik, dan tabel.
2.  `REQUIRED_COLUMNS` mendefinisikan schema minimum.
3.  `load_data` hanya bertanggung jawab membaca CSV.
4.  `clean_data` memeriksa kolom, menyalin data, menghapus duplikat, mengubah score menjadi angka, membuang record tidak lengkap, dan membatasi range.
5.  `build_report` mengubah kolom score menjadi array dan menghitung statistik.
6.  `run_pipeline` menghubungkan tahap secara berurutan lalu menyimpan file baru.
7.  Blok `try` menjalankan workflow dan menangani file hilang atau schema buruk secara jelas.

#### Common Mistakes

-   Menimpa raw dataset.
-   Cleaning tanpa mencatat jumlah baris yang hilang.
-   Menggabungkan semua tahap dalam satu function.
-   Menganggap pipeline sukses hanya karena tidak error.

#### Best Practices

-   Pisahkan function berdasarkan tanggung jawab.
-   Validasi schema dan range.
-   Simpan raw dan clean data terpisah.
-   Tambahkan test kecil untuk setiap function.
-   Laporkan perubahan dan asumsi cleaning.

#### Mini Challenge

Tambahkan kolom `status` menggunakan function, hitung jumlah peserta per track, dan simpan ringkasan sebagai CSV kedua.

#### Ringkasan

Mini workflow ini adalah puncak dari seluruh modul Python untuk AI. Semua konsep yang telah dipelajari—variabel dan tipe data, collection, control flow, function, OOP, error handling, file I/O, NumPy, dan Pandas—dirangkai menjadi satu pipeline yang utuh. Pola load → validate → clean → summarize → save adalah pola universal yang akan kamu temui di hampir setiap project data.

Tiga prinsip utama dari workflow ini: (1) pisahkan tanggung jawab ke dalam function yang terfokus, (2) jangan pernah menimpa raw data, dan (3) dokumentasikan setiap keputusan cleaning agar pipeline dapat diaudit dan diulang. Jika ketiga prinsip ini kamu pegang, pipeline data yang kamu bangun akan dapat dipercaya oleh tim dan dapat dikembangkan untuk menangani dataset yang lebih besar dan kompleks.

#### Persiapan Chapter Berikutnya

Kamu siap masuk ke practice, quiz, dan diskusi sebelum melanjutkan ke konsep AI dan Machine Learning.

* * * * *

### Practice — Python sebagai Workflow Data

Kerjakan bertahap. Setiap latihan menghasilkan komponen untuk project akhir.

#### Latihan 1 — Input, Process, Output

Rancang IPO untuk menghitung completion rate peserta. Sertakan kasus data kosong.

#### Latihan 2 — Metadata Dataset

Buat variabel nama dataset, versi, jumlah baris, persentase missing value, dan status review.

#### Latihan 3 — Record Peserta

Buat list berisi minimal lima dictionary peserta dengan field `name`, `track`, dan `score`.

#### Latihan 4 — Validasi dengan Control Flow

Loop seluruh record. Tandai score kosong, di luar 0–100, lulus, atau perlu review.

#### Latihan 5 — Function Pipeline

Buat function `validate_score`, `classify_score`, dan `summarize_scores`. Uji boundary 0, 74.9, 75, 100, `None`, dan teks.

#### Latihan 6 — Generator

Buat generator yang menghasilkan hanya record valid satu per satu.

#### Latihan 7 — Object dan Error

Buat class `DatasetReport` sederhana yang menyimpan nama dataset dan summary. Tangani input yang salah.

#### Latihan 8 — File

Simpan dataset kecil ke CSV atau siapkan file manual, lalu baca kembali tanpa menimpa raw file.

#### Latihan 9 — NumPy

Hitung jumlah data valid, rata-rata, median, minimum, maksimum, dan nilai yang sudah dibagi 100.

#### Latihan 10 — Pandas

Baca CSV, periksa shape dan missing value, hapus duplikat, perbaiki tipe score, filter range, agregasi per track, dan simpan output.

#### Latihan 11 — Audit Cleaning

Buat laporan jumlah baris raw, duplicate, invalid, missing, dan clean. Pastikan angka dapat direkonsiliasi.

#### Latihan 12 — Workflow Utuh

Gabungkan tahap load, validate, clean, summarize, dan save dalam function terpisah. Tambahkan pesan error yang dapat ditindaklanjuti.

* * * * *

### Mini Project — Analisis Dataset Nilai Workshop AI

#### Skenario

Tim HerAI menerima file nilai peserta. File tersebut memiliki data kosong, duplikat, dan score yang mungkin berada di luar range. Tim membutuhkan dataset bersih dan laporan sebelum data dipakai pada modul analisis berikutnya.

#### Deliverables

1.  `participants.csv` sebagai raw input.
2.  Notebook atau file Python yang dapat dijalankan dari awal.
3.  `participants_clean.csv` tanpa menimpa raw data.
4.  `track_summary.csv` berisi jumlah peserta dan rata-rata per track.
5.  `report.txt` yang menjelaskan perubahan data.

#### Requirement

-   Gunakan minimal tiga function.
-   Gunakan Pandas untuk loading dan cleaning.
-   Gunakan NumPy untuk minimal dua statistik.
-   Tangani file hilang dan schema tidak lengkap.
-   Validasi score 0–100.
-   Deteksi duplikat dan missing value.
-   Tambahkan kolom status.
-   Jelaskan keputusan cleaning.

#### Rubrik (100 Poin)

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Dimensi
Bobot</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Computational thinking dan struktur workflow
20</td>
<td align="left">Kebenaran cleaning dan validation
25</td>
</tr>
</tbody>
</table>

#### Refleksi Project

-   Baris mana yang berubah atau hilang, dan mengapa?
-   Apa risiko jika missing score langsung diisi nol?
-   Bagian mana yang harus konsisten ketika workflow menerima dataset baru?
-   Mengapa data bersih belum otomatis berarti data adil atau representatif?

* * * * *

### Quiz — 20 Soal

#### Soal 1

Peran Python dalam workflow AI paling tepat adalah...

A. AI itu sendiri
B. Bahasa yang menghubungkan data, library, eksperimen, dan aplikasi
C. Hanya kalkulator
D. Pengganti dataset

**Jawaban: B.**

#### Soal 2

Kapan notebook lebih cocok daripada file `.py`?

A. Eksplorasi bertahap dengan kode dan catatan
B. Semua production service
C. Menyimpan password
D. Menggantikan virtual environment

**Jawaban: A.**

#### Soal 3

Fungsi utama virtual environment adalah...

A. Membuat GPU
B. Mengisolasi dependency project
C. Membersihkan dataset
D. Menghapus Python

**Jawaban: B.**

#### Soal 4

Dalam IPO, menghitung rata-rata termasuk...

A. Input
B. Process
C. Output
D. Package

**Jawaban: B.**

#### Soal 5

Tipe data yang tepat untuk prompt adalah...

A. `str`
B. `int`
C. `bool`
D. `set`

**Jawaban: A.**

#### Soal 6

Struktur yang paling menyerupai object JSON adalah...

A. Tuple
B. Dictionary
C. Set
D. Float

**Jawaban: B.**

#### Soal 7

Mengapa `score is None` diperiksa sebelum `score >= 75`?

A. Agar kode lebih panjang
B. `None` tidak dapat dibandingkan dengan angka
C. Semua score adalah None
D. Python selalu mengubah None menjadi nol

**Jawaban: B.**

#### Soal 8

Perbedaan utama `return` dan `print` adalah...

A. Tidak ada
B. `return` mengirim nilai ke pemanggil, `print` hanya menampilkan
C. `print` lebih aman
D. `return` hanya untuk string

**Jawaban: B.**

#### Soal 9

Kapan lambda sebaiknya digunakan?

A. Untuk logika panjang
B. Untuk ekspresi singkat dan jelas
C. Untuk menangani semua error
D. Untuk membuka file

**Jawaban: B.**

#### Soal 10

Keuntungan generator adalah...

A. Selalu lebih cepat untuk semua kasus
B. Menghasilkan nilai bertahap saat dibutuhkan
C. Menyimpan semua data dua kali
D. Menggantikan Pandas

**Jawaban: B.**

#### Soal 11

Dalam OOP, object adalah...

A. Blueprint
B. Instance dari class
C. Error
D. Package

**Jawaban: B.**

#### Soal 12

Praktik exception handling terbaik adalah...

A. Menangkap semua error dan diam
B. Menangkap exception spesifik dan memberi pesan jelas
C. Tidak pernah memakai try
D. Melanjutkan data rusak

**Jawaban: B.**

#### Soal 13

Mengapa menggunakan `with` saat membuka file?

A. File ditutup otomatis
B. File menjadi AI
C. Tidak perlu path
D. Semua error hilang

**Jawaban: A.**

#### Soal 14

Library yang fokus pada data tabular adalah...

A. OpenCV
B. Pandas
C. Matplotlib
D. pathlib

**Jawaban: B.**

#### Soal 15

`scores.shape` pada NumPy menjelaskan...

A. Nama file
B. Dimensi array
C. Missing value
D. Versi Python

**Jawaban: B.**

#### Soal 16

Apa fungsi `np.nanmean()`?

A. Menghapus file
B. Menghitung mean sambil mengabaikan NaN
C. Mengisi semua NaN dengan nol
D. Membuat DataFrame

**Jawaban: B.**

#### Soal 17

Langkah pertama setelah membaca CSV sebaiknya...

A. Langsung membangun model
B. Memeriksa shape, kolom, tipe, missing value, dan contoh baris
C. Menghapus semua baris
D. Menimpa file

**Jawaban: B.**

#### Soal 18

Mengapa missing score tidak selalu diisi nol?

A. Nol tidak ada di Python
B. Nol memiliki makna dan dapat mengubah statistik
C. Pandas tidak mendukung nol
D. CSV tidak mendukung angka

**Jawaban: B.**

#### Soal 19

`groupby("track")["score"].mean()` digunakan untuk...

A. Menghapus track
B. Menghitung rata-rata score per track
C. Membuat virtual environment
D. Mengubah score menjadi string

**Jawaban: B.**

#### Soal 20

Mengapa raw dataset tidak boleh ditimpa?

A. Agar transformasi dapat diaudit dan diulang
B. Agar folder lebih banyak
C. Karena Pandas tidak bisa menulis
D. Agar model lebih kompleks

**Jawaban: A.**

* * * * *

### Discussion

#### Diskusi 1 — Python sebagai Bahasa AI

Mengapa Python menjadi dominan dalam AI meskipun bukan selalu bahasa tercepat? Pertimbangkan keterbacaan, ekosistem, komunitas, eksperimen, dan integrasi.

#### Diskusi 2 — Notebook vs Program

Kapan notebook membantu pembelajaran dan eksplorasi? Kapan urutan cell tersembunyi, kode duplikat, atau state yang tidak jelas menjadi risiko?

#### Diskusi 3 — Cleaning adalah Keputusan

Apakah menghapus missing value selalu benar? Siapa yang seharusnya menentukan aturan cleaning, dan bukti apa yang diperlukan?

#### Diskusi 4 — Siap untuk Machine Learning?

Sebuah dataset sudah tidak memiliki nilai kosong. Apakah otomatis siap digunakan? Bahas duplikat, salah label, representasi kelompok, data leakage, range, dan relevansi fitur tanpa masuk ke algoritma model.

#### Prompt Refleksi Utama

Setelah mempelajari Python, bagian mana yang paling mengubah cara kamu melihat AI: sintaks, struktur data, function, atau workflow data? Jelaskan mengapa kemampuan memahami data mungkin lebih penting daripada menghafal banyak library.

* * * * *

### Checklist Kesiapan Peserta

-   Saya dapat menjelaskan input, process, dan output.
-   Saya dapat menjalankan Python di environment terisolasi atau Colab.
-   Saya memahami variable, collection, control flow, dan function.
-   Saya dapat membaca error dan menangani kegagalan umum.
-   Saya dapat membaca file tanpa menimpa raw data.
-   Saya dapat menjelaskan peran NumPy dan Pandas.
-   Saya dapat memeriksa shape, tipe, missing value, duplikat, dan range.
-   Saya dapat memecah workflow menjadi function kecil.
-   Saya dapat menjelaskan setiap keputusan cleaning.
-   Saya memahami bahwa Python adalah alat untuk workflow AI, bukan AI itu sendiri.

### Jembatan ke Modul Berikutnya

Fondasi ini mempersiapkan peserta untuk:

-   **Konsep AI Modern:** memahami bagaimana komponen AI bekerja dalam sistem.
-   **Math for AI:** merepresentasikan operasi numerik melalui array.
-   **Machine Learning:** menyiapkan data dan menggunakan API library secara sadar.
-   **Prompt Engineering:** memperlakukan prompt sebagai data dan membangun eksperimen terstruktur.
-   **LLM dan AI Agent:** mengorkestrasi input, function, tool, state, dan output.

### Catatan Desain Kurikulum

Modul ini sengaja tidak mengajarkan Neural Network, tensor, gradient, optimizer, Transformer, Attention, algoritma Machine Learning, RAG, atau AI Agent. Nama library lanjutan hanya dikenalkan sebagai peta perjalanan. Kompetensi inti modul adalah computational thinking, Python fundamentals, dan workflow data yang kuat.

## Chapter 9 — Object-Oriented Programming Dasar

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/09-full.html`

### Chapter 9 — Object-Oriented Programming Dasar

#### Learning Objectives

-   Memahami class, object, attribute, dan method.
-   Membuat class kecil dengan tanggung jawab jelas.
-   Mengetahui kapan OOP tidak diperlukan.

#### Kenapa Materi Ini Penting?

Saat program bertambah, data dan function yang saling terkait perlu diorganisasi. OOP adalah salah satu cara, bukan satu-satunya cara.

#### Hubungan dengan AI

Banyak library menggunakan object: dataset, transformer data, model, atau evaluator. Memahami object membantu membaca API library nanti.

#### Analogi

Class adalah blueprint formulir peserta; object adalah satu formulir yang sudah berisi data Ayu.

#### Penjelasan Konsep

-   **Class:** blueprint.
-   **Object:** instance.
-   **Attribute:** data milik object.
-   **Method:** perilaku object.
-   `self`: object aktif.

#### Visual Thinking

    Participant (class)
    ├── name, score (attributes)
    └── status() (method)

#### Contoh Nyata

Setiap peserta memiliki nama, nilai, dan aturan status yang sama.

#### Contoh AI

Library sering menawarkan pola `object.fit()` atau `object.transform()`. Kita belum mempelajari modelnya, hanya pola interaksi object.

#### Kode Python

    class Participant:
        def __init__(self, name, score):
            self.name = name
            self.score = score

        def status(self):
            return "pass" if self.score >= 75 else "review"


    ayu = Participant("Ayu", 88)
    print(ayu.status())

#### Penjelasan Kode Baris per Baris

1.  `class Participant` membuat blueprint.
2.  `__init__` berjalan saat object dibuat.
3.  Attribute menyimpan nama dan score.
4.  Method `status` memakai data object.
5.  `ayu` adalah instance.
6.  Method dipanggil dengan titik.

#### Common Mistakes

-   Membuat class untuk satu function sederhana.
-   Lupa `self`.
-   Menaruh terlalu banyak tanggung jawab dalam satu class.

#### Best Practices

-   Mulai dengan function; gunakan class jika data dan perilaku benar-benar menyatu.
-   Beri class satu peran jelas.
-   Hindari inheritance kompleks pada tahap pemula.

#### Mini Challenge

Tambahkan method `summary()` yang mengembalikan teks nama, nilai, dan status.

#### Ringkasan

OOP membantu mengorganisasi state dan perilaku, serta mempersiapkan peserta membaca API library AI.

#### Persiapan Chapter Berikutnya

Data dan file tidak selalu bersih. Berikutnya kita membuat program gagal dengan aman.

* * * * *

## Chapter 10 — Error Handling: Program yang Tahan Gangguan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/10-full.html`

### Chapter 10 — Error Handling: Program yang Tahan Gangguan

#### Learning Objectives

-   Membaca error sebagai informasi.
-   Menggunakan `try`, `except`, `else`, dan `finally`.
-   Menangkap exception secara spesifik.

#### Kenapa Materi Ini Penting?

Program data bertemu file hilang, teks di kolom angka, dan input kosong. Error handling bukan menyembunyikan masalah, melainkan meresponsnya dengan jelas.

#### Hubungan dengan AI

Pipeline data harus berhenti atau memberi fallback ketika input tidak valid. Data buruk yang diam-diam lolos dapat menghasilkan output yang menyesatkan.

#### Analogi

Sabuk pengaman tidak mencegah semua kecelakaan, tetapi mengurangi dampak ketika masalah terjadi.

#### Penjelasan Konsep

Kode berisiko ditempatkan dalam `try`. `except` menangani error tertentu. `else` berjalan jika tidak ada error. `finally` selalu berjalan, misalnya untuk menutup resource.

#### Visual Thinking

    Try process → sukses → else
           └────→ error spesifik → except
                        ↓
                     finally

#### Contoh Nyata

Input nilai dari form masih berupa teks dan mungkin berisi kata “delapan puluh”.

#### Contoh AI

Sebelum data diproses, pipeline memvalidasi tipe dan mencatat record yang gagal.

#### Kode Python

    raw_score = "88"

    try:
        score = float(raw_score)
    except ValueError:
        print("Nilai harus berupa angka")
    else:
        print(f"Nilai valid: {score}")
    finally:
        print("Validasi selesai")

#### Penjelasan Kode Baris per Baris

1.  Input awal masih string.
2.  `try` mencoba mengubahnya menjadi float.
3.  `ValueError` ditangani jika format salah.
4.  `else` hanya berjalan saat konversi berhasil.
5.  `finally` memberi penutup yang selalu dijalankan.

#### Common Mistakes

-   Memakai `except:` yang menangkap semua error.
-   Mengabaikan error tanpa log atau pesan.
-   Menggunakan exception untuk alur normal yang mudah diperiksa dengan `if`.

#### Best Practices

-   Tangkap exception paling spesifik.
-   Berikan pesan yang membantu tindakan berikutnya.
-   Jangan melanjutkan pipeline dengan data rusak tanpa keputusan eksplisit.

#### Mini Challenge

Buat function `parse_score(value)` yang mengembalikan float atau `None` dengan pesan yang jelas.

#### Ringkasan

Error handling membuat kegagalan terlihat, terkontrol, dan dapat diperbaiki.

#### Persiapan Chapter Berikutnya

Berikutnya kita membawa program keluar dari memori dengan membaca dan menulis file.

* * * * *

## Chapter 11 — File I/O: Bertemu Dataset

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/11-full.html`

### Chapter 11 — File I/O: Bertemu Dataset

#### Learning Objectives

-   Membaca dan menulis file teks serta CSV dasar.
-   Menggunakan context manager `with`.
-   Memahami path, encoding, dan schema sederhana.

#### Kenapa Materi Ini Penting?

Data jarang diketik langsung ke kode. Ia datang dari file, database, form, atau API. File I/O adalah jembatan pertama menuju dataset nyata.

#### Hubungan dengan AI

Dataset CSV, konfigurasi JSON, dan output eksperimen perlu dibaca serta disimpan secara konsisten.

#### Analogi

Program adalah pekerja di meja; file adalah lemari arsip. Membuka file berarti mengambil arsip, membaca atau mengubahnya, lalu menutup lemari.

#### Penjelasan Konsep

Mode umum: `r` membaca, `w` menulis ulang, `a` menambah. Context manager `with` menutup file otomatis. Encoding `utf-8` membantu menangani karakter Indonesia.

#### Visual Thinking

    participants.csv → open/read → Python → process → report.txt

#### Contoh Nyata

Panitia menyimpan nilai dalam CSV lalu membuat laporan teks.

#### Contoh AI

CSV dapat menjadi input tahap cleaning sebelum digunakan lebih lanjut pada workflow AI.

#### Kode Python

    from pathlib import Path

    report_path = Path("report.txt")

    with report_path.open("w", encoding="utf-8") as file:
        file.write("Rata-rata nilai: 84.5\n")

    with report_path.open("r", encoding="utf-8") as file:
        report = file.read()

    print(report)

#### Penjelasan Kode Baris per Baris

1.  `Path` membantu mengelola lokasi file.
2.  Path output dibuat.
3.  File dibuka dalam mode tulis dengan UTF-8.
4.  Teks dan newline ditulis.
5.  File dibuka kembali dalam mode baca.
6.  Isi disimpan ke variable dan ditampilkan.

#### Common Mistakes

-   Memakai `w` lalu tidak sengaja menimpa file.
-   Mengandalkan working directory tanpa memahami path.
-   Tidak menentukan encoding.

#### Best Practices

-   Gunakan `with` dan `pathlib.Path`.
-   Pisahkan folder data mentah dan output.
-   Jangan menimpa raw dataset; simpan hasil sebagai file baru.

#### Mini Challenge

Tulis tiga baris ringkasan ke `summary.txt`, baca kembali, dan tampilkan.

#### Ringkasan

File I/O memungkinkan data bertahan setelah program selesai dan menjadi input untuk proses berikutnya.

#### Persiapan Chapter Berikutnya

Python dasar dapat melakukan banyak hal, tetapi library membuat pekerjaan data jauh lebih efisien.

* * * * *

## Chapter 12 — Ekosistem Python untuk AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/12-full.html`

### Chapter 12 — Ekosistem Python untuk AI

#### Learning Objectives

-   Mengenali library utama dalam workflow AI.
-   Memilih library berdasarkan masalah.
-   Memahami package sebagai kemampuan tambahan, bukan tujuan belajar.

#### Kenapa Materi Ini Penting?

Pemula sering kewalahan oleh banyak nama library. Chapter ini memberi peta, bukan pembahasan mendalam.

#### Hubungan dengan AI

Ekosistem library membuat Python berguna dari data hingga aplikasi AI.

#### Analogi

Python adalah smartphone; library adalah aplikasi. Kita memasang aplikasi karena punya kebutuhan, bukan agar layar terlihat penuh.

#### Penjelasan Konsep

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Library
Peran ringkas</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">NumPy
Array dan komputasi numerik</td>
<td align="left">Pandas
Data tabular dan cleaning</td>
</tr>
</tbody>
</table>

#### Visual Thinking

    Data tabular ─ Pandas ─ NumPy ─ visualisasi
                                  ├─ Scikit-learn (nanti)
                                  ├─ PyTorch/TensorFlow (nanti)
    Teks/gambar ─ Transformers/OpenCV (nanti)

#### Contoh Nyata

Pandas membaca file nilai, NumPy menghitung statistik, Matplotlib membuat grafik.

#### Contoh AI

Pada project lanjutan, Scikit-learn atau framework lain menerima data yang sudah disiapkan. Kualitas tahap persiapan tetap penting.

#### Kode Python

    import numpy as np
    import pandas as pd

    print(np.__name__)
    print(pd.__name__)

#### Penjelasan Kode Baris per Baris

1.  NumPy diimpor dengan alias konvensional `np`.
2.  Pandas diimpor dengan alias `pd`.
3.  Nama module ditampilkan sebagai pemeriksaan sederhana.

#### Common Mistakes

-   Memasang semua library sekaligus.
-   Mengimpor package yang tidak dipakai.
-   Mengira library menggantikan pemahaman data.

#### Best Practices

-   Mulai dari kebutuhan workflow.
-   Gunakan dokumentasi resmi.
-   Catat dependency project.

#### Mini Challenge

Pilih library yang paling relevan untuk: tabel CSV, array angka, grafik, gambar, dan Deep Learning. Jelaskan alasannya satu kalimat.

#### Ringkasan

Ekosistem Python menyediakan alat khusus untuk tiap tahap. Modul ini hanya mendalami NumPy dan Pandas sebagai gerbang data.

#### Persiapan Chapter Berikutnya

Kita mulai dari NumPy untuk memahami operasi pada sekumpulan angka.

* * * * *

## Chapter 13 — NumPy: Komputasi Numerik dalam Array

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/13-full.html`

### Chapter 13 — NumPy: Komputasi Numerik dalam Array

#### Learning Objectives

-   Membuat NumPy array dan membaca `shape`.
-   Melakukan operasi vectorized sederhana.
-   Menghitung statistik sambil menangani `NaN`.

#### Kenapa Materi Ini Penting?

Loop Python cocok untuk belajar, tetapi operasi data numerik sering lebih ringkas dan efisien dengan array.

#### Hubungan dengan AI

Data numerik pada workflow AI banyak direpresentasikan sebagai array. Kita tidak membahas tensor atau model; fokusnya cara berpikir data berdimensi.

#### Analogi

List seperti kotak campuran. NumPy array seperti rak angka yang rapi: bentuk dan tipe datanya mendukung operasi massal.

#### Penjelasan Konsep

Array memiliki `shape`. Operasi `scores + 5` diterapkan ke setiap elemen tanpa loop manual. `np.nan` mewakili nilai numerik yang hilang. `np.nanmean()` menghitung rata-rata sambil mengabaikan NaN, tetapi kita tetap perlu memahami mengapa data hilang.

#### Visual Thinking

    [[80, 90, 70],
     [88, 92, 84]]  → shape (2, 3)
      2 peserta, 3 penilaian

#### Contoh Nyata

Hitung rata-rata nilai peserta dan normalisasi sederhana ke skala 0–1.

#### Contoh AI

Array adalah bentuk umum untuk data numerik yang kelak dipakai library Machine Learning.

#### Kode Python

    import numpy as np

    scores = np.array([80.0, 90.0, np.nan, 70.0])
    average = np.nanmean(scores)
    valid_scores = scores[~np.isnan(scores)]
    scaled_scores = valid_scores / 100

    print(scores.shape)
    print(average)
    print(scaled_scores)

#### Penjelasan Kode Baris per Baris

1.  NumPy diimpor sebagai `np`.
2.  Array float dibuat; satu nilai hilang ditandai `np.nan`.
3.  `np.nanmean` menghitung rata-rata nilai valid.
4.  Boolean mask memilih elemen yang bukan NaN.
5.  Pembagian diterapkan ke seluruh nilai valid.
6.  Shape, rata-rata, dan hasil skala ditampilkan.

#### Common Mistakes

-   Mencampur shape yang tidak kompatibel.
-   Mengabaikan dtype.
-   Menghapus NaN tanpa memahami penyebab.

#### Best Practices

-   Periksa `shape` dan `dtype`.
-   Tentukan kebijakan missing value secara eksplisit.
-   Gunakan operasi vectorized yang tetap mudah dibaca.

#### Mini Challenge

Buat array lima nilai termasuk satu `np.nan`. Tampilkan jumlah data valid, minimum, maksimum, dan rata-rata valid.

#### Ringkasan

NumPy membantu memproses sekumpulan angka sebagai array dengan operasi yang ringkas dan konsisten.

#### Persiapan Chapter Berikutnya

Array kuat untuk angka; Pandas menambahkan nama kolom dan baris agar data tabular lebih mudah dipahami.

* * * * *

## Chapter 14 — Pandas: Membaca dan Membersihkan Data Tabular

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/14-full.html`

### Chapter 14 — Pandas: Membaca dan Membersihkan Data Tabular

#### Learning Objectives

-   Membuat dan membaca DataFrame.
-   Memeriksa, memilih, memfilter, dan membersihkan data.
-   Melakukan agregasi sederhana dan menyimpan CSV.

#### Kenapa Materi Ini Penting?

Sebagian besar waktu project data dihabiskan untuk memahami dan membersihkan data, bukan membangun model.

#### Hubungan dengan AI

Model hanya dapat belajar dari data yang diberikan. Pandas membantu menemukan nilai kosong, duplikat, tipe salah, dan distribusi yang perlu diperiksa sebelum tahap model.

#### Analogi

DataFrame seperti spreadsheet yang dapat diberi instruksi melalui kode. Instruksinya dapat diulang pada file baru tanpa mengklik langkah yang sama.

#### Penjelasan Konsep

-   `DataFrame`: tabel dua dimensi.
-   `read_csv()`: membaca CSV.
-   `head()`, `info()`, `describe()`: memahami data.
-   Boolean filtering: memilih baris berdasarkan kondisi.
-   `fillna()`/`dropna()`: menangani missing value berdasarkan alasan yang jelas.
-   `groupby()`: merangkum per kelompok.
-   `to_csv()`: menyimpan hasil.

#### Visual Thinking

    CSV → read → inspect → clean → validate → summarize → save

#### Contoh Nyata

Kolom nilai berisi satu data kosong dan track peserta perlu dibandingkan.

#### Contoh AI

Cleaning yang konsisten menghasilkan dataset yang lebih siap untuk tahap analisis atau model pada modul berikutnya.

#### Kode Python

    import pandas as pd

    data = {
        "name": ["Ayu", "Nisa", "Rani", "Sari"],
        "track": ["data", "data", "product", "product"],
        "score": [88, 91, None, 76],
    }

    df = pd.DataFrame(data)
    df["score"] = df["score"].fillna(df["score"].median())
    passed = df[df["score"] >= 75]
    summary = df.groupby("track")["score"].mean()

    passed.to_csv("participants_clean.csv", index=False)
    print(summary)

#### Penjelasan Kode Baris per Baris

1.  Pandas diimpor sebagai `pd`.
2.  Dictionary menyediakan data kolom.
3.  `DataFrame` mengubahnya menjadi tabel.
4.  Missing score diisi median sebagai keputusan contoh; pada data nyata keputusan harus dibenarkan.
5.  Boolean filter memilih nilai minimal 75.
6.  `groupby` menghitung rata-rata per track.
7.  Data bersih disimpan tanpa index tambahan.
8.  Ringkasan ditampilkan.

#### Common Mistakes

-   Mengubah data tanpa memeriksa salinan raw.
-   Mengisi semua missing value dengan nol.
-   Mengabaikan tipe data dan duplikat.
-   Menganggap hasil agregasi membuktikan sebab-akibat.

#### Best Practices

-   Mulai dengan `head()`, `shape`, `info()`, dan pemeriksaan missing value.
-   Dokumentasikan setiap keputusan cleaning.
-   Simpan output ke file baru.
-   Validasi jumlah baris sebelum dan sesudah transformasi.

#### Mini Challenge

Tambahkan satu record duplikat. Deteksi dengan `duplicated()`, hapus dengan `drop_duplicates()`, lalu bandingkan jumlah baris.

#### Ringkasan

Pandas mengubah proses cleaning dan analisis tabel menjadi langkah yang dapat diulang serta diaudit.

#### Persiapan Chapter Berikutnya

Sekarang kita menggabungkan seluruh fondasi menjadi satu mini workflow data berorientasi AI.

* * * * *

## Chapter 15 — Mini AI Workflow: Dataset Nilai Peserta

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/15-full.html`

### Chapter 15 — Mini AI Workflow: Dataset Nilai Peserta

#### Learning Objectives

-   Menghubungkan file, Pandas, NumPy, function, loop, dan error handling.
-   Memisahkan tahap load, clean, summarize, dan save.
-   Menghasilkan laporan yang dapat digunakan tahap AI berikutnya.

#### Kenapa Materi Ini Penting?

Konsep baru menjadi keterampilan saat dipakai bersama. Chapter ini bukan project Machine Learning; ini simulasi tahap data yang selalu mendahuluinya.

#### Hubungan dengan AI

    CSV
     ↓
    Pandas: load & cleaning
     ↓
    NumPy: numeric summary
     ↓
    Function: repeatable pipeline
     ↓
    Validation & visualization-ready output
     ↓
    Clean dataset untuk modul model berikutnya

#### Analogi

Menyiapkan data seperti menyiapkan bahan sebelum memasak. Model secanggih apa pun tidak memperbaiki bahan yang salah label atau tercampur data rusak.

#### Penjelasan Konsep

Workflow harus memiliki input, output, aturan cleaning, validation checkpoint, serta catatan perubahan. Raw data tidak ditimpa.

#### Visual Thinking

    participants.csv
      ├─ schema benar?
      ├─ missing?
      ├─ duplicate?
      ├─ range score valid?
      └─ output → participants_clean.csv + report.txt

#### Contoh Nyata

Panitia menerima CSV nilai dan ingin daftar data valid, statistik ringkas, serta jumlah peserta per track.

#### Contoh AI

Output bersih menjadi kandidat input bagi workflow Machine Learning di modul berikutnya, tetapi belum ada model yang dibangun di sini.

#### Kode Python

    from pathlib import Path

    import numpy as np
    import pandas as pd


    REQUIRED_COLUMNS = {"name", "track", "score"}


    def load_data(path):
        return pd.read_csv(path)


    def clean_data(df):
        missing_columns = REQUIRED_COLUMNS - set(df.columns)
        if missing_columns:
            raise ValueError(f"Kolom hilang: {sorted(missing_columns)}")

        clean = df.copy()
        clean = clean.drop_duplicates()
        clean["score"] = pd.to_numeric(clean["score"], errors="coerce")
        clean = clean.dropna(subset=["name", "track", "score"])
        clean = clean[clean["score"].between(0, 100)]
        return clean


    def build_report(df):
        scores = df["score"].to_numpy()
        return {
            "rows": len(df),
            "average": float(np.mean(scores)),
            "minimum": float(np.min(scores)),
            "maximum": float(np.max(scores)),
        }


    def run_pipeline(input_path, output_path):
        raw = load_data(input_path)
        clean = clean_data(raw)
        report = build_report(clean)
        clean.to_csv(output_path, index=False)
        return report


    try:
        summary = run_pipeline(
            Path("participants.csv"),
            Path("participants_clean.csv"),
        )
        print(summary)
    except FileNotFoundError:
        print("File participants.csv belum tersedia")
    except ValueError as error:
        print(f"Data tidak valid: {error}")

#### Penjelasan Kode Baris per Baris

1.  Import menyediakan path, komputasi numerik, dan tabel.
2.  `REQUIRED_COLUMNS` mendefinisikan schema minimum.
3.  `load_data` hanya bertanggung jawab membaca CSV.
4.  `clean_data` memeriksa kolom, menyalin data, menghapus duplikat, mengubah score menjadi angka, membuang record tidak lengkap, dan membatasi range.
5.  `build_report` mengubah kolom score menjadi array dan menghitung statistik.
6.  `run_pipeline` menghubungkan tahap secara berurutan lalu menyimpan file baru.
7.  Blok `try` menjalankan workflow dan menangani file hilang atau schema buruk secara jelas.

#### Common Mistakes

-   Menimpa raw dataset.
-   Cleaning tanpa mencatat jumlah baris yang hilang.
-   Menggabungkan semua tahap dalam satu function.
-   Menganggap pipeline sukses hanya karena tidak error.

#### Best Practices

-   Pisahkan function berdasarkan tanggung jawab.
-   Validasi schema dan range.
-   Simpan raw dan clean data terpisah.
-   Tambahkan test kecil untuk setiap function.
-   Laporkan perubahan dan asumsi cleaning.

#### Mini Challenge

Tambahkan kolom `status` menggunakan function, hitung jumlah peserta per track, dan simpan ringkasan sebagai CSV kedua.

#### Ringkasan

Mini workflow menunjukkan posisi nyata Python: mengubah dataset mentah menjadi data bersih dan laporan yang dapat dipercaya.

#### Persiapan Chapter Berikutnya

Kamu siap masuk ke practice, quiz, dan diskusi sebelum melanjutkan ke konsep AI dan Machine Learning.

* * * * *

### Practice — Python sebagai Workflow Data

Kerjakan bertahap. Setiap latihan menghasilkan komponen untuk project akhir.

#### Latihan 1 — Input, Process, Output

Rancang IPO untuk menghitung completion rate peserta. Sertakan kasus data kosong.

#### Latihan 2 — Metadata Dataset

Buat variabel nama dataset, versi, jumlah baris, persentase missing value, dan status review.

#### Latihan 3 — Record Peserta

Buat list berisi minimal lima dictionary peserta dengan field `name`, `track`, dan `score`.

#### Latihan 4 — Validasi dengan Control Flow

Loop seluruh record. Tandai score kosong, di luar 0–100, lulus, atau perlu review.

#### Latihan 5 — Function Pipeline

Buat function `validate_score`, `classify_score`, dan `summarize_scores`. Uji boundary 0, 74.9, 75, 100, `None`, dan teks.

#### Latihan 6 — Generator

Buat generator yang menghasilkan hanya record valid satu per satu.

#### Latihan 7 — Object dan Error

Buat class `DatasetReport` sederhana yang menyimpan nama dataset dan summary. Tangani input yang salah.

#### Latihan 8 — File

Simpan dataset kecil ke CSV atau siapkan file manual, lalu baca kembali tanpa menimpa raw file.

#### Latihan 9 — NumPy

Hitung jumlah data valid, rata-rata, median, minimum, maksimum, dan nilai yang sudah dibagi 100.

#### Latihan 10 — Pandas

Baca CSV, periksa shape dan missing value, hapus duplikat, perbaiki tipe score, filter range, agregasi per track, dan simpan output.

#### Latihan 11 — Audit Cleaning

Buat laporan jumlah baris raw, duplicate, invalid, missing, dan clean. Pastikan angka dapat direkonsiliasi.

#### Latihan 12 — Workflow Utuh

Gabungkan tahap load, validate, clean, summarize, dan save dalam function terpisah. Tambahkan pesan error yang dapat ditindaklanjuti.

* * * * *

### Mini Project — Analisis Dataset Nilai Workshop AI

#### Skenario

Tim HerAI menerima file nilai peserta. File tersebut memiliki data kosong, duplikat, dan score yang mungkin berada di luar range. Tim membutuhkan dataset bersih dan laporan sebelum data dipakai pada modul analisis berikutnya.

#### Deliverables

1.  `participants.csv` sebagai raw input.
2.  Notebook atau file Python yang dapat dijalankan dari awal.
3.  `participants_clean.csv` tanpa menimpa raw data.
4.  `track_summary.csv` berisi jumlah peserta dan rata-rata per track.
5.  `report.txt` yang menjelaskan perubahan data.

#### Requirement

-   Gunakan minimal tiga function.
-   Gunakan Pandas untuk loading dan cleaning.
-   Gunakan NumPy untuk minimal dua statistik.
-   Tangani file hilang dan schema tidak lengkap.
-   Validasi score 0–100.
-   Deteksi duplikat dan missing value.
-   Tambahkan kolom status.
-   Jelaskan keputusan cleaning.

#### Rubrik (100 Poin)

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Dimensi
Bobot</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Computational thinking dan struktur workflow
20</td>
<td align="left">Kebenaran cleaning dan validation
25</td>
</tr>
</tbody>
</table>

#### Refleksi Project

-   Baris mana yang berubah atau hilang, dan mengapa?
-   Apa risiko jika missing score langsung diisi nol?
-   Bagian mana yang harus konsisten ketika workflow menerima dataset baru?
-   Mengapa data bersih belum otomatis berarti data adil atau representatif?

* * * * *

### Quiz — 20 Soal

#### Soal 1

Peran Python dalam workflow AI paling tepat adalah...

A. AI itu sendiri
B. Bahasa yang menghubungkan data, library, eksperimen, dan aplikasi
C. Hanya kalkulator
D. Pengganti dataset

**Jawaban: B.**

#### Soal 2

Kapan notebook lebih cocok daripada file `.py`?

A. Eksplorasi bertahap dengan kode dan catatan
B. Semua production service
C. Menyimpan password
D. Menggantikan virtual environment

**Jawaban: A.**

#### Soal 3

Fungsi utama virtual environment adalah...

A. Membuat GPU
B. Mengisolasi dependency project
C. Membersihkan dataset
D. Menghapus Python

**Jawaban: B.**

#### Soal 4

Dalam IPO, menghitung rata-rata termasuk...

A. Input
B. Process
C. Output
D. Package

**Jawaban: B.**

#### Soal 5

Tipe data yang tepat untuk prompt adalah...

A. `str`
B. `int`
C. `bool`
D. `set`

**Jawaban: A.**

#### Soal 6

Struktur yang paling menyerupai object JSON adalah...

A. Tuple
B. Dictionary
C. Set
D. Float

**Jawaban: B.**

#### Soal 7

Mengapa `score is None` diperiksa sebelum `score >= 75`?

A. Agar kode lebih panjang
B. `None` tidak dapat dibandingkan dengan angka
C. Semua score adalah None
D. Python selalu mengubah None menjadi nol

**Jawaban: B.**

#### Soal 8

Perbedaan utama `return` dan `print` adalah...

A. Tidak ada
B. `return` mengirim nilai ke pemanggil, `print` hanya menampilkan
C. `print` lebih aman
D. `return` hanya untuk string

**Jawaban: B.**

#### Soal 9

Kapan lambda sebaiknya digunakan?

A. Untuk logika panjang
B. Untuk ekspresi singkat dan jelas
C. Untuk menangani semua error
D. Untuk membuka file

**Jawaban: B.**

#### Soal 10

Keuntungan generator adalah...

A. Selalu lebih cepat untuk semua kasus
B. Menghasilkan nilai bertahap saat dibutuhkan
C. Menyimpan semua data dua kali
D. Menggantikan Pandas

**Jawaban: B.**

#### Soal 11

Dalam OOP, object adalah...

A. Blueprint
B. Instance dari class
C. Error
D. Package

**Jawaban: B.**

#### Soal 12

Praktik exception handling terbaik adalah...

A. Menangkap semua error dan diam
B. Menangkap exception spesifik dan memberi pesan jelas
C. Tidak pernah memakai try
D. Melanjutkan data rusak

**Jawaban: B.**

#### Soal 13

Mengapa menggunakan `with` saat membuka file?

A. File ditutup otomatis
B. File menjadi AI
C. Tidak perlu path
D. Semua error hilang

**Jawaban: A.**

#### Soal 14

Library yang fokus pada data tabular adalah...

A. OpenCV
B. Pandas
C. Matplotlib
D. pathlib

**Jawaban: B.**

#### Soal 15

`scores.shape` pada NumPy menjelaskan...

A. Nama file
B. Dimensi array
C. Missing value
D. Versi Python

**Jawaban: B.**

#### Soal 16

Apa fungsi `np.nanmean()`?

A. Menghapus file
B. Menghitung mean sambil mengabaikan NaN
C. Mengisi semua NaN dengan nol
D. Membuat DataFrame

**Jawaban: B.**

#### Soal 17

Langkah pertama setelah membaca CSV sebaiknya...

A. Langsung membangun model
B. Memeriksa shape, kolom, tipe, missing value, dan contoh baris
C. Menghapus semua baris
D. Menimpa file

**Jawaban: B.**

#### Soal 18

Mengapa missing score tidak selalu diisi nol?

A. Nol tidak ada di Python
B. Nol memiliki makna dan dapat mengubah statistik
C. Pandas tidak mendukung nol
D. CSV tidak mendukung angka

**Jawaban: B.**

#### Soal 19

`groupby("track")["score"].mean()` digunakan untuk...

A. Menghapus track
B. Menghitung rata-rata score per track
C. Membuat virtual environment
D. Mengubah score menjadi string

**Jawaban: B.**

#### Soal 20

Mengapa raw dataset tidak boleh ditimpa?

A. Agar transformasi dapat diaudit dan diulang
B. Agar folder lebih banyak
C. Karena Pandas tidak bisa menulis
D. Agar model lebih kompleks

**Jawaban: A.**

* * * * *

### Discussion

#### Diskusi 1 — Python sebagai Bahasa AI

Mengapa Python menjadi dominan dalam AI meskipun bukan selalu bahasa tercepat? Pertimbangkan keterbacaan, ekosistem, komunitas, eksperimen, dan integrasi.

#### Diskusi 2 — Notebook vs Program

Kapan notebook membantu pembelajaran dan eksplorasi? Kapan urutan cell tersembunyi, kode duplikat, atau state yang tidak jelas menjadi risiko?

#### Diskusi 3 — Cleaning adalah Keputusan

Apakah menghapus missing value selalu benar? Siapa yang seharusnya menentukan aturan cleaning, dan bukti apa yang diperlukan?

#### Diskusi 4 — Siap untuk Machine Learning?

Sebuah dataset sudah tidak memiliki nilai kosong. Apakah otomatis siap digunakan? Bahas duplikat, salah label, representasi kelompok, data leakage, range, dan relevansi fitur tanpa masuk ke algoritma model.

#### Prompt Refleksi Utama

Setelah mempelajari Python, bagian mana yang paling mengubah cara kamu melihat AI: sintaks, struktur data, function, atau workflow data? Jelaskan mengapa kemampuan memahami data mungkin lebih penting daripada menghafal banyak library.

* * * * *

### Checklist Kesiapan Peserta

-   Saya dapat menjelaskan input, process, dan output.
-   Saya dapat menjalankan Python di environment terisolasi atau Colab.
-   Saya memahami variable, collection, control flow, dan function.
-   Saya dapat membaca error dan menangani kegagalan umum.
-   Saya dapat membaca file tanpa menimpa raw data.
-   Saya dapat menjelaskan peran NumPy dan Pandas.
-   Saya dapat memeriksa shape, tipe, missing value, duplikat, dan range.
-   Saya dapat memecah workflow menjadi function kecil.
-   Saya dapat menjelaskan setiap keputusan cleaning.
-   Saya memahami bahwa Python adalah alat untuk workflow AI, bukan AI itu sendiri.

### Jembatan ke Modul Berikutnya

Fondasi ini mempersiapkan peserta untuk:

-   **Konsep AI Modern:** memahami bagaimana komponen AI bekerja dalam sistem.
-   **Math for AI:** merepresentasikan operasi numerik melalui array.
-   **Machine Learning:** menyiapkan data dan menggunakan API library secara sadar.
-   **Prompt Engineering:** memperlakukan prompt sebagai data dan membangun eksperimen terstruktur.
-   **LLM dan AI Agent:** mengorkestrasi input, function, tool, state, dan output.

### Catatan Desain Kurikulum

Modul ini sengaja tidak mengajarkan Neural Network, tensor, gradient, optimizer, Transformer, Attention, algoritma Machine Learning, RAG, atau AI Agent. Nama library lanjutan hanya dikenalkan sebagai peta perjalanan. Kompetensi inti modul adalah computational thinking, Python fundamentals, dan workflow data yang kuat.

## Forum Python AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/diskusi.html`

Discussion Board

#### Forum Python AI

Pilih prompt atau tulis pertanyaan sendiri. Thread tersimpan di browser dengan key `heraiAiPythonDiscussion`.

**Python sebagai Bahasa AI

**Notebook vs Program

**Cleaning adalah Keputusan

**Siap untuk ML?

Prompt diskusi Mengapa Python dominan dalam AI meskipun bukan selalu bahasa dengan runtime tercepat? Kapan notebook membantu eksplorasi, dan kapan hidden state membuat hasil sulit dipercaya? Apakah menghapus missing value selalu benar? Bukti apa yang diperlukan sebelum memilih aturan cleaning? Dataset tanpa missing value apakah otomatis siap untuk Machine Learning? Tulis posting diskusi

Posting akan tersimpan di browser ini.

** Posting Diskusi

**

Sumber utuh

#### Prompt Diskusi dari Materi Sumber

Bagian ini memuat teks diskusi dari `materi/baru/Python-baru.md` tanpa dikurangi.

** Memuat prompt diskusi sumber...

## Kuis Python

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/kuis.html`

Knowledge Check

#### Kuis Python

Pilih satu jawaban paling tepat. Seluruh kartu opsi bisa diklik. Kuis single attempt dan akan terkunci setelah dikirim.

** Sebelumnya

**Soal 1 dari 20**

Berikutnya **

** Kirim Kuis

** **Referensi kuis dari materi sumber**Teks kuis sumber tetap utuh dan tidak dikurangi. **

** Memuat kuis sumber...

## Latihan Python Terstruktur

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/latihan.html`

Practice Lab

#### Latihan Python Terstruktur

Kerjakan satu skenario pada satu waktu. Baca kasus, tulis jawaban, lalu lihat pembahasan.

Jawaban akan tersimpan di browser ini.

** Sebelumnya

**Skenario 1 dari 12**

Berikutnya **

Gunakan simpan untuk mengunci sementara jawabanmu. Kamu tetap bisa edit lagi.

** Simpan Jawaban

** Edit

** Reset

** **Referensi lengkap latihan dan proyek akhir**Materi sumber tetap utuh dan bisa dibuka saat dibutuhkan. **

** Memuat latihan sumber...

## materi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/materi.html`

**

Memuat materi Python...

** Topik Sebelumnya

Topik Selanjutnya **

[Lanjut Latihan **](#/participant-ai-python-practice)

## Konten Dinamis dan Interaktif

> Data berikut diekstrak dari JavaScript runtime untuk `python`, termasuk teks yang baru muncul setelah interaksi.

#### CHAPTERS

#### Python & AI Mindset

- **title:** Python & AI Mindset
- **shortTitle:** Python & AI
- **duration:** 25 menit
- **icon:** fas fa-brain
- **summary:** Pahami posisi Python dalam workflow AI, siapkan environment, dan kuasai computational thinking.
##### objectives

- Menjelaskan alasan Python populer dalam AI
- Menyiapkan environment Python
- Menerapkan computational thinking

- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/01-topic.html
##### hook

- **question:** Python populer untuk AI karena paling cepat. Benarkah?
###### answerA

- **label:** Benar
- **text:** Kecepatan runtime adalah alasan utamanya.
- **icon:** fas fa-gauge-high

###### answerB

- **label:** Belum tepat
- **text:** Keterbacaan, ekosistem, eksperimen, dan integrasi jauh lebih menentukan.
- **icon:** fas fa-bridge

- **message:** Python sering menjadi lapisan orkestrasi. Operasi berat tetap dijalankan library teroptimasi, sementara Python membuat workflow mudah dibaca dan diuji.

##### flow

##### Item 1

- Masalah
- Definisikan input, proses, output

##### Item 2

- Environment
- Isolasi dependency dan versi

##### Item 3

- Eksperimen
- Jalankan langkah kecil dan amati

##### Item 4

- Workflow
- Susun proses yang dapat diulang

##### deepDive

##### Item 1

- Python adalah penghubung, bukan AI itu sendiri
- Python memberi bahasa yang konsisten untuk membaca data, memanggil library numerik, menjalankan eksperimen, menyimpan artefak, dan menghubungkan model ke aplikasi. Ketika peserta memahami peran ini, mereka tidak lagi menganggap satu fungsi library sebagai sihir; mereka dapat menelusuri dari input sampai output serta menunjukkan bagian mana yang melakukan transformasi.
- Keunggulan Python bukan berarti setiap operasi dieksekusi paling cepat oleh interpreter. NumPy, Pandas, PyTorch, dan banyak library lain memindahkan komputasi berat ke implementasi teroptimasi. Python tetap berada di atasnya sebagai lapisan yang ekspresif, sehingga tim dapat mengubah ide menjadi eksperimen tanpa kehilangan keterbacaan.

##### Item 2

- Environment adalah bagian dari reproducibility
- Kode yang benar di satu laptop dapat gagal di laptop lain karena versi Python, package, atau dependency berbeda. Virtual environment memisahkan kebutuhan setiap project sehingga upgrade satu eksperimen tidak merusak eksperimen lain. File dependency dan catatan versi membuat anggota tim dapat membangun ulang lingkungan yang sama.
- Notebook cocok untuk eksplorasi bertahap, tetapi urutan cell tersembunyi dapat menghasilkan state yang sulit dilacak. Untuk workflow berulang, pindahkan logika stabil ke function atau file Python, jalankan dari awal, lalu pastikan output tidak bergantung pada cell yang pernah dieksekusi diam-diam.

##### Item 3

- Computational thinking sebelum sintaks
- Sebelum menulis kode, pecah masalah menjadi input, aturan, proses, output, dan failure case. Misalnya completion rate memerlukan jumlah peserta selesai dan jumlah peserta total; kondisi total nol harus diputuskan sebelum pembagian dilakukan. Keputusan kecil ini adalah bagian dari desain program, bukan detail sintaks.
- Decomposition membantu peserta menguji satu langkah pada satu waktu. Pattern recognition menemukan proses yang berulang, abstraction memilih detail yang penting, dan algorithmic thinking menyusun urutan yang deterministik. Empat kemampuan tersebut terus dipakai ketika workflow berkembang dari beberapa variabel menjadi pipeline data.

##### workedExample

##### Item 1

Completion rate peserta

##### Item 2

- Input
- Jumlah peserta selesai dan total peserta.

##### Item 3

- Validasi
- Total tidak boleh negatif; total nol ditangani eksplisit.

##### Item 4

- Proses
- completed / total × 100 hanya dijalankan setelah validasi.

##### Item 5

- Output
- Persentase beserta pesan yang menjelaskan kondisi data.

##### glossary

##### Item 1

- Interpreter
- Program yang menjalankan instruksi Python.

##### Item 2

- Environment
- Lingkungan terisolasi berisi Python dan dependency project.

##### Item 3

- Dependency
- Package lain yang dibutuhkan program.

##### Item 4

- Reproducibility
- Kemampuan mengulang proses dengan input dan environment yang sama.

##### Item 5

- Computational thinking
- Cara memecah masalah menjadi langkah yang dapat dieksekusi.

##### quickCheck

- **question:** Mengapa virtual environment penting pada project AI?
###### options

- Mengisolasi versi dependency
- Membuat model otomatis
- Menggantikan dataset

- **answer:** 0
- **explanationCorrect:** Tepat. Isolasi dependency membuat eksperimen lebih stabil dan dapat diulang.
- **explanationWrong:** Coba hubungkan environment dengan perbedaan versi package antarproject.

##### challenge

- **instruction:** Rancang IPO untuk completion rate, termasuk kondisi total peserta nol.
- **placeholder:** Input: ...
Process: ...
Output: ...
Edge case: ...
- **example:** Input completed dan total; validasi total; hitung persentase bila total > 0; bila nol, kembalikan status belum ada data.

##### mistakes

- Menganggap Python adalah model AI
- Menginstal semua package secara global
- Menjalankan notebook tanpa restart-and-run-all

##### bestPractices

- Pisahkan environment per project
- Catat dependency dan versi
- Tulis IPO serta edge case sebelum kode

##### learningOutcomes

- Menjelaskan posisi Python dalam AI
- Membangun environment yang dapat diulang
- Memecah masalah menjadi pipeline kecil

- **transition:** Berikutnya kita menerjemahkan input dan state ke tipe data serta collection yang tepat.
##### prompt

- problem = input + process + output
- validate edge cases before calculation
- record environment and dependency versions


#### Data Dasar: Variabel & Collection

- **title:** Data Dasar: Variabel & Collection
- **shortTitle:** Data Dasar
- **duration:** 30 menit
- **icon:** fas fa-database
- **summary:** Pelajari sintaks dasar Python dan struktur data collection.
##### objectives

- Menggunakan sintaks dasar Python
- Membedakan tipe data
- Menggunakan list, tuple, set, dictionary

- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/02-topic.html
##### hook

- **question:** Semua data peserta paling mudah disimpan sebagai string. Setuju?
###### answerA

- **label:** Setuju
- **text:** Satu tipe terasa lebih sederhana.
- **icon:** fas fa-font

###### answerB

- **label:** Tidak
- **text:** Tipe data membawa makna dan menentukan operasi yang aman.
- **icon:** fas fa-shapes

- **message:** Nama, score, status, dan kumpulan record memiliki operasi berbeda. Pemilihan tipe yang tepat mengurangi konversi dan error tersembunyi.

##### flow

##### Item 1

- Value
- Kenali makna data

##### Item 2

- Type
- Pilih operasi yang valid

##### Item 3

- Collection
- Susun beberapa nilai

##### Item 4

- Validate
- Periksa bentuk dan isi

##### deepDive

##### Item 1

- Variabel menyimpan state dengan nama bermakna
- Variabel bukan sekadar kotak. Nama variabel mendokumentasikan peran sebuah nilai dan membantu pembaca mengikuti perubahan state. Gunakan nama seperti participant_score atau dataset_version, bukan x atau data1, ketika maknanya penting bagi keputusan berikutnya.
- Tipe int dan float mendukung operasi numerik; str mendukung pengolahan teks; bool menyatakan kondisi; None menandai nilai yang belum tersedia. None tidak sama dengan nol atau string kosong. Menyamakan ketiganya dapat mengubah statistik dan keputusan bisnis.

##### Item 2

- Collection dipilih berdasarkan perilaku
- List menjaga urutan dan dapat berubah, tuple cocok untuk susunan yang stabil, set menghapus keunikan ganda, sedangkan dictionary memetakan key ke value. Record peserta biasanya lebih mudah dibaca sebagai dictionary karena setiap nilai memiliki nama field yang eksplisit.
- Collection dapat bersarang, misalnya list berisi dictionary peserta. Struktur ini mirip data JSON yang sering berpindah antara frontend, backend, dan layanan AI. Sebelum mengakses key, periksa schema dan putuskan apa yang dilakukan jika field hilang atau memiliki tipe yang salah.

##### Item 3

- Mutability memengaruhi efek samping
- List dan dictionary mutable: perubahan pada object yang sama terlihat dari semua referensi yang menunjuk kepadanya. Ini berguna tetapi dapat menimbulkan bug ketika raw data berubah tanpa sengaja. Salin data sebelum cleaning bila versi mentah perlu dipertahankan.
- Operasi collection sebaiknya mengikuti tujuan yang jelas: append untuk menambah record, set untuk deduplikasi nilai sederhana, dan dictionary lookup untuk akses berdasarkan key. Jangan memilih struktur hanya karena sintaksnya paling familiar; pilih berdasarkan urutan, keunikan, kebutuhan perubahan, dan pola akses.

##### workedExample

##### Item 1

Record eksperimen

##### Item 2

- Metadata
- Dictionary menyimpan nama dataset, versi, dan status review.

##### Item 3

- Records
- List menyimpan beberapa dictionary peserta.

##### Item 4

- Validation
- Periksa key name, track, dan score sebelum diproses.

##### Item 5

- Safety
- Salin record sebelum membuat perubahan cleaning.

##### glossary

##### Item 1

- State
- Nilai yang menggambarkan kondisi program saat ini.

##### Item 2

- Mutable
- Object yang isinya dapat diubah.

##### Item 3

- Immutable
- Object yang tidak berubah setelah dibuat.

##### Item 4

- Schema
- Kesepakatan field dan tipe sebuah record.

##### Item 5

- JSON
- Format pertukaran data berbasis object dan array.

##### quickCheck

- **question:** Struktur apa yang paling tepat untuk satu record peserta dengan field name, track, dan score?
###### options

- Dictionary
- Set
- Float

- **answer:** 0
- **explanationCorrect:** Benar. Dictionary memberi nama pada setiap field.
- **explanationWrong:** Pilih struktur yang memetakan nama field ke nilainya.

##### challenge

- **instruction:** Buat metadata dataset dan lima record peserta. Jelaskan alasan memilih setiap tipe data.
- **placeholder:** metadata = {...}
participants = [...]
Alasan: ...
- **example:** Dictionary untuk metadata dan record, list untuk urutan record, float untuk score, bool untuk status review.

##### mistakes

- Mengubah raw list tanpa salinan
- Menyamakan None dengan nol
- Mengakses dictionary key tanpa validasi

##### bestPractices

- Gunakan nama variabel bermakna
- Dokumentasikan schema
- Pilih collection berdasarkan perilaku

##### learningOutcomes

- Memilih tipe berdasarkan makna
- Menyusun nested collection
- Menjelaskan mutability dan efek samping

- **transition:** Data sudah terstruktur; berikutnya program perlu mengambil keputusan dan mengulang proses secara aman.
##### prompt

- meaning -> type
- records -> schema
- validate before transform


#### Control Flow: Logika & Perulangan

- **title:** Control Flow: Logika & Perulangan
- **shortTitle:** Control Flow
- **duration:** 25 menit
- **icon:** fas fa-code-branch
- **summary:** Kendalikan alur program dengan kondisi dan perulangan.
##### objectives

- Menggunakan if/elif/else
- Menggunakan for dan while loop

- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/03-topic.html
##### hook

- **question:** Jika score kosong, langsung bandingkan dengan threshold 75?
###### answerA

- **label:** Langsung
- **text:** Semua record diperlakukan sama.
- **icon:** fas fa-forward

###### answerB

- **label:** Validasi dulu
- **text:** None atau teks tidak dapat dibandingkan aman dengan angka.
- **icon:** fas fa-shield

- **message:** Urutan kondisi adalah bagian dari correctness. Validasi missing dan tipe harus terjadi sebelum range atau threshold.

##### flow

##### Item 1

- Validate
- Cek missing dan tipe

##### Item 2

- Branch
- Pilih aturan yang cocok

##### Item 3

- Loop
- Terapkan ke setiap record

##### Item 4

- Summarize
- Hitung hasil dan error

##### deepDive

##### Item 1

- Branch mengubah aturan menjadi keputusan eksplisit
- if, elif, dan else dibaca dari atas ke bawah. Kondisi pertama yang benar akan dijalankan, sehingga urutan guard condition sangat penting. Missing value dan tipe invalid harus diperiksa sebelum perbandingan numerik agar program gagal dengan pesan yang jelas, bukan exception yang membingungkan.
- Boundary perlu ditulis sengaja. Jika lulus dimulai dari 75, nilai 74.9 dan 75 harus masuk cabang berbeda. Gunakan contoh di sekitar batas untuk memastikan operator >, >=, <, dan <= sesuai aturan yang sebenarnya.

##### Item 2

- Loop memproses collection tanpa copy-paste
- for loop cocok ketika program membaca setiap record dalam collection. while loop digunakan ketika pengulangan bergantung pada kondisi yang dapat berubah. Setiap loop harus punya tujuan, kondisi berhenti, dan state yang diperbarui agar tidak menjadi infinite loop.
- continue dapat melewati record invalid setelah error dicatat, sedangkan break menghentikan seluruh loop. Pilihan tersebut memiliki konsekuensi: pipeline batch biasanya ingin mengumpulkan semua error, bukan berhenti pada record pertama, tetapi kasus keamanan tertentu memang harus fail fast.

##### Item 3

- Output loop perlu dapat diaudit
- Jangan hanya menghasilkan daftar clean tanpa menjelaskan apa yang terjadi. Catat jumlah raw, valid, missing, invalid, dan out-of-range. Angka-angka ini harus dapat direkonsiliasi sehingga tim tahu apakah record hilang karena aturan yang disengaja.
- Control flow yang baik memisahkan klasifikasi dari side effect. Tentukan status record terlebih dahulu, lalu simpan atau laporkan hasil pada langkah berikutnya. Pemisahan ini membuat aturan lebih mudah diuji dengan input kecil.

##### workedExample

##### Item 1

Validasi score

##### Item 2

- Guard 1
- Jika score None, tandai missing.

##### Item 3

- Guard 2
- Jika bukan angka, tandai invalid type.

##### Item 4

- Guard 3
- Jika di luar 0–100, tandai out of range.

##### Item 5

- Decision
- Nilai valid diklasifikasikan lulus atau review.

##### glossary

##### Item 1

- Branch
- Cabang eksekusi berdasarkan kondisi.

##### Item 2

- Guard condition
- Pemeriksaan awal sebelum proses utama.

##### Item 3

- Boundary
- Nilai tepat di batas aturan.

##### Item 4

- Iteration
- Satu putaran loop.

##### Item 5

- Fail fast
- Menghentikan proses segera ketika kondisi kritis ditemukan.

##### quickCheck

- **question:** Mengapa score is None diperiksa sebelum score >= 75?
###### options

- None tidak dapat dibandingkan dengan angka
- Agar loop lebih cepat
- Agar score berubah menjadi nol

- **answer:** 0
- **explanationCorrect:** Tepat. Guard condition mencegah operasi yang tidak valid.
- **explanationWrong:** Pertimbangkan apa yang terjadi ketika operator >= menerima None.

##### challenge

- **instruction:** Klasifikasikan None, teks, -1, 0, 74.9, 75, 100, dan 101 serta jelaskan urutan guard.
- **placeholder:** Input -> status
...
Urutan guard: ...
- **example:** Missing dan tipe dicek lebih dulu, lalu range 0–100, baru threshold kelulusan.

##### mistakes

- Membandingkan None dengan angka
- Salah memilih > atau >=
- Loop tanpa kondisi berhenti

##### bestPractices

- Uji boundary
- Kumpulkan alasan record ditolak
- Pisahkan validasi dan klasifikasi

##### learningOutcomes

- Menyusun guard condition
- Memproses record dengan loop
- Merekonsiliasi hasil validasi

- **transition:** Aturan sudah berjalan; function akan membuatnya reusable, teruji, dan mudah dirangkai.
##### prompt

- validate missing -> type -> range
- classify valid values
- report every rejected record


#### Function & Modularitas

- **title:** Function & Modularitas
- **shortTitle:** Function
- **duration:** 30 menit
- **icon:** fas fa-puzzle-piece
- **summary:** Bangun pipeline kecil dengan function, lambda, dan generator.
##### objectives

- Menulis function dengan parameter
- Menggunakan lambda dan generator

- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/04-topic.html
##### hook

- **question:** Satu function besar lebih mudah karena semua kode berada di satu tempat?
###### answerA

- **label:** Lebih mudah
- **text:** Tidak perlu berpindah function.
- **icon:** fas fa-box

###### answerB

- **label:** Sulit dirawat
- **text:** Tanggung jawab bercampur dan test menjadi rumit.
- **icon:** fas fa-diagram-project

- **message:** Function kecil memberi nama pada satu tanggung jawab. Pipeline kemudian merangkainya dalam urutan yang dapat diuji.

##### flow

##### Item 1

- Contract
- Tentukan parameter dan return

##### Item 2

- Responsibility
- Satu function satu tujuan

##### Item 3

- Test
- Uji normal, boundary, invalid

##### Item 4

- Compose
- Rangkai menjadi pipeline

##### deepDive

##### Item 1

- Function adalah kontrak input dan output
- Parameter menjelaskan data yang dibutuhkan, sedangkan return mengirim nilai kepada pemanggil. print hanya menampilkan informasi dan biasanya tidak cukup untuk pipeline karena hasilnya tidak dapat dipakai langkah berikutnya. Function yang baik dapat dijelaskan tanpa membaca seluruh implementasi.
- Default parameter berguna ketika ada nilai standar, tetapi hindari default mutable seperti list kosong karena object yang sama dapat dipakai lintas pemanggilan. Gunakan None lalu buat object baru di dalam function ketika state harus independen.

##### Item 2

- Pipeline kecil mengurangi ketidakkonsistenan
- Copy-paste validation ke beberapa tempat membuat satu perbaikan harus dilakukan berkali-kali. Dengan validate_score, classify_score, dan summarize_scores, setiap aturan memiliki owner yang jelas dan dapat diuji terpisah. run_pipeline hanya mengatur urutan, bukan mengerjakan semua detail.
- Error sebaiknya muncul pada layer yang memahami penyebabnya. Function validasi dapat mengembalikan status terstruktur atau melempar exception spesifik; layer atas memutuskan apakah record dilewati, proses dihentikan, atau pesan ditampilkan.

##### Item 3

- Lambda dan generator dipakai pada kasus yang tepat
- lambda cocok untuk ekspresi sangat singkat seperti key sorting. Ketika logika membutuhkan nama, beberapa kondisi, dokumentasi, atau test, def lebih mudah dipahami. Kode pendek tidak selalu lebih sederhana.
- Generator menghasilkan item satu per satu dengan yield. Ia berguna untuk stream atau dataset besar karena tidak harus menyimpan seluruh hasil di memori. Namun generator hanya dapat dilalui sesuai alurnya; jika hasil perlu dibaca berulang, pertimbangkan materialisasi yang disengaja.

##### workedExample

##### Item 1

Pipeline validasi score

##### Item 2

- validate_score
- Pastikan tipe dan range valid.

##### Item 3

- classify_score
- Ubah score valid menjadi status.

##### Item 4

- summarize_scores
- Hitung jumlah dan statistik.

##### Item 5

- run_pipeline
- Rangkai tahap dan tangani error.

##### glossary

##### Item 1

- Parameter
- Nama input pada definisi function.

##### Item 2

- Argument
- Nilai yang dikirim saat function dipanggil.

##### Item 3

- Return value
- Nilai yang dikirim kembali ke pemanggil.

##### Item 4

- Pure function
- Function yang tidak mengubah state di luar dirinya.

##### Item 5

- Generator
- Function yang menghasilkan nilai bertahap dengan yield.

##### quickCheck

- **question:** Apa perbedaan utama return dan print?
###### options

- return mengirim nilai; print hanya menampilkan
- Keduanya selalu sama
- print hanya untuk angka

- **answer:** 0
- **explanationCorrect:** Benar. Return memungkinkan output dipakai tahap pipeline berikutnya.
- **explanationWrong:** Pikirkan apakah hasil masih dapat disimpan ke variabel setelah function selesai.

##### challenge

- **instruction:** Buat validate_score, classify_score, dan summarize_scores. Uji None, teks, 74.9, 75, dan 100.
- **placeholder:** def validate_score(...):
    ...
- **example:** Setiap function punya satu tanggung jawab; test mencakup normal, boundary, dan invalid input.

##### mistakes

- Function mengerjakan terlalu banyak hal
- Menggunakan print sebagai return
- Lambda berisi logika kompleks

##### bestPractices

- Tulis contract yang jelas
- Uji function secara terpisah
- Gunakan generator hanya saat aliran bertahap berguna

##### learningOutcomes

- Mendesain function kecil
- Membedakan return dan side effect
- Merangkai pipeline reusable

- **transition:** Setelah function, kita mengelompokkan state dan behavior terkait melalui object.
##### prompt

- validate_score(value)
- classify_score(valid_value)
- summarize_scores(values)
- run_pipeline = compose steps


#### OOP untuk AI

- **title:** OOP untuk AI
- **shortTitle:** OOP Dasar
- **duration:** 25 menit
- **icon:** fas fa-cubes
- **summary:** Object-Oriented Programming dasar untuk struktur kode AI.
##### objectives

- Memahami class dan object
- Menggunakan inheritance

- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/05-topic.html
##### hook

- **question:** Class perlu dipakai untuk setiap dictionary?
###### answerA

- **label:** Selalu
- **text:** OOP membuat semua kode lebih profesional.
- **icon:** fas fa-cubes

###### answerB

- **label:** Sesuai kebutuhan
- **text:** Class berguna ketika state dan behavior memiliki lifecycle bersama.
- **icon:** fas fa-scale-balanced

- **message:** Dictionary cukup untuk record sederhana. Class membantu ketika object perlu validasi, method, invariant, atau beberapa implementasi yang berbagi contract.

##### flow

##### Item 1

- Model
- Tentukan state dan invariant

##### Item 2

- Class
- Buat blueprint

##### Item 3

- Object
- Bangun instance valid

##### Item 4

- Method
- Jalankan behavior terkait

##### deepDive

##### Item 1

- Class menyatukan state dan behavior
- Class adalah blueprint, sedangkan object adalah instance yang memiliki state sendiri. __init__ menerima data awal dan sebaiknya memastikan object tidak lahir dalam kondisi yang tidak valid. Method menggunakan state tersebut untuk melakukan behavior yang memang menjadi tanggung jawab object.
- Untuk DatasetReport, nama dataset, versi, dan summary dapat disimpan bersama method validasi atau export. Ini lebih jelas daripada kumpulan variabel global ketika lifecycle report tumbuh dan beberapa report harus diproses bersamaan.

##### Item 2

- Encapsulation menjaga invariant
- Encapsulation bukan sekadar menyembunyikan atribut. Tujuannya menjaga aturan agar perubahan state melewati jalur yang dapat divalidasi. Jika score harus 0–100, object tidak seharusnya menerima nilai di luar range tanpa status error yang jelas.
- Property atau method setter dapat dipakai bila state perlu dikontrol. Namun jangan menambah abstraksi tanpa manfaat. Untuk data pasif yang hanya dipindahkan, dictionary atau dataclass mungkin lebih ringan dan mudah dibaca.

##### Item 3

- Inheritance bukan pilihan default
- Inheritance berguna ketika subclass benar-benar merupakan jenis dari parent dan harus memenuhi contract yang sama. Composition sering lebih fleksibel: object menerima validator atau formatter sebagai komponen, bukan mewarisi banyak behavior yang tidak dibutuhkan.
- Pada sistem AI, wrapper model atau evaluator dapat berbagi interface predict atau evaluate, tetapi detail provider berbeda. Contract yang kecil memudahkan pertukaran implementasi dan test menggunakan fake object.

##### workedExample

##### Item 1

DatasetReport

##### Item 2

- State
- name, version, dan summary.

##### Item 3

- Invariant
- Nama tidak kosong dan summary berbentuk dictionary.

##### Item 4

- Method
- validate, add_metric, dan export_text.

##### Item 5

- Test
- Buat dua instance untuk memastikan state tidak tercampur.

##### glossary

##### Item 1

- Class
- Blueprint untuk membuat object.

##### Item 2

- Object
- Instance dari class.

##### Item 3

- Method
- Function yang terkait dengan object.

##### Item 4

- Encapsulation
- Menjaga state melalui contract yang jelas.

##### Item 5

- Composition
- Membangun object dari beberapa komponen kecil.

##### quickCheck

- **question:** Dalam OOP, object adalah...
###### options

- Instance dari class
- Blueprint
- Package

- **answer:** 0
- **explanationCorrect:** Tepat. Class mendefinisikan blueprint; object adalah instance-nya.
- **explanationWrong:** Bedakan definisi umum dengan hasil yang dibuat dari definisi tersebut.

##### challenge

- **instruction:** Buat class DatasetReport dengan validasi nama dan method menambah metric.
- **placeholder:** class DatasetReport:
    ...
- **example:** __init__ memvalidasi name; add_metric menyimpan nilai; summary mengembalikan salinan data.

##### mistakes

- Membuat class untuk setiap nilai
- State global dibagi semua instance
- Inheritance terlalu dalam

##### bestPractices

- Jaga invariant di constructor
- Utamakan composition
- Buat method sesuai tanggung jawab object

##### learningOutcomes

- Membedakan class dan object
- Menjaga invariant
- Memilih OOP hanya ketika bermanfaat

- **transition:** Object yang baik tetap harus menghadapi input rusak, file hilang, dan kegagalan eksternal.
##### prompt

- state + behavior -> class
- validate invariant on creation
- prefer composition for flexible parts


#### Program Tangguh: Error & File

- **title:** Program Tangguh: Error & File
- **shortTitle:** Error & File
- **duration:** 30 menit
- **icon:** fas fa-shield
- **summary:** Buat program yang tahan error dan bisa baca/tulis file.
##### objectives

- Menangani error dengan try/except
- Membaca/menulis file

- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/06-topic.html
##### hook

- **question:** except Exception: pass membuat program lebih tangguh?
###### answerA

- **label:** Ya
- **text:** Semua error hilang dari layar.
- **icon:** fas fa-eye-slash

###### answerB

- **label:** Tidak
- **text:** Kegagalan tersembunyi dan data dapat menjadi salah.
- **icon:** fas fa-triangle-exclamation

- **message:** Program tangguh bukan program yang diam. Ia menangkap error yang dipahami, memberi konteks, dan menentukan recovery yang aman.

##### flow

##### Item 1

- Attempt
- Jalankan operasi berisiko

##### Item 2

- Catch
- Tangkap exception spesifik

##### Item 3

- Explain
- Berikan pesan yang dapat ditindaklanjuti

##### Item 4

- Recover
- Retry, skip, fallback, atau stop

##### deepDive

##### Item 1

- Exception adalah bagian dari contract
- File dapat hilang, schema dapat berubah, dan nilai dapat gagal dikonversi. try/except dipakai di sekitar operasi yang memang dapat gagal, bukan membungkus seluruh program. Tangkap FileNotFoundError, ValueError, atau exception spesifik lain agar response sesuai penyebab.
- Pesan error perlu menyebut apa yang gagal, input yang relevan, dan langkah perbaikan. Jangan menampilkan credential atau data sensitif. Logging teknis dapat lebih rinci, sedangkan pesan peserta harus jelas dan aman.

##### Item 2

- File I/O membutuhkan lifecycle dan encoding
- with open(...) memastikan file ditutup meski proses gagal. Mode r membaca, w menimpa, dan a menambahkan. Karena w dapat merusak raw data, output cleaning harus menggunakan path baru dan ideally pemeriksaan apakah tujuan sudah ada.
- Encoding UTF-8 mencegah banyak masalah karakter Indonesia. Pathlib membantu membangun path lintas sistem operasi. Sebelum membaca, validasi keberadaan file; setelah menulis, periksa bahwa output dapat dibuka kembali dan jumlah record sesuai harapan.

##### Item 3

- Recovery harus eksplisit
- Tidak semua error boleh dilewati. Record individual yang invalid dapat dicatat dan dilewati, tetapi schema utama yang hilang sebaiknya menghentikan pipeline. Retry cocok untuk kegagalan sementara, bukan input permanen yang salah.
- finally dipakai untuk cleanup yang harus selalu terjadi. Dalam banyak operasi file, context manager sudah menangani cleanup sehingga finally tambahan tidak diperlukan. Pilih mekanisme paling sederhana yang tetap menjaga resource dan data.

##### workedExample

##### Item 1

Membaca participants.csv

##### Item 2

- Precheck
- Pastikan path ada dan extension sesuai.

##### Item 3

- Read
- Gunakan context manager atau Pandas dengan encoding jelas.

##### Item 4

- Validate
- Periksa header dan tipe dasar.

##### Item 5

- Recover
- File hilang memberi instruksi; schema buruk menghentikan cleaning.

##### glossary

##### Item 1

- Exception
- Object yang mewakili kegagalan runtime.

##### Item 2

- Traceback
- Jejak pemanggilan menuju lokasi error.

##### Item 3

- Context manager
- Pengelola resource melalui blok with.

##### Item 4

- Encoding
- Aturan mengubah karakter menjadi byte.

##### Item 5

- Recovery
- Tindakan aman setelah kegagalan.

##### quickCheck

- **question:** Mengapa memakai with saat membuka file?
###### options

- File ditutup otomatis
- Semua error hilang
- Path tidak diperlukan

- **answer:** 0
- **explanationCorrect:** Benar. Context manager menjaga lifecycle file.
- **explanationWrong:** Pikirkan resource apa yang harus selalu dibersihkan.

##### challenge

- **instruction:** Baca file score dan tangani file hilang, nilai invalid, serta output yang tidak boleh menimpa raw.
- **placeholder:** try:
    ...
except FileNotFoundError:
    ...
- **example:** Input dibaca dari participants.csv; hasil ditulis ke participants_clean.csv; exception spesifik memberi pesan recovery.

##### mistakes

- except kosong
- Menimpa raw file
- Pesan error tanpa recovery

##### bestPractices

- Tangkap exception spesifik
- Gunakan with dan UTF-8
- Pisahkan raw dan derived output

##### learningOutcomes

- Mendesain error handling
- Membaca file dengan aman
- Memilih recovery sesuai dampak

- **transition:** Data sudah dapat dibaca dengan aman; berikutnya library numerik mempercepat operasi array.
##### prompt

- catch only understood exceptions
- message = cause + context + recovery
- never overwrite raw data


#### Ekosistem & NumPy

- **title:** Ekosistem & NumPy
- **shortTitle:** NumPy
- **duration:** 25 menit
- **icon:** fas fa-calculator
- **summary:** Jelajahi ekosistem Python untuk AI dan komputasi numerik dengan NumPy.
##### objectives

- Memahami ekosistem library AI
- Menggunakan NumPy array

- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/07-topic.html
##### hook

- **question:** NumPy hanya list Python dengan nama lain?
###### answerA

- **label:** Sama
- **text:** Keduanya menyimpan banyak angka.
- **icon:** fas fa-list

###### answerB

- **label:** Berbeda
- **text:** Array memiliki shape, dtype, dan operasi vectorized.
- **icon:** fas fa-border-all

- **message:** NumPy memberi struktur numerik homogen dan operasi teroptimasi. Shape dan dtype menjadi contract penting sebelum data masuk model.

##### flow

##### Item 1

- Array
- Bangun data numerik

##### Item 2

- Inspect
- Periksa shape dan dtype

##### Item 3

- Vectorize
- Terapkan operasi tanpa loop manual

##### Item 4

- Summarize
- Hitung statistik dan validasi

##### deepDive

##### Item 1

- Ekosistem Python dibagi berdasarkan tanggung jawab
- Standard library menangani path, JSON, tanggal, dan utilitas dasar. NumPy fokus pada array numerik, Pandas pada data tabular, visualisasi pada chart, dan framework ML pada model. Memahami batas ini mencegah peserta memakai library besar untuk masalah kecil atau mencampur layer tanpa alasan.
- Import sebaiknya eksplisit dan dependency dicatat. Alias umum seperti np dan pd membantu komunikasi tim, tetapi pembaca tetap harus tahu object berasal dari library mana. Hindari wildcard import karena asal function menjadi tidak jelas.

##### Item 2

- Array memiliki shape dan dtype
- Shape menjelaskan jumlah elemen pada setiap dimensi. Vector satu dimensi, matrix dua dimensi, dan tensor dapat memiliki lebih banyak dimensi. Banyak error AI berasal dari shape yang tidak sesuai, sehingga pemeriksaan shape harus dilakukan sebelum operasi atau pemanggilan model.
- Dtype menentukan representasi nilai dan kebutuhan memori. Campuran angka dan teks dapat membuat array bertipe object atau string, lalu operasi statistik gagal atau memberi hasil mengejutkan. Bersihkan dan konversi data secara eksplisit.

##### Item 3

- Vectorization mengubah cara berpikir
- Operasi scores / 100 diterapkan ke seluruh array tanpa menulis loop per elemen. Selain ringkas, implementasi vectorized biasanya berjalan pada kode teroptimasi. Boolean mask seperti scores >= 75 menghasilkan array kondisi yang dapat dipakai untuk filtering.
- Missing numeric value sering direpresentasikan sebagai NaN. np.mean dapat menghasilkan NaN, sedangkan np.nanmean mengabaikannya. Mengabaikan bukan selalu keputusan yang benar; tim tetap harus menghitung berapa missing dan menjelaskan kebijakan yang dipakai.

##### workedExample

##### Item 1

Audit array score

##### Item 2

- Create
- Konversi score valid menjadi array float.

##### Item 3

- Inspect
- Cetak shape, dtype, dan jumlah NaN.

##### Item 4

- Compute
- Mean, median, min, max, serta normalization.

##### Item 5

- Validate
- Bandingkan jumlah input dan output statistik.

##### glossary

##### Item 1

- Array
- Struktur numerik multidimensi.

##### Item 2

- Shape
- Ukuran pada setiap dimensi.

##### Item 3

- Dtype
- Tipe penyimpanan elemen array.

##### Item 4

- Vectorization
- Operasi pada banyak elemen sekaligus.

##### Item 5

- Boolean mask
- Array kondisi untuk memilih elemen.

##### quickCheck

- **question:** Apa yang dijelaskan scores.shape?
###### options

- Dimensi array
- Nama file
- Versi Python

- **answer:** 0
- **explanationCorrect:** Tepat. Shape menunjukkan ukuran setiap dimensi.
- **explanationWrong:** Cari metadata yang menjelaskan struktur array.

##### challenge

- **instruction:** Audit array score dengan NaN: tampilkan shape, dtype, valid count, mean, median, dan normalization.
- **placeholder:** scores = np.array([...])
...
- **example:** Hitung missing secara terpisah, lalu gunakan operasi nan-aware hanya dengan alasan yang terdokumentasi.

##### mistakes

- Tidak memeriksa shape
- Mencampur string dan angka
- Mengabaikan NaN tanpa mencatatnya

##### bestPractices

- Inspect shape dan dtype
- Gunakan vectorization
- Dokumentasikan kebijakan missing

##### learningOutcomes

- Membaca contract array
- Menggunakan operasi vectorized
- Menghitung statistik secara sadar missing value

- **transition:** Array kuat untuk numerik; Pandas menambahkan label kolom dan workflow cleaning tabular.
##### prompt

- inspect shape + dtype
- validate missing
- vectorize transformations
- reconcile counts


#### Data & Mini Workflow

- **title:** Data & Mini Workflow
- **shortTitle:** Pandas & Workflow
- **duration:** 35 min
- **icon:** fas fa-table
- **summary:** Baca, bersihkan, analisis data dengan Pandas dalam mini AI workflow.
##### objectives

- Membaca data dengan Pandas
- Membersihkan data
- Mini AI workflow

- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/08-topic.html
##### hook

- **question:** Dataset tanpa missing otomatis siap untuk AI?
###### answerA

- **label:** Siap
- **text:** Tidak ada sel kosong berarti bersih.
- **icon:** fas fa-circle-check

###### answerB

- **label:** Belum
- **text:** Duplikat, range, label, leakage, dan representasi masih perlu diaudit.
- **icon:** fas fa-magnifying-glass-chart

- **message:** Cleaning adalah rangkaian keputusan. Dataset clean secara teknis belum otomatis valid, adil, atau relevan.

##### flow

##### Item 1

- Load
- Baca raw tanpa menimpa

##### Item 2

- Inspect
- Shape, schema, type, missing

##### Item 3

- Clean
- Aturan eksplisit dan terukur

##### Item 4

- Validate
- Rekonsiliasi perubahan

##### Item 5

- Save
- Simpan output dan report

##### deepDive

##### Item 1

- DataFrame memberi label pada data tabular
- DataFrame menyimpan baris dan kolom dengan nama, tipe, serta index. Setelah read_csv, jangan langsung membuat model. Periksa head untuk contoh baris, shape untuk ukuran, columns untuk schema, dtypes untuk tipe, dan missing count untuk kelengkapan.
- describe memberi statistik awal tetapi tidak menggantikan pemahaman domain. Nilai rata-rata yang terlihat wajar dapat menyembunyikan outlier, unit yang salah, atau kelompok kecil yang tidak terwakili.

##### Item 2

- Cleaning harus memiliki alasan dan audit trail
- dropna, fillna, drop_duplicates, dan type conversion adalah keputusan yang dapat mengubah makna data. Missing score tidak selalu boleh diisi nol karena nol adalah nilai nyata. Median mungkin masuk akal pada latihan, tetapi pada keputusan penting tim harus memahami mekanisme missing dan dampaknya.
- Simpan jumlah raw, duplicate, invalid type, out-of-range, missing, dan clean. Angka akhir harus dapat direkonsiliasi. Simpan output ke file baru dan catat versi aturan agar proses dapat diulang pada dataset berikutnya.

##### Item 3

- Pipeline memisahkan load, validate, clean, summarize, dan save
- Setiap tahap menerima input dan mengembalikan output yang jelas. load_data hanya membaca; validate_schema memastikan kolom; clean_data membuat salinan dan menerapkan aturan; build_report menghitung perubahan; save_outputs menulis derived files. Pemisahan ini membuat test dan diagnosis jauh lebih mudah.
- Sebelum output dipakai model, periksa leakage, label quality, representasi kelompok, relevansi fitur, dan perubahan distribusi. Data bersih berarti aturan cleaning berhasil dijalankan—bukan bukti bahwa dataset sudah adil atau cukup untuk menjawab use case.

##### workedExample

##### Item 1

Dataset nilai workshop

##### Item 2

- Load
- Baca participants.csv sebagai raw input.

##### Item 3

- Validate
- Pastikan name, track, dan score tersedia.

##### Item 4

- Clean
- Salin, deduplicate, convert score, filter range.

##### Item 5

- Report
- Rekonsiliasi raw hingga clean dan agregasi per track.

##### Item 6

- Save
- Tulis participants_clean.csv, track_summary.csv, dan report.txt.

##### glossary

##### Item 1

- DataFrame
- Tabel berlabel baris dan kolom.

##### Item 2

- Missing value
- Nilai yang tidak tersedia.

##### Item 3

- Data leakage
- Informasi yang seharusnya tidak tersedia masuk ke proses model.

##### Item 4

- Audit trail
- Catatan perubahan data dan alasannya.

##### Item 5

- Derived data
- Data baru hasil transformasi raw data.

##### quickCheck

- **question:** Mengapa raw dataset tidak boleh ditimpa?
###### options

- Agar transformasi dapat diaudit dan diulang
- Karena Pandas tidak bisa menulis
- Agar folder lebih banyak

- **answer:** 0
- **explanationCorrect:** Benar. Raw data menjadi baseline untuk audit dan reproduksi.
- **explanationWrong:** Pikirkan bagaimana tim membuktikan perubahan bila input asli hilang.

##### challenge

- **instruction:** Rancang pipeline load, validate, clean, summarize, dan save beserta audit count setiap tahap.
- **placeholder:** def load_data(...):
...
Audit count: ...
- **example:** Raw 100 = clean 90 + duplicate 3 + missing 4 + invalid 3; seluruh output ditulis ke file baru.

##### mistakes

- Menimpa raw dataset
- Mengisi semua missing dengan nol
- Menganggap clean berarti representatif

##### bestPractices

- Inspect sebelum transform
- Rekonsiliasi jumlah baris
- Versikan rule dan output

##### learningOutcomes

- Mengaudit DataFrame
- Mendesain cleaning yang dapat dijelaskan
- Membangun mini workflow end-to-end

- **transition:** Fondasi Python selesai. Practice, quiz, dan diskusi berikutnya menguji workflow yang sama secara progresif.
##### prompt

- load -> inspect -> validate
- clean a copy
- report every change
- save derived outputs
- review leakage + representation


#### PYTHON_GUIDES

#### Item 1

##### hook

- **question:** Python populer untuk AI karena paling cepat. Benarkah?
###### answerA

- **label:** Benar
- **text:** Kecepatan runtime adalah alasan utamanya.
- **icon:** fas fa-gauge-high

###### answerB

- **label:** Belum tepat
- **text:** Keterbacaan, ekosistem, eksperimen, dan integrasi jauh lebih menentukan.
- **icon:** fas fa-bridge

- **message:** Python sering menjadi lapisan orkestrasi. Operasi berat tetap dijalankan library teroptimasi, sementara Python membuat workflow mudah dibaca dan diuji.

##### flow

##### Item 1

- Masalah
- Definisikan input, proses, output

##### Item 2

- Environment
- Isolasi dependency dan versi

##### Item 3

- Eksperimen
- Jalankan langkah kecil dan amati

##### Item 4

- Workflow
- Susun proses yang dapat diulang

##### deepDive

##### Item 1

- Python adalah penghubung, bukan AI itu sendiri
- Python memberi bahasa yang konsisten untuk membaca data, memanggil library numerik, menjalankan eksperimen, menyimpan artefak, dan menghubungkan model ke aplikasi. Ketika peserta memahami peran ini, mereka tidak lagi menganggap satu fungsi library sebagai sihir; mereka dapat menelusuri dari input sampai output serta menunjukkan bagian mana yang melakukan transformasi.
- Keunggulan Python bukan berarti setiap operasi dieksekusi paling cepat oleh interpreter. NumPy, Pandas, PyTorch, dan banyak library lain memindahkan komputasi berat ke implementasi teroptimasi. Python tetap berada di atasnya sebagai lapisan yang ekspresif, sehingga tim dapat mengubah ide menjadi eksperimen tanpa kehilangan keterbacaan.

##### Item 2

- Environment adalah bagian dari reproducibility
- Kode yang benar di satu laptop dapat gagal di laptop lain karena versi Python, package, atau dependency berbeda. Virtual environment memisahkan kebutuhan setiap project sehingga upgrade satu eksperimen tidak merusak eksperimen lain. File dependency dan catatan versi membuat anggota tim dapat membangun ulang lingkungan yang sama.
- Notebook cocok untuk eksplorasi bertahap, tetapi urutan cell tersembunyi dapat menghasilkan state yang sulit dilacak. Untuk workflow berulang, pindahkan logika stabil ke function atau file Python, jalankan dari awal, lalu pastikan output tidak bergantung pada cell yang pernah dieksekusi diam-diam.

##### Item 3

- Computational thinking sebelum sintaks
- Sebelum menulis kode, pecah masalah menjadi input, aturan, proses, output, dan failure case. Misalnya completion rate memerlukan jumlah peserta selesai dan jumlah peserta total; kondisi total nol harus diputuskan sebelum pembagian dilakukan. Keputusan kecil ini adalah bagian dari desain program, bukan detail sintaks.
- Decomposition membantu peserta menguji satu langkah pada satu waktu. Pattern recognition menemukan proses yang berulang, abstraction memilih detail yang penting, dan algorithmic thinking menyusun urutan yang deterministik. Empat kemampuan tersebut terus dipakai ketika workflow berkembang dari beberapa variabel menjadi pipeline data.

##### workedExample

##### Item 1

Completion rate peserta

##### Item 2

- Input
- Jumlah peserta selesai dan total peserta.

##### Item 3

- Validasi
- Total tidak boleh negatif; total nol ditangani eksplisit.

##### Item 4

- Proses
- completed / total × 100 hanya dijalankan setelah validasi.

##### Item 5

- Output
- Persentase beserta pesan yang menjelaskan kondisi data.

##### glossary

##### Item 1

- Interpreter
- Program yang menjalankan instruksi Python.

##### Item 2

- Environment
- Lingkungan terisolasi berisi Python dan dependency project.

##### Item 3

- Dependency
- Package lain yang dibutuhkan program.

##### Item 4

- Reproducibility
- Kemampuan mengulang proses dengan input dan environment yang sama.

##### Item 5

- Computational thinking
- Cara memecah masalah menjadi langkah yang dapat dieksekusi.

##### quickCheck

- **question:** Mengapa virtual environment penting pada project AI?
###### options

- Mengisolasi versi dependency
- Membuat model otomatis
- Menggantikan dataset

- **answer:** 0
- **explanationCorrect:** Tepat. Isolasi dependency membuat eksperimen lebih stabil dan dapat diulang.
- **explanationWrong:** Coba hubungkan environment dengan perbedaan versi package antarproject.

##### challenge

- **instruction:** Rancang IPO untuk completion rate, termasuk kondisi total peserta nol.
- **placeholder:** Input: ...
Process: ...
Output: ...
Edge case: ...
- **example:** Input completed dan total; validasi total; hitung persentase bila total > 0; bila nol, kembalikan status belum ada data.

##### mistakes

- Menganggap Python adalah model AI
- Menginstal semua package secara global
- Menjalankan notebook tanpa restart-and-run-all

##### bestPractices

- Pisahkan environment per project
- Catat dependency dan versi
- Tulis IPO serta edge case sebelum kode

##### learningOutcomes

- Menjelaskan posisi Python dalam AI
- Membangun environment yang dapat diulang
- Memecah masalah menjadi pipeline kecil

- **transition:** Berikutnya kita menerjemahkan input dan state ke tipe data serta collection yang tepat.
##### prompt

- problem = input + process + output
- validate edge cases before calculation
- record environment and dependency versions


#### Item 2

##### hook

- **question:** Semua data peserta paling mudah disimpan sebagai string. Setuju?
###### answerA

- **label:** Setuju
- **text:** Satu tipe terasa lebih sederhana.
- **icon:** fas fa-font

###### answerB

- **label:** Tidak
- **text:** Tipe data membawa makna dan menentukan operasi yang aman.
- **icon:** fas fa-shapes

- **message:** Nama, score, status, dan kumpulan record memiliki operasi berbeda. Pemilihan tipe yang tepat mengurangi konversi dan error tersembunyi.

##### flow

##### Item 1

- Value
- Kenali makna data

##### Item 2

- Type
- Pilih operasi yang valid

##### Item 3

- Collection
- Susun beberapa nilai

##### Item 4

- Validate
- Periksa bentuk dan isi

##### deepDive

##### Item 1

- Variabel menyimpan state dengan nama bermakna
- Variabel bukan sekadar kotak. Nama variabel mendokumentasikan peran sebuah nilai dan membantu pembaca mengikuti perubahan state. Gunakan nama seperti participant_score atau dataset_version, bukan x atau data1, ketika maknanya penting bagi keputusan berikutnya.
- Tipe int dan float mendukung operasi numerik; str mendukung pengolahan teks; bool menyatakan kondisi; None menandai nilai yang belum tersedia. None tidak sama dengan nol atau string kosong. Menyamakan ketiganya dapat mengubah statistik dan keputusan bisnis.

##### Item 2

- Collection dipilih berdasarkan perilaku
- List menjaga urutan dan dapat berubah, tuple cocok untuk susunan yang stabil, set menghapus keunikan ganda, sedangkan dictionary memetakan key ke value. Record peserta biasanya lebih mudah dibaca sebagai dictionary karena setiap nilai memiliki nama field yang eksplisit.
- Collection dapat bersarang, misalnya list berisi dictionary peserta. Struktur ini mirip data JSON yang sering berpindah antara frontend, backend, dan layanan AI. Sebelum mengakses key, periksa schema dan putuskan apa yang dilakukan jika field hilang atau memiliki tipe yang salah.

##### Item 3

- Mutability memengaruhi efek samping
- List dan dictionary mutable: perubahan pada object yang sama terlihat dari semua referensi yang menunjuk kepadanya. Ini berguna tetapi dapat menimbulkan bug ketika raw data berubah tanpa sengaja. Salin data sebelum cleaning bila versi mentah perlu dipertahankan.
- Operasi collection sebaiknya mengikuti tujuan yang jelas: append untuk menambah record, set untuk deduplikasi nilai sederhana, dan dictionary lookup untuk akses berdasarkan key. Jangan memilih struktur hanya karena sintaksnya paling familiar; pilih berdasarkan urutan, keunikan, kebutuhan perubahan, dan pola akses.

##### workedExample

##### Item 1

Record eksperimen

##### Item 2

- Metadata
- Dictionary menyimpan nama dataset, versi, dan status review.

##### Item 3

- Records
- List menyimpan beberapa dictionary peserta.

##### Item 4

- Validation
- Periksa key name, track, dan score sebelum diproses.

##### Item 5

- Safety
- Salin record sebelum membuat perubahan cleaning.

##### glossary

##### Item 1

- State
- Nilai yang menggambarkan kondisi program saat ini.

##### Item 2

- Mutable
- Object yang isinya dapat diubah.

##### Item 3

- Immutable
- Object yang tidak berubah setelah dibuat.

##### Item 4

- Schema
- Kesepakatan field dan tipe sebuah record.

##### Item 5

- JSON
- Format pertukaran data berbasis object dan array.

##### quickCheck

- **question:** Struktur apa yang paling tepat untuk satu record peserta dengan field name, track, dan score?
###### options

- Dictionary
- Set
- Float

- **answer:** 0
- **explanationCorrect:** Benar. Dictionary memberi nama pada setiap field.
- **explanationWrong:** Pilih struktur yang memetakan nama field ke nilainya.

##### challenge

- **instruction:** Buat metadata dataset dan lima record peserta. Jelaskan alasan memilih setiap tipe data.
- **placeholder:** metadata = {...}
participants = [...]
Alasan: ...
- **example:** Dictionary untuk metadata dan record, list untuk urutan record, float untuk score, bool untuk status review.

##### mistakes

- Mengubah raw list tanpa salinan
- Menyamakan None dengan nol
- Mengakses dictionary key tanpa validasi

##### bestPractices

- Gunakan nama variabel bermakna
- Dokumentasikan schema
- Pilih collection berdasarkan perilaku

##### learningOutcomes

- Memilih tipe berdasarkan makna
- Menyusun nested collection
- Menjelaskan mutability dan efek samping

- **transition:** Data sudah terstruktur; berikutnya program perlu mengambil keputusan dan mengulang proses secara aman.
##### prompt

- meaning -> type
- records -> schema
- validate before transform


#### Item 3

##### hook

- **question:** Jika score kosong, langsung bandingkan dengan threshold 75?
###### answerA

- **label:** Langsung
- **text:** Semua record diperlakukan sama.
- **icon:** fas fa-forward

###### answerB

- **label:** Validasi dulu
- **text:** None atau teks tidak dapat dibandingkan aman dengan angka.
- **icon:** fas fa-shield

- **message:** Urutan kondisi adalah bagian dari correctness. Validasi missing dan tipe harus terjadi sebelum range atau threshold.

##### flow

##### Item 1

- Validate
- Cek missing dan tipe

##### Item 2

- Branch
- Pilih aturan yang cocok

##### Item 3

- Loop
- Terapkan ke setiap record

##### Item 4

- Summarize
- Hitung hasil dan error

##### deepDive

##### Item 1

- Branch mengubah aturan menjadi keputusan eksplisit
- if, elif, dan else dibaca dari atas ke bawah. Kondisi pertama yang benar akan dijalankan, sehingga urutan guard condition sangat penting. Missing value dan tipe invalid harus diperiksa sebelum perbandingan numerik agar program gagal dengan pesan yang jelas, bukan exception yang membingungkan.
- Boundary perlu ditulis sengaja. Jika lulus dimulai dari 75, nilai 74.9 dan 75 harus masuk cabang berbeda. Gunakan contoh di sekitar batas untuk memastikan operator >, >=, <, dan <= sesuai aturan yang sebenarnya.

##### Item 2

- Loop memproses collection tanpa copy-paste
- for loop cocok ketika program membaca setiap record dalam collection. while loop digunakan ketika pengulangan bergantung pada kondisi yang dapat berubah. Setiap loop harus punya tujuan, kondisi berhenti, dan state yang diperbarui agar tidak menjadi infinite loop.
- continue dapat melewati record invalid setelah error dicatat, sedangkan break menghentikan seluruh loop. Pilihan tersebut memiliki konsekuensi: pipeline batch biasanya ingin mengumpulkan semua error, bukan berhenti pada record pertama, tetapi kasus keamanan tertentu memang harus fail fast.

##### Item 3

- Output loop perlu dapat diaudit
- Jangan hanya menghasilkan daftar clean tanpa menjelaskan apa yang terjadi. Catat jumlah raw, valid, missing, invalid, dan out-of-range. Angka-angka ini harus dapat direkonsiliasi sehingga tim tahu apakah record hilang karena aturan yang disengaja.
- Control flow yang baik memisahkan klasifikasi dari side effect. Tentukan status record terlebih dahulu, lalu simpan atau laporkan hasil pada langkah berikutnya. Pemisahan ini membuat aturan lebih mudah diuji dengan input kecil.

##### workedExample

##### Item 1

Validasi score

##### Item 2

- Guard 1
- Jika score None, tandai missing.

##### Item 3

- Guard 2
- Jika bukan angka, tandai invalid type.

##### Item 4

- Guard 3
- Jika di luar 0–100, tandai out of range.

##### Item 5

- Decision
- Nilai valid diklasifikasikan lulus atau review.

##### glossary

##### Item 1

- Branch
- Cabang eksekusi berdasarkan kondisi.

##### Item 2

- Guard condition
- Pemeriksaan awal sebelum proses utama.

##### Item 3

- Boundary
- Nilai tepat di batas aturan.

##### Item 4

- Iteration
- Satu putaran loop.

##### Item 5

- Fail fast
- Menghentikan proses segera ketika kondisi kritis ditemukan.

##### quickCheck

- **question:** Mengapa score is None diperiksa sebelum score >= 75?
###### options

- None tidak dapat dibandingkan dengan angka
- Agar loop lebih cepat
- Agar score berubah menjadi nol

- **answer:** 0
- **explanationCorrect:** Tepat. Guard condition mencegah operasi yang tidak valid.
- **explanationWrong:** Pertimbangkan apa yang terjadi ketika operator >= menerima None.

##### challenge

- **instruction:** Klasifikasikan None, teks, -1, 0, 74.9, 75, 100, dan 101 serta jelaskan urutan guard.
- **placeholder:** Input -> status
...
Urutan guard: ...
- **example:** Missing dan tipe dicek lebih dulu, lalu range 0–100, baru threshold kelulusan.

##### mistakes

- Membandingkan None dengan angka
- Salah memilih > atau >=
- Loop tanpa kondisi berhenti

##### bestPractices

- Uji boundary
- Kumpulkan alasan record ditolak
- Pisahkan validasi dan klasifikasi

##### learningOutcomes

- Menyusun guard condition
- Memproses record dengan loop
- Merekonsiliasi hasil validasi

- **transition:** Aturan sudah berjalan; function akan membuatnya reusable, teruji, dan mudah dirangkai.
##### prompt

- validate missing -> type -> range
- classify valid values
- report every rejected record


#### Item 4

##### hook

- **question:** Satu function besar lebih mudah karena semua kode berada di satu tempat?
###### answerA

- **label:** Lebih mudah
- **text:** Tidak perlu berpindah function.
- **icon:** fas fa-box

###### answerB

- **label:** Sulit dirawat
- **text:** Tanggung jawab bercampur dan test menjadi rumit.
- **icon:** fas fa-diagram-project

- **message:** Function kecil memberi nama pada satu tanggung jawab. Pipeline kemudian merangkainya dalam urutan yang dapat diuji.

##### flow

##### Item 1

- Contract
- Tentukan parameter dan return

##### Item 2

- Responsibility
- Satu function satu tujuan

##### Item 3

- Test
- Uji normal, boundary, invalid

##### Item 4

- Compose
- Rangkai menjadi pipeline

##### deepDive

##### Item 1

- Function adalah kontrak input dan output
- Parameter menjelaskan data yang dibutuhkan, sedangkan return mengirim nilai kepada pemanggil. print hanya menampilkan informasi dan biasanya tidak cukup untuk pipeline karena hasilnya tidak dapat dipakai langkah berikutnya. Function yang baik dapat dijelaskan tanpa membaca seluruh implementasi.
- Default parameter berguna ketika ada nilai standar, tetapi hindari default mutable seperti list kosong karena object yang sama dapat dipakai lintas pemanggilan. Gunakan None lalu buat object baru di dalam function ketika state harus independen.

##### Item 2

- Pipeline kecil mengurangi ketidakkonsistenan
- Copy-paste validation ke beberapa tempat membuat satu perbaikan harus dilakukan berkali-kali. Dengan validate_score, classify_score, dan summarize_scores, setiap aturan memiliki owner yang jelas dan dapat diuji terpisah. run_pipeline hanya mengatur urutan, bukan mengerjakan semua detail.
- Error sebaiknya muncul pada layer yang memahami penyebabnya. Function validasi dapat mengembalikan status terstruktur atau melempar exception spesifik; layer atas memutuskan apakah record dilewati, proses dihentikan, atau pesan ditampilkan.

##### Item 3

- Lambda dan generator dipakai pada kasus yang tepat
- lambda cocok untuk ekspresi sangat singkat seperti key sorting. Ketika logika membutuhkan nama, beberapa kondisi, dokumentasi, atau test, def lebih mudah dipahami. Kode pendek tidak selalu lebih sederhana.
- Generator menghasilkan item satu per satu dengan yield. Ia berguna untuk stream atau dataset besar karena tidak harus menyimpan seluruh hasil di memori. Namun generator hanya dapat dilalui sesuai alurnya; jika hasil perlu dibaca berulang, pertimbangkan materialisasi yang disengaja.

##### workedExample

##### Item 1

Pipeline validasi score

##### Item 2

- validate_score
- Pastikan tipe dan range valid.

##### Item 3

- classify_score
- Ubah score valid menjadi status.

##### Item 4

- summarize_scores
- Hitung jumlah dan statistik.

##### Item 5

- run_pipeline
- Rangkai tahap dan tangani error.

##### glossary

##### Item 1

- Parameter
- Nama input pada definisi function.

##### Item 2

- Argument
- Nilai yang dikirim saat function dipanggil.

##### Item 3

- Return value
- Nilai yang dikirim kembali ke pemanggil.

##### Item 4

- Pure function
- Function yang tidak mengubah state di luar dirinya.

##### Item 5

- Generator
- Function yang menghasilkan nilai bertahap dengan yield.

##### quickCheck

- **question:** Apa perbedaan utama return dan print?
###### options

- return mengirim nilai; print hanya menampilkan
- Keduanya selalu sama
- print hanya untuk angka

- **answer:** 0
- **explanationCorrect:** Benar. Return memungkinkan output dipakai tahap pipeline berikutnya.
- **explanationWrong:** Pikirkan apakah hasil masih dapat disimpan ke variabel setelah function selesai.

##### challenge

- **instruction:** Buat validate_score, classify_score, dan summarize_scores. Uji None, teks, 74.9, 75, dan 100.
- **placeholder:** def validate_score(...):
    ...
- **example:** Setiap function punya satu tanggung jawab; test mencakup normal, boundary, dan invalid input.

##### mistakes

- Function mengerjakan terlalu banyak hal
- Menggunakan print sebagai return
- Lambda berisi logika kompleks

##### bestPractices

- Tulis contract yang jelas
- Uji function secara terpisah
- Gunakan generator hanya saat aliran bertahap berguna

##### learningOutcomes

- Mendesain function kecil
- Membedakan return dan side effect
- Merangkai pipeline reusable

- **transition:** Setelah function, kita mengelompokkan state dan behavior terkait melalui object.
##### prompt

- validate_score(value)
- classify_score(valid_value)
- summarize_scores(values)
- run_pipeline = compose steps


#### Item 5

##### hook

- **question:** Class perlu dipakai untuk setiap dictionary?
###### answerA

- **label:** Selalu
- **text:** OOP membuat semua kode lebih profesional.
- **icon:** fas fa-cubes

###### answerB

- **label:** Sesuai kebutuhan
- **text:** Class berguna ketika state dan behavior memiliki lifecycle bersama.
- **icon:** fas fa-scale-balanced

- **message:** Dictionary cukup untuk record sederhana. Class membantu ketika object perlu validasi, method, invariant, atau beberapa implementasi yang berbagi contract.

##### flow

##### Item 1

- Model
- Tentukan state dan invariant

##### Item 2

- Class
- Buat blueprint

##### Item 3

- Object
- Bangun instance valid

##### Item 4

- Method
- Jalankan behavior terkait

##### deepDive

##### Item 1

- Class menyatukan state dan behavior
- Class adalah blueprint, sedangkan object adalah instance yang memiliki state sendiri. __init__ menerima data awal dan sebaiknya memastikan object tidak lahir dalam kondisi yang tidak valid. Method menggunakan state tersebut untuk melakukan behavior yang memang menjadi tanggung jawab object.
- Untuk DatasetReport, nama dataset, versi, dan summary dapat disimpan bersama method validasi atau export. Ini lebih jelas daripada kumpulan variabel global ketika lifecycle report tumbuh dan beberapa report harus diproses bersamaan.

##### Item 2

- Encapsulation menjaga invariant
- Encapsulation bukan sekadar menyembunyikan atribut. Tujuannya menjaga aturan agar perubahan state melewati jalur yang dapat divalidasi. Jika score harus 0–100, object tidak seharusnya menerima nilai di luar range tanpa status error yang jelas.
- Property atau method setter dapat dipakai bila state perlu dikontrol. Namun jangan menambah abstraksi tanpa manfaat. Untuk data pasif yang hanya dipindahkan, dictionary atau dataclass mungkin lebih ringan dan mudah dibaca.

##### Item 3

- Inheritance bukan pilihan default
- Inheritance berguna ketika subclass benar-benar merupakan jenis dari parent dan harus memenuhi contract yang sama. Composition sering lebih fleksibel: object menerima validator atau formatter sebagai komponen, bukan mewarisi banyak behavior yang tidak dibutuhkan.
- Pada sistem AI, wrapper model atau evaluator dapat berbagi interface predict atau evaluate, tetapi detail provider berbeda. Contract yang kecil memudahkan pertukaran implementasi dan test menggunakan fake object.

##### workedExample

##### Item 1

DatasetReport

##### Item 2

- State
- name, version, dan summary.

##### Item 3

- Invariant
- Nama tidak kosong dan summary berbentuk dictionary.

##### Item 4

- Method
- validate, add_metric, dan export_text.

##### Item 5

- Test
- Buat dua instance untuk memastikan state tidak tercampur.

##### glossary

##### Item 1

- Class
- Blueprint untuk membuat object.

##### Item 2

- Object
- Instance dari class.

##### Item 3

- Method
- Function yang terkait dengan object.

##### Item 4

- Encapsulation
- Menjaga state melalui contract yang jelas.

##### Item 5

- Composition
- Membangun object dari beberapa komponen kecil.

##### quickCheck

- **question:** Dalam OOP, object adalah...
###### options

- Instance dari class
- Blueprint
- Package

- **answer:** 0
- **explanationCorrect:** Tepat. Class mendefinisikan blueprint; object adalah instance-nya.
- **explanationWrong:** Bedakan definisi umum dengan hasil yang dibuat dari definisi tersebut.

##### challenge

- **instruction:** Buat class DatasetReport dengan validasi nama dan method menambah metric.
- **placeholder:** class DatasetReport:
    ...
- **example:** __init__ memvalidasi name; add_metric menyimpan nilai; summary mengembalikan salinan data.

##### mistakes

- Membuat class untuk setiap nilai
- State global dibagi semua instance
- Inheritance terlalu dalam

##### bestPractices

- Jaga invariant di constructor
- Utamakan composition
- Buat method sesuai tanggung jawab object

##### learningOutcomes

- Membedakan class dan object
- Menjaga invariant
- Memilih OOP hanya ketika bermanfaat

- **transition:** Object yang baik tetap harus menghadapi input rusak, file hilang, dan kegagalan eksternal.
##### prompt

- state + behavior -> class
- validate invariant on creation
- prefer composition for flexible parts


#### Item 6

##### hook

- **question:** except Exception: pass membuat program lebih tangguh?
###### answerA

- **label:** Ya
- **text:** Semua error hilang dari layar.
- **icon:** fas fa-eye-slash

###### answerB

- **label:** Tidak
- **text:** Kegagalan tersembunyi dan data dapat menjadi salah.
- **icon:** fas fa-triangle-exclamation

- **message:** Program tangguh bukan program yang diam. Ia menangkap error yang dipahami, memberi konteks, dan menentukan recovery yang aman.

##### flow

##### Item 1

- Attempt
- Jalankan operasi berisiko

##### Item 2

- Catch
- Tangkap exception spesifik

##### Item 3

- Explain
- Berikan pesan yang dapat ditindaklanjuti

##### Item 4

- Recover
- Retry, skip, fallback, atau stop

##### deepDive

##### Item 1

- Exception adalah bagian dari contract
- File dapat hilang, schema dapat berubah, dan nilai dapat gagal dikonversi. try/except dipakai di sekitar operasi yang memang dapat gagal, bukan membungkus seluruh program. Tangkap FileNotFoundError, ValueError, atau exception spesifik lain agar response sesuai penyebab.
- Pesan error perlu menyebut apa yang gagal, input yang relevan, dan langkah perbaikan. Jangan menampilkan credential atau data sensitif. Logging teknis dapat lebih rinci, sedangkan pesan peserta harus jelas dan aman.

##### Item 2

- File I/O membutuhkan lifecycle dan encoding
- with open(...) memastikan file ditutup meski proses gagal. Mode r membaca, w menimpa, dan a menambahkan. Karena w dapat merusak raw data, output cleaning harus menggunakan path baru dan ideally pemeriksaan apakah tujuan sudah ada.
- Encoding UTF-8 mencegah banyak masalah karakter Indonesia. Pathlib membantu membangun path lintas sistem operasi. Sebelum membaca, validasi keberadaan file; setelah menulis, periksa bahwa output dapat dibuka kembali dan jumlah record sesuai harapan.

##### Item 3

- Recovery harus eksplisit
- Tidak semua error boleh dilewati. Record individual yang invalid dapat dicatat dan dilewati, tetapi schema utama yang hilang sebaiknya menghentikan pipeline. Retry cocok untuk kegagalan sementara, bukan input permanen yang salah.
- finally dipakai untuk cleanup yang harus selalu terjadi. Dalam banyak operasi file, context manager sudah menangani cleanup sehingga finally tambahan tidak diperlukan. Pilih mekanisme paling sederhana yang tetap menjaga resource dan data.

##### workedExample

##### Item 1

Membaca participants.csv

##### Item 2

- Precheck
- Pastikan path ada dan extension sesuai.

##### Item 3

- Read
- Gunakan context manager atau Pandas dengan encoding jelas.

##### Item 4

- Validate
- Periksa header dan tipe dasar.

##### Item 5

- Recover
- File hilang memberi instruksi; schema buruk menghentikan cleaning.

##### glossary

##### Item 1

- Exception
- Object yang mewakili kegagalan runtime.

##### Item 2

- Traceback
- Jejak pemanggilan menuju lokasi error.

##### Item 3

- Context manager
- Pengelola resource melalui blok with.

##### Item 4

- Encoding
- Aturan mengubah karakter menjadi byte.

##### Item 5

- Recovery
- Tindakan aman setelah kegagalan.

##### quickCheck

- **question:** Mengapa memakai with saat membuka file?
###### options

- File ditutup otomatis
- Semua error hilang
- Path tidak diperlukan

- **answer:** 0
- **explanationCorrect:** Benar. Context manager menjaga lifecycle file.
- **explanationWrong:** Pikirkan resource apa yang harus selalu dibersihkan.

##### challenge

- **instruction:** Baca file score dan tangani file hilang, nilai invalid, serta output yang tidak boleh menimpa raw.
- **placeholder:** try:
    ...
except FileNotFoundError:
    ...
- **example:** Input dibaca dari participants.csv; hasil ditulis ke participants_clean.csv; exception spesifik memberi pesan recovery.

##### mistakes

- except kosong
- Menimpa raw file
- Pesan error tanpa recovery

##### bestPractices

- Tangkap exception spesifik
- Gunakan with dan UTF-8
- Pisahkan raw dan derived output

##### learningOutcomes

- Mendesain error handling
- Membaca file dengan aman
- Memilih recovery sesuai dampak

- **transition:** Data sudah dapat dibaca dengan aman; berikutnya library numerik mempercepat operasi array.
##### prompt

- catch only understood exceptions
- message = cause + context + recovery
- never overwrite raw data


#### Item 7

##### hook

- **question:** NumPy hanya list Python dengan nama lain?
###### answerA

- **label:** Sama
- **text:** Keduanya menyimpan banyak angka.
- **icon:** fas fa-list

###### answerB

- **label:** Berbeda
- **text:** Array memiliki shape, dtype, dan operasi vectorized.
- **icon:** fas fa-border-all

- **message:** NumPy memberi struktur numerik homogen dan operasi teroptimasi. Shape dan dtype menjadi contract penting sebelum data masuk model.

##### flow

##### Item 1

- Array
- Bangun data numerik

##### Item 2

- Inspect
- Periksa shape dan dtype

##### Item 3

- Vectorize
- Terapkan operasi tanpa loop manual

##### Item 4

- Summarize
- Hitung statistik dan validasi

##### deepDive

##### Item 1

- Ekosistem Python dibagi berdasarkan tanggung jawab
- Standard library menangani path, JSON, tanggal, dan utilitas dasar. NumPy fokus pada array numerik, Pandas pada data tabular, visualisasi pada chart, dan framework ML pada model. Memahami batas ini mencegah peserta memakai library besar untuk masalah kecil atau mencampur layer tanpa alasan.
- Import sebaiknya eksplisit dan dependency dicatat. Alias umum seperti np dan pd membantu komunikasi tim, tetapi pembaca tetap harus tahu object berasal dari library mana. Hindari wildcard import karena asal function menjadi tidak jelas.

##### Item 2

- Array memiliki shape dan dtype
- Shape menjelaskan jumlah elemen pada setiap dimensi. Vector satu dimensi, matrix dua dimensi, dan tensor dapat memiliki lebih banyak dimensi. Banyak error AI berasal dari shape yang tidak sesuai, sehingga pemeriksaan shape harus dilakukan sebelum operasi atau pemanggilan model.
- Dtype menentukan representasi nilai dan kebutuhan memori. Campuran angka dan teks dapat membuat array bertipe object atau string, lalu operasi statistik gagal atau memberi hasil mengejutkan. Bersihkan dan konversi data secara eksplisit.

##### Item 3

- Vectorization mengubah cara berpikir
- Operasi scores / 100 diterapkan ke seluruh array tanpa menulis loop per elemen. Selain ringkas, implementasi vectorized biasanya berjalan pada kode teroptimasi. Boolean mask seperti scores >= 75 menghasilkan array kondisi yang dapat dipakai untuk filtering.
- Missing numeric value sering direpresentasikan sebagai NaN. np.mean dapat menghasilkan NaN, sedangkan np.nanmean mengabaikannya. Mengabaikan bukan selalu keputusan yang benar; tim tetap harus menghitung berapa missing dan menjelaskan kebijakan yang dipakai.

##### workedExample

##### Item 1

Audit array score

##### Item 2

- Create
- Konversi score valid menjadi array float.

##### Item 3

- Inspect
- Cetak shape, dtype, dan jumlah NaN.

##### Item 4

- Compute
- Mean, median, min, max, serta normalization.

##### Item 5

- Validate
- Bandingkan jumlah input dan output statistik.

##### glossary

##### Item 1

- Array
- Struktur numerik multidimensi.

##### Item 2

- Shape
- Ukuran pada setiap dimensi.

##### Item 3

- Dtype
- Tipe penyimpanan elemen array.

##### Item 4

- Vectorization
- Operasi pada banyak elemen sekaligus.

##### Item 5

- Boolean mask
- Array kondisi untuk memilih elemen.

##### quickCheck

- **question:** Apa yang dijelaskan scores.shape?
###### options

- Dimensi array
- Nama file
- Versi Python

- **answer:** 0
- **explanationCorrect:** Tepat. Shape menunjukkan ukuran setiap dimensi.
- **explanationWrong:** Cari metadata yang menjelaskan struktur array.

##### challenge

- **instruction:** Audit array score dengan NaN: tampilkan shape, dtype, valid count, mean, median, dan normalization.
- **placeholder:** scores = np.array([...])
...
- **example:** Hitung missing secara terpisah, lalu gunakan operasi nan-aware hanya dengan alasan yang terdokumentasi.

##### mistakes

- Tidak memeriksa shape
- Mencampur string dan angka
- Mengabaikan NaN tanpa mencatatnya

##### bestPractices

- Inspect shape dan dtype
- Gunakan vectorization
- Dokumentasikan kebijakan missing

##### learningOutcomes

- Membaca contract array
- Menggunakan operasi vectorized
- Menghitung statistik secara sadar missing value

- **transition:** Array kuat untuk numerik; Pandas menambahkan label kolom dan workflow cleaning tabular.
##### prompt

- inspect shape + dtype
- validate missing
- vectorize transformations
- reconcile counts


#### Item 8

##### hook

- **question:** Dataset tanpa missing otomatis siap untuk AI?
###### answerA

- **label:** Siap
- **text:** Tidak ada sel kosong berarti bersih.
- **icon:** fas fa-circle-check

###### answerB

- **label:** Belum
- **text:** Duplikat, range, label, leakage, dan representasi masih perlu diaudit.
- **icon:** fas fa-magnifying-glass-chart

- **message:** Cleaning adalah rangkaian keputusan. Dataset clean secara teknis belum otomatis valid, adil, atau relevan.

##### flow

##### Item 1

- Load
- Baca raw tanpa menimpa

##### Item 2

- Inspect
- Shape, schema, type, missing

##### Item 3

- Clean
- Aturan eksplisit dan terukur

##### Item 4

- Validate
- Rekonsiliasi perubahan

##### Item 5

- Save
- Simpan output dan report

##### deepDive

##### Item 1

- DataFrame memberi label pada data tabular
- DataFrame menyimpan baris dan kolom dengan nama, tipe, serta index. Setelah read_csv, jangan langsung membuat model. Periksa head untuk contoh baris, shape untuk ukuran, columns untuk schema, dtypes untuk tipe, dan missing count untuk kelengkapan.
- describe memberi statistik awal tetapi tidak menggantikan pemahaman domain. Nilai rata-rata yang terlihat wajar dapat menyembunyikan outlier, unit yang salah, atau kelompok kecil yang tidak terwakili.

##### Item 2

- Cleaning harus memiliki alasan dan audit trail
- dropna, fillna, drop_duplicates, dan type conversion adalah keputusan yang dapat mengubah makna data. Missing score tidak selalu boleh diisi nol karena nol adalah nilai nyata. Median mungkin masuk akal pada latihan, tetapi pada keputusan penting tim harus memahami mekanisme missing dan dampaknya.
- Simpan jumlah raw, duplicate, invalid type, out-of-range, missing, dan clean. Angka akhir harus dapat direkonsiliasi. Simpan output ke file baru dan catat versi aturan agar proses dapat diulang pada dataset berikutnya.

##### Item 3

- Pipeline memisahkan load, validate, clean, summarize, dan save
- Setiap tahap menerima input dan mengembalikan output yang jelas. load_data hanya membaca; validate_schema memastikan kolom; clean_data membuat salinan dan menerapkan aturan; build_report menghitung perubahan; save_outputs menulis derived files. Pemisahan ini membuat test dan diagnosis jauh lebih mudah.
- Sebelum output dipakai model, periksa leakage, label quality, representasi kelompok, relevansi fitur, dan perubahan distribusi. Data bersih berarti aturan cleaning berhasil dijalankan—bukan bukti bahwa dataset sudah adil atau cukup untuk menjawab use case.

##### workedExample

##### Item 1

Dataset nilai workshop

##### Item 2

- Load
- Baca participants.csv sebagai raw input.

##### Item 3

- Validate
- Pastikan name, track, dan score tersedia.

##### Item 4

- Clean
- Salin, deduplicate, convert score, filter range.

##### Item 5

- Report
- Rekonsiliasi raw hingga clean dan agregasi per track.

##### Item 6

- Save
- Tulis participants_clean.csv, track_summary.csv, dan report.txt.

##### glossary

##### Item 1

- DataFrame
- Tabel berlabel baris dan kolom.

##### Item 2

- Missing value
- Nilai yang tidak tersedia.

##### Item 3

- Data leakage
- Informasi yang seharusnya tidak tersedia masuk ke proses model.

##### Item 4

- Audit trail
- Catatan perubahan data dan alasannya.

##### Item 5

- Derived data
- Data baru hasil transformasi raw data.

##### quickCheck

- **question:** Mengapa raw dataset tidak boleh ditimpa?
###### options

- Agar transformasi dapat diaudit dan diulang
- Karena Pandas tidak bisa menulis
- Agar folder lebih banyak

- **answer:** 0
- **explanationCorrect:** Benar. Raw data menjadi baseline untuk audit dan reproduksi.
- **explanationWrong:** Pikirkan bagaimana tim membuktikan perubahan bila input asli hilang.

##### challenge

- **instruction:** Rancang pipeline load, validate, clean, summarize, dan save beserta audit count setiap tahap.
- **placeholder:** def load_data(...):
...
Audit count: ...
- **example:** Raw 100 = clean 90 + duplicate 3 + missing 4 + invalid 3; seluruh output ditulis ke file baru.

##### mistakes

- Menimpa raw dataset
- Mengisi semua missing dengan nol
- Menganggap clean berarti representatif

##### bestPractices

- Inspect sebelum transform
- Rekonsiliasi jumlah baris
- Versikan rule dan output

##### learningOutcomes

- Mengaudit DataFrame
- Mendesain cleaning yang dapat dijelaskan
- Membangun mini workflow end-to-end

- **transition:** Fondasi Python selesai. Practice, quiz, dan diskusi berikutnya menguji workflow yang sama secara progresif.
##### prompt

- load -> inspect -> validate
- clean a copy
- report every change
- save derived outputs
- review leakage + representation


#### PRACTICES

#### Latihan 1 — Input, Process, Output

- **id:** py-1
- **title:** Latihan 1 — Input, Process, Output
- **focus:** Python Dasar
- **prompt:** Kasus:
> Tim ingin menghitung completion rate peserta.

Rancang input, process, dan output. Sertakan aturan ketika total peserta nol dan jelaskan mengapa edge case tersebut harus diputuskan sebelum pembagian.
##### fields

##### Item 1

- jawaban
- Tulis rancangan IPO dan edge case...

- **guide:** Jawaban kuat menyebut completed, total, validasi nilai, rumus persentase, output yang jelas, dan response aman saat total nol.

#### Latihan 2 — Metadata Dataset

- **id:** py-2
- **title:** Latihan 2 — Metadata Dataset
- **focus:** Python Dasar
- **prompt:** Buat variabel untuk nama dataset, versi, jumlah baris, persentase missing value, dan status review. Pilih tipe data yang tepat dan jelaskan makna setiap variabel.
##### fields

##### Item 1

- jawaban
- Tulis kode dan alasan tipe datanya...

- **guide:** Gunakan nama bermakna, string untuk identitas/versi, integer untuk jumlah, float untuk persentase, dan boolean atau status eksplisit untuk review.

#### Latihan 3 — Record Peserta

- **id:** py-3
- **title:** Latihan 3 — Record Peserta
- **focus:** Collection
- **prompt:** Buat list berisi minimal lima dictionary peserta dengan field name, track, dan score. Sertakan satu missing score lalu jelaskan cara memvalidasi schema tanpa mengubah raw record.
##### fields

##### Item 1

- jawaban
- Tulis struktur data dan langkah validasinya...

- **guide:** List menjaga kumpulan record; dictionary memberi nama field. Buat salinan sebelum cleaning dan bedakan None dari nol.

#### Latihan 4 — Validasi dengan Control Flow

- **id:** py-4
- **title:** Latihan 4 — Validasi dengan Control Flow
- **focus:** Control Flow
- **prompt:** Loop seluruh record. Tandai score kosong, tipe salah, di luar 0–100, lulus, atau perlu review. Uji boundary 0, 74.9, 75, dan 100.
##### fields

##### Item 1

- jawaban
- Tulis kode validasi dan hasil boundary test...

- **guide:** Urutan guard: missing, type, range, lalu threshold. Catat alasan setiap record ditolak agar jumlah dapat direkonsiliasi.

#### Latihan 5 — Function Pipeline

- **id:** py-5
- **title:** Latihan 5 — Function Pipeline
- **focus:** Function
- **prompt:** Buat function validate_score, classify_score, dan summarize_scores. Setiap function harus memiliki satu tanggung jawab dan return value yang bisa dipakai tahap berikutnya.
##### fields

##### Item 1

- jawaban
- Tulis tiga function dan test kecil...

- **guide:** Pisahkan validasi, klasifikasi, dan agregasi. Uji None, teks, 74.9, 75, 100, serta nilai di luar range.

#### Latihan 6 — Generator Record Valid

- **id:** py-6
- **title:** Latihan 6 — Generator Record Valid
- **focus:** Function
- **prompt:** Buat generator yang menerima kumpulan record dan menghasilkan hanya record valid satu per satu. Jelaskan kapan generator lebih tepat daripada membangun list baru.
##### fields

##### Item 1

- jawaban
- Tulis generator dan alasan penggunaannya...

- **guide:** Gunakan yield setelah validasi. Generator berguna untuk aliran besar atau bertahap, tetapi pertimbangkan materialisasi bila hasil harus dibaca berulang.

#### Latihan 7 — Object dan Error

- **id:** py-7
- **title:** Latihan 7 — Object dan Error
- **focus:** OOP & Error
- **prompt:** Buat class DatasetReport yang menyimpan nama dataset dan summary. Validasi nama kosong dan tangani input summary yang bukan dictionary dengan pesan yang dapat ditindaklanjuti.
##### fields

##### Item 1

- jawaban
- Tulis class, invariant, dan error handling...

- **guide:** Constructor menjaga invariant. Tangkap atau raise exception spesifik; jangan menyembunyikan error dengan except kosong.

#### Latihan 8 — File yang Aman

- **id:** py-8
- **title:** Latihan 8 — File yang Aman
- **focus:** OOP & Error
- **prompt:** Simpan dataset kecil ke participants.csv lalu baca kembali. Gunakan UTF-8, tangani file hilang, dan pastikan output cleaning tidak menimpa raw file.
##### fields

##### Item 1

- jawaban
- Tulis kode file I/O dan recovery path...

- **guide:** Gunakan with atau library yang mengelola file, path input/output berbeda, serta pesan jelas untuk FileNotFoundError.

#### Latihan 9 — Audit NumPy

- **id:** py-9
- **title:** Latihan 9 — Audit NumPy
- **focus:** NumPy & Pandas
- **prompt:** Konversi score valid ke NumPy array. Periksa shape dan dtype, lalu hitung valid count, mean, median, minimum, maksimum, dan normalization ke 0–1.
##### fields

##### Item 1

- jawaban
- Tulis operasi NumPy dan interpretasinya...

- **guide:** Periksa shape/dtype sebelum statistik. Hitung missing terpisah dan jelaskan bila memakai operasi nan-aware.

#### Latihan 10 — Cleaning Pandas

- **id:** py-10
- **title:** Latihan 10 — Cleaning Pandas
- **focus:** NumPy & Pandas
- **prompt:** Baca CSV, periksa shape, kolom, tipe, dan missing value. Hapus duplikat, perbaiki tipe score, filter range, agregasi per track, lalu simpan output baru.
##### fields

##### Item 1

- jawaban
- Tulis pipeline Pandas dan alasan tiap keputusan...

- **guide:** Mulai dari inspect, clean pada salinan, dokumentasikan missing policy, dan jangan menimpa participants.csv.

#### Latihan 11 — Audit Cleaning

- **id:** py-11
- **title:** Latihan 11 — Audit Cleaning
- **focus:** Workflow Data
- **prompt:** Buat laporan jumlah baris raw, duplicate, invalid type, out-of-range, missing, dan clean. Tunjukkan persamaan rekonsiliasi yang membuktikan tidak ada record hilang tanpa alasan.
##### fields

##### Item 1

- jawaban
- Tulis audit count dan persamaan rekonsiliasi...

- **guide:** Contoh: raw = clean + duplicate + missing + invalid. Hindari double-count dengan aturan kategori yang eksplisit.

#### Latihan 12 — Workflow Utuh

- **id:** py-12
- **title:** Latihan 12 — Workflow Utuh
- **focus:** Workflow Data
- **prompt:** Gabungkan load, validate, clean, summarize, dan save dalam function terpisah. Tambahkan schema check, error message, participants_clean.csv, track_summary.csv, dan report.txt.
##### fields

##### Item 1

- jawaban
- Tulis desain pipeline end-to-end...

- **guide:** Function orkestrasi hanya mengatur tahap. Setiap tahap punya contract, output baru, test kecil, dan failure behavior yang jelas.

#### QUIZ

#### Item 1

#### Item 1

Peran Python dalam workflow AI paling tepat adalah...

#### Item 2

- AI itu sendiri
- Bahasa yang menghubungkan data, library, eksperimen, dan aplikasi
- Hanya kalkulator
- Pengganti dataset

#### Item 3

1

#### Item 4

Python menghubungkan tahap data, library, eksperimen, evaluasi, dan aplikasi; Python bukan AI itu sendiri.

#### Item 2

#### Item 1

Kapan notebook lebih cocok daripada file .py?

#### Item 2

- Eksplorasi bertahap dengan kode dan catatan
- Semua production service
- Menyimpan password
- Menggantikan virtual environment

#### Item 3

0

#### Item 4

Notebook cocok untuk eksplorasi bertahap yang menggabungkan kode, output, dan catatan, selama urutan eksekusinya tetap terkontrol.

#### Item 3

#### Item 1

Fungsi utama virtual environment adalah...

#### Item 2

- Membuat GPU
- Mengisolasi dependency project
- Membersihkan dataset
- Menghapus Python

#### Item 3

1

#### Item 4

Virtual environment mengisolasi versi dependency agar kebutuhan satu project tidak merusak project lain.

#### Item 4

#### Item 1

Dalam IPO, menghitung rata-rata termasuk...

#### Item 2

- Input
- Process
- Output
- Package

#### Item 3

1

#### Item 4

Menghitung rata-rata adalah proses yang mengubah input angka menjadi output ringkasan.

#### Item 5

#### Item 1

Tipe data yang tepat untuk prompt adalah...

#### Item 2

- str
- int
- bool
- set

#### Item 3

0

#### Item 4

Prompt berupa teks, sehingga tipe dasarnya adalah str.

#### Item 6

#### Item 1

Struktur yang paling menyerupai object JSON adalah...

#### Item 2

- Tuple
- Dictionary
- Set
- Float

#### Item 3

1

#### Item 4

Dictionary menyimpan pasangan key-value seperti object JSON.

#### Item 7

#### Item 1

Mengapa score is None diperiksa sebelum score >= 75?

#### Item 2

- Agar kode lebih panjang
- None tidak dapat dibandingkan dengan angka
- Semua score adalah None
- Python selalu mengubah None menjadi nol

#### Item 3

1

#### Item 4

Guard untuk None harus dijalankan lebih dulu karena None tidak dapat dibandingkan langsung dengan angka.

#### Item 8

#### Item 1

Perbedaan utama return dan print adalah...

#### Item 2

- Tidak ada
- return mengirim nilai ke pemanggil, print hanya menampilkan
- print lebih aman
- return hanya untuk string

#### Item 3

1

#### Item 4

return membuat hasil dapat dipakai tahap pipeline berikutnya; print hanya menampilkannya.

#### Item 9

#### Item 1

Kapan lambda sebaiknya digunakan?

#### Item 2

- Untuk logika panjang
- Untuk ekspresi singkat dan jelas
- Untuk menangani semua error
- Untuk membuka file

#### Item 3

1

#### Item 4

Lambda cocok untuk ekspresi pendek yang tetap mudah dibaca, bukan logika bercabang panjang.

#### Item 10

#### Item 1

Keuntungan generator adalah...

#### Item 2

- Selalu lebih cepat untuk semua kasus
- Menghasilkan nilai bertahap saat dibutuhkan
- Menyimpan semua data dua kali
- Menggantikan Pandas

#### Item 3

1

#### Item 4

Generator memakai yield untuk menghasilkan item bertahap tanpa selalu menyimpan seluruh hasil sekaligus.

#### Item 11

#### Item 1

Dalam OOP, object adalah...

#### Item 2

- Blueprint
- Instance dari class
- Error
- Package

#### Item 3

1

#### Item 4

Class adalah blueprint, sedangkan object adalah instance yang memiliki state sendiri.

#### Item 12

#### Item 1

Praktik exception handling terbaik adalah...

#### Item 2

- Menangkap semua error dan diam
- Menangkap exception spesifik dan memberi pesan jelas
- Tidak pernah memakai try
- Melanjutkan data rusak

#### Item 3

1

#### Item 4

Exception spesifik dan pesan yang dapat ditindaklanjuti menjaga error tetap terlihat dan mudah didiagnosis.

#### Item 13

#### Item 1

Mengapa menggunakan with saat membuka file?

#### Item 2

- File ditutup otomatis
- File menjadi AI
- Tidak perlu path
- Semua error hilang

#### Item 3

0

#### Item 4

Context manager menutup file secara otomatis, termasuk ketika operasi di dalam blok gagal.

#### Item 14

#### Item 1

Library yang fokus pada data tabular adalah...

#### Item 2

- OpenCV
- Pandas
- Matplotlib
- pathlib

#### Item 3

1

#### Item 4

Pandas menyediakan Series dan DataFrame untuk data tabular.

#### Item 15

#### Item 1

scores.shape pada NumPy menjelaskan...

#### Item 2

- Nama file
- Dimensi array
- Missing value
- Versi Python

#### Item 3

1

#### Item 4

shape menjelaskan ukuran array pada setiap dimensi.

#### Item 16

#### Item 1

Apa fungsi np.nanmean()?

#### Item 2

- Menghapus file
- Menghitung mean sambil mengabaikan NaN
- Mengisi semua NaN dengan nol
- Membuat DataFrame

#### Item 3

1

#### Item 4

np.nanmean menghitung mean sambil mengabaikan NaN; kebijakan terhadap missing tetap harus dijelaskan.

#### Item 17

#### Item 1

Langkah pertama setelah membaca CSV sebaiknya...

#### Item 2

- Langsung membangun model
- Memeriksa shape, kolom, tipe, missing value, dan contoh baris
- Menghapus semua baris
- Menimpa file

#### Item 3

1

#### Item 4

Inspeksi awal memastikan schema dan kualitas data dipahami sebelum transformasi.

#### Item 18

#### Item 1

Mengapa missing score tidak selalu diisi nol?

#### Item 2

- Nol tidak ada di Python
- Nol memiliki makna dan dapat mengubah statistik
- Pandas tidak mendukung nol
- CSV tidak mendukung angka

#### Item 3

1

#### Item 4

Nol adalah nilai nyata; menggunakannya sebagai pengganti missing dapat mengubah distribusi dan keputusan.

#### Item 19

#### Item 1

groupby("track")["score"].mean() digunakan untuk...

#### Item 2

- Menghapus track
- Menghitung rata-rata score per track
- Membuat virtual environment
- Mengubah score menjadi string

#### Item 3

1

#### Item 4

groupby membentuk kelompok per track lalu mean merangkum score setiap kelompok.

#### Item 20

#### Item 1

Mengapa raw dataset tidak boleh ditimpa?

#### Item 2

- Agar transformasi dapat diaudit dan diulang
- Agar folder lebih banyak
- Karena Pandas tidak bisa menulis
- Agar model lebih kompleks

#### Item 3

0

#### Item 4

Raw dataset adalah baseline audit dan reproduksi; hasil cleaning harus disimpan sebagai derived output baru.

#### DISCUSSION_PROMPTS

- Mengapa Python dominan dalam AI meskipun bukan selalu bahasa dengan runtime tercepat?
- Kapan notebook membantu eksplorasi, dan kapan hidden state membuat hasil sulit dipercaya?
- Apakah menghapus missing value selalu benar? Bukti apa yang diperlukan sebelum memilih aturan cleaning?
- Dataset tanpa missing value apakah otomatis siap untuk Machine Learning?

#### SOURCE_VISUALS

##### 01-topic.html

- **eyebrow:** Workflow Map
- **title:** Dari masalah ke program yang dapat diulang
- **description:** Lihat peran Python pada setiap lapisan workflow AI.
###### options

###### Item 1

- Problem
- fas fa-bullseye
- Tujuan
- Definisikan pengguna, input, output, dan failure case sebelum memilih library.
- Completion rate harus menangani total peserta nol.

###### Item 2

- Environment
- fas fa-box-archive
- Reproducibility
- Isolasi versi Python dan dependency agar hasil dapat dibangun ulang.
- Gunakan virtual environment dan dependency file.

###### Item 3

- Code
- fas fa-code
- Orchestration
- Python menghubungkan data, library, eksperimen, dan aplikasi.
- Komputasi berat dapat berjalan di library teroptimasi.

###### Item 4

- Evidence
- fas fa-clipboard-check
- Verifikasi
- Jalankan dari awal dan pastikan output tidak bergantung pada state tersembunyi.
- Restart-and-run-all pada notebook.


##### 02-topic.html

- **eyebrow:** Data Model Lab
- **title:** Pilih struktur dari perilakunya
- **description:** Tipe data menentukan operasi, validasi, dan risiko perubahan state.
###### options

###### Item 1

- Scalar
- fas fa-hashtag
- Satu nilai
- Gunakan str, int, float, bool, atau None sesuai maknanya.
- Score kosong bukan otomatis nol.

###### Item 2

- Sequence
- fas fa-list
- Urutan
- List menyimpan record berurutan dan dapat berubah.
- Daftar peserta diproses satu per satu.

###### Item 3

- Mapping
- fas fa-diagram-project
- Field bernama
- Dictionary membuat schema record lebih eksplisit.
- name, track, dan score menyerupai object JSON.

###### Item 4

- Set
- fas fa-filter
- Keunikan
- Set berguna untuk membership dan deduplikasi sederhana.
- Jangan pakai bila urutan harus dipertahankan.


##### 03-topic.html

- **eyebrow:** Decision Lab
- **title:** Urutan guard menentukan correctness
- **description:** Ikuti record dari validasi menuju klasifikasi dan laporan.
###### options

###### Item 1

- Missing
- fas fa-circle-question
- Guard pertama
- Pisahkan nilai yang tidak tersedia sebelum operasi numerik.
- None tidak dapat dibandingkan dengan 75.

###### Item 2

- Type
- fas fa-font
- Guard kedua
- Pastikan score benar-benar numerik.
- String '80' perlu konversi yang tervalidasi.

###### Item 3

- Range
- fas fa-arrows-left-right
- Guard ketiga
- Periksa score berada pada domain 0–100.
- -1 dan 101 ditolak dengan alasan.

###### Item 4

- Classify
- fas fa-code-branch
- Keputusan
- Baru setelah valid, tentukan lulus atau review.
- Uji boundary 74.9 dan 75.


##### 04-topic.html

- **eyebrow:** Function Pipeline
- **title:** Satu tanggung jawab per function
- **description:** Rangkai contract kecil menjadi pipeline yang mudah diuji.
###### options

###### Item 1

- Validate
- fas fa-shield
- Input contract
- Periksa missing, type, dan range tanpa mencampur presentasi.
- validate_score mengembalikan status jelas.

###### Item 2

- Transform
- fas fa-gears
- Pure logic
- Ubah input valid menjadi hasil yang dapat dipakai tahap berikutnya.
- classify_score tidak menulis file.

###### Item 3

- Summarize
- fas fa-chart-simple
- Aggregation
- Hitung statistik dari kumpulan nilai valid.
- Boundary diuji terpisah.

###### Item 4

- Compose
- fas fa-link
- Pipeline
- Function orkestrasi mengatur urutan dan error recovery.
- load → validate → classify → summarize.


##### 05-topic.html

- **eyebrow:** Object Design
- **title:** Kapan state layak menjadi object
- **description:** Bedakan record sederhana dari object yang memiliki invariant dan behavior.
###### options

###### Item 1

- State
- fas fa-box
- Data object
- Simpan nilai yang memiliki lifecycle bersama.
- DatasetReport menyimpan name dan summary.

###### Item 2

- Invariant
- fas fa-lock
- Aturan valid
- Constructor menjaga object tidak lahir dalam kondisi rusak.
- Nama dataset tidak boleh kosong.

###### Item 3

- Method
- fas fa-screwdriver-wrench
- Behavior
- Letakkan operasi yang benar-benar terkait dengan state.
- add_metric memperbarui report.

###### Item 4

- Composition
- fas fa-cubes-stacked
- Komponen
- Gabungkan validator atau exporter tanpa inheritance berlebihan.
- Implementasi mudah diganti saat test.


##### 06-topic.html

- **eyebrow:** Failure Recovery
- **title:** Error yang jelas lebih aman daripada diam
- **description:** Pilih response berdasarkan jenis dan dampak kegagalan.
###### options

###### Item 1

- Detect
- fas fa-magnifying-glass
- Exception spesifik
- Tangkap kegagalan yang benar-benar dipahami.
- FileNotFoundError berbeda dari ValueError.

###### Item 2

- Explain
- fas fa-message
- Actionable message
- Sebutkan penyebab, konteks aman, dan langkah perbaikan.
- Jangan bocorkan credential.

###### Item 3

- Recover
- fas fa-life-ring
- Tindakan
- Retry, skip, fallback, atau stop dipilih sesuai risiko.
- Schema hilang harus menghentikan cleaning.

###### Item 4

- Protect
- fas fa-file-shield
- Raw data
- Gunakan with dan tulis output ke path baru.
- participants_clean.csv tidak menimpa raw.


##### 07-topic.html

- **eyebrow:** Array Inspector
- **title:** Shape dan dtype adalah contract
- **description:** Audit struktur numerik sebelum melakukan statistik atau modeling.
###### options

###### Item 1

- Shape
- fas fa-border-all
- Dimensi
- Pastikan ukuran array sesuai operasi berikutnya.
- Vector dan matrix mempunyai contract berbeda.

###### Item 2

- Dtype
- fas fa-tag
- Representasi
- Tipe elemen menentukan operasi dan penggunaan memori.
- Campuran teks dapat mengubah dtype.

###### Item 3

- Vectorize
- fas fa-bolt
- Operasi massal
- Terapkan transformasi tanpa loop manual.
- scores / 100 bekerja pada seluruh array.

###### Item 4

- Missing
- fas fa-circle-exclamation
- NaN policy
- Hitung missing dan jelaskan keputusan nan-aware.
- np.nanmean bukan alasan mengabaikan kualitas data.


##### 08-topic.html

- **eyebrow:** Data Workflow
- **title:** Cleaning yang dapat diaudit
- **description:** Ikuti raw data sampai output bersih dan report yang dapat direkonsiliasi.
###### options

###### Item 1

- Load
- fas fa-file-csv
- Raw input
- Baca file tanpa menimpa atau mengubah baseline.
- Simpan path dan versi input.

###### Item 2

- Inspect
- fas fa-magnifying-glass-chart
- Data profiling
- Periksa shape, schema, dtype, missing, duplicate, dan range.
- Jangan langsung membangun model.

###### Item 3

- Clean
- fas fa-broom
- Rules
- Terapkan aturan pada salinan dan catat alasan perubahan.
- Missing tidak selalu diisi nol.

###### Item 4

- Report
- fas fa-file-lines
- Audit trail
- Rekonsiliasi raw, removed, dan clean lalu simpan derived output.
- Data clean belum otomatis representatif.



#### PRACTICE_TOPICS

#### Item 1

- **start:** 0
- **end:** 2
- **label:** Python & Data Dasar

#### Item 2

- **start:** 3
- **end:** 5
- **label:** Control Flow & Function

#### Item 3

- **start:** 6
- **end:** 7
- **label:** OOP, Error & File

#### Item 4

- **start:** 8
- **end:** 9
- **label:** NumPy & Pandas

#### Item 5

- **start:** 10
- **end:** 11
- **label:** Workflow Data
