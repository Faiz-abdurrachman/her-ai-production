(function() {
    'use strict';

    /* ── HerAI Modul 02 — Python untuk AI ─── */

    var pyodideInstance = null;
    var pyodideReady = false;
    var pyodideLoading = false;

    function startPyodide() {
        if (pyodideReady) {
            enableAllPlaygrounds();
            return;
        }

        var status = document.getElementById('pyodideStatus');

        if (typeof loadPyodide === 'undefined') {
            if (status) { status.querySelector('span').textContent = 'Python runtime tidak tersedia di perangkat ini.'; }
            return;
        }

        if (pyodideLoading) return;
        pyodideLoading = true;

        // Disable all runs and show loading
        var runs = document.querySelectorAll('.py-run');
        runs.forEach(function(btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        });

        var bars = 0;
        var dots = '';
        var interval = setInterval(function() {
            bars = (bars + 1) % 4;
            dots = '.'.repeat(bars);
            if (status) {
                var s = status.querySelector('span');
                if (s && !pyodideReady) s.textContent = 'Memuat Python runtime' + dots;
            }
        }, 400);

        loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' }).then(function(pyodide) {
            pyodideInstance = pyodide;
            pyodideReady = true;
            clearInterval(interval);
            if (status) {
                status.classList.add('ready');
                status.querySelector('span').textContent = 'Python runtime siap. Kamu bisa menjalankan kode di bawah.';
            }
            enableAllPlaygrounds();
        }).catch(function(err) {
            clearInterval(interval);
            if (status) status.querySelector('span').textContent = 'Gagal memuat Python: ' + (err.message || 'unknown error');
        });
    }

    function enableAllPlaygrounds() {
        var runs = document.querySelectorAll('.py-run');
        for (var i = 0; i < runs.length; i++) {
            runs[i].disabled = false;
            runs[i].innerHTML = '<i class="fas fa-play"></i> Run Code';
        }
    }

    function getHashQueryParam(name) {
        var hash = window.location.hash || '';
        var queryIndex = hash.indexOf('?');
        if (queryIndex === -1) return '';
        var params = new URLSearchParams(hash.slice(queryIndex + 1));
        return params.get(name) || '';
    }

    function runCode(playId) {
        if (!pyodideReady || !pyodideInstance) return;
        var editor = document.querySelector('#play-' + playId + ' .py-editor');
        var output = document.getElementById('out-' + playId);
        if (!editor || !output) return;
        var code = editor.value;

        output.className = 'py-output visible';
        output.textContent = 'Running...';

        var captured = '';
        pyodideInstance.setStdout({ batched: function(text) { captured += text + '\n'; } });
        pyodideInstance.setStderr({ batched: function(text) { captured += text + '\n'; } });

        pyodideInstance.loadPackagesFromImports(code).then(function() {
            return pyodideInstance.runPythonAsync(code);
        }).then(function(result) {
            var resultText = result !== undefined ? String(result) : '';
            var final = captured ? captured.trimEnd() : '';
            if (resultText && final) final += '\n' + resultText;
            else if (resultText) final = resultText;
            output.textContent = final || '(kode berjalan, tidak ada output)';
            output.classList.remove('error');
        }).catch(function(err) {
            var final = captured ? captured.trimEnd() + '\n' : '';
            final += 'Error: ' + (err.message || err);
            output.textContent = final;
            output.classList.add('error');
        });
    }

    window.initAiPythonBasic = function() {
        var form = document.getElementById('pythonPracticeForm');
        if (!form || form.dataset.practiceReady) return;
        form.dataset.practiceReady = 'true';
        var STORAGE_KEY = 'heraiAiPythonPractice';
        var status = document.getElementById('pythonPracticeStatus');
        var fields = Array.from(form.querySelectorAll('textarea[name]'));

        var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        fields.forEach(function(f) { if (saved[f.name]) f.value = saved[f.name]; });
        if (Object.keys(saved).length && status) {
            status.textContent = 'Jawaban latihan tersimpan di perangkatmu.';
        }

        var saveButton = form.querySelector('[data-practice-save]');
        var editButton = form.querySelector('[data-practice-edit]');
        var deleteButton = form.querySelector('[data-practice-delete]');

        saveButton?.addEventListener('click', function() {
            var payload = {};
            var hasAnswer = false;
            fields.forEach(function(f) {
                var val = f.value.trim();
                payload[f.name] = val;
                if (val.length > 0) hasAnswer = true;
            });

            if (!hasAnswer) {
                if (status) {
                    status.style.color = '#e74c3c';
                    status.textContent = 'Oops, jawaban tidak boleh kosong! Silakan kerjakan minimal satu soal reflektif.';
                }
                return;
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
            if (status) {
                status.style.color = 'var(--fellow-muted)';
                status.textContent = 'Jawaban berhasil disimpan. Kamu bisa edit atau hapus kapan saja.';
            }
        });
        editButton?.addEventListener('click', function() {
            fields[0]?.focus();
            if (status) {
                status.style.color = 'var(--fellow-muted)';
                status.textContent = 'Mode edit aktif.';
            }
        });
        deleteButton?.addEventListener('click', function() {
            localStorage.removeItem(STORAGE_KEY);
            fields.forEach(function(f) { f.value = ''; });
            if (status) {
                status.style.color = 'var(--fellow-muted)';
                status.textContent = 'Jawaban latihan dihapus.';
            }
        });

        // Bind Pyodide run/reset
        document.querySelectorAll('.py-run').forEach(function(btn) {
            var pid = btn.getAttribute('data-play');
            btn.disabled = true;
            btn.addEventListener('click', function() { runCode(pid); });
        });
        document.querySelectorAll('.py-reset').forEach(function(btn) {
            var pid = btn.getAttribute('data-play');
            btn.addEventListener('click', function() {
                var editor = document.querySelector('#play-' + pid + ' .py-editor');
                if (!editor) return;
                editor.value = editor.defaultValue || editor.getAttribute('data-original') || '';
                var out = document.getElementById('out-' + pid);
                if (out) { out.className = 'py-output'; out.textContent = ''; }
            });
        });

        // Store original code for reset
        document.querySelectorAll('.py-editor').forEach(function(ed) {
            ed.setAttribute('data-original', ed.value);
        });

        var focusTarget = getHashQueryParam('focus');
        if (focusTarget) {
            var safeFocusTarget = focusTarget.replace(/[^a-z0-9-]/gi, '');
            var focusedCard = document.querySelector('[data-practice-focus="' + safeFocusTarget + '"]');
            if (focusedCard) {
                focusedCard.style.borderColor = 'rgba(246,51,146,.58)';
                focusedCard.style.boxShadow = '0 0 0 5px rgba(246,51,146,.12), 0 14px 34px rgba(246,51,146,.14)';
                focusedCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                var note = document.createElement('div');
                note.className = 'python-focus-note';
                note.style.cssText = 'display:flex;align-items:flex-start;gap:10px;margin:0 0 16px;padding:12px 14px;border:1px solid rgba(246,51,146,.28);border-radius:16px;background:#fff7fb;color:#171827;font-weight:700;';
                note.innerHTML = '<i class="fas fa-location-dot" style="color:#f63392;margin-top:3px;"></i><span>Latihan ini dibuka dari materi yang sedang kamu baca. Kerjakan bagian ini dulu sebelum lanjut ke latihan lain.</span>';
                var body = focusedCard.querySelector('div[style*="padding: 24px"]') || focusedCard;
                if (!body.querySelector('.python-focus-note')) body.prepend(note);
            }
        }

        startPyodide();
    };

    window.initAiPythonQuiz = function() {
        var quizForm = document.getElementById('aiPythonQuizForm');
        if (!quizForm || quizForm.dataset.quizReady) return;
        quizForm.dataset.quizReady = 'true';
        var quizDoneKey = 'heraiAiPythonQuizDone';
        var quizScoreKey = 'heraiAiPythonQuizScore';
        var groups = ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15'];
        var resultBox = document.getElementById('aiPythonQuizResult');
        var nextLink = document.getElementById('aiPythonQuizNext');
        var submitButton = quizForm.querySelector('.quiz-submit-btn');
        var isQuizDone = localStorage.getItem(quizDoneKey) === 'true';

        var syncSelectedLabels = function() {
            quizForm.querySelectorAll('label').forEach(function(lbl) {
                var inp = lbl.querySelector('input[type="radio"]');
                if (inp) lbl.classList.toggle('is-selected', inp.checked);
            });
        };

        quizForm.querySelectorAll('input[type="radio"]').forEach(function(input) {
            input.addEventListener('change', syncSelectedLabels);
        });

        var showResult = function(score, total) {
            if (!resultBox) return;
            resultBox.hidden = false;
            resultBox.innerHTML = '<strong>Nilai kamu: ' + score + '/' + total + '</strong><span>Skor tersimpan. Kuis single attempt sudah terkunci; jawaban benar dan salah ditandai langsung di kartu opsi.</span>';
        };

        if (isQuizDone) {
            var savedScore = Number(localStorage.getItem(quizScoreKey) || 0);
            showResult(savedScore, groups.length);
            quizForm.querySelectorAll('label').forEach(function(lbl) {
                var inp = lbl.querySelector('input');
                if (inp) {
                    inp.disabled = true;
                    lbl.classList.add('is-locked');
                    if (inp.value === '1') {
                        lbl.classList.add('is-correct');
                    } else if (inp.checked) {
                        lbl.classList.add('is-wrong');
                    }
                }
            });
            if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Kuis Sudah Dikirim'; }
            if (nextLink) nextLink.classList.remove('is-disabled');
            document.querySelectorAll('[data-locked-after-quiz]').forEach(function(i) { i.hidden = false; });
            document.querySelectorAll('.lesson-lock-hint').forEach(function(i) { i.hidden = true; });
            return;
        }

        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var score = 0;
            for (var i = 0; i < groups.length; i++) {
                var s = quizForm.querySelector('input[name="' + groups[i] + '"]:checked');
                if (s && s.value === '1') score += 1;
            }
            localStorage.setItem(quizDoneKey, 'true');
            localStorage.setItem(quizScoreKey, String(score));
            showResult(score, groups.length);
            quizForm.querySelectorAll('label').forEach(function(lbl) {
                var inp = lbl.querySelector('input');
                if (inp) {
                    inp.disabled = true;
                    lbl.classList.add('is-locked');
                    if (inp.value === '1') {
                        lbl.classList.add('is-correct');
                    } else if (inp.checked) {
                        lbl.classList.add('is-wrong');
                    }
                }
            });
            if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Kuis Sudah Dikirim'; }
            document.querySelectorAll('[data-locked-after-quiz]').forEach(function(i) { i.hidden = false; });
            document.querySelectorAll('.lesson-lock-hint').forEach(function(i) { i.hidden = true; });
            if (nextLink) nextLink.classList.remove('is-disabled');
        });
    };

    window.initAiPythonDiscussion = function() {
        var form = document.getElementById('aiPythonDiscussionForm');
        var list = document.getElementById('aiPythonDiscussionList');
        if (!form || !list || form.dataset.discussionReady) return;
        form.dataset.discussionReady = 'true';
        var STORAGE_KEY = 'heraiAiPythonDiscussion';
        var fallback = [
            { id: 'seed-1', name: 'Aisyah Putri', time: 'Hari ini, 10.30', text: 'Menurut kalian, kenapa Python tetap jadi bahasa pertama untuk AI walaupun komputasi beratnya sering dikerjakan C++ atau CUDA di balik library?', replies: [{ name: 'Mentor Rani', time: 'Hari ini, 10.42', text: 'Python mempercepat eksperimen dan membuat pipeline mudah dibaca. Library seperti NumPy dan PyTorch menjembatani kemudahan Python dengan performa backend native.' }] }
        ];

        var esc = function(v) { return String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); };
        var load = function() { return JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(fallback)); };
        var save = function(items) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); };
        var ts = function() { return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()); };
        var render = function() {
            var items = load();
            list.innerHTML = items.map(function(item) {
                return '<article class="discussion-bubble"><div><span>' + esc(item.name.charAt(0)) + '</span><strong>' + esc(item.name) + '</strong><small>' + esc(item.time) + '</small></div><p>' + esc(item.text) + '</p><button type="button" data-reply="' + item.id + '">Reply</button><div class="discussion-replies">' + (item.replies || []).map(function(r) { return '<article><strong>' + esc(r.name) + '</strong><small>' + esc(r.time) + '</small><p>' + esc(r.text) + '</p></article>'; }).join('') + '</div></article>';
            }).join('');
            list.querySelectorAll('[data-reply]').forEach(function(b) {
                b.addEventListener('click', function() {
                    var txt = prompt('Tulis balasan diskusi:');
                    if (!txt || !txt.trim()) return;
                    var u = load();
                    var t = u.find(function(x) { return x.id === b.dataset.reply; });
                    if (t) { t.replies = t.replies || []; t.replies.push({ name: 'Aisyah Putri', time: ts(), text: txt.trim() }); save(u); render(); }
                });
            });
        };
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var ta = form.querySelector('textarea');
            var txt = ta?.value.trim();
            if (!txt) return;
            var u = load();
            u.unshift({ id: 'post-' + Date.now(), name: 'Aisyah Putri', time: ts(), text: txt, replies: [] });
            save(u); ta.value = ''; render();
        });
        render();
        render();
    };

    window.initAiPythonMateri = function() {
        var container = document.getElementById('python-chapter-container');
        if (!container) return;

        var STORAGE_KEY_CHAPTER = 'heraiAiPythonCurrentChapter';
        var currentChapter = parseInt(localStorage.getItem(STORAGE_KEY_CHAPTER) || '1', 10);
        var totalChapters = 13; // 13 detailed Python for AI chapters
        if (isNaN(currentChapter) || currentChapter < 1 || currentChapter > totalChapters) {
            currentChapter = 1;
            localStorage.setItem(STORAGE_KEY_CHAPTER, '1');
        }
        if (isNaN(currentChapter) || currentChapter < 1 || currentChapter > totalChapters) {
            currentChapter = 1;
            localStorage.setItem(STORAGE_KEY_CHAPTER, '1');
        }
        if (isNaN(currentChapter) || currentChapter < 1 || currentChapter > totalChapters) {
            currentChapter = 1;
            localStorage.setItem(STORAGE_KEY_CHAPTER, '1');
        }

        var btnPrev = document.getElementById('btn-prev-chapter');
        var btnNext = document.getElementById('btn-next-chapter');
        var btnFinish = document.getElementById('btn-finish-materi');

        var activeLabs = [
            null,
            { q: 'Kenapa Python tetap populer untuk AI walau bukan bahasa tercepat?', options: ['Karena Python memudahkan eksperimen dan memanggil library native cepat', 'Karena Python selalu lebih cepat dari CUDA', 'Karena AI tidak butuh library'], answer: 0, challenge: 'Tulis 3 alasan Python nyaman dipakai untuk eksplorasi model AI.' },
            { q: 'Apa fungsi paling praktis virtual environment?', options: ['Mengisolasi dependency tiap proyek', 'Menghapus semua bug kode', 'Membuat CPU menjadi GPU'], answer: 0, challenge: 'Buat checklist setup proyek AI: venv, install package, freeze dependency.' },
            { q: 'Nilai akurasi 0.92 paling cocok disimpan sebagai apa?', options: ['float', 'bool', 'list'], answer: 0, challenge: 'Buat 4 variabel: nama_model, epoch, learning_rate, is_training.' },
            { q: 'Konfigurasi model berbasis nama dan nilai paling cocok memakai apa?', options: ['dictionary', 'string panjang', 'boolean'], answer: 0, challenge: 'Rancang dictionary config model berisi learning_rate, batch_size, dan metric.' },
            { q: 'Kapan percabangan dipakai dalam pipeline AI?', options: ['Saat memilih aksi berdasarkan kondisi data/model', 'Saat semua data harus dihapus', 'Saat tidak ada keputusan'], answer: 0, challenge: 'Tulis aturan if/elif/else untuk status model berdasarkan akurasi.' },
            { q: 'Loop `for` paling tepat untuk kasus apa?', options: ['Memproses setiap item dataset', 'Menjalankan kode tanpa batas selalu', 'Mengganti semua fungsi'], answer: 0, challenge: 'Buat loop untuk menghitung jumlah label positif dalam list.' },
            { q: 'Kenapa function penting untuk pipeline AI?', options: ['Agar preprocessing bisa dipakai ulang dan diuji', 'Agar kode makin panjang', 'Agar variabel global wajib dipakai'], answer: 0, challenge: 'Buat function normalize_text(text) untuk lowercase dan strip spasi.' },
            { q: 'Apa keuntungan generator untuk data besar?', options: ['Menghasilkan data bertahap tanpa memuat semua ke memori', 'Selalu mempercepat GPU', 'Mengubah semua data jadi tuple'], answer: 0, challenge: 'Tulis ide generator untuk membaca batch data satu per satu.' },
            { q: 'Apa fungsi `self` dalam class Python?', options: ['Mengakses attribute milik object aktif', 'Menghapus object otomatis', 'Mengimpor library'], answer: 0, challenge: 'Buat class sederhana DatasetSample dengan attribute text dan label.' },
            { q: 'Kenapa exception handling penting?', options: ['Pipeline tetap memberi pesan jelas saat input/file bermasalah', 'Agar semua error disembunyikan', 'Agar kode tidak perlu diuji'], answer: 0, challenge: 'Tulis try/except untuk validasi angka learning_rate.' },
            { q: 'Kenapa `with open(...)` lebih aman?', options: ['File ditutup otomatis setelah selesai', 'File otomatis menjadi model AI', 'File otomatis terenkripsi'], answer: 0, challenge: 'Tulis pseudocode membaca file dataset dan menghitung jumlah baris.' },
            { q: 'Operasi matriks penting untuk AI karena apa?', options: ['Tensor, bobot, dan fitur model direpresentasikan sebagai array/matriks', 'Karena semua teks harus jadi gambar', 'Karena list Python tidak bisa menyimpan angka'], answer: 0, challenge: 'Coba bayangkan shape matrix fitur 4 sampel x 3 fitur.' },
            { q: 'Apa fungsi Pandas dalam alur data AI?', options: ['Membaca, membersihkan, memfilter, dan meringkas data tabular', 'Mengganti seluruh model neural network', 'Membuat virtual environment'], answer: 0, challenge: 'Tulis tiga kolom DataFrame kecil untuk eksperimen klasifikasi.' }
        ];

        var practiceTargets = {
            1: { focus: 'play-1', title: 'Latihan 1 - Tipe Data & Variabel', copy: 'Menghubungkan fondasi Python dengan data AI sederhana.' },
            2: { focus: 'play-7', title: 'Latihan 7 - Mini Project Pipeline', copy: 'Melihat dependency, file, dan alur runtime dalam pipeline kecil.' },
            3: { focus: 'play-1', title: 'Latihan 1 - Tipe Data & Variabel', copy: 'Menguji variabel, tipe data, dan nilai dasar model.' },
            4: { focus: 'play-2', title: 'Latihan 2 - List & Dictionary', copy: 'Mempraktikkan koleksi data untuk fitur dan konfigurasi.' },
            5: { focus: 'play-3', title: 'Latihan 3 - Control Flow', copy: 'Menguji logika kondisi untuk keputusan sederhana.' },
            6: { focus: 'play-3', title: 'Latihan 3 - Control Flow', copy: 'Memakai loop untuk memproses banyak item data.' },
            7: { focus: 'play-4', title: 'Latihan 4 - Functions', copy: 'Membuat fungsi reusable untuk logic pipeline.' },
            8: { focus: 'play-7', title: 'Latihan 7 - Mini Project Pipeline', copy: 'Melihat generator dan proses bertahap pada data teks.' },
            9: { focus: 'play-6', title: 'Latihan 6 - OOP & Error Handling', copy: 'Membungkus data dan perilaku ke dalam class.' },
            10: { focus: 'play-6', title: 'Latihan 6 - OOP & Error Handling', copy: 'Menangani input bermasalah tanpa membuat pipeline berhenti diam-diam.' },
            11: { focus: 'play-7', title: 'Latihan 7 - Mini Project Pipeline', copy: 'Membaca dan menulis file dalam alur preprocessing teks.' },
            12: { focus: 'play-5', title: 'Latihan 5 - Libraries AI', copy: 'Mempraktikkan NumPy untuk array dan statistik dasar.' },
            13: { focus: 'play-7', title: 'Latihan 7 - Mini Project Pipeline', copy: 'Membuat DataFrame Pandas dan ringkasan data tabular.' }
        };

        function appendActiveLab(chapterNumber) {
            var data = activeLabs[chapterNumber];
            if (!data || container.querySelector('.python-active-lab')) return;
            var target = practiceTargets[chapterNumber] || practiceTargets[1];
            var targetHref = '#/participant-ai-python-practice?focus=' + encodeURIComponent(target.focus);
            var lab = document.createElement('section');
            lab.className = 'python-active-lab';
            lab.innerHTML = '<header><div><h2>Belajar Aktif</h2><p>Gunakan panel ini untuk memastikan konsep chapter tidak hanya dibaca, tapi langsung diuji dan dihubungkan ke praktik Python untuk AI.</p></div><span class="lab-badge"><i class="fas fa-bolt"></i> Quick Check</span></header>' +
                '<div class="python-lab-grid">' +
                    '<div class="python-lab-card"><h3><i class="fas fa-circle-question"></i> Cek Pemahaman</h3><p>' + data.q + '</p><div class="python-check-options">' + data.options.map(function(opt, idx) { return '<button type="button" data-answer="' + idx + '">' + opt + '</button>'; }).join('') + '</div><div class="python-check-feedback" aria-live="polite"></div></div>' +
                    '<div class="python-lab-card"><h3><i class="fas fa-code"></i> Mini Challenge</h3><p>' + data.challenge + '</p><p><strong>Latihan terkait:</strong> ' + target.title + '. <span>' + target.copy + '</span></p><div class="python-lab-actions"><a href="' + targetHref + '"><i class="fas fa-location-dot"></i> Buka ' + target.title + '</a><button type="button" data-mark-understood><i class="far fa-circle-check"></i> Tandai Paham</button></div></div>' +
                '</div>';
            container.appendChild(lab);
            var feedback = lab.querySelector('.python-check-feedback');
            lab.querySelectorAll('[data-answer]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    lab.querySelectorAll('[data-answer]').forEach(function(other) {
                        other.classList.remove('is-correct', 'is-wrong');
                    });
                    var chosen = Number(btn.getAttribute('data-answer'));
                    var correct = chosen === data.answer;
                    btn.classList.add(correct ? 'is-correct' : 'is-wrong');
                    if (feedback) feedback.textContent = correct ? 'Benar. Kamu sudah menangkap inti chapter ini.' : 'Belum tepat. Baca ulang konsep utama dan contoh kode di atas.';
                });
            });
            var mark = lab.querySelector('[data-mark-understood]');
            if (mark) {
                mark.addEventListener('click', function() {
                    mark.innerHTML = '<i class="fas fa-circle-check"></i> Sudah Paham';
                    mark.style.background = 'rgba(246,51,146,.12)';
                });
            }
        }

        function loadChapter(chapterNumber) {
            container.innerHTML = '<div style="text-align: center; padding: 60px; color: var(--fellow-muted);"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--fellow-pink); margin-bottom: 16px;"></i><p>Memuat Topik ' + chapterNumber + '...</p></div>';

            var formattedNumber = chapterNumber < 10 ? '0' + chapterNumber : chapterNumber;
            var path = '';
            if (chapterNumber === 1) path = '01-memulai-python.html';
            else path = formattedNumber + '-materi.html'; // Future fallback

            fetch('/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/' + path)
                .then(function(res) {
                    if (!res.ok) throw new Error('Not found');
                    return res.text();
                })
                .then(function(html) {
                    container.innerHTML = html;
                    appendActiveLab(chapterNumber);
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    // Activate Inline Playgrounds
                    startPyodide();
                    var runs = container.querySelectorAll('.py-run');
                    runs.forEach(function(btn) {
                        btn.addEventListener('click', function() {
                            var idMatch = this.getAttribute('onclick') ? this.getAttribute('onclick').match(/'([^']+)'/) : null;
                            var id = idMatch ? idMatch[1] : this.id.replace('btn-run-', '');
                            runCode(id);
                        });
                        btn.removeAttribute('onclick');
                    });

                    // Update sidebar list styling
                    var listItems = document.querySelectorAll('#python-sidebar-list li');
                    listItems.forEach(function(li) {
                        var chapter = parseInt(li.getAttribute('data-chapter') || '0', 10);
                        var icon = li.querySelector('i');
                        if (chapter === chapterNumber) {
                            li.classList.add('active');
                            icon.className = 'far fa-circle-play';
                        } else if (chapter < chapterNumber) {
                            li.classList.add('active');
                            icon.className = 'fas fa-circle-check';
                        } else {
                            li.classList.remove('active');
                            icon.className = 'far fa-circle';
                        }
                    });

                    // Update progress percentage
                    var progressValue = Math.round((chapterNumber / totalChapters) * 100);
                    var progressB = document.querySelector('.lesson-progress-mini b');
                    var progressStrong = document.querySelector('.lesson-progress-mini strong');
                    var progressText = document.querySelector('.lesson-progress-card p');
                    if (progressB) progressB.style.setProperty('--value', progressValue + '%');
                    if (progressStrong) progressStrong.textContent = progressValue + '%';
                    if (progressText) progressText.textContent = chapterNumber + ' dari ' + totalChapters + ' materi selesai';
                })
                .catch(function(err) {
                    console.error("Modul load error:", err);
                    container.innerHTML = '<div style="padding: 40px; text-align:center; color: #f63392;"><h3>Topik Belum Tersedia</h3><p>Topik ' + chapterNumber + ' masih dalam tahap penulisan oleh AI Curriculum Engineer.</p></div>';
                });

            if (btnPrev) btnPrev.style.display = chapterNumber > 1 ? 'block' : 'none';
            if (btnNext) btnNext.style.display = chapterNumber < totalChapters ? 'block' : 'none';
            if (btnFinish) btnFinish.style.display = chapterNumber === totalChapters ? 'block' : 'none';
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', function() {
                if (currentChapter > 1) {
                    currentChapter--;
                    localStorage.setItem(STORAGE_KEY_CHAPTER, currentChapter.toString());
                    loadChapter(currentChapter);
                }
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', function() {
                if (currentChapter < totalChapters) {
                    currentChapter++;
                    localStorage.setItem(STORAGE_KEY_CHAPTER, currentChapter.toString());
                    loadChapter(currentChapter);
                }
            });
        }

        window.loadPythonChapter = function(chapterNum) {
            if (chapterNum >= 1 && chapterNum <= totalChapters) {
                currentChapter = chapterNum;
                localStorage.setItem(STORAGE_KEY_CHAPTER, currentChapter.toString());
                loadChapter(currentChapter);
            }
        };

        // Load immediately
        loadChapter(currentChapter);
    };

})();
