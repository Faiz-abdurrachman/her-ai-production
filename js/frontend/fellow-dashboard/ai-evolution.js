(function () {
    var BASE = "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai";
    var ACTIVITIES = ["materi", "latihan", "kuis", "diskusi"];
    var PASSING_SCORE = 75;
    var STORAGE = {
        currentModule: "heraiAiEvolutionCurrentModule",
        completedModules: "heraiAiEvolutionCompletedModules",
        practice: "heraiAiEvolutionPractice",
        quizDone: "heraiAiEvolutionQuizDone",
        quizScore: "heraiAiEvolutionQuizScore",
        quizAnswers: "heraiAiEvolutionQuizAnswers",
        discussion: "heraiAiEvolutionDiscussion"
    };

    var MODULES = [
        { slug: "reading-ai-evolution", title: "Membaca Evolusi AI", shortTitle: "Evolusi", summary: "Membaca AI sebagai akumulasi paradigma: aturan, data, reward, generasi, dan sistem hybrid.", chapter: "chapter-1.html", duration: "30 menit", icon: "fas fa-book-open-reader",
          objectives: ["Mengidentifikasi perubahan paradigma AI dari waktu ke waktu.", "Memahami bahwa AI adalah akumulasi metode."],
          hook: { question: "Menurutmu, apa pendorong utama revolusi AI belakangan ini?", answerA: { label: "Hardware & Data", text: "GPU kuat dan data berlimpah", icon: "fas fa-microchip" }, answerB: { label: "Algoritma Baru", text: "Ditemukannya metode baru", icon: "fas fa-brain" }, message: "Hardware dan data adalah katalis utama! Kebanyakan algoritma sudah ada sejak lama." },
          glossary: [["Paradigma", "Cara pandang atau model penyelesaian masalah tertentu."], ["Milestone", "Pencapaian penting yang menandai era baru."]],
          quickCheck: { question: "Paradigma AI baru biasanya langsung menghapus paradigma lama secara total. Benar atau salah?", options: ["Benar", "Salah"], answer: 1, explanationCorrect: "Benar! Paradigma lama seringkali bertahan untuk use-case spesifik.", explanationWrong: "Sebenarnya, paradigma lama sering bertahan untuk kontrol ketat." },
          learningOutcomes: ["Mengetahui sejarah singkat perkembangan AI.", "Menyadari bahwa sistem AI modern seringkali bersifat hybrid."],
          transition: "Setelah memahami gambaran besarnya, mari selami paradigma awal yang banyak bergantung pada logika: Symbolic AI." },
        { slug: "symbolic-ai", title: "Symbolic AI dan Expert Systems", shortTitle: "Symbolic AI", summary: "Fakta, aturan, inference engine, expert system, explanation trace, dan safety layer modern.", chapter: "chapter-2.html", duration: "35 menit", icon: "fas fa-gavel",
          objectives: ["Memahami konsep dasar Symbolic AI dan Expert Systems.", "Mengetahui kapan harus menggunakan aturan eksplisit."],
          hook: { question: "Jika kamu membuat AI untuk mendiagnosis pasien berdasarkan standar rumah sakit, apa pendekatanmu?", answerA: { label: "Aturan Pasti", text: "Pohon keputusan (IF/THEN)", icon: "fas fa-code-branch" }, answerB: { label: "Tebakan AI", text: "Belajar sendiri dari data", icon: "fas fa-robot" }, message: "Untuk standar medis yang baku, pendekatan berbasis aturan (Symbolic AI) seringkali lebih aman dan dapat dijelaskan!" },
          glossary: [["Inference Engine", "Komponen yang menerapkan aturan logika pada sekumpulan fakta."], ["Explanation Trace", "Jejak yang menunjukkan bagaimana sistem mengambil keputusan."]],
          quickCheck: { question: "Kelemahan utama dari Expert System tradisional adalah...", options: ["Sulit dirawat ketika domain berubah (Knowledge acquisition bottleneck)", "Hanya bisa dijalankan di superkomputer"], answer: 0, explanationCorrect: "Tepat sekali! Menulis ribuan aturan secara manual sangat merepotkan.", explanationWrong: "Bukan. Expert systems justru sangat hemat komputasi." },
          learningOutcomes: ["Mampu merancang aturan dasar IF/THEN.", "Mengerti pentingnya explanation trace untuk audit."],
          transition: "Lalu bagaimana jika aturannya terlalu rumit untuk ditulis manual? Di sinilah kita butuh Machine Learning." },
        { slug: "learning-from-data", title: "Machine Learning: Belajar dari Data", shortTitle: "Machine Learning", summary: "Supervised, unsupervised, feature, label, loss, embedding, overfitting, dan generalization.", chapter: "chapter-3.html", duration: "40 menit", icon: "fas fa-database",
          objectives: ["Membedakan supervised dan unsupervised learning.", "Memahami konsep overfitting dan generalization."],
          hook: { question: "Kamu punya ribuan foto kucing dan anjing tanpa label. Apa pendekatan awalmu?", answerA: { label: "Supervised Learning", text: "Menyiapkan label dulu", icon: "fas fa-tags" }, answerB: { label: "Unsupervised Learning", text: "Membiarkan AI mencari pola", icon: "fas fa-project-diagram" }, message: "Karena belum ada label, Unsupervised Learning (seperti clustering) adalah langkah awal yang cerdas!" },
          glossary: [["Overfitting", "Kondisi model menghafal data training tapi gagal pada data baru."], ["Feature", "Sinyal input yang digunakan model untuk belajar."]],
          quickCheck: { question: "Akurasi training 99%, tetapi akurasi pada data baru hanya 50%. Ini disebut...", options: ["Overfitting", "Underfitting"], answer: 0, explanationCorrect: "Benar. Modelmu 'menghafal' jawaban, bukan 'memahami' pola.", explanationWrong: "Ini disebut Overfitting." },
          learningOutcomes: ["Dapat menentukan feature dan label.", "Memilih algoritma yang tepat berdasarkan label data."],
          transition: "Bagaimana jika AI harus mengambil serangkaian keputusan beruntun? Jawabannya ada di Reinforcement Learning." },
        { slug: "reinforcement-learning", title: "Reinforcement Learning", shortTitle: "RL", summary: "Agent, environment, state, action, reward, policy, exploration, exploitation, Q-learning, dan DQN.", chapter: "chapter-4.html", duration: "35 menit", icon: "fas fa-gamepad",
          objectives: ["Memahami elemen RL: Agent, Environment, State, Action, Reward.", "Mengerti konsep exploration vs exploitation."],
          hook: { question: "Bagaimana cara terbaik mengajari AI bermain catur?", answerA: { label: "Contoh", text: "Memberi jutaan data pertandingan", icon: "fas fa-book" }, answerB: { label: "Trial & Error", text: "Bermain sendiri dan diberi skor", icon: "fas fa-gamepad" }, message: "Pendekatan Trial & Error (RL) terbukti ampuh untuk game!" },
          glossary: [["Reward Hacking", "AI menemukan celah untuk mendapat reward tanpa menyelesaikan tugas."], ["Policy", "Strategi agent memilih action di suatu state."]],
          quickCheck: { question: "Jika agent RL selalu memilih aksi yang pernah memberinya reward tertinggi tanpa mau mencoba aksi lain, ia terjebak dalam...", options: ["Exploration", "Exploitation"], answer: 1, explanationCorrect: "Benar! Terlalu banyak exploitation membuat agent kurang inovatif.", explanationWrong: "Salah. Ini disebut Exploitation." },
          learningOutcomes: ["Mampu merancang sistem reward yang aman.", "Mengetahui penyebab agent gagal belajar (seperti reward hacking)."],
          transition: "Setelah menguasai pengenalan pola, mari kita lihat AI yang bisa menciptakan data baru (Generative Models)." },
        { slug: "vae-and-gan", title: "Autoencoder, VAE, dan GAN", shortTitle: "Generative I", summary: "Encoder, decoder, latent space, generator, discriminator, dan trade-off model generatif awal.", chapter: "chapter-5.html", duration: "35 menit", icon: "fas fa-wand-magic-sparkles",
          objectives: ["Memahami arsitektur Autoencoder, VAE, dan GAN.", "Mengetahui trade-off VAE dan GAN dalam kualitas generasi."],
          hook: { question: "Saat membuat generator wajah, apa tantangan terbesarnya?", answerA: { label: "Ketajaman", text: "Membuat gambar tidak blur", icon: "fas fa-image" }, answerB: { label: "Variasi", text: "Memastikan wajah yang dihasilkan beragam", icon: "fas fa-users" }, message: "Keduanya! GAN biasanya tajam tapi variasi sedikit (mode collapse), sementara VAE beragam tapi cenderung blur." },
          glossary: [["Latent Space", "Representasi matematis padat dari data."], ["Discriminator", "Komponen GAN pendeteksi gambar palsu."]],
          quickCheck: { question: "Dalam GAN, apa tujuan utama dari Generator?", options: ["Mengelompokkan data", "Mengecoh Discriminator agar mengira datanya asli"], answer: 1, explanationCorrect: "Tepat! Generator dan Discriminator bermain untuk saling mengalahkan.", explanationWrong: "Itu Autoencoder. Generator menipu discriminator." },
          learningOutcomes: ["Membandingkan cara kerja VAE dan GAN.", "Memahami mode collapse pada GAN."],
          transition: "GAN punya masalah stabilitas. Itulah mengapa model berbasis Diffusion muncul." },
        { slug: "diffusion-models", title: "Diffusion Models", shortTitle: "Diffusion", summary: "Noise, denoising, inference steps, kualitas generasi, dan biaya compute.", chapter: "chapter-6.html", duration: "35 menit", icon: "fas fa-cloud",
          objectives: ["Mempelajari konsep penambahan noise (forward) dan denoising (reverse).", "Mengevaluasi trade-off antara kualitas dan inference steps."],
          hook: { question: "Apa ide dasar dari Diffusion Models dalam membuat gambar?", answerA: { label: "Menyusun Pixel", text: "Mewarnai pixel dari nol", icon: "fas fa-paint-brush" }, answerB: { label: "Mengukir Noise", text: "Memulai dari noise dan membersihkannya bertahap", icon: "fas fa-eraser" }, message: "Diffusion bekerja bagaikan pemahat: memulai dari noise kasar lalu 'mengikisnya' (denoising)!" },
          glossary: [["Inference Steps", "Jumlah iterasi denoising yang dilakukan untuk menghasilkan gambar."], ["Denoising", "Proses menghilangkan noise dari gambar."]],
          quickCheck: { question: "Jika kamu mengurangi jumlah 'inference steps' drastis saat menggunakan diffusion model, apa dampaknya?", options: ["Gambar lebih cepat dibuat, tapi kualitas turun", "Gambar makin detail tapi lambat"], answer: 0, explanationCorrect: "Benar. Trade-off utamanya antara waktu komputasi (latency) dan kualitas generasi.", explanationWrong: "Kebalikannya." },
          learningOutcomes: ["Memahami alur generasi gambar via diffusion.", "Mengambil keputusan produk terkait latency vs quality."],
          transition: "Terakhir, mari pelajari bintang utama AI saat ini: Transformer dan LLM." },
        { slug: "transformer-llm-hybrid-ai", title: "Transformer, LLM, dan Hybrid AI", shortTitle: "Transformer & Hybrid", summary: "Attention, LLM, RAG, tools, guardrail, dan sistem AI hybrid untuk produk nyata.", chapter: "chapter-7.html", duration: "45 menit", icon: "fas fa-robot",
          objectives: ["Memahami arsitektur Transformer (Attention).", "Merancang sistem AI Hybrid (LLM + RAG + Rules)."],
          hook: { question: "Jika kamu membuat chatbot dengan LLM, perlukah komponen lain?", answerA: { label: "Perlu", text: "Butuh RAG dan Guardrails", icon: "fas fa-shield-halved" }, answerB: { label: "Tidak", text: "Cukup LLM saja dengan prompt yang bagus", icon: "fas fa-robot" }, message: "Sangat Perlu! LLM murni bisa berhalusinasi. Sistem AI produksi hampir selalu berupa Hybrid AI." },
          glossary: [["Attention", "Mekanisme model untuk fokus pada konteks teks tertentu."], ["RAG", "Teknik menyuapi LLM dengan dokumen relevan sebelum menjawab."]],
          quickCheck: { question: "Apa solusi terbaik mengurangi risiko LLM berhalusinasi?", options: ["Memberi prompt khusus", "Menggunakan RAG"], answer: 1, explanationCorrect: "Tepat. RAG memaksa LLM mendasarkan jawaban pada dokumen sumber.", explanationWrong: "Prompt saja tidak cukup kuat mencegah halusinasi. Butuh RAG." },
          learningOutcomes: ["Mengidentifikasi kapan harus menggunakan sistem Hybrid.", "Merancang komponen RAG dan guardrail sederhana."],
          transition: "Selesai! Kamu sekarang memahami seluruh paradigma penting evolusi AI." }
    ];

    var EXERCISES = [
        ["reading-ai-evolution", "Memasangkan milestone dengan paradigma", "Tim onboarding melihat daftar Logic Theorist, Perceptron, Q-learning, GAN, DDPM, dan Transformer.", "Kelompokkan milestone ke paradigma: symbolic, machine learning, reinforcement learning, generative modeling, atau LLM.", "Milestone harus dibaca dari perubahan cara representasi dan sinyal belajar, bukan hafalan tahun.", "matching"],
        ["reading-ai-evolution", "Paradigma baru tidak selalu menghapus yang lama", "Sebuah chatbot memakai LLM tetapi tetap butuh SOP program.", "Jelaskan dua alasan mengapa aturan eksplisit tetap berguna.", "Aturan membantu audit, kebijakan deterministik, dan batas keselamatan yang tidak boleh dinegosiasikan.", "short"],
        ["symbolic-ai", "Menelusuri rule engine", "Rule engine mengarah ke billing refund jika payment_failed dan refund_requested aktif.", "Tuliskan fakta aktif, aturan yang cocok, kesimpulan, dan explanation trace.", "Trace penting agar keputusan bisa dijelaskan dan diaudit.", "trace"],
        ["symbolic-ai", "Menyusun aturan triase tiket", "Peserta mengirim tiket login gagal, pembayaran gagal, atau meminta sertifikat.", "Buat minimal tiga aturan IF/AND/THEN untuk triase.", "Aturan yang baik spesifik, mudah dirawat, dan punya fallback saat fakta tidak lengkap.", "rule"],
        ["learning-from-data", "Menentukan feature dan label", "Tim ingin memprediksi peserta berisiko terlambat mengumpulkan tugas.", "Tentukan contoh feature, label, dan risiko label bias.", "Feature adalah sinyal input; label adalah target. Label historis bisa memuat bias proses lama.", "classification"],
        ["learning-from-data", "Memilih supervised atau unsupervised", "Ada data tiket tanpa label kategori, tetapi tim ingin menemukan tema umum.", "Pilih supervised atau unsupervised dan jelaskan alasannya.", "Tanpa label, clustering atau embedding exploration lebih masuk akal sebagai langkah awal.", "classification"],
        ["learning-from-data", "Menganalisis overfitting", "Akurasi training 99%, validation 62%, dan hasil peserta baru buruk.", "Jelaskan masalah yang paling mungkin dan dua mitigasi.", "Ini sinyal overfitting; mitigasi dapat berupa data validasi lebih baik, regularisasi, fitur lebih relevan, atau model lebih sederhana.", "case"],
        ["reinforcement-learning", "Mengidentifikasi agent, state, action, reward", "Sistem rekomendasi belajar adaptif memilih materi berikutnya untuk peserta.", "Tentukan agent, state, action, reward, dan risiko reward hacking.", "Reward harus mewakili belajar nyata, bukan sekadar klik atau waktu layar.", "builder"],
        ["reinforcement-learning", "Exploration vs exploitation", "Agent selalu memilih materi yang historis paling sering diklik.", "Jelaskan konsep yang tidak seimbang dan dampaknya.", "Agent terlalu exploitative; eksplorasi diperlukan agar sistem menemukan opsi baru yang mungkin lebih baik.", "case"],
        ["vae-and-gan", "Encoder, decoder, generator, discriminator", "Tim membandingkan autoencoder, VAE, dan GAN untuk demo generatif.", "Identifikasi komponen yang muncul pada tiap model.", "Autoencoder/VAE memakai encoder-decoder; GAN memakai generator-discriminator.", "matching"],
        ["vae-and-gan", "Memilih VAE atau GAN", "Tim membutuhkan latent space terstruktur untuk eksplorasi variasi desain.", "Pilih VAE atau GAN dan jelaskan trade-off.", "VAE lebih cocok untuk latent space terstruktur; GAN dapat menghasilkan sampel tajam tetapi training bisa lebih sulit.", "decision"],
        ["diffusion-models", "Mengurutkan proses diffusion", "Peserta harus menjelaskan generasi gambar tanpa rumus.", "Urutkan: tambah noise, belajar denoise, mulai dari noise, denoise bertahap, hasil sampel.", "Urutan inti diffusion adalah forward noising saat training dan reverse denoising saat generasi.", "sequencing"],
        ["diffusion-models", "Trade-off inference steps", "Aplikasi perlu membuat preview visual cepat saat user mengetik prompt.", "Analisis dampak mengurangi jumlah denoising steps.", "Steps lebih sedikit dapat menurunkan latency, tetapi kualitas atau detail bisa turun.", "case"],
        ["transformer-llm-hybrid-ai", "Mengidentifikasi komponen LLM", "Asisten fellowship memakai dokumen program, LLM, rule policy, dan logging.", "Tentukan mana retrieval, LLM, rule-based guardrail, dan observability.", "Hybrid AI membagi tugas: retrieval memberi sumber, LLM merangkai, rules menjaga kebijakan, logging mendukung audit.", "architecture"],
        ["transformer-llm-hybrid-ai", "Menemukan keterbatasan LLM", "LLM menjawab percaya diri untuk aturan program yang tidak ada di dokumen.", "Sebutkan keterbatasan dan mitigasi produk.", "Masalahnya hallucination atau grounding lemah; mitigasi: RAG, abstain behavior, rule checks, dan human escalation.", "case"],
        ["transformer-llm-hybrid-ai", "Merancang sistem hybrid", "HerAI ingin asisten yang menjawab fleksibel tetapi patuh kebijakan program.", "Rancang arsitektur komponen dari user input sampai jawaban final.", "Arsitektur kuat menggabungkan policy engine, retrieval, LLM, validator, logging, dan human review untuk kasus sensitif.", "architecture"]
    ].map(function (item, index) {
        return { id: "evo-ex-" + (index + 1), module: item[0], title: item[1], scenario: item[2], instruction: item[3], modelAnswer: item[4], type: item[5] };
    });

    var QUIZ = [
        ["reading-ai-evolution", "Mengapa paradigma baru tidak selalu menghapus paradigma lama?", ["Karena semua paradigma punya use case, kontrol, dan trade-off berbeda", "Karena teknologi lama selalu lebih akurat", "Karena LLM tidak bisa dipakai", "Karena data tidak pernah penting"], 0, "Paradigma lama tetap berguna ketika kebutuhan audit, kontrol, atau struktur eksplisit lebih penting.", "pemahaman"],
        ["reading-ai-evolution", "Sebuah sistem memakai aturan SOP, embedding search, dan LLM. Cara membaca evolusinya adalah...", ["Hybrid AI yang menggabungkan paradigma", "Pure symbolic AI", "Hanya supervised learning", "Hanya reinforcement learning"], 0, "Sistem modern sering menggabungkan representasi dan kontrol berbeda.", "penerapan"],
        ["reading-ai-evolution", "Ketika membaca timeline AI, fokus terbaik adalah...", ["Tahun yang harus dihafalkan", "Perubahan masalah, pendekatan, dan pengaruhnya", "Jumlah parameter setiap model", "Nama vendor paling populer"], 1, "Timeline berguna jika membantu membaca perubahan kemampuan.", "analisis"],
        ["symbolic-ai", "Organisasi harus mengikuti aturan hukum deterministik dan dapat diaudit. Lapisan apa yang paling tepat?", ["Rule-based policy layer", "GAN", "Diffusion sampler", "Embedding saja"], 0, "Aturan eksplisit cocok untuk keputusan yang wajib dapat diaudit.", "penerapan"],
        ["symbolic-ai", "Forward chaining berarti...", ["Berangkat dari fakta menuju kesimpulan", "Berangkat dari gambar menuju noise", "Berangkat dari label menuju embedding", "Berangkat dari reward menuju prompt"], 0, "Forward chaining menerapkan aturan pada fakta aktif.", "pemahaman"],
        ["symbolic-ai", "Keterbatasan expert system yang paling umum adalah...", ["Butuh knowledge engineering dan sulit menangani pengecualian luas", "Tidak bisa menjelaskan keputusan", "Selalu membutuhkan GPU besar", "Tidak bisa memakai aturan"], 0, "Expert system kuat tapi perawatannya mahal saat domain berubah.", "analisis"],
        ["learning-from-data", "Model sangat bagus pada training tetapi buruk pada data baru. Masalah paling mungkin?", ["Overfitting", "Forward chaining", "Diffusion", "Context window"], 0, "Overfitting terjadi saat model terlalu cocok pada data training.", "penerapan"],
        ["learning-from-data", "Data tiket belum punya label, tetapi tim ingin menemukan kelompok tema. Pendekatan awal yang cocok?", ["Unsupervised learning", "Backward chaining", "Single rule", "Self-play"], 0, "Clustering atau embedding exploration cocok saat label belum ada.", "penerapan"],
        ["learning-from-data", "Label historis perlu diaudit karena...", ["Label dapat memuat bias proses lama", "Label selalu salah", "Label tidak dipakai model", "Label menghapus fitur"], 0, "Label sering merefleksikan keputusan manusia atau institusi sebelumnya.", "analisis"],
        ["reinforcement-learning", "Agent hanya memilih tindakan yang pernah memberi reward tertinggi dan tidak mencoba opsi baru. Konsep yang bermasalah?", ["Exploration vs exploitation", "Latent regularization", "Backward chaining", "Denoising"], 0, "Agent terlalu exploitative dan kurang eksplorasi.", "penerapan"],
        ["reinforcement-learning", "Dalam RL, reward sebaiknya...", ["Mewakili tujuan jangka panjang yang benar", "Selalu berupa klik", "Tidak pernah berubah", "Dihapus setelah training"], 0, "Reward salah dapat membuat perilaku yang tampak optimal tetapi buruk bagi manusia.", "analisis"],
        ["reinforcement-learning", "Q-value secara konseptual adalah...", ["Perkiraan nilai action pada state", "Jumlah token prompt", "Kualitas gambar", "Aturan IF/THEN"], 0, "Q-value membantu agent memilih tindakan berdasarkan nilai yang diperkirakan.", "pemahaman"],
        ["vae-and-gan", "Tim membutuhkan latent space terstruktur. Model mana yang paling masuk akal?", ["VAE", "Rule engine", "DQN", "Pure prompt"], 0, "VAE mendorong latent space lebih teratur dan dapat disampling.", "penerapan"],
        ["vae-and-gan", "GAN terdiri dari...", ["Generator dan discriminator", "Agent dan environment", "Facts dan rules", "Query dan context window"], 0, "GAN melatih generator melawan discriminator.", "pemahaman"],
        ["vae-and-gan", "Sampel terlihat tajam tetapi mode variasinya sedikit. Risiko yang mungkin?", ["Mode collapse", "Forward chaining", "Reward hacking", "Data leakage router"], 0, "Mode collapse dapat membuat generator menghasilkan variasi terbatas.", "analisis"],
        ["diffusion-models", "Inti generasi diffusion adalah...", ["Mulai dari noise lalu denoise bertahap", "Menulis aturan IF/THEN", "Mencari reward tertinggi saja", "Menghapus context window"], 0, "Diffusion menjalankan reverse denoising saat generasi.", "pemahaman"],
        ["diffusion-models", "Mengurangi inference steps biasanya berdampak pada...", ["Latency turun tetapi kualitas bisa turun", "Audit trail otomatis muncul", "Model menjadi symbolic", "Reward menjadi sempurna"], 0, "Fewer steps mempercepat generasi, tetapi trade-off kualitas perlu diuji.", "penerapan"],
        ["diffusion-models", "Kualitas visual tinggi belum cukup karena...", ["Factuality, bias, hak penggunaan, dan konteks tetap perlu diperiksa", "Gambar selalu salah", "Diffusion tidak bisa dipakai", "Compute tidak penting"], 0, "Output generatif tetap perlu evaluasi produk dan risiko.", "analisis"],
        ["transformer-llm-hybrid-ai", "Aplikasi butuh jawaban fleksibel tetapi harus patuh kebijakan pasti. Arsitektur paling tepat?", ["Hybrid: rules, retrieval, LLM, validator", "LLM tanpa sumber", "GAN saja", "K-means saja"], 0, "Hybrid menggabungkan fleksibilitas LLM dan kontrol eksplisit.", "penerapan"],
        ["transformer-llm-hybrid-ai", "RAG membantu LLM dengan...", ["Mengambil dokumen relevan sebagai konteks", "Menghilangkan semua hallucination secara pasti", "Mengubah reward", "Mengganti semua aturan"], 0, "RAG memberi grounding, tetapi tetap perlu evaluasi dan guardrail.", "pemahaman"],
        ["transformer-llm-hybrid-ai", "LLM menjawab aturan yang tidak ada di dokumen. Mitigasi paling tepat?", ["Grounding, abstain behavior, rule checks, dan eskalasi manusia", "Menambah warna UI", "Menghapus retrieval", "Menambah inference steps diffusion"], 0, "Masalah grounding perlu mitigasi sistem, bukan sekadar prompt.", "analisis"]
    ].map(function (item, index) {
        return { id: "evo-q-" + (index + 1), module: item[0], question: item[1], options: item[2], answer: item[3], explanation: item[4], difficulty: item[5], tag: item[0] };
    });

    var DISCUSSIONS = {
        "reading-ai-evolution": "Apakah teknologi AI baru selalu membuat pendekatan lama tidak berguna? Beri satu contoh produk.",
        "symbolic-ai": "Kapan aturan eksplisit lebih tepat daripada model statistik pada sistem peserta fellowship?",
        "learning-from-data": "Apakah data dapat menggantikan pengetahuan manusia sepenuhnya? Kapan human review tetap perlu?",
        "reinforcement-learning": "Apa risiko ketika reward tidak mewakili tujuan manusia?",
        "vae-and-gan": "Mengapa kualitas sampel tinggi belum tentu berarti model mudah dikontrol?",
        "diffusion-models": "Bagaimana menyeimbangkan kualitas generasi dan biaya compute dalam produk nyata?",
        "transformer-llm-hybrid-ai": "Mengapa sistem AI modern sering membutuhkan lebih dari satu model atau satu paradigma?"
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
        var parts = (window.location.hash || "#/participant-ai-evolution").replace("#", "").split("?");
        var params = new URLSearchParams(parts[1] || "");
        var moduleSlug = params.get("module") || "";
        var activityParam = params.get("activity");
        var activity = ACTIVITIES.indexOf(activityParam) >= 0 ? activityParam : "materi";
        var module = MODULES.find(function (item) { return item.slug === moduleSlug; });
        return { module: module || MODULES[0], activity: activity };
    }

    function href(moduleSlug, activity) {
        var params = new URLSearchParams();
        if (moduleSlug) params.set("module", moduleSlug);
        if (activity && activity !== "materi") params.set("activity", activity);
        var query = params.toString();
        return "#/participant-ai-evolution" + (query ? "?" + query : "");
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
        var activityTitle = activity === "materi" ? "Evolution of AI" : activityLabel(activity) + " Evolution of AI";
        var activityCopy = activity === "materi"
            ? "Baca evolusi AI sebagai perubahan paradigma: dari aturan eksplisit, data, reward, model generatif, sampai sistem hybrid modern."
            : "Kerjakan activity Evolution of AI dengan membaca konteks sejarah, membandingkan paradigma, dan menghubungkannya ke produk AI nyata.";
        root.innerHTML = `
            <div class="lesson-layout">
                <div class="lesson-main-content">
                    <section class="lesson-hero ${activity === "materi" ? "" : "compact"}">
                        <div class="lesson-hero-copy">
                            <h1>${escapeHtml(activityTitle)}</h1>
                            <p>${escapeHtml(activityCopy)}</p>
                            <div class="lesson-meta-row">
                                <span><i class="far fa-clock"></i> 240-300 menit</span>
                                <span><i class="fas fa-book-open"></i> Modul 6 dari 6</span>
                                <b>Final</b>
                            </div>
                        </div>
                        <img src="/assets/messaging/herai-chat-persona.png" alt="HerAI fellow belajar Evolution of AI">
                    </section>

                    <section class="lesson-material-panel">
                        <div class="lesson-tabs" role="tablist" aria-label="Activity Evolution of AI">
                        ${ACTIVITIES.map(function (item) {
                            var icon = item === "materi" ? "fa-book-open" : item === "latihan" ? "fa-pen-to-square" : item === "kuis" ? "fa-clipboard" : "fa-message";
                            return `<a class="${item === activity ? "active" : ""}" href="${href(module.slug, item)}"><i class="fas ${icon}"></i>${activityLabel(item)}</a>`;
                        }).join("")}
                        </div>
                        <article class="lesson-article reasoning-scaffold-rich ai-evolution-activity-wrap">
                            <section id="aiEvolutionActivity" class="ai-evolution-activity"></section>
                        </article>
                        <footer class="lesson-nav-footer ai-evolution-pager">
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
                        <p>Catat perubahan paradigma, trade-off, dan contoh sistem hybrid yang kamu temukan.</p>
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

        var navHtml = '<nav class="reasoning-source-jumps reasoning-visual-nav ai-modern-learning-nav" data-evolution-injected id="reasoning-visual-nav" aria-label="Tahapan Topik ' + chapterNum + ' dari ' + total + '">' +
            '<span><i class="' + escapeHtml(module.icon) + '"></i> Jelajahi:</span>' +
            '<button type="button" data-jump="hook">Pembuka</button>' +
            '<button type="button" data-jump="konsep">Konsep</button>' +
            '<button type="button" data-jump="check">Uji Pemahaman</button>' +
            '<button type="button" data-jump="ringkasan">Ringkasan</button>' +
        '</nav>';

        return heroHtml + '\n' + navHtml;
    }

    function renderHookSection(hook) {
        return '<section class="reasoning-hook-section" data-evolution-injected data-section="hook">\n' +
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
        return '<section class="reasoning-quick-check reasoning-qc-enhanced" data-evolution-injected data-section="check" data-check-answer="' + qc.answer + '" data-check-correct="' + escapeHtml(qc.explanationCorrect || "") + '" data-check-wrong="' + escapeHtml(qc.explanationWrong || "") + '"><div class="reasoning-quick-head"><i class="fas fa-circle-question" aria-hidden="true"></i><div><span>Quick Check</span><h3>' + escapeHtml(qc.question) + '</h3></div></div><div class="reasoning-check-options">' + qc.options.map(function (option, index) { return '<button type="button" data-check-option="' + index + '"><b>' + String.fromCharCode(65 + index) + '</b><span>' + escapeHtml(option) + '</span></button>'; }).join("") + '</div><div class="reasoning-check-actions"><button type="button" class="reasoning-scaffold-check-button" data-check-submit><i class="fas fa-check"></i> Periksa Jawaban</button><button type="button" class="reasoning-scaffold-reveal-button reasoning-check-retry" data-check-retry hidden><i class="fas fa-rotate-left"></i> Coba Lagi</button></div><p class="reasoning-check-feedback" aria-live="polite" hidden></p></section>';
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
        var container = document.getElementById("aiEvolutionActivity");
        if (!container) return;
        container.innerHTML = '<div class="ai-evolution-loading"><i class="fas fa-spinner fa-spin"></i><p>Memuat materi...</p></div>';
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
                    processedHtml = processedHtml.replace(/<\/header>/i, "</header>\\n" + hookHtml);
                }
                
                var finalHtml = renderOrientationAndNav(module, chapterNum, total) + 
                                processedHtml + 
                                (module.quickCheck ? renderQuickCheckSection(module.quickCheck) : "") +
                                (module.glossary ? renderGlossarySection(module.glossary) : "") +
                                (module.learningOutcomes ? renderSummarySection(module.learningOutcomes, module.transition, chapterNum, total) : "") +
                                `<button type="button" class="ai-evolution-complete" data-complete-module="${escapeHtml(module.slug)}"><i class="fas fa-circle-check"></i> Tandai materi selesai</button>`;
                
                container.innerHTML = finalHtml;
                var button = container.querySelector("[data-complete-module]");
                if (button) button.addEventListener("click", function () { markComplete(module.slug); });
                
                setupHookInteraction(container);
                setupQuickChecks(container);
                setupVisualNav(container);
            })
            .catch(function () {
                container.innerHTML = '<div class="ai-evolution-error"><i class="fas fa-triangle-exclamation"></i><p>Materi gagal dimuat. Coba refresh halaman.</p></div>';
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
        var container = document.getElementById("aiEvolutionActivity");
        if (!container) return;
        var saved = safeJsonParse(localStorage.getItem(STORAGE.practice), {});
        var items = EXERCISES.filter(function (item) { return item.module === module.slug; });
        container.innerHTML = '<header class="ai-modern-chapter-hero" data-evolution-injected>\n' +
            '    <span>Latihan & Kasus</span>\n' +
            '    <h2>' + escapeHtml(module.title) + '</h2>\n' +
            '    <p>Terapkan teori ke dalam arsitektur nyata.</p>\n' +
            '</header>\n' + 
            `<form class="ai-evolution-practice" id="aiEvolutionPracticeForm">
            <p>Isi jawaban singkat terstruktur. Semua jawaban tersimpan lokal di browser ini.</p>
            ${items.map(function (item) {
                return `<article>
                    <span>${escapeHtml(item.title)}</span>
                    <p><strong>Skenario:</strong> ${escapeHtml(item.scenario)}</p>
                    <p><strong>Tipe:</strong> ${escapeHtml(item.type)}</p>
                    <label for="${item.id}">${escapeHtml(item.instruction)}</label>
                    <textarea id="${item.id}" name="${item.id}" rows="5" required>${escapeHtml(saved[item.id] || "")}</textarea>
                    <div class="ai-evolution-feedback" data-feedback="${item.id}" ${saved[item.id] ? "" : "hidden"}><strong>Model feedback:</strong> ${escapeHtml(item.modelAnswer)}</div>
                </article>`;
            }).join("")}
            <div class="ai-evolution-actions"><button type="submit"><i class="fas fa-floppy-disk"></i> Simpan latihan</button><span id="aiEvolutionPracticeStatus" aria-live="polite"></span></div>
        </form>`;
        var form = document.getElementById("aiEvolutionPracticeForm");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var data = safeJsonParse(localStorage.getItem(STORAGE.practice), {});
            var valid = true;
            items.forEach(function (item) {
                var field = form.elements[item.id];
                data[item.id] = field ? field.value.trim() : "";
                if (!data[item.id]) valid = false;
                var feedback = form.querySelector('[data-feedback="' + item.id + '"]');
                if (feedback) feedback.hidden = !data[item.id];
            });
            saveJson(STORAGE.practice, data);
            document.getElementById("aiEvolutionPracticeStatus").textContent = valid ? "Latihan tersimpan dan feedback terbuka." : "Lengkapi semua jawaban untuk menyelesaikan latihan.";
        });
    }

    function renderQuiz(module) {
        var container = document.getElementById("aiEvolutionActivity");
        if (!container) return;
        var questions = QUIZ.filter(function (item) { return item.module === module.slug; });
        var doneMap = safeJsonParse(localStorage.getItem(STORAGE.quizDone), {});
        var answerMap = safeJsonParse(localStorage.getItem(STORAGE.quizAnswers), {});
        var isDone = !!doneMap[module.slug];
        container.innerHTML = '<header class="ai-modern-chapter-hero" data-evolution-injected>\n' +
            '    <span>Kuis Modul</span>\n' +
            '    <h2>' + escapeHtml(module.title) + '</h2>\n' +
            '    <p>Uji pemahaman arsitektur dan kapabilitas sistem.</p>\n' +
            '</header>\n' +
            `<form class="ai-evolution-quiz ${isDone ? "is-locked" : ""}" id="aiEvolutionQuizForm">
            <p>Passing score ${PASSING_SCORE}%. ${isDone ? "Attempt module ini sudah terkunci." : "Pilih satu jawaban terbaik untuk tiap soal."}</p>
            ${questions.map(function (q, index) {
                return `<fieldset>
                    <legend>${index + 1}. ${escapeHtml(q.question)}</legend>
                    ${q.options.map(function (option, optionIndex) {
                        var checked = answerMap[q.id] === optionIndex;
                        return `<label class="${checked ? "selected" : ""}"><input type="radio" name="${q.id}" value="${optionIndex}" ${checked ? "checked" : ""} ${isDone ? "disabled" : ""}><span>${escapeHtml(option)}</span></label>`;
                    }).join("")}
                    <p class="ai-evolution-explanation" ${isDone ? "" : "hidden"}>${escapeHtml(q.explanation)}</p>
                </fieldset>`;
            }).join("")}
            <div class="ai-evolution-actions"><button type="submit" ${isDone ? "disabled" : ""}><i class="fas fa-circle-check"></i> Submit kuis</button><span id="aiEvolutionQuizResult" aria-live="polite"></span></div>
        </form>`;
        if (isDone) showQuizResult(module.slug, questions);
        var form = document.getElementById("aiEvolutionQuizForm");
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
                document.getElementById("aiEvolutionQuizResult").textContent = "Jawab semua soal terlebih dahulu.";
                return;
            }
            doneMap[module.slug] = true;
            saveJson(STORAGE.quizAnswers, answers);
            saveJson(STORAGE.quizDone, doneMap);
            showQuizResult(module.slug, questions);
            form.querySelectorAll("input, button[type='submit']").forEach(function (item) { item.disabled = true; });
            form.querySelectorAll(".ai-evolution-explanation").forEach(function (item) { item.hidden = false; });
        });
    }

    function showQuizResult(moduleSlug, questions) {
        var answers = safeJsonParse(localStorage.getItem(STORAGE.quizAnswers), {});
        var score = questions.reduce(function (total, q) { return total + (answers[q.id] === q.answer ? 1 : 0); }, 0);
        var percent = Math.round((score / questions.length) * 100);
        var scores = safeJsonParse(localStorage.getItem(STORAGE.quizScore), {});
        scores[moduleSlug] = percent;
        saveJson(STORAGE.quizScore, scores);
        var result = document.getElementById("aiEvolutionQuizResult");
        if (result) result.textContent = "Skor: " + score + "/" + questions.length + " (" + percent + "%). " + (percent >= PASSING_SCORE ? "Lulus checkpoint." : "Review materi lalu ulangi konsep yang belum kuat.");
    }

    function renderDiscussion(module) {
        var container = document.getElementById("aiEvolutionActivity");
        if (!container) return;
        var saved = safeJsonParse(localStorage.getItem(STORAGE.discussion), {});
        container.innerHTML = '<header class="ai-modern-chapter-hero" data-evolution-injected>\n' +
            '    <span>Diskusi Reflektif</span>\n' +
            '    <h2>' + escapeHtml(module.title) + '</h2>\n' +
            '    <p>Refleksikan dampak evolusi AI ini terhadap peran dan sistem di masa depan.</p>\n' +
            '</header>\n' +
            `<form class="ai-evolution-discussion" id="aiEvolutionDiscussionForm">
            <p>${escapeHtml(DISCUSSIONS[module.slug])}</p>
            <label for="evolutionReflection">Tulis refleksimu</label>
            <textarea id="evolutionReflection" rows="7">${escapeHtml(saved[module.slug] || "")}</textarea>
            <div class="ai-evolution-actions"><button type="submit"><i class="fas fa-floppy-disk"></i> Simpan refleksi</button><span id="aiEvolutionDiscussionStatus" aria-live="polite"></span></div>
        </form>`;
        document.getElementById("aiEvolutionDiscussionForm").addEventListener("submit", function (event) {
            event.preventDefault();
            saved[module.slug] = document.getElementById("evolutionReflection").value.trim();
            saveJson(STORAGE.discussion, saved);
            document.getElementById("aiEvolutionDiscussionStatus").textContent = "Refleksi tersimpan di browser ini.";
        });
    }

    function render() {
        var root = document.getElementById("aiEvolutionApp");
        if (!root) return;
        var state = getState();
        localStorage.setItem(STORAGE.currentModule, state.module.slug);
        renderDetail(root, state.module, state.activity);
    }

    window.initAiEvolution = function () {
        var root = document.getElementById("aiEvolutionApp");
        if (!root) return;
        if (window.__aiEvolutionHashHandler) {
            window.removeEventListener("hashchange", window.__aiEvolutionHashHandler);
        }
        window.__aiEvolutionHashHandler = function () {
            if ((window.location.hash || "").indexOf("#/participant-ai-evolution") === 0) render();
        };
        window.addEventListener("hashchange", window.__aiEvolutionHashHandler);
        render();
    };
})();
