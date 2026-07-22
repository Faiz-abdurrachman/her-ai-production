# Sumber Dinamis: ai-evaluation.js

> Sumber: `js/frontend/fellow-dashboard/ai-evaluation.js`
> Arsip lengkap JavaScript pembentuk materi/interaksi. Disimpan tanpa potongan agar string, soal, pembahasan, konfigurasi, dan variasi interaktif tetap terlacak.

````javascript
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
        { slug: "why-evaluate-ai", title: "Mengapa AI Perlu Dievaluasi?", summary: "Hubungan tujuan, pengguna, risiko, metrik, release decision, dan monitoring.", chapter: "chapter-1.html", duration: "25 menit" },
        { slug: "output-evaluation", title: "Mengevaluasi Output AI", summary: "Rubric output, human evaluation, metrik otomatis, LLM-as-a-judge, dan RAG evaluation.", chapter: "chapter-2.html", duration: "35 menit" },
        { slug: "benchmark-and-dataset", title: "Benchmark dan Dataset Evaluasi", summary: "Benchmark, test set, leaderboard, contamination, dan konteks Indonesia.", chapter: "chapter-3.html", duration: "30 menit" },
        { slug: "reliability-and-robustness", title: "Reliability dan Robustness", summary: "Consistency, robustness, calibration, hallucination, stress test, dan monitoring.", chapter: "chapter-4.html", duration: "35 menit" },
        { slug: "bias-and-fairness", title: "Bias dan Fairness", summary: "Bias statistik, sosial, harmful bias, fairness metric, dan audit konteks Indonesia.", chapter: "chapter-5.html", duration: "35 menit" },
        { slug: "system-quality-evaluation-plan", title: "Kualitas Sistem AI dan Evaluation Plan", summary: "System quality, lifecycle, release criteria, monitoring, incident response, dan evaluation plan.", chapter: "chapter-6.html", duration: "40 menit" }
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

    function renderMaterial(module) {
        var container = document.getElementById("aiEvaluationActivity");
        if (!container) return;
        container.innerHTML = '<div class="ai-evaluation-loading"><i class="fas fa-spinner fa-spin"></i><p>Memuat materi...</p></div>';
        fetch(BASE + "/chapters/" + module.chapter)
            .then(function (response) {
                if (!response.ok) throw new Error("Chapter not found");
                return response.text();
            })
            .then(function (html) {
                container.innerHTML = html + `<button type="button" class="ai-evaluation-complete" data-complete-module="${escapeHtml(module.slug)}"><i class="fas fa-circle-check"></i> Tandai materi selesai</button>`;
                var button = container.querySelector("[data-complete-module]");
                if (button) button.addEventListener("click", function () { markComplete(module.slug); });
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
        var saved = safeJsonParse(localStorage.getItem(STORAGE.practice), {});
        var items = EXERCISES.filter(function (item) { return item.module === module.slug; });
        container.innerHTML = `<form class="ai-evaluation-practice" id="aiEvaluationPracticeForm">
            <h2>Latihan: ${escapeHtml(module.title)}</h2>
            ${items.map(function (item) {
                return `<article>
                    <span>${escapeHtml(item.title)}</span>
                    <p><strong>Skenario:</strong> ${escapeHtml(item.scenario)}</p>
                    <label for="${item.id}">${escapeHtml(item.instruction)}</label>
                    <textarea id="${item.id}" name="${item.id}" rows="5">${escapeHtml(saved[item.id] || "")}</textarea>
                    <div class="ai-evaluation-feedback" data-feedback="${item.id}" hidden><strong>Model feedback:</strong> ${escapeHtml(item.modelAnswer)}</div>
                </article>`;
            }).join("")}
            <div class="ai-evaluation-actions"><button type="submit"><i class="fas fa-floppy-disk"></i> Simpan latihan</button><span id="aiEvaluationPracticeStatus" aria-live="polite"></span></div>
        </form>`;
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
        var questions = QUIZ.filter(function (item) { return item.module === module.slug; });
        var doneMap = safeJsonParse(localStorage.getItem(STORAGE.quizDone), {});
        var answerMap = safeJsonParse(localStorage.getItem(STORAGE.quizAnswers), {});
        var isDone = !!doneMap[module.slug];
        container.innerHTML = `<form class="ai-evaluation-quiz ${isDone ? "is-locked" : ""}" id="aiEvaluationQuizForm">
            <h2>Kuis: ${escapeHtml(module.title)}</h2>
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
        var saved = safeJsonParse(localStorage.getItem(STORAGE.discussion), {});
        container.innerHTML = `<form class="ai-evaluation-discussion" id="aiEvaluationDiscussionForm">
            <h2>Refleksi: ${escapeHtml(module.title)}</h2>
            <p>${escapeHtml(DISCUSSIONS[module.slug])}</p>
            <label for="evaluationReflection">Tulis refleksimu</label>
            <textarea id="evaluationReflection" rows="7">${escapeHtml(saved[module.slug] || "")}</textarea>
            <div class="ai-evaluation-actions"><button type="submit"><i class="fas fa-floppy-disk"></i> Simpan refleksi</button><span id="aiEvaluationDiscussionStatus" aria-live="polite"></span></div>
        </form>`;
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

````
