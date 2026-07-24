const fs = require('fs');
const cssPath = '/home/faiz/her6/Her-AI/css/frontend/fellow-dashboard/modules.css';
let css = fs.readFileSync(cssPath, 'utf8');

const regex = /([ \t]*)(.*#aiPython[a-zA-Z0-9_-]+.*)(?=[,{])/g;

css = css.replace(regex, (match, whitespace, selector) => {
    // If the selector contains aiPython, duplicate it with aiDeepLearning
    const newSelector = selector.replace(/aiPython/g, 'aiDeepLearning');
    // Keep the original, add a comma and the new selector
    return match + ',\n' + whitespace + newSelector;
});

fs.writeFileSync(cssPath, css);
console.log('CSS updated successfully!');
