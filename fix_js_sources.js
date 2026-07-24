const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'js', 'frontend', 'fellow-dashboard');
const files = fs.readdirSync(jsDir);

files.forEach(file => {
    if (file.endsWith('.js') && file.startsWith('ai-')) {
        const filePath = path.join(jsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        let changed = false;
        
        // 1. Fix SOURCE_BASE
        const sourcePathMatch = content.match(/"sourcePath":\s*"(\/pages\/frontend\/fellow-dashboard\/[^\/]+\/[^\/]+\/chapters\/)/);
        if (sourcePathMatch) {
            const correctBase = sourcePathMatch[1];
            const badBase = '"/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/"';
            
            if (content.includes(`const SOURCE_BASE = ${badBase};`)) {
                content = content.replace(`const SOURCE_BASE = ${badBase};`, `const SOURCE_BASE = "${correctBase}";`);
                changed = true;
            } else if (content.includes('const SOURCE_BASE =')) {
                // replace whatever it is with the correct one
                content = content.replace(/const SOURCE_BASE = ".*";/, `const SOURCE_BASE = "${correctBase}";`);
                changed = true;
            }
        }
        
        // 2. Remove Python Integrity check
        if (content.includes('function assertPythonSourceIntegrity(')) {
            content = content.replace(/function assertPythonSourceIntegrity\([\s\S]*?\}\n/, '');
            content = content.replace(/assertPythonSourceIntegrity\(.*?\);\n/g, '');
            changed = true;
        }

        // 3. Remove other Python logic in generic scripts if they are hardcoded
        // Latihan/Quiz text replacements. They use title of module. Wait, the template hardcoded "Practice — Python sebagai Workflow Data".
        // Let's replace "Python sebagai Workflow Data" with the actual module title, or just "Latihan Modul"
        if (content.includes('Practice — Python sebagai Workflow Data')) {
            content = content.replace(/Practice — Python sebagai Workflow Data/g, "Latihan Modul");
            changed = true;
        }
        
        if (changed) {
            fs.writeFileSync(filePath, content);
            console.log("Fixed " + file);
        }
    }
});
console.log("Done fixing JS sources!");
