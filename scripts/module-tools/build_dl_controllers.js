const fs = require('fs');

const pythonJsPath = '/home/faiz/her6/Her-AI/js/frontend/fellow-dashboard/ai-python.js';
const dlJsPath = '/home/faiz/her6/Her-AI/js/frontend/fellow-dashboard/ai-deep-learning.js';
const dataPath = 'dl_extracted.json';

const pythonLines = fs.readFileSync(pythonJsPath, 'utf8').split('\n');
const extractedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Extract Practice, Quiz, and Discussion blocks based on line numbers
const practiceStart = pythonLines.findIndex(line => line.includes('window.initAiPythonPractice = function () {'));
const quizStart = pythonLines.findIndex(line => line.includes('window.initAiPythonQuiz = function () {'));
const discussionStart = pythonLines.findIndex(line => line.includes('window.initAiPythonDiscussion = function () {'));
let endOfFile = pythonLines.findIndex(line => line.startsWith('})();'));
if (endOfFile === -1) endOfFile = pythonLines.length;

let practiceBlock = pythonLines.slice(practiceStart, quizStart).join('\n');
let quizBlock = pythonLines.slice(quizStart, discussionStart).join('\n');
let discussionBlock = pythonLines.slice(discussionStart, endOfFile).join('\n');

// Replace aiPython with aiDeepLearning
practiceBlock = practiceBlock.replace(/aiPython/g, 'aiDeepLearning');
practiceBlock = practiceBlock.replace(/AiPython/g, 'AiDeepLearning');

quizBlock = quizBlock.replace(/aiPython/g, 'aiDeepLearning');
quizBlock = quizBlock.replace(/AiPython/g, 'AiDeepLearning');

discussionBlock = discussionBlock.replace(/aiPython/g, 'aiDeepLearning');
discussionBlock = discussionBlock.replace(/AiPython/g, 'AiDeepLearning');

// Inject the extracted JSON into Practice
// In python, it's `const PRACTICE_SCENARIOS = [ ... ];`
// We will replace that array with our scenarios
practiceBlock = practiceBlock.replace(/const PRACTICE_SCENARIOS = \[[\s\S]*?\];/m, `const PRACTICE_SCENARIOS = ${JSON.stringify(extractedData.scenarios, null, 4)};`);

// Inject the extracted JSON into Quiz
// In python, it's `const QUIZ_QUESTIONS = [ ... ];`
quizBlock = quizBlock.replace(/const QUIZ_QUESTIONS = \[[\s\S]*?\];/m, `const QUIZ_QUESTIONS = ${JSON.stringify(extractedData.quiz, null, 4)};`);

// Read current ai-deep-learning.js
let dlJsContent = fs.readFileSync(dlJsPath, 'utf8');

// Strip the closing `})();` if it exists
dlJsContent = dlJsContent.replace(/\}\)\(\);\s*$/, '');

// Append the blocks
dlJsContent += '\n\n' + practiceBlock;
dlJsContent += '\n' + quizBlock;
dlJsContent += '\n' + discussionBlock;
dlJsContent += '\n})();\n';

fs.writeFileSync(dlJsPath, dlJsContent);
console.log("Appended controllers to ai-deep-learning.js");
