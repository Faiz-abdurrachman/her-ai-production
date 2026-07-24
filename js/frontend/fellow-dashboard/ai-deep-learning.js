(function () {
    const STORAGE = {
        chapter: "heraiAiDeepLearningCurrentChapter",
        practice: "heraiAiDeepLearningPractice",
        quizDone: "heraiAiDeepLearningQuizDone",
        quizScore: "heraiAiDeepLearningQuizScore",
        quizAnswers: "heraiAiDeepLearningQuizAnswers",
        discussion: "heraiAiDeepLearningDiscussion",
        readiness: "heraiAiDeepLearningReadiness"
    };

    const SOURCE_BASE = "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/";


    var pyodideInstance = null;
    var pyodideReady = false;
    var pyodideLoading = false;
    var activeChapterRequest = 0;

    function startPyodide() {
        if (pyodideReady) { enableAllPlaygrounds(); return; }
        var status = document.getElementById('pyodideStatus');
        if (typeof loadPyodide === 'undefined') {
            if (status) { status.querySelector('span').textContent = 'Python runtime tidak tersedia.'; }
            return;
        }
        if (pyodideLoading) return;
        pyodideLoading = true;
        var runs = document.querySelectorAll('.py-run');
        runs.forEach(function(b) { b.disabled = true; b.textContent = 'Loading...'; });
        var bars = 0;
        var interval = setInterval(function() {
            bars = (bars + 1) % 4;
            if (status) {
                var s = status.querySelector('span');
                if (s && !pyodideReady) s.textContent = 'Memuat Python runtime' + '.'.repeat(bars);
            }
        }, 400);
        loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' }).then(function(py) {
            pyodideInstance = py;
            pyodideReady = true;
            clearInterval(interval);
            if (status) { status.classList.add('ready'); status.querySelector('span').textContent = 'Python runtime siap.'; }
            enableAllPlaygrounds();
        }).catch(function(err) {
            clearInterval(interval);
            if (status) status.querySelector('span').textContent = 'Gagal: ' + (err.message || 'unknown');
        });
    }

    function enableAllPlaygrounds() {
        document.querySelectorAll('.py-run').forEach(function(b) { b.disabled = false; b.textContent = 'Run'; });
    }

    function runCode(playId) {
        if (!pyodideReady || !pyodideInstance) return;
        var editor = document.querySelector('#play-' + playId + ' .py-editor');
        var output = document.querySelector('#play-' + playId + ' .py-output');

        if (!editor || !output) return;
        var code = editor.value;
        output.className = 'py-output visible';
        output.textContent = 'Running...';
        var cap = '';
        pyodideInstance.setStdout({ batched: function(t) { cap += t + String.fromCharCode(10); } });
        pyodideInstance.setStderr({ batched: function(t) { cap += t + String.fromCharCode(10); } });
        pyodideInstance.loadPackagesFromImports(code).then(function() {
            return pyodideInstance.runPythonAsync(code);
        }).then(function(r) {
            var rt = r !== undefined ? String(r) : '';
            var fin = cap ? cap.trimEnd() : '';
            if (rt && fin) fin += String.fromCharCode(10) + rt;
            else if (rt) fin = rt;
            output.textContent = fin || '(ok)';
            output.classList.remove('error');
        }).catch(function(err) {
            var fin = cap ? cap.trimEnd() + String.fromCharCode(10) : '';
            fin += 'Error: ' + (err.message || err);
            output.textContent = fin;
            output.classList.add('error');
        });
    }

const CHAPTERS = [
    {
        "title": "Pengantar Deep Learning",
        "shortTitle": "Pengantar Deep Le...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Pengantar Deep Learning",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/01-topic.html"
    },
    {
        "title": "Neuron dan Arsitektur Dasar",
        "shortTitle": "Neuron dan Arsite...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Neuron dan Arsitektur Dasar",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/02-topic.html"
    },
    {
        "title": "Forward Propagation, Loss, dan Backpropagation",
        "shortTitle": "Forward Propagati...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Forward Propagation, Loss, dan Backpropagation",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/03-topic.html"
    },
    {
        "title": "Training dan Optimizer",
        "shortTitle": "Training dan Opti...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Training dan Optimizer",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/04-topic.html"
    },
    {
        "title": "Regularisasi dan Generalisasi",
        "shortTitle": "Regularisasi dan ...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Regularisasi dan Generalisasi",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/05-topic.html"
    },
    {
        "title": "Convolutional Neural Network",
        "shortTitle": "Convolutional Neu...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Convolutional Neural Network",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/06-topic.html"
    },
    {
        "title": "RNN dan Data Berurutan",
        "shortTitle": "RNN dan Data Beru...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai RNN dan Data Berurutan",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/07-topic.html"
    },
    {
        "title": "Transformer Dasar",
        "shortTitle": "Transformer Dasar",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Transformer Dasar",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/08-topic.html"
    },
    {
        "title": "Evaluasi dan Implementasi",
        "shortTitle": "Evaluasi dan Impl...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Evaluasi dan Implementasi",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/09-topic.html"
    },
    {
        "title": "Mini Project: Klasifikasi Gambar",
        "shortTitle": "Mini Project: Kla...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Mini Project: Klasifikasi Gambar",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/10-topic.html"
    },
    {
        "title": "Kuis Akhir",
        "shortTitle": "Kuis Akhir",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Kuis Akhir",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/11-topic.html"
    },
    {
        "title": "Diskusi dan Refleksi",
        "shortTitle": "Diskusi dan Refleksi",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Diskusi dan Refleksi",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/12-topic.html"
    },
    {
        "title": "Glosarium",
        "shortTitle": "Glosarium",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Glosarium",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/13-topic.html"
    },
    {
        "title": "Ringkasan Cepat",
        "shortTitle": "Ringkasan Cepat",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Ringkasan Cepat",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/14-topic.html"
    },
    {
        "title": "Referensi Belajar",
        "shortTitle": "Referensi Belajar",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Referensi Belajar",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/15-topic.html"
    }
];

    const PYTHON_GUIDES = [
        {
            hook: { question: "Python populer untuk AI karena paling cepat. Benarkah?", answerA: { label: "Benar", text: "Kecepatan runtime adalah alasan utamanya.", icon: "fas fa-gauge-high" }, answerB: { label: "Belum tepat", text: "Keterbacaan, ekosistem, eksperimen, dan integrasi jauh lebih menentukan.", icon: "fas fa-bridge" }, message: "Python sering menjadi lapisan orkestrasi. Operasi berat tetap dijalankan library teroptimasi, sementara Python membuat workflow mudah dibaca dan diuji." },
            flow: [["Masalah", "Definisikan input, proses, output"], ["Environment", "Isolasi dependency dan versi"], ["Eksperimen", "Jalankan langkah kecil dan amati"], ["Workflow", "Susun proses yang dapat diulang"]],
            deepDive: [
                ["Python adalah penghubung, bukan AI itu sendiri", "Python memberi bahasa yang konsisten untuk membaca data, memanggil library numerik, menjalankan eksperimen, menyimpan artefak, dan menghubungkan model ke aplikasi. Ketika peserta memahami peran ini, mereka tidak lagi menganggap satu fungsi library sebagai sihir; mereka dapat menelusuri dari input sampai output serta menunjukkan bagian mana yang melakukan transformasi.", "Keunggulan Python bukan berarti setiap operasi dieksekusi paling cepat oleh interpreter. NumPy, Pandas, PyTorch, dan banyak library lain memindahkan komputasi berat ke implementasi teroptimasi. Python tetap berada di atasnya sebagai lapisan yang ekspresif, sehingga tim dapat mengubah ide menjadi eksperimen tanpa kehilangan keterbacaan."],
                ["Environment adalah bagian dari reproducibility", "Kode yang benar di satu laptop dapat gagal di laptop lain karena versi Python, package, atau dependency berbeda. Virtual environment memisahkan kebutuhan setiap project sehingga upgrade satu eksperimen tidak merusak eksperimen lain. File dependency dan catatan versi membuat anggota tim dapat membangun ulang lingkungan yang sama.", "Notebook cocok untuk eksplorasi bertahap, tetapi urutan cell tersembunyi dapat menghasilkan state yang sulit dilacak. Untuk workflow berulang, pindahkan logika stabil ke function atau file Python, jalankan dari awal, lalu pastikan output tidak bergantung pada cell yang pernah dieksekusi diam-diam."],
                ["Computational thinking sebelum sintaks", "Sebelum menulis kode, pecah masalah menjadi input, aturan, proses, output, dan failure case. Misalnya completion rate memerlukan jumlah peserta selesai dan jumlah peserta total; kondisi total nol harus diputuskan sebelum pembagian dilakukan. Keputusan kecil ini adalah bagian dari desain program, bukan detail sintaks.", "Decomposition membantu peserta menguji satu langkah pada satu waktu. Pattern recognition menemukan proses yang berulang, abstraction memilih detail yang penting, dan algorithmic thinking menyusun urutan yang deterministik. Empat kemampuan tersebut terus dipakai ketika workflow berkembang dari beberapa variabel menjadi pipeline data." ]
            ],
            workedExample: ["Completion rate peserta", ["Input", "Jumlah peserta selesai dan total peserta."], ["Validasi", "Total tidak boleh negatif; total nol ditangani eksplisit."], ["Proses", "completed / total × 100 hanya dijalankan setelah validasi."], ["Output", "Persentase beserta pesan yang menjelaskan kondisi data."]],
            glossary: [["Interpreter", "Program yang menjalankan instruksi Python."], ["Environment", "Lingkungan terisolasi berisi Python dan dependency project."], ["Dependency", "Package lain yang dibutuhkan program."], ["Reproducibility", "Kemampuan mengulang proses dengan input dan environment yang sama."], ["Computational thinking", "Cara memecah masalah menjadi langkah yang dapat dieksekusi."]],
            quickCheck: { question: "Mengapa virtual environment penting pada project AI?", options: ["Mengisolasi versi dependency", "Membuat model otomatis", "Menggantikan dataset"], answer: 0, explanationCorrect: "Tepat. Isolasi dependency membuat eksperimen lebih stabil dan dapat diulang.", explanationWrong: "Coba hubungkan environment dengan perbedaan versi package antarproject." },
            challenge: { instruction: "Rancang IPO untuk completion rate, termasuk kondisi total peserta nol.", placeholder: "Input: ...\nProcess: ...\nOutput: ...\nEdge case: ...", example: "Input completed dan total; validasi total; hitung persentase bila total > 0; bila nol, kembalikan status belum ada data." },
            mistakes: ["Menganggap Python adalah model AI", "Menginstal semua package secara global", "Menjalankan notebook tanpa restart-and-run-all"], bestPractices: ["Pisahkan environment per project", "Catat dependency dan versi", "Tulis IPO serta edge case sebelum kode"], learningOutcomes: ["Menjelaskan posisi Python dalam AI", "Membangun environment yang dapat diulang", "Memecah masalah menjadi pipeline kecil"], transition: "Berikutnya kita menerjemahkan input dan state ke tipe data serta collection yang tepat.", prompt: ["problem = input + process + output", "validate edge cases before calculation", "record environment and dependency versions"]
        },
        {
            hook: { question: "Semua data peserta paling mudah disimpan sebagai string. Setuju?", answerA: { label: "Setuju", text: "Satu tipe terasa lebih sederhana.", icon: "fas fa-font" }, answerB: { label: "Tidak", text: "Tipe data membawa makna dan menentukan operasi yang aman.", icon: "fas fa-shapes" }, message: "Nama, score, status, dan kumpulan record memiliki operasi berbeda. Pemilihan tipe yang tepat mengurangi konversi dan error tersembunyi." },
            flow: [["Value", "Kenali makna data"], ["Type", "Pilih operasi yang valid"], ["Collection", "Susun beberapa nilai"], ["Validate", "Periksa bentuk dan isi"]],
            deepDive: [
                ["Variabel menyimpan state dengan nama bermakna", "Variabel bukan sekadar kotak. Nama variabel mendokumentasikan peran sebuah nilai dan membantu pembaca mengikuti perubahan state. Gunakan nama seperti participant_score atau dataset_version, bukan x atau data1, ketika maknanya penting bagi keputusan berikutnya.", "Tipe int dan float mendukung operasi numerik; str mendukung pengolahan teks; bool menyatakan kondisi; None menandai nilai yang belum tersedia. None tidak sama dengan nol atau string kosong. Menyamakan ketiganya dapat mengubah statistik dan keputusan bisnis."],
                ["Collection dipilih berdasarkan perilaku", "List menjaga urutan dan dapat berubah, tuple cocok untuk susunan yang stabil, set menghapus keunikan ganda, sedangkan dictionary memetakan key ke value. Record peserta biasanya lebih mudah dibaca sebagai dictionary karena setiap nilai memiliki nama field yang eksplisit.", "Collection dapat bersarang, misalnya list berisi dictionary peserta. Struktur ini mirip data JSON yang sering berpindah antara frontend, backend, dan layanan AI. Sebelum mengakses key, periksa schema dan putuskan apa yang dilakukan jika field hilang atau memiliki tipe yang salah."],
                ["Mutability memengaruhi efek samping", "List dan dictionary mutable: perubahan pada object yang sama terlihat dari semua referensi yang menunjuk kepadanya. Ini berguna tetapi dapat menimbulkan bug ketika raw data berubah tanpa sengaja. Salin data sebelum cleaning bila versi mentah perlu dipertahankan.", "Operasi collection sebaiknya mengikuti tujuan yang jelas: append untuk menambah record, set untuk deduplikasi nilai sederhana, dan dictionary lookup untuk akses berdasarkan key. Jangan memilih struktur hanya karena sintaksnya paling familiar; pilih berdasarkan urutan, keunikan, kebutuhan perubahan, dan pola akses." ]
            ],
            workedExample: ["Record eksperimen", ["Metadata", "Dictionary menyimpan nama dataset, versi, dan status review."], ["Records", "List menyimpan beberapa dictionary peserta."], ["Validation", "Periksa key name, track, dan score sebelum diproses."], ["Safety", "Salin record sebelum membuat perubahan cleaning."]],
            glossary: [["State", "Nilai yang menggambarkan kondisi program saat ini."], ["Mutable", "Object yang isinya dapat diubah."], ["Immutable", "Object yang tidak berubah setelah dibuat."], ["Schema", "Kesepakatan field dan tipe sebuah record."], ["JSON", "Format pertukaran data berbasis object dan array."]],
            quickCheck: { question: "Struktur apa yang paling tepat untuk satu record peserta dengan field name, track, dan score?", options: ["Dictionary", "Set", "Float"], answer: 0, explanationCorrect: "Benar. Dictionary memberi nama pada setiap field.", explanationWrong: "Pilih struktur yang memetakan nama field ke nilainya." },
            challenge: { instruction: "Buat metadata dataset dan lima record peserta. Jelaskan alasan memilih setiap tipe data.", placeholder: "metadata = {...}\nparticipants = [...]\nAlasan: ...", example: "Dictionary untuk metadata dan record, list untuk urutan record, float untuk score, bool untuk status review." },
            mistakes: ["Mengubah raw list tanpa salinan", "Menyamakan None dengan nol", "Mengakses dictionary key tanpa validasi"], bestPractices: ["Gunakan nama variabel bermakna", "Dokumentasikan schema", "Pilih collection berdasarkan perilaku"], learningOutcomes: ["Memilih tipe berdasarkan makna", "Menyusun nested collection", "Menjelaskan mutability dan efek samping"], transition: "Data sudah terstruktur; berikutnya program perlu mengambil keputusan dan mengulang proses secara aman.", prompt: ["meaning -> type", "records -> schema", "validate before transform"]
        },
        {
            hook: { question: "Jika score kosong, langsung bandingkan dengan threshold 75?", answerA: { label: "Langsung", text: "Semua record diperlakukan sama.", icon: "fas fa-forward" }, answerB: { label: "Validasi dulu", text: "None atau teks tidak dapat dibandingkan aman dengan angka.", icon: "fas fa-shield" }, message: "Urutan kondisi adalah bagian dari correctness. Validasi missing dan tipe harus terjadi sebelum range atau threshold." },
            flow: [["Validate", "Cek missing dan tipe"], ["Branch", "Pilih aturan yang cocok"], ["Loop", "Terapkan ke setiap record"], ["Summarize", "Hitung hasil dan error"]],
            deepDive: [
                ["Branch mengubah aturan menjadi keputusan eksplisit", "if, elif, dan else dibaca dari atas ke bawah. Kondisi pertama yang benar akan dijalankan, sehingga urutan guard condition sangat penting. Missing value dan tipe invalid harus diperiksa sebelum perbandingan numerik agar program gagal dengan pesan yang jelas, bukan exception yang membingungkan.", "Boundary perlu ditulis sengaja. Jika lulus dimulai dari 75, nilai 74.9 dan 75 harus masuk cabang berbeda. Gunakan contoh di sekitar batas untuk memastikan operator >, >=, <, dan <= sesuai aturan yang sebenarnya."],
                ["Loop memproses collection tanpa copy-paste", "for loop cocok ketika program membaca setiap record dalam collection. while loop digunakan ketika pengulangan bergantung pada kondisi yang dapat berubah. Setiap loop harus punya tujuan, kondisi berhenti, dan state yang diperbarui agar tidak menjadi infinite loop.", "continue dapat melewati record invalid setelah error dicatat, sedangkan break menghentikan seluruh loop. Pilihan tersebut memiliki konsekuensi: pipeline batch biasanya ingin mengumpulkan semua error, bukan berhenti pada record pertama, tetapi kasus keamanan tertentu memang harus fail fast."],
                ["Output loop perlu dapat diaudit", "Jangan hanya menghasilkan daftar clean tanpa menjelaskan apa yang terjadi. Catat jumlah raw, valid, missing, invalid, dan out-of-range. Angka-angka ini harus dapat direkonsiliasi sehingga tim tahu apakah record hilang karena aturan yang disengaja.", "Control flow yang baik memisahkan klasifikasi dari side effect. Tentukan status record terlebih dahulu, lalu simpan atau laporkan hasil pada langkah berikutnya. Pemisahan ini membuat aturan lebih mudah diuji dengan input kecil." ]
            ],
            workedExample: ["Validasi score", ["Guard 1", "Jika score None, tandai missing."], ["Guard 2", "Jika bukan angka, tandai invalid type."], ["Guard 3", "Jika di luar 0–100, tandai out of range."], ["Decision", "Nilai valid diklasifikasikan lulus atau review."]],
            glossary: [["Branch", "Cabang eksekusi berdasarkan kondisi."], ["Guard condition", "Pemeriksaan awal sebelum proses utama."], ["Boundary", "Nilai tepat di batas aturan."], ["Iteration", "Satu putaran loop."], ["Fail fast", "Menghentikan proses segera ketika kondisi kritis ditemukan."]],
            quickCheck: { question: "Mengapa score is None diperiksa sebelum score >= 75?", options: ["None tidak dapat dibandingkan dengan angka", "Agar loop lebih cepat", "Agar score berubah menjadi nol"], answer: 0, explanationCorrect: "Tepat. Guard condition mencegah operasi yang tidak valid.", explanationWrong: "Pertimbangkan apa yang terjadi ketika operator >= menerima None." },
            challenge: { instruction: "Klasifikasikan None, teks, -1, 0, 74.9, 75, 100, dan 101 serta jelaskan urutan guard.", placeholder: "Input -> status\n...\nUrutan guard: ...", example: "Missing dan tipe dicek lebih dulu, lalu range 0–100, baru threshold kelulusan." },
            mistakes: ["Membandingkan None dengan angka", "Salah memilih > atau >=", "Loop tanpa kondisi berhenti"], bestPractices: ["Uji boundary", "Kumpulkan alasan record ditolak", "Pisahkan validasi dan klasifikasi"], learningOutcomes: ["Menyusun guard condition", "Memproses record dengan loop", "Merekonsiliasi hasil validasi"], transition: "Aturan sudah berjalan; function akan membuatnya reusable, teruji, dan mudah dirangkai.", prompt: ["validate missing -> type -> range", "classify valid values", "report every rejected record"]
        },
        {
            hook: { question: "Satu function besar lebih mudah karena semua kode berada di satu tempat?", answerA: { label: "Lebih mudah", text: "Tidak perlu berpindah function.", icon: "fas fa-box" }, answerB: { label: "Sulit dirawat", text: "Tanggung jawab bercampur dan test menjadi rumit.", icon: "fas fa-diagram-project" }, message: "Function kecil memberi nama pada satu tanggung jawab. Pipeline kemudian merangkainya dalam urutan yang dapat diuji." },
            flow: [["Contract", "Tentukan parameter dan return"], ["Responsibility", "Satu function satu tujuan"], ["Test", "Uji normal, boundary, invalid"], ["Compose", "Rangkai menjadi pipeline"]],
            deepDive: [
                ["Function adalah kontrak input dan output", "Parameter menjelaskan data yang dibutuhkan, sedangkan return mengirim nilai kepada pemanggil. print hanya menampilkan informasi dan biasanya tidak cukup untuk pipeline karena hasilnya tidak dapat dipakai langkah berikutnya. Function yang baik dapat dijelaskan tanpa membaca seluruh implementasi.", "Default parameter berguna ketika ada nilai standar, tetapi hindari default mutable seperti list kosong karena object yang sama dapat dipakai lintas pemanggilan. Gunakan None lalu buat object baru di dalam function ketika state harus independen."],
                ["Pipeline kecil mengurangi ketidakkonsistenan", "Copy-paste validation ke beberapa tempat membuat satu perbaikan harus dilakukan berkali-kali. Dengan validate_score, classify_score, dan summarize_scores, setiap aturan memiliki owner yang jelas dan dapat diuji terpisah. run_pipeline hanya mengatur urutan, bukan mengerjakan semua detail.", "Error sebaiknya muncul pada layer yang memahami penyebabnya. Function validasi dapat mengembalikan status terstruktur atau melempar exception spesifik; layer atas memutuskan apakah record dilewati, proses dihentikan, atau pesan ditampilkan."],
                ["Lambda dan generator dipakai pada kasus yang tepat", "lambda cocok untuk ekspresi sangat singkat seperti key sorting. Ketika logika membutuhkan nama, beberapa kondisi, dokumentasi, atau test, def lebih mudah dipahami. Kode pendek tidak selalu lebih sederhana.", "Generator menghasilkan item satu per satu dengan yield. Ia berguna untuk stream atau dataset besar karena tidak harus menyimpan seluruh hasil di memori. Namun generator hanya dapat dilalui sesuai alurnya; jika hasil perlu dibaca berulang, pertimbangkan materialisasi yang disengaja." ]
            ],
            workedExample: ["Pipeline validasi score", ["validate_score", "Pastikan tipe dan range valid."], ["classify_score", "Ubah score valid menjadi status."], ["summarize_scores", "Hitung jumlah dan statistik."], ["run_pipeline", "Rangkai tahap dan tangani error."]],
            glossary: [["Parameter", "Nama input pada definisi function."], ["Argument", "Nilai yang dikirim saat function dipanggil."], ["Return value", "Nilai yang dikirim kembali ke pemanggil."], ["Pure function", "Function yang tidak mengubah state di luar dirinya."], ["Generator", "Function yang menghasilkan nilai bertahap dengan yield."]],
            quickCheck: { question: "Apa perbedaan utama return dan print?", options: ["return mengirim nilai; print hanya menampilkan", "Keduanya selalu sama", "print hanya untuk angka"], answer: 0, explanationCorrect: "Benar. Return memungkinkan output dipakai tahap pipeline berikutnya.", explanationWrong: "Pikirkan apakah hasil masih dapat disimpan ke variabel setelah function selesai." },
            challenge: { instruction: "Buat validate_score, classify_score, dan summarize_scores. Uji None, teks, 74.9, 75, dan 100.", placeholder: "def validate_score(...):\n    ...", example: "Setiap function punya satu tanggung jawab; test mencakup normal, boundary, dan invalid input." },
            mistakes: ["Function mengerjakan terlalu banyak hal", "Menggunakan print sebagai return", "Lambda berisi logika kompleks"], bestPractices: ["Tulis contract yang jelas", "Uji function secara terpisah", "Gunakan generator hanya saat aliran bertahap berguna"], learningOutcomes: ["Mendesain function kecil", "Membedakan return dan side effect", "Merangkai pipeline reusable"], transition: "Setelah function, kita mengelompokkan state dan behavior terkait melalui object.", prompt: ["validate_score(value)", "classify_score(valid_value)", "summarize_scores(values)", "run_pipeline = compose steps"]
        },
        {
            hook: { question: "Class perlu dipakai untuk setiap dictionary?", answerA: { label: "Selalu", text: "OOP membuat semua kode lebih profesional.", icon: "fas fa-cubes" }, answerB: { label: "Sesuai kebutuhan", text: "Class berguna ketika state dan behavior memiliki lifecycle bersama.", icon: "fas fa-scale-balanced" }, message: "Dictionary cukup untuk record sederhana. Class membantu ketika object perlu validasi, method, invariant, atau beberapa implementasi yang berbagi contract." },
            flow: [["Model", "Tentukan state dan invariant"], ["Class", "Buat blueprint"], ["Object", "Bangun instance valid"], ["Method", "Jalankan behavior terkait"]],
            deepDive: [
                ["Class menyatukan state dan behavior", "Class adalah blueprint, sedangkan object adalah instance yang memiliki state sendiri. __init__ menerima data awal dan sebaiknya memastikan object tidak lahir dalam kondisi yang tidak valid. Method menggunakan state tersebut untuk melakukan behavior yang memang menjadi tanggung jawab object.", "Untuk DatasetReport, nama dataset, versi, dan summary dapat disimpan bersama method validasi atau export. Ini lebih jelas daripada kumpulan variabel global ketika lifecycle report tumbuh dan beberapa report harus diproses bersamaan."],
                ["Encapsulation menjaga invariant", "Encapsulation bukan sekadar menyembunyikan atribut. Tujuannya menjaga aturan agar perubahan state melewati jalur yang dapat divalidasi. Jika score harus 0–100, object tidak seharusnya menerima nilai di luar range tanpa status error yang jelas.", "Property atau method setter dapat dipakai bila state perlu dikontrol. Namun jangan menambah abstraksi tanpa manfaat. Untuk data pasif yang hanya dipindahkan, dictionary atau dataclass mungkin lebih ringan dan mudah dibaca."],
                ["Inheritance bukan pilihan default", "Inheritance berguna ketika subclass benar-benar merupakan jenis dari parent dan harus memenuhi contract yang sama. Composition sering lebih fleksibel: object menerima validator atau formatter sebagai komponen, bukan mewarisi banyak behavior yang tidak dibutuhkan.", "Pada sistem AI, wrapper model atau evaluator dapat berbagi interface predict atau evaluate, tetapi detail provider berbeda. Contract yang kecil memudahkan pertukaran implementasi dan test menggunakan fake object." ]
            ],
            workedExample: ["DatasetReport", ["State", "name, version, dan summary."], ["Invariant", "Nama tidak kosong dan summary berbentuk dictionary."], ["Method", "validate, add_metric, dan export_text."], ["Test", "Buat dua instance untuk memastikan state tidak tercampur."]],
            glossary: [["Class", "Blueprint untuk membuat object."], ["Object", "Instance dari class."], ["Method", "Function yang terkait dengan object."], ["Encapsulation", "Menjaga state melalui contract yang jelas."], ["Composition", "Membangun object dari beberapa komponen kecil."]],
            quickCheck: { question: "Dalam OOP, object adalah...", options: ["Instance dari class", "Blueprint", "Package"], answer: 0, explanationCorrect: "Tepat. Class mendefinisikan blueprint; object adalah instance-nya.", explanationWrong: "Bedakan definisi umum dengan hasil yang dibuat dari definisi tersebut." },
            challenge: { instruction: "Buat class DatasetReport dengan validasi nama dan method menambah metric.", placeholder: "class DatasetReport:\n    ...", example: "__init__ memvalidasi name; add_metric menyimpan nilai; summary mengembalikan salinan data." },
            mistakes: ["Membuat class untuk setiap nilai", "State global dibagi semua instance", "Inheritance terlalu dalam"], bestPractices: ["Jaga invariant di constructor", "Utamakan composition", "Buat method sesuai tanggung jawab object"], learningOutcomes: ["Membedakan class dan object", "Menjaga invariant", "Memilih OOP hanya ketika bermanfaat"], transition: "Object yang baik tetap harus menghadapi input rusak, file hilang, dan kegagalan eksternal.", prompt: ["state + behavior -> class", "validate invariant on creation", "prefer composition for flexible parts"]
        },
        {
            hook: { question: "except Exception: pass membuat program lebih tangguh?", answerA: { label: "Ya", text: "Semua error hilang dari layar.", icon: "fas fa-eye-slash" }, answerB: { label: "Tidak", text: "Kegagalan tersembunyi dan data dapat menjadi salah.", icon: "fas fa-triangle-exclamation" }, message: "Program tangguh bukan program yang diam. Ia menangkap error yang dipahami, memberi konteks, dan menentukan recovery yang aman." },
            flow: [["Attempt", "Jalankan operasi berisiko"], ["Catch", "Tangkap exception spesifik"], ["Explain", "Berikan pesan yang dapat ditindaklanjuti"], ["Recover", "Retry, skip, fallback, atau stop"]],
            deepDive: [
                ["Exception adalah bagian dari contract", "File dapat hilang, schema dapat berubah, dan nilai dapat gagal dikonversi. try/except dipakai di sekitar operasi yang memang dapat gagal, bukan membungkus seluruh program. Tangkap FileNotFoundError, ValueError, atau exception spesifik lain agar response sesuai penyebab.", "Pesan error perlu menyebut apa yang gagal, input yang relevan, dan langkah perbaikan. Jangan menampilkan credential atau data sensitif. Logging teknis dapat lebih rinci, sedangkan pesan peserta harus jelas dan aman."],
                ["File I/O membutuhkan lifecycle dan encoding", "with open(...) memastikan file ditutup meski proses gagal. Mode r membaca, w menimpa, dan a menambahkan. Karena w dapat merusak raw data, output cleaning harus menggunakan path baru dan ideally pemeriksaan apakah tujuan sudah ada.", "Encoding UTF-8 mencegah banyak masalah karakter Indonesia. Pathlib membantu membangun path lintas sistem operasi. Sebelum membaca, validasi keberadaan file; setelah menulis, periksa bahwa output dapat dibuka kembali dan jumlah record sesuai harapan."],
                ["Recovery harus eksplisit", "Tidak semua error boleh dilewati. Record individual yang invalid dapat dicatat dan dilewati, tetapi schema utama yang hilang sebaiknya menghentikan pipeline. Retry cocok untuk kegagalan sementara, bukan input permanen yang salah.", "finally dipakai untuk cleanup yang harus selalu terjadi. Dalam banyak operasi file, context manager sudah menangani cleanup sehingga finally tambahan tidak diperlukan. Pilih mekanisme paling sederhana yang tetap menjaga resource dan data." ]
            ],
            workedExample: ["Membaca participants.csv", ["Precheck", "Pastikan path ada dan extension sesuai."], ["Read", "Gunakan context manager atau Pandas dengan encoding jelas."], ["Validate", "Periksa header dan tipe dasar."], ["Recover", "File hilang memberi instruksi; schema buruk menghentikan cleaning."]],
            glossary: [["Exception", "Object yang mewakili kegagalan runtime."], ["Traceback", "Jejak pemanggilan menuju lokasi error."], ["Context manager", "Pengelola resource melalui blok with."], ["Encoding", "Aturan mengubah karakter menjadi byte."], ["Recovery", "Tindakan aman setelah kegagalan."]],
            quickCheck: { question: "Mengapa memakai with saat membuka file?", options: ["File ditutup otomatis", "Semua error hilang", "Path tidak diperlukan"], answer: 0, explanationCorrect: "Benar. Context manager menjaga lifecycle file.", explanationWrong: "Pikirkan resource apa yang harus selalu dibersihkan." },
            challenge: { instruction: "Baca file score dan tangani file hilang, nilai invalid, serta output yang tidak boleh menimpa raw.", placeholder: "try:\n    ...\nexcept FileNotFoundError:\n    ...", example: "Input dibaca dari participants.csv; hasil ditulis ke participants_clean.csv; exception spesifik memberi pesan recovery." },
            mistakes: ["except kosong", "Menimpa raw file", "Pesan error tanpa recovery"], bestPractices: ["Tangkap exception spesifik", "Gunakan with dan UTF-8", "Pisahkan raw dan derived output"], learningOutcomes: ["Mendesain error handling", "Membaca file dengan aman", "Memilih recovery sesuai dampak"], transition: "Data sudah dapat dibaca dengan aman; berikutnya library numerik mempercepat operasi array.", prompt: ["catch only understood exceptions", "message = cause + context + recovery", "never overwrite raw data"]
        },
        {
            hook: { question: "NumPy hanya list Python dengan nama lain?", answerA: { label: "Sama", text: "Keduanya menyimpan banyak angka.", icon: "fas fa-list" }, answerB: { label: "Berbeda", text: "Array memiliki shape, dtype, dan operasi vectorized.", icon: "fas fa-border-all" }, message: "NumPy memberi struktur numerik homogen dan operasi teroptimasi. Shape dan dtype menjadi contract penting sebelum data masuk model." },
            flow: [["Array", "Bangun data numerik"], ["Inspect", "Periksa shape dan dtype"], ["Vectorize", "Terapkan operasi tanpa loop manual"], ["Summarize", "Hitung statistik dan validasi"]],
            deepDive: [
                ["Ekosistem Python dibagi berdasarkan tanggung jawab", "Standard library menangani path, JSON, tanggal, dan utilitas dasar. NumPy fokus pada array numerik, Pandas pada data tabular, visualisasi pada chart, dan framework ML pada model. Memahami batas ini mencegah peserta memakai library besar untuk masalah kecil atau mencampur layer tanpa alasan.", "Import sebaiknya eksplisit dan dependency dicatat. Alias umum seperti np dan pd membantu komunikasi tim, tetapi pembaca tetap harus tahu object berasal dari library mana. Hindari wildcard import karena asal function menjadi tidak jelas."],
                ["Array memiliki shape dan dtype", "Shape menjelaskan jumlah elemen pada setiap dimensi. Vector satu dimensi, matrix dua dimensi, dan tensor dapat memiliki lebih banyak dimensi. Banyak error AI berasal dari shape yang tidak sesuai, sehingga pemeriksaan shape harus dilakukan sebelum operasi atau pemanggilan model.", "Dtype menentukan representasi nilai dan kebutuhan memori. Campuran angka dan teks dapat membuat array bertipe object atau string, lalu operasi statistik gagal atau memberi hasil mengejutkan. Bersihkan dan konversi data secara eksplisit."],
                ["Vectorization mengubah cara berpikir", "Operasi scores / 100 diterapkan ke seluruh array tanpa menulis loop per elemen. Selain ringkas, implementasi vectorized biasanya berjalan pada kode teroptimasi. Boolean mask seperti scores >= 75 menghasilkan array kondisi yang dapat dipakai untuk filtering.", "Missing numeric value sering direpresentasikan sebagai NaN. np.mean dapat menghasilkan NaN, sedangkan np.nanmean mengabaikannya. Mengabaikan bukan selalu keputusan yang benar; tim tetap harus menghitung berapa missing dan menjelaskan kebijakan yang dipakai." ]
            ],
            workedExample: ["Audit array score", ["Create", "Konversi score valid menjadi array float."], ["Inspect", "Cetak shape, dtype, dan jumlah NaN."], ["Compute", "Mean, median, min, max, serta normalization."], ["Validate", "Bandingkan jumlah input dan output statistik."]],
            glossary: [["Array", "Struktur numerik multidimensi."], ["Shape", "Ukuran pada setiap dimensi."], ["Dtype", "Tipe penyimpanan elemen array."], ["Vectorization", "Operasi pada banyak elemen sekaligus."], ["Boolean mask", "Array kondisi untuk memilih elemen."]],
            quickCheck: { question: "Apa yang dijelaskan scores.shape?", options: ["Dimensi array", "Nama file", "Versi Python"], answer: 0, explanationCorrect: "Tepat. Shape menunjukkan ukuran setiap dimensi.", explanationWrong: "Cari metadata yang menjelaskan struktur array." },
            challenge: { instruction: "Audit array score dengan NaN: tampilkan shape, dtype, valid count, mean, median, dan normalization.", placeholder: "scores = np.array([...])\n...", example: "Hitung missing secara terpisah, lalu gunakan operasi nan-aware hanya dengan alasan yang terdokumentasi." },
            mistakes: ["Tidak memeriksa shape", "Mencampur string dan angka", "Mengabaikan NaN tanpa mencatatnya"], bestPractices: ["Inspect shape dan dtype", "Gunakan vectorization", "Dokumentasikan kebijakan missing"], learningOutcomes: ["Membaca contract array", "Menggunakan operasi vectorized", "Menghitung statistik secara sadar missing value"], transition: "Array kuat untuk numerik; Pandas menambahkan label kolom dan workflow cleaning tabular.", prompt: ["inspect shape + dtype", "validate missing", "vectorize transformations", "reconcile counts"]
        },
        {
            hook: { question: "Dataset tanpa missing otomatis siap untuk AI?", answerA: { label: "Siap", text: "Tidak ada sel kosong berarti bersih.", icon: "fas fa-circle-check" }, answerB: { label: "Belum", text: "Duplikat, range, label, leakage, dan representasi masih perlu diaudit.", icon: "fas fa-magnifying-glass-chart" }, message: "Cleaning adalah rangkaian keputusan. Dataset clean secara teknis belum otomatis valid, adil, atau relevan." },
            flow: [["Load", "Baca raw tanpa menimpa"], ["Inspect", "Shape, schema, type, missing"], ["Clean", "Aturan eksplisit dan terukur"], ["Validate", "Rekonsiliasi perubahan"], ["Save", "Simpan output dan report"]],
            deepDive: [
                ["DataFrame memberi label pada data tabular", "DataFrame menyimpan baris dan kolom dengan nama, tipe, serta index. Setelah read_csv, jangan langsung membuat model. Periksa head untuk contoh baris, shape untuk ukuran, columns untuk schema, dtypes untuk tipe, dan missing count untuk kelengkapan.", "describe memberi statistik awal tetapi tidak menggantikan pemahaman domain. Nilai rata-rata yang terlihat wajar dapat menyembunyikan outlier, unit yang salah, atau kelompok kecil yang tidak terwakili."],
                ["Cleaning harus memiliki alasan dan audit trail", "dropna, fillna, drop_duplicates, dan type conversion adalah keputusan yang dapat mengubah makna data. Missing score tidak selalu boleh diisi nol karena nol adalah nilai nyata. Median mungkin masuk akal pada latihan, tetapi pada keputusan penting tim harus memahami mekanisme missing dan dampaknya.", "Simpan jumlah raw, duplicate, invalid type, out-of-range, missing, dan clean. Angka akhir harus dapat direkonsiliasi. Simpan output ke file baru dan catat versi aturan agar proses dapat diulang pada dataset berikutnya."],
                ["Pipeline memisahkan load, validate, clean, summarize, dan save", "Setiap tahap menerima input dan mengembalikan output yang jelas. load_data hanya membaca; validate_schema memastikan kolom; clean_data membuat salinan dan menerapkan aturan; build_report menghitung perubahan; save_outputs menulis derived files. Pemisahan ini membuat test dan diagnosis jauh lebih mudah.", "Sebelum output dipakai model, periksa leakage, label quality, representasi kelompok, relevansi fitur, dan perubahan distribusi. Data bersih berarti aturan cleaning berhasil dijalankan—bukan bukti bahwa dataset sudah adil atau cukup untuk menjawab use case." ]
            ],
            workedExample: ["Dataset nilai workshop", ["Load", "Baca participants.csv sebagai raw input."], ["Validate", "Pastikan name, track, dan score tersedia."], ["Clean", "Salin, deduplicate, convert score, filter range."], ["Report", "Rekonsiliasi raw hingga clean dan agregasi per track."], ["Save", "Tulis participants_clean.csv, track_summary.csv, dan report.txt."]],
            glossary: [["DataFrame", "Tabel berlabel baris dan kolom."], ["Missing value", "Nilai yang tidak tersedia."], ["Data leakage", "Informasi yang seharusnya tidak tersedia masuk ke proses model."], ["Audit trail", "Catatan perubahan data dan alasannya."], ["Derived data", "Data baru hasil transformasi raw data."]],
            quickCheck: { question: "Mengapa raw dataset tidak boleh ditimpa?", options: ["Agar transformasi dapat diaudit dan diulang", "Karena Pandas tidak bisa menulis", "Agar folder lebih banyak"], answer: 0, explanationCorrect: "Benar. Raw data menjadi baseline untuk audit dan reproduksi.", explanationWrong: "Pikirkan bagaimana tim membuktikan perubahan bila input asli hilang." },
            challenge: { instruction: "Rancang pipeline load, validate, clean, summarize, dan save beserta audit count setiap tahap.", placeholder: "def load_data(...):\n...\nAudit count: ...", example: "Raw 100 = clean 90 + duplicate 3 + missing 4 + invalid 3; seluruh output ditulis ke file baru." },
            mistakes: ["Menimpa raw dataset", "Mengisi semua missing dengan nol", "Menganggap clean berarti representatif"], bestPractices: ["Inspect sebelum transform", "Rekonsiliasi jumlah baris", "Versikan rule dan output"], learningOutcomes: ["Mengaudit DataFrame", "Mendesain cleaning yang dapat dijelaskan", "Membangun mini workflow end-to-end"], transition: "Fondasi Python selesai. Practice, quiz, dan diskusi berikutnya menguji workflow yang sama secara progresif.", prompt: ["load -> inspect -> validate", "clean a copy", "report every change", "save derived outputs", "review leakage + representation"]
        }
    ];

    CHAPTERS.forEach(function (chapter, index) {
        Object.assign(chapter, PYTHON_GUIDES[index]);
    });



    const PRACTICES = [
    {
        "id": "PRACTICE-1",
        "prompt": "**Tujuan:** melatih kemampuan memilih apakah suatu masalah memerlukan deep learning.\\n\\n**Tingkat kesulitan:** Dasar\\n\\nGunakan tiga kasus berikut:\\n\\n1. Prediksi kelulusan dari 500 baris data tabular.\n2. Klasifikasi 100.000 gambar produk.\n3. Deteksi spam dari 2.000 email.\\n\\nUntuk setiap kasus:\\n\\n- Tuliskan kandidat model awal yang paling sederhana.\n- Jelaskan alasan pemilihannya.\n- Jelaskan kapan deep learning baru layak dicoba.\n- Tuliskan risiko penggunaan deep learning.\\n\\n**Hasil yang dikumpulkan:** tabel berisi kasus, pendekatan awal, alasan, dan risiko penggunaan deep learning.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-2",
        "prompt": "**Tujuan:** mengenali bentuk tensor dan jumlah parameter pada neural network sederhana.\\n\\n**Tingkat kesulitan:** Dasar\\n\\nGunakan arsitektur berikut:\\n\\n```text\nInput 20 fitur\n→ Hidden layer 16 neuron\n→ Hidden layer 8 neuron\n→ Output 3 kelas\n```\\n\\nKerjakan hal berikut:\\n\\n1. Hitung jumlah parameter pada setiap layer.\n2. Tentukan activation function yang masuk akal untuk hidden dan output layer.\n3. Jelaskan bentuk output untuk satu sampel.\\n\\n**Hasil yang dikumpulkan:** perhitungan parameter, pilihan activation function, dan penjelasan bentuk output.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-3",
        "prompt": "**Tujuan:** melihat hubungan antara prediksi, loss, dan pembaruan parameter.\\n\\n**Tingkat kesulitan:** Dasar\\n\\nGunakan nilai berikut:\\n\\n```text\nx = 2\nw = 0.5\nb = 0\ntarget y = 3\n```\\n\\nKerjakan:\\n\\n1. Hitung prediksi linear `y_hat = x × w + b`.\n2. Hitung squared error `(y_hat - y)²`.\n3. Ubah `w` menjadi `1.0`, kemudian hitung kembali prediksi dan loss.\n4. Jelaskan perubahan mana yang membuat prediksi lebih dekat dengan target.\\n\\n**Hasil yang dikumpulkan:** perhitungan dua percobaan dan kesimpulan singkat.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-4",
        "prompt": "**Tujuan:** membaca pola loss dan accuracy untuk menentukan tindakan berikutnya.\\n\\n**Tingkat kesulitan:** Menengah\\n\\nAnalisis tiga skenario berikut:\\n\\n1. Training loss dan validation loss sama-sama turun.\n2. Training loss turun, tetapi validation loss naik.\n3. Training loss dan validation loss sama-sama datar.\\n\\nUntuk setiap skenario:\\n\\n- Jelaskan diagnosis yang paling mungkin.\n- Tuliskan dua tindakan yang dapat dicoba.\\n\\n**Hasil yang dikumpulkan:** tabel diagnosis dan tindakan untuk setiap skenario.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-5",
        "prompt": "**Tujuan:** menyusun intervensi bertahap untuk model yang menghafal data training.\\n\\n**Tingkat kesulitan:** Menengah\\n\\nGunakan skenario berikut:\\n\\n```text\nTraining accuracy: 99%\nValidation accuracy: 72%\n```\\n\\nKerjakan:\\n\\n1. Susun urutan tiga eksperimen dari yang paling murah.\n2. Tentukan metrik yang diamati dan kriteria keberhasilan.\n3. Jelaskan mengapa mengubah banyak hal sekaligus membuat eksperimen sulit dianalisis.\\n\\n**Hasil yang dikumpulkan:** rencana eksperimen berurutan lengkap dengan hipotesis dan metrik.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-6",
        "prompt": "**Tujuan:** menyusun CNN kecil yang sesuai dengan ukuran data dan jumlah kelas.\\n\\n**Tingkat kesulitan:** Menengah\\n\\nGunakan kebutuhan berikut:\\n\\n```text\nInput: gambar RGB 128 × 128\nJumlah kelas: 5\n```\\n\\nKerjakan:\\n\\n1. Rancang dua blok convolution dan satu output layer.\n2. Tuliskan bentuk output setelah setiap tahap secara kasar.\n3. Tambahkan satu strategi regularisasi.\n4. Jelaskan alasan desain tersebut.\\n\\n**Hasil yang dikumpulkan:** diagram arsitektur, alasan desain, dan estimasi perubahan bentuk tensor.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-7",
        "prompt": "**Tujuan:** mengenali input-output pada masalah berurutan.\\n\\n**Tingkat kesulitan:** Dasar\\n\\nGunakan tiga kasus berikut:\\n\\n1. Sentiment analysis.\n2. Prediksi suhu harian.\n3. Named entity recognition.\\n\\nUntuk setiap kasus:\\n\\n- Tentukan bentuk input dan output.\n- Tentukan apakah masalahnya many-to-one atau many-to-many.\n- Jelaskan satu risiko preprocessing yang dapat merusak urutan.\\n\\n**Hasil yang dikumpulkan:** tabel kasus, bentuk sequence, tipe mapping, dan risiko preprocessing.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-8",
        "prompt": "**Tujuan:** mengomunikasikan ide self-attention menggunakan bahasa nonteknis.\\n\\n**Tingkat kesulitan:** Menengah\\n\\nGunakan kalimat berikut atau buat contoh serupa:\\n\\n> “Rina memberi buku kepada Sari karena ia lulus.”\\n\\nKerjakan:\\n\\n1. Jelaskan token mana yang perlu saling memperhatikan untuk memahami kata “ia”.\n2. Tuliskan penjelasan self-attention dalam maksimal 150 kata.\\n\\n**Hasil yang dikumpulkan:** penjelasan maksimal 150 kata yang dapat dipahami pemula.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-9",
        "prompt": "**Tujuan:** memilih metrik berdasarkan dampak kesalahan.\\n\\n**Tingkat kesulitan:** Menengah\\n\\nBandingkan dua kasus berikut:\\n\\n1. Deteksi penyakit berisiko tinggi.\n2. Penyaringan komentar spam.\\n\\nUntuk masing-masing kasus:\\n\\n- Jelaskan dampak false positive.\n- Jelaskan dampak false negative.\n- Pilih metrik utama dan metrik pendamping.\n- Jelaskan mengapa accuracy saja mungkin menyesatkan.\\n\\n**Hasil yang dikumpulkan:** analisis dampak kesalahan dan rekomendasi metrik.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    }
];

const QUIZ = [
    [
        "Istilah deep pada deep learning terutama mengacu pada ...",
        [
            "ukuran dataset",
            "jumlah lapisan pemrosesan",
            "panjang kode",
            "jenis komputer"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Komponen yang dipelajari langsung selama training adalah ...",
        [
            "batch size",
            "learning rate",
            "weight dan bias",
            "jumlah epoch"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Activation function dibutuhkan terutama untuk ...",
        [
            "menambah data",
            "memberi non-linearitas",
            "membagi dataset",
            "menyimpan checkpoint"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Fungsi utama loss adalah ...",
        [
            "mengukur kesalahan prediksi",
            "memperbesar input",
            "memilih batch",
            "menghapus noise"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Backpropagation digunakan untuk ...",
        [
            "membagi data",
            "menghitung gradient",
            "melakukan augmentation",
            "menambah kelas"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Learning rate terlalu besar sering menyebabkan ...",
        [
            "loss tidak stabil",
            "parameter tidak berubah sama sekali",
            "dataset bertambah",
            "output selalu satu kelas karena softmax"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Training accuracy sangat tinggi tetapi validation accuracy rendah adalah tanda ...",
        [
            "underfitting",
            "overfitting",
            "data augmentation",
            "normalisasi"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Dropout bekerja dengan cara ...",
        [
            "menghapus label",
            "menonaktifkan neuron secara acak saat training",
            "memperbesar gambar",
            "mengganti optimizer"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "CNN efektif untuk gambar karena ...",
        [
            "mengabaikan posisi piksel",
            "memakai filter lokal dan weight sharing",
            "selalu memiliki parameter paling banyak",
            "tidak memerlukan data"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Pooling biasanya digunakan untuk ...",
        [
            "memperbesar resolusi",
            "mengurangi ukuran feature map",
            "menambah kelas",
            "menghitung loss"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Transfer learning berarti ...",
        [
            "memindahkan file dataset",
            "memakai pengetahuan model pralatih",
            "mengganti bahasa pemrograman",
            "menghapus semua weight"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Hidden state pada RNN berfungsi sebagai ...",
        [
            "ringkasan konteks sebelumnya",
            "label tambahan",
            "loss function",
            "jenis optimizer"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Self-attention membantu setiap token ...",
        [
            "menghapus token lain",
            "mempertimbangkan token lain secara langsung",
            "selalu fokus pada token terdekat",
            "menjadi gambar"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Positional encoding dibutuhkan karena ...",
        [
            "attention tidak otomatis mengetahui urutan",
            "embedding terlalu kecil",
            "optimizer tidak mengenal token",
            "loss tidak memiliki gradient"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Test set sebaiknya digunakan ...",
        [
            "untuk update weight",
            "berulang kali memilih hyperparameter",
            "untuk evaluasi akhir",
            "sebagai augmentation"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Recall penting ketika ...",
        [
            "false negative mahal",
            "false positive satu-satunya masalah",
            "semua kelas seimbang pasti",
            "tidak ada label"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Data leakage terjadi ketika ...",
        [
            "training lambat",
            "informasi test masuk ke proses training",
            "batch size kecil",
            "model disimpan"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Tes overfit batch kecil berguna untuk ...",
        [
            "mengecek apakah model dan pipeline bisa belajar",
            "mengukur performa final",
            "membuat dataset lebih besar",
            "menghapus gradient"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Model terbaik untuk produk nyata selalu ...",
        [
            "model terbesar",
            "model paling baru",
            "model dengan kompromi kualitas, biaya, dan latency yang tepat",
            "model dengan epoch terbanyak"
        ],
        0,
        "Penjelasan belum tersedia."
    ],
    [
        "Eksperimen yang baik sebaiknya ...",
        [
            "mengubah semua hal sekaligus",
            "tidak mencatat konfigurasi",
            "mengubah satu faktor utama setiap kali",
            "hanya melihat training accuracy"
        ],
        0,
        "Penjelasan belum tersedia."
    ]
];

    const DISCUSSION_PROMPTS = [
        "Mengapa Python dominan dalam AI meskipun bukan selalu bahasa dengan runtime tercepat?",
        "Kapan notebook membantu eksplorasi, dan kapan hidden state membuat hasil sulit dipercaya?",
        "Apakah menghapus missing value selalu benar? Bukti apa yang diperlukan sebelum memilih aturan cleaning?",
        "Dataset tanpa missing value apakah otomatis siap untuk Machine Learning?"
    ];

var SOURCE_VISUALS = {
        "01-topic.html": { eyebrow: "Workflow Map", title: "Dari masalah ke program yang dapat diulang", description: "Lihat peran Python pada setiap lapisan workflow AI.", options: [["Problem", "fas fa-bullseye", "Tujuan", "Definisikan pengguna, input, output, dan failure case sebelum memilih library.", "Completion rate harus menangani total peserta nol."], ["Environment", "fas fa-box-archive", "Reproducibility", "Isolasi versi Python dan dependency agar hasil dapat dibangun ulang.", "Gunakan virtual environment dan dependency file."], ["Code", "fas fa-code", "Orchestration", "Python menghubungkan data, library, eksperimen, dan aplikasi.", "Komputasi berat dapat berjalan di library teroptimasi."], ["Evidence", "fas fa-clipboard-check", "Verifikasi", "Jalankan dari awal dan pastikan output tidak bergantung pada state tersembunyi.", "Restart-and-run-all pada notebook."]] },
        "02-topic.html": { eyebrow: "Data Model Lab", title: "Pilih struktur dari perilakunya", description: "Tipe data menentukan operasi, validasi, dan risiko perubahan state.", options: [["Scalar", "fas fa-hashtag", "Satu nilai", "Gunakan str, int, float, bool, atau None sesuai maknanya.", "Score kosong bukan otomatis nol."], ["Sequence", "fas fa-list", "Urutan", "List menyimpan record berurutan dan dapat berubah.", "Daftar peserta diproses satu per satu."], ["Mapping", "fas fa-diagram-project", "Field bernama", "Dictionary membuat schema record lebih eksplisit.", "name, track, dan score menyerupai object JSON."], ["Set", "fas fa-filter", "Keunikan", "Set berguna untuk membership dan deduplikasi sederhana.", "Jangan pakai bila urutan harus dipertahankan."]] },
        "03-topic.html": { eyebrow: "Decision Lab", title: "Urutan guard menentukan correctness", description: "Ikuti record dari validasi menuju klasifikasi dan laporan.", options: [["Missing", "fas fa-circle-question", "Guard pertama", "Pisahkan nilai yang tidak tersedia sebelum operasi numerik.", "None tidak dapat dibandingkan dengan 75."], ["Type", "fas fa-font", "Guard kedua", "Pastikan score benar-benar numerik.", "String '80' perlu konversi yang tervalidasi."], ["Range", "fas fa-arrows-left-right", "Guard ketiga", "Periksa score berada pada domain 0–100.", "-1 dan 101 ditolak dengan alasan."], ["Classify", "fas fa-code-branch", "Keputusan", "Baru setelah valid, tentukan lulus atau review.", "Uji boundary 74.9 dan 75."]] },
        "04-topic.html": { eyebrow: "Function Pipeline", title: "Satu tanggung jawab per function", description: "Rangkai contract kecil menjadi pipeline yang mudah diuji.", options: [["Validate", "fas fa-shield", "Input contract", "Periksa missing, type, dan range tanpa mencampur presentasi.", "validate_score mengembalikan status jelas."], ["Transform", "fas fa-gears", "Pure logic", "Ubah input valid menjadi hasil yang dapat dipakai tahap berikutnya.", "classify_score tidak menulis file."], ["Summarize", "fas fa-chart-simple", "Aggregation", "Hitung statistik dari kumpulan nilai valid.", "Boundary diuji terpisah."], ["Compose", "fas fa-link", "Pipeline", "Function orkestrasi mengatur urutan dan error recovery.", "load → validate → classify → summarize."]] },
        "05-topic.html": { eyebrow: "Object Design", title: "Kapan state layak menjadi object", description: "Bedakan record sederhana dari object yang memiliki invariant dan behavior.", options: [["State", "fas fa-box", "Data object", "Simpan nilai yang memiliki lifecycle bersama.", "DatasetReport menyimpan name dan summary."], ["Invariant", "fas fa-lock", "Aturan valid", "Constructor menjaga object tidak lahir dalam kondisi rusak.", "Nama dataset tidak boleh kosong."], ["Method", "fas fa-screwdriver-wrench", "Behavior", "Letakkan operasi yang benar-benar terkait dengan state.", "add_metric memperbarui report."], ["Composition", "fas fa-cubes-stacked", "Komponen", "Gabungkan validator atau exporter tanpa inheritance berlebihan.", "Implementasi mudah diganti saat test."]] },
        "06-topic.html": { eyebrow: "Failure Recovery", title: "Error yang jelas lebih aman daripada diam", description: "Pilih response berdasarkan jenis dan dampak kegagalan.", options: [["Detect", "fas fa-magnifying-glass", "Exception spesifik", "Tangkap kegagalan yang benar-benar dipahami.", "FileNotFoundError berbeda dari ValueError."], ["Explain", "fas fa-message", "Actionable message", "Sebutkan penyebab, konteks aman, dan langkah perbaikan.", "Jangan bocorkan credential."], ["Recover", "fas fa-life-ring", "Tindakan", "Retry, skip, fallback, atau stop dipilih sesuai risiko.", "Schema hilang harus menghentikan cleaning."], ["Protect", "fas fa-file-shield", "Raw data", "Gunakan with dan tulis output ke path baru.", "participants_clean.csv tidak menimpa raw."]] },
        "07-topic.html": { eyebrow: "Array Inspector", title: "Shape dan dtype adalah contract", description: "Audit struktur numerik sebelum melakukan statistik atau modeling.", options: [["Shape", "fas fa-border-all", "Dimensi", "Pastikan ukuran array sesuai operasi berikutnya.", "Vector dan matrix mempunyai contract berbeda."], ["Dtype", "fas fa-tag", "Representasi", "Tipe elemen menentukan operasi dan penggunaan memori.", "Campuran teks dapat mengubah dtype."], ["Vectorize", "fas fa-bolt", "Operasi massal", "Terapkan transformasi tanpa loop manual.", "scores / 100 bekerja pada seluruh array."], ["Missing", "fas fa-circle-exclamation", "NaN policy", "Hitung missing dan jelaskan keputusan nan-aware.", "np.nanmean bukan alasan mengabaikan kualitas data."]] },
        "08-topic.html": { eyebrow: "Data Workflow", title: "Cleaning yang dapat diaudit", description: "Ikuti raw data sampai output bersih dan report yang dapat direkonsiliasi.", options: [["Load", "fas fa-file-csv", "Raw input", "Baca file tanpa menimpa atau mengubah baseline.", "Simpan path dan versi input."], ["Inspect", "fas fa-magnifying-glass-chart", "Data profiling", "Periksa shape, schema, dtype, missing, duplicate, dan range.", "Jangan langsung membangun model."], ["Clean", "fas fa-broom", "Rules", "Terapkan aturan pada salinan dan catat alasan perubahan.", "Missing tidak selalu diisi nol."], ["Report", "fas fa-file-lines", "Audit trail", "Rekonsiliasi raw, removed, dan clean lalu simpan derived output.", "Data clean belum otomatis representatif."]] }
    };

    function getSourceFile(path) {
        return String(path || "").split("/").pop();
    }

    function renderSourceVisualLab(config) {
        if (!config) return "";
        return `<section class="reasoning-concept-lab" data-python-injected aria-label="${escapeHtml(config.title)}">
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

    function setupBeginnerRoadmap(container) {
        var roadmaps = container.querySelectorAll(".ai-modern-beginner-roadmap");
        roadmaps.forEach(function(roadmap) {
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
            if (bar && steps.length) bar.style.width = Math.round(100 / steps.length) + "%";
        });
    }

    function renderPythonDeepDive(module) {
        if (!module) return "";
        var parts = [];

        if (module.deepDive && module.deepDive.length) {
            var roadmapHtml = '<section class="ai-modern-beginner-roadmap" data-python-injected data-section="konsep">' +
                '<div class="ai-modern-roadmap-head"><i class="fas fa-compass" aria-hidden="true"></i><div><span>Jalur Pemula</span><h3>Memahami konsep, bukan menghafal sintaks</h3><p>Gunakan penjelasan berikut untuk menghubungkan kode, data, failure case, dan keputusan dalam workflow AI.</p></div></div>' +
                '<div class="ai-modern-roadmap-strip" aria-hidden="true">' + module.deepDive.map(function (step, index) { return '<div><span>' + (index + 1) + '</span><i class="fas fa-book-open-reader"></i><strong>' + escapeHtml(step[0]) + '</strong></div>'; }).join("") + '</div>' +
                '<div class="ai-modern-roadmap-progress"><span data-roadmap-progress>Langkah 1 dari ' + module.deepDive.length + '</span><b><i data-roadmap-bar></i></b></div>' +
                '<div class="ai-modern-roadmap-steps">' + module.deepDive.map(function (step, index) {
                    return '<details data-roadmap-step="' + index + '"' + (index === 0 ? " open" : "") + '><summary><span>' + String(index + 1).padStart(2, "0") + '</span><i class="fas fa-book-open-reader" aria-hidden="true"></i><div><strong>' + escapeHtml(step[0]) + '</strong></div><i class="fas fa-chevron-down" aria-hidden="true"></i></summary><div class="ai-modern-roadmap-body"><p>' + escapeHtml(step[1]) + '</p>' + (step[2] ? '<p>' + escapeHtml(step[2]) + '</p>' : '') + '</div></details>';
                }).join("") + '</div></section>';
            parts.push(roadmapHtml);
        }

        if (module.workedExample && module.workedExample.length) {
            var title = module.workedExample[0];
            var steps = module.workedExample.slice(1);
            var exampleHtml = '<section class="ai-modern-worked-example" data-python-injected data-section="contoh"><div class="ai-modern-worked-head"><i class="fas fa-magnifying-glass-chart" aria-hidden="true"></i><div><span>Contoh Terurai</span><h3>' + escapeHtml(title) + '</h3></div></div><div class="ai-modern-worked-steps">' + steps.map(function (step, index) { return '<article><span>' + (index + 1) + '</span><div><strong>' + escapeHtml(step[0]) + '</strong><p>' + escapeHtml(step[1]) + '</p></div></article>'; }).join("") + '</div></section>';
            parts.push(exampleHtml);
        }

        if (module.glossary && module.glossary.length) {
            var glossaryHtml = '<section class="ai-modern-beginner-glossary" data-python-injected data-section="ringkasan"><div class="ai-modern-glossary-head"><i class="fas fa-language" aria-hidden="true"></i><div><span>Glossary Pemula</span><h3>Istilah yang perlu kamu kuasai</h3><p>Buka setiap istilah untuk mengulang definisinya sebelum lanjut.</p></div></div><div class="ai-modern-glossary-grid">' + module.glossary.map(function (item, index) { return '<details' + (index === 0 ? " open" : "") + '><summary><span>' + String(index + 1).padStart(2, "0") + '</span><strong>' + escapeHtml(item[0]) + '</strong><i class="fas fa-chevron-down" aria-hidden="true"></i></summary><p>' + escapeHtml(item[1]) + '</p></details>'; }).join("") + '</div></section>';
            parts.push(glossaryHtml);
        }

        return parts.join("\n");
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
            if (!h2.closest(".reasoning-end-of-chapter, .reasoning-scaffold-module-meta")) {
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
                wrapper.innerHTML = '<div data-python-injected><i class="fas fa-code"></i><span>Snippet Python</span></div>';
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

    function escapeHtml(value) {
        return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function escapeSelector(value) {
        return String(value || "").replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, "\\$&");
    }

    function safeJsonParse(value, fallback) {
        try { return JSON.parse(value); } catch (e) { return fallback; }
    }

    function filterSourceHeadings(html) {
        // Hapus module-level H2 headings (Deskripsi Modul, Tujuan Pembelajaran, Peta Pembelajaran)
        // yang hanya relevan di level module overview, bukan per-chapter.
        // Python source tidak punya struktur module heading seperti Reasoning,
        // tapi fungsi ini tetap sebagai safety net jika heading tersebut muncul.
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

    function filterPythonActivityAppendix(html, path) {
        if (getSourceFile(path) !== "08-topic.html") return html;
        var start = html.indexOf("<h1>Practice — Python sebagai Workflow Data</h1>");
        var end = html.indexOf("<h1>Checklist Kesiapan Peserta</h1>");
        if (start === -1 || end === -1 || end <= start) return html;
        return html.slice(0, start) + html.slice(end);
    }

    function sourceText(html) {
        var template = document.createElement("template");
        template.innerHTML = html;
        return String(template.content.textContent || "").replace(/\s+/g, " ").trim();
    }

    function assertPythonSourceIntegrity(container, expectedText) {
        var clone = container.cloneNode(true);
        clone.querySelectorAll("[data-python-injected]").forEach(function (node) { node.remove(); });
        var actual = String(clone.textContent || "").replace(/\s+/g, " ").trim();
        var passed = actual === expectedText;
        container.dataset.sourceIntegrity = passed ? "passed" : "failed";
        if (!passed) console.error("Python source integrity mismatch", { expectedLength: expectedText.length, actualLength: actual.length });
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

    function setStatus(selector, message, tone) {
        const status = document.querySelector(selector);
        if (!status) return;
        status.textContent = message;
        status.dataset.tone = tone || "neutral";
    }

    function renderList(items) {
        if (!items) return "";
        return '<ul>' + items.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul>';
    }

    function renderFlow(items) {
        if (!items) return "";
        return '<div class="reasoning-scaffold-flow reasoning-scaffold-flow--compact">' + items.map(function (item, index) {
            var arrow = index < items.length - 1 ? '<i class="fas fa-arrow-right" aria-hidden="true"></i>' : "";
            return '<div><span>' + escapeHtml(item[0]) + '</span>' + arrow + '<p>' + escapeHtml(item[1]) + '</p></div>';
        }).join("") + '</div>';
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

        var navHtml = '<nav class="reasoning-source-jumps reasoning-visual-nav ai-modern-learning-nav" data-python-injected id="reasoning-visual-nav" aria-label="Tahapan Topik ' + chapterNum + ' dari ' + total + '">' +
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
        return '<div class="reasoning-end-of-chapter" data-python-injected>' + parts.join("\n") + '</div>';
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
                container.innerHTML = '<div class="reasoning-source-error"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><p>Materi Python belum bisa dimuat. Refresh halaman atau periksa kembali route sumber.</p></div>';
            });
    }

    function loadSourceSegment(path, containerId, startHeading, endHeading) {
        var container = document.getElementById(containerId);
        if (!container) return Promise.resolve();
        return fetch(path, { cache: "no-store" }).then(function (response) {
            if (!response.ok) throw new Error("Gagal memuat " + path);
            return response.text();
        }).then(function (html) {
            var start = html.indexOf("<h1>" + startHeading + "</h1>");
            var end = endHeading ? html.indexOf("<h1>" + endHeading + "</h1>") : html.length;
            if (start === -1 || end === -1 || end <= start) throw new Error("Segmen sumber tidak ditemukan: " + startHeading);
            container.innerHTML = html.slice(start, end);
            container.classList.add("is-source-view");
            enhanceSourceMaterialForCanvas(container);
        }).catch(function (error) {
            container.innerHTML = '<div class="reasoning-source-error"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><p>Referensi belum bisa dimuat. Coba refresh halaman.</p></div>';
            console.error(error);
        });
    }

    function finalRenderHookSection(hook) {
        return '<section class="reasoning-hook-section" data-python-injected data-section="hook">\n            <div class="reasoning-hook-head"><i class="fas fa-hand-pointer" aria-hidden="true"></i><div><span>Pembuka</span><h3>' + escapeHtml(hook.question) + '</h3></div></div>\n            <div class="reasoning-hook-options">\n                <button type="button" class="reasoning-hook-card" data-hook-option="a">\n                    <div class="reasoning-hook-card-icon"><i class="' + escapeHtml(hook.answerA.icon) + '" aria-hidden="true"></i></div>\n                    <div><strong>' + escapeHtml(hook.answerA.label) + '</strong><p>' + escapeHtml(hook.answerA.text) + '</p></div>\n                </button>\n                <button type="button" class="reasoning-hook-card" data-hook-option="b">\n                    <div class="reasoning-hook-card-icon"><i class="' + escapeHtml(hook.answerB.icon) + '" aria-hidden="true"></i></div>\n                    <div><strong>' + escapeHtml(hook.answerB.label) + '</strong><p>' + escapeHtml(hook.answerB.text) + '</p></div>\n                </button>\n            </div>\n            <p class="reasoning-hook-message" hidden>' + escapeHtml(hook.message) + '</p>\n        </section>';
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
        return '<section class="reasoning-quick-check" data-section="check" data-check-answer="' + qc.answer + '">\n                <div class="reasoning-quick-head"><i class="fas fa-circle-question" aria-hidden="true"></i><div><span>Quick Check</span><h3>' + escapeHtml(qc.question) + '</h3></div></div>\n                <div class="reasoning-check-options">\n                    ' + qc.options.map(function (option, index) {
                        return '<button type="button" data-check-option="' + index + '"><b>' + String.fromCharCode(65 + index) + '</b><span>' + escapeHtml(option) + '</span></button>';
                    }).join("") + '\n                </div>\n                <div class="reasoning-check-actions">\n                    <button type="button" class="reasoning-check-submit" data-check-submit><i class="fas fa-check" aria-hidden="true"></i> Periksa Jawaban</button>\n                    <button type="button" class="reasoning-check-retry" data-check-retry hidden><i class="fas fa-rotate-left" aria-hidden="true"></i> Coba Lagi</button>\n                </div>\n                <p class="reasoning-check-feedback" hidden></p>\n            </section>';
    }

    function finalRenderChallengeSection(challenge, chapterNumber) {
        var key = 'heraiAiDeepLearningChallengeCh' + chapterNumber;
        return '<section class="reasoning-challenge-workspace" data-section="challenge" data-challenge-workspace="' + key + '">\n                <div class="reasoning-challenge-head"><i class="fas fa-pen-ruler" aria-hidden="true"></i><div><span>Mini Challenge</span><h3>Latihan reflektif</h3></div></div>\n                <p class="reasoning-challenge-instruction">' + escapeHtml(challenge.instruction) + '</p>\n                <textarea class="reasoning-challenge-textarea" data-challenge-textarea="' + key + '" rows="5" placeholder="' + escapeHtml(challenge.placeholder) + '"></textarea>\n                <div class="reasoning-challenge-actions">\n                    <button type="button" class="btn-reasoning-save" data-challenge-save><i class="fas fa-floppy-disk" aria-hidden="true"></i> Simpan</button>\n                    <button type="button" class="btn-reasoning-edit" data-challenge-edit hidden><i class="fas fa-pen" aria-hidden="true"></i> Edit</button>\n                    <button type="button" class="btn-reasoning-reset" data-challenge-reset><i class="fas fa-rotate-left" aria-hidden="true"></i> Reset</button>\n                    <button type="button" class="btn-reasoning-example" data-challenge-example hidden><i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat Contoh</button>\n                </div>\n                <div class="reasoning-challenge-example" data-challenge-example-content hidden><strong>Contoh:</strong><p>' + escapeHtml(challenge.example) + '</p></div>\n            </section>';
    }

    function finalRenderMistakesPractices(mistakes, bestPractices) {
        return '<section class="reasoning-mistakes-practices" data-section="ringkasan">\n                <div class="reasoning-mp-grid">\n                    <div class="reasoning-mp-col reasoning-mp-mistakes">\n                        <h3><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Common Mistakes</h3>\n                        <ul>' + mistakes.map(function (m) { return '<li>' + escapeHtml(m) + '</li>'; }).join("") + '</ul>\n                    </div>\n                    <div class="reasoning-mp-col reasoning-mp-practices">\n                        <h3><i class="fas fa-circle-check" aria-hidden="true"></i> Best Practices</h3>\n                        <ul>' + bestPractices.map(function (bp) { return '<li>' + escapeHtml(bp) + '</li>'; }).join("") + '</ul>\n                    </div>\n                </div>\n            </section>';
    }

    function finalRenderSummarySection(outcomes, transition, chapterNumber, total) {
        var transHtml = transition ? '<div class="reasoning-transition"><i class="fas fa-arrow-right" aria-hidden="true"></i><p><strong>Selanjutnya:</strong> ' + escapeHtml(transition) + '</p></div>' : '';
        return '<section class="reasoning-summary-section" data-section="ringkasan">\n                <div class="reasoning-summary-head"><i class="fas fa-bookmark" aria-hidden="true"></i><div><span>Ringkasan</span><h3>Setelah topik ini, kamu dapat:</h3></div></div>\n                <ul class="reasoning-outcomes-list">' + outcomes.map(function (o) { return '<li><i class="fas fa-circle-check" aria-hidden="true"></i> ' + escapeHtml(o) + '</li>'; }).join("") + '</ul>\n                ' + transHtml + '\n            </section>';
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
        var storageKey = "heraiAiDeepLearningChallengeCh" + chapterNumber;
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
        return '<section class="reasoning-summary-section" data-section="ringkasan">\n            <div class="reasoning-summary-head"><i class="fas fa-bookmark" aria-hidden="true"></i><div><span>Ringkasan</span><h3>Setelah topik ini, kamu dapat:</h3></div></div>\n            <ul class="reasoning-outcome-list">' + outcomeItems + '</ul>\n            ' + transitionHtml + '\n        </section>';
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

    function setupPythonReadinessChecklist(container) {
        var inputs = Array.from(container.querySelectorAll('input[type="checkbox"]'));
        if (!inputs.length) return;
        var saved = safeJsonParse(localStorage.getItem(STORAGE.readiness), []);
        if (!Array.isArray(saved)) saved = [];

        function persist() {
            var completed = inputs.map(function (input, index) { return input.checked ? index : null; }).filter(function (index) { return index !== null; });
            localStorage.setItem(STORAGE.readiness, JSON.stringify(completed));
        }

        inputs.forEach(function (input, index) {
            var item = input.closest("li");
            if (!item) return;
            input.disabled = false;
            input.id = "python-readiness-" + index;
            input.checked = saved.indexOf(index) !== -1;
            input.setAttribute("aria-label", item.textContent.trim());
            item.classList.add("python-readiness-item");
            item.classList.toggle("is-checked", input.checked);
            input.addEventListener("change", function () {
                item.classList.toggle("is-checked", input.checked);
                persist();
            });
            item.addEventListener("click", function (event) {
                if (event.target === input || event.target.closest("a, button")) return;
                input.checked = !input.checked;
                input.dispatchEvent(new Event("change", { bubbles: true }));
            });
        });
    }

    window.loadAiDeepLearningChapter = function (chapterNumber) {
        var total = CHAPTERS.length;
        var chapter = Math.min(Math.max(Number(chapterNumber) || 1, 1), total);
        var module = CHAPTERS[chapter - 1];
        var container = document.getElementById("reasoning-chapter-container");
        var btnPrev = document.getElementById("btn-prev-chapter");
        var btnNext = document.getElementById("btn-next-chapter");
        var btnFinish = document.getElementById("btn-finish-materi");
        var requestId = ++activeChapterRequest;
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
                if (requestId !== activeChapterRequest) return;
                // 1. Filter module-level headings + strip source numbering
                html = filterSourceHeadings(html);
                html = stripSourceNumbering(html);
                html = filterPythonActivityAppendix(html, module.sourcePath);
                var expectedText = sourceText(html);

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

                var firstSourceHeading = container.querySelector("h1");
                if (firstSourceHeading) firstSourceHeading.insertAdjacentHTML("beforebegin", renderPythonDeepDive(module));

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
                setupBeginnerRoadmap(container);

                // 7. Phase layout — wrap source content, add fase badges
                try {
                    // Debug: check HTML before phaseLayout

                    phaseLayout(container);

                } catch (e) { console.error("phaseLayout:", e); }
                setupPythonReadinessChecklist(container);
                assertPythonSourceIntegrity(container, expectedText);
            })
            .catch(function (error) {
                if (requestId !== activeChapterRequest) return;
                container.innerHTML = '<div class="reasoning-source-error" style="text-align:center;padding:60px"><i class="fas fa-triangle-exclamation" style="font-size:2rem;color:#f63392;margin-bottom:16px"></i><p>Materi belum bisa dimuat. Refresh halaman atau coba lagi.</p></div>';
                console.error(error);
            });

        if (btnPrev) btnPrev.style.display = chapter > 1 ? "inline-block" : "none";
        if (btnNext) btnNext.style.display = chapter < total ? "inline-block" : "none";
        if (btnFinish) btnFinish.style.display = chapter === total ? "inline-block" : "none";

        document.querySelectorAll("#reasoning-sidebar-list li").forEach(function (li) {
            var itemTopik = Number(li.dataset.chapter || "0");
            var icon = li.querySelector("i");
            li.classList.toggle("active", itemTopik === chapter);
            li.classList.toggle("completed", itemTopik < chapter);
            if (!icon) return;
            if (itemTopik === chapter) icon.className = "far fa-circle-play";
            else if (itemTopik < chapter) icon.className = "fas fa-circle-check";
            else icon.className = "far fa-circle";
        });

        updateProgress(chapter, total);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.initAiDeepLearningMateri = function () {
        const total = CHAPTERS.length;
        const initial = Math.min(Math.max(Number(localStorage.getItem(STORAGE.chapter)) || 1, 1), total);
        const list = document.getElementById("reasoning-sidebar-list");
        const btnPrev = document.getElementById("btn-prev-chapter");
        const btnNext = document.getElementById("btn-next-chapter");

        if (list) {
            list.innerHTML = CHAPTERS.map(function (chapter, index) {
                const chapterNumber = index + 1;
                return `<li data-chapter="${chapterNumber}"><span>${chapterNumber}</span><a href="javascript:void(0)" onclick="window.loadAiDeepLearningChapter(${chapterNumber})">${escapeHtml(chapter.shortTitle)}</a><i class="far fa-circle"></i></li>`;
            }).join("");
        }

        if (btnPrev) {
            btnPrev.addEventListener("click", function () {
                const current = Number(localStorage.getItem(STORAGE.chapter)) || initial;
                window.loadAiDeepLearningChapter(Math.max(1, current - 1));
            });
        }

        if (btnNext) {
            btnNext.addEventListener("click", function () {
                const current = Number(localStorage.getItem(STORAGE.chapter)) || initial;
                window.loadAiDeepLearningChapter(Math.min(total, current + 1));
            });
        }

        window.loadAiDeepLearningChapter(initial);
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

    var PRACTICE_TOPICS = [ { start: 0, end: 8, label: "Latihan Modul" } ];

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

    window.initAiDeepLearningPractice = function () {
        const form = document.getElementById("aiDeepLearningPracticeForm");
        const practiceList = document.getElementById("aiDeepLearningPracticeList");
        if (!form || !practiceList) return;

        loadSourceSegment(SOURCE_BASE + "15-full.html", "aiDeepLearningPracticeSource", "Practice — Python sebagai Workflow Data", "Quiz — 20 Soal");
        practiceList.innerHTML = PRACTICES.map(renderPracticeCard).join("");
        const saved = getSavedPractice() || { answers: {}, revealed: [] };
        const savedAnswers = saved.answers || {};
        const revealed = Array.isArray(saved.revealed) ? saved.revealed.slice() : [];
        const navigator = document.getElementById("aiDeepLearningPracticeNavigator");
        const counter = document.getElementById("aiDeepLearningPracticeCounter");
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

        setStatus("#aiDeepLearningPracticeStatus", Object.keys(savedAnswers).length ? "Jawaban latihan dipulihkan dari browsermu." : "Jawaban akan tersimpan di browser ini.", Object.keys(savedAnswers).length ? "success" : "neutral");

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
                setStatus("#aiDeepLearningPracticeStatus", "Pembahasan dan jawaban tersimpan di browser ini.", "success");
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
                setStatus("#aiDeepLearningPracticeStatus", "Latihan Python tersimpan. Kamu bisa lanjut ke kuis atau edit lagi bila perlu.", "success");
            });
        }

        if (editButton) {
            editButton.addEventListener("click", function () {
                form.classList.remove("is-saved");
                form.querySelectorAll("textarea").forEach(field => { field.disabled = false; });
                setStatus("#aiDeepLearningPracticeStatus", "Mode edit aktif. Simpan ulang setelah mengubah jawaban.", "neutral");
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
                setStatus("#aiDeepLearningPracticeStatus", "Jawaban latihan direset dari browser ini.", "warning");
            });
        }
    };

    function getQuizAnswers(form) {
        return QUIZ.reduce(function (acc, _question, index) {
            const checked = form.querySelector('input[name="python-q' + index + '"]:checked');
            acc["python-q" + index] = checked ? checked.value : "";
            return acc;
        }, {});
    }

    function renderQuizResult(score, total, message) {
        const result = document.getElementById("aiDeepLearningQuizResult");
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
        var qnav = document.getElementById("aiDeepLearningQuizNavigator");
        var qprev = form.querySelector("[data-quiz-prev]");
        var qnext = form.querySelector("[data-quiz-next]");
        var qcounter = document.getElementById("aiDeepLearningQuizCounter");
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

        const next = document.getElementById("aiDeepLearningQuizNext");
        if (next) next.classList.remove("is-disabled");
    }

    window.initAiDeepLearningQuiz = function () {
        const form = document.getElementById("aiDeepLearningQuizForm");
        const list = document.getElementById("aiDeepLearningQuizList");
        if (!form || !list) return;

        loadSourceSegment(SOURCE_BASE + "15-full.html", "aiDeepLearningQuizSource", "Quiz — 20 Soal", "Discussion");
        list.innerHTML = QUIZ.map(function (question, index) {
            return `<article data-quiz-index="${index}" tabindex="-1">
                <span>${index + 1}</span>
                <small>Python untuk AI</small>
                <h3>${escapeHtml(question[0])}</h3>
                <div class="reasoning-scaffold-options">
                    ${question[1].map(function (option, optionIndex) {
                        const letter = String.fromCharCode(65 + optionIndex);
                        return `<label><input type="radio" name="python-q${index}" value="${optionIndex}"><span><b>${letter}</b>${escapeHtml(option)}</span></label>`;
                    }).join("")}
                </div>
            </article>`;
        }).join("");

        const navigator = document.getElementById("aiDeepLearningQuizNavigator");
        const counter = document.getElementById("aiDeepLearningQuizCounter");
        const previousButton = form.querySelector("[data-quiz-prev]");
        const nextButton = form.querySelector("[data-quiz-next]");
        let currentQuiz = 0;

        function isQuizAnswered(index) {
            return Boolean(form.querySelector('input[name="python-q' + index + '"]:checked'));
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
        const savedAnswers = safeJsonParse(localStorage.getItem(STORAGE.quizAnswers), {}) || {};
        Object.keys(savedAnswers).forEach(function (name) {
            const input = form.querySelector('input[name="' + escapeSelector(name) + '"][value="' + escapeSelector(savedAnswers[name]) + '"]');
            if (!input) return;
            input.checked = true;
            const label = input.closest("label");
            if (label) label.classList.add("is-selected");
        });
        if (savedDone && Object.keys(savedAnswers).length === QUIZ.length) {
            const savedScore = Number(localStorage.getItem(STORAGE.quizScore)) || 0;
            renderQuizResult(savedScore, QUIZ.length, "Attempt sudah dipakai. Kuis single attempt, jadi jawaban, skor, dan pembahasan dikunci agar review tetap objektif.");
            lockQuiz(form, savedAnswers);
            updateQuizNavigator();
            return;
        }

        if (Object.keys(savedAnswers).length) {
            const firstUnanswered = QUIZ.findIndex((_question, index) => !savedAnswers["python-q" + index]);
            if (firstUnanswered >= 0) showQuiz(firstUnanswered, false);
        }
        if (savedDone && Object.keys(savedAnswers).length < QUIZ.length) {
            renderQuizResult(Number(localStorage.getItem(STORAGE.quizScore)) || 0, QUIZ.length, "Kuis sekarang memiliki 20 soal. Jawaban versi sebelumnya tetap dipulihkan; lengkapi soal baru lalu kirim untuk memperbarui attempt.");
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
                const firstUnanswered = QUIZ.findIndex((_question, index) => !answers["python-q" + index]);
                if (firstUnanswered >= 0) showQuiz(firstUnanswered, true);
                return;
            }

            const score = QUIZ.reduce(function (total, question, index) {
                return total + (Number(answers["python-q" + index]) === question[2] ? 1 : 0);
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
        return [];
    }

    function saveDiscussionPosts(posts) {
        localStorage.setItem(STORAGE.discussion, JSON.stringify(posts));
    }

    function renderDiscussion(posts) {
        const list = document.getElementById("aiDeepLearningDiscussionList");
        if (!list) return;
        if (!posts.length) {
            list.innerHTML = `<div class="python-discussion-empty">
                <i class="far fa-comments" aria-hidden="true"></i>
                <div><strong>Belum ada thread</strong><p>Pilih salah satu prompt, tulis posisi dan alasanmu, lalu mulai diskusi pertama.</p></div>
            </div>`;
            return;
        }
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

    window.initAiDeepLearningDiscussion = function () {
        const form = document.getElementById("aiDeepLearningDiscussionForm");
        const select = form ? form.querySelector("select") : null;
        const textarea = form ? form.querySelector("textarea") : null;
        loadSourceSegment(SOURCE_BASE + "15-full.html", "aiDeepLearningDiscussionSource", "Discussion", "Checklist Kesiapan Peserta");
        renderDiscussion(getDiscussionPosts());

        const promptButtons = document.querySelector(".ml-discussion-prompts");
        if (promptButtons) {
            promptButtons.innerHTML = DISCUSSION_PROMPTS.map(function (prompt, index) {
                const labels = ["Python dan AI", "Notebook vs Program", "Keputusan Cleaning", "Siap untuk ML"];
                const icons = ["fab fa-python", "fas fa-book-open", "fas fa-broom", "fas fa-database"];
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
                setStatus("#aiDeepLearningDiscussionStatus", "Tulis isi diskusi terlebih dahulu.", "warning");
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
            setStatus("#aiDeepLearningDiscussionStatus", "Diskusi berhasil diposting dan tersimpan di browser ini.", "success");
            renderDiscussion(posts);
        });
    };
})();
