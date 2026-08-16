(function () {
    const STORAGE = {
        chapter: "heraiAiPythonCurrentChapter",
        practice: "heraiAiPythonPractice",
        quizDone: "heraiAiPythonQuizDone",
        quizScore: "heraiAiPythonQuizScore",
        quizAnswers: "heraiAiPythonQuizAnswers",
        discussion: "heraiAiPythonDiscussion",
        readiness: "heraiAiPythonReadiness"
    };

    const SOURCE_BASE = "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/";
    const MODULE_ID = 'python-untuk-ai';


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
    "title": "Python & AI Mindset",
    "shortTitle": "Python & AI",
    "duration": "25 menit",
    "icon": "fas fa-brain",
    "summary": "Pahami posisi Python dalam workflow AI, siapkan environment, dan kuasai computational thinking.",
    "objectives": [
      "Menjelaskan alasan Python populer dalam AI",
      "Menyiapkan environment Python",
      "Menerapkan computational thinking"
    ],
    "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/01-topic.html"
  },
  {
    "title": "Data Dasar: Variabel & Collection",
    "shortTitle": "Data Dasar",
    "duration": "30 menit",
    "icon": "fas fa-database",
    "summary": "Pelajari sintaks dasar Python dan struktur data collection.",
    "objectives": [
      "Menggunakan sintaks dasar Python",
      "Membedakan tipe data",
      "Menggunakan list, tuple, set, dictionary"
    ],
    "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/02-topic.html"
  },
  {
    "title": "Control Flow: Logika & Perulangan",
    "shortTitle": "Control Flow",
    "duration": "25 menit",
    "icon": "fas fa-code-branch",
    "summary": "Kendalikan alur program dengan kondisi dan perulangan.",
    "objectives": [
      "Menggunakan if/elif/else",
      "Menggunakan for dan while loop"
    ],
    "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/03-topic.html"
  },
  {
    "title": "Function & Modularitas",
    "shortTitle": "Function",
    "duration": "30 menit",
    "icon": "fas fa-puzzle-piece",
    "summary": "Bangun pipeline kecil dengan function, lambda, dan generator.",
    "objectives": [
      "Menulis function dengan parameter",
      "Menggunakan lambda dan generator"
    ],
    "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/04-topic.html"
  },
  {
    "title": "OOP untuk AI",
    "shortTitle": "OOP Dasar",
    "duration": "25 menit",
    "icon": "fas fa-cubes",
    "summary": "Object-Oriented Programming dasar untuk struktur kode AI.",
    "objectives": [
      "Memahami class dan object",
      "Menggunakan inheritance"
    ],
    "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/05-topic.html"
  },
  {
    "title": "Program Tangguh: Error & File",
    "shortTitle": "Error & File",
    "duration": "30 menit",
    "icon": "fas fa-shield",
    "summary": "Buat program yang tahan error dan bisa baca/tulis file.",
    "objectives": [
      "Menangani error dengan try/except",
      "Membaca/menulis file"
    ],
    "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/06-topic.html"
  },
  {
    "title": "Ekosistem & NumPy",
    "shortTitle": "NumPy",
    "duration": "25 menit",
    "icon": "fas fa-calculator",
    "summary": "Jelajahi ekosistem Python untuk AI dan komputasi numerik dengan NumPy.",
    "objectives": [
      "Memahami ekosistem library AI",
      "Menggunakan NumPy array"
    ],
    "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/07-topic.html"
  },
  {
    "title": "Data & Mini Workflow",
    "shortTitle": "Pandas & Workflow",
    "duration": "35 min",
    "icon": "fas fa-table",
    "summary": "Baca, bersihkan, analisis data dengan Pandas dalam mini AI workflow.",
    "objectives": [
      "Membaca data dengan Pandas",
      "Membersihkan data",
      "Mini AI workflow"
    ],
    "sourcePath": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/08-topic.html"
  }
];

    const PYTHON_GUIDES = [
        {
hook: {
                question: "Python populer untuk AI karena paling cepat. Benarkah?",
                answerA: {
                    label: "Benar",
                    text: "Kecepatan runtime adalah alasan utamanya.",
                    icon: "fas fa-gauge-high"
                },
                answerB: {
                    label: "Belum tepat",
                    text: "Keterbacaan, ekosistem library, dan kemudahan eksperimen jauh lebih menentukan.",
                    icon: "fas fa-bridge"
                },
                message: "Python adalah lapisan orkestrasi. Operasi berat (matriks, training) tetap dijalankan oleh library C/C++/CUDA di bawahnya. Python menyatukan semuanya dengan sintaks yang bersih, sehingga workflow AI bisa dibaca, diuji, dan direproduksi."
            },
flow: [
                ["Masalah", "Definisikan input, proses, output sebelum koding"],
                ["Environment", "Isolasi dependency dengan venv/conda"],
                ["Eksperimen", "Jalankan langkah kecil, amati hasil"],
                ["Workflow", "Susun pipeline yang bisa diulang dari awal"]
            ],
deepDive: [
                ["Python bukan AI, Python adalah penghubung", "Python memberi bahasa konsisten untuk membaca data, memanggil library numerik, menjalankan eksperimen, menyimpan model, dan menghubungkan semuanya ke aplikasi. Ketika peserta paham peran ini, mereka tidak lagi menganggap library sebagai sihir — mereka bisa menelusuri dari input sampai output.", "Keunggulan Python bukan berarti setiap operasi dieksekusi paling cepat oleh interpreter. NumPy, Pandas, PyTorch memindahkan komputasi ke implementasi C/C++/CUDA. Python tetap di atas sebagai lapisan ekspresif yang membuat tim bisa mengubah ide menjadi eksperimen tanpa kehilangan keterbacaan."],
                ["Environment adalah fondasi reproducibility", "Kode yang benar di laptop A bisa gagal di laptop B karena perbedaan versi Python atau dependency. Virtual environment mengisolasi kebutuhan tiap project. File requirements.txt atau environment.yml membuat tim bisa membangun ulang environment yang identik.", "Notebook bagus untuk eksplorasi, tapi urutan cell yang tersembunyi bisa menghasilkan state sulit dilacak. Untuk workflow berulang, pindahkan logika stabil ke file .py, jalankan dari awal, pastikan output tidak bergantung pada cell tersembunyi."]
            ],
workedExample: [
                "Completion rate peserta",
                ["Input", "Jumlah peserta selesai dan total peserta"],
                ["Validasi", "Total tidak boleh negatif; total nol harus ditangani eksplisit"],
                ["Proses", "completed / total * 100 hanya dijalankan setelah validasi"],
                ["Output", "Persentase + pesan yang menjelaskan kondisi data"]
            ],
glossary: [
                ["Interpreter", "Program yang menjalankan instruksi Python baris per baris"],
                ["Virtual Environment", "Lingkungan terisolasi berisi Python dan dependency spesifik project"],
                ["Dependency", "Package eksternal yang dibutuhkan program (numpy, pandas, dll)"],
                ["Reproducibility", "Kemampuan mengulang eksperimen dengan input dan environment yang sama"],
                ["Computational Thinking", "Cara memecah masalah menjadi langkah-langkah yang bisa dieksekusi komputer"]
            ],
quickCheck: {
                question: "Mengapa virtual environment penting dalam project AI?",
                options: ["Mengisolasi versi dependency tiap project", "Membuat model otomatis lebih akurat", "Menggantikan kebutuhan dataset"],
                answer: 0,
                explanationCorrect: "Tepat. Isolasi mencegah konflik dependency antar project.",
                explanationWrong: "Coba hubungkan dengan reproducibility — bayangkan dua project butuh versi NumPy berbeda."
            },
challenge: {
                instruction: "Siapkan virtual environment, install numpy dan pandas, lalu tulis script kecil yang membaca CSV dan menghitung rata-rata satu kolom numerik. Pastikan script bisa dijalankan ulang dari awal tanpa error.",
                placeholder: "# pip install numpy pandas\n# Baca CSV -> hitung rata-rata",
                example: "import pandas as pd\ndf = pd.read_csv('data.csv')\nprint(df['score'].mean())"
            },
roadmapRef: "1"
        },
        {
hook: {
                question: "List, tuple, set, dictionary — empat struktur yang sering tertukar. Kapan pakai yang mana?",
                answerA: {
                    label: "Semua sama saja",
                    text: "Tinggal pilih yang paling sering dipakai.",
                    icon: "fas fa-random"
                },
                answerB: {
                    label: "Pilih berdasarkan perilaku",
                    text: "Urutan penting? Butuh unique? Key-value lookup? Setiap struktur punya kekuatan spesifik.",
                    icon: "fas fa-cubes"
                },
                message: "List untuk urutan yang bisa berubah. Tuple untuk data immutable (koordinat, config). Set untuk membership test cepat dan deduplikasi. Dictionary untuk lookup berbasis key — fondasi dari JSON dan konfigurasi model AI."
            },
flow: [
                ["List", "Record berurutan, mutable — koleksi item yang bisa bertambah/berkurang"],
                ["Tuple", "Record tetap, immutable — koordinat, hyperparameter, return multiple value"],
                ["Set", "Unordered, unique — membership test O(1), deduplikasi, operasi himpunan"],
                ["Dictionary", "Key-value — konfigurasi model, lookup table, representasi JSON"]
            ],
deepDive: [
                ["List vs Tuple: kapan mutability penting?", "List bisa di-append, di-pop, di-modify. Ini berguna untuk koleksi yang tumbuh (hasil query, batch data). Tapi mutability juga sumber bug: function bisa mengubah list tanpa disadari.", "Tuple immutable — function yang menerima tuple tidak bisa mengubahnya. Ini menjamin data tidak berubah setelah dibuat. Cocok untuk koordinat, hyperparameter, return value multiple."],
                ["Dictionary: fondasi konfigurasi AI", "Hampir semua konfigurasi model AI disimpan sebagai dictionary (atau JSON yang jadi dict di Python). Learning rate, batch size, layer config — semua key-value. Memahami dict = memahami bagaimana model dikonfigurasi.", "Dict comprehension, nested dict, defaultdict, dan operasi .get() dengan default value adalah pattern yang muncul di setiap codebase AI production."]
            ],
workedExample: [
                "Normalisasi nilai ujian",
                ["Input", "List nilai ujian [78, 92, 65, 88, 71]"],
                ["Dict konversi", "Nilai huruf: {90:'A', 80:'B', 70:'C', 60:'D', 0:'E'}"],
                ["Set", "Cek apakah ada nilai duplikat sebelum normalisasi"],
                ["Tuple", "Return (rata-rata, nilai_tertinggi, jumlah_lulus) sebagai immutable result"]
            ],
glossary: [
                ["Mutable", "Nilai bisa diubah setelah dibuat (list, dict, set)"],
                ["Immutable", "Nilai tidak bisa diubah setelah dibuat (int, str, tuple)"],
                ["Hashable", "Objek yang bisa jadi key dictionary — harus immutable"],
                ["Comprehension", "Cara ringkas membuat collection: [x*2 for x in data]"],
                ["O(1)", "Waktu akses konstan — tidak bergantung ukuran data"]
            ],
quickCheck: {
                question: "Kapan sebaiknya pakai tuple daripada list?",
                options: ["Saat data tidak boleh berubah", "Saat data perlu diurutkan", "Saat perlu append item baru"],
                answer: 0,
                explanationCorrect: "Tepat. Tuple immutable — cocok untuk data tetap seperti koordinat atau konfigurasi.",
                explanationWrong: "Ingat: tuple tidak bisa di-modify. List lebih fleksibel untuk data yang berubah."
            },
challenge: {
                instruction: "Buat fungsi yang menerima list nilai ujian, mengubahnya menjadi huruf (A/B/C/D/E) menggunakan dictionary konversi, dan me-return tuple (rata-rata, jumlah_lulus). Pastikan nilai duplikat tetap dihitung.",
                placeholder: "def konversi_nilai(daftar_nilai):\n    # dict konversi\n    # return tuple",
                example: "def konversi_nilai(nilai):\n    konversi = {90:'A', 80:'B', 70:'C', 60:'D', 0:'E'}\n    hasil = [konversi[kunci] for n in nilai for kunci in sorted(konversi, reverse=True) if n >= kunci]\n    return (sum(nilai)/len(nilai), len([n for n in nilai if n >= 70]))"
            },
roadmapRef: "2"
        },
        {
hook: {
                question: "If-else, for, while — Python baca dari atas ke bawah. Tapi urutan guard condition bisa bikin program behavior berbeda drastis.",
                answerA: {
                    label: "Urutan tidak penting",
                    text: "Yang penting semua kondisi tertulis.",
                    icon: "fas fa-list"
                },
                answerB: {
                    label: "Urutan sangat penting",
                    text: "Guard condition paling spesifik harus di atas, general di bawah.",
                    icon: "fas fa-sort-amount-down"
                },
                message: "Control flow adalah tulang punggung logika program. If-else untuk percabangan. For untuk iterasi data. While untuk kondisi dinamis. Guard clause pattern: validasi dulu, proses kemudian."
            },
flow: [
                ["Guard 1: Missing", "Cek None/NaN sebelum operasi apapun"],
                ["Guard 2: Type", "Pastikan tipe data sesuai sebelum diproses"],
                ["Guard 3: Range", "Validasi domain nilai (0-100, positif, dll)"],
                ["Process", "Baru jalankan logika bisnis setelah semua guard lolos"]
            ],
deepDive: [
                ["Guard clause: defensive programming", "Pattern paling penting dalam AI workflow: validasi dulu, proses kemudian. Jangan pernah asumsikan data bersih. Cek missing values, tipe data, range, dan outlier sebelum feeding ke model.", "Early return menghindari nested if yang dalam. if data is None: return error lebih bersih daripada membungkus seluruh fungsi dalam if data is not None."],
                ["List comprehension vs for loop", "List comprehension lebih cepat dan lebih Pythonic: [x*2 for x in data if x > 0]. Tapi jangan terlalu kompleks — kalau butuh lebih dari satu operasi, pakai for loop biasa agar readable.", "Generator expression pakai () bukan [] — hemat memori untuk data besar karena lazy evaluation. Tapi hanya bisa di-iterasi sekali."]
            ],
workedExample: [
                "Klasifikasi nilai peserta",
                ["Guard missing", "if score is None: return 'Data tidak tersedia'"],
                ["Guard type", "if not isinstance(score, (int, float)): return 'Format salah'"],
                ["Guard range", "if score < 0 or score > 100: return 'Di luar rentang'"],
                ["Classify", "Return 'Lulus' if score >= 75 else 'Remedial'"]
            ],
glossary: [
                ["Control Flow", "Urutan eksekusi kode berdasarkan kondisi dan perulangan"],
                ["Guard Clause", "Validasi di awal fungsi — menolak input invalid sebelum proses"],
                ["List Comprehension", "Sintaks ringkas untuk transformasi list dalam satu baris"],
                ["Generator", "Fungsi yang menghasilkan nilai secara lazy dengan yield"],
                ["Early Return", "Pattern keluar fungsi lebih awal jika kondisi tidak terpenuhi"]
            ],
quickCheck: {
                question: "Kenapa guard clause diletakkan di awal fungsi?",
                options: ["Menolak input invalid sebelum proses utama", "Mempercepat runtime Python", "Menggantikan unit test"],
                answer: 0,
                explanationCorrect: "Tepat. Guard mencegah kode utama berjalan dengan input yang tidak valid.",
                explanationWrong: "Guard clause bukan untuk optimasi kecepatan — ini tentang correctness dan readability."
            },
challenge: {
                instruction: "Tulis fungsi classify_participant(score) yang: (1) reject None, (2) reject non-numeric, (3) reject di luar 0-100, (4) return 'Istimewa' (>=90), 'Baik' (>=75), 'Cukup' (>=60), 'Kurang' (<60).",
                placeholder: "def classify_participant(score):\n    # guard 1: None\n    # guard 2: type\n    # guard 3: range\n    # classify",
                example: "def classify_participant(score):\n    if score is None: return 'Data kosong'\n    if not isinstance(score, (int, float)): return 'Bukan angka'\n    if score < 0 or score > 100: return 'Di luar rentang'\n    if score >= 90: return 'Istimewa'\n    if score >= 75: return 'Baik'\n    if score >= 60: return 'Cukup'\n    return 'Kurang'"
            },
roadmapRef: "3"
        },
        {
hook: {
                question: "Copy-paste kode yang sama di banyak tempat? Function menyelamatkanmu dari bug propagation.",
                answerA: {
                    label: "Function hanya untuk kode panjang",
                    text: "Kalau cuma 3 baris, tidak perlu function.",
                    icon: "fas fa-ruler"
                },
                answerB: {
                    label: "Function untuk setiap tanggung jawab",
                    text: "Satu function = satu tujuan. Pendek pun tetap di-function-kan agar命名 jelas dan testable.",
                    icon: "fas fa-cube"
                },
                message: "Function adalah unit test terkecil program. Nama function harus menjelaskan APA yang dilakukan, bukan BAGAIMANA. Parameter = input contract. Return value = output contract. Docstring = dokumentasi contract."
            },
flow: [
                ["Kontrak input", "Tentukan parameter wajib dan opsional dengan type hint"],
                ["Validasi", "Guard clause di awal function"],
                ["Transformasi", "Pure logic — tidak ada side effect"],
                ["Kontrak output", "Return value yang konsisten — jangan campur tipe"]
            ],
deepDive: [
                ["Pure function vs side effect", "Pure function: return value hanya bergantung pada input, tidak mengubah state luar. Ini membuat function mudah di-test dan di-reuse. Side effect (menulis file, update database, print) harus eksplisit dan didokumentasikan.", "Dalam AI workflow, pisahkan function data processing (pure) dari function I/O (side effect). load_data() membaca file, clean_data() pure transformasi, save_model() menulis file."],
                ["*args dan **kwargs dalam AI", "Banyak library AI menerima **kwargs untuk fleksibilitas konfigurasi. Memahami unpacking penting untuk membaca dokumentasi model.fit(**config) dan menulis wrapper yang meneruskan parameter."]
            ],
workedExample: [
                "Pipeline normalisasi data",
                ["load(path)", "Baca CSV, return DataFrame — side effect: file I/O"],
                ["clean(df)", "Hapus duplikat, isi missing — pure function"],
                ["normalize(df)", "Min-max scaling per kolom numerik — pure function"],
                ["save(df, path)", "Tulis hasil ke file baru — side effect: file I/O"]
            ],
glossary: [
                ["Pure Function", "Output hanya bergantung pada input, tidak ada side effect"],
                ["Side Effect", "Perubahan state di luar function (I/O, database, global var)"],
                ["Type Hint", "Anotasi tipe parameter dan return: def foo(x: int) -> str"],
                ["Docstring", "Dokumentasi di dalam function — diakses via help()"],
                ["Default Parameter", "Nilai fallback jika argumen tidak diberikan"]
            ],
quickCheck: {
                question: "Kenapa pure function lebih mudah di-test?",
                options: ["Output bisa diprediksi dari input saja — tidak perlu setup database/file", "Pure function otomatis lebih cepat", "Pure function tidak pernah error"],
                answer: 0,
                explanationCorrect: "Tepat. Tanpa side effect, unit test hanya perlu siapkan input dan cek output.",
                explanationWrong: "Bukan soal kecepatan — ini soal predictability dan isolation."
            },
challenge: {
                instruction: "Tulis tiga function: load_scores(path) membaca CSV, clean_scores(df) menghapus baris dengan score < 0 atau > 100, summarize(df) return dict {mean, median, count_pass, count_fail}. Gabungkan dalam satu pipeline.",
                placeholder: "def load_scores(path): ...\ndef clean_scores(df): ...\ndef summarize(df): ...\n\ndef pipeline(path):\n    df = load_scores(path)\n    df = clean_scores(df)\n    return summarize(df)",
                example: "def clean_scores(df):\n    return df[(df['score'] >= 0) & (df['score'] <= 100)]"
            },
roadmapRef: "4"
        },
        {
hook: {
                question: "OOP di AI? Bukannya cukup function aja?",
                answerA: {
                    label: "OOP tidak diperlukan",
                    text: "AI cukup dengan function dan script.",
                    icon: "fas fa-ban"
                },
                answerB: {
                    label: "OOP untuk organisasi",
                    text: "Class membantu mengelompokkan state + behavior yang punya lifecycle bersama. Dataset, Model, Trainer — semua class.",
                    icon: "fas fa-boxes-stacked"
                },
                message: "Di AI production, class muncul di mana-mana: Dataset class (PyTorch), Model class (nn.Module), Trainer class, Config class. OOP membantu menjaga invariant dan menyatukan data dengan operasi yang relevan."
            },
flow: [
                ["State", "Data yang punya lifecycle bersama — disimpan sebagai attribute"],
                ["Constructor", "__init__ memastikan object lahir dalam kondisi valid"],
                ["Method", "Operasi yang benar-benar terkait dengan state object"],
                ["Composition", "Gabungkan object kecil — hindari inheritance berlebihan"]
            ],
deepDive: [
                ["Class vs dictionary: kapan butuh class?", "Kalau hanya menyimpan data tanpa behavior, dictionary atau dataclass cukup. Kalau ada invariant (aturan yang harus selalu benar) atau method yang mengubah state secara terkontrol, class lebih tepat.", "Contoh: DatasetConfig bisa jadi dictionary. Tapi Dataset dengan method __len__ dan __getitem__ perlu class karena behavior-nya spesifik."],
                ["Inheritance vs Composition", "nn.Module pakai inheritance karena PyTorch butuh hook ke dalam framework. Tapi untuk kode sendiri, composition (class A punya instance class B) lebih fleksibel dan mudah di-test daripada inheritance bertingkat."]
            ],
workedExample: [
                "ModelRegistry sederhana",
                ["State", "Attribute: models (dict), name (str)"],
                ["Constructor", "__init__ memastikan name tidak kosong"],
                ["Method", "register(name, model) menambah model, get(name) mengambil"],
                ["Invariant", "models dict tidak boleh berisi key duplikat"]
            ],
glossary: [
                ["Class", "Blueprint untuk membuat object dengan state dan behavior"],
                ["Instance", "Object yang dibuat dari class"],
                ["self", "Referensi ke instance itu sendiri — parameter pertama method"],
                ["__init__", "Constructor — dipanggil saat object dibuat"],
                ["Composition", "Menggabungkan object — \"has-a\" relationship"]
            ],
quickCheck: {
                question: "Kapan sebaiknya pakai class daripada dictionary?",
                options: ["Saat ada aturan yang harus selalu terjaga (invariant)", "Saat data lebih dari 5 key", "Saat kode lebih dari 50 baris"],
                answer: 0,
                explanationCorrect: "Tepat. Class menjaga invariant — dict tidak bisa enforce aturan.",
                explanationWrong: "Bukan soal ukuran — class dipakai saat ada behavior + invariant, bukan sekadar penyimpanan data."
            },
challenge: {
                instruction: "Buat class ScoreTracker dengan: (1) __init__ menerima nama tracker, (2) method add(score) menambah score ke list internal, (3) method summary() return dict dengan mean, max, min, count. Pastikan add() menolak score di luar 0-100.",
                placeholder: "class ScoreTracker:\n    def __init__(self, name): ...\n    def add(self, score): ...\n    def summary(self): ...",
                example: "class ScoreTracker:\n    def __init__(self, name):\n        self.name = name\n        self._scores = []\n    def add(self, score):\n        if not 0 <= score <= 100: raise ValueError\n        self._scores.append(score)"
            },
roadmapRef: "5"
        },
        {
hook: {
                question: "Error handling di AI — diam lebih berbahaya daripada error yang jelas.",
                answerA: {
                    label: "try-except bungkus semuanya",
                    text: "Pokoknya jangan sampai crash.",
                    icon: "fas fa-shield"
                },
                answerB: {
                    label: "Tangkap spesifik, jelaskan actionable",
                    text: "Exception spesifik + pesan yang membantu debugging. Fallback hanya jika ada recovery plan.",
                    icon: "fas fa-bug"
                },
                message: "Dalam pipeline AI, error tidak terhindarkan: file missing, format berubah, API timeout, GPU OOM. Yang membedakan production code adalah bagaimana error ditangani: logged, di-eskalasi, atau di-recover dengan cara yang predictable."
            },
flow: [
                ["Detect", "Tangkap exception spesifik — jangan except Exception buta"],
                ["Log", "Catat timestamp, traceback, konteks input — jangan print()"],
                ["Recover", "Retry, skip, fallback, atau stop — pilih berdasarkan dampak"],
                ["Protect", "Gunakan context manager (with) — pastikan resource ditutup"]
            ],
deepDive: [
                ["FileNotFoundError vs PermissionError", "AI pipeline sering membaca banyak file: dataset, config, model checkpoint. Masing-masing bisa gagal dengan alasan berbeda. Tangani secara spesifik: missing file bisa pakai fallback, permission error harus eskalasi.", "Pathlib lebih aman daripada string path. Path('data') / 'train.csv' menghindari bug separator OS."],
                ["Context manager: with statement", "with open(...) as f: otomatis menutup file bahkan jika terjadi exception. Pattern yang sama untuk database connection, model loading, dan resource apapun yang perlu cleanup. Buat context manager sendiri dengan __enter__/__exit__ atau @contextmanager."]
            ],
workedExample: [
                "Robust CSV loader",
                ["Attempt", "Coba baca CSV dengan pandas.read_csv()"],
                ["FileNotFound", "Return empty DataFrame + log warning"],
                ["EmptyFile", "Return empty DataFrame + log warning"],
                ["ParseError", "Log error detail + raise ulang — tidak bisa recover"],
                ["Finally", "Pastikan tidak ada file handle yang bocor"]
            ],
glossary: [
                ["Exception", "Event yang mengganggu alur normal program"],
                ["try-except", "Blok untuk menangkap dan menangani exception"],
                ["Context Manager", "Object yang mengelola setup/cleanup resource"],
                ["Traceback", "Laporan urutan pemanggilan function saat exception terjadi"],
                ["Logging", "Mencatat event ke file/console — lebih baik dari print()"]
            ],
quickCheck: {
                question: "Kenapa except Exception dianggap bad practice?",
                options: ["Menangkap semua termasuk KeyboardInterrupt dan SystemExit — menyembunyikan bug serius", "Exception adalah keyword yang deprecated", "Python tidak mendukung except Exception"],
                answer: 0,
                explanationCorrect: "Tepat. except Exception terlalu luas — tangkap exception yang kamu pahami dan bisa tangani.",
                explanationWrong: "except Exception teknisnya valid, tapi menyembunyikan bug yang seharusnya muncul."
            },
challenge: {
                instruction: "Tulis fungsi safe_read_csv(path) yang: (1) return DataFrame jika sukses, (2) return empty DataFrame + log warning jika file tidak ditemukan, (3) return empty DataFrame + log warning jika file kosong, (4) raise ulang exception untuk error lain.",
                placeholder: "import pandas as pd\nimport logging\n\ndef safe_read_csv(path):\n    try:\n        ...\n    except FileNotFoundError:\n        ...\n    except pd.errors.EmptyDataError:\n        ...",
                example: "def safe_read_csv(path):\n    try:\n        return pd.read_csv(path)\n    except FileNotFoundError:\n        logging.warning(f'{path} tidak ditemukan')\n        return pd.DataFrame()"
            },
roadmapRef: "6"
        },
        {
hook: {
                question: "NumPy: kenapa array lebih cepat dari list Python biasa?",
                answerA: {
                    label: "Karena syntax lebih pendek",
                    text: "Lebih sedikit karakter = lebih cepat.",
                    icon: "fas fa-text-height"
                },
                answerB: {
                    label: "Fixed-type contiguous memory",
                    text: "Semua elemen tipe sama dalam blok memori kontinu — CPU bisa vectorize, cache-friendly, dan pakai SIMD.",
                    icon: "fas fa-microchip"
                },
                message: "NumPy adalah fondasi komputasi numerik di Python. Semua library AI (PyTorch, TensorFlow, JAX) memakai konsep yang sama: array dengan tipe seragam, operasi vectorized, broadcasting, dan indexing lanjutan."
            },
flow: [
                ["Shape", "Dimensi array — pastikan sesuai operasi berikutnya"],
                ["Dtype", "Tipe elemen — float32 untuk GPU, int64 untuk index"],
                ["Vectorize", "Operasi massal tanpa loop — scores / 100 untuk seluruh array"],
                ["Broadcast", "Operasi antar array dengan shape berbeda — otomatis"]
            ],
deepDive: [
                ["Vectorization vs loop", "Loop Python punya overhead per iterasi. NumPy vectorization memindahkan loop ke C yang sudah teroptimasi. np.sum(arr) jauh lebih cepat daripada sum(arr) Python. Rules: hindari loop manual pada array NumPy.", "Tapi vectorization butuh memori untuk intermediate result. Untuk array sangat besar, pertimbangkan operasi in-place (arr += 1) atau chunked processing."],
                ["Broadcasting rules", "Broadcasting adalah fitur paling powerful tapi juga paling membingungkan di NumPy. Rules: (1) align shape dari kanan, (2) dimensi 1 di-expand, (3) dimensi yang tidak cocok → error. shape (3,1) + (1,4) → hasil (3,4) — ini adalah dasar dari banyak operasi AI."]
            ],
workedExample: [
                "Normalisasi batch",
                ["Data", "Array scores shape (1000,) — 1000 nilai peserta"],
                ["Mean", "np.mean(scores) — satu nilai skalar"],
                ["Std", "np.std(scores) — satu nilai skalar"],
                ["Normalize", "(scores - mean) / std — broadcasting otomatis ke 1000 elemen"],
                ["Verify", "np.allclose(normalized.mean(), 0) — cek hasil"]
            ],
glossary: [
                ["ndarray", "Array N-dimensi NumPy — tipe data inti"],
                ["Vectorization", "Operasi pada seluruh array tanpa loop eksplisit"],
                ["Broadcasting", "Operasi antar array dengan shape berbeda"],
                ["dtype", "Tipe data elemen array (float32, int64, dll)"],
                ["Stride", "Jarak dalam bytes antar elemen — fundamental untuk view/slice"]
            ],
quickCheck: {
                question: "Kenapa operasi NumPy lebih cepat dari loop Python?",
                options: ["Loop dipindahkan ke C yang teroptimasi + contiguous memory", "NumPy pakai bahasa assembly", "NumPy menjalankan kode di GPU"],
                answer: 0,
                explanationCorrect: "Tepat. Vectorization + contiguous memory = CPU cache-friendly + SIMD + no Python overhead.",
                explanationWrong: "NumPy tidak otomatis pakai GPU — itu domain CuPy/PyTorch. Tapi NumPy tetap cepat karena C + memory layout."
            },
challenge: {
                instruction: "Diberikan array nilai: np.array([78, 92, 65, np.nan, 88, 71]). (1) Hitung mean tanpa NaN (pakai np.nanmean). (2) Ganti NaN dengan mean tersebut. (3) Normalisasi min-max ke rentang 0-1. Verifikasi hasil.",
                placeholder: "import numpy as np\nscores = np.array([78, 92, 65, np.nan, 88, 71])\n# 1. mean tanpa NaN\n# 2. fill NaN\n# 3. min-max normalize",
                example: "mean_val = np.nanmean(scores)\nscores = np.nan_to_num(scores, nan=mean_val)\nnormalized = (scores - scores.min()) / (scores.max() - scores.min())"
            },
roadmapRef: "7"
        },
        {
hook: {
                question: "Kode sudah jalan di notebook — sekarang gimana caranya bikin bisa dijalankan orang lain?",
                answerA: {
                    label: "Tinggal kasih notebooknya",
                    text: "Orang lain tinggal run cell satu per satu.",
                    icon: "fas fa-book"
                },
                answerB: {
                    label: "Convert ke script + environment",
                    text: "Pindahkan ke .py, bikin requirements.txt, tambah argparse, dan pastikan bisa dijalankan dari terminal tanpa notebook.",
                    icon: "fas fa-terminal"
                },
                message: "Production code = reproducibility. Notebook bagus untuk eksplorasi, tapi delivery butuh script yang deterministik. Satu command harus menjalankan seluruh pipeline dari awal sampai akhir."
            },
flow: [
                ["Extract", "Pindahkan logika dari notebook ke function di .py"],
                ["Parameterize", "Ganti hardcode dengan argparse atau config file"],
                ["Environment", "Freeze dependency: pip freeze > requirements.txt"],
                ["Test run", "Jalankan dari terminal: python main.py --input data.csv"]
            ],
deepDive: [
                ["Notebook ke production script", "Notebook menyimpan state tersembunyi — cell yang dijalankan duluan bisa mengubah variabel tanpa disadari. Restart-and-run-all adalah minimum. Tapi untuk production, ekstrak logika ke .py file, test secara terpisah, dan jalankan via CI/CD.", "Jupyter notebook tetap berguna untuk eksplorasi dan presentasi. Tapi final deliverable harus berupa script yang bisa dijalankan dengan satu command tanpa intervensi manual."],
                ["Config management", "Jangan hardcode path, hyperparameter, atau credential. Gunakan config file (YAML/JSON), environment variable, atau dataclass. Pisahkan config dari code — tim production bisa mengubah parameter tanpa menyentuh kode."]
            ],
workedExample: [
                "Dari notebook ke CLI",
                ["Notebook", "Cell 1: baca CSV, Cell 2: clean, Cell 3: analisis, Cell 4: plot"],
                ["Extract", "load_data(), clean_data(), analyze(), plot_results() di .py"],
                ["CLI", "argparse: --input, --output, --threshold sebagai parameter"],
                ["Run", "python analyze.py --input data.csv --output report/ --threshold 75"]
            ],
glossary: [
                ["CLI", "Command Line Interface — menjalankan script dari terminal"],
                ["argparse", "Library standar Python untuk parsing argument CLI"],
                ["requirements.txt", "File daftar dependency dengan versi — untuk pip install"],
                ["Config File", "File eksternal (YAML/JSON) untuk parameter — tidak hardcode"],
                ["Reproducibility", "Kemampuan menjalankan ulang dan mendapat hasil yang sama"]
            ],
quickCheck: {
                question: "Kenapa notebook saja tidak cukup untuk production?",
                options: ["State tersembunyi antar cell + tidak otomatis + sulit di-version control", "Notebook lebih lambat dari script", "Notebook hanya mendukung Python 2"],
                answer: 0,
                explanationCorrect: "Tepat. Notebook punya hidden state dan tidak deterministic kalau cell dijalankan tidak berurutan.",
                explanationWrong: "Bukan soal performa — ini soal reproducibility dan automation."
            },
challenge: {
                instruction: "Ambil salah satu notebook eksplorasi kamu. Ekstrak logikanya ke script Python dengan: (1) argparse untuk --input dan --output, (2) logging untuk progress, (3) try-except untuk error handling, (4) requirements.txt. Pastikan script bisa dijalankan dari terminal tanpa membuka notebook.",
                placeholder: "python main.py --input data.csv --output results/\n\n# Struktur script:\n# 1. parse args\n# 2. setup logging\n# 3. load -> clean -> analyze -> save",
                example: "import argparse, logging\nparser = argparse.ArgumentParser()\nparser.add_argument('--input', required=True)\nargs = parser.parse_args()\nlogging.info(f'Processing {args.input}...')"
            },
roadmapRef: "8"
        }
    ];;;

    CHAPTERS.forEach(function (chapter, index) {
        Object.assign(chapter, PYTHON_GUIDES[index]);
    });



    const PRACTICES = [
        { id: "py-1", title: "Latihan 1 — Input, Process, Output", focus: "Python Dasar", prompt: "Kasus:\n> Tim ingin menghitung completion rate peserta.\n\nRancang input, process, dan output. Sertakan aturan ketika total peserta nol dan jelaskan mengapa edge case tersebut harus diputuskan sebelum pembagian.\n\n**Output yang diharapkan:**\nTuliskan rancangan Anda dalam bentuk teks terstruktur (bullet points) atau pseudocode sederhana. Tidak perlu menulis kode Python yang bisa di-*run*.", fields: [["jawaban", "Tulis rancangan IPO dan edge case (Teks/Pseudocode)..."]], guide: "### Contoh Pembahasan yang Kuat:\n\n**1. Input:**\n- `completed` (integer): Jumlah peserta yang selesai.\n- `total` (integer): Jumlah total peserta yang terdaftar.\n\n**2. Process:**\n- Validasi apakah `total == 0`. Jika ya, hentikan proses (return 0 atau error log).\n- Jika `total > 0`, hitung: `rate = (completed / total) * 100`.\n\n**3. Output:**\n- `rate` (float): Persentase completion.\n\n**Edge Case (Total = 0):**\nHarus dicegah di awal sebelum pembagian (division by zero) agar aplikasi tidak *crash*." },
        { id: "py-2", title: "Latihan 2 — Metadata Dataset", focus: "Python Dasar", prompt: "Buat variabel untuk nama dataset, versi, jumlah baris, persentase missing value, dan status review. Pilih tipe data yang tepat dan jelaskan makna setiap variabel.", fields: [["jawaban", "Tulis kode dan alasan tipe datanya..."]], guide: "Gunakan nama bermakna, string untuk identitas/versi, integer untuk jumlah, float untuk persentase, dan boolean atau status eksplisit untuk review." },
        { id: "py-3", title: "Latihan 3 — Record Peserta", focus: "Collection", prompt: "Buat list berisi minimal lima dictionary peserta dengan field name, track, dan score. Sertakan satu missing score lalu jelaskan cara memvalidasi schema tanpa mengubah raw record.", fields: [["jawaban", "Tulis struktur data dan langkah validasinya..."]], guide: "List menjaga kumpulan record; dictionary memberi nama field. Buat salinan sebelum cleaning dan bedakan None dari nol." },
        { id: "py-4", title: "Latihan 4 — Validasi dengan Control Flow", focus: "Control Flow", prompt: "Loop seluruh record. Tandai score kosong, tipe salah, di luar 0–100, lulus, atau perlu review. Uji boundary 0, 74.9, 75, dan 100.", fields: [["jawaban", "Tulis kode validasi dan hasil boundary test..."]], guide: "Urutan guard: missing, type, range, lalu threshold. Catat alasan setiap record ditolak agar jumlah dapat direkonsiliasi." },
        { id: "py-5", title: "Latihan 5 — Function Pipeline", focus: "Function", prompt: "Buat function validate_score, classify_score, dan summarize_scores. Setiap function harus memiliki satu tanggung jawab dan return value yang bisa dipakai tahap berikutnya.", fields: [["jawaban", "Tulis tiga function dan test kecil..."]], guide: "Pisahkan validasi, klasifikasi, dan agregasi. Uji None, teks, 74.9, 75, 100, serta nilai di luar range." },
        { id: "py-6", title: "Latihan 6 — Generator Record Valid", focus: "Function", prompt: "Buat generator yang menerima kumpulan record dan menghasilkan hanya record valid satu per satu. Jelaskan kapan generator lebih tepat daripada membangun list baru.", fields: [["jawaban", "Tulis generator dan alasan penggunaannya..."]], guide: "Gunakan yield setelah validasi. Generator berguna untuk aliran besar atau bertahap, tetapi pertimbangkan materialisasi bila hasil harus dibaca berulang." },
        { id: "py-7", title: "Latihan 7 — Object dan Error", focus: "OOP & Error", prompt: "Buat class DatasetReport yang menyimpan nama dataset dan summary. Validasi nama kosong dan tangani input summary yang bukan dictionary dengan pesan yang dapat ditindaklanjuti.", fields: [["jawaban", "Tulis class, invariant, dan error handling..."]], guide: "Constructor menjaga invariant. Tangkap atau raise exception spesifik; jangan menyembunyikan error dengan except kosong." },
        { id: "py-8", title: "Latihan 8 — File yang Aman", focus: "OOP & Error", prompt: "Simpan dataset kecil ke participants.csv lalu baca kembali. Gunakan UTF-8, tangani file hilang, dan pastikan output cleaning tidak menimpa raw file.", fields: [["jawaban", "Tulis kode file I/O dan recovery path..."]], guide: "Gunakan with atau library yang mengelola file, path input/output berbeda, serta pesan jelas untuk FileNotFoundError." },
        { id: "py-9", title: "Latihan 9 — Audit NumPy", focus: "NumPy & Pandas", prompt: "Konversi score valid ke NumPy array. Periksa shape dan dtype, lalu hitung valid count, mean, median, minimum, maksimum, dan normalization ke 0–1.", fields: [["jawaban", "Tulis operasi NumPy dan interpretasinya..."]], guide: "Periksa shape/dtype sebelum statistik. Hitung missing terpisah dan jelaskan bila memakai operasi nan-aware." },
        { id: "py-10", title: "Latihan 10 — Cleaning Pandas", focus: "NumPy & Pandas", prompt: "Baca CSV, periksa shape, kolom, tipe, dan missing value. Hapus duplikat, perbaiki tipe score, filter range, agregasi per track, lalu simpan output baru.", fields: [["jawaban", "Tulis pipeline Pandas dan alasan tiap keputusan..."]], guide: "Mulai dari inspect, clean pada salinan, dokumentasikan missing policy, dan jangan menimpa participants.csv." },
        { id: "py-11", title: "Latihan 11 — Audit Cleaning", focus: "Workflow Data", prompt: "Buat laporan jumlah baris raw, duplicate, invalid type, out-of-range, missing, dan clean. Tunjukkan persamaan rekonsiliasi yang membuktikan tidak ada record hilang tanpa alasan.", fields: [["jawaban", "Tulis audit count dan persamaan rekonsiliasi..."]], guide: "Contoh: raw = clean + duplicate + missing + invalid. Hindari double-count dengan aturan kategori yang eksplisit." },
        { id: "py-12", title: "Latihan 12 — Workflow Utuh", focus: "Workflow Data", prompt: "Gabungkan load, validate, clean, summarize, dan save dalam function terpisah. Tambahkan schema check, error message, participants_clean.csv, track_summary.csv, dan report.txt.", fields: [["jawaban", "Tulis desain pipeline end-to-end..."]], guide: "Function orkestrasi hanya mengatur tahap. Setiap tahap punya contract, output baru, test kecil, dan failure behavior yang jelas." }
    ];

const QUIZ = [
        ["Peran Python dalam workflow AI paling tepat adalah...", ["AI itu sendiri", "Bahasa yang menghubungkan data, library, eksperimen, dan aplikasi", "Hanya kalkulator", "Pengganti dataset"], 1, "Python menghubungkan tahap data, library, eksperimen, evaluasi, dan aplikasi; Python bukan AI itu sendiri."],
        ["Kapan notebook lebih cocok daripada file .py?", ["Eksplorasi bertahap dengan kode dan catatan", "Semua production service", "Menyimpan password", "Menggantikan virtual environment"], 0, "Notebook cocok untuk eksplorasi bertahap yang menggabungkan kode, output, dan catatan, selama urutan eksekusinya tetap terkontrol."],
        ["Fungsi utama virtual environment adalah...", ["Membuat GPU", "Mengisolasi dependency project", "Membersihkan dataset", "Menghapus Python"], 1, "Virtual environment mengisolasi versi dependency agar kebutuhan satu project tidak merusak project lain."],
        ["Dalam IPO, menghitung rata-rata termasuk...", ["Input", "Process", "Output", "Package"], 1, "Menghitung rata-rata adalah proses yang mengubah input angka menjadi output ringkasan."],
        ["Tipe data yang tepat untuk prompt adalah...", ["str", "int", "bool", "set"], 0, "Prompt berupa teks, sehingga tipe dasarnya adalah str."],
        ["Struktur yang paling menyerupai object JSON adalah...", ["Tuple", "Dictionary", "Set", "Float"], 1, "Dictionary menyimpan pasangan key-value seperti object JSON."],
        ["Mengapa score is None diperiksa sebelum score >= 75?", ["Agar kode lebih panjang", "None tidak dapat dibandingkan dengan angka", "Semua score adalah None", "Python selalu mengubah None menjadi nol"], 1, "Guard untuk None harus dijalankan lebih dulu karena None tidak dapat dibandingkan langsung dengan angka."],
        ["Perbedaan utama return dan print adalah...", ["Tidak ada", "return mengirim nilai ke pemanggil, print hanya menampilkan", "print lebih aman", "return hanya untuk string"], 1, "return membuat hasil dapat dipakai tahap pipeline berikutnya; print hanya menampilkannya."],
        ["Kapan lambda sebaiknya digunakan?", ["Untuk logika panjang", "Untuk ekspresi singkat dan jelas", "Untuk menangani semua error", "Untuk membuka file"], 1, "Lambda cocok untuk ekspresi pendek yang tetap mudah dibaca, bukan logika bercabang panjang."],
        ["Keuntungan generator adalah...", ["Selalu lebih cepat untuk semua kasus", "Menghasilkan nilai bertahap saat dibutuhkan", "Menyimpan semua data dua kali", "Menggantikan Pandas"], 1, "Generator memakai yield untuk menghasilkan item bertahap tanpa selalu menyimpan seluruh hasil sekaligus."],
        ["Dalam OOP, object adalah...", ["Blueprint", "Instance dari class", "Error", "Package"], 1, "Class adalah blueprint, sedangkan object adalah instance yang memiliki state sendiri."],
        ["Praktik exception handling terbaik adalah...", ["Menangkap semua error dan diam", "Menangkap exception spesifik dan memberi pesan jelas", "Tidak pernah memakai try", "Melanjutkan data rusak"], 1, "Exception spesifik dan pesan yang dapat ditindaklanjuti menjaga error tetap terlihat dan mudah didiagnosis."],
        ["Mengapa menggunakan with saat membuka file?", ["File ditutup otomatis", "File menjadi AI", "Tidak perlu path", "Semua error hilang"], 0, "Context manager menutup file secara otomatis, termasuk ketika operasi di dalam blok gagal."],
        ["Library yang fokus pada data tabular adalah...", ["OpenCV", "Pandas", "Matplotlib", "pathlib"], 1, "Pandas menyediakan Series dan DataFrame untuk data tabular."],
        ["scores.shape pada NumPy menjelaskan...", ["Nama file", "Dimensi array", "Missing value", "Versi Python"], 1, "shape menjelaskan ukuran array pada setiap dimensi."],
        ["Apa fungsi np.nanmean()?", ["Menghapus file", "Menghitung mean sambil mengabaikan NaN", "Mengisi semua NaN dengan nol", "Membuat DataFrame"], 1, "np.nanmean menghitung mean sambil mengabaikan NaN; kebijakan terhadap missing tetap harus dijelaskan."],
        ["Langkah pertama setelah membaca CSV sebaiknya...", ["Langsung membangun model", "Memeriksa shape, kolom, tipe, missing value, dan contoh baris", "Menghapus semua baris", "Menimpa file"], 1, "Inspeksi awal memastikan schema dan kualitas data dipahami sebelum transformasi."],
        ["Mengapa missing score tidak selalu diisi nol?", ["Nol tidak ada di Python", "Nol memiliki makna dan dapat mengubah statistik", "Pandas tidak mendukung nol", "CSV tidak mendukung angka"], 1, "Nol adalah nilai nyata; menggunakannya sebagai pengganti missing dapat mengubah distribusi dan keputusan."],
        ["groupby(\"track\")[\"score\"].mean() digunakan untuk...", ["Menghapus track", "Menghitung rata-rata score per track", "Membuat virtual environment", "Mengubah score menjadi string"], 1, "groupby membentuk kelompok per track lalu mean merangkum score setiap kelompok."],
        ["Mengapa raw dataset tidak boleh ditimpa?", ["Agar transformasi dapat diaudit dan diulang", "Agar folder lebih banyak", "Karena Pandas tidak bisa menulis", "Agar model lebih kompleks"], 0, "Raw dataset adalah baseline audit dan reproduksi; hasil cleaning harus disimpan sebagai derived output baru."]
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
                '<div class="ai-modern-roadmap-head"><i class="fas fa-compass" aria-hidden="true"></i><div><span>Python</span><h3>Python untuk workflow AI</h3><p>Gunakan penjelasan berikut untuk menghubungkan kode, data, failure case, dan keputusan dalam workflow AI.</p></div></div>' +
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
                } else if (text.includes("quick check") && chapter.quickCheck && !chapter.quickCheck.options[0].includes("Pilihan A")) {
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
        var start = html.indexOf("<h1>Latihan Modul</h1>");
        var end = html.indexOf("<h1>Checklist Kesiapan Peserta</h1>");
        if (start === -1 || end === -1 || end <= start) return html;
        return html.slice(0, start) + html.slice(end);
    }

    function sourceText(html) {
        var template = document.createElement("template");
        template.innerHTML = html;
        return String(template.content.textContent || "").replace(/\s+/g, " ").trim();
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
        if (qc && qc.options && qc.options[0] && qc.options[0].includes("Pilihan A")) return "";
        return '<section class="reasoning-quick-check" data-section="check" data-check-answer="' + qc.answer + '">\n                <div class="reasoning-quick-head"><i class="fas fa-circle-question" aria-hidden="true"></i><div><span>Quick Check</span><h3>' + escapeHtml(qc.question) + '</h3></div></div>\n                <div class="reasoning-check-options">\n                    ' + qc.options.map(function (option, index) {
                        return '<button type="button" data-check-option="' + index + '"><b>' + String.fromCharCode(65 + index) + '</b><span>' + escapeHtml(option) + '</span></button>';
                    }).join("") + '\n                </div>\n                <div class="reasoning-check-actions">\n                    <button type="button" class="reasoning-check-submit" data-check-submit><i class="fas fa-check" aria-hidden="true"></i> Periksa Jawaban</button>\n                    <button type="button" class="reasoning-check-retry" data-check-retry hidden><i class="fas fa-rotate-left" aria-hidden="true"></i> Coba Lagi</button>\n                </div>\n                <p class="reasoning-check-feedback" hidden></p>\n            </section>';
    }

    function finalRenderChallengeSection(challenge, chapterNumber) {
        var key = 'heraiAiPythonChallengeCh' + chapterNumber;
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
        var storageKey = "heraiAiPythonChallengeCh" + chapterNumber;
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

    window.loadPythonTopik = function (chapterNumber) {
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
        window.saveChapterProgress(MODULE_ID, chapter, 'completed');
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.initAiPythonMateri = function () {
        const total = CHAPTERS.length;
        const initial = Math.min(Math.max(Number(localStorage.getItem(STORAGE.chapter)) || 1, 1), total);
        const list = document.getElementById("reasoning-sidebar-list");
        const btnPrev = document.getElementById("btn-prev-chapter");
        const btnNext = document.getElementById("btn-next-chapter");

        if (list) {
            list.innerHTML = CHAPTERS.map(function (chapter, index) {
                const chapterNumber = index + 1;
                return `<li data-chapter="${chapterNumber}"><span>${chapterNumber}</span><a href="javascript:void(0)" onclick="window.loadPythonTopik(${chapterNumber})">${escapeHtml(chapter.shortTitle)}</a><i class="far fa-circle"></i></li>`;
            }).join("");
        }

        if (btnPrev) {
            btnPrev.addEventListener("click", function () {
                const current = Number(localStorage.getItem(STORAGE.chapter)) || initial;
                window.loadPythonTopik(Math.max(1, current - 1));
            });
        }

        if (btnNext) {
            btnNext.addEventListener("click", function () {
                const current = Number(localStorage.getItem(STORAGE.chapter)) || initial;
                window.loadPythonTopik(Math.min(total, current + 1));
            });
        }

        window.loadPythonTopik(initial);
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
        { start: 0, end: 2, label: "Python & Data Dasar" },
        { start: 3, end: 5, label: "Control Flow & Function" },
        { start: 6, end: 7, label: "OOP, Error & File" },
        { start: 8, end: 9, label: "NumPy & Pandas" },
        { start: 10, end: 11, label: "Workflow Data" }
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
            ${(item.guide && !item.guide.includes("sedang disusun")) ? 
            `<button type="button" class="reasoning-scaffold-reveal-button" data-reasoning-reveal="${escapeHtml(item.id)}" aria-expanded="false"><i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat pembahasan</button>
            <div class="reasoning-scaffold-exercise-answer" data-reasoning-answer="${escapeHtml(item.id)}" hidden><strong>Pembahasan</strong><div class="reasoning-guide-content" style="margin-top: 10px;">${renderFormattedText(item.guide)}</div></div>` 
            : ''}
        </article>`;
    }

    window.initAiPythonPractice = function () {
        const form = document.getElementById("aiPythonPracticeForm");
        const practiceList = document.getElementById("aiPythonPracticeList");
        if (!form || !practiceList) return;

        loadSourceSegment(SOURCE_BASE + "15-full.html", "aiPythonPracticeSource", "Practice — Python sebagai Workflow Data", "Quiz — 20 Soal");
        practiceList.innerHTML = PRACTICES.map(renderPracticeCard).join("");
        const saved = getSavedPractice() || { answers: {}, revealed: [] };
        const savedAnswers = saved.answers || {};
        const revealed = Array.isArray(saved.revealed) ? saved.revealed.slice() : [];
        const navigator = document.getElementById("aiPythonPracticeNavigator");
        const counter = document.getElementById("aiPythonPracticeCounter");
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

        setStatus("#aiPythonPracticeStatus", Object.keys(savedAnswers).length ? "Jawaban latihan dipulihkan dari browsermu." : "Jawaban akan tersimpan di browser ini.", Object.keys(savedAnswers).length ? "success" : "neutral");

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
                setStatus("#aiPythonPracticeStatus", "Pembahasan dan jawaban tersimpan di browser ini.", "success");
            });
        });

        const saveButton = form.querySelector("[data-practice-save]");
        const editButton = form.querySelector("[data-practice-edit]");
        const resetButton = form.querySelector("[data-practice-reset]");

        if (saveButton) {
            saveButton.addEventListener("click", async function () {
                const exerciseAnswers = collectPracticeAnswers(form);
                savePracticePayload({ answers: exerciseAnswers, revealed: revealed });
                const totalFields = Object.keys(exerciseAnswers).length;
                const filledCount = Object.values(exerciseAnswers).filter(function(v) { return String(v || '').trim(); }).length;
                if (filledCount < totalFields) {
                    var emptyField;
                    form.querySelectorAll("textarea").forEach(function(field) {
                        if (!String(field.value || '').trim() && !emptyField) emptyField = field;
                    });
                    setStatus("#aiPythonPracticeStatus", "Isi seluruh " + totalFields + " jawaban sebelum mengirim. " + (totalFields - filledCount) + " jawaban masih kosong.", "warning");
                    if (emptyField) {
                        const card = emptyField.closest("[data-practice-id]");
                        if (card) {
                            const cards = Array.from(practiceList.querySelectorAll("[data-practice-id]"));
                            const cardIndex = cards.indexOf(card);
                            if (cardIndex >= 0) {
                                showPractice(cardIndex, true);
                            }
                        }
                        emptyField.focus();
                    }
                    return;
                }
                const originalLabel = saveButton.innerHTML;
                saveButton.disabled = true;
                saveButton.setAttribute("aria-busy", "true");
                saveButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Menyimpan...';
                setStatus("#aiPythonPracticeStatus", "Menyimpan latihan ke server...", "neutral");
                const result = await window.submitParticipantExercise(MODULE_ID, 'practice', exerciseAnswers);
                saveButton.disabled = false;
                saveButton.removeAttribute("aria-busy");
                saveButton.innerHTML = originalLabel;
                if (!result || result.status !== "success") {
                    setStatus("#aiPythonPracticeStatus", "Jawaban aman di browser, tetapi belum masuk server. Periksa koneksi lalu coba Simpan Jawaban lagi.", "error");
                    return;
                }
                form.classList.add("is-saved");
                form.querySelectorAll("textarea").forEach(field => { field.disabled = true; });
                window.noteParticipantExerciseSubmission(form, "#aiPythonPracticeStatus", result.submission);
                setStatus("#aiPythonPracticeStatus", "Latihan Python berhasil dikirim dan menunggu review mentor.", "success");
            });
        }

        if (editButton) {
            editButton.addEventListener("click", function () {
                form.classList.remove("is-saved");
                form.querySelectorAll("textarea").forEach(field => { field.disabled = false; });
                setStatus("#aiPythonPracticeStatus", "Mode edit aktif. Simpan ulang setelah mengubah jawaban.", "neutral");
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
                setStatus("#aiPythonPracticeStatus", "Jawaban latihan direset dari browser ini.", "warning");
            });
        }
        window.bindParticipantExerciseForm({
            form: form,
            moduleId: MODULE_ID,
            statusSelector: "#aiPythonPracticeStatus",
            collectAnswers: function () { return collectPracticeAnswers(form); },
            saveLocal: function (answers) { savePracticePayload({ answers: answers, revealed: revealed }); },
            setMessage: function (message, type) { setStatus("#aiPythonPracticeStatus", message, type); },
            setLocked: function (locked) {
                form.classList.toggle("is-saved", locked);
                form.querySelectorAll("textarea").forEach(function(field) { field.disabled = locked; });
            }
        });
    };

    function getQuizAnswers(form) {
        return QUIZ.reduce(function (acc, _question, index) {
            const checked = form.querySelector('input[name="python-q' + index + '"]:checked');
            acc["python-q" + index] = checked ? checked.value : "";
            return acc;
        }, {});
    }

    function renderQuizResult(score, total, message) {
        const result = document.getElementById("aiPythonQuizResult");
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
        var qnav = document.getElementById("aiPythonQuizNavigator");
        var qprev = form.querySelector("[data-quiz-prev]");
        var qnext = form.querySelector("[data-quiz-next]");
        var qcounter = document.getElementById("aiPythonQuizCounter");
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

        const next = document.getElementById("aiPythonQuizNext");
        if (next) next.classList.remove("is-disabled");
    }

    window.initAiPythonQuiz = function () {
        const form = document.getElementById("aiPythonQuizForm");
        const list = document.getElementById("aiPythonQuizList");
        if (!form || !list) return;

        loadSourceSegment(SOURCE_BASE + "15-full.html", "aiPythonQuizSource", "Quiz — 20 Soal", "Discussion");
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

        const navigator = document.getElementById("aiPythonQuizNavigator");
        const counter = document.getElementById("aiPythonQuizCounter");
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
        form.hidden = false;
        form.setAttribute("aria-busy", "false");

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

        form.addEventListener("submit", async function (event) {
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

            const submit = form.querySelector(".quiz-submit-btn");
            const originalLabel = submit ? submit.innerHTML : "";
            if (submit) {
                submit.disabled = true;
                submit.setAttribute("aria-busy", "true");
                submit.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Menyimpan...';
            }
            const result = await window.saveChapterProgress(MODULE_ID, 'quiz', 'completed', score);
            if (submit) {
                submit.disabled = false;
                submit.removeAttribute("aria-busy");
                submit.innerHTML = originalLabel;
            }
            if (!result || result.status !== "success") {
                renderQuizResult(score, QUIZ.length, "Skor belum dikunci karena gagal tersimpan ke server. Jawabanmu tetap tersedia; periksa koneksi lalu tekan Kirim Kuis lagi.");
                return;
            }
            localStorage.setItem(STORAGE.quizDone, "true");
            localStorage.setItem(STORAGE.quizScore, String(score));
            localStorage.setItem(STORAGE.quizAnswers, JSON.stringify(answers));
            renderQuizResult(score, QUIZ.length, "Skor berhasil tersimpan ke server. Pembahasan dibuka untuk review.");
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
        const list = document.getElementById("aiPythonDiscussionList");
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
                    <span>${post.id.indexOf("seed") === 0 ? "H" : (window.getParticipantDisplayName ? window.getParticipantDisplayName().charAt(0) || "P" : "P")}</span>
                    <strong>${post.id.indexOf("seed") === 0 ? "HerAI Prompt" : (window.getParticipantDisplayName ? window.getParticipantDisplayName() : "Peserta")}</strong>
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
                        return `<article><strong>${window.getParticipantDisplayName ? window.getParticipantDisplayName() : "Peserta"}</strong><small>${new Date(reply.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</small><p>${escapeHtml(reply.text)}</p></article>`;
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
            button.addEventListener("click", async function () {
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
                button.disabled = true;
                button.setAttribute("aria-busy", "true");
                var result = await window.saveParticipantDiscussion(MODULE_ID, target);
                button.disabled = false;
                button.removeAttribute("aria-busy");
                if (!result || result.status !== "success") {
                    if (validation) {
                        validation.hidden = false;
                        validation.textContent = result?.message || "Balasan belum tersimpan. Coba kirim kembali.";
                    }
                    return;
                }
                var targetIndex = posts.findIndex(function (post) { return post.id === postId; });
                if (targetIndex !== -1) posts[targetIndex] = result.discussion;
                saveDiscussionPosts(posts);
                renderDiscussion(posts);
                setStatus("#aiPythonDiscussionStatus", "Balasan tersimpan ke server.", "success");
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

    window.initAiPythonDiscussion = async function () {
        const form = document.getElementById("aiPythonDiscussionForm");
        const select = form ? form.querySelector("select") : null;
        const textarea = form ? form.querySelector("textarea") : null;
        loadSourceSegment(SOURCE_BASE + "15-full.html", "aiPythonDiscussionSource", "Discussion", "Checklist Kesiapan Peserta");
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
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const text = textarea.value.trim();
            if (!text) {
                setStatus("#aiPythonDiscussionStatus", "Tulis isi diskusi terlebih dahulu.", "warning");
                return;
            }

            const post = {
                id: "post-" + Date.now(),
                prompt: select.value,
                text: text,
                createdAt: new Date().toISOString(),
                replies: []
            };
            const submitButton = form.querySelector('[type="submit"]');
            const originalHtml = submitButton ? submitButton.innerHTML : "";
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.setAttribute("aria-busy", "true");
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Menyimpan...';
            }
            setStatus("#aiPythonDiscussionStatus", "Menyimpan diskusi ke server...", "info");
            const result = await window.saveParticipantDiscussion(MODULE_ID, post);
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.removeAttribute("aria-busy");
                submitButton.innerHTML = originalHtml;
            }
            if (!result || result.status !== "success") {
                setStatus("#aiPythonDiscussionStatus", result?.message || "Diskusi belum tersimpan. Isi tetap tersedia untuk dicoba lagi.", "error");
                return;
            }
            const posts = getDiscussionPosts();
            posts.unshift(result.discussion);
            saveDiscussionPosts(posts);
            form.reset();
            setStatus("#aiPythonDiscussionStatus", "Diskusi berhasil diposting dan tersimpan ke server.", "success");
            renderDiscussion(posts);
        });

        const remote = await window.getParticipantDiscussions(MODULE_ID);
        if (remote && remote.status === "success") {
            const local = getDiscussionPosts();
            const merged = remote.data.concat(local.filter(function (post) {
                return !remote.data.some(function (saved) { return saved.id === post.id; });
            }));
            saveDiscussionPosts(merged);
            renderDiscussion(merged);
            setStatus("#aiPythonDiscussionStatus", merged.length ? "Diskusi tersinkron dengan server." : "Belum ada diskusi tersimpan. Mulai posting pertamamu.", "success");
        } else {
            setStatus("#aiPythonDiscussionStatus", remote?.message || "Diskusi server belum dapat dimuat. Data lokal tetap tersedia.", "warning");
        }
    };
})();
