const fs = require('fs');
const path = require('path');

const dir = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning';
const files = ['latihan.html', 'kuis.html', 'diskusi.html'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace lingering Python text
    content = content.replace(/Python/g, 'Deep Learning');
    content = content.replace(/aiPython/g, 'aiDeepLearning');
    content = content.replace(/python-/g, 'deep-learning-');

    fs.writeFileSync(filePath, content);
});
console.log("Done fixing texts");
