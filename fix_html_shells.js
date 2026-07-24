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

const practiceReplacements = [
    [/Bangun satu workflow data secara bertahap: dari cara berpikir IPO, struktur data, validasi, function, file, NumPy, Pandas, hingga audit cleaning\./gi, "Uji pemahaman Anda melalui simulasi interaktif. Praktikkan langsung konsep yang telah dipelajari untuk memperkuat keahlian Anda."],
    [/Latihan membantu mengubah konsep python menjadi kebiasaan verifikasi yang bisa dipakai di produk nyata\./gi, "Latihan membantu mengubah konsep teori menjadi pemahaman praktis yang bisa diaplikasikan di dunia nyata."],
    [/HerAI fellow sedang ngoding Python/gi, "HerAI fellow sedang berlatih studi kasus"]
];

const quizReplacements = [
    [/Uji pemahaman Python sebagai workflow: environment, struktur data, function, error handling, file, NumPy, Pandas, dan audit data\./gi, "Evaluasi penguasaan materi Anda pada topik ini. Jawab setiap pertanyaan dengan cermat untuk memastikan pemahaman teori secara menyeluruh."],
    [/HerAI fellow mengerjakan kuis Python/gi, "HerAI fellow mengerjakan kuis modul"]
];

const discussionReplacements = [
    [/Diskusikan error Python, insight analisis data, studi kasus workflow, dan best practice clean code bersama sesama fellow\./gi, "Diskusikan materi, bagikan studi kasus, dan bertukar wawasan mendalam (best practices) bersama sesama fellow dan mentor komunitas."],
    [/HerAI fellow diskusi kode Python/gi, "HerAI fellow berdiskusi dalam kelompok belajar"]
];

categories.forEach(cat => {
    const catPath = path.join(baseDir, cat);
    if (!fs.existsSync(catPath)) return;
    const modules = fs.readdirSync(catPath);
    modules.forEach(mod => {
        const modPath = path.join(catPath, mod);
        if (fs.statSync(modPath).isDirectory() && mod !== 'ai-fundamentals-advanced') {
            replaceInFile(path.join(modPath, 'latihan.html'), practiceReplacements);
            replaceInFile(path.join(modPath, 'kuis.html'), quizReplacements);
            replaceInFile(path.join(modPath, 'diskusi.html'), discussionReplacements);
        } else if (mod === 'ai-fundamentals-advanced') {
            const innerMods = fs.readdirSync(modPath);
            innerMods.forEach(inner => {
                const innerPath = path.join(modPath, inner);
                if (fs.statSync(innerPath).isDirectory()) {
                    const deepestMods = fs.readdirSync(innerPath);
                    deepestMods.forEach(deep => {
                        const deepPath = path.join(innerPath, deep);
                        if (fs.statSync(deepPath).isDirectory()) {
                            replaceInFile(path.join(deepPath, 'latihan.html'), practiceReplacements);
                            replaceInFile(path.join(deepPath, 'kuis.html'), quizReplacements);
                            replaceInFile(path.join(deepPath, 'diskusi.html'), discussionReplacements);
                        }
                    });
                }
            });
        }
    });
});
console.log("Done fixing HTML shells!");
