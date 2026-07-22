(function () {
    const STORAGE = {
        chapter: "heraiAiReasoningCurrentChapter",
        practice: "heraiAiReasoningPractice",
        quizDone: "heraiAiReasoningQuizDone",
        quizScore: "heraiAiReasoningQuizScore",
        quizAnswers: "heraiAiReasoningQuizAnswers",
        discussion: "heraiAiReasoningDiscussion"
    };

    const SOURCE_BASE = "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/";

        const CHAPTERS = [
    {
        "title": "Dari Menjawab ke Menalar",
        "shortTitle": "Dari Menjawab ke Menalar",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Reasoning AI menghubungkan fakta dan asumsi secara runtut.",
        "objectives": [
            "Menjelaskan reasoning dalam konteks sistem AI",
            "Memisahkan fakta, asumsi, batasan, dan kesimpulan",
            "Mengidentifikasi informasi yang hilang dalam jawaban AI",
            "Membuat kesimpulan bersyarat berdasarkan data yang tersedia"
        ],
        "analogy": "Seperti menjawab soal cerita, kita tidak bisa langsung menebak. Harus dicari data apa yang diketahui dan langkah perhitungannya — kalau ada yang belum diketahui, kita catat dulu sebagai asumsi.",
        "hook": {
            "question": "Seorang panitia bertanya ke AI: \"Apakah anggaran konsumsi workshop cukup?\"",
            "answerA": {
                "label": "Jawaban A",
                "text": "Ya, anggarannya cukup.",
                "icon": "fas fa-bolt"
            },
            "answerB": {
                "label": "Jawaban B",
                "text": "Biaya dasar adalah 50 \u00d7 Rp35.000 = Rp1.750.000. Anggaran Rp2.000.000 menyisakan Rp250.000. Namun ongkir, pajak, dan konsumsi panitia belum diketahui. Kesimpulan: biaya dasar cukup, tetapi total final perlu dikonfirmasi.",
                "icon": "fas fa-list-check"
            },
            "message": "Belum ada penilaian. Simpan pilihanmu berdasarkan intuisi. Setelah mempelajari chapter ini, kamu akan memeriksa kembali alasan pilihan tersebut."
        },
        "opening": [
            "Bayangkan seorang peserta meminta AI: \"Hitung apakah anggaran konsumsi acara cukup untuk seluruh peserta.\"",
            "Untuk menjawab dengan benar, AI perlu memahami: berapa jumlah peserta, berapa biaya konsumsi per peserta, apakah ada biaya tambahan, berapa anggaran yang tersedia, operasi apa yang harus dilakukan, dan bagaimana menentukan bahwa anggaran cukup atau tidak.",
            "Pertanyaan tersebut berbeda dari pertanyaan sederhana seperti \"Apa arti kata algoritma?\" — di mana AI cukup menghasilkan definisi berdasarkan pola yang telah dipelajari.",
            "Pada pertanyaan anggaran, AI perlu <strong>menghubungkan beberapa data</strong> dan menjalankan urutan penyelesaian. Inilah yang disebut <strong>reasoning</strong> atau penalaran."
        ],
        "recallVsReasoningTable": {
            "left": {"title": "Recall / Pengambilan Informasi", "rows": ["Menghasilkan informasi yang sudah dikenali", "Biasanya dapat dijawab dalam satu langkah", "Contoh: definisi algoritma", "Fokus pada \"apa\""]},
            "right": {"title": "Reasoning / Penalaran", "rows": ["Menghubungkan beberapa informasi untuk memperoleh hasil baru", "Sering membutuhkan beberapa langkah", "Contoh: menghitung dan membandingkan anggaran", "Fokus pada \"bagaimana\" dan \"mengapa\""]}
        },
        "concepts": [
            {"title": "Apa Itu Reasoning dalam AI?", "content": ["Dalam konteks LLM, <strong>reasoning</strong> adalah istilah praktis untuk menggambarkan kemampuan model menggunakan instruksi, konteks, pola yang dipelajari, langkah perantara, dan hasil sebelumnya untuk menghasilkan respons yang sesuai dengan tugas.", "LLM pada dasarnya bekerja dengan memprediksi token berikutnya. Namun, pola yang dipelajari dalam skala besar dapat menghasilkan perilaku seperti: mengikuti aturan, membandingkan alternatif, menghubungkan beberapa fakta, melakukan perhitungan bertahap, menyusun rencana, dan memperbaiki jawaban setelah menerima informasi baru."]},
            {"title": "Tahapan Penalaran Sederhana", "diagram": ["Memahami permintaan", "Mengidentifikasi tujuan", "Mengambil informasi relevan", "Mengenali informasi yang hilang", "Menentukan hubungan antar informasi", "Menyusun langkah penyelesaian", "Menghasilkan hasil", "Memeriksa hasil"], "content": ["Model mental berikut dapat digunakan untuk membaca bagaimana AI menyelesaikan sebuah tugas. Setiap tahap saling terkait — melewatkan satu saja dapat membuat jawaban AI terlihat benar tetapi sebenarnya tidak lengkap atau menyesatkan."]},
            {"title": "Empat Elemen Penting", "table": {"headers": ["Elemen", "Pengertian", "Contoh"], "rows": [["Fakta", "Informasi yang diberikan atau sudah diverifikasi", "Peserta berjumlah 60 orang"], ["Asumsi", "Informasi yang dianggap benar agar proses dapat dilanjutkan", "Semua peserta menerima satu paket konsumsi"], ["Langkah", "Operasi atau proses yang dilakukan", "60 \u00d7 Rp35.000"], ["Kesimpulan", "Hasil yang ditarik dari fakta dan langkah", "Anggaran cukup dengan sisa Rp650.000"]]}, "content": ["Empat elemen berikut sering tercampur dalam jawaban AI. Membedakannya adalah keterampilan dasar untuk menilai kualitas reasoning."]}
        ],
        "flow": [
            ["Memahami", "Tujuan dan batasan"],
            ["Fakta", "Data relevan yang tersedia"],
            ["Asumsi", "Informasi yang dianggap benar"],
            ["Hubungan", "Kaitan antar informasi"],
            ["Kesimpulan", "Hasil penalaran"]
        ],
        "example": {
            "title": "Contoh Terurai: Perhitungan Anggaran",
            "case": "Anggaran: Rp3.000.000, Peserta: 60 orang, Konsumsi: Rp35.000 per orang, Biaya administrasi: Rp250.000",
            "steps": [
                {"label": "Langkah 1", "text": "Hitung konsumsi: 60 \u00d7 Rp35.000 = Rp2.100.000"},
                {"label": "Langkah 2", "text": "Tambahkan biaya administrasi: Rp2.100.000 + Rp250.000 = Rp2.350.000"},
                {"label": "Langkah 3", "text": "Bandingkan dengan anggaran: Rp3.000.000 \u2212 Rp2.350.000 = Rp650.000"}
            ],
            "conclusion": "Anggaran mencukupi. Setelah biaya konsumsi dan administrasi, terdapat sisa Rp650.000.",
            "commonErrors": [
                "Melupakan biaya administrasi — AI hanya menghitung konsumsi dan menyatakan sisa Rp900.000",
                "Salah membaca angka — Rp35.000 dibaca sebagai Rp350.000",
                "Salah operasi — anggaran dikalikan dengan jumlah peserta",
                "Kesimpulan tanpa perhitungan — AI menyatakan anggaran cukup karena \"terlihat besar\"",
                "Tidak menyatakan asumsi — AI menganggap seluruh peserta menerima konsumsi tanpa menyebutkan asumsi tersebut"
            ]
        },
        "lab": {
            "eyebrow": "Reasoning Anatomy Explorer",
            "title": "Eksplorasi Tiga Mode Reasoning",
            "description": "Klik setiap tab untuk melihat perbedaan cara AI memproses informasi.",
            "options": [
                ["Jawab Langsung", "fas fa-bolt", "Insting Cepat", "Jawaban singkat tanpa langkah. Cocok untuk definisi sederhana, tetapi berbahaya untuk tugas kompleks.", "Pertanyaan fakta tunggal: \"Apa arti kata algoritma?\""],
                ["Reasoning", "fas fa-brain", "Hubungan Logis", "Menghubungkan beberapa informasi untuk memperoleh hasil baru melalui langkah bertahap.", "Tugas perhitungan, audit, atau perbandingan dengan beberapa variabel."],
                ["Fakta & Asumsi", "fas fa-layer-group", "Pemisahan Data", "Fakta adalah informasi tersedia. Asumsi adalah anggapan agar proses bisa dilanjutkan. Wajib dibedakan.", "Menentukan apakah \"semua peserta hadir\" adalah fakta atau asumsi."]
            ]
        },
        "quickCheck": {
            "question": "AI berkata \"anggaran pasti cukup\" tanpa menunjukkan perhitungan. Apa yang salah dari jawaban tersebut?",
            "options": [
                "AI menebak tanpa menghubungkan data yang tersedia",
                "AI sudah benar karena menggunakan kata 'pasti'",
                "AI tidak perlu menunjukkan perhitungan"
            ],
            "answer": 0,
            "explanationCorrect": "Benar. AI menyimpulkan tanpa menghubungkan data. Reasoning yang baik harus menunjukkan bagaimana kesimpulan ditarik dari fakta yang tersedia — bukan sekadar menebak atau merasa yakin.",
            "explanationWrong": "Belum tepat. Perhatikan bahwa AI tidak menunjukkan data atau langkah perhitungan sama sekali. Kata 'pasti' justru berbahaya ketika tidak didukung bukti."
        },
        "llmExample": "AI menghitung anggaran acara: harus memisahkan harga per orang, jumlah peserta, biaya tambahan, lalu melakukan perhitungan secara runtut — bukan langsung menebak hasil akhir.",
        "prompt": [
            "Pisahkan fakta dan asumsi yang ada dalam data.",
            "Tentukan informasi yang belum tersedia.",
            "Susun langkah penyelesaian secara runtut.",
            "Periksa kembali kesimpulan terhadap batasan yang ada."
        ],
        "challenge": {
            "instruction": "Cari satu contoh ketika LLM memberikan jawaban yang terdengar meyakinkan tetapi ternyata salah perhitungan. Tuliskan temuannya di bawah.",
            "placeholder": "Tulis temuanmu di sini... Misalnya: AI diminta menghitung 45 × Rp30.000 dan menjawab Rp1.250.000 (seharusnya Rp1.350.000)...",
            "example": "Contoh: AI diminta menghitung biaya acara dengan data 50 peserta × Rp25.000 + biaya sewa Rp400.000. AI menjawab total Rp1.250.000 karena melupakan biaya sewa. Jawaban benar: Rp1.650.000, artinya justru kurang Rp150.000 dari anggaran Rp1.500.000."
        },
        "mistakes": [
            "Membuat asumsi tersembunyi tanpa menyatakannya",
            "Salah memahami tujuan utama pertanyaan",
            "Terlalu percaya diri — menggunakan kata 'pasti' tanpa bukti"
        ],
        "bestPractices": [
            "Nyatakan semua asumsi secara eksplisit di awal",
            "Tulis ulang tujuan dan batasan sebelum mulai",
            "Gunakan kesimpulan bersyarat: \"Jika asumsi X benar, maka...\"",
            "Verifikasi apakah ada informasi penting yang hilang"
        ],
        "learningOutcomes": [
            "Membedakan jawaban langsung dan reasoning yang terstruktur",
            "Memisahkan fakta, asumsi, langkah, dan kesimpulan",
            "Menemukan informasi yang hilang dalam jawaban AI",
            "Membuat kesimpulan bersyarat berdasarkan data yang tersedia"
        ],
        "transition": "Berikutnya kita akan mempelajari cara memverifikasi reasoning — menemukan kesalahan, memeriksa urutan langkah, dan membedakan jawaban yang meyakinkan dari jawaban yang benar-benar valid.",
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/01-full.html"
    },
    {
        "title": "Reasoning yang Dapat Diperiksa",
        "shortTitle": "Reasoning Dapat Diperiksa",
        "duration": "25 menit",
        "icon": "fas fa-check-double",
        "summary": "Penjelasan meyakinkan bukan jaminan valid. Setiap langkah reasoning AI wajib diperiksa.",
        "objectives": [
            "Mengidentifikasi kesalahan umum dalam reasoning AI",
            "Memeriksa hasil penalaran AI secara sistematis",
            "Membedakan jawaban meyakinkan dan jawaban valid"
        ],
        "analogy": "Seperti guru matematika memeriksa langkah ujian siswa, bukan cuma jawaban akhirnya. Siswa bisa dapat jawaban benar dengan cara salah, atau sebaliknya — jawaban salah dengan langkah yang hampir benar.",
        "hook": {
            "question": "AI memberikan jawaban panjang dan terstruktur tentang perhitungan anggaran. Apakah jawaban tersebut pasti benar?",
            "answerA": {"label": "Pasti benar", "text": "Karena AI menjelaskan langkahnya dengan detail.", "icon": "fas fa-circle-check"},
            "answerB": {"label": "Belum tentu benar", "text": "Karena langkah yang rapi bisa saja mengandung kesalahan perhitungan atau data.", "icon": "fas fa-magnifying-glass"},
            "message": "Simpan pilihanmu dulu. Di chapter ini kamu akan belajar bahwa penjelasan yang rapi dan meyakinkan tidak selalu berarti benar."
        },
        "opening": [
            "Bayangkan AI memberikan jawaban panjang dengan langkah-langkah yang terlihat rapi. Sebagai pengguna, apakah kamu langsung percaya?",
            "Jawaban AI yang terdengar meyakinkan bisa menutupi kesalahan logika. Inilah mengapa <strong>verifikasi</strong> adalah keterampilan wajib — bukan hanya untuk engineer, tetapi untuk siapa pun yang menggunakan AI dalam pekerjaan sehari-hari."
        ],
        "recallVsReasoningTable": {
            "left": {"title": "Jawaban Meyakinkan", "rows": ["Bahasa lancar dan percaya diri", "Terlihat rapi dan terstruktur", "Bisa menutupi kesalahan data", "Sering diterima tanpa diperiksa", "Contoh: \"Anggaran pasti cukup\""]},
            "right": {"title": "Jawaban Valid", "rows": ["Data dan langkah dapat diverifikasi", "Asumsi dinyatakan secara eksplisit", "Perhitungan dapat diulang", "Kesimpulan mengikuti bukti", "Contoh: \"Jika asumsi X benar, maka...\""]}
        },
        "concepts": [
            {"title": "Checklist Verifikasi Reasoning", "content": ["Gunakan checklist berikut setiap kali membaca output AI yang melibatkan perhitungan atau keputusan:", "<strong>\u2610 Apakah AI menjawab pertanyaan yang benar?</strong>", "<strong>\u2610 Apakah tujuan dan batasan dipahami?</strong>", "<strong>\u2610 Apakah informasi yang dipakai tersedia?</strong>", "<strong>\u2610 Apakah fakta dan asumsi dibedakan?</strong>", "<strong>\u2610 Apakah asumsi penting disebutkan?</strong>", "<strong>\u2610 Apakah urutan langkah masuk akal?</strong>", "<strong>\u2610 Apakah perhitungan dapat diulang?</strong>", "<strong>\u2610 Apakah kesimpulan mengikuti data?</strong>", "<strong>\u2610 Apakah ada alternatif yang perlu dipertimbangkan?</strong>", "<strong>\u2610 Apakah tingkat keyakinan sesuai dengan bukti?</strong>"]},
            {"title": "Kesalahan Umum dalam Reasoning AI", "content": ["Berikut adalah 10 kesalahan yang sering muncul dalam reasoning AI:"], "numberedList": ["Salah memahami tujuan — AI menjawab topik yang berhubungan, tetapi tidak menjawab tugas utama.", "Mengabaikan batasan — AI memberikan solusi yang melebihi anggaran, waktu, atau kapasitas.", "Menggunakan informasi tidak relevan — AI memasukkan detail yang tidak memengaruhi hasil.", "Membuat asumsi tersembunyi — AI menganggap sesuatu benar tanpa mengatakannya.", "Mengarang fakta — AI menambahkan data, sumber, atau kondisi yang tidak tersedia.", "Salah urutan langkah — AI menggunakan hasil yang belum dihitung atau melewati dependensi.", "Salah perhitungan — Langkah terlihat benar, tetapi operasi atau angkanya salah.", "Tidak memeriksa hasil — AI berhenti setelah memperoleh angka tanpa memeriksa apakah angka masuk akal.", "Terlalu percaya diri — AI menggunakan kata \"pasti\" pada hasil yang masih bergantung pada asumsi.", "Penjelasan meyakinkan tetapi tidak valid — Bahasa yang lancar dapat menutupi kesalahan logika."]}
        ],
        "flow": [
            ["Cek Data", "Apakah semua data relevan sudah dipakai?"],
            ["Cek Urutan", "Apakah langkah masuk akal dan tidak melompat?"],
            ["Cek Hasil", "Apakah angka dan satuan konsisten?"]
        ],
        "example": {
            "title": "Contoh: Temukan Kesalahan",
            "case": "AI diminta menghitung: 50 peserta dengan harga Rp25.000 per orang dan biaya sewa Rp400.000. Anggaran Rp1.500.000.",
            "steps": [
                {"label": "Jawaban AI (salah)", "text": "50 \u00d7 Rp25.000 = Rp1.250.000. Sisa: Rp1.500.000 \u2212 Rp1.250.000 = Rp250.000. Anggaran cukup."},
                {"label": "Kesalahan", "text": "AI melupakan biaya sewa Rp400.000!"},
                {"label": "Perhitungan benar", "text": "50 \u00d7 Rp25.000 = Rp1.250.000. Total: Rp1.250.000 + Rp400.000 = Rp1.650.000. Kekurangan: Rp150.000."}
            ],
            "conclusion": "Anggaran justru kurang Rp150.000 — kebalikan dari kesimpulan AI. Satu data yang terlewat bisa membalikkan keputusan sepenuhnya.",
            "commonErrors": []
        },
        "lab": {
            "eyebrow": "Error Spotting Lab",
            "title": "Deteksi Kesalahan Reasoning",
            "description": "Klik setiap tab untuk melihat jenis kesalahan yang berbeda dalam reasoning AI.",
            "options": [
                ["Data Hilang", "fas fa-magnifying-glass", "Missing Information", "AI melewatkan data penting yang seharusnya dihitung.", "Contoh: melupakan biaya sewa dalam perhitungan total."],
                ["Salah Hitung", "fas fa-calculator", "Calculation Error", "Langkah terlihat benar tetapi hasil perkalian atau penjumlahan salah.", "80 \u00d7 Rp27.500 = Rp2.020.000 (seharusnya Rp2.200.000)."],
                ["Asumsi Tersembunyi", "fas fa-eye-slash", "Hidden Assumption", "AI mengasumsikan sesuatu tanpa menyatakannya — membuat kesimpulan terlihat valid padahal tidak.", "\"Semua peserta hadir\" tanpa konfirmasi kehadiran."]
            ]
        },
        "quickCheck": {
            "question": "Jawaban AI memiliki langkah yang panjang dan terstruktur. Apakah ini menjamin jawabannya benar?",
            "options": ["Ya, karena strukturnya rapi dan lengkap", "Belum tentu — langkah atau data dasarnya bisa saja salah", "Tidak tahu, yang penting kedengarannya profesional"],
            "answer": 1,
            "explanationCorrect": "Benar. Kelancaran dan struktur yang rapi tidak sama dengan kebenaran. Langkah bisa terlihat sempurna tetapi mengandung kesalahan data, perhitungan, atau asumsi tersembunyi. Selalu verifikasi.",
            "explanationWrong": "Belum tepat. Bahasa yang rapi dan percaya diri adalah ciri AI modern — tetapi bukan jaminan validitas. Coba periksa: apakah data dasarnya benar? Apakah perhitungannya bisa diulang?"
        },
        "llmExample": "AI diminta menghitung total biaya acara. AI menuliskan 5 langkah dengan rapi, tetapi salah mengalikan harga dengan 0 — menghasilkan total yang jauh lebih kecil dari seharusnya. Struktur rapi, hasil salah.",
        "prompt": ["Periksa apakah semua data relevan sudah dipakai dalam perhitungan ini.", "Cari informasi yang mungkin terlewat atau disembunyikan.", "Ulangi perhitungan dan bandingkan hasilnya."],
        "challenge": {
            "instruction": "AI memberikan jawaban berikut: \"Untuk 45 peserta dengan harga Rp30.000 per orang, total biaya Rp1.250.000.\" Temukan kesalahannya dan tulis perhitungan yang benar.",
            "placeholder": "Tulis temuanmu...",
            "example": "Perhitungan benar: 45 \u00d7 Rp30.000 = Rp1.350.000. AI salah menghitung — selisih Rp100.000. Kesalahan perkalian sederhana seperti ini sering terjadi pada LLM."
        },
        "mistakes": ["Percaya penjelasan meyakinkan tanpa verifikasi", "Malas memvalidasi output karena 'terlihat benar'", "Mengabaikan satu langkah yang ternyata kritis"],
        "bestPractices": ["Selalu ulangi perhitungan kunci secara manual", "Periksa satuan dan konsistensi angka", "Bandingkan hasil dengan ekspektasi kasar (sanity check)", "Tanyakan: apakah ada data yang belum dipakai?"],
        "learningOutcomes": ["Memeriksa reasoning AI menggunakan checklist sistematis", "Mengenali 10 jenis kesalahan umum dalam reasoning AI", "Membedakan jawaban yang meyakinkan dari jawaban yang valid", "Melakukan verifikasi perhitungan secara mandiri"],
        "transition": "Berikutnya kita akan mempelajari Planning — bagaimana AI memecah tugas besar menjadi langkah-langkah kecil yang bisa dikerjakan satu per satu.",
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/02-full.html"
    },
    {
        "title": "Planning & Problem Decomposition",
        "shortTitle": "Planning",
        "duration": "30 menit",
        "icon": "fas fa-layer-group",
        "summary": "Rencana memecah tugas besar jadi langkah eksekusi dengan dependensi yang benar.",
        "objectives": [
            "Memecah tugas besar menjadi subtugas yang dapat dikerjakan",
            "Menyusun rencana statis dan dinamis",
            "Mengidentifikasi dependensi dan melakukan replanning"
        ],
        "analogy": "Mengadakan acara butuh urutan yang tepat: tentukan tujuan dulu, baru cari tempat, baru sebar undangan. Kalau tempat berubah di tengah jalan, rencana harus disesuaikan — bukan dipaksakan.",
        "hook": {
            "question": "Kamu diminta menyelenggarakan workshop AI dalam 2 minggu. Apa yang kamu lakukan pertama kali?",
            "answerA": {"label": "Langsung buat materi", "text": "Mulai menulis slide dan menyiapkan contoh kode.", "icon": "fas fa-pen-to-square"},
            "answerB": {"label": "Tentukan tujuan dulu", "text": "Tentukan siapa pesertanya, apa tujuan belajarnya, berapa durasinya, dan fasilitas apa yang tersedia.", "icon": "fas fa-bullseye"},
            "message": "Simpan pilihanmu. Di chapter ini kamu akan belajar bahwa planning yang baik dimulai dari goal dan constraints — bukan langsung eksekusi."
        },
        "opening": ["Permintaan seperti \"Buat workshop pengenalan AI\" terlihat sederhana. Namun sebenarnya terdiri atas banyak keputusan: siapa pesertanya, apa tujuan belajarnya, berapa durasinya, materi apa, bagaimana latihannya, fasilitas apa yang tersedia.", "Sistem AI yang langsung menghasilkan jadwal tanpa memahami bagian-bagian tersebut berisiko membuat rencana yang tidak realistis. Di sinilah <strong>planning</strong> dan <strong>problem decomposition</strong> berperan."],
        "concepts": [
            {"title": "Enam Komponen Planning", "content": ["Planning adalah proses mengubah tujuan menjadi urutan langkah yang dapat dilaksanakan. Enam komponen utamanya:"], "numberedList": ["<strong>Goal</strong> — Hasil akhir yang ingin dicapai. Harus spesifik: \"Workshop 2 jam untuk 50 pemula dengan praktik dan kuis\" lebih baik daripada \"Workshop yang bagus\".", "<strong>Initial State</strong> — Kondisi awal: 50 peserta, 2 mentor, 1 proyektor, internet tidak stabil, ruangan 120 menit.", "<strong>Constraints</strong> — Batasan: waktu, anggaran, jumlah orang, kapasitas ruangan, kebijakan, akses alat, kemampuan peserta.", "<strong>Actions</strong> — Tindakan: menentukan materi, membuat slide, menyiapkan demo, membagi kelompok, membuat kuis.", "<strong>Dependencies</strong> — Ketergantungan: materi harus selesai sebelum slide dibuat; slide harus selesai sebelum presentasi.", "<strong>Success Criteria</strong> — Kapan rencana dianggap berhasil: total durasi 120 menit, ada aktivitas praktik, semua sesi punya tujuan."]},
            {"title": "Problem Decomposition", "content": ["Problem decomposition adalah proses memecah tugas besar menjadi bagian yang lebih kecil, lebih jelas, dan dapat dikerjakan. Subtugas yang baik harus: memiliki tujuan jelas, memiliki input, menghasilkan output, dapat dikerjakan, dapat diperiksa, tidak terlalu besar dan tidak terlalu kecil."]},
            {"title": "Static vs Dynamic Planning", "content": ["<strong>Static Planning:</strong> Rencana dibuat di awal dan dijalankan tanpa perubahan. Cocok ketika kondisi stabil, data lengkap, dan risiko perubahan rendah.", "<strong>Dynamic Planning:</strong> Rencana dapat diperbarui berdasarkan hasil atau informasi baru. Replanning bukan tanda kegagalan — dalam lingkungan yang berubah, replanning justru menunjukkan kecerdasan sistem."]}
        ],
        "flow": [
            ["Goal", "Tujuan akhir yang terukur"],
            ["Constraints", "Batasan yang harus dipatuhi"],
            ["Subtasks", "Pecahan tugas kecil"],
            ["Dependencies", "Urutan dan ketergantungan"],
            ["Success", "Kriteria keberhasilan"]
        ],
        "example": {
            "title": "Contoh: Rencana Workshop yang Melanggar Batasan",
            "case": "Workshop 90 menit. Rencana AI: pembukaan 15 menit, materi 35 menit, demo 25 menit, latihan 30 menit, kuis 15 menit.",
            "steps": [
                {"label": "Masalah", "text": "Total rencana: 15 + 35 + 25 + 30 + 15 = 120 menit — melebihi durasi 90 menit yang tersedia."},
                {"label": "Solusi", "text": "Rencana harus dipangkas atau disusun ulang. Misalnya: pembukaan 10 menit, materi 25 menit, demo 15 menit, latihan 25 menit, kuis 15 menit = 90 menit."}
            ],
            "conclusion": "AI yang tidak memeriksa constraints akan menghasilkan rencana yang tidak bisa dijalankan. Selalu jumlahkan durasi dan bandingkan dengan batasan.",
            "commonErrors": []
        },
        "lab": {
            "eyebrow": "Replanning Simulator",
            "title": "Simulasi Perubahan Rencana",
            "description": "Klik setiap tab untuk melihat bagaimana rencana harus beradaptasi terhadap perubahan kondisi.",
            "options": [
                ["Rencana Awal", "fas fa-clipboard-list", "Static Plan", "Workshop direncanakan menggunakan lab komputer dan demo online. Semua materi sudah siap.", "Kondisi ideal — semua berjalan sesuai rencana."],
                ["Internet Mati", "fas fa-wifi-slash", "Constraint Change", "30 menit sebelum acara, internet mati. Demo online tidak bisa dijalankan.", "Replanning: ganti demo online menjadi demo offline atau simulasi berbasis screenshot."],
                ["Setengah Komputer Rusak", "fas fa-computer-slash", "Resource Change", "Di hari H, setengah komputer di lab tidak bisa digunakan.", "Replanning: ubah latihan individu menjadi berpasangan; prioritaskan aktivitas berbasis browser."]
            ]
        },
        "quickCheck": {
            "question": "Goal \"membuat workshop yang bagus\" terlalu kabur. Apa yang harus ditambahkan agar menjadi goal yang baik?",
            "options": ["Target peserta, durasi, tujuan belajar, dan bentuk evaluasi", "Cukup tambahkan budget saja", "Goal yang kabur tidak masalah selama ada niat baik"],
            "answer": 0,
            "explanationCorrect": "Benar. Goal yang baik harus spesifik dan terukur: siapa pesertanya, berapa durasinya, apa tujuan belajarnya, dan bagaimana keberhasilannya diukur. Tanpa ini, AI tidak bisa menilai apakah rencana sudah sesuai.",
            "explanationWrong": "Belum tepat. Goal yang kabur membuat AI tidak bisa mengevaluasi apakah rencana sudah sesuai. Bayangkan memesan makanan hanya dengan bilang 'makanan enak' — koki butuh tahu lebih spesifik."
        },
        "llmExample": "AI diminta membuat aplikasi. AI memecah menjadi: database schema → backend API → frontend UI → testing. Ini adalah problem decomposition: tugas besar dipecah menjadi modul yang bisa dikerjakan berurutan.",
        "prompt": ["Bantu pecah tugas ini menjadi 5-8 subtugas yang jelas.", "Apa dependensi antar subtugas? Mana yang harus selesai lebih dulu?", "Buat rencana cadangan jika constraint utama berubah."],
        "challenge": {
            "instruction": "Kamu merencanakan presentasi dengan proyektor. 10 menit sebelum mulai, proyektor rusak. Tulis rencana barumu — apa yang kamu ubah dan apa yang kamu pertahankan?",
            "placeholder": "Tulis rencana adaptasi...",
            "example": "Pertahankan: tujuan presentasi, urutan materi, dan durasi. Ubah: ganti visual proyektor dengan whiteboard atau flip chart; minta peserta membuka slide di perangkat masing-masing jika tersedia; siapkan printout sebagai cadangan."
        },
        "mistakes": ["Goal terlalu kabur sehingga rencana tidak terarah", "Dependensi terlewat — mengerjakan B sebelum A selesai", "Rencana terlalu kaku — tidak ada fallback saat kondisi berubah"],
        "bestPractices": ["Tulis goal dengan format SMART: Specific, Measurable, Achievable, Relevant, Time-bound", "Petakan dependensi sebelum mulai eksekusi", "Siapkan minimal satu rencana cadangan untuk constraint utama", "Review rencana setelah setiap milestone"],
        "learningOutcomes": ["Memecah tugas besar menjadi subtugas yang terstruktur", "Mengidentifikasi dan mengurutkan dependensi", "Membedakan kapan menggunakan static vs dynamic planning", "Melakukan replanning berdasarkan perubahan kondisi"],
        "transition": "Berikutnya kita akan mempelajari Chain-of-Thought — bagaimana langkah perantara membuat reasoning AI lebih transparan dan bisa diaudit.",
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/03-full.html"
    },
    {
        "title": "Structured Reasoning & Chain-of-Thought",
        "shortTitle": "Chain-of-Thought",
        "duration": "30 menit",
        "icon": "fas fa-list-ol",
        "summary": "Langkah perantara membuat jawaban lebih transparan — tapi tidak menjamin kebenaran.",
        "objectives": [
            "Menjelaskan fungsi dan batasan Chain-of-Thought",
            "Mengenali masalah faithfulness pada CoT",
            "Mengubah prompt biasa menjadi prompt terstruktur"
        ],
        "analogy": "Berpikir keras-keras (think aloud) saat menyelesaikan puzzle — kamu menyebutkan setiap langkah: \"coba sudut ini dulu... kalau tidak cocok, coba yang sebelah...\" Orang lain bisa mengikuti alur pikiranmu dan memeriksa apakah ada yang terlewat.",
        "hook": {
            "question": "Mana yang lebih bisa kamu percaya?",
            "answerA": {"label": "\"Anggaran cukup\"", "text": "Jawaban singkat tanpa penjelasan.", "icon": "fas fa-bolt"},
            "answerB": {"label": "\"Total Rp2.350.000, sisa Rp650.000, jadi cukup\"", "text": "Jawaban dengan langkah perhitungan yang bisa diperiksa.", "icon": "fas fa-list-check"},
            "message": "Simpan pilihanmu. Di chapter ini kamu akan belajar bahwa langkah perantara membuat jawaban lebih mudah diaudit — tapi tetap perlu diverifikasi."
        },
        "opening": ["Bandingkan dua jawaban: \"Anggaran cukup\" vs \"Total konsumsi Rp2.100.000 + biaya administrasi Rp250.000 = Rp2.350.000. Dari anggaran Rp3.000.000, tersisa Rp650.000. Jadi, anggaran cukup.\"", "Jawaban kedua lebih mudah diperiksa karena pengguna bisa melihat: data yang dipakai, operasi yang dilakukan, hasil antara, dan dasar kesimpulan. Inilah esensi <strong>Chain-of-Thought</strong> (CoT)."],
        "concepts": [
            {"title": "Apa Itu Chain-of-Thought?", "content": ["<strong>Chain-of-Thought (CoT)</strong> adalah rangkaian langkah perantara berbentuk bahasa yang dihasilkan model sebelum atau bersama jawaban akhir.", "<strong>PENTING:</strong> CoT bukan 'isi pikiran rahasia AI' atau bukti kesadaran. CoT adalah output teks yang bisa dibaca dan diverifikasi — seperti seseorang yang menunjukkan cara kerjanya di kertas."]},
            {"title": "Zero-Shot vs Few-Shot CoT", "content": ["<strong>Zero-Shot:</strong> Meminta penyelesaian bertahap tanpa memberi contoh. Contoh prompt: \"Identifikasi data, susun langkah, kerjakan, periksa, berikan jawaban akhir.\"", "<strong>Few-Shot:</strong> Memberikan contoh soal beserta langkah penyelesaiannya, lalu meminta model menyelesaikan soal baru dengan pola serupa. Kualitas contoh sangat penting — contoh yang salah bisa mengarahkan model ke pola yang buruk."]},
            {"title": "Kapan CoT Berguna dan Kapan Tidak?", "content": ["<strong>Berguna:</strong> masalah multi-langkah, perhitungan, perencanaan, analisis perbandingan, tugas dengan banyak batasan, troubleshooting.", "<strong>Tidak perlu:</strong> pertanyaan fakta sederhana, terjemahan satu kalimat, perbaikan typo, perubahan format, jawaban satu langkah yang sudah jelas."]},
            {"title": "Faithfulness: Apakah Langkah AI Selalu Jujur?", "content": ["Teks langkah penyelesaian yang dihasilkan model <strong>tidak selalu mencerminkan proses yang sebenarnya</strong>. Model bisa: menghasilkan alasan setelah memilih jawaban, mengikuti pola penjelasan yang terdengar masuk akal, atau dipengaruhi petunjuk bias tanpa mengakuinya.", "<strong>Prinsip penting:</strong> Chain-of-Thought membantu struktur dan pemeriksaan, tetapi bukan bukti mutlak bahwa model benar-benar menggunakan alasan yang ditampilkan."]}
        ],
        "flow": [
            ["Pertanyaan", "Input yang diberikan"],
            ["Langkah", "Reasoning perantara"],
            ["Pemeriksaan", "Validasi setiap langkah"],
            ["Jawaban", "Hasil akhir yang jelas"]
        ],
        "example": {
            "title": "Contoh: Perhitungan dengan CoT",
            "case": "Data: 80 peserta, Rp27.500/orang, transportasi Rp350.000, anggaran Rp3.000.000.",
            "steps": [
                {"label": "Langkah 1", "text": "Konsumsi: 80 \u00d7 Rp27.500 = Rp2.200.000"},
                {"label": "Langkah 2", "text": "Total: Rp2.200.000 + Rp350.000 = Rp2.550.000"},
                {"label": "Langkah 3", "text": "Sisa: Rp3.000.000 \u2212 Rp2.550.000 = Rp450.000"},
                {"label": "Kesimpulan", "text": "Anggaran cukup dengan sisa Rp450.000."}
            ],
            "conclusion": "Dengan CoT, setiap langkah bisa diperiksa. Tapi hati-hati: meskipun strukturnya rapi, perhitungan tetap bisa salah — misalnya 80 \u00d7 Rp27.500 bisa salah ketik menjadi Rp2.020.000.",
            "commonErrors": []
        },
        "lab": {
            "eyebrow": "Prompt Transformer",
            "title": "Ubah Prompt Biasa Menjadi Terstruktur",
            "description": "Klik setiap tab untuk melihat bagaimana prompt sederhana diubah menjadi instruksi bertahap.",
            "options": [
                ["Prompt Awal", "fas fa-pen-to-square", "Prompt Biasa", "\"Hitung biaya acara ini.\" — AI bisa menjawab dengan nebak atau melewatkan langkah.", "Prompt tanpa struktur berisiko menghasilkan jawaban yang sulit diverifikasi."],
                ["Prompt CoT", "fas fa-list-ol", "Prompt Terstruktur", "\"Identifikasi jumlah peserta, biaya per peserta, biaya tambahan, dan anggaran. Hitung total kebutuhan, bandingkan dengan anggaran, periksa perhitungan, lalu berikan kesimpulan.\"", "Prompt terstruktur memandu AI melalui langkah yang bisa diperiksa."],
                ["Prompt Verifikasi", "fas fa-check-double", "Prompt Audit", "\"Periksa kembali jawaban berikut. Cari kesalahan data, asumsi, urutan, perhitungan, dan kesimpulan. Tulis hanya perbaikan yang diperlukan.\"", "Gunakan untuk memverifikasi output AI — minta AI memeriksa hasilnya sendiri."]
            ]
        },
        "quickCheck": {
            "question": "Apakah Chain-of-Thought menjamin jawaban AI benar?",
            "options": ["Ya, karena setiap langkah ditampilkan", "Tidak — langkah atau perhitungan tetap bisa salah", "Hanya berlaku untuk soal matematika"],
            "answer": 1,
            "explanationCorrect": "Benar. CoT membantu transparansi dan audit, tetapi tidak menjamin kebenaran. Model tetap bisa melakukan kesalahan perhitungan, menggunakan data yang salah, atau membuat langkah yang terdengar logis tetapi tidak valid.",
            "explanationWrong": "Belum tepat. CoT membuat langkah terlihat — tapi langkah yang terlihat belum tentu benar. Seperti siswa yang menunjukkan cara kerja di kertas ujian: caranya bisa rapi tapi jawabannya tetap salah."
        },
        "llmExample": "AI menuliskan hitungan satu per satu sebelum memberikan total biaya. Pengguna bisa memeriksa setiap langkah: \"Harga satuan benar? Jumlah peserta benar? Operasi matematikanya benar?\"",
        "prompt": ["Kerjakan dengan format: 1) Data tersedia, 2) Asumsi, 3) Langkah utama, 4) Pemeriksaan, 5) Jawaban akhir.", "Berpikirlah langkah demi langkah. Jelaskan setiap langkah sebelum melanjutkan.", "Periksa kembali jawabanmu. Cari kesalahan dan tulis perbaikannya."],
        "challenge": {
            "instruction": "Ubah prompt \"Hitung total biaya workshop\" menjadi prompt terstruktur dengan format: 1) Identifikasi data, 2) Susun langkah, 3) Hitung, 4) Periksa, 5) Kesimpulan.",
            "placeholder": "Tulis prompt terstruktur versimu...",
            "example": "\"Tugas: Hitung total biaya workshop. Kerjakan dengan format: 1) Identifikasi: jumlah peserta, biaya per peserta, biaya tambahan, dan anggaran. 2) Susun langkah: hitung biaya dasar, tambahkan biaya lain, bandingkan dengan anggaran. 3) Lakukan perhitungan. 4) Periksa: apakah semua data dipakai? Apakah satuan konsisten? 5) Kesimpulan: cukup atau kurang, beserta sisa/kekurangan.\""
        },
        "mistakes": ["CoT dipaksakan untuk tugas sederhana yang cukup satu langkah", "Percaya 100% pada alasan model tanpa verifikasi", "Terlalu banyak langkah sampai jawaban utama tenggelam"],
        "bestPractices": ["Gunakan CoT hanya untuk tugas multi-langkah", "Minta AI memeriksa hasilnya sendiri sebagai langkah terakhir", "Pisahkan langkah reasoning dan jawaban akhir agar mudah ditemukan", "Waspadai 'rationalization' — langkah yang dibuat setelah jawaban dipilih"],
        "learningOutcomes": ["Menjelaskan perbedaan jawaban langsung dan jawaban dengan CoT", "Mengubah prompt biasa menjadi prompt terstruktur", "Menentukan kapan CoT berguna dan kapan tidak diperlukan", "Memahami batasan faithfulness pada CoT"],
        "transition": "Berikutnya kita akan mempelajari Tool Use — bagaimana AI menggunakan alat eksternal ketika kemampuannya sendiri tidak mencukupi.",
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/04-full.html"
    },
    {
        "title": "Tool Use yang Bertanggung Jawab",
        "shortTitle": "Tool Use",
        "duration": "30 menit",
        "icon": "fas fa-toolbox",
        "summary": "Tool menutupi kelemahan AI — asal dipilih tepat, parameternya benar, dan output-nya divalidasi.",
        "objectives": [
            "Menentukan kapan tool diperlukan dan kapan tidak",
            "Memilih tool yang sesuai dengan kebutuhan tugas",
            "Memvalidasi parameter dan output tool"
        ],
        "analogy": "Seperti mempekerjakan asisten yang bisa browsing web untuk mencari harga tiket. Kamu harus memberi instruksi yang jelas (parameter), membaca hasilnya (observation), dan memutuskan apakah hasilnya bisa dipakai (validasi). Kalau asisten dapat error, kamu tidak boleh mengarang harga.",
        "hook": {
            "question": "AI diminta menghitung 287 \u00d7 9.451. Apa yang sebaiknya dilakukan?",
            "answerA": {"label": "Hitung sendiri", "text": "AI menghitung dalam 'kepalanya' menggunakan prediksi token.", "icon": "fas fa-brain"},
            "answerB": {"label": "Gunakan kalkulator", "text": "AI memanggil tool kalkulator untuk memastikan akurasi.", "icon": "fas fa-calculator"},
            "message": "Simpan pilihanmu. Di chapter ini kamu akan belajar kapan AI harus menggunakan tool eksternal dan bagaimana memvalidasi hasilnya."
        },
        "opening": ["LLM tidak selalu bisa melakukan semua hal sendiri. Perkalian angka besar, data real-time, akses database — ini adalah contoh tugas yang lebih baik diserahkan ke tool eksternal.", "<strong>Tool use</strong> adalah kemampuan AI untuk menggunakan alat eksternal (kalkulator, API, search engine, spreadsheet) ketika informasi atau kemampuan di dalam model tidak mencukupi."],
        "concepts": [
            {"title": "Kapan Tool Diperlukan?", "content": ["Tidak semua tugas butuh tool. Gunakan tool ketika:", "1. Informasi tidak tersedia dalam model (data real-time, fakta terkini).", "2. Diperlukan komputasi akurat (perkalian besar, statistik kompleks).", "3. Perlu akses ke sistem eksternal (kalender, email, database).", "4. Data berada di file atau sumber yang tidak bisa 'dihafal' model.", "<strong>Tidak perlu tool</strong> ketika: tugas bisa dijawab dari pengetahuan model, definisi sederhana, terjemahan, atau ringkasan teks yang sudah diberikan."]},
            {"title": "Lima Langkah Tool Use", "numberedList": ["<strong>1. Tentukan kebutuhan</strong> — Apakah model bisa menjawab sendiri? Jika tidak, tool apa yang relevan?", "<strong>2. Pilih tool</strong> — Kalkulator untuk hitungan, weather API untuk cuaca, calendar untuk jadwal, spreadsheet untuk data besar.", "<strong>3. Tentukan parameter</strong> — Parameter yang salah = output yang salah. Periksa tipe data, format, dan unit.", "<strong>4. Baca observation</strong> — Tool mengembalikan hasil. Baca dengan teliti — apakah hasilnya valid? Apakah ada error?", "<strong>5. Validasi output</strong> — Bandingkan dengan ekspektasi. Jika tool gagal, jangan mengarang data. Jelaskan kegagalannya."]},
            {"title": "Permission dan Risiko", "content": ["Tidak semua tool aman digunakan tanpa izin. Klasifikasi risiko:", "<strong>Risiko rendah:</strong> membaca kalender sendiri, menggunakan kalkulator, mencari informasi publik.", "<strong>Risiko tinggi:</strong> mengirim email, menghapus agenda, melakukan transaksi. Tindakan ini perlu konfirmasi eksplisit dari pengguna.", "Jika tool mengembalikan 'permission denied', AI harus menjelaskan bahwa akses ditolak — bukan mengarang data atau melanjutkan seolah-olah berhasil."]}
        ],
        "flow": [
            ["Plan", "Pilih tool yang sesuai"],
            ["Act", "Panggil tool dengan parameter benar"],
            ["Observe", "Baca hasil dari tool"],
            ["Update", "Perbarui state berdasarkan hasil"]
        ],
        "example": {
            "title": "Contoh: Tool Failure",
            "case": "AI diminta menghitung rata-rata dari file spreadsheet. Tool mengembalikan: \"Error: kolom 'score' berisi teks, bukan angka.\"",
            "steps": [
                {"label": "Respons Salah", "text": "AI mengarang angka rata-rata atau mengabaikan error."},
                {"label": "Respons Benar", "text": "AI menjelaskan bahwa kolom tidak berisi nilai numerik dan meminta kolom alternatif atau perbaikan data."}
            ],
            "conclusion": "Ketika tool gagal, transparansi lebih penting daripada memberikan jawaban yang 'kedengarannya benar'.",
            "commonErrors": []
        },
        "lab": {
            "eyebrow": "Tool Decision Lab",
            "title": "Pilih Tool yang Tepat",
            "description": "Klik setiap tab untuk melihat contoh pemilihan tool berdasarkan jenis tugas.",
            "options": [
                ["Kalkulator", "fas fa-calculator", "Komputasi", "Untuk perkalian besar atau perhitungan yang perlu akurasi 100%.", "287 \u00d7 9.451 — terlalu berisiko jika dihitung manual oleh LLM."],
                ["API / Search", "fas fa-globe", "Data Real-time", "Untuk informasi terkini yang tidak ada dalam training data model.", "Cuaca hari ini, harga saham, berita terbaru."],
                ["Spreadsheet", "fas fa-table", "Data Besar", "Untuk menganalisis ribuan baris data yang tidak muat dalam konteks.", "Menganalisis 10.000 baris data penjualan."]
            ]
        },
        "quickCheck": {
            "question": "Tool mengembalikan error 'data tidak ditemukan'. Apa yang harus dilakukan AI?",
            "options": ["Mengarang data yang kira-kira masuk akal", "Menjelaskan bahwa data tidak ditemukan dan meminta alternatif", "Mengabaikan error dan melanjutkan seolah-olah berhasil"],
            "answer": 1,
            "explanationCorrect": "Benar. Transparansi adalah kunci. AI harus jujur bahwa tool gagal, menjelaskan penyebabnya, dan menawarkan alternatif — bukan mengarang data.",
            "explanationWrong": "Belum tepat. Mengarang data ketika tool gagal adalah kesalahan serius. Pengguna berhak tahu bahwa data tidak tersedia, bukan diberi informasi palsu yang 'kedengarannya benar'."
        },
        "llmExample": "AI diminta memberikan cuaca hari ini. Alih-alih mengarang suhu (halusinasi), AI memanggil weather API, membaca hasilnya, lalu menyampaikan: \"Berdasarkan data terkini, suhu hari ini 28\u00b0C dengan kemungkinan hujan 60%.\"",
        "prompt": ["Gunakan tool kalkulator untuk memastikan akurasi perhitungan.", "Cari informasi terbaru melalui search tool — jangan mengarang data.", "Jika tool gagal, jelaskan errornya dan minta alternatif dari pengguna."],
        "challenge": {
            "instruction": "Kamu diminta mencari slot rapat 2 jam minggu depan. Tentukan: (1) tool apa yang dipakai, (2) parameter apa yang diperlukan, (3) apa yang dilakukan jika tidak ada slot tersedia.",
            "placeholder": "Tulis rencana tool use-mu...",
            "example": "Tool: Calendar API. Parameter: tanggal mulai (Senin), tanggal akhir (Jumat), durasi (2 jam), zona waktu, jam kerja (09:00-17:00), peserta. Jika tidak ada slot: laporkan ke pengguna dan tawarkan alternatif — perpendek durasi, perluas rentang tanggal, atau kurangi peserta wajib."
        },
        "mistakes": ["Terlalu banyak pakai tool untuk tugas yang sebenarnya bisa dijawab model sendiri", "Mengabaikan error dari tool dan melanjutkan seakan-akan berhasil", "Parameter salah — format tanggal terbalik, unit tidak konsisten"],
        "bestPractices": ["Tanyakan dulu: apakah model bisa menjawab tanpa tool?", "Periksa parameter sebelum memanggil tool — format, tipe data, unit", "Selalu baca observation — jangan asumsikan tool selalu berhasil", "Hormati batas otorisasi — jangan mengambil tindakan tanpa izin"],
        "learningOutcomes": ["Menentukan kapan sebuah task membutuhkan tool eksternal", "Memilih tool yang tepat berdasarkan jenis tugas", "Membaca dan memvalidasi output tool", "Menangani tool failure secara transparan"],
        "transition": "Berikutnya kita akan menyatukan semuanya dalam Integrated Reasoning Mission — simulasi end-to-end dari memahami masalah sampai memberikan jawaban yang terverifikasi.",
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/05-full.html"
    },
    {
        "title": "Integrated Reasoning Mission",
        "shortTitle": "Integrated Mission",
        "duration": "35 menit",
        "icon": "fas fa-flag-checkered",
        "summary": "Reasoning, planning, dan tool use bersatu dalam loop iteratif untuk menyelesaikan misi kompleks.",
        "objectives": [
            "Mengevaluasi apakah jawaban AI cukup layak dipercaya",
            "Menjalankan siklus penuh: Reason \u2192 Plan \u2192 Act \u2192 Observe \u2192 Update \u2192 Answer"
        ],
        "analogy": "Menjalankan misi: pahami target (Reason), rencanakan rute (Plan), bergerak (Act), cek apakah ada rintangan (Observe), sesuaikan rute jika perlu (Update), lalu laporkan hasil (Answer). Tidak selalu linear — kadang perlu mundur dan coba rute lain.",
        "hook": {
            "question": "AI diminta menganalisis data peserta dari spreadsheet, menghitung kebutuhan konsumsi, dan memberi rekomendasi anggaran. Apa langkah pertama yang paling tepat?",
            "answerA": {"label": "Langsung hitung", "text": "Ambil data dari spreadsheet dan mulai kalkulasi.", "icon": "fas fa-calculator"},
            "answerB": {"label": "Pahami dulu", "text": "Baca tugas, identifikasi data yang tersedia dan yang perlu dicari, tentukan tool yang diperlukan.", "icon": "fas fa-compass"},
            "message": "Simpan pilihanmu. Di chapter terakhir ini kamu akan melihat bagaimana seluruh kemampuan reasoning bekerja bersama dalam satu misi utuh."},
        "opening": ["Keempat kemampuan yang telah dipelajari — reasoning, planning, chain-of-thought, dan tool use — tidak bekerja sendiri-sendiri. Dalam tugas nyata, semuanya berjalan dalam satu siklus: <strong>Reason \u2192 Plan \u2192 Act \u2192 Observe \u2192 Update \u2192 Answer</strong>.", "Siklus ini tidak selalu linear. Kadang setelah Observe, AI perlu kembali ke Plan atau bahkan ke Reason jika ada informasi baru yang mengubah pemahaman awal."],
        "concepts": [
            {"title": "Siklus Terpadu", "numberedList": ["<strong>Reason</strong> — Pahami tugas: apa tujuannya, data apa yang tersedia, batasan apa yang ada, informasi apa yang hilang.", "<strong>Plan</strong> — Susun rencana: pecah menjadi subtugas, tentukan tool yang diperlukan, urutkan dependensi.", "<strong>Act</strong> — Jalankan: kerjakan langkah atau panggil tool dengan parameter yang benar.", "<strong>Observe</strong> — Baca hasil: apa output tool? Apakah sesuai ekspektasi? Apakah ada error?", "<strong>Update</strong> — Perbarui: apakah pemahaman atau rencana perlu diubah berdasarkan hasil observasi?", "<strong>Answer</strong> — Sampaikan hasil akhir beserta asumsi, batasan, dan tingkat keyakinan."]},
            {"title": "Verification Gate", "content": ["Sebelum menyampaikan jawaban ke pengguna, lewati verification gate:", "<strong>\u2610 Apakah semua data relevan sudah dipakai?</strong>", "<strong>\u2610 Apakah perhitungan bisa diulang dan konsisten?</strong>", "<strong>\u2610 Apakah asumsi sudah dinyatakan secara eksplisit?</strong>", "<strong>\u2610 Apakah tool berhasil? Jika gagal, apakah sudah ditangani?</strong>", "<strong>\u2610 Apakah kesimpulan mengikuti bukti — bukan sebaliknya?</strong>", "<strong>\u2610 Apakah tingkat keyakinan sesuai dengan kualitas data?</strong>"]}
        ],
        "flow": [
            ["Reason", "Pahami tugas dan data"],
            ["Plan", "Rencana & Tool"],
            ["Act", "Eksekusi"],
            ["Observe", "Baca hasil"],
            ["Update", "Sesuaikan"],
            ["Answer", "Jawaban final"]
        ],
        "example": {
            "title": "Studi Kasus: Anggaran dari Spreadsheet",
            "case": "Tugas: Berdasarkan data peserta dalam spreadsheet, hitung kebutuhan konsumsi, bandingkan dengan anggaran Rp5.000.000, lalu berikan rekomendasi. Harga konsumsi Rp32.000/orang, transportasi Rp450.000.",
            "steps": [
                {"label": "Reason", "text": "Jumlah peserta belum diketahui — ada di spreadsheet. Data mungkin memiliki duplikasi. Perlu tool spreadsheet."},
                {"label": "Plan", "text": "1) Baca spreadsheet, 2) Hitung jumlah peserta unik, 3) Hitung total konsumsi, 4) Tambah transportasi, 5) Bandingkan dengan anggaran, 6) Rekomendasi."},
                {"label": "Act + Observe", "text": "Tool membaca spreadsheet: 82 baris, 2 duplikat. Peserta unik: 80. Tool kalkulator: 80 \u00d7 Rp32.000 = Rp2.560.000."},
                {"label": "Update + Answer", "text": "Total: Rp2.560.000 + Rp450.000 = Rp3.010.000. Sisa: Rp1.990.000. Rekomendasi: anggaran cukup dengan sisa besar — bisa dialokasikan untuk materi tambahan."}
            ],
            "conclusion": "Setiap tahap memberi informasi yang diperlukan tahap berikutnya. Tanpa Observe, AI tidak akan tahu ada duplikat. Tanpa Update, AI tidak akan menyesuaikan jumlah peserta.",
            "commonErrors": []
        },
        "lab": {
            "eyebrow": "Guided Mission Stepper",
            "title": "Ikuti Alur Misi End-to-End",
            "description": "Klik setiap tahap untuk melihat apa yang terjadi di setiap langkah siklus reasoning.",
            "options": [
                ["Reason", "fas fa-compass", "Pahami Misi", "Identifikasi tujuan, data tersedia, informasi hilang, dan batasan sebelum bertindak.", "Tanpa Reason, AI bisa mengerjakan tugas yang salah."],
                ["Plan + Act", "fas fa-play", "Rencana & Eksekusi", "Susun rencana, pilih tool, jalankan langkah. Setiap aksi harus punya tujuan jelas.", "Tool dipilih berdasarkan kebutuhan — bukan asal pakai."],
                ["Observe + Verify", "fas fa-flag-checkered", "Amati & Verifikasi", "Baca hasil, bandingkan dengan ekspektasi, perbarui rencana jika perlu. Verifikasi sebelum menjawab.", "Gate terakhir sebelum jawaban sampai ke pengguna."]
            ]
        },
        "quickCheck": {
            "question": "Apakah siklus Reason \u2192 Plan \u2192 Act \u2192 Observe \u2192 Update \u2192 Answer selalu linear (satu arah)?",
            "options": ["Ya, selalu maju tanpa mundur", "Tidak — bisa kembali ke Plan atau Reason jika observasi menunjukkan perubahan", "Hanya linear untuk tugas matematika"],
            "answer": 1,
            "explanationCorrect": "Benar. Siklus ini iteratif. Hasil observasi bisa memicu replanning atau bahkan reevaluasi pemahaman awal. Fleksibilitas ini yang membedakan AI agent yang cerdas dari script kaku.",
            "explanationWrong": "Belum tepat. Dalam praktik nyata, observasi sering mengungkap hal yang tidak terduga — data duplikat, tool error, constraint berubah. AI harus bisa kembali ke Plan atau Reason, bukan memaksakan rencana awal."
        },
        "llmExample": "AI mengekstrak data dari sheet, mendeteksi duplikat, memanggil fungsi kalkulasi, membandingkan dengan anggaran, lalu membuat tabel rangkuman akhir yang siap disajikan ke pengambil keputusan.",
        "prompt": ["Kerjakan tugas ini secara end-to-end: pahami, rencanakan, jalankan, amati, dan verifikasi sebelum menjawab.", "Jika tool gagal atau data tidak sesuai ekspektasi, jelaskan dan tawarkan alternatif.", "Sertakan asumsi, batasan, dan tingkat keyakinan dalam jawaban akhir."],
        "challenge": {
            "instruction": "Kamu adalah AI agent yang diminta menganalisis data pendaftaran workshop. Data: 120 pendaftar dalam spreadsheet, kapasitas ruangan 100 orang, anggaran konsumsi Rp3.500.000, harga konsumsi Rp30.000/orang. Tulis rencana end-to-end menggunakan siklus Reason \u2192 Plan \u2192 Act \u2192 Observe \u2192 Update \u2192 Answer.",
            "placeholder": "Tulis rencana misi end-to-end...",
            "example": "Reason: kapasitas 100, pendaftar 120 (mungkin ada duplikat atau waiting list). Data di spreadsheet. Perlu tool spreadsheet + kalkulator. Plan: 1) Baca spreadsheet, 2) Hitung pendaftar unik, 3) Bandingkan dengan kapasitas, 4) Hitung biaya konsumsi, 5) Bandingkan dengan anggaran, 6) Rekomendasi. Act: panggil spreadsheet tool. Observe: 115 unik, 5 duplikat. Masih > kapasitas. Update: perlu waiting list atau sesi tambahan. Answer: 115 pendaftar unik, kapasitas 100, perlu 15 orang di waiting list. Biaya: 100 \u00d7 Rp30.000 = Rp3.000.000, sisa Rp500.000."
        },
        "mistakes": ["Mengklaim berhasil tanpa verifikasi — langsung Answer setelah Act", "Tidak ada rencana cadangan ketika tool gagal atau data tidak sesuai", "Loop tak terbatas — terus Update tanpa pernah mencapai Answer"],
        "bestPractices": ["Selalu lewati verification gate sebelum Answer", "Catat asumsi dan batasan di setiap tahap", "Tetapkan batas iterasi — jangan loop selamanya", "Jika ragu antara dua kesimpulan, sampaikan keduanya dengan tingkat keyakinan"],
        "learningOutcomes": ["Menjalankan siklus Reason \u2192 Plan \u2192 Act \u2192 Observe \u2192 Update \u2192 Answer", "Menerapkan verification gate sebelum menyampaikan jawaban", "Menangani perubahan kondisi melalui replanning", "Mengevaluasi kualitas jawaban AI secara end-to-end"],
        "transition": "",
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/06-full.html"
    }
];

    const PRACTICES = [
    {
        "id": "latihan-1",
        "title": "Latihan 1 — Fakta atau Asumsi?",
        "focus": "Latihan 1",
        "prompt": "Kasus:  > Sebuah kelas memiliki 40 peserta. Biaya modul Rp20.000 per orang. Panitia menyiapkan anggaran Rp1.000.000. AI menghitung seluruh peserta memperoleh satu modul.  Klasifikasikan pernyataan berikut:  1. Peserta berjumlah 40 orang. 2. Biaya modul Rp20.000 per orang. 3. Semua peserta memperoleh satu modul. 4. Total biaya modul Rp800.000. 5. Anggaran cukup.",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": "| Pernyataan | Kategori | |---|---| | Peserta berjumlah 40 orang | Fakta | | Biaya modul Rp20.000 per orang | Fakta | | Semua peserta memperoleh satu modul | Asumsi | | Total biaya modul Rp800.000 | Hasil langkah | | Anggaran cukup | Kesimpulan |"
    },
    {
        "id": "latihan-2",
        "title": "Latihan 2 — Urutkan Langkah",
        "focus": "Latihan 2",
        "prompt": "Urutkan langkah berikut:  - bandingkan total kebutuhan dengan anggaran; - hitung sisa anggaran; - identifikasi jumlah peserta; - hitung total konsumsi; - identifikasi harga per peserta.",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": "```text 1. Identifikasi jumlah peserta. 2. Identifikasi harga per peserta. 3. Hitung total konsumsi. 4. Bandingkan total kebutuhan dengan anggaran. 5. Hitung sisa anggaran. ```"
    },
    {
        "id": "latihan-3",
        "title": "Latihan 3 — Temukan Kesalahan",
        "focus": "Latihan 3",
        "prompt": "Jawaban AI:  > “Untuk 50 peserta dengan harga Rp25.000 per orang dan biaya sewa Rp400.000, total kebutuhannya adalah Rp1.250.000. Anggaran Rp1.500.000 berarti tersisa Rp250.000.”",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": "AI melupakan biaya sewa.  ```text Konsumsi: 50 × Rp25.000 = Rp1.250.000  Total: Rp1.250.000 + Rp400.000 = Rp1.650.000  Kekurangan: Rp1.650.000 − Rp1.500.000 = Rp150.000 ```"
    },
    {
        "id": "latihan-4",
        "title": "Latihan 4 — Prioritas Nonnumerik",
        "focus": "Latihan 4",
        "prompt": "Urutkan pekerjaan berikut:  - memperbaiki tombol pembayaran yang gagal; - mengubah warna kartu; - menambah ilustrasi kosong.",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": "Tombol pembayaran harus diprioritaskan karena memengaruhi fungsi dan transaksi utama. Perubahan visual dapat dikerjakan setelah fungsi kritis stabil.  ---"
    },
    {
        "id": "latihan-5",
        "title": "Latihan 5 — Pecah Tujuan",
        "focus": "Latihan 5",
        "prompt": "Tugas:  > Buat program mentoring AI selama empat minggu untuk peserta pemula.  Buat 6–10 subtugas.",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": "1. Mengidentifikasi kemampuan awal peserta. 2. Menentukan tujuan empat minggu. 3. Membagi materi per minggu. 4. Menentukan mentor. 5. Menyiapkan contoh dan latihan. 6. Menentukan jadwal. 7. Menyiapkan kanal diskusi. 8. Membuat evaluasi mingguan. 9. Membuat proyek akhir. 10. Mengumpulkan feedback."
    },
    {
        "id": "latihan-6",
        "title": "Latihan 6 — Temukan Dependensi",
        "focus": "Latihan 6",
        "prompt": "Urutkan:  - melakukan evaluasi akhir; - menetapkan tujuan belajar; - membuat latihan; - memilih materi; - menjalankan sesi.",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": "```text 1. Menetapkan tujuan belajar. 2. Memilih materi. 3. Membuat latihan. 4. Menjalankan sesi. 5. Melakukan evaluasi akhir. ```"
    },
    {
        "id": "latihan-7",
        "title": "Latihan 7 — Replanning",
        "focus": "Latihan 7",
        "prompt": "Rencana awal menggunakan laboratorium komputer. Pada hari pelaksanaan, setengah komputer tidak dapat digunakan.",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": "- ubah latihan menjadi berpasangan; - prioritaskan aktivitas yang dapat dijalankan melalui browser; - siapkan demonstrasi terpusat; - kurangi aktivitas yang membutuhkan satu perangkat per peserta; - pertahankan tujuan belajar, tetapi ubah metode."
    },
    {
        "id": "latihan-8",
        "title": "Latihan 8 — Evaluasi Rencana",
        "focus": "Latihan 8",
        "prompt": "Sebuah workshop memiliki durasi 90 menit, tetapi rencana AI berisi:  - pembukaan 15 menit; - materi 35 menit; - demo 25 menit; - latihan 30 menit; - kuis 15 menit.",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": "Total rencana adalah 120 menit. Rencana melanggar batas waktu dan harus dipangkas atau disusun ulang.  ---"
    },
    {
        "id": "latihan-9",
        "title": "Latihan 9 — Ubah Prompt",
        "focus": "Latihan 9",
        "prompt": "Prompt awal:  > “Hitung biaya acara ini.”  #### Contoh Perbaikan  > “Identifikasi jumlah peserta, biaya per peserta, biaya tambahan, dan anggaran. Hitung total kebutuhan, bandingkan dengan anggaran, periksa perhitungan, lalu berikan kesimpulan.”",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": ""
    },
    {
        "id": "latihan-10",
        "title": "Latihan 10 — Temukan Kesalahan",
        "focus": "Latihan 10",
        "prompt": "```text Peserta: 45 Biaya: Rp30.000 Total menurut AI: Rp1.250.000 ```",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": "```text 45 × Rp30.000 = Rp1.350.000 ```"
    },
    {
        "id": "latihan-11",
        "title": "Latihan 11 — Kurangi Penjelasan Berlebihan",
        "focus": "Latihan 11",
        "prompt": "Tugas peserta: ringkas penjelasan 10 paragraf menjadi:  1. data; 2. tiga langkah utama; 3. hasil; 4. satu catatan asumsi.",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": ""
    },
    {
        "id": "latihan-12",
        "title": "Latihan 12 — Perlu CoT atau Tidak?",
        "focus": "Latihan 12",
        "prompt": "| Tugas | CoT? | Alasan | |---|---|---| | Memperbaiki typo “algoritm” | Tidak | Satu langkah | | Membandingkan dua rencana anggaran | Ya | Banyak kriteria | | Menerjemahkan “good morning” | Tidak | Tugas sederhana | | Menyusun jadwal dengan lima batasan | Ya | Perlu pelacakan batasan | | Menghitung data dari 5.000 baris | Perlu langkah + tool | CoT saja tidak cukup |  ---",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": ""
    },
    {
        "id": "latihan-13",
        "title": "Latihan 13 — Pilih Tool",
        "focus": "Latihan 13",
        "prompt": "| Tugas | Tool | |---|---| | Menghitung 287 × 9.451 | Kalkulator | | Menganalisis 10.000 baris data | Spreadsheet atau Python | | Mengetahui cuaca hari ini | Weather tool | | Merangkum paragraf yang diberikan | Tidak perlu tool eksternal | | Mencari isi kebijakan dalam PDF | File retrieval | | Mencari slot rapat | Calendar | | Membuat draft email | Email drafting tool | | Mengetahui rute | Maps |",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": ""
    },
    {
        "id": "latihan-14",
        "title": "Latihan 14 — Tentukan Parameter",
        "focus": "Latihan 14",
        "prompt": "Tugas:  > Cari slot rapat dua jam minggu depan.  Parameter yang perlu ditentukan:  - tanggal mulai; - tanggal akhir; - zona waktu; - durasi; - kalender; - jam kerja; - peserta yang perlu diperiksa.",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": ""
    },
    {
        "id": "latihan-15",
        "title": "Latihan 15 — Baca Observation",
        "focus": "Latihan 15",
        "prompt": "```text Jumlah baris: 100 Nilai valid: 0 Error: kolom “score” berisi teks ```",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": "AI tidak boleh menghitung rata-rata. AI harus menjelaskan bahwa kolom tidak berisi nilai numerik dan meminta kolom alternatif atau perbaikan data."
    },
    {
        "id": "latihan-16",
        "title": "Latihan 16 — Permission Check",
        "focus": "Latihan 16",
        "prompt": "Klasifikasikan:  - membaca kalender sendiri; - membuat draft email; - mengirim email; - menghapus agenda; - menjalankan kalkulator.  Tindakan mengirim email dan menghapus agenda memiliki dampak lebih tinggi daripada sekadar membaca atau membuat draft.",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": ""
    },
    {
        "id": "latihan-17",
        "title": "Latihan 17 — Perbaiki Tool Loop",
        "focus": "Latihan 17",
        "prompt": "Alur salah:  ```text Reason → Tool → Answer ```  Alur perbaikan:  ```text Reason → Plan → Tool → Observe → Validate → Update → Answer ```  ---",
        "fields": [
            [
                "jawaban",
                "Tuliskan analisis atau jawaban Anda di sini"
            ]
        ],
        "guide": ""
    }
];

    const QUIZ = [
    [
        "Apa pengertian paling tepat dari reasoning dalam konteks AI?",
        [
            "Kemampuan AI memiliki kesadaran",
            "Proses menghubungkan informasi untuk menghasilkan kesimpulan atau langkah",
            "Proses menyimpan semua percakapan pengguna",
            "Kemampuan AI mengakses internet secara otomatis"
        ],
        1,
        "Reasoning menggambarkan proses pengolahan dan penghubungan informasi untuk menyelesaikan tugas. Istilah tersebut tidak menyatakan bahwa AI memiliki kesadaran."
    ],
    [
        "Manakah yang termasuk asumsi?",
        [
            "Anggaran yang tertulis adalah Rp2.000.000",
            "Jumlah peserta pada daftar adalah 50",
            "Semua peserta hadir dan menerima konsumsi",
            "Harga konsumsi pada invoice adalah Rp30.000"
        ],
        2,
        "Kehadiran seluruh peserta tidak otomatis diketahui hanya dari jumlah peserta yang terdaftar."
    ],
    [
        "Mengapa AI perlu mengenali informasi yang tidak relevan?",
        [
            "Agar jawaban menjadi lebih panjang",
            "Agar seluruh kata dalam prompt digunakan",
            "Agar proses tetap fokus pada data yang memengaruhi hasil",
            "Agar AI tidak perlu memeriksa hasil"
        ],
        2,
        ""
    ],
    [
        "Sebuah jawaban AI memiliki langkah yang panjang. Apa kesimpulan yang paling tepat?",
        [
            "Jawaban pasti benar",
            "AI pasti memahami masalah seperti manusia",
            "Panjangnya penjelasan tidak menjamin validitas",
            "Jawaban tidak perlu diperiksa"
        ],
        2,
        ""
    ],
    [
        "Apa langkah paling tepat setelah AI memperoleh hasil perhitungan?",
        [
            "Segera menghapus langkah sebelumnya",
            "Memeriksa angka, satuan, batasan, dan kesimpulan",
            "Menambahkan asumsi baru",
            "Mengganti pertanyaan pengguna"
        ],
        1,
        ""
    ],
    [
        "AI diminta memilih pekerjaan prioritas. Informasi apa yang paling relevan?",
        [
            "Warna ikon setiap pekerjaan",
            "Nama orang yang mengusulkan pekerjaan",
            "Dampak, urgensi, risiko, dan dependensi",
            "Panjang judul pekerjaan"
        ],
        2,
        ""
    ],
    [
        "Apa fungsi utama planning?",
        [
            "Menyimpan semua data",
            "Mengubah tujuan menjadi urutan langkah",
            "Menjamin tidak ada perubahan",
            "Menggantikan seluruh reasoning"
        ],
        1,
        ""
    ],
    [
        "Manakah contoh constraint?",
        [
            "Menentukan materi",
            "Membuat slide",
            "Durasi maksimal 90 menit",
            "Menulis kesimpulan"
        ],
        2,
        ""
    ],
    [
        "Apa tujuan problem decomposition?",
        [
            "Membuat tugas lebih kabur",
            "Memecah tugas besar menjadi bagian yang dapat dikerjakan",
            "Menghapus seluruh batasan",
            "Menghindari evaluasi"
        ],
        1,
        ""
    ],
    [
        "Mengapa dependencies penting?",
        [
            "Agar semua langkah dapat dikerjakan acak",
            "Agar urutan mengikuti kebutuhan input dan output",
            "Agar rencana menjadi lebih panjang",
            "Agar goal tidak perlu ditentukan"
        ],
        1,
        ""
    ],
    [
        "Kapan static planning paling sesuai?",
        [
            "Kondisi sering berubah dan data belum tersedia",
            "Tugas stabil dengan langkah yang sudah jelas",
            "Pengguna terus memberikan informasi baru",
            "Tool sering gagal"
        ],
        1,
        ""
    ],
    [
        "Apa tindakan paling tepat ketika observation menunjukkan kondisi berubah?",
        [
            "Mengabaikan observation",
            "Selalu membatalkan tugas",
            "Memeriksa dan memperbarui rencana jika diperlukan",
            "Tetap mengikuti rencana awal tanpa evaluasi"
        ],
        2,
        ""
    ],
    [
        "Apa definisi Chain-of-Thought?",
        [
            "Seluruh proses internal AI yang pasti lengkap",
            "Rangkaian langkah perantara berbentuk bahasa",
            "Database rahasia model",
            "Tool untuk mengirim email"
        ],
        1,
        ""
    ],
    [
        "Kapan CoT paling berguna?",
        [
            "Tugas multi-langkah dengan beberapa batasan",
            "Perbaikan satu typo",
            "Menyalin satu kata",
            "Mengubah huruf menjadi kapital"
        ],
        0,
        ""
    ],
    [
        "Apa perbedaan zero-shot dan few-shot CoT?",
        [
            "Zero-shot menggunakan tool, few-shot tidak",
            "Zero-shot tanpa contoh, few-shot menggunakan contoh",
            "Zero-shot hanya untuk matematika",
            "Few-shot tidak memiliki jawaban"
        ],
        1,
        ""
    ],
    [
        "Mengapa CoT tidak menjamin kebenaran?",
        [
            "Karena langkah atau perhitungan tetap dapat salah",
            "Karena CoT tidak memiliki teks",
            "Karena CoT selalu menggunakan internet",
            "Karena CoT hanya dapat menjawab satu kata"
        ],
        0,
        ""
    ],
    [
        "Manakah langkah terstruktur yang baik?",
        [
            "Panjang dan berulang",
            "Relevan, berurutan, dan dapat diperiksa",
            "Menggunakan data yang tidak tersedia",
            "Menyembunyikan jawaban akhir"
        ],
        1,
        ""
    ],
    [
        "Apa arti masalah faithfulness pada CoT?",
        [
            "CoT selalu terlalu pendek",
            "Teks alasan tidak selalu mencerminkan seluruh faktor yang memengaruhi jawaban",
            "CoT tidak dapat menggunakan angka",
            "CoT hanya tersedia dalam bahasa Inggris"
        ],
        1,
        ""
    ],
    [
        "Instruksi mana yang paling tepat?",
        [
            "Ungkapkan seluruh pikiran rahasiamu",
            "Berikan langkah utama yang dapat diverifikasi dan jawaban akhir",
            "Jangan periksa hasil",
            "Buat penjelasan selama mungkin"
        ],
        1,
        ""
    ],
    [
        "Mengapa AI menggunakan tool?",
        [
            "Agar semua jawaban menjadi panjang",
            "Untuk memperoleh data atau kemampuan yang tidak cukup tersedia dalam model",
            "Agar tidak perlu memahami tugas",
            "Untuk menghindari observation"
        ],
        1,
        ""
    ],
    [
        "Tool paling sesuai untuk menghitung statistik 10.000 baris adalah:",
        [
            "Generator gambar",
            "Spreadsheet atau Python",
            "Kalender",
            "Email"
        ],
        1,
        ""
    ],
    [
        "Apa yang dimaksud observation?",
        [
            "Teks prompt awal",
            "Hasil yang dikembalikan tool",
            "Judul modul",
            "Nama pengguna"
        ],
        1,
        ""
    ],
    [
        "Apa respons yang tepat ketika tool mengembalikan permission denied?",
        [
            "Menyatakan tindakan berhasil",
            "Mengarang hasil",
            "Menjelaskan bahwa akses ditolak dan tindakan belum dilakukan",
            "Menghapus error"
        ],
        2,
        ""
    ],
    [
        "Mengapa parameter harus diperiksa?",
        [
            "Tool selalu memperbaiki parameter otomatis",
            "Parameter salah dapat menghasilkan output salah",
            "Parameter hanya dekorasi",
            "Parameter tidak memengaruhi hasil"
        ],
        1,
        ""
    ],
    [
        "Pengguna meminta rekomendasi waktu rapat. Apa tindakan yang tepat?",
        [
            "Langsung membuat event tanpa izin",
            "Membaca kalender dan menawarkan slot",
            "Menghapus semua agenda",
            "Menebak slot kosong"
        ],
        1,
        ""
    ],
    [
        "Manakah pernyataan yang paling tepat?",
        [
            "Output tool selalu benar",
            "Tool tidak pernah gagal",
            "Output tool tetap perlu divalidasi",
            "Tool dapat digunakan tanpa tujuan"
        ],
        2,
        ""
    ]
];

    const DISCUSSION_PROMPTS = [
    "Apakah AI yang dapat memberikan alasan runtut berarti benar-benar memahami masalah?",
    "Apakah AI sebaiknya mempertahankan rencana awal atau terus menyesuaikan rencana?",
    "Haruskah AI selalu menampilkan langkah penyelesaiannya?",
    "Seberapa jauh AI boleh menggunakan tool dan mengambil tindakan atas nama pengguna?"
];

    function safeJsonParse(value, fallback) {
        if (!value) return fallback;
        try {
            return JSON.parse(value);
        } catch (error) {
            return fallback;
        }
    }

    function escapeHtml(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function escapeSelector(value) {
        if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(value);
        return String(value).replace(/["\\]/g, "\\$&");
    }

    function setStatus(selector, message, tone) {
        const status = document.querySelector(selector);
        if (!status) return;
        status.textContent = message;
        status.dataset.tone = tone || "neutral";
    }

    function renderList(items) {
        return `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
    }

    function renderFlow(items) {
        return `<div class="reasoning-scaffold-flow reasoning-scaffold-flow--compact">${items.map(function (item, index) {
            const arrow = index < items.length - 1 ? '<i class="fas fa-arrow-right" aria-hidden="true"></i>' : "";
            return `<div><strong>${escapeHtml(item[0])}</strong><span>${escapeHtml(item[1])}</span></div>${arrow}`;
        }).join("")}</div>`;
    }

    function renderTable(table) {
        if (!table) return "";
        return `<div class="reasoning-scaffold-table-wrap"><table><thead><tr>${table.headers.map(header => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    }

    function renderPrompt(lines) {
        return `<div class="reasoning-code-block"><div><i class="fas fa-terminal"></i><span>Prompt Pattern</span></div><pre><code>${escapeHtml(lines.join("\\n"))}</code></pre></div>`;
    }

    function renderSourcePanel(containerId, label) {
        return `<details class="reasoning-source-panel-details" style="margin-top: 32px; border: 1px solid var(--fellow-line); border-radius: 14px; overflow: hidden; background: #fff;">
            <summary style="padding: 16px 20px; font-weight: 600; color: var(--fellow-text); cursor: pointer; background: var(--fellow-pink-light, #fff7fb); display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-file-lines" style="color: var(--fellow-pink);"></i>
                <span>Referensi Teks Lengkap: ${escapeHtml(label)}</span>
            </summary>
            <div id="${escapeHtml(containerId)}" class="reasoning-source-container" style="padding: 24px; font-size: 0.95rem;">
                <p class="reasoning-source-loading"><i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Memuat materi sumber...</p>
            </div>
        </details>`;
    }


    var SOURCE_VISUALS = {
        "01-full.html": {
            eyebrow: "Reasoning Anatomy Lab",
            title: "Dari Menjawab ke Menalar",
            description: "Cara AI menghubungkan fakta dan asumsi untuk menghasilkan kesimpulan yang dapat diaudit.",
            options: [
                ["Jawab Langsung", "fas fa-bolt", "Insting Cepat", "Jawaban singkat tanpa langkah — cocok untuk definisi sederhana.", "Menjawab satu fakta atau definisi."],
                ["Reasoning", "fas fa-brain", "Hubungan Logis", "Menghubungkan beberapa informasi untuk memperoleh hasil baru.", "Tugas perhitungan, audit, atau perbandingan."],
                ["Fakta & Asumsi", "fas fa-layer-group", "Pemisahan Data", "Fakta adalah informasi tersedia. Asumsi adalah anggapan agar proses bisa dilanjutkan.", "Wajib dibedakan untuk menghindari simpulan yang menyesatkan."]
            ]
        },
        "02-full.html": {
            eyebrow: "Verification Lab",
            title: "Reasoning yang Dapat Diperiksa",
            description: "Penjelasan yang meyakinkan bukan jaminan validitas. Setiap langkah harus bisa diaudit.",
            options: [
                ["Cek Data", "fas fa-database", "Verifikasi Input", "Apakah semua data relevan sudah dipakai? Apakah ada yang mengada-ada?", "Langkah pertama sebelum menilai hasil."],
                ["Cek Urutan", "fas fa-list-ol", "Verifikasi Proses", "Apakah urutan langkah masuk akal? Apakah dependensi terpenuhi?", "Mencegah hasil yang benar tapi jalannya salah."],
                ["Cek Hasil", "fas fa-check-double", "Verifikasi Output", "Apakah angka, satuan, dan batasan konsisten? Apakah kesimpulan mengikuti data?", "Langkah terakhir sebelum jawaban diterima."]
            ]
        },
        "03-full.html": {
            eyebrow: "Planning Studio",
            title: "Planning & Problem Decomposition",
            description: "Memecah tujuan besar menjadi langkah eksekusi dengan dependensi yang benar.",
            options: [
                ["Goal & Constraints", "fas fa-bullseye", "Tujuan & Batasan", "Goal adalah hasil akhir. Constraints adalah batasan yang harus dipatuhi.", "Tanpa goal dan batasan jelas, rencana akan kabur."],
                ["Decomposition", "fas fa-layer-group", "Pecah Tugas", "Memecah tugas besar menjadi subtugas yang dapat dikerjakan satu per satu.", "Work Breakdown Structure."],
                ["Static vs Dynamic", "fas fa-arrows-spin", "Rencana Fleksibel", "Static: jalankan sesuai rencana awal. Dynamic: perbarui berdasarkan hasil observasi.", "Replanning adalah tanda kecerdasan, bukan kegagalan."]
            ]
        },
        "04-full.html": {
            eyebrow: "Structured Reasoning Lab",
            title: "Chain-of-Thought & Langkah Perantara",
            description: "Langkah perantara membuat jawaban lebih mudah diaudit, meski tidak menjamin kebenaran.",
            options: [
                ["Direct vs Structured", "fas fa-code-compare", "Bandingkan Pendekatan", "Jawaban langsung ('Anggaran cukup') vs jawaban bertahap ('total = … sisa = …').", "Tugas kompleks butuh langkah perantara yang bisa diperiksa."],
                ["Prompt Transformer", "fas fa-wand-sparkles", "Ubah Prompt", "Prompt sederhana diubah menjadi instruksi bertahap: 'Identifikasi data → Susun langkah → Periksa → Jawab'.", "Zero-shot dan few-shot pattern."],
                ["Faithfulness Callout", "fas fa-triangle-exclamation", "Waspadai Ilusi", "Langkah yang rapi bisa saja rationalization dari jawaban yang sudah dipilih sebelumnya.", "CoT membantu struktur, bukan bukti mutlak kebenaran."]
            ]
        },
        "05-full.html": {
            eyebrow: "Tool Decision Lab",
            title: "Tool Use yang Bertanggung Jawab",
            description: "Kapan AI perlu tool, tool apa yang tepat, dan bagaimana memvalidasi output-nya.",
            options: [
                ["Perlu Tool?", "fas fa-circle-question", "Decision Tree", "Apakah informasi ada dalam model? Apakah perlu akses real-time? Apakah perlu komputasi?", "Tidak semua tugas butuh tool eksternal."],
                ["Pilih & Parameter", "fas fa-sliders", "Tool Matching", "Tool yang tepat + parameter yang benar = output yang berguna. Salah satu saja bisa gagal.", "Kalkulator vs spreadsheet vs API cuaca — beda tugas, beda tool."],
                ["Observation & Risk", "fas fa-eye", "Validasi & Izin", "Baca hasil tool. Validasi. Periksa error. Hormati batas otorisasi.", "Permission denied bukan berarti harus mengarang data."]
            ]
        },
        "06-full.html": {
            eyebrow: "Integrated Mission",
            title: "Misi Reasoning Terpadu",
            description: "Reasoning, planning, dan tool use bersatu dalam loop iteratif: Reason → Plan → Act → Observe → Update → Answer.",
            options: [
                ["Reason → Plan", "fas fa-compass", "Pahami & Rencanakan", "Pahami tugas, identifikasi data, susun rencana dan tentukan tool yang diperlukan.", "Foundation dari seluruh loop."],
                ["Act → Observe", "fas fa-play", "Eksekusi & Amati", "Jalankan tool, baca hasil, bandingkan dengan ekspektasi.", "Di sinilah banyak kegagalan terdeteksi."],
                ["Update → Answer → Verify", "fas fa-flag-checkered", "Perbarui & Verifikasi", "Perbarui rencana jika perlu, beri jawaban, lalu verifikasi akhir sebelum disampaikan.", "Gate terakhir sebelum jawaban sampai ke pengguna."]
            ]
        }
    };

    function getSourceFile(path) {
        return String(path || "").split("/").pop();
    }

    function renderSourceVisualLab(config) {
        if (!config) return "";
        return `<section class="reasoning-concept-lab" aria-label="${escapeHtml(config.title)}">
            <div class="reasoning-concept-lab-head">
                <div><span>${escapeHtml(config.eyebrow)}</span><h4>${escapeHtml(config.title)}</h4></div>
                <span class="reasoning-concept-counter">1 / ${config.options.length}</span>
            </div>
            <div class="reasoning-concept-tabs" role="tablist">
                ${config.options.map(function (option, index) {
                    return `<button type="button" role="tab" aria-selected="${index === 0}" data-concept-index="${index}"><i class="${escapeHtml(option[1])}" aria-hidden="true"></i><span>${escapeHtml(option[0])}</span></button>`;
                }).join("")}
            </div>
            <div class="reasoning-concept-stage" role="tabpanel" tabindex="0">
                <div class="reasoning-concept-node"><i class="${escapeHtml(config.options[0][1])}" aria-hidden="true"></i></div>
                <div><span>${escapeHtml(config.options[0][2])}</span><h5>${escapeHtml(config.options[0][0])}</h5><p>${escapeHtml(config.options[0][3])}</p><small><i class="fas fa-location-dot" aria-hidden="true"></i>${escapeHtml(config.options[0][4])}</small></div>
            </div>
        </section>`;
    }

    function initSourceVisualLab(container, config) {
        if (!config) return;
        const stage = container.querySelector(".reasoning-concept-stage");
        const counter = container.querySelector(".reasoning-concept-counter");
        container.querySelectorAll("[data-concept-index]").forEach(function (button) {
            button.addEventListener("click", function () {
                const index = Number(button.dataset.conceptIndex);
                const option = config.options[index];
                if (!stage || !option) return;
                container.querySelectorAll("[data-concept-index]").forEach(function (tab) {
                    tab.setAttribute("aria-selected", String(tab === button));
                });
                stage.innerHTML = `<div class="reasoning-concept-node"><i class="${escapeHtml(option[1])}" aria-hidden="true"></i></div><div><span>${escapeHtml(option[2])}</span><h5>${escapeHtml(option[0])}</h5><p>${escapeHtml(option[3])}</p><small><i class="fas fa-location-dot" aria-hidden="true"></i>${escapeHtml(option[4])}</small></div>`;
                if (counter) counter.textContent = (index + 1) + " / " + config.options.length;
            });
        });
    }

    function structureSourceParagraph(paragraph) {
        const copy = document.createElement("div");
        copy.className = "reasoning-source-step-copy";
        while (paragraph.firstChild) copy.appendChild(paragraph.firstChild);

        const directLabels = Array.from(copy.children).filter(function (child) {
            return child.tagName === "STRONG";
        });
        if (directLabels.length > 1) {
            const compound = document.createElement("div");
            compound.className = "reasoning-source-compound";
            let section = null;
            Array.from(copy.childNodes).forEach(function (node) {
                if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "STRONG") {
                    section = document.createElement("section");
                    section.className = "reasoning-source-subsection";
                    compound.appendChild(section);
                }
                if (!section) {
                    section = document.createElement("section");
                    section.className = "reasoning-source-subsection";
                    compound.appendChild(section);
                }
                section.appendChild(node);
            });
            copy.appendChild(compound);
            paragraph.classList.add("is-compound");
        }
        paragraph.appendChild(copy);
    }

    function enhanceSourceMaterialForCanvas(container, chapter) {
        if (!container) return;

        // Hapus module-level headings dari source (Deskripsi Modul, Tujuan Pembelajaran, Peta Pembelajaran)
        // karena hanya relevan di level module, bukan per-chapter
        var moduleHeadings = ["deskripsi modul", "tujuan pembelajaran", "peta pembelajaran"];
        container.querySelectorAll("h2").forEach(function (h2) {
            var text = (h2.textContent || "").toLowerCase().trim();
            if (moduleHeadings.some(function (kw) { return text.indexOf(kw) !== -1; })) {
                var next = h2.nextElementSibling;
                while (next && !next.matches("h1, h2, hr")) {
                    var toRemove = next;
                    next = next.nextElementSibling;
                    toRemove.remove();
                }
                h2.remove();
                // Hapus <hr> setelah heading jika ada
                if (next && next.matches("hr")) {
                    next.remove();
                }
            }
        });

        // Tambah data-section="konsep" ke source H2s agar nav chip bisa scroll ke sana
        container.querySelectorAll("h2").forEach(function (h2) {
            if (!h2.closest(".reasoning-end-of-chapter, .ai-modern-chapter-hero")) {
                h2.setAttribute("data-section", "konsep");
            }
        });

        container.querySelectorAll("table").forEach(function (table) {
            if (!table.parentElement.classList.contains("reasoning-scaffold-table-wrap")) {
                var scroll = document.createElement("div");
                scroll.className = "reasoning-scaffold-table-wrap";
                table.parentNode.insertBefore(scroll, table);
                scroll.appendChild(table);
            }
        });
        container.querySelectorAll("pre").forEach(function (block) {
            if (!block.parentElement.classList.contains("reasoning-code-block")) {
                var wrapper = document.createElement("div");
                wrapper.className = "reasoning-code-block";
                wrapper.innerHTML = '<div><i class="fas fa-code"></i><span>Snippet</span></div>';
                block.parentNode.insertBefore(wrapper, block);
                wrapper.appendChild(block);
            }
        });
        container.querySelectorAll("blockquote").forEach(function (bq) {
            bq.classList.add("reasoning-scaffold-callout");
        });
    }

    function enhanceSourceMaterial(container, path) {
        if (arguments.length > 2 && arguments[2]) {
            const chapter = arguments[2];
            container.querySelectorAll("h2, h3, h4").forEach(function (heading) {
                const text = heading.textContent.toLowerCase();
                let replacement = null;

                if (text.includes("visual flow") && chapter.flow) {
                    replacement = `<section class="reasoning-visual-board" aria-label="Visualisasi reasoning">
                        <div class="reasoning-visual-head"><i class="fas fa-route" aria-hidden="true"></i><div><span>Visual reasoning flow</span><h3>Alur pikir yang bisa dilacak</h3></div></div>
                        ${renderFlow(chapter.flow)}
                    </section>`;
                } else if (text.includes("quick check") && chapter.quickCheck) {
                    replacement = `<section class="reasoning-quick-check" data-check-answer="${chapter.quickCheck.answer}">
                        <div class="reasoning-quick-head"><i class="fas fa-circle-question" aria-hidden="true"></i><div><span>Quick Check</span><h3>${escapeHtml(chapter.quickCheck.question)}</h3></div></div>
                        <div class="reasoning-check-options">
                            ${chapter.quickCheck.options.map((option, index) => `<button type="button" data-check-option="${index}"><b>${String.fromCharCode(65 + index)}</b><span>${escapeHtml(option)}</span></button>`).join("")}
                        </div>
                        <p class="reasoning-check-feedback" hidden>${escapeHtml(chapter.quickCheck.explanation)}</p>
                    </section>`;
                } else if (text.includes("mini challenge") && chapter.challenge) {
                    replacement = `<section class="reasoning-mini-challenge">
                        <div><i class="fas fa-pen-ruler" aria-hidden="true"></i><span>Mini Challenge</span></div>
                        <h3>Latihan reflektif singkat</h3>
                        <p>${escapeHtml(chapter.challenge)}</p>
                    </section>`;
                } else if (text.includes("common mistakes") && chapter.mistakes) {
                    replacement = `<section class="reasoning-scaffold-checklist">
                        <h3><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Common mistakes</h3>
                        ${renderList(chapter.mistakes)}
                    </section>`;
                } else if (text.includes("ringkasan") && chapter.summary) {
                    replacement = `<section class="reasoning-scaffold-summary">
                        <h3><i class="fas fa-bookmark" aria-hidden="true"></i> Ringkasan</h3>
                        <p>${escapeHtml(chapter.summary)}</p>
                    </section>`;
                } else if (text.includes("contoh ai") && chapter.llmExample) {
                    replacement = `<section class="reasoning-scaffold-example">
                        <span>Contoh AI/LLM</span>
                        <h3>Bagaimana konsep ini muncul di produk AI</h3>
                        <p>${escapeHtml(chapter.llmExample)}</p>
                    </section>`;
                } else if (text.includes("analogi:") && chapter.analogy) {
                    replacement = `<section class="reasoning-scaffold-callout">
                        <i class="fas fa-lightbulb" aria-hidden="true"></i>
                        <p><strong>Analogi:</strong> ${escapeHtml(chapter.analogy)}</p>
                    </section>`;
                }

                if (replacement) {
                    let current = heading.nextElementSibling;
                    while (current && !current.matches("h1, h2, h3, h4")) {
                        const next = current.nextElementSibling;
                        current.remove();
                        current = next;
                    }
                    heading.insertAdjacentHTML("afterend", replacement);
                    heading.remove();
                }
            });

            if (typeof initQuickChecks === "function") {
                initQuickChecks(container);
            }
        }

                const material = container.querySelector(".reasoning-source-material");
        if (!material) return;

        material.querySelectorAll("table").forEach(function (table) {
            if (!table.parentElement.classList.contains("reasoning-scaffold-table-wrap")) {
                const scroll = document.createElement("div");
                scroll.className = "reasoning-scaffold-table-wrap";
                table.parentNode.insertBefore(scroll, table);
                scroll.appendChild(table);
            }
        });
    }

    function stripSourceNumbering(html) {
        // Hapus penomoran lama dari heading (mis: "1.4 " → "", "Submateri 1 — " → "")
        return html.replace(
            /(<h[12][^>]*>)(?:(?:\d+\.\d+\s*)|(?:Submateri\s+\d+\s*(?:—|-)\s*)|(?:Integrasi\s*(?:—|-)\s*))/gi,
            "$1"
        );
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function filterSourceHeadings(html) {
        // Hapus module-level headings dan kontennya hingga <hr /> pertama
        // Module dimulai dengan H1: "Reasoning AI:" dan diikuti H2: Deskripsi/Tujuan/Peta
        // Kita hapus sejak H1 module hingga <hr /> sebelum Submateri 1
        var moduleEndMarker = '<h1>Submateri 1';
        var moduleEndIdx = html.indexOf(moduleEndMarker);
        if (moduleEndIdx !== -1) {
            // Cari <hr /> terakhir SEBELUM Submateri 1
            var beforeSub = html.slice(0, moduleEndIdx);
            var lastHr = beforeSub.lastIndexOf('<hr');
            if (lastHr !== -1) {
                // Hapus dari H1 module hingga <hr /> (termasuk)
                var h1ModStart = html.indexOf('<h1>Reasoning AI');
                if (h1ModStart !== -1 && h1ModStart < lastHr) {
                    // Cari akhir tag <hr...> (bisa <hr>, <hr/>, <hr />)
                    var hrEnd = html.indexOf('>', lastHr);
                    var hrLen = hrEnd !== -1 ? hrEnd - lastHr + 1 : 4;
                    html = html.slice(0, h1ModStart) + html.slice(lastHr + hrLen);
                    moduleEndIdx = html.indexOf(moduleEndMarker);
                }
            }
        }
        // Fallback: masih cari H2 module headings + ringkasan submateri (redundan dengan pedagogical Ringkasan)
        var removeKeywords = ["deskripsi modul", "tujuan pembelajaran", "peta pembelajaran", "ringkasan submateri"];
        var lines = html.split("\n");
        var result = [];
        var skip = false;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var isModuleH2 = false;
            if (/<h2>/i.test(line) || /<h2\s/i.test(line)) {
                var text = line.replace(/<[^>]+>/g, "").toLowerCase().trim();
                for (var k = 0; k < removeKeywords.length; k++) {
                    if (text.indexOf(removeKeywords[k]) !== -1) {
                        isModuleH2 = true;
                        break;
                    }
                }
            }
            if (isModuleH2) {
                skip = true;
                continue;
            }
            if (skip) {
                if (/<h[12][^>]*>/i.test(line) || /<hr\s*\/?>/i.test(line)) {
                    skip = false;
                    if (/<hr\s*\/?>/i.test(line)) continue;
                } else {
                    continue;
                }
            }
            result.push(line);
        }
        return result.join("\n");
    }

    function injectAfterHeading(html, headingText, injectHtml) {
        // Cari heading H2 yang mengandung teks tertentu, sisipkan injectHtml SETELAH seluruh konten section itu
        var escaped = escapeRegex(headingText);
        var pattern = new RegExp(
            '(<h[12][^>]*>[\\s\\S]*?' + escaped + '[\\s\\S]*?(?:</h[12]>)[\\s\\S]*?)(?=<h[12]|<hr\\s*/?>|$)',
            "i"
        );
        var match = html.match(pattern);
        if (!match) return html;
        var before = html.slice(0, match.index + match[1].length);
        var after = html.slice(match.index + match[1].length);
        return before + "\n" + injectHtml + "\n" + after;
    }

    function renderOrientationAndNav(module, chapterNum, total) {
        var objectivesHtml = (module.objectives || []).map(function(obj) {
            return '<li><span class="ai-modern-objective-copy">' + escapeHtml(obj) + '</span></li>';
        }).join("");
        
        var analogyHtml = module.analogy ? '<div class="reasoning-scaffold-callout reasoning-analogy-callout" style="margin-top: 15px;"><i class="fas fa-lightbulb" aria-hidden="true"></i><p><strong>Analogi:</strong> ' + escapeHtml(module.analogy) + '</p></div>' : '';

        var heroHtml = '<header class="ai-modern-chapter-hero" data-reasoning-injected data-section="orientation">' +
            '<span>Topik ' + chapterNum + ' · ' + escapeHtml(module.duration) + '</span>' +
            '<h2>' + escapeHtml(module.title) + '</h2>' +
            '<p>' + escapeHtml(module.summary) + '</p>' +
            '<div class="ai-modern-objectives">' +
                '<strong>Tujuan pembelajaran</strong>' +
                '<ul>' + objectivesHtml + '</ul>' +
            '</div>' + analogyHtml +
        '</header>';

        var navHtml = '<nav class="reasoning-source-jumps reasoning-visual-nav ai-modern-learning-nav" data-reasoning-injected id="reasoning-visual-nav" aria-label="Tahapan Topik ' + chapterNum + ' dari ' + total + '">' +
            '<span><i class="' + escapeHtml(module.icon) + '"></i> Jelajahi:</span>' +
            '<button type="button" data-jump="hook">Pembuka</button>' +
            '<button type="button" data-jump="konsep">Konsep</button>' +
            '<button type="button" data-jump="contoh">Contoh & Latihan</button>' +
            '<button type="button" data-jump="check">Uji Pemahaman</button>' +
            '<button type="button" data-jump="ringkasan">Ringkasan</button>' +
        '</nav>';

        return heroHtml + '\n' + navHtml;
    }

    function renderEndOfChapter(module, chapterNum, total, visualConfig) {
        var parts = [];
        if (module.flow && module.flow.length) {
            parts.push('<section class="reasoning-visual-board" data-section="contoh" aria-label="Alur reasoning">\n                <div class="reasoning-visual-head"><i class="fas fa-route" aria-hidden="true"></i><div><span>Visual reasoning flow</span><h3>Alur pikir yang bisa dilacak</h3></div></div>\n                ' + renderFlow(module.flow) + '\n            </section>');
        }
        if (module.example) {
            parts.push(finalRenderExampleSection(module.example));
        }
        if (module.quickCheck) {
            parts.push(finalRenderQuickCheckSection(module.quickCheck));
        }
        if (module.llmExample) {
            parts.push('<section class="reasoning-scaffold-example" data-section="contoh">\n                <span>Contoh AI/LLM</span>\n                <h3>Bagaimana konsep ini muncul di produk AI</h3>\n                <p>' + escapeHtml(module.llmExample) + '</p>\n            </section>');
        }
        if (module.prompt && module.prompt.length) {
            parts.push(finalRenderPromptSection(module.prompt));
        }
        if (module.challenge) {
            parts.push(finalRenderChallengeSection(module.challenge, chapterNum));
        }
        if ((module.mistakes && module.mistakes.length) || (module.bestPractices && module.bestPractices.length)) {
            parts.push(finalRenderMistakesPractices(module.mistakes || [], module.bestPractices || []));
        }
        if (module.learningOutcomes && module.learningOutcomes.length) {
            parts.push(finalRenderSummarySection(module.learningOutcomes, module.transition, chapterNum, total));
        }
        return '<div class="reasoning-end-of-chapter">' + parts.join("\n") + '</div>';
    }

    function loadSourceHtml(path, containerId, chapter) {
        var container = document.getElementById(containerId);
        if (!container || !path) return;
        fetch(path, { cache: "no-store" })
            .then(function (response) {
                if (!response.ok) throw new Error("Gagal memuat " + path);
                return response.text();
            })
            .then(function (html) {
                container.innerHTML = html;
                container.classList.add("is-source-view");
                enhanceSourceMaterialForCanvas(container, chapter);
            })
            .catch(function () {
                container.innerHTML = '<div class="reasoning-source-error"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><p>Materi sumber belum bisa dimuat. Refresh halaman atau cek path source Reasoning.</p></div>';
            });
    }

    function finalRenderHookSection(hook) {
        return '<section class="reasoning-hook-section" data-section="hook">\n            <div class="reasoning-hook-head"><i class="fas fa-hand-pointer" aria-hidden="true"></i><div><span>Pembuka</span><h3>' + escapeHtml(hook.question) + '</h3></div></div>\n            <div class="reasoning-hook-options">\n                <button type="button" class="reasoning-hook-card" data-hook-option="a">\n                    <div class="reasoning-hook-card-icon"><i class="' + escapeHtml(hook.answerA.icon) + '" aria-hidden="true"></i></div>\n                    <div><strong>' + escapeHtml(hook.answerA.label) + '</strong><p>' + escapeHtml(hook.answerA.text) + '</p></div>\n                </button>\n                <button type="button" class="reasoning-hook-card" data-hook-option="b">\n                    <div class="reasoning-hook-card-icon"><i class="' + escapeHtml(hook.answerB.icon) + '" aria-hidden="true"></i></div>\n                    <div><strong>' + escapeHtml(hook.answerB.label) + '</strong><p>' + escapeHtml(hook.answerB.text) + '</p></div>\n                </button>\n            </div>\n            <p class="reasoning-hook-message" hidden>' + escapeHtml(hook.message) + '</p>\n        </section>';
    }

    function finalRenderOpeningSection(paragraphs) {
        return '<section class="reasoning-opening-section" data-section="pembuka">\n            ' + paragraphs.map(function (p) { return '<p>' + p + '</p>'; }).join("\n") + '\n        </section>';
    }

    function finalRenderComparisonTable(table) {
        return '<section class="reasoning-scaffold-section reasoning-compare-section" data-section="konsep">\n            <div class="reasoning-compare-grid">\n                <div class="reasoning-compare-col">\n                    <h4>' + escapeHtml(table.left.title) + '</h4>\n                    <ul>' + table.left.rows.map(function (r) { return '<li>' + escapeHtml(r) + '</li>'; }).join("") + '</ul>\n                </div>\n                <div class="reasoning-compare-col reasoning-compare-col-accent">\n                    <h4>' + escapeHtml(table.right.title) + '</h4>\n                    <ul>' + table.right.rows.map(function (r) { return '<li>' + escapeHtml(r) + '</li>'; }).join("") + '</ul>\n                </div>\n            </div>\n        </section>';
    }

    function finalRenderConceptSections(concepts) {
        return concepts.map(function (concept) {
            var contentHtml = "";
            if (concept.content) {
                contentHtml += concept.content.map(function (p) { return '<p>' + p + '</p>'; }).join("\n");
            }
            if (concept.table) {
                var t = concept.table;
                contentHtml += '<div class="reasoning-scaffold-table-wrap"><table><thead><tr>' + t.headers.map(function (h) { return '<th>' + escapeHtml(h) + '</th>'; }).join("") + '</tr></thead><tbody>' + t.rows.map(function (row) { return '<tr>' + row.map(function (cell) { return '<td>' + escapeHtml(cell) + '</td>'; }).join("") + '</tr>'; }).join("") + '</tbody></table></div>';
            }
            if (concept.numberedList) {
                contentHtml += '<ol class="reasoning-numbered-list">' + concept.numberedList.map(function (item) { return '<li>' + item + '</li>'; }).join("") + '</ol>';
            }
            if (concept.diagram) {
                contentHtml += '<div class="reasoning-diagram-flow">' + concept.diagram.map(function (step, i) {
                    return '<div class="reasoning-diagram-step"><span>' + (i + 1) + '</span><p>' + escapeHtml(step) + '</p></div>' + (i < concept.diagram.length - 1 ? '<i class="fas fa-arrow-down" aria-hidden="true"></i>' : '');
                }).join("") + '</div>';
            }
            return '<section class="reasoning-concept-card" data-section="konsep">\n                <h3><i class="fas fa-book-open" aria-hidden="true"></i> ' + escapeHtml(concept.title) + '</h3>\n                ' + contentHtml + '\n            </section>';
        }).join("\n");
    }

    function finalRenderExampleSection(example) {
        var stepsHtml = example.steps.map(function (step) {
            return '<div class="reasoning-example-step"><strong>' + escapeHtml(step.label) + '</strong><p>' + escapeHtml(step.text) + '</p></div>';
        }).join("");
        var errorsHtml = example.commonErrors && example.commonErrors.length ? '<div class="reasoning-scaffold-callout" style="margin-top:14px"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><p><strong>Kesalahan yang mungkin terjadi:</strong></p><ul>' + example.commonErrors.map(function (e) { return '<li>' + escapeHtml(e) + '</li>'; }).join("") + '</ul></div>' : '';
        return '<section class="reasoning-example-section" data-section="contoh">\n                <div class="reasoning-example-head"><i class="fas fa-flask" aria-hidden="true"></i><div><span>Contoh Terurai</span><h3>' + escapeHtml(example.title) + '</h3></div></div>\n                <div class="reasoning-example-case"><strong>Kasus:</strong> ' + escapeHtml(example.case) + '</div>\n                <div class="reasoning-example-steps">' + stepsHtml + '</div>\n                <div class="reasoning-scaffold-summary" style="margin-top:14px"><strong>Kesimpulan:</strong> ' + escapeHtml(example.conclusion) + '</div>\n                ' + errorsHtml + '\n            </section>';
    }

    function finalRenderQuickCheckSection(qc) {
        return '<section class="reasoning-quick-check reasoning-qc-enhanced" data-reasoning-injected data-section="check" data-check-answer="' + qc.answer + '" data-check-correct="' + escapeHtml(qc.explanationCorrect || "") + '" data-check-wrong="' + escapeHtml(qc.explanationWrong || "") + '"><div class="reasoning-quick-head"><i class="fas fa-circle-question" aria-hidden="true"></i><div><span>Quick Check</span><h3>' + escapeHtml(qc.question) + '</h3></div></div><div class="reasoning-check-options">' + qc.options.map(function (option, index) { return '<button type="button" data-check-option="' + index + '"><b>' + String.fromCharCode(65 + index) + '</b><span>' + escapeHtml(option) + '</span></button>'; }).join("") + '</div><div class="reasoning-check-actions"><button type="button" class="reasoning-scaffold-check-button" data-check-submit><i class="fas fa-check"></i> Periksa Jawaban</button><button type="button" class="reasoning-scaffold-reveal-button reasoning-check-retry" data-check-retry hidden><i class="fas fa-rotate-left"></i> Coba Lagi</button></div><p class="reasoning-check-feedback" aria-live="polite" hidden></p></section>';
    }

    function finalRenderChallengeSection(challenge, chapterNumber) {
        var key = 'heraiAiReasoningChallengeCh' + chapterNumber;
        return '<section class="reasoning-challenge-workspace" data-section="challenge" data-challenge-workspace="' + key + '">\n                <div class="reasoning-challenge-head"><i class="fas fa-pen-ruler" aria-hidden="true"></i><div><span>Mini Challenge</span><h3>Latihan reflektif</h3></div></div>\n                <p class="reasoning-challenge-instruction">' + escapeHtml(challenge.instruction) + '</p>\n                <textarea class="reasoning-challenge-textarea" data-challenge-textarea="' + key + '" rows="5" placeholder="' + escapeHtml(challenge.placeholder) + '"></textarea>\n                <div class="reasoning-challenge-actions">\n                    <button type="button" class="btn-reasoning-save" data-challenge-save><i class="fas fa-floppy-disk" aria-hidden="true"></i> Simpan</button>\n                    <button type="button" class="btn-reasoning-edit" data-challenge-edit hidden><i class="fas fa-pen" aria-hidden="true"></i> Edit</button>\n                    <button type="button" class="btn-reasoning-reset" data-challenge-reset><i class="fas fa-rotate-left" aria-hidden="true"></i> Reset</button>\n                    <button type="button" class="btn-reasoning-example" data-challenge-example hidden><i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat Contoh</button>\n                </div>\n                <div class="reasoning-challenge-example" data-challenge-example-content hidden><strong>Contoh:</strong><p>' + escapeHtml(challenge.example) + '</p></div>\n            </section>';
    }

    function finalRenderMistakesPractices(mistakes, bestPractices) {
        return '<section class="reasoning-mistakes-practices" data-section="ringkasan">\n                <div class="reasoning-mp-grid">\n                    <div class="reasoning-mp-col reasoning-mp-mistakes">\n                        <h3><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Common Mistakes</h3>\n                        <ul>' + mistakes.map(function (m) { return '<li>' + escapeHtml(m) + '</li>'; }).join("") + '</ul>\n                    </div>\n                    <div class="reasoning-mp-col reasoning-mp-practices">\n                        <h3><i class="fas fa-circle-check" aria-hidden="true"></i> Best Practices</h3>\n                        <ul>' + bestPractices.map(function (bp) { return '<li>' + escapeHtml(bp) + '</li>'; }).join("") + '</ul>\n                    </div>\n                </div>\n            </section>';
    }

    function finalRenderSummarySection(outcomes, transition, chapterNumber, total) {
        var transHtml = transition ? '<div class="reasoning-transition"><i class="fas fa-arrow-right" aria-hidden="true"></i><p><strong>Selanjutnya:</strong> ' + escapeHtml(transition) + '</p></div>' : '';
        return '<section class="reasoning-summary-section" data-section="ringkasan">\n                <div class="reasoning-summary-head"><i class="fas fa-bookmark" aria-hidden="true"></i><div><span>Ringkasan</span><h3>Setelah chapter ini, kamu dapat:</h3></div></div>\n                <ul class="reasoning-outcomes-list">' + outcomes.map(function (o) { return '<li><i class="fas fa-circle-check" aria-hidden="true"></i> ' + escapeHtml(o) + '</li>'; }).join("") + '</ul>\n                ' + transHtml + '\n            </section>';
    }

    function finalRenderPromptSection(lines) {
        var cleanLines = lines.map(function (line) { return escapeHtml(line); });
        return '<section class="reasoning-prompt-section">\n                <div class="reasoning-code-block">\n                    <div><i class="fas fa-terminal" aria-hidden="true"></i><span>Prompt Pattern</span><button type="button" class="reasoning-copy-btn" data-copy-content="' + escapeHtml(lines.join("\n")) + '" aria-label="Salin prompt"><i class="fas fa-copy"></i></button></div>\n                    <pre><code>' + cleanLines.join("\n") + '</code></pre>\n                </div>\n            </section>';
    }

    function setupViewToggle(container) {
        var toggle = container.querySelector(".reasoning-view-toggle");
        var visualCanvas = container.querySelector(".reasoning-visual-canvas");
        var sourcePanel = container.querySelector(".reasoning-source-panel");
        var visualNav = container.querySelector(".reasoning-visual-nav");
        var sourceNav = container.querySelector(".reasoning-source-nav");
        if (!toggle || !visualCanvas || !sourcePanel) return;
        toggle.querySelectorAll("[data-reasoning-view]").forEach(function (button) {
            button.addEventListener("click", function () {
                var view = button.dataset.reasoningView;
                var isVisual = view === "visual";
                toggle.querySelectorAll("[data-reasoning-view]").forEach(function (btn) {
                    btn.classList.toggle("is-active", btn === button);
                    btn.setAttribute("aria-pressed", String(btn === button));
                });
                visualCanvas.hidden = !isVisual;
                sourcePanel.hidden = isVisual;
                if (visualNav) visualNav.hidden = !isVisual;
                if (sourceNav) sourceNav.hidden = isVisual;
            });
        });
    }

    function setupHookInteraction(container) {
        container.querySelectorAll(".reasoning-hook-section").forEach(function (section) {
            var message = section.querySelector(".reasoning-hook-message");
            section.querySelectorAll("[data-hook-option]").forEach(function (button) {
                button.addEventListener("click", function () {
                    section.querySelectorAll("[data-hook-option]").forEach(function (btn) {
                        btn.classList.toggle("is-selected", btn === button);
                    });
                    if (message) message.hidden = false;
                });
            });
        });
    }

    function setupQuickChecks(container) {
        container.querySelectorAll(".reasoning-quick-check").forEach(function (card) {
            var answer = Number(card.dataset.checkAnswer);
            var feedback = card.querySelector(".reasoning-check-feedback");
            var submitBtn = card.querySelector("[data-check-submit]");
            var retryBtn = card.querySelector("[data-check-retry]");
            var options = card.querySelectorAll("[data-check-option]");
            var selectedIndex = -1;

            options.forEach(function (button) {
                button.addEventListener("click", function () {
                    selectedIndex = Number(button.dataset.checkOption);
                    options.forEach(function (opt) {
                        opt.classList.toggle("is-selected", Number(opt.dataset.checkOption) === selectedIndex);
                        opt.classList.remove("is-correct", "is-wrong");
                    });
                    if (submitBtn) submitBtn.disabled = false;
                });
            });

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.addEventListener("click", function () {
                    if (selectedIndex < 0) return;
                    options.forEach(function (opt) {
                        var idx = Number(opt.dataset.checkOption);
                        opt.classList.toggle("is-correct", idx === answer);
                        opt.classList.toggle("is-wrong", idx === selectedIndex && idx !== answer);
                    });
                    if (feedback) {
                        feedback.hidden = false;
                        feedback.textContent = selectedIndex === answer ? (card.dataset.answerCorrectText || "Benar!") : (card.dataset.answerWrongText || "Belum tepat.");
                        feedback.dataset.tone = selectedIndex === answer ? "success" : "warning";
                    }
                    submitBtn.hidden = true;
                    if (retryBtn) retryBtn.hidden = false;
                });
            }

            if (retryBtn) {
                retryBtn.addEventListener("click", function () {
                    selectedIndex = -1;
                    options.forEach(function (opt) {
                        opt.classList.remove("is-selected", "is-correct", "is-wrong");
                    });
                    if (feedback) feedback.hidden = true;
                    retryBtn.hidden = true;
                    if (submitBtn) { submitBtn.hidden = false; submitBtn.disabled = true; }
                });
            }
        });
    }

    function setupChallengeInteraction(container) {
        container.querySelectorAll("[data-challenge-textarea]").forEach(function (textarea) {
            var section = textarea.closest(".reasoning-challenge-workspace");
            if (!section) return;
            var key = textarea.dataset.challengeTextarea || section.dataset.challengeWorkspace || section.dataset.challengeKey;
            if (!key) return;
            var saved = localStorage.getItem(key);
            if (saved && saved !== "undefined") textarea.value = saved;

            var saveBtn = section.querySelector("[data-challenge-save]");
            var editBtn = section.querySelector("[data-challenge-edit]");
            var resetBtn = section.querySelector("[data-challenge-reset]");
            var exampleBtn = section.querySelector("[data-challenge-example]");
            var exampleContent = section.querySelector("[data-challenge-example-content]");

            if (!saved && editBtn) editBtn.hidden = true;
            if (!textarea.value.trim() && exampleBtn) exampleBtn.hidden = true;

            if (saveBtn) saveBtn.addEventListener("click", function () {
                localStorage.setItem(key, textarea.value);
                textarea.readOnly = true;
                textarea.classList.add("is-saved");
                saveBtn.hidden = true;
                if (editBtn) editBtn.hidden = false;
                if (exampleBtn) exampleBtn.hidden = false;
            });

            if (saved && saved !== "undefined") {
                textarea.readOnly = true;
                textarea.classList.add("is-saved");
                saveBtn.hidden = true;
                if (editBtn) editBtn.hidden = false;
                if (exampleBtn) exampleBtn.hidden = false;
            }

            if (editBtn) editBtn.addEventListener("click", function () {
                textarea.readOnly = false;
                textarea.classList.remove("is-saved");
                textarea.focus();
                editBtn.hidden = true;
                if (saveBtn) saveBtn.hidden = false;
            });
            if (resetBtn) resetBtn.addEventListener("click", function () {
                if (textarea.value.trim() && !confirm("Reset jawabanmu? Jawaban yang sudah disimpan akan dihapus.")) return;
                textarea.value = "";
                textarea.readOnly = false;
                textarea.classList.remove("is-saved");
                localStorage.removeItem(key);
                if (saveBtn) saveBtn.hidden = false;
                if (editBtn) editBtn.hidden = true;
                if (exampleBtn) exampleBtn.hidden = true;
                if (exampleContent) exampleContent.hidden = true;
            });

            textarea.addEventListener("input", function () {
                if (exampleBtn && !textarea.readOnly) exampleBtn.hidden = !textarea.value.trim();
            });

            if (exampleBtn && exampleContent) {
                exampleBtn.addEventListener("click", function () {
                    exampleContent.hidden = !exampleContent.hidden;
                    exampleBtn.setAttribute("aria-expanded", String(!exampleContent.hidden));
                });
            }
        });
    }

    function setupVisualNav(container) {
        container.querySelectorAll("[data-jump]").forEach(function (button) {
            button.addEventListener("click", function () {
                var section = container.querySelector('[data-section="' + button.dataset.jump + '"]');
                if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    }

    function setupCopyButtons(container) {
        container.querySelectorAll("[data-copy-content]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var content = btn.dataset.copyContent;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(content).then(function () {
                        var icon = btn.querySelector("i");
                        if (icon) { icon.className = "fas fa-check"; setTimeout(function () { icon.className = "fas fa-copy"; }, 2000); }
                    });
                }
            });
        });
    }

    function phaseLayout(container) {
        // Sekarang kosong — nav chips udah diperbaiki, fase badges dihapus
    }

    function generateNavChips(sourceContainer, jumpsContainer) {
        if (!sourceContainer || !jumpsContainer) return;
        var headings = sourceContainer.querySelectorAll("h2, h3");
        if (!headings.length) return;
        var seen = {};
        headings.forEach(function (heading, index) {
            var text = heading.textContent.replace(/^\d+\.?\s*/, "").trim();
            if (!text || seen[text]) return;
            seen[text] = true;
            var id = "reasoning-nav-" + index;
            heading.id = id;
            var chip = document.createElement("button");
            chip.type = "button";
            chip.textContent = text;
            chip.title = text;
            chip.addEventListener("click", function () {
                var target = document.getElementById(id);
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            });
            jumpsContainer.appendChild(chip);
        });
    }

    function legacyRenderHookSection(hook) {
        return '<section class="reasoning-hook-card" data-section="hook">\n            <div class="reasoning-hook-head">\n                <i class="fas fa-hand-sparkles" aria-hidden="true"></i>\n                <div><span>Pembuka</span><h3>' + escapeHtml(hook.question) + '</h3></div>\n            </div>\n            <div class="reasoning-hook-options">\n                <button type="button" class="reasoning-hook-option" data-hook-option="a">\n                    <div class="reasoning-hook-option-icon"><i class="' + escapeHtml(hook.answerA.icon) + '" aria-hidden="true"></i></div>\n                    <div>\n                        <strong>' + escapeHtml(hook.answerA.label) + '</strong>\n                        <p>' + escapeHtml(hook.answerA.text) + '</p>\n                    </div>\n                </button>\n                <button type="button" class="reasoning-hook-option" data-hook-option="b">\n                    <div class="reasoning-hook-option-icon"><i class="' + escapeHtml(hook.answerB.icon) + '" aria-hidden="true"></i></div>\n                    <div>\n                        <strong>' + escapeHtml(hook.answerB.label) + '</strong>\n                        <p>' + escapeHtml(hook.answerB.text) + '</p>\n                    </div>\n                </button>\n            </div>\n            <div class="reasoning-hook-feedback" hidden>\n                <i class="fas fa-info-circle" aria-hidden="true"></i>\n                <p>' + escapeHtml(hook.message) + '</p>\n            </div>\n        </section>';
    }

    function renderOpeningSection(paragraphs) {
        return '<section class="reasoning-opening-section" data-section="konsep">' + paragraphs.map(function (p) {
            return '<p>' + p + '</p>';
        }).join("\n") + '</section>';
    }

    function renderComparisonTable(config) {
        return '<div class="reasoning-compare-table" data-section="konsep">\n            <div class="reasoning-compare-col reasoning-compare-col--left">\n                <div class="reasoning-compare-col-head"><i class="fas fa-bolt" aria-hidden="true"></i><strong>' + escapeHtml(config.left.title) + '</strong></div>\n                <ul>' + config.left.rows.map(function (r) { return '<li>' + escapeHtml(r) + '</li>'; }).join("") + '</ul>\n            </div>\n            <div class="reasoning-compare-col reasoning-compare-col--right">\n                <div class="reasoning-compare-col-head"><i class="fas fa-brain" aria-hidden="true"></i><strong>' + escapeHtml(config.right.title) + '</strong></div>\n                <ul>' + config.right.rows.map(function (r) { return '<li>' + escapeHtml(r) + '</li>'; }).join("") + '</ul>\n            </div>\n        </div>';
    }

    function renderConceptSections(concepts) {
        return concepts.map(function (concept, idx) {
            var parts = [];
            if (concept.diagram) {
                parts.push('<pre class="reasoning-concept-diagram"><code>' + concept.diagram.map(function (step, i) {
                    return escapeHtml(step) + (i < concept.diagram.length - 1 ? '\n        \u2193' : '');
                }).join("\n") + '</code></pre>');
            }
            if (concept.content && concept.content.length) {
                parts.push(concept.content.map(function (c) { return '<p>' + c + '</p>'; }).join("\n"));
            }
            if (concept.table) {
                parts.push('<div class="reasoning-scaffold-table-wrap"><table><thead><tr>' + concept.table.headers.map(function (h) { return '<th>' + escapeHtml(h) + '</th>'; }).join("") + '</tr></thead><tbody>' + concept.table.rows.map(function (row) { return '<tr>' + row.map(function (cell) { return '<td>' + escapeHtml(cell) + '</td>'; }).join("") + '</tr>'; }).join("") + '</tbody></table></div>');
            }
            if (concept.numberedList && concept.numberedList.length) {
                parts.push('<ol class="reasoning-numbered-list">' + concept.numberedList.map(function (item) { return '<li>' + item + '</li>'; }).join("") + '</ol>');
            }
            return '<section class="reasoning-concept-section" data-section="konsep">\n                <h3><span class="reasoning-concept-num">' + (idx + 1) + '</span> ' + escapeHtml(concept.title) + '</h3>\n                ' + parts.join("\n") + '\n            </section>';
        }).join("\n");
    }

    function renderExampleSection(example) {
        var stepsHtml = example.steps.map(function (step) {
            return '<div class="reasoning-example-step"><strong>' + escapeHtml(step.label) + '</strong><p>' + escapeHtml(step.text) + '</p></div>';
        }).join("\n");
        var errorsHtml = "";
        if (example.commonErrors && example.commonErrors.length) {
            errorsHtml = '<div class="reasoning-example-errors"><h4><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Kesalahan yang Mungkin Terjadi</h4><ul>' + example.commonErrors.map(function (e) { return '<li>' + escapeHtml(e) + '</li>'; }).join("") + '</ul></div>';
        }
        return '<section class="reasoning-example-section" data-section="contoh">\n            <div class="reasoning-example-head"><i class="fas fa-calculator" aria-hidden="true"></i><div><span>Contoh Terurai</span><h3>' + escapeHtml(example.title) + '</h3></div></div>\n            <div class="reasoning-example-case"><strong>Kasus:</strong> ' + escapeHtml(example.case) + '</div>\n            <div class="reasoning-example-steps">' + stepsHtml + '</div>\n            <div class="reasoning-example-conclusion"><i class="fas fa-check-circle" aria-hidden="true"></i><p><strong>Kesimpulan:</strong> ' + escapeHtml(example.conclusion) + '</p></div>\n            ' + errorsHtml + '\n        </section>';
    }

    function renderQuickCheckSection(qc) {
        return '<section class="reasoning-quick-check reasoning-qc-enhanced" data-section="check" data-check-answer="' + qc.answer + '">\n            <div class="reasoning-quick-head"><i class="fas fa-circle-question" aria-hidden="true"></i><div><span>Quick Check</span><h3>' + escapeHtml(qc.question) + '</h3></div></div>\n            <div class="reasoning-check-options">\n                ' + qc.options.map(function (option, index) {
                    return '<button type="button" data-check-option="' + index + '"><b>' + String.fromCharCode(65 + index) + '</b><span>' + escapeHtml(option) + '</span></button>';
                }).join("") + '\n            </div>\n            <div class="reasoning-check-actions">\n                <button type="button" class="reasoning-scaffold-check-button" data-check-submit><i class="fas fa-check" aria-hidden="true"></i> Periksa Jawaban</button>\n                <button type="button" class="reasoning-scaffold-reveal-button reasoning-check-retry" data-check-retry hidden><i class="fas fa-rotate-left" aria-hidden="true"></i> Coba Lagi</button>\n            </div>\n            <p class="reasoning-check-feedback" hidden></p>\n        </section>';
    }

    function renderPromptSection(lines) {
        var cleanLines = lines.map(function (l) { return l.replace(/\\n/g, "\n"); }).join("\n");
        return '<section class="reasoning-code-block reasoning-prompt-block" data-section="konsep">\n            <div><i class="fas fa-terminal"></i><span>Prompt Pattern</span></div>\n            <pre><code>' + cleanLines.split("\n").map(function (line) { return escapeHtml(line); }).join("\n") + '</code></pre>\n        </section>';
    }

    function renderChallengeSection(challenge, chapterNumber) {
        var storageKey = "heraiAiReasoningChallengeCh" + chapterNumber;
        return '<section class="reasoning-mini-challenge reasoning-challenge-workspace" data-section="challenge" data-challenge-key="' + storageKey + '">\n            <div class="reasoning-mini-challenge-head"><i class="fas fa-pen-ruler" aria-hidden="true"></i><div><span>Mini Challenge</span><h3>Latihan reflektif</h3></div></div>\n            <p class="reasoning-challenge-instruction">' + escapeHtml(challenge.instruction) + '</p>\n            <label class="reasoning-challenge-label"><span>Jawabanmu</span><textarea rows="5" placeholder="' + escapeHtml(challenge.placeholder) + '" data-challenge-textarea="' + storageKey + '"></textarea></label>\n            <div class="reasoning-challenge-actions">\n                <button type="button" data-challenge-save><i class="fas fa-floppy-disk" aria-hidden="true"></i> Simpan</button>\n                <button type="button" data-challenge-edit hidden><i class="fas fa-pen" aria-hidden="true"></i> Edit</button>\n                <button type="button" data-challenge-reset><i class="fas fa-rotate-left" aria-hidden="true"></i> Reset</button>\n                <button type="button" data-challenge-example hidden aria-expanded="false"><i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat Contoh</button>\n            </div>\n            <div class="reasoning-challenge-example" data-challenge-example-content hidden>\n                <strong><i class="fas fa-lightbulb" aria-hidden="true"></i> Contoh Pembahasan</strong>\n                <p>' + escapeHtml(challenge.example) + '</p>\n            </div>\n        </section>';
    }

    function renderMistakesPractices(mistakes, bestPractices) {
        return '<section class="reasoning-mistakes-practices" data-section="ringkasan">\n            <div class="reasoning-mp-grid">\n                <div class="reasoning-mp-card reasoning-mp-mistakes">\n                    <h3><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Common Mistakes</h3>\n                    <ul>' + mistakes.map(function (m) { return '<li>' + escapeHtml(m) + '</li>'; }).join("") + '</ul>\n                </div>\n                <div class="reasoning-mp-card reasoning-mp-practices">\n                    <h3><i class="fas fa-circle-check" aria-hidden="true"></i> Best Practices</h3>\n                    <ul>' + bestPractices.map(function (b) { return '<li>' + escapeHtml(b) + '</li>'; }).join("") + '</ul>\n                </div>\n            </div>\n        </section>';
    }

    function renderSummarySection(outcomes, transition, chapterNumber, total) {
        var outcomeItems = outcomes.map(function (o) { return '<li><i class="fas fa-check" aria-hidden="true"></i> ' + escapeHtml(o) + '</li>'; }).join("");
        var transitionHtml = "";
        if (transition && chapterNumber < total) {
            transitionHtml = '<div class="reasoning-transition"><i class="fas fa-arrow-right" aria-hidden="true"></i><p>' + escapeHtml(transition) + '</p></div>';
        }
        return '<section class="reasoning-summary-section" data-section="ringkasan">\n            <div class="reasoning-summary-head"><i class="fas fa-bookmark" aria-hidden="true"></i><div><span>Ringkasan</span><h3>Setelah chapter ini, kamu dapat:</h3></div></div>\n            <ul class="reasoning-outcome-list">' + outcomeItems + '</ul>\n            ' + transitionHtml + '\n        </section>';
    }

    function initQuickChecks(scope) {
        scope.querySelectorAll(".reasoning-quick-check").forEach(function (card) {
            const answer = Number(card.dataset.checkAnswer);
            const feedback = card.querySelector(".reasoning-check-feedback");
            card.querySelectorAll("[data-check-option]").forEach(function (button) {
                button.addEventListener("click", function () {
                    const selected = Number(button.dataset.checkOption);
                    card.querySelectorAll("[data-check-option]").forEach(function (option) {
                        const optionIndex = Number(option.dataset.checkOption);
                        option.classList.toggle("is-correct", optionIndex === answer);
                        option.classList.toggle("is-wrong", optionIndex === selected && selected !== answer);
                    });
                    if (feedback) {
                        feedback.hidden = false;
                        feedback.dataset.tone = selected === answer ? "success" : "warning";
                    }
                });
            });
        });
    }

    function updateProgress(chapterNumber, total) {
        const completed = Math.max(0, chapterNumber - 1);
        const percent = Math.round((completed / total) * 100);
        const progressB = document.querySelector(".lesson-progress-mini b");
        const progressStrong = document.querySelector(".lesson-progress-mini strong");
        const progressText = document.querySelector(".lesson-progress-card p");
        if (progressB) progressB.style.setProperty("--value", percent + "%");
        if (progressStrong) progressStrong.textContent = percent + "%";
        if (progressText) progressText.textContent = completed + " dari " + total + " materi selesai";
    }

    window.loadReasoningChapter = function (chapterNumber) {
        var total = CHAPTERS.length;
        var chapter = Math.min(Math.max(Number(chapterNumber) || 1, 1), total);
        var module = CHAPTERS[chapter - 1];
        var container = document.getElementById("reasoning-chapter-container");
        var btnPrev = document.getElementById("btn-prev-chapter");
        var btnNext = document.getElementById("btn-next-chapter");
        var btnFinish = document.getElementById("btn-finish-materi");
        if (!container || !module) return;

        localStorage.setItem(STORAGE.chapter, String(chapter));

        var sourceFile = getSourceFile(module.sourcePath);
        var visualConfig = SOURCE_VISUALS[sourceFile];

        // Tampilkan loading
        container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--fellow-muted)"><i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--fellow-pink);margin-bottom:16px"></i><p>Memuat materi...</p></div>';

        // Fetch source HTML, filter, inject interactive, render
        fetch(module.sourcePath, { cache: "no-store" })
            .then(function (r) {
                if (!r.ok) throw new Error("Gagal memuat " + module.sourcePath);
                return r.text();
            })
            .then(function (html) {
                // 1. Filter module-level headings + strip source numbering
                html = filterSourceHeadings(html);
                html = stripSourceNumbering(html);

                // 2. Inject orientation + nav SEBELUM heading pertama
                //    Cari H1 atau H2 pertama, sisip orientation+nav sebelum tag <
                var firstHIdx = -1;
                var h1Match = html.match(/<h1[^>]*>/);
                var h2Match = html.match(/<h2[^>]*>/);
                if (h1Match && h2Match) {
                    firstHIdx = Math.min(h1Match.index, h2Match.index);
                } else if (h1Match) {
                    firstHIdx = h1Match.index;
                } else if (h2Match) {
                    firstHIdx = h2Match.index;
                }
                if (firstHIdx !== -1) {
                    html = html.slice(0, firstHIdx) + renderOrientationAndNav(module, chapter, total) + '\n' + html.slice(firstHIdx);
                }

                // 3. Fungsi bantu: cari semua section H2 (heading + konten hingga H2/HR berikutnya)
                function findH2Sections(str) {
                    var sections = [];
                    var re = /<h2[^>]*>[\s\S]*?<\/h2>[\s\S]*?(?=<h[12]|<hr\s*\/?>|$)/gi;
                    var m;
                    while ((m = re.exec(str)) !== null) {
                        sections.push({ index: m.index, length: m[0].length, text: m[0] });
                    }
                    return sections;
                }

                // 4. Inject hook setelah section H2 pertama
                if (module.hook) {
                    var h2Secs = findH2Sections(html);
                    if (h2Secs.length >= 1) {
                        var end1 = h2Secs[0].index + h2Secs[0].length;
                        html = html.slice(0, end1) + '\n' + finalRenderHookSection(module.hook) + '\n' + html.slice(end1);
                    }
                }

                // 5. Inject lab setelah section H2 kedua
                if (visualConfig && visualConfig.options) {
                    h2Secs = findH2Sections(html);
                    if (h2Secs.length >= 2) {
                        var end2 = h2Secs[1].index + h2Secs[1].length;
                        html = html.slice(0, end2) + '\n<div data-section="konsep">' + renderSourceVisualLab(visualConfig) + '</div>\n' + html.slice(end2);
                    }
                }

                // 6. Append end-of-chapter components
                html += renderEndOfChapter(module, chapter, total, visualConfig);

                // 3. Set sebagai konten utama
                container.innerHTML = html;
                container.classList.add("is-source-view");

                // 4. Enhance source visuals
                enhanceSourceMaterialForCanvas(container, module);

                // 5. Init interactive lab
                if (visualConfig) {
                    initSourceVisualLab(container, visualConfig);
                }

                // 6. Setup interactions
                setupHookInteraction(container);
                setupQuickChecks(container);
                setupChallengeInteraction(container);
                setupVisualNav(container);
                setupCopyButtons(container);

                // 7. Phase layout — wrap source content, add fase badges
                try {
                    // Debug: check HTML before phaseLayout
                    console.log("DEBUG pre-phaseLayout: children=" + container.children.length + " textLen=" + container.textContent.length + " hasH1=" + (!!container.querySelector('h1')) + " h2count=" + container.querySelectorAll('h2').length);
                    phaseLayout(container);
                    console.log("DEBUG post-phaseLayout: children=" + container.children.length + " h2count=" + container.querySelectorAll('h2').length);
                } catch (e) { console.error("phaseLayout:", e); }
            })
            .catch(function () {
                container.innerHTML = '<div class="reasoning-source-error" style="text-align:center;padding:60px"><i class="fas fa-triangle-exclamation" style="font-size:2rem;color:#f63392;margin-bottom:16px"></i><p>Materi belum bisa dimuat. Refresh halaman atau coba lagi.</p></div>';
            });

        if (btnPrev) btnPrev.style.display = chapter > 1 ? "inline-block" : "none";
        if (btnNext) btnNext.style.display = chapter < total ? "inline-block" : "none";
        if (btnFinish) btnFinish.style.display = chapter === total ? "inline-block" : "none";

        document.querySelectorAll("#reasoning-sidebar-list li").forEach(function (li) {
            var itemChapter = Number(li.dataset.chapter || "0");
            var icon = li.querySelector("i");
            li.classList.toggle("active", itemChapter === chapter);
            li.classList.toggle("completed", itemChapter < chapter);
            if (!icon) return;
            if (itemChapter === chapter) icon.className = "far fa-circle-play";
            else if (itemChapter < chapter) icon.className = "fas fa-circle-check";
            else icon.className = "far fa-circle";
        });

        updateProgress(chapter, total);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.initAiReasoningMateri = function () {
        const total = CHAPTERS.length;
        const initial = Math.min(Math.max(Number(localStorage.getItem(STORAGE.chapter)) || 1, 1), total);
        const list = document.getElementById("reasoning-sidebar-list");
        const btnPrev = document.getElementById("btn-prev-chapter");
        const btnNext = document.getElementById("btn-next-chapter");

        if (list) {
            list.innerHTML = CHAPTERS.map(function (chapter, index) {
                const chapterNumber = index + 1;
                return `<li data-chapter="${chapterNumber}"><span>${chapterNumber}</span><a href="javascript:void(0)" onclick="window.loadReasoningChapter(${chapterNumber})">${escapeHtml(chapter.shortTitle)}</a><i class="far fa-circle"></i></li>`;
            }).join("");
        }

        if (btnPrev) {
            btnPrev.addEventListener("click", function () {
                const current = Number(localStorage.getItem(STORAGE.chapter)) || initial;
                window.loadReasoningChapter(Math.max(1, current - 1));
            });
        }

        if (btnNext) {
            btnNext.addEventListener("click", function () {
                const current = Number(localStorage.getItem(STORAGE.chapter)) || initial;
                window.loadReasoningChapter(Math.min(total, current + 1));
            });
        }

        window.loadReasoningChapter(initial);
    };

    function getSavedPractice() {
        return safeJsonParse(localStorage.getItem(STORAGE.practice), { answers: {}, revealed: [] });
    }

    function savePracticePayload(payload) {
        localStorage.setItem(STORAGE.practice, JSON.stringify({
            answers: payload.answers || {},
            revealed: Array.from(new Set(payload.revealed || [])),
            updatedAt: new Date().toISOString()
        }));
    }

    function collectPracticeAnswers(form) {
        const answers = {};
        form.querySelectorAll("textarea").forEach(function (field) {
            if (field.name) answers[field.name] = field.value.trim();
        });
        return answers;
    }

    function renderFormattedText(text) {
        // Pre-process: split on sequential numbered items (2., 3., 4. etc) and blockquote markers
        text = text.replace(/(\d+)\.\s+(?=[A-Z][a-z])/g, "\n$1. ");
        text = text.replace(/>\s/g, "\n> ");
        text = text.replace(/•\s/g, "\n• ");
        var lines = text.split("\n");
        var html = "";
        var inList = false;
        var listType = null; // "ul" or "ol"
        var inBlockquote = false;

        function closeList() {
            if (inList) { html += "</" + listType + ">\n"; inList = false; listType = null; }
        }
        function closeBlockquote() {
            if (inBlockquote) { html += "</blockquote>\n"; inBlockquote = false; }
        }

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var trimmed = line.trim();

            // Empty line — close open tags
            if (!trimmed) {
                closeList();
                closeBlockquote();
                continue;
            }

            // Blockquote
            if (trimmed.indexOf("> ") === 0 || trimmed.indexOf(">") === 0) {
                closeList();
                var quoteText = trimmed.replace(/^>\s?/, "");
                if (!inBlockquote) {
                    html += "<blockquote>";
                    inBlockquote = true;
                }
                html += "<p>" + escapeHtml(quoteText) + "</p>";
                continue;
            }

            // Numbered list
            var olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
            if (olMatch) {
                closeBlockquote();
                if (!inList || listType !== "ol") {
                    closeList();
                    html += "<ol>";
                    inList = true;
                    listType = "ol";
                }
                html += "<li>" + escapeHtml(olMatch[2]) + "</li>";
                continue;
            }

            // Bullet list
            if (trimmed.indexOf("- ") === 0 || trimmed.indexOf("• ") === 0) {
                closeBlockquote();
                if (!inList || listType !== "ul") {
                    closeList();
                    html += "<ul>";
                    inList = true;
                    listType = "ul";
                }
                html += "<li>" + escapeHtml(trimmed.substring(2)) + "</li>";
                continue;
            }

            // Regular paragraph
            closeList();
            closeBlockquote();
            html += "<p>" + escapeHtml(trimmed) + "</p>";
        }
        closeList();
        closeBlockquote();
        return html;
    }

    var PRACTICE_TOPICS = [
        { start: 0, end: 3, label: "Reasoning Dasar" },
        { start: 4, end: 7, label: "Planning" },
        { start: 8, end: 11, label: "Chain-of-Thought" },
        { start: 12, end: 16, label: "Tool Use" }
    ];

    function getPracticeTopic(index) {
        for (var pt = 0; pt < PRACTICE_TOPICS.length; pt++) {
            if (index >= PRACTICE_TOPICS[pt].start && index <= PRACTICE_TOPICS[pt].end) {
                return PRACTICE_TOPICS[pt].label;
            }
        }
        return "";
    }

    function renderPracticeCard(item, index) {
        return `<article class="reasoning-practice-card" data-practice-id="${escapeHtml(item.id)}" tabindex="-1">
            <div class="reasoning-practice-card-head">
                <span>${index + 1}</span>
                <h3>${escapeHtml(item.title)}</h3>
            </div>
            <div class="reasoning-practice-prompt">${renderFormattedText(item.prompt)}</div>
            <div class="reasoning-practice-fields">
                ${item.fields.map(function (field) {
                    const name = item.id + "__" + field[0];
                    return `<label><span>${escapeHtml(field[1])}</span><textarea name="${escapeHtml(name)}" rows="4" placeholder="Tulis jawabanmu di sini..."></textarea></label>`;
                }).join("")}
            </div>
            <button type="button" class="reasoning-scaffold-reveal-button" data-reasoning-reveal="${escapeHtml(item.id)}" aria-expanded="false"><i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat pembahasan</button>
            <div class="reasoning-scaffold-exercise-answer" data-reasoning-answer="${escapeHtml(item.id)}" hidden><strong>Pembahasan</strong><p>${escapeHtml(item.guide)}</p></div>
        </article>`;
    }

    window.initAiReasoningPractice = function () {
        const form = document.getElementById("aiReasoningPracticeForm");
        const practiceList = document.getElementById("aiReasoningPracticeList");
        if (!form || !practiceList) return;

        loadSourceHtml(SOURCE_BASE + "practice-full.html", "aiReasoningPracticeSource");
        practiceList.innerHTML = PRACTICES.map(renderPracticeCard).join("");
        const saved = getSavedPractice();
        const savedAnswers = saved.answers || {};
        const revealed = Array.isArray(saved.revealed) ? saved.revealed.slice() : [];
        const navigator = document.getElementById("aiReasoningPracticeNavigator");
        const counter = document.getElementById("aiReasoningPracticeCounter");
        const previousButton = form.querySelector("[data-practice-prev]");
        const nextButton = form.querySelector("[data-practice-next]");
        let currentPractice = 0;

        function isPracticeComplete(index) {
            const card = practiceList.querySelectorAll("[data-practice-id]")[index];
            if (!card) return false;
            return Array.from(card.querySelectorAll("textarea")).every(field => field.value.trim());
        }

        function updatePracticeNavigator() {
            if (navigator) {
                navigator.querySelectorAll("[data-practice-step]").forEach(function (button) {
                    const index = Number(button.dataset.practiceStep);
                    button.classList.toggle("is-active", index === currentPractice);
                    button.classList.toggle("is-complete", isPracticeComplete(index));
                    button.setAttribute("aria-current", index === currentPractice ? "step" : "false");
                });
            }
            if (counter) {
                var topic = getPracticeTopic(currentPractice);
                counter.textContent = "Skenario " + (currentPractice + 1) + " dari " + PRACTICES.length + (topic ? " | " + topic : "");
            }
            if (previousButton) previousButton.disabled = currentPractice === 0;
            if (nextButton) nextButton.disabled = currentPractice === PRACTICES.length - 1;
        }

        function showPractice(index, shouldFocus) {
            currentPractice = Math.min(Math.max(index, 0), PRACTICES.length - 1);
            practiceList.querySelectorAll("[data-practice-id]").forEach(function (card, cardIndex) {
                card.hidden = cardIndex !== currentPractice;
            });
            updatePracticeNavigator();
            if (shouldFocus) {
                const activeCard = practiceList.querySelectorAll("[data-practice-id]")[currentPractice];
                if (activeCard) activeCard.focus({ preventScroll: true });
            }
        }

        if (navigator) {
            var navHtml = "";
            var lastTopic = "";
            PRACTICES.forEach(function (item, index) {
                var topic = getPracticeTopic(index);
                if (topic && topic !== lastTopic) {
                    if (lastTopic) navHtml += "</div>";
                    navHtml += '<div class="reasoning-nav-group"><span class="reasoning-nav-group-label">' + escapeHtml(topic) + '</span>';
                    lastTopic = topic;
                }
                navHtml += '<button type="button" data-practice-step="' + index + '" title="' + escapeHtml(item.title) + '">' + (index + 1) + '</button>';
            });
            if (lastTopic) navHtml += "</div>";
            navigator.innerHTML = navHtml;
            navigator.querySelectorAll("[data-practice-step]").forEach(function (button) {
                button.addEventListener("click", function () {
                    savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
                    showPractice(Number(button.dataset.practiceStep), true);
                });
            });
        }

        Object.entries(savedAnswers).forEach(function (entry) {
            const field = form.querySelector('[name="' + escapeSelector(entry[0]) + '"]');
            if (field) field.value = entry[1];
        });

        const firstIncomplete = PRACTICES.findIndex(function (_item, index) {
            return !isPracticeComplete(index);
        });
        currentPractice = firstIncomplete === -1 ? PRACTICES.length - 1 : firstIncomplete;
        showPractice(currentPractice, false);

        form.addEventListener("input", function (event) {
            if (event.target.matches("textarea")) updatePracticeNavigator();
        });

        if (previousButton) {
            previousButton.addEventListener("click", function () {
                savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
                showPractice(currentPractice - 1, true);
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", function () {
                savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
                showPractice(currentPractice + 1, true);
            });
        }

        revealed.forEach(function (id) {
            const answer = form.querySelector('[data-reasoning-answer="' + escapeSelector(id) + '"]');
            const button = form.querySelector('[data-reasoning-reveal="' + escapeSelector(id) + '"]');
            if (answer) answer.hidden = false;
            if (button) {
                button.setAttribute("aria-expanded", "true");
                button.innerHTML = '<i class="fas fa-eye" aria-hidden="true"></i> Pembahasan terbuka';
            }
        });

        setStatus("#aiReasoningPracticeStatus", Object.keys(savedAnswers).length ? "Jawaban latihan dipulihkan dari browsermu." : "Jawaban akan tersimpan di browser ini.", Object.keys(savedAnswers).length ? "success" : "neutral");

        form.querySelectorAll("[data-reasoning-reveal]").forEach(function (button) {
            button.addEventListener("click", function () {
                const id = button.dataset.reasoningReveal;
                const answer = form.querySelector('[data-reasoning-answer="' + escapeSelector(id) + '"]');
                if (!answer) return;
                answer.hidden = !answer.hidden;
                button.setAttribute("aria-expanded", String(!answer.hidden));
                button.innerHTML = answer.hidden
                    ? '<i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat pembahasan'
                    : '<i class="fas fa-eye" aria-hidden="true"></i> Pembahasan terbuka';
                if (!answer.hidden && !revealed.includes(id)) revealed.push(id);
                savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
                setStatus("#aiReasoningPracticeStatus", "Pembahasan dan jawaban tersimpan di browser ini.", "success");
            });
        });

        const saveButton = form.querySelector("[data-practice-save]");
        const editButton = form.querySelector("[data-practice-edit]");
        const resetButton = form.querySelector("[data-practice-reset]");

        if (saveButton) {
            saveButton.addEventListener("click", function () {
                savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
                form.classList.add("is-saved");
                form.querySelectorAll("textarea").forEach(field => { field.disabled = true; });
                setStatus("#aiReasoningPracticeStatus", "Latihan Reasoning tersimpan. Kamu bisa lanjut ke kuis atau edit lagi bila perlu.", "success");
            });
        }

        if (editButton) {
            editButton.addEventListener("click", function () {
                form.classList.remove("is-saved");
                form.querySelectorAll("textarea").forEach(field => { field.disabled = false; });
                setStatus("#aiReasoningPracticeStatus", "Mode edit aktif. Simpan ulang setelah mengubah jawaban.", "neutral");
            });
        }

        if (resetButton) {
            resetButton.addEventListener("click", function () {
                localStorage.removeItem(STORAGE.practice);
                form.reset();
                form.classList.remove("is-saved");
                form.querySelectorAll("textarea").forEach(field => { field.disabled = false; });
                form.querySelectorAll("[data-reasoning-answer]").forEach(answer => { answer.hidden = true; });
                revealed.splice(0, revealed.length);
                showPractice(0, false);
                setStatus("#aiReasoningPracticeStatus", "Jawaban latihan direset dari browser ini.", "warning");
            });
        }
    };

    function getQuizAnswers(form) {
        return QUIZ.reduce(function (acc, _question, index) {
            const checked = form.querySelector('input[name="reasoning-q' + index + '"]:checked');
            acc["reasoning-q" + index] = checked ? checked.value : "";
            return acc;
        }, {});
    }

    function renderQuizResult(score, total, message) {
        const result = document.getElementById("aiReasoningQuizResult");
        if (!result) return;
        const percent = Math.round((score / total) * 100);
        result.hidden = false;
        result.innerHTML = `<strong>Skor kamu: ${score}/${total} (${percent}%)</strong><span>${escapeHtml(message)}</span>`;
    }

    function lockQuiz(form, answers) {
        form.classList.add("is-locked");
        form.querySelectorAll('input[type="radio"]').forEach(function (input) {
            input.disabled = true;
            if (answers[input.name] === input.value) input.checked = true;
        });

        // Show ALL questions for review
        form.querySelectorAll("[data-quiz-index]").forEach(function (article) {
            article.hidden = false;
        });
        // Hide navigator, counter, prev/next buttons
        var qnav = document.getElementById("aiReasoningQuizNavigator");
        var qprev = form.querySelector("[data-quiz-prev]");
        var qnext = form.querySelector("[data-quiz-next]");
        var qcounter = document.getElementById("aiReasoningQuizCounter");
        if (qnav) qnav.style.display = "none";
        if (qprev) qprev.style.display = "none";
        if (qnext) qnext.style.display = "none";
        if (qcounter) qcounter.style.display = "none";

        QUIZ.forEach(function (question, index) {
            const article = form.querySelector('[data-quiz-index="' + index + '"]');
            if (!article) return;
            article.querySelectorAll("label").forEach(function (label) {
                const input = label.querySelector("input");
                const isCorrect = input && Number(input.value) === question[2];
                const isSelected = input && answers[input.name] === input.value;
                label.classList.toggle("is-correct", Boolean(isCorrect));
                label.classList.toggle("is-wrong", Boolean(isSelected && !isCorrect));
            });
            let explanation = article.querySelector(".quiz-explanation");
            if (!explanation) {
                explanation = document.createElement("p");
                explanation.className = "quiz-explanation";
                article.appendChild(explanation);
            }
            explanation.innerHTML = '<i class="fas fa-lightbulb"></i> ' + escapeHtml(question[3]);
        });

        const submit = form.querySelector(".quiz-submit-btn");
        if (submit) {
            submit.disabled = true;
            submit.innerHTML = '<i class="fas fa-lock"></i> Kuis Sudah Dikirim';
        }

        const next = document.getElementById("aiReasoningQuizNext");
        if (next) next.classList.remove("is-disabled");
    }

    window.initAiReasoningQuiz = function () {
        const form = document.getElementById("aiReasoningQuizForm");
        const list = document.getElementById("aiReasoningQuizList");
        if (!form || !list) return;

        loadSourceHtml(SOURCE_BASE + "quiz-source-full.html", "aiReasoningQuizSource");
        list.innerHTML = QUIZ.map(function (question, index) {
            return `<article data-quiz-index="${index}" tabindex="-1">
                <span>${index + 1}</span>
                <small>Reasoning Final</small>
                <h3>${escapeHtml(question[0])}</h3>
                <div class="reasoning-scaffold-options">
                    ${question[1].map(function (option, optionIndex) {
                        const letter = String.fromCharCode(65 + optionIndex);
                        return `<label><input type="radio" name="reasoning-q${index}" value="${optionIndex}"><span><b>${letter}</b>${escapeHtml(option)}</span></label>`;
                    }).join("")}
                </div>
            </article>`;
        }).join("");

        const navigator = document.getElementById("aiReasoningQuizNavigator");
        const counter = document.getElementById("aiReasoningQuizCounter");
        const previousButton = form.querySelector("[data-quiz-prev]");
        const nextButton = form.querySelector("[data-quiz-next]");
        let currentQuiz = 0;

        function isQuizAnswered(index) {
            return Boolean(form.querySelector('input[name="reasoning-q' + index + '"]:checked'));
        }

        function updateQuizNavigator() {
            const answered = QUIZ.reduce((total, _question, index) => total + (isQuizAnswered(index) ? 1 : 0), 0);
            if (navigator) {
                navigator.querySelectorAll("[data-quiz-step]").forEach(function (button) {
                    const index = Number(button.dataset.quizStep);
                    button.classList.toggle("is-active", index === currentQuiz);
                    button.classList.toggle("is-complete", isQuizAnswered(index));
                    button.setAttribute("aria-current", index === currentQuiz ? "step" : "false");
                });
            }
            if (counter) counter.textContent = "Soal " + (currentQuiz + 1) + " dari " + QUIZ.length + " | " + answered + " terjawab";
            if (previousButton) previousButton.disabled = currentQuiz === 0;
            if (nextButton) nextButton.disabled = currentQuiz === QUIZ.length - 1;
        }

        function showQuiz(index, shouldFocus) {
            currentQuiz = Math.min(Math.max(index, 0), QUIZ.length - 1);
            list.querySelectorAll("[data-quiz-index]").forEach(function (article, articleIndex) {
                article.hidden = articleIndex !== currentQuiz;
            });
            updateQuizNavigator();
            if (shouldFocus) {
                const activeQuestion = list.querySelector('[data-quiz-index="' + currentQuiz + '"]');
                if (activeQuestion) activeQuestion.focus({ preventScroll: true });
            }
        }

        if (navigator) {
            navigator.innerHTML = QUIZ.map(function (_question, index) {
                return `<button type="button" data-quiz-step="${index}" aria-label="Buka soal ${index + 1}">${index + 1}</button>`;
            }).join("");
            navigator.querySelectorAll("[data-quiz-step]").forEach(function (button) {
                button.addEventListener("click", function () {
                    showQuiz(Number(button.dataset.quizStep), true);
                });
            });
        }

        if (previousButton) previousButton.addEventListener("click", () => showQuiz(currentQuiz - 1, true));
        if (nextButton) nextButton.addEventListener("click", () => showQuiz(currentQuiz + 1, true));
        showQuiz(0, false);

        const savedDone = localStorage.getItem(STORAGE.quizDone) === "true";
        const savedAnswers = safeJsonParse(localStorage.getItem(STORAGE.quizAnswers), {});
        if (savedDone && Object.keys(savedAnswers).length === QUIZ.length) {
            const savedScore = Number(localStorage.getItem(STORAGE.quizScore)) || 0;
            renderQuizResult(savedScore, QUIZ.length, "Attempt sudah dipakai. Kuis single attempt, jadi jawaban, skor, dan pembahasan dikunci agar review tetap objektif.");
            lockQuiz(form, savedAnswers);
            updateQuizNavigator();
            return;
        }

        form.addEventListener("change", function (event) {
            const label = event.target.closest("label");
            if (!label) return;
            const article = label.closest("article");
            if (!article) return;
            article.querySelectorAll("label").forEach(item => item.classList.remove("is-selected"));
            label.classList.add("is-selected");
            updateQuizNavigator();
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const answers = getQuizAnswers(form);
            const unanswered = Object.values(answers).filter(value => !value).length;
            if (unanswered) {
                renderQuizResult(0, QUIZ.length, "Masih ada " + unanswered + " soal yang belum dijawab.");
                const firstUnanswered = QUIZ.findIndex((_question, index) => !answers["reasoning-q" + index]);
                if (firstUnanswered >= 0) showQuiz(firstUnanswered, true);
                return;
            }

            const score = QUIZ.reduce(function (total, question, index) {
                return total + (Number(answers["reasoning-q" + index]) === question[2] ? 1 : 0);
            }, 0);

            localStorage.setItem(STORAGE.quizDone, "true");
            localStorage.setItem(STORAGE.quizScore, String(score));
            localStorage.setItem(STORAGE.quizAnswers, JSON.stringify(answers));
            renderQuizResult(score, QUIZ.length, "Pembahasan dibuka. Gunakan kartu merah/hijau untuk membaca ulang topik yang belum kuat.");
            lockQuiz(form, answers);
        });
    };

    function getDiscussionPosts() {
        const saved = safeJsonParse(localStorage.getItem(STORAGE.discussion), null);
        if (Array.isArray(saved)) return saved;
        return DISCUSSION_PROMPTS.map(function (prompt, index) {
            return {
                id: "seed-" + (index + 1),
                prompt: prompt,
                text: "Gunakan prompt ini sebagai titik mulai diskusi Reasoning.",
                createdAt: new Date().toISOString(),
                replies: []
            };
        });
    }

    function saveDiscussionPosts(posts) {
        localStorage.setItem(STORAGE.discussion, JSON.stringify(posts));
    }

    function renderDiscussion(posts) {
        const list = document.getElementById("aiReasoningDiscussionList");
        if (!list) return;
        list.innerHTML = posts.map(function (post) {
            const replies = Array.isArray(post.replies) ? post.replies : [];
            return `<article class="discussion-bubble" data-discussion-id="${escapeHtml(post.id)}">
                <div>
                    <span>${post.id.indexOf("seed") === 0 ? "H" : "A"}</span>
                    <strong>${post.id.indexOf("seed") === 0 ? "HerAI Prompt" : "Aisyah Putri"}</strong>
                    <small>${new Date(post.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</small>
                </div>
                <p><b>${escapeHtml(post.prompt)}</b></p>
                <p>${escapeHtml(post.text)}</p>
                <button type="button" class="discussion-reply-btn" data-reply="${escapeHtml(post.id)}"><i class="far fa-message"></i> Balas</button>
                <div class="discussion-reply-composer" data-reply-composer="${escapeHtml(post.id)}" hidden>
                    <textarea rows="3" placeholder="Tulis balasanmu..." aria-label="Tulis balasan"></textarea>
                    <div class="discussion-reply-actions">
                        <button type="button" class="btn-reply-send" data-reply-send="${escapeHtml(post.id)}"><i class="fas fa-paper-plane" aria-hidden="true"></i> Kirim Balasan</button>
                        <button type="button" class="btn-reply-cancel" data-reply-cancel="${escapeHtml(post.id)}"><i class="fas fa-times" aria-hidden="true"></i> Batal</button>
                    </div>
                    <p class="discussion-reply-validation" data-reply-validation="${escapeHtml(post.id)}" hidden><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Tulis balasan terlebih dahulu.</p>
                </div>
                <div class="discussion-replies">
                    ${replies.map(function (reply) {
                        return `<article><strong>Aisyah Putri</strong><small>${new Date(reply.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</small><p>${escapeHtml(reply.text)}</p></article>`;
                    }).join("")}
                </div>
            </article>`;
        }).join("");

        list.querySelectorAll("[data-reply]").forEach(function (button) {
            button.addEventListener("click", function () {
                var postId = button.dataset.reply;
                var composer = list.querySelector('[data-reply-composer="' + postId + '"]');
                if (!composer) return;
                var isOpen = !composer.hidden;
                list.querySelectorAll("[data-reply-composer]").forEach(function (c) { c.hidden = true; });
                if (isOpen) return;
                composer.hidden = false;
                var textarea = composer.querySelector("textarea");
                if (textarea) textarea.focus();
            });
        });

        list.querySelectorAll("[data-reply-send]").forEach(function (button) {
            button.addEventListener("click", function () {
                var postId = button.dataset.replySend;
                var composer = list.querySelector('[data-reply-composer="' + postId + '"]');
                if (!composer) return;
                var textarea = composer.querySelector("textarea");
                var validation = composer.querySelector('[data-reply-validation="' + postId + '"]');
                if (!textarea || !textarea.value.trim()) {
                    if (validation) validation.hidden = false;
                    return;
                }
                if (validation) validation.hidden = true;
                var posts = getDiscussionPosts();
                var target = posts.find(function (post) { return post.id === postId; });
                if (!target) return;
                target.replies = Array.isArray(target.replies) ? target.replies : [];
                target.replies.push({ text: textarea.value.trim(), createdAt: new Date().toISOString() });
                saveDiscussionPosts(posts);
                renderDiscussion(posts);
            });
        });

        list.querySelectorAll("[data-reply-cancel]").forEach(function (button) {
            button.addEventListener("click", function () {
                var postId = button.dataset.replyCancel;
                var composer = list.querySelector('[data-reply-composer="' + postId + '"]');
                if (!composer) return;
                var textarea = composer.querySelector("textarea");
                if (textarea) textarea.value = "";
                composer.hidden = true;
                var replyBtn = list.querySelector('[data-reply="' + postId + '"]');
                if (replyBtn) replyBtn.focus();
            });
        });
    }

    window.initAiReasoningDiscussion = function () {
        const form = document.getElementById("aiReasoningDiscussionForm");
        const select = form ? form.querySelector("select") : null;
        const textarea = form ? form.querySelector("textarea") : null;
        loadSourceHtml(SOURCE_BASE + "discussion-source-full.html", "aiReasoningDiscussionSource");
        renderDiscussion(getDiscussionPosts());

        const promptButtons = document.querySelector(".ml-discussion-prompts");
        if (promptButtons) {
            promptButtons.innerHTML = DISCUSSION_PROMPTS.map(function (prompt, index) {
                const labels = ["Kepercayaan", "Transparansi", "Tool use", "AI tutor", "High-stakes", "Human review"];
                const icons = ["fas fa-shield-heart", "fas fa-list-check", "fas fa-screwdriver-wrench", "fas fa-graduation-cap", "fas fa-scale-balanced", "fas fa-user-check"];
                return `<button type="button" data-discussion-prompt="${escapeHtml(prompt)}"><i class="${icons[index]}" aria-hidden="true"></i><span>${labels[index]}</span></button>`;
            }).join("");
        }

        if (select) {
            select.innerHTML = DISCUSSION_PROMPTS.map(prompt => `<option>${escapeHtml(prompt)}</option>`).join("");
        }

        document.querySelectorAll("[data-discussion-prompt]").forEach(function (button) {
            button.addEventListener("click", function () {
                if (select) select.value = button.dataset.discussionPrompt;
                if (textarea && !textarea.value.trim()) {
                    textarea.value = button.dataset.discussionPrompt + "\n\n";
                    textarea.focus();
                }
            });
        });

        if (!form || !select || !textarea) return;
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const text = textarea.value.trim();
            if (!text) {
                setStatus("#aiReasoningDiscussionStatus", "Tulis isi diskusi terlebih dahulu.", "warning");
                return;
            }

            const posts = getDiscussionPosts();
            posts.unshift({
                id: "post-" + Date.now(),
                prompt: select.value,
                text: text,
                createdAt: new Date().toISOString(),
                replies: []
            });
            saveDiscussionPosts(posts);
            form.reset();
            setStatus("#aiReasoningDiscussionStatus", "Diskusi berhasil diposting dan tersimpan di browser ini.", "success");
            renderDiscussion(posts);
        });
    };
})();
