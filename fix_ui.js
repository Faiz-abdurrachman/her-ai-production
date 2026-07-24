const fs = require('fs');
const path = require('path');

const dir = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/lessons/';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // 1. Extract the Title (from <h1>)
    const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1] : 'Computer Vision Lesson';

    // 2. Replace the entire <header class="lesson-topbar">
    const topbarRegex = /<header class="lesson-topbar">[\s\S]*?<\/header>/;
    const standardTopbar = `<header class="lesson-topbar">
            <nav class="lesson-breadcrumb" aria-label="Breadcrumb materi">
                <a href="#/participant-specialization-computer-vision"><i class="fas fa-arrow-left"></i><span>Computer Vision</span></a>
                <span class="lesson-breadcrumb-separator"><i class="fas fa-arrow-right"></i></span>
                <span>${title}</span>
            </nav>
            <div class="fellow-actions">
                <label class="fellow-search"><i class="fas fa-magnifying-glass"></i><input type="search" placeholder="Cari modul, topik, atau materi..."></label>
                <button type="button" class="fellow-icon-button" aria-label="Notifikasi"><i class="far fa-bell"></i><span>5</span></button>
                <a href="#/participant-profile" class="fellow-user-button"><span class="avatar-img"></span><span><strong>Aisyah Putri</strong><small>Peserta</small></span><i class="fas fa-chevron-down"></i></a>
            </div>
        </header>`;
    content = content.replace(topbarRegex, standardTopbar);

    // 3. Replace the entire <aside class="lesson-right-panel">
    const asideRegex = /<aside class="lesson-right-panel">[\s\S]*?<\/aside>/;
    const standardAside = `<aside class="lesson-right-panel">
                <section class="module-side-card lesson-progress-card">
                    <h2>Progres Modul CV</h2>
                    <div class="lesson-progress-mini"><b style="--value:75%"></b><strong>75%</strong></div>
                    <p>8 dari 11 materi selesai</p>
                    <a href="#/participant-specialization-computer-vision-quiz">Lanjut Kuis</a>
                </section>
                <section class="module-side-card lesson-list-card">
                    <h2>Flow Belajar</h2>
                    <ol>
                        <li class="completed"><span>1</span><a href="#/participant-specialization-computer-vision">Materi</a><i class="fas fa-circle-check"></i></li>
                        <li class="active"><span>2</span><a href="javascript:void(0)">Materi Saat Ini</a><i class="far fa-circle-play"></i></li>
                        <li><span>3</span><a href="#/participant-specialization-computer-vision-practice">Latihan</a><i class="far fa-circle"></i></li>
                        <li><span>4</span><a href="#/participant-specialization-computer-vision-quiz">Kuis</a><i class="far fa-circle"></i></li>
                    </ol>
                </section>
            </aside>`;
    content = content.replace(asideRegex, standardAside);

    // 4. Strip out layout-specific CSS from the <style> block using regex
    // We want to remove any block like: .something-page .lesson-topbar { ... }
    const classPrefixMatch = content.match(/\.(.*?)-page\s*\{/);
    if (classPrefixMatch) {
        const prefix = classPrefixMatch[1]; // e.g. "pixel-anatomy"
        
        // Remove background overrides on the main wrapper
        content = content.replace(new RegExp(`\\.${prefix}-page\\s*\\{[\\s\\S]*?\\}`, 'g'), `.${prefix}-page {\n    /* Default standard bg */\n  }`);

        // Remove topbar CSS
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-topbar(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-topbar-inner(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.navbar-left(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.navbar-center(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.navbar-right(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lt-left(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lt-center(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lt-right(?:[\\s\\S]*?\\})`, 'g'), '');
        
        // Remove breadcrumb and actions
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-breadcrumb(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.fellow-actions(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.fellow-search(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.fellow-icon-button(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.fellow-user-button(?:[\\s\\S]*?\\})`, 'g'), '');
        
        // Remove hero CSS
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-hero(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-hero-copy(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-meta-row(?:[\\s\\S]*?\\})`, 'g'), '');
        
        // Remove layout CSS
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-layout(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-main-content(?:[\\s\\S]*?\\})`, 'g'), '');
        
        // Remove right panel CSS
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-right-panel(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-progress-card(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-list-card(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lpc-[a-zA-Z0-9_-]+(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lli-[a-zA-Z0-9_-]+(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-list-item(?:[\\s\\S]*?\\})`, 'g'), '');
        
        // Remove tabs CSS
        content = content.replace(new RegExp(`\\.${prefix}-page \\.lesson-tabs(?:[\\s\\S]*?\\})`, 'g'), '');
        content = content.replace(new RegExp(`\\.${prefix}-page \\.cv-local-tabs(?:[\\s\\S]*?\\})`, 'g'), '');
        
        // Remove extra whitespace caused by deletions
        content = content.replace(/\n\s*\n/g, '\n\n');
    }

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Processed ${file}`);
});
