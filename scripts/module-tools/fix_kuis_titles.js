const fs = require('fs');
const path = require('path');

const targetDirs = [
    'pages/frontend/fellow-dashboard/business-industry-application',
    'pages/frontend/fellow-dashboard/data-engineering-domain',
    'pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning',
    'pages/frontend/fellow-dashboard/foundation-core-ai/reinforcement-learning'
];

function scanAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanAndReplace(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            if (content.includes('Kuis Python')) {
                content = content.replace(/Kuis Python/g, 'Kuis Modul');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated Kuis Title: ${fullPath}`);
            }
        }
    }
}

const baseDir = path.join(__dirname, '../../');
for (const dir of targetDirs) {
    scanAndReplace(path.join(baseDir, dir));
}
console.log('Finished updating Kuis Python titles.');
