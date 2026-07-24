const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../../js/frontend/fellow-dashboard');

function scanAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isFile() && file.endsWith('.js')) {
            // Skip the actual Python module scripts
            if (file === 'ai-python.js' || file === 'ai-python-basic.js') continue;

            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            if (content.includes('<small>Python untuk AI</small>')) {
                content = content.replace(/<small>Python untuk AI<\/small>/g, '<small>Evaluasi Modul</small>');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated JS Quiz Label: ${file}`);
            }
        }
    }
}

scanAndReplace(targetDir);
console.log('Finished updating JS quiz labels.');
