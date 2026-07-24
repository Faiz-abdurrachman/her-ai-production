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
        const practiceMatch = chap.match(/## Latihan[^\n]*\n([\s\S]*?)(?=\n## |$)/);
        if (practiceMatch) {
            let promptText = practiceMatch[1].trim();
            let paragraphs = promptText.split(/\n\n+/).map(p => p.trim()).filter(p => p && p !== '---');
            paragraphs = paragraphs.map(p => p.replace(/<[^>]+>/g, '')); // strip HTML
            if (paragraphs.length > 0) {
                practices.push({
                    id: "PRACTICE-" + (idx + 1),
                    prompt: paragraphs.join('\n\n'),
                    fields: [["step", "Langkah Pengerjaan"]],
                    guide: "Tuliskan hasil analisis Anda."
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
    newContent = newContent.replace(/"heraiAiPythonCurrentChapter"/g, `"herai${camelBase}CurrentChapter"`);
    newContent = newContent.replace(/loadPythonTopik/g, `load${camelBase}Chapter`);
    
    newContent = newContent.replace(/const CHAPTERS = \[[\s\S]*?\];\n/, `const CHAPTERS = ${JSON.stringify(chaptersMetadata, null, 4)};\n`);
    newContent = newContent.replace(/var PRACTICE_TOPICS = \[[\s\S]*?\];/m, `var PRACTICE_TOPICS = [ { start: 0, end: ${practices.length-1}, label: "Latihan Modul" } ];`);
    newContent = newContent.replace(/const PRACTICES = \[[\s\S]*?\];/m, `const PRACTICES = ${JSON.stringify(practices, null, 4)};`);
    newContent = newContent.replace(/const QUIZ = \[[\s\S]*?\];/m, `const QUIZ = ${JSON.stringify(quiz, null, 4)};`);
    
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
    const firstLine = content.split('\n')[0];
    const moduleTitleRaw = firstLine && firstLine.startsWith('#') ? firstLine.replace(/#/g, '').trim() : baseId;
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
        
        // URLs (Python uses #/participant-ai-python without -lab-)
        // Our new URL uses actualRouteKey (with -lab- if baseId has it, wait, we'll force -lab-)
        const targetUrlBase = `participant-ai-lab-${baseId.replace('ai-', '')}`;
        newHtml = newHtml.replace(/#\/participant-ai-python/g, `#/${targetUrlBase}`);
        
        // Replace the sidebar list
        newHtml = newHtml.replace(/<ul class="lesson-list-card" id="[a-zA-Z0-9]+List">[\s\S]*?<\/ul>/, `<ul class="lesson-list-card" id="${camelLower}List">\n${sidebarListHtml}\n                    </ul>`);
        
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
