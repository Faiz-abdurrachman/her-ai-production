(function () {
    "use strict";

    var STORAGE_KEY_CHAPTER = "heraiAiModernCurrentChapter";
    var BASE_PATH = "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/chapters/";
    var activeChapterRequest = 0;

    var CHAPTERS = [
        {
            title: "Foundation Models: Fondasi AI Serbaguna",
            shortTitle: "Foundation Models",
            duration: "25 menit",
            icon: "fas fa-layer-group",
            summary: "Bedakan model dasar, adaptation layer, dan aplikasi AI agar keputusan model tidak berhenti pada nama vendor.",
            objectives: ["Membedakan model dasar dan aplikasi AI", "Membaca trade-off deployment", "Memilih model dengan kriteria terukur"],
            analogy: "Foundation model adalah bahan baku; prompt, RAG, tools, evaluasi, dan UI mengubahnya menjadi produk yang berguna.",
            hook: {
                question: "Tim punya model paling populer. Apakah itu sudah cukup untuk membangun assistant fellowship?",
                answerA: { label: "Sudah cukup", text: "Model kuat akan menyelesaikan seluruh kebutuhan produk.", icon: "fas fa-wand-magic-sparkles" },
                answerB: { label: "Belum cukup", text: "Kita masih perlu context, data, tools, evaluasi, UI, dan pengawasan.", icon: "fas fa-diagram-project" },
                message: "Model adalah komponen inti, tetapi nilai dan risiko nyata muncul dari sistem end-to-end yang dibangun di sekelilingnya."
            },
            flow: [["Kebutuhan", "Definisikan tugas dan risiko"], ["Kandidat", "Bandingkan model dan deployment"], ["Uji", "Evaluasi bahasa, biaya, latency"], ["Pilih", "Dokumentasikan trade-off"]],
            quickCheck: {
                question: "Universitas memakai model API, retrieval dokumen akademik, dan dashboard mahasiswa. Mana yang disebut AI application?",
                options: ["Model API saja", "Retrieval saja", "Gabungan model, retrieval, workflow, UI, evaluasi, dan oversight"],
                answer: 2,
                explanationCorrect: "Tepat. Aplikasi AI adalah keseluruhan sistem yang mengubah kemampuan model menjadi layanan.",
                explanationWrong: "Belum tepat. Cari jawaban yang mencakup model beserta data, workflow, interface, evaluasi, dan pengawasan."
            },
            challenge: {
                instruction: "Tulis tiga kriteria terpenting untuk memilih model assistant fellowship dan jelaskan mengapa masing-masing dapat diuji.",
                placeholder: "Contoh: Bahasa Indonesia — diuji dengan 30 pertanyaan peserta yang mewakili variasi bahasa...",
                example: "Bahasa Indonesia diuji dengan eval set lokal; privasi diuji dari alur data dan kontrak provider; biaya diuji sebagai cost per successful task."
            },
            mistakes: ["Memilih model karena popularitas", "Menganggap open-weight selalu aman", "Mengabaikan lisensi dan language coverage"],
            bestPractices: ["Mulai dari use case dan risiko", "Bandingkan dengan decision matrix", "Uji pada data yang mewakili pengguna nyata"],
            learningOutcomes: ["Menjelaskan batas model dan aplikasi", "Membaca model card", "Membuat keputusan deployment yang dapat dipertanggungjawabkan"],
            transition: "Setelah tahu apa yang dipilih, kita bongkar mesin yang membuat model modern mampu memahami konteks.",
            sourcePath: BASE_PATH + "01-materi.html"
        },
        {
            title: "Transformer: Mesin di Balik Model Modern",
            shortTitle: "Transformer",
            duration: "30 menit",
            icon: "fas fa-network-wired",
            summary: "Ikuti perjalanan teks dari token menjadi embedding, attention context, lalu output yang dihasilkan token demi token.",
            objectives: ["Menjelaskan token dan embedding", "Memahami Q, K, V secara intuitif", "Membaca batas context window dan generation controls"],
            analogy: "Attention seperti membaca thread diskusi: tidak semua komentar diberi bobot sama; fokus berpindah ke bagian yang paling relevan.",
            hook: {
                question: "Context window besar berarti model punya ingatan permanen. Setuju?",
                answerA: { label: "Setuju", text: "Semua yang pernah dibaca otomatis tersimpan sebagai memori.", icon: "fas fa-box-archive" },
                answerB: { label: "Tidak setuju", text: "Context hanya ruang kerja satu request; memory perlu dirancang terpisah.", icon: "fas fa-clock-rotate-left" },
                message: "Context window adalah ruang kerja sementara, bukan database atau long-term memory."
            },
            flow: [["Teks", "Tokenizer memecah input"], ["Vektor", "Embedding memberi representasi"], ["Konteks", "Attention menimbang relasi"], ["Output", "Decoder memilih token berikutnya"]],
            quickCheck: {
                question: "Mengapa positional information diperlukan dalam Transformer?",
                options: ["Attention tidak otomatis mengetahui urutan token", "Agar API key tetap aman", "Agar semua token menjadi satu kata"],
                answer: 0,
                explanationCorrect: "Benar. Sinyal posisi membantu model membedakan urutan token dalam konteks.",
                explanationWrong: "Coba lagi. Pertimbangkan informasi apa yang tidak tersedia bila token hanya diproses sebagai sekumpulan representasi."
            },
            challenge: {
                instruction: "Pilih konfigurasi generation untuk ringkasan kebijakan dan caption kreatif. Jelaskan pilihan temperature dan top-p untuk keduanya.",
                placeholder: "Ringkasan kebijakan: ...\nCaption kreatif: ...",
                example: "Ringkasan memakai temperature rendah agar stabil; caption dapat memakai temperature lebih tinggi agar variasinya lebih luas, tetap dengan batas output."
            },
            mistakes: ["Menganggap token selalu sama dengan kata", "Menyamakan context dengan memory", "Memakai temperature tinggi untuk tugas faktual"],
            bestPractices: ["Ukur token dan biaya", "Prioritaskan konteks yang relevan", "Gunakan stop condition dan structured output"],
            learningOutcomes: ["Menjelaskan alur token ke output", "Membedakan context dan memory", "Memilih kontrol generation sesuai tugas"],
            transition: "Transformer dapat menjawab; berikutnya kita lihat bagaimana model diberi tools dan loop untuk bertindak.",
            sourcePath: BASE_PATH + "02-materi.html"
        },
        {
            title: "AI Agents: Dari Menjawab ke Bertindak",
            shortTitle: "AI Agents",
            duration: "30 menit",
            icon: "fas fa-robot",
            summary: "Rancang agent loop, tool permission, state, stopping condition, dan human approval tanpa memberi autonomy berlebihan.",
            objectives: ["Membedakan workflow dan agent", "Merancang tool schema dan stopping condition", "Menentukan approval gate untuk aksi berdampak"],
            analogy: "Agent seperti asisten operasional yang memilih alat, membaca hasil, dan tahu kapan harus berhenti atau meminta bantuan manusia.",
            hook: {
                question: "Agent boleh langsung mengirim pengumuman massal setelah menyusun draft yang bagus?",
                answerA: { label: "Boleh otomatis", text: "Kecepatan adalah tujuan utama agent.", icon: "fas fa-bolt" },
                answerB: { label: "Wajib approval", text: "Side effect besar perlu permission, preview, dan persetujuan manusia.", icon: "fas fa-user-shield" },
                message: "Drafting dapat agentic; aksi eksternal yang berdampak harus melewati policy dan approval gate."
            },
            flow: [["Goal", "Tetapkan tujuan"], ["Observe", "Baca state dan context"], ["Act", "Pilih respons atau tool"], ["Verify", "Validasi hasil"], ["Stop", "Selesai atau eskalasi"]],
            quickCheck: {
                question: "Bagian mana yang paling aman dibuat deterministic dalam workflow layanan peserta?",
                options: ["Brainstorm isi draft", "Validasi field wajib dan approval pengiriman", "Menyusun alternatif penjelasan"],
                answer: 1,
                explanationCorrect: "Tepat. Aturan wajib dan side effect perlu jalur deterministik yang dapat diaudit.",
                explanationWrong: "Belum tepat. Cari langkah yang harus konsisten, dapat diaudit, dan tidak boleh bergantung pada improvisasi model."
            },
            challenge: {
                instruction: "Rancang agent sederhana dengan satu goal, dua tools, stopping condition, retry limit, dan satu approval manusia.",
                placeholder: "Goal: ...\nTools: ...\nStop: ...\nApproval: ...",
                example: "Goal mencari tugas belum selesai; tools read_tasks dan draft_reminder; berhenti setelah daftar tervalidasi; pengiriman reminder wajib approval mentor."
            },
            mistakes: ["Membuat semua proses menjadi agent", "Tool berbahaya tanpa approval", "Tidak menetapkan retry limit dan trace"],
            bestPractices: ["Gunakan workflow untuk aturan tetap", "Terapkan least privilege", "Log tool call, result, latency, dan recovery"],
            learningOutcomes: ["Memilih workflow atau agent", "Menulis tool contract", "Menempatkan human-in-the-loop secara tepat"],
            transition: "Agent hanyalah salah satu layer. Topik terakhir menyatukan model, retrieval, tools, security, dan evaluasi.",
            sourcePath: BASE_PATH + "03-materi.html"
        },
        {
            title: "Sistem AI Masa Kini: End-to-End",
            shortTitle: "Sistem AI Masa Kini",
            duration: "35 menit",
            icon: "fas fa-sitemap",
            summary: "Susun model, context, retrieval, tools, guardrails, observability, infrastructure, dan human oversight menjadi sistem production-ready.",
            objectives: ["Membaca arsitektur end-to-end", "Membedakan RAG dan database query", "Mengaudit security, reliability, cost, dan governance"],
            analogy: "Model adalah konsultan pintar; sistem AI adalah kantor lengkap dengan arsip, aturan akses, alat kerja, supervisor, dan audit.",
            hook: {
                question: "Model paling kuat tetap layak dipakai jika secret ada di frontend dan tool delete tidak punya approval?",
                answerA: { label: "Masih layak", text: "Kemampuan model menutup kelemahan arsitektur.", icon: "fas fa-star" },
                answerB: { label: "Tidak layak", text: "Security dan governance adalah syarat sistem, bukan fitur tambahan.", icon: "fas fa-shield-halved" },
                message: "Kualitas model tidak dapat menebus kebocoran secret, akses data yang salah, atau side effect tanpa kontrol."
            },
            flow: [["Input", "Auth dan policy"], ["Context", "Retrieval dan state"], ["Reason", "Model dan orchestration"], ["Act", "Tools dengan permission"], ["Assure", "Validation, logs, eval, approval"]],
            quickCheck: {
                question: "Kapan database query biasa lebih tepat daripada vector retrieval?",
                options: ["Saat mencari status pembayaran yang terstruktur", "Saat merangkum dokumen bebas", "Saat mencari paragraf semantik"],
                answer: 0,
                explanationCorrect: "Benar. Data terstruktur dan deterministik lebih aman diakses melalui query atau API yang tervalidasi.",
                explanationWrong: "Coba lagi. RAG paling berguna untuk informasi tidak terstruktur; data transaksional perlu jalur deterministik."
            },
            challenge: {
                instruction: "Isi architecture canvas ringkas untuk HerAI Assistant: model, retrieval, tools, permission, evaluation, observability, dan fallback.",
                placeholder: "Model strategy: ...\nRetrieval: ...\nTools: ...\nApproval: ...\nEvaluation: ...\nFallback: ...",
                example: "Model dirutekan berdasarkan risiko; retrieval hanya dokumen berizin; tools read-only; pengiriman butuh approval; fallback mengaku tidak tahu dan eskalasi."
            },
            mistakes: ["API key di frontend", "Retrieval tanpa access control", "Satu model untuk semua tugas", "Tidak punya evaluation set"],
            bestPractices: ["Gunakan backend dan least privilege", "Pisahkan data terstruktur dan dokumen", "Pantau cost per successful task", "Siapkan fallback dan incident review"],
            learningOutcomes: ["Menggambar arsitektur end-to-end", "Menemukan bottleneck lintas layer", "Menetapkan kontrol sebelum production"],
            transition: "Kamu siap mengubah konsep menjadi rancangan melalui 13 skenario latihan dan capstone.",
            sourcePath: BASE_PATH + "04-materi.html"
        }
    ];

    var SOURCE_VISUALS = {
        "01-materi.html": { eyebrow: "Model Selection Lab", title: "Bedah tiga lapisan produk AI", description: "Klik tiap lapisan untuk melihat tanggung jawab dan risiko utamanya.", options: [["Model", "fas fa-cube", "Foundation layer", "Kemampuan dasar, context limit, modalitas, bahasa, dan lisensi.", "Contoh: model bahasa via managed API atau open-weight inference."], ["Adaptasi", "fas fa-sliders", "Context & capability layer", "Prompt, RAG, fine-tuning, tools, routing, dan guardrails.", "Contoh: retrieval pedoman fellowship dengan citation."], ["Aplikasi", "fas fa-window-maximize", "Product layer", "Workflow, UI, auth, evaluation, observability, dan human support.", "Contoh: dashboard assistant peserta end-to-end."]] },
        "02-materi.html": { eyebrow: "Transformer Lab", title: "Ikuti perjalanan sebuah token", description: "Pindah tahap untuk memahami fungsi tiap komponen tanpa terjebak rumus.", options: [["Token", "fas fa-scissors", "Unit input", "Tokenizer mengubah teks menjadi unit yang dikenali model.", "Potongan kata Indonesia bisa menjadi beberapa token."], ["Attention", "fas fa-arrows-to-eye", "Relasi konteks", "Q, K, dan V membantu setiap token menimbang informasi relevan.", "Pronoun dapat memberi bobot ke subjek yang muncul lebih awal."], ["Generation", "fas fa-forward-step", "Output bertahap", "Decoder memilih token berikutnya sampai stop condition tercapai.", "Temperature rendah memberi output lebih stabil."]] },
        "03-materi.html": { eyebrow: "Agent Boundary Lab", title: "Tentukan siapa yang boleh bertindak", description: "Bedakan keputusan fleksibel, aturan tetap, dan aksi yang wajib approval.", options: [["Agentic", "fas fa-robot", "Keputusan fleksibel", "Model boleh memilih strategi pada tugas terbuka berisiko rendah.", "Menyusun tiga alternatif draft pesan."], ["Deterministik", "fas fa-code-branch", "Aturan tetap", "Developer menentukan langkah yang harus konsisten dan tervalidasi.", "Memastikan semua field wajib sudah terisi."], ["Approval", "fas fa-user-check", "Side effect", "Manusia menyetujui tindakan yang berdampak pada orang atau data.", "Mengirim pesan massal atau mengubah status peserta."]] },
        "04-materi.html": { eyebrow: "Architecture Lab", title: "Cari bottleneck lintas layer", description: "Sistem production gagal dari layer terlemah, bukan hanya dari model.", options: [["Knowledge", "fas fa-book-open", "Retrieval & data", "Pastikan sumber relevan, terbaru, berizin, dan dapat dikutip.", "RAG pedoman dengan metadata access control."], ["Action", "fas fa-screwdriver-wrench", "Tools & policy", "Validasi parameter, permission, idempotency, dan approval.", "Tool pengiriman hanya menerima draft yang sudah disetujui."], ["Assurance", "fas fa-shield", "Eval & observability", "Ukur kualitas, safety, latency, cost, serta jejak insiden.", "Dashboard trace dan regression suite sebelum deploy."]] }
    };

    var BEGINNER_GUIDES = {
        "01-materi.html": {
            eyebrow: "Jalur Pemula",
            title: "Dari kebutuhan pengguna ke pilihan foundation model",
            intro: "Jangan mulai dari nama model. Mulai dari masalah, petakan lapisan sistem, baru pilih strategi adaptasi dan deployment.",
            question: "Keputusan apa yang sebenarnya sedang kita buat saat memilih model?",
            steps: [
                { icon: "fas fa-user", title: "Mulai dari kebutuhan", focus: "Siapa, tugas apa, dan risikonya?", explanation: "Tentukan pengguna, input, output, batas waktu, data sensitif, dan konsekuensi bila jawaban salah. Ini mencegah tim memilih model hanya karena demo terlihat pintar.", example: "Assistant peserta harus menjawab pedoman dengan sumber, tetapi tidak boleh mengubah status peserta.", checkpoint: "Bisakah use case ditulis sebagai input → keputusan → output → risiko?" },
                { icon: "fas fa-layer-group", title: "Pisahkan tiga lapisan", focus: "Model, adaptasi, dan aplikasi", explanation: "Foundation model memberi kemampuan umum. Adaptation layer menambahkan prompt, retrieval, fine-tuning, atau tools. Application layer mengatur workflow, UI, auth, logging, evaluasi, dan bantuan manusia.", example: "Model API adalah foundation layer; RAG pedoman adalah adaptation layer; dashboard peserta adalah application layer.", checkpoint: "Apakah setiap komponen bisa ditempatkan pada satu lapisan dengan tanggung jawab jelas?" },
                { icon: "fas fa-sliders", title: "Pilih cara adaptasi", focus: "Prompt, RAG, fine-tuning, atau tools", explanation: "Prompt cocok untuk instruksi; RAG untuk pengetahuan yang berubah; fine-tuning untuk pola perilaku yang konsisten; tools untuk mengambil data atau melakukan aksi. Satu aplikasi dapat memakai beberapa strategi sekaligus.", example: "Pedoman terbaru memakai RAG, sedangkan pengecekan jadwal memakai tool read-only.", checkpoint: "Apakah strategi adaptasi dipilih karena kebutuhan, bukan karena tren?" },
                { icon: "fas fa-scale-balanced", title: "Bandingkan dan uji", focus: "Kualitas harus terukur", explanation: "Bandingkan bahasa, factuality, latency, privacy, biaya, context window, tool use, lisensi, dan kemudahan operasi. Uji dengan contoh pengguna nyata sebelum memutuskan.", example: "Tiga model diuji pada 30 pertanyaan Bahasa Indonesia dan dihitung cost per successful answer.", checkpoint: "Apakah keputusan model dapat dijelaskan melalui data dan trade-off?" }
            ],
            workedCase: {
                title: "Worked Example — Assistant FAQ Fellowship",
                scenario: "Tim kecil ingin meluncurkan assistant yang menjawab pertanyaan jadwal dan pedoman dalam empat minggu.",
                steps: [["1. Batas tugas", "Jawab pertanyaan berbasis sumber; jangan mengubah data atau mengirim pesan."], ["2. Susun lapisan", "Model bahasa + RAG pedoman + tool jadwal read-only + UI + log."], ["3. Pilih deployment", "Managed API untuk pilot agar setup cepat; semua secret tetap di backend."], ["4. Pasang evaluasi", "Uji Bahasa Indonesia, citation, refusal, latency, dan biaya per jawaban berhasil."]],
                result: "Keputusan awal: managed model melalui backend dengan RAG dan permission read-only; open-weight dievaluasi setelah pola trafik dan kebutuhan privasi lebih jelas.",
                reason: "Pilihan ini mengutamakan waktu delivery tanpa mengorbankan batas akses, audit, dan kemampuan berpindah strategi setelah data penggunaan tersedia."
            },
            glossary: [["Foundation model", "Model dasar berkemampuan umum yang dapat diadaptasi ke banyak tugas."], ["Pretraining", "Tahap belajar pola umum dari data luas sebelum adaptasi tugas tertentu."], ["Instruction tuning", "Pelatihan tambahan agar model lebih baik mengikuti instruksi."], ["RAG", "Mengambil sumber eksternal lalu memasukkannya ke konteks saat model menjawab."], ["Open-weight", "Bobot model tersedia, tetapi data dan proses pengembangannya belum tentu terbuka."], ["Model card", "Dokumen tentang intended use, batasan, evaluasi, lisensi, dan risiko model."]]
        },
        "02-materi.html": {
            eyebrow: "Jalur Pemula",
            title: "Ikuti data: dari teks sampai token output",
            intro: "Transformer lebih mudah dipahami sebagai aliran data. Fokus pada fungsi setiap tahap sebelum masuk ke matematika detail.",
            question: "Apa yang terjadi pada satu kalimat sejak diketik sampai model menghasilkan jawaban?",
            steps: [
                { icon: "fas fa-scissors", title: "Teks dipecah menjadi token", focus: "Token bukan selalu kata", explanation: "Tokenizer mengubah teks menjadi unit dan ID numerik. Bahasa, tanda baca, dan potongan kata memengaruhi jumlah token, biaya, serta panjang konteks yang tersedia.", example: "Kata 'mengunggah' dapat dipecah menjadi beberapa subword tergantung tokenizer.", checkpoint: "Bisakah kamu menjelaskan mengapa dua model dapat menghitung token secara berbeda?" },
                { icon: "fas fa-vector-square", title: "Token diberi representasi", focus: "Embedding + informasi posisi", explanation: "Embedding mengubah token ID menjadi vektor. Positional information menambahkan petunjuk urutan sehingga model dapat membedakan 'mentor membantu peserta' dari 'peserta membantu mentor'.", example: "Representasi token berubah lagi setelah melewati layer karena konteks kalimat ikut dipertimbangkan.", checkpoint: "Apa yang hilang jika model hanya punya embedding tetapi tidak punya sinyal posisi?" },
                { icon: "fas fa-arrows-to-eye", title: "Attention menimbang konteks", focus: "Query, Key, dan Value", explanation: "Query mewakili informasi yang dicari sebuah token, Key menandai informasi yang tersedia, dan Value membawa isinya. Skor attention menentukan kontribusi token lain pada representasi baru.", example: "Kata ganti 'mereka' memberi bobot lebih besar pada kandidat rujukan yang sesuai konteks.", checkpoint: "Attention memilih informasi relevan—bukan menjamin fakta selalu benar." },
                { icon: "fas fa-forward-step", title: "Decoder menghasilkan output", focus: "Satu token setiap langkah", explanation: "Model menghitung distribusi token berikutnya, memilih token berdasarkan generation settings, menambahkannya ke konteks, lalu mengulang sampai stop condition. KV cache mengurangi perhitungan ulang saat inference.", example: "Temperature rendah biasanya lebih stabil untuk ringkasan kebijakan; output kreatif dapat memakai variasi lebih luas.", checkpoint: "Bisakah kamu menghubungkan temperature, top-p, dan stop condition dengan kebutuhan tugas?" }
            ],
            workedCase: {
                title: "Worked Example — Menentukan rujukan kata ganti",
                scenario: "Kalimat: 'Mentor mengirim revisi kepada peserta setelah mereka meminta contoh tambahan.' Sistem perlu memahami rujukan 'mereka'.",
                steps: [["1. Tokenize", "Kalimat diubah menjadi token dan setiap token mendapat ID."], ["2. Represent", "Embedding dan posisi membedakan aktor, aksi, dan urutan."], ["3. Attend", "Token 'mereka' menimbang 'mentor' dan 'peserta' bersama konteks 'meminta'."], ["4. Generate", "Representasi kontekstual membantu decoder memilih jawaban yang paling konsisten."]],
                result: "Interpretasi yang paling masuk akal adalah peserta meminta contoh tambahan, tetapi sistem tetap perlu menilai ambiguitas kalimat.",
                reason: "Attention membantu menghubungkan token berjauhan, namun tidak menggantikan evaluasi, data, atau penanganan input ambigu."
            },
            glossary: [["Token", "Unit teks yang diproses model; dapat berupa kata, subword, atau tanda baca."], ["Embedding", "Vektor numerik yang merepresentasikan token atau teks."], ["Positional information", "Sinyal yang memberi tahu model tentang urutan token."], ["Self-attention", "Mekanisme token menimbang hubungan dengan token lain dalam konteks."], ["Context window", "Jumlah token maksimum yang dapat diproses pada satu request."], ["KV cache", "Penyimpanan Key dan Value sebelumnya untuk mempercepat generation bertahap."]]
        },
        "03-materi.html": {
            eyebrow: "Jalur Pemula",
            title: "Bangun agent dari batas tugas, bukan dari autonomy",
            intro: "Agent yang baik bukan agent yang bebas melakukan apa saja. Agent yang baik punya goal, tools terbatas, state jelas, stopping condition, dan jalur eskalasi.",
            question: "Kapan model cukup menjawab, kapan workflow diperlukan, dan kapan agent masuk akal?",
            steps: [
                { icon: "fas fa-code-branch", title: "Pilih bentuk sistem", focus: "Model call, workflow, atau agent", explanation: "Gunakan model call untuk satu transformasi, workflow untuk langkah tetap, dan agent bila jalurnya dinamis serta perlu memilih tool. Jangan menambah agent jika aturan deterministik sudah cukup.", example: "Validasi field wajib adalah workflow; menyusun penjelasan kekurangan dapat dibantu model.", checkpoint: "Apakah fleksibilitas agent benar-benar dibutuhkan oleh tugas?" },
                { icon: "fas fa-screwdriver-wrench", title: "Tulis kontrak tool", focus: "Input, output, error, dan izin", explanation: "Tool schema harus menjelaskan nama, deskripsi, parameter wajib, validasi, error case, authorization, dan side effect. Model hanya mengusulkan tool call; backend tetap memvalidasi dan mengeksekusi.", example: "Tool get_schedule menerima tanggal tervalidasi dan hanya punya izin baca.", checkpoint: "Apa yang terjadi jika parameter kosong, tanggal salah, atau user tidak berizin?" },
                { icon: "fas fa-rotate", title: "Rancang agent loop", focus: "Observe → decide → act → verify", explanation: "Agent membaca goal dan state, memilih tindakan, menerima tool result, memverifikasi hasil, lalu berhenti atau menyusun langkah berikut. Tetapkan batas iterasi, biaya, timeout, dan kondisi selesai.", example: "Setelah dua kegagalan tool, agent berhenti dan mengeskalasi ke staf.", checkpoint: "Apakah loop tahu kapan harus selesai dan kapan harus menyerah?" },
                { icon: "fas fa-user-shield", title: "Batasi dampak", focus: "Guardrail dan human approval", explanation: "Least privilege, input/output validation, audit log, idempotency, dan approval melindungi user dari aksi salah. Draft boleh otomatis; pengiriman massal atau penghapusan data harus dikunci.", example: "Agent membuat preview pesan, tetapi staf menekan tombol approve sebelum tool send dijalankan.", checkpoint: "Side effect mana yang tidak boleh diputuskan model sendirian?" }
            ],
            workedCase: {
                title: "Worked Example — Pengingat tugas belum selesai",
                scenario: "Agent membantu peserta menemukan tugas yang belum selesai dan menyiapkan pengingat personal.",
                steps: [["1. Goal", "Temukan tugas belum selesai untuk satu peserta berizin."], ["2. Tools", "read_tasks untuk data read-only dan draft_reminder untuk menyusun pesan."], ["3. Verify", "Pastikan hasil tool sesuai peserta, deadline belum lewat, dan tidak ada data peserta lain."], ["4. Approval", "Mentor mereview draft sebelum tool pengiriman boleh dijalankan."]],
                result: "Agent berhenti setelah daftar tervalidasi dan draft tersedia; pengiriman berada di workflow approval terpisah.",
                reason: "Pemisahan ini memakai fleksibilitas model untuk reasoning dan drafting, tetapi mempertahankan kontrol deterministik pada side effect."
            },
            glossary: [["Agent", "Sistem yang memilih tindakan atau tool dalam loop untuk mencapai goal."], ["Tool schema", "Kontrak terstruktur tentang fungsi, parameter, dan hasil tool."], ["State", "Informasi kerja yang dipertahankan selama penyelesaian tugas."], ["Stopping condition", "Aturan kapan loop dinyatakan selesai atau harus berhenti."], ["Handoff", "Pemindahan tugas ke agent lain atau manusia."], ["Idempotency", "Sifat aksi yang aman diulang tanpa menggandakan dampak."]]
        },
        "04-materi.html": {
            eyebrow: "Jalur Pemula",
            title: "Susun sistem AI dari pengalaman sampai assurance",
            intro: "Produk AI production adalah rantai keputusan. Setiap layer perlu kontrak, kontrol, metrik, dan pemilik yang jelas.",
            question: "Bagaimana model, data, tools, infrastructure, dan manusia bekerja sebagai satu sistem?",
            steps: [
                { icon: "fas fa-bullseye", title: "Tetapkan outcome dan risiko", focus: "Ukuran sukses sebelum arsitektur", explanation: "Definisikan tugas, user journey, toleransi kesalahan, latency budget, privacy, dan aksi yang diizinkan. Metrik teknis harus terhubung dengan keberhasilan tugas pengguna.", example: "Target bukan sekadar jawaban fasih, tetapi jawaban bersumber dalam lima detik tanpa membocorkan data.", checkpoint: "Apakah tim tahu apa arti 'berhasil' dan 'gagal' untuk user?" },
                { icon: "fas fa-database", title: "Rancang knowledge layer", focus: "Context, RAG, database, dan memory", explanation: "Gunakan RAG untuk dokumen tidak terstruktur, query/API untuk data deterministik, dan memory untuk preferensi yang memang boleh disimpan. Metadata serta access control harus diterapkan sebelum data masuk konteks.", example: "Pedoman dicari dengan RAG; status pembayaran dibaca melalui API terautentikasi.", checkpoint: "Apakah setiap sumber data punya owner, izin, freshness, dan fallback?" },
                { icon: "fas fa-gears", title: "Orkestrasi model dan tools", focus: "Routing, validation, dan permission", explanation: "Context builder menyusun instruksi dan bukti; model gateway memilih model; tool layer mengeksekusi fungsi tervalidasi; output validator memeriksa format dan kebijakan sebelum respons dikirim.", example: "Pertanyaan sederhana memakai model cepat, sementara kasus berisiko diarahkan ke model lebih kuat dan review manusia.", checkpoint: "Bisakah satu kegagalan layer dilacak tanpa menebak?" },
                { icon: "fas fa-shield-halved", title: "Bangun assurance loop", focus: "Eval, observability, dan operasi", explanation: "Offline eval mencegah regression sebelum deploy. Production monitoring menangkap latency, cost, tool error, safety event, dan feedback. Incident review mengubah kegagalan menjadi test case baru.", example: "Jawaban salah yang dilaporkan user masuk regression set dan diuji pada setiap perubahan prompt atau model.", checkpoint: "Apakah sistem belajar dari insiden dan bisa rollback dengan aman?" }
            ],
            workedCase: {
                title: "Worked Example — HerAI Fellowship Assistant",
                scenario: "Assistant menjawab pedoman, mengecek jadwal, dan membuat draft pesan tanpa boleh mengubah data atau mengirim pesan sendiri.",
                steps: [["1. Experience", "UI menjelaskan sumber, status loading, dan kapan jawaban perlu bantuan staf."], ["2. Knowledge", "RAG pedoman berizin + tool jadwal read-only; data sensitif tidak masuk prompt tanpa kebutuhan."], ["3. Intelligence", "Model gateway, context builder, structured output, dan validation."], ["4. Assurance", "Approval pengiriman, trace, eval set, cost budget, fallback, serta incident review."]],
                result: "Sistem memberi jawaban bersumber dan draft yang dapat direview; semua side effect tetap berada di jalur approval manusia.",
                reason: "Arsitektur memisahkan kemampuan generatif dari otoritas melakukan aksi sehingga lebih aman, terukur, dan mudah diaudit."
            },
            glossary: [["Context engineering", "Proses memilih dan menyusun instruksi, sumber, history, serta tool result untuk model."], ["Model gateway", "Layer pemanggilan dan routing model berdasarkan tugas, risiko, biaya, atau fallback."], ["Grounding", "Mengikat jawaban pada bukti atau sumber yang dapat diperiksa."], ["Observability", "Trace, log, metrik, dan event yang membantu memahami perilaku sistem."], ["Regression", "Penurunan kualitas setelah perubahan model, prompt, data, atau kode."], ["Human oversight", "Approval, monitoring, intervensi, dan eskalasi oleh manusia."]]
        }
    };

    function safeJsonParse(value, fallback) {
        if (!value) return fallback;
        try { return JSON.parse(value); } catch (error) { return fallback; }
    }

    function escapeHtml(value) {
        return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function escapeSelector(value) {
        if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(String(value));
        return String(value).replace(/([ #;?%&,.+*~\\':\"!^$[\]()=>|/@])/g, "\\$1");
    }

    function setStatus(selector, message, tone) {
        var status = document.querySelector(selector);
        if (!status) return;
        status.textContent = message;
        status.dataset.tone = tone || "neutral";
    }

    function renderList(items) {
        return "<ul>" + (items || []).map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + "</ul>";
    }

    function renderFlow(items) {
        return '<div class="reasoning-scaffold-flow">' + (items || []).map(function (item, index) {
            var arrow = index < items.length - 1 ? '<i class="fas fa-arrow-right" aria-hidden="true"></i>' : "";
            return '<div><strong>' + escapeHtml(item[0]) + '</strong><span>' + escapeHtml(item[1]) + '</span></div>' + arrow;
        }).join("") + "</div>";
    }

    function getSourceFile(path) {
        return String(path || "").split("/").pop();
    }

    function findH2Sections(html) {
        var sections = [];
        var pattern = /<h2[^>]*>[\s\S]*?<\/h2>[\s\S]*?(?=<h[12]|<hr\s*\/?>|$)/gi;
        var match;
        while ((match = pattern.exec(html)) !== null) sections.push({ index: match.index, length: match[0].length, text: match[0] });
        return sections;
    }

    function filterSourceHeadings(html) {
        return String(html || "").replace(/<script[\s\S]*?<\/script>/gi, "");
    }

    function stripSourceNumbering(html) {
        return String(html || "").replace(/(<h[12][^>]*>)\s*(?:Topik|Submateri)\s+\d+\s*(?:[·—-]\s*)?/gi, "$1");
    }

    function injectAfterHeading(html, headingText, injectHtml) {
        var safe = String(headingText || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        var pattern = new RegExp("(<h[1-4][^>]*>[\\s\\S]*?" + safe + "[\\s\\S]*?<\\/h[1-4]>)", "i");
        return String(html || "").replace(pattern, "$1" + injectHtml);
    }

    function renderOrientationAndNav(chapter, chapterNumber, total) {
        return '<nav class="reasoning-source-jumps reasoning-visual-nav ai-modern-learning-nav" data-modern-injected aria-label="Tahapan Topik ' + chapterNumber + ' dari ' + total + '"><span><i class="' + escapeHtml(chapter.icon) + '"></i> Jelajahi:</span><button type="button" data-jump="hook">Pembuka</button><button type="button" data-jump="konsep">Konsep</button><button type="button" data-jump="contoh">Contoh</button><button type="button" data-jump="check">Uji Pemahaman</button><button type="button" data-jump="ringkasan">Ringkasan</button></nav>';
    }

    function finalRenderHookSection(hook) {
        return '<section class="reasoning-hook-section" data-modern-injected data-section="hook"><div class="reasoning-hook-head"><i class="fas fa-hand-pointer" aria-hidden="true"></i><div><span>Pembuka</span><h3>' + escapeHtml(hook.question) + '</h3></div></div><div class="reasoning-hook-options"><button type="button" class="reasoning-hook-card" data-hook-option="a"><div class="reasoning-hook-card-icon"><i class="' + escapeHtml(hook.answerA.icon) + '" aria-hidden="true"></i></div><div><strong>' + escapeHtml(hook.answerA.label) + '</strong><p>' + escapeHtml(hook.answerA.text) + '</p></div></button><button type="button" class="reasoning-hook-card" data-hook-option="b"><div class="reasoning-hook-card-icon"><i class="' + escapeHtml(hook.answerB.icon) + '" aria-hidden="true"></i></div><div><strong>' + escapeHtml(hook.answerB.label) + '</strong><p>' + escapeHtml(hook.answerB.text) + '</p></div></button></div><p class="reasoning-hook-message" hidden>' + escapeHtml(hook.message) + '</p></section>';
    }

    function renderSourceVisualLab(config) {
        if (!config || !config.options || !config.options.length) return "";
        var first = config.options[0];
        return '<section class="reasoning-concept-lab" data-modern-injected data-section="konsep"><div class="reasoning-concept-lab-head reasoning-concept-head"><i class="fas fa-flask" aria-hidden="true"></i><div><span>' + escapeHtml(config.eyebrow) + '</span><h3>' + escapeHtml(config.title) + '</h3><p>' + escapeHtml(config.description) + '</p></div></div><div class="reasoning-concept-tabs" role="tablist">' + config.options.map(function (option, index) { return '<button type="button" role="tab" data-concept-index="' + index + '" aria-selected="' + (index === 0 ? "true" : "false") + '"><i class="' + escapeHtml(option[1]) + '"></i><span>' + escapeHtml(option[0]) + '</span></button>'; }).join("") + '</div><div class="reasoning-concept-stage"><div class="ai-modern-concept-copy"><span data-concept-counter>1/' + config.options.length + '</span><h4 data-concept-title>' + escapeHtml(first[2]) + '</h4><p data-concept-content>' + escapeHtml(first[3]) + '</p></div><aside class="ai-modern-concept-example"><strong><i class="fas fa-lightbulb"></i> Contoh</strong><p data-concept-example>' + escapeHtml(first[4]) + '</p></aside></div></section>';
    }

    function initSourceVisualLab(container, config) {
        var lab = container.querySelector(".reasoning-concept-lab");
        if (!lab || !config || !config.options) return;
        lab.querySelectorAll("[data-concept-index]").forEach(function (button) {
            button.addEventListener("click", function () {
                var index = Number(button.dataset.conceptIndex);
                var option = config.options[index];
                if (!option) return;
                lab.querySelectorAll("[data-concept-index]").forEach(function (tab) { tab.setAttribute("aria-selected", String(tab === button)); });
                lab.querySelector("[data-concept-counter]").textContent = (index + 1) + "/" + config.options.length;
                lab.querySelector("[data-concept-title]").textContent = option[2];
                lab.querySelector("[data-concept-content]").textContent = option[3];
                lab.querySelector("[data-concept-example]").textContent = option[4];
            });
        });
    }

    function renderBeginnerRoadmap(guide) {
        if (!guide || !guide.steps) return "";
        return '<section class="ai-modern-beginner-roadmap" data-modern-injected data-section="konsep">' +
            '<div class="ai-modern-roadmap-head"><i class="fas fa-compass"></i><div><span>' + escapeHtml(guide.eyebrow) + '</span><h3>' + escapeHtml(guide.title) + '</h3><p>' + escapeHtml(guide.intro) + '</p></div></div>' +
            '<div class="ai-modern-roadmap-question"><i class="fas fa-circle-question"></i><p><strong>Pertanyaan panduan</strong>' + escapeHtml(guide.question) + '</p></div>' +
            '<div class="ai-modern-roadmap-strip" aria-hidden="true">' + guide.steps.map(function (step, index) { return '<div><span>' + (index + 1) + '</span><i class="' + escapeHtml(step.icon) + '"></i><strong>' + escapeHtml(step.title) + '</strong></div>'; }).join("") + '</div>' +
            '<div class="ai-modern-roadmap-progress"><span data-roadmap-progress>Langkah 1 dari ' + guide.steps.length + '</span><b><i data-roadmap-bar></i></b></div>' +
            '<div class="ai-modern-roadmap-steps">' + guide.steps.map(function (step, index) {
                return '<details data-roadmap-step="' + index + '"' + (index === 0 ? " open" : "") + '><summary><span>' + String(index + 1).padStart(2, "0") + '</span><i class="' + escapeHtml(step.icon) + '"></i><div><strong>' + escapeHtml(step.title) + '</strong><small>' + escapeHtml(step.focus) + '</small></div><i class="fas fa-chevron-down"></i></summary><div class="ai-modern-roadmap-body"><p>' + escapeHtml(step.explanation) + '</p><div><strong><i class="fas fa-lightbulb"></i> Contoh</strong><p>' + escapeHtml(step.example) + '</p></div><aside><strong><i class="fas fa-list-check"></i> Cek pemahaman</strong><p>' + escapeHtml(step.checkpoint) + '</p></aside></div></details>';
            }).join("") + '</div></section>';
    }

    function setupBeginnerRoadmap(container) {
        var roadmap = container.querySelector(".ai-modern-beginner-roadmap");
        if (!roadmap) return;
        var steps = Array.from(roadmap.querySelectorAll("[data-roadmap-step]"));
        var progress = roadmap.querySelector("[data-roadmap-progress]");
        var bar = roadmap.querySelector("[data-roadmap-bar]");
        steps.forEach(function (detail) {
            detail.addEventListener("toggle", function () {
                if (!detail.open) return;
                steps.forEach(function (other) { if (other !== detail) other.open = false; });
                var index = Number(detail.dataset.roadmapStep);
                if (progress) progress.textContent = "Langkah " + (index + 1) + " dari " + steps.length;
                if (bar) bar.style.width = Math.round(((index + 1) / steps.length) * 100) + "%";
            });
        });
        if (bar) bar.style.width = Math.round(100 / steps.length) + "%";
    }

    function renderWorkedExample(example) {
        if (!example) return "";
        return '<section class="ai-modern-worked-example" data-modern-injected data-section="contoh"><div class="ai-modern-worked-head"><i class="fas fa-magnifying-glass-chart"></i><div><span>Contoh Terurai</span><h3>' + escapeHtml(example.title) + '</h3><p>' + escapeHtml(example.scenario) + '</p></div></div><div class="ai-modern-worked-steps">' + example.steps.map(function (step, index) { return '<article><span>' + (index + 1) + '</span><div><strong>' + escapeHtml(step[0]) + '</strong><p>' + escapeHtml(step[1]) + '</p></div></article>'; }).join("") + '</div><div class="ai-modern-worked-result"><div><i class="fas fa-flag-checkered"></i><strong>Keputusan</strong><p>' + escapeHtml(example.result) + '</p></div><div><i class="fas fa-scale-balanced"></i><strong>Mengapa masuk akal?</strong><p>' + escapeHtml(example.reason) + '</p></div></div></section>';
    }

    function renderBeginnerGlossary(items) {
        if (!items || !items.length) return "";
        return '<section class="ai-modern-beginner-glossary" data-modern-injected data-section="ringkasan"><div class="ai-modern-glossary-head"><i class="fas fa-book"></i><div><span>Kamus Pemula</span><h3>Istilah penting yang perlu kamu pegang</h3><p>Buka setiap istilah untuk mengulang definisinya sebelum lanjut.</p></div></div><div class="ai-modern-glossary-grid">' + items.map(function (item, index) { return '<details' + (index === 0 ? " open" : "") + '><summary><span>' + String(index + 1).padStart(2, "0") + '</span><strong>' + escapeHtml(item[0]) + '</strong><i class="fas fa-chevron-down"></i></summary><p>' + escapeHtml(item[1]) + '</p></details>'; }).join("") + '</div></section>';
    }

    function renderCodeVisual(codeText) {
        if (codeText.indexOf("Modern AI System =") !== -1) {
            return '<section class="ai-modern-system-blueprint" data-modern-injected data-section="konsep"><div class="ai-modern-blueprint-head"><i class="fas fa-sitemap"></i><div><span>Visual System Blueprint</span><h3>Sistem AI modern adalah lima lapisan yang saling menjaga</h3><p>Model hanya satu komponen. Ikuti alur dari pengalaman pengguna sampai operasi dan pengawasan.</p></div></div><div class="ai-modern-blueprint-flow"><article><b>01</b><i class="fas fa-window-maximize"></i><div><strong>Experience</strong><p>User interface dan instructions menerjemahkan kebutuhan pengguna menjadi tugas yang jelas.</p></div></article><article><b>02</b><i class="fas fa-brain"></i><div><strong>Intelligence</strong><p>Model memproses context untuk memahami permintaan dan menyusun respons.</p></div></article><article><b>03</b><i class="fas fa-database"></i><div><strong>Knowledge & State</strong><p>Retrieval dan state memberi bukti, data terbaru, serta kondisi kerja yang relevan.</p></div></article><article><b>04</b><i class="fas fa-screwdriver-wrench"></i><div><strong>Action</strong><p>Tools menjalankan fungsi eksternal melalui permission dan validasi backend.</p></div></article><article><b>05</b><i class="fas fa-shield-halved"></i><div><strong>Assurance & Operations</strong><p>Guardrails, evaluation, infrastructure, dan human oversight menjaga kualitas sepanjang siklus hidup.</p></div></article></div><div class="ai-modern-blueprint-rule"><i class="fas fa-link"></i><p><strong>Prinsip penting:</strong> kualitas sistem ditentukan oleh hubungan antarlayer. Model yang bagus tetap gagal jika sumber salah, tool terlalu berkuasa, atau tidak ada evaluasi.</p></div></section>';
        }
        if (codeText.indexOf("Attention(Q, K, V)") !== -1) {
            return '<section class="ai-modern-formula-explainer" data-modern-injected data-section="konsep"><div class="ai-modern-formula-head"><i class="fas fa-square-root-variable"></i><div><span>Formula Decoder</span><h3>Baca rumus attention sebagai tiga pertanyaan</h3><p>Kamu tidak perlu menghafal simbol untuk memahami fungsinya.</p></div></div><div class="ai-modern-qkv-grid"><article><b>Q</b><strong>Query</strong><p>Informasi apa yang sedang dicari token ini?</p></article><article><b>K</b><strong>Key</strong><p>Informasi apa yang ditawarkan token lain?</p></article><article><b>V</b><strong>Value</strong><p>Isi apa yang dibawa jika token itu relevan?</p></article></div><div class="ai-modern-formula-flow"><span>Bandingkan Q dengan K</span><i class="fas fa-arrow-right"></i><span>Skalakan skor</span><i class="fas fa-arrow-right"></i><span>Softmax menjadi bobot</span><i class="fas fa-arrow-right"></i><span>Gabungkan V</span></div><p class="ai-modern-formula-note"><i class="fas fa-circle-info"></i> Hasilnya adalah representasi token yang sudah membawa konteks dari token lain.</p></section>';
        }
        if (codeText.indexOf("get_fellowship_schedule") !== -1) {
            return '<section class="ai-modern-tool-contract" data-modern-injected data-section="konsep"><div class="ai-modern-tool-head"><i class="fas fa-plug-circle-check"></i><div><span>Tool Contract Visual</span><h3>Tool yang aman harus jelas sebelum dipanggil</h3><p>Schema membantu model mengusulkan call, tetapi backend tetap memvalidasi izin dan parameter.</p></div></div><div class="ai-modern-tool-grid"><article><span>Nama</span><strong>get_fellowship_schedule</strong><p>Satu fungsi, satu tanggung jawab yang mudah diaudit.</p></article><article><span>Input wajib</span><strong>date · YYYY-MM-DD</strong><p>Format harus divalidasi sebelum query dijalankan.</p></article><article><span>Permission</span><strong>Read-only</strong><p>Tool tidak boleh mengubah jadwal atau data peserta.</p></article><article><span>Error contract</span><strong>Not found · invalid date · unauthorized</strong><p>Error eksplisit membantu agent berhenti atau eskalasi dengan benar.</p></article></div><div class="ai-modern-tool-path"><span>Model mengusulkan</span><i class="fas fa-arrow-right"></i><span>Backend memvalidasi</span><i class="fas fa-arrow-right"></i><span>Tool dieksekusi</span><i class="fas fa-arrow-right"></i><span>Hasil diverifikasi</span></div></section>';
        }
        if (codeText.indexOf("Use case:") !== -1 && codeText.indexOf("Human approval:") !== -1) {
            return '<section class="ai-modern-architecture-canvas" data-modern-injected data-section="contoh"><div class="ai-modern-canvas-head"><i class="fas fa-table-cells-large"></i><div><span>Architecture Canvas</span><h3>Isi keputusan sistem dalam empat area</h3><p>Canvas ini membantu memastikan rancangan tidak berhenti pada pilihan model.</p></div></div><div class="ai-modern-canvas-grid"><article><i class="fas fa-bullseye"></i><strong>Outcome</strong><p>Use case, user, output, dan batas tugas.</p><small>Tanya: apa arti berhasil?</small></article><article><i class="fas fa-layer-group"></i><strong>Capability</strong><p>Model approach, hosted/open/local, retrieval, dan tools.</p><small>Tanya: komponen mana yang benar-benar dibutuhkan?</small></article><article><i class="fas fa-user-shield"></i><strong>Control</strong><p>Human approval, privacy, permission, dan failure fallback.</p><small>Tanya: siapa boleh melakukan apa?</small></article><article><i class="fas fa-chart-line"></i><strong>Assurance</strong><p>Evaluation, observability, cost controls, dan incident response.</p><small>Tanya: bagaimana kita tahu sistem tetap sehat?</small></article></div></section>';
        }
        return "";
    }

    function enhanceModernCodeBlocks(container) {
        container.querySelectorAll(".reasoning-code-block").forEach(function (wrapper) {
            if (wrapper.dataset.modernVisualized === "true") return;
            var code = wrapper.querySelector("code");
            var visualMarkup = code ? renderCodeVisual(code.textContent || "") : "";
            if (!visualMarkup) return;
            wrapper.dataset.modernVisualized = "true";
            wrapper.insertAdjacentHTML("beforebegin", visualMarkup);
            var details = document.createElement("details");
            details.className = "ai-modern-source-code";
            details.innerHTML = '<summary data-modern-injected><i class="fas fa-code"></i><span>Lihat versi teks / syntax</span><i class="fas fa-chevron-down"></i></summary>';
            wrapper.parentNode.insertBefore(details, wrapper);
            details.appendChild(wrapper);
        });
    }

    function finalRenderExampleSection(example) {
        if (!example) return "";
        return '<section class="reasoning-example-section" data-modern-injected data-section="contoh"><div class="reasoning-example-head"><i class="fas fa-magnifying-glass-chart"></i><div><span>Contoh Terurai</span><h3>' + escapeHtml(example.title) + '</h3></div></div><p>' + escapeHtml(example.text) + '</p></section>';
    }

    function finalRenderQuickCheckSection(check) {
        return '<section class="reasoning-quick-check reasoning-qc-enhanced" data-modern-injected data-section="check" data-check-answer="' + check.answer + '" data-check-correct="' + escapeHtml(check.explanationCorrect) + '" data-check-wrong="' + escapeHtml(check.explanationWrong) + '"><div class="reasoning-quick-head"><i class="fas fa-circle-question" aria-hidden="true"></i><div><span>Quick Check</span><h3>' + escapeHtml(check.question) + '</h3></div></div><div class="reasoning-check-options">' + check.options.map(function (option, index) { return '<button type="button" data-check-option="' + index + '"><b>' + String.fromCharCode(65 + index) + '</b><span>' + escapeHtml(option) + '</span></button>'; }).join("") + '</div><div class="reasoning-check-actions"><button type="button" class="reasoning-scaffold-check-button" data-check-submit><i class="fas fa-check"></i> Periksa Jawaban</button><button type="button" class="reasoning-scaffold-reveal-button reasoning-check-retry" data-check-retry hidden><i class="fas fa-rotate-left"></i> Coba Lagi</button></div><p class="reasoning-check-feedback" aria-live="polite" hidden></p></section>';
    }

    function finalRenderChallengeSection(challenge, chapterNumber) {
        var storageKey = "heraiAiModernChallengeCh" + chapterNumber;
        return '<section class="reasoning-mini-challenge reasoning-challenge-workspace" data-modern-injected data-section="contoh" data-challenge-key="' + storageKey + '"><div class="reasoning-challenge-head reasoning-mini-challenge-head"><i class="fas fa-pen-ruler"></i><div><span>Mini Challenge</span><h3>Ubah konsep menjadi keputusan</h3></div></div><p class="reasoning-challenge-instruction">' + escapeHtml(challenge.instruction) + '</p><label class="reasoning-challenge-label"><span>Jawabanmu</span><textarea class="reasoning-challenge-textarea" rows="5" placeholder="' + escapeHtml(challenge.placeholder) + '" data-challenge-textarea></textarea></label><div class="reasoning-challenge-actions"><button type="button" class="btn-reasoning-save" data-challenge-save><i class="fas fa-floppy-disk"></i> Simpan</button><button type="button" class="btn-reasoning-edit" data-challenge-edit hidden><i class="fas fa-pen"></i> Edit</button><button type="button" data-challenge-reset><i class="fas fa-rotate-left"></i> Reset</button><button type="button" data-challenge-example aria-expanded="false"><i class="fas fa-lightbulb"></i> Lihat Contoh</button></div><p class="reasoning-check-feedback" data-challenge-status aria-live="polite" hidden></p><div class="reasoning-challenge-example" data-challenge-example-content hidden><strong><i class="fas fa-lightbulb"></i> Contoh Pembahasan</strong><p>' + escapeHtml(challenge.example) + '</p></div></section>';
    }

    function finalRenderMistakesPractices(mistakes, practices) {
        return '<section class="reasoning-mistakes-practices" data-modern-injected data-section="ringkasan"><div class="reasoning-mp-grid"><div class="reasoning-mp-col reasoning-mp-card reasoning-mp-mistakes"><h3><i class="fas fa-triangle-exclamation"></i> Common Mistakes</h3>' + renderList(mistakes) + '</div><div class="reasoning-mp-col reasoning-mp-card reasoning-mp-practices"><h3><i class="fas fa-circle-check"></i> Best Practices</h3>' + renderList(practices) + '</div></div></section>';
    }

    function finalRenderSummarySection(outcomes, transition, chapterNumber, total) {
        return '<section class="reasoning-summary-section" data-modern-injected data-section="ringkasan"><div class="reasoning-summary-head"><i class="fas fa-bookmark"></i><div><span>Ringkasan Topik ' + chapterNumber + '/' + total + '</span><h3>Setelah topik ini, kamu dapat:</h3></div></div><ul class="reasoning-outcomes-list">' + outcomes.map(function (outcome) { return '<li><i class="fas fa-check"></i><span>' + escapeHtml(outcome) + '</span></li>'; }).join("") + '</ul><div class="reasoning-transition"><i class="fas fa-arrow-right"></i><p>' + escapeHtml(transition) + '</p></div></section>';
    }

    function finalRenderPromptSection(lines) {
        return '<section class="reasoning-code-block reasoning-prompt-block" data-modern-injected data-section="contoh"><div><i class="fas fa-code"></i><span>Decision Pattern</span></div><pre><code>' + escapeHtml((lines || []).join("\n")) + '</code></pre></section>';
    }

    function renderEndOfChapter(chapter, chapterNumber, total) {
        var guide = BEGINNER_GUIDES[getSourceFile(chapter.sourcePath)];
        return '<div class="reasoning-end-of-chapter" data-modern-injected><section class="reasoning-visual-board" data-section="contoh"><div class="reasoning-visual-head"><i class="fas fa-route"></i><div><span>Decision Flow</span><h3>Alur yang dapat dilacak</h3></div></div>' + renderFlow(chapter.flow) + '</section>' + finalRenderQuickCheckSection(chapter.quickCheck) + finalRenderChallengeSection(chapter.challenge, chapterNumber) + finalRenderMistakesPractices(chapter.mistakes, chapter.bestPractices) + renderBeginnerGlossary(guide ? guide.glossary : []) + finalRenderSummarySection(chapter.learningOutcomes, chapter.transition, chapterNumber, total) + '</div>';
    }

    function enhanceSourceMaterialForCanvas(container) {
        container.classList.add("is-source-view");
        container.querySelectorAll(".ai-modern-objectives li").forEach(function (item) {
            if (item.querySelector(":scope > .ai-modern-objective-copy")) return;
            var copy = document.createElement("span");
            copy.className = "ai-modern-objective-copy";
            while (item.firstChild) copy.appendChild(item.firstChild);
            item.appendChild(copy);
        });
        container.querySelectorAll(".ai-modern-section").forEach(function (section, index) {
            if (!section.dataset.section) section.dataset.section = index < 2 ? "konsep" : index < 5 ? "contoh" : "ringkasan";
        });
        container.querySelectorAll("table").forEach(function (table) {
            if (table.parentElement && !table.parentElement.classList.contains("ai-modern-table-wrap") && !table.parentElement.classList.contains("reasoning-scaffold-table-wrap")) {
                var wrapper = document.createElement("div");
                wrapper.className = "reasoning-scaffold-table-wrap";
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
        container.querySelectorAll("pre").forEach(function (block) {
            if (block.closest(".reasoning-code-block")) return;
            var wrapper = document.createElement("div");
            wrapper.className = "reasoning-code-block ai-modern-code-block";
            wrapper.innerHTML = '<div data-modern-injected><i class="fas fa-code"></i><span>Concept Snippet</span><button type="button" data-copy-code><i class="far fa-copy"></i> Salin</button></div>';
            block.parentNode.insertBefore(wrapper, block);
            wrapper.appendChild(block);
        });
    }

    function setupHookInteraction(container) {
        container.querySelectorAll(".reasoning-hook-section").forEach(function (section) {
            section.querySelectorAll("[data-hook-option]").forEach(function (button) {
                button.addEventListener("click", function () {
                    section.querySelectorAll("[data-hook-option]").forEach(function (option) { option.classList.toggle("is-selected", option === button); });
                    var message = section.querySelector(".reasoning-hook-message");
                    if (message) message.hidden = false;
                });
            });
        });
        container.querySelectorAll("[data-modern-reveal]").forEach(function (button) {
            button.addEventListener("click", function () {
                var panel = button.closest(".ai-modern-active");
                var feedback = panel ? panel.querySelector(".ai-modern-feedback") : null;
                if (!feedback) return;
                feedback.hidden = !feedback.hidden;
                button.innerHTML = feedback.hidden ? '<i class="fas fa-eye"></i> Tampilkan feedback' : '<i class="fas fa-eye-slash"></i> Sembunyikan feedback';
            });
        });
    }

    function setupQuickChecks(container) {
        container.querySelectorAll(".reasoning-quick-check").forEach(function (card) {
            var selected = null;
            var answer = Number(card.dataset.checkAnswer);
            var feedback = card.querySelector(".reasoning-check-feedback");
            var submit = card.querySelector("[data-check-submit]");
            var retry = card.querySelector("[data-check-retry]");
            card.querySelectorAll("[data-check-option]").forEach(function (button) {
                button.addEventListener("click", function () {
                    selected = Number(button.dataset.checkOption);
                    card.querySelectorAll("[data-check-option]").forEach(function (option) { option.classList.toggle("is-selected", option === button); });
                });
            });
            if (submit) submit.addEventListener("click", function () {
                if (selected === null) {
                    feedback.hidden = false;
                    feedback.dataset.tone = "warning";
                    feedback.textContent = "Pilih satu jawaban sebelum memeriksa.";
                    return;
                }
                card.querySelectorAll("[data-check-option]").forEach(function (option) {
                    var index = Number(option.dataset.checkOption);
                    option.classList.toggle("is-correct", index === answer);
                    option.classList.toggle("is-wrong", index === selected && selected !== answer);
                    option.disabled = true;
                });
                feedback.hidden = false;
                feedback.dataset.tone = selected === answer ? "success" : "warning";
                feedback.textContent = selected === answer ? card.dataset.checkCorrect : card.dataset.checkWrong;
                submit.hidden = true;
                retry.hidden = false;
            });
            if (retry) retry.addEventListener("click", function () {
                selected = null;
                card.querySelectorAll("[data-check-option]").forEach(function (option) { option.classList.remove("is-selected", "is-correct", "is-wrong"); option.disabled = false; });
                feedback.hidden = true;
                submit.hidden = false;
                retry.hidden = true;
            });
        });
    }

    function setupChallengeInteraction(container) {
        container.querySelectorAll("[data-challenge-key]").forEach(function (workspace) {
            var key = workspace.dataset.challengeKey;
            var textarea = workspace.querySelector("[data-challenge-textarea]");
            var status = workspace.querySelector("[data-challenge-status]");
            var save = workspace.querySelector("[data-challenge-save]");
            var edit = workspace.querySelector("[data-challenge-edit]");
            var reset = workspace.querySelector("[data-challenge-reset]");
            var example = workspace.querySelector("[data-challenge-example]");
            var exampleContent = workspace.querySelector("[data-challenge-example-content]");
            var stored = localStorage.getItem(key) || "";
            textarea.value = stored;
            if (stored) { textarea.disabled = true; save.hidden = true; edit.hidden = false; }
            save.addEventListener("click", function () {
                var value = textarea.value.trim();
                status.hidden = false;
                if (!value) { status.dataset.tone = "warning"; status.textContent = "Tulis jawaban sebelum menyimpan."; return; }
                localStorage.setItem(key, value);
                textarea.disabled = true;
                save.hidden = true;
                edit.hidden = false;
                status.dataset.tone = "success";
                status.textContent = "Jawaban tersimpan di browser ini.";
            });
            edit.addEventListener("click", function () { textarea.disabled = false; textarea.focus(); save.hidden = false; edit.hidden = true; });
            reset.addEventListener("click", function () { localStorage.removeItem(key); textarea.value = ""; textarea.disabled = false; save.hidden = false; edit.hidden = true; status.hidden = true; });
            example.addEventListener("click", function () { var show = exampleContent.hidden; exampleContent.hidden = !show; example.setAttribute("aria-expanded", String(show)); });
        });
    }

    function setupVisualNav(container) {
        container.querySelectorAll("[data-jump]").forEach(function (button) {
            button.addEventListener("click", function () {
                var target = container.querySelector('[data-section="' + escapeSelector(button.dataset.jump) + '"]');
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    }

    function setupCopyButtons(container) {
        container.querySelectorAll("[data-copy-code]").forEach(function (button) {
            button.addEventListener("click", function () {
                var code = button.closest(".reasoning-code-block").querySelector("code");
                if (!code) return;
                var done = function () { button.innerHTML = '<i class="fas fa-check"></i> Tersalin'; setTimeout(function () { button.innerHTML = '<i class="far fa-copy"></i> Salin'; }, 1400); };
                if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code.textContent).then(done);
            });
        });
    }

    function sourceText(html) {
        var template = document.createElement("template");
        template.innerHTML = html;
        return String(template.content.textContent || "").replace(/\s+/g, " ").trim();
    }

    function assertSourceIntegrity(container, expectedText) {
        var clone = container.cloneNode(true);
        clone.querySelectorAll("[data-modern-injected]").forEach(function (node) { node.remove(); });
        var actual = String(clone.textContent || "").replace(/\s+/g, " ").trim();
        var passed = actual === expectedText;
        container.dataset.sourceIntegrity = passed ? "passed" : "failed";
        if (!passed) console.error("AI Modern source integrity mismatch", { expectedLength: expectedText.length, actualLength: actual.length });
    }

    function updateProgress(chapterNumber, total) {
        var completed = Math.max(0, chapterNumber - 1);
        var percent = Math.round((completed / total) * 100);
        var progressB = document.querySelector(".lesson-progress-mini b");
        var progressStrong = document.querySelector(".lesson-progress-mini strong");
        var progressText = document.querySelector(".lesson-progress-card p");
        if (progressB) progressB.style.setProperty("--value", percent + "%");
        if (progressStrong) progressStrong.textContent = percent + "%";
        if (progressText) progressText.textContent = completed + " dari " + total + " topik selesai";
        document.querySelectorAll("#modern-sidebar-list li").forEach(function (item) {
            var itemNumber = Number(item.dataset.chapter || 0);
            var icon = item.querySelector("i");
            item.classList.toggle("active", itemNumber === chapterNumber);
            item.classList.toggle("completed", itemNumber < chapterNumber);
            if (icon) icon.className = itemNumber === chapterNumber ? "far fa-circle-play" : itemNumber < chapterNumber ? "fas fa-circle-check" : "far fa-circle";
        });
    }

    function loadSourceHtml(path, containerId, chapter, chapterNumber, requestId) {
        var container = document.getElementById(containerId);
        if (!container || !path) return Promise.resolve();
        return fetch(path, { cache: "no-store" }).then(function (response) {
            if (!response.ok) throw new Error("Gagal memuat " + path);
            return response.text();
        }).then(function (rawHtml) {
            if (requestId !== activeChapterRequest) return;
            var source = stripSourceNumbering(filterSourceHeadings(rawHtml));
            var expectedText = sourceText(source);
            var visual = SOURCE_VISUALS[getSourceFile(path)];
            var beginnerGuide = BEGINNER_GUIDES[getSourceFile(path)];
            container.innerHTML = source + renderEndOfChapter(chapter, chapterNumber, CHAPTERS.length);
            var sourceHero = container.querySelector(".ai-modern-chapter-hero");
            if (sourceHero) sourceHero.insertAdjacentHTML("afterend", renderOrientationAndNav(chapter, chapterNumber, CHAPTERS.length) + finalRenderHookSection(chapter.hook) + renderBeginnerRoadmap(beginnerGuide));
            var sourceSections = container.querySelectorAll(".ai-modern-section");
            if (sourceSections[1] && visual) sourceSections[1].insertAdjacentHTML("afterend", renderSourceVisualLab(visual) + renderWorkedExample(beginnerGuide ? beginnerGuide.workedCase : null));
            enhanceSourceMaterialForCanvas(container);
            enhanceModernCodeBlocks(container);
            initSourceVisualLab(container, visual);
            setupBeginnerRoadmap(container);
            setupHookInteraction(container);
            setupQuickChecks(container);
            setupChallengeInteraction(container);
            setupVisualNav(container);
            setupCopyButtons(container);
            assertSourceIntegrity(container, expectedText);
        });
    }

    window.loadModernTopik = function (chapterNumber) {
        var number = Math.min(Math.max(Number(chapterNumber) || 1, 1), CHAPTERS.length);
        var chapter = CHAPTERS[number - 1];
        var container = document.getElementById("modern-chapter-container");
        var prev = document.getElementById("btn-prev-chapter");
        var next = document.getElementById("btn-next-chapter");
        var finish = document.getElementById("btn-finish-materi");
        var requestId = ++activeChapterRequest;
        if (!container || !chapter) return;
        localStorage.setItem(STORAGE_KEY_CHAPTER, String(number));
        container.innerHTML = '<div class="ai-modern-loading"><i class="fas fa-spinner fa-spin"></i><p>Memuat Topik ' + number + '...</p></div>';
        loadSourceHtml(chapter.sourcePath, "modern-chapter-container", chapter, number, requestId).catch(function (error) {
            if (requestId !== activeChapterRequest) return;
            container.innerHTML = '<div class="ai-modern-error"><i class="fas fa-triangle-exclamation"></i><div><strong>Materi belum bisa dimuat</strong><p>Refresh halaman atau coba lagi beberapa saat.</p></div></div>';
            console.error(error);
        });
        if (prev) prev.hidden = number <= 1;
        if (next) next.hidden = number >= CHAPTERS.length;
        if (finish) finish.hidden = number !== CHAPTERS.length;
        updateProgress(number, CHAPTERS.length);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.initAiModernMateri = function () {
        var container = document.getElementById("modern-chapter-container");
        if (!container || container.dataset.aiModernInitialized === "true") return;
        container.dataset.aiModernInitialized = "true";
        var list = document.getElementById("modern-sidebar-list");
        var prev = document.getElementById("btn-prev-chapter");
        var next = document.getElementById("btn-next-chapter");
        if (list) list.innerHTML = CHAPTERS.map(function (chapter, index) { var number = index + 1; return '<li data-chapter="' + number + '"><span>' + number + '</span><button type="button" data-load-modern="' + number + '">' + escapeHtml(chapter.shortTitle) + '</button><i class="far fa-circle"></i></li>'; }).join("");
        if (list) list.querySelectorAll("[data-load-modern]").forEach(function (button) { button.addEventListener("click", function () { window.loadModernChapter(Number(button.dataset.loadModern)); }); });
        if (prev) prev.addEventListener("click", function () { window.loadModernChapter(Number(localStorage.getItem(STORAGE_KEY_CHAPTER)) - 1); });
        if (next) next.addEventListener("click", function () { window.loadModernChapter(Number(localStorage.getItem(STORAGE_KEY_CHAPTER)) + 1); });
        var initial = Number(localStorage.getItem(STORAGE_KEY_CHAPTER)) || 1;
        window.loadModernChapter(initial);
    };
})();

(function () {
    var STORAGE = {
        practice: "heraiAiModernPractice",
        quizDone: "heraiAiModernQuizDone",
        quizScore: "heraiAiModernQuizScore",
        quizAnswers: "heraiAiModernQuizAnswers",
        discussion: "heraiAiModernDiscussion"
    };

    var PRACTICE_ITEMS = [
        ["foundation-layer-map", "Foundation Models", "Mengidentifikasi foundation model, adaptation layer, dan application layer.", "Universitas memakai API model bahasa, menambahkan dokumen akademik lewat retrieval, lalu membangun dashboard mahasiswa.", "Petakan mana foundation model, adaptation/context layer, dan application layer. Jelaskan dua risiko jika batas antar layer tidak dipahami.", ["foundation model teridentifikasi", "RAG/prompt/tool layer dijelaskan", "aplikasi end-to-end disebut", "risiko ditulis konkret"]],
        ["model-card-audit", "Foundation Models", "Membaca dan mengaudit model card di Hugging Face.", "Tim menemukan model open-weight yang terlihat populer untuk Bahasa Indonesia.", "Tulis checklist model card: intended use, out-of-scope use, language coverage, benchmark, limitations, license, hardware, dan safety notes.", ["intended use", "license", "bahasa Indonesia", "limitations", "hardware"]],
        ["deployment-matrix", "Foundation Models", "Membuat decision matrix API-hosted vs open-weight vs local.", "HerAI ingin assistant yang murah, privat, cepat, dan bisa memakai tool.", "Bandingkan tiga pendekatan deployment dengan kriteria privasi, biaya, latency, maintenance, customization, dan vendor dependency.", ["semua opsi dibandingkan", "trade-off jelas", "rekomendasi kontekstual"]],
        ["tokenization-id", "Transformer", "Eksperimen konseptual tokenisasi Bahasa Indonesia.", "Kalimat: Peserta fellowship mengunggah ulang tugasnya setelah mentor memberi revisi.", "Buat tokenisasi ilustratif, lalu jelaskan dampak token terhadap biaya, truncation, dan context window.", ["token bukan selalu kata", "dampak biaya", "dampak context"]],
        ["attention-walkthrough", "Transformer", "Menelusuri alur token ke embedding ke attention ke output.", "Model harus menjawab siapa yang meminta revisi pada kalimat panjang.", "Jelaskan alur token, embedding, positional information, Query/Key/Value, weighted context, dan output token.", ["QKV dijelaskan", "posisi disebut", "weighted context masuk"]],
        ["generation-config", "Transformer", "Membandingkan konfigurasi generation untuk tugas faktual dan kreatif.", "Tim punya konfigurasi A temperature rendah/top-p rendah dan B temperature lebih tinggi/top-p luas.", "Pilih konfigurasi untuk ringkasan kebijakan, caption kreatif, dan jawaban faktual. Jelaskan alasan.", ["tugas faktual stabil", "kreatif lebih leluasa", "risiko halusinasi disebut"]],
        ["tool-schema", "AI Agents", "Merancang dua tool schema untuk assistant fellowship.", "Assistant perlu membaca jadwal dan membuat draft pesan mentor.", "Tulis dua tool schema ringkas: nama, deskripsi, parameter wajib, error case, dan izin yang dibutuhkan.", ["schema jelas", "required parameter", "authorization", "error handling"]],
        ["agent-loop", "AI Agents", "Menyusun agent loop beserta stopping condition dan error recovery.", "Agent membantu peserta menemukan tugas yang belum selesai.", "Rancang goal, observe, decide, tool call, result, update state, stop condition, retry limit, dan escalation.", ["loop lengkap", "stop condition", "recovery", "human escalation"]],
        ["platform-agent-matrix", "AI Agents", "Membandingkan OpenAI Agents SDK, Anthropic tool use, Google ADK, dan LangChain.", "Tim ingin memilih pendekatan agent untuk prototype fellowship.", "Buat decision matrix berdasarkan tools, handoff, graph workflow, observability, human-in-the-loop, dan kompleksitas.", ["bukan promosi vendor", "berbasis kebutuhan", "observability masuk"]],
        ["rag-design", "Sistem AI", "Merancang RAG untuk pedoman fellowship.", "Assistant harus menjawab berdasarkan pedoman internal dan menampilkan sumber.", "Rancang pipeline documents, chunking, embeddings, vector index, retrieval, reranking, context assembly, generation, citation, dan fallback.", ["chunking", "metadata/access control", "citation", "fallback"]],
        ["deployment-patterns", "Sistem AI", "Membandingkan managed API, managed cloud, self-hosted, dan local deployment.", "HerAI perlu prototype cepat tetapi juga mempertimbangkan privasi dan biaya.", "Bandingkan empat pola deployment dan pilih pendekatan awal serta pendekatan production.", ["empat pola", "privacy", "cost", "maintenance"]],
        ["production-readiness", "Sistem AI", "Melakukan production-readiness audit.", "Arsitektur sengaja buruk: API key di frontend, satu model untuk semua tugas, retrieval tanpa access control, tool delete tanpa approval, tanpa logging dan evaluation set.", "Temukan minimal enam risiko dan tulis perbaikan pada layer security, retrieval, tool permission, observability, dan evaluation.", ["enam risiko", "perbaikan spesifik", "approval gate"]],
        ["capstone-herai-assistant", "Capstone", "Mendesain arsitektur HerAI Fellowship Assistant end-to-end.", "Assistant menjawab pertanyaan peserta, membaca pedoman, mengecek jadwal, dan membuat draft pesan. Tidak boleh mengubah data atau mengirim pesan tanpa approval staf.", "Isi architecture canvas: use case, model strategy, retrieval source, tools, permission, guardrails, approval gate, logging, evaluation, fallback, dan deployment approach.", ["end-to-end", "guardrail", "approval", "evaluation", "fallback"]]
    ];

    var QUIZ = [
        ["Foundation model paling tepat didefinisikan sebagai...", ["Model task-specific yang hanya bisa klasifikasi spam.", "Model dasar yang dilatih pada data luas dan dapat diadaptasi ke banyak tugas.", "Dashboard chatbot yang sudah punya tombol kirim.", "Dataset internal yang dipakai untuk retrieval."], 1, "Foundation model adalah basis umum yang dapat diadaptasi. Aplikasi AI berada di atasnya."],
        ["Sebuah chatbot memakai model via API dan dokumen internal lewat RAG. Mana yang merupakan AI application?", ["Model API saja.", "Dokumen PDF saja.", "Gabungan model, prompt, retrieval, workflow, UI, evaluasi, dan pengawasan.", "Embedding vector saja."], 2, "AI application adalah sistem end-to-end, bukan hanya model."],
        ["Mengapa open-weight tidak otomatis berarti sepenuhnya terbuka?", ["Karena bobot bisa tersedia tetapi data training dan proses alignment belum tentu dibuka.", "Karena open-weight selalu lebih mahal.", "Karena open-weight tidak bisa dipakai komersial dalam kondisi apa pun.", "Karena open-weight hanya bisa berjalan di browser."], 0, "Open-weight perlu tetap dibaca lisensi, model card, dan batasannya."],
        ["Kapan RAG lebih realistis daripada fine-tuning?", ["Saat pengetahuan sering berubah dan harus berbasis dokumen sumber.", "Saat ingin menghapus semua dokumen.", "Saat model tidak boleh menerima konteks.", "Saat jawaban tidak perlu sumber."], 0, "RAG cocok untuk knowledge base yang berubah dan perlu citation."],
        ["Decision matrix model sebaiknya memasukkan...", ["Popularitas model saja.", "Privasi, biaya, latency, bahasa, tool use, deployment, dan evaluasi.", "Warna logo vendor.", "Jumlah follower komunitas."], 1, "Pemilihan model adalah keputusan sistem, bukan kontes popularitas."],
        ["Tokenization pada LLM berarti...", ["Selalu memecah teks per kata utuh.", "Memecah teks menjadi unit yang diproses model, bisa kata, subword, atau tanda baca.", "Menghapus semua tanda baca.", "Menentukan role user di dashboard."], 1, "Token bisa berupa subword dan hasilnya berbeda antar model."],
        ["Embedding di dalam Transformer berfungsi untuk...", ["Mengubah token ID menjadi representasi vektor.", "Menyimpan API key.", "Mengirim email otomatis.", "Menghapus context window."], 0, "Embedding membuat token dapat diproses sebagai representasi numerik."],
        ["Mengapa positional information diperlukan?", ["Attention sendiri tidak otomatis mengetahui urutan token.", "Agar model selalu menolak prompt panjang.", "Agar token menjadi gambar.", "Agar database tidak perlu index."], 0, "Urutan perlu diberi sinyal melalui positional encoding atau variasinya."],
        ["Context window bukan long-term memory karena...", ["Ia hanya batas token dalam satu request, bukan penyimpanan permanen.", "Ia selalu menyimpan semua riwayat user selamanya.", "Ia menggantikan database.", "Ia hanya dipakai untuk CSS."], 0, "Memory harus dirancang eksplisit melalui state, database, retrieval, atau profile."],
        ["Untuk jawaban faktual, konfigurasi generation yang lebih aman biasanya...", ["Temperature rendah dan top-p lebih sempit.", "Temperature sangat tinggi dan top-p sangat luas.", "Tidak memakai stop condition apa pun.", "Mengacak output sebanyak mungkin."], 0, "Tugas faktual biasanya perlu output lebih stabil dan terkontrol."],
        ["Agent berbeda dari workflow deterministik karena...", ["Agent dapat memilih tindakan/tool dalam loop berdasarkan konteks.", "Agent selalu lebih murah.", "Agent tidak perlu logging.", "Agent tidak bisa memakai tool."], 0, "Agent punya loop pengambilan keputusan; workflow deterministik langkahnya ditentukan developer."],
        ["Tool schema yang baik minimal memuat...", ["Nama, deskripsi, parameter, validasi, dan izin.", "Warna tombol dan font.", "Nama vendor saja.", "Jumlah likes."], 0, "Tool schema harus jelas agar model dan sistem dapat mengeksekusi tool dengan aman."],
        ["Tindakan agent yang harus memerlukan approval manusia adalah...", ["Menghapus data peserta atau mengirim email massal.", "Membaca halaman bantuan publik.", "Menyusun draft yang belum dikirim.", "Menyarankan topik belajar."], 0, "Side effect yang berdampak nyata wajib gate approval."],
        ["Tool result grounding penting karena...", ["Agent bisa salah memilih tool, parameter, atau membaca hasil.", "Tool membuat semua jawaban otomatis benar.", "Tool menghapus kebutuhan evaluasi.", "Tool tidak pernah gagal."], 0, "Tool use tetap perlu validasi dan pembacaan hasil yang benar."],
        ["Metrik observability agent yang relevan adalah...", ["Tool success rate, latency, cost per successful task, human intervention rate.", "Jumlah warna di UI.", "Ukuran avatar.", "Jumlah menu sidebar."], 0, "Agent perlu trace dan metrik agar kegagalannya bisa dianalisis."],
        ["Modern AI system paling tepat dipahami sebagai...", ["Model saja.", "Model plus instructions, context, retrieval, tools, state, guardrails, evaluation, infrastructure, dan human oversight.", "Hanya prompt panjang.", "Hanya database vektor."], 1, "Kualitas sistem tidak hanya ditentukan model."],
        ["Kapan database query biasa lebih tepat daripada RAG?", ["Saat butuh data terstruktur deterministik seperti status pembayaran.", "Saat dokumen bebas perlu dirangkum.", "Saat sumber tidak punya struktur apa pun.", "Saat ingin jawaban kreatif."], 0, "Data terstruktur sering lebih aman dipanggil lewat query/API deterministik."],
        ["Risiko API key di frontend adalah...", ["Secret dapat diambil pengguna dan disalahgunakan.", "Model menjadi terlalu kecil.", "Context window bertambah otomatis.", "Retrieval menjadi lebih akurat."], 0, "Secret tidak boleh disimpan di HTML/JS frontend."],
        ["Human-in-the-loop berarti...", ["Manusia menyetujui sebelum aksi penting dijalankan.", "Manusia tidak pernah melihat sistem.", "Model selalu menolak tool.", "User interface tidak memiliki tombol."], 0, "Human-in-the-loop cocok untuk aksi yang punya dampak nyata."],
        ["Failure taxonomy membantu karena...", ["Kegagalan bisa terjadi di input, prompt, retrieval, model, tool, agent, validation, infrastructure, governance, atau human process.", "Semua kegagalan pasti berasal dari model.", "Logging tidak lagi diperlukan.", "Evaluasi cukup dilakukan sekali."], 0, "Melihat layer kegagalan mencegah diagnosis yang terlalu sempit."]
    ];

    var DISCUSSION_PROMPTS = [
        {
            title: "Foundation model sebagai infrastruktur bersama",
            context: "Organisasi kecil ingin memakai AI untuk layanan peserta, tetapi punya tim dan budget terbatas.",
            a: "Bangun model sendiri agar kontrol penuh.",
            b: "Pakai API atau open-weight model dan fokus pada aplikasi, evaluasi, serta data governance.",
            question: "Apakah organisasi kecil sebaiknya membangun model sendiri, memakai API, atau memakai open-weight model?",
            caseText: "Chatbot fellowship butuh Bahasa Indonesia, privasi data peserta, dan biaya terkendali."
        },
        {
            title: "Transformer dan batas context",
            context: "Model baru punya context window besar, tetapi dokumen kebijakan sering berubah.",
            a: "Context window besar cukup untuk semua kebutuhan.",
            b: "Retrieval, memory, dan database tetap diperlukan untuk sumber yang berubah dan terstruktur.",
            question: "Apakah context window besar dapat menggantikan retrieval, memory, dan database?",
            caseText: "Assistant harus menjawab berdasarkan pedoman terbaru dan tidak boleh memakai aturan lama."
        },
        {
            title: "Agent autonomy",
            context: "Agent dapat mengecek jadwal, membuat draft pesan, dan memanggil tool operasional.",
            a: "Agent boleh melakukan banyak aksi otomatis agar cepat.",
            b: "Aksi berdampak harus dibatasi dengan permission, logging, dan approval manusia.",
            question: "Tindakan apa yang boleh dilakukan agent tanpa approval manusia?",
            caseText: "Agent ingin mengirim pengumuman massal ke peserta setelah membaca kalender."
        },
        {
            title: "Sistem AI untuk fellowship",
            context: "HerAI Fellowship Assistant harus berguna, hemat biaya, menjaga privasi, dan mudah dirawat.",
            a: "Pakai model paling kuat untuk semua tugas.",
            b: "Gunakan routing, retrieval, caching, guardrails, dan evaluasi sesuai risiko tiap tugas.",
            question: "Bagaimana menyeimbangkan kemampuan, biaya, privasi, reliability, dan maintenance?",
            caseText: "Sistem harus menjawab pertanyaan peserta, membaca pedoman, cek jadwal, dan membuat draft pesan."
        }
    ];

    function safeJsonParse(value, fallback) {
        if (!value) return fallback;
        try {
            return JSON.parse(value);
        } catch (error) {
            return fallback;
        }
    }

    function saveJson(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function escapeHtml(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function setStatus(selector, message, tone) {
        var status = document.querySelector(selector);
        if (!status) return;
        status.textContent = message;
        status.dataset.tone = tone || "neutral";
    }

    var PRACTICES = PRACTICE_ITEMS.map(function (item) {
        return {
            id: item[0],
            topic: item[1],
            title: item[2],
            caseText: item[3],
            prompt: item[4],
            fields: [["jawaban", "Tulis analisis, keputusan, trade-off, dan alasanmu..."]],
            rubric: item[5],
            guide: "Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi."
        };
    });

    var PRACTICE_TOPICS = [
        { start: 0, end: 2, label: "Foundation Models" },
        { start: 3, end: 5, label: "Transformer" },
        { start: 6, end: 8, label: "AI Agents" },
        { start: 9, end: 12, label: "Sistem AI" }
    ];

    function getSavedPractice() {
        var saved = safeJsonParse(localStorage.getItem(STORAGE.practice), null) || { answers: {}, revealed: [], current: 0 };
        if (!saved.answers || typeof saved.answers !== "object") {
            saved = { answers: saved, revealed: [], current: 0 };
        }
        if (!Array.isArray(saved.revealed)) saved.revealed = [];
        saved.current = Math.min(Math.max(Number(saved.current) || 0, 0), PRACTICES.length - 1);
        return saved;
    }

    function renderFormattedText(text) {
        return String(text || "").split(/\n+/).filter(Boolean).map(function (line) {
            if (/^>\s*/.test(line)) return "<blockquote>" + escapeHtml(line.replace(/^>\s*/, "")) + "</blockquote>";
            return "<p>" + escapeHtml(line) + "</p>";
        }).join("");
    }

    function renderChecklist(items) {
        return items.map(function (item) {
            return '<li><i class="fas fa-circle-check"></i><span>' + escapeHtml(item) + '</span></li>';
        }).join("");
    }

    function renderPracticeCard(item, index, saved, readonly) {
        var fieldName = item.id + "-" + item.fields[0][0];
        var value = saved.answers[fieldName] || saved.answers[item.id] || "";
        var revealed = saved.revealed.indexOf(item.id) !== -1;
        return '<article class="reasoning-practice-card ai-modern-practice-item" data-practice-item="' + escapeHtml(item.id) + '">' +
            '<div class="reasoning-practice-number">' + (index + 1) + '</div>' +
            '<div class="reasoning-practice-copy"><span>' + escapeHtml(item.topic) + '</span><h3>' + escapeHtml(item.title) + '</h3><div class="reasoning-formatted-text"><blockquote>' + escapeHtml(item.caseText) + '</blockquote>' + renderFormattedText(item.prompt) + '</div>' +
            '<div class="ai-modern-rubric"><strong><i class="fas fa-list-check"></i> Checklist jawaban</strong><ul>' + renderChecklist(item.rubric) + '</ul></div>' +
            '<label class="reasoning-practice-field"><span>Jawabanmu</span><textarea name="' + escapeHtml(fieldName) + '" rows="7" placeholder="' + escapeHtml(item.fields[0][1]) + '"' + (readonly ? " disabled" : "") + '>' + escapeHtml(value) + '</textarea></label>' +
            '<div class="reasoning-practice-actions"><button type="button" data-practice-guide aria-expanded="' + String(revealed) + '"><i class="fas fa-lightbulb"></i> ' + (revealed ? "Sembunyikan panduan" : "Buka panduan") + '</button></div>' +
            '<div class="reasoning-practice-guide"' + (revealed ? "" : " hidden") + '><strong>Panduan evaluasi diri</strong><p>' + escapeHtml(item.guide) + '</p></div></div></article>';
    }

    window.initAiModernPractice = function () {
        var root = document.getElementById("aiModernPracticeApp");
        var form = document.getElementById("aiModernPracticeForm");
        if (!root || !form) return;
        if (form.dataset.aiModernInitialized === "true") return;
        form.dataset.aiModernInitialized = "true";

        var saved = getSavedPractice();
        var readonly = Boolean(localStorage.getItem(STORAGE.practice));
        var saveButton = form.querySelector("[data-practice-save]");
        var editButton = form.querySelector("[data-practice-edit]");
        var deleteButton = form.querySelector("[data-practice-delete]");

        function topicFor(index) {
            return PRACTICE_TOPICS.find(function (topic) { return index >= topic.start && index <= topic.end; }) || PRACTICE_TOPICS[0];
        }

        function completedCount() {
            return PRACTICES.filter(function (item) {
                return Boolean(saved.answers[item.id + "-jawaban"] || saved.answers[item.id]);
            }).length;
        }

        function captureCurrent() {
            var field = root.querySelector("textarea[name]");
            if (field) saved.answers[field.name] = field.value.trim();
        }

        function render() {
            var current = saved.current;
            var topic = topicFor(current);
            root.innerHTML = '<nav class="reasoning-task-navigator" aria-label="Navigasi latihan">' + PRACTICE_TOPICS.map(function (group) {
                return '<div class="reasoning-nav-group"><strong class="reasoning-nav-group-label">' + escapeHtml(group.label) + '</strong><div>' + PRACTICES.slice(group.start, group.end + 1).map(function (item, offset) {
                    var index = group.start + offset;
                    var complete = Boolean(saved.answers[item.id + "-jawaban"] || saved.answers[item.id]);
                    return '<button type="button" class="' + (index === current ? "is-active " : "") + (complete ? "is-complete" : "") + '" data-practice-jump="' + index + '" aria-label="Buka latihan ' + (index + 1) + '">' + (index + 1) + '</button>';
                }).join("") + '</div></div>';
            }).join("") + '</nav><div class="reasoning-practice-counter"><span>Skenario ' + (current + 1) + ' dari ' + PRACTICES.length + '</span><strong>' + escapeHtml(topic.label) + ' · ' + completedCount() + ' terisi</strong></div>' +
            renderPracticeCard(PRACTICES[current], current, saved, readonly) +
            '<div class="reasoning-practice-pagination"><button type="button" data-practice-prev' + (current === 0 ? " disabled" : "") + '><i class="fas fa-arrow-left"></i> Sebelumnya</button><button type="button" data-practice-next' + (current === PRACTICES.length - 1 ? " disabled" : "") + '>Berikutnya <i class="fas fa-arrow-right"></i></button></div>';

            root.querySelector("textarea").addEventListener("input", function () {
                captureCurrent();
                var counter = document.getElementById("aiModernPracticeCounter");
                if (counter) counter.textContent = completedCount() + "/" + PRACTICES.length + " latihan terisi";
            });
            root.querySelector("[data-practice-guide]").addEventListener("click", function (event) {
                var id = PRACTICES[current].id;
                var position = saved.revealed.indexOf(id);
                if (position === -1) saved.revealed.push(id); else saved.revealed.splice(position, 1);
                render();
            });
            root.querySelectorAll("[data-practice-jump]").forEach(function (button) {
                button.addEventListener("click", function () { captureCurrent(); saved.current = Number(button.dataset.practiceJump); render(); });
            });
            root.querySelector("[data-practice-prev]").addEventListener("click", function () { captureCurrent(); saved.current = Math.max(0, saved.current - 1); render(); });
            root.querySelector("[data-practice-next]").addEventListener("click", function () { captureCurrent(); saved.current = Math.min(PRACTICES.length - 1, saved.current + 1); render(); });
            form.classList.toggle("is-saved", readonly);
            if (saveButton) saveButton.hidden = readonly;
            if (editButton) editButton.hidden = !readonly;
            var overviewCounter = document.getElementById("aiModernPracticeCounter");
            if (overviewCounter) overviewCounter.textContent = completedCount() + "/" + PRACTICES.length + " latihan terisi";
        }

        if (saveButton) {
            saveButton.addEventListener("click", function () {
                captureCurrent();
                if (!completedCount()) {
                    setStatus("#aiModernPracticeStatus", "Isi minimal satu skenario sebelum menyimpan.", "warning");
                    return;
                }
                saveJson(STORAGE.practice, { version: 3, updatedAt: new Date().toISOString(), answers: saved.answers, revealed: saved.revealed, current: saved.current });
                readonly = true;
                render();
                setStatus("#aiModernPracticeStatus", "Latihan AI Modern tersimpan. Kamu bisa lanjut kuis atau edit lagi.", "success");
            });
        }

        if (editButton) {
            editButton.addEventListener("click", function () {
                readonly = false;
                render();
                setStatus("#aiModernPracticeStatus", "Mode edit aktif. Simpan ulang setelah mengubah jawaban.", "neutral");
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener("click", function () {
                localStorage.removeItem(STORAGE.practice);
                saved = { answers: {}, revealed: [], current: 0 };
                readonly = false;
                render();
                setStatus("#aiModernPracticeStatus", "Jawaban latihan dihapus dari browser ini.", "neutral");
            });
        }

        render();
        setStatus("#aiModernPracticeStatus", completedCount() ? "Jawaban lama berhasil dipulihkan dari browsermu." : "Jawaban akan tersimpan di browsermu.", completedCount() ? "success" : "neutral");
    };

    window.initAiModernBasic = window.initAiModernPractice;

    function getQuizState() {
        var savedAnswers = safeJsonParse(localStorage.getItem(STORAGE.quizAnswers), []);
        if (!Array.isArray(savedAnswers) || savedAnswers.length !== QUIZ.length) {
            localStorage.removeItem(STORAGE.quizDone);
            localStorage.removeItem(STORAGE.quizScore);
            localStorage.removeItem(STORAGE.quizAnswers);
            savedAnswers = Array(QUIZ.length).fill(null);
        }
        return {
            done: localStorage.getItem(STORAGE.quizDone) === "true",
            score: Number(localStorage.getItem(STORAGE.quizScore)) || 0,
            answers: savedAnswers,
            current: 0
        };
    }

    window.initAiModernQuiz = function () {
        var root = document.getElementById("aiModernQuizApp");
        var form = document.getElementById("aiModernQuizForm");
        if (!root || !form) return;
        if (form.dataset.aiModernInitialized === "true") return;
        form.dataset.aiModernInitialized = "true";

        var state = getQuizState();

        function answeredCount() {
            return state.answers.filter(function (answer) { return answer !== null && answer !== undefined; }).length;
        }

        function renderQuestion() {
            if (state.done) {
                root.innerHTML = '<div class="ai-modern-quiz-lock"><i class="fas fa-lock"></i><div><strong>Attempt sudah digunakan</strong><p>Semua soal, jawabanmu, jawaban benar, dan pembahasan ditampilkan untuk review.</p></div></div><div class="ai-modern-quiz-review">' + QUIZ.map(function (reviewItem, questionIndex) {
                    var reviewChosen = state.answers[questionIndex];
                    return '<article class="ai-modern-quiz-card" data-quiz-index="' + questionIndex + '"><span class="ai-modern-review-number">Soal ' + (questionIndex + 1) + '</span><h3>' + escapeHtml(reviewItem[0]) + '</h3><div class="ai-modern-quiz-options">' + reviewItem[1].map(function (option, optionIndex) {
                        var reviewClasses = [];
                        if (reviewChosen === optionIndex) reviewClasses.push("is-selected");
                        if (optionIndex === reviewItem[2]) reviewClasses.push("is-correct");
                        if (reviewChosen === optionIndex && optionIndex !== reviewItem[2]) reviewClasses.push("is-wrong");
                        return '<button type="button" class="' + reviewClasses.join(" ") + '" disabled><span>' + String.fromCharCode(65 + optionIndex) + '</span><p>' + escapeHtml(option) + '</p></button>';
                    }).join("") + '</div><p class="quiz-explanation"><i class="fas fa-lightbulb"></i>' + escapeHtml(reviewItem[3]) + '</p></article>';
                }).join("") + '</div>';
                var submitLocked = form.querySelector(".quiz-submit-btn");
                if (submitLocked) submitLocked.hidden = true;
                return;
            }
            var item = QUIZ[state.current];
            var chosen = state.answers[state.current];
            root.innerHTML = "<section class=\"ai-modern-quiz-overview\" aria-label=\"Navigasi kuis\"><div class=\"ai-modern-quiz-top\"><span>Soal " + (state.current + 1) + " dari " + QUIZ.length + "</span><strong id=\"aiModernQuizCounter\">" + answeredCount() + "/" + QUIZ.length + " terjawab</strong></div>" +
                "<div class=\"ai-modern-quiz-map\">" + QUIZ.map(function (_, index) {
                    var cls = index === state.current ? "active" : state.answers[index] !== null && state.answers[index] !== undefined ? "answered" : "";
                    return "<button type=\"button\" class=\"" + cls + "\" data-quiz-jump=\"" + index + "\" aria-label=\"Buka soal " + (index + 1) + "\">" + (index + 1) + "</button>";
                }).join("") + "</div></section>" +
                "<article class=\"ai-modern-quiz-card\">" +
                    "<h3>" + escapeHtml(item[0]) + "</h3>" +
                    "<div class=\"ai-modern-quiz-options\">" + item[1].map(function (option, index) {
                        var classes = [];
                        if (chosen === index) classes.push("is-selected");
                        return "<button type=\"button\" class=\"" + classes.join(" ") + "\" data-quiz-option=\"" + index + "\"><span>" + String.fromCharCode(65 + index) + "</span><p>" + escapeHtml(option) + "</p></button>";
                    }).join("") + "</div>" +
                "</article>" +
                "<div class=\"ai-modern-quiz-nav\"><button type=\"button\" data-quiz-prev" + (state.current === 0 ? " disabled" : "") + "><i class=\"fas fa-arrow-left\"></i> Sebelumnya</button><button type=\"button\" data-quiz-next" + (state.current === QUIZ.length - 1 ? " disabled" : "") + ">Berikutnya <i class=\"fas fa-arrow-right\"></i></button></div>";

            root.querySelectorAll("[data-quiz-option]").forEach(function (button) {
                button.addEventListener("click", function () {
                    state.answers[state.current] = Number(button.dataset.quizOption);
                    renderQuestion();
                });
            });
            root.querySelector("[data-quiz-prev]")?.addEventListener("click", function () {
                state.current = Math.max(0, state.current - 1);
                renderQuestion();
            });
            root.querySelector("[data-quiz-next]")?.addEventListener("click", function () {
                state.current = Math.min(QUIZ.length - 1, state.current + 1);
                renderQuestion();
            });
            root.querySelectorAll("[data-quiz-jump]").forEach(function (button) {
                button.addEventListener("click", function () {
                    state.current = Number(button.dataset.quizJump);
                    renderQuestion();
                });
            });
        }

        function renderResult(message) {
            var result = document.getElementById("aiModernQuizResult");
            if (!result) return;
            if (message && !state.done) {
                result.hidden = false;
                result.innerHTML = "<strong>Kuis belum bisa dikirim</strong><span>" + escapeHtml(message) + "</span>";
                return;
            }
            var percent = Math.round((state.score / QUIZ.length) * 100);
            result.hidden = false;
            result.innerHTML = "<strong>Skor kamu: " + state.score + "/" + QUIZ.length + " (" + percent + "%)</strong><span>" + escapeHtml(message || (percent >= 75 ? "Lulus. Review pembahasan untuk mengunci pemahaman." : "Belum mencapai 75%. Gunakan pembahasan untuk review.")) + "</span>";
            var next = document.getElementById("aiModernQuizNext");
            if (next && percent >= 75) next.classList.remove("is-disabled");
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            if (state.done) return;
            if (answeredCount() < QUIZ.length) {
                renderResult("Masih ada " + (QUIZ.length - answeredCount()) + " soal yang belum dijawab.");
                return;
            }
            state.score = state.answers.reduce(function (score, answer, index) {
                return score + (answer === QUIZ[index][2] ? 1 : 0);
            }, 0);
            state.done = true;
            localStorage.setItem(STORAGE.quizDone, "true");
            localStorage.setItem(STORAGE.quizScore, String(state.score));
            saveJson(STORAGE.quizAnswers, state.answers);
            renderQuestion();
            renderResult();
        });

        renderQuestion();
        if (state.done) renderResult("Kuis ini single attempt. Jawaban dan pembahasan sudah dikunci.");
    };

    function getDiscussionPosts() {
        var saved = safeJsonParse(localStorage.getItem(STORAGE.discussion), null);
        return Array.isArray(saved) ? saved : [];
    }

    function saveDiscussionPosts(posts) {
        saveJson(STORAGE.discussion, posts);
    }

    function renderPromptCards() {
        var box = document.getElementById("aiModernDiscussionPrompts");
        if (!box) return;
        box.innerHTML = DISCUSSION_PROMPTS.map(function (prompt, index) {
            return "<article class=\"ai-modern-discussion-prompt\">" +
                "<span>" + (index + 1) + "</span><h3>" + escapeHtml(prompt.title) + "</h3><p>" + escapeHtml(prompt.context) + "</p>" +
                "<div><strong>Posisi A:</strong> " + escapeHtml(prompt.a) + "</div><div><strong>Posisi B:</strong> " + escapeHtml(prompt.b) + "</div>" +
                "<p><strong>Pemantik:</strong> " + escapeHtml(prompt.question) + "</p><small>" + escapeHtml(prompt.caseText) + "</small>" +
                "<button type=\"button\" data-discussion-prompt=\"" + escapeHtml(prompt.title) + "\"><i class=\"far fa-message\"></i> Pakai prompt ini</button>" +
            "</article>";
        }).join("");
    }

    function renderDiscussion(posts) {
        var list = document.getElementById("aiModernDiscussionList");
        if (!list) return;
        if (!posts.length) {
            list.innerHTML = "<div class=\"ml-empty-state\">Belum ada diskusi tersimpan. Pilih prompt di atas atau tulis posisi diskusimu sendiri.</div>";
            return;
        }
        list.innerHTML = posts.map(function (post) {
            var replies = Array.isArray(post.replies) ? post.replies : [];
            return "<article class=\"discussion-bubble\" data-discussion-id=\"" + escapeHtml(post.id) + "\">" +
                "<div><span>A</span><strong>Aisyah Putri</strong><small>" + new Date(post.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) + "</small></div>" +
                "<p><b>" + escapeHtml(post.prompt) + "</b></p><p>" + escapeHtml(post.text) + "</p>" +
                "<button type=\"button\" data-reply=\"" + escapeHtml(post.id) + "\" aria-expanded=\"false\"><i class=\"far fa-message\"></i> Balas</button>" +
                "<div class=\"ai-modern-reply-composer\" data-reply-composer=\"" + escapeHtml(post.id) + "\" hidden><label><span>Tulis balasan</span><textarea rows=\"3\" placeholder=\"Tambahkan argumen, pertanyaan, atau contoh yang relevan...\"></textarea></label><p class=\"practice-status\" aria-live=\"polite\"></p><div><button type=\"button\" data-reply-save=\"" + escapeHtml(post.id) + "\"><i class=\"fas fa-paper-plane\"></i> Kirim Balasan</button><button type=\"button\" data-reply-cancel=\"" + escapeHtml(post.id) + "\">Batal</button></div></div>" +
                "<div class=\"discussion-replies\">" + replies.map(function (reply) {
                    return "<article><strong>Aisyah Putri</strong><small>" + new Date(reply.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) + "</small><p>" + escapeHtml(reply.text) + "</p></article>";
                }).join("") + "</div></article>";
        }).join("");

        list.querySelectorAll("[data-reply]").forEach(function (button) {
            button.addEventListener("click", function () {
                var composer = list.querySelector('[data-reply-composer="' + button.dataset.reply + '"]');
                if (!composer) return;
                var willShow = composer.hidden;
                composer.hidden = !willShow;
                button.setAttribute("aria-expanded", String(willShow));
                if (willShow) composer.querySelector("textarea").focus();
            });
        });

        list.querySelectorAll("[data-reply-save]").forEach(function (button) {
            button.addEventListener("click", function () {
                var composer = button.closest(".ai-modern-reply-composer");
                var field = composer ? composer.querySelector("textarea") : null;
                var status = composer ? composer.querySelector(".practice-status") : null;
                var text = field ? field.value.trim() : "";
                if (!text) {
                    if (status) { status.textContent = "Tulis balasan terlebih dahulu."; status.dataset.tone = "warning"; }
                    return;
                }
                var nextPosts = getDiscussionPosts();
                var target = nextPosts.find(function (post) { return post.id === button.dataset.replySave; });
                if (!target) return;
                target.replies = Array.isArray(target.replies) ? target.replies : [];
                target.replies.push({ text: text.trim(), createdAt: new Date().toISOString() });
                saveDiscussionPosts(nextPosts);
                renderDiscussion(nextPosts);
            });
        });

        list.querySelectorAll("[data-reply-cancel]").forEach(function (button) {
            button.addEventListener("click", function () {
                var composer = button.closest(".ai-modern-reply-composer");
                if (composer) composer.hidden = true;
                var trigger = list.querySelector('[data-reply="' + button.dataset.replyCancel + '"]');
                if (trigger) trigger.setAttribute("aria-expanded", "false");
            });
        });
    }

    window.initAiModernDiscussion = function () {
        var form = document.getElementById("aiModernDiscussionForm");
        var textarea = form ? form.querySelector("textarea") : null;
        var select = form ? form.querySelector("select") : null;
        if (form && form.dataset.aiModernInitialized === "true") return;
        if (form) form.dataset.aiModernInitialized = "true";
        renderPromptCards();

        var posts = getDiscussionPosts();
        renderDiscussion(posts);

        document.querySelectorAll("[data-discussion-prompt]").forEach(function (button) {
            button.addEventListener("click", function () {
                if (select) select.value = button.dataset.discussionPrompt;
                if (textarea && !textarea.value.trim()) {
                    textarea.value = button.dataset.discussionPrompt + "\n\nPosisi saya:\nAlasan:\nRisiko:\n";
                    textarea.focus();
                }
            });
        });

        if (!form || !textarea || !select) return;

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var text = textarea.value.trim();
            if (!text) {
                setStatus("#aiModernDiscussionStatus", "Tulis isi diskusi terlebih dahulu.", "warning");
                return;
            }
            posts = getDiscussionPosts();
            posts.unshift({ id: "post-" + Date.now(), prompt: select.value, text: text, createdAt: new Date().toISOString(), replies: [] });
            saveDiscussionPosts(posts);
            form.reset();
            setStatus("#aiModernDiscussionStatus", "Diskusi berhasil diposting dan tersimpan di browser ini.", "success");
            renderDiscussion(posts);
        });
    };
})();
