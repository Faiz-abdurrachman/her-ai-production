const fs = require('fs');

const dlJsPath = '/home/faiz/her6/Her-AI/js/frontend/fellow-dashboard/ai-deep-learning.js';
const pyJsPath = '/home/faiz/her6/Her-AI/js/frontend/fellow-dashboard/ai-python.js';
const dataPath = 'dl_extracted.json';

const dlContent = fs.readFileSync(dlJsPath, 'utf8');
const pyContent = fs.readFileSync(pyJsPath, 'utf8');
const extractedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Extract CHAPTERS from dlContent
const chaptersMatch = dlContent.match(/const CHAPTERS = (\[[\s\S]*?\]);\n\n/);
const chaptersArrayStr = chaptersMatch ? chaptersMatch[1] : '[]';

let newContent = pyContent;

// Replace Python with DeepLearning in identifiers
newContent = newContent.replace(/aiPython/g, 'aiDeepLearning');
newContent = newContent.replace(/AiPython/g, 'AiDeepLearning');
newContent = newContent.replace(/python-task-controls/g, 'deep-learning-task-controls'); // just in case
newContent = newContent.replace(/ai-python-page/g, 'ai-deep-learning-page');
newContent = newContent.replace(/"heraiAiPythonCurrentChapter"/g, '"heraiAiDeepLearningCurrentChapter"');

// Replace CHAPTERS
newContent = newContent.replace(/const CHAPTERS = \[[\s\S]*?\];\n/, `const CHAPTERS = ${chaptersArrayStr};\n`);

// Adjust the PRACTICE_TOPICS, we only have one topic for deep learning really
newContent = newContent.replace(/var PRACTICE_TOPICS = \[[\s\S]*?\];/m, `var PRACTICE_TOPICS = [ { start: 0, end: 15, label: "Klasifikasi Gambar" } ];`);

// Map our extracted scenarios into the format expected by Python Practice card
const formattedScenarios = extractedData.scenarios.map(scen => {
    let cleanPrompt = scen.instruction.replace(/<p>/g, '').replace(/<\/p>/g, '\n').replace(/<strong>/g, '').replace(/<\/strong>/g, '');
    return {
        id: scen.id,
        title: scen.title,
        prompt: cleanPrompt.trim(), // we map instruction to prompt
        fields: [
            ["step", "Langkah Pengerjaan / Hasil"]
        ],
        guide: scen.hints.join(" ")
    };
});

// Map our extracted quiz into the format expected by Python Quiz
const formattedQuiz = extractedData.quiz.map(q => {
    const correctLetter = (q.correctOption || "A").toUpperCase();
    const correctIndex = correctLetter.charCodeAt(0) - 65;
    const options = q.options.map(opt => opt.text);
    return [
        q.text,
        options,
        correctIndex,
        "Pilihan " + correctLetter + " adalah jawaban yang tepat untuk pertanyaan ini."
    ];
});

// Replace PRACTICES
newContent = newContent.replace(/const PRACTICES = \[[\s\S]*?\];/m, `const PRACTICES = ${JSON.stringify(formattedScenarios, null, 4)};`);

// Replace QUIZ
newContent = newContent.replace(/const QUIZ = \[[\s\S]*?\];/m, `const QUIZ = ${JSON.stringify(formattedQuiz, null, 4)};`);

// Save to ai-deep-learning.js
fs.writeFileSync(dlJsPath, newContent);
console.log("Smart clone completed successfully!");
