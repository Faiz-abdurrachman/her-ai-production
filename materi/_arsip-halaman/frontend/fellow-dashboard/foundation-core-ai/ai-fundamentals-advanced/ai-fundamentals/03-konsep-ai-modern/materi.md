# materi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/materi.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

**

Memuat kurikulum AI Modern...

** Topik Sebelumnya

Topik Selanjutnya **

[Lanjut ke Latihan AI Modern **](#/participant-ai-modern-practice)

## Lampiran Sumber HTML Lengkap

````html
<section class="fellow-dashboard fellow-modules-page lesson-detail-page reasoning-scaffold-page ai-modern-page" data-fellow-page="modules">
    <button class="fellow-menu-toggle" type="button" aria-label="Buka navigasi peserta" aria-expanded="false">
        <i class="fas fa-bars"></i>
    </button>
    <div class="fellow-sidebar-scrim" aria-hidden="true"></div>
    <aside class="fellow-sidebar" aria-label="Navigasi peserta">
        <a href="#/participant-dashboard" class="fellow-logo" aria-label="Buka sidebar peserta">
            <img src="/assets/branding/logo-her-ai-transparent.png" alt="HerAI Fellowship">
        </a>
        <nav class="fellow-menu">
            <a href="#/participant-dashboard" data-fellow-nav="dashboard"><i class="fas fa-house"></i><span>Beranda</span></a>
            <a href="#/messaging" data-fellow-nav="chatroom"><i class="far fa-comment-dots"></i><span>Chatroom</span><strong>3</strong></a>
            <a href="#/participant-mentor" data-fellow-nav="mentor"><i class="fas fa-user-group"></i><span>Mentor</span></a>
            <a class="active" href="#/participant-modules" data-fellow-nav="modules"><i class="fas fa-book-open"></i><span>Modul</span></a>
            <a href="#/participant-tasks" data-fellow-nav="tasks"><i class="fas fa-list-check"></i><span>Tugas</span></a>
            <a href="#/participant-projects" data-fellow-nav="projects"><i class="far fa-folder-open"></i><span>Proyek</span></a>
            <a href="#/participant-events" data-fellow-nav="events"><i class="far fa-calendar-days"></i><span>Events</span></a>
            <a href="#/participant-community" data-fellow-nav="community"><i class="fas fa-users"></i><span>Komunitas</span></a>
        </nav>
        <nav class="fellow-menu secondary">
            <a href="#/participant-certificates" data-fellow-nav="certificates"><i class="fas fa-certificate"></i><span>Sertifikat</span></a>
            <a href="#/participant-leaderboard" data-fellow-nav="leaderboard"><i class="fas fa-ranking-star"></i><span>Leaderboard</span></a>
            <a href="#/participant-help" data-fellow-nav="faq"><i class="far fa-circle-question"></i><span>FAQ & Bantuan</span></a>
            <a href="#/participant-settings" data-fellow-nav="settings"><i class="fas fa-gear"></i><span>Pengaturan</span></a>
        </nav>
        <div class="invite-card course-help-mini">
            <div>
                <strong>Butuh bantuan?</strong>
                <p>Tanya HerAI Assistant tentang modul dan pembelajaran.</p>
            </div>
            <button type="button">Chat Sekarang</button>
        </div>
    </aside>

    <main class="fellow-main">
        <header class="lesson-topbar">
            <nav class="lesson-breadcrumb" aria-label="Breadcrumb materi">
                <a href="#/participant-ai-fundamentals"><i class="fas fa-arrow-left"></i><span>AI Fundamentals</span></a>
                <span class="lesson-breadcrumb-separator"><i class="fas fa-arrow-right"></i></span>
                <span>Konsep AI Modern</span>
            </nav>
            <div class="fellow-actions">
                <label class="fellow-search">
                    <i class="fas fa-magnifying-glass"></i>
                    <input type="search" placeholder="Cari modul, topik, atau materi...">
                </label>
                <button type="button" class="fellow-icon-button" aria-label="Notifikasi">
                    <i class="far fa-bell"></i>
                    <span>5</span>
                </button>
                <a href="#/participant-profile" class="fellow-user-button">
                    <span class="avatar-img"></span>
                    <span><strong>Aisyah Putri</strong><small>Peserta</small></span>
                    <i class="fas fa-chevron-down"></i>
                </a>
            </div>
        </header>

        <div class="lesson-layout">
            <div class="lesson-main-content">
                <section class="lesson-hero">
                    <div class="lesson-hero-copy">
                        <h1>Konsep AI Modern</h1>
                        <p>Foundation model, Transformer, AI agents, dan arsitektur sistem AI modern yang aman dipakai di produk nyata.</p>
                        <div class="lesson-meta-row">
                            <span><i class="far fa-clock"></i> 60 menit</span>
                            <span><i class="fas fa-book-open"></i> Modul 3 dari 6</span>
                            <b>Menengah</b>
                        </div>
                    </div>
                    <img src="/assets/messaging/herai-chat-persona.png" alt="HerAI fellow belajar Konsep AI Modern">
                </section>

                <section class="lesson-material-panel">
                    <div class="lesson-tabs" role="tablist" aria-label="Jenis materi">
                        <a href="#/participant-ai-modern" class="active"><i class="fas fa-book-open"></i> Materi</a>
                        <a href="#/participant-ai-modern-practice"><i class="fas fa-pen-to-square"></i> Latihan</a>
                        <a href="#/participant-ai-modern-quiz"><i class="far fa-clipboard"></i> Kuis</a>
                        <a href="#/participant-ai-modern-discussion"><i class="far fa-message"></i> Diskusi</a>
                    </div>

                    <article class="lesson-article" id="materi-ai-modern">
                        <div id="modern-chapter-container">
                            <div style="text-align: center; padding: 60px; color: var(--fellow-muted);">
                                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--fellow-pink); margin-bottom: 16px;"></i>
                                <p>Memuat kurikulum AI Modern...</p>
                            </div>
                        </div>

                        <div id="chapter-pagination" class="ai-modern-pagination">
                            <button id="btn-prev-chapter" class="btn btn-outline" hidden>
                                <i class="fas fa-arrow-left"></i> Topik Sebelumnya
                            </button>
                            <button id="btn-next-chapter" class="btn btn-primary" hidden>
                                Topik Selanjutnya <i class="fas fa-arrow-right"></i>
                            </button>
                            <a href="#/participant-ai-modern-practice" id="btn-finish-materi" class="btn btn-primary" hidden>
                                Lanjut ke Latihan AI Modern <i class="fas fa-play"></i>
                            </a>
                        </div>
                    </article>


                </section>
            </div>

            <aside class="lesson-right-panel">
                <section class="module-side-card lesson-progress-card">
                    <h2>Progres Sub-Modul</h2>
                    <div class="lesson-progress-mini"><b style="--value:0%"></b><strong>0%</strong></div>
                    <p>0 dari 4 materi selesai</p>
                    <a href="#/participant-ai-modern">Mulai Belajar</a>
                </section>

                <section class="module-side-card lesson-list-card">
                    <h2>Daftar Materi</h2>
                    <ol id="modern-sidebar-list">
                        <li class="active" data-chapter="1"><span>1</span><button type="button" data-load-modern="1">Foundation Models</button><i class="far fa-circle-play"></i></li>
                        <li data-chapter="2"><span>2</span><button type="button" data-load-modern="2">Transformer</button><i class="far fa-circle"></i></li>
                        <li data-chapter="3"><span>3</span><button type="button" data-load-modern="3">AI Agents</button><i class="far fa-circle"></i></li>
                        <li data-chapter="4"><span>4</span><button type="button" data-load-modern="4">Sistem AI Masa Kini</button><i class="far fa-circle"></i></li>
                    </ol>
                </section>

                <section class="module-side-card lesson-note-card lesson-compact-note">
                    <div class="module-side-head">
                        <h2>Catatan</h2>
                        <button type="button">+ Tambah</button>
                    </div>
                    <p>Catat poin penting materi ini agar mudah diingat.</p>
                </section>
            </aside>
        </div>
    </main>
</section>

````
