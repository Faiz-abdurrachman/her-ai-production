const fs = require('fs');
const path = require('path');
function parseMarkdown(md) {
    const { execSync } = require('child_process');
    try {
        // Use npx marked to parse the markdown correctly
        let html = execSync('npx -y marked', { input: md }).toString();
        
        // Enhance UI Components
        html = html.replace(/<table>/g, '<div class="reasoning-scaffold-table-wrap"><table class="ai-modern-table">');
        html = html.replace(/<\/table>/g, '</table></div>');
        html = html.replace(/<pre>/g, '<div class="reasoning-code-block"><pre>');
        html = html.replace(/<\/pre>/g, '</pre></div>');
        
        return html;
    } catch (e) {
        console.error("Failed to parse markdown", e);
        return md;
    }
}

const mdPath = '/home/faiz/her6/Her-AI/nazril/modul-materi-herai/foundation-core-ai/Modul_Deep_Learning_HerAI.md';
const content = fs.readFileSync(mdPath, 'utf8');

// Parse the frontmatter and intro
const parts = content.split(/\n# Bab /);
const intro = parts[0];
const chaptersRaw = parts.slice(1);

const outDir = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters';
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const chaptersMetadata = [];

chaptersRaw.forEach((chap, idx) => {
    const chapterNum = idx + 1;
    const lines = chap.split('\n');
    const titleLine = lines[0].trim();
    let title = titleLine;
    if (title.includes(' - ')) {
        title = title.split(' - ').slice(1).join(' - ');
    }
    
    let textContent = lines.slice(1).join('\n');
    let mdContent = `# ${title}\n` + textContent;
    
    if (idx === 0 && intro.trim() !== '') {
        // Strip yaml frontmatter from intro
        let cleanIntro = intro.replace(/---\n[\s\S]*?\n---\n/, '').trim();
        mdContent = cleanIntro + '\n\n' + mdContent;
    }
    
    const htmlContent = parseMarkdown(mdContent);
    
    const fileName = `${String(chapterNum).padStart(2, '0')}-topic.html`;
    fs.writeFileSync(path.join(outDir, fileName), htmlContent);
    
    chaptersMetadata.push({
        title: title,
        shortTitle: title.length > 20 ? title.substring(0, 17) + "..." : title,
        duration: "20 menit",
        icon: "fas fa-brain",
        summary: `Materi mengenai ${title}`,
        objectives: ["Memahami konsep dasar", "Mampu mengidentifikasi penggunaan praktis"],
        sourcePath: `/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/chapters/${fileName}`
    });
});

console.log("Generated HTML files in", outDir);

const jsTemplate = `
(function () {
    const STORAGE = {
        chapter: "heraiAiDeepLearningCurrentChapter"
    };

    var activeChapterRequest = 0;

    const CHAPTERS = ${JSON.stringify(chaptersMetadata, null, 4)};

    window.initAiDeepLearningMateri = function() {
        if (!document.getElementById("reasoning-chapter-container")) return;
        
        var listContainer = document.getElementById("reasoning-sidebar-list");
        if (listContainer) {
            var html = "";
            var currentChapter = Number(localStorage.getItem(STORAGE.chapter)) || 1;
            CHAPTERS.forEach(function(chap, idx) {
                var num = idx + 1;
                var icon = num === currentChapter ? "far fa-circle-play" : (num < currentChapter ? "fas fa-circle-check" : "far fa-circle");
                var activeClass = num === currentChapter ? 'class="active"' : (num < currentChapter ? 'class="completed"' : '');
                html += \`<li \${activeClass} data-chapter="\${num}"><span>\${num}</span><a href="javascript:void(0)" onclick="window.loadDeepLearningTopik(\${num})">\${chap.shortTitle}</a><i class="\${icon}"></i></li>\`;
            });
            listContainer.innerHTML = html;
        }
        
        window.loadDeepLearningTopik(Number(localStorage.getItem(STORAGE.chapter)) || 1);
    };

    window.loadDeepLearningTopik = function(chapterNumber) {
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
        
        container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--fellow-muted)"><i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--fellow-pink);margin-bottom:16px"></i><p>Memuat materi...</p></div>';
        
        fetch(module.sourcePath, { cache: "no-store" })
            .then(r => {
                if (!r.ok) throw new Error("Gagal memuat " + module.sourcePath);
                return r.text();
            })
            .then(html => {
                if (requestId !== activeChapterRequest) return;
                container.innerHTML = html;
                
                if (btnPrev) {
                    btnPrev.style.display = chapter > 1 ? "inline-flex" : "none";
                    btnPrev.onclick = function() { window.loadDeepLearningTopik(chapter - 1); };
                }
                if (btnNext) {
                    btnNext.style.display = chapter < total ? "inline-flex" : "none";
                    btnNext.onclick = function() { window.loadDeepLearningTopik(chapter + 1); };
                }
                if (btnFinish) {
                    btnFinish.style.display = chapter === total ? "inline-flex" : "none";
                }
                
                var listContainer = document.getElementById("reasoning-sidebar-list");
                if (listContainer) {
                    var lis = listContainer.querySelectorAll("li");
                    lis.forEach(li => {
                        var num = Number(li.getAttribute("data-chapter"));
                        li.className = num === chapter ? "active" : (num < chapter ? "completed" : "");
                        var icon = li.querySelector("i");
                        if (icon) icon.className = num === chapter ? "far fa-circle-play" : (num < chapter ? "fas fa-circle-check" : "far fa-circle");
                    });
                }
            })
            .catch(err => {
                if (requestId === activeChapterRequest) {
                    container.innerHTML = \`<div style="color:red;padding:20px;">Gagal memuat materi: \${err.message}</div>\`;
                }
            });
    };
})();
`;

fs.writeFileSync('/home/faiz/her6/Her-AI/js/frontend/fellow-dashboard/ai-deep-learning.js', jsTemplate);
console.log("Generated /home/faiz/her6/Her-AI/js/frontend/fellow-dashboard/ai-deep-learning.js");
