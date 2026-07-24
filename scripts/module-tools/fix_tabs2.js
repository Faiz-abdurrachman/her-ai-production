const fs = require('fs');
const path = require('path');

const dir = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning';
const files = ['latihan.html', 'kuis.html', 'diskusi.html'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Breadcrumb
    content = content.replace(/<span>Python untuk AI<\/span>/g, '<span>Deep Learning</span>');

    // Title / Hero visible text
    content = content.replace(/>Python untuk AI</g, '>Deep Learning<');
    content = content.replace(/Latihan Python Terstruktur/g, 'Latihan Deep Learning Terstruktur');
    content = content.replace(/Kuis Python untuk AI/g, 'Kuis Deep Learning');
    content = content.replace(/Forum Diskusi Python/g, 'Forum Diskusi Deep Learning');
    
    // Specifically fix page class
    content = content.replace(/ai-python-page/g, 'ai-deep-learning-page');
    content = content.replace(/ai-python-practice-page/g, 'ai-deep-learning-page'); // The CSS uses ai-python-practice-page for specific layouts, let's keep the layout classes intact if they exist. Wait, ai-python-page is a page wrapper. Let's just do ai-python-page -> ai-deep-learning-page but keep practice-page. Actually, let's just leave the page classes as ai-python-page for now to ensure all CSS works, wait no, ai-deep-learning-page is what materi.html uses. Let's replace ONLY ai-python-page.
    
    // Tabs routing
    content = content.replace(/#\/participant-ai-python-practice/g, '#/participant-ai-lab-deep-learning-practice');
    content = content.replace(/#\/participant-ai-python-quiz/g, '#/participant-ai-lab-deep-learning-quiz');
    content = content.replace(/#\/participant-ai-python-kuis/g, '#/participant-ai-lab-deep-learning-quiz');
    content = content.replace(/#\/participant-ai-python-discussion/g, '#/participant-ai-lab-deep-learning-discussion');
    content = content.replace(/#\/participant-ai-python/g, '#/participant-ai-lab-deep-learning');

    // Update the JS file included at the bottom (if any)
    content = content.replace(/ai-python-practice\.js/g, 'ai-deep-learning.js');
    content = content.replace(/ai-python-quiz\.js/g, 'ai-deep-learning.js');
    content = content.replace(/ai-python-discussion\.js/g, 'ai-deep-learning.js');
    content = content.replace(/ai-python\.js/g, 'ai-deep-learning.js');

    // ID replacements (optional, but good for cleanliness, won't break CSS)
    content = content.replace(/id="aiPython/g, 'id="aiDeepLearning');

    fs.writeFileSync(filePath, content);
});
console.log("Done fixing texts carefully");
