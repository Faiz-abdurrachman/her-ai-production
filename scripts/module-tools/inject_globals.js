const fs = require('fs');

const dlJsPath = '/home/faiz/her6/Her-AI/js/frontend/fellow-dashboard/ai-deep-learning.js';
const dataPath = 'dl_extracted.json';
const extractedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let content = fs.readFileSync(dlJsPath, 'utf8');

const injection = `
    const PRACTICES = ${JSON.stringify(extractedData.scenarios, null, 4)};
    const QUIZ = ${JSON.stringify(extractedData.quiz, null, 4)};
`;

content = content.replace('window.initAiDeepLearningPractice = function () {', injection + '\n    window.initAiDeepLearningPractice = function () {');

fs.writeFileSync(dlJsPath, content);
console.log("Globals injected!");
