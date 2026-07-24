const fs = require('fs');
const path = require('path');

const dir = '/home/faiz/her6/Her-AI/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning';
const files = ['latihan.html', 'kuis.html', 'diskusi.html'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Restore missing CSS classes in the section wrapper so that python UI styles apply
    content = content.replace(/<section class="([^"]*)"/g, (match, p1) => {
        let classes = p1.split(' ');
        if (!classes.includes('ai-python-page')) classes.push('ai-python-page');
        if (file === 'latihan.html' && !classes.includes('ai-python-practice-page')) classes.push('ai-python-practice-page');
        // Deduplicate
        classes = [...new Set(classes)];
        return `<section class="${classes.join(' ')}"`;
    });

    fs.writeFileSync(filePath, content);
});
console.log("Done fixing section classes");
