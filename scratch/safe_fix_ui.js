const fs = require('fs');
const path = require('path');

const dir = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/lessons/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const hybridFiles = [
    'pixel-anatomy.html',
    'filtering-kernels.html',
    'morphological-transforms.html',
    'image-processing-opencv.html'
];

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // 1. Extract the Title (from <h1>)
    const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1] : 'Computer Vision Lesson';

    // 2. Safely replace only the <header class="lesson-topbar">
    const topbarRegex = /<header class="lesson-topbar">[\s\S]*?<\/header>/;
    
    // We add inline styles to ensure the breadcrumb text displays normally despite any leftover global CSS overrides
    const standardTopbar = `<header class="lesson-topbar" style="display:flex; align-items:center; justify-content:space-between; padding:0 24px; height:68px; border-bottom:1px solid rgba(0,0,0,0.05); background:#fff;">
            <nav class="lesson-breadcrumb" aria-label="Breadcrumb materi" style="display:flex; align-items:center; gap:8px;">
                <a href="#/participant-specialization-computer-vision" style="display:flex; align-items:center; gap:6px; color:#6f7282; text-decoration:none;"><i class="fas fa-arrow-left"></i><span>Computer Vision</span></a>
                <span class="lesson-breadcrumb-separator" style="color:#a0a4b8; font-size:12px;"><i class="fas fa-arrow-right"></i></span>
                <span style="font-weight:600; color:#171827;">${title}</span>
            </nav>
            <div class="fellow-actions" style="display:flex; align-items:center; gap:12px;">
                <label class="fellow-search" style="display:flex; align-items:center; gap:8px; background:#f4f5f8; padding:8px 16px; border-radius:100px;"><i class="fas fa-magnifying-glass" style="color:#6f7282;"></i><input type="search" placeholder="Cari modul, topik, atau materi..." style="border:none; background:transparent; outline:none; font-size:13px; width:200px;"></label>
                <button type="button" class="fellow-icon-button" aria-label="Notifikasi" style="background:#f4f5f8; border:none; width:36px; height:36px; border-radius:50%; position:relative;"><i class="far fa-bell"></i><span style="position:absolute; top:-2px; right:-2px; background:#f63392; color:#fff; font-size:10px; width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">5</span></button>
                <a href="#/participant-profile" class="fellow-user-button" style="display:flex; align-items:center; gap:8px; text-decoration:none; color:#171827;"><span class="avatar-img" style="width:36px; height:36px; background:#e2e8f0; border-radius:50%; display:inline-block;"></span><span style="display:flex; flex-direction:column; line-height:1.2;"><strong>Aisyah Putri</strong><small style="color:#6f7282; font-size:11px;">Peserta</small></span><i class="fas fa-chevron-down" style="color:#6f7282; font-size:12px; margin-left:4px;"></i></a>
            </div>
        </header>`;
    content = content.replace(topbarRegex, standardTopbar);

    // 3. Re-inject the Hybrid UI (Mission Board tabs) into the 4 interactive files
    if (hybridFiles.includes(file)) {
        const tabsRegex = /<div class="lesson-tabs" role="tablist" aria-label="Jenis materi">[\s\S]*?<\/div>/;
        const localTabs = `<div class="lesson-tabs cv-local-tabs" role="tablist" aria-label="Jenis materi">
<a href="javascript:void(0)" class="active" onclick="switchCvLocalTab(this, 'teori')"><i class="fas fa-book-open"></i> Teori</a>
<a href="javascript:void(0)" onclick="switchCvLocalTab(this, 'evaluasi')"><i class="fas fa-laptop-code"></i> Latihan & Kuis</a>
<a href="#/participant-specialization-computer-vision"><i class="fas fa-layer-group"></i> Katalog CV</a>
</div>
<style>
  /* Sembunyikan kuis secara default saat memuat halaman */
  #sec-quiz { display: none; }
</style>
<script>
  if (!window.switchCvLocalTab) {
    window.switchCvLocalTab = function(el, mode) {
      const tabs = document.querySelectorAll('.cv-local-tabs a');
      tabs.forEach(t => t.classList.remove('active'));
      el.classList.add('active');

      const teoriSecs = document.querySelectorAll('.lesson-sec:not(#sec-quiz)');
      const evalSec = document.getElementById('sec-quiz');

      if (mode === 'teori') {
        teoriSecs.forEach(s => s.style.display = 'block');
        if (evalSec) evalSec.style.display = 'none';
      } else {
        teoriSecs.forEach(s => s.style.display = 'none');
        if (evalSec) evalSec.style.display = 'block';
        window.dispatchEvent(new Event('resize'));
      }
    };
  }
</script>`;
        content = content.replace(tabsRegex, localTabs);
    }

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Processed securely: ${file}`);
});
