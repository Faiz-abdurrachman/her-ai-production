# Outline awal

> Sumber: `pages/frontend/fellow-dashboard/course-placeholder.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

**

**Scaffold siap diisi tim konten**

Halaman ini sengaja dibuat sederhana sebagai titik awal. Saat course siap, ganti route ini ke file course final atau lanjutkan dari scaffold ini.

Draft module/chapter

#### Outline awal

** **Materi**

Isi konsep utama, contoh nyata, dan checkpoint pemahaman.

** **Latihan**

Tambahkan skenario praktik yang relevan dengan course.

** **Kuis**

Siapkan evaluasi singkat dengan pembahasan setelah submit.

** **Diskusi**

Buka ruang tanya jawab agar peserta bisa mengunci pemahaman.

[** Kembali ke Course Catalog](#/participant-modules) [Diskusi dengan Tim **](#/participant-community)

## Lampiran Sumber HTML Lengkap

````html
<section class="fellow-dashboard fellow-modules-page lesson-detail-page course-scaffold-page" data-fellow-page="modules">
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
                <p>Tanya HerAI Assistant tentang course dan pembelajaran.</p>
            </div>
            <button type="button">Chat Sekarang</button>
        </div>
    </aside>

    <main class="fellow-main">
        <header class="lesson-topbar">
            <nav class="lesson-breadcrumb" aria-label="Breadcrumb course">
                <a href="#/participant-modules"><i class="fas fa-arrow-left"></i><span>Course Catalog</span></a>
                <span class="lesson-breadcrumb-separator"><i class="fas fa-arrow-right"></i></span>
                <span data-course-scaffold-title>Course</span>
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
                <section class="lesson-hero course-scaffold-hero">
                    <div class="lesson-hero-copy">
                        <span class="course-scaffold-eyebrow"><i data-course-scaffold-icon class="fas fa-layer-group"></i> <span data-course-scaffold-category>Course</span></span>
                        <h1 data-course-scaffold-heading>Course sedang disiapkan</h1>
                        <p data-course-scaffold-summary>Tim HerAI sedang menyiapkan outline pembelajaran ini.</p>
                        <div class="lesson-meta-row">
                            <span><i class="far fa-clock"></i> <b data-course-scaffold-duration>Draft outline</b></span>
                            <span><i class="fas fa-list-check"></i> <b data-course-scaffold-count>0</b> <span data-course-scaffold-unit>topik awal</span></span>
                            <span data-course-scaffold-level-wrap hidden><i class="fas fa-signal"></i> <b data-course-scaffold-level>Level</b></span>
                            <b data-course-scaffold-status>Scaffold</b>
                        </div>
                    </div>
                    <div class="course-scaffold-visual" aria-hidden="true">
                        <i data-course-scaffold-visual-icon class="fas fa-layer-group"></i>
                    </div>
                </section>

                <section class="lesson-material-panel">
                    <div class="lesson-tabs" role="tablist" aria-label="Jenis materi">
                        <a href="#/participant-modules" class="active" data-course-scaffold-tab="materi"><i class="fas fa-book-open"></i> Materi</a>
                        <a href="#/participant-modules" data-course-scaffold-tab="latihan"><i class="fas fa-pen-to-square"></i> Latihan</a>
                        <a href="#/participant-modules" data-course-scaffold-tab="kuis"><i class="far fa-clipboard"></i> Kuis</a>
                        <a href="#/participant-modules" data-course-scaffold-tab="diskusi"><i class="far fa-message"></i> Diskusi</a>
                    </div>

                    <article class="lesson-article course-scaffold-content">
                        <div class="course-scaffold-note">
                            <i class="fas fa-screwdriver-wrench"></i>
                            <div>
                                <strong data-course-scaffold-activity-title>Scaffold siap diisi tim konten</strong>
                                <p data-course-scaffold-activity-copy>Halaman ini sengaja dibuat sederhana sebagai titik awal. Saat course siap, ganti route ini ke file course final atau lanjutkan dari scaffold ini.</p>
                            </div>
                        </div>

                        <div class="course-scaffold-section">
                            <div>
                                <span data-course-scaffold-section-label>Draft module/chapter</span>
                                <h2 data-course-scaffold-section-title>Outline awal</h2>
                            </div>
                            <ol data-course-scaffold-modules></ol>
                            <div class="reasoning-scaffold-rich" data-course-scaffold-rich-content hidden></div>
                        </div>

                        <div class="course-scaffold-grid">
                            <article>
                                <i class="fas fa-book-open"></i>
                                <strong>Materi</strong>
                                <p>Isi konsep utama, contoh nyata, dan checkpoint pemahaman.</p>
                            </article>
                            <article>
                                <i class="fas fa-pen-to-square"></i>
                                <strong>Latihan</strong>
                                <p>Tambahkan skenario praktik yang relevan dengan course.</p>
                            </article>
                            <article>
                                <i class="far fa-clipboard"></i>
                                <strong>Kuis</strong>
                                <p>Siapkan evaluasi singkat dengan pembahasan setelah submit.</p>
                            </article>
                            <article>
                                <i class="far fa-message"></i>
                                <strong>Diskusi</strong>
                                <p>Buka ruang tanya jawab agar peserta bisa mengunci pemahaman.</p>
                            </article>
                        </div>

                        <footer class="lesson-nav-footer">
                            <a href="#/participant-modules"><i class="fas fa-chevron-left"></i> Kembali ke Course Catalog</a>
                            <a href="#/participant-community">Diskusi dengan Tim <i class="fas fa-arrow-right"></i></a>
                        </footer>
                    </article>
                </section>
            </div>

            <aside class="lesson-right-panel">
                <section class="module-side-card lesson-progress-card">
                    <h2 data-course-scaffold-progress-title>Status Course</h2>
                    <div class="lesson-progress-mini"><b style="--value:12%"></b><strong>12%</strong></div>
                    <p data-course-scaffold-progress-copy>Scaffold sudah tersedia. Konten lengkap belum aktif.</p>
                    <a href="#/participant-modules">Lihat Catalog</a>
                </section>

                <section class="module-side-card lesson-list-card">
                    <h2>Checklist Tim</h2>
                    <ol>
                        <li class="completed"><span>1</span><a href="#/participant-modules">Route scaffold</a><i class="fas fa-circle-check"></i></li>
                        <li class="active"><span>2</span><a href="#/participant-modules">Outline awal</a><i class="far fa-circle-play"></i></li>
                        <li><span>3</span><a href="#/participant-modules">Konten final</a><i class="far fa-circle"></i></li>
                        <li><span>4</span><a href="#/participant-modules">Latihan & kuis</a><i class="far fa-circle"></i></li>
                    </ol>
                </section>
            </aside>
        </div>
    </main>
</section>

````
