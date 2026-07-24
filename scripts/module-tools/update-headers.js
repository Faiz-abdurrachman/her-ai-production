const fs = require('fs');
const path = require('path');

const baseDir = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced';
const modules = [
    {
        name: 'Evaluation',
        dir: 'ai-advanced/05-evaluation/chapters',
        regex: /<header class="ai-evaluation-chapter-head">\s*<span>Chapter (\d+)(?: - [^<]+)?<\/span>\s*<h2>([^<]+)<\/h2>\s*<p>([^<]+)<\/p>\s*<\/header>/g,
        replacement: `<header class="lesson-topic-banner">
        <h3><i class="fas fa-book-open"></i> Topik $1: $2</h3>
        <p>$3</p>
    </header>`
    },
    {
        name: 'Evolution',
        dir: 'ai-advanced/06-evolution-of-ai/chapters',
        regex: /<header class="ai-evolution-chapter-head">\s*<span>Chapter (\d+)(?: - [^<]+)?<\/span>\s*<h2>([^<]+)<\/h2>\s*<p>([^<]+)<\/p>\s*<\/header>/g,
        replacement: `<header class="lesson-topic-banner">
        <h3><i class="fas fa-book-open"></i> Topik $1: $2</h3>
        <p>$3</p>
    </header>`
    },
    {
        name: 'Modern',
        dir: 'ai-fundamentals/03-konsep-ai-modern/chapters',
        regex: /<header class="ai-modern-chapter-hero">\s*<span>Topik (\d+)[^<]*<\/span>\s*<h2>([^<]+)<\/h2>\s*<p>([^<]+)<\/p>(?:[\s\S]*?)<\/header>/g,
        replacement: (match, num, title, desc) => {
            // we have to keep ai-modern-objectives if they exist, but maybe it's fine to just replace the whole header and keep objectives inside?
            // Actually, it's safer to just replace the header tag and its first 3 elements, but regex is greedy.
            // Let's use a simpler approach for Modern AI:
            return `<header class="lesson-topic-banner">\n        <h3><i class="fas fa-book-open"></i> Topik ${num}: ${title}</h3>\n        <p>${desc}</p>\n    </header>`;
        }
    },
    {
        name: 'Reasoning',
        dir: 'ai-fundamentals/04-reasoning/chapters',
        // Reasoning has <h1>...</h1>\n<h2>...</h2>
        // Wait, for reasoning, it doesn't have "Chapter X". It just has an h1 and h2.
        // Let's check Python first.
    },
    {
        name: 'Python',
        dir: 'ai-fundamentals/02-python-untuk-ai/chapters',
        regex: /<h1>Chapter (\d+)\s*—\s*([^<]+)<\/h1>\n<h2>([^<]+)<\/h2>\n<ul>([\s\S]*?)<\/ul>/g,
        replacement: (match, num, title, subtitle, list) => {
            return `<header class="lesson-topic-banner">\n    <h3><i class="fas fa-book-open"></i> Topik ${num}: ${title}</h3>\n    <p>${subtitle}</p>\n</header>\n<ul>${list}</ul>`;
        }
    }
];

function processDir(mod) {
    const dirPath = path.join(baseDir, mod.dir);
    if (!fs.existsSync(dirPath)) return;
    
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (mod.regex) {
            content = content.replace(mod.regex, mod.replacement);
            // also replace other occurrences of 'Chapter' to 'Topik' in the file
            // carefully replacing text not inside tags
            // For now just replace 'Chapter' with 'Topik' globally if it's standalone, but that might break HTML
            // content = content.replace(/\bChapter\b/g, 'Topik'); // be careful
            
            fs.writeFileSync(filePath, content);
            console.log(`Processed ${mod.name}: ${file}`);
        }
    }
}

for (const mod of modules) {
    processDir(mod);
}
