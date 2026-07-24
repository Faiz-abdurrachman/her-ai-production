const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function stripMarkdown(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '$1')
               .replace(/\*(.*?)\*/g, '$1')
               .replace(/`(.*?)`/g, '$1')
               .trim();
}

function escapeHtml(text) {
    if (!text) return "";
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function parseMarkdownToHtml(md) {
    try {
        let html = execSync('npx -y marked', { input: md }).toString();
        html = html.replace(/<table>/g, '<div class="reasoning-scaffold-table-wrap"><table class="ai-modern-table">');
        html = html.replace(/<\/table>/g, '</table></div>');
        html = html.replace(/<pre>/g, '<div class="reasoning-code-block"><pre>');
        html = html.replace(/<\/pre>/g, '</pre></div>');

        // UI Enhancement: Wrap H2 sections in beautiful Topic Cards
        let sections = html.split('<h2');
        let topicIndex = 0;
        for (let i = 1; i < sections.length; i++) {
            topicIndex++;
            let numStr = String(topicIndex).padStart(2, '0');
            // Extract the actual H2 content just in case we need it, though here we just inject a label above it
            sections[i] = `
<div class="ai-modern-topic-card" style="background: var(--fellow-white); border: 1px solid var(--fellow-border); border-radius: 16px; padding: 24px; margin: 32px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); position: relative; overflow: hidden; transition: transform 0.2s ease, box-shadow 0.2s ease;">` +
                          `
<div class="topic-label" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(216, 27, 96, 0.1); color: var(--fellow-pink); font-size: 0.85rem; font-weight: 700; padding: 6px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;"><i class="fas fa-bookmark"></i> Topik ${numStr}</div>
` +
                          '<h2 style="margin-top: 0; color: var(--fellow-black); font-size: 1.5rem; border-bottom: none; padding-bottom: 0;"' + sections[i] + `
</div>`;
        }
        html = sections.join('');

        return html;
    } catch (e) {
        console.error("Failed to parse markdown", e);
        return md;
    }
}

function buildModule(mdPath, baseId, categoryFolder, moduleFolder) {
    const content = fs.readFileSync(mdPath, 'utf8');
    
    // 1. Generate HTML Chapters
    const parts = content.split(/\n# Bab /);
    const intro = parts[0];
    const chaptersRaw = parts.slice(1);
    
    const chaptersDir = path.join(__dirname, '../../pages/frontend/fellow-dashboard', categoryFolder, moduleFolder, 'chapters');
    fs.mkdirSync(chaptersDir, { recursive: true });
    
    const chaptersMetadata = [];
    chaptersRaw.forEach((chap, idx) => {
        const chapterNum = idx + 1;
        const lines = chap.split('\n');
        let title = lines[0].trim();
        if (title.includes(' - ')) title = title.split(' - ').slice(1).join(' - ');
        
        let textContent = lines.slice(1).join('\n');
        
        // Strip Latihan section from the main materi text
        textContent = textContent.replace(/## Latihan[\s\S]*?(?=\n## |$)/, '').trim();

        let mdContent = `# ${title}\n` + textContent;
        if (idx === 0 && intro.trim() !== '') {
            let cleanIntro = intro.replace(/---\n[\s\S]*?\n---\n/, '').trim();
            mdContent = cleanIntro + '\n\n' + mdContent;
        }
        
        const htmlContent = parseMarkdownToHtml(mdContent);
        const fileName = `${String(chapterNum).padStart(2, '0')}-topic.html`;
        fs.writeFileSync(path.join(chaptersDir, fileName), htmlContent);
        
        chaptersMetadata.push({
            title: title,
            shortTitle: title.length > 20 ? title.substring(0, 17) + "..." : title,
            duration: "20 menit",
            icon: "fas fa-brain",
            summary: `Materi mengenai ${title}`,
            objectives: ["Memahami konsep dasar", "Mampu mengidentifikasi penggunaan praktis"],
            sourcePath: `/pages/frontend/fellow-dashboard/${categoryFolder}/${moduleFolder}/chapters/${fileName}`
        });
    });
    
    // 2. Extract Practices and Quiz
    const practices = [];
    const quiz = [];
    chaptersRaw.forEach((chap, idx) => {
        const practiceMatch = chap.match(/## (Latihan[^\n]*)\n([\s\S]*?)(?=\n## |$)/);
        if (practiceMatch) {
            let title = practiceMatch[1].trim();
            let promptText = practiceMatch[2].trim();
            
            // Extract Hint/Pembahasan if exists
            let guideText = "Tuliskan hasil analisis Anda.";
            const pembahasanMatch = promptText.match(/\*\*Pembahasan:\*\*\s*([\s\S]*)$/i);
            if (pembahasanMatch) {
                guideText = pembahasanMatch[1].trim();
                promptText = promptText.replace(/\*\*Pembahasan:\*\*\s*([\s\S]*)$/i, '').trim();
            }

            let paragraphs = promptText.split(/\n\n+/).map(p => p.trim()).filter(p => p && p !== '---');
            paragraphs = paragraphs.map(p => p.replace(/<[^>]+>/g, '')); // strip HTML
            if (paragraphs.length > 0) {
                practices.push({
                    id: "PRACTICE-" + (idx + 1),
                    title: title,
                    prompt: paragraphs.join('\n\n'),
                    fields: [["step", "Langkah Pengerjaan"]],
                    guide: guideText
                });
            }
        }
        
        if (chap.toLowerCase().includes("kuis akhir")) {
            const questionBlocks = chap.split(/\n(\d+)\.\s+/).slice(1);
            for (let i = 0; i < questionBlocks.length; i += 2) {
                const lines = questionBlocks[i+1].split('\n');
                let questionText = lines[0].trim();
                let options = [];
                for (let j = 1; j < lines.length; j++) {
                    const line = lines[j].trim();
                    if (line.match(/^- [A-E]\.\s/)) {
                        options.push(stripMarkdown(line.replace(/^- [A-E]\.\s/, '').trim()));
                    } else if (line.length > 0 && !line.startsWith('-') && options.length === 0) {
                        questionText += " " + line;
                    }
                }
                if (options.length > 0) {
                    quiz.push([stripMarkdown(questionText), options, 0, "Penjelasan belum tersedia."]);
                }
            }
        }
    });
    
    if (practices.length === 0) practices.push({ id: "P-1", prompt: "Latihan belum tersedia.", fields:[["step", "Langkah"]], guide:"" });
    if (quiz.length === 0) quiz.push(["Kuis belum tersedia", ["Benar", "Salah"], 0, ""]);
    
    // 3. Clone JS Logic
    const pyJsPath = path.join(__dirname, '../../js/frontend/fellow-dashboard/ai-python.js');
    let newContent = fs.readFileSync(pyJsPath, 'utf8');
    
    const camelBase = baseId.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(''); // e.g. AiReinforcementLearning
    const camelLower = camelBase.charAt(0).toLowerCase() + camelBase.slice(1); // e.g. aiReinforcementLearning
    
    
    newContent = newContent.replace(/aiPython/g, camelLower);
    newContent = newContent.replace(/AiPython/g, camelBase);
    newContent = newContent.replace(/python-task-controls/g, `${baseId.replace('ai-', '')}-task-controls`);
    newContent = newContent.replace(/ai-python-page/g, `${baseId}-page`);
    newContent = newContent.replace(/loadSourceSegment\([^,]+,\s*"([^"]+)"[^;]+;/g, 'const refNode = document.getElementById("$1"); if(refNode) refNode.innerHTML = "<div style=\'padding: 20px; text-align: center; color: var(--text-secondary);\'>Baca ulang materi secara utuh di tab Materi utama.</div>";');
    newContent = newContent.replace(/"heraiAiPythonCurrentChapter"/g, `"herai${camelBase}CurrentChapter"`);
    newContent = newContent.replace(/loadPythonTopik/g, `load${camelBase}Chapter`);
    
    newContent = newContent.replace(/const CHAPTERS = \[[\s\S]*?\];\n/, `const CHAPTERS = ${JSON.stringify(chaptersMetadata, null, 4)};\n`);
    newContent = newContent.replace(/var PRACTICE_TOPICS = \[[\s\S]*?\];/m, `var PRACTICE_TOPICS = [ { start: 0, end: ${practices.length-1}, label: "Latihan Modul" } ];`);
    newContent = newContent.replace(/const PRACTICES = \[[\s\S]*?\];/m, `const PRACTICES = ${JSON.stringify(practices, null, 4)};`);
    newContent = newContent.replace(/const QUIZ = \[[\s\S]*?\];/m, `const QUIZ = ${JSON.stringify(quiz, null, 4)};`);

    // Append cleanup code to remove Python's interactive elements
    newContent += `\n// Mencegah elemen interaktif Python (Glossary, Kuis, dll) bocor ke modul lain\nPYTHON_GUIDES.length = 0;\nDISCUSSION_PROMPTS.length = 0;\nSOURCE_VISUALS = {};\n`;
    
    // Fix JS Bugs: Kuis Label & Discussion Content
    newContent = newContent.replace(/<small>Python untuk AI<\/small>/g, '<small>Evaluasi Modul</small>');
    
    const oldPrompts = `    const DISCUSSION_PROMPTS = [
        "Mengapa Python dominan dalam AI meskipun bukan selalu bahasa dengan runtime tercepat?",
        "Kapan notebook membantu eksplorasi, dan kapan hidden state membuat hasil sulit dipercaya?",
        "Apakah menghapus missing value selalu benar? Bukti apa yang diperlukan sebelum memilih aturan cleaning?",
        "Dataset tanpa missing value apakah otomatis siap untuk Machine Learning?"
    ];`;
    const newPrompts = `    const DISCUSSION_PROMPTS = [
        "Bagaimana penerapan konsep ini dapat memecahkan masalah di industri Anda?",
        "Apa saja tantangan atau risiko terbesar saat mengimplementasikan teori ini di dunia nyata?",
        "Menurut Anda, bagaimana etika dan bias dapat memengaruhi keputusan yang diambil berdasarkan model ini?",
        "Bagikan pengalaman atau kesulitan Anda saat mempraktikkan materi ini."
    ];`;
    const oldLabels = `const labels = ["Python dan AI", "Notebook vs Program", "Keputusan Cleaning", "Siap untuk ML"];`;
    const newLabels = `const labels = ["Ide & Penerapan", "Risiko & Tantangan", "Etika & Bias", "Berbagi Pengalaman"];`;
    const oldIcons = `const icons = ["fab fa-python", "fas fa-book-open", "fas fa-broom", "fas fa-database"];`;
    const newIcons = `const icons = ["fas fa-lightbulb", "fas fa-triangle-exclamation", "fas fa-balance-scale", "fas fa-users"];`;
    
    newContent = newContent.replace(oldPrompts, newPrompts);
    newContent = newContent.replace(oldLabels, newLabels);
    newContent = newContent.replace(oldIcons, newIcons);
    
    const jsOutPath = path.join(__dirname, '../../js/frontend/fellow-dashboard', `${baseId}.js`);
    fs.writeFileSync(jsOutPath, newContent);
    console.log(`Generated JS: ${jsOutPath}`);
    
    // 4. Generate HTML Shell Pages
    
    // Generate the sidebar list dynamically from chapters
    const sidebarListHtml = chaptersMetadata.map((chap, i) => {
        const isActive = i === 0 ? 'class="active" ' : '';
        const icon = i === 0 ? 'far fa-circle-play' : 'far fa-circle';
        return `                        <li ${isActive}data-chapter="${i+1}"><span>${i+1}</span><a href="javascript:void(0)" onclick="window.load${camelBase}Chapter(${i+1})">${escapeHtml(chap.shortTitle)}</a><i class="${icon}"></i></li>`;
    }).join('\n');
    
    // Determine the module title from the first line of the markdown
    // Extract Title: Check for 'title:' in front matter, else find first '#', else use baseId
    let moduleTitleRaw = baseId;
    const lines = content.split('\n');
    const titleMatch = content.match(/title:\s*(.*)/);
    if (titleMatch) {
        moduleTitleRaw = titleMatch[1].trim();
    } else {
        const firstHeader = lines.find(line => line.trim().startsWith('# '));
        if (firstHeader) {
            moduleTitleRaw = firstHeader.replace(/#/g, '').trim();
        }
    }
    const moduleTitle = escapeHtml(moduleTitleRaw);

    ['materi', 'latihan', 'kuis', 'diskusi'].forEach(page => {
        const pyHtmlPath = path.join(__dirname, `../../pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/${page}.html`);
        let newHtml = fs.readFileSync(pyHtmlPath, 'utf8');
        
        // Classes and IDs
        newHtml = newHtml.replace(/ai-python-page/g, `${baseId}-page ai-python-page`);
        newHtml = newHtml.replace(/<small>Python untuk AI<\/small>/g, `<small>${moduleTitle}</small>`);
        newHtml = newHtml.replace(/aiPython/g, camelLower);
        newHtml = newHtml.replace(/AiPython/g, camelBase);
        
        // Functions like loadPythonChapter
        newHtml = newHtml.replace(/loadPythonChapter/g, `load${camelBase}Chapter`);
        
        // Replace Python untuk AI textual content
        newHtml = newHtml.replace(/>Python untuk AI</g, `>${moduleTitle}<`);
        newHtml = newHtml.replace(/<h1>Python untuk AI<\/h1>/g, `<h1>${moduleTitle}</h1>`);
        newHtml = newHtml.replace(/belajar Python untuk AI/g, `belajar ${moduleTitle}`);
        newHtml = newHtml.replace(/Materi mengenai Python/g, `Materi mengenai ${moduleTitle}`);
        newHtml = newHtml.replace(/Latihan Python/g, `Latihan ${moduleTitle}`);
        newHtml = newHtml.replace(/materi Python/g, `materi ${moduleTitle}`);
        
        // Fix HTML Bugs: Kuis Python and Diskusi Python headers
        newHtml = newHtml.replace(/<h1>Kuis Python<\/h1>/g, `<h1>Kuis Modul</h1>`);
        newHtml = newHtml.replace(/<h1>Diskusi Python<\/h1>/g, `<h1>Diskusi Topik</h1>`);
        
        // URLs (Python uses #/participant-ai-python without -lab-)
        // Our new URL matches the baseId directly, which aligns with router.js
        const targetUrlBase = `participant-${baseId}`;
        newHtml = newHtml.replace(/#\/participant-ai-python/g, `#/${targetUrlBase}`);
        
        // Replace the sidebar list
        newHtml = newHtml.replace(/<ol id="reasoning-sidebar-list">[\s\S]*?<\/ol>/, `<ol id="${camelLower}List">\n${sidebarListHtml}\n                    </ol>`);
        
        fs.writeFileSync(path.join(__dirname, '../../pages/frontend/fellow-dashboard', categoryFolder, moduleFolder, `${page}.html`), newHtml);
    });
    
    console.log(`Generated HTML Shells for ${baseId}`);
}

const md = process.argv[2];
const bId = process.argv[3];
const cFolder = process.argv[4];
const mFolder = process.argv[5];

if (!md || !bId || !cFolder || !mFolder) {
    console.log("Usage: node build_module.js <md> <baseId> <categoryFolder> <moduleFolder>");
    process.exit(1);
}
buildModule(md, bId, cFolder, mFolder);
