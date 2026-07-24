const fs = require('fs');
const path = require('path');

const dir = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning';
const files = ['latihan.html', 'kuis.html', 'diskusi.html'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Breadcrumb: Python untuk AI -> Deep Learning
    content = content.replace(/<span>Python untuk AI<\/span>/g, '<span>Deep Learning</span>');

    // Title / Hero
    content = content.replace(/Python untuk AI/g, 'Deep Learning');
    content = content.replace(/ai-python-page/g, 'ai-deep-learning-page');

    // Tabs
    content = content.replace(/#\/participant-ai-python-practice/g, '#/participant-ai-lab-deep-learning-practice');
    content = content.replace(/#\/participant-ai-python-quiz/g, '#/participant-ai-lab-deep-learning-quiz');
    content = content.replace(/#\/participant-ai-python-kuis/g, '#/participant-ai-lab-deep-learning-quiz');
    content = content.replace(/#\/participant-ai-python-discussion/g, '#/participant-ai-lab-deep-learning-discussion');
    content = content.replace(/#\/participant-ai-python/g, '#/participant-ai-lab-deep-learning');

    // Update the JS file included at the bottom (if any)
    content = content.replace(/ai-python\.js/g, 'ai-deep-learning.js');

    fs.writeFileSync(filePath, content);
});
console.log("Done fixing tabs");
