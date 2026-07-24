const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../../js/frontend/fellow-dashboard');

function scanAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isFile() && file.endsWith('.js')) {
            if (file === 'ai-python.js' || file === 'ai-python-basic.js') continue;

            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

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

            if (content.includes(oldLabels)) {
                content = content.replace(oldLabels, newLabels);
                modified = true;
            }

            if (content.includes(oldIcons)) {
                content = content.replace(oldIcons, newIcons);
                modified = true;
            }

            if (content.includes(oldPrompts)) {
                content = content.replace(oldPrompts, newPrompts);
                modified = true;
            } else if (content.includes("Mengapa Python dominan dalam AI")) {
                // fallback regex if indentation is different
                content = content.replace(/"Mengapa Python dominan dalam AI meskipun bukan selalu bahasa dengan runtime tercepat\?"/g, '"Bagaimana penerapan konsep ini dapat memecahkan masalah di industri Anda?"');
                content = content.replace(/"Kapan notebook membantu eksplorasi, dan kapan hidden state membuat hasil sulit dipercaya\?"/g, '"Apa saja tantangan atau risiko terbesar saat mengimplementasikan teori ini di dunia nyata?"');
                content = content.replace(/"Apakah menghapus missing value selalu benar\? Bukti apa yang diperlukan sebelum memilih aturan cleaning\?"/g, '"Menurut Anda, bagaimana etika dan bias dapat memengaruhi keputusan yang diambil berdasarkan model ini?"');
                content = content.replace(/"Dataset tanpa missing value apakah otomatis siap untuk Machine Learning\?"/g, '"Bagikan pengalaman atau kesulitan Anda saat mempraktikkan materi ini."');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated JS Discussion Content: ${file}`);
            }
        }
    }
}

scanAndReplace(targetDir);
console.log('Finished updating JS discussion labels and prompts.');
