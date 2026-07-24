const fs = require('fs');
const cssPath = '/home/faiz/her6/Her-AI/css/frontend/fellow-dashboard/modules.css';
let css = fs.readFileSync(cssPath, 'utf8');

css += `
/* FORCING QUIZ NAVIGATOR FIX FOR DEEP LEARNING */
.ai-python-quiz-page #aiDeepLearningQuizNavigator {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    justify-content: flex-start !important;
}
.ai-python-quiz-page #aiDeepLearningQuizNavigator button {
    flex: 0 0 44px !important;
    height: 44px !important;
    min-width: 44px !important;
    width: 44px !important;
    max-width: 44px !important;
    border-radius: 100px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
}
`;

fs.writeFileSync(cssPath, css);
console.log('CSS force fix applied!');
