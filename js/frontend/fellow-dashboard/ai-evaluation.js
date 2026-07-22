(function () {
    var BASE = "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation";
    var ACTIVITIES = ["materi", "latihan", "kuis", "diskusi"];
    var PASSING_SCORE = 75;
    var STORAGE = {
        currentModule: "heraiAiEvaluationCurrentModule",
        completedModules: "heraiAiEvaluationCompletedModules",
        practice: "heraiAiEvaluationPractice",
        quizDone: "heraiAiEvaluationQuizDone",
        quizScore: "heraiAiEvaluationQuizScore",
        quizAnswers: "heraiAiEvaluationQuizAnswers",
        discussion: "heraiAiEvaluationDiscussion"
    };

    var MODULES = [
        { 
            slug: "why-evaluate-ai", title: "Mengapa AI Perlu Dievaluasi?", shortTitle: "Mengapa Evaluasi", summary: "Hubungan tujuan, pengguna, risiko, metrik, release decision, dan monitoring.", chapter: "chapter-1.html", duration: "25 menit",
            icon: "fas fa-shield-halved",
            objectives: [
                "Menyadari pentingnya evaluasi melampaui metrik populer",
                "Mendefinisikan tujuan dan pengguna sistem",
                "Mengetahui perlunya monitoring dan release decision"
            ],
            hook: { question: "Mengapa AI tidak cukup diuji seperti fitur software biasa?", answerA: { label: "Lebih mudah", text: "AI hampir selalu benar.", icon: "fas fa-check" }, answerB: { label: "Lebih kompleks", text: "AI probabilistik dan berdampak nyata.", icon: "fas fa-code-branch" }, message: "Evaluasi AI harus diselaraskan dengan tujuan produk, risiko, dan dampak pada pengguna." },
            glossary: [["Release decision", "Keputusan kapan AI siap digunakan."], ["Monitoring", "Pengawasan terus-menerus pascadeploy."]],
            quickCheck: { question: "Apa langkah awal dalam mengevaluasi AI?", options: ["Langsung menggunakan benchmark", "Mendefinisikan tujuan dan pengguna", "Memilih model paling besar"], answer: 1, explanationCorrect: "Tepat. Evaluasi harus berasal dari konteks keputusan pengguna.", explanationWrong: "Benchmark populer seringkali tidak mewakili pengguna sebenarnya." },
            learningOutcomes: ["Menentukan tujuan evaluasi berdasar risiko", "Menyusun peta pengguna dan keputusan yang didukung AI"], transition: "Mari lanjut mengevaluasi output yang dihasilkan AI."
        },
        { 
            slug: "output-evaluation", title: "Mengevaluasi Output AI", shortTitle: "Evaluasi Output", summary: "Rubric output, human evaluation, metrik otomatis, LLM-as-a-judge, dan RAG evaluation.", chapter: "chapter-2.html", duration: "35 menit",
            icon: "fas fa-clipboard-check",
            objectives: [
                "Menggunakan rubrik dan human evaluation",
                "Memilih metrik otomatis yang tepat",
                "Menerapkan LLM-as-a-judge"
            ],
            hook: { question: "Apakah LLM bisa mengevaluasi LLM lain (LLM-as-a-judge)?", answerA: { label: "Bisa", text: "Dengan instruksi rubrik dan kalibrasi yang baik.", icon: "fas fa-scale-balanced" }, answerB: { label: "Tidak bisa", text: "AI tidak bisa menilai AI.", icon: "fas fa-ban" }, message: "LLM-as-a-judge memungkinkan evaluasi yang lebih skalabel asalkan dikalibrasi dengan penilaian manusia." },
            glossary: [["LLM-as-a-judge", "Penggunaan LLM untuk mengevaluasi output model lain berdasarkan rubrik."], ["Faithfulness", "Kesesuaian jawaban dengan konteks sumber (pada RAG)."]],
            quickCheck: { question: "Apa metrik evaluasi yang tepat untuk sistem RAG?", options: ["Hanya BLEU score", "Faithfulness dan Answer Relevance", "Kecepatan merespon"], answer: 1, explanationCorrect: "Benar. RAG harus setia pada sumber dokumen.", explanationWrong: "Metrik teks klasik seperti BLEU kurang efektif untuk penalaran kontekstual." },
            learningOutcomes: ["Membuat rubrik evaluasi output", "Menerapkan LLM judge yang dikalibrasi"], transition: "Selanjutnya kita lihat kumpulan dataset untuk benchmark."
        },
        { 
            slug: "benchmark-and-dataset", title: "Benchmark dan Dataset Evaluasi", shortTitle: "Benchmark & Dataset", summary: "Benchmark, test set, leaderboard, contamination, dan konteks Indonesia.", chapter: "chapter-3.html", duration: "30 menit",
            icon: "fas fa-chart-bar",
            objectives: [
                "Memahami fungsi test set dan benchmark",
                "Mengenali risiko data contamination",
                "Menyadari pentingnya benchmark lokal/Indonesia"
            ],
            hook: { question: "Skor tinggi di leaderboard berarti model siap dideploy?", answerA: { label: "Ya", text: "Leaderboard adalah bukti terbaik.", icon: "fas fa-trophy" }, answerB: { label: "Belum tentu", text: "Benchmark belum tentu merepresentasikan pengguna.", icon: "fas fa-users" }, message: "Leaderboard hanya sinyal awal. Pengujian dengan test set internal yang mencerminkan pengguna nyata wajib dilakukan." },
            glossary: [["Data contamination", "Model telah melihat test set selama fase training, membuat evaluasinya tidak valid."], ["Leaderboard", "Papan peringkat skor benchmark publik."]],
            quickCheck: { question: "Mengapa benchmark global tidak cukup untuk konteks Indonesia?", options: ["Benchmark global terlalu susah", "Adanya mismatch bahasa, domain, dan budaya", "Biaya evaluasinya mahal"], answer: 1, explanationCorrect: "Tepat. Perbedaan konteks lokal bisa membuat model gagal di lapangan.", explanationWrong: "Pertimbangkan kerelevanan budaya dan bahasa penggunanya." },
            learningOutcomes: ["Menilai kesesuaian benchmark eksternal", "Menghindari jebakan data contamination"], transition: "Selain skor yang tinggi, sistem harus reliabel."
        },
        { 
            slug: "reliability-and-robustness", title: "Reliability dan Robustness", shortTitle: "Reliability", summary: "Consistency, robustness, calibration, hallucination, stress test, dan monitoring.", chapter: "chapter-4.html", duration: "35 menit",
            icon: "fas fa-gears",
            objectives: [
                "Menganalisis robustness terhadap input tidak terduga",
                "Mendeteksi dan mitigasi hallucination",
                "Melakukan stress test"
            ],
            hook: { question: "Bila AI tidak tahu jawabannya, apa yang sebaiknya ia lakukan?", answerA: { label: "Mencoba menjawab", text: "Terlihat pintar lebih baik.", icon: "fas fa-comment-dots" }, answerB: { label: "Mengakui tidak tahu", text: "Menolak halus atau eskalasi.", icon: "fas fa-shield-halved" }, message: "Sistem yang reliabel memiliki failure mode yang aman, seperti menolak menjawab dibanding berhalusinasi." },
            glossary: [["Hallucination", "AI menghasilkan fakta fiktif yang terdengar meyakinkan."], ["Stress test", "Menguji model dengan input ekstrem atau adversarial."]],
            quickCheck: { question: "Apa salah satu cara mendeteksi hallucination secara otomatis?", options: ["SelfCheckGPT (konsistensi antarsampel)", "Menghitung jumlah kata", "Mengecek grammar"], answer: 0, explanationCorrect: "Tepat. Jika AI diminta beberapa kali dan jawabannya berbeda-beda untuk fakta yang sama, kemungkinan ia berhalusinasi.", explanationWrong: "Coba pikirkan bagaimana konsistensi jawaban bisa menjadi sinyal." },
            learningOutcomes: ["Membuat stress test untuk edge cases", "Mengevaluasi tingkat confidence dan kalibrasi"], transition: "Bahkan jika reliabel, apakah sistem itu adil?"
        },
        { 
            slug: "bias-and-fairness", title: "Bias dan Fairness", shortTitle: "Bias & Fairness", summary: "Bias statistik, sosial, harmful bias, fairness metric, dan audit konteks Indonesia.", chapter: "chapter-5.html", duration: "35 menit",
            icon: "fas fa-scale-balanced",
            objectives: [
                "Mengidentifikasi bias sosial dan historis",
                "Menerapkan metrik fairness",
                "Mengaudit bias konteks lokal"
            ],
            hook: { question: "Menghapus variabel 'gender' akan menghilangkan bias gender pada AI?", answerA: { label: "Ya", text: "AI tidak bisa melihat gender lagi.", icon: "fas fa-eraser" }, answerB: { label: "Tidak", text: "Ada fitur proksi seperti sekolah atau hobi.", icon: "fas fa-magnifying-glass" }, message: "Fitur proksi sering kali membawa informasi sensitif kembali ke dalam model. Evaluasi dampak (bukan hanya input) lebih kritikal." },
            glossary: [["Fairness metric", "Ukuran kesetaraan performa atau dampak pada kelompok berbeda."], ["Proxy feature", "Variabel yang berkorelasi kuat dengan atribut sensitif (misal: kode pos untuk ras/kelas sosial)."]],
            quickCheck: { question: "Apa itu Equalized Odds dalam konteks fairness?", options: ["Setiap orang mendapat skor yang sama", "Kesetaraan tingkat error antar kelompok", "Model selalu memprediksi positif"], answer: 1, explanationCorrect: "Tepat. Memastikan tingkat false positive dan false negative merata.", explanationWrong: "Fokus pada keseimbangan peluang salah antar grup." },
            learningOutcomes: ["Mendeteksi sumber bias dari data", "Memilih fairness metric sesuai konteks sistem"], transition: "Terakhir, mari kita gabungkan semuanya dalam satu rencana evaluasi."
        },
        { 
            slug: "system-quality-evaluation-plan", title: "Kualitas Sistem AI dan Evaluation Plan", shortTitle: "Evaluation Plan", summary: "System quality, lifecycle, release criteria, monitoring, incident response, dan evaluation plan.", chapter: "chapter-6.html", duration: "40 menit",
            icon: "fas fa-list-check",
            objectives: [
                "Menetapkan release criteria",
                "Menyusun monitoring plan pascadeploy",
                "Membuat komprehensif AI Evaluation Plan"
            ],
            hook: { question: "Evaluasi AI selesai ketika model sudah di-deploy ke pengguna?", answerA: { label: "Ya", text: "Proses development selesai.", icon: "fas fa-flag-checkered" }, answerB: { label: "Tidak", text: "Perilaku pengguna berubah-ubah.", icon: "fas fa-arrows-rotate" }, message: "Monitoring pascadeploy adalah jantung evaluasi sistem AI nyata karena input terus bergeser." },
            glossary: [["Release criteria", "Syarat kualitas minimum sistem sebelum dapat dideploy."], ["Incident response", "Prosedur penanganan saat sistem AI gagal beroperasi dengan aman."]],
            quickCheck: { question: "AI Evaluation Plan terbaik seharusnya memuat...", options: ["Hanya skor benchmark terbaik", "Risiko, metrik, release criteria, dan monitoring", "Daftar dataset saja"], answer: 1, explanationCorrect: "Benar. Evaluasi teknis harus diiringi governance.", explanationWrong: "Sebuah plan harus end-to-end hingga operasional." },
            learningOutcomes: ["Merancang AI Evaluation Plan yang operasional", "Merespons kegagalan AI di ranah produksi"], transition: "Selesai! Kamu sekarang memiliki kerangka evaluasi komprehensif."
        }
    ];

    var EXERCISES = [
        ["why-evaluate-ai", "Menentukan tujuan evaluasi", "Chatbot fellowship menjawab jadwal, tugas, mentor, dan aturan program.", "Tulis pengguna target, tujuan sistem, failure paling berbahaya, indikator keberhasilan, dan metrik awal.", "Tujuan evaluasi harus berangkat dari keputusan yang dibantu AI, bukan dari metrik populer."],
        ["why-evaluate-ai", "Output, model, atau system evaluation?", "Tim menguji ringkasan, skor benchmark, dan proses rollback.", "Klasifikasikan mana output evaluation, model evaluation, dan system evaluation.", "Output menilai hasil user, model menilai kemampuan teknis, system menilai produk lengkap."],
        ["output-evaluation", "Menilai dua output dengan rubric", "Satu jawaban lancar tetapi mengarang fakta; satu jawaban lebih pendek tetapi setia pada sumber.", "Beri skor 1-4 untuk relevansi, factuality, completeness, clarity, safety.", "Jawaban yang setia sumber lebih aman walau tidak selalu paling panjang."],
        ["output-evaluation", "Memilih metrik", "Tim mengevaluasi summarizer, RAG assistant, dan code generator.", "Pilih metrik yang masuk akal untuk setiap tugas.", "Summarizer dapat memakai ROUGE/BERTScore plus rubric; RAG perlu faithfulness; code perlu pass@k."],
        ["output-evaluation", "Mengkritik LLM-as-a-judge", "Evaluator AI lebih menyukai jawaban yang panjang dan formal.", "Tulis risiko bias judge dan cara kalibrasinya.", "LLM judge perlu rubric, human calibration, dan audit bias seperti verbosity atau position bias."],
        ["benchmark-and-dataset", "Memilih benchmark", "Chatbot akademik Indonesia diuji sebelum pilot.", "Pilih benchmark eksternal dan test set internal yang diperlukan.", "Gunakan baseline global, tetapi wajib tambah data Indonesia, domain kampus, dan skenario lokal."],
        ["benchmark-and-dataset", "Mendeteksi mismatch benchmark", "Skor benchmark Inggris tinggi, tetapi user memakai bahasa Indonesia informal.", "Jelaskan mismatch bahasa, domain, dan budaya.", "Benchmark populer tidak cukup jika tidak representatif terhadap pengguna."],
        ["reliability-and-robustness", "Membuat reliability stress test", "RAG assistant menjawab kebijakan internal.", "Buat test untuk typo, ambiguity, dokumen panjang, prompt injection, dan unknown answer.", "Expected behavior harus mencakup klarifikasi, menolak instruksi berbahaya, dan mengakui keterbatasan."],
        ["reliability-and-robustness", "Correctness dan confidence", "Model salah tetapi menjawab sangat yakin.", "Tentukan evaluasi tambahan untuk masalah ini.", "Calibration, uncertainty handling, dan failure taxonomy perlu ditambahkan."],
        ["reliability-and-robustness", "Mendeteksi hallucination", "Jawaban menyebut aturan yang tidak ada di sumber.", "Tuliskan sinyal hallucination dan cara memverifikasi.", "Periksa dukungan sumber, consistency, dan jawaban saat informasi tidak tersedia."],
        ["bias-and-fairness", "Mengidentifikasi sumber bias", "AI membantu screening beasiswa dari esai dan metadata sekolah.", "Identifikasi kelompok terdampak, sumber bias, dan data tambahan.", "Bias bisa muncul dari data historis, label, fitur proxy, dan kebijakan deploy."],
        ["bias-and-fairness", "Memilih fairness check", "Akurasi dua kelompok mirip tetapi false positive rate berbeda.", "Pilih fairness check yang perlu dibaca.", "TPR/FPR lintas kelompok dan dampak keputusan harus diperiksa, bukan hanya akurasi rata-rata."],
        ["system-quality-evaluation-plan", "Menentukan release criteria", "Asisten AI HerAI akan dipilotkan ke peserta.", "Tulis minimal tiga release criteria yang dapat diuji.", "Release criteria harus operasional: failure kritis, threshold kualitas, human review, dan rollback."],
        ["system-quality-evaluation-plan", "Membuat monitoring plan", "Setelah deploy, pertanyaan user berubah dan ada keluhan jawaban salah.", "Tentukan sinyal monitoring, pemilik tindak lanjut, dan escalation path.", "Monitoring perlu membaca kualitas output, incident, feedback, dan perubahan distribusi."],
        ["system-quality-evaluation-plan", "Mini AI Evaluation Plan", "Pilih chatbot fellowship, AI summarizer, rekomendasi materi, AI screening, atau RAG assistant.", "Isi tujuan, pengguna, risiko, benchmark, metrik, stress test, bias audit, human review, release, monitoring, incident, rollback.", "Evaluation plan menyatukan evaluasi teknis dan governance."]
    ].map(function (item, index) {
        return { id: "ex-" + (index + 1), module: item[0], title: item[1], scenario: item[2], instruction: item[3], modelAnswer: item[4] };
    });

    var QUIZ = [
        ["why-evaluate-ai", "Sebuah AI punya akurasi tinggi tetapi sering salah pada kasus ambigu. Evaluasi apa yang paling tepat ditambahkan?", ["Warna UI", "Robustness dan failure-case analysis", "Jumlah parameter", "Nama model"], 1, "Akurasi rata-rata dapat menyembunyikan failure case."],
        ["why-evaluate-ai", "Mengapa evaluasi AI tidak cukup seperti testing tombol?", ["AI selalu deterministik", "AI menghasilkan output probabilistik dan berdampak pada keputusan", "Testing tombol tidak penting", "AI tidak perlu validasi"], 1, "AI perlu diuji terhadap konteks, risiko, dan variasi input."],
        ["why-evaluate-ai", "Urutan awal evaluation plan yang sehat adalah...", ["Metrik lalu tujuan", "Tujuan, pengguna, risiko, kriteria, metrik", "Leaderboard lalu deploy", "Model lalu logo"], 1, "Metrik harus mengikuti tujuan dan risiko."],
        ["why-evaluate-ai", "Apa fungsi release gate?", ["Menghias dashboard", "Menentukan syarat terukur sebelum rilis", "Menghapus data", "Mengganti mentor"], 1, "Release gate menghubungkan evaluasi dengan keputusan deploy."],
        ["output-evaluation", "ROUGE tinggi tetapi ringkasan menghapus peringatan penting. Apa masalahnya?", ["Latency", "Completeness dan factuality", "Warna", "Ukuran model"], 1, "Overlap teks tidak menjamin informasi penting tercakup."],
        ["output-evaluation", "Pada RAG, faithfulness menilai...", ["Kecepatan server", "Kesesuaian jawaban dengan sumber", "Jumlah user", "Desain icon"], 1, "Faithfulness memeriksa grounding terhadap konteks."],
        ["output-evaluation", "Risiko LLM-as-a-judge adalah...", ["Tidak bisa membaca teks", "Bias terhadap jawaban panjang atau posisi opsi", "Selalu lebih lambat dari manusia", "Tidak dapat dipakai sama sekali"], 1, "LLM judge perlu rubric dan kalibrasi."],
        ["output-evaluation", "pass@k paling relevan untuk...", ["Code generation", "Warna tombol", "Estimasi biaya konsumsi", "Sidebar"], 0, "pass@k mengukur peluang solusi kode benar dari k sampel."],
        ["benchmark-and-dataset", "Benchmark global Inggris untuk chatbot akademik Indonesia berisiko karena...", ["Terlalu murah", "Mismatch bahasa, domain, dan budaya", "Selalu mudah", "Tidak punya tabel"], 1, "Representativeness adalah kunci."],
        ["benchmark-and-dataset", "Leaderboard sebaiknya dipakai sebagai...", ["Satu-satunya keputusan deploy", "Sinyal pembanding awal", "Pengganti test set internal", "Alasan hapus monitoring"], 1, "Leaderboard bukan validasi konteks deploy."],
        ["benchmark-and-dataset", "Data contamination membuat skor...", ["Lebih dapat dipercaya", "Terlalu optimistis", "Selalu turun", "Tidak berubah"], 1, "Model mungkin pernah melihat data evaluasi."],
        ["benchmark-and-dataset", "IndoBias paling relevan untuk...", ["Audit bias lokal bahasa Indonesia", "Mengukur GPU", "Membuat CSS", "Menghapus quiz"], 0, "IndoBias membantu konteks sosial-budaya lokal."],
        ["reliability-and-robustness", "Model salah tetapi confidence tinggi menunjukkan masalah...", ["Calibration", "Typography", "Routing", "Avatar"], 0, "Calibration membaca kesesuaian confidence dan correctness."],
        ["reliability-and-robustness", "Prompt injection perlu diuji dalam...", ["Stress test reliability", "Logo test", "Color palette", "Leaderboard saja"], 0, "Prompt injection adalah input adversarial."],
        ["reliability-and-robustness", "Jika sumber tidak tersedia, expected behavior yang sehat adalah...", ["Mengarang jawaban", "Mengakui keterbatasan atau eskalasi", "Menjawab makin yakin", "Menghapus pertanyaan"], 1, "Failure behavior harus aman."],
        ["reliability-and-robustness", "SelfCheckGPT menginspirasi pemeriksaan...", ["Konsistensi antarsampel untuk hallucination", "Ukuran font", "Login admin", "Animasi"], 0, "Konsistensi respons dapat memberi sinyal factuality."],
        ["bias-and-fairness", "Akurasi rata-rata tinggi tetapi subgroup dirugikan berarti perlu...", ["Subgroup evaluation", "Menghapus semua data", "Ganti logo", "Tambah warna"], 0, "Rata-rata dapat menutupi dampak kelompok."],
        ["bias-and-fairness", "Menghapus atribut sensitif...", ["Selalu menyelesaikan bias", "Tidak selalu cukup karena proxy bisa tersisa", "Membuat model tidak jalan", "Menghapus fairness"], 1, "Fitur lain dapat membawa sinyal yang sama."],
        ["bias-and-fairness", "Equalized odds berhubungan dengan...", ["Kesetaraan error rate", "Ukuran dataset saja", "Warna kartu", "Jumlah chapter"], 0, "Equalized odds membaca error lintas kelompok."],
        ["bias-and-fairness", "Fairness metric harus dipilih berdasarkan...", ["Konteks keputusan dan dampak", "Nama model", "Jumlah icon", "Urutan script"], 0, "Tidak ada metrik fairness universal."],
        ["system-quality-evaluation-plan", "Model bagus di benchmark tetapi tanpa rollback berarti...", ["Sistem belum siap operasional", "Pasti aman", "Tidak perlu monitoring", "Tidak perlu human review"], 0, "System quality mencakup kontrol operasional."],
        ["system-quality-evaluation-plan", "AI Evaluation Plan minimal menghubungkan...", ["Risiko, metrik, release, monitoring", "Logo dan font", "Avatar dan badge", "Cache browser saja"], 0, "Plan menyatukan evaluasi dan governance."],
        ["system-quality-evaluation-plan", "ISO/IEC 42001 paling dekat dengan...", ["AI management system", "Syntax CSS", "Prompt injection", "BLEU score"], 0, "ISO/IEC 42001 membahas sistem manajemen AI."],
        ["system-quality-evaluation-plan", "Monitoring pascadeploy perlu karena...", ["Input dan risiko berubah setelah sistem dipakai", "Agar warna berubah", "Supaya benchmark hilang", "Agar route tidak ada"], 0, "Evaluasi hidup sepanjang lifecycle."]
    ].map(function (item, index) {
        return { id: "q-" + (index + 1), module: item[0], question: item[1], options: item[2], answer: item[3], explanation: item[4], difficulty: index % 4 === 0 ? "analisis" : "penerapan", tag: item[0] };
    });

    var DISCUSSIONS = {
        "why-evaluate-ai": "Apakah sistem yang sering benar otomatis dapat dipercaya? Jelaskan bukti evaluasi apa yang kamu butuhkan.",
        "output-evaluation": "Mana yang lebih berbahaya: jawaban tidak relevan atau fakta palsu yang meyakinkan?",
        "benchmark-and-dataset": "Mengapa leaderboard tidak cukup untuk memutuskan deployment di konteks Indonesia?",
        "reliability-and-robustness": "Bagaimana sistem harus bersikap saat tidak yakin atau sumber tidak tersedia?",
        "bias-and-fairness": "Apakah fairness dapat diwakili satu angka? Kapan metrik perlu dibaca bersama contoh kasus?",
        "system-quality-evaluation-plan": "Siapa yang bertanggung jawab saat AI gagal di produksi, dan bagaimana incident seharusnya ditangani?"
    };

    function safeJsonParse(value, fallback) {
        if (!value) return fallback;
        try { return JSON.parse(value); } catch (error) { return fallback; }
    }

    function saveJson(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function escapeHtml(value) {
        return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function getState() {
        var parts = (window.location.hash || "#/participant-ai-evaluation").replace("#", "").split("?");
        var params = new URLSearchParams(parts[1] || "");
        var moduleSlug = params.get("module") || "";
        var activity = ACTIVITIES.indexOf(params.get("activity")) >= 0 ? params.get("activity") : "materi";
        var module = MODULES.find(function (item) { return item.slug === moduleSlug; });
        return { module: module || MODULES[0], activity: activity };
    }

    function href(moduleSlug, activity) {
        var params = new URLSearchParams();
        if (moduleSlug) params.set("module", moduleSlug);
        if (activity && activity !== "materi") params.set("activity", activity);
        var query = params.toString();
        return "#/participant-ai-evaluation" + (query ? "?" + query : "");
    }

    function progressData() {
        return {
            completed: safeJsonParse(localStorage.getItem(STORAGE.completedModules), []),
            practice: safeJsonParse(localStorage.getItem(STORAGE.practice), {}),
            quizDone: safeJsonParse(localStorage.getItem(STORAGE.quizDone), {}),
            discussion: safeJsonParse(localStorage.getItem(STORAGE.discussion), {})
        };
    }

    function moduleNumber(module) {
        return MODULES.findIndex(function (item) { return item.slug === module.slug; }) + 1;
    }

    function activityLabel(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    function renderDetail(root, module, activity) {
        var index = moduleNumber(module) - 1;
        var prev = MODULES[index - 1];
        var next = MODULES[index + 1];
        var data = progressData();
        var completeCount = data.completed.length;
        var percent = Math.round((completeCount / MODULES.length) * 100);
        var activityTitle = activity === "materi" ? "Evaluation AI" : activityLabel(activity) + " Evaluation AI";
        var activityCopy = activity === "materi"
            ? "Belajar membuktikan apakah output, model, dan sistem AI benar-benar layak digunakan melalui evaluasi yang terukur."
            : "Kerjakan activity Evaluation AI dengan pola yang sama: pahami konteks, jawab bertahap, lalu gunakan feedback untuk memperbaiki keputusan evaluasi.";
        root.innerHTML = `
            <div class="lesson-layout">
                <div class="lesson-main-content">
                    <section class="lesson-hero ${activity === "materi" ? "" : "compact"}">
                        <div class="lesson-hero-copy">
                            <h1>${escapeHtml(activityTitle)}</h1>
                            <p>${escapeHtml(activityCopy)}</p>
                            <div class="lesson-meta-row">
                                <span><i class="far fa-clock"></i> 195-240 menit</span>
                                <span><i class="fas fa-book-open"></i> Modul 5 dari 6</span>
                                <b>Final</b>
                            </div>
                        </div>
                        <img src="/assets/messaging/herai-chat-persona.png" alt="HerAI fellow belajar Evaluation AI">
                    </section>

                    <section class="lesson-material-panel">
                        <div class="lesson-tabs" role="tablist" aria-label="Activity Evaluation AI">
                        ${ACTIVITIES.map(function (item) {
                            var icon = item === "materi" ? "fa-book-open" : item === "latihan" ? "fa-pen-to-square" : item === "kuis" ? "fa-clipboard" : "fa-message";
                            return `<a class="${item === activity ? "active" : ""}" href="${href(module.slug, item)}"><i class="fas ${icon}"></i>${item.charAt(0).toUpperCase() + item.slice(1)}</a>`;
                        }).join("")}
                        </div>
                        <article class="lesson-article reasoning-scaffold-rich ai-evaluation-activity-wrap">
                            <section id="aiEvaluationActivity" class="ai-evaluation-activity"></section>
                        </article>
                        <footer class="lesson-nav-footer ai-evaluation-pager">
                        ${prev ? `<a href="${href(prev.slug, "materi")}"><i class="fas fa-arrow-left"></i> ${escapeHtml(prev.title)}</a>` : "<span></span>"}
                        ${next ? `<a href="${href(next.slug, "materi")}">${escapeHtml(next.title)} <i class="fas fa-arrow-right"></i></a>` : `<a href="${href(module.slug, "latihan")}">Lanjut latihan <i class="fas fa-arrow-right"></i></a>`}
                        </footer>
                    </section>
                </div>

                <aside class="lesson-right-panel">
                    <section class="module-side-card lesson-progress-card">
                        <h2>Progres Sub-Modul</h2>
                        <div class="lesson-progress-mini"><b style="--value:${percent}%"></b><strong>${percent}%</strong></div>
                        <p>${completeCount} dari ${MODULES.length} materi selesai</p>
                        <a href="${href(module.slug, activity)}">${activity === "materi" ? "Mulai Belajar" : "Lanjut Activity"}</a>
                    </section>
                    <section class="module-side-card lesson-list-card">
                        <h2>Daftar Materi</h2>
                        <ol>${MODULES.map(function (item, itemIndex) {
                            var done = data.completed.indexOf(item.slug) >= 0;
                            var icon = item.slug === module.slug ? "far fa-circle-play" : done ? "fas fa-circle-check" : "far fa-circle";
                            return `<li class="${item.slug === module.slug ? "active" : done ? "completed" : ""}"><span>${itemIndex + 1}</span><a href="${href(item.slug, "materi")}">${escapeHtml(item.title)}</a><i class="${icon}"></i></li>`;
                        }).join("")}</ol>
                    </section>
                    <section class="module-side-card lesson-note-card lesson-compact-note">
                        <div class="module-side-head"><h2>Catatan</h2><button type="button">+ Tambah</button></div>
                        <p>Catat metrik, risiko, benchmark, dan failure case yang kamu temukan.</p>
                    </section>
                </aside>
            </div>`;
        renderActivity(module, activity);
    }

    function renderActivity(module, activity) {
        if (activity === "latihan") return renderPractice(module);
        if (activity === "kuis") return renderQuiz(module);
        if (activity === "diskusi") return renderDiscussion(module);
        return renderMaterial(module);
    }

    function renderList(items) {
        if (!items || !items.length) return "";
        return '<ul class="reasoning-meta-list">' + items.map(function(item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul>';
    }

    function renderOrientationAndNav(module, chapterNum, total) {
        var objectivesHtml = (module.objectives || []).map(function(obj) {
            return '<li><span class="ai-modern-objective-copy">' + escapeHtml(obj) + '</span></li>';
        }).join("");
        
        var heroHtml = '<header class="lesson-topic-banner">' +
            '<h3><i class="' + escapeHtml(module.icon || 'fas fa-book-open') + '"></i> Topik ' + chapterNum + ': ' + escapeHtml(module.title) + '</h3>' +
            '<p>' + (module.summary ? 'Goal: ' + escapeHtml(module.summary) : '') + '</p>' +
        '</header>' + 
        (module.objectives && module.objectives.length ? '<div class="ai-modern-objectives" style="margin-bottom: 24px;"><strong>Tujuan pembelajaran</strong><ul>' + objectivesHtml + '</ul></div>' : '') +
        (typeof analogyHtml !== 'undefined' ? analogyHtml : '');

        var navHtml = '<nav class="reasoning-source-jumps reasoning-visual-nav ai-modern-learning-nav" data-evaluation-injected id="reasoning-visual-nav" aria-label="Tahapan Topik ' + chapterNum + ' dari ' + total + '">' +
            '<span><i class="' + escapeHtml(module.icon) + '"></i> Jelajahi:</span>' +
            '<button type="button" data-jump="hook">Pembuka</button>' +
            '<button type="button" data-jump="konsep">Konsep</button>' +
            '<button type="button" data-jump="check">Uji Pemahaman</button>' +
            '<button type="button" data-jump="ringkasan">Ringkasan</button>' +
        '</nav>';

        return heroHtml + '\n' + navHtml;
    }

    function renderHookSection(hook) {
        return '<section class="reasoning-hook-section" data-python-injected data-section="hook">\n' +
               '    <div class="reasoning-hook-head"><i class="fas fa-hand-pointer" aria-hidden="true"></i><div><span>Pembuka</span><h3>' + escapeHtml(hook.question) + '</h3></div></div>\n' +
               '    <div class="reasoning-hook-options">\n' +
               '        <button type="button" class="reasoning-hook-card" data-hook-option="a">\n' +
               '            <div class="reasoning-hook-card-icon"><i class="' + escapeHtml(hook.answerA.icon) + '" aria-hidden="true"></i></div>\n' +
               '            <div><strong>' + escapeHtml(hook.answerA.label) + '</strong><p>' + escapeHtml(hook.answerA.text) + '</p></div>\n' +
               '        </button>\n' +
               '        <button type="button" class="reasoning-hook-card" data-hook-option="b">\n' +
               '            <div class="reasoning-hook-card-icon"><i class="' + escapeHtml(hook.answerB.icon) + '" aria-hidden="true"></i></div>\n' +
               '            <div><strong>' + escapeHtml(hook.answerB.label) + '</strong><p>' + escapeHtml(hook.answerB.text) + '</p></div>\n' +
               '        </button>\n' +
               '    </div>\n' +
               '    <p class="reasoning-hook-message" hidden>' + escapeHtml(hook.message) + '</p>\n' +
               '</section>';
    }

    function renderQuickCheckSection(qc) {
        return '<section class="reasoning-quick-check reasoning-qc-enhanced" data-evaluation-injected data-section="check" data-check-answer="' + qc.answer + '" data-check-correct="' + escapeHtml(qc.explanationCorrect || "") + '" data-check-wrong="' + escapeHtml(qc.explanationWrong || "") + '"><div class="reasoning-quick-head"><i class="fas fa-circle-question" aria-hidden="true"></i><div><span>Quick Check</span><h3>' + escapeHtml(qc.question) + '</h3></div></div><div class="reasoning-check-options">' + qc.options.map(function (option, index) { return '<button type="button" data-check-option="' + index + '"><b>' + String.fromCharCode(65 + index) + '</b><span>' + escapeHtml(option) + '</span></button>'; }).join("") + '</div><div class="reasoning-check-actions"><button type="button" class="reasoning-scaffold-check-button" data-check-submit><i class="fas fa-check"></i> Periksa Jawaban</button><button type="button" class="reasoning-scaffold-reveal-button reasoning-check-retry" data-check-retry hidden><i class="fas fa-rotate-left"></i> Coba Lagi</button></div><p class="reasoning-check-feedback" aria-live="polite" hidden></p></section>';
    }

    function renderGlossarySection(glossary) {
        if (!glossary || glossary.length === 0) return "";
        return '<section class="reasoning-concept-card reasoning-scaffold-callout" data-section="konsep">\n' +
               '    <h3><i class="fas fa-book" aria-hidden="true"></i> Glosarium Cepat</h3>\n' +
               '    <ul>' + glossary.map(function(item) {
                    return '<li><strong>' + escapeHtml(item[0]) + ':</strong> ' + escapeHtml(item[1]) + '</li>';
                }).join("") + '</ul>\n' +
               '</section>';
    }

    function renderSummarySection(outcomes, transition, chapterNum, total) {
        var transHtml = transition ? '<div class="reasoning-transition"><i class="fas fa-arrow-right" aria-hidden="true"></i><p><strong>Selanjutnya:</strong> ' + escapeHtml(transition) + '</p></div>' : '';
        return '<section class="reasoning-summary-section" data-section="ringkasan">\n' +
               '    <div class="reasoning-summary-head"><i class="fas fa-bookmark" aria-hidden="true"></i><div><span>Ringkasan</span><h3>Setelah topik ini, kamu dapat:</h3></div></div>\n' +
               '    <ul class="reasoning-outcomes-list">' + outcomes.map(function (o) { return '<li><i class="fas fa-circle-check" aria-hidden="true"></i> ' + escapeHtml(o) + '</li>'; }).join("") + '</ul>\n' +
               '    ' + transHtml + '\n' +
               '</section>';
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

    function setupVisualNav(container) {
        container.querySelectorAll("[data-jump]").forEach(function (button) {
            button.addEventListener("click", function () {
                var section = container.querySelector('[data-section="' + button.dataset.jump + '"]');
                if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    }

    function renderMaterial(module) {
        var container = document.getElementById("aiEvaluationActivity");
        if (!container) return;
        container.innerHTML = '<div class="ai-evaluation-loading"><i class="fas fa-spinner fa-spin"></i><p>Memuat materi...</p></div>';
        fetch(BASE + "/chapters/" + module.chapter)
            .then(function (response) {
                if (!response.ok) throw new Error("Topik not found");
                return response.text();
            })
            .then(function (html) {
                var chapterNum = moduleNumber(module);
                var total = MODULES.length;

                var wrapper = document.createElement("div");
                wrapper.innerHTML = html;

                wrapper.querySelectorAll("table").forEach(function (t) {
                    if (!t.parentElement.classList.contains("reasoning-scaffold-table-wrap")) {
                        var w = document.createElement("div");
                        w.className = "reasoning-scaffold-table-wrap";
                        t.parentNode.insertBefore(w, t);
                        w.appendChild(t);
                    }
                });
                wrapper.querySelectorAll("blockquote").forEach(function (bq) {
                    bq.classList.add("reasoning-scaffold-callout");
                });

                var processedHtml = wrapper.innerHTML;

                if (module.hook) {
                    var hookHtml = renderHookSection(module.hook);
                    processedHtml = processedHtml.replace(/<\/header>/i, "</header>\n" + hookHtml);
                }

                var finalHtml = renderOrientationAndNav(module, chapterNum, total) +
                                processedHtml +
                                (module.quickCheck ? renderQuickCheckSection(module.quickCheck) : "") +
                                (module.glossary ? renderGlossarySection(module.glossary) : "") +
                                (module.learningOutcomes ? renderSummarySection(module.learningOutcomes, module.transition, chapterNum, total) : "") +
                                `<button type="button" class="ai-evaluation-complete" data-complete-module="${escapeHtml(module.slug)}"><i class="fas fa-circle-check"></i> Tandai materi selesai</button>`;

                container.innerHTML = finalHtml;
                var button = container.querySelector("[data-complete-module]");
                if (button) button.addEventListener("click", function () { markComplete(module.slug); });

                setupHookInteraction(container);
                setupQuickChecks(container);
                setupVisualNav(container);
            })
            .catch(function () {
                container.innerHTML = '<div class="ai-evaluation-error"><i class="fas fa-triangle-exclamation"></i><p>Materi gagal dimuat. Coba refresh halaman.</p></div>';
            });
    }

    function markComplete(slug) {
        var completed = safeJsonParse(localStorage.getItem(STORAGE.completedModules), []);
        if (completed.indexOf(slug) < 0) completed.push(slug);
        saveJson(STORAGE.completedModules, completed);
        localStorage.setItem(STORAGE.currentModule, slug);
        render();
    }

    function renderPractice(module) {
        var container = document.getElementById("aiEvaluationActivity");
        var saved = getSaved();
        var items = EXERCISES.filter(function (item) { return item.module === module.slug; });
        var parts = [
            '<header class="ai-modern-chapter-hero" data-evaluation-injected>',
            '    <span>Latihan & Kasus</span>',
            '    <h2>' + escapeHtml(module.title) + '</h2>',
            '    <p>Terapkan pemahaman evaluasi pada skenario nyata.</p>',
            '</header>',
            '<div class="reasoning-challenge-workspace" style="margin-bottom:20px;">'
        ];
        parts.push(items.map(function (item) {
                return `<article>
                    <span>${escapeHtml(item.title)}</span>
                    <p><strong>Skenario:</strong> ${escapeHtml(item.scenario)}</p>
                    <label for="${item.id}">${escapeHtml(item.instruction)}</label>
                    <textarea id="${item.id}" name="${item.id}" rows="5">${escapeHtml(saved[item.id] || "")}</textarea>
                    <div class="ai-evaluation-feedback" data-feedback="${item.id}" hidden><strong>Model feedback:</strong> ${escapeHtml(item.modelAnswer)}</div>
                </article>`;
            }).join(""));
        parts.push('</div>');
        container.innerHTML = '<form class="ai-evaluation-practice" id="aiEvaluationPracticeForm">' + parts.join("") +
            '<div class="ai-evaluation-actions"><button type="submit"><i class="fas fa-floppy-disk"></i> Simpan latihan</button><span id="aiEvaluationPracticeStatus" aria-live="polite"></span></div></form>';
        var form = document.getElementById("aiEvaluationPracticeForm");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var data = safeJsonParse(localStorage.getItem(STORAGE.practice), {});
            items.forEach(function (item) {
                var field = form.elements[item.id];
                data[item.id] = field ? field.value.trim() : "";
                var feedback = form.querySelector('[data-feedback="' + item.id + '"]');
                if (feedback) feedback.hidden = !data[item.id];
            });
            saveJson(STORAGE.practice, data);
            document.getElementById("aiEvaluationPracticeStatus").textContent = "Latihan tersimpan di browser ini.";
        });
    }

    function renderQuiz(module) {
        var container = document.getElementById("aiEvaluationActivity");
        var saved = getSaved();
        var questions = QUIZ.filter(function (item) { return item.module === module.slug; });
        var doneMap = safeJsonParse(localStorage.getItem(STORAGE.quizDone), {});
        var answerMap = safeJsonParse(localStorage.getItem(STORAGE.quizAnswers), {});
        var isDone = !!doneMap[module.slug];
        var header = '<header class="ai-modern-chapter-hero" data-evaluation-injected>' +
            '    <span>Kuis Modul</span>' +
            '    <h2>' + escapeHtml(module.title) + '</h2>' +
            '    <p>Uji pemahaman tentang metrik, reliabilitas, dan bias dalam evaluasi AI.</p>' +
            '</header>';
        container.innerHTML = header + `<form class="ai-evaluation-quiz ${isDone ? "is-locked" : ""}" id="aiEvaluationQuizForm">
            <p>Passing score ${PASSING_SCORE}%. ${isDone ? "Attempt module ini sudah terkunci." : "Pilih satu jawaban terbaik untuk tiap soal."}</p>
            ${questions.map(function (q, index) {
                return `<fieldset>
                    <legend>${index + 1}. ${escapeHtml(q.question)}</legend>
                    ${q.options.map(function (option, optionIndex) {
                        var checked = answerMap[q.id] === optionIndex;
                        return `<label class="${checked ? "selected" : ""}"><input type="radio" name="${q.id}" value="${optionIndex}" ${checked ? "checked" : ""} ${isDone ? "disabled" : ""}><span>${escapeHtml(option)}</span></label>`;
                    }).join("")}
                    <p class="ai-evaluation-explanation" ${isDone ? "" : "hidden"}>${escapeHtml(q.explanation)}</p>
                </fieldset>`;
            }).join("")}
            <div class="ai-evaluation-actions"><button type="submit" ${isDone ? "disabled" : ""}><i class="fas fa-circle-check"></i> Submit kuis</button><span id="aiEvaluationQuizResult" aria-live="polite"></span></div>
        </form>`;
        if (isDone) showQuizResult(module.slug, questions);
        var form = document.getElementById("aiEvaluationQuizForm");
        form.addEventListener("change", function (event) {
            var label = event.target.closest("label");
            if (!label) return;
            label.parentElement.querySelectorAll("label").forEach(function (item) { item.classList.remove("selected"); });
            label.classList.add("selected");
        });
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var answers = safeJsonParse(localStorage.getItem(STORAGE.quizAnswers), {});
            var allAnswered = questions.every(function (q) {
                var checked = form.querySelector('input[name="' + q.id + '"]:checked');
                if (checked) answers[q.id] = Number(checked.value);
                return !!checked;
            });
            if (!allAnswered) {
                document.getElementById("aiEvaluationQuizResult").textContent = "Jawab semua soal terlebih dahulu.";
                return;
            }
            answerMap = answers;
            doneMap[module.slug] = true;
            saveJson(STORAGE.quizAnswers, answers);
            saveJson(STORAGE.quizDone, doneMap);
            showQuizResult(module.slug, questions);
            form.querySelectorAll("input, button[type='submit']").forEach(function (item) { item.disabled = true; });
            form.querySelectorAll(".ai-evaluation-explanation").forEach(function (item) { item.hidden = false; });
        });
    }

    function showQuizResult(moduleSlug, questions) {
        var answers = safeJsonParse(localStorage.getItem(STORAGE.quizAnswers), {});
        var score = questions.reduce(function (total, q) { return total + (answers[q.id] === q.answer ? 1 : 0); }, 0);
        var percent = Math.round((score / questions.length) * 100);
        var scores = safeJsonParse(localStorage.getItem(STORAGE.quizScore), {});
        scores[moduleSlug] = percent;
        saveJson(STORAGE.quizScore, scores);
        var result = document.getElementById("aiEvaluationQuizResult");
        if (result) result.textContent = "Skor: " + score + "/" + questions.length + " (" + percent + "%). " + (percent >= PASSING_SCORE ? "Lulus checkpoint." : "Review materi lalu diskusikan bagian yang belum kuat.");
    }

    function renderDiscussion(module) {
        var container = document.getElementById("aiEvaluationActivity");
        var saved = getSaved();
        container.innerHTML = '<header class="ai-modern-chapter-hero" data-evaluation-injected>\n' +
               '    <span>Diskusi Reflektif</span>\n' +
               '    <h2>' + escapeHtml(module.title) + '</h2>\n' +
               '    <p>Refleksikan dilema evaluasi dan tradeoff antara metrik teknis dengan fairness di dunia nyata.</p>\n' +
               '</header>\n' +
               '<form class="ai-evaluation-discussion" id="aiEvaluationDiscussionForm">' +
            '<p>' + escapeHtml(DISCUSSIONS[module.slug]) + '</p>' +
            '<label for="evaluationReflection">Tulis refleksimu</label>' +
            '<textarea id="evaluationReflection" rows="7">' + escapeHtml(saved[module.slug] || "") + '</textarea>' +
            '<div class="ai-evaluation-actions"><button type="submit"><i class="fas fa-floppy-disk"></i> Simpan refleksi</button><span id="aiEvaluationDiscussionStatus" aria-live="polite"></span></div>' +
        '</form>';
        document.getElementById("aiEvaluationDiscussionForm").addEventListener("submit", function (event) {
            event.preventDefault();
            saved[module.slug] = document.getElementById("evaluationReflection").value.trim();
            saveJson(STORAGE.discussion, saved);
            document.getElementById("aiEvaluationDiscussionStatus").textContent = "Refleksi tersimpan di browser ini.";
        });
    }

    function render() {
        var root = document.getElementById("aiEvaluationApp");
        if (!root) return;
        var state = getState();
        localStorage.setItem(STORAGE.currentModule, state.module.slug);
        renderDetail(root, state.module, state.activity);
    }

    window.initAiEvaluation = function () {
        var root = document.getElementById("aiEvaluationApp");
        if (!root) return;
        if (window.__aiEvaluationHashHandler) {
            window.removeEventListener("hashchange", window.__aiEvaluationHashHandler);
        }
        window.__aiEvaluationHashHandler = function () {
            if ((window.location.hash || "").indexOf("#/participant-ai-evaluation") === 0) render();
        };
        window.addEventListener("hashchange", window.__aiEvaluationHashHandler);
        render();
    };
})();
