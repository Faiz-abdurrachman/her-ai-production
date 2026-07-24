const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    replacements.forEach(([regex, newText]) => {
        if (regex.test(content)) {
            content = content.replace(regex, newText);
            changed = true;
        }
    });
    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log("Fixed " + filePath);
    }
}

const baseDir = path.join(__dirname, 'pages', 'frontend', 'fellow-dashboard');
const categories = ['business-industry-application', 'data-engineering-domain', 'foundation-core-ai', 'generative-multimodal-ai'];

const materiReplacements = [
    [/Pelajari Python dari dasar hingga siap pakai untuk AI: variabel, control flow, function, OOP, error handling, NumPy, Pandas, dan mini AI workflow\./gi, "Eksplorasi materi secara mendalam dari konsep dasar hingga implementasi praktis untuk mendukung pemahaman Anda di ekosistem AI."]
];

categories.forEach(cat => {
    const catPath = path.join(baseDir, cat);
    if (!fs.existsSync(catPath)) return;
    const modules = fs.readdirSync(catPath);
    modules.forEach(mod => {
        const modPath = path.join(catPath, mod);
        if (fs.statSync(modPath).isDirectory() && mod !== 'ai-fundamentals-advanced') {
            replaceInFile(path.join(modPath, 'materi.html'), materiReplacements);
        } else if (mod === 'ai-fundamentals-advanced') {
            const innerMods = fs.readdirSync(modPath);
            innerMods.forEach(inner => {
                const innerPath = path.join(modPath, inner);
                if (fs.statSync(innerPath).isDirectory()) {
                    const deepestMods = fs.readdirSync(innerPath);
                    deepestMods.forEach(deep => {
                        const deepPath = path.join(innerPath, deep);
                        if (fs.statSync(deepPath).isDirectory()) {
                            replaceInFile(path.join(deepPath, 'materi.html'), materiReplacements);
                        }
                    });
                }
            });
        }
    });
});
console.log("Done fixing materi HTML shells!");
