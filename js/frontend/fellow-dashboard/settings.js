(function() {
    'use strict';

    const STORAGE_KEY = 'heraiParticipantPortalSettings';
    const API_URL_KEY = 'heraiParticipantPortalApiUrl';
    const ADMIN_KEY = 'heraiParticipantPortalAdminKey';
    const SIDEBAR_STATE_KEY = 'heraiFellowSidebarExpanded';
    const PARTICIPANT_SESSION_KEY = 'heraiParticipantSession';
    const DASHBOARD_CACHE_PREFIX = 'heraiParticipantDashboardCache';
    const DASHBOARD_CACHE_TTL_MS = 5 * 60 * 1000;
    const DASHBOARD_CACHE_MAX_STALE_MS = 30 * 60 * 1000;
    const DASHBOARD_REQUEST_TIMEOUT_MS = 20000;
    const PROGRESS_SAVE_TIMEOUT_MS = 10000;

    var _dashboardDataCache = null;
    var _dashboardDataPromise = null;

    // ---------------------------------------------------------------
    // AI Lab Module Loader — Lazy loading for 29 ai-*.js modules
    // Loaded on-demand when user navigates to a module page.
    // ---------------------------------------------------------------
    window.__aiLabLoader = {
        cache: new Set(),
        _pending: {},
        load: function(name) {
            if (this.cache.has(name)) return Promise.resolve();
            if (this._pending[name]) return this._pending[name];
            this._pending[name] = new Promise(function(resolve, reject) {
                var s = document.createElement('script');
                var version = name === 'math-learning'
                    ? '20260816-response-persistence-v1'
                    : '20260803-discussion-name-fix';
                s.src = '/js/frontend/fellow-dashboard/' + name + '.js?v=' + version;
                s.onload = function() { window.__aiLabLoader.cache.add(name); delete window.__aiLabLoader._pending[name]; resolve(); };
                s.onerror = function() { delete window.__aiLabLoader._pending[name]; reject(new Error('Failed to load: ' + name)); };
                document.head.appendChild(s);
            });
            return this._pending[name];
        }
    };

    // P5 UX Polish: Global toast helper for save confirmations and feedback
    window.__aiLabToast = function(message, type, duration) {
        type = type || 'success';
        duration = duration || 2200;
        var existing = document.querySelector('.ai-lab-toast');
        if (existing) existing.remove();
        var icons = { success: 'fa-circle-check', error: 'fa-circle-exclamation', info: 'fa-circle-info' };
        var colors = { success: '#22c55e', error: '#ef4444', info: '#f63392' };
        var toast = document.createElement('div');
        toast.className = 'ai-lab-toast';
        toast.style.borderLeft = '3px solid ' + (colors[type] || colors.success);
        toast.innerHTML = '<i class="fas ' + (icons[type] || icons.success) + '" style="color:' + (colors[type] || colors.success) + '"></i><span>' + (message || '') + '</span>';
        document.body.appendChild(toast);
        setTimeout(function() {
            toast.classList.add('is-out');
            setTimeout(function() { if (toast.parentNode) toast.remove(); }, 260);
        }, duration);
    };

    const DEFAULT_SETTINGS = {
        enabled: true,
        pages: {
            dashboard: true,
            modules: true,
            profile: false,
            chatroom: false,
            mentor: false,
            tasks: false,
            projects: false,
            events: false,
            community: false,
            certificates: false,
            leaderboard: true,
            faq: false,
            settings: true
        }
    };

    function apiBase() {
        const configured = window.PARTICIPANT_PORTAL_API_URL || localStorage.getItem(API_URL_KEY);
        if (configured) return String(configured).trim().replace(/\/+$/, '');
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://127.0.0.1:8092';
        }
        return '';
    }

    function mergeSettings(settings = {}) {
        return {
            ...DEFAULT_SETTINGS,
            ...settings,
            pages: {
                ...DEFAULT_SETTINGS.pages,
                ...(settings.pages || {})
            }
        };
    }

    function localSettings() {
        try {
            return mergeSettings(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
        } catch {
            return mergeSettings();
        }
    }

    async function fetchSettings() {
        const fallback = localSettings();
        try {
            const response = await fetch('/__gas', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action: 'getSettings' })
            });
            if (!response.ok) return fallback;
            const result = await response.json();
            if (result.status !== 'success') return fallback;
            const merged = mergeSettings(result.settings || {});
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            return merged;
        } catch {
            return fallback;
        }
    }

    async function saveSettings(settings) {
        // Saving settings from participant portal is no longer supported directly.
        // It is managed by Admin Dashboard now.
        const merged = mergeSettings(settings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
    }

    function applySettings(settings, pageName) {
        const merged = mergeSettings(settings);
        document.querySelectorAll('[data-fellow-nav]').forEach(link => {
            const key = link.getAttribute('data-fellow-nav');
            link.hidden = merged.pages[key] === false;
        });
        document.querySelectorAll('[data-fellow-feature]').forEach(element => {
            const key = element.getAttribute('data-fellow-feature');
            element.hidden = merged.pages[key] === false;
        });

        const isBlocked = merged.enabled === false || (pageName && merged.pages[pageName] === false);
        const root = document.querySelector('.fellow-dashboard');
        if (root) root.classList.toggle('fellow-dashboard-locked', isBlocked);
        if (isBlocked && root) {
            root.innerHTML = `
                <section class="fellow-locked-state">
                    <div>
                        <i class="fas fa-lock"></i>
                        <h1>Dashboard Peserta Belum Aktif</h1>
                        <p>Halaman ini sedang dinonaktifkan oleh admin. Silakan kembali lagi setelah panitia membuka aksesnya.</p>
                        <a href="#/home">Kembali ke Beranda</a>
                    </div>
                </section>
            `;
        }
    }

    function attachSidebarRail() {
        const sidebar = document.querySelector('.fellow-sidebar');
        if (!sidebar || sidebar.dataset.railReady) return;
        sidebar.dataset.railReady = 'true';
        const dashboard = sidebar.closest('.fellow-dashboard');
        const toggle = dashboard?.querySelector('.fellow-menu-toggle');
        const scrim = dashboard?.querySelector('.fellow-sidebar-scrim');
        const logo = sidebar.querySelector('.fellow-logo');

        const setMobileMenu = (open) => {
            if (!dashboard) return;
            dashboard.classList.toggle('sidebar-open', open);
            toggle?.setAttribute('aria-expanded', String(open));
            toggle?.querySelector('i')?.classList.toggle('fa-bars', !open);
            toggle?.querySelector('i')?.classList.toggle('fa-xmark', open);
        };

        const setDesktopSidebar = (open, persist = true) => {
            if (window.matchMedia('(max-width: 860px)').matches) return;
            sidebar.classList.toggle('is-expanded', open);
            dashboard?.classList.toggle('sidebar-expanded', open);
            logo?.setAttribute('aria-expanded', String(open));
            if (persist) localStorage.setItem(SIDEBAR_STATE_KEY, open ? 'true' : 'false');
        };

        const stored = localStorage.getItem(SIDEBAR_STATE_KEY);
        setDesktopSidebar(stored === 'true', false);

        logo?.setAttribute('role', 'button');
        logo?.setAttribute('aria-expanded', String(sidebar.classList.contains('is-expanded')));
        logo?.addEventListener('click', (event) => {
            if (window.matchMedia('(max-width: 860px)').matches) return;
            event.preventDefault();
            setDesktopSidebar(!sidebar.classList.contains('is-expanded'));
        });
        toggle?.addEventListener('click', () => {
            const next = !dashboard?.classList.contains('sidebar-open');
            setMobileMenu(next);
        });
        scrim?.addEventListener('click', () => setMobileMenu(false));
        sidebar.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 860px)').matches) {
                    setMobileMenu(false);
                }
            });
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') setMobileMenu(false);
        });
        window.addEventListener('resize', () => {
            if (!window.matchMedia('(max-width: 860px)').matches) {
                setMobileMenu(false);
                setDesktopSidebar(localStorage.getItem(SIDEBAR_STATE_KEY) === 'true', false);
            } else {
                sidebar.classList.remove('is-expanded');
                dashboard?.classList.remove('sidebar-expanded');
                logo?.setAttribute('aria-expanded', 'false');
            }
        });

        var allowedNavKeys = ['dashboard', 'modules', 'leaderboard', 'settings'];
        sidebar.querySelectorAll('.fellow-menu a[data-fellow-nav]').forEach(function(link) {
            if (allowedNavKeys.indexOf(link.dataset.fellowNav) === -1) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    renderParticipantRestricted();
                });
            }
        });
    }

    function setActiveFellowNav(pageName) {
        const path = window.location.hash.replace(/^#/, '') || '/participant-dashboard';
        const pageByPath = {
            '/participant-dashboard': 'dashboard',
            '/participant-modules': 'modules',
            '/participant-ai-fundamentals': 'modules',
            '/participant-ai-intro': 'modules',
            '/participant-ai-intro-practice': 'modules',
            '/participant-ai-intro-quiz': 'modules',
            '/participant-ai-intro-discussion': 'modules',
            '/participant-ai-history': 'modules',
            '/participant-ai-types': 'modules',
            '/participant-ai-components': 'modules',
            '/participant-ai-applications': 'modules',
            '/participant-ai-summary': 'modules',
            '/participant-profile': 'profile',
            '/participant-mentor': 'mentor',
            '/participant-tasks': 'tasks',
            '/participant-projects': 'projects',
            '/participant-events': 'events',
            '/participant-community': 'community',
            '/participant-certificates': 'certificates',
            '/participant-leaderboard': 'leaderboard',
            '/participant-help': 'faq',
            '/participant-settings': 'settings'
        };
        const activeKey = pageByPath[path] || pageName;
        document.querySelectorAll('.fellow-menu a').forEach((link) => {
            link.classList.toggle('active', link.dataset.fellowNav === activeKey);
        });
    }

    function initModuleInteractions() {
        const modulePage = document.querySelector('.fellow-modules-page');
        if (!modulePage || modulePage.dataset.moduleReady) return;
        modulePage.dataset.moduleReady = 'true';

        modulePage.querySelectorAll('.course-card').forEach(card => {
            const link = card.querySelector('a');
            if (!link || card.dataset.clickReady) return;
            card.dataset.clickReady = 'true';
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a, button, input, textarea')) {
                    link.click();
                }
            });
        });

        modulePage.querySelectorAll('[data-v2-tab]').forEach((button) => {
            button.addEventListener('click', () => {
                const target = button.dataset.v2Tab;

                // Update active state on buttons
                modulePage.querySelectorAll('[data-v2-tab]').forEach(item => {
                    item.classList.toggle('active', item === button);
                });

                // Filter sections
                modulePage.querySelectorAll('[data-v2-section]').forEach(section => {
                    if (target === 'all') {
                        section.classList.add('active');
                    } else {
                        section.classList.toggle('active', section.dataset.v2Section === target);
                    }
                });
            });
        });

        modulePage.querySelectorAll('[data-course-filter]').forEach((button) => {
            button.addEventListener('click', () => {
                const filter = button.dataset.courseFilter;
                modulePage.querySelectorAll('[data-course-filter]').forEach(item => item.classList.toggle('active', item === button));
                modulePage.querySelectorAll('.course-category').forEach((category) => {
                    const group = category.querySelector('[data-course-group]')?.dataset.courseGroup || '';
                    category.hidden = filter !== 'all' && group !== filter;
                });
            });
        });

        modulePage.querySelectorAll('[data-collapse-panel]').forEach((button) => {
            button.addEventListener('click', () => {
                const panel = document.getElementById(button.dataset.collapsePanel);
                if (!panel) return;
                const collapsed = panel.classList.toggle('is-collapsed');
                button.setAttribute('aria-expanded', String(!collapsed));
                button.querySelector('i')?.classList.toggle('fa-chevron-up', !collapsed);
                button.querySelector('i')?.classList.toggle('fa-chevron-down', collapsed);
            });
        });

        const search = modulePage.querySelector('[data-module-search]');
        const empty = modulePage.querySelector('[data-module-search-empty]');
        if (search) {
            search.addEventListener('input', () => {
                const query = String(search.value || '').trim().toLocaleLowerCase('id-ID');
                let visible = 0;
                modulePage.querySelectorAll('.v2-course-card').forEach(card => {
                    const matches = !query || card.textContent.toLocaleLowerCase('id-ID').includes(query);
                    card.style.display = matches ? '' : 'none';
                    if (matches) visible += 1;
                });
                if (empty) empty.hidden = visible !== 0;
            });
        }

        const retry = modulePage.querySelector('[data-module-summary-retry]');
        retry?.addEventListener('click', () => window.__retryParticipantModules?.());
    }

    const introLessonRoutes = [
        { path: '/participant-ai-intro', title: 'AI di Sekitar Kita dan Fondasi Awal', short: 'Fondasi Awal' },
        { path: '/participant-ai-history', title: 'Definisi, Software Biasa, dan Sistem AI', short: 'Definisi & Software' },
        { path: '/participant-ai-types', title: 'Cara Kerja AI: Data, Model, dan Human Check', short: 'Cara Kerja AI' },
        { path: '/participant-ai-ml-dl', title: 'Peta Istilah dan Penerapan AI', short: 'Peta & Penerapan' },
        { path: '/participant-ai-summary', title: 'Risiko, Etika, dan Audit Sosio-Teknis', short: 'Risiko & Audit' }
    ];

    const generatedLessonContent = {
        '/participant-ai-history': {
            title: 'Definisi, Software Biasa, dan Sistem AI',
            description: 'Membangun fondasi definisi AI, membedakan software deterministik dari sistem prediktif, dan membaca contoh harian secara kritis.',
            duration: '55 menit',
            tag: 'Fondasi',
            content: `
                <header class="lesson-topic-banner">
                    <h3><i class="fas fa-compass"></i> Topik 2: Definisi, Software Biasa, dan Sistem AI
                    </h3>
                    <p>Goal: Memahami AI sebagai sistem prediktif, bukan robot fiksi ilmiah, sekaligus membedakan software biasa dari sistem berbasis data.
                    </p>
                </header>

                <h3>2.1 Kenapa Definisi AI Perlu Diluruskan</h3>
                <p>Banyak orang pertama kali mengenal AI dari film, novel, atau berita sensasional. Akibatnya, AI sering dibayangkan sebagai robot fisik yang punya emosi, kesadaran diri, atau niat tersembunyi. Gambaran itu menarik, tetapi kurang membantu untuk belajar AI yang dipakai hari ini.</p>
                <p>Dalam praktik modern, AI jauh lebih sering berbentuk sistem prediktif yang bekerja di balik aplikasi. Ia menerima input, mencari pola, lalu menghasilkan output. Output itu bisa berupa rekomendasi video, label spam, terjemahan kalimat, ringkasan teks, skor risiko, atau saran rute.</p>

                <div style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px; margin: 24px 0;">
                    <h4 style="margin: 0 0 10px 0; color: var(--fellow-text);"><i class="fas fa-quote-left" style="color: var(--fellow-pink);"></i> Definisi kerja yang dipakai modul ini</h4>
                    <p style="margin: 0; color: var(--fellow-text);">AI adalah sistem berbasis mesin yang, untuk tujuan tertentu, menggunakan input untuk menyimpulkan cara menghasilkan output seperti prediksi, rekomendasi, konten, atau keputusan yang dapat memengaruhi lingkungan digital maupun fisik.</p>
                </div>

                <h3>2.2 Apa yang AI Lakukan dengan Baik</h3>
                <p>Kekuatan utama AI bukan karena ia memahami dunia seperti manusia. Kekuatan utamanya ada pada kemampuan membaca pola dari data dalam skala besar. AI dapat menemukan keteraturan yang terlalu banyak, terlalu cepat, atau terlalu rumit untuk dicek manual.</p>
                <ul style="line-height: 1.8; color: var(--fellow-text);">
                    <li><strong>Mengenali pola:</strong> menemukan kemiripan dalam teks, gambar, suara, perilaku klik, atau transaksi.</li>
                    <li><strong>Memprediksi kemungkinan:</strong> memperkirakan kata berikutnya, rute tercepat, risiko spam, atau minat pengguna.</li>
                    <li><strong>Mengurutkan pilihan:</strong> memilih kandidat, video, produk, atau jawaban yang dianggap paling relevan.</li>
                    <li><strong>Membantu keputusan:</strong> memberi sinyal awal yang masih perlu diperiksa manusia.</li>
                </ul>

                <h3>2.3 Apa yang AI Tidak Lakukan</h3>
                <p>AI tidak otomatis memahami makna, nilai moral, konteks sosial, atau dampak keputusan seperti manusia. Ketika chatbot menulis jawaban rapi, itu bukan bukti bahwa ia benar. Ketika sistem memberi skor kandidat, itu bukan bukti bahwa penilaiannya adil. Ketika aplikasi peta memberi rute tercepat, itu bukan bukti bahwa rute tersebut paling aman untuk warga sekitar.</p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-circle-check" style="color: var(--fellow-pink);"></i> Definisi yang membantu</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">AI sebagai sistem yang mengolah input, membaca pola, dan menghasilkan output untuk tujuan tertentu.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-circle-xmark" style="color: var(--fellow-pink);"></i> Definisi yang menyesatkan</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">AI sebagai mesin yang berpikir, merasa, dan memahami dunia persis seperti manusia.</p>
                    </article>
                </div>

                <h3>2.4 Prinsip Awal untuk Peserta</h3>
                <p>Dalam modul ini, setiap sistem AI akan dibaca dengan pertanyaan praktis: sistem ini dibuat untuk tujuan apa, input apa yang dipakai, pola apa yang dipelajari, output apa yang muncul, dan siapa yang memeriksa dampaknya.</p>

                <h3>2.5 Software Biasa: Ketika Semua Aturan Ditulis Manual</h3>
                <p>Untuk benar-benar memahami AI, peserta perlu tahu dulu apa yang bukan AI. Software biasa bekerja seperti instruksi yang sudah dikunci. Pemrogram menulis aturan dengan jelas, lalu komputer menjalankan aturan itu tanpa menafsirkan pola baru. Jika aturan mengatakan formulir email harus mengandung simbol @, maka formulir akan menolak input yang tidak memenuhi syarat itu. Sistem tidak memahami email, tidak belajar dari ribuan alamat email, dan tidak memperbaiki dirinya dari waktu ke waktu.</p>
                <p>Kalkulator adalah contoh paling sederhana. Ketika pengguna memasukkan 7 x 8, kalkulator menjalankan operasi aritmatika. Ia tidak memprediksi, tidak membaca pola, dan tidak membuat keputusan probabilistik. Hal yang sama berlaku pada tombol submit, menu dropdown, validasi nomor telepon berbasis jumlah digit, atau sistem absensi yang hanya mencatat waktu masuk. Semua itu bisa sangat berguna, tetapi belum tentu AI.</p>

                <h3>2.6 Sistem AI: Ketika Aturan Dipelajari dari Contoh</h3>
                <p>Sistem AI bekerja dengan pola yang berbeda. Alih-alih semua aturan ditulis manual, sistem diberi banyak contoh, lalu mencari keteraturan dari contoh tersebut. Filter spam, misalnya, tidak hanya mengandalkan daftar kata terlarang. Ia membaca arsip email lama, label spam dari pengguna, reputasi domain pengirim, pola tautan, waktu pengiriman, format pesan, sampai kebiasaan penipuan yang berubah dari waktu ke waktu.</p>
                <p>Perbedaan ini penting karena AI sering menghasilkan output yang berupa tebakan terbaik, bukan kebenaran final. Ketika sistem memberi label "spam", sebenarnya ia sedang mengatakan: berdasarkan pola masa lalu, email ini sangat mirip dengan email yang sebelumnya dianggap spam. Karena itu, sistem bisa salah. Email wawancara kerja bisa masuk spam, pesan penipuan bisa lolos, dan rekomendasi produk bisa meleset dari kebutuhan pengguna.</p>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 10px 0; color: var(--fellow-text);"><i class="fas fa-list-check" style="color: var(--fellow-pink);"></i> Ciri software biasa</h4>
                        <ul style="margin: 0; padding-left: 18px; line-height: 1.8; color: var(--fellow-text);">
                            <li>Aturan utama ditulis eksplisit oleh manusia.</li>
                            <li>Output biasanya stabil untuk input yang sama.</li>
                            <li>Tidak otomatis membaik karena melihat contoh baru.</li>
                            <li>Cocok untuk tugas yang jelas, pasti, dan mudah dirumuskan.</li>
                        </ul>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 10px 0; color: var(--fellow-text);"><i class="fas fa-chart-line" style="color: var(--fellow-pink);"></i> Ciri sistem AI</h4>
                        <ul style="margin: 0; padding-left: 18px; line-height: 1.8; color: var(--fellow-text);">
                            <li>Mencari pola dari data historis atau contoh besar.</li>
                            <li>Output sering berupa prediksi, skor, label, rekomendasi, atau konten.</li>
                            <li>Bisa salah ketika data tidak lengkap, bias, atau konteks berubah.</li>
                            <li>Perlu mekanisme koreksi dan pemeriksaan manusia.</li>
                        </ul>
                    </article>
                </div>

                <h3>2.7 Analogi Buku Resep dan Pekerja Magang</h3>
                <p>Software biasa seperti buku resep yang sangat kaku. Semua takaran, suhu, dan urutan langkah harus ditulis. Jika resep tidak memuat instruksi tertentu, sistem tidak akan menebaknya sendiri. AI lebih mirip pekerja magang yang diberi ribuan contoh pekerjaan lama. Ia melihat dokumen mana yang diterima, pelanggan mana yang dilayani, email mana yang dianggap penipuan, atau kandidat mana yang dulu dianggap berhasil.</p>
                <p>Analogi pekerja magang membantu, tetapi juga harus dibaca dengan hati-hati. Pekerja magang bisa belajar kebiasaan buruk jika lingkungan lamanya buruk. Sistem AI juga begitu. Jika contoh lama berisi bias gender, bias kelas, bias wilayah, atau bias institusi pendidikan, AI dapat menganggap bias tersebut sebagai pola normal. Inilah alasan modul ini sejak awal membahas AI sebagai sistem sosio-teknis, bukan sekadar alat teknis.</p>

                <h3>2.8 Latihan Membaca Contoh Harian</h3>
                <p>Ketika aplikasi musik merekomendasikan lagu, jangan berhenti pada kesan "aplikasinya tahu seleraku". Baca sistemnya: tujuannya mungkin mempertahankan pengguna agar tetap mendengar; input-nya riwayat lagu, durasi dengar, skip, jam penggunaan, dan pola pengguna lain; output-nya daftar lagu yang diurutkan; pemeriksaan manusianya berupa skip, like, dislike, atau pengaturan rekomendasi.</p>
                <p>Ketika aplikasi belanja menampilkan produk yang terasa kebetulan cocok, itu bukan tebakan gaib. Sistem membaca kata kunci, kategori barang, harga yang sering dilihat, produk yang dimasukkan keranjang, durasi berhenti di halaman tertentu, dan pola belanja pengguna lain yang mirip. Dengan cara ini peserta mulai melihat AI sebagai mesin pengurutan dan prediksi, bukan sebagai entitas yang memahami keinginan manusia secara utuh.</p>

                <div style="background: rgba(246,51,146,.08); border: 1px solid rgba(246,51,146,.18); border-radius: 16px; padding: 20px; margin: 28px 0;">
                    <h4 style="margin: 0 0 10px 0; color: var(--fellow-text);"><i class="fas fa-magnifying-glass-chart" style="color: var(--fellow-pink);"></i> Ringkasan cara berpikir topik ini</h4>
                    <p style="margin: 0; color: var(--fellow-text);">Jangan bertanya "apakah mesin ini pintar seperti manusia?" sebagai pertanyaan utama. Pertanyaan yang lebih berguna adalah: data apa yang dipakai, pola apa yang dipelajari, output apa yang diberikan, siapa yang diuntungkan, siapa yang bisa dirugikan, dan bagaimana manusia dapat mengoreksi output yang keliru.</p>
                </div>
            `
        },
        '/participant-ai-components': {
            title: 'Software Biasa vs Sistem AI',
            description: 'Membedakan program deterministik dari sistem yang belajar dari data dan pola historis.',
            duration: '40 menit',
            tag: 'Konsep Inti',
            content: `
                <header class="lesson-topic-banner">
                    <h3><i class="fas fa-code-branch"></i> Topik 3: Software Biasa vs Sistem AI
                    </h3>
                    <p>Goal: Mengetahui kapan sebuah aplikasi hanya software biasa dan kapan ia layak disebut sistem AI.
                    </p>
                </header>

                <h3>3.1 Software Biasa: Aturan Ditulis Manual</h3>
                <p>Software biasa bekerja dengan aturan yang jelas, eksplisit, dan sudah ditulis oleh pemrogram. Jika kondisi A terjadi, sistem melakukan B. Jika kondisi tidak terpenuhi, sistem melakukan C. Polanya deterministik: input yang sama akan menghasilkan output yang sama selama aturan tidak diubah.</p>
                <p>Contoh sederhana adalah kalkulator. Ketika pengguna menulis 2 + 2, kalkulator tidak belajar dari jutaan operasi matematika. Ia menjalankan aturan aritmatika yang pasti. Contoh lain adalah formulir pendaftaran yang menolak email jika tidak ada simbol @. Validasi seperti itu berguna, tetapi bukan AI.</p>

                <h3>3.2 Sistem AI: Pola Dipelajari dari Data</h3>
                <p>Sistem AI tidak selalu diberi aturan satu per satu. Ia diberi banyak contoh, lalu mencari pola yang sering muncul. Dari pola itu, sistem membuat prediksi ketika menghadapi data baru.</p>
                <p>Filter spam tidak perlu diberi aturan kaku bahwa setiap kata tertentu pasti penipuan. Ia membaca banyak email yang pernah ditandai spam atau bukan spam, lalu menemukan kombinasi pola: subjek, kata, tautan, pengirim, waktu kirim, format, dan riwayat laporan pengguna.</p>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 10px 0; color: var(--fellow-text);"><i class="fas fa-calculator" style="color: var(--fellow-pink);"></i> Software biasa</h4>
                        <ul style="margin: 0; padding-left: 18px; line-height: 1.8; color: var(--fellow-text);">
                            <li>Aturan ditulis manual.</li>
                            <li>Tidak belajar dari contoh baru.</li>
                            <li>Output mengikuti logika yang sudah ditentukan.</li>
                            <li>Cocok untuk proses yang pasti dan stabil.</li>
                        </ul>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 10px 0; color: var(--fellow-text);"><i class="fas fa-chart-line" style="color: var(--fellow-pink);"></i> Sistem AI</h4>
                        <ul style="margin: 0; padding-left: 18px; line-height: 1.8; color: var(--fellow-text);">
                            <li>Belajar dari banyak contoh.</li>
                            <li>Mencari korelasi dan pola statistik.</li>
                            <li>Output berupa prediksi atau rekomendasi.</li>
                            <li>Cocok untuk data besar dan pola kompleks.</li>
                        </ul>
                    </article>
                </div>

                <h3>3.3 Analogi Buku Resep dan Pekerja Magang</h3>
                <p>Software biasa seperti buku resep. Semua langkah harus ditulis jelas: bahan, takaran, suhu, dan waktu. Jika ada langkah yang tidak ditulis, sistem tidak tahu apa yang harus dilakukan.</p>
                <p>AI lebih mirip pekerja magang yang diberi ribuan contoh pekerjaan lama. Ia mengamati contoh yang dianggap benar, melihat pola yang sering muncul, lalu mencoba membantu pada kasus baru. Analogi ini membuat AI lebih mudah dipahami: ia tidak menunggu aturan lengkap, tetapi belajar dari contoh.</p>
                <p>Namun analogi ini juga menunjukkan risiko. Jika contoh lama tidak adil, pekerja magang akan mempelajari kebiasaan yang tidak adil. Jika arsip rekrutmen lama lebih sering memilih kandidat dari kelompok tertentu, sistem bisa menganggap kelompok itulah pola sukses.</p>

                <h3>3.4 Cara Mengecek Apakah Sesuatu AI</h3>
                <ol style="line-height: 1.8; color: var(--fellow-text);">
                    <li>Apakah sistem hanya menjalankan aturan tetap?</li>
                    <li>Apakah sistem memakai data historis untuk mencari pola?</li>
                    <li>Apakah output-nya berupa prediksi, rekomendasi, label, skor, atau konten?</li>
                    <li>Apakah sistem bisa salah karena data latihnya tidak lengkap atau bias?</li>
                    <li>Apakah manusia perlu memeriksa hasilnya sebelum keputusan penting dibuat?</li>
                </ol>
            `
        },
        '/participant-ai-types': {
            title: 'Cara Kerja AI: Data, Model, dan Human Check',
            description: 'Membedah alur kerja AI dari tujuan, input, pola, model, output, training, inferensi, sampai pemeriksaan manusia.',
            duration: '70 menit',
            tag: 'Model Mental',
            content: `
                <header class="lesson-topic-banner">
                    <h3><i class="fas fa-route"></i> Topik 3: Cara Kerja AI: Data, Model, dan Human Check
                    </h3>
                    <p>Goal: Memahami alur kerja AI secara utuh tanpa masuk ke kode, rumus, atau arsitektur teknis.
                    </p>
                </header>

                <h3>3.1 Model Mental Enam Langkah</h3>
                <p>Setiap sistem AI bisa dibaca melalui alur sederhana: <strong>Tujuan, Input, Pola, Model, Output, dan Pemeriksaan Manusia</strong>. Alur ini membantu kita membedah AI tanpa perlu melihat kode di balik layar.</p>
                <p>Model mental ini sengaja dibuat sederhana agar peserta bisa menggunakannya pada banyak situasi: email, rekomendasi video, chatbot, peta digital, sistem pinjaman, sampai alat rekrutmen. Tujuannya bukan menghafal istilah teknis, tetapi membiasakan diri melihat AI sebagai rangkaian keputusan yang bisa ditanya dan diaudit.</p>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0;">
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <i class="fas fa-bullseye" style="color: var(--fellow-pink); font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                        <h4 style="margin: 0 0 8px 0;">Tujuan</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Apa yang ingin dibantu sistem: menyaring spam, memberi rekomendasi, menerjemahkan teks, atau memprediksi rute.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <i class="fas fa-database" style="color: var(--fellow-pink); font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                        <h4 style="margin: 0 0 8px 0;">Input</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Data yang masuk, seperti teks email, riwayat klik, lokasi, waktu, gambar, atau laporan pengguna.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <i class="fas fa-wave-square" style="color: var(--fellow-pink); font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                        <h4 style="margin: 0 0 8px 0;">Pola</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Keteraturan statistik yang ditemukan mesin dari banyak contoh masa lalu.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <i class="fas fa-cubes" style="color: var(--fellow-pink); font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                        <h4 style="margin: 0 0 8px 0;">Model</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Pola yang sudah dipadatkan menjadi sistem prediktif yang siap digunakan.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <i class="fas fa-arrow-up-right-from-square" style="color: var(--fellow-pink); font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                        <h4 style="margin: 0 0 8px 0;">Output</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Prediksi, label, rekomendasi, konten, atau keputusan yang muncul ke pengguna.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <i class="fas fa-user-check" style="color: var(--fellow-pink); font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                        <h4 style="margin: 0 0 8px 0;">Pemeriksaan Manusia</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Manusia memeriksa apakah output masuk akal, aman, adil, dan perlu dikoreksi.</p>
                    </article>
                </div>

                <h3 style="margin-top: 32px;">3.2 Contoh: Penyaring Email Spam</h3>
                <p>Bayangkan kotak masuk email yang otomatis memisahkan pesan penting dari spam. Sistemnya tidak sekadar diberi aturan kaku seperti &quot;jika ada kata hadiah, pasti spam&quot;. Sistem belajar dari banyak contoh email masa lalu dan mencari pola yang sering muncul pada pesan penipuan.</p>
                <p>Di balik fitur sederhana ini ada keputusan yang berlapis. Email dari pengirim baru bisa terlihat mencurigakan karena kombinasi subjek, isi pesan, tautan, waktu kirim, alamat domain, dan riwayat laporan pengguna lain. Sistem tidak tahu makna penipuan seperti manusia, tetapi ia bisa membaca korelasi yang sering muncul pada email berbahaya.</p>
                <div style="display: flex; flex-direction: column; gap: 16px; margin: 24px 0;">
                    <div style="background: white; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 16px; display: flex; gap: 16px;">
                        <div style="font-size: 1.5rem; color: var(--fellow-pink);"><i class="fas fa-flag"></i></div>
                        <div>
                            <h4 style="margin: 0 0 4px 0;">Tujuan</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--fellow-muted);">Memprediksi apakah email baru adalah spam atau bukan spam.</p>
                        </div>
                    </div>
                    <div style="background: white; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 16px; display: flex; gap: 16px;">
                        <div style="font-size: 1.5rem; color: var(--fellow-pink);"><i class="fas fa-inbox"></i></div>
                        <div>
                            <h4 style="margin: 0 0 4px 0;">Input dan Pola</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--fellow-muted);">Sistem membaca contoh email lama, subjek, isi pesan, asal pengirim, waktu kirim, dan label spam dari pengguna.</p>
                        </div>
                    </div>
                    <div style="background: white; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 16px; display: flex; gap: 16px;">
                        <div style="font-size: 1.5rem; color: var(--fellow-pink);"><i class="fas fa-tags"></i></div>
                        <div>
                            <h4 style="margin: 0 0 4px 0;">Model dan Output</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--fellow-muted);">Model memberi label pada email baru. Output-nya bisa berupa &quot;spam&quot;, &quot;bukan spam&quot;, atau skor risiko.</p>
                        </div>
                    </div>
                    <div style="background: white; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 16px; display: flex; gap: 16px;">
                        <div style="font-size: 1.5rem; color: var(--fellow-pink);"><i class="fas fa-rotate"></i></div>
                        <div>
                            <h4 style="margin: 0 0 4px 0;">Pemeriksaan Manusia</h4>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--fellow-muted);">Jika email wawancara kerja masuk folder spam, pengguna perlu memulihkan dan memberi koreksi.</p>
                        </div>
                    </div>
                </div>

                <h3 style="margin-top: 32px;">3.3 Pelatihan dan Inferensi</h3>
                <p>Proses AI biasanya terbagi menjadi dua fase. <strong>Pelatihan</strong> adalah saat sistem belajar dari banyak contoh dan membentuk model. <strong>Inferensi</strong> adalah saat model yang sudah jadi digunakan untuk memproses input baru dan menghasilkan output.</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-graduation-cap" style="color: var(--fellow-pink);"></i> Training</h4>
                        <p style="margin: 0 0 10px 0; color: var(--fellow-muted);">Fase belajar dari data historis. Biasanya lebih berat, memakan waktu, dan membutuhkan komputasi besar.</p>
                        <ul style="margin: 0; padding-left: 18px; color: var(--fellow-text); font-size: .9rem; line-height: 1.7;">
                            <li>Data contoh dikumpulkan dan diberi label.</li>
                            <li>Sistem mencari pola yang berulang.</li>
                            <li>Pola disimpan menjadi model prediktif.</li>
                        </ul>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-bolt" style="color: var(--fellow-pink);"></i> Inferensi</h4>
                        <p style="margin: 0 0 10px 0; color: var(--fellow-muted);">Fase penggunaan harian. Model yang sudah jadi menerima input baru dan menghasilkan output cepat.</p>
                        <ul style="margin: 0; padding-left: 18px; color: var(--fellow-text); font-size: .9rem; line-height: 1.7;">
                            <li>Email baru dilabeli spam atau bukan.</li>
                            <li>Kalimat baru diterjemahkan.</li>
                            <li>Rute baru direkomendasikan.</li>
                        </ul>
                    </article>
                </div>

                <div style="background: rgba(246,51,146,.08); border: 1px solid rgba(246,51,146,.18); border-radius: 16px; padding: 18px 20px; margin: 28px 0; display: flex; align-items: flex-start; gap: 12px;">
                    <i class="fas fa-cloud-sun-rain" style="color: var(--fellow-pink); font-size: 1.1rem; margin-top: 2px;"></i>
                    <div>
                        <h4 style="margin: 0 0 6px 0; color: var(--fellow-text); font-size: 1rem;">Analogi prediksi cuaca</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .95rem;">AI bekerja seperti orang yang menebak hujan dari pola awan, kelembapan, dan angin masa lalu. Prediksinya bisa sangat membantu, tetapi tetap probabilistik dan bisa keliru.</p>
                    </div>
                </div>

                <h3>3.4 Cara Pandang Sosio-Teknis</h3>
                <p>Kualitas AI tidak hanya ditentukan oleh kode. Sistem juga dipengaruhi oleh siapa yang membiayai, data siapa yang dominan, kelompok mana yang terwakili, dan siapa yang menanggung dampak saat sistem salah. Karena itu, setiap output AI perlu dilihat sebagai hasil interaksi antara teknologi dan masyarakat.</p>
                <p>Contohnya, sistem rekrutmen yang dilatih dari arsip karyawan sukses selama sepuluh tahun bisa tampak objektif, padahal arsip lama mungkin mencerminkan budaya kerja yang tidak adil. Jika masa lalu lebih sering memberi kesempatan kepada kelompok tertentu, model dapat belajar bahwa kelompok itulah pola kandidat ideal.</p>
                <p>Karena itu, pertanyaan pentingnya bukan hanya &quot;apakah modelnya pintar?&quot;, tetapi juga: data siapa yang dipakai, siapa yang tidak terlihat dalam data, siapa yang diuntungkan, siapa yang berisiko dirugikan, dan apakah ada jalur banding ketika sistem mengambil keputusan yang salah.</p>

                <div style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px; margin-top: 24px;">
                    <h4 style="margin: 0 0 12px 0; color: var(--fellow-text);"><i class="fas fa-clipboard-question" style="color: var(--fellow-pink);"></i> Checklist saat melihat sistem AI</h4>
                    <ol style="margin: 0; padding-left: 20px; color: var(--fellow-text); line-height: 1.8;">
                        <li>Apa tujuan bisnis atau tujuan sosial dari sistem ini?</li>
                        <li>Input apa yang terlihat dan input apa yang mungkin tersembunyi?</li>
                        <li>Pola apa yang mungkin dipelajari dari data masa lalu?</li>
                        <li>Output apa yang memengaruhi pengguna?</li>
                        <li>Siapa yang memeriksa dan bertanggung jawab jika output keliru?</li>
                    </ol>
                </div>

                <h3>3.5 Studi Kasus Lengkap: Navigasi Kota</h3>
                <p>Ambil contoh aplikasi peta. Dari sisi pengguna, tujuannya terlihat sederhana: sampai tujuan lebih cepat. Namun dari sisi sistem, keputusan yang dibuat jauh lebih kompleks. Sistem menerima input lokasi perangkat, kecepatan kendaraan, laporan kecelakaan, kondisi jalan historis, jam sibuk, rute favorit pengguna, dan pola pergerakan banyak perangkat lain. Dari input itu, sistem mencari pola kemacetan dan memperkirakan rute yang mungkin paling cepat.</p>
                <p>Output-nya berupa estimasi waktu tiba dan rekomendasi rute. Tetapi output ini tidak netral sepenuhnya. Jika tujuan sistem hanya mengoptimalkan waktu tempuh pengendara, maka jalan pemukiman kecil bisa tiba-tiba dipenuhi kendaraan besar. Pengendara diuntungkan, tetapi warga lokal menanggung kebisingan, risiko keselamatan, dan kemacetan baru. Ini menunjukkan bahwa tahap "tujuan" harus dibaca secara kritis, bukan dianggap teknis semata.</p>

                <h3>3.6 Training dan Inferensi dalam Bahasa Sehari-hari</h3>
                <p>Bayangkan seorang peserta belajar mengenali jenis tanaman. Pada masa belajar, ia melihat banyak contoh daun, batang, warna, bentuk, dan label nama tanaman. Setelah cukup banyak contoh, ia mulai membangun ingatan pola. Itulah analogi training. Ketika esok hari ia melihat tanaman baru dan menebak namanya, itulah analogi inferensi. Bedanya, sistem AI melakukan proses ini pada data digital berskala jauh lebih besar.</p>
                <p>Training biasanya tidak terlihat oleh pengguna. Pengguna hanya bertemu hasil akhirnya: autocomplete, rekomendasi, ringkasan, atau deteksi spam. Karena fase training tersembunyi, pengguna sering lupa bahwa kualitas output sangat bergantung pada data masa lalu. Jika data training tidak mewakili semua kelompok, model akan lebih akurat untuk kelompok yang banyak muncul di data dan lebih buruk untuk kelompok yang jarang muncul.</p>

                <h3>3.7 Human Check sebagai Sabuk Pengaman</h3>
                <p>Pemeriksaan manusia bukan aksesori. Ia adalah bagian penting dari sistem. Human check dapat berupa tombol "laporkan", proses banding, review manual, audit berkala, validasi sumber, atau kewajiban manusia untuk mengambil keputusan final. Semakin besar dampak keputusan AI terhadap hidup seseorang, semakin kuat pula kebutuhan human check.</p>
                <p>Untuk rekomendasi lagu, human check bisa sesederhana tombol skip. Untuk filter spam, human check adalah kemampuan memindahkan email penting dari folder spam. Untuk rekrutmen, human check harus lebih kuat: audit bias, penjelasan keputusan, review kandidat yang tertolak, dan jalur keberatan. Untuk hukum dan kesehatan, human check berarti AI tidak boleh menjadi sumber final tanpa profesional manusia yang bertanggung jawab.</p>

                <div style="background: rgba(246,51,146,.08); border: 1px solid rgba(246,51,146,.18); border-radius: 16px; padding: 20px; margin: 28px 0;">
                    <h4 style="margin: 0 0 10px 0; color: var(--fellow-text);"><i class="fas fa-user-shield" style="color: var(--fellow-pink);"></i> Aturan praktis human check</h4>
                    <ul style="margin: 0; padding-left: 18px; line-height: 1.8; color: var(--fellow-text);">
                        <li>Jika output hanya memengaruhi kenyamanan, koreksi ringan mungkin cukup.</li>
                        <li>Jika output memengaruhi kesempatan kerja, pinjaman, pendidikan, kesehatan, hukum, atau keselamatan, review manusia wajib kuat.</li>
                        <li>Jika sistem tidak bisa menjelaskan alasan, sediakan jalur banding dan audit manual.</li>
                        <li>Jika sistem sering salah pada kelompok tertentu, masalahnya bukan hanya teknis, tetapi juga keadilan data.</li>
                    </ul>
                </div>

                <h3>3.8 Cara Membaca Setiap Sistem dengan Satu Kerangka</h3>
                <p>Setelah topik ini, peserta seharusnya bisa mengambil aplikasi apa pun dan membedahnya. Untuk chatbot: tujuannya menjawab pertanyaan; input-nya prompt dan riwayat percakapan; pola yang dipakai adalah pola bahasa; model menghasilkan jawaban; output perlu diverifikasi. Untuk sistem pinjaman: tujuannya menilai risiko; input-nya riwayat finansial; pola yang dipakai adalah korelasi pembayaran masa lalu; output-nya persetujuan, penolakan, atau skor; manusia harus memastikan tidak ada diskriminasi tersembunyi.</p>
                <p>Kerangka yang sama berlaku untuk rekomendasi video, filter wajah, prediksi cuaca, transkripsi suara, dan screening CV. Semakin sering peserta berlatih membaca sistem seperti ini, semakin kecil kemungkinan mereka menjadi pengguna pasif yang langsung percaya pada layar.</p>

                <h3 style="margin-top: 32px;">3.9 Bedah Kasus: Chatbot Pendidikan</h3>
                <p>Bayangkan peserta menggunakan chatbot untuk memahami materi sekolah. Tujuannya tampak positif: membantu peserta mendapat penjelasan cepat. Input yang terlihat adalah pertanyaan peserta. Namun input yang mungkin memengaruhi output bisa lebih luas: riwayat percakapan, bahasa yang digunakan, instruksi sistem, dokumen rujukan, dan pola pertanyaan dari banyak pengguna lain. Model kemudian menghasilkan jawaban yang tampak seperti penjelasan guru.</p>
                <p>Risikonya muncul ketika peserta menganggap jawaban itu pasti benar. Chatbot bisa menjelaskan konsep dengan bahasa yang meyakinkan, tetapi salah dalam contoh, salah menyebut istilah, atau membuat rujukan palsu. Human check dalam konteks pendidikan berarti peserta tetap membandingkan jawaban dengan modul resmi, bertanya kepada mentor, dan tidak mengutip jawaban mentah tanpa memahami ulang.</p>

                <h3 style="margin-top: 32px;">3.10 Bedah Kasus: Sistem Kredit Mikro</h3>
                <p>Pada sistem kredit, tujuan model biasanya menilai apakah pemohon berisiko gagal bayar. Input dapat berupa riwayat pembayaran, pendapatan, lokasi usaha, jenis pekerjaan, pola transaksi, usia usaha, dan data lain yang dikumpulkan lembaga. Output-nya bisa berupa persetujuan, penolakan, batas pinjaman, atau suku bunga. Di atas kertas, sistem seperti ini terlihat efisien karena membantu memproses banyak pemohon.</p>
                <p>Namun dampaknya jauh lebih serius daripada rekomendasi lagu. Jika data historis lebih lengkap untuk kelompok yang sudah lama punya akses bank, sistem dapat lebih percaya pada kelompok itu. Pemohon dari komunitas informal, pekerja rumahan, atau wilayah yang kurang terdokumentasi bisa dianggap lebih berisiko bukan karena mereka tidak mampu, tetapi karena data mereka tidak terlihat. Karena itu, human check harus mencakup jalur banding, penjelasan alasan, dan review manual untuk kasus yang tidak cocok dengan pola mayoritas.</p>

                <h3 style="margin-top: 32px;">3.11 Bedah Kasus: Filter Wajah dan Kamera</h3>
                <p>Filter wajah tampak ringan, tetapi ia juga contoh sistem prediktif. Tujuannya mendeteksi fitur wajah agar efek visual dapat ditempelkan dengan tepat. Input-nya adalah gambar dari kamera, posisi mata, warna kulit, pencahayaan, bentuk wajah, dan pola visual yang pernah dipelajari model. Output-nya adalah deteksi wajah, efek visual, atau perbaikan otomatis.</p>
                <p>Masalah muncul jika data training tidak beragam. Sistem bisa bekerja lebih baik pada wajah dengan pencahayaan, warna kulit, atau bentuk tertentu, tetapi buruk pada kelompok lain. Dalam konteks hiburan, ini mungkin terasa seperti gangguan kecil. Dalam konteks keamanan, absensi, verifikasi identitas, atau layanan publik, kegagalan deteksi wajah dapat menjadi bentuk diskriminasi teknis yang nyata.</p>

                <h3 style="margin-top: 32px;">3.12 Pola Kesalahan yang Perlu Dikenali</h3>
                <div style="display: grid; gap: 14px; margin: 20px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-database" style="color: var(--fellow-pink);"></i> Data tidak lengkap</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Sistem hanya mengenal dunia yang muncul dalam data. Jika kelompok tertentu jarang muncul, sistem bisa buruk saat melayani mereka.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-bullseye" style="color: var(--fellow-pink);"></i> Tujuan terlalu sempit</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Sistem mengoptimalkan satu angka, seperti klik atau waktu tempuh, tetapi mengabaikan dampak sosial di luar angka itu.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-triangle-exclamation" style="color: var(--fellow-pink);"></i> Output terlalu dipercaya</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Pengguna menganggap skor, label, atau jawaban sebagai kebenaran final, padahal output AI adalah hasil prediksi yang perlu konteks.</p>
                    </article>
                </div>
            `
        },
        '/participant-ai-pipeline': {
            title: 'Training, Inferensi, dan Human Check',
            description: 'Memahami dua fase utama sistem AI dan kenapa pemeriksaan manusia harus menjadi bagian dari alur.',
            duration: '45 menit',
            tag: 'Alur Kerja',
            content: `
                <header class="lesson-topic-banner">
                    <h3><i class="fas fa-arrows-spin"></i> Topik 5: Training, Inferensi, dan Human Check
                    </h3>
                    <p>Goal: Memahami bahwa AI tidak hanya soal model, tetapi juga proses belajar, penggunaan, dan koreksi.
                    </p>
                </header>

                <h3>5.1 Dua Fase Utama AI</h3>
                <p>AI modern biasanya memiliki dua fase besar: <strong>training</strong> dan <strong>inferensi</strong>. Training adalah masa belajar. Inferensi adalah masa pemakaian. Perbedaan ini penting karena banyak orang hanya melihat output AI di layar, padahal kualitas output sangat ditentukan oleh proses belajar sebelumnya.</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-graduation-cap" style="color: var(--fellow-pink);"></i> Training</h4>
                        <p style="margin: 0 0 10px 0; color: var(--fellow-muted);">Sistem diberi banyak contoh untuk mencari pola. Fase ini dapat membutuhkan data besar, waktu lama, dan komputasi kuat.</p>
                        <ul style="margin: 0; padding-left: 18px; line-height: 1.8; color: var(--fellow-text);">
                            <li>Data dikumpulkan.</li>
                            <li>Contoh diberi label atau struktur.</li>
                            <li>Sistem mencari pola.</li>
                            <li>Pola disimpan menjadi model.</li>
                        </ul>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-bolt" style="color: var(--fellow-pink);"></i> Inferensi</h4>
                        <p style="margin: 0 0 10px 0; color: var(--fellow-muted);">Model yang sudah jadi menerima input baru dan memberi output. Fase ini biasanya terasa cepat bagi pengguna.</p>
                        <ul style="margin: 0; padding-left: 18px; line-height: 1.8; color: var(--fellow-text);">
                            <li>Email baru dilabeli spam atau bukan.</li>
                            <li>Kalimat baru diterjemahkan.</li>
                            <li>Rute baru direkomendasikan.</li>
                            <li>Chatbot menyusun jawaban baru.</li>
                        </ul>
                    </article>
                </div>

                <h3>5.2 Contoh Lengkap: Email Spam</h3>
                <p>Pada fase training, sistem membaca banyak email lama. Sebagian sudah ditandai spam, sebagian bukan. Sistem mencari pola: kata tertentu, format tautan, reputasi pengirim, waktu pengiriman, gaya bahasa, dan laporan pengguna.</p>
                <p>Pada fase inferensi, email baru masuk. Sistem membandingkan email itu dengan pola yang sudah dipelajari, lalu memberi label. Jika labelnya salah, manusia harus bisa memperbaiki. Koreksi itu penting karena tanpa feedback, sistem bisa terus mengulang kesalahan.</p>

                <h3>5.3 Human Check Bukan Formalitas</h3>
                <p>Pemeriksaan manusia adalah tahap keselamatan. AI bekerja dengan probabilitas, bukan kepastian moral. Dalam kasus sepele seperti rekomendasi lagu, kesalahan mungkin hanya mengganggu. Dalam rekrutmen, kredit, kesehatan, hukum, atau keamanan, kesalahan bisa merugikan hidup seseorang.</p>
                <div style="background: rgba(246,51,146,.08); border: 1px solid rgba(246,51,146,.18); border-radius: 16px; padding: 20px; margin: 24px 0;">
                    <h4 style="margin: 0 0 10px 0; color: var(--fellow-text);"><i class="fas fa-user-check" style="color: var(--fellow-pink);"></i> Bentuk human check</h4>
                    <ul style="margin: 0; padding-left: 18px; line-height: 1.8; color: var(--fellow-text);">
                        <li>Memeriksa sumber dan fakta sebelum memakai jawaban chatbot.</li>
                        <li>Memberi tombol koreksi ketika rekomendasi tidak relevan.</li>
                        <li>Menyediakan proses banding untuk keputusan kredit atau rekrutmen.</li>
                        <li>Melakukan audit berkala terhadap dampak pada kelompok rentan.</li>
                    </ul>
                </div>

                <h3>5.4 Cara Pandang Sosio-Teknis</h3>
                <p>Training dan inferensi tidak terjadi di ruang netral. Data dikumpulkan oleh manusia, label dibuat oleh manusia, tujuan sistem ditentukan organisasi, dan dampaknya dirasakan masyarakat. Karena itu, AI harus dipahami sebagai sistem sosio-teknis: gabungan teknologi, data, institusi, budaya, dan keputusan manusia.</p>
            `
        },
        '/participant-ai-ml-dl': {
            title: 'Peta Istilah dan Penerapan AI',
            description: 'Memahami hubungan AI, Machine Learning, Deep Learning, ANI, penerapan harian, manfaat, dan batas awalnya.',
            duration: '65 menit',
            tag: 'Literasi AI',
            content: `
                <header class="lesson-topic-banner">
                    <h3><i class="fas fa-layer-group"></i> Topik 4: Peta Istilah dan Penerapan AI
                    </h3>
                    <p>Goal: Memahami istilah dasar AI sekaligus membaca penerapannya di kehidupan, pendidikan, dan ruang kerja.
                    </p>
                </header>

                <h3>4.1 Hubungan AI, Machine Learning, dan Deep Learning</h3>
                <p>AI adalah payung besar. Di dalamnya ada Machine Learning, yaitu pendekatan yang membuat komputer belajar dari data. Di dalam Machine Learning ada Deep Learning, pendekatan berlapis yang kuat untuk gambar, suara, teks, dan data tak terstruktur berskala besar.</p>
                <p>Pemisahan istilah ini penting karena media sering memakai semua istilah secara bergantian. Tidak semua AI adalah Deep Learning, dan tidak semua sistem otomatis adalah Machine Learning. Dengan memahami payungnya, peserta tidak mudah tertukar ketika nanti masuk ke modul Python, Matematika, Machine Learning, NLP, dan Computer Vision.</p>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0;">
                    <div style="padding: 20px; border-radius: 16px; background: white; border: 1px solid var(--fellow-line);">
                        <i class="fas fa-umbrella" style="color: var(--fellow-pink); font-size: 1.6rem; margin-bottom: 10px;"></i>
                        <h4 style="margin: 0 0 8px 0;">Artificial Intelligence</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Semesta luas sistem yang menjalankan tugas yang biasanya butuh kecerdasan manusia.</p>
                    </div>
                    <div style="padding: 20px; border-radius: 16px; background: white; border: 1px solid var(--fellow-line);">
                        <i class="fas fa-chart-line" style="color: var(--fellow-pink); font-size: 1.6rem; margin-bottom: 10px;"></i>
                        <h4 style="margin: 0 0 8px 0;">Machine Learning</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Bagian dari AI yang menemukan pola dari data tanpa aturan langkah demi langkah yang ditulis manual.</p>
                    </div>
                    <div style="padding: 20px; border-radius: 16px; background: white; border: 1px solid var(--fellow-line);">
                        <i class="fas fa-network-wired" style="color: var(--fellow-pink); font-size: 1.6rem; margin-bottom: 10px;"></i>
                        <h4 style="margin: 0 0 8px 0;">Deep Learning</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Bagian dari ML yang memakai jaringan berlapis untuk mengenali pola kompleks.</p>
                    </div>
                </div>

                <h3 style="margin-top: 32px;">4.2 Fokus Praktis: ANI, Bukan Fiksi AGI</h3>
                <p>Teknologi yang kita gunakan hari ini adalah <strong>Artificial Narrow Intelligence</strong>: sistem spesialis yang sangat mahir pada tugas sempit. Sistem pendeteksi kanker tidak otomatis bisa bermain catur, dan sistem rekomendasi musik tidak otomatis memahami hukum. AGI dan ASI cukup dikenali sebagai konsep spekulatif, bukan fokus utama modul dasar.</p>
                <p>Artificial General Intelligence atau AGI biasanya dibayangkan sebagai mesin yang fleksibel seperti manusia di semua bidang. Artificial Superintelligence atau ASI lebih spekulatif lagi, yaitu skenario ketika kemampuan mesin melampaui manusia secara luas. Modul dasar ini tidak menolak diskusi tersebut, tetapi menaruhnya di pinggir agar fokus belajar tetap pada sistem nyata yang sudah memengaruhi hidup peserta hari ini.</p>

                <div style="background: rgba(246,51,146,.08); border: 1px solid rgba(246,51,146,.2); border-radius: 16px; padding: 18px 20px; margin: 24px 0;">
                    <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-bullseye" style="color: var(--fellow-pink);"></i> Prinsip praktis</h4>
                    <p style="margin: 0; color: var(--fellow-muted);">Jangan menghabiskan energi belajar pada robot fiksi yang sadar diri. Fokuslah pada sistem sempit yang sudah memengaruhi email, pinjaman, rekrutmen, navigasi, pembelajaran, dan rekomendasi konten.</p>
                </div>

                <h3 style="margin-top: 32px;">4.3 AI dalam Kehidupan Sehari-hari</h3>
                <p>AI sering hadir sebagai mesin pembantu keputusan. Ia menyaring banyak kemungkinan menjadi rekomendasi kecil yang terlihat sederhana di layar.</p>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0;">
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-music"></i> Media dan hiburan</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Input: riwayat tontonan, lagu yang dilewati, durasi menonton. Output: rekomendasi video atau playlist personal.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-map-location-dot"></i> Mobilitas kota</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Input: lokasi perangkat, laporan kecelakaan, pola macet historis. Output: ETA dan rute alternatif.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-language"></i> Komunikasi bahasa</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Input: teks, suara, dan contoh terjemahan. Output: kalimat terjemahan yang diprediksi paling alami.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-briefcase"></i> Produktivitas kerja</h4>
                        <p style="margin: 0; color: var(--fellow-muted); font-size: .9rem;">Input: FAQ, arsip tiket, CV, atau riwayat pelanggan. Output: balasan chatbot, ringkasan, atau shortlist kandidat.</p>
                    </article>
                </div>

                <p>Setelah memahami pola ini, rekomendasi belanja atau rute peta tidak lagi terlihat seperti tebakan gaib. Sistem sedang menghitung kemiripan perilaku, probabilitas, dan pola dari banyak pengguna lain.</p>

                <h3 style="margin-top: 32px;">4.4 Membaca Penerapan dengan Alur Tujuan ke Output</h3>
                <div style="display: grid; gap: 16px; margin: 20px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-play"></i> Layanan streaming</h4>
                        <p style="margin: 0; color: var(--fellow-text);">Tujuannya sering kali membuat pengguna bertahan lebih lama. Input-nya riwayat tontonan, durasi menonton, jeda, klik, dan konten yang dilewati. Output-nya daftar rekomendasi yang terasa personal.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-route"></i> Navigasi lalu lintas</h4>
                        <p style="margin: 0; color: var(--fellow-text);">Tujuannya mencari rute efisien. Input-nya lokasi perangkat, kecepatan kendaraan, laporan kecelakaan, dan pola historis. Output-nya ETA dan rute alternatif yang terus berubah.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-file-lines"></i> Screening resume</h4>
                        <p style="margin: 0; color: var(--fellow-text);">Tujuannya mempercepat seleksi. Input-nya CV, riwayat kandidat sukses, kata kunci, institusi, dan pengalaman. Output-nya skor atau shortlist. Risiko muncul jika data lama sudah bias terhadap kelompok tertentu.</p>
                    </article>
                </div>

                <h3 style="margin-top: 32px;">4.5 Manfaat Praktis AI jika Dipakai dengan Tepat</h3>
                <p>AI bermanfaat bukan karena ia ajaib, tetapi karena ia dapat membantu manusia menghadapi terlalu banyak informasi. Dalam kelas, AI dapat membantu membuat ringkasan awal, mengubah penjelasan rumit menjadi bahasa sederhana, menyusun contoh soal, atau membantu peserta memeriksa struktur tulisan. Di tempat kerja, AI dapat membantu memilah tiket layanan pelanggan, membuat draft email, menyusun ringkasan rapat, membaca pola transaksi, atau membantu pencarian dokumen.</p>
                <p>Namun manfaat ini paling sehat ketika AI diposisikan sebagai asisten. Pengguna tetap menentukan tujuan, memeriksa fakta, memahami konteks, dan mengambil keputusan akhir. AI mempercepat proses, tetapi tidak menggantikan tanggung jawab manusia.</p>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-filter" style="color: var(--fellow-pink);"></i> Menyaring informasi</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Membantu memilih informasi relevan dari banyak email, dokumen, komentar, tiket, atau konten.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-clock" style="color: var(--fellow-pink);"></i> Menghemat waktu</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Membuat draft, ringkasan, klasifikasi awal, atau daftar opsi agar manusia bisa fokus pada keputusan.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-eye" style="color: var(--fellow-pink);"></i> Mengenali pola tersembunyi</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Membantu menemukan pola transaksi, pola kemacetan, pola keluhan, atau pola belajar yang tidak mudah terlihat manual.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-universal-access" style="color: var(--fellow-pink);"></i> Membuka akses</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Transkripsi, caption, penerjemah, dan asisten belajar dapat membantu lebih banyak orang mengakses informasi.</p>
                    </article>
                </div>

                <h3 style="margin-top: 32px;">4.6 Batas Awal yang Harus Diingat</h3>
                <p>AI tetap bergantung pada data. Jika data keliru, output bisa keliru. Jika konteks berubah, pola lama bisa tidak relevan. Jika tujuan sistem sempit, output bisa mengoptimalkan satu hal sambil merusak hal lain. Contoh paling mudah adalah sistem rekomendasi yang mengoptimalkan durasi menonton, tetapi membuat pengguna terjebak dalam konten yang makin ekstrem atau repetitif.</p>
                <p>AI juga dapat gagal memahami konteks sosial. Sistem dapat melihat bahwa rute A lebih cepat, tetapi tidak memahami bahwa rute itu melewati sekolah kecil pada jam pulang anak. Sistem dapat melihat bahwa kandidat tertentu tidak mirip dengan pola karyawan masa lalu, tetapi tidak memahami bahwa pola masa lalu lahir dari ketidakadilan. Karena itu, memahami penerapan AI harus selalu disandingkan dengan memahami dampaknya.</p>

                <h3 style="margin-top: 32px;">4.7 Jembatan ke Modul Lanjutan</h3>
                <p>Chapter ini menjadi jembatan untuk modul berikutnya. Ketika nanti belajar Python untuk AI, peserta akan mulai melihat bagaimana data direpresentasikan dan diproses. Ketika belajar Matematika untuk AI, peserta akan memahami probabilitas, vektor, optimisasi, dan statistik yang menopang model. Ketika masuk Machine Learning, peserta akan melihat bagaimana pola dipelajari secara lebih formal. Ketika masuk NLP dan Computer Vision, peserta akan melihat bagaimana teks dan gambar diproses sebagai data.</p>
                <p>Jadi, tujuan topik ini bukan membuat peserta menghafal istilah, tetapi membangun peta. Dengan peta ini, peserta tidak tersesat saat bertemu istilah baru. Mereka tahu bahwa AI adalah payung besar, ML adalah pendekatan belajar dari data, DL adalah cabang berlapis untuk pola kompleks, dan ANI adalah bentuk AI praktis yang hari ini benar-benar dipakai.</p>

                <h3 style="margin-top: 32px;">4.8 Penerapan di Pendidikan</h3>
                <p>Dalam pendidikan, AI dapat membantu peserta membuat ringkasan, menyusun pertanyaan latihan, memberi umpan balik awal pada tulisan, menerjemahkan materi, atau menjelaskan konsep dengan bahasa yang lebih sederhana. Manfaatnya besar untuk peserta yang butuh pendamping belajar fleksibel. Namun pendidikan juga menuntut pemahaman, bukan sekadar jawaban cepat.</p>
                <p>Risikonya adalah peserta menjadi terlalu bergantung pada output AI. Jika setiap tugas langsung diminta ke chatbot, peserta mungkin mendapat jawaban tetapi kehilangan proses berpikir. Karena itu, penggunaan AI dalam belajar sebaiknya diarahkan untuk bertanya, membandingkan, merevisi, dan memahami alasan, bukan sekadar menyalin output. Mentor perlu menilai proses berpikir peserta, bukan hanya hasil akhir yang rapi.</p>

                <h3 style="margin-top: 32px;">4.9 Penerapan di Kesehatan</h3>
                <p>Di kesehatan, AI bisa membantu membaca citra medis, mendeteksi pola risiko, memprioritaskan pasien, atau merangkum catatan klinis. Sistem seperti ini dapat membantu tenaga kesehatan bekerja lebih cepat dan menemukan sinyal awal yang mungkin terlewat. Tetapi konteks kesehatan memiliki risiko tinggi karena kesalahan dapat memengaruhi nyawa, akses layanan, dan keputusan medis.</p>
                <p>Karena itu, output AI di kesehatan tidak boleh berdiri sendiri. Model yang mendeteksi kemungkinan penyakit dari gambar harus tetap diperiksa dokter. Sistem triase harus mempertimbangkan konteks pasien, bukan hanya angka risiko. Data kesehatan juga sangat sensitif sehingga privasi, consent, keamanan penyimpanan, dan batas penggunaan data harus dijaga lebih ketat daripada aplikasi hiburan.</p>

                <h3 style="margin-top: 32px;">4.10 Penerapan di Keamanan Siber</h3>
                <p>AI banyak dipakai untuk mendeteksi spam, phishing, malware, anomali login, atau pola transaksi mencurigakan. Di sini AI berguna karena serangan digital berubah cepat dan volumenya terlalu besar untuk dicek manual satu per satu. Sistem dapat membaca pola baru dari banyak sinyal: alamat pengirim, tautan, waktu akses, lokasi login, perangkat yang dipakai, dan perilaku pengguna.</p>
                <p>Namun sistem keamanan juga bisa salah. Akun pengguna sah bisa diblokir, pesan penting bisa ditahan, atau aktivitas normal bisa dianggap ancaman. Karena itu, sistem keamanan perlu jalur pemulihan, notifikasi yang jelas, review manusia untuk kasus serius, dan desain yang tidak menghukum pengguna tanpa penjelasan.</p>

                <h3 style="margin-top: 32px;">4.11 Penerapan di Bisnis dan Operasional</h3>
                <p>Dalam bisnis, AI sering dipakai untuk memprediksi permintaan, mengurutkan prospek pelanggan, memberi rekomendasi harga, membaca sentimen pelanggan, atau membantu layanan pelanggan. Manfaat utamanya adalah efisiensi dan kemampuan melihat pola dari data operasional. Tetapi tujuan bisnis sering kali tidak sama dengan kepentingan pengguna.</p>
                <p>Contohnya, sistem rekomendasi harga dapat mengoptimalkan pendapatan perusahaan, tetapi membuat kelompok tertentu mendapat harga lebih mahal. Sistem prioritas pelanggan dapat mempercepat layanan untuk pelanggan bernilai tinggi, tetapi memperlambat kelompok lain. Karena itu, penerapan AI di bisnis harus diaudit bukan hanya dari sisi performa, tetapi juga dari sisi keadilan perlakuan.</p>

                <h3 style="margin-top: 32px;">4.12 Matriks Membaca Penerapan</h3>
                <div style="display: grid; gap: 14px; margin: 20px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-school" style="color: var(--fellow-pink);"></i> Pendidikan</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Manfaat: pendamping belajar. Risiko: ketergantungan, jawaban salah, plagiarisme, dan hilangnya proses berpikir.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-heart-pulse" style="color: var(--fellow-pink);"></i> Kesehatan</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Manfaat: deteksi awal dan ringkasan klinis. Risiko: salah diagnosis, privasi data, dan keputusan tanpa konteks pasien.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-shield-halved" style="color: var(--fellow-pink);"></i> Keamanan siber</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Manfaat: deteksi anomali. Risiko: false positive, pemblokiran keliru, dan kurangnya jalur pemulihan.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-briefcase" style="color: var(--fellow-pink);"></i> Bisnis</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Manfaat: efisiensi operasi. Risiko: optimasi profit yang mengabaikan perlakuan adil terhadap pengguna.</p>
                    </article>
                </div>
            `
        },
        '/participant-ai-applications': {
            title: 'Penerapan AI dalam Kehidupan',
            description: 'Membedah penerapan AI sehari-hari menggunakan alur tujuan, input, pola, dan output.',
            duration: '45 menit',
            tag: 'Penerapan',
            content: `
                <header class="lesson-topic-banner">
                    <h3><i class="fas fa-globe"></i> Topik 7: Penerapan AI dalam Kehidupan
                    </h3>
                    <p>Goal: Membaca AI di kehidupan sehari-hari sebagai sistem yang punya tujuan, input, dan dampak.
                    </p>
                </header>

                <h3>7.1 Kenapa Penerapan Harian Penting</h3>
                <p>Literasi AI tidak dimulai dari laboratorium. Ia dimulai dari kebiasaan membaca aplikasi yang dipakai setiap hari. Rekomendasi video, peta digital, filter email, chatbot layanan pelanggan, penerjemah teks, dan sistem harga transportasi daring semuanya bisa dibaca dengan model yang sama.</p>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0;">
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-music"></i> Media dan hiburan</h4>
                        <p style="margin: 0; color: var(--fellow-text);">Tujuan: membuat pengguna menemukan konten yang terasa relevan dan sering kali bertahan lebih lama. Input: riwayat tontonan, durasi menonton, klik, like, skip, dan pola pengguna mirip. Output: rekomendasi video, lagu, atau playlist.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-map-location-dot"></i> Mobilitas kota</h4>
                        <p style="margin: 0; color: var(--fellow-text);">Tujuan: memperkirakan rute efisien dan waktu tiba. Input: lokasi perangkat, kecepatan kendaraan, laporan kecelakaan, dan pola kemacetan historis. Output: ETA dan rute alternatif.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-language"></i> Komunikasi bahasa</h4>
                        <p style="margin: 0; color: var(--fellow-text);">Tujuan: membantu pengguna memahami bahasa lain. Input: teks, suara, konteks kalimat, dan contoh terjemahan. Output: susunan kalimat yang diprediksi paling alami.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-briefcase"></i> Ruang kerja</h4>
                        <p style="margin: 0; color: var(--fellow-text);">Tujuan: mempercepat pekerjaan repetitif. Input: FAQ, arsip tiket, dokumen, CV, atau riwayat pelanggan. Output: balasan chatbot, ringkasan, draft email, atau shortlist kandidat.</p>
                    </article>
                </div>

                <h3>7.2 Membaca Rekomendasi Bukan Sebagai Kebetulan</h3>
                <p>Ketika aplikasi belanja menampilkan produk yang terasa cocok, itu bukan tebakan gaib. Sistem membandingkan pola belanja, kata kunci, durasi melihat barang, harga yang sering diklik, dan perilaku pengguna lain yang mirip. Dari situ, sistem mengurutkan pilihan yang dianggap paling mungkin menarik perhatian.</p>

                <h3>7.3 Pertanyaan Analitis untuk Setiap Aplikasi</h3>
                <ol style="line-height: 1.8; color: var(--fellow-text);">
                    <li>Apa tujuan utama aplikasi dari sisi pengguna dan dari sisi perusahaan?</li>
                    <li>Data apa yang terlihat dikumpulkan?</li>
                    <li>Data apa yang mungkin dikumpulkan diam-diam, seperti lokasi, waktu, atau durasi interaksi?</li>
                    <li>Output apa yang memengaruhi keputusan pengguna?</li>
                    <li>Apa risiko jika output tersebut salah atau terlalu manipulatif?</li>
                </ol>
            `
        },
        '/participant-ai-pros-cons': {
            title: 'Manfaat dan Keterbatasan AI',
            description: 'Memahami manfaat praktis AI sekaligus batas bawaan yang tidak boleh diabaikan.',
            duration: '40 menit',
            tag: 'Evaluasi',
            content: `
                <header class="lesson-topic-banner">
                    <h3><i class="fas fa-scale-balanced"></i> Topik 8: Manfaat dan Keterbatasan AI
                    </h3>
                    <p>Goal: Mengapresiasi manfaat AI tanpa kehilangan sikap kritis terhadap batas dan risikonya.
                    </p>
                </header>

                <h3>8.1 Manfaat Praktis AI</h3>
                <p>AI bermanfaat ketika dipakai untuk mempercepat analisis, menyaring informasi, menemukan pola, dan membantu manusia melihat pilihan yang terlalu banyak untuk diproses manual. Dalam konteks belajar dan kerja, AI dapat menjadi alat bantu yang kuat selama pengguna tetap memahami batasnya.</p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-filter"></i> Menyaring informasi</h4>
                        <p style="margin: 0; color: var(--fellow-text);">AI dapat membantu memilih informasi paling relevan dari ribuan dokumen, email, tiket layanan, atau konten.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-clock"></i> Menghemat waktu</h4>
                        <p style="margin: 0; color: var(--fellow-text);">AI dapat membuat draft, ringkasan, klasifikasi awal, atau rekomendasi sehingga manusia bisa fokus pada keputusan akhir.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-eye"></i> Mengenali pola tersembunyi</h4>
                        <p style="margin: 0; color: var(--fellow-text);">AI dapat membaca pola yang sulit terlihat oleh manusia, misalnya pola transaksi mencurigakan atau pola lalu lintas.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-universal-access"></i> Membantu akses</h4>
                        <p style="margin: 0; color: var(--fellow-text);">Penerjemah, transkripsi, caption, dan asisten belajar dapat membantu lebih banyak orang mengakses informasi.</p>
                    </article>
                </div>

                <h3>8.2 Keterbatasan Bawaan AI</h3>
                <p>AI bukan sumber kebenaran absolut. AI bekerja dari data dan pola. Jika data tidak lengkap, konteks berubah, atau tujuan sistem terlalu sempit, output bisa tidak akurat atau tidak adil.</p>
                <ul style="line-height: 1.8; color: var(--fellow-text);">
                    <li><strong>Bergantung pada data:</strong> data buruk menghasilkan pola buruk.</li>
                    <li><strong>Tidak memahami konteks penuh:</strong> sistem bisa melewatkan norma sosial, empati, atau dampak manusia.</li>
                    <li><strong>Bisa terdengar meyakinkan saat salah:</strong> terutama pada model bahasa.</li>
                    <li><strong>Tujuan sistem bisa sempit:</strong> mengoptimalkan klik, waktu tempuh, atau efisiensi tanpa melihat dampak sosial.</li>
                    <li><strong>Sulit dijelaskan:</strong> model kompleks dapat menghasilkan keputusan yang tidak mudah dilacak alasannya.</li>
                </ul>

                <h3>8.3 Cara Memakai AI secara Realistis</h3>
                <p>Gunakan AI sebagai asisten, bukan pengganti penilaian manusia. Untuk tugas ringan, AI bisa mempercepat. Untuk keputusan penting, AI harus menjadi bahan pertimbangan yang diverifikasi, bukan penentu tunggal.</p>
            `
        },
        '/participant-ai-ethics': {
            title: 'Bias, Halusinasi, Privasi, dan Black Box',
            description: 'Membedah risiko fundamental AI sebagai sistem sosial dan teknis.',
            duration: '50 menit',
            tag: 'Etika AI',
            content: `
                <header class="lesson-topic-banner">
                    <h3><i class="fas fa-shield-halved"></i> Topik 9: Bias, Halusinasi, Privasi, dan Black Box
                    </h3>
                    <p>Goal: Mengenali risiko AI yang paling sering muncul dalam kehidupan nyata.
                    </p>
                </header>

                <h3>9.1 Bias: Ketika Masa Lalu Diulang Mesin</h3>
                <p>Miskonsepsi besar tentang AI adalah anggapan bahwa keputusan komputer pasti objektif. Padahal AI belajar dari data historis yang dibuat oleh manusia dan institusi. Jika sejarah memuat diskriminasi, ketimpangan, atau pengecualian kelompok tertentu, model dapat mengulangnya dengan tampilan yang seolah netral.</p>
                <p>Contoh: alat rekrutmen dilatih dari data pelamar sukses sepuluh tahun terakhir. Jika data lama didominasi laki-laki dari kampus tertentu, model bisa menganggap pola itu sebagai tanda kandidat ideal dan menurunkan skor kandidat perempuan atau kandidat dari jalur pendidikan lain.</p>

                <h3>9.2 Halusinasi: Jawaban Rapi yang Salah</h3>
                <p>Model bahasa modern dapat menghasilkan teks yang runtut, sopan, dan terdengar meyakinkan. Tetapi ia tetap bisa mengarang fakta, kutipan, nama jurnal, pasal hukum, atau nomor kasus. Ini disebut halusinasi algoritmik.</p>
                <div style="background: rgba(246,51,146,.08); border: 1px solid rgba(246,51,146,.18); border-radius: 16px; padding: 20px; margin: 24px 0;">
                    <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-gavel" style="color: var(--fellow-pink);"></i> Contoh risiko hukum</h4>
                    <p style="margin: 0; color: var(--fellow-text);">Jika chatbot menyusun argumen hukum dan mencantumkan kasus preseden palsu, dokumen bisa terlihat profesional tetapi tetap berbahaya. Dalam konteks hukum, medis, akademik, dan keuangan, setiap klaim harus diverifikasi ke sumber resmi.</p>
                </div>

                <h3>9.3 Privasi: Data sebagai Bahan Bakar</h3>
                <p>Banyak sistem AI membutuhkan data personal: lokasi, riwayat klik, pembelian, suara, wajah, pesan, atau pola interaksi. Pengumpulan data tanpa persetujuan yang jelas dapat mengancam keamanan dan martabat pengguna.</p>
                <p>Pertanyaan pentingnya bukan hanya apakah data bisa dikumpulkan, tetapi apakah data boleh dikumpulkan, apakah pengguna memahami tujuannya, berapa lama data disimpan, dan siapa yang dapat mengaksesnya.</p>

                <h3>9.4 Black Box: Ketika Alasan Tidak Jelas</h3>
                <p>Beberapa model kompleks sulit dijelaskan bahkan oleh pembuatnya. Masalah muncul ketika keputusan berdampak besar: kredit ditolak, akun diblokir, CV disaring, atau layanan publik tidak diberikan. Jika alasan tidak jelas, pengguna kehilangan hak untuk mempertanyakan dan memperbaiki keputusan.</p>

                <h3>9.5 Prinsip Aman untuk Pemula</h3>
                <ol style="line-height: 1.8; color: var(--fellow-text);">
                    <li>Jangan langsung percaya output AI hanya karena bahasanya rapi.</li>
                    <li>Selalu cek sumber untuk fakta penting.</li>
                    <li>Curigai sistem yang tidak memberi alasan atau jalur koreksi.</li>
                    <li>Perhatikan siapa yang mungkin tidak terwakili dalam data.</li>
                    <li>Jaga data pribadi sebelum memasukkan informasi sensitif ke alat AI.</li>
                </ol>
            `
        },
        '/participant-ai-summary': {
            title: 'Risiko, Etika, dan Audit Sosio-Teknis',
            description: 'Membedah bias, halusinasi, privasi, black box, dan cara melakukan audit sistem AI harian secara rinci.',
            duration: '75 menit',
            tag: 'Audit AI',
            content: `
                <header class="lesson-topic-banner">
                    <h3><i class="fas fa-magnifying-glass-chart"></i> Topik 5: Risiko, Etika, dan Audit Sosio-Teknis
                    </h3>
                    <p>Goal: Mengubah peserta dari pengguna pasif menjadi auditor kritis yang mampu membaca dampak sistem AI.
                    </p>
                </header>

                <p>Literasi AI tidak selesai ketika kita bisa menjelaskan cara kerja model. Peserta juga perlu bertanya: apakah sistem ini aman, adil, transparan, menjaga privasi, dan masih memungkinkan manusia melakukan koreksi?</p>
                <p>Bagian ini adalah inti dari literasi sosio-teknis. AI tidak boleh dinilai hanya dari seberapa cepat atau canggih output-nya. Sistem yang cepat tetapi bias, tidak transparan, melanggar privasi, atau tidak bisa dikoreksi tetap berbahaya.</p>

                <div style="display: grid; gap: 16px; margin: 24px 0;">
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-scale-balanced"></i> Ilusi objektivitas dan bias</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">AI belajar dari data historis. Jika data masa lalu memuat diskriminasi gender, kelas, ras, wilayah, atau akses pendidikan, model dapat mengulang pola tidak adil itu dalam bentuk yang terlihat netral.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-triangle-exclamation"></i> Halusinasi algoritmik</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Model bahasa bisa menghasilkan jawaban yang terdengar rapi tetapi faktanya salah. Untuk konteks hukum, medis, akademik, atau keputusan penting, verifikasi independen wajib dilakukan.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-user-lock"></i> Privasi dan data personal</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Banyak sistem prediktif membutuhkan lokasi, perilaku klik, pembelian, wajah, suara, atau interaksi. Pengumpulan tanpa persetujuan yang jelas dapat mengancam martabat dan keamanan pengguna.</p>
                    </article>
                    <article style="padding: 20px; border-radius: 16px; background: #fff; border: 1px solid var(--fellow-line);">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-pink);"><i class="fas fa-box"></i> Black box dan hak bertanya</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Jika sistem menolak pinjaman, memblokir akun, atau menyaring CV tanpa alasan yang bisa dipahami, pengguna kehilangan kesempatan untuk mengoreksi dan mengajukan keberatan.</p>
                    </article>
                </div>

                <h3>5.1 Studi Kasus Risiko</h3>
                <div style="display: grid; gap: 16px; margin: 20px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-user-tie" style="color: var(--fellow-pink);"></i> Rekrutmen dan bias masa lalu</h4>
                        <p style="margin: 0; color: var(--fellow-text);">Jika alat rekrutmen dilatih dari data perusahaan yang dulu lebih sering menerima laki-laki dari kampus tertentu, model bisa membaca pola itu sebagai tanda kandidat ideal. Akibatnya, CV perempuan atau kandidat dari jalur pendidikan berbeda bisa dinilai lebih rendah walaupun kompetensinya kuat.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-gavel" style="color: var(--fellow-pink);"></i> Halusinasi hukum</h4>
                        <p style="margin: 0; color: var(--fellow-text);">Model bahasa bisa menyusun argumen hukum yang rapi sekaligus menciptakan nomor kasus palsu. Kesalahannya bukan karena model berniat menipu, melainkan karena ia memprediksi rangkaian kata yang tampak cocok. Untuk urusan hukum, setiap rujukan harus dicek ke sumber resmi.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 20px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-map" style="color: var(--fellow-pink);"></i> Optimasi navigasi</h4>
                        <p style="margin: 0; color: var(--fellow-text);">Jika tujuan sistem hanya mengurangi waktu tempuh pengendara, rute bisa dialihkan ke jalan pemukiman kecil. Pengendara terbantu, tetapi warga lokal menanggung kebisingan, kemacetan, dan risiko keselamatan. Ini menunjukkan bahwa tujuan sistem perlu dirancang dengan mempertimbangkan dampak komunitas.</p>
                    </article>
                </div>

                <h3>Ringkasan yang Perlu Dibawa</h3>
                <ul class="summary-check-list" style="list-style: none; padding-left: 0;">
                    <li style="margin-bottom: 12px; display: flex; gap: 12px;"><i class="fas fa-circle-check" style="color: var(--fellow-pink); margin-top: 4px;"></i> <span>AI adalah sistem berbasis mesin yang menyimpulkan dari input untuk menghasilkan prediksi, rekomendasi, konten, atau keputusan.</span></li>
                    <li style="margin-bottom: 12px; display: flex; gap: 12px;"><i class="fas fa-circle-check" style="color: var(--fellow-pink); margin-top: 4px;"></i> <span>Software biasa mengikuti aturan eksplisit; AI modern memanfaatkan data dan korelasi pola.</span></li>
                    <li style="margin-bottom: 12px; display: flex; gap: 12px;"><i class="fas fa-circle-check" style="color: var(--fellow-pink); margin-top: 4px;"></i> <span>AI, ML, dan DL tersusun seperti payung: AI mencakup ML, ML mencakup DL.</span></li>
                    <li style="margin-bottom: 12px; display: flex; gap: 12px;"><i class="fas fa-circle-check" style="color: var(--fellow-pink); margin-top: 4px;"></i> <span>AI saat ini adalah ANI: spesialis sempit, bukan kecerdasan umum yang sadar diri.</span></li>
                    <li style="margin-bottom: 12px; display: flex; gap: 12px;"><i class="fas fa-circle-check" style="color: var(--fellow-pink); margin-top: 4px;"></i> <span>Human check adalah kebiasaan wajib untuk melawan bias, halusinasi, keputusan buram, dan risiko privasi.</span></li>
                </ul>

                <div class="daily-ai-box" style="margin-top: 32px; background: white; border: 2px dashed var(--fellow-pink); border-radius: 16px; padding: 24px;">
                    <h3 style="margin-top: 0; color: var(--fellow-pink);"><i class="fas fa-magnifying-glass-chart"></i> Mini Project: Audit Sistem Sosio-Teknis Harian</h3>
                    <p style="font-size: 0.95rem; color: var(--fellow-muted); margin-bottom: 0;">Di tab Latihan, pilih satu layanan otomatis yang kamu gunakan dalam 24 jam terakhir. Bedah tujuan, input, pola, output, pemeriksaan manusia, risiko privasi, dan potensi ketidakadilan.</p>
                </div>

                <h3 style="margin-top: 32px;">5.2 Pertanyaan Penutup untuk Setiap Output AI</h3>
                <ol style="line-height: 1.8; color: var(--fellow-text);">
                    <li>Apakah output ini fakta, prediksi, rekomendasi, atau opini sintetis?</li>
                    <li>Apakah ada sumber independen yang bisa dipakai untuk memverifikasi?</li>
                    <li>Apakah data yang dipakai mungkin tidak mewakili kelompok tertentu?</li>
                    <li>Apakah pengguna punya hak untuk menolak, mengoreksi, atau meminta penjelasan?</li>
                    <li>Apakah keputusan akhir seharusnya tetap dipegang manusia?</li>
                </ol>

                <h3 style="margin-top: 32px;">5.3 Membaca Bias sebagai Warisan Sistemik</h3>
                <p>Bias AI jarang muncul karena mesin memiliki kebencian. Bias lebih sering muncul karena data historis mencerminkan dunia yang tidak setara. Jika selama bertahun-tahun akses pendidikan, promosi kerja, kredit, atau layanan publik lebih mudah didapat kelompok tertentu, maka data masa lalu akan memuat pola ketimpangan itu. Model yang dilatih dari data tersebut dapat membaca ketimpangan sebagai pola normal.</p>
                <p>Inilah yang membuat bias AI berbahaya: ia dapat terlihat objektif karena dibungkus angka, skor, atau label. Padahal angka tersebut bisa menjadi cara baru untuk memperpanjang keputusan lama yang tidak adil. Karena itu, audit bias harus bertanya siapa yang terwakili, siapa yang tidak terlihat, dan kelompok mana yang paling mungkin dirugikan ketika output salah.</p>

                <h3 style="margin-top: 32px;">5.4 Halusinasi dan Ilusi Kepastian Bahasa</h3>
                <p>Halusinasi berbahaya karena bentuknya sering rapi. Model bahasa bisa membuat paragraf yang terdengar tenang, lengkap, dan profesional, walaupun isinya salah. Bagi pemula, risiko terbesar bukan hanya kesalahan fakta, tetapi rasa percaya diri palsu yang muncul karena bahasa mesin terdengar meyakinkan.</p>
                <p>Dalam tugas belajar, halusinasi bisa membuat peserta mengutip artikel yang tidak ada. Dalam pekerjaan hukum, halusinasi bisa menciptakan kasus preseden palsu. Dalam kesehatan, halusinasi bisa memberi saran yang terdengar ilmiah tetapi tidak aman. Karena itu, semakin tinggi risiko konteksnya, semakin wajib verifikasi manusia dilakukan sebelum output dipakai.</p>

                <h3 style="margin-top: 32px;">5.5 Privasi, Consent, dan Data yang Tidak Terlihat</h3>
                <p>Banyak data yang dipakai sistem AI tidak terasa seperti data bagi pengguna. Waktu berhenti pada satu video, lokasi saat membuka aplikasi, urutan klik, produk yang hanya dilihat tetapi tidak dibeli, pola mengetik, suara, wajah, dan relasi sosial semuanya dapat menjadi sinyal. Data kecil yang dikumpulkan terus-menerus dapat membentuk gambaran perilaku yang sangat detail.</p>
                <p>Audit privasi perlu bertanya apakah pengguna tahu data apa yang dikumpulkan, apakah pengguna diberi pilihan bermakna, apakah data disimpan terlalu lama, apakah data dibagikan ke pihak lain, dan apakah data tersebut bisa dipakai untuk tujuan yang berbeda dari tujuan awal. Prinsipnya sederhana: data pribadi bukan sekadar bahan bakar teknologi, tetapi bagian dari martabat dan keamanan manusia.</p>

                <h3 style="margin-top: 32px;">5.6 Black Box dan Hak untuk Meminta Penjelasan</h3>
                <p>Black box menjadi masalah ketika sistem berdampak pada hak, kesempatan, atau akses seseorang. Jika rekomendasi film tidak bisa dijelaskan, dampaknya kecil. Tetapi jika penolakan kredit, pemblokiran akun, penyaringan CV, atau keputusan layanan publik tidak bisa dijelaskan, pengguna kehilangan kesempatan untuk memahami dan memperbaiki keadaan.</p>
                <p>Karena itu, sistem berisiko tinggi harus memiliki jejak keputusan, alasan yang bisa dipahami, jalur banding, dan manusia yang bertanggung jawab. Transparansi bukan berarti semua rumus harus dibuka ke publik, tetapi pengguna terdampak harus punya hak untuk mengetahui alasan umum, data penting yang digunakan, dan langkah koreksi yang tersedia.</p>

                <h3 style="margin-top: 32px;">5.7 Rubrik Audit Sederhana</h3>
                <div style="display: grid; gap: 14px; margin: 20px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-bullseye" style="color: var(--fellow-pink);"></i> Tujuan</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Apa yang dioptimalkan sistem: akurasi, klik, waktu tinggal, efisiensi biaya, keselamatan, keadilan, atau kombinasi beberapa tujuan?</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-database" style="color: var(--fellow-pink);"></i> Data</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Data apa yang dipakai, siapa yang paling banyak muncul dalam data, siapa yang kurang terwakili, dan apakah data dikumpulkan dengan persetujuan yang jelas?</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-arrow-up-right-from-square" style="color: var(--fellow-pink);"></i> Output</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Apakah output berupa saran, skor, label, ranking, konten, atau keputusan otomatis? Seberapa besar dampaknya pada pengguna?</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-user-check" style="color: var(--fellow-pink);"></i> Kontrol manusia</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Apakah pengguna bisa mengoreksi, menolak, meminta alasan, mengajukan banding, atau meminta review manusia?</p>
                    </article>
                </div>

                <h3 style="margin-top: 32px;">5.8 Skenario Latihan Analitis</h3>
                <p><strong>Rekrutmen:</strong> jika sistem menolak CV yang memuat organisasi perempuan atau kampus khusus wanita, masalahnya bukan sekadar bug teknis. Ini tanda bahwa sistem mungkin belajar dari sejarah rekrutmen yang bias. Solusinya bukan hanya menghapus satu kata sensitif, tetapi melakukan audit data, mengukur dampak pada kelompok berbeda, mengubah tujuan evaluasi, dan memastikan review manusia.</p>
                <p><strong>Chatbot hukum:</strong> jika model membuat kasus palsu dengan bahasa rapi, masalahnya adalah halusinasi. Sistem tidak memahami kebenaran hukum seperti pengacara. Ia memprediksi rangkaian kata yang mungkin cocok. Solusinya adalah verifikasi sumber resmi, pembatasan penggunaan untuk konteks berisiko tinggi, dan kewajiban profesional manusia memeriksa setiap rujukan.</p>
                <p><strong>Navigasi:</strong> jika sistem mengalihkan kendaraan besar ke jalan kecil pemukiman, masalahnya ada pada tujuan optimasi yang terlalu sempit. Sistem mengejar efisiensi waktu pengendara, tetapi tidak menghitung beban sosial warga lokal. Solusinya adalah memasukkan batas keselamatan, jenis jalan, jam sekolah, kapasitas lingkungan, dan mekanisme laporan warga ke dalam desain sistem.</p>

                <h3 style="margin-top: 32px;">5.9 Kesimpulan Modul</h3>
                <p>Pengantar AI ini tidak meminta peserta menjadi programmer dalam satu pertemuan. Targetnya lebih mendasar: peserta mampu membaca sistem AI dengan tenang, kritis, dan konkret. Mereka tahu bahwa AI bekerja dari input, pola, model, dan output. Mereka tahu bahwa AI modern yang dipakai hari ini adalah sistem sempit, bukan makhluk sadar diri. Mereka juga tahu bahwa output AI perlu diperiksa karena bisa salah, bias, manipulatif, atau tidak transparan.</p>
                <p>Dengan fondasi ini, peserta siap masuk ke Pemrograman Python untuk AI, Matematika untuk AI, Machine Learning, NLP, dan Computer Vision tanpa kehilangan kompas etis. Semakin teknis materi berikutnya, semakin penting kebiasaan bertanya yang sudah dibangun di sini: apa tujuan sistemnya, data apa yang dipakai, siapa yang terdampak, dan bagaimana manusia tetap bertanggung jawab.</p>

                <h3 style="margin-top: 32px;">5.10 Rubrik Skor Risiko Cepat</h3>
                <p>Untuk membantu peserta menilai sistem AI secara praktis, gunakan skala sederhana dari rendah, sedang, sampai tinggi. Sistem berisiko rendah biasanya hanya memengaruhi kenyamanan, seperti rekomendasi lagu. Sistem berisiko sedang memengaruhi informasi, perhatian, atau pilihan ekonomi kecil, seperti rekomendasi belanja dan ranking konten. Sistem berisiko tinggi memengaruhi hak, keselamatan, reputasi, pendidikan, kesehatan, pekerjaan, pinjaman, atau layanan publik.</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 20px 0;">
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-circle" style="color: var(--fellow-pink);"></i> Rendah</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Kesalahan mengganggu, tetapi mudah dikoreksi dan tidak merugikan kesempatan hidup. Contoh: playlist kurang cocok.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-circle-half-stroke" style="color: var(--fellow-pink);"></i> Sedang</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Kesalahan dapat memengaruhi informasi, perhatian, uang, atau akses sementara. Contoh: rekomendasi produk manipulatif.</p>
                    </article>
                    <article style="background: #fff; border: 1px solid var(--fellow-line); border-radius: 16px; padding: 18px;">
                        <h4 style="margin: 0 0 8px 0; color: var(--fellow-text);"><i class="fas fa-triangle-exclamation" style="color: var(--fellow-pink);"></i> Tinggi</h4>
                        <p style="margin: 0; color: var(--fellow-muted);">Kesalahan memengaruhi kerja, kesehatan, hukum, pendidikan, pinjaman, identitas, atau keselamatan. Wajib ada review manusia.</p>
                    </article>
                </div>

                <h3 style="margin-top: 32px;">5.11 Template Jawaban Audit</h3>
                <p>Ketika mengerjakan latihan audit, peserta dapat memakai struktur berikut agar jawabannya lengkap dan tidak hanya berupa opini umum. Pertama, jelaskan sistem yang dipilih dan konteks pemakaiannya. Kedua, tuliskan tujuan sistem dari sudut pengguna dan dari sudut perusahaan. Ketiga, daftar input yang terlihat dan input yang mungkin tersembunyi. Keempat, jelaskan output yang muncul di layar. Kelima, analisis risiko bias, halusinasi, privasi, black box, dan human check.</p>
                <p>Bagian terakhir harus memuat rekomendasi perbaikan. Rekomendasi tidak perlu teknis mendalam. Peserta bisa mengusulkan tombol koreksi, penjelasan alasan, batas penggunaan data, opsi mematikan personalisasi, review manusia untuk keputusan penting, atau audit berkala terhadap dampak pada kelompok rentan.</p>

                <h3 style="margin-top: 32px;">5.12 Contoh Jawaban Singkat Audit</h3>
                <p><strong>Sistem:</strong> rekomendasi video pendek. <strong>Tujuan pengguna:</strong> menemukan hiburan atau informasi cepat. <strong>Tujuan platform:</strong> mempertahankan perhatian pengguna selama mungkin. <strong>Input:</strong> video yang ditonton sampai selesai, video yang dilewati, komentar, like, waktu menonton, lokasi umum, dan pola pengguna mirip. <strong>Output:</strong> urutan video yang terasa personal.</p>
                <p><strong>Risiko:</strong> sistem bisa mempersempit sudut pandang pengguna, mendorong konten sensasional, dan mengumpulkan data perilaku yang sangat detail. <strong>Human check:</strong> pengguna perlu tombol tidak tertarik, kontrol topik, riwayat rekomendasi yang bisa dihapus, dan transparansi mengapa video tertentu muncul. <strong>Perbaikan:</strong> platform sebaiknya memberi opsi membatasi personalisasi, memperjelas penggunaan data, dan tidak hanya mengoptimalkan durasi menonton.</p>

                <h3 style="margin-top: 32px;">5.13 Kebiasaan yang Dibawa ke Modul Berikutnya</h3>
                <p>Saat nanti mulai belajar Python, peserta akan menulis kode. Saat belajar machine learning, peserta akan melihat dataset, fitur, label, training, dan evaluasi. Saat belajar NLP atau Computer Vision, peserta akan memproses teks dan gambar. Tetapi kebiasaan paling penting sudah dimulai di modul ini: jangan hanya bertanya bagaimana membuat sistem bekerja, tetapi juga bagaimana memastikan sistem tidak merugikan manusia.</p>
                <p>Setiap kali bertemu teknik baru, ulangi pertanyaan dasar: data apa yang masuk, pola apa yang dicari, output apa yang dihasilkan, metrik apa yang dikejar, siapa yang diuntungkan, siapa yang berisiko, dan siapa yang bertanggung jawab. Pertanyaan ini membuat pembelajaran teknis tetap terhubung dengan tujuan sosial program Fellowship.</p>
            `
        }
    };

    function currentPath() {
        return window.location.hash.replace(/^#/, '') || '/participant-dashboard';
    }

    function renderLessonList(activePath) {
        return introLessonRoutes.map((lesson, index) => {
            const isActive = lesson.path === activePath;
            const activeClass = isActive ? ' class="active"' : '';
            const currentState = isActive ? ' aria-current="page"' : '';
            return `<li${activeClass}><span>${index + 1}</span><a href="#${lesson.path}"${currentState}>${lesson.title}</a><i class="${isActive ? 'far fa-circle-play' : 'far fa-circle'}" aria-hidden="true"></i></li>`;
        }).join('');
    }

    function renderIntroLessonProgress(progressRows, activePath) {
        if (currentPath() !== activePath) return;
        const completedChapters = new Set((Array.isArray(progressRows) ? progressRows : [])
            .filter(row => row.module_id === 'ai-fundamentals'
                && row.status === 'completed'
                && /^\d+$/.test(String(row.chapter_id || ''))
                && Number(row.chapter_id) >= 1
                && Number(row.chapter_id) <= introLessonRoutes.length)
            .map(row => String(row.chapter_id)));
        const progress = Math.round((completedChapters.size / introLessonRoutes.length) * 100);
        const progressBar = document.querySelector('[data-lesson-progress-bar]');
        const progressText = document.querySelector('[data-lesson-progress-text]');
        const progressCaption = document.querySelector('[data-lesson-progress-caption]');
        const lessonList = document.querySelector('[data-lesson-list], .lesson-list-card ol');

        if (progressBar) {
            progressBar.style.setProperty('--value', `${progress}%`);
            progressBar.setAttribute('aria-label', `${progress}% progres Pengantar AI`);
        }
        if (progressText) progressText.textContent = `${progress}%`;
        if (progressCaption) progressCaption.textContent = `${completedChapters.size} dari ${introLessonRoutes.length} topik selesai`;

        lessonList?.querySelectorAll('li').forEach((item, index) => {
            const chapterId = String(index + 1);
            const lesson = introLessonRoutes[index];
            const isCompleted = completedChapters.has(chapterId);
            const isCurrent = lesson?.path === activePath;
            const link = item.querySelector('a');
            const icon = item.querySelector('i');
            item.classList.toggle('completed', isCompleted);
            item.classList.toggle('active', isCurrent);
            if (link) {
                if (isCurrent) link.setAttribute('aria-current', 'page');
                else link.removeAttribute('aria-current');
                const stateLabel = isCurrent ? 'sedang dibuka' : (isCompleted ? 'selesai' : 'belum selesai');
                link.setAttribute('aria-label', `${lesson?.title || link.textContent}: ${stateLabel}`);
            }
            if (icon) {
                icon.className = isCurrent ? 'far fa-circle-play' : (isCompleted ? 'fas fa-circle-check' : 'far fa-circle');
                icon.setAttribute('aria-hidden', 'true');
            }
        });
    }

    async function initIntroLessonProgress() {
        const path = currentPath();
        const lessonIndex = introLessonRoutes.findIndex(item => item.path === path);
        if (lessonIndex < 0) return;

        const chapterId = String(lessonIndex + 1);
        const saved = await window.saveChapterProgress('ai-fundamentals', chapterId, 'completed');
        const progressResult = await window.getParticipantProgress('ai-fundamentals');
        if (currentPath() !== path) return;

        if (progressResult.status === 'success') {
            renderIntroLessonProgress(progressResult.data, path);
        } else if (saved.status === 'success') {
            renderIntroLessonProgress([{
                module_id: 'ai-fundamentals',
                chapter_id: chapterId,
                status: 'completed'
            }], path);
        } else {
            renderIntroLessonProgress([], path);
        }
    }

    function initGeneratedLessonPage() {
        const page = document.querySelector('.ai-generated-lesson-page');
        if (!page || page.dataset.generatedReady) return;
        page.dataset.generatedReady = 'true';
        const path = currentPath();
        const lesson = generatedLessonContent[path] || generatedLessonContent['/participant-ai-history'];
        const index = Math.max(1, introLessonRoutes.findIndex(item => item.path === path));
        const prev = introLessonRoutes[index - 1] || introLessonRoutes[0];
        const next = introLessonRoutes[index + 1];

        page.querySelector('[data-lesson-breadcrumb]').textContent = lesson.title;
        page.querySelector('[data-lesson-title]').textContent = lesson.title;
        page.querySelector('[data-lesson-description]').textContent = lesson.description;
        page.querySelector('[data-lesson-duration]').textContent = lesson.duration;
        page.querySelector('[data-lesson-position]').textContent = `Modul 1 dari 6`;
        page.querySelector('[data-lesson-tag]').textContent = lesson.tag;
        page.querySelector('[data-lesson-content]').innerHTML = lesson.content;
        page.querySelector('[data-lesson-list]').innerHTML = renderLessonList(path);
        page.querySelector('[data-lesson-progress-bar]').style.setProperty('--value', '0%');
        page.querySelector('[data-lesson-progress-text]').textContent = '0%';
        page.querySelector('[data-lesson-progress-caption]').textContent = 'Memuat progres tersimpan…';
        const prevLink = page.querySelector('[data-lesson-prev]');
        const nextLink = page.querySelector('[data-lesson-next]');
        prevLink.href = `#${prev.path}`;
        prevLink.innerHTML = `<i class="fas fa-chevron-left"></i> Topik Sebelumnya`;
        if (next) {
            nextLink.href = `#${next.path}`;
            nextLink.innerHTML = `Topik Selanjutnya <i class="fas fa-arrow-right"></i>`;
        } else {
            nextLink.href = '#/participant-ai-intro-practice';
            nextLink.innerHTML = 'Lanjut ke Latihan <i class="fas fa-arrow-right"></i>';
        }
    }

    function initPracticeNotes() {
        const form = document.getElementById('aiIntroPracticeForm');
        if (!form || form.dataset.practiceReady) return;
        form.dataset.practiceReady = 'true';
        const key = 'heraiAiIntroPracticeAnswers';
        const status = document.getElementById('aiIntroPracticeStatus');
        const draftButton = form.querySelector('[data-practice-draft]');
        const saveButton = form.querySelector('[data-practice-save]');
        const editButton = form.querySelector('[data-practice-edit]');
        const deleteButton = form.querySelector('[data-practice-delete]');
        const fields = Array.from(form.querySelectorAll('textarea'));
        const setStatus = (message) => {
            if (status) status.textContent = message;
        };
        let serverSubmission = null;
        const setReadonly = (readonly) => {
            fields.forEach(field => field.readOnly = readonly);
            if (saveButton) saveButton.textContent = readonly ? 'Sudah Dikirim' : 'Kirim Latihan';
            if (draftButton) draftButton.disabled = readonly || serverSubmission?.status === 'submitted' || serverSubmission?.status === 'reviewed';
        };
        const collectAnswers = () => {
            const payload = {};
            fields.forEach(field => payload[field.name] = field.value.trim());
            return payload;
        };
        let saved = {};
        try {
            saved = JSON.parse(localStorage.getItem(key) || '{}') || {};
        } catch (_error) {
            localStorage.removeItem(key);
        }
        fields.forEach(field => field.value = String(saved[field.name] || ''));
        const hasSavedAnswer = fields.some(field => field.value.trim());
        if (hasSavedAnswer) {
            setReadonly(false);
            setStatus('Jawaban lama dipulihkan dari perangkat. Simpan draft atau kirim agar masuk ke server.');
        } else {
            localStorage.removeItem(key);
            setReadonly(false);
        }
        draftButton?.addEventListener('click', async () => {
            const payload = collectAnswers();
            if (!Object.values(payload).some(Boolean)) {
                setReadonly(false);
                setStatus('Isi minimal satu jawaban sebelum menyimpan.');
                fields[0]?.focus();
                return;
            }
            localStorage.setItem(key, JSON.stringify(payload));
            draftButton.disabled = true;
            setStatus('Menyimpan draft ke server...');
            const result = await window.saveParticipantExerciseDraft('ai-fundamentals', 'practice', payload);
            draftButton.disabled = false;
            if (!result || result.status !== 'success') {
                setStatus('Draft aman di perangkat, tetapi belum masuk server: ' + (result?.message || 'coba lagi.'));
                return;
            }
            serverSubmission = result.submission;
            window.renderParticipantExerciseReview('#aiIntroPracticeStatus', serverSubmission);
            setStatus('Draft latihan tersimpan di server.');
        });
        saveButton?.addEventListener('click', async () => {
            const payload = collectAnswers();
            const answerKeys = Object.keys(payload);
            const filledCount = answerKeys.filter(k => String(payload[k] || '').trim()).length;
            if (filledCount < answerKeys.length) {
                setReadonly(false);
                const firstEmpty = fields.find(f => !String(f.value || '').trim());
                setStatus('Isi seluruh ' + answerKeys.length + ' jawaban sebelum mengirim. ' + (answerKeys.length - filledCount) + ' jawaban masih kosong.');
                if (firstEmpty) firstEmpty.focus();
                return;
            }
            localStorage.setItem(key, JSON.stringify(payload));
            saveButton.disabled = true;
            setStatus('Mengirim jawaban latihan ke server...');
            const result = await window.submitParticipantExercise('ai-fundamentals', 'practice', payload);
            saveButton.disabled = false;
            if (!result || result.status !== 'success') {
                setStatus('Jawaban aman di perangkat, tetapi belum masuk server: ' + (result?.message || 'coba lagi.'));
                return;
            }
            serverSubmission = result.submission;
            setReadonly(true);
            window.renderParticipantExerciseReview('#aiIntroPracticeStatus', serverSubmission);
            setStatus('Latihan berhasil dikirim dan menunggu review mentor.');
            recordParticipantActivity({
                activity_type: 'practice_submitted',
                module_id: 'ai-fundamentals',
                lesson_id: 'pengantar-ai',
                activity: 'Latihan Pengantar AI dikirim',
                payload: payload
            });
        });
        editButton?.addEventListener('click', () => {
            if (serverSubmission?.status === 'reviewed') {
                setStatus('Latihan sudah direview. Hubungi mentor jika perlu revisi.');
                return;
            }
            setReadonly(false);
            fields[0]?.focus();
            setStatus('Mode edit aktif. Kirim ulang agar perubahan masuk ke server.');
        });
        deleteButton?.addEventListener('click', () => {
            localStorage.removeItem(key);
            fields.forEach(field => {
                field.value = '';
                field.readOnly = false;
            });
            setStatus('Jawaban lokal dihapus. Submission server, jika ada, tetap tersimpan.');
        });
        window.restoreParticipantExercise({
            form: form,
            moduleId: 'ai-fundamentals',
            exerciseId: 'practice',
            statusSelector: '#aiIntroPracticeStatus',
            onRestored: function(submission) {
                serverSubmission = submission;
                localStorage.setItem(key, JSON.stringify(submission.answers || {}));
                setReadonly(submission.status === 'submitted' || submission.status === 'reviewed');
                setStatus(submission.status === 'reviewed'
                    ? 'Latihan sudah direview mentor.'
                    : (submission.status === 'submitted' ? 'Latihan sudah dikirim dan menunggu review mentor.' : 'Draft latihan dipulihkan dari server.'));
            }
        });
    }

    async function initLessonDiscussion() {
        const form = document.getElementById('aiIntroDiscussionForm');
        const list = document.getElementById('aiIntroDiscussionList');
        if (!form || !list || form.dataset.discussionReady) return;
        form.dataset.discussionReady = 'true';
        const key = 'heraiAiIntroDiscussionThread';
        const moduleId = 'ai-fundamentals';
        const status = document.getElementById('aiIntroDiscussionStatus');
        const submitButton = form.querySelector('[type="submit"]');
        const participantName = getParticipantDisplayName();
        const escapeHtml = (value = '') => String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
        const normalizePost = (item = {}) => ({
            id: String(item.id || `local-${Date.now()}`),
            prompt: String(item.prompt || 'Analisis Kasus Pengantar AI'),
            text: String(item.text || ''),
            replies: Array.isArray(item.replies) ? item.replies.map(reply => ({
                text: String(reply?.text || ''),
                createdAt: String(reply?.createdAt || '')
            })).filter(reply => reply.text) : [],
            createdAt: String(item.createdAt || ''),
            legacyTime: String(item.time || ''),
            syncState: item.syncState || (String(item.id || '').startsWith('dsc_') ? 'server' : 'local')
        });
        const load = () => {
            try {
                const saved = JSON.parse(localStorage.getItem(key) || '[]');
                return Array.isArray(saved) ? saved.map(normalizePost).filter(item => item.text) : [];
            } catch {
                return [];
            }
        };
        const save = (items) => localStorage.setItem(key, JSON.stringify(items));
        const formatTimestamp = (value, fallback = '') => {
            const parsed = new Date(value);
            if (!value || Number.isNaN(parsed.getTime())) return fallback || 'Belum tersinkron';
            return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(parsed);
        };
        const setDiscussionStatus = (message, tone = 'info') => {
            if (!status) return;
            status.textContent = message;
            status.dataset.tone = tone;
        };
        const render = (items = load()) => {
            if (!items.length) {
                list.innerHTML = `
                    <div class="discussion-empty-state">
                        <i class="far fa-comments" aria-hidden="true"></i>
                        <div><strong>Belum ada diskusi</strong><p>Tulis analisis pertamamu. Posting yang berhasil akan tersimpan ke server.</p></div>
                    </div>`;
                return;
            }
            list.innerHTML = items.map(item => `
                <article class="discussion-bubble" data-discussion-id="${escapeHtml(item.id)}">
                    <div><span>${escapeHtml(participantName.charAt(0) || 'P')}</span><strong>${escapeHtml(participantName)}</strong><small>${escapeHtml(formatTimestamp(item.createdAt, item.legacyTime))}${item.syncState === 'local' ? ' · Belum tersinkron' : ''}</small></div>
                    <p><b>${escapeHtml(item.prompt)}</b></p>
                    <p>${escapeHtml(item.text)}</p>
                    <button type="button" class="discussion-reply-btn" data-reply="${escapeHtml(item.id)}" aria-expanded="false"><i class="far fa-message" aria-hidden="true"></i> Balas</button>
                    <div class="discussion-reply-composer" data-reply-composer="${escapeHtml(item.id)}" hidden>
                        <textarea rows="3" placeholder="Tambahkan argumen atau pertanyaan..." aria-label="Tulis balasan"></textarea>
                        <div class="discussion-reply-actions">
                            <button type="button" class="btn-reply-send" data-reply-send="${escapeHtml(item.id)}"><i class="fas fa-paper-plane" aria-hidden="true"></i> Kirim Balasan</button>
                            <button type="button" class="btn-reply-cancel" data-reply-cancel="${escapeHtml(item.id)}"><i class="fas fa-xmark" aria-hidden="true"></i> Batal</button>
                        </div>
                        <p class="discussion-reply-validation" hidden><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> <em data-reply-message>Tulis balasan terlebih dahulu.</em></p>
                    </div>
                    <div class="discussion-replies">${item.replies.map(reply => `<article><strong>${escapeHtml(participantName)}</strong><small>${escapeHtml(formatTimestamp(reply.createdAt))}</small><p>${escapeHtml(reply.text)}</p></article>`).join('')}</div>
                </article>
            `).join('');
            list.querySelectorAll('[data-reply]').forEach(button => {
                button.addEventListener('click', () => {
                    const composer = list.querySelector(`[data-reply-composer="${CSS.escape(button.dataset.reply)}"]`);
                    if (!composer) return;
                    const willOpen = composer.hidden;
                    list.querySelectorAll('[data-reply-composer]').forEach(node => { node.hidden = true; });
                    list.querySelectorAll('[data-reply]').forEach(node => node.setAttribute('aria-expanded', 'false'));
                    composer.hidden = !willOpen;
                    button.setAttribute('aria-expanded', String(willOpen));
                    if (willOpen) composer.querySelector('textarea')?.focus();
                });
            });
            list.querySelectorAll('[data-reply-send]').forEach(button => {
                button.addEventListener('click', async () => {
                    const postId = button.dataset.replySend;
                    const composer = button.closest('.discussion-reply-composer');
                    const textarea = composer?.querySelector('textarea');
                    const validation = composer?.querySelector('.discussion-reply-validation');
                    const replyText = textarea?.value.trim() || '';
                    if (!replyText) {
                        if (validation) validation.hidden = false;
                        textarea?.focus();
                        return;
                    }
                    if (validation) validation.hidden = true;
                    const updated = load();
                    const target = updated.find(item => item.id === postId);
                    if (!target) return;
                    const candidate = {
                        ...target,
                        replies: [...target.replies, { text: replyText, createdAt: new Date().toISOString() }]
                    };
                    const originalLabel = button.innerHTML;
                    button.disabled = true;
                    button.setAttribute('aria-busy', 'true');
                    button.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Menyimpan...';
                    setDiscussionStatus('Menyimpan balasan ke server...', 'info');
                    const result = await window.saveParticipantDiscussion(moduleId, candidate);
                    button.disabled = false;
                    button.removeAttribute('aria-busy');
                    button.innerHTML = originalLabel;
                    if (!result || result.status !== 'success') {
                        if (validation) {
                            validation.hidden = false;
                            validation.querySelector('[data-reply-message]').textContent = result?.message || 'Balasan belum tersimpan. Coba kembali.';
                        }
                        setDiscussionStatus('Balasan belum tersimpan. Periksa koneksi lalu coba lagi.', 'warning');
                        return;
                    }
                    const targetIndex = updated.findIndex(item => item.id === postId);
                    updated[targetIndex] = { ...normalizePost(result.discussion), syncState: 'server' };
                    save(updated);
                    render(updated);
                    setDiscussionStatus('Balasan tersimpan ke server.', 'success');
                });
            });
            list.querySelectorAll('[data-reply-cancel]').forEach(button => {
                button.addEventListener('click', () => {
                    const composer = button.closest('.discussion-reply-composer');
                    if (composer) {
                        const textarea = composer.querySelector('textarea');
                        if (textarea) textarea.value = '';
                        composer.hidden = true;
                    }
                    list.querySelector(`[data-reply="${CSS.escape(button.dataset.replyCancel)}"]`)?.setAttribute('aria-expanded', 'false');
                });
            });
        };
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const textarea = form.querySelector('textarea');
            const text = textarea?.value.trim();
            if (!text) {
                setDiscussionStatus('Tulis isi diskusi terlebih dahulu.', 'warning');
                textarea?.focus();
                return;
            }
            const post = {
                id: `post-${Date.now()}`,
                prompt: 'Analisis Kasus Pengantar AI',
                text,
                replies: [],
                createdAt: new Date().toISOString()
            };
            const originalLabel = submitButton?.innerHTML || '';
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.setAttribute('aria-busy', 'true');
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Menyimpan...';
            }
            form.setAttribute('aria-busy', 'true');
            setDiscussionStatus('Menyimpan diskusi ke server...', 'info');
            const result = await window.saveParticipantDiscussion(moduleId, post);
            form.removeAttribute('aria-busy');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.removeAttribute('aria-busy');
                submitButton.innerHTML = originalLabel;
            }
            if (!result || result.status !== 'success') {
                setDiscussionStatus(result?.message || 'Diskusi belum tersimpan. Isi tetap tersedia untuk dicoba lagi.', 'warning');
                return;
            }
            const updated = load();
            updated.unshift({ ...normalizePost(result.discussion), syncState: 'server' });
            save(updated);
            textarea.value = '';
            setDiscussionStatus('Diskusi berhasil diposting dan tersimpan ke server.', 'success');
            render(updated);
        });
        const localPosts = load();
        render(localPosts);
        setDiscussionStatus('Memuat diskusi tersimpan dari server...', 'info');
        const remote = await window.getParticipantDiscussions(moduleId);
        if (!remote || remote.status !== 'success') {
            setDiscussionStatus(remote?.message || 'Diskusi server belum dapat dimuat. Data lokal tetap tersedia.', 'warning');
            return;
        }
        const remotePosts = remote.data.map(item => ({ ...normalizePost(item), syncState: 'server' }));
        // Read local storage again after the network wait so a post submitted while
        // the initial read-back was in flight can never be overwritten by stale data.
        const latestLocalPosts = load();
        const merged = remotePosts.concat(latestLocalPosts.filter(local => !remotePosts.some(saved => saved.id === local.id)));
        save(merged);
        render(merged);
        setDiscussionStatus(merged.length
            ? 'Diskusi tersinkron dengan server.'
            : 'Belum ada diskusi tersimpan. Mulai posting pertamamu.', 'success');
    }

    function initLessonControls() {
        const quizDoneKey = 'heraiAiIntroQuizDone';
        const quizScoreKey = 'heraiAiIntroQuizScore';
        const quizAnswersKey = 'heraiAiIntroQuizAnswers';
        const isQuizDone = localStorage.getItem(quizDoneKey) === 'true';
        const quizGroups = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];

        document.querySelectorAll('[data-locked-after-quiz]').forEach((item) => {
            item.hidden = !isQuizDone;
        });
        document.querySelectorAll('.lesson-lock-hint').forEach((item) => {
            item.hidden = isQuizDone;
        });

        const nextLink = document.getElementById('aiIntroQuizNext');
        if (nextLink && isQuizDone) nextLink.classList.remove('is-disabled');
        if (nextLink && !nextLink.dataset.guardReady) {
            nextLink.dataset.guardReady = 'true';
            nextLink.addEventListener('click', (event) => {
                if (nextLink.classList.contains('is-disabled')) {
                    event.preventDefault();
                }
            });
        }

        const quizForm = document.getElementById('aiIntroQuizForm');
        if (!quizForm || quizForm.dataset.quizReady) return;
        quizForm.dataset.quizReady = 'true';

        const resultBox = document.getElementById('aiIntroQuizResult');
        const submitButton = quizForm.querySelector('.quiz-submit-btn');
        const syncSelectedLabels = () => {
            quizForm.querySelectorAll('label').forEach((label) => {
                const input = label.querySelector('input[type="radio"]');
                if (input) label.classList.toggle('is-selected', input.checked);
            });
        };
        quizForm.querySelectorAll('input[type="radio"]').forEach((input) => {
            input.addEventListener('change', syncSelectedLabels);
        });
        const showResult = (score, total) => {
            if (!resultBox) return;
            resultBox.hidden = false;
            resultBox.innerHTML = `
                <strong>Nilai kamu: ${score}/${total}</strong>
                <span>Skor tersimpan. Kuis single attempt sudah terkunci; kartu hijau adalah jawaban benar, kartu merah adalah pilihanmu yang salah.</span>
            `;
        };
        const getSavedAnswers = () => {
            try {
                const saved = JSON.parse(localStorage.getItem(quizAnswersKey) || '{}');
                return saved && typeof saved === 'object' ? saved : {};
            } catch (error) {
                return {};
            }
        };
        const getCurrentAnswers = () => quizGroups.reduce((answers, group) => {
            const inputs = Array.from(quizForm.querySelectorAll(`input[name="${group}"]`));
            const selectedIndex = inputs.findIndex(input => input.checked);
            answers[group] = selectedIndex >= 0 ? selectedIndex : '';
            return answers;
        }, {});
        const markQuizAnswers = (answers = {}) => {
            quizForm.querySelectorAll('label').forEach((label) => {
                const input = label.querySelector('input[type="radio"]');
                if (!input) return;
                const optionIndex = Array.from(quizForm.querySelectorAll(`input[name="${input.name}"]`)).indexOf(input);
                const savedAnswer = answers[input.name];
                const isCorrect = input.value === '1';
                const isSelected = savedAnswer === optionIndex || savedAnswer === String(optionIndex) || (!Number.isInteger(Number(savedAnswer)) && input.checked);
                input.disabled = true;
                if (savedAnswer === optionIndex || savedAnswer === String(optionIndex)) input.checked = true;
                label.classList.add('is-locked');
                label.classList.toggle('is-selected', Boolean(isSelected));
                label.classList.toggle('is-correct', isCorrect);
                label.classList.toggle('is-wrong', Boolean(isSelected && !isCorrect));
            });
        };

        if (isQuizDone) {
            const savedScore = Number(localStorage.getItem(quizScoreKey) || 0);
            showResult(savedScore, 10);
            markQuizAnswers(getSavedAnswers());
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Kuis Sudah Dikirim';
            }
            return;
        }

        quizForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const unanswered = quizGroups.some(group => !quizForm.querySelector(`input[name="${group}"]:checked`));
            if (unanswered) {
                if (resultBox) {
                    resultBox.hidden = false;
                    resultBox.innerHTML = `
                        <strong>Lengkapi semua soal terlebih dahulu.</strong>
                        <span>Pilih satu jawaban untuk setiap nomor sebelum submit.</span>
                    `;
                }
                return;
            }
            let score = 0;
            const answers = getCurrentAnswers();
            for (const group of quizGroups) {
                const selected = quizForm.querySelector(`input[name="${group}"]:checked`);
                if (selected && selected.value === '1') score += 1;
            }
            localStorage.setItem(quizDoneKey, 'true');
            localStorage.setItem(quizScoreKey, String(score));
            localStorage.setItem(quizAnswersKey, JSON.stringify(answers));
            window.saveChapterProgress('ai-fundamentals', 'quiz', 'completed', score);
            recordParticipantActivity({
                activity_type: 'quiz_submitted',
                module_id: 'ai-fundamentals',
                lesson_id: 'pengantar-ai',
                activity: 'Kuis Pengantar AI dikirim',
                score,
                total: quizGroups.length,
                payload: { answers }
            });
            showResult(score, quizGroups.length);
            markQuizAnswers(answers);
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Kuis Sudah Dikirim';
            }
            document.querySelectorAll('[data-locked-after-quiz]').forEach(item => item.hidden = false);
            document.querySelectorAll('.lesson-lock-hint').forEach(item => item.hidden = true);
            nextLink?.classList.remove('is-disabled');
        });
    }

    function initAiIntroInteractive() {
        const article = document.getElementById('materi-ai');
        if (!article || article.dataset.aiIntroReady) return;
        article.dataset.aiIntroReady = 'true';

        const lensContent = {
            goal: {
                title: 'Tujuan sistem',
                text: 'AI tidak netral dari tujuan. Sistem rekomendasi bisa mengoptimalkan waktu tonton, pembelian, akurasi, efisiensi, atau keselamatan. Tujuan yang berbeda akan menghasilkan perilaku yang berbeda.'
            },
            data: {
                title: 'Data yang masuk',
                text: 'Sistem AI belajar dari contoh. Kualitas, cakupan, dan bias data akan memengaruhi output, bahkan ketika tampilan aplikasi terlihat bersih dan profesional.'
            },
            pattern: {
                title: 'Pola yang dipelajari',
                text: 'AI mencari keteraturan statistik: kata yang sering muncul bersama, wajah yang mirip, rute yang biasanya cepat, atau kandidat yang menyerupai data masa lalu.'
            },
            risk: {
                title: 'Risiko dan batasan',
                text: 'Output yang meyakinkan belum tentu benar. Risiko muncul ketika sistem salah, bias, tidak transparan, atau dipakai untuk keputusan penting tanpa koreksi manusia.'
            }
        };

        const lensOutput = article.querySelector('[data-ai-lens-output]');
        article.querySelectorAll('[data-ai-lens]').forEach((button) => {
            button.addEventListener('click', () => {
                article.querySelectorAll('[data-ai-lens]').forEach(item => item.classList.toggle('is-active', item === button));
                const content = lensContent[button.dataset.aiLens] || lensContent.goal;
                if (lensOutput) {
                    lensOutput.innerHTML = `<strong>${escapeHtml(content.title)}</strong><p>${escapeHtml(content.text)}</p>`;
                }
            });
        });

        const examples = {
            calculator: {
                title: 'Software biasa',
                text: 'Kalkulator menjalankan rumus eksplisit. Selama rumus dan input sama, outputnya sama. Ia tidak belajar dari riwayat penggunaanmu.'
            },
            spam: {
                title: 'Sistem AI',
                text: 'Filter spam memakai pola dari banyak email terdahulu, seperti kata, tautan, pengirim, dan perilaku pesan yang sering muncul pada spam.'
            },
            playlist: {
                title: 'Sistem AI',
                text: 'Playlist personal memprediksi lagu yang mungkin kamu sukai dari riwayat dengar, skip, like, dan pola pengguna lain yang mirip.'
            },
            form: {
                title: 'Software biasa',
                text: 'Validasi simbol @ biasanya hanya aturan tetap. Ia belum otomatis menjadi AI karena tidak belajar dari data atau membuat prediksi adaptif.'
            }
        };

        const exampleOutput = article.querySelector('[data-ai-example-output]');
        article.querySelectorAll('[data-ai-example]').forEach((button) => {
            button.addEventListener('click', () => {
                article.querySelectorAll('[data-ai-example]').forEach(item => item.classList.toggle('is-active', item === button));
                const content = examples[button.dataset.aiExample] || examples.calculator;
                if (exampleOutput) {
                    exampleOutput.innerHTML = `<strong>${escapeHtml(content.title)}</strong><p>${escapeHtml(content.text)}</p>`;
                }
            });
        });

        const scenarios = {
            music: {
                title: 'Rekomendasi Musik',
                rows: [
                    ['Input', 'Riwayat lagu, skip, like, durasi dengar, dan pola pengguna mirip.'],
                    ['Output', 'Daftar lagu yang diprediksi cocok untukmu.'],
                    ['Human check', 'Apakah rekomendasi membuatmu menemukan hal baru atau hanya mengurungmu di selera lama?']
                ]
            },
            map: {
                title: 'Navigasi Peta',
                rows: [
                    ['Input', 'Lokasi, kecepatan kendaraan, laporan pengguna, dan pola kepadatan jalan.'],
                    ['Output', 'Rute yang diprediksi lebih cepat atau lebih efisien.'],
                    ['Human check', 'Apakah rute aman, legal, dan tidak sekadar memindahkan beban macet ke jalan kecil?']
                ]
            },
            cv: {
                title: 'Screening CV',
                rows: [
                    ['Input', 'Data CV, kata kunci, pengalaman, riwayat rekrutmen, dan kriteria organisasi.'],
                    ['Output', 'Skor, ranking, atau label kandidat yang dianggap cocok.'],
                    ['Human check', 'Apakah sistem mewarisi bias data lama dan apakah kandidat masih punya ruang banding?']
                ]
            },
            chatbot: {
                title: 'Chatbot Layanan',
                rows: [
                    ['Input', 'Pertanyaan pengguna, dokumen referensi, riwayat percakapan, dan konteks layanan.'],
                    ['Output', 'Jawaban natural yang diprediksi relevan.'],
                    ['Human check', 'Apakah jawabannya faktual, sesuai kebijakan, dan aman untuk diikuti?']
                ]
            }
        };

        const scenarioOutput = article.querySelector('[data-ai-scenario-output]');
        article.querySelectorAll('[data-ai-scenario]').forEach((button) => {
            button.addEventListener('click', () => {
                article.querySelectorAll('[data-ai-scenario]').forEach(item => item.classList.toggle('is-active', item === button));
                const scenario = scenarios[button.dataset.aiScenario] || scenarios.music;
                if (scenarioOutput) {
                    scenarioOutput.innerHTML = `
                        <h4>${escapeHtml(scenario.title)}</h4>
                        <dl>${scenario.rows.map(([term, desc]) => `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(desc)}</dd></div>`).join('')}</dl>
                    `;
                }
            });
        });

        const auditKey = 'heraiAiIntroAuditChecks';
        const auditChecks = Array.from(article.querySelectorAll('[data-ai-audit]'));
        const auditBar = article.querySelector('[data-ai-audit-bar]');
        const auditText = article.querySelector('[data-ai-audit-text]');
        const savedAudit = (() => {
            try {
                const value = JSON.parse(localStorage.getItem(auditKey) || '[]');
                return Array.isArray(value) ? value : [];
            } catch {
                return [];
            }
        })();
        const syncAudit = () => {
            const completed = auditChecks.filter(input => input.checked).length;
            const total = auditChecks.length || 1;
            if (auditBar) auditBar.style.width = `${Math.round((completed / total) * 100)}%`;
            if (auditText) auditText.textContent = `${completed} dari ${total} selesai`;
            localStorage.setItem(auditKey, JSON.stringify(auditChecks.map(input => input.checked)));
        };
        auditChecks.forEach((input, index) => {
            input.checked = Boolean(savedAudit[index]);
            input.addEventListener('change', syncAudit);
        });
        syncAudit();
    }

    function escapeHtml(value = '') {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function readParticipantSession() {
        try {
            return JSON.parse(sessionStorage.getItem(PARTICIPANT_SESSION_KEY) || 'null');
        } catch {
            return null;
        }
    }

    function participantDashboardCacheKey() {
        const nik = String(readParticipantSession()?.nik || '').replace(/\D/g, '');
        return nik ? `${DASHBOARD_CACHE_PREFIX}:${nik}` : '';
    }

    function readParticipantDashboardCache() {
        const key = participantDashboardCacheKey();
        if (!key) return null;
        try {
            // Remove the old unscoped cache so data can never cross participant sessions.
            sessionStorage.removeItem('__dashboardCache');
            const cached = JSON.parse(sessionStorage.getItem(key) || 'null');
            if (!cached?.data || !Number.isFinite(Number(cached.ts))) return null;
            const age = Math.max(0, Date.now() - Number(cached.ts));
            if (age > DASHBOARD_CACHE_MAX_STALE_MS) {
                sessionStorage.removeItem(key);
                return null;
            }
            return { data: cached.data, age: age, fresh: age <= DASHBOARD_CACHE_TTL_MS };
        } catch {
            return null;
        }
    }

    function writeParticipantDashboardCache(data) {
        const key = participantDashboardCacheKey();
        if (!key || !data) return;
        try {
            sessionStorage.setItem(key, JSON.stringify({ ts: Date.now(), data: data }));
            sessionStorage.removeItem('__dashboardCache');
        } catch {
            // Cache is an optional speed layer; live data remains authoritative.
        }
    }

    function clearParticipantDashboardCache() {
        const key = participantDashboardCacheKey();
        _dashboardDataCache = null;
        _dashboardDataPromise = null;
        try {
            if (key) sessionStorage.removeItem(key);
            sessionStorage.removeItem('__dashboardCache');
        } catch {
            // Ignore storage restrictions.
        }
    }

    function getParticipantDisplayName() {
        const session = readParticipantSession();
        var name = session?.profile?.nama_lengkap
            || session?.name
            || (window.__CURRENT_PARTICIPANT_PROFILE__ && window.__CURRENT_PARTICIPANT_PROFILE__.nama_lengkap)
            || '';
        if (name && name !== 'Peserta HerAI') return name;

        // Last resort: try reading profile from settings form
        var settingsName = document.getElementById('settingsName');
        if (settingsName && settingsName.value && settingsName.value !== 'Peserta HerAI') {
            return settingsName.value;
        }

        return name || 'Peserta HerAI';
    }
    window.getParticipantDisplayName = getParticipantDisplayName;

    function saveParticipantSession(session) {
        sessionStorage.setItem(PARTICIPANT_SESSION_KEY, JSON.stringify(session));
    }

    function participantSessionId() {
        const key = 'heraiParticipantSessionId';
        let id = sessionStorage.getItem(key);
        if (!id) {
            id = `ps_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
            sessionStorage.setItem(key, id);
        }
        return id;
    }

    function recordParticipantActivity(activity = {}) {
        const session = readParticipantSession();
        if (!session?.nik || !session?.token) return;
        const payload = {
            action: 'recordParticipantActivity',
            nik: session.nik,
            participantToken: session.token,
            nama_lengkap: session.name || '',
            page: currentPath(),
            session_id: participantSessionId(),
            user_agent: navigator.userAgent,
            ...activity
        };
        try {
            fetch('/__gas', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload),
                keepalive: true
            }).catch(() => {});
        } catch {
            // Activity logging must never block learning flow.
        }
    }

    var _heartbeatIntervalId = null;
    function startHeartbeat() {
        if (_heartbeatIntervalId) return;
        _heartbeatIntervalId = setInterval(function () {
            var session = readParticipantSession();
            if (!session?.nik || !session?.token) return;
            var path = currentPath();
            // Extract module_id from path: /participant-ai-python-practice → python-untuk-ai
            var moduleId = '';
            var match = path.match(/^\/participant-([a-z0-9-]+?)(?:-(?:practice|quiz|discussion|overview))?$/);
            if (match) {
                moduleId = match[1];
            }
            fetch('/__gas', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    action: 'heartbeatPresence',
                    nik: session.nik,
                    participantToken: session.token,
                    page: path,
                    module_id: moduleId
                }),
                keepalive: true
            }).catch(function () {});
        }, 30000);
    }

    function stopHeartbeat() {
        if (_heartbeatIntervalId) {
            clearInterval(_heartbeatIntervalId);
            _heartbeatIntervalId = null;
        }
    }

    window.addEventListener('beforeunload', stopHeartbeat);
    // Also stop on hash change (SPA navigation away from participant pages)
    var _lastHeartbeatHash = '';
    window.addEventListener('hashchange', function () {
        var hash = window.location.hash;
        if (!hash.startsWith('#/participant-')) {
            stopHeartbeat();
        }
    });

    function initFellowUserMenu() {
        normalizeFellowUserMenu();
        const menu = document.querySelector('.fellow-user-menu');
        if (!menu || menu.dataset.ready) return;
        menu.dataset.ready = 'true';
        const toggle = menu.querySelector('[data-fellow-user-toggle]');
        const logout = menu.querySelector('[data-fellow-logout]');
        const name = getParticipantDisplayName();
        const showName = name && name !== 'Peserta HerAI' ? name : '';
        const nameNode = menu.querySelector('.fellow-user-button strong');
        const greeting = document.querySelector('[data-fellow-greeting]');
        if (nameNode) nameNode.textContent = showName || 'Peserta';
        if (greeting) greeting.textContent = showName ? `Halo, ${showName}!` : 'Halo, Peserta HerAI!';

        // Set topbar avatar photo
        var photoUrl = (readParticipantSession() || {}).profile?.photo_url;
        updateTopbarAvatar(photoUrl);

        const notifBadge = document.querySelector('.fellow-icon-button[aria-label="Notifikasi"] span');
        if (notifBadge) notifBadge.style.display = 'none';

        toggle?.addEventListener('click', (event) => {
            event.stopPropagation();
            const open = !menu.classList.contains('is-open');
            menu.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
        });
        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target)) {
                menu.classList.remove('is-open');
                toggle?.setAttribute('aria-expanded', 'false');
            }
        });
        logout?.addEventListener('click', () => {
            clearParticipantDashboardCache();
            sessionStorage.removeItem(PARTICIPANT_SESSION_KEY);
            window.__CURRENT_PARTICIPANT_PROFILE__ = null;
            window.location.hash = '#/participant-login';
        });
    }

    function normalizeFellowUserMenu() {
        const actions = document.querySelector('.fellow-actions');
        if (!actions || actions.querySelector('.fellow-user-menu')) return;

        const userButton = actions.querySelector('.fellow-user-button');
        if (!userButton) return;

        const menu = document.createElement('div');
        menu.className = 'fellow-user-menu';

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = userButton.className;
        toggle.setAttribute('data-fellow-user-toggle', '');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = userButton.innerHTML;

        const dropdown = document.createElement('div');
        dropdown.className = 'fellow-user-dropdown';
        dropdown.setAttribute('data-fellow-user-dropdown', '');
        dropdown.innerHTML = `
            <a href="#/participant-settings"><i class="fas fa-user-gear"></i><span>Setting Akun</span></a>
            <button type="button" data-fellow-logout><i class="fas fa-right-from-bracket"></i><span>Log Out</span></button>
        `;

        menu.append(toggle, dropdown);
        userButton.replaceWith(menu);
    }

    function defaultParticipantDashboardData() {
        return {
            modules: [],
            discussionTrails: [],
            tracks: [],
            journey: [
                { phase_id: 'foundation', title: 'Foundation Phase', subtitle: 'Pemahaman dasar AI', progress: null, status: 'unavailable', status_label: 'Memuat', icon: 'fas fa-book-open', accent: '#f63392' },
                { phase_id: 'specialization', title: 'Specialization', subtitle: 'Pilih dan dalami track AI', progress: null, status: 'unavailable', status_label: 'Memuat', icon: 'fas fa-code', accent: '#8b5cf6' },
                { phase_id: 'project', title: 'Project Building', subtitle: 'Bangun proyek nyata', progress: null, status: 'locked', status_label: 'Belum Dibuka', icon: 'fas fa-briefcase', accent: '#f8b84e' },
                { phase_id: 'graduation', title: 'Graduation', subtitle: 'Persiapan karier dan sertifikasi', progress: null, status: 'locked', status_label: 'Belum Dibuka', icon: 'fas fa-graduation-cap', accent: '#45c598' }
            ],
            events: [],
            leaderboard: []
        };
    }

    async function fetchParticipantDashboardData() {
        if (_dashboardDataPromise) return _dashboardDataPromise;
        var session = readParticipantSession();
        if (!session?.nik || !session?.token) throw new Error('Sesi peserta tidak tersedia. Silakan login ulang.');
        var controller = typeof AbortController === 'function' ? new AbortController() : null;
        var timeoutId = setTimeout(function() {
            controller?.abort();
        }, DASHBOARD_REQUEST_TIMEOUT_MS);
        _dashboardDataPromise = (async function() {
            try {
                var response = await fetch('/__gas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({ action: 'getParticipantDashboardData', nik: session.nik, participantToken: session.token }),
                    signal: controller?.signal
                });
                if (!response.ok) throw new Error('Gagal terhubung ke server.');
                var result = await response.json();
                if (result.status !== 'success') throw new Error(result.message || 'Gagal memuat data dashboard.');
                return Object.assign({}, defaultParticipantDashboardData(), result.data || {});
            } catch (error) {
                if (error?.name === 'AbortError') {
                    throw new Error('Server membutuhkan waktu terlalu lama. Tampilkan cache atau coba lagi.');
                }
                throw error;
            } finally {
                clearTimeout(timeoutId);
                _dashboardDataPromise = null;
            }
        })();
        return _dashboardDataPromise;
    }

    function normalizeLearningSummary(data) {
        var supplied = data && data.learningSummary;
        if (supplied && Number.isFinite(Number(supplied.total))) {
            var total = Math.max(0, Number(supplied.total || 0));
            var completed = Math.max(0, Math.min(total, Number(supplied.completed || 0)));
            var inProgress = Math.max(0, Math.min(total - completed, Number(supplied.in_progress || 0)));
            return {
                total: total,
                completed: completed,
                in_progress: inProgress,
                not_started: Math.max(0, total - completed - inProgress),
                progress: Math.max(0, Math.min(100, Math.round(Number(supplied.progress || 0))))
            };
        }

        var modules = Array.isArray(data?.modules) ? data.modules : [];
        var activeModules = [
            ['python-untuk-ai', 'participant-ai-python'],
            ['reasoning', 'participant-ai-reasoning'],
            ['konsep-ai-modern', 'participant-ai-modern'],
            ['evaluation', 'participant-ai-evaluation'],
            ['evolution', 'participant-ai-evolution']
        ];
        var moduleProgress = activeModules.map(function(identity) {
            var module = modules.find(function(item) {
                return item.module_id === identity[0] || String(item.href || '').includes(identity[1]);
            });
            return module ? Math.max(0, Math.min(100, Number(module.progress || 0))) : 0;
        });
        moduleProgress.unshift(0); // Pengantar AI belum memiliki kartu dashboard terpisah.
        var completedCount = moduleProgress.filter(function(value) { return value >= 100; }).length;
        var startedCount = moduleProgress.filter(function(value) { return value > 0 && value < 100; }).length;
        return {
            total: moduleProgress.length,
            completed: completedCount,
            in_progress: startedCount,
            not_started: moduleProgress.length - completedCount - startedCount,
            progress: Math.round(moduleProgress.reduce(function(sum, value) { return sum + value; }, 0) / moduleProgress.length)
        };
    }

    function renderAiFundamentalsSummary(data, state) {
        var card = document.querySelector('.course-summary-card[data-learning-summary-state]');
        if (!card) return;
        var summary = normalizeLearningSummary(data || defaultParticipantDashboardData());
        var total = Math.max(1, summary.total);
        var completedEnd = Math.round((summary.completed / total) * 100);
        var startedEnd = Math.round(((summary.completed + summary.in_progress) / total) * 100);
        var donut = card.querySelector('[data-learning-summary-donut]');
        if (donut) {
            donut.style.setProperty('--completed-end', completedEnd + '%');
            donut.style.setProperty('--started-end', startedEnd + '%');
            donut.setAttribute('aria-label', summary.progress + ' persen progres; ' + summary.completed + ' modul tuntas, ' + summary.in_progress + ' dalam proses, ' + summary.not_started + ' belum dimulai');
        }
        var progress = card.querySelector('[data-learning-summary-progress]');
        var completed = card.querySelector('[data-learning-summary-completed]');
        var inProgress = card.querySelector('[data-learning-summary-in-progress]');
        var notStarted = card.querySelector('[data-learning-summary-not-started]');
        var status = card.querySelector('[data-learning-summary-status]');
        if (progress) progress.textContent = summary.progress + '%';
        if (completed) completed.textContent = String(summary.completed);
        if (inProgress) inProgress.textContent = String(summary.in_progress);
        if (notStarted) notStarted.textContent = String(summary.not_started);
        if (status) status.textContent = state === 'error'
            ? 'Progres terbaru belum dapat dimuat.'
            : (state === 'cache' ? 'Menampilkan progres tersimpan sambil sinkronisasi.' : 'Sinkron dengan progres server.');

        var heroProgress = document.querySelector('[data-learning-hero-progress]');
        var heroBar = document.querySelector('[data-learning-hero-bar]');
        var heroCopy = document.querySelector('[data-learning-hero-copy]');
        var heroAction = document.querySelector('[data-learning-hero-action]');
        if (heroProgress) heroProgress.textContent = summary.progress + '%';
        if (heroBar) heroBar.style.setProperty('--value', summary.progress + '%');
        if (heroCopy) heroCopy.textContent = summary.completed + ' tuntas · ' + summary.in_progress + ' berjalan dari ' + summary.total + ' modul';

        var foundationModules = participantFoundationModules(data || {});
        var nextModule = foundationModules.find(function(module) { return module.progress > 0 && module.progress < 100; })
            || foundationModules.find(function(module) { return module.progress < 100; })
            || foundationModules[0];
        if (heroAction && nextModule) {
            heroAction.setAttribute('href', nextModule.href);
            heroAction.innerHTML = (summary.progress > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar') + ' <i class="fas fa-play" aria-hidden="true"></i>';
        }

        var started = Math.min(3, summary.completed + summary.in_progress);
        var achievementCount = document.querySelector('[data-learning-achievement-count]');
        var achievementBar = document.querySelector('[data-learning-achievement-bar]');
        if (achievementCount) achievementCount.textContent = started + ' / 3 Modul';
        if (achievementBar) achievementBar.style.setProperty('--value', Math.round((started / 3) * 100) + '%');
        card.dataset.learningSummaryState = state === 'error' ? 'error' : 'ready';
        card.setAttribute('aria-busy', 'false');
    }

    async function initAiFundamentalsSummary() {
        var card = document.querySelector('.course-summary-card[data-learning-summary-state]');
        if (!card) return;
        var cached = _dashboardDataCache ? { data: _dashboardDataCache, fresh: true } : readParticipantDashboardCache();
        if (cached?.data) {
            _dashboardDataCache = cached.data;
            renderAiFundamentalsSummary(cached.data, 'cache');
        }
        try {
            var data = await fetchParticipantDashboardData();
            _dashboardDataCache = data;
            writeParticipantDashboardCache(data);
            renderAiFundamentalsSummary(data, 'ready');
        } catch (error) {
            renderAiFundamentalsSummary(cached?.data || _dashboardDataCache || defaultParticipantDashboardData(), 'error');
        }
    }

    const FOUNDATION_MODULE_UI = [
        { module_id: 'ai-fundamentals', title: 'Pengantar AI', href: '#/participant-ai-intro' },
        { module_id: 'python-untuk-ai', title: 'Python untuk AI', href: '#/participant-ai-python' },
        { module_id: 'reasoning', title: 'Reasoning', href: '#/participant-ai-reasoning' },
        { module_id: 'konsep-ai-modern', title: 'Konsep AI Modern', href: '#/participant-ai-modern' },
        { module_id: 'evaluation', title: 'Evaluation', href: '#/participant-ai-evaluation' },
        { module_id: 'evolution', title: 'Evolution of AI', href: '#/participant-ai-evolution' }
    ];

    function participantFoundationModules(data) {
        var source = Array.isArray(data?.trackingModules) && data.trackingModules.length
            ? data.trackingModules
            : (Array.isArray(data?.modules) ? data.modules : []);
        return FOUNDATION_MODULE_UI.map(function(meta) {
            var live = source.find(function(item) {
                return String(item.module_id || '') === meta.module_id;
            });
            return Object.assign({}, meta, live || {}, {
                module_id: meta.module_id,
                title: live?.title || meta.title,
                href: live?.href || meta.href,
                progress: Math.max(0, Math.min(100, Math.round(Number(live?.progress || 0))))
            });
        });
    }

    function summarizeFoundationModules(modules) {
        var progressValues = modules.map(function(module) { return module.progress; });
        var completed = progressValues.filter(function(progress) { return progress >= 100; }).length;
        var inProgress = progressValues.filter(function(progress) { return progress > 0 && progress < 100; }).length;
        return {
            total: modules.length,
            completed: completed,
            in_progress: inProgress,
            not_started: modules.length - completed - inProgress,
            progress: modules.length
                ? Math.round(progressValues.reduce(function(total, progress) { return total + progress; }, 0) / modules.length)
                : 0
        };
    }

    function setModuleSummaryValue(selector, value) {
        var node = document.querySelector(selector);
        if (node) node.textContent = String(value);
    }

    function renderParticipantModules(data, state) {
        var summaryGrid = document.querySelector('[data-module-summary-state]');
        var sideCard = document.querySelector('[data-module-side-summary-state]');
        if (!summaryGrid && !sideCard) return;

        var hasData = data && (Array.isArray(data.trackingModules) || Array.isArray(data.modules));
        var modules = participantFoundationModules(data || {});
        var summary = summarizeFoundationModules(modules);
        var failedWithoutData = state === 'error' && !hasData;

        setModuleSummaryValue('[data-module-summary-total]', failedWithoutData ? '—' : summary.total);
        setModuleSummaryValue('[data-module-summary-completed]', failedWithoutData ? '—' : summary.completed);
        setModuleSummaryValue('[data-module-summary-in-progress]', failedWithoutData ? '—' : summary.in_progress);
        setModuleSummaryValue('[data-module-summary-progress]', failedWithoutData ? '—' : summary.progress + '%');
        setModuleSummaryValue('[data-module-side-progress]', failedWithoutData ? '—' : summary.progress + '%');
        setModuleSummaryValue('[data-module-side-completed]', failedWithoutData ? '—' : summary.completed);
        setModuleSummaryValue('[data-module-side-in-progress]', failedWithoutData ? '—' : summary.in_progress);
        setModuleSummaryValue('[data-module-side-not-started]', failedWithoutData ? '—' : summary.not_started);

        var donut = document.querySelector('[data-module-summary-donut]');
        if (donut) {
            var total = Math.max(1, summary.total);
            var completedEnd = Math.round((summary.completed / total) * 100);
            var startedEnd = Math.round(((summary.completed + summary.in_progress) / total) * 100);
            donut.style.setProperty('--completed-end', completedEnd + '%');
            donut.style.setProperty('--started-end', startedEnd + '%');
            donut.setAttribute('aria-label', failedWithoutData
                ? 'Progres belajar belum dapat dimuat'
                : summary.progress + ' persen progres; ' + summary.completed + ' modul selesai, ' + summary.in_progress + ' sedang berjalan, ' + summary.not_started + ' belum dimulai');
        }

        modules.forEach(function(module) {
            var card = document.querySelector('[data-module-id="' + module.module_id + '"]');
            if (!card) return;
            var progress = module.progress;
            var progressLabel = card.querySelector('[data-module-progress-label]');
            var progressBar = card.querySelector('[data-module-progress-bar]');
            card.classList.toggle('is-complete', !failedWithoutData && progress >= 100);
            card.classList.toggle('is-in-progress', !failedWithoutData && progress > 0 && progress < 100);
            card.classList.remove('is-loading');
            if (progressLabel) {
                progressLabel.textContent = failedWithoutData
                    ? 'Progres belum termuat'
                    : (progress >= 100 ? 'Selesai' : (progress > 0 ? progress + '% dipelajari' : 'Belum dimulai'));
            }
            if (progressBar) progressBar.style.setProperty('--value', failedWithoutData ? '0%' : progress + '%');
        });

        var nextModule = modules.find(function(module) { return module.progress > 0 && module.progress < 100; })
            || modules.find(function(module) { return module.progress < 100; })
            || modules[0];
        var focusTitle = document.querySelector('[data-learning-focus-title]');
        var focusCopy = document.querySelector('[data-learning-focus-copy]');
        var focusLink = document.querySelector('[data-learning-focus-link]');
        if (nextModule && !failedWithoutData) {
            if (focusTitle) focusTitle.textContent = nextModule.title;
            if (focusCopy) focusCopy.textContent = nextModule.progress > 0
                ? 'Lanjutkan dari progres ' + nextModule.progress + '% dan pertahankan ritme belajarmu.'
                : 'Mulai modul berikutnya untuk melanjutkan perjalanan Foundation.';
            if (focusLink) focusLink.setAttribute('href', nextModule.href);
        }

        var status = document.querySelector('[data-module-summary-status]');
        var retry = document.querySelector('[data-module-summary-retry]');
        if (status) status.textContent = state === 'error'
            ? (hasData ? 'Menampilkan cache terakhir. Sinkronisasi server gagal.' : 'Progres belum dapat dimuat. Periksa koneksi lalu coba lagi.')
            : (state === 'cache' ? 'Progres tersimpan tampil. Menyinkronkan data terbaru…' : 'Sinkron dengan progres server.');
        if (retry) retry.hidden = state !== 'error';
        if (summaryGrid) {
            summaryGrid.dataset.moduleSummaryState = state;
            summaryGrid.setAttribute('aria-busy', String(state === 'cache'));
        }
        if (sideCard) {
            sideCard.dataset.moduleSideSummaryState = state;
            sideCard.setAttribute('aria-busy', String(state === 'cache'));
        }
    }

    async function initParticipantModulesData() {
        if (!document.querySelector('.fellow-modules-page [data-module-summary-state]') && !document.querySelector('.fellow-modules-page [data-module-side-summary-state]')) return;
        var cached = _dashboardDataCache ? { data: _dashboardDataCache, fresh: true } : readParticipantDashboardCache();
        if (cached?.data) {
            _dashboardDataCache = cached.data;
            renderParticipantModules(cached.data, 'cache');
        }
        var slowTimer = setTimeout(function() {
            if (cached?.data) return;
            var status = document.querySelector('[data-module-summary-status]');
            if (status) status.textContent = 'Server sedang menyiapkan progres pertamamu…';
        }, 1200);
        try {
            var data = await fetchParticipantDashboardData();
            _dashboardDataCache = data;
            writeParticipantDashboardCache(data);
            renderParticipantModules(data, 'ready');
        } catch (error) {
            renderParticipantModules(cached?.data || _dashboardDataCache, 'error');
        } finally {
            clearTimeout(slowTimer);
        }
    }

    window.__retryParticipantModules = function() {
        var summaryGrid = document.querySelector('[data-module-summary-state]');
        var sideCard = document.querySelector('[data-module-side-summary-state]');
        if (summaryGrid) summaryGrid.setAttribute('aria-busy', 'true');
        if (sideCard) sideCard.setAttribute('aria-busy', 'true');
        initParticipantModulesData();
    };

    function renderParticipantLeaderboard(data, state) {
        var summary = document.querySelector('[data-leaderboard-state]');
        var body = document.querySelector('[data-leaderboard-body]');
        if (!summary || !body) return;

        var entries = Array.isArray(data?.leaderboard) ? data.leaderboard : [];
        var current = entries.find(function(item) { return item.current === true; });
        var status = document.querySelector('[data-leaderboard-status]');
        var empty = document.querySelector('[data-leaderboard-empty]');
        var retry = document.querySelector('[data-leaderboard-retry]');
        var displayName = getParticipantDisplayName() || 'Kamu';

        var hasRank = current && current.rank !== null;
        setModuleSummaryValue('[data-leaderboard-rank]', hasRank ? '#' + Number(current.rank) : '—');
        setModuleSummaryValue('[data-leaderboard-points]', current ? Number(current.points || 0).toLocaleString('id-ID') : '—');
        var displayEntries = entries.filter(function(e) { return e.rank !== null && e.rank <= 10; });
        setModuleSummaryValue('[data-leaderboard-count]', state === 'error' ? '—' : displayEntries.length);
        setModuleSummaryValue('[data-leaderboard-rank-copy]', hasRank ? 'Berdasarkan poin yang berhasil disinkronisasi' : 'Belum masuk peringkat');

        var podium = document.querySelector('[data-leaderboard-podium]');

        if (state === 'error') {
            body.innerHTML = '';
            if (podium) { podium.innerHTML = ''; podium.hidden = true; }
            if (status) status.textContent = 'Data leaderboard belum dapat dimuat.';
            if (empty) {
                empty.hidden = false;
                var emptyTitle = empty.querySelector('strong');
                var emptyCopy = empty.querySelector('p');
                if (emptyTitle) emptyTitle.textContent = 'Koneksi ke leaderboard terputus';
                if (emptyCopy) emptyCopy.textContent = 'Tidak ada data contoh yang ditampilkan. Coba muat ulang setelah koneksi stabil.';
            }
            if (retry) retry.hidden = false;
            summary.dataset.leaderboardState = 'error';
            summary.setAttribute('aria-busy', 'false');
            return;
        }

        var tableEntries = entries.filter(function(e) { return e.rank !== null && e.rank <= 10; });
        var top3 = tableEntries.slice(0, 3);
        var rest = tableEntries;

        if (podium) {
            if (top3.length > 0) {
                podium.hidden = false;
                var podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
                podium.innerHTML = podiumOrder.map(function(item) {
                    var rank = Math.max(1, Number(item.rank));
                    var isCurrent = item.current === true;
                    var visibleName = isCurrent ? displayName + ' (Kamu)' : 'Peserta disamarkan';
                    var icon = isCurrent ? 'fa-user' : 'fa-lock';
                    if (rank === 1) icon = 'fa-crown';
                    return '<div class="lb-podium-card rank-' + rank + (isCurrent ? ' is-current' : '') + '" data-leaderboard-search-row="' + escapeHtml((visibleName + ' ' + rank).toLowerCase()) + '">' +
                        '<div class="lb-podium-avatar"><i class="fas ' + icon + '"></i><div class="lb-podium-badge">' + rank + '</div></div>' +
                        '<h3 class="lb-podium-name">' + escapeHtml(visibleName) + '</h3>' +
                        '<div class="lb-podium-points">' + Number(item.points || 0).toLocaleString('id-ID') + '</div>' +
                        '<small style="color: #6b7280;">poin</small>' +
                    '</div>';
                }).join('');
            } else {
                podium.hidden = true;
                podium.innerHTML = '';
            }
        }

        body.innerHTML = rest.map(function(item, index) {
            var rank = Math.max(1, Number(item.rank || index + 1));
            var isCurrent = item.current === true;
            var visibleName = isCurrent ? displayName + ' (Kamu)' : 'Peserta disamarkan';
            var rankIcon = rank === 1 ? 'fa-crown' : (rank <= 3 ? 'fa-medal' : 'fa-ranking-star');
            var statusLabel = isCurrent ? 'Posisimu' : 'Privat';
            return '<tr class="lb-live-row' + (isCurrent ? ' is-current' : '') + '" data-leaderboard-search-row="' + escapeHtml((visibleName + ' ' + rank).toLowerCase()) + '">' +
                '<td><span class="lb-rank-mark rank-' + rank + '"><i class="fas ' + rankIcon + '" aria-hidden="true"></i>' + rank + '</span></td>' +
                '<td><div class="lb-live-user"><span class="lb-live-avatar ' + (isCurrent ? 'current' : 'masked') + '"><i class="fas ' + (isCurrent ? 'fa-user' : 'fa-lock') + '"></i></span><div><strong>' + escapeHtml(visibleName) + '</strong><small>' + (isCurrent ? 'Akun peserta aktif' : 'Identitas dilindungi') + '</small></div></div></td>' +
                '<td><span class="lb-row-status ' + (isCurrent ? 'current' : '') + '"><i class="fas ' + (isCurrent ? 'fa-location-dot' : 'fa-shield-halved') + '"></i>' + statusLabel + '</span></td>' +
                '<td><strong class="lb-live-points">' + Number(item.points || 0).toLocaleString('id-ID') + '</strong><small> poin</small></td>' +
            '</tr>';
        }).join('');

        if (empty) {
            empty.hidden = entries.length > 0;
            var title = empty.querySelector('strong');
            var copy = empty.querySelector('p');
            if (title) title.textContent = 'Belum ada peringkat';
            if (copy) copy.textContent = 'Peringkat akan muncul setelah progress belajar pertama tersimpan.';
        }
        if (status) status.textContent = entries.length
            ? 'Sinkron dengan progress server.'
            : 'Belum ada progress peserta untuk dihitung.';
        if (retry) retry.hidden = true;
        summary.dataset.leaderboardState = 'ready';
        summary.setAttribute('aria-busy', 'false');
    }

    function initParticipantLeaderboardInteractions() {
        var root = document.querySelector('.participant-leaderboard-page');
        if (!root || root.dataset.leaderboardReady) return;
        root.dataset.leaderboardReady = 'true';
        var search = root.querySelector('[data-leaderboard-search]');
        search?.addEventListener('input', function() {
            var query = String(search.value || '').trim().toLocaleLowerCase('id-ID');
            root.querySelectorAll('[data-leaderboard-search-row]').forEach(function(row) {
                row.hidden = Boolean(query) && !String(row.dataset.leaderboardSearchRow || '').includes(query);
            });
        });
        root.querySelector('[data-leaderboard-retry]')?.addEventListener('click', function() {
            initParticipantLeaderboardData();
        });
    }

    async function initParticipantLeaderboardData() {
        if (!document.querySelector('.participant-leaderboard-page [data-leaderboard-state]')) return;
        initParticipantLeaderboardInteractions();
        var summary = document.querySelector('[data-leaderboard-state]');
        if (summary) summary.setAttribute('aria-busy', 'true');
        var cached = _dashboardDataCache ? { data: _dashboardDataCache } : readParticipantDashboardCache();
        if (cached?.data) renderParticipantLeaderboard(cached.data, 'ready');
        try {
            var data = await fetchParticipantDashboardData();
            _dashboardDataCache = data;
            writeParticipantDashboardCache(data);
            renderParticipantLeaderboard(data, 'ready');
        } catch (error) {
            if (!cached?.data) renderParticipantLeaderboard(null, 'error');
        }
    }

    // Format quiz score badge for module card.
    // Returns empty string if no score, HTML badge otherwise.
    // All scores are already normalized to percentage (0-100) by GAS backend.
    function formatQuizBadge(quizScore) {
        if (quizScore === null || quizScore === undefined || isNaN(Number(quizScore))) return '';
        var score = Number(quizScore);
        var label = score + '%';
        return '<em class="quiz-badge" title="Nilai Kuis: ' + label + '"><i class="fas fa-trophy"></i> ' + label + '</em>';
    }

    function renderParticipantDashboard(data) {
        const fallbackData = defaultParticipantDashboardData();
        const nonEmpty = (items, fallbackItems) => Array.isArray(items) && items.length ? items : fallbackItems;
        const moduleGrid = document.getElementById('dashboardModuleGrid');
        if (moduleGrid) {
            const modules = nonEmpty(data.modules, fallbackData.modules);
            const isRealData = Array.isArray(data.modules) && data.modules.length > 3;
            const hasVisibilityContract = modules.some(item => Object.prototype.hasOwnProperty.call(item, 'dashboard_visible'));
            // New GAS controls visibility per module. Keep the legacy allow-list only
            // during the safe deployment window where frontend may reach old GAS.
            var filteredModules = hasVisibilityContract
                ? modules.filter(item => item.dashboard_visible !== false)
                : modules.filter(function(item) {
                    var href = item.href || '';
                    var legacyOnlinePrefixes = ['ai-python', 'ai-reasoning', 'ai-modern', 'ai-evaluation', 'ai-evolution', 'ai-intro', 'ai-fundamentals'];
                    if (href.includes('under-development')) return false;
                    if (href.includes('participant-modules') || href.includes('add')) return true;
                    return legacyOnlinePrefixes.some(prefix => href.includes(prefix));
                });
            const displayModules = isRealData ? filteredModules.slice(0, 8) : filteredModules;
            moduleGrid.innerHTML = displayModules.map((item) => {
                const progress = Math.max(0, Math.min(100, Math.round(Number(item.progress || 0))));
                const quizLabel = item.quiz_score === null || item.quiz_score === undefined || isNaN(Number(item.quiz_score))
                    ? 'belum ada nilai kuis'
                    : 'nilai kuis ' + Number(item.quiz_score) + ' persen';
                return `
                <a class="module-card dash-real ${escapeHtml(item.tone || 'pink')}" href="${escapeHtml(item.href || '#/participant-modules')}" aria-label="${escapeHtml(item.title)}, progres ${progress} persen, ${escapeHtml(quizLabel)}">
                    <div class="module-icon"><i class="${escapeHtml(item.icon || 'fas fa-book-open')}"></i></div>
                    <span style="--progress:${progress}%" title="Progres ${progress}%">${progress}%</span>
                    ${formatQuizBadge(item.quiz_score)}
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.subtitle || 'Mulai belajar')}</p>
                </a>
            `;
            }).join('') + `
                <a class="module-card add dash-real" href="#/participant-modules" aria-label="Lihat semua modul pembelajaran">
                    <div class="module-icon"><i class="fas fa-grid-2"></i></div>
                    <h3>${isRealData ? 'Lihat Semua Modul (' + normalizeLearningSummary(data).total + ')' : 'Pilih Modul Lainnya'}</h3>
                    <p>Jelajahi semua modul pembelajaran</p>
                </a>
            `;
        }

        const trail = document.getElementById('dashboardDiscussionTrail');
        if (trail) {
            const discussionTrails = Array.isArray(data.discussionTrails) ? data.discussionTrails : [];
            trail.innerHTML = discussionTrails.length ? discussionTrails.map((item) => `
                <li class="dash-real"><span class="mini-avatar ${escapeHtml(item.tone || '')}"></span><p><strong>${escapeHtml(item.actor)}</strong> ${escapeHtml(item.action)} di diskusi <b>#${escapeHtml(item.topic)}</b><small>${escapeHtml(item.time)}</small></p><i></i></li>
            `).join('') : '<li class="dash-empty-state"><i class="fas fa-comments" aria-hidden="true"></i><p><strong>Belum ada aktivitas diskusi</strong><small>Aktivitas terbaru akan muncul di sini.</small></p></li>';
        }

        const tracks = document.getElementById('dashboardTrackGrid');
        if (tracks) {
            const trackItems = Array.isArray(data.tracks) ? data.tracks : [];
            tracks.innerHTML = trackItems.length ? trackItems.map((item) => `
                <article class="dash-real"><i class="${escapeHtml(item.icon || 'fas fa-layer-group')}"></i><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.subtitle)}</span></article>
            `).join('') : '<article class="dash-track-empty"><i class="fas fa-lock"></i><strong>Specialization belum dibuka</strong><span>Fokuskan progresmu pada enam modul Foundation.</span></article>';
        }

        const journey = document.getElementById('dashboardJourneyList');
        if (journey) {
            const journeyItems = Array.isArray(data.journey) ? data.journey : [];
            journey.innerHTML = journeyItems.length ? journeyItems.map((item) => {
                const hasProgress = item.progress !== null && item.progress !== undefined && Number.isFinite(Number(item.progress));
                const progress = hasProgress ? Math.max(0, Math.min(100, Math.round(Number(item.progress)))) : 0;
                const safeStatus = ['completed', 'in_progress', 'not_started', 'locked', 'unavailable'].includes(item.status)
                    ? item.status
                    : (hasProgress ? 'not_started' : 'unavailable');
                const statusLabel = hasProgress ? `${progress}%` : (item.status_label || 'Belum Dibuka');
                const statusIcon = safeStatus === 'locked'
                    ? '<i class="fas fa-lock" aria-hidden="true"></i>'
                    : (safeStatus === 'unavailable' ? '<i class="fas fa-rotate" aria-hidden="true"></i>' : '');
                return `
                    <article class="dash-real journey-state-${safeStatus}" aria-label="${escapeHtml(item.title)}: ${escapeHtml(statusLabel)}" style="--accent:${escapeHtml(item.accent || '#f63392')};--value:${progress}%">
                        <i class="${escapeHtml(item.icon || 'fas fa-book-open')}"></i>
                        <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.subtitle)}</span><b></b></div>
                        <em>${statusIcon}${escapeHtml(statusLabel)}</em>
                    </article>
                `;
            }).join('') : '<article class="journey-state-unavailable dash-real" aria-label="Perjalanan belum tersedia"><i class="fas fa-route"></i><div><strong>Perjalanan belum tersedia</strong><span>Data fase akan tampil setelah disiapkan panitia.</span><b></b></div><em><i class="fas fa-clock"></i> Menunggu</em></article>';
        }

        const events = document.getElementById('dashboardUpcomingEvents');
        if (events) {
            const eventItems = Array.isArray(data.events) ? data.events : [];
            events.innerHTML = eventItems.length ? eventItems.map((item) => `
                <article class="dash-real"><time><strong>${escapeHtml(item.day)}</strong>${escapeHtml(item.month)}</time><div><h3>${escapeHtml(item.title)}</h3><p>&#128338; ${escapeHtml(item.time)}</p></div><a class="event-join-button" href="${escapeHtml(item.url || '#/participant-events')}">Gabung</a></article>
            `).join('') : '<div class="dash-panel-empty"><i class="far fa-calendar-check"></i><div><strong>Belum ada event terjadwal</strong><span>Jadwal baru akan muncul setelah diumumkan panitia.</span></div></div>';
        }

        const leaderboard = document.getElementById('dashboardLeaderboard');
        if (leaderboard) {
            const session = readParticipantSession();
            const currentName = getParticipantDisplayName();
            const leaderboardItems = Array.isArray(data.leaderboard) ? data.leaderboard : [];
            leaderboard.innerHTML = leaderboardItems.length ? leaderboardItems.map((item, index) => {
                const rank = item.rank || index + 1;
                const itemNik = String(item.nik || '').replace(/\D/g, '');
                const sessionNik = String(session?.nik || '').replace(/\D/g, '');
                const sameNik = itemNik && sessionNik && itemNik === sessionNik;
                const sameName = item.name && currentName && String(item.name).toLowerCase() === String(currentName).toLowerCase();
                const isCurrent = item.current === true || sameNik || sameName;
                const medal = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
                const shouldPreferStoredName = (sameNik || sameName || !session?.name) && item.name && item.name !== '*********';
                const cleanName = shouldPreferStoredName ? item.name : currentName;
                const visibleName = isCurrent ? `${escapeHtml(cleanName || 'Kamu')} (Kamu)` : '*********';
                return `<li class="dash-real${isCurrent ? ' current' : ''}"><span>${rank}</span><b class="avatar-small ${isCurrent ? 'pink' : 'masked'}">${isCurrent ? '' : '****'}</b><strong>${visibleName}</strong><em>${Number(item.points || 0).toLocaleString('id-ID')} Poin</em><i class="fas fa-medal ${medal}"></i></li>`;
            }).join('') : '<li class="dash-leaderboard-empty"><i class="fas fa-seedling"></i><span><strong>Belum ada peringkat</strong><small>Progress pertama akan memulai leaderboard.</small></span></li>';
        }
    }

    function renderParticipantRestricted() {
        var restrictedHTML = '<section class="fellow-restricted-state"><div><i class="fas fa-lock fa-shield-halved"></i><h1>Akses Peserta Dibatasi</h1><p>Sementara ini portal peserta hanya membuka <strong>Beranda</strong>, <strong>Modul</strong>, dan <strong>Pengaturan</strong>.</p><a href="#/participant-dashboard"><i class="fas fa-arrow-left"></i> Kembali ke Beranda</a></div></section>';

        var root = document.querySelector('.fellow-dashboard');
        if (root) {
            root.innerHTML = restrictedHTML;
            return;
        }

        var main = document.querySelector('main') || document.querySelector('#app') || document.querySelector('.page-content');
        if (main) {
            main.innerHTML = restrictedHTML;
            return;
        }

        document.body.innerHTML = restrictedHTML;
    }

    function renderDashboardSkeletons() {
        var moduleGrid = document.getElementById('dashboardModuleGrid');
        if (moduleGrid) {
            moduleGrid.innerHTML = Array.from({ length: 9 }, function() {
                return '<div class="skeleton-card"><div class="skeleton-icon"></div><div class="skeleton-title"></div><div class="skeleton-sub"></div><div class="skeleton-badge"></div></div>';
            }).join('');
        }

        var trail = document.getElementById('dashboardDiscussionTrail');
        if (trail) {
            trail.innerHTML = Array.from({ length: 4 }, function() {
                return '<li class="sk-item"><span class="skeleton-circle sm"></span><span class="skeleton-line med"></span></li>';
            }).join('');
        }

        var tracks = document.getElementById('dashboardTrackGrid');
        if (tracks) {
            tracks.innerHTML = Array.from({ length: 6 }, function() {
                return '<article class="sk-article"><span class="skeleton-circle md"></span><span class="skeleton-line"></span><span class="skeleton-line short"></span></article>';
            }).join('');
        }

        var journey = document.getElementById('dashboardJourneyList');
        if (journey) {
            journey.innerHTML = Array.from({ length: 4 }, function() {
                return '<article class="sk-article"><span class="skeleton-circle md"></span><div class="sk-lines"><span class="skeleton-line med"></span><span class="skeleton-line short"></span></div><span class="skeleton-circle sm"></span></article>';
            }).join('');
        }

        var events = document.getElementById('dashboardUpcomingEvents');
        if (events) {
            events.innerHTML = Array.from({ length: 3 }, function() {
                return '<article class="sk-article"><div class="sk-date"></div><div class="sk-lines"><span class="skeleton-line"></span><span class="skeleton-line short"></span></div></article>';
            }).join('');
        }

        var leaderboard = document.getElementById('dashboardLeaderboard');
        if (leaderboard) {
            leaderboard.innerHTML = Array.from({ length: 3 }, function(_, i) {
                return '<li class="sk-item"><span>' + (i + 1) + '</span><span class="skeleton-circle sm"></span><span class="skeleton-line med"></span></li>';
            }).join('');
        }
    }

    function renderDashboardError(err) {
        var message = (err && err.message) ? err.message : 'Gagal memuat data dashboard.';
        var errorHTML = '<div class="dashboard-error"><i class="fas fa-cloud-exclamation"></i><p>' + escapeHtml(message) + '</p><button class="btn-retry" onclick="window.__retryDashboard()"><i class="fas fa-rotate-right"></i> Coba Lagi</button></div>';

        ['dashboardModuleGrid', 'dashboardDiscussionTrail', 'dashboardTrackGrid',
         'dashboardJourneyList', 'dashboardUpcomingEvents', 'dashboardLeaderboard']
        .forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.innerHTML = errorHTML;
        });
    }

    async function initParticipantDashboardData() {
        // 1. In-memory cache (fastest — SPA navigation)
        if (_dashboardDataCache) {
            renderParticipantDashboard(_dashboardDataCache);
            try {
                var fresh = await fetchParticipantDashboardData();
                if (Array.isArray(fresh.modules) && fresh.modules.length > 3) {
                    _dashboardDataCache = fresh;
                    writeParticipantDashboardCache(fresh);
                    if (window.location.hash === '#/participant-dashboard') renderParticipantDashboard(fresh);
                }
            } catch (_) { /* silent background refresh */ }
            return;
        }

        // 2. Participant-scoped cache (survives refresh without crossing accounts)
        var cached = readParticipantDashboardCache();
        if (cached?.data && Array.isArray(cached.data.modules) && cached.data.modules.length > 3) {
            _dashboardDataCache = cached.data;
            renderParticipantDashboard(cached.data);
            try {
                var bg = await fetchParticipantDashboardData();
                if (Array.isArray(bg.modules) && bg.modules.length > 3) {
                    _dashboardDataCache = bg;
                    writeParticipantDashboardCache(bg);
                    if (window.location.hash === '#/participant-dashboard') renderParticipantDashboard(bg);
                }
            } catch (_) {}
            return;
        }

        // 3. No cache — show skeleton + fetch
        if (!_dashboardDataCache) {
            renderDashboardSkeletons();
        }

        try {
            var data = await fetchParticipantDashboardData();
            var isRealData = Array.isArray(data.modules) && data.modules.length > 3;

            if (isRealData) {
                _dashboardDataCache = data;
                writeParticipantDashboardCache(data);
                if (window.location.hash === '#/participant-dashboard') renderParticipantDashboard(data);
            } else {
                renderDashboardError(new Error('Data dashboard belum tersedia.'));
            }
        } catch (err) {
            renderDashboardError(err);
        }
    }

    window.__retryDashboard = function() {
        initParticipantDashboardData();
    };

    function resizeImageToBase64(file, maxSize) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var img = new Image();
                img.onload = function() {
                    var canvas = document.createElement('canvas');
                    var size = Math.min(img.width, img.height, maxSize);
                    canvas.width = size;
                    canvas.height = size;
                    var ctx = canvas.getContext('2d');
                    var sx = (img.width - size) / 2;
                    var sy = (img.height - size) / 2;
                    ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);
                    resolve(canvas.toDataURL('image/jpeg', 0.8));
                };
                img.onerror = function() { reject(new Error('Gagal membaca gambar.')); };
                img.src = e.target.result;
            };
            reader.onerror = function() { reject(new Error('Gagal membaca file.')); };
            reader.readAsDataURL(file);
        });
    }

    function updateTopbarAvatar(photoUrl) {
        var avatarSpan = document.querySelector('.fellow-user-button .avatar-img');
        if (!avatarSpan) return;
        if (avatarSpan.tagName === 'IMG') {
            var replacement = document.createElement('span');
            replacement.className = avatarSpan.className;
            replacement.setAttribute('aria-hidden', 'true');
            avatarSpan.replaceWith(replacement);
            avatarSpan = replacement;
        }
        avatarSpan.setAttribute('aria-hidden', 'true');
        avatarSpan.style.backgroundImage = '';
        avatarSpan.style.backgroundSize = '';
        avatarSpan.style.backgroundPosition = '';
        var photo = avatarSpan.querySelector('.avatar-photo');
        if (!photo) {
            photo = document.createElement('img');
            photo.className = 'avatar-photo';
            photo.alt = '';
            photo.setAttribute('aria-hidden', 'true');
            avatarSpan.appendChild(photo);
        }
        if (photoUrl) {
            photo.hidden = false;
            photo.onload = function() { avatarSpan.classList.add('has-photo'); };
            photo.onerror = function() {
                photo.hidden = true;
                photo.removeAttribute('src');
                avatarSpan.classList.remove('has-photo');
            };
            photo.src = photoUrl;
        } else {
            photo.hidden = true;
            photo.removeAttribute('src');
            avatarSpan.classList.remove('has-photo');
        }
    }

    function initSettingsPage() {
        const form = document.getElementById('settingsProfileForm');
        if (!form || form.dataset.settingsReady) return;
        form.dataset.settingsReady = 'true';

        const session = readParticipantSession();
        if (!session?.nik || !session?.token) return;
        const profile = session?.profile || {};

        document.getElementById('settingsName').value = profile.nama_lengkap || '';
        document.getElementById('settingsEmail').value = profile.email || '';
        document.getElementById('settingsWhatsapp').value = profile.whatsapp || '';
        document.getElementById('settingsCvLink').value = profile.cv_link || '';
        document.getElementById('settingsUsername').value = profile.username || '';

        var name = getParticipantDisplayName();
        var avatar = document.querySelector('.settings-page .large-avatar');
        if (avatar) {
            if (profile.photo_url) {
                avatar.src = profile.photo_url;
                avatar.style.objectPosition = 'center';
            } else {
                avatar.src = '/assets/messaging/herai-chat-persona.png';
                avatar.style.objectPosition = 'center 29%';
            }
            avatar.alt = name;
            avatar.onerror = function() {
                avatar.onerror = null;
                avatar.src = '/assets/messaging/herai-chat-persona.png';
                avatar.style.objectPosition = 'center 29%';
            };
        }

        var uploadBtn = document.querySelector('.btn-upload');
        var removeBtn = document.querySelector('.btn-remove');

        // Single hidden file input, reused across re-entries
        var fileInput = document.getElementById('__avatarFileInput');
        if (!fileInput) {
            fileInput = document.createElement('input');
            fileInput.id = '__avatarFileInput';
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);
        }

        // Update remove button visibility based on photo_url
        function updateRemoveVisibility() {
            if (removeBtn) {
                removeBtn.style.display = profile.photo_url ? '' : 'none';
            }
        }
        updateRemoveVisibility();

        if (uploadBtn) {
            uploadBtn.disabled = false;
            uploadBtn.title = '';
            uploadBtn.addEventListener('click', function() {
                if (uploadBtn.classList.contains('btn-confirm')) return;
                fileInput.click();
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', async function() {
                if (!confirm('Hapus foto profil?')) return;
                removeBtn.disabled = true;
                try {
                    var resp = await fetch('/__gas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify({ action: 'removeParticipantPhoto', nik: session.nik, participantToken: session.token })
                    });
                    var r = await resp.json();
                    if (r.status !== 'success') throw new Error(r.message || 'Gagal.');
                    profile.photo_url = '';
                    if (avatar) avatar.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=ffd0e6&color=b01865&size=120';
                    updateRemoveVisibility();
                    updateTopbarAvatar('');
                    var sess2 = readParticipantSession();
                    if (sess2) { sess2.profile = profile; saveParticipantSession(sess2); }
                    window.__aiLabToast && window.__aiLabToast('Foto profil dihapus.', 'info');
                } catch (err) {
                    window.__aiLabToast && window.__aiLabToast(err.message || 'Gagal.', 'error');
                } finally {
                    removeBtn.disabled = false;
                }
            });
        }

        // File select → preview mode (no auto-upload)
        var pendingBase64 = null;
        var previousSrc = null;
        if (!fileInput.dataset.listenerAttached) {
            fileInput.dataset.listenerAttached = 'true';
            fileInput.addEventListener('change', async function() {
                var file = fileInput.files && fileInput.files[0];
                if (!file) return;
                if (!file.type.match(/image\/(jpeg|png|gif|webp)/)) {
                    window.__aiLabToast && window.__aiLabToast('Format tidak didukung. Gunakan JPG, PNG, atau GIF.', 'error');
                    fileInput.value = ''; return;
                }
                if (file.size > 2 * 1024 * 1024) {
                    window.__aiLabToast && window.__aiLabToast('Ukuran maksimal 2MB.', 'error');
                    fileInput.value = ''; return;
                }
                try {
                    previousSrc = avatar ? avatar.src : '';
                    pendingBase64 = await resizeImageToBase64(file, 200);
                    if (avatar) avatar.src = pendingBase64;
                    if (uploadBtn) {
                        uploadBtn.innerHTML = '<i class="fas fa-check"></i> Simpan Foto';
                        uploadBtn.classList.add('btn-confirm');
                    }
                    if (removeBtn) removeBtn.style.display = 'none';
                    var cancelBtn = document.querySelector('.btn-cancel-upload');
                    if (!cancelBtn) {
                        cancelBtn = document.createElement('button');
                        cancelBtn.className = 'btn-cancel-upload';
                        cancelBtn.type = 'button';
                        cancelBtn.innerHTML = '<i class="fas fa-times"></i> Batal';
                        var btnGroup = document.querySelector('.btn-group');
                        if (btnGroup) btnGroup.appendChild(cancelBtn);
                        cancelBtn.addEventListener('click', function() {
                            pendingBase64 = null;
                            if (avatar) avatar.src = previousSrc || ('https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=ffd0e6&color=b01865&size=120');
                            if (uploadBtn) {
                                uploadBtn.innerHTML = '<i class="fas fa-upload"></i> Unggah Foto Baru';
                                uploadBtn.classList.remove('btn-confirm');
                            }
                            if (cancelBtn) cancelBtn.remove();
                            updateRemoveVisibility();
                            fileInput.value = '';
                        });
                    }
                } catch (err) {
                    window.__aiLabToast && window.__aiLabToast('Gagal membaca gambar.', 'error');
                    fileInput.value = '';
                }
            });
        }

        if (uploadBtn) {
            uploadBtn.addEventListener('click', async function(e) {
                if (!uploadBtn.classList.contains('btn-confirm') || !pendingBase64) return;
                e.stopImmediatePropagation();
                uploadBtn.disabled = true;
                uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';

                try {
                    var resp = await fetch('/__gas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify({ action: 'uploadParticipantPhoto', nik: session.nik, participantToken: session.token, photo_base64: pendingBase64 })
                    });
                    if (!resp.ok) throw new Error('Gagal terhubung.');
                    var result = await resp.json();
                    if (result.status !== 'success') throw new Error(result.message || 'Gagal upload.');

                    profile.photo_url = result.photo_url;
                    if (avatar) avatar.src = result.photo_url;
                    updateRemoveVisibility();
                    updateTopbarAvatar(result.photo_url);
                    var sess = readParticipantSession();
                    if (sess) { sess.profile = profile; saveParticipantSession(sess); }
                    pendingBase64 = null;
                    fileInput.value = '';
                    window.__aiLabToast && window.__aiLabToast('Foto profil berhasil disimpan!', 'success');
                } catch (err) {
                    window.__aiLabToast && window.__aiLabToast(err.message || 'Gagal menyimpan.', 'error');
                } finally {
                    uploadBtn.innerHTML = '<i class="fas fa-upload"></i> Unggah Foto Baru';
                    uploadBtn.classList.remove('btn-confirm');
                    uploadBtn.disabled = false;
                    var cb = document.querySelector('.btn-cancel-upload');
                    if (cb) cb.remove();
                    pendingBase64 = null;
                }
            });
        }

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            var btn = form.querySelector('.btn-save');
            if (!btn) return;
            var msg = document.getElementById('settingsProfileMessage');
            var originalText = btn.textContent;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
            if (msg) { msg.style.display = 'none'; }

            try {
                var response = await fetch('/__gas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({
                        action: 'updateParticipantProfile',
                        nik: session.nik,
                        participantToken: session.token,
                        nama_lengkap: document.getElementById('settingsName').value,
                        email: document.getElementById('settingsEmail').value,
                        whatsapp: document.getElementById('settingsWhatsapp').value,
                        cv_link: document.getElementById('settingsCvLink').value,
                        username: document.getElementById('settingsUsername').value
                    })
                });

                if (!response.ok) throw new Error('Gagal terhubung ke server.');

                var result = await response.json();
                if (result.status !== 'success') throw new Error(result.message || 'Gagal menyimpan.');

                var updatedProfile = result.profile || profile;
                updatedProfile.nama_lengkap = document.getElementById('settingsName').value;
                updatedProfile.email = document.getElementById('settingsEmail').value;
                updatedProfile.whatsapp = document.getElementById('settingsWhatsapp').value;
                updatedProfile.cv_link = document.getElementById('settingsCvLink').value;
                updatedProfile.username = document.getElementById('settingsUsername').value;

                saveParticipantSession({
                    ...session,
                    name: updatedProfile.nama_lengkap || session.name,
                    profile: updatedProfile
                });

                updateTopbarAvatar(updatedProfile.photo_url || profile.photo_url);

                // Update topbar name after profile save
                var nameNode = document.querySelector('.fellow-user-button strong');
                var greeting = document.querySelector('[data-fellow-greeting]');
                var newName = updatedProfile.nama_lengkap;
                if (nameNode) nameNode.textContent = newName || 'Peserta';
                if (greeting) greeting.textContent = newName ? 'Halo, ' + newName + '!' : 'Halo, Peserta HerAI!';

                if (msg) {
                    msg.style.display = 'block';
                    msg.className = 'settings-message success';
                    msg.textContent = 'Profil berhasil disimpan.';
                }
            } catch (err) {
                if (msg) {
                    msg.style.display = 'block';
                    msg.className = 'settings-message error';
                    msg.textContent = err.message || 'Gagal menyimpan profil.';
                }
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });

        var cancelBtn = form.querySelector('.btn-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                document.getElementById('settingsName').value = profile.nama_lengkap || '';
                document.getElementById('settingsEmail').value = profile.email || '';
                document.getElementById('settingsWhatsapp').value = profile.whatsapp || '';
                document.getElementById('settingsCvLink').value = profile.cv_link || '';
                document.getElementById('settingsUsername').value = profile.username || '';
                var msg = document.getElementById('settingsProfileMessage');
                if (msg) msg.style.display = 'none';
            });
        }

        var bioField = form.querySelector('.form-group.full-width textarea');
        if (bioField && bioField.closest('.form-group')) {
            bioField.closest('.form-group').querySelector('small').textContent = 'Bio akan tersedia di update berikutnya.';
            bioField.disabled = true;
        }
        var socialHeadings = form.querySelectorAll('.sub-heading');
        socialHeadings.forEach(function(h) { h.textContent += ' (Coming Soon)'; });
        var linkedinInput = document.getElementById('settingsLinkedin');
        var githubInput = document.getElementById('settingsGithub');
        if (linkedinInput) linkedinInput.disabled = true;
        if (githubInput) githubInput.disabled = true;
    }

    function initSettingsTabNav() {
        var nav = document.querySelector('.s-nav-list');
        if (!nav || nav.dataset.tabReady) return;
        nav.dataset.tabReady = 'true';

        var buttons = nav.querySelectorAll('button');
        var contentArea = document.querySelector('.settings-content-area');
        var profileCard = contentArea?.querySelector('.settings-card');

        var placeholderHTML = '<div class="settings-card"><div class="card-header"><h2>{title}</h2></div><div class="card-body"><p style="padding:32px;text-align:center;color:var(--text-muted);">{message}</p></div></div>';

        var placeholders = {
            'Keamanan Akun': null,
            'Preferensi Notifikasi': 'Preferensi notifikasi akan hadir di update berikutnya.',
            'Tampilan & Aksesibilitas': 'Pengaturan tampilan akan hadir di update berikutnya.',
            'Keluar Akun': null
        };

        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                buttons.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');

                var tabName = btn.textContent.trim();
                if (tabName === 'Profil Publik') {
                    if (profileCard) profileCard.style.display = '';
                    var others = contentArea.querySelectorAll('.settings-card:not(:first-child)');
                    others.forEach(function(c) { c.remove(); });
                } else if (tabName === 'Keluar Akun') {
                    clearParticipantDashboardCache();
                    sessionStorage.removeItem(PARTICIPANT_SESSION_KEY);
                    window.location.hash = '#/profile';
                } else if (tabName === 'Keamanan Akun') {
                    if (profileCard) profileCard.style.display = 'none';
                    var others = contentArea.querySelectorAll('.settings-card:not(:first-child)');
                    others.forEach(function(c) { c.remove(); });

                    var tmpl = document.getElementById('passwordChangeTemplate');
                    if (tmpl) {
                        var clone = tmpl.content.cloneNode(true);
                        contentArea.appendChild(clone);
                        initPasswordChangeForm();
                    }
                } else {
                    if (profileCard) profileCard.style.display = 'none';
                    var others = contentArea.querySelectorAll('.settings-card:not(:first-child)');
                    others.forEach(function(c) { c.remove(); });

                    var msg = placeholders[tabName] || 'Fitur ini belum tersedia.';
                    var temp = document.createElement('div');
                    temp.innerHTML = placeholderHTML.replace('{title}', tabName).replace('{message}', msg);
                    contentArea.appendChild(temp.firstElementChild);
                }
            });
        });
    }

    function initPasswordChangeForm() {
        var form = document.getElementById('passwordChangeForm');
        if (!form || form.dataset.ready) return;
        form.dataset.ready = 'true';

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            var session = readParticipantSession();
            if (!session?.nik || !session?.token) {
                var errMsg = document.getElementById('passwordChangeMessage');
                if (errMsg) { errMsg.style.display = 'block'; errMsg.className = 'settings-message error'; errMsg.textContent = 'Sesi tidak ditemukan. Silakan login ulang.'; }
                return;
            }

            var oldPassword = document.getElementById('oldPassword').value;
            var newPassword = document.getElementById('newPassword').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            var msg = document.getElementById('passwordChangeMessage');
            var btn = form.querySelector('button[type="submit"]');
            if (!btn) {
                if (msg) { msg.style.display = 'block'; msg.className = 'settings-message error'; msg.textContent = 'Tombol submit tidak ditemukan.'; }
                return;
            }
            var originalHTML = btn.innerHTML;

            if (!oldPassword) {
                if (msg) { msg.style.display = 'block'; msg.className = 'settings-message error'; msg.textContent = 'Password lama wajib diisi.'; }
                document.getElementById('oldPassword').focus();
                return;
            }
            if (!newPassword) {
                if (msg) { msg.style.display = 'block'; msg.className = 'settings-message error'; msg.textContent = 'Password baru wajib diisi.'; }
                document.getElementById('newPassword').focus();
                return;
            }
            if (oldPassword === newPassword) {
                if (msg) { msg.style.display = 'block'; msg.className = 'settings-message error'; msg.textContent = 'Password baru tidak boleh sama dengan password lama.'; }
                return;
            }
            if (newPassword !== confirmPassword) {
                if (msg) { msg.style.display = 'block'; msg.className = 'settings-message error'; msg.textContent = 'Konfirmasi password baru tidak cocok.'; }
                return;
            }
            if (newPassword.length < 6) {
                if (msg) { msg.style.display = 'block'; msg.className = 'settings-message error'; msg.textContent = 'Password baru minimal 6 karakter.'; }
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengganti...';
            if (msg) msg.style.display = 'none';

            try {
                var response = await fetch('/__gas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({
                        action: 'changeParticipantPassword',
                        nik: session.nik,
                        participantToken: session.token,
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    })
                });

                if (!response.ok) throw new Error('Gagal terhubung ke server.');

                var result = await response.json();
                if (result.status !== 'success') throw new Error(result.message || 'Gagal mengganti password.');

                if (msg) { msg.style.display = 'block'; msg.className = 'settings-message success'; msg.textContent = 'Password berhasil diganti. Gunakan password baru saat login berikutnya.'; }

                form.reset();
            } catch (err) {
                if (msg) { msg.style.display = 'block'; msg.className = 'settings-message error'; msg.textContent = err.message || 'Gagal mengganti password.'; }
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalHTML;
            }
        });
    }

    window.saveChapterProgress = async function(moduleId, chapterId, status, score) {
        var session = readParticipantSession();
        if (!session?.nik || !session?.token) {
            return { status: 'error', message: 'Sesi peserta tidak tersedia. Silakan login ulang.' };
        }
        var controller = new AbortController();
        var timeoutId = setTimeout(function() { controller.abort(); }, PROGRESS_SAVE_TIMEOUT_MS);
        try {
            var response = await fetch('/__gas', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                signal: controller.signal,
                body: JSON.stringify({
                    action: 'saveParticipantProgress',
                    nik: session.nik,
                    participantToken: session.token,
                    module_id: moduleId,
                    chapter_id: chapterId,
                    status: status || 'completed',
                    score: score !== undefined ? score : null
                })
            });
            if (!response.ok) {
                return { status: 'error', message: 'Server belum dapat menyimpan progres.' };
            }
            var result = await response.json();
            if (!result || result.status !== 'success') {
                return { status: 'error', message: result?.message || 'Progres belum tersimpan.' };
            }
            clearParticipantDashboardCache();
            return result;
        } catch (e) {
            return {
                status: 'error',
                message: e?.name === 'AbortError'
                    ? 'Penyimpanan terlalu lama. Coba sinkronkan kembali.'
                    : 'Koneksi terputus. Coba simpan kembali.'
            };
        } finally {
            clearTimeout(timeoutId);
        }
    };

    window.getParticipantProgress = async function(moduleId) {
        var session = readParticipantSession();
        if (!session?.nik || !session?.token) {
            return { status: 'error', message: 'Sesi peserta tidak tersedia. Silakan login ulang.', data: [] };
        }
        var controller = new AbortController();
        var timeoutId = setTimeout(function() { controller.abort(); }, PROGRESS_SAVE_TIMEOUT_MS);
        try {
            var response = await fetch('/__gas', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                signal: controller.signal,
                body: JSON.stringify({
                    action: 'getParticipantProgress',
                    nik: session.nik,
                    participantToken: session.token,
                    module_id: moduleId || ''
                })
            });
            if (!response.ok) {
                return { status: 'error', message: 'Server belum dapat memuat progres.', data: [] };
            }
            var result = await response.json();
            if (!result || result.status !== 'success') {
                return { status: 'error', message: result?.message || 'Progres belum dapat dimuat.', data: [] };
            }
            return { status: 'success', data: Array.isArray(result.data) ? result.data : [] };
        } catch (e) {
            return {
                status: 'error',
                message: e?.name === 'AbortError'
                    ? 'Memuat progres terlalu lama. Coba lagi.'
                    : 'Koneksi terputus. Progres belum dapat dimuat.',
                data: []
            };
        } finally {
            clearTimeout(timeoutId);
        }
    };

    async function requestParticipantExercise(action, moduleId, exerciseId, answers) {
        var session = readParticipantSession();
        if (!session?.nik || !session?.token) {
            return { status: 'error', message: 'Sesi peserta tidak tersedia. Silakan login ulang.' };
        }
        var payload = {
            action: action,
            nik: session.nik,
            participantToken: session.token,
            module_id: moduleId,
            exercise_id: exerciseId || 'practice'
        };
        if (answers !== undefined) payload.answers = answers;
        var controller = new AbortController();
        var timeoutId = setTimeout(function() { controller.abort(); }, PROGRESS_SAVE_TIMEOUT_MS);
        try {
            var response = await fetch('/__gas', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                signal: controller.signal,
                body: JSON.stringify(payload)
            });
            var result = await response.json().catch(function() { return {}; });
            if (!response.ok || !result || result.status !== 'success') {
                return { status: 'error', message: result?.message || 'Server latihan belum dapat diakses.' };
            }
            if (action === 'submitParticipantExercise') {
                clearParticipantDashboardCache();
            }
            return result;
        } catch (error) {
            return {
                status: 'error',
                message: error?.name === 'AbortError'
                    ? 'Penyimpanan latihan terlalu lama. Jawaban lokal tetap aman.'
                    : 'Koneksi terputus. Jawaban lokal tetap aman.'
            };
        } finally {
            clearTimeout(timeoutId);
        }
    }

    window.saveParticipantExerciseDraft = function(moduleId, exerciseId, answers) {
        return requestParticipantExercise('saveParticipantExerciseDraft', moduleId, exerciseId, answers);
    };

    window.submitParticipantExercise = function(moduleId, exerciseId, answers) {
        return requestParticipantExercise('submitParticipantExercise', moduleId, exerciseId, answers);
    };

    window.getParticipantExerciseSubmissions = function(moduleId, exerciseId) {
        return requestParticipantExercise('getParticipantExerciseSubmissions', moduleId, exerciseId);
    };

    window.renderParticipantExerciseReview = function(statusSelector, submission) {
        var statusNode = typeof statusSelector === 'string' ? document.querySelector(statusSelector) : statusSelector;
        if (!statusNode || !submission) return;
        var panel = statusNode.parentElement?.querySelector('[data-participant-exercise-review]');
        if (!panel) {
            panel = document.createElement('div');
            panel.setAttribute('data-participant-exercise-review', '');
            panel.style.cssText = 'margin-top:10px;padding:12px 14px;border:1px solid #eadcf0;border-radius:12px;background:#fff;color:#3c2445;line-height:1.55;';
            statusNode.insertAdjacentElement('afterend', panel);
        }
        panel.replaceChildren();
        var title = document.createElement('strong');
        title.textContent = submission.status === 'reviewed'
            ? 'Sudah direview mentor'
            : (submission.status === 'submitted' ? 'Sudah dikirim untuk review' : 'Draft tersimpan di server');
        panel.appendChild(title);
        if (submission.status === 'reviewed') {
            var score = document.createElement('div');
            score.textContent = 'Nilai: ' + (submission.score == null ? '-' : submission.score + '/100');
            panel.appendChild(score);
            if (submission.feedback) {
                var feedback = document.createElement('div');
                feedback.textContent = 'Feedback: ' + submission.feedback;
                panel.appendChild(feedback);
            }
        }
    };

    window.restoreParticipantExercise = async function(options) {
        options = options || {};
        var result = await window.getParticipantExerciseSubmissions(options.moduleId, options.exerciseId || 'practice');
        if (!result || result.status !== 'success' || !Array.isArray(result.data) || !result.data.length) return null;
        var submission = result.data[0];
        if (typeof options.applyAnswers === 'function') {
            options.applyAnswers(submission.answers || {}, submission);
        } else if (options.form) {
            Object.keys(submission.answers || {}).forEach(function(name) {
                var field = Array.from(options.form.elements || []).find(function(element) { return element.name === name; });
                if (field) field.value = submission.answers[name];
            });
        }
        window.renderParticipantExerciseReview(options.statusSelector, submission);
        if (typeof options.onRestored === 'function') options.onRestored(submission);
        return submission;
    };

    window.noteParticipantExerciseSubmission = function(form, statusSelector, submission) {
        if (!form || !submission) return;
        form.dataset.exerciseSubmissionStatus = submission.status || '';
        var draftButton = form.querySelector('[data-practice-draft]');
        if (draftButton) draftButton.disabled = submission.status === 'submitted' || submission.status === 'reviewed';
        window.renderParticipantExerciseReview(statusSelector, submission);
    };

    window.bindParticipantExerciseForm = function(options) {
        options = options || {};
        var form = options.form;
        if (!form || form.dataset.exerciseSyncBound === 'true') return;
        form.dataset.exerciseSyncBound = 'true';
        var draftButton = form.querySelector('[data-practice-draft]');
        var setMessage = typeof options.setMessage === 'function' ? options.setMessage : function() {};
        var collectAnswers = typeof options.collectAnswers === 'function'
            ? options.collectAnswers
            : function() {
                var answers = {};
                Array.from(form.elements || []).forEach(function(field) {
                    if (field.name) answers[field.name] = String(field.value || '').trim();
                });
                return answers;
            };

        form.addEventListener('click', function(event) {
            if (!event.target.closest('[data-practice-edit]')) return;
            if (form.dataset.exerciseSubmissionStatus !== 'reviewed') return;
            event.preventDefault();
            event.stopImmediatePropagation();
            setMessage('Latihan sudah direview. Hubungi mentor jika perlu revisi.', 'warning');
        }, true);

        if (draftButton) {
            draftButton.addEventListener('click', async function() {
                var answers = collectAnswers();
                if (!Object.keys(answers).some(function(key) { return String(answers[key] || '').trim(); })) {
                    setMessage('Isi minimal satu jawaban sebelum menyimpan draft.', 'warning');
                    return;
                }
                if (typeof options.saveLocal === 'function') options.saveLocal(answers);
                var originalLabel = draftButton.innerHTML;
                draftButton.disabled = true;
                draftButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Menyimpan...';
                setMessage('Menyimpan draft latihan ke server...', 'neutral');
                var result = await window.saveParticipantExerciseDraft(options.moduleId, options.exerciseId || 'practice', answers);
                draftButton.innerHTML = originalLabel;
                if (!result || result.status !== 'success') {
                    draftButton.disabled = false;
                    setMessage('Draft aman di browser, tetapi belum masuk server: ' + (result?.message || 'coba lagi.'), 'error');
                    return;
                }
                window.noteParticipantExerciseSubmission(form, options.statusSelector, result.submission);
                setMessage('Draft latihan tersimpan di server.', 'success');
            });
        }

        window.restoreParticipantExercise({
            form: form,
            moduleId: options.moduleId,
            exerciseId: options.exerciseId || 'practice',
            statusSelector: options.statusSelector,
            applyAnswers: options.applyAnswers,
            onRestored: function(submission) {
                if (typeof options.saveLocal === 'function') options.saveLocal(submission.answers || {});
                window.noteParticipantExerciseSubmission(form, options.statusSelector, submission);
                if (typeof options.setLocked === 'function') {
                    options.setLocked(submission.status === 'submitted' || submission.status === 'reviewed', submission);
                }
                if (typeof options.onRestored === 'function') options.onRestored(submission);
                setMessage(submission.status === 'reviewed'
                    ? 'Latihan sudah direview mentor.'
                    : (submission.status === 'submitted' ? 'Latihan sudah dikirim dan menunggu review mentor.' : 'Draft latihan dipulihkan dari server.'), 'success');
            }
        });
    };

    window.saveParticipantDiscussion = async function(moduleId, discussion) {
        var session = readParticipantSession();
        if (!session?.nik || !session?.token) {
            return { status: 'error', message: 'Sesi peserta tidak tersedia. Silakan login ulang.' };
        }
        var controller = new AbortController();
        var timeoutId = setTimeout(function() { controller.abort(); }, PROGRESS_SAVE_TIMEOUT_MS);
        try {
            var response = await fetch('/__gas', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                signal: controller.signal,
                body: JSON.stringify({
                    action: 'saveParticipantDiscussion',
                    nik: session.nik,
                    participantToken: session.token,
                    module_id: moduleId,
                    discussion_id: discussion?.id || '',
                    prompt: discussion?.prompt || 'Diskusi',
                    text: discussion?.text || '',
                    replies: Array.isArray(discussion?.replies) ? discussion.replies : [],
                    created_at: discussion?.createdAt || ''
                })
            });
            if (!response.ok) {
                return { status: 'error', message: 'Server belum dapat menyimpan diskusi.' };
            }
            var result = await response.json();
            if (!result || result.status !== 'success' || !result.discussion) {
                return { status: 'error', message: result?.message || 'Diskusi belum tersimpan.' };
            }
            return result;
        } catch (e) {
            return {
                status: 'error',
                message: e?.name === 'AbortError'
                    ? 'Penyimpanan diskusi terlalu lama. Respons lokal tetap aman.'
                    : 'Koneksi terputus. Coba kirim kembali.'
            };
        } finally {
            clearTimeout(timeoutId);
        }
    };

    window.getParticipantDiscussions = async function(moduleId) {
        var session = readParticipantSession();
        if (!session?.nik || !session?.token) {
            return { status: 'error', message: 'Sesi peserta tidak tersedia. Silakan login ulang.', data: [] };
        }
        var controller = new AbortController();
        var timeoutId = setTimeout(function() { controller.abort(); }, PROGRESS_SAVE_TIMEOUT_MS);
        try {
            var response = await fetch('/__gas', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                signal: controller.signal,
                body: JSON.stringify({
                    action: 'getParticipantDiscussions',
                    nik: session.nik,
                    participantToken: session.token,
                    module_id: moduleId
                })
            });
            if (!response.ok) {
                return { status: 'error', message: 'Server belum dapat memuat diskusi.', data: [] };
            }
            var result = await response.json();
            if (!result || result.status !== 'success') {
                return { status: 'error', message: result?.message || 'Diskusi belum dapat dimuat.', data: [] };
            }
            return { status: 'success', data: Array.isArray(result.data) ? result.data : [] };
        } catch (e) {
            return {
                status: 'error',
                message: e?.name === 'AbortError'
                    ? 'Memuat diskusi terlalu lama. Respons lokal tetap tersedia.'
                    : 'Koneksi terputus. Diskusi lokal tetap tersedia.',
                data: []
            };
        } finally {
            clearTimeout(timeoutId);
        }
    };

    window.getParticipantPortalSettings = fetchSettings;
    window.saveParticipantPortalSettings = saveSettings;
    window.applyParticipantPortalSettings = applySettings;
    window.initFellowDashboardPage = async function(pageName = 'dashboard') {
        var allowedPages = ['dashboard', 'modules', 'leaderboard', 'settings', 'under-development'];
        if (allowedPages.indexOf(pageName) === -1) {
            renderParticipantRestricted();
            return;
        }

        attachSidebarRail();
        initFellowUserMenu();
        startHeartbeat();
        setActiveFellowNav(pageName);
        const settings = await fetchSettings();
        applySettings(settings, pageName);
        if (pageName === 'dashboard') {
            initParticipantDashboardData();
        }
        if (pageName === 'modules') {
            initModuleInteractions();
            if (currentPath() === '/participant-modules') {
                initParticipantModulesData();
            }
            initGeneratedLessonPage();
            initIntroLessonProgress();
            initPracticeNotes();
            initLessonDiscussion();
            initLessonControls();
            initAiIntroInteractive();
            if (currentPath() === '/participant-ai-fundamentals') {
                initAiFundamentalsSummary();
            }
        }
        if (pageName === 'leaderboard') {
            initParticipantLeaderboardData();
        }
        if (pageName === 'settings') {
            initSettingsPage();
            initSettingsTabNav();
        }
        recordParticipantActivity({
            activity_type: 'page_view',
            module_id: pageName === 'modules' ? 'modules' : pageName,
            lesson_id: currentPath().replace(/^\/participant-/, ''),
            activity: `Membuka ${currentPath()}`
        });
    };

    window.addEventListener('DOMContentLoaded', function() {
        var _origInitMessaging = window.initMessagingPage;
        if (typeof _origInitMessaging === 'function') {
            window.initMessagingPage = async function() {
                var session = readParticipantSession();
                if (session && session.token) {
                    await new Promise(function(r) { setTimeout(r, 0); });
                    var main = document.querySelector('#app-content');
                    if (main) {
                        main.innerHTML = '<section class="fellow-restricted-state"><div><i class="fas fa-shield-halved"></i><h1>Akses Peserta Dibatasi</h1><p>Sementara ini portal peserta hanya membuka <strong>Beranda</strong>, <strong>Modul</strong>, dan <strong>Pengaturan</strong>.</p><a href="#/participant-dashboard"><i class="fas fa-arrow-left"></i> Kembali ke Beranda</a></div></section>';
                    }
                    return;
                }
                await _origInitMessaging();
            };
        }
    });
})();
