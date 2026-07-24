const fs = require('fs');

const mdPath = '/home/faiz/her6/Her-AI/nazril/modul-materi-herai/foundation-core-ai/Modul_Deep_Learning_HerAI.md';
const content = fs.readFileSync(mdPath, 'utf8');

// 1. Extract Practice Scenarios (from Bab 10 Table)
const practiceMatch = content.match(/## 10\.3 Tahapan Pengerjaan\n\n\| Tahap \| Aktivitas utama \|\n\|---\|---\|\n([\s\S]*?)\n\n## 10\.4/);
const scenarios = [];
if (practiceMatch) {
    const tableLines = practiceMatch[1].trim().split('\n');
    tableLines.forEach((line, idx) => {
        const parts = line.split('|').map(s => s.trim()).filter(s => s);
        if (parts.length === 2) {
            scenarios.push({
                id: `DL-P-${idx + 1}`,
                title: parts[0],
                instruction: `<p>Lakukan tahap: <strong>${parts[0]}</strong></p><p>${parts[1]}</p>`,
                hints: [`Fokus pada ${parts[0].toLowerCase()} terlebih dahulu.`]
            });
        }
    });
}

// 2. Extract Quiz Questions (from Bab 11)
const quizMatch = content.match(/## Soal\n\n([\s\S]*?)\n\n## Kunci Jawaban/);
const quizQuestions = [];
if (quizMatch) {
    const qLines = quizMatch[1].trim().split('\n');
    let currentQ = null;
    qLines.forEach(line => {
        line = line.trim();
        if (!line) return;
        
        const qMatch = line.match(/^(\d+)\.\s+(.*)$/);
        if (qMatch) {
            if (currentQ) quizQuestions.push(currentQ);
            currentQ = {
                id: `DL-Q-${qMatch[1]}`,
                text: qMatch[2],
                options: []
            };
        } else if (line.startsWith('- A.') || line.startsWith('- B.') || line.startsWith('- C.') || line.startsWith('- D.')) {
            const optLetter = line.substring(2, 3);
            const optText = line.substring(4).trim();
            if (currentQ) {
                currentQ.options.push({
                    id: optLetter,
                    text: optText
                });
            }
        }
    });
    if (currentQ) quizQuestions.push(currentQ);
}

// 3. Extract Answers
const ansMatch = content.match(/## Kunci Jawaban[\s\S]*?\|---\|:---\|---\|:---\|\n?([\s\S]*?)\n\n## Interpretasi/);
let finalAnsMatch = ansMatch;
if (!finalAnsMatch) {
    finalAnsMatch = content.match(/## Kunci Jawaban[\s\S]*?\|---:\|:---:\|---:\|:---:\|\n([\s\S]*?)\n\n## Interpretasi/);
}
if (finalAnsMatch) {
    const ansLines = finalAnsMatch[1].trim().split('\n');
    ansLines.forEach(line => {
        const parts = line.split('|').map(s => s.trim()).filter(s => s);
        if (parts.length >= 2) {
            const num1 = parts[0];
            const ans1 = parts[1];
            const q1 = quizQuestions.find(q => q.id === `DL-Q-${num1}`);
            if (q1) q1.correctOption = ans1;
        }
        if (parts.length >= 4) {
            const num2 = parts[2];
            const ans2 = parts[3];
            const q2 = quizQuestions.find(q => q.id === `DL-Q-${num2}`);
            if (q2) q2.correctOption = ans2;
        }
    });
}

const exportData = {
    scenarios,
    quiz: quizQuestions
};

fs.writeFileSync('dl_extracted.json', JSON.stringify(exportData, null, 2));
console.log("Extracted!");
